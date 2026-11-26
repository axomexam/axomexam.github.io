#!/usr/bin/env python3
"""Cube & Dice: very hard bilingual questions with drawn dice, nets and cubes."""

import sys
sys.path.insert(0, "tools")
import nv_shapes as S
from nv_bank import append_nv

AS = "০১২৩৪৫৬৭৮৯"
def A(n):
    return str(n).translate(str.maketrans("0123456789", AS))

rows = []
INK = S.INK

PIPS = {
    1: [(1, 1)],
    2: [(0, 0), (2, 2)],
    3: [(0, 0), (1, 1), (2, 2)],
    4: [(0, 0), (2, 0), (0, 2), (2, 2)],
    5: [(0, 0), (2, 0), (1, 1), (0, 2), (2, 2)],
    6: [(0, 0), (0, 1), (0, 2), (2, 0), (2, 1), (2, 2)],
}


def bilin(a, b, c, d, u, v):
    x = (1 - u) * (1 - v) * a[0] + u * (1 - v) * b[0] + u * v * c[0] + (1 - u) * v * d[0]
    y = (1 - u) * (1 - v) * a[1] + u * (1 - v) * b[1] + u * v * c[1] + (1 - u) * v * d[1]
    return round(x, 1), round(y, 1)


TOP = [(50, 8), (78, 26), (50, 44), (22, 26)]
LEFT = [(22, 26), (50, 44), (50, 78), (22, 60)]
RIGHT = [(50, 44), (78, 26), (78, 60), (50, 78)]


def face(quad, n, r=2.3):
    parts = [S.poly(quad)]
    for (u, v) in PIPS[n]:
        x, y = bilin(quad[0], quad[1], quad[2], quad[3], 0.24 + 0.26 * u, 0.24 + 0.26 * v)
        parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{INK}"/>')
    return "".join(parts)


def die_inner(t, f, r):
    return face(TOP, t) + face(LEFT, f) + face(RIGHT, r)


def die(t, f, r):
    return S.svg(die_inner(t, f, r), 80)


def two_dice(a, b):
    left = S.g(die_inner(*a), "translate(0 0) scale(0.52)")
    right = S.g(die_inner(*b), "translate(48 0) scale(0.52)")
    return S.svg(left + right, 120)


def cube(n):
    parts = []
    for quad in (TOP, LEFT, RIGHT):
        parts.append(S.poly(quad))
        for k in range(1, n):
            t = k / n
            parts.append(f'<line x1="{bilin(quad[0], quad[1], quad[2], quad[3], t, 0)[0]}" '
                         f'y1="{bilin(quad[0], quad[1], quad[2], quad[3], t, 0)[1]}" '
                         f'x2="{bilin(quad[0], quad[1], quad[2], quad[3], t, 1)[0]}" '
                         f'y2="{bilin(quad[0], quad[1], quad[2], quad[3], t, 1)[1]}" stroke="{S.LIGHT}" stroke-width="1.4"/>')
            parts.append(f'<line x1="{bilin(quad[0], quad[1], quad[2], quad[3], 0, t)[0]}" '
                         f'y1="{bilin(quad[0], quad[1], quad[2], quad[3], 0, t)[1]}" '
                         f'x2="{bilin(quad[0], quad[1], quad[2], quad[3], 1, t)[0]}" '
                         f'y2="{bilin(quad[0], quad[1], quad[2], quad[3], 1, t)[1]}" stroke="{S.LIGHT}" stroke-width="1.4"/>')
    return S.svg("".join(parts), 80)


def net(cells):
    """cells: list of (x, y, value) for six 20px squares."""
    parts = []
    for (x, y, n) in cells:
        parts.append(S.rect(x, y, 20, 20))
        for (u, v) in PIPS[n]:
            parts.append(f'<circle cx="{x + 5 + u * 5}" cy="{y + 5 + v * 5}" r="2.1" fill="{INK}"/>')
    return S.svg("".join(parts), 88)


def add(stem, stem_as, fig, ans, opts, exp_en, exp_as):
    uniq = [ans]
    for o in opts:
        if o != ans and o not in uniq:
            uniq.append(o)
    k = 1
    while len(uniq) < 4:
        v = ans + k if ans + k <= 6 else ans - k
        if v not in uniq and 1 <= v <= 6:
            uniq.append(v)
        k += 1
    rows.append({"stem": stem, "stem_as": stem_as, "fig": fig,
                 "options": [(str(o), A(o), "") for o in uniq[:4]],
                 "correct": 0, "exp_en": exp_en, "exp_as": exp_as})


# ---- standard die: opposite faces add to seven ------------------------
for v in range(1, 7):
    opp = 7 - v
    others = [x for x in range(1, 7) if x not in (v, opp)]
    top = v
    add(f"A standard die shows {v} on its top face. The number on the face opposite it is",
        f"এটা প্ৰামাণ্য লুডুত ওপৰৰ পিঠিত {A(v)} আছে। ইয়াৰ বিপৰীত পিঠিৰ সংখ্যা",
        die(v, others[0], others[1]), opp, others,
        f"In a standard die the opposite faces always add up to 7, so the opposite of {v} is 7 - {v} = {opp}.",
        f"প্ৰামাণ্য লুডুত বিপৰীত পিঠিৰ সংখ্যাৰ যোগফল ৭, সেয়ে {A(v)} ৰ বিপৰীত পিঠিত ৭ - {A(v)} = {A(opp)}।")

# ---- two views of the same die ---------------------------------------
# five numbers visible, the sixth sits opposite the shared face
COMBOS = [
    (1, (2, 3), (4, 5)), (1, (2, 4), (3, 6)), (2, (1, 3), (5, 6)),
    (2, (4, 6), (1, 5)), (3, (1, 4), (2, 6)), (3, (5, 6), (2, 4)),
    (4, (1, 2), (3, 5)), (4, (5, 6), (1, 3)), (5, (1, 6), (2, 3)),
    (5, (2, 4), (1, 6)), (6, (1, 2), (3, 4)), (6, (3, 5), (1, 4)),
    (1, (5, 6), (2, 4)), (2, (3, 5), (4, 6)), (3, (2, 6), (4, 5)),
    (4, (2, 3), (5, 6)),
]
for shared, (a, b), (c, d) in COMBOS:
    used = {shared, a, b, c, d}
    missing = [x for x in range(1, 7) if x not in used][0]
    add(f"Two views of the same die show {shared}, {a} and {b} in the first view and "
        f"{shared}, {c} and {d} in the second. The number on the face opposite {shared} is",
        f"একে লুডুৰ দুটা দৃশ্যত প্ৰথমত {A(shared)}, {A(a)}, {A(b)} আৰু দ্বিতীয়ত {A(shared)}, {A(c)}, {A(d)} দেখা গৈছে। "
        f"{A(shared)} ৰ বিপৰীত পিঠিৰ সংখ্যা",
        two_dice((shared, a, b), (shared, c, d)), missing, [x for x in range(1, 7) if x != missing],
        f"The five visible numbers are {shared}, {a}, {b}, {c} and {d}; every one of them touches the "
        f"face {shared}, so the only number left, {missing}, must be opposite it.",
        f"দৃশ্যমান পাঁচটা সংখ্যা {A(shared)}, {A(a)}, {A(b)}, {A(c)}, {A(d)} — ইয়াৰ প্ৰতিটোৱে {A(shared)} পিঠিক স্পৰ্শ কৰে, "
        f"সেয়ে বাকী থকা একমাত্ৰ সংখ্যা {A(missing)} হে ইয়াৰ বিপৰীত পিঠিত থাকিব।")

# ---- cube nets --------------------------------------------------------
NET_POS = [(8, 34), (28, 34), (48, 34), (68, 34), (28, 14), (48, 54)]
OPP = {0: 2, 2: 0, 1: 3, 3: 1, 4: 5, 5: 4}
PERMS = [
    [1, 2, 3, 4, 5, 6], [2, 3, 4, 5, 6, 1], [3, 1, 6, 2, 4, 5],
    [4, 5, 1, 6, 2, 3], [5, 6, 2, 3, 1, 4], [6, 4, 5, 1, 3, 2],
    [1, 6, 3, 2, 5, 4], [2, 5, 4, 1, 6, 3], [3, 4, 6, 5, 1, 2],
    [4, 3, 1, 5, 2, 6], [5, 1, 2, 6, 4, 3], [6, 2, 5, 4, 3, 1],
    [1, 3, 5, 2, 6, 4], [2, 4, 6, 3, 1, 5], [3, 5, 1, 4, 2, 6],
    [4, 6, 2, 5, 3, 1], [5, 2, 3, 1, 4, 6], [6, 1, 4, 3, 5, 2],
]
for perm in PERMS:
    cells = [(x, y, perm[i]) for i, (x, y) in enumerate(NET_POS)]
    for i in range(4):
        partner = perm[OPP[i]]
        add(f"In the given net of a cube, the number opposite {perm[i]} is",
            f"দিয়া ঘনকৰ নেটত {A(perm[i])} ৰ বিপৰীত সংখ্যা",
            net(cells), partner, [perm[j] for j in range(6) if perm[j] != partner],
            f"When the net folds, the first and third squares of the row become opposite faces and so do "
            f"the second and fourth; the two flaps close opposite each other. Here {perm[i]} pairs with {partner}.",
            f"নেট ভাঁজ কৰিলে শাৰীৰ প্ৰথম আৰু তৃতীয় ঘৰ বিপৰীত পিঠি হয়, দ্বিতীয় আৰু চতুৰ্থও; দুয়োখন ফ্লেপো "
            f"বিপৰীত হয়। ইয়াত {A(perm[i])} ৰ যোৰ {A(partner)}।")

# ---- painted cube -----------------------------------------------------
for n in range(3, 8):
    total = n ** 3
    corner = 8
    two = 12 * (n - 2)
    one = 6 * (n - 2) ** 2
    none = (n - 2) ** 3
    base = (f"A cube of side {n} units is painted on all faces and then cut into {total} unit cubes.",
            f"{A(n)} একক বাহুৰ এটা ঘনকৰ সকলো পিঠিত ৰং লগাই {A(total)} টা একক ঘনকত কটা হৈছে।")
    add(f"{base[0]} How many unit cubes have three faces painted?",
        f"{base[1]} কিমানটা একক ঘনকৰ তিনিটা পিঠিত ৰং আছে?",
        cube(n), corner, [two, one, none],
        f"Only the {corner} corner cubes show three painted faces, whatever the size of the cube.",
        f"কেৱল {A(corner)} টা কোণৰ ঘনকতহে তিনিটা ৰঙীন পিঠি থাকে।")
    add(f"{base[0]} How many unit cubes have exactly two faces painted?",
        f"{base[1]} কিমানটা একক ঘনকৰ ঠিক দুটা পিঠিত ৰং আছে?",
        cube(n), two, [corner, one, none],
        f"Each of the 12 edges leaves {n - 2} cubes with two painted faces, so 12 x {n - 2} = {two}.",
        f"১২ টা কাষৰ প্ৰতিটোত {A(n - 2)} টা ঘনকত দুটা ৰঙীন পিঠি থাকে, সেয়ে ১২ × {A(n - 2)} = {A(two)}।")
    add(f"{base[0]} How many unit cubes have exactly one face painted?",
        f"{base[1]} কিমানটা একক ঘনকৰ ঠিক এটা পিঠিত ৰং আছে?",
        cube(n), one, [two, none, corner],
        f"Each of the 6 faces carries a {n - 2} by {n - 2} block of such cubes, so 6 x {n - 2}^2 = {one}.",
        f"৬ টা পিঠিৰ প্ৰতিটোত {A(n - 2)} × {A(n - 2)} টা ঘনক থাকে, সেয়ে ৬ × {A(n - 2)}² = {A(one)}।")
    add(f"{base[0]} How many unit cubes have no face painted?",
        f"{base[1]} কিমানটা একক ঘনকৰ কোনো পিঠিত ৰং নাই?",
        cube(n), none, [one, two, corner],
        f"The unpainted cubes form the inner block of side {n - 2}, so ({n - 2})^3 = {none}.",
        f"ৰং নথকা ঘনকবোৰ ভিতৰৰ {A(n - 2)} একক বাহুৰ অংশ, সেয়ে ({A(n - 2)})³ = {A(none)}।")
    add(f"{base[0]} How many unit cubes have at least one face painted?",
        f"{base[1]} কিমানটা একক ঘনকৰ অন্ততঃ এটা পিঠিত ৰং আছে?",
        cube(n), total - none, [none, one, total],
        f"All {total} cubes minus the {none} inner ones gives {total - none}.",
        f"মুঠ {A(total)} ৰপৰা ভিতৰৰ {A(none)} টা বাদ দিলে {A(total - none)} টা পোৱা যায়।")

append_nv("cube-dice", rows)
