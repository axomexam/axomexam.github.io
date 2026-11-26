#!/usr/bin/env python3
"""Clock & Calendar: 80+ very hard bilingual questions."""

import datetime
import sys
sys.path.insert(0, "tools")
from verbal_bank import append, as_num, opts

rows = []
DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
DAYS_AS = ["সোমবাৰ", "মঙ্গলবাৰ", "বুধবাৰ", "বৃহস্পতিবাৰ", "শুক্ৰবাৰ", "শনিবাৰ", "দেওবাৰ"]


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def ang(h, m):
    d = abs(30 * (h % 12) - 5.5 * m)
    return min(d, 360 - d)


def fmt(x):
    return f"{int(x)}°" if x == int(x) else f"{x:.1f}°"


# clock angles
for h, m in [(3, 0), (6, 0), (9, 0), (4, 20), (5, 30), (7, 40), (2, 15), (8, 45),
             (10, 10), (11, 25), (1, 50), (12, 30), (4, 40), (6, 20), (9, 15),
             (3, 45), (5, 10), (7, 5), (2, 40), (8, 20), (10, 40), (11, 5),
             (1, 20), (12, 45), (4, 5)]:
    v = ang(h, m)
    add(f"Find the angle between the hour hand and the minute hand of a clock at {h}:{m:02d}.",
        f"ঘড়ীত {as_num(h)}:{as_num(m):0>2} বজাত ঘণ্টা কাঁড় আৰু মিনিট কাঁড়ৰ মাজৰ কোণ নিৰ্ণয় কৰা।",
        fmt(v), [fmt((v + 15) % 360), fmt((v + 30) % 360), fmt((v + 45) % 360)],
        f"Angle = |30×{h} - 5.5×{m}| = {fmt(abs(30*(h%12)-5.5*m))}; taking the smaller angle gives {fmt(v)}.",
        f"কোণ = |৩০×{as_num(h)} - ৫.৫×{as_num(m)}| = {fmt(abs(30*(h%12)-5.5*m))}; সৰু কোণ {fmt(v)}।")

# clock facts
add("How many times do the hands of a clock coincide in 12 hours?",
    "১২ ঘণ্টাত ঘড়ীৰ কাঁড় দুডাল কিমানবাৰ একেলগ হয়?",
    11, [12, 10, 22],
    "The hands coincide 11 times in 12 hours (they are together 11 times, not 12).",
    "১২ ঘণ্টাত কাঁড় দুডাল ১১ বাৰ একেলগ হয়।")
add("How many times do the hands of a clock coincide in a day?",
    "এদিনত ঘড়ীৰ কাঁড় দুডাল কিমানবাৰ একেলগ হয়?",
    22, [24, 11, 20],
    "11 times in 12 hours, so 22 times in 24 hours.",
    "১২ ঘণ্টাত ১১ বাৰ, সেয়ে ২৪ ঘণ্টাত ২২ বাৰ।")
add("How many times do the hands of a clock make a right angle in 12 hours?",
    "১২ ঘণ্টাত ঘড়ীৰ কাঁড় দুডাল কিমানবাৰ সমকোণ কৰে?",
    22, [24, 11, 20],
    "The hands are at right angles 22 times in 12 hours.",
    "১২ ঘণ্টাত কাঁড় দুডাল ২২ বাৰ সমকোণ কৰে।")
add("How many times do the hands of a clock make a straight line in 12 hours?",
    "১২ ঘণ্টাত ঘড়ীৰ কাঁড় দুডাল কিমানবাৰ সৰলৰেখা কৰে?",
    11, [12, 22, 10],
    "They are in a straight line 11 times in 12 hours.",
    "১২ ঘণ্টাত কাঁড় দুডাল ১১ বাৰ সৰলৰেখাত থাকে।")
add("At what time between 2 and 3 o'clock will the hands of a clock coincide?",
    "২ আৰু ৩ বজাৰ মাজত কিমান বজাত ঘড়ীৰ কাঁড় দুডাল একেলগ হ'ব?",
    "2:10 10/11", ["2:12", "2:10", "2:11"],
    "Coincidence time = 60×2/11 = 120/11 = 10 10/11 minutes past 2.",
    "একেলগ হোৱাৰ সময় = ৬০×২/১১ = ১০ ১০/১১ মিনিট, অৰ্থাৎ ২:১০ ১০/১১।")

# day after n days
for start, n in [(0, 45), (2, 100), (4, 60), (6, 15), (1, 90), (3, 75), (5, 33),
                 (0, 200), (2, 365), (4, 52), (6, 123), (1, 17)]:
    v = (start + n) % 7
    add(f"If today is {DAYS[start]}, what day will it be after {n} days?",
        f"আজি {DAYS_AS[start]} হ'লে {as_num(n)} দিনৰ পিছত কি বাৰ হ'ব?",
        DAYS[v], [DAYS[(v + 1) % 7], DAYS[(v - 1) % 7], DAYS[(v + 2) % 7]],
        f"{n} ÷ 7 leaves remainder {n % 7}; {DAYS[start]} + {n%7} days = {DAYS[v]}.",
        f"{as_num(n)} ÷ ৭ ৰ ভাগশেষ {as_num(n%7)}; {DAYS_AS[start]} + {as_num(n%7)} দিন = {DAYS_AS[v]}।")

# date to day
for y, m, d in [(2024, 1, 26), (2024, 8, 15), (2025, 1, 1), (2025, 4, 14),
                (2024, 10, 2), (2026, 1, 26), (2024, 12, 25), (2025, 8, 15)]:
    wd = datetime.date(y, m, d).weekday()
    add(f"What day of the week was {d}-{m}-{y}?",
        f"{as_num(d)}-{as_num(m)}-{as_num(y)} তাৰিখে কি বাৰ আছিল?",
        DAYS[wd], [DAYS[(wd + 1) % 7], DAYS[(wd - 1) % 7], DAYS[(wd + 3) % 7]],
        f"{d}-{m}-{y} falls on {DAYS[wd]}.",
        f"{as_num(d)}-{as_num(m)}-{as_num(y)} তাৰিখ {DAYS_AS[wd]} আছিল।")

# leap years
for y in [1900, 2000, 2023, 2024, 2100, 2016, 1800, 2400]:
    leap = (y % 4 == 0 and y % 100 != 0) or y % 400 == 0
    add(f"Is {y} a leap year?",
        f"{as_num(y)} অধিবৰ্ষ হয়নে?",
        "Yes" if leap else "No", ["No" if leap else "Yes", "Cannot say", "Only in some countries"],
        f"{y} is {'a leap year' if leap else 'not a leap year'} because a century year must be divisible by 400.",
        f"{as_num(y)} {'অধিবৰ্ষ' if leap else 'অধিবৰ্ষ নহয়'}।")

# odd days
for span, odd in [(100, 5), (200, 3), (300, 1), (400, 0)]:
    add(f"How many odd days are there in {span} years?",
        f"{as_num(span)} বছৰত কিমান অযুগ্ম দিন থাকে?",
        odd, [(odd + 1) % 7, (odd + 2) % 7, (odd + 3) % 7],
        f"{span} years have {odd} odd days.",
        f"{as_num(span)} বছৰত {as_num(odd)} টা অযুগ্ম দিন।")

# final batch: more angles
for h, m in [(1, 10), (2, 5), (3, 25), (5, 45), (6, 40), (7, 15), (8, 5), (9, 35),
             (10, 25), (11, 45), (12, 20), (4, 55)]:
    v = ang(h, m)
    add(f"Find the angle between the hands of a clock at {h}:{m:02d}.",
        f"ঘড়ীত {as_num(h)}:{as_num(m):0>2} বজাত কাঁড় দুডালৰ মাজৰ কোণ নিৰ্ণয় কৰা।",
        fmt(v), [fmt((v + 15) % 360), fmt((v + 30) % 360), fmt((v + 45) % 360)],
        f"Angle = |30×{h} - 5.5×{m}| = {fmt(abs(30*(h%12)-5.5*m))}; smaller angle = {fmt(v)}.",
        f"কোণ = {fmt(v)}।")

# coincidence times
for h in [1, 3, 4, 5, 6, 7]:
    mins = 60 * h / 11
    whole = int(mins)
    frac = mins - whole
    if frac == 0:
        label = f"{h}:{whole:02d}"
    else:
        num = round(frac * 11)
        label = f"{h}:{whole:02d} {num}/11"
    add(f"At what time between {h} and {h+1} o'clock will the hands of a clock coincide?",
        f"{as_num(h)} আৰু {as_num(h+1)} বজাৰ মাজত কিমান বজাত কাঁড় দুডাল একেলগ হ'ব?",
        label, [f"{h}:{whole+1:02d}", f"{h}:{whole-1:02d}", f"{h}:{whole:02d}"],
        f"Coincidence occurs at 60×{h}/11 = {mins:.2f} minutes past {h}, i.e. {label}.",
        f"একেলগ হয় {as_num(h)} বজাৰ {mins:.2f} মিনিটত, অৰ্থাৎ {label}।")

# day before n days
for start, n in [(0, 10), (2, 25), (4, 40), (6, 8), (1, 50), (3, 33)]:
    v = (start - n) % 7
    add(f"If today is {DAYS[start]}, what day was it {n} days ago?",
        f"আজি {DAYS_AS[start]} হ'লে {as_num(n)} দিন পূৰ্বে কি বাৰ আছিল?",
        DAYS[v], [DAYS[(v + 1) % 7], DAYS[(v - 1) % 7], DAYS[(v + 2) % 7]],
        f"{n} ÷ 7 leaves remainder {n % 7}; going back gives {DAYS[v]}.",
        f"{as_num(n)} ÷ ৭ ৰ ভাগশেষ {as_num(n%7)}; পিছলৈ গ'লে {DAYS_AS[v]}।")

# more dates
for y, m, d in [(2024, 3, 8), (2024, 6, 5), (2025, 10, 2), (2025, 12, 25), (2026, 8, 15)]:
    wd = datetime.date(y, m, d).weekday()
    add(f"What day of the week was {d}-{m}-{y}?",
        f"{as_num(d)}-{as_num(m)}-{as_num(y)} তাৰিখে কি বাৰ আছিল?",
        DAYS[wd], [DAYS[(wd + 1) % 7], DAYS[(wd - 1) % 7], DAYS[(wd + 2) % 7]],
        f"{d}-{m}-{y} was a {DAYS[wd]}.",
        f"{as_num(d)}-{as_num(m)}-{as_num(y)} {DAYS_AS[wd]} আছিল।")

append("clock-calendar", rows)
