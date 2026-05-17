#!/usr/bin/env python3
import datetime
import io
import os
import pathlib
import shlex
import sys
from dataclasses import dataclass
from typing import Iterable

try:
    from PIL import Image, ImageOps
except ImportError:
    print("Pillow is required. Install with: pip install pillow")
    sys.exit(1)


SUPPORTED_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"}

DEFAULT_DIRECTION = 1
DEFAULT_EXTENSION_PERCENT = 30.0
DEFAULT_FADE_OVERLAP_PERCENT = 30.0
DEFAULT_FADE_POWER = 1.85
DEFAULT_TARGET_COLOR_NAME = "schwarz"
DEFAULT_OUTPUT_QUALITY = 90
DEFAULT_TARGET_MAX_BYTES = 1_250_000
DEFAULT_MIN_WEBP_QUALITY = 76
DEFAULT_QUALITY_STEP = 4
DEFAULT_DOWNSCALE_FACTOR = 0.94
DEFAULT_MIN_WIDTH = 1400
DEFAULT_MIN_HEIGHT = 1400


@dataclass(frozen=True)
class Settings:
    direction: int
    extension_percent: float
    fade_overlap_percent: float
    fade_power: float
    target_color: tuple[int, int, int]
    output_quality: int
    target_max_bytes: int
    allow_compression: bool


def supports_color() -> bool:
    return os.name != "nt" and sys.stdout.isatty()


BOLD = "\033[1m" if supports_color() else ""
GREEN = "\033[32m" if supports_color() else ""
RED = "\033[31m" if supports_color() else ""
CYAN = "\033[36m" if supports_color() else ""
RESET = "\033[0m" if supports_color() else ""


COLOR_PRESETS: dict[str, tuple[int, int, int]] = {
    "schwarz": (0, 0, 0),
    "black": (0, 0, 0),
    "weiss": (255, 255, 255),
    "weiß": (255, 255, 255),
    "white": (255, 255, 255),
    "rot": (255, 0, 0),
    "red": (255, 0, 0),
    "gruen": (0, 255, 0),
    "grün": (0, 255, 0),
    "green": (0, 255, 0),
    "blau": (0, 0, 255),
    "blue": (0, 0, 255),
    "warm": (12, 8, 4),
    "nacht": (2, 4, 12),
}


def hr() -> str:
    return "-" * 70


def ask_float(label: str, default: float) -> float:
    while True:
        value = input(f"{label} [{default:g}]: ").strip()

        if not value:
            return default

        try:
            return float(value.replace(",", "."))
        except ValueError:
            print("Bitte Zahl eingeben.")


def ask_int(label: str, default: int) -> int:
    while True:
        value = input(f"{label} [{default}]: ").strip()

        if not value:
            return default

        try:
            return int(value)
        except ValueError:
            print("Bitte ganze Zahl eingeben.")


def ask_yes_no(label: str, default: bool) -> bool:
    suffix = " [Y/n]: " if default else " [y/N]: "

    while True:
        value = input(label + suffix).strip().lower()

        if not value:
            return default

        if value in {"y", "yes", "j", "ja"}:
            return True

        if value in {"n", "no", "nein"}:
            return False

        print("Bitte y oder n eingeben.")


def ask_direction() -> int:
    print("Fade-Richtung:")
    print("1 = unten")
    print("2 = oben")
    print("3 = links")
    print("4 = rechts")

    while True:
        value = input(f"Richtung [{DEFAULT_DIRECTION}]: ").strip()

        if not value:
            return DEFAULT_DIRECTION

        try:
            direction = int(value)
        except ValueError:
            print("Bitte 1, 2, 3 oder 4 eingeben.")
            continue

        if direction in {1, 2, 3, 4}:
            return direction

        print("Bitte 1, 2, 3 oder 4 eingeben.")


def parse_hex_color(value: str) -> tuple[int, int, int] | None:
    cleaned = value.strip().lstrip("#")

    if len(cleaned) != 6:
        return None

    try:
        red = int(cleaned[0:2], 16)
        green = int(cleaned[2:4], 16)
        blue = int(cleaned[4:6], 16)
    except ValueError:
        return None

    return red, green, blue


def parse_rgb_color(value: str) -> tuple[int, int, int] | None:
    parts = [part.strip() for part in value.split(",")]

    if len(parts) != 3:
        return None

    try:
        red, green, blue = (int(part) for part in parts)
    except ValueError:
        return None

    if any(channel < 0 or channel > 255 for channel in (red, green, blue)):
        return None

    return red, green, blue


def parse_color(value: str) -> tuple[int, int, int] | None:
    cleaned = value.strip().lower()

    if cleaned in COLOR_PRESETS:
        return COLOR_PRESETS[cleaned]

    hex_color = parse_hex_color(cleaned)
    if hex_color is not None:
        return hex_color

    return parse_rgb_color(cleaned)


def ask_color() -> tuple[int, int, int]:
    while True:
        value = input(f"Zielfarbe Name/Hex/RGB [{DEFAULT_TARGET_COLOR_NAME}]: ").strip()

        if not value:
            value = DEFAULT_TARGET_COLOR_NAME

        color = parse_color(value)

        if color is not None:
            return color

        print("Beispiele: schwarz, white, #000000, 0,0,0, nacht, warm")


def parse_dropped_paths(line: str) -> list[pathlib.Path]:
    return [
        pathlib.Path(part).expanduser()
        for part in shlex.split(line, posix=False)
        if part
    ]


def collect_supported(paths: Iterable[pathlib.Path]) -> list[pathlib.Path]:
    files: list[pathlib.Path] = []

    for path in paths:
        if path.is_dir():
            for ext in SUPPORTED_EXTS:
                files.extend(sorted(path.glob(f"*{ext}")))
                files.extend(sorted(path.glob(f"*{ext.upper()}")))
        elif path.is_file():
            files.append(path)

    seen: set[pathlib.Path] = set()
    unique_files: list[pathlib.Path] = []

    for file_path in files:
        if file_path.suffix.lower() not in SUPPORTED_EXTS:
            continue

        resolved = file_path.resolve()

        if resolved in seen:
            continue

        seen.add(resolved)
        unique_files.append(file_path)

    return unique_files


def normalize_mode(image: Image.Image) -> Image.Image:
    if image.mode in {"RGBA", "LA"}:
        return image.convert("RGBA")

    if image.mode == "P" and "transparency" in image.info:
        return image.convert("RGBA")

    if image.mode == "CMYK":
        return image.convert("RGB").convert("RGBA")

    return image.convert("RGBA")


def side_pixels(length: int, percent: float) -> int:
    return max(1, min(length, round(length * percent / 100.0)))


def smoothstep(value: float) -> float:
    clamped = max(0.0, min(1.0, value))
    return clamped * clamped * (3.0 - 2.0 * clamped)


def clamp_byte(value: float) -> int:
    return max(0, min(255, round(value)))


def blend_to_color(
    pixel: tuple[int, int, int, int],
    target_color: tuple[int, int, int],
    fade: float,
) -> tuple[int, int, int, int]:
    red, green, blue, alpha = pixel
    target_red, target_green, target_blue = target_color
    keep = 1.0 - fade

    return (
        clamp_byte((red * keep) + (target_red * fade)),
        clamp_byte((green * keep) + (target_green * fade)),
        clamp_byte((blue * keep) + (target_blue * fade)),
        alpha,
    )


def apply_bottom_fade(
    output: Image.Image,
    original_y: int,
    original_height: int,
    settings: Settings,
) -> None:
    fade_pixels = side_pixels(original_height, settings.fade_overlap_percent)
    start_y = original_y + original_height - fade_pixels
    pixels = output.load()
    width = output.size[0]

    for row in range(fade_pixels):
        t = row / max(1, fade_pixels - 1)
        fade = smoothstep(t) ** settings.fade_power
        y_pos = start_y + row

        for x_pos in range(width):
            pixels[x_pos, y_pos] = blend_to_color(
                pixels[x_pos, y_pos],
                settings.target_color,
                fade,
            )


def apply_top_fade(
    output: Image.Image,
    original_y: int,
    original_width: int,
    settings: Settings,
) -> None:
    fade_pixels = side_pixels(
        output.size[1] - original_y, settings.fade_overlap_percent
    )
    pixels = output.load()

    for row in range(fade_pixels):
        t = 1.0 - (row / max(1, fade_pixels - 1))
        fade = smoothstep(t) ** settings.fade_power
        y_pos = original_y + row

        for x_pos in range(original_width):
            pixels[x_pos, y_pos] = blend_to_color(
                pixels[x_pos, y_pos],
                settings.target_color,
                fade,
            )


def apply_left_fade(
    output: Image.Image,
    original_x: int,
    original_height: int,
    settings: Settings,
) -> None:
    fade_pixels = side_pixels(
        output.size[0] - original_x, settings.fade_overlap_percent
    )
    pixels = output.load()

    for col in range(fade_pixels):
        t = 1.0 - (col / max(1, fade_pixels - 1))
        fade = smoothstep(t) ** settings.fade_power
        x_pos = original_x + col

        for y_pos in range(original_height):
            pixels[x_pos, y_pos] = blend_to_color(
                pixels[x_pos, y_pos],
                settings.target_color,
                fade,
            )


def apply_right_fade(
    output: Image.Image,
    original_x: int,
    original_width: int,
    original_height: int,
    settings: Settings,
) -> None:
    fade_pixels = side_pixels(original_width, settings.fade_overlap_percent)
    start_x = original_x + original_width - fade_pixels
    pixels = output.load()

    for col in range(fade_pixels):
        t = col / max(1, fade_pixels - 1)
        fade = smoothstep(t) ** settings.fade_power
        x_pos = start_x + col

        for y_pos in range(original_height):
            pixels[x_pos, y_pos] = blend_to_color(
                pixels[x_pos, y_pos],
                settings.target_color,
                fade,
            )


def build_fade_image(image: Image.Image, settings: Settings) -> Image.Image:
    image = normalize_mode(image)
    width, height = image.size

    if settings.direction in {1, 2}:
        extension_pixels = side_pixels(height, settings.extension_percent)
        output_size = (width, height + extension_pixels)
        paste_pos = (0, 0 if settings.direction == 1 else extension_pixels)
    else:
        extension_pixels = side_pixels(width, settings.extension_percent)
        output_size = (width + extension_pixels, height)
        paste_pos = (0 if settings.direction == 4 else extension_pixels, 0)

    output = Image.new("RGBA", output_size, settings.target_color + (255,))
    output.paste(image, paste_pos, image)

    if settings.direction == 1:
        apply_bottom_fade(output, paste_pos[1], height, settings)
    elif settings.direction == 2:
        apply_top_fade(output, paste_pos[1], width, settings)
    elif settings.direction == 3:
        apply_left_fade(output, paste_pos[0], height, settings)
    elif settings.direction == 4:
        apply_right_fade(output, paste_pos[0], width, height, settings)

    return output.convert("RGB")


def next_available_path(base: pathlib.Path) -> pathlib.Path:
    if not base.exists():
        return base

    stem = base.stem
    suffix = base.suffix
    parent = base.parent
    index = 1

    while True:
        candidate = parent / f"{stem}({index}){suffix}"

        if not candidate.exists():
            return candidate

        index += 1


def encode_webp_bytes(image: Image.Image, quality: int) -> bytes:
    buffer = io.BytesIO()
    image.save(buffer, format="WEBP", quality=quality, method=6, lossless=False)
    return buffer.getvalue()


def fit_webp(image: Image.Image, settings: Settings) -> bytes:
    best_bytes = b""
    current = image

    while True:
        for quality in range(
            settings.output_quality,
            DEFAULT_MIN_WEBP_QUALITY - 1,
            -DEFAULT_QUALITY_STEP,
        ):
            data = encode_webp_bytes(current, quality)

            if not best_bytes or len(data) < len(best_bytes):
                best_bytes = data

            if not settings.allow_compression:
                return data

            if settings.target_max_bytes <= 0 or len(data) <= settings.target_max_bytes:
                return data

        new_width = round(current.width * DEFAULT_DOWNSCALE_FACTOR)
        new_height = round(current.height * DEFAULT_DOWNSCALE_FACTOR)

        if new_width < DEFAULT_MIN_WIDTH or new_height < DEFAULT_MIN_HEIGHT:
            return best_bytes

        current = current.resize((new_width, new_height), Image.Resampling.LANCZOS)


def output_suffix() -> str:
    return "_fade.webp"


def process_image(
    src: pathlib.Path,
    out_dir: pathlib.Path,
    settings: Settings,
) -> tuple[pathlib.Path, int, int]:
    with Image.open(src) as image:
        image = ImageOps.exif_transpose(image)
        output = build_fade_image(image, settings)
        out_path = next_available_path(out_dir / f"{src.stem}{output_suffix()}")
        out_path.write_bytes(fit_webp(output, settings))

    in_size = src.stat().st_size if src.exists() else 0
    out_size = out_path.stat().st_size if out_path.exists() else 0

    return out_path, in_size, out_size


def fmt_kb(size: int) -> str:
    return f"{size / 1024:.1f}KB"


def summarize(results: list[tuple[pathlib.Path, int, int]]) -> str:
    if not results:
        return "No files processed.\n"

    total_in = sum(in_size for _, in_size, _ in results)
    total_out = sum(out_size for _, _, out_size in results)
    lines = ["\nSummary\n", f"{hr()}\n"]

    for out_path, in_size, out_size in results:
        lines.append(f"{out_path.name}: {fmt_kb(in_size)} -> {fmt_kb(out_size)}\n")

    lines.append(f"{hr()}\n")
    lines.append(f"Total: {fmt_kb(total_in)} -> {fmt_kb(total_out)}\n")

    return "".join(lines)


def ask_settings() -> Settings:
    print()
    print("Settings")
    print(hr())
    print("Enter = Default übernehmen")
    print()

    direction = ask_direction()
    extension_percent = ask_float(
        "Farbbereich außen in % der Bildseite",
        DEFAULT_EXTENSION_PERCENT,
    )
    fade_overlap_percent = ask_float(
        "Fade greift ins Bild in % der Bildseite",
        DEFAULT_FADE_OVERLAP_PERCENT,
    )
    fade_power = ask_float("Fade-Kurve / Power", DEFAULT_FADE_POWER)
    target_color = ask_color()
    output_quality = ask_int("WebP Qualität", DEFAULT_OUTPUT_QUALITY)
    allow_compression = ask_yes_no("Auto-Kompression / kleiner skalieren?", False)

    target_max_bytes = DEFAULT_TARGET_MAX_BYTES

    if allow_compression:
        target_max_kb = ask_int(
            "Max Dateigröße in KB, 0 = egal",
            round(DEFAULT_TARGET_MAX_BYTES / 1024),
        )
        target_max_bytes = target_max_kb * 1024

    return Settings(
        direction=direction,
        extension_percent=extension_percent,
        fade_overlap_percent=fade_overlap_percent,
        fade_power=fade_power,
        target_color=target_color,
        output_quality=output_quality,
        target_max_bytes=target_max_bytes,
        allow_compression=allow_compression,
    )


def process_once(
    inputs: list[pathlib.Path],
    out_dir: pathlib.Path,
    settings: Settings,
    log_lines: list[str],
) -> None:
    if not inputs:
        print("No supported image files found.\n")
        return

    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"{BOLD}Processing {len(inputs)} file(s)...{RESET}")

    results: list[tuple[pathlib.Path, int, int]] = []

    for src in inputs:
        try:
            out_path, in_size, out_size = process_image(src, out_dir, settings)
            line = (
                f"{GREEN}OK{RESET} {src.name} -> {out_path.name}  "
                f"({fmt_kb(in_size)} -> {fmt_kb(out_size)})"
            )
            print(line)
            log_lines.append(f"{line}\n")
            results.append((out_path, in_size, out_size))
        except OSError as error:
            line = f"{RED}ERROR{RESET} {src} - {error}"
            print(line)
            log_lines.append(f"{line}\n")

    summary = summarize(results)
    print(summary, end="")
    log_lines.append(summary)
    print(f"Output directory: {CYAN}{out_dir.resolve()}{RESET}\n")


def banner() -> None:
    print()
    print("================================")
    print("  Image Extender - Fade tool")
    print("================================")
    print()


def main() -> None:
    cwd = pathlib.Path.cwd()
    out_dir = cwd / "output"
    log_lines: list[str] = []

    banner()
    settings = ask_settings()

    initial_args = [pathlib.Path(arg) for arg in sys.argv[1:] if arg.strip()]

    if initial_args:
        files = collect_supported(initial_args)
        process_once(files, out_dir, settings, log_lines)
    else:
        while True:
            line = input(
                f"{BOLD}> Drop files or folders here, then press Enter "
                f"(or just Enter to quit):{RESET}\n"
            ).strip()

            if not line:
                print("Bye.")
                break

            files = collect_supported(parse_dropped_paths(line))

            if not files:
                print("No supported images detected. Try again.\n")
                continue

            process_once(files, out_dir, settings, log_lines)

            if not ask_yes_no("Process more files?", False):
                break

    if ask_yes_no("Save a session log file in the current directory?", False):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H-%M-%S")
        log_path = cwd / f"image_fade_{timestamp}.log"
        log_path.write_text("".join(log_lines), encoding="utf-8")
        print(f"Saved log: {CYAN}{log_path}{RESET}")


if __name__ == "__main__":
    main()
