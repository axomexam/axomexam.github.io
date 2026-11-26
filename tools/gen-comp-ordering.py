#!/usr/bin/env python3
"""Paragraph Ordering: 175 bilingual questions."""

import re
import sys
sys.path.insert(0, "tools")
from comp_bank import append

NEW = [
    "I wake up at six in the morning. I brush my teeth and wash my face. Then I have breakfast with my family. Finally, I leave for school at seven.",
    "First, dig a small hole in the soil. Place the sapling carefully in the hole. Cover the roots with soil and press gently. Water the plant every day.",
    "Boil water in a kettle. Add tea leaves and sugar to the water. Pour the tea into cups after a few minutes. Serve it hot with biscuits.",
    "We reached the market in the morning. Mother bought vegetables and fruits. I carried the bags for her. We returned home before noon.",
    "The library has many books on different subjects. Students sit quietly and read. They must return books on time. The librarian helps them find books.",
    "Dark clouds gathered in the sky. Soon it began to rain heavily. We ran to a nearby shop for shelter. The rain stopped after an hour.",
    "Make a study plan before you begin. Revise each subject regularly. Solve previous years' question papers. Take enough rest before the exam.",
    "We reached the station early. The train arrived on time. We found our seats and settled down. The journey was comfortable and pleasant.",
    "A butterfly lays eggs on a leaf. The eggs hatch into caterpillars. The caterpillar forms a cocoon. Finally, a butterfly emerges from the cocoon.",
    "We should throw waste in the dustbin. Desks and chairs should be arranged neatly. The blackboard must be cleaned daily. A clean classroom helps us learn better.",
]

src = open("tools/gen-comp-rc.py").read()
RC = re.findall(r'P\.append\(\("(.*?)", \[', src, re.S)
TEXTS = RC + NEW
SENTS = []
for t in TEXTS:
    ss = [x.strip() for x in re.split(r'(?<=[.!?])\s+', t.strip()) if x.strip()]
    SENTS.append(ss[:4])


def other_sent(i, n):
    for k in range(1, len(SENTS) + 1):
        cand = SENTS[(i + k) % len(SENTS)]
        if len(cand) > n:
            return cand[n]
    return "None of these"


rows = []
for i, s in enumerate(SENTS):
    if len(s) < 3:
        continue
    if len(s) >= 4:
        order = [2, 0, 3, 1]
        labels = {chr(65 + j): s[order[j]] for j in range(4)}
        correct_seq = "C, A, D, B"
        wrong = ["A, B, C, D", "B, D, A, C", "D, C, B, A"]
        last_i = 3
    else:
        order = [1, 2, 0]
        labels = {chr(65 + j): s[order[j]] for j in range(3)}
        correct_seq = "C, A, B"
        wrong = ["A, B, C", "B, C, A", "A, C, B"]
        last_i = 2
    labelled = " ".join(f"({k}) {v}" for k, v in labels.items())
    rows.append({
        "stem": f"Arrange the sentences in the correct order: {labelled}",
        "stem_as": f"বাক্যবোৰ শুদ্ধ ক্ৰমত সজোৱা: {labelled}",
        "correct": (correct_seq, correct_seq),
        "dists": [(w, w) for w in wrong],
        "exp_en": f"The correct order is {correct_seq}.",
        "exp_as": f"শুদ্ধ ক্ৰম {correct_seq}।",
    })
    o1 = other_sent(i, 0)
    o2 = other_sent(i, 1)
    d_first = [x for x in (s[1], s[last_i], o1) if x != s[0]][:3]
    while len(d_first) < 3:
        d_first.append(other_sent(i, len(d_first) + 2))
    rows.append({
        "stem": "Which sentence comes first in the paragraph? " + " ".join(s),
        "stem_as": "অনুচ্ছেদত প্ৰথম বাক্য কোনটো? " + " ".join(s),
        "correct": (s[0], s[0]),
        "dists": [(x, x) for x in d_first],
        "exp_en": f"'{s[0]}' is the opening sentence.",
        "exp_as": f"'{s[0]}' আৰম্ভণিৰ বাক্য।",
    })
    d_last = [x for x in (s[0], s[1], o2) if x != s[last_i]][:3]
    while len(d_last) < 3:
        d_last.append(other_sent(i, len(d_last) + 2))
    rows.append({
        "stem": "Which sentence comes last in the paragraph? " + " ".join(s),
        "stem_as": "অনুচ্ছেদত শেষ বাক্য কোনটো? " + " ".join(s),
        "correct": (s[last_i], s[last_i]),
        "dists": [(x, x) for x in d_last],
        "exp_en": f"'{s[last_i]}' is the closing sentence.",
        "exp_as": f"'{s[last_i]}' শেষ বাক্য।",
    })
    d_after = [x for x in (s[2], o1, o2) if x != s[1]][:3]
    while len(d_after) < 3:
        d_after.append(other_sent(i, len(d_after) + 1))
    rows.append({
        "stem": f"Which sentence comes immediately after this sentence? '{s[0]}'",
        "stem_as": f"এই বাক্যৰ ঠিক পিছত কোন বাক্য আহে? '{s[0]}'",
        "correct": (s[1], s[1]),
        "dists": [(x, x) for x in d_after],
        "exp_en": f"'{s[1]}' follows '{s[0]}'.",
        "exp_as": f"'{s[0]}' ৰ পিছত '{s[1]}' আহে।",
    })
    rows.append({
        "stem": "Which pair of sentences is in the correct order? " + " ".join(s),
        "stem_as": "কোন যোৰ বাক্য শুদ্ধ ক্ৰমত আছে? " + " ".join(s),
        "correct": (f"{s[0]} -> {s[1]}", f"{s[0]} -> {s[1]}"),
        "dists": [(f"{s[1]} -> {s[0]}", f"{s[1]} -> {s[0]}"),
                  (f"{s[last_i]} -> {s[0]}", f"{s[last_i]} -> {s[0]}"),
                  (f"{o1} -> {o2}", f"{o1} -> {o2}")],
        "exp_en": f"'{s[0]}' comes before '{s[1]}'.",
        "exp_as": f"'{s[0]}' '{s[1]}' ৰ আগত আহে।",
    })

append("paragraph-ordering", rows)
