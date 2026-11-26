#!/usr/bin/env python3
"""Mensuration 2D: 95+ very hard bilingual questions. Uses π = 22/7."""

import math
import sys
sys.path.insert(0, "tools")
from algebra_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


PI = 22 / 7


def r2(x):
    return round(x, 2)


# 1. rectangle
for l, b in [(18, 12), (25, 16), (32, 24), (45, 28), (36, 15)]:
    add(f"Find the area of a rectangle of length {l} cm and breadth {b} cm.",
        f"{as_num(l)} ছেমি দীঘ আৰু {as_num(b)} ছেমি প্ৰস্থৰ আয়তৰ কালি নিৰ্ণয় কৰা।",
        l * b, [2 * (l + b), l * b // 2, (l + b) * 2, l * b + 10],
        f"Area of a rectangle = length × breadth = {l} × {b} = {l*b} cm².",
        f"আয়তৰ কালি = দীঘ × প্ৰস্থ = {as_num(l*b)} বৰ্গ ছেমি।")
    add(f"Find the perimeter of a rectangle of length {l} cm and breadth {b} cm.",
        f"{as_num(l)} ছেমি দীঘ আৰু {as_num(b)} ছেমি প্ৰস্থৰ আয়তৰ পৰিসীমা নিৰ্ণয় কৰা।",
        2 * (l + b), [l * b, l + b, 2 * l + b, 2 * (l + b) + 4],
        f"Perimeter = 2(length + breadth) = 2({l} + {b}) = {2*(l+b)} cm.",
        f"পৰিসীমা = ২(দীঘ + প্ৰস্থ) = {as_num(2*(l+b))} ছেমি।")

# 2. square
for s in [12, 15, 18, 21, 25]:
    add(f"Find the area of a square of side {s} cm.",
        f"{as_num(s)} ছেমি বাহুৰ বৰ্গৰ কালি নিৰ্ণয় কৰা।",
        s * s, [4 * s, s * s // 2, s * s + s, 2 * s],
        f"Area of a square = side² = {s}² = {s*s} cm².",
        f"বৰ্গৰ কালি = বাহু² = {as_num(s*s)} বৰ্গ ছেমি।")
    add(f"Find the perimeter of a square of side {s} cm.",
        f"{as_num(s)} ছেমি বাহুৰ বৰ্গৰ পৰিসীমা নিৰ্ণয় কৰা।",
        4 * s, [s * s, 2 * s, 4 * s + 4, s],
        f"Perimeter = 4 × side = 4 × {s} = {4*s} cm.",
        f"পৰিসীমা = ৪ × বাহু = {as_num(4*s)} ছেমি।")

# 3. triangle
for b, h in [(16, 9), (24, 15), (30, 18), (14, 21), (36, 25)]:
    add(f"Find the area of a triangle with base {b} cm and height {h} cm.",
        f"{as_num(b)} ছেমি ভূমি আৰু {as_num(h)} ছেমি উচ্চতাৰ ত্ৰিভুজৰ কালি নিৰ্ণয় কৰা।",
        b * h // 2, [b * h, b * h // 2 + 10, (b + h), b * h // 4],
        f"Area of a triangle = ½ × base × height = ½ × {b} × {h} = {b*h//2} cm².",
        f"ত্ৰিভুজৰ কালি = ½ × ভূমি × উচ্চতা = {as_num(b*h//2)} বৰ্গ ছেমি।")

for a, b, c in [(13, 14, 15), (5, 12, 13), (9, 10, 17), (6, 25, 29)]:
    s = (a + b + c) / 2
    area = int(math.isqrt(int(s * (s - a) * (s - b) * (s - c))))
    add(f"Find the area of a triangle with sides {a} cm, {b} cm and {c} cm.",
        f"বাহু {as_num(a)} ছেমি, {as_num(b)} ছেমি আৰু {as_num(c)} ছেমি থকা ত্ৰিভুজৰ কালি নিৰ্ণয় কৰা।",
        area, [area + 6, area - 6, a + b + c, area * 2],
        f"By Heron's formula, s = ({a}+{b}+{c})/2 = {int(s)} and area = √(s(s-a)(s-b)(s-c)) = {area} cm².",
        f"হিৰণৰ সূত্ৰমতে কালি = {as_num(area)} বৰ্গ ছেমি।")

# 4. circle
for r in [7, 14, 21, 28]:
    add(f"Find the area of a circle of radius {r} cm. (Take π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ বৃত্তৰ কালি নিৰ্ণয় কৰা। (π = 22/7 লোৱা)",
        int(PI * r * r), [int(2 * PI * r), int(PI * r * r / 2), int(PI * r), int(PI * r * r) + 22],
        f"Area = πr² = (22/7) × {r}² = {int(PI*r*r)} cm².",
        f"কালি = πr² = {as_num(int(PI*r*r))} বৰ্গ ছেমি।")
    add(f"Find the circumference of a circle of radius {r} cm. (Take π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ বৃত্তৰ পৰিধি নিৰ্ণয় কৰা। (π = 22/7 লোৱা)",
        int(2 * PI * r), [int(PI * r * r), int(PI * r), int(4 * PI * r), int(2 * PI * r) + 22],
        f"Circumference = 2πr = 2 × (22/7) × {r} = {int(2*PI*r)} cm.",
        f"পৰিধি = 2πr = {as_num(int(2*PI*r))} ছেমি।")

# 5. semicircle
for r in [7, 14, 21]:
    add(f"Find the area of a semicircle of radius {r} cm. (Take π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ অৰ্ধবৃত্তৰ কালি নিৰ্ণয় কৰা। (π = 22/7 লোৱা)",
        int(PI * r * r / 2), [int(PI * r * r), int(PI * r), int(2 * PI * r)],
        f"Area of a semicircle = ½πr² = ½ × (22/7) × {r}² = {int(PI*r*r/2)} cm².",
        f"অৰ্ধবৃত্তৰ কালি = {as_num(int(PI*r*r/2))} বৰ্গ ছেমি।")

# 6. trapezium
for a, b, h in [(12, 18, 10), (15, 25, 12), (20, 32, 15), (8, 14, 9)]:
    v = (a + b) * h // 2
    add(f"Find the area of a trapezium with parallel sides {a} cm and {b} cm and height {h} cm.",
        f"সমান্তৰাল বাহু {as_num(a)} ছেমি আৰু {as_num(b)} ছেমি, উচ্চতা {as_num(h)} ছেমি থকা ট্ৰেপিজিয়ামৰ কালি নিৰ্ণয় কৰা।",
        v, [v * 2, (a + b) * h, v + h, a * b],
        f"Area of a trapezium = ½(a + b)h = ½({a}+{b})×{h} = {v} cm².",
        f"ট্ৰেপিজিয়ামৰ কালি = {as_num(v)} বৰ্গ ছেমি।")

# 7. parallelogram
for b, h in [(18, 12), (25, 16), (32, 20), (14, 9)]:
    add(f"Find the area of a parallelogram with base {b} cm and height {h} cm.",
        f"{as_num(b)} ছেমি ভূমি আৰু {as_num(h)} ছেমি উচ্চতাৰ সমান্তৰাল চতুৰ্ভুজৰ কালি নিৰ্ণয় কৰা।",
        b * h, [b * h // 2, 2 * (b + h), b + h, b * h + h],
        f"Area of a parallelogram = base × height = {b} × {h} = {b*h} cm².",
        f"সমান্তৰাল চতুৰ্ভুজৰ কালি = {as_num(b*h)} বৰ্গ ছেমি।")

# 8. rhombus
for d1, d2 in [(16, 12), (24, 10), (30, 18), (14, 48)]:
    v = d1 * d2 // 2
    add(f"Find the area of a rhombus whose diagonals are {d1} cm and {d2} cm.",
        f"কৰ্ণ {as_num(d1)} ছেমি আৰু {as_num(d2)} ছেমি থকা ৰম্বাছৰ কালি নিৰ্ণয় কৰা।",
        v, [d1 * d2, v * 2, d1 + d2, v + d1],
        f"Area of a rhombus = ½ × d₁ × d₂ = ½ × {d1} × {d2} = {v} cm².",
        f"ৰম্বাছৰ কালি = {as_num(v)} বৰ্গ ছেমি।")

# 9. sector
for theta, r in [(90, 14), (60, 21), (120, 21), (90, 28)]:
    area = int(theta / 360 * PI * r * r)
    arc = int(theta / 360 * 2 * PI * r)
    add(f"Find the area of a sector of angle {theta}° in a circle of radius {r} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ বৃত্তত {as_num(theta)}° কোণৰ বৃত্তখণ্ডৰ কালি নিৰ্ণয় কৰা। (π = 22/7)",
        area, [arc, area * 2, area // 2, int(PI * r * r)],
        f"Area of a sector = (θ/360) × πr² = ({theta}/360) × (22/7) × {r}² = {area} cm².",
        f"বৃত্তখণ্ডৰ কালি = {as_num(area)} বৰ্গ ছেমি।")
    add(f"Find the length of the arc of a sector of angle {theta}° in a circle of radius {r} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ বৃত্তত {as_num(theta)}° কোণৰ বৃত্তখণ্ডৰ চাপৰ দীঘ নিৰ্ণয় কৰা। (π = 22/7)",
        arc, [area, arc * 2, int(2 * PI * r), arc + 7],
        f"Arc length = (θ/360) × 2πr = ({theta}/360) × 2 × (22/7) × {r} = {arc} cm.",
        f"চাপৰ দীঘ = {as_num(arc)} ছেমি।")

# 10. annulus
for R, r in [(14, 7), (21, 14), (28, 21)]:
    v = int(PI * (R * R - r * r))
    add(f"Find the area of a ring between two concentric circles of radii {R} cm and {r} cm. (π = 22/7)",
        f"{as_num(R)} ছেমি আৰু {as_num(r)} ছেমি ব্যাসাৰ্ধৰ দুটা এককেন্দ্ৰিক বৃত্তৰ মাজৰ আঙঠিৰ কালি নিৰ্ণয় কৰা। (π = 22/7)",
        v, [int(PI * R * R), int(PI * r * r), v * 2, int(PI * (R + r))],
        f"Area of the ring = π(R² - r²) = (22/7)({R}² - {r}²) = {v} cm².",
        f"আঙঠিৰ কালি = {as_num(v)} বৰ্গ ছেমি।")

# 11. equilateral triangle
for a in [4, 6, 8, 10, 12]:
    add(f"Find the area of an equilateral triangle of side {a} cm.",
        f"{as_num(a)} ছেমি বাহুৰ সমবাহু ত্ৰিভুজৰ কালি নিৰ্ণয় কৰা।",
        f"{a*a}√3/4 cm²", [f"{a*a}√3/2 cm²", f"{a*a}/4 cm²", f"{3*a}√3/4 cm²"],
        f"Area = (√3/4)a² = (√3/4) × {a}² = {a*a}√3/4 cm².",
        f"কালি = (√3/4)a² = {as_num(a*a)}√3/4 বৰ্গ ছেমি।")

# 12. combined figure
for l, b, r in [(14, 10, 7), (20, 14, 7), (28, 20, 14)]:
    v = l * b + int(PI * r * r / 2)
    add(f"A rectangle of length {l} cm and breadth {b} cm has a semicircle of radius {r} cm attached to one of its sides. Find the total area. (π = 22/7)",
        f"{as_num(l)} ছেমি দীঘ আৰু {as_num(b)} ছেমি প্ৰস্থৰ আয়তৰ এটা বাহুত {as_num(r)} ছেমি ব্যাসাৰ্ধৰ অৰ্ধবৃত্ত সংযুক্ত। মুঠ কালি নিৰ্ণয় কৰা। (π = 22/7)",
        v, [l * b, l * b + int(PI * r * r), v + r, v * 2],
        f"Total area = rectangle + semicircle = {l}×{b} + ½×(22/7)×{r}² = {l*b} + {int(PI*r*r/2)} = {v} cm².",
        f"মুঠ কালি = {as_num(v)} বৰ্গ ছেমি।")

# extra batch
for l, b in [(22, 14), (30, 18), (40, 25), (48, 36)]:
    add(f"Find the area of a rectangle of length {l} cm and breadth {b} cm.",
        f"{as_num(l)} ছেমি দীঘ আৰু {as_num(b)} ছেমি প্ৰস্থৰ আয়তৰ কালি নিৰ্ণয় কৰা।",
        l * b, [2 * (l + b), l * b // 2, (l + b) * 2, l * b + 10],
        f"Area = {l}×{b} = {l*b} cm².",
        f"কালি = {as_num(l*b)} বৰ্গ ছেমি।")

for s in [14, 16, 20, 24]:
    add(f"Find the area of a square of side {s} cm.",
        f"{as_num(s)} ছেমি বাহুৰ বৰ্গৰ কালি নিৰ্ণয় কৰা।",
        s * s, [4 * s, s * s // 2, s * s + s, 2 * s],
        f"Area = {s}² = {s*s} cm².",
        f"কালি = {as_num(s*s)} বৰ্গ ছেমি।")

for b, h in [(18, 12), (20, 14), (28, 16)]:
    add(f"Find the area of a triangle with base {b} cm and height {h} cm.",
        f"{as_num(b)} ছেমি ভূমি আৰু {as_num(h)} ছেমি উচ্চতাৰ ত্ৰিভুজৰ কালি নিৰ্ণয় কৰা।",
        b * h // 2, [b * h, b * h // 2 + 10, (b + h), b * h // 4],
        f"Area = ½×{b}×{h} = {b*h//2} cm².",
        f"কালি = {as_num(b*h//2)} বৰ্গ ছেমি।")

for r in [14, 21, 35]:
    add(f"Find the area of a circle of radius {r} cm. (Take π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ বৃত্তৰ কালি নিৰ্ণয় কৰা। (π = 22/7 লোৱা)",
        int(PI * r * r), [int(2 * PI * r), int(PI * r * r / 2), int(PI * r), int(PI * r * r) + 22],
        f"Area = (22/7)×{r}² = {int(PI*r*r)} cm².",
        f"কালি = {as_num(int(PI*r*r))} বৰ্গ ছেমি।")

for a, b, h in [(10, 16, 8), (14, 22, 10), (18, 30, 12)]:
    v = (a + b) * h // 2
    add(f"Find the area of a trapezium with parallel sides {a} cm and {b} cm and height {h} cm.",
        f"সমান্তৰাল বাহু {as_num(a)} ছেমি আৰু {as_num(b)} ছেমি, উচ্চতা {as_num(h)} ছেমি থকা ট্ৰেপিজিয়ামৰ কালি নিৰ্ণয় কৰা।",
        v, [v * 2, (a + b) * h, v + h, a * b],
        f"Area = ½({a}+{b})×{h} = {v} cm².",
        f"কালি = {as_num(v)} বৰ্গ ছেমি।")

for b, h in [(20, 15), (24, 18), (30, 22)]:
    add(f"Find the area of a parallelogram with base {b} cm and height {h} cm.",
        f"{as_num(b)} ছেমি ভূমি আৰু {as_num(h)} ছেমি উচ্চতাৰ সমান্তৰাল চতুৰ্ভুজৰ কালি নিৰ্ণয় কৰা।",
        b * h, [b * h // 2, 2 * (b + h), b + h, b * h + h],
        f"Area = {b}×{h} = {b*h} cm².",
        f"কালি = {as_num(b*h)} বৰ্গ ছেমি।")

for d1, d2 in [(20, 15), (28, 16), (36, 22)]:
    v = d1 * d2 // 2
    add(f"Find the area of a rhombus whose diagonals are {d1} cm and {d2} cm.",
        f"কৰ্ণ {as_num(d1)} ছেমি আৰু {as_num(d2)} ছেমি থকা ৰম্বাছৰ কালি নিৰ্ণয় কৰা।",
        v, [d1 * d2, v * 2, d1 + d2, v + d1],
        f"Area = ½×{d1}×{d2} = {v} cm².",
        f"কালি = {as_num(v)} বৰ্গ ছেমি।")

for theta, r in [(45, 28), (72, 35)]:
    area = int(theta / 360 * PI * r * r)
    add(f"Find the area of a sector of angle {theta}° in a circle of radius {r} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ বৃত্তত {as_num(theta)}° কোণৰ বৃত্তখণ্ডৰ কালি নিৰ্ণয় কৰা। (π = 22/7)",
        area, [area * 2, area // 2, int(PI * r * r), area + 7],
        f"Area = ({theta}/360)×(22/7)×{r}² = {area} cm².",
        f"কালি = {as_num(area)} বৰ্গ ছেমি।")

for R, r in [(21, 7), (28, 14)]:
    v = int(PI * (R * R - r * r))
    add(f"Find the area of a ring between two concentric circles of radii {R} cm and {r} cm. (π = 22/7)",
        f"{as_num(R)} ছেমি আৰু {as_num(r)} ছেমি ব্যাসাৰ্ধৰ দুটা এককেন্দ্ৰিক বৃত্তৰ মাজৰ আঙঠিৰ কালি নিৰ্ণয় কৰা। (π = 22/7)",
        v, [int(PI * R * R), int(PI * r * r), v * 2, int(PI * (R + r))],
        f"Area = (22/7)({R}²-{r}²) = {v} cm².",
        f"কালি = {as_num(v)} বৰ্গ ছেমি।")

for a in [14, 16, 18]:
    add(f"Find the area of an equilateral triangle of side {a} cm.",
        f"{as_num(a)} ছেমি বাহুৰ সমবাহু ত্ৰিভুজৰ কালি নিৰ্ণয় কৰা।",
        f"{a*a}√3/4 cm²", [f"{a*a}√3/2 cm²", f"{a*a}/4 cm²", f"{3*a}√3/4 cm²"],
        f"Area = {a*a}√3/4 cm².",
        f"কালি = {as_num(a*a)}√3/4 বৰ্গ ছেমি।")

append("mensuration-2d", rows)
