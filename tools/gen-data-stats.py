#!/usr/bin/env python3
"""Statistics: 95+ very hard bilingual questions."""

import sys
from fractions import Fraction as F
sys.path.insert(0, "tools")
from data_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def r2(x):
    return round(x, 2)


# 1. mean
for data in [[4, 6, 8, 10, 12], [5, 9, 11, 15], [12, 18, 24, 30, 36], [7, 14, 21, 28], [3, 7, 9, 11, 15]]:
    m = r2(sum(data) / len(data))
    add(f"Find the mean of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ গড় নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        m, [sum(data), r2(sum(data) / (len(data) + 1)), m + 2, m - 2],
        f"Mean = sum of observations / number of observations = {sum(data)}/{len(data)} = {m}.",
        f"গড় = {sum(data)}/{len(data)} = {as_num(m)}।")

# 2. median
for data in [[3, 5, 7, 9, 11], [4, 8, 10, 12, 15, 18], [2, 6, 9, 13, 17], [5, 10, 15, 20, 25, 30]]:
    s = sorted(data)
    n = len(s)
    med = s[n // 2] if n % 2 else r2((s[n//2 - 1] + s[n//2]) / 2)
    add(f"Find the median of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ মধ্যমা নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        med, [r2(sum(s)/n), s[0], s[-1], med + 1],
        f"Arrange in order. With {n} observations the median is {'the middle value' if n%2 else 'the mean of the two middle values'} = {med}.",
        f"ক্ৰমত সজাই {as_num(n)} টা মানৰ মধ্যমা = {as_num(med)}।")

# 3. mode
for data, mode in [([2, 3, 3, 4, 5, 3], 3), ([7, 8, 8, 9, 10, 8, 11], 8),
                   ([5, 6, 6, 7, 7, 7, 8], 7), ([1, 2, 2, 3, 4, 2], 2)]:
    add(f"Find the mode of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ বহুলক নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        mode, [r2(sum(data)/len(data)), sorted(data)[len(data)//2], max(data), mode + 1],
        f"The value {mode} occurs most frequently, so the mode is {mode}.",
        f"{as_num(mode)} সৰ্বাধিক বাৰ ওলাইছে, সেয়ে বহুলক {as_num(mode)}।")

# 4. range
for data in [[12, 5, 18, 7, 25], [40, 15, 60, 22], [9, 3, 17, 11, 6]]:
    v = max(data) - min(data)
    add(f"Find the range of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ পৰিসৰ নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        v, [max(data), min(data), max(data) + min(data), v + 2],
        f"Range = maximum - minimum = {max(data)} - {min(data)} = {v}.",
        f"পৰিসৰ = {as_num(max(data))} - {as_num(min(data))} = {as_num(v)}।")

# 5. mean from frequency table
for vals, freqs in [([10, 20, 30], [2, 3, 5]), ([5, 10, 15, 20], [4, 6, 8, 2]),
                    ([2, 4, 6], [5, 3, 2]), ([100, 200, 300], [3, 4, 3])]:
    total = sum(v * f for v, f in zip(vals, freqs))
    n = sum(freqs)
    m = r2(total / n)
    add(f"Find the mean of the following distribution: values {', '.join(map(str, vals))} with frequencies {', '.join(map(str, freqs))}.",
        f"তলৰ বিভাজনৰ গড় নিৰ্ণয় কৰা: মান {', '.join(map(str, vals))} আৰু পুনৰাবৃত্তি {', '.join(map(str, freqs))}।",
        m, [total, r2(total / (n + 1)), m + 5, sum(vals) / len(vals)],
        f"Σfx = {total} and Σf = {n}, so mean = {total}/{n} = {m}.",
        f"Σfx = {as_num(total)}, Σf = {as_num(n)}, সেয়ে গড় = {as_num(m)}।")

# 6. grouped median
for classes, freqs in [([(0,10),(10,20),(20,30),(30,40),(40,50)], [4,6,10,8,2]),
                       ([(0,10),(10,20),(20,30),(30,40)], [5,10,15,10])]:
    N = sum(freqs)
    half = N / 2
    cf = 0
    for (lo, hi), f in zip(classes, freqs):
        if cf + f >= half:
            med = lo + (half - cf) / f * (hi - lo)
            break
        cf += f
    add(f"Find the median of the grouped data: classes {', '.join(f'{a}-{b}' for a,b in classes)} with frequencies {', '.join(map(str, freqs))}.",
        f"শ্ৰেণী {', '.join(f'{a}-{b}' for a,b in classes)} আৰু পুনৰাবৃত্তি {', '.join(map(str, freqs))} থকা দলবদ্ধ তথ্যৰ মধ্যমা নিৰ্ণয় কৰা।",
        r2(med), [r2(med + 2), r2(med - 2), r2(N / 2), r2(sum(classes[0]) / 2)],
        f"N = {N}, N/2 = {half}; the cumulative frequency first exceeds it in the median class. Median = L + ((N/2 - cf)/f)h = {r2(med)}.",
        f"N = {as_num(N)}, N/2 = {as_num(half)}; সূত্ৰ প্ৰয়োগ কৰি মধ্যমা = {as_num(r2(med))}।")

# 7. grouped mode
for lo, f0, f1, f2, h in [(20, 6, 10, 8, 10), (10, 4, 12, 6, 10), (30, 5, 15, 10, 10)]:
    mode = lo + (f1 - f0) / (2 * f1 - f0 - f2) * h
    add(f"Find the mode of the grouped data where the modal class is {lo}-{lo+h} with f₀ = {f0}, f₁ = {f1} and f₂ = {f2}.",
        f"দলবদ্ধ তথ্যৰ বহুলক নিৰ্ণয় কৰা, য'ত বহুলক শ্ৰেণী {as_num(lo)}-{as_num(lo+h)}, f₀ = {as_num(f0)}, f₁ = {as_num(f1)} আৰু f₂ = {as_num(f2)}।",
        r2(mode), [r2(mode + 2), r2(mode - 2), lo, r2(lo + h)],
        f"Mode = L + ((f₁-f₀)/(2f₁-f₀-f₂))h = {lo} + (({f1}-{f0})/(2×{f1}-{f0}-{f2}))×{h} = {r2(mode)}.",
        f"বহুলক = {as_num(r2(mode))}।")

# 8. combined mean
for n1, m1, n2, m2 in [(20, 60, 30, 70), (15, 40, 25, 60), (10, 50, 40, 75), (12, 30, 18, 45)]:
    v = r2((n1 * m1 + n2 * m2) / (n1 + n2))
    add(f"The mean marks of {n1} students in class A is {m1} and of {n2} students in class B is {m2}. Find the combined mean.",
        f"A শ্ৰেণীৰ {as_num(n1)} ছাত্ৰৰ গড় নম্বৰ {as_num(m1)} আৰু B শ্ৰেণীৰ {as_num(n2)} ছাত্ৰৰ গড় {as_num(m2)}। যুটীয়া গড় নিৰ্ণয় কৰা।",
        v, [r2((m1 + m2) / 2), m1 + m2, v + 5, r2((n1 * m1 + n2 * m2) / (n1 + n2 + 1))],
        f"Combined mean = (n₁m₁ + n₂m₂)/(n₁+n₂) = ({n1*m1}+{n2*m2})/{n1+n2} = {v}.",
        f"যুটীয়া গড় = {as_num(v)}।")

# 9. missing value
for n, mean, known, missing in [(5, 20, [18, 22, 19, 21], 20), (6, 15, [12, 18, 14, 16, 13], 17),
                                (4, 25, [20, 30, 25], 25)]:
    add(f"The mean of {n} observations is {mean}. Four of them are {', '.join(map(str, known))}. Find the missing observation.",
        f"{as_num(n)} টা মানৰ গড় {as_num(mean)}। ইয়াৰে {as_num(len(known))} টা {', '.join(map(str, known))}। অনুপস্থিত মান নিৰ্ণয় কৰা।",
        missing, [missing + 2, missing - 2, mean, sum(known)],
        f"Total = {n} × {mean} = {n*mean}; sum of known = {sum(known)}; missing = {n*mean} - {sum(known)} = {missing}.",
        f"মুঠ = {as_num(n*mean)}, জনা মানৰ যোগফল = {as_num(sum(known))}, সেয়ে অনুপস্থিত = {as_num(missing)}।")

# 10. effect of adding constant
for k in [5, 10, 7, 12]:
    add(f"If {k} is added to every observation of a data set, by how much does the mean increase?",
        f"তথ্যৰ প্ৰতিটো মানত {as_num(k)} যোগ কৰিলে গড় কিমান বৃদ্ধি পায়?",
        k, [0, k * 2, k / 2, -k],
        f"Adding a constant to every observation increases the mean by the same constant, {k}.",
        f"প্ৰতিটো মানত {as_num(k)} যোগ কৰিলে গড়ও {as_num(k)} বৃদ্ধি পায়।")

# 11. mean of first n natural numbers
for n in [10, 20, 50, 100]:
    v = (n + 1) / 2
    add(f"Find the mean of the first {n} natural numbers.",
        f"প্ৰথম {as_num(n)} টা স্বাভাৱিক সংখ্যাৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [n / 2, n, r2(v + 5), r2(n * (n + 1) / 2)],
        f"Sum = n(n+1)/2 = {n*(n+1)//2}; mean = sum/n = (n+1)/2 = {r2(v)}.",
        f"যোগফল = {as_num(n*(n+1)//2)}; গড় = {as_num(r2(v))}।")

# 12. standard deviation
for data in [[2, 4, 6, 8], [5, 5, 5, 5], [1, 3, 5, 7]]:
    m = sum(data) / len(data)
    var = sum((x - m) ** 2 for x in data) / len(data)
    sd = r2(var ** 0.5)
    add(f"Find the standard deviation of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ মানক বিচ্যুতি নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        sd, [r2(var), r2(sd + 1), r2(sd - 1), r2(m)],
        f"Mean = {r2(m)}, variance = Σ(x-mean)²/n = {r2(var)}, so SD = {sd}.",
        f"গড় = {as_num(r2(m))}, প্ৰসৰণ = {as_num(r2(var))}, সেয়ে মানক বিচ্যুতি = {as_num(sd)}।")

# extra batch
for data in [[6, 8, 10, 12, 14], [9, 12, 15, 18], [11, 13, 15, 17, 19]]:
    m = r2(sum(data) / len(data))
    add(f"Find the mean of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ গড় নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        m, [sum(data), m + 1, m - 1, r2(sum(data)/2)],
        f"Mean = {sum(data)}/{len(data)} = {m}.",
        f"গড় = {as_num(m)}।")

for data in [[6, 9, 12, 15, 18], [10, 20, 30, 40], [7, 11, 15, 19, 23, 27]]:
    s = sorted(data)
    n = len(s)
    med = s[n // 2] if n % 2 else r2((s[n//2-1] + s[n//2]) / 2)
    add(f"Find the median of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ মধ্যমা নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        med, [r2(sum(s)/n), s[0], s[-1], med + 2],
        f"Median = {med}.",
        f"মধ্যমা = {as_num(med)}।")

for data, mode in [([4, 5, 5, 6, 7], 5), ([2, 2, 3, 4, 5], 2), ([9, 10, 10, 11, 12], 10)]:
    add(f"Find the mode of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ বহুলক নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        mode, [r2(sum(data)/len(data)), sorted(data)[len(data)//2], max(data), mode + 1],
        f"Mode = {mode}.",
        f"বহুলক = {as_num(mode)}।")

for data in [[15, 4, 22, 9, 30], [50, 12, 70, 33], [8, 2, 19, 14]]:
    v = max(data) - min(data)
    add(f"Find the range of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ পৰিসৰ নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        v, [max(data), min(data), max(data) + min(data), v + 2],
        f"Range = {max(data)} - {min(data)} = {v}.",
        f"পৰিসৰ = {as_num(v)}।")

for vals, freqs in [([10, 30, 50], [3, 4, 3]), ([20, 40, 60], [5, 2, 3]), ([1, 2, 3, 4], [2, 3, 4, 1])]:
    total = sum(v * f for v, f in zip(vals, freqs))
    n = sum(freqs)
    m = r2(total / n)
    add(f"Find the mean of the following distribution: values {', '.join(map(str, vals))} with frequencies {', '.join(map(str, freqs))}.",
        f"তলৰ বিভাজনৰ গড় নিৰ্ণয় কৰা: মান {', '.join(map(str, vals))} আৰু পুনৰাবৃত্তি {', '.join(map(str, freqs))}।",
        m, [total, m + 4, m - 4, r2(total / (n + 1))],
        f"Mean = {total}/{n} = {m}.",
        f"গড় = {as_num(m)}।")

for n1, m1, n2, m2 in [(30, 55, 20, 45), (25, 70, 35, 50), (40, 65, 10, 85)]:
    v = r2((n1 * m1 + n2 * m2) / (n1 + n2))
    add(f"The mean marks of {n1} students in class A is {m1} and of {n2} students in class B is {m2}. Find the combined mean.",
        f"A শ্ৰেণীৰ {as_num(n1)} ছাত্ৰৰ গড় {as_num(m1)} আৰু B শ্ৰেণীৰ {as_num(n2)} ছাত্ৰৰ গড় {as_num(m2)}। যুটীয়া গড় নিৰ্ণয় কৰা।",
        v, [r2((m1 + m2) / 2), m1 + m2, v + 5, r2((n1*m1 + n2*m2) / (n1+n2+1))],
        f"Combined mean = {v}.",
        f"যুটীয়া গড় = {as_num(v)}।")

for n in [8, 15, 30]:
    v = (n + 1) / 2
    add(f"Find the mean of the first {n} natural numbers.",
        f"প্ৰথম {as_num(n)} টা স্বাভাৱিক সংখ্যাৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [n / 2, n, r2(v + 5), r2(n*(n+1)/2)],
        f"Mean = (n+1)/2 = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

for data in [[3, 5, 7, 9], [10, 12, 14, 16]]:
    m = sum(data) / len(data)
    var = sum((x - m) ** 2 for x in data) / len(data)
    sd = r2(var ** 0.5)
    add(f"Find the standard deviation of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ মানক বিচ্যুতি নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        sd, [r2(var), r2(sd + 1), r2(sd - 1), r2(m)],
        f"SD = {sd}.",
        f"মানক বিচ্যুতি = {as_num(sd)}।")

for k in [8, 15]:
    add(f"If {k} is added to every observation of a data set, by how much does the mean increase?",
        f"তথ্যৰ প্ৰতিটো মানত {as_num(k)} যোগ কৰিলে গড় কিমান বৃদ্ধি পায়?",
        k, [0, k * 2, k / 2, -k],
        f"The mean increases by {k}.",
        f"গড় {as_num(k)} বৃদ্ধি পায়।")

for lo, f0, f1, f2, h in [(10, 5, 10, 7, 10), (40, 8, 14, 6, 10)]:
    mode = lo + (f1 - f0) / (2 * f1 - f0 - f2) * h
    add(f"Find the mode of the grouped data where the modal class is {lo}-{lo+h} with f₀ = {f0}, f₁ = {f1} and f₂ = {f2}.",
        f"দলবদ্ধ তথ্যৰ বহুলক নিৰ্ণয় কৰা, য'ত বহুলক শ্ৰেণী {as_num(lo)}-{as_num(lo+h)}, f₀ = {as_num(f0)}, f₁ = {as_num(f1)} আৰু f₂ = {as_num(f2)}।",
        r2(mode), [r2(mode + 2), r2(mode - 2), lo, r2(lo + h)],
        f"Mode = {r2(mode)}.",
        f"বহুলক = {as_num(r2(mode))}।")

# final batch
for data in [[14, 16, 18, 20], [25, 35, 45], [8, 12, 16, 20, 24], [50, 60, 70, 80]]:
    m = r2(sum(data) / len(data))
    add(f"Find the mean of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ গড় নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        m, [sum(data), m + 2, m - 2, r2(sum(data)/2)],
        f"Mean = {sum(data)}/{len(data)} = {m}.",
        f"গড় = {as_num(m)}।")

for data in [[2, 4, 6, 8, 10], [12, 15, 18, 21, 24, 27], [5, 15, 25, 35], [9, 18, 27, 36, 45]]:
    s2 = sorted(data)
    n = len(s2)
    med = s2[n // 2] if n % 2 else r2((s2[n//2-1] + s2[n//2]) / 2)
    add(f"Find the median of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ মধ্যমা নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        med, [r2(sum(s2)/n), s2[0], s2[-1], med + 2],
        f"Median = {med}.",
        f"মধ্যমা = {as_num(med)}।")

for data, mode in [([3, 4, 4, 5, 6], 4), ([1, 1, 2, 3], 1), ([6, 7, 7, 8, 9, 7], 7)]:
    add(f"Find the mode of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ বহুলক নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        mode, [r2(sum(data)/len(data)), sorted(data)[len(data)//2], max(data), mode + 1],
        f"Mode = {mode}.",
        f"বহুলক = {as_num(mode)}।")

for data in [[100, 45, 78, 23, 90], [66, 12, 88, 41], [35, 7, 52, 19]]:
    v = max(data) - min(data)
    add(f"Find the range of the data: {', '.join(map(str, data))}.",
        f"তথ্যৰ পৰিসৰ নিৰ্ণয় কৰা: {', '.join(map(str, data))}।",
        v, [max(data), min(data), max(data) + min(data), v + 2],
        f"Range = {max(data)} - {min(data)} = {v}.",
        f"পৰিসৰ = {as_num(v)}।")

for vals, freqs in [([5, 15, 25], [2, 5, 3]), ([10, 20, 30, 40], [1, 2, 3, 4]), ([2, 6, 10], [4, 4, 2])]:
    total = sum(v * f for v, f in zip(vals, freqs))
    n = sum(freqs)
    m = r2(total / n)
    add(f"Find the mean of the following distribution: values {', '.join(map(str, vals))} with frequencies {', '.join(map(str, freqs))}.",
        f"তলৰ বিভাজনৰ গড় নিৰ্ণয় কৰা: মান {', '.join(map(str, vals))} আৰু পুনৰাবৃত্তি {', '.join(map(str, freqs))}।",
        m, [total, m + 4, m - 4, r2(total / (n + 1))],
        f"Mean = {total}/{n} = {m}.",
        f"গড় = {as_num(m)}।")

for n1, m1, n2, m2 in [(18, 45, 12, 60), (24, 80, 36, 55)]:
    v = r2((n1 * m1 + n2 * m2) / (n1 + n2))
    add(f"The mean marks of {n1} students in class A is {m1} and of {n2} students in class B is {m2}. Find the combined mean.",
        f"A শ্ৰেণীৰ {as_num(n1)} ছাত্ৰৰ গড় {as_num(m1)} আৰু B শ্ৰেণীৰ {as_num(n2)} ছাত্ৰৰ গড় {as_num(m2)}। যুটীয়া গড় নিৰ্ণয় কৰা।",
        v, [r2((m1+m2)/2), m1+m2, v+5, r2((n1*m1+n2*m2)/(n1+n2+1))],
        f"Combined mean = {v}.",
        f"যুটীয়া গড় = {as_num(v)}।")

for n, mean, known, missing in [(5, 12, [10, 14, 11, 13], 12), (6, 18, [15, 20, 17, 19, 16], 21)]:
    add(f"The mean of {n} observations is {mean}. {len(known)} of them are {', '.join(map(str, known))}. Find the missing observation.",
        f"{as_num(n)} টা মানৰ গড় {as_num(mean)}। ইয়াৰে {as_num(len(known))} টা {', '.join(map(str, known))}। অনুপস্থিত মান নিৰ্ণয় কৰা।",
        missing, [missing + 2, missing - 2, mean, sum(known)],
        f"Missing = {n*mean} - {sum(known)} = {missing}.",
        f"অনুপস্থিত = {as_num(missing)}।")

for n in [12, 40]:
    v = (n + 1) / 2
    add(f"Find the mean of the first {n} natural numbers.",
        f"প্ৰথম {as_num(n)} টা স্বাভাৱিক সংখ্যাৰ গড় নিৰ্ণয় কৰা।",
        r2(v), [n / 2, n, r2(v + 5), r2(n*(n+1)/2)],
        f"Mean = (n+1)/2 = {r2(v)}.",
        f"গড় = {as_num(r2(v))}।")

append("statistics", rows)
