#!/usr/bin/env python3
"""Counting of Figures: very hard bilingual questions with exact counts."""

import sys
sys.path.insert(0, "tools")
import nv_geom as G
import nv_shapes as S
from nv_bank import append_nv

AS = "০১২৩৪৫৬৭৮৯"


def A(n):
    return str(n).translate(str.maketrans("0123456789", AS))


rows = []

STEM = {
    "tri": ("How many triangles are there in the figure?",
            "চিত্ৰত মুঠ কিমানটা ত্ৰিভুজ আছে?"),
    "sq": ("How many squares are there in the figure?",
           "চিত্ৰত মুঠ কিমানটা বৰ্গ আছে?"),
    "rect": ("How many rectangles are there in the figure?",
             "চিত্ৰত মুঠ কিমানটা আয়ত আছে?"),
    "line": ("How many straight lines are there in the figure?",
             "চিত্ৰত মুঠ কিমানটা সৰলৰেখা আছে?"),
}


def add(kind, fig, answer, exp_en, exp_as, deltas=(1, -1, 2)):
    opts = [answer]
    for d in deltas:
        v = answer + d
        if v > 0 and v not in opts:
            opts.append(v)
    k = 3
    while len(opts) < 4:
        v = answer + k
        k += 1
        if v > 0 and v not in opts:
            opts.append(v)
    opts = opts[:4]
    q_en, q_as = STEM[kind]
    rows.append({
        "stem": q_en, "stem_as": q_as, "fig": G.draw(fig, 96),
        "options": [(str(o), A(o), "") for o in opts],
        "correct": 0, "exp_en": exp_en, "exp_as": exp_as,
    })


def grid(m, n, cell, diag=None):
    segs = []
    for i in range(m + 1):
        segs.append(((10 + i * cell, 10), (10 + i * cell, 10 + n * cell)))
    for j in range(n + 1):
        segs.append(((10, 10 + j * cell), (10 + m * cell, 10 + j * cell)))
    if diag == "one":
        for i in range(m):
            for j in range(n):
                segs.append(((10 + i * cell, 10 + j * cell),
                             (10 + (i + 1) * cell, 10 + (j + 1) * cell)))
    elif diag == "both":
        for i in range(m):
            for j in range(n):
                segs.append(((10 + i * cell, 10 + j * cell),
                             (10 + (i + 1) * cell, 10 + (j + 1) * cell)))
                segs.append(((10 + (i + 1) * cell, 10 + j * cell),
                             (10 + i * cell, 10 + (j + 1) * cell)))
    return segs


def fan(n):
    apex = (50, 12)
    xs = [10 + round(i * 80 / (n + 1)) for i in range(n + 2)]
    segs = [(apex, (xs[0], 90)), (apex, (xs[-1], 90)), ((xs[0], 90), (xs[-1], 90))]
    for x in xs[1:-1]:
        segs.append((apex, (x, 90)))
    return segs


def square_diag(mid=False):
    p = [(10, 10), (90, 10), (90, 90), (10, 90)]
    segs = [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), (p[1], p[3])]
    if mid:
        segs += [((50, 10), (50, 90)), ((10, 50), (90, 50))]
    return segs


def square_one_diag_mid():
    p = [(10, 10), (90, 10), (90, 90), (10, 90)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), ((50, 10), (50, 90)), ((10, 50), (90, 50))]


def rect_diag(w=100, h=60, mid=False):
    p = [(0, 20), (w, 20), (w, 20 + h), (0, 20 + h)]
    segs = [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), (p[1], p[3])]
    if mid:
        segs += [((w // 2, 20), (w // 2, 20 + h)), ((0, 20 + h // 2), (w, 20 + h // 2))]
    return segs


def rhombus():
    p = [(50, 8), (92, 50), (50, 92), (8, 50)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), (p[1], p[3])]


def trapezium():
    p = [(14, 16), (86, 16), (96, 88), (4, 88)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), (p[1], p[3])]


def house():
    p = [(20, 44), (80, 44), (80, 92), (20, 92)]
    segs = [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            ((20, 44), (50, 10)), ((50, 10), (80, 44)),
            (p[0], p[2]), (p[1], p[3])]
    return segs


def envelope():
    p = [(10, 26), (90, 26), (90, 88), (10, 88)]
    return [(p[0], p[1]), (p[1], p[2]), (p[2], p[3]), (p[3], p[0]),
            (p[0], p[2]), (p[1], p[3]),
            ((50, 26), (10, 88)), ((50, 26), (90, 88))]


def two_squares():
    a = [(10, 10), (62, 10), (62, 62), (10, 62)]
    b = [(40, 40), (92, 40), (92, 92), (40, 92)]
    segs = [(a[0], a[1]), (a[1], a[2]), (a[2], a[3]), (a[3], a[0])]
    segs += [(b[0], b[1]), (b[1], b[2]), (b[2], b[3]), (b[3], b[0])]
    return segs


# ---- fans -------------------------------------------------------------
for n in range(1, 9):
    f = fan(n)
    t = G.count_triangles(f)
    add("tri", f, t,
        f"The apex is joined to {n} point{'s' if n > 1 else ''} on the base, so the base "
        f"is cut into {n + 1} parts. Picking any two base points with the apex gives "
        f"{n + 1} + {n} + ... + 1 = {t} triangles.",
        f"শীৰ্ষবিন্দুৰপৰা ভূমিৰ {A(n)} টা বিন্দুলৈ ৰেখা টনা হৈছে, সেয়ে ভূমি {A(n + 1)} ভাগত বিভক্ত। "
        f"শীৰ্ষবিন্দুৰ সৈতে যিকোনো দুটা ভূমি-বিন্দু ল'লে {A(t)} টা ত্ৰিভুজ পোৱা যায়।")
    l = G.count_lines(f)
    add("line", f, l,
        f"There {'is' if n == 1 else 'are'} {n} line{'s' if n > 1 else ''} from the apex plus the two sides "
        f"and the base, so {l} straight lines.",
        f"শীৰ্ষবিন্দুৰপৰা {A(n)} টা ৰেখা, দুটা বাহু আৰু ভূমি লৈ মুঠ {A(l)} টা সৰলৰেখা।")

# ---- grids ------------------------------------------------------------
GRIDS = [(2, 2, 26), (2, 3, 26), (3, 3, 26), (2, 4, 20), (3, 4, 20),
         (4, 4, 20), (2, 5, 16), (3, 5, 16), (4, 5, 16), (1, 5, 16)]
for m, n, cell in GRIDS:
    g = grid(m, n, cell)
    sq = G.count_squares(g)
    rc = G.count_rectangles(g)
    parts = []
    for k in range(1, min(m, n) + 1):
        c = (m - k + 1) * (n - k + 1)
        if c:
            parts.append(f"{c} of {k}x{k}")
    add("sq", g, sq,
        "Count by size: " + ", ".join(parts) + f" = {sq} squares.",
        "আকাৰ অনুসৰি গণনা: " + ", ".join(
            A(int(p.split()[0])) + " টা " + A(int(p.split()[-1].split("x")[0])) + "×" +
            A(int(p.split()[-1].split("x")[1])) for p in parts) +
        f" = {A(sq)} টা বৰ্গ।")
    add("rect", g, rc,
        f"Choosing 2 of the {m + 1} vertical lines and 2 of the {n + 1} horizontal lines gives "
        f"{m + 1}C2 x {n + 1}C2 = {rc} rectangles.",
        f"{A(m + 1)} টা উলম্ব ৰেখাৰপৰা ২ টা আৰু {A(n + 1)} টা অনুভূমিক ৰেখাৰপৰা ২ টা বাছিলে "
        f"{A(rc)} টা আয়ত পোৱা যায়।")

for m, n, cell in [(2, 2, 26), (3, 3, 26), (2, 3, 26), (4, 4, 20)]:
    g = grid(m, n, cell)
    add("line", g, G.count_lines(g),
        f"The grid has {m + 1} vertical and {n + 1} horizontal lines, so {m + n + 2} straight lines.",
        f"গ্ৰিডত {A(m + 1)} টা উলম্ব আৰু {A(n + 1)} টা অনুভূমিক ৰেখা, সেয়ে {A(m + n + 2)} টা সৰলৰেখা।")

for m, n, cell, d in [(2, 2, 26, "both"), (3, 3, 26, "one"), (3, 3, 26, "both"), (3, 4, 20, "one")]:
    g = grid(m, n, cell, d)
    t = G.count_triangles(g)
    add("tri", g, t,
        f"Each of the {m * n} cells is cut by {'both diagonals' if d == 'both' else 'one diagonal'}, "
        f"and the diagonals also meet along the grid lines. Counting every size once gives {t} triangles.",
        f"{A(m * n)} টা কোঠাৰ প্ৰতিটো {'দুয়োখন কৰ্ণ' if d == 'both' else 'এখন কৰ্ণ'}ৰে কটা হৈছে; "
        f"প্ৰতিটো আকাৰ এবাৰ গণি মুঠ {A(t)} টা ত্ৰিভুজ পোৱা যায়।")

# ---- composite figures ------------------------------------------------
COMPOSITES = [
    (square_diag(), "square with both diagonals"),
    (square_diag(True), "square with both diagonals and both midlines"),
    (square_one_diag_mid(), "square with one diagonal and both midlines"),
    (rect_diag(), "rectangle with both diagonals"),
    (rect_diag(mid=True), "rectangle with both diagonals and both midlines"),
    (rhombus(), "rhombus with both diagonals"),
    (trapezium(), "trapezium with both diagonals"),
    (house(), "house shape with diagonals in the square"),
    (envelope(), "envelope with diagonals and a roof"),
    (two_squares(), "two overlapping squares"),
]
for fig, name in COMPOSITES:
    t = G.count_triangles(fig)
    add("tri", fig, t,
        f"In the {name}, every triangle formed by the drawn lines is counted once; the total is {t}.",
        f"{name} চিত্ৰত টনা ৰেখাৰে গঠিত প্ৰতিটো ত্ৰিভুজ এবাৰ গণি মুঠ {A(t)} টা পোৱা যায়।")
    sq = G.count_squares(fig)
    if sq >= 2:
        add("sq", fig, sq,
            f"The {name} contains {sq} squares of different sizes.",
            f"{name} চিত্ৰত ভিন্ন আকাৰৰ {A(sq)} টা বৰ্গ আছে।")
    rc = G.count_rectangles(fig)
    if rc >= 3:
        add("rect", fig, rc,
            f"The {name} contains {rc} rectangles when every size is counted.",
            f"{name} চিত্ৰত প্ৰতিটো আকাৰ গণি {A(rc)} টা আয়ত পোৱা যায়।")
    add("line", fig, G.count_lines(fig),
        f"The {name} is drawn with {G.count_lines(fig)} straight lines.",
        f"{name} চিত্ৰ {A(G.count_lines(fig))} টা সৰলৰেখাৰে অঁকা হৈছে।")

# ---- extra grids and fans ---------------------------------------------
for m, n, cell in [(1, 4, 20), (1, 6, 13), (2, 6, 13)]:
    g = grid(m, n, cell)
    sq = G.count_squares(g)
    rc = G.count_rectangles(g)
    add("sq", g, sq,
        f"A {m} by {n} grid holds {sq} squares of every size.",
        f"{A(m)} বাই {A(n)} গ্ৰিডত প্ৰতিটো আকাৰ লৈ {A(sq)} টা বৰ্গ আছে।")
    add("rect", g, rc,
        f"Choosing 2 of the {m + 1} vertical and 2 of the {n + 1} horizontal lines gives {rc} rectangles.",
        f"{A(m + 1)} টা উলম্ব আৰু {A(n + 1)} টা অনুভূমিক ৰেখাৰপৰা ২ টা ২ টাকৈ বাছিলে {A(rc)} টা আয়ত পোৱা যায়।")

for n in (9, 10):
    f = fan(n)
    add("tri", f, G.count_triangles(f),
        f"With {n} lines from the apex the base has {n + 2} points, and any two of them with the apex form a triangle.",
        f"শীৰ্ষবিন্দুৰপৰা {A(n)} টা ৰেখা থাকিলে ভূমিত {A(n + 2)} টা বিন্দু হয়; যিকোনো দুটা বিন্দু শীৰ্ষবিন্দুৰ সৈতে ল'লে ত্ৰিভুজ হয়।")

for m, n, cell, d in [(4, 4, 20, "one"), (2, 4, 20, "both"), (2, 5, 16, "one")]:
    g = grid(m, n, cell, d)
    add("tri", g, G.count_triangles(g),
        f"Each cell of the {m} by {n} grid carries {'both diagonals' if d == 'both' else 'one diagonal'}; "
        f"counted once per size the figure holds {G.count_triangles(g)} triangles.",
        f"{A(m)} বাই {A(n)} গ্ৰিডৰ প্ৰতিটো কোঠাত {'দুয়োখন কৰ্ণ' if d == 'both' else 'এখন কৰ্ণ'} আছে; "
        f"প্ৰতিটো আকাৰ এবাৰ গণি {A(G.count_triangles(g))} টা ত্ৰিভুজ পোৱা যায়।")


append_nv("counting-figures", rows)
