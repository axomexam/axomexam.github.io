#!/usr/bin/env python3
"""Partnership: 95+ hard bilingual questions."""

import math
import sys
sys.path.insert(0, "tools")
from num_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


# 1. simple partnership
for a, b, P in [(30000, 20000, 25000), (45000, 30000, 30000), (60000, 40000, 50000),
                (75000, 50000, 62500), (90000, 60000, 75000), (120000, 80000, 100000)]:
    share = P * a // (a + b)
    add(f"A and B invest {a} and {b} respectively in a business. If the total profit is {P}, find A's share.",
        f"A আৰু B এ ব্যৱসায়ত ক্ৰমে {as_num(a)} আৰু {as_num(b)} টকা বিনিয়োগ কৰে। মুঠ লাভ {as_num(P)} হ'লে A ৰ অংশ নিৰ্ণয় কৰা।",
        share, [P - share, P * b // (a + b), share // 2, share * 2],
        f"A:B = {a}:{b}, so A's share = {P}×{a}/{a+b} = {share}.",
        f"A ৰ অংশ = {as_num(share)}।")

# 2. compound partnership
for a, t1, b, t2, P in [(20000, 12, 30000, 8, 48000), (25000, 6, 40000, 9, 102000),
                        (30000, 10, 45000, 8, 132000), (40000, 12, 50000, 6, 156000),
                        (50000, 9, 60000, 12, 234000)]:
    ra, rb = a * t1, b * t2
    share = P * ra // (ra + rb)
    add(f"A invests {a} for {t1} months and B invests {b} for {t2} months. If the total profit is {P}, find A's share.",
        f"A এ {as_num(t1)} মাহৰ বাবে {as_num(a)} টকা আৰু B এ {as_num(t2)} মাহৰ বাবে {as_num(b)} টকা বিনিয়োগ কৰে। মুঠ লাভ {as_num(P)} হ'লে A ৰ অংশ নিৰ্ণয় কৰা।",
        share, [P - share, P * rb // (ra + rb), share // 2, share * 2],
        f"Ratio = {a}×{t1} : {b}×{t2} = {ra}:{rb}; A's share = {share}.",
        f"অনুপাত = {as_num(ra)}:{as_num(rb)}; A ৰ অংশ = {as_num(share)}।")

# 3. total profit from shares
for ra, rb, sa, P in [(3, 2, 18000, 30000), (5, 4, 25000, 45000), (7, 5, 35000, 60000),
                      (4, 3, 24000, 42000)]:
    add(f"In a partnership, A and B share profits in the ratio {ra} : {rb}. If A's share is {sa}, find the total profit.",
        f"এটা অংশীদাৰিত্বত A আৰু B এ {as_num(ra)} : {as_num(rb)} অনুপাতত লাভ ভাগ কৰে। A ৰ অংশ {as_num(sa)} হ'লে মুঠ লাভ নিৰ্ণয় কৰা।",
        P, [sa * rb // ra, sa + P, sa // 2, P * 2],
        f"Total = A's share × (sum of ratio)/A's term = {sa}×{ra+rb}/{ra} = {P}.",
        f"মুঠ লাভ = {as_num(P)}।")

# 4. find time
for a, t1, b, sa, sb in [(20000, 12, 30000, 24000, 18000), (30000, 8, 40000, 24000, 32000),
                         (40000, 6, 50000, 24000, 30000)]:
    t2 = sb * a * t1 // (sa * b)
    add(f"A invests {a} for {t1} months and B invests {b}. If their profit shares are in the ratio {sa} : {sb}, for how many months did B invest?",
        f"A এ {as_num(t1)} মাহৰ বাবে {as_num(a)} টকা আৰু B এ {as_num(b)} টকা বিনিয়োগ কৰে। তেওঁলোকৰ লাভৰ অনুপাত {as_num(sa)} : {as_num(sb)} হ'লে B এ কিমান মাহ বিনিয়োগ কৰিছিল?",
        t2, [t2 * 2, t2 // 2, t2 + 2, t2 - 2],
        f"{sa}:{sb} = {a}×{t1} : {b}×t2, so t2 = {t2} months.",
        f"B এ {as_num(t2)} মাহ বিনিয়োগ কৰিছিল।")

# 5. find investment
for a, t1, t2, sa, sb in [(30000, 12, 8, 36000, 24000), (40000, 9, 6, 36000, 30000),
                          (50000, 6, 10, 30000, 50000)]:
    b = sb * a * t1 // (sa * t2)
    add(f"A invests {a} for {t1} months and B invests for {t2} months. If their profit shares are in the ratio {sa} : {sb}, find B's investment.",
        f"A এ {as_num(t1)} মাহৰ বাবে {as_num(a)} টকা আৰু B এ {as_num(t2)} মাহৰ বাবে বিনিয়োগ কৰে। লাভৰ অনুপাত {as_num(sa)} : {as_num(sb)} হ'লে B ৰ বিনিয়োগ নিৰ্ণয় কৰা।",
        b, [b * 2, b // 2, b + 5000, b - 5000],
        f"{sa}:{sb} = {a}×{t1} : B×{t2}, so B = {b}.",
        f"B ৰ বিনিয়োগ = {as_num(b)}।")

# 6. three partners
for a, b, c, P in [(20000, 30000, 40000, 54000), (30000, 45000, 60000, 81000),
                   (40000, 50000, 60000, 75000), (50000, 60000, 90000, 100000)]:
    s = a + b + c
    share = P * a // s
    add(f"A, B and C invest {a}, {b} and {c} respectively. If the total profit is {P}, find A's share.",
        f"A, B আৰু C এ ক্ৰমে {as_num(a)}, {as_num(b)} আৰু {as_num(c)} টকা বিনিয়োগ কৰে। মুঠ লাভ {as_num(P)} হ'লে A ৰ অংশ নিৰ্ণয় কৰা।",
        share, [P * b // s, P * c // s, share // 2, P // 3],
        f"A's share = {P}×{a}/{s} = {share}.",
        f"A ৰ অংশ = {as_num(share)}।")

# 7. entry / exit
for a, b, P in [(60000, 45000, 70000), (80000, 60000, 84000), (90000, 75000, 175500)]:
    ra, rb = a * 12, b * 9
    share = P * ra // (ra + rb)
    add(f"A starts a business with {a}. After 3 months, B joins with {b}. If the annual profit is {P}, find A's share.",
        f"A এ {as_num(a)} টকাৰে ব্যৱসায় আৰম্ভ কৰে। ৩ মাহৰ পিছত B এ {as_num(b)} টকাৰে যোগ দিয়ে। বছৰেকীয়া লাভ {as_num(P)} হ'লে A ৰ অংশ নিৰ্ণয় কৰা।",
        share, [P - share, share // 2, share * 2, P * b // (a + b)],
        f"Ratio = {a}×12 : {b}×9 = {ra}:{rb}; A's share = {share}.",
        f"অনুপাত = {as_num(ra)}:{as_num(rb)}; A ৰ অংশ = {as_num(share)}।")

# 8. ratio simplification
for a, t1, b, t2 in [(20000, 12, 30000, 8), (25000, 9, 40000, 6), (35000, 8, 50000, 7),
                     (45000, 6, 60000, 9)]:
    x, y = a * t1, b * t2
    g = math.gcd(x, y)
    add(f"Find the ratio of the capitals of A and B if A invests {a} for {t1} months and B invests {b} for {t2} months.",
        f"A এ {as_num(t1)} মাহৰ বাবে {as_num(a)} টকা আৰু B এ {as_num(t2)} মাহৰ বাবে {as_num(b)} টকা বিনিয়োগ কৰিলে তেওঁলোকৰ মূলধনৰ অনুপাত নিৰ্ণয় কৰা।",
        f"{x//g}:{y//g}", [f"{a}:{b}", f"{t1}:{t2}", f"{x//g+1}:{y//g}"],
        f"Ratio = {a}×{t1} : {b}×{t2} = {x}:{y} = {x//g}:{y//g}.",
        f"অনুপাত = {as_num(x//g)}:{as_num(y//g)}।")

# 9. working partner
for a, b, P, sal in [(40000, 60000, 50000, 5000), (50000, 70000, 60000, 6000),
                     (60000, 90000, 75000, 7500)]:
    rem = P - sal
    share = sal + rem * a // (a + b)
    add(f"A is a working partner and B a sleeping partner. A invests {a}, B invests {b}, and A receives a salary of {sal} from a profit of {P}. Find A's total income.",
        f"A কৰ্মী অংশীদাৰ আৰু B নিষ্ক্ৰিয় অংশীদাৰ। A এ {as_num(a)} আৰু B এ {as_num(b)} বিনিয়োগ কৰে। মুঠ লাভ {as_num(P)} ৰ পৰা A এ {as_num(sal)} দৰমহা পায়। A ৰ মুঠ আয় নিৰ্ণয় কৰা।",
        share, [rem * a // (a + b), sal, share // 2, P - share],
        f"A's total = salary + share of remaining profit = {sal} + {rem*a//(a+b)} = {share}.",
        f"A ৰ মুঠ আয় = {as_num(share)}।")

# 10. capital changes
for a, x, t1, t2, b, P in [(30000, 10000, 6, 6, 50000, 102000), (40000, 20000, 4, 8, 60000, 136000)]:
    cap = a * t1 + (a + x) * t2
    capb = b * 12
    share = P * cap // (cap + capb)
    add(f"A invests {a} for the first {t1} months and then {a+x} for the next {t2} months. B invests {b} for the whole year. If the profit is {P}, find A's share.",
        f"A এ প্ৰথম {as_num(t1)} মাহ {as_num(a)} আৰু পৰৱৰ্তী {as_num(t2)} মাহ {as_num(a+x)} টকা বিনিয়োগ কৰে। B এ গোটেই বছৰ {as_num(b)} টকা বিনিয়োগ কৰে। লাভ {as_num(P)} হ'লে A ৰ অংশ নিৰ্ণয় কৰা।",
        share, [P - share, share // 2, share * 2, P * b // (a + b)],
        f"A's capital = {a}×{t1} + {a+x}×{t2} = {cap}; ratio = {cap}:{capb}; A's share = {share}.",
        f"A ৰ অংশ = {as_num(share)}।")

# extra batch (generated combinations)
for i, (a, b) in enumerate([(35000, 25000), (48000, 32000), (64000, 48000), (72000, 54000),
                            (84000, 56000), (96000, 64000), (108000, 72000), (120000, 90000),
                            (135000, 90000), (150000, 100000)]):
    k = 1000 + i * 250
    P = k * (a + b)
    share = k * a
    add(f"A and B invest {a} and {b} respectively in a business. If the total profit is {P}, find A's share.",
        f"A আৰু B এ ব্যৱসায়ত ক্ৰমে {as_num(a)} আৰু {as_num(b)} টকা বিনিয়োগ কৰে। মুঠ লাভ {as_num(P)} হ'লে A ৰ অংশ নিৰ্ণয় কৰা।",
        share, [P - share, P * b // (a + b), share // 2, share * 2],
        f"A's share = {share}.",
        f"A ৰ অংশ = {as_num(share)}।")

for i, (a, t1, b, t2) in enumerate([(18000, 12, 24000, 9), (22000, 10, 33000, 8),
                                    (26000, 9, 39000, 6), (30000, 12, 45000, 4),
                                    (36000, 8, 48000, 12), (42000, 6, 56000, 9),
                                    (48000, 10, 60000, 5), (54000, 9, 72000, 6),
                                    (60000, 12, 80000, 3), (66000, 8, 88000, 12)]):
    k = 500 + i * 100
    ra, rb = a * t1, b * t2
    P = k * (ra + rb)
    share = k * ra
    add(f"A invests {a} for {t1} months and B invests {b} for {t2} months. If the total profit is {P}, find A's share.",
        f"A এ {as_num(t1)} মাহৰ বাবে {as_num(a)} টকা আৰু B এ {as_num(t2)} মাহৰ বাবে {as_num(b)} টকা বিনিয়োগ কৰে। মুঠ লাভ {as_num(P)} হ'লে A ৰ অংশ নিৰ্ণয় কৰা।",
        share, [P - share, P * rb // (ra + rb), share // 2, share * 2],
        f"A's share = {share}.",
        f"A ৰ অংশ = {as_num(share)}।")

for i, (a, b, c) in enumerate([(25000, 35000, 45000), (30000, 50000, 70000), (40000, 60000, 80000),
                               (45000, 75000, 105000), (50000, 75000, 100000), (60000, 90000, 120000)]):
    k = 600 + i * 200
    P = k * (a + b + c)
    share = k * a
    add(f"A, B and C invest {a}, {b} and {c} respectively. If the total profit is {P}, find A's share.",
        f"A, B আৰু C এ ক্ৰমে {as_num(a)}, {as_num(b)} আৰু {as_num(c)} টকা বিনিয়োগ কৰে। মুঠ লাভ {as_num(P)} হ'লে A ৰ অংশ নিৰ্ণয় কৰা।",
        share, [k * b, k * c, share // 2, P // 3],
        f"A's share = {share}.",
        f"A ৰ অংশ = {as_num(share)}।")

for i, (a, b) in enumerate([(50000, 40000), (70000, 50000), (80000, 60000), (100000, 75000), (120000, 90000)]):
    k = 800 + i * 200
    ra, rb = a * 12, b * 9
    P = k * (ra + rb)
    share = k * ra
    add(f"A starts a business with {a}. After 3 months, B joins with {b}. If the annual profit is {P}, find A's share.",
        f"A এ {as_num(a)} টকাৰে ব্যৱসায় আৰম্ভ কৰে। ৩ মাহৰ পিছত B এ {as_num(b)} টকাৰে যোগ দিয়ে। বছৰেকীয়া লাভ {as_num(P)} হ'লে A ৰ অংশ নিৰ্ণয় কৰা।",
        share, [P - share, share // 2, share * 2, P * b // (a + b)],
        f"A's share = {share}.",
        f"A ৰ অংশ = {as_num(share)}।")

for ra, rb, sa in [(3, 2, 21000), (5, 3, 30000), (7, 4, 42000), (9, 5, 54000), (11, 6, 66000), (13, 7, 78000)]:
    P = sa * (ra + rb) // ra
    add(f"In a partnership, A and B share profits in the ratio {ra} : {rb}. If A's share is {sa}, find the total profit.",
        f"এটা অংশীদাৰিত্বত A আৰু B এ {as_num(ra)} : {as_num(rb)} অনুপাতত লাভ ভাগ কৰে। A ৰ অংশ {as_num(sa)} হ'লে মুঠ লাভ নিৰ্ণয় কৰা।",
        P, [sa * rb // ra, sa + P, sa // 2, P * 2],
        f"Total = {P}.",
        f"মুঠ লাভ = {as_num(P)}।")

for a, t1, b, t2 in [(24000, 10, 36000, 8), (32000, 9, 48000, 6), (40000, 12, 60000, 5),
                     (48000, 8, 72000, 4), (56000, 6, 84000, 9)]:
    t2ans = t2
    sa, sb = a * t1, b * t2
    g = math.gcd(sa, sb)
    add(f"A invests {a} for {t1} months and B invests {b}. If their profit shares are in the ratio {sa//g} : {sb//g}, for how many months did B invest?",
        f"A এ {as_num(t1)} মাহৰ বাবে {as_num(a)} টকা আৰু B এ {as_num(b)} টকা বিনিয়োগ কৰে। লাভৰ অনুপাত {as_num(sa//g)} : {as_num(sb//g)} হ'লে B এ কিমান মাহ বিনিয়োগ কৰিছিল?",
        t2ans, [t2ans * 2, t2ans // 2, t2ans + 2, t2ans - 2],
        f"B invested for {t2ans} months.",
        f"B এ {as_num(t2ans)} মাহ বিনিয়োগ কৰিছিল।")

for a, t1, t2, b in [(36000, 12, 8, 54000), (48000, 9, 6, 72000), (60000, 6, 10, 90000),
                     (72000, 10, 5, 108000), (84000, 8, 12, 126000)]:
    sa, sb = a * t1, b * t2
    g = math.gcd(sa, sb)
    add(f"A invests {a} for {t1} months and B invests for {t2} months. If their profit shares are in the ratio {sa//g} : {sb//g}, find B's investment.",
        f"A এ {as_num(t1)} মাহৰ বাবে {as_num(a)} টকা আৰু B এ {as_num(t2)} মাহৰ বাবে বিনিয়োগ কৰে। লাভৰ অনুপাত {as_num(sa//g)} : {as_num(sb//g)} হ'লে B ৰ বিনিয়োগ নিৰ্ণয় কৰা।",
        b, [b * 2, b // 2, b + 5000, b - 5000],
        f"B's investment = {b}.",
        f"B ৰ বিনিয়োগ = {as_num(b)}।")

for a, t1, b, t2 in [(28000, 12, 42000, 10), (36000, 8, 54000, 6), (44000, 9, 66000, 4),
                     (52000, 10, 78000, 5), (60000, 6, 90000, 8), (68000, 12, 102000, 3)]:
    x, y = a * t1, b * t2
    g = math.gcd(x, y)
    add(f"Find the ratio of the capitals of A and B if A invests {a} for {t1} months and B invests {b} for {t2} months.",
        f"A এ {as_num(t1)} মাহৰ বাবে {as_num(a)} টকা আৰু B এ {as_num(t2)} মাহৰ বাবে {as_num(b)} টকা বিনিয়োগ কৰিলে তেওঁলোকৰ মূলধনৰ অনুপাত নিৰ্ণয় কৰা।",
        f"{x//g}:{y//g}", [f"{a}:{b}", f"{t1}:{t2}", f"{x//g+1}:{y//g}"],
        f"Ratio = {x//g}:{y//g}.",
        f"অনুপাত = {as_num(x//g)}:{as_num(y//g)}।")

for a, b, P, sal in [(45000, 75000, 60000, 6000), (55000, 85000, 70000, 7000),
                     (65000, 95000, 80000, 8000), (75000, 105000, 90000, 9000)]:
    rem = P - sal
    share = sal + rem * a // (a + b)
    add(f"A is a working partner and B a sleeping partner. A invests {a}, B invests {b}, and A receives a salary of {sal} from a profit of {P}. Find A's total income.",
        f"A কৰ্মী অংশীদাৰ আৰু B নিষ্ক্ৰিয় অংশীদাৰ। A এ {as_num(a)} আৰু B এ {as_num(b)} বিনিয়োগ কৰে। লাভ {as_num(P)} ৰ পৰা A এ {as_num(sal)} দৰমহা পায়। A ৰ মুঠ আয় নিৰ্ণয় কৰা।",
        share, [rem * a // (a + b), sal, share // 2, P - share],
        f"A's total income = {share}.",
        f"A ৰ মুঠ আয় = {as_num(share)}।")

for a, x, t1, t2, b in [(35000, 15000, 6, 6, 60000), (45000, 25000, 4, 8, 70000),
                        (55000, 35000, 5, 7, 80000), (65000, 45000, 3, 9, 90000)]:
    cap = a * t1 + (a + x) * t2
    capb = b * 12
    P = (cap + capb) * 1000
    share = 1000 * cap
    add(f"A invests {a} for the first {t1} months and then {a+x} for the next {t2} months. B invests {b} for the whole year. If the profit is {P}, find A's share.",
        f"A এ প্ৰথম {as_num(t1)} মাহ {as_num(a)} আৰু পৰৱৰ্তী {as_num(t2)} মাহ {as_num(a+x)} টকা বিনিয়োগ কৰে। B এ গোটেই বছৰ {as_num(b)} টকা বিনিয়োগ কৰে। লাভ {as_num(P)} হ'লে A ৰ অংশ নিৰ্ণয় কৰা।",
        share, [P - share, share // 2, share * 2, P * b // (a + b)],
        f"A's share = {share}.",
        f"A ৰ অংশ = {as_num(share)}।")

append("partnership", rows)
