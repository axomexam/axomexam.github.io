#!/usr/bin/env python3
"""Classification / Odd One Out: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append, append_bi, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def setq(items, odd, prop_en, prop_as, reason_en, reason_as):
    add(f"Three of the following are {prop_en}. Find the odd one out: {', '.join(map(str, items))}.",
        f"তলৰ তিনিাটা {prop_as}। আঁতৰ বস্তুটো নিৰ্ণয় কৰা: {', '.join(map(str, items))}।",
        odd, [x for x in items if x != odd],
        f"{odd} is not {prop_en}; the others are. {reason_en}",
        f"{as_num(odd)} {prop_as} নহয়; বাকীবোৰ হয়। {reason_as}")


SQUARES = [16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225]
NONSQ = [20, 24, 30, 42, 50, 54, 63, 72, 75, 90, 98, 110]
for i in range(12):
    items = SQUARES[i:i+3] + [NONSQ[i]]
    setq(items, NONSQ[i], "perfect squares", "পূৰ্ণ বৰ্গ",
         f"{NONSQ[i]} is not a perfect square.", f"{as_num(NONSQ[i])} পূৰ্ণ বৰ্গ নহয়।")

CUBES = [8, 27, 64, 125, 216, 343, 512, 729]
NONCUBE = [16, 24, 36, 54, 81, 100, 150, 200]
for i in range(8):
    items = CUBES[i:i+3] + [NONCUBE[i]]
    setq(items, NONCUBE[i], "perfect cubes", "পূৰ্ণ ঘন",
         f"{NONCUBE[i]} is not a perfect cube.", f"{as_num(NONCUBE[i])} পূৰ্ণ ঘন নহয়।")

PRIMES = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53]
NONPRIME = [15, 21, 25, 27, 33, 35, 39, 49, 51, 57, 63, 69]
for i in range(12):
    items = PRIMES[i:i+3] + [NONPRIME[i]]
    setq(items, NONPRIME[i], "prime numbers", "মৌলিক সংখ্যা",
         f"{NONPRIME[i]} is composite.", f"{as_num(NONPRIME[i])} যৌগিক সংখ্যা।")

MULT7 = [14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91]
NON7 = [15, 20, 25, 30, 40, 45, 50, 55, 60, 65, 75, 80]
for i in range(12):
    items = MULT7[i:i+3] + [NON7[i]]
    setq(items, NON7[i], "multiples of 7", "৭ ৰ গুণিতক",
         f"{NON7[i]} is not divisible by 7.", f"{as_num(NON7[i])} ৭ ৰে বিভাজ্য নহয়।")

MULT9 = [18, 27, 36, 45, 54, 63, 72, 81, 90, 99]
NON9 = [20, 25, 30, 40, 50, 60, 70, 80, 100, 110]
for i in range(10):
    items = MULT9[i:i+3] + [NON9[i]]
    setq(items, NON9[i], "multiples of 9", "৯ ৰ গুণিতক",
         f"{NON9[i]} is not divisible by 9.", f"{as_num(NON9[i])} ৯ ৰে বিভাজ্য নহয়।")

EVENS = [12, 18, 24, 30, 36, 42, 48, 54]
ODD = [15, 21, 27, 33, 39, 45, 51, 57]
for i in range(8):
    items = EVENS[i:i+3] + [ODD[i]]
    setq(items, ODD[i], "even numbers", "যুগ্ম সংখ্যা",
         f"{ODD[i]} is odd.", f"{as_num(ODD[i])} অযুগ্ম সংখ্যা।")

# letter groups
ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
for i in range(1, 19):
    a, b, c = ALPHA[i-1], ALPHA[i+1], ALPHA[i+2]
    d, e = ALPHA[i+3], ALPHA[i+6]
    items = [a+b, b+c, c+d, d+e]
    add(f"Three of the following pairs have a gap of exactly one letter between them. Find the odd one out: {', '.join(items)}.",
        f"তলৰ তিনিাটা যোৰৰ মাজত ঠিক এটা আখৰৰ ব্যৱধান আছে। আঁতৰ যোৰটো নিৰ্ণয় কৰা: {', '.join(items)}।",
        d+e, items[:3],
        f"{a}{b}, {b}{c} and {c}{d} each skip one letter, while {d}{e} skips two letters.",
        f"{a}{b}, {b}{c}, {c}{d} ৰ মাজত এটা আখৰ বাদ পৰে, কিন্তু {d}{e} ত দুটা আখৰ বাদ পৰে।")

# word categories
WORDS = [
    ("fruits", "ফল", "Potato", "আলু", ["Apple", "Mango", "Banana"], ["আপেল", "আম", "কল"], "Potato is a vegetable, not a fruit.", "আলু পাচলি, ফল নহয়।"),
    ("animals", "জন্তু", "Chair", "চকী", ["Cow", "Dog", "Cat"], ["গাই", "কুকুৰ", "মেকুৰী"], "A chair is furniture, not an animal.", "চকী আচবাব, জন্তু নহয়।"),
    ("colours", "ৰং", "Table", "মেজ", ["Red", "Blue", "Green"], ["ৰঙা", "নীলা", "সেউজীয়া"], "A table is furniture, not a colour.", "মেজ আচবাব, ৰং নহয়।"),
    ("months", "মাহ", "Sunday", "দেওবাৰ", ["January", "March", "May"], ["জানুৱাৰী", "মাৰ্চ", "মে'"], "Sunday is a day of the week, not a month.", "দেওবাৰ সপ্তাহৰ দিন, মাহ নহয়।"),
    ("planets", "গ্ৰহ", "Moon", "চন্দ্ৰ", ["Earth", "Mars", "Venus"], ["পৃথিৱী", "মঙ্গল", "শুক্ৰ"], "The Moon is a satellite, not a planet.", "চন্দ্ৰ উপগ্ৰহ, গ্ৰহ নহয়।"),
    ("vehicles", "যানবাহন", "Tree", "গছ", ["Car", "Bus", "Train"], ["গাড়ী", "বাছ", "ৰে'ল"], "A tree is a plant, not a vehicle.", "গছ উদ্ভিদ, যানবাহন নহয়।"),
    ("birds", "চৰাই", "Bat", "বাগৰী", ["Crow", "Parrot", "Sparrow"], ["কাউৰী", "ভাটৌ", "চৰাই"], "A bat is a mammal, not a bird.", "বাগৰী স্তন্যপায়ী, চৰাই নহয়।"),
    ("metals", "ধাতু", "Wood", "কাঠ", ["Iron", "Copper", "Gold"], ["লো", "তাম", "সোণ"], "Wood is not a metal.", "কাঠ ধাতু নহয়।"),
    ("furniture", "আচবাব", "Pen", "কলম", ["Chair", "Table", "Sofa"], ["চকী", "মেজ", "চোফা"], "A pen is stationery, not furniture.", "কলম লিখন সামগ্ৰী, আচবাব নহয়।"),
    ("flowers", "ফুল", "Mango", "আম", ["Rose", "Lotus", "Lily"], ["গোলাপ", "পদুম", "লিলি"], "Mango is a fruit, not a flower.", "আম ফল, ফুল নহয়।"),
    ("days", "দিন", "June", "জুন", ["Monday", "Tuesday", "Friday"], ["সোমবাৰ", "মঙ্গলবাৰ", "শুক্ৰবাৰ"], "June is a month, not a day.", "জুন মাহ, দিন নহয়।"),
    ("body parts", "শৰীৰৰ অংগ", "Shirt", "চোলা", ["Eye", "Ear", "Nose"], ["চকু", "কাণ", "নাক"], "A shirt is clothing, not a body part.", "চোলা পোছাক, শৰীৰৰ অংগ নহয়।"),
]
rows_bi = []
for cat_en, cat_as, odd_en, odd_as, rest_en, rest_as, exp_en, exp_as in WORDS:
    rows_bi.append({
        "stem": f"Three of the following are {cat_en}. Find the odd one out: {', '.join(rest_en + [odd_en])}.",
        "stem_as": f"তলৰ তিনিাটা {cat_as}। আঁতৰ বস্তুটো নিৰ্ণয় কৰা: {', '.join(rest_as + [odd_as])}।",
        "correct": odd_en, "correct_as": odd_as,
        "dists": list(zip(rest_en, rest_as)),
        "exp_en": exp_en, "exp_as": exp_as,
    })

append("classification-odd-one-out", rows)
append_bi("classification-odd-one-out", rows_bi)
