"""Section: Reasoning & Mental Ability - 25 fresh bilingual questions."""
from .common import R


def rows():
    r = []
    A = r.append

    # ---- Number series ----
    A(R("Find the next number in the series: 2, 4, 8, 16, ____.",
        "শৃংখলাত পৰৱৰ্তী সংখ্যা উলিয়াওক: 2, 4, 8, 16, ____.",
        [("32", "৩২"), ("24", "২৪"), ("20", "২০"), ("18", "১৮")], 0,
        "Each term is double the previous term, so the next is 32.",
        "প্ৰতিটো পদ আগৰটোৰ দুগুণ, সেয়ে পৰৱৰ্তীটো ৩২।"))
    A(R("Find the next number in the series: 1, 4, 9, 16, ____.",
        "শৃংখলাত পৰৱৰ্তী সংখ্যা উলিয়াওক: 1, 4, 9, 16, ____.",
        [("25", "২৫"), ("20", "২০"), ("24", "২৪"), ("36", "৩৬")], 0,
        "These are squares of 1, 2, 3, 4, so the next is 5 squared = 25.",
        "এইবোৰ ১, ২, ৩, ৪ ৰ বৰ্গ, সেয়ে পৰৱৰ্তীটো ৫ ৰ বৰ্গ = ২৫।"))
    A(R("Find the next number in the series: 3, 6, 12, 24, ____.",
        "শৃংখলাত পৰৱৰ্তী সংখ্যা উলিয়াওক: 3, 6, 12, 24, ____.",
        [("48", "৪৮"), ("36", "৩৬"), ("30", "৩০"), ("42", "৪২")], 0,
        "Each term is double the previous, so the next is 48.",
        "প্ৰতিটো পদ আগৰটোৰ দুগুণ, সেয়ে পৰৱৰ্তীটো ৪৮।"))
    A(R("Find the next number in the series: 5, 10, 20, 40, ____.",
        "শৃংখলাত পৰৱৰ্তী সংখ্যা উলিয়াওক: 5, 10, 20, 40, ____.",
        [("80", "৮০"), ("60", "৬০"), ("50", "৫০"), ("70", "৭০")], 0,
        "Each term doubles, so the next is 80.",
        "প্ৰতিটো পদ দুগুণ হয়, সেয়ে পৰৱৰ্তীটো ৮০।"))
    A(R("Find the next number in the series: 2, 3, 5, 7, 11, ____.",
        "শৃংখলাত পৰৱৰ্তী সংখ্যা উলিয়াওক: 2, 3, 5, 7, 11, ____.",
        [("13", "১৩"), ("12", "১২"), ("14", "১৪"), ("15", "১৫")], 0,
        "These are prime numbers, so the next is 13.",
        "এইবোৰ মৌলিক সংখ্যা, সেয়ে পৰৱৰ্তীটো ১৩।"))

    # ---- Odd one out & analogy ----
    A(R("Find the odd one out: Apple, Banana, Mango, Potato.",
        "আঁতৰ শব্দটো উলিয়াওক: Apple, Banana, Mango, Potato.",
        [("Potato", "Potato"), ("Apple", "Apple"), ("Banana", "Banana"), ("Mango", "Mango")], 0,
        "Potato is a vegetable, while the others are fruits.",
        "Potato এটা পাচলি, আনবোৰ ফল।"))
    A(R("Find the odd one out: Circle, Square, Triangle, Cube.",
        "আঁতৰ শব্দটো উলিয়াওক: Circle, Square, Triangle, Cube.",
        [("Cube", "Cube"), ("Circle", "Circle"), ("Square", "Square"), ("Triangle", "Triangle")], 0,
        "Cube is a three-dimensional shape; the others are two-dimensional.",
        "Cube এটা ত্ৰিমাত্ৰিক আকৃতি; আনবোৰ দ্বিমাত্ৰিক।"))
    A(R("Find the odd one out: Dog, Cat, Cow, Rose.",
        "আঁতৰ শব্দটো উলিয়াওক: Dog, Cat, Cow, Rose.",
        [("Rose", "Rose"), ("Dog", "Dog"), ("Cat", "Cat"), ("Cow", "Cow")], 0,
        "Rose is a flower, while the others are animals.",
        "Rose এটা ফুল, আনবোৰ প্ৰাণী।"))
    A(R("Complete the analogy: Book is to Reading as Fork is to ____.",
        "উপমা সম্পূৰ্ণ কৰক: Book is to Reading as Fork is to ____.",
        [("Eating", "Eating"), ("Writing", "Writing"), ("Drawing", "Drawing"), ("Singing", "Singing")], 0,
        "A book is used for reading, just as a fork is used for eating.",
        "কিতাপ পঢ়িবলৈ ব্যৱহাৰ হয়, কাঁটাচামুচ খাবলৈ ব্যৱহাৰ হয়।"))
    A(R("Complete the analogy: Doctor is to Hospital as Teacher is to ____.",
        "উপমা সম্পূৰ্ণ কৰক: Doctor is to Hospital as Teacher is to ____.",
        [("School", "School"), ("Court", "Court"), ("Farm", "Farm"), ("Market", "Market")], 0,
        "A doctor works in a hospital, as a teacher works in a school.",
        "ডাক্তৰে চিকিৎসালয়ত কাম কৰে, শিক্ষকে বিদ্যালয়ত কাম কৰে।"))
    A(R("Complete the analogy: Pen is to Write as Knife is to ____.",
        "উপমা সম্পূৰ্ণ কৰক: Pen is to Write as Knife is to ____.",
        [("Cut", "Cut"), ("Read", "Read"), ("Sing", "Sing"), ("Jump", "Jump")], 0,
        "A pen is used to write, as a knife is used to cut.",
        "কলম লিখিবলৈ ব্যৱহাৰ হয়, কটাৰী কাটিবলৈ ব্যৱহাৰ হয়।"))

    # ---- Coding-decoding ----
    A(R("If CAT is coded as DBU, then DOG is coded as?",
        "CAT ক DBU ৰূপে কোড কৰিলে DOG ক কি ৰূপে কোড কৰা হ'ব?",
        [("EPH", "EPH"), ("EPG", "EPG"), ("FQH", "FQH"), ("DPH", "DPH")], 0,
        "Each letter is shifted one step forward, so DOG becomes EPH.",
        "প্ৰতিটো আখৰ এখোজ আগুৱাই, সেয়ে DOG হ'ব EPH।"))
    A(R("If A = 1, B = 2, C = 3, then the value of CAB is?",
        "A = 1, B = 2, C = 3 হ'লে CAB ৰ মান কিমান?",
        [("312", "৩১২"), ("123", "১২৩"), ("321", "৩২১"), ("213", "২১৩")], 0,
        "C = 3, A = 1, B = 2, so CAB = 312.",
        "C = 3, A = 1, B = 2, সেয়ে CAB = 312।"))
    A(R("If in a code SUN is written as TVO, then MOON is written as?",
        "এটা কোডত SUN ক TVO লিখিলে MOON ক কি লিখা হ'ব?",
        [("NPPO", "NPPO"), ("NPPN", "NPPN"), ("MPPO", "MPPO"), ("NOPP", "NOPP")], 0,
        "Each letter is shifted one step forward, so MOON becomes NPPO.",
        "প্ৰতিটো আখৰ এখোজ আগুৱাই, সেয়ে MOON হ'ব NPPO।"))

    # ---- Blood relations ----
    A(R("Pointing to a man, a woman said, 'He is the son of my mother.' How is the man related to the woman?",
        "এজন মানুহলৈ আঙুলিয়াই এগৰাকী মহিলাই ক'লে, 'তেওঁ মোৰ মাকৰ পুত্ৰ।' মানুহজন মহিলাগৰাকীৰ কি হয়?",
        [("Brother", "ভাই"), ("Father", "পিতৃ"), ("Uncle", "খুৰা"), ("Cousin", "জ্ঞাতি ভাই")], 0,
        "The son of her mother is her brother.",
        "তেওঁৰ মাকৰ পুত্ৰ হৈছে তেওঁৰ ভাই।"))
    A(R("A is the father of B. B is the sister of C. How is A related to C?",
        "A, B ৰ পিতৃ। B, C ৰ ভগ্নী। A, C ৰ সৈতে কেনে সম্পৰ্ক?",
        [("Father", "পিতৃ"), ("Brother", "ভাই"), ("Uncle", "খুৰা"), ("Son", "পুত্ৰ")], 0,
        "If A is the father of B and B is the sister of C, then A is also the father of C.",
        "A যদি B ৰ পিতৃ আৰু B যদি C ৰ ভগ্নী, তেন্তে A, C ৰো পিতৃ।"))

    # ---- Direction sense ----
    A(R("A man walks 5 km north, then 5 km east. How far is he from the starting point?",
        "এজন মানুহে ৫ কিল'মিটাৰ উত্তৰলৈ, তাৰ পিছত ৫ কিল'মিটাৰ পূৱলৈ খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কিমান দূৰত?",
        [("5√2 km", "৫√২ কিমি"), ("10 km", "১০ কিমি"), ("5 km", "৫ কিমি"), ("25 km", "২৫ কিমি")], 0,
        "By Pythagoras, distance = √(5² + 5²) = 5√2 km.",
        "পাইথাগৰাছৰ মতে, দূৰত্ব = √(৫² + ৫²) = ৫√২ কিমি।"))
    A(R("Facing north, a boy turns 90 degrees clockwise. Which direction does he face now?",
        "উত্তৰলৈ মুখ কৰি থকা ল'ৰাই ঘড়ীৰ দিশত ৯০ ডিগ্ৰী ঘূৰে। এতিয়া তেওঁ কোন দিশলৈ মুখ কৰি আছে?",
        [("East", "পূৱ"), ("West", "পশ্চিম"), ("South", "দক্ষিণ"), ("North", "উত্তৰ")], 0,
        "Turning 90 degrees clockwise from north faces east.",
        "উত্তৰৰ পৰা ঘড়ীৰ দিশত ৯০ ডিগ্ৰী ঘূৰিলে পূৱলৈ মুখ কৰে।"))

    # ---- Clock & calendar ----
    A(R("How many times do the hands of a clock coincide in 12 hours?",
        "১২ ঘণ্টাত ঘড়ীৰ কাঁটা দুটা কিমানবাৰ মিলি যায়?",
        [("11", "১১"), ("12", "১২"), ("10", "১০"), ("24", "২৪")], 0,
        "The hands of a clock coincide 11 times in 12 hours.",
        "১২ ঘণ্টাত ঘড়ীৰ কাঁটা দুটা ১১ বাৰ মিলি যায়।"))
    A(R("What is the angle between the hands of a clock at 3 o'clock?",
        "৩ বজাত ঘড়ীৰ কাঁটা দুটাৰ মাজৰ কোণ কিমান?",
        [("90 degrees", "৯০ ডিগ্ৰী"), ("180 degrees", "১৮০ ডিগ্ৰী"), ("60 degrees", "৬০ ডিগ্ৰী"), ("120 degrees", "১২০ ডিগ্ৰী")], 0,
        "Each hour is 30 degrees, so at 3 o'clock the angle is 90 degrees.",
        "প্ৰতি ঘণ্টা ৩০ ডিগ্ৰী, সেয়ে ৩ বজাত কোণ ৯০ ডিগ্ৰী।"))

    # ---- Logical deduction ----
    A(R("If all roses are flowers and all flowers need water, then roses?",
        "সকলো গোলাপ ফুল আৰু সকলো ফুলে পানী লাগে, তেন্তে গোলাপে?",
        [("Need water", "পানী লাগে"), ("Do not need water", "পানী নালাগে"), ("Are not flowers", "ফুল নহয়"), ("Cannot be decided", "স্থিৰ কৰিব নোৱাৰি")], 0,
        "Since all roses are flowers and all flowers need water, roses need water.",
        "সকলো গোলাপ ফুল আৰু সকলো ফুলে পানী লাগে, সেয়ে গোলাপেও পানী লাগে।"))
    A(R("Which number should replace the question mark: 7, 14, 28, ____, 112?",
        "কোন সংখ্যাই প্ৰশ্নবোধক চিহ্ন প্ৰতিস্থাপন কৰিব: 7, 14, 28, ____, 112?",
        [("56", "৫৬"), ("42", "৪২"), ("60", "৬০"), ("48", "৪৮")], 0,
        "Each term doubles, so 28 × 2 = 56.",
        "প্ৰতিটো পদ দুগুণ হয়, সেয়ে ২৮ × ২ = ৫৬।"))
    A(R("Complete the series: A, C, E, G, ____.",
        "শৃংখলা সম্পূৰ্ণ কৰক: A, C, E, G, ____.",
        [("I", "I"), ("H", "H"), ("J", "J"), ("K", "K")], 0,
        "Every alternate letter is taken, so after G comes I.",
        "প্ৰতি দ্বিতীয় আখৰ লোৱা হয়, সেয়ে G ৰ পিছত I আহে।"))
    A(R("If 5 pens cost Rs 40, what is the cost of 8 pens?",
        "৫ টা কলমৰ দাম ৪০ টকা হ'লে ৮ টা কলমৰ দাম কিমান?",
        [("Rs 64", "৬৪ টকা"), ("Rs 56", "৫৬ টকা"), ("Rs 72", "৭২ টকা"), ("Rs 60", "৬০ টকা")], 0,
        "Cost of one pen is 40 ÷ 5 = 8, so 8 pens cost 8 × 8 = Rs 64.",
        "এটা কলমৰ দাম ৪০ ÷ ৫ = ৮, সেয়ে ৮ টা কলমৰ দাম ৮ × ৮ = ৬৪ টকা।"))
    A(R("Which of the following is the mirror image of the word 'CAT' when held in front of a plane mirror?",
        "সমতল দাপোণৰ সন্মুখত ধৰিলে 'CAT' শব্দটোৰ দাপোণ-প্ৰতিবিম্ব কেনেকুৱা হয়?",
        [("Reversed horizontally", "অনুভূমিকভাৱে ওলোটা"), ("Reversed vertically", "উল্লম্বভাৱে ওলোটা"), ("Unchanged", "অপৰিৱৰ্তিত"), ("Rotated 180 degrees", "১৮০ ডিগ্ৰী ঘূৰোৱা")], 0,
        "A plane mirror reverses the image horizontally.",
        "সমতল দাপোণে প্ৰতিবিম্বক অনুভূমিকভাৱে ওলোটা কৰে।"))

    return r
