#!/usr/bin/env python3
"""Time, Speed & Distance: 95+ hard bilingual questions."""

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


for s, t in [(60, 4), (75, 3), (45, 5), (80, 2.5), (90, 4), (55, 6), (120, 1.5), (70, 3)]:
    v = s * t
    add(f"A car travels at {s} km/h for {t} hours. Find the distance covered.",
        f"এখন গাড়ীয়ে {as_num(s)} km/h বেগেৰে {as_num(t)} ঘণ্টা যায়। অতিক্ৰম কৰা দূৰত্ব নিৰ্ণয় কৰা।",
        r2(v), [r2(s + t), r2(v / 2), r2(v * 2), r2(s / t)],
        f"Distance = speed × time = {s} × {t} = {r2(v)} km.",
        f"দূৰত্ব = বেগ × সময় = {as_num(s)} × {as_num(t)} = {as_num(r2(v))} কিমি।")

for x, y in [(30, 60), (40, 60), (20, 30), (50, 70), (12, 18), (25, 75)]:
    v = 2 * x * y / (x + y)
    add(f"A car goes from A to B at {x} km/h and returns at {y} km/h. Find its average speed for the whole journey.",
        f"এখন গাড়ীয়ে A ৰ পৰা B লৈ {as_num(x)} km/h বেগেৰে যায় আৰু {as_num(y)} km/h বেগেৰে উভতি আহে। সমগ্ৰ যাত্ৰাৰ গড় বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2((x + y) / 2), r2(v + 5), r2(v - 5), r2(x + y)],
        f"For equal distances, average speed = 2xy/(x+y) = 2×{x}×{y}/{x+y} = {r2(v)} km/h.",
        f"সমান দূৰত্বৰ বাবে গড় বেগ = 2xy/(x+y) = {as_num(r2(v))} km/h।")

for s1, s2 in [(80, 60), (90, 70), (100, 80), (75, 55), (120, 90)]:
    v = s1 - s2
    add(f"Two cars travel in the same direction at {s1} km/h and {s2} km/h. Find their relative speed.",
        f"দুখন গাড়ী একে দিশত {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে যায়। তেওঁলোকৰ আপেক্ষিক বেগ নিৰ্ণয় কৰা।",
        v, [s1 + s2, s2, s1, v * 2],
        f"Same direction: relative speed = {s1} - {s2} = {v} km/h.",
        f"একে দিশত আপেক্ষিক বেগ = {as_num(s1)} - {as_num(s2)} = {as_num(v)} km/h।")

for s1, s2 in [(60, 40), (75, 45), (90, 60), (50, 30), (110, 70)]:
    v = s1 + s2
    add(f"Two cars travel towards each other at {s1} km/h and {s2} km/h. Find their relative speed.",
        f"দুখন গাড়ী পৰস্পৰৰ ফালে {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে যায়। তেওঁলোকৰ আপেক্ষিক বেগ নিৰ্ণয় কৰা।",
        v, [s1 - s2, s1, s2, v * 2],
        f"Opposite directions: relative speed = {s1} + {s2} = {v} km/h.",
        f"বিপৰীত দিশত আপেক্ষিক বেগ = {as_num(s1)} + {as_num(s2)} = {as_num(v)} km/h।")

for s in [36, 54, 72, 90, 108, 45]:
    v = s * 5 / 18
    add(f"Convert {s} km/h into m/s.",
        f"{as_num(s)} km/h ক m/s লৈ ৰূপান্তৰ কৰা।",
        r2(v), [r2(s * 18 / 5), r2(s / 2), r2(v * 2), r2(s)],
        f"Multiply by 5/18: {s} × 5/18 = {r2(v)} m/s.",
        f"৫/১৮ ৰে পূৰণ কৰিলে {as_num(r2(v))} m/s পোৱা যায়।")

for D, s1, s2 in [(600, 50, 60), (720, 60, 80), (480, 40, 60), (900, 75, 90)]:
    t1, t2 = D / s1, D / s2
    v = t1 - t2
    add(f"A car covers {D} km at {s1} km/h and another covers the same distance at {s2} km/h. Find the difference in time.",
        f"এখন গাড়ীয়ে {as_num(D)} কিমি {as_num(s1)} km/h বেগেৰে আৰু আনখনে {as_num(s2)} km/h বেগেৰে যায়। সময়ৰ পাৰ্থক্য নিৰ্ণয় কৰা।",
        r2(v), [r2(t1 + t2), r2(t2), r2(v * 2), r2(D / (s1 + s2))],
        f"Time at {s1} km/h = {r2(t1)} h; at {s2} km/h = {r2(t2)} h. Difference = {r2(v)} h.",
        f"সময়ৰ পাৰ্থক্য = {as_num(r2(v))} ঘণ্টা।")

for D, s1, s2 in [(300, 40, 60), (450, 50, 70), (240, 30, 50), (600, 80, 70)]:
    v = D / (s1 + s2)
    add(f"Two cars start from two towns {D} km apart and move towards each other at {s1} km/h and {s2} km/h. After how many hours will they meet?",
        f"{as_num(D)} কিমি দূৰত্বৰ দুখন চহৰৰ পৰা দুখন গাড়ী পৰস্পৰৰ ফালে {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে ওলায়। কিমান ঘণ্টাত লগ পাব?",
        r2(v), [r2(D / s1), r2(D / s2), r2(v * 2), r2(D / abs(s1 - s2))],
        f"Relative speed = {s1} + {s2} = {s1+s2} km/h, so time = {D}/{s1+s2} = {r2(v)} h.",
        f"আপেক্ষিক বেগ = {as_num(s1+s2)} km/h, সেয়ে সময় = {as_num(r2(v))} ঘণ্টা।")

for D, s1, s2, diff in [(120, 30, 40, 1), (180, 45, 60, 1), (240, 40, 60, 2), (150, 50, 75, 1)]:
    add(f"A man travelling at {s1} km/h reaches his destination {diff} hour(s) late, but at {s2} km/h he reaches {diff} hour(s) early. Find the distance.",
        f"এজন মানুহে {as_num(s1)} km/h বেগেৰে গ'লে {as_num(diff)} ঘণ্টা দেৰি হয়, কিন্তু {as_num(s2)} km/h বেগেৰে গ'লে {as_num(diff)} ঘণ্টা সোনকালে হয়। দূৰত্ব নিৰ্ণয় কৰা।",
        D, [D // 2, D * 2, D + 30, D - 30],
        f"Time difference = {2*diff} h = D/{s1} - D/{s2}, so D = {D} km.",
        f"সময়ৰ পাৰ্থক্য = {as_num(2*diff)} ঘণ্টা, সেয়ে D = {as_num(D)} কিমি।")

for d1, s1, d2, s2 in [(120, 60, 180, 90), (150, 50, 200, 80), (90, 45, 120, 60)]:
    v = d1 / s1 + d2 / s2
    add(f"A man travels {d1} km at {s1} km/h and then {d2} km at {s2} km/h. Find the total time taken.",
        f"এজন মানুহে {as_num(d1)} কিমি {as_num(s1)} km/h বেগেৰে আৰু তাৰ পিছত {as_num(d2)} কিমি {as_num(s2)} km/h বেগেৰে যায়। মুঠ সময় নিৰ্ণয় কৰা।",
        r2(v), [r2((d1 + d2) / (s1 + s2)), r2(v / 2), r2(v * 2), r2(d1 / s1)],
        f"Total time = {d1}/{s1} + {d2}/{s2} = {r2(v)} hours.",
        f"মুঠ সময় = {as_num(r2(v))} ঘণ্টা।")

for L, s1, s2 in [(400, 10, 6), (600, 15, 9), (800, 20, 12), (500, 12, 8)]:
    v = L / (s1 - s2)
    add(f"Two runners run around a circular track of length {L} m at speeds {s1} m/s and {s2} m/s in the same direction. After how many seconds will the faster runner overtake the slower one?",
        f"{as_num(L)} মিটাৰ দৈৰ্ঘ্যৰ বৃত্তাকাৰ পথত দুজন ধাৱকে {as_num(s1)} m/s আৰু {as_num(s2)} m/s বেগেৰে একে দিশত দৌৰে। কিমান ছেকেণ্ডত দ্ৰুতজনে লেহুকাক অতিক্ৰম কৰিব?",
        r2(v), [r2(L / (s1 + s2)), r2(v / 2), r2(v * 2), r2(L / s1)],
        f"Relative speed = {s1-s2} m/s; time = {L}/{s1-s2} = {r2(v)} s.",
        f"আপেক্ষিক বেগ = {as_num(s1-s2)} m/s; সময় = {as_num(r2(v))} ছেকেণ্ড।")

for r1, r2_, D in [(3, 4, 120), (5, 7, 210), (2, 5, 140), (7, 9, 288)]:
    v = D * r1 / (r1 + r2_)
    add(f"The speeds of two cars are in the ratio {r1} : {r2_}. If the distance between the towns is {D} km and they start towards each other, how far does the slower car travel before meeting?",
        f"দুখন গাড়ীৰ বেগৰ অনুপাত {as_num(r1)} : {as_num(r2_)}। চহৰ দুখনৰ দূৰত্ব {as_num(D)} কিমি। লগ পোৱাৰ আগে সৰু বেগৰ গাড়ীয়ে কিমান দূৰ যায়?",
        r2(v), [r2(D * r2_ / (r1 + r2_)), r2(D / 2), r2(v * 2), r2(D)],
        f"Distance is shared in the ratio of speeds. Slower car covers {D}×{r1}/{r1+r2_} = {r2(v)} km.",
        f"দূৰত্ব বেগৰ অনুপাতত ভাগ হয়। সৰু গাড়ী = {as_num(r2(v))} কিমি।")

for r1, r2_, diff in [(3, 4, 1), (5, 6, 2), (4, 5, 1), (7, 8, 3)]:
    add(f"The ratio of speeds of two cars is {r1} : {r2_}. If the slower car takes {diff} hour(s) more than the faster to cover the same distance, find the time taken by the faster car.",
        f"দুখন গাড়ীৰ বেগৰ অনুপাত {as_num(r1)} : {as_num(r2_)}। একে দূৰত্বত সৰু বেগৰ গাড়ীয়ে {as_num(diff)} ঘণ্টা বেছি লয়। দ্ৰুত গাড়ীৰ সময় নিৰ্ণয় কৰা।",
        r1 * diff, [r2_ * diff, r1 * diff + diff, r1 * diff - diff, diff],
        f"Time ratio = {r2_}:{r1}; difference = ({r2_}-{r1}) parts = {diff}, so faster car takes {r1*diff} hours.",
        f"সময়ৰ অনুপাত = {as_num(r2_)}:{as_num(r1)}; দ্ৰুত গাড়ীৰ সময় {as_num(r1*diff)} ঘণ্টা।")

for s, t in [(65, 4), (85, 2), (48, 7.5), (95, 3), (110, 2.5), (58, 5)]:
    v = s * t
    add(f"A car travels at {s} km/h for {t} hours. Find the distance covered.",
        f"এখন গাড়ীয়ে {as_num(s)} km/h বেগেৰে {as_num(t)} ঘণ্টা যায়। অতিক্ৰম কৰা দূৰত্ব নিৰ্ণয় কৰা।",
        r2(v), [r2(s + t), r2(v / 2), r2(v * 2), r2(s / t)],
        f"Distance = {s} × {t} = {r2(v)} km.",
        f"দূৰত্ব = {as_num(r2(v))} কিমি।")

for x, y in [(15, 45), (20, 60), (35, 55), (18, 36)]:
    v = 2 * x * y / (x + y)
    add(f"A car goes from A to B at {x} km/h and returns at {y} km/h. Find its average speed for the whole journey.",
        f"এখন গাড়ীয়ে A ৰ পৰা B লৈ {as_num(x)} km/h বেগেৰে যায় আৰু {as_num(y)} km/h বেগেৰে উভতি আহে। সমগ্ৰ যাত্ৰাৰ গড় বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2((x + y) / 2), r2(v + 5), r2(v - 5), r2(x + y)],
        f"Average speed = 2xy/(x+y) = {r2(v)} km/h.",
        f"গড় বেগ = {as_num(r2(v))} km/h।")

for s1, s2 in [(85, 65), (95, 75), (110, 85)]:
    v = s1 - s2
    add(f"Two cars travel in the same direction at {s1} km/h and {s2} km/h. Find their relative speed.",
        f"দুখন গাড়ী একে দিশত {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে যায়। আপেক্ষিক বেগ নিৰ্ণয় কৰা।",
        v, [s1 + s2, s2, s1, v * 2],
        f"Relative speed = {s1} - {s2} = {v} km/h.",
        f"আপেক্ষিক বেগ = {as_num(v)} km/h।")

for s1, s2 in [(65, 35), (80, 50), (95, 65)]:
    v = s1 + s2
    add(f"Two cars travel towards each other at {s1} km/h and {s2} km/h. Find their relative speed.",
        f"দুখন গাড়ী পৰস্পৰৰ ফালে {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে যায়। আপেক্ষিক বেগ নিৰ্ণয় কৰা।",
        v, [s1 - s2, s1, s2, v * 2],
        f"Relative speed = {s1} + {s2} = {v} km/h.",
        f"আপেক্ষিক বেগ = {as_num(v)} km/h।")

for s in [18, 27, 63, 81, 126]:
    v = s * 5 / 18
    add(f"Convert {s} km/h into m/s.",
        f"{as_num(s)} km/h ক m/s লৈ ৰূপান্তৰ কৰা।",
        r2(v), [r2(s * 18 / 5), r2(s / 2), r2(v * 2), r2(s)],
        f"{s} × 5/18 = {r2(v)} m/s.",
        f"{as_num(s)} × ৫/১৮ = {as_num(r2(v))} m/s।")

for D, s1, s2 in [(540, 45, 60), (840, 70, 84), (360, 30, 45)]:
    t1, t2 = D / s1, D / s2
    v = t1 - t2
    add(f"A car covers {D} km at {s1} km/h and another covers the same distance at {s2} km/h. Find the difference in time.",
        f"এখন গাড়ীয়ে {as_num(D)} কিমি {as_num(s1)} km/h আৰু আনখনে {as_num(s2)} km/h বেগেৰে যায়। সময়ৰ পাৰ্থক্য নিৰ্ণয় কৰা।",
        r2(v), [r2(t1 + t2), r2(t2), r2(v * 2), r2(D / (s1 + s2))],
        f"Difference = {D}/{s1} - {D}/{s2} = {r2(v)} h.",
        f"পাৰ্থক্য = {as_num(r2(v))} ঘণ্টা।")

for D, s1, s2 in [(360, 45, 75), (280, 35, 45), (520, 60, 70)]:
    v = D / (s1 + s2)
    add(f"Two cars start from two towns {D} km apart and move towards each other at {s1} km/h and {s2} km/h. After how many hours will they meet?",
        f"{as_num(D)} কিমি দূৰত্বৰ দুখন চহৰৰ পৰা দুখন গাড়ী পৰস্পৰৰ ফালে {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে ওলায়। কিমান ঘণ্টাত লগ পাব?",
        r2(v), [r2(D / s1), r2(D / s2), r2(v * 2), r2(D / abs(s1 - s2))],
        f"Time = {D}/({s1}+{s2}) = {r2(v)} h.",
        f"সময় = {as_num(r2(v))} ঘণ্টা।")

for D, s1, s2, diff in [(90, 20, 30, 1), (150, 25, 50, 2), (200, 40, 50, 1)]:
    add(f"A man travelling at {s1} km/h reaches his destination {diff} hour(s) late, but at {s2} km/h he reaches {diff} hour(s) early. Find the distance.",
        f"এজন মানুহে {as_num(s1)} km/h বেগেৰে গ'লে {as_num(diff)} ঘণ্টা দেৰি হয়, কিন্তু {as_num(s2)} km/h বেগেৰে গ'লে {as_num(diff)} ঘণ্টা সোনকালে হয়। দূৰত্ব নিৰ্ণয় কৰা।",
        D, [D // 2, D * 2, D + 20, D - 20],
        f"2×{diff} = D/{s1} - D/{s2}, so D = {D} km.",
        f"D = {as_num(D)} কিমি।")

for d1, s1, d2, s2 in [(180, 60, 240, 80), (100, 50, 150, 75), (240, 80, 180, 60)]:
    v = d1 / s1 + d2 / s2
    add(f"A man travels {d1} km at {s1} km/h and then {d2} km at {s2} km/h. Find the total time taken.",
        f"এজন মানুহে {as_num(d1)} কিমি {as_num(s1)} km/h আৰু {as_num(d2)} কিমি {as_num(s2)} km/h বেগেৰে যায়। মুঠ সময় নিৰ্ণয় কৰা।",
        r2(v), [r2((d1 + d2) / (s1 + s2)), r2(v / 2), r2(v * 2), r2(d1 / s1)],
        f"Total time = {r2(v)} hours.",
        f"মুঠ সময় = {as_num(r2(v))} ঘণ্টা।")

for L, s1, s2 in [(300, 8, 5), (720, 18, 10), (450, 15, 9)]:
    v = L / (s1 - s2)
    add(f"Two runners run around a circular track of length {L} m at speeds {s1} m/s and {s2} m/s in the same direction. After how many seconds will the faster runner overtake the slower one?",
        f"{as_num(L)} মিটাৰ দৈৰ্ঘ্যৰ বৃত্তাকাৰ পথত দুজন ধাৱকে {as_num(s1)} m/s আৰু {as_num(s2)} m/s বেগেৰে একে দিশত দৌৰে। কিমান ছেকেণ্ডত দ্ৰুতজনে লেহুকাক অতিক্ৰম কৰিব?",
        r2(v), [r2(L / (s1 + s2)), r2(v / 2), r2(v * 2), r2(L / s1)],
        f"Time = {L}/({s1}-{s2}) = {r2(v)} s.",
        f"সময় = {as_num(r2(v))} ছেকেণ্ড।")

for r1, r2_, D in [(4, 5, 180), (3, 7, 200), (5, 9, 280)]:
    v = D * r1 / (r1 + r2_)
    add(f"The speeds of two cars are in the ratio {r1} : {r2_}. If the distance between the towns is {D} km and they start towards each other, how far does the slower car travel before meeting?",
        f"দুখন গাড়ীৰ বেগৰ অনুপাত {as_num(r1)} : {as_num(r2_)}। চহৰ দুখনৰ দূৰত্ব {as_num(D)} কিমি। লগ পোৱাৰ আগে সৰু বেগৰ গাড়ীয়ে কিমান দূৰ যায়?",
        r2(v), [r2(D * r2_ / (r1 + r2_)), r2(D / 2), r2(v * 2), r2(D)],
        f"Slower car covers {D}×{r1}/{r1+r2_} = {r2(v)} km.",
        f"সৰু গাড়ী = {as_num(r2(v))} কিমি।")

append("time-speed-distance", rows)
