#!/usr/bin/env python3
"""Generate the dedicated question bank for the extra DHS & DME (Non-Technical)
full-paper mock sets (Sets 6-10).

The first five DHS & DME full-paper sets draw from data/exams/dhs-dme. The five
extra sets must not repeat any question already used on the site, so they draw
only from their own bank written here:

    data/exam-mock-sets/extra/dhs-dme/<section>/question-001.json

Every question is authored fresh (English + Assamese); nothing is copied from
the existing banks. Options are rotated with a seeded shuffle so no option
position holds a disproportionate share of the answer keys.

Section sizes match the DHS & DME blueprint (100 per set):
    general-knowledge      32
    elementary-mathematics 22
    logical-reasoning      17
    general-english        17
    computer-knowledge     12

Regenerate with:

    python3 tools/gen-dhs-dme-extra.py
"""
from dtn import common
from dtn import gk1, gk2
from dtn import math as math1
from dtn import reasoning, english, computer
from dtn.reword import apply_reword

SECTIONS = [
    ("general-knowledge", [gk1.rows, gk2.rows], "dtn-gk"),
    ("elementary-mathematics", [math1.rows], "dtn-math"),
    ("logical-reasoning", [reasoning.rows], "dtn-reasoning"),
    ("general-english", [english.rows], "dtn-english"),
    ("computer-knowledge", [computer.rows], "dtn-computer"),
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
