#!/usr/bin/env python3
"""Order & Ranking: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


# 1. rank from bottom given rank from top
for total, top in [(40, 12), (50, 18), (35, 9), (60, 25), (45, 31), (72, 40), (28, 7), (55, 22),
                   (64, 16), (80, 45), (36, 20), (48, 13), (90, 33), (42, 27), (75, 50)]:
    v = total - top + 1
    add(f"In a class of {total} students, Ravi is {top}th from the top. What is his rank from the bottom?",
        f"{as_num(total)} জন ছাত্ৰৰ শ্ৰেণীত ৰবি ওপৰৰ পৰা {as_num(top)} তম। তলৰ পৰা তেওঁৰ স্থান কিমান?",
        v, [total - top, top, v + 1],
        f"Rank from bottom = total - rank from top + 1 = {total} - {top} + 1 = {v}.",
        f"তলৰ পৰা স্থান = {as_num(total)} - {as_num(top)} + ১ = {as_num(v)}।")

# 2. total given both ranks
for top, bottom in [(12, 15), (8, 20), (18, 10), (25, 6), (9, 32), (14, 21), (7, 44), (30, 11),
                    (16, 25), (5, 36), (22, 19), (11, 40)]:
    v = top + bottom - 1
    add(f"In a row, Amit is {top}th from the left and {bottom}th from the right. How many people are in the row?",
        f"এটা শাৰীত অমিত বাওঁফালৰ পৰা {as_num(top)} তম আৰু সোঁফালৰ পৰা {as_num(bottom)} তম। শাৰীত মুঠ কিমান জন?",
        v, [top + bottom, v + 1, v - 1],
        f"Total = rank from left + rank from right - 1 = {top} + {bottom} - 1 = {v}.",
        f"মুঠ = {as_num(top)} + {as_num(bottom)} - ১ = {as_num(v)}।")

# 3. people between two ranks
for a, b in [(7, 12), (5, 15), (9, 20), (3, 11), (14, 25), (8, 18), (6, 22), (11, 30),
             (4, 16), (17, 28), (2, 13), (10, 24)]:
    v = b - a - 1
    add(f"In a row, A is {a}th from the left and B is {b}th from the left. How many people are between them?",
        f"এটা শাৰীত A বাওঁফালৰ পৰা {as_num(a)} তম আৰু B বাওঁফালৰ পৰা {as_num(b)} তম। তেওঁলোকৰ মাজত কিমান জন?",
        v, [b - a, b - a + 1, v + 2],
        f"People between = {b} - {a} - 1 = {v}.",
        f"মাজত = {as_num(b)} - {as_num(a)} - ১ = {as_num(v)}।")

# 4. after interchange
for left, right, new_left in [(8, 12, 14), (10, 15, 18), (6, 20, 22), (12, 9, 16), (5, 18, 20),
                              (9, 14, 17), (11, 10, 19), (7, 25, 28), (4, 16, 18), (13, 12, 21)]:
    v = new_left + right - 1
    add(f"In a row, A is {left}th from the left and B is {right}th from the right. After they interchange places, A becomes {new_left}th from the left. How many people are in the row?",
        f"এটা শাৰীত A বাওঁফালৰ পৰা {as_num(left)} তম আৰু B সোঁফালৰ পৰা {as_num(right)} তম। স্থান সলনি কৰাৰ পিছত A বাওঁফালৰ পৰা {as_num(new_left)} তম হয়। শাৰীত মুঠ কিমান জন?",
        v, [new_left + right, v + 2, v - 2],
        f"A's new position from the left is B's old position, so total = {new_left} + {right} - 1 = {v}.",
        f"A ৰ নতুন স্থান = B ৰ পুৰণি স্থান; মুঠ = {as_num(new_left)} + {as_num(right)} - ১ = {as_num(v)}।")

# 5. position from right given left and total
for total, left in [(40, 15), (50, 22), (36, 9), (45, 30), (60, 41), (55, 17), (48, 24),
                    (70, 35), (32, 8), (64, 50), (28, 13), (80, 27)]:
    v = total - left + 1
    add(f"In a row of {total} people, A is {left}th from the left. What is his position from the right?",
        f"{as_num(total)} জনৰ শাৰীত A বাওঁফালৰ পৰা {as_num(left)} তম। সোঁফালৰ পৰা তেওঁৰ স্থান কিমান?",
        v, [total - left, left, v + 2],
        f"Position from right = total - position from left + 1 = {total} - {left} + 1 = {v}.",
        f"সোঁফালৰ পৰা স্থান = {as_num(total)} - {as_num(left)} + ১ = {as_num(v)}।")

# 6. rank from top given bottom and total
for total, bottom in [(45, 20), (60, 17), (38, 25), (52, 9), (70, 44), (33, 12)]:
    v = total - bottom + 1
    add(f"In a class of {total} students, Sita is {bottom}th from the bottom. What is her rank from the top?",
        f"{as_num(total)} জন ছাত্ৰৰ শ্ৰেণীত সীতা তলৰ পৰা {as_num(bottom)} তম। ওপৰৰ পৰা তেওঁৰ স্থান কিমান?",
        v, [total - bottom, bottom, v + 2],
        f"Rank from top = total - rank from bottom + 1 = {total} - {bottom} + 1 = {v}.",
        f"ওপৰৰ পৰা স্থান = {as_num(total)} - {as_num(bottom)} + ১ = {as_num(v)}।")

# 7. total from left, right and gap
for left, right, gap in [(5, 8, 3), (4, 10, 5), (7, 6, 2), (3, 12, 6), (9, 5, 4), (6, 9, 2)]:
    v = left + right + gap
    add(f"In a row, A is {left}th from the left and B is {right}th from the right, and there are {gap} people between them. How many people are in the row?",
        f"এটা শাৰীত A বাওঁফালৰ পৰা {as_num(left)} তম, B সোঁফালৰ পৰা {as_num(right)} তম আৰু তেওঁলোকৰ মাজত {as_num(gap)} জন আছে। শাৰীত মুঠ কিমান জন?",
        v, [left + right - 1, v + 2, v - 2],
        f"Total = left rank + right rank + people between = {left} + {right} + {gap} = {v}.",
        f"মুঠ = {as_num(left)} + {as_num(right)} + {as_num(gap)} = {as_num(v)}।")

# 8. shift right
for total, left, shift in [(50, 18, 5), (60, 12, 7), (45, 20, 4), (70, 25, 10), (40, 9, 6), (55, 30, 8)]:
    v = left + shift
    add(f"In a row of {total} people, A is {left}th from the left. B is {shift} places to the right of A. What is B's position from the left?",
        f"{as_num(total)} জনৰ শাৰীত A বাওঁফালৰ পৰা {as_num(left)} তম। B, A ৰ {as_num(shift)} স্থান সোঁফালে। বাওঁফালৰ পৰা B ৰ স্থান কিমান?",
        v, [left - shift, left, v + 2],
        f"B's position = {left} + {shift} = {v} from the left.",
        f"B ৰ স্থান = {as_num(left)} + {as_num(shift)} = {as_num(v)}।")

# 9. shift left
for total, left, shift in [(50, 25, 6), (48, 30, 8), (60, 22, 5), (42, 18, 7), (64, 40, 12), (36, 21, 4)]:
    v = left - shift
    add(f"In a row of {total} people, A is {left}th from the left. B is {shift} places to the left of A. What is B's position from the left?",
        f"{as_num(total)} জনৰ শাৰীত A বাওঁফালৰ পৰা {as_num(left)} তম। B, A ৰ {as_num(shift)} স্থান বাওঁফালে। বাওঁফালৰ পৰা B ৰ স্থান কিমান?",
        v, [left + shift, left, v - 2],
        f"B's position = {left} - {shift} = {v} from the left.",
        f"B ৰ স্থান = {as_num(left)} - {as_num(shift)} = {as_num(v)}।")

# 10. two rows comparison
for n1, p1, n2, p2 in [(20, 8, 25, 6), (30, 12, 35, 15), (24, 10, 28, 12), (18, 5, 22, 9)]:
    v = (n1 - p1) + (n2 - p2)
    add(f"In row A of {n1} people, X is {p1}th from the left. In row B of {n2} people, Y is {p2}th from the right. How many people are to the right of X and to the left of Y together?",
        f"A শাৰীত {as_num(n1)} জনৰ ভিতৰত X বাওঁফালৰ পৰা {as_num(p1)} তম। B শাৰীত {as_num(n2)} জনৰ ভিতৰত Y সোঁফালৰ পৰা {as_num(p2)} তম। X ৰ সোঁফালে আৰু Y ৰ বাওঁফালে থকা লোকৰ মুঠ সংখ্যা কিমান?",
        v, [n1 - p1, n2 - p2, v + 2],
        f"Right of X = {n1} - {p1} = {n1-p1}; left of Y = {n2} - {p2} = {n2-p2}; total = {v}.",
        f"X ৰ সোঁফালে {as_num(n1-p1)}, Y ৰ বাওঁফালে {as_num(n2-p2)}; মুঠ {as_num(v)}।")

append("order-ranking", rows)
