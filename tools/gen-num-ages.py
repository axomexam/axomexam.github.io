#!/usr/bin/env python3
"""Problems on Ages: 95+ hard bilingual questions."""

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


# 1. ratio and sum
for a, b, S in [(3, 2, 50), (5, 3, 64), (7, 4, 66), (9, 5, 70), (11, 7, 90), (4, 3, 63)]:
    x = S * a // (a + b)
    y = S - x
    add(f"The present ages of A and B are in the ratio {a} : {b}. If the sum of their ages is {S} years, find A's age.",
        f"A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত {as_num(a)} : {as_num(b)}। তেওঁলোকৰ বয়সৰ যোগফল {as_num(S)} বছৰ হ'লে A ৰ বয়স নিৰ্ণয় কৰা।",
        x, [y, x + 1, x - 1, S],
        f"Let the ages be {a}x and {b}x. Then {a}x + {b}x = {S}, so x = {S//(a+b)} and A's age = {a}×{S//(a+b)} = {x} years.",
        f"বয়স {as_num(a)}x আৰু {as_num(b)}x ধৰিলে x = {as_num(S//(a+b))}, সেয়ে A ৰ বয়স {as_num(x)} বছৰ।")

# 2. age after years
for age, k in [(25, 7), (32, 5), (18, 12), (40, 15), (28, 6)]:
    add(f"A person is {age} years old. What will be his age after {k} years?",
        f"এজন মানুহৰ বয়স {as_num(age)} বছৰ। {as_num(k)} বছৰৰ পিছত তেওঁৰ বয়স কিমান হ'ব?",
        age + k, [age - k, age, k, age + 2 * k],
        f"Age after {k} years = {age} + {k} = {age+k} years.",
        f"{as_num(k)} বছৰৰ পিছত বয়স = {as_num(age+k)} বছৰ।")

# 3. ratio change
for a, b, k, c, d in [(3, 4, 6, 5, 6), (2, 3, 4, 5, 7), (4, 5, 5, 5, 6), (5, 7, 6, 7, 9)]:
    x = k * (c - d) // (a * d - b * c)
    add(f"The present ages of A and B are in the ratio {a} : {b}. After {k} years, the ratio becomes {c} : {d}. Find A's present age.",
        f"A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত {as_num(a)} : {as_num(b)}। {as_num(k)} বছৰৰ পিছত অনুপাত {as_num(c)} : {as_num(d)} হয়। A ৰ বৰ্তমান বয়স নিৰ্ণয় কৰা।",
        a * x, [b * x, a * x + k, b * x + k],
        f"Let ages be {a}x and {b}x. Then ({a}x+{k})/({b}x+{k}) = {c}/{d}, giving x = {x}. A's age = {a*x} years.",
        f"{as_num(a)}x আৰু {as_num(b)}x ধৰিলে x = {as_num(x)}, সেয়ে A ৰ বয়স {as_num(a*x)} বছৰ।")

# 4. father-son
for F_age, S_age in [(45, 15), (50, 20), (42, 12), (55, 25), (48, 18)]:
    add(f"A father is {F_age} years old and his son is {S_age} years old. After how many years will the father be twice as old as his son?",
        f"এজন পিতাৰ বয়স {as_num(F_age)} বছৰ আৰু পুত্ৰৰ {as_num(S_age)} বছৰ। কিমান বছৰৰ পিছত পিতাৰ বয়স পুত্ৰৰ দুগুণ হ'ব?",
        F_age - 2 * S_age, [F_age - S_age, abs(F_age - 2 * S_age) + 1, F_age // 2, S_age],
        f"Let it happen after x years: {F_age}+x = 2({S_age}+x). Solving gives x = {F_age-2*S_age} years.",
        f"{as_num(F_age)}+x = ২({as_num(S_age)}+x) সমাধান কৰিলে x = {as_num(F_age-2*S_age)} বছৰ।")

# 5. sum and difference
for S, D in [(60, 10), (48, 12), (72, 8), (90, 20), (54, 6)]:
    add(f"The sum of the ages of A and B is {S} years and their difference is {D} years. Find the age of the elder person.",
        f"A আৰু B ৰ বয়সৰ যোগফল {as_num(S)} বছৰ আৰু পাৰ্থক্য {as_num(D)} বছৰ। ডাঙৰজনৰ বয়স নিৰ্ণয় কৰা।",
        (S + D) // 2, [(S - D) // 2, S, D, S // 2],
        f"Elder age = (sum + difference)/2 = ({S}+{D})/2 = {(S+D)//2} years.",
        f"ডাঙৰজনৰ বয়স = ({as_num(S)}+{as_num(D)})/২ = {as_num((S+D)//2)} বছৰ।")

# 6. father n times now, m times later
for n, m, k in [(4, 3, 6), (3, 2, 12), (4, 2, 10), (5, 3, 10)]:
    s_age = k * (m - 1) // (n - m)
    f_age = n * s_age
    add(f"A father is {n} times as old as his son. After {k} years, he will be {m} times as old as his son. Find the son's present age.",
        f"এজন পিতাৰ বয়স পুত্ৰৰ {as_num(n)} গুণ। {as_num(k)} বছৰৰ পিছত তেওঁ পুত্ৰৰ {as_num(m)} গুণ হ'ব। পুত্ৰৰ বৰ্তমান বয়স নিৰ্ণয় কৰা।",
        s_age, [f_age, s_age + k, f_age + k, s_age * 2],
        f"Let son's age be x. Then {n}x + {k} = {m}(x + {k}), so x = {s_age}. Son is {s_age} years old and father is {f_age}.",
        f"পুত্ৰৰ বয়স x ধৰিলে {as_num(n)}x + {as_num(k)} = {as_num(m)}(x + {as_num(k)}), সেয়ে x = {as_num(s_age)}।")

# 7. average age of family
for members, total in [(4, 120), (5, 175), (6, 216), (3, 96)]:
    v = total / members
    add(f"The total age of {members} members of a family is {total} years. Find their average age.",
        f"এটা পৰিয়ালৰ {as_num(members)} জন সদস্যৰ মুঠ বয়স {as_num(total)} বছৰ। তেওঁলোকৰ গড় বয়স নিৰ্ণয় কৰা।",
        r2(v), [r2(v * 2), r2(v / 2), total, members],
        f"Average age = total age / number of members = {total}/{members} = {r2(v)} years.",
        f"গড় বয়স = {as_num(total)}/{as_num(members)} = {as_num(r2(v))} বছৰ।")

# 8. ratio and difference
for a, b, D in [(5, 3, 10), (7, 4, 12), (9, 5, 16), (11, 6, 20)]:
    x = D * a // (b - a)
    add(f"The ages of A and B are in the ratio {a} : {b}. If the difference of their ages is {D} years, find A's age.",
        f"A আৰু B ৰ বয়সৰ অনুপাত {as_num(a)} : {as_num(b)}। বয়সৰ পাৰ্থক্য {as_num(D)} বছৰ হ'লে A ৰ বয়স নিৰ্ণয় কৰা।",
        x, [x + D, x - D, D, x * 2],
        f"Let ages be {a}x and {b}x. Then {b}x - {a}x = {D}, so x = {D//(b-a)} and A's age = {a}×{D//(b-a)} = {x} years.",
        f"{as_num(a)}x আৰু {as_num(b)}x ধৰিলে x = {as_num(D//(b-a))}, সেয়ে A ৰ বয়স {as_num(x)} বছৰ।")

# 9. ratio after k (B's age)
for a, b, k, c, d in [(3, 4, 6, 5, 6), (2, 3, 4, 5, 7), (4, 5, 5, 5, 6)]:
    x = k * (c - d) // (a * d - b * c)
    add(f"The present ages of A and B are in the ratio {a} : {b}. After {k} years, the ratio becomes {c} : {d}. Find B's present age.",
        f"A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত {as_num(a)} : {as_num(b)}। {as_num(k)} বছৰৰ পিছত অনুপাত {as_num(c)} : {as_num(d)} হয়। B ৰ বৰ্তমান বয়স নিৰ্ণয় কৰা।",
        b * x, [a * x, b * x + k, a * x + k],
        f"Solving gives x = {x}, so B's age = {b}×{x} = {b*x} years.",
        f"x = {as_num(x)}, সেয়ে B ৰ বয়স {as_num(b*x)} বছৰ।")

# 10. n years ago m times
for n, m, now_ratio in [(5, 3, 2), (8, 4, 3), (10, 5, 2), (6, 4, 3)]:
    # x - n = m(y - n), x = now_ratio * y
    # (now_ratio - m)y = n(1 - m) => y = n(m-1)/(m-now_ratio)
    if m == now_ratio:
        continue
    y = n * (m - 1) // (m - now_ratio)
    x = now_ratio * y
    add(f"{n} years ago, a father was {m} times as old as his son. At present the father is {now_ratio} times as old as his son. Find the son's present age.",
        f"{as_num(n)} বছৰ পূৰ্বে এজন পিতাৰ বয়স পুত্ৰৰ {as_num(m)} গুণ আছিল। বৰ্তমান পিতাৰ বয়স পুত্ৰৰ {as_num(now_ratio)} গুণ। পুত্ৰৰ বৰ্তমান বয়স নিৰ্ণয় কৰা।",
        y, [x, y + n, x + n, y * 2],
        f"Let son's present age be y. Then {now_ratio}y - {n} = {m}(y - {n}), so y = {y}. Father is {x}.",
        f"পুত্ৰৰ বয়স y ধৰিলে {as_num(now_ratio)}y - {as_num(n)} = {as_num(m)}(y - {as_num(n)}), সেয়ে y = {as_num(y)}।")

# extra batch
for a, b, S in [(2, 3, 55), (3, 5, 72), (6, 5, 77), (8, 3, 55), (9, 7, 96), (5, 4, 81)]:
    x = S * a // (a + b)
    y = S - x
    add(f"The present ages of A and B are in the ratio {a} : {b}. If the sum of their ages is {S} years, find A's age.",
        f"A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত {as_num(a)} : {as_num(b)}। বয়সৰ যোগফল {as_num(S)} বছৰ হ'লে A ৰ বয়স নিৰ্ণয় কৰা।",
        x, [y, x + 1, x - 1, S],
        f"A's age = {a}×{S//(a+b)} = {x} years.",
        f"A ৰ বয়স = {as_num(x)} বছৰ।")

for age, k in [(21, 9), (36, 4), (45, 8), (30, 14), (24, 11)]:
    add(f"A person is {age} years old. What will be his age after {k} years?",
        f"এজন মানুহৰ বয়স {as_num(age)} বছৰ। {as_num(k)} বছৰৰ পিছত তেওঁৰ বয়স কিমান হ'ব?",
        age + k, [age - k, age, k, age + 2 * k],
        f"Age after {k} years = {age+k} years.",
        f"{as_num(k)} বছৰৰ পিছত বয়স = {as_num(age+k)} বছৰ।")

for a, b, k, c, d in [(7, 9, 8, 9, 11), (5, 6, 10, 7, 8), (3, 5, 12, 5, 7)]:
    x = k * (c - d) // (a * d - b * c)
    add(f"The present ages of A and B are in the ratio {a} : {b}. After {k} years, the ratio becomes {c} : {d}. Find A's present age.",
        f"A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত {as_num(a)} : {as_num(b)}। {as_num(k)} বছৰৰ পিছত অনুপাত {as_num(c)} : {as_num(d)} হয়। A ৰ বৰ্তমান বয়স নিৰ্ণয় কৰা।",
        a * x, [b * x, a * x + k, b * x + k],
        f"x = {x}; A's age = {a*x} years.",
        f"x = {as_num(x)}; A ৰ বয়স {as_num(a*x)} বছৰ।")

for F_age, S_age in [(60, 20), (36, 9), (40, 10), (54, 18), (32, 8)]:
    add(f"A father is {F_age} years old and his son is {S_age} years old. After how many years will the father be twice as old as his son?",
        f"এজন পিতাৰ বয়স {as_num(F_age)} বছৰ আৰু পুত্ৰৰ {as_num(S_age)} বছৰ। কিমান বছৰৰ পিছত পিতাৰ বয়স পুত্ৰৰ দুগুণ হ'ব?",
        F_age - 2 * S_age, [F_age - S_age, abs(F_age - 2 * S_age) + 1, F_age // 2, S_age],
        f"Solving {F_age}+x = 2({S_age}+x) gives x = {F_age-2*S_age} years.",
        f"x = {as_num(F_age-2*S_age)} বছৰ।")

for S, D in [(80, 16), (100, 12), (66, 14), (58, 10), (94, 18)]:
    add(f"The sum of the ages of A and B is {S} years and their difference is {D} years. Find the age of the elder person.",
        f"A আৰু B ৰ বয়সৰ যোগফল {as_num(S)} বছৰ আৰু পাৰ্থক্য {as_num(D)} বছৰ। ডাঙৰজনৰ বয়স নিৰ্ণয় কৰা।",
        (S + D) // 2, [(S - D) // 2, S, D, S // 2],
        f"Elder age = ({S}+{D})/2 = {(S+D)//2} years.",
        f"ডাঙৰজনৰ বয়স = {as_num((S+D)//2)} বছৰ।")

for n, m, k in [(5, 4, 10), (6, 4, 12), (3, 2, 15), (7, 5, 10)]:
    s_age = k * (m - 1) // (n - m)
    f_age = n * s_age
    add(f"A father is {n} times as old as his son. After {k} years, he will be {m} times as old as his son. Find the son's present age.",
        f"এজন পিতাৰ বয়স পুত্ৰৰ {as_num(n)} গুণ। {as_num(k)} বছৰৰ পিছত তেওঁ পুত্ৰৰ {as_num(m)} গুণ হ'ব। পুত্ৰৰ বৰ্তমান বয়স নিৰ্ণয় কৰা।",
        s_age, [f_age, s_age + k, f_age + k, s_age * 2],
        f"Son's age = {s_age} years.",
        f"পুত্ৰৰ বয়স = {as_num(s_age)} বছৰ।")

for members, total in [(7, 245), (8, 320), (4, 112), (10, 380)]:
    v = total / members
    add(f"The total age of {members} members of a family is {total} years. Find their average age.",
        f"এটা পৰিয়ালৰ {as_num(members)} জন সদস্যৰ মুঠ বয়স {as_num(total)} বছৰ। তেওঁলোকৰ গড় বয়স নিৰ্ণয় কৰা।",
        r2(v), [r2(v * 2), r2(v / 2), total, members],
        f"Average = {total}/{members} = {r2(v)} years.",
        f"গড় = {as_num(r2(v))} বছৰ।")

for a, b, D in [(6, 4, 12), (8, 5, 15), (10, 7, 18), (12, 7, 25)]:
    x = D * a // (b - a)
    add(f"The ages of A and B are in the ratio {a} : {b}. If the difference of their ages is {D} years, find A's age.",
        f"A আৰু B ৰ বয়সৰ অনুপাত {as_num(a)} : {as_num(b)}। বয়সৰ পাৰ্থক্য {as_num(D)} বছৰ হ'লে A ৰ বয়স নিৰ্ণয় কৰা।",
        x, [x + D, x - D, D, x * 2],
        f"A's age = {a}×{D//(b-a)} = {x} years.",
        f"A ৰ বয়স = {as_num(x)} বছৰ।")

# final batch
for a, b, S in [(7, 3, 60), (5, 2, 63), (9, 4, 78)]:
    x = S * a // (a + b)
    add(f"The present ages of A and B are in the ratio {a} : {b}. If the sum of their ages is {S} years, find A's age.",
        f"A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত {as_num(a)} : {as_num(b)}। বয়সৰ যোগফল {as_num(S)} বছৰ হ'লে A ৰ বয়স নিৰ্ণয় কৰা।",
        x, [S - x, x + 1, x - 1, S],
        f"A's age = {x} years.",
        f"A ৰ বয়স = {as_num(x)} বছৰ।")

for age, k in [(27, 8), (33, 7), (41, 9)]:
    add(f"A person is {age} years old. What will be his age after {k} years?",
        f"এজন মানুহৰ বয়স {as_num(age)} বছৰ। {as_num(k)} বছৰৰ পিছত তেওঁৰ বয়স কিমান হ'ব?",
        age + k, [age - k, age, k, age + 2 * k],
        f"Age after {k} years = {age+k} years.",
        f"{as_num(k)} বছৰৰ পিছত বয়স = {as_num(age+k)} বছৰ।")

for a, b, k, c, d in [(2, 3, 5, 3, 4), (3, 5, 10, 5, 7), (4, 7, 6, 6, 9), (5, 8, 6, 7, 10)]:
    x = k * (c - d) // (a * d - b * c)
    add(f"The present ages of A and B are in the ratio {a} : {b}. After {k} years, the ratio becomes {c} : {d}. Find A's present age.",
        f"A আৰু B ৰ বৰ্তমান বয়সৰ অনুপাত {as_num(a)} : {as_num(b)}। {as_num(k)} বছৰৰ পিছত অনুপাত {as_num(c)} : {as_num(d)} হয়। A ৰ বৰ্তমান বয়স নিৰ্ণয় কৰা।",
        a * x, [b * x, a * x + k, b * x + k],
        f"x = {x}; A's age = {a*x} years.",
        f"x = {as_num(x)}; A ৰ বয়স {as_num(a*x)} বছৰ।")

for F_age, S_age in [(28, 7), (44, 11), (30, 6)]:
    add(f"A father is {F_age} years old and his son is {S_age} years old. After how many years will the father be twice as old as his son?",
        f"এজন পিতাৰ বয়স {as_num(F_age)} বছৰ আৰু পুত্ৰৰ {as_num(S_age)} বছৰ। কিমান বছৰৰ পিছত পিতাৰ বয়স পুত্ৰৰ দুগুণ হ'ব?",
        F_age - 2 * S_age, [F_age - S_age, abs(F_age - 2 * S_age) + 1, F_age // 2, S_age],
        f"x = {F_age-2*S_age} years.",
        f"x = {as_num(F_age-2*S_age)} বছৰ।")

for S, D in [(70, 10), (84, 14), (92, 8)]:
    add(f"The sum of the ages of A and B is {S} years and their difference is {D} years. Find the age of the elder person.",
        f"A আৰু B ৰ বয়সৰ যোগফল {as_num(S)} বছৰ আৰু পাৰ্থক্য {as_num(D)} বছৰ। ডাঙৰজনৰ বয়স নিৰ্ণয় কৰা।",
        (S + D) // 2, [(S - D) // 2, S, D, S // 2],
        f"Elder age = {(S+D)//2} years.",
        f"ডাঙৰজনৰ বয়স = {as_num((S+D)//2)} বছৰ।")

for n, m, k in [(4, 3, 9), (3, 2, 20), (4, 2, 6), (5, 2, 6)]:
    s_age = k * (m - 1) // (n - m)
    f_age = n * s_age
    add(f"A father is {n} times as old as his son. After {k} years, he will be {m} times as old as his son. Find the son's present age.",
        f"এজন পিতাৰ বয়স পুত্ৰৰ {as_num(n)} গুণ। {as_num(k)} বছৰৰ পিছত তেওঁ পুত্ৰৰ {as_num(m)} গুণ হ'ব। পুত্ৰৰ বৰ্তমান বয়স নিৰ্ণয় কৰা।",
        s_age, [f_age, s_age + k, f_age + k, s_age * 2],
        f"Son's age = {s_age} years.",
        f"পুত্ৰৰ বয়স = {as_num(s_age)} বছৰ।")

append("problems-on-ages", rows)
