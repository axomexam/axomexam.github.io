"""Section D: Logical Reasoning - 75 fresh questions (verbal + non-verbal)."""
from .common import R


def rows():
    r = []
    A = r.append

    # ---------------- verbal-reasoning ----------------
    # number-alphabet-series
    A(R("Find the next number in the series: 3, 6, 11, 18, 27, ?", "শ্ৰেণীটোৰ পৰৱৰ্তী সংখ্যা নিৰ্ণয় কৰা: ৩, ৬, ১১, ১৮, ২৭, ?",
        [("38", "৩৮"), ("36", "৩৬"), ("40", "৪০"), ("35", "৩৫")], 0,
        "Differences are 3, 5, 7, 9, 11; next = 27 + 11 = 38.", "পাৰ্থক্য ৩, ৫, ৭, ৯, ১১; পৰৱৰ্তী = ২৭ + ১১ = ৩৮।"))
    A(R("Find the next term: 2, 4, 8, 16, ?", "পৰৱৰ্তী পদ নিৰ্ণয় কৰা: ২, ৪, ৮, ১৬, ?",
        [("32", "৩২"), ("24", "২৪"), ("30", "৩০"), ("36", "৩৬")], 0,
        "Each term doubles, so the next is 32.", "প্ৰতিটো পদ দুগুণ হয়, গতিকে পৰৱৰ্তী ৩২।"))
    A(R("Find the missing term: 5, 10, 20, 40, ?", "অনুপস্থিত পদ নিৰ্ণয় কৰা: ৫, ১০, ২০, ৪০, ?",
        [("80", "৮০"), ("60", "৬০"), ("70", "৭০"), ("100", "১০০")], 0,
        "Each term is double the previous, so 80.", "প্ৰতিটো পদ আগৰটোৰ দুগুণ, গতিকে ৮০।"))
    A(R("Which letter comes next: A, C, F, J, ?", "পৰৱৰ্তী আখৰ কোনটো: A, C, F, J, ?",
        [("O", "O"), ("N", "N"), ("P", "P"), ("M", "M")], 0,
        "Gaps increase by 1: +2, +3, +4, +5 gives O.", "ব্যৱধান ১ ৰে বাঢ়ে: +২, +৩, +৪, +৫ দিলে O।"))
    A(R("Find the next number: 1, 4, 9, 16, ?", "পৰৱৰ্তী সংখ্যা নিৰ্ণয় কৰা: ১, ৪, ৯, ১৬, ?",
        [("25", "২৫"), ("20", "২০"), ("24", "২৪"), ("30", "৩০")], 0,
        "These are perfect squares; next is 5^2 = 25.", "এইবোৰ পূৰ্ণ বৰ্গ; পৰৱৰ্তী ৫² = ২৫।"))
    A(R("Find the next term: 100, 90, 81, 73, ?", "পৰৱৰ্তী পদ নিৰ্ণয় কৰা: ১০০, ৯০, ৮১, ৭৩, ?",
        [("66", "৬৬"), ("65", "৬৫"), ("64", "৬৪"), ("68", "৬৮")], 0,
        "Differences are -10, -9, -8, -7; next = 73 - 7 = 66.", "পাৰ্থক্য -১০, -৯, -৮, -৭; পৰৱৰ্তী = ৭৩ - ৭ = ৬৬।"))

    # coding-decoding
    A(R("If FRIEND is coded as 6-18-9-5-14-4, how is COLD coded?", "যদি FRIEND ক ৬-১৮-৯-৫-১৪-৪ হিচাপে ক'ড কৰা হয়, COLD ক কেনেকৈ ক'ড কৰা হ'ব?",
        [("3-15-12-4", "৩-১৫-১২-৪"), ("4-15-12-3", "৪-১৫-১২-৩"), ("3-14-12-4", "৩-১৪-১২-৪"), ("2-15-12-4", "২-১৫-১২-৪")], 0,
        "Each letter is its alphabet position: C=3, O=15, L=12, D=4.", "প্ৰতিটো আখৰ ইয়াৰ বৰ্ণমালা স্থান: C=৩, O=১৫, L=১২, D=৪।"))
    A(R("In a code, TEACHER is written as UFBDIFS. How is STUDENT written in that code?", "এটা ক'ডত TEACHER ক UFBDIFS লিখা হয়। সেই ক'ডত STUDENT কেনেকৈ লিখা হ'ব?",
        [("TUVEFOU", "TUVEFOU"), ("TUVEFPU", "TUVEFPU"), ("SUVEFOU", "SUVEFOU"), ("TUVDFOU", "TUVDFOU")], 0,
        "Each letter moves one step forward: S->T, T->U, U->V, D->E, E->F, N->O, T->U.", "প্ৰতিটো আখৰ এক খোজ আগলৈ যায়: S->T, T->U, U->V, D->E, E->F, N->O, T->U।"))
    A(R("If in a code language 'pen' is called 'book', 'book' is called 'bag' and 'bag' is called 'box', what do we use to carry things?", "এটা ক'ড ভাষাত 'pen' ক 'book', 'book' ক 'bag' আৰু 'bag' ক 'box' বোলা হয়, তেন্তে সামগ্ৰী কঢ়িয়াবলৈ কি ব্যৱহাৰ কৰিম?",
        [("box", "box"), ("bag", "bag"), ("book", "book"), ("pen", "pen")], 0,
        "A bag is used to carry things, and in the code 'bag' is called 'box'.", "সামগ্ৰী কঢ়িয়াবলৈ bag ব্যৱহাৰ হয়, আৰু ক'ডত 'bag' ক 'box' বোলা হয়।"))
    A(R("If A = 1, B = 2, ... Z = 26, what is the sum of the letters of the word 'CAB'?", "যদি A = ১, B = ২, ... Z = ২৬, 'CAB' শব্দৰ আখৰসমূহৰ যোগফল কিমান?",
        [("6", "৬"), ("5", "৫"), ("7", "৭"), ("8", "৮")], 0,
        "C = 3, A = 1, B = 2; sum = 6.", "C = ৩, A = ১, B = ২; যোগফল = ৬।"))
    A(R("In a code, ROSE is written as 4-3-2-1. How is SORE written in that code?", "এটা ক'ডত ROSE ক ৪-৩-২-১ লিখা হয়। সেই ক'ডত SORE কেনেকৈ লিখা হ'ব?",
        [("2-3-4-1", "২-৩-৪-১"), ("3-2-1-4", "৩-২-১-৪"), ("2-1-4-3", "২-১-৪-৩"), ("1-4-3-2", "১-৪-৩-২")], 0,
        "Using R=4, O=3, S=2, E=1 gives SORE = 2-3-4-1.", "R=৪, O=৩, S=২, E=১ ব্যৱহাৰ কৰি SORE = ২-৩-৪-১।"))

    # blood-relations
    A(R("A is the father of B. B is the sister of C. How is A related to C?", "A ৰ পুত্ৰ B। B ৰ ভগ্নী C। A ৰ C ৰ সৈতে কি সম্পৰ্ক?",
        [("Father", "পিতৃ"), ("Brother", "ভাই"), ("Uncle", "খুড়া"), ("Son", "পুত্ৰ")], 0,
        "Since B and C are siblings and A is B's father, A is also C's father.", "B আৰু C ভাই-ভনী আৰু A, B ৰ পিতৃ, গতিকে A, C ৰো পিতৃ।"))
    A(R("P is the son of Q. Q is the brother of R. How is P related to R?", "P, Q ৰ পুত্ৰ। Q, R ৰ ভাই। P ৰ R ৰ সৈতে কি সম্পৰ্ক?",
        [("Nephew", "ভতিজা"), ("Son", "পুত্ৰ"), ("Uncle", "খুড়া"), ("Cousin", "সম্বন্ধীয় ভাই")], 0,
        "Q is R's brother and P is Q's son, so P is R's nephew.", "Q, R ৰ ভাই আৰু P, Q ৰ পুত্ৰ, গতিকে P, R ৰ ভতিজা।"))
    A(R("Pointing to a woman, a man said, 'She is the daughter of my grandfather's only son.' How is she related to the man?", "এজনী মহিলালৈ আঙুলিয়াই এজনে ক'লে, 'তেওঁ মোৰ ককাকৰ একমাত্ৰ পুত্ৰৰ জীয়েক।' তেওঁ মানুহজনৰ কি সম্পৰ্কীয়?",
        [("Sister", "ভগ্নী"), ("Mother", "মাক"), ("Aunt", "খুড়ী"), ("Daughter", "জীয়েক")], 0,
        "The grandfather's only son is the man's father; his daughter is the man's sister.", "ককাকৰ একমাত্ৰ পুত্ৰ মানুহজনৰ দেউতা; তেওঁৰ জীয়েক মানুহজনৰ ভগ্নী।"))
    A(R("If X is the brother of Y, Y is the sister of Z and Z is the son of W, how is X related to W?", "যদি X, Y ৰ ভাই, Y, Z ৰ ভগ্নী আৰু Z, W ৰ পুত্ৰ, X ৰ W ৰ সৈতে কি সম্পৰ্ক?",
        [("Son", "পুত্ৰ"), ("Nephew", "ভতিজা"), ("Father", "পিতৃ"), ("Brother", "ভাই")], 0,
        "X, Y and Z are siblings and Z is W's son, so X is W's son.", "X, Y আৰু Z ভাই-ভনী আৰু Z, W ৰ পুত্ৰ, গতিকে X, W ৰ পুত্ৰ।"))

    # direction-distance
    A(R("A man walks 5 km north, then 3 km east, then 5 km south. How far is he from the start?", "এজনে ৫ কিমি উত্তৰ, তাৰপিছত ৩ কিমি পূৱ, তাৰপিছত ৫ কিমি দক্ষিণলৈ খোজ কাঢ়ে। তেওঁ আৰম্ভণিৰপৰা কিমান দূৰত?",
        [("3 km", "৩ কিমি"), ("5 km", "৫ কিমি"), ("8 km", "৮ কিমি"), ("13 km", "১৩ কিমি")], 0,
        "The north and south legs cancel; he ends 3 km east of the start.", "উত্তৰ আৰু দক্ষিণৰ ভাগ কটাকটি যায়; তেওঁ আৰম্ভণিৰ ৩ কিমি পূৱত থাকে।"))
    A(R("A walks 4 km towards the north, turns right and walks 3 km. How far is he from the starting point?", "A ৪ কিমি উত্তৰলৈ যায়, সোঁফালে ঘূৰি ৩ কিমি যায়। তেওঁ আৰম্ভণি স্থানৰপৰা কিমান দূৰত?",
        [("5 km", "৫ কিমি"), ("7 km", "৭ কিমি"), ("4 km", "৪ কিমি"), ("6 km", "৬ কিমি")], 0,
        "Right angle triangle with legs 4 and 3 gives distance 5 km.", "৪ আৰু ৩ বাহুৰ সমকোণী ত্ৰিভুজৰ কৰ্ণ ৫ কিমি।"))
    A(R("Rina faces north and turns 90 degrees clockwise, then 180 degrees clockwise. Which direction does she face now?", "ৰিনাই উত্তৰলৈ মুখ কৰি ৯০ ডিগ্ৰী ঘড়ীৰ দিশে ঘূৰে, তাৰপিছত ১৮০ ডিগ্ৰী ঘড়ীৰ দিশে ঘূৰে। এতিয়া তেওঁ কোন দিশলৈ মুখ কৰি আছে?",
        [("West", "পশ্চিম"), ("East", "পূৱ"), ("South", "দক্ষিণ"), ("North", "উত্তৰ")], 0,
        "North + 90 clockwise = East; East + 180 = West.", "উত্তৰৰপৰা ৯০ ঘড়ীৰ দিশে = পূৱ; পূৱৰপৰা ১৮০ = পশ্চিম।"))
    A(R("A man goes 6 km west, then 8 km south. What is the shortest distance from the start?", "এজনে ৬ কিমি পশ্চিমলৈ, তাৰপিছত ৮ কিমি দক্ষিণলৈ যায়। আৰম্ভণিৰপৰা আটাইতকৈ কম দূৰত্ব কিমান?",
        [("10 km", "১০ কিমি"), ("14 km", "১৪ কিমি"), ("2 km", "২ কিমি"), ("12 km", "১২ কিমি")], 0,
        "Distance = square root of (6^2 + 8^2) = 10 km.", "দূৰত্ব = √(৬² + ৮²) = ১০ কিমি।"))

    # analogy
    A(R("Doctor : Hospital :: Teacher : ?", "Doctor : Hospital :: Teacher : ?",
        [("School", "School"), ("Court", "Court"), ("Farm", "Farm"), ("Office", "Office")], 0,
        "A doctor works in a hospital as a teacher works in a school.", "যেনেকৈ ডাক্তৰে চিকিৎসালয়ত কাম কৰে, শিক্ষকে বিদ্যালয়ত কাম কৰে।"))
    A(R("Book : Chapter :: Building : ?", "Book : Chapter :: Building : ?",
        [("Floor", "Floor"), ("Brick", "Brick"), ("Roof", "Roof"), ("Cement", "Cement")], 0,
        "A book is divided into chapters as a building is divided into floors.", "যেনেকৈ কিতাপ অধ্যায়ত বিভক্ত, অট্টালিকা মহলাত বিভক্ত।"))
    A(R("Pen : Write :: Knife : ?", "Pen : Write :: Knife : ?",
        [("Cut", "Cut"), ("Sharp", "Sharp"), ("Metal", "Metal"), ("Cooking", "Cooking")], 0,
        "A pen is used to write as a knife is used to cut.", "যেনেকৈ কলমে লিখিবলৈ ব্যৱহাৰ হয়, ছুৰীয়ে কাটিবলৈ ব্যৱহাৰ হয়।"))
    A(R("Foot : Man :: Hoof : ?", "Foot : Man :: Hoof : ?",
        [("Horse", "Horse"), ("Bird", "Bird"), ("Fish", "Fish"), ("Snake", "Snake")], 0,
        "A man has a foot as a horse has a hoof.", "যেনেকৈ মানুহৰ ভৰি থাকে, ঘোঁৰাৰ খুৰা থাকে।"))
    A(R("Water : Thirst :: Food : ?", "Water : Thirst :: Food : ?",
        [("Hunger", "Hunger"), ("Drink", "Drink"), ("Eat", "Eat"), ("Plate", "Plate")], 0,
        "Water removes thirst as food removes hunger.", "যেনেকৈ পানীয়ে তৃষ্ণা মেটায়, খাদ্যই ভোক মেটায়।"))

    # odd-one-out
    A(R("Find the odd one out: 4, 9, 16, 20, 25.", "অসমটো বিচাৰি উলিয়াওক: ৪, ৯, ১৬, ২০, ২৫।",
        [("20", "২০"), ("4", "৪"), ("9", "৯"), ("25", "২৫")], 0,
        "All except 20 are perfect squares.", "২০ ৰ বাহিৰে বাকীবোৰ পূৰ্ণ বৰ্গ।"))
    A(R("Find the odd one out: Apple, Banana, Carrot, Mango.", "অসমটো বিচাৰি উলিয়াওক: Apple, Banana, Carrot, Mango।",
        [("Carrot", "Carrot"), ("Apple", "Apple"), ("Banana", "Banana"), ("Mango", "Mango")], 0,
        "Carrot is a vegetable while the others are fruits.", "Carrot এখন পাচলি, বাকীবোৰ ফল।"))
    A(R("Find the odd one out: Delhi, Mumbai, Chennai, Assam.", "অসমটো বিচাৰি উলিয়াওক: Delhi, Mumbai, Chennai, Assam।",
        [("Assam", "Assam"), ("Delhi", "Delhi"), ("Mumbai", "Mumbai"), ("Chennai", "Chennai")], 0,
        "Assam is a state while the others are cities.", "Assam এখন ৰাজ্য, বাকীবোৰ চহৰ।"))
    A(R("Find the odd one out: 3, 5, 7, 9, 11.", "অসমটো বিচাৰি উলিয়াওক: ৩, ৫, ৭, ৯, ১১।",
        [("9", "৯"), ("3", "৩"), ("5", "৫"), ("11", "১১")], 0,
        "All except 9 are prime numbers.", "৯ ৰ বাহিৰে বাকীবোৰ মৌলিক সংখ্যা।"))

    # ranking-order
    A(R("In a class, Ravi is 7th from the top and 26th from the bottom. How many students are there?", "এটা শ্ৰেণীত ৰবি ওপৰৰপৰা ৭ম আৰু তলৰপৰা ২৬তম। শ্ৰেণীত কিমানজন ছাত্ৰ আছে?",
        [("32", "৩২"), ("33", "৩৩"), ("31", "৩১"), ("34", "৩৪")], 0,
        "Total = 7 + 26 - 1 = 32.", "মুঠ = ৭ + ২৬ - ১ = ৩২।"))
    A(R("Anil is 12th from the left in a row of 40. What is his position from the right?", "৪০ জনৰ শাৰীত অনিল বাওঁফালৰপৰা ১২তম। সোঁফালৰপৰা তেওঁৰ স্থান কিমান?",
        [("29th", "২৯তম"), ("28th", "২৮তম"), ("30th", "৩০তম"), ("27th", "২৭তম")], 0,
        "From the right = 40 - 12 + 1 = 29.", "সোঁফালৰপৰা = ৪০ - ১২ + ১ = ২৯।"))
    A(R("In a row of 25 children, Meena is 9th from the left. What is her position from the right?", "২৫ জন ল'ৰা-ছোৱালীৰ শাৰীত মীনা বাওঁফালৰপৰা ৯ম। সোঁফালৰপৰা তেওঁৰ স্থান কিমান?",
        [("17th", "১৭তম"), ("16th", "১৬তম"), ("18th", "১৮তম"), ("15th", "১৫তম")], 0,
        "From the right = 25 - 9 + 1 = 17.", "সোঁফালৰপৰা = ২৫ - ৯ + ১ = ১৭।"))

    # venn-diagrams
    A(R("In a class of 40, 25 play cricket and 20 play football, and 10 play both. How many play at least one game?", "৪০ জনৰ শ্ৰেণীত ২৫ জনে ক্ৰিকেট আৰু ২০ জনে ফুটবল খেলে, ১০ জনে দুয়োটা খেলে। কিমানজনে অন্ততঃ এটা খেল খেলে?",
        [("35", "৩৫"), ("40", "৪০"), ("30", "৩০"), ("45", "৪৫")], 0,
        "At least one = 25 + 20 - 10 = 35.", "অন্ততঃ এটা = ২৫ + ২০ - ১০ = ৩৫।"))
    A(R("In a group of 50 people, 30 read English and 25 read Assamese, and 10 read both. How many read neither?", "৫০ জনৰ এটা দলত ৩০ জনে ইংৰাজী আৰু ২৫ জনে অসমীয়া পঢ়ে, ১০ জনে দুয়োটা পঢ়ে। কিমানজনে একোটা নপঢ়ে?",
        [("5", "৫"), ("10", "১০"), ("15", "১৫"), ("0", "০")], 0,
        "Neither = 50 - (30 + 25 - 10) = 50 - 45 = 5.", "একোটা নপঢ়া = ৫০ - (৩০ + ২৫ - ১০) = ৫০ - ৪৫ = ৫।"))
    A(R("If all roses are flowers and some flowers fade quickly, which conclusion follows?", "যদি সকলো গোলাপ ফুল হয় আৰু কিছুমান ফুল সোনকালে শুকায়, কোন সিদ্ধান্ত সিদ্ধ হয়?",
        [("Some roses may fade quickly", "কিছুমান গোলাপ সোনকালে শুকাব পাৰে"), ("All roses fade quickly", "সকলো গোলাপ সোনকালে শুকায়"), ("No rose fades", "কোনো গোলাপ নুশুকায়"), ("All flowers are roses", "সকলো ফুল গোলাপ")], 0,
        "Only a possibility follows: some roses may fade quickly.", "কেৱল এটা সম্ভাৱনা সিদ্ধ হয়: কিছুমান গোলাপ সোনকালে শুকাব পাৰে।"))

    # syllogism
    A(R("Statements: All cats are animals. All animals need water. Conclusion: All cats need water. Valid?", "বিবৃতি: সকলো মেকুৰী প্ৰাণী। সকলো প্ৰাণীৰ পানী লাগে। সিদ্ধান্ত: সকলো মেকুৰীৰ পানী লাগে। শুদ্ধ নেকি?",
        [("Yes, it follows", "হয়, ই সিদ্ধ হয়"), ("No, it does not follow", "নহয়, ই সিদ্ধ নহয়"), ("Cannot be determined", "নিৰ্ণয় কৰিব নোৱাৰি"), ("Only some cats need water", "কেৱল কিছুমান মেকুৰীৰ পানী লাগে")], 0,
        "All cats are animals and all animals need water, so all cats need water.", "সকলো মেকুৰী প্ৰাণী আৰু সকলো প্ৰাণীৰ পানী লাগে, গতিকে সকলো মেকুৰীৰ পানী লাগে।"))
    A(R("Statements: Some pens are red. All red things are costly. Conclusion: Some pens are costly. Valid?", "বিবৃতি: কিছুমান কলম ৰঙা। সকলো ৰঙা বস্তু দামী। সিদ্ধান্ত: কিছুমান কলম দামী। শুদ্ধ নেকি?",
        [("Yes, it follows", "হয়, ই সিদ্ধ হয়"), ("No, it does not follow", "নহয়, ই সিদ্ধ নহয়"), ("Cannot be determined", "নিৰ্ণয় কৰিব নোৱাৰি"), ("All pens are costly", "সকলো কলম দামী")], 0,
        "The pens that are red are costly, so some pens are costly.", "যিবোৰ কলম ৰঙা সেইবোৰ দামী, গতিকে কিছুমান কলম দামী।"))
    A(R("Statements: All students are hardworking. Rina is a student. Conclusion: Rina is hardworking. Valid?", "বিবৃতি: সকলো ছাত্ৰ পৰিশ্ৰমী। ৰিনা এজনী ছাত্ৰ। সিদ্ধান্ত: ৰিনা পৰিশ্ৰমী। শুদ্ধ নেকি?",
        [("Yes, it follows", "হয়, ই সিদ্ধ হয়"), ("No, it does not follow", "নহয়, ই সিদ্ধ নহয়"), ("Cannot be determined", "নিৰ্ণয় কৰিব নোৱাৰি"), ("Rina may be lazy", "ৰিনা এলেহুৱা হ'ব পাৰে")], 0,
        "Since all students are hardworking and Rina is a student, she is hardworking.", "সকলো ছাত্ৰ পৰিশ্ৰমী আৰু ৰিনা ছাত্ৰ, গতিকে তেওঁ পৰিশ্ৰমী।"))

    # mathematical-operations
    A(R("If + means x, x means - and - means /, find the value of 6 + 4 - 2.", "যদি + মানে ×, × মানে - আৰু - মানে ÷, ৬ + ৪ - ২ ৰ মান নিৰ্ণয় কৰা।",
        [("12", "১২"), ("10", "১০"), ("24", "২৪"), ("8", "৮")], 0,
        "Replacing the symbols gives 6 x 4 / 2 = 24 / 2 = 12.", "চিহ্ন সলনি কৰি ৬ × ৪ ÷ ২ = ২৪ ÷ ২ = ১২।"))
    A(R("If 2 * 3 = 13 and 3 * 4 = 25, then 4 * 5 = ?", "যদি ২ * ৩ = ১৩ আৰু ৩ * ৪ = ২৫ হয়, তেন্তে ৪ * ৫ = ?",
        [("41", "৪১"), ("39", "৩৯"), ("45", "৪৫"), ("43", "৪৩")], 0,
        "The rule is a * b = a^2 + b^2: 4^2 + 5^2 = 16 + 25 = 41.", "নিয়ম a * b = a² + b²: ৪² + ৫² = ১৬ + ২৫ = ৪১।"))
    A(R("If 5 # 3 = 16 and 7 # 2 = 9, then 9 # 4 = ?", "যদি ৫ # ৩ = ১৬ আৰু ৭ # ২ = ৯ হয়, তেন্তে ৯ # ৪ = ?",
        [("39", "৩৯"), ("25", "২৫"), ("26", "২৬"), ("36", "৩৬")], 0,
        "The rule is a # b = (a + b) x (b - 1): 5#3 = 8 x 2 = 16 and 7#2 = 9 x 1 = 9, so 9#4 = 13 x 3 = 39.", "নিয়ম a # b = (a + b) × (b - 1): ৫#৩ = ৮ × ২ = ১৬ আৰু ৭#২ = ৯ × ১ = ৯, গতিকে ৯#৪ = ১৩ × ৩ = ৩৯।"))
    A(R("If P means +, Q means - and R means x, find 12 R 3 P 8 Q 2.", "যদি P মানে +, Q মানে - আৰু R মানে ×, ১২ R ৩ P ৮ Q ২ নিৰ্ণয় কৰা।",
        [("42", "৪২"), ("40", "৪০"), ("34", "৩৪"), ("38", "৩৮")], 0,
        "12 x 3 + 8 - 2 = 36 + 8 - 2 = 42.", "১২ × ৩ + ৮ - ২ = ৩৬ + ৮ - ২ = ৪২।"))

    # clock-calendar
    A(R("What is the angle between the hands of a clock at 3 o'clock?", "৩ বজাত ঘড়ীৰ কাঁটাদুটাৰ মাজৰ কোণ কিমান?",
        [("90 degrees", "৯০ ডিগ্ৰী"), ("60 degrees", "৬০ ডিগ্ৰী"), ("120 degrees", "১২০ ডিগ্ৰী"), ("45 degrees", "৪৫ ডিগ্ৰী")], 0,
        "Each hour mark is 30 degrees; at 3 o'clock the gap is 3 x 30 = 90 degrees.", "প্ৰতি ঘণ্টাৰ ব্যৱধান ৩০ ডিগ্ৰী; ৩ বজাত ব্যৱধান = ৩ × ৩০ = ৯০ ডিগ্ৰী।"))
    A(R("How many times do the hands of a clock overlap in 12 hours?", "১২ ঘণ্টাত ঘড়ীৰ কাঁটা কিমানবাৰ ওপৰত পৰে?",
        [("11", "১১"), ("12", "১২"), ("10", "১০"), ("24", "২৪")], 0,
        "The hands coincide 11 times in every 12 hours.", "প্ৰতি ১২ ঘণ্টাত কাঁটা ১১ বাৰ একত্ৰিত হয়।"))
    A(R("If today is Monday, what day will it be after 61 days?", "আজি সোমবাৰ হ'লে ৬১ দিনৰ পিছত কি বাৰ হ'ব?",
        [("Saturday", "শনিবাৰ"), ("Sunday", "দেওবাৰ"), ("Friday", "শুক্ৰবাৰ"), ("Monday", "সোমবাৰ")], 0,
        "61 mod 7 = 5; Monday + 5 = Saturday.", "৬১ ÷ ৭ ৰ ভাগশেষ ৫; সোমবাৰ + ৫ = শনিবাৰ।"))
    A(R("What is the angle between the hands at 6 o'clock?", "৬ বজাত কাঁটাদুটাৰ মাজৰ কোণ কিমান?",
        [("180 degrees", "১৮০ ডিগ্ৰী"), ("90 degrees", "৯০ ডিগ্ৰী"), ("150 degrees", "১৫০ ডিগ্ৰী"), ("120 degrees", "১২০ ডিগ্ৰী")], 0,
        "At 6 o'clock the hands are opposite each other, making 180 degrees.", "৬ বজাত কাঁটাদুটা পৰস্পৰ বিপৰীত, ১৮০ ডিগ্ৰী।"))

    # word-formation-dictionary
    A(R("Which word cannot be formed from the letters of 'IMPORTANT'?", "IMPORTANT ৰ আখৰৰপৰা কোন শব্দটো গঠন কৰিব নোৱাৰি?",
        [("MATTER", "MATTER"), ("PORT", "PORT"), ("TRAIN", "TRAIN"), ("MINOR", "MINOR")], 0,
        "'MATTER' needs two T's and an E, which IMPORTANT does not provide.", "'MATTER' ৰ বাবে দুটা T আৰু এটা E লাগে, যি IMPORTANT ত নাই।"))
    A(R("Which word cannot be formed from the letters of 'EDUCATION'?", "EDUCATION ৰ আখৰৰপৰা কোন শব্দটো গঠন কৰিব নোৱাৰি?",
        [("MENTION", "MENTION"), ("CAUTION", "CAUTION"), ("NATION", "NATION"), ("ACTION", "ACTION")], 0,
        "'MENTION' needs the letter M, which does not appear in EDUCATION.", "'MENTION' ৰ বাবে M আখৰ লাগে, যি EDUCATION ত নাই।"))
    A(R("Arrange the words in dictionary order: 1. Nation 2. Native 3. Natural 4. Narrate.", "শব্দবোৰ অভিধানৰ ক্ৰমত সজাওক: ১. Nation ২. Native ৩. Natural ৪. Narrate।",
        [("4, 1, 2, 3", "৪, ১, ২, ৩"), ("1, 2, 3, 4", "১, ২, ৩, ৪"), ("1, 4, 2, 3", "১, ৪, ২, ৩"), ("4, 2, 1, 3", "৪, ২, ১, ৩")], 0,
        "Comparing letters after 'Nar': Narrate, Nation, Native, Natural.", "'Nar' ৰ পিছৰ আখৰ তুলনা: Narrate, Nation, Native, Natural।"))

    # ---------------- non-verbal-reasoning ----------------
    A(R("In a series the number of dots increases by 2 each step: 1, 3, 5, 7, ... How many dots come next?", "এটা শ্ৰেণীত বিন্দুৰ সংখ্যা প্ৰতিটো পদত ২ ৰে বাঢ়ে: ১, ৩, ৫, ৭, ... পৰৱৰ্তী পদত কিমান বিন্দু থাকিব?",
        [("9", "৯"), ("8", "৮"), ("10", "১০"), ("11", "১১")], 0,
        "The count increases by 2, so after 7 comes 9.", "সংখ্যা ২ ৰে বাঢ়ে, গতিকে ৭ ৰ পিছত ৯।"))
    A(R("A figure rotates 90 degrees clockwise at each step. After four steps it returns to the original position. What is the total rotation?", "এটা চিত্ৰ প্ৰতিটো পদত ৯০ ডিগ্ৰী ঘড়ীৰ দিশে ঘূৰে। চাৰি পদৰ পিছত ই মূল অৱস্থালৈ ঘূৰি আহে। মুঠ ঘূৰ্ণন কিমান?",
        [("360 degrees", "৩৬০ ডিগ্ৰী"), ("270 degrees", "২৭০ ডিগ্ৰী"), ("180 degrees", "১৮০ ডিগ্ৰী"), ("90 degrees", "৯০ ডিগ্ৰী")], 0,
        "Four steps of 90 degrees give 360 degrees.", "৯০ ডিগ্ৰীৰ চাৰি পদ = ৩৬০ ডিগ্ৰী।"))
    A(R("The number of sides of a polygon increases by one each step: triangle, square, pentagon, ... What comes after the hexagon?", "এটা বহুভুজৰ বাহুৰ সংখ্যা প্ৰতিটো পদত এটা বাঢ়ে: ত্ৰিভুজ, বৰ্গ, পঞ্চভুজ, ... ষড়ভুজৰ পিছত কি আহে?",
        [("Heptagon (7 sides)", "সপ্তভুজ (৭ বাহু)"), ("Octagon (8 sides)", "অষ্টভুজ (৮ বাহু)"), ("Nonagon (9 sides)", "নৱভুজ (৯ বাহু)"), ("Decagon (10 sides)", "দশভুজ (১০ বাহু)")], 0,
        "After a hexagon (6 sides) comes a heptagon (7 sides).", "ষড়ভুজ (৬ বাহু) ৰ পিছত সপ্তভুজ (৭ বাহু) আহে।"))
    A(R("Which figure is the mirror image of the letter 'b'?", "কোন চিত্ৰটো 'b' আখৰৰ দাপোণ প্ৰতিবিম্ব?",
        [("d", "d"), ("p", "p"), ("q", "q"), ("b", "b")], 0,
        "A mirror image of 'b' (left-right) is 'd'.", "'b' ৰ দাপোণ প্ৰতিবিম্ব (বাওঁ-সোঁ) 'd'।"))
    A(R("In a figure, a square is divided into four equal parts by two lines. How many parts are formed?", "এটা চিত্ৰত এটা বৰ্গ দুডাল ৰেখাই চাৰিটা সমান ভাগত বিভক্ত কৰে। কিমান ভাগ হয়?",
        [("4", "৪"), ("2", "২"), ("3", "৩"), ("6", "৬")], 0,
        "Two lines through the centre give four parts.", "কেন্দ্ৰৰ মাজেৰে দুডাল ৰেখাই চাৰিটা ভাগ দিয়ে।"))
    A(R("How many triangles are there in a figure made of a square with both diagonals drawn?", "দুয়োটা কৰ্ণ অঁকা এটা বৰ্গৰ চিত্ৰত কিমান ত্ৰিভুজ থাকে?",
        [("8", "৮"), ("4", "৪"), ("6", "৬"), ("10", "১০")], 0,
        "Four small triangles plus four larger ones make eight.", "চাৰিটা সৰু ত্ৰিভুজ আৰু চাৰিটা ডাঙৰ ত্ৰিভুজ মিলি আঠটা।"))
    A(R("If a cube is painted on all faces and then cut into 8 equal smaller cubes, how many small cubes have three faces painted?", "এটা ঘনকৰ সকলো মুখ ৰং কৰি ৮ টা সমান সৰু ঘনকত কটা হ'ল, কিমান সৰু ঘনকৰ তিনি মুখ ৰঙীন?",
        [("8", "৮"), ("4", "৪"), ("6", "৬"), ("0", "০")], 0,
        "All 8 corner cubes of a 2x2x2 cut have three painted faces.", "২×২×২ কটাৰ আটাইকেইটা কোণৰ ঘনকৰ তিনি মুখ ৰঙীন।"))
    A(R("Which shape has rotational symmetry of order 4?", "কোন আকৃতিৰ ঘূৰ্ণন প্ৰতিসমতা ক্ৰম ৪?",
        [("Square", "বৰ্গ"), ("Rectangle", "আয়ত"), ("Equilateral triangle", "সমবাহু ত্ৰিভুজ"), ("Circle", "বৃত্ত")], 0,
        "A square looks the same at 90, 180, 270 and 360 degrees.", "বৰ্গ ৯০, ১৮০, ২৭০ আৰু ৩৬০ ডিগ্ৰীত একেই দেখা যায়।"))
    A(R("A paper is folded once and a hole is punched through both layers. When unfolded, how many holes are seen?", "কাগজ এবাৰ ভাঁজ কৰি দুয়ো স্তৰ ভেদ কৰি এটা বিন্ধা কৰা হ'ল। মেলি দিলে কিমান বিন্ধা দেখা যাব?",
        [("2", "২"), ("1", "১"), ("3", "৩"), ("4", "৪")], 0,
        "One punch through two layers gives two holes.", "দুই স্তৰ ভেদ কৰি এটা বিন্ধাই দুটা বিন্ধা দিয়ে।"))
    A(R("In a figure series a triangle alternates with a circle: triangle, circle, triangle, circle, ... What is the 9th figure?", "এটা চিত্ৰ শ্ৰেণীত ত্ৰিভুজ আৰু বৃত্ত পালা-পালি আহে: ত্ৰিভুজ, বৃত্ত, ত্ৰিভুজ, বৃত্ত, ... ৯ম চিত্ৰ কি?",
        [("Triangle", "ত্ৰিভুজ"), ("Circle", "বৃত্ত"), ("Square", "বৰ্গ"), ("Star", "তৰা")], 0,
        "Odd positions are triangles, so the 9th is a triangle.", "অযুগ্ম স্থান ত্ৰিভুজ, গতিকে ৯ম ত্ৰিভুজ।"))
    A(R("A pattern repeats every 3 shapes: star, moon, sun. What is the 10th shape?", "এটা নক্সা প্ৰতি ৩ আকৃতিত পুনৰাবৃত্তি হয়: তৰা, জোন, সূৰ্য। ১০ম আকৃতি কি?",
        [("Star", "তৰা"), ("Moon", "জোন"), ("Sun", "সূৰ্য"), ("Cloud", "মেঘ")], 0,
        "10 mod 3 = 1, so the 10th shape is the first of the cycle, a star.", "১০ ÷ ৩ ৰ ভাগশেষ ১, গতিকে ১০ম আকৃতি চক্ৰৰ প্ৰথম, তৰা।"))
    A(R("Which figure completes the pattern if the sequence of shading is: full, half, empty, full, half, ...?", "যদি ছাঁৰ ক্ৰম হয়: সম্পূৰ্ণ, আধা, খালী, সম্পূৰ্ণ, আধা, ... তেন্তে কোন চিত্ৰই নক্সা সম্পূৰ্ণ কৰে?",
        [("Empty", "খালী"), ("Full", "সম্পূৰ্ণ"), ("Half", "আধা"), ("None", "কোনো নহয়")], 0,
        "The cycle repeats every three, so after 'half' comes 'empty'.", "চক্ৰ প্ৰতি তিনিত পুনৰাবৃত্তি হয়, গতিকে 'আধা' ৰ পিছত 'খালী' আহে।"))
    A(R("A square is rotated 45 degrees. What shape does its outline appear like?", "এটা বৰ্গ ৪৫ ডিগ্ৰী ঘূৰোৱা হ'ল। ইয়াৰ বাহিৰৰ ৰেখা কেনে দেখা যাব?",
        [("Diamond", "হীৰা"), ("Triangle", "ত্ৰিভুজ"), ("Circle", "বৃত্ত"), ("Rectangle", "আয়ত")], 0,
        "A square rotated 45 degrees appears as a diamond.", "৪৫ ডিগ্ৰী ঘূৰোৱা বৰ্গ হীৰাৰ দৰে দেখা যায়।"))
    A(R("How many lines of symmetry does an equilateral triangle have?", "সমবাহু ত্ৰিভুজৰ কিমান প্ৰতিসমতা ৰেখা থাকে?",
        [("3", "৩"), ("2", "২"), ("1", "১"), ("4", "৪")], 0,
        "An equilateral triangle has three lines of symmetry.", "সমবাহু ত্ৰিভুজৰ তিনি প্ৰতিসমতা ৰেখা থাকে।"))
    A(R("If the top view of an object is a circle and the side view is a square, what is the object?", "এটা বস্তুৰ ওপৰৰ পৰা দৃশ্য বৃত্ত আৰু পাৰ্শ্ব দৃশ্য বৰ্গ হ'লে বস্তুটো কি?",
        [("Cylinder", "চুঙা"), ("Cube", "ঘনক"), ("Cone", "শংকু"), ("Sphere", "গোলক")], 0,
        "A cylinder has a circular top view and a rectangular side view.", "চুঙাৰ ওপৰৰ দৃশ্য বৃত্তীয় আৰু পাৰ্শ্ব দৃশ্য আয়তাকাৰ।"))
    A(R("In a counting figure, a rectangle is split into 3 columns. How many rectangles are formed in total?", "এটা গণনা চিত্ৰত এটা আয়ত ৩ টা স্তম্ভত বিভক্ত। মুঠ কিমান আয়ত হয়?",
        [("6", "৬"), ("3", "৩"), ("4", "৪"), ("5", "৫")], 0,
        "Single columns (3) plus two-column (2) plus whole (1) = 6.", "এটা স্তম্ভ (৩) + দুটা স্তম্ভ (২) + সম্পূৰ্ণ (১) = ৬।"))
    A(R("Which comes next if the pattern is: circle inside square, square inside circle, circle inside square, ...?", "যদি নক্সা হয়: বৰ্গৰ ভিতৰত বৃত্ত, বৃত্তৰ ভিতৰত বৰ্গ, বৰ্গৰ ভিতৰত বৃত্ত, ... পৰৱৰ্তী কি?",
        [("Square inside circle", "বৃত্তৰ ভিতৰত বৰ্গ"), ("Circle inside square", "বৰ্গৰ ভিতৰত বৃত্ত"), ("Triangle inside circle", "বৃত্তৰ ভিতৰত ত্ৰিভুজ"), ("Square inside square", "বৰ্গৰ ভিতৰত বৰ্গ")], 0,
        "The pattern alternates, so the next is a square inside a circle.", "নক্সা পালা-পালি, গতিকে পৰৱৰ্তী বৃত্তৰ ভিতৰত বৰ্গ।"))
    A(R("A figure has 5 straight lines forming a closed shape. What is the minimum number of vertices?", "এটা চিত্ৰত ৫ ডাল সৰল ৰেখাই এটা বন্ধ আকৃতি গঠন কৰে। নূন্যতম কিমান শীৰ্ষবিন্দু থাকিব?",
        [("5", "৫"), ("4", "৪"), ("6", "৬"), ("10", "১০")], 0,
        "A closed polygon with five sides has five vertices.", "পাঁচ বাহুৰ এটা বন্ধ বহুভুজৰ পাঁচটা শীৰ্ষবিন্দু থাকে।"))
    A(R("If a figure is reflected in water, the top and bottom swap. Which letter looks the same in water reflection?", "এটা চিত্ৰ পানীত প্ৰতিফলিত হ'লে ওপৰ আৰু তল সলনি হয়। পানীৰ প্ৰতিফলনত কোন আখৰ একেই দেখা যায়?",
        [("H", "H"), ("F", "F"), ("P", "P"), ("E", "E")], 0,
        "The letter H is symmetric top-to-bottom.", "H আখৰ ওপৰ-তল প্ৰতিসম।"))
    A(R("How many small squares are needed to make a 4 by 4 square grid?", "৪ × ৪ বৰ্গ জালী বনাবলৈ কিমান সৰু বৰ্গ লাগে?",
        [("16", "১৬"), ("12", "১২"), ("8", "৮"), ("20", "২০")], 0,
        "A 4 by 4 grid contains 4 x 4 = 16 small squares.", "৪ × ৪ জালীত ৪ × ৪ = ১৬ সৰু বৰ্গ থাকে।"))
    A(R("In a mirror, the clock shows 3:00. What is the actual time?", "দাপোণত ঘড়ীয়ে ৩:০০ দেখুৱায়। প্ৰকৃত সময় কিমান?",
        [("9:00", "৯:০০"), ("3:00", "৩:০০"), ("6:00", "৬:০০"), ("12:00", "১২:০০")], 0,
        "A mirror image of 3:00 across a vertical line reads 9:00.", "উলম্ব ৰেখাৰ ওপৰত ৩:০০ ৰ দাপোণ প্ৰতিবিম্ব ৯:০০।"))
    A(R("If a die shows 6 on top, which number is at the bottom?", "এটা লুডুৰ ওপৰত ৬ দেখা যায়, তলত কোন সংখ্যা থাকিব?",
        [("1", "১"), ("2", "২"), ("3", "৩"), ("5", "৫")], 0,
        "Opposite faces of a die add to 7, so opposite 6 is 1.", "লুডুৰ বিপৰীত মুখৰ যোগফল ৭, গতিকে ৬ ৰ বিপৰীত ১।"))
    A(R("A transparent sheet with a circle is folded and unfolded. The unfolded sheet shows how many circles?", "বৃত্ত থকা এটা স্বচ্ছ কাগজ ভাঁজ কৰি মেলা হ'ল। মেলা কাগজত কিমান বৃত্ত দেখা যাব?",
        [("2", "২"), ("1", "১"), ("4", "৪"), ("0", "০")], 0,
        "Folding creates a mirror copy, giving two circles when unfolded.", "ভাঁজে দাপোণ প্ৰতিলিপি সৃষ্টি কৰে, মেলিলে দুটা বৃত্ত দেখা যায়।"))
    A(R("Which figure has no line of symmetry?", "কোন চিত্ৰৰ কোনো প্ৰতিসমতা ৰেখা নাই?",
        [("Scalene triangle", "বিষমবাহু ত্ৰিভুজ"), ("Square", "বৰ্গ"), ("Circle", "বৃত্ত"), ("Rectangle", "আয়ত")], 0,
        "A scalene triangle has no line of symmetry.", "বিষমবাহু ত্ৰিভুজৰ কোনো প্ৰতিসমতা ৰেখা নাই।"))
    A(R("How many cubes are there in a 3 by 3 by 3 arrangement?", "৩ × ৩ × ৩ বিন্যাসত কিমানটা ঘনক থাকে?",
        [("27", "২৭"), ("9", "৯"), ("18", "১৮"), ("81", "৮১")], 0,
        "3 x 3 x 3 = 27 cubes.", "৩ × ৩ × ৩ = ২৭ টা ঘনক।"))
    A(R("If a figure alternates between shaded and unshaded, what is the 8th figure if the 1st is shaded?", "যদি এটা চিত্ৰ ছাঁযুক্ত আৰু ছাঁহীন হৈ পালা-পালি আহে, ১ম ছাঁযুক্ত হ'লে ৮ম কি?",
        [("Unshaded", "ছাঁহীন"), ("Shaded", "ছাঁযুক্ত"), ("Half shaded", "আধা ছাঁযুক্ত"), ("Cannot say", "ক'ব নোৱাৰি")], 0,
        "Even positions are unshaded, so the 8th is unshaded.", "যুগ্ম স্থান ছাঁহীন, গতিকে ৮ম ছাঁহীন।"))
    A(R("In a pattern of dots, the count is 1, 4, 9, 16, ... How many dots are in the 5th figure?", "বিন্দুৰ এটা নক্সাত সংখ্যা ১, ৪, ৯, ১৬, ... ৫ম চিত্ৰত কিমান বিন্দু থাকিব?",
        [("25", "২৫"), ("20", "২০"), ("24", "২৪"), ("30", "৩০")], 0,
        "The counts are perfect squares, so the 5th figure has 25 dots.", "সংখ্যাবোৰ পূৰ্ণ বৰ্গ, গতিকে ৫ম চিত্ৰত ২৫ বিন্দু।"))

    return r
