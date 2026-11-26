#!/usr/bin/env python3
"""Compound Interest: 95+ hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from num_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def r2(x):
    return round(x, 2)


# 1. amount
for P, r, n in [(10000, 10, 2), (15000, 8, 2), (20000, 12, 2), (25000, 6, 3),
                (40000, 5, 2), (50000, 10, 3), (64000, 15, 2), (80000, 12, 2),
                (12000, 20, 2), (18000, 25, 2)]:
    v = P * (1 + r / 100) ** n
    add(f"Find the compound amount on {P} at {r}% per annum for {n} years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% চক্ৰবৃদ্ধি হাৰে {as_num(n)} বছৰৰ মুঠ ধন নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (1 + r * n / 100)), r2(v - P), r2(v + P), r2(P * (1 + r / 100))],
        f"A = P(1+r/100)^n = {P}(1+{r}/100)^{n} = {r2(v)}.",
        f"মুঠ ধন = {as_num(r2(v))}।")

# 2. compound interest
for P, r, n in [(12000, 10, 2), (18000, 8, 2), (25000, 12, 2), (30000, 5, 3),
                (45000, 10, 2), (60000, 6, 2), (72000, 15, 2), (90000, 8, 3)]:
    ci = P * ((1 + r / 100) ** n - 1)
    add(f"Find the compound interest on {P} at {r}% per annum for {n} years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% চক্ৰবৃদ্ধি হাৰে {as_num(n)} বছৰৰ চক্ৰবৃদ্ধি সুত নিৰ্ণয় কৰা।",
        r2(ci), [r2(P * r * n / 100), r2(ci / 2), r2(ci + P), r2(ci * 2)],
        f"CI = P[(1+r/100)^n - 1] = {r2(ci)}.",
        f"চক্ৰবৃদ্ধি সুত = {as_num(r2(ci))}।")

# 3. find P from amount
for A, r, n in [(12100, 10, 2), (17496, 8, 2), (25088, 12, 2), (33750, 5, 3),
                (60500, 10, 2), (81000, 8, 2)]:
    P = A / (1 + r / 100) ** n
    add(f"The compound amount after {n} years at {r}% per annum is {A}. Find the principal.",
        f"বছৰি {as_num(r)}% চক্ৰবৃদ্ধি হাৰে {as_num(n)} বছৰৰ পিছত মুঠ ধন {as_num(A)} হ'লে মূলধন নিৰ্ণয় কৰা।",
        r2(P), [r2(A - P), r2(P / 2), r2(A / (1 + r * n / 100)), r2(P * 2)],
        f"P = A/(1+r/100)^n = {r2(P)}.",
        f"মূলধন = {as_num(r2(P))}।")

# 4. find rate
for P, A, n in [(10000, 12100, 2), (15000, 18150, 2), (20000, 25920, 2),
                (25000, 30250, 2), (8000, 10368, 2)]:
    r = (round((A / P) ** (1 / n), 6) - 1) * 100
    add(f"A sum of {P} amounts to {A} in {n} years at compound interest. Find the rate percent per annum.",
        f"{as_num(P)} টকা চক্ৰবৃদ্ধি সুতত {as_num(n)} বছৰত {as_num(A)} হয়। বছৰি সুতৰ হাৰ নিৰ্ণয় কৰা।",
        r2(r), [r2(r / 2), r2(r * 2), r2((A - P) * 100 / (P * n)), r2(r + 1)],
        f"r = [(A/P)^(1/n) - 1] × 100 = {r2(r)}%.",
        f"হাৰ = {as_num(r2(r))}%।")

# 5. CI - SI difference 2 years
for P, r in [(10000, 10), (20000, 5), (15000, 8), (25000, 12), (40000, 6), (50000, 15)]:
    v = P * (r / 100) ** 2
    add(f"Find the difference between compound interest and simple interest on {P} at {r}% per annum for 2 years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% হাৰে ২ বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য নিৰ্ণয় কৰা।",
        r2(v), [r2(P * r / 100), r2(v / 2), r2(v * 2), r2(P * (r / 100) ** 3)],
        f"Difference = P(r/100)² = {P}×({r}/100)² = {r2(v)}.",
        f"পাৰ্থক্য = {as_num(r2(v))}।")

# 6. CI - SI difference 3 years
for P, r in [(10000, 10), (20000, 5), (15000, 8), (25000, 12)]:
    v = P * (r / 100) ** 2 * (3 + r / 100)
    add(f"Find the difference between compound interest and simple interest on {P} at {r}% per annum for 3 years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% হাৰে ৩ বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (r / 100) ** 2), r2(v / 2), r2(v * 2), r2(P * r / 100)],
        f"Difference = P(r/100)²(3 + r/100) = {r2(v)}.",
        f"পাৰ্থক্য = {as_num(r2(v))}।")

# 7. half-yearly
for P, r, n in [(20000, 10, 1), (40000, 8, 1), (50000, 12, 1), (16000, 10, 2),
                (25000, 8, 2), (64000, 5, 1)]:
    v = P * (1 + r / 200) ** (2 * n)
    add(f"Find the compound amount on {P} at {r}% per annum compounded half-yearly for {n} year(s).",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% হাৰে অৰ্ধবাৰ্ষিক চক্ৰবৃদ্ধিত {as_num(n)} বছৰৰ মুঠ ধন নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (1 + r / 100) ** n), r2(v - P), r2(v + P), r2(P * (1 + r / 200) ** n)],
        f"A = P(1 + r/200)^(2n) = {r2(v)}.",
        f"মুঠ ধন = {as_num(r2(v))}।")

# 8. quarterly
for P, r, n in [(16000, 12, 1), (25000, 8, 1), (40000, 10, 1), (50000, 6, 1)]:
    v = P * (1 + r / 400) ** (4 * n)
    add(f"Find the compound amount on {P} at {r}% per annum compounded quarterly for {n} year(s).",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% হাৰে ত্ৰৈমাসিক চক্ৰবৃদ্ধিত {as_num(n)} বছৰৰ মুঠ ধন নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (1 + r / 100) ** n), r2(P * (1 + r / 200) ** (2 * n)), r2(v - P), r2(v + P)],
        f"A = P(1 + r/400)^(4n) = {r2(v)}.",
        f"মুঠ ধন = {as_num(r2(v))}।")

# 9. different rates
for P, r1, r2_ in [(10000, 10, 20), (20000, 5, 10), (15000, 8, 12), (25000, 6, 8), (40000, 12, 5)]:
    v = P * (1 + r1 / 100) * (1 + r2_ / 100)
    add(f"Find the compound amount on {P} if the rate is {r1}% for the first year and {r2_}% for the second year.",
        f"{as_num(P)} টকাৰ ওপৰত প্ৰথম বছৰ {as_num(r1)}% আৰু দ্বিতীয় বছৰ {as_num(r2_)}% হাৰ হ'লে মুঠ ধন নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (1 + (r1 + r2_) / 200) ** 2), r2(v - P), r2(P * (1 + r1 / 100)), r2(v + P)],
        f"A = {P}(1+{r1}/100)(1+{r2_}/100) = {r2(v)}.",
        f"মুঠ ধন = {as_num(r2(v))}।")

# 10. effective rate
for r in [10, 12, 8, 15, 20, 5]:
    v = ((1 + r / 200) ** 2 - 1) * 100
    add(f"Find the effective annual rate of interest if the nominal rate is {r}% per annum compounded half-yearly.",
        f"বাৰ্ষিক নামমাত্ৰ হাৰ {as_num(r)}% আৰু অৰ্ধবাৰ্ষিক চক্ৰবৃদ্ধি হ'লে প্ৰকৃত বাৰ্ষিক হাৰ নিৰ্ণয় কৰা।",
        r2(v), [r2(r), r2(r / 2), r2(v / 2), r2(r * 2)],
        f"Effective rate = [(1 + {r}/200)² - 1] × 100 = {r2(v)}%.",
        f"প্ৰকৃত হাৰ = {as_num(r2(v))}%।")

# 11. depreciation
for P, r, n in [(80000, 10, 2), (125000, 20, 2), (64000, 25, 2), (50000, 8, 2)]:
    v = P * (1 - r / 100) ** n
    add(f"A machine worth {P} depreciates at {r}% per annum. Find its value after {n} years.",
        f"{as_num(P)} মূল্যৰ যন্ত্ৰ বছৰি {as_num(r)}% হাৰে অৱমূল্যন হয়। {as_num(n)} বছৰৰ পিছত মূল্য নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (1 - r * n / 100)), r2(P - v), r2(v / 2), r2(P * (1 - r / 100))],
        f"Value = {P}(1 - {r}/100)^{n} = {r2(v)}.",
        f"মূল্য = {as_num(r2(v))}।")

# 12. CI for 2 years direct
for P, r in [(30000, 10), (45000, 8), (60000, 12), (75000, 5), (90000, 15)]:
    v = P * ((1 + r / 100) ** 2 - 1)
    add(f"Find the compound interest on {P} at {r}% per annum for 2 years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% হাৰে ২ বছৰৰ চক্ৰবৃদ্ধি সুত নিৰ্ণয় কৰা।",
        r2(v), [r2(P * r * 2 / 100), r2(v / 2), r2(v + P), r2(v * 2)],
        f"CI = {P}[(1+{r}/100)² - 1] = {r2(v)}.",
        f"চক্ৰবৃদ্ধি সুত = {as_num(r2(v))}।")

# extra batch
for P, r, n in [(30000, 10, 2), (45000, 8, 2), (60000, 12, 2), (75000, 6, 2)]:
    v = P * (1 + r / 100) ** n
    add(f"Find the compound amount on {P} at {r}% per annum for {n} years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% চক্ৰবৃদ্ধি হাৰে {as_num(n)} বছৰৰ মুঠ ধন নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (1 + r * n / 100)), r2(v - P), r2(v + P), r2(P * (1 + r / 100))],
        f"A = {r2(v)}.",
        f"মুঠ ধন = {as_num(r2(v))}।")

for P, r, n in [(16000, 10, 2), (24000, 8, 2), (36000, 12, 2), (48000, 5, 3)]:
    ci = P * ((1 + r / 100) ** n - 1)
    add(f"Find the compound interest on {P} at {r}% per annum for {n} years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% চক্ৰবৃদ্ধি হাৰে {as_num(n)} বছৰৰ চক্ৰবৃদ্ধি সুত নিৰ্ণয় কৰা।",
        r2(ci), [r2(P * r * n / 100), r2(ci / 2), r2(ci + P), r2(ci * 2)],
        f"CI = {r2(ci)}.",
        f"চক্ৰবৃদ্ধি সুত = {as_num(r2(ci))}।")

for A, r, n in [(14641, 10, 2), (20736, 8, 2), (33880, 10, 2)]:
    P = A / (1 + r / 100) ** n
    add(f"The compound amount after {n} years at {r}% per annum is {A}. Find the principal.",
        f"বছৰি {as_num(r)}% চক্ৰবৃদ্ধি হাৰে {as_num(n)} বছৰৰ পিছত মুঠ ধন {as_num(A)} হ'লে মূলধন নিৰ্ণয় কৰা।",
        r2(P), [r2(A - P), r2(P / 2), r2(A / (1 + r * n / 100)), r2(P * 2)],
        f"P = {r2(P)}.",
        f"মূলধন = {as_num(r2(P))}।")

for P, A, n in [(10000, 11025, 2), (16000, 17640, 2), (40000, 44944, 2)]:
    r = (round((A / P) ** (1 / n), 6) - 1) * 100
    add(f"A sum of {P} amounts to {A} in {n} years at compound interest. Find the rate percent per annum.",
        f"{as_num(P)} টকা চক্ৰবৃদ্ধি সুতত {as_num(n)} বছৰত {as_num(A)} হয়। বছৰি সুতৰ হাৰ নিৰ্ণয় কৰা।",
        r2(r), [r2(r / 2), r2(r * 2), r2((A - P) * 100 / (P * n)), r2(r + 1)],
        f"r = {r2(r)}%.",
        f"হাৰ = {as_num(r2(r))}%।")

for P, r in [(12000, 10), (18000, 8), (36000, 5)]:
    v = P * (r / 100) ** 2
    add(f"Find the difference between compound interest and simple interest on {P} at {r}% per annum for 2 years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% হাৰে ২ বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য নিৰ্ণয় কৰা।",
        r2(v), [r2(P * r / 100), r2(v / 2), r2(v * 2), r2(P * (r / 100) ** 3)],
        f"Difference = {r2(v)}.",
        f"পাৰ্থক্য = {as_num(r2(v))}।")

for P, r in [(20000, 10), (30000, 5)]:
    v = P * (r / 100) ** 2 * (3 + r / 100)
    add(f"Find the difference between compound interest and simple interest on {P} at {r}% per annum for 3 years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% হাৰে ৩ বছৰৰ চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (r / 100) ** 2), r2(v / 2), r2(v * 2), r2(P * r / 100)],
        f"Difference = {r2(v)}.",
        f"পাৰ্থক্য = {as_num(r2(v))}।")

for P, r, n in [(10000, 10, 2), (32000, 8, 1)]:
    v = P * (1 + r / 200) ** (2 * n)
    add(f"Find the compound amount on {P} at {r}% per annum compounded half-yearly for {n} year(s).",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% হাৰে অৰ্ধবাৰ্ষিক চক্ৰবৃদ্ধিত {as_num(n)} বছৰৰ মুঠ ধন নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (1 + r / 100) ** n), r2(v - P), r2(v + P), r2(P * (1 + r / 200) ** n)],
        f"A = {r2(v)}.",
        f"মুঠ ধন = {as_num(r2(v))}।")

for P, r, n in [(64000, 10, 1), (81000, 8, 1)]:
    v = P * (1 + r / 400) ** (4 * n)
    add(f"Find the compound amount on {P} at {r}% per annum compounded quarterly for {n} year(s).",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% হাৰে ত্ৰৈমাসিক চক্ৰবৃদ্ধিত {as_num(n)} বছৰৰ মুঠ ধন নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (1 + r / 100) ** n), r2(P * (1 + r / 200) ** (2 * n)), r2(v - P), r2(v + P)],
        f"A = {r2(v)}.",
        f"মুঠ ধন = {as_num(r2(v))}।")

for P, r1, r2_ in [(12000, 10, 15), (20000, 8, 10)]:
    v = P * (1 + r1 / 100) * (1 + r2_ / 100)
    add(f"Find the compound amount on {P} if the rate is {r1}% for the first year and {r2_}% for the second year.",
        f"{as_num(P)} টকাৰ ওপৰত প্ৰথম বছৰ {as_num(r1)}% আৰু দ্বিতীয় বছৰ {as_num(r2_)}% হাৰ হ'লে মুঠ ধন নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (1 + (r1 + r2_) / 200) ** 2), r2(v - P), r2(P * (1 + r1 / 100)), r2(v + P)],
        f"A = {r2(v)}.",
        f"মুঠ ধন = {as_num(r2(v))}।")

for r in [6, 25]:
    v = ((1 + r / 200) ** 2 - 1) * 100
    add(f"Find the effective annual rate of interest if the nominal rate is {r}% per annum compounded half-yearly.",
        f"বাৰ্ষিক নামমাত্ৰ হাৰ {as_num(r)}% আৰু অৰ্ধবাৰ্ষিক চক্ৰবৃদ্ধি হ'লে প্ৰকৃত বাৰ্ষিক হাৰ নিৰ্ণয় কৰা।",
        r2(v), [r2(r), r2(r / 2), r2(v / 2), r2(r * 2)],
        f"Effective rate = {r2(v)}%.",
        f"প্ৰকৃত হাৰ = {as_num(r2(v))}%।")

for P, r, n in [(100000, 10, 2), (80000, 20, 2)]:
    v = P * (1 - r / 100) ** n
    add(f"A machine worth {P} depreciates at {r}% per annum. Find its value after {n} years.",
        f"{as_num(P)} মূল্যৰ যন্ত্ৰ বছৰি {as_num(r)}% হাৰে অৱমূল্যন হয়। {as_num(n)} বছৰৰ পিছত মূল্য নিৰ্ণয় কৰা।",
        r2(v), [r2(P * (1 - r * n / 100)), r2(P - v), r2(v / 2), r2(P * (1 - r / 100))],
        f"Value = {r2(v)}.",
        f"মূল্য = {as_num(r2(v))}।")

for P, r in [(15000, 10), (24000, 12)]:
    v = P * ((1 + r / 100) ** 2 - 1)
    add(f"Find the compound interest on {P} at {r}% per annum for 2 years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(r)}% হাৰে ২ বছৰৰ চক্ৰবৃদ্ধি সুত নিৰ্ণয় কৰা।",
        r2(v), [r2(P * r * 2 / 100), r2(v / 2), r2(v + P), r2(v * 2)],
        f"CI = {r2(v)}.",
        f"চক্ৰবৃদ্ধি সুত = {as_num(r2(v))}।")

append("compound-interest", rows)
