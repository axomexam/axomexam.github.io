#!/usr/bin/env python3
"""Profit, Loss & Discount: 95+ hard bilingual questions."""

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


# 1. profit percent
for cp, sp in [(400, 500), (750, 900), (1250, 1500), (2400, 3000), (1800, 2250),
               (3200, 4000), (960, 1200), (1440, 1800)]:
    v = (sp - cp) / cp * 100
    add(f"An article is bought for {cp} and sold for {sp}. Find the profit percent.",
        f"এটা বস্তু {as_num(cp)} টকাত কিনি {as_num(sp)} টকাত বিক্ৰী কৰা হয়। লাভৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(sp - cp), r2(100 - v)],
        f"Profit = {sp-cp}; profit% = {sp-cp}/{cp} × 100 = {r2(v)}%.",
        f"লাভ = {as_num(sp-cp)}; লাভ% = {as_num(r2(v))}%।")

# 2. find SP from CP and profit%
for cp, p in [(800, 25), (1200, 15), (2500, 12), (3600, 20), (4500, 8), (6400, 35)]:
    sp = cp * (100 + p) / 100
    add(f"Find the selling price of an article whose cost price is {cp} and profit is {p}%.",
        f"এটা বস্তুৰ ক্ৰয়মূল্য {as_num(cp)} আৰু লাভ {as_num(p)}% হ'লে বিক্ৰয়মূল্য নিৰ্ণয় কৰা।",
        r2(sp), [r2(cp * p / 100), r2(cp - cp * p / 100), r2(sp + cp * p / 100), r2(sp / 2)],
        f"SP = CP × (100 + {p})/100 = {r2(sp)}.",
        f"বিক্ৰয়মূল্য = {as_num(r2(sp))}।")

# 3. find CP from SP and profit%
for sp, p in [(660, 10), (840, 20), (1120, 12), (1440, 20), (1800, 25), (2300, 15)]:
    cp = sp * 100 / (100 + p)
    add(f"An article is sold for {sp} at a profit of {p}%. Find its cost price.",
        f"এটা বস্তু {as_num(p)}% লাভত {as_num(sp)} টকাত বিক্ৰী কৰা হয়। ক্ৰয়মূল্য নিৰ্ণয় কৰা।",
        r2(cp), [r2(sp * (100 + p) / 100), r2(sp - sp * p / 100), r2(sp / 2), r2(cp + sp * p / 100)],
        f"CP = {sp} × 100/(100 + {p}) = {r2(cp)}.",
        f"ক্ৰয়মূল্য = {as_num(r2(cp))}।")

# 4. loss percent
for cp, sp in [(500, 400), (900, 750), (1600, 1200), (2500, 2000), (3600, 2700), (4800, 3840)]:
    v = (cp - sp) / cp * 100
    add(f"An article is bought for {cp} and sold for {sp}. Find the loss percent.",
        f"এটা বস্তু {as_num(cp)} টকাত কিনি {as_num(sp)} টকাত বিক্ৰী কৰা হয়। লোকচানৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(cp - sp), r2(100 - v)],
        f"Loss = {cp-sp}; loss% = {cp-sp}/{cp} × 100 = {r2(v)}%.",
        f"লোকচান = {as_num(cp-sp)}; লোকচান% = {as_num(r2(v))}%।")

# 5. find SP from CP and loss%
for cp, l in [(900, 10), (1500, 20), (2400, 15), (3600, 25), (4800, 12), (7200, 30)]:
    sp = cp * (100 - l) / 100
    add(f"Find the selling price of an article whose cost price is {cp} and loss is {l}%.",
        f"এটা বস্তুৰ ক্ৰয়মূল্য {as_num(cp)} আৰু লোকচান {as_num(l)}% হ'লে বিক্ৰয়মূল্য নিৰ্ণয় কৰা।",
        r2(sp), [r2(cp * l / 100), r2(cp + cp * l / 100), r2(sp + cp * l / 100), r2(sp / 2)],
        f"SP = CP × (100 - {l})/100 = {r2(sp)}.",
        f"বিক্ৰয়মূল্য = {as_num(r2(sp))}।")

# 6. discount percent
for mp, sp in [(500, 400), (800, 700), (1200, 900), (1500, 1200), (2400, 1800), (3600, 3060)]:
    v = (mp - sp) / mp * 100
    add(f"The marked price of an article is {mp} and it is sold for {sp}. Find the discount percent.",
        f"এটা বস্তুৰ চিহ্নিত মূল্য {as_num(mp)} আৰু বিক্ৰয়মূল্য {as_num(sp)}। ৰেহাইৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(mp - sp), r2(100 - v)],
        f"Discount = {mp-sp}; discount% = {mp-sp}/{mp} × 100 = {r2(v)}%.",
        f"ৰেহাই% = {as_num(r2(v))}%।")

# 7. find SP from MP and discount%
for mp, d in [(600, 10), (900, 20), (1200, 25), (1800, 15), (2500, 12), (3200, 30)]:
    sp = mp * (100 - d) / 100
    add(f"Find the selling price of an article marked at {mp} after a discount of {d}%.",
        f"{as_num(mp)} টকাত চিহ্নিত বস্তু {as_num(d)}% ৰেহাইৰ পিছত কিমান টকাত বিক্ৰী হ'ব?",
        r2(sp), [r2(mp * d / 100), r2(mp + mp * d / 100), r2(sp + mp * d / 100), r2(sp / 2)],
        f"SP = MP × (100 - {d})/100 = {r2(sp)}.",
        f"বিক্ৰয়মূল্য = {as_num(r2(sp))}।")

# 8. find MP from SP and discount%
for sp, d in [(720, 10), (960, 20), (1050, 25), (1360, 15), (1760, 12), (2100, 30)]:
    mp = sp * 100 / (100 - d)
    add(f"An article is sold for {sp} after a discount of {d}%. Find its marked price.",
        f"এটা বস্তু {as_num(d)}% ৰেহাইৰ পিছত {as_num(sp)} টকাত বিক্ৰী হয়। চিহ্নিত মূল্য নিৰ্ণয় কৰা।",
        r2(mp), [r2(sp * (100 - d) / 100), r2(sp + sp * d / 100), r2(sp / 2), r2(mp - sp * d / 100)],
        f"MP = {sp} × 100/(100 - {d}) = {r2(mp)}.",
        f"চিহ্নিত মূল্য = {as_num(r2(mp))}।")

# 9. successive discounts
for d1, d2 in [(20, 10), (25, 20), (30, 10), (40, 25), (15, 20), (50, 20), (12, 25), (10, 10)]:
    v = 100 - (100 - d1) * (100 - d2) / 100
    add(f"Two successive discounts of {d1}% and {d2}% are given on an article. Find the net discount percent.",
        f"এটা বস্তুত {as_num(d1)}% আৰু {as_num(d2)}% দুটা ক্ৰমিক ৰেহাই দিয়া হয়। মুঠ ৰেহাইৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(d1 + d2), r2(abs(d1 - d2)), r2(v / 2), r2(v * 2)],
        f"Net discount = 100 - (100-{d1})(100-{d2})/100 = {r2(v)}%.",
        f"মুঠ ৰেহাই = {as_num(r2(v))}%।")

# 10. profit after discount
for mp, d, p in [(1000, 20, 25), (1500, 10, 20), (2400, 25, 20), (3000, 15, 30), (800, 20, 15)]:
    cp = mp * (100 - d) / 100 * 100 / (100 + p)
    add(f"An article marked at {mp} is sold after a discount of {d}%, giving a profit of {p}%. Find the cost price.",
        f"{as_num(mp)} টকাত চিহ্নিত বস্তু {as_num(d)}% ৰেহাইৰ পিছত {as_num(p)}% লাভত বিক্ৰী হয়। ক্ৰয়মূল্য নিৰ্ণয় কৰা।",
        r2(cp), [r2(mp * (100 - d) / 100), r2(cp * (100 + p) / 100), r2(mp - cp), r2(cp / 2)],
        f"SP = {mp}×{100-d}/100 = {r2(mp*(100-d)/100)}; CP = SP×100/(100+{p}) = {r2(cp)}.",
        f"ক্ৰয়মূল্য = {as_num(r2(cp))}।")

# 11. two articles same SP
for x in [10, 20, 25, 30, 15, 40, 12, 50]:
    v = x * x / 100
    add(f"Two articles are sold at the same selling price, one at a profit of {x}% and the other at a loss of {x}%. Find the overall loss percent.",
        f"দুটা বস্তু একে বিক্ৰয়মূল্যত বিক্ৰী হয়, এটা {as_num(x)}% লাভত আৰু আনটো {as_num(x)}% লোকচানত। মুঠ লোকচানৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(x), r2(2 * x), r2(v / 2), 0],
        f"Overall loss% = x²/100 = {x}²/100 = {r2(v)}%.",
        f"মুঠ লোকচান% = {as_num(r2(v))}%।")

# 12. false weight
for w in [900, 800, 750, 950, 850, 960]:
    v = (1000 - w) / w * 100
    add(f"A dishonest dealer sells goods at cost price but uses a weight of {w} g instead of 1 kg. Find his profit percent.",
        f"এজন অসাধু ব্যৱসায়ীয়ে ক্ৰয়মূল্যত বস্তু বিক্ৰী কৰে কিন্তু ১ কিলোগ্ৰামৰ সলনি {as_num(w)} গ্ৰাম ওজন ব্যৱহাৰ কৰে। তেওঁৰ লাভৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2((1000 - w) / 10), r2(v / 2), r2(1000 / w * 100 - 100), r2(100 - w / 10)],
        f"Profit% = (1000 - {w})/{w} × 100 = {r2(v)}%.",
        f"লাভ% = {as_num(r2(v))}%।")

# 13. markup then discount
for m, d in [(40, 25), (50, 20), (60, 25), (25, 10), (30, 20), (80, 40)]:
    v = (1 + m / 100) * (1 - d / 100) * 100 - 100
    add(f"A shopkeeper marks his goods {m}% above cost price and gives a discount of {d}%. Find his net profit percent.",
        f"এজন দোকানীয়ে বস্তুৰ মূল্য ক্ৰয়মূল্যতকৈ {as_num(m)}% বেছি ৰাখি {as_num(d)}% ৰেহাই দিয়ে। তেওঁৰ মুঠ লাভৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(m - d), r2(m + d), r2(v / 2), r2(-v)],
        f"Net profit% = (1+{m}/100)(1-{d}/100)×100 - 100 = {r2(v)}%.",
        f"মুঠ লাভ% = {as_num(r2(v))}%।")

# extra batch
for cp, sp in [(600, 750), (1000, 1250), (2000, 2500)]:
    v = (sp - cp) / cp * 100
    add(f"An article is bought for {cp} and sold for {sp}. Find the profit percent.",
        f"এটা বস্তু {as_num(cp)} টকাত কিনি {as_num(sp)} টকাত বিক্ৰী কৰা হয়। লাভৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(sp - cp), r2(100 - v)],
        f"Profit% = {r2(v)}%.",
        f"লাভ% = {as_num(r2(v))}%।")

for cp, p in [(900, 10), (1600, 25), (2800, 15)]:
    sp = cp * (100 + p) / 100
    add(f"Find the selling price of an article whose cost price is {cp} and profit is {p}%.",
        f"এটা বস্তুৰ ক্ৰয়মূল্য {as_num(cp)} আৰু লাভ {as_num(p)}% হ'লে বিক্ৰয়মূল্য নিৰ্ণয় কৰা।",
        r2(sp), [r2(cp * p / 100), r2(cp - cp * p / 100), r2(sp + cp * p / 100), r2(sp / 2)],
        f"SP = {r2(sp)}.",
        f"বিক্ৰয়মূল্য = {as_num(r2(sp))}।")

for sp, p in [(550, 10), (720, 20), (1265, 15)]:
    cp = sp * 100 / (100 + p)
    add(f"An article is sold for {sp} at a profit of {p}%. Find its cost price.",
        f"এটা বস্তু {as_num(p)}% লাভত {as_num(sp)} টকাত বিক্ৰী কৰা হয়। ক্ৰয়মূল্য নিৰ্ণয় কৰা।",
        r2(cp), [r2(sp * (100 + p) / 100), r2(sp - sp * p / 100), r2(sp / 2), r2(cp + sp * p / 100)],
        f"CP = {r2(cp)}.",
        f"ক্ৰয়মূল্য = {as_num(r2(cp))}।")

for cp, sp in [(600, 480), (1000, 800), (2000, 1600)]:
    v = (cp - sp) / cp * 100
    add(f"An article is bought for {cp} and sold for {sp}. Find the loss percent.",
        f"এটা বস্তু {as_num(cp)} টকাত কিনি {as_num(sp)} টকাত বিক্ৰী কৰা হয়। লোকচানৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(cp - sp), r2(100 - v)],
        f"Loss% = {r2(v)}%.",
        f"লোকচান% = {as_num(r2(v))}%।")

for cp, l in [(1100, 20), (2500, 16)]:
    sp = cp * (100 - l) / 100
    add(f"Find the selling price of an article whose cost price is {cp} and loss is {l}%.",
        f"এটা বস্তুৰ ক্ৰয়মূল্য {as_num(cp)} আৰু লোকচান {as_num(l)}% হ'লে বিক্ৰয়মূল্য নিৰ্ণয় কৰা।",
        r2(sp), [r2(cp * l / 100), r2(cp + cp * l / 100), r2(sp + cp * l / 100), r2(sp / 2)],
        f"SP = {r2(sp)}.",
        f"বিক্ৰয়মূল্য = {as_num(r2(sp))}।")

for mp, sp in [(600, 480), (900, 720)]:
    v = (mp - sp) / mp * 100
    add(f"The marked price of an article is {mp} and it is sold for {sp}. Find the discount percent.",
        f"এটা বস্তুৰ চিহ্নিত মূল্য {as_num(mp)} আৰু বিক্ৰয়মূল্য {as_num(sp)}। ৰেহাইৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(mp - sp), r2(100 - v)],
        f"Discount% = {r2(v)}%.",
        f"ৰেহাই% = {as_num(r2(v))}%।")

for mp, d in [(700, 15), (1500, 20)]:
    sp = mp * (100 - d) / 100
    add(f"Find the selling price of an article marked at {mp} after a discount of {d}%.",
        f"{as_num(mp)} টকাত চিহ্নিত বস্তু {as_num(d)}% ৰেহাইৰ পিছত কিমান টকাত বিক্ৰী হ'ব?",
        r2(sp), [r2(mp * d / 100), r2(mp + mp * d / 100), r2(sp + mp * d / 100), r2(sp / 2)],
        f"SP = {r2(sp)}.",
        f"বিক্ৰয়মূল্য = {as_num(r2(sp))}।")

for sp, d in [(680, 15), (1140, 5)]:
    mp = sp * 100 / (100 - d)
    add(f"An article is sold for {sp} after a discount of {d}%. Find its marked price.",
        f"এটা বস্তু {as_num(d)}% ৰেহাইৰ পিছত {as_num(sp)} টকাত বিক্ৰী হয়। চিহ্নিত মূল্য নিৰ্ণয় কৰা।",
        r2(mp), [r2(sp * (100 - d) / 100), r2(sp + sp * d / 100), r2(sp / 2), r2(mp - sp * d / 100)],
        f"MP = {r2(mp)}.",
        f"চিহ্নিত মূল্য = {as_num(r2(mp))}।")

for d1, d2 in [(20, 25), (30, 20)]:
    v = 100 - (100 - d1) * (100 - d2) / 100
    add(f"Two successive discounts of {d1}% and {d2}% are given on an article. Find the net discount percent.",
        f"এটা বস্তুত {as_num(d1)}% আৰু {as_num(d2)}% দুটা ক্ৰমিক ৰেহাই দিয়া হয়। মুঠ ৰেহাইৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(d1 + d2), r2(abs(d1 - d2)), r2(v / 2), r2(v * 2)],
        f"Net discount = {r2(v)}%.",
        f"মুঠ ৰেহাই = {as_num(r2(v))}%।")

for mp, d, p in [(1200, 25, 20), (2000, 20, 25)]:
    cp = mp * (100 - d) / 100 * 100 / (100 + p)
    add(f"An article marked at {mp} is sold after a discount of {d}%, giving a profit of {p}%. Find the cost price.",
        f"{as_num(mp)} টকাত চিহ্নিত বস্তু {as_num(d)}% ৰেহাইৰ পিছত {as_num(p)}% লাভত বিক্ৰী হয়। ক্ৰয়মূল্য নিৰ্ণয় কৰা।",
        r2(cp), [r2(mp * (100 - d) / 100), r2(cp * (100 + p) / 100), r2(mp - cp), r2(cp / 2)],
        f"CP = {r2(cp)}.",
        f"ক্ৰয়মূল্য = {as_num(r2(cp))}।")

for x in [8, 5]:
    v = x * x / 100
    add(f"Two articles are sold at the same selling price, one at a profit of {x}% and the other at a loss of {x}%. Find the overall loss percent.",
        f"দুটা বস্তু একে বিক্ৰয়মূল্যত বিক্ৰী হয়, এটা {as_num(x)}% লাভত আৰু আনটো {as_num(x)}% লোকচানত। মুঠ লোকচানৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(x), r2(2 * x), r2(v / 2), 0],
        f"Overall loss% = {r2(v)}%.",
        f"মুঠ লোকচান% = {as_num(r2(v))}%।")

for w in [920, 875]:
    v = (1000 - w) / w * 100
    add(f"A dishonest dealer sells goods at cost price but uses a weight of {w} g instead of 1 kg. Find his profit percent.",
        f"এজন অসাধু ব্যৱসায়ীয়ে ক্ৰয়মূল্যত বস্তু বিক্ৰী কৰে কিন্তু ১ কিলোগ্ৰামৰ সলনি {as_num(w)} গ্ৰাম ওজন ব্যৱহাৰ কৰে। তেওঁৰ লাভৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2((1000 - w) / 10), r2(v / 2), r2(1000 / w * 100 - 100), r2(100 - w / 10)],
        f"Profit% = {r2(v)}%.",
        f"লাভ% = {as_num(r2(v))}%।")

for m, d in [(45, 20), (35, 25)]:
    v = (1 + m / 100) * (1 - d / 100) * 100 - 100
    add(f"A shopkeeper marks his goods {m}% above cost price and gives a discount of {d}%. Find his net profit percent.",
        f"এজন দোকানীয়ে বস্তুৰ মূল্য ক্ৰয়মূল্যতকৈ {as_num(m)}% বেছি ৰাখি {as_num(d)}% ৰেহাই দিয়ে। তেওঁৰ মুঠ লাভৰ শতাংশ নিৰ্ণয় কৰা।",
        r2(v), [r2(m - d), r2(m + d), r2(v / 2), r2(-v)],
        f"Net profit% = {r2(v)}%.",
        f"মুঠ লাভ% = {as_num(r2(v))}%।")

append("profit-loss-discount", rows)
