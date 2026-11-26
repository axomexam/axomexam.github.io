#!/usr/bin/env python3
"""Inequality: 80+ very hard bilingual questions."""

import random
import sys
sys.path.insert(0, "tools")
from verbal_bank import append_bi

rows = []
random.seed(11)


def add(en, as_, correct, correct_as, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_, "correct": correct, "correct_as": correct_as,
                 "dists": list(cands), "exp_en": exp_en, "exp_as": exp_as})


OPTS = [("Only conclusion I follows", "কেৱল সিদ্ধান্ত I অনুসৰণ কৰে"),
        ("Only conclusion II follows", "কেৱল সিদ্ধান্ত II অনুসৰণ কৰে"),
        ("Both conclusions follow", "দুয়োটা সিদ্ধান্ত অনুসৰণ কৰে"),
        ("Neither conclusion follows", "কোনো সিদ্ধান্তই অনুসৰণ নকৰে")]

SYM = {">": ">", "<": "<", ">=": "≥", "<=": "≤", "=": "="}
OPP = {">": "<", "<": ">", ">=": "<=", "<=": ">=", "=": "="}


def build(nodes, chain):
    """Return reach[i][j] = 0 none, 1 non-strict, 2 strict."""
    idx = {c: i for i, c in enumerate(nodes)}
    n = len(nodes)
    reach = [[0] * n for _ in range(n)]
    for i in range(n):
        reach[i][i] = 1
    for (a, op, b) in chain:
        i, j = idx[a], idx[b]
        if op == ">":
            reach[j][i] = max(reach[j][i], 2)
        elif op == ">=":
            reach[j][i] = max(reach[j][i], 1)
        elif op == "<":
            reach[i][j] = max(reach[i][j], 2)
        elif op == "<=":
            reach[i][j] = max(reach[i][j], 1)
        elif op == "=":
            reach[i][j] = max(reach[i][j], 1)
            reach[j][i] = max(reach[j][i], 1)
    for k in range(n):
        for i in range(n):
            if reach[i][k]:
                for j in range(n):
                    if reach[k][j]:
                        val = 2 if (reach[i][k] == 2 or reach[k][j] == 2) else 1
                        reach[i][j] = max(reach[i][j], val)
    return idx, reach


def follows(nodes, chain, x, op, y):
    idx, reach = build(nodes, chain)
    i, j = idx[x], idx[y]
    if op == ">":
        return reach[j][i] == 2
    if op == ">=":
        return reach[j][i] >= 1
    if op == "<":
        return reach[i][j] == 2
    if op == "<=":
        return reach[i][j] >= 1
    if op == "=":
        return reach[i][j] >= 1 and reach[j][i] >= 1
    return False


LETTERS = "PQRSTUVWXYZ"


def make_chain():
    n = random.choice([4, 5])
    letters = random.sample(LETTERS, n)
    ops = [random.choice([">", "<", ">=", "<=", "="]) for _ in range(n - 1)]
    chain = [(letters[i], ops[i], letters[i + 1]) for i in range(n - 1)]
    return letters, chain


def chain_text(chain):
    s = chain[0][0]
    for (a, op, b) in chain:
        s += f" {SYM[op]} {b}"
    return s


cands_all = []
while len(cands_all) < 400:
    letters, chain = make_chain()
    text = chain_text(chain)
    for _ in range(4):
        x, y = random.sample(letters, 2)
        op1 = random.choice([">", "<", ">=", "<=", "="])
        x2, y2 = random.sample(letters, 2)
        op2 = random.choice([">", "<", ">=", "<=", "="])
        if (x, op1, y) == (x2, op2, y2):
            continue
        v1 = follows(letters, chain, x, op1, y)
        v2 = follows(letters, chain, x2, op2, y2)
        idx = 2 if (v1 and v2) else 0 if v1 else 1 if v2 else 3
        stem = f"Statements: {text}. Conclusions: I. {x} {SYM[op1]} {y} II. {x2} {SYM[op2]} {y2}"
        cands_all.append((idx, stem, f"বিবৃতি: {text}। সিদ্ধান্ত: I. {x} {SYM[op1]} {y} II. {x2} {SYM[op2]} {y2}",
                          v1, v2))
        if len(cands_all) >= 400:
            break

seen = set()
valid = []
neither = []
for idx, stem, stem_as, v1, v2 in cands_all:
    if stem in seen:
        continue
    seen.add(stem)
    item = (idx, stem, stem_as, v1, v2)
    if idx == 3:
        neither.append(item)
    else:
        valid.append(item)

selected = valid[:62] + neither[:22]
random.shuffle(selected)
for idx, stem, stem_as, v1, v2 in selected:
    add(stem, stem_as, OPTS[idx][0], OPTS[idx][1],
        [o for o in OPTS if o[0] != OPTS[idx][0]],
        f"Conclusion I {'follows' if v1 else 'does not follow'}; conclusion II "
        f"{'follows' if v2 else 'does not follow'}. Hence: {OPTS[idx][0]}.",
        f"সিদ্ধান্ত I {'অনুসৰণ কৰে' if v1 else 'অনুসৰণ নকৰে'}; সিদ্ধান্ত II "
        f"{'অনুসৰণ কৰে' if v2 else 'অনুসৰণ নকৰে'}। সেয়ে: {OPTS[idx][1]}।")

append_bi("inequality", rows)
