#!/usr/bin/env python3
"""Embedded / hidden figures: very hard bilingual questions, SVG figures.

Every published answer is checked against the drawn segments, and every
distractor is checked to be absent, so no option can be defended as "also
there"."""

import sys
from itertools import combinations
sys.path.insert(0, "tools")
import nv_geom as G
import nv_shapes as S
from nv_bank import append_nv

rows = []

NAME = {
    "triangle": ("triangle", "ত্ৰিভুজ"),
    "square": ("square", "বৰ্গ"),
    "rectangle": ("rectangle", "আয়ত"),
    "rhombus": ("rhombus", "ৰম্বাছ"),
    "parallelogram": ("parallelogram", "সামান্তৰিক"),
    "trapezium": ("trapezium", "ট্ৰেপিজিয়াম"),
    "pentagon": ("pentagon", "পঞ্চভুজ"),
    "hexagon": ("hexagon", "ষড়ভুজ"),
}


def fit(pts):
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    w, h = max(xs) - min(xs), max(ys) - min(ys)
    s = 78.0 / max(w, h)
    ox = 50 - s * (max(xs) + min(xs)) / 2
    oy = 50 - s * (max(ys) + min(ys)) / 2
    return [(round(s * x + ox, 1), round(s * y + oy, 1)) for x, y in pts]


def shape_svg(pts, shade=False):
    return S.svg(S.poly(fit(pts), shade), 64)


def present(pts, segs):
    n = len(pts)
    return all(G.connected(pts[i], pts[(i + 1) % n], segs) for i in range(n))


def add(fig, answer, pool, want="embedded"):
    ans_pts, ans_name = answer
    opts = [(ans_name, ans_pts)]
    seen = {shape_svg(ans_pts)}
    for pts, nm in pool:
        sv = shape_svg(pts)
        if sv in seen:
            continue
        seen.add(sv)
        opts.append((nm, pts))
        if len(opts) == 4:
            break
    if len(opts) < 4:
        return False
    if want == "embedded":
        q_en = "Which of the following shapes is embedded in the given figure?"
        q_as = "দিয়া চিত্ৰত তলৰ কোনটো আকৃতি সন্নিহিত হৈ আছে?"
        exp_en = (f"The {NAME[ans_name][0]} is already drawn inside the figure; its sides lie on lines "
                  f"that the figure shows. The other three shapes would need lines that are not there.")
        exp_as = (f"{NAME[ans_name][1]} চিত্ৰৰ ভিতৰত ইতিমধ্যে অঁকা আছে; ইয়াৰ বাহুবোৰ চিত্ৰত থকা ৰেখাৰ ওপৰতে পৰে। "
                  f"বাকী তিনিটা আকৃতিৰ বাবে চিত্ৰত নথকা ৰেখাৰ প্ৰয়োজন।")
    else:
        q_en = "Which of the following shapes is NOT embedded in the given figure?"
        q_as = "দিয়া চিত্ৰত তলৰ কোনটো আকৃতি সন্নিহিত নহয়?"
        exp_en = (f"The other three shapes are drawn inside the figure, but the {NAME[ans_name][0]} is not: "
                  f"the figure has no lines that would complete it.")
        exp_as = (f"বাকী তিনিটা আকৃতি চিত্ৰৰ ভিতৰত আছে, কিন্তু {NAME[ans_name][1]} নাই — "
                  f"চিত্ৰত ইয়াক সম্পূৰ্ণ কৰা ৰেখা নাই।")
    rows.append({
        "stem": q_en, "stem_as": q_as, "fig": G.draw(fig, 96),
        "options": [(n, "", shape_svg(p)) for n, p in opts],
        "correct": 0, "exp_en": exp_en, "exp_as": exp_as,
    })
    return True


def grid(m, n, cell, diag=None):
    segs = []
    for i in range(m + 1):
        segs.append(((10 + i * cell, 10), (10 + i * cell, 10 + n * cell)))
    for j in range(n + 1):
        segs.append(((10, 10 + j * cell), (10 + m * cell, 10 + j * cell)))
    if diag == "one":
        for i in range(m):
            for j in range(n):
                segs.append(((10 + i * cell, 10 + j * cell), (10 + (i + 1) * cell, 10 + (j + 1) * cell)))
    elif diag == "both":
        for i in range(m):
            for j in range(n):
                segs.append(((10 + i * cell, 10 + j * cell), (10 + (i + 1) * cell, 10 + (j + 1) * cell)))
                segs.append(((10 + (i + 1) * cell, 10 + j * cell), (10 + i * cell, 10 + (j + 1) * cell)))
    return segs


def sq_fig():
    p = [(10, 10), (90, 10), (90, 90), (10, 90)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), (p[1], p[3])]


def sq_mid_fig():
    p = [(10, 10), (90, 10), (90, 90), (10, 90)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), (p[1], p[3]), ((50, 10), (50, 90)), ((10, 50), (90, 50))]


def sq_diamond_fig():
    p = [(10, 10), (90, 10), (90, 90), (10, 90)]
    d = [(50, 10), (90, 50), (50, 90), (10, 50)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (d[0], d[1]), (d[1], d[2]), (d[2], d[3]), (d[3], d[0])]


def hex_fig():
    h = [(50, 8), (88, 30), (88, 70), (50, 92), (12, 70), (12, 30)]
    segs = [(h[i], h[(i + 1) % 6]) for i in range(6)]
    segs += [((50, 8), (50, 92)), ((88, 30), (12, 70)), ((88, 70), (12, 30))]
    return segs


def house_fig():
    p = [(20, 44), (80, 44), (80, 92), (20, 92)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            ((20, 44), (50, 10)), ((50, 10), (80, 44)), (p[0], p[2]), (p[1], p[3])]


def two_sq_fig():
    a = [(10, 10), (62, 10), (62, 62), (10, 62)]
    b = [(40, 40), (92, 40), (92, 92), (40, 92)]
    segs = [(a[0], a[1]), (a[1], a[2]), (a[2], a[3]), (a[3], a[0])]
    segs += [(b[0], b[1]), (b[1], b[2]), (b[2], b[3]), (b[3], b[0])]
    return segs


def rhombus_fig():
    p = [(50, 8), (92, 50), (50, 92), (8, 50)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            ((50, 8), (50, 92)), ((8, 50), (92, 50))]


def rect_fig():
    p = [(0, 20), (100, 20), (100, 80), (0, 80)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), (p[1], p[3]), ((50, 20), (50, 80)), ((0, 50), (100, 50))]


def trap_fig():
    p = [(14, 16), (86, 16), (96, 88), (4, 88)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), (p[1], p[3])]


def kite_fig():
    p = [(50, 6), (78, 50), (50, 94), (22, 50)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), (p[1], p[3])]


PENT = [(50, 10), (90, 40), (74, 92), (26, 92), (10, 40)]
PARA = [(18, 30), (58, 30), (82, 72), (42, 72)]
HEX = [(50, 8), (88, 30), (88, 70), (50, 92), (12, 70), (12, 30)]
RHOMB = [(50, 8), (92, 50), (50, 92), (8, 50)]
DIAMOND = [(50, 10), (90, 50), (50, 90), (10, 50)]
SQUARE = [(10, 10), (90, 10), (90, 90), (10, 90)]
SMALLSQ = [(10, 10), (50, 10), (50, 50), (10, 50)]
TRI = [(10, 10), (90, 10), (90, 90)]
TRI2 = [(10, 10), (50, 50), (90, 10)]
RECT = [(10, 10), (90, 10), (90, 50), (10, 50)]
TRAP = [(20, 20), (80, 20), (95, 80), (5, 80)]

FIGURES = [
    ("square with diagonals", sq_fig(),
     [("triangle", TRI), ("triangle", TRI2), ("square", SQUARE)],
     [("rhombus", DIAMOND), ("pentagon", PENT), ("rectangle", RECT), ("hexagon", HEX)]),
    ("square with diagonals and midlines", sq_mid_fig(),
     [("square", SMALLSQ), ("rectangle", [(10, 10), (50, 10), (50, 90), (10, 90)]),
      ("triangle", [(10, 10), (50, 50), (10, 90)])],
     [("rhombus", DIAMOND), ("pentagon", PENT), ("hexagon", HEX)]),
    ("square with an inscribed diamond", sq_diamond_fig(),
     [("rhombus", DIAMOND), ("triangle", [(10, 10), (50, 10), (10, 50)]),
      ("square", SQUARE)],
     [("pentagon", PENT), ("hexagon", HEX), ("trapezium", TRAP)]),
    ("3 by 3 grid", grid(3, 3, 26),
     [("square", [(10, 10), (36, 10), (36, 36), (10, 36)]),
      ("square", [(10, 10), (62, 10), (62, 62), (10, 62)]),
      ("rectangle", [(10, 10), (36, 10), (36, 62), (10, 62)])],
     [("triangle", [(10, 10), (88, 10), (88, 88)]), ("pentagon", PENT), ("hexagon", HEX)]),
    ("3 by 3 grid with a diagonal in every cell", grid(3, 3, 26, "one"),
     [("triangle", [(10, 10), (36, 10), (36, 36)]),
      ("square", [(10, 10), (36, 10), (36, 36), (10, 36)]),
      ("trapezium", [(36, 10), (88, 10), (88, 36), (36, 36)])],
     [("pentagon", PENT), ("hexagon", HEX), ("rhombus", DIAMOND)]),
    ("4 by 4 grid", grid(4, 4, 20),
     [("square", [(10, 10), (30, 10), (30, 30), (10, 30)]),
      ("square", [(10, 10), (50, 10), (50, 50), (10, 50)]),
      ("rectangle", [(10, 10), (30, 10), (30, 70), (10, 70)])],
     [("triangle", [(10, 10), (90, 10), (90, 90)]), ("pentagon", PENT), ("hexagon", HEX)]),
    ("2 by 3 grid", grid(2, 3, 26),
     [("square", [(10, 10), (36, 10), (36, 36), (10, 36)]),
      ("rectangle", [(10, 10), (62, 10), (62, 36), (10, 36)]),
      ("square", [(10, 10), (62, 10), (62, 62), (10, 62)])],
     [("triangle", [(10, 10), (62, 10), (62, 62)]), ("rhombus", DIAMOND), ("hexagon", HEX)]),
    ("hexagon with its three main diagonals", hex_fig(),
     [("triangle", [(50, 8), (88, 30), (50, 50)]),
      ("rhombus", [(50, 8), (88, 30), (50, 50), (12, 30)]),
      ("triangle", [(50, 8), (50, 92), (88, 30)])],
     [("square", SQUARE), ("rectangle", RECT), ("pentagon", PENT)]),
    ("house with diagonals", house_fig(),
     [("square", [(20, 44), (80, 44), (80, 92), (20, 92)]),
      ("pentagon", [(20, 92), (80, 92), (80, 44), (50, 10), (20, 44)]),
      ("triangle", [(20, 44), (50, 10), (80, 44)])],
     [("rhombus", DIAMOND), ("hexagon", HEX), ("trapezium", TRAP)]),
    ("two overlapping squares", two_sq_fig(),
     [("square", [(10, 10), (62, 10), (62, 62), (10, 62)]),
      ("square", [(40, 40), (62, 40), (62, 62), (40, 62)]),
      ("rectangle", [(10, 10), (62, 10), (62, 40), (10, 40)])],
     [("triangle", TRI), ("pentagon", PENT), ("hexagon", HEX)]),
    ("rhombus with both diagonals", rhombus_fig(),
     [("rhombus", RHOMB), ("triangle", [(50, 8), (92, 50), (50, 50)]),
      ("triangle", [(8, 50), (50, 8), (50, 50)])],
     [("square", SQUARE), ("rectangle", RECT), ("pentagon", PENT)]),
    ("rectangle with diagonals and midlines", rect_fig(),
     [("rectangle", [(0, 20), (50, 20), (50, 50), (0, 50)]),
      ("triangle", [(0, 20), (50, 50), (0, 80)]),
      ("square", [(25, 20), (50, 20), (50, 50), (25, 50)])],
     [("rhombus", DIAMOND), ("pentagon", PENT), ("hexagon", HEX)]),
    ("trapezium with both diagonals", trap_fig(),
     [("trapezium", [(14, 16), (86, 16), (96, 88), (4, 88)]),
      ("triangle", [(14, 16), (86, 16), (50, 52)]),
      ("triangle", [(4, 88), (96, 88), (50, 52)])],
     [("square", SQUARE), ("rhombus", DIAMOND), ("hexagon", HEX)]),
    ("kite with both diagonals", kite_fig(),
     [("triangle", [(50, 6), (78, 50), (50, 50)]),
      ("triangle", [(22, 50), (50, 6), (50, 50)]),
      ("rhombus", [(50, 6), (78, 50), (50, 94), (22, 50)])],
     [("square", SQUARE), ("rectangle", RECT), ("pentagon", PENT)]),
    ("square with one diagonal", [((10, 10), (90, 10)), ((90, 10), (90, 90)),
                                  ((90, 90), (10, 90)), ((10, 90), (10, 10)),
                                  ((10, 10), (90, 90))],
     [("triangle", [(10, 10), (90, 10), (90, 90)]), ("triangle", [(10, 10), (90, 90), (10, 90)]),
      ("square", SQUARE)],
     [("rhombus", DIAMOND), ("pentagon", PENT), ("rectangle", RECT), ("hexagon", HEX)]),
    ("2 by 2 grid with both diagonals in every cell", grid(2, 2, 30, "both"),
     [("triangle", [(10, 10), (40, 10), (40, 40)]),
      ("square", [(10, 10), (40, 10), (40, 40), (10, 40)]),
      ("rhombus", [(40, 10), (70, 40), (40, 70), (10, 40)])],
     [("pentagon", PENT), ("hexagon", HEX), ("trapezium", TRAP)]),
    ("2 by 2 grid with one diagonal in every cell", grid(2, 2, 30, "one"),
     [("triangle", [(10, 10), (40, 10), (40, 40)]),
      ("square", [(10, 10), (40, 10), (40, 40), (10, 40)]),
      ("trapezium", [(40, 10), (70, 10), (70, 40), (40, 40)])],
     [("pentagon", PENT), ("hexagon", HEX), ("rhombus", DIAMOND)]),
    ("2 by 4 grid", grid(2, 4, 20),
     [("square", [(10, 10), (30, 10), (30, 30), (10, 30)]),
      ("rectangle", [(10, 10), (70, 10), (70, 30), (10, 30)]),
      ("square", [(10, 10), (50, 10), (50, 50), (10, 50)])],
     [("triangle", [(10, 10), (70, 10), (70, 90)]), ("pentagon", PENT), ("hexagon", HEX)]),
    ("square with both midlines only", [((10, 10), (90, 10)), ((90, 10), (90, 90)),
                                        ((90, 90), (10, 90)), ((10, 90), (10, 10)),
                                        ((50, 10), (50, 90)), ((10, 50), (90, 50))],
     [("square", [(10, 10), (50, 10), (50, 50), (10, 50)]),
      ("rectangle", [(10, 10), (50, 10), (50, 90), (10, 90)]),
      ("square", [(10, 10), (90, 10), (90, 90), (10, 90)])],
     [("triangle", [(10, 10), (90, 10), (90, 90)]), ("rhombus", DIAMOND), ("pentagon", PENT)]),
    ("bow tie of two triangles", [((10, 20), (90, 20)), ((90, 20), (50, 50)), ((50, 50), (10, 20)),
                                  ((10, 80), (90, 80)), ((90, 80), (50, 50)), ((50, 50), (10, 80))],
     [("triangle", [(10, 20), (90, 20), (50, 50)]),
      ("triangle", [(10, 80), (90, 80), (50, 50)]),
      ("rhombus", [(50, 50), (90, 20), (50, 20), (10, 50)])],
     [("square", SQUARE), ("hexagon", HEX), ("pentagon", PENT)]),
]

for name, segs, cand_present, cand_absent in FIGURES:
    pres = [(pts, nm) for nm, pts in cand_present if present(pts, segs)]
    pool = cand_absent + [("pentagon", PENT), ("hexagon", HEX), ("trapezium", TRAP),
                          ("parallelogram", PARA), ("rhombus", DIAMOND), ("rectangle", RECT),
                          ("square", SQUARE), ("triangle", TRI)]
    absent = [(pts, nm) for nm, pts in pool if not present(pts, segs)]
    if not pres or len(absent) < 3:
        print("skip", name, len(pres), len(absent))
        continue
    combos = list(combinations(absent, 3))[:4]
    for k in range(min(3, len(pres))):
        for combo in combos:
            add(segs, pres[k], list(combo), "embedded")
    add(segs, absent[0], pres, "not")

append_nv("embedded-figures", rows)
