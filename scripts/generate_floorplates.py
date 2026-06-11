from __future__ import annotations

from collections import deque
from pathlib import Path

import fitz
from PIL import Image, ImageEnhance, ImageFilter, ImageOps


FLOOR_IDS = [
    "b02",
    "b01",
    "gf",
    "1f",
    "2f",
    "3f",
    "4f",
    "5f",
    "6f",
    "7f",
    "8f",
    "9f",
    "10f",
    "11f",
    "12f",
    "13f",
    "14f",
    "15f",
    "16f",
    "17f",
    "18f",
    "19f",
]

PDF_PATH = Path("/workspace/ipb_signoff.pdf")
OUTPUT_DIR = Path("/workspace/public/floorplates")
PDF_SCALE = 2.4
RAW_WIDTH = 260
SIMPLIFY_WIDTH = 420
OUTPUT_WIDTH = 1600
MASK_MARGIN = 24
CORE_MASK_MARGIN = 10


def trim_sparse_bbox(
    mask: Image.Image,
    bbox: tuple[int, int, int, int],
    *,
    probe: int = 18,
    coverage_threshold: float = 0.18,
) -> tuple[int, int, int, int]:
    pixels = mask.load()
    left, top, right, bottom = bbox

    def band_ratio(current_bbox: tuple[int, int, int, int], edge: str) -> float:
        current_left, current_top, current_right, current_bottom = current_bbox
        width = current_right - current_left
        height = current_bottom - current_top

        if width <= 0 or height <= 0:
            return 1.0

        if edge in {"left", "right"}:
            band = min(probe, width)
            x_start = current_left if edge == "left" else current_right - band
            total = band * height
            filled = sum(
                1
                for y in range(current_top, current_bottom)
                for x in range(x_start, x_start + band)
                if pixels[x, y] > 0
            )
        else:
            band = min(probe, height)
            y_start = current_top if edge == "top" else current_bottom - band
            total = width * band
            filled = sum(
                1
                for y in range(y_start, y_start + band)
                for x in range(current_left, current_right)
                if pixels[x, y] > 0
            )

        return filled / total if total else 1.0

    while right - left > probe and band_ratio((left, top, right, bottom), "left") < coverage_threshold:
        left += probe
    while right - left > probe and band_ratio((left, top, right, bottom), "right") < coverage_threshold:
        right -= probe
    while bottom - top > probe and band_ratio((left, top, right, bottom), "top") < coverage_threshold:
        top += probe
    while bottom - top > probe and band_ratio((left, top, right, bottom), "bottom") < coverage_threshold:
        bottom -= probe

    return left, top, right, bottom


def build_floor_mask(image: Image.Image, *, strict: bool = False) -> Image.Image:
    small = image.resize(
        (RAW_WIDTH, int(image.height * RAW_WIDTH / image.width)),
        Image.Resampling.BILINEAR,
    )
    src = small.load()
    mask = Image.new("L", small.size, 0)
    dst = mask.load()

    for y in range(small.height):
        for x in range(small.width):
            red, green, blue = src[x, y]
            max_channel = max(red, green, blue)
            min_channel = min(red, green, blue)
            saturation = max_channel - min_channel
            luminance = (red + green + blue) / 3

            if strict:
                # Use a tighter core to decide the true floorplate bounds.
                keep_pixel = (saturation > 18 and luminance < 242) or luminance < 148
            else:
                # Keep colored zones, corridors and dark structural walls.
                keep_pixel = (saturation > 10 and luminance < 248) or luminance < 170

            if keep_pixel:
                dst[x, y] = 255

    filter_sizes = (5, 7) if strict else (5, 7, 9)
    for size in filter_sizes:
        mask = mask.filter(ImageFilter.MaxFilter(size))

    blur_radius = 1.2 if strict else 1.8
    threshold = 40 if strict else 28
    mask = mask.filter(ImageFilter.GaussianBlur(blur_radius))
    mask = mask.point(lambda value: 255 if value > threshold else 0)
    return keep_largest_component(mask)


def keep_largest_component(mask: Image.Image) -> Image.Image:
    width, height = mask.size
    src = mask.load()
    visited = [[False] * width for _ in range(height)]
    largest_component: list[tuple[int, int]] = []

    for y in range(height):
        for x in range(width):
            if visited[y][x] or src[x, y] == 0:
                continue

            queue = deque([(x, y)])
            visited[y][x] = True
            component: list[tuple[int, int]] = []

            while queue:
                current_x, current_y = queue.popleft()
                component.append((current_x, current_y))

                for next_x, next_y in (
                    (current_x + 1, current_y),
                    (current_x - 1, current_y),
                    (current_x, current_y + 1),
                    (current_x, current_y - 1),
                ):
                    if (
                        0 <= next_x < width
                        and 0 <= next_y < height
                        and not visited[next_y][next_x]
                        and src[next_x, next_y] > 0
                    ):
                        visited[next_y][next_x] = True
                        queue.append((next_x, next_y))

            if len(component) > len(largest_component):
                largest_component = component

    result = Image.new("L", mask.size, 0)
    result_pixels = result.load()

    for x, y in largest_component:
        result_pixels[x, y] = 255

    result = result.filter(ImageFilter.MaxFilter(5))
    result = result.filter(ImageFilter.GaussianBlur(1.2))
    return result.point(lambda value: 255 if value > 20 else 0)


def simplify_floor_image(image: Image.Image, mask: Image.Image) -> Image.Image:
    core_mask = build_floor_mask(image, strict=True)
    simplified = image.resize(
        (SIMPLIFY_WIDTH, int(image.height * SIMPLIFY_WIDTH / image.width)),
        Image.Resampling.BILINEAR,
    )
    simplified = ImageOps.autocontrast(simplified, cutoff=1)
    simplified = simplified.filter(ImageFilter.MedianFilter(3))
    simplified = ImageOps.posterize(simplified, 5)
    detailed = simplified.resize(
        (OUTPUT_WIDTH, int(simplified.height * OUTPUT_WIDTH / simplified.width)),
        Image.Resampling.BILINEAR,
    )
    detailed = ImageEnhance.Color(detailed).enhance(1.06)
    detailed = ImageEnhance.Contrast(detailed).enhance(1.06)
    detailed = ImageEnhance.Sharpness(detailed).enhance(1.32)

    enlarged_mask = mask.resize(detailed.size, Image.Resampling.LANCZOS)
    enlarged_core_mask = core_mask.resize(detailed.size, Image.Resampling.LANCZOS)
    core_bbox = enlarged_core_mask.getbbox()
    bounding_box = None
    margin = MASK_MARGIN

    if core_bbox:
        bounding_box = trim_sparse_bbox(
            enlarged_core_mask,
            core_bbox,
            probe=14,
            coverage_threshold=0.22,
        )
        margin = CORE_MASK_MARGIN
    elif enlarged_mask.getbbox():
        bounding_box = trim_sparse_bbox(enlarged_mask, enlarged_mask.getbbox())

    if bounding_box:
        left, top, right, bottom = bounding_box
        bounding_box = (
            max(0, left - margin),
            max(0, top - margin),
            min(detailed.width, right + margin),
            min(detailed.height, bottom + margin),
        )
        detailed = detailed.crop(bounding_box)
        enlarged_mask = enlarged_mask.crop(bounding_box)

    canvas = Image.new("RGBA", detailed.size, (0, 0, 0, 0))
    base_fill = Image.new("RGBA", detailed.size, (226, 236, 247, 108))
    canvas.paste(base_fill, (0, 0), enlarged_mask)

    map_rgba = detailed.convert("RGBA")
    map_rgba.putalpha(enlarged_mask)
    canvas = Image.alpha_composite(canvas, map_rgba)

    outline = enlarged_mask.filter(ImageFilter.FIND_EDGES)
    outline = outline.point(lambda value: 255 if value > 10 else 0)
    edge = Image.new("RGBA", detailed.size, (120, 145, 176, 232))
    canvas.paste(edge, (0, 0), outline)
    return canvas


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf = fitz.open(PDF_PATH)

    for page_index, floor_id in enumerate(FLOOR_IDS):
        pixmap = pdf.load_page(page_index).get_pixmap(
            matrix=fitz.Matrix(PDF_SCALE, PDF_SCALE),
            alpha=False,
        )
        image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
        mask = build_floor_mask(image)
        simplified = simplify_floor_image(image, mask)
        simplified.save(OUTPUT_DIR / f"{floor_id}.png")
        print(f"saved {floor_id}")


if __name__ == "__main__":
    main()
