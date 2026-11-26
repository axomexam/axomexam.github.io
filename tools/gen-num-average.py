#!/usr/bin/env python3
"""Average: 95+ hard bilingual questions."""

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


# 1. average of numbers
SETS = [[24, 36, 48, 60, 72], [15, 25, 35, 45, 55, 65], [12, 18, 24, 30, 36, 42],
        [45, 55, 65, 75, 85], [8, 16, 24, 32, 40, 48, 56], [21, 28, 35, 42, 49, 56],
        [90, 110, 130, 150, 170], [64, 72, 80, 88, 96]]
for s in SETS:
    v = sum(s) / len(s)
    add("Find the average of " + ", ".join(map(str, s)) + ".",
        "তলৰ সংখ্যাবোৰৰ গড় নিৰ্ণয় কৰা: " + ", ".join(map(as_num, s)) + "।",
        r2(v), [r2(v + 5), r2(v - 5), r2(max(s) - min(s)), r2(v * 2)],
        f"Average = {sum(s)}/{len(s)} = {r2(v)}.",
        f"গড় = {as_num(sum(s))}/{as_num(len(s))} = {as_num(r2(v))}।")

# 2. average of consecutive numbers
for a, b in [(15, 45), (23, 67), (101, 149), (8, 72), (250, 310), (37, 83)]:
    v = (a + b) / 2
    add(f"Find the average of all integers from {a} to {b} inclusive.",
        f"{as_num(a)} ৰ পৰা {as_num(b)} লৈকে সকলো পূৰ্ণসংখ্যাৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [r2(v + 2), r2(v - 2), b - a, r2((a + b))],
        f"Average = (first + last)/2 = ({a} + {b})/2 = {r2(v)}.",
        f"গড় = ({as_num(a)} + {as_num(b)})/২ = {as_num(r2(v))}।")

# 3. new average when adding
for n, avg, x in [(10, 24, 46), (15, 32, 64), (20, 45, 85), (12, 18, 42),
                  (25, 36, 76), (8, 50, 90), (18, 27, 63), (30, 40, 100)]:
    v = (n * avg + x) / (n + 1)
    add(f"The average of {n} numbers is {avg}. When a new number {x} is included, the new average is",
        f"{as_num(n)} টা সংখ্যাৰ গড় {as_num(avg)}। এটা নতুন সংখ্যা {as_num(x)} যোগ কৰিলে নতুন গড় কিমান হ'ব",
        r2(v), [r2(v + 1), r2(v - 1), r2((avg + x) / 2), r2(v * 2)],
        f"New average = ({n}×{avg} + {x})/{n+1} = {r2(v)}.",
        f"নতুন গড় = ({as_num(n)}×{as_num(avg)} + {as_num(x)})/{as_num(n+1)} = {as_num(r2(v))}।")

# 4. new average when removing
for n, avg, x in [(12, 36, 24), (15, 42, 30), (20, 55, 75), (10, 28, 18),
                  (25, 48, 98), (18, 33, 15), (16, 40, 56), (24, 50, 26)]:
    v = (n * avg - x) / (n - 1)
    add(f"The average of {n} numbers is {avg}. If one number {x} is removed, the new average is",
        f"{as_num(n)} টা সংখ্যাৰ গড় {as_num(avg)}। এটা সংখ্যা {as_num(x)} আঁতৰালে নতুন গড় কিমান হ'ব",
        r2(v), [r2(v + 2), r2(v - 2), r2((avg + x) / 2), r2(avg)],
        f"New average = ({n}×{avg} - {x})/{n-1} = {r2(v)}.",
        f"নতুন গড় = ({as_num(n)}×{as_num(avg)} - {as_num(x)})/{as_num(n-1)} = {as_num(r2(v))}।")

# 5. replacement
for n, avg, old, new in [(20, 30, 24, 44), (15, 25, 18, 38), (12, 40, 35, 55),
                         (25, 36, 30, 60), (18, 45, 40, 70), (10, 50, 42, 62)]:
    v = avg + (new - old) / n
    add(f"The average age of {n} students is {avg} years. If a student aged {old} is replaced by one aged {new}, the new average is",
        f"{as_num(n)} জন ছাত্ৰৰ গড় বয়স {as_num(avg)} বছৰ। {as_num(old)} বছৰীয়া ছাত্ৰক {as_num(new)} বছৰীয়া ছাত্ৰই ঠাই ল'লে নতুন গড় কিমান হ'ব",
        r2(v), [r2(v + 1), r2(v - 1), r2(new - old), r2(avg)],
        f"New average = {avg} + ({new} - {old})/{n} = {r2(v)}.",
        f"নতুন গড় = {as_num(avg)} + ({as_num(new)} - {as_num(old)})/{as_num(n)} = {as_num(r2(v))}।")

# 6. average speed
for x, y in [(30, 60), (40, 60), (20, 30), (50, 70), (12, 18), (25, 75)]:
    v = 2 * x * y / (x + y)
    add(f"A car travels from A to B at {x} km/h and returns at {y} km/h. Find its average speed for the whole journey.",
        f"এখন গাড়ীয়ে A ৰ পৰা B লৈ {as_num(x)} km/h বেগেৰে যায় আৰু {as_num(y)} km/h বেগেৰে উভতি আহে। সমগ্ৰ যাত্ৰাৰ গড় বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2((x + y) / 2), r2(v + 5), r2(v - 5), r2(x + y)],
        f"Average speed = 2xy/(x+y) = 2×{x}×{y}/{x+y} = {r2(v)} km/h.",
        f"গড় বেগ = 2xy/(x+y) = {as_num(r2(v))} km/h।")

# 7. weighted average
for n1, a1, n2, a2 in [(20, 30, 30, 40), (15, 25, 25, 45), (10, 50, 20, 35),
                       (12, 40, 18, 60), (25, 20, 15, 40), (8, 60, 12, 45)]:
    v = (n1 * a1 + n2 * a2) / (n1 + n2)
    add(f"In a class, {n1} students have an average of {a1} marks and {n2} students have an average of {a2} marks. Find the average of the whole class.",
        f"এটা শ্ৰেণীত {as_num(n1)} জন ছাত্ৰৰ গড় {as_num(a1)} নম্বৰ আৰু {as_num(n2)} জনৰ গড় {as_num(a2)} নম্বৰ। সমগ্ৰ শ্ৰেণীৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [r2((a1 + a2) / 2), r2(v + 2), r2(v - 2), r2(a1 + a2)],
        f"Weighted average = ({n1}×{a1} + {n2}×{a2})/{n1+n2} = {r2(v)}.",
        f"ভাৰযুক্ত গড় = {as_num(r2(v))}।")

# 8. cricket
for n, avg, target_avg in [(10, 40, 45), (12, 35, 40), (15, 50, 55), (8, 30, 36), (20, 45, 48)]:
    runs = target_avg * (n + 1) - avg * n
    add(f"A batsman has an average of {avg} runs in {n} innings. How many runs must he score in the next innings to raise his average to {target_avg}?",
        f"এজন বেটছমেনে {as_num(n)} ইনিংছত {as_num(avg)} ৰানৰ গড় ৰাখিছে। পৰৱৰ্তী ইনিংছত কিমান ৰান কৰিলে গড় {as_num(target_avg)} হ'ব?",
        runs, [runs + 10, runs - 10, target_avg * (n + 1), target_avg - avg],
        f"Required runs = {target_avg}×{n+1} - {avg}×{n} = {runs}.",
        f"প্ৰয়োজনীয় ৰান = {as_num(runs)}।")

# 9. average age
for n, avg, yrs in [(10, 20, 5), (15, 24, 3), (8, 30, 4), (12, 18, 6), (20, 25, 2)]:
    v = avg + yrs
    add(f"The average age of {n} children is {avg} years. What will be their average age after {yrs} years?",
        f"{as_num(n)} জন শিশুৰ গড় বয়স {as_num(avg)} বছৰ। {as_num(yrs)} বছৰৰ পিছত তেওঁলোকৰ গড় বয়স কিমান হ'ব?",
        v, [avg, v + yrs, v - 1, avg * yrs],
        f"Each age increases by {yrs}, so the average becomes {v}.",
        f"প্ৰত্যেকৰ বয়স {as_num(yrs)} বছৰে বাঢ়ে, সেয়ে গড় {as_num(v)} হয়।")

# 10. missing number
for n, avg, nums in [(6, 30, [20, 25, 35, 40, 45]), (8, 45, [30, 40, 50, 60, 35, 55, 65]),
                     (5, 24, [18, 22, 26, 30]), (10, 36, [20, 30, 40, 50, 60, 25, 35, 45, 55])]:
    v = n * avg - sum(nums)
    add(f"The average of {n} numbers is {avg}. If {n-1} of them are " + ", ".join(map(str, nums)) + ", find the missing number.",
        f"{as_num(n)} টা সংখ্যাৰ গড় {as_num(avg)}। তাৰ {as_num(n-1)} টা " + ", ".join(map(as_num, nums)) + " হ'লে বাকী সংখ্যাটো নিৰ্ণয় কৰা।",
        v, [v + 5, v - 5, avg, n * avg],
        f"Missing number = {n}×{avg} - {sum(nums)} = {v}.",
        f"বাকী সংখ্যা = {as_num(n)}×{as_num(avg)} - {as_num(sum(nums))} = {as_num(v)}।")

# 11. first n naturals / squares
for n in [20, 25, 40, 50, 60, 80]:
    v = (n + 1) / 2
    add(f"Find the average of the first {n} natural numbers.",
        f"প্ৰথম {as_num(n)} টা স্বাভাৱিক সংখ্যাৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [r2(n / 2), r2(v + 1), r2(v - 1), n],
        f"Average = (n+1)/2 = ({n}+1)/2 = {r2(v)}.",
        f"গড় = (n+১)/২ = {as_num(r2(v))}।")
for n in [10, 12, 15, 20]:
    v = (n + 1) * (2 * n + 1) / 6
    add(f"Find the average of the squares of the first {n} natural numbers.",
        f"প্ৰথম {as_num(n)} টা স্বাভাৱিক সংখ্যাৰ বৰ্গৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [r2(v + 2), r2(v - 2), r2((n + 1) / 2), r2(n * n)],
        f"Average = (n+1)(2n+1)/6 = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

# 12. average marks
for subs, total in [(5, 425), (6, 468), (4, 356), (8, 632), (5, 385)]:
    v = total / subs
    add(f"The total marks obtained by a student in {subs} subjects is {total}. Find the average marks per subject.",
        f"এজন ছাত্ৰই {as_num(subs)} টা বিষয়ত মুঠ {as_num(total)} নম্বৰ পাইছে। প্ৰতিটো বিষয়ৰ গড় নম্বৰ নিৰ্ণয় কৰা।",
        r2(v), [r2(v + 5), r2(v - 5), total, r2(v * 2)],
        f"Average = {total}/{subs} = {r2(v)}.",
        f"গড় = {as_num(total)}/{as_num(subs)} = {as_num(r2(v))}।")

# extra batch
for s in [[33, 44, 55, 66, 77], [18, 27, 36, 45, 54, 63], [120, 140, 160, 180, 200], [75, 85, 95, 105]]:
    v = sum(s) / len(s)
    add("Find the average of " + ", ".join(map(str, s)) + ".",
        "তলৰ সংখ্যাবোৰৰ গড় নিৰ্ণয় কৰা: " + ", ".join(map(as_num, s)) + "।",
        r2(v), [r2(v + 5), r2(v - 5), r2(max(s) - min(s)), r2(v * 2)],
        f"Average = {sum(s)}/{len(s)} = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

for a, b in [(11, 55), (40, 100), (7, 49), (150, 250)]:
    v = (a + b) / 2
    add(f"Find the average of all integers from {a} to {b} inclusive.",
        f"{as_num(a)} ৰ পৰা {as_num(b)} লৈকে সকলো পূৰ্ণসংখ্যাৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [r2(v + 2), r2(v - 2), b - a, r2(a + b)],
        f"Average = ({a} + {b})/2 = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

for n, avg, x in [(9, 28, 55), (14, 36, 78), (22, 42, 96)]:
    v = (n * avg + x) / (n + 1)
    add(f"The average of {n} numbers is {avg}. When a new number {x} is included, the new average is",
        f"{as_num(n)} টা সংখ্যাৰ গড় {as_num(avg)}। এটা নতুন সংখ্যা {as_num(x)} যোগ কৰিলে নতুন গড় কিমান হ'ব",
        r2(v), [r2(v + 1), r2(v - 1), r2((avg + x) / 2), r2(v * 2)],
        f"New average = {r2(v)}.",
        f"নতুন গড় = {as_num(r2(v))}।")

for n, avg, x in [(14, 38, 52), (21, 46, 88), (13, 30, 17)]:
    v = (n * avg - x) / (n - 1)
    add(f"The average of {n} numbers is {avg}. If one number {x} is removed, the new average is",
        f"{as_num(n)} টা সংখ্যাৰ গড় {as_num(avg)}। এটা সংখ্যা {as_num(x)} আঁতৰালে নতুন গড় কিমান হ'ব",
        r2(v), [r2(v + 2), r2(v - 2), r2((avg + x) / 2), r2(avg)],
        f"New average = {r2(v)}.",
        f"নতুন গড় = {as_num(r2(v))}।")

for n, avg, old, new in [(16, 34, 28, 52), (22, 40, 36, 62)]:
    v = avg + (new - old) / n
    add(f"The average age of {n} students is {avg} years. If a student aged {old} is replaced by one aged {new}, the new average is",
        f"{as_num(n)} জন ছাত্ৰৰ গড় বয়স {as_num(avg)} বছৰ। {as_num(old)} বছৰীয়া ছাত্ৰক {as_num(new)} বছৰীয়া ছাত্ৰই ঠাই ল'লে নতুন গড় কিমান হ'ব",
        r2(v), [r2(v + 1), r2(v - 1), r2(new - old), r2(avg)],
        f"New average = {r2(v)}.",
        f"নতুন গড় = {as_num(r2(v))}।")

for x, y in [(15, 30), (45, 90)]:
    v = 2 * x * y / (x + y)
    add(f"A car travels from A to B at {x} km/h and returns at {y} km/h. Find its average speed for the whole journey.",
        f"এখন গাড়ীয়ে A ৰ পৰা B লৈ {as_num(x)} km/h বেগেৰে যায় আৰু {as_num(y)} km/h বেগেৰে উভতি আহে। সমগ্ৰ যাত্ৰাৰ গড় বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2((x + y) / 2), r2(v + 5), r2(v - 5), r2(x + y)],
        f"Average speed = {r2(v)} km/h.",
        f"গড় বেগ = {as_num(r2(v))} km/h।")

for n1, a1, n2, a2 in [(18, 35, 12, 50), (30, 28, 20, 43)]:
    v = (n1 * a1 + n2 * a2) / (n1 + n2)
    add(f"In a class, {n1} students have an average of {a1} marks and {n2} students have an average of {a2} marks. Find the average of the whole class.",
        f"এটা শ্ৰেণীত {as_num(n1)} জন ছাত্ৰৰ গড় {as_num(a1)} নম্বৰ আৰু {as_num(n2)} জনৰ গড় {as_num(a2)} নম্বৰ। সমগ্ৰ শ্ৰেণীৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [r2((a1 + a2) / 2), r2(v + 2), r2(v - 2), r2(a1 + a2)],
        f"Weighted average = {r2(v)}.",
        f"ভাৰযুক্ত গড় = {as_num(r2(v))}।")

for n, avg, target_avg in [(9, 38, 44), (16, 42, 50)]:
    runs = target_avg * (n + 1) - avg * n
    add(f"A batsman has an average of {avg} runs in {n} innings. How many runs must he score in the next innings to raise his average to {target_avg}?",
        f"এজন বেটছমেনে {as_num(n)} ইনিংছত {as_num(avg)} ৰানৰ গড় ৰাখিছে। পৰৱৰ্তী ইনিংছত কিমান ৰান কৰিলে গড় {as_num(target_avg)} হ'ব?",
        runs, [runs + 10, runs - 10, target_avg * (n + 1), target_avg - avg],
        f"Required runs = {runs}.",
        f"প্ৰয়োজনীয় ৰান = {as_num(runs)}।")

for n, avg, yrs in [(25, 22, 5), (14, 19, 7)]:
    v = avg + yrs
    add(f"The average age of {n} children is {avg} years. What will be their average age after {yrs} years?",
        f"{as_num(n)} জন শিশুৰ গড় বয়স {as_num(avg)} বছৰ। {as_num(yrs)} বছৰৰ পিছত তেওঁলোকৰ গড় বয়স কিমান হ'ব?",
        v, [avg, v + yrs, v - 1, avg * yrs],
        f"The average becomes {v}.",
        f"গড় {as_num(v)} হয়।")

for n, avg, nums in [(7, 32, [25, 30, 35, 40, 45, 50]), (9, 40, [20, 30, 40, 50, 60, 70, 80, 90])]:
    v = n * avg - sum(nums)
    add(f"The average of {n} numbers is {avg}. If {n-1} of them are " + ", ".join(map(str, nums)) + ", find the missing number.",
        f"{as_num(n)} টা সংখ্যাৰ গড় {as_num(avg)}। তাৰ {as_num(n-1)} টা " + ", ".join(map(as_num, nums)) + " হ'লে বাকী সংখ্যাটো নিৰ্ণয় কৰা।",
        v, [v + 5, v - 5, avg, n * avg],
        f"Missing number = {v}.",
        f"বাকী সংখ্যা = {as_num(v)}।")

for n in [100, 45]:
    v = (n + 1) / 2
    add(f"Find the average of the first {n} natural numbers.",
        f"প্ৰথম {as_num(n)} টা স্বাভাৱিক সংখ্যাৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [r2(n / 2), r2(v + 1), r2(v - 1), n],
        f"Average = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

for n in [25, 30]:
    v = (n + 1) * (2 * n + 1) / 6
    add(f"Find the average of the squares of the first {n} natural numbers.",
        f"প্ৰথম {as_num(n)} টা স্বাভাৱিক সংখ্যাৰ বৰ্গৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [r2(v + 2), r2(v - 2), r2((n + 1) / 2), r2(n * n)],
        f"Average = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

for subs, total in [(7, 553), (10, 780)]:
    v = total / subs
    add(f"The total marks obtained by a student in {subs} subjects is {total}. Find the average marks per subject.",
        f"এজন ছাত্ৰই {as_num(subs)} টা বিষয়ত মুঠ {as_num(total)} নম্বৰ পাইছে। প্ৰতিটো বিষয়ৰ গড় নম্বৰ নিৰ্ণয় কৰা।",
        r2(v), [r2(v + 5), r2(v - 5), total, r2(v * 2)],
        f"Average = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

append("average", rows)
