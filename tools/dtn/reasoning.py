"""Section: Reasoning & Mental Ability - 85 fresh bilingual questions."""
from .common import R


def rows():
    r = []
    A = r.append

    # ---- Series completion ----
    A(R("Find the next term in the series 3, 6, 11, 18, 27, ...",
        "৩, ৬, ১১, ১৮, ২৭, ... শৃংখলাৰ পৰৱৰ্তী পদটো নিৰ্ণয় কৰক।",
        [("38", "৩৮"), ("36", "৩৬"), ("40", "৪০"), ("35", "৩৫")], 0,
        "The differences are 3, 5, 7, 9, so the next difference is 11 and 27 + 11 = 38.",
        "পাৰ্থক্যবোৰ ৩, ৫, ৭, ৯, সেয়ে পৰৱৰ্তী পাৰ্থক্য ১১ আৰু ২৭ + ১১ = ৩৮।"))
    A(R("What comes next in the series 2, 6, 12, 20, 30, ...?",
        "২, ৬, ১২, ২০, ৩০, ... শৃংখলাত পৰৱৰ্তীটো কি?",
        [("42", "৪২"), ("40", "৪০"), ("44", "৪৪"), ("38", "৩৮")], 0,
        "The differences are 4, 6, 8, 10, so the next is 12 and 30 + 12 = 42.",
        "পাৰ্থক্যবোৰ ৪, ৬, ৮, ১০, সেয়ে পৰৱৰ্তী ১২ আৰু ৩০ + ১২ = ৪২।"))
    A(R("Complete the series 1, 4, 9, 16, 25, ...",
        "১, ৪, ৯, ১৬, ২৫, ... শৃংখলাটো সম্পূৰ্ণ কৰক।",
        [("36", "৩৬"), ("30", "৩০"), ("35", "৩৫"), ("49", "৪৯")], 0,
        "These are perfect squares, so the next is 6^2 = 36.",
        "এইবোৰ নিখুঁত বৰ্গ, সেয়ে পৰৱৰ্তী ৬^২ = ৩৬।"))
    A(R("Find the missing term: 5, 10, 20, 40, ...",
        "অনুপস্থিত পদটো নিৰ্ণয় কৰক: ৫, ১০, ২০, ৪০, ...",
        [("80", "৮০"), ("60", "৬০"), ("70", "৭০"), ("100", "১০০")], 0,
        "Each term doubles, so the next is 80.",
        "প্ৰতিটো পদ দুগুণ হয়, সেয়ে পৰৱৰ্তী ৮০।"))
    A(R("What is the next number in the series 81, 27, 9, 3, ...?",
        "৮১, ২৭, ৯, ৩, ... শৃংখলাত পৰৱৰ্তী সংখ্যাটো কিমান?",
        [("1", "১"), ("0", "০"), ("2", "২"), ("3", "৩")], 0,
        "Each term is divided by 3, so the next is 1.",
        "প্ৰতিটো পদ ৩ ৰে হৰণ হয়, সেয়ে পৰৱৰ্তী ১।"))
    A(R("Complete the series A, C, F, J, O, ...",
        "A, C, F, J, O, ... শৃংখলাটো সম্পূৰ্ণ কৰক।",
        [("U", "U"), ("T", "T"), ("V", "V"), ("S", "S")], 0,
        "The gaps increase by one letter each time, giving U.",
        "ব্যৱধান প্ৰতিবাৰ এটা আখৰে বৃদ্ধি পায়, সেয়ে U।"))
    A(R("Find the next term: 7, 14, 28, 56, ...",
        "পৰৱৰ্তী পদটো নিৰ্ণয় কৰক: ৭, ১৪, ২৮, ৫৬, ...",
        [("112", "১১২"), ("98", "৯৮"), ("102", "১০২"), ("120", "১২০")], 0,
        "Each term doubles, so the next is 112.",
        "প্ৰতিটো পদ দুগুণ হয়, সেয়ে পৰৱৰ্তী ১১২।"))
    A(R("What comes next in the series 1, 1, 2, 3, 5, 8, ...?",
        "১, ১, ২, ৩, ৫, ৮, ... শৃংখলাত পৰৱৰ্তীটো কি?",
        [("13", "১৩"), ("11", "১১"), ("12", "১২"), ("10", "১০")], 0,
        "This is the Fibonacci series, and 5 + 8 = 13.",
        "এইটো ফিব'নাচি শৃংখলা, আৰু ৫ + ৮ = ১৩।"))
    A(R("Find the missing number: 100, 90, 81, 73, 66, ...",
        "অনুপস্থিত সংখ্যাটো নিৰ্ণয় কৰক: ১০০, ৯০, ৮১, ৭৩, ৬৬, ...",
        [("60", "৬০"), ("58", "৫৮"), ("62", "৬২"), ("55", "৫৫")], 0,
        "The differences are 10, 9, 8, 7, so the next is 66 - 6 = 60.",
        "পাৰ্থক্যবোৰ ১০, ৯, ৮, ৭, সেয়ে পৰৱৰ্তী ৬৬ - ৬ = ৬০।"))
    A(R("Complete the series 4, 9, 16, 25, ...",
        "৪, ৯, ১৬, ২৫, ... শৃংখলাটো সম্পূৰ্ণ কৰক।",
        [("36", "৩৬"), ("32", "৩২"), ("49", "৪৯"), ("30", "৩০")], 0,
        "These are squares of 2, 3, 4, 5, so the next is 6^2 = 36.",
        "এইবোৰ ২, ৩, ৪, ৫ ৰ বৰ্গ, সেয়ে পৰৱৰ্তী ৬^২ = ৩৬।"))
    A(R("What is the next term in 2, 3, 5, 7, 11, ...?",
        "২, ৩, ৫, ৭, ১১, ... ত পৰৱৰ্তী পদটো কিমান?",
        [("13", "১৩"), ("12", "১২"), ("14", "১৪"), ("15", "১৫")], 0,
        "These are prime numbers, so the next prime is 13.",
        "এইবোৰ মৌলিক সংখ্যা, সেয়ে পৰৱৰ্তী মৌলিক সংখ্যা ১৩।"))
    A(R("Find the next number: 6, 11, 21, 41, ...",
        "পৰৱৰ্তী সংখ্যাটো নিৰ্ণয় কৰক: ৬, ১১, ২১, ৪১, ...",
        [("81", "৮১"), ("71", "৭১"), ("91", "৯১"), ("61", "৬১")], 0,
        "Each term is double the previous minus one, so 41 x 2 - 1 = 81.",
        "প্ৰতিটো পদ পূৰ্বৰ দুগুণৰ পৰা এক কম, সেয়ে ৪১ x ২ - ১ = ৮১।"))

    # ---- Odd one out ----
    A(R("Which one is the odd one out: square, rectangle, triangle, cube?",
        "কোনটো অদ্ভুত: বৰ্গ, আয়ত, ত্ৰিভুজ, ঘনক?",
        [("Cube", "ঘনক"), ("Square", "বৰ্গ"), ("Rectangle", "আয়ত"), ("Triangle", "ত্ৰিভুজ")], 0,
        "A cube is a three-dimensional solid while the others are plane figures.",
        "ঘনক ত্ৰিমাত্ৰিক ঠোছ, আনবোৰ সমতল আকৃতি।"))
    A(R("Which one does not belong: rose, lotus, mango, sunflower?",
        "কোনটো নিমিলে: গোলাপ, পদুম, আম, সূৰ্যমুখী?",
        [("Mango", "আম"), ("Rose", "গোলাপ"), ("Lotus", "পদুম"), ("Sunflower", "সূৰ্যমুখী")], 0,
        "Mango is a fruit while the others are flowers.",
        "আম এটা ফল, আনবোৰ ফুল।"))
    A(R("Find the odd one: 3, 5, 7, 9, 11.",
        "অদ্ভুতটো নিৰ্ণয় কৰক: ৩, ৫, ৭, ৯, ১১।",
        [("9", "৯"), ("3", "৩"), ("5", "৫"), ("11", "১১")], 0,
        "All the others are prime numbers while 9 is composite.",
        "আনবোৰ মৌলিক সংখ্যা কিন্তু ৯ যৌগিক।"))
    A(R("Which one is different: eye, ear, nose, glove?",
        "কোনটো বেলেগ: চকু, কাণ, নাক, গ্লাভছ?",
        [("Glove", "গ্লাভছ"), ("Eye", "চকু"), ("Ear", "কাণ"), ("Nose", "নাক")], 0,
        "A glove is worn while the others are sense organs.",
        "গ্লাভছ পিন্ধা হয়, আনবোৰ ইন্দ্ৰিয় অংগ।"))
    A(R("Pick the odd one out: copper, iron, silver, plastic.",
        "অদ্ভুতটো বাছনি কৰক: তাম, লোহা, ৰূপ, প্লাষ্টিক।",
        [("Plastic", "প্লাষ্টিক"), ("Copper", "তাম"), ("Iron", "লোহা"), ("Silver", "ৰূপ")], 0,
        "Plastic is not a metal while the others are metals.",
        "প্লাষ্টিক ধাতু নহয়, আনবোৰ ধাতু।"))
    A(R("Which is the odd one: Assam, Kerala, Guwahati, Bihar?",
        "অদ্ভুতটো কোনটো: অসম, কেৰালা, গুৱাহাটী, বিহাৰ?",
        [("Guwahati", "গুৱাহাটী"), ("Assam", "অসম"), ("Kerala", "কেৰালা"), ("Bihar", "বিহাৰ")], 0,
        "Guwahati is a city while the others are states.",
        "গুৱাহাটী এখন নগৰ, আনবোৰ ৰাজ্য।"))
    A(R("Find the odd one: 16, 25, 36, 42, 49.",
        "অদ্ভুতটো নিৰ্ণয় কৰক: ১৬, ২৫, ৩৬, ৪২, ৪৯।",
        [("42", "৪২"), ("16", "১৬"), ("25", "২৫"), ("36", "৩৬")], 0,
        "The others are perfect squares, while 42 is not.",
        "আনবোৰ নিখুঁত বৰ্গ, কিন্তু ৪২ নহয়।"))
    A(R("Which one does not fit: cricket, hockey, football, chess?",
        "কোনটো নিমিলে: ক্ৰিকেট, হকী, ফুটবল, দবা?",
        [("Chess", "দবা"), ("Cricket", "ক্ৰিকেট"), ("Hockey", "হকী"), ("Football", "ফুটবল")], 0,
        "Chess is an indoor game while the others are outdoor games.",
        "দবা এটা ঘৰুৱা খেল, আনবোৰ বাহিৰৰ খেল।"))
    A(R("Pick the odd one: gold, silver, bronze, oxygen.",
        "অদ্ভুতটো বাছনি কৰক: সোণ, ৰূপ, ব্ৰঞ্জ, অক্সিজেন।",
        [("Oxygen", "অক্সিজেন"), ("Gold", "সোণ"), ("Silver", "ৰূপ"), ("Bronze", "ব্ৰঞ্জ")], 0,
        "Oxygen is a gas while the others are metals or alloys.",
        "অক্সিজেন এটা গেছ, আনবোৰ ধাতু বা মিশ্ৰধাতু।"))
    A(R("Which one is different: mango, apple, banana, carrot?",
        "কোনটো বেলেগ: আম, আপেল, কল, গাজৰ?",
        [("Carrot", "গাজৰ"), ("Mango", "আম"), ("Apple", "আপেল"), ("Banana", "কল")], 0,
        "A carrot is a vegetable while the others are fruits.",
        "গাজৰ এখন পাচলি, আনবোৰ ফল।"))

    # ---- Coding-decoding ----
    A(R("If CAT is coded as 3-1-20, how is DOG coded?",
        "CAT ক ৩-১-২০ হিচাপে সংকেতবদ্ধ কৰিলে DOG কেনেকৈ হব?",
        [("4-15-7", "৪-১৫-৭"), ("4-14-7", "৪-১৪-৭"), ("3-15-7", "৩-১৫-৭"), ("4-15-8", "৪-১৫-৮")], 0,
        "Each letter is replaced by its position in the alphabet.",
        "প্ৰতিটো আখৰ ইয়াৰ বৰ্ণমালাৰ স্থানৰে সলনি কৰা হয়।"))
    A(R("If in a code language MOTHER is written as NPUIFS, how is FATHER written?",
        "কোনো সংকেত ভাষাত MOTHER ক NPUIFS লিখা হ'লে FATHER কেনেকৈ লিখা হব?",
        [("GBUIFS", "GBUIFS"), ("GBUIFR", "GBUIFR"), ("GBTIFS", "GBTIFS"), ("GBUJFS", "GBUJFS")], 0,
        "Each letter is shifted one place forward in the alphabet.",
        "প্ৰতিটো আখৰ বৰ্ণমালাত এঘৰ আগলৈ যায়।"))
    A(R("If SOUTH is coded as TPVUI, how is NORTH coded?",
        "SOUTH ক TPVUI সংকেত কৰিলে NORTH কেনেকৈ হব?",
        [("OPSUI", "OPSUI"), ("OPSUJ", "OPSUJ"), ("NPSUI", "NPSUI"), ("OQSUI", "OQSUI")], 0,
        "Each letter is moved one step forward.",
        "প্ৰতিটো আখৰ এঘৰ আগলৈ লৈ যোৱা হয়।"))
    A(R("In a certain code, RIVER is written as 5-4-6-2-5. What is the code for WATER?",
        "কিছু সংকেতত RIVER ক ৫-৪-৬-২-৫ লিখা হয়। WATER ৰ সংকেত কি?",
        [("5-1-7-5-5", "৫-১-৭-৫-৫"), ("5-1-7-5-4", "৫-১-৭-৫-৪"), ("4-1-7-5-5", "৪-১-৭-৫-৫"), ("5-2-7-5-5", "৫-২-৭-৫-৫")], 0,
        "The code gives each letter's alphabetic position.",
        "সংকেতটোৱে প্ৰতিটো আখৰৰ বৰ্ণমালাৰ স্থান দিয়ে।"))
    A(R("If 'pen' means 'book', 'book' means 'bag' and 'bag' means 'table', what do we read with?",
        "'pen' ৰ অৰ্থ 'book', 'book' ৰ অৰ্থ 'bag' আৰু 'bag' ৰ অৰ্থ 'table' হ'লে আমি কিৰে পঢ়োঁ?",
        [("Book", "book"), ("Pen", "pen"), ("Bag", "bag"), ("Table", "table")], 0,
        "We read with a book, and here 'pen' means 'book'.",
        "আমি book ৰে পঢ়োঁ, আৰু ইয়াত 'pen' ৰ অৰ্থ 'book'।"))
    A(R("If EARTH is coded as 5-1-18-20-8, what is the code for MOON?",
        "EARTH ক ৫-১-১৮-২০-৮ সংকেত কৰিলে MOON ৰ সংকেত কি?",
        [("13-15-15-14", "১৩-১৫-১৫-১৪"), ("13-14-15-14", "১৩-১৪-১৫-১৪"), ("13-15-14-14", "১৩-১৫-১৪-১৪"), ("12-15-15-14", "১২-১৫-১৫-১৪")], 0,
        "Each letter is coded by its alphabetic position.",
        "প্ৰতিটো আখৰ বৰ্ণমালাৰ স্থানৰে সংকেত কৰা হয়।"))
    A(R("If 'sky' is called 'sea', 'sea' is called 'land', and 'land' is called 'water', where do fish live?",
        "'sky' ক 'sea', 'sea' ক 'land' আৰু 'land' ক 'water' বোলা হ'লে মাছে ক'ত বাস কৰে?",
        [("Land", "land"), ("Sea", "sea"), ("Water", "water"), ("Sky", "sky")], 0,
        "Fish live in the sea, and here 'sea' is called 'land'.",
        "মাছে sea ত বাস কৰে, আৰু ইয়াত 'sea' ক 'land' বোলা হয়।"))
    A(R("In a code, 123 means 'bright little boy' and 145 means 'tall big boy'. What digit stands for 'bright'?",
        "এটা সংকেতত ১২৩ মানে 'bright little boy' আৰু ১৪৫ মানে 'tall big boy'। 'bright' ৰ বাবে কোনটো অংক?",
        [("2", "২"), ("1", "১"), ("3", "৩"), ("5", "৫")], 0,
        "The common digit 1 stands for 'boy', so 'bright' is 2.",
        "সাধাৰণ অংক ১ য়ে 'boy' সূচায়, সেয়ে 'bright' ২।"))
    A(R("If PENCIL is written as QFODJM, how is PAPER written?",
        "PENCIL ক QFODJM লিখা হ'লে PAPER কেনেকৈ লিখা হব?",
        [("QBQFS", "QBQFS"), ("QBQFR", "QBQFR"), ("QBQES", "QBQES"), ("QAQFS", "QAQFS")], 0,
        "Each letter is shifted one place forward.",
        "প্ৰতিটো আখৰ এঘৰ আগলৈ যায়।"))
    A(R("If DELHI is coded as CDKGH, how is MUMBAI coded?",
        "DELHI ক CDKGH সংকেত কৰিলে MUMBAI কেনেকৈ হব?",
        [("LTLAZH", "LTLAZH"), ("LTLAZG", "LTLAZG"), ("LTMAZH", "LTMAZH"), ("LSLAZH", "LSLAZH")], 0,
        "Each letter is shifted one place backward.",
        "প্ৰতিটো আখৰ এঘৰ পিছলৈ যায়।"))

    # ---- Blood relations ----
    A(R("Pointing to a photograph, a man says, 'She is the daughter of my grandfather's only son.' How is she related to him?",
        "এখন ফটো দেখুৱাই এজনে কয়, 'তেওঁ মোৰ ককাৰ একমাত্ৰ পুত্ৰৰ জীয়েক।' তেওঁ এজনৰ লগত কেনে সম্পৰ্কীয়?",
        [("Sister", "ভনী"), ("Cousin", "খুড়ী-জীয়েক"), ("Aunt", "পেহী"), ("Niece", "ভতিজী")], 0,
        "The grandfather's only son is his father, so she is his sister.",
        "ককাৰ একমাত্ৰ পুত্ৰ তেওঁৰ পিতৃ, সেয়ে তেওঁ তেওঁৰ ভনী।"))
    A(R("A is the father of B. B is the sister of C. How is A related to C?",
        "A, B ৰ পিতৃ। B, C ৰ ভনী। A, C ৰ লগত কেনে সম্পৰ্কীয়?",
        [("Father", "পিতৃ"), ("Uncle", "খুড়া"), ("Brother", "ভাই"), ("Grandfather", "ককা")], 0,
        "B and C are siblings, so A is C's father as well.",
        "B আৰু C সহোদৰ, সেয়ে Aও C ৰ পিতৃ।"))
    A(R("X is the brother of Y. Y is the mother of Z. How is X related to Z?",
        "X, Y ৰ ভাই। Y, Z ৰ মাতৃ। X, Z ৰ লগত কেনে সম্পৰ্কীয়?",
        [("Maternal uncle", "মামা"), ("Father", "পিতৃ"), ("Brother", "ভাই"), ("Grandfather", "ককা")], 0,
        "X is the brother of Z's mother, so he is Z's maternal uncle.",
        "X, Z ৰ মাতৃৰ ভাই, সেয়ে তেওঁ Z ৰ মামা।"))
    A(R("My father's only daughter is the sister of which person?",
        "মোৰ পিতৃৰ একমাত্ৰ জীয়েক কোনজনৰ ভনী?",
        [("Me (if I am male)", "মই (যদি মই পুৰুষ)"), ("My son", "মোৰ পুত্ৰ"), ("My cousin", "মোৰ খুড়ী-ভাই"), ("My uncle", "মোৰ খুড়া")], 0,
        "If the speaker is male, his father's only daughter is his sister.",
        "যদি কওঁতাজন পুৰুষ, তেওঁৰ পিতৃৰ একমাত্ৰ জীয়েক তেওঁৰ ভনী।"))
    A(R("P is the son of Q. Q is the daughter of R. How is P related to R?",
        "P, Q ৰ পুত্ৰ। Q, R ৰ জীয়েক। P, R ৰ লগত কেনে সম্পৰ্কীয়?",
        [("Grandson", "নাতি"), ("Son", "পুত্ৰ"), ("Nephew", "ভতিজা"), ("Brother", "ভাই")], 0,
        "P is the son of R's daughter, so P is R's grandson.",
        "P, R ৰ জীয়েকৰ পুত্ৰ, সেয়ে P, R ৰ নাতি।"))
    A(R("A woman says, 'This man is the son of my mother's father.' How is the man related to her?",
        "এগৰাকী মহিলাই কয়, 'এই মানুহজন মোৰ মাকৰ দেউতাকৰ পুত্ৰ।' মানুহজন তাইৰ লগত কেনে সম্পৰ্কীয়?",
        [("Maternal uncle", "মামা"), ("Father", "পিতৃ"), ("Brother", "ভাই"), ("Cousin", "খুড়ী-ভাই")], 0,
        "Her mother's father is her grandfather, and his son is her maternal uncle.",
        "তাইৰ মাকৰ দেউতাক তাইৰ ককা, আৰু তেওঁৰ পুত্ৰ তাইৰ মামা।"))
    A(R("If A + B means A is the mother of B, and A - B means A is the sister of B, what does P + Q - R mean?",
        "A + B মানে A, B ৰ মাতৃ, আৰু A - B মানে A, B ৰ ভনী হ'লে P + Q - R ৰ অৰ্থ কি?",
        [("P is the mother of R", "P, R ৰ মাতৃ"), ("P is the sister of R", "P, R ৰ ভনী"), ("P is the aunt of R", "P, R ৰ পেহী"), ("P is the grandmother of R", "P, R ৰ আইতা")], 0,
        "P is Q's mother and Q is R's sister, so P is R's mother too.",
        "P, Q ৰ মাতৃ আৰু Q, R ৰ ভনী, সেয়ে Pও R ৰ মাতৃ।"))
    A(R("Ravi's mother is the only daughter of Mohan's father. How is Mohan related to Ravi?",
        "ৰবিৰ মাতৃ মোহনৰ পিতৃৰ একমাত্ৰ জীয়েক। মোহন ৰবিৰ লগত কেনে সম্পৰ্কীয়?",
        [("Maternal uncle", "মামা"), ("Father", "পিতৃ"), ("Brother", "ভাই"), ("Cousin", "খুড়ী-ভাই")], 0,
        "Ravi's mother is Mohan's sister, so Mohan is Ravi's maternal uncle.",
        "ৰবিৰ মাতৃ মোহনৰ ভনী, সেয়ে মোহন ৰবিৰ মামা।"))
    A(R("Introducing a man, a woman said, 'His wife is the only daughter of my mother.' How is the woman related to the man?",
        "এজন মানুহৰ পৰিচয় দি এগৰাকী মহিলাই ক'লে, 'তেওঁৰ পত্নী মোৰ মাকৰ একমাত্ৰ জীয়েক।' মহিলাগৰাকী মানুহজনৰ লগত কেনে সম্পৰ্কীয়?",
        [("Mother-in-law", "শাহু"), ("Sister", "ভনী"), ("Aunt", "পেহী"), ("Mother", "মাতৃ")], 0,
        "The man's wife is the woman's sister, so the woman is his mother-in-law.",
        "মানুহজনৰ পত্নী মহিলাগৰাকীৰ ভনী, সেয়ে মহিলাগৰাকী তেওঁৰ শাহু।"))
    A(R("Suresh is the son of my mother's brother. How is Suresh related to me?",
        "সুৰেশ মোৰ মাকৰ ভাইৰ পুত্ৰ। সুৰেশ মোৰ লগত কেনে সম্পৰ্কীয়?",
        [("Cousin", "খুড়ী-ভাই"), ("Brother", "ভাই"), ("Nephew", "ভতিজা"), ("Uncle", "খুড়া")], 0,
        "My mother's brother is my maternal uncle, and his son is my cousin.",
        "মোৰ মাকৰ ভাই মোৰ মামা, আৰু তেওঁৰ পুত্ৰ মোৰ খুড়ী-ভাই।"))

    # ---- Direction sense ----
    A(R("A man walks 5 km north, then 3 km east, then 5 km south. How far is he from the starting point?",
        "এজনে ৫ কিমি উত্তৰে, তাৰপিছত ৩ কিমি পূবে, তাৰপিছত ৫ কিমি দক্ষিণে খোজ কাঢ়ে। তেওঁ আৰম্ভণি বিন্দুৰ পৰা কিমান দূৰত?",
        [("3 km", "৩ কিমি"), ("5 km", "৫ কিমি"), ("8 km", "৮ কিমি"), ("13 km", "১৩ কিমি")], 0,
        "The north and south cancel, leaving 3 km east.",
        "উত্তৰ আৰু দক্ষিণ কাটাকটি যায়, বাকী থাকে ৩ কিমি পূব।"))
    A(R("Facing north, Ravi turns 90 degrees clockwise, then 180 degrees anticlockwise. Which direction is he facing now?",
        "উত্তৰমুখী হৈ ৰবি ৯০ ডিগ্ৰী ঘড়ীৰ কাঁটাৰ দিশত ঘূৰে, তাৰপিছত ১৮০ ডিগ্ৰী ঘড়ীৰ কাঁটাৰ বিপৰীত দিশত ঘূৰে। এতিয়া তেওঁ কোন দিশলৈ মুখ কৰি আছে?",
        [("West", "পশ্চিম"), ("East", "পূব"), ("South", "দক্ষিণ"), ("North", "উত্তৰ")], 0,
        "North + 90 clockwise = East, then 180 anticlockwise = West.",
        "উত্তৰ + ৯০ ঘড়ীৰ দিশ = পূব, তাৰপিছত ১৮০ বিপৰীত = পশ্চিম।"))
    A(R("A is to the west of B. C is to the east of B. In which direction is C from A?",
        "A, B ৰ পশ্চিমে। C, B ৰ পূবে। A ৰ পৰা C কোন দিশত?",
        [("East", "পূব"), ("West", "পশ্চিম"), ("North", "উত্তৰ"), ("South", "দক্ষিণ")], 0,
        "C is to the east of B, and B is to the east of A, so C is east of A.",
        "C, B ৰ পূবে, আৰু B, A ৰ পূবে, সেয়ে C, A ৰ পূবে।"))
    A(R("A man goes 4 km south, then turns left and walks 3 km. Which direction is he facing now?",
        "এজনে ৪ কিমি দক্ষিণে গৈ বাওঁফালে ঘূৰি ৩ কিমি খোজ কাঢ়ে। এতিয়া তেওঁ কোন দিশলৈ মুখ কৰি আছে?",
        [("East", "পূব"), ("West", "পশ্চিম"), ("North", "উত্তৰ"), ("South", "দক্ষিণ")], 0,
        "Facing south, a left turn faces him east.",
        "দক্ষিণমুখী হৈ বাওঁফালে ঘূৰিলে তেওঁ পূবমুখী হয়।"))
    A(R("Sunita walks 10 m north, turns right and walks 10 m, then turns right and walks 10 m. How far is she from the start?",
        "সুনীতাই ১০ মি উত্তৰে খোজ কাঢ়ি সোঁফালে ঘূৰি ১০ মি যায়, তাৰপিছত সোঁফালে ঘূৰি ১০ মি যায়। তাই আৰম্ভণিৰ পৰা কিমান দূৰত?",
        [("10 m", "১০ মি"), ("20 m", "২০ মি"), ("30 m", "৩০ মি"), ("0 m", "০ মি")], 0,
        "She ends 10 m east of the start.",
        "তাই আৰম্ভণিৰ ১০ মি পূবে শেষ কৰে।"))
    A(R("If North becomes East, East becomes South, and so on, what does South-West become?",
        "যদি উত্তৰ পূব হয়, পূব দক্ষিণ হয়, আদি, তেন্তে দক্ষিণ-পশ্চিম কি হয়?",
        [("North-West", "উত্তৰ-পশ্চিম"), ("South-East", "দক্ষিণ-পূব"), ("North-East", "উত্তৰ-পূব"), ("South-West", "দক্ষিণ-পশ্চিম")], 0,
        "Each direction rotates 90 degrees clockwise, so South-West becomes North-West.",
        "প্ৰতিটো দিশ ৯০ ডিগ্ৰী ঘড়ীৰ কাঁটাৰ দিশত ঘূৰে, সেয়ে দক্ষিণ-পশ্চিম উত্তৰ-পশ্চিম হয়।"))
    A(R("P is 3 km north of Q. R is 3 km east of Q. What is the direction of P from R?",
        "P, Q ৰ ৩ কিমি উত্তৰে। R, Q ৰ ৩ কিমি পূবে। R ৰ পৰা P কোন দিশত?",
        [("North-West", "উত্তৰ-পশ্চিম"), ("North-East", "উত্তৰ-পূব"), ("South-West", "দক্ষিণ-পশ্চিম"), ("South-East", "দক্ষিণ-পূব")], 0,
        "P is north and west of R, so it is to the north-west.",
        "P, R ৰ উত্তৰ আৰু পশ্চিমে, সেয়ে ই উত্তৰ-পশ্চিমত।"))
    A(R("A clock shows 6 o'clock. If the hour hand points north, which direction does the minute hand point?",
        "এটা ঘড়ীত ৬ বাজিছে। ঘণ্টা কাঁটাই উত্তৰলৈ দেখুৱালে মিনিট কাঁটাই কোন দিশলৈ দেখুৱাব?",
        [("North", "উত্তৰ"), ("South", "দক্ষিণ"), ("East", "পূব"), ("West", "পশ্চিম")], 0,
        "At 6 o'clock both hands point in the same direction.",
        "৬ বজাত দুয়ো কাঁটা একে দিশলৈ দেখুৱায়।"))
    A(R("A person walks 2 km east, 2 km north, 2 km west and 2 km south. Where does he end up?",
        "এজনে ২ কিমি পূবে, ২ কিমি উত্তৰে, ২ কিমি পশ্চিমে আৰু ২ কিমি দক্ষিণে খোজ কাঢ়ে। তেওঁ ক'ত শেষ কৰে?",
        [("At the starting point", "আৰম্ভণি বিন্দুত"), ("2 km north", "২ কিমি উত্তৰে"), ("2 km east", "২ কিমি পূবে"), ("4 km from start", "আৰম্ভণিৰ পৰা ৪ কিমি")], 0,
        "The movements cancel out, returning him to the start.",
        "গতিবোৰ কাটাকটি যায়, তেওঁ আৰম্ভণি বিন্দুলৈ ঘূৰি আহে।"))
    A(R("Kamal is facing east. He turns 135 degrees clockwise. Which direction is he facing now?",
        "কমল পূবমুখী। তেওঁ ১৩৫ ডিগ্ৰী ঘড়ীৰ কাঁটাৰ দিশত ঘূৰে। এতিয়া তেওঁ কোন দিশলৈ মুখ কৰি আছে?",
        [("South-West", "দক্ষিণ-পশ্চিম"), ("South-East", "দক্ষিণ-পূব"), ("North-West", "উত্তৰ-পশ্চিম"), ("South", "দক্ষিণ")], 0,
        "East plus 135 degrees clockwise gives South-West.",
        "পূব যোগ ১৩৫ ডিগ্ৰী ঘড়ীৰ দিশে দক্ষিণ-পশ্চিম দিয়ে।"))

    # ---- Syllogism & logical deduction ----
    A(R("All roses are flowers. Some flowers fade quickly. Which conclusion follows?",
        "আটাইবোৰ গোলাপ ফুল। কিছুমান ফুল সোনকালে শুকায়। কোন সিদ্ধান্ত ওলায়?",
        [("None of these follows definitely", "এইবোৰৰ কোনোটোৱেই নিশ্চিতভাৱে নোলে"), ("All roses fade quickly", "আটাইবোৰ গোলাপ সোনকালে শুকায়"), ("No rose fades quickly", "কোনো গোলাপ সোনকালে নুশুকায়"), ("All flowers are roses", "আটাইবোৰ ফুল গোলাপ")], 0,
        "No definite conclusion follows from the given statements.",
        "দিয়া বিবৃতিবোৰৰ পৰা কোনো নিশ্চিত সিদ্ধান্ত নোলায়।"))
    A(R("All engineers are graduates. Some graduates are managers. Which conclusion is valid?",
        "আটাইবোৰ অভিযন্তা স্নাতক। কিছুমান স্নাতক পৰিচালক। কোন সিদ্ধান্ত বৈধ?",
        [("No definite conclusion", "কোনো নিশ্চিত সিদ্ধান্ত নাই"), ("All managers are engineers", "আটাইবোৰ পৰিচালক অভিযন্তা"), ("Some engineers are managers", "কিছুমান অভিযন্তা পৰিচালক"), ("All graduates are engineers", "আটাইবোৰ স্নাতক অভিযন্তা")], 0,
        "The overlap between graduates and managers is not fixed, so no conclusion follows.",
        "স্নাতক আৰু পৰিচালকৰ মাজৰ সংযোগ নিৰ্ধাৰিত নহয়, সেয়ে কোনো সিদ্ধান্ত নোলায়।"))
    A(R("If all pens are books and all books are papers, then all pens are definitely what?",
        "আটাইবোৰ কলম কিতাপ আৰু আটাইবোৰ কিতাপ কাগজ হ'লে আটাইবোৰ কলম নিশ্চিতভাৱে কি?",
        [("Papers", "কাগজ"), ("Pencils", "পেঞ্চিল"), ("Wood", "কাঠ"), ("Ink", "চিয়াঁহী")], 0,
        "By transitivity, all pens are papers.",
        "সংক্ৰমণৰ দ্বাৰা আটাইবোৰ কলম কাগজ।"))
    A(R("Some doctors are women. All women are mothers. Which conclusion follows?",
        "কিছুমান ডাক্তৰ মহিলা। আটাইবোৰ মহিলা মাতৃ। কোন সিদ্ধান্ত ওলায়?",
        [("Some doctors are mothers", "কিছুমান ডাক্তৰ মাতৃ"), ("All doctors are mothers", "আটাইবোৰ ডাক্তৰ মাতৃ"), ("No doctor is a mother", "কোনো ডাক্তৰ মাতৃ নহয়"), ("All mothers are doctors", "আটাইবোৰ মাতৃ ডাক্তৰ")], 0,
        "The women who are doctors are also mothers, so some doctors are mothers.",
        "যিবোৰ মহিলা ডাক্তৰ তেওঁলোক মাতৃও, সেয়ে কিছুমান ডাক্তৰ মাতৃ।"))
    A(R("All birds have wings. A sparrow is a bird. Therefore a sparrow does what?",
        "আটাইবোৰ চৰাইৰ ডেউকা আছে। এটা চৰাই ঘৰচিৰি। সেয়ে ঘৰচিৰিয়ে কি কৰে?",
        [("Has wings", "ডেউকা আছে"), ("Can fly high", "ওপৰলৈ উৰিব পাৰে"), ("Lives in water", "পানীত বাস কৰে"), ("Cannot fly", "উৰিব নোৱাৰে")], 0,
        "Since all birds have wings and a sparrow is a bird, it has wings.",
        "আটাইবোৰ চৰাইৰ ডেউকা আছে আৰু ঘৰচিৰি এটা চৰাই, সেয়ে ইয়াৰ ডেউকা আছে।"))
    A(R("If no cats are dogs and some dogs are pets, which conclusion is valid?",
        "কোনো মেকুৰী কুকুৰ নহয় আৰু কিছুমান কুকুৰ পোহনীয়া, কোন সিদ্ধান্ত বৈধ?",
        [("Some pets are not cats", "কিছুমান পোহনীয়া মেকুৰী নহয়"), ("All pets are dogs", "আটাইবোৰ পোহনীয়া কুকুৰ"), ("No pet is a cat", "কোনো পোহনীয়া মেকুৰী নহয়"), ("All cats are pets", "আটাইবোৰ মেকুৰী পোহনীয়া")], 0,
        "The dogs that are pets are not cats, so some pets are not cats.",
        "যিবোৰ কুকুৰ পোহনীয়া সেইবোৰ মেকুৰী নহয়, সেয়ে কিছুমান পোহনীয়া মেকুৰী নহয়।"))
    A(R("Statements: All metals conduct electricity. Copper is a metal. Conclusion?",
        "বিবৃতি: আটাইবোৰ ধাতুৱে বিদ্যুৎ পৰিবাহ কৰে। তাম এটা ধাতু। সিদ্ধান্ত?",
        [("Copper conducts electricity", "তামে বিদ্যুৎ পৰিবাহ কৰে"), ("Copper is not a metal", "তাম ধাতু নহয়"), ("Only copper conducts electricity", "কেৱল তামে বিদ্যুৎ পৰিবাহ কৰে"), ("Nothing can be concluded", "কিছুও সিদ্ধান্ত নোলায়")], 0,
        "Since copper is a metal and all metals conduct electricity, copper conducts electricity.",
        "তাম ধাতু আৰু আটাইবোৰ ধাতুৱে বিদ্যুৎ পৰিবাহ কৰে, সেয়ে তামে বিদ্যুৎ পৰিবাহ কৰে।"))
    A(R("Some students are athletes. All athletes are healthy. Which conclusion follows?",
        "কিছুমান ছাত্ৰ খেলুৱৈ। আটাইবোৰ খেলুৱৈ সুস্থ। কোন সিদ্ধান্ত ওলায়?",
        [("Some students are healthy", "কিছুমান ছাত্ৰ সুস্থ"), ("All students are healthy", "আটাইবোৰ ছাত্ৰ সুস্থ"), ("No student is healthy", "কোনো ছাত্ৰ সুস্থ নহয়"), ("All healthy people are students", "আটাইবোৰ সুস্থ মানুহ ছাত্ৰ")], 0,
        "The students who are athletes are also healthy.",
        "যিবোৰ ছাত্ৰ খেলুৱৈ তেওঁলোক সুস্থও।"))
    A(R("If all squares are rectangles and all rectangles are polygons, then all squares are what?",
        "আটাইবোৰ বৰ্গ আয়ত আৰু আটাইবোৰ আয়ত বহুভুজ হ'লে আটাইবোৰ বৰ্গ কি?",
        [("Polygons", "বহুভুজ"), ("Circles", "বৃত্ত"), ("Triangles", "ত্ৰিভুজ"), ("Cubes", "ঘনক")], 0,
        "By transitivity, all squares are polygons.",
        "সংক্ৰমণৰ দ্বাৰা আটাইবোৰ বৰ্গ বহুভুজ।"))
    A(R("All poets are dreamers. Ravi is a poet. What can we conclude about Ravi?",
        "আটাইবোৰ কবি সপোনদৰ্শী। ৰবি এজন কবি। ৰবিৰ বিষয়ে আমি কি সিদ্ধান্ত কৰিব পাৰোঁ?",
        [("Ravi is a dreamer", "ৰবি সপোনদৰ্শী"), ("Ravi is not a dreamer", "ৰবি সপোনদৰ্শী নহয়"), ("Ravi writes novels", "ৰবিয়ে উপন্যাস লিখে"), ("Nothing can be concluded", "কিছুও সিদ্ধান্ত নোলায়")], 0,
        "Since Ravi is a poet and all poets are dreamers, Ravi is a dreamer.",
        "ৰবি কবি আৰু আটাইবোৰ কবি সপোনদৰ্শী, সেয়ে ৰবি সপোনদৰ্শী।"))

    # ---- Number & letter analogy, ordering ----
    A(R("Book is to Reading as Fork is to what?",
        "কিতাপ : পঢ়া :: কাঁইট : কি?",
        [("Eating", "খোৱা"), ("Writing", "লিখা"), ("Drawing", "আঁকা"), ("Singing", "গোৱা")], 0,
        "A fork is used for eating as a book is used for reading.",
        "কাঁইট খোৱাৰ বাবে যেনেকৈ কিতাপ পঢ়াৰ বাবে।"))
    A(R("Doctor is to Hospital as Teacher is to what?",
        "ডাক্তৰ : চিকিৎসালয় :: শিক্ষক : কি?",
        [("School", "বিদ্যালয়"), ("Court", "আদালত"), ("Farm", "পথাৰ"), ("Factory", "কাৰখানা")], 0,
        "A teacher works in a school as a doctor works in a hospital.",
        "শিক্ষকে বিদ্যালয়ত কাম কৰে যেনেকৈ ডাক্তৰে চিকিৎসালয়ত।"))
    A(R("If A is taller than B, and B is taller than C, who is the shortest?",
        "A, B তকৈ ওখ, আৰু B, C তকৈ ওখ হ'লে আটাইতকৈ চুটি কোন?",
        [("C", "C"), ("A", "A"), ("B", "B"), ("Cannot be determined", "নিৰ্ণয় কৰিব নোৱাৰি")], 0,
        "A > B > C, so C is the shortest.",
        "A > B > C, সেয়ে C আটাইতকৈ চুটি।"))
    A(R("In a row of 20 students, Rina is 7th from the left. What is her position from the right?",
        "২০ জন ছাত্ৰৰ শাৰীত ৰিনা বাওঁফালৰ পৰা ৭ম। সোঁফালৰ পৰা তাইৰ স্থান কিমান?",
        [("14th", "১৪তম"), ("13th", "১৩তম"), ("12th", "১২তম"), ("15th", "১৫তম")], 0,
        "Position from the right = 20 - 7 + 1 = 14.",
        "সোঁফালৰ পৰা স্থান = ২০ - ৭ + ১ = ১৪।"))
    A(R("If 5 books cost Rs 250, what do 8 books cost?",
        "৫ টা কিতাপৰ মূল্য ২৫০ টকা হ'লে ৮ টা কিতাপৰ মূল্য কিমান?",
        [("Rs 400", "৪০০ টকা"), ("Rs 380", "৩৮০ টকা"), ("Rs 420", "৪২০ টকা"), ("Rs 360", "৩৬০ টকা")], 0,
        "Each book is Rs 50, so 8 cost Rs 400.",
        "প্ৰতিখন কিতাপ ৫০ টকা, সেয়ে ৮ খনৰ মূল্য ৪০০ টকা।"))
    A(R("Cat is to Kitten as Dog is to what?",
        "মেকুৰী : মেকুৰী-পোৱালি :: কুকুৰ : কি?",
        [("Puppy", "কুকুৰ-পোৱালি"), ("Calf", "গৰু-পোৱালি"), ("Lamb", "ভেৰা-পোৱালি"), ("Cub", "জন্তু-পোৱালি")], 0,
        "A young dog is a puppy as a young cat is a kitten.",
        "কুকুৰৰ পোৱালি puppy যেনেকৈ মেকুৰীৰ পোৱালি kitten।"))
    A(R("Hand is to Glove as Foot is to what?",
        "হাত : গ্লাভছ :: ভৰি : কি?",
        [("Sock", "মোজা"), ("Hat", "টুপী"), ("Ring", "আঙুঠি"), ("Belt", "পেটী")], 0,
        "A glove covers a hand as a sock covers a foot.",
        "গ্লাভছে হাত ঢাকে যেনেকৈ মোজাই ভৰি ঢাকে।"))
    A(R("If Monday is coded as 1, what is the code for Friday?",
        "সোমবাৰ ক ১ সংকেত কৰিলে শুক্ৰবাৰৰ সংকেত কি?",
        [("5", "৫"), ("4", "৪"), ("6", "৬"), ("7", "৭")], 0,
        "Friday is the fifth day of the week, so the code is 5.",
        "শুক্ৰবাৰ সপ্তাহৰ পঞ্চম দিন, সেয়ে সংকেত ৫।"))
    A(R("In a certain order, P comes before Q, and Q comes before R. Who comes last?",
        "এটা ক্ৰমত P, Q ৰ আগত আৰু Q, R ৰ আগত। আটাইতকৈ শেষত কোন?",
        [("R", "R"), ("P", "P"), ("Q", "Q"), ("Cannot be determined", "নিৰ্ণয় কৰিব নোৱাৰি")], 0,
        "The order is P, Q, R, so R comes last.",
        "ক্ৰমটো P, Q, R, সেয়ে R শেষত।"))
    A(R("Which word can be formed from the letters of the word 'EDUCATION'?",
        "'EDUCATION' শব্দটোৰ আখৰবোৰৰ পৰা কোনটো শব্দ গঠন কৰিব পাৰি?",
        [("ACT", "ACT"), ("RAIN", "RAIN"), ("SUGAR", "SUGAR"), ("TABLE", "TABLE")], 0,
        "A, C and T all appear in EDUCATION, while the other options need letters that are absent.",
        "A, C আৰু T আটাইবোৰ EDUCATION ত আছে, আন বিকল্পত নথকা আখৰ লাগে।"))
    A(R("If yesterday was Tuesday, what day will be the day after tomorrow?",
        "যোৱাকালি মঙলবাৰ আছিল, তেন্তে পৰহি কি বাৰ হব?",
        [("Saturday", "শনিবাৰ"), ("Friday", "শুক্ৰবাৰ"), ("Sunday", "দেওবাৰ"), ("Monday", "সোমবাৰ")], 0,
        "Today is Wednesday, so the day after tomorrow is Friday.",
        "আজি বুধবাৰ, সেয়ে পৰহি শুক্ৰবাৰ।"))
    A(R("Arrange in a meaningful order: seed, flower, plant, fruit.",
        "অৰ্থপূৰ্ণ ক্ৰমত সজাওক: গুটি, ফুল, গছ, ফল।",
        [("Seed, plant, flower, fruit", "গুটি, গছ, ফুল, ফল"), ("Plant, seed, fruit, flower", "গছ, গুটি, ফল, ফুল"), ("Flower, seed, plant, fruit", "ফুল, গুটি, গছ, ফল"), ("Fruit, flower, plant, seed", "ফল, ফুল, গছ, গুটি")], 0,
        "The natural growth order is seed, plant, flower, fruit.",
        "স্বাভাৱিক বৃদ্ধিৰ ক্ৰম হ'ল গুটি, গছ, ফুল, ফল।"))
    A(R("If X is to the right of Y and Y is to the right of Z, who is in the middle?",
        "X, Y ৰ সোঁফালে আৰু Y, Z ৰ সোঁফালে হ'লে মাজত কোন?",
        [("Y", "Y"), ("X", "X"), ("Z", "Z"), ("Cannot be determined", "নিৰ্ণয় কৰিব নোৱাৰি")], 0,
        "The order is Z, Y, X, so Y is in the middle.",
        "ক্ৰমটো Z, Y, X, সেয়ে মাজত Y।"))

    # ---- Clock, calendar & miscellaneous ----
    A(R("How many times do the hands of a clock overlap in 12 hours?",
        "১২ ঘণ্টাত ঘড়ীৰ কাঁটাদুটা কিমানবাৰ ওপৰত পৰে?",
        [("Eleven", "এঘাৰবাৰ"), ("Twelve", "বাৰবাৰ"), ("Ten", "দহবাৰ"), ("Twenty-four", "চৌবিশবাৰ")], 0,
        "The hands overlap eleven times in twelve hours.",
        "১২ ঘণ্টাত কাঁটাদুটা এঘাৰবাৰ ওপৰত পৰে।"))
    A(R("If a clock shows 9:00, what is the angle between the hands?",
        "এটা ঘড়ীত ৯:০০ বাজিছে, কাঁটাদুটাৰ মাজৰ কোণ কিমান?",
        [("90 degrees", "৯০ ডিগ্ৰী"), ("45 degrees", "৪৫ ডিগ্ৰী"), ("180 degrees", "১৮০ ডিগ্ৰী"), ("60 degrees", "৬০ ডিগ্ৰী")], 0,
        "Each hour mark is 30 degrees, so 3 x 30 = 90 degrees.",
        "প্ৰতি ঘণ্টা চিহ্ন ৩০ ডিগ্ৰী, সেয়ে ৩ x ৩০ = ৯০ ডিগ্ৰী।"))
    A(R("How many days are there in a leap year?",
        "এটা অধিবৰ্ষত কিমান দিন থাকে?",
        [("366", "৩৬৬"), ("365", "৩৬৫"), ("364", "৩৬৪"), ("367", "৩৬৭")], 0,
        "A leap year has 366 days.",
        "অধিবৰ্ষত ৩৬৬ দিন থাকে।"))
    A(R("If 1st January 2024 was a Monday, what day was 1st February 2024?",
        "১ জানুৱাৰী ২০২৪ সোমবাৰ আছিল, তেন্তে ১ ফেব্ৰুৱাৰী ২০২৪ কি বাৰ আছিল?",
        [("Thursday", "বৃহস্পতিবাৰ"), ("Wednesday", "বুধবাৰ"), ("Friday", "শুক্ৰবাৰ"), ("Tuesday", "মঙ্গলবাৰ")], 0,
        "January has 31 days, so 31 mod 7 = 3 and Monday + 3 = Thursday.",
        "জানুৱাৰীত ৩১ দিন, সেয়ে ৩১ mod ৭ = ৩ আৰু সোমবাৰ + ৩ = বৃহস্পতিবাৰ।"))
    A(R("A clock gains 5 minutes every hour. If it is set right at 8 a.m., what will it show at 8 p.m.?",
        "এটা ঘড়ী প্ৰতি ঘণ্টাত ৫ মিনিট আগবাঢ়ে। পুৱা ৮ বজাত শুদ্ধ কৰিলে ৰাতি ৮ বজাত কি দেখুৱাব?",
        [("9:00 p.m.", "ৰাতি ৯:০০"), ("8:60 p.m.", "ৰাতি ৮:৬০"), ("9:30 p.m.", "ৰাতি ৯:৩০"), ("8:30 p.m.", "ৰাতি ৮:৩০")], 0,
        "It gains 12 x 5 = 60 minutes, so it shows 9 p.m.",
        "ই ১২ x ৫ = ৬০ মিনিট আগবাঢ়ে, সেয়ে ৰাতি ৯ বাজি দেখুৱায়।"))
    A(R("How many minutes are there between 2:15 and 3:05?",
        "২:১৫ আৰু ৩:০৫ ৰ মাজত কিমান মিনিট আছে?",
        [("50", "৫০"), ("45", "৪৫"), ("55", "৫৫"), ("40", "৪০")], 0,
        "From 2:15 to 3:00 is 45 minutes, plus 5 minutes gives 50.",
        "২:১৫ ৰ পৰা ৩:০০ লৈ ৪৫ মিনিট, যোগ ৫ মিনিটে ৫০ দিয়ে।"))
    A(R("What comes next: Monday, Wednesday, Friday, ...?",
        "পৰৱৰ্তীটো কি: সোমবাৰ, বুধবাৰ, শুক্ৰবাৰ, ...?",
        [("Sunday", "দেওবাৰ"), ("Saturday", "শনিবাৰ"), ("Thursday", "বৃহস্পতিবাৰ"), ("Tuesday", "মঙ্গলবাৰ")], 0,
        "Each term is two days after the previous, so after Friday comes Sunday.",
        "প্ৰতিটো পদ পূৰ্বৰ পৰা দুদিন পিছত, সেয়ে শুক্ৰবাৰৰ পিছত দেওবাৰ।"))
    A(R("If today is Thursday, what day was 3 days ago?",
        "আজি বৃহস্পতিবাৰ হ'লে ৩ দিন আগতে কি বাৰ আছিল?",
        [("Monday", "সোমবাৰ"), ("Tuesday", "মঙ্গলবাৰ"), ("Sunday", "দেওবাৰ"), ("Wednesday", "বুধবাৰ")], 0,
        "Three days before Thursday is Monday.",
        "বৃহস্পতিবাৰৰ তিনি দিন আগতে সোমবাৰ।"))
    A(R("How many Sundays can a month have at most?",
        "এটা মাহত সৰ্বাধিক কিমান দেওবাৰ থাকিব পাৰে?",
        [("Five", "পাঁচ"), ("Four", "চাৰি"), ("Six", "ছয়"), ("Three", "তিনি")], 0,
        "A 31-day month can have five Sundays.",
        "৩১ দিনৰ মাহত পাঁচটা দেওবাৰ থাকিব পাৰে।"))
    A(R("A clock shows 12:00. What is the angle between the hands?",
        "এটা ঘড়ীত ১২:০০ বাজিছে। কাঁটাদুটাৰ মাজৰ কোণ কিমান?",
        [("0 degrees", "০ ডিগ্ৰী"), ("30 degrees", "৩০ ডিগ্ৰী"), ("90 degrees", "৯০ ডিগ্ৰী"), ("180 degrees", "১৮০ ডিগ্ৰী")], 0,
        "At 12:00 both hands coincide, so the angle is 0 degrees.",
        "১২:০০ বজাত দুয়ো কাঁটা একে ঠাইত, সেয়ে কোণ ০ ডিগ্ৰী।"))
    A(R("If 5th March is a Tuesday, what day is 12th March?",
        "৫ মাৰ্চ মঙ্গলবাৰ হ'লে ১২ মাৰ্চ কি বাৰ?",
        [("Tuesday", "মঙ্গলবাৰ"), ("Monday", "সোমবাৰ"), ("Wednesday", "বুধবাৰ"), ("Thursday", "বৃহস্পতিবাৰ")], 0,
        "Seven days later is the same weekday, so 12th March is Tuesday.",
        "সাত দিন পিছত একে বাৰ হয়, সেয়ে ১২ মাৰ্চ মঙ্গলবাৰ।"))
    A(R("How many months of the year have exactly 30 days?",
        "বছৰৰ কিমানটা মাহত নিখুঁতভাৱে ৩০ দিন থাকে?",
        [("Four", "চাৰিটা"), ("Five", "পাঁচটা"), ("Six", "ছয়টা"), ("Seven", "সাতটা")], 0,
        "April, June, September and November each have 30 days.",
        "এপ্ৰিল, জুন, ছেপ্তেম্বৰ আৰু নৱেম্বৰত ৩০ দিন থাকে।"))

    # ---- Analytical / seating ----
    A(R("In a queue, A is 5th from the front and B is 9th from the back. If there are 20 people, how many are between A and B?",
        "এটা শাৰীত A আগৰ পৰা ৫ম আৰু B পিছৰ পৰা ৯ম। ২০ জন থাকিলে A আৰু B ৰ মাজত কিমান?",
        [("6", "৬"), ("5", "৫"), ("7", "৭"), ("8", "৮")], 0,
        "B is 12th from the front, so 12 - 5 - 1 = 6 people are between them.",
        "B আগৰ পৰা ১২ম, সেয়ে ১২ - ৫ - ১ = ৬ জন মাজত আছে।"))
    A(R("Five friends sit in a row. P is to the left of Q and R is to the right of Q. Who is in the middle?",
        "পাঁচজন বন্ধু এটা শাৰীত বহে। P, Q ৰ বাওঁফালে আৰু R, Q ৰ সোঁফালে। মাজত কোন?",
        [("Q", "Q"), ("P", "P"), ("R", "R"), ("Cannot be determined", "নিৰ্ণয় কৰিব নোৱাৰি")], 0,
        "With P on the left and R on the right, Q is between them.",
        "P বাওঁফালে আৰু R সোঁফালে হ'লে Q তেওঁলোকৰ মাজত।"))
    A(R("In a class, Sam is 10th from the top and 15th from the bottom. How many students are in the class?",
        "এখন শ্ৰেণীত চেম ওপৰৰ পৰা ১০ম আৰু তলৰ পৰা ১৫তম। শ্ৰেণীত কিমান ছাত্ৰ আছে?",
        [("24", "২৪"), ("25", "২৫"), ("23", "২৩"), ("26", "২৬")], 0,
        "Total = 10 + 15 - 1 = 24.",
        "মুঠ = ১০ + ১৫ - ১ = ২৪।"))
    A(R("If all members of a team are seated and the captain is 4th from the left among 9 members, what is his position from the right?",
        "এটা দলৰ আটাইবোৰ সদস্য বহিছে আৰু ৯ জনৰ ভিতৰত অধিনায়ক বাওঁফালৰ পৰা ৪ৰ্থ। সোঁফালৰ পৰা তেওঁৰ স্থান কিমান?",
        [("6th", "৬ষ্ঠ"), ("5th", "৫ম"), ("7th", "৭ম"), ("4th", "৪ৰ্থ")], 0,
        "Position from the right = 9 - 4 + 1 = 6.",
        "সোঁফালৰ পৰা স্থান = ৯ - ৪ + ১ = ৬।"))
    A(R("Three people A, B and C have different heights. A is taller than B but shorter than C. Who is the tallest?",
        "তিনিজন A, B আৰু C ৰ উচ্চতা বেলেগ বেলেগ। A, B তকৈ ওখ কিন্তু C তকৈ চুটি। আটাইতকৈ ওখ কোন?",
        [("C", "C"), ("A", "A"), ("B", "B"), ("Cannot be determined", "নিৰ্ণয় কৰিব নোৱাৰি")], 0,
        "C > A > B, so C is the tallest.",
        "C > A > B, সেয়ে C আটাইতকৈ ওখ।"))
    A(R("In a row of 15 children, if Meena is 8th from the left, how many children are to her right?",
        "১৫ জন ল'ৰা-ছোৱালীৰ শাৰীত মীনা বাওঁফালৰ পৰা ৮ম হ'লে তাইৰ সোঁফালে কিমানজন আছে?",
        [("7", "৭"), ("6", "৬"), ("8", "৮"), ("5", "৫")], 0,
        "15 - 8 = 7 children are to her right.",
        "১৫ - ৮ = ৭ জন তাইৰ সোঁফালে আছে।"))
    A(R("P, Q, R, S sit around a table in that order. Who sits opposite P?",
        "P, Q, R, S তেওঁলোকৰ ক্ৰমত এখন মেজৰ চাৰিওফালে বহে। P ৰ বিপৰীতে কোন বহে?",
        [("R", "R"), ("Q", "Q"), ("S", "S"), ("Cannot be determined", "নিৰ্ণয় কৰিব নোৱাৰি")], 0,
        "In a four-person circular arrangement, the person two places away sits opposite, so R.",
        "চাৰিজনীয়া বৃত্তীয় বিন্যাসত দুটা স্থান আঁতৰৰ জনে বিপৰীতে বহে, সেয়ে R।"))
    A(R("If in a group of 6, A ranks 3rd in height from the top, what is his rank from the bottom?",
        "৬ জনৰ এটা গোটত A ওখৰ হিচাপে ওপৰৰ পৰা ৩য় হ'লে তলৰ পৰা তেওঁৰ স্থান কিমান?",
        [("4th", "৪ৰ্থ"), ("3rd", "৩ৰ্থ"), ("5th", "৫ম"), ("2nd", "২য়")], 0,
        "Rank from the bottom = 6 - 3 + 1 = 4.",
        "তলৰ পৰা স্থান = ৬ - ৩ + ১ = ৪।"))
    A(R("Among five friends, R is taller than S but shorter than T. If T is not the tallest, who is?",
        "পাঁচজন বন্ধুৰ ভিতৰত R, S তকৈ ওখ কিন্তু T তকৈ চুটি। T আটাইতকৈ ওখ নহ'লে কোন আটাইতকৈ ওখ?",
        [("Cannot be determined from the given data", "দিয়া তথ্যৰ পৰা নিৰ্ণয় কৰিব নোৱাৰি"), ("R", "R"), ("S", "S"), ("T", "T")], 0,
        "The tallest is not named in the given information.",
        "দিয়া তথ্যত আটাইতকৈ ওখজনৰ নাম নাই।"))
    A(R("In a line of 11 people, the person in the middle is at which position from the left?",
        "১১ জনৰ এটা শাৰীত মাজৰ মানুহজন বাওঁফালৰ পৰা কোন স্থানত?",
        [("6th", "৬ষ্ঠ"), ("5th", "৫ম"), ("7th", "৭ম"), ("4th", "৪ৰ্থ")], 0,
        "The middle position of 11 is (11+1)/2 = 6.",
        "১১ ৰ মাজৰ স্থান (১১+১)/২ = ৬।"))

    return r
