#!/usr/bin/env python3
"""Logical Sequence of Words: 80+ very hard bilingual questions."""

import itertools
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


SETS = [
    (["Seed", "Sprout", "Plant", "Tree", "Fruit"],
     ["গুটি", "অংকুৰ", "গছ", "বৃক্ষ", "ফল"], "growth of a plant"),
    (["Baby", "Child", "Boy", "Man", "Old man"],
     ["শিশু", "ল'ৰা-ছোৱালী", "ডেকা", "পুৰুষ", "বৃদ্ধ"], "stages of human life"),
    (["Letter", "Word", "Sentence", "Paragraph", "Chapter"],
     ["আখৰ", "শব্দ", "বাক্য", "অনুচ্ছেদ", "অধ্যায়"], "building blocks of writing"),
    (["Second", "Minute", "Hour", "Day", "Week"],
     ["ছেকেণ্ড", "মিনিট", "ঘণ্টা", "দিন", "সপ্তাহ"], "units of time"),
    (["Millimetre", "Centimetre", "Metre", "Kilometre"],
     ["মিলিমিটাৰ", "ছেন্টিমিটাৰ", "মিটাৰ", "কিলোমিটাৰ"], "units of length"),
    (["Cotton", "Thread", "Cloth", "Shirt"],
     ["কপাহ", "সূতা", "কাপোৰ", "চোলা"], "making a shirt"),
    (["Egg", "Larva", "Pupa", "Butterfly"],
     ["কণী", "লাৰ্ভা", "পিউপা", "পখিলা"], "life cycle of a butterfly"),
    (["Foundation", "Walls", "Roof", "House"],
     ["মূলভূমি", "বেৰ", "চাল", "ঘৰ"], "building a house"),
    (["Village", "Town", "City", "Metropolis"],
     ["গাঁও", "চহৰ", "নগৰ", "মহানগৰ"], "increasing size of settlements"),
    (["Birth", "Education", "Job", "Marriage", "Retirement"],
     ["জন্ম", "শিক্ষা", "চাকৰি", "বিবাহ", "অৱসৰ"], "stages of a career"),
    (["Stone", "Pebble", "Rock", "Boulder"],
     ["শিল", "সৰু শিল", "পাথৰ", "ডাঙৰ শিল"], "increasing size"),
    (["Word", "Phrase", "Clause", "Sentence"],
     ["শব্দ", "বাক্যাংশ", "উপবাক্য", "বাক্য"], "parts of a sentence"),
]

ORD = ["first", "second", "third", "fourth", "fifth"]
ORD_AS = ["প্ৰথম", "দ্বিতীয়", "তৃতীয়", "চতুৰ্থ", "পঞ্চম"]

for words, words_as, theme in SETS:
    n = len(words)
    for shift in (0, 1, 2):
        idx = list(range(n))
        idx = idx[shift:] + idx[:shift]
        present = [words[i] for i in idx]
        present_as = [words_as[i] for i in idx]
        correct_seq = ", ".join(str(idx.index(i) + 1) for i in range(n))
        cands = []
        for perm in itertools.permutations(range(1, n + 1)):
            s = ", ".join(map(str, perm))
            if s != correct_seq and s not in cands:
                cands.append(s)
            if len(cands) == 3:
                break
        add(f"Arrange the following words in the correct order ({theme}): {', '.join(f'{j+1}. {w}' for j, w in enumerate(present))}.",
            f"তলৰ শব্দবোৰ সঠিক ক্ৰমত সজোৱা ({theme}): {', '.join(f'{as_num(j+1)}. {w}' for j, w in enumerate(present_as))}।",
            correct_seq, cands,
            f"The correct order is {' → '.join(words)}, i.e. {correct_seq}.",
            f"সঠিক ক্ৰম {' → '.join(words_as)}, অৰ্থাৎ {correct_seq}।")

# increasing gaps
for s in range(1, 7):
    terms = [ch(s), ch(s + 2), ch(s + 5), ch(s + 9)]
    nxt = ch(s + 14)
    add(f"Complete the sequence: {', '.join(terms)}, ?",
        f"শৃংখলা সম্পূৰ্ণ কৰা: {', '.join(terms)}, ?",
        nxt, [ch(pos(nxt) + 1), ch(pos(nxt) - 1), ch(pos(nxt) + 2)],
        f"The gaps are +2, +3, +4, so the next gap is +5: {terms[-1]} + 5 = {nxt}.",
        f"ব্যৱধান +২, +৩, +৪; পৰৱৰ্তী ব্যৱধান +৫: {nxt}।")

# decreasing gaps
for s in range(21, 27):
    terms = [ch(s), ch(s - 2), ch(s - 5), ch(s - 9)]
    nxt = ch(s - 14)
    add(f"Complete the sequence: {', '.join(terms)}, ?",
        f"শৃংখলা সম্পূৰ্ণ কৰা: {', '.join(terms)}, ?",
        nxt, [ch(pos(nxt) + 1), ch(pos(nxt) - 1), ch(pos(nxt) - 2)],
        f"The gaps are -2, -3, -4, so the next gap is -5: {terms[-1]} - 5 = {nxt}.",
        f"ব্যৱধান -২, -৩, -৪; পৰৱৰ্তী -৫: {nxt}।")

# letter pairs with gap 3
for s in range(1, 9):
    groups = [f"{ch(s + 4*i)}{ch(s + 4*i + 1)}" for i in range(4)]
    nxt = f"{ch(s + 16)}{ch(s + 17)}"
    add(f"Complete the sequence: {', '.join(groups)}, ?",
        f"শৃংখলা সম্পূৰ্ণ কৰা: {', '.join(groups)}, ?",
        nxt, [f"{ch(s+17)}{ch(s+18)}", f"{ch(s+15)}{ch(s+16)}", f"{ch(s+16)}{ch(s+18)}"],
        f"Each pair starts 4 letters after the previous one, so the next pair is {nxt}.",
        f"প্ৰতিটো যোৰ পূৰ্বৰ পৰা ৪ আখৰ পিছত আৰম্ভ হয়; পৰৱৰ্তী {nxt}।")

# reverse pairs
for s in range(1, 9):
    groups = [f"{ch(s + i)}{ch(27 - s - i)}" for i in range(4)]
    nxt = f"{ch(s + 4)}{ch(27 - s - 4)}"
    add(f"Complete the sequence: {', '.join(groups)}, ?",
        f"শৃংখলা সম্পূৰ্ণ কৰা: {', '.join(groups)}, ?",
        nxt, [f"{ch(s+5)}{ch(27-s-5)}", f"{ch(s+4)}{ch(27-s-3)}", f"{ch(s+3)}{ch(27-s-4)}"],
        f"The pairs are opposite letters moving inward; the next pair is {nxt}.",
        f"যোৰবোৰ বিপৰীত আখৰ; পৰৱৰ্তী {nxt}।")

# number-letter
for s, n0 in [(1, 2), (2, 4), (1, 6), (3, 8), (2, 10)]:
    terms = [f"{n0 + 2*i}{ch(s + 2*i)}" for i in range(4)]
    nxt = f"{n0 + 8}{ch(s + 8)}"
    add(f"Complete the sequence: {', '.join(terms)}, ?",
        f"শৃংখলা সম্পূৰ্ণ কৰা: {', '.join(terms)}, ?",
        nxt, [f"{n0+9}{ch(s+8)}", f"{n0+8}{ch(s+9)}", f"{n0+7}{ch(s+7)}"],
        f"The number increases by 2 and the letter advances by 2, so the next term is {nxt}.",
        f"সংখ্যা ২ ৰে আৰু আখৰ ২ পদ বাঢ়ে; পৰৱৰ্তী {nxt}।")

# alternating letters
for s in range(1, 9):
    terms = [ch(s)]
    p = s
    for i in range(3):
        p = p + 3 if i % 2 == 0 else p - 1
        terms.append(ch(p))
    nxt = ch(p + 3)
    add(f"Complete the sequence: {', '.join(terms)}, ?",
        f"শৃংখলা সম্পূৰ্ণ কৰা: {', '.join(terms)}, ?",
        nxt, [ch(pos(nxt) + 1), ch(pos(nxt) - 1), ch(pos(nxt) + 2)],
        f"The pattern alternates +3 and -1, so the next is {terms[-1]} + 3 = {nxt}.",
        f"নিয়ম +৩ আৰু -১ ৰ পুনৰাবৃত্তি; পৰৱৰ্তী {nxt}।")

# final batch
for s in range(9, 12):
    groups = [f"{ch(s + i)}{ch(27 - s - i)}" for i in range(4)]
    nxt = f"{ch(s + 4)}{ch(27 - s - 4)}"
    add(f"Complete the sequence: {', '.join(groups)}, ?",
        f"শৃংখলা সম্পূৰ্ণ কৰা: {', '.join(groups)}, ?",
        nxt, [f"{ch(s+5)}{ch(27-s-5)}", f"{ch(s+4)}{ch(27-s-3)}", f"{ch(s+3)}{ch(27-s-4)}"],
        f"The next pair of opposite letters is {nxt}.",
        f"পৰৱৰ্তী বিপৰীত আখৰৰ যোৰ {nxt}।")

for s, n0 in [(4, 12), (1, 14), (5, 16)]:
    terms = [f"{n0 + 2*i}{ch(s + 2*i)}" for i in range(4)]
    nxt = f"{n0 + 8}{ch(s + 8)}"
    add(f"Complete the sequence: {', '.join(terms)}, ?",
        f"শৃংখলা সম্পূৰ্ণ কৰা: {', '.join(terms)}, ?",
        nxt, [f"{n0+9}{ch(s+8)}", f"{n0+8}{ch(s+9)}", f"{n0+7}{ch(s+7)}"],
        f"Number +2 and letter +2 give {nxt}.",
        f"সংখ্যা +২ আৰু আখৰ +২: {nxt}।")

append("logical-sequence-words", rows)
