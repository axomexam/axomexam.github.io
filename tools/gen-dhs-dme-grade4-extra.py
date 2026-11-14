#!/usr/bin/env python3
"""Generate the dedicated question bank for the extra DHS & DME Grade IV
full-paper mock sets (Sets 6-10).

The first five DHS & DME Grade IV full-paper sets draw from
data/exams/dhs-dme-grade-4. The five extra sets must not repeat any question
already used on the site, so they draw only from their own bank written here:

    data/exam-mock-sets/extra/dhs-dme-grade-4/<section>/question-001.json

Every question is authored fresh (English + Assamese); nothing is copied from
the existing banks. Options are rotated with a seeded shuffle so no option
position holds a disproportionate share of the answer keys, the convention used
by tools/gen-dhs-dme-extra.py.

Section sizes match the DHS & DME Grade IV blueprint (50 per set):
    general-knowledge  22  (Assam history, Indian history, geography, culture)
    basic-mathematics  12
    general-english    16  (grammar + vocabulary)

The general-knowledge section interleaves its four topics round-robin, and the
general-english section interleaves grammar and vocabulary, so the extra sets
(dealt round-robin from this bank) span every topic of each section.

Regenerate with:

    python3 tools/gen-dhs-dme-grade4-extra.py
"""
from dhg4 import common
from dhg4 import gk_assam, gk_india, gk_geography, gk_culture
from dhg4 import math as math1
from dhg4 import english
from dhg4.reword import apply_reword

SECTIONS = [
    ("general-knowledge",
     [gk_assam.rows, gk_india.rows, gk_geography.rows, gk_culture.rows], "dhg4-gk"),
    ("basic-mathematics", [math1.rows], "dhg4-math"),
    ("general-english", [english.rows], "dhg4-english"),
]


def main():
    total = 0
    for section, builders, seed in SECTIONS:
        rows = common.interleave([(b.__name__, b()) for b in builders])
        apply_reword(rows)
        n = common.emit(section, rows, seed)
        total += n
        print(f"{section}: {n}")
    print(f"total: {total}")


if __name__ == "__main__":
    main()
