#!/usr/bin/env python3
"""Mathematical Operations: 80+ very hard bilingual questions."""

import sys
from fractions import Fraction as F
sys.path.insert(0, "tools")
from verbal_bank import append, as_num, opts

rows = []
SYM = {"+": "+", "-": "-", "*": "*", "/": "/"}
DISP = {"+": "+", "-": "−", "*": "×", "/": "÷"}
WORDS = {"+": "plus", "-": "minus", "*": "multiplied by", "/": "divided by"}
WORDS_AS = {"+": "যোগ", "-": "বিয়োগ", "*": "গুণ", "/": "হৰণ"}


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def evaluate(nums, ops, mapping):
    expr = str(nums[0])
    for op, n in zip(ops, nums[1:]):
        expr += mapping[op] + str(n)
    val = eval(expr)
    return F(val).limit_denominator(1000)


MAPPINGS = [
    {"+": "*", "-": "/", "*": "+", "/": "-"},
    {"+": "/", "-": "*", "*": "-", "/": "+"},
    {"+": "-", "-": "*", "*": "/", "/": "+"},
    {"+": "*", "-": "+", "*": "/", "/": "-"},
]

EXPRS = [
    ([12, 6, 3, 2], ["+", "-", "*"]),
    ([18, 3, 4, 2], ["+", "-", "*"]),
    ([24, 8, 2, 5], ["-", "+", "*"]),
    ([15, 5, 3, 2], ["+", "/", "-"]),
    ([9, 3, 6, 2], ["*", "+", "-"]),
    ([20, 4, 2, 3], ["/", "*", "+"]),
    ([16, 4, 3, 2], ["-", "/", "+"]),
    ([10, 5, 2, 3], ["+", "*", "-"]),
    ([36, 6, 2, 4], ["/", "-", "*"]),
    ([14, 7, 2, 5], ["-", "+", "/"]),
    ([8, 4, 2, 6], ["*", "-", "/"]),
    ([25, 5, 3, 2], ["/", "+", "*"]),
    ([21, 3, 4, 2], ["-", "*", "+"]),
    ([30, 5, 2, 3], ["/", "*", "-"]),
    ([11, 3, 2, 4], ["+", "-", "*"]),
]

seen = set()
for mapping in MAPPINGS:
    for nums, ops in EXPRS:
        try:
            val = evaluate(nums, ops, mapping)
        except ZeroDivisionError:
            continue
        if val.denominator != 1 or val <= 0:
            continue
        v = int(val)
        desc_en = ", ".join(f"'{DISP[o]}' means '{WORDS[mapping[o]]}'" for o in ["+", "-", "*", "/"])
        desc_as = ", ".join(f"'{DISP[o]}' অৰ্থাৎ '{WORDS_AS[mapping[o]]}'" for o in ["+", "-", "*", "/"])
        stem = f"If {desc_en}, then find the value of {str(nums[0]) + ''.join(DISP[o] + str(n) for o, n in zip(ops, nums[1:]))}."
        if stem in seen:
            continue
        seen.add(stem)
        expr_disp = str(nums[0]) + "".join(DISP[o] + str(n) for o, n in zip(ops, nums[1:]))
        add(stem,
            f"যদি {desc_as}, তেন্তে {str(nums[0]) + ''.join(DISP[o] + str(n) for o, n in zip(ops, nums[1:]))} ৰ মান নিৰ্ণয় কৰা।",
            v, [v + 2, v - 2, v * 2, v + 5],
            f"After replacing the symbols the expression becomes {str(nums[0]) + ''.join(mapping[o] + str(n) for o, n in zip(ops, nums[1:]))} = {v}.",
            f"সংকেত সলনি কৰিলে পোৱা যায় {v}।")

# extra symbol substitutions
MORE_MAPS = [
    {"+": "-", "-": "/", "*": "*", "/": "+"},
    {"+": "*", "-": "-", "*": "/", "/": "+"},
    {"+": "+", "-": "/", "*": "-", "/": "*"},
]
MORE_EXPRS = [
    ([28, 7, 4, 3], ["-", "+", "*"]),
    ([40, 8, 5, 2], ["/", "-", "+"]),
    ([13, 4, 3, 2], ["+", "*", "-"]),
    ([27, 9, 3, 5], ["-", "/", "+"]),
    ([32, 4, 2, 6], ["/", "*", "+"]),
    ([17, 5, 3, 2], ["-", "+", "*"]),
    ([22, 11, 2, 4], ["+", "/", "-"]),
    ([45, 9, 5, 3], ["-", "*", "+"]),
    ([19, 4, 2, 3], ["+", "-", "/"]),
    ([35, 7, 5, 2], ["/", "+", "*"]),
]
for mapping in MORE_MAPS:
    for nums, ops in MORE_EXPRS:
        try:
            val = evaluate(nums, ops, mapping)
        except ZeroDivisionError:
            continue
        if val.denominator != 1 or val <= 0:
            continue
        v = int(val)
        desc_en = ", ".join(f"'{DISP[o]}' means '{WORDS[mapping[o]]}'" for o in ["+", "-", "*", "/"])
        desc_as = ", ".join(f"'{DISP[o]}' অৰ্থাৎ '{WORDS_AS[mapping[o]]}'" for o in ["+", "-", "*", "/"])
        expr_disp = str(nums[0]) + "".join(DISP[o] + str(n) for o, n in zip(ops, nums[1:]))
        stem = f"If {desc_en}, then find the value of {expr_disp}."
        if stem in seen:
            continue
        seen.add(stem)
        add(stem,
            f"যদি {desc_as}, তেন্তে {expr_disp} ৰ মান নিৰ্ণয় কৰা।",
            v, [v + 2, v - 2, v * 2, v + 5],
            f"Substituting the symbols gives {v}.",
            f"সংকেত সলনি কৰিলে পোৱা যায় {as_num(v)}।")

# custom operation definitions
FUNCS = [
    ("a # b = a² - b²", lambda a, b: a * a - b * b, "a² - b²", "a² − b²"),
    ("a # b = a × b + a", lambda a, b: a * b + a, "a×b + a", "a×b + a"),
    ("a # b = (a + b) × 2", lambda a, b: (a + b) * 2, "(a+b)×2", "(a+b)×২"),
    ("a # b = a² + b", lambda a, b: a * a + b, "a² + b", "a² + b"),
    ("a # b = a × (a + b)", lambda a, b: a * (a + b), "a(a+b)", "a(a+b)"),
    ("a # b = 2a + 3b", lambda a, b: 2 * a + 3 * b, "2a + 3b", "২a + ৩b"),
    ("a # b = a² - a × b", lambda a, b: a * a - a * b, "a² - ab", "a² − ab"),
    ("a # b = (a - b)²", lambda a, b: (a - b) ** 2, "(a-b)²", "(a−b)²"),
]
PAIRS = [(7, 4), (9, 3), (8, 5), (6, 2), (11, 4), (10, 6), (12, 5), (5, 3)]
for formula, fn, formula_en, formula_as in FUNCS:
    for a, b in PAIRS:
        v = fn(a, b)
        if v <= 0:
            continue
        add(f"If {formula}, find the value of {a} # {b}.",
            f"যদি {formula}, তেন্তে {as_num(a)} # {as_num(b)} ৰ মান নিৰ্ণয় কৰা।",
            v, [v + 2, v - 2, v + 5, v * 2],
            f"{a} # {b} = {formula_en.replace('a', str(a)).replace('b', str(b))} = {v}.",
            f"{as_num(a)} # {as_num(b)} = {formula_as.replace('a', as_num(a)).replace('b', as_num(b))} = {as_num(v)}।")

append("mathematical-operations", rows)
