#!/usr/bin/env python3
"""Generate the dedicated question bank for the extra DHS & DME Technical
Grade III full-paper mock sets (Sets 6-10).

The first five DHS & DME Technical full-paper sets draw from
data/exams/dhs-dme-technical. The five extra sets must not repeat any question
already used on the site, so they draw only from their own bank written here:

    data/exam-mock-sets/extra/dhs-dme-technical/<section>/question-001.json

Every question is authored fresh (English + Assamese); nothing is copied from
the existing banks. Options are rotated with a seeded shuffle so no option
position holds a disproportionate share of the answer keys, the convention used
by tools/gen-assam-police-extra.py.

Section sizes match the DHS & DME Technical blueprint (100 per set):
    technical-science   78
    general-knowledge   12
    general-english      5
    logical-reasoning    5

The technical-science section interleaves its biology, chemistry and physics
topics round-robin, so the extra sets (dealt round-robin from this bank) span
every topic of the section.

Regenerate with:

    python3 tools/gen-dhs-dme-technical-extra.py
"""
from dtx import common
from dtx import biology, chemistry, physics, gk, english, reasoning
from dtx.reword import apply_reword

SECTIONS = [
    ("technical-science",
     [biology.rows, chemistry.rows, physics.rows], "dtx-tech"),
    ("general-knowledge", [gk.rows], "dtx-gk"),
    ("general-english", [english.rows], "dtx-english"),
    ("logical-reasoning", [reasoning.rows], "dtx-reasoning"),
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
