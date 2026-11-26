#!/usr/bin/env python3
"""Input-Output: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def steps_asc(nums):
    arr = list(nums)
    out = [list(arr)]
    for i in range(len(arr)):
        j = min(range(i, len(arr)), key=lambda k: arr[k])
        arr[i], arr[j] = arr[j], arr[i]
        out.append(list(arr))
    return out


def steps_desc(nums):
    arr = list(nums)
    out = [list(arr)]
    for i in range(len(arr)):
        j = max(range(i, len(arr)), key=lambda k: arr[k])
        arr[i], arr[j] = arr[j], arr[i]
        out.append(list(arr))
    return out


def pick3(correct, cands):
    out = []
    for c in cands:
        if c != correct and c not in out:
            out.append(c)
        if len(out) == 3:
            break
    if len(out) < 3:
        parts = correct.split(" ")
        for i in range(len(parts) - 1):
            v = parts[:]
            v[i], v[i + 1] = v[i + 1], v[i]
            cand = " ".join(v)
            if cand != correct and cand not in out:
                out.append(cand)
            if len(out) == 3:
                break
    return out


def fmt(seq):
    return " ".join(map(str, seq))


INPUTS = [
    [45, 12, 67, 23, 89],
    [34, 78, 12, 56, 90],
    [25, 63, 18, 47, 82],
    [51, 29, 74, 16, 38],
    [68, 24, 55, 11, 93],
    [40, 85, 17, 62, 31],
    [19, 72, 46, 88, 27],
    [57, 33, 91, 14, 65],
]

for nums in INPUTS:
    st = steps_asc(nums)
    for k in (2, 3):
        add(f"A number-arrangement machine rearranges the input in ascending order, one number per step. Input: {fmt(nums)}. What is Step {k}?",
            f"সংখ্যা সজোৱা যন্ত্ৰই ইনপুটটো একোটা সংখ্যা কৰি ঊৰ্ধ্বক্ৰমত সজায়। ইনপুট: {fmt(nums)}। ধাপ {as_num(k)} কি?",
            fmt(st[k]), pick3(fmt(st[k]), [fmt(st[k + 1]), fmt(st[k - 1]), fmt(st[k + 2]), fmt(nums), fmt(sorted(nums, reverse=True))]),
            f"Step {k} has the {k} smallest numbers fixed at the left: {fmt(st[k])}.",
            f"ধাপ {as_num(k)} ত সৰু {as_num(k)} টা সংখ্যা বাওঁফালে স্থিৰ হয়: {fmt(st[k])}।")

for nums in INPUTS[:5]:
    st = steps_desc(nums)
    add(f"A number-arrangement machine rearranges the input in descending order, one number per step. Input: {fmt(nums)}. What is Step 2?",
        f"সংখ্যা সজোৱা যন্ত্ৰই ইনপুটটো একোটা সংখ্যা কৰি অধঃক্ৰমত সজায়। ইনপুট: {fmt(nums)}। ধাপ ২ কি?",
        fmt(st[2]), pick3(fmt(st[2]), [fmt(st[1]), fmt(st[3]), fmt(st[4]), fmt(nums), fmt(sorted(nums))]),
        f"Step 2 has the two largest numbers fixed at the left: {fmt(st[2])}.",
        f"ধাপ ২ ত ডাঙৰ দুটা সংখ্যা বাওঁফালে স্থিৰ হয়: {fmt(st[2])}।")

for nums in INPUTS[:4]:
    add(f"A number-arrangement machine rearranges the input in ascending order, one number per step. Input: {fmt(nums)}. In how many steps will the arrangement be complete?",
        f"সংখ্যা সজোৱা যন্ত্ৰই ইনপুটটো একোটা সংখ্যা কৰি ঊৰ্ধ্বক্ৰমত সজায়। ইনপুট: {fmt(nums)}। কিমান ধাপত সজোৱা সম্পূৰ্ণ হ'ব?",
        len(nums) - 1, [len(nums), len(nums) + 1, len(nums) - 2],
        f"With {len(nums)} numbers, the arrangement is complete after {len(nums)-1} steps.",
        f"{as_num(len(nums))} টা সংখ্যাৰ বাবে {as_num(len(nums)-1)} ধাপত সম্পূৰ্ণ হয়।")

WORDS = [
    ["apple", "mango", "banana", "grape", "cherry"],
    ["rose", "lily", "lotus", "daisy", "tulip"],
    ["pen", "book", "bag", "copy", "scale"],
    ["red", "blue", "green", "black", "white"],
]

for ws in WORDS:
    arr = list(ws)
    st = [list(arr)]
    for i in range(len(arr)):
        j = min(range(i, len(arr)), key=lambda k: arr[k])
        arr[i], arr[j] = arr[j], arr[i]
        st.append(list(arr))
    for k in (2, 3):
        add(f"A word-arrangement machine arranges words in alphabetical order, one word per step. Input: {', '.join(ws)}. What is Step {k}?",
            f"শব্দ সজোৱা যন্ত্ৰই শব্দবোৰ বৰ্ণানুক্ৰমে একোটা কৰি সজায়। ইনপুট: {', '.join(ws)}। ধাপ {as_num(k)} কি?",
            ", ".join(st[k]), pick3(", ".join(st[k]), [", ".join(st[k + 1]), ", ".join(st[k - 1]), ", ".join(st[k + 2]), ", ".join(ws), ", ".join(sorted(ws))]),
            f"Step {k}: {', '.join(st[k])}.",
            f"ধাপ {as_num(k)}: {', '.join(st[k])}।")

# final batch
MORE = [
    [22, 58, 14, 76, 41], [63, 27, 85, 39, 12], [48, 19, 66, 32, 74],
    [36, 81, 24, 59, 15], [71, 44, 28, 63, 17], [53, 16, 87, 42, 69],
    [29, 64, 38, 91, 55], [82, 47, 13, 68, 34],
]
for nums in MORE:
    st = steps_asc(nums)
    for k in (2, 3):
        add(f"A number-arrangement machine rearranges the input in ascending order, one number per step. Input: {fmt(nums)}. What is Step {k}?",
            f"সংখ্যা সজোৱা যন্ত্ৰই ইনপুটটো একোটা সংখ্যা কৰি ঊৰ্ধ্বক্ৰমত সজায়। ইনপুট: {fmt(nums)}। ধাপ {as_num(k)} কি?",
            fmt(st[k]), pick3(fmt(st[k]), [fmt(st[k + 1]), fmt(st[k - 1]), fmt(st[k + 2]), fmt(nums), fmt(sorted(nums, reverse=True))]),
            f"Step {k}: {fmt(st[k])}.",
            f"ধাপ {as_num(k)}: {fmt(st[k])}।")
    add(f"A number-arrangement machine rearranges the input in ascending order, one number per step. Input: {fmt(nums)}. What is Step 1?",
        f"সংখ্যা সজোৱা যন্ত্ৰই ইনপুটটো একোটা সংখ্যা কৰি ঊৰ্ধ্বক্ৰমত সজায়। ইনপুট: {fmt(nums)}। ধাপ ১ কি?",
        fmt(st[1]), pick3(fmt(st[1]), [fmt(st[2]), fmt(st[0]), fmt(st[3]), fmt(nums), fmt(sorted(nums, reverse=True))]),
        f"The smallest number moves to the first place: {fmt(st[1])}.",
        f"সৰু সংখ্যাটো প্ৰথম স্থানলৈ যায়: {fmt(st[1])}।")
    add(f"A number-arrangement machine rearranges the input in ascending order, one number per step. Input: {fmt(nums)}. What is the final step?",
        f"সংখ্যা সজোৱা যন্ত্ৰই ইনপুটটো একোটা সংখ্যা কৰি ঊৰ্ধ্বক্ৰমত সজায়। ইনপুট: {fmt(nums)}। অন্তিম ধাপ কি?",
        fmt(sorted(nums)), pick3(fmt(sorted(nums)), [fmt(sorted(nums, reverse=True)), fmt(st[1]), fmt(st[2]), fmt(nums)]),
        f"The final step is the fully sorted sequence: {fmt(sorted(nums))}.",
        f"অন্তিম ধাপ সম্পূৰ্ণ সজোৱা ক্ৰম: {fmt(sorted(nums))}।")

for nums in MORE[:5]:
    st = steps_desc(nums)
    add(f"A number-arrangement machine rearranges the input in descending order, one number per step. Input: {fmt(nums)}. What is Step 3?",
        f"সংখ্যা সজোৱা যন্ত্ৰই ইনপুটটো একোটা সংখ্যা কৰি অধঃক্ৰমত সজায়। ইনপুট: {fmt(nums)}। ধাপ ৩ কি?",
        fmt(st[3]), pick3(fmt(st[3]), [fmt(st[2]), fmt(st[4]), fmt(st[1]), fmt(nums), fmt(sorted(nums))]),
        f"Step 3: {fmt(st[3])}.",
        f"ধাপ ৩: {fmt(st[3])}।")

MORE_WORDS = [
    ["cat", "dog", "ant", "fox", "hen"],
    ["sun", "moon", "star", "sky", "sea"],
    ["gold", "silver", "iron", "copper", "zinc"],
    ["one", "two", "three", "four", "five"],
]
for ws in MORE_WORDS:
    arr = list(ws)
    st = [list(arr)]
    for i in range(len(arr)):
        j = min(range(i, len(arr)), key=lambda k: arr[k])
        arr[i], arr[j] = arr[j], arr[i]
        st.append(list(arr))
    for k in (2, 3):
        add(f"A word-arrangement machine arranges words in alphabetical order, one word per step. Input: {', '.join(ws)}. What is Step {k}?",
            f"শব্দ সজোৱা যন্ত্ৰই শব্দবোৰ বৰ্ণানুক্ৰমে একোটা কৰি সজায়। ইনপুট: {', '.join(ws)}। ধাপ {as_num(k)} কি?",
            ", ".join(st[k]), pick3(", ".join(st[k]), [", ".join(st[k + 1]), ", ".join(st[k - 1]), ", ".join(st[k + 2]), ", ".join(ws), ", ".join(sorted(ws))]),
            f"Step {k}: {', '.join(st[k])}.",
            f"ধাপ {as_num(k)}: {', '.join(st[k])}।")

# step 4 extras
for nums in MORE[:6]:
    st = steps_asc(nums)
    add(f"A number-arrangement machine rearranges the input in ascending order, one number per step. Input: {fmt(nums)}. What is Step 4?",
        f"সংখ্যা সজোৱা যন্ত্ৰই ইনপুটটো একোটা সংখ্যা কৰি ঊৰ্ধ্বক্ৰমত সজায়। ইনপুট: {fmt(nums)}। ধাপ ৪ কি?",
        fmt(st[4]), pick3(fmt(st[4]), [fmt(st[3]), fmt(sorted(nums)), fmt(st[2]), fmt(nums)]),
        f"Step 4: {fmt(st[4])}.",
        f"ধাপ ৪: {fmt(st[4])}।")

append("input-output", rows)
