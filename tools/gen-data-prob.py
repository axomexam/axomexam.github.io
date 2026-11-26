#!/usr/bin/env python3
"""Probability: 95+ very hard bilingual questions."""

import sys
from fractions import Fraction as F
sys.path.insert(0, "tools")
from data_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def fr(x):
    x = F(x)
    return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator}"


# 1. single die
for fav, desc in [(1, "getting a 3"), (2, "getting an even number"), (3, "getting a number greater than 3"),
                  (1, "getting a 6"), (3, "getting a prime number")]:
    add(f"A fair die is rolled once. Find the probability of {desc}.",
        f"এটা ন্যায্য পাশা এবাৰ মেলা হয়। {desc} ৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(fav, 6)), [fr(F(6 - fav, 6)), fr(F(1, 6)), fr(F(fav, 12)), fr(F(fav + 1, 6))],
        f"Favourable outcomes = {fav}, total = 6, so probability = {fav}/6 = {fr(F(fav,6))}.",
        f"অনুকূল ফল {as_num(fav)}, মুঠ ৬; সম্ভাৱনা = {fr(F(fav,6))}।")

# 2. two dice
for target, count in [(7, 6), (5, 4), (9, 4), (11, 2), (4, 3), (12, 1)]:
    add(f"Two fair dice are rolled. Find the probability that the sum of the numbers is {target}.",
        f"দুটা ন্যায্য পাশা মেলা হয়। সংখ্যা দুটাৰ যোগফল {as_num(target)} হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(count, 36)), [fr(F(6, 36)), fr(F(count, 12)), fr(F(36 - count, 36)), fr(F(1, 6))],
        f"There are {count} favourable pairs out of 36, so probability = {count}/36 = {fr(F(count,36))}.",
        f"৩৬ টা ফলৰ {as_num(count)} টা অনুকূল; সম্ভাৱনা = {fr(F(count,36))}।")

# 3. cards
for count, desc in [(4, "an ace"), (13, "a spade"), (26, "a red card"), (12, "a face card"), (4, "a king")]:
    add(f"A card is drawn at random from a standard pack of 52 cards. Find the probability that it is {desc}.",
        f"৫২ খন তাচৰ পৰা যাদৃচ্ছিকভাৱে এখন তাচ টনা হয়। সেয়া {desc} হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(count, 52)), [fr(F(count, 13)), fr(F(52 - count, 52)), fr(F(1, 52)), fr(F(count, 26))],
        f"Favourable cards = {count} out of 52, so probability = {count}/52 = {fr(F(count,52))}.",
        f"অনুকূল {as_num(count)}, মুঠ ৫২; সম্ভাৱনা = {fr(F(count,52))}।")

# 4. coins
for n, desc, fav in [(2, "two heads", 1), (2, "at least one head", 3), (3, "three heads", 1),
                     (3, "at least one head", 7), (2, "exactly one head", 2)]:
    add(f"{n} fair coins are tossed together. Find the probability of {desc}.",
        f"{as_num(n)} টা ন্যায্য মুদ্ৰা একেলগে টছা হয়। {desc} ৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(fav, 2 ** n)), [fr(F(1, 2 ** n)), fr(F(2 ** n - fav, 2 ** n)), fr(F(fav, n)), fr(F(1, 2))],
        f"Total outcomes = 2^{n} = {2**n}; favourable = {fav}; probability = {fav}/{2**n} = {fr(F(fav,2**n))}.",
        f"মুঠ ফল {as_num(2**n)}, অনুকূল {as_num(fav)}; সম্ভাৱনা = {fr(F(fav,2**n))}।")

# 5. balls from bag
for red, blue, pick in [(3, 2, 1), (4, 6, 1), (5, 3, 1), (2, 8, 1)]:
    total = red + blue
    add(f"A bag contains {red} red and {blue} blue balls. One ball is drawn at random. Find the probability that it is red.",
        f"এটা মোনাত {as_num(red)} টা ৰঙা আৰু {as_num(blue)} টা নীলা বল আছে। এটা বল যাদৃচ্ছিকভাৱে টনা হয়। সেয়া ৰঙা হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(red, total)), [fr(F(blue, total)), fr(F(1, total)), fr(F(red, blue)), fr(F(red, total * 2))],
        f"Total balls = {total}; favourable = {red}; probability = {red}/{total} = {fr(F(red,total))}.",
        f"মুঠ বল {as_num(total)}, অনুকূল {as_num(red)}; সম্ভাৱনা = {fr(F(red,total))}।")
    add(f"A bag contains {red} red and {blue} blue balls. One ball is drawn at random. Find the probability that it is blue.",
        f"এটা মোনাত {as_num(red)} টা ৰঙা আৰু {as_num(blue)} টা নীলা বল। এটা বল টনা হয়। সেয়া নীলা হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(blue, total)), [fr(F(red, total)), fr(F(1, total)), fr(F(blue, red)), fr(F(blue, total * 2))],
        f"Probability = {blue}/{total} = {fr(F(blue,total))}.",
        f"সম্ভাৱনা = {fr(F(blue,total))}।")

# 6. complement
for num, den in [(1, 4), (2, 5), (3, 7), (5, 8), (2, 3)]:
    add(f"If the probability of an event is {num}/{den}, find the probability of its complement.",
        f"এটা ঘটনাৰ সম্ভাৱনা {as_num(num)}/{as_num(den)} হ'লে তাৰ পূরক ঘটনাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(den - num, den)), [fr(F(num, den)), fr(F(1, den)), fr(F(den, num)), fr(F(den - num, num))],
        f"P(not A) = 1 - {num}/{den} = {fr(F(den-num,den))}.",
        f"P(not A) = ১ - {fr(F(num,den))} = {fr(F(den-num,den))}।")

# 7. independent events
for a_num, a_den, b_num, b_den in [(1, 2, 1, 3), (1, 4, 1, 2), (2, 5, 1, 2), (1, 3, 1, 4)]:
    v = F(a_num, a_den) * F(b_num, b_den)
    add(f"The probabilities of two independent events A and B are {a_num}/{a_den} and {b_num}/{b_den}. Find P(A and B).",
        f"দুটা স্বাধীন ঘটনা A আৰু B ৰ সম্ভাৱনা {as_num(a_num)}/{as_num(a_den)} আৰু {as_num(b_num)}/{as_num(b_den)}। P(A and B) নিৰ্ণয় কৰা।",
        fr(v), [fr(F(a_num, a_den) + F(b_num, b_den)), fr(v * 2), fr(F(1, 2)), fr(v + F(1, 6))],
        f"For independent events, P(A and B) = P(A) × P(B) = {fr(F(a_num,a_den))} × {fr(F(b_num,b_den))} = {fr(v)}.",
        f"স্বাধীন ঘটনাৰ বাবে P(A and B) = {fr(v)}।")

# 8. mutually exclusive
for a_num, a_den, b_num, b_den in [(1, 4, 1, 3), (1, 2, 1, 4), (2, 7, 3, 7), (1, 5, 2, 5)]:
    v = F(a_num, a_den) + F(b_num, b_den)
    add(f"The probabilities of two mutually exclusive events A and B are {a_num}/{a_den} and {b_num}/{b_den}. Find P(A or B).",
        f"দুটা পৰস্পৰ বৰ্জনকাৰী ঘটনা A আৰু B ৰ সম্ভাৱনা {as_num(a_num)}/{as_num(a_den)} আৰু {as_num(b_num)}/{as_num(b_den)}। P(A or B) নিৰ্ণয় কৰা।",
        fr(v), [fr(F(a_num, a_den) * F(b_num, b_den)), fr(v * 2), fr(F(1, 2)), fr(1 - v)],
        f"For mutually exclusive events, P(A or B) = P(A) + P(B) = {fr(v)}.",
        f"বৰ্জনকাৰী ঘটনাৰ বাবে P(A or B) = {fr(v)}।")

# 9. at least one
for p_num, p_den, trials in [(1, 2, 2), (1, 3, 2), (1, 4, 3), (2, 3, 2)]:
    p = F(p_num, p_den)
    v = 1 - (1 - p) ** trials
    add(f"The probability that an event happens in one trial is {p_num}/{p_den}. Find the probability that it happens at least once in {trials} independent trials.",
        f"এটা পৰীক্ষাত ঘটনা সংঘটিত হোৱাৰ সম্ভাৱনা {as_num(p_num)}/{as_num(p_den)}। {as_num(trials)} টা স্বাধীন পৰীক্ষাত কমেও এবাৰ সংঘটিত হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(v), [fr(p ** trials), fr(1 - p), fr(v / 2), fr(p * trials)],
        f"P(at least once) = 1 - P(none) = 1 - (1 - {fr(p)})^{trials} = {fr(v)}.",
        f"P(কমেও এবাৰ) = ১ - (১ - {fr(p)})^{as_num(trials)} = {fr(v)}।")

# 10. neither
for a_num, a_den, b_num, b_den in [(1, 2, 1, 3), (1, 4, 1, 4), (1, 3, 1, 2)]:
    a, b = F(a_num, a_den), F(b_num, b_den)
    v = (1 - a) * (1 - b)
    add(f"The probabilities of two independent events A and B are {a_num}/{a_den} and {b_num}/{b_den}. Find the probability that neither occurs.",
        f"দুটা স্বাধীন ঘটনা A আৰু B ৰ সম্ভাৱনা {as_num(a_num)}/{as_num(a_den)} আৰু {as_num(b_num)}/{as_num(b_den)}। দুয়োটা নঘটাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(v), [fr(a * b), fr(1 - v), fr(v / 2), fr(a + b)],
        f"P(neither) = (1 - P(A))(1 - P(B)) = {fr(v)}.",
        f"P(দুয়োটা নঘটা) = {fr(v)}।")

# extra batch
for fav, desc in [(2, "getting a number less than 3"), (4, "getting a number less than 5"),
                  (2, "getting an odd prime")]:
    add(f"A fair die is rolled once. Find the probability of {desc}.",
        f"এটা ন্যায্য পাশা এবাৰ মেলা হয়। {desc} ৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(fav, 6)), [fr(F(6 - fav, 6)), fr(F(1, 6)), fr(F(fav, 12)), fr(F(fav + 1, 6))],
        f"Probability = {fav}/6 = {fr(F(fav,6))}.",
        f"সম্ভাৱনা = {fr(F(fav,6))}।")

for target, count in [(6, 5), (8, 5), (10, 3), (3, 2)]:
    add(f"Two fair dice are rolled. Find the probability that the sum of the numbers is {target}.",
        f"দুটা ন্যায্য পাশা মেলা হয়। যোগফল {as_num(target)} হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(count, 36)), [fr(F(6, 36)), fr(F(count, 12)), fr(F(36 - count, 36)), fr(F(1, 6))],
        f"Probability = {count}/36 = {fr(F(count,36))}.",
        f"সম্ভাৱনা = {fr(F(count,36))}।")

for count, desc in [(13, "a heart"), (26, "a black card"), (4, "a jack"), (2, "a red king")]:
    add(f"A card is drawn at random from a standard pack of 52 cards. Find the probability that it is {desc}.",
        f"৫২ খন তাচৰ পৰা এখন তাচ টনা হয়। সেয়া {desc} হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(count, 52)), [fr(F(count, 13)), fr(F(52 - count, 52)), fr(F(1, 52)), fr(F(count, 26))],
        f"Probability = {count}/52 = {fr(F(count,52))}.",
        f"সম্ভাৱনা = {fr(F(count,52))}।")

for n, desc, fav in [(3, "exactly two heads", 3), (4, "all heads", 1), (3, "at least two heads", 4)]:
    add(f"{n} fair coins are tossed together. Find the probability of {desc}.",
        f"{as_num(n)} টা ন্যায্য মুদ্ৰা একেলগে টছা হয়। {desc} ৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(fav, 2 ** n)), [fr(F(1, 2 ** n)), fr(F(2 ** n - fav, 2 ** n)), fr(F(fav, n)), fr(F(1, 2))],
        f"Probability = {fav}/{2**n} = {fr(F(fav,2**n))}.",
        f"সম্ভাৱনা = {fr(F(fav,2**n))}।")

for red, blue in [(6, 4), (7, 5), (3, 9)]:
    total = red + blue
    add(f"A bag contains {red} red and {blue} blue balls. One ball is drawn at random. Find the probability that it is red.",
        f"এটা মোনাত {as_num(red)} টা ৰঙা আৰু {as_num(blue)} টা নীলা বল। এটা বল টনা হয়। ৰঙা হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(red, total)), [fr(F(blue, total)), fr(F(1, total)), fr(F(red, blue)), fr(F(red, total*2))],
        f"Probability = {red}/{total} = {fr(F(red,total))}.",
        f"সম্ভাৱনা = {fr(F(red,total))}।")

for num, den in [(1, 5), (3, 4), (5, 6)]:
    add(f"If the probability of an event is {num}/{den}, find the probability of its complement.",
        f"এটা ঘটনাৰ সম্ভাৱনা {as_num(num)}/{as_num(den)} হ'লে পূরক ঘটনাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(den - num, den)), [fr(F(num, den)), fr(F(1, den)), fr(F(den, num)), fr(F(den - num, num))],
        f"P(not A) = {fr(F(den-num,den))}.",
        f"P(not A) = {fr(F(den-num,den))}।")

for a_num, a_den, b_num, b_den in [(1, 2, 2, 3), (1, 3, 3, 5)]:
    v = F(a_num, a_den) * F(b_num, b_den)
    add(f"The probabilities of two independent events A and B are {a_num}/{a_den} and {b_num}/{b_den}. Find P(A and B).",
        f"দুটা স্বাধীন ঘটনা A আৰু B ৰ সম্ভাৱনা {as_num(a_num)}/{as_num(a_den)} আৰু {as_num(b_num)}/{as_num(b_den)}। P(A and B) নিৰ্ণয় কৰা।",
        fr(v), [fr(F(a_num,a_den)+F(b_num,b_den)), fr(v*2), fr(F(1,2)), fr(v+F(1,6))],
        f"P(A and B) = {fr(v)}.",
        f"P(A and B) = {fr(v)}।")

for a_num, a_den, b_num, b_den in [(1, 6, 1, 6), (2, 5, 1, 5)]:
    v = F(a_num, a_den) + F(b_num, b_den)
    add(f"The probabilities of two mutually exclusive events A and B are {a_num}/{a_den} and {b_num}/{b_den}. Find P(A or B).",
        f"দুটা বৰ্জনকাৰী ঘটনা A আৰু B ৰ সম্ভাৱনা {as_num(a_num)}/{as_num(a_den)} আৰু {as_num(b_num)}/{as_num(b_den)}। P(A or B) নিৰ্ণয় কৰা।",
        fr(v), [fr(F(a_num,a_den)*F(b_num,b_den)), fr(v*2), fr(F(1,2)), fr(1-v)],
        f"P(A or B) = {fr(v)}.",
        f"P(A or B) = {fr(v)}।")

for p_num, p_den, trials in [(1, 6, 2), (1, 2, 3)]:
    p = F(p_num, p_den)
    v = 1 - (1 - p) ** trials
    add(f"The probability that an event happens in one trial is {p_num}/{p_den}. Find the probability that it happens at least once in {trials} independent trials.",
        f"এটা পৰীক্ষাত ঘটনা সংঘটিত হোৱাৰ সম্ভাৱনা {as_num(p_num)}/{as_num(p_den)}। {as_num(trials)} টা পৰীক্ষাত কমেও এবাৰ হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(v), [fr(p**trials), fr(1-p), fr(v/2), fr(p*trials)],
        f"P(at least once) = {fr(v)}.",
        f"P(কমেও এবাৰ) = {fr(v)}।")

for a_num, a_den, b_num, b_den in [(1, 2, 1, 4), (2, 3, 1, 3)]:
    a, b = F(a_num, a_den), F(b_num, b_den)
    v = (1 - a) * (1 - b)
    add(f"The probabilities of two independent events A and B are {a_num}/{a_den} and {b_num}/{b_den}. Find the probability that neither occurs.",
        f"দুটা স্বাধীন ঘটনা A আৰু B ৰ সম্ভাৱনা {as_num(a_num)}/{as_num(a_den)} আৰু {as_num(b_num)}/{as_num(b_den)}। দুয়োটা নঘটাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(v), [fr(a*b), fr(1-v), fr(v/2), fr(a+b)],
        f"P(neither) = {fr(v)}.",
        f"P(দুয়োটা নঘটা) = {fr(v)}।")

# final batch
for fav, desc in [(1, "getting a 2"), (2, "getting a multiple of 3"), (2, "getting a number greater than 4")]:
    add(f"A fair die is rolled once. Find the probability of {desc}.",
        f"এটা ন্যায্য পাশা এবাৰ মেলা হয়। {desc} ৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(fav, 6)), [fr(F(6-fav, 6)), fr(F(1, 6)), fr(F(fav, 12)), fr(F(fav+1, 6))],
        f"Probability = {fav}/6 = {fr(F(fav,6))}.",
        f"সম্ভাৱনা = {fr(F(fav,6))}।")

for count, desc in [(6, "both dice show the same number"), (11, "at least one six appears"), (12, "the sum is a multiple of 3")]:
    add(f"Two fair dice are rolled. Find the probability that {desc}.",
        f"দুটা ন্যায্য পাশা মেলা হয়। {desc} হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(count, 36)), [fr(F(6, 36)), fr(F(count, 12)), fr(F(36-count, 36)), fr(F(1, 6))],
        f"Favourable outcomes = {count} out of 36, so probability = {fr(F(count,36))}.",
        f"অনুকূল ফল {as_num(count)}/৩৬, সেয়ে সম্ভাৱনা = {fr(F(count,36))}।")

for count, desc in [(4, "a queen"), (2, "a black ace"), (13, "a diamond")]:
    add(f"A card is drawn at random from a standard pack of 52 cards. Find the probability that it is {desc}.",
        f"৫২ খন তাচৰ পৰা এখন তাচ টনা হয়। সেয়া {desc} হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(count, 52)), [fr(F(count, 13)), fr(F(52-count, 52)), fr(F(1, 52)), fr(F(count, 26))],
        f"Probability = {count}/52 = {fr(F(count,52))}.",
        f"সম্ভাৱনা = {fr(F(count,52))}।")

for n, desc, fav in [(4, "exactly two heads", 6), (2, "both tails", 1)]:
    add(f"{n} fair coins are tossed together. Find the probability of {desc}.",
        f"{as_num(n)} টা ন্যায্য মুদ্ৰা একেলগে টছা হয়। {desc} ৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(fav, 2**n)), [fr(F(1, 2**n)), fr(F(2**n-fav, 2**n)), fr(F(fav, n)), fr(F(1, 2))],
        f"Probability = {fav}/{2**n} = {fr(F(fav,2**n))}.",
        f"সম্ভাৱনা = {fr(F(fav,2**n))}।")

for red, blue in [(5, 5), (8, 2)]:
    total = red + blue
    add(f"A bag contains {red} red and {blue} blue balls. One ball is drawn at random. Find the probability that it is red.",
        f"এটা মোনাত {as_num(red)} টা ৰঙা আৰু {as_num(blue)} টা নীলা বল। এটা বল টনা হয়। ৰঙা হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(red, total)), [fr(F(blue, total)), fr(F(1, total)), fr(F(red, blue)), fr(F(red, total*2))],
        f"Probability = {red}/{total} = {fr(F(red,total))}.",
        f"সম্ভাৱনা = {fr(F(red,total))}।")

for num, den in [(1, 8), (7, 10)]:
    add(f"If the probability of an event is {num}/{den}, find the probability of its complement.",
        f"এটা ঘটনাৰ সম্ভাৱনা {as_num(num)}/{as_num(den)} হ'লে পূরক ঘটনাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(F(den-num, den)), [fr(F(num, den)), fr(F(1, den)), fr(F(den, num)), fr(F(den-num, num))],
        f"P(not A) = {fr(F(den-num,den))}.",
        f"P(not A) = {fr(F(den-num,den))}।")

for a_num, a_den, b_num, b_den in [(1, 2, 1, 2), (2, 3, 3, 4)]:
    v = F(a_num, a_den) * F(b_num, b_den)
    add(f"The probabilities of two independent events A and B are {a_num}/{a_den} and {b_num}/{b_den}. Find P(A and B).",
        f"দুটা স্বাধীন ঘটনা A আৰু B ৰ সম্ভাৱনা {as_num(a_num)}/{as_num(a_den)} আৰু {as_num(b_num)}/{as_num(b_den)}। P(A and B) নিৰ্ণয় কৰা।",
        fr(v), [fr(F(a_num,a_den)+F(b_num,b_den)), fr(v*2), fr(F(1,2)), fr(v+F(1,6))],
        f"P(A and B) = {fr(v)}.",
        f"P(A and B) = {fr(v)}।")

for p_num, p_den, trials in [(1, 2, 4)]:
    p = F(p_num, p_den)
    v = 1 - (1 - p) ** trials
    add(f"The probability that an event happens in one trial is {p_num}/{p_den}. Find the probability that it happens at least once in {trials} independent trials.",
        f"এটা পৰীক্ষাত ঘটনা সংঘটিত হোৱাৰ সম্ভাৱনা {as_num(p_num)}/{as_num(p_den)}। {as_num(trials)} টা পৰীক্ষাত কমেও এবাৰ হোৱাৰ সম্ভাৱনা নিৰ্ণয় কৰা।",
        fr(v), [fr(p**trials), fr(1-p), fr(v/2), fr(p*trials)],
        f"P(at least once) = {fr(v)}.",
        f"P(কমেও এবাৰ) = {fr(v)}।")

append("probability", rows)
