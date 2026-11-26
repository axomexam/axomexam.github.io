#!/usr/bin/env python3
"""Data Interpretation: 95+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from data_bank import append, as_num, opts

rows = []


def add(en, as_, correct, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_,
                 "correct": str(correct), "dists": [str(c) for c in opts(correct, cands)],
                 "exp_en": exp_en, "exp_as": exp_as})


def r2(x):
    return round(x, 2)


SETS = [
    ("the sales of a shop (in ₹ thousand)", [200, 250, 300, 350, 400], ["2019", "2020", "2021", "2022", "2023"]),
    ("the number of students in a school", [400, 450, 500, 550, 600], ["2018", "2019", "2020", "2021", "2022"]),
    ("the units produced by a factory", [120, 150, 180, 210, 240], ["2017", "2018", "2019", "2020", "2021"]),
    ("the rainfall recorded (in mm)", [80, 100, 120, 90, 110], ["2016", "2017", "2018", "2019", "2020"]),
    ("the number of books sold", [300, 360, 420, 480, 540], ["2015", "2016", "2017", "2018", "2019"]),
]


def table(values, years):
    return ", ".join(f"{y}: {v}" for y, v in zip(years, values))


for label, vals, years in SETS:
    total = sum(vals)
    avg = r2(total / len(vals))
    add(f"The table shows {label} over five years — {table(vals, years)}. Find the total.",
        f"তালিকাত পাঁচ বছৰৰ {label} দেখুওৱা হৈছে — {table(vals, years)}। মুঠ নিৰ্ণয় কৰা।",
        total, [total + vals[0], total - vals[-1], avg, total // 2],
        f"Total = {' + '.join(map(str, vals))} = {total}.",
        f"মুঠ = {total}।")
    add(f"The table shows {label} over five years — {table(vals, years)}. Find the average per year.",
        f"তালিকাত পাঁচ বছৰৰ {label} দেখুওৱা হৈছে — {table(vals, years)}। বছৰি গড় নিৰ্ণয় কৰা।",
        avg, [total, r2(avg + 10), r2(avg - 10), vals[-1]],
        f"Average = total/number of years = {total}/5 = {avg}.",
        f"গড় = {total}/5 = {as_num(avg)}।")
    pct = r2((vals[1] - vals[0]) / vals[0] * 100)
    add(f"The table shows {label} over five years — {table(vals, years)}. Find the percentage increase from {years[0]} to {years[1]}.",
        f"তালিকাত পাঁচ বছৰৰ {label} — {table(vals, years)}। {years[0]} ৰ পৰা {years[1]} লৈ শতাংশ বৃদ্ধি নিৰ্ণয় কৰা।",
        f"{pct}%", [f"{r2(pct*2)}%", f"{r2(pct/2)}%", f"{vals[1]-vals[0]}%", f"{r2(100-pct)}%"],
        f"Increase = {vals[1]} - {vals[0]} = {vals[1]-vals[0]}; percentage = ({vals[1]-vals[0]}/{vals[0]})×100 = {pct}%.",
        f"শতাংশ বৃদ্ধি = {as_num(pct)}%।")
    add(f"The table shows {label} over five years — {table(vals, years)}. Find the ratio of {years[0]} to {years[2]}.",
        f"তালিকাত পাঁচ বছৰৰ {label} — {table(vals, years)}। {years[0]} আৰু {years[2]} ৰ অনুপাত নিৰ্ণয় কৰা।",
        f"{vals[0]}:{vals[2]}", [f"{vals[2]}:{vals[0]}", f"{vals[0]}:{vals[1]}", f"{vals[1]}:{vals[2]}"],
        f"Ratio = {vals[0]} : {vals[2]}.",
        f"অনুপাত = {as_num(vals[0])}:{as_num(vals[2])}।")
    add(f"The table shows {label} over five years — {table(vals, years)}. Find the difference between the highest and lowest values.",
        f"তালিকাত পাঁচ বছৰৰ {label} — {table(vals, years)}। সৰ্বাধিক আৰু সৰ্বনিম্ন মানৰ পাৰ্থক্য নিৰ্ণয় কৰা।",
        max(vals) - min(vals), [max(vals), min(vals), max(vals) + min(vals), max(vals) - min(vals) + 10],
        f"Difference = {max(vals)} - {min(vals)} = {max(vals)-min(vals)}.",
        f"পাৰ্থক্য = {as_num(max(vals)-min(vals))}।")
    share = r2(vals[0] / total * 100)
    add(f"The table shows {label} over five years — {table(vals, years)}. What percentage of the total belongs to {years[0]}?",
        f"তালিকাত পাঁচ বছৰৰ {label} — {table(vals, years)}। মুঠৰ কিমান শতাংশ {years[0]} ৰ?",
        f"{share}%", [f"{r2(share*2)}%", f"{r2(share/2)}%", f"{vals[0]}%", f"{r2(100-share)}%"],
        f"Percentage = ({vals[0]}/{total})×100 = {share}%.",
        f"শতাংশ = {as_num(share)}%।")

# 7. pie chart
SECTORS = [("Food", 30), ("Rent", 25), ("Education", 20), ("Transport", 15), ("Savings", 10)]


def pie_text():
    return ", ".join(f"{n} {p}%" for n, p in SECTORS)


for name, pct in SECTORS:
    angle = pct * 360 / 100
    add(f"A pie chart shows a family's monthly budget: {pie_text()}. Find the central angle of the {name} sector.",
        f"এটা পাই চিত্ৰত পৰিয়ালৰ মাহেকীয়া বাজেট দেখুওৱা হৈছে: {pie_text()}। {name} খণ্ডৰ কেন্দ্ৰীয় কোণ নিৰ্ণয় কৰা।",
        f"{angle}°", [f"{pct}°", f"{r2(angle/2)}°", f"{r2(angle*2)}°", f"{r2(360-angle)}°"],
        f"Central angle = (percentage/100) × 360° = ({pct}/100) × 360° = {angle}°.",
        f"কেন্দ্ৰীয় কোণ = {as_num(angle)}°।")

for total in [40000, 60000, 80000]:
    add(f"A pie chart shows a family's monthly budget: {pie_text()}. If the total budget is ₹{total}, how much is spent on Food?",
        f"এটা পাই চিত্ৰত পৰিয়ালৰ মাহেকীয়া বাজেট: {pie_text()}। মুঠ বাজেট ₹{as_num(total)} হ'লে খাদ্যত কিমান খৰচ হয়?",
        int(total * 30 / 100), [int(total * 25 / 100), int(total * 20 / 100), int(total * 10 / 100), total],
        f"Food = 30% of {total} = 0.30 × {total} = {int(total*0.3)}.",
        f"খাদ্য = {as_num(int(total*0.3))} টকা।")

add(f"A pie chart shows a family's monthly budget: {pie_text()}. What percentage of the budget goes to Rent and Transport together?",
    f"এটা পাই চিত্ৰত পৰিয়ালৰ মাহেকীয়া বাজেট: {pie_text()}। ভাৰা আৰু পৰিবহণত একেলগে কিমান শতাংশ যায়?",
    "40%", ["35%", "45%", "25%", "55%"],
    "Rent 25% + Transport 15% = 40%.",
    "ভাৰা ২৫% + পৰিবহণ ১৫% = ৪০%।")
add(f"A pie chart shows a family's monthly budget: {pie_text()}. Find the ratio of the Food sector to the Savings sector.",
    f"এটা পাই চিত্ৰত পৰিয়ালৰ মাহেকীয়া বাজেট: {pie_text()}। খাদ্য আৰু সঞ্চয় খণ্ডৰ অনুপাত নিৰ্ণয় কৰা।",
    "3:1", ["1:3", "2:1", "3:2"],
    "Food 30% : Savings 10% = 3 : 1.",
    "খাদ্য ৩০% : সঞ্চয় ১০% = ৩:১।")
add(f"A pie chart shows a family's monthly budget: {pie_text()}. Find the difference between the Food and Education sectors as a percentage of the total.",
    f"এটা পাই চিত্ৰত পৰিয়ালৰ মাহেকীয়া বাজেট: {pie_text()}। খাদ্য আৰু শিক্ষা খণ্ডৰ পাৰ্থক্য মুঠৰ কিমান শতাংশ?",
    "10%", ["5%", "15%", "20%", "25%"],
    "Food 30% - Education 20% = 10%.",
    "খাদ্য ৩০% - শিক্ষা ২০% = ১০%।")
add(f"A pie chart shows a family's monthly budget: {pie_text()}. If the Rent sector is ₹15,000, find the total budget.",
    f"এটা পাই চিত্ৰত পৰিয়ালৰ মাহেকীয়া বাজেট: {pie_text()}। ভাৰা খণ্ড ₹{as_num(15000)} হ'লে মুঠ বাজেট নিৰ্ণয় কৰা।",
    "₹60,000", ["₹45,000", "₹75,000", "₹50,000", "₹80,000"],
    "25% of total = 15,000, so total = 15,000 × 100/25 = ₹60,000.",
    "২৫% = ১৫,০০০ ⇒ মুঠ = ₹৬০,০০০।")

# 8. two-shop comparison
A = [100, 150, 200]
B = [120, 140, 180]
add(f"Shop A sold {A[0]}, {A[1]} and {A[2]} units in three months; shop B sold {B[0]}, {B[1]} and {B[2]}. Find the total sales of shop A.",
    f"A দোকানে তিন মাহত {as_num(A[0])}, {as_num(A[1])} আৰু {as_num(A[2])} একক বিক্ৰী কৰিলে; B দোকানে {as_num(B[0])}, {as_num(B[1])} আৰু {as_num(B[2])}। A দোকানৰ মুঠ বিক্ৰী নিৰ্ণয় কৰা।",
    sum(A), [sum(B), sum(A) + 20, sum(A) - 20, sum(A) // 2],
    f"Total A = {' + '.join(map(str, A))} = {sum(A)}.",
    f"A ৰ মুঠ = {as_num(sum(A))}।")
add(f"Shop A sold {A[0]}, {A[1]} and {A[2]} units in three months; shop B sold {B[0]}, {B[1]} and {B[2]}. Find the total sales of shop B.",
    f"A দোকানে তিন মাহত {as_num(A[0])}, {as_num(A[1])} আৰু {as_num(A[2])} একক বিক্ৰী কৰিলে; B দোকানে {as_num(B[0])}, {as_num(B[1])} আৰু {as_num(B[2])}। B দোকানৰ মুঠ বিক্ৰী নিৰ্ণয় কৰা।",
    sum(B), [sum(A), sum(B) + 20, sum(B) - 20, sum(B) // 2],
    f"Total B = {' + '.join(map(str, B))} = {sum(B)}.",
    f"B ৰ মুঠ = {as_num(sum(B))}।")
add(f"Shop A sold {A[0]}, {A[1]} and {A[2]} units in three months; shop B sold {B[0]}, {B[1]} and {B[2]}. Which shop sold more in total and by how much?",
    f"A দোকানে {as_num(A[0])}, {as_num(A[1])} আৰু {as_num(A[2])} একক বিক্ৰী কৰিলে; B দোকানে {as_num(B[0])}, {as_num(B[1])} আৰু {as_num(B[2])}। কোনে বেছি বিক্ৰী কৰিলে আৰু কিমান বেছি?",
    f"Shop A by {sum(A)-sum(B)}", [f"Shop B by {sum(B)-sum(A)}", f"Shop A by {sum(A)-sum(B)+10}", "Both equal"],
    f"Total A = {sum(A)}, total B = {sum(B)}, so shop A leads by {sum(A)-sum(B)}.",
    f"A = {as_num(sum(A))}, B = {as_num(sum(B))}; A এ {as_num(sum(A)-sum(B))} বেছি।")

# 9. growth
for old, new in [(200, 400), (150, 450), (250, 500), (400, 500)]:
    pct = (new - old) / old * 100
    add(f"A value rises from {old} to {new}. Find the percentage increase.",
        f"এটা মান {as_num(old)} ৰ পৰা {as_num(new)} লৈ বৃদ্ধি হয়। শতাংশ বৃদ্ধি নিৰ্ণয় কৰা।",
        f"{r2(pct)}%", [f"{r2(pct*2)}%", f"{r2(pct/2)}%", f"{new-old}%", f"{r2(100-pct)}%"],
        f"Percentage increase = (({new} - {old})/{old}) × 100 = {r2(pct)}%.",
        f"শতাংশ বৃদ্ধি = {as_num(r2(pct))}%।")

# extra batch
for label, vals, years in SETS[:3]:
    total = sum(vals)
    add(f"The table shows {label} over five years — {table(vals, years)}. Find the total of the last three years.",
        f"তালিকাত পাঁচ বছৰৰ {label} — {table(vals, years)}। শেষ তিন বছৰৰ মুঠ নিৰ্ণয় কৰা।",
        sum(vals[2:]), [total, sum(vals[:2]), sum(vals[2:]) + 20, sum(vals[2:]) - 20],
        f"Total = {' + '.join(map(str, vals[2:]))} = {sum(vals[2:])}.",
        f"মুঠ = {as_num(sum(vals[2:]))}।")
    add(f"The table shows {label} over five years — {table(vals, years)}. Find the average of the first three years.",
        f"তালিকাত পাঁচ বছৰৰ {label} — {table(vals, years)}। প্ৰথম তিন বছৰৰ গড় নিৰ্ণয় কৰা।",
        r2(sum(vals[:3]) / 3), [r2(sum(vals[:3])), r2(sum(vals[:3]) / 2), r2(total / 5), vals[2]],
        f"Average = {sum(vals[:3])}/3 = {r2(sum(vals[:3])/3)}.",
        f"গড় = {as_num(r2(sum(vals[:3])/3))}।")

for a, b in [(30, 50), (40, 60), (25, 75)]:
    add(f"In a pie chart, two sectors measure {a}% and {b}%. Find the ratio of their central angles.",
        f"পাই চিত্ৰত দুটা খণ্ড {as_num(a)}% আৰু {as_num(b)}%। তেওঁলোকৰ কেন্দ্ৰীয় কোণৰ অনুপাত নিৰ্ণয় কৰা।",
        f"{a}:{b}", [f"{b}:{a}", f"{a*2}:{b}", f"{a}:{b*2}"],
        f"Central angles are proportional to percentages: {a} : {b}.",
        f"কেন্দ্ৰীয় কোণ শতাংশৰ সমানুপাতী: {as_num(a)}:{as_num(b)}।")

for total, pct in [(50000, 20), (72000, 25), (90000, 15)]:
    add(f"In a pie chart, a sector is {pct}% of a total of ₹{total}. Find the amount in that sector.",
        f"পাই চিত্ৰত এটা খণ্ড ₹{as_num(total)} ৰ {as_num(pct)}%। সেই খণ্ডৰ পৰিমাণ নিৰ্ণয় কৰা।",
        int(total * pct / 100), [int(total * (100-pct) / 100), int(total * pct / 200), total, int(total * pct / 50)],
        f"Amount = {pct}% of {total} = {int(total*pct/100)}.",
        f"পৰিমাণ = {as_num(int(total*pct/100))}।")

for old, new in [(500, 400), (800, 600), (1200, 900)]:
    pct = (old - new) / old * 100
    add(f"A value falls from {old} to {new}. Find the percentage decrease.",
        f"এটা মান {as_num(old)} ৰ পৰা {as_num(new)} লৈ কমে। শতাংশ হ্ৰাস নিৰ্ণয় কৰা।",
        f"{r2(pct)}%", [f"{r2(pct*2)}%", f"{r2(pct/2)}%", f"{old-new}%", f"{r2(100-pct)}%"],
        f"Percentage decrease = (({old}-{new})/{old})×100 = {r2(pct)}%.",
        f"শতাংশ হ্ৰাস = {as_num(r2(pct))}%।")

for vals, years in [([50, 60, 70, 80], ["2019", "2020", "2021", "2022"]),
                    ([90, 120, 150, 180], ["2018", "2019", "2020", "2021"])]:
    add(f"The table shows values over four years — {table(vals, years)}. Find the total.",
        f"তালিকাত চাৰি বছৰৰ মান — {table(vals, years)}। মুঠ নিৰ্ণয় কৰা।",
        sum(vals), [sum(vals) + 20, sum(vals) - 20, sum(vals) // 2, max(vals)],
        f"Total = {sum(vals)}.",
        f"মুঠ = {as_num(sum(vals))}।")
    add(f"The table shows values over four years — {table(vals, years)}. Find the average.",
        f"তালিকাত চাৰি বছৰৰ মান — {table(vals, years)}। গড় নিৰ্ণয় কৰা।",
        r2(sum(vals) / 4), [sum(vals), r2(sum(vals)/2), r2(sum(vals)/3), max(vals)],
        f"Average = {sum(vals)}/4 = {r2(sum(vals)/4)}.",
        f"গড় = {as_num(r2(sum(vals)/4))}।")

for a, b in [(200, 300), (150, 250), (400, 500)]:
    add(f"Sales rose from {a} units to {b} units. Find the percentage increase.",
        f"বিক্ৰী {as_num(a)} এককৰ পৰা {as_num(b)} এককলৈ বৃদ্ধি হয়। শতাংশ বৃদ্ধি নিৰ্ণয় কৰা।",
        f"{r2((b-a)/a*100)}%", [f"{r2((b-a)/a*50)}%", f"{b-a}%", f"{r2((b-a)/b*100)}%"],
        f"Increase = (({b}-{a})/{a})×100 = {r2((b-a)/a*100)}%.",
        f"বৃদ্ধি = {as_num(r2((b-a)/a*100))}%।")

# final batch
EXTRA_SETS = [
    ("the production of rice (in tonnes)", [150, 200, 250, 300, 350], ["2014", "2015", "2016", "2017", "2018"]),
    ("the number of vehicles registered", [60, 75, 90, 105, 120], ["2013", "2014", "2015", "2016", "2017"]),
]
for label, vals, years in EXTRA_SETS:
    total = sum(vals)
    add(f"The table shows {label} over five years — {table(vals, years)}. Find the total.",
        f"তালিকাত পাঁচ বছৰৰ {label} — {table(vals, years)}। মুঠ নিৰ্ণয় কৰা।",
        total, [total + 50, total - 50, r2(total/5), total // 2],
        f"Total = {total}.",
        f"মুঠ = {as_num(total)}।")
    add(f"The table shows {label} over five years — {table(vals, years)}. Find the average per year.",
        f"তালিকাত পাঁচ বছৰৰ {label} — {table(vals, years)}। বছৰি গড় নিৰ্ণয় কৰা।",
        r2(total/5), [total, r2(total/5)+10, r2(total/5)-10, vals[-1]],
        f"Average = {total}/5 = {r2(total/5)}.",
        f"গড় = {as_num(r2(total/5))}।")
    pct = r2((vals[4] - vals[0]) / vals[0] * 100)
    add(f"The table shows {label} over five years — {table(vals, years)}. Find the percentage increase from {years[0]} to {years[4]}.",
        f"তালিকাত পাঁচ বছৰৰ {label} — {table(vals, years)}। {years[0]} ৰ পৰা {years[4]} লৈ শতাংশ বৃদ্ধি নিৰ্ণয় কৰা।",
        f"{pct}%", [f"{r2(pct*2)}%", f"{r2(pct/2)}%", f"{vals[4]-vals[0]}%", f"{r2(100-pct)}%"],
        f"Increase = (({vals[4]}-{vals[0]})/{vals[0]})×100 = {pct}%.",
        f"বৃদ্ধি = {as_num(pct)}%।")

add(f"A pie chart shows a family's monthly budget: {pie_text()}. Find the central angle of the Rent and Transport sectors combined.",
    f"এটা পাই চিত্ৰত পৰিয়ালৰ মাহেকীয়া বাজেট: {pie_text()}। ভাৰা আৰু পৰিবহণ খণ্ডৰ একত্ৰিত কেন্দ্ৰীয় কোণ নিৰ্ণয় কৰা।",
    "144°", ["108°", "126°", "150°", "180°"],
    "Rent 25% + Transport 15% = 40%; angle = 0.40 × 360° = 144°.",
    "২৫% + ১৫% = ৪০%; কোণ = ১৪৪°।")
add(f"A pie chart shows a family's monthly budget: {pie_text()}. If the total budget is ₹50,000, how much is spent on Education?",
    f"এটা পাই চিত্ৰত পৰিয়ালৰ মাহেকীয়া বাজেট: {pie_text()}। মুঠ বাজেট ₹{as_num(50000)} হ'লে শিক্ষাত কিমান খৰচ হয়?",
    "₹10,000", ["₹12,500", "₹15,000", "₹7,500", "₹20,000"],
    "20% of 50,000 = ₹10,000.",
    "₹৫০,০০০ ৰ ২০% = ₹১০,০০০।")
add(f"A pie chart shows a family's monthly budget: {pie_text()}. A sector has a central angle of 72°. Which sector is it?",
    f"এটা পাই চিত্ৰত পৰিয়ালৰ মাহেকীয়া বাজেট: {pie_text()}। এটা খণ্ডৰ কেন্দ্ৰীয় কোণ ৭২°। কোনটো খণ্ড?",
    "Education", ["Food", "Rent", "Transport", "Savings"],
    "72° corresponds to (72/360)×100 = 20%, which is Education.",
    "৭২° = ২০%, অৰ্থাৎ শিক্ষা।")
add(f"A pie chart shows a family's monthly budget: {pie_text()}. Find the difference between the central angles of Food and Savings.",
    f"এটা পাই চিত্ৰত পৰিয়ালৰ মাহেকীয়া বাজেট: {pie_text()}। খাদ্য আৰু সঞ্চয়ৰ কেন্দ্ৰীয় কোণৰ পাৰ্থক্য নিৰ্ণয় কৰা।",
    "72°", ["36°", "54°", "90°", "108°"],
    "Food 108° - Savings 36° = 72°.",
    "১০৮° - ৩৬° = ৭২°।")

C = [80, 120, 160]
D = [100, 110, 150]
add(f"Shop C sold {C[0]}, {C[1]} and {C[2]} units in three months; shop D sold {D[0]}, {D[1]} and {D[2]}. Find the total sales of shop C.",
    f"C দোকানে {as_num(C[0])}, {as_num(C[1])} আৰু {as_num(C[2])} একক বিক্ৰী কৰিলে; D দোকানে {as_num(D[0])}, {as_num(D[1])} আৰু {as_num(D[2])}। C ৰ মুঠ বিক্ৰী নিৰ্ণয় কৰা।",
    sum(C), [sum(D), sum(C)+20, sum(C)-20, sum(C)//2],
    f"Total C = {sum(C)}.",
    f"C ৰ মুঠ = {as_num(sum(C))}।")
add(f"Shop C sold {C[0]}, {C[1]} and {C[2]} units in three months; shop D sold {D[0]}, {D[1]} and {D[2]}. Find the total sales of shop D.",
    f"C দোকানে {as_num(C[0])}, {as_num(C[1])} আৰু {as_num(C[2])} একক বিক্ৰী কৰিলে; D দোকানে {as_num(D[0])}, {as_num(D[1])} আৰু {as_num(D[2])}। D ৰ মুঠ বিক্ৰী নিৰ্ণয় কৰা।",
    sum(D), [sum(C), sum(D)+20, sum(D)-20, sum(D)//2],
    f"Total D = {sum(D)}.",
    f"D ৰ মুঠ = {as_num(sum(D))}।")
add(f"Shop C sold {C[0]}, {C[1]} and {C[2]} units in three months; shop D sold {D[0]}, {D[1]} and {D[2]}. Which shop sold more and by how much?",
    f"C দোকানে {as_num(C[0])}, {as_num(C[1])} আৰু {as_num(C[2])} একক বিক্ৰী কৰিলে; D দোকানে {as_num(D[0])}, {as_num(D[1])} আৰু {as_num(D[2])}। কোনে বেছি বিক্ৰী কৰিলে আৰু কিমান?",
    "Both equal", [f"Shop C by {sum(C)-sum(D)}", f"Shop D by {sum(D)-sum(C)}", "Shop C by 10"],
    f"Total C = {sum(C)} and total D = {sum(D)}, so both are equal.",
    f"C = {as_num(sum(C))}, D = {as_num(sum(D))}, সেয়ে সমান।")
add(f"Shop C sold {C[0]}, {C[1]} and {C[2]} units in three months. Find the average monthly sale.",
    f"C দোকানে তিন মাহত {as_num(C[0])}, {as_num(C[1])} আৰু {as_num(C[2])} একক বিক্ৰী কৰিলে। মাহিলী গড় বিক্ৰী নিৰ্ণয় কৰা।",
    r2(sum(C)/3), [sum(C), r2(sum(C)/2), r2(sum(C)/4), max(C)],
    f"Average = {sum(C)}/3 = {r2(sum(C)/3)}.",
    f"গড় = {as_num(r2(sum(C)/3))}।")

for old, new in [(300, 600), (250, 1000), (80, 100)]:
    pct = (new - old) / old * 100
    add(f"A value rises from {old} to {new}. Find the percentage increase.",
        f"এটা মান {as_num(old)} ৰ পৰা {as_num(new)} লৈ বৃদ্ধি হয়। শতাংশ বৃদ্ধি নিৰ্ণয় কৰা।",
        f"{r2(pct)}%", [f"{r2(pct*2)}%", f"{r2(pct/2)}%", f"{new-old}%", f"{r2(100-pct)}%"],
        f"Increase = (({new}-{old})/{old})×100 = {r2(pct)}%.",
        f"বৃদ্ধি = {as_num(r2(pct))}%।")

for vals, years in [([240, 300, 360], ["2020", "2021", "2022"]), ([75, 90, 105], ["2019", "2020", "2021"])]:
    add(f"The table shows values over three years — {table(vals, years)}. Find the total.",
        f"তালিকাত তিনি বছৰৰ মান — {table(vals, years)}। মুঠ নিৰ্ণয় কৰা।",
        sum(vals), [sum(vals)+15, sum(vals)-15, r2(sum(vals)/3), max(vals)],
        f"Total = {sum(vals)}.",
        f"মুঠ = {as_num(sum(vals))}।")
    add(f"The table shows values over three years — {table(vals, years)}. Find the average.",
        f"তালিকাত তিনি বছৰৰ মান — {table(vals, years)}। গড় নিৰ্ণয় কৰা।",
        r2(sum(vals)/3), [sum(vals), r2(sum(vals)/2), max(vals), r2(sum(vals)/4)],
        f"Average = {sum(vals)}/3 = {r2(sum(vals)/3)}.",
        f"গড় = {as_num(r2(sum(vals)/3))}।")

append("data-interpretation", rows)
