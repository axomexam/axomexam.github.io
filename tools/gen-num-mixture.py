#!/usr/bin/env python3
"""Mixture & Alligation: 95+ hard bilingual questions."""

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


def r2(x):
    return round(x, 2)


# 1. alligation ratio
for c, d, m in [(20, 35, 26), (24, 40, 30), (15, 30, 22), (18, 42, 30),
                (12, 27, 18), (25, 45, 33), (30, 50, 38), (16, 36, 24)]:
    x, y = d - m, m - c
    g = math.gcd(x, y)
    add(f"In what ratio must a commodity at {c} per kg be mixed with one at {d} per kg to get a mixture worth {m} per kg?",
        f"{as_num(c)} টকা/কিলো মূল্যৰ বস্তু {as_num(d)} টকা/কিলো মূল্যৰ বস্তুৰ সৈতে কিমান অনুপাতত মিহলালে {as_num(m)} টকা/কিলো মূল্যৰ মিশ্ৰণ পোৱা যাব?",
        f"{x//g}:{y//g}", [f"{y//g}:{x//g}", f"{c}:{d}", f"{x//g+1}:{y//g}"],
        f"Ratio = (dear - mean) : (mean - cheap) = ({d}-{m}):({m}-{c}) = {x//g}:{y//g}.",
        f"অনুপাত = ({as_num(d)}-{as_num(m)}):({as_num(m)}-{as_num(c)}) = {as_num(x//g)}:{as_num(y//g)}।")

# 2. mean price
for q1, p1, q2, p2 in [(20, 30, 30, 40), (15, 24, 25, 36), (40, 12, 60, 18),
                       (25, 45, 35, 55), (10, 60, 40, 45), (30, 20, 20, 50)]:
    v = (q1 * p1 + q2 * p2) / (q1 + q2)
    add(f"{q1} kg of rice at {p1} per kg is mixed with {q2} kg at {p2} per kg. Find the average price of the mixture.",
        f"{as_num(q1)} কিলো {as_num(p1)} টকা/কিলো চাউল {as_num(q2)} কিলো {as_num(p2)} টকা/কিলো চাউলৰ সৈতে মিহলালে মিশ্ৰণৰ গড় মূল্য কিমান?",
        r2(v), [r2((p1 + p2) / 2), r2(v + 2), r2(v - 2), r2(p1 + p2)],
        f"Mean = ({q1}×{p1} + {q2}×{p2})/{q1+q2} = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

# 3. milk-water
for T, a, b in [(60, 3, 2), (80, 5, 3), (120, 7, 5), (90, 4, 5), (150, 2, 3), (72, 5, 4)]:
    milk = T * a / (a + b)
    add(f"{T} litres of a mixture contains milk and water in the ratio {a} : {b}. Find the quantity of milk.",
        f"{as_num(T)} লিটাৰ মিশ্ৰণত গাখীৰ আৰু পানী {as_num(a)} : {as_num(b)} অনুপাতত আছে। গাখীৰৰ পৰিমাণ নিৰ্ণয় কৰা।",
        r2(milk), [r2(T - milk), r2(T * b / (a + b)), r2(T / 2), r2(milk * 2)],
        f"Milk = {T}×{a}/{a+b} = {r2(milk)} litres.",
        f"গাখীৰ = {as_num(r2(milk))} লিটাৰ।")

# 4. replacement
for V, x, n in [(40, 4, 2), (50, 5, 2), (60, 6, 3), (80, 8, 2), (100, 10, 3), (64, 8, 2)]:
    v = V * ((V - x) / V) ** n
    add(f"A vessel contains {V} litres of pure milk. {x} litres are removed and replaced with water. This is done {n} times. Find the quantity of pure milk left.",
        f"এটা পাত্ৰত {as_num(V)} লিটাৰ খাটি গাখীৰ আছে। {as_num(x)} লিটাৰ আঁতৰাই পানীৰে সলনি কৰা হয়। এই কাম {as_num(n)} বাৰ কৰা হয়। অৱশিষ্ট খাটি গাখীৰৰ পৰিমাণ নিৰ্ণয় কৰা।",
        r2(v), [r2(V - x * n), r2(V * (1 - x / V) ** (n + 1)), r2(v / 2), r2(v + x)],
        f"Milk left = {V}(1 - {x}/{V})^{n} = {r2(v)} litres.",
        f"অৱশিষ্ট গাখীৰ = {as_num(r2(v))} লিটাৰ।")

# 5. two vessels
for a, b, c, d in [(3, 2, 4, 1), (5, 3, 2, 1), (7, 5, 3, 2), (4, 1, 3, 2), (5, 2, 7, 3)]:
    m = (F(a, a + b) + F(c, c + d)) / 2
    w = 1 - m
    g = math.gcd(m.numerator * w.denominator, w.numerator * m.denominator)
    x = m.numerator * w.denominator // g
    y = w.numerator * m.denominator // g
    add(f"Two vessels contain milk and water in the ratios {a} : {b} and {c} : {d}. Equal quantities from both vessels are mixed. Find the ratio of milk to water in the mixture.",
        f"দুটা পাত্ৰত গাখীৰ আৰু পানীৰ অনুপাত ক্ৰমে {as_num(a)} : {as_num(b)} আৰু {as_num(c)} : {as_num(d)}। দুয়োটাৰ পৰা সমান পৰিমাণ মিহলালে মিশ্ৰণত গাখীৰ আৰু পানীৰ অনুপাত কিমান হ'ব?",
        f"{x}:{y}", [f"{a+c}:{b+d}", f"{a}:{b}", f"{y}:{x}"],
        f"Milk fraction = (a/(a+b) + c/(c+d))/2, giving milk:water = {x}:{y}.",
        f"গাখীৰ:পানী = {as_num(x)}:{as_num(y)}।")

# 6. water to add
for T, p, q in [(40, 80, 50), (60, 75, 60), (80, 90, 72), (100, 60, 40), (50, 70, 50)]:
    w = T * (p - q) / q
    add(f"How much water must be added to {T} litres of milk containing {p}% milk so that the mixture contains {q}% milk?",
        f"{as_num(p)}% গাখীৰ থকা {as_num(T)} লিটাৰ গাখীৰত কিমান পানী যোগ কৰিলে মিশ্ৰণত {as_num(q)}% গাখীৰ থাকিব?",
        r2(w), [r2(T * (p - q) / p), r2(w / 2), r2(w * 2), r2(T - w)],
        f"Water = {T}({p} - {q})/{q} = {r2(w)} litres.",
        f"পানী = {as_num(r2(w))} লিটাৰ।")

# 7. three quantities
for q1, p1, q2, p2, q3, p3 in [(10, 20, 20, 30, 30, 40), (5, 12, 10, 18, 15, 24),
                               (20, 25, 30, 35, 50, 45)]:
    v = (q1 * p1 + q2 * p2 + q3 * p3) / (q1 + q2 + q3)
    add(f"{q1} kg at {p1}, {q2} kg at {p2} and {q3} kg at {p3} are mixed. Find the average price per kg.",
        f"{as_num(q1)} কিলো {as_num(p1)}, {as_num(q2)} কিলো {as_num(p2)} আৰু {as_num(q3)} কিলো {as_num(p3)} মিহলালে প্ৰতি কিলোৰ গড় মূল্য কিমান?",
        r2(v), [r2((p1 + p2 + p3) / 3), r2(v + 2), r2(v - 2), r2(p1 + p2 + p3)],
        f"Mean = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

# 8. profit on mixture
for q1, c1, q2, c2, sp in [(20, 30, 30, 40, 40), (15, 24, 25, 36, 36), (40, 12, 60, 18, 18)]:
    cp = (q1 * c1 + q2 * c2) / (q1 + q2)
    v = (sp - cp) / cp * 100
    add(f"{q1} kg of goods at {c1} per kg is mixed with {q2} kg at {c2} per kg and the mixture is sold at {sp} per kg. Find the profit percent.",
        f"{as_num(q1)} কিলো {as_num(c1)} টকাৰ বস্তু {as_num(q2)} কিলো {as_num(c2)} টকাৰ বস্তুৰ সৈতে মিহলাই {as_num(sp)} টকা/কিলোত বিক্ৰী কৰা হয়। লাভৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2((sp - c1) / c1 * 100), r2((sp - c2) / c2 * 100), r2(v / 2), r2(v * 2)],
        f"CP = {r2(cp)}; profit% = {r2(v)}%.",
        f"ক্ৰয়মূল্য = {as_num(r2(cp))}; লাভ% = {as_num(r2(v))}%।")

# 9. dilution
for T, x, w in [(50, 40, 50), (60, 30, 40), (80, 25, 20), (100, 50, 100)]:
    v = T * x / (T + w)
    add(f"{T} litres of a solution contains {x}% acid. If {w} litres of water is added, find the percentage of acid in the new solution.",
        f"{as_num(T)} লিটাৰ দ্ৰৱত {as_num(x)}% এচিড আছে। {as_num(w)} লিটাৰ পানী যোগ কৰিলে নতুন দ্ৰৱত এচিডৰ শতাংশ কিমান হ'ব?",
        r2(v), [r2(x), r2(x / 2), r2(v + 5), r2(x * T / w)],
        f"New % = {T}×{x}/({T}+{w}) = {r2(v)}%.",
        f"নতুন শতাংশ = {as_num(r2(v))}%।")

# 10. milkman profit
for a, b in [(4, 1), (5, 1), (3, 1), (7, 2), (9, 1), (6, 1)]:
    v = b / a * 100
    add(f"A milkman mixes water and milk in the ratio {a} : {b} and sells the mixture at the cost price of milk. Find his profit percent.",
        f"এজন গাখীৰৱালাই পানী আৰু গাখীৰ {as_num(a)} : {as_num(b)} অনুপাতত মিহলাই গাখীৰৰ ক্ৰয়মূল্যত বিক্ৰী কৰে। তেওঁৰ লাভৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(a / b * 100), r2(v / 2), r2(v * 2), r2(100 - v)],
        f"Profit% = water/milk × 100 = {b}/{a} × 100 = {r2(v)}%.",
        f"লাভ% = {as_num(r2(v))}%।")

# 11. repeated replacement concentration
for V, x, n in [(50, 10, 2), (80, 20, 2), (100, 25, 2), (60, 15, 3)]:
    v = ((V - x) / V) ** n * 100
    add(f"A vessel contains {V} litres of pure milk. {x} litres are removed and replaced with water, twice. Find the percentage of milk in the final mixture.",
        f"এটা পাত্ৰত {as_num(V)} লিটাৰ খাটি গাখীৰ আছে। {as_num(x)} লিটাৰ আঁতৰাই পানীৰে সলনি কৰা হয়, দুবাৰ। চূড়ান্ত মিশ্ৰণত গাখীৰৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(100 - v), r2(v / 2), r2(v + 5), r2(100 * (V - x) / V)],
        f"Milk% = (({V}-{x})/{V})² × 100 = {r2(v)}%.",
        f"গাখীৰ% = {as_num(r2(v))}%।")

# extra batch
for c, d, m in [(28, 42, 33), (36, 60, 45), (14, 32, 20), (22, 38, 30),
                (45, 75, 60), (18, 30, 24), (40, 70, 52), (55, 85, 70)]:
    x, y = d - m, m - c
    g = math.gcd(x, y)
    add(f"In what ratio must a commodity at {c} per kg be mixed with one at {d} per kg to get a mixture worth {m} per kg?",
        f"{as_num(c)} টকা/কিলো মূল্যৰ বস্তু {as_num(d)} টকা/কিলো মূল্যৰ বস্তুৰ সৈতে কিমান অনুপাতত মিহলালে {as_num(m)} টকা/কিলো মূল্যৰ মিশ্ৰণ পোৱা যাব?",
        f"{x//g}:{y//g}", [f"{y//g}:{x//g}", f"{c}:{d}", f"{x//g+1}:{y//g}"],
        f"Ratio = {x//g}:{y//g}.",
        f"অনুপাত = {as_num(x//g)}:{as_num(y//g)}।")

for q1, p1, q2, p2 in [(35, 25, 15, 45), (45, 18, 55, 28), (12, 50, 18, 65),
                       (24, 32, 36, 44), (50, 15, 25, 27), (16, 40, 24, 55),
                       (28, 22, 42, 37), (33, 60, 27, 70)]:
    v = (q1 * p1 + q2 * p2) / (q1 + q2)
    add(f"{q1} kg of rice at {p1} per kg is mixed with {q2} kg at {p2} per kg. Find the average price of the mixture.",
        f"{as_num(q1)} কিলো {as_num(p1)} টকা/কিলো চাউল {as_num(q2)} কিলো {as_num(p2)} টকা/কিলো চাউলৰ সৈতে মিহলালে মিশ্ৰণৰ গড় মূল্য কিমান?",
        r2(v), [r2((p1 + p2) / 2), r2(v + 2), r2(v - 2), r2(p1 + p2)],
        f"Mean = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

for T, a, b in [(84, 5, 2), (96, 7, 9), (108, 4, 5), (144, 3, 5), (168, 9, 5), (180, 7, 8)]:
    milk = T * a / (a + b)
    add(f"{T} litres of a mixture contains milk and water in the ratio {a} : {b}. Find the quantity of milk.",
        f"{as_num(T)} লিটাৰ মিশ্ৰণত গাখীৰ আৰু পানী {as_num(a)} : {as_num(b)} অনুপাতত আছে। গাখীৰৰ পৰিমাণ নিৰ্ণয় কৰা।",
        r2(milk), [r2(T - milk), r2(T * b / (a + b)), r2(T / 2), r2(milk * 2)],
        f"Milk = {r2(milk)} litres.",
        f"গাখীৰ = {as_num(r2(milk))} লিটাৰ।")

for V, x, n in [(72, 9, 2), (90, 9, 3), (120, 12, 2), (150, 15, 2), (45, 5, 2), (54, 6, 3)]:
    v = V * ((V - x) / V) ** n
    add(f"A vessel contains {V} litres of pure milk. {x} litres are removed and replaced with water. This is done {n} times. Find the quantity of pure milk left.",
        f"এটা পাত্ৰত {as_num(V)} লিটাৰ খাটি গাখীৰ আছে। {as_num(x)} লিটাৰ আঁতৰাই পানীৰে সলনি কৰা হয়। এই কাম {as_num(n)} বাৰ কৰা হয়। অৱশিষ্ট খাটি গাখীৰৰ পৰিমাণ নিৰ্ণয় কৰা।",
        r2(v), [r2(V - x * n), r2(v / 2), r2(v + x), r2(V * (1 - x / V))],
        f"Milk left = {r2(v)} litres.",
        f"অৱশিষ্ট গাখীৰ = {as_num(r2(v))} লিটাৰ।")

for a, b, c, d in [(2, 1, 5, 2), (6, 5, 3, 1), (8, 3, 4, 5), (9, 4, 5, 6), (7, 3, 5, 1), (10, 3, 4, 7)]:
    m = (F(a, a + b) + F(c, c + d)) / 2
    w = 1 - m
    g = math.gcd(m.numerator * w.denominator, w.numerator * m.denominator)
    x = m.numerator * w.denominator // g
    y = w.numerator * m.denominator // g
    add(f"Two vessels contain milk and water in the ratios {a} : {b} and {c} : {d}. Equal quantities from both vessels are mixed. Find the ratio of milk to water in the mixture.",
        f"দুটা পাত্ৰত গাখীৰ আৰু পানীৰ অনুপাত ক্ৰমে {as_num(a)} : {as_num(b)} আৰু {as_num(c)} : {as_num(d)}। দুয়োটাৰ পৰা সমান পৰিমাণ মিহলালে মিশ্ৰণত গাখীৰ আৰু পানীৰ অনুপাত কিমান হ'ব?",
        f"{x}:{y}", [f"{a+c}:{b+d}", f"{a}:{b}", f"{y}:{x}"],
        f"Milk:water = {x}:{y}.",
        f"গাখীৰ:পানী = {as_num(x)}:{as_num(y)}।")

for T, p, q in [(70, 84, 60), (90, 72, 45), (120, 75, 50), (45, 64, 40), (150, 80, 60), (200, 90, 75)]:
    w = T * (p - q) / q
    add(f"How much water must be added to {T} litres of milk containing {p}% milk so that the mixture contains {q}% milk?",
        f"{as_num(p)}% গাখীৰ থকা {as_num(T)} লিটাৰ গাখীৰত কিমান পানী যোগ কৰিলে মিশ্ৰণত {as_num(q)}% গাখীৰ থাকিব?",
        r2(w), [r2(T * (p - q) / p), r2(w / 2), r2(w * 2), r2(T - w)],
        f"Water = {r2(w)} litres.",
        f"পানী = {as_num(r2(w))} লিটাৰ।")

for q1, c1, q2, c2, sp in [(25, 40, 35, 52, 52), (30, 20, 20, 35, 32), (40, 15, 10, 30, 27)]:
    cp = (q1 * c1 + q2 * c2) / (q1 + q2)
    v = (sp - cp) / cp * 100
    add(f"{q1} kg of goods at {c1} per kg is mixed with {q2} kg at {c2} per kg and the mixture is sold at {sp} per kg. Find the profit percent.",
        f"{as_num(q1)} কিলো {as_num(c1)} টকাৰ বস্তু {as_num(q2)} কিলো {as_num(c2)} টকাৰ বস্তুৰ সৈতে মিহলাই {as_num(sp)} টকা/কিলোত বিক্ৰী কৰা হয়। লাভৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2((sp - c1) / c1 * 100), r2((sp - c2) / c2 * 100), r2(v / 2), r2(v * 2)],
        f"Profit% = {r2(v)}%.",
        f"লাভ% = {as_num(r2(v))}%।")

for T, x, w in [(40, 20, 40), (75, 40, 25), (120, 30, 30), (90, 60, 45)]:
    v = T * x / (T + w)
    add(f"{T} litres of a solution contains {x}% acid. If {w} litres of water is added, find the percentage of acid in the new solution.",
        f"{as_num(T)} লিটাৰ দ্ৰৱত {as_num(x)}% এচিড আছে। {as_num(w)} লিটাৰ পানী যোগ কৰিলে নতুন দ্ৰৱত এচিডৰ শতাংশ কিমান হ'ব?",
        r2(v), [r2(x), r2(x / 2), r2(v + 5), r2(x * T / w)],
        f"New % = {r2(v)}%.",
        f"নতুন শতাংশ = {as_num(r2(v))}%।")

for a, b in [(8, 1), (10, 1), (12, 1), (15, 2)]:
    v = b / a * 100
    add(f"A milkman mixes water and milk in the ratio {a} : {b} and sells the mixture at the cost price of milk. Find his profit percent.",
        f"এজন গাখীৰৱালাই পানী আৰু গাখীৰ {as_num(a)} : {as_num(b)} অনুপাতত মিহলাই গাখীৰৰ ক্ৰয়মূল্যত বিক্ৰী কৰে। তেওঁৰ লাভৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(a / b * 100), r2(v / 2), r2(v * 2), r2(100 - v)],
        f"Profit% = {r2(v)}%.",
        f"লাভ% = {as_num(r2(v))}%।")

append("mixture-alligation", rows)
