#!/usr/bin/env python3
"""Boats & Streams: 95+ hard bilingual questions."""

import sys
from fractions import Fraction as F
sys.path.insert(0, "tools")
from num_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def r2(x):
    return round(x, 2)


# 1. downstream / upstream speed
for b, s in [(12, 3), (15, 5), (18, 4), (20, 6), (25, 5), (16, 2)]:
    add(f"The speed of a boat in still water is {b} km/h and the speed of the stream is {s} km/h. Find the downstream speed.",
        f"স্থিৰ পানীত নাওঁৰ বেগ {as_num(b)} km/h আৰু সোঁতৰ বেগ {as_num(s)} km/h। অনুকূল সোঁতৰ বেগ নিৰ্ণয় কৰা।",
        b + s, [b - s, b, s, b + 2 * s],
        f"Downstream speed = boat speed + stream speed = {b} + {s} = {b+s} km/h.",
        f"অনুকূল বেগ = {as_num(b)} + {as_num(s)} = {as_num(b+s)} km/h।")
    add(f"The speed of a boat in still water is {b} km/h and the speed of the stream is {s} km/h. Find the upstream speed.",
        f"স্থিৰ পানীত নাওঁৰ বেগ {as_num(b)} km/h আৰু সোঁতৰ বেগ {as_num(s)} km/h। প্ৰতিকূল সোঁতৰ বেগ নিৰ্ণয় কৰা।",
        b - s, [b + s, b, s, b - 2 * s],
        f"Upstream speed = boat speed - stream speed = {b} - {s} = {b-s} km/h.",
        f"প্ৰতিকূল বেগ = {as_num(b)} - {as_num(s)} = {as_num(b-s)} km/h।")

# 2. boat speed from down/up
for d, u in [(18, 12), (20, 14), (24, 16), (30, 20), (16, 10), (25, 15)]:
    v = (d + u) / 2
    add(f"The downstream speed of a boat is {d} km/h and its upstream speed is {u} km/h. Find the speed of the boat in still water.",
        f"নাওঁৰ অনুকূল বেগ {as_num(d)} km/h আৰু প্ৰতিকূল বেগ {as_num(u)} km/h। স্থিৰ পানীত নাওঁৰ বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2((d - u) / 2), d, u, r2(v * 2)],
        f"Boat speed = (downstream + upstream)/2 = ({d} + {u})/2 = {r2(v)} km/h.",
        f"নাওঁৰ বেগ = ({as_num(d)} + {as_num(u)})/২ = {as_num(r2(v))} km/h।")

# 3. stream speed
for d, u in [(18, 12), (20, 14), (24, 16), (30, 20), (16, 10), (25, 15)]:
    v = (d - u) / 2
    add(f"The downstream speed of a boat is {d} km/h and its upstream speed is {u} km/h. Find the speed of the stream.",
        f"নাওঁৰ অনুকূল বেগ {as_num(d)} km/h আৰু প্ৰতিকূল বেগ {as_num(u)} km/h। সোঁতৰ বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2((d + u) / 2), d, u, r2(v * 2)],
        f"Stream speed = (downstream - upstream)/2 = ({d} - {u})/2 = {r2(v)} km/h.",
        f"সোঁতৰ বেগ = ({as_num(d)} - {as_num(u)})/২ = {as_num(r2(v))} km/h।")

# 4. time downstream
for D, b, s in [(36, 12, 3), (60, 15, 5), (80, 18, 2), (100, 20, 5)]:
    v = D / (b + s)
    add(f"A boat whose speed in still water is {b} km/h goes {D} km downstream in a stream of speed {s} km/h. Find the time taken.",
        f"স্থিৰ পানীত {as_num(b)} km/h বেগৰ নাওঁে {as_num(s)} km/h বেগৰ সোঁতত {as_num(D)} কিমি অনুকূল দিশত যায়। সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(D / (b - s)), r2(D / b), r2(v * 2), r2(v / 2)],
        f"Downstream speed = {b}+{s} = {b+s} km/h; time = {D}/{b+s} = {r2(v)} h.",
        f"অনুকূল বেগ = {as_num(b+s)} km/h; সময় = {as_num(r2(v))} ঘণ্টা।")

# 5. time upstream
for D, b, s in [(30, 12, 3), (50, 15, 5), (60, 18, 2), (80, 20, 5)]:
    v = D / (b - s)
    add(f"A boat whose speed in still water is {b} km/h goes {D} km upstream in a stream of speed {s} km/h. Find the time taken.",
        f"স্থিৰ পানীত {as_num(b)} km/h বেগৰ নাওঁে {as_num(s)} km/h বেগৰ সোঁতত {as_num(D)} কিমি প্ৰতিকূল দিশত যায়। সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(D / (b + s)), r2(D / b), r2(v * 2), r2(v / 2)],
        f"Upstream speed = {b}-{s} = {b-s} km/h; time = {D}/{b-s} = {r2(v)} h.",
        f"প্ৰতিকূল বেগ = {as_num(b-s)} km/h; সময় = {as_num(r2(v))} ঘণ্টা।")

# 6. round trip
for D, b, s in [(24, 10, 2), (36, 12, 3), (48, 15, 5), (60, 20, 4)]:
    v = D / (b + s) + D / (b - s)
    add(f"A boat travels {D} km downstream and returns the same distance upstream. If its speed in still water is {b} km/h and the stream speed is {s} km/h, find the total time.",
        f"এখন নাওঁে {as_num(D)} কিমি অনুকূল আৰু সমান দূৰত্ব প্ৰতিকূল যায়। স্থিৰ পানীত বেগ {as_num(b)} km/h আৰু সোঁতৰ বেগ {as_num(s)} km/h হ'লে মুঠ সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(2 * D / b), r2(v / 2), r2(v * 2), r2(D / (b + s))],
        f"Downstream time = {D}/{b+s} = {r2(D/(b+s))} h; upstream time = {D}/{b-s} = {r2(D/(b-s))} h. Total = {r2(v)} h.",
        f"মুঠ সময় = {as_num(r2(v))} ঘণ্টা।")

# 7. distance from round trip
for T, b, s in [(10, 10, 2), (12, 12, 3), (15, 15, 5), (8, 20, 4)]:
    v = T * (b * b - s * s) / (2 * b)
    add(f"A boat takes {T} hours to go a certain distance downstream and return. If its speed in still water is {b} km/h and the stream speed is {s} km/h, find the one-way distance.",
        f"এখন নাওঁে এটা নিৰ্দিষ্ট দূৰত্ব অনুকূল আৰু প্ৰতিকূল যাবলৈ {as_num(T)} ঘণ্টা লয়। স্থিৰ পানীত বেগ {as_num(b)} km/h আৰু সোঁতৰ বেগ {as_num(s)} km/h হ'লে একমুখী দূৰত্ব নিৰ্ণয় কৰা।",
        r2(v), [r2(T * (b + s) / 2), r2(T * b / 2), r2(v / 2), r2(v * 2)],
        f"T = 2Db/(b²-s²), so D = {T}×({b}²-{s}²)/(2×{b}) = {r2(v)} km.",
        f"D = {as_num(r2(v))} কিমি।")

# 8. boat and stream from times
for D, t1, t2 in [(36, 3, 6), (60, 4, 6), (48, 3, 4), (80, 4, 8)]:
    d, u = D / t1, D / t2
    b = (d + u) / 2
    add(f"A boat covers {D} km downstream in {t1} hours and the same distance upstream in {t2} hours. Find the speed of the boat in still water.",
        f"এখন নাওঁে {as_num(D)} কিমি অনুকূল {as_num(t1)} ঘণ্টাত আৰু সমান দূৰত্ব প্ৰতিকূল {as_num(t2)} ঘণ্টাত যায়। স্থিৰ পানীত নাওঁৰ বেগ নিৰ্ণয় কৰা।",
        r2(b), [r2((d - u) / 2), r2(d), r2(u), r2(b * 2)],
        f"Downstream = {D}/{t1} = {r2(d)} km/h; upstream = {D}/{t2} = {r2(u)} km/h. Boat speed = ({r2(d)}+{r2(u)})/2 = {r2(b)} km/h.",
        f"নাওঁৰ বেগ = {as_num(r2(b))} km/h।")

# 9. ratio of times
for b, s in [(12, 4), (15, 5), (20, 5), (18, 6), (25, 5)]:
    add(f"The speed of a boat in still water is {b} km/h and the stream speed is {s} km/h. Find the ratio of the time taken to go downstream to that taken to go upstream for the same distance.",
        f"স্থিৰ পানীত নাওঁৰ বেগ {as_num(b)} km/h আৰু সোঁতৰ বেগ {as_num(s)} km/h। একে দূৰত্ব অনুকূল আৰু প্ৰতিকূল যাবলৈ সময়ৰ অনুপাত নিৰ্ণয় কৰা।",
        f"{b-s}:{b+s}", [f"{b+s}:{b-s}", f"{b}:{s}", f"{s}:{b}"],
        f"Time is inversely proportional to speed: ratio = 1/(b+s) : 1/(b-s) = {b-s}:{b+s}.",
        f"সময়ৰ অনুপাত = {as_num(b-s)}:{as_num(b+s)}।")

# 10. stream speed from times
for D, t1, t2 in [(36, 3, 6), (60, 4, 6), (48, 3, 4), (80, 4, 8)]:
    d, u = D / t1, D / t2
    s = (d - u) / 2
    add(f"A boat covers {D} km downstream in {t1} hours and the same distance upstream in {t2} hours. Find the speed of the stream.",
        f"এখন নাওঁে {as_num(D)} কিমি অনুকূল {as_num(t1)} ঘণ্টাত আৰু সমান দূৰত্ব প্ৰতিকূল {as_num(t2)} ঘণ্টাত যায়। সোঁতৰ বেগ নিৰ্ণয় কৰা।",
        r2(s), [r2((d + u) / 2), r2(d), r2(u), r2(s * 2)],
        f"Stream speed = ({r2(d)}-{r2(u)})/2 = {r2(s)} km/h.",
        f"সোঁতৰ বেগ = {as_num(r2(s))} km/h।")

# extra batch
for b, s in [(14, 4), (16, 6), (22, 2), (28, 7), (30, 5)]:
    add(f"The speed of a boat in still water is {b} km/h and the speed of the stream is {s} km/h. Find the downstream speed.",
        f"স্থিৰ পানীত নাওঁৰ বেগ {as_num(b)} km/h আৰু সোঁতৰ বেগ {as_num(s)} km/h। অনুকূল বেগ নিৰ্ণয় কৰা।",
        b + s, [b - s, b, s, b + 2 * s],
        f"Downstream = {b} + {s} = {b+s} km/h.",
        f"অনুকূল বেগ = {as_num(b+s)} km/h।")
    add(f"The speed of a boat in still water is {b} km/h and the speed of the stream is {s} km/h. Find the upstream speed.",
        f"স্থিৰ পানীত নাওঁৰ বেগ {as_num(b)} km/h আৰু সোঁতৰ বেগ {as_num(s)} km/h। প্ৰতিকূল বেগ নিৰ্ণয় কৰা।",
        b - s, [b + s, b, s, b - 2 * s],
        f"Upstream = {b} - {s} = {b-s} km/h.",
        f"প্ৰতিকূল বেগ = {as_num(b-s)} km/h।")

for d, u in [(22, 14), (26, 18), (32, 22), (28, 12), (35, 25)]:
    v = (d + u) / 2
    add(f"The downstream speed of a boat is {d} km/h and its upstream speed is {u} km/h. Find the speed of the boat in still water.",
        f"নাওঁৰ অনুকূল বেগ {as_num(d)} km/h আৰু প্ৰতিকূল বেগ {as_num(u)} km/h। স্থিৰ পানীত নাওঁৰ বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2((d - u) / 2), d, u, r2(v * 2)],
        f"Boat speed = ({d}+{u})/2 = {r2(v)} km/h.",
        f"নাওঁৰ বেগ = {as_num(r2(v))} km/h।")

for d, u in [(22, 14), (26, 18), (32, 22), (28, 12), (35, 25)]:
    v = (d - u) / 2
    add(f"The downstream speed of a boat is {d} km/h and its upstream speed is {u} km/h. Find the speed of the stream.",
        f"নাওঁৰ অনুকূল বেগ {as_num(d)} km/h আৰু প্ৰতিকূল বেগ {as_num(u)} km/h। সোঁতৰ বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2((d + u) / 2), d, u, r2(v * 2)],
        f"Stream speed = ({d}-{u})/2 = {r2(v)} km/h.",
        f"সোঁতৰ বেগ = {as_num(r2(v))} km/h।")

for D, b, s in [(42, 14, 4), (72, 16, 4), (90, 22, 2), (96, 28, 4)]:
    v = D / (b + s)
    add(f"A boat whose speed in still water is {b} km/h goes {D} km downstream in a stream of speed {s} km/h. Find the time taken.",
        f"স্থিৰ পানীত {as_num(b)} km/h বেগৰ নাওঁে {as_num(s)} km/h বেগৰ সোঁতত {as_num(D)} কিমি অনুকূল যায়। সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(D / (b - s)), r2(D / b), r2(v * 2), r2(v / 2)],
        f"Time = {D}/{b+s} = {r2(v)} h.",
        f"সময় = {as_num(r2(v))} ঘণ্টা।")

for D, b, s in [(36, 14, 4), (60, 16, 4), (80, 22, 2), (90, 28, 4)]:
    v = D / (b - s)
    add(f"A boat whose speed in still water is {b} km/h goes {D} km upstream in a stream of speed {s} km/h. Find the time taken.",
        f"স্থিৰ পানীত {as_num(b)} km/h বেগৰ নাওঁে {as_num(s)} km/h বেগৰ সোঁতত {as_num(D)} কিমি প্ৰতিকূল যায়। সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(D / (b + s)), r2(D / b), r2(v * 2), r2(v / 2)],
        f"Time = {D}/{b-s} = {r2(v)} h.",
        f"সময় = {as_num(r2(v))} ঘণ্টা।")

for D, b, s in [(30, 12, 2), (45, 15, 3), (56, 18, 4), (70, 20, 5)]:
    v = D / (b + s) + D / (b - s)
    add(f"A boat travels {D} km downstream and returns the same distance upstream. If its speed in still water is {b} km/h and the stream speed is {s} km/h, find the total time.",
        f"এখন নাওঁে {as_num(D)} কিমি অনুকূল আৰু সমান দূৰত্ব প্ৰতিকূল যায়। স্থিৰ পানীত বেগ {as_num(b)} km/h আৰু সোঁতৰ বেগ {as_num(s)} km/h হ'লে মুঠ সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(2 * D / b), r2(v / 2), r2(v * 2), r2(D / (b + s))],
        f"Total = {D}/{b+s} + {D}/{b-s} = {r2(v)} h.",
        f"মুঠ সময় = {as_num(r2(v))} ঘণ্টা।")

for T, b, s in [(9, 10, 2), (14, 12, 3), (12, 15, 5), (10, 20, 4)]:
    v = T * (b * b - s * s) / (2 * b)
    add(f"A boat takes {T} hours to go a certain distance downstream and return. If its speed in still water is {b} km/h and the stream speed is {s} km/h, find the one-way distance.",
        f"এখন নাওঁে এটা নিৰ্দিষ্ট দূৰত্ব অনুকূল আৰু প্ৰতিকূল যাবলৈ {as_num(T)} ঘণ্টা লয়। স্থিৰ পানীত বেগ {as_num(b)} km/h আৰু সোঁতৰ বেগ {as_num(s)} km/h হ'লে একমুখী দূৰত্ব নিৰ্ণয় কৰা।",
        r2(v), [r2(T * (b + s) / 2), r2(T * b / 2), r2(v / 2), r2(v * 2)],
        f"D = {T}×({b}²-{s}²)/(2×{b}) = {r2(v)} km.",
        f"D = {as_num(r2(v))} কিমি।")

for D, t1, t2 in [(40, 4, 8), (72, 4, 6), (56, 4, 7)]:
    d, u = D / t1, D / t2
    b = (d + u) / 2
    s = (d - u) / 2
    add(f"A boat covers {D} km downstream in {t1} hours and the same distance upstream in {t2} hours. Find the speed of the boat in still water.",
        f"এখন নাওঁে {as_num(D)} কিমি অনুকূল {as_num(t1)} ঘণ্টাত আৰু সমান দূৰত্ব প্ৰতিকূল {as_num(t2)} ঘণ্টাত যায়। স্থিৰ পানীত নাওঁৰ বেগ নিৰ্ণয় কৰা।",
        r2(b), [r2(s), r2(d), r2(u), r2(b * 2)],
        f"Boat speed = ({r2(d)}+{r2(u)})/2 = {r2(b)} km/h.",
        f"নাওঁৰ বেগ = {as_num(r2(b))} km/h।")
    add(f"A boat covers {D} km downstream in {t1} hours and the same distance upstream in {t2} hours. Find the speed of the stream.",
        f"এখন নাওঁে {as_num(D)} কিমি অনুকূল {as_num(t1)} ঘণ্টাত আৰু সমান দূৰত্ব প্ৰতিকূল {as_num(t2)} ঘণ্টাত যায়। সোঁতৰ বেগ নিৰ্ণয় কৰা।",
        r2(s), [r2(b), r2(d), r2(u), r2(s * 2)],
        f"Stream speed = ({r2(d)}-{r2(u)})/2 = {r2(s)} km/h.",
        f"সোঁতৰ বেগ = {as_num(r2(s))} km/h।")

for b, s in [(14, 6), (18, 9), (24, 8), (30, 10)]:
    add(f"The speed of a boat in still water is {b} km/h and the stream speed is {s} km/h. Find the ratio of the time taken to go downstream to that taken to go upstream for the same distance.",
        f"স্থিৰ পানীত নাওঁৰ বেগ {as_num(b)} km/h আৰু সোঁতৰ বেগ {as_num(s)} km/h। একে দূৰত্ব অনুকূল আৰু প্ৰতিকূল যাবলৈ সময়ৰ অনুপাত নিৰ্ণয় কৰা।",
        f"{b-s}:{b+s}", [f"{b+s}:{b-s}", f"{b}:{s}", f"{s}:{b}"],
        f"Time ratio = {b-s}:{b+s}.",
        f"সময়ৰ অনুপাত = {as_num(b-s)}:{as_num(b+s)}।")

append("boats-streams", rows)
