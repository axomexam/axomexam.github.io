#!/usr/bin/env python3
"""Elementary Algebra: 95+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from algebra_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


# 1. x + 1/x -> x^2 + 1/x^2
for k in [3, 4, 5, 6, 7, 8, 9, 10]:
    v = k * k - 2
    add(f"If x + 1/x = {k}, find the value of x² + 1/x².",
        f"যদি x + 1/x = {as_num(k)}, তেন্তে x² + 1/x² ৰ মান নিৰ্ণয় কৰা।",
        v, [k * k, k * k + 2, v + 2, v - 2],
        f"Square both sides: (x + 1/x)² = x² + 2 + 1/x². So x² + 1/x² = {k}² - 2 = {v}.",
        f"দুয়োপক্ষৰ বৰ্গ ল'লে x² + 1/x² = {as_num(k)}² - ২ = {as_num(v)}।")

# 2. x + 1/x -> x^3 + 1/x^3
for k in [3, 4, 5, 6, 7]:
    v = k ** 3 - 3 * k
    add(f"If x + 1/x = {k}, find the value of x³ + 1/x³.",
        f"যদি x + 1/x = {as_num(k)}, তেন্তে x³ + 1/x³ ৰ মান নিৰ্ণয় কৰা।",
        v, [k ** 3, k ** 3 + 3 * k, v + 3 * k, v - 3],
        f"Use a³ + b³ = (a+b)³ - 3ab(a+b). Here x³ + 1/x³ = {k}³ - 3×{k} = {v}.",
        f"a³ + b³ = (a+b)³ - 3ab(a+b) সূত্ৰমতে x³ + 1/x³ = {as_num(v)}।")

# 3. x + 1/x -> x^4 + 1/x^4
for k in [3, 4, 5, 6]:
    a = k * k - 2
    v = a * a - 2
    add(f"If x + 1/x = {k}, find the value of x⁴ + 1/x⁴.",
        f"যদি x + 1/x = {as_num(k)}, তেন্তে x⁴ + 1/x⁴ ৰ মান নিৰ্ণয় কৰা।",
        v, [a * a, v + 2, v - 2, k ** 4],
        f"First x² + 1/x² = {k}² - 2 = {a}. Then x⁴ + 1/x⁴ = {a}² - 2 = {v}.",
        f"প্ৰথমে x² + 1/x² = {as_num(a)}, তাৰ পিছত x⁴ + 1/x⁴ = {as_num(v)}।")

# 4. x - 1/x -> x^2 + 1/x^2
for k in [3, 4, 5, 6, 7]:
    v = k * k + 2
    add(f"If x - 1/x = {k}, find the value of x² + 1/x².",
        f"যদি x - 1/x = {as_num(k)}, তেন্তে x² + 1/x² ৰ মান নিৰ্ণয় কৰা।",
        v, [k * k, k * k - 2, v - 2, v + 2],
        f"(x - 1/x)² = x² - 2 + 1/x², so x² + 1/x² = {k}² + 2 = {v}.",
        f"(x - 1/x)² = x² - ২ + 1/x², সেয়ে x² + 1/x² = {as_num(v)}।")

# 5. a+b+c and ab+bc+ca -> a^2+b^2+c^2
for S, Q in [(10, 30), (12, 40), (15, 60), (9, 20), (14, 50), (11, 35)]:
    v = S * S - 2 * Q
    add(f"If a + b + c = {S} and ab + bc + ca = {Q}, find a² + b² + c².",
        f"যদি a + b + c = {as_num(S)} আৰু ab + bc + ca = {as_num(Q)}, তেন্তে a² + b² + c² নিৰ্ণয় কৰা।",
        v, [S * S, S * S - Q, S * S + 2 * Q, 2 * Q],
        f"(a+b+c)² = a²+b²+c² + 2(ab+bc+ca). Hence a²+b²+c² = {S}² - 2×{Q} = {v}.",
        f"(a+b+c)² = a²+b²+c² + 2(ab+bc+ca), সেয়ে a²+b²+c² = {as_num(v)}।")

# 6. a^3+b^3+c^3-3abc
for S, Q in [(6, 11), (8, 19), (10, 31), (7, 14), (9, 26)]:
    v = S * (S * S - 3 * Q)
    add(f"If a + b + c = {S} and ab + bc + ca = {Q}, find a³ + b³ + c³ - 3abc.",
        f"যদি a + b + c = {as_num(S)} আৰু ab + bc + ca = {as_num(Q)}, তেন্তে a³ + b³ + c³ - 3abc নিৰ্ণয় কৰা।",
        v, [S * (S * S - Q), S ** 3, v // 2, v + 3],
        f"a³+b³+c³-3abc = (a+b+c)(a²+b²+c²-ab-bc-ca). Since a²+b²+c² = {S}²-2×{Q}, the value is {S}×({S}²-3×{Q}) = {v}.",
        f"সূত্ৰমতে মান = {as_num(S)}×({as_num(S)}²-3×{as_num(Q)}) = {as_num(v)}।")

# 7. (x+a)(x+b)
for a, b in [(5, 7), (8, 3), (9, 4), (6, 11), (12, 5), (7, 13)]:
    add(f"Find the coefficient of x in the expansion of (x + {a})(x + {b}).",
        f"(x + {as_num(a)})(x + {as_num(b)}) ৰ বিস্তাৰত x ৰ সহগ নিৰ্ণয় কৰা।",
        a + b, [a * b, a - b, a + b + 1, a * b + a],
        f"(x+a)(x+b) = x² + (a+b)x + ab, so the coefficient of x is {a}+{b} = {a+b}.",
        f"(x+a)(x+b) = x² + (a+b)x + ab, সেয়ে x ৰ সহগ {as_num(a+b)}।")

# 8. remainder theorem
for a, b, c, k in [(1, -3, 2, 2), (2, 1, -4, 3), (1, 2, -5, 4), (-2, 3, 1, 2), (3, -2, 4, 1)]:
    v = k ** 3 + a * k ** 2 + b * k + c
    add(f"Find the remainder when x³ + {a}x² + {b}x + {c} is divided by (x - {k}).",
        f"x³ + {as_num(a)}x² + {as_num(b)}x + {as_num(c)} ক (x - {as_num(k)}) ৰে ভাগ কৰিলে ভাগশেষ নিৰ্ণয় কৰা।",
        v, [v + k, v - k, k ** 3, v * 2],
        f"By the remainder theorem, substitute x = {k}: {k}³ + {a}({k})² + {b}({k}) + {c} = {v}.",
        f"ভাগশেষ উপপাদ্য অনুসৰি x = {as_num(k)} বহুৱাওঁলে {as_num(v)} পোৱা যায়।")

# 9. rationalise surds
for a, b in [(5, 3), (7, 2), (6, 5), (8, 3), (10, 7)]:
    add(f"Rationalise the denominator: 1/(√{a} + √{b}).",
        f"হৰ পৰিমেয় কৰা: 1/(√{as_num(a)} + √{as_num(b)})।",
        f"(√{a} - √{b})/{a-b}", [f"(√{a} + √{b})/{a-b}", f"(√{a} - √{b})/{a+b}", f"1/({a-b})"],
        f"Multiply numerator and denominator by (√{a} - √{b}): the denominator becomes {a} - {b} = {a-b}, so the result is (√{a} - √{b})/{a-b}.",
        f"লব আৰু হৰক (√{as_num(a)} - √{as_num(b)}) ৰে পূৰণ কৰিলে {(as_num(a))}-{as_num(b)} = {as_num(a-b)} পোৱা যায়।")

# 10. exponents
for base, rhs, x in [(2, 32, 5), (3, 81, 4), (5, 125, 3), (2, 128, 7), (7, 343, 3)]:
    add(f"Solve for x: {base}^x = {rhs}.", f"x ৰ বাবে সমাধান কৰা: {as_num(base)}^x = {as_num(rhs)}।",
        x, [x + 1, x - 1, rhs // base, x * 2],
        f"Write {rhs} as a power of {base}: {base}^{x} = {rhs}, so x = {x}.",
        f"{as_num(rhs)} ক {as_num(base)} ৰ ঘাত হিচাপে লিখিলে x = {as_num(x)}।")

for base, x, rhs in [(2, 4, 16), (3, 3, 27), (5, 2, 25), (2, 6, 64), (4, 2, 16)]:
    add(f"If {base}^(x+1) = {rhs}, find x.", f"যদি {as_num(base)}^(x+1) = {as_num(rhs)}, তেন্তে x নিৰ্ণয় কৰা।",
        x, [x + 1, x - 1, x * 2, rhs // base],
        f"{rhs} = {base}^{x+1}, so x + 1 = {x+1} and x = {x}.",
        f"{as_num(rhs)} = {as_num(base)}^{as_num(x+1)}, সেয়ে x = {as_num(x)}।")

# 11. algebraic fractions
for a, x in [(3, 7), (5, 9), (4, 11), (6, 13)]:
    v = x + a
    add(f"Simplify (x² - {a*a})/(x - {a}) and evaluate at x = {x}.",
        f"(x² - {as_num(a*a)})/(x - {as_num(a)}) সৰল কৰি x = {as_num(x)} ত মান নিৰ্ণয় কৰা।",
        v, [x - a, x * a, v + a, v - 1],
        f"x² - {a*a} = (x - {a})(x + {a}), so the expression equals x + {a}. At x = {x} it is {v}.",
        f"x² - {as_num(a*a)} = (x - {as_num(a)})(x + {as_num(a)}), সেয়ে মান {as_num(v)}।")

for a, x in [(2, 5), (3, 6), (4, 7)]:
    v = x * x + a * x + a * a
    add(f"Simplify (x³ - {a**3})/(x - {a}) and evaluate at x = {x}.",
        f"(x³ - {as_num(a**3)})/(x - {as_num(a)}) সৰল কৰি x = {as_num(x)} ত মান নিৰ্ণয় কৰা।",
        v, [x * x - a * x + a * a, x ** 3, v + a, v - a],
        f"x³ - {a**3} = (x - {a})(x² + {a}x + {a*a}), so the value is {x}² + {a}×{x} + {a*a} = {v}.",
        f"সূত্ৰমতে মান = {as_num(v)}।")

# 12. a^2 + b^2 from sum and product
for S, P in [(10, 21), (12, 32), (15, 50), (9, 18), (13, 40), (11, 24)]:
    v = S * S - 2 * P
    add(f"If a + b = {S} and ab = {P}, find a² + b².",
        f"যদি a + b = {as_num(S)} আৰু ab = {as_num(P)}, তেন্তে a² + b² নিৰ্ণয় কৰা।",
        v, [S * S, S * S - P, S * S + 2 * P, 2 * P],
        f"(a+b)² = a² + 2ab + b², so a² + b² = {S}² - 2×{P} = {v}.",
        f"(a+b)² = a² + 2ab + b², সেয়ে a² + b² = {as_num(v)}।")

# extra batch
for k in [11, 12, 13]:
    v = k * k - 2
    add(f"If x + 1/x = {k}, find the value of x² + 1/x².",
        f"যদি x + 1/x = {as_num(k)}, তেন্তে x² + 1/x² ৰ মান নিৰ্ণয় কৰা।",
        v, [k * k, k * k + 2, v + 2, v - 2],
        f"x² + 1/x² = {k}² - 2 = {v}.",
        f"x² + 1/x² = {as_num(v)}।")

for k in [8, 9]:
    v = k ** 3 - 3 * k
    add(f"If x + 1/x = {k}, find the value of x³ + 1/x³.",
        f"যদি x + 1/x = {as_num(k)}, তেন্তে x³ + 1/x³ ৰ মান নিৰ্ণয় কৰা।",
        v, [k ** 3, k ** 3 + 3 * k, v + 3 * k, v - 3],
        f"x³ + 1/x³ = {k}³ - 3×{k} = {v}.",
        f"x³ + 1/x³ = {as_num(v)}।")

for S, Q in [(13, 42), (16, 70), (18, 90)]:
    v = S * S - 2 * Q
    add(f"If a + b + c = {S} and ab + bc + ca = {Q}, find a² + b² + c².",
        f"যদি a + b + c = {as_num(S)} আৰু ab + bc + ca = {as_num(Q)}, তেন্তে a² + b² + c² নিৰ্ণয় কৰা।",
        v, [S * S, S * S - Q, S * S + 2 * Q, 2 * Q],
        f"a²+b²+c² = {S}² - 2×{Q} = {v}.",
        f"a²+b²+c² = {as_num(v)}।")

for S, Q in [(11, 30), (12, 35)]:
    v = S * (S * S - 3 * Q)
    add(f"If a + b + c = {S} and ab + bc + ca = {Q}, find a³ + b³ + c³ - 3abc.",
        f"যদি a + b + c = {as_num(S)} আৰু ab + bc + ca = {as_num(Q)}, তেন্তে a³ + b³ + c³ - 3abc নিৰ্ণয় কৰা।",
        v, [S * (S * S - Q), S ** 3, v // 2, v + 3],
        f"Value = {S}×({S}²-3×{Q}) = {v}.",
        f"মান = {as_num(v)}।")

for a, b in [(15, 4), (10, 9), (14, 3), (11, 8)]:
    add(f"Find the coefficient of x in the expansion of (x + {a})(x + {b}).",
        f"(x + {as_num(a)})(x + {as_num(b)}) ৰ বিস্তাৰত x ৰ সহগ নিৰ্ণয় কৰা।",
        a + b, [a * b, a - b, a + b + 1, a * b + a],
        f"Coefficient of x = {a} + {b} = {a+b}.",
        f"x ৰ সহগ = {as_num(a+b)}।")

for a, b, c, k in [(2, -5, 6, 3), (1, -4, 3, 2), (3, 2, -6, 1)]:
    v = k ** 3 + a * k ** 2 + b * k + c
    add(f"Find the remainder when x³ + {a}x² + {b}x + {c} is divided by (x - {k}).",
        f"x³ + {as_num(a)}x² + {as_num(b)}x + {as_num(c)} ক (x - {as_num(k)}) ৰে ভাগ কৰিলে ভাগশেষ নিৰ্ণয় কৰা।",
        v, [v + k, v - k, k ** 3, v * 2],
        f"Substituting x = {k} gives {v}.",
        f"x = {as_num(k)} বহুৱাওঁলে {as_num(v)} পোৱা যায়।")

for a, b in [(11, 2), (9, 4), (12, 5)]:
    add(f"Rationalise the denominator: 1/(√{a} + √{b}).",
        f"হৰ পৰিমেয় কৰা: 1/(√{as_num(a)} + √{as_num(b)})।",
        f"(√{a} - √{b})/{a-b}", [f"(√{a} + √{b})/{a-b}", f"(√{a} - √{b})/{a+b}", f"1/({a-b})"],
        f"Result = (√{a} - √{b})/{a-b}.",
        f"ফলাফল = (√{as_num(a)} - √{as_num(b)})/{as_num(a-b)}।")

for base, rhs, x in [(3, 243, 5), (2, 256, 8), (6, 216, 3)]:
    add(f"Solve for x: {base}^x = {rhs}.", f"x ৰ বাবে সমাধান কৰা: {as_num(base)}^x = {as_num(rhs)}।",
        x, [x + 1, x - 1, rhs // base, x * 2],
        f"{rhs} = {base}^{x}, so x = {x}.",
        f"x = {as_num(x)}।")

# final batch
for k in [14, 15]:
    v = k * k - 2
    add(f"If x + 1/x = {k}, find the value of x² + 1/x².",
        f"যদি x + 1/x = {as_num(k)}, তেন্তে x² + 1/x² ৰ মান নিৰ্ণয় কৰা।",
        v, [k * k, k * k + 2, v + 2, v - 2],
        f"x² + 1/x² = {k}² - 2 = {v}.",
        f"x² + 1/x² = {as_num(v)}।")
for k in [8, 9]:
    v = k * k + 2
    add(f"If x - 1/x = {k}, find the value of x² + 1/x².",
        f"যদি x - 1/x = {as_num(k)}, তেন্তে x² + 1/x² ৰ মান নিৰ্ণয় কৰা।",
        v, [k * k, k * k - 2, v - 2, v + 2],
        f"x² + 1/x² = {k}² + 2 = {v}.",
        f"x² + 1/x² = {as_num(v)}।")
for S, Q in [(20, 100), (17, 72), (19, 85)]:
    v = S * S - 2 * Q
    add(f"If a + b + c = {S} and ab + bc + ca = {Q}, find a² + b² + c².",
        f"যদি a + b + c = {as_num(S)} আৰু ab + bc + ca = {as_num(Q)}, তেন্তে a² + b² + c² নিৰ্ণয় কৰা।",
        v, [S * S, S * S - Q, S * S + 2 * Q, 2 * Q],
        f"a²+b²+c² = {S}² - 2×{Q} = {v}.",
        f"a²+b²+c² = {as_num(v)}।")
for S, Q in [(13, 40), (14, 45)]:
    v = S * (S * S - 3 * Q)
    add(f"If a + b + c = {S} and ab + bc + ca = {Q}, find a³ + b³ + c³ - 3abc.",
        f"যদি a + b + c = {as_num(S)} আৰু ab + bc + ca = {as_num(Q)}, তেন্তে a³ + b³ + c³ - 3abc নিৰ্ণয় কৰা।",
        v, [S * (S * S - Q), S ** 3, v // 2, v + 3],
        f"Value = {S}×({S}²-3×{Q}) = {v}.",
        f"মান = {as_num(v)}।")
for a, b in [(13, 6), (9, 7), (16, 5)]:
    add(f"Find the coefficient of x in the expansion of (x + {a})(x + {b}).",
        f"(x + {as_num(a)})(x + {as_num(b)}) ৰ বিস্তাৰত x ৰ সহগ নিৰ্ণয় কৰা।",
        a + b, [a * b, a - b, a + b + 1, a * b + a],
        f"Coefficient of x = {a+b}.",
        f"x ৰ সহগ = {as_num(a+b)}।")
for a, b, c, k in [(2, 3, -5, 2), (1, -2, -8, 4), (4, -3, 2, 3)]:
    v = k ** 3 + a * k ** 2 + b * k + c
    add(f"Find the remainder when x³ + {a}x² + {b}x + {c} is divided by (x - {k}).",
        f"x³ + {as_num(a)}x² + {as_num(b)}x + {as_num(c)} ক (x - {as_num(k)}) ৰে ভাগ কৰিলে ভাগশেষ নিৰ্ণয় কৰা।",
        v, [v + k, v - k, k ** 3, v * 2],
        f"Substituting x = {k} gives {v}.",
        f"x = {as_num(k)} বহুৱাওঁলে {as_num(v)} পোৱা যায়।")
for a, b in [(13, 3), (10, 9)]:
    add(f"Rationalise the denominator: 1/(√{a} + √{b}).",
        f"হৰ পৰিমেয় কৰা: 1/(√{as_num(a)} + √{as_num(b)})।",
        f"(√{a} - √{b})/{a-b}", [f"(√{a} + √{b})/{a-b}", f"(√{a} - √{b})/{a+b}", f"1/({a-b})"],
        f"Result = (√{a} - √{b})/{a-b}.",
        f"ফলাফল = (√{as_num(a)} - √{as_num(b)})/{as_num(a-b)}।")
for base, rhs, x in [(2, 512, 9), (5, 625, 4)]:
    add(f"Solve for x: {base}^x = {rhs}.", f"x ৰ বাবে সমাধান কৰা: {as_num(base)}^x = {as_num(rhs)}।",
        x, [x + 1, x - 1, rhs // base, x * 2],
        f"{rhs} = {base}^{x}, so x = {x}.",
        f"x = {as_num(x)}।")
append("elementary-algebra", rows)
