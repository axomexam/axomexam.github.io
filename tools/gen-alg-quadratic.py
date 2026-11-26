#!/usr/bin/env python3
"""Quadratic & Linear Equations: 95+ very hard bilingual questions."""

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


# 1. sum and product of roots
for a, b, c in [(1, -7, 12), (2, -9, 4), (3, 5, -2), (1, 3, -10), (2, 7, 3), (5, -11, 2)]:
    s, p = F(-b, a), F(c, a)
    add(f"If α and β are the roots of {a}x² + {b}x + {c} = 0, find α + β.",
        f"যদি {as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ মূল α আৰু β, তেন্তে α + β নিৰ্ণয় কৰা।",
        fr(s), [fr(p), fr(-p), fr(-b), fr(c)],
        f"For ax²+bx+c=0, α+β = -b/a = -({b})/{a} = {fr(s)}.",
        f"α+β = -b/a = {fr(s)}।")
    add(f"If α and β are the roots of {a}x² + {b}x + {c} = 0, find αβ.",
        f"যদি {as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ মূল α আৰু β, তেন্তে αβ নিৰ্ণয় কৰা।",
        fr(p), [fr(s), fr(-s), fr(c), fr(a)],
        f"For ax²+bx+c=0, αβ = c/a = {c}/{a} = {fr(p)}.",
        f"αβ = c/a = {fr(p)}।")

# 2. equation from roots
for r1, r2 in [(3, 5), (-2, 7), (4, -6), (1, -8), (5, 5)]:
    s, p = r1 + r2, r1 * r2
    sign = "-" if s >= 0 else "+"
    add(f"Form the quadratic equation whose roots are {r1} and {r2}.",
        f"যাৰ মূল {as_num(r1)} আৰু {as_num(r2)}, তেনে দ্বিঘাত সমীকৰণ গঠন কৰা।",
        f"x² {sign} {abs(s)}x + {p} = 0", [f"x² + {s}x + {p} = 0", f"x² - {s}x - {p} = 0", f"x² + {p}x + {s} = 0"],
        f"Sum = {s}, product = {p}; the equation is x² - (sum)x + product = 0, i.e. x² - {s}x + {p} = 0.",
        f"যোগফল = {as_num(s)}, গুণফল = {as_num(p)}; সমীকৰণ x² - {as_num(s)}x + {as_num(p)} = 0।")

# 3. discriminant and nature
for a, b, c in [(1, -5, 6), (2, 3, 1), (1, 2, 5), (3, -4, 2), (1, -4, 4)]:
    d = b * b - 4 * a * c
    nature = "two distinct real roots" if d > 0 else ("two equal real roots" if d == 0 else "no real roots")
    add(f"Find the discriminant of {a}x² + {b}x + {c} = 0 and state the nature of its roots.",
        f"{as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ নিৰ্ণায়ক নিৰ্ণয় কৰি মূলৰ প্ৰকৃতি কোৱা।",
        d, [d + 4 * a * c, b * b, -d, d + 2],
        f"D = b² - 4ac = {b}² - 4×{a}×{c} = {d}. Since D {'> 0' if d>0 else ('= 0' if d==0 else '< 0')}, the equation has {nature}.",
        f"D = {as_num(d)}; সেয়ে সমীকৰণৰ {nature}।")

# 4. solve quadratic
for a, b, c, r1, r2 in [(1, -7, 12, 3, 4), (1, 5, 6, -2, -3), (1, -3, -10, 5, -2), (2, -7, 3, 3, 1)]:
    add(f"Solve the equation {a}x² + {b}x + {c} = 0.",
        f"{as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 সমাধান কৰা।",
        f"{min(r1,r2)}, {max(r1,r2)}", [f"{r1}, {r2 + 1}", f"{r1 - 1}, {r2}", f"{-r1}, {-r2}"],
        f"Factorising gives (x - {r1})(x - {r2}) = 0 (after adjusting the leading coefficient), so x = {min(r1,r2)} or x = {max(r1,r2)}.",
        f"উৎপাদক বিশ্লেষণ কৰিলে x = {as_num(min(r1,r2))} বা {as_num(max(r1,r2))} পোৱা যায়।")

# 5. two-variable linear system
for a1, b1, c1, a2, b2, c2, x, y in [(2, 3, 12, 3, -2, 5, 3, 2), (3, 2, 16, 2, -3, -5, 2, 5),
                                      (5, 4, 22, 3, -2, 4, 2, 3)]:
    add(f"Solve the system: {a1}x + {b1}y = {c1} and {a2}x + {b2}y = {c2}.",
        f"সমীকৰণ পদ্ধতি সমাধান কৰা: {as_num(a1)}x + {as_num(b1)}y = {as_num(c1)} আৰু {as_num(a2)}x + {as_num(b2)}y = {as_num(c2)}।",
        f"x = {x}, y = {y}", [f"x = {y}, y = {x}", f"x = {x+1}, y = {y-1}", f"x = {x-1}, y = {y+1}"],
        f"Eliminating y gives x = {x}; substituting back gives y = {y}.",
        f"y আঁতৰালে x = {as_num(x)}; পুনৰ বহুৱালে y = {as_num(y)}।")

# 6. two numbers word problem
for S, D in [(25, 5), (30, 6), (40, 8), (35, 7)]:
    x, y = (S + D) // 2, (S - D) // 2
    add(f"The sum of two numbers is {S} and their difference is {D}. Find the numbers.",
        f"দুটা সংখ্যাৰ যোগফল {as_num(S)} আৰু পাৰ্থক্য {as_num(D)}। সংখ্যা দুটা নিৰ্ণয় কৰা।",
        f"{x}, {y}", [f"{x+1}, {y-1}", f"{S}, {D}", f"{x-1}, {y+1}"],
        f"Solving x+y={S} and x-y={D} gives x={x} and y={y}.",
        f"x+y={as_num(S)} আৰু x-y={as_num(D)} সমাধান কৰিলে x={as_num(x)}, y={as_num(y)}।")

# 7. alpha^2 + beta^2
for a, b, c in [(1, -7, 12), (2, -9, 4), (1, 3, -10), (3, 5, -2)]:
    s, p = F(-b, a), F(c, a)
    v = s * s - 2 * p
    add(f"If α and β are the roots of {a}x² + {b}x + {c} = 0, find α² + β².",
        f"যদি {as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ মূল α আৰু β, তেন্তে α² + β² নিৰ্ণয় কৰা।",
        fr(v), [fr(s*s), fr(s*s + 2*p), fr(p*p), fr(v + 1)],
        f"α+β = {fr(s)}, αβ = {fr(p)}. α²+β² = (α+β)² - 2αβ = {fr(v)}.",
        f"α+β = {fr(s)}, αβ = {fr(p)}; α²+β² = {fr(v)}।")

# 8. equal roots condition
for a, c in [(1, 9), (1, 16), (4, 9), (9, 16), (1, 25)]:
    k = 2 * int((a * c) ** 0.5)
    add(f"Find the positive value of k for which {a}x² + kx + {c} = 0 has equal roots.",
        f"{as_num(a)}x² + kx + {as_num(c)} = 0 ৰ মূল সমান হ'বলৈ k ৰ ধনাত্মক মান নিৰ্ণয় কৰা।",
        k, [k // 2, k * 2, c, a + c],
        f"For equal roots, D = 0: k² - 4×{a}×{c} = 0, so k² = {4*a*c} and k = {k}.",
        f"সমান মূলৰ বাবে k² = {as_num(4*a*c)}, সেয়ে k = {as_num(k)}।")

# 9. fractional equation
for a, b in [(1, 1), (2, 1), (3, 2)]:
    # (x+a)/(x-b) = 3 => x+a = 3x-3b => x = (a+3b)/2
    x = F(a + 3 * b, 2)
    add(f"Solve for x: (x + {a})/(x - {b}) = 3.",
        f"x ৰ বাবে সমাধান কৰা: (x + {as_num(a)})/(x - {as_num(b)}) = 3।",
        fr(x), [fr(x + 1), fr(x - 1), fr(a + b), fr(x * 2)],
        f"Cross-multiplying: x + {a} = 3(x - {b}), so 2x = {a + 3*b} and x = {fr(x)}.",
        f"ক্ৰছ-গুণ কৰিলে 2x = {as_num(a+3*b)}, সেয়ে x = {fr(x)}।")

# 10. one root given, find k
for b, c, r in [(-5, 6, 2), (-7, 12, 3), (3, -10, 5), (-9, 20, 4)]:
    k = -(r * r + b * r)
    add(f"One root of x² + {b}x + k = 0 is {r}. Find k.",
        f"x² + {as_num(b)}x + k = 0 ৰ এটা মূল {as_num(r)}। k নিৰ্ণয় কৰা।",
        k, [-k, k + 1, k - 1, r * r],
        f"Substitute x = {r}: {r}² + ({b})({r}) + k = 0, so k = {k}.",
        f"x = {as_num(r)} বহুৱালে k = {as_num(k)}।")

# 11. system word problem
for x, y in [(12, 8), (15, 10), (20, 5)]:
    S, D = x + y, x - y
    add(f"Two numbers differ by {D} and their sum is {S}. Find the larger number.",
        f"দুটা সংখ্যাৰ পাৰ্থক্য {as_num(D)} আৰু যোগফল {as_num(S)}। ডাঙৰ সংখ্যাটো নিৰ্ণয় কৰা।",
        x, [y, S, D, x + 1],
        f"Larger = (sum + difference)/2 = ({S}+{D})/2 = {x}.",
        f"ডাঙৰ = ({as_num(S)}+{as_num(D)})/২ = {as_num(x)}।")

# 12. equation from x + 1/x
for k in [3, 4, 5, 6]:
    add(f"Form the quadratic equation whose roots satisfy x + 1/x = {k}.",
        f"যাৰ মূলবোৰে x + 1/x = {as_num(k)} সিদ্ধ কৰে, তেনে দ্বিঘাত সমীকৰণ গঠন কৰা।",
        f"x² - {k}x + 1 = 0", [f"x² + {k}x + 1 = 0", f"x² - {k}x - 1 = 0", f"x² + {k}x - 1 = 0"],
        f"x + 1/x = {k} ⇒ x² - {k}x + 1 = 0 after multiplying by x.",
        f"x + 1/x = {as_num(k)} ⇒ x² - {as_num(k)}x + 1 = 0।")

# extra batch
for a, b, c in [(1, -8, 15), (2, -11, 5), (1, 4, -12), (3, -10, 3), (1, -6, 8)]:
    s, p = F(-b, a), F(c, a)
    add(f"If α and β are the roots of {a}x² + {b}x + {c} = 0, find α + β.",
        f"যদি {as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ মূল α আৰু β, তেন্তে α + β নিৰ্ণয় কৰা।",
        fr(s), [fr(p), fr(-p), fr(-b), fr(c)],
        f"α+β = -b/a = {fr(s)}.",
        f"α+β = {fr(s)}।")
    add(f"If α and β are the roots of {a}x² + {b}x + {c} = 0, find αβ.",
        f"যদি {as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ মূল α আৰু β, তেন্তে αβ নিৰ্ণয় কৰা।",
        fr(p), [fr(s), fr(-s), fr(c), fr(a)],
        f"αβ = c/a = {fr(p)}.",
        f"αβ = {fr(p)}।")

for r1, r2 in [(6, 2), (-3, 9), (7, -4), (2, 2)]:
    s, p = r1 + r2, r1 * r2
    sign = "-" if s >= 0 else "+"
    add(f"Form the quadratic equation whose roots are {r1} and {r2}.",
        f"যাৰ মূল {as_num(r1)} আৰু {as_num(r2)}, তেনে দ্বিঘাত সমীকৰণ গঠন কৰা।",
        f"x² {sign} {abs(s)}x + {p} = 0", [f"x² + {s}x + {p} = 0", f"x² - {s}x - {p} = 0", f"x² + {p}x + {s} = 0"],
        f"Equation: x² - {s}x + {p} = 0.",
        f"সমীকৰণ: x² - {as_num(s)}x + {as_num(p)} = 0।")

for a, b, c in [(1, 6, 9), (2, 5, 2), (1, -2, -3), (4, -4, 1)]:
    d = b * b - 4 * a * c
    nature = "two distinct real roots" if d > 0 else ("two equal real roots" if d == 0 else "no real roots")
    add(f"Find the discriminant of {a}x² + {b}x + {c} = 0 and state the nature of its roots.",
        f"{as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ নিৰ্ণায়ক নিৰ্ণয় কৰি মূলৰ প্ৰকৃতি কোৱা।",
        d, [d + 4 * a * c, b * b, -d, d + 2],
        f"D = {d}; the equation has {nature}.",
        f"D = {as_num(d)}; মূলৰ প্ৰকৃতি: {nature}।")

for a, b, c, r1, r2 in [(1, -9, 20, 4, 5), (1, 2, -15, 3, -5), (1, -4, 3, 1, 3)]:
    add(f"Solve the equation {a}x² + {b}x + {c} = 0.",
        f"{as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 সমাধান কৰা।",
        f"{min(r1,r2)}, {max(r1,r2)}", [f"{r1}, {r2 + 1}", f"{r1 - 1}, {r2}", f"{-r1}, {-r2}"],
        f"Roots are {min(r1,r2)} and {max(r1,r2)}.",
        f"মূল {as_num(min(r1,r2))} আৰু {as_num(max(r1,r2))}।")

for a1, b1, c1, a2, b2, c2, x, y in [(4, 3, 18, 2, -3, 0, 3, 2), (2, 5, 19, 3, -2, 4, 2, 3)]:
    add(f"Solve the system: {a1}x + {b1}y = {c1} and {a2}x + {b2}y = {c2}.",
        f"সমীকৰণ পদ্ধতি সমাধান কৰা: {as_num(a1)}x + {as_num(b1)}y = {as_num(c1)} আৰু {as_num(a2)}x + {as_num(b2)}y = {as_num(c2)}।",
        f"x = {x}, y = {y}", [f"x = {y}, y = {x}", f"x = {x+1}, y = {y-1}", f"x = {x-1}, y = {y+1}"],
        f"x = {x}, y = {y}.",
        f"x = {as_num(x)}, y = {as_num(y)}।")

for S, D in [(45, 9), (50, 10), (28, 4)]:
    x, y = (S + D) // 2, (S - D) // 2
    add(f"The sum of two numbers is {S} and their difference is {D}. Find the numbers.",
        f"দুটা সংখ্যাৰ যোগফল {as_num(S)} আৰু পাৰ্থক্য {as_num(D)}। সংখ্যা দুটা নিৰ্ণয় কৰা।",
        f"{x}, {y}", [f"{x+1}, {y-1}", f"{S}, {D}", f"{x-1}, {y+1}"],
        f"The numbers are {x} and {y}.",
        f"সংখ্যা {as_num(x)} আৰু {as_num(y)}।")

for a, b, c in [(2, -7, 6), (1, 5, -14)]:
    s, p = F(-b, a), F(c, a)
    v = s * s - 2 * p
    add(f"If α and β are the roots of {a}x² + {b}x + {c} = 0, find α² + β².",
        f"যদি {as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ মূল α আৰু β, তেন্তে α² + β² নিৰ্ণয় কৰা।",
        fr(v), [fr(s*s), fr(s*s + 2*p), fr(p*p), fr(v + 1)],
        f"α²+β² = {fr(v)}.",
        f"α²+β² = {fr(v)}।")

for a, c in [(1, 36), (4, 25), (9, 25)]:
    k = 2 * int((a * c) ** 0.5)
    add(f"Find the positive value of k for which {a}x² + kx + {c} = 0 has equal roots.",
        f"{as_num(a)}x² + kx + {as_num(c)} = 0 ৰ মূল সমান হ'বলৈ k ৰ ধনাত্মক মান নিৰ্ণয় কৰা।",
        k, [k // 2, k * 2, c, a + c],
        f"k² = {4*a*c}, so k = {k}.",
        f"k = {as_num(k)}।")

for b, c, r in [(-6, 8, 2), (-8, 15, 3), (2, -8, 4)]:
    k = -(r * r + b * r)
    add(f"One root of x² + {b}x + k = 0 is {r}. Find k.",
        f"x² + {as_num(b)}x + k = 0 ৰ এটা মূল {as_num(r)}। k নিৰ্ণয় কৰা।",
        k, [-k, k + 1, k - 1, r * r],
        f"k = {k}.",
        f"k = {as_num(k)}।")

for k in [7, 8]:
    add(f"Form the quadratic equation whose roots satisfy x + 1/x = {k}.",
        f"যাৰ মূলবোৰে x + 1/x = {as_num(k)} সিদ্ধ কৰে, তেনে দ্বিঘাত সমীকৰণ গঠন কৰা।",
        f"x² - {k}x + 1 = 0", [f"x² + {k}x + 1 = 0", f"x² - {k}x - 1 = 0", f"x² + {k}x - 1 = 0"],
        f"x² - {k}x + 1 = 0.",
        f"x² - {as_num(k)}x + 1 = 0।")

# final batch
for a, b, c in [(1, -9, 18), (2, -7, 3), (1, 7, 10), (3, -8, 4)]:
    s, p = F(-b, a), F(c, a)
    add(f"If α and β are the roots of {a}x² + {b}x + {c} = 0, find α + β.",
        f"যদি {as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ মূল α আৰু β, তেন্তে α + β নিৰ্ণয় কৰা।",
        fr(s), [fr(p), fr(-p), fr(-b), fr(c)],
        f"α+β = {fr(s)}.",
        f"α+β = {fr(s)}।")
    add(f"If α and β are the roots of {a}x² + {b}x + {c} = 0, find αβ.",
        f"যদি {as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ মূল α আৰু β, তেন্তে αβ নিৰ্ণয় কৰা।",
        fr(p), [fr(s), fr(-s), fr(c), fr(a)],
        f"αβ = {fr(p)}.",
        f"αβ = {fr(p)}।")

for r1, r2 in [(8, 3), (-5, 2), (4, 4)]:
    s, p = r1 + r2, r1 * r2
    sign = "-" if s >= 0 else "+"
    add(f"Form the quadratic equation whose roots are {r1} and {r2}.",
        f"যাৰ মূল {as_num(r1)} আৰু {as_num(r2)}, তেনে দ্বিঘাত সমীকৰণ গঠন কৰা।",
        f"x² {sign} {abs(s)}x + {p} = 0", [f"x² + {s}x + {p} = 0", f"x² - {s}x - {p} = 0", f"x² + {p}x + {s} = 0"],
        f"x² - {s}x + {p} = 0.",
        f"x² - {as_num(s)}x + {as_num(p)} = 0।")

for a, b, c in [(1, 3, -4), (2, -4, 3), (1, -6, 9)]:
    d = b * b - 4 * a * c
    nature = "two distinct real roots" if d > 0 else ("two equal real roots" if d == 0 else "no real roots")
    add(f"Find the discriminant of {a}x² + {b}x + {c} = 0 and state the nature of its roots.",
        f"{as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ নিৰ্ণায়ক নিৰ্ণয় কৰি মূলৰ প্ৰকৃতি কোৱা।",
        d, [d + 4 * a * c, b * b, -d, d + 2],
        f"D = {d}; the equation has {nature}.",
        f"D = {as_num(d)}; {nature}।")

for a, b, c, r1, r2 in [(1, -8, 12, 2, 6), (1, 7, 12, -3, -4), (2, -9, 4, 1, 4)]:
    add(f"Solve the equation {a}x² + {b}x + {c} = 0.",
        f"{as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 সমাধান কৰা।",
        f"{min(r1,r2)}, {max(r1,r2)}", [f"{r1}, {r2 + 1}", f"{r1 - 1}, {r2}", f"{-r1}, {-r2}"],
        f"Roots are {min(r1,r2)} and {max(r1,r2)}.",
        f"মূল {as_num(min(r1,r2))} আৰু {as_num(max(r1,r2))}।")

for a1, b1, c1, a2, b2, c2, x, y in [(3, 4, 24, 2, -1, 5, 4, 3), (2, 3, 16, 4, -1, 18, 5, 2)]:
    add(f"Solve the system: {a1}x + {b1}y = {c1} and {a2}x + {b2}y = {c2}.",
        f"সমীকৰণ পদ্ধতি সমাধান কৰা: {as_num(a1)}x + {as_num(b1)}y = {as_num(c1)} আৰু {as_num(a2)}x + {as_num(b2)}y = {as_num(c2)}।",
        f"x = {x}, y = {y}", [f"x = {y}, y = {x}", f"x = {x+1}, y = {y-1}", f"x = {x-1}, y = {y+1}"],
        f"x = {x}, y = {y}.",
        f"x = {as_num(x)}, y = {as_num(y)}।")

for S, D in [(60, 12), (38, 6)]:
    x, y = (S + D) // 2, (S - D) // 2
    add(f"The sum of two numbers is {S} and their difference is {D}. Find the numbers.",
        f"দুটা সংখ্যাৰ যোগফল {as_num(S)} আৰু পাৰ্থক্য {as_num(D)}। সংখ্যা দুটা নিৰ্ণয় কৰা।",
        f"{x}, {y}", [f"{x+1}, {y-1}", f"{S}, {D}", f"{x-1}, {y+1}"],
        f"The numbers are {x} and {y}.",
        f"সংখ্যা {as_num(x)} আৰু {as_num(y)}।")

for a, b, c in [(1, -9, 18), (2, -7, 3)]:
    s, p = F(-b, a), F(c, a)
    v = s * s - 2 * p
    add(f"If α and β are the roots of {a}x² + {b}x + {c} = 0, find α² + β².",
        f"যদি {as_num(a)}x² + {as_num(b)}x + {as_num(c)} = 0 ৰ মূল α আৰু β, তেন্তে α² + β² নিৰ্ণয় কৰা।",
        fr(v), [fr(s*s), fr(s*s + 2*p), fr(p*p), fr(v + 1)],
        f"α²+β² = {fr(v)}.",
        f"α²+β² = {fr(v)}।")

for a, c in [(1, 49), (9, 4)]:
    k = 2 * int((a * c) ** 0.5)
    add(f"Find the positive value of k for which {a}x² + kx + {c} = 0 has equal roots.",
        f"{as_num(a)}x² + kx + {as_num(c)} = 0 ৰ মূল সমান হ'বলৈ k ৰ ধনাত্মক মান নিৰ্ণয় কৰা।",
        k, [k // 2, k * 2, c, a + c],
        f"k = {k}.",
        f"k = {as_num(k)}।")

for b, c, r in [(-6, 9, 3), (-4, 3, 1)]:
    k = -(r * r + b * r)
    add(f"One root of x² + {b}x + k = 0 is {r}. Find k.",
        f"x² + {as_num(b)}x + k = 0 ৰ এটা মূল {as_num(r)}। k নিৰ্ণয় কৰা।",
        k, [-k, k + 1, k - 1, r * r],
        f"k = {k}.",
        f"k = {as_num(k)}।")

append("quadratic-linear-equations", rows)
