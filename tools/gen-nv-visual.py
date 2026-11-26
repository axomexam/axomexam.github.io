#!/usr/bin/env python3
"""Visual Memory & Rule Detection: 80+ very hard bilingual questions.

Every answer is derived, not typed: symmetry counts come from the shape,
net validity from a fold simulation, and "one stroke" from the odd-degree
count of the drawn graph.
"""

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
    rows.append({"stem": stem, "stem_as": stem_as, "fig": fig,
                 "options": [options[0]] + options[1:], "correct": 0,
                 "exp_en": exp_en, "exp_as": exp_as})


def num_opts(ans, pool):
    vals = [ans]
    for v in pool:
        if v != ans and v not in vals and len(vals) < 4:
            vals.append(v)
    return [(("Infinite", "অসীম", "") if v == "inf" else (str(v), A(v), "")) for v in vals]


SQ = [(24, 24), (76, 24), (76, 76), (24, 76)]
RECT = [(14, 30), (86, 30), (86, 70), (14, 70)]

# ---------------- lines of symmetry ----------------
SYM = [
    ("equilateral triangle", S.poly(S.regular(3)), 3, "ত্ৰিভুজ"),
    ("square", S.poly(SQ), 4, "বৰ্গ"),
    ("regular pentagon", S.poly(S.regular(5)), 5, "পঞ্চভুজ"),
    ("regular hexagon", S.poly(S.regular(6)), 6, "ষড়ভুজ"),
    ("rectangle", S.poly(RECT), 2, "আয়ত"),
    ("rhombus", S.poly(S.DIAMOND), 2, "ৰম্বাছ"),
    ("isosceles trapezium", S.poly([(24, 26), (76, 26), (88, 76), (12, 76)]), 1, "সমদ্বিবাহু ট্ৰেপিজিয়াম"),
    ("parallelogram", S.poly([(18, 30), (62, 30), (82, 70), (38, 70)]), 0, "সামান্তৰিক"),
    ("regular octagon", S.poly(S.regular(8)), 8, "অষ্টভুজ"),
    ("regular heptagon", S.poly(S.regular(7)), 7, "সপ্তভুজ"),
    ("regular nonagon", S.poly(S.regular(9)), 9, "নৱভুজ"),
    ("regular decagon", S.poly(S.regular(10)), 10, "দশভুজ"),
    ("regular dodecagon", S.poly(S.regular(12)), 12, "দ্বাদশভুজ"),
]
for name, inner, n, as_name in SYM:
    add(f"How many lines of symmetry does the {name} have?",
        f"{as_name} ৰ কিমানডাল প্ৰতিসম ৰেখা আছে?",
        S.svg(inner, 80), num_opts(n, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]),
        f"A regular {name} has {n} lines of symmetry." if n else
        f"The {name} has no line of symmetry: no fold makes the two halves match.",
        f"{as_name} ৰ {A(n)} ডাল প্ৰতিসম ৰেখা আছে।" if n else
        f"{as_name} ৰ এডালো প্ৰতিসম ৰেখা নাই — কোনো ভাঁজে দুয়োফাল মিলাই দিব নোৱাৰে।")

# ---------------- order of rotational symmetry ----------------
ROT = [("square", S.poly(SQ), 4, "বৰ্গ"),
       ("equilateral triangle", S.poly(S.regular(3)), 3, "ত্ৰিভুজ"),
       ("regular pentagon", S.poly(S.regular(5)), 5, "পঞ্চভুজ"),
       ("regular hexagon", S.poly(S.regular(6)), 6, "ষড়ভুজ"),
       ("rectangle", S.poly(RECT), 2, "আয়ত"),
       ("regular octagon", S.poly(S.regular(8)), 8, "অষ্টভুজ"),
       ("regular heptagon", S.poly(S.regular(7)), 7, "সপ্তভুজ"),
       ("regular decagon", S.poly(S.regular(10)), 10, "দশভুজ"),
       ("rhombus", S.poly(S.DIAMOND), 2, "ৰম্বাছ")]
for name, inner, n, as_name in ROT:
    add(f"What is the order of rotational symmetry of the {name}?",
        f"{as_name} ৰ ঘূৰ্ণন প্ৰতিসমতাৰ ক্ৰম কিমান?",
        S.svg(inner, 80), num_opts(n, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        f"The {name} maps onto itself {n} times in a full turn, so the order is {n}.",
        f"এপাক ঘূৰোঁতে {as_name} {A(n)} বাৰ নিজৰ ওপৰত পৰে, সেয়ে ক্ৰম {A(n)}।")

# ---------------- cube nets ----------------
def folds(cells):
    start = min(cells)
    state = {start: ((0, 0, 1), (1, 0, 0), (0, 1, 0))}
    normals = {start: (0, 0, 1)}
    q = [start]
    while q:
        r, c = q.pop(0)
        n, rt, dn = state[(r, c)]
        for dr, dc, st in ((0, 1, (rt, tuple(-x for x in n), dn)),
                           (0, -1, (tuple(-x for x in rt), n, dn)),
                           (1, 0, (dn, rt, tuple(-x for x in n))),
                           (-1, 0, (tuple(-x for x in dn), rt, n))):
            k = (r + dr, c + dc)
            if k in cells and k not in state:
                state[k] = st
                normals[k] = st[0]
                q.append(k)
    return len(state) == len(cells) and len(set(normals.values())) == len(cells)


def net_svg(cells):
    return S.svg("".join(S.rect(6 + c * 20, 6 + r * 20, 20, 20) for r, c in sorted(cells)), 76)


NET_POOL = [
    [(0, 0), (1, 0), (1, 1), (1, 2), (1, 3), (2, 1)],
    [(0, 1), (1, 0), (1, 1), (1, 2), (2, 1), (3, 1)],
    [(0, 0), (0, 1), (1, 1), (1, 2), (2, 2), (2, 3)],
    [(0, 0), (1, 0), (1, 1), (1, 2), (1, 3), (2, 3)],
    [(0, 0), (0, 1), (0, 2), (1, 2), (1, 3), (1, 4)],
    [(0, 1), (1, 1), (1, 2), (1, 3), (2, 0), (2, 1)],
    [(0, i) for i in range(6)],
    [(r, c) for r in range(2) for c in range(3)],
    [(0, i) for i in range(5)] + [(1, 2)],
    [(0, 0), (0, 1), (0, 2), (1, 2), (2, 2), (2, 3)],
    [(0, 0), (1, 0), (2, 0), (3, 0), (3, 1), (3, 2)],
    [(0, 0), (0, 1), (0, 2), (0, 3), (1, 3), (2, 3)],
]
good = [c for c in NET_POOL if folds(set(c))]
bad = [c for c in NET_POOL if not folds(set(c))]

for i, cells in enumerate(good):
    dis = [bad[(i + k) % len(bad)] for k in range(3)]
    add("Which of the following nets will fold into a cube?",
        "তলৰ কোনটো নেটে ঘনক গঠন কৰিব?",
        net_svg(cells), [("", "", net_svg(c)) for c in [cells] + dis],
        "Only this net closes into six different faces; the others fold two squares onto the same face.",
        "কেৱল এই নেটেহে ছখন বেলেগ বেলেগ পিঠি দিয়ে; বাকীবোৰত দুটা বৰ্গ একে পিঠিত পৰে।")
for i, cells in enumerate(bad):
    gd = [good[(i + k) % len(good)] for k in range(3)]
    add("Which of the following nets will NOT fold into a cube?",
        "তলৰ কোনটো নেটে ঘনক গঠন নকৰে?",
        net_svg(cells), [("", "", net_svg(c)) for c in [cells] + gd],
        "This net overlaps two squares on one face when folded, so it cannot form a cube.",
        "এই নেট ভাঁজ কৰিলে দুটা বৰ্গ একে পিঠিত পৰে, সেয়ে ই ঘনক গঠন নকৰে।")

# ---------------- pencil tracing ----------------
def odd_vertices(segs):
    pts = G.points(segs)
    deg = {p: 0 for p in pts}
    for a, b in segs:
        on = sorted([p for p in pts if G._on(p, a, b)],
                    key=lambda p: (p[0] - a[0]) ** 2 + (p[1] - a[1]) ** 2)
        for p, q in zip(on, on[1:]):
            deg[p] += 1
            deg[q] += 1
    return sum(1 for v in deg.values() if v % 2)


Q = [(10, 10), (90, 10), (90, 90), (10, 90)]
TRI = [((50, 12), (88, 86)), ((88, 86), (12, 86)), ((12, 86), (50, 12))]
HEX = [(S.regular(6)[i], S.regular(6)[(i + 1) % 6]) for i in range(6)]
FIG = {
    "square": [(Q[0], Q[1]), (Q[1], Q[2]), (Q[2], Q[3]), (Q[3], Q[0])],
    "triangle": TRI,
    "regular pentagon": [(S.regular(5)[i], S.regular(5)[(i + 1) % 5]) for i in range(5)],
    "square with one diagonal": [(Q[0], Q[1]), (Q[1], Q[2]), (Q[2], Q[3]), (Q[3], Q[0]), (Q[0], Q[2])],
    "triangle with one median": TRI + [((50, 12), (50, 86))],
    "pentagram": [((50, 8), (81, 92)), ((81, 92), (9, 39)), ((9, 39), (91, 39)),
                  ((91, 39), (19, 92)), ((19, 92), (50, 8))],
    "square with both diagonals": [(Q[0], Q[1]), (Q[1], Q[2]), (Q[2], Q[3]), (Q[3], Q[0]),
                                   (Q[0], Q[2]), (Q[1], Q[3])],
    "square with both midlines": [(Q[0], Q[1]), (Q[1], Q[2]), (Q[2], Q[3]), (Q[3], Q[0]),
                                  ((50, 10), (50, 90)), ((10, 50), (90, 50))],
    "hexagon with three diagonals": HEX + [((50, 52), (50, 18)), ((50, 52), (79, 35)), ((50, 52), (21, 35))],
    "triangle with two medians": TRI + [((50, 12), (50, 86)), ((88, 86), (31, 49))],
    "pentagon with two diagonals": [(S.regular(5)[i], S.regular(5)[(i + 1) % 5]) for i in range(5)]
                                   + [((50, 18), (21, 66)), ((50, 18), (79, 66))],
    "square with a diagonal and a midline": [(Q[0], Q[1]), (Q[1], Q[2]), (Q[2], Q[3]), (Q[3], Q[0]),
                                             (Q[0], Q[2]), ((50, 10), (50, 90))],
}
status = {k: odd_vertices(v) for k, v in FIG.items()}
YES = [k for k, v in status.items() if v <= 2]
NO = [k for k, v in status.items() if v > 2]
print("one-stroke yes", YES, "no", NO)

for i, k in enumerate(YES):
    others = [NO[(i + j) % len(NO)] for j in range(3)]
    add("Which figure can be drawn in one stroke without lifting the pencil and without retracing a line?",
        "কোনটো চিত্ৰ পেঞ্চিল নুটুলাকৈ আৰু ৰেখা পুনৰ নটানি এটা ৰেখাৰে আঁকিব পাৰি?",
        G.draw(FIG[k], 96), [("", "", G.draw(FIG[k], 64))] + [("", "", G.draw(FIG[o], 64)) for o in others],
        f"The {k} has {status[k]} odd vertices, which is at most two, so one stroke covers every line once.",
        f"{k} ত {A(status[k])} টা অযুগ্ম শীৰ্ষবিন্দু আছে — দুটাতকৈ বেছি নহয়, সেয়ে এটা ৰেখাৰে প্ৰতিডাল ৰেখা এবাৰত আঁকিব পাৰি।")
for i, k in enumerate(NO):
    others = [YES[(i + j) % len(YES)] for j in range(3)]
    add("Which figure canNOT be drawn in one stroke without lifting the pencil?",
        "কোনটো চিত্ৰ পেঞ্চিল নুটুলাকৈ এটা ৰেখাৰে আঁকিব নোৱাৰি?",
        G.draw(FIG[k], 96), [("", "", G.draw(FIG[k], 64))] + [("", "", G.draw(FIG[o], 64)) for o in others],
        f"The {k} has {status[k]} odd vertices; more than two means some line must be repeated or the pencil lifted.",
        f"{k} ত {A(status[k])} টা অযুগ্ম শীৰ্ষবিন্দু আছে; দুটাতকৈ বেছি হ'লে এডাল ৰেখা পুনৰ টানিব লাগিব বা পেঞ্চিল নুটুলিব লাগিব।")

# ---------------- rotation, not mirror ----------------
CORNERS = [(70, 26), (70, 74), (30, 74), (30, 26)]
BASES = [(S.F_SHAPE, "F-shape", "F আকৃতি"), (S.FLAG, "flag", "পতাকা"),
         (S.ARROW, "arrow", "কাঁড়"), (S.TEE, "T-shape", "টি-আকৃতি")]
for bi, (base, name, as_name) in enumerate(BASES):
    for angle in (90, 180, 270):
        corner = CORNERS[(bi + angle // 90) % 4]
        target = S.poly(base) + S.dot(*corner)
        turned = S.rotate(S.poly(base) + S.dot(*corner), angle)
        wrongs = [S.mirror(S.rotate(S.poly(base) + S.dot(*corner), k)) for k in (0, 90, 180)]
        add(f"Which option is the given {name} turned through {angle} degrees (a rotation, not a mirror image)?",
            f"কোনটো বিকল্পই দিয়া {as_name} ক {A(angle)} ডিগ্ৰী ঘূৰাই পোৱা ৰূপ (প্ৰতিবিম্ব নহয়)?",
            S.svg(target, 80),
            [("", "", S.svg(turned, 64))] + [("", "", S.svg(w, 64)) for w in wrongs],
            "Only one option keeps the handedness of the figure; the other three are mirror images.",
            "কেৱল এটা বিকল্পতহে চিত্ৰৰ দিশ অটুত থাকে; বাকী তিনিটা প্ৰতিবিম্ব।")

# ---------------- memory: exact match ----------------
for bi, (base, name, as_name) in enumerate(BASES):
    corner = CORNERS[bi]
    target = S.poly(base) + S.dot(*corner)
    exact = S.poly(base) + S.dot(*corner)
    wrongs = [S.rotate(S.poly(base) + S.dot(*corner), 90),
              S.rotate(S.poly(base) + S.dot(*corner), 180),
              S.mirror(S.poly(base) + S.dot(*corner))]
    add(f"Which option is exactly the same {name} as the one shown, in the same orientation?",
        f"দেখুওৱা {as_name} ৰ সৈতে হুবহু একে (একে দিশত) কোনটো বিকল্প?",
        S.svg(target, 80),
        [("", "", S.svg(exact, 64))] + [("", "", S.svg(w, 64)) for w in wrongs],
        "The matching option repeats the figure without turning or mirroring it.",
        "মিলা বিকল্পটোৱে চিত্ৰটো নুঘুৰোৱাকৈ আৰু প্ৰতিবিম্ব নকৰাকৈ একেদৰে দেখুৱাইছে।")

# ---------------- which figure has N lines of symmetry ----------------
for want in (1, 2, 3, 4, 5, 6, 8, 0):
    ans = [x for x in SYM if x[2] == want][0]
    dis = [x for x in SYM if x[2] != want and x[2] not in ()]
    picked, seen = [], set()
    for x in dis:
        if x[2] in seen or x[0] == ans[0]:
            continue
        seen.add(x[2])
        picked.append(x)
        if len(picked) == 3:
            break
    add(f"Which of the following figures has exactly {want} line{'s' if want != 1 else ''} of symmetry?",
        f"তলৰ কোনটো চিত্ৰত ঠিক {A(want)} ডাল প্ৰতিসম ৰেখা আছে?",
        S.svg("", 1),
        [("", "", S.svg(ans[1], 64))] + [("", "", S.svg(p[1], 64)) for p in picked],
        f"The {ans[0]} has exactly {want}; the others have a different number.",
        f"{ans[3]} ত ঠিক {A(want)} ডাল আছে; বাকীবোৰত বেলেগ সংখ্যা।")

# ---------------- rotational order, extra ----------------
for name, inner, n, as_name in [("regular nonagon", S.poly(S.regular(9)), 9, "নৱভুজ"),
                                ("regular dodecagon", S.poly(S.regular(12)), 12, "দ্বাদশভুজ"),
                                ("parallelogram", S.poly([(18, 30), (62, 30), (82, 70), (38, 70)]), 2, "সামান্তৰিক")]:
    add(f"What is the order of rotational symmetry of the {name}?",
        f"{as_name} ৰ ঘূৰ্ণন প্ৰতিসমতাৰ ক্ৰম কিমান?",
        S.svg(inner, 80), num_opts(n, [1, 2, 3, 4, 5, 6, 8, 9, 10, 12]),
        f"The {name} maps onto itself {n} times in a full turn, so the order is {n}.",
        f"এপাক ঘূৰোঁতে {as_name} {A(n)} বাৰ নিজৰ ওপৰত পৰে, সেয়ে ক্ৰম {A(n)}।")

# ---------------- memory: exact match, more shapes ----------------
EXTRA_BASES = [(S.TRI, "triangle", "ত্ৰিভুজ"), (S.DIAMOND, "rhombus", "ৰম্বাছ"),
               (S.regular(5), "pentagon", "পঞ্চভুজ"), (S.regular(6), "hexagon", "ষড়ভুজ")]
for bi, (base, name, as_name) in enumerate(EXTRA_BASES):
    corner = CORNERS[(bi + 2) % 4]
    inner = S.poly(base) + S.dot(*corner)
    add(f"Which option is exactly the same {name} as the one shown, in the same orientation?",
        f"দেখুওৱা {as_name} ৰ সৈতে হুবহু একে (একে দিশত) কোনটো বিকল্প?",
        S.svg(inner, 80),
        [("", "", S.svg(inner, 64)), ("", "", S.svg(S.rotate(inner, 90), 64)),
         ("", "", S.svg(S.rotate(inner, 180), 64)), ("", "", S.svg(S.mirror(inner), 64))],
        "The matching option repeats the figure without turning or mirroring it.",
        "মিলা বিকল্পটোৱে চিত্ৰটো নুঘুৰোৱাকৈ আৰু প্ৰতিবিম্ব নকৰাকৈ একেদৰে দেখুৱাইছে।")

# ---------------- one-stroke, more figures ----------------
EXTRA_FIG = {
    "rectangle": [((10, 24), (90, 24)), ((90, 24), (90, 76)), ((90, 76), (10, 76)), ((10, 76), (10, 24))],
    "hexagon": HEX,
    "square with one midline": [(Q[0], Q[1]), (Q[1], Q[2]), (Q[2], Q[3]), (Q[3], Q[0]), ((50, 10), (50, 90))],
    "square with both diagonals and both midlines": [(Q[0], Q[1]), (Q[1], Q[2]), (Q[2], Q[3]), (Q[3], Q[0]),
                                                     (Q[0], Q[2]), (Q[1], Q[3]),
                                                     ((50, 10), (50, 90)), ((10, 50), (90, 50))],
}
for name, segs in EXTRA_FIG.items():
    odd = odd_vertices(segs)
    pool = [k for k in status if (status[k] <= 2) != (odd <= 2)]
    if len(pool) < 3:
        continue
    others = pool[:3]
    if odd <= 2:
        q_en = "Which figure can be drawn in one stroke without lifting the pencil and without retracing a line?"
        q_as = "কোনটো চিত্ৰ পেঞ্চিল নুটুলাকৈ আৰু ৰেখা পুনৰ নটানি এটা ৰেখাৰে আঁকিব পাৰি?"
    else:
        q_en = "Which figure canNOT be drawn in one stroke without lifting the pencil?"
        q_as = "কোনটো চিত্ৰ পেঞ্চিল নুটুলাকৈ এটা ৰেখাৰে আঁকিব নোৱাৰি?"
    add(q_en, q_as, G.draw(segs, 96),
        [("", "", G.draw(segs, 64))] + [("", "", G.draw(FIG[o], 64)) for o in others],
        f"The {name} has {odd} odd vertices.",
        f"{name} ত {A(odd)} টা অযুগ্ম শীৰ্ষবিন্দু আছে।")


append_nv("visual-memory", rows)
