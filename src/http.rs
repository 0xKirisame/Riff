use std::fs::{self, File};
use std::io::{self, Read, Seek, SeekFrom};
use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::thread;

use serde_json::{json, Value};
use tiny_http::{Header, Method, Request, Response, Server, StatusCode};

use crate::app::App;
use crate::download;
use crate::util;

pub fn start(app: Arc<App>) -> io::Result<u16> {
    let requested_port: u16 = std::env::var("RIFF_PORT")
        .ok()
        .and_then(|value| value.parse().ok())
        .unwrap_or(0);

    let server = Server::http(("127.0.0.1", requested_port))
        .map_err(|err| io::Error::other(err.to_string()))?;
    let port = server
        .server_addr()
        .to_ip()
        .ok_or_else(|| io::Error::other("Could not determine the local server address"))?
        .port();

    thread::spawn(move || {
        for request in server.incoming_requests() {
            let app = app.clone();
            thread::spawn(move || {
                if let Err(err) = handle(app, request) {
                    eprintln!("[riff] request error: {err}");
                }
            });
        }
    });

    Ok(port)
}

fn handle(app: Arc<App>, mut req: Request) -> io::Result<()> {
    let raw_url = req.url().to_string();
    let path = raw_url.split('?').next().unwrap_or("").to_string();
    let method = req.method().clone();

    match path.as_str() {
        "/" | "/index.html" => return serve_static(req, INDEX_HTML, "text/html; charset=utf-8"),
        "/styles.css" => return serve_static(req, STYLES_CSS, "text/css; charset=utf-8"),
        "/app.js" => return serve_static(req, APP_JS, "text/javascript; charset=utf-8"),
        "/favicon.ico" => return respond_empty(req, 204),
        _ => {}
    }

    if let Some(id) = path.strip_prefix("/api/stream/") {
        if method == Method::Get || method == Method::Head {
            return serve_stream(req, &app, &util::percent_decode(id));
        }
        return respond_empty(req, 405);
    }
    if let Some(id) = path.strip_prefix("/api/cover/") {
        if method == Method::Get || method == Method::Head {
            return serve_cover(req, &app, &util::percent_decode(id));
        }
        return respond_empty(req, 405);
    }

    if method == Method::Get {
        match path.as_str() {
            "/api/state" => return json_response(req, 200, app.state_json()),
            "/api/download/status" => {
                return json_response(
                    req,
                    200,
                    json!({ "job": app.job_snapshot(), "queue": app.queue_snapshot() }),
                )
            }
            "/api/health" => return json_response(req, 200, json!({ "ok": true })),
            _ => return json_error(req, 404, "Not found"),
        }
    }

    if method != Method::Post {
        return respond_empty(req, 405);
    }

    let body = match read_json(&mut req) {
        Ok(body) => body,
        Err(err) => return json_error(req, 400, &err),
    };

    match path.as_str() {
        "/api/import" => {
            let lang = body
                .get("lang")
                .and_then(Value::as_str)
                .map(str::to_string)
                .unwrap_or_else(|| app.lock().settings.language.clone());
            let mode = body.get("mode").and_then(Value::as_str).unwrap_or("files");
            let picked = if mode == "folder" {
                util::choose_audio_folder(&lang)
                    .map(|folder| folder.into_iter().collect::<Vec<_>>())
            } else {
                util::choose_audio_files(&lang)
            };
            match picked {
                Ok(paths) => {
                    let cancelled = paths.is_empty();
                    let summary = app.import_paths(&paths, "import", None);
                    json_response(
                        req,
                        200,
                        json!({
                            "found": summary.found,
                            "added": summary.added,
                            "skipped": summary.skipped,
                            "failed": summary.failed,
                            "cancelled": cancelled,
                        }),
                    )
                }
                Err(err) => json_error(req, 500, &err),
            }
        }
        "/api/add-paths" => {
            let paths: Vec<PathBuf> = body
                .get("paths")
                .and_then(Value::as_array)
                .map(|items| {
                    items
                        .iter()
                        .filter_map(Value::as_str)
                        .map(PathBuf::from)
                        .collect()
                })
                .unwrap_or_default();
            let summary = app.import_paths(&paths, "import", None);
            app.set_notice("import", summary.added, summary.skipped);
            json_response(
                req,
                200,
                serde_json::to_value(summary).unwrap_or(Value::Null),
            )
        }
        "/api/track/remove" => {
            let id = body.get("id").and_then(Value::as_str).unwrap_or("");
            let removed = app.remove_track(id);
            json_response(req, 200, json!({ "removed": removed }))
        }
        "/api/track/reveal" => {
            let id = body.get("id").and_then(Value::as_str).unwrap_or("");
            match app.track(id) {
                Some(track) => {
                    util::reveal_in_finder(Path::new(&track.path));
                    json_response(req, 200, json!({ "ok": true }))
                }
                None => json_error(req, 404, "Track not found"),
            }
        }
        "/api/playlists/create" => {
            let name = body.get("name").and_then(Value::as_str).unwrap_or("");
            match app.create_playlist(name) {
                Ok(playlist) => json_response(req, 200, json!({ "playlist": playlist })),
                Err(err) => json_error(req, 400, &err),
            }
        }
        "/api/playlists/rename" => {
            let id = body.get("id").and_then(Value::as_str).unwrap_or("");
            let name = body.get("name").and_then(Value::as_str).unwrap_or("");
            match app.rename_playlist(id, name) {
                Ok(()) => json_response(req, 200, json!({ "ok": true })),
                Err(err) => json_error(req, 400, &err),
            }
        }
        "/api/playlists/delete" => {
            let id = body.get("id").and_then(Value::as_str).unwrap_or("");
            let removed = app.delete_playlist(id);
            json_response(req, 200, json!({ "removed": removed }))
        }
        "/api/playlists/add" => {
            let playlist_id = body.get("playlistId").and_then(Value::as_str).unwrap_or("");
            let mut ids: Vec<String> = body
                .get("trackIds")
                .and_then(Value::as_array)
                .map(|items| {
                    items
                        .iter()
                        .filter_map(Value::as_str)
                        .map(str::to_string)
                        .collect()
                })
                .unwrap_or_default();
            if let Some(single) = body.get("trackId").and_then(Value::as_str) {
                ids.push(single.to_string());
            }
            let added = app.add_to_playlist(playlist_id, &ids);
            json_response(req, 200, json!({ "added": added }))
        }
        "/api/playlists/remove" => {
            let playlist_id = body.get("playlistId").and_then(Value::as_str).unwrap_or("");
            let track_id = body.get("trackId").and_then(Value::as_str).unwrap_or("");
            let removed = app.remove_from_playlist(playlist_id, track_id);
            json_response(req, 200, json!({ "removed": removed }))
        }
        "/api/settings" => match app.update_settings(&body) {
            Ok(()) => json_response(req, 200, json!({ "ok": true })),
            Err(err) => json_error(req, 400, &err),
        },
        "/api/choose-download-dir" => {
            let lang = body
                .get("lang")
                .and_then(Value::as_str)
                .map(str::to_string)
                .unwrap_or_else(|| app.lock().settings.language.clone());
            match util::choose_download_folder(&lang) {
                Ok(Some(folder)) => {
                    let path = folder.to_string_lossy().to_string();
                    match app.update_settings(&json!({ "downloadDir": path })) {
                        Ok(()) => json_response(
                            req,
                            200,
                            json!({
                                "downloadDir": app.lock().settings.download_dir,
                            }),
                        ),
                        Err(err) => json_error(req, 400, &err),
                    }
                }
                Ok(None) => json_response(
                    req,
                    200,
                    json!({ "downloadDir": app.lock().settings.download_dir }),
                ),
                Err(err) => json_error(req, 500, &err),
            }
        }
        "/api/open" => {
            let target = body.get("target").and_then(Value::as_str).unwrap_or("");
            let path = match target {
                "downloads" => PathBuf::from(app.lock().settings.download_dir.clone()),
                "data" => app.data_dir.clone(),
                _ => return json_error(req, 400, "Unknown folder"),
            };
            util::ensure_dir(&path).ok();
            util::open_path(&path);
            json_response(req, 200, json!({ "ok": true }))
        }
        "/api/download/info" => {
            let url = body.get("url").and_then(Value::as_str).unwrap_or("");
            match download::fetch_info(url) {
                Ok(info) => json_response(req, 200, json!({ "info": info })),
                Err(err) => json_error(req, 400, &err),
            }
        }
        "/api/download/start" => {
            let url = body.get("url").and_then(Value::as_str).unwrap_or("");
            let format = body
                .get("format")
                .and_then(Value::as_str)
                .map(str::to_string);
            let quality = body
                .get("quality")
                .and_then(Value::as_str)
                .map(str::to_string);
            let title = body
                .get("title")
                .and_then(Value::as_str)
                .map(str::to_string);
            let artist = body
                .get("artist")
                .and_then(Value::as_str)
                .map(str::to_string);
            match download::start(app.clone(), url.to_string(), format, quality, title, artist) {
                Ok(item) => json_response(
                    req,
                    200,
                    json!({
                        "item": item,
                        "job": app.job_snapshot(),
                        "queue": app.queue_snapshot(),
                    }),
                ),
                Err(err) => json_error(req, 400, &err),
            }
        }
        "/api/download/cancel" => match body.get("id").and_then(Value::as_str) {
            Some(id) => {
                let cancelled = download::cancel_item(&app, id);
                json_response(
                    req,
                    200,
                    json!({ "cancelled": cancelled, "queue": app.queue_snapshot() }),
                )
            }
            None => {
                download::cancel(&app);
                json_response(req, 200, json!({ "ok": true }))
            }
        },
        "/api/download/retry" => {
            let id = body.get("id").and_then(Value::as_str);
            match download::retry(&app, id) {
                Ok(retried) => json_response(
                    req,
                    200,
                    json!({
                        "retried": retried,
                        "job": app.job_snapshot(),
                        "queue": app.queue_snapshot(),
                    }),
                ),
                Err(err) => json_error(req, 400, &err),
            }
        }
        "/api/download/remove" => {
            let id = body.get("id").and_then(Value::as_str).unwrap_or("");
            let removed = download::remove(&app, id);
            json_response(
                req,
                200,
                json!({ "removed": removed, "queue": app.queue_snapshot() }),
            )
        }
        "/api/download/clear" => {
            let removed = download::clear_finished(&app);
            json_response(
                req,
                200,
                json!({ "removed": removed, "queue": app.queue_snapshot() }),
            )
        }
        "/api/notice/clear" => {
            app.clear_notice();
            json_response(req, 200, json!({ "ok": true }))
        }
        _ => json_error(req, 404, "Not found"),
    }
}

fn serve_static(req: Request, body: &'static str, content_type: &str) -> io::Result<()> {
    let response = Response::from_string(body)
        .with_header(header("Content-Type", content_type))
        .with_header(header("Cache-Control", "no-store"))
        .with_chunked_threshold(usize::MAX);
    req.respond(response)
}

fn serve_cover(req: Request, app: &App, id: &str) -> io::Result<()> {
    let Some(track) = app.track(id) else {
        return respond_empty(req, 404);
    };
    let Some(cover) = track.cover else {
        return respond_empty(req, 404);
    };
    let path = app.covers_dir.join(cover);
    let Ok(bytes) = fs::read(&path) else {
        return respond_empty(req, 404);
    };
    let response = Response::from_data(bytes)
        .with_header(header("Content-Type", "image/jpeg"))
        .with_header(header(
            "Cache-Control",
            "public, max-age=31536000, immutable",
        ))
        .with_chunked_threshold(usize::MAX);
    req.respond(response)
}

fn serve_stream(req: Request, app: &App, id: &str) -> io::Result<()> {
    let Some(track) = app.track(id) else {
        return respond_empty(req, 404);
    };
    let path = PathBuf::from(&track.path);
    let Ok(mut file) = File::open(&path) else {
        return respond_empty(req, 404);
    };
    let Ok(metadata) = file.metadata() else {
        return respond_empty(req, 500);
    };
    let total = metadata.len();
    if total == 0 {
        return respond_empty(req, 416);
    }

    let range_header = req
        .headers()
        .iter()
        .find(|h| h.field.equiv("Range"))
        .map(|h| h.value.as_str().to_string());

    let mime = util::mime_for_audio(&path);

    match range_header
        .as_deref()
        .and_then(|value| parse_range(value, total))
    {
        Some(Ok((start, end))) => {
            let length = end - start + 1;
            file.seek(SeekFrom::Start(start))?;
            let reader = file.take(length);
            let headers = vec![
                header("Content-Type", mime),
                header("Accept-Ranges", "bytes"),
                header("Content-Range", &format!("bytes {start}-{end}/{total}")),
                header("Cache-Control", "no-store"),
            ];
            let response = Response::new(
                StatusCode(206),
                headers,
                reader,
                Some(length as usize),
                None,
            )
            .with_chunked_threshold(usize::MAX);
            req.respond(response)
        }
        Some(Err(())) => {
            let response = Response::empty(StatusCode(416))
                .with_header(header("Content-Range", &format!("bytes */{total}")));
            req.respond(response)
        }
        None => {
            let headers = vec![
                header("Content-Type", mime),
                header("Accept-Ranges", "bytes"),
                header("Content-Length", &total.to_string()),
                header("Cache-Control", "no-store"),
            ];
            let response =
                Response::new(StatusCode(200), headers, file, Some(total as usize), None)
                    .with_chunked_threshold(usize::MAX);
            req.respond(response)
        }
    }
}

fn parse_range(value: &str, total: u64) -> Option<Result<(u64, u64), ()>> {
    let value = value.trim();
    let spec = value
        .strip_prefix("bytes=")
        .or_else(|| value.strip_prefix("Bytes="))?;
    let first = spec.split(',').next()?.trim();
    let (start_raw, end_raw) = first.split_once('-')?;
    if start_raw.is_empty() {
        let suffix: u64 = end_raw.trim().parse().ok()?;
        if suffix == 0 {
            return Some(Err(()));
        }
        let start = total.saturating_sub(suffix);
        return Some(Ok((start, total - 1)));
    }
    let start: u64 = start_raw.trim().parse().ok()?;
    if start >= total {
        return Some(Err(()));
    }
    let end = if end_raw.trim().is_empty() {
        total - 1
    } else {
        let end: u64 = end_raw.trim().parse().ok()?;
        end.min(total - 1)
    };
    if end < start {
        return Some(Err(()));
    }
    Some(Ok((start, end)))
}

fn read_json(req: &mut Request) -> Result<Value, String> {
    let mut text = String::new();
    req.as_reader()
        .take(4_000_000)
        .read_to_string(&mut text)
        .map_err(|err| format!("Could not read the request: {err}"))?;
    if text.trim().is_empty() {
        return Ok(json!({}));
    }
    serde_json::from_str(&text).map_err(|err| format!("Invalid request: {err}"))
}

fn json_response(req: Request, status: u16, value: Value) -> io::Result<()> {
    let body = serde_json::to_vec(&value).unwrap_or_else(|_| b"{}".to_vec());
    let response = Response::from_data(body)
        .with_status_code(StatusCode(status))
        .with_header(header("Content-Type", "application/json; charset=utf-8"))
        .with_header(header("Cache-Control", "no-store"))
        .with_chunked_threshold(usize::MAX);
    req.respond(response)
}

fn json_error(req: Request, status: u16, message: &str) -> io::Result<()> {
    json_response(req, status, json!({ "error": message }))
}

fn respond_empty(req: Request, status: u16) -> io::Result<()> {
    req.respond(Response::empty(StatusCode(status)))
}

fn header(name: &str, value: &str) -> Header {
    Header::from_bytes(name.as_bytes(), value.as_bytes()).expect("valid header")
}

const INDEX_HTML: &str = include_str!("../ui/index.html");
const STYLES_CSS: &str = include_str!("../ui/styles.css");
const APP_JS: &str = include_str!("../ui/app.js");
