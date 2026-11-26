#!/usr/bin/env python3
"""Pipes & Cisterns: 95+ hard bilingual questions."""

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


def fill(x, y):
    return F(x * y, x + y)


def drain(x, y):
    return F(x * y, y - x)


for x, y in [(12, 6), (10, 15), (20, 30), (8, 24), (18, 9), (16, 48), (25, 100), (14, 35)]:
    v = fill(x, y)
    add(f"Pipe A can fill a tank in {x} hours and pipe B in {y} hours. If both pipes are opened together, in how many hours will the tank be filled?",
        f"পাইপ A এ এটা টেংক {as_num(x)} ঘণ্টাত আৰু পাইপ B এ {as_num(y)} ঘণ্টাত ভৰ্তি কৰে। দুয়োটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(F(x + y, 2)), fr(F(x * y, abs(x - y))), fr(v * 2), fr(v / 2)],
        f"A fills 1/{x} of the tank per hour and B fills 1/{y}. Together they fill 1/{x} + 1/{y} = {(x+y)}/{x*y} per hour, so the tank fills in {x*y}/{x+y} = {fr(v)} hours.",
        f"A এ ঘণ্টাত ১/{as_num(x)} আৰু B এ ১/{as_num(y)} ভৰ্তি কৰে। একেলগে {as_num(fr(v))} ঘণ্টাত ভৰ্তি হ'ব।")

for x, y in [(6, 10), (8, 12), (10, 15), (12, 20), (9, 12), (15, 20)]:
    v = drain(x, y)
    add(f"Pipe A can fill a tank in {x} hours while pipe B can empty it in {y} hours. If both are opened together, in how many hours will the tank be filled?",
        f"পাইপ A এ টেংক {as_num(x)} ঘণ্টাত ভৰ্তি কৰে আৰু পাইপ B এ {as_num(y)} ঘণ্টাত খালী কৰে। দুয়োটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(F(x * y, x + y)), fr(y - x), fr(v * 2), fr(v / 2)],
        f"Net filling per hour is 1/{x} - 1/{y} = {(y-x)}/{x*y}, so the tank fills in {x*y}/{y-x} = {fr(v)} hours.",
        f"ঘণ্টাত মুঠ ভৰ্তি = ১/{as_num(x)} - ১/{as_num(y)} = {as_num(y-x)}/{as_num(x*y)}, সেয়ে {as_num(fr(v))} ঘণ্টা লাগে।")

for T, x in [(6, 10), (8, 12), (10, 15), (12, 20), (9, 12), (15, 20)]:
    v = F(T * x, x - T)
    add(f"Two pipes A and B together fill a tank in {T} hours. If A alone fills it in {x} hours, in how many hours will B alone fill it?",
        f"দুটা পাইপ A আৰু B একেলগে {as_num(T)} ঘণ্টাত টেংক ভৰ্তি কৰে। A অকলে {as_num(x)} ঘণ্টাত ভৰ্তি কৰিলে B অকলে কিমান ঘণ্টাত কৰিব?",
        fr(v), [fr(F(T * x, x + T)), fr(x - T), fr(v * 2), fr(v / 2)],
        f"A fills 1/{x} per hour and together they fill 1/{T}. Hence B fills 1/{T} - 1/{x} = {(x-T)}/{T*x} per hour, so B alone takes {fr(v)} hours.",
        f"A ৰ হাৰ ১/{as_num(x)}, একেলগে ১/{as_num(T)}। B ৰ হাৰ {as_num(x-T)}/{as_num(T*x)}, সেয়ে B অকলে {as_num(fr(v))} ঘণ্টা লয়।")

for x, y in [(10, 15), (12, 18), (8, 12), (20, 30), (6, 9)]:
    v = drain(x, y)
    add(f"A tank is filled by a pipe in {x} hours, but a leak empties it in {y} hours. If the pipe is opened with the leak present, how long will the tank take to fill?",
        f"এটা পাইপে টেংক {as_num(x)} ঘণ্টাত ভৰ্তি কৰে, কিন্তু এটা ছিদ্ৰই {as_num(y)} ঘণ্টাত খালী কৰে। ছিদ্ৰ থকা অৱস্থাত পাইপ খুলিলে কিমান সময় লাগিব?",
        fr(v), [fr(F(x * y, x + y)), fr(y - x), fr(v * 2), fr(v / 2)],
        f"Effective rate = 1/{x} - 1/{y} = {fr(F(1,x)-F(1,y))} per hour. The tank therefore fills in {fr(v)} hours.",
        f"কাৰ্যকৰী হাৰ = {fr(F(1,x)-F(1,y))} প্ৰতি ঘণ্টা, সেয়ে {as_num(fr(v))} ঘণ্টা লাগে।")

for x, y, z in [(10, 12, 15), (12, 15, 20), (8, 12, 24), (9, 18, 6), (15, 20, 30)]:
    v = 1 / (F(1, x) + F(1, y) + F(1, z))
    add(f"Three pipes A, B and C can fill a tank in {x}, {y} and {z} hours respectively. If all three are opened together, in how many hours will the tank be filled?",
        f"তিনিটা পাইপ A, B আৰু C এ ক্ৰমে {as_num(x)}, {as_num(y)} আৰু {as_num(z)} ঘণ্টাত টেংক ভৰ্তি কৰে। তিনিওটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(v * 2), fr(v / 2), fr(F(x + y + z, 3)), fr(v + 1)],
        f"Combined rate = 1/{x} + 1/{y} + 1/{z} = {fr(F(1,x)+F(1,y)+F(1,z))} per hour, so the time is {fr(v)} hours.",
        f"একেলগে হাৰ = {fr(F(1,x)+F(1,y)+F(1,z))} প্ৰতি ঘণ্টা, সেয়ে সময় {as_num(fr(v))} ঘণ্টা।")

for x, y, k in [(12, 18, 4), (10, 15, 5), (20, 30, 8), (8, 12, 3), (15, 20, 6)]:
    rem = 1 - F(k, x)
    t = rem * y
    add(f"Pipe A fills a tank in {x} hours and pipe B in {y} hours. A is opened first for {k} hours and then closed. How long will B take to fill the remaining part?",
        f"পাইপ A এ টেংক {as_num(x)} ঘণ্টাত আৰু B এ {as_num(y)} ঘণ্টাত ভৰ্তি কৰে। A প্ৰথমে {as_num(k)} ঘণ্টা খোলা থাকি বন্ধ কৰা হয়। বাকী অংশ B এ কিমান সময়ত ভৰ্তি কৰিব?",
        fr(t), [fr(F(y, x) * k), fr(t / 2), fr(t * 2), fr(y - k)],
        f"In {k} hours A fills {k}/{x}, leaving {fr(rem)}. B fills 1/{y} per hour, so B needs {fr(rem)} × {y} = {fr(t)} hours.",
        f"{as_num(k)} ঘণ্টাত A এ {as_num(k)}/{as_num(x)} ভৰ্তি কৰে, বাকী {fr(rem)}। B ৰ সময় {as_num(fr(t))} ঘণ্টা।")

for rate, t in [(15, 8), (20, 6), (25, 12), (30, 5), (12, 15)]:
    cap = rate * t
    add(f"A pipe fills a tank at the rate of {rate} litres per hour and takes {t} hours to fill it. Find the capacity of the tank.",
        f"এটা পাইপে ঘণ্টাত {as_num(rate)} লিটাৰ হাৰে টেংক ভৰ্তি কৰে আৰু {as_num(t)} ঘণ্টা লাগে। টেংকৰ ধাৰণক্ষমতা নিৰ্ণয় কৰা।",
        cap, [rate + t, cap // 2, cap * 2, rate],
        f"Capacity = rate × time = {rate} × {t} = {cap} litres.",
        f"ধাৰণক্ষমতা = হাৰ × সময় = {as_num(rate)} × {as_num(t)} = {as_num(cap)} লিটাৰ।")

for x, y in [(10, 15), (12, 18), (8, 12), (6, 9)]:
    total = F(0)
    h = 0
    while total < 1:
        h += 1
        total += F(1, x) if h % 2 == 1 else F(1, y)
    add(f"Pipes A and B fill a tank in {x} and {y} hours respectively. They are opened alternately for one hour each, starting with A. In how many hours will the tank be filled?",
        f"পাইপ A আৰু B এ ক্ৰমে {as_num(x)} আৰু {as_num(y)} ঘণ্টাত টেংক ভৰ্তি কৰে। A ৰ পৰা আৰম্ভ কৰি পাল পাতি এঘণ্টাকৈ খোলা হয়। কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        h, [h + 1, h - 1, x + y, 2 * h],
        f"In every two hours the pipes fill 1/{x} + 1/{y} = {fr(F(1,x)+F(1,y))} of the tank. The tank is full in {h} hours.",
        f"প্ৰতি দুঘণ্টাত ১/{as_num(x)} + ১/{as_num(y)} = {fr(F(1,x)+F(1,y))} ভৰ্তি হয়। মুঠ {as_num(h)} ঘণ্টা লাগে।")

for T, x in [(6, 10), (8, 12), (10, 15), (12, 20)]:
    v = F(T * x, x - T)
    add(f"A pipe fills a tank in {x} hours and with an outlet open it fills in {T} hours. How long would the outlet alone take to empty the full tank?",
        f"এটা পাইপে টেংক {as_num(x)} ঘণ্টাত ভৰ্তি কৰে, কিন্তু এটা আউটলেট খোলা থাকিলে {as_num(T)} ঘণ্টা লাগে। আউটলেটে ভৰ্তি টেংক অকলে কিমান সময়ত খালী কৰিব?",
        fr(v), [fr(F(T * x, x + T)), fr(x - T), fr(v * 2), fr(v / 2)],
        f"Outlet rate = 1/{T} - 1/{x} = {fr(F(1,T)-F(1,x))} per hour, so it empties the tank in {fr(v)} hours.",
        f"আউটলেটৰ হাৰ = {fr(F(1,T)-F(1,x))} প্ৰতি ঘণ্টা, সেয়ে {as_num(fr(v))} ঘণ্টাত খালী কৰে।")

for x, y, z in [(6, 8, 12), (10, 12, 15), (8, 12, 24), (9, 12, 18)]:
    v = 1 / (F(1, x) + F(1, y) - F(1, z))
    add(f"Two inlet pipes fill a tank in {x} and {y} hours, while an outlet pipe empties it in {z} hours. If all three are opened together, in how many hours will the tank be filled?",
        f"দুটা ইনলেট পাইপে টেংক {as_num(x)} আৰু {as_num(y)} ঘণ্টাত ভৰ্তি কৰে, এটা আউটলেটে {as_num(z)} ঘণ্টাত খালী কৰে। তিনিওটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(v * 2), fr(v / 2), fr(F(x + y + z, 3)), fr(v + 1)],
        f"Net rate = 1/{x} + 1/{y} - 1/{z} = {fr(F(1,x)+F(1,y)-F(1,z))} per hour, giving {fr(v)} hours.",
        f"মুঠ হাৰ = {fr(F(1,x)+F(1,y)-F(1,z))} প্ৰতি ঘণ্টা, সেয়ে {as_num(fr(v))} ঘণ্টা।")

for x, y in [(9, 18), (15, 10), (24, 8), (30, 20), (40, 10), (36, 12)]:
    v = fill(x, y)
    add(f"Pipe A can fill a tank in {x} hours and pipe B in {y} hours. If both pipes are opened together, in how many hours will the tank be filled?",
        f"পাইপ A এ এটা টেংক {as_num(x)} ঘণ্টাত আৰু পাইপ B এ {as_num(y)} ঘণ্টাত ভৰ্তি কৰে। দুয়োটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(F(x + y, 2)), fr(F(x * y, abs(x - y))), fr(v * 2), fr(v / 2)],
        f"Combined rate = 1/{x} + 1/{y} = {fr(F(1,x)+F(1,y))} per hour, so the time is {fr(v)} hours.",
        f"একেলগে হাৰ = {fr(F(1,x)+F(1,y))}, সেয়ে সময় {as_num(fr(v))} ঘণ্টা।")

for x, y in [(7, 11), (9, 13), (6, 8), (10, 14)]:
    v = drain(x, y)
    add(f"Pipe A can fill a tank in {x} hours while pipe B can empty it in {y} hours. If both are opened together, in how many hours will the tank be filled?",
        f"পাইপ A এ টেংক {as_num(x)} ঘণ্টাত ভৰ্তি কৰে আৰু পাইপ B এ {as_num(y)} ঘণ্টাত খালী কৰে। দুয়োটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(F(x * y, x + y)), fr(y - x), fr(v * 2), fr(v / 2)],
        f"Net rate = 1/{x} - 1/{y} = {fr(F(1,x)-F(1,y))} per hour, so the time is {fr(v)} hours.",
        f"মুঠ হাৰ = {fr(F(1,x)-F(1,y))}, সেয়ে সময় {as_num(fr(v))} ঘণ্টা।")

for T, x in [(5, 10), (6, 8), (10, 12), (4, 6)]:
    v = F(T * x, x - T)
    add(f"Two pipes A and B together fill a tank in {T} hours. If A alone fills it in {x} hours, in how many hours will B alone fill it?",
        f"দুটা পাইপ A আৰু B একেলগে {as_num(T)} ঘণ্টাত টেংক ভৰ্তি কৰে। A অকলে {as_num(x)} ঘণ্টাত ভৰ্তি কৰিলে B অকলে কিমান ঘণ্টাত কৰিব?",
        fr(v), [fr(F(T * x, x + T)), fr(x - T), fr(v * 2), fr(v / 2)],
        f"B's rate = 1/{T} - 1/{x} = {fr(F(1,T)-F(1,x))}, so B alone takes {fr(v)} hours.",
        f"B ৰ হাৰ = {fr(F(1,T)-F(1,x))}, সেয়ে {as_num(fr(v))} ঘণ্টা।")

for x, y, z in [(10, 15, 30), (12, 24, 8), (20, 30, 60)]:
    v = 1 / (F(1, x) + F(1, y) + F(1, z))
    add(f"Three pipes A, B and C can fill a tank in {x}, {y} and {z} hours respectively. If all three are opened together, in how many hours will the tank be filled?",
        f"তিনিটা পাইপ A, B আৰু C এ ক্ৰমে {as_num(x)}, {as_num(y)} আৰু {as_num(z)} ঘণ্টাত টেংক ভৰ্তি কৰে। তিনিওটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(v * 2), fr(v / 2), fr(F(x + y + z, 3)), fr(v + 1)],
        f"Combined rate = {fr(F(1,x)+F(1,y)+F(1,z))} per hour, so the time is {fr(v)} hours.",
        f"একেলগে হাৰ = {fr(F(1,x)+F(1,y)+F(1,z))}, সেয়ে সময় {as_num(fr(v))} ঘণ্টা।")

for x, y, k in [(9, 18, 3), (12, 24, 4), (18, 27, 6), (10, 20, 4), (16, 24, 4)]:
    rem = 1 - F(k, x)
    t = rem * y
    add(f"Pipe A fills a tank in {x} hours and pipe B in {y} hours. A is opened first for {k} hours and then closed. How long will B take to fill the remaining part?",
        f"পাইপ A এ টেংক {as_num(x)} ঘণ্টাত আৰু B এ {as_num(y)} ঘণ্টাত ভৰ্তি কৰে। A প্ৰথমে {as_num(k)} ঘণ্টা খোলা থাকি বন্ধ কৰা হয়। বাকী অংশ B এ কিমান সময়ত ভৰ্তি কৰিব?",
        fr(t), [fr(F(y, x) * k), fr(t / 2), fr(t * 2), fr(y - k)],
        f"A fills {k}/{x}, leaving {fr(rem)}; B needs {fr(rem)}×{y} = {fr(t)} hours.",
        f"A এ {as_num(k)}/{as_num(x)} ভৰ্তি কৰে, বাকী {fr(rem)}; B ৰ সময় {as_num(fr(t))} ঘণ্টা।")

for rate, t in [(18, 7), (22, 9), (35, 4), (40, 6), (14, 12)]:
    cap = rate * t
    add(f"A pipe fills a tank at the rate of {rate} litres per hour and takes {t} hours to fill it. Find the capacity of the tank.",
        f"এটা পাইপে ঘণ্টাত {as_num(rate)} লিটাৰ হাৰে টেংক ভৰ্তি কৰে আৰু {as_num(t)} ঘণ্টা লাগে। টেংকৰ ধাৰণক্ষমতা নিৰ্ণয় কৰা।",
        cap, [rate + t, cap // 2, cap * 2, rate],
        f"Capacity = {rate} × {t} = {cap} litres.",
        f"ধাৰণক্ষমতা = {as_num(cap)} লিটাৰ।")

for x, y in [(14, 21), (16, 24), (9, 12)]:
    total = F(0)
    h = 0
    while total < 1:
        h += 1
        total += F(1, x) if h % 2 == 1 else F(1, y)
    add(f"Pipes A and B fill a tank in {x} and {y} hours respectively. They are opened alternately for one hour each, starting with A. In how many hours will the tank be filled?",
        f"পাইপ A আৰু B এ ক্ৰমে {as_num(x)} আৰু {as_num(y)} ঘণ্টাত টেংক ভৰ্তি কৰে। A ৰ পৰা আৰম্ভ কৰি পাল পাতি এঘণ্টাকৈ খোলা হয়। কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        h, [h + 1, h - 1, x + y, 2 * h],
        f"Each two-hour cycle fills {fr(F(1,x)+F(1,y))}; the tank is full in {h} hours.",
        f"প্ৰতি দুঘণ্টাত {fr(F(1,x)+F(1,y))} ভৰ্তি হয়; মুঠ {as_num(h)} ঘণ্টা।")

for x, y, z in [(6, 8, 24), (10, 12, 20), (8, 12, 16)]:
    v = 1 / (F(1, x) + F(1, y) - F(1, z))
    add(f"Two inlet pipes fill a tank in {x} and {y} hours, while an outlet pipe empties it in {z} hours. If all three are opened together, in how many hours will the tank be filled?",
        f"দুটা ইনলেট পাইপে টেংক {as_num(x)} আৰু {as_num(y)} ঘণ্টাত ভৰ্তি কৰে, এটা আউটলেটে {as_num(z)} ঘণ্টাত খালী কৰে। তিনিওটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(v * 2), fr(v / 2), fr(F(x + y + z, 3)), fr(v + 1)],
        f"Net rate = {fr(F(1,x)+F(1,y)-F(1,z))} per hour, giving {fr(v)} hours.",
        f"মুঠ হাৰ = {fr(F(1,x)+F(1,y)-F(1,z))}, সেয়ে {as_num(fr(v))} ঘণ্টা।")

# final batch
for x, y in [(9, 18), (15, 10), (24, 8), (30, 20)]:
    v = fill(x, y)
    add(f"Pipe A can fill a tank in {x} hours and pipe B in {y} hours. If both pipes are opened together, in how many hours will the tank be filled?",
        f"পাইপ A এ এটা টেংক {as_num(x)} ঘণ্টাত আৰু পাইপ B এ {as_num(y)} ঘণ্টাত ভৰ্তি কৰে। দুয়োটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(F(x + y, 2)), fr(F(x * y, abs(x - y))), fr(v * 2), fr(v / 2)],
        f"Combined rate = {fr(F(1,x)+F(1,y))} per hour, so the time is {fr(v)} hours.",
        f"একেলগে হাৰ = {fr(F(1,x)+F(1,y))}, সেয়ে সময় {as_num(fr(v))} ঘণ্টা।")

for x, y in [(6, 12), (10, 20), (12, 24)]:
    v = drain(x, y)
    add(f"Pipe A can fill a tank in {x} hours while pipe B can empty it in {y} hours. If both are opened together, in how many hours will the tank be filled?",
        f"পাইপ A এ টেংক {as_num(x)} ঘণ্টাত ভৰ্তি কৰে আৰু পাইপ B এ {as_num(y)} ঘণ্টাত খালী কৰে। দুয়োটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(F(x * y, x + y)), fr(y - x), fr(v * 2), fr(v / 2)],
        f"Net rate = {fr(F(1,x)-F(1,y))} per hour, so the time is {fr(v)} hours.",
        f"মুঠ হাৰ = {fr(F(1,x)-F(1,y))}, সেয়ে সময় {as_num(fr(v))} ঘণ্টা।")

for x, y in [(9, 15), (10, 20), (7, 14)]:
    v = drain(x, y)
    add(f"A tank is filled by a pipe in {x} hours, but a leak empties it in {y} hours. If the pipe is opened with the leak present, how long will the tank take to fill?",
        f"এটা পাইপে টেংক {as_num(x)} ঘণ্টাত ভৰ্তি কৰে, কিন্তু এটা ছিদ্ৰই {as_num(y)} ঘণ্টাত খালী কৰে। ছিদ্ৰ থকা অৱস্থাত পাইপ খুলিলে কিমান সময় লাগিব?",
        fr(v), [fr(F(x * y, x + y)), fr(y - x), fr(v * 2), fr(v / 2)],
        f"Effective rate = {fr(F(1,x)-F(1,y))} per hour, so the tank fills in {fr(v)} hours.",
        f"কাৰ্যকৰী হাৰ = {fr(F(1,x)-F(1,y))}, সেয়ে {as_num(fr(v))} ঘণ্টা লাগে।")

for x, y, z in [(6, 12, 12), (9, 9, 9)]:
    v = 1 / (F(1, x) + F(1, y) + F(1, z))
    add(f"Three pipes A, B and C can fill a tank in {x}, {y} and {z} hours respectively. If all three are opened together, in how many hours will the tank be filled?",
        f"তিনিটা পাইপ A, B আৰু C এ ক্ৰমে {as_num(x)}, {as_num(y)} আৰু {as_num(z)} ঘণ্টাত টেংক ভৰ্তি কৰে। তিনিওটা একেলগে খুলিলে কিমান ঘণ্টাত ভৰ্তি হ'ব?",
        fr(v), [fr(v * 2), fr(v / 2), fr(F(x + y + z, 3)), fr(v + 1)],
        f"Combined rate = {fr(F(1,x)+F(1,y)+F(1,z))} per hour, so the time is {fr(v)} hours.",
        f"একেলগে হাৰ = {fr(F(1,x)+F(1,y)+F(1,z))}, সেয়ে সময় {as_num(fr(v))} ঘণ্টা।")

for rate, t in [(16, 9), (24, 5)]:
    cap = rate * t
    add(f"A pipe fills a tank at the rate of {rate} litres per hour and takes {t} hours to fill it. Find the capacity of the tank.",
        f"এটা পাইপে ঘণ্টাত {as_num(rate)} লিটাৰ হাৰে টেংক ভৰ্তি কৰে আৰু {as_num(t)} ঘণ্টা লাগে। টেংকৰ ধাৰণক্ষমতা নিৰ্ণয় কৰা।",
        cap, [rate + t, cap // 2, cap * 2, rate],
        f"Capacity = {rate} × {t} = {cap} litres.",
        f"ধাৰণক্ষমতা = {as_num(cap)} লিটাৰ।")

append("pipes-cisterns", rows)
