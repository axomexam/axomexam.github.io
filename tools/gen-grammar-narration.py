#!/usr/bin/env python3
"""Direct to Indirect Speech: 160 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from grammar_bank import append

LEAF = "narration"

REASON = {
    "assertive": ("In indirect speech 'that' is added and the present tense shifts to the past.",
                  "পৰোক্ষ উক্তিত 'that' যোগ হয় আৰু বৰ্তমান কাল অতীত কাললৈ সলনি হয়।"),
    "interrogative": ("Yes/no questions take 'if/whether'; wh-questions keep the wh-word and use statement order.",
                      "হয়/নহয় প্ৰশ্নত 'if/whether' আৰু wh-প্ৰশ্নত wh-শব্দ ৰাখি বাক্যৰ ক্ৰম ব্যৱহাৰ হয়।"),
    "imperative": ("Imperatives become 'to + verb'; negatives become 'not to + verb'.",
                   "অনুজ্ঞাসূচক বাক্য 'to + ক্ৰিয়া' হয়; নঞৰ্থক হ'লে 'not to + ক্ৰিয়া' হয়।"),
    "exclamatory": ("Exclamations become statements with 'exclaimed that' and intensifiers such as 'very'.",
                    "বিস্ময়সূচক বাক্য 'exclaimed that' আৰু 'very' আদিৰ সৈতে বিবৃতিত পৰিণত হয়।"),
    "optative": ("Optative sentences take 'wished/prayed that ... might'.",
                 "প্ৰাৰ্থনাসূচক বাক্যত 'wished/prayed that ... might' ব্যৱহাৰ হয়।"),
    "universal": ("Universal truths keep their present tense in indirect speech.",
                  "সাৰ্বজনীন সত্যৰ কাল পৰোক্ষ উক্তিত সলনি নহয়।"),
}

rows = []


def add(kind, direct, correct):
    rows.append({
        "_kind": kind,
        "stem": f"Change into indirect speech: '{direct}'",
        "stem_as": f"পৰোক্ষ উক্তিলৈ সলনি কৰা: '{direct}'",
        "correct": (correct, correct),
        "dists": [],
        "exp_en": REASON[kind][0],
        "exp_as": REASON[kind][1],
    })


# ---- assertive: 20 clauses x 3 reporting frames ----
ASSERT = [
    ("I am tired.", "he was tired"), ("I am busy.", "she was busy"),
    ("I have finished.", "he had finished"), ("I will come.", "she would come"),
    ("I can swim.", "he could swim"), ("I may go.", "she might go"),
    ("I must go.", "he had to go"), ("I am reading.", "she was reading"),
    ("I was ill.", "he had been ill"), ("I saw him.", "she had seen him"),
    ("I shall return.", "he would return"), ("I do not know.", "she did not know"),
    ("I like tea.", "he liked tea"), ("I want to go.", "she wanted to go"),
    ("I need help.", "he needed help"), ("I am happy.", "she was happy"),
    ("I have a pen.", "he had a pen"), ("I can do it.", "she could do it"),
    ("I am going home.", "he was going home"), ("I have eaten.", "she had eaten"),
]
for clause, ind in ASSERT:
    sp = "He" if " he " in f" {ind} " else "She"
    other = "him" if sp == "He" else "her"
    add("assertive", f'{sp} said, "{clause}"', f"{sp} said that {ind}.")
    add("assertive", f'{sp} said to me, "{clause}"', f"{sp} told me that {ind}.")
    add("assertive", f'{sp} said to {other}, "{clause}"', f"{sp} told {other} that {ind}.")

# ---- interrogative: 15 x 2 ----
QUEST = [
    ("Where does she live?", "where she lived"),
    ("What is he doing?", "what he was doing"),
    ("Why is she late?", "why she was late"),
    ("When will he come?", "when he would come"),
    ("How did she pass?", "how she had passed"),
    ("Who is he?", "who he was"),
    ("Whose book is this?", "whose book that was"),
    ("Which road goes to the station?", "which road went to the station"),
    ("Does she sing?", "if she sang"),
    ("Is he ready?", "if he was ready"),
    ("Has she finished?", "if she had finished"),
    ("Will he come?", "if he would come"),
    ("Can she swim?", "if she could swim"),
    ("Did he call?", "if he had called"),
    ("Where is the station?", "where the station was"),
]
for i, (q, ind) in enumerate(QUEST):
    sp = "He" if i % 2 == 0 else "She"
    add("interrogative", f'{sp} said, "{q}"', f"{sp} asked {ind}.")
    add("interrogative", f'{sp} said to me, "{q}"', f"{sp} asked me {ind}.")

# ---- imperative ----
IMP = [
    ('He said to me, "Close the door."', "He ordered me to close the door."),
    ('She said to me, "Open the window."', "She ordered me to open the window."),
    ('He said to me, "Sit down."', "He ordered me to sit down."),
    ('She said to me, "Stand up."', "She ordered me to stand up."),
    ('He said to me, "Bring the book."', "He ordered me to bring the book."),
    ('She said to me, "Write a letter."', "She ordered me to write a letter."),
    ('He said to me, "Wait here."', "He ordered me to wait there."),
    ('She said to me, "Come early."', "She ordered me to come early."),
    ('He said to me, "Do not go."', "He ordered me not to go."),
    ('She said to me, "Do not shout."', "She ordered me not to shout."),
    ('He said to me, "Please help the poor."', "He requested me to help the poor."),
    ('She said to me, "Please wait here."', "She requested me to wait there."),
    ('He said to me, "Please sit down."', "He requested me to sit down."),
    ('She said to me, "Please open the door."', "She requested me to open the door."),
    ('He said to me, "Please bring water."', "He requested me to bring water."),
    ('He said to me, "Work hard."', "He advised me to work hard."),
    ('She said to me, "Study regularly."', "She advised me to study regularly."),
    ('He said to me, "Take rest."', "He advised me to take rest."),
    ('She said to me, "Be careful."', "She advised me to be careful."),
    ('He said to me, "Do not waste time."', "He advised me not to waste time."),
    ('She said to me, "Do not smoke."', "She advised me not to smoke."),
    ('He said to me, "Exercise daily."', "He advised me to exercise daily."),
    ('She said to me, "Save money."', "She advised me to save money."),
    ('He said to me, "Respect elders."', "He advised me to respect elders."),
    ('She said to me, "Help others."', "She advised me to help others."),
    ('He said to me, "Read daily."', "He advised me to read daily."),
    ('She said to me, "Sleep early."', "She advised me to sleep early."),
    ('He said to me, "Eat healthy food."', "He advised me to eat healthy food."),
    ('She said to me, "Keep quiet."', "She advised me to keep quiet."),
    ('He said to me, "Never give up."', "He advised me never to give up."),
]
for d, c in IMP:
    add("imperative", d, c)

# ---- exclamatory ----
EXCL = [
    ('He said, "What a beautiful scene!"', "He exclaimed that it was a very beautiful scene."),
    ('She said, "How lovely!"', "She exclaimed that it was very lovely."),
    ('He said, "What a fool I am!"', "He exclaimed that he was a great fool."),
    ('She said, "How clever she is!"', "She exclaimed that she was very clever."),
    ('He said, "What a pity!"', "He exclaimed that it was a pity."),
    ('She said, "How sad!"', "She exclaimed that it was very sad."),
    ('He said, "What a good idea!"', "He exclaimed that it was a very good idea."),
    ('She said, "How beautiful the flower is!"', "She exclaimed that the flower was very beautiful."),
    ('He said, "What a tall building!"', "He exclaimed that it was a very tall building."),
    ('She said, "How fast he runs!"', "She exclaimed that he ran very fast."),
    ('He said, "What a narrow escape!"', "He exclaimed that it was a narrow escape."),
    ('She said, "How sweet the song is!"', "She exclaimed that the song was very sweet."),
    ('He said, "What a wonderful day!"', "He exclaimed that it was a wonderful day."),
    ('She said, "How kind you are!"', "She exclaimed that I was very kind."),
    ('He said, "What a mistake!"', "He exclaimed that it was a mistake."),
    ('She said, "How cold it is!"', "She exclaimed that it was very cold."),
    ('He said, "What a surprise!"', "He exclaimed that it was a surprise."),
    ('She said, "How well she sings!"', "She exclaimed that she sang very well."),
    ('He said, "What a big house!"', "He exclaimed that it was a big house."),
    ('She said, "How interesting!"', "She exclaimed that it was very interesting."),
]
for d, c in EXCL:
    add("exclamatory", d, c)

# ---- optative ----
OPT = [
    ('He said, "May you live long!"', "He wished that I might live long."),
    ('She said, "May God bless you!"', "She prayed that God might bless me."),
    ('He said, "May he succeed!"', "He wished that he might succeed."),
    ('She said, "May you be happy!"', "She wished that I might be happy."),
    ('He said, "May peace prevail!"', "He wished that peace might prevail."),
    ('She said, "May we meet again!"', "She wished that we might meet again."),
    ('He said, "May God help us!"', "He prayed that God might help us."),
    ('She said, "May you prosper!"', "She wished that I might prosper."),
    ('He said, "May the king live long!"', "He wished that the king might live long."),
    ('She said, "May it rain soon!"', "She wished that it might rain soon."),
]
for d, c in OPT:
    add("optative", d, c)

# ---- universal truths ----
UNIV = [
    ('He said, "The sun rises in the east."', "He said that the sun rises in the east."),
    ('She said, "Water boils at 100 degrees Celsius."', "She said that water boils at 100 degrees Celsius."),
    ('He said, "The earth revolves around the sun."', "He said that the earth revolves around the sun."),
    ('She said, "Honesty is the best policy."', "She said that honesty is the best policy."),
    ('He said, "Two and two make four."', "He said that two and two make four."),
    ('She said, "The moon shines at night."', "She said that the moon shines at night."),
    ('He said, "Birds fly in the sky."', "He said that birds fly in the sky."),
    ('She said, "Ice melts in heat."', "She said that ice melts in heat."),
    ('He said, "The Ganga is a sacred river."', "He said that the Ganga is a sacred river."),
    ('She said, "Time is precious."', "She said that time is precious."),
]
for d, c in UNIV:
    add("universal", d, c)


def pick_dists(correct, kind):
    cands = []
    if kind in ("assertive", "universal"):
        cands += [correct.replace(" that ", " if "), correct.replace(" that ", " whether ")]
    elif kind == "interrogative":
        cands += [correct.replace(" if ", " that "), correct.replace(" asked ", " said ")]
    elif kind == "imperative":
        cands += [correct.replace(" to ", " that "), correct.replace(" ordered ", " requested ")]
    elif kind == "exclamatory":
        cands += [correct.replace(" exclaimed ", " said "), correct.replace(" very ", " ")]
    elif kind == "optative":
        cands += [correct.replace(" might ", " may "), correct.replace(" wished ", " said ")]
    for a, b in ((" was ", " is "), (" had ", " has "), (" would ", " will "), (" could ", " can ")):
        if a in correct:
            cands.append(correct.replace(a, b, 1))
    out = []
    for c in cands:
        c = c.replace("  ", " ").strip()
        if c != correct and c not in out:
            out.append(c)
        if len(out) == 3:
            break
    while len(out) < 3:
        out.append(correct + " (incorrect form)")
    return out


for r in rows:
    r["dists"] = [(d, d) for d in pick_dists(r["correct"][0], r["_kind"])]
    del r["_kind"]

append(LEAF, rows)
