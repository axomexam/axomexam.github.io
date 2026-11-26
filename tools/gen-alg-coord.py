#!/usr/bin/env python3
"""Coordinate Geometry: 95+ very hard bilingual questions."""

import math
import sys
from fractions import Fraction as F
sys.path.insert(0, "tools")
from algebra_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def fr(x):
    x = F(x)
    return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator}"


# 1. distance
for x1, y1, x2, y2 in [(0, 0, 3, 4), (1, 2, 4, 6), (-2, 3, 4, 11), (5, -1, 13, 4), (2, 3, 8, 11)]:
    v = int(math.isqrt((x2-x1)**2 + (y2-y1)**2))
    add(f"Find the distance between the points ({x1}, {y1}) and ({x2}, {y2}).",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) বিন্দু দুটাৰ মাজৰ দূৰত্ব নিৰ্ণয় কৰা।",
        v, [v + 1, v - 1, abs(x2-x1) + abs(y2-y1), v * 2],
        f"Distance = √(({x2}-{x1})² + ({y2}-{y1})²) = √{(x2-x1)**2+(y2-y1)**2} = {v}.",
        f"দূৰত্ব = √(({as_num(x2-x1)})² + ({as_num(y2-y1)})²) = {as_num(v)}।")

# 2. midpoint
for x1, y1, x2, y2 in [(2, 4, 8, 10), (-3, 5, 7, -1), (0, 0, 6, 8), (4, -2, 10, 6), (1, 3, 9, 11)]:
    mxv, myv = F(x1 + x2, 2), F(y1 + y2, 2)
    mx, my = fr(mxv), fr(myv)
    add(f"Find the midpoint of the line segment joining ({x1}, {y1}) and ({x2}, {y2}).",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) সংযোগ কৰা ৰেখাখণ্ডৰ মধ্যবিন্দু নিৰ্ণয় কৰা।",
        f"({mx}, {my})", [f"({x1+x2}, {y1+y2})", f"({x2-x1}, {y2-y1})", f"({fr(mxv+1)}, {fr(myv-1)})"],
        f"Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2) = ({mx}, {my}).",
        f"মধ্যবিন্দু = ({mx}, {my})।")

# 3. section formula
for x1, y1, x2, y2, m, n in [(2, 3, 8, 9, 1, 2), (1, 1, 7, 13, 2, 1), (0, 2, 6, 8, 1, 1), (4, 1, 10, 7, 2, 3)]:
    pxv, pyv = F(m*x2 + n*x1, m+n), F(m*y2 + n*y1, m+n)
    px, py = fr(pxv), fr(pyv)
    add(f"Find the point dividing the line segment joining ({x1}, {y1}) and ({x2}, {y2}) internally in the ratio {m} : {n}.",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) সংযোগ কৰা ৰেখাখণ্ডক {as_num(m)} : {as_num(n)} অনুপাতত অন্তৰ্ভাগত বিভক্ত কৰা বিন্দু নিৰ্ণয় কৰা।",
        f"({px}, {py})", [f"({py}, {px})", f"({x1+x2}, {y1+y2})", f"({fr(pxv+1)}, {fr(pyv-1)})"],
        f"Section formula: ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)) = ({px}, {py}).",
        f"বিভাজন সূত্ৰমতে বিন্দু ({px}, {py})।")

# 4. area of triangle
for x1, y1, x2, y2, x3, y3 in [(0, 0, 4, 0, 0, 3), (1, 2, 5, 2, 3, 7), (-2, 1, 3, 1, 1, 6), (0, 0, 6, 0, 0, 8), (2, 3, 8, 3, 5, 9)]:
    v = abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) // 2
    add(f"Find the area of the triangle with vertices ({x1}, {y1}), ({x2}, {y2}) and ({x3}, {y3}).",
        f"({as_num(x1)}, {as_num(y1)}), ({as_num(x2)}, {as_num(y2)}) আৰু ({as_num(x3)}, {as_num(y3)}) শীৰ্ষবিন্দু থকা ত্ৰিভুজৰ কালি নিৰ্ণয় কৰা।",
        v, [v * 2, v + 2, v - 2, abs(x2-x1) * abs(y3-y1)],
        f"Area = ½|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)| = ½ × {v*2} = {v} sq units.",
        f"কালি = ½|...| = {as_num(v)} বৰ্গ একক।")

# 5. slope
for x1, y1, x2, y2 in [(1, 2, 5, 10), (2, 3, 6, 11), (-1, 4, 3, 8), (3, 5, 7, 2), (0, 0, 4, 6)]:
    m = F(y2 - y1, x2 - x1)
    add(f"Find the slope of the line joining ({x1}, {y1}) and ({x2}, {y2}).",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) সংযোগ কৰা ৰেখাৰ ঢাল নিৰ্ণয় কৰা।",
        fr(m), [fr(-m), fr(F(x2-x1, y2-y1)), fr(m + 1)],
        f"Slope = (y₂-y₁)/(x₂-x₁) = ({y2}-{y1})/({x2}-{x1}) = {fr(m)}.",
        f"ঢাল = ({as_num(y2-y1)})/({as_num(x2-x1)}) = {fr(m)}।")

# 6. equation of line
for m, c in [(2, 3), (-3, 5), (4, -2), (-1, 7)]:
    add(f"Find the equation of the line with slope {m} and y-intercept {c}.",
        f"ঢাল {as_num(m)} আৰু y-ছেদ {as_num(c)} থকা ৰেখাৰ সমীকৰণ নিৰ্ণয় কৰা।",
        f"y = {m}x {'+' if c >= 0 else '-'} {abs(c)}",
        [f"y = {m}x {'-' if c >= 0 else '+'} {abs(c)}", f"y = {c}x + {m}", f"y = -{m}x + {c}"],
        f"Using y = mx + c, the equation is y = {m}x {'+' if c>=0 else '-'} {abs(c)}.",
        f"y = mx + c ব্যৱহাৰ কৰি সমীকৰণ y = {as_num(m)}x {'+' if c>=0 else '-'} {as_num(abs(c))}।")

# 7. parallel line
for m, x0, y0 in [(3, 1, 2), (2, 3, 5), (-4, 2, 1)]:
    c = y0 - m * x0
    add(f"Find the equation of the line parallel to y = {m}x + 1 passing through ({x0}, {y0}).",
        f"y = {as_num(m)}x + 1 ৰ সমান্তৰাল আৰু ({as_num(x0)}, {as_num(y0)}) ৰ মাজেৰে যোৱা ৰেখাৰ সমীকৰণ নিৰ্ণয় কৰা।",
        f"y = {m}x {'+' if c >= 0 else '-'} {abs(c)}",
        [f"y = -{m}x + {c}", f"y = {m}x + {c+2}", f"y = {m}x {'-' if c >= 0 else '+'} {abs(c)}"],
        f"Parallel lines have equal slope {m}. Using y - {y0} = {m}(x - {x0}) gives y = {m}x {'+' if c>=0 else '-'} {abs(c)}.",
        f"সমান্তৰাল ৰেখাৰ ঢাল সমান; সেয়ে y = {as_num(m)}x {'+' if c>=0 else '-'} {as_num(abs(c))}।")

# 8. perpendicular slope
for m in [2, 3, -4, 5, -2]:
    v = F(-1, m)
    add(f"Find the slope of a line perpendicular to a line of slope {m}.",
        f"ঢাল {as_num(m)} থকা ৰেখাৰ লম্ব ৰেখাৰ ঢাল নিৰ্ণয় কৰা।",
        fr(v), [fr(m), fr(-m), fr(F(1, m))],
        f"For perpendicular lines m₁m₂ = -1, so the slope is -1/{m} = {fr(v)}.",
        f"লম্ব ৰেখাৰ বাবে m₁m₂ = -1, সেয়ে ঢাল {fr(v)}।")

# 9. collinearity
for pts, ans in [((1, 2, 2, 4, 3, 6), "Yes"), ((1, 1, 2, 3, 4, 5), "No"), ((0, 0, 2, 2, 5, 5), "Yes")]:
    x1, y1, x2, y2, x3, y3 = pts
    area = abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))
    add(f"Check whether the points ({x1}, {y1}), ({x2}, {y2}) and ({x3}, {y3}) are collinear.",
        f"({as_num(x1)}, {as_num(y1)}), ({as_num(x2)}, {as_num(y2)}) আৰু ({as_num(x3)}, {as_num(y3)}) বিন্দু তিনিটা সমৰেখীয় হয় নে নহয় পৰীক্ষা কৰা।",
        ans, ["Yes", "No", "Cannot be determined", "Only two are collinear"],
        f"The area of the triangle formed is {'0' if area==0 else str(area//2)}, so the points are {'collinear' if area==0 else 'not collinear'}.",
        f"গঠিত ত্ৰিভুজৰ কালি {'০' if area==0 else as_num(area//2)}, সেয়ে বিন্দুবোৰ {'সমৰেখীয়' if area==0 else 'সমৰেখীয় নহয়'}।")

# 10. intercepts
for a, b in [(3, 4), (5, 2), (4, 6)]:
    eq = f"{b}x + {a}y = {a*b}"
    add(f"Find the x-intercept of the line {eq}.",
        f"{eq} ৰেখাৰ x-ছেদ নিৰ্ণয় কৰা।",
        a, [b, a + b, a * b, -a],
        f"Putting y = 0 gives {b}x = {a*b}, so x = {a}.",
        f"y = 0 বহুৱালে x = {as_num(a)}।")
    add(f"Find the y-intercept of the line {eq}.",
        f"{eq} ৰেখাৰ y-ছেদ নিৰ্ণয় কৰা।",
        b, [a, a + b, a * b, -b],
        f"Putting x = 0 gives {a}y = {a*b}, so y = {b}.",
        f"x = 0 বহুৱালে y = {as_num(b)}।")

# 11. circle
for g, f, c, r in [(2, 3, 9, 2), (1, 2, 4, 1), (3, 4, 21, 2)]:
    add(f"Find the radius of the circle x² + y² - {2*g}x - {2*f}y + {c} = 0.",
        f"x² + y² - {as_num(2*g)}x - {as_num(2*f)}y + {as_num(c)} = 0 বৃত্তৰ ব্যাসাৰ্ধ নিৰ্ণয় কৰা।",
        r, [r + 1, r - 1, g + f, r * 2],
        f"Centre = ({g}, {f}); radius = √(g² + f² - c) = √({g}² + {f}² - {c}) = {r}.",
        f"কেন্দ্ৰ = ({as_num(g)}, {as_num(f)}); ব্যাসাৰ্ধ = {as_num(r)}।")

# extra batch
for x1, y1, x2, y2 in [(0, 0, 5, 12), (2, 1, 5, 5), (-3, 2, 5, 8), (4, 3, 10, 11)]:
    v = int(math.isqrt((x2-x1)**2 + (y2-y1)**2))
    add(f"Find the distance between the points ({x1}, {y1}) and ({x2}, {y2}).",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) বিন্দু দুটাৰ মাজৰ দূৰত্ব নিৰ্ণয় কৰা।",
        v, [v + 1, v - 1, abs(x2-x1) + abs(y2-y1), v * 2],
        f"Distance = {v}.",
        f"দূৰত্ব = {as_num(v)}।")

for x1, y1, x2, y2 in [(1, 2, 5, 8), (-2, 4, 6, 10), (3, 1, 9, 7)]:
    mxv, myv = F(x1 + x2, 2), F(y1 + y2, 2)
    mx, my = fr(mxv), fr(myv)
    add(f"Find the midpoint of the line segment joining ({x1}, {y1}) and ({x2}, {y2}).",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) সংযোগ কৰা ৰেখাখণ্ডৰ মধ্যবিন্দু নিৰ্ণয় কৰা।",
        f"({mx}, {my})", [f"({x1+x2}, {y1+y2})", f"({x2-x1}, {y2-y1})", f"({fr(mxv+1)}, {fr(myv-1)})"],
        f"Midpoint = ({mx}, {my}).",
        f"মধ্যবিন্দু = ({mx}, {my})।")

for x1, y1, x2, y2, x3, y3 in [(0, 0, 5, 0, 0, 4), (1, 1, 6, 1, 3, 5), (2, 2, 7, 2, 4, 9)]:
    v = abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) // 2
    add(f"Find the area of the triangle with vertices ({x1}, {y1}), ({x2}, {y2}) and ({x3}, {y3}).",
        f"({as_num(x1)}, {as_num(y1)}), ({as_num(x2)}, {as_num(y2)}) আৰু ({as_num(x3)}, {as_num(y3)}) শীৰ্ষবিন্দু থকা ত্ৰিভুজৰ কালি নিৰ্ণয় কৰা।",
        v, [v * 2, v + 2, v - 2, abs(x2-x1) * abs(y3-y1)],
        f"Area = {v} sq units.",
        f"কালি = {as_num(v)} বৰ্গ একক।")

for x1, y1, x2, y2 in [(1, 1, 3, 7), (2, 5, 6, 9), (-1, 2, 3, 6)]:
    m = F(y2 - y1, x2 - x1)
    add(f"Find the slope of the line joining ({x1}, {y1}) and ({x2}, {y2}).",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) সংযোগ কৰা ৰেখাৰ ঢাল নিৰ্ণয় কৰা।",
        fr(m), [fr(-m), fr(F(x2-x1, y2-y1)), fr(m + 1)],
        f"Slope = {fr(m)}.",
        f"ঢাল = {fr(m)}।")

for m, c in [(3, 2), (-2, 6), (5, -1)]:
    add(f"Find the equation of the line with slope {m} and y-intercept {c}.",
        f"ঢাল {as_num(m)} আৰু y-ছেদ {as_num(c)} থকা ৰেখাৰ সমীকৰণ নিৰ্ণয় কৰা।",
        f"y = {m}x {'+' if c >= 0 else '-'} {abs(c)}",
        [f"y = {m}x {'-' if c >= 0 else '+'} {abs(c)}", f"y = {c}x + {m}", f"y = -{m}x + {c}"],
        f"y = {m}x {'+' if c>=0 else '-'} {abs(c)}.",
        f"y = {as_num(m)}x {'+' if c>=0 else '-'} {as_num(abs(c))}।")

for m in [4, -3, 6]:
    v = F(-1, m)
    add(f"Find the slope of a line perpendicular to a line of slope {m}.",
        f"ঢাল {as_num(m)} থকা ৰেখাৰ লম্ব ৰেখাৰ ঢাল নিৰ্ণয় কৰা।",
        fr(v), [fr(m), fr(-m), fr(F(1, m))],
        f"Slope = -1/{m} = {fr(v)}.",
        f"ঢাল = {fr(v)}।")

for g, f, c, r in [(1, 1, 1, 1), (2, 2, 8, 0)]:
    add(f"Find the radius of the circle x² + y² - {2*g}x - {2*f}y + {c} = 0.",
        f"x² + y² - {as_num(2*g)}x - {as_num(2*f)}y + {as_num(c)} = 0 বৃত্তৰ ব্যাসাৰ্ধ নিৰ্ণয় কৰা।",
        r, [r + 1, r + 2, g + f, r * 2],
        f"Radius = √({g}²+{f}²-{c}) = {r}.",
        f"ব্যাসাৰ্ধ = {as_num(r)}।")

for a, b in [(2, 5), (6, 3)]:
    eq = f"{b}x + {a}y = {a*b}"
    add(f"Find the x-intercept of the line {eq}.",
        f"{eq} ৰেখাৰ x-ছেদ নিৰ্ণয় কৰা।",
        a, [b, a + b, a * b, -a],
        f"x = {a}.",
        f"x = {as_num(a)}।")

# final batch
for x1, y1, x2, y2 in [(0, 0, 6, 8), (1, 3, 4, 7), (-2, -3, 4, 5), (7, 1, 13, 9)]:
    v = int(math.isqrt((x2-x1)**2 + (y2-y1)**2))
    add(f"Find the distance between the points ({x1}, {y1}) and ({x2}, {y2}).",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) বিন্দু দুটাৰ মাজৰ দূৰত্ব নিৰ্ণয় কৰা।",
        v, [v + 1, v - 1, abs(x2-x1) + abs(y2-y1), v * 2],
        f"Distance = {v}.",
        f"দূৰত্ব = {as_num(v)}।")

for x1, y1, x2, y2 in [(1, 5, 7, 9), (-2, 6, 4, -2), (3, 3, 9, 11)]:
    mxv, myv = F(x1 + x2, 2), F(y1 + y2, 2)
    mx, my = fr(mxv), fr(myv)
    add(f"Find the midpoint of the line segment joining ({x1}, {y1}) and ({x2}, {y2}).",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) সংযোগ কৰা ৰেখাখণ্ডৰ মধ্যবিন্দু নিৰ্ণয় কৰা।",
        f"({mx}, {my})", [f"({x1+x2}, {y1+y2})", f"({x2-x1}, {y2-y1})", f"({fr(mxv+1)}, {fr(myv-1)})"],
        f"Midpoint = ({mx}, {my}).",
        f"মধ্যবিন্দু = ({mx}, {my})।")

for x1, y1, x2, y2, m, n in [(0, 0, 6, 9, 1, 2), (2, 4, 8, 10, 1, 2), (1, 2, 7, 10, 1, 2)]:
    pxv, pyv = F(m*x2 + n*x1, m+n), F(m*y2 + n*y1, m+n)
    px, py = fr(pxv), fr(pyv)
    add(f"Find the point dividing the line segment joining ({x1}, {y1}) and ({x2}, {y2}) internally in the ratio {m} : {n}.",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) সংযোগ কৰা ৰেখাখণ্ডক {as_num(m)} : {as_num(n)} অনুপাতত অন্তৰ্ভাগত বিভক্ত কৰা বিন্দু নিৰ্ণয় কৰা।",
        f"({px}, {py})", [f"({py}, {px})", f"({x1+x2}, {y1+y2})", f"({fr(pxv+1)}, {fr(pyv-1)})"],
        f"Point = ({px}, {py}).",
        f"বিন্দু = ({px}, {py})।")

for x1, y1, x2, y2, x3, y3 in [(0, 0, 4, 0, 0, 5), (1, 1, 5, 1, 3, 6), (2, 2, 8, 2, 5, 8)]:
    v = abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) // 2
    add(f"Find the area of the triangle with vertices ({x1}, {y1}), ({x2}, {y2}) and ({x3}, {y3}).",
        f"({as_num(x1)}, {as_num(y1)}), ({as_num(x2)}, {as_num(y2)}) আৰু ({as_num(x3)}, {as_num(y3)}) শীৰ্ষবিন্দু থকা ত্ৰিভুজৰ কালি নিৰ্ণয় কৰা।",
        v, [v * 2, v + 2, v - 2, abs(x2-x1) * abs(y3-y1)],
        f"Area = {v} sq units.",
        f"কালি = {as_num(v)} বৰ্গ একক।")

for x1, y1, x2, y2 in [(1, 2, 3, 8), (2, 1, 6, 9), (0, 3, 4, 11)]:
    m = F(y2 - y1, x2 - x1)
    add(f"Find the slope of the line joining ({x1}, {y1}) and ({x2}, {y2}).",
        f"({as_num(x1)}, {as_num(y1)}) আৰু ({as_num(x2)}, {as_num(y2)}) সংযোগ কৰা ৰেখাৰ ঢাল নিৰ্ণয় কৰা।",
        fr(m), [fr(-m), fr(F(x2-x1, y2-y1)), fr(m + 1)],
        f"Slope = {fr(m)}.",
        f"ঢাল = {fr(m)}।")

for m, c in [(2, 5), (-3, 4), (6, -2)]:
    add(f"Find the equation of the line with slope {m} and y-intercept {c}.",
        f"ঢাল {as_num(m)} আৰু y-ছেদ {as_num(c)} থকা ৰেখাৰ সমীকৰণ নিৰ্ণয় কৰা।",
        f"y = {m}x {'+' if c >= 0 else '-'} {abs(c)}",
        [f"y = {m}x {'-' if c >= 0 else '+'} {abs(c)}", f"y = {c}x + {m}", f"y = -{m}x + {c}"],
        f"y = {m}x {'+' if c>=0 else '-'} {abs(c)}.",
        f"y = {as_num(m)}x {'+' if c>=0 else '-'} {as_num(abs(c))}।")

for m in [7, -8]:
    v = F(-1, m)
    add(f"Find the slope of a line perpendicular to a line of slope {m}.",
        f"ঢাল {as_num(m)} থকা ৰেখাৰ লম্ব ৰেখাৰ ঢাল নিৰ্ণয় কৰা।",
        fr(v), [fr(m), fr(-m), fr(F(1, m))],
        f"Slope = -1/{m} = {fr(v)}.",
        f"ঢাল = {fr(v)}।")

for g, f, c, r in [(2, 1, 4, 1), (4, 3, 24, 1)]:
    add(f"Find the radius of the circle x² + y² - {2*g}x - {2*f}y + {c} = 0.",
        f"x² + y² - {as_num(2*g)}x - {as_num(2*f)}y + {as_num(c)} = 0 বৃত্তৰ ব্যাসাৰ্ধ নিৰ্ণয় কৰা।",
        r, [r + 1, r + 2, g + f, r * 2],
        f"Radius = {r}.",
        f"ব্যাসাৰ্ধ = {as_num(r)}।")

for a, b in [(4, 3), (5, 6)]:
    eq = f"{b}x + {a}y = {a*b}"
    add(f"Find the x-intercept of the line {eq}.",
        f"{eq} ৰেখাৰ x-ছেদ নিৰ্ণয় কৰা।",
        a, [b, a + b, a * b, -a],
        f"x = {a}.",
        f"x = {as_num(a)}।")

append("coordinate-geometry", rows)
