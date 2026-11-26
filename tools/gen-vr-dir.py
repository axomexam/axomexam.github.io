#!/usr/bin/env python3
"""Direction & Distance: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append, as_num, opts

rows = []
DIRS = {"N": ("north", "উত্তৰ"), "S": ("south", "দক্ষিণ"),
        "E": ("east", "পূব"), "W": ("west", "পশ্চিম")}
DIR_WORD = {"N": "North", "S": "South", "E": "East", "W": "West",
            "NE": "North-East", "NW": "North-West", "SE": "South-East", "SW": "South-West"}


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def move_text(moves):
    en = []
    as_ = []
    for d, dist in moves:
        w_en, w_as = DIRS[d]
        en.append(f"{dist} km {w_en}")
        as_.append(f"{as_num(dist)} কিঃমিঃ {w_as}লৈ")
    return ", then ".join(en), ", তাৰ পিছত ".join(as_)


def net(moves):
    dx = dy = 0
    for d, dist in moves:
        if d == "N":
            dy += dist
        elif d == "S":
            dy -= dist
        elif d == "E":
            dx += dist
        elif d == "W":
            dx -= dist
    return dx, dy


def dir_name(dx, dy):
    if dx > 0 and dy > 0:
        return "NE"
    if dx < 0 and dy > 0:
        return "NW"
    if dx > 0 and dy < 0:
        return "SE"
    if dx < 0 and dy < 0:
        return "SW"
    if dx > 0:
        return "E"
    if dx < 0:
        return "W"
    if dy > 0:
        return "N"
    return "S"


TRIPLES = [(3, 4, 5), (6, 8, 10), (5, 12, 13), (9, 12, 15), (8, 15, 17), (7, 24, 25), (20, 21, 29)]

# 2-move right triangle, four quadrants
for i, (a, b, c) in enumerate(TRIPLES):
    for sx, sy, quad in [(1, 1, "NE"), (1, -1, "SE"), (-1, 1, "NW"), (-1, -1, "SW")]:
        mv = [("N" if sy > 0 else "S", a), ("E" if sx > 0 else "W", b)]
        en_t, as_t = move_text(mv)
        add(f"A man walks {en_t}. How far is he from the starting point?",
            f"এজন মানুহে {as_t} খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কিমান দূৰত?",
            f"{c} km", [f"{c+a} km", f"{c+b} km", f"{a+b} km"],
            f"The two displacements are perpendicular, so distance = √({a}² + {b}²) = {c} km.",
            f"দুটা স্থানান্তৰ লম্ব, সেয়ে দূৰত্ব = √({as_num(a)}² + {as_num(b)}²) = {as_num(c)} কিঃমিঃ।")

# 3-move: N a, E b, S c
for a, b, c in [(7, 5, 4), (10, 8, 6), (14, 13, 9), (12, 15, 4), (18, 17, 6), (9, 12, 4)]:
    dy, dx = a - c, b
    d = (dx * dx + dy * dy) ** 0.5
    if d != int(d):
        continue
    mv = [("N", a), ("E", b), ("S", c)]
    en_t, as_t = move_text(mv)
    add(f"A man walks {en_t}. How far is he from the starting point?",
        f"এজন মানুহে {as_t} খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কিমান দূৰত?",
        f"{int(d)} km", [f"{int(d)+a} km", f"{int(d)+b} km", f"{int(d)+a+b} km"],
        f"Net displacement is {dy} km north and {dx} km east, so distance = √({dy}² + {dx}²) = {int(d)} km.",
        f"মুঠ স্থানান্তৰ {as_num(dy)} কিঃমিঃ উত্তৰ আৰু {as_num(dx)} কিঃমিঃ পূব, সেয়ে দূৰত্ব = {as_num(int(d))} কিঃমিঃ।")

# 3-move: E a, N b, W c
for a, b, c in [(9, 8, 6), (12, 15, 7), (16, 13, 11), (20, 21, 12), (15, 10, 9)]:
    dx, dy = a - c, b
    d = (dx * dx + dy * dy) ** 0.5
    if d != int(d):
        continue
    mv = [("E", a), ("N", b), ("W", c)]
    en_t, as_t = move_text(mv)
    add(f"A man walks {en_t}. How far is he from the starting point?",
        f"এজন মানুহে {as_t} খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কিমান দূৰত?",
        f"{int(d)} km", [f"{int(d)+a+b} km", f"{int(d)+3} km", f"{int(d)-3} km"],
        f"Net displacement is {dx} km east and {dy} km north, so distance = √({dx}² + {dy}²) = {int(d)} km.",
        f"মুঠ স্থানান্তৰ {as_num(dx)} কিঃমিঃ পূব আৰু {as_num(dy)} কিঃমিঃ উত্তৰ, সেয়ে দূৰত্ব = {as_num(int(d))} কিঃমিঃ।")

# 3-move N/E/S with net (b, a)
for a, b, c in TRIPLES:
    for k in (2, 5):
        mv = [("N", a + k), ("E", b), ("S", k)]
        en_t, as_t = move_text(mv)
        add(f"A man walks {en_t}. How far is he from the starting point?",
            f"এজন মানুহে {as_t} খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কিমান দূৰত?",
            f"{c} km", [f"{c+a} km", f"{c+b} km", f"{int(d)+a+b+k} km"],
            f"The southward {k} km cancels part of the northward walk, leaving {a} km north and {b} km east: √({a}²+{b}²) = {c} km.",
            f"দক্ষিণৰ {as_num(k)} কিঃমিঃে উত্তৰৰ অংশ বাতিল কৰে; অৱশিষ্ট {as_num(a)} কিঃমিঃ উত্তৰ আৰু {as_num(b)} কিঃমিঃ পূব: {as_num(c)} কিঃমিঃ।")

# 3-move E/N/W with net (b, a)
for a, b, c in TRIPLES:
    for k in (3, 6):
        mv = [("E", b + k), ("N", a), ("W", k)]
        en_t, as_t = move_text(mv)
        add(f"A man walks {en_t}. How far is he from the starting point?",
            f"এজন মানুহে {as_t} খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কিমান দূৰত?",
            f"{c} km", [f"{c+a} km", f"{c+b} km", f"{int(d)+a+b+k} km"],
            f"Net displacement is {b} km east and {a} km north: √({b}²+{a}²) = {c} km.",
            f"মুঠ স্থানান্তৰ {as_num(b)} কিঃমিঃ পূব আৰু {as_num(a)} কিঃমিঃ উত্তৰ: {as_num(c)} কিঃমিঃ।")

# 4-move
for a, b, c in TRIPLES:
    for k, j in ((2, 3), (4, 5)):
        mv = [("N", a + k), ("E", b + j), ("S", k), ("W", j)]
        en_t, as_t = move_text(mv)
        add(f"A man walks {en_t}. How far is he from the starting point?",
            f"এজন মানুহে {as_t} খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কিমান দূৰত?",
            f"{c} km", [f"{c+a} km", f"{c+b} km", f"{int(d)+a+b+k+j} km"],
            f"After cancelling, the net displacement is {b} km east and {a} km north: √({b}²+{a}²) = {c} km.",
            f"বাতিলৰ পিছত মুঠ স্থানান্তৰ {as_num(b)} কিঃমিঃ পূব আৰু {as_num(a)} কিঃমিঃ উত্তৰ: {as_num(c)} কিঃমিঃ।")

# axis moves
for d, dist in [("N", 12), ("S", 9), ("E", 15), ("W", 11), ("N", 20), ("S", 17)]:
    w_en, w_as = DIRS[d]
    add(f"A man walks {dist} km {w_en}. How far is he from the starting point?",
        f"এজন মানুহে {as_num(dist)} কিঃমিঃ {w_as}লৈ খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কিমান দূৰত?",
        f"{dist} km", [f"{dist+2} km", f"{dist-2} km", f"{dist*2} km"],
        f"He moves along a straight line, so the distance is {dist} km.",
        f"তেওঁ সৰলৰেখাত গতি কৰে, সেয়ে দূৰত্ব {as_num(dist)} কিঃমিঃ।")

# direction of displacement
for a, b, c in [(3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17)]:
    mv = [("N", a), ("E", b)]
    en_t, as_t = move_text(mv)
    add(f"A man walks {en_t}. In which direction is he from the starting point?",
        f"এজন মানুহে {as_t} খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কোন দিশত?",
        "North-East", ["North-West", "South-East", "South-West"],
        f"He moves north and east, so he is to the North-East of the start.",
        f"তেওঁ উত্তৰ আৰু পূবলৈ গৈছে, সেয়ে আৰম্ভণিৰ পৰা উত্তৰ-পূব দিশত।")

for a, b, c in [(4, 3, 5), (8, 6, 10)]:
    mv = [("S", a), ("W", b)]
    en_t, as_t = move_text(mv)
    add(f"A man walks {en_t}. In which direction is he from the starting point?",
        f"এজন মানুহে {as_t} খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কোন দিশত?",
        "South-West", ["North-East", "North-West", "South-East"],
        f"He moves south and west, so he is to the South-West of the start.",
        f"তেওঁ দক্ষিণ আৰু পশ্চিমলৈ গৈছে, সেয়ে আৰম্ভণিৰ পৰা দক্ষিণ-পশ্চিম দিশত।")

for a, b, c in [(5, 12, 13), (9, 12, 15)]:
    mv = [("N", a), ("W", b)]
    en_t, as_t = move_text(mv)
    add(f"A man walks {en_t}. In which direction is he from the starting point?",
        f"এজন মানুহে {as_t} খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কোন দিশত?",
        "North-West", ["North-East", "South-West", "South-East"],
        f"He moves north and west, so he is to the North-West of the start.",
        f"তেওঁ উত্তৰ আৰু পশ্চিমলৈ গৈছে, সেয়ে আৰম্ভণিৰ পৰা উত্তৰ-পশ্চিম দিশত।")

append("direction-distance", rows)
