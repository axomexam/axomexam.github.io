#!/usr/bin/env python3
"""Cause & Effect: 80+ very hard bilingual questions."""

import sys
sys.path.insert(0, "tools")
from verbal_bank import append_bi

rows = []


def add(en, as_, correct, correct_as, cands, exp_en, exp_as):
    rows.append({"stem": en, "stem_as": as_, "correct": correct, "correct_as": correct_as,
                 "dists": list(cands), "exp_en": exp_en, "exp_as": exp_as})


OPTS = [("Statement I is the cause and statement II is its effect",
         "বিবৃতি I কাৰণ আৰু বিবৃতি II তাৰ ফল"),
        ("Statement II is the cause and statement I is its effect",
         "বিবৃতি II কাৰণ আৰু বিবৃতি I তাৰ ফল"),
        ("Both statements are independent causes",
         "দুয়োটা বিবৃতিয়েই স্বতন্ত্ৰ কাৰণ"),
        ("Both statements are effects of a common cause",
         "দুয়োটা বিবৃতিয়েই এটা সাধাৰণ কাৰণৰ ফল")]

REL = [
    ("Heavy rain lashed the district.", "জিলাখনত প্ৰচণ্ড বৰষুণ পৰিছে।",
     "The rivers are overflowing.", "নদীবোৰ উপচি পৰিছে।"),
    ("The price of petrol increased.", "পেট্ৰলৰ দাম বাঢ়িছে।",
     "Transport costs have gone up.", "পৰিবহণ খৰচ বাঢ়িছে।"),
    ("The company closed two of its plants.", "কোম্পানীয়ে দুটা কাৰখানা বন্ধ কৰিছে।",
     "Unemployment rose in the town.", "চহৰত বেকাৰত্ব বাঢ়িছে।"),
    ("Three key players were injured.", "তিনিজন মূল খেলুৱৈ আঘাতপ্ৰাপ্ত হৈছে।",
     "The team lost the final match.", "দলটো ফাইনেল খেলত পৰাস্ত হৈছে।"),
    ("The price of fertiliser doubled.", "সাৰৰ দাম দুগুণ হৈছে।",
     "Crop production fell this season.", "এই বতৰত শস্য উৎপাদন কমিছে।"),
    ("The old bridge collapsed.", "পুৰণি দলংখন ভাঙি পৰিছে।",
     "Traffic was diverted through the bypass.", "যান-বাহন বাইপাছলৈ ঘূৰাই দিয়া হৈছে।"),
    ("The school opened a new library.", "বিদ্যালয়ে নতুন পুথিভঁৰাল আৰম্ভ কৰিছে।",
     "Students are reading more books.", "ছাত্ৰই অধিক কিতাপ পঢ়িছে।"),
    ("Electricity failed for six hours.", "ছয় ঘণ্টা বিদ্যুৎ বন্ধ আছিল।",
     "The factory stopped production.", "কাৰখানাৰ উৎপাদন বন্ধ হৈছে।"),
    ("The doctor advised complete rest.", "চিকিৎসকে সম্পূৰ্ণ জিৰণিৰ পৰামৰ্শ দিছে।",
     "The patient recovered quickly.", "ৰোগীজন সোনকালে সুস্থ হৈছে।"),
    ("The city opened a new metro line.", "চহৰে নতুন মেট্ৰ' লাইন আৰম্ভ কৰিছে।",
     "Road congestion has decreased.", "পথৰ জাম কমিছে।"),
    ("The government banned plastic bags.", "চৰকাৰে প্লাষ্টিকৰ মোনা নিষিদ্ধ কৰিছে।",
     "Plastic waste has decreased.", "প্লাষ্টিক আৱৰ্জনা কমিছে।"),
    ("A new virus spread rapidly.", "নতুন ভাইৰাছ দ্ৰুতগতিত বিয়পিছে।",
     "Schools were closed for a month.", "বিদ্যালয় এখন মাহ বন্ধ থাকিল।"),
    ("The bank reduced interest rates.", "বেংকে সুতৰ হাৰ কমাইছে।",
     "Demand for home loans increased.", "গৃহ ঋণৰ চাহিদা বাঢ়িছে।"),
    ("A severe drought hit the region.", "অঞ্চলটোত তীব্ৰ খৰাঙে দেখা দিছে।",
     "Food prices rose sharply.", "খাদ্যৰ দাম তীব্ৰভাৱে বাঢ়িছে।"),
    ("The teacher explained the topic clearly.", "শিক্ষকে বিষয়টো স্পষ্টকৈ বুজাই দিছে।",
     "Students scored higher marks.", "ছাত্ৰই অধিক নম্বৰ পাইছে।"),
]

for c_en, c_as, e_en, e_as in REL:
    add(f"Statement I: {c_en} Statement II: {e_en}",
        f"বিবৃতি I: {c_as} বিবৃতি II: {e_as}",
        OPTS[0][0], OPTS[0][1], [o for o in OPTS if o[0] != OPTS[0][0]],
        "Statement I is a direct cause of statement II.",
        "বিবৃতি I, বিবৃতি II ৰ প্ৰত্যক্ষ কাৰণ।")
    add(f"Statement I: {e_en} Statement II: {c_en}",
        f"বিবৃতি I: {e_as} বিবৃতি II: {c_as}",
        OPTS[1][0], OPTS[1][1], [o for o in OPTS if o[0] != OPTS[1][0]],
        "Statement II is the cause and statement I is its effect.",
        "বিবৃতি II কাৰণ আৰু বিবৃতি I তাৰ ফল।")

REL2 = [
    ("The company launched a cheaper smartphone.", "কোম্পানীয়ে সস্তা স্মাৰ্টফোন উলিয়াইছে।",
     "Its sales increased sharply.", "ইয়াৰ বিক্ৰী তীব্ৰভাৱে বাঢ়িছে।"),
    ("Dense fog covered the airport.", "বিমানবন্দৰত ঘন কুঁৱলীয়ে ঢাকিছে।",
     "Several flights were delayed.", "কেইবাখনো বিমান পলম হৈছে।"),
    ("The highway was repaired and widened.", "মহাপথটো মেৰামতি কৰি বহল কৰা হৈছে।",
     "Accidents on the highway decreased.", "মহাপথত দুৰ্ঘটনা কমিছে।"),
    ("The minimum wage was raised.", "ন্যূনতম মজুৰি বঢ়োৱা হৈছে।",
     "Workers' income increased.", "শ্ৰমিকৰ আয় বাঢ়িছে।"),
    ("A large part of the forest was cleared.", "বনাঞ্চলৰ ডাঙৰ অংশ কটা হৈছে।",
     "Wild animals began entering villages.", "বন্যপ্ৰাণীয়ে গাঁৱত প্ৰৱেশ কৰিবলৈ ধৰিছে।"),
    ("A new dam was constructed upstream.", "উজনিত নতুন বান্ধ নিৰ্মাণ কৰা হৈছে।",
     "Irrigation in nearby fields improved.", "ওচৰৰ পথাৰত জলসিঞ্চন উন্নত হৈছে।"),
    ("The examination was postponed by a month.", "পৰীক্ষা এমাহ পিছলৈ ঠেলি দিয়া হৈছে।",
     "Students got extra time to prepare.", "ছাত্ৰই প্ৰস্তুতিৰ বাবে অতিৰিক্ত সময় পাইছে।"),
    ("The factory installed pollution filters.", "কাৰখানাই প্ৰদূষণ ফিল্টাৰ স্থাপন কৰিছে।",
     "Air quality in the area improved.", "অঞ্চলটোৰ বায়ুৰ গুণাগুণ উন্নত হৈছে।"),
    ("Mobile data became much cheaper.", "ম'বাইল ডেটা বহু সস্তা হৈছে।",
     "Internet usage increased rapidly.", "ইণ্টাৰনেটৰ ব্যৱহাৰ দ্ৰুতগতিত বাঢ়িছে।"),
    ("The market was flooded with tomatoes.", "বজাৰত টমেটোৰ বান পৰিছে।",
     "Tomato prices crashed.", "টমেটোৰ দাম ধুমপান হৈছে।"),
    ("The team captain resigned.", "দলৰ অধিনায়কে পদত্যাগ কৰিছে।",
     "The team's performance dropped.", "দলৰ প্ৰদৰ্শন অৱনতি ঘটিছে।"),
    ("A vaccination drive was completed.", "টিকাকৰণ অভিযান সম্পূৰ্ণ হৈছে।",
     "Disease cases fell sharply.", "ৰোগৰ ঘটনা তীব্ৰভাৱে কমিছে।"),
    ("The shop announced a festival discount.", "দোকানে উৎসৱৰ ৰেহাই ঘোষণা কৰিছে।",
     "Sales rose during the week.", "সপ্তাহটোত বিক্ৰী বাঢ়িছে।"),
    ("The river bed was dredged.", "নদীৰ তলি খান্দি পৰিষ্কাৰ কৰা হৈছে।",
     "Flooding in the town reduced.", "চহৰত বানপানী কমিছে।"),
    ("Tourist arrivals increased this year.", "এই বছৰ পৰ্যটকৰ আগমন বাঢ়িছে।",
     "Local businesses grew.", "স্থানীয় ব্যৱসায় বৃদ্ধি পাইছে।"),
]

for c_en, c_as, e_en, e_as in REL2:
    add(f"Statement I: {c_en} Statement II: {e_en}",
        f"বিবৃতি I: {c_as} বিবৃতি II: {e_as}",
        OPTS[0][0], OPTS[0][1], [o for o in OPTS if o[0] != OPTS[0][0]],
        "Statement I is a direct cause of statement II.",
        "বিবৃতি I, বিবৃতি II ৰ প্ৰত্যক্ষ কাৰণ।")
    add(f"Statement I: {e_en} Statement II: {c_en}",
        f"বিবৃতি I: {e_as} বিবৃতি II: {c_as}",
        OPTS[1][0], OPTS[1][1], [o for o in OPTS if o[0] != OPTS[1][0]],
        "Statement II is the cause and statement I is its effect.",
        "বিবৃতি II কাৰণ আৰু বিবৃতি I তাৰ ফল।")

COMMON = [
    ("The roads are wet.", "পথবোৰ তিতা।",
     "People are carrying umbrellas.", "লোকে ছাতি লৈ ফুৰিছে।"),
    ("People are buying candles.", "লোকে মমবাতি কিনিছে।",
     "People are buying torches.", "লোকে টৰ্চ কিনিছে।"),
    ("The streets are empty.", "পথবোৰ ৰিক্ত।",
     "Shops are closed.", "দোকানবোৰ বন্ধ।"),
    ("Crops have dried up.", "শস্য শুকাই গৈছে।",
     "Wells have gone dry.", "কুঁৱাবোৰ শুকাই গৈছে।"),
    ("People are wearing woollens.", "লোকে উমলুকীয়া কাপোৰ পিন্ধিছে।",
     "Heater sales have risen.", "হিটাৰৰ বিক্ৰী বাঢ়িছে।"),
    ("Schools are closed.", "বিদ্যালয়বোৰ বন্ধ।",
     "Offices are closed.", "কাৰ্যালয়বোৰ বন্ধ।"),
    ("Fish are dying in the river.", "নদীত মাছ মৰিছে।",
     "The water smells foul.", "পানীত দুৰ্গন্ধ ওলাইছে।"),
    ("Umbrella sales rose.", "ছাতিৰ বিক্ৰী বাঢ়িছে।",
     "Raincoat sales rose.", "ৰেইনকোটৰ বিক্ৰী বাঢ়িছে।"),
    ("The ground is slippery.", "মাটি পিছল।",
     "Football matches were cancelled.", "ফুটবল খেল বাতিল হৈছে।"),
    ("Many people are visiting doctors.", "বহু লোকে চিকিৎসকৰ ওচৰলৈ যাইছে।",
     "Medicine sales have risen.", "ঔষধৰ বিক্ৰী বাঢ়িছে।"),
]

for s1_en, s1_as, s2_en, s2_as in COMMON:
    add(f"Statement I: {s1_en} Statement II: {s2_en}",
        f"বিবৃতি I: {s1_as} বিবৃতি II: {s2_as}",
        OPTS[3][0], OPTS[3][1], [o for o in OPTS if o[0] != OPTS[3][0]],
        "Both are effects of one common cause, not of each other.",
        "দুয়োটাই এটা সাধাৰণ কাৰণৰ ফল, এটাই আনটোৰ কাৰণ নহয়।")

INDEP = [
    ("The price of gold rose.", "সোণৰ দাম বাঢ়িছে।",
     "A new movie was released.", "নতুন ছবি এখনে মুক্তি পাইছে।"),
    ("The football team won the match.", "ফুটবল দলে খেলত জিকিছে।",
     "The library received new books.", "পুথিভঁৰালে নতুন কিতাপ পাইছে।"),
    ("It rained heavily in Mumbai.", "মুম্বাইত প্ৰচণ্ড বৰষুণ দিছে।",
     "A goods train was delayed in Delhi.", "দিল্লীত মালবাহী ৰে'ল পলম হৈছে।"),
    ("The teacher retired from service.", "শিক্ষকজনে চাকৰিৰ পৰা অৱসৰ লৈছে।",
     "A new grocery shop opened.", "নতুন মুদী দোকান এখন খুলিছে।"),
    ("The river flows towards the east.", "নদীখন পূব দিশে বৈ গৈছে।",
     "The market is crowded today.", "আজি বজাৰত ভিৰ।"),
    ("A bird flew over the house.", "এটা চৰায়ে ঘৰৰ ওপৰেৰে উৰি গ'ল।",
     "The price of rice increased.", "চাউলৰ দাম বাঢ়িছে।"),
    ("The museum was repainted.", "সংগ্ৰহালয় পুনৰ ৰঙোৱা হৈছে।",
     "A cricket match was played.", "ক্ৰিকেট খেল এখন খেলা হৈছে।"),
    ("The train has twelve coaches.", "ৰে'লত বাৰটা ডবা আছে।",
     "The hospital has fifty beds.", "চিকিৎসালয়ত পঞ্চাশখন শয্যা আছে।"),
    ("The moon is bright tonight.", "আজি ৰাতি জোনাক উজ্জ্বল।",
     "The shopkeeper is smiling.", "দোকানীজনে হাঁহিছে।"),
    ("A new bridge was inaugurated.", "নতুন দলং এখন উদ্বোধন কৰা হৈছে।",
     "A film star visited the city.", "এগৰাকী চলচ্চিত্ৰ তাৰকাই চহৰ ভ্ৰমণ কৰিছে।"),
]

for s1_en, s1_as, s2_en, s2_as in INDEP:
    add(f"Statement I: {s1_en} Statement II: {s2_en}",
        f"বিবৃতি I: {s1_as} বিবৃতি II: {s2_as}",
        OPTS[2][0], OPTS[2][1], [o for o in OPTS if o[0] != OPTS[2][0]],
        "The two statements are unrelated and are independent causes.",
        "দুয়োটা বিবৃতি অসংপৃক্ত আৰু স্বতন্ত্ৰ কাৰণ।")

append_bi("cause-effect", rows)
