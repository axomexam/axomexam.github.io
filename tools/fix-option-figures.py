#!/usr/bin/env python3
"""Replace option figures that hold a Python tuple instead of a drawing.

The dhs-dme paper bank wrote ``('1', '১', '')`` into the option SVG for the
counting questions, so the page shows that literal text where a number should
be. This reads the numeral out of the tuple and draws it in the same style the
other numeric options on the site use.

Usage: python3 tools/fix-option-figures.py [--dry]
"""

import json
import re
import sys

BANK = ("data/exams/dhs-dme-technical/logical-reasoning/non-verbal-reasoning/"
        "paper-cutting-folding/question-001.json")
PAGE = ("exams/dhs-dme-technical/logical-reasoning/non-verbal-reasoning/"
        "paper-cutting-folding/index.html")
TUPLE = re.compile(r"\(\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*\)")

NUM_SVG = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="72" '
           'height="72" role="img" aria-label="figure"><text x="50" y="70" font-size="56" '
           'font-family="Arial, Helvetica, sans-serif" font-weight="700" text-anchor="middle" '
           'fill="#334155">{}</text></svg>')


def numeral(fig):
    m = TUPLE.search(fig or "")
    if not m:
        return None
    return m.group(1).strip()


AS_DIGITS = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")


def fill_option_text(data):
    """Give the numeric options the same number in text, for search and screen readers."""
    filled = 0
    for q in data:
        if not isinstance(q, dict):
            continue
        for o in q.get("options") or []:
            m = re.search(r">([^<]*)</text>", o.get("fig") or "")
            if not m or (o.get("en") or "").strip():
                continue
            num = m.group(1).strip()
            o["en"] = num
            o["as"] = num.translate(AS_DIGITS)
            filled += 1
    return filled


def main():
    dry = "--dry" in sys.argv
    data = json.load(open(BANK, encoding="utf-8"))
    page = open(PAGE, encoding="utf-8").read()
    swaps = {}
    report = []
    for i, q in enumerate(data):
        if not isinstance(q, dict):
            continue
        for j, o in enumerate(q.get("options") or []):
            fig = o.get("fig") or ""
            num = numeral(fig)
            if not num:
                continue
            swaps.setdefault(i, []).append((fig, NUM_SVG.format(num)))
            report.append((q["id"], o.get("option") or chr(65 + j), num))

    print(f"option figures to redraw: {len(report)} across {len(swaps)} questions")
    for r in report[:6]:
        print("  ", r)
    if dry:
        print("\ndry run: nothing written")
        return

    for i, pairs in swaps.items():
        for j, o in enumerate(data[i]["options"]):
            if numeral(o.get("fig")):
                o["fig"] = NUM_SVG.format(numeral(o["fig"]))
    blocks = page.split('<div class="qa-item')
    for i, pairs in swaps.items():
        block = blocks[i + 1]
        for old, new in pairs:
            block = block.replace(old, new, 1)
        blocks[i + 1] = block
    json.dump(data, open(BANK, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    open(PAGE, "w", encoding="utf-8").write('<div class="qa-item'.join(blocks))

    print("option text filled:", fill_option_text(data))
    json.dump(data, open(BANK, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    left = sum(1 for q in data if isinstance(q, dict)
               for o in (q.get("options") or []) if numeral(o.get("fig")))
    page_left = len(TUPLE.findall(open(PAGE, encoding="utf-8").read()))
    print(f"rewritten. tuples left in data: {left} | in page: {page_left}")


if __name__ == "__main__":
    main()
