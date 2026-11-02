use std::collections::HashSet;
use std::fs;
use std::path::{Path, PathBuf};

use lofty::file::{AudioFile, TaggedFileExt};
use lofty::probe::Probe;
use lofty::tag::Accessor;
use serde::{Deserialize, Serialize};

use crate::util;

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Track {
    pub id: String,
    pub path: String,
    pub title: String,
    #[serde(default)]
    pub artist: String,
    #[serde(default)]
    pub album: String,
    #[serde(default)]
    pub duration: f64,
    #[serde(default)]
    pub cover: Option<String>,
    #[serde(default = "default_source")]
    pub source: String,
    #[serde(default)]
    pub added_at: i64,
}

fn default_source() -> String {
    "import".to_string()
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Playlist {
    pub id: String,
    pub name: String,
    #[serde(default)]
    pub track_ids: Vec<String>,
    #[serde(default)]
    pub created_at: i64,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Settings {
    #[serde(default = "default_language")]
    pub language: String,
    #[serde(default)]
    pub download_dir: String,
    #[serde(default = "default_format")]
    pub format: String,
    #[serde(default = "default_quality")]
    pub quality: String,
}

fn default_language() -> String {
    "auto".to_string()
}
fn default_format() -> String {
    "mp3".to_string()
}
fn default_quality() -> String {
    "best".to_string()
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            language: default_language(),
            download_dir: String::new(),
            format: default_format(),
            quality: default_quality(),
        }
    }
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Library {
    #[serde(default)]
    pub tracks: Vec<Track>,
    #[serde(default)]
    pub playlists: Vec<Playlist>,
    #[serde(default)]
    pub settings: Settings,
}

impl Library {
    pub fn load(data_dir: &Path) -> Self {
        let path = data_dir.join("library.json");
        let raw = match fs::read_to_string(&path) {
            Ok(raw) => raw,
            Err(_) => return Self::default(),
        };
        match serde_json::from_str::<Library>(&raw) {
            Ok(mut lib) => {
                if lib.settings.download_dir.trim().is_empty() {
                    lib.settings.download_dir =
                        util::default_download_dir().to_string_lossy().to_string();
                }
                lib
            }
            Err(err) => {
                eprintln!("[riff] could not read library.json: {err}");
                let backup = data_dir.join("library.corrupt.json");
                let _ = fs::copy(&path, backup);
                Self::default()
            }
        }
    }

    pub fn save(&self, data_dir: &Path) -> std::io::Result<()> {
        let bytes = serde_json::to_vec_pretty(self).unwrap_or_default();
        util::write_atomic(&data_dir.join("library.json"), &bytes)
    }
}

#[derive(Default, Debug, Clone)]
pub struct Meta {
    pub title: Option<String>,
    pub artist: Option<String>,
    pub album: Option<String>,
    pub duration: f64,
    pub art: Option<Vec<u8>>,
}

pub fn read_meta(path: &Path) -> Meta {
    let mut meta = Meta::default();
    let tagged = match Probe::open(path).and_then(|probe| probe.read()) {
        Ok(tagged) => tagged,
        Err(err) => {
            eprintln!("[riff] metadata: {}: {err}", path.display());
            return meta;
        }
    };
    meta.duration = tagged.properties().duration().as_secs_f64();
    let tag = tagged.primary_tag().or_else(|| tagged.first_tag());
    if let Some(tag) = tag {
        meta.title = clean(tag.title().map(|s| s.to_string()));
        meta.artist = clean(artist_of(tag));
        meta.album = clean(tag.album().map(|s| s.to_string()));
        if let Some(pic) = tag.pictures().first() {
            meta.art = Some(pic.data().to_vec());
        }
    }
    meta
}

fn artist_of(tag: &lofty::tag::Tag) -> Option<String> {
    if let Some(artist) = tag.artist().map(|s| s.to_string()) {
        if !artist.trim().is_empty() {
            return Some(artist);
        }
    }
    tag.get_string(lofty::tag::ItemKey::AlbumArtist)
        .map(|s| s.to_string())
        .or_else(|| {
            tag.get_string(lofty::tag::ItemKey::TrackArtist)
                .map(|s| s.to_string())
        })
}

fn clean(value: Option<String>) -> Option<String> {
    value
        .map(|s| s.trim().trim_matches('\0').trim().to_string())
        .filter(|s| !s.is_empty())
}

/// Decode cover art, resize it, and save it as a JPEG.
pub fn save_cover(bytes: &[u8], dest: &Path) -> bool {
    let Ok(img) = image::load_from_memory(bytes) else {
        return false;
    };
    let thumb = img.thumbnail(720, 720);
    let rgb = thumb.to_rgb8();
    let mut out = Vec::new();
    let mut encoder = image::codecs::jpeg::JpegEncoder::new_with_quality(&mut out, 86);
    if encoder
        .encode(
            rgb.as_raw(),
            rgb.width(),
            rgb.height(),
            image::ExtendedColorType::Rgb8,
        )
        .is_err()
    {
        return false;
    }
    fs::write(dest, out).is_ok()
}

/// Look for artwork stored next to the audio file (covers written by yt-dlp,
/// plus common folder art names).
pub fn find_sidecar_cover(audio: &Path) -> Option<PathBuf> {
    let parent = audio.parent()?;
    let stem = audio.file_stem()?.to_string_lossy().to_string();
    let image_exts = ["jpg", "jpeg", "png", "webp"];
    if let Ok(entries) = fs::read_dir(parent) {
        for entry in entries.flatten() {
            let path = entry.path();
            if !path.is_file() {
                continue;
            }
            let Some(ext) = path.extension().and_then(|e| e.to_str()) else {
                continue;
            };
            if !image_exts.contains(&ext.to_ascii_lowercase().as_str()) {
                continue;
            }
            if path.file_stem().and_then(|s| s.to_str()) == Some(stem.as_str()) {
                return Some(path);
            }
        }
    }
    for name in ["cover", "folder", "album", "front"] {
        for ext in image_exts {
            let candidate = parent.join(format!("{name}.{ext}"));
            if candidate.is_file() {
                return Some(candidate);
            }
        }
    }
    None
}

pub fn collect_audio_files(inputs: &[PathBuf]) -> Vec<PathBuf> {
    let mut files = Vec::new();
    let mut seen = HashSet::new();
    for input in inputs {
        let input = input.clone();
        if input.is_dir() {
            walk_dir(&input, 0, &mut files, &mut seen);
        } else if util::is_audio_path(&input) {
            if let Ok(canonical) = fs::canonicalize(&input) {
                if seen.insert(canonical.clone()) {
                    files.push(canonical);
                }
            }
        }
    }
    files.sort();
    files
}

fn walk_dir(dir: &Path, depth: usize, files: &mut Vec<PathBuf>, seen: &mut HashSet<PathBuf>) {
    if depth > 12 {
        return;
    }
    let Ok(entries) = fs::read_dir(dir) else {
        return;
    };
    let mut paths: Vec<PathBuf> = entries.flatten().map(|e| e.path()).collect();
    paths.sort();
    for path in paths {
        let name = path.file_name().and_then(|n| n.to_str()).unwrap_or("");
        if name.starts_with('.') {
            continue;
        }
        if path.is_dir() {
            walk_dir(&path, depth + 1, files, seen);
        } else if util::is_audio_path(&path) {
            if let Ok(canonical) = fs::canonicalize(&path) {
                if seen.insert(canonical.clone()) {
                    files.push(canonical);
                }
            }
        }
    }
}
