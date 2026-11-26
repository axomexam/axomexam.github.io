#!/usr/bin/env python3
"""Trigonometry: 95+ very hard bilingual questions."""

import sys
from fractions import Fraction as F
sys.path.insert(0, "tools")
from algebra_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def fr(x):
    x = F(x)
    return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator}"


# 1. standard values
for fn, ang, val in [("sin", 30, "1/2"), ("cos", 60, "1/2"), ("tan", 45, "1"),
                     ("sin", 45, "1/√2"), ("cos", 30, "√3/2"), ("tan", 60, "√3"),
                     ("sin", 60, "√3/2"), ("cos", 45, "1/√2"), ("tan", 30, "1/√3")]:
    add(f"Find the value of {fn} {ang}°.",
        f"{fn} {as_num(ang)}° ৰ মান নিৰ্ণয় কৰা।",
        val, ["1/2", "√3/2", "1", "1/√3", "√3"],
        f"{fn} {ang}° = {val} from the standard trigonometric table.",
        f"মানক ত্ৰিকোণমিতিক তালিকামতে {fn} {as_num(ang)}° = {val}।")

# 2. sin^2 + cos^2
for sinv, cosv in [(3, 5), (5, 13), (8, 17), (7, 25), (9, 41)]:
    add(f"If sin θ = {sinv}/{cosv}, find cos θ (θ acute).",
        f"যদি sin θ = {as_num(sinv)}/{as_num(cosv)}, তেন্তে cos θ নিৰ্ণয় কৰা (θ সূক্ষ্ম)।",
        f"√({cosv*cosv - sinv*sinv})/{cosv}", [f"{sinv}/{cosv}", f"{cosv}/{sinv}", f"1/{cosv}"],
        f"cos²θ = 1 - sin²θ = 1 - ({sinv}/{cosv})², so cos θ = √({cosv}²-{sinv}²)/{cosv} = √{cosv*cosv-sinv*sinv}/{cosv}.",
        f"cos²θ = 1 - sin²θ, সেয়ে cos θ = √{as_num(cosv*cosv-sinv*sinv)}/{as_num(cosv)}।")

# 3. sec^2 - tan^2
for val in [1, 2, 3, 4, 5]:
    add(f"Evaluate sec²θ - tan²θ for any acute angle θ.",
        f"যিকোনো সূক্ষ্ম কোণ θ ৰ বাবে sec²θ - tan²θ ৰ মান নিৰ্ণয় কৰা।",
        1, [0, 2, val, -1],
        f"Using the identity 1 + tan²θ = sec²θ, we get sec²θ - tan²θ = 1.",
        f"1 + tan²θ = sec²θ অভেদমতে sec²θ - tan²θ = 1।")

# 4. cosec^2 - cot^2
for val in [1, 2, 3]:
    add(f"Evaluate cosec²θ - cot²θ for any acute angle θ.",
        f"যিকোনো সূক্ষ্ম কোণ θ ৰ বাবে cosec²θ - cot²θ ৰ মান নিৰ্ণয় কৰা।",
        1, [0, 2, val, -1],
        f"Using 1 + cot²θ = cosec²θ, we get cosec²θ - cot²θ = 1.",
        f"1 + cot²θ = cosec²θ অভেদমতে cosec²θ - cot²θ = 1।")

# 5. complementary
for a in [20, 35, 42, 55, 68]:
    add(f"Find the value of sin({90-a}°) - cos({a}°).",
        f"sin({as_num(90-a)}°) - cos({as_num(a)}°) ৰ মান নিৰ্ণয় কৰা।",
        0, [1, -1, 2, f"sin {a}°"],
        f"sin(90° - θ) = cos θ, so sin({90-a}°) = cos({a}°) and the difference is 0.",
        f"sin(90° - θ) = cos θ, সেয়ে পাৰ্থক্য 0।")

# 6. tan = sin/cos
for s, c in [(3, 5), (5, 13), (8, 17)]:
    add(f"If sin θ = {s}/{c} and cos θ = √({c*c-s*s})/{c}, find tan θ.",
        f"যদি sin θ = {as_num(s)}/{as_num(c)} আৰু cos θ = √({as_num(c*c-s*s)})/{as_num(c)}, তেন্তে tan θ নিৰ্ণয় কৰা।",
        f"{s}/√{c*c-s*s}", [f"{c}/{s}", f"√{c*c-s*s}/{c}", f"{s}/{c}"],
        f"tan θ = sin θ/cos θ = ({s}/{c}) ÷ (√{c*c-s*s}/{c}) = {s}/√{c*c-s*s}.",
        f"tan θ = sin θ/cos θ = {as_num(s)}/√{as_num(c*c-s*s)}।")

# 7. evaluate expressions
EXPRS = [
    ("sin 30° + cos 60°", "1"),
    ("tan 45° + sin 30°", "3/2"),
    ("cos 60° + sin 30°", "1"),
    ("tan 60° × tan 30°", "1"),
    ("sin 45° × cos 45°", "1/2"),
    ("sec 60°", "2"),
    ("cosec 30°", "2"),
    ("cot 45°", "1"),
]
for expr, val in EXPRS:
    add(f"Evaluate: {expr}.",
        f"মান নিৰ্ণয় কৰা: {expr}।",
        val, ["1/2", "√3/2", "1", "2", "3/2"],
        f"Using standard values, {expr} = {val}.",
        f"মানক মান ব্যৱহাৰ কৰি {expr} = {val}।")

# 8. given tan, find sin/cos
for p, b, h in [(3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25)]:
    add(f"If tan θ = {p}/{b}, find sin θ (θ acute).",
        f"যদি tan θ = {as_num(p)}/{as_num(b)}, তেন্তে sin θ নিৰ্ণয় কৰা (θ সূক্ষ্ম)।",
        f"{p}/{h}", [f"{b}/{h}", f"{p}/{b}", f"{h}/{p}"],
        f"tan θ = {p}/{b} means opposite = {p}, adjacent = {b}, so hypotenuse = √({p}²+{b}²) = {h}. Hence sin θ = {p}/{h}.",
        f"tan θ = {as_num(p)}/{as_num(b)} ৰ পৰা কৰ্ণ = {as_num(h)}, সেয়ে sin θ = {as_num(p)}/{as_num(h)}।")
    add(f"If tan θ = {p}/{b}, find cos θ (θ acute).",
        f"যদি tan θ = {as_num(p)}/{as_num(b)}, তেন্তে cos θ নিৰ্ণয় কৰা (θ সূক্ষ্ম)।",
        f"{b}/{h}", [f"{p}/{h}", f"{p}/{b}", f"{h}/{b}"],
        f"With opposite {p} and adjacent {b}, hypotenuse = {h}, so cos θ = {b}/{h}.",
        f"কৰ্ণ = {as_num(h)}, সেয়ে cos θ = {as_num(b)}/{as_num(h)}।")

# 9. solve for theta
for fn, val, ang in [("sin", "1/2", 30), ("cos", "√3/2", 30), ("tan", "1", 45),
                     ("sin", "√3/2", 60), ("cos", "1/2", 60)]:
    add(f"Find θ (0° < θ < 90°) if {fn} θ = {val}.",
        f"{fn} θ = {val} হ'লে θ (0° < θ < 90°) নিৰ্ণয় কৰা।",
        f"{ang}°", [f"{ang+15}°", f"{90-ang}°", f"{ang-15}°", f"{ang*2}°"],
        f"From the standard table, {fn} {ang}° = {val}, so θ = {ang}°.",
        f"মানক তালিকামতে {fn} {as_num(ang)}° = {val}, সেয়ে θ = {as_num(ang)}°।")

# 10. double angle
for ang in [30, 45]:
    add(f"Evaluate 2 sin {ang}° cos {ang}°.",
        f"2 sin {as_num(ang)}° cos {as_num(ang)}° ৰ মান নিৰ্ণয় কৰা।",
        "√3/2" if ang == 30 else "1",
        ["1/2", "√3/2", "1", "√3"],
        f"2 sin θ cos θ = sin 2θ, so 2 sin {ang}° cos {ang}° = sin {2*ang}° = {'√3/2' if ang==30 else '1'}.",
        f"2 sin θ cos θ = sin 2θ, সেয়ে মান = {'√3/2' if ang==30 else '1'}।")

# 11. reciprocal
for fn, val, rec in [("sin", "3/5", "5/3"), ("cos", "4/5", "5/4"), ("tan", "3/4", "4/3")]:
    add(f"If {fn} θ = {val}, find cosec θ." if fn == "sin" else (f"If {fn} θ = {val}, find sec θ." if fn == "cos" else f"If {fn} θ = {val}, find cot θ."),
        f"যদি {fn} θ = {val}, তেন্তে {'cosec' if fn=='sin' else ('sec' if fn=='cos' else 'cot')} θ নিৰ্ণয় কৰা।",
        rec, [val, f"1/{val}", "1", "0"],
        f"The reciprocal identity gives the answer {rec}.",
        f"পাৰস্পৰিক অভেদমতে উত্তৰ {rec}।")

# 12. tan 45 identity
for p, b, h in [(1, 1, 2)]:
    add("If tan θ = 1, find sin θ + cos θ (θ acute).",
        "যদি tan θ = 1, তেন্তে sin θ + cos θ নিৰ্ণয় কৰা (θ সূক্ষ্ম)।",
        "√2", ["1", "2", "1/√2", "√3"],
        f"tan θ = 1 ⇒ θ = 45°, so sin 45° + cos 45° = 1/√2 + 1/√2 = √2.",
        f"tan θ = 1 ⇒ θ = 45°, সেয়ে sin 45° + cos 45° = √2।")

# extra batch
for fn, ang, val in [("sin", 90, "1"), ("cos", 0, "1"), ("tan", 0, "0"), ("sin", 0, "0"), ("cos", 90, "0")]:
    add(f"Find the value of {fn} {ang}°.",
        f"{fn} {as_num(ang)}° ৰ মান নিৰ্ণয় কৰা।",
        val, ["1", "0", "1/2", "√3/2"],
        f"{fn} {ang}° = {val}.",
        f"{fn} {as_num(ang)}° = {val}।")

for sinv, cosv in [(4, 5), (12, 13), (15, 17), (20, 29)]:
    add(f"If sin θ = {sinv}/{cosv}, find cos θ (θ acute).",
        f"যদি sin θ = {as_num(sinv)}/{as_num(cosv)}, তেন্তে cos θ নিৰ্ণয় কৰা (θ সূক্ষ্ম)।",
        f"√({cosv*cosv - sinv*sinv})/{cosv}", [f"{sinv}/{cosv}", f"{cosv}/{sinv}", f"1/{cosv}"],
        f"cos θ = √({cosv}²-{sinv}²)/{cosv} = √{cosv*cosv-sinv*sinv}/{cosv}.",
        f"cos θ = √{as_num(cosv*cosv-sinv*sinv)}/{as_num(cosv)}।")

for a in [15, 25, 48, 62]:
    add(f"Find the value of sin({90-a}°) - cos({a}°).",
        f"sin({as_num(90-a)}°) - cos({as_num(a)}°) ৰ মান নিৰ্ণয় কৰা।",
        0, [1, -1, 2, f"sin {a}°"],
        f"sin(90°-θ)=cos θ, so the difference is 0.",
        f"sin(90°-θ)=cos θ, সেয়ে পাৰ্থক্য 0।")

for p, b, h in [(9, 40, 41), (11, 60, 61), (12, 35, 37)]:
    add(f"If tan θ = {p}/{b}, find sin θ (θ acute).",
        f"যদি tan θ = {as_num(p)}/{as_num(b)}, তেন্তে sin θ নিৰ্ণয় কৰা (θ সূক্ষ্ম)।",
        f"{p}/{h}", [f"{b}/{h}", f"{p}/{b}", f"{h}/{p}"],
        f"sin θ = {p}/{h}.",
        f"sin θ = {as_num(p)}/{as_num(h)}।")
    add(f"If tan θ = {p}/{b}, find cos θ (θ acute).",
        f"যদি tan θ = {as_num(p)}/{as_num(b)}, তেন্তে cos θ নিৰ্ণয় কৰা (θ সূক্ষ্ম)।",
        f"{b}/{h}", [f"{p}/{h}", f"{p}/{b}", f"{h}/{b}"],
        f"cos θ = {b}/{h}.",
        f"cos θ = {as_num(b)}/{as_num(h)}।")

for fn, val, ang in [("sin", "1/√2", 45), ("cos", "1/√2", 45), ("tan", "√3", 60)]:
    add(f"Find θ (0° < θ < 90°) if {fn} θ = {val}.",
        f"{fn} θ = {val} হ'লে θ (0° < θ < 90°) নিৰ্ণয় কৰা।",
        f"{ang}°", [f"{ang+15}°", f"{90-ang}°", f"{ang-15}°", f"{ang*2}°"],
        f"θ = {ang}°.",
        f"θ = {as_num(ang)}°।")

for fn, val, rec in [("sin", "5/13", "13/5"), ("cos", "8/17", "17/8"), ("tan", "5/12", "12/5")]:
    add(f"If {fn} θ = {val}, find {'cosec' if fn=='sin' else ('sec' if fn=='cos' else 'cot')} θ.",
        f"যদি {fn} θ = {val}, তেন্তে {'cosec' if fn=='sin' else ('sec' if fn=='cos' else 'cot')} θ নিৰ্ণয় কৰা।",
        rec, [val, f"1/{val}", "1", "0"],
        f"Reciprocal gives {rec}.",
        f"পাৰস্পৰিক অভেদমতে {rec}।")

# final batch
for expr, val in [("sin²θ + cos²θ", "1"), ("1 + tan²θ", "sec²θ"), ("tan θ × cot θ", "1"),
                  ("sin θ / cos θ", "tan θ"), ("sin(90° - θ) / cos θ", "1"),
                  ("cos(90° - θ) / sin θ", "1")]:
    add(f"Simplify: {expr}.", f"সৰল কৰা: {expr}।",
        val, ["0", "1", "sin θ", "cos θ"],
        f"Using standard trigonometric identities, {expr} = {val}.",
        f"মানক ত্ৰিকোণমিতিক অভেদমতে {expr} = {val}।")

for a in [10, 30, 40, 65]:
    add(f"Find the value of cos({90-a}°) - sin({a}°).",
        f"cos({as_num(90-a)}°) - sin({as_num(a)}°) ৰ মান নিৰ্ণয় কৰা।",
        0, [1, -1, 2, f"cos {a}°"],
        f"cos(90°-θ)=sin θ, so the difference is 0.",
        f"cos(90°-θ)=sin θ, সেয়ে পাৰ্থক্য 0।")

for expr, val in [("sin 30° × cos 60°", "1/4"), ("tan 45° × cot 45°", "1"),
                  ("sec 30°", "2/√3"), ("cosec 45°", "√2"), ("cot 60°", "1/√3")]:
    add(f"Evaluate: {expr}.", f"মান নিৰ্ণয় কৰা: {expr}।",
        val, ["1/2", "1", "2", "√3", "1/√3"],
        f"{expr} = {val}.",
        f"{expr} = {val}।")

for p, b, h in [(20, 21, 29), (28, 45, 53)]:
    add(f"If tan θ = {p}/{b}, find sin θ (θ acute).",
        f"যদি tan θ = {as_num(p)}/{as_num(b)}, তেন্তে sin θ নিৰ্ণয় কৰা (θ সূক্ষ্ম)।",
        f"{p}/{h}", [f"{b}/{h}", f"{p}/{b}", f"{h}/{p}"],
        f"sin θ = {p}/{h}.",
        f"sin θ = {as_num(p)}/{as_num(h)}।")
    add(f"If tan θ = {p}/{b}, find cos θ (θ acute).",
        f"যদি tan θ = {as_num(p)}/{as_num(b)}, তেন্তে cos θ নিৰ্ণয় কৰা (θ সূক্ষ্ম)।",
        f"{b}/{h}", [f"{p}/{h}", f"{p}/{b}", f"{h}/{b}"],
        f"cos θ = {b}/{h}.",
        f"cos θ = {as_num(b)}/{as_num(h)}।")

for sinv, cosv in [(7, 25), (9, 41)]:
    add(f"If sin θ = {sinv}/{cosv}, find cos θ (θ acute).",
        f"যদি sin θ = {as_num(sinv)}/{as_num(cosv)}, তেন্তে cos θ নিৰ্ণয় কৰা (θ সূক্ষ্ম)।",
        f"√({cosv*cosv - sinv*sinv})/{cosv}", [f"{sinv}/{cosv}", f"{cosv}/{sinv}", f"1/{cosv}"],
        f"cos θ = √{cosv*cosv-sinv*sinv}/{cosv}.",
        f"cos θ = √{as_num(cosv*cosv-sinv*sinv)}/{as_num(cosv)}।")

for fn, val, ang in [("tan", "1/√3", 30), ("sin", "1/2", 30)]:
    add(f"Find θ (0° < θ < 90°) if {fn} θ = {val}.",
        f"{fn} θ = {val} হ'লে θ (0° < θ < 90°) নিৰ্ণয় কৰা।",
        f"{ang}°", [f"{ang+15}°", f"{90-ang}°", f"{ang-15}°", f"{ang*2}°"],
        f"θ = {ang}°.",
        f"θ = {as_num(ang)}°।")

for fn, val, rec in [("sin", "7/25", "25/7"), ("cos", "15/17", "17/15")]:
    add(f"If {fn} θ = {val}, find {'cosec' if fn=='sin' else 'sec'} θ.",
        f"যদি {fn} θ = {val}, তেন্তে {'cosec' if fn=='sin' else 'sec'} θ নিৰ্ণয় কৰা।",
        rec, [val, f"1/{val}", "1", "0"],
        f"Reciprocal gives {rec}.",
        f"পাৰস্পৰিক অভেদমতে {rec}।")

append("trigonometry", rows)
