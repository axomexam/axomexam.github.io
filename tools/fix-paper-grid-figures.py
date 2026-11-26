#!/usr/bin/env python3
"""Put both punches of the two-hole grid questions inside the folded quarter.

The stem says two holes are punched at the marked squares of the folded quarter,
but the drawing put one punch in each half of the sheet, which no fold can do.
The answer option already shows the eight holes the fold produces, so the
punches are read back out of that answer - the two cells it puts in one quarter
- and the sheet is redrawn with both of them there. A figure is written only
when folding it reproduces the answer exactly.

Usage: python3 tools/fix-paper-grid-figures.py [--dry]
"""

import importlib.util
import json
import re
import sys

BANK = ("data/exams/dhs-dme-technical/logical-reasoning/non-verbal-reasoning/"
        "paper-cutting-folding/question-001.json")
PAGE = ("exams/dhs-dme-technical/logical-reasoning/non-verbal-reasoning/"
        "paper-cutting-folding/index.html")

spec = importlib.util.spec_from_file_location("dx", "tools/diversify-explanations.py")
dx = importlib.util.module_from_spec(spec)
spec.loader.exec_module(dx)


def folded(norm, lines):
    out = set(norm)
    for a, b in lines:
        out |= {dx.paper_reflect_n(p, (a[0], a[1], b[0], b[1])) for p in list(out)}
    return out


def snap(norm, grid):
    """Move a point to the nearest cell centre of the drawn grid."""
    cols, rows = grid
    if not cols or not rows:
        return norm
    def near(v, n):
        centres = [(i + 0.5) / n for i in range(n)]
        return min(centres, key=lambda c: abs(c - v))
    return (near(norm[0], cols), near(norm[1], rows))


def redraw(fig, punches_px):
    r = re.search(r'r="([\d.]+)"', fig).group(1)
    keep = re.sub(r'<circle\b[^>]*/>', "", fig)
    dots = "".join(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#0f172a"/>'
                   for cx, cy in punches_px)
    return keep.replace("</g></svg>", dots + "</g></svg>")


def main():
    dry = "--dry" in sys.argv
    data = json.load(open(BANK, encoding="utf-8"))
    page = open(PAGE, encoding="utf-8").read()
    blocks = page.split('<div class="qa-item')
    fixed, refused = 0, []
    for i, q in enumerate(data):
        if not isinstance(q, dict) or "punch" not in q["q"]["en"].lower():
            continue
        if dx.paper_fold_grid(q):          # already folds out to the key
            continue
        fig = q.get("fig") or ""
        lines, _, _ = dx.paper_grid_folds(q["q"]["en"])
        boxes = dx.paper_boxes(fig)
        if not lines or not boxes or not dx.paper_punches(fig):
            refused.append((q["id"], "no fold or no punch"))
            continue
        box = dx.paper_pick_box(boxes, dx.paper_punches(fig)[0])
        key = dx.paper_option_holes(q["options"][q["correct"]].get("fig"))
        drawn = len(dx.paper_punches(fig))
        quarter = {p for p in key if p[0] < 0.5 and p[1] < 0.5}
        if not key or len(quarter) != drawn:
            refused.append((q["id"], f"answer puts {len(quarter)} holes in one quarter, figure has {drawn} punches"))
            continue
        grid = dx.paper_grid_size(fig)
        placed = None
        for candidate in ({snap(p, grid) for p in quarter}, set(quarter)):
            holes = folded(candidate, lines)
            if holes == key or dx.paper_ranks(holes) == dx.paper_ranks(key):
                placed = candidate
                break
        if placed is None:
            refused.append((q["id"], "answer does not fold out of one quarter"))
            continue
        px = [(round(box[0] + nx * (box[2] - box[0]), 2), round(box[1] + ny * (box[3] - box[1]), 2))
              for nx, ny in sorted(placed)]
        new = redraw(fig, px)
        check = dict(q)
        check["fig"] = new
        if not dx.paper_fold_grid(check):
            refused.append((q["id"], "redrawn sheet does not match the answer"))
            continue
        data[i]["fig"] = new
        block = blocks[i + 1]
        if fig in block:
            blocks[i + 1] = block.replace(fig, new, 1)
        fixed += 1

    print(f"figures redrawn: {fixed} | refused: {len(refused)}")
    for r in refused:
        print("   refused:", r)
    if dry:
        print("dry run: nothing written")
        return
    json.dump(data, open(BANK, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    open(PAGE, "w", encoding="utf-8").write('<div class="qa-item'.join(blocks))
    print("written")


if __name__ == "__main__":
    main()
