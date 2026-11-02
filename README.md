# Riff

A small, local music player for macOS. Riff keeps your library on your Mac, plays
your files through a native WebKit window, and can save songs from a link with
`yt-dlp` — with a persistent download queue.

## Features

- **Local library** — add files or whole folders, search and sort, edit playlists.
- **Trilingual UI** — English, Arabic (full RTL layout) and Japanese, with proper
  Arabic shaping through WebKit.
- **Link downloads** — paste a YouTube, SoundCloud, Bandcamp, Vimeo and similar
  link; Riff downloads the audio, embeds artwork and tags, and adds it to your
  library.
- **Download queue** — add links while another song is downloading. Riff works
  through them one at a time, and the queue survives quitting and relaunching.
- **Retry on error** — failed or cancelled items stay in the queue with a
  **Retry** button. **Retry failed** retries every failed item at once.
- **Artwork** — embedded covers are extracted and cached; sidecar images are
  picked up too.
- **Native window** — transparent title bar, custom drag strip, system menus,
  Finder drag-and-drop import.

## Requirements

- macOS 13 or newer (Apple Silicon or Intel).
- Rust 1.85+ to build from source.
- [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) and `ffmpeg` for link downloads:

```sh
brew install yt-dlp ffmpeg
```

The player and library work without `yt-dlp`/`ffmpeg`; only link downloads need
them. Riff looks in Homebrew's usual locations, so it still finds both when
launched from Finder.

## Build

```sh
cd Riff
cargo build --release
```

Build a signed `.app` bundle:

```sh
./scripts/bundle.sh
```

This creates `~/Applications/Riff.app`, ad-hoc signs it, and prints the `open`
command. Pass a different destination as the first argument:

```sh
./scripts/bundle.sh /Applications/Riff.app
```

The icon is generated from `scripts/make-icon.py`; the bundle script regenerates
it when `assets/Riff.icns` is missing.

## Using the queue

1. Open **Downloads**.
2. Paste a link (or fetch its details first to show the title and artwork).
3. Press **Download song**. If something is already downloading, the button
   becomes **Add to queue**.
4. Add more links while the queue runs.
5. If an item fails, press **Retry** on that row, or **Retry failed** in the
   queue header to retry everything that failed.
6. **Clear finished** removes completed, failed and cancelled rows from the
   queue without touching downloaded files.

Queued and interrupted items are saved to `queue.json`. If Riff quits while a
download is running, that item is queued again on the next launch. Completed
items are not restored to the queue — the songs themselves are already in the
library.

## Where files live

| What | Where |
| --- | --- |
| Library database | `~/Library/Application Support/Riff/library.json` |
| Download queue | `~/Library/Application Support/Riff/queue.json` |
| Cached covers | `~/Library/Application Support/Riff/covers/` |
| Downloaded audio | `~/Music/Riff` (change in **Settings**) |

Removing a song from the library does not delete the audio file. Use **Show in
Finder** to manage the original file.

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| Space | Play / pause |
| ← / → | Seek 5 seconds |
| ↑ / ↓ | Volume |
| N / P | Next / previous track |
| M | Mute |
| ⌘F | Search |
| ⌘I | Add music |
| Esc | Close menu or dialog |

## Development

```sh
cargo run
```

Useful environment variables:

- `RIFF_PORT=41999` — use a fixed local server port (default: random).
- `RIFF_DEVTOOLS=1` — enable the WebKit inspector.

The window loads `http://127.0.0.1:<port>` from a local `tiny_http` server. The
server binds to loopback only and supports HTTP Range requests so the audio
element can seek. UI assets are embedded into the binary with `include_str!`;
rebuild after editing files in `ui/`.

Source layout:

- `src/main.rs` — window, web view, native menu, drag and drop.
- `src/app.rs` — library state, playlists, settings, queue snapshots.
- `src/download.rs` — queue worker, `yt-dlp` job, progress parsing, retries.
- `src/http.rs` — JSON API, static assets, Range streaming, cover images.
- `src/library.rs` — JSON persistence, metadata and cover extraction.
- `src/util.rs` — paths, tool discovery, file dialogs, atomic writes.

## Troubleshooting

**Downloads fail with “yt-dlp was not found”.** Install both tools with
`brew install yt-dlp ffmpeg`, then relaunch Riff. Check with:

```sh
/opt/homebrew/bin/yt-dlp --version
/opt/homebrew/bin/ffmpeg -version
```

**YouTube asks for a sign-in or bot check.** Update `yt-dlp`
(`brew upgrade yt-dlp`) and try again. Some links are region-locked or require
an account; Riff shows the error in the queue so you can retry later.

**The app opens with a blank window.** The bundled `Info.plist` allows local
HTTP loads for the built-in server. If you build a custom bundle, keep the
`NSAppTransportSecurity` keys and the `app.riff.player` identifier.

**A download looks stuck.** Cancel it from the queue (the active row has a
**Cancel** button) and press **Retry**. Cancelling removes partial `.part` files
but leaves finished songs alone.

## Notes

Riff is a local player. It does not upload your library, and the HTTP server is
reachable only from `127.0.0.1`. Only download content you have the right to
save.
