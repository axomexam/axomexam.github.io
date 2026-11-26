#!/usr/bin/env python3
"""Puzzles (floor arrangement): 80+ very hard bilingual questions."""

import itertools
import random
import sys
sys.path.insert(0, "tools")
from verbal_bank import append_bi

rows = []
random.seed(9)

PEOPLE = ["A", "B", "C", "D", "E", "F"]


def add(en, as_, correct, correct_as, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_, "correct": correct, "correct_as": correct_as,
                 "dists": list(cands), "exp_en": exp_en, "exp_as": exp_as})


def clues_for(arr):
    """arr[i] is the person on floor i+1 (bottom to top)."""
    n = len(arr)
    out = []
    out.append((f"{arr[0]} lives on the bottom floor.", f"{arr[0]} সৰ্বনিম্ন মহলাত থাকে।",
                lambda x, v=arr[0]: x[0] == v))
    out.append((f"{arr[-1]} lives on the top floor.", f"{arr[-1]} সৰ্বোচ্চ মহলাত থাকে।",
                lambda x, v=arr[-1]: x[-1] == v))
    for i in range(n - 1):
        a, b = arr[i], arr[i + 1]
        out.append((f"{b} lives immediately above {a}.", f"{b}, {a} ৰ লগত লগত ওপৰৰ মহলাত থাকে।",
                    lambda x, a=a, b=b: x.index(b) == x.index(a) + 1))
        out.append((f"{a} lives immediately below {b}.", f"{a}, {b} ৰ লগত লগত তলৰ মহলাত থাকে।",
                    lambda x, a=a, b=b: x.index(a) + 1 == x.index(b)))
    for i in range(n):
        for j in range(n):
            if abs(i - j) == 2:
                a, b = arr[i], arr[j]
                if i < j:
                    out.append((f"{b} lives two floors above {a}.", f"{b}, {a} ৰ দুমহলা ওপৰত থাকে।",
                                lambda x, a=a, b=b: x.index(b) == x.index(a) + 2))
    for i in range(n):
        for j in range(i + 1, n):
            a, b = arr[i], arr[j]
            out.append((f"{a} lives somewhere below {b}.", f"{a}, {b} ৰ তলৰ ক'ৰবাত থাকে।",
                        lambda x, a=a, b=b: x.index(a) < x.index(b)))
    return out


def unique(clues):
    perms = [list(p) for p in itertools.permutations(PEOPLE)]
    return [p for p in perms if all(fn(p) for (_, _, fn) in clues)]


def build_item(arr):
    pool = clues_for(arr)
    random.shuffle(pool)
    chosen = []
    for clue in pool:
        chosen.append(clue)
        if len(unique(chosen)) == 1:
            break
        if len(chosen) >= 5:
            break
    if len(unique(chosen)) != 1:
        return None
    qtype = random.choice(["floor3", "floor4", "above", "between"])
    if qtype == "floor3":
        ans = arr[2]
        q_en, q_as = "Who lives on floor 3?", "তৃতীয় মহলাত কোন থাকে?"
    elif qtype == "floor4":
        ans = arr[3]
        q_en, q_as = "Who lives on floor 4?", "চতুৰ্থ মহলাত কোন থাকে?"
    elif qtype == "above":
        i = random.randrange(0, 5)
        ans = arr[i + 1]
        q_en = f"Who lives immediately above {arr[i]}?"
        q_as = f"{arr[i]} ৰ লগত লগত ওপৰত কোন থাকে?"
    else:
        i, j = sorted(random.sample(range(6), 2))
        ans = str(j - i - 1)
        q_en = f"How many floors are there between {arr[i]} and {arr[j]}?"
        q_as = f"{arr[i]} আৰু {arr[j]} ৰ মাজত কিমান মহলা আছে?"
    clue_en = " ".join(c[0] for c in chosen)
    clue_as = " ".join(c[1] for c in chosen)
    stem_en = (f"Six persons A, B, C, D, E and F live on six different floors of a building, "
               f"numbered 1 (bottom) to 6 (top). {clue_en} {q_en}")
    stem_as = (f"ছয়জন লোকে A, B, C, D, E আৰু F এটা ভৱনৰ ১ (তল) ৰ পৰা ৬ (ওপৰ) নম্বৰলৈ "
               f"ছটা বেলেগ বেলেগ মহলাত থাকে। {clue_as} {q_as}")
    if qtype in ("floor3", "floor4", "above"):
        cands = [(p, p) for p in PEOPLE if p != ans][:3]
    else:
        cands = [(str(k), str(k)) for k in range(0, 4) if str(k) != ans][:3]
    return (stem_en, stem_as, ans, ans, cands,
            f"Floors 1 to 6: {' '.join(arr)}.", f"১ ৰ পৰা ৬ মহলা: {' '.join(arr)}।")


count = 0
seen = set()
while count < 88:
    arr = random.sample(PEOPLE, 6)
    item = build_item(arr)
    if item is None:
        continue
    if item[0] in seen:
        continue
    seen.add(item[0])
    add(*item)
    count += 1

append_bi("puzzles", rows)
