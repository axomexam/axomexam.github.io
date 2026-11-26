#!/usr/bin/env python3
"""Pattern completion: very hard bilingual 3x3 matrix questions with SVG tiles."""

import sys
sys.path.insert(0, "tools")
import nv_shapes as S
from nv_bank import append_nv

rows = []
AS = "০১২৩৪৫৬৭৮৯"


def A(n):
    return str(n).translate(str.maketrans("0123456789", AS))


SHAPES = {"triangle": 3, "square": 4, "pentagon": 5, "hexagon": 6}
NAMES = {"triangle": "ত্ৰিভুজ", "square": "বৰ্গ", "pentagon": "পঞ্চভুজ", "hexagon": "ষড়ভুজ"}
Q_EN = "Which option completes the pattern?"
Q_AS = "কোনটো বিকল্পই আৰ্হিটো সম্পূৰ্ণ কৰে?"


def tile(name, rot=0, shaded=False, dots=0):
    pts = [(26, 26), (74, 26), (74, 74), (26, 74)] if name == "square" else S.regular(SHAPES[name])
    body = S.rotate(S.poly(pts, shaded), rot)
    for i in range(dots):
        body += S.dot(34 + 16 * i, 78, 5)
    return body


def matrix(cells):
    parts = []
    for i, inner in enumerate(cells):
        r, c = divmod(i, 3)
        x, y = 2 + c * 32, 2 + r * 32
        if inner is None:
            parts.append(f'<rect x="{x}" y="{y}" width="30" height="30" fill="#f8fafc" '
                         f'stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="4 3"/>')
        else:
            parts.append(f'<rect x="{x}" y="{y}" width="30" height="30" fill="none" '
                         f'stroke="{S.LIGHT}" stroke-width="1.2"/>')
            parts.append(S.g(inner, f"translate({x} {y}) scale(0.3)"))
    return S.svg("".join(parts), 132)


def add(stem, stem_as, fig, ans_inner, wrongs, exp_en, exp_as):
    seen = [ans_inner]
    opts = [ans_inner]
    for w in wrongs:
        if w not in seen and len(opts) < 4:
            seen.append(w)
            opts.append(w)
    if len(opts) < 4:
        return
    rows.append({"stem": stem, "stem_as": stem_as, "fig": fig,
                 "options": [("", "", S.svg(o, 64)) for o in opts],
                 "correct": 0, "exp_en": exp_en, "exp_as": exp_as})


# ---- rule 1: the shape turns 90 degrees along each row ----------------
for name in ("triangle", "pentagon"):
    for blank in range(9):
        cc = blank % 3
        cells = [None if i == blank else tile(name, 90 * (i % 3)) for i in range(9)]
        ans = tile(name, 90 * cc)
        wrongs = [tile(name, 90 * ((cc + 1) % 4)), tile(name, 90 * ((cc + 2) % 4)),
                  tile(name, 90 * ((cc + 3) % 4))]
        add(Q_EN, Q_AS, matrix(cells), ans, wrongs,
            f"In every row the {name} turns 90 degrees clockwise from one column to the next, so the "
            f"missing cell holds it turned {90 * cc} degrees.",
            f"প্ৰতিটো শাৰীত {NAMES[name]} পৰৱৰ্তী ঘৰলৈ ৯০ ডিগ্ৰী ঘূৰে, সেয়ে অনুপস্থিত ঘৰত {A(90 * cc)} ডিগ্ৰী ঘূৰোৱা ৰূপটো থাকিব।")

# ---- rule 2: the number of dots grows along each row ------------------
for name in ("triangle", "square", "pentagon"):
    for blank in range(9):
        cc = blank % 3
        cells = [None if i == blank else tile(name, 0, False, i % 3 + 1) for i in range(9)]
        ans = tile(name, 0, False, cc + 1)
        others = [d for d in (1, 2, 3) if d != cc + 1]
        wrongs = [tile(name, 0, False, others[0]), tile(name, 0, False, others[1]),
                  tile("hexagon" if name != "hexagon" else "triangle", 0, False, cc + 1)]
        add(Q_EN, Q_AS, matrix(cells), ans, wrongs,
            f"The dots rise by one from left to right, so the missing cell needs {cc + 1} dots.",
            f"বাওঁৰপৰা সোঁলৈ টোপোলাৰ সংখ্যা এটাকৈ বাঢ়ে, সেয়ে অনুপস্থিত ঘৰত {A(cc + 1)} টা টোপোলা লাগে।")

# ---- rule 3: shading alternates like a chessboard ---------------------
for name in ("triangle", "pentagon", "hexagon"):
    for blank in range(9):
        r, c = divmod(blank, 3)
        cells = [None if i == blank else tile(name, 0, ((i // 3) + (i % 3)) % 2 == 1) for i in range(9)]
        shade = (r + c) % 2 == 1
        ans = tile(name, 0, shade)
        wrongs = [tile(name, 0, not shade), tile(name, 90, shade),
                  tile("square" if name != "square" else "hexagon", 0, shade)]
        add(Q_EN, Q_AS, matrix(cells), ans, wrongs,
            "Shaded and plain tiles alternate like a chessboard, so the missing cell takes the "
            f"{'shaded' if shade else 'plain'} form.",
            f"ৰঙীন আৰু ৰঙহীন ঘৰ দবা-পটীয়া ধৰণে সলনি হয়, সেয়ে অনুপস্থিত ঘৰত {'ৰঙীন' if shade else 'ৰঙহীন'} ৰূপটো থাকিব।")

# ---- rule 4: one more side in each column -----------------------------
ORDER = ["triangle", "square", "pentagon", "hexagon"]
for start in (0, 1):
    for blank in range(9):
        cc = blank % 3
        cells = [None if i == blank else tile(ORDER[(start + i % 3) % 4]) for i in range(9)]
        ans_name = ORDER[(start + cc) % 4]
        others = [ORDER[(start + cc + k) % 4] for k in (1, 2, 3)]
        add(Q_EN, Q_AS, matrix(cells), tile(ans_name), [tile(o) for o in others],
            f"Each column adds one side to the shape, so the missing cell is a {ans_name}.",
            f"প্ৰতিটো স্তম্ভত আকৃতিত এটা বাহু বাঢ়ে, সেয়ে অনুপস্থিত ঘৰত {NAMES[ans_name]} থাকিব।")

append_nv("pattern-completion", rows)
