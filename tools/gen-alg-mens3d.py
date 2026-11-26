#!/usr/bin/env python3
"""Mensuration 3D: 95+ very hard bilingual questions. Uses π = 22/7."""

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


# 1. cube
for a in [4, 6, 9, 12, 15]:
    add(f"Find the volume of a cube of side {a} cm.",
        f"{as_num(a)} ছেমি বাহুৰ ঘনকৰ আয়তন নিৰ্ণয় কৰা।",
        a ** 3, [6 * a * a, a * a, 4 * a, a ** 3 // 2],
        f"Volume of a cube = a³ = {a}³ = {a**3} cm³.",
        f"ঘনকৰ আয়তন = a³ = {as_num(a**3)} ঘন ছেমি।")
    add(f"Find the total surface area of a cube of side {a} cm.",
        f"{as_num(a)} ছেমি বাহুৰ ঘনকৰ মুঠ পৃষ্ঠকালি নিৰ্ণয় কৰা।",
        6 * a * a, [a ** 3, 4 * a * a, a * a, 6 * a],
        f"Total surface area of a cube = 6a² = 6 × {a}² = {6*a*a} cm².",
        f"ঘনকৰ মুঠ পৃষ্ঠকালি = 6a² = {as_num(6*a*a)} বৰ্গ ছেমি।")

# 2. cuboid
for l, b, h in [(12, 9, 8), (15, 10, 6), (20, 12, 10), (18, 14, 5)]:
    add(f"Find the volume of a cuboid of dimensions {l} cm × {b} cm × {h} cm.",
        f"{as_num(l)} × {as_num(b)} × {as_num(h)} ছেমি মাপৰ ঘনাবয়ৰ আয়তন নিৰ্ণয় কৰা।",
        l * b * h, [2 * (l*b + b*h + h*l), l*b + b*h, l*b*h // 2, l+b+h],
        f"Volume of a cuboid = l × b × h = {l} × {b} × {h} = {l*b*h} cm³.",
        f"ঘনাবয়ৰ আয়তন = {as_num(l*b*h)} ঘন ছেমি।")
    add(f"Find the total surface area of a cuboid of dimensions {l} cm × {b} cm × {h} cm.",
        f"{as_num(l)} × {as_num(b)} × {as_num(h)} ছেমি মাপৰ ঘনাবয়ৰ মুঠ পৃষ্ঠকালি নিৰ্ণয় কৰা।",
        2 * (l*b + b*h + h*l), [l*b*h, l*b + b*h + h*l, 2*(l+b+h), l*b*h // 2],
        f"Total surface area = 2(lb + bh + hl) = 2({l*b}+{b*h}+{h*l}) = {2*(l*b+b*h+h*l)} cm².",
        f"মুঠ পৃষ্ঠকালি = {as_num(2*(l*b+b*h+h*l))} বৰ্গ ছেমি।")

# 3. cylinder
for r, h in [(7, 10), (14, 15), (21, 20), (7, 24)]:
    add(f"Find the volume of a cylinder of radius {r} cm and height {h} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধ আৰু {as_num(h)} ছেমি উচ্চতাৰ চুঙাৰ আয়তন নিৰ্ণয় কৰা। (π = 22/7)",
        int(PI * r * r * h), [int(2 * PI * r * h), int(PI * r * h), int(PI * r * r), int(PI * r * r * h / 3)],
        f"Volume of a cylinder = πr²h = (22/7) × {r}² × {h} = {int(PI*r*r*h)} cm³.",
        f"চুঙাৰ আয়তন = {as_num(int(PI*r*r*h))} ঘন ছেমি।")
    add(f"Find the curved surface area of a cylinder of radius {r} cm and height {h} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধ আৰু {as_num(h)} ছেমি উচ্চতাৰ চুঙাৰ বক্ৰ পৃষ্ঠকালি নিৰ্ণয় কৰা। (π = 22/7)",
        int(2 * PI * r * h), [int(PI * r * r * h), int(2 * PI * r * (r + h)), int(PI * r * h), int(2 * PI * r)],
        f"Curved surface area = 2πrh = 2 × (22/7) × {r} × {h} = {int(2*PI*r*h)} cm².",
        f"বক্ৰ পৃষ্ঠকালি = {as_num(int(2*PI*r*h))} বৰ্গ ছেমি।")

# 4. cone
for r, h, l in [(7, 24, 25), (14, 48, 50), (21, 28, 35), (9, 12, 15)]:
    add(f"Find the volume of a cone of radius {r} cm and height {h} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধ আৰু {as_num(h)} ছেমি উচ্চতাৰ শংকুৰ আয়তন নিৰ্ণয় কৰা। (π = 22/7)",
        int(PI * r * r * h / 3), [int(PI * r * r * h), int(PI * r * l), int(2 * PI * r * h), int(PI * r * r * h / 2)],
        f"Volume of a cone = ⅓πr²h = ⅓ × (22/7) × {r}² × {h} = {int(PI*r*r*h/3)} cm³.",
        f"শংকুৰ আয়তন = {as_num(int(PI*r*r*h/3))} ঘন ছেমি।")
    add(f"Find the curved surface area of a cone of radius {r} cm and slant height {l} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধ আৰু {as_num(l)} ছেমি নতি উচ্চতাৰ শংকুৰ বক্ৰ পৃষ্ঠকালি নিৰ্ণয় কৰা। (π = 22/7)",
        int(PI * r * l), [int(PI * r * r), int(2 * PI * r * l), int(PI * r * l / 2), int(PI * r * r * l)],
        f"Curved surface area of a cone = πrl = (22/7) × {r} × {l} = {int(PI*r*l)} cm².",
        f"শংকুৰ বক্ৰ পৃষ্ঠকালি = {as_num(int(PI*r*l))} বৰ্গ ছেমি।")

# 5. sphere
for r in [7, 14, 21, 42]:
    add(f"Find the surface area of a sphere of radius {r} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ গোলকৰ পৃষ্ঠকালি নিৰ্ণয় কৰা। (π = 22/7)",
        int(4 * PI * r * r), [int(PI * r * r), int(2 * PI * r * r), int(4 * PI * r), int(4 * PI * r * r / 3)],
        f"Surface area of a sphere = 4πr² = 4 × (22/7) × {r}² = {int(4*PI*r*r)} cm².",
        f"গোলকৰ পৃষ্ঠকালি = {as_num(int(4*PI*r*r))} বৰ্গ ছেমি।")
    add(f"Find the volume of a sphere of radius {r} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ গোলকৰ আয়তন নিৰ্ণয় কৰা। (π = 22/7)",
        r2(4 / 3 * PI * r ** 3), [int(4 * PI * r * r), r2(2 / 3 * PI * r ** 3), int(PI * r ** 3), r2(4 / 3 * PI * r ** 2)],
        f"Volume of a sphere = (4/3)πr³ = (4/3) × (22/7) × {r}³ = {r2(4/3*PI*r**3)} cm³.",
        f"গোলকৰ আয়তন = {as_num(r2(4/3*PI*r**3))} ঘন ছেমি।")

# 6. hemisphere
for r in [7, 14, 21]:
    add(f"Find the total surface area of a hemisphere of radius {r} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ অৰ্ধগোলকৰ মুঠ পৃষ্ঠকালি নিৰ্ণয় কৰা। (π = 22/7)",
        int(3 * PI * r * r), [int(2 * PI * r * r), int(4 * PI * r * r), int(PI * r * r), int(3 * PI * r)],
        f"Total surface area of a hemisphere = 3πr² = 3 × (22/7) × {r}² = {int(3*PI*r*r)} cm².",
        f"অৰ্ধগোলকৰ মুঠ পৃষ্ঠকালি = {as_num(int(3*PI*r*r))} বৰ্গ ছেমি।")
    add(f"Find the volume of a hemisphere of radius {r} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ অৰ্ধগোলকৰ আয়তন নিৰ্ণয় কৰা। (π = 22/7)",
        r2(2 / 3 * PI * r ** 3), [r2(4 / 3 * PI * r ** 3), int(3 * PI * r * r), r2(PI * r ** 3), r2(2 * PI * r ** 2)],
        f"Volume of a hemisphere = (2/3)πr³ = (2/3) × (22/7) × {r}³ = {r2(2/3*PI*r**3)} cm³.",
        f"অৰ্ধগোলকৰ আয়তন = {as_num(r2(2/3*PI*r**3))} ঘন ছেমি।")

# 7. prism
for b, h, H in [(8, 6, 10), (12, 9, 15), (10, 8, 20), (16, 12, 25)]:
    v = b * h * H // 2
    add(f"Find the volume of a triangular prism whose triangular base has base {b} cm and height {h} cm, and whose length is {H} cm.",
        f"ত্ৰিভুজাকাৰ ভূমিৰ ভূমি {as_num(b)} ছেমি, উচ্চতা {as_num(h)} ছেমি আৰু দীঘ {as_num(H)} ছেমি থকা প্ৰিজমৰ আয়তন নিৰ্ণয় কৰা।",
        v, [b * h * H, v // 2, v * 2, (b + h) * H],
        f"Base area = ½ × {b} × {h} = {b*h//2} cm². Volume = base area × length = {b*h//2} × {H} = {v} cm³.",
        f"ভূমিৰ কালি = {as_num(b*h//2)}; আয়তন = {as_num(v)} ঘন ছেমি।")

# 8. pyramid
for a, h in [(6, 10), (8, 12), (10, 15), (12, 20)]:
    v = a * a * h // 3
    add(f"Find the volume of a square pyramid with base side {a} cm and height {h} cm.",
        f"ভূমিৰ বাহু {as_num(a)} ছেমি আৰু উচ্চতা {as_num(h)} ছেমি থকা বৰ্গ পিৰামিডৰ আয়তন নিৰ্ণয় কৰা।",
        v, [a * a * h, v * 2, v // 2, a * h],
        f"Base area = {a}² = {a*a} cm². Volume = ⅓ × base area × height = ⅓ × {a*a} × {h} = {v} cm³.",
        f"ভূমিৰ কালি = {as_num(a*a)}; আয়তন = {as_num(v)} ঘন ছেমি।")

# 9. scaling
for factor in [2, 3, 4]:
    add(f"If the radius of a sphere is multiplied by {factor}, by what factor does its volume become?",
        f"এটা গোলকৰ ব্যাসাৰ্ধ {as_num(factor)} গুণ কৰিলে আয়তন কিমান গুণ হ'ব?",
        factor ** 3, [factor, factor * factor, factor ** 3 // 2, factor + 3],
        f"Volume ∝ r³, so multiplying r by {factor} multiplies the volume by {factor}³ = {factor**3}.",
        f"আয়তন ∝ r³, সেয়ে {as_num(factor**3)} গুণ হ'ব।")

# 10. melting / recasting
for R, r in [(21, 7), (14, 7), (42, 14)]:
    n = (R // r) ** 3
    add(f"A sphere of radius {R} cm is melted and recast into small spheres of radius {r} cm. How many small spheres are obtained?",
        f"{as_num(R)} ছেমি ব্যাসাৰ্ধৰ গোলক গলাই {as_num(r)} ছেমি ব্যাসাৰ্ধৰ সৰু গোলকত পুনৰ্গঠন কৰা হয়। কিমান সৰু গোলক পোৱা যাব?",
        n, [n * 2, n // 2, (R // r) ** 2, R // r],
        f"Volume is conserved, so n = (R/r)³ = ({R}/{r})³ = {n}.",
        f"আয়তন সংৰক্ষিত থাকে, সেয়ে n = {as_num(n)}।")

# 11. diagonal
for a in [5, 7, 9, 11]:
    add(f"Find the length of the diagonal of a cube of side {a} cm.",
        f"{as_num(a)} ছেমি বাহুৰ ঘনকৰ কৰ্ণৰ দীঘ নিৰ্ণয় কৰা।",
        f"{a}√3 cm", [f"{a}√2 cm", f"{3*a} cm", f"{a*a}√3 cm"],
        f"Diagonal of a cube = a√3 = {a}√3 cm.",
        f"ঘনকৰ কৰ্ণ = {as_num(a)}√3 ছেমি।")

for l, b, h in [(3, 4, 12), (6, 8, 24), (5, 12, 84)]:
    d = int(math.isqrt(l*l + b*b + h*h))
    add(f"Find the length of the diagonal of a cuboid of dimensions {l} cm × {b} cm × {h} cm.",
        f"{as_num(l)} × {as_num(b)} × {as_num(h)} ছেমি মাপৰ ঘনাবয়ৰ কৰ্ণৰ দীঘ নিৰ্ণয় কৰা।",
        f"{d} cm", [f"{d+1} cm", f"{d-1} cm", f"{l+b+h} cm"],
        f"Diagonal = √(l²+b²+h²) = √({l}²+{b}²+{h}²) = {d} cm.",
        f"কৰ্ণ = {as_num(d)} ছেমি।")

# extra batch
for a in [5, 8, 10, 14]:
    add(f"Find the volume of a cube of side {a} cm.",
        f"{as_num(a)} ছেমি বাহুৰ ঘনকৰ আয়তন নিৰ্ণয় কৰা।",
        a ** 3, [6 * a * a, a * a, 4 * a, a ** 3 // 2],
        f"Volume = {a}³ = {a**3} cm³.",
        f"আয়তন = {as_num(a**3)} ঘন ছেমি।")
    add(f"Find the total surface area of a cube of side {a} cm.",
        f"{as_num(a)} ছেমি বাহুৰ ঘনকৰ মুঠ পৃষ্ঠকালি নিৰ্ণয় কৰা।",
        6 * a * a, [a ** 3, 4 * a * a, a * a, 6 * a],
        f"TSA = 6a² = {6*a*a} cm².",
        f"মুঠ পৃষ্ঠকালি = {as_num(6*a*a)} বৰ্গ ছেমি।")

for l, b, h in [(10, 8, 6), (14, 10, 8), (25, 15, 12)]:
    add(f"Find the volume of a cuboid of dimensions {l} cm × {b} cm × {h} cm.",
        f"{as_num(l)} × {as_num(b)} × {as_num(h)} ছেমি মাপৰ ঘনাবয়ৰ আয়তন নিৰ্ণয় কৰা।",
        l * b * h, [2 * (l*b + b*h + h*l), l*b + b*h, l*b*h // 2, l+b+h],
        f"Volume = {l}×{b}×{h} = {l*b*h} cm³.",
        f"আয়তন = {as_num(l*b*h)} ঘন ছেমি।")

for r, h in [(7, 20), (14, 10), (21, 30)]:
    add(f"Find the volume of a cylinder of radius {r} cm and height {h} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধ আৰু {as_num(h)} ছেমি উচ্চতাৰ চুঙাৰ আয়তন নিৰ্ণয় কৰা। (π = 22/7)",
        int(PI * r * r * h), [int(2 * PI * r * h), int(PI * r * h), int(PI * r * r), int(PI * r * r * h / 3)],
        f"Volume = πr²h = {int(PI*r*r*h)} cm³.",
        f"আয়তন = {as_num(int(PI*r*r*h))} ঘন ছেমি।")

for r, h, l in [(7, 24, 25), (21, 20, 29)]:
    add(f"Find the volume of a cone of radius {r} cm and height {h} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধ আৰু {as_num(h)} ছেমি উচ্চতাৰ শংকুৰ আয়তন নিৰ্ণয় কৰা। (π = 22/7)",
        int(PI * r * r * h / 3), [int(PI * r * r * h), int(PI * r * l), int(2 * PI * r * h), int(PI * r * r * h / 2)],
        f"Volume = ⅓πr²h = {int(PI*r*r*h/3)} cm³.",
        f"আয়তন = {as_num(int(PI*r*r*h/3))} ঘন ছেমি।")

for r in [14, 28]:
    add(f"Find the surface area of a sphere of radius {r} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ গোলকৰ পৃষ্ঠকালি নিৰ্ণয় কৰা। (π = 22/7)",
        int(4 * PI * r * r), [int(PI * r * r), int(2 * PI * r * r), int(4 * PI * r), int(4 * PI * r * r / 3)],
        f"Surface area = 4πr² = {int(4*PI*r*r)} cm².",
        f"পৃষ্ঠকালি = {as_num(int(4*PI*r*r))} বৰ্গ ছেমি।")

for r in [7, 21]:
    add(f"Find the total surface area of a hemisphere of radius {r} cm. (π = 22/7)",
        f"{as_num(r)} ছেমি ব্যাসাৰ্ধৰ অৰ্ধগোলকৰ মুঠ পৃষ্ঠকালি নিৰ্ণয় কৰা। (π = 22/7)",
        int(3 * PI * r * r), [int(2 * PI * r * r), int(4 * PI * r * r), int(PI * r * r), int(3 * PI * r)],
        f"TSA = 3πr² = {int(3*PI*r*r)} cm².",
        f"মুঠ পৃষ্ঠকালি = {as_num(int(3*PI*r*r))} বৰ্গ ছেমি।")

for b, h, H in [(6, 8, 12), (9, 12, 20)]:
    v = b * h * H // 2
    add(f"Find the volume of a triangular prism whose triangular base has base {b} cm and height {h} cm, and whose length is {H} cm.",
        f"ত্ৰিভুজাকাৰ ভূমিৰ ভূমি {as_num(b)} ছেমি, উচ্চতা {as_num(h)} ছেমি আৰু দীঘ {as_num(H)} ছেমি থকা প্ৰিজমৰ আয়তন নিৰ্ণয় কৰা।",
        v, [b * h * H, v // 2, v * 2, (b + h) * H],
        f"Volume = ½×{b}×{h}×{H} = {v} cm³.",
        f"আয়তন = {as_num(v)} ঘন ছেমি।")

for a, h in [(5, 12), (9, 14)]:
    v = a * a * h // 3
    add(f"Find the volume of a square pyramid with base side {a} cm and height {h} cm.",
        f"ভূমিৰ বাহু {as_num(a)} ছেমি আৰু উচ্চতা {as_num(h)} ছেমি থকা বৰ্গ পিৰামিডৰ আয়তন নিৰ্ণয় কৰা।",
        v, [a * a * h, v * 2, v // 2, a * h],
        f"Volume = ⅓×{a}²×{h} = {v} cm³.",
        f"আয়তন = {as_num(v)} ঘন ছেমি।")

for R, r in [(28, 7), (21, 3)]:
    n = (R // r) ** 3
    add(f"A sphere of radius {R} cm is melted and recast into small spheres of radius {r} cm. How many small spheres are obtained?",
        f"{as_num(R)} ছেমি ব্যাসাৰ্ধৰ গোলক গলাই {as_num(r)} ছেমি ব্যাসাৰ্ধৰ সৰু গোলকত পুনৰ্গঠন কৰা হয়। কিমান সৰু গোলক পোৱা যাব?",
        n, [n * 2, n // 2, (R // r) ** 2, R // r],
        f"n = (R/r)³ = {n}.",
        f"n = {as_num(n)}।")

append("mensuration-3d", rows)
