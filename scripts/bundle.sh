#!/usr/bin/env bash
# Build Riff and assemble a signed macOS .app bundle.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP="${1:-$HOME/Applications/Riff.app}"

cd "$ROOT"

if [[ ! -f assets/Riff.icns ]]; then
  python3 scripts/make-icon.py
  iconutil -c icns assets/Riff.iconset -o assets/Riff.icns
fi

cargo build --release

rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources"
install -m 755 target/release/riff "$APP/Contents/MacOS/riff"
install -m 644 packaging/Info.plist "$APP/Contents/Info.plist"
install -m 644 assets/Riff.icns "$APP/Contents/Resources/Riff.icns"
printf 'APPL????' > "$APP/Contents/PkgInfo"

xattr -cr "$APP" || true
codesign --force --sign - "$APP"

echo "Built $APP"
echo "Open it with: open \"$APP\""
