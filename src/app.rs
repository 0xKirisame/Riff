use std::fs;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::{Arc, Condvar, Mutex, MutexGuard};

use serde::Serialize;
use serde_json::{json, Value};

use crate::download::{self, ActiveDownload, DownloadSnapshot, QueueItem};
use crate::library::{self, Library, Playlist, Track};
use crate::util;

pub struct App {
    pub data_dir: PathBuf,
    pub covers_dir: PathBuf,
    pub lib: Mutex<Library>,
    pub rev: AtomicU64,
    pub download: Mutex<Option<Arc<ActiveDownload>>>,
    pub queue: Mutex<Vec<QueueItem>>,
    pub queue_cv: Condvar,
    pub queue_save: Mutex<()>,
    pub notice: Mutex<Option<Notice>>,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Notice {
    pub kind: String,
    pub count: usize,
    pub skipped: usize,
}

#[derive(Default, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ImportSummary {
    pub found: usize,
    pub added: usize,
    pub skipped: usize,
    pub failed: usize,
}

pub enum ImportOutcome {
    Added(Track),
    Duplicate,
}

impl App {
    pub fn new() -> std::io::Result<Arc<Self>> {
        let data_dir = util::data_dir();
        let covers_dir = util::covers_dir(&data_dir);
        util::ensure_dir(&data_dir)?;
        util::ensure_dir(&covers_dir)?;

        let mut lib = Library::load(&data_dir);
        if lib.settings.download_dir.trim().is_empty() {
            lib.settings.download_dir = util::default_download_dir().to_string_lossy().to_string();
        }
        let _ = util::ensure_dir(Path::new(&lib.settings.download_dir));
        let _ = lib.save(&data_dir);
        let queue = download::load_queue(&data_dir);

        let app = Arc::new(Self {
            data_dir,
            covers_dir,
            lib: Mutex::new(lib),
            rev: AtomicU64::new(1),
            download: Mutex::new(None),
            queue: Mutex::new(queue),
            queue_cv: Condvar::new(),
            queue_save: Mutex::new(()),
            notice: Mutex::new(None),
        });
        download::spawn_worker(app.clone());
        Ok(app)
    }

    pub fn lock(&self) -> MutexGuard<'_, Library> {
        self.lib.lock().unwrap_or_else(|e| e.into_inner())
    }

    pub fn bump(&self) {
        self.rev.fetch_add(1, Ordering::SeqCst);
    }

    pub fn save(&self, lib: &Library) {
        if let Err(err) = lib.save(&self.data_dir) {
            eprintln!("[riff] could not save library: {err}");
        }
    }

    pub fn save_queue(&self) {
        let _guard = self.queue_save.lock().unwrap_or_else(|e| e.into_inner());
        let items = self.queue.lock().unwrap_or_else(|e| e.into_inner()).clone();
        let bytes = serde_json::to_vec_pretty(&items).unwrap_or_default();
        if let Err(err) = util::write_atomic(&self.data_dir.join("queue.json"), &bytes) {
            eprintln!("[riff] could not save the download queue: {err}");
        }
    }

    pub fn set_notice(&self, kind: &str, count: usize, skipped: usize) {
        let mut notice = self.notice.lock().unwrap_or_else(|e| e.into_inner());
        *notice = Some(Notice {
            kind: kind.to_string(),
            count,
            skipped,
        });
    }

    pub fn clear_notice(&self) {
        let mut notice = self.notice.lock().unwrap_or_else(|e| e.into_inner());
        *notice = None;
    }

    pub fn import_paths(
        &self,
        inputs: &[PathBuf],
        source: &str,
        fallback: Option<(String, String)>,
    ) -> ImportSummary {
        let files = library::collect_audio_files(inputs);
        let mut summary = ImportSummary {
            found: files.len(),
            ..Default::default()
        };
        for path in files {
            match self.import_file(&path, source, fallback.clone()) {
                ImportOutcome::Added(_) => summary.added += 1,
                ImportOutcome::Duplicate => summary.skipped += 1,
            }
        }
        summary
    }

    pub fn import_file(
        &self,
        path: &Path,
        source: &str,
        fallback: Option<(String, String)>,
    ) -> ImportOutcome {
        let canonical = fs::canonicalize(path).unwrap_or_else(|_| path.to_path_buf());
        let path_str = canonical.to_string_lossy().to_string();

        {
            let lib = self.lock();
            if lib.tracks.iter().any(|t| t.path == path_str) {
                return ImportOutcome::Duplicate;
            }
        }

        let meta = library::read_meta(&canonical);
        let id = util::new_id();
        let cover_name = format!("{id}.jpg");
        let cover_path = self.covers_dir.join(&cover_name);
        let mut cover = None;

        if let Some(art) = meta.art.as_ref() {
            if library::save_cover(art, &cover_path) {
                cover = Some(cover_name.clone());
            }
        }
        if cover.is_none() {
            if let Some(sidecar) = library::find_sidecar_cover(&canonical) {
                if let Ok(bytes) = fs::read(&sidecar) {
                    if library::save_cover(&bytes, &cover_path) {
                        cover = Some(cover_name.clone());
                    }
                }
            }
        }
        if cover.is_none() {
            let _ = fs::remove_file(&cover_path);
        }

        let (fallback_title, fallback_artist) = fallback.unwrap_or_default();
        let file_stem = canonical
            .file_stem()
            .map(|s| s.to_string_lossy().to_string())
            .unwrap_or_else(|| "Untitled".to_string());

        let title = meta
            .title
            .filter(|t| !t.trim().is_empty())
            .or_else(|| (!fallback_title.trim().is_empty()).then_some(fallback_title))
            .unwrap_or(file_stem);
        let artist = meta
            .artist
            .filter(|a| !a.trim().is_empty())
            .or_else(|| (!fallback_artist.trim().is_empty()).then_some(fallback_artist))
            .unwrap_or_default();

        let track = Track {
            id: id.clone(),
            path: path_str,
            title,
            artist,
            album: meta.album.unwrap_or_default(),
            duration: if meta.duration.is_finite() {
                meta.duration
            } else {
                0.0
            },
            cover: cover.clone(),
            source: source.to_string(),
            added_at: util::now_secs(),
        };

        {
            let mut lib = self.lock();
            if lib.tracks.iter().any(|t| t.path == track.path) {
                if cover.is_some() {
                    let _ = fs::remove_file(&cover_path);
                }
                return ImportOutcome::Duplicate;
            }
            lib.tracks.push(track.clone());
            self.save(&lib);
        }
        self.bump();
        ImportOutcome::Added(track)
    }

    pub fn remove_track(&self, id: &str) -> bool {
        let removed_cover = {
            let mut lib = self.lock();
            let Some(index) = lib.tracks.iter().position(|t| t.id == id) else {
                return false;
            };
            let track = lib.tracks.remove(index);
            let cover = track.cover;
            for playlist in &mut lib.playlists {
                playlist.track_ids.retain(|track_id| track_id != id);
            }
            self.save(&lib);
            cover
        };
        if let Some(cover) = removed_cover {
            let _ = fs::remove_file(self.covers_dir.join(cover));
        }
        self.bump();
        true
    }

    pub fn track(&self, id: &str) -> Option<Track> {
        let lib = self.lock();
        lib.tracks.iter().find(|t| t.id == id).cloned()
    }

    pub fn create_playlist(&self, name: &str) -> Result<Playlist, String> {
        let name = clean_name(name)?;
        let playlist = Playlist {
            id: util::new_id(),
            name,
            track_ids: Vec::new(),
            created_at: util::now_secs(),
        };
        {
            let mut lib = self.lock();
            lib.playlists.push(playlist.clone());
            self.save(&lib);
        }
        self.bump();
        Ok(playlist)
    }

    pub fn rename_playlist(&self, id: &str, name: &str) -> Result<(), String> {
        let name = clean_name(name)?;
        {
            let mut lib = self.lock();
            let Some(playlist) = lib.playlists.iter_mut().find(|p| p.id == id) else {
                return Err("Playlist not found".to_string());
            };
            playlist.name = name;
            self.save(&lib);
        }
        self.bump();
        Ok(())
    }

    pub fn delete_playlist(&self, id: &str) -> bool {
        let mut lib = self.lock();
        let before = lib.playlists.len();
        lib.playlists.retain(|p| p.id != id);
        let changed = lib.playlists.len() != before;
        if changed {
            self.save(&lib);
            drop(lib);
            self.bump();
        }
        changed
    }

    pub fn add_to_playlist(&self, playlist_id: &str, track_ids: &[String]) -> usize {
        let mut added = 0;
        {
            let mut lib = self.lock();
            let known: std::collections::HashSet<String> =
                lib.tracks.iter().map(|t| t.id.clone()).collect();
            let Some(playlist) = lib.playlists.iter_mut().find(|p| p.id == playlist_id) else {
                return 0;
            };
            for id in track_ids {
                if known.contains(id) && !playlist.track_ids.iter().any(|t| t == id) {
                    playlist.track_ids.push(id.clone());
                    added += 1;
                }
            }
            if added > 0 {
                self.save(&lib);
            }
        }
        if added > 0 {
            self.bump();
        }
        added
    }

    pub fn remove_from_playlist(&self, playlist_id: &str, track_id: &str) -> bool {
        let mut lib = self.lock();
        let Some(playlist) = lib.playlists.iter_mut().find(|p| p.id == playlist_id) else {
            return false;
        };
        let before = playlist.track_ids.len();
        playlist.track_ids.retain(|id| id != track_id);
        let changed = playlist.track_ids.len() != before;
        if changed {
            self.save(&lib);
            drop(lib);
            self.bump();
        }
        changed
    }

    pub fn update_settings(&self, patch: &Value) -> Result<(), String> {
        {
            let mut lib = self.lock();
            let settings = &mut lib.settings;
            if let Some(language) = patch.get("language").and_then(Value::as_str) {
                if matches!(language, "auto" | "en" | "ar" | "ja") {
                    settings.language = language.to_string();
                }
            }
            if let Some(format) = patch.get("format").and_then(Value::as_str) {
                if matches!(format, "mp3" | "m4a") {
                    settings.format = format.to_string();
                }
            }
            if let Some(quality) = patch.get("quality").and_then(Value::as_str) {
                if matches!(quality, "best" | "320" | "192") {
                    settings.quality = quality.to_string();
                }
            }
            if let Some(dir) = patch.get("downloadDir").and_then(Value::as_str) {
                let dir = dir.trim();
                if !dir.is_empty() {
                    util::ensure_dir(Path::new(dir))
                        .map_err(|e| format!("Could not use that folder: {e}"))?;
                    settings.download_dir = dir.to_string();
                }
            }
            self.save(&lib);
        }
        self.bump();
        Ok(())
    }

    pub fn job_snapshot(&self) -> Option<DownloadSnapshot> {
        let guard = self.download.lock().unwrap_or_else(|e| e.into_inner());
        guard.as_ref().map(|active| active.snapshot())
    }

    pub fn job(&self) -> Option<Arc<ActiveDownload>> {
        self.download
            .lock()
            .unwrap_or_else(|e| e.into_inner())
            .clone()
    }

    pub fn queue_snapshot(&self) -> Vec<QueueItem> {
        let job = self.job_snapshot();
        let mut items = self.queue.lock().unwrap_or_else(|e| e.into_inner()).clone();
        if let Some(job) = job {
            if let Some(item) = items.iter_mut().find(|item| item.id == job.id) {
                item.status = job.status;
                item.progress = job.progress;
                item.message = job.message;
                item.track_id = job.track_id;
                if !job.title.is_empty() {
                    item.title = job.title;
                }
                if !job.artist.is_empty() {
                    item.artist = job.artist;
                }
                if !job.thumbnail.is_empty() {
                    item.thumbnail = job.thumbnail;
                }
            }
        }
        items
    }

    pub fn state_json(&self) -> Value {
        let job = self.job_snapshot();
        let queue = self.queue_snapshot();
        let notice = self
            .notice
            .lock()
            .unwrap_or_else(|e| e.into_inner())
            .clone();
        let lib = self.lock();

        let tracks: Vec<Value> = lib
            .tracks
            .iter()
            .map(|track| {
                let mut value = serde_json::to_value(track).unwrap_or(Value::Null);
                if let Value::Object(map) = &mut value {
                    let path = Path::new(&track.path);
                    map.insert("available".into(), json!(path.exists()));
                    map.insert("hasCover".into(), json!(track.cover.is_some()));
                    map.insert(
                        "fileName".into(),
                        json!(path
                            .file_name()
                            .map(|n| n.to_string_lossy().to_string())
                            .unwrap_or_default()),
                    );
                }
                value
            })
            .collect();

        json!({
            "rev": self.rev.load(Ordering::SeqCst),
            "tracks": tracks,
            "playlists": lib.playlists,
            "settings": lib.settings,
            "job": job,
            "queue": queue,
            "notice": notice,
            "tools": {
                "ytdlp": util::which_display("yt-dlp"),
                "ffmpeg": util::which_display("ffmpeg"),
            },
            "paths": {
                "dataDir": self.data_dir.to_string_lossy(),
                "downloadDir": lib.settings.download_dir,
                "downloadsUrl": "https://github.com/yt-dlp/yt-dlp",
            },
            "version": util::APP_VERSION,
        })
    }
}

fn clean_name(name: &str) -> Result<String, String> {
    let name = name.trim();
    if name.is_empty() {
        return Err("Name cannot be empty".to_string());
    }
    Ok(name.chars().take(80).collect())
}
