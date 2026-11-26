#!/usr/bin/env python3
"""Mirror & Water Image: 80+ very hard bilingual questions with SVG figures."""

import sys
sys.path.insert(0, "tools")
import nv_shapes as S
from nv_bank import append_nv

rows = []
CORNERS = [(70, 26), (70, 74), (30, 74), (30, 26)]
CNAME = ["top right", "bottom right", "bottom left", "top left"]
CAS = ["ওপৰ সোঁ", "তল সোঁ", "তল বাওঁ", "ওপৰ বাওঁ"]

BASES = {
    "arrow": S.ARROW,
    "flag": S.FLAG,
    "tee": S.TEE,
    "F-shape": S.F_SHAPE,
    "pentagon": None,
    "star": None,
    "hexagon": None,
}
AS_BASE = {"arrow": "কাঁড়", "flag": "পতাকা", "tee": "টি-আকৃতি", "F-shape": "F আকৃতি",
           "pentagon": "পঞ্চভুজ", "star": "তৰা", "hexagon": "ষড়ভুজ"}


def base_fig(name, deg, corner):
    if name == "arrow":
        return S.rotate(S.poly(S.ARROW) + S.dot(*corner), deg)
    if name == "flag":
        return S.rotate(S.poly(S.FLAG) + S.dot(*corner), deg)
    if name == "tee":
        return S.rotate(S.poly(S.TEE) + S.dot(*corner), deg)
    if name == "F-shape":
        return S.rotate(S.poly(S.F_SHAPE) + S.dot(*corner), deg)
    if name == "pentagon":
        return S.rotate(S.poly(S.regular(5)) + S.dot(*corner), deg)
    if name == "star":
        return S.rotate(S.poly(S.star()) + S.dot(*corner), deg)
    if name == "hexagon":
        return S.rotate(S.poly(S.regular(6)) + S.dot(*corner), deg)
    return ""


def add(base, answer, dists, q_en, q_as, exp_en, exp_as):
    uniq = []
    for d in dists:
        if d != answer and d not in uniq:
            uniq.append(d)
    for fb in (S.sq(0), S.tri(0), S.hexa(0), S.diamond(0), S.pent(0)):
        if len(uniq) == 3:
            break
        if fb != answer and fb not in uniq:
            uniq.append(fb)
    rows.append({"stem": q_en, "stem_as": q_as, "fig": S.svg(base),
                 "options": [("", "", S.svg(answer))] + [("", "", S.svg(d)) for d in uniq[:3]],
                 "correct": 0, "exp_en": exp_en, "exp_as": exp_as})


for name in ["arrow", "flag", "tee", "F-shape", "pentagon", "star", "hexagon"]:
    for k, corner in enumerate(CORNERS):
        for kind in ("mirror", "water"):
            base = base_fig(name, 0, corner)
            mir = S.mirror(base)
            wat = S.water(base)
            rot = S.turn180(base)
            if kind == "mirror":
                q_en = "Which of the following is the correct mirror image of the given figure?"
                q_as = "দিয়া চিত্ৰটোৰ শুদ্ধ দাপোণ প্ৰতিবিম্ব কোনটো?"
                opp = {0: 3, 1: 2, 2: 1, 3: 0}[k]
                exp_en = ("A mirror image reverses the figure left to right: the dot moves from the "
                          f"{CNAME[k]} to the {CNAME[opp]} corner while staying on the same level.")
                exp_as = "দাপোণ প্ৰতিবিম্বত চিত্ৰটো বাওঁ-সোঁ সলনি হয়; বিন্দুটো একে উচ্চতাতে বিপৰীত ফালে যায়।"
                ans, dists = mir, [base, wat, rot]
            else:
                q_en = "Which of the following is the correct water image of the given figure?"
                q_as = "দিয়া চিত্ৰটোৰ শুদ্ধ পানীৰ প্ৰতিবিম্ব কোনটো?"
                opp = {0: 1, 1: 0, 2: 3, 3: 2}[k]
                exp_en = ("A water image flips the figure top to bottom: the dot moves from the "
                          f"{CNAME[k]} to the {CNAME[opp]} corner while staying on the same side.")
                exp_as = "পানীৰ প্ৰতিবিম্বত চিত্ৰটো ওপৰ-তল সলনি হয়; বিন্দুটো একে ফালে থাকি বিপৰীত স্তৰলৈ যায়।"
                ans, dists = wat, [base, mir, rot]
            add(base, ans, dists, q_en, q_as, exp_en, exp_as)

# rotated bases: mirror image of a tilted figure
for name in ["arrow", "flag", "tee", "F-shape"]:
    for deg in (45, 90, 135):
        for kind in ("mirror", "water"):
            base = base_fig(name, deg, CORNERS[0])
            mir = S.mirror(base)
            wat = S.water(base)
            rot = S.turn180(base)
            if kind == "mirror":
                q_en = "Which figure is the correct mirror image of the tilted figure shown?"
                q_as = "দেখুওৱা হেলনীয়া চিত্ৰটোৰ শুদ্ধ দাপোণ প্ৰতিবিম্ব কোনটো?"
                ans, dists = mir, [base, wat, rot]
                exp_en = "Reflect the tilted figure about a vertical line; its slant is reversed."
                exp_as = "হেলনীয়া চিত্ৰটো উলম্ব ৰেখাৰ সাপেক্ষে প্ৰতিফলিত কৰা; হেলনৰ দিশ ওলোটাই যায়।"
            else:
                q_en = "Which figure is the correct water image of the tilted figure shown?"
                q_as = "দেখুওৱা হেলনীয়া চিত্ৰটোৰ শুদ্ধ পানীৰ প্ৰতিবিম্ব কোনটো?"
                ans, dists = wat, [base, mir, rot]
                exp_en = "Reflect the tilted figure about a horizontal line; its slant is reversed."
                exp_as = "হেলনীয়া চিত্ৰটো অনুভূমিক ৰেখাৰ সাপেক্ষে প্ৰতিফলিত কৰা; হেলনৰ দিশ ওলোটাই যায়।"
            add(base, ans, dists, q_en, q_as, exp_en, exp_as)

append_nv("mirror-water-image", rows)
