#!/usr/bin/env python3
"""Alphabet Test & Word Formation: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append, as_num, opts

rows = []
A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


def pos(c):
    return A.index(c) + 1


def ch(n):
    return A[(n - 1) % 26]


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


# right of a letter
for c, k in [("K", 4), ("D", 5), ("F", 3), ("M", 6), ("P", 2), ("H", 7), ("R", 4),
             ("B", 8), ("N", 5), ("S", 3), ("G", 6), ("T", 4)]:
    add(f"In the English alphabet, which letter is {k}th to the right of {c}?",
        f"ইংৰাজী বৰ্ণমালাত {c} ৰ {as_num(k)} তম সোঁফালে কোনটো আখৰ?",
        ch(pos(c) + k), [ch(pos(c) - k), ch(pos(c) + k + 1), ch(pos(c) + k - 1)],
        f"{c} is the {pos(c)}th letter; moving {k} steps right gives {ch(pos(c)+k)}.",
        f"{c} ৰ স্থান {as_num(pos(c))}; {as_num(k)} পদ সোঁফালে গ'লে {ch(pos(c)+k)}।")

# left of a letter
for c, k in [("P", 5), ("M", 4), ("T", 6), ("K", 3), ("W", 7), ("R", 2), ("Z", 8),
             ("N", 5), ("V", 4), ("S", 3)]:
    add(f"In the English alphabet, which letter is {k}th to the left of {c}?",
        f"ইংৰাজী বৰ্ণমালাত {c} ৰ {as_num(k)} তম বাওঁফালে কোনটো আখৰ?",
        ch(pos(c) - k), [ch(pos(c) + k), ch(pos(c) - k + 1), ch(pos(c) - k - 1)],
        f"{c} is the {pos(c)}th letter; moving {k} steps left gives {ch(pos(c)-k)}.",
        f"{c} ৰ স্থান {as_num(pos(c))}; {as_num(k)} পদ বাওঁফালে গ'লে {ch(pos(c)-k)}।")

# exactly between
for c1, c2 in [("A", "G"), ("C", "I"), ("B", "H"), ("D", "J"), ("E", "K"),
               ("F", "L"), ("G", "M"), ("H", "N"), ("I", "O"), ("J", "P")]:
    mid = ch((pos(c1) + pos(c2)) // 2)
    add(f"Which letter is exactly in the middle of {c1} and {c2} in the English alphabet?",
        f"ইংৰাজী বৰ্ণমালাত {c1} আৰু {c2} ৰ ঠিক মাজত কোনটো আখৰ?",
        mid, [ch(pos(mid) + 1), ch(pos(mid) - 1), ch(pos(mid) + 2)],
        f"Positions {pos(c1)} and {pos(c2)} give the middle position {(pos(c1)+pos(c2))//2}, which is {mid}.",
        f"স্থান {as_num(pos(c1))} আৰু {as_num(pos(c2))} ৰ মাজৰ স্থান {as_num((pos(c1)+pos(c2))//2)}, অৰ্থাৎ {mid}।")

# letters between
for c1, c2 in [("D", "K"), ("B", "H"), ("F", "M"), ("C", "J"), ("E", "L"),
               ("A", "F"), ("G", "N"), ("H", "P"), ("I", "Q"), ("J", "R")]:
    v = pos(c2) - pos(c1) - 1
    add(f"How many letters are there between {c1} and {c2} in the English alphabet?",
        f"ইংৰাজী বৰ্ণমালাত {c1} আৰু {c2} ৰ মাজত কিমানটা আখৰ আছে?",
        v, [v + 1, v - 1, v + 2],
        f"Between positions {pos(c1)} and {pos(c2)} there are {pos(c2)} - {pos(c1)} - 1 = {v} letters.",
        f"স্থান {as_num(pos(c1))} আৰু {as_num(pos(c2))} ৰ মাজত {as_num(v)} টা আখৰ।")

# reverse alphabet
for k in [5, 8, 12, 15, 18, 21, 3, 10, 24, 7]:
    add(f"If the English alphabet is written in reverse order, which letter is {k}th from the left?",
        f"ইংৰাজী বৰ্ণমালা উল্টাকৈ লিখিলে বাওঁফালৰ পৰা {as_num(k)} তম আখৰ কোনটো?",
        ch(27 - k), [ch(k), ch(27 - k + 2), ch(27 - k - 2)],
        f"Reverse alphabet starts with Z; the {k}th letter is {ch(27-k)}.",
        f"উল্টা বৰ্ণমালা Z ৰে আৰম্ভ হয়; {as_num(k)} তম আখৰ {ch(27-k)}।")

# kth from right
for k in [10, 4, 7, 15, 20, 2, 9, 13]:
    add(f"Which letter is {k}th from the right end of the English alphabet?",
        f"ইংৰাজী বৰ্ণমালাৰ সোঁমাজৰ পৰা {as_num(k)} তম আখৰ কোনটো?",
        ch(27 - k), [ch(k), ch(27 - k + 2), ch(27 - k - 2)],
        f"The {k}th letter from the right is the {27-k}th from the left, i.e. {ch(27-k)}.",
        f"সোঁফালৰ পৰা {as_num(k)} তম = বাওঁফালৰ পৰা {as_num(27-k)} তম = {ch(27-k)}।")

# word: alphabetical arrangement
WORDS = ["TABLE", "PLANT", "WATER", "SMILE", "BRAIN", "CHAIR", "LIGHT", "MOUSE", "RIVER", "STONE"]
for w in WORDS:
    s = "".join(sorted(w))
    add(f"If the letters of the word {w} are arranged in alphabetical order, which letter comes third?",
        f"{w} শব্দৰ আখৰবোৰ বৰ্ণানুক্ৰমে সজালে তৃতীয় আখৰ কোনটো?",
        s[2], [x for x in dict.fromkeys([s[1], s[4], s[3], s[0]]) if x != s[2]][:3],
        f"Sorted letters: {s}; the third letter is {s[2]}.",
        f"সজোৱা আখৰ: {s}; তৃতীয় আখৰ {s[2]}।")

# letters between first and last of a word
for w in WORDS[:8]:
    v = abs(pos(w[-1]) - pos(w[0])) - 1
    add(f"How many letters of the English alphabet lie between the first and last letters of the word {w}?",
        f"{w} শব্দৰ প্ৰথম আৰু শেষ আখৰৰ মাজত ইংৰাজী বৰ্ণমালাৰ কিমানটা আখৰ আছে?",
        v, [v + 1, v - 1, v + 2],
        f"First letter {w[0]} ({pos(w[0])}) and last letter {w[-1]} ({pos(w[-1])}) have {v} letters between them.",
        f"প্ৰথম {w[0]} ({as_num(pos(w[0]))}) আৰু শেষ {w[-1]} ({as_num(pos(w[-1]))}) ৰ মাজত {as_num(v)} টা আখৰ।")

# middle letter of a word
for w in ["BRAIN", "PLANT", "WATER", "STONE", "LIGHT", "CHAIR"]:
    add(f"Which letter is exactly in the middle of the word {w}?",
        f"{w} শব্দৰ ঠিক মাজত কোনটো আখৰ?",
        w[len(w) // 2], [w[len(w) // 2 - 1], w[len(w) // 2 + 1], w[0]],
        f"{w} has 5 letters; the middle one is the third letter, {w[2]}.",
        f"{w} ত ৫ টা আখৰ; মাজৰটো তৃতীয় আখৰ {w[2]}।")

# sum of positions of letters
for w in ["CAT", "DOG", "SUN", "PEN", "BAT"]:
    v = sum(pos(c) for c in w)
    add(f"If A = 1, B = 2, ..., Z = 26, what is the sum of the letter values of the word {w}?",
        f"A = ১, B = ২, ..., Z = ২৬ হ'লে {w} শব্দৰ আখৰবোৰৰ মানৰ যোগফল কিমান?",
        v, [v + 2, v - 2, v + 5],
        f"{' + '.join(str(pos(c)) for c in w)} = {v}.",
        f"{' + '.join(as_num(pos(c)) for c in w)} = {as_num(v)}।")

# second letter after interchange
for w in ["TABLE", "PLANT", "WATER", "SMILE", "BRAIN"]:
    v = w[-1] + w[1:-1] + w[0]
    add(f"If the first and last letters of the word {w} are interchanged, which letter will be second?",
        f"{w} শব্দৰ প্ৰথম আৰু শেষ আখৰ সলনি কৰিলে দ্বিতীয় আখৰ কোনটো হ'ব?",
        v[1], [v[0], v[2], v[-1]],
        f"After interchange the word becomes {v}; the second letter is {v[1]}.",
        f"সলনিৰ পিছত শব্দ {v}; দ্বিতীয় আখৰ {v[1]}।")

# extra: right/left combos
for c, k in [("C", 9), ("J", 8), ("Q", 3), ("E", 11), ("L", 6)]:
    add(f"In the English alphabet, which letter is {k}th to the right of {c}?",
        f"ইংৰাজী বৰ্ণমালাত {c} ৰ {as_num(k)} তম সোঁফালে কোনটো আখৰ?",
        ch(pos(c) + k), [ch(pos(c) - k), ch(pos(c) + k + 1), ch(pos(c) + k - 1)],
        f"{c} + {k} = {ch(pos(c)+k)}.",
        f"{c} + {as_num(k)} = {ch(pos(c)+k)}।")

append("alphabet-test-word-formation", rows)
