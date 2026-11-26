#!/usr/bin/env python3
"""Percentage: 95+ hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from num_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def r2(x):
    return round(x, 2)


# A. x% of y
for x, y in [(37.5, 896), (62.5, 768), (87.5, 512), (12.5, 1248), (16.66, 300),
             (33.33, 660), (66.66, 450), (14.28, 560), (28.57, 700), (42.85, 350)]:
    v = round(x * y / 100, 2)
    add(f"Find {x}% of {y}.", f"{as_num(x)}% of {as_num(y)} নিৰ্ণয় কৰা।",
        v, [r2(v * 2), r2(v / 2), r2(y - v), r2(v + y / 10)],
        f"{x}% of {y} = {x}/100 × {y} = {v}.",
        f"{as_num(x)}% of {as_num(y)} = {as_num(v)}।")

# B. what percent
for a, b in [(45, 180), (72, 240), (96, 320), (135, 540), (84, 210),
             (128, 512), (156, 390), (225, 900)]:
    v = round(b / a * 100, 2)
    add(f"What percent of {a} is {b}?", f"{as_num(a)} ৰ কিমান শতাংশ {as_num(b)}?",
        v, [r2(v / 2), r2(v * 2), r2(100 - v), r2(v + 5)],
        f"{b}/{a} × 100 = {v}%.",
        f"{as_num(b)}/{as_num(a)} × ১০০ = {as_num(v)}%।")

# C. percentage increase
for a, b in [(240, 300), (450, 540), (680, 850), (1250, 1500), (960, 1200),
             (1750, 2100), (320, 400), (1440, 1800)]:
    v = round((b - a) / a * 100, 2)
    add(f"A number increases from {a} to {b}. Find the percentage increase.",
        f"এটা সংখ্যা {as_num(a)} ৰ পৰা {as_num(b)} লৈ বৃদ্ধি হয়। শতাংশ বৃদ্ধি নিৰ্ণয় কৰা।",
        v, [r2(v / 2), r2(v * 2), r2(100 - v), r2(v + 4)],
        f"Increase = {b-a}; % increase = {b-a}/{a} × 100 = {v}%.",
        f"বৃদ্ধি = {as_num(b-a)}; শতাংশ বৃদ্ধি = {as_num(v)}%।")

# D. percentage decrease
for a, b in [(500, 400), (750, 600), (920, 736), (1500, 1200), (2400, 1800),
             (3600, 2700), (800, 680), (1250, 1000)]:
    v = round((a - b) / a * 100, 2)
    add(f"A number decreases from {a} to {b}. Find the percentage decrease.",
        f"এটা সংখ্যা {as_num(a)} ৰ পৰা {as_num(b)} লৈ হ্ৰাস হয়। শতাংশ হ্ৰাস নিৰ্ণয় কৰা।",
        v, [r2(v / 2), r2(v * 2), r2(100 - v), r2(v + 4)],
        f"Decrease = {a-b}; % decrease = {a-b}/{a} × 100 = {v}%.",
        f"হ্ৰাস = {as_num(a-b)}; শতাংশ হ্ৰাস = {as_num(v)}%।")

# E. successive change
for x, y in [(20, 10), (25, 20), (30, 10), (40, 25), (15, 20), (50, 20), (12, 25), (10, 10)]:
    v = round((1 + x / 100) * (1 - y / 100) * 100 - 100, 2)
    add(f"A number is increased by {x}% and then decreased by {y}%. Find the net percentage change.",
        f"এটা সংখ্যা {as_num(x)}% বৃদ্ধি কৰি তাৰ পিছত {as_num(y)}% হ্ৰাস কৰা হয়। মুঠ শতাংশ পৰিৱৰ্তন নিৰ্ণয় কৰা।",
        v, [r2(x - y), r2(x + y), r2(-v), r2(v / 2)],
        f"Net factor = (1 + {x}/100)(1 - {y}/100) = {1 + v/100}; net change = {v}%.",
        f"মুঠ পৰিৱৰ্তন = {as_num(v)}%।")

# F. find the number
for x, b in [(35, 210), (45, 315), (28, 196), (64, 512), (72, 648),
             (15, 180), (85, 1020), (92, 1380)]:
    v = round(b * 100 / x, 2)
    add(f"If {x}% of a number is {b}, find the number.",
        f"যদি এটা সংখ্যাৰ {as_num(x)}% = {as_num(b)}, তেন্তে সংখ্যাটো নিৰ্ণয় কৰা।",
        v, [r2(v / 2), r2(v * 2), r2(b + x), r2(b * x / 100)],
        f"Number = {b} × 100 / {x} = {v}.",
        f"সংখ্যা = {as_num(b)} × ১০০ / {as_num(x)} = {as_num(v)}।")

# G. income comparison
for x in [20, 25, 30, 40, 50, 60, 75, 80]:
    v = round(x / (100 + x) * 100, 2)
    add(f"A's income is {x}% more than B's. By what percent is B's income less than A's?",
        f"A ৰ আয় B ৰ আয়তকৈ {as_num(x)}% বেছি। B ৰ আয় A ৰ আয়তকৈ কিমান শতাংশ কম?",
        v, [r2(x), r2(100 - x), r2(v / 2), r2(v * 2)],
        f"Required % = {x}/(100+{x}) × 100 = {v}%.",
        f"প্ৰয়োজনীয় শতাংশ = {as_num(v)}%।")

# H. consumption adjustment
for x in [20, 25, 30, 40, 50, 60, 12.5, 16.66]:
    v = round(x / (100 + x) * 100, 2)
    add(f"The price of an item increases by {x}%. By what percent must consumption be reduced so that expenditure remains the same?",
        f"এটা বস্তুৰ মূল্য {as_num(x)}% বৃদ্ধি হয়। খৰচ একেই থাকিবলৈ ব্যৱহাৰ কিমান শতাংশ হ্ৰাস কৰিব লাগিব?",
        v, [r2(x), r2(100 - x), r2(v / 2), r2(v * 2)],
        f"Reduction = {x}/(100+{x}) × 100 = {v}%.",
        f"হ্ৰাস = {as_num(v)}%।")

# I. population growth
for P, r in [(8000, 5), (12000, 10), (25000, 4), (64000, 12.5), (50000, 8), (96000, 6)]:
    v = round(P * (1 + r / 100) ** 2, 2)
    add(f"The population of a town is {P}. It grows at {r}% per year. Find the population after 2 years.",
        f"এখন চহৰৰ জনসংখ্যা {as_num(P)}। বছৰি {as_num(r)}% হাৰে বৃদ্ধি পায়। ২ বছৰৰ পিছত জনসংখ্যা নিৰ্ণয় কৰা।",
        v, [r2(P * (1 + r / 100)), r2(P * (1 + 2 * r / 100)), r2(P * (1 + r / 100) ** 3), r2(P + P * r / 100)],
        f"Population = {P}(1 + {r}/100)² = {v}.",
        f"জনসংখ্যা = {as_num(P)}(১ + {as_num(r)}/১০০)² = {as_num(v)}।")

# J. depreciation
for P, r in [(10000, 10), (25000, 20), (80000, 5), (125000, 12), (64000, 25), (50000, 8)]:
    v = round(P * (1 - r / 100) ** 2, 2)
    add(f"A machine worth {P} depreciates at {r}% per year. Find its value after 2 years.",
        f"{as_num(P)} মূল্যৰ এটা যন্ত্ৰ বছৰি {as_num(r)}% হাৰে অৱমূল্যন হয়। ২ বছৰৰ পিছত ইয়াৰ মূল্য নিৰ্ণয় কৰা।",
        v, [r2(P * (1 - r / 100)), r2(P * (1 - 2 * r / 100)), r2(P * (1 - r / 100) ** 3), r2(P - P * r / 100)],
        f"Value = {P}(1 - {r}/100)² = {v}.",
        f"মূল্য = {as_num(P)}(১ - {as_num(r)}/১০০)² = {as_num(v)}।")

# K. election
for x, v in [(60, 5000), (65, 9000), (55, 3000), (70, 12000), (58, 4800), (62, 7200)]:
    total = round(v * 100 / (2 * x - 100), 2)
    add(f"In an election, the winner got {x}% of the valid votes and won by {v} votes. Find the total number of valid votes.",
        f"এটা নিৰ্বাচনত বিজয়ীয়ে {as_num(x)}% বৈধ ভোট পাই {as_num(v)} ভোটৰ ব্যৱধানত জয়ী হয়। মুঠ বৈধ ভোট নিৰ্ণয় কৰা।",
        total, [r2(total / 2), r2(total * 2), r2(v * 100 / x), r2(total - v)],
        f"Difference = {2*x-100}% = {v}, so total = {v} × 100 / {2*x-100} = {total}.",
        f"ব্যৱধান = {as_num(2*x-100)}% = {as_num(v)}, সেয়ে মুঠ = {as_num(total)}।")

# L. marks
for pass_p, got_p, fail_by in [(40, 30, 50), (35, 25, 40), (50, 40, 60), (45, 35, 30), (60, 50, 80), (33, 25, 24)]:
    total = round(fail_by * 100 / (pass_p - got_p), 2)
    add(f"A student who scores {got_p}% marks fails by {fail_by} marks, while {pass_p}% is required to pass. Find the total marks.",
        f"এজন ছাত্ৰই {as_num(got_p)}% নম্বৰ পাই {as_num(fail_by)} নম্বৰৰ ব্যৱধানত অনুত্তীৰ্ণ হয়, কিন্তু উত্তীৰ্ণৰ বাবে {as_num(pass_p)}% প্ৰয়োজন। মুঠ নম্বৰ নিৰ্ণয় কৰা।",
        total, [r2(total / 2), r2(total * 2), r2(fail_by * 100 / pass_p), r2(total + fail_by)],
        f"Gap = {pass_p-got_p}% = {fail_by} marks, so total = {fail_by} × 100 / {pass_p-got_p} = {total}.",
        f"ব্যৱধান = {as_num(pass_p-got_p)}% = {as_num(fail_by)} নম্বৰ, সেয়ে মুঠ = {as_num(total)}।")

# M. price/expenditure
for inc, cons in [(25, 20), (20, 16.66), (50, 33.33), (10, 9.09)]:
    v = round((inc - cons) / (100 - cons) * 100, 2)
    add(f"The price of rice increases by {inc}% and a family reduces consumption by {cons}%. Find the percentage change in expenditure.",
        f"চাউলৰ মূল্য {as_num(inc)}% বৃদ্ধি হয় আৰু এটা পৰিয়ালে ব্যৱহাৰ {as_num(cons)}% হ্ৰাস কৰে। খৰচৰ শতাংশ পৰিৱৰ্তন নিৰ্ণয় কৰা।",
        v, [r2(inc - cons), r2(inc + cons), r2(-v), r2(v / 2)],
        f"Expenditure factor = (1+{inc}/100)(1-{cons}/100); change = {v}%.",
        f"খৰচৰ পৰিৱৰ্তন = {as_num(v)}%।")

# N. mixture percentage
for total, p, add_l, add_p in [(40, 20, 10, 50), (60, 30, 20, 50), (80, 25, 20, 50), (100, 40, 20, 70)]:
    initial = total * p / 100
    final = (initial + add_l * add_p / 100) / (total + add_l) * 100
    v = round(final, 2)
    add(f"{total} litres of a mixture contains {p}% milk. {add_l} litres of another mixture containing {add_p}% milk is added. Find the percentage of milk in the final mixture.",
        f"{as_num(total)} লিটাৰ মিশ্ৰণত {as_num(p)}% গাখীৰ আছে। {as_num(add_p)}% গাখীৰ থকা {as_num(add_l)} লিটাৰ মিশ্ৰণ যোগ কৰা হয়। চূড়ান্ত মিশ্ৰণত গাখীৰৰ শতাংশ নিৰ্ণয় কৰা।",
        v, [r2(p + add_p), r2((p + add_p) / 2), r2(v + 5), r2(v - 5)],
        f"Milk = {initial} + {add_l}×{add_p}/100 = {initial + add_l*add_p/100}; total = {total+add_l}; % = {v}.",
        f"গাখীৰ = {as_num(initial + add_l*add_p/100)}; মুঠ = {as_num(total+add_l)}; শতাংশ = {as_num(v)}।")

append("percentage", rows)
