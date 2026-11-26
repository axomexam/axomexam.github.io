#!/usr/bin/env python3
"""Permutation & Combination: 95+ very hard bilingual questions."""

import math
import sys
from collections import Counter
sys.path.insert(0, "tools")
from data_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


# 1. nPr
for n, r in [(7, 3), (8, 2), (9, 4), (6, 3), (10, 2)]:
    v = math.perm(n, r)
    add(f"Find the value of {n}P{r}.",
        f"{as_num(n)}P{as_num(r)} ৰ মান নিৰ্ণয় কৰা।",
        v, [math.comb(n, r), v // 2, v * 2, math.factorial(n)],
        f"{n}P{r} = {n}!/({n}-{r})! = {v}.",
        f"{as_num(n)}P{as_num(r)} = {as_num(v)}।")

# 2. nCr
for n, r in [(10, 3), (12, 4), (9, 2), (15, 3), (8, 5)]:
    v = math.comb(n, r)
    add(f"Find the value of {n}C{r}.",
        f"{as_num(n)}C{as_num(r)} ৰ মান নিৰ্ণয় কৰা।",
        v, [math.perm(n, r), v * 2, v // 2, math.comb(n, r - 1)],
        f"{n}C{r} = {n}!/({r}!({n}-{r})!) = {v}.",
        f"{as_num(n)}C{as_num(r)} = {as_num(v)}।")

# 3. word arrangements with repeats
for word in ["LEVEL", "BANANA", "ASSAM", "INDIA", "COMMITTEE"]:
    n = len(word)
    counts = Counter(word)
    v = math.factorial(n)
    for c in counts.values():
        v //= math.factorial(c)
    add(f"Find the number of distinct arrangements of the letters of the word {word}.",
        f"{word} শব্দৰ আখৰবোৰৰ পৰা পোৱা বিভিন্ন বিন্যাসৰ সংখ্যা নিৰ্ণয় কৰা।",
        v, [math.factorial(n), v * 2, v // 2, math.factorial(n - 1)],
        f"The word has {n} letters with repetitions {dict(counts)}. Arrangements = {n}!/(product of repeated factorials) = {v}.",
        f"শব্দটোত {as_num(n)} টা আখৰ আছে; বিন্যাস = {as_num(v)}।")

# 4. committee selection
for n, r in [(10, 3), (12, 5), (8, 4), (15, 2), (9, 3)]:
    v = math.comb(n, r)
    add(f"In how many ways can a committee of {r} members be selected from {n} people?",
        f"{as_num(n)} জন মানুহৰ পৰা {as_num(r)} জনীয়া সমিতি কিমান ধৰণে বাছনি কৰিব পাৰি?",
        v, [math.perm(n, r), v * 2, v // 2, math.comb(n, r - 1)],
        f"Selection order does not matter, so use {n}C{r} = {v}.",
        f"বাছনিৰ ক্ৰম গুৰুত্বপূৰ্ণ নহয়, সেয়ে {as_num(n)}C{as_num(r)} = {as_num(v)}।")

# 5. circular permutations
for n in [5, 6, 7, 8]:
    v = math.factorial(n - 1)
    add(f"In how many ways can {n} people be seated around a circular table?",
        f"{as_num(n)} জন মানুহ এটা গোল মেজৰ চাৰিওফালে কিমান ধৰণে বহিব পাৰে?",
        v, [math.factorial(n), v * 2, v // 2, math.factorial(n - 2)],
        f"Circular arrangements = (n-1)! = {n-1}! = {v}.",
        f"বৃত্তীয় বিন্যাস = (n-1)! = {as_num(v)}।")

# 6. handshakes
for n in [10, 12, 15, 20, 8]:
    v = n * (n - 1) // 2
    add(f"In a meeting of {n} people, each person shakes hands with every other person once. Find the total number of handshakes.",
        f"{as_num(n)} জন মানুহৰ সভাত প্ৰতিজনে প্ৰত্যেকৰ সৈতে এবাৰ হাত মিলায়। মুঠ হাত মিলোৱাৰ সংখ্যা নিৰ্ণয় কৰা।",
        v, [n * (n - 1), v * 2, n * n, n + 1],
        f"Handshakes = {n}C2 = {n}({n}-1)/2 = {v}.",
        f"হাত মিলোৱা = {as_num(n)}C২ = {as_num(v)}।")

# 7. digits
for n, r in [(5, 3), (6, 3), (4, 2), (7, 3)]:
    v = math.perm(n, r)
    add(f"How many {r}-digit numbers can be formed using {n} distinct digits without repetition?",
        f"{as_num(n)} টা ভিন্ন অংক ব্যৱহাৰ কৰি পুনৰাবৃত্তি নকৰাকৈ কিমান {as_num(r)}-অংকৰ সংখ্যা গঠন কৰিব পাৰি?",
        v, [n ** r, math.comb(n, r), v * 2, math.factorial(n)],
        f"First place has {n} choices, then {n-1}, and so on: {n}P{r} = {v}.",
        f"প্ৰথম স্থানত {as_num(n)} টা বিকল্প, তাৰ পিছত {as_num(n-1)}; সেয়ে {as_num(v)}।")

for n, r in [(4, 3), (3, 2), (5, 2)]:
    v = n ** r
    add(f"How many {r}-digit numbers can be formed using {n} digits if repetition is allowed?",
        f"পুনৰাবৃত্তি অনুমোদিত হ'লে {as_num(n)} টা অংকৰ পৰা কিমান {as_num(r)}-অংকৰ সংখ্যা গঠন কৰিব পাৰি?",
        v, [math.perm(n, r), math.comb(n, r), v * 2, math.factorial(r)],
        f"Each place has {n} choices, so the count is {n}^{r} = {v}.",
        f"প্ৰতিটো স্থানত {as_num(n)} টা বিকল্প, সেয়ে {as_num(v)}।")

# 8. restrictions
for total_m, total_w, r in [(5, 4, 3), (6, 3, 2), (4, 4, 2)]:
    v = math.comb(total_m, 1) * math.comb(total_w, r - 1) if r > 1 else 0
    add(f"A committee of {r} is to be formed from {total_m} men and {total_w} women, with exactly one man. In how many ways can this be done?",
        f"{as_num(total_m)} জন পুৰুষ আৰু {as_num(total_w)} জন মহিলাৰ পৰা {as_num(r)} জনীয়া সমিতি গঠন কৰিব লাগে, য'ত ঠিক এজন পুৰুষ থাকিব। কিমান ধৰণে কৰিব পাৰি?",
        v, [math.comb(total_m + total_w, r), v * 2, math.comb(total_m, 1) * math.comb(total_w, r), v + 10],
        f"Choose 1 man from {total_m} and {r-1} women from {total_w}: {total_m}C1 × {total_w}C{r-1} = {v}.",
        f"১ জন পুৰুষ আৰু {as_num(r-1)} জন মহিলা বাছনি: {as_num(v)} ধৰণ।")

for total, men in [(10, 6), (12, 7), (9, 5)]:
    add(f"A committee of 3 is to be formed from {total} people of whom {men} are men. In how many ways can it contain at least one woman?",
        f"{as_num(total)} জনৰ পৰা (ইয়াৰে {as_num(men)} জন পুৰুষ) ৩ জনীয়া সমিতি গঠন কৰা হয়। কমেও এজনী মহিলা থকা কিমান ধৰণ আছে?",
        math.comb(total, 3) - math.comb(men, 3),
        [math.comb(total, 3), math.comb(men, 3), math.comb(total, 3) + math.comb(men, 3), math.comb(total, 2)],
        f"Total committees = {total}C3 = {math.comb(total,3)}; all-men committees = {men}C3 = {math.comb(men,3)}. At least one woman = {math.comb(total,3)-math.comb(men,3)}.",
        f"মুঠ {as_num(math.comb(total,3))}, সকলো পুৰুষ {as_num(math.comb(men,3))}; সেয়ে {as_num(math.comb(total,3)-math.comb(men,3))}।")

# 9. diagonals
for n in [6, 8, 10, 12, 15]:
    v = n * (n - 3) // 2
    add(f"Find the number of diagonals of a polygon with {n} sides.",
        f"{as_num(n)} বাহু থকা বহুভুজৰ কৰ্ণৰ সংখ্যা নিৰ্ণয় কৰা।",
        v, [n * (n - 1) // 2, n * (n - 3), v * 2, n],
        f"Diagonals = n(n-3)/2 = {n}({n}-3)/2 = {v}.",
        f"কৰ্ণ = {as_num(v)}।")

# 10. distribution
for balls, boxes in [(3, 2), (4, 3), (5, 2)]:
    v = boxes ** balls
    add(f"In how many ways can {balls} distinct balls be distributed among {boxes} distinct boxes if any box may receive any number of balls?",
        f"{as_num(balls)} টা ভিন্ন বল {as_num(boxes)} টা ভিন্ন বাকচত (যিকোনো বাকচত যিকোনো সংখ্যক) কিমান ধৰণে ৰাখিব পাৰি?",
        v, [math.perm(boxes, balls), math.comb(balls, boxes), v * 2, math.factorial(balls)],
        f"Each ball has {boxes} choices, so the count is {boxes}^{balls} = {v}.",
        f"প্ৰতিটো বলৰ {as_num(boxes)} টা বিকল্প, সেয়ে {as_num(v)}।")

# extra batch
for n, r in [(6, 2), (7, 4), (8, 3), (9, 3)]:
    v = math.perm(n, r)
    add(f"Find the value of {n}P{r}.",
        f"{as_num(n)}P{as_num(r)} ৰ মান নিৰ্ণয় কৰা।",
        v, [math.comb(n, r), v // 2, v * 2, math.factorial(n)],
        f"{n}P{r} = {v}.",
        f"{as_num(n)}P{as_num(r)} = {as_num(v)}।")

for n, r in [(11, 2), (13, 3), (7, 3), (10, 4), (6, 2)]:
    v = math.comb(n, r)
    add(f"Find the value of {n}C{r}.",
        f"{as_num(n)}C{as_num(r)} ৰ মান নিৰ্ণয় কৰা।",
        v, [math.perm(n, r), v * 2, v // 2, math.comb(n, r - 1)],
        f"{n}C{r} = {v}.",
        f"{as_num(n)}C{as_num(r)} = {as_num(v)}।")

for word in ["MISSISSIPPI", "LETTER", "APPLE", "BALLOON"]:
    n = len(word)
    counts = Counter(word)
    v = math.factorial(n)
    for c in counts.values():
        v //= math.factorial(c)
    add(f"Find the number of distinct arrangements of the letters of the word {word}.",
        f"{word} শব্দৰ আখৰবোৰৰ পৰা পোৱা বিভিন্ন বিন্যাসৰ সংখ্যা নিৰ্ণয় কৰা।",
        v, [math.factorial(n), v * 2, v // 2, math.factorial(n - 1)],
        f"Arrangements = {n}!/(product of repeated factorials) = {v}.",
        f"বিন্যাস = {as_num(v)}।")

for n, r in [(14, 2), (20, 3), (11, 4)]:
    v = math.comb(n, r)
    add(f"In how many ways can a committee of {r} members be selected from {n} people?",
        f"{as_num(n)} জন মানুহৰ পৰা {as_num(r)} জনীয়া সমিতি কিমান ধৰণে বাছনি কৰিব পাৰি?",
        v, [math.perm(n, r), v * 2, v // 2, math.comb(n, r - 1)],
        f"{n}C{r} = {v}.",
        f"{as_num(n)}C{as_num(r)} = {as_num(v)}।")

for n in [9, 10, 12]:
    v = math.factorial(n - 1)
    add(f"In how many ways can {n} people be seated around a circular table?",
        f"{as_num(n)} জন মানুহ এটা গোল মেজৰ চাৰিওফালে কিমান ধৰণে বহিব পাৰি?",
        v, [math.factorial(n), v * 2, v // 2, math.factorial(n - 2)],
        f"Circular arrangements = (n-1)! = {v}.",
        f"বৃত্তীয় বিন্যাস = {as_num(v)}।")

for n in [6, 9, 11, 25]:
    v = n * (n - 1) // 2
    add(f"In a meeting of {n} people, each person shakes hands with every other person once. Find the total number of handshakes.",
        f"{as_num(n)} জন মানুহৰ সভাত প্ৰতিজনে প্ৰত্যেকৰ সৈতে এবাৰ হাত মিলায়। মুঠ হাত মিলোৱাৰ সংখ্যা নিৰ্ণয় কৰা।",
        v, [n * (n - 1), v * 2, n * n, n + 1],
        f"Handshakes = {n}C2 = {v}.",
        f"হাত মিলোৱা = {as_num(v)}।")

for n, r in [(6, 3), (8, 2), (5, 3)]:
    v = math.perm(n, r)
    add(f"How many {r}-digit numbers can be formed using {n} distinct digits without repetition?",
        f"{as_num(n)} টা ভিন্ন অংক ব্যৱহাৰ কৰি পুনৰাবৃত্তি নকৰাকৈ কিমান {as_num(r)}-অংকৰ সংখ্যা গঠন কৰিব পাৰি?",
        v, [n ** r, math.comb(n, r), v * 2, math.factorial(n)],
        f"{n}P{r} = {v}.",
        f"{as_num(v)} টা।")

for n in [7, 9, 11]:
    v = n * (n - 3) // 2
    add(f"Find the number of diagonals of a polygon with {n} sides.",
        f"{as_num(n)} বাহু থকা বহুভুজৰ কৰ্ণৰ সংখ্যা নিৰ্ণয় কৰা।",
        v, [n * (n - 1) // 2, n * (n - 3), v * 2, n],
        f"Diagonals = {v}.",
        f"কৰ্ণ = {as_num(v)}।")

for balls, boxes in [(2, 3), (3, 3)]:
    v = boxes ** balls
    add(f"In how many ways can {balls} distinct balls be distributed among {boxes} distinct boxes if any box may receive any number of balls?",
        f"{as_num(balls)} টা ভিন্ন বল {as_num(boxes)} টা ভিন্ন বাকচত কিমান ধৰণে ৰাখিব পাৰি?",
        v, [math.perm(boxes, balls), math.comb(balls, boxes), v * 2, math.factorial(balls)],
        f"{boxes}^{balls} = {v}.",
        f"{as_num(v)} ধৰণ।")

for total_m, total_w, r in [(4, 5, 3), (5, 5, 2)]:
    v = math.comb(total_m, 1) * math.comb(total_w, r - 1)
    add(f"A committee of {r} is to be formed from {total_m} men and {total_w} women, with exactly one man. In how many ways can this be done?",
        f"{as_num(total_m)} জন পুৰুষ আৰু {as_num(total_w)} জন মহিলাৰ পৰা {as_num(r)} জনীয়া সমিতি, য'ত ঠিক এজন পুৰুষ। কিমান ধৰণে?",
        v, [math.comb(total_m + total_w, r), v * 2, math.comb(total_m, 1) * math.comb(total_w, r), v + 10],
        f"{total_m}C1 × {total_w}C{r-1} = {v}.",
        f"{as_num(v)} ধৰণ।")

# final batch
for n, r in [(10, 3), (9, 2), (11, 3)]:
    v = math.perm(n, r)
    add(f"Find the value of {n}P{r}.",
        f"{as_num(n)}P{as_num(r)} ৰ মান নিৰ্ণয় কৰা।",
        v, [math.comb(n, r), v // 2, v * 2, math.factorial(n)],
        f"{n}P{r} = {v}.",
        f"{as_num(n)}P{as_num(r)} = {as_num(v)}।")

for n, r in [(12, 2), (14, 3), (9, 4)]:
    v = math.comb(n, r)
    add(f"Find the value of {n}C{r}.",
        f"{as_num(n)}C{as_num(r)} ৰ মান নিৰ্ণয় কৰা।",
        v, [math.perm(n, r), v * 2, v // 2, math.comb(n, r - 1)],
        f"{n}C{r} = {v}.",
        f"{as_num(n)}C{as_num(r)} = {as_num(v)}।")

for word in ["STATISTICS", "SUCCESS"]:
    n = len(word)
    counts = Counter(word)
    v = math.factorial(n)
    for c in counts.values():
        v //= math.factorial(c)
    add(f"Find the number of distinct arrangements of the letters of the word {word}.",
        f"{word} শব্দৰ আখৰবোৰৰ পৰা পোৱা বিভিন্ন বিন্যাসৰ সংখ্যা নিৰ্ণয় কৰা।",
        v, [math.factorial(n), v * 2, v // 2, math.factorial(n - 1)],
        f"Arrangements = {v}.",
        f"বিন্যাস = {as_num(v)}।")

for n, r in [(16, 3), (13, 4)]:
    v = math.comb(n, r)
    add(f"In how many ways can a committee of {r} members be selected from {n} people?",
        f"{as_num(n)} জন মানুহৰ পৰা {as_num(r)} জনীয়া সমিতি কিমান ধৰণে বাছনি কৰিব পাৰি?",
        v, [math.perm(n, r), v * 2, v // 2, math.comb(n, r - 1)],
        f"{n}C{r} = {v}.",
        f"{as_num(n)}C{as_num(r)} = {as_num(v)}।")

for n in [11]:
    v = math.factorial(n - 1)
    add(f"In how many ways can {n} people be seated around a circular table?",
        f"{as_num(n)} জন মানুহ এটা গোল মেজৰ চাৰিওফালে কিমান ধৰণে বহিব পাৰি?",
        v, [math.factorial(n), v * 2, v // 2, math.factorial(n - 2)],
        f"(n-1)! = {v}.",
        f"(n-1)! = {as_num(v)}।")

for n in [20]:
    v = n * (n - 3) // 2
    add(f"Find the number of diagonals of a polygon with {n} sides.",
        f"{as_num(n)} বাহু থকা বহুভুজৰ কৰ্ণৰ সংখ্যা নিৰ্ণয় কৰা।",
        v, [n * (n - 1) // 2, n * (n - 3), v * 2, n],
        f"Diagonals = {v}.",
        f"কৰ্ণ = {as_num(v)}।")

append("permutation-combination", rows)
