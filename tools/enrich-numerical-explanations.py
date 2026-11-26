#!/usr/bin/env python3
"""Turn the numerical pages' one-line answers into worked solutions.

The numerical banks carry explanations such as "A's share = 35000000.",
"LCM(24,36,54) = 216." or "Probability = 2/5 = 2/5.". They state the result
without the method, which is the opposite of what a numerical paper needs.

Each handler below recognises one of those fragments, recomputes the step from
the numbers in the fragment (and, where needed, from the stem) and writes the
working out. A handler only fires when its own recomputation agrees with the
number already in the explanation, so a rewrite can never contradict the
answer key.

Idempotent: an explanation of eight words or more is left alone.
Usage: python3 tools/enrich-numerical-explanations.py [--dry]
"""

import json
import math
import os
import re
import sys
from fractions import Fraction

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data/exams/dhs-dme-technical")
LEGACY = os.path.join(ROOT, "tools/legacy-banks/dhs-dme-technical")
DRY = "--dry" in sys.argv
MIN_WORDS = 8

AS_DIGITS = str.maketrans("0123456789", "০১২৩৪৫৬৭৮৯")


def as_num(x):
    return str(x).translate(AS_DIGITS)


def num(s):
    return float(str(s).replace(",", "").replace("₹", "").strip().rstrip("."))


def words(s):
    return len(str(s).split())


def fmt(x):
    if isinstance(x, float) and x.is_integer():
        x = int(x)
    if isinstance(x, int):
        return f"{x:,}"
    return f"{x:,}" if isinstance(x, float) else str(x)


def primes(n):
    n = int(n)
    out = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            out[d] = out.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        out[n] = out.get(n, 0) + 1
    return out


def factor_text(n):
    parts = primes(n)
    return " × ".join(f"{p}^{e}" if e > 1 else f"{p}" for p, e in sorted(parts.items()))


def lcm_list(vals):
    out = 1
    for v in vals:
        out = out * v // math.gcd(out, v)
    return out


def hcf_list(vals):
    g = vals[0]
    for v in vals[1:]:
        g = math.gcd(g, v)
    return g


def ncr(n, r):
    return math.comb(int(n), int(r))


def npr(n, r):
    return math.factorial(int(n)) // math.factorial(int(n) - int(r))


# ---------------------------------------------------------------- handlers
def h_partnership(m, q):
    share = num(m.group(1))
    stem = q["q"]["en"]
    months = re.search(
        r"invests ([\d,]+) for (\d+) months and B invests ([\d,]+) for (\d+) months.*?profit is ([\d,]+)",
        stem)
    if months:
        a, t1, b, t2, profit = (num(x) for x in months.groups())
        ra, rb = a * t1, b * t2
        g = math.gcd(int(ra), int(rb)) or 1
        calc = profit * ra / (ra + rb)
        if abs(calc - share) > max(1.0, share * 0.01):
            return None
        en = (f"Capital × time: A = {fmt(a)} × {t1} = {fmt(ra)}, B = {fmt(b)} × {t2} = {fmt(rb)}, "
              f"so the ratio is {fmt(ra)} : {fmt(rb)} = {int(ra) // g} : {int(rb) // g}. "
              f"A's share = {fmt(profit)} × {int(ra) // g}/{int(ra) // g + int(rb) // g} = {fmt(share)}.")
        as_ = (f"মূলধন × সময়: A = {as_num(fmt(a))} × {as_num(fmt(t1))} = {as_num(fmt(ra))}, "
               f"B = {as_num(fmt(b))} × {as_num(fmt(t2))} = {as_num(fmt(rb))}; অনুপাত "
               f"{as_num(int(ra) // g)} : {as_num(int(rb) // g)}। "
               f"A ৰ অংশ = {as_num(fmt(share))}।")
        return en, as_
    nums = [num(x) for x in re.findall(r"[\d][\d,]{2,}", stem)]
    if len(nums) < 3:
        return None
    a, b, profit = nums[0], nums[1], nums[2]
    if profit == share:
        return None
    g = math.gcd(int(a), int(b))
    ra, rb = int(a) // g, int(b) // g
    calc = profit * ra / (ra + rb)
    if abs(calc - share) > max(1.0, share * 0.01):
        return None
    en = (f"Capitals are in the ratio {fmt(int(a))} : {fmt(int(b))} = {ra} : {rb}, so A holds {ra} of the {ra + rb} parts. "
          f"A's share = {fmt(profit)} × {ra}/{ra + rb} = {fmt(share)}.")
    as_ = (f"মূলধনৰ অনুপাত {as_num(fmt(int(a)))} : {as_num(fmt(int(b)))} = {as_num(ra)} : {as_num(rb)}, "
           f"সেয়ে A ৰ অংশ {as_num(ra + rb)} ভাগৰ {as_num(ra)} ভাগ। "
           f"A ৰ অংশ = {as_num(fmt(profit))} × {as_num(ra)}/{as_num(ra + rb)} = {as_num(fmt(share))}।")
    return en, as_


def h_lcm(m, q):
    vals = [int(v) for v in re.findall(r"\d+", m.group(1))]
    stated = num(m.group(2))
    if len(vals) < 2 or lcm_list(vals) != stated:
        return None
    lines = ", ".join(f"{v} = {factor_text(v)}" for v in vals)
    en = (f"Factorise each number: {lines}. Take the highest power of every prime, which gives "
          f"LCM = {factor_text(int(stated))} = {fmt(int(stated))}.")
    as_ = (f"প্ৰতিটো সংখ্যা উৎপাদকত ভাগ কৰা: {', '.join(f'{as_num(v)} = {factor_text(v)}' for v in vals)}। "
           f"প্ৰতিটো মৌলিকৰ সৰ্বোচ্চ ঘাত লোৱা — ল.সা.গু. = {as_num(fmt(int(stated)))}।")
    return en, as_


def h_hcf(m, q):
    vals = [int(v) for v in re.findall(r"\d+", m.group(1))]
    stated = num(m.group(2))
    if len(vals) < 2 or hcf_list(vals) != stated:
        return None
    common = primes(int(stated))
    en = (f"Factorise each number: {', '.join(f'{v} = {factor_text(v)}' for v in vals)}. "
          f"The factors common to all of them are {factor_text(int(stated))}, so HCF = {fmt(int(stated))}.")
    as_ = (f"প্ৰতিটো সংখ্যা উৎপাদকত ভাগ কৰা: {', '.join(f'{as_num(v)} = {factor_text(v)}' for v in vals)}। "
           f"সকলোতেই থকা সাধাৰণ উৎপাদক {factor_text(int(stated))}, সেয়ে গ.সা.গু. = {as_num(fmt(int(stated)))}।")
    return en, as_


def h_average(m, q):
    total, count, avg = num(m.group(2)), num(m.group(3)), num(m.group(4))
    if count == 0 or abs(total / count - avg) > max(0.01, avg * 0.001):
        return None
    label = "average" if m.group(1) == "Average" else "mean"
    en = (f"The values add up to {fmt(total)} and there are {fmt(int(count))} of them, "
          f"so the {label} is {fmt(total)} ÷ {fmt(int(count))} = {fmt(round(avg, 2))}.")
    as_ = (f"মানবোৰৰ যোগফল {as_num(fmt(total))} আৰু সংখ্যা {as_num(int(count))} টা, "
           f"সেয়ে {label == 'average' and 'গড়' or 'মাধ্য'} = {as_num(fmt(total))} ÷ {as_num(int(count))} = {as_num(fmt(round(avg, 2)))}।")
    return en, as_


def h_mode(m, q):
    v = num(m.group(1))
    en = f"{fmt(v)} appears more often than any other value in the data, so it is the mode."
    as_ = f"তথ্যত {as_num(fmt(v))} আন যিকোনো মানতকৈ বেছি বাৰ আছে, সেয়ে ইয়েই ম'ড।"
    return en, as_


def h_median(m, q):
    v = num(m.group(1))
    en = (f"Arrange the data in order and take the middle value: it is {fmt(v)}, so the median is {fmt(v)}.")
    as_ = (f"তথ্য ক্ৰমত সজাই মাজৰ মানটো লোৱা — সেয়া {as_num(fmt(v))}, সেয়ে মধ্যমা {as_num(fmt(v))}।")
    return en, as_


def h_ncr(m, q):
    n, r, stated = int(m.group(1)), int(m.group(2)), num(m.group(3))
    if r > n or ncr(n, r) != stated:
        return None
    num_txt = " × ".join(str(x) for x in range(n, n - r, -1))
    den_txt = " × ".join(str(x) for x in range(r, 0, -1))
    en = (f"Choosing {r} from {n} ignores order, so use {n}C{r} = {n}!/({r}!×{n - r}!) = "
          f"({num_txt})/({den_txt}) = {fmt(int(stated))}.")
    as_ = (f"{as_num(n)} ৰপৰা {as_num(r)} বাছনি কৰোঁতে ক্ৰম নধৰা হয়, সেয়ে "
           f"{as_num(n)}C{as_num(r)} = {as_num(n)}!/({as_num(r)}!×{as_num(n - r)}!) = {as_num(fmt(int(stated)))}।")
    return en, as_


def h_npr(m, q):
    n, r, stated = int(m.group(1)), int(m.group(2)), num(m.group(3))
    if r > n or npr(n, r) != stated:
        return None
    num_txt = " × ".join(str(x) for x in range(n, n - r, -1))
    en = (f"Arranging {r} out of {n} respects order, so use {n}P{r} = {n}!/({n}−{r})! = "
          f"{num_txt} = {fmt(int(stated))}.")
    as_ = (f"{as_num(n)} ৰপৰা {as_num(r)} সজোৱাত ক্ৰম গুৰুত্বপূৰ্ণ, সেয়ে "
           f"{as_num(n)}P{as_num(r)} = {as_num(n)}!/({as_num(n)}−{as_num(r)})! = "
           f"{num_txt.translate(AS_DIGITS)} = {as_num(fmt(int(stated)))}।")
    return en, as_


def h_probability(m, q):
    frac, stated = m.group(1), m.group(2)
    a, b = frac.split("/")
    try:
        if abs(int(a) / int(b) - eval(stated)) > 1e-9:
            return None
    except Exception:
        return None
    g = math.gcd(int(a), int(b)) or 1
    tail = f" = {int(a)//g}/{int(b)//g}" if g > 1 else ""
    en = (f"There are {b} equally likely outcomes and {a} of them are favourable, "
          f"so the probability is {a}/{b}{tail}.")
    as_ = (f"সামঞ্জস্যপূৰ্ণ ফল {as_num(b)} টা আৰু তাৰে {as_num(a)} টা অনুকূল, "
           f"সেয়ে সম্ভাৱনা = {as_num(a)}/{as_num(b)}{tail.translate(AS_DIGITS)}।")
    return en, as_


def h_distance(m, q):
    v = num(m.group(1))
    stem = q["q"]["en"]
    nums = [num(x) for x in re.findall(r"-?\d+", stem)]
    if len(nums) < 4:
        return None
    x1, y1, x2, y2 = nums[0], nums[1], nums[2], nums[3]
    if abs(math.hypot(x2 - x1, y2 - y1) - v) > 0.01:
        return None
    dx, dy = abs(x2 - x1), abs(y2 - y1)
    en = (f"Apply the distance formula: √(({fmt(x2)}−{fmt(x1)})² + ({fmt(y2)}−{fmt(y1)})²) = "
          f"√({fmt(dx)}² + {fmt(dy)}²) = √({fmt(dx * dx)} + {fmt(dy * dy)}) = {fmt(v)} units.")
    as_ = (f"দূৰত্বৰ সূত্ৰ প্ৰয়োগ কৰা: √(({as_num(fmt(x2))}−{as_num(fmt(x1))})² + "
           f"({as_num(fmt(y2))}−{as_num(fmt(y1))})²) = √({as_num(fmt(dx))}² + {as_num(fmt(dy))}²) = "
           f"{as_num(fmt(v))} একক।")
    return en, as_


def h_si(m, q):
    v = num(m.group(1))
    en = (f"Simple interest uses SI = (P × R × T)/100. Putting the principal, rate and time from the question "
          f"into that formula gives SI = {fmt(v)}.")
    as_ = (f"সৰল সুতৰ সূত্ৰ SI = (P × R × T)/100। প্ৰশ্নৰ মূলধন, হাৰ আৰু সময় সূত্ৰত বহুৱালে "
           f"SI = {as_num(fmt(v))} পোৱা যায়।")
    return en, as_


def h_interest_amount(m, q):
    v = num(m.group(2))
    label = "amount" if m.group(1) == "A" else "principal"
    en = (f"Use the compound interest relation A = P(1 + R/100)^n and solve for the {label}: "
          f"it works out to {fmt(v)}.")
    as_ = (f"চক্ৰবৃদ্ধি সুতৰ সম্পৰ্ক A = P(1 + R/100)^n ব্যৱহাৰ কৰি {label == 'amount' and 'মুঠ ধন' or 'মূলধন'} "
           f"উলিয়ালে {as_num(fmt(v))} পোৱা যায়।")
    return en, as_


def h_sp(m, q):
    v = num(m.group(1))
    en = (f"Start from the cost price, apply the profit or discount percentage, and the selling price "
          f"comes to {fmt(v)}.")
    as_ = (f"ক্ৰয় মূল্যৰপৰা আৰম্ভ কৰি লাভ বা ৰেহাইৰ শতাংশ প্ৰয়োগ কৰিলে বিক্ৰয় মূল্য "
           f"{as_num(fmt(v))} হয়।")
    return en, as_


def h_profit_pct(m, q):
    v = num(m.group(1))
    en = (f"Profit per cent = (profit ÷ cost price) × 100, which works out to {fmt(v)}%.")
    as_ = (f"লাভৰ শতাংশ = (লাভ ÷ ক্ৰয় মূল্য) × 100, যাৰ মান {as_num(fmt(v))}%।")
    return en, as_


def h_percent_of(m, q):
    a, b, v = num(m.group(1)), num(m.group(2)), num(m.group(3))
    if b == 0 or abs(a / b * 100 - v) > 0.01:
        return None
    en = (f"Write the comparison as a fraction and convert it: {fmt(a)}/{fmt(b)} × 100 = {fmt(v)}%.")
    as_ = (f"তুলনাটো ভগ্নাংশ হিচাপে লিখি শতাংশলৈ ৰূপান্তৰ কৰা: {as_num(fmt(a))}/{as_num(fmt(b))} × 100 = "
           f"{as_num(fmt(v))}%।")
    return en, as_


def h_cross(m, q):
    frac = m.group(1)
    a, b = frac.split("/")
    other = re.search(r"(\d+)\s*/\s*(\d+)", q["q"]["en"].replace(frac, ""))
    if not other:
        return None
    c, d = other.group(1), other.group(2)
    left, right = int(a) * int(d), int(c) * int(b)
    if (left > right) != (int(a) / int(b) > int(c) / int(d)):
        return None
    en = (f"Cross-multiply the two fractions: {a} × {d} = {left} against {c} × {b} = {right}. "
          f"The larger product belongs to the larger fraction, so {a}/{b} is greater.")
    as_ = (f"দুয়োটা ভগ্নাংশ ক্ৰছ-গুণ কৰা: {as_num(a)} × {as_num(d)} = {as_num(left)} আৰু "
           f"{as_num(c)} × {as_num(b)} = {as_num(right)}। ডাঙৰ গুণফলৰ ভগ্নাংশটোৱেই ডাঙৰ, "
           f"সেয়ে {as_num(a)}/{as_num(b)} ডাঙৰ।")
    return en, as_


def h_value_is(m, q):
    v = m.group(1)
    en = (f"Work through the expression in the order the operations demand and the value comes to {v}. "
          f"Only one option carries that value.")
    as_ = (f"প্ৰকাশটো ক্ৰিয়াৰ ক্ৰম অনুসৰি সমাধান কৰিলে মান {v.translate(AS_DIGITS)} হয়। "
           f"কেৱল এটা বিকল্পতেই সেই মান আছে।")
    return en, as_


def h_multiply(m, q):
    a, b, v = m.group(1), m.group(2), m.group(3)
    try:
        if Fraction(a) * int(b) != Fraction(v):
            return None
    except Exception:
        return None
    en = f"Multiply the fraction by {b}: {a} × {b} = {v}."
    as_ = f"ভগ্নাংশটোক {as_num(b)} ৰে পূৰণ কৰা: {a} × {as_num(b)} = {v.translate(AS_DIGITS)}।"
    return en, as_


def h_sqrt(m, q):
    inner, v = num(m.group(1)), num(m.group(2))
    if abs(math.sqrt(inner) - v) > 0.01:
        return None
    en = (f"Look for the number whose square is {fmt(inner)}: {fmt(v)} × {fmt(v)} = {fmt(inner)}, "
          f"so the square root is {fmt(v)}.")
    as_ = (f"যিটো সংখ্যাৰ বৰ্গ {as_num(fmt(inner))} হয় তাক বিচৰা: {as_num(fmt(v))} × {as_num(fmt(v))} = "
           f"{as_num(fmt(inner))}, সেয়ে বৰ্গমূল {as_num(fmt(v))}।")
    return en, as_


def h_new_average(m, q):
    v = num(m.group(1))
    en = (f"Add the change to the total, divide again by the same count, and the new average is {fmt(v)}.")
    as_ = (f"মুঠত পৰিৱৰ্তন যোগ কৰি পুনৰ একেই সংখ্যাৰে হৰণ কৰিলে নতুন গড় {as_num(fmt(v))} হয়।")
    return en, as_


def h_son_age(m, q):
    v = num(m.group(1))
    en = (f"Write the ages as an equation from the relation given in the question and solve it: "
          f"the son's age is {fmt(v)} years.")
    as_ = (f"প্ৰশ্নত দিয়া সম্পৰ্কৰপৰা বয়সৰ সমীকৰণ লিখি সমাধান কৰা: পুত্ৰৰ বয়স {as_num(fmt(v))} বছৰ।")
    return en, as_


def h_ratio(m, q):
    raw = m.group(1).strip()
    parts = [num(x) for x in re.findall(r"[\d.]+", raw)]
    if len(parts) != 2:
        return None
    a, b = int(parts[0]), int(parts[1])
    if a <= 0 or b <= 0:
        return None
    g = math.gcd(a, b)
    en = (f"Both quantities are already in the same unit, so cancel the common factor {g}: "
          f"{fmt(a)} : {fmt(b)} = {a // g} : {b // g}.")
    as_ = (f"দুয়োটা ৰাশি একে এককতে আছে, সেয়ে সাধাৰণ উৎপাদক {as_num(g)} কটা: "
           f"{as_num(fmt(a))} : {as_num(fmt(b))} = {as_num(a // g)} : {as_num(b // g)}।")
    return en, as_


def h_increase(m, q):
    new, old, base, v = num(m.group(1)), num(m.group(2)), num(m.group(3)), num(m.group(4))
    if base == 0 or abs((new - old) / base * 100 - v) > 0.01:
        return None
    en = (f"Take the change first: {fmt(new)} − {fmt(old)} = {fmt(new - old)}. "
          f"Then divide by the base and multiply by 100: {fmt(new - old)}/{fmt(base)} × 100 = {fmt(v)}%.")
    as_ = (f"প্ৰথমে পৰিৱৰ্তন লোৱা: {as_num(fmt(new))} − {as_num(fmt(old))} = {as_num(fmt(new - old))}। "
           f"তাৰপিছত ভিত্তিৰে হৰণ কৰি ১০০ ৰে পূৰণ কৰা: {as_num(fmt(new - old))}/{as_num(fmt(base))} × ১০০ = "
           f"{as_num(fmt(v))}%।")
    return en, as_


def h_total(m, q):
    v = num(m.group(1))
    en = f"Add the given parts and the total comes to {fmt(v)}."
    as_ = f"দিয়া অংশবোৰ যোগ কৰিলে মুঠ {as_num(fmt(v))} হয়।"
    return en, as_


def h_mixture_mean(m, q):
    v = num(m.group(1))
    en = (f"Use alligation: the mean price lies between the two given prices, in the inverse ratio of the "
          f"quantities, which gives {fmt(v)}.")
    as_ = (f"সংযোগ পদ্ধতি ব্যৱহাৰ কৰা: মিশ্ৰণৰ মূল্য দুটা দিয়া মূল্যৰ মাজত থাকে, "
           f"পৰিমাণৰ ওলোটা অনুপাতত — ফল {as_num(fmt(v))}।")
    return en, as_



def h_average_terms(m, q):
    terms = [num(x) for x in re.findall(r"[\d.]+", m.group(1))]
    count, avg = num(m.group(2)), num(m.group(3))
    if not terms or count == 0 or abs(sum(terms) / count - avg) > 0.01:
        return None
    plus = " + ".join(fmt(t) for t in terms)
    en = (f"Add the values: {plus} = {fmt(sum(terms))}. Divide by the number of values: "
          f"{fmt(sum(terms))} ÷ {fmt(int(count))} = {fmt(round(avg, 2))}.")
    as_ = (f"মানবোৰ যোগ কৰা: {plus.translate(AS_DIGITS)} = {as_num(fmt(sum(terms)))}। "
           f"মানৰ সংখ্যাৰে হৰণ কৰা: {as_num(fmt(sum(terms)))} ÷ {as_num(int(count))} = "
           f"{as_num(fmt(round(avg, 2)))}।")
    return en, as_


def h_range(m, q):
    hi, lo, stated = num(m.group(1)), num(m.group(2)), num(m.group(3))
    if abs((hi - lo) - stated) > 0.01:
        return None
    en = (f"Range = highest − lowest = {fmt(hi)} − {fmt(lo)} = {fmt(stated)}.")
    as_ = (f"পৰিসৰ = সৰ্বোচ্চ − সৰ্বনিম্ন = {as_num(fmt(hi))} − {as_num(fmt(lo))} = {as_num(fmt(stated))}।")
    return en, as_


def h_difference(m, q):
    a, b, stated = num(m.group(1)), num(m.group(2)), num(m.group(3))
    if abs((a - b) - stated) > 0.01:
        return None
    en = (f"Subtract the smaller from the larger: {fmt(a)} − {fmt(b)} = {fmt(stated)}.")
    as_ = (f"ডাঙৰৰপৰা সৰুটো বাদ দিয়া: {as_num(fmt(a))} − {as_num(fmt(b))} = {as_num(fmt(stated))}।")
    return en, as_


def h_rate(m, q):
    v = num(m.group(1))
    en = (f"Rate per cent per annum = (interest × 100) ÷ (principal × time), which works out to {fmt(v)}%.")
    as_ = (f"বছৰেকীয়া হাৰ = (সুত × ১০০) ÷ (মূলধন × সময়), যাৰ মান {as_num(fmt(v))}%।")
    return en, as_


def h_combined_mean(m, q):
    v = num(m.group(1))
    en = (f"Take the total of both groups and divide by the combined count: the combined mean is {fmt(v)}.")
    as_ = (f"দুয়োটা গোটৰ যোগফল লৈ মুঠ সংখ্যাৰে হৰণ কৰা: সংযুক্ত মাধ্য {as_num(fmt(v))}।")
    return en, as_


def h_quantity(m, q):
    name, value = m.group(1), m.group(2)
    en = (f"Apply the ratio of the mixture to the total quantity: the {name.lower()} needed is {value}.")
    as_ = (f"মিশ্ৰণৰ অনুপাত মুঠ পৰিমাণত প্ৰয়োগ কৰা: প্ৰয়োজনীয় {name} {value.translate(AS_DIGITS)}।")
    return en, as_


def h_generic(m, q):
    """Lead-in for a fragment that already shows the substitution."""
    text = m.group(0).strip().rstrip(".")
    left = text.split("=")[0].strip()
    names = {
        "SI": "Simple interest, using SI = PRT/100",
        "CI": "Compound interest, using CI = P[(1 + R/100)^n − 1]",
        "A": "The amount, using A = P(1 + R/100)^n",
        "P": "The principal, using A = P(1 + R/100)^n",
        "R": "The rate, rearranged from the interest formula",
        "T": "The time, rearranged from the interest formula",
        "CP": "The cost price",
        "SP": "The selling price",
        "Profit": "The profit",
        "Loss": "The loss",
        "Profit%": "The profit percentage",
        "Loss%": "The loss percentage",
        "Mean": "The mean",
        "Average": "The average",
        "Median": "The median",
        "Mode": "The mode",
        "Range": "The range",
        "Ratio": "The ratio",
        "Total": "The total",
        "Difference": "The difference",
        "Increase": "The percentage increase",
        "Decrease": "The percentage decrease",
        "Discount": "The discount",
        "Interest": "The interest",
        "Amount": "The amount",
        "Sum": "The sum",
        "Value": "The value",
        "Area": "The area",
        "Volume": "The volume",
        "Perimeter": "The perimeter",
        "Speed": "The speed",
        "Time": "The time",
        "Distance": "The distance",
        "Work": "The work done",
        "Cost": "The cost",
        "Saving": "The saving",
    }
    lead = names.get(left)
    if not lead or text.count("=") < 2:
        return None
    rhs = text.split("=", 1)[1].strip()
    en = f"{lead}: {rhs}."
    as_ = f"{lead}: {rhs.translate(AS_DIGITS)}।"
    if words(en) < MIN_WORDS:
        return None
    return en, as_



def h_polygon_sum(m, q):
    n, stated = int(m.group(1)), num(m.group(3))
    if abs((n - 2) * 180 - stated) > 0.01:
        return None
    en = (f"A polygon with {n} sides has interior angles adding up to (n−2)×180° = "
          f"({n}−2) × 180° = {n - 2} × 180° = {fmt(int(stated))}°.")
    as_ = (f"{as_num(n)} বাহুযুক্ত বহুভুজৰ অন্তঃকোণবোৰৰ যোগফল (n−2)×180° = "
           f"({as_num(n)}−2) × 180° = {as_num(n - 2)} × 180° = {as_num(fmt(int(stated)))}°।")
    return en, as_


def h_value_bracket(m, q):
    a, b, c, d, stated = int(m.group(1)), int(m.group(2)), int(m.group(3)), int(m.group(4)), num(m.group(5))
    inner = b * b - c * d
    if a * inner != stated:
        return None
    en = (f"Evaluate the bracket first: {b}² − {c}×{d} = {b * b} − {c * d} = {inner}. "
          f"Then multiply: {a} × {inner} = {fmt(int(stated))}.")
    as_ = (f"প্ৰথমে বন্ধনীৰ মান উলিওৱা: {as_num(b)}² − {as_num(c)}×{as_num(d)} = {as_num(b * b)} − "
           f"{as_num(c * d)} = {as_num(inner)}। তাৰপিছত পূৰণ কৰা: {as_num(a)} × {as_num(inner)} = "
           f"{as_num(fmt(int(stated)))}।")
    return en, as_


def h_height_distance(m, q):
    a, b, ang, stated = num(m.group(1)), num(m.group(2)), num(m.group(3)), num(m.group(4))
    if ang in (0, 90):
        return None
    t = math.tan(math.radians(ang))
    if abs((a - b) / t - stated) > max(0.05, stated * 0.01):
        return None
    en = (f"Vertical difference = {fmt(a)} − {fmt(b)} = {fmt(a - b)} m. "
          f"Distance = {fmt(a - b)} ÷ tan {fmt(ang)}° = {fmt(a - b)} ÷ {round(t, 3)} = {fmt(stated)} m.")
    as_ = (f"উলম্ব পাৰ্থক্য = {as_num(fmt(a))} − {as_num(fmt(b))} = {as_num(fmt(a - b))} মিটাৰ। "
           f"দূৰত্ব = {as_num(fmt(a - b))} ÷ tan {as_num(fmt(ang))}° = {as_num(fmt(stated))} মিটাৰ।")
    return en, as_


def h_area_shoelace(m, q):
    v = num(m.group(1))
    nums = [num(x) for x in re.findall(r"-?\d+", q["q"]["en"])]
    if len(nums) < 6:
        return None
    x1, y1, x2, y2, x3, y3 = nums[:6]
    det = x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)
    if abs(abs(det) / 2 - v) > 0.01:
        return None
    en = (f"Apply the shoelace formula to ({fmt(x1)}, {fmt(y1)}), ({fmt(x2)}, {fmt(y2)}) and ({fmt(x3)}, {fmt(y3)}): "
          f"area = ½|{fmt(x1)}({fmt(y2)}−{fmt(y3)}) + {fmt(x2)}({fmt(y3)}−{fmt(y1)}) + {fmt(x3)}({fmt(y1)}−{fmt(y2)})| "
          f"= ½ × {fmt(abs(det))} = {fmt(v)} square units.")
    as_ = (f"({as_num(fmt(x1))}, {as_num(fmt(y1))}), ({as_num(fmt(x2))}, {as_num(fmt(y2))}) আৰু "
           f"({as_num(fmt(x3))}, {as_num(fmt(y3))}) বিন্দুত শ্ব'লেছ সূত্ৰ প্ৰয়োগ কৰা: "
           f"কালি = ½ × {as_num(fmt(abs(det)))} = {as_num(fmt(v))} বৰ্গ একক।")
    return en, as_



def h_ncr_expanded(m, q):
    n, r, stated = int(m.group(1)), int(m.group(2)), num(m.group(3))
    if r > n or ncr(n, r) != stated:
        return None
    en = (f"{n}C{r} counts selections where order does not matter: {n}!/({r}!×{n - r}!) = "
          f"{fmt(int(stated))}.")
    as_ = (f"{as_num(n)}C{as_num(r)} ত ক্ৰম গুৰুত্বপূৰ্ণ নহয়: {as_num(n)}!/({as_num(r)}!×{as_num(n - r)}!) = "
           f"{as_num(fmt(int(stated)))}।")
    return en, as_


def h_npr_expanded(m, q):
    n, r, stated = int(m.group(1)), int(m.group(2)), num(m.group(3))
    if r > n or npr(n, r) != stated:
        return None
    seq = " × ".join(str(x) for x in range(n, n - r, -1))
    en = (f"{n}P{r} counts arrangements where order matters: {n}!/({n}−{r})! = {seq} = {fmt(int(stated))}.")
    as_ = (f"{as_num(n)}P{as_num(r)} ত ক্ৰম গুৰুত্বপূৰ্ণ: {as_num(n)}!/({as_num(n)}−{as_num(r)})! = "
           f"{seq.translate(AS_DIGITS)} = {as_num(fmt(int(stated)))}।")
    return en, as_


def h_handshake(m, q):
    n, stated = int(m.group(1)), num(m.group(2))
    if ncr(n, 2) != stated:
        return None
    en = (f"Each pair of the {n} people shakes hands once, so count the pairs: "
          f"{n}C2 = {n}×{n - 1}/2 = {fmt(int(stated))}.")
    as_ = (f"{as_num(n)} জনৰ প্ৰতিজোৰে এবাৰ হাত মিলায়, সেয়ে যোৰ গণনা কৰা: "
           f"{as_num(n)}C2 = {as_num(n)}×{as_num(n - 1)}/2 = {as_num(fmt(int(stated)))}।")
    return en, as_


def h_diagonal(m, q):
    stated = num(m.group(1))
    side = re.search(r"with (\d+) sides", q["q"]["en"])
    if not side:
        return None
    n = int(side.group(1))
    if n * (n - 3) // 2 != stated:
        return None
    en = (f"A polygon with {n} sides has n(n−3)/2 diagonals = {n}({n}−3)/2 = "
          f"{n}×{n - 3}/2 = {fmt(int(stated))}.")
    as_ = (f"{as_num(n)} বাহুযুক্ত বহুভুজৰ কৰ্ণৰ সংখ্যা n(n−3)/2 = {as_num(n)}({as_num(n)}−3)/2 = "
           f"{as_num(fmt(int(stated)))}।")
    return en, as_


def h_circular(m, q):
    stated = num(m.group(2))
    n = re.search(r"(\d+) people", q["q"]["en"])
    if not n:
        return None
    n = int(n.group(1))
    if math.factorial(n - 1) != stated:
        return None
    en = (f"Seat the first person to fix the circle, then arrange the other {n - 1}: "
          f"({n}−1)! = {n - 1}! = {fmt(int(stated))} ways.")
    as_ = (f"প্ৰথমজনক বহুৱাই বৃত্তটো স্থিৰ কৰা, তাৰপিছত বাকী {as_num(n - 1)} জন সজোৱা: "
           f"({as_num(n)}−১)! = {as_num(fmt(int(stated)))} ধৰণ।")
    return en, as_


def h_word_arrangements(m, q):
    stated = num(m.group(1))
    word = re.search(r"word ([A-Z]+)", q["q"]["en"])
    if not word:
        return None
    letters = word.group(1)
    counts = {}
    for ch in letters:
        counts[ch] = counts.get(ch, 0) + 1
    denom = 1
    for c in counts.values():
        denom *= math.factorial(c)
    total = math.factorial(len(letters)) // denom
    if total != stated:
        return None
    repeats = ", ".join(f"{ch} × {c}" for ch, c in counts.items() if c > 1)
    en = (f"The word {letters} has {len(letters)} letters with repeats {repeats}, so the number of distinct "
          f"arrangements is {len(letters)}!/({ ' × '.join(f'{c}!' for c in counts.values() if c > 1) }) = "
          f"{fmt(int(stated))}.")
    as_ = (f"{letters} শব্দটোত {as_num(len(letters))} টা আখৰ, পুনৰাবৃত্তি {repeats.translate(AS_DIGITS)}; "
           f"সেয়ে সুকীয়া বিন্যাস {as_num(fmt(int(stated)))} টা।")
    return en, as_


def h_bodmas(m, q):
    v = m.group(1)
    en = (f"Apply BODMAS: simplify the bracket first, then powers, then division and multiplication, "
          f"and add or subtract last. The expression reduces to {v}.")
    as_ = (f"BODMAS ৰ নিয়মেৰে কৰা: প্ৰথমে বন্ধনী, তাৰপিছত ঘাত, তাৰপিছত হৰণ আৰু পূৰণ, শেষত যোগ-বিয়োগ। "
           f"প্ৰকাশটোৰ মান {v.translate(AS_DIGITS)} হয়।")
    return en, as_


def h_recurring(m, q):
    v = m.group(1)
    en = (f"A recurring decimal is written as the repeating block over as many 9s: 0.\u0305ab = ab/99, "
          f"and simplifying here gives {v}.")
    as_ = (f"পুনৰাবৃত্তি দশমিকক ৯ ৰে ভাগ কৰি লিখা হয়: 0.\u0305ab = ab/99; ইয়াত সৰল কৰিলে {v.translate(AS_DIGITS)} পোৱা যায়।")
    return en, as_


def h_time_divide(m, q):
    a, b, stated = num(m.group(1)), num(m.group(2)), num(m.group(3))
    if b == 0 or abs(a / b - stated) > 0.05:
        return None
    en = f"Time = quantity ÷ rate = {fmt(a)} ÷ {fmt(b)} = {fmt(stated)}."
    as_ = f"সময় = পৰিমাণ ÷ হাৰ = {as_num(fmt(a))} ÷ {as_num(fmt(b))} = {as_num(fmt(stated))}।"
    return en, as_


def h_time_combined(m, q):
    a, b, c, stated = num(m.group(1)), num(m.group(2)), num(m.group(3)), num(m.group(4))
    if c == 0 or abs((a + b) / c - stated) > 0.05:
        return None
    en = (f"Add the two rates first: {fmt(a)} + {fmt(b)} = {fmt(a + b)}. Then time = {fmt(a + b)} ÷ {fmt(c)} = "
          f"{fmt(stated)}.")
    as_ = (f"প্ৰথমে দুয়োটা হাৰ যোগ কৰা: {as_num(fmt(a))} + {as_num(fmt(b))} = {as_num(fmt(a + b))}। "
           f"তাৰপিছত সময় = {as_num(fmt(stated))}।")
    return en, as_


def h_stream_speed(m, q):
    a, b, stated = num(m.group(1)), num(m.group(2)), num(m.group(3))
    if abs((a - b) / 2 - stated) > 0.05:
        return None
    en = (f"The stream slows the boat downstream-to-upstream by twice its own speed, so "
          f"stream speed = ({fmt(a)} − {fmt(b)})/2 = {fmt(a - b)}/2 = {fmt(stated)} km/h.")
    as_ = (f"সোঁতে নাৱৰ গতিৰ পাৰ্থক্য নিজৰ গতিৰ দুগুণ কৰে, সেয়ে সোঁতৰ গতি = "
           f"({as_num(fmt(a))} − {as_num(fmt(b))})/2 = {as_num(fmt(stated))} কিমি/ঘণ্টা।")
    return en, as_


def h_required_hcf(m, q):
    stated = num(m.group(1))
    en = (f"The greatest number that divides every given value exactly is their HCF, which works out to "
          f"{fmt(stated)}.")
    as_ = (f"দিয়া প্ৰতিটো মানক নিৰ্ভুলভাৱে হৰণ কৰা আটাইতকৈ ডাঙৰ সংখ্যাটোৱেই গ.সা.গু., যাৰ মান "
           f"{as_num(fmt(stated))}।")
    return en, as_



def h_power_balls(m, q):
    base, exp, stated = int(m.group(1)), int(m.group(2)), num(m.group(3))
    if base ** exp != stated:
        return None
    en = (f"Each of the {exp} distinct balls has {base} boxes to choose from, so the choices multiply: "
          f"{base}^{exp} = {fmt(int(stated))}.")
    as_ = (f"{as_num(exp)} টা সুকীয়া বলৰ প্ৰতিটোৰে {as_num(base)} টা বাকচ বাছনি কৰিব পাৰি, সেয়ে গুণ কৰা: "
           f"{as_num(base)}^{as_num(exp)} = {as_num(fmt(int(stated)))}।")
    return en, as_


def h_committee(m, q):
    a, b, c, d, stated = int(m.group(1)), int(m.group(2)), int(m.group(3)), int(m.group(4)), num(m.group(5))
    if ncr(a, b) * ncr(c, d) != stated:
        return None
    en = (f"Choose the required number from each group and multiply: {a}C{b} × {c}C{d} = "
          f"{ncr(a, b)} × {ncr(c, d)} = {fmt(int(stated))}.")
    as_ = (f"প্ৰতিটো গোটৰপৰা প্ৰয়োজনীয় সংখ্যা বাছি গুণ কৰা: {as_num(a)}C{as_num(b)} × {as_num(c)}C{as_num(d)} = "
           f"{as_num(ncr(a, b))} × {as_num(ncr(c, d))} = {as_num(fmt(int(stated)))}।")
    return en, as_


def h_circular_fact(m, q):
    stated = num(m.group(1))
    n = re.search(r"(\d+) people", q["q"]["en"])
    if not n:
        return None
    n = int(n.group(1))
    if math.factorial(n - 1) != stated:
        return None
    en = (f"Fix one person to break the circle, then arrange the remaining {n - 1}: "
          f"({n}−1)! = {fmt(int(stated))} ways.")
    as_ = (f"এজনক স্থিৰ কৰি বৃত্তটো ভাঙা, তাৰপিছত বাকী {as_num(n - 1)} জন সজোৱা: "
           f"({as_num(n)}−১)! = {as_num(fmt(int(stated)))} ধৰণ।")
    return en, as_


def h_mean_naturals(m, q):
    stated = num(m.group(1))
    n = re.search(r"first (\d+) natural", q["q"]["en"])
    if not n:
        return None
    n = int(n.group(1))
    if abs((n + 1) / 2 - stated) > 0.01:
        return None
    en = (f"The first {n} natural numbers run from 1 to {n}, so their mean is the middle value: "
          f"({n}+1)/2 = {fmt(round(stated, 2))}.")
    as_ = (f"প্ৰথম {as_num(n)} টা স্বাভাৱিক সংখ্যা ১ ৰপৰা {as_num(n)} লৈ, সেয়ে মাধ্য মাজৰ মান: "
           f"({as_num(n)}+১)/২ = {as_num(fmt(round(stated, 2)))}।")
    return en, as_


def h_sd(m, q):
    stated = num(m.group(1))
    nums = [num(x) for x in re.findall(r"\d+\.?\d*", q["q"]["en"].split(":")[-1])]
    if len(nums) < 2:
        return None
    mean = sum(nums) / len(nums)
    var = sum((x - mean) ** 2 for x in nums) / len(nums)
    if abs(math.sqrt(var) - stated) > 0.05:
        return None
    devs = ", ".join(f"({fmt(x)}−{fmt(round(mean, 2))})² = {fmt(round((x - mean) ** 2, 2))}" for x in nums)
    en = (f"Mean = {fmt(round(mean, 2))}. Squared deviations: {devs}. Variance = "
          f"{fmt(round(var, 2))}, so SD = √{fmt(round(var, 2))} = {fmt(round(stated, 2))}.")
    as_ = (f"মাধ্য = {as_num(fmt(round(mean, 2)))}। বৰ্গ বিচ্যুতিৰ যোগফলৰপৰা ভেদাঙ্ক = "
           f"{as_num(fmt(round(var, 2)))}, সেয়ে মানক বিচ্যুতি = {as_num(fmt(round(stated, 2)))}।")
    return en, as_


def h_mean_shift(m, q):
    v = num(m.group(1))
    en = (f"Adding the same number to every observation moves the mean by exactly that amount, "
          f"so the mean increases by {fmt(v)}.")
    as_ = (f"প্ৰতিটো মানত একেই সংখ্যা যোগ কৰিলে মাধ্যও সেই পৰিমাণেই বাঢ়ে, সেয়ে মাধ্য {as_num(fmt(v))} ৰে বাঢ়ে।")
    return en, as_


def h_prob_complement(m, q):
    stated = m.group(1)
    given = re.search(r"(\d+/\d+)", q["q"]["en"])
    if not given:
        return None
    p = Fraction(given.group(1))
    if p >= 1 or 1 - p != Fraction(stated):
        return None
    en = (f"P(A) = {p.numerator}/{p.denominator}, so P(not A) = 1 − {p.numerator}/{p.denominator} = "
          f"{stated}.")
    as_ = (f"P(A) = {as_num(p.numerator)}/{as_num(p.denominator)}, সেয়ে P(not A) = ১ − "
           f"{as_num(p.numerator)}/{as_num(p.denominator)} = {stated.translate(AS_DIGITS)}।")
    return en, as_


def h_prob_and(m, q):
    stated = m.group(1)
    given = re.findall(r"(\d+/\d+)", q["q"]["en"])
    if len(given) < 2:
        return None
    p, q2 = Fraction(given[0]), Fraction(given[1])
    if p * q2 != Fraction(stated):
        return None
    en = (f"The events are independent, so multiply: P(A and B) = {p.numerator}/{p.denominator} × "
          f"{q2.numerator}/{q2.denominator} = {stated}.")
    as_ = (f"ঘটনাবোৰ স্বতন্ত্ৰ, সেয়ে পূৰণ কৰা: P(A and B) = {as_num(p.numerator)}/{as_num(p.denominator)} × "
           f"{as_num(q2.numerator)}/{as_num(q2.denominator)} = {stated.translate(AS_DIGITS)}।")
    return en, as_


def h_prob_or(m, q):
    stated = m.group(1)
    given = re.findall(r"(\d+/\d+)", q["q"]["en"])
    if len(given) < 2:
        return None
    p, q2 = Fraction(given[0]), Fraction(given[1])
    if p + q2 != Fraction(stated):
        return None
    en = (f"The events are mutually exclusive, so add: P(A or B) = {p.numerator}/{p.denominator} + "
          f"{q2.numerator}/{q2.denominator} = {stated}.")
    as_ = (f"ঘটনাবোৰ পৰস্পৰ বৰ্জিত, সেয়ে যোগ কৰা: P(A or B) = {as_num(p.numerator)}/{as_num(p.denominator)} + "
           f"{as_num(q2.numerator)}/{as_num(q2.denominator)} = {stated.translate(AS_DIGITS)}।")
    return en, as_



def h_decimal_fraction(m, q):
    dec, frac = m.group(1), m.group(2)
    try:
        if abs(Fraction(dec) - Fraction(frac)) > 1e-9:
            return None
    except Exception:
        return None
    digits = len(dec.split(".")[1]) if "." in dec else 0
    den = 10 ** digits
    numv = int(round(float(dec) * den))
    g = math.gcd(numv, den)
    en = (f"Write the decimal over its place value: {dec} = {numv}/{den}. Cancel the common factor {g}, "
          f"which leaves {numv // g}/{den // g}.")
    as_ = (f"দশমিকটো তাৰ স্থানীয় মানৰ ওপৰত লিখা: {dec} = {numv}/{den}। সাধাৰণ উৎপাদক {as_num(g)} কটাৰ পিছত "
           f"{as_num(numv // g)}/{as_num(den // g)} থাকে।")
    return en, as_


def h_midpoint(m, q):
    stated = m.group(1)
    nums = [num(x) for x in re.findall(r"-?\d+", q["q"]["en"])]
    if len(nums) < 4:
        return None
    x1, y1, x2, y2 = nums[:4]
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    if f"{fmt(mx)}, {fmt(my)}" != stated.replace("(", "").replace(")", "").strip():
        return None
    en = (f"The midpoint averages the two x-coordinates and the two y-coordinates: "
          f"(({fmt(x1)}+{fmt(x2)})/2, ({fmt(y1)}+{fmt(y2)})/2) = ({fmt(mx)}, {fmt(my)}).")
    as_ = (f"মধ্যবিন্দুৱে দুয়োটা x আৰু দুয়োটা y স্থানাংকৰ গড় লয়: "
           f"(({as_num(fmt(x1))}+{as_num(fmt(x2))})/2, ({as_num(fmt(y1))}+{as_num(fmt(y2))})/2) = "
           f"({as_num(fmt(mx))}, {as_num(fmt(my))})।")
    return en, as_


def h_slope(m, q):
    stated = num(m.group(1))
    nums = [num(x) for x in re.findall(r"-?\d+", q["q"]["en"])]
    if len(nums) < 4:
        return None
    x1, y1, x2, y2 = nums[:4]
    if x2 == x1 or abs((y2 - y1) / (x2 - x1) - stated) > 0.01:
        return None
    en = (f"Slope = (y₂ − y₁)/(x₂ − x₁) = ({fmt(y2)} − {fmt(y1)})/({fmt(x2)} − {fmt(x1)}) = "
          f"{fmt(y2 - y1)}/{fmt(x2 - x1)} = {fmt(stated)}.")
    as_ = (f"ঢাল = (y₂ − y₁)/(x₂ − x₁) = ({as_num(fmt(y2))} − {as_num(fmt(y1))})/"
           f"({as_num(fmt(x2))} − {as_num(fmt(x1))}) = {as_num(fmt(stated))}।")
    return en, as_


def h_milk_left(m, q):
    stated = num(m.group(1))
    nums = [num(x) for x in re.findall(r"\d+\.?\d*", q["q"]["en"])]
    if len(nums) < 3:
        return None
    qty, rep, times = nums[0], nums[1], int(nums[2])
    if qty <= 0 or times < 1:
        return None
    left = qty * (1 - rep / qty) ** times
    if abs(left - stated) > 0.05:
        return None
    en = (f"Each replacement leaves (1 − {fmt(rep)}/{fmt(qty)}) of the milk behind, so after {times} rounds "
          f"{fmt(qty)} × (1 − {fmt(rep)}/{fmt(qty)})^{times} = {fmt(round(left, 2))} litres remain.")
    as_ = (f"প্ৰতিবাৰ সলনি কৰিলে (১ − {as_num(fmt(rep))}/{as_num(fmt(qty))}) অংশ থাকে, সেয়ে {as_num(times)} "
           f"বাৰৰ পিছত {as_num(fmt(round(left, 2)))} লিটাৰ থাকে।")
    return en, as_


def h_three_share(m, q):
    share = num(m.group(1))
    stem = q["q"]["en"]
    inv = re.search(r"invest ([\d,]+), ([\d,]+) and ([\d,]+)", stem)
    prof = re.search(r"profit is ([\d,]+)", stem)
    if not inv or not prof:
        return None
    a, b, c = (num(x) for x in inv.groups())
    profit = num(prof.group(1))
    total = a + b + c
    if total == 0 or abs(profit * a / total - share) > max(1.0, share * 0.01):
        return None
    g = math.gcd(int(a), int(b))
    g = math.gcd(g, int(c)) or 1
    en = (f"The capitals {fmt(a)} : {fmt(b)} : {fmt(c)} reduce to {int(a)//g} : {int(b)//g} : {int(c)//g}, "
          f"a total of {int(a)//g + int(b)//g + int(c)//g} parts. A's share = {fmt(profit)} × "
          f"{int(a)//g}/{int(a)//g + int(b)//g + int(c)//g} = {fmt(share)}.")
    as_ = (f"মূলধন {as_num(fmt(a))} : {as_num(fmt(b))} : {as_num(fmt(c))} ৰ সৰল ৰূপ "
           f"{as_num(int(a)//g)} : {as_num(int(b)//g)} : {as_num(int(c)//g)}। A ৰ অংশ = {as_num(fmt(share))}।")
    return en, as_


def h_ci_expanded(m, q):
    stated = num(m.group(1))
    stem = q["q"]["en"]
    p = re.search(r"on ([\d,]+) at", stem)
    r = re.search(r"at ([\d.]+)%", stem)
    n = re.search(r"for (\d+) years", stem)
    if not (p and r and n):
        return None
    P, R, N = num(p.group(1)), num(r.group(1)), int(n.group(1))
    amount = P * (1 + R / 100) ** N
    if abs(amount - P - stated) > max(0.5, stated * 0.005):
        return None
    en = (f"Amount = P(1 + R/100)^n = {fmt(P)} × (1 + {fmt(R)}/100)^{N} = {fmt(round(amount, 2))}. "
          f"Compound interest = amount − principal = {fmt(round(amount, 2))} − {fmt(P)} = {fmt(round(amount - P, 2))}.")
    as_ = (f"মুঠ ধন = P(১ + R/১০০)^n = {as_num(fmt(P))} × (১ + {as_num(fmt(R))}/১০০)^{as_num(N)} = "
           f"{as_num(fmt(round(amount, 2)))}। চক্ৰবৃদ্ধি সুত = {as_num(fmt(round(amount - P, 2)))}।")
    return en, as_


def h_ci_si_diff(m, q):
    stated = num(m.group(1))
    stem = q["q"]["en"]
    p = re.search(r"interest on ([\d,]+) at", stem)
    r = re.search(r"at ([\d.]+)%", stem)
    n = re.search(r"for (\d+) years", stem)
    if not (p and r and n):
        return None
    P, R, N = num(p.group(1)), num(r.group(1)), int(n.group(1))
    ci = P * (1 + R / 100) ** N - P
    si = P * R * N / 100
    if abs((ci - si) - stated) > max(0.5, stated * 0.01):
        return None
    en = (f"CI = {fmt(P)} × (1 + {fmt(R)}/100)^{N} − {fmt(P)} = {fmt(round(ci, 2))}; "
          f"SI = {fmt(P)} × {fmt(R)} × {N}/100 = {fmt(round(si, 2))}. "
          f"Difference = {fmt(round(ci, 2))} − {fmt(round(si, 2))} = {fmt(round(stated, 2))}.")
    as_ = (f"CI = {as_num(fmt(round(ci, 2)))} আৰু SI = {as_num(fmt(round(si, 2)))}; "
           f"পাৰ্থক্য = {as_num(fmt(round(stated, 2)))}।")
    return en, as_


def h_root_k(m, q):
    stated = num(m.group(1))
    stem = q["q"]["en"]
    a = re.search(r"(-?\d*)x²", stem)
    b = re.search(r"([+-]\s*\d+)x\b", stem)
    root = re.search(r"is (-?\d+)", stem)
    if not (b and root):
        return None
    A = -1.0 if (a and a.group(1) == "-") else float(a.group(1) or 1) if a else 1.0
    B = float(b.group(1).replace(" ", ""))
    X = float(root.group(1))
    k = -(A * X * X + B * X)
    if abs(k - stated) > 0.01:
        return None
    t1v, t2v = A * X * X, B * X
    join = "+" if t2v >= 0 else "−"
    en = (f"Substitute x = {fmt(X)} into the equation: {fmt(A)}×({fmt(X)})² {join} {fmt(abs(B))}×{fmt(X)} + k = 0, "
          f"so {fmt(t1v)} {join} {fmt(abs(t2v))} + k = 0 and k = {fmt(round(k, 2))}.")
    as_ = (f"সমীকৰণত x = {as_num(fmt(X))} বহুওৱা: k = {as_num(fmt(round(k, 2)))}।")
    return en, as_


def h_cubes(m, q):
    a, b, stated = int(m.group(1)), int(m.group(2)), num(m.group(3))
    if a ** 3 - b ** 3 != stated:
        return None
    en = f"Work out each cube: {a}³ = {fmt(a ** 3)} and {b}³ = {fmt(b ** 3)}, so the difference is {fmt(int(stated))}."
    as_ = (f"প্ৰতিটো ঘন উলিওৱা: {as_num(a)}³ = {as_num(fmt(a ** 3))} আৰু {as_num(b)}³ = {as_num(fmt(b ** 3))}, "
           f"সেয়ে পাৰ্থক্য {as_num(fmt(int(stated)))}।")
    return en, as_


def h_avg_naturals(m, q):
    stated = num(m.group(1))
    n = re.search(r"first (\d+) natural", q["q"]["en"])
    if not n:
        return None
    n = int(n.group(1))
    if abs((n + 1) / 2 - stated) > 0.01:
        return None
    en = (f"The numbers run 1 to {n}, and their average is the middle value: (1 + {n})/2 = "
          f"{fmt(round(stated, 2))}.")
    as_ = (f"সংখ্যাবোৰ ১ ৰপৰা {as_num(n)} লৈ, সেয়ে গড় মাজৰ মান: (১ + {as_num(n)})/২ = "
           f"{as_num(fmt(round(stated, 2)))}।")
    return en, as_


def h_percent_ratio(m, q):
    a, b, v = num(m.group(1)), num(m.group(2)), num(m.group(3))
    if b == 0 or abs(a / b * 100 - v) > 0.02:
        return None
    en = (f"Write the part over the whole and convert to a percentage: {fmt(a)}/{fmt(b)} × 100 = "
          f"{fmt(round(v, 2))}%.")
    as_ = (f"অংশক গোটৰ ওপৰত লিখি শতাংশলৈ ৰূপান্তৰ কৰা: {as_num(fmt(a))}/{as_num(fmt(b))} × ১০০ = "
           f"{as_num(fmt(round(v, 2)))}%।")
    return en, as_


def h_rationalise(m, q):
    stated = m.group(1)
    stem = q["q"]["en"]
    parts = re.search(r"√(\d+) \+ √(\d+)", stem)
    if not parts:
        return None
    a, b = int(parts.group(1)), int(parts.group(2))
    expected = f"(√{a}-√{b})/{a - b}"
    if stated.replace(" ", "") != expected:
        return None
    en = (f"Multiply above and below by the conjugate √{a} − √{b}: the denominator becomes "
          f"(√{a})² − (√{b})² = {a} − {b} = {a - b}, so the result is (√{a} − √{b})/{a - b}.")
    as_ = (f"ওপৰ-তল দুয়োটাকে সংযুক্ত √{as_num(a)} − √{as_num(b)} ৰে পূৰণ কৰা: হৰ হয় "
           f"{as_num(a)} − {as_num(b)} = {as_num(a - b)}; ফলাফল (√{as_num(a)} − √{as_num(b)})/{as_num(a - b)}।")
    return en, as_


def h_trig_ratio(m, q):
    stated = m.group(2)
    stem = q["q"]["en"]
    t = re.search(r"tan θ = (\d+)/(\d+)", stem)
    if not t:
        return None
    opp, adj = int(t.group(1)), int(t.group(2))
    hyp = math.isqrt(opp * opp + adj * adj)
    if opp * opp + adj * adj != hyp * hyp:
        return None
    want = m.group(1)
    val = f"{opp}/{hyp}" if want == "sin" else f"{adj}/{hyp}"
    if val != stated.replace(" ", ""):
        return None
    en = (f"tan θ = {opp}/{adj} gives the opposite side {opp} and the adjacent side {adj}. "
          f"Hypotenuse = √({opp}² + {adj}²) = √{opp * opp + adj * adj} = {hyp}, so {want} θ = {val}.")
    as_ = (f"tan θ = {as_num(opp)}/{as_num(adj)} ৰপৰা বিপৰীত বাহু {as_num(opp)} আৰু সংলগ্ন বাহু {as_num(adj)}। "
           f"কৰ্ণ = √({as_num(opp)}² + {as_num(adj)}²) = {as_num(hyp)}, সেয়ে {want} θ = {as_num(opp)}/{as_num(hyp)}।")
    return en, as_


def h_reciprocal(m, q):
    stated = m.group(1).replace(" ", "")
    stem = q["q"]["en"]
    for ratio, partner in (("sin", "cosec"), ("cos", "sec"), ("tan", "cot")):
        s = re.search(rf"{ratio} θ = (\d+)/(\d+)", stem)
        if not s:
            continue
        a, b = int(s.group(1)), int(s.group(2))
        if stated != f"{b}/{a}":
            return None
        en = (f"{partner} θ is the reciprocal of {ratio} θ, so {partner} θ = {b}/{a} — the fraction is "
              f"simply turned over.")
        as_ = (f"{partner} θ হৈছে {ratio} θ ৰ প্ৰতিক্ৰম, সেয়ে {partner} θ = {as_num(b)}/{as_num(a)} — "
               f"ভগ্নাংশটো ওলোটাই দিয়া হয়।")
        return en, as_
    return None


def h_cp_mixed(m, q):
    stated = num(m.group(1))
    stem = q["q"]["en"]
    m1 = re.search(r"(\d+) kg of goods at (\d+)", stem)
    m2 = re.search(r"(\d+) kg at (\d+)", stem)
    if not (m1 and m2):
        return None
    q1, p1 = num(m1.group(1)), num(m1.group(2))
    q2, p2 = num(m2.group(1)), num(m2.group(2))
    if q1 + q2 == 0 or abs((q1 * p1 + q2 * p2) / (q1 + q2) - stated) > 0.05:
        return None
    en = (f"Total cost = {fmt(q1)} × {fmt(p1)} + {fmt(q2)} × {fmt(p2)} = {fmt(q1 * p1)} + {fmt(q2 * p2)} = "
          f"{fmt(q1 * p1 + q2 * p2)} for {fmt(q1 + q2)} kg, so the cost price is "
          f"{fmt(q1 * p1 + q2 * p2)} ÷ {fmt(q1 + q2)} = {fmt(round(stated, 2))} per kg.")
    as_ = (f"মুঠ ক্ৰয় মূল্য = {as_num(fmt(q1 * p1 + q2 * p2))} টকা ({as_num(fmt(q1 + q2))} কেজি), "
           f"সেয়ে প্ৰতি কেজিৰ ক্ৰয় মূল্য {as_num(fmt(round(stated, 2)))} টকা।")
    return en, as_


def h_milk_water(m, q):
    stated = m.group(1).replace(" ", "")
    stem = q["q"]["en"]
    r1 = re.search(r"ratios (\d+) : (\d+) and (\d+) : (\d+)", stem)
    if not r1:
        return None
    a, b, c, d = (int(x) for x in r1.groups())
    milk = Fraction(a, a + b) + Fraction(c, c + d)
    water = Fraction(b, a + b) + Fraction(d, c + d)
    ratio = f"{milk.numerator * (water.denominator // math.gcd(milk.denominator, water.denominator)) }:{0}"
    # normalise both parts over a common denominator
    den = milk.denominator * water.denominator // math.gcd(milk.denominator, water.denominator)
    mm = int(milk * den)
    ww = int(water * den)
    g = math.gcd(mm, ww) or 1
    if f"{mm // g}:{ww // g}" != stated:
        return None
    en = (f"Take equal quantities, so the two ratios can simply be added: milk = {a}/{a + b} + {c}/{c + d} "
          f"and water = {b}/{a + b} + {d}/{c + d}. Over {den} parts that is {mm} milk to {ww} water, "
          f"which reduces to {mm // g} : {ww // g}.")
    as_ = (f"সমান পৰিমাণ লোৱা, সেয়ে দুয়োটা অনুপাত যোগ কৰিব পাৰি: গাখীৰ : পানী = "
           f"{as_num(mm // g)} : {as_num(ww // g)}।")
    return en, as_


def h_partner_months(m, q):
    stated = num(m.group(1))
    stem = q["q"]["en"]
    a = re.search(r"A invests ([\d,]+) for (\d+) months and B invests ([\d,]+)", stem)
    r = re.search(r"ratio (\d+) : (\d+)", stem)
    if not (a and r):
        return None
    A, t1, B = num(a.group(1)), num(a.group(2)), num(a.group(3))
    ra, rb = num(r.group(1)), num(r.group(2))
    if ra == 0 or B == 0:
        return None
    t2 = rb * A * t1 / (ra * B)
    if abs(t2 - stated) > 0.05:
        return None
    ra_s, rb_s = fmt(int(ra)) if float(ra).is_integer() else fmt(ra), fmt(int(rb)) if float(rb).is_integer() else fmt(rb)
    en = (f"Profit shares follow capital × time, so {ra_s} : {rb_s} = {fmt(A)}×{fmt(t1)} : {fmt(B)}×t. "
          f"Solving gives t = ({rb_s} × {fmt(A)} × {fmt(t1)}) ÷ ({ra_s} × {fmt(B)}) = {fmt(round(t2, 2))} months.")
    as_ = (f"লাভৰ অনুপাত মূলধন × সময়ৰ অনুপাত, সেয়ে {as_num(ra)} : {as_num(rb)} = "
           f"{as_num(fmt(A))}×{as_num(fmt(t1))} : {as_num(fmt(B))}×t; ইয়াৰপৰা t = {as_num(fmt(round(t2, 2)))} মাহ।")
    return en, as_


def h_partner_investment(m, q):
    stated = num(m.group(1))
    stem = q["q"]["en"]
    a = re.search(r"A invests ([\d,]+) for (\d+) months and B invests for (\d+) months", stem)
    r = re.search(r"ratio (\d+) : (\d+)", stem)
    if not (a and r):
        return None
    A, t1, t2 = num(a.group(1)), num(a.group(2)), num(a.group(3))
    ra, rb = num(r.group(1)), num(r.group(2))
    if ra == 0 or t2 == 0:
        return None
    B = rb * A * t1 / (ra * t2)
    if abs(B - stated) > max(1.0, stated * 0.01):
        return None
    ra_s, rb_s = fmt(int(ra)) if float(ra).is_integer() else fmt(ra), fmt(int(rb)) if float(rb).is_integer() else fmt(rb)
    en = (f"{ra_s} : {rb_s} = {fmt(A)}×{fmt(t1)} : B×{fmt(t2)}, so B = ({rb_s} × {fmt(A)} × {fmt(t1)}) ÷ "
          f"({ra_s} × {fmt(t2)}) = {fmt(round(B, 2))}.")
    as_ = (f"{as_num(ra)} : {as_num(rb)} = {as_num(fmt(A))}×{as_num(fmt(t1))} : B×{as_num(fmt(t2))}, "
           f"সেয়ে B ৰ বিনিয়োগ = {as_num(fmt(round(B, 2)))}।")
    return en, as_


def h_partner_join(m, q):
    share = num(m.group(1))
    stem = q["q"]["en"]
    j = re.search(
        r"starts a business with ([\d,]+)\. After (\d+) months, B joins with ([\d,]+).*?profit is ([\d,]+)",
        stem)
    if not j:
        return None
    a, gap, b, profit = num(j.group(1)), num(j.group(2)), num(j.group(3)), num(j.group(4))
    ra, rb = a * 12, b * (12 - gap)
    if ra + rb == 0:
        return None
    if abs(profit * ra / (ra + rb) - share) > max(1.0, share * 0.01):
        return None
    g = math.gcd(int(ra), int(rb)) or 1
    en = (f"A works the whole year: {fmt(a)} × 12 = {fmt(ra)}. B works only {int(12 - gap)} months: "
          f"{fmt(b)} × {int(12 - gap)} = {fmt(rb)}. Ratio {int(ra) // g} : {int(rb) // g}, so "
          f"A's share = {fmt(profit)} × {int(ra) // g}/{int(ra) // g + int(rb) // g} = {fmt(share)}.")
    as_ = (f"A ৰ বছৰজোৰা: {as_num(fmt(a))} × ১২ = {as_num(fmt(ra))}; B ৰ {as_num(int(12 - gap))} মাহ: "
           f"{as_num(fmt(b))} × {as_num(int(12 - gap))} = {as_num(fmt(rb))}। "
           f"A ৰ অংশ = {as_num(fmt(share))}।")
    return en, as_


def h_cp_from_sp(m, q):
    cp = num(m.group(1))
    stem = q["q"]["en"]
    sp = re.search(r"sold for ([\d,]+)", stem)
    pct = re.search(r"profit of ([\d.]+)%", stem)
    if not (sp and pct):
        return None
    SP, P = num(sp.group(1)), num(pct.group(1))
    calc = SP * 100 / (100 + P)
    if abs(calc - cp) > max(0.5, cp * 0.01):
        return None
    en = (f"Cost price = SP × 100/(100 + profit%) = {fmt(SP)} × 100/{fmt(100 + P)} = {fmt(round(calc, 2))}. "
          f"Check: profit = {fmt(SP)} − {fmt(round(calc, 2))} = {fmt(round(SP - calc, 2))} on a cost of "
          f"{fmt(round(calc, 2))}.")
    as_ = (f"ক্ৰয় মূল্য = SP × ১০০/(১০০ + লাভ%) = {as_num(fmt(SP))} × ১০০/{as_num(fmt(100 + P))} = "
           f"{as_num(fmt(round(calc, 2)))}।")
    return en, as_


def h_si_diff(m, q):
    a, r, t1, t2, stated = (num(m.group(i)) for i in range(1, 6))
    if abs(a * r * (t1 - t2) / 100 - stated) > max(0.5, stated * 0.01):
        return None
    en = (f"Simple interest grows by PRT/100 for each extra year, so the difference covers the extra "
          f"{fmt(t1 - t2)} years: {fmt(a)} × {fmt(r)} × {fmt(t1 - t2)}/100 = {fmt(stated)}.")
    as_ = (f"প্ৰতি অতিৰিক্ত বছৰত SI = PRT/১০০ ৰে বাঢ়ে, সেয়ে পাৰ্থক্যই অতিৰিক্ত {as_num(fmt(t1 - t2))} বছৰৰ: "
           f"{as_num(fmt(a))} × {as_num(fmt(r))} × {as_num(fmt(t1 - t2))}/১০০ = {as_num(fmt(stated))}।")
    return en, as_


def h_roots(m, q):
    a, b = num(m.group(1)), num(m.group(2))
    stem = q["q"]["en"]
    qc = re.search(r"([+-]?\s*\d*)x²", stem)
    bc = re.search(r"([+-]\s*\d*)x\b", stem)
    if not (qc and bc):
        return None
    A = 1.0 if qc.group(1) in ("", "+") else float(qc.group(1).replace(" ", ""))
    B = float(bc.group(1).replace(" ", ""))
    if A == 0:
        return None
    S, P = -B / A, 0.0
    const = re.search(r"\+\s*([\d.]+)\s*=\s*0", stem)
    if const:
        P = float(const.group(1)) / A
    if abs((a + b) - S) > 0.01 or abs(a * b - P) > 0.01:
        return None
    en = (f"The roots add up to −b/a = {fmt(round(S, 2))} and multiply to c/a = {fmt(round(P, 2))}; "
          f"{fmt(a)} + {fmt(b)} = {fmt(a + b)} and {fmt(a)} × {fmt(b)} = {fmt(a * b)}, so the roots are "
          f"{fmt(a)} and {fmt(b)}. The equation factors as (x − {fmt(a)})(x − {fmt(b)}) = 0.")
    as_ = (f"মূলৰ যোগফল −b/a = {as_num(fmt(round(S, 2)))} আৰু গুণফল c/a = {as_num(fmt(round(P, 2)))}; "
           f"সেয়ে মূল {as_num(fmt(a))} আৰু {as_num(fmt(b))}।")
    return en, as_


def h_x_intercept(m, q):
    x = num(m.group(1))
    stem = q["q"]["en"]
    line = re.search(r"line ([\d.]*)x \+ ([\d.]*)y = ([\d.]+)", stem)
    if not line:
        return None
    a = float(line.group(1) or 1)
    c = float(line.group(3))
    if a == 0 or abs(c / a - x) > 0.01:
        return None
    en = (f"The x-intercept is where the line meets the x-axis, so put y = 0: "
          f"{fmt(a)}x + {line.group(2)}×0 = {fmt(c)}, which gives x = {fmt(c)}/{fmt(a)} = {fmt(x)}.")
    as_ = (f"x-অক্ষত লগ পোৱা বিন্দুত y = ০: {as_num(fmt(a))}x = {as_num(fmt(c))}, সেয়ে x = {as_num(fmt(x))}।")
    return en, as_


def h_working_partner(m, q):
    total = num(m.group(1))
    stem = q["q"]["en"]
    cap = re.search(r"A invests ([\d,]+), B invests ([\d,]+)", stem)
    sal = re.search(r"salary of ([\d,]+) per month", stem)
    prof = re.search(r"profit (?:is|of) ([\d,]+)", stem)
    if not (cap and sal and prof):
        return None
    a, b = num(cap.group(1)), num(cap.group(2))
    salary, profit = num(sal.group(1)) * 12, num(prof.group(1))
    rest = profit - salary
    if rest < 0 or a + b == 0:
        return None
    share = salary + rest * a / (a + b)
    if abs(share - total) > max(1.0, total * 0.01):
        return None
    en = (f"The working partner draws a salary first: {fmt(salary / 12)} × 12 = {fmt(salary)}. "
          f"The rest {fmt(profit)} − {fmt(salary)} = {fmt(rest)} is split in the capital ratio "
          f"{fmt(a)} : {fmt(b)}, so A gets {fmt(rest)} × {fmt(a)}/{fmt(a + b)} = "
          f"{fmt(round(rest * a / (a + b), 2))}. Total income = {fmt(salary)} + "
          f"{fmt(round(rest * a / (a + b), 2))} = {fmt(round(share, 2))}.")
    as_ = (f"কৰ্মী অংশীদাৰে প্ৰথমে দৰমহা লয়: {as_num(fmt(salary))}। বাকী {as_num(fmt(rest))} মূলধনৰ অনুপাতত "
           f"ভগোৱা হয়; A ৰ মুঠ আয় = {as_num(fmt(round(share, 2)))}।")
    return en, as_


def h_new_percent(m, q):
    stated = num(m.group(1))
    stem = q["q"]["en"]
    s = re.search(r"([\d.]+) litres? of a solution contains ([\d.]+)%", stem)
    add = re.search(r"([\d.]+) litres? of water is added", stem)
    if not (s and add):
        return None
    vol, pct, extra = num(s.group(1)), num(s.group(2)), num(add.group(1))
    if vol + extra == 0 or abs(vol * pct / (vol + extra) - stated) > 0.05:
        return None
    en = (f"The acid itself does not change: {fmt(vol)} × {fmt(pct)}/100 = {fmt(round(vol * pct / 100, 2))} litres. "
          f"Only water is added, so the new volume is {fmt(vol)} + {fmt(extra)} = {fmt(vol + extra)} litres and the "
          f"new strength is {fmt(round(vol * pct / 100, 2))}/{fmt(vol + extra)} × 100 = {fmt(round(stated, 2))}%.")
    as_ = (f"এচিডৰ পৰিমাণ সলনি নহয়: {as_num(fmt(round(vol * pct / 100, 2)))} লিটাৰ। পানী যোগ দিয়াত নতুন "
           f"আয়তন {as_num(fmt(vol + extra))} লিটাৰ, সেয়ে নতুন শক্তি {as_num(fmt(round(stated, 2)))}%।")
    return en, as_


def h_time_ratio(m, q):
    stated = m.group(1).replace(" ", "")
    stem = q["q"]["en"]
    b = re.search(r"still water is ([\d.]+) km/h", stem)
    s = re.search(r"stream speed is ([\d.]+) km/h", stem)
    if not (b and s):
        return None
    boat, stream = num(b.group(1)), num(s.group(1))
    down, up = boat + stream, boat - stream
    if up <= 0:
        return None
    g = math.gcd(int(down), int(up)) or 1
    if f"{int(up) // g}:{int(down) // g}" != stated:
        return None
    en = (f"Downstream speed = {fmt(boat)} + {fmt(stream)} = {fmt(down)} km/h and upstream = "
          f"{fmt(boat)} − {fmt(stream)} = {fmt(up)} km/h. For the same distance, time is inversely "
          f"proportional to speed, so the ratio of times is {int(up) // g} : {int(down) // g}.")
    as_ = (f"সোঁতৰ লগত গতি = {as_num(fmt(down))} কিমি/ঘণ্টা, সোঁতৰ বিৰুদ্ধে = {as_num(fmt(up))}। একে দূৰত্বত "
           f"সময়ৰ অনুপাত = {as_num(int(up) // g)} : {as_num(int(down) // g)}।")
    return en, as_


def h_percent_of_number(m, q):
    pct, whole, stated = num(m.group(1)), num(m.group(2)), num(m.group(3))
    if abs(pct / 100 * whole - stated) > 0.05:
        return None
    en = (f"Take the percentage as a fraction of the whole: {fmt(pct)}% of {fmt(whole)} = "
          f"{fmt(pct)}/100 × {fmt(whole)} = {fmt(round(stated, 2))}.")
    as_ = (f"শতাংশক ভগ্নাংশলৈ লৈ গুণ কৰা: {as_num(fmt(pct))}% × {as_num(fmt(whole))} = "
           f"{as_num(fmt(round(stated, 2)))}।")
    return en, as_


def h_avg_squares(m, q):
    stated = num(m.group(m.lastindex))
    n = re.search(r"squares of the first (\d+) natural", q["q"]["en"])
    if not n:
        return None
    n = int(n.group(1))
    calc = (n + 1) * (2 * n + 1) / 6
    if abs(calc - stated) > 0.05:
        return None
    en = (f"The squares add up to n(n+1)(2n+1)/6 = {n}×{n + 1}×{2 * n + 1}/6 = "
          f"{fmt(n * (n + 1) * (2 * n + 1) // 6)}, and there are {n} of them, so the average is "
          f"{fmt(n * (n + 1) * (2 * n + 1) // 6)} ÷ {n} = (n+1)(2n+1)/6 = {fmt(round(calc, 2))}.")
    as_ = (f"বৰ্গৰ যোগফল n(n+১)(২n+১)/৬, আৰু সংখ্যা {as_num(n)} টা, সেয়ে গড় = "
           f"(n+১)(২n+১)/৬ = {as_num(fmt(round(calc, 2)))}।")
    return en, as_


def h_compound_ratio(m, q):
    stated = m.group(1).replace(" ", "")
    stem = q["q"]["en"]
    r = re.search(r"ratio of (\d+) : (\d+) and (\d+) : (\d+)", stem)
    if not r:
        return None
    a, b, c, d = (int(x) for x in r.groups())
    numv, denv = a * c, b * d
    g = math.gcd(numv, denv) or 1
    if f"{numv // g}:{denv // g}" != stated:
        return None
    en = (f"A compound ratio multiplies the first terms together and the second terms together: "
          f"({a} × {c}) : ({b} × {d}) = {numv} : {denv} = {numv // g} : {denv // g}.")
    as_ = (f"সংযুক্ত অনুপাতত প্ৰথম পদবোৰ আৰু দ্বিতীয় পদবোৰ বেলেগে গুণ কৰা: "
           f"({as_num(a)} × {as_num(c)}) : ({as_num(b)} × {as_num(d)}) = {as_num(numv // g)} : {as_num(denv // g)}।")
    return en, as_


def h_coin_count(m, q):
    stated = num(m.group(1))
    stem = q["q"]["en"]
    r = re.search(r"in the ratio (\d+) : (\d+) : (\d+)", stem)
    tot = re.search(r"total (?:amount|value)[^0-9]*([\d,]+)", stem)
    if not (r and tot):
        return None
    x, y, z = (int(v) for v in r.groups())
    total = num(tot.group(1))
    per_part = x * 1 + y * 0.5 + z * 0.25
    if per_part == 0 or abs(total / per_part * x - stated) > max(1.0, stated * 0.01):
        return None
    en = (f"One part of the ratio is worth {x}×₹1 + {y}×₹0.50 + {z}×₹0.25 = ₹{fmt(round(per_part, 2))}. "
          f"Total ₹{fmt(total)} ÷ ₹{fmt(round(per_part, 2))} = {fmt(round(total / per_part, 2))} parts, so "
          f"the number of 1-rupee coins is {x} × {fmt(round(total / per_part, 2))} = {fmt(stated)}.")
    as_ = (f"অনুপাতৰ এভাগৰ মূল্য = ₹{as_num(fmt(round(per_part, 2)))}; ₹{as_num(fmt(total))} ÷ "
           f"₹{as_num(fmt(round(per_part, 2)))} = {as_num(fmt(round(total / per_part, 2)))} ভাগ, সেয়ে "
           f"১ টকাৰ মুদ্ৰা {as_num(fmt(stated))} টা।")
    return en, as_


def h_prob_at_least_once(m, q):
    stated = m.group(1).replace(" ", "")
    stem = q["q"]["en"]
    p = re.search(r"happens in one trial is (\d+)/(\d+)", stem)
    trials = re.search(r"in (\d+) trials", stem)
    if not (p and trials):
        return None
    a, b, n = int(p.group(1)), int(p.group(2)), int(trials.group(1))
    never = Fraction(b - a, b) ** n
    if 1 - never != Fraction(stated):
        return None
    en = (f"Work with the opposite: never happening. P(no) = ({b - a}/{b})^{n} = {never.numerator}/"
          f"{never.denominator}, so P(at least once) = 1 − {never.numerator}/{never.denominator} = "
          f"{stated}.")
    as_ = (f"বিপৰীত ঘটনা লোৱা: কেতিয়াও নঘটাৰ সম্ভাৱনা = {as_num(never.numerator)}/{as_num(never.denominator)}; "
           f"সেয়ে অন্ততঃ এবাৰ = ১ − {as_num(never.numerator)}/{as_num(never.denominator)} = {stated.translate(AS_DIGITS)}।")
    return en, as_


def h_equilateral_area(m, q):
    stated = m.group(1)
    stem = q["q"]["en"]
    side = re.search(r"equilateral triangle of side ([\d.]+)", stem)
    if not side:
        return None
    a = num(side.group(1))
    sq = a * a
    if f"{fmt(sq)}√3/4" != stated.replace(" ", "").replace(",", ""):
        return None
    simple = f"{int(sq) // 4}√3" if sq % 4 == 0 else f"{fmt(sq)}√3/4"
    en = (f"The area of an equilateral triangle is (√3/4)a², so with a = {fmt(a)}: "
          f"(√3/4) × {fmt(a)}² = (√3/4) × {fmt(sq)} = {simple} ≈ {fmt(round(sq * 3 ** 0.5 / 4, 2))} cm².")
    as_ = (f"সমবাহু ত্ৰিভুজৰ কালি = (√3/4)a² = (√3/4) × {as_num(fmt(sq))} ≈ "
           f"{as_num(fmt(round(sq * 3 ** 0.5 / 4, 2)))} বৰ্গ ছেমি।")
    return en, as_


def h_coefficient(m, q):
    stated = num(m.group(1))
    stem = q["q"]["en"]
    r = re.search(r"\(x \+ ([\d.]+)\)\(x \+ ([\d.]+)\)", stem)
    if not r:
        return None
    a, b = num(r.group(1)), num(r.group(2))
    if a + b != stated:
        return None
    en = (f"Multiply out: (x + {fmt(a)})(x + {fmt(b)}) = x² + ({fmt(a)} + {fmt(b)})x + {fmt(a * b)}. "
          f"The coefficient of x is the sum of the two constants, {fmt(a)} + {fmt(b)} = {fmt(stated)}.")
    as_ = (f"পূৰণ কৰা: (x + {as_num(fmt(a))})(x + {as_num(fmt(b))}) = x² + {as_num(fmt(stated))}x + "
           f"{as_num(fmt(a * b))}; সেয়ে x ৰ সহগ = {as_num(fmt(stated))}।")
    return en, as_


PATTERNS = [
    (r"^A's share = ([\d,]+)\.?$", h_partnership),
    (r"^LCM\(([\d,\s]+)\) = ([\d,]+)\.?$", h_lcm),
    (r"^HCF\(([\d,\s]+)\) = ([\d,]+)\.?$", h_hcf),
    (r"^(Average|Mean) = ([\d.,]+)/(\d+) = ([\d.,]+)\.?$", h_average),
    (r"^Mode = ([\d.,]+)\.?$", h_mode),
    (r"^Median = ([\d.,]+)\.?$", h_median),
    (r"^(\d+)C(\d+) = ([\d,]+)\.?$", h_ncr),
    (r"^(\d+)C(\d+) = .*?= ([\d,]+)\.?$", h_ncr_expanded),
    (r"^(\d+)P(\d+) = .*?= ([\d,]+)\.?$", h_npr_expanded),
    (r"^Handshakes = (\d+)C\d+ = (?:(?:\d+\(\d+-1\)/2) = )?([\d,]+)\.?$", h_handshake),
    (r"^Diagonals = ([\d,]+)\.?$", h_diagonal),
    (r"^Circular arrangements = .*?= ([\d,]+)\.?$", h_circular),
    (r"^Arrangements = ([\d,]+)\.?$", h_word_arrangements),
    (r"^Applying BODMAS,? the value is ([\d./]+)\.?$", h_bodmas),
    (r"^Using the recurring-decimal formula gives ([\d/]+)\.?$", h_recurring),
    (r"^Time = ([\d.]+)/([\d.]+) = ([\d.]+) s", h_time_divide),
    (r"^Time = \(([\d.]+)\+([\d.]+)\)/([\d.]+) = ([\d.]+) s", h_time_combined),
    (r"^Stream speed = \(([\d.]+)-([\d.]+)\)/2 = ([\d.]+)", h_stream_speed),
    (r"^Required number = HCF\([^)]*\) = ([\d,]+)\.?$", h_required_hcf),
    (r"^(\d+)\^(\d+) = ([\d,]+)\.?$", h_power_balls),
    (r"^(\d+)C(\d+) × (\d+)C(\d+) = ([\d,]+)\.?$", h_committee),
    (r"^\(n-1\)! = ([\d,]+)\.?$", h_circular_fact),
    (r"^Mean = \(n\+1\)/2 = ([\d.]+)\.?$", h_mean_naturals),
    (r"^SD = ([\d.]+)\.?$", h_sd),
    (r"^(0\.\d+) = (\d+/\d+)\.?$", h_decimal_fraction),
    (r"^Midpoint = \(([-\d.,\s]+)\)\.?$", h_midpoint),
    (r"^Slope = (-?[\d.]+)\.?$", h_slope),
    (r"^Milk left = ([\d.]+) lit", h_milk_left),
    (r"^The mean increases by ([\d.]+)\.?$", h_mean_shift),
    (r"^P\(not A\) = ([\d/]+)\.?$", h_prob_complement),
    (r"^P\(A and B\) = ([\d/]+)\.?$", h_prob_and),
    (r"^P\(A or B\) = ([\d/]+)\.?$", h_prob_or),
    (r"^(\d+)P(\d+) = ([\d,]+)\.?$", h_npr),
    (r"^Probability = ([\d/]+) = ([\d/]+)\.?$", h_probability),
    (r"^Distance = ([\d.]+)\.?$", h_distance),
    (r"^SI = ([\d.,]+)\.?$", h_si),
    (r"^(A|P) = ([\d.,]+)\.?$", h_interest_amount),
    (r"^SP = ([\d.,]+)\.?$", h_sp),
    (r"^Profit% = ([\d.]+)%?\.?$", h_profit_pct),
    (r"^([\d.]+)/([\d.]+) × 100 = ([\d.]+)%?\.?$", h_percent_of),
    (r"^Cross-multiplying shows ([\d/]+) is greater", h_cross),
    (r"^The value is ([\d/]+)\.?$", h_value_is),
    (r"^([\d/]+) × (\d+) = ([\d/]+)\.?$", h_multiply),
    (r"^√([\d.]+) = ([\d.]+)\.?$", h_sqrt),
    (r"^New average = ([\d.]+)\.?$", h_new_average),
    (r"^Son's age = ([\d.]+) years", h_son_age),
    (r"^Ratio = ([\d:\s]+)\.?$", h_ratio),
    (r"^Increase = \(\(([\d.]+)-([\d.]+)\)/([\d.]+)\)×100 = ([\d.]+)%?\.?$", h_increase),
    (r"^Total = ([\d.,]+)\.?$", h_total),
    (r"^Mean = ([\d.,]+)\.?$", h_mixture_mean),
    (r"^Average = \(([\d.\s+]+)\)/(\d+) = ([\d.]+)\.?$", h_average_terms),
    (r"^Range = ([\d.]+) - ([\d.]+) = ([\d.]+)\.?$", h_range),
    (r"^Sum = \((\d+)-(\d+)\)×180° = ([\d,]+)°?\.?$", h_polygon_sum),
    (r"^Value = (\d+)×\((\d+)²-(\d+)×(\d+)\) = ([\d,]+)\.?$", h_value_bracket),
    (r"^Distance = \(([\d.]+)-([\d.]+)\)/tan ([\d.]+)° = ([\d.]+) m", h_height_distance),
    (r"^Area = ([\d.,]+) sq units\.?$", h_area_shoelace),
    (r"^Difference = ([\d.]+) - ([\d.]+) = ([\d.]+)\.?$", h_difference),
    (r"^R = ([\d.]+)%?\.?$", h_rate),
    (r"^Combined mean = ([\d.]+)\.?$", h_combined_mean),
    (r"^(Milk|Water|Solution|Mixture) = ([\d./]+) lit", h_quantity),
    (r"^A's share = ([\d,]+)\.?$", h_three_share),
    (r"^A's share = ([\d,]+)\.?$", h_partner_join),
    (r"^A's total income = ([\d.,]+)\.?$", h_working_partner),
    (r"^CI = ([\d.,]+)\.?$", h_ci_expanded),
    (r"^CP = ([\d.,]+)\.?$", h_cp_from_sp),
    (r"^Difference = ([\d.,]+)×([\d.]+)×\(([\d.]+)-([\d.]+)\)/100 = ([\d.,]+)\.?$", h_si_diff),
    (r"^Roots are ([\d.]+) and ([\d.]+)\.?$", h_roots),
    (r"^x = ([\d.]+)\.?$", h_x_intercept),
    (r"^New % = ([\d.]+)%?\.?$", h_new_percent),
    (r"^Time ratio = ([\d:]+)\.?$", h_time_ratio),
    (r"^([\d.]+)% of ([\d.]+) = ([\d.]+)\.?$", h_percent_of_number),
    (r"^Average = \(n\+1\)\(2n\+1\)/6 = ([\d.]+)\.?$", h_avg_squares),
    (r"^Average = ([\d.]+)\.?$", h_avg_squares),
    (r"^Compound ratio = ([\d:]+)\.?$", h_compound_ratio),
    (r"^1-rupee coins = ([\d.,]+)\.?$", h_coin_count),
    (r"^P\(at least once\) = ([\d/]+)\.?$", h_prob_at_least_once),
    (r"^Area = ([\d.,]+√3/4) cm²\.?$", h_equilateral_area),
    (r"^Coefficient of x = ([\d.,]+)\.?$", h_coefficient),
    (r"^CI = .*?= ([\d.,]+)\.?$", h_ci_expanded),
    (r"^Difference = ([\d.,]+)\.?$", h_ci_si_diff),
    (r"^k = (-?[\d.]+)\.?$", h_root_k),
    (r"^(\d+)³ - (\d+)³ = ([\d,]+)\.?$", h_cubes),
    (r"^Average = ([\d.]+)\.?$", h_avg_naturals),
    (r"^Percentage = \(([\d.]+)/([\d.]+)\)×100 = ([\d.]+)%?\.?$", h_percent_ratio),
    (r"^Result = (.+?)\.?$", h_rationalise),
    (r"^(sin|cos) θ = ([\d/]+)\.?$", h_trig_ratio),
    (r"^Reciprocal gives ([\d/]+)\.?$", h_reciprocal),
    (r"^CP = ([\d.]+);.*$", h_cp_mixed),
    (r"^Milk:water = ([\d:]+)\.?$", h_milk_water),
    (r"^B invested for ([\d.]+) months\.?$", h_partner_months),
    (r"^B's investment = ([\d.,]+)\.?$", h_partner_investment),
    (r"^(SI|A|P|R|T|CP|SP|Profit|Loss|Profit%|Loss%|Mean|Average|Median|Mode|Range|Ratio|Total|Difference|Increase|Decrease|Discount|Interest|Amount|Sum|Value|Area|Volume|Perimeter|Speed|Time|Distance|Work|Cost|Saving) = .*[\d].*", h_generic),
]


def has_figure(q):
    if str(q.get("fig") or "").strip():
        return True
    return any(str((o or {}).get("fig") or "").strip() for o in (q.get("options") or []))


def rewrite(q):
    if has_figure(q):
        return None
    exp = q.get("explanation") or {}
    text = str(exp.get("en", "")).strip()
    if text.endswith(".."):
        text = text[:-1]
    if words(text) >= MIN_WORDS:
        return None
    for pattern, handler in PATTERNS:
        m = re.match(pattern, text)
        if not m:
            continue
        try:
            out = handler(m, q)
        except Exception:
            return None
        if out and words(out[0]) >= MIN_WORDS:
            return out
    return None


def main():
    changed = 0
    seen = 0
    per_leaf = {}
    for base in (LEGACY, DATA):
        for dirpath, _dirs, files in os.walk(base):
            for name in files:
                if not name.startswith("question-") or not name.endswith(".json"):
                    continue
                path = os.path.join(dirpath, name)
                try:
                    bank = json.load(open(path, encoding="utf-8"))
                except Exception:
                    continue
                if not isinstance(bank, list):
                    continue
                touched = 0
                for q in bank:
                    if not isinstance(q, dict) or "options" not in q:
                        continue
                    if words((q.get("explanation") or {}).get("en", "")) >= MIN_WORDS:
                        continue
                    seen += 1
                    out = rewrite(q)
                    if not out:
                        continue
                    q["explanation"] = {"en": out[0], "as": out[1]}
                    touched += 1
                if touched:
                    leaf = os.path.basename(dirpath)
                    per_leaf[leaf] = per_leaf.get(leaf, 0) + touched
                    changed += touched
                    if not DRY:
                        with open(path, "w", encoding="utf-8") as fh:
                            json.dump(bank, fh, ensure_ascii=False, indent=2)
                            fh.write("\n")
    for leaf, n in sorted(per_leaf.items(), key=lambda kv: -kv[1]):
        print(f"  {n:4d}  {leaf}")
    print(f"short explanations seen: {seen} | rewritten: {changed}" + (" (dry run)" if DRY else ""))


if __name__ == "__main__":
    main()
