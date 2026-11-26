#!/usr/bin/env python3
"""Simplification & BODMAS: 95+ hard bilingual questions."""

import sys
from fractions import Fraction as F
sys.path.insert(0, "tools")
from num_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def fnum(x):
    x = F(x)
    return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator}"


# 1. BODMAS integer expressions
EXPR = [
    "48 ÷ 6 × 5 + 17 - 9", "125 - 25 × 4 + 96 ÷ 8", "18 + 6 × (7 - 3) ÷ 4",
    "(56 ÷ 8) × (9 + 3) - 15", "144 ÷ 12 + 7 × 8 - 19", "225 ÷ 15 × 3 + 84 ÷ 7",
    "36 × 4 - 18 × 5 + 72 ÷ 9", "1000 - 25 × 16 + 144 ÷ 12", "81 ÷ 9 × 7 - 6 × 8 + 45",
    "64 ÷ 8 + 12 × 3 - 27 ÷ 9", "7 × 9 - 48 ÷ 6 + 15 × 2", "120 ÷ 5 × 4 - 96 ÷ 8 + 33",
    "15 × 6 - 72 ÷ 9 × 3 + 28", "256 ÷ 16 + 27 × 3 - 81 ÷ 9", "9 × 8 + 63 ÷ 7 - 54 ÷ 6",
    "144 ÷ (12 ÷ 3) + 25 × 4 - 60", "72 ÷ 8 × (15 - 7) + 96 ÷ 12",
]
for e in EXPR:
    v = eval(e.replace("÷", "//").replace("×", "*"))
    add(f"Simplify: {e}",
        f"সৰল কৰা: {e}",
        v, [v + 2, v - 2, v + 6, v * 2],
        f"Applying BODMAS, the value is {v}.",
        f"BODMAS প্ৰয়োগ কৰি মান {as_num(v)} পোৱা যায়।")

# 2. nested fractions
NEST = [(3, 4, 9, 16, 5, 8), (5, 6, 10, 12, 7, 9), (7, 8, 21, 24, 3, 4),
        (4, 5, 8, 15, 11, 20), (9, 10, 27, 40, 2, 5), (2, 3, 8, 9, 5, 6),
        (11, 12, 22, 36, 7, 18), (13, 15, 26, 45, 4, 9), (5, 7, 15, 28, 3, 14),
        (7, 9, 14, 27, 5, 18)]
for a, b, c, d, e, f in NEST:
    v = F(a, b) / F(c, d) + F(e, f)
    add(f"Simplify: ({a}/{b}) ÷ ({c}/{d}) + ({e}/{f})",
        f"সৰল কৰা: ({a}/{b}) ÷ ({c}/{d}) + ({e}/{f})",
        fnum(v), [fnum(v + F(1, 2)), fnum(v - F(1, 2)), fnum(v * 2), fnum(v + 1)],
        f"The value is {fnum(v)}.",
        f"মান {fnum(v)}।")

# 3. mixed numbers
MIX = [(2, 3, 4, 1, 5, 6), (3, 1, 2, 2, 2, 3), (4, 3, 5, 1, 7, 10), (5, 2, 3, 2, 5, 9),
       (1, 5, 8, 3, 3, 4), (6, 1, 3, 2, 7, 12), (2, 7, 9, 1, 5, 6), (3, 5, 7, 2, 3, 14)]
for A, b, c, D, e, f in MIX:
    v = F(A * c + b, c) + F(D * f + e, f)
    add(f"Simplify: {A} {b}/{c} + {D} {e}/{f}",
        f"সৰল কৰা: {as_num(A)} {as_num(b)}/{as_num(c)} + {as_num(D)} {as_num(e)}/{as_num(f)}",
        fnum(v), [fnum(v + F(1, 3)), fnum(v - F(1, 4)), fnum(v * 2), fnum(v + 1)],
        f"Converting to improper fractions and adding gives {fnum(v)}.",
        f"অশুদ্ধ ভগ্নাংশলৈ ৰূপান্তৰ কৰি যোগ কৰিলে {fnum(v)} পোৱা যায়।")

# 4. surds / indices
SURD = [(5, 20, 45), (3, 12, 27), (7, 28, 63), (2, 18, 32), (6, 24, 54),
        (8, 32, 72), (10, 40, 90), (11, 44, 99)]
for a, b, c in SURD:
    v = a + b - c
    add(f"Simplify: √{a*a} + √{b*b} - √{c*c}",
        f"সৰল কৰা: √{as_num(a*a)} + √{as_num(b*b)} - √{as_num(c*c)}",
        v, [v + a, v - b, v + c, v * 2],
        f"The square roots are {a}, {b} and {c}, so the value is {v}.",
        f"বৰ্গমূলবোৰ {as_num(a)}, {as_num(b)} আৰু {as_num(c)}, সেয়ে মান {as_num(v)}।")

for a, b in [(3, 5), (4, 7), (5, 9), (6, 11), (7, 13), (8, 15)]:
    v = a * a + b * b + 2 * a * b
    add(f"Simplify: (√{a*a} + √{b*b})²",
        f"সৰল কৰা: (√{as_num(a*a)} + √{as_num(b*b)})²",
        v, [a * a + b * b, v - 2 * a * b, v + a * b, a * a * b * b],
        f"(a+b)² = a² + 2ab + b² = {v}.",
        f"(a+b)² = a² + 2ab + b² = {as_num(v)}।")

# 5. algebraic identities
IDENT = [(7, 5), (9, 4), (12, 7), (15, 8), (11, 6), (13, 9), (16, 5), (18, 7)]
for a, b in IDENT:
    v = (a + b) ** 2 - (a - b) ** 2
    add(f"Simplify: ({a} + {b})² - ({a} - {b})²",
        f"সৰল কৰা: ({as_num(a)} + {as_num(b)})² - ({as_num(a)} - {as_num(b)})²",
        v, [v // 2, v + 4 * a * b, a * a - b * b, v + 2 * a * b],
        f"(a+b)² - (a-b)² = 4ab = 4 × {a} × {b} = {v}.",
        f"(a+b)² - (a-b)² = 4ab = 4 × {as_num(a)} × {as_num(b)} = {as_num(v)}।")

for a, b in [(6, 4), (8, 3), (10, 7), (12, 5), (9, 2), (14, 6)]:
    v = a ** 3 - b ** 3
    add(f"Simplify: {a}³ - {b}³",
        f"সৰল কৰা: {as_num(a)}³ - {as_num(b)}³",
        v, [a ** 3 + b ** 3, (a - b) ** 3, v + 3 * a * b, v - a * b],
        f"{a}³ - {b}³ = {v}.",
        f"{as_num(a)}³ - {as_num(b)}³ = {as_num(v)}।")

# 6. continued fractions
CONT = [
    (1, 2, 3, 4), (2, 3, 4, 5), (1, 3, 2, 5), (3, 2, 1, 4),
    (2, 1, 4, 3), (1, 4, 2, 3), (3, 1, 2, 2), (2, 2, 3, 1),
]
for a, b, c, d in CONT:
    v = F(a) + F(1, b + F(1, c + F(1, d)))
    add(f"Simplify: {a} + 1/({b} + 1/({c} + 1/{d}))",
        f"সৰল কৰা: {as_num(a)} + ১/({as_num(b)} + ১/({as_num(c)} + ১/{as_num(d)}))",
        fnum(v), [fnum(v + F(1, 2)), fnum(v - F(1, 3)), fnum(1 / v), fnum(v + 1)],
        f"Working from the bottom up, the value is {fnum(v)}.",
        f"তলৰ পৰা ওপৰলৈ সৰল কৰিলে {fnum(v)} পোৱা যায়।")

# 7. square roots of decimals
DEC = [("0.0009", 0.03), ("1.44", 1.2), ("0.0121", 0.11), ("2.25", 1.5),
       ("0.0049", 0.07), ("6.25", 2.5), ("0.0196", 0.14), ("0.81", 0.9)]
for s, v in DEC:
    add(f"Find the value of √{s}",
        f"√{s} ৰ মান নিৰ্ণয় কৰা",
        v, [round(v * 2, 4), round(v / 2, 4), round(v + 0.1, 4), round(v * 10, 4)],
        f"√{s} = {v}.",
        f"√{s} = {v}।")

# 8. reciprocal sums
REC = [(3, 4, 6), (2, 5, 10), (4, 6, 12), (5, 10, 15), (6, 8, 24),
       (7, 14, 21), (8, 12, 24), (9, 18, 6)]
for a, b, c in REC:
    v = F(1, a) + F(1, b) + F(1, c)
    add(f"Simplify: 1/{a} + 1/{b} + 1/{c}",
        f"সৰল কৰা: ১/{as_num(a)} + ১/{as_num(b)} + ১/{as_num(c)}",
        fnum(v), [fnum(v + F(1, 2)), fnum(v - F(1, 6)), fnum(1 / (a + b + c)), fnum(v * 2)],
        f"Taking the LCM of the denominators gives {fnum(v)}.",
        f"হৰবোৰৰ ল.সা.গু. লৈ যোগ কৰিলে {fnum(v)} পোৱা যায়।")

# 9. percentage-fraction simplification
PCT = [("37.5", 96, 36), ("12.5", 64, 8), ("62.5", 48, 30), ("87.5", 32, 28),
       ("16 2/3", 60, 10), ("33 1/3", 90, 30), ("66 2/3", 45, 30), ("14 2/7", 70, 10)]
for p, n, v in PCT:
    add(f"Find the value of {p}% of {n}",
        f"{as_num(p)}% of {as_num(n)} ৰ মান নিৰ্ণয় কৰা",
        v, [v + 2, v - 2, v * 2, n - v],
        f"{p}% of {n} = {v}.",
        f"{as_num(p)}% of {as_num(n)} = {as_num(v)}।")

# 10. complex fraction simplification
CPLX = [(2, 3, 4, 5, 7, 10), (3, 4, 5, 6, 11, 12), (5, 8, 3, 4, 13, 16),
        (7, 12, 2, 3, 5, 6), (4, 9, 2, 3, 10, 27), (5, 6, 7, 12, 17, 24)]
for a, b, c, d, e, f in CPLX:
    v = (F(a, b) + F(c, d)) / F(e, f)
    add(f"Simplify: ({a}/{b} + {c}/{d}) ÷ ({e}/{f})",
        f"সৰল কৰা: ({a}/{b} + {c}/{d}) ÷ ({e}/{f})",
        fnum(v), [fnum(v + 1), fnum(v - F(1, 2)), fnum(v * 2), fnum(1 / v)],
        f"The value is {fnum(v)}.",
        f"মান {fnum(v)}।")

append("simplification-bodmas", rows)
