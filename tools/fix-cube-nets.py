#!/usr/bin/env python3
"""Redraw the under-drawn cube nets so the asked opposite face can be read off.

The dhs-dme cube-dice bank drew only three faces (a corner of a die) for the
"In the given net of a cube" questions, so the opposite face cannot be found
from the drawing and the keys disagree with it. This rewrites those figures as
full six-square nets that keep every question, option and key, and places the
numbers so that the key's opposite pair really sits on opposite cells.

Usage: python3 tools/fix-cube-nets.py [--dry]
"""

import collections
import hashlib
import json
import re
import sys

BANK = ("data/exams/dhs-dme-technical/logical-reasoning/non-verbal-reasoning/"
        "cube-dice/question-001.json")
PAGE = ("exams/dhs-dme-technical/logical-reasoning/non-verbal-reasoning/"
        "cube-dice/index.html")
OLD_PREFIX = "when the net folds, the first and third squares of the row"

CELL = 46
POS = [(6, 52), (52, 52), (98, 52), (144, 52), (52, 6), (98, 98)]
OPPOSITE_POS = {0: 2, 2: 0, 1: 3, 3: 1, 4: 5, 5: 4}


def net_svg(values):
    parts = ['<rect x="2" y="2" width="192" height="146" rx="10" fill="none" stroke="#e2e8f0"/>']
    for (x, y), n in zip(POS, values):
        parts.append(f'<rect x="{x}" y="{y}" width="{CELL}" height="{CELL}" fill="#f8fafc" '
                     f'stroke="#334155" stroke-width="2"/>')
        parts.append(f'<text x="{x + CELL // 2}" y="{y + 31}" font-size="24" '
                     f'font-family="Arial, Helvetica, sans-serif" font-weight="700" '
                     f'text-anchor="middle" fill="#334155">{n}</text>')
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 196 150" width="392" '
            'height="300" role="img" aria-label="cube net">' + "".join(parts) + "</svg>")


def read_back(svg):
    """Read the drawn net back: {face: opposite face} after folding."""
    cells = [(float(m.group(1)), float(m.group(2)), m.group(3).strip())
             for m in re.finditer(r'<text[^>]*x="([\d.]+)"[^>]*y="([\d.]+)"[^>]*>([^<]+)</text>', svg)]
    if len(cells) != 6:
        return None
    xs = sorted({c[0] for c in cells})
    ys = sorted({c[1] for c in cells})
    near = lambda v, arr: min(range(len(arr)), key=lambda i: abs(arr[i] - v))
    grid = {}
    for x, y, t in cells:
        grid[(near(x, xs), near(y, ys))] = t
    if len(grid) != 6:
        return None
    neg = lambda v: (-v[0], -v[1], -v[2])
    start = next(iter(grid))
    frames = {start: ((1, 0, 0), (0, 1, 0), (0, 0, 1))}
    stack = [start]
    while stack:
        c = stack.pop()
        r, d, n = frames[c]
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nb = (c[0] + dx, c[1] + dy)
            if nb not in grid or nb in frames:
                continue
            if dx == 1:
                f = (neg(n), d, r)
            elif dx == -1:
                f = (n, d, neg(r))
            elif dy == 1:
                f = (r, neg(n), d)
            else:
                f = (r, n, neg(d))
            frames[nb] = f
            stack.append(nb)
    if len(frames) != 6:
        return None
    opp = {}
    for c1, f1 in frames.items():
        for c2, f2 in frames.items():
            if c1 != c2 and f1[2] == neg(f2[2]):
                opp[grid[c1]] = grid[c2]
    return opp if len(opp) == 6 else None


def groups_of(data):
    groups = collections.defaultdict(list)
    for i, q in enumerate(data):
        if not isinstance(q, dict):
            continue
        if not (q.get("explanation") or {}).get("en", "").lower().startswith(OLD_PREFIX):
            continue
        m = re.search(r"number opposite (\d)", q["q"]["en"])
        if not m:
            continue
        key = (q["options"][q["correct"]].get("en") or "").strip()
        if not key.isdigit():
            continue
        h = hashlib.md5((q.get("fig") or "").encode()).hexdigest()[:8]
        groups[h].append((i, int(m.group(1)), key))
    return groups


def plan(values_by_group, items):
    pairs = sorted({tuple(sorted((asked, int(key)))) for _, asked, key in items})
    if len(pairs) != 2:
        return None
    used = {n for p in pairs for n in p}
    rest = sorted(set(range(1, 7)) - used)
    if len(rest) != 2:
        return None
    a, b = pairs
    return [a[0], b[0], a[1], b[1], rest[0], rest[1]]


def main():
    dry = "--dry" in sys.argv
    data = json.load(open(BANK, encoding="utf-8"))
    page = open(PAGE, encoding="utf-8").read()
    blocks = page.split('<div class="qa-item')

    groups = groups_of(data)
    new_figs = {}
    report = []
    for h, items in groups.items():
        values = plan(None, items)
        if not values:
            report.append((h, "could not place the pairs", len(items)))
            continue
        svg = net_svg(values)
        opp = read_back(svg)
        if not opp:
            report.append((h, "fold check failed", len(items)))
            continue
        bad = [(asked, key) for _, asked, key in items if opp.get(str(asked)) != key]
        if bad:
            report.append((h, f"key clash {bad}", len(items)))
            continue
        for i, _, _ in items:
            new_figs[i] = svg
        report.append((h, "ok", len(items), values))

    ok = sum(r[2] for r in report if r[1] == "ok")
    print(f"groups: {len(groups)} | items redrawn: {ok}")
    for r in report[:5]:
        print("  ", r)

    if dry:
        print("\ndry run: nothing written")
        return
    for i, svg in new_figs.items():
        data[i]["fig"] = svg
        block = blocks[i + 1]
        m = re.search(r'<div class="nv-media">[\s\S]*?</div>', block)
        if m:
            blocks[i + 1] = (block[:m.start()] + '<div class="nv-media">' + svg + '</div>'
                             + block[m.end():])
    json.dump(data, open(BANK, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    open(PAGE, "w", encoding="utf-8").write('<div class="qa-item'.join(blocks))
    print(f"wrote {len(new_figs)} figures to the bank and the page")


if __name__ == "__main__":
    main()
