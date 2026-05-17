from __future__ import annotations

import shlex
import sys
from collections import deque
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageFilter


@dataclass(frozen=True)
class Settings:
    mode: str
    frames: int = 10
    target_width: int = 256
    target_height: int = 512
    alpha_threshold: int = 16
    bottom_padding: int = 4
    fit: float = 0.94
    black_threshold: int = 10
    anchor: str = "bottom"
    detection_padding: int = 18
    detection_expand: int = 5
    min_component_area: int = 8


@dataclass(frozen=True)
class Box:
    left: int
    top: int
    right: int
    bottom: int

    @property
    def width(self) -> int:
        return self.right - self.left

    @property
    def height(self) -> int:
        return self.bottom - self.top

    @property
    def area(self) -> int:
        return self.width * self.height


def main() -> int:
    settings = choose_settings()
    paths = get_paths_from_prompt()

    if not paths:
        print("No files provided.")
        wait_for_exit()
        return 1

    output_dir = Path.cwd() / "output"
    output_dir.mkdir(parents=True, exist_ok=True)

    success_count = 0

    for path in paths:
        try:
            result = process_sheet(path, output_dir, settings)
            print(f"OK: {path.name} -> {result}")
            success_count += 1
        except Exception as error:
            print(f"FAILED: {path} -> {error}")

    print(f"\nDone. {success_count}/{len(paths)} file(s) processed.")
    print(f"Output folder: {output_dir}")
    wait_for_exit()

    return 0 if success_count == len(paths) else 1


def choose_settings() -> Settings:
    print("Choose mode:")
    print("1 = Flame normalize | original behavior | 10 frames | 256x512")
    print("2 = Spark columns   | equal 10 columns | 256x256")
    print("3 = Spark detect    | detect 10 sprite islands | 256x256")
    print("4 = Custom")
    choice = input("> ").strip()

    if choice == "1":
        return Settings(mode="flame")

    if choice == "2":
        return Settings(
            mode="columns",
            frames=10,
            target_width=256,
            target_height=256,
            bottom_padding=0,
            fit=1,
            anchor="center",
        )

    if choice == "3":
        return Settings(
            mode="detect",
            frames=10,
            target_width=256,
            target_height=256,
            alpha_threshold=16,
            bottom_padding=0,
            fit=0.78,
            black_threshold=10,
            anchor="center",
            detection_padding=18,
            detection_expand=5,
            min_component_area=8,
        )

    if choice == "4":
        return choose_custom_settings()

    print("Unknown mode. Using Spark columns.")
    return Settings(
        mode="columns",
        frames=10,
        target_width=256,
        target_height=256,
        bottom_padding=0,
        fit=1,
        anchor="center",
    )


def choose_custom_settings() -> Settings:
    print("Custom mode:")
    print("1 = equal columns")
    print("2 = detect islands")
    cutter_choice = input("> ").strip()
    mode = "detect" if cutter_choice == "2" else "columns"

    frames = ask_int("Sprites / frames", 10)
    target_width = ask_int("Target frame width", 256)
    target_height = ask_int("Target frame height", 256)

    if mode == "columns":
        return Settings(
            mode="columns",
            frames=frames,
            target_width=target_width,
            target_height=target_height,
            bottom_padding=0,
            fit=1,
            anchor="center",
        )

    fit = ask_float("Fit", 0.78)
    black_threshold = ask_int("Black threshold", 10)
    alpha_threshold = ask_int("Alpha threshold", 16)

    print("Anchor:")
    print("1 = center")
    print("2 = bottom")
    anchor_choice = input("> ").strip()
    anchor = "bottom" if anchor_choice == "2" else "center"

    bottom_padding = 0
    if anchor == "bottom":
        bottom_padding = ask_int("Bottom padding", 4)

    return Settings(
        mode="detect",
        frames=frames,
        target_width=target_width,
        target_height=target_height,
        alpha_threshold=alpha_threshold,
        bottom_padding=bottom_padding,
        fit=fit,
        black_threshold=black_threshold,
        anchor=anchor,
        detection_padding=ask_int("Detection padding", 18),
        detection_expand=ask_int("Detection expand", 5),
        min_component_area=ask_int("Minimum component area", 8),
    )


def ask_int(label: str, default: int) -> int:
    raw = input(f"{label} [{default}]: ").strip()
    return default if not raw else int(raw)


def ask_float(label: str, default: float) -> float:
    raw = input(f"{label} [{default}]: ").strip()
    return default if not raw else float(raw)


def get_paths_from_prompt() -> list[Path]:
    print("Drag and drop one or more image files here, then press Enter:")
    raw = input("> ").strip()

    if not raw:
        return []

    try:
        parts = shlex.split(raw, posix=sys.platform != "win32")
    except ValueError:
        parts = raw.split()

    return [
        Path(part.strip().strip('"').strip("'")).expanduser().resolve()
        for part in parts
    ]


def process_sheet(input_path: Path, output_dir: Path, settings: Settings) -> Path:
    if settings.mode == "columns":
        return resize_columns(input_path, output_dir, settings)

    return normalize_sheet(input_path, output_dir, settings)


def normalize_sheet(input_path: Path, output_dir: Path, settings: Settings) -> Path:
    if not input_path.exists():
        raise FileNotFoundError("File does not exist")

    image = Image.open(input_path)
    rgba = ensure_rgba(image, settings)

    if settings.mode == "detect":
        boxes = detect_sprite_boxes(rgba, settings)
        source_frames = [
            rgba.crop((box.left, box.top, box.right, box.bottom)) for box in boxes
        ]
        source_boxes = [
            Box(left=0, top=0, right=frame.width, bottom=frame.height)
            for frame in source_frames
        ]
    else:
        source_frames = split_frames(rgba, settings.frames)
        source_boxes = [
            find_alpha_box(frame, settings.alpha_threshold) for frame in source_frames
        ]

    valid_boxes = [box for box in source_boxes if box is not None]

    if not valid_boxes:
        raise ValueError("No visible pixels found")

    scale = calculate_global_scale(valid_boxes, settings)

    normalized_frames = [
        normalize_frame(frame, box, scale, settings)
        for frame, box in zip(source_frames, source_boxes, strict=True)
    ]

    output = Image.new(
        "RGBA",
        (settings.target_width * settings.frames, settings.target_height),
        (0, 0, 0, 0),
    )

    for index, frame in enumerate(normalized_frames):
        output.alpha_composite(frame, (index * settings.target_width, 0))

    output_path = output_dir / input_path.name
    save_image(output, output_path)

    return output_path


def resize_columns(input_path: Path, output_dir: Path, settings: Settings) -> Path:
    if not input_path.exists():
        raise FileNotFoundError("File does not exist")

    image = Image.open(input_path).convert("RGBA")
    source_frames = split_frames(image, settings.frames)

    output = Image.new(
        "RGBA",
        (settings.target_width * settings.frames, settings.target_height),
        (0, 0, 0, 0),
    )

    for index, frame in enumerate(source_frames):
        resized = frame.resize(
            (settings.target_width, settings.target_height),
            Image.Resampling.LANCZOS,
        )
        output.alpha_composite(resized, (index * settings.target_width, 0))

    output_path = output_dir / input_path.name
    save_image(output, output_path)

    return output_path


def ensure_rgba(image: Image.Image, settings: Settings) -> Image.Image:
    if image.mode in ("RGBA", "LA"):
        return image.convert("RGBA")

    if "transparency" in image.info:
        return image.convert("RGBA")

    rgb = image.convert("RGB")
    alpha = Image.new("L", rgb.size, 255)
    pixels = rgb.load()
    alpha_pixels = alpha.load()

    for y in range(rgb.height):
        for x in range(rgb.width):
            red, green, blue = pixels[x, y]
            if (
                red <= settings.black_threshold
                and green <= settings.black_threshold
                and blue <= settings.black_threshold
            ):
                alpha_pixels[x, y] = 0

    rgba = rgb.convert("RGBA")
    rgba.putalpha(alpha)

    return rgba


def split_frames(image: Image.Image, frame_count: int) -> list[Image.Image]:
    frames: list[Image.Image] = []

    for index in range(frame_count):
        left = round(image.width * index / frame_count)
        right = round(image.width * (index + 1) / frame_count)
        frames.append(image.crop((left, 0, right, image.height)))

    return frames


def find_alpha_box(image: Image.Image, threshold: int) -> Box | None:
    alpha = image.getchannel("A")
    mask = alpha.point(lambda value: 255 if value > threshold else 0)
    bbox = mask.getbbox()

    if bbox is None:
        return None

    left, top, right, bottom = bbox

    return Box(left=left, top=top, right=right, bottom=bottom)


def detect_sprite_boxes(image: Image.Image, settings: Settings) -> list[Box]:
    mask = create_detection_mask(image, settings)
    components = find_components(mask, settings.min_component_area)

    if not components:
        raise ValueError("No sprite islands detected")

    grouped = group_components_into_sprites(components, settings.frames)
    boxes = [
        pad_box(merge_boxes(group), image.size, settings.detection_padding)
        for group in grouped
    ]

    if len(boxes) != settings.frames:
        raise ValueError(f"Detected {len(boxes)} sprites, expected {settings.frames}")

    return boxes


def create_detection_mask(image: Image.Image, settings: Settings) -> Image.Image:
    alpha = image.getchannel("A")
    mask = alpha.point(lambda value: 255 if value > settings.alpha_threshold else 0)

    if settings.detection_expand > 0:
        for _ in range(settings.detection_expand):
            mask = mask.filter(ImageFilter.MaxFilter(3))

    return mask


def find_components(mask: Image.Image, min_area: int) -> list[Box]:
    width, height = mask.size
    pixels = mask.load()
    visited: set[tuple[int, int]] = set()
    boxes: list[Box] = []

    for y in range(height):
        for x in range(width):
            if (x, y) in visited or pixels[x, y] == 0:
                continue

            box = flood_fill(mask, x, y, visited)

            if box.area >= min_area:
                boxes.append(box)

    return boxes


def flood_fill(
    mask: Image.Image,
    start_x: int,
    start_y: int,
    visited: set[tuple[int, int]],
) -> Box:
    width, height = mask.size
    pixels = mask.load()
    queue: deque[tuple[int, int]] = deque([(start_x, start_y)])
    visited.add((start_x, start_y))

    left = start_x
    right = start_x + 1
    top = start_y
    bottom = start_y + 1

    while queue:
        x, y = queue.popleft()
        left = min(left, x)
        right = max(right, x + 1)
        top = min(top, y)
        bottom = max(bottom, y + 1)

        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if nx < 0 or ny < 0 or nx >= width or ny >= height:
                continue

            if (nx, ny) in visited or pixels[nx, ny] == 0:
                continue

            visited.add((nx, ny))
            queue.append((nx, ny))

    return Box(left=left, top=top, right=right, bottom=bottom)


def group_components_into_sprites(components: list[Box], count: int) -> list[list[Box]]:
    sorted_components = sorted(components, key=lambda box: (box.left + box.right) / 2)

    if len(sorted_components) <= count:
        return [[box] for box in sorted_components]

    gaps: list[tuple[int, int]] = []

    for index in range(len(sorted_components) - 1):
        current = sorted_components[index]
        next_box = sorted_components[index + 1]
        gap = next_box.left - current.right
        gaps.append((gap, index))

    split_indexes = sorted(
        index for _, index in sorted(gaps, reverse=True)[: count - 1]
    )

    groups: list[list[Box]] = []
    start = 0

    for split_index in split_indexes:
        groups.append(sorted_components[start : split_index + 1])
        start = split_index + 1

    groups.append(sorted_components[start:])

    return groups


def merge_boxes(boxes: Iterable[Box]) -> Box:
    box_list = list(boxes)

    return Box(
        left=min(box.left for box in box_list),
        top=min(box.top for box in box_list),
        right=max(box.right for box in box_list),
        bottom=max(box.bottom for box in box_list),
    )


def pad_box(box: Box, image_size: tuple[int, int], padding: int) -> Box:
    width, height = image_size

    return Box(
        left=max(0, box.left - padding),
        top=max(0, box.top - padding),
        right=min(width, box.right + padding),
        bottom=min(height, box.bottom + padding),
    )


def calculate_global_scale(boxes: Iterable[Box], settings: Settings) -> float:
    max_width = max(box.width for box in boxes)
    max_height = max(box.height for box in boxes)

    available_width = settings.target_width * settings.fit
    available_height = (settings.target_height - settings.bottom_padding) * settings.fit

    width_scale = available_width / max_width if max_width > 0 else 1
    height_scale = available_height / max_height if max_height > 0 else 1

    return min(width_scale, height_scale)


def normalize_frame(
    frame: Image.Image,
    box: Box | None,
    scale: float,
    settings: Settings,
) -> Image.Image:
    canvas = Image.new(
        "RGBA",
        (settings.target_width, settings.target_height),
        (0, 0, 0, 0),
    )

    if box is None:
        return canvas

    cropped = frame.crop((box.left, box.top, box.right, box.bottom))
    scaled_width = max(1, round(cropped.width * scale))
    scaled_height = max(1, round(cropped.height * scale))

    resized = cropped.resize((scaled_width, scaled_height), Image.Resampling.LANCZOS)

    x = round((settings.target_width - scaled_width) / 2)

    if settings.anchor == "center":
        y = round((settings.target_height - scaled_height) / 2)
    else:
        y = settings.target_height - settings.bottom_padding - scaled_height

    canvas.alpha_composite(resized, (x, y))

    return canvas


def save_image(image: Image.Image, output_path: Path) -> None:
    suffix = output_path.suffix.lower()

    if suffix == ".webp":
        image.save(output_path, "WEBP", lossless=True, quality=100, method=6)
        return

    if suffix == ".png":
        image.save(output_path, "PNG", optimize=True)
        return

    if suffix in {".jpg", ".jpeg"}:
        background = Image.new("RGB", image.size, (0, 0, 0))
        background.paste(image, mask=image.getchannel("A"))
        background.save(output_path, "JPEG", quality=95, optimize=True)
        return

    image.save(output_path)


def wait_for_exit() -> None:
    print("\nPress Enter to close.")
    try:
        input()
    except EOFError:
        pass


if __name__ == "__main__":
    raise SystemExit(main())
