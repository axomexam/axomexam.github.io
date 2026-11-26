#!/usr/bin/env python3
"""Shared writer for generated Numerical Aptitude questions."""

import json
import re

BANK = "tools/legacy-banks/dhs-dme-technical/numerical-aptitude/data-combinatorics/question-001.json"
SLOTS = [0, 1, 2, 3, 2, 1, 0, 3, 1, 2, 3, 0]
AS_DIGITS = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")


def norm(s):
    return re.sub(r"[^a-z0-9]+", " ", str(s).lower()).strip()


def as_num(x):
    return str(x).translate(AS_DIGITS)


def opts(correct, cands, n=3):
    out = []
    for c in cands:
        if c != correct and c not in out:
            out.append(c)
        if len(out) == n:
            break
    k = 1
    while len(out) < n:
        if isinstance(correct, str):
            if ":" in correct:
                parts = correct.split(":")
                parts[0] = str(int(parts[0]) + k)
                v = ":".join(parts)
            else:
                v = correct + " " + str(k)
        else:
            v = correct + k if correct >= 0 else correct - k
        if v != correct and v not in out:
            out.append(v)
        k += 1
    return out


def append(leaf, rows):
    bank = json.load(open(BANK))
    prefix = f"num-{leaf}-"
    bank = [q for q in bank if not str(q.get("id", "")).startswith(prefix)]
    seen = {norm(q["q"]["en"]) for q in bank}
    out = []
    n = 0
    for r in rows:
        if norm(r["stem"]) in seen:
            continue
        seen.add(norm(r["stem"]))
        n += 1
        slot = SLOTS[n % len(SLOTS)]
        o = [r["correct"]] + list(r["dists"])
        picked = o.pop(0)
        o.insert(slot, picked)
        out.append({
            "id": f"{prefix}{n:03d}",
            "leaf": leaf,
            "q": {"en": r["stem"], "as": r["stem_as"]},
            "options": [{"en": str(v), "as": as_num(v)} for v in o],
            "correct": slot,
            "explanation": {"en": r["exp_en"], "as": r["exp_as"]},
        })
    bank.extend(out)
    json.dump(bank, open(BANK, "w"), ensure_ascii=False, indent=2)
    print(f"{leaf}: added {len(out)} (bank {len(bank)})")
    return len(out)
