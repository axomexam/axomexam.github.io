#!/usr/bin/env python3
"""Precis and Summary: 175 bilingual questions over 25 passages."""

import re
import sys
sys.path.insert(0, "tools")
from comp_bank import append

LABELS = [
    ("Assam's Tea Industry", "Assam's tea industry depends on a suitable climate and employs thousands of workers.", "Informative", "To describe Assam's tea industry"),
    ("The Brahmaputra", "The Brahmaputra is a large river that supports life and trade in Assam.", "Factual", "To describe the Brahmaputra"),
    ("Kaziranga National Park", "Kaziranga protects rare wildlife, especially the one-horned rhinoceros.", "Informative", "To describe Kaziranga's wildlife"),
    ("Bihu Festival", "Bihu is a major Assamese festival celebrated with music and dance.", "Celebratory", "To describe Bihu"),
    ("Solar Energy", "Solar energy is a clean, renewable source that works best in sunny places.", "Informative", "To explain solar energy"),
    ("Water Conservation", "Simple habits and rainwater harvesting can save water.", "Advisory", "To encourage saving water"),
    ("Benefits of Reading", "Daily reading improves knowledge, vocabulary and concentration.", "Encouraging", "To promote reading"),
    ("Exercise and Health", "Regular exercise strengthens the body and reduces stress.", "Advisory", "To promote exercise"),
    ("Internet and Learning", "The internet helps learning but students must use reliable sources.", "Balanced", "To discuss online learning"),
    ("Trees and Environment", "Trees are essential for clean air and healthy soil.", "Cautionary", "To stress the value of trees"),
    ("Good Hygiene", "Hygiene, clean water and sanitation protect public health.", "Advisory", "To promote hygiene"),
    ("Muga Silk", "Muga silk is a golden Assamese silk valued for its durability.", "Informative", "To describe Muga silk"),
    ("The Indian Constitution", "The Constitution sets out rights, duties and the working of government.", "Factual", "To explain the Constitution"),
    ("Space Exploration", "Space research has produced useful technologies and services.", "Positive", "To list benefits of space research"),
    ("Mobile Phones", "Mobile phones are useful but excessive use can harm health and studies.", "Balanced", "To discuss mobile phone use"),
    ("Farming", "Farming needs timely rain, good soil and modern methods.", "Informative", "To describe farming"),
    ("Tourism in Assam", "Assam's wildlife, rivers and festivals attract tourists.", "Positive", "To describe Assam's tourism"),
    ("Pollution", "Pollution harms cities but can be reduced by trees and less waste.", "Concerned", "To warn about pollution"),
    ("Newspapers", "Newspapers inform readers and improve language and knowledge.", "Positive", "To highlight the value of newspapers"),
    ("Sports and Character", "Sports teach teamwork, discipline and confidence.", "Positive", "To praise the value of sports"),
    ("Wildlife Conservation", "Protecting wildlife keeps nature in balance.", "Persuasive", "To urge wildlife conservation"),
    ("A Balanced Diet", "A balanced diet with fruits, vegetables and proteins keeps us healthy.", "Advisory", "To advise on healthy eating"),
    ("Saving Electricity", "Saving electricity helps the environment and reduces bills.", "Advisory", "To encourage saving power"),
    ("Libraries", "Libraries offer free knowledge and build reading habits.", "Appreciative", "To praise libraries"),
    ("Discipline and Time Management", "Discipline and planning help people achieve their goals.", "Motivational", "To motivate disciplined living"),
]

src = open("tools/gen-comp-rc.py").read()
RC = re.findall(r'P\.append\(\("(.*?)", \[', src, re.S)
TEXTS = RC[:25]

TITLES = [x[0] for x in LABELS]
SUMS = [x[1] for x in LABELS]
TONES = [x[2] for x in LABELS]
PURPS = [x[3] for x in LABELS]


def pick(pool, correct, start):
    out = []
    n = len(pool)
    i = start
    while len(out) < 3:
        v = pool[i % n]
        if v != correct and v not in out:
            out.append(v)
        i += 1
    return out


rows = []
for i, text in enumerate(TEXTS):
    title, summ, tone, purpose = LABELS[i]
    base = f"Read the passage: {text} "
    for q, correct, pool, k in (
        ("Which title best fits the passage?", title, TITLES, 1),
        ("What is the main idea of the passage?", summ, SUMS, 2),
        ("The tone of the passage is", tone, TONES, 3),
        ("The author's purpose is to", purpose, PURPS, 4),
        ("Which statement best summarises the passage?", summ, SUMS, 5),
        ("The passage is mainly concerned with", title, TITLES, 6),
    ):
        rows.append({
            "stem": base + "Question: " + q,
            "stem_as": base + "প্ৰশ্ন: " + q,
            "correct": (correct, correct),
            "dists": [(d, d) for d in pick(pool, correct, i + k)],
            "exp_en": f"The passage supports: {correct}.",
            "exp_as": f"অনুচ্ছেদে সমৰ্থন কৰে: {correct}।",
        })
    sents = [x.strip() for x in re.split(r'(?<=[.!?])\s+', text) if x.strip()]
    correct_sent = sents[0]
    other = []
    for k in range(1, len(TEXTS)):
        t2 = TEXTS[(i + k) % len(TEXTS)]
        s2 = [x.strip() for x in re.split(r'(?<=[.!?])\s+', t2) if x.strip()]
        if s2 and s2[0] != correct_sent:
            other.append(s2[0])
        if len(other) == 3:
            break
    rows.append({
        "stem": base + "Question: Which statement is true according to the passage?",
        "stem_as": base + "প্ৰশ্ন: অনুচ্ছেদ অনুসৰি কোনটো উক্তি সত্য?",
        "correct": (correct_sent, correct_sent),
        "dists": [(d, d) for d in other[:3]],
        "exp_en": f"This statement is taken directly from the passage.",
        "exp_as": f"এই উক্তিটো অনুচ্ছেদৰ পৰা লোৱা হৈছে।",
    })

append("precis-summary", rows)
