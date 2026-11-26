#!/usr/bin/env python3
"""Syllogism: 80+ very hard bilingual questions (model-checked)."""

import itertools
import sys
sys.path.insert(0, "tools")
from verbal_bank import append_bi

rows = []


def add(en, as_, correct, correct_as, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_, "correct": correct, "correct_as": correct_as,
                 "dists": list(cands), "exp_en": exp_en, "exp_as": exp_as})
ATTRS = ["A", "B", "C"]
REGIONS = []
for r in range(1, 4):
    for combo in itertools.combinations(ATTRS, r):
        REGIONS.append(frozenset(combo))
MODELS = []
for mask in range(1, 1 << len(REGIONS)):
    m = [REGIONS[i] for i in range(len(REGIONS)) if mask >> i & 1]
    # exam convention: every class mentioned is non-empty (existential import)
    if all(any(t in e for e in m) for t in ATTRS):
        MODELS.append(m)


def holds(pred, model):
    kind, x, y = pred
    if kind == "all":
        return all((y in e) for e in model if x in e)
    if kind == "some":
        return any(x in e and y in e for e in model)
    if kind == "no":
        return not any(x in e and y in e for e in model)
    if kind == "some_not":
        return any(x in e and y not in e for e in model)
    return False


def valid(premises, concl):
    for m in MODELS:
        if all(holds(p, m) for p in premises) and not holds(concl, m):
            return False
    return True


def text(pred, lang="en"):
    kind, x, y = pred
    if lang == "en":
        return {"all": f"All {x} are {y}", "some": f"Some {x} are {y}",
                "no": f"No {x} is {y}", "some_not": f"Some {x} are not {y}"}[kind]
    return {"all": f"সকলো {x} {y}", "some": f"কিছু {x} {y}",
            "no": f"কোনো {x} {y} নহয়", "some_not": f"কিছু {x} {y} নহয়"}[kind]


PREMISE_SETS = [
    [("all", "A", "B"), ("all", "B", "C")],
    [("all", "A", "B"), ("some", "B", "C")],
    [("all", "A", "B"), ("no", "B", "C")],
    [("some", "A", "B"), ("all", "B", "C")],
    [("no", "A", "B"), ("all", "C", "B")],
    [("all", "B", "A"), ("all", "C", "B")],
    [("some", "A", "B"), ("no", "B", "C")],
    [("all", "A", "B"), ("some", "C", "B")],
    [("no", "A", "B"), ("some", "C", "B")],
    [("all", "B", "A"), ("no", "C", "B")],
    [("all", "A", "B"), ("some", "A", "C")],
    [("some", "A", "B"), ("all", "A", "C")],
    [("some", "A", "B"), ("all", "B", "C")],
    [("all", "A", "B"), ("no", "C", "B")],
    [("no", "A", "B"), ("all", "C", "A")],
    [("some", "A", "B"), ("no", "C", "B")],
    [("all", "A", "B"), ("all", "C", "A")],
    [("some", "B", "A"), ("all", "C", "B")],
]

CONCL_PAIRS = [
    (("all", "A", "C"), ("some", "A", "C")),
    (("some", "A", "C"), ("all", "A", "C")),
    (("no", "A", "C"), ("some", "A", "C")),
    (("some", "A", "C"), ("some", "C", "A")),
    (("all", "C", "A"), ("some", "C", "A")),
    (("no", "C", "A"), ("no", "A", "C")),
    (("some_not", "A", "C"), ("some", "A", "C")),
    (("all", "A", "C"), ("no", "A", "C")),
    (("no", "A", "C"), ("some", "C", "A")),
    (("some", "A", "C"), ("no", "C", "A")),
    (("all", "C", "B"), ("some", "C", "B")),
    (("no", "C", "B"), ("some", "B", "C")),
    (("some_not", "A", "C"), ("all", "A", "B")),
]

OPTS = [("Only conclusion I follows", "কেৱল সিদ্ধান্ত I অনুসৰণ কৰে"),
        ("Only conclusion II follows", "কেৱল সিদ্ধান্ত II অনুসৰণ কৰে"),
        ("Both conclusions follow", "দুয়োটা সিদ্ধান্ত অনুসৰণ কৰে"),
        ("Neither conclusion follows", "কোনো সিদ্ধান্তই অনুসৰণ নকৰে")]

cands_all = []
for premises in PREMISE_SETS:
    for c1, c2 in CONCL_PAIRS:
        v1 = valid(premises, c1)
        v2 = valid(premises, c2)
        idx = 2 if (v1 and v2) else 0 if v1 else 1 if v2 else 3
        st_en = "; ".join(text(p, "en") for p in premises) + "."
        st_as = "; ".join(text(p, "as") for p in premises) + "।"
        add_en = f"Statements: {st_en} Conclusions: I. {text(c1,'en')}. II. {text(c2,'en')}."
        add_as = f"বিবৃতি: {st_as} সিদ্ধান্ত: I. {text(c1,'as')}। II. {text(c2,'as')}।"
        cands_all.append((idx, add_en, add_as, OPTS[idx][0], OPTS[idx][1], [o for o in OPTS if o[0] != OPTS[idx][0]],
            f"{'Conclusion I follows' if v1 else 'Conclusion I does not follow'}; "
            f"{'conclusion II follows' if v2 else 'conclusion II does not follow'}. Hence: {OPTS[idx][0]}.",
            f"{'সিদ্ধান্ত I অনুসৰণ কৰে' if v1 else 'সিদ্ধান্ত I অনুসৰণ নকৰে'}; "
            f"{'সিদ্ধান্ত II অনুসৰণ কৰে' if v2 else 'সিদ্ধান্ত II অনুসৰণ নকৰে'}। সেয়ে: {OPTS[idx][1]}।"))
        pass

valid_items = [c for c in cands_all if c[0] != 3]
neither = [c for c in cands_all if c[0] == 3][:20]
selected = valid_items[:70] + neither
for idx, add_en, add_as, corr, corr_as, dists, exp_en, exp_as in selected:
    add(add_en, add_as, corr, corr_as, dists, exp_en, exp_as)

append_bi("syllogism", rows)

