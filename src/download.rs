use std::collections::VecDeque;
use std::io::{BufRead, BufReader};
use std::path::{Path, PathBuf};
use std::process::{Child, Command, Stdio};
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use crate::app::{App, ImportOutcome};
use crate::util;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Clone, Debug, Default, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DownloadSnapshot {
    pub id: String,
    pub url: String,
    pub title: String,
    pub artist: String,
    pub thumbnail: String,
    pub format: String,
    pub quality: String,
    pub status: String,
    pub progress: f64,
    pub speed: String,
    pub eta: String,
    pub message: String,
    pub track_id: String,
    pub started_at: i64,
}

impl DownloadSnapshot {
    pub fn is_running(&self) -> bool {
        !matches!(self.status.as_str(), "done" | "error" | "cancelled")
    }
}

#[derive(Clone, Debug, Default, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", default)]
pub struct QueueItem {
    pub id: String,
    pub url: String,
    pub title: String,
    pub artist: String,
    pub format: String,
    pub quality: String,
    pub status: String,
    pub progress: f64,
    pub message: String,
    pub track_id: String,
    pub thumbnail: String,
    pub added_at: i64,
    pub attempts: u32,
}

impl QueueItem {
    fn is_finished(&self) -> bool {
        matches!(self.status.as_str(), "done" | "error" | "cancelled")
    }
}

/// Load the download queue from disk, requeueing anything that was interrupted.
pub fn load_queue(data_dir: &Path) -> Vec<QueueItem> {
    let path = data_dir.join("queue.json");
    let Ok(raw) = std::fs::read_to_string(&path) else {
        return Vec::new();
    };
    let Ok(mut items) = serde_json::from_str::<Vec<QueueItem>>(&raw) else {
        eprintln!("[riff] could not read queue.json");
        return Vec::new();
    };
    items.retain(|item| !item.url.trim().is_empty() && item.status != "done");
    for item in &mut items {
        if item.id.trim().is_empty() {
            item.id = util::new_id();
        }
        if !matches!(item.status.as_str(), "queued" | "error" | "cancelled") {
            item.status = "queued".to_string();
            item.progress = 0.0;
            item.message.clear();
            item.track_id.clear();
            item.thumbnail.clear();
        }
        if item.format != "m4a" {
            item.format = "mp3".to_string();
        }
        if !matches!(item.quality.as_str(), "best" | "320" | "192") {
            item.quality = "best".to_string();
        }
    }
    items
}

pub struct ActiveDownload {
    pub snapshot: Mutex<DownloadSnapshot>,
    child: Mutex<Option<Child>>,
    cancel: AtomicBool,
}

impl ActiveDownload {
    fn set(&self, update: impl FnOnce(&mut DownloadSnapshot)) {
        let mut snapshot = self.snapshot.lock().unwrap_or_else(|e| e.into_inner());
        update(&mut snapshot);
    }

    pub fn snapshot(&self) -> DownloadSnapshot {
        self.snapshot
            .lock()
            .unwrap_or_else(|e| e.into_inner())
            .clone()
    }

    pub fn cancel(&self) {
        self.cancel.store(true, Ordering::SeqCst);
        let mut guard = self.child.lock().unwrap_or_else(|e| e.into_inner());
        if let Some(child) = guard.as_mut() {
            let _ = child.kill();
        }
    }
}

/// Add a link to the download queue. The queue worker picks items up in order.
pub fn start(
    app: Arc<App>,
    url: String,
    format: Option<String>,
    quality: Option<String>,
    title_hint: Option<String>,
    artist_hint: Option<String>,
) -> Result<QueueItem, String> {
    let url = url.trim().to_string();
    if !(url.starts_with("http://") || url.starts_with("https://")) {
        return Err("Paste a full link that starts with http:// or https://".to_string());
    }
    if util::find_binary("yt-dlp").is_none() {
        return Err(
            "yt-dlp was not found. Install it with: brew install yt-dlp ffmpeg".to_string(),
        );
    }
    if util::find_binary("ffmpeg").is_none() {
        return Err(
            "ffmpeg was not found. Install it with: brew install yt-dlp ffmpeg".to_string(),
        );
    }

    let (format, quality, download_dir) = {
        let lib = app.lock();
        (
            format.unwrap_or_else(|| lib.settings.format.clone()),
            quality.unwrap_or_else(|| lib.settings.quality.clone()),
            lib.settings.download_dir.clone(),
        )
    };
    let format = if format == "m4a" { "m4a" } else { "mp3" }.to_string();
    let quality = match quality.as_str() {
        "320" => "320",
        "192" => "192",
        _ => "best",
    }
    .to_string();

    util::ensure_dir(Path::new(&download_dir))
        .map_err(|e| format!("Could not create the download folder: {e}"))?;

    let item = QueueItem {
        id: util::new_id(),
        url,
        title: title_hint.unwrap_or_default(),
        artist: artist_hint.unwrap_or_default(),
        format,
        quality,
        status: "queued".to_string(),
        progress: 0.0,
        message: String::new(),
        track_id: String::new(),
        thumbnail: String::new(),
        added_at: util::now_secs(),
        attempts: 0,
    };

    {
        let mut queue = app.queue.lock().unwrap_or_else(|e| e.into_inner());
        if queue
            .iter()
            .any(|other| other.url == item.url && !other.is_finished())
        {
            return Err("That link is already waiting in the queue".to_string());
        }
        queue.push(item.clone());
    }
    app.queue_cv.notify_all();
    app.bump();
    app.save_queue();
    Ok(item)
}

pub fn spawn_worker(app: Arc<App>) {
    let result = thread::Builder::new()
        .name("riff-downloads".to_string())
        .spawn(move || loop {
            let task = {
                let mut queue = app.queue.lock().unwrap_or_else(|e| e.into_inner());
                loop {
                    if let Some(index) = queue.iter().position(|item| item.status == "queued") {
                        queue[index].status = "running".to_string();
                        queue[index].progress = 0.0;
                        queue[index].message.clear();
                        queue[index].track_id.clear();
                        queue[index].thumbnail.clear();
                        break queue[index].clone();
                    }
                    queue = app.queue_cv.wait(queue).unwrap_or_else(|e| e.into_inner());
                }
            };
            app.save_queue();
            run_queue_task(app.clone(), task);
        });
    if let Err(err) = result {
        eprintln!("[riff] could not start the download queue: {err}");
    }
}

fn run_queue_task(app: Arc<App>, task: QueueItem) {
    let download_dir = app.lock().settings.download_dir.clone();
    if let Err(err) = util::ensure_dir(Path::new(&download_dir)) {
        finish_queue_item(
            &app,
            &task.id,
            "error",
            &format!("Could not create the download folder: {err}"),
            None,
        );
        return;
    }

    let active = Arc::new(ActiveDownload {
        snapshot: Mutex::new(DownloadSnapshot {
            id: task.id.clone(),
            url: task.url.clone(),
            title: task.title.clone(),
            artist: task.artist.clone(),
            thumbnail: String::new(),
            format: task.format.clone(),
            quality: task.quality.clone(),
            status: "preparing".to_string(),
            progress: 0.0,
            speed: String::new(),
            eta: String::new(),
            message: String::new(),
            track_id: String::new(),
            started_at: util::now_secs(),
        }),
        child: Mutex::new(None),
        cancel: AtomicBool::new(false),
    });
    {
        let mut slot = app.download.lock().unwrap_or_else(|e| e.into_inner());
        *slot = Some(active.clone());
    }
    app.bump();

    run(
        app.clone(),
        active.clone(),
        task.url.clone(),
        task.format.clone(),
        task.quality.clone(),
        download_dir,
    );

    let snapshot = active.snapshot();
    let mut queue = app.queue.lock().unwrap_or_else(|e| e.into_inner());
    if let Some(item) = queue.iter_mut().find(|item| item.id == task.id) {
        item.status = snapshot.status.clone();
        item.progress = snapshot.progress;
        item.message = snapshot.message.clone();
        item.track_id = snapshot.track_id.clone();
        if !snapshot.title.is_empty() {
            item.title = snapshot.title;
        }
        if !snapshot.artist.is_empty() {
            item.artist = snapshot.artist;
        }
        if !snapshot.thumbnail.is_empty() {
            item.thumbnail = snapshot.thumbnail;
        }
    }
    drop(queue);
    app.bump();
    app.save_queue();
}

fn finish_queue_item(app: &App, id: &str, status: &str, message: &str, track_id: Option<&str>) {
    let mut queue = app.queue.lock().unwrap_or_else(|e| e.into_inner());
    if let Some(item) = queue.iter_mut().find(|item| item.id == id) {
        item.status = status.to_string();
        item.message = message.to_string();
        if let Some(track_id) = track_id {
            item.track_id = track_id.to_string();
        }
    }
    drop(queue);
    app.bump();
    app.save_queue();
}

pub fn cancel(app: &App) {
    if let Some(active) = app.job() {
        active.cancel();
    }
}

pub fn cancel_item(app: &App, id: &str) -> bool {
    if let Some(active) = app.job() {
        if active.snapshot().id == id && active.snapshot().is_running() {
            active.cancel();
            return true;
        }
    }
    let mut queue = app.queue.lock().unwrap_or_else(|e| e.into_inner());
    if let Some(item) = queue
        .iter_mut()
        .find(|item| item.id == id && item.status == "queued")
    {
        item.status = "cancelled".to_string();
        item.message = String::new();
        drop(queue);
        app.bump();
        app.save_queue();
        return true;
    }
    false
}

fn reset_queue_item(item: &mut QueueItem) {
    item.status = "queued".to_string();
    item.progress = 0.0;
    item.message.clear();
    item.track_id.clear();
    item.thumbnail.clear();
    item.attempts = item.attempts.saturating_add(1);
}

fn clear_finished_job(app: &App, id: &str) {
    let mut slot = app.download.lock().unwrap_or_else(|e| e.into_inner());
    let matches = slot
        .as_ref()
        .map(|active| {
            let snapshot = active.snapshot();
            snapshot.id == id && !snapshot.is_running()
        })
        .unwrap_or(false);
    if matches {
        *slot = None;
    }
}

pub fn retry(app: &App, id: Option<&str>) -> Result<usize, String> {
    let mut moved: Vec<QueueItem> = Vec::new();
    {
        let mut queue = app.queue.lock().unwrap_or_else(|e| e.into_inner());
        if let Some(id) = id {
            let Some(index) = queue.iter().position(|item| item.id == id) else {
                return Err("That download is no longer in the queue".to_string());
            };
            if !matches!(queue[index].status.as_str(), "error" | "cancelled") {
                return Err("Only failed or cancelled downloads can be retried".to_string());
            }
            let mut item = queue.remove(index);
            reset_queue_item(&mut item);
            moved.push(item);
        } else {
            let mut keep = Vec::with_capacity(queue.len());
            for mut item in queue.drain(..) {
                if matches!(item.status.as_str(), "error" | "cancelled") {
                    reset_queue_item(&mut item);
                    moved.push(item);
                } else {
                    keep.push(item);
                }
            }
            *queue = keep;
        }
        queue.extend(moved.iter().cloned());
    }
    if moved.is_empty() {
        return Ok(0);
    }
    for item in &moved {
        clear_finished_job(app, &item.id);
    }
    app.queue_cv.notify_all();
    app.bump();
    app.save_queue();
    Ok(moved.len())
}

pub fn remove(app: &App, id: &str) -> bool {
    let mut queue = app.queue.lock().unwrap_or_else(|e| e.into_inner());
    let Some(index) = queue.iter().position(|item| item.id == id) else {
        return false;
    };
    if queue[index].status == "running" {
        return false;
    }
    queue.remove(index);
    drop(queue);
    clear_finished_job(app, id);
    app.bump();
    app.save_queue();
    true
}

pub fn clear_finished(app: &App) -> usize {
    let mut queue = app.queue.lock().unwrap_or_else(|e| e.into_inner());
    let before = queue.len();
    let mut removed_ids = Vec::new();
    queue.retain(|item| {
        if item.is_finished() {
            removed_ids.push(item.id.clone());
            false
        } else {
            true
        }
    });
    let removed = before - queue.len();
    drop(queue);
    for id in &removed_ids {
        clear_finished_job(app, id);
    }
    if removed > 0 {
        app.bump();
        app.save_queue();
    }
    removed
}

fn run(
    app: Arc<App>,
    active: Arc<ActiveDownload>,
    url: String,
    format: String,
    quality: String,
    download_dir: String,
) {
    let dir = PathBuf::from(&download_dir);
    let Some(ytdlp) = util::find_binary("yt-dlp") else {
        fail(
            &active,
            "yt-dlp was not found. Install it with: brew install yt-dlp ffmpeg",
        );
        return;
    };

    let quality_arg = quality_argument(&format, &quality);
    let output_template = dir.join("%(title).80B [%(id)s].%(ext)s");

    let mut command = Command::new(ytdlp);
    command
        .arg("--no-playlist")
        .arg("--no-warnings")
        .arg("--no-colors")
        .arg("--newline")
        .arg("--progress")
        .arg("--no-simulate")
        .arg("--socket-timeout")
        .arg("20")
        .arg("--retries")
        .arg("3")
        .arg("--fragment-retries")
        .arg("3")
        .arg("-x")
        .arg("--audio-format")
        .arg(&format)
        .arg("--audio-quality")
        .arg(&quality_arg)
        .arg("--embed-thumbnail")
        .arg("--embed-metadata")
        .arg("--write-thumbnail")
        .arg("--convert-thumbnails")
        .arg("jpg")
        .arg("--print")
        .arg("after_move:RIFFPATH:%(filepath)s")
        .arg("-o")
        .arg(&output_template)
        .arg("--")
        .arg(&url)
        .env("PATH", util::rich_path())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());

    let mut child = match command.spawn() {
        Ok(child) => child,
        Err(err) => {
            fail(&active, &format!("Could not start yt-dlp: {err}"));
            return;
        }
    };

    let stdout = child.stdout.take();
    let stderr = child.stderr.take();
    {
        let mut guard = active.child.lock().unwrap_or_else(|e| e.into_inner());
        *guard = Some(child);
    }

    active.set(|s| {
        s.status = "downloading".to_string();
    });

    let found_path: Arc<Mutex<Option<PathBuf>>> = Arc::new(Mutex::new(None));
    let errors: Arc<Mutex<VecDeque<String>>> = Arc::new(Mutex::new(VecDeque::new()));

    let stdout_thread = stdout.map(|stdout| {
        let active = active.clone();
        let found_path = found_path.clone();
        let errors = errors.clone();
        thread::spawn(move || {
            for line in BufReader::new(stdout).lines().map_while(Result::ok) {
                let line = strip_ansi(&line);
                if let Some(raw) = line.strip_prefix("RIFFPATH:") {
                    let path = raw.trim();
                    if !path.is_empty() {
                        *found_path.lock().unwrap_or_else(|e| e.into_inner()) =
                            Some(PathBuf::from(path));
                    }
                    continue;
                }
                if line.contains("ERROR:") {
                    push_error(&errors, &line);
                }
                if line.starts_with("[download]") {
                    if line.contains('%') {
                        if let Some((percent, speed, eta)) = parse_progress(&line) {
                            active.set(|s| {
                                s.status = "downloading".to_string();
                                s.progress = percent;
                                s.speed = speed;
                                s.eta = eta;
                            });
                        }
                    }
                } else if line.starts_with("[ExtractAudio]")
                    || line.starts_with("[FixupM4a]")
                    || line.starts_with("[FixupM3u8]")
                {
                    active.set(|s| {
                        s.status = "converting".to_string();
                        s.progress = 100.0;
                        s.speed.clear();
                        s.eta.clear();
                    });
                } else if line.starts_with("[Metadata]")
                    || line.starts_with("[EmbedThumbnail]")
                    || line.starts_with("[ThumbnailsConvertor]")
                {
                    active.set(|s| {
                        s.status = "tagging".to_string();
                        s.progress = 100.0;
                        s.speed.clear();
                        s.eta.clear();
                    });
                } else if line.starts_with("[MoveFiles]") {
                    active.set(|s| {
                        s.status = "importing".to_string();
                        s.progress = 100.0;
                        s.speed.clear();
                        s.eta.clear();
                    });
                }
            }
        })
    });

    let stderr_thread = stderr.map(|stderr| {
        let errors = errors.clone();
        thread::spawn(move || {
            for line in BufReader::new(stderr).lines().map_while(Result::ok) {
                let line = strip_ansi(&line);
                if !line.trim().is_empty() {
                    push_error(&errors, &line);
                }
            }
        })
    });

    let mut cancelled = false;
    let exit_status = loop {
        if active.cancel.load(Ordering::SeqCst) {
            cancelled = true;
            if let Ok(mut guard) = active.child.lock() {
                if let Some(child) = guard.as_mut() {
                    let _ = child.kill();
                }
            }
        }
        let done = {
            let mut guard = active.child.lock().unwrap_or_else(|e| e.into_inner());
            match guard.as_mut() {
                Some(child) => match child.try_wait() {
                    Ok(Some(status)) => Some(Ok(status)),
                    Ok(None) => None,
                    Err(err) => Some(Err(err)),
                },
                None => Some(Err(std::io::Error::other("yt-dlp process disappeared"))),
            }
        };
        if let Some(result) = done {
            match result {
                Ok(status) => break status,
                Err(err) => {
                    fail(&active, &format!("Could not wait for yt-dlp: {err}"));
                    app.bump();
                    return;
                }
            }
        }
        thread::sleep(Duration::from_millis(120));
    };

    {
        let mut guard = active.child.lock().unwrap_or_else(|e| e.into_inner());
        *guard = None;
    }
    if let Some(handle) = stdout_thread {
        let _ = handle.join();
    }
    if let Some(handle) = stderr_thread {
        let _ = handle.join();
    }

    if cancelled || active.cancel.load(Ordering::SeqCst) {
        cleanup_partials(&dir);
        active.set(|s| {
            s.status = "cancelled".to_string();
            s.message = String::new();
            s.speed.clear();
            s.eta.clear();
        });
        app.bump();
        return;
    }

    if !exit_status.success() {
        let message = collect_error(&errors);
        fail(
            &active,
            if message.is_empty() {
                "yt-dlp could not download that link."
            } else {
                &message
            },
        );
        app.bump();
        return;
    }

    let started_at = active.snapshot().started_at;
    let since = UNIX_EPOCH + Duration::from_secs(started_at.max(0) as u64);
    let mut path = found_path.lock().unwrap_or_else(|e| e.into_inner()).clone();

    if path.as_ref().map(|p| !p.exists()).unwrap_or(true) {
        path = find_newest_audio(&dir, since);
    }

    let Some(path) = path.filter(|p| p.is_file()) else {
        let message = collect_error(&errors);
        fail(
            &active,
            &format!(
                "The download did not produce an audio file.{}",
                if message.is_empty() {
                    String::new()
                } else {
                    format!(" {message}")
                }
            ),
        );
        app.bump();
        return;
    };

    active.set(|s| {
        s.status = "importing".to_string();
        s.progress = 100.0;
        s.speed.clear();
        s.eta.clear();
    });

    let title_hint = {
        let snapshot = active.snapshot();
        (!snapshot.title.trim().is_empty())
            .then_some((snapshot.title.clone(), snapshot.artist.clone()))
    };

    match app.import_file(&path, "download", title_hint) {
        ImportOutcome::Added(track) => {
            active.set(|s| {
                s.status = "done".to_string();
                s.progress = 100.0;
                s.title = track.title.clone();
                s.artist = track.artist.clone();
                s.track_id = track.id.clone();
                s.thumbnail = format!("/api/cover/{}", track.id);
                s.message.clear();
                s.speed.clear();
                s.eta.clear();
            });
        }
        ImportOutcome::Duplicate => {
            let existing = {
                let lib = app.lock();
                lib.tracks
                    .iter()
                    .find(|t| t.path == path.to_string_lossy())
                    .cloned()
            };
            active.set(|s| {
                s.status = "done".to_string();
                s.progress = 100.0;
                if let Some(track) = existing {
                    s.title = track.title;
                    s.artist = track.artist;
                    s.track_id = track.id.clone();
                    s.thumbnail = format!("/api/cover/{}", track.id);
                }
                s.speed.clear();
                s.eta.clear();
            });
        }
    }
    app.bump();
}

fn quality_argument(format: &str, quality: &str) -> String {
    match (format, quality) {
        ("m4a", "best") => "256K".to_string(),
        (_, "best") => "0".to_string(),
        (_, "320") => "320K".to_string(),
        (_, _) => "192K".to_string(),
    }
}

fn fail(active: &ActiveDownload, message: &str) {
    let message = friendly_error(message);
    active.set(|s| {
        s.status = "error".to_string();
        s.message = message;
        s.speed.clear();
        s.eta.clear();
    });
}

fn friendly_error(message: &str) -> String {
    let lower = message.to_lowercase();
    let text = if lower.contains("sign in to confirm")
        || lower.contains("not a bot")
        || lower.contains("cookies")
    {
        "This site is asking for a sign-in or verification. Try another link, or update yt-dlp (brew upgrade yt-dlp).".to_string()
    } else if lower.contains("unsupported url") {
        "This link is not supported by yt-dlp. Try a YouTube, SoundCloud, Bandcamp, or Vimeo link."
            .to_string()
    } else if lower.contains("private video") {
        "This video is private and cannot be downloaded.".to_string()
    } else if lower.contains("video unavailable") {
        "This video is unavailable in your region or was removed.".to_string()
    } else {
        message.to_string()
    };
    let text = text.trim().replace('\n', " ");
    text.chars().take(360).collect()
}

fn push_error(errors: &Arc<Mutex<VecDeque<String>>>, line: &str) {
    let line = line.trim();
    if line.is_empty() {
        return;
    }
    let mut errors = errors.lock().unwrap_or_else(|e| e.into_inner());
    if errors.len() >= 12 {
        errors.pop_front();
    }
    errors.push_back(line.to_string());
}

fn collect_error(errors: &Arc<Mutex<VecDeque<String>>>) -> String {
    let errors = errors.lock().unwrap_or_else(|e| e.into_inner());
    let joined = errors
        .iter()
        .rev()
        .find(|line| line.to_lowercase().contains("error"))
        .cloned()
        .or_else(|| errors.back().cloned())
        .unwrap_or_default();
    friendly_error(&joined)
}

fn parse_progress(line: &str) -> Option<(f64, String, String)> {
    let percent_index = line.find('%')?;
    let number = line[..percent_index]
        .rsplit(|c: char| c.is_whitespace())
        .next()?
        .trim()
        .parse::<f64>()
        .ok()?;
    let mut speed = String::new();
    let mut eta = String::new();
    if let Some(at) = line[percent_index..].find(" at ") {
        let rest = &line[percent_index + at + 4..];
        let mut parts = rest.split(" ETA ");
        let speed_part = parts.next().unwrap_or("").trim();
        if !speed_part.to_lowercase().contains("unknown") {
            speed = speed_part
                .trim_matches(|c| c == '(' || c == ')')
                .to_string();
        }
        if let Some(eta_part) = parts.next() {
            let eta_part = eta_part.trim();
            if !eta_part.to_lowercase().contains("unknown") {
                eta = eta_part.split_whitespace().next().unwrap_or("").to_string();
            }
        }
    }
    Some((number.clamp(0.0, 100.0), speed, eta))
}

fn strip_ansi(input: &str) -> String {
    let mut out = String::with_capacity(input.len());
    let mut chars = input.chars().peekable();
    while let Some(c) = chars.next() {
        if c == '\u{1b}' {
            if chars.peek() == Some(&'[') {
                chars.next();
                for next in chars.by_ref() {
                    if next.is_ascii_alphabetic() {
                        break;
                    }
                }
            }
        } else {
            out.push(c);
        }
    }
    out
}

fn cleanup_partials(dir: &Path) {
    let Ok(entries) = std::fs::read_dir(dir) else {
        return;
    };
    for entry in entries.flatten() {
        let path = entry.path();
        let name = path.file_name().and_then(|n| n.to_str()).unwrap_or("");
        if name.ends_with(".part") || name.ends_with(".ytdl") {
            let _ = std::fs::remove_file(path);
        }
    }
}

fn find_newest_audio(dir: &Path, since: SystemTime) -> Option<PathBuf> {
    let entries = std::fs::read_dir(dir).ok()?;
    let mut newest: Option<(SystemTime, PathBuf)> = None;
    for entry in entries.flatten() {
        let path = entry.path();
        if !path.is_file() || !util::is_audio_path(&path) {
            continue;
        }
        let modified = entry
            .metadata()
            .and_then(|m| m.modified())
            .unwrap_or(SystemTime::UNIX_EPOCH);
        let threshold = since
            .checked_sub(Duration::from_secs(10))
            .unwrap_or(SystemTime::UNIX_EPOCH);
        if modified.duration_since(threshold).is_err() {
            continue;
        }
        if newest.as_ref().map(|(t, _)| modified > *t).unwrap_or(true) {
            newest = Some((modified, path));
        }
    }
    newest.map(|(_, path)| path)
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LinkInfo {
    pub title: String,
    pub artist: String,
    pub duration: f64,
    pub thumbnail: String,
    pub url: String,
    pub extractor: String,
    pub video_id: String,
}

pub fn fetch_info(url: &str) -> Result<LinkInfo, String> {
    let url = url.trim();
    if !(url.starts_with("http://") || url.starts_with("https://")) {
        return Err("Paste a full link that starts with http:// or https://".to_string());
    }
    let Some(ytdlp) = util::find_binary("yt-dlp") else {
        return Err(
            "yt-dlp was not found. Install it with: brew install yt-dlp ffmpeg".to_string(),
        );
    };
    let output = Command::new(ytdlp)
        .arg("-J")
        .arg("--no-playlist")
        .arg("--no-warnings")
        .arg("--no-colors")
        .arg("--socket-timeout")
        .arg("20")
        .arg("--retries")
        .arg("2")
        .arg("--")
        .arg(url)
        .env("PATH", util::rich_path())
        .output()
        .map_err(|e| format!("Could not start yt-dlp: {e}"))?;

    if !output.status.success() {
        let err = String::from_utf8_lossy(&output.stderr);
        let relevant = err
            .lines()
            .rev()
            .find(|line| line.contains("ERROR:") || line.contains("error"))
            .unwrap_or(err.lines().last().unwrap_or("Could not read that link."));
        return Err(friendly_error(relevant));
    }

    let raw = String::from_utf8_lossy(&output.stdout);
    let start = raw
        .find('{')
        .ok_or("Could not read the link information.")?;
    let end = raw
        .rfind('}')
        .ok_or("Could not read the link information.")?;
    let value: Value = serde_json::from_str(&raw[start..=end])
        .map_err(|e| format!("Could not read the link information: {e}"))?;

    if value.get("_type").and_then(Value::as_str) == Some("playlist")
        && value.get("entries").and_then(Value::as_array).is_none()
    {
        return Err("That is a playlist. Open a single song and copy its link.".to_string());
    }

    let title = value
        .get("title")
        .and_then(Value::as_str)
        .unwrap_or("")
        .trim()
        .to_string();
    let artist = ["artist", "creator", "uploader", "channel", "album_artist"]
        .iter()
        .find_map(|key| value.get(*key).and_then(Value::as_str))
        .unwrap_or("")
        .trim()
        .to_string();
    let duration = value
        .get("duration")
        .and_then(Value::as_f64)
        .or_else(|| {
            value
                .get("duration")
                .and_then(Value::as_u64)
                .map(|v| v as f64)
        })
        .unwrap_or(0.0);
    let thumbnail = best_thumbnail(&value);
    let webpage = value
        .get("webpage_url")
        .and_then(Value::as_str)
        .unwrap_or(url)
        .to_string();
    let extractor = value
        .get("extractor_key")
        .and_then(Value::as_str)
        .or_else(|| value.get("extractor").and_then(Value::as_str))
        .unwrap_or("")
        .to_string();
    let video_id = value
        .get("id")
        .and_then(Value::as_str)
        .unwrap_or("")
        .to_string();

    Ok(LinkInfo {
        title: if title.is_empty() {
            "Untitled".to_string()
        } else {
            title
        },
        artist,
        duration,
        thumbnail,
        url: webpage,
        extractor,
        video_id,
    })
}

fn best_thumbnail(value: &Value) -> String {
    if let Some(thumb) = value.get("thumbnail").and_then(Value::as_str) {
        if !thumb.is_empty() {
            return thumb.to_string();
        }
    }
    let mut best: Option<(u64, bool, String)> = None;
    if let Some(items) = value.get("thumbnails").and_then(Value::as_array) {
        for item in items {
            let Some(url) = item.get("url").and_then(Value::as_str) else {
                continue;
            };
            let width = item.get("width").and_then(Value::as_u64).unwrap_or(0);
            let is_jpg =
                url.to_lowercase().contains(".jpg") || url.to_lowercase().contains(".jpeg");
            let replace = match &best {
                None => true,
                Some((best_width, best_jpg, _)) => {
                    width > *best_width || (width == *best_width && is_jpg && !*best_jpg)
                }
            };
            if replace {
                best = Some((width, is_jpg, url.to_string()));
            }
        }
    }
    best.map(|(_, _, url)| url).unwrap_or_default()
}
