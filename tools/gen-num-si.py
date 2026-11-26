#!/usr/bin/env python3
"""Simple Interest: 95+ hard bilingual questions."""

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


# 1. find SI
for P, R, T in [(8000, 8, 3), (12500, 12, 4), (24000, 10, 5), (36000, 15, 2),
                (48000, 7.5, 3), (64000, 12.5, 2), (75000, 8, 4), (90000, 11, 3)]:
    v = P * R * T / 100
    add(f"Find the simple interest on {P} at {R}% per annum for {T} years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(R)}% হাৰে {as_num(T)} বছৰৰ সৰল সুত নিৰ্ণয় কৰা।",
        r2(v), [r2(v * 2), r2(v / 2), r2(P * R / 100), r2(P + v)],
        f"SI = PRT/100 = {P}×{R}×{T}/100 = {r2(v)}.",
        f"সৰল সুত = PRT/১০০ = {as_num(r2(v))}।")

# 2. find P
for SI, R, T in [(2400, 8, 3), (5400, 12, 3), (9600, 10, 4), (15750, 15, 5),
                 (8400, 7, 4), (11200, 14, 2)]:
    v = SI * 100 / (R * T)
    add(f"The simple interest on a sum at {R}% per annum for {T} years is {SI}. Find the sum.",
        f"বছৰি {as_num(R)}% হাৰে {as_num(T)} বছৰত সৰল সুত {as_num(SI)} হ'লে মূলধন নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(SI * R * T / 100), r2(v + SI)],
        f"P = SI×100/(R×T) = {SI}×100/({R}×{T}) = {r2(v)}.",
        f"মূলধন = {as_num(r2(v))}।")

# 3. find R
for P, SI, T in [(15000, 3600, 3), (24000, 8640, 4), (36000, 12960, 3),
                 (48000, 11520, 2), (60000, 18900, 5), (72000, 17280, 4)]:
    v = SI * 100 / (P * T)
    add(f"The simple interest on {P} for {T} years is {SI}. Find the rate percent per annum.",
        f"{as_num(P)} টকাৰ {as_num(T)} বছৰৰ সৰল সুত {as_num(SI)} হ'লে বছৰি সুতৰ হাৰ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(SI * 100 / P), r2(v + 1)],
        f"R = SI×100/(P×T) = {SI}×100/({P}×{T}) = {r2(v)}%.",
        f"সুতৰ হাৰ = {as_num(r2(v))}%।")

# 4. find T
for P, SI, R in [(18000, 5400, 9), (25000, 7500, 10), (32000, 8960, 14),
                 (45000, 10800, 8), (56000, 15120, 12), (64000, 11520, 9)]:
    v = SI * 100 / (P * R)
    add(f"The simple interest on {P} at {R}% per annum is {SI}. Find the time.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(R)}% হাৰে সৰল সুত {as_num(SI)} হ'লে সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(SI * 100 / R), r2(v + 1)],
        f"T = SI×100/(P×R) = {r2(v)} years.",
        f"সময় = {as_num(r2(v))} বছৰ।")

# 5. amount
for P, R, T in [(12000, 10, 2), (20000, 12, 3), (35000, 8, 4), (50000, 15, 2),
                (72000, 9, 3), (84000, 11, 2)]:
    si = P * R * T / 100
    v = P + si
    add(f"Find the amount on {P} at {R}% per annum simple interest for {T} years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(R)}% সৰল সুত হাৰে {as_num(T)} বছৰৰ মুঠ ধন নিৰ্ণয় কৰা।",
        r2(v), [r2(si), r2(P - si), r2(v * 2), r2(P)],
        f"SI = {r2(si)}; amount = {P} + {r2(si)} = {r2(v)}.",
        f"সৰল সুত = {as_num(r2(si))}; মুঠ ধন = {as_num(r2(v))}।")

# 6. doubles
for T in [5, 8, 10, 12.5, 16, 20, 25]:
    v = 100 / T
    add(f"A sum of money doubles itself in {T} years at simple interest. Find the rate percent per annum.",
        f"এটা মূলধন সৰল সুতত {as_num(T)} বছৰত দুগুণ হয়। বছৰি সুতৰ হাৰ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(100 / (2 * T)), r2(v + 2)],
        f"R = 100/T = 100/{T} = {r2(v)}%.",
        f"হাৰ = ১০০/T = {as_num(r2(v))}%।")

# 7. n times
for n, T in [(3, 10), (4, 15), (5, 20), (6, 25), (2, 12.5), (3, 8)]:
    v = 100 * (n - 1) / T
    add(f"A sum becomes {n} times of itself in {T} years at simple interest. Find the rate percent per annum.",
        f"এটা মূলধন সৰল সুতত {as_num(T)} বছৰত নিজৰ {as_num(n)} গুণ হয়। বছৰি সুতৰ হাৰ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(100 / T), r2(v * 2), r2(v + 3)],
        f"R = 100(n-1)/T = 100×{n-1}/{T} = {r2(v)}%.",
        f"হাৰ = {as_num(r2(v))}%।")

# 8. two parts
for P, r1, r2_, t, SI in [(20000, 10, 8, 3, 5280), (30000, 12, 9, 2, 6300),
                          (40000, 15, 10, 3, 13500), (50000, 8, 6, 4, 13600)]:
    p1 = (SI * 100 / t - P * r2_) / (r1 - r2_)
    p2 = P - p1
    add(f"A sum of {P} is lent in two parts at {r1}% and {r2_}% per annum for {t} years. If the total simple interest is {SI}, find the part lent at {r1}%.",
        f"{as_num(P)} টকা দুটা অংশত বছৰি {as_num(r1)}% আৰু {as_num(r2_)}% হাৰে {as_num(t)} বছৰলৈ ঋণ দিয়া হয়। মুঠ সৰল সুত {as_num(SI)} হ'লে {as_num(r1)}% ত দিয়া অংশ নিৰ্ণয় কৰা।",
        r2(p1), [r2(p2), r2(p1 / 2), r2(p1 * 2), r2(SI * 100 / (r1 * t))],
        f"Solving the two-part equation gives {r2(p1)} at {r1}%.",
        f"সমীকৰণ সমাধান কৰিলে {as_num(r1)}% ত {as_num(r2(p1))} পোৱা যায়।")

# 9. rate changes
for P, r1, t1, r2_, t2 in [(25000, 8, 2, 10, 3), (40000, 6, 3, 9, 2),
                           (60000, 10, 1, 12, 4), (80000, 7, 2, 9, 3)]:
    v = P * (r1 * t1 + r2_ * t2) / 100
    add(f"Find the simple interest on {P} if the rate is {r1}% for the first {t1} years and {r2_}% for the next {t2} years.",
        f"{as_num(P)} টকাৰ ওপৰত প্ৰথম {as_num(t1)} বছৰ {as_num(r1)}% আৰু পৰৱৰ্তী {as_num(t2)} বছৰ {as_num(r2_)}% হাৰ হ'লে সৰল সুত নিৰ্ণয় কৰা।",
        r2(v), [r2(P * r1 * (t1 + t2) / 100), r2(P * r2_ * (t1 + t2) / 100), r2(v / 2), r2(v * 2)],
        f"SI = {P}({r1}×{t1} + {r2_}×{t2})/100 = {r2(v)}.",
        f"সৰল সুত = {as_num(r2(v))}।")

# 10. difference
for P, R, T1, T2 in [(30000, 10, 2, 4), (45000, 8, 3, 5), (60000, 12, 1, 3),
                     (75000, 9, 2, 5), (90000, 7, 3, 6)]:
    v = P * R * (T2 - T1) / 100
    add(f"Find the difference between the simple interest on {P} at {R}% per annum for {T2} years and for {T1} years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(R)}% হাৰে {as_num(T2)} বছৰ আৰু {as_num(T1)} বছৰৰ সৰল সুতৰ পাৰ্থক্য নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(P * R * T2 / 100), r2(v * 2), r2(P * R / 100)],
        f"Difference = {P}×{R}×({T2}-{T1})/100 = {r2(v)}.",
        f"পাৰ্থক্য = {as_num(r2(v))}।")

# 11. sum from amount
for A, R, T in [(15600, 8, 2), (22400, 12, 3), (31500, 10, 3), (48000, 15, 2),
                (62000, 11, 4), (81000, 12.5, 2)]:
    v = A * 100 / (100 + R * T)
    add(f"The amount after {T} years at {R}% per annum simple interest is {A}. Find the principal.",
        f"বছৰি {as_num(R)}% সৰল সুত হাৰে {as_num(T)} বছৰৰ পিছত মুঠ ধন {as_num(A)} হ'লে মূলধন নিৰ্ণয় কৰা।",
        r2(v), [r2(A - v), r2(v / 2), r2(A * (100 + R * T) / 100), r2(v * 2)],
        f"P = A×100/(100 + RT) = {A}×100/(100 + {R}×{T}) = {r2(v)}.",
        f"মূলধন = {as_num(r2(v))}।")

# extra batch
for P, R, T in [(16000, 9, 2), (28000, 11, 3), (52000, 6.5, 4), (96000, 13, 2)]:
    v = P * R * T / 100
    add(f"Find the simple interest on {P} at {R}% per annum for {T} years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(R)}% হাৰে {as_num(T)} বছৰৰ সৰল সুত নিৰ্ণয় কৰা।",
        r2(v), [r2(v * 2), r2(v / 2), r2(P * R / 100), r2(P + v)],
        f"SI = {r2(v)}.",
        f"সৰল সুত = {as_num(r2(v))}।")

for SI, R, T in [(3600, 9, 4), (7200, 15, 3), (12600, 12, 7)]:
    v = SI * 100 / (R * T)
    add(f"The simple interest on a sum at {R}% per annum for {T} years is {SI}. Find the sum.",
        f"বছৰি {as_num(R)}% হাৰে {as_num(T)} বছৰত সৰল সুত {as_num(SI)} হ'লে মূলধন নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(SI * R * T / 100), r2(v + SI)],
        f"P = {r2(v)}.",
        f"মূলধন = {as_num(r2(v))}।")

for P, SI, T in [(18000, 4320, 4), (32000, 7680, 3), (56000, 13440, 4)]:
    v = SI * 100 / (P * T)
    add(f"The simple interest on {P} for {T} years is {SI}. Find the rate percent per annum.",
        f"{as_num(P)} টকাৰ {as_num(T)} বছৰৰ সৰল সুত {as_num(SI)} হ'লে বছৰি সুতৰ হাৰ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(SI * 100 / P), r2(v + 1)],
        f"R = {r2(v)}%.",
        f"সুতৰ হাৰ = {as_num(r2(v))}%।")

for P, SI, R in [(36000, 6480, 6), (48000, 11520, 8), (72000, 17280, 12)]:
    v = SI * 100 / (P * R)
    add(f"The simple interest on {P} at {R}% per annum is {SI}. Find the time.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(R)}% হাৰে সৰল সুত {as_num(SI)} হ'লে সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(SI * 100 / R), r2(v + 1)],
        f"T = {r2(v)} years.",
        f"সময় = {as_num(r2(v))} বছৰ।")

for P, R, T in [(18000, 7, 3), (27000, 13, 2), (63000, 10, 4)]:
    si = P * R * T / 100
    v = P + si
    add(f"Find the amount on {P} at {R}% per annum simple interest for {T} years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(R)}% সৰল সুত হাৰে {as_num(T)} বছৰৰ মুঠ ধন নিৰ্ণয় কৰা।",
        r2(v), [r2(si), r2(P - si), r2(v * 2), r2(P)],
        f"Amount = {r2(v)}.",
        f"মুঠ ধন = {as_num(r2(v))}।")

for T in [4, 6.25, 15]:
    v = 100 / T
    add(f"A sum of money doubles itself in {T} years at simple interest. Find the rate percent per annum.",
        f"এটা মূলধন সৰল সুতত {as_num(T)} বছৰত দুগুণ হয়। বছৰি সুতৰ হাৰ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(100 / (2 * T)), r2(v + 2)],
        f"R = {r2(v)}%.",
        f"হাৰ = {as_num(r2(v))}%।")

for n, T in [(4, 12), (5, 16), (6, 20)]:
    v = 100 * (n - 1) / T
    add(f"A sum becomes {n} times of itself in {T} years at simple interest. Find the rate percent per annum.",
        f"এটা মূলধন সৰল সুতত {as_num(T)} বছৰত নিজৰ {as_num(n)} গুণ হয়। বছৰি সুতৰ হাৰ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(100 / T), r2(v * 2), r2(v + 3)],
        f"R = {r2(v)}%.",
        f"হাৰ = {as_num(r2(v))}%।")

for P, r1, r2_, t, SI in [(25000, 12, 8, 2, 5000), (36000, 10, 7, 3, 8640), (48000, 9, 6, 4, 12600)]:
    p1 = (SI * 100 / t - P * r2_) / (r1 - r2_)
    p2 = P - p1
    add(f"A sum of {P} is lent in two parts at {r1}% and {r2_}% per annum for {t} years. If the total simple interest is {SI}, find the part lent at {r1}%.",
        f"{as_num(P)} টকা দুটা অংশত বছৰি {as_num(r1)}% আৰু {as_num(r2_)}% হাৰে {as_num(t)} বছৰলৈ ঋণ দিয়া হয়। মুঠ সৰল সুত {as_num(SI)} হ'লে {as_num(r1)}% ত দিয়া অংশ নিৰ্ণয় কৰা।",
        r2(p1), [r2(p2), r2(p1 / 2), r2(p1 * 2), r2(SI * 100 / (r1 * t))],
        f"The part at {r1}% is {r2(p1)}.",
        f"{as_num(r1)}% ত দিয়া অংশ {as_num(r2(p1))}।")

for P, r1, t1, r2_, t2 in [(36000, 9, 2, 11, 3), (54000, 8, 1, 10, 2), (72000, 6, 3, 8, 2)]:
    v = P * (r1 * t1 + r2_ * t2) / 100
    add(f"Find the simple interest on {P} if the rate is {r1}% for the first {t1} years and {r2_}% for the next {t2} years.",
        f"{as_num(P)} টকাৰ ওপৰত প্ৰথম {as_num(t1)} বছৰ {as_num(r1)}% আৰু পৰৱৰ্তী {as_num(t2)} বছৰ {as_num(r2_)}% হাৰ হ'লে সৰল সুত নিৰ্ণয় কৰা।",
        r2(v), [r2(P * r1 * (t1 + t2) / 100), r2(P * r2_ * (t1 + t2) / 100), r2(v / 2), r2(v * 2)],
        f"SI = {r2(v)}.",
        f"সৰল সুত = {as_num(r2(v))}।")

for P, R, T1, T2 in [(24000, 11, 2, 5), (56000, 9, 1, 4), (84000, 8, 2, 6)]:
    v = P * R * (T2 - T1) / 100
    add(f"Find the difference between the simple interest on {P} at {R}% per annum for {T2} years and for {T1} years.",
        f"{as_num(P)} টকাৰ ওপৰত বছৰি {as_num(R)}% হাৰে {as_num(T2)} বছৰ আৰু {as_num(T1)} বছৰৰ সৰল সুতৰ পাৰ্থক্য নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(P * R * T2 / 100), r2(v * 2), r2(P * R / 100)],
        f"Difference = {r2(v)}.",
        f"পাৰ্থক্য = {as_num(r2(v))}।")

for A, R, T in [(17400, 9, 2), (24800, 12, 2), (39600, 10, 3)]:
    v = A * 100 / (100 + R * T)
    add(f"The amount after {T} years at {R}% per annum simple interest is {A}. Find the principal.",
        f"বছৰি {as_num(R)}% সৰল সুত হাৰে {as_num(T)} বছৰৰ পিছত মুঠ ধন {as_num(A)} হ'লে মূলধন নিৰ্ণয় কৰা।",
        r2(v), [r2(A - v), r2(v / 2), r2(A * (100 + R * T) / 100), r2(v * 2)],
        f"P = {r2(v)}.",
        f"মূলধন = {as_num(r2(v))}।")

append("simple-interest", rows)
