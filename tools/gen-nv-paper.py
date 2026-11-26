#!/usr/bin/env python3
"""Paper Cutting & Folding: 80+ bilingual questions with SVG figures."""

import sys
sys.path.insert(0, "tools")
import nv_shapes as S
from verbal_bank import as_num as AS_DIGITS
from nv_bank import append_nv

rows = []


def add(fig, options, correct, q_en, q_as, exp_en, exp_as):
    uniq = []
    seen = set()
    for o in options:
        if o not in seen:
            seen.add(o)
            uniq.append(o)
    for fb in (S.grid([(0, 0)]), S.grid([(0, 1)]), S.grid([(1, 0)]),
               S.grid([(0, 0), (1, 1)]), S.grid([(0, 0), (0, 1)])):
        if len(uniq) == 4:
            break
        if fb not in seen:
            seen.add(fb)
            uniq.append(fb)
    rows.append({"stem": q_en, "stem_as": q_as, "fig": S.svg(fig) if fig else "",
                 "options": [("", "", S.svg(o)) for o in uniq[:4]],
                 "correct": correct, "exp_en": exp_en, "exp_as": exp_as})


def punch_panel(n, pr, pc):
    """Folded quarter shown as a small grid with the punch marked."""
    half = n // 2
    return S.grid([(pr, pc)], n=half, cell=20, x0=10, y0=10)


# --- folded twice, punch in the quarter
for n in (4, 6):
    half = n // 2
    for pr in range(half):
        for pc in range(half):
            holes = [(pr, pc), (pr, n - 1 - pc), (n - 1 - pr, pc), (n - 1 - pr, n - 1 - pc)]
            holes = sorted(set(holes))
            correct = S.grid(holes, n=n)
            wrong1 = S.grid(sorted(set([(pr, pc), (pr, n - 1 - pc), (n - 1 - pr, pc)])), n=n)
            wrong2 = S.grid(sorted(set([(pr, pc), (pr, n - 1 - pc),
                                        (n - 1 - pr, pc), ((pr + 1) % n, pc)])), n=n)
            wrong3 = S.grid(sorted(set([(pr, pc), (n - 1 - pr, n - 1 - pc)])), n=n)
            add(punch_panel(n, pr, pc), [correct, wrong1, wrong2, wrong3], 0,
                "The square sheet is folded once from left to right and then once from top to bottom. "
                "A hole is punched at the marked square of the folded paper. Which pattern appears when it is unfolded?",
                "বৰ্গাকৃতি কাগজখন প্ৰথমে বাওঁৰ পৰা সোঁলৈ আৰু তাৰ পিছত ওপৰৰ পৰা তললৈ ভাঁজ কৰা হৈছে। "
                "ভাঁজ কৰা কাগজৰ চিহ্নিত ঠাইত এটা ফুটা কৰা হৈছে। মেলি দিলে কোনটো আৰ্হি দেখা যাব?",
                "Unfolding reflects the hole across both creases, giving four holes in symmetric positions.",
                "মেলি দিলে ফুটাটো দুয়োটা ভাঁজৰ সাপেক্ষে প্ৰতিফলিত হৈ চাৰিটা সুমিতিশীল ফুটা হয়।")

# --- folded once (vertical)
for n in (4,):
    for pr in range(n):
        for pc in range(n):
            holes = sorted({(pr, pc), (pr, n - 1 - pc)})
            correct = S.grid(holes, n=n)
            wrong1 = S.grid(sorted({(pr, pc), (n - 1 - pr, pc)}), n=n)
            wrong2 = S.grid(sorted({(pr, pc)}), n=n)
            wrong3 = S.grid(sorted({(pr, pc), (pr, (pc + 1) % n)}), n=n)
            panel = S.grid([(pr, pc)], n=n)
            add(panel, [correct, wrong1, wrong2, wrong3], 0,
                "A square sheet is folded once along the vertical centre line, with the left half laid on the right half. "
                "A hole is punched at the marked square. Which pattern appears on unfolding?",
                "বৰ্গাকৃতি কাগজখন উলম্ব কেন্দ্ৰৰেখাত এবাৰ ভাঁজ কৰা হৈছে, বাওঁ আধা সোঁ আধাৰ ওপৰত। "
                "চিহ্নিত ঠাইত এটা ফুটা কৰা হৈছে। মেলি দিলে কোনটো আৰ্হি দেখা যাব?",
                "The single crease copies the hole to the mirror position on the other half, giving two holes.",
                "এটা ভাঁজে ফুটাটো আন আধাৰ দাপোণ অৱস্থানলৈ নকল কৰে, সেয়ে দুটা ফুটা হয়।")

# --- folded once (horizontal)
for n in (4,):
    for pr in range(n):
        for pc in range(n):
            holes = sorted({(pr, pc), (n - 1 - pr, pc)})
            correct = S.grid(holes, n=n)
            wrong1 = S.grid(sorted({(pr, pc), (pr, n - 1 - pc)}), n=n)
            wrong2 = S.grid(sorted({(pr, pc)}), n=n)
            wrong3 = S.grid(sorted({(pr, pc), ((pr + 1) % n, pc)}), n=n)
            panel = S.grid([(pr, pc)], n=n)
            add(panel, [correct, wrong1, wrong2, wrong3], 0,
                "A square sheet is folded once along the horizontal centre line, with the top half laid on the bottom half. "
                "A hole is punched at the marked square. Which pattern appears on unfolding?",
                "বৰ্গাকৃতি কাগজখন অনুভূমিক কেন্দ্ৰৰেখাত এবাৰ ভাঁজ কৰা হৈছে, ওপৰ আধা তল আধাৰ ওপৰত। "
                "চিহ্নিত ঠাইত এটা ফুটা কৰা হৈছে। মেলি দিলে কোনটো আৰ্হি দেখা যাব?",
                "The crease copies the hole to the mirror position in the other half, giving two holes.",
                "ভাঁজে ফুটাটো আন আধাৰ দাপোণ অৱস্থানলৈ নকল কৰে, সেয়ে দুটা ফুটা হয়।")

# --- counting questions
PH = [
    ("A square sheet of paper is folded in half once. A single hole is punched through it. How many holes will the unfolded sheet show?",
     "বৰ্গাকৃতি কাগজ এখন এবাৰ আধা কৰি ভাঁজ কৰা হৈছে। ইয়াৰ মাজেৰে এটা ফুটা কৰা হৈছে। মেলি দিলে কিমানটা ফুটা দেখা যাব?",
     2),
    ("A square sheet is folded twice, each time in half. One hole is punched. How many holes appear on unfolding?",
     "বৰ্গাকৃতি কাগজ দুবাৰ আধা কৰি ভাঁজ কৰা হৈছে। এটা ফুটা কৰা হৈছে। মেলি দিলে কিমানটা ফুটা দেখা যাব?",
     4),
    ("A square sheet is folded three times, each time in half. One hole is punched. How many holes appear on unfolding?",
     "বৰ্গাকৃতি কাগজ তিনিবাৰ আধা কৰি ভাঁজ কৰা হৈছে। এটা ফুটা কৰা হৈছে। মেলি দিলে কিমানটা ফুটা দেখা যাব?",
     8),
    ("A square sheet is folded twice, each time in half. Two holes are punched far from the creases. How many holes appear on unfolding?",
     "বৰ্গাকৃতি কাগজ দুবাৰ আধা কৰি ভাঁজ কৰা হৈছে। ভাঁজৰ পৰা আঁতৰত দুটা ফুটা কৰা হৈছে। মেলি দিলে কিমানটা ফুটা দেখা যাব?",
     8),
    ("A paper napkin is folded once. Three holes are punched away from the fold. How many holes appear when it is opened?",
     "কাগজৰ নেপকিন এবাৰ ভাঁজ কৰা হৈছে। ভাঁজৰ পৰা আঁতৰত তিনিটা ফুটা কৰা হৈছে। মেলি দিলে কিমানটা ফুটা দেখা যাব?",
     6),
    ("A square sheet is folded once and a single hole is punched exactly on the crease. How many holes appear on unfolding?",
     "বৰ্গাকৃতি কাগজ এবাৰ ভাঁজ কৰি ঠিক ভাঁজৰ ওপৰত এটা ফুটা কৰা হৈছে। মেলি দিলে কিমানটা ফুটা দেখা যাব?",
     1),
    ("A square sheet is folded twice and one hole is punched exactly on both creases. How many holes appear on unfolding?",
     "বৰ্গাকৃতি কাগজ দুবাৰ ভাঁজ কৰি দুয়োটা ভাঁজৰ ওপৰত এটা ফুটা কৰা হৈছে। মেলি দিলে কিমানটা ফুটা দেখা যাব?",
     1),
    ("A sheet is folded twice in half. Four holes are punched away from the creases. How many holes appear on unfolding?",
     "কাগজ এখন দুবাৰ আধা কৰি ভাঁজ কৰা হৈছে। ভাঁজৰ পৰা আঁতৰত চাৰিটা ফুটা কৰা হৈছে। মেলি দিলে কিমানটা ফুটা দেখা যাব?",
     16),
]
for q_en, q_as, ans in PH:
    dists = [ans - 1 if ans > 1 else ans + 1, ans * 2, ans + 2]
    opts = [str(ans)] + [str(d) for d in dists]
    uniq = []
    for o in opts:
        if o not in uniq:
            uniq.append(o)
    add("", [(o, AS_DIGITS(o), "") for o in uniq[:4]], 0, q_en, q_as,
        f"Every fold doubles the number of holes, so the answer is {ans}.",
        f"প্ৰতিটো ভাঁজে ফুটাৰ সংখ্যা দুগুণ কৰে, সেয়ে উত্তৰ {ans}।")

# --- 6x6 sheet folded once (vertical)
for pr in range(6):
    for pc in range(3):
        holes = sorted({(pr, pc), (pr, 5 - pc)})
        correct = S.grid(holes, n=6)
        wrong1 = S.grid(sorted({(pr, pc), (5 - pr, pc)}), n=6)
        wrong2 = S.grid(sorted({(pr, pc)}), n=6)
        wrong3 = S.grid(sorted({(pr, pc), (pr, (pc + 1) % 6)}), n=6)
        panel = S.grid([(pr, pc)], n=6)
        add(panel, [correct, wrong1, wrong2, wrong3], 0,
            "A 6 by 6 sheet is folded once along the vertical centre line, left half on the right half. "
            "A hole is punched at the marked square. Which pattern appears on unfolding?",
            "৬×৬ কাগজখন উলম্ব কেন্দ্ৰৰেখাত এবাৰ ভাঁজ কৰা হৈছে, বাওঁ আধা সোঁ আধাৰ ওপৰত। "
            "চিহ্নিত ঠাইত এটা ফুটা কৰা হৈছে। মেলি দিলে কোনটো আৰ্হি দেখা যাব?",
            "The crease copies the hole to the mirror column, giving two holes in the same row.",
            "ভাঁজে ফুটাটো দাপোণ স্তম্ভলৈ নকল কৰে, সেয়ে একেই শাৰীত দুটা ফুটা হয়।")

# --- 6x6 sheet folded once (horizontal)
for pr in range(3):
    for pc in range(6):
        holes = sorted({(pr, pc), (5 - pr, pc)})
        correct = S.grid(holes, n=6)
        wrong1 = S.grid(sorted({(pr, pc), (pr, 5 - pc)}), n=6)
        wrong2 = S.grid(sorted({(pr, pc)}), n=6)
        wrong3 = S.grid(sorted({(pr, pc), ((pr + 1) % 6, pc)}), n=6)
        panel = S.grid([(pr, pc)], n=6)
        add(panel, [correct, wrong1, wrong2, wrong3], 0,
            "A 6 by 6 sheet is folded once along the horizontal centre line, top half on the bottom half. "
            "A hole is punched at the marked square. Which pattern appears on unfolding?",
            "৬×৬ কাগজখন অনুভূমিক কেন্দ্ৰৰেখাত এবাৰ ভাঁজ কৰা হৈছে, ওপৰ আধা তল আধাৰ ওপৰত। "
            "চিহ্নিত ঠাইত এটা ফুটা কৰা হৈছে। মেলি দিলে কোনটো আৰ্হি দেখা যাব?",
            "The crease copies the hole to the mirror row, giving two holes in the same column.",
            "ভাঁজে ফুটাটো দাপোণ শাৰীলৈ নকল কৰে, সেয়ে একেই স্তম্ভত দুটা ফুটা হয়।")

# --- two punches in the folded quarter
import itertools
cells = [(0, 0), (0, 1), (1, 0), (1, 1)]
for a, b in itertools.combinations(cells, 2):
    holes = sorted({(r, c) for (r, c) in (a, b)} |
                   {(r, 3 - c) for (r, c) in (a, b)} |
                   {(3 - r, c) for (r, c) in (a, b)} |
                   {(3 - r, 3 - c) for (r, c) in (a, b)})
    correct = S.grid(holes, n=4)
    wrong1 = S.grid(sorted(set(list(holes)[:3])), n=4)
    wrong2 = S.grid(sorted({(r, c) for (r, c) in (a, b)}), n=4)
    wrong3 = S.grid(sorted({(r, 3 - c) for (r, c) in (a, b)}), n=4)
    panel = S.grid([a, b], n=2)
    add(panel, [correct, wrong1, wrong2, wrong3], 0,
        "A square sheet is folded twice in half. Two holes are punched at the marked squares of the folded quarter. "
        "Which pattern appears when the sheet is unfolded?",
        "বৰ্গাকৃতি কাগজ দুবাৰ আধা কৰি ভাঁজ কৰা হৈছে। ভাঁজ কৰা চতুৰ্থাংশৰ চিহ্নিত ঠাইত দুটা ফুটা কৰা হৈছে। "
        "মেলি দিলে কোনটো আৰ্হি দেখা যাব?",
        "Each punch is reflected across both creases, so two punches give eight holes in symmetric positions.",
        "প্ৰতিটো ফুটা দুয়োটা ভাঁজৰ সাপেক্ষে প্ৰতিফলিত হয়, সেয়ে দুটা ফুটাৰ পৰা আঠটা সুমিতিশীল ফুটা হয়।")

append_nv("paper-cutting-folding", rows)
