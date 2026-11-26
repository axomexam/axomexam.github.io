#!/usr/bin/env python3
"""Give the DHS & DME Technical book's one-line explanations a reason.

Most explanations in the book restate the answer ("The correct spelling is
'accommodate'.", "'Do away with' is a synonym of 'abolish'."). This rewrites
those where the question itself carries the evidence:

  spelling              compare the correct spelling with each distractor and
                        say which letter is dropped, added or swapped
  synonyms / antonyms   name the sense of the answer and the glosses of the
                        three distractors
  homonyms              look the set up in a small usage table
  phrasal verbs         say what the verb means and what the distractors describe
  cloze / comprehension quote the sentence the blank sits in

Questions the strategies cannot support are left untouched, so every rewritten
explanation is grounded in the page's own text.

Idempotent: an explanation already at eight words or more is skipped.
Usage: python3 tools/enrich-book-explanations.py [--dry]
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data/exams/dhs-dme-technical")
LEGACY = os.path.join(ROOT, "tools/legacy-banks/dhs-dme-technical")
DRY = "--dry" in sys.argv
MIN_WORDS = 8

SPELLING = "spelling"
SYNONYM = "synonyms"
ANTONYM = "antonyms"
HOMOPHONE = "homonyms-confusables"
PHRASAL = "phrasal-verbs"
IDIOM = "idioms-phrases"
ONEWORD = "one-word-substitution"
ODDWORD = "word-formation-roots"
FILL = "general-vocabulary"
CONTEXT_LEAVES = {"cloze-test", "reading-comprehension", "sentence-completion"}

# word -> (English role, Assamese role)
HOMOPHONES = {
    "their": ("possessive - it belongs to them", "অধিকাৰসূচক — তেওঁলোকৰ"),
    "theirs": ("a possessive pronoun standing alone", "স্বাধীন অধিকাৰসূচক সৰ্বনাম"),
    "there": ("place, or 'there is/are'", "ঠাই, বা 'there is/are'"),
    "they're": ("the contraction of 'they are'", "'they are' ৰ সংক্ষিপ্ত ৰূপ"),
    "affect": ("a verb meaning to influence", "প্ৰভাৱিত কৰা ক্ৰিয়া"),
    "effect": ("usually a noun meaning a result", "সাধাৰণতে ফল বুজোৱা বিশেষ্য"),
    "its": ("possessive - it belongs to it", "অধিকাৰসূচক — ইয়াৰ"),
    "it's": ("the contraction of 'it is'", "'it is' ৰ সংক্ষিপ্ত ৰূপ"),
    "lose": ("a verb meaning to be deprived of", "হেৰুওৱা ক্ৰিয়া"),
    "loose": ("an adjective meaning not tight", "ঢিলা অৰ্থৰ বিশেষণ"),
    "then": ("a time word meaning next", "পৰৱৰ্তী সময় বুজোৱা শব্দ"),
    "than": ("used to compare two things", "তুলনা কৰিবলৈ ব্যৱহাৰ হয়"),
    "principal": ("the head of an institution, or 'main'", "প্ৰধান / প্ৰধান শিক্ষক"),
    "principle": ("a rule or belief", "নীতি বা বিশ্বাস"),
    "stationary": ("not moving", "স্থিৰ, গতি নকৰা"),
    "stationery": ("paper and pens", "লিখা-পঢ়াৰ সামগ্ৰী"),
    "advice": ("a noun meaning guidance", "পৰামৰ্শ (বিশেষ্য)"),
    "advise": ("a verb meaning to give guidance", "পৰামৰ্শ দিয়া (ক্ৰিয়া)"),
    "practice": ("the noun in British usage", "অনুশীলন (বিশেষ্য)"),
    "practise": ("the verb in British usage", "অনুশীলন কৰা (ক্ৰিয়া)"),
    "accept": ("a verb meaning to receive", "গ্ৰহণ কৰা"),
    "except": ("a preposition meaning 'apart from'", "বাহিৰে"),
    "quiet": ("an adjective meaning silent", "শান্ত"),
    "quite": ("an adverb meaning fairly", "বৰ বেছি নহয়, যথেষ্ট"),
    "weather": ("the state of the atmosphere", "বতৰ"),
    "whether": ("used to introduce a choice", "হয় নে নহয়"),
    "desert": ("a dry region, or to abandon", "মৰুভূমি / এৰি যোৱা"),
    "dessert": ("the sweet course", "মিঠাই"),
    "passed": ("the past tense of 'pass'", "'pass' ৰ অতীত ৰূপ"),
    "past": ("time gone by, or a preposition", "অতীত / কাষৰপৰা"),
    "complement": ("something that completes", "পূৰক"),
    "compliment": ("praise", "প্ৰশংসা"),
    "council": ("a governing body", "পৰিষদ"),
    "counsel": ("advice, or to advise", "পৰামৰ্শ"),
    "cite": ("to quote", "উদ্ধৃতি দিয়া"),
    "site": ("a place", "স্থান"),
    "sight": ("the ability to see, or a view", "দৃষ্টি"),
    "born": ("brought into life", "জন্মগ্ৰহণ"),
    "borne": ("carried", "কঢ়িয়াই লোৱা"),
    "lie": ("to rest, intransitive", "শুই থকা (অকৰ্মক)"),
    "lay": ("to put something down, transitive", "থৈ দিয়া (সকৰ্মক)"),
    "rise": ("to go up on its own", "নিজে উঠা"),
    "raise": ("to lift something", "দাঙা"),
    "borrow": ("to take and return", "ধাৰ লোৱা"),
    "lend": ("to give temporarily", "ধাৰ দিয়া"),
    "your": ("possessive - belonging to you", "তোমাৰ"),
    "you're": ("the contraction of 'you are'", "'you are' ৰ সংক্ষিপ্ত ৰূপ"),
    "whose": ("possessive - of whom", "কাৰ"),
    "who's": ("the contraction of 'who is'", "'who is' ৰ সংক্ষিপ্ত ৰূপ"),
    "to": ("a preposition or part of the infinitive", "অনুসৰ্গ / infinitive ৰ অংশ"),
    "too": ("an adverb meaning 'also' or 'excessively'", "'বঢ়িয়াও' বা 'অত্যধিক'"),
    "two": ("the number 2", "সংখ্যা ২"),
    "of": ("a preposition showing belonging", "সম্পৰ্কসূচক অনুসৰ্গ"),
    "off": ("away from, or not on", "আঁতৰত / বন্ধ"),
    "hear": ("to perceive sound", "শুনা"),
    "here": ("in this place", "ইয়াত"),
    "brake": ("the device that stops a vehicle", "ব্ৰেক"),
    "break": ("to separate into pieces", "ভঙা"),
    "fair": ("just, or light in colour", "ন্যায়পৰায়ণ"),
    "fare": ("the price of a journey", "ভাড়া"),
    "allowed": ("permitted", "অনুমতি দিয়া"),
    "aloud": ("out loud", "উচ্চস্বৰে"),
    "whole": ("complete", "সম্পূৰ্ণ"),
    "hole": ("an opening", "ফুটা"),
}

# phrasal verb sense, used when the option text alone is too thin
NOTES = {}


def words(s):
    return len(str(s).split())


def gloss(o):
    """Assamese gloss only when it adds information."""
    as_ = str(o.get("as") or "").strip()
    en = str(o.get("en") or "").strip()
    if not as_ or as_.lower() == en.lower():
        return ""
    return as_


def with_gloss(o):
    g = gloss(o)
    return f'{o["en"]} ({g})' if g else str(o["en"])


def spelling_diff(correct, wrong):
    p = 0
    while p < min(len(correct), len(wrong)) and correct[p].lower() == wrong[p].lower():
        p += 1
    s = 0
    while s < min(len(correct), len(wrong)) - p and correct[-1 - s].lower() == wrong[-1 - s].lower():
        s += 1
    return correct[p:len(correct) - s], wrong[p:len(wrong) - s]


def en_spelling_note(correct, wrong):
    c_mid, w_mid = spelling_diff(correct, wrong)
    if w_mid == "" and c_mid:
        return f'"{wrong}" drops the "{c_mid}"'
    if c_mid == "" and w_mid:
        return f'"{wrong}" adds an extra "{w_mid}"'
    return f'"{wrong}" writes "{w_mid}" where the correct form has "{c_mid}"'


def as_spelling_note(correct, wrong):
    c_mid, w_mid = spelling_diff(correct, wrong)
    if w_mid == "" and c_mid:
        return f'"{wrong}" ত "{c_mid}" নাই'
    if c_mid == "" and w_mid:
        return f'"{wrong}" ত বেছি এটা "{w_mid}" আছে'
    return f'"{wrong}" ত "{c_mid}" ৰ ঠাইত "{w_mid}" আছে'


def doubled(word):
    out = []
    for ch in re.findall(r"([a-z])\1", word.lower()):
        if ch not in out:
            out.append(ch)
    return out


def explain_spelling(q):
    opts = [o["en"] for o in q["options"]]
    ans = opts[q["correct"]]
    others = [o for i, o in enumerate(opts) if i != q["correct"]]
    dbl = doubled(ans)
    if dbl:
        en_dbl = " and ".join(f'double "{c}"' for c in dbl)
        as_dbl = " আৰু ".join(f'"{c}"' for c in dbl)
        en = (f'"{ans}" is the correct spelling: it keeps the {en_dbl}. '
              + "; ".join(en_spelling_note(ans, o) for o in others) + ".")
        as_ = (f'শুদ্ধ বানান "{ans}" — ইয়াত {as_dbl} দুবাৰকৈ আছে। '
               + ", ".join(as_spelling_note(ans, o) for o in others) + "।")
    else:
        en = (f'"{ans}" is the only correct spelling here: '
              + "; ".join(en_spelling_note(ans, o) for o in others) + ".")
        as_ = (f'"{ans}" হে ইয়াত শুদ্ধ বানান: '
               + ", ".join(as_spelling_note(ans, o) for o in others) + "।")
    return en, as_


def target_word(q):
    m = re.search(r"'([^']+)'", q["q"]["en"])
    return m.group(1) if m else ""


def explain_synonym(q):
    opts = q["options"]
    ans = opts[q["correct"]]
    others = [o for i, o in enumerate(opts) if i != q["correct"]]
    target = target_word(q)
    en_list = ", ".join(with_gloss(o) for o in others)
    if target:
        en = (f'"{ans["en"]}" carries the same sense as "{target}". '
              f'The other options — {en_list} — mean something different, so none of them can replace it here.')
        as_ = (f'"{ans["en"]}" ৰ অৰ্থ "{target}" ৰ সৈতে একেই। '
               f'বাকী বিকল্পবোৰ — {en_list} — বেলেগ অৰ্থ দিয়ে, সেয়ে ইয়াত খাপ নাখায়।')
    else:
        en = f'"{ans["en"]}" is the option that fits. The others — {en_list} — carry different meanings.'
        as_ = f'"{ans["en"]}" হে ইয়াত খাপ খায়। বাকীবোৰ — {en_list} — বেলেগ অৰ্থ দিয়ে।'
    return en, as_


def explain_antonym(q):
    opts = q["options"]
    ans = opts[q["correct"]]
    others = [o for i, o in enumerate(opts) if i != q["correct"]]
    target = target_word(q)
    en_list = ", ".join(with_gloss(o) for o in others)
    if target:
        en = (f'"{ans["en"]}" is the opposite of "{target}". The other options — {en_list} — '
              f'are closer to "{target}" in meaning, so they cannot be its antonym.')
        as_ = (f'"{ans["en"]}" হৈছে "{target}" ৰ বিপৰীত। বাকী বিকল্পবোৰ — {en_list} — '
               f'অৰ্থত "{target}" ৰ ওচৰত, সেয়ে ইহঁত বিপৰীত শব্দ নহয়।')
    else:
        en = f'"{ans["en"]}" is the opposite required here; the others — {en_list} — do not oppose the given word.'
        as_ = f'"{ans["en"]}" হে ইয়াত বিপৰীত অৰ্থ দিয়ে; বাকীবোৰ — {en_list} — বিপৰীত নহয়।'
    return en, as_


def explain_homophone(q):
    opts = q["options"]
    ans = opts[q["correct"]]
    others = [o for i, o in enumerate(opts) if i != q["correct"]]
    rule = HOMOPHONES.get(ans["en"].strip().lower())
    asks_meaning = "means" in q["q"]["en"].lower()

    def describe(o, idx):
        r = HOMOPHONES.get(o["en"].strip().lower())
        if r:
            return f'"{o["en"]}" is {r[idx]}'
        g = gloss(o)
        return f'"{o["en"]}" ({g})' if g else f'"{o["en"]}" is a different word'

    others_en = "; ".join(describe(o, 0) for o in others)
    others_as = "; ".join(f'"{o["en"]}" — {HOMOPHONES[o["en"].strip().lower()][1]}'
                          if o["en"].strip().lower() in HOMOPHONES else f'"{o["en"]}"'
                          for o in others)
    plain = [o["en"] for o in others if o["en"].strip().lower() not in HOMOPHONES]
    if plain:
        joined = ", ".join(plain)
        others_en = "; ".join(x for x in (describe(o, 0) for o in others
                                          if o["en"].strip().lower() in HOMOPHONES) if x)
        others_en = (others_en + "; " if others_en else "") + (
            f"{joined} is a different word" if len(plain) == 1 else f"{joined} are different words")
        others_as = "; ".join(f'"{o["en"]}" — {HOMOPHONES[o["en"].strip().lower()][1]}'
                              for o in others if o["en"].strip().lower() in HOMOPHONES)
        others_as = (others_as + "; " if others_as else "") + f"{joined} বেলেগ শব্দ"
    where_en = "the word that carries this meaning" if asks_meaning else "what the blank needs"
    where_as = "এই অৰ্থটো দিয়া শব্দ" if asks_meaning else "ৰিক্ত ঠাইত যি লাগে"
    if rule:
        en = f'"{ans["en"]}" is {rule[0]}, which is {where_en}. The other words are different: {others_en}.'
        as_ = f'"{ans["en"]}" — {rule[1]}, আৰু {where_as}। বাকীবোৰ বেলেগ: {others_as}।'
    else:
        en = f'"{ans["en"]}" is the word that fits here. The others are different words: {others_en}.'
        as_ = f'"{ans["en"]}" হে ইয়াত খাপ খায়। বাকীবোৰ বেলেগ শব্দ: {others_as}।'
    return en, as_


def explain_meaning(q, leaf=""):
    """Phrasal verbs and idioms: the answer is the meaning of the quoted item."""
    opts = q["options"]
    ans = opts[q["correct"]]
    others = [o for i, o in enumerate(opts) if i != q["correct"]]
    target = target_word(q)
    en_list = ", ".join(f'"{o["en"].lower()}"' for o in others)
    as_list = ", ".join(f'"{o["en"].lower()}"' + (f' ({gloss(o)})' if gloss(o) else "") for o in others)
    lead_en = f'"{target}" means {ans["en"].lower().rstrip(".")}' if target else f'The answer is "{ans["en"].lower()}"'
    lead_as = f'"{target}" ৰ অৰ্থ — {ans["as"]}' if target else f'উত্তৰ — {ans["as"]}'
    verb = "give other meanings" if leaf == IDIOM else "describe other actions"
    verb_as = "বেলেগ অৰ্থ দিয়ে" if leaf == IDIOM else "বেলেগ কাম বুজায়"
    en = f'{lead_en}. The other options — {en_list} — {verb} and do not carry that meaning.'
    as_ = f'{lead_as}। বাকী বিকল্পবোৰ — {as_list} — {verb_as}, সেয়ে ইয়াত নাখায়।'
    return en, as_


def explain_oneword(q):
    opts = q["options"]
    ans = opts[q["correct"]]
    others = [o for i, o in enumerate(opts) if i != q["correct"]]
    prompt = q["q"]["en"].strip().rstrip(":?.")
    prompt = re.sub(r"\s+is\s+an?$", "", prompt, flags=re.I)
    prompt = re.sub(r"\s+is$", "", prompt, flags=re.I)
    prompt = re.sub(r"^(One who|A person who|The)\s+", "", prompt, flags=re.I)
    en_list = ", ".join(with_gloss(o) for o in others)
    en = (f'"{ans["en"]}" is the single word for "{prompt}". '
          f'The other options name something else: {en_list}.')
    as_ = (f'"{prompt}" ৰ বাবে এটা শব্দ — "{ans["en"]}"। বাকী বিকল্পবোৰ বেলেগ বস্তু: {en_list}।')
    return en, as_


def explain_oddword(q):
    text = q["q"]["en"]
    opts = q["options"]
    ans = opts[q["correct"]]
    others = [o for i, o in enumerate(opts) if i != q["correct"]]
    names = ", ".join(o["en"] for o in others)
    if re.search(r"odd|different|belongs", text, re.I):
        en = (f'"{ans["en"]}" is the odd one out: {names} belong to the same group, '
              f'while "{ans["en"]}" belongs to a different one.')
        as_ = (f'"{ans["en"]}" হে বেলেগ: {names} এটা গোটৰ, কিন্তু "{ans["en"]}" আন গোটৰ।')
        return en, as_
    m = re.search(r"form of '([^']+)'", text)
    if m:
        kind = re.search(r"The (\w+) form of", text)
        label = f'{kind.group(1).lower()} form' if kind else "form"
        en = (f'The {label} of "{m.group(1)}" is "{ans["en"]}". '
              f'The other options are other forms or other words: {names}.')
        as_ = (f'"{m.group(1)}" ৰ এই ৰূপটো "{ans["en"]}"। বাকী বিকল্পবোৰ আন ৰূপ বা আন শব্দ: {names}।')
        return en, as_
    m = re.search(r"contains the root '([^']+)'", text)
    if m:
        en = (f'"{ans["en"]}" contains the root "{m.group(1)}"; the other options — {names} — do not.')
        as_ = (f'"{ans["en"]}" ত "{m.group(1)}" মূল আছে; বাকীবোৰ — {names} — ত নাই।')
        return en, as_
    m = re.search(r"^(\S{2,12}) stands for", text)
    if m:
        en = (f'{m.group(1)} stands for "{ans["en"]}". The other options expand the letters differently: {names}.')
        as_ = (f'{m.group(1)} ৰ পূৰ্ণ ৰূপ "{ans["en"]}"। বাকী বিকল্পবোৰ আক্ষৰিক অৰ্থ বেলেগ: {names}।')
        return en, as_
    return None


def explain_fill(q):
    opts = q["options"]
    ans = opts[q["correct"]]
    text = q["q"]["en"]
    m = re.search(r"blank:\s*['\"]([^'\"]+)['\"]", text)
    if not m:
        return None
    sentence = re.sub(r"\s*___+\s*", " ___ ", m.group(1)).strip()
    en = (f'The sentence reads "{sentence}", so "{ans["en"]}" is the word that fits the blank. '
          f'The other options do not suit this construction.')
    as_ = (f'বাক্যটো — "{sentence}" — ইয়াত "{ans["en"]}" হে খাপ খায়; বাকী বিকল্পবোৰ এই গাঁথনিত নাখায়।')
    return en, as_


def context_sentence(text, blank_index):
    marker = "{%d}" % blank_index
    if marker not in text:
        return ""
    body = text
    if "passage:" in body:
        body = body.split("passage:", 1)[1]
    parts = re.split(r"(?<=[.!?])\s+", body)
    for p in parts:
        if marker in p:
            return re.sub(r"\s+", " ", p.replace(marker, "___")).strip()
    return ""


def blank_number(q):
    m = re.search(r"blank \((\d+)\)", q["q"]["en"])
    if m:
        return int(m.group(1))
    m = re.search(r"\{(\d+)\}", q["q"]["en"])
    return int(m.group(1)) if m else 0


def explain_context(q):
    opts = q["options"]
    ans = opts[q["correct"]]["en"]
    n = blank_number(q)
    sentence = context_sentence(q["q"]["en"], n) if n else ""
    if not sentence or "___" not in sentence:
        return None
    en = (f'The blank is in the sentence "{sentence}", and "{ans}" is the word that completes it. '
          f'The other options do not fit this context.')
    as_ = (f'ৰিক্ত ঠাই থকা বাক্যটো — "{sentence}" — ইয়াত "{ans}" হে খাপ খায়। '
           f'বাকী বিকল্পবোৰ এই প্ৰসংগত নাখায়।')
    return en, as_



STOP = set("the a an is are was were of in on to for and or but with by as at from that this these those it its his her their how what which who whom why when where much many more most".split())


def explain_reading(q):
    """Reading comprehension: quote the sentence of the passage that answers it."""
    text = q["q"]["en"]
    if "passage:" not in text or "Question:" not in text:
        return None
    passage = text.split("passage:", 1)[1].split("Question:", 1)[0].strip()
    ans = q["options"][q["correct"]]["en"]
    tokens = {t for t in re.findall(r"[a-z0-9]+", ans.lower()) if t not in STOP and len(t) > 2}
    best, best_score = "", 0
    for sent in re.split(r"(?<=[.!?])\s+", passage):
        s_tokens = {t for t in re.findall(r"[a-z0-9]+", sent.lower()) if t not in STOP}
        score = len(tokens & s_tokens)
        if score > best_score:
            best, best_score = sent.strip(), score
    if not best or best_score < 1:
        return None
    en = (f'The passage says "{best}", which is what the question asks for; the other options are not supported by the text.')
    as_ = (f'অনুচ্ছেদত কোৱা হৈছে — "{best}" — যিটো প্ৰশ্নই সোধা কথাটোৰ উত্তৰ; বাকী বিকল্পবোৰ অনুচ্ছেদত নাই।')
    return en, as_



def explain_collocation(q):
    """Grammar: complete the sentence, then say why that word fits."""
    text = q["q"]["en"]
    if "___" not in text:
        return None
    m = re.search(r"(?:option|blank)[^:]*:\s*(.+)$", text, re.S)
    sentence = (m.group(1) if m else text).strip()
    ans = q["options"][q["correct"]]["en"].strip()
    filled = re.sub(r"_{2,}", ans, sentence, count=1).split("(A)")[0].strip().rstrip()
    if ans.lower() in ("a", "an", "the"):
        nxt = filled.split(ans, 1)[1].strip().split()[0] if ans in filled else ""
        rule = ("'an' comes before a vowel sound", "'a' comes before a consonant sound",
                "'the' points to a particular thing")[("a", "an", "the").index(ans.lower())]
        en = (f'The sentence reads "{filled}": {rule}, and the other options do not suit it here.')
        as_ = (f'বাক্যটো — "{filled}" — ইয়াত "{ans}" হে খাপ খায়; বাকী বিকল্পবোৰ ইয়াত নাখায়।')
        return en, as_
    en = (f'The sentence reads "{filled}", and "{ans}" is the word that completes it. '
          f'The other options do not fit the sentence.')
    as_ = (f'বাক্যটো — "{filled}" — ইয়াত "{ans}" হে খাপ খায়; বাকী বিকল্পবোৰ বাক্যটোত নাখায়।')
    return en, as_


def strategy_for(leaf, q):
    if leaf == SPELLING:
        return explain_spelling(q)
    if leaf == SYNONYM:
        return explain_synonym(q)
    if leaf == ANTONYM:
        return explain_antonym(q)
    if leaf == HOMOPHONE:
        return explain_homophone(q)
    if leaf in (PHRASAL, IDIOM):
        return explain_meaning(q, leaf)
    if leaf == ONEWORD:
        return explain_oneword(q)
    if leaf == ODDWORD:
        return explain_oddword(q)
    if leaf == FILL:
        return explain_fill(q)
    if leaf in ("general-grammar", "sentence-correction", "prepositions", "conjunctions"):
        return explain_collocation(q) or explain_fill(q)
    if leaf == "reading-comprehension":
        return explain_reading(q)
    if leaf in CONTEXT_LEAVES:
        return explain_context(q)
    return None


def leaf_map():
    """id -> published leaf, so bank entries filed under a generic leaf still
    get the strategy of the page they end up on."""
    out = {}
    for dirpath, _dirs, files in os.walk(DATA):
        leaf = os.path.basename(dirpath)
        for name in files:
            if not name.startswith("question-") or not name.endswith(".json"):
                continue
            try:
                bank = json.load(open(os.path.join(dirpath, name), encoding="utf-8"))
            except Exception:
                continue
            if isinstance(bank, list):
                for q in bank:
                    if isinstance(q, dict) and q.get("id"):
                        out[q["id"]] = leaf
    return out


def main():
    changed = 0
    seen = 0
    per_leaf = {}
    published = leaf_map()
    for base in (LEGACY, DATA):
        for dirpath, _dirs, files in os.walk(base):
            for name in files:
                if not name.endswith(".json") or name == "index.json":
                    continue
                path = os.path.join(dirpath, name)
                folder_leaf = os.path.basename(dirpath)
                try:
                    bank = json.load(open(path, encoding="utf-8"))
                except Exception:
                    continue
                if not isinstance(bank, list) or not bank:
                    continue
                touched = 0
                for q in bank:
                    if not isinstance(q, dict) or "options" not in q:
                        continue
                    exp = q.get("explanation") or {}
                    if words(exp.get("en", "")) >= MIN_WORDS:
                        continue
                    seen += 1
                    leaf = published.get(q.get("id")) or q.get("leaf") or folder_leaf
                    out = strategy_for(leaf, q)
                    if not out:
                        continue
                    en, as_ = out
                    if words(en) < MIN_WORDS:
                        continue
                    q["explanation"] = {"en": en, "as": as_}
                    touched += 1
                if touched:
                    per_leaf[folder_leaf] = per_leaf.get(folder_leaf, 0) + touched
                    changed += touched
                    if not DRY:
                        with open(path, "w", encoding="utf-8") as fh:
                            json.dump(bank, fh, ensure_ascii=False, indent=2)
                            fh.write("\n")
    for leaf, n in sorted(per_leaf.items(), key=lambda kv: -kv[1]):
        print(f"  {n:4d}  {leaf}")
    print(f"short explanations seen: {seen} | rewritten: {changed}" + (" (dry run)" if DRY else ""))


if __name__ == "__main__":
    main()
