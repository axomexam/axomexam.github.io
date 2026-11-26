#!/usr/bin/env python3
"""Non-finite Verbs: 160 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from grammar_bank import append

LEAF = "non-finite-verbs"

# (sentence, correct, kind, base, past, pp)
ITEMS = [
    ("She enjoys ___ novels.", "reading", "ger", "read", "read", "read"),
    ("He avoids ___ sugar.", "eating", "ger", "eat", "ate", "eaten"),
    ("Do you mind ___ the door?", "opening", "ger", "open", "opened", "opened"),
    ("She suggested ___ a doctor.", "consulting", "ger", "consult", "consulted", "consulted"),
    ("He keeps ___ questions.", "asking", "ger", "ask", "asked", "asked"),
    ("I finished ___ the letter.", "writing", "ger", "write", "wrote", "written"),
    ("He admitted ___ a mistake.", "making", "ger", "make", "made", "made"),
    ("She denied ___ the money.", "taking", "ger", "take", "took", "taken"),
    ("I am considering ___ the job.", "taking", "ger", "take", "took", "taken"),
    ("He practises ___ the guitar.", "playing", "ger", "play", "played", "played"),
    ("She risked ___ her job.", "losing", "ger", "lose", "lost", "lost"),
    ("I cannot imagine ___ there.", "living", "ger", "live", "lived", "lived"),
    ("He missed ___ the train.", "catching", "ger", "catch", "caught", "caught"),
    ("They postponed ___ the meeting.", "holding", "ger", "hold", "held", "held"),
    ("I recommend ___ rest.", "taking", "ger", "take", "took", "taken"),
    ("She dislikes ___ in queues.", "waiting", "ger", "wait", "waited", "waited"),
    ("The job involves ___ with people.", "dealing", "ger", "deal", "dealt", "dealt"),
    ("He mentioned ___ the letter.", "receiving", "ger", "receive", "received", "received"),
    ("I cannot tolerate ___ noise.", "making", "ger", "make", "made", "made"),
    ("We appreciate ___ us.", "helping", "ger", "help", "helped", "helped"),
    ("They enjoy ___ football.", "playing", "ger", "play", "played", "played"),
    ("She avoids ___ late.", "coming", "ger", "come", "came", "come"),
    ("Would you mind ___ quiet?", "keeping", "ger", "keep", "kept", "kept"),
    ("He suggested ___ a taxi.", "taking", "ger", "take", "took", "taken"),
    ("She keeps ___ her keys.", "losing", "ger", "lose", "lost", "lost"),
    ("They finished ___ dinner.", "cooking", "ger", "cook", "cooked", "cooked"),
    ("She admitted ___ the window.", "breaking", "ger", "break", "broke", "broken"),
    ("He denied ___ the letter.", "writing", "ger", "write", "wrote", "written"),
    ("They are considering ___ a house.", "buying", "ger", "buy", "bought", "bought"),
    ("She practises ___ every morning.", "singing", "ger", "sing", "sang", "sung"),
    ("He risked ___ his life.", "saving", "ger", "save", "saved", "saved"),
    ("She imagined ___ on the beach.", "walking", "ger", "walk", "walked", "walked"),
    ("I missed ___ him at the station.", "seeing", "ger", "see", "saw", "seen"),
    ("They postponed ___ the match.", "playing", "ger", "play", "played", "played"),
    ("She recommended ___ the museum.", "visiting", "ger", "visit", "visited", "visited"),
    ("He dislikes ___ up early.", "getting", "ger", "get", "got", "got"),
    ("The project involves ___ a lot of data.", "collecting", "ger", "collect", "collected", "collected"),
    ("She mentioned ___ him before.", "meeting", "ger", "meet", "met", "met"),
    ("He cannot tolerate ___ lies.", "telling", "ger", "tell", "told", "told"),
    ("I appreciate ___ your time.", "taking", "ger", "take", "took", "taken"),
    ("She wants ___ home.", "to go", "inf", "go", "went", "gone"),
    ("He needs ___ a doctor.", "to see", "inf", "see", "saw", "seen"),
    ("They decided ___ early.", "to leave", "inf", "leave", "left", "left"),
    ("She hopes ___ the prize.", "to win", "inf", "win", "won", "won"),
    ("They plan ___ Delhi.", "to visit", "inf", "visit", "visited", "visited"),
    ("He promised ___ me.", "to help", "inf", "help", "helped", "helped"),
    ("She agreed ___ with us.", "to come", "inf", "come", "came", "come"),
    ("They refused ___ the fine.", "to pay", "inf", "pay", "paid", "paid"),
    ("He offered ___ my bag.", "to carry", "inf", "carry", "carried", "carried"),
    ("She managed ___ the work.", "to finish", "inf", "finish", "finished", "finished"),
    ("They failed ___ on time.", "to reach", "inf", "reach", "reached", "reached"),
    ("He cannot afford ___ a car.", "to buy", "inf", "buy", "bought", "bought"),
    ("She learned ___ at five.", "to swim", "inf", "swim", "swam", "swum"),
    ("He chose ___ medicine.", "to study", "inf", "study", "studied", "studied"),
    ("They expect ___ soon.", "to arrive", "inf", "arrive", "arrived", "arrived"),
    ("She intends ___ the exam.", "to take", "inf", "take", "took", "taken"),
    ("He pretended ___ asleep.", "to be", "inf", "be", "was", "been"),
    ("She seems ___ the answer.", "to know", "inf", "know", "knew", "known"),
    ("He appears ___ tired.", "to be", "inf", "be", "was", "been"),
    ("They want ___ the match.", "to watch", "inf", "watch", "watched", "watched"),
    ("She needs ___ more time.", "to finish", "inf", "finish", "finished", "finished"),
    ("He decided ___ the offer.", "to accept", "inf", "accept", "accepted", "accepted"),
    ("They hope ___ the train.", "to catch", "inf", "catch", "caught", "caught"),
    ("She plans ___ a business.", "to start", "inf", "start", "started", "started"),
    ("They promised ___ on time.", "to arrive", "inf", "arrive", "arrived", "arrived"),
    ("He agreed ___ the terms.", "to accept", "inf", "accept", "accepted", "accepted"),
    ("She refused ___ the question.", "to answer", "inf", "answer", "answered", "answered"),
    ("They offered ___ us.", "to help", "inf", "help", "helped", "helped"),
    ("He managed ___ the door.", "to open", "inf", "open", "opened", "opened"),
    ("She failed ___ the exam.", "to pass", "inf", "pass", "passed", "passed"),
    ("They cannot afford ___ abroad.", "to travel", "inf", "travel", "travelled", "travelled"),
    ("He learned ___ the piano.", "to play", "inf", "play", "played", "played"),
    ("She chose ___ English.", "to study", "inf", "study", "studied", "studied"),
    ("He expects ___ a reply.", "to get", "inf", "get", "got", "got"),
    ("They intend ___ the house.", "to sell", "inf", "sell", "sold", "sold"),
    ("She pretended ___ ill.", "to be", "inf", "be", "was", "been"),
    ("He seems ___ us.", "to ignore", "inf", "ignore", "ignored", "ignored"),
    ("They appear ___ the news.", "to know", "inf", "know", "knew", "known"),
    ("She tends ___ late.", "to arrive", "inf", "arrive", "arrived", "arrived"),
    ("Let him ___ home.", "go", "bare", "go", "went", "gone"),
    ("She made me ___ for an hour.", "wait", "bare", "wait", "waited", "waited"),
    ("They let us ___ the library.", "use", "bare", "use", "used", "used"),
    ("He made her ___ for the mistake.", "apologise", "bare", "apologise", "apologised", "apologised"),
    ("You had better ___ a doctor.", "see", "bare", "see", "saw", "seen"),
    ("I would rather ___ home.", "stay", "bare", "stay", "stayed", "stayed"),
    ("She can ___ well.", "swim", "bare", "swim", "swam", "swum"),
    ("We must ___ the rules.", "obey", "bare", "obey", "obeyed", "obeyed"),
    ("He dare not ___ to me.", "speak", "bare", "speak", "spoke", "spoken"),
    ("They need not ___ today.", "come", "bare", "come", "came", "come"),
    ("I heard her ___ a song.", "sing", "bare", "sing", "sang", "sung"),
    ("We watched the sun ___ behind the hills.", "set", "bare", "set", "set", "set"),
    ("She felt the ground ___ under her feet.", "shake", "bare", "shake", "shook", "shaken"),
    ("He noticed a man ___ the room.", "enter", "bare", "enter", "entered", "entered"),
    ("Let me ___ you.", "help", "bare", "help", "helped", "helped"),
    ("They made him ___ the fine.", "pay", "bare", "pay", "paid", "paid"),
    ("I saw the boy ___ from the tree.", "fall", "bare", "fall", "fell", "fallen"),
    ("You had better ___ now.", "leave", "bare", "leave", "left", "left"),
    ("We would rather ___ than drive.", "walk", "bare", "walk", "walked", "walked"),
    ("He cannot but ___ at the joke.", "laugh", "bare", "laugh", "laughed", "laughed"),
    ("The ___ baby slept peacefully.", "crying", "pres", "cry", "cried", "cried"),
    ("___ through the window, she saw a bird.", "Looking", "pres", "look", "looked", "looked"),
    ("He sat by the fire, ___ a book.", "reading", "pres", "read", "read", "read"),
    ("___ down the road, he met an old friend.", "Walking", "pres", "walk", "walked", "walked"),
    ("The ___ girl smiled at us.", "dancing", "pres", "dance", "danced", "danced"),
    ("She stood at the door, ___ for the bus.", "waiting", "pres", "wait", "waited", "waited"),
    ("___ the news, he was shocked.", "Hearing", "pres", "hear", "heard", "heard"),
    ("The ___ leaves covered the ground.", "falling", "pres", "fall", "fell", "fallen"),
    ("He kept me ___ for an hour.", "waiting", "pres", "wait", "waited", "waited"),
    ("I found her ___ in the garden.", "sitting", "pres", "sit", "sat", "sat"),
    ("The ___ glass lay on the floor.", "broken", "past", "break", "broke", "broken"),
    ("___ by everyone, he left the room.", "Criticised", "past", "criticise", "criticised", "criticised"),
    ("The ___ book was on the table.", "torn", "past", "tear", "tore", "torn"),
    ("She looked at the ___ window.", "broken", "past", "break", "broke", "broken"),
    ("___ in 1950, the building is old.", "Built", "past", "build", "built", "built"),
    ("The ___ car was towed away.", "damaged", "past", "damage", "damaged", "damaged"),
    ("He sat on a ___ chair.", "broken", "past", "break", "broke", "broken"),
    ("___ with the result, she smiled.", "Pleased", "past", "please", "pleased", "pleased"),
    ("The ___ letter was never sent.", "written", "past", "write", "wrote", "written"),
    ("___ by the teacher, the boy improved.", "Encouraged", "past", "encourage", "encouraged", "encouraged"),
    ("___ his work, he went out.", "Having finished", "perf", "finish", "finished", "finished"),
    ("___ the letter, she posted it.", "Having written", "perf", "write", "wrote", "written"),
    ("___ his dinner, he went to bed.", "Having eaten", "perf", "eat", "ate", "eaten"),
    ("___ the truth, he apologised.", "Having learnt", "perf", "learn", "learnt", "learnt"),
    ("___ the match, the team celebrated.", "Having won", "perf", "win", "won", "won"),
    ("___ for hours, they were tired.", "Having walked", "perf", "walk", "walked", "walked"),
    ("___ the book, she returned it.", "Having read", "perf", "read", "read", "read"),
    ("___ the news, he called his mother.", "Having heard", "perf", "hear", "heard", "heard"),
    ("___ the mistake, she corrected it.", "Having noticed", "perf", "notice", "noticed", "noticed"),
    ("___ all the questions, he left the hall.", "Having answered", "perf", "answer", "answered", "answered"),
    ("The work needs ___ urgently.", "to be done", "pass", "do", "did", "done"),
    ("The house wants ___ before winter.", "to be painted", "pass", "paint", "painted", "painted"),
    ("The car needs ___ today.", "to be washed", "pass", "wash", "washed", "washed"),
    ("The letter is ___ today.", "to be posted", "pass", "post", "posted", "posted"),
    ("The problem is difficult ___ .", "to be solved", "pass", "solve", "solved", "solved"),
    ("She hates ___ at parties.", "being ignored", "pass", "ignore", "ignored", "ignored"),
    ("He remembers ___ by his teacher.", "being praised", "pass", "praise", "praised", "praised"),
    ("The child enjoys ___ by everyone.", "being loved", "pass", "love", "loved", "loved"),
    ("The rule needs ___ strictly.", "to be followed", "pass", "follow", "followed", "followed"),
    ("The room requires ___ before the guests arrive.", "to be cleaned", "pass", "clean", "cleaned", "cleaned"),
    ("It is easy ___ but hard to do.", "to say", "inf", "say", "said", "said"),
    ("He is too weak ___ alone.", "to walk", "inf", "walk", "walked", "walked"),
    ("She is old enough ___ in the election.", "to vote", "inf", "vote", "voted", "voted"),
    ("It is important ___ daily.", "to exercise", "inf", "exercise", "exercised", "exercised"),
    ("He was the first ___ at the party.", "to arrive", "inf", "arrive", "arrived", "arrived"),
    ("She has nothing ___ today.", "to do", "inf", "do", "did", "done"),
    ("There is no time ___ .", "to waste", "inf", "waste", "wasted", "wasted"),
    ("He is likely ___ the match.", "to win", "inf", "win", "won", "won"),
    ("It is kind of you ___ me.", "to help", "inf", "help", "helped", "helped"),
    ("She was happy ___ me.", "to see", "inf", "see", "saw", "seen"),
    ("___ is good exercise.", "Swimming", "subj", "swim", "swam", "swum"),
    ("___ books is her hobby.", "Reading", "subj", "read", "read", "read"),
    ("___ is believing.", "Seeing", "subj", "see", "saw", "seen"),
    ("___ is a bad habit.", "Smoking", "subj", "smoke", "smoked", "smoked"),
    ("___ early is good for health.", "Waking", "subj", "wake", "woke", "woken"),
    ("___ is not allowed here.", "Parking", "subj", "park", "parked", "parked"),
    ("___ requires practice.", "Dancing", "subj", "dance", "danced", "danced"),
    ("___ in the library is prohibited.", "Talking", "subj", "talk", "talked", "talked"),
    ("___ helps reduce stress.", "Exercising", "subj", "exercise", "exercised", "exercised"),
    ("___ is her favourite pastime.", "Painting", "subj", "paint", "painted", "painted"),
]

rows = []


DOUBLE = {"set", "get", "run", "swim", "sit", "cut", "stop", "plan", "begin",
          "win", "shop", "drop", "put", "hit", "let", "shut", "split", "admit",
          "refer", "prefer", "occur", "regret", "travel", "cancel"}


def ing_form(b):
    if b == "be":
        return "being"
    if b in ("see", "agree", "free"):
        return b + "ing"
    if b == "die":
        return "dying"
    if b in DOUBLE:
        return b + b[-1] + "ing"
    if b.endswith("e"):
        return b[:-1] + "ing"
    return b + "ing"


def dists_for(kind, base, past, pp):
    ing = ing_form(base)
    if kind == "ger":
        return ["to " + base, base, past]
    if kind == "inf":
        return [ing, base, pp]
    if kind == "bare":
        return ["to " + base, ing, past]
    if kind == "pres":
        return ["to " + base, base, past]
    if kind == "past":
        return ["to " + base, ing, past]
    if kind == "perf":
        return ["To " + base, ing, pp]
    if kind == "pass":
        return ["to " + base, ing, pp]
    return ["To " + base, base, past]


for s, correct, kind, base, past, pp in ITEMS:
    d = [x for x in dists_for(kind, base, past, pp) if x != correct]
    for f in ["to " + base, ing_form(base), past, pp, base, past + "ed", "having " + pp]:
        if f != correct and f not in d:
            d.append(f)
        if len(d) == 3:
            break
    d = d[:3]
    rows.append({
        "stem": "Choose the correct non-finite form: " + s,
        "stem_as": "শুদ্ধ অ-সমাপিকা ক্ৰিয়া ৰূপ বাছনি কৰা: " + s,
        "correct": (correct, correct),
        "dists": [(x, x) for x in d],
        "exp_en": "The sentence requires this non-finite form: " + correct + ".",
        "exp_as": "বাক্যটোত এই অ-সমাপিকা ৰূপ '" + correct + "' প্ৰয়োজন।",
    })

append(LEAF, rows)
