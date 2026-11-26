#!/usr/bin/env python3
"""Problems on Trains: 95+ hard bilingual questions."""

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


def ms(s):
    return s * 5 / 18


# 1. pole
for L, s in [(120, 36), (150, 54), (180, 72), (200, 90), (240, 108), (90, 45)]:
    v = L / ms(s)
    add(f"A train of length {L} m is running at {s} km/h. How long will it take to cross a pole?",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ী {as_num(s)} km/h বেগেৰে গৈ আছে। এটা খুঁটাতকৈ ওলাই যাবলৈ কিমান সময় লাগিব?",
        r2(v), [r2(v * 2), r2(v / 2), r2(L / s), r2(s / L)],
        f"Speed = {s} km/h = {s}×5/18 = {r2(ms(s))} m/s. Time = length/speed = {L}/{r2(ms(s))} = {r2(v)} s.",
        f"বেগ = {as_num(r2(ms(s)))} m/s। সময় = {as_num(L)}/{as_num(r2(ms(s)))} = {as_num(r2(v))} ছেকেণ্ড।")

# 2. platform
for L, P, s in [(150, 250, 72), (200, 300, 90), (120, 180, 54), (250, 350, 108)]:
    v = (L + P) / ms(s)
    add(f"A train of length {L} m crosses a platform of length {P} m at {s} km/h. Find the time taken.",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ীয়ে {as_num(P)} মিটাৰ দীঘৰ প্লেটফৰ্ম {as_num(s)} km/h বেগেৰে অতিক্ৰম কৰে। সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(L / ms(s)), r2(P / ms(s)), r2(v * 2), r2(v / 2)],
        f"Total distance = {L} + {P} = {L+P} m. Time = {L+P}/{r2(ms(s))} = {r2(v)} s.",
        f"মুঠ দূৰত্ব = {as_num(L+P)} মিটাৰ। সময় = {as_num(r2(v))} ছেকেণ্ড।")

# 3. opposite trains
for L1, L2, s1, s2 in [(120, 180, 60, 48), (150, 250, 72, 54), (200, 300, 90, 72), (100, 150, 54, 36)]:
    v = (L1 + L2) / ms(s1 + s2)
    add(f"Two trains of lengths {L1} m and {L2} m run towards each other at {s1} km/h and {s2} km/h. How long will they take to cross each other?",
        f"{as_num(L1)} মিটাৰ আৰু {as_num(L2)} মিটাৰ দীঘৰ দুখন ৰে'লগাড়ী পৰস্পৰৰ ফালে {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে যায়। এখনে আনখনক অতিক্ৰম কৰিবলৈ কিমান সময় লাগিব?",
        r2(v), [r2((L1 + L2) / ms(abs(s1 - s2))), r2(L1 / ms(s1)), r2(v * 2), r2(v / 2)],
        f"Relative speed = {s1+s2} km/h = {r2(ms(s1+s2))} m/s. Time = {L1+L2}/{r2(ms(s1+s2))} = {r2(v)} s.",
        f"আপেক্ষিক বেগ = {as_num(r2(ms(s1+s2)))} m/s। সময় = {as_num(r2(v))} ছেকেণ্ড।")

# 4. same direction
for L1, L2, s1, s2 in [(120, 180, 90, 54), (150, 200, 72, 45), (200, 300, 108, 72), (100, 200, 81, 45)]:
    v = (L1 + L2) / ms(s1 - s2)
    add(f"Two trains of lengths {L1} m and {L2} m run in the same direction at {s1} km/h and {s2} km/h. How long will the faster train take to overtake the slower one?",
        f"{as_num(L1)} মিটাৰ আৰু {as_num(L2)} মিটাৰ দীঘৰ দুখন ৰে'লগাড়ী একে দিশত {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে যায়। দ্ৰুতগামী ৰে'লে লেহুকাক অতিক্ৰম কৰিবলৈ কিমান সময় লাগিব?",
        r2(v), [r2((L1 + L2) / ms(s1 + s2)), r2(L1 / ms(s1)), r2(v * 2), r2(v / 2)],
        f"Relative speed = {s1-s2} km/h = {r2(ms(s1-s2))} m/s. Time = {L1+L2}/{r2(ms(s1-s2))} = {r2(v)} s.",
        f"আপেক্ষিক বেগ = {as_num(r2(ms(s1-s2)))} m/s। সময় = {as_num(r2(v))} ছেকেণ্ড।")

# 5. length from pole time
for t, s in [(12, 54), (10, 72), (15, 36), (8, 90)]:
    v = ms(s) * t
    add(f"A train running at {s} km/h crosses a pole in {t} seconds. Find the length of the train.",
        f"{as_num(s)} km/h বেগেৰে গৈ থকা ৰে'লগাড়ীয়ে এটা খুঁট {as_num(t)} ছেকেণ্ডত অতিক্ৰম কৰে। ৰে'লগাড়ীৰ দীঘ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(s * t), r2(t * 18 / 5)],
        f"Length = speed × time = {r2(ms(s))} × {t} = {r2(v)} m.",
        f"দীঘ = বেগ × সময় = {as_num(r2(v))} মিটাৰ।")

for L, t, s in [(150, 20, 72), (200, 25, 90), (120, 15, 54), (250, 30, 108)]:
    v = ms(s) * t - L
    add(f"A train of length {L} m running at {s} km/h crosses a platform in {t} seconds. Find the length of the platform.",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ীয়ে {as_num(s)} km/h বেগেৰে {as_num(t)} ছেকেণ্ডত এটা প্লেটফৰ্ম অতিক্ৰম কৰে। প্লেটফৰ্মৰ দীঘ নিৰ্ণয় কৰা।",
        r2(v), [r2(ms(s) * t), r2(v + L), r2(v / 2), r2(v * 2)],
        f"Distance covered = {r2(ms(s))} × {t} = {r2(ms(s)*t)} m. Platform = {r2(ms(s)*t)} - {L} = {r2(v)} m.",
        f"প্লেটফৰ্মৰ দীঘ = {as_num(r2(v))} মিটাৰ।")

for P, t1, t2 in [(200, 10, 20), (300, 12, 24), (150, 8, 14)]:
    s_ms = P / (t2 - t1)
    v = s_ms * 18 / 5
    add(f"A train crosses a pole in {t1} seconds and a platform of length {P} m in {t2} seconds. Find the speed of the train.",
        f"ৰে'লগাড়ীয়ে এটা খুঁট {as_num(t1)} ছেকেণ্ডত আৰু {as_num(P)} মিটাৰ দীঘৰ প্লেটফৰ্ম {as_num(t2)} ছেকেণ্ডত অতিক্ৰম কৰে। ৰে'লগাড়ীৰ বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(P / t2 * 18 / 5), r2(P / (t1 + t2) * 18 / 5)],
        f"Speed = platform length / extra time = {P}/({t2}-{t1}) = {r2(s_ms)} m/s = {r2(v)} km/h.",
        f"বেগ = {as_num(r2(v))} km/h।")

for L1, L2, s1, s2 in [(180, 220, 54, 36), (250, 150, 72, 45), (300, 200, 90, 60)]:
    v = (L1 + L2) / ms(s1 + s2)
    add(f"Two trains of lengths {L1} m and {L2} m run towards each other at {s1} km/h and {s2} km/h. How long will they take to cross each other?",
        f"{as_num(L1)} মিটাৰ আৰু {as_num(L2)} মিটাৰ দীঘৰ দুখন ৰে'লগাড়ী পৰস্পৰৰ ফালে {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে যায়। অতিক্ৰম কৰিবলৈ কিমান সময় লাগিব?",
        r2(v), [r2((L1 + L2) / ms(abs(s1 - s2))), r2(L1 / ms(s1)), r2(v * 2), r2(v / 2)],
        f"Relative speed = {r2(ms(s1+s2))} m/s; time = {L1+L2}/{r2(ms(s1+s2))} = {r2(v)} s.",
        f"সময় = {as_num(r2(v))} ছেকেণ্ড।")

for L, s, t in [(150, 54, 10), (200, 72, 12), (120, 36, 15)]:
    v = ms(s) * t
    add(f"A train running at {s} km/h crosses a man standing near the track in {t} seconds. Find the length of the train.",
        f"{as_num(s)} km/h বেগেৰে গৈ থকা ৰে'লগাড়ীয়ে ৰে'লপথৰ কাষত থিয় হৈ থকা এজন মানুহক {as_num(t)} ছেকেণ্ডত অতিক্ৰম কৰে। ৰে'লগাড়ীৰ দীঘ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(s * t), r2(v + 50)],
        f"Length = {r2(ms(s))} × {t} = {r2(v)} m.",
        f"দীঘ = {as_num(r2(v))} মিটাৰ।")

for L, B, s in [(200, 400, 72), (150, 350, 90), (250, 550, 108)]:
    v = (L + B) / ms(s)
    add(f"A train of length {L} m crosses a bridge of length {B} m at {s} km/h. Find the time taken.",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ীয়ে {as_num(B)} মিটাৰ দীঘৰ দলং {as_num(s)} km/h বেগেৰে অতিক্ৰম কৰে। সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(L / ms(s)), r2(B / ms(s)), r2(v * 2), r2(v / 2)],
        f"Total distance = {L+B} m; time = {L+B}/{r2(ms(s))} = {r2(v)} s.",
        f"মুঠ দূৰত্ব = {as_num(L+B)} মিটাৰ; সময় = {as_num(r2(v))} ছেকেণ্ড।")

for L, s in [(100, 36), (160, 54), (220, 72), (280, 90), (130, 45), (190, 60)]:
    v = L / ms(s)
    add(f"A train of length {L} m is running at {s} km/h. How long will it take to cross a pole?",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ী {as_num(s)} km/h বেগেৰে গৈ আছে। এটা খুঁট অতিক্ৰম কৰিবলৈ কিমান সময় লাগিব?",
        r2(v), [r2(v * 2), r2(v / 2), r2(L / s), r2(s / L)],
        f"Time = {L}/{r2(ms(s))} = {r2(v)} s.",
        f"সময় = {as_num(r2(v))} ছেকেণ্ড।")

for L, P, s in [(180, 220, 60), (220, 380, 90), (140, 260, 72), (300, 500, 108)]:
    v = (L + P) / ms(s)
    add(f"A train of length {L} m crosses a platform of length {P} m at {s} km/h. Find the time taken.",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ীয়ে {as_num(P)} মিটাৰ দীঘৰ প্লেটফৰ্ম {as_num(s)} km/h বেগেৰে অতিক্ৰম কৰে। সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(L / ms(s)), r2(P / ms(s)), r2(v * 2), r2(v / 2)],
        f"Time = ({L}+{P})/{r2(ms(s))} = {r2(v)} s.",
        f"সময় = {as_num(r2(v))} ছেকেণ্ড।")

for L1, L2, s1, s2 in [(160, 240, 72, 48), (200, 250, 90, 54), (120, 180, 60, 30)]:
    v = (L1 + L2) / ms(s1 - s2)
    add(f"Two trains of lengths {L1} m and {L2} m run in the same direction at {s1} km/h and {s2} km/h. How long will the faster train take to overtake the slower one?",
        f"{as_num(L1)} মিটাৰ আৰু {as_num(L2)} মিটাৰ দীঘৰ দুখন ৰে'লগাড়ী একে দিশত {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে যায়। দ্ৰুতগামী ৰে'লে লেহুকাক অতিক্ৰম কৰিবলৈ কিমান সময় লাগিব?",
        r2(v), [r2((L1 + L2) / ms(s1 + s2)), r2(L1 / ms(s1)), r2(v * 2), r2(v / 2)],
        f"Time = ({L1}+{L2})/{r2(ms(s1-s2))} = {r2(v)} s.",
        f"সময় = {as_num(r2(v))} ছেকেণ্ড।")

for t, s in [(9, 45), (14, 63), (11, 81), (16, 108)]:
    v = ms(s) * t
    add(f"A train running at {s} km/h crosses a pole in {t} seconds. Find the length of the train.",
        f"{as_num(s)} km/h বেগেৰে গৈ থকা ৰে'লগাড়ীয়ে এটা খুঁট {as_num(t)} ছেকেণ্ডত অতিক্ৰম কৰে। ৰে'লগাড়ীৰ দীঘ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(s * t), r2(t * 18 / 5)],
        f"Length = {r2(ms(s))} × {t} = {r2(v)} m.",
        f"দীঘ = {as_num(r2(v))} মিটাৰ।")

for L, t, s in [(180, 24, 90), (240, 28, 108), (100, 18, 72)]:
    v = ms(s) * t - L
    add(f"A train of length {L} m running at {s} km/h crosses a platform in {t} seconds. Find the length of the platform.",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ীয়ে {as_num(s)} km/h বেগেৰে {as_num(t)} ছেকেণ্ডত এটা প্লেটফৰ্ম অতিক্ৰম কৰে। প্লেটফৰ্মৰ দীঘ নিৰ্ণয় কৰা।",
        r2(v), [r2(ms(s) * t), r2(v + L), r2(v / 2), r2(v * 2)],
        f"Platform = {r2(ms(s)*t)} - {L} = {r2(v)} m.",
        f"প্লেটফৰ্মৰ দীঘ = {as_num(r2(v))} মিটাৰ।")

for P, t1, t2 in [(240, 9, 21), (360, 11, 23), (180, 7, 16)]:
    s_ms = P / (t2 - t1)
    v = s_ms * 18 / 5
    add(f"A train crosses a pole in {t1} seconds and a platform of length {P} m in {t2} seconds. Find the speed of the train.",
        f"ৰে'লগাড়ীয়ে এটা খুঁট {as_num(t1)} ছেকেণ্ডত আৰু {as_num(P)} মিটাৰ দীঘৰ প্লেটফৰ্ম {as_num(t2)} ছেকেণ্ডত অতিক্ৰম কৰে। ৰে'লগাড়ীৰ বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(P / t2 * 18 / 5), r2(P / (t1 + t2) * 18 / 5)],
        f"Speed = {P}/({t2}-{t1}) = {r2(s_ms)} m/s = {r2(v)} km/h.",
        f"বেগ = {as_num(r2(v))} km/h।")

# final batch
for L, s in [(110, 33), (170, 51), (210, 63), (260, 78)]:
    v = L / ms(s)
    add(f"A train of length {L} m is running at {s} km/h. How long will it take to cross a pole?",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ী {as_num(s)} km/h বেগেৰে গৈ আছে। এটা খুঁট অতিক্ৰম কৰিবলৈ কিমান সময় লাগিব?",
        r2(v), [r2(v * 2), r2(v / 2), r2(L / s), r2(s / L)],
        f"Speed = {r2(ms(s))} m/s; time = {L}/{r2(ms(s))} = {r2(v)} s.",
        f"বেগ = {as_num(r2(ms(s)))} m/s; সময় = {as_num(r2(v))} ছেকেণ্ড।")

for L, P, s in [(160, 240, 72), (210, 290, 90), (130, 170, 54), (260, 340, 108)]:
    v = (L + P) / ms(s)
    add(f"A train of length {L} m crosses a platform of length {P} m at {s} km/h. Find the time taken.",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ীয়ে {as_num(P)} মিটাৰ দীঘৰ প্লেটফৰ্ম {as_num(s)} km/h বেগেৰে অতিক্ৰম কৰে। সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(L / ms(s)), r2(P / ms(s)), r2(v * 2), r2(v / 2)],
        f"Time = ({L}+{P})/{r2(ms(s))} = {r2(v)} s.",
        f"সময় = {as_num(r2(v))} ছেকেণ্ড।")

for L1, L2, s1, s2 in [(140, 160, 66, 54), (170, 230, 78, 60), (220, 280, 96, 78), (110, 190, 60, 42)]:
    v = (L1 + L2) / ms(s1 + s2)
    add(f"Two trains of lengths {L1} m and {L2} m run towards each other at {s1} km/h and {s2} km/h. How long will they take to cross each other?",
        f"{as_num(L1)} মিটাৰ আৰু {as_num(L2)} মিটাৰ দীঘৰ দুখন ৰে'লগাড়ী পৰস্পৰৰ ফালে {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে যায়। অতিক্ৰম কৰিবলৈ কিমান সময় লাগিব?",
        r2(v), [r2((L1 + L2) / ms(abs(s1 - s2))), r2(L1 / ms(s1)), r2(v * 2), r2(v / 2)],
        f"Time = {L1+L2}/{r2(ms(s1+s2))} = {r2(v)} s.",
        f"সময় = {as_num(r2(v))} ছেকেণ্ড।")

for L1, L2, s1, s2 in [(140, 160, 84, 48), (170, 230, 78, 42), (220, 280, 96, 60), (110, 190, 72, 36)]:
    v = (L1 + L2) / ms(s1 - s2)
    add(f"Two trains of lengths {L1} m and {L2} m run in the same direction at {s1} km/h and {s2} km/h. How long will the faster train take to overtake the slower one?",
        f"{as_num(L1)} মিটাৰ আৰু {as_num(L2)} মিটাৰ দীঘৰ দুখন ৰে'লগাড়ী একে দিশত {as_num(s1)} km/h আৰু {as_num(s2)} km/h বেগেৰে যায়। দ্ৰুতগামী ৰে'লে লেহুকাক অতিক্ৰম কৰিবলৈ কিমান সময় লাগিব?",
        r2(v), [r2((L1 + L2) / ms(s1 + s2)), r2(L1 / ms(s1)), r2(v * 2), r2(v / 2)],
        f"Time = {L1+L2}/{r2(ms(s1-s2))} = {r2(v)} s.",
        f"সময় = {as_num(r2(v))} ছেকেণ্ড।")

for t, s in [(13, 36), (11, 54), (17, 72)]:
    v = ms(s) * t
    add(f"A train running at {s} km/h crosses a pole in {t} seconds. Find the length of the train.",
        f"{as_num(s)} km/h বেগেৰে গৈ থকা ৰে'লগাড়ীয়ে এটা খুঁট {as_num(t)} ছেকেণ্ডত অতিক্ৰম কৰে। ৰে'লগাড়ীৰ দীঘ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(s * t), r2(t * 18 / 5)],
        f"Length = {r2(ms(s))} × {t} = {r2(v)} m.",
        f"দীঘ = {as_num(r2(v))} মিটাৰ।")

for L, t, s in [(160, 22, 72), (220, 26, 90), (140, 20, 54)]:
    v = ms(s) * t - L
    add(f"A train of length {L} m running at {s} km/h crosses a platform in {t} seconds. Find the length of the platform.",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ীয়ে {as_num(s)} km/h বেগেৰে {as_num(t)} ছেকেণ্ডত এটা প্লেটফৰ্ম অতিক্ৰম কৰে। প্লেটফৰ্মৰ দীঘ নিৰ্ণয় কৰা।",
        r2(v), [r2(ms(s) * t), r2(v + L), r2(v / 2), r2(v * 2)],
        f"Platform = {r2(ms(s)*t)} - {L} = {r2(v)} m.",
        f"প্লেটফৰ্মৰ দীঘ = {as_num(r2(v))} মিটাৰ।")

for P, t1, t2 in [(300, 10, 22), (240, 8, 18), (420, 12, 26)]:
    s_ms = P / (t2 - t1)
    v = s_ms * 18 / 5
    add(f"A train crosses a pole in {t1} seconds and a platform of length {P} m in {t2} seconds. Find the speed of the train.",
        f"ৰে'লগাড়ীয়ে এটা খুঁট {as_num(t1)} ছেকেণ্ডত আৰু {as_num(P)} মিটাৰ দীঘৰ প্লেটফৰ্ম {as_num(t2)} ছেকেণ্ডত অতিক্ৰম কৰে। ৰে'লগাড়ীৰ বেগ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(P / t2 * 18 / 5), r2(P / (t1 + t2) * 18 / 5)],
        f"Speed = {P}/({t2}-{t1}) = {r2(s_ms)} m/s = {r2(v)} km/h.",
        f"বেগ = {as_num(r2(v))} km/h।")

for L, s, t in [(180, 72, 9), (240, 90, 10), (150, 54, 12)]:
    v = ms(s) * t
    add(f"A train running at {s} km/h crosses a man standing near the track in {t} seconds. Find the length of the train.",
        f"{as_num(s)} km/h বেগেৰে গৈ থকা ৰে'লগাড়ীয়ে ৰে'লপথৰ কাষত থিয় হৈ থকা এজন মানুহক {as_num(t)} ছেকেণ্ডত অতিক্ৰম কৰে। ৰে'লগাড়ীৰ দীঘ নিৰ্ণয় কৰা।",
        r2(v), [r2(v / 2), r2(v * 2), r2(s * t), r2(v + 50)],
        f"Length = {r2(ms(s))} × {t} = {r2(v)} m.",
        f"দীঘ = {as_num(r2(v))} মিটাৰ।")

for L, B, s in [(220, 380, 72), (170, 430, 90), (270, 530, 108)]:
    v = (L + B) / ms(s)
    add(f"A train of length {L} m crosses a bridge of length {B} m at {s} km/h. Find the time taken.",
        f"{as_num(L)} মিটাৰ দীঘৰ ৰে'লগাড়ীয়ে {as_num(B)} মিটাৰ দীঘৰ দলং {as_num(s)} km/h বেগেৰে অতিক্ৰম কৰে। সময় নিৰ্ণয় কৰা।",
        r2(v), [r2(L / ms(s)), r2(B / ms(s)), r2(v * 2), r2(v / 2)],
        f"Time = ({L}+{B})/{r2(ms(s))} = {r2(v)} s.",
        f"সময় = {as_num(r2(v))} ছেকেণ্ড।")

append("problems-on-trains", rows)
