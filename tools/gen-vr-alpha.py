#!/usr/bin/env python3
"""Alphabet & Alphanumeric Series: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append, as_num, opts

rows = []
ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


def pos(c):
    return ALPHA.index(c) + 1


def ch(n):
    return ALPHA[(n - 1) % 26]


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def seq(terms, nxt, exp_en, exp_as, gap_hint_en, gap_hint_as):
    add(f"Complete the series: {', '.join(terms)}, ?",
        f"শ্ৰেণী সম্পূৰ্ণ কৰা: {', '.join(terms)}, ?",
        nxt, [ch(pos(nxt) + 1), ch(pos(nxt) - 1), ch(pos(nxt) + 2), ch(pos(nxt) - 2)],
        exp_en, exp_as)


# 1. +k constant
for start, k in [(1, 3), (2, 4), (3, 5), (4, 6), (1, 5), (5, 3), (2, 6), (6, 4), (1, 7), (3, 4), (7, 5), (4, 3)]:
    terms = [ch(start + i * k) for i in range(5)]
    nxt = ch(start + 5 * k)
    seq(terms, nxt,
        f"Each letter moves {k} steps forward: {terms[-1]} + {k} = {nxt}.",
        f"প্ৰতিটো আখৰ {as_num(k)} পদ আগবাঢ়ে: {as_num(terms[-1])} + {as_num(k)} = {nxt}।", k, k)

# 2. +3 fixed
for start in [1, 2, 3, 4, 5, 6, 7, 8]:
    terms = [ch(start + i * 3) for i in range(5)]
    nxt = ch(start + 15)
    seq(terms, nxt,
        f"Each letter moves 3 steps forward, so the next is {nxt}.",
        f"প্ৰতিটো আখৰ ৩ পদ আগবাঢ়ে; পৰৱৰ্তী {nxt}।", 3, 3)

# 3. +4 fixed
for start in [1, 2, 3, 4, 5, 6, 7, 8]:
    terms = [ch(start + i * 4) for i in range(5)]
    nxt = ch(start + 20)
    seq(terms, nxt,
        f"Each letter moves 4 steps forward, so the next is {nxt}.",
        f"প্ৰতিটো আখৰ ৪ পদ আগবাঢ়ে; পৰৱৰ্তী {nxt}।", 4, 4)

# 4. reverse
for start in [26, 25, 24, 23, 22, 21, 20, 19]:
    terms = [ch(start - i * 2) for i in range(5)]
    nxt = ch(start - 10)
    seq(terms, nxt,
        f"The letters move 2 steps backward: {terms[-1]} - 2 = {nxt}.",
        f"আখৰবোৰ ২ পদ পিছলৈ যায়: {nxt}।", -2, -2)

# 5. skip one letter (every alternate)
for start in [1, 2, 3, 4, 5, 6, 7, 8]:
    terms = [ch(start + i * 2) for i in range(5)]
    nxt = ch(start + 10)
    seq(terms, nxt,
        f"Every alternate letter is used, so the next is {nxt}.",
        f"প্ৰতি দ্বিতীয় আখৰ লোৱা হৈছে; পৰৱৰ্তী {nxt}।", 2, 2)

# 6. increasing gaps
for start in [1, 2, 3, 4, 5, 6, 7, 8]:
    terms = [ch(start)]
    step = 1
    p = start
    for _ in range(4):
        p += step
        terms.append(ch(p))
        step += 1
    nxt = ch(p + step)
    seq(terms, nxt,
        f"The gaps increase by one each time (+1, +2, +3, +4, ...), so the next is {nxt}.",
        f"ব্যৱধান একেৰাহে বাঢ়ে (+১, +২, +৩, +৪, ...); পৰৱৰ্তী {nxt}।", 1, 1)

# 7. alternating +a, -b
for start, a, b in [(1, 3, 1), (2, 4, 2), (1, 5, 2), (3, 4, 1), (2, 5, 3), (1, 6, 2), (4, 3, 1), (2, 6, 3)]:
    terms = [ch(start)]
    p = start
    for i in range(4):
        p = p + a if i % 2 == 0 else p - b
        terms.append(ch(p))
    nxt = ch(p + a)
    seq(terms, nxt,
        f"The pattern alternates +{a} and -{b}, so the next is {terms[-1]} + {a} = {nxt}.",
        f"নিয়ম +{as_num(a)} আৰু -{as_num(b)} ৰ পুনৰাবৃত্তি; পৰৱৰ্তী {nxt}।", a, a)

# 8. alphanumeric
for start, num0, k in [(1, 1, 2), (1, 2, 2), (2, 1, 2), (1, 5, 3), (2, 3, 3), (1, 10, 5),
                       (3, 2, 2), (1, 4, 4), (2, 6, 2), (1, 7, 7), (4, 1, 3), (1, 3, 6)]:
    terms = [f"{ch(start + i * k)}{num0 + i * k}" for i in range(4)]
    nxt = f"{ch(start + 4 * k)}{num0 + 4 * k}"
    add(f"Complete the series: {', '.join(terms)}, ?",
        f"শ্ৰেণী সম্পূৰ্ণ কৰা: {', '.join(terms)}, ?",
        nxt, [f"{ch(start + 4 * k)}{num0 + 4 * k + 1}", f"{ch(start + 4 * k + 1)}{num0 + 4 * k}",
              f"{ch(start + 3 * k)}{num0 + 4 * k}", f"{ch(start + 5 * k)}{num0 + 5 * k}"],
        f"The letter moves {k} steps forward and the number increases by {k}: the next term is {nxt}.",
        f"আখৰ {as_num(k)} পদ আৰু সংখ্যা {as_num(k)} ৰে বাঢ়ে; পৰৱৰ্তী {nxt}।")

# 9. +5
for start in [1, 2, 3, 4, 5, 6, 7, 8]:
    terms = [ch(start + i * 5) for i in range(4)]
    nxt = ch(start + 20)
    seq(terms, nxt,
        f"Each letter moves 5 steps forward, so the next is {nxt}.",
        f"প্ৰতিটো আখৰ ৫ পদ আগবাঢ়ে; পৰৱৰ্তী {nxt}।", 5, 5)

# 10. +6
for start in [1, 2, 3, 4, 5, 6]:
    terms = [ch(start + i * 6) for i in range(4)]
    nxt = ch(start + 24)
    seq(terms, nxt,
        f"Each letter moves 6 steps forward, so the next is {nxt}.",
        f"প্ৰতিটো আখৰ ৬ পদ আগবাঢ়ে; পৰৱৰ্তী {nxt}।", 6, 6)

# extra
for start, k in [(10, 3), (11, 4), (9, 5), (12, 2), (8, 6), (13, 3), (7, 4), (14, 2)]:
    terms = [ch(start + i * k) for i in range(5)]
    nxt = ch(start + 5 * k)
    seq(terms, nxt,
        f"Each letter moves {k} steps forward, so the next is {nxt}.",
        f"প্ৰতিটো আখৰ {as_num(k)} পদ আগবাঢ়ে; পৰৱৰ্তী {nxt}।", k, k)

append("alphabet-series", rows)
