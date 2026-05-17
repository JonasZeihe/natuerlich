#!/usr/bin/env python3
import math
import pathlib
import shlex
import sys
from typing import Iterable, List, Tuple

from PIL import Image, ImageDraw, ImageFont, ImageOps

SUPPORTED_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"}


def parse_paths(line: str) -> List[pathlib.Path]:
    return [
        pathlib.Path(part).expanduser()
        for part in shlex.split(line, posix=False)
        if part
    ]


def collect_images(paths: Iterable[pathlib.Path]) -> List[pathlib.Path]:
    files: List[pathlib.Path] = []

    for path in paths:
        if path.is_dir():
            for ext in SUPPORTED_EXTS:
                files.extend(path.glob(f"*{ext}"))
                files.extend(path.glob(f"*{ext.upper()}"))
        elif path.is_file() and path.suffix.lower() in SUPPORTED_EXTS:
            files.append(path)

    unique = []
    seen = set()

    for file in sorted(files, key=lambda item: item.name.lower()):
        resolved = file.resolve()

        if resolved in seen:
            continue

        seen.add(resolved)
        unique.append(file)

    return unique


def checkerboard(size: Tuple[int, int], square: int = 16) -> Image.Image:
    width, height = size
    image = Image.new("RGB", size, (238, 238, 238))
    draw = ImageDraw.Draw(image)

    for y_pos in range(0, height, square):
        for x_pos in range(0, width, square):
            if (x_pos // square + y_pos // square) % 2:
                draw.rectangle(
                    [x_pos, y_pos, x_pos + square - 1, y_pos + square - 1],
                    fill=(205, 205, 205),
                )

    return image


def fit_image(image: Image.Image, max_size: int) -> Image.Image:
    image = ImageOps.exif_transpose(image).convert("RGBA")
    width, height = image.size
    longest = max(width, height)

    if longest > max_size:
        scale = max_size / longest
        new_size = (
            max(1, round(width * scale)),
            max(1, round(height * scale)),
        )
        image = image.resize(new_size, Image.Resampling.LANCZOS)

    return image


def paste_centered(
    canvas: Image.Image, image: Image.Image, box: Tuple[int, int, int, int]
) -> None:
    left, top, right, bottom = box
    box_width = right - left
    box_height = bottom - top
    x_pos = left + (box_width - image.width) // 2
    y_pos = top + (box_height - image.height) // 2
    canvas.alpha_composite(image, (x_pos, y_pos))


def make_grid(
    files: List[pathlib.Path],
    output: pathlib.Path,
    columns: int = 3,
    cell_size: int = 420,
    padding: int = 24,
    label_height: int = 34,
) -> pathlib.Path:
    if not files:
        raise ValueError("No supported image files found.")

    rows = math.ceil(len(files) / columns)
    width = columns * cell_size + (columns + 1) * padding
    height = rows * (cell_size + label_height) + (rows + 1) * padding

    base = checkerboard((width, height)).convert("RGBA")
    draw = ImageDraw.Draw(base)
    font = ImageFont.load_default()

    for index, file in enumerate(files):
        row = index // columns
        col = index % columns

        cell_left = padding + col * (cell_size + padding)
        cell_top = padding + row * (cell_size + label_height + padding)
        cell_right = cell_left + cell_size
        cell_bottom = cell_top + cell_size

        with Image.open(file) as image:
            fitted = fit_image(image, cell_size)
            paste_centered(base, fitted, (cell_left, cell_top, cell_right, cell_bottom))

        label = file.name
        label_y = cell_bottom + 8
        draw.rectangle(
            [cell_left, cell_bottom, cell_right, cell_bottom + label_height],
            fill=(20, 20, 20, 220),
        )
        draw.text((cell_left + 8, label_y), label[:60], fill=(255, 255, 255), font=font)

    output.parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(output, quality=92)

    return output


def next_available_path(path: pathlib.Path) -> pathlib.Path:
    if not path.exists():
        return path

    parent = path.parent
    stem = path.stem
    suffix = path.suffix
    index = 1

    while True:
        candidate = parent / f"{stem}({index}){suffix}"

        if not candidate.exists():
            return candidate

        index += 1


def main() -> None:
    print()
    print("===============================")
    print("  Asset Grid Maker")
    print("===============================")
    print()
    print("Drop files or folders, then press Enter.")
    print("Output: asset_grid.jpg")
    print()

    if len(sys.argv) > 1:
        paths = [pathlib.Path(arg) for arg in sys.argv[1:] if arg.strip()]
    else:
        line = input("> ").strip()
        paths = parse_paths(line)

    files = collect_images(paths)

    if not files:
        print("No supported image files found.")
        return

    output = next_available_path(pathlib.Path.cwd() / "asset_grid.jpg")
    result = make_grid(files, output)

    print()
    print(f"Images: {len(files)}")
    print(f"Saved: {result.resolve()}")
    print()


if __name__ == "__main__":
    main()
