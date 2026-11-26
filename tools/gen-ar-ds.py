#!/usr/bin/env python3
"""Decision Making & Data Sufficiency: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append_bi, as_num

rows = []


def add(en, as_, correct, correct_as, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_, "correct": correct, "correct_as": correct_as,
                 "dists": list(cands), "exp_en": exp_en, "exp_as": exp_as})


OPTS = [("Statement I alone is sufficient to answer the question",
         "কেৱল বিবৃতি I উত্তৰ দিবলৈ পৰ্যাপ্ত"),
        ("Statement II alone is sufficient to answer the question",
         "কেৱল বিবৃতি II উত্তৰ দিবলৈ পৰ্যাপ্ত"),
        ("Both statements together are sufficient, but neither alone is",
         "দুয়োটা বিবৃতি একেলগেহে পৰ্যাপ্ত, এটাও অকলে নহয়"),
        ("Even both statements together are not sufficient",
         "দুয়োটা বিবৃতি একেলগেও পৰ্যাপ্ত নহয়")]

# --- template A: only statement I suffices
for k, c, m in [(3, 21, 2), (4, 32, 5), (5, 45, 6), (6, 54, 3), (7, 63, 4),
                (8, 72, 5), (2, 26, 9), (9, 81, 7), (4, 48, 10), (5, 65, 11),
                (3, 39, 12), (6, 78, 10), (7, 84, 9), (2, 38, 15), (8, 96, 11)]:
    v = c // k
    add(f"Question: What is the value of x? Statement I: {k}x = {c}. Statement II: x is greater than {m}.",
        f"প্ৰশ্ন: x ৰ মান কিমান? বিবৃতি I: {as_num(k)}x = {as_num(c)}। বিবৃতি II: x, {as_num(m)} তকৈ ডাঙৰ।",
        OPTS[0][0], OPTS[0][1], [o for o in OPTS if o[0] != OPTS[0][0]],
        f"Statement I gives x = {c} ÷ {k} = {v}; statement II alone cannot give a value.",
        f"বিবৃতি I ৰ পৰা x = {as_num(v)}; বিবৃতি II অকলে মান দিব নোৱাৰে।")

# --- template B: only statement II suffices
for n, c in [(4, 100), (5, 125), (6, 150), (8, 240), (3, 75), (7, 210),
             (9, 315), (10, 250), (12, 300), (15, 375), (5, 90), (6, 132),
             (4, 92), (8, 216), (9, 234)]:
    v = c // n
    add(f"Question: What is the price of one pen? Statement I: Pens are sold in packets. Statement II: {n} pens cost Rs {c}.",
        f"প্ৰশ্ন: এটা কলমৰ দাম কিমান? বিবৃতি I: কলম পেকেটত বিক্ৰী হয়। বিবৃতি II: {as_num(n)} টা কলমৰ দাম {as_num(c)} টকা।",
        OPTS[1][0], OPTS[1][1], [o for o in OPTS if o[0] != OPTS[1][0]],
        f"Statement II gives {c} ÷ {n} = Rs {v}; statement I alone gives nothing.",
        f"বিবৃতি II ৰ পৰা {as_num(c)} ÷ {as_num(n)} = {as_num(v)} টকা; বিবৃতি I অকলে একো নিদিয়ে।")

# --- template C: both needed
for a, d in [(20, 5), (25, 7), (18, 4), (30, 9), (22, 6), (35, 8),
             (16, 3), (28, 11), (24, 5), (19, 7), (32, 6), (21, 9),
             (27, 8), (23, 4), (31, 5)]:
    v = a + d
    add(f"Question: What is the age of Ravi? Statement I: Ravi is {d} years older than Sita. Statement II: Sita is {a} years old.",
        f"প্ৰশ্ন: ৰবিৰ বয়স কিমান? বিবৃতি I: ৰবি সীতাতকৈ {as_num(d)} বছৰ ডাঙৰ। বিবৃতি II: সীতাৰ বয়স {as_num(a)} বছৰ।",
        OPTS[2][0], OPTS[2][1], [o for o in OPTS if o[0] != OPTS[2][0]],
        f"Neither alone gives Ravi's age; together, {a} + {d} = {v} years.",
        f"এটাও অকলে নহয়; একেলগে {as_num(a)} + {as_num(d)} = {as_num(v)} বছৰ।")

# --- template D: neither suffices
VAGUE = [
    ("What is the number of students in the class?",
     "শ্ৰেণীত কিমানজন ছাত্ৰ আছে?",
     "Some students are girls.", "কিছু ছাত্ৰী আছে।",
     "The class has one class teacher.", "শ্ৰেণীত এজন শ্ৰেণী শিক্ষক আছে।"),
    ("What is the age of A?", "A ৰ বয়স কিমান?",
     "A is older than B.", "A, B তকৈ ডাঙৰ।",
     "B is younger than C.", "B, C তকৈ সৰু।"),
    ("What is the cost of the bag?", "মোনাটোৰ দাম কিমান?",
     "The bag is expensive.", "মোনাটো দামী।",
     "The bag is made of leather.", "মোনাটো ছালেৰে তৈয়াৰী।"),
    ("What is the speed of the bus?", "বাছখনৰ গতি কিমান?",
     "The bus is red in colour.", "বাছখন ৰঙা।",
     "The bus has forty seats.", "বাছখনত চল্লিশখন আসন আছে।"),
    ("How many pages does the book have?", "কিতাপখনত কিমান পৃষ্ঠা আছে?",
     "The book is very thick.", "কিতাপখন অতি ডাঠ।",
     "The book is new.", "কিতাপখন নতুন।"),
    ("What is the area of the triangle?", "ত্ৰিভুজটোৰ কালি কিমান?",
     "One angle of the triangle is 60°.", "ত্ৰিভুজটোৰ এটা কোণ ৬০°।",
     "One side of the triangle is 10 cm.", "ত্ৰিভুজটোৰ এটা বাহু ১০ চে.মি.।"),
    ("What is the value of x?", "x ৰ মান কিমান?",
     "x² = 16.", "x² = ১৬।",
     "x is an integer.", "x এটা অখণ্ড সংখ্যা।"),
    ("What is the two-digit number?", "দুই অংকৰ সংখ্যাটো কিমান?",
     "The sum of its digits is 9.", "ইয়াৰ অংক দুটাৰ যোগফল ৯।",
     "The difference of its digits is 3.", "ইয়াৰ অংক দুটাৰ পাৰ্থক্য ৩।"),
    ("What is the weight of the box?", "বাকচটোৰ ওজন কিমান?",
     "The box is heavy.", "বাকচটো গধুৰ।",
     "The box is made of wood.", "বাকচটো কাঠেৰে তৈয়াৰী।"),
    ("How many people attended the meeting?", "সভাত কিমান লোকে অংশ লৈছিল?",
     "The meeting was crowded.", "সভাত ভিৰ আছিল।",
     "The hall has many chairs.", "হলত বহু চকী আছে।"),
]
for q_en, q_as, s1_en, s1_as, s2_en, s2_as in VAGUE:
    add(f"Question: {q_en} Statement I: {s1_en} Statement II: {s2_en}",
        f"প্ৰশ্ন: {q_as} বিবৃতি I: {s1_as} বিবৃতি II: {s2_as}",
        OPTS[3][0], OPTS[3][1], [o for o in OPTS if o[0] != OPTS[3][0]],
        "Neither statement provides a definite figure or relation, so the question cannot be answered.",
        "কোনো বিবৃতিয়ে নিৰ্দিষ্ট মান বা সম্পৰ্ক নিদিয়ে, সেয়ে উত্তৰ দিব নোৱাৰি।")

# --- extra template A
for k, c, m in [(3, 27, 4), (4, 44, 6), (5, 55, 7), (6, 66, 8), (7, 77, 6),
                (8, 88, 9), (9, 99, 10), (2, 34, 12), (3, 51, 13), (4, 56, 9)]:
    v = c // k
    add(f"Question: What is the value of y? Statement I: {k}y = {c}. Statement II: y is less than {m + 20}.",
        f"প্ৰশ্ন: y ৰ মান কিমান? বিবৃতি I: {as_num(k)}y = {as_num(c)}। বিবৃতি II: y, {as_num(m + 20)} তকৈ সৰু।",
        OPTS[0][0], OPTS[0][1], [o for o in OPTS if o[0] != OPTS[0][0]],
        f"Statement I gives y = {v}; statement II alone is not enough.",
        f"বিবৃতি I ৰ পৰা y = {as_num(v)}; বিবৃতি II অকলে পৰ্যাপ্ত নহয়।")

# --- extra template B
for n, c in [(4, 112), (5, 135), (6, 168), (7, 189), (8, 256),
             (9, 297), (10, 320), (12, 360), (15, 405), (6, 174)]:
    v = c // n
    add(f"Question: What is the cost of one notebook? Statement I: Notebooks are available in all shops. Statement II: {n} notebooks cost Rs {c}.",
        f"প্ৰশ্ন: এখন নোটবুকৰ দাম কিমান? বিবৃতি I: নোটবুক সকলো দোকানত উপলব্ধ। বিবৃতি II: {as_num(n)} খন নোটবুকৰ দাম {as_num(c)} টকা।",
        OPTS[1][0], OPTS[1][1], [o for o in OPTS if o[0] != OPTS[1][0]],
        f"Statement II gives {c} ÷ {n} = Rs {v}; statement I is irrelevant.",
        f"বিবৃতি II ৰ পৰা {as_num(v)} টকা; বিবৃতি I অপ্ৰাসংগিক।")

# --- extra template C
for a, d in [(26, 4), (33, 7), (17, 6), (29, 3), (34, 9)]:
    v = a + d
    add(f"Question: What is the age of Meera? Statement I: Meera is {d} years older than Kavita. Statement II: Kavita is {a} years old.",
        f"প্ৰশ্ন: মীৰাৰ বয়স কিমান? বিবৃতি I: মীৰা কবিতাতকৈ {as_num(d)} বছৰ ডাঙৰ। বিবৃতি II: কবিতাৰ বয়স {as_num(a)} বছৰ।",
        OPTS[2][0], OPTS[2][1], [o for o in OPTS if o[0] != OPTS[2][0]],
        f"Together, {a} + {d} = {v} years; neither alone is enough.",
        f"একেলগে {as_num(v)} বছৰ; এটাও অকলে পৰ্যাপ্ত নহয়।")

append_bi("decision-making-data-sufficiency", rows)
