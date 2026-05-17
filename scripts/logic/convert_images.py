#!/usr/bin/env python3
import datetime
import os
import pathlib
import shlex
import sys
from collections import deque
from dataclasses import dataclass
from typing import Iterable, List, Optional, Tuple

try:
    from PIL import Image, ImageFilter, ImageOps
except Exception:
    print("Pillow is required. Install with:  pip install pillow")
    sys.exit(1)

SUPPORTED_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"}


@dataclass(frozen=True)
class ImageProfile:
    key: str
    label: str
    description: str
    quality: int
    method: int
    lossless: bool
    strip_metadata: bool
    max_size: Optional[int]
    clean_alpha_rgb: bool
    alpha_floor: int
    cutout_black_edge: bool
    cutout_threshold: int
    cutout_grow: int
    cutout_feather: float
    crop_to_alpha: bool
    crop_alpha_threshold: int
    crop_padding: int
    black_matte_alpha: bool
    matte_floor: int
    matte_gamma: float
    matte_boost: float
    texture_matte_alpha: bool
    texture_floor: int
    texture_whitepoint: int
    texture_gamma: float
    texture_boost: float
    texture_unmatte_cap: float
    texture_adaptive_whitepoint: bool
    texture_whitepoint_percentile: float
    texture_whitepoint_min: int
    texture_whitepoint_max: int


PROFILES = {
    "1": ImageProfile(
        key="default",
        label="Default",
        description="photos / normal web images",
        quality=int(os.environ.get("WEBP_QUALITY", "82")),
        method=int(os.environ.get("WEBP_METHOD", "6")),
        lossless=os.environ.get("WEBP_LOSSLESS", "").lower() in {"1", "true", "yes"},
        strip_metadata=False,
        max_size=None,
        clean_alpha_rgb=False,
        alpha_floor=0,
        cutout_black_edge=False,
        cutout_threshold=0,
        cutout_grow=0,
        cutout_feather=0.0,
        crop_to_alpha=False,
        crop_alpha_threshold=0,
        crop_padding=0,
        black_matte_alpha=False,
        matte_floor=0,
        matte_gamma=1.0,
        matte_boost=1.0,
        texture_matte_alpha=False,
        texture_floor=0,
        texture_whitepoint=255,
        texture_gamma=1.0,
        texture_boost=1.0,
        texture_unmatte_cap=1.0,
        texture_adaptive_whitepoint=False,
        texture_whitepoint_percentile=92.0,
        texture_whitepoint_min=110,
        texture_whitepoint_max=190,
    ),
    "2": ImageProfile(
        key="texture-balanced",
        label="Texture balanced",
        description="UI textures / backgrounds, max 1600px",
        quality=78,
        method=6,
        lossless=False,
        strip_metadata=True,
        max_size=1600,
        clean_alpha_rgb=False,
        alpha_floor=0,
        cutout_black_edge=False,
        cutout_threshold=0,
        cutout_grow=0,
        cutout_feather=0.0,
        crop_to_alpha=False,
        crop_alpha_threshold=0,
        crop_padding=0,
        black_matte_alpha=False,
        matte_floor=0,
        matte_gamma=1.0,
        matte_boost=1.0,
        texture_matte_alpha=False,
        texture_floor=0,
        texture_whitepoint=255,
        texture_gamma=1.0,
        texture_boost=1.0,
        texture_unmatte_cap=1.0,
        texture_adaptive_whitepoint=False,
        texture_whitepoint_percentile=92.0,
        texture_whitepoint_min=110,
        texture_whitepoint_max=190,
    ),
    "3": ImageProfile(
        key="texture-compact",
        label="Texture compact",
        description="smaller texture files, max 1280px",
        quality=72,
        method=6,
        lossless=False,
        strip_metadata=True,
        max_size=1280,
        clean_alpha_rgb=False,
        alpha_floor=0,
        cutout_black_edge=False,
        cutout_threshold=0,
        cutout_grow=0,
        cutout_feather=0.0,
        crop_to_alpha=False,
        crop_alpha_threshold=0,
        crop_padding=0,
        black_matte_alpha=False,
        matte_floor=0,
        matte_gamma=1.0,
        matte_boost=1.0,
        texture_matte_alpha=False,
        texture_floor=0,
        texture_whitepoint=255,
        texture_gamma=1.0,
        texture_boost=1.0,
        texture_unmatte_cap=1.0,
        texture_adaptive_whitepoint=False,
        texture_whitepoint_percentile=92.0,
        texture_whitepoint_min=110,
        texture_whitepoint_max=190,
    ),
    "4": ImageProfile(
        key="alpha-flames",
        label="Alpha / flames",
        description="transparent fire / glow assets, max 1280px",
        quality=76,
        method=6,
        lossless=False,
        strip_metadata=True,
        max_size=1280,
        clean_alpha_rgb=True,
        alpha_floor=2,
        cutout_black_edge=False,
        cutout_threshold=0,
        cutout_grow=0,
        cutout_feather=0.0,
        crop_to_alpha=False,
        crop_alpha_threshold=0,
        crop_padding=0,
        black_matte_alpha=False,
        matte_floor=0,
        matte_gamma=1.0,
        matte_boost=1.0,
        texture_matte_alpha=False,
        texture_floor=0,
        texture_whitepoint=255,
        texture_gamma=1.0,
        texture_boost=1.0,
        texture_unmatte_cap=1.0,
        texture_adaptive_whitepoint=False,
        texture_whitepoint_percentile=92.0,
        texture_whitepoint_min=110,
        texture_whitepoint_max=190,
    ),
    "5": ImageProfile(
        key="cutout-black-edge",
        label="Cutout black BG",
        description="flood-fill black background from edges, crop to alpha",
        quality=int(os.environ.get("CUTOUT_WEBP_QUALITY", "90")),
        method=6,
        lossless=os.environ.get("CUTOUT_WEBP_LOSSLESS", "1").lower()
        in {"1", "true", "yes"},
        strip_metadata=True,
        max_size=None,
        clean_alpha_rgb=True,
        alpha_floor=int(os.environ.get("CUTOUT_ALPHA_FLOOR", "2")),
        cutout_black_edge=True,
        cutout_threshold=int(os.environ.get("CUTOUT_THRESHOLD", "28")),
        cutout_grow=int(os.environ.get("CUTOUT_GROW", "1")),
        cutout_feather=float(os.environ.get("CUTOUT_FEATHER", "1.0")),
        crop_to_alpha=True,
        crop_alpha_threshold=int(os.environ.get("CUTOUT_CROP_ALPHA_THRESHOLD", "3")),
        crop_padding=int(os.environ.get("CUTOUT_CROP_PADDING", "4")),
        black_matte_alpha=False,
        matte_floor=0,
        matte_gamma=1.0,
        matte_boost=1.0,
        texture_matte_alpha=False,
        texture_floor=0,
        texture_whitepoint=255,
        texture_gamma=1.0,
        texture_boost=1.0,
        texture_unmatte_cap=1.0,
        texture_adaptive_whitepoint=False,
        texture_whitepoint_percentile=92.0,
        texture_whitepoint_min=110,
        texture_whitepoint_max=190,
    ),
    "6": ImageProfile(
        key="black-matte-fx",
        label="Black matte FX",
        description="convert black-backed fire / glow / magic FX to alpha",
        quality=int(os.environ.get("MATTE_WEBP_QUALITY", "90")),
        method=6,
        lossless=os.environ.get("MATTE_WEBP_LOSSLESS", "1").lower()
        in {"1", "true", "yes"},
        strip_metadata=True,
        max_size=1280,
        clean_alpha_rgb=True,
        alpha_floor=int(os.environ.get("MATTE_ALPHA_FLOOR", "2")),
        cutout_black_edge=False,
        cutout_threshold=0,
        cutout_grow=0,
        cutout_feather=0.0,
        crop_to_alpha=True,
        crop_alpha_threshold=int(os.environ.get("MATTE_CROP_ALPHA_THRESHOLD", "3")),
        crop_padding=int(os.environ.get("MATTE_CROP_PADDING", "4")),
        black_matte_alpha=True,
        matte_floor=int(os.environ.get("MATTE_FLOOR", "8")),
        matte_gamma=float(os.environ.get("MATTE_GAMMA", "0.85")),
        matte_boost=float(os.environ.get("MATTE_BOOST", "1.15")),
        texture_matte_alpha=False,
        texture_floor=0,
        texture_whitepoint=255,
        texture_gamma=1.0,
        texture_boost=1.0,
        texture_unmatte_cap=1.0,
        texture_adaptive_whitepoint=False,
        texture_whitepoint_percentile=92.0,
        texture_whitepoint_min=110,
        texture_whitepoint_max=190,
    ),
    "7": ImageProfile(
        key="black-texture-matte",
        label="Black texture",
        description="convert black-backed dust / sand / brush texture to alpha",
        quality=int(os.environ.get("TEXTURE_WEBP_QUALITY", "90")),
        method=6,
        lossless=os.environ.get("TEXTURE_WEBP_LOSSLESS", "1").lower()
        in {"1", "true", "yes"},
        strip_metadata=True,
        max_size=1280,
        clean_alpha_rgb=True,
        alpha_floor=int(os.environ.get("TEXTURE_ALPHA_FLOOR", "2")),
        cutout_black_edge=False,
        cutout_threshold=0,
        cutout_grow=0,
        cutout_feather=0.0,
        crop_to_alpha=True,
        crop_alpha_threshold=int(os.environ.get("TEXTURE_CROP_ALPHA_THRESHOLD", "3")),
        crop_padding=int(os.environ.get("TEXTURE_CROP_PADDING", "4")),
        black_matte_alpha=False,
        matte_floor=0,
        matte_gamma=1.0,
        matte_boost=1.0,
        texture_matte_alpha=True,
        texture_floor=int(os.environ.get("TEXTURE_FLOOR", "4")),
        texture_whitepoint=int(os.environ.get("TEXTURE_WHITEPOINT", "145")),
        texture_gamma=float(os.environ.get("TEXTURE_GAMMA", "0.78")),
        texture_boost=float(os.environ.get("TEXTURE_BOOST", "1.22")),
        texture_unmatte_cap=float(os.environ.get("TEXTURE_UNMATTE_CAP", "2.45")),
        texture_adaptive_whitepoint=os.environ.get(
            "TEXTURE_ADAPTIVE_WHITEPOINT",
            "1",
        ).lower()
        in {"1", "true", "yes"},
        texture_whitepoint_percentile=float(
            os.environ.get("TEXTURE_WHITEPOINT_PERCENTILE", "92.0")
        ),
        texture_whitepoint_min=int(os.environ.get("TEXTURE_WHITEPOINT_MIN", "115")),
        texture_whitepoint_max=int(os.environ.get("TEXTURE_WHITEPOINT_MAX", "170")),
    ),
}


def supports_color() -> bool:
    if os.name == "nt":
        return False
    return sys.stdout.isatty()


B = "\033[1m" if supports_color() else ""
OK = "\033[32m" if supports_color() else ""
ERR = "\033[31m" if supports_color() else ""
CY = "\033[36m" if supports_color() else ""
RST = "\033[0m" if supports_color() else ""


def hr() -> str:
    return "-" * 62


def clamp_int(value: float, low: int = 0, high: int = 255) -> int:
    return max(low, min(high, int(round(value))))


def clamp_float(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def select_profile() -> ImageProfile:
    print()
    print("================================")
    print("  Image Optimizer - WebP tool")
    print("================================")
    print()
    print("Select image profile:")
    print(hr())

    for key, profile in PROFILES.items():
        print(f"[{key}] {profile.label:<17} - {profile.description}")

    print(hr())

    valid = ", ".join(PROFILES.keys())

    while True:
        choice = input("Choice [1]: ").strip() or "1"
        profile = PROFILES.get(choice)

        if profile:
            return profile

        print(f"Invalid choice. Select {valid}.")


def banner(out_dir: pathlib.Path, profile: ImageProfile) -> None:
    print()
    print(f"{B}Image Optimizer - WebP converter{RST}")
    print(hr())
    print(f"Profile: {profile.key}")
    print(f"Quality: {profile.quality}")
    print(f"Lossless: {'yes' if profile.lossless else 'no'}")
    print(f"Metadata: {'strip' if profile.strip_metadata else 'keep'}")

    if profile.max_size:
        print(f"Max size: {profile.max_size}px")

    if profile.clean_alpha_rgb:
        print("Alpha cleanup: enabled")

    if profile.cutout_black_edge:
        print("Cutout: black edge flood-fill enabled")
        print(f"Cutout threshold: {profile.cutout_threshold}")
        print(f"Cutout grow: {profile.cutout_grow}px")
        print(f"Cutout feather: {profile.cutout_feather}px")

    if profile.black_matte_alpha:
        print("Black matte FX: enabled")
        print(f"Matte floor: {profile.matte_floor}")
        print(f"Matte gamma: {profile.matte_gamma}")
        print(f"Matte boost: {profile.matte_boost}")

    if profile.texture_matte_alpha:
        print("Black texture matte: enabled")
        print(f"Texture floor: {profile.texture_floor}")
        print(f"Texture whitepoint fallback: {profile.texture_whitepoint}")
        print(f"Texture gamma: {profile.texture_gamma}")
        print(f"Texture boost: {profile.texture_boost}")
        print(f"Texture unmatte cap: {profile.texture_unmatte_cap}")
        print(
            "Texture adaptive whitepoint: "
            f"{'yes' if profile.texture_adaptive_whitepoint else 'no'}"
        )

    if profile.crop_to_alpha:
        print("Crop: alpha bounding box enabled")
        print(f"Crop alpha threshold: {profile.crop_alpha_threshold}")
        print(f"Crop padding: {profile.crop_padding}px")

    print(hr())
    print("Drag & drop files or folders into this window, then press Enter.")
    print(f"Outputs will be written to: {CY}{out_dir}{RST}")
    print(hr())

    exts = ", ".join(sorted(ext.lstrip(".") for ext in SUPPORTED_EXTS))
    print(f"Supported formats: {exts}")
    print()


def parse_dropped_paths(line: str) -> List[pathlib.Path]:
    return [
        pathlib.Path(part).expanduser()
        for part in shlex.split(line, posix=False)
        if part
    ]


def collect_supported(paths: Iterable[pathlib.Path]) -> List[pathlib.Path]:
    files: List[pathlib.Path] = []

    for path in paths:
        if path.is_dir():
            for ext in SUPPORTED_EXTS:
                files.extend(sorted(path.glob(f"*{ext}")))
                files.extend(sorted(path.glob(f"*{ext.upper()}")))
        elif path.is_file():
            files.append(path)

    seen = set()
    unique_files: List[pathlib.Path] = []

    for file in files:
        if file.suffix.lower() not in SUPPORTED_EXTS:
            continue

        resolved = file.resolve()

        if resolved in seen:
            continue

        seen.add(resolved)
        unique_files.append(file)

    return unique_files


def normalize_mode(image: Image.Image) -> Image.Image:
    if image.mode in ("RGBA", "LA") or (
        image.mode == "P" and "transparency" in image.info
    ):
        return image.convert("RGBA")

    if image.mode == "CMYK":
        return image.convert("RGB")

    return image


def ensure_rgba(image: Image.Image) -> Image.Image:
    if image.mode != "RGBA":
        return image.convert("RGBA")

    return image


def resize_to_max_size(image: Image.Image, max_size: Optional[int]) -> Image.Image:
    if not max_size:
        return image

    width, height = image.size
    longest = max(width, height)

    if longest <= max_size:
        return image

    scale = max_size / longest
    size = (max(1, round(width * scale)), max(1, round(height * scale)))

    return image.resize(size, Image.Resampling.LANCZOS)


def percentile(values: List[int], percent: float) -> int:
    if not values:
        return 0

    values = sorted(values)
    percent = max(0.0, min(100.0, percent))

    if len(values) == 1:
        return values[0]

    index = (len(values) - 1) * (percent / 100.0)
    lower = int(index)
    upper = min(lower + 1, len(values) - 1)
    fraction = index - lower

    return clamp_int(values[lower] * (1.0 - fraction) + values[upper] * fraction)


def is_dark_background_pixel(
    pixel: Tuple[int, int, int, int],
    threshold: int,
) -> bool:
    red, green, blue, alpha = pixel

    if alpha == 0:
        return True

    return max(red, green, blue) <= threshold


def black_edge_to_alpha(
    image: Image.Image,
    threshold: int,
    grow: int,
    feather: float,
) -> Image.Image:
    image = ensure_rgba(image)
    width, height = image.size

    if width <= 0 or height <= 0:
        return image

    pixels = list(image.getdata())
    total = width * height

    candidate = bytearray(total)
    visited = bytearray(total)

    for index, pixel in enumerate(pixels):
        if is_dark_background_pixel(pixel, threshold):
            candidate[index] = 1

    queue = deque()

    def add_if_candidate(x_pos: int, y_pos: int) -> None:
        index = y_pos * width + x_pos

        if candidate[index] and not visited[index]:
            visited[index] = 1
            queue.append((x_pos, y_pos))

    for x_pos in range(width):
        add_if_candidate(x_pos, 0)
        add_if_candidate(x_pos, height - 1)

    for y_pos in range(height):
        add_if_candidate(0, y_pos)
        add_if_candidate(width - 1, y_pos)

    while queue:
        x_pos, y_pos = queue.popleft()

        for next_y in (y_pos - 1, y_pos, y_pos + 1):
            if next_y < 0 or next_y >= height:
                continue

            for next_x in (x_pos - 1, x_pos, x_pos + 1):
                if next_x < 0 or next_x >= width:
                    continue

                if next_x == x_pos and next_y == y_pos:
                    continue

                index = next_y * width + next_x

                if candidate[index] and not visited[index]:
                    visited[index] = 1
                    queue.append((next_x, next_y))

    mask_bytes = bytes(255 if value else 0 for value in visited)
    hard_mask = Image.frombytes("L", image.size, mask_bytes)

    if grow > 0:
        size = max(3, grow * 2 + 1)
        hard_mask = hard_mask.filter(ImageFilter.MaxFilter(size=size))

    if feather > 0:
        soft_mask = hard_mask.filter(ImageFilter.GaussianBlur(radius=feather))
    else:
        soft_mask = hard_mask

    mask_values = list(soft_mask.getdata())
    output_pixels = []

    for index, (red, green, blue, alpha) in enumerate(pixels):
        cut = mask_values[index]

        if cut >= 255:
            output_pixels.append((0, 0, 0, 0))
            continue

        new_alpha = int(round(alpha * (255 - cut) / 255))

        if new_alpha <= 0:
            output_pixels.append((0, 0, 0, 0))
        else:
            output_pixels.append((red, green, blue, new_alpha))

    output = Image.new("RGBA", image.size)
    output.putdata(output_pixels)

    return output


def black_matte_to_alpha(
    image: Image.Image,
    floor: int,
    gamma: float,
    boost: float,
) -> Image.Image:
    image = ensure_rgba(image)
    output_pixels = []
    floor = max(0, min(254, floor))
    gamma = max(0.05, gamma)
    denominator = max(1, 255 - floor)

    for red, green, blue, alpha in image.getdata():
        brightness = max(red, green, blue)

        if alpha == 0 or brightness <= floor:
            output_pixels.append((0, 0, 0, 0))
            continue

        normalized = clamp_float((brightness - floor) / denominator)
        alpha_factor = clamp_float((normalized**gamma) * boost)
        new_alpha = clamp_int(alpha * alpha_factor)

        if new_alpha <= 0:
            output_pixels.append((0, 0, 0, 0))
            continue

        matte_factor = max(brightness / 255.0, 0.01)
        new_red = clamp_int(red / matte_factor)
        new_green = clamp_int(green / matte_factor)
        new_blue = clamp_int(blue / matte_factor)

        output_pixels.append((new_red, new_green, new_blue, new_alpha))

    output = Image.new("RGBA", image.size)
    output.putdata(output_pixels)

    return output


def resolve_texture_whitepoint(
    pixels: List[Tuple[int, int, int, int]],
    floor: int,
    fallback: int,
    adaptive: bool,
    percent: float,
    minimum: int,
    maximum: int,
) -> int:
    fallback = max(floor + 1, min(255, fallback))

    if not adaptive:
        return fallback

    strengths = [
        max(red, green, blue)
        for red, green, blue, alpha in pixels
        if alpha > 0 and max(red, green, blue) > floor
    ]

    if not strengths:
        return fallback

    value = percentile(strengths, percent)
    value = max(minimum, min(maximum, value))
    value = max(floor + 1, min(255, value))

    return value


def texture_matte_to_alpha(
    image: Image.Image,
    floor: int,
    whitepoint: int,
    gamma: float,
    boost: float,
    unmatte_cap: float,
    adaptive_whitepoint: bool,
    whitepoint_percentile: float,
    whitepoint_min: int,
    whitepoint_max: int,
) -> Image.Image:
    image = ensure_rgba(image)
    pixels = list(image.getdata())
    output_pixels = []

    floor = max(0, min(254, floor))
    gamma = max(0.05, gamma)
    boost = max(0.0, boost)
    unmatte_cap = max(1.0, unmatte_cap)

    effective_whitepoint = resolve_texture_whitepoint(
        pixels=pixels,
        floor=floor,
        fallback=whitepoint,
        adaptive=adaptive_whitepoint,
        percent=whitepoint_percentile,
        minimum=whitepoint_min,
        maximum=whitepoint_max,
    )

    denominator = max(1, effective_whitepoint - floor)

    for red, green, blue, alpha in pixels:
        strength = max(red, green, blue)

        if alpha == 0 or strength <= floor:
            output_pixels.append((0, 0, 0, 0))
            continue

        normalized = clamp_float((strength - floor) / denominator)
        alpha_factor = clamp_float((normalized**gamma) * boost)
        new_alpha = clamp_int(alpha * alpha_factor)

        if new_alpha <= 0:
            output_pixels.append((0, 0, 0, 0))
            continue

        alpha_ratio = max(new_alpha / 255.0, 0.01)
        unmatte_factor = min(1.0 / alpha_ratio, unmatte_cap)

        new_red = clamp_int(red * unmatte_factor)
        new_green = clamp_int(green * unmatte_factor)
        new_blue = clamp_int(blue * unmatte_factor)

        output_pixels.append((new_red, new_green, new_blue, new_alpha))

    output = Image.new("RGBA", image.size)
    output.putdata(output_pixels)

    return output


def clean_alpha_channel(image: Image.Image, alpha_floor: int) -> Image.Image:
    if image.mode != "RGBA":
        return image

    cleaned = []

    for red, green, blue, alpha in image.getdata():
        if alpha <= alpha_floor:
            cleaned.append((0, 0, 0, 0))
        else:
            cleaned.append((red, green, blue, alpha))

    output = Image.new("RGBA", image.size)
    output.putdata(cleaned)

    return output


def crop_to_alpha_bbox(
    image: Image.Image,
    alpha_threshold: int,
    padding: int,
) -> Image.Image:
    image = ensure_rgba(image)
    width, height = image.size
    alpha = image.getchannel("A")
    bbox = alpha.point(
        lambda value: 255 if value > alpha_threshold else 0,
        mode="L",
    ).getbbox()

    if bbox is None:
        return image

    left, upper, right, lower = bbox

    left = max(0, left - padding)
    upper = max(0, upper - padding)
    right = min(width, right + padding)
    lower = min(height, lower + padding)

    if left == 0 and upper == 0 and right == width and lower == height:
        return image

    return image.crop((left, upper, right, lower))


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


def build_save_kwargs(image: Image.Image, profile: ImageProfile) -> dict:
    save_kwargs = {
        "format": "WEBP",
        "quality": profile.quality,
        "method": profile.method,
        "lossless": profile.lossless,
    }

    if not profile.strip_metadata:
        icc = image.info.get("icc_profile")
        exif = image.info.get("exif")

        if isinstance(icc, (bytes, bytearray)):
            save_kwargs["icc_profile"] = icc

        if isinstance(exif, (bytes, bytearray)):
            save_kwargs["exif"] = exif

    return save_kwargs


def optimize_to_webp(
    src: pathlib.Path,
    out_dir: pathlib.Path,
    profile: ImageProfile,
) -> Tuple[pathlib.Path, int, int]:
    with Image.open(src) as image:
        image = ImageOps.exif_transpose(image)
        image = normalize_mode(image)
        image = resize_to_max_size(image, profile.max_size)

        if profile.black_matte_alpha:
            image = black_matte_to_alpha(
                image=image,
                floor=profile.matte_floor,
                gamma=profile.matte_gamma,
                boost=profile.matte_boost,
            )

        if profile.texture_matte_alpha:
            image = texture_matte_to_alpha(
                image=image,
                floor=profile.texture_floor,
                whitepoint=profile.texture_whitepoint,
                gamma=profile.texture_gamma,
                boost=profile.texture_boost,
                unmatte_cap=profile.texture_unmatte_cap,
                adaptive_whitepoint=profile.texture_adaptive_whitepoint,
                whitepoint_percentile=profile.texture_whitepoint_percentile,
                whitepoint_min=profile.texture_whitepoint_min,
                whitepoint_max=profile.texture_whitepoint_max,
            )

        if profile.cutout_black_edge:
            image = black_edge_to_alpha(
                image=image,
                threshold=profile.cutout_threshold,
                grow=profile.cutout_grow,
                feather=profile.cutout_feather,
            )

        if profile.clean_alpha_rgb:
            image = clean_alpha_channel(image, profile.alpha_floor)

        if profile.crop_to_alpha:
            image = crop_to_alpha_bbox(
                image=image,
                alpha_threshold=profile.crop_alpha_threshold,
                padding=profile.crop_padding,
            )

        out_path = next_available_path(out_dir / f"{src.stem}.webp")
        image.save(out_path, **build_save_kwargs(image, profile))

    in_size = src.stat().st_size if src.exists() else 0
    out_size = out_path.stat().st_size if out_path.exists() else 0

    return out_path, in_size, out_size


def fmt_kb(size: int) -> str:
    return f"{size / 1024:.1f}KB"


def summarize(results: List[Tuple[pathlib.Path, int, int]]) -> str:
    if not results:
        return "No files processed.\n"

    total_in = sum(in_size for _, in_size, _ in results)
    total_out = sum(out_size for _, _, out_size in results)
    saved = max(0, total_in - total_out)
    saved_pct = (saved / total_in * 100.0) if total_in > 0 else 0.0

    lines = ["\nSummary\n", hr() + "\n"]

    for out_path, in_size, out_size in results:
        diff = max(0, in_size - out_size)
        pct = (diff / in_size * 100.0) if in_size > 0 else 0.0
        lines.append(
            f"{out_path.name}: {fmt_kb(in_size)} -> {fmt_kb(out_size)}  "
            f"(-{fmt_kb(diff)}, {pct:.1f}%)\n"
        )

    lines.append(hr() + "\n")
    lines.append(
        f"Total: {fmt_kb(total_in)} -> {fmt_kb(total_out)}  "
        f"(-{fmt_kb(saved)}, {saved_pct:.1f}%)\n"
    )

    return "".join(lines)


def ask_yes_no(prompt: str, default_no: bool = True) -> bool:
    suffix = " [y/N]: " if default_no else " [Y/n]: "

    while True:
        answer = input(prompt + suffix).strip().lower()

        if not answer:
            return not default_no

        if answer in {"y", "yes"}:
            return True

        if answer in {"n", "no"}:
            return False


def process_once(
    inputs: List[pathlib.Path],
    out_dir: pathlib.Path,
    profile: ImageProfile,
    log_lines: List[str],
) -> None:
    if not inputs:
        print("No supported image files found.\n")
        return

    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"{B}Processing {len(inputs)} file(s)...{RST}")

    results: List[Tuple[pathlib.Path, int, int]] = []

    for src in inputs:
        try:
            out_path, in_size, out_size = optimize_to_webp(src, out_dir, profile)
            line = (
                f"{OK}OK{RST} {src.name} -> {out_path.name}  "
                f"({fmt_kb(in_size)} -> {fmt_kb(out_size)})"
            )
            print(line)
            log_lines.append(line + "\n")
            results.append((out_path, in_size, out_size))
        except Exception as error:
            line = f"{ERR}ERROR{RST} {src} - {error}"
            print(line)
            log_lines.append(line + "\n")

    summary = summarize(results)
    print(summary, end="")
    log_lines.append(summary)
    print(f"Output directory: {CY}{out_dir.resolve()}{RST}\n")


def main() -> None:
    cwd = pathlib.Path.cwd()
    out_dir = cwd / "output"
    profile = select_profile()

    banner(out_dir, profile)

    log_lines: List[str] = []
    initial_args = [pathlib.Path(arg) for arg in sys.argv[1:] if arg.strip()]

    if initial_args:
        files = collect_supported(initial_args)
        process_once(files, out_dir, profile, log_lines)
    else:
        while True:
            line = input(
                f"{B}> Drop files or folders here, then press Enter "
                f"(or just Enter to quit):{RST}\n"
            ).strip()

            if not line:
                print("Bye.")
                break

            paths = parse_dropped_paths(line)
            files = collect_supported(paths)

            if not files:
                print("No supported images detected. Try again.\n")
                continue

            process_once(files, out_dir, profile, log_lines)

            if ask_yes_no("Process more files?", default_no=True):
                continue

            break

    if ask_yes_no("Save a session log file in the current directory?", default_no=True):
        timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H-%M-%S")
        log_path = cwd / f"image_opt_{timestamp}.log"
        log_path.write_text("".join(log_lines), encoding="utf-8")
        print(f"Saved log: {CY}{log_path}{RST}")


if __name__ == "__main__":
    main()
