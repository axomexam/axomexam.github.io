#!/usr/bin/env python3
"""Statement & Arguments: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append_bi

rows = []


def add(en, as_, correct, correct_as, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_, "correct": correct, "correct_as": correct_as,
                 "dists": list(cands), "exp_en": exp_en, "exp_as": exp_as})


OPTS = [("Only argument I is strong", "কেৱল যুক্তি I সবল"),
        ("Only argument II is strong", "কেৱল যুক্তি II সবল"),
        ("Both arguments are strong", "দুয়োটা যুক্তিয়েই সবল"),
        ("Neither argument is strong", "কোনো যুক্তিয়েই সবল নহয়")]

DATA = [
    ("Should single-use plastic be banned?",
     "একবাৰ ব্যৱহাৰৰ প্লাষ্টিক নিষিদ্ধ কৰা উচিতনে?",
     [("Yes, it pollutes rivers and harms animals.", "হয়, ই নদী প্ৰদূষিত কৰে আৰু জীৱ-জন্তুৰ ক্ষতি কৰে।", True),
      ("Yes, affordable alternatives are now available.", "হয়, এতিয়া সুলভ বিকল্প উপলব্ধ।", True),
      ("No, plastic bags are light in weight.", "নহয়, প্লাষ্টিকৰ মোনা পাতল।", False),
      ("No, many shopkeepers sell plastic items.", "নহয়, বহু দোকানীয়ে প্লাষ্টিকৰ সামগ্ৰী বিক্ৰী কৰে।", False)]),
    ("Should school education be free for all?",
     "সকলোৰে বাবে বিদ্যালয় শিক্ষা বিনামূলীয়া কৰা উচিতনে?",
     [("Yes, it raises the literacy rate.", "হয়, ই সাক্ষৰতাৰ হাৰ বঢ়ায়।", True),
      ("Yes, poor families cannot afford fees.", "হয়, দৰিদ্ৰ পৰিয়ালে মাচুল দিব নোৱাৰে।", True),
      ("No, free things are never valued.", "নহয়, বিনামূলীয়া বস্তুৰ মূল্য নাথাকে।", False),
      ("No, teachers will refuse to teach.", "নহয়, শিক্ষকে পঢ়াবলৈ অস্বীকাৰ কৰিব।", False)]),
    ("Should private vehicles be banned in city centres?",
     "নগৰৰ কেন্দ্ৰত ব্যক্তিগত বাহন নিষিদ্ধ কৰা উচিতনে?",
     [("Yes, it reduces air pollution.", "হয়, ই বায়ু প্ৰদূষণ কমায়।", True),
      ("Yes, it eases traffic congestion.", "হয়, ই যাতায়তৰ জাম কমায়।", True),
      ("No, people enjoy driving.", "নহয়, লোকে গাড়ী চলাবলৈ ভাল পায়।", False),
      ("No, cars look beautiful.", "নহয়, গাড়ীবোৰ দেখিবলৈ ধুনীয়া।", False)]),
    ("Should mobile phones be banned in schools?",
     "বিদ্যালয়ত ম'বাইল ফোন নিষিদ্ধ কৰা উচিতনে?",
     [("Yes, they distract students from studies.", "হয়, ই ছাত্ৰৰ মন পঢ়াৰ পৰা হৰণ কৰে।", True),
      ("Yes, they can be misused for cheating in exams.", "হয়, পৰীক্ষাত নকল কৰিবলৈ অপব্যৱহাৰ হ'ব পাৰে।", True),
      ("No, mobile phones are expensive.", "নহয়, ম'বাইল ফোন দামী।", False),
      ("No, students like playing games.", "নহয়, ছাত্ৰই খেল খেলিব ভাল পায়।", False)]),
    ("Should the government subsidise electric vehicles?",
     "চৰকাৰে বৈদ্যুতিক বাহনত ৰাজসাহায্য দিয়া উচিতনে?",
     [("Yes, it cuts air pollution in cities.", "হয়, ই নগৰৰ বায়ু প্ৰদূষণ কমায়।", True),
      ("Yes, it reduces dependence on imported fuel.", "হয়, ই আমদানি কৰা ইন্ধনৰ ওপৰত নিৰ্ভৰশীলতা কমায়।", True),
      ("No, electric cars look odd.", "নহয়, বৈদ্যুতিক গাড়ী দেখিবলৈ আচহুৱা।", False),
      ("No, my neighbour bought a petrol car.", "নহয়, মোৰ চুবুৰীয়াই পেট্ৰলৰ গাড়ী কিনিছে।", False)]),
]

DATA2 = [
    ("Should junk food be banned in school canteens?",
     "বিদ্যালয়ৰ কেণ্টিনত জাংক ফুড নিষিদ্ধ কৰা উচিতনে?",
     [("Yes, it harms children's health.", "হয়, ই শিশুৰ স্বাস্থ্যৰ ক্ষতি কৰে।", True),
      ("Yes, it helps control childhood obesity.", "হয়, ই শিশুৰ স্থূলতা নিয়ন্ত্ৰণত সহায় কৰে।", True),
      ("No, children enjoy junk food.", "নহয়, শিশুৱে জাংক ফুড ভাল পায়।", False),
      ("No, canteens will lose customers.", "নহয়, কেণ্টিনে গ্ৰাহক হেৰুৱাব।", False)]),
    ("Should voting be made compulsory?",
     "ভোটদান বাধ্যতামূলক কৰা উচিতনে?",
     [("Yes, it increases voter participation.", "হয়, ই ভোটাৰৰ অংশগ্ৰহণ বঢ়ায়।", True),
      ("Yes, it makes governments more representative.", "হয়, ই চৰকাৰক অধিক প্ৰতিনিধিত্বমূলক কৰে।", True),
      ("No, standing in a queue is tiring.", "নহয়, শাৰীত ৰোৱা ক্লান্তিকৰ।", False),
      ("No, voting takes time.", "নহয়, ভোট দিয়াত সময় লাগে।", False)]),
    ("Should a tax be imposed on plastic bags?",
     "প্লাষ্টিকৰ মোনাত কৰ আৰোপ কৰা উচিতনে?",
     [("Yes, it discourages their use.", "হয়, ই ইয়াৰ ব্যৱহাৰ নিৰুৎসাহিত কৰে।", True),
      ("Yes, the revenue can fund waste management.", "হয়, ৰাজহেৰে আৱৰ্জনা ব্যৱস্থাপনত সহায় হ'ব।", True),
      ("No, plastic bags are light.", "নহয়, প্লাষ্টিকৰ মোনা পাতল।", False),
      ("No, shopkeepers will be unhappy.", "নহয়, দোকানীয়ে অসন্তুষ্ট হ'ব।", False)]),
    ("Should social media be banned for children below 13?",
     "১৩ বছৰৰ তলৰ শিশুৰ বাবে ছ'চিয়েল মিডিয়া নিষিদ্ধ কৰা উচিতনে?",
     [("Yes, it harms their mental health.", "হয়, ই তেওঁলোকৰ মানসিক স্বাস্থ্যৰ ক্ষতি কৰে।", True),
      ("Yes, they may be exposed to harmful content.", "হয়, তেওঁলোকে ক্ষতিকৰ বিষয়বস্তুৰ সন্মুখীন হ'ব পাৰে।", True),
      ("No, children like watching videos.", "নহয়, শিশুৱে ভিডিঅ' চাবলৈ ভাল পায়।", False),
      ("No, mobile phones are cheap now.", "নহয়, এতিয়া ম'বাইল ফোন সস্তা।", False)]),
    ("Should public transport be free?",
     "ৰাজহুৱা পৰিবহণ বিনামূলীয়া কৰা উচিতনে?",
     [("Yes, it reduces the use of private vehicles.", "হয়, ই ব্যক্তিগত বাহনৰ ব্যৱহাৰ কমায়।", True),
      ("Yes, it helps low-income commuters.", "হয়, ই কম আয়ৰ যাত্ৰীক সহায় কৰে।", True),
      ("No, buses are crowded.", "নহয়, বাছত ভিৰ হয়।", False),
      ("No, buses are painted yellow.", "নহয়, বাছে হালধীয়া ৰঙত ৰঙোৱা।", False)]),
]

DATA3 = [
    ("Should homework be abolished in primary schools?",
     "প্ৰাথমিক বিদ্যালয়ত ঘৰুৱা কাম বন্ধ কৰা উচিতনে?",
     [("Yes, young children need time to play.", "হয়, সৰু শিশুৱে খেলিবলৈ সময় প্ৰয়োজন।", True),
      ("Yes, it creates stress at a young age.", "হয়, ই সৰু বয়সতে চাপ সৃষ্টি কৰে।", True),
      ("No, homework is written on paper.", "নহয়, ঘৰুৱা কাম কাগজত লিখা হয়।", False),
      ("No, teachers enjoy giving homework.", "নহয়, শিক্ষকে ঘৰুৱা কাম দিবলৈ ভাল পায়।", False)]),
    ("Should the sale of tobacco be banned?",
     "তামাখুৰ বিক্ৰী নিষিদ্ধ কৰা উচিতনে?",
     [("Yes, it causes cancer and other diseases.", "হয়, ই কৰ্কট ৰোগ আদি সৃষ্টি কৰে।", True),
      ("Yes, it reduces public health costs.", "হয়, ই ৰাজহুৱা স্বাস্থ্য ব্যয় কমায়।", True),
      ("No, tobacco is a crop.", "নহয়, তামাখু এটা শস্য।", False),
      ("No, adults enjoy smoking.", "নহয়, ডেকা-বুঢ়াই ধূমপান কৰিবলৈ ভাল পায়।", False)]),
    ("Should zoos be closed?",
     "চিৰিয়াখানাবোৰ বন্ধ কৰা উচিতনে?",
     [("Yes, animals suffer in captivity.", "হয়, বন্দীত্বত জন্তুৱে কষ্ট পায়।", True),
      ("Yes, wildlife should live in natural habitats.", "হয়, বন্যপ্ৰাণী প্ৰাকৃতিক বাসস্থানত থাকিব লাগে।", True),
      ("No, zoos sell tickets.", "নহয়, চিৰিয়াখানাই টিকট বিক্ৰী কৰে।", False),
      ("No, children like seeing animals.", "নহয়, শিশুৱে জন্তু চাবলৈ ভাল পায়।", False)]),
    ("Should farmers be given free electricity?",
     "কৃষকক বিনামূলীয়া বিদ্যুৎ দিয়া উচিতনে?",
     [("Yes, it lowers the cost of irrigation.", "হয়, ই জলসিঞ্চনৰ খৰচ কমায়।", True),
      ("Yes, it supports food production.", "হয়, ই খাদ্য উৎপাদনত সহায় কৰে।", True),
      ("No, electricity cannot be seen.", "নহয়, বিদ্যুৎ দেখা নাযায়।", False),
      ("No, there are many farmers.", "নহয়, কৃষক বহুত।", False)]),
    ("Should advertising of junk food be banned?",
     "জাংক ফুডৰ বিজ্ঞাপন নিষিদ্ধ কৰা উচিতনে?",
     [("Yes, it influences children's food choices.", "হয়, ই শিশুৰ খাদ্য বাছনি প্ৰভাৱিত কৰে।", True),
      ("Yes, it reduces consumption of unhealthy food.", "হয়, ই অস্বাস্থ্যকৰ খাদ্যৰ ব্যৱহাৰ কমায়।", True),
      ("No, advertisements are colourful.", "নহয়, বিজ্ঞাপন ৰঙীন।", False),
      ("No, companies will lose money.", "নহয়, কোম্পানীয়ে ধন হেৰুৱাব।", False)]),
]

DATA4 = [
    ("Should work from home be made a legal right?",
     "ঘৰৰ পৰা কাম কৰাক আইনী অধিকাৰ কৰা উচিতনে?",
     [("Yes, it saves commuting time and cost.", "হয়, ই যাতায়তৰ সময় আৰু খৰচ সাঁচে।", True),
      ("Yes, it helps working parents.", "হয়, ই কৰ্মৰত পিতৃ-মাতৃক সহায় কৰে।", True),
      ("No, home is comfortable.", "নহয়, ঘৰ আৰামদায়ক।", False),
      ("No, offices have chairs.", "নহয়, কাৰ্যালয়ত চকী আছে।", False)]),
    ("Should lotteries be banned?",
     "লটাৰী নিষিদ্ধ কৰা উচিতনে?",
     [("Yes, they encourage gambling among the poor.", "হয়, ই দৰিদ্ৰসকলৰ মাজত জুৱা উৎসাহিত কৰে।", True),
      ("Yes, they ruin family finances.", "হয়, ই পৰিয়ালৰ অৰ্থনীতি নষ্ট কৰে।", True),
      ("No, lottery tickets are small.", "নহয়, লটাৰীৰ টিকট সৰু।", False),
      ("No, people like winning prizes.", "নহয়, লোকে পুৰস্কাৰ জিকিবলৈ ভাল পায়।", False)]),
    ("Should English be the only medium of instruction?",
     "ইংৰাজীক একমাত্ৰ শিক্ষাৰ মাধ্যম কৰা উচিতনে?",
     [("Yes, it improves global job prospects.", "হয়, ই বিশ্বজুৰি চাকৰিৰ সম্ভাৱনা বঢ়ায়।", True),
      ("Yes, it brings uniformity across boards.", "হয়, ই ব'ৰ্ডবোৰৰ মাজত একৰূপতা আনে।", True),
      ("No, English letters are curly.", "নহয়, ইংৰাজী আখৰবোৰ ঘূৰণীয়া।", False),
      ("No, my cousin studies in English.", "নহয়, মোৰ খুড়াৰ ল'ৰাই ইংৰাজীত পঢ়ে।", False)]),
    ("Should the death penalty be abolished?",
     "মৃত্যুদণ্ড বিলুপ্ত কৰা উচিতনে?",
     [("Yes, it violates the right to life.", "হয়, ই জীৱনৰ অধিকাৰ উলংঘা কৰে।", True),
      ("Yes, a judicial error can never be undone.", "হয়, ন্যায়িক ভুল কেতিয়াও শুধৰণি নহয়।", True),
      ("No, prisons are crowded.", "নহয়, কাৰাগাৰত ভিৰ।", False),
      ("No, prisoners are bad people.", "নহয়, কয়দীবোৰ বেয়া মানুহ।", False)]),
    ("Should the retirement age be raised?",
     "অৱসৰৰ বয়স বঢ়োৱা উচিতনে?",
     [("Yes, average life expectancy has increased.", "হয়, গড় আয়ুস বাঢ়িছে।", True),
      ("Yes, experienced workers add value.", "হয়, অভিজ্ঞ কৰ্মীয়ে মূল্য যোগ কৰে।", True),
      ("No, old people get tired.", "নহয়, বৃদ্ধসকলে ক্লান্তি অনুভৱ কৰে।", False),
      ("No, my grandfather wants to rest.", "নহয়, মোৰ ককাকে জিৰণি ল'ব বিচাৰে।", False)]),
]

PAIRS = [(0, 1, 2), (0, 2, 0), (2, 1, 1), (2, 3, 3)]
for st_en, st_as, args in DATA + DATA2 + DATA3 + DATA4:
    for i, j, idx in PAIRS:
        a1, a2 = args[i], args[j]
        stem_en = f"Statement: {st_en} Argument I: {a1[0]} Argument II: {a2[0]}"
        stem_as = f"বিবৃতি: {st_as} যুক্তি I: {a1[1]} যুক্তি II: {a2[1]}"
        add(stem_en, stem_as, OPTS[idx][0], OPTS[idx][1],
            [o for o in OPTS if o[0] != OPTS[idx][0]],
            f"Argument I is {'strong' if a1[2] else 'weak'} and argument II is "
            f"{'strong' if a2[2] else 'weak'}. Hence: {OPTS[idx][0]}.",
            f"যুক্তি I {'সবল' if a1[2] else 'দুৰ্বল'}, যুক্তি II {'সবল' if a2[2] else 'দুৰ্বল'}। "
            f"সেয়ে: {OPTS[idx][1]}।")

append_bi("statement-arguments", rows)
