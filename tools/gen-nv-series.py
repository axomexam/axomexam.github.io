#!/usr/bin/env python3
"""Figure Series: 80+ very hard bilingual questions with SVG figures."""

import sys
sys.path.insert(0, "tools")
import nv_shapes as S
from nv_bank import append_nv

rows = []

FALLBACK = [S.sq(0), S.tri(0), S.starfig(0), S.hexa(0), S.diamond(0),
            S.circle_fig(0), S.arrow(0), S.flag(0), S.pent(0)]

Q = [("Which figure should replace the question mark?",
      "প্ৰশ্নবোধক চিহ্নৰ ঠাইত কোনটো চিত্ৰ আহিব?"),
     ("Which figure comes next in the series?",
      "শৃংখলাটোত ইয়াৰ পিছত কোনটো চিত্ৰ আহে?"),
     ("Select the figure that continues the series.",
      "শৃংখলাটো আগবঢ়াই নিয়া চিত্ৰটো বাছনি কৰা।"),
     ("Choose the missing figure of the series.",
      "শৃংখলাৰ নোহোৱা চিত্ৰটো বাছনি কৰা।"),
     ("What comes next in the given sequence?",
      "দিয়া ক্ৰমটোত ইয়াৰ পিছত কি আহে?"),
     ("Find the figure that fits the blank.",
      "খালী ঠাইত খাপ খোৱা চিত্ৰটো বিচাৰি উলিওৱা।")]

SHAPES = {
    "arrow": S.arrow,
    "flag": S.flag,
    "tee": S.tee,
    "star": S.starfig,
    "pentagon": S.pent,
    "hexagon": S.hexa,
    "triangle": S.tri,
    "square": S.sq,
    "diamond": S.diamond,
}
AS_NAME = {"arrow": "কাঁড়", "flag": "পতাকা", "tee": "টি", "star": "তৰা",
           "pentagon": "পঞ্চভুজ", "hexagon": "ষড়ভুজ", "triangle": "ত্ৰিভুজ",
           "square": "বৰ্গ", "diamond": "ৰম্বস"}


def add(seq, answer, dists, rule_en, rule_as, shape, i):
    q_en, q_as = Q[i % len(Q)]
    stem = f"{q_en}"
    stem_as = f"{q_as}"
    fig = S.row(seq)
    uniq = []
    for d in dists:
        if d != answer and d not in uniq:
            uniq.append(d)
    for fb in FALLBACK:
        if len(uniq) == 3:
            break
        if fb != answer and fb not in uniq:
            uniq.append(fb)
    options = [("", "", S.svg(answer))] + [("", "", S.svg(d)) for d in uniq[:3]]
    rows.append({"stem": stem, "stem_as": stem_as, "fig": fig,
                 "options": options,
                 "correct": 0,
                 "exp_en": rule_en, "exp_as": rule_as})


i = 0
# --- rotation by 90° clockwise / anticlockwise
for name in ["arrow", "flag", "tee", "star", "pentagon"]:
    f = SHAPES[name]
    for s in (0, 90, 180, 270):
        seq = [f(s), f(s + 90), f(s + 180)]
        add(seq, f(s + 270), [f(s), f(s + 90), f(s + 180)],
            f"The {name} turns 90° clockwise at every step, so the next figure is the third one turned another 90°.",
            f"{AS_NAME[name]} প্ৰতিটো পদত ৯০° ঘড়ীৰ দিশে ঘূৰে, সেয়ে পৰৱৰ্তী চিত্ৰটো তৃতীয়টোক আৰু ৯০° ঘূৰালে পোৱা যায়।",
            name, i)
        i += 1
        seq = [f(s), f(s - 90), f(s - 180)]
        add(seq, f(s - 270), [f(s), f(s - 90), f(s - 180)],
            f"The {name} turns 90° anticlockwise at every step, so the next figure is the third one turned another 90° anticlockwise.",
            f"{AS_NAME[name]} প্ৰতিটো পদত ৯০° ঘড়ীৰ বিপৰীত দিশে ঘূৰে, সেয়ে পৰৱৰ্তী চিত্ৰটো তৃতীয়টোক আৰু ৯০° সেই দিশে ঘূৰালে পোৱা যায়।",
            name, i)
        i += 1

# --- rotation by 45°
for name in ["star", "flag", "tee", "arrow"]:
    f = SHAPES[name]
    for s in (0, 45, 90, 135):
        seq = [f(s), f(s + 45), f(s + 90)]
        add(seq, f(s + 135), [f(s), f(s + 45), f(s + 90)],
            f"The {name} turns 45° clockwise at every step, so the next figure is turned a further 45°.",
            f"{AS_NAME[name]} প্ৰতিটো পদত ৪৫° ঘড়ীৰ দিশে ঘূৰে, সেয়ে পৰৱৰ্তী চিত্ৰটো আৰু ৪৫° ঘূৰোৱা।",
            name, i)
        i += 1

# --- dot moves clockwise round a fixed arrow
DOTS = [(70, 28), (70, 74), (30, 74), (30, 28)]
for s in range(4):
    seq = [S.poly(S.ARROW) + S.dot(*DOTS[(s + k) % 4]) for k in range(3)]
    ans = S.poly(S.ARROW) + S.dot(*DOTS[(s + 3) % 4])
    dists = [S.poly(S.ARROW) + S.dot(*DOTS[(s + k) % 4]) for k in range(3)]
    add(seq, ans, dists,
        "The arrow does not move; the dot shifts one corner clockwise at every step.",
        "কাঁড়টো নচলে; বিন্দুটো প্ৰতিটো পদত এটা কোণ ঘড়ীৰ দিশে আগবাঢ়ে।",
        "arrow", i)
    i += 1

# --- shading alternates
for name in ["square", "triangle", "pentagon", "hexagon"]:
    f = SHAPES[name]
    seq = [f(0, False), f(0, True), f(0, False)]
    add(seq, f(0, True), [f(0, False), f(90, True), f(0, False)],
        "The shading alternates at every step, so the fourth figure must be shaded.",
        "প্ৰতিটো পদত ছাঁয়া সলনি হয়, সেয়ে চতুৰ্থ চিত্ৰটো ছাঁয়াযুক্ত হ'ব।",
        name, i)
    i += 1

# --- number of sides increases by one
for a, b, c, d, e in [("triangle", "square", "pentagon", "hexagon", "heptagon"),
                      ("square", "pentagon", "hexagon", "heptagon", "octagon"),
                      ("pentagon", "hexagon", "heptagon", "octagon", "triangle")]:
    FA = {"triangle": S.tri, "square": S.sq, "pentagon": S.pent, "hexagon": S.hexa,
          "heptagon": S.hept, "octagon": S.octa}
    seq = [FA[a](0), FA[b](0), FA[c](0)]
    add(seq, FA[d](0), [FA[c](0), FA[b](0), FA[e](0)],
        "The number of sides increases by one at every step.",
        "প্ৰতিটো পদত বাহুৰ সংখ্যা এটাৰে বাঢ়ে।",
        a, i)
    i += 1

# --- two shapes alternate
for a, b in [("circle", "square"), ("diamond", "triangle"), ("star", "circle")]:
    FA = {"circle": S.circle_fig, "square": S.sq, "diamond": S.diamond,
          "triangle": S.tri, "star": S.starfig}
    seq = [FA[a](0), FA[b](0), FA[a](0)]
    add(seq, FA[b](0), [FA[a](0), FA[b](90), FA[b](0)],
        "The two figures alternate, so the missing figure is the second one again.",
        "দুটা চিত্ৰ পাল পাতি আহে, সেয়ে নোহোৱা চিত্ৰটো দ্বিতীয়টোৱেই।",
        a, i)
    i += 1

# --- extra 45° rotations for the higher polygons
for name in ["pentagon", "hexagon"]:
    f = SHAPES[name]
    for s in (0, 45, 90, 135):
        seq = [f(s), f(s + 45), f(s + 90)]
        add(seq, f(s + 135), [f(s), f(s + 45), f(s + 90)],
            f"The {name} turns 45° clockwise at every step, so the next figure is turned a further 45°.",
            f"{AS_NAME[name]} প্ৰতিটো পদত ৪৫° ঘড়ীৰ দিশে ঘূৰে, সেয়ে পৰৱৰ্তী চিত্ৰটো আৰু ৪৫° ঘূৰোৱা।",
            name, i)
        i += 1

# --- 45° anticlockwise
for name in ["star", "flag", "tee", "arrow"]:
    f = SHAPES[name]
    for s in (0, 45):
        seq = [f(s), f(s - 45), f(s - 90)]
        add(seq, f(s - 135), [f(s), f(s - 45), f(s - 90)],
            f"The {name} turns 45° anticlockwise at every step, so the next figure is turned a further 45° anticlockwise.",
            f"{AS_NAME[name]} প্ৰতিটো পদত ৪৫° ঘড়ীৰ বিপৰীত দিশে ঘূৰে, সেয়ে পৰৱৰ্তী চিত্ৰটো আৰু ৪৫° সেই দিশে ঘূৰোৱা।",
            name, i)
        i += 1

# --- dot moves clockwise round other shapes
for name in ["tee", "flag"]:
    f = SHAPES[name]
    base = SHAPES[name](0)
    for s in range(4):
        seq = [base + S.dot(*DOTS[(s + k) % 4]) for k in range(3)]
        ans = base + S.dot(*DOTS[(s + 3) % 4])
        dists = [base + S.dot(*DOTS[(s + k) % 4]) for k in range(3)]
        add(seq, ans, dists,
            "The shape stays fixed; the dot moves one corner clockwise at every step.",
            "চিত্ৰটো স্থিৰ থাকে; বিন্দুটো প্ৰতিটো পদত এটা কোণ ঘড়ীৰ দিশে আগবাঢ়ে।",
            name, i)
        i += 1

# --- shading alternates for more shapes
for name in ["diamond", "star"]:
    f = SHAPES[name]
    seq = [f(0, True), f(0, False), f(0, True)]
    add(seq, f(0, False), [f(0, True), f(90, False), f(0, True)],
        "The shading alternates at every step, so the fourth figure must be unshaded.",
        "প্ৰতিটো পদত ছাঁয়া সলনি হয়, সেয়ে চতুৰ্থ চিত্ৰটো ছাঁয়াবিহীন হ'ব।",
        name, i)
    i += 1

append_nv("figure-series", rows)
