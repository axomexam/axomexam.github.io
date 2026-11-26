#!/usr/bin/env python3
"""Ratio & Proportion: 95+ hard bilingual questions."""

import math
import sys
sys.path.insert(0, "tools")
from num_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


# 1. simplify ratio
for a, b in [(144, 180), (252, 336), (375, 625), (486, 810), (1176, 1512),
             (2025, 2700), (1458, 1944), (3087, 4116)]:
    g = math.gcd(a, b)
    add(f"Express the ratio {a} : {b} in its simplest form.",
        f"{as_num(a)} : {as_num(b)} অনুপাতক সৰলতম ৰূপত প্ৰকাশ কৰা।",
        f"{a//g}:{b//g}", [f"{a//g}:{b//g + 1}", f"{a//g + 1}:{b//g}", f"{a//2}:{b//2}", f"{a//g*2}:{b//g*2}"],
        f"Dividing both terms by HCF {g} gives {a//g}:{b//g}.",
        f"উভয় পদক গ.সা.গু. {as_num(g)} ৰে ভাগ কৰিলে {as_num(a//g)}:{as_num(b//g)} পোৱা যায়।")

# 2. divide amount
for amt, a, b, c in [(7200, 3, 4, 5), (9450, 2, 3, 4), (11700, 5, 4, 3),
                     (15600, 7, 5, 3), (21600, 4, 5, 7), (8400, 2, 5, 7)]:
    s = a + b + c
    add(f"Divide {amt} among A, B and C in the ratio {a} : {b} : {c}. What is A's share?",
        f"{as_num(amt)} টকা A, B আৰু C ৰ মাজত {as_num(a)} : {as_num(b)} : {as_num(c)} অনুপাতত ভগোৱা হয়। A ৰ অংশ কিমান?",
        amt * a // s, [amt * b // s, amt * c // s, amt // s, amt * a // s + 100],
        f"A's share = {amt} × {a}/{s} = {amt*a//s}.",
        f"A ৰ অংশ = {as_num(amt)} × {as_num(a)}/{as_num(s)} = {as_num(amt*a//s)}।")

# 3. a:b and b:c
for p, q, r, s in [(3, 4, 5, 6), (2, 3, 4, 5), (5, 7, 3, 4), (7, 9, 6, 11), (4, 5, 10, 13)]:
    a, b, c = p * r, q * r, q * s
    g = math.gcd(math.gcd(a, b), c)
    add(f"If a : b = {p} : {q} and b : c = {r} : {s}, find a : b : c.",
        f"যদি a : b = {as_num(p)} : {as_num(q)} আৰু b : c = {as_num(r)} : {as_num(s)}, তেন্তে a : b : c নিৰ্ণয় কৰা।",
        f"{a//g}:{b//g}:{c//g}", [f"{p}:{q}:{s}", f"{p}:{q}:{r}", f"{a+1}:{b}:{c}", f"{a}:{b}:{c+1}"],
        f"a:b:c = {p}×{r} : {q}×{r} : {q}×{s} = {a}:{b}:{c} = {a//g}:{b//g}:{c//g}.",
        f"a:b:c = {as_num(a//g)}:{as_num(b//g)}:{as_num(c//g)}।")

# 4. mean proportional
for a, b in [(4, 25), (9, 49), (16, 81), (25, 144), (36, 100), (49, 196)]:
    v = int(math.isqrt(a * b))
    add(f"Find the mean proportional between {a} and {b}.",
        f"{as_num(a)} আৰু {as_num(b)} ৰ মাজৰ মধ্য সমানুপাতী নিৰ্ণয় কৰা।",
        v, [a + b, (a + b) // 2, v + 1, a * b],
        f"Mean proportional = √({a} × {b}) = {v}.",
        f"মধ্য সমানুপাতী = √({as_num(a)} × {as_num(b)}) = {as_num(v)}।")

# 5. third proportional
for a, b in [(4, 12), (5, 15), (6, 18), (7, 21), (9, 27), (11, 33)]:
    v = b * b // a
    add(f"Find the third proportional to {a} and {b}.",
        f"{as_num(a)} আৰু {as_num(b)} ৰ তৃতীয় সমানুপাতী নিৰ্ণয় কৰা।",
        v, [b + a, b * a, v + b, v - a],
        f"Third proportional = b²/a = {b}²/{a} = {v}.",
        f"তৃতীয় সমানুপাতী = b²/a = {as_num(v)}।")

# 6. fourth proportional
for a, b, c in [(3, 4, 15), (5, 7, 20), (6, 9, 14), (8, 11, 24), (7, 12, 21)]:
    v = b * c // a
    add(f"Find the fourth proportional to {a}, {b} and {c}.",
        f"{as_num(a)}, {as_num(b)} আৰু {as_num(c)} ৰ চতুৰ্থ সমানুপাতী নিৰ্ণয় কৰা।",
        v, [a * b // c if a * b % c == 0 else v + 1, v + c, v - b, b * c],
        f"Fourth proportional = b × c / a = {b} × {c} / {a} = {v}.",
        f"চতুৰ্থ সমানুপাতী = {as_num(b)} × {as_num(c)} / {as_num(a)} = {as_num(v)}।")

# 7. compound ratio
for a, b, c, d in [(3, 4, 5, 6), (2, 5, 7, 9), (4, 7, 3, 8), (5, 9, 6, 11)]:
    num, den = a * c, b * d
    g = math.gcd(num, den)
    add(f"Find the compound ratio of {a} : {b} and {c} : {d}.",
        f"{as_num(a)} : {as_num(b)} আৰু {as_num(c)} : {as_num(d)} ৰ যৌগিক অনুপাত নিৰ্ণয় কৰা।",
        f"{num//g}:{den//g}", [f"{a+c}:{b+d}", f"{a*d}:{b*c}", f"{num}:{den}", f"{num+1}:{den}"],
        f"Compound ratio = ({a}×{c}) : ({b}×{d}) = {num}:{den} = {num//g}:{den//g}.",
        f"যৌগিক অনুপাত = {as_num(num//g)}:{as_num(den//g)}।")

# 8. duplicate ratio
for a, b in [(3, 4), (5, 7), (6, 11), (8, 9), (2, 5)]:
    add(f"Find the duplicate ratio of {a} : {b}.",
        f"{as_num(a)} : {as_num(b)} ৰ দ্বিগুণ অনুপাত নিৰ্ণয় কৰা।",
        f"{a*a}:{b*b}", [f"{a}:{b}", f"{2*a}:{2*b}", f"{a*a}:{b}"],
        f"Duplicate ratio = {a}² : {b}² = {a*a}:{b*b}.",
        f"দ্বিগুণ অনুপাত = {as_num(a*a)}:{as_num(b*b)}।")

# 9. ratio after adding
for a, b, x, c, d in [(3, 4, 6, 5, 6), (2, 3, 4, 5, 7), (4, 5, 5, 5, 6), (5, 7, 6, 7, 9)]:
    k = x * (c - d) // (a * d - b * c)
    add(f"Two numbers are in the ratio {a} : {b}. If {x} is added to both, the ratio becomes {c} : {d}. Find the smaller number.",
        f"দুটা সংখ্যা {as_num(a)} : {as_num(b)} অনুপাতত আছে। উভয়তে {as_num(x)} যোগ কৰিলে অনুপাত {as_num(c)} : {as_num(d)} হয়। সৰু সংখ্যাটো নিৰ্ণয় কৰা।",
        a * k, [b * k, a * k + x, b * k + x],
        f"Solving gives k = {k}, so the numbers are {a*k} and {b*k}; the smaller is {a*k}.",
        f"সমাধান কৰিলে k = {as_num(k)}, সংখ্যা দুটা {as_num(a*k)} আৰু {as_num(b*k)}; সৰুটো {as_num(a*k)}।")

# 10. income and expenditure
for a, b, c, d, S in [(5, 4, 3, 2, 4000), (5, 7, 3, 4, 6000), (9, 11, 5, 6, 8000), (7, 9, 4, 5, 7000)]:
    x = S * (c - d) // (b * c - a * d)
    add(f"The incomes of A and B are in the ratio {a} : {b} and their expenditures are in the ratio {c} : {d}. If each saves {S}, find A's income.",
        f"A আৰু B ৰ আয়ৰ অনুপাত {as_num(a)} : {as_num(b)} আৰু ব্যয়ৰ অনুপাত {as_num(c)} : {as_num(d)}। প্ৰত্যেকে {as_num(S)} সাঁচে যদি A ৰ আয় নিৰ্ণয় কৰা।",
        a * x, [b * x, a * x - S, S * a // c],
        f"Savings are equal, so {a}x - {c}y = {b}x - {d}y; solving with the saving gives A's income = {a*x}.",
        f"সাঁচ সমান, সেয়ে A ৰ আয় = {as_num(a*x)}।")

# 11. coins
for a, b, c, T in [(3, 4, 5, 450), (2, 3, 4, 450), (5, 6, 7, 975), (4, 5, 6, 720)]:
    unit = 1 * a + 0.5 * b + 0.25 * c
    x = T / unit
    add(f"A bag contains 1-rupee, 50-paise and 25-paise coins in the ratio {a} : {b} : {c}. If the total value is {T}, find the number of 1-rupee coins.",
        f"এটা মোনাত ১ টকা, ৫০ পইচা আৰু ২৫ পইচাৰ মুদ্ৰা {as_num(a)} : {as_num(b)} : {as_num(c)} অনুপাতত আছে। মুঠ মূল্য {as_num(T)} হ'লে ১ টকাৰ মুদ্ৰাৰ সংখ্যা নিৰ্ণয় কৰা।",
        int(a * x), [int(b * x), int(c * x), int(x), int(a * x + b * x)],
        f"Value ratio = {a} : {b/2} : {c/4}; total parts = {unit}; 1-rupee coins = {int(a*x)}.",
        f"মূল্যৰ অনুপাত = {as_num(a)} : {as_num(b/2)} : {as_num(c/4)}; ১ টকাৰ মুদ্ৰা = {as_num(int(a*x))}।")

# 12. which is in proportion
for good, bad1, bad2 in [("3 : 4 = 9 : 12", "2 : 3 = 5 : 7", "4 : 5 = 8 : 11"),
                          ("5 : 7 = 15 : 21", "3 : 5 = 6 : 11", "7 : 8 = 14 : 17"),
                          ("2 : 9 = 8 : 36", "4 : 7 = 8 : 15", "5 : 6 = 10 : 13"),
                          ("7 : 11 = 21 : 33", "3 : 8 = 9 : 25", "6 : 7 = 12 : 15")]:
    add("Which of the following is a correct proportion?",
        "তলৰ কোনটো শুদ্ধ সমানুপাত?",
        good, [bad1, bad2, "1 : 2 = 3 : 5"],
        f"In {good}, the cross products are equal.",
        f"{good} ত ক্ৰছ গুণফল সমান, সেয়ে ই শুদ্ধ সমানুপাত।")

# extra batch
for a, b in [(315, 420), (462, 770), (693, 924), (1024, 1536)]:
    g = math.gcd(a, b)
    add(f"Express the ratio {a} : {b} in its simplest form.",
        f"{as_num(a)} : {as_num(b)} অনুপাতক সৰলতম ৰূপত প্ৰকাশ কৰা।",
        f"{a//g}:{b//g}", [f"{a//g}:{b//g + 1}", f"{a//g + 1}:{b//g}", f"{a//2}:{b//2}", f"{a//g*2}:{b//g*2}"],
        f"Dividing both terms by HCF {g} gives {a//g}:{b//g}.",
        f"উভয় পদক গ.সা.গু. {as_num(g)} ৰে ভাগ কৰিলে {as_num(a//g)}:{as_num(b//g)} পোৱা যায়।")

for amt, a, b, c in [(13500, 2, 3, 5), (18000, 5, 6, 7), (12600, 4, 3, 2), (9600, 7, 3, 2)]:
    s2 = a + b + c
    add(f"Divide {amt} among A, B and C in the ratio {a} : {b} : {c}. What is A's share?",
        f"{as_num(amt)} টকা A, B আৰু C ৰ মাজত {as_num(a)} : {as_num(b)} : {as_num(c)} অনুপাতত ভগোৱা হয়। A ৰ অংশ কিমান?",
        amt * a // s2, [amt * b // s2, amt * c // s2, amt // s2, amt * a // s2 + 100],
        f"A's share = {amt} × {a}/{s2} = {amt*a//s2}.",
        f"A ৰ অংশ = {as_num(amt*a//s2)}।")

for p, q, r, s in [(6, 7, 8, 9), (3, 8, 5, 9), (9, 4, 7, 5)]:
    a, b, c = p * r, q * r, q * s
    g = math.gcd(math.gcd(a, b), c)
    add(f"If a : b = {p} : {q} and b : c = {r} : {s}, find a : b : c.",
        f"যদি a : b = {as_num(p)} : {as_num(q)} আৰু b : c = {as_num(r)} : {as_num(s)}, তেন্তে a : b : c নিৰ্ণয় কৰা।",
        f"{a//g}:{b//g}:{c//g}", [f"{p}:{q}:{s}", f"{p}:{q}:{r}", f"{a+1}:{b}:{c}", f"{a}:{b}:{c+1}"],
        f"a:b:c = {a//g}:{b//g}:{c//g}.",
        f"a:b:c = {as_num(a//g)}:{as_num(b//g)}:{as_num(c//g)}।")

for a, b in [(64, 225), (81, 100), (121, 169)]:
    v = int(math.isqrt(a * b))
    add(f"Find the mean proportional between {a} and {b}.",
        f"{as_num(a)} আৰু {as_num(b)} ৰ মাজৰ মধ্য সমানুপাতী নিৰ্ণয় কৰা।",
        v, [a + b, (a + b) // 2, v + 1, a * b],
        f"Mean proportional = √({a} × {b}) = {v}.",
        f"মধ্য সমানুপাতী = {as_num(v)}।")

for a, b in [(8, 24), (10, 30), (12, 36)]:
    v = b * b // a
    add(f"Find the third proportional to {a} and {b}.",
        f"{as_num(a)} আৰু {as_num(b)} ৰ তৃতীয় সমানুপাতী নিৰ্ণয় কৰা।",
        v, [b + a, b * a, v + b, v - a],
        f"Third proportional = b²/a = {v}.",
        f"তৃতীয় সমানুপাতী = {as_num(v)}।")

for a, b, c in [(4, 5, 12), (9, 10, 18), (2, 7, 8)]:
    v = b * c // a
    add(f"Find the fourth proportional to {a}, {b} and {c}.",
        f"{as_num(a)}, {as_num(b)} আৰু {as_num(c)} ৰ চতুৰ্থ সমানুপাতী নিৰ্ণয় কৰা।",
        v, [v + c, v - b, b * c, v + a],
        f"Fourth proportional = b × c / a = {v}.",
        f"চতুৰ্থ সমানুপাতী = {as_num(v)}।")

for a, b, c, d in [(7, 8, 9, 10), (3, 7, 4, 9), (6, 5, 2, 3), (8, 11, 5, 7)]:
    num, den = a * c, b * d
    g = math.gcd(num, den)
    add(f"Find the compound ratio of {a} : {b} and {c} : {d}.",
        f"{as_num(a)} : {as_num(b)} আৰু {as_num(c)} : {as_num(d)} ৰ যৌগিক অনুপাত নিৰ্ণয় কৰা।",
        f"{num//g}:{den//g}", [f"{a+c}:{b+d}", f"{a*d}:{b*c}", f"{num}:{den}", f"{num+1}:{den}"],
        f"Compound ratio = {num//g}:{den//g}.",
        f"যৌগিক অনুপাত = {as_num(num//g)}:{as_num(den//g)}।")

for a, b in [(7, 9), (4, 9), (10, 13)]:
    add(f"Find the duplicate ratio of {a} : {b}.",
        f"{as_num(a)} : {as_num(b)} ৰ দ্বিগুণ অনুপাত নিৰ্ণয় কৰা।",
        f"{a*a}:{b*b}", [f"{a}:{b}", f"{2*a}:{2*b}", f"{a*a}:{b}"],
        f"Duplicate ratio = {a}² : {b}² = {a*a}:{b*b}.",
        f"দ্বিগুণ অনুপাত = {as_num(a*a)}:{as_num(b*b)}।")

for a, b, x, c, d in [(2, 5, 4, 1, 2), (3, 8, 10, 1, 2), (4, 7, 6, 2, 3), (5, 9, 8, 9, 13), (2, 3, 4, 3, 4)]:
    k = x * (c - d) // (a * d - b * c)
    add(f"Two numbers are in the ratio {a} : {b}. If {x} is added to both, the ratio becomes {c} : {d}. Find the smaller number.",
        f"দুটা সংখ্যা {as_num(a)} : {as_num(b)} অনুপাতত আছে। উভয়তে {as_num(x)} যোগ কৰিলে অনুপাত {as_num(c)} : {as_num(d)} হয়। সৰু সংখ্যাটো নিৰ্ণয় কৰা।",
        a * k, [b * k, a * k + x, b * k + x],
        f"Solving gives k = {k}; the smaller number is {a*k}.",
        f"সমাধান কৰিলে k = {as_num(k)}; সৰু সংখ্যা {as_num(a*k)}।")

for a, b, c, d, S in [(6, 5, 4, 3, 5000), (8, 7, 5, 4, 9000), (10, 9, 6, 5, 8000)]:
    x = S * (c - d) // (b * c - a * d)
    add(f"The incomes of A and B are in the ratio {a} : {b} and their expenditures are in the ratio {c} : {d}. If each saves {S}, find A's income.",
        f"A আৰু B ৰ আয়ৰ অনুপাত {as_num(a)} : {as_num(b)} আৰু ব্যয়ৰ অনুপাত {as_num(c)} : {as_num(d)}। প্ৰত্যেকে {as_num(S)} সাঁচে যদি A ৰ আয় নিৰ্ণয় কৰা।",
        a * x, [b * x, a * x - S, S * a // c],
        f"Equal savings give A's income = {a*x}.",
        f"সমান সাঁচৰ পৰা A ৰ আয় = {as_num(a*x)}।")

for a, b, c, T in [(6, 5, 4, 950), (3, 5, 7, 725), (2, 5, 6, 600), (7, 4, 3, 975)]:
    unit = 1 * a + 0.5 * b + 0.25 * c
    x = T / unit
    add(f"A bag contains 1-rupee, 50-paise and 25-paise coins in the ratio {a} : {b} : {c}. If the total value is {T}, find the number of 1-rupee coins.",
        f"এটা মোনাত ১ টকা, ৫০ পইচা আৰু ২৫ পইচাৰ মুদ্ৰা {as_num(a)} : {as_num(b)} : {as_num(c)} অনুপাতত আছে। মুঠ মূল্য {as_num(T)} হ'লে ১ টকাৰ মুদ্ৰাৰ সংখ্যা নিৰ্ণয় কৰা।",
        int(a * x), [int(b * x), int(c * x), int(x), int(a * x + b * x)],
        f"1-rupee coins = {int(a*x)}.",
        f"১ টকাৰ মুদ্ৰা = {as_num(int(a*x))}।")

for good, bad1, bad2 in [("4 : 5 = 12 : 15", "3 : 7 = 6 : 13", "5 : 8 = 10 : 17"),
                          ("6 : 11 = 18 : 33", "4 : 9 = 8 : 19", "7 : 10 = 14 : 21"),
                          ("8 : 13 = 24 : 39", "5 : 6 = 15 : 19", "3 : 4 = 9 : 13"),
                          ("9 : 14 = 27 : 42", "2 : 7 = 4 : 15", "5 : 9 = 10 : 19")]:
    add("Which of the following is a correct proportion?",
        "তলৰ কোনটো শুদ্ধ সমানুপাত?",
        good, [bad1, bad2, "1 : 3 = 4 : 11"],
        f"In {good}, the cross products are equal.",
        f"{good} ত ক্ৰছ গুণফল সমান।")

append("ratio-proportion", rows)
