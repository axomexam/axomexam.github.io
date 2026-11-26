#!/usr/bin/env python3
"""Analogy: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append, append_bi, as_num, opts

rows = []
rows_bi = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


def pos(ch):
    return ALPHA.index(ch) + 1


def ch(n):
    return ALPHA[(n - 1) % 26]


# 1. number analogy: square
for a in [4, 5, 6, 7, 8, 9, 11, 12, 13, 14]:
    add(f"5 : 25 :: {a} : ?",
        f"৫ : ২৫ :: {as_num(a)} : ?",
        a * a, [a * a + a, a * a - a, a * 2, a ** 3],
        f"The second number is the square of the first: {a}² = {a*a}.",
        f"দ্বিতীয় সংখ্যা প্ৰথমটোৰ বৰ্গ: {as_num(a)}² = {as_num(a*a)}।")

# 2. number analogy: cube
for a in [3, 4, 5, 6, 7, 8, 9, 10]:
    add(f"2 : 8 :: {a} : ?",
        f"২ : ৮ :: {as_num(a)} : ?",
        a ** 3, [a * a, a ** 3 + a, a * 3, a ** 2 + a],
        f"The second number is the cube of the first: {a}³ = {a**3}.",
        f"দ্বিতীয় সংখ্যা প্ৰথমটোৰ ঘন: {as_num(a)}³ = {as_num(a**3)}।")

# 3. number analogy: x2 + 1
for a in [5, 6, 7, 8, 9, 10, 11]:
    add(f"3 : 7 :: {a} : ?",
        f"৩ : ৭ :: {as_num(a)} : ?",
        2 * a + 1, [2 * a, 2 * a + 2, a + 4, 3 * a],
        f"The rule is ×2 + 1: {a} × 2 + 1 = {2*a+1}.",
        f"নিয়ম ×২ + ১: {as_num(a)} × ২ + ১ = {as_num(2*a+1)}।")

# 4. number analogy: x3 - 1
for a in [4, 5, 6, 7, 8]:
    add(f"2 : 5 :: {a} : ?",
        f"২ : ৫ :: {as_num(a)} : ?",
        3 * a - 1, [3 * a, 3 * a + 1, a * 2 + 1, 4 * a],
        f"The rule is ×3 - 1: {a} × 3 - 1 = {3*a-1}.",
        f"নিয়ম ×৩ - ১: {as_num(a)} × ৩ - ১ = {as_num(3*a-1)}।")

# 5. number analogy: a(a+1)
for a in [4, 5, 6, 7, 8, 9]:
    add(f"3 : 12 :: {a} : ?",
        f"৩ : ১২ :: {as_num(a)} : ?",
        a * (a + 1), [a * a, a * (a - 1), a * (a + 1) + a, (a + 1) ** 2],
        f"The second number is n(n+1): {a} × {a+1} = {a*(a+1)}.",
        f"দ্বিতীয় সংখ্যা n(n+১): {as_num(a*(a+1))}।")

# 6. number analogy: square + 1
for a in [4, 5, 6, 7, 8]:
    add(f"3 : 10 :: {a} : ?",
        f"৩ : ১০ :: {as_num(a)} : ?",
        a * a + 1, [a * a, a * a - 1, a * a + a, (a + 1) ** 2],
        f"The rule is n² + 1: {a}² + 1 = {a*a+1}.",
        f"নিয়ম n² + ১: {as_num(a*a+1)}।")

# 7. letter analogy: skip one forward
for s, t in [("A", "C"), ("B", "D"), ("C", "E"), ("D", "F"), ("E", "G")]:
    add(f"{s} : {t} :: {ch(pos(t)+1)} : ?",
        f"{s} : {t} :: {ch(pos(t)+1)} : ?",
        ch(pos(t) + 3), [ch(pos(t) + 2), ch(pos(t) + 4), ch(pos(t)), ch(pos(t) + 5)],
        f"Each letter moves 2 steps forward. So {ch(pos(t)+1)} + 2 = {ch(pos(t)+3)}.",
        f"প্ৰতিটো আখৰ ২ পদ আগবাঢ়ে; সেয়ে {ch(pos(t)+3)}।")

# 8. letter analogy: reverse pair
for s, t in [("A", "Z"), ("B", "Y"), ("C", "X"), ("D", "W")]:
    add(f"{s} : {t} :: {ch(pos(s)+4)} : ?",
        f"{s} : {t} :: {ch(pos(s)+4)} : ?",
        ch(27 - (pos(s) + 4)), [ch(27 - pos(s)), ch(pos(s) + 4), ch(26 - pos(s)), ch(25 - pos(s))],
        f"The letters are opposite in the alphabet: positions add to 27. So the answer is {ch(27-(pos(s)+4))}.",
        f"আখৰ দুটাৰ স্থান যোগফল ২৭; সেয়ে {ch(27-(pos(s)+4))}।")

# 9. letter analogy: +3
for s in ["A", "C", "E", "G"]:
    add(f"{s} : {ch(pos(s)+3)} :: {ch(pos(s)+1)} : ?",
        f"{s} : {ch(pos(s)+3)} :: {ch(pos(s)+1)} : ?",
        ch(pos(s) + 4), [ch(pos(s) + 3), ch(pos(s) + 5), ch(pos(s) + 2), ch(pos(s) + 6)],
        f"Each letter moves 3 steps forward, so {ch(pos(s)+1)} + 3 = {ch(pos(s)+4)}.",
        f"প্ৰতিটো আখৰ ৩ পদ আগবাঢ়ে; সেয়ে {ch(pos(s)+4)}।")

# 10. word analogies
PAIRS = [
    ("Doctor : Hospital", "চিকিৎসক : চিকিৎসালয়", "Teacher", "School", ["Library", "Court", "Factory"], "শিক্ষক", "বিদ্যালয়", ["পুথিভঁৰাল", "আদালত", "কাৰখানা"]),
    ("Pen : Write", "কলম : লিখা", "Knife", "Cut", ["Sharpen", "Hold", "Draw"], "ছুৰী", "কটা", ["চোকা কৰা", "ধৰা", "আঁকা"]),
    ("Bird : Nest", "চৰাই : বাহ", "Bee", "Hive", ["Burrow", "Den", "Web"], "মৌমাখি", "মৌচাক", ["গাঁত", "গুহা", "জাল"]),
    ("Book : Library", "কিতাপ : পুথিভঁৰাল", "Painting", "Museum", ["Gallery", "Stage", "Studio"], "চিত্ৰ", "সংগ্ৰহালয়", ["গেলেৰী", "মঞ্চ", "ষ্টুডিঅ'"]),
    ("Hot : Cold", "গৰম : ঠাণ্ডা", "Light", "Dark", ["Bright", "Warm", "Soft"], "পোহৰ", "আন্ধাৰ", ["উজ্জ্বল", "উষ্ণ", "নৰম"]),
    ("Hand : Glove", "হাত : গ্লাভছ", "Foot", "Sock", ["Shoe", "Hat", "Belt"], "ভৰি", "মোজা", ["জোতা", "টুপী", "বেল্ট"]),
    ("Author : Book", "লেখক : কিতাপ", "Architect", "Building", ["Painting", "Machine", "Song"], "স্থপতি", "ভৱন", ["চিত্ৰ", "যন্ত্ৰ", "গীত"]),
    ("Fish : Water", "মাছ : পানী", "Camel", "Desert", ["Forest", "Mountain", "Sky"], "উট", "মৰুভূমি", ["অৰণ্য", "পৰ্বত", "আকাশ"]),
    ("Eye : See", "চকু : দেখা", "Ear", "Hear", ["Smell", "Taste", "Touch"], "কাণ", "শুনা", ["গোন্ধ লোৱা", "সোৱাদ লোৱা", "স্পৰ্শ কৰা"]),
    ("Cow : Calf", "গাই : পোৱালি", "Dog", "Puppy", ["Kitten", "Cub", "Foal"], "কুকুৰ", "পোৱালি", ["মেকুৰীৰ পোৱালি", "সিংহৰ পোৱালি", "ঘোঁৰাৰ পোৱালি"]),
    ("Day : Night", "দিন : ৰাতি", "Summer", "Winter", ["Spring", "Monsoon", "Autumn"], "গ্ৰীষ্ম", "শীত", ["বসন্ত", "বৰ্ষা", "শৰৎ"]),
    ("Carpenter : Wood", "বঢ়াই : কাঠ", "Blacksmith", "Iron", ["Gold", "Clay", "Cloth"], "কামাৰ", "লো", ["সোণ", "মাটি", "কাপোৰ"]),
    ("Teacher : Student", "শিক্ষক : ছাত্ৰ", "Doctor", "Patient", ["Nurse", "Chemist", "Ward"], "চিকিৎসক", "ৰোগী", ["নাৰ্ছ", "ঔষধ বিক্ৰেতা", "ৱাৰ্ড"]),
    ("Seed : Tree", "গুটি : গছ", "Egg", "Bird", ["Nest", "Feather", "Wing"], "কণী", "চৰাই", ["বাহ", "পাখি", "ডেউকা"]),
    ("Clock : Time", "ঘড়ী : সময়", "Thermometer", "Temperature", ["Speed", "Weight", "Length"], "থাৰ্মমিটাৰ", "উষ্ণতা", ["গতি", "ওজন", "দীঘ"]),
]
for left, left_as, first, second, distractors, first_as, second_as, dist_as in PAIRS:
    rows_bi.append({
        "stem": f"{left} :: {first} : ?",
        "stem_as": f"{left_as} :: {first_as} : ?",
        "correct": second, "correct_as": second_as,
        "dists": list(zip(distractors, dist_as)),
        "exp_en": f"{left} has the same relationship as {first} : {second}.",
        "exp_as": f"{left_as} ৰ সম্পৰ্ক {first_as} : {second_as} ৰ দৰে।",
    })

# 11. number analogy variants
for a in [5, 6, 7, 8, 9]:
    add(f"4 : 15 :: {a} : ?",
        f"৪ : ১৫ :: {as_num(a)} : ?",
        a * a - 1, [a * a, a * a + 1, a * a - a, (a - 1) ** 2],
        f"The rule is n² - 1: {a}² - 1 = {a*a-1}.",
        f"নিয়ম n² - ১: {as_num(a*a-1)}।")

for a in [4, 5, 6, 7]:
    add(f"3 : 14 :: {a} : ?",
        f"৩ : ১৪ :: {as_num(a)} : ?",
        4 * a + 2, [4 * a, 4 * a + 1, 3 * a + 2, 5 * a],
        f"The rule is ×4 + 2: {a} × 4 + 2 = {4*a+2}.",
        f"নিয়ম ×৪ + ২: {as_num(4*a+2)}।")

for a in [4, 5, 6, 7]:
    add(f"2 : 7 :: {a} : ?",
        f"২ : ৭ :: {as_num(a)} : ?",
        a * a + a + 1, [a * a + a, a * a + 1, a * a + 2 * a, (a + 1) ** 2],
        f"The rule is n² + n + 1: {a}² + {a} + 1 = {a*a+a+1}.",
        f"নিয়ম n² + n + ১: {as_num(a*a+a+1)}।")

# 12. letter analogy variants
for s in ["A", "B", "C", "D"]:
    add(f"{s} : {ch(pos(s)+2)} :: {ch(pos(s)+3)} : ?",
        f"{s} : {ch(pos(s)+2)} :: {ch(pos(s)+3)} : ?",
        ch(pos(s) + 5), [ch(pos(s) + 4), ch(pos(s) + 6), ch(pos(s) + 3), ch(pos(s) + 7)],
        f"Each letter moves 2 steps forward, so {ch(pos(s)+3)} + 2 = {ch(pos(s)+5)}.",
        f"প্ৰতিটো আখৰ ২ পদ আগবাঢ়ে; সেয়ে {ch(pos(s)+5)}।")

for s in ["E", "F", "G"]:
    add(f"{s} : {ch(pos(s)+4)} :: {ch(pos(s)+2)} : ?",
        f"{s} : {ch(pos(s)+4)} :: {ch(pos(s)+2)} : ?",
        ch(pos(s) + 6), [ch(pos(s) + 5), ch(pos(s) + 7), ch(pos(s) + 4), ch(pos(s) + 8)],
        f"Each letter moves 4 steps forward, so {ch(pos(s)+2)} + 4 = {ch(pos(s)+6)}.",
        f"প্ৰতিটো আখৰ ৪ পদ আগবাঢ়ে; সেয়ে {ch(pos(s)+6)}।")

for s in ["Z", "Y", "X"]:
    add(f"{s} : {ch(pos(s)-2)} :: {ch(pos(s)-3)} : ?",
        f"{s} : {ch(pos(s)-2)} :: {ch(pos(s)-3)} : ?",
        ch(pos(s) - 5), [ch(pos(s) - 4), ch(pos(s) - 6), ch(pos(s) - 3), ch(pos(s) - 1)],
        f"Each letter moves 2 steps backward, so the answer is {ch(pos(s)-5)}.",
        f"প্ৰতিটো আখৰ ২ পদ পিছলৈ যায়; সেয়ে {ch(pos(s)-5)}।")

# extra numbers
for a in [6, 7, 8, 9, 10]:
    add(f"5 : 30 :: {a} : ?",
        f"৫ : ৩০ :: {as_num(a)} : ?",
        a * (a + 1), [a * a, a * (a + 2), a * (a - 1), (a + 1) ** 2],
        f"The rule is n(n+1): {a} × {a+1} = {a*(a+1)}.",
        f"নিয়ম n(n+১): {as_num(a*(a+1))}।")

for a in [3, 4, 5, 6]:
    add(f"2 : 10 :: {a} : ?",
        f"২ : ১০ :: {as_num(a)} : ?",
        a ** 2 + a, [a ** 2, a ** 2 - a, a ** 3, a * 3],
        f"The rule is n² + n: {a}² + {a} = {a*a+a}.",
        f"নিয়ম n² + n: {as_num(a*a+a)}।")

append("analogy", rows)
append_bi("analogy", rows_bi)
