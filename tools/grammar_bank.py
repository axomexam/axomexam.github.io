#!/usr/bin/env python3
"""Shared writer for generated General English grammar questions."""

import json
import re

BANK = "tools/legacy-banks/dhs-dme-technical/general-english/grammar/question-001.json"
SLOTS = [0, 1, 2, 3, 2, 1, 0, 3, 1, 2, 3, 0]


def norm(s):
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()


def append(leaf, rows):
    """rows: list of dicts with stem, correct, dists, exp_en, exp_as."""
    bank = json.load(open(BANK))
    prefix = f"gram-{leaf}-"
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
        opts = [r["correct"]] + list(r["dists"])
        picked = opts.pop(0)
        opts.insert(slot, picked)
        out.append({
            "id": f"{prefix}{n:03d}",
            "leaf": leaf,
            "q": {"en": r["stem"], "as": r["stem_as"]},
            "options": [{"en": e, "as": a} for e, a in opts],
            "correct": slot,
            "explanation": {"en": r["exp_en"], "as": r["exp_as"]},
        })
    bank.extend(out)
    json.dump(bank, open(BANK, "w"), ensure_ascii=False, indent=2)
    print(f"{leaf}: added {len(out)} (bank {len(bank)})")
    return len(out)
