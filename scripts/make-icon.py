#!/usr/bin/env python3
"""Generate the Riff app icon (PNG + .icns) using Pillow."""

from pathlib import Path

from PIL import Image, ImageDraw

SIZE = 1024
ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"

STOPS = [
    (0.0, (255, 154, 90)),
    (0.46, (255, 95, 126)),
    (1.0, (168, 85, 247)),
]


def blend(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient_pixel(t):
    for index in range(len(STOPS) - 1):
        start, start_color = STOPS[index]
        end, end_color = STOPS[index + 1]
        if start <= t <= end:
            local = (t - start) / (end - start) if end > start else 0
            return blend(start_color, end_color, local)
    return STOPS[-1][1]


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    image = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    pixels = image.load()
    for y in range(SIZE):
        for x in range(SIZE):
            t = (x * 0.55 + y * 0.45) / SIZE
            red, green, blue = gradient_pixel(t)
            pixels[x, y] = (red, green, blue, 255)

    mask = Image.new("L", (SIZE, SIZE), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, SIZE - 1, SIZE - 1), radius=228, fill=255)
    image.putalpha(mask)

    draw = ImageDraw.Draw(image, "RGBA")
    cx = cy = SIZE // 2

    # Dark vinyl disc.
    disc_r = 286
    draw.ellipse((cx - disc_r, cy - disc_r, cx + disc_r, cy + disc_r), fill=(13, 11, 20, 238))
    draw.ellipse(
        (cx - disc_r, cy - disc_r, cx + disc_r, cy + disc_r),
        outline=(255, 255, 255, 34),
        width=5,
    )
    draw.ellipse(
        (cx - disc_r + 26, cy - disc_r + 26, cx + disc_r - 26, cy + disc_r - 26),
        outline=(255, 255, 255, 18),
        width=2,
    )

    # Equalizer bars.
    bars = [(-112, 300, 76), (0, 424, 76), (112, 356, 76)]
    for offset, height, width in bars:
        left = cx + offset - width // 2
        top = cy - height // 2
        draw.rounded_rectangle(
            (left, top, left + width, top + height),
            radius=width // 2,
            fill=(255, 255, 255, 244),
        )

    # Accent dot, like the wordmark's full stop.
    draw.ellipse((cx + 238, cy + 238, cx + 300, cy + 300), fill=(255, 255, 255, 238))

    icon = ASSETS / "icon.png"
    image.save(icon, "PNG")
    print(f"wrote {icon}")

    iconset = ASSETS / "Riff.iconset"
    iconset.mkdir(exist_ok=True)
    sizes = [
        (16, "icon_16x16.png"),
        (32, "icon_16x16@2x.png"),
        (32, "icon_32x32.png"),
        (64, "icon_32x32@2x.png"),
        (128, "icon_128x128.png"),
        (256, "icon_128x128@2x.png"),
        (256, "icon_256x256.png"),
        (512, "icon_256x256@2x.png"),
        (512, "icon_512x512.png"),
        (1024, "icon_512x512@2x.png"),
    ]
    for size, name in sizes:
        resized = image.resize((size, size), Image.LANCZOS)
        resized.save(iconset / name)
    print(f"wrote {iconset}")


if __name__ == "__main__":
    main()
