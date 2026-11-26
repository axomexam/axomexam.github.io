#!/usr/bin/env python3
"""Assertion & Reason: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append_bi

rows = []


def add(en, as_, correct, correct_as, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_, "correct": correct, "correct_as": correct_as,
                 "dists": list(cands), "exp_en": exp_en, "exp_as": exp_as})


OPTS = [("Both A and R are true and R is the correct explanation of A",
         "A আৰু R দুয়োটাই সত্য আৰু R, A ৰ সঠিক ব্যাখ্যা"),
        ("Both A and R are true but R is not the correct explanation of A",
         "A আৰু R দুয়োটাই সত্য কিন্তু R, A ৰ সঠিক ব্যাখ্যা নহয়"),
        ("A is true but R is false", "A সত্য কিন্তু R অসত্য"),
        ("A is false but R is true", "A অসত্য কিন্তু R সত্য")]

# (assertion_en, assertion_as, r_explain_en, r_explain_as,
#  r_other_en, r_other_as, r_false_en, r_false_as, a_false_en, a_false_as)
DATA = [
    ("The Sun rises in the east.", "সূৰ্য পূব দিশে উদয় হয়।",
     "The Earth rotates from west to east.", "পৃথিৱীয়ে পশ্চিমৰ পৰা পূবলৈ ঘূৰে।",
     "The Sun is a star.", "সূৰ্য এটা তৰা।",
     "The Earth rotates from east to west.", "পৃথিৱীয়ে পূবৰ পৰা পশ্চিমলৈ ঘূৰে।",
     "The Sun rises in the west.", "সূৰ্য পশ্চিম দিশে উদয় হয়।"),
    ("Water boils at 100°C at sea level.", "সমুদ্ৰপৃষ্ঠত পানী ১০০°C ত উতলে।",
     "Atmospheric pressure at sea level is one atmosphere.", "সমুদ্ৰপৃষ্ঠত বায়ুমণ্ডলীয় চাপ এক বায়ুমণ্ডল।",
     "Water is a compound of hydrogen and oxygen.", "পানী হাইড্ৰজেন আৰু অক্সিজেনৰ যৌগ।",
     "The boiling point of water does not depend on pressure.", "পানীৰ উতলাংক চাপৰ ওপৰত নিৰ্ভৰ নকৰে।",
     "Water boils at 50°C at sea level.", "সমুদ্ৰপৃষ্ঠত পানী ৫০°C ত উতলে।"),
    ("We see the Moon because it reflects sunlight.", "আমি চন্দ্ৰ দেখোঁ কাৰণ ই সূৰ্যৰ পোহৰ প্ৰতিফলিত কৰে।",
     "The Moon has no light of its own.", "চন্দ্ৰৰ নিজৰ পোহৰ নাই।",
     "The Moon revolves around the Earth.", "চন্দ্ৰই পৃথিৱীৰ চাৰিওফালে ঘূৰে।",
     "The Moon produces its own light.", "চন্দ্ৰই নিজেই পোহৰ উৎপন্ন কৰে।",
     "We see the Moon because it produces its own light.", "চন্দ্ৰই নিজে পোহৰ উৎপন্ন কৰে বাবেই আমি চন্দ্ৰ দেখোঁ।"),
    ("Plants prepare food in the presence of sunlight.", "সূৰ্যৰ পোহৰত গছে খাদ্য প্ৰস্তুত কৰে।",
     "Chlorophyll absorbs sunlight for photosynthesis.", "ক্ল'ৰফিলে সালোক সংশ্লেষণৰ বাবে সূৰ্যৰ পোহৰ শোষণ কৰে।",
     "Plants release oxygen during the day.", "দিনত গছে অক্সিজেন এৰি দিয়ে।",
     "Plants do not need water to make food.", "খাদ্য প্ৰস্তুত কৰিবলৈ গছৰ পানীৰ প্ৰয়োজন নাই।",
     "Plants prepare food in the dark.", "অন্ধকাৰত গছে খাদ্য প্ৰস্তুত কৰে।"),
    ("A person weighs less on the Moon than on the Earth.", "চন্দ্ৰত মানুহৰ ওজন পৃথিৱীতকৈ কম হয়।",
     "The Moon's gravity is about one-sixth of the Earth's.", "চন্দ্ৰৰ মাধ্যাকৰ্ষণ পৃথিৱীৰ প্ৰায় ছয় ভাগৰ এক ভাগ।",
     "The Moon has no atmosphere.", "চন্দ্ৰৰ বায়ুমণ্ডল নাই।",
     "The Moon's gravity is greater than the Earth's.", "চন্দ্ৰৰ মাধ্যাকৰ্ষণ পৃথিৱীতকৈ বেছি।",
     "A person weighs more on the Moon than on the Earth.", "চন্দ্ৰত মানুহৰ ওজন পৃথিৱীতকৈ বেছি হয়।"),
]

DATA2 = [
    ("Ice floats on water.", "বৰফে পানীত ওপঙে।",
     "Ice is less dense than water.", "বৰফ পানীতকৈ কম ঘনত্বৰ।",
     "Ice is the solid form of water.", "বৰফ পানীৰ কঠিন ৰূপ।",
     "Ice is denser than water.", "বৰফ পানীতকৈ বেছি ঘন।",
     "Ice sinks in water.", "বৰফে পানীত ডুবে।"),
    ("Sound cannot travel through vacuum.", "শব্দে শূন্য মাধ্যমেৰে যাত্ৰা কৰিব নোৱাৰে।",
     "Sound needs a material medium to propagate.", "শব্দ বিয়পিবলৈ এটা পদাৰ্থ মাধ্যম প্ৰয়োজন।",
     "Sound travels faster in solids than in gases.", "শব্দ গেছতকৈ কঠিন পদাৰ্থত দ্ৰুতগতিত চলে।",
     "Light cannot travel through vacuum.", "পোহৰে শূন্য মাধ্যমেৰে যাত্ৰা কৰিব নোৱাৰে।",
     "Sound can travel through vacuum.", "শব্দে শূন্য মাধ্যমেৰে যাত্ৰা কৰিব পাৰে।"),
    ("A rainbow is formed after rain.", "বৰষুণৰ পিছত ৰামধেনু গঠন হয়।",
     "Water droplets refract and disperse sunlight.", "পানীৰ টোপালে সূৰ্যৰ পোহৰ প্ৰতিসৰণ আৰু বিচ্ছুৰিত কৰে।",
     "A rainbow has seven colours.", "ৰামধেনুত সাতটা ৰং থাকে।",
     "Rainbows are formed only at night.", "ৰামধেনু কেৱল ৰাতিহে গঠন হয়।",
     "A rainbow is formed only at night.", "ৰামধেনু কেৱল ৰাতিহে গঠন হয়।"),
    ("We feel cool when we sweat.", "ঘামিলে আমি শীতল অনুভৱ কৰোঁ।",
     "Evaporation of sweat absorbs heat from the body.", "ঘামৰ বাষ্পীভৱনে শৰীৰৰ পৰা তাপ শোষণ কৰে।",
     "Sweat contains dissolved salts.", "ঘামত লৱণ দ্ৰৱীভূত থাকে।",
     "Sweating raises the body temperature.", "ঘমাই শৰীৰৰ উষ্ণতা বঢ়ায়।",
     "We feel warm when we sweat.", "ঘামিলে আমি উষ্ণ অনুভৱ কৰোঁ।"),
    ("An iron nail rusts in moist air.", "তিতা বতাহত লোৰ গজালে মামৰ ধৰে।",
     "Iron reacts with oxygen and moisture to form rust.", "লোৱে অক্সিজেন আৰু জলীয় বাষ্পৰ সৈতে বিক্ৰিয়া কৰি মামৰ সৃষ্টি কৰে।",
     "Iron is a metal.", "লো এটা ধাতু।",
     "Iron does not react with oxygen.", "লোৱে অক্সিজেনৰ সৈতে বিক্ৰিয়া নকৰে।",
     "An iron nail does not rust in moist air.", "তিতা বতাহত লোৰ গজালে মামৰ নধৰে।"),
]

DATA3 = [
    ("The sky appears blue during the day.", "দিনত আকাশ নীলা দেখায়।",
     "Shorter wavelengths of light are scattered more.", "চুটি তৰংগদৈৰ্ঘ্যৰ পোহৰ অধিক বিচ্ছুৰিত হয়।",
     "The atmosphere contains gases.", "বায়ুমণ্ডলত গেছ থাকে।",
     "The sky is painted blue by clouds.", "ডাৱৰে আকাশ নীলা কৰি তোলে।",
     "The sky appears green during the day.", "দিনত আকাশ সেউজীয়া দেখায়।"),
    ("A magnet attracts iron.", "চুম্বকে লো আকৰ্ষণ কৰে।",
     "Iron is a magnetic material.", "লো এটা চুম্বকীয় পদাৰ্থ।",
     "A magnet has two poles.", "চুম্বকৰ দুটা মেৰু থাকে।",
     "Copper is a magnetic material.", "তাম এটা চুম্বকীয় পদাৰ্থ।",
     "A magnet repels iron.", "চুম্বকে লো বিকৰ্ষণ কৰে।"),
    ("Mount Everest has lower atmospheric pressure than sea level.", "সমুদ্ৰপৃষ্ঠতকৈ মাউণ্ট এভাৰেষ্টত বায়ুমণ্ডলীয় চাপ কম।",
     "Atmospheric pressure decreases with altitude.", "উচ্চতাৰ সৈতে বায়ুমণ্ডলীয় চাপ কমে।",
     "Mount Everest is the highest peak in the world.", "মাউণ্ট এভাৰেষ্ট পৃথিৱীৰ সৰ্বোচ্চ শৃংগ।",
     "Atmospheric pressure increases with altitude.", "উচ্চতাৰ সৈতে বায়ুমণ্ডলীয় চাপ বাঢ়ে।",
     "Mount Everest has higher atmospheric pressure than sea level.", "সমুদ্ৰপৃষ্ঠতকৈ মাউণ্ট এভাৰেষ্টত বায়ুমণ্ডলীয় চাপ বেছি।"),
    ("Coastal areas have a moderate climate.", "উপকূলীয় অঞ্চলৰ জলবায়ু মধ্যমীয়া।",
     "Water heats and cools more slowly than land.", "মাটিতকৈ পানী লাহে লাহে গৰম আৰু ঠাণ্ডা হয়।",
     "Coastal areas receive more rainfall.", "উপকূলীয় অঞ্চলত অধিক বৰষুণ হয়।",
     "Land heats and cools more slowly than water.", "পানীতকৈ মাটি লাহে লাহে গৰম আৰু ঠাণ্ডা হয়।",
     "Coastal areas have an extreme climate.", "উপকূলীয় অঞ্চলৰ জলবায়ু চৰম।"),
    ("We should not look directly at the Sun.", "আমি সূৰ্যলৈ পোনপটীয়াকৈ চোৱা উচিত নহয়।",
     "The Sun's rays can damage the retina.", "সূৰ্যৰ ৰশ্মিয়ে ৰেটিনাৰ ক্ষতি কৰিব পাৰে।",
     "The Sun is a star.", "সূৰ্য এটা তৰা।",
     "The Sun revolves around the Earth.", "সূৰ্যই পৃথিৱীৰ চাৰিওফালে ঘূৰে।",
     "We can safely look directly at the Sun.", "আমি নিৰাপদে সূৰ্যলৈ পোনপটীয়াকৈ চাব পাৰোঁ।"),
]

DATA4 = [
    ("A lunar eclipse occurs on a full moon day.", "পূৰ্ণিমাৰ দিনা চন্দ্ৰগ্ৰহণ হয়।",
     "The Earth comes between the Sun and the Moon.", "পৃথিৱী সূৰ্য আৰু চন্দ্ৰৰ মাজত আহে।",
     "The Moon has no light of its own.", "চন্দ্ৰৰ নিজৰ পোহৰ নাই।",
     "The Moon comes between the Sun and the Earth.", "চন্দ্ৰ সূৰ্য আৰু পৃথিৱীৰ মাজত আহে।",
     "A lunar eclipse occurs on a new moon day.", "অমাৱস্যাৰ দিনা চন্দ্ৰগ্ৰহণ হয়।"),
    ("Boiled water is safer to drink.", "উতলোৱা পানী খোৱা অধিক নিৰাপদ।",
     "Boiling kills disease-causing germs.", "উতলালে ৰোগ সৃষ্টি কৰা জীৱাণু মৰে।",
     "Water contains dissolved minerals.", "পানীত খনিজ লৱণ দ্ৰৱীভূত থাকে।",
     "Boiling adds germs to water.", "উতলালে পানীত জীৱাণু যোগ হয়।",
     "Boiled water is less safe to drink.", "উতলোৱা পানী খোৱা কম নিৰাপদ।"),
    ("A solar eclipse occurs on a new moon day.", "অমাৱস্যাৰ দিনা সূৰ্যগ্ৰহণ হয়।",
     "The Moon comes between the Sun and the Earth.", "চন্দ্ৰ সূৰ্য আৰু পৃথিৱীৰ মাজত আহে।",
     "The Moon is smaller than the Earth.", "চন্দ্ৰ পৃথিৱীতকৈ সৰু।",
     "The Earth comes between the Sun and the Moon.", "পৃথিৱী সূৰ্য আৰু চন্দ্ৰৰ মাজত আহে।",
     "A solar eclipse occurs on a full moon day.", "পূৰ্ণিমাৰ দিনা সূৰ্যগ্ৰহণ হয়।"),
    ("Deserts receive very little rainfall.", "মৰুভূমিত অতি কম বৰষুণ হয়।",
     "Most deserts lie in high-pressure or rain-shadow zones.", "বেছিভাগ মৰুভূমি উচ্চ চাপ বা বৰষুণ-ছাঁ অঞ্চলত অৱস্থিত।",
     "Deserts have sandy soil.", "মৰুভূমিৰ মাটি বালিচহীয়া।",
     "Deserts receive rainfall throughout the year.", "মৰুভূমিত বছৰজুৰি বৰষুণ হয়।",
     "Deserts receive very heavy rainfall.", "মৰুভূমিত অতি বেছি বৰষুণ হয়।"),
    ("A clinical thermometer has a narrow temperature range.", "ক্লিনিকেল থাৰ্ম'মিটাৰৰ উষ্ণতাৰ পৰিসৰ সংকীৰ্ণ।",
     "It is designed to measure only body temperature.", "ই কেৱল শৰীৰৰ উষ্ণতা জোখাৰ বাবে তৈয়াৰ কৰা।",
     "It contains mercury.", "ইয়াত পাৰা থাকে।",
     "It can measure the temperature of boiling water.", "ই উতলি থকা পানীৰ উষ্ণতা জুখিব পাৰে।",
     "A clinical thermometer can measure the temperature of boiling water.", "ক্লিনিকেল থাৰ্ম'মিটাৰে উতলি থকা পানীৰ উষ্ণতা জুখিব পাৰে।"),
]

for a_en, a_as, r1_en, r1_as, r2_en, r2_as, r3_en, r3_as, af_en, af_as in DATA + DATA2 + DATA3 + DATA4:
    variants = [
        (a_en, a_as, r1_en, r1_as, 0, "R correctly explains A.", "R এ A ৰ সঠিক ব্যাখ্যা দিয়ে।"),
        (a_en, a_as, r2_en, r2_as, 1, "R is true but does not explain A.", "R সত্য কিন্তু A ৰ ব্যাখ্যা নহয়।"),
        (a_en, a_as, r3_en, r3_as, 2, "A is true, but R is false.", "A সত্য, কিন্তু R অসত্য।"),
        (af_en, af_as, r1_en, r1_as, 3, "A is false, but R is true.", "A অসত্য, কিন্তু R সত্য।"),
    ]
    for a1, a1s, r_en, r_as, idx, ex_en, ex_as in variants:
        add(f"Assertion (A): {a1} Reason (R): {r_en}",
            f"অভিকথন (A): {a1s} কাৰণ (R): {r_as}",
            OPTS[idx][0], OPTS[idx][1], [o for o in OPTS if o[0] != OPTS[idx][0]],
            f"{ex_en} Hence: {OPTS[idx][0]}.",
            f"{ex_as} সেয়ে: {OPTS[idx][1]}।")

append_bi("assertion-reason", rows)
