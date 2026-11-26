#!/usr/bin/env python3
"""General Non-Verbal Reasoning (mixed practice): 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
import nv_geom as G
import nv_shapes as S
from nv_bank import append_nv

AS = "০১২৩৪৫৬৭৮৯"
def A(n):
    return str(n).translate(str.maketrans("0123456789", AS))

rows = []


def add(stem, stem_as, fig, options, exp_en, exp_as):
    rows.append({"stem": stem, "stem_as": stem_as, "fig": fig, "options": options,
                 "correct": 0, "exp_en": exp_en, "exp_as": exp_as})


def fig_opts(ans, wrongs, size=64):
    return [("", "", S.svg(ans, size))] + [("", "", S.svg(w, size)) for w in wrongs]


CORNERS = [(70, 26), (70, 74), (30, 74), (30, 26)]
SHAPES = [(S.ARROW, "arrow", "কাঁড়"), (S.FLAG, "flag", "পতাকা"), (S.TEE, "T-shape", "টি-আকৃতি"),
          (S.F_SHAPE, "F-shape", "F আকৃতি")]

# ---------------- series: turn of 45 degrees ----------------
for si, (base, name, as_name) in enumerate(SHAPES):
    for start in (0, 45):
        seq = [S.rotate(S.poly(base), start + 45 * i) for i in range(4)]
        ans = S.rotate(S.poly(base), start + 45 * 4)
        wrongs = [S.rotate(S.poly(base), start + 45 * 5),
                  S.mirror(S.rotate(S.poly(base), start + 45 * 4)),
                  S.rotate(S.poly(base), start + 45 * 3)]
        add(f"Study the series of the {name}. Which figure comes next?",
            f"{as_name} ৰ শৃংখলাটো চাওক। পৰৱৰ্তী চিত্ৰটো কোনটো?",
            S.row(seq), fig_opts(ans, wrongs),
            "Each figure turns 45 degrees clockwise, so the fifth figure is the fourth turned once more.",
            "প্ৰতিটো চিত্ৰ ৪৫ ডিগ্ৰী ঘড়ীৰ দিশে ঘূৰে, সেয়ে পঞ্চম চিত্ৰটো চতুৰ্থটোৰ পৰা আৰু এপদ আগবঢ়োৱা ৰূপ।")

# ---------------- analogy ----------------
for si, (base, name, as_name) in enumerate(SHAPES):
    a = S.poly(base) + S.dot(*CORNERS[si])
    b = S.rotate(a, 90)
    c = S.rotate(a, 180)
    ans = S.rotate(c, 90)
    wrongs = [S.rotate(c, -90), S.mirror(c), S.rotate(a, 90)]
    add(f"In the analogy, the second {name} is the first turned 90 degrees. Which figure completes the pair?",
        f"সাদৃশ্যত দ্বিতীয় {as_name} প্ৰথমটোক ৯০ ডিগ্ৰী ঘূৰাই পোৱা ৰূপ। যোৰটো সম্পূৰ্ণ কৰা চিত্ৰ কোনটো?",
        S.row([a, b, c], sep="&#8759;"),
        fig_opts(ans, wrongs),
        "The rule is a quarter turn clockwise, so the fourth figure is the third turned 90 degrees.",
        "নিয়মটো হ'ল ঘড়ীৰ দিশে চতুৰ্থাংশ ঘূৰণ, সেয়ে চতুৰ্থ চিত্ৰটো তৃতীয়টোক ৯০ ডিগ্ৰী ঘূৰাই পোৱা ৰূপ।")

# ---------------- odd one out by side count ----------------
SIDES = [(S.regular(3), "triangle", "ত্ৰিভুজ"), (S.regular(4), "square", "বৰ্গ"),
         (S.regular(5), "pentagon", "পঞ্চভুজ"), (S.regular(6), "hexagon", "ষড়ভুজ"),
         (S.regular(7), "heptagon", "সপ্তভুজ")]
for i in range(len(SIDES)):
    odd = SIDES[i]
    same = [SIDES[(i + 1) % 5], SIDES[(i + 2) % 5], SIDES[(i + 3) % 5]]
    opts = [("", "", S.svg(S.poly(odd[0]), 64))] + [("", "", S.svg(S.poly(s[0]), 64)) for s in same[:3]]
    add("Which figure is the odd one out?",
        "কোনটো চিত্ৰ আঁতৰ বস্তু?",
        S.svg("", 1), opts,
        f"Three options have the same number of sides; the {odd[1]} has {len(odd[0])} and does not match them.",
        f"তিনিটা বিকল্পত একে সংখ্যক বাহু আছে; {odd[2]} ত {A(len(odd[0]))} টা বাহু, সেয়ে ই মিলি নাযায়।")

# ---------------- classification: dot inside ----------------
for i, (base, name, as_name) in enumerate(SHAPES):
    with_dot = [S.poly(base) + S.dot(50, 52), S.poly(S.TRI) + S.dot(50, 62), S.poly(S.DIAMOND) + S.dot(50, 52)]
    without = [S.poly(S.regular(6)), S.poly(S.regular(5)), S.poly(S.regular(8))]
    opts = [("", "", S.svg(with_dot[0], 64)), ("", "", S.svg(with_dot[1], 64)),
            ("", "", S.svg(without[0], 64)), ("", "", S.svg(with_dot[2], 64))]
    add("Three of these figures share a common feature. Which one does not belong with them?",
        "এই তিনিটা চিত্ৰৰ এটা সাধাৰণ গুণ আছে। কোনটোৱে তেওঁলোকৰ লগত নিমিলে?",
        S.svg("", 1), opts,
        "Three figures carry a dot inside; the hexagon has none, so it is the odd one.",
        "তিনিটা চিত্ৰৰ ভিতৰত টোপোলা আছে; ষড়ভুজত নাই, সেয়ে ই আঁতৰ বস্তু।")

# ---------------- water image ----------------
for i, (base, name, as_name) in enumerate(SHAPES):
    inner = S.poly(base) + S.dot(*CORNERS[i])
    ans = S.water(inner)
    wrongs = [S.mirror(inner), S.rotate(inner, 180), inner]
    add(f"Which option is the correct water image of the given {name}?",
        f"দিয়া {as_name} ৰ শুদ্ধ পানীৰ প্ৰতিবিম্ব কোনটো?",
        S.svg(inner, 72), fig_opts(ans, wrongs),
        "A water image flips the figure top to bottom, keeping left and right unchanged.",
        "পানীৰ প্ৰতিবিম্বত চিত্ৰ ওপৰ-তল সলনি হয়, বাওঁ-সোঁ একে থাকে।")

# ---------------- mirror image ----------------
for i, (base, name, as_name) in enumerate(SHAPES):
    inner = S.poly(base) + S.dot(*CORNERS[(i + 1) % 4])
    ans = S.mirror(inner)
    wrongs = [S.water(inner), S.rotate(inner, 90), inner]
    add(f"Which option is the correct mirror image of the given {name} in a vertical mirror?",
        f"উলম্ব দাপোণত দিয়া {as_name} ৰ শুদ্ধ প্ৰতিবিম্ব কোনটো?",
        S.svg(inner, 72), fig_opts(ans, wrongs),
        "A vertical mirror swaps left and right and leaves top and bottom unchanged.",
        "উলম্ব দাপোণে বাওঁ-সোঁ সলনি কৰে, ওপৰ-তল একে থাকে।")

# ---------------- counting in a grid ----------------
def grid(m, n, cell, diag=None):
    segs = []
    for i in range(m + 1):
        segs.append(((6 + i * cell, 6), (6 + i * cell, 6 + n * cell)))
    for j in range(n + 1):
        segs.append(((6, 6 + j * cell), (6 + m * cell, 6 + j * cell)))
    if diag:
        for i in range(m):
            for j in range(n):
                segs.append(((6 + i * cell, 6 + j * cell), (6 + (i + 1) * cell, 6 + (j + 1) * cell)))
    return segs


for m, n, cell in [(2, 2, 30), (3, 3, 22), (2, 3, 24)]:
    g = grid(m, n, cell)
    sq = G.count_squares(g)
    rc = G.count_rectangles(g)
    add("How many squares can you count in the figure?",
        "চিত্ৰত কিমানটা বৰ্গ গণি পোৱা যায়?",
        G.draw(g, 96),
        [(str(sq), A(sq), "")] + [(str(v), A(v), "") for v in (sq + 1, sq - 1, sq + 2)],
        f"Counting by size in the {m} by {n} grid gives {sq} squares.",
        f"{A(m)} বাই {A(n)} গ্ৰিডত আকাৰ অনুসৰি গণনা কৰিলে {A(sq)} টা বৰ্গ পোৱা যায়।")
    add("How many rectangles can you count in the figure?",
        "চিত্ৰত কিমানটা আয়ত গণি পোৱা যায়?",
        G.draw(g, 96),
        [(str(rc), A(rc), "")] + [(str(v), A(v), "") for v in (rc + 2, rc - 2, rc + 4)],
        f"Choosing two of the {m + 1} vertical and two of the {n + 1} horizontal lines gives {rc} rectangles.",
        f"{A(m + 1)} টা উলম্ব আৰু {A(n + 1)} টা অনুলম্ব ৰেখাৰপৰা দুটা দুটা বাছিলে {A(rc)} টা আয়ত পোৱা যায়।")

# ---------------- symmetry quick check ----------------
for name, inner, n, as_name in [("equilateral triangle", S.poly(S.regular(3)), 3, "ত্ৰিভুজ"),
                                ("regular hexagon", S.poly(S.regular(6)), 6, "ষড়ভুজ"),
                                ("square", S.poly([(24, 24), (76, 24), (76, 76), (24, 76)]), 4, "বৰ্গ")]:
    add(f"How many lines of symmetry does the {name} have?",
        f"{as_name} ৰ কিমানডাল প্ৰতিসম ৰেখা আছে?",
        S.svg(inner, 80),
        [(str(n), A(n), "")] + [(str(v), A(v), "") for v in (n + 1, n - 1, n + 2)],
        f"A regular {name} has {n} lines of symmetry.",
        f"{as_name} ৰ {A(n)} ডাল প্ৰতিসম ৰেখা আছে।")

# ---------------- dice ----------------
for v in (1, 2, 3, 4, 5, 6):
    opp = 7 - v
    others = [x for x in range(1, 7) if x not in (v, opp)]
    add(f"On a standard die, the number opposite the face showing {v} is",
        f"প্ৰামাণ্য লুডুত {A(v)} দেখুওৱা পিঠিৰ বিপৰীত সংখ্যা",
        S.svg("", 1),
        [(str(opp), A(opp), "")] + [(str(x), A(x), "") for x in others[:3]],
        f"Opposite faces of a standard die add up to 7, so the answer is 7 - {v} = {opp}.",
        f"প্ৰামাণ্য লুডুত বিপৰীত পিঠিৰ যোগফল ৭, সেয়ে ৭ - {A(v)} = {A(opp)}।")

# ---------------- series: quarter turns ----------------
for si, (base, name, as_name) in enumerate(SHAPES):
    seq = [S.rotate(S.poly(base), 90 * i) for i in range(4)]
    ans = S.rotate(S.poly(base), 90 * 4)
    wrongs = [S.rotate(S.poly(base), 90 * 5), S.mirror(S.poly(base)), S.rotate(S.poly(base), 90 * 3)]
    add(f"Which figure continues the series of the {name}?",
        f"{as_name} ৰ শৃংখলা কোনটো চিত্ৰই আগবঢ়াই নিব?",
        S.row(seq), fig_opts(ans, wrongs),
        "Every step is a quarter turn, so the next figure is the first one again.",
        "প্ৰতিটো পদত চতুৰ্থাংশ ঘূৰণ হয়, সেয়ে পৰৱৰ্তী চিত্ৰ পুনৰ প্ৰথমটোৰ দৰেই হয়।")

# ---------------- series: growing dots ----------------
for base, name, as_name in [(S.poly(S.regular(3)), "triangle", "ত্ৰিভুজ"),
                            (S.poly(S.regular(4)), "square", "বৰ্গ")]:
    seq = [base + "".join(S.dot(24 + 13 * k, 78, 5) for k in range(n)) for n in (1, 2, 3, 4)]
    ans = base + "".join(S.dot(24 + 13 * k, 78, 5) for k in range(5))
    wrongs = [base + "".join(S.dot(24 + 13 * k, 78, 5) for k in range(3)),
              base + "".join(S.dot(24 + 13 * k, 78, 5) for k in range(4)),
              S.poly(S.regular(5)) + "".join(S.dot(24 + 13 * k, 78, 5) for k in range(5))]
    add(f"Study the series of the {name}. Which figure comes next?",
        f"{as_name} ৰ শৃংখলাটো চাওক। পৰৱৰ্তী চিত্ৰটো কোনটো?",
        S.row(seq), fig_opts(ans, wrongs),
        "One dot is added at every step, so the fifth figure carries five dots.",
        "প্ৰতিটো পদত এটা টোপোলা বাঢ়ে, সেয়ে পঞ্চম চিত্ৰত পাঁচটা টোপোলা থাকিব।")

# ---------------- water and mirror, more shapes ----------------
MORE = [(S.poly(S.regular(5)), "pentagon", "পঞ্চভুজ"), (S.poly(S.star()), "star", "তৰা"),
        (S.poly(S.regular(6)), "hexagon", "ষড়ভুজ")]
for i, (inner, name, as_name) in enumerate(MORE):
    marked = inner + S.dot(*CORNERS[i])
    add(f"Which option is the correct water image of the given {name}?",
        f"দিয়া {as_name} ৰ শুদ্ধ পানীৰ প্ৰতিবিম্ব কোনটো?",
        S.svg(marked, 72),
        fig_opts(S.water(marked), [S.mirror(marked), S.rotate(marked, 180), marked]),
        "The water image is the top-to-bottom flip of the figure.",
        "পানীৰ প্ৰতিবিম্ব হ'ল চিত্ৰৰ ওপৰ-তল ওলোটা ৰূপ।")
    add(f"Which option is the correct mirror image of the given {name}?",
        f"দিয়া {as_name} ৰ শুদ্ধ দাপোণৰ প্ৰতিবিম্ব কোনটো?",
        S.svg(marked, 72),
        fig_opts(S.mirror(marked), [S.water(marked), S.rotate(marked, 90), marked]),
        "A vertical mirror swaps left and right only.",
        "উলম্ব দাপোণে কেৱল বাওঁ-সোঁ সলনি কৰে।")

# ---------------- counting with diagonals ----------------
for m, n, cell in [(2, 2, 30), (3, 2, 24)]:
    g = grid(m, n, cell, diag=True)
    t = G.count_triangles(g)
    add("How many triangles are there in the figure?",
        "চিত্ৰত কিমানটা ত্ৰিভুজ আছে?",
        G.draw(g, 96),
        [(str(t), A(t), "")] + [(str(v), A(v), "") for v in (t + 2, t - 2, t + 4)],
        f"Each cell carries a diagonal and the diagonals also meet the grid lines, giving {t} triangles.",
        f"প্ৰতিটো কোঠাত এটা কৰ্ণ আছে আৰু কৰ্ণবোৰ গ্ৰিড ৰেখাৰ সৈতে মিলি {A(t)} টা ত্ৰিভুজ দিয়ে।")

# ---------------- embedded quick check ----------------
SQ = [(12, 12), (88, 12), (88, 88), (12, 88)]
EMB = [(SQ[0], SQ[1]), (SQ[1], SQ[2]), (SQ[2], SQ[3]), (SQ[3], SQ[0]),
       (SQ[0], SQ[2]), (SQ[1], SQ[3]), ((50, 12), (50, 88))]
for i in range(3):
    opts = [("", "", S.svg(S.poly([(12, 12), (50, 12), (50, 50), (12, 50)]), 64)),
            ("", "", S.svg(S.poly(S.regular(5)), 64)),
            ("", "", S.svg(S.poly(S.regular(6)), 64)),
            ("", "", S.svg(S.poly(S.regular(7)), 64))]
    add("Which shape is hidden inside the figure?",
        "চিত্ৰটোৰ ভিতৰত কোনটো আকৃতি লুকাই আছে?",
        G.draw(EMB, 96), opts,
        "The figure already contains a small square in its top-left corner; no pentagon, hexagon or heptagon is drawn.",
        "চিত্ৰটোৰ ওপৰ-বাওঁ কোণত সৰু বৰ্গ ইতিমধ্যে আছে; পঞ্চভুজ, ষড়ভুজ বা সপ্তভুজ অঁকা নাই।")

# ---------------- odd one out by shading ----------------
for i, (base, name, as_name) in enumerate(SHAPES):
    others = [b for j, (b, _, _) in enumerate(SHAPES) if j != i]
    opts = [("", "", S.svg(S.poly(base), 64))]
    for b in others:
        opts.append(("", "", S.svg(S.poly(b, True), 64)))
    add("Three figures are shaded and one is not. Which figure is different?",
        "তিনিটা চিত্ৰ ৰঙীন আৰু এটা ৰঙহীন। কোনটো চিত্ৰ বেলেগ?",
        S.svg("", 1), opts,
        "Only the unshaded figure is different; the other three are filled in.",
        "কেৱল ৰঙহীন চিত্ৰটো বেলেগ; বাকী তিনিটা ৰঙেৰে ভৰা।")

# ---------------- rotation by 180 ----------------
for i, (base, name, as_name) in enumerate(SHAPES):
    inner = S.poly(base) + S.dot(*CORNERS[i])
    add(f"Which option shows the given {name} rotated through 180 degrees?",
        f"দিয়া {as_name} ক ১৮০ ডিগ্ৰী ঘূৰাই পোৱা ৰূপ কোনটো বিকল্পত আছে?",
        S.svg(inner, 72),
        fig_opts(S.rotate(inner, 180), [inner, S.mirror(inner), S.rotate(inner, 90)]),
        "A half turn keeps the figure the right way up but swaps top and bottom with left and right.",
        "আধা ঘূৰণত চিত্ৰ ওপৰ-তল আৰু বাওঁ-সোঁ সলনি হয়, কিন্তু আকৃতি একে থাকে।")

# ---------------- more symmetry counts ----------------
for name, inner, n, as_name in [("regular octagon", S.poly(S.regular(8)), 8, "অষ্টভুজ"),
                                ("regular heptagon", S.poly(S.regular(7)), 7, "সপ্তভুজ"),
                                ("regular pentagon", S.poly(S.regular(5)), 5, "পঞ্চভুজ"),
                                ("rectangle", S.poly([(14, 30), (86, 30), (86, 70), (14, 70)]), 2, "আয়ত")]:
    add(f"How many lines of symmetry does the {name} have?",
        f"{as_name} ৰ কিমানডাল প্ৰতিসম ৰেখা আছে?",
        S.svg(inner, 80),
        [(str(n), A(n), "")] + [(str(v), A(v), "") for v in (n + 1, n - 1, n + 2)],
        f"The {name} has {n} lines of symmetry.",
        f"{as_name} ৰ {A(n)} ডাল প্ৰতিসম ৰেখা আছে।")

# ---------------- alternating series ----------------
for i, (base, name, as_name) in enumerate(SHAPES[:2]):
    seq = [S.poly(base, k % 2 == 1) for k in range(4)]
    ans = S.poly(base, False)
    wrongs = [S.poly(base, True), S.rotate(S.poly(base), 90), S.mirror(S.poly(base))]
    add(f"Which figure continues the series of the {name}?",
        f"{as_name} ৰ শৃংখলা কোনটো চিত্ৰই আগবঢ়াই নিব?",
        S.row(seq), fig_opts(ans, wrongs),
        "Shading alternates at every step, so the fifth figure is plain again.",
        "প্ৰতিটো পদত ৰং সলনি হয়, সেয়ে পঞ্চম চিত্ৰ পুনৰ ৰঙহীন।")

# ---------------- dice: two views ----------------
COMBOS = [(1, (2, 3), (4, 5)), (2, (1, 3), (5, 6)), (3, (1, 4), (2, 6)), (4, (1, 2), (3, 5))]
for shared, (a, b), (c, d) in COMBOS:
    used = {shared, a, b, c, d}
    missing = [x for x in range(1, 7) if x not in used][0]
    add(f"Two views of one die show {shared}, {a}, {b} and then {shared}, {c}, {d}. The face opposite {shared} is",
        f"একে লুডুৰ দুটা দৃশ্যত {A(shared)}, {A(a)}, {A(b)} আৰু {A(shared)}, {A(c)}, {A(d)} দেখা যায়। {A(shared)} ৰ বিপৰীত পিঠিত",
        S.svg("", 1),
        [(str(missing), A(missing), "")] + [(str(x), A(x), "") for x in range(1, 7) if x != missing][:3],
        f"Five different numbers are visible and all of them touch {shared}, so {missing} is opposite it.",
        f"পাঁচটা বেলেগ সংখ্যা দেখা গৈছে আৰু আটাইবোৰে {A(shared)} ক স্পৰ্শ কৰে, সেয়ে {A(missing)} ইয়াৰ বিপৰীত।")


# ---------------- drawn die, opposite face ----------------
PIPS = {1: [(1, 1)], 2: [(0, 0), (2, 2)], 3: [(0, 0), (1, 1), (2, 2)],
        4: [(0, 0), (2, 0), (0, 2), (2, 2)], 5: [(0, 0), (2, 0), (1, 1), (0, 2), (2, 2)],
        6: [(0, 0), (0, 1), (0, 2), (2, 0), (2, 1), (2, 2)]}
TOP = [(50, 8), (78, 26), (50, 44), (22, 26)]
LEFT = [(22, 26), (50, 44), (50, 78), (22, 60)]
RIGHT = [(50, 44), (78, 26), (78, 60), (50, 78)]


def bil(a, b, c, d, u, v):
    x = (1 - u) * (1 - v) * a[0] + u * (1 - v) * b[0] + u * v * c[0] + (1 - u) * v * d[0]
    y = (1 - u) * (1 - v) * a[1] + u * (1 - v) * b[1] + u * v * c[1] + (1 - u) * v * d[1]
    return round(x, 1), round(y, 1)


def face(quad, n):
    parts = [S.poly(quad)]
    for (u, v) in PIPS[n]:
        x, y = bil(quad[0], quad[1], quad[2], quad[3], 0.24 + 0.26 * u, 0.24 + 0.26 * v)
        parts.append(f'<circle cx="{x}" cy="{y}" r="2.3" fill="{S.INK}"/>')
    return "".join(parts)


for v in range(1, 7):
    opp = 7 - v
    others = [x for x in range(1, 7) if x not in (v, opp)]
    die = S.svg(face(TOP, v) + face(LEFT, others[0]) + face(RIGHT, others[1]), 80)
    add(f"The figure shows a standard die. Which number lies on the face opposite the face with {v}?",
        f"চিত্ৰত এটা প্ৰামাণ্য লুডু দেখুওৱা হৈছে। {A(v)} থকা পিঠিৰ বিপৰীত পিঠিত কোন সংখ্যা?",
        die,
        [(str(opp), A(opp), "")] + [(str(x), A(x), "") for x in others[:3]],
        f"On a standard die opposite faces add to 7, so the answer is {opp}.",
        f"প্ৰামাণ্য লুডুত বিপৰীত পিঠিৰ যোগফল ৭, সেয়ে উত্তৰ {A(opp)}।")


# ---------------- final top-ups ----------------
for m, n, cell in [(4, 2, 22), (3, 4, 20)]:
    g = grid(m, n, cell)
    sq = G.count_squares(g)
    add("How many squares are there in the figure?",
        "চিত্ৰত কিমানটা বৰ্গ আছে?",
        G.draw(g, 96),
        [(str(sq), A(sq), "")] + [(str(v), A(v), "") for v in (sq + 1, sq - 1, sq + 3)],
        f"Counting squares of every size in the {m} by {n} grid gives {sq}.",
        f"{A(m)} বাই {A(n)} গ্ৰিডত প্ৰতিটো আকাৰৰ বৰ্গ গণি {A(sq)} টা পোৱা যায়।")

for i, (base, name, as_name) in enumerate(SHAPES[:2]):
    inner = S.poly(base) + S.dot(*CORNERS[(i + 3) % 4])
    add(f"Which option is the given {name} turned through 270 degrees?",
        f"দিয়া {as_name} ক ২৭০ ডিগ্ৰী ঘূৰাই পোৱা ৰূপ কোনটো বিকল্পত আছে?",
        S.svg(inner, 72),
        fig_opts(S.rotate(inner, 270), [S.rotate(inner, 90), S.mirror(inner), inner]),
        "Three quarter turns clockwise is the same as a quarter turn anticlockwise.",
        "তিনি চতুৰ্থাংশ ঘড়ীৰ দিশে ঘূৰণ = এচতুৰ্থাংশ ওলোটা দিশে ঘূৰণ।")

for i, (base, name, as_name) in enumerate(SHAPES[:2]):
    inner = S.poly(base) + S.dot(*CORNERS[i])
    add(f"Which option is the water image of the given {name}?",
        f"দিয়া {as_name} ৰ পানীৰ প্ৰতিবিম্ব কোনটো?",
        S.svg(inner, 72),
        fig_opts(S.water(inner), [S.mirror(inner), S.rotate(inner, 180), inner]),
        "The water image flips the figure top to bottom.",
        "পানীৰ প্ৰতিবিম্বত চিত্ৰ ওপৰ-তল ওলোটা হয়।")


append_nv("general-non-verbal-reasoning", rows)
