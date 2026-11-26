#!/usr/bin/env python3
"""Seating Arrangement: 80+ very hard bilingual questions."""

import itertools
import random
import sys
sys.path.insert(0, "tools")
from verbal_bank import append_bi

rows = []
random.seed(5)

PEOPLE = ["A", "B", "C", "D", "E"]


def add(en, as_, correct, correct_as, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_, "correct": correct, "correct_as": correct_as,
                 "dists": list(cands), "exp_en": exp_en, "exp_as": exp_as})


def pos(arr, p):
    return arr.index(p)


CLUES = [
    lambda a, p: (lambda: f"{p} sits at the extreme left.")(),
]


def clue_texts(arr):
    out = []
    n = len(arr)
    left, right = arr[0], arr[-1]
    out.append((f"{left} sits at the extreme left.", f"{left} বাওঁফালৰ একেবাৰে মূৰত বহে।",
                lambda x, v=left: x[0] == v))
    out.append((f"{right} sits at the extreme right.", f"{right} সোঁফালৰ একেবাৰে মূৰত বহে।",
                lambda x, v=right: x[-1] == v))
    for i in range(n - 1):
        a, b = arr[i], arr[i + 1]
        out.append((f"{a} sits immediately to the left of {b}.", f"{a}, {b} ৰ লগত লগত বাওঁফালে বহে।",
                    lambda x, a=a, b=b: x.index(a) + 1 == x.index(b)))
        out.append((f"{b} sits immediately to the right of {a}.", f"{b}, {a} ৰ লগত লগত সোঁফালে বহে।",
                    lambda x, a=a, b=b: x.index(b) + 1 == x.index(a)))
    for i in range(n):
        for j in range(n):
            if i != j and abs(i - j) == 2:
                a, b = arr[i], arr[j]
                out.append((f"{a} sits two places away from {b}.", f"{a}, {b} ৰ পৰা দুখন আসন আঁতৰত বহে।",
                            lambda x, a=a, b=b: abs(x.index(a) - x.index(b)) == 2))
    for i in range(n):
        for j in range(i + 1, n):
            a, b = arr[i], arr[j]
            out.append((f"{a} sits somewhere to the left of {b}.", f"{a}, {b} ৰ বাওঁফালে ক'ৰবাত বহে।",
                        lambda x, a=a, b=b: x.index(a) < x.index(b)))
    return out


def unique(clues):
    perms = [list(p) for p in itertools.permutations(PEOPLE)]
    good = [p for p in perms if all(fn(p) for (_, _, fn) in clues)]
    return good


QUESTIONS = ["left3", "left2", "rightof", "between"]


def build_item(arr):
    pool = clue_texts(arr)
    random.shuffle(pool)
    chosen = []
    for clue in pool:
        trial = chosen + [clue]
        if len(unique(trial)) >= 1:
            chosen = trial
        if len(unique(chosen)) == 1:
            break
        if len(chosen) >= 4:
            break
    if len(unique(chosen)) != 1:
        return None
    qtype = random.choice(QUESTIONS)
    if qtype == "left3":
        ans = arr[2]
        q_en = "Who sits third from the left?"
        q_as = "বাওঁফালৰ পৰা তৃতীয়ত কোন বহে?"
    elif qtype == "left2":
        ans = arr[1]
        q_en = "Who sits second from the left?"
        q_as = "বাওঁফালৰ পৰা দ্বিতীয়ত কোন বহে?"
    elif qtype == "rightof":
        i = random.randrange(0, 4)
        ans = arr[i + 1]
        q_en = f"Who sits immediately to the right of {arr[i]}?"
        q_as = f"{arr[i]} ৰ লগত লগত সোঁফালে কোন বহে?"
    else:
        i, j = sorted(random.sample(range(5), 2))
        ans = str(j - i - 1)
        q_en = f"How many persons sit between {arr[i]} and {arr[j]}?"
        q_as = f"{arr[i]} আৰু {arr[j]} ৰ মাজত কিমানজন বহে?"
    clue_en = " ".join(c[0] for c in chosen)
    clue_as = " ".join(c[1] for c in chosen)
    stem_en = (f"Five friends A, B, C, D and E sit in a row facing north. {clue_en} {q_en}")
    stem_as = (f"পাঁচজন বন্ধু A, B, C, D আৰু E উত্তৰমুখী হৈ এটা শাৰীত বহে। {clue_as} {q_as}")
    if qtype in ("left3", "left2", "rightof"):
        cands = [(p, p) for p in PEOPLE if p != ans][:3]
    else:
        opts = [str(k) for k in range(0, 4) if str(k) != ans]
        cands = [(o, o) for o in opts[:3]]
    return (stem_en, stem_as, ans, ans, cands, f"Arrangement from left: {' '.join(arr)}.", f"বাওঁফালৰ পৰা ক্ৰম: {' '.join(arr)}।")


count = 0
seen = set()
while count < 88:
    arr = random.sample(PEOPLE, 5)
    item = build_item(arr)
    if item is None:
        continue
    if item[0] in seen:
        continue
    seen.add(item[0])
    add(*item)
    count += 1

append_bi("sitting-arrangement", rows)
