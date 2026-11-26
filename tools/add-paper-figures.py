#!/usr/bin/env python3
"""Draw the folded sheet for the counting questions that showed no figure.

Each of these questions describes a fold and a punch in words only. This draws
the sheet with its creases and the punch where the words put it, then checks
that folding the drawing gives exactly the number of holes the key states. A
question whose drawing would not match the key is left alone.

Usage: python3 tools/add-paper-figures.py [--dry]
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

# paper is the 40x40 square at (10,10); creases sit where the words put the fold
SPECS = {
    "nv-paper-cutting-folding-046": ([(30, 10, 30, 50)], [(20, 20)], 2),
    "nv-paper-cutting-folding-047": ([(30, 10, 30, 50), (10, 30, 50, 30)], [(20, 20)], 4),
    "nv-paper-cutting-folding-048": ([(30, 10, 30, 50), (10, 30, 50, 30), (20, 10, 20, 50)],
                                     [(15, 15)], 8),
    "nv-paper-cutting-folding-049": ([(30, 10, 30, 50), (10, 30, 50, 30)],
                                     [(20, 20), (38, 16)], 8),
    "nv-paper-cutting-folding-050": ([(30, 10, 30, 50)], [(18, 14), (18, 26), (18, 42)], 6),
    "nv-paper-cutting-folding-051": ([(30, 10, 30, 50)], [(30, 20)], 1),
    "nv-paper-cutting-folding-052": ([(30, 10, 30, 50), (10, 30, 50, 30)], [(30, 30)], 1),
    "nv-paper-cutting-folding-053": ([(30, 10, 30, 50), (10, 30, 50, 30)],
                                     [(14, 14), (14, 25), (25, 14), (25, 25)], 16),
    "non-verbal-reasoning-031": ([(30, 10, 30, 50), (10, 30, 50, 30), (20, 10, 20, 50)],
                                 [(15, 15)], 8),
    "non-verbal-reasoning-073": ([(30, 10, 30, 50), (10, 30, 50, 30)], [(20, 20)], 4),
    "non-verbal-reasoning-062": ([], [(30, 30)], 1),
}


def big(v):
    return round(15 + (v - 10) * 1.75, 1)


def figure(creases, punches):
    parts = ['<rect x="15" y="15" width="70" height="70" fill="none"/>']
    for x1, y1, x2, y2 in creases:
        parts.append(f'<line x1="{big(x1)}" y1="{big(y1)}" x2="{big(x2)}" y2="{big(y2)}" '
                     f'stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/>')
    for cx, cy in punches:
        parts.append(f'<circle cx="{big(cx)}" cy="{big(cy)}" r="6" fill="#0f172a"/>')
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="72" '
            'height="72" role="img" aria-label="figure"><g stroke="#0f172a" stroke-width="3" '
            'stroke-linejoin="round" stroke-linecap="round" fill="none">'
            + "".join(parts) + "</g></svg>")


def count_holes(creases, punches):
    if not creases:
        return len(punches)
    svg = figure(creases, punches)
    found = dx.paper_holes(svg)
    return len(found[0]) if found else None


def key_number(q):
    o = q["options"][q["correct"]]
    m = re.search(r">([^<]*)</text>", o.get("fig") or "")
    if m:
        return m.group(1).strip()
    return (o.get("en") or "").strip()


def main():
    dry = "--dry" in sys.argv
    data = json.load(open(BANK, encoding="utf-8"))
    page = open(PAGE, encoding="utf-8").read()
    blocks = page.split('<div class="qa-item')
    done, refused = [], []
    redo = "--redo" in sys.argv
    for i, q in enumerate(data):
        if not isinstance(q, dict):
            continue
        if (q.get("fig") or "").strip() and not (redo and q["id"] in SPECS):
            continue
        plan = SPECS.get(q["id"])
        if not plan:
            refused.append((q["id"], "no plan (stem and key disagree)"))
            continue
        creases, punches, expected = plan
        got = count_holes(creases, punches)
        key = key_number(q)
        if got != expected or key != str(expected):
            refused.append((q["id"], f"fold gives {got}, key says {key}"))
            continue
        done.append((i, q["id"], figure(creases, punches), expected))

    print(f"figures to draw: {len(done)} | refused: {len(refused)}")
    for r in refused:
        print("   refused:", r)
    if dry:
        print("\ndry run: nothing written")
        return

    for i, qid, svg, n in done:
        data[i]["fig"] = svg
        block = blocks[i + 1]
        head_end = block.find('class="qs6"')
        head = block if head_end < 0 else block[:head_end]
        existing = re.search(r'<div class="nv-media">[\s\S]*?</div>', head)
        if existing:
            blocks[i + 1] = (block[:existing.start()] + '<div class="nv-media">' + svg + "</div>"
                             + block[existing.end():])
        elif "nv-media" not in head:
            m = re.search(r'(<div class="qs10" lang="as">[\s\S]*?</div>)', block)
            if m:
                blocks[i + 1] = (block[:m.end()] + '<div class="nv-media">' + svg + "</div>"
                                 + block[m.end():])
    json.dump(data, open(BANK, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    open(PAGE, "w", encoding="utf-8").write('<div class="qa-item'.join(blocks))
    print(f"wrote {len(done)} figures")


if __name__ == "__main__":
    main()
