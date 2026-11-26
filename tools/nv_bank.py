#!/usr/bin/env python3
"""Writer for the generated non-verbal reasoning bank (figure questions)."""

import hashlib
import json
import re

BANK = "tools/legacy-banks/dhs-dme-technical/logical-reasoning/non-verbal-reasoning/question-001.json"
SLOTS = [0, 1, 2, 3, 2, 1, 0, 3, 1, 2, 3, 0]


def norm(s):
    return re.sub(r"[^a-z0-9]+", " ", str(s).lower()).strip()


def has_fig(q):
    if str(q.get("fig") or "").strip():
        return True
    return any(str(o.get("fig") or "").strip()
               for o in (q.get("options") or []) if isinstance(o, dict))


def order_leaf(bank, leaf):
    """Figure questions first, text-only (definition) questions last."""
    idx = [i for i, q in enumerate(bank) if q.get("leaf") == leaf]
    if not idx:
        return bank
    items = [bank[i] for i in idx]
    ordered = [q for q in items if has_fig(q)] + [q for q in items if not has_fig(q)]
    for i, q in zip(idx, ordered):
        bank[i] = q
    return bank


def append_nv(leaf, rows):
    """Rows: stem, stem_as, fig, options[(en, as, fig)], correct, exp_en, exp_as."""
    bank = json.load(open(BANK))
    prefix = f"nv-{leaf}-"
    bank = [q for q in bank if not str(q.get("id", "")).startswith(prefix)]
    def key_of(stem, fig, options):
        parts = []
        for o in (options or []):
            parts.append(str(o.get("fig", "")) if isinstance(o, dict) else str(o[2] if len(o) > 2 else o))
        sig = str(fig) + "".join(parts)
        return norm(stem) + "|" + hashlib.md5(sig.encode()).hexdigest()

    seen = {key_of(q["q"]["en"], q.get("fig", ""), q.get("options")) for q in bank}
    out = []
    n = 0
    for r in rows:
        key = key_of(r["stem"], r.get("fig", ""), r["options"])
        if key in seen:
            continue
        seen.add(key)
        n += 1
        slot = SLOTS[n % len(SLOTS)]
        opts = list(r["options"])
        picked = opts.pop(r["correct"])
        opts.insert(slot, picked)
        out.append({
            "id": f"{prefix}{n:03d}",
            "leaf": leaf,
            "q": {"en": r["stem"], "as": r["stem_as"]},
            "fig": r.get("fig", ""),
            "options": [{"en": en, "as": as_, "fig": fig} for en, as_, fig in opts],
            "correct": slot,
            "explanation": {"en": r["exp_en"], "as": r["exp_as"]},
        })
    bank.extend(out)
    bank = order_leaf(bank, leaf)
    json.dump(bank, open(BANK, "w"), ensure_ascii=False, indent=2)
    print(f"{leaf}: added {len(out)} (bank {len(bank)})")
    return len(out)
