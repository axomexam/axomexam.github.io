#!/usr/bin/env python3
"""Number Series: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def seqq(terms, nxt, exp_en, exp_as):
    add(f"Find the next term: {', '.join(map(str, terms))}, ?",
        f"পৰৱৰ্তী পদ নিৰ্ণয় কৰা: {', '.join(as_num(t) for t in terms)}, ?",
        nxt, [nxt + 2, nxt - 2, nxt + 5, nxt * 2],
        exp_en, exp_as)


# 1. arithmetic
for start, d in [(5, 7), (8, 9), (12, 11), (3, 13), (20, 15), (7, 6), (15, 12), (9, 17), (25, 8), (11, 14)]:
    terms = [start + i * d for i in range(5)]
    seqq(terms, terms[-1] + d,
         f"Each term increases by {d}: {terms[-1]} + {d} = {terms[-1]+d}.",
         f"প্ৰতিটো পদ {as_num(d)} ৰে বাঢ়ে: {as_num(terms[-1]+d)}।")

# 2. geometric
for start, r in [(3, 3), (2, 4), (5, 2), (4, 3), (6, 2), (7, 3), (2, 5), (9, 2), (3, 4), (8, 3)]:
    terms = [start * r ** i for i in range(4)]
    seqq(terms, terms[-1] * r,
         f"Each term is multiplied by {r}: {terms[-1]} × {r} = {terms[-1]*r}.",
         f"প্ৰতিটো পদ {as_num(r)} ৰে গুণ হয়: {as_num(terms[-1]*r)}।")

# 3. squares
for n0 in [2, 3, 4, 5, 6, 7, 8, 9]:
    terms = [n * n for n in range(n0, n0 + 4)]
    seqq(terms, (n0 + 4) ** 2,
         f"The terms are squares of consecutive numbers; the next is {n0+4}² = {(n0+4)**2}.",
         f"পদবোৰ ক্ৰমিক সংখ্যাৰ বৰ্গ; পৰৱৰ্তী {(n0+4)}² = {as_num((n0+4)**2)}।")

# 4. cubes
for n0 in [1, 2, 3, 4, 5, 6, 7, 8]:
    terms = [n ** 3 for n in range(n0, n0 + 3)]
    seqq(terms, (n0 + 3) ** 3,
         f"The terms are cubes of consecutive numbers; the next is {n0+3}³ = {(n0+3)**3}.",
         f"পদবোৰ ঘন সংখ্যা; পৰৱৰ্তী {as_num((n0+3)**3)}।")

# 5. n^2 + 1
for n0 in [1, 2, 3, 4, 5, 6, 7, 8]:
    terms = [n * n + 1 for n in range(n0, n0 + 4)]
    seqq(terms, (n0 + 4) ** 2 + 1,
         f"The pattern is n² + 1; the next is {n0+4}² + 1 = {(n0+4)**2+1}.",
         f"নিয়ম n² + ১; পৰৱৰ্তী {as_num((n0+4)**2+1)}।")

# 6. triangular numbers
for n0 in [1, 2, 3, 4, 5, 6, 7, 8]:
    terms = [n * (n + 1) // 2 for n in range(n0, n0 + 4)]
    seqq(terms, (n0 + 4) * (n0 + 5) // 2,
         f"The differences increase by 1 each time (triangular numbers); the next is {(n0+4)*(n0+5)//2}.",
         f"পাৰ্থক্য ১ ৰে বাঢ়ে (ত্ৰিভুজীয় সংখ্যা); পৰৱৰ্তী {as_num((n0+4)*(n0+5)//2)}।")

# 7. alternating +a, -b
for start, a, b in [(10, 7, 3), (20, 9, 4), (15, 11, 5), (30, 8, 6), (25, 13, 7), (12, 10, 4), (18, 12, 5), (40, 9, 8)]:
    t = start
    terms = [t]
    for i in range(4):
        t = t + a if i % 2 == 0 else t - b
        terms.append(t)
    nxt = t + a
    seqq(terms, nxt,
         f"The pattern alternates +{a} and -{b}; after {terms[-1]} the next step is +{a} = {nxt}.",
         f"নিয়ম +{as_num(a)} আৰু -{as_num(b)} ৰ পুনৰাবৃত্তি; পৰৱৰ্তী {as_num(nxt)}।")

# 8. Fibonacci-like
for a, b in [(2, 3), (3, 4), (1, 5), (4, 6), (2, 7), (5, 6), (3, 8), (6, 7)]:
    terms = [a, b]
    for _ in range(3):
        terms.append(terms[-1] + terms[-2])
    nxt = terms[-1] + terms[-2]
    seqq(terms, nxt,
         f"Each term is the sum of the previous two: {terms[-1]} + {terms[-2]} = {nxt}.",
         f"প্ৰতিটো পদ পূৰ্বৰ দুটাৰ যোগফল: {as_num(nxt)}।")

# 9. x2 + 1
for start in [2, 3, 4, 5, 6, 7]:
    terms = [start]
    for _ in range(3):
        terms.append(terms[-1] * 2 + 1)
    nxt = terms[-1] * 2 + 1
    seqq(terms, nxt,
         f"The rule is ×2 + 1: {terms[-1]} × 2 + 1 = {nxt}.",
         f"নিয়ম ×২ + ১: {as_num(nxt)}।")

# 10. primes
PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53]
for i in range(6):
    terms = PRIMES[i:i+4]
    seqq(terms, PRIMES[i+4],
         f"The terms are consecutive prime numbers; the next prime is {PRIMES[i+4]}.",
         f"পদবোৰ ক্ৰমিক মৌলিক সংখ্যা; পৰৱৰ্তী {as_num(PRIMES[i+4])}।")

# 11. n^2 - 1
for n0 in [2, 3, 4, 5, 6, 7]:
    terms = [n * n - 1 for n in range(n0, n0 + 4)]
    seqq(terms, (n0 + 4) ** 2 - 1,
         f"The pattern is n² - 1; the next is {n0+4}² - 1 = {(n0+4)**2-1}.",
         f"নিয়ম n² - ১; পৰৱৰ্তী {as_num((n0+4)**2-1)}।")

# 12. n(n+1)
for n0 in [1, 2, 3, 4, 5, 6]:
    terms = [n * (n + 1) for n in range(n0, n0 + 4)]
    seqq(terms, (n0 + 4) * (n0 + 5),
         f"The pattern is n(n+1); the next is {n0+4} × {n0+5} = {(n0+4)*(n0+5)}.",
         f"নিয়ম n(n+১); পৰৱৰ্তী {as_num((n0+4)*(n0+5))}।")

append("number-series", rows)
