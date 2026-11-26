#!/usr/bin/env python3
"""Figure Analogy & Classification: 80+ bilingual questions with SVG figures."""

import sys
sys.path.insert(0, "tools")
import nv_shapes as S
from nv_bank import append_nv

rows = []


def make(name, deg=0, shaded=False, dots=0):
    shape = {
        "arrow": S.ARROW, "flag": S.FLAG, "tee": S.TEE, "F": S.F_SHAPE,
        "triangle": S.TRI, "square": S.SQUARE, "diamond": S.DIAMOND,
        "pentagon": S.regular(5), "hexagon": S.regular(6), "star": S.star(),
    }[name]
    inner = S.poly(shape, shaded)
    pos = [(30, 30), (70, 30), (70, 70), (30, 70)]
    for k in range(dots):
        inner += S.dot(*pos[k], r=5)
    return S.rotate(inner, deg)


TRANS = {
    "rot90": ("turns 90° clockwise", "৯০° ঘড়ীৰ দিশে ঘূৰে"),
    "rotm90": ("turns 90° anticlockwise", "৯০° ঘড়ীৰ বিপৰীত দিশে ঘূৰে"),
    "mirror": ("is reflected in a vertical mirror", "উলম্ব দাপোণত প্ৰতিফলিত হয়"),
    "water": ("is reflected in water", "পানীত প্ৰতিফলিত হয়"),
    "shade": ("gets shaded", "ছাঁয়াযুক্ত হয়"),
    "dot": ("gets a dot added", "এটা বিন্দু যোগ হয়"),
}
AS_SHAPE = {"arrow": "কাঁড়", "flag": "পতাকা", "tee": "টি-আকৃতি", "F": "F আকৃতি",
            "triangle": "ত্ৰিভুজ", "square": "বৰ্গ", "diamond": "ৰম্বস",
            "pentagon": "পঞ্চভুজ", "hexagon": "ষড়ভুজ", "star": "তৰা"}


def apply(name, kind, base_name, deg=0, shaded=False, dots=0):
    if kind == "rot90":
        return make(base_name, deg + 90, shaded, dots)
    if kind == "rotm90":
        return make(base_name, deg - 90, shaded, dots)
    if kind == "mirror":
        return S.mirror(make(base_name, deg, shaded, dots))
    if kind == "water":
        return S.water(make(base_name, deg, shaded, dots))
    if kind == "shade":
        return make(base_name, deg, not shaded, dots)
    if kind == "dot":
        return make(base_name, deg, shaded, dots + 1)
    return make(base_name, deg, shaded, dots)


PAIRS = [("flag", "tee"), ("arrow", "pentagon"), ("F", "hexagon"),
         ("star", "flag"), ("tee", "arrow"), ("pentagon", "star"),
         ("hexagon", "F"), ("diamond", "triangle")]


def add(fig, options, correct, q_en, q_as, exp_en, exp_as):
    uniq = []
    seen = set()
    for o in options:
        if o not in seen:
            seen.add(o)
            uniq.append(o)
    for fb in (S.sq(0), S.tri(0), S.hexa(0), S.diamond(0), S.pent(0), S.circle_fig(0)):
        if len(uniq) == 4:
            break
        if fb not in seen:
            seen.add(fb)
            uniq.append(fb)
    rows.append({"stem": q_en, "stem_as": q_as, "fig": fig,
                 "options": [("", "", S.svg(o)) for o in uniq[:4]],
                 "correct": correct, "exp_en": exp_en, "exp_as": exp_as})


# --- analogies
for kind, (en_t, as_t) in TRANS.items():
    for a, b in PAIRS:
        A = make(a)
        B = apply(a, kind, a)
        C = make(b)
        ans = apply(b, kind, b)
        dists = [apply(b, k, b) for k in TRANS if k != kind][:3]
        fig = (S.boxed(A) + '<span style="margin:0 6px;font-weight:800;color:#475569">:</span>'
               + S.boxed(B) + '<span style="margin:0 12px;font-weight:800;color:#475569">::</span>'
               + S.boxed(C) + '<span style="margin:0 6px;font-weight:800;color:#475569">:</span>'
               + '<span style="display:inline-flex;align-items:center;justify-content:center;'
                 'border:1px dashed #94a3b8;border-radius:10px;background:#f8fafc;width:72px;'
                 'height:72px;margin:0 2px;color:#475569;font-weight:800">?</span>')
        add(fig, [ans] + dists, 0,
            f"The first figure {en_t} to give the second figure. Which figure completes the analogy?",
            f"প্ৰথম চিত্ৰটো {as_t} দ্বিতীয় চিত্ৰটো পোৱা যায়। সাদৃশ্য সম্পূৰ্ণ কৰা চিত্ৰটো কোনটো?",
            f"The same change is applied to the third figure: it {en_t}.",
            f"তৃতীয় চিত্ৰটোতো একেই পৰিৱৰ্তন প্ৰয়োগ হয়।")

# --- classification
def cls_item(opts, odd, exp_en, exp_as):
    add("", opts, odd,
        "Three of the following four figures share a common property. Which one is different?",
        "তলৰ চাৰিটা চিত্ৰৰ তিনিটাত এটা সাধাৰণ ধৰ্ম আছে। কোনটো বেলেগ?",
        exp_en, exp_as)


# shape kind: three copies of one shape, one different shape
for base, other in [("flag", "tee"), ("arrow", "star"), ("tee", "F"), ("star", "pentagon"),
                    ("pentagon", "hexagon"), ("hexagon", "star"), ("F", "diamond"),
                    ("diamond", "triangle")]:
    opts = [make(base), make(base, 90), make(base, 180), make(other)]
    cls_item(opts, 3, f"Three figures are the same shape ({base}); the fourth is different.",
             "তিনিটা চিত্ৰ একেই আকৃতিৰ; চতুৰ্থটো বেলেগ।")

# shading: three shaded, one plain
for base in ["flag", "arrow", "tee", "star", "pentagon", "hexagon", "F", "diamond"]:
    opts = [make(base, 0, True), make(base, 90, True), make(base, 180, True), make(base, 0, False)]
    cls_item(opts, 3, "Three figures are shaded; one is unshaded.",
             "তিনিটা চিত্ৰ ছাঁয়াযুক্ত; এটা ছাঁয়াবিহীন।")

# dots: three with two dots, one with three
for base in ["flag", "arrow", "tee", "star", "pentagon", "hexagon", "F", "diamond"]:
    opts = [make(base, 0, False, 2), make(base, 90, False, 2), make(base, 180, False, 2),
            make(base, 0, False, 3)]
    cls_item(opts, 3, "Three figures carry two dots; one carries three.",
             "তিনিটা চিত্ৰত দুটা বিন্দু; এটাত তিনিটা বিন্দু।")

# orientation: three in the same position, one turned
for base in ["flag", "arrow", "tee", "F", "star", "triangle", "diamond", "pentagon"]:
    opts = [make(base, 0), make(base, 0, True), make(base, 0), make(base, 90)]
    cls_item(opts, 3, "Three figures are in the same orientation; one is turned 90°.",
             "তিনিটা চিত্ৰ একে অৱস্থানত; এটা ৯০° ঘূৰোৱা।")

# number of sides
for three, odd_shape in [("pentagon", "hexagon"), ("triangle", "square"), ("square", "pentagon"),
                         ("hexagon", "pentagon")]:
    opts = [make(three), make(three, 40), make(three, 80), make(odd_shape)]
    cls_item(opts, 3, f"Three figures have the same number of sides; the {odd_shape} differs.",
             "তিনিটা চিত্ৰত একেই সংখ্যক বাহু আছে; বেলেগটোত বেলেগ সংখ্যক বাহু আছে।")

# arrows up vs down
opts = [make("arrow", 0), make("arrow", 0, True), make("arrow", 0), make("arrow", 180)]
cls_item(opts, 3, "Three arrows point upwards; one points downwards.",
         "তিনিটা কাঁড় ওপৰলৈ; এটা তললৈ।")

append_nv("figure-analogy-classification", rows)