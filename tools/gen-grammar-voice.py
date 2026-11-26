#!/usr/bin/env python3
"""Active to Passive Voice: 160 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from grammar_bank import append

LEAF = "voice"

VERBS = [
    ("write", "wrote", "written", "writing", "writes", "a letter"),
    ("eat", "ate", "eaten", "eating", "eats", "rice"),
    ("play", "played", "played", "playing", "plays", "football"),
    ("read", "read", "read", "reading", "reads", "a book"),
    ("clean", "cleaned", "cleaned", "cleaning", "cleans", "the room"),
    ("paint", "painted", "painted", "painting", "paints", "a picture"),
    ("cook", "cooked", "cooked", "cooking", "cooks", "dinner"),
    ("buy", "bought", "bought", "buying", "buys", "a car"),
    ("sell", "sold", "sold", "selling", "sells", "the house"),
    ("repair", "repaired", "repaired", "repairing", "repairs", "the car"),
    ("break", "broke", "broken", "breaking", "breaks", "the glass"),
    ("open", "opened", "opened", "opening", "opens", "the door"),
    ("close", "closed", "closed", "closing", "closes", "the window"),
    ("wash", "washed", "washed", "washing", "washes", "the clothes"),
    ("water", "watered", "watered", "watering", "waters", "the plants"),
    ("cut", "cut", "cut", "cutting", "cuts", "the tree"),
    ("build", "built", "built", "building", "builds", "a house"),
    ("draw", "drew", "drawn", "drawing", "draws", "a picture"),
    ("sing", "sang", "sung", "singing", "sings", "a song"),
    ("teach", "taught", "taught", "teaching", "teaches", "English"),
]

TENSES = [
    ("sp", "Simple present", "সাধাৰণ বৰ্তমান"),
    ("pc", "Present continuous", "ঘটমান বৰ্তমান"),
    ("pp", "Present perfect", "পূৰ্ণ বৰ্তমান"),
    ("past", "Simple past", "সাধাৰণ অতীত"),
    ("pastc", "Past continuous", "ঘটমান অতীত"),
    ("pastp", "Past perfect", "পূৰ্ণ অতীত"),
    ("fut", "Simple future", "সাধাৰণ ভৱিষ্যৎ"),
    ("futp", "Future perfect", "পূৰ্ণ ভৱিষ্যৎ"),
]


def active(tense, base, past, pp, ing, third, obj):
    return {
        "sp": f"She {third} {obj}.",
        "pc": f"She is {ing} {obj}.",
        "pp": f"She has {pp} {obj}.",
        "past": f"She {past} {obj}.",
        "pastc": f"She was {ing} {obj}.",
        "pastp": f"She had {pp} {obj}.",
        "fut": f"She will {base} {obj}.",
        "futp": f"She will have {pp} {obj}.",
    }[tense]


def passive(tense, pp, obj):
    o = obj[0].upper() + obj[1:]
    return {
        "sp": f"{o} is {pp} by her.",
        "pc": f"{o} is being {pp} by her.",
        "pp": f"{o} has been {pp} by her.",
        "past": f"{o} was {pp} by her.",
        "pastc": f"{o} was being {pp} by her.",
        "pastp": f"{o} had been {pp} by her.",
        "fut": f"{o} will be {pp} by her.",
        "futp": f"{o} will have been {pp} by her.",
    }[tense]


def wrong(tense, pp, obj):
    o = obj[0].upper() + obj[1:]
    table = {
        "sp": [f"{o} was {pp} by her.", f"{o} is being {pp} by her.", f"{o} has been {pp} by her."],
        "pc": [f"{o} is {pp} by her.", f"{o} was being {pp} by her.", f"{o} has been {pp} by her."],
        "pp": [f"{o} is {pp} by her.", f"{o} was {pp} by her.", f"{o} had been {pp} by her."],
        "past": [f"{o} is {pp} by her.", f"{o} was being {pp} by her.", f"{o} had been {pp} by her."],
        "pastc": [f"{o} was {pp} by her.", f"{o} is being {pp} by her.", f"{o} had been {pp} by her."],
        "pastp": [f"{o} was {pp} by her.", f"{o} has been {pp} by her.", f"{o} will be {pp} by her."],
        "fut": [f"{o} is {pp} by her.", f"{o} will have been {pp} by her.", f"{o} was {pp} by her."],
        "futp": [f"{o} will be {pp} by her.", f"{o} has been {pp} by her.", f"{o} was {pp} by her."],
    }
    return table[tense]


rows = []
for base, past, pp, ing, third, obj in VERBS:
    for tense, en_name, as_name in TENSES:
        a = active(tense, base, past, pp, ing, third, obj)
        p = passive(tense, pp, obj)
        rows.append({
            "stem": f"Change into passive voice: '{a}'",
            "stem_as": f"কৰ্মবাচ্যলৈ সলনি কৰা: '{a}'",
            "correct": (p, p),
            "dists": [(w, w) for w in wrong(tense, pp, obj)],
            "exp_en": f"The object becomes the subject and the verb takes the {en_name.lower()} passive form.",
            "exp_as": f"কৰ্মই কৰ্তা হয় আৰু ক্ৰিয়াই {as_name} কৰ্মবাচ্যৰ ৰূপ লয়।",
        })

append(LEAF, rows)
