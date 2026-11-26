#!/usr/bin/env python3
"""Tenses: 160 bilingual verb-form questions."""

import sys
sys.path.insert(0, "tools")
from grammar_bank import append

LEAF = "tenses"

VERBS = [
    ("go", "went", "gone", "going", "goes", "to school"),
    ("write", "wrote", "written", "writing", "writes", "a letter"),
    ("eat", "ate", "eaten", "eating", "eats", "rice"),
    ("read", "read", "read", "reading", "reads", "a book"),
    ("play", "played", "played", "playing", "plays", "football"),
    ("work", "worked", "worked", "working", "works", "in an office"),
    ("study", "studied", "studied", "studying", "studies", "English"),
    ("cook", "cooked", "cooked", "cooking", "cooks", "dinner"),
    ("paint", "painted", "painted", "painting", "paints", "a picture"),
    ("sing", "sang", "sung", "singing", "sings", "a song"),
    ("run", "ran", "run", "running", "runs", "fast"),
    ("swim", "swam", "swum", "swimming", "swims", "in the river"),
    ("drive", "drove", "driven", "driving", "drives", "a car"),
    ("clean", "cleaned", "cleaned", "cleaning", "cleans", "the room"),
    ("watch", "watched", "watched", "watching", "watches", "TV"),
    ("help", "helped", "helped", "helping", "helps", "her mother"),
]

REASON = {
    "sp": ("Simple present is used for habits and repeated actions; with 'she' the verb takes -s or -es.",
           "সাধাৰণ বৰ্তমান কাল অভ্যাস আৰু পুনৰাবৃত্ত ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়; 'she'ৰ সৈতে ক্ৰিয়াত -s বা -es যোগ হয়।"),
    "pc": ("Present continuous is used for an action happening now.",
           "ঘটমান বৰ্তমান কাল এতিয়া ঘটি থকা ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়।"),
    "pp": ("Present perfect is used for a past action that is still relevant now.",
           "পূৰ্ণ বৰ্তমান কাল অতীতত ঘটা কিন্তু এতিয়াও প্ৰাসংগিক ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়।"),
    "ppc": ("Present perfect continuous is used for an action continuing from the past until now.",
            "ঘটমান পূৰ্ণ বৰ্তমান কাল অতীতৰ পৰা এতিয়ালৈ চলি থকা ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়।"),
    "past": ("Simple past is used for a completed action in the past.",
             "সাধাৰণ অতীত কাল অতীতত সম্পূৰ্ণ হোৱা ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়।"),
    "pastc": ("Past continuous is used for an action in progress at a point in the past.",
              "ঘটমান অতীত কাল অতীতৰ এটা সময়ত চলি থকা ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়।"),
    "pastp": ("Past perfect is used for the earlier of two past actions.",
              "পূৰ্ণ অতীত কাল অতীতৰ দুটা ক্ৰিয়াৰ ভিতৰত আগতে হোৱা ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়।"),
    "fut": ("Simple future is used for an action that will happen later.",
            "সাধাৰণ ভৱিষ্যৎ কাল পিছত ঘটিৱলগীয়া ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়।"),
    "futc": ("Future continuous is used for an action in progress at a future time.",
             "ঘটমান ভৱিষ্যৎ কাল ভৱিষ্যতৰ এটা সময়ত চলি থকা ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়।"),
    "futp": ("Future perfect is used for an action completed before a future time.",
             "পূৰ্ণ ভৱিষ্যৎ কাল ভৱিষ্যৎৰ এটা সময়ৰ আগতে সম্পূৰ্ণ হোৱা ক্ৰিয়াৰ বাবে ব্যৱহাৰ হয়।"),
}

rows = []


def add(stem, correct, dists, key):
    en, as_ = REASON[key]
    rows.append({
        "stem": "Choose the correct verb form: " + stem,
        "stem_as": "শুদ্ধ ক্ৰিয়া ৰূপ বাছনি কৰা: " + stem,
        "correct": (correct, correct),
        "dists": [(d, d) for d in dists],
        "exp_en": en,
        "exp_as": as_,
    })


for base, past, pp, ing, third, comp in VERBS:
    add(f"She ___ {comp} every day.", third, [base, past, ing], "sp")
    add(f"She ___ {comp} now.", f"is {ing}", [f"are {ing}", third, past], "pc")
    add(f"She ___ {comp} already.", f"has {pp}", [f"have {pp}", past, f"is {ing}"], "pp")
    add(f"She ___ {comp} for two hours.", f"has been {ing}",
        [f"have been {ing}", f"is {ing}", past], "ppc")
    add(f"She ___ {comp} yesterday.", past, [third, pp, f"is {ing}"], "past")
    add(f"She ___ {comp} at 8 a.m. yesterday.", f"was {ing}",
        [f"were {ing}", past, f"is {ing}"], "pastc")
    add(f"She ___ {comp} before it rained.", f"had {pp}",
        [f"has {pp}", past, f"was {ing}"], "pastp")
    add(f"She ___ {comp} tomorrow.", f"will {base}",
        [third, past, f"has {pp}"], "fut")
    add(f"She ___ {comp} at 8 a.m. tomorrow.", f"will be {ing}",
        [f"will {base}", f"is {ing}", past], "futc")
    add(f"She ___ {comp} by 8 a.m. tomorrow.", f"will have {pp}",
        [f"will {base}", f"has {pp}", past], "futp")

append(LEAF, rows)
