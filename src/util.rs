use std::ffi::OsString;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::{SystemTime, UNIX_EPOCH};

pub const APP_NAME: &str = "Riff";
pub const APP_VERSION: &str = env!("CARGO_PKG_VERSION");

pub fn home_dir() -> PathBuf {
    std::env::var_os("HOME")
        .map(PathBuf::from)
        .unwrap_or_else(|| PathBuf::from("/"))
}

pub fn data_dir() -> PathBuf {
    home_dir()
        .join("Library")
        .join("Application Support")
        .join(APP_NAME)
}

pub fn covers_dir(data_dir: &Path) -> PathBuf {
    data_dir.join("covers")
}

pub fn default_download_dir() -> PathBuf {
    home_dir().join("Music").join(APP_NAME)
}

pub fn ensure_dir(path: &Path) -> std::io::Result<()> {
    fs::create_dir_all(path)
}

pub fn now_secs() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs() as i64)
        .unwrap_or(0)
}

pub fn new_id() -> String {
    uuid::Uuid::new_v4().simple().to_string()
}

pub fn percent_decode(input: &str) -> String {
    percent_encoding::percent_decode_str(input)
        .decode_utf8_lossy()
        .to_string()
}

pub fn is_audio_path(path: &Path) -> bool {
    path.extension()
        .and_then(|e| e.to_str())
        .map(|e| {
            matches!(
                e.to_ascii_lowercase().as_str(),
                "mp3" | "m4a" | "m4b" | "aac" | "flac" | "wav" | "aiff" | "aif" | "ogg" | "opus"
            )
        })
        .unwrap_or(false)
}

pub fn mime_for_audio(path: &Path) -> &'static str {
    match path
        .extension()
        .and_then(|e| e.to_str())
        .unwrap_or("")
        .to_ascii_lowercase()
        .as_str()
    {
        "mp3" => "audio/mpeg",
        "m4a" | "m4b" | "mp4" => "audio/mp4",
        "aac" => "audio/aac",
        "flac" => "audio/flac",
        "wav" => "audio/wav",
        "aiff" | "aif" => "audio/aiff",
        "ogg" | "opus" => "audio/ogg",
        "webm" => "audio/webm",
        _ => "application/octet-stream",
    }
}

/// Directories that GUI apps launched from Finder don't usually have on PATH.
pub fn extra_bin_dirs() -> Vec<PathBuf> {
    let home = home_dir();
    vec![
        PathBuf::from("/opt/homebrew/bin"),
        PathBuf::from("/usr/local/bin"),
        PathBuf::from("/usr/bin"),
        PathBuf::from("/bin"),
        home.join(".local/bin"),
        home.join("bin"),
        home.join(".cargo/bin"),
    ]
}

pub fn rich_path() -> OsString {
    let mut dirs: Vec<PathBuf> = Vec::new();
    if let Some(path) = std::env::var_os("PATH") {
        dirs.extend(std::env::split_paths(&path));
    }
    dirs.extend(extra_bin_dirs());
    let mut seen = std::collections::HashSet::new();
    dirs.retain(|d| seen.insert(d.clone()));
    std::env::join_paths(dirs).unwrap_or_else(|_| OsString::from("/usr/bin:/bin"))
}

pub fn find_binary(name: &str) -> Option<PathBuf> {
    if let Ok(path) = std::env::var("PATH") {
        for dir in std::env::split_paths(&path) {
            let candidate = dir.join(name);
            if candidate.is_file() {
                return Some(candidate);
            }
        }
    }
    for dir in extra_bin_dirs() {
        let candidate = dir.join(name);
        if candidate.is_file() {
            return Some(candidate);
        }
    }
    None
}

pub fn which_display(name: &str) -> Option<String> {
    find_binary(name).map(|p| p.display().to_string())
}

pub fn reveal_in_finder(path: &Path) {
    let _ = Command::new("open").arg("-R").arg(path).spawn();
}

pub fn open_path(path: &Path) {
    let _ = Command::new("open").arg(path).spawn();
}

fn osascript(script: &str) -> Result<String, String> {
    let output = Command::new("osascript")
        .arg("-e")
        .arg(script)
        .output()
        .map_err(|e| format!("Could not open the system dialog: {e}"))?;
    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        let err = String::from_utf8_lossy(&output.stderr).to_string();
        if err.to_lowercase().contains("cancel") {
            Ok(String::new())
        } else {
            Err(err.trim().to_string())
        }
    }
}

fn files_prompt(lang: &str) -> &'static str {
    match lang {
        "ar" => "اختر ملفات صوتية لإضافتها إلى ريف",
        "ja" => "Riffに追加するオーディオファイルを選択",
        _ => "Choose audio files to add to Riff",
    }
}

fn folder_prompt(lang: &str) -> &'static str {
    match lang {
        "ar" => "اختر مجلدًا يحتوي على موسيقى",
        "ja" => "音楽が入っているフォルダを選択",
        _ => "Choose a folder of music",
    }
}

fn download_folder_prompt(lang: &str) -> &'static str {
    match lang {
        "ar" => "اختر مجلد التنزيلات",
        "ja" => "ダウンロード先のフォルダを選択",
        _ => "Choose a download folder",
    }
}

pub fn choose_audio_files(lang: &str) -> Result<Vec<PathBuf>, String> {
    let prompt = files_prompt(lang);
    let script = format!(
        r#"
set theFiles to choose file with prompt "{prompt}" with multiple selections allowed
set out to ""
repeat with f in theFiles
    set out to out & (POSIX path of f) & linefeed
end repeat
return out
"#
    );
    let out = osascript(&script)?;
    Ok(out
        .lines()
        .map(str::trim)
        .filter(|l| !l.is_empty())
        .map(PathBuf::from)
        .collect())
}

pub fn choose_audio_folder(lang: &str) -> Result<Option<PathBuf>, String> {
    let prompt = folder_prompt(lang);
    let script = format!(r#"POSIX path of (choose folder with prompt "{prompt}")"#);
    let out = osascript(&script)?;
    let path = out.trim();
    if path.is_empty() {
        Ok(None)
    } else {
        Ok(Some(PathBuf::from(path)))
    }
}

pub fn choose_download_folder(lang: &str) -> Result<Option<PathBuf>, String> {
    let prompt = download_folder_prompt(lang);
    let script = format!(r#"POSIX path of (choose folder with prompt "{prompt}")"#);
    let out = osascript(&script)?;
    let path = out.trim();
    if path.is_empty() {
        Ok(None)
    } else {
        Ok(Some(PathBuf::from(path)))
    }
}

pub fn write_atomic(path: &Path, bytes: &[u8]) -> std::io::Result<()> {
    use std::sync::atomic::{AtomicU64, Ordering};
    static SEQUENCE: AtomicU64 = AtomicU64::new(0);

    let sequence = SEQUENCE.fetch_add(1, Ordering::Relaxed);
    let name = path
        .file_name()
        .map(|name| name.to_string_lossy().to_string())
        .unwrap_or_else(|| "riff".to_string());
    let tmp = path.with_file_name(format!(".{name}.{}.{sequence}.tmp", std::process::id()));
    fs::write(&tmp, bytes)?;
    match fs::rename(&tmp, path) {
        Ok(()) => Ok(()),
        Err(err) => {
            let _ = fs::remove_file(&tmp);
            Err(err)
        }
    }
}
