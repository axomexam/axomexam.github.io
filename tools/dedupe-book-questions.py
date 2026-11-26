#!/usr/bin/env python3
"""Remove question stems that appear in two source banks of the book.

Thirty-six stems were filed twice. The cause is at the source, not the page:
the Constitution items live in both general-knowledge/polity and
general-knowledge/india-gk, the currencies in both static-gk and world-gk, the
inventions in both static-gk and world-gk. The build routes each bank to a
leaf, so one question ended up on two pages, where it competes with itself.

Each duplicate is kept in the bank that matches it best (KEEP below) and
deleted from the other. Figure questions are skipped: two "how many triangles"
items carry different figures and are separate questions.

Usage: python3 tools/dedupe-book-questions.py [--dry]
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.path.join(ROOT, "tools/legacy-banks/dhs-dme-technical")
DRY = "--dry" in sys.argv

KEEP = [
    (r"headquarters of", "world-gk"),
    (r"currency of", "static-gk"),
    (r"invented by", "static-gk"),
    (r"fundamental right|preamble|backward classes|model code of conduct|"
     r"comptroller|human rights commission|vigilance commissioner|"
     r"indian councils act|right to education", "polity"),
    (r"maratha|chipko", "india-gk"),
]

SKIP = (r"how many (triangles|squares)",)


def stem_key(text):
    return re.sub(r"\s+", " ", str(text)).strip().lower()


def bank_key(path):
    return "/".join(path.split(os.sep)[-3:-1])


def main():
    holders = {}
    for dirpath, _dirs, files in os.walk(BASE):
        for name in files:
            if not (name.startswith("question-") and name.endswith(".json")):
                continue
            path = os.path.join(dirpath, name)
            try:
                bank = json.load(open(path, encoding="utf-8"))
            except Exception:
                continue
            if not isinstance(bank, list):
                continue
            for q in bank:
                if isinstance(q, dict) and isinstance(q.get("q"), dict):
                    key = stem_key(q["q"].get("en", ""))
                    if key:
                        holders.setdefault(key, []).append((bank_key(path), path))

    drop = {}
    for key, places in holders.items():
        banks = sorted({b for b, _ in places})
        if len(banks) < 2 or any(re.search(p, key) for p in SKIP):
            continue
        keep = None
        for pattern, want in KEEP:
            if re.search(pattern, key):
                keep = next((b for b in banks if want in b), None)
                if keep:
                    break
        if not keep:
            continue
        for b in banks:
            if b != keep:
                drop.setdefault(b, set()).add(key)

    removed = 0
    for b, keys in sorted(drop.items()):
        paths = {p for k in keys for b2, p in holders.get(k, []) if b2 == b}
        for path in sorted(paths):
            bank = json.load(open(path, encoding="utf-8"))
            kept = [q for q in bank
                    if not (isinstance(q, dict) and isinstance(q.get("q"), dict)
                            and stem_key(q["q"].get("en", "")) in keys)]
            gone = len(bank) - len(kept)
            if gone:
                removed += gone
                print(f"  -{gone:2d}  {b}")
                if not DRY:
                    with open(path, "w", encoding="utf-8") as fh:
                        json.dump(kept, fh, ensure_ascii=False, indent=2)
                        fh.write("\n")
    print(f"duplicate questions removed: {removed}" + (" (dry run)" if DRY else ""))


if __name__ == "__main__":
    main()
