#!/usr/bin/env python3
"""Coding-Decoding: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append, as_num, opts

rows = []
ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


def pos(c):
    return ALPHA.index(c) + 1


def ch(n):
    return ALPHA[(n - 1) % 26]


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def shift(word, k):
    return "".join(ch(pos(c) + k) for c in word)


WORDS = ["CAT", "DOG", "SUN", "PEN", "BOOK", "TREE", "FISH", "BIRD", "ROSE", "MILK",
         "STAR", "GOLD", "HAND", "KING", "RAIN", "SAND", "WIND", "FIRE", "LAMP", "MOON"]

# 1. shift +1
for w in WORDS[:8]:
    add(f"In a certain code, each letter is moved one step forward. How is {w} written in that code?",
        f"এটা নিৰ্দিষ্ট সংকেতত প্ৰতিটো আখৰ এটা পদ আগবঢ়োৱা হয়। সেই সংকেতত {w} কেনেকৈ লিখা হয়?",
        shift(w, 1), [shift(w, 2), shift(w, -1), shift(w, 3)],
        f"Each letter moves one step forward: {w} → {shift(w,1)}.",
        f"প্ৰতিটো আখৰ এটা পদ আগবাঢ়ে: {w} → {shift(w,1)}।")

# 2. shift +2
for w in WORDS[:8]:
    add(f"In a certain code, each letter is moved two steps forward. How is {w} written in that code?",
        f"এটা নিৰ্দিষ্ট সংকেতত প্ৰতিটো আখৰ দুটা পদ আগবঢ়োৱা হয়। সেই সংকেতত {w} কেনেকৈ লিখা হয়?",
        shift(w, 2), [shift(w, 1), shift(w, 3), shift(w, -2)],
        f"Each letter moves two steps forward: {w} → {shift(w,2)}.",
        f"প্ৰতিটো আখৰ দুটা পদ আগবাঢ়ে: {w} → {shift(w,2)}।")

# 3. shift +3
for w in WORDS[:8]:
    add(f"In a certain code, each letter is moved three steps forward. How is {w} written in that code?",
        f"এটা নিৰ্দিষ্ট সংকেতত প্ৰতিটো আখৰ তিনিটা পদ আগবঢ়োৱা হয়। সেই সংকেতত {w} কেনেকৈ লিখা হয়?",
        shift(w, 3), [shift(w, 2), shift(w, 4), shift(w, 1)],
        f"Each letter moves three steps forward: {w} → {shift(w,3)}.",
        f"প্ৰতিটো আখৰ তিনিটা পদ আগবাঢ়ে: {w} → {shift(w,3)}।")

# 4. reverse alphabet
def rev(w):
    return "".join(ch(27 - pos(c)) for c in w)


for w in WORDS[:8]:
    add(f"In a certain code, A is written as Z, B as Y, and so on. How is {w} written in that code?",
        f"এটা সংকেতত A ক Z, B ক Y আদি হিচাপে লিখা হয়। সেই সংকেতত {w} কেনেকৈ লিখা হয়?",
        rev(w), [shift(w, 1), shift(w, -1), rev(w)[::-1]],
        f"Each letter is replaced by its opposite (positions add to 27): {w} → {rev(w)}.",
        f"প্ৰতিটো আখৰৰ বিপৰীত আখৰেৰে সলনি হয়: {w} → {rev(w)}।")

# 5. alternating +1, +2, +3
def alt(w):
    return "".join(ch(pos(c) + i + 1) for i, c in enumerate(w))


for w in WORDS[:8]:
    add(f"In a certain code, the first letter is moved one step forward, the second two steps forward, the third three steps forward, and so on. How is {w} written in that code?",
        f"এটা সংকেতত প্ৰথম আখৰ এটা, দ্বিতীয় দুটা, তৃতীয় তিনিটা পদ আগবঢ়োৱা হয়। সেই সংকেতত {w} কেনেকৈ লিখা হয়?",
        alt(w), [shift(w, 1), shift(w, 2), shift(w, 3)],
        f"The shifts are +1, +2, +3, ...: {w} → {alt(w)}.",
        f"স্থানান্তৰ +১, +২, +৩, ...: {w} → {alt(w)}।")

# 6. position-number coding
for w in ["CAT", "DOG", "SUN", "PEN", "FISH", "BIRD", "ROSE", "STAR"]:
    v = "-".join(str(pos(c)) for c in w)
    alt1 = "-".join(str(pos(c) + 1) for c in w)
    alt2 = "-".join(str(pos(c) - 1) for c in w)
    add(f"If CAT is coded as 3-1-20, how is {w} coded?",
        f"যদি CAT ক 3-1-20 হিচাবে সংকেত কৰা হয়, তেন্তে {w} কেনেকৈ সংকেত কৰা হ'ব?",
        v, [alt1, alt2, "-".join(str(pos(c) + 2) for c in w)],
        f"Each letter is replaced by its position in the alphabet: {w} → {v}.",
        f"প্রতিটো আখৰৰ বর্ণমালাৰ স্থান লোৱা হয়: {w} → {v}।")

# 7. interchange first two letters
for w in ["BOOK", "TREE", "STAR", "GOLD", "HAND", "KING", "LAMP", "WIND"]:
    v = w[1] + w[0] + w[2:]
    add(f"In a certain code, the first two letters of a word are interchanged. How is {w} written in that code?",
        f"এটা সংকেতত শব্দৰ প্রথম দুটা আখৰ সলনি কৰা হয়। সেই সংকেতত {w} কেনেকৈ লিখা হয়?",
        v, [w[::-1], w[2:] + w[:2], w[0] + w[2] + w[1] + w[3:]],
        f"Interchanging the first two letters gives {v}.",
        f"প্রথম দুটা আখৰ সলনি কৰিলে {v} পোৱা যায়।")

# 8. reversal
for w in ["BOOK", "TREE", "STAR", "GOLD", "HAND", "KING", "LAMP", "WIND"]:
    add(f"In a certain code, a word is written in reverse order. How is {w} written in that code?",
        f"এটা সংকেতত শব্দ উল্টাকৈ লিখা হয়। সেই সংকেতত {w} কেনেকৈ লিখা হয়?",
        w[::-1], [w[1] + w[0] + w[2:], shift(w, 1), shift(w, -1)],
        f"Reversing the letters gives {w[::-1]}.",
        f"আখৰবোৰ উল্টাই লিখিলে {w[::-1]}।")

# 9. shift +4
for w in WORDS[:8]:
    add(f"In a certain code, each letter is moved four steps forward. How is {w} written in that code?",
        f"এটা সংকেতত প্রতিটো আখৰ চাৰিটা পদ আগবঢ়োৱা হয়। সেই সংকেতত {w} কেনেকৈ লিখা হয়?",
        shift(w, 4), [shift(w, 3), shift(w, 5), shift(w, 1)],
        f"Each letter moves four steps forward: {w} → {shift(w,4)}.",
        f"প্রতিটো আখৰ চাৰিটা পদ আগবাঢ়ে: {w} → {shift(w,4)}।")

# 10. shift +5 on remaining words
for w in WORDS[8:16]:
    add(f"In a certain code, each letter is moved five steps forward. How is {w} written in that code?",
        f"এটা সংকেতত প্রতিটো আখৰ পাঁচটা পদ আগবঢ়োৱা হয়। সেই সংকেতত {w} কেনেকৈ লিখা হয়?",
        shift(w, 5), [shift(w, 4), shift(w, 6), shift(w, 2)],
        f"Each letter moves five steps forward: {w} → {shift(w,5)}.",
        f"প্রতিটো আখৰ পাঁচটা পদ আগবাঢ়ে: {w} → {shift(w,5)}।")

append("coding-decoding", rows)
