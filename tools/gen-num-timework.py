#!/usr/bin/env python3
"""Time & Work: 95+ hard bilingual questions with detailed explanations."""

import sys
from fractions import Fraction as F
sys.path.insert(0, "tools")
from num_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def fr(x):
    x = F(x)
    return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator}"


# 1. together
for x, y in [(12, 6), (10, 15), (20, 30), (8, 24), (18, 9), (16, 48), (25, 100), (14, 35)]:
    v = F(x * y, x + y)
    add(f"A can do a piece of work in {x} days and B in {y} days. Working together, in how many days will they finish it?",
        f"A এ এটা কাম {as_num(x)} দিনত আৰু B এ {as_num(y)} দিনত কৰিব পাৰে। একেলগে কাম কৰিলে কিমান দিনত শেষ হ'ব?",
        fr(v), [fr(F(x + y, 2)), fr(F(x * y, abs(x - y))), fr(v * 2), fr(v / 2)],
        f"A's one-day work is 1/{x} and B's is 1/{y}. Together they do 1/{x} + 1/{y} = {(x+y)}/{x*y} of the work in a day, so the time taken is {x*y}/{x+y} = {fr(v)} days.",
        f"A ৰ এদিনৰ কাম ১/{as_num(x)} আৰু B ৰ ১/{as_num(y)}। একেলগে এদিনত {(as_num(x+y))}/{as_num(x*y)} কাম কৰে, সেয়ে সময় = {as_num(fr(v))} দিন।")

# 2. other alone
for T, x in [(6, 10), (8, 12), (10, 15), (12, 20), (9, 12), (15, 20)]:
    v = F(T * x, x - T)
    add(f"A and B together can finish a work in {T} days. If A alone can do it in {x} days, in how many days can B alone finish it?",
        f"A আৰু B একেলগে {as_num(T)} দিনত কাম শেষ কৰে। A অকলে {as_num(x)} দিনত কৰিব পাৰে। B অকলে কিমান দিনত শেষ কৰিব?",
        fr(v), [fr(F(T * x, x + T)), fr(x - T), fr(v * 2), fr(v / 2)],
        f"A's one-day work is 1/{x}. Together they do 1/{T}, so B's one-day work is 1/{T} - 1/{x} = {(x-T)}/{T*x}. Hence B alone takes {T*x}/{x-T} = {fr(v)} days.",
        f"A ৰ এদিনৰ কাম ১/{as_num(x)}। B ৰ কাম = ১/{as_num(T)} - ১/{as_num(x)} = {as_num(x-T)}/{as_num(T*x)}, সেয়ে B অকলে {as_num(fr(v))} দিন লয়।")

# 3. efficiency
for ratio, base in [(2, 15), (3, 24), (4, 20), (5, 30), (2, 9), (3, 12)]:
    a_days = base
    b_days = base * ratio
    v = F(a_days * b_days, a_days + b_days)
    add(f"A is {ratio} times as efficient as B. If B alone can finish a work in {b_days} days, in how many days can A and B together finish it?",
        f"A এ B তকৈ {as_num(ratio)} গুণ দক্ষ। B অকলে {as_num(b_days)} দিনত কাম শেষ কৰিলে A আৰু B একেলগে কিমান দিনত শেষ কৰিব?",
        fr(v), [fr(F(a_days + b_days, 2)), fr(F(a_days * b_days, abs(a_days - b_days))), fr(v * 2), fr(v / 2)],
        f"Since A is {ratio} times as efficient, A alone takes {b_days}/{ratio} = {a_days} days. Together their one-day work is 1/{a_days} + 1/{b_days}, giving {fr(v)} days.",
        f"A ৰ সময় = {as_num(b_days)}/{as_num(ratio)} = {as_num(a_days)} দিন। একেলগে {as_num(fr(v))} দিন লাগে।")

# 4. men-days
for m1, d1, m2 in [(12, 10, 8), (15, 8, 10), (20, 12, 16), (24, 15, 18), (30, 6, 20), (16, 9, 12)]:
    d2 = F(m1 * d1, m2)
    add(f"If {m1} men can complete a work in {d1} days, in how many days can {m2} men complete the same work?",
        f"{as_num(m1)} জন মানুহে {as_num(d1)} দিনত কাম শেষ কৰিলে {as_num(m2)} জনে কিমান দিনত শেষ কৰিব?",
        fr(d2), [fr(F(m2 * d1, m1)), fr(d2 * 2), fr(d2 / 2), fr(d1)],
        f"Total work is {m1} × {d1} = {m1*d1} man-days. With {m2} men the time is {m1*d1}/{m2} = {fr(d2)} days.",
        f"মুঠ কাম = {as_num(m1*d1)} মানুহ-দিন। {as_num(m2)} জনে {as_num(fr(d2))} দিনত শেষ কৰিব।")

# 5. alternate days
for x, y in [(10, 15), (12, 18), (8, 12), (6, 9), (20, 30)]:
    # A on odd days, B on even days
    total = F(0)
    day = 0
    while total < 1:
        day += 1
        total += F(1, x) if day % 2 == 1 else F(1, y)
    add(f"A can do a work in {x} days and B in {y} days. They work on alternate days, with A starting. In how many days will the work be finished?",
        f"A এ {as_num(x)} দিনত আৰু B এ {as_num(y)} দিনত কাম কৰে। তেওঁলোকে পাল পাতি কাম কৰে, A ৰ পৰা আৰম্ভ কৰি। কিমান দিনত কাম শেষ হ'ব?",
        day, [day + 1, day - 1, x + y, 2 * day],
        f"In each 2-day cycle A does 1/{x} and B does 1/{y}, i.e. {fr(F(1,x)+F(1,y))} of the work. Completing the work takes {day} days.",
        f"প্ৰতি ২ দিনৰ চক্ৰত A এ ১/{as_num(x)} আৰু B এ ১/{as_num(y)} কাম কৰে। মুঠ {as_num(day)} দিন লাগে।")

# 6. A leaves
for x, y, k in [(12, 18, 4), (10, 15, 5), (20, 30, 8), (8, 12, 3), (15, 20, 6)]:
    rem = 1 - F(k, x)
    t = rem * y
    add(f"A can do a work in {x} days and B in {y} days. A works alone for {k} days and then leaves. In how many more days will B finish the remaining work?",
        f"A এ {as_num(x)} দিনত আৰু B এ {as_num(y)} দিনত কাম কৰে। A অকলে {as_num(k)} দিন কাম কৰি আঁতৰি যায়। B এ বাকী কাম কিমান দিনত শেষ কৰিব?",
        fr(t), [fr(F(y, x) * k), fr(t / 2), fr(t * 2), fr(y - k)],
        f"In {k} days A finishes {k}/{x} of the work, leaving 1 - {k}/{x} = {fr(rem)}. B does 1/{y} per day, so B needs {fr(rem)} × {y} = {fr(t)} days.",
        f"{as_num(k)} দিনত A এ {as_num(k)}/{as_num(x)} কাম কৰে, বাকী {fr(rem)}। B ৰ সময় = {as_num(fr(t))} দিন।")

# 7. wages
for x, y, W in [(12, 18, 3000), (10, 15, 5000), (20, 30, 7500), (8, 24, 6400)]:
    ra, rb = F(1, x), F(1, y)
    sa = W * ra / (ra + rb)
    add(f"A and B together complete a work in some days and receive {W}. If A alone can do the work in {x} days and B in {y} days, find A's share of the wages.",
        f"A আৰু B একেলগে কাম কৰি {as_num(W)} টকা পায়। A অকলে {as_num(x)} দিনত আৰু B অকলে {as_num(y)} দিনত কাম কৰিব পাৰে। A ৰ অংশ নিৰ্ণয় কৰা।",
        round(sa, 2), [round(W - sa, 2), round(W * y / (x + y), 2), round(sa / 2, 2), round(sa * 2, 2)],
        f"Wages are shared in the ratio of work done, i.e. in the ratio of efficiencies 1/{x} : 1/{y} = {y}:{x}. A's share is {W} × {y}/{x+y} = {round(sa,2)}.",
        f"মজুৰি কামৰ অনুপাতত ভাগ হয়, অৰ্থাৎ {as_num(y)}:{as_num(x)}। A ৰ অংশ = {as_num(round(sa,2))} টকা।")

# 8. fraction of work
for x, t in [(12, 5), (15, 7), (20, 9), (18, 6), (24, 10)]:
    v = F(t, x)
    add(f"A can finish a work in {x} days. What fraction of the work will A complete in {t} days?",
        f"A এ {as_num(x)} দিনত কাম শেষ কৰে। {as_num(t)} দিনত A এ কামৰ কিমান অংশ শেষ কৰিব?",
        fr(v), [fr(F(x, t)), fr(F(t, x + t)), fr(v / 2)],
        f"A completes 1/{x} of the work per day. In {t} days A completes {t}/{x} = {fr(v)} of the work.",
        f"A এ দিনে ১/{as_num(x)} কাম কৰে। {as_num(t)} দিনত {as_num(fr(v))} অংশ শেষ কৰে।")

# 9. three workers
for x, y, z in [(10, 12, 15), (12, 15, 20), (8, 12, 24), (9, 18, 6)]:
    v = 1 / (F(1, x) + F(1, y) + F(1, z))
    add(f"A, B and C can do a work in {x}, {y} and {z} days respectively. Working together, in how many days will they finish it?",
        f"A, B আৰু C এ ক্ৰমে {as_num(x)}, {as_num(y)} আৰু {as_num(z)} দিনত কাম কৰে। একেলগে কিমান দিনত শেষ কৰিব?",
        fr(v), [fr(v * 2), fr(v / 2), fr(F(x + y + z, 3)), fr(F(x * y * z, x * y + y * z + z * x))],
        f"Combined one-day work = 1/{x} + 1/{y} + 1/{z} = {fr(F(1,x)+F(1,y)+F(1,z))}. Hence the time is {fr(v)} days.",
        f"একেলগে এদিনৰ কাম = {fr(F(1,x)+F(1,y)+F(1,z))}, সেয়ে সময় {as_num(fr(v))} দিন।")

# 10. inverse ratio
for x, y in [(6, 12), (9, 3), (10, 5), (8, 16)]:
    add(f"A is {y//x if y>x else x//y} times as fast as B. If B takes {max(x,y)} days, how long will A take?",
        f"A এ B তকৈ {as_num(y//x if y>x else x//y)} গুণ দ্ৰুত। B এ {as_num(max(x,y))} দিন ল'লে A এ কিমান দিন ল'ব?",
        min(x, y), [max(x, y), min(x, y) * 2, min(x, y) // 2, min(x, y) + 1],
        f"Time is inversely proportional to speed. Since A is faster by the given factor, A takes {min(x,y)} days.",
        f"সময় গতিৰ বিপৰীত অনুপাতত থাকে, সেয়ে A এ {as_num(min(x,y))} দিন লয়।")

# extra batch
for x, y in [(9, 18), (15, 10), (24, 8), (30, 20), (40, 10), (36, 12)]:
    v = F(x * y, x + y)
    add(f"A can do a piece of work in {x} days and B in {y} days. Working together, in how many days will they finish it?",
        f"A এ এটা কাম {as_num(x)} দিনত আৰু B এ {as_num(y)} দিনত কৰিব পাৰে। একেলগে কাম কৰিলে কিমান দিনত শেষ হ'ব?",
        fr(v), [fr(F(x + y, 2)), fr(F(x * y, abs(x - y))), fr(v * 2), fr(v / 2)],
        f"A does 1/{x} and B does 1/{y} per day. Their combined rate is {fr(F(1,x)+F(1,y))} per day, so the work takes {fr(v)} days.",
        f"A ৰ হাৰ ১/{as_num(x)}, B ৰ ১/{as_num(y)}। একেলগে {as_num(fr(v))} দিন লাগে।")

for T, x in [(5, 10), (6, 8), (10, 12), (4, 6), (8, 10), (6, 9)]:
    v = F(T * x, x - T)
    add(f"A and B together can finish a work in {T} days. If A alone can do it in {x} days, in how many days can B alone finish it?",
        f"A আৰু B একেলগে {as_num(T)} দিনত কাম শেষ কৰে। A অকলে {as_num(x)} দিনত কৰিব পাৰে। B অকলে কিমান দিনত শেষ কৰিব?",
        fr(v), [fr(F(T * x, x + T)), fr(x - T), fr(v * 2), fr(v / 2)],
        f"B's one-day work = 1/{T} - 1/{x} = {fr(F(1,T)-F(1,x))}, so B alone takes {fr(v)} days.",
        f"B ৰ এদিনৰ কাম = {fr(F(1,T)-F(1,x))}, সেয়ে B অকলে {as_num(fr(v))} দিন লয়।")

for ratio, base in [(2, 12), (3, 20), (4, 20), (2, 18), (3, 24), (5, 30)]:
    a_days = base
    b_days = base * ratio
    v = F(a_days * b_days, a_days + b_days)
    add(f"A is {ratio} times as efficient as B. If B alone can finish a work in {b_days} days, in how many days can A and B together finish it?",
        f"A এ B তকৈ {as_num(ratio)} গুণ দক্ষ। B অকলে {as_num(b_days)} দিনত কাম শেষ কৰিলে A আৰু B একেলগে কিমান দিনত শেষ কৰিব?",
        fr(v), [fr(F(a_days + b_days, 2)), fr(F(a_days * b_days, abs(a_days - b_days))), fr(v * 2), fr(v / 2)],
        f"A alone takes {a_days} days. Together the rate is 1/{a_days} + 1/{b_days}, giving {fr(v)} days.",
        f"A ৰ সময় {as_num(a_days)} দিন। একেলগে {as_num(fr(v))} দিন লাগে।")

for m1, d1, m2 in [(10, 12, 8), (18, 10, 12), (25, 8, 10), (14, 9, 7), (22, 6, 11), (36, 5, 15)]:
    d2 = F(m1 * d1, m2)
    add(f"If {m1} men can complete a work in {d1} days, in how many days can {m2} men complete the same work?",
        f"{as_num(m1)} জন মানুহে {as_num(d1)} দিনত কাম শেষ কৰিলে {as_num(m2)} জনে কিমান দিনত শেষ কৰিব?",
        fr(d2), [fr(F(m2 * d1, m1)), fr(d2 * 2), fr(d2 / 2), fr(d1)],
        f"Total work = {m1}×{d1} = {m1*d1} man-days, so {m2} men need {fr(d2)} days.",
        f"মুঠ কাম = {as_num(m1*d1)} মানুহ-দিন, সেয়ে {as_num(fr(d2))} দিন লাগে।")

for x, y in [(14, 21), (16, 24), (9, 12), (18, 27)]:
    total = F(0)
    day = 0
    while total < 1:
        day += 1
        total += F(1, x) if day % 2 == 1 else F(1, y)
    add(f"A can do a work in {x} days and B in {y} days. They work on alternate days, with A starting. In how many days will the work be finished?",
        f"A এ {as_num(x)} দিনত আৰু B এ {as_num(y)} দিনত কাম কৰে। তেওঁলোকে পাল পাতি কাম কৰে, A ৰ পৰা আৰম্ভ কৰি। কিমান দিনত কাম শেষ হ'ব?",
        day, [day + 1, day - 1, x + y, 2 * day],
        f"Each 2-day cycle completes {fr(F(1,x)+F(1,y))} of the work; the work finishes in {day} days.",
        f"প্ৰতি ২ দিনত {fr(F(1,x)+F(1,y))} কাম হয়; মুঠ {as_num(day)} দিন লাগে।")

for x, y, k in [(9, 18, 3), (12, 24, 4), (18, 27, 6), (10, 20, 4), (16, 24, 4)]:
    rem = 1 - F(k, x)
    t = rem * y
    add(f"A can do a work in {x} days and B in {y} days. A works alone for {k} days and then leaves. In how many more days will B finish the remaining work?",
        f"A এ {as_num(x)} দিনত আৰু B এ {as_num(y)} দিনত কাম কৰে। A অকলে {as_num(k)} দিন কাম কৰি আঁতৰি যায়। B এ বাকী কাম কিমান দিনত শেষ কৰিব?",
        fr(t), [fr(F(y, x) * k), fr(t / 2), fr(t * 2), fr(y - k)],
        f"A finishes {k}/{x}, leaving {fr(rem)}; B needs {fr(rem)}×{y} = {fr(t)} days.",
        f"A এ {as_num(k)}/{as_num(x)} কৰে, বাকী {fr(rem)}; B ৰ সময় {as_num(fr(t))} দিন।")

for x, y, W in [(9, 18, 5400), (12, 24, 7200), (15, 10, 5000), (20, 30, 10000)]:
    ra, rb = F(1, x), F(1, y)
    sa = W * ra / (ra + rb)
    add(f"A and B together complete a work in some days and receive {W}. If A alone can do the work in {x} days and B in {y} days, find A's share of the wages.",
        f"A আৰু B একেলগে কাম কৰি {as_num(W)} টকা পায়। A অকলে {as_num(x)} দিনত আৰু B অকলে {as_num(y)} দিনত কাম কৰিব পাৰে। A ৰ অংশ নিৰ্ণয় কৰা।",
        round(sa, 2), [round(W - sa, 2), round(W * y / (x + y), 2), round(sa / 2, 2), round(sa * 2, 2)],
        f"Efficiency ratio 1/{x}:1/{y} = {y}:{x}, so A gets {W}×{y}/{x+y} = {round(sa,2)}.",
        f"দক্ষতাৰ অনুপাত {as_num(y)}:{as_num(x)}, সেয়ে A ৰ অংশ {as_num(round(sa,2))} টকা।")

for x, t in [(16, 6), (21, 9), (28, 12), (30, 18), (36, 15)]:
    v = F(t, x)
    add(f"A can finish a work in {x} days. What fraction of the work will A complete in {t} days?",
        f"A এ {as_num(x)} দিনত কাম শেষ কৰে। {as_num(t)} দিনত A এ কামৰ কিমান অংশ শেষ কৰিব?",
        fr(v), [fr(F(x, t)), fr(F(t, x + t)), fr(v / 2)],
        f"A does 1/{x} per day, so in {t} days A does {t}/{x} = {fr(v)}.",
        f"A এ দিনে ১/{as_num(x)} কৰে, সেয়ে {as_num(t)} দিনত {as_num(fr(v))} অংশ।")

for x, y, z in [(10, 15, 30), (12, 24, 8), (20, 30, 60)]:
    v = 1 / (F(1, x) + F(1, y) + F(1, z))
    add(f"A, B and C can do a work in {x}, {y} and {z} days respectively. Working together, in how many days will they finish it?",
        f"A, B আৰু C এ ক্ৰমে {as_num(x)}, {as_num(y)} আৰু {as_num(z)} দিনত কাম কৰে। একেলগে কিমান দিনত শেষ কৰিব?",
        fr(v), [fr(v * 2), fr(v / 2), fr(F(x + y + z, 3)), fr(v + 1)],
        f"Combined rate = {fr(F(1,x)+F(1,y)+F(1,z))} per day, so the time is {fr(v)} days.",
        f"একেলগে হাৰ = {fr(F(1,x)+F(1,y)+F(1,z))}, সেয়ে সময় {as_num(fr(v))} দিন।")

append("time-work", rows)
