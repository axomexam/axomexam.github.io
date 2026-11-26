#!/usr/bin/env python3
"""LCM & HCF: 95+ hard bilingual questions."""

import math
import sys
from fractions import Fraction as F
sys.path.insert(0, "tools")
from num_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


# 1. LCM / HCF of numbers
TRIPLES = [(24, 36, 54), (18, 30, 42), (16, 24, 40), (27, 45, 72), (14, 21, 35),
           (32, 48, 80), (25, 40, 60), (36, 54, 90), (22, 33, 55), (28, 42, 70),
           (45, 60, 75), (48, 64, 96)]
for a, b, c in TRIPLES:
    L = math.lcm(a, b, c)
    H = math.gcd(math.gcd(a, b), c)
    add(f"Find the LCM of {a}, {b} and {c}.",
        f"{as_num(a)}, {as_num(b)} আৰু {as_num(c)} ৰ ল.সা.গু. নিৰ্ণয় কৰা।",
        L, [L // 2, L * 2, a * b * c // H, L + H],
        f"LCM({a},{b},{c}) = {L}.",
        f"ল.সা.গু.({as_num(a)},{as_num(b)},{as_num(c)}) = {as_num(L)}।")
    add(f"Find the HCF of {a}, {b} and {c}.",
        f"{as_num(a)}, {as_num(b)} আৰু {as_num(c)} ৰ গ.সা.গু. নিৰ্ণয় কৰা।",
        H, [H * 2, H + 1, min(a, b, c) // H, L // H],
        f"HCF({a},{b},{c}) = {H}.",
        f"গ.সা.গু.({as_num(a)},{as_num(b)},{as_num(c)}) = {as_num(H)}।")

# 2. LCM / HCF of fractions
FR = [((2, 3), (3, 4), (5, 6)), ((3, 5), (4, 7), (2, 3)), ((5, 8), (7, 12), (3, 4)),
      ((4, 9), (5, 6), (7, 12)), ((7, 10), (3, 5), (4, 15)), ((5, 6), (7, 9), (11, 18))]
for (a, b), (c, d), (e, f) in FR:
    L = F(math.lcm(a, c, e), math.gcd(math.gcd(b, d), f))
    H = F(math.gcd(math.gcd(a, c), e), math.lcm(b, d, f))
    add(f"Find the LCM of the fractions {a}/{b}, {c}/{d} and {e}/{f}.",
        f"{a}/{b}, {c}/{d} আৰু {e}/{f} ভগ্নাংশৰ ল.সা.গু. নিৰ্ণয় কৰা।",
        f"{L.numerator}/{L.denominator}" if L.denominator != 1 else L.numerator,
        [f"{(L*2).numerator}/{(L*2).denominator}", f"{(L/2).numerator}/{(L/2).denominator}",
         f"{H.numerator}/{H.denominator}", f"{L.numerator + 1}/{L.denominator}"],
        f"LCM of fractions = LCM(numerators)/HCF(denominators) = {L}.",
        f"ভগ্নাংশৰ ল.সা.গু. = হৰসমূহৰ গ.সা.গু. / লবসমূহৰ ল.সা.গু. = {L}।")
    add(f"Find the HCF of the fractions {a}/{b}, {c}/{d} and {e}/{f}.",
        f"{a}/{b}, {c}/{d} আৰু {e}/{f} ভগ্নাংশৰ গ.সা.গু. নিৰ্ণয় কৰা।",
        f"{H.numerator}/{H.denominator}" if H.denominator != 1 else H.numerator,
        [f"{(H*2).numerator}/{(H*2).denominator}", f"{(H/2).numerator}/{(H/2).denominator}",
         f"{L.numerator}/{L.denominator}", f"{H.numerator + 1}/{H.denominator}"],
        f"HCF of fractions = HCF(numerators)/LCM(denominators) = {H}.",
        f"ভগ্নাংশৰ গ.সা.গু. = লবসমূহৰ গ.সা.গু. / হৰসমূহৰ ল.সা.গু. = {H}।")

# 3. product relationship
PAIRS = [(12, 360, 24), (15, 180, 45), (18, 720, 36), (20, 840, 60),
         (16, 480, 32), (21, 1260, 84), (25, 900, 100), (28, 1680, 112)]
for H, L, a in PAIRS:
    b = H * L // a
    add(f"The HCF of two numbers is {H} and their LCM is {L}. If one number is {a}, the other is",
        f"দুটা সংখ্যাৰ গ.সা.গু. {as_num(H)} আৰু ল.সা.গু. {as_num(L)}। এটা সংখ্যা {as_num(a)} হ'লে আনটো কিমান",
        b, [H * L, L // H, b + H, b - H],
        f"Product of numbers = HCF × LCM, so the other number = {H} × {L} ÷ {a} = {b}.",
        f"সংখ্যা দুটাৰ গুণফল = গ.সা.গু. × ল.সা.গু., সেয়ে আনটো = {as_num(H)} × {as_num(L)} ÷ {as_num(a)} = {as_num(b)}।")

# 4. remainder problems
REM = [(5, 7, 9, 3), (6, 8, 12, 5), (8, 10, 15, 7), (9, 12, 18, 4),
       (10, 14, 21, 6), (12, 15, 20, 8), (7, 11, 13, 5), (15, 20, 25, 9)]
for a, b, c, r in REM:
    L = math.lcm(a, b, c)
    v = L + r
    add(f"The least number which when divided by {a}, {b} and {c} leaves the same remainder {r} in each case is",
        f"আটাইতকৈ সৰু সংখ্যা যিটো {as_num(a)}, {as_num(b)} আৰু {as_num(c)} ৰে ভাগ কৰিলে প্ৰতিটোতে একে ভাগশেষ {as_num(r)} থাকে",
        v, [L - r, L, L + r + 1, L * 2 + r],
        f"Required number = LCM({a},{b},{c}) + {r} = {L} + {r} = {v}.",
        f"প্ৰয়োজনীয় সংখ্যা = ল.সা.গু. + {as_num(r)} = {as_num(L)} + {as_num(r)} = {as_num(v)}।")

for a, b, c, r in [(24, 36, 48, 5), (30, 45, 60, 7), (18, 27, 36, 4),
                   (40, 50, 60, 11), (21, 28, 35, 6), (32, 40, 56, 9)]:
    H = math.gcd(math.gcd(a - r, b - r), c - r)
    add(f"The greatest number that divides {a}, {b} and {c} leaving the same remainder {r} in each case is",
        f"আটাইতকৈ ডাঙৰ সংখ্যা যিটো {as_num(a)}, {as_num(b)} আৰু {as_num(c)} ক ভাগ কৰিলে প্ৰতিটোতে একে ভাগশেষ {as_num(r)} থাকে",
        H, [H * 2, H + 1, H - 1, r],
        f"Required number = HCF({a-r},{b-r},{c-r}) = {H}.",
        f"প্ৰয়োজনীয় সংখ্যা = গ.সা.গু.({as_num(a-r)},{as_num(b-r)},{as_num(c-r)}) = {as_num(H)}।")

# 5. smallest number divisible by
DIV = [(12, 18, 24), (15, 20, 30), (8, 14, 21), (16, 20, 24),
       (9, 15, 25), (10, 12, 18), (14, 21, 28), (6, 15, 20)]
for a, b, c in DIV:
    L = math.lcm(a, b, c)
    add(f"The smallest number that is exactly divisible by {a}, {b} and {c} is",
        f"আটাইতকৈ সৰু সংখ্যা যিটো {as_num(a)}, {as_num(b)} আৰু {as_num(c)} ৰে সম্পূৰ্ণ বিভাজ্য",
        L, [L * 2, L // 2, a * b * c, L + a],
        f"The smallest such number is LCM({a},{b},{c}) = {L}.",
        f"আটাইতকৈ সৰু সংখ্যা = ল.সা.গু.({as_num(a)},{as_num(b)},{as_num(c)}) = {as_num(L)}।")

# 6. largest number dividing
LARGE = [(72, 96, 120), (84, 126, 210), (105, 140, 175), (90, 135, 180),
         (96, 144, 240), (108, 162, 270)]
for a, b, c in LARGE:
    H = math.gcd(math.gcd(a, b), c)
    add(f"The greatest number that divides {a}, {b} and {c} exactly is",
        f"আটাইতকৈ ডাঙৰ সংখ্যা যিটো {as_num(a)}, {as_num(b)} আৰু {as_num(c)} ক সম্পূৰ্ণৰূপে ভাগ কৰে",
        H, [H * 2, H * 3, H + 1, H - 1],
        f"Required number = HCF({a},{b},{c}) = {H}.",
        f"প্ৰয়োজনীয় সংখ্যা = গ.সা.গু.({as_num(a)},{as_num(b)},{as_num(c)}) = {as_num(H)}।")

# 7. bells ringing
BELL = [(6, 8, 12), (10, 15, 25), (12, 18, 24), (9, 12, 15),
        (14, 21, 28), (20, 30, 40), (8, 10, 16), (15, 18, 45)]
for a, b, c in BELL:
    L = math.lcm(a, b, c)
    add(f"Three bells ring at intervals of {a}, {b} and {c} minutes. If they ring together now, after how many minutes will they next ring together?",
        f"তিনিটা ঘণ্টাই {as_num(a)}, {as_num(b)} আৰু {as_num(c)} মিনিটৰ বিৰতিৰে বাজে। এতিয়া একেলগে বাজিলে কিমান মিনিটৰ পিছত পুনৰ একেলগে বাজিব?",
        L, [L // 2, L * 2, a + b + c, L + a],
        f"They ring together after LCM({a},{b},{c}) = {L} minutes.",
        f"তেওঁলোক {as_num(L)} মিনিটৰ পিছত একেলগে বাজিব (ল.সা.গু. = {as_num(L)})।")

# 8. square tiles
TILE = [(18, 12), (24, 16), (30, 18), (36, 24), (45, 27), (48, 32)]
for l, b in TILE:
    H = math.gcd(l, b)
    n = (l // H) * (b // H)
    add(f"A room is {l} m long and {b} m wide. The least number of square tiles of equal size needed to cover the floor is",
        f"এটা কোঠা {as_num(l)} মিটাৰ দীঘ আৰু {as_num(b)} মিটাৰ বহল। সমান আকাৰৰ বৰ্গাকৃতি টাইলচেৰে মজিয়া ঢাকিবলৈ আটাইতকৈ কম কিমান টাইল লাগিব",
        n, [n * 2, l * b, n + H, (l * b) // H],
        f"Tile side = HCF({l},{b}) = {H} m; number of tiles = ({l}/{H}) × ({b}/{H}) = {n}.",
        f"টাইলৰ বাহু = গ.সা.গু.({as_num(l)},{as_num(b)}) = {as_num(H)} মিটাৰ; টাইলৰ সংখ্যা = {as_num(n)}।")

# 9. HCF / LCM of decimals
DEC = [("0.6, 0.9, 1.2", 3.6, "LCM"), ("0.4, 0.6, 0.8", 2.4, "LCM"),
       ("1.5, 2.5, 3.5", 0.5, "HCF"), ("0.12, 0.18, 0.24", 0.06, "HCF"),
       ("0.8, 1.2, 1.6", 4.8, "LCM"), ("2.4, 3.6, 4.8", 1.2, "HCF")]
for s, v, kind in DEC:
    add(f"Find the {kind} of {s}.",
        f"{s} ৰ {kind} নিৰ্ণয় কৰা।",
        v, [round(v * 2, 4), round(v / 2, 4), round(v + 0.1, 4), round(v * 10, 4)],
        f"Converting to integers and rescaling gives {kind} = {v}.",
        f"পূৰ্ণসংখ্যালৈ ৰূপান্তৰ কৰি পুনৰ মাপ দিলে {kind} = {v} পোৱা যায়।")

# 10. number of pairs given HCF and LCM
PAIRN = [(6, 180), (8, 240), (10, 300), (12, 360), (15, 450), (18, 540), (20, 600), (24, 720)]
for H, L in PAIRN:
    q = L // H
    k = len(set())
    n = 1
    d = 2
    qq = q
    while d * d <= qq:
        if qq % d == 0:
            n *= 2
            while qq % d == 0:
                qq //= d
        d += 1
    if qq > 1:
        n *= 2
    pairs = n // 2 if n > 1 else 1
    add(f"The number of pairs of positive integers whose HCF is {H} and LCM is {L} is",
        f"যুগ্ম ধনাত্মক পূৰ্ণসংখ্যাৰ সংখ্যা যাৰ গ.সা.গু. {as_num(H)} আৰু ল.সা.গু. {as_num(L)}",
        pairs, [pairs * 2, pairs + 1, pairs - 1, 1],
        f"L/H = {q} has {n//2 if n>1 else 1} unordered factor pairs, giving {pairs} pairs.",
        f"L/H = {as_num(q)} ৰ {as_num(pairs)} যোৰ সংখ্যা পোৱা যায়।")

append("lcm-hcf", rows)
