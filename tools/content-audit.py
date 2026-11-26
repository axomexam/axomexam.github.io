#!/usr/bin/env python3
"""Report the signals an AdSense "low value content" review reacts to.

Measured from the banks, not from guesses:
  * how many questions each page carries
  * repeated question stems, inside one bank and across banks
  * template families (many questions built from one sentence frame)
  * missing or recycled explanations

Usage: python3 tools/content-audit.py [--top N]
"""
import collections
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOPN = 15
if "--top" in sys.argv:
    TOPN = int(sys.argv[sys.argv.index("--top") + 1])


def norm(text):
    return " ".join((text or "").lower().split())


def stem_key(text):
    """A question with numbers blanked, to spot one template reused with new data."""
    t = norm(text)
    t = re.sub(r"\d+(?:[.,]\d+)*", "#", t)
    t = re.sub(r"'[^']*'", "'X'", t)
    return t


def frame(text, words=5):
    return " ".join(norm(text).split()[:words])


def load(path):
    try:
        data = json.load(open(path, encoding="utf-8"))
    except Exception:
        return None
    return data if isinstance(data, list) else None


def main():
    banks = sorted(glob.glob(os.path.join(ROOT, "data", "exams", "**", "question-001.json"), recursive=True))
    per_bank = {}
    stems_global = collections.Counter()
    stem_banks = collections.defaultdict(set)
    explanations = collections.Counter()
    frames_global = collections.Counter()
    missing_exp = 0
    total = 0

    for path in banks:
        data = load(path)
        if data is None:
            continue
        rel = os.path.relpath(path, os.path.join(ROOT, "data", "exams"))
        rel = rel[:-len("/question-001.json")]
        seen = collections.Counter()
        for q in data:
            if not isinstance(q, dict):
                continue
            total += 1
            stem = norm((q.get("q") or {}).get("en"))
            seen[stem] += 1
            stems_global[stem] += 1
            stem_banks[stem].add(rel)
            frames_global[frame(stem)] += 1
            exp = norm((q.get("explanation") or {}).get("en"))
            if not exp:
                missing_exp += 1
            else:
                explanations[exp] += 1
        per_bank[rel] = {
            "questions": len(data),
            "unique": len(seen),
            "repeats": sum(v - 1 for v in seen.values() if v > 1),
        }

    print("=" * 72)
    print(f"banks: {len(per_bank)}   questions: {total}   unique stems: {len(stems_global)}")
    print(f"repeated stems overall: {total - len(stems_global)} ({(total - len(stems_global)) / total * 100:.1f}%)")
    print(f"missing explanations: {missing_exp} ({missing_exp / total * 100:.1f}%)")

    thin = [(b, v["questions"]) for b, v in per_bank.items() if v["questions"] < 10]
    print(f"thin pages (<10 questions): {len(thin)}")
    for b, n in sorted(thin, key=lambda x: x[1])[:TOPN]:
        print(f"    {n:3} questions  {b}")

    print()
    print("-" * 72)
    print(f"stems that appear in more than one bank: {sum(1 for b in stem_banks.values() if len(b) > 1)}")
    cross = sorted(((len(b), s) for s, b in stem_banks.items() if len(b) > 1), reverse=True)
    for n, stem in cross[:TOPN]:
        print(f"    x{n:2} banks: {stem[:70]}")

    print()
    print("-" * 72)
    print("template families (same first five words, 20+ questions):")
    fams = [(n, f) for f, n in frames_global.items() if n >= 20]
    fams.sort(reverse=True)
    print(f"    families: {len(fams)}   questions inside them: {sum(n for n, _ in fams)}")
    for n, f in fams[:TOPN]:
        print(f"    {n:4} questions: {f}...")

    print()
    print("-" * 72)
    print("most recycled explanations (same sentence used again and again):")
    for text, n in explanations.most_common(TOPN):
        if n < 2:
            break
        print(f"    x{n:4} {text[:70]}")


if __name__ == "__main__":
    main()
