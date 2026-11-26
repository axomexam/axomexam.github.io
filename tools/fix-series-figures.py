#!/usr/bin/env python3
"""Put each series figure inside its own cell.

The series are drawn as five cells with the next figure missing, but the shapes
carry cell-local coordinates while the cells themselves are laid out across the
canvas. Every shape therefore lands on the first cell and the rest stay empty.
This wraps each cell's shapes in a translate+scale group so they sit where the
cell is.

Usage: python3 tools/fix-series-figures.py [--dry]
"""
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRY = "--dry" in sys.argv

ELEMENT = re.compile(r'<(?:rect|polygon|line|circle|path|text)\b[^>]*?(?:/>|>[^<]*</text>)')


def is_cell(el):
    return el.startswith("<rect") and 'rx="8"' in el and "#e2e8f0" in el


def is_shape(el):
    if el.startswith("<rect") or el.startswith("<text"):
        return False
    return 'stroke="#334155"' in el or 'fill="#334155"' in el


def box(el):
    g = lambda k: float(re.search(k + r'="([\d.]+)"', el).group(1))
    return g("x"), g("y"), g("width"), g("height")


def shape_centre(el):
    nums = lambda pat: [float(x) for x in re.findall(pat, el)]
    if el.startswith("<circle"):
        return nums(r'cx="([\d.]+)"')[0], nums(r'cy="([\d.]+)"')[0]
    if el.startswith("<line"):
        x1, y1, x2, y2 = nums(r'[xy][12]="([\d.]+)"')
        return (x1 + x2) / 2, (y1 + y2) / 2
    pts = re.search(r'points="([^"]*)"', el)
    if pts:
        P = [tuple(map(float, t.split(","))) for t in pts.group(1).split()]
        return sum(p[0] for p in P) / len(P), sum(p[1] for p in P) / len(P)
    m = re.search(r'd="([^"]*)"', el)
    if m:
        n = [float(x) for x in re.findall(r"-?[\d.]+", m.group(1))]
        return (n[0] + n[-2]) / 2, (n[1] + n[-1]) / 2
    return 0.0, 0.0


def inside(el, b):
    cx, cy = shape_centre(el)
    return b[0] <= cx <= b[0] + b[2] and b[1] <= cy <= b[1] + b[3]


def rebuild(fig):
    els = ELEMENT.findall(fig)
    if not els:
        return None
    cells = [e for e in els if is_cell(e)]
    shapes = [e for e in els if is_shape(e)]
    if len(cells) < 2 or not shapes:
        return None
    boxes = [box(c) for c in cells]
    first = boxes[0]
    if not all(inside(s, first) for s in shapes):
        return None                                  # already drawn in place
    if any(any(inside(s, b) for s in shapes) for b in boxes[1:]):
        return None
    head = fig[:fig.index(els[0])]
    out = [head]
    buf = []
    scale = None

    def flush():
        if buf:
            out.append(f'<g transform="translate({scale[0]:g},{scale[1]:g}) scale({scale[2]:g})">'
                       + "".join(buf) + "</g>")
            buf.clear()

    for el in els:
        if is_cell(el):
            flush()
            b = box(el)
            scale = (b[0], b[1], b[2] / 100.0)
            out.append(el)
        elif is_shape(el):
            buf.append(el)
        else:
            flush()
            out.append(el)
    flush()
    out.append("</svg>")
    return "".join(out)


def main():
    changed = 0
    for bank in sorted(glob.glob(os.path.join(ROOT, "data/exams/**/question-001.json"), recursive=True)):
        if "figure-series" not in bank:
            continue
        rel = os.path.relpath(bank, os.path.join(ROOT, "data/exams"))[: -len("/question-001.json")]
        data = json.load(open(bank, encoding="utf-8"))
        page = os.path.join(ROOT, "exams", rel, "index.html")
        html = open(page, encoding="utf-8").read() if os.path.exists(page) else None
        n = 0
        for q in data:
            if not isinstance(q, dict):
                continue
            old = q.get("fig") or ""
            new = rebuild(old)
            if not new or new == old:
                continue
            q["fig"] = new
            if html is not None:
                if old not in html:
                    raise SystemExit(f"figure not found on page: {rel} {q.get('id')}")
                html = html.replace(old, new, 1)
            n += 1
        if n:
            changed += n
            print(f"  {n:4}  {rel}")
            if not DRY:
                json.dump(data, open(bank, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
                if html is not None:
                    open(page, "w", encoding="utf-8").write(html)
                    as_page = os.path.join(ROOT, "as", os.path.relpath(page, ROOT))
                    if os.path.exists(as_page):
                        main_re = re.compile(r"<main\b[^>]*>[\s\S]*?</main>")
                        en = open(page, encoding="utf-8").read()
                        tw = open(as_page, encoding="utf-8").read()
                        m_en, m_as = main_re.search(en), main_re.search(tw)
                        if m_en and m_as:
                            open(as_page, "w", encoding="utf-8").write(
                                tw[:m_as.start()] + m_en.group(0) + tw[m_as.end():])
    print(f"figures repaired: {changed}  ({'dry run' if DRY else 'applied'})")


if __name__ == "__main__":
    main()
