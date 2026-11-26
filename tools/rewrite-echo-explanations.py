#!/usr/bin/env python3
"""Turn "X is the correct answer. <question>" explanations into a fact.

516 explanations restate the question instead of answering it:

    "Rajendra Prasad is the correct answer. The first President of India was"

That sentence is broken, and it tells the reader nothing they did not already
have. The same fault runs through the Assamese field:

    "ৰাজেন্দ্ৰ প্ৰসাদ শুদ্ধ উত্তৰ। ভাৰতৰ প্ৰথম ৰাষ্ট্ৰপতি আছিল"

Both become one declarative sentence, built from the stem and the correct
option that are already in the record:

    "The first President of India was Rajendra Prasad."
    "ভাৰতৰ প্ৰথম ৰাষ্ট্ৰপতি আছিল ৰাজেন্দ্ৰ প্ৰসাদ।"

Question-form stems ("What is the capital of Japan") are inverted with the
small set of templates below; anything the templates cannot handle is left
alone rather than mangled.

A handful of Assamese fields still held English glosses ("Mining is not
mentioned.") from the comprehension banks; those are translated here.

Usage: python3 tools/rewrite-echo-explanations.py [--dry]
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASES = [
    os.path.join(ROOT, "tools/legacy-banks/dhs-dme-technical"),
    os.path.join(ROOT, "data/exams/dhs-dme-technical"),
]
DRY = "--dry" in sys.argv

EN_ECHO = re.compile(r"^.+?\s+is the correct answer\.\s*(?P<stem>.+?)\s*$", re.I)
AS_ECHO = re.compile(r"^(?P<ans>.+?)\s+শুদ্ধ উত্তৰ।\s*(?P<stem>.+?)\s*[।.]?$")

EN_TAIL = re.compile(
    r"\b(was|is|are|were|in|at|on|the|a|an|of|to|by|for|from|with|into|as)$", re.I)

EN_TEMPLATES = [
    (re.compile(r"^what is the capital of (?P<x>.+)$", re.I),
     lambda m, a: f"The capital of {m.group('x')} is {a}."),
    (re.compile(r"^which currency is used in (?P<x>.+)$", re.I),
     lambda m, a: f"The currency used in {m.group('x')} is the {a}."),
    (re.compile(r"^what is the currency of (?P<x>.+)$", re.I),
     lambda m, a: f"The currency of {m.group('x')} is {a}."),
    (re.compile(r"^what is the national (animal|bird|flower|fruit|game|river) of (?P<x>.+)$", re.I),
     lambda m, a: f"The national {m.group(1).lower()} of {m.group('x')} is the {a}."),
    (re.compile(r"^where is the headquarters of (?P<x>.+)$", re.I),
     lambda m, a: f"The headquarters of {m.group('x')} is in {a}."),
    (re.compile(r"^where is (?P<x>.+?) located$", re.I),
     lambda m, a: f"{cap(m.group('x'))} is located in {a}."),
    (re.compile(r"^who (?P<verb>wrote|composed|invented|discovered|founded) (?P<x>.+)$", re.I),
     lambda m, a: f"{cap(m.group('x'))} was {PAST.get(m.group('verb').lower(), m.group('verb'))} by {a}."),
]

# Assamese glosses that were still English in the comprehension banks
AS_GLOSS = {
    "Mining is not mentioned.": "খননৰ কথা অনুচ্ছেদত উল্লেখ নাই।",
    "The passage presents facts.": "অনুচ্ছেদটোত তথ্য দিয়া হৈছে।",
    "The passage gives facts.": "অনুচ্ছেদটোত তথ্য দিয়া হৈছে।",
    "The passage gives information.": "অনুচ্ছেদটোৱে তথ্য আগবঢ়ায়।",
    "'Traditional' refers to long-established customs.": "'Traditional' ৰ অৰ্থ পুৰণি প্ৰথা বা ৰীতি।",
    "Renewable sources are naturally replenished.": "নৱীকৰণযোগ্য উৎস প্ৰাকৃতিকভাৱে পুনৰ ভৰ্তি হয়।",
    "'Essential' means absolutely necessary.": "'Essential' ৰ অৰ্থ অত্যন্ত প্ৰয়োজনীয়।",
    "The passage advises readers.": "অনুচ্ছেদটোৱে পঢ়ুৱৈক পৰামৰ্শ দিয়ে।",
    "The passage encourages reading.": "অনুচ্ছেদটোৱে পঢ়াৰ অভ্যাসত উৎসাহ দিয়ে।",
    "Moderate means a balanced amount.": "Moderate ৰ অৰ্থ পৰিমিত পৰিমাণ।",
    "Height is not mentioned.": "উচ্চতাৰ কথা উল্লেখ নাই।",
    "Reliable means trustworthy.": "Reliable ৰ অৰ্থ বিশ্বাসযোগ্য।",
    "Vital means essential.": "Vital ৰ অৰ্থ অত্যাৱশ্যকীয়।",
    "The passage warns about deforestation.": "অনুচ্ছেদটোৱে বনাঞ্চল ধ্বংসৰ বিষয়ে সতৰ্ক কৰে।",
    "Durability means it lasts long.": "Durability ৰ অৰ্থ দীৰ্ঘদিন টিকা।",
    "Fundamental means basic.": "Fundamental ৰ অৰ্থ মূল বা ভিত্তিগত।",
    "Forecasting means predicting.": "Forecasting ৰ অৰ্থ আগতীয়াকৈ অনুমান কৰা।",
    "The passage highlights benefits.": "অনুচ্ছেদটোৱে উপকাৰসমূহৰ ওপৰত গুৰুত্ব দিয়ে।",
    "Excessive means too much.": "Excessive ৰ অৰ্থ অতি বেছি।",
    "The passage presents both sides.": "অনুচ্ছেদটোৱে দুয়োটা পক্ষ আগবঢ়ায়।",
    "Attract means draw towards.": "Attract ৰ অৰ্থ নিজৰ ফালে আকৰ্ষণ কৰা।",
    "The passage describes growth positively.": "অনুচ্ছেদটোৱে বৃদ্ধিক ইতিবাচকভাৱে বৰ্ণনা কৰে।",
    "Desert safaris are not mentioned.": "মৰুভূমিৰ চফাৰিৰ কথা উল্লেখ নাই।",
    "Chokes means blocks.": "Chokes ৰ অৰ্থ বাধা দিয়া বা অৱৰোধ কৰা।",
    "Gracefully means politely and calmly.": "Gracefully ৰ অৰ্থ ভদ্ৰতাৰে আৰু শান্তভাৱে।",
    "The passage praises sports.": "অনুচ্ছেদটোৱে ক্ৰীড়াৰ প্ৰশংসা কৰে।",
    "Dishonesty is not mentioned.": "অসততাৰ কথা উল্লেখ নাই।",
    "The passage urges conservation.": "অনুচ্ছেদটোৱে সংৰক্ষণৰ বাবে আহ্বান জনায়।",
    "The passage gives dietary advice.": "অনুচ্ছেদটোৱে আহাৰ সম্পৰ্কীয় পৰামৰ্শ দিয়ে।",
    "The passage gives practical advice.": "অনুচ্ছেদটোৱে ব্যৱহাৰিক পৰামৰ্শ দিয়ে।",
    "Lifelong means lasting for life.": "Lifelong ৰ অৰ্থ জীৱনজোৰা।",
    "The passage appreciates libraries.": "অনুচ্ছেদটোৱে পুথিভঁৰালৰ গুণাগুণ কৰে।",
    "Focused means concentrated.": "Focused ৰ অৰ্থ একাগ্ৰ।",
    "The passage motivates readers.": "অনুচ্ছেদটোৱে পঢ়ুৱৈক অনুপ্ৰাণিত কৰে।",
    "The passage gives health advice.": "অনুচ্ছেদটোৱে স্বাস্থ্য সম্পৰ্কীয় পৰামৰ্শ দিয়ে।",
    "The passage praises libraries.": "অনুচ্ছেদটোৱে পুথিভঁৰালৰ প্ৰশংসা কৰে।",
    "The passage describes Assam's tea production and its workers.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u0985\u09b8\u09ae\u09f0 \u099a\u09be\u09b9 \u0989\u09ce\u09aa\u09be\u09a6\u09a8 \u0986\u09f0\u09c1 \u0987\u09af\u09bc\u09be\u09f0 \u09b6\u09cd\u09f0\u09ae\u09bf\u0995\u09b8\u0995\u09b2\u09f0 \u09ac\u09bf\u09b7\u09af\u09bc\u09c7 \u09ac\u09f0\u09cd\u09a3\u09a8\u09be \u0995\u09f0\u09bf\u099b\u09c7\u0964",
    "The passage says Assam produces more than half of India's tea.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u0985\u09b8\u09ae\u09c7 \u09ad\u09be\u09f0\u09a4\u09f0 \u0986\u09a7\u09be\u09a4\u0995\u09c8 \u0985\u09a7\u09bf\u0995 \u099a\u09be\u09b9 \u0989\u09ce\u09aa\u09be\u09a6\u09a8 \u0995\u09f0\u09c7\u0964",
    "The passage names heavy rainfall and high humidity.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u09a4 \u0985\u09a7\u09bf\u0995 \u09ac\u09f0\u09b7\u09c1\u09a3 \u0986\u09f0\u09c1 \u0989\u099a\u09cd\u099a \u0986\u09f0\u09cd\u09a6\u09cd\u09f0\u09a4\u09be\u09f0 \u0995\u09a5\u09be \u0989\u09b2\u09cd\u09b2\u09c7\u0996 \u0986\u099b\u09c7\u0964",
    "The passage gives facts in a neutral way.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u09a8\u09bf\u09f0\u09aa\u09c7\u0995\u09cd\u09b7\u09ad\u09be\u09f1\u09c7 \u09a4\u09a5\u09cd\u09af \u09a6\u09bf\u099b\u09c7\u0964",
    "This fact is stated directly in the passage.": "\u098f\u0987 \u09a4\u09a5\u09cd\u09af\u099f\u09cb \u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u09a4 \u09aa\u09cb\u09a8\u09aa\u099f\u09c0\u09af\u09bc\u09be\u0995\u09c8 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7\u0964",
    "The passage describes the Brahmaputra and its uses.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u09ac\u09cd\u09f0\u09b9\u09cd\u09ae\u09aa\u09c1\u09a4\u09cd\u09f0 \u0986\u09f0\u09c1 \u0987\u09af\u09bc\u09be\u09f0 \u09ac\u09cd\u09af\u09f1\u09b9\u09be\u09f0\u09f0 \u09ac\u09bf\u09b7\u09af\u09bc\u09c7 \u09ac\u09f0\u09cd\u09a3\u09a8\u09be \u0995\u09f0\u09bf\u099b\u09c7\u0964",
    "The passage says it enters Assam from Tibet.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u0987 \u09a4\u09bf\u09ac\u09cd\u09ac\u09a4\u09f0 \u09aa\u09f0\u09be \u0985\u09b8\u09ae\u09a4 \u09aa\u09cd\u09f0\u09f1\u09c7\u09b6 \u0995\u09f0\u09c7\u0964",
    "The passage says it joins the Bay of Bengal.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u0987 \u09ac\u0982\u0997\u09cb\u09aa\u09b8\u09be\u0997\u09f0\u09a4 \u09aa\u09f0\u09c7\u0964",
    "Here 'supports' means helps or sustains.": "\u0987\u09af\u09bc\u09be\u09a4 'supports' \u09f0 \u0985\u09f0\u09cd\u09a5 \u09b8\u09b9\u09be\u09af\u09bc \u0995\u09f0\u09be \u09ac\u09be \u09a7\u09f0\u09bf \u09f0\u0996\u09be\u0964",
    "Fishing, transport and farming show its economic role.": "\u09ae\u09be\u099b \u09a7\u09f0\u09be, \u09aa\u09f0\u09bf\u09ac\u09b9\u09a8 \u0986\u09f0\u09c1 \u0995\u09c3\u09b7\u09bf\u09af\u09bc\u09c7 \u0987\u09af\u09bc\u09be\u09f0 \u0985\u09f0\u09cd\u09a5\u09a8\u09c8\u09a4\u09bf\u0995 \u09ad\u09c2\u09ae\u09bf\u0995\u09be \u09a6\u09c7\u0996\u09c1\u09f1\u09be\u09af\u09bc\u0964",
    "The passage calls it a UNESCO World Heritage Site.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u0987\u09af\u09bc\u09be\u0995 \u0987\u0989\u09a8\u09c7\u09b8\u09cd\u0995'\u09f0 \u09ac\u09bf\u09b6\u09cd\u09ac \u0990\u09a4\u09bf\u09b9\u09cd\u09af \u0995\u09cd\u09b7\u09c7\u09a4\u09cd\u09f0 \u09ac\u09c1\u09b2\u09bf \u0995\u09c8\u099b\u09c7\u0964",
    "The polar bear is not mentioned.": "\u09a7\u09cd\u09f0\u09c1\u09f1\u09c0\u09af\u09bc \u09ad\u09be\u09b2\u09c1\u0995\u09f0 \u0995\u09a5\u09be \u0989\u09b2\u09cd\u09b2\u09c7\u0996 \u09a8\u09be\u0987\u0964",
    "'Shelters' means provides shelter or protection.": "'Shelters' \u09f0 \u0985\u09f0\u09cd\u09a5 \u0986\u09b6\u09cd\u09f0\u09af\u09bc \u09ac\u09be \u09b8\u09c1\u09f0\u0995\u09cd\u09b7\u09be \u09a6\u09bf\u09af\u09bc\u09be\u0964",
    "The passage says it is celebrated three times a year.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u0987 \u09ac\u099b\u09f0\u09a4 \u09a4\u09bf\u09a8\u09bf \u09ac\u09be\u09f0 \u09aa\u09be\u09b2\u09a8 \u0995\u09f0\u09be \u09b9\u09af\u09bc\u0964",
    "The passage calls it Assam's most important festival.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u0987\u09af\u09bc\u09be\u0995 \u0985\u09b8\u09ae\u09f0 \u0986\u099f\u09be\u0987\u09a4\u0995\u09c8 \u0997\u09c1\u09f0\u09c1\u09a4\u09cd\u09ac\u09aa\u09c2\u09f0\u09cd\u09a3 \u0989\u09ce\u09b8\u09f1 \u09ac\u09c1\u09b2\u09bf \u0995\u09c8\u099b\u09c7\u0964",
    "The passage describes the festival positively.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u0989\u09ce\u09b8\u09f1\u099f\u09cb\u09f0 \u0987\u09a4\u09bf\u09ac\u09be\u099a\u0995 \u09ac\u09f0\u09cd\u09a3\u09a8\u09be \u09a6\u09bf\u099b\u09c7\u0964",
    "The passage says panels convert sunlight into electricity.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u09aa\u09c7\u09a8\u09c7\u09b2\u09c7 \u09b8\u09c2\u09f0\u09cd\u09af\u09f0 \u09aa\u09cb\u09b9\u09f0\u0995 \u09ac\u09bf\u09a6\u09cd\u09af\u09c1\u09a4\u09b2\u09c8 \u09f0\u09c2\u09aa\u09be\u09a8\u09cd\u09a4\u09f0 \u0995\u09f0\u09c7\u0964",
    "The passage does not say it creates smoke.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09a8\u09be\u0987 \u09af\u09c7 \u0987 \u09a7\u09cb\u0981\u09f1\u09be \u09b8\u09c3\u09b7\u09cd\u099f\u09bf \u0995\u09f0\u09c7\u0964",
    "The passage explains solar energy's benefits and limits.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u09b8\u09cc\u09f0 \u09b6\u0995\u09cd\u09a4\u09bf\u09f0 \u0989\u09aa\u0995\u09be\u09f0 \u0986\u09f0\u09c1 \u09b8\u09c0\u09ae\u09be\u09ac\u09a6\u09cd\u09a7\u09a4\u09be \u09ac\u09cd\u09af\u09be\u0996\u09cd\u09af\u09be \u0995\u09f0\u09bf\u099b\u09c7\u0964",
    "The passage says simple habits save large amounts.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u09b8\u09f0\u09b2 \u0985\u09ad\u09cd\u09af\u09be\u09b8\u09c7 \u09ac\u09b9\u09c1 \u09aa\u09f0\u09bf\u09ae\u09be\u09a3 \u09b8\u09be\u0981\u099a\u09c7\u0964",
    "The passage says readers develop a wider vocabulary.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u09aa\u09a2\u09bc\u09c1\u09f1\u09c8\u09f0 \u09b6\u09ac\u09cd\u09a6\u09ad\u09be\u09a3\u09cd\u09a1\u09be\u09f0 \u09ac\u09be\u09a2\u09bc\u09c7\u0964",
    "The passage says a few minutes each day can help.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u09a6\u09bf\u09a8\u09c7 \u0995\u09c7\u0987\u09ae\u09bf\u09a8\u09bf\u099f\u09ae\u09be\u09a8 \u09b8\u09b9\u09be\u09af\u09bc\u0995 \u09b9\u09af\u09bc\u0964",
    "Concentration is the ability to focus.": "\u09ae\u09a8\u09cb\u09af\u09cb\u0997 \u09b9\u09c8\u099b\u09c7 \u098f\u0995\u09be\u0997\u09cd\u09f0 \u09b9\u09cb\u09f1\u09be\u09f0 \u0995\u09cd\u09b7\u09ae\u09a4\u09be\u0964",
    "The passage mentions thirty minutes on most days.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u09a4 \u09ac\u09c7\u099b\u09bf\u09ad\u09be\u0997 \u09a6\u09bf\u09a8\u09a4 \u09a4\u09cd\u09f0\u09bf\u09b6 \u09ae\u09bf\u09a8\u09bf\u099f\u09f0 \u0995\u09a5\u09be \u0989\u09b2\u09cd\u09b2\u09c7\u0996 \u0986\u099b\u09c7\u0964",
    "The passage says students can watch lessons and read online.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u099b\u09be\u09a4\u09cd\u09f0\u09b8\u0995\u09b2\u09c7 \u0985\u09a8\u09b2\u09be\u0987\u09a8\u09a4 \u09aa\u09be\u09a0 \u099a\u09be\u09ac \u0986\u09f0\u09c1 \u09aa\u09a2\u09bc\u09bf\u09ac \u09aa\u09be\u09f0\u09c7\u0964",
    "The passage gives benefits and warnings.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u0989\u09aa\u0995\u09be\u09f0 \u0986\u09f0\u09c1 \u09b8\u09a4\u09f0\u09cd\u0995\u09ac\u09be\u09a3\u09c0 \u09a6\u09c1\u09af\u09bc\u09cb\u099f\u09be \u09a6\u09bf\u099b\u09c7\u0964",
    "The passage warns of damage to the ecosystem.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u09aa\u09f0\u09bf\u09f1\u09c7\u09b6 \u09a4\u09a8\u09cd\u09a4\u09cd\u09f0\u09f0 \u0995\u09cd\u09b7\u09a4\u09bf\u09f0 \u09ac\u09bf\u09b7\u09af\u09bc\u09c7 \u09b8\u09a4\u09f0\u09cd\u0995 \u0995\u09f0\u09bf\u099b\u09c7\u0964",
    "Sanitation refers to cleanliness and waste disposal.": "\u09aa\u09be\u09a8\u09c0-\u09aa\u0996\u09f0\u09be \u09ac\u09c1\u09b2\u09bf\u09b2\u09c7 \u09aa\u09f0\u09bf\u099a\u09cd\u099b\u09a8\u09cd\u09a8\u09a4\u09be \u0986\u09f0\u09c1 \u0986\u09f1\u09f0\u09cd\u099c\u09a8\u09be \u09a8\u09bf\u09b7\u09cd\u0995\u09be\u09b6\u09a8\u0995 \u09ac\u09c1\u099c\u09be\u09af\u09bc\u0964",
    "The passage says Assam is known for it.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u0985\u09b8\u09ae \u0987\u09af\u09bc\u09be\u09f0 \u09ac\u09be\u09ac\u09c7 \u09ac\u09bf\u0996\u09cd\u09af\u09be\u09a4\u0964",
    "The passage says it explains how the government should work.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u0987 \u099a\u09f0\u0995\u09be\u09f0\u09c7 \u0995\u09c7\u09a8\u09c7\u0995\u09c8 \u0995\u09be\u09ae \u0995\u09f0\u09bf\u09ac \u09b2\u09be\u0997\u09c7 \u09a4\u09be\u0995 \u09ac\u09cd\u09af\u09be\u0996\u09cd\u09af\u09be \u0995\u09f0\u09c7\u0964",
    "The national anthem is not mentioned.": "\u09f0\u09be\u09b7\u09cd\u099f\u09cd\u09f0\u09c0\u09af\u09bc \u09b8\u0982\u0997\u09c0\u09a4\u09f0 \u0995\u09a5\u09be \u0989\u09b2\u09cd\u09b2\u09c7\u0996 \u09a8\u09be\u0987\u0964",
    "The passage says it led to new technologies.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u0987\u09af\u09bc\u09be\u09f0 \u09aa\u09f0\u09be \u09a8\u09a4\u09c1\u09a8 \u09aa\u09cd\u09f0\u09af\u09c1\u0995\u09cd\u09a4\u09bf \u099c\u09a8\u09cd\u09ae\u09bf\u099b\u09c7\u0964",
    "The passage says they protect crops from pests.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u09b8\u09c7\u09af\u09bc\u09be \u09b6\u09b8\u09cd\u09af\u0995 \u09aa\u09cb\u0995-\u09aa\u09f0\u09c1\u09f1\u09be\u09f0 \u09aa\u09f0\u09be \u09f0\u0995\u09cd\u09b7\u09be \u0995\u09f0\u09c7\u0964",
    "Timely means at the right time.": "Timely \u09f0 \u0985\u09f0\u09cd\u09a5 \u09b8\u09a0\u09bf\u0995 \u09b8\u09ae\u09af\u09bc\u09a4\u0964",
    "The passage says plastic chokes drains and harms animals.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u09aa\u09cd\u09b2\u09be\u09b7\u09cd\u099f\u09bf\u0995\u09c7 \u09a8\u09b2\u09be \u09ac\u09a8\u09cd\u09a7 \u0995\u09f0\u09c7 \u0986\u09f0\u09c1 \u09aa\u09cd\u09f0\u09be\u09a3\u09c0\u0995 \u0995\u09cd\u09b7\u09a4\u09bf \u0995\u09f0\u09c7\u0964",
    "The passage suggests planting trees and reducing waste.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u0997\u099b \u09f0\u09cb\u09f1\u09be \u0986\u09f0\u09c1 \u0986\u09f1\u09f0\u09cd\u099c\u09a8\u09be \u0995\u09ae\u09cb\u09f1\u09be\u09f0 \u09aa\u09f0\u09be\u09ae\u09f0\u09cd\u09b6 \u09a6\u09bf\u099b\u09c7\u0964",
    "The passage expresses concern about pollution.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u09aa\u09cd\u09f0\u09a6\u09c2\u09b7\u09a3\u09f0 \u09ac\u09bf\u09b7\u09af\u09bc\u09c7 \u099a\u09bf\u09a8\u09cd\u09a4\u09be \u09aa\u09cd\u09f0\u0995\u09be\u09b6 \u0995\u09f0\u09bf\u099b\u09c7\u0964",
    "Trees are not a source of pollution here.": "\u0987\u09af\u09bc\u09be\u09a4 \u0997\u099b \u09aa\u09cd\u09f0\u09a6\u09c2\u09b7\u09a3\u09f0 \u0989\u09ce\u09b8 \u09a8\u09b9\u09af\u09bc\u0964",
    "The passage says it improves language and general knowledge.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u0987 \u09ad\u09be\u09b7\u09be \u0986\u09f0\u09c1 \u09b8\u09be\u09a7\u09be\u09f0\u09a3 \u099c\u09cd\u099e\u09be\u09a8 \u0989\u09a8\u09cd\u09a8\u09a4 \u0995\u09f0\u09c7\u0964",
    "The passage speaks positively about newspapers.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u09ac\u09be\u09a4\u09f0\u09bf \u0995\u09be\u0995\u09a4\u09f0 \u09ac\u09bf\u09b7\u09af\u09bc\u09c7 \u0987\u09a4\u09bf\u09ac\u09be\u099a\u0995\u09ad\u09be\u09f1\u09c7 \u0995\u09c8\u099b\u09c7\u0964",
    "The passage says practice improves skill and confidence.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u0985\u09ad\u09cd\u09af\u09be\u09b8\u09c7 \u09a6\u0995\u09cd\u09b7\u09a4\u09be \u0986\u09f0\u09c1 \u0986\u09a4\u09cd\u09ae\u09ac\u09bf\u09b6\u09cd\u09ac\u09be\u09b8 \u09ac\u09a2\u09bc\u09be\u09af\u09bc\u0964",
    "The passage says it maintains balance in nature.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u0987 \u09aa\u09cd\u09f0\u0995\u09c3\u09a4\u09bf\u09a4 \u09ad\u09be\u09f0\u09b8\u09be\u09ae\u09cd\u09af \u09f0\u0995\u09cd\u09b7\u09be \u0995\u09f0\u09c7\u0964",
    "Endangered means at risk of extinction.": "Endangered \u09f0 \u0985\u09f0\u09cd\u09a5 \u09ac\u09bf\u09b2\u09c1\u09aa\u09cd\u09a4\u09bf\u09f0 \u09ac\u09bf\u09aa\u09a6\u09a4 \u09a5\u0995\u09be\u0964",
    "Balanced means having the right amounts.": "Balanced \u09f0 \u0985\u09f0\u09cd\u09a5 \u09b8\u09a0\u09bf\u0995 \u09aa\u09f0\u09bf\u09ae\u09be\u09a3\u09a4 \u09a5\u0995\u09be\u0964",
    "Sweets only are not part of a balanced diet.": "\u0995\u09c7\u09f1\u09b2 \u09ae\u09bf\u09a0\u09be\u0987 \u09b8\u09a8\u09cd\u09a4\u09c1\u09b2\u09bf\u09a4 \u0986\u09b9\u09be\u09f0\u09f0 \u0985\u0982\u09b6 \u09a8\u09b9\u09af\u09bc\u0964",
    "The passage calls them treasure houses of knowledge.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09f1\u09c7 \u09b8\u09c7\u0987\u09ac\u09cb\u09f0\u0995 \u099c\u09cd\u099e\u09be\u09a8\u09f0 \u09f0\u09a4\u09cd\u09a8\u09ad\u0981\u09f0\u09be\u09b2 \u09ac\u09c1\u09b2\u09bf \u0995\u09c8\u099b\u09c7\u0964",
    "The passage says they finish tasks on time.": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6\u099f\u09cb\u09a4 \u0995\u09cb\u09f1\u09be \u09b9\u09c8\u099b\u09c7 \u09af\u09c7 \u09b8\u09c7\u09af\u09bc\u09be \u09b8\u09ae\u09af\u09bc\u09ae\u09a4\u09c7 \u0995\u09be\u09ae \u09b6\u09c7\u09b7 \u0995\u09f0\u09c7\u0964",
}

PAST = {"wrote": "written", "composed": "composed", "invented": "invented",
        "discovered": "discovered", "founded": "founded"}
NOISE = re.compile(r"^according to [^,]+, ", re.I)


def cap(text):
    text = text.strip()
    return text[:1].upper() + text[1:] if text else text


def fix_en(stem, answer):
    stem = NOISE.sub("", stem).strip().rstrip("?").strip()
    if not stem or not answer:
        return None
    for pattern, build in EN_TEMPLATES:
        m = pattern.match(stem)
        if m:
            return build(m, answer)
    if EN_TAIL.search(stem):
        return f"{cap(stem)} {answer}."
    # a stem that is not a question is a fill-in-the-blank: the answer completes it
    if not re.match(r"^(what|where|which|who|when|how|why)\b", stem, re.I):
        return f"{cap(stem)} {answer}."
    return None


def fix_as(stem, answer):
    stem = stem.strip()
    if not stem or not answer or stem.endswith("?") or stem.endswith("কি"):
        return None
    stem = stem.rstrip("।").strip()
    return f"{stem} {answer}।"


FILLER_EN = [
    "This is the correct fact; the other options are different.",
    "This is the correct fact; the other options are different",
    "The others are other days.",
    "The others wrote other works.",
    "The other options are different.",
]
FILLER_AS = [
    "এইটো শুদ্ধ তথ্য; বাকী বিকল্প বেলেগ।",
    "এইটো শুদ্ধ তথ্য; বাকী বিকল্প বেলেগ",
]


def strip_filler(text, fillers):
    for f in fillers:
        text = text.replace(f, " ")
    return re.sub(r"\s+", " ", text).strip()


def fix_truncated(q):
    """Explanations that end with the question stem, or with '..', and never
    state the answer. e.g. 'This is the correct fact; the other options are
    different. The modern Olympic Games were revived by'."""
    exp = q.get("explanation") or {}
    opts = q.get("options") or []
    idx = q.get("correct")
    if not isinstance(idx, int) or idx >= len(opts) or not isinstance(opts[idx], dict):
        return 0
    stem_en = (q["q"].get("en") or "").strip()
    stem_as = (q["q"].get("as") or "").strip()
    fixed = 0
    for field, stem, answer, fillers, end in (
        ("en", stem_en, opts[idx].get("en", ""), FILLER_EN, "."),
        ("as", stem_as, opts[idx].get("as", ""), FILLER_AS, "।"),
    ):
        text = (exp.get(field) or "").strip()
        if not text or not answer or not stem:
            continue
        run = re.search(r"[.।]{2,}$", text)
        if run:
            term = "।" if (field == "as" and not text.isascii()) else "."
            exp[field] = text[:run.start()] + term
            fixed += 1
            continue
        bare = NOISE.sub("", stem).rstrip("?.। ").strip()
        ends_clean = text.endswith((".", "।", "!", "?", ")", "²", "°"))
        doubled = text.endswith("..")
        tail_stem = text.lower().endswith(stem.lower().rstrip("? ")) or \
            text.lower().endswith(bare.lower())
        if ends_clean and not doubled and not tail_stem:
            continue
        if doubled:
            term = "।" if (field == "as" and not text.isascii()) else "."
            exp[field] = text.rstrip(".।") + term
            fixed += 1
            continue
        if not tail_stem:
            continue
        cut = len(stem) if text.lower().endswith(stem.lower().rstrip("? ")) else len(bare)
        head = strip_filler(text[:-cut], fillers).strip()
        if head and not head.endswith((".", "।")):
            head += end
        body = f"{bare} {answer}"
        if not body.endswith((".", "।", "!", "?")):
            body += end
        exp[field] = (head + " " + body).strip() if head else body
        fixed += 1
    if fixed:
        q["explanation"] = exp
    return fixed


def main():
    echo = gloss = trunc = 0
    for base in BASES:
        if not os.path.exists(base):
            continue
        for dirpath, _dirs, files in os.walk(base):
            for name in files:
                if not (name.startswith("question-") and name.endswith(".json")):
                    continue
                path = os.path.join(dirpath, name)
                try:
                    bank = json.load(open(path, encoding="utf-8"))
                except Exception:
                    continue
                if not isinstance(bank, list):
                    continue
                touched = 0
                for q in bank:
                    if not isinstance(q, dict) or not isinstance(q.get("q"), dict):
                        continue
                    exp = q.get("explanation") or {}
                    en, as_ = exp.get("en", ""), exp.get("as", "")
                    if as_.strip() in AS_GLOSS:
                        exp["as"] = AS_GLOSS[as_.strip()]
                        q["explanation"] = exp
                        gloss += 1
                        touched += 1
                        as_ = exp["as"]
                    opts = q.get("options") or []
                    idx = q.get("correct")
                    if not isinstance(idx, int) or idx >= len(opts):
                        continue
                    ans_en = (opts[idx] or {}).get("en", "")
                    ans_as = (opts[idx] or {}).get("as", "")
                    m = EN_ECHO.match(en)
                    if m:
                        new = fix_en(m.group("stem"), ans_en)
                        if new:
                            exp["en"] = new
                            echo += 1
                            touched += 1
                    m = AS_ECHO.match(as_)
                    if m and "শুদ্ধ উত্তৰ" in as_:
                        new = fix_as(m.group("stem"), ans_as or m.group("ans"))
                        if new:
                            exp["as"] = new
                            echo += 1
                            touched += 1
                    n_trunc = fix_truncated(q)
                    trunc += n_trunc
                    touched += 1 if n_trunc else 0
                    exp = q.get("explanation") or exp
                    if exp:
                        q["explanation"] = exp
                if touched and not DRY:
                    with open(path, "w", encoding="utf-8") as fh:
                        json.dump(bank, fh, ensure_ascii=False, indent=2)
                        fh.write("\n")
    print(f"echo sentences rewritten: {echo} | Assamese glosses translated: {gloss}"
          f" | truncated explanations finished: {trunc}" + (" (dry run)" if DRY else ""))


if __name__ == "__main__":
    main()
