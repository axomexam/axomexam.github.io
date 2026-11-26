#!/usr/bin/env python3
"""Articles & Determiners: 160+ bilingual fill-in questions."""

import sys
sys.path.insert(0, "tools")
from grammar_bank import append

LEAF = "articles-determiners"

ART = ["a", "an", "the", "no article"]
QUANT = ["some", "any", "much", "many"]
FEW = ["few", "a few", "little", "a little"]
DIST = ["each", "every", "either", "neither"]
DEM = ["this", "that", "these", "those"]

AS = {
    "a": "a", "an": "an", "the": "the", "no article": "কোনো article নাই",
    "some": "some", "any": "any", "much": "much", "many": "many",
    "few": "few", "a few": "a few", "little": "little", "a little": "a little",
    "each": "each", "every": "every", "either": "either", "neither": "neither",
    "this": "this", "that": "that", "these": "these", "those": "those",
}

rows = []


def q(stem, correct, pool, exp_en, exp_as):
    key = correct.lower()
    dists = [x for x in pool if x.lower() != key][:3]
    rows.append({
        "stem": stem,
        "stem_as": "শুদ্ধ বিকল্প বাছনি কৰা: " + stem,
        "correct": (correct, AS[key]),
        "dists": [(d, AS[d.lower()]) for d in dists],
        "exp_en": exp_en,
        "exp_as": exp_as,
    })


# ---- a / an by sound ----
A_WORDS = [
    ("book", "a"), ("pen", "a"), ("car", "a"), ("dog", "a"), ("house", "a"),
    ("table", "a"), ("university", "a"), ("European", "a"), ("one-eyed man", "a"),
    ("useful book", "a"), ("unique idea", "a"), ("union", "a"), ("unit", "a"),
    ("uniform", "a"), ("unicorn", "a"), ("ewe", "a"), ("yellow flower", "a"),
    ("year", "a"), ("young boy", "a"), ("BDO", "a"), ("UPSC topper", "a"),
]
AN_WORDS = [
    ("apple", "an"), ("orange", "an"), ("egg", "an"), ("umbrella", "an"),
    ("hour", "an"), ("honest man", "an"), ("heir", "an"), ("honour", "an"),
    ("MBA", "an"), ("MP", "an"), ("X-ray", "an"), ("elephant", "an"),
    ("idea", "an"), ("owl", "an"), ("aunt", "an"), ("uncle", "an"),
    ("engineer", "an"), ("artist", "an"), ("actor", "an"), ("island", "an"),
    ("old man", "an"), ("empty box", "an"), ("easy question", "an"),
    ("interesting book", "an"), ("important lesson", "an"), ("ugly insect", "an"),
    ("honest officer", "an"), ("FBI agent", "an"), ("LLB student", "an"),
    ("SDO", "an"),
]
for w, art in A_WORDS + AN_WORDS:
    vowel = art == "an"
    q(
        f"Choose the correct article: ___ {w}.",
        art,
        ART,
        f"'{w}' begins with a {'vowel' if vowel else 'consonant'} sound, so '{art}' is correct.",
        f"'{w}' {'স্বৰধ্বনি' if vowel else 'ব্যঞ্জনধ্বনি'}ৰে আৰম্ভ হয়, সেয়ে '{art}' শুদ্ধ।",
    )

# ---- contextual articles ----
CONTEXT = [
    ("He is ___ honest man.", "an", "vowel"),
    ("She bought ___ umbrella.", "an", "vowel"),
    ("I saw ___ elephant in the forest.", "an", "vowel"),
    ("He is ___ university student.", "a", "consonant"),
    ("She is ___ European tourist.", "a", "consonant"),
    ("He is ___ one-eyed man.", "a", "consonant"),
    ("It took ___ hour to finish.", "an", "vowel"),
    ("He is ___ heir to the throne.", "an", "vowel"),
    ("She is ___ MBA graduate.", "an", "vowel"),
    ("He is ___ MP from Assam.", "an", "vowel"),
    ("They took ___ X-ray of his chest.", "an", "vowel"),
    ("He is ___ NCC cadet.", "an", "vowel"),
    ("She is ___ LLB student.", "an", "vowel"),
    ("He is ___ MA in English.", "an", "vowel"),
    ("She is ___ artist.", "an", "vowel"),
    ("He is ___ engineer.", "an", "vowel"),
    ("She is ___ actor.", "an", "vowel"),
    ("He is ___ uncle of mine.", "an", "vowel"),
    ("She is ___ aunt.", "an", "vowel"),
    ("She had ___ ice cream.", "an", "vowel"),
    ("He is ___ old man.", "an", "vowel"),
    ("She carried ___ empty box.", "an", "vowel"),
    ("He asked ___ easy question.", "an", "vowel"),
    ("She read ___ interesting book.", "an", "vowel"),
    ("He gave ___ important lesson.", "an", "vowel"),
    ("She saw ___ ugly insect.", "an", "vowel"),
    ("He is ___ honest officer.", "an", "vowel"),
    ("He is ___ FBI agent.", "an", "vowel"),
    ("She is ___ SDO.", "an", "vowel"),
    ("She is ___ IAS officer.", "an", "vowel"),
    ("He is ___ IPS officer.", "an", "vowel"),
    ("She is ___ MLA.", "an", "vowel"),
    ("He is ___ NRI.", "an", "vowel"),
    ("She is ___ OBC candidate.", "an", "vowel"),
    ("He is ___ HIV patient.", "an", "vowel"),
    ("She is ___ IIT student.", "an", "vowel"),
    ("He is ___ AIIMS doctor.", "an", "vowel"),
    ("She is ___ Army officer.", "an", "vowel"),
    ("He is ___ Air Force officer.", "an", "vowel"),
    ("She is ___ Navy officer.", "a", "consonant"),
]
for s, art, kind in CONTEXT:
    vowel = kind == "vowel"
    q(
        s, art, ART,
        f"The word after the blank begins with a {'vowel' if vowel else 'consonant'} sound, so '{art}' is used.",
        f"ৰিক্ত ঠাইৰ পিছৰ শব্দ {'স্বৰধ্বনি' if vowel else 'ব্যঞ্জনধ্বনি'}ৰে আৰম্ভ হয়, সেয়ে '{art}' ব্যৱহাৰ হয়।",
    )

# ---- definite article ----
THE = [
    ("She is ___ best student in the class.", "the", "superlative"),
    ("___ sun rises in the east.", "The", "unique"),
    ("___ Brahmaputra is a big river.", "The", "river"),
    ("___ Pacific is the largest ocean.", "The", "ocean"),
    ("___ Himalayas are in Asia.", "The", "range"),
    ("He reads ___ Times of India.", "The", "newspaper"),
    ("___ Gita is a sacred book.", "The", "book"),
    ("She plays ___ piano well.", "the", "instrument"),
    ("___ French are famous for art.", "The", "nationality"),
    ("He was ___ first to arrive.", "the", "ordinal"),
    ("___ rich should help the poor.", "The", "class"),
    ("___ poor need our help.", "The", "class"),
    ("___ Ganga is a sacred river.", "The", "river"),
    ("___ Andaman Islands are beautiful.", "The", "islands"),
    ("___ Sahara is a vast desert.", "The", "desert"),
    ("___ Nile flows through Egypt.", "The", "river"),
    ("___ Mahabharata is a great epic.", "The", "book"),
    ("___ Ramayana is read in India.", "The", "book"),
    ("___ BBC is a news channel.", "The", "organisation"),
    ("___ UN was founded in 1945.", "The", "organisation"),
    ("___ Taj Mahal is in Agra.", "The", "monument"),
    ("___ Red Fort is in Delhi.", "The", "monument"),
    ("___ Bay of Bengal lies to the east.", "The", "sea"),
    ("___ Arabian Sea lies to the west.", "The", "sea"),
    ("___ Thar is a desert.", "The", "desert"),
]
THE_AS = {
    "superlative": "সৰ্বোচ্চ অৰ্থত superlative ৰ সৈতে 'the' ব্যৱহাৰ হয়",
    "unique": "একমাত্ৰ বস্তু সূচাবলৈ 'the' ব্যৱহাৰ হয়",
    "river": "নদীৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
    "ocean": "মহাসাগৰৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
    "range": "পৰ্বতমালাৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
    "newspaper": "বাতৰি কাকতৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
    "book": "পবিত্ৰ গ্ৰন্থ বা মহাকাব্যৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
    "instrument": "বাদ্যযন্ত্ৰৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
    "nationality": "জাতিৰ সমগ্ৰ সদস্য সূচাবলৈ 'the' ব্যৱহাৰ হয়",
    "ordinal": "ordinal number ৰ আগত 'the' ব্যৱহাৰ হয়",
    "class": "শ্ৰেণী সূচোৱা বিশেষণৰ আগত 'the' ব্যৱহাৰ হয়",
    "islands": "দ্বীপপুঞ্জৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
    "desert": "মৰুভূমিৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
    "organisation": "সংস্থাৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
    "monument": "স্মৃতিসৌধ বা ঐতিহাসিক স্থানৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
    "sea": "সাগৰৰ নামৰ আগত 'the' ব্যৱহাৰ হয়",
}
for s, art, kind in THE:
    q(
        s, art, ART,
        f"'{art}' is used here because {kind.replace('_', ' ')} nouns take the definite article.",
        f"ইয়াত '{art}' ব্যৱহাৰ হয় কাৰণ {THE_AS[kind]}।",
    )

# ---- some / any ----
SOME = [
    ("There is ___ milk in the fridge.", "some", "affirmative"),
    ("Is there ___ sugar in the jar?", "any", "question"),
    ("I have ___ friends in Delhi.", "some", "affirmative"),
    ("She did not buy ___ apples.", "any", "negative"),
    ("Would you like ___ tea?", "some", "offer"),
    ("He has ___ money in his pocket.", "some", "affirmative"),
    ("There aren't ___ chairs in the room.", "any", "negative"),
    ("I need ___ help with this work.", "some", "affirmative"),
    ("Do you have ___ questions?", "any", "question"),
    ("She gave me ___ advice.", "some", "affirmative"),
    ("There isn't ___ water in the pot.", "any", "negative"),
    ("Can I have ___ salt, please?", "some", "request"),
]
for s, w, kind in SOME:
    q(
        s, w, QUANT,
        f"'{w}' is used in {'affirmative sentences, offers and requests' if w == 'some' else 'negatives and questions'}.",
        f"'{w}' {'ঘোষণাত্মক বাক্য, আগ্ৰহ আৰু অনুৰোধ' if w == 'some' else 'নঞৰ্থক বাক্য আৰু প্ৰশ্ন'}ত ব্যৱহাৰ হয়।",
    )

# ---- much / many ----
MUCH = [
    ("How ___ sugar do you need?", "much"),
    ("How ___ students are there?", "many"),
    ("There isn't ___ time left.", "much"),
    ("She has ___ books.", "many"),
    ("He doesn't have ___ money.", "much"),
    ("There are ___ trees in the garden.", "many"),
    ("How ___ water is left?", "much"),
    ("She made ___ mistakes.", "many"),
    ("I don't have ___ patience.", "much"),
    ("There were ___ people at the fair.", "many"),
    ("How ___ rice do you eat?", "much"),
    ("He has ___ friends.", "many"),
    ("There is too ___ noise.", "much"),
    ("Too ___ cooks spoil the broth.", "many"),
    ("How ___ furniture do you need?", "much"),
]
for s, w in MUCH:
    unc = w == "much"
    q(
        s, w, QUANT,
        f"'{w}' is used with {'uncountable' if unc else 'countable plural'} nouns.",
        f"'{w}' {'অগণনীয়' if unc else 'গণনীয় বহুবচন'} বিশেষ্যৰ সৈতে ব্যৱহাৰ হয়।",
    )

# ---- few / a few / little / a little ----
FEWQ = [
    ("He has ___ friends, so he feels lonely.", "few"),
    ("He has ___ friends, so he is happy.", "a few"),
    ("There is ___ water in the bottle.", "little"),
    ("There is ___ water, so you can drink it.", "a little"),
    ("___ people attended the meeting.", "Few"),
    ("___ people attended, so the hall was almost full.", "A few"),
    ("She has ___ money, so she cannot buy it.", "little"),
    ("She has ___ money, so she can buy it.", "a little"),
    ("There are ___ apples left.", "a few"),
    ("There is ___ hope of his recovery.", "little"),
    ("We had ___ difficulty in finding the house.", "a little"),
    ("___ students passed the test.", "Few"),
    ("Only ___ students passed the test.", "a few"),
    ("He showed ___ interest in the subject.", "little"),
    ("He showed ___ interest and asked questions.", "a little"),
    ("There were ___ visitors today.", "a few"),
]
for s, w in FEWQ:
    pos = w.lower() in ("a few", "a little")
    cnt = "few" in w.lower()
    q(
        s, w, FEW,
        f"'{w}' means {'some' if pos else 'almost none'} with {'countable plural' if cnt else 'uncountable'} nouns.",
        f"'{w}'ৰ অৰ্থ {'কিছুমান' if pos else 'প্ৰায় নাই'} আৰু ই {'গণনীয় বহুবচন' if cnt else 'অগণনীয়'} বিশেষ্যৰ সৈতে ব্যৱহাৰ হয়।",
    )

# ---- each / every / either / neither ----
DISTQ = [
    ("___ student must bring a pen.", "Each"),
    ("___ of the boys was punished.", "Each"),
    ("___ child needs love.", "Every"),
    ("___ of the two answers is correct.", "Either"),
    ("___ of the two answers is correct because both are wrong.", "Neither"),
    ("___ road leads to the station.", "Either"),
    ("___ road leads to the station because both are blocked.", "Neither"),
    ("___ of the girls has a book.", "Each"),
    ("___ morning he goes for a walk.", "Every"),
    ("___ of us has a role to play.", "Each"),
    ("___ of the twins is tall.", "Either"),
    ("___ of the twins is tall because both are short.", "Neither"),
    ("___ student was given a certificate.", "Every"),
    ("___ of the members agreed.", "Each"),
    ("___ day brings new hope.", "Every"),
    ("___ of the two candidates will be selected.", "Either"),
]
for s, w in DISTQ:
    q(
        s, w, DIST,
        f"'{w}' is correct here: it refers to {'one of two' if w in ('Either', 'Neither') else 'members taken individually'}.",
        f"ইয়াত '{w}' শুদ্ধ: ই {'দুইৰ ভিতৰত এটা' if w in ('Either', 'Neither') else 'সদস্যসকলক এজন এজনকৈ'} সূচায়।",
    )

# ---- this / that / these / those ----
DEMQ = [
    ("___ book here is mine.", "This"),
    ("___ books here are mine.", "These"),
    ("___ book there is yours.", "That"),
    ("___ books there are yours.", "Those"),
    ("___ is my pen.", "This"),
    ("___ are my pens.", "These"),
    ("___ is your bag.", "That"),
    ("___ are your bags.", "Those"),
    ("___ weather is pleasant.", "This"),
    ("___ days were happy.", "Those"),
]
for s, w in DEMQ:
    near = w in ("This", "These")
    sing = w in ("This", "That")
    q(
        s, w, DEM,
        f"'{w}' is used for something {'near' if near else 'far'} and {'singular' if sing else 'plural'}.",
        f"'{w}' {'ওচৰ' if near else 'দূৰ'}ৰ {'একবচন' if sing else 'বহুবচন'} বস্তুৰ বাবে ব্যৱহাৰ হয়।",
    )

append(LEAF, rows)
