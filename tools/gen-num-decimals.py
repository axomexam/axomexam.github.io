#!/usr/bin/env python3
"""Decimals & Fractions: 95+ hard bilingual questions."""

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


# 1. recurring decimal to fraction
REC = [
    ("0.\\overline{3}", F(1, 3)), ("0.\\overline{6}", F(2, 3)), ("0.\\overline{1}", F(1, 9)),
    ("0.\\overline{27}", F(3, 11)), ("0.\\overline{45}", F(5, 11)), ("0.\\overline{72}", F(8, 11)),
    ("0.\\overline{142857}", F(1, 7)), ("0.\\overline{09}", F(1, 11)),
    ("0.1\\overline{6}", F(1, 6)), ("0.2\\overline{7}", F(5, 18)),
    ("0.1\\overline{3}", F(2, 15)), ("0.4\\overline{5}", F(41, 90)),
    ("0.\\overline{36}", F(4, 11)), ("0.\\overline{81}", F(9, 11)),
]
for s, v in REC:
    add(f"Express {s} as a fraction in its lowest terms.",
        f"{s} ক নিম্নতম ৰূপত ভগ্নাংশ হিচাপে প্ৰকাশ কৰা।",
        fnum(v), [fnum(v + F(1, 9)), fnum(v - F(1, 11)), fnum(v * 2), fnum(1 / v)],
        f"Using the recurring-decimal formula gives {fnum(v)}.",
        f"পুনৰাবৃত্তি দশমিকৰ সূত্ৰ ব্যৱহাৰ কৰি {fnum(v)} পোৱা যায়।")

# 2. compare fractions
CMP = [(7, 9, 8, 11), (5, 8, 7, 12), (11, 15, 13, 18), (9, 13, 7, 10),
       (17, 20, 21, 25), (13, 16, 19, 24), (23, 30, 17, 22), (29, 40, 31, 42),
       (37, 50, 41, 55), (19, 27, 23, 33)]
for a, b, c, d in CMP:
    x, y = F(a, b), F(c, d)
    big = f"{a}/{b}" if x > y else f"{c}/{d}"
    small = f"{c}/{d}" if x > y else f"{a}/{b}"
    add(f"Which fraction is greater: {a}/{b} or {c}/{d}?",
        f"কোন ভগ্নাংশ ডাঙৰ: {a}/{b} নে {c}/{d}?",
        big, [small, f"{a + c}/{b + d}", f"{a * c}/{b * d}"],
        f"Cross-multiplying shows {big} is greater.",
        f"ক্ৰছ-গুণ কৰিলে {big} ডাঙৰ বুলি প্ৰমাণিত হয়।")

# 3. ascending order
ORD = [
    [(3, 5), (2, 3), (7, 10), (5, 8)],
    [(4, 7), (5, 9), (3, 5), (7, 12)],
    [(5, 6), (7, 9), (11, 15), (13, 18)],
    [(2, 7), (3, 10), (1, 4), (4, 15)],
    [(9, 11), (7, 9), (5, 6), (11, 13)],
    [(8, 15), (5, 9), (3, 5), (7, 12)],
    [(13, 20), (7, 11), (5, 8), (17, 25)],
    [(6, 11), (4, 7), (7, 13), (5, 9)],
]
for grp in ORD:
    fs = [F(a, b) for a, b in grp]
    asc = sorted(range(len(grp)), key=lambda i: fs[i])
    correct = " < ".join(f"{grp[i][0]}/{grp[i][1]}" for i in asc)
    wrong = []
    for shift in (1, 2, 3):
        seq = [f"{grp[(i + shift) % len(grp)][0]}/{grp[(i + shift) % len(grp)][1]}" for i in asc]
        wrong.append(" < ".join(seq))
    add("Arrange the following fractions in ascending order: " + ", ".join(f"{a}/{b}" for a, b in grp),
        "তলৰ ভগ্নাংশবোৰ উৰ্ধক্ৰমত সজোৱা: " + ", ".join(f"{a}/{b}" for a, b in grp),
        correct, wrong,
        f"Comparing the decimal values gives {correct}.",
        f"দশমিক মান তুলনা কৰিলে {correct} পোৱা যায়।")

# 4. fraction of quantity
FRQ = [(3, 7, 294), (5, 8, 512), (7, 12, 588), (9, 11, 737), (4, 9, 675),
       (11, 15, 825), (13, 17, 969), (7, 15, 1125), (5, 12, 936), (8, 13, 1001)]
for a, b, n in FRQ:
    v = F(a, b) * n
    add(f"Find the value of {a}/{b} of {n}.",
        f"{as_num(n)} ৰ {as_num(a)}/{as_num(b)} ৰ মান নিৰ্ণয় কৰা।",
        fnum(v), [n - v, fnum(v * 2), fnum(v / 2), n // b],
        f"{a}/{b} × {n} = {fnum(v)}.",
        f"{as_num(a)}/{as_num(b)} × {as_num(n)} = {fnum(v)}।")

# 5. decimal to fraction
D2F = [("0.375", F(3, 8)), ("0.625", F(5, 8)), ("0.875", F(7, 8)), ("0.3125", F(5, 16)),
       ("0.0625", F(1, 16)), ("0.1875", F(3, 16)), ("0.4375", F(7, 16)),
       ("0.5625", F(9, 16)), ("0.6875", F(11, 16)), ("0.8125", F(13, 16))]
for s, v in D2F:
    add(f"Convert {s} into a fraction in its lowest terms.",
        f"{s} ক নিম্নতম ৰূপত ভগ্নাংশলৈ ৰূপান্তৰ কৰা।",
        fnum(v), [fnum(v + F(1, 16)), fnum(v - F(1, 16)), fnum(v * 2), fnum(1 - v)],
        f"{s} = {fnum(v)}.",
        f"{s} = {fnum(v)}।")

# 6. terminating / non-terminating
TERM = [
    ("3/8", ["5/6", "7/12", "2/9"]), ("7/16", ["5/12", "4/15", "8/9"]),
    ("13/25", ["7/15", "5/18", "11/27"]), ("9/40", ["5/14", "7/18", "11/24"]),
    ("17/50", ["4/9", "5/21", "7/30"]), ("11/80", ["5/27", "7/45", "9/14"]),
    ("21/125", ["5/33", "7/24", "11/18"]), ("19/160", ["5/36", "7/60", "9/22"]),
]
for good, bad in TERM:
    add("Which of the following fractions has a terminating decimal?",
        "তলৰ কোন ভগ্নাংশৰ দশমিক প্ৰকাশ সমাপ্ত হয়?",
        good, bad,
        f"{good} has a denominator of the form 2^m × 5^n, so its decimal terminates.",
        f"{good} ৰ হৰ ২^m × ৫^n ৰূপত আছে, সেয়ে দশমিক সমাপ্ত হয়।")

# 7. mixed to improper
MIX = [(5, 3, 8), (7, 5, 9), (9, 7, 11), (4, 5, 12), (8, 9, 13),
       (6, 11, 15), (10, 7, 16), (12, 5, 17)]
for A, b, c in MIX:
    v = F(A * c + b, c)
    add(f"Convert the mixed number {A} {b}/{c} into an improper fraction.",
        f"মিশ্ৰ সংখ্যা {as_num(A)} {as_num(b)}/{as_num(c)} ক অশুদ্ধ ভগ্নাংশলৈ ৰূপান্তৰ কৰা।",
        fnum(v), [fnum(F(A * c - b, c)), fnum(F(A + b, c)), fnum(F(A * c, c)), fnum(F(A * b + c, c))],
        f"{A} {b}/{c} = ({A} × {c} + {b})/{c} = {fnum(v)}.",
        f"{as_num(A)} {as_num(b)}/{as_num(c)} = ({as_num(A)} × {as_num(c)} + {as_num(b)})/{as_num(c)} = {fnum(v)}।")

# 8. complex fraction simplification
CPLX = [(3, 4, 5, 6, 7, 12), (5, 8, 7, 12, 11, 24), (2, 3, 3, 5, 19, 30),
        (7, 9, 5, 6, 29, 36), (4, 5, 3, 10, 11, 20), (9, 10, 2, 5, 13, 20),
        (5, 6, 7, 9, 29, 36), (3, 7, 4, 9, 55, 63)]
for a, b, c, d, e, f in CPLX:
    v = (F(a, b) * F(c, d)) / F(e, f)
    add(f"Simplify: ({a}/{b} × {c}/{d}) ÷ ({e}/{f})",
        f"সৰল কৰা: ({a}/{b} × {c}/{d}) ÷ ({e}/{f})",
        fnum(v), [fnum(v + 1), fnum(v - F(1, 2)), fnum(v * 2), fnum(1 / v)],
        f"The value is {fnum(v)}.",
        f"মান {fnum(v)}।")

# 9. fraction between two fractions
BET = [(3, 5, 4, 7), (5, 8, 2, 3), (7, 12, 3, 5), (9, 13, 5, 7),
       (11, 15, 7, 10), (13, 18, 3, 4), (17, 20, 5, 6), (19, 24, 7, 9)]
for a, b, c, d in BET:
    lo, hi = sorted([F(a, b), F(c, d)])
    mid = (lo + hi) / 2
    add(f"Which fraction lies between {a}/{b} and {c}/{d}?",
        f"কোন ভগ্নাংশ {a}/{b} আৰু {c}/{d} ৰ মাজত আছে?",
        fnum(mid), [fnum(lo - F(1, 10)), fnum(hi + F(1, 10)), fnum(lo), fnum(hi)],
        f"The midpoint {fnum(mid)} lies between the two fractions.",
        f"মধ্যবিন্দু {fnum(mid)} দুয়োটা ভগ্নাংশৰ মাজত আছে।")

# 10. recurring decimal arithmetic
RECA = [
    ("0.\\overline{3} + 0.\\overline{6}", F(1)),
    ("0.\\overline{9}", F(1)),
    ("0.\\overline{3} × 0.\\overline{6}", F(2, 9)),
    ("0.\\overline{1} + 0.\\overline{2}", F(1, 3)),
    ("0.\\overline{27} + 0.\\overline{72}", F(1)),
    ("0.\\overline{45} - 0.\\overline{27}", F(2, 11)),
]
for s, v in RECA:
    add(f"Find the value of {s}.",
        f"{s} ৰ মান নিৰ্ণয় কৰা।",
        fnum(v), [fnum(v + F(1, 9)), fnum(v - F(1, 9)), fnum(v * 2), fnum(v / 2)],
        f"Converting to fractions gives {fnum(v)}.",
        f"ভগ্নাংশলৈ ৰূপান্তৰ কৰিলে {fnum(v)} পোৱা যায়।")

# extra batch
for s, v in [("0.\\overline{18}", F(2, 11)), ("0.\\overline{54}", F(6, 11)),
             ("0.\\overline{63}", F(7, 11)), ("0.5\\overline{3}", F(8, 15))]:
    add(f"Express {s} as a fraction in its lowest terms.",
        f"{s} ক নিম্নতম ৰূপত ভগ্নাংশ হিচাপে প্ৰকাশ কৰা।",
        fnum(v), [fnum(v + F(1, 9)), fnum(v - F(1, 11)), fnum(v * 2), fnum(1 / v)],
        f"Using the recurring-decimal formula gives {fnum(v)}.",
        f"পুনৰাবৃত্তি দশমিকৰ সূত্ৰ ব্যৱহাৰ কৰি {fnum(v)} পোৱা যায়।")

for a, b, c, d in [(21, 25, 17, 20), (31, 40, 23, 30), (43, 50, 47, 55), (33, 40, 41, 50)]:
    x, y = F(a, b), F(c, d)
    big = f"{a}/{b}" if x > y else f"{c}/{d}"
    small = f"{c}/{d}" if x > y else f"{a}/{b}"
    add(f"Which fraction is greater: {a}/{b} or {c}/{d}?",
        f"কোন ভগ্নাংশ ডাঙৰ: {a}/{b} নে {c}/{d}?",
        big, [small, f"{a + c}/{b + d}", f"{a * c}/{b * d}"],
        f"Cross-multiplying shows {big} is greater.",
        f"ক্ৰছ-গুণ কৰিলে {big} ডাঙৰ বুলি প্ৰমাণিত হয়।")

for a, b, n in [(5, 9, 729), (7, 11, 847), (9, 13, 1053), (11, 17, 1156)]:
    v = F(a, b) * n
    add(f"Find the value of {a}/{b} of {n}.",
        f"{as_num(n)} ৰ {as_num(a)}/{as_num(b)} ৰ মান নিৰ্ণয় কৰা।",
        fnum(v), [n - v, fnum(v * 2), fnum(v / 2), n // b],
        f"{a}/{b} × {n} = {fnum(v)}.",
        f"{as_num(a)}/{as_num(b)} × {as_num(n)} = {fnum(v)}।")

for good, bad in [("7/20", ["5/9", "7/15", "11/21"]), ("9/50", ["4/7", "5/12", "7/18"]),
                  ("13/40", ["5/11", "7/24", "9/28"]), ("23/200", ["5/13", "7/30", "11/42"])]:
    add("Which of the following fractions has a terminating decimal?",
        "তলৰ কোন ভগ্নাংশৰ দশমিক প্ৰকাশ সমাপ্ত হয়?",
        good, bad,
        f"{good} has a denominator of the form 2^m × 5^n, so its decimal terminates.",
        f"{good} ৰ হৰ ২^m × ৫^n ৰূপত আছে, সেয়ে দশমিক সমাপ্ত হয়।")

for A, b, c in [(13, 3, 18), (15, 7, 19), (11, 9, 20), (14, 5, 21)]:
    v = F(A * c + b, c)
    add(f"Convert the mixed number {A} {b}/{c} into an improper fraction.",
        f"মিশ্ৰ সংখ্যা {as_num(A)} {as_num(b)}/{as_num(c)} ক অশুদ্ধ ভগ্নাংশলৈ ৰূপান্তৰ কৰা।",
        fnum(v), [fnum(F(A * c - b, c)), fnum(F(A + b, c)), fnum(F(A * c, c)), fnum(F(A * b + c, c))],
        f"{A} {b}/{c} = ({A} × {c} + {b})/{c} = {fnum(v)}.",
        f"{as_num(A)} {as_num(b)}/{as_num(c)} = ({as_num(A)} × {as_num(c)} + {as_num(b)})/{as_num(c)} = {fnum(v)}।")

append("decimals-fractions", rows)
