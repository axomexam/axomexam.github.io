#!/usr/bin/env python3
"""Question Tags & Modals: 160 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from grammar_bank import append

LEAF = "question-tags-modals"

TAGS = [
    ("She is a doctor,", "isn't she"), ("They are coming,", "aren't they"),
    ("He was late,", "wasn't he"), ("You were tired,", "weren't you"),
    ("She has finished,", "hasn't she"), ("They have left,", "haven't they"),
    ("He had gone,", "hadn't he"), ("She will come,", "won't she"),
    ("They would help,", "wouldn't they"), ("He can swim,", "can't he"),
    ("She could sing,", "couldn't she"), ("He must go,", "mustn't he"),
    ("She should study,", "shouldn't she"), ("They ought to help,", "oughtn't they"),
    ("He does not smoke,", "does he"), ("She did not come,", "did she"),
    ("They do not know,", "do they"), ("He cannot swim,", "can he"),
    ("She will not go,", "will she"), ("He is not ready,", "is he"),
    ("They are not late,", "are they"), ("He never comes late,", "does he"),
    ("Nobody came,", "did they"), ("Everyone knows,", "don't they"),
    ("Let's go,", "shall we"), ("Open the door,", "will you"),
    ("Don't go,", "will you"), ("I am right,", "aren't I"),
    ("There is a problem,", "isn't there"), ("There are no chairs,", "are there"),
    ("This is your book,", "isn't it"), ("These are yours,", "aren't they"),
    ("He used to smoke,", "didn't he"), ("She hardly speaks,", "does she"),
    ("He seldom comes,", "does he"), ("Nothing happened,", "did it"),
    ("Someone called,", "didn't they"), ("You had better go,", "hadn't you"),
    ("He need not go,", "need he"), ("She dare not speak,", "dare she"),
    ("She is singing,", "isn't she"), ("They were playing,", "weren't they"),
    ("He has been working,", "hasn't he"), ("She had been waiting,", "hadn't she"),
    ("You will be there,", "won't you"), ("They would have come,", "wouldn't they"),
    ("He can drive,", "can't he"), ("She could dance,", "couldn't she"),
    ("He must have left,", "mustn't he"), ("She should have called,", "shouldn't she"),
    ("They ought to apologise,", "oughtn't they"), ("He doesn't know,", "does he"),
    ("She didn't call,", "did she"), ("They don't care,", "do they"),
    ("He can't read,", "can he"), ("She won't agree,", "will she"),
    ("He isn't coming,", "is he"), ("They aren't ready,", "are they"),
    ("He rarely smiles,", "does he"), ("Nobody knows,", "do they"),
    ("Everyone was present,", "weren't they"), ("Let's start,", "shall we"),
    ("Close the window,", "will you"), ("Don't shout,", "will you"),
    ("I am late,", "aren't I"), ("There was a problem,", "wasn't there"),
    ("There were no tickets,", "were there"), ("That is yours,", "isn't it"),
    ("Those are mine,", "aren't they"), ("He used to teach,", "didn't he"),
    ("She hardly eats,", "does she"), ("He seldom visits,", "does he"),
    ("Nothing was lost,", "was it"), ("Someone is waiting,", "aren't they"),
    ("You had better rest,", "hadn't you"), ("He need not worry,", "need he"),
    ("They must obey,", "mustn't they"), ("He will have finished,", "won't he"),
    ("She would rather stay,", "wouldn't she"), ("We should help,", "shouldn't we"),
]

MODALS = [
    ("You ___ obey the rules.", "must"), ("She ___ swim when she was five.", "could"),
    ("___ I use your pen?", "May"), ("We ___ help the poor.", "should"),
    ("He ___ come if he wishes.", "may"), ("It ___ rain today.", "might"),
    ("You ___ not smoke here.", "must"), ("___ you please open the door?", "Could"),
    ("She ___ speak three languages.", "can"), ("You ___ see a doctor.", "should"),
    ("He ___ be at home now.", "must"), ("They ___ arrive soon.", "may"),
    ("I ___ rather stay at home.", "would"), ("You ___ better take rest.", "had"),
    ("She ___ not go out alone.", "should"), ("He ___ not have done it.", "could"),
    ("We ___ obey our parents.", "ought to"), ("You ___ not tell lies.", "must"),
    ("___ I come in?", "May"), ("He ___ play chess well.", "can"),
    ("She ___ have missed the bus.", "might"), ("They ___ have finished by now.", "should"),
    ("You ___ not worry.", "need"), ("He ___ not speak to me.", "dare"),
    ("We ___ respect our elders.", "should"), ("She ___ sing beautifully.", "can"),
    ("___ you help me, please?", "Would"), ("He ___ be tired after the journey.", "must"),
    ("They ___ be late.", "might"), ("I ___ go now.", "must"),
    ("You ___ not park here.", "may"), ("She ___ read when she was four.", "could"),
    ("He ___ have forgotten the key.", "must"), ("We ___ not waste time.", "should"),
    ("___ I borrow your book?", "May"), ("You ___ keep quiet in the library.", "must"),
    ("She ___ not come yesterday.", "could"), ("They ___ have reached by now.", "should"),
    ("He ___ rather walk than drive.", "would"), ("You ___ better see a doctor.", "had"),
    ("He ___ not swim across the river.", "could"), ("She ___ not answer the question.", "could"),
    ("We ___ not enter without permission.", "may"), ("You ___ not touch the wires.", "must"),
    ("They ___ not have known the truth.", "could"), ("He ___ not be trusted.", "can"),
    ("She ___ not have said that.", "should"), ("I ___ not like to disturb you.", "would"),
    ("You ___ not smoke in the hospital.", "must"), ("He ___ not come today.", "may"),
    ("___ you mind closing the window?", "Would"), ("___ I ask a question?", "May"),
    ("___ we go now?", "Shall"), ("___ you like some tea?", "Would"),
    ("___ he speak English?", "Can"), ("___ she play the piano?", "Can"),
    ("___ they have arrived?", "Could"), ("___ I help you?", "May"),
    ("___ we meet tomorrow?", "Shall"), ("___ you please wait?", "Would"),
    ("He ___ have been ill.", "must"), ("She ___ have gone home.", "may"),
    ("They ___ have missed the train.", "might"), ("You ___ have told me earlier.", "should"),
    ("He ___ have helped us.", "could"), ("She ___ have finished the work.", "should"),
    ("We ___ have taken an umbrella.", "should"), ("He ___ have forgotten.", "might"),
    ("You ___ have been careful.", "should"), ("They ___ have left already.", "may"),
    ("He ___ rather die than beg.", "would"), ("She ___ better apologize.", "had"),
    ("You ___ better not go.", "had"), ("He ___ not dare to speak.", "dare"),
    ("She ___ not need to come.", "need"), ("We ___ to obey the law.", "ought"),
    ("You ___ to respect your teachers.", "ought"), ("He ___ to have informed us.", "ought"),
    ("She ___ to be more careful.", "ought"), ("They ___ to have waited.", "ought"),
]

MODAL_POOL = ["can", "could", "may", "might", "must", "should", "would", "shall",
              "will", "ought to", "need", "dare", "had"]

rows = []

TAG_POOL = ["isn't it", "aren't they", "didn't he", "doesn't she", "won't you",
            "can't he", "shouldn't we", "hadn't he", "is he", "did they",
            "will you", "shall we", "aren't I", "need he", "dare she",
            "oughtn't they", "wasn't he", "haven't they"]

for i, (stmt, tag) in enumerate(TAGS):
    pool = [t for t in TAG_POOL if t != tag]
    dists = [pool[(i + k * 5) % len(pool)] for k in range(3)]
    rows.append({
        "stem": f"Choose the correct question tag: {stmt} ___?",
        "stem_as": f"শুদ্ধ question tag বাছনি কৰা: {stmt} ___?",
        "correct": (tag, tag),
        "dists": [(d, d) for d in dists],
        "exp_en": "A positive statement takes a negative tag and a negative statement takes a positive tag; the tag repeats the auxiliary and the subject pronoun.",
        "exp_as": "ঘোষণাত্মক বাক্যত নঞৰ্থক tag আৰু নঞৰ্থক বাক্যত ঘোষণাত্মক tag ব্যৱহাৰ হয়; tag ত সহায়ক ক্ৰিয়া আৰু কৰ্তৃসৰ্বনাম পুনৰাবৃত্তি হয়।",
    })

for i, (s, m) in enumerate(MODALS):
    pool = [x for x in MODAL_POOL if x != m]
    dists = [pool[(i + k * 5) % len(pool)] for k in range(3)]
    rows.append({
        "stem": "Choose the correct modal: " + s,
        "stem_as": "শুদ্ধ মডেল ক্ৰিয়া বাছনি কৰা: " + s,
        "correct": (m, m),
        "dists": [(d, d) for d in dists],
        "exp_en": f"'{m}' expresses the required meaning of ability, permission, possibility or obligation.",
        "exp_as": f"'{m}' এ সামৰ্থ্য, অনুমতি, সম্ভাৱনা বা বাধ্যবাধকতাৰ প্ৰয়োজনীয় অৰ্থ প্ৰকাশ কৰে।",
    })

append(LEAF, rows)
