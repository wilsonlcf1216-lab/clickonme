from __future__ import annotations

import json
import re
from pathlib import Path

import fitz


PDF_PATH = Path("/workspace/ipb_signoff.pdf")
OUTPUT_PATH = Path("/workspace/src/data/generatedOverlays.ts")
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

DEPARTMENT_CODE_RE = re.compile(r"\b\d{2}\.\d{2}(?:\.\d+[A-Za-z]?)*(?:-\d+)?\b")
LIFT_CODE_RE = re.compile(r"\b(?:A\d|S\d|L\d|H\d|SE\d|SW\d|SN\d|E\d|WW\d|CH\d|CT\d|U2A)\b")
ROOM_TEXT_RE = re.compile(r"[A-Za-z]{3,}")
BAD_DEPARTMENT_TEXT_RE = re.compile(
    r"(?:APPRO|ISSUED|NOVEMBER|APRIL|MEETING|m2|m\xb2|UP$|DN$|SHAFT|VOID|RISER)",
    re.IGNORECASE,
)


def as_percent(value: float, total: float) -> str:
    percent = (value / total) * 100
    return f"{percent:.1f}%"


def clean_name(lines: list[str], code: str) -> str:
    cleaned_lines: list[str] = []

    for line in lines:
        line = line.strip()
        if not line:
            continue
        if line == code:
            continue
        if line.startswith(code):
            line = line[len(code) :].strip(" :-|")
        line = re.sub(r"\s+", " ", line).strip()
        if not line:
            continue
        cleaned_lines.append(line)

    return " ".join(cleaned_lines).strip()


def build_department_seeds(pdf: fitz.Document) -> list[dict[str, object]]:
    seeds: list[dict[str, object]] = []

    for page_index, floor_id in enumerate(FLOOR_IDS):
        page = pdf.load_page(page_index)
        width = page.rect.width
        height = page.rect.height
        seen: set[tuple[str, str, str]] = set()

        for block in page.get_text("blocks"):
            x0, y0, x1, y1, text, *_ = block
            lines = [line.strip() for line in str(text).splitlines() if line.strip()]
            if not lines:
                continue

            joined = " | ".join(lines)
            if BAD_DEPARTMENT_TEXT_RE.search(joined):
                continue

            match = DEPARTMENT_CODE_RE.search(joined)
            if not match:
                continue

            code = match.group(0)
            name = clean_name(lines, code)

            # Keep named departments/rooms. Code-only labels are too noisy for search.
            if not name or not ROOM_TEXT_RE.search(name):
                continue

            center_x = (x0 + x1) / 2
            center_y = (y0 + y1) / 2
            position_x = as_percent(center_x, width)
            position_y = as_percent(center_y, height)
            dedupe_key = (floor_id, code, position_x)

            if dedupe_key in seen:
                continue
            seen.add(dedupe_key)

            seeds.append(
                {
                    "id": f"gen-{floor_id}-{len(seeds) + 1}",
                    "floorId": floor_id,
                    "code": code,
                    "name": name,
                    "target": {"x": position_x, "y": position_y},
                }
            )

    return seeds


def build_lift_seeds(pdf: fitz.Document) -> list[dict[str, object]]:
    seeds: list[dict[str, object]] = []

    for page_index, floor_id in enumerate(FLOOR_IDS):
        page = pdf.load_page(page_index)
        width = page.rect.width
        height = page.rect.height
        seen: set[tuple[str, str, str, str]] = set()

        for block in page.get_text("blocks"):
            x0, y0, x1, y1, text, *_ = block
            lines = [line.strip() for line in str(text).splitlines() if line.strip()]
            if not lines:
                continue

            joined = " ".join(lines)
            codes = [code for code in LIFT_CODE_RE.findall(joined) if code not in {"UP", "DN"}]
            if not codes:
                continue

            if len(codes) == 1:
                position_pairs = [(codes[0], (x0 + x1) / 2, (y0 + y1) / 2)]
            else:
                step = (x1 - x0) / max(len(codes), 1)
                position_pairs = [
                    (
                        code,
                        x0 + step * (index + 0.5),
                        (y0 + y1) / 2,
                    )
                    for index, code in enumerate(codes)
                ]

            for code, center_x, center_y in position_pairs:
                position_x = as_percent(center_x, width)
                position_y = as_percent(center_y, height)
                dedupe_key = (floor_id, code, position_x, position_y)

                if dedupe_key in seen:
                    continue
                seen.add(dedupe_key)

                seeds.append(
                    {
                        "id": f"lift-{floor_id}-{code.lower()}-{len(seeds) + 1}",
                        "floorId": floor_id,
                        "code": code,
                        "position": {"x": position_x, "y": position_y},
                    }
                )

    return seeds


def format_ts_export(name: str, payload: list[dict[str, object]]) -> str:
    return f"export const {name} = {json.dumps(payload, indent=2)} as const;\n"


def main() -> None:
    pdf = fitz.open(PDF_PATH)
    department_seeds = build_department_seeds(pdf)
    lift_seeds = build_lift_seeds(pdf)

    content = (
        "/* Auto-generated by scripts/generate_overlay_data.py */\n"
        + format_ts_export("generatedDepartmentSeeds", department_seeds)
        + "\n"
        + format_ts_export("generatedLiftSeeds", lift_seeds)
    )
    OUTPUT_PATH.write_text(content)
    print(
        f"generated {len(department_seeds)} department seeds and "
        f"{len(lift_seeds)} lift seeds"
    )


if __name__ == "__main__":
    main()
