"""Section: Elementary Mathematics - 110 fresh bilingual questions."""
from .common import R


def rows():
    r = []
    A = r.append

    # ---- Arithmetic: percentages ----
    A(R("A shopkeeper marks an article at Rs 800 and gives a discount of 15 per cent. What is the selling price?",
        "এজন দোকানীয়ে এটা সামগ্ৰীৰ মূল্য ৮০০ টকা লিখি ১৫ শতাংশ ৰেহাই দিয়ে। বিক্ৰী মূল্য কিমান?",
        [("Rs 680", "৬৮০ টকা"), ("Rs 700", "৭০০ টকা"), ("Rs 720", "৭২০ টকা"), ("Rs 660", "৬৬০ টকা")], 0,
        "15 per cent of 800 is 120, so the selling price is 800 - 120 = Rs 680.",
        "৮০০ ৰ ১৫ শতাংশ = ১২০, সেয়ে বিক্ৰী মূল্য = ৮০০ - ১২০ = ৬৮০ টকা।"))
    A(R("If the price of sugar rises by 25 per cent, by what per cent must a family reduce consumption to keep expenditure unchanged?",
        "চেনিৰ মূল্য ২৫ শতাংশ বৃদ্ধি হ'লে ব্যয় অপৰিৱৰ্তিত ৰাখিবলৈ এটা পৰিয়ালে খৰচ কিমান শতাংশ কমাব লাগিব?",
        [("20 per cent", "২০ শতাংশ"), ("25 per cent", "২৫ শতাংশ"), ("15 per cent", "১৫ শতাংশ"), ("30 per cent", "৩০ শতাংশ")], 0,
        "Required reduction = 25/(100+25) x 100 = 20 per cent.",
        "প্ৰয়োজনীয় হ্ৰাস = ২৫/(১০০+২৫) x ১০০ = ২০ শতাংশ।"))
    A(R("The population of a town increases by 10 per cent in the first year and 20 per cent in the second year. If the initial population was 5000, what is it after two years?",
        "এখন নগৰৰ জনসংখ্যা প্ৰথম বছৰত ১০ শতাংশ আৰু দ্বিতীয় বছৰত ২০ শতাংশ বৃদ্ধি পায়। আৰম্ভণিৰ জনসংখ্যা ৫০০০ হ'লে দুবছৰৰ পিছত কিমান হব?",
        [("6600", "৬৬০০"), ("6500", "৬৫০০"), ("6000", "৬০০০"), ("7200", "৭২০০")], 0,
        "5000 x 1.10 x 1.20 = 6600.",
        "৫০০০ x ১.১০ x ১.২০ = ৬৬০০।"))
    A(R("What is 37.5 per cent of 480?",
        "৪৮০ ৰ ৩৭.৫ শতাংশ কিমান?",
        [("180", "১৮০"), ("160", "১৬০"), ("200", "২০০"), ("240", "২৪০")], 0,
        "37.5 per cent = 3/8, and 3/8 of 480 = 180.",
        "৩৭.৫ শতাংশ = ৩/৮, আৰু ৪৮০ ৰ ৩/৮ = ১৮০।"))
    A(R("A student scored 450 marks out of 600. What is the percentage of marks obtained?",
        "এজন ছাত্ৰই ৬০০ ৰ ভিতৰত ৪৫০ নম্বৰ পাইছে। পোৱা নম্বৰৰ শতকৰা হাৰ কিমান?",
        [("75 per cent", "৭৫ শতাংশ"), ("70 per cent", "৭০ শতাংশ"), ("80 per cent", "৮০ শতাংশ"), ("72 per cent", "৭২ শতাংশ")], 0,
        "450/600 x 100 = 75 per cent.",
        "৪৫০/৬০০ x ১০০ = ৭৫ শতাংশ।"))
    A(R("An article bought for Rs 500 is sold for Rs 625. What is the profit percentage?",
        "৫০০ টকাত কিনা এটা সামগ্ৰী ৬২৫ টকাত বিক্ৰী কৰা হয়। লাভৰ শতকৰা হাৰ কিমান?",
        [("25 per cent", "২৫ শতাংশ"), ("20 per cent", "২০ শতাংশ"), ("30 per cent", "৩০ শতাংশ"), ("15 per cent", "১৫ শতাংশ")], 0,
        "Profit = 125, so profit percentage = 125/500 x 100 = 25 per cent.",
        "লাভ = ১২৫, সেয়ে লাভৰ শতকৰা হাৰ = ১২৫/৫০০ x ১০০ = ২৫ শতাংশ।"))
    A(R("If a number is increased by 20 per cent and the result is 360, what was the original number?",
        "এটা সংখ্যা ২০ শতাংশ বৃদ্ধি কৰিলে ফল ৩৬০ হয়। মূল সংখ্যাটো কিমান আছিল?",
        [("300", "৩০০"), ("320", "৩২০"), ("280", "২৮০"), ("340", "৩৪০")], 0,
        "360/1.20 = 300.",
        "৩৬০/১.২০ = ৩০০।"))
    A(R("The price of an item falls from Rs 1200 to Rs 900. What is the percentage decrease?",
        "এটা সামগ্ৰীৰ মূল্য ১২০০ টকাৰ পৰা ৯০০ টকালৈ কমে। শতকৰা হ্ৰাস কিমান?",
        [("25 per cent", "২৫ শতাংশ"), ("20 per cent", "২০ শতাংশ"), ("30 per cent", "৩০ শতাংশ"), ("33 per cent", "৩৩ শতাংশ")], 0,
        "Decrease = 300, so percentage decrease = 300/1200 x 100 = 25 per cent.",
        "হ্ৰাস = ৩০০, সেয়ে শতকৰা হ্ৰাস = ৩০০/১২০০ x ১০০ = ২৫ শতাংশ।"))
    A(R("In an examination, 35 per cent of candidates failed and 650 passed. How many candidates appeared?",
        "এখন পৰীক্ষাত ৩৫ শতাংশ প্ৰাৰ্থী অনুত্তীৰ্ণ হ'ল আৰু ৬৫০ জন উত্তীৰ্ণ হ'ল। মুঠ কিমান প্ৰাৰ্থীয়ে পৰীক্ষা দিছিল?",
        [("1000", "১০০০"), ("950", "৯৫০"), ("1100", "১১০০"), ("1200", "১২০০")], 0,
        "Pass percentage is 65, and 650/0.65 = 1000.",
        "উত্তীৰ্ণৰ শতকৰা হাৰ ৬৫, আৰু ৬৫০/০.৬৫ = ১০০০।"))
    A(R("Two numbers are 20 per cent and 50 per cent more than a third number. What is the ratio of the first to the second?",
        "দুটা সংখ্যা তৃতীয় এটা সংখ্যাতকৈ ক্ৰমে ২০ শতাংশ আৰু ৫০ শতাংশ বেছি। প্ৰথম আৰু দ্বিতীয়ৰ অনুপাত কিমান?",
        [("4 : 5", "৪ : ৫"), ("2 : 5", "২ : ৫"), ("5 : 4", "৫ : ৪"), ("3 : 5", "৩ : ৫")], 0,
        "The numbers are 1.20x and 1.50x, so the ratio is 120 : 150 = 4 : 5.",
        "সংখ্যাদুটা ১.২০x আৰু ১.৫০x, সেয়ে অনুপাত ১২০ : ১৫০ = ৪ : ৫।"))

    # ---- Arithmetic: ratio & proportion ----
    A(R("Rs 1200 is divided among three friends in the ratio 2 : 3 : 5. What is the largest share?",
        "১২০০ টকা তিনিজন বন্ধুৰ মাজত ২ : ৩ : ৫ অনুপাতত ভাগ কৰা হয়। আটাইতকৈ ডাঙৰ অংশ কিমান?",
        [("Rs 600", "৬০০ টকা"), ("Rs 500", "৫০০ টকা"), ("Rs 400", "৪০০ টকা"), ("Rs 360", "৩৬০ টকা")], 0,
        "Total parts = 10, so the largest share is 5/10 x 1200 = Rs 600.",
        "মুঠ অংশ = ১০, সেয়ে ডাঙৰ অংশ = ৫/১০ x ১২০০ = ৬০০ টকা।"))
    A(R("If 8 workers can complete a job in 12 days, how many days will 6 workers take to do the same job?",
        "৮ জন শ্ৰমিকে এটা কাম ১২ দিনত সম্পূৰ্ণ কৰিব পাৰে। একে কাম ৬ জন শ্ৰমিকে কিমান দিনত কৰিব?",
        [("16", "১৬"), ("14", "১৪"), ("18", "১৮"), ("20", "২০")], 0,
        "8 x 12 = 6 x d, so d = 96/6 = 16 days.",
        "৮ x ১২ = ৬ x d, সেয়ে d = ৯৬/৬ = ১৬ দিন।"))
    A(R("The ratio of the ages of a father and son is 7 : 2. If the son is 12 years old, how old is the father?",
        "এজন পিতৃ আৰু পুত্ৰৰ বয়সৰ অনুপাত ৭ : ২। পুত্ৰৰ বয়স ১২ বছৰ হ'লে পিতৃৰ বয়স কিমান?",
        [("42 years", "৪২ বছৰ"), ("40 years", "৪০ বছৰ"), ("35 years", "৩৫ বছৰ"), ("45 years", "৪৫ বছৰ")], 0,
        "12/2 = 6, so the father is 7 x 6 = 42 years old.",
        "১২/২ = ৬, সেয়ে পিতৃৰ বয়স ৭ x ৬ = ৪২ বছৰ।"))
    A(R("A sum of money is divided between A and B in the ratio 3 : 7. If B gets Rs 280 more than A, what is the total sum?",
        "এখন ধন A আৰু B ৰ মাজত ৩ : ৭ অনুপাতত ভাগ কৰা হয়। B য়ে A তকৈ ২৮০ টকা বেছি পায়। মুঠ ধন কিমান?",
        [("Rs 700", "৭০০ টকা"), ("Rs 600", "৬০০ টকা"), ("Rs 800", "৮০০ টকা"), ("Rs 560", "৫৬০ টকা")], 0,
        "The difference of 4 parts is Rs 280, so 1 part is Rs 70 and the total is 10 x 70 = Rs 700.",
        "৪ অংশৰ পাৰ্থক্য ২৮০ টকা, সেয়ে ১ অংশ ৭০ টকা আৰু মুঠ ১০ x ৭০ = ৭০০ টকা।"))
    A(R("If 5 men earn Rs 1500 in 6 days, how much will 8 men earn in 10 days at the same rate?",
        "৫ জন মানুহে ৬ দিনত ১৫০০ টকা উপাৰ্জন কৰে। একে হাৰত ৮ জনে ১০ দিনত কিমান উপাৰ্জন কৰিব?",
        [("Rs 4000", "৪০০০ টকা"), ("Rs 3600", "৩৬০০ টকা"), ("Rs 4200", "৪২০০ টকা"), ("Rs 4500", "৪৫০০ টকা")], 0,
        "Per man per day = 1500/(5x6) = 50, so 8x10x50 = Rs 4000.",
        "জন-দিন প্ৰতি = ১৫০০/(৫x৬) = ৫০, সেয়ে ৮x১০x৫০ = ৪০০০ টকা।"))
    A(R("A map has a scale of 1 cm to 5 km. Two towns are 7 cm apart on the map. What is the actual distance?",
        "এখন মেপৰ মাপ ১ ছেমি = ৫ কিমি। মেপত দুখন নগৰৰ দূৰত্ব ৭ ছেমি। প্ৰকৃত দূৰত্ব কিমান?",
        [("35 km", "৩৫ কিমি"), ("30 km", "৩০ কিমি"), ("40 km", "৪০ কিমি"), ("25 km", "২৫ কিমি")], 0,
        "7 x 5 = 35 km.",
        "৭ x ৫ = ৩৫ কিমি।"))
    A(R("What number must be added to each term of 3 : 5 to make it 5 : 7?",
        "৩ : ৫ ৰ প্ৰতিটো পদত কিমান যোগ কৰিলে অনুপাত ৫ : ৭ হব?",
        [("1", "১"), ("2", "২"), ("3", "৩"), ("4", "৪")], 0,
        "(3+x)/(5+x) = 5/7 gives x = 1.",
        "(৩+x)/(৫+x) = ৫/৭ ৰ পৰা x = ১।"))
    A(R("A and B share profits in the ratio 4 : 5. If the total profit is Rs 2700, what is A's share?",
        "A আৰু B য়ে ৪ : ৫ অনুপাতত লাভ ভাগ কৰে। মুঠ লাভ ২৭০০ টকা হ'লে A ৰ অংশ কিমান?",
        [("Rs 1200", "১২০০ টকা"), ("Rs 1500", "১৫০০ টকা"), ("Rs 1000", "১০০০ টকা"), ("Rs 1350", "১৩৫০ টকা")], 0,
        "A's share = 4/9 x 2700 = Rs 1200.",
        "A ৰ অংশ = ৪/৯ x ২৭০০ = ১২০০ টকা।"))
    A(R("The present ages of two persons are in the ratio 5 : 4. After 6 years the ratio becomes 3 : 2. What is the present age of the elder?",
        "দুজন ব্যক্তিৰ বৰ্তমান বয়সৰ অনুপাত ৫ : ৪। ৬ বছৰৰ পিছত অনুপাত ৩ : ২ হয়। ডাঙৰজনৰ বৰ্তমান বয়স কিমান?",
        [("30 years", "৩০ বছৰ"), ("25 years", "২৫ বছৰ"), ("35 years", "৩৫ বছৰ"), ("40 years", "৪০ বছৰ")], 0,
        "Solving (5x+6)/(4x+6) = 3/2 gives x = 6, so the elder is 30.",
        "(৫x+৬)/(৪x+৬) = ৩/২ ৰ পৰা x = ৬, সেয়ে ডাঙৰজন ৩০।"))

    # ---- Arithmetic: averages ----
    A(R("The average of five numbers is 24. If four of them are 20, 22, 26 and 28, what is the fifth number?",
        "পাঁচটা সংখ্যাৰ গড় ২৪। চাৰিটা ২০, ২২, ২৬ আৰু ২৮ হ'লে পঞ্চমটো কিমান?",
        [("24", "২৪"), ("22", "২২"), ("26", "২৬"), ("30", "৩০")], 0,
        "Sum = 5 x 24 = 120; the four add to 96, so the fifth is 24.",
        "যোগফল = ৫ x ২৪ = ১২০; চাৰিটাৰ যোগফল ৯৬, সেয়ে পঞ্চমটো ২৪।"))
    A(R("The average age of 12 students is 15 years. When the teacher's age is included, the average becomes 16 years. What is the teacher's age?",
        "১২ জন ছাত্ৰৰ গড় বয়স ১৫ বছৰ। শিক্ষকৰ বয়স ধৰিলে গড় ১৬ বছৰ হয়। শিক্ষকৰ বয়স কিমান?",
        [("28 years", "২৮ বছৰ"), ("27 years", "২৭ বছৰ"), ("30 years", "৩০ বছৰ"), ("32 years", "৩২ বছৰ")], 0,
        "New sum = 13 x 16 = 208, old sum = 12 x 15 = 180, so the teacher is 28.",
        "নতুন যোগফল = ১৩ x ১৬ = ২০৮, পুৰণি যোগফল = ১২ x ১৫ = ১৮০, সেয়ে শিক্ষক ২৮ বছৰ।"))
    A(R("What is the average of the first ten natural numbers?",
        "প্ৰথম দহটা স্বাভাৱিক সংখ্যাৰ গড় কিমান?",
        [("5.5", "৫.৫"), ("5", "৫"), ("6", "৬"), ("6.5", "৬.৫")], 0,
        "Average = (1+10)/2 = 5.5.",
        "গড় = (১+১০)/২ = ৫.৫।"))
    A(R("The average of 6 observations is 18. A seventh observation of 32 is added. What is the new average?",
        "৬ টা পৰ্যবেক্ষণৰ গড় ১৮। ৩২ মানৰ সপ্তম এটা পৰ্যবেক্ষণ যোগ কৰা হয়। নতুন গড় কিমান?",
        [("20", "২০"), ("19", "১৯"), ("21", "২১"), ("22", "২২")], 0,
        "New sum = 108 + 32 = 140 over 7, giving 20.",
        "নতুন যোগফল = ১০৮ + ৩২ = ১৪০, ৭ ৰ ওপৰত, সেয়ে ২০।"))
    A(R("A batsman scores 45, 60, 30 and 65 in four innings. What is his average score?",
        "এজন বেটছমেনে চাৰিটা ইনিংছত ৪৫, ৬০, ৩০ আৰু ৬৫ ৰান কৰে। তেওঁৰ গড় ৰান কিমান?",
        [("50", "৫০"), ("48", "৪৮"), ("52", "৫২"), ("55", "৫৫")], 0,
        "Sum = 200, and 200/4 = 50.",
        "যোগফল = ২০০, আৰু ২০০/৪ = ৫০।"))
    A(R("The average weight of 10 boys is 40 kg. If one boy of 55 kg leaves the group, what is the new average?",
        "১০ জন ল'ৰাৰ গড় ওজন ৪০ কেজি। ৫৫ কেজি ওজনৰ এজন ল'ৰা গোট এৰি গ'লে নতুন গড় কিমান?",
        [("38.33 kg", "৩৮.৩৩ কেজি"), ("38 kg", "৩৮ কেজি"), ("39 kg", "৩৯ কেজি"), ("37.5 kg", "৩৭.৫ কেজি")], 0,
        "New sum = 400 - 55 = 345 over 9, giving 38.33 kg.",
        "নতুন যোগফল = ৪০০ - ৫৫ = ৩৪৫, ৯ ৰ ওপৰত, সেয়ে ৩৮.৩৩ কেজি।"))
    A(R("The average of 3 numbers is 20. If two of them are 15 and 25, what is the third?",
        "৩ টা সংখ্যাৰ গড় ২০। দুটা ১৫ আৰু ২৫ হ'লে তৃতীয়টো কিমান?",
        [("20", "২০"), ("18", "১৮"), ("22", "২২"), ("24", "২৪")], 0,
        "Sum = 60; 60 - 40 = 20.",
        "যোগফল = ৬০; ৬০ - ৪০ = ২০।"))
    A(R("The average of 11 results is 50. The average of the first six is 49 and of the last six is 52. What is the sixth result?",
        "১১ টা ফলাফলৰ গড় ৫০। প্ৰথম ছটাৰ গড় ৪৯ আৰু শেষৰ ছটাৰ গড় ৫২। ষষ্ঠ ফলাফলটো কিমান?",
        [("56", "৫৬"), ("55", "৫৫"), ("58", "৫৮"), ("60", "৬০")], 0,
        "6x49 + 6x52 - 11x50 = 294 + 312 - 550 = 56.",
        "৬x৪৯ + ৬x৫২ - ১১x৫০ = ২৯৪ + ৩১২ - ৫৫০ = ৫৬।"))
    A(R("Find the average of all even numbers between 1 and 21.",
        "১ আৰু ২১ ৰ মাজৰ আটাইবোৰ যুগ্ম সংখ্যাৰ গড় নিৰ্ণয় কৰক।",
        [("11", "১১"), ("10", "১০"), ("12", "১২"), ("13", "১৩")], 0,
        "The even numbers 2 to 20 have an average of 11.",
        "২ ৰ পৰা ২০ লৈকে যুগ্ম সংখ্যাৰ গড় ১১।"))

    # ---- Arithmetic: profit & loss, SI/CI ----
    A(R("What is the simple interest on Rs 5000 at 8 per cent per annum for 3 years?",
        "৫০০০ টকাৰ ওপৰত বছৰি ৮ শতাংশ হাৰত ৩ বছৰৰ সৰল সুত কিমান?",
        [("Rs 1200", "১২০০ টকা"), ("Rs 1000", "১০০০ টকা"), ("Rs 1500", "১৫০০ টকা"), ("Rs 1300", "১৩০০ টকা")], 0,
        "SI = 5000 x 8 x 3 / 100 = Rs 1200.",
        "সৰল সুত = ৫০০০ x ৮ x ৩ / ১০০ = ১২০০ টকা।"))
    A(R("A sum becomes Rs 6600 in 2 years at 10 per cent simple interest per annum. What was the principal?",
        "এখন ধন বছৰি ১০ শতাংশ সৰল সুতত ২ বছৰত ৬৬০০ টকা হয়। মূলধন কিমান আছিল?",
        [("Rs 5500", "৫৫০০ টকা"), ("Rs 6000", "৬০০০ টকা"), ("Rs 5000", "৫০০০ টকা"), ("Rs 5200", "৫২০০ টকা")], 0,
        "Principal x 1.20 = 6600, so the principal is Rs 5500.",
        "মূলধন x ১.২০ = ৬৬০০, সেয়ে মূলধন ৫৫০০ টকা।"))
    A(R("At what rate per cent per annum will Rs 4000 yield Rs 800 as simple interest in 4 years?",
        "বছৰি কিমান শতাংশ হাৰত ৪০০০ টকাই ৪ বছৰত ৮০০ টকা সৰল সুত দিব?",
        [("5 per cent", "৫ শতাংশ"), ("4 per cent", "৪ শতাংশ"), ("6 per cent", "৬ শতাংশ"), ("8 per cent", "৮ শতাংশ")], 0,
        "Rate = 800 x 100 / (4000 x 4) = 5 per cent.",
        "হাৰ = ৮০০ x ১০০ / (৪০০০ x ৪) = ৫ শতাংশ।"))
    A(R("What is the compound interest on Rs 2000 at 10 per cent per annum for 2 years?",
        "২০০০ টকাৰ ওপৰত বছৰি ১০ শতাংশ হাৰত ২ বছৰৰ চক্ৰবৃদ্ধি সুত কিমান?",
        [("Rs 420", "৪২০ টকা"), ("Rs 400", "৪০০ টকা"), ("Rs 440", "৪৪০ টকা"), ("Rs 380", "৩৮০ টকা")], 0,
        "Amount = 2000 x 1.21 = 2420, so CI = Rs 420.",
        "পৰিমাণ = ২০০০ x ১.২১ = ২৪২০, সেয়ে চক্ৰবৃদ্ধি সুত = ৪২০ টকা।"))
    A(R("A man sells two articles at Rs 500 each, one at a gain of 25 per cent and the other at a loss of 25 per cent. What is his overall result?",
        "এজনে দুটা সামগ্ৰী প্ৰতিটো ৫০০ টকাত বিক্ৰী কৰে, এটাত ২৫ শতাংশ লাভ আৰু আনটোত ২৫ শতাংশ লোকচান হয়। মুঠ ফলাফল কি?",
        [("A loss of 6.25 per cent", "৬.২৫ শতাংশ লোকচান"), ("No profit no loss", "লাভ-লোকচান নাই"), ("A profit of 6.25 per cent", "৬.২৫ শতাংশ লাভ"), ("A loss of 5 per cent", "৫ শতাংশ লোকচান")], 0,
        "Equal selling prices with equal gain and loss per cent always give a net loss of (25^2/100) = 6.25 per cent.",
        "সমান বিক্ৰী মূল্য আৰু সমান লাভ-লোকচান শতাংশত সদায় (২৫^২/১০০) = ৬.২৫ শতাংশ নিট লোকচান হয়।"))
    A(R("The cost price of 20 articles equals the selling price of 16 articles. What is the profit percentage?",
        "২০ টা সামগ্ৰীৰ ক্ৰয় মূল্য ১৬ টা সামগ্ৰীৰ বিক্ৰী মূল্যৰ সমান। লাভৰ শতকৰা হাৰ কিমান?",
        [("25 per cent", "২৫ শতাংশ"), ("20 per cent", "২০ শতাংশ"), ("16 per cent", "১৬ শতাংশ"), ("30 per cent", "৩০ শতাংশ")], 0,
        "Profit = 4/16 x 100 = 25 per cent.",
        "লাভ = ৪/১৬ x ১০০ = ২৫ শতাংশ।"))
    A(R("By selling a watch for Rs 1140 a man loses 5 per cent. What was the cost price?",
        "এটা ঘড়ী ১১৪০ টকাত বিক্ৰী কৰি এজনে ৫ শতাংশ লোকচান কৰে। ক্ৰয় মূল্য কিমান আছিল?",
        [("Rs 1200", "১২০০ টকা"), ("Rs 1250", "১২৫০ টকা"), ("Rs 1150", "১১৫০ টকা"), ("Rs 1300", "১৩০০ টকা")], 0,
        "Cost = 1140/0.95 = Rs 1200.",
        "ক্ৰয় মূল্য = ১১৪০/০.৯৫ = ১২০০ টকা।"))
    A(R("What sum of money will amount to Rs 1210 in 2 years at 10 per cent compound interest?",
        "বছৰি ১০ শতাংশ চক্ৰবৃদ্ধি সুতত কিমান ধনে ২ বছৰত ১২১০ টকা হব?",
        [("Rs 1000", "১০০০ টকা"), ("Rs 1100", "১১০০ টকা"), ("Rs 1050", "১০৫০ টকা"), ("Rs 1150", "১১৫০ টকা")], 0,
        "Principal = 1210/1.21 = Rs 1000.",
        "মূলধন = ১২১০/১.২১ = ১০০০ টকা।"))
    A(R("A shopkeeper allows a discount of 10 per cent and still makes a profit of 20 per cent. If the marked price is Rs 400, what is the cost price?",
        "এজন দোকানীয়ে ১০ শতাংশ ৰেহাই দিয়েও ২০ শতাংশ লাভ কৰে। চিহ্নিত মূল্য ৪০০ টকা হ'লে ক্ৰয় মূল্য কিমান?",
        [("Rs 300", "৩০০ টকা"), ("Rs 320", "৩২০ টকা"), ("Rs 350", "৩৫০ টকা"), ("Rs 360", "৩৬০ টকা")], 0,
        "Selling price = 360, and cost = 360/1.20 = Rs 300.",
        "বিক্ৰী মূল্য = ৩৬০, আৰু ক্ৰয় মূল্য = ৩৬০/১.২০ = ৩০০ টকা।"))
    A(R("The difference between compound interest and simple interest on a sum for 2 years at 5 per cent is Rs 25. What is the sum?",
        "এখন ধনৰ ২ বছৰত ৫ শতাংশ হাৰত চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য ২৫ টকা। ধনখন কিমান?",
        [("Rs 10000", "১০০০০ টকা"), ("Rs 5000", "৫০০০ টকা"), ("Rs 8000", "৮০০০ টকা"), ("Rs 12000", "১২০০০ টকা")], 0,
        "Difference = P(5/100)^2 = 25, so P = Rs 10000.",
        "পাৰ্থক্য = P(৫/১০০)^২ = ২৫, সেয়ে P = ১০০০০ টকা।"))

    # ---- Arithmetic: time, speed & work ----
    A(R("A train covers 360 km in 4 hours. What is its speed in metres per second?",
        "এখন ৰেলগাড়ীয়ে ৪ ঘণ্টাত ৩৬০ কিমি অতিক্ৰম কৰে। ইয়াৰ গতি প্ৰতি ছেকেণ্ডত কিমান মিটাৰ?",
        [("25 m/s", "২৫ মি/ছে"), ("20 m/s", "২০ মি/ছে"), ("30 m/s", "৩০ মি/ছে"), ("15 m/s", "১৫ মি/ছে")], 0,
        "90 km/h x 5/18 = 25 m/s.",
        "৯০ কিমি/ঘণ্টা x ৫/১৮ = ২৫ মি/ছে।"))
    A(R("A can do a piece of work in 10 days and B in 15 days. Working together, in how many days will they finish it?",
        "A এ এটা কাম ১০ দিনত আৰু B এ ১৫ দিনত কৰিব পাৰে। একেলগে কাম কৰিলে কিমান দিনত শেষ কৰিব?",
        [("6 days", "৬ দিন"), ("5 days", "৫ দিন"), ("7 days", "৭ দিন"), ("8 days", "৮ দিন")], 0,
        "Combined rate = 1/10 + 1/15 = 1/6, so 6 days.",
        "সংযুক্ত হাৰ = ১/১০ + ১/১৫ = ১/৬, সেয়ে ৬ দিন।"))
    A(R("A car travels at 60 km/h for 2 hours and then at 80 km/h for 3 hours. What is the average speed for the whole journey?",
        "এখন গাড়ীয়ে ২ ঘণ্টা ৬০ কিমি/ঘণ্টা আৰু তাৰপিছত ৩ ঘণ্টা ৮০ কিমি/ঘণ্টা গতিত চলে। গোটেই যাত্ৰাৰ গড় গতি কিমান?",
        [("72 km/h", "৭২ কিমি/ঘণ্টা"), ("70 km/h", "৭০ কিমি/ঘণ্টা"), ("75 km/h", "৭৫ কিমি/ঘণ্টা"), ("68 km/h", "৬৮ কিমি/ঘণ্টা")], 0,
        "Distance = 120 + 240 = 360 over 5 hours = 72 km/h.",
        "দূৰত্ব = ১২০ + ২৪০ = ৩৬০, ৫ ঘণ্টাত = ৭২ কিমি/ঘণ্টা।"))
    A(R("If 6 men and 8 boys together can do a job in 10 days, and 26 men and 48 boys can do it in 2 days, in how many days can 15 men and 20 boys do it?",
        "৬ জন মানুহ আৰু ৮ জন ল'ৰাই একেলগে এটা কাম ১০ দিনত কৰে, আৰু ২৬ জন মানুহ আৰু ৪৮ জন ল'ৰাই ২ দিনত কৰে। ১৫ জন মানুহ আৰু ২০ জন ল'ৰাই কিমান দিনত কৰিব?",
        [("4 days", "৪ দিন"), ("5 days", "৫ দিন"), ("3 days", "৩ দিন"), ("6 days", "৬ দিন")], 0,
        "Solving the equations gives 1 man = 2 boys, and the work takes 4 days.",
        "সমীকৰণ সমাধান কৰিলে ১ মানুহ = ২ ল'ৰা পোৱা যায়, আৰু কামটো ৪ দিনত হয়।"))
    A(R("A train 150 metres long crosses a pole in 15 seconds. What is its speed?",
        "১৫০ মিটাৰ দীঘল এখন ৰেলগাড়ীয়ে এটা খুঁটা ১৫ ছেকেণ্ডত অতিক্ৰম কৰে। ইয়াৰ গতি কিমান?",
        [("36 km/h", "৩৬ কিমি/ঘণ্টা"), ("30 km/h", "৩০ কিমি/ঘণ্টা"), ("40 km/h", "৪০ কিমি/ঘণ্টা"), ("45 km/h", "৪৫ কিমি/ঘণ্টা")], 0,
        "Speed = 150/15 = 10 m/s = 36 km/h.",
        "গতি = ১৫০/১৫ = ১০ মি/ছে = ৩৬ কিমি/ঘণ্টা।"))
    A(R("Pipe A fills a tank in 12 hours and pipe B in 18 hours. If both are opened together, in how many hours will the tank be full?",
        "পাইপ A এ এটা টেংকি ১২ ঘণ্টাত আৰু পাইপ B এ ১৮ ঘণ্টাত ভৰ্তি কৰে। দুয়ো একেলগে খুলিলে কিমান ঘণ্টাত টেংকি ভৰ্তি হব?",
        [("7.2 hours", "৭.২ ঘণ্টা"), ("7 hours", "৭ ঘণ্টা"), ("8 hours", "৮ ঘণ্টা"), ("6.5 hours", "৬.৫ ঘণ্টা")], 0,
        "Combined rate = 1/12 + 1/18 = 5/36, giving 36/5 = 7.2 hours.",
        "সংযুক্ত হাৰ = ১/১২ + ১/১৮ = ৫/৩৬, সেয়ে ৩৬/৫ = ৭.২ ঘণ্টা।"))
    A(R("A man walking at 5 km/h covers a distance in 3 hours. How long will he take at 6 km/h?",
        "৫ কিমি/ঘণ্টা গতিত খোজ কাঢ়ি এজনে ৩ ঘণ্টাত এটা দূৰত্ব অতিক্ৰম কৰে। ৬ কিমি/ঘণ্টা গতিত কিমান সময় লাগিব?",
        [("2.5 hours", "২.৫ ঘণ্টা"), ("2 hours", "২ ঘণ্টা"), ("3 hours", "৩ ঘণ্টা"), ("2.75 hours", "২.৭৫ ঘণ্টা")], 0,
        "Distance = 15 km, and 15/6 = 2.5 hours.",
        "দূৰত্ব = ১৫ কিমি, আৰু ১৫/৬ = ২.৫ ঘণ্টা।"))
    A(R("A and B together can complete a work in 8 days. A alone can do it in 12 days. In how many days can B alone do it?",
        "A আৰু B একেলগে এটা কাম ৮ দিনত কৰে। A অকলে ১২ দিনত কৰে। B অকলে কিমান দিনত কৰিব?",
        [("24 days", "২৪ দিন"), ("20 days", "২০ দিন"), ("18 days", "১৮ দিন"), ("16 days", "১৬ দিন")], 0,
        "B's rate = 1/8 - 1/12 = 1/24, so 24 days.",
        "B ৰ হাৰ = ১/৮ - ১/১২ = ১/২৪, সেয়ে ২৪ দিন।"))
    A(R("A boat covers 24 km downstream in 3 hours and the same distance upstream in 4 hours. What is the speed of the stream?",
        "এখন নাওৱে ৩ ঘণ্টাত ২৪ কিমি সোঁতেৰে আৰু ৪ ঘণ্টাত একে দূৰত্ব বাটেৰে যায়। সুঁতিৰ গতি কিমান?",
        [("1 km/h", "১ কিমি/ঘণ্টা"), ("2 km/h", "২ কিমি/ঘণ্টা"), ("3 km/h", "৩ কিমি/ঘণ্টা"), ("1.5 km/h", "১.৫ কিমি/ঘণ্টা")], 0,
        "Downstream 8, upstream 6, so the stream speed is (8-6)/2 = 1 km/h.",
        "সোঁতেৰে ৮, বাটেৰে ৬, সেয়ে সুঁতিৰ গতি (৮-৬)/২ = ১ কিমি/ঘণ্টা।"))
    A(R("Two trains 120 m and 180 m long run in the same direction at 50 km/h and 32 km/h. How long do they take to cross each other?",
        "১২০ মি আৰু ১৮০ মি দীঘল দুখন ৰেলগাড়ী একে দিশত ৫০ কিমি/ঘণ্টা আৰু ৩২ কিমি/ঘণ্টা গতিত যায়। ইটোৱে সিটো অতিক্ৰম কৰিবলৈ কিমান সময় লয়?",
        [("60 seconds", "৬০ ছেকেণ্ড"), ("50 seconds", "৫০ ছেকেণ্ড"), ("72 seconds", "৭২ ছেকেণ্ড"), ("45 seconds", "৪৫ ছেকেণ্ড")], 0,
        "Relative speed 18 km/h = 5 m/s, and 300/5 = 60 seconds.",
        "আপেক্ষিক গতি ১৮ কিমি/ঘণ্টা = ৫ মি/ছে, আৰু ৩০০/৫ = ৬০ ছেকেণ্ড।"))

    # ---- Arithmetic: numbers ----
    A(R("What is the least number that must be added to 2500 to make it divisible by 17?",
        "২৫০০ ত কিমান ন্যূনতম সংখ্যা যোগ কৰিলে ই ১৭ ৰে বিভাজ্য হব?",
        [("16", "১৬"), ("15", "১৫"), ("14", "১৪"), ("13", "১৩")], 0,
        "2500 = 17 x 147 + 1, so 16 must be added.",
        "২৫০০ = ১৭ x ১৪৭ + ১, সেয়ে ১৬ যোগ কৰিব লাগিব।"))
    A(R("The sum of the squares of the first five natural numbers is what?",
        "প্ৰথম পাঁচটা স্বাভাৱিক সংখ্যাৰ বৰ্গৰ যোগফল কিমান?",
        [("55", "৫৫"), ("50", "৫০"), ("60", "৬০"), ("45", "৪৫")], 0,
        "1 + 4 + 9 + 16 + 25 = 55.",
        "১ + ৪ + ৯ + ১৬ + ২৫ = ৫৫।"))
    A(R("What is the greatest number that divides 36 and 60 exactly?",
        "৩৬ আৰু ৬০ ক নিখুঁতভাৱে বিভাজন কৰা আটাইতকৈ ডাঙৰ সংখ্যা কোনটো?",
        [("12", "১২"), ("6", "৬"), ("18", "১৮"), ("24", "২৪")], 0,
        "The HCF of 36 and 60 is 12.",
        "৩৬ আৰু ৬০ ৰ গ.সা.গু. ১২।"))
    A(R("What is the smallest number divisible by 4, 6 and 8?",
        "৪, ৬ আৰু ৮ ৰে বিভাজ্য আটাইতকৈ সৰু সংখ্যা কোনটো?",
        [("24", "২৪"), ("48", "৪৮"), ("12", "১২"), ("36", "৩৬")], 0,
        "The LCM of 4, 6 and 8 is 24.",
        "৪, ৬ আৰু ৮ ৰ ল.সা.গু. ২৪।"))
    A(R("Among 97, 91, 87 and 93, which one is a prime number?",
        "৯৭, ৯১, ৮৭ আৰু ৯৩ ৰ ভিতৰত কোনটো মৌলিক সংখ্যা?",
        [("97", "৯৭"), ("91", "৯১"), ("87", "৮৭"), ("93", "৯৩")], 0,
        "97 has no factor other than 1 and itself, so it is prime.",
        "৯৭ ৰ ১ আৰু নিজৰ বাহিৰে আন কোনো উৎপাদক নাই, সেয়ে ই মৌলিক।"))
    A(R("The sum of three consecutive even numbers is 84. What is the largest of them?",
        "তিনিটা ক্ৰমিক যুগ্ম সংখ্যাৰ যোগফল ৮৪। আটাইতকৈ ডাঙৰটো কিমান?",
        [("30", "৩০"), ("28", "২৮"), ("32", "৩২"), ("26", "২৬")], 0,
        "The numbers are 26, 28 and 30, so the largest is 30.",
        "সংখ্যাকেইটা ২৬, ২৮ আৰু ৩০, সেয়ে ডাঙৰটো ৩০।"))
    A(R("What is the value of 15 per cent of 15 per cent of 1500?",
        "১৫০০ ৰ ১৫ শতাংশৰ ১৫ শতাংশ কিমান?",
        [("33.75", "৩৩.৭৫"), ("30", "৩০"), ("37.5", "৩৭.৫"), ("22.5", "২২.৫")], 0,
        "0.15 x 0.15 x 1500 = 33.75.",
        "০.১৫ x ০.১৫ x ১৫০০ = ৩৩.৭৫।"))
    A(R("A number when divided by 7 leaves a remainder of 5. What is the remainder when three times the number is divided by 7?",
        "এটা সংখ্যাক ৭ ৰে হৰণ কৰিলে ভাগশেষ ৫ থাকে। সংখ্যাটোৰ তিনিগুণক ৭ ৰে হৰণ কৰিলে ভাগশেষ কিমান হব?",
        [("1", "১"), ("2", "২"), ("5", "৫"), ("3", "৩")], 0,
        "3 x 5 = 15, and 15 mod 7 = 1.",
        "৩ x ৫ = ১৫, আৰু ১৫ mod ৭ = ১।"))
    A(R("The product of two numbers is 1200 and their HCF is 10. What is their LCM?",
        "দুটা সংখ্যাৰ গুণফল ১২০০ আৰু গ.সা.গু. ১০। ল.সা.গু. কিমান?",
        [("120", "১২০"), ("100", "১০০"), ("140", "১৪০"), ("60", "৬০")], 0,
        "LCM = product/HCF = 1200/10 = 120.",
        "ল.সা.গু. = গুণফল/গ.সা.গু. = ১২০০/১০ = ১২০।"))
    A(R("How many prime numbers are there between 20 and 40?",
        "২০ আৰু ৪০ ৰ মাজত কিমানটা মৌলিক সংখ্যা আছে?",
        [("Four", "চাৰিটা"), ("Three", "তিনিটা"), ("Five", "পাঁচটা"), ("Six", "ছটা")], 0,
        "They are 23, 29, 31 and 37, that is four.",
        "সেইবোৰ হ'ল ২৩, ২৯, ৩১ আৰু ৩৭, অৰ্থাৎ চাৰিটা।"))

    # ---- Algebra & geometry ----
    A(R("If x + 5 = 12, what is the value of 2x - 3?",
        "x + ৫ = ১২ হ'লে ২x - ৩ ৰ মান কিমান?",
        [("11", "১১"), ("9", "৯"), ("13", "১৩"), ("15", "১৫")], 0,
        "x = 7, so 2x - 3 = 11.",
        "x = ৭, সেয়ে ২x - ৩ = ১১।"))
    A(R("What is the area of a rectangle 12 cm long and 7 cm wide?",
        "১২ ছেমি দীঘল আৰু ৭ ছেমি বহল এটা আয়তৰ কালি কিমান?",
        [("84 square cm", "৮৪ বৰ্গ ছেমি"), ("72 square cm", "৭২ বৰ্গ ছেমি"), ("96 square cm", "৯৬ বৰ্গ ছেমি"), ("78 square cm", "৭৮ বৰ্গ ছেমি")], 0,
        "Area = 12 x 7 = 84 square cm.",
        "কালি = ১২ x ৭ = ৮৪ বৰ্গ ছেমি।"))
    A(R("The perimeter of a square is 48 cm. What is its area?",
        "এটা বৰ্গৰ পৰিসীমা ৪৮ ছেমি। ইয়াৰ কালি কিমান?",
        [("144 square cm", "১৪৪ বৰ্গ ছেমি"), ("128 square cm", "১২৮ বৰ্গ ছেমি"), ("156 square cm", "১৫৬ বৰ্গ ছেমি"), ("196 square cm", "১৯৬ বৰ্গ ছেমি")], 0,
        "Side = 12 cm, so area = 144 square cm.",
        "বাহু = ১২ ছেমি, সেয়ে কালি = ১৪৪ বৰ্গ ছেমি।"))
    A(R("The angles of a triangle are in the ratio 1 : 2 : 3. What is the largest angle?",
        "এটা ত্ৰিভুজৰ কোণবোৰ ১ : ২ : ৩ অনুপাতত আছে। আটাইতকৈ ডাঙৰ কোণটো কিমান?",
        [("90 degrees", "৯০ ডিগ্ৰী"), ("60 degrees", "৬০ ডিগ্ৰী"), ("80 degrees", "৮০ ডিগ্ৰী"), ("120 degrees", "১২০ ডিগ্ৰী")], 0,
        "The angles are 30, 60 and 90 degrees.",
        "কোণবোৰ ৩০, ৬০ আৰু ৯০ ডিগ্ৰী।"))
    A(R("What is the circumference of a circle of radius 7 cm, taking pi as 22/7?",
        "ব্যাসাৰ্ধ ৭ ছেমি হোৱা এটা বৃত্তৰ পৰিধি কিমান, pi = ২২/৭ ধৰি?",
        [("44 cm", "৪৪ ছেমি"), ("22 cm", "২২ ছেমি"), ("154 cm", "১৫৪ ছেমি"), ("49 cm", "৪৯ ছেমি")], 0,
        "Circumference = 2 x 22/7 x 7 = 44 cm.",
        "পৰিধি = ২ x ২২/৭ x ৭ = ৪৪ ছেমি।"))
    A(R("If 3x - 7 = 14, what is the value of x?",
        "৩x - ৭ = ১৪ হ'লে x ৰ মান কিমান?",
        [("7", "৭"), ("5", "৫"), ("6", "৬"), ("8", "৮")], 0,
        "3x = 21, so x = 7.",
        "৩x = ২১, সেয়ে x = ৭।"))
    A(R("The sum of the interior angles of a quadrilateral is what?",
        "চতুৰ্ভুজৰ অন্তঃকোণবোৰৰ যোগফল কিমান?",
        [("360 degrees", "৩৬০ ডিগ্ৰী"), ("180 degrees", "১৮০ ডিগ্ৰী"), ("540 degrees", "৫৪০ ডিগ্ৰী"), ("270 degrees", "২৭০ ডিগ্ৰী")], 0,
        "The interior angles of a quadrilateral add up to 360 degrees.",
        "চতুৰ্ভুজৰ অন্তঃকোণবোৰৰ যোগফল ৩৬০ ডিগ্ৰী।"))
    A(R("What is the volume of a cube of side 5 cm?",
        "৫ ছেমি বাহুৰ এটা ঘনকৰ আয়তন কিমান?",
        [("125 cubic cm", "১২৫ ঘন ছেমি"), ("25 cubic cm", "২৫ ঘন ছেমি"), ("150 cubic cm", "১৫০ ঘন ছেমি"), ("100 cubic cm", "১০০ ঘন ছেমি")], 0,
        "Volume = 5^3 = 125 cubic cm.",
        "আয়তন = ৫^৩ = ১২৫ ঘন ছেমি।"))
    A(R("If a : b = 2 : 3 and b : c = 4 : 5, what is a : c?",
        "a : b = ২ : ৩ আৰু b : c = ৪ : ৫ হ'লে a : c কিমান?",
        [("8 : 15", "৮ : ১৫"), ("2 : 5", "২ : ৫"), ("3 : 5", "৩ : ৫"), ("6 : 15", "৬ : ১৫")], 0,
        "a : c = (2x4) : (3x5) = 8 : 15.",
        "a : c = (২x৪) : (৩x৫) = ৮ : ১৫।"))
    A(R("The average of a number and its reciprocal is 1 for which number?",
        "এটা সংখ্যা আৰু ইয়াৰ প্ৰতিক্ৰমৰ গড় ১ হ'লে সংখ্যাটো কিমান?",
        [("1", "১"), ("2", "২"), ("0", "০"), ("3", "৩")], 0,
        "For x = 1, the average of 1 and 1 is 1.",
        "x = ১ হ'লে ১ আৰু ১ ৰ গড় ১।"))
    A(R("What is the total surface area of a cube of edge 4 cm?",
        "৪ ছেমি কাষৰ এটা ঘনকৰ মুঠ পৃষ্ঠকালি কিমান?",
        [("96 square cm", "৯৬ বৰ্গ ছেমি"), ("64 square cm", "৬৪ বৰ্গ ছেমি"), ("48 square cm", "৪৮ বৰ্গ ছেমি"), ("80 square cm", "৮০ বৰ্গ ছেমি")], 0,
        "Surface area = 6 x 4^2 = 96 square cm.",
        "পৃষ্ঠকালি = ৬ x ৪^২ = ৯৬ বৰ্গ ছেমি।"))

    # ---- Statistics & data interpretation ----
    A(R("What is the median of the data 3, 7, 9, 11, 15, 18?",
        "৩, ৭, ৯, ১১, ১৫, ১৮ তথ্যৰ মধ্যমা কিমান?",
        [("10", "১০"), ("9", "৯"), ("11", "১১"), ("12", "১২")], 0,
        "The median of an even set is the mean of the two middle terms, (9+11)/2 = 10.",
        "যুগ্ম সংহতিৰ মধ্যমা দুটা মধ্য পদৰ গড়, (৯+১১)/২ = ১০।"))
    A(R("What is the mode of the data 4, 6, 6, 7, 8, 6, 9?",
        "৪, ৬, ৬, ৭, ৮, ৬, ৯ তথ্যৰ বহুলক কিমান?",
        [("6", "৬"), ("7", "৭"), ("8", "৮"), ("4", "৪")], 0,
        "6 occurs three times, more than any other value.",
        "৬ তিনিবাৰ আছে, আন যিকোনো মানতকৈ বেছি।"))
    A(R("The mean of 5 numbers is 20. If one number is removed, the mean of the rest becomes 18. What number was removed?",
        "৫ টা সংখ্যাৰ গড় ২০। এটা সংখ্যা আঁতৰালে বাকীবোৰৰ গড় ১৮ হয়। কোনটো সংখ্যা আঁতৰোৱা হৈছিল?",
        [("28", "২৮"), ("24", "২৪"), ("30", "৩০"), ("26", "২৬")], 0,
        "Removed = 100 - 72 = 28.",
        "আঁতৰোৱা = ১০০ - ৭২ = ২৮।"))
    A(R("In a pie chart representing Rs 3600, what is the central angle for a component worth Rs 900?",
        "৩৬০০ টকা প্ৰতিনিধিত্ব কৰা এটা পাই চাৰ্টত ৯০০ টকা মূল্যৰ অংশৰ কেন্দ্ৰীয় কোণ কিমান?",
        [("90 degrees", "৯০ ডিগ্ৰী"), ("60 degrees", "৬০ ডিগ্ৰী"), ("120 degrees", "১২০ ডিগ্ৰী"), ("45 degrees", "৪৫ ডিগ্ৰী")], 0,
        "900/3600 x 360 = 90 degrees.",
        "৯০০/৩৬০০ x ৩৬০ = ৯০ ডিগ্ৰী।"))
    A(R("The range of the data 12, 5, 18, 9, 25, 3 is what?",
        "১২, ৫, ১৮, ৯, ২৫, ৩ তথ্যৰ পৰিসৰ কিমান?",
        [("22", "২২"), ("25", "২৫"), ("20", "২০"), ("18", "১৮")], 0,
        "Range = 25 - 3 = 22.",
        "পৰিসৰ = ২৫ - ৩ = ২২।"))
    A(R("What is the arithmetic mean of the first 20 natural numbers?",
        "প্ৰথম ২০ টা স্বাভাৱিক সংখ্যাৰ সমান্তৰ প্ৰগতি গড় কিমান?",
        [("10.5", "১০.৫"), ("10", "১০"), ("11", "১১"), ("12", "১২")], 0,
        "Mean = (1+20)/2 = 10.5.",
        "গড় = (১+২০)/২ = ১০.৫।"))
    A(R("The median of the data 2, 4, 6, 8, 10, 12, 14 is what?",
        "২, ৪, ৬, ৮, ১০, ১২, ১৪ তথ্যৰ মধ্যমা কিমান?",
        [("8", "৮"), ("6", "৬"), ("10", "১০"), ("7", "৭")], 0,
        "The middle term of seven ordered values is the fourth, 8.",
        "সাতটা ক্ৰমবদ্ধ মানৰ মধ্যম পদটো চতুৰ্থটো, ৮।"))
    A(R("If the mean of 8 observations is 25 and a ninth observation of 34 is added, what is the new mean?",
        "৮ টা পৰ্যবেক্ষণৰ গড় ২৫ আৰু ৩৪ মানৰ নৱম এটা পৰ্যবেক্ষণ যোগ কৰিলে নতুন গড় কিমান?",
        [("26", "২৬"), ("27", "২৭"), ("25.5", "২৫.৫"), ("28", "২৮")], 0,
        "New mean = (200+34)/9 = 26.",
        "নতুন গড় = (২০০+৩৪)/৯ = ২৬।"))
    A(R("The average of three numbers is 40 and that of the first two is 35. What is the third number?",
        "তিনিটা সংখ্যাৰ গড় ৪০ আৰু প্ৰথম দুটাৰ গড় ৩৫। তৃতীয়টো কিমান?",
        [("50", "৫০"), ("45", "৪৫"), ("55", "৫৫"), ("60", "৬০")], 0,
        "Third = 120 - 70 = 50.",
        "তৃতীয় = ১২০ - ৭০ = ৫০।"))
    A(R("In a class of 40 students, 25 passed. What percentage failed?",
        "৪০ জন ছাত্ৰৰ এটা শ্ৰেণীত ২৫ জন উত্তীৰ্ণ হ'ল। কিমান শতাংশ অনুত্তীৰ্ণ হ'ল?",
        [("37.5 per cent", "৩৭.৫ শতাংশ"), ("35 per cent", "৩৫ শতাংশ"), ("40 per cent", "৪০ শতাংশ"), ("42.5 per cent", "৪২.৫ শতাংশ")], 0,
        "15 failed out of 40, so 15/40 x 100 = 37.5 per cent.",
        "৪০ ৰ ভিতৰত ১৫ জন অনুত্তীৰ্ণ, সেয়ে ১৫/৪০ x ১০০ = ৩৭.৫ শতাংশ।"))
    A(R("What is the sum of the first 10 odd natural numbers?",
        "প্ৰথম ১০ টা অযুগ্ম স্বাভাৱিক সংখ্যাৰ যোগফল কিমান?",
        [("100", "১০০"), ("90", "৯০"), ("110", "১১০"), ("121", "১২১")], 0,
        "The sum of the first n odd numbers is n^2 = 100.",
        "প্ৰথম n অযুগ্ম সংখ্যাৰ যোগফল n^২ = ১০০।"))
    A(R("The mean of 7 numbers is 13. What is their total?",
        "৭ টা সংখ্যাৰ গড় ১৩। মুঠ যোগফল কিমান?",
        [("91", "৯১"), ("84", "৮৪"), ("98", "৯৮"), ("78", "৭৮")], 0,
        "Total = 7 x 13 = 91.",
        "মুঠ = ৭ x ১৩ = ৯১।"))

    # ---- Arithmetic: more practice ----
    A(R("A man spends 60 per cent of his income and saves Rs 4000. What is his income?",
        "এজনে তেওঁৰ আয়ৰ ৬০ শতাংশ খৰচ কৰি ৪০০০ টকা সাঁচে। তেওঁৰ আয় কিমান?",
        [("Rs 10000", "১০০০০ টকা"), ("Rs 8000", "৮০০০ টকা"), ("Rs 12000", "১২০০০ টকা"), ("Rs 9000", "৯০০০ টকা")], 0,
        "Savings are 40 per cent, so income = 4000/0.40 = Rs 10000.",
        "সাঁচ ৪০ শতাংশ, সেয়ে আয় = ৪০০০/০.৪০ = ১০০০০ টকা।"))
    A(R("What is the difference between the compound interest and simple interest on Rs 8000 for 2 years at 10 per cent per annum?",
        "৮০০০ টকাৰ ২ বছৰত বছৰি ১০ শতাংশ হাৰত চক্ৰবৃদ্ধি আৰু সৰল সুতৰ পাৰ্থক্য কিমান?",
        [("Rs 80", "৮০ টকা"), ("Rs 100", "১০০ টকা"), ("Rs 60", "৬০ টকা"), ("Rs 120", "১২০ টকা")], 0,
        "Difference = 8000 x (10/100)^2 = Rs 80.",
        "পাৰ্থক্য = ৮০০০ x (১০/১০০)^২ = ৮০ টকা।"))
    A(R("If a train runs at 72 km/h, how many metres does it cover in 20 seconds?",
        "এখন ৰেলগাড়ী ৭২ কিমি/ঘণ্টা গতিত চলিলে ২০ ছেকেণ্ডত কিমান মিটাৰ অতিক্ৰম কৰে?",
        [("400 m", "৪০০ মি"), ("360 m", "৩৬০ মি"), ("480 m", "৪৮০ মি"), ("420 m", "৪২০ মি")], 0,
        "72 km/h = 20 m/s, so in 20 seconds it covers 400 m.",
        "৭২ কিমি/ঘণ্টা = ২০ মি/ছে, সেয়ে ২০ ছেকেণ্ডত ৪০০ মি অতিক্ৰম কৰে।"))
    A(R("The marked price of a shirt is Rs 900 and it is sold at a discount of 20 per cent. What is the selling price?",
        "এটা চাৰ্টৰ চিহ্নিত মূল্য ৯০০ টকা আৰু ২০ শতাংশ ৰেহাইত বিক্ৰী কৰা হয়। বিক্ৰী মূল্য কিমান?",
        [("Rs 720", "৭২০ টকা"), ("Rs 700", "৭০০ টকা"), ("Rs 750", "৭৫০ টকা"), ("Rs 780", "৭৮০ টকা")], 0,
        "Selling price = 900 x 0.80 = Rs 720.",
        "বিক্ৰী মূল্য = ৯০০ x ০.৮০ = ৭২০ টকা।"))
    A(R("The sum of two numbers is 45 and their difference is 9. What is the larger number?",
        "দুটা সংখ্যাৰ যোগফল ৪৫ আৰু পাৰ্থক্য ৯। ডাঙৰ সংখ্যাটো কিমান?",
        [("27", "২৭"), ("24", "২৪"), ("30", "৩০"), ("36", "৩৬")], 0,
        "Larger = (45+9)/2 = 27.",
        "ডাঙৰ = (৪৫+৯)/২ = ২৭।"))
    A(R("A tank is filled by a pipe in 20 minutes and emptied by a leak in 30 minutes. If both are open, in how many minutes will the tank be full?",
        "এটা টেংকি এটা পাইপে ২০ মিনিটত ভৰ্তি কৰে আৰু এটা চিদ্ৰই ৩০ মিনিটত খালী কৰে। দুয়ো খোলা থাকিলে কিমান মিনিটত টেংকি ভৰ্তি হব?",
        [("60 minutes", "৬০ মিনিট"), ("50 minutes", "৫০ মিনিট"), ("45 minutes", "৪৫ মিনিট"), ("40 minutes", "৪০ মিনিট")], 0,
        "Net rate = 1/20 - 1/30 = 1/60, so 60 minutes.",
        "নিট হাৰ = ১/২০ - ১/৩০ = ১/৬০, সেয়ে ৬০ মিনিট।"))
    A(R("What is 2/5 of 3/4 of 200?",
        "২০০ ৰ ৩/৪ ৰ ২/৫ কিমান?",
        [("60", "৬০"), ("50", "৫০"), ("70", "৭০"), ("80", "৮০")], 0,
        "3/4 of 200 is 150, and 2/5 of 150 is 60.",
        "২০০ ৰ ৩/৪ = ১৫০, আৰু ১৫০ ৰ ২/৫ = ৬০।"))
    A(R("If the simple interest on a sum for 5 years at 6 per cent is Rs 900, what is the sum?",
        "৫ বছৰত ৬ শতাংশ হাৰত এখন ধনৰ সৰল সুত ৯০০ টকা হ'লে ধনখন কিমান?",
        [("Rs 3000", "৩০০০ টকা"), ("Rs 2500", "২৫০০ টকা"), ("Rs 3500", "৩৫০০ টকা"), ("Rs 2000", "২০০০ টকা")], 0,
        "Principal = 900 x 100/(6 x 5) = Rs 3000.",
        "মূলধন = ৯০০ x ১০০/(৬ x ৫) = ৩০০০ টকা।"))
    A(R("A clock shows 3 o'clock. What is the angle between the hour and minute hands?",
        "এটা ঘড়ীত ৩ বাজিছে। ঘণ্টা আৰু মিনিট কাঁটাৰ মাজৰ কোণ কিমান?",
        [("90 degrees", "৯০ ডিগ্ৰী"), ("60 degrees", "৬০ ডিগ্ৰী"), ("120 degrees", "১২০ ডিগ্ৰী"), ("45 degrees", "৪৫ ডিগ্ৰী")], 0,
        "Each hour mark is 30 degrees, so 3 x 30 = 90 degrees.",
        "প্ৰতি ঘণ্টা চিহ্ন ৩০ ডিগ্ৰী, সেয়ে ৩ x ৩০ = ৯০ ডিগ্ৰী।"))
    A(R("The average of 15, 25, 35 and 45 is what?",
        "১৫, ২৫, ৩৫ আৰু ৪৫ ৰ গড় কিমান?",
        [("30", "৩০"), ("28", "২৮"), ("32", "৩২"), ("35", "৩৫")], 0,
        "Sum = 120, and 120/4 = 30.",
        "যোগফল = ১২০, আৰু ১২০/৪ = ৩০।"))
    A(R("If 12 pencils cost Rs 96, what will 20 pencils cost?",
        "১২ টা পেঞ্চিলৰ মূল্য ৯৬ টকা হ'লে ২০ টা পেঞ্চিলৰ মূল্য কিমান?",
        [("Rs 160", "১৬০ টকা"), ("Rs 150", "১৫০ টকা"), ("Rs 170", "১৭০ টকা"), ("Rs 180", "১৮০ টকা")], 0,
        "Each pencil is Rs 8, so 20 cost Rs 160.",
        "প্ৰতিটো পেঞ্চিল ৮ টকা, সেয়ে ২০ টাৰ মূল্য ১৬০ টকা।"))
    A(R("The area of a triangle with base 16 cm and height 9 cm is what?",
        "ভূমি ১৬ ছেমি আৰু উচ্চতা ৯ ছেমি হোৱা এটা ত্ৰিভুজৰ কালি কিমান?",
        [("72 square cm", "৭২ বৰ্গ ছেমি"), ("144 square cm", "১৪৪ বৰ্গ ছেমি"), ("80 square cm", "৮০ বৰ্গ ছেমি"), ("64 square cm", "৬৪ বৰ্গ ছেমি")], 0,
        "Area = 1/2 x 16 x 9 = 72 square cm.",
        "কালি = ১/২ x ১৬ x ৯ = ৭২ বৰ্গ ছেমি।"))
    A(R("A number increased by 15 gives 55. What is the number?",
        "এটা সংখ্যা ১৫ বঢ়ালে ৫৫ হয়। সংখ্যাটো কিমান?",
        [("40", "৪০"), ("35", "৩৫"), ("45", "৪৫"), ("30", "৩০")], 0,
        "The number is 55 - 15 = 40.",
        "সংখ্যাটো ৫৫ - ১৫ = ৪০।"))
    A(R("If 2x + 3y = 12 and y = 2, what is the value of x?",
        "২x + ৩y = ১২ আৰু y = ২ হ'লে x ৰ মান কিমান?",
        [("3", "৩"), ("2", "২"), ("4", "৪"), ("5", "৫")], 0,
        "2x = 12 - 6 = 6, so x = 3.",
        "২x = ১২ - ৬ = ৬, সেয়ে x = ৩।"))
    A(R("What is the simple interest on Rs 2500 at 12 per cent per annum for 2 years?",
        "২৫০০ টকাৰ ওপৰত বছৰি ১২ শতাংশ হাৰত ২ বছৰৰ সৰল সুত কিমান?",
        [("Rs 600", "৬০০ টকা"), ("Rs 500", "৫০০ টকা"), ("Rs 700", "৭০০ টকা"), ("Rs 650", "৬৫০ টকা")], 0,
        "SI = 2500 x 12 x 2/100 = Rs 600.",
        "সৰল সুত = ২৫০০ x ১২ x ২/১০০ = ৬০০ টকা।"))
    A(R("A shopkeeper buys 25 kg of rice at Rs 40 per kg. What is the total cost?",
        "এজন দোকানীয়ে ৪০ টকা প্ৰতি কেজি দৰে ২৫ কেজি চাউল কিনে। মুঠ খৰচ কিমান?",
        [("Rs 1000", "১০০০ টকা"), ("Rs 900", "৯০০ টকা"), ("Rs 1100", "১১০০ টকা"), ("Rs 1200", "১২০০ টকা")], 0,
        "Total = 25 x 40 = Rs 1000.",
        "মুঠ = ২৫ x ৪০ = ১০০০ টকা।"))
    A(R("The perimeter of a rectangle is 60 cm and its length is 20 cm. What is its breadth?",
        "এটা আয়তৰ পৰিসীমা ৬০ ছেমি আৰু দীঘ ২০ ছেমি। ইয়াৰ প্ৰস্থ কিমান?",
        [("10 cm", "১০ ছেমি"), ("15 cm", "১৫ ছেমি"), ("12 cm", "১২ ছেমি"), ("8 cm", "৮ ছেমি")], 0,
        "Length + breadth = 30, so breadth = 10 cm.",
        "দীঘ + প্ৰস্থ = ৩০, সেয়ে প্ৰস্থ = ১০ ছেমি।"))
    A(R("What is the value of 0.25 x 0.4?",
        "০.২৫ x ০.৪ ৰ মান কিমান?",
        [("0.1", "০.১"), ("0.01", "০.০১"), ("1", "১"), ("0.5", "০.৫")], 0,
        "0.25 x 0.4 = 0.1.",
        "০.২৫ x ০.৪ = ০.১।"))
    A(R("If a sum doubles itself in 8 years at simple interest, what is the rate per cent per annum?",
        "এখন ধন সৰল সুতত ৮ বছৰত দুগুণ হয়। বছৰি শতকৰা হাৰ কিমান?",
        [("12.5 per cent", "১২.৫ শতাংশ"), ("10 per cent", "১০ শতাংশ"), ("15 per cent", "১৫ শতাংশ"), ("8 per cent", "৮ শতাংশ")], 0,
        "Interest equals principal in 8 years, so rate = 100/8 = 12.5 per cent.",
        "৮ বছৰত সুত মূলধনৰ সমান হয়, সেয়ে হাৰ = ১০০/৮ = ১২.৫ শতাংশ।"))
    A(R("The average of the numbers 5, 10, 15, 20 and 25 is what?",
        "৫, ১০, ১৫, ২০ আৰু ২৫ সংখ্যাৰ গড় কিমান?",
        [("15", "১৫"), ("12.5", "১২.৫"), ("17.5", "১৭.৫"), ("20", "২০")], 0,
        "Sum = 75, and 75/5 = 15.",
        "যোগফল = ৭৫, আৰু ৭৫/৫ = ১৫।"))
    A(R("How many minutes are there in 2.5 hours?",
        "২.৫ ঘণ্টাত কিমান মিনিট থাকে?",
        [("150", "১৫০"), ("120", "১২০"), ("140", "১৪০"), ("160", "১৬০")], 0,
        "2.5 x 60 = 150 minutes.",
        "২.৫ x ৬০ = ১৫০ মিনিট।"))
    A(R("A person covers 3 km in 30 minutes. What is his speed in km/h?",
        "এজনে ৩০ মিনিটত ৩ কিমি অতিক্ৰম কৰে। তেওঁৰ গতি কিমি/ঘণ্টাত কিমান?",
        [("6 km/h", "৬ কিমি/ঘণ্টা"), ("5 km/h", "৫ কিমি/ঘণ্টা"), ("8 km/h", "৮ কিমি/ঘণ্টা"), ("9 km/h", "৯ কিমি/ঘণ্টা")], 0,
        "30 minutes is half an hour, so speed = 3 x 2 = 6 km/h.",
        "৩০ মিনিট আধা ঘণ্টা, সেয়ে গতি = ৩ x ২ = ৬ কিমি/ঘণ্টা।"))
    A(R("What is the least common multiple of 12 and 18?",
        "১২ আৰু ১৮ ৰ লঘিষ্ঠ সাধাৰণ গুণিতক কিমান?",
        [("36", "৩৬"), ("24", "২৪"), ("48", "৪৮"), ("54", "৫৪")], 0,
        "The LCM of 12 and 18 is 36.",
        "১২ আৰু ১৮ ৰ ল.সা.গু. ৩৬।"))
    A(R("A sum of Rs 6000 is lent at 5 per cent per annum. What is the simple interest for 4 years?",
        "৬০০০ টকা বছৰি ৫ শতাংশ হাৰত ঋণ দিয়া হয়। ৪ বছৰৰ সৰল সুত কিমান?",
        [("Rs 1200", "১২০০ টকা"), ("Rs 1000", "১০০০ টকা"), ("Rs 1400", "১৪০০ টকা"), ("Rs 1500", "১৫০০ টকা")], 0,
        "SI = 6000 x 5 x 4/100 = Rs 1200.",
        "সৰল সুত = ৬০০০ x ৫ x ৪/১০০ = ১২০০ টকা।"))
    A(R("If 20 per cent of a number is 75, what is the number?",
        "এটা সংখ্যাৰ ২০ শতাংশ ৭৫ হ'লে সংখ্যাটো কিমান?",
        [("375", "৩৭৫"), ("350", "৩৫০"), ("400", "৪০০"), ("325", "৩২৫")], 0,
        "The number is 75/0.20 = 375.",
        "সংখ্যাটো ৭৫/০.২০ = ৩৭৫।"))
    A(R("A trader marks his goods 40 per cent above cost and gives a discount of 25 per cent. What is his profit per cent?",
        "এজন ব্যৱসায়ীয়ে ক্ৰয় মূল্যৰ পৰা ৪০ শতাংশ বেছি চিহ্নিত কৰি ২৫ শতাংশ ৰেহাই দিয়ে। তেওঁৰ লাভৰ শতকৰা হাৰ কিমান?",
        [("5 per cent", "৫ শতাংশ"), ("10 per cent", "১০ শতাংশ"), ("15 per cent", "১৫ শতাংশ"), ("No profit", "লাভ নাই")], 0,
        "Selling price = 1.40 x 0.75 = 1.05 of cost, so profit is 5 per cent.",
        "বিক্ৰী মূল্য = ক্ৰয়ৰ ১.৪০ x ০.৭৫ = ১.০৫ গুণ, সেয়ে লাভ ৫ শতাংশ।"))
    A(R("What is the sum of the angles of a pentagon?",
        "এটা পঞ্চভুজৰ কোণবোৰৰ যোগফল কিমান?",
        [("540 degrees", "৫৪০ ডিগ্ৰী"), ("360 degrees", "৩৬০ ডিগ্ৰী"), ("720 degrees", "৭২০ ডিগ্ৰী"), ("450 degrees", "৪৫০ ডিগ্ৰী")], 0,
        "The sum of the interior angles of a pentagon is 540 degrees.",
        "পঞ্চভুজৰ অন্তঃকোণবোৰৰ যোগফল ৫৪০ ডিগ্ৰী।"))
    A(R("A car covers a distance of 210 km in 3.5 hours. What is its average speed?",
        "এখন গাড়ীয়ে ৩.৫ ঘণ্টাত ২১০ কিমি দূৰত্ব অতিক্ৰম কৰে। ইয়াৰ গড় গতি কিমান?",
        [("60 km/h", "৬০ কিমি/ঘণ্টা"), ("55 km/h", "৫৫ কিমি/ঘণ্টা"), ("70 km/h", "৭০ কিমি/ঘণ্টা"), ("65 km/h", "৬৫ কিমি/ঘণ্টা")], 0,
        "210/3.5 = 60 km/h.",
        "২১০/৩.৫ = ৬০ কিমি/ঘণ্টা।"))
    A(R("If the cost of 5 kg of rice is Rs 225, what is the cost of 8 kg at the same rate?",
        "৫ কেজি চাউলৰ মূল্য ২২৫ টকা হ'লে একে হাৰত ৮ কেজিৰ মূল্য কিমান?",
        [("Rs 360", "৩৬০ টকা"), ("Rs 340", "৩৪০ টকা"), ("Rs 380", "৩৮০ টকা"), ("Rs 400", "৪০০ টকা")], 0,
        "Each kg is Rs 45, so 8 kg cost Rs 360.",
        "প্ৰতি কেজি ৪৫ টকা, সেয়ে ৮ কেজিৰ মূল্য ৩৬০ টকা।"))

    return r
