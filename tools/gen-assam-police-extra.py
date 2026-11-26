#!/usr/bin/env python3
"""Generate the dedicated question bank for the extra (harder) Assam Police
Constable AB & UB full-paper mock sets (Sets 6-10).

The first five Assam Police full-paper sets draw from data/exams/assam-police.
The five extra sets must not repeat any question already used on the site, so
they draw only from their own bank written here:

    data/exam-mock-sets/extra/assam-police/<section>/question-001.json

Every question is authored fresh (English + Assamese); nothing is copied from
the existing banks. Options are rotated with a seeded LCG so no option position
holds a disproportionate share of the answer keys, the convention used by
tools/build-history-questions.js and tools/gen-assam-freedom-fighters.py.

Each section's topics are interleaved round-robin before writing, so the extra
sets (dealt round-robin from this bank) span every topic of the section.

Section sizes match the Assam Police blueprint (100 per set):
    assam-history-geography-culture   25
    general-knowledge-current-affairs 25
    elementary-mathematics            20
    logical-reasoning                 15
    general-english                   15

Regenerate with:

    python3 tools/gen-assam-police-extra.py
"""
from apx import common
from apx import assam_history, assam_geo_culture, gk1, gk2, gk3
from apx import math as math1, math2, math3, reasoning, english
from apx.fixups import FIXUPS
from apx import fixups2, fixups3

for _old, _en, _as, _opts, _correct, _ex_en, _ex_as in fixups2.ROWS:
    FIXUPS[_old] = (_en, _as, _opts, _correct, _ex_en, _ex_as)

# fixups3 rows key on the *replacement* text produced by the earlier passes, so
# map that text back to its original key before overriding.
_BY_TEXT = {v[0]: k for k, v in FIXUPS.items()}
for _prev, _en, _as, _opts, _correct, _ex_en, _ex_as in fixups3.ROWS:
    _key = _BY_TEXT.get(_prev, _prev)
    FIXUPS[_key] = (_en, _as, _opts, _correct, _ex_en, _ex_as)


def apply_fixups(rows):
    """Swap any row whose English text duplicates a question used elsewhere on
    the site for the replacement authored in apx/fixups.py."""
    out = []
    for r in rows:
        fix = FIXUPS.get(r["en"])
        if fix:
            en, as_, opts, correct, ex_en, ex_as = fix
            r = common.R(en, as_, opts, correct, ex_en, ex_as)
        out.append(r)
    return out

SECTIONS = [
    ("assam-history-geography-culture",
     [assam_history.rows, assam_geo_culture.rows], "apx-hgc"),
    ("general-knowledge-current-affairs",
     [gk1.rows, gk2.rows2, gk3.rows3], "apx-gk"),
    ("elementary-mathematics",
     [math1.rows, math2.rows2, math3.rows3], "apx-math"),
    ("logical-reasoning", [reasoning.rows], "apx-reasoning"),
    ("general-english", [english.rows], "apx-english"),
]


def main():
    total = 0
    for section, builders, seed in SECTIONS:
        rows = common.interleave([(b.__name__, b()) for b in builders])
        rows = apply_fixups(rows)
        n = common.emit(section, rows, seed)
        total += n
        print(f"{section}: {n}")
    print(f"total: {total}")


if __name__ == "__main__":
    main()

