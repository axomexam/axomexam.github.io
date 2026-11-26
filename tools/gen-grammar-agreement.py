#!/usr/bin/env python3
"""Subject-Verb Agreement: 160 bilingual questions."""

import sys
sys.path.insert(0, "tools")
from grammar_bank import append

LEAF = "subject-verb-agreement"

REASON = {
    "sing": ("A singular subject takes a singular verb.",
             "একবচন কৰ্তাই একবচন ক্ৰিয়া লয়।"),
    "plur": ("A plural subject takes a plural verb.",
             "বহুবচন কৰ্তাই বহুবচন ক্ৰিয়া লয়।"),
    "prox": ("When subjects are joined by 'or/nor', the verb agrees with the nearer subject.",
             "'or/nor' ৰে সংযুক্ত কৰ্তাৰ ক্ষেত্ৰত ক্ৰিয়া ওচৰৰ কৰ্তাৰ সৈতে মিলে।"),
    "coll": ("A collective noun acting as one unit takes a singular verb.",
             "সমষ্টিবাচক বিশেষ্যই এটা একক হিচাপে কাম কৰিলে একবচন ক্ৰিয়া লয়।"),
    "plural_only": ("'Police' and 'cattle' always take a plural verb.",
                    "'Police' আৰু 'cattle' সদায় বহুবচন ক্ৰিয়া লয়।"),
    "indef": ("Indefinite pronouns such as everyone, nobody and each take a singular verb.",
              "everyone, nobody, each আদি অনিৰ্দিষ্ট সৰ্বনামে একবচন ক্ৰিয়া লয়।"),
    "oneof": ("'One of' is followed by a plural noun but takes a singular verb.",
              "'One of'ৰ পিছত বহুবচন বিশেষ্য আহে, কিন্তু ক্ৰিয়া একবচন হয়।"),
    "numberof": ("'A number of' takes a plural verb; 'the number of' takes a singular verb.",
                 "'A number of' ৰ সৈতে বহুবচন ক্ৰিয়া; 'the number of' ৰ সৈতে একবচন ক্ৰিয়া।"),
    "amount": ("Amounts, distances and periods of time are treated as a single unit.",
               "পৰিমাণ, দূৰত্ব আৰু সময়ৰ কালক এটা একক হিচাপে ধৰা হয়।"),
    "news": ("News, subjects like mathematics and book titles ending in -s take a singular verb.",
             "News, mathematics আদি বিষয় আৰু -s ৰে শেষ হোৱা গ্ৰন্থৰ নামে একবচন ক্ৰিয়া লয়।"),
    "there": ("In 'there is/are', the verb agrees with the noun that follows.",
              "'there is/are' ত ক্ৰিয়া পিছৰ বিশেষ্যৰ সৈতে মিলে।"),
}

FORMS = {
    "play": ("plays", "played", "playing"), "sing": ("sings", "sang", "singing"),
    "bark": ("barks", "barked", "barking"), "grow": ("grows", "grew", "grown"),
    "teach": ("teaches", "taught", "teaching"), "fly": ("flies", "flew", "flown"),
    "work": ("works", "worked", "working"), "flow": ("flows", "flowed", "flowing"),
    "study": ("studies", "studied", "studying"), "leave": ("leaves", "left", "leaving"),
    "open": ("opens", "opened", "opening"), "stop": ("stops", "stopped", "stopping"),
    "treat": ("treats", "treated", "treating"), "help": ("helps", "helped", "helping"),
    "control": ("controls", "controlled", "controlling"), "labour": ("labours", "laboured", "labouring"),
    "function": ("functions", "functioned", "functioning"), "glow": ("glows", "glowed", "glowing"),
    "ring": ("rings", "rang", "rung"), "know": ("knows", "knew", "known"),
    "need": ("needs", "needed", "needing"), "get": ("gets", "got", "gotten"),
    "win": ("wins", "won", "winning"), "lead": ("leads", "led", "leading"),
}
BE = {
    "is": ["are", "was", "were"], "are": ["is", "was", "were"],
    "was": ["were", "is", "are"], "were": ["was", "is", "are"],
    "has": ["have", "had", "is"], "have": ["has", "had", "are"],
    "can": ["could", "may", "must"], "knows": ["know", "knew", "known"],
}
REV = {}
for base, trio in FORMS.items():
    for form in (base,) + trio:
        REV[form] = [x for x in (base,) + trio if x != form]


def dists_for(v):
    if v in BE:
        return BE[v]
    if v in REV:
        return REV[v][:3]
    return ["is", "are", "was"]


rows = []


def q(stem, correct, dists, key):
    dists = dists_for(correct)
    en, as_ = REASON[key]
    rows.append({
        "stem": "Choose the correct verb: " + stem,
        "stem_as": "শুদ্ধ ক্ৰিয়া বাছনি কৰা: " + stem,
        "correct": (correct, correct),
        "dists": [(d, d) for d in dists],
        "exp_en": en,
        "exp_as": as_,
    })


# singular / plural pairs
PAIRS = [
    ("The boy ___ football every evening.", "plays", "The boys ___ football every evening.", "play"),
    ("The girl ___ a song.", "sings", "The girls ___ a song.", "sing"),
    ("The dog ___ at night.", "barks", "The dogs ___ at night.", "bark"),
    ("The tree ___ tall.", "grows", "The trees ___ tall.", "grow"),
    ("The teacher ___ us English.", "teaches", "The teachers ___ us English.", "teach"),
    ("The child ___ in the park.", "plays", "The children ___ in the park.", "play"),
    ("The bird ___ in the sky.", "flies", "The birds ___ in the sky.", "fly"),
    ("The farmer ___ in the field.", "works", "The farmers ___ in the field.", "work"),
    ("The river ___ through the city.", "flows", "The rivers ___ through the city.", "flow"),
    ("The student ___ hard.", "studies", "The students ___ hard.", "study"),
    ("The bus ___ at 8 a.m.", "leaves", "The buses ___ at 8 a.m.", "leave"),
    ("The shop ___ at 9 a.m.", "opens", "The shops ___ at 9 a.m.", "open"),
    ("The train ___ at the station.", "stops", "The trains ___ at the station.", "stop"),
    ("The doctor ___ patients.", "treats", "The doctors ___ patients.", "treat"),
    ("The nurse ___ the patient.", "helps", "The nurses ___ the patient.", "help"),
    ("The policeman ___ traffic.", "controls", "The policemen ___ traffic.", "control"),
    ("The worker ___ hard.", "labours", "The workers ___ hard.", "labour"),
    ("The machine ___ well.", "functions", "The machines ___ well.", "function"),
    ("The lamp ___ brightly.", "glows", "The lamps ___ brightly.", "glow"),
    ("The bell ___ loudly.", "rings", "The bells ___ loudly.", "ring"),
]
for s1, v1, s2, v2 in PAIRS:
    q(s1, v1, [v2, v1[:-1] if v1.endswith("s") else v1 + "s", "is " + v1], "sing")
    q(s2, v2, [v1, "is " + v2, "was " + v2], "plur")

# either / neither / each / every
EACH = [
    ("Either of the boys ___ guilty.", "is"),
    ("Neither of the answers ___ correct.", "is"),
    ("Each of the students ___ a book.", "has"),
    ("Every one of the players ___ ready.", "is"),
    ("Either Rina or Rahul ___ coming.", "is"),
    ("Neither the students nor the teacher ___ present.", "was"),
    ("Each boy and each girl ___ a prize.", "gets"),
    ("Every man and every woman ___ the right to vote.", "has"),
    ("Either you or he ___ wrong.", "is"),
    ("Each of the girls ___ a dress.", "has"),
    ("Every student ___ to attend the class.", "has"),
    ("Either of the two roads ___ to the station.", "leads"),
    ("Neither of the twins ___ tall.", "is"),
    ("Each of the rooms ___ a window.", "has"),
    ("Every child ___ love.", "needs"),
    ("Either of the plans ___ acceptable.", "is"),
    ("Neither of the candidates ___ qualified.", "was"),
    ("Each of the members ___ a vote.", "has"),
    ("Every one of us ___ a role.", "has"),
    ("Either of these books ___ useful.", "is"),
    ("Neither of the doors ___ open.", "was"),
    ("Each of the workers ___ paid.", "was"),
    ("Every house on the street ___ painted.", "is"),
    ("Either of the sisters ___ coming.", "is"),
    ("Neither of the roads ___ blocked.", "was"),
]
for s, v in EACH:
    key = "prox" if (" or " in s or " nor " in s) else "indef"
    q(s, v, ["are" if v in ("is", "was") else "have", "were" if v == "was" else "are", v + "s"], key)

# collective nouns
COLL = [
    ("The team ___ playing well.", "is"),
    ("The committee ___ met.", "has"),
    ("The family ___ going on a trip.", "is"),
    ("The crowd ___ cheering loudly.", "is"),
    ("The audience ___ applauded.", "was"),
    ("The staff ___ working hard.", "is"),
    ("The class ___ studying.", "is"),
    ("The jury ___ delivered the verdict.", "has"),
    ("The government ___ taken a decision.", "has"),
    ("The police ___ investigating the case.", "are"),
    ("The cattle ___ grazing.", "are"),
    ("The flock ___ flying.", "is"),
    ("The herd ___ moving.", "is"),
    ("The fleet ___ sailing.", "is"),
    ("The committee ___ divided in opinion.", "was"),
]
for s, v in COLL:
    key = "plural_only" if ("police" in s or "cattle" in s) else "coll"
    q(s, v, ["are" if v in ("is", "was") else "have", "were" if v == "was" else "is", v + "s"], key)

# indefinite pronouns
INDEF = [
    ("Everyone ___ present.", "was"),
    ("Nobody ___ the answer.", "knows"),
    ("Someone ___ at the door.", "is"),
    ("Each of them ___ a pen.", "has"),
    ("All of the milk ___ gone.", "is"),
    ("All of the students ___ passed.", "have"),
    ("Some of the water ___ dirty.", "is"),
    ("Some of the boys ___ absent.", "were"),
    ("None of the information ___ correct.", "is"),
    ("None of the students ___ failed.", "have"),
    ("Both of them ___ here.", "are"),
    ("Few of the apples ___ ripe.", "are"),
    ("Much of the land ___ barren.", "is"),
    ("Many of the people ___ poor.", "are"),
    ("One of the boys ___ absent.", "was"),
    ("Each of the girls ___ a bag.", "has"),
    ("Everyone in the class ___ passed.", "has"),
    ("Nothing ___ been decided.", "has"),
    ("Something ___ wrong.", "is"),
    ("Anybody ___ join the club.", "can"),
]
for s, v in INDEF:
    if s.startswith("One of"):
        key = "oneof"
    elif s.startswith(("All of", "Some of", "None of", "Both", "Few", "Many")):
        key = "plur" if v in ("have", "were", "are") else "sing"
    else:
        key = "indef"
    q(s, v, ["are" if v in ("is", "was", "has") else "is", "were" if v == "was" else "was", v + "s"], key)

# one of the
ONEOF = [
    ("One of my friends ___ a doctor.", "is"),
    ("One of the students ___ won the prize.", "has"),
    ("One of the books ___ missing.", "is"),
    ("One of the girls ___ singing.", "is"),
    ("One of the players ___ injured.", "was"),
    ("One of the houses ___ empty.", "is"),
    ("One of the cars ___ stolen.", "was"),
    ("One of the trees ___ fallen.", "has"),
    ("One of the teachers ___ strict.", "is"),
    ("One of the questions ___ difficult.", "was"),
    ("One of the answers ___ correct.", "is"),
    ("One of the members ___ resigned.", "has"),
    ("One of the rooms ___ locked.", "is"),
    ("One of the letters ___ lost.", "was"),
    ("One of the shops ___ closed.", "is"),
]
for s, v in ONEOF:
    q(s, v, ["are" if v in ("is", "was") else "have", "were" if v == "was" else "are", v + "s"], "oneof")

# a number of / the number of
NUM = [
    ("A number of students ___ absent.", "were"),
    ("The number of students ___ increasing.", "is"),
    ("A number of books ___ missing.", "are"),
    ("The number of books ___ large.", "is"),
    ("A number of people ___ come.", "have"),
    ("The number of people ___ growing.", "is"),
    ("A number of trees ___ cut.", "were"),
    ("The number of trees ___ small.", "is"),
    ("A number of questions ___ asked.", "were"),
    ("The number of questions ___ limited.", "is"),
]
for s, v in NUM:
    q(s, v, ["was" if v in ("were", "are") else "are", "is" if v in ("were", "are") else "were", v + "s"], "numberof")

# amounts / news / titles
AMT = [
    ("Ten kilometres ___ a long distance.", "is"),
    ("Five hundred rupees ___ enough.", "is"),
    ("Twenty years ___ a long time.", "is"),
    ("The news ___ shocking.", "is"),
    ("Mathematics ___ my favourite subject.", "is"),
    ("Physics ___ difficult.", "is"),
    ("Economics ___ interesting.", "is"),
    ("Measles ___ a contagious disease.", "is"),
    ("The United States ___ a large country.", "is"),
    ("The Arabian Nights ___ a famous book.", "is"),
    ("Bread and butter ___ my breakfast.", "is"),
    ("Rice and curry ___ my favourite dish.", "is"),
    ("Slow and steady ___ the race.", "wins"),
    ("The poet and philosopher ___ dead.", "is"),
    ("The poet and the philosopher ___ dead.", "are"),
    ("No news ___ good news.", "is"),
    ("Ten thousand rupees ___ a big sum.", "is"),
    ("Fifty miles ___ a long way.", "is"),
    ("The scissors ___ sharp.", "are"),
    ("The trousers ___ too long.", "are"),
]
for s, v in AMT:
    key = "amount" if ("kilometres" in s or "rupees" in s or "years" in s or "miles" in s) else "news"
    if v == "wins":
        key = "sing"
    q(s, v, ["are" if v in ("is", "wins") else "is", "were" if v == "is" else "was", v + "s"], key)

# there is / there are
THERE = [
    ("There ___ a book on the table.", "is"),
    ("There ___ two books on the table.", "are"),
    ("There ___ many students in the class.", "are"),
    ("There ___ a lot of water in the tank.", "is"),
    ("There ___ a lot of people at the fair.", "are"),
    ("There ___ some milk in the fridge.", "is"),
    ("There ___ some apples in the basket.", "are"),
    ("There ___ a pen and two books.", "is"),
    ("There ___ two books and a pen.", "are"),
    ("There ___ no one in the room.", "is"),
    ("There ___ several problems.", "are"),
    ("There ___ little time left.", "is"),
    ("There ___ few chairs.", "are"),
    ("There ___ enough food for everyone.", "is"),
    ("There ___ enough chairs for everyone.", "are"),
]
for s, v in THERE:
    q(s, v, ["are" if v == "is" else "is", "was", "were"], "there")

append(LEAF, rows)
