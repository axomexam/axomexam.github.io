"""Shared helpers for tools/gen-dhs-dme-technical-extra.py."""
import json
import os
import random
import re

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "data", "exam-mock-sets", "extra", "dhs-dme-technical")

AS_DIGITS = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")


def asn(text):
    """Render every ASCII digit in a string as an Assamese digit."""
    return str(text).translate(AS_DIGITS)


def R(en, as_, opts, correct, ex_en, ex_as):
    """One authored row. opts is a list of (en, as) pairs."""
    return {
        "en": en,
        "as": as_,
        "opts": [{"en": o[0], "as": o[1]} for o in opts],
        "correct": correct,
        "ex_en": ex_en,
        "ex_as": ex_as,
    }


POSITIONAL = re.compile(r"\b(all|none|both|neither)\s+(of\s+)?(the\s+)?(above|these|them)\b", re.I)


def rotate(rows, seed):
    """Rotate each row's options with a seeded shuffle, keeping the answer key."""
    rnd = random.Random(seed)
    for r in rows:
        opts = list(r["opts"])
        if any(POSITIONAL.search(o["en"]) for o in opts):
            continue
        answer = opts[r["correct"]]
        rnd.shuffle(opts)
        r["opts"] = opts
        r["correct"] = opts.index(answer)
    return rows


def emit(section, rows, seed):
    rotate(rows, seed)
    qs = []
    for i, r in enumerate(rows, 1):
        qs.append({
            "id": f"{section}-x{i:03d}",
            "q": {"en": r["en"], "as": r["as"]},
            "options": r["opts"],
            "correct": r["correct"],
            "explanation": {"en": r["ex_en"], "as": r["ex_as"]},
        })
    d = os.path.join(OUT, section)
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, "question-001.json"), "w", encoding="utf-8") as f:
        json.dump(qs, f, ensure_ascii=False, indent=2)
        f.write("\n")
    return len(qs)


def interleave(blocks):
    """Merge topic blocks round-robin so the flat bank alternates across topics."""
    out = []
    max_len = max((len(b[1]) for b in blocks), default=0)
    for i in range(max_len):
        for _, rows in blocks:
            if i < len(rows):
                out.append(rows[i])
    return out
