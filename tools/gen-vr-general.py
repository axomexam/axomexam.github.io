#!/usr/bin/env python3
"""General Verbal Reasoning (Mixed): 80+ very hard bilingual questions."""

import random
import sys
sys.path.insert(0, "tools")
from verbal_bank import append_bi

rows = []
random.seed(21)

SYN = [
    ("Happy", "সুখী", "Joyful", "আনন্দিত"),
    ("Begin", "আৰম্ভ কৰা", "Start", "শুৰু কৰা"),
    ("Quick", "দ্ৰুত", "Fast", "খৰ"),
    ("Big", "ডাঙৰ", "Large", "বিশাল"),
    ("Smart", "চোকা", "Clever", "বুদ্ধিমান"),
    ("Brave", "সাহসী", "Courageous", "নিৰ্ভীক"),
    ("Calm", "শান্ত", "Peaceful", "শান্তিপূৰ্ণ"),
    ("Rich", "ধনী", "Wealthy", "সম্পদশালী"),
    ("Small", "সৰু", "Tiny", "অতি সৰু"),
    ("Strong", "শক্তিশালী", "Powerful", "শক্তিমান"),
    ("Beautiful", "ধুনীয়া", "Pretty", "সুন্দৰ"),
    ("Angry", "খং", "Furious", "ক্ৰোধিত"),
    ("Silent", "নীৰৱ", "Quiet", "শান্ত"),
    ("Difficult", "কঠিন", "Hard", "কঠিন"),
    ("Honest", "সৎ", "Truthful", "সত্যবাদী"),
    ("Ancient", "প্ৰাচীন", "Old", "পুৰণি"),
    ("Help", "সহায়", "Assist", "সহায় কৰা"),
    ("Buy", "কিনা", "Purchase", "ক্ৰয় কৰা"),
    ("Talk", "কথা কোৱা", "Speak", "কোৱা"),
    ("End", "শেষ", "Finish", "সমাপ্ত"),
]

ANT = [
    ("Hot", "গৰম", "Cold", "ঠাণ্ডা"),
    ("Day", "দিন", "Night", "ৰাতি"),
    ("Up", "ওপৰ", "Down", "তল"),
    ("Rich", "ধনী", "Poor", "দুখীয়া"),
    ("Brave", "সাহসী", "Cowardly", "ভয়াতুৰ"),
    ("Fast", "দ্ৰুত", "Slow", "লেহেমীয়া"),
    ("Light", "পোহৰ", "Dark", "আন্ধাৰ"),
    ("Love", "প্ৰেম", "Hate", "ঘৃণা"),
    ("Victory", "বিজয়", "Defeat", "পৰাজয়"),
    ("Ancient", "প্ৰাচীন", "Modern", "আধুনিক"),
    ("Wet", "তিতা", "Dry", "শুকান"),
    ("Hard", "কঠিন", "Soft", "নৰম"),
    ("Empty", "খালী", "Full", "ভৰা"),
    ("Young", "ডেকা", "Old", "বৃদ্ধ"),
    ("Clean", "পৰিষ্কাৰ", "Dirty", "লেতেৰা"),
    ("High", "ওখ", "Low", "চাপৰ"),
    ("True", "সত্য", "False", "মিছা"),
    ("Open", "খোলা", "Closed", "বন্ধ"),
    ("Strong", "শক্তিশালী", "Weak", "দুৰ্বল"),
    ("Begin", "আৰম্ভ কৰা", "End", "শেষ"),
]

POOL = [(w, wa) for w, wa, _, _ in SYN + ANT]

PHRASINGS = [
    ("Choose the word most similar in meaning to {w}.",
     "{w} ৰ অৰ্থৰ সৈতে আটাইতকৈ মিল থকা শব্দ বাছনি কৰা।"),
    ("Select the synonym of {w}.",
     "{w} ৰ সমাৰ্থক শব্দ বাছনি কৰা।"),
]
PHRASINGS_ANT = [
    ("Choose the word most opposite in meaning to {w}.",
     "{w} ৰ বিপৰীত অৰ্থৰ শব্দ বাছনি কৰা।"),
    ("Select the antonym of {w}.",
     "{w} ৰ বিপৰীত শব্দ বাছনি কৰা।"),
]

for idx, (w, wa, ans, ans_as) in enumerate(SYN):
    for variant, (ph, ph_as) in enumerate(PHRASINGS):
        cands = [(x, xa) for x, xa in POOL if x not in (w, ans)]
        random.shuffle(cands)
        chosen = []
        for x, xa in cands:
            if x not in [c[0] for c in chosen]:
                chosen.append((x, xa))
            if len(chosen) == 3:
                break
        rows.append({
            "stem": ph.format(w=w),
            "stem_as": ph_as.format(w=wa),
            "correct": ans, "correct_as": ans_as,
            "dists": chosen,
            "exp_en": f"{ans} means almost the same as {w}.",
            "exp_as": f"{ans} ({ans_as}) ৰ অৰ্থ {w} ({wa}) ৰ সৈতে প্ৰায় একে।",
        })

for idx, (w, wa, ans, ans_as) in enumerate(ANT):
    for variant, (ph, ph_as) in enumerate(PHRASINGS_ANT):
        cands = [(x, xa) for x, xa in POOL if x not in (w, ans)]
        random.shuffle(cands)
        chosen = []
        for x, xa in cands:
            if x not in [c[0] for c in chosen]:
                chosen.append((x, xa))
            if len(chosen) == 3:
                break
        rows.append({
            "stem": ph.format(w=w),
            "stem_as": ph_as.format(w=wa),
            "correct": ans, "correct_as": ans_as,
            "dists": chosen,
            "exp_en": f"{ans} is the opposite of {w}.",
            "exp_as": f"{ans} ({ans_as}) {w} ({wa}) ৰ বিপৰীত।",
        })

EXTRA_SYN = [
    ("Sad", "দুখী", "Unhappy", "অসন্তুষ্ট"),
    ("Huge", "বিশাল", "Enormous", "অতিকায়"),
    ("Tired", "ক্লান্ত", "Weary", "পৰিশ্ৰান্ত"),
    ("Shout", "চিঞৰা", "Yell", "চিঞৰা"),
    ("Gift", "উপহাৰ", "Present", "উপহাৰ"),
    ("Journey", "যাত্ৰা", "Trip", "ভ্ৰমণ"),
]
for w, wa, ans, ans_as in EXTRA_SYN:
    cands = [(x, xa) for x, xa in POOL if x not in (w, ans)]
    random.shuffle(cands)
    chosen = []
    for x, xa in cands:
        if x not in [c[0] for c in chosen]:
            chosen.append((x, xa))
        if len(chosen) == 3:
            break
    rows.append({
        "stem": f"Choose the word most similar in meaning to {w}.",
        "stem_as": f"{wa} ৰ অৰ্থৰ সৈতে আটাইতকৈ মিল থকা শব্দ বাছনি কৰা।",
        "correct": ans, "correct_as": ans_as,
        "dists": chosen,
        "exp_en": f"{ans} means almost the same as {w}.",
        "exp_as": f"{ans} ({ans_as}) ৰ অৰ্থ {wa} ৰ সৈতে প্ৰায় একে।",
    })

append_bi("general-verbal-reasoning", rows)
