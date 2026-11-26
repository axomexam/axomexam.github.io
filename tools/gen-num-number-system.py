#!/usr/bin/env python3
"""Number System: 95+ hard bilingual questions."""

import math
import sys
sys.path.insert(0, "tools")
from num_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({
        "stem": en, "stem_as": as_,
        "correct": correct, "dists": opts(correct, cands),
        "exp_en": exp_en, "exp_as": exp_as,
    })


def factor(n):
    f = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            f[d] = f.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        f[n] = f.get(n, 0) + 1
    return f


def divisors(n):
    f = factor(n)
    r = 1
    for e in f.values():
        r *= e + 1
    return r


def sumdiv(n):
    f = factor(n)
    r = 1
    for p, e in f.items():
        r *= (p ** (e + 1) - 1) // (p - 1)
    return r


def zeros_fact(n):
    s, p = 0, 5
    while p <= n:
        s += n // p
        p *= 5
    return s


def power_fact(n, p):
    s = 0
    q = p
    while q <= n:
        s += n // q
        q *= p
    return s


# 1. largest 4-digit multiple of a, b, c
for a, b, c in [(12, 15, 18), (8, 12, 20), (9, 14, 21), (6, 10, 15), (16, 18, 24),
                (7, 11, 13), (5, 9, 12), (10, 14, 25), (15, 20, 30), (8, 9, 11)]:
    L = math.lcm(a, b, c)
    largest = (9999 // L) * L
    add(f"The largest 4-digit number exactly divisible by {a}, {b} and {c} is",
        f"৪ অংকৰ আটাইতকৈ ডাঙৰ সংখ্যা যিটো {as_num(a)}, {as_num(b)} আৰু {as_num(c)} ৰে সম্পূৰ্ণ বিভাজ্য",
        largest, [largest - L, largest + L, largest - 2 * L, largest + 2 * L],
        f"LCM({a},{b},{c}) = {L}; 9999 ÷ {L} leaves remainder {9999 % L}, so the largest multiple is {largest}.",
        f"ল.সা.গু. = {L}; ৯৯৯৯ ÷ {L} ৰ ভাগশেষ {as_num(9999 % L)}, সেয়ে আটাইতকৈ ডাঙৰ গুণিতক {as_num(largest)}।")

# 2. least number to add
for N, a, b, c in [(2457, 6, 8, 12), (3871, 5, 7, 9), (5236, 8, 11, 16), (7194, 12, 15, 20),
                   (4367, 9, 10, 14), (8125, 6, 11, 15), (6543, 7, 12, 18), (2987, 5, 8, 13),
                   (9413, 4, 9, 15), (3762, 10, 12, 25)]:
    L = math.lcm(a, b, c)
    rem = N % L
    need = (L - rem) % L
    if need == 0:
        need = L
    add(f"The least number that must be added to {N} so that it is exactly divisible by {a}, {b} and {c} is",
        f"{as_num(N)} ৰ লগত যোগ কৰিবলগীয়া আটাইতকৈ সৰু সংখ্যা কিমান হ'লে সেয়া {as_num(a)}, {as_num(b)} আৰু {as_num(c)} ৰে সম্পূৰ্ণ বিভাজ্য হ'ব",
        need, [L - need, rem, L + need, need + 1],
        f"LCM = {L}; {N} ÷ {L} leaves {rem}, so {L} - {rem} = {need} must be added.",
        f"ল.সা.গু. = {L}; {as_num(N)} ÷ {L} ৰ ভাগশেষ {as_num(rem)}, সেয়ে {as_num(L)} - {as_num(rem)} = {as_num(need)} যোগ কৰিব লাগে।")

# 3. least number to subtract
for N, a, b, c in [(5432, 6, 9, 12), (8765, 8, 10, 15), (3219, 7, 11, 14), (9876, 5, 12, 18),
                   (4567, 9, 13, 15), (7654, 6, 14, 21), (2345, 8, 15, 20), (8901, 7, 10, 16)]:
    L = math.lcm(a, b, c)
    rem = N % L
    add(f"The least number that must be subtracted from {N} to make it divisible by {a}, {b} and {c} is",
        f"{as_num(N)} ৰ পৰা বিয়োগ কৰিবলগীয়া আটাইতকৈ সৰু সংখ্যা কিমান হ'লে সেয়া {as_num(a)}, {as_num(b)} আৰু {as_num(c)} ৰে বিভাজ্য হ'ব",
        rem, [L - rem, rem + 1, L, rem - 1 if rem else L],
        f"LCM = {L}; {N} ÷ {L} leaves remainder {rem}, so {rem} must be subtracted.",
        f"ল.সা.গু. = {L}; {as_num(N)} ÷ {L} ৰ ভাগশেষ {as_num(rem)}, সেয়ে {as_num(rem)} বিয়োগ কৰিব লাগে।")

# 4. remainder of a^b mod m
for a, b, m in [(7, 45, 10), (3, 100, 7), (5, 63, 9), (11, 50, 13), (2, 81, 5),
                (13, 27, 17), (9, 44, 11), (6, 55, 8), (17, 31, 19), (4, 73, 15)]:
    r = pow(a, b, m)
    add(f"The remainder when {a}^{b} is divided by {m} is",
        f"{as_num(a)}^{as_num(b)} ক {as_num(m)} ৰে ভাগ কৰিলে ভাগশেষ কিমান",
        r, [r + 1, m - r, (r + 2) % m, r + 3],
        f"Using modular exponentiation, {a}^{b} ≡ {r} (mod {m}).",
        f"মডুলাৰ ঘাতাংক ব্যৱহাৰ কৰি {as_num(a)}^{as_num(b)} ≡ {as_num(r)} (mod {as_num(m)})।")

# 5. unit digit of a^b
for a, b in [(7, 123), (3, 246), (8, 157), (9, 214), (2, 305), (4, 111),
             (6, 199), (13, 77), (17, 89), (19, 64)]:
    u = pow(a % 10, b, 10)
    add(f"The unit digit of {a}^{b} is",
        f"{as_num(a)}^{as_num(b)} ৰ একক অংক কিমান",
        u, [(u + 1) % 10, (u + 2) % 10, (u + 5) % 10, (u + 3) % 10],
        f"The unit digit repeats in a cycle; {a}^{b} ends in {u}.",
        f"একক অংক চক্ৰাকাৰে পুনৰাবৃত্তি হয়; {as_num(a)}^{as_num(b)} ৰ শেষ অংক {as_num(u)}।")

# 6. number of divisors
for n in [720, 840, 1260, 1680, 2520, 3600, 4620, 5040, 6300, 7560, 9240, 10080]:
    d = divisors(n)
    add(f"The total number of positive divisors of {n} is",
        f"{as_num(n)} ৰ মুঠ ধনাত্মক উৎপাদকৰ সংখ্যা কিমান",
        d, [d + 2, d - 2, d * 2, sum(factor(n).values()) + 1],
        f"{n} = {' × '.join(f'{p}^{e}' for p, e in factor(n).items())}; number of divisors = {' × '.join(str(e + 1) for e in factor(n).values())} = {d}.",
        f"{as_num(n)} ৰ উৎপাদক বিশ্লেষণ কৰি উৎপাদকৰ সংখ্যা {as_num(d)} পোৱা যায়।")

# 7. sum of divisors
for n in [360, 504, 720, 840, 960, 1080, 1260, 1440]:
    s = sumdiv(n)
    add(f"The sum of all positive divisors of {n} is",
        f"{as_num(n)} ৰ সকলো ধনাত্মক উৎপাদকৰ যোগফল কিমান",
        s, [s + n, s - n, s // 2, s + 2],
        f"Using the divisor-sum formula, σ({n}) = {s}.",
        f"উৎপাদক-যোগ সূত্ৰ ব্যৱহাৰ কৰি σ({as_num(n)}) = {as_num(s)}।")

# 8. trailing zeros in n!
for n in [50, 75, 100, 125, 150, 200, 250, 300, 400, 500]:
    z = zeros_fact(n)
    add(f"The number of zeros at the end of {n}! is",
        f"{as_num(n)}! ৰ শেষত কিমান শূন্য থাকিব",
        z, [z + 1, z - 1, n // 5, z + 2],
        f"Zeros = ⌊{n}/5⌋ + ⌊{n}/25⌋ + ... = {z}.",
        f"শূন্যৰ সংখ্যা = ⌊{as_num(n)}/৫⌋ + ⌊{as_num(n)}/২৫⌋ + ... = {as_num(z)}।")

# 9. highest power of p in n!
for n, p in [(100, 3), (120, 2), (150, 5), (200, 7), (250, 3), (300, 2), (180, 11), (220, 13)]:
    h = power_fact(n, p)
    add(f"The highest power of {p} that divides {n}! is",
        f"{as_num(n)}! ক ভাগ কৰা {as_num(p)} ৰ সৰ্বোচ্চ ঘাত কিমান",
        h, [h + 1, h - 1, n // p, h + 2],
        f"Highest power = ⌊{n}/{p}⌋ + ⌊{n}/{p}²⌋ + ... = {h}.",
        f"সৰ্বোচ্চ ঘাত = ⌊{as_num(n)}/{as_num(p)}⌋ + ⌊{as_num(n)}/{as_num(p)}²⌋ + ... = {as_num(h)}।")

# 10. divisible by 11
for opts4 in [("12342", "12345", "12346", "12348"), ("918082", "918084", "918086", "918088"),
              ("71632", "71634", "71636", "71638"), ("45628", "45626", "45624", "45622"),
              ("8811", "8812", "8813", "8814"), ("27104", "27106", "27108", "27110")]:
    good = [x for x in opts4 if int(x) % 11 == 0][0]
    add("Which of the following numbers is exactly divisible by 11?",
        "তলৰ কোনটো সংখ্যা ১১ ৰে সম্পূৰ্ণ বিভাজ্য?",
        int(good), [int(x) for x in opts4 if x != good],
        f"{good} ÷ 11 = {int(good)//11}, so it is divisible by 11.",
        f"{as_num(good)} ÷ ১১ = {as_num(int(good)//11)}, সেয়ে ই ১১ ৰে বিভাজ্য।")

# 11. sum of first n
for n in [40, 50, 60, 75, 80, 100, 120, 150]:
    s = n * (n + 1) // 2
    add(f"The sum of the first {n} natural numbers is",
        f"প্ৰথম {as_num(n)} টা স্বাভাৱিক সংখ্যাৰ যোগফল কিমান",
        s, [s + n, s - n, n * n, s + 1],
        f"Sum = n(n+1)/2 = {n} × {n+1} / 2 = {s}.",
        f"যোগফল = n(n+১)/২ = {as_num(n)} × {as_num(n+1)} / ২ = {as_num(s)}।")

# 12. divisible by a or b
for N, a, b in [(1000, 3, 5), (1200, 4, 6), (1500, 5, 7), (2000, 6, 8), (2500, 3, 11), (3000, 7, 9)]:
    L = math.lcm(a, b)
    c = N // a + N // b - N // L
    add(f"The number of integers from 1 to {N} that are divisible by {a} or {b} is",
        f"১ ৰ পৰা {as_num(N)} লৈকে {as_num(a)} বা {as_num(b)} ৰে বিভাজ্য সংখ্যাৰ সংখ্যা কিমান",
        c, [c + 1, c - 1, N // a + N // b, c + 2],
        f"Count = ⌊{N}/{a}⌋ + ⌊{N}/{b}⌋ - ⌊{N}/{L}⌋ = {c}.",
        f"সংখ্যা = ⌊{as_num(N)}/{as_num(a)}⌋ + ⌊{as_num(N)}/{as_num(b)}⌋ - ⌊{as_num(N)}/{as_num(L)}⌋ = {as_num(c)}।")

append("number-system", rows)
