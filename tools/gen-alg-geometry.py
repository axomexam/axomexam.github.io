#!/usr/bin/env python3
"""Geometry: 95+ very hard bilingual questions."""

import math
import sys
sys.path.insert(0, "tools")
from algebra_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


# 1. triangle angle sum
for a, b in [(50, 60), (45, 75), (70, 40), (35, 85), (62, 48), (55, 65)]:
    c = 180 - a - b
    add(f"Two angles of a triangle are {a}° and {b}°. Find the third angle.",
        f"এটা ত্ৰিভুজৰ দুটা কোণ {as_num(a)}° আৰু {as_num(b)}°। তৃতীয় কোণ নিৰ্ণয় কৰা।",
        f"{c}°", [f"{c+10}°", f"{180-a}°", f"{a+b}°", f"{c-10}°"],
        f"The angles of a triangle add up to 180°. Third angle = 180° - {a}° - {b}° = {c}°.",
        f"ত্ৰিভুজৰ কোণৰ যোগফল ১৮০°। তৃতীয় কোণ = {as_num(c)}°।")

# 2. exterior angle
for a, b in [(45, 65), (70, 50), (35, 85), (60, 60)]:
    e = a + b
    add(f"In a triangle, two interior opposite angles are {a}° and {b}°. Find the exterior angle.",
        f"এটা ত্ৰিভুজৰ দুটা অন্তঃসম্মুখ কোণ {as_num(a)}° আৰু {as_num(b)}°। বহিঃকোণ নিৰ্ণয় কৰা।",
        f"{e}°", [f"{180-e}°", f"{a}°", f"{e+10}°", f"{e-10}°"],
        f"An exterior angle equals the sum of the two interior opposite angles: {a}° + {b}° = {e}°.",
        f"বহিঃকোণ = {as_num(a)}° + {as_num(b)}° = {as_num(e)}°।")

# 3. parallel lines
for a in [55, 70, 110, 125]:
    add(f"Two parallel lines are cut by a transversal. If one interior angle is {a}°, find the co-interior angle on the same side.",
        f"দুটা সমান্তৰাল ৰেখাক এডাল ছেদকে কাটিছে। এটা অন্তঃকোণ {as_num(a)}° হ'লে একে ফালৰ সহ-অন্তঃকোণ নিৰ্ণয় কৰা।",
        f"{180-a}°", [f"{a}°", f"{90-a}°", f"{180+a}°", f"{a+10}°"],
        f"Co-interior angles are supplementary: 180° - {a}° = {180-a}°.",
        f"সহ-অন্তঃকোণ পৰিপূৰক, সেয়ে {as_num(180-a)}°।")

# 4. circle inscribed angle
for central in [80, 100, 120, 140, 160]:
    v = central // 2
    add(f"In a circle, the central angle subtended by an arc is {central}°. Find the inscribed angle subtended by the same arc.",
        f"এটা বৃত্তত এটা চাপে কেন্দ্ৰত {as_num(central)}° কোণ কৰে। একে চাপে পৰিধিত কৰা কোণ নিৰ্ণয় কৰা।",
        f"{v}°", [f"{central}°", f"{180-v}°", f"{v*2}°", f"{v+10}°"],
        f"The inscribed angle is half the central angle: {central}°/2 = {v}°.",
        f"পৰিধি কোণ কেন্দ্ৰ কোণৰ আধা: {as_num(v)}°।")

# 5. cyclic quadrilateral
for a in [70, 85, 110, 125]:
    v = 180 - a
    add(f"In a cyclic quadrilateral, one angle is {a}°. Find the opposite angle.",
        f"এটা চক্ৰীয় চতুৰ্ভুজৰ এটা কোণ {as_num(a)}°। বিপৰীত কোণ নিৰ্ণয় কৰা।",
        f"{v}°", [f"{a}°", f"{90-a}°", f"{180+a}°", f"{v+10}°"],
        f"Opposite angles of a cyclic quadrilateral are supplementary: 180° - {a}° = {v}°.",
        f"চক্ৰীয় চতুৰ্ভুজৰ বিপৰীত কোণ পৰিপূৰক: {as_num(v)}°।")

# 6. tangent-radius
for a in [35, 40, 50, 55]:
    v = 90 - a
    add(f"A tangent touches a circle at P and PA is a chord making an angle of {a}° with the tangent. If the radius to P is drawn, find the angle between the chord and the radius.",
        f"এটা স্পৰ্শকে P বিন্দুত বৃত্ত স্পৰ্শ কৰে আৰু PA জ্যা স্পৰ্শকৰ সৈতে {as_num(a)}° কোণ কৰে। P লৈ ব্যাসাৰ্ধ টানিলে জ্যা আৰু ব্যাসাৰ্ধৰ মাজৰ কোণ নিৰ্ণয় কৰা।",
        f"{v}°", [f"{a}°", f"{90+a}°", f"{180-a}°", f"{v+5}°"],
        f"The radius is perpendicular to the tangent (90°), so the required angle is 90° - {a}° = {v}°.",
        f"ব্যাসাৰ্ধ স্পৰ্শকৰ লম্ব (৯০°), সেয়ে কোণ = {as_num(v)}°।")

# 7. similar triangles
for ab, de, bc in [(6, 9, 8), (5, 10, 7), (8, 12, 10), (4, 6, 9), (7, 14, 5)]:
    ef = bc * de // ab
    add(f"Triangles ABC and DEF are similar, with AB = {ab} cm, DE = {de} cm and BC = {bc} cm. Find EF.",
        f"ABC আৰু DEF ত্ৰিভুজ সদৃশ, AB = {as_num(ab)} ছেমি, DE = {as_num(de)} ছেমি আৰু BC = {as_num(bc)} ছেমি। EF নিৰ্ণয় কৰা।",
        f"{ef} cm", [f"{ef+1} cm", f"{ef-1} cm", f"{bc+de} cm", f"{ab*de//bc} cm"],
        f"Similar triangles have proportional sides: AB/DE = BC/EF, so EF = BC × DE/AB = {bc}×{de}/{ab} = {ef} cm.",
        f"সদৃশ ত্ৰিভুজৰ বাহু সমানুপাতী: EF = {as_num(ef)} ছেমি।")

# 8. Pythagoras
for a, b in [(3, 4), (5, 12), (8, 15), (7, 24), (9, 40), (20, 21)]:
    c = int(math.isqrt(a * a + b * b))
    add(f"In a right-angled triangle, the legs are {a} cm and {b} cm. Find the hypotenuse.",
        f"এটা সমকোণী ত্ৰিভুজৰ ভুজ দুটা {as_num(a)} ছেমি আৰু {as_num(b)} ছেমি। কৰ্ণ নিৰ্ণয় কৰা।",
        f"{c} cm", [f"{c+1} cm", f"{c-1} cm", f"{a+b} cm", f"{c+2} cm"],
        f"By Pythagoras' theorem, hypotenuse = √({a}² + {b}²) = √{a*a+b*b} = {c} cm.",
        f"পাইথাগোৰাছৰ উপপাদ্য অনুসৰি কৰ্ণ = {as_num(c)} ছেমি।")

# 9. polygon angles
for n in [5, 6, 8, 10, 12]:
    total = (n - 2) * 180
    each = total // n
    add(f"Find the sum of the interior angles of a regular polygon with {n} sides.",
        f"{as_num(n)} বাহু থকা সুষম বহুভুজৰ অন্তঃকোণৰ যোগফল নিৰ্ণয় কৰা।",
        f"{total}°", [f"{each}°", f"{360}°", f"{n*180}°", f"{total+180}°"],
        f"Sum of interior angles = (n - 2) × 180° = ({n} - 2) × 180° = {total}°.",
        f"অন্তঃকোণৰ যোগফল = ({as_num(n)} - ২) × ১৮০° = {as_num(total)}°।")
    add(f"Find each interior angle of a regular polygon with {n} sides.",
        f"{as_num(n)} বাহু থকা সুষম বহুভুজৰ প্ৰতিটো অন্তঃকোণ নিৰ্ণয় কৰা।",
        f"{each}°", [f"{total}°", f"{360//n}°", f"{each+10}°", f"{each-10}°"],
        f"Each interior angle = (n - 2) × 180°/n = {total}°/{n} = {each}°.",
        f"প্ৰতিটো অন্তঃকোণ = {as_num(each)}°।")

# 10. angle bisector
for ab, ac, bd in [(6, 8, 3), (9, 12, 6), (10, 15, 4), (8, 14, 4)]:
    dc = bd * ac // ab
    add(f"In triangle ABC, AD bisects angle A. If AB = {ab} cm, AC = {ac} cm and BD = {bd} cm, find DC.",
        f"ত্ৰিভুজ ABC ত AD এ A কোণক দ্বিখণ্ডিত কৰে। AB = {as_num(ab)} ছেমি, AC = {as_num(ac)} ছেমি আৰু BD = {as_num(bd)} ছেমি হ'লে DC নিৰ্ণয় কৰা।",
        f"{dc} cm", [f"{dc+1} cm", f"{dc-1} cm", f"{bd} cm", f"{ab+ac} cm"],
        f"By the angle bisector theorem, BD/DC = AB/AC, so DC = BD × AC/AB = {bd}×{ac}/{ab} = {dc} cm.",
        f"কোণ দ্বিখণ্ডক উপপাদ্য অনুসৰি DC = {as_num(dc)} ছেমি।")

# 11. chord length
for r, d in [(5, 3), (13, 5), (10, 6), (17, 8), (25, 7)]:
    half = int(math.isqrt(r * r - d * d))
    chord = 2 * half
    add(f"A chord of a circle of radius {r} cm is at a distance of {d} cm from the centre. Find the length of the chord.",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ বৃত্তৰ এডাল জ্যা কেন্দ্ৰৰ পৰা {as_num(d)} ছেমি দূৰত। জ্যাডালৰ দীঘ নিৰ্ণয় কৰা।",
        f"{chord} cm", [f"{half} cm", f"{chord+2} cm", f"{r+d} cm", f"{chord-2} cm"],
        f"The perpendicular from the centre bisects the chord. Half-chord = √({r}² - {d}²) = {half} cm, so the chord is {chord} cm.",
        f"কেন্দ্ৰৰ পৰা লম্বে জ্যাক দ্বিখণ্ডিত কৰে। জ্যা = {as_num(chord)} ছেমি।")

# 12. area ratio
for r1, r2 in [(2, 3), (3, 4), (5, 7), (4, 9)]:
    ratio = f"{r1*r1}:{r2*r2}"
    add(f"The sides of two similar triangles are in the ratio {r1} : {r2}. Find the ratio of their areas.",
        f"দুটা সদৃশ ত্ৰিভুজৰ বাহুৰ অনুপাত {as_num(r1)} : {as_num(r2)}। তেওঁলোকৰ কালিৰ অনুপাত নিৰ্ণয় কৰা।",
        ratio, [f"{r1}:{r2}", f"{r2*r2}:{r1*r1}", f"{r1+r2}:{r2}"],
        f"The ratio of areas of similar triangles is the square of the side ratio: {r1}² : {r2}² = {ratio}.",
        f"সদৃশ ত্ৰিভুজৰ কালিৰ অনুপাত = {as_num(r1)}² : {as_num(r2)}² = {ratio}।")

# extra batch
for a, b in [(40, 60), (55, 35), (80, 30), (25, 95)]:
    c = 180 - a - b
    add(f"Two angles of a triangle are {a}° and {b}°. Find the third angle.",
        f"এটা ত্ৰিভুজৰ দুটা কোণ {as_num(a)}° আৰু {as_num(b)}°। তৃতীয় কোণ নিৰ্ণয় কৰা।",
        f"{c}°", [f"{c+10}°", f"{180-a}°", f"{a+b}°", f"{c-10}°"],
        f"Third angle = 180° - {a}° - {b}° = {c}°.",
        f"তৃতীয় কোণ = {as_num(c)}°।")

for a, b in [(40, 70), (55, 60), (80, 45)]:
    e = a + b
    add(f"In a triangle, two interior opposite angles are {a}° and {b}°. Find the exterior angle.",
        f"এটা ত্ৰিভুজৰ দুটা অন্তঃসম্মুখ কোণ {as_num(a)}° আৰু {as_num(b)}°। বহিঃকোণ নিৰ্ণয় কৰা।",
        f"{e}°", [f"{180-e}°", f"{a}°", f"{e+10}°", f"{e-10}°"],
        f"Exterior angle = {a}° + {b}° = {e}°.",
        f"বহিঃকোণ = {as_num(e)}°।")

for central in [70, 90, 110, 130]:
    v = central // 2
    add(f"In a circle, the central angle subtended by an arc is {central}°. Find the inscribed angle subtended by the same arc.",
        f"এটা বৃত্তত এটা চাপে কেন্দ্ৰত {as_num(central)}° কোণ কৰে। পৰিধি কোণ নিৰ্ণয় কৰা।",
        f"{v}°", [f"{central}°", f"{180-v}°", f"{v*2}°", f"{v+10}°"],
        f"Inscribed angle = {central}°/2 = {v}°.",
        f"পৰিধি কোণ = {as_num(v)}°।")

for a in [60, 95, 100, 135]:
    v = 180 - a
    add(f"In a cyclic quadrilateral, one angle is {a}°. Find the opposite angle.",
        f"এটা চক্ৰীয় চতুৰ্ভুজৰ এটা কোণ {as_num(a)}°। বিপৰীত কোণ নিৰ্ণয় কৰা।",
        f"{v}°", [f"{a}°", f"{90-a}°", f"{180+a}°", f"{v+10}°"],
        f"Opposite angle = 180° - {a}° = {v}°.",
        f"বিপৰীত কোণ = {as_num(v)}°।")

for ab, de, bc in [(9, 12, 6), (10, 15, 8), (12, 18, 10)]:
    ef = bc * de // ab
    add(f"Triangles ABC and DEF are similar, with AB = {ab} cm, DE = {de} cm and BC = {bc} cm. Find EF.",
        f"ABC আৰু DEF ত্ৰিভুজ সদৃশ, AB = {as_num(ab)} ছেমি, DE = {as_num(de)} ছেমি আৰু BC = {as_num(bc)} ছেমি। EF নিৰ্ণয় কৰা।",
        f"{ef} cm", [f"{ef+1} cm", f"{ef-1} cm", f"{bc+de} cm", f"{ab*de//bc} cm"],
        f"EF = {bc}×{de}/{ab} = {ef} cm.",
        f"EF = {as_num(ef)} ছেমি।")

for a, b in [(6, 8), (9, 12), (12, 16), (15, 20)]:
    c = int(math.isqrt(a * a + b * b))
    add(f"In a right-angled triangle, the legs are {a} cm and {b} cm. Find the hypotenuse.",
        f"এটা সমকোণী ত্ৰিভুজৰ ভুজ {as_num(a)} ছেমি আৰু {as_num(b)} ছেমি। কৰ্ণ নিৰ্ণয় কৰা।",
        f"{c} cm", [f"{c+1} cm", f"{c-1} cm", f"{a+b} cm", f"{c+2} cm"],
        f"Hypotenuse = √({a}²+{b}²) = {c} cm.",
        f"কৰ্ণ = {as_num(c)} ছেমি।")

for n in [7, 9, 15]:
    total = (n - 2) * 180
    each = total // n
    add(f"Find the sum of the interior angles of a regular polygon with {n} sides.",
        f"{as_num(n)} বাহু থকা সুষম বহুভুজৰ অন্তঃকোণৰ যোগফল নিৰ্ণয় কৰা।",
        f"{total}°", [f"{each}°", f"{360}°", f"{n*180}°", f"{total+180}°"],
        f"Sum = ({n}-2)×180° = {total}°.",
        f"যোগফল = {as_num(total)}°।")

for ab, ac, bd in [(12, 18, 8), (15, 20, 9), (14, 21, 6)]:
    dc = bd * ac // ab
    add(f"In triangle ABC, AD bisects angle A. If AB = {ab} cm, AC = {ac} cm and BD = {bd} cm, find DC.",
        f"ত্ৰিভুজ ABC ত AD এ A কোণক দ্বিখণ্ডিত কৰে। AB = {as_num(ab)} ছেমি, AC = {as_num(ac)} ছেমি আৰু BD = {as_num(bd)} ছেমি হ'লে DC নিৰ্ণয় কৰা।",
        f"{dc} cm", [f"{dc+1} cm", f"{dc-1} cm", f"{bd} cm", f"{ab+ac} cm"],
        f"DC = {bd}×{ac}/{ab} = {dc} cm.",
        f"DC = {as_num(dc)} ছেমি।")

for r, d in [(13, 12), (15, 9), (20, 12), (26, 10)]:
    half = int(math.isqrt(r * r - d * d))
    chord = 2 * half
    add(f"A chord of a circle of radius {r} cm is at a distance of {d} cm from the centre. Find the length of the chord.",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ বৃত্তৰ এডাল জ্যা কেন্দ্ৰৰ পৰা {as_num(d)} ছেমি দূৰত। জ্যাৰ দীঘ নিৰ্ণয় কৰা।",
        f"{chord} cm", [f"{half} cm", f"{chord+2} cm", f"{r+d} cm", f"{chord-2} cm"],
        f"Chord = 2√({r}²-{d}²) = {chord} cm.",
        f"জ্যা = {as_num(chord)} ছেমি।")

for r1, r2 in [(1, 2), (2, 5), (3, 5)]:
    ratio = f"{r1*r1}:{r2*r2}"
    add(f"The sides of two similar triangles are in the ratio {r1} : {r2}. Find the ratio of their areas.",
        f"দুটা সদৃশ ত্ৰিভুজৰ বাহুৰ অনুপাত {as_num(r1)} : {as_num(r2)}। কালিৰ অনুপাত নিৰ্ণয় কৰা।",
        ratio, [f"{r1}:{r2}", f"{r2*r2}:{r1*r1}", f"{r1+r2}:{r2}"],
        f"Area ratio = {r1}²:{r2}² = {ratio}.",
        f"কালিৰ অনুপাত = {ratio}।")

append("geometry", rows)
