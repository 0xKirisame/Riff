#![cfg_attr(target_os = "macos", allow(unexpected_cfgs))]

mod app;
mod download;
mod http;
mod library;
mod util;

use std::sync::Arc;
use std::thread;

use tao::dpi::LogicalSize;
use tao::event::{Event, WindowEvent};
use tao::event_loop::{ControlFlow, EventLoop};
use tao::window::{Theme, WindowBuilder};
use wry::WebViewBuilder;

#[cfg(target_os = "macos")]
use tao::platform::macos::WindowBuilderExtMacOS;

fn main() {
    #[cfg(target_os = "macos")]
    install_menu();

    let app = match app::App::new() {
        Ok(app) => app,
        Err(err) => {
            eprintln!("[riff] could not start: {err}");
            std::process::exit(1);
        }
    };

    let port = match http::start(app.clone()) {
        Ok(port) => port,
        Err(err) => {
            eprintln!("[riff] could not start local server: {err}");
            std::process::exit(1);
        }
    };
    eprintln!("[riff] serving on http://127.0.0.1:{port}");

    let event_loop = EventLoop::new();
    let window = Arc::new(
        build_window(&event_loop)
            .with_visible(false)
            .build(&event_loop)
            .expect("could not create the Riff window"),
    );

    let drag_window = window.clone();
    let drop_app = app.clone();
    let base_url = format!("http://127.0.0.1:{port}");
    let navigation_url = base_url.clone();

    let builder = WebViewBuilder::new()
        .with_url(&base_url)
        .with_background_color((10, 9, 16, 255))
        .with_autoplay(true)
        .with_accept_first_mouse(true)
        .with_devtools(std::env::var("RIFF_DEVTOOLS").is_ok())
        .with_ipc_handler(move |request| match request.body().trim() {
            "drag" => {
                let _ = drag_window.drag_window();
            }
            "zoom" => {
                drag_window.set_maximized(!drag_window.is_maximized());
            }
            _ => {}
        })
        .with_navigation_handler(move |url| {
            if url.starts_with(&navigation_url) {
                true
            } else if url.starts_with("http://") || url.starts_with("https://") {
                let _ = std::process::Command::new("open").arg(url).spawn();
                false
            } else {
                false
            }
        })
        .with_drag_drop_handler(move |event| {
            if let wry::DragDropEvent::Drop { paths, .. } = event {
                let app = drop_app.clone();
                thread::spawn(move || {
                    let summary = app.import_paths(&paths, "import", None);
                    app.set_notice("import", summary.added, summary.skipped);
                });
            }
            true
        });

    let webview = match builder.build(&*window) {
        Ok(webview) => webview,
        Err(err) => {
            eprintln!("[riff] could not create web view: {err}");
            std::process::exit(1);
        }
    };

    window.set_visible(true);
    window.set_focus();

    let keep_window = window.clone();
    let keep_webview = webview;

    event_loop.run(move |event, _, control_flow| {
        let _ = (&keep_window, &keep_webview);
        *control_flow = ControlFlow::Wait;
        if let Event::WindowEvent {
            event: WindowEvent::CloseRequested,
            ..
        } = event
        {
            *control_flow = ControlFlow::Exit;
        }
    });
}

fn build_window(event_loop: &EventLoop<()>) -> WindowBuilder {
    let builder = WindowBuilder::new()
        .with_title("Riff")
        .with_inner_size(LogicalSize::new(1240.0, 820.0))
        .with_min_inner_size(LogicalSize::new(980.0, 640.0))
        .with_resizable(true)
        .with_theme(Some(Theme::Dark));

    #[cfg(target_os = "macos")]
    let builder = builder
        .with_titlebar_transparent(true)
        .with_fullsize_content_view(true)
        .with_title_hidden(true)
        .with_has_shadow(true);

    let _ = event_loop;
    builder
}

#[cfg(target_os = "macos")]
fn install_menu() {
    use muda::{Menu, PredefinedMenuItem, Submenu};

    let menu = Menu::new();
    let app_menu = Submenu::new("Riff", true);
    let _ = app_menu.append_items(&[
        &PredefinedMenuItem::about(None, None),
        &PredefinedMenuItem::separator(),
        &PredefinedMenuItem::services(None),
        &PredefinedMenuItem::separator(),
        &PredefinedMenuItem::hide(None),
        &PredefinedMenuItem::hide_others(None),
        &PredefinedMenuItem::show_all(None),
        &PredefinedMenuItem::separator(),
        &PredefinedMenuItem::quit(None),
    ]);
    let edit_menu = Submenu::new("Edit", true);
    let _ = edit_menu.append_items(&[
        &PredefinedMenuItem::undo(None),
        &PredefinedMenuItem::redo(None),
        &PredefinedMenuItem::separator(),
        &PredefinedMenuItem::cut(None),
        &PredefinedMenuItem::copy(None),
        &PredefinedMenuItem::paste(None),
        &PredefinedMenuItem::select_all(None),
    ]);
    let window_menu = Submenu::new("Window", true);
    let _ = window_menu.append_items(&[
        &PredefinedMenuItem::minimize(None),
        &PredefinedMenuItem::maximize(None),
        &PredefinedMenuItem::separator(),
        &PredefinedMenuItem::close_window(None),
    ]);
    let _ = menu.append_items(&[&app_menu, &edit_menu, &window_menu]);
    menu.init_for_nsapp();
    std::mem::forget(menu);
}
