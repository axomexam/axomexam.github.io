#!/usr/bin/env python3
"""Height & Distance: 95+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from algebra_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


# 1. elevation: h = d tan(theta)
for d, ang, h in [(30, 45, "30 m"), (20, 60, "20√3 m"), (45, 30, "15√3 m"),
                  (60, 45, "60 m"), (15, 60, "15√3 m")]:
    add(f"The angle of elevation of the top of a tower from a point {d} m away from its foot is {ang}°. Find the height of the tower.",
        f"এটা স্তম্ভৰ পাদদেশৰ পৰা {as_num(d)} মিটাৰ দূৰত এটা বিন্দুৰ পৰা শীৰ্ষৰ উন্নতি কোণ {as_num(ang)}°। স্তম্ভৰ উচ্চতা নিৰ্ণয় কৰা।",
        h, ["30 m", "20√3 m", "15√3 m", "60 m", f"{d} m"],
        f"tan {ang}° = height/distance, so height = {d} × tan {ang}° = {h}.",
        f"tan {as_num(ang)}° = উচ্চতা/দূৰত্ব, সেয়ে উচ্চতা = {h}।")

# 2. depression
for d, ang, h in [(40, 45, "40 m"), (25, 60, "25√3 m"), (60, 30, "20√3 m"), (50, 45, "50 m")]:
    add(f"From the top of a cliff, the angle of depression of a boat {d} m away from the base is {ang}°. Find the height of the cliff.",
        f"এটা শিলৰ শীৰ্ষৰ পৰা পাদদেশৰ পৰা {as_num(d)} মিটাৰ দূৰত থকা এখন নাওঁলৈ অৱনতি কোণ {as_num(ang)}°। শিলৰ উচ্চতা নিৰ্ণয় কৰা।",
        h, ["40 m", "25√3 m", "20√3 m", "50 m", f"{d} m"],
        f"The angle of depression equals the angle of elevation from the boat. Height = {d} × tan {ang}° = {h}.",
        f"অৱনতি কোণ = উন্নতি কোণ, সেয়ে উচ্চতা = {h}।")

# 3. shadow
for h, ang, s in [(20, 45, "20 m"), (15, 60, "5√3 m"), (30, 30, "30√3 m"), (12, 60, "4√3 m")]:
    add(f"A tower {h} m high casts a shadow when the angle of elevation of the sun is {ang}°. Find the length of the shadow.",
        f"{as_num(h)} মিটাৰ উচ্চতাৰ স্তম্ভই সূৰ্যৰ উন্নতি কোণ {as_num(ang)}° হ'লে ছাঁ পেলায়। ছাঁৰ দীঘ নিৰ্ণয় কৰা।",
        s, ["20 m", "5√3 m", "30√3 m", "4√3 m", f"{h} m"],
        f"tan {ang}° = height/shadow, so shadow = {h}/tan {ang}° = {s}.",
        f"ছাঁ = {h}/tan {as_num(ang)}° = {s}।")

# 4. ladder
for L, ang, h in [(10, 30, "5 m"), (20, 45, "10√2 m"), (16, 60, "8√3 m"), (12, 30, "6 m")]:
    add(f"A ladder {L} m long makes an angle of {ang}° with the ground. How high does it reach on the wall?",
        f"{as_num(L)} মিটাৰ দীঘৰ জখলা মাটিৰ সৈতে {as_num(ang)}° কোণ কৰে। বেৰত কিমান ওপৰলৈ পাব?",
        h, ["5 m", "10√2 m", "8√3 m", "6 m", f"{L} m"],
        f"Height = L sin {ang}° = {L} × sin {ang}° = {h}.",
        f"উচ্চতা = L sin {as_num(ang)}° = {h}।")

# 5. two angles (moving towards)
for D, a1, a2, h in [(20, 30, 60, "10√3 m"), (30, 45, 60, "15(√3+1) m"), (10, 30, 45, "5(√3+1) m")]:
    add(f"From a point on the ground, the angle of elevation of the top of a tower is {a1}°. On moving {D} m towards the tower, it becomes {a2}°. Find the height of the tower.",
        f"মাটিত এটা বিন্দুৰ পৰা স্তম্ভৰ শীৰ্ষৰ উন্নতি কোণ {as_num(a1)}°। {as_num(D)} মিটাৰ স্তম্ভৰ ফালে আগবাঢ়িলে {as_num(a2)}° হয়। স্তম্ভৰ উচ্চতা নিৰ্ণয় কৰা।",
        h, ["10√3 m", "15(√3+1) m", "5(√3+1) m", "20 m"],
        f"h = D/(cot {a1}° - cot {a2}°) = {D}/(cot {a1}° - cot {a2}°) = {h}.",
        f"h = D/(cot {as_num(a1)}° - cot {as_num(a2)}°) = {h}।")

# 6. two towers
for h1, h2, ang, d in [(50, 20, 45, "30 m"), (60, 30, 30, "30√3 m"), (40, 10, 60, "10√3 m")]:
    add(f"From the top of a tower {h1} m high, the angle of depression of the top of another tower {h2} m high is {ang}°. Find the distance between the towers.",
        f"{as_num(h1)} মিটাৰ উচ্চতাৰ স্তম্ভৰ শীৰ্ষৰ পৰা {as_num(h2)} মিটাৰ উচ্চতাৰ আন এটা স্তম্ভৰ শীৰ্ষলৈ অৱনতি কোণ {as_num(ang)}°। স্তম্ভ দুটাৰ মাজৰ দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["30 m", "30√3 m", "10√3 m", "20 m"],
        f"Vertical difference = {h1} - {h2} = {h1-h2} m. Distance = ({h1}-{h2})/tan {ang}° = {d}.",
        f"উচ্চতাৰ পাৰ্থক্য = {as_num(h1-h2)} মিটাৰ; দূৰত্ব = {d}।")

# 7. broken tree
for H, ang, d, broken in [(20, 60, "5 m", "10 m"), (18, 30, "6√3 m", "6 m"), (25, 60, "10 m", "5 m")]:
    add(f"A tree {H} m tall breaks and its top touches the ground at a distance of {d} from the foot, making an angle of {ang}° with the ground. Find the height of the standing part.",
        f"{as_num(H)} মিটাৰ উচ্চতাৰ গছ ভাঙি ওপৰৰ অংশই মাটিৰ পৰা {d} দূৰত মাটি স্পৰ্শ কৰে আৰু মাটিৰ সৈতে {as_num(ang)}° কোণ কৰে। থিয় অংশৰ উচ্চতা নিৰ্ণয় কৰা।",
        broken, ["10 m", "6 m", "5 m", "15 m"],
        f"Broken part length = d/cos {ang}° = {d}/cos {ang}°; standing part = {H} - broken part = {broken}.",
        f"ভঙা অংশ = {d}/cos {as_num(ang)}°; থিয় অংশ = {broken}।")

# 8. distance from foot
for h, ang, d in [(30, 45, "30 m"), (20, 30, "20√3 m"), (45, 60, "15√3 m"), (12, 60, "4√3 m")]:
    add(f"The angle of elevation of the top of a tower {h} m high from a point on the ground is {ang}°. Find the distance of the point from the foot of the tower.",
        f"মাটিত এটা বিন্দুৰ পৰা {as_num(h)} মিটাৰ উচ্চতাৰ স্তম্ভৰ শীৰ্ষৰ উন্নতি কোণ {as_num(ang)}°। বিন্দুটোৰ পৰা পাদদেশলৈ দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["30 m", "20√3 m", "15√3 m", "4√3 m", f"{h} m"],
        f"Distance = height/tan {ang}° = {h}/tan {ang}° = {d}.",
        f"দূৰত্ব = {h}/tan {as_num(ang)}° = {d}।")

# 9. airplane
for h, ang, d in [(3000, 60, "1000√3 m"), (2000, 45, "2000 m"), (1500, 30, "1500√3 m")]:
    add(f"An aeroplane is flying at a height of {h} m. The angle of elevation from a point on the ground is {ang}°. Find the horizontal distance of the aeroplane from the point.",
        f"এখন বিমান {as_num(h)} মিটাৰ উচ্চতাত উৰি আছে। মাটিত এটা বিন্দুৰ পৰা উন্নতি কোণ {as_num(ang)}°। বিন্দুটোৰ পৰা বিমানৰ অনুভূমিক দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["1000√3 m", "2000 m", "1500√3 m", "3000 m"],
        f"Horizontal distance = height/tan {ang}° = {h}/tan {ang}° = {d}.",
        f"অনুভূমিক দূৰত্ব = {h}/tan {as_num(ang)}° = {d}।")

# 10. two objects opposite sides
for h, a1, a2, d in [(30, 30, 60, "40√3 m"), (20, 45, 30, "20(1+√3) m")]:
    add(f"From the top of a tower {h} m high, the angles of depression of two objects on opposite sides are {a1}° and {a2}°. Find the distance between the objects.",
        f"{as_num(h)} মিটাৰ উচ্চতাৰ স্তম্ভৰ শীৰ্ষৰ পৰা বিপৰীত ফালে থকা দুটা বস্তুলৈ অৱনতি কোণ {as_num(a1)}° আৰু {as_num(a2)}°। বস্তু দুটাৰ মাজৰ দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["40√3 m", "20(1+√3) m", "30 m", "60 m"],
        f"Distance = h(cot {a1}° + cot {a2}°) = {h}(cot {a1}° + cot {a2}°) = {d}.",
        f"দূৰত্ব = h(cot {as_num(a1)}° + cot {as_num(a2)}°) = {d}।")

# extra batch
for d, ang, h in [(40, 45, "40 m"), (10, 60, "10√3 m"), (30, 30, "10√3 m")]:
    add(f"The angle of elevation of the top of a tower from a point {d} m away from its foot is {ang}°. Find the height of the tower.",
        f"এটা স্তম্ভৰ পাদদেশৰ পৰা {as_num(d)} মিটাৰ দূৰত এটা বিন্দুৰ পৰা শীৰ্ষৰ উন্নতি কোণ {as_num(ang)}°। স্তম্ভৰ উচ্চতা নিৰ্ণয় কৰা।",
        h, ["40 m", "10√3 m", "30 m", "60 m"],
        f"Height = {d} tan {ang}° = {h}.",
        f"উচ্চতা = {h}।")

for d, ang, h in [(30, 60, "30√3 m"), (45, 30, "15√3 m"), (20, 45, "20 m")]:
    add(f"From the top of a cliff, the angle of depression of a boat {d} m away from the base is {ang}°. Find the height of the cliff.",
        f"এটা শিলৰ শীৰ্ষৰ পৰা পাদদেশৰ পৰা {as_num(d)} মিটাৰ দূৰত থকা এখন নাওঁলৈ অৱনতি কোণ {as_num(ang)}°। শিলৰ উচ্চতা নিৰ্ণয় কৰা।",
        h, ["30√3 m", "15√3 m", "20 m", "40 m"],
        f"Height = {d} tan {ang}° = {h}.",
        f"উচ্চতা = {h}।")

for h, ang, s in [(24, 45, "24 m"), (18, 30, "18√3 m"), (9, 60, "3√3 m")]:
    add(f"A tower {h} m high casts a shadow when the angle of elevation of the sun is {ang}°. Find the length of the shadow.",
        f"{as_num(h)} মিটাৰ উচ্চতাৰ স্তম্ভই সূৰ্যৰ উন্নতি কোণ {as_num(ang)}° হ'লে ছাঁ পেলায়। ছাঁৰ দীঘ নিৰ্ণয় কৰা।",
        s, ["24 m", "18√3 m", "3√3 m", "12 m"],
        f"Shadow = {h}/tan {ang}° = {s}.",
        f"ছাঁ = {s}।")

for L, ang, h in [(14, 30, "7 m"), (24, 60, "12√3 m"), (8, 45, "4√2 m")]:
    add(f"A ladder {L} m long makes an angle of {ang}° with the ground. How high does it reach on the wall?",
        f"{as_num(L)} মিটাৰ দীঘৰ জখলা মাটিৰ সৈতে {as_num(ang)}° কোণ কৰে। বেৰত কিমান ওপৰলৈ পাব?",
        h, ["7 m", "12√3 m", "4√2 m", "10 m"],
        f"Height = {L} sin {ang}° = {h}.",
        f"উচ্চতা = {h}।")

for D, a1, a2, h in [(15, 30, 60, "7.5√3 m"), (40, 45, 60, "20(√3+1) m")]:
    add(f"From a point on the ground, the angle of elevation of the top of a tower is {a1}°. On moving {D} m towards the tower, it becomes {a2}°. Find the height of the tower.",
        f"মাটিত এটা বিন্দুৰ পৰা স্তম্ভৰ শীৰ্ষৰ উন্নতি কোণ {as_num(a1)}°। {as_num(D)} মিটাৰ স্তম্ভৰ ফালে আগবাঢ়িলে {as_num(a2)}° হয়। স্তম্ভৰ উচ্চতা নিৰ্ণয় কৰা।",
        h, ["7.5√3 m", "20(√3+1) m", "10√3 m", "30 m"],
        f"h = {D}/(cot {a1}° - cot {a2}°) = {h}.",
        f"h = {h}।")

for h1, h2, ang, d in [(70, 40, 45, "30 m"), (45, 15, 30, "30√3 m")]:
    add(f"From the top of a tower {h1} m high, the angle of depression of the top of another tower {h2} m high is {ang}°. Find the distance between the towers.",
        f"{as_num(h1)} মিটাৰ উচ্চতাৰ স্তম্ভৰ শীৰ্ষৰ পৰা {as_num(h2)} মিটাৰ উচ্চতাৰ আন এটা স্তম্ভৰ শীৰ্ষলৈ অৱনতি কোণ {as_num(ang)}°। দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["30 m", "30√3 m", "20 m", "40 m"],
        f"Distance = ({h1}-{h2})/tan {ang}° = {d}.",
        f"দূৰত্ব = {d}।")

for h, ang, d in [(36, 45, "36 m"), (24, 30, "24√3 m"), (18, 60, "6√3 m")]:
    add(f"The angle of elevation of the top of a tower {h} m high from a point on the ground is {ang}°. Find the distance of the point from the foot of the tower.",
        f"মাটিত এটা বিন্দুৰ পৰা {as_num(h)} মিটাৰ উচ্চতাৰ স্তম্ভৰ শীৰ্ষৰ উন্নতি কোণ {as_num(ang)}°। দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["36 m", "24√3 m", "6√3 m", "12 m"],
        f"Distance = {h}/tan {ang}° = {d}.",
        f"দূৰত্ব = {d}।")

# final batch
for d, ang, h in [(50, 45, "50 m"), (25, 60, "25√3 m"), (60, 30, "20√3 m"), (18, 45, "18 m"), (12, 30, "4√3 m")]:
    add(f"The angle of elevation of the top of a tower from a point {d} m away from its foot is {ang}°. Find the height of the tower.",
        f"এটা স্তম্ভৰ পাদদেশৰ পৰা {as_num(d)} মিটাৰ দূৰত এটা বিন্দুৰ পৰা শীৰ্ষৰ উন্নতি কোণ {as_num(ang)}°। স্তম্ভৰ উচ্চতা নিৰ্ণয় কৰা।",
        h, ["50 m", "25√3 m", "20√3 m", "18 m", "4√3 m"],
        f"Height = {d} tan {ang}° = {h}.",
        f"উচ্চতা = {h}।")

for d, ang, h in [(35, 45, "35 m"), (15, 60, "15√3 m"), (45, 30, "15√3 m"), (28, 45, "28 m")]:
    add(f"From the top of a cliff, the angle of depression of a boat {d} m away from the base is {ang}°. Find the height of the cliff.",
        f"এটা শিলৰ শীৰ্ষৰ পৰা পাদদেশৰ পৰা {as_num(d)} মিটাৰ দূৰত থকা এখন নাওঁলৈ অৱনতি কোণ {as_num(ang)}°। শিলৰ উচ্চতা নিৰ্ণয় কৰা।",
        h, ["35 m", "15√3 m", "28 m", "45 m"],
        f"Height = {d} tan {ang}° = {h}.",
        f"উচ্চতা = {h}।")

for h, ang, sh in [(16, 45, "16 m"), (21, 60, "7√3 m"), (36, 30, "36√3 m"), (15, 30, "15√3 m")]:
    add(f"A tower {h} m high casts a shadow when the angle of elevation of the sun is {ang}°. Find the length of the shadow.",
        f"{as_num(h)} মিটাৰ উচ্চতাৰ স্তম্ভই সূৰ্যৰ উন্নতি কোণ {as_num(ang)}° হ'লে ছাঁ পেলায়। ছাঁৰ দীঘ নিৰ্ণয় কৰা।",
        sh, ["16 m", "7√3 m", "36√3 m", "15√3 m"],
        f"Shadow = {h}/tan {ang}° = {sh}.",
        f"ছাঁ = {sh}।")

for L, ang, h in [(18, 30, "9 m"), (30, 60, "15√3 m"), (10, 45, "5√2 m"), (20, 30, "10 m")]:
    add(f"A ladder {L} m long makes an angle of {ang}° with the ground. How high does it reach on the wall?",
        f"{as_num(L)} মিটাৰ দীঘৰ জখলা মাটিৰ সৈতে {as_num(ang)}° কোণ কৰে। বেৰত কিমান ওপৰলৈ পাব?",
        h, ["9 m", "15√3 m", "5√2 m", "10 m"],
        f"Height = {L} sin {ang}° = {h}.",
        f"উচ্চতা = {h}।")

for D, a1, a2, h in [(24, 30, 60, "12√3 m"), (12, 45, 60, "6(√3+1) m"), (18, 30, 45, "9(√3+1) m")]:
    add(f"From a point on the ground, the angle of elevation of the top of a tower is {a1}°. On moving {D} m towards the tower, it becomes {a2}°. Find the height of the tower.",
        f"মাটিত এটা বিন্দুৰ পৰা স্তম্ভৰ শীৰ্ষৰ উন্নতি কোণ {as_num(a1)}°। {as_num(D)} মিটাৰ স্তম্ভৰ ফালে আগবাঢ়িলে {as_num(a2)}° হয়। উচ্চতা নিৰ্ণয় কৰা।",
        h, ["12√3 m", "6(√3+1) m", "9(√3+1) m", "24 m"],
        f"h = {D}/(cot {a1}° - cot {a2}°) = {h}.",
        f"h = {h}।")

for h1, h2, ang, d in [(55, 25, 45, "30 m"), (80, 50, 30, "30√3 m")]:
    add(f"From the top of a tower {h1} m high, the angle of depression of the top of another tower {h2} m high is {ang}°. Find the distance between the towers.",
        f"{as_num(h1)} মিটাৰ উচ্চতাৰ স্তম্ভৰ শীৰ্ষৰ পৰা {as_num(h2)} মিটাৰ উচ্চতাৰ আন এটা স্তম্ভৰ শীৰ্ষলৈ অৱনতি কোণ {as_num(ang)}°। দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["30 m", "30√3 m", "20 m", "40 m"],
        f"Distance = ({h1}-{h2})/tan {ang}° = {d}.",
        f"দূৰত্ব = {d}।")

for h, ang, d in [(40, 45, "40 m"), (30, 60, "10√3 m"), (27, 30, "27√3 m")]:
    add(f"The angle of elevation of the top of a tower {h} m high from a point on the ground is {ang}°. Find the distance of the point from the foot of the tower.",
        f"মাটিত এটা বিন্দুৰ পৰা {as_num(h)} মিটাৰ উচ্চতাৰ স্তম্ভৰ শীৰ্ষৰ উন্নতি কোণ {as_num(ang)}°। দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["40 m", "10√3 m", "27√3 m", "20 m"],
        f"Distance = {h}/tan {ang}° = {d}.",
        f"দূৰত্ব = {d}।")

for h, ang, d in [(1200, 60, "400√3 m"), (2400, 45, "2400 m")]:
    add(f"An aeroplane is flying at a height of {h} m. The angle of elevation from a point on the ground is {ang}°. Find the horizontal distance of the aeroplane from the point.",
        f"এখন বিমান {as_num(h)} মিটাৰ উচ্চতাত উৰি আছে। মাটিত এটা বিন্দুৰ পৰা উন্নতি কোণ {as_num(ang)}°। অনুভূমিক দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["400√3 m", "2400 m", "1200 m", "800 m"],
        f"Horizontal distance = {h}/tan {ang}° = {d}.",
        f"অনুভূমিক দূৰত্ব = {d}।")

for H, ang, d, standing in [(36, 30, "12√3 m", "12 m"), (24, 30, "8√3 m", "8 m"), (20, 60, "5 m", "10 m")]:
    add(f"A tree {H} m tall breaks and its top touches the ground at a distance of {d} from the foot, making an angle of {ang}° with the ground. Find the height of the standing part.",
        f"{as_num(H)} মিটাৰ উচ্চতাৰ গছ ভাঙি ওপৰৰ অংশই মাটিৰ পৰা {d} দূৰত মাটি স্পৰ্শ কৰে আৰু মাটিৰ সৈতে {as_num(ang)}° কোণ কৰে। থিয় অংশৰ উচ্চতা নিৰ্ণয় কৰা।",
        standing, ["12 m", "8 m", "10 m", "6 m"],
        f"Standing part = {H} - broken part = {standing}.",
        f"থিয় অংশ = {standing}।")

for h, a1, a2, d in [(40, 30, 60, "40√3 m"), (25, 45, 30, "25(1+√3) m")]:
    add(f"From the top of a tower {h} m high, the angles of depression of two objects on opposite sides are {a1}° and {a2}°. Find the distance between the objects.",
        f"{as_num(h)} মিটাৰ উচ্চতাৰ স্তম্ভৰ শীৰ্ষৰ পৰা বিপৰীত ফালে থকা দুটা বস্তুলৈ অৱনতি কোণ {as_num(a1)}° আৰু {as_num(a2)}°। দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["40√3 m", "25(1+√3) m", "30 m", "60 m"],
        f"Distance = {h}(cot {a1}° + cot {a2}°) = {d}.",
        f"দূৰত্ব = {d}।")

# last batch
for d, ang, h in [(22, 45, "22 m"), (8, 60, "8√3 m")]:
    add(f"The angle of elevation of the top of a tower from a point {d} m away from its foot is {ang}°. Find the height of the tower.",
        f"এটা স্তম্ভৰ পাদদেশৰ পৰা {as_num(d)} মিটাৰ দূৰত এটা বিন্দুৰ পৰা শীৰ্ষৰ উন্নতি কোণ {as_num(ang)}°। উচ্চতা নিৰ্ণয় কৰা।",
        h, ["22 m", "8√3 m", "16 m", "30 m"],
        f"Height = {d} tan {ang}° = {h}.",
        f"উচ্চতা = {h}।")
for d, ang, h in [(32, 45, "32 m"), (18, 60, "18√3 m")]:
    add(f"From the top of a cliff, the angle of depression of a boat {d} m away from the base is {ang}°. Find the height of the cliff.",
        f"এটা শিলৰ শীৰ্ষৰ পৰা পাদদেশৰ পৰা {as_num(d)} মিটাৰ দূৰত থকা এখন নাওঁলৈ অৱনতি কোণ {as_num(ang)}°। উচ্চতা নিৰ্ণয় কৰা।",
        h, ["32 m", "18√3 m", "20 m", "40 m"],
        f"Height = {d} tan {ang}° = {h}.",
        f"উচ্চতা = {h}।")
for h, ang, sh in [(14, 45, "14 m"), (27, 60, "9√3 m")]:
    add(f"A tower {h} m high casts a shadow when the angle of elevation of the sun is {ang}°. Find the length of the shadow.",
        f"{as_num(h)} মিটাৰ উচ্চতাৰ স্তম্ভই সূৰ্যৰ উন্নতি কোণ {as_num(ang)}° হ'লে ছাঁ পেলায়। ছাঁৰ দীঘ নিৰ্ণয় কৰা।",
        sh, ["14 m", "9√3 m", "7 m", "21 m"],
        f"Shadow = {h}/tan {ang}° = {sh}.",
        f"ছাঁ = {sh}।")
for h, ang, d in [(32, 45, "32 m"), (21, 60, "7√3 m")]:
    add(f"The angle of elevation of the top of a tower {h} m high from a point on the ground is {ang}°. Find the distance of the point from the foot of the tower.",
        f"মাটিত এটা বিন্দুৰ পৰা {as_num(h)} মিটাৰ উচ্চতাৰ স্তম্ভৰ শীৰ্ষৰ উন্নতি কোণ {as_num(ang)}°। দূৰত্ব নিৰ্ণয় কৰা।",
        d, ["32 m", "7√3 m", "16 m", "28 m"],
        f"Distance = {h}/tan {ang}° = {d}.",
        f"দূৰত্ব = {d}।")
append("height-distance", rows)
