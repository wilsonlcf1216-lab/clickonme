from __future__ import annotations

from collections import deque
from pathlib import Path

import fitz
from PIL import Image, ImageFilter


PDF_PATH = Path("/workspace/ipb_signoff.pdf")
OUTPUT_DIR = Path("/workspace/public/floorplates")
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
PDF_SCALE = 2.6
RAW_WIDTH = 300
OUTPUT_WIDTH = 1600
MASK_MARGIN = 18
DEPARTMENT_FILL = (201, 220, 241, 255)
CORRIDOR_FILL = (250, 252, 255, 255)
OUTLINE_FILL = (107, 130, 156, 255)
CORRIDOR_OUTLINE_FILL = (198, 211, 226, 255)


def resize_for_analysis(image: Image.Image) -> Image.Image:
    return image.resize(
        (RAW_WIDTH, int(image.height * RAW_WIDTH / image.width)),
        Image.Resampling.BILINEAR,
    )


def keep_largest_component(mask: Image.Image) -> Image.Image:
    width, height = mask.size
    pixels = mask.load()
    visited: set[tuple[int, int]] = set()
    largest_component: list[tuple[int, int]] = []

    for y in range(height):
        for x in range(width):
            if pixels[x, y] == 0 or (x, y) in visited:
                continue

            queue = deque([(x, y)])
            visited.add((x, y))
            component: list[tuple[int, int]] = []

            while queue:
                current_x, current_y = queue.popleft()
                component.append((current_x, current_y))

                for delta_x, delta_y in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    next_x = current_x + delta_x
                    next_y = current_y + delta_y

                    if (
                        next_x < 0
                        or next_x >= width
                        or next_y < 0
                        or next_y >= height
                        or pixels[next_x, next_y] == 0
                        or (next_x, next_y) in visited
                    ):
                        continue

                    visited.add((next_x, next_y))
                    queue.append((next_x, next_y))

            if len(component) > len(largest_component):
                largest_component = component

    result = Image.new("L", mask.size, 0)
    result_pixels = result.load()

    for x, y in largest_component:
        result_pixels[x, y] = 255

    return result


def remove_small_components(mask: Image.Image, minimum_area: int) -> Image.Image:
    width, height = mask.size
    pixels = mask.load()
    visited: set[tuple[int, int]] = set()
    result = Image.new("L", mask.size, 0)
    result_pixels = result.load()

    for y in range(height):
        for x in range(width):
            if pixels[x, y] == 0 or (x, y) in visited:
                continue

            queue = deque([(x, y)])
            visited.add((x, y))
            component: list[tuple[int, int]] = []

            while queue:
                current_x, current_y = queue.popleft()
                component.append((current_x, current_y))

                for delta_x, delta_y in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    next_x = current_x + delta_x
                    next_y = current_y + delta_y

                    if (
                        next_x < 0
                        or next_x >= width
                        or next_y < 0
                        or next_y >= height
                        or pixels[next_x, next_y] == 0
                        or (next_x, next_y) in visited
                    ):
                        continue

                    visited.add((next_x, next_y))
                    queue.append((next_x, next_y))

            if len(component) < minimum_area:
                continue

            for point_x, point_y in component:
                result_pixels[point_x, point_y] = 255

    return result


def fill_mask_holes(mask: Image.Image) -> Image.Image:
    width, height = mask.size
    pixels = mask.load()
    visited: set[tuple[int, int]] = set()
    background = Image.new("L", mask.size, 0)
    background_pixels = background.load()
    queue = deque()

    for x in range(width):
        if pixels[x, 0] == 0:
            queue.append((x, 0))
        if pixels[x, height - 1] == 0:
            queue.append((x, height - 1))

    for y in range(height):
        if pixels[0, y] == 0:
            queue.append((0, y))
        if pixels[width - 1, y] == 0:
            queue.append((width - 1, y))

    while queue:
        current_x, current_y = queue.popleft()

        if (
            current_x < 0
            or current_x >= width
            or current_y < 0
            or current_y >= height
            or pixels[current_x, current_y] > 0
            or (current_x, current_y) in visited
        ):
            continue

        visited.add((current_x, current_y))
        background_pixels[current_x, current_y] = 255

        for delta_x, delta_y in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            queue.append((current_x + delta_x, current_y + delta_y))

    filled = Image.new("L", mask.size, 0)
    filled_pixels = filled.load()

    for y in range(height):
        for x in range(width):
            if pixels[x, y] > 0 or background_pixels[x, y] == 0:
                filled_pixels[x, y] = 255

    return filled


def build_floor_mask(image: Image.Image) -> Image.Image:
    small = resize_for_analysis(image)
    mask = Image.new("L", small.size, 0)
    src = small.load()
    dst = mask.load()

    for y in range(small.height):
        for x in range(small.width):
            red, green, blue = src[x, y]
            max_channel = max(red, green, blue)
            min_channel = min(red, green, blue)
            saturation = max_channel - min_channel
            luminance = (red + green + blue) / 3

            if (saturation > 10 and luminance < 248) or luminance < 180:
                dst[x, y] = 255

    mask = mask.filter(ImageFilter.MaxFilter(5))
    mask = mask.filter(ImageFilter.MaxFilter(7))
    mask = keep_largest_component(mask)
    mask = mask.filter(ImageFilter.MaxFilter(9))
    mask = mask.filter(ImageFilter.MinFilter(7))
    mask = fill_mask_holes(mask)
    mask = mask.filter(ImageFilter.MaxFilter(5))
    mask = mask.filter(ImageFilter.MinFilter(5))
    return mask


def build_corridor_mask(image: Image.Image, floor_mask: Image.Image) -> Image.Image:
    small = resize_for_analysis(image)
    src = small.load()
    floor_pixels = floor_mask.load()
    corridor = Image.new("L", small.size, 0)
    corridor_pixels = corridor.load()

    for y in range(small.height):
        for x in range(small.width):
            if floor_pixels[x, y] == 0:
                continue

            red, green, blue = src[x, y]
            max_channel = max(red, green, blue)
            min_channel = min(red, green, blue)
            saturation = max_channel - min_channel
            luminance = (red + green + blue) / 3

            # Keep the major bright neutral circulation spaces only.
            if luminance > 214 and saturation < 24:
                corridor_pixels[x, y] = 255

    corridor = corridor.filter(ImageFilter.MaxFilter(5))
    corridor = corridor.filter(ImageFilter.MinFilter(3))
    corridor = corridor.filter(ImageFilter.MaxFilter(3))

    floor_area = sum(1 for value in floor_mask.tobytes() if value > 0)
    minimum_area = max(40, floor_area // 180)
    corridor = remove_small_components(corridor, minimum_area)
    corridor = corridor.filter(ImageFilter.MaxFilter(3))

    clipped = Image.new("L", corridor.size, 0)
    clipped_pixels = clipped.load()
    corridor_pixels = corridor.load()

    for y in range(corridor.height):
        for x in range(corridor.width):
            if corridor_pixels[x, y] > 0 and floor_pixels[x, y] > 0:
                clipped_pixels[x, y] = 255

    return clipped


def trim_bbox(mask: Image.Image) -> tuple[int, int, int, int] | None:
    bbox = mask.getbbox()

    if not bbox:
        return None

    left, top, right, bottom = bbox
    return (
        max(0, left - MASK_MARGIN),
        max(0, top - MASK_MARGIN),
        min(mask.width, right + MASK_MARGIN),
        min(mask.height, bottom + MASK_MARGIN),
    )


def render_floorplate(image: Image.Image) -> Image.Image:
    floor_mask_small = build_floor_mask(image)
    corridor_mask_small = build_corridor_mask(image, floor_mask_small)

    output_height = int(image.height * OUTPUT_WIDTH / image.width)
    floor_mask = floor_mask_small.resize((OUTPUT_WIDTH, output_height), Image.Resampling.NEAREST)
    corridor_mask = corridor_mask_small.resize(
        (OUTPUT_WIDTH, output_height),
        Image.Resampling.NEAREST,
    )

    bbox = trim_bbox(floor_mask)
    if bbox:
        image = image.resize((OUTPUT_WIDTH, output_height), Image.Resampling.LANCZOS).crop(bbox)
        floor_mask = floor_mask.crop(bbox)
        corridor_mask = corridor_mask.crop(bbox)
    else:
        image = image.resize((OUTPUT_WIDTH, output_height), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", image.size, (0, 0, 0, 0))
    department_fill = Image.new("RGBA", image.size, DEPARTMENT_FILL)
    corridor_fill = Image.new("RGBA", image.size, CORRIDOR_FILL)
    outline_fill = Image.new("RGBA", image.size, OUTLINE_FILL)
    corridor_outline_fill = Image.new("RGBA", image.size, CORRIDOR_OUTLINE_FILL)

    canvas.paste(department_fill, (0, 0), floor_mask)
    canvas.paste(corridor_fill, (0, 0), corridor_mask)

    floor_outline = floor_mask.filter(ImageFilter.FIND_EDGES).point(
        lambda value: 255 if value > 0 else 0
    )
    corridor_outline = corridor_mask.filter(ImageFilter.FIND_EDGES).point(
        lambda value: 255 if value > 0 else 0
    )

    canvas.paste(outline_fill, (0, 0), floor_outline)
    canvas.paste(corridor_outline_fill, (0, 0), corridor_outline)
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
        rendered = render_floorplate(image)
        rendered.save(OUTPUT_DIR / f"{floor_id}.png")
        print(f"generated {floor_id}.png")


if __name__ == "__main__":
    main()
