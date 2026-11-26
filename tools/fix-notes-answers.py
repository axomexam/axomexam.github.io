#!/usr/bin/env python3
"""Remove the empty option list and empty answer from the worked-questions notes.

Where every option of a question is a picture, the notes line read
"Q. <stem> (A) (B) (C) (D) The correct choice is . <explanation>" - a list with
nothing in it and a sentence with no answer. The line keeps the stem and the
explanation. Lettered options that do carry text are left alone.

Usage: python3 tools/fix-notes-answers.py [--dry]
"""

import glob
import re
import sys

EMPTY_OPTIONS = re.compile(r"\s*\(A\)\s*\(B\)\s*\(C\)\s*\(D\)\s*")
EN_ANSWER = re.compile(r"The correct choice is \.\s*")
AS_ANSWER = re.compile(r"শুদ্ধ উত্তৰ ।\s*")


def clean_line(text):
    """Drop an option list and answer sentence only when both are empty."""
    if not EMPTY_OPTIONS.search(text):
        return text, False
    if not (EN_ANSWER.search(text) or AS_ANSWER.search(text)):
        return text, False
    out = EMPTY_OPTIONS.sub(" ", text, count=1)
    out = EN_ANSWER.sub("", out, count=1)
    out = AS_ANSWER.sub("", out, count=1)
    return out, True


def main():
    dry = "--dry" in sys.argv
    done = 0
    untouched = 0
    for page in sorted(glob.glob("exams/**/index.html", recursive=True)
                       + glob.glob("as/exams/**/index.html", recursive=True)):
        html = open(page, encoding="utf-8").read()
        if "The correct choice is ." not in html and "শুদ্ধ উত্তৰ ।" not in html:
            continue
        changed = 0

        def repl(m):
            nonlocal changed
            new, hit = clean_line(m.group(0))
            if hit:
                changed += 1
            return new

        out = re.sub(r'<p class="qs11"[^>]*>[\s\S]*?</p>', repl, html)
        if changed:
            done += changed
            if not dry:
                open(page, "w", encoding="utf-8").write(out)
        else:
            untouched += 1
    print(f"lines cleaned: {done} | pages left as they were: {untouched}")
    if dry:
        print("dry run: nothing written")


if __name__ == "__main__":
    main()
