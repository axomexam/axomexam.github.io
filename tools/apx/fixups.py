"""Replacement rows for extra-bank questions whose text already appears
elsewhere on the site.

The generator authors 535 fresh rows; a few restate a fact that some other exam
bank or mock set already asks, which would be a duplicate. This module maps each
such question (by its English text) to a genuinely different question, so the
emitted extra bank shares no question with the rest of the site.

Keys are the original English question strings; values are the replacement row
(en, as, opts, correct, ex_en, ex_as), the same shape the authored rows use.
"""

FIXUPS = {}


def P(old, en, as_, opts, correct, ex_en, ex_as):
    FIXUPS[old] = (en, as_, opts, correct, ex_en, ex_as)


# ---------------- Assam History, Geography & Culture ----------------
P("In which year did Sukapha establish the Ahom kingdom in Assam?",
  "Sukapha entered Assam through which mountain pass?", "চুকাফাই কোন গিৰিপথেৰে অসমত প্ৰৱেশ কৰিছিল?",
  [("Patkai", "পাটকাই"), ("Manas", "মানস"), ("Dihang", "দিহাং"), ("Naga Hills", "নাগা পাহাৰ")], 0,
  "Sukapha came through the Patkai pass.", "চুকাফা পাটকাই গিৰিপথেৰে আহিছিল।")
P("Which river is known as the lifeline of Assam?",
  "The Barak river originates in which state?", "বৰাক নদী কোন ৰাজ্যত উৎপত্তি হয়?",
  [("Manipur", "মণিপুৰ"), ("Mizoram", "মিজোৰাম"), ("Nagaland", "নাগালেণ্ড"), ("Meghalaya", "মেঘালয়")], 0,
  "The Barak originates in the hills of Manipur.", "বৰাক মণিপুৰৰ পাহাৰত উৎপত্তি হয়।")
P("Who was the first Ahom king of Assam?",
  "The royal burial mounds (maidams) of the Ahoms are found at which place?", "আহোমসকলৰ ৰাজকীয় মৈদাম কোন ঠাইত পোৱা যায়?",
  [("Charaideo", "চৰাইদেউ"), ("Sivasagar", "শিৱসাগৰ"), ("Jorhat", "যোৰহাট"), ("Tezpur", "তেজপুৰ")], 0,
  "The royal maidams of the Ahoms are at Charaideo.", "আহোমসকলৰ ৰাজকীয় মৈদাম চৰাইদেউত।")
P("Which is the longest river of Assam?",
  "The Kolong river flows through which town of Assam?", "কলং নদী অসমৰ কোন নগৰৰ মাজেৰে বৈ যায়?",
  [("Nagaon", "নগাঁও"), ("Jorhat", "যোৰহাট"), ("Tezpur", "তেজপুৰ"), ("Dibrugarh", "ডিব্ৰুগড়")], 0,
  "The Kolong flows through Nagaon.", "কলং নগাঁৱৰ মাজেৰে বৈ যায়।")
P("Which national park of Assam is famous for the one-horned rhinoceros?",
  "In which year was Kaziranga declared a national park?", "কাজিৰঙাক কোন বছৰত ৰাষ্ট্ৰীয় উদ্যান ঘোষণা কৰা হৈছিল?",
  [("1974", "১৯৭৪"), ("1985", "১৯৮৫"), ("1968", "১৯৬৮"), ("1990", "১৯৯০")], 0,
  "Kaziranga was declared a national park in 1974.", "কাজিৰঙাক ১৯৭৪ চনত ৰাষ্ট্ৰীয় উদ্যান ঘোষণা কৰা হৈছিল।")
P("The Treaty of Yandabo was signed in which year?",
  "The Treaty of Yandabo was signed between the British and which country?", "য়াণ্ডাবু সন্ধি ব্ৰিটিছ আৰু কোন দেশৰ মাজত স্বাক্ষৰিত হৈছিল?",
  [("Burma", "বাৰ্মা"), ("Nepal", "নেপাল"), ("China", "চীন"), ("Bhutan", "ভূটান")], 0,
  "Yandabo ended the First Anglo-Burmese War.", "য়াণ্ডাবুৱে প্ৰথম ইংৰাজ-বাৰ্মা যুদ্ধ শেষ কৰিছিল।")
P("Which is the largest river island in the world, located in Assam?",
  "Majuli is an island formed by which river?", "মাজুলী কোন নদীয়ে গঠন কৰা এটা দ্বীপ?",
  [("Brahmaputra", "ব্ৰহ্মপুত্ৰ"), ("Barak", "বৰাক"), ("Subansiri", "সুবনশিৰি"), ("Dihing", "দিহিং")], 0,
  "Majuli is an island in the Brahmaputra.", "মাজুলী ব্ৰহ্মপুত্ৰৰ এটা দ্বীপ।")
P("Which is the highest peak in Assam?",
  "Which hill district of Assam is mainly inhabited by the Karbi people?", "অসমৰ কোন পাহাৰীয়া জিলাত মূলতঃ কাৰ্বি লোক বাস কৰে?",
  [("Karbi Anglong", "কাৰ্বি আংলং"), ("Dima Hasao", "ডিমা হাছাও"), ("Baksa", "বাক্সা"), ("Chirang", "চিৰাঙ")], 0,
  "Karbi Anglong is the home of the Karbi people.", "কাৰ্বি আংলং কাৰ্বি লোকসকলৰ ঘৰ।")
P("Who was the Ahom king during the Battle of Saraighat?",
  "In which year did the Ahoms finally expel the Mughals from Guwahati?", "কোন বছৰত আহোমসকলে গুৱাহাটীৰপৰা মোগলক চূড়ান্তভাৱে খেদি পঠিয়াইছিল?",
  [("1682", "১৬৮২"), ("1671", "১৬৭১"), ("1663", "১৬৬৩"), ("1615", "১৬১৫")], 0,
  "The Ahoms retook Guwahati at the Battle of Itakhuli in 1682.", "১৬৮২ চনত ইটাখুলিৰ যুদ্ধত আহোমসকলে গুৱাহাটী পুনৰ দখল কৰিছিল।")
P("Which is the largest district of Assam by area?",
  "How many districts does Assam have (as of 2023)?", "অসমত কিমানখন জিলা আছে (২০২৩ চনলৈ)?",
  [("35", "৩৫"), ("33", "৩৩"), ("27", "২৭"), ("31", "৩১")], 0,
  "Assam has 35 districts.", "অসমত ৩৫ খন জিলা আছে।")
P("Which is the largest wetland of Assam?",
  "Deepor Beel was declared a Ramsar site in which year?", "দীপৰ বিলক কোন বছৰত ৰামছাৰ ক্ষেত্ৰ ঘোষণা কৰা হৈছিল?",
  [("2002", "২০০২"), ("1985", "১৯৮৫"), ("1995", "১৯৯৫"), ("2010", "২০১০")], 0,
  "Deepor Beel was declared a Ramsar site in 2002.", "দীপৰ বিলক ২০০২ চনত ৰামছাৰ ক্ষেত্ৰ ঘোষণা কৰা হৈছিল।")
P("Deepor Beel, a Ramsar site, is located near which city?",
  "Which wildlife sanctuary is located in the Sonitpur district of Assam?", "অসমৰ শোণিতপুৰ জিলাত কোন অভয়াৰণ্য অৱস্থিত?",
  [("Nameri", "নামেৰী"), ("Orang", "ওৰাং"), ("Pobitora", "পবিতৰা"), ("Bornadi", "বৰনদী")], 0,
  "Nameri National Park and Tiger Reserve lies in Sonitpur.", "নামেৰী ৰাষ্ট্ৰীয় উদ্যান আৰু বাঘ সংৰক্ষিত অঞ্চল শোণিতপুৰত।")
P("The Treaty of Ghilajharighat was signed in which year?",
  "The Treaty of Ghilajharighat was signed with which Mughal general?", "ঘিলাঝাৰীঘাটৰ সন্ধি কোন মোগল সেনাপতিৰ সৈতে স্বাক্ষৰিত হৈছিল?",
  [("Mir Jumla", "মিৰজুমলা"), ("Ram Singh", "ৰাম সিংহ"), ("Man Singh", "মান সিংহ"), ("Shayista Khan", "শায়েস্তা খাঁ")], 0,
  "The treaty was signed with Mir Jumla after his invasion.", "আক্ৰমণৰ পিছত মিৰজুমলাৰ সৈতে সন্ধি স্বাক্ষৰিত হৈছিল।")
P("Which is the second longest river of Assam?",
  "The Subansiri river originates in which region?", "সুবনশিৰি নদী কোন অঞ্চলত উৎপত্তি হয়?",
  [("Tibet", "তিব্বত"), ("Arunachal Pradesh", "অৰুণাচল প্ৰদেশ"), ("Bhutan", "ভূটান"), ("Nagaland", "নাগালেণ্ড")], 0,
  "The Subansiri rises in Tibet and flows through Arunachal into Assam.", "সুবনশিৰি তিব্বতত উৎপত্তি হৈ অৰুণাচলৰ মাজেৰে অসমত প্ৰৱেশ কৰে।")
P("Which is the smallest district of Assam by area?",
  "Which district is the headquarters of the Bodoland Territorial Region?", "বড়োলেণ্ড টেৰিটৰিয়েল ৰিজনৰ মুখ্য কাৰ্যালয় কোন জিলাত?",
  [("Kokrajhar", "কোকৰাঝাৰ"), ("Udalguri", "ওদালগুৰি"), ("Baksa", "বাক্সা"), ("Chirang", "চিৰাঙ")], 0,
  "Kokrajhar is the headquarters of the Bodoland Territorial Region.", "কোকৰাঝাৰ বড়োলেণ্ড টেৰিটৰিয়েল ৰিজনৰ মুখ্য কাৰ্যালয়।")
P("The Brahmaputra is known by which name in Tibet?",
  "The Brahmaputra is known by which name in Bangladesh?", "বাংলাদেশত ব্ৰহ্মপুত্ৰক কোন নামেৰে জনা যায়?",
  [("Jamuna", "যমুনা"), ("Padma", "পদ্মা"), ("Meghna", "মেঘনা"), ("Dihang", "দিহাং")], 0,
  "In Bangladesh the Brahmaputra is called the Jamuna.", "বাংলাদেশত ব্ৰহ্মপুত্ৰক যমুনা বোলা হয়।")
P("Which is the largest city of Assam?",
  "Which city is known as the 'Gateway to North East India'?", "কোন চহৰক 'উত্তৰ-পূৱ ভাৰতৰ দুৱাৰ' বুলি জনা যায়?",
  [("Guwahati", "গুৱাহাটী"), ("Silchar", "শিলচৰ"), ("Dibrugarh", "ডিব্ৰুগড়"), ("Tezpur", "তেজপুৰ")], 0,
  "Guwahati is called the Gateway to North East India.", "গুৱাহাটীক উত্তৰ-পূৱ ভাৰতৰ দুৱাৰ বোলা হয়।")
P("Which is the largest tea-producing district of Assam?",
  "Sualkuchi, the silk-weaving town, is located in which district?", "ৰেশম বোৱা নগৰ সুৱালকুচি কোন জিলাত অৱস্থিত?",
  [("Kamrup", "কামৰূপ"), ("Jorhat", "যোৰহাট"), ("Sivasagar", "শিৱসাগৰ"), ("Nagaon", "নগাঁও")], 0,
  "Sualkuchi lies in Kamrup district near Guwahati.", "সুৱালকুচি গুৱাহাটীৰ ওচৰত কামৰূপ জিলাত অৱস্থিত।")
P("Who was the first Chief Minister of Assam?",
  "The Assam Sahitya Sabha was founded in which year?", "অসম সাহিত্য সভা কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
  [("1917", "১৯১৭"), ("1903", "১৯০৩"), ("1921", "১৯২১"), ("1885", "১৮৮৫")], 0,
  "The Assam Sahitya Sabha was founded in 1917.", "অসম সাহিত্য সভা ১৯১৭ চনত প্ৰতিষ্ঠা হৈছিল।")
P("The Assam Accord was signed in which year?",
  "Who was the Prime Minister of India when the Assam Accord was signed?", "অসম চুক্তি স্বাক্ষৰৰ সময়ত ভাৰতৰ প্ৰধানমন্ত্ৰী কোন আছিল?",
  [("Rajiv Gandhi", "ৰাজীৱ গান্ধী"), ("Indira Gandhi", "ইন্দিৰা গান্ধী"), ("Morarji Desai", "মোৰাৰজী দেশাই"), ("V. P. Singh", "ভি. পি. সিং")], 0,
  "The Assam Accord (1985) was signed under Prime Minister Rajiv Gandhi.", "অসম চুক্তি (১৯৮৫) প্ৰধানমন্ত্ৰী ৰাজীৱ গান্ধীৰ সময়ত স্বাক্ষৰিত হৈছিল।")
P("Which river is called the 'Sorrow of Assam'?",
  "Which river is called the 'Sorrow of Bihar'?", "কোন নদীক 'বিহাৰৰ দুখ' বুলি কোৱা হয়?",
  [("Kosi", "কোছী"), ("Damodar", "দামোদৰ"), ("Yamuna", "যমুনা"), ("Gandak", "গণ্ডক")], 0,
  "The Kosi is called the Sorrow of Bihar.", "কোছীক বিহাৰৰ দুখ বোলা হয়।")
P("Which district of Assam has the longest international border with Bangladesh?",
  "How many Indian states share a border with Assam?", "কিমানখন ভাৰতীয় ৰাজ্যই অসমৰ সৈতে সীমা ভাগ কৰে?",
  [("7", "৭"), ("6", "৬"), ("8", "৮"), ("5", "৫")], 0,
  "Seven states share a border with Assam.", "সাতখন ৰাজ্যই অসমৰ সৈতে সীমা ভাগ কৰে।")
P("Srimanta Sankardeva was born at which place?",
  "In which year was Srimanta Sankardeva born?", "শ্ৰীমন্ত শংকৰদেৱৰ জন্ম কোন বছৰত হৈছিল?",
  [("1449", "১৪৪৯"), ("1489", "১৪৮৯"), ("1409", "১৪০৯"), ("1520", "১৫২০")], 0,
  "Sankardeva was born in 1449 CE.", "শংকৰদেৱ ১৪৪৯ খ্ৰীষ্টাব্দত জন্মগ্ৰহণ কৰিছিল।")
P("Which Bihu marks the Assamese New Year?",
  "Magh Bihu is also known by which other name?", "মাঘ বিহুক আন কোন নামেৰে জনা যায়?",
  [("Bhogali Bihu", "ভোগালী বিহু"), ("Rongali Bihu", "ৰঙালী বিহু"), ("Kongali Bihu", "কঙালী বিহু"), ("Bohag Bihu", "ব’হাগ বিহু")], 0,
  "Magh Bihu is also called Bhogali Bihu.", "মাঘ বিহুক ভোগালী বিহু বুলিও কোৱা হয়।")
P("The 'Rang Ghar' at Sivasagar was used for which purpose?",
  "The 'Talatal Ghar' at Sivasagar was built as a —", "শিৱসাগৰৰ 'তলাতল ঘৰ' কি হিচাপে নিৰ্মিত হৈছিল —",
  [("royal palace", "ৰাজকীয় প্ৰাসাদ"), ("Sattra", "সত্ৰ"), ("temple", "মন্দিৰ"), ("market", "বজাৰ")], 0,
  "The Talatal Ghar was a royal palace of the Ahom kings.", "তলাতল ঘৰ আহোম ৰজাসকলৰ ৰাজকীয় প্ৰাসাদ আছিল।")

# ---------------- Elementary Mathematics ----------------
P("Find the HCF of 48 and 60.",
  "Find the HCF of 27 and 45.", "২৭ আৰু ৪৫ ৰ গ.সা.গু. নিৰ্ণয় কৰা।",
  [("9", "৯"), ("3", "৩"), ("15", "১৫"), ("27", "২৭")], 0,
  "27 = 3^3 and 45 = 3^2 x 5; HCF = 3^2 = 9.", "২৭ = ৩³ আৰু ৪৫ = ৩² × ৫; গ.সা.গু. = ৩² = ৯।")
P("If a : b = 2 : 3 and b : c = 4 : 5, find a : c.",
  "If a : b = 3 : 4 and b : c = 2 : 5, find a : c.", "যদি a : b = ৩ : ৪ আৰু b : c = ২ : ৫ হয়, a : c নিৰ্ণয় কৰা।",
  [("3 : 10", "৩ : ১০"), ("3 : 5", "৩ : ৫"), ("6 : 5", "৬ : ৫"), ("2 : 5", "২ : ৫")], 0,
  "a : b : c = 6 : 8 : 20, so a : c = 6 : 20 = 3 : 10.", "a : b : c = ৬ : ৮ : ২০, গতিকে a : c = ৬ : ২০ = ৩ : ১০।")
P("Find the mean proportional between 4 and 25.",
  "Find the mean proportional between 9 and 16.", "৯ আৰু ১৬ ৰ মধ্যসমানুপাতী নিৰ্ণয় কৰা।",
  [("12", "১২"), ("11", "১১"), ("13", "১৩"), ("144", "১৪৪")], 0,
  "Mean proportional = square root of (9 x 16) = 12.", "মধ্যসমানুপাতী = √(৯ × ১৬) = ১২।")
P("Find the third proportional to 4 and 12.",
  "Find the third proportional to 6 and 18.", "৬ আৰু ১৮ ৰ তৃতীয় সমানুপাতী নিৰ্ণয় কৰা।",
  [("54", "৫৪"), ("36", "৩৬"), ("24", "২৪"), ("48", "৪৮")], 0,
  "Third proportional = 18 x 18 / 6 = 54.", "তৃতীয় সমানুপাতী = ১৮ × ১৮ ÷ ৬ = ৫৪।")
P("Find the compound interest on Rs 4000 at 10% per annum for 2 years.",
  "Find the compound interest on Rs 5000 at 10% per annum for 2 years.", "৫০০০ টকাৰ ওপৰত বছৰি ১০% হাৰত ২ বছৰৰ চক্ৰবৃদ্ধি সুত নিৰ্ণয় কৰা।",
  [("Rs 1050", "১০৫০ টকা"), ("Rs 1000", "১০০০ টকা"), ("Rs 1100", "১১০০ টকা"), ("Rs 950", "৯৫০ টকা")], 0,
  "Amount = 5000 x 1.1^2 = 6050; CI = 6050 - 5000 = Rs 1050.", "পৰিমাণ = ৫০০০ × ১.১² = ৬০৫০; চক্ৰবৃদ্ধি = ৬০৫০ - ৫০০০ = ১০৫০ টকা।")

# ---------------- Logical Reasoning ----------------
P("Find the next number in the series: 3, 6, 11, 18, 27, ?",
  "Find the next number in the series: 2, 6, 12, 20, 30, ?", "শ্ৰেণীটোৰ পৰৱৰ্তী সংখ্যা নিৰ্ণয় কৰা: ২, ৬, ১২, ২০, ৩০, ?",
  [("42", "৪২"), ("40", "৪০"), ("44", "৪৪"), ("36", "৩৬")], 0,
  "Differences are 4, 6, 8, 10, 12; next = 30 + 12 = 42.", "পাৰ্থক্য ৪, ৬, ৮, ১০, ১২; পৰৱৰ্তী = ৩০ + ১২ = ৪২।")
P("A is the father of B. B is the sister of C. How is A related to C?",
  "P is the mother of Q. Q is the brother of R. How is P related to R?", "P, Q ৰ মাক। Q, R ৰ ভাই। P ৰ R ৰ সৈতে কি সম্পৰ্ক?",
  [("Mother", "মাক"), ("Aunt", "খুড়ী"), ("Sister", "ভগ্নী"), ("Grandmother", "আইতাক")], 0,
  "P is the mother of both Q and R.", "P, Q আৰু R দুয়োৰে মাক।")
P("Doctor : Hospital :: Teacher : ?",
  "Doctor : Patient :: Lawyer : ?", "Doctor : Patient :: Lawyer : ?",
  [("Client", "Client"), ("Court", "Court"), ("Judge", "Judge"), ("Case", "Case")], 0,
  "A doctor serves a patient as a lawyer serves a client.", "যেনেকৈ ডাক্তৰে ৰোগীৰ সেৱা কৰে, অধিবক্তাই মক্কেলৰ সেৱা কৰে।")
P("Book : Chapter :: Building : ?",
  "Word : Sentence :: Brick : ?", "Word : Sentence :: Brick : ?",
  [("Wall", "Wall"), ("House", "House"), ("Cement", "Cement"), ("Roof", "Roof")], 0,
  "A word builds a sentence as a brick builds a wall.", "যেনেকৈ শব্দই বাক্য গঠন কৰে, ইটাৱে বেৰ গঠন কৰে।")
P("Pen : Write :: Knife : ?",
  "Needle : Sew :: Saw : ?", "Needle : Sew :: Saw : ?",
  [("Cut", "Cut"), ("Wood", "Wood"), ("Sharp", "Sharp"), ("Tool", "Tool")], 0,
  "A needle is used to sew as a saw is used to cut.", "যেনেকৈ বেজীয়ে চিলাই কৰে, কৰতে কাটে।")
P("If today is Monday, what day will it be after 61 days?",
  "If today is Friday, what day will it be after 50 days?", "আজি শুক্ৰবাৰ হ'লে ৫০ দিনৰ পিছত কি বাৰ হ'ব?",
  [("Saturday", "শনিবাৰ"), ("Sunday", "দেওবাৰ"), ("Friday", "শুক্ৰবাৰ"), ("Monday", "সোমবাৰ")], 0,
  "50 mod 7 = 1; Friday + 1 = Saturday.", "৫০ ÷ ৭ ৰ ভাগশেষ ১; শুক্ৰবাৰ + ১ = শনিবাৰ।")

# ---------------- General English: vocabulary (synonyms-antonyms) ----------------
P("Choose the synonym of 'Abundant'.",
  "Choose the synonym of 'Vast'.", "'Vast' ৰ সমাৰ্থক শব্দ বাছনি কৰা।",
  [("Huge", "Huge"), ("Tiny", "Tiny"), ("Narrow", "Narrow"), ("Short", "Short")], 0,
  "'Vast' means very large, i.e. huge.", "'Vast' ৰ অৰ্থ অতি ডাঙৰ, অৰ্থাৎ huge।")
P("Choose the antonym of 'Ancient'.",
  "Choose the antonym of 'Genuine'.", "'Genuine' ৰ বিপৰীত শব্দ বাছনি কৰা।",
  [("Fake", "Fake"), ("Real", "Real"), ("True", "True"), ("Actual", "Actual")], 0,
  "'Genuine' means real; 'fake' is its opposite.", "'Genuine' ৰ অৰ্থ প্ৰকৃত; ইয়াৰ বিপৰীত 'fake'।")
P("Choose the synonym of 'Courage'.",
  "Choose the synonym of 'Cordial'.", "'Cordial' ৰ সমাৰ্থক শব্দ বাছনি কৰা।",
  [("Friendly", "Friendly"), ("Rude", "Rude"), ("Cold", "Cold"), ("Harsh", "Harsh")], 0,
  "'Cordial' means warm and friendly.", "'Cordial' ৰ অৰ্থ উষ্ণ আৰু বন্ধুত্বপূৰ্ণ।")
P("Choose the antonym of 'Generous'.",
  "Choose the antonym of 'Optimist'.", "'Optimist' ৰ বিপৰীত শব্দ বাছনি কৰা।",
  [("Pessimist", "Pessimist"), ("Idealist", "Idealist"), ("Realist", "Realist"), ("Activist", "Activist")], 0,
  "An optimist is hopeful; a pessimist is the opposite.", "Optimist আশাবাদী; ইয়াৰ বিপৰীত Pessimist।")
P("Choose the synonym of 'Vacant'.",
  "Choose the synonym of 'Diligent'.", "'Diligent' ৰ সমাৰ্থক শব্দ বাছনি কৰা।",
  [("Hardworking", "Hardworking"), ("Lazy", "Lazy"), ("Idle", "Idle"), ("Careless", "Careless")], 0,
  "'Diligent' means hardworking.", "'Diligent' ৰ অৰ্থ পৰিশ্ৰমী, অৰ্থাৎ hardworking।")
P("Choose the antonym of 'Expand'.",
  "Choose the antonym of 'Liberty'.", "'Liberty' ৰ বিপৰীত শব্দ বাছনি কৰা।",
  [("Slavery", "Slavery"), ("Freedom", "Freedom"), ("Rights", "Rights"), ("Choice", "Choice")], 0,
  "'Liberty' means freedom; 'slavery' is its opposite.", "'Liberty' ৰ অৰ্থ স্বাধীনতা; ইয়াৰ বিপৰীত 'slavery'।")
P("Choose the synonym of 'Humble'.",
  "Choose the synonym of 'Candid'.", "'Candid' ৰ সমাৰ্থক শব্দ বাছনি কৰা।",
  [("Frank", "Frank"), ("Secret", "Secret"), ("Shy", "Shy"), ("Vague", "Vague")], 0,
  "'Candid' means frank and straightforward.", "'Candid' ৰ অৰ্থ সৰল আৰু স্পষ্ট।")
P("Choose the antonym of 'Victory'.",
  "Choose the antonym of 'Abundant'.", "'Abundant' ৰ বিপৰীত শব্দ বাছনি কৰা।",
  [("Scarce", "Scarce"), ("Plenty", "Plenty"), ("Ample", "Ample"), ("Rich", "Rich")], 0,
  "'Abundant' means plentiful; 'scarce' is its opposite.", "'Abundant' ৰ অৰ্থ প্ৰচুৰ; ইয়াৰ বিপৰীত 'scarce'।")
P("Choose the synonym of 'Rapid'.",
  "Choose the synonym of 'Weary'.", "'Weary' ৰ সমাৰ্থক শব্দ বাছনি কৰা।",
  [("Tired", "Tired"), ("Fresh", "Fresh"), ("Energetic", "Energetic"), ("Active", "Active")], 0,
  "'Weary' means very tired.", "'Weary' ৰ অৰ্থ অতি ভাগৰুৱা।")
P("Choose the antonym of 'Transparent'.",
  "Choose the antonym of 'Brave'.", "'Brave' ৰ বিপৰীত শব্দ বাছনি কৰা।",
  [("Cowardly", "Cowardly"), ("Bold", "Bold"), ("Valiant", "Valiant"), ("Daring", "Daring")], 0,
  "'Brave' means courageous; 'cowardly' is its opposite.", "'Brave' ৰ অৰ্থ সাহসী; ইয়াৰ বিপৰীত 'cowardly'।")
P("Choose the synonym of 'Fragile'.",
  "Choose the synonym of 'Stubborn'.", "'Stubborn' ৰ সমাৰ্থক শব্দ বাছনি কৰা।",
  [("Obstinate", "Obstinate"), ("Flexible", "Flexible"), ("Yielding", "Yielding"), ("Gentle", "Gentle")], 0,
  "'Stubborn' means obstinate.", "'Stubborn' ৰ অৰ্থ একগুঁৱা, অৰ্থাৎ obstinate।")
P("Choose the antonym of 'Scarce'.",
  "Choose the antonym of 'Artificial'.", "'Artificial' ৰ বিপৰীত শব্দ বাছনি কৰা।",
  [("Natural", "Natural"), ("Synthetic", "Synthetic"), ("Fake", "Fake"), ("Man-made", "Man-made")], 0,
  "'Artificial' means man-made; 'natural' is its opposite.", "'Artificial' ৰ অৰ্থ কৃত্ৰিম; ইয়াৰ বিপৰীত 'natural'।")
P("Choose the antonym of 'Permanent'.",
  "Choose the antonym of 'Fame'.", "'Fame' ৰ বিপৰীত শব্দ বাছনি কৰা।",
  [("Obscurity", "Obscurity"), ("Honour", "Honour"), ("Glory", "Glory"), ("Repute", "Repute")], 0,
  "'Fame' means renown; 'obscurity' is its opposite.", "'Fame' ৰ অৰ্থ খ্যাতি; ইয়াৰ বিপৰীত 'obscurity'।")
P("Choose the synonym of 'Obtain'.",
  "Choose the synonym of 'Tranquil'.", "'Tranquil' ৰ সমাৰ্থক শব্দ বাছনি কৰা।",
  [("Peaceful", "Peaceful"), ("Noisy", "Noisy"), ("Rough", "Rough"), ("Busy", "Busy")], 0,
  "'Tranquil' means calm and peaceful.", "'Tranquil' ৰ অৰ্থ শান্ত আৰু প্ৰশান্ত।")

# ---------------- General English: grammar ----------------
P("Choose the correct option: The sun ___ in the east.",
  "Choose the correct option: Water ___ at 100 degrees Celsius.", "শুদ্ধ বিকল্প বাছনি কৰা: Water ___ at 100 degrees Celsius.",
  [("boils", "boils"), ("boil", "boil"), ("boiled", "boiled"), ("is boiling", "is boiling")], 0,
  "A universal truth takes the simple present: 'boils'.", "সাৰ্বজনীন সত্যৰ বাবে simple present লাগে: 'boils'।")
P("Fill in the blank: He is good ___ mathematics.",
  "Fill in the blank: She is expert ___ cooking.", "খালী ঠাই পূৰণ কৰা: She is expert ___ cooking.",
  [("in", "in"), ("at", "at"), ("on", "on"), ("for", "for")], 0,
  "'Expert' is followed by 'in'.", "'Expert' ৰ পিছত 'in' আহে।")
P("Fill in the blank: She is afraid ___ dogs.",
  "Fill in the blank: He is addicted ___ drugs.", "খালী ঠাই পূৰণ কৰা: He is addicted ___ drugs.",
  [("to", "to"), ("of", "of"), ("with", "with"), ("for", "for")], 0,
  "'Addicted' is followed by 'to'.", "'Addicted' ৰ পিছত 'to' আহে।")
P("Choose the correct article: He is ___ honest man.",
  "Choose the correct article: She is ___ university student.", "শুদ্ধ article বাছনি কৰা: She is ___ university student.",
  [("a", "a"), ("an", "an"), ("the", "the"), ("no article", "article নাই")], 0,
  "'University' begins with the consonant sound 'yoo', so 'a' is used.", "'University' ব্যঞ্জন ধ্বনি 'য়ু' ৰে আৰম্ভ হয়, গতিকে 'a' ব্যৱহাৰ হয়।")
P("Choose the correct article: ___ Ganga is a holy river.",
  "Choose the correct article: He plays ___ guitar well.", "শুদ্ধ article বাছনি কৰা: He plays ___ guitar well.",
  [("the", "the"), ("a", "a"), ("an", "an"), ("no article", "article নাই")], 0,
  "Musical instruments take the definite article 'the'.", "বাদ্যযন্ত্ৰৰ সৈতে definite article 'the' ব্যৱহাৰ হয়।")
P("Choose the correct option: One of my friends ___ a doctor.",
  "Choose the correct option: Either of the two answers ___ correct.", "শুদ্ধ বিকল্প বাছনি কৰা: Either of the two answers ___ correct.",
  [("is", "is"), ("are", "are"), ("were", "were"), ("have", "have")], 0,
  "'Either' takes a singular verb: 'is'.", "'Either' য়ে একবচন ক্ৰিয়া লয়: 'is'।")
P("Choose the correct option: Mathematics ___ my favourite subject.",
  "Choose the correct option: Physics ___ a difficult subject.", "শুদ্ধ বিকল্প বাছনি কৰা: Physics ___ a difficult subject.",
  [("is", "is"), ("are", "are"), ("were", "were"), ("have", "have")], 0,
  "'Physics' is treated as singular.", "'Physics' ক একবচন হিচাপে ধৰা হয়।")
P("Fill in the blank: He has been waiting ___ two hours.",
  "Fill in the blank: She has been ill ___ last Monday.", "খালী ঠাই পূৰণ কৰা: She has been ill ___ last Monday.",
  [("since", "since"), ("for", "for"), ("from", "from"), ("by", "by")], 0,
  "'Since' is used with a point of time.", "নিৰ্দিষ্ট সময়বিন্দুৰ সৈতে 'since' ব্যৱহাৰ হয়।")
P("Fill in the blank: I prefer tea ___ coffee.",
  "Fill in the blank: He is superior ___ me in rank.", "খালী ঠাই পূৰণ কৰা: He is superior ___ me in rank.",
  [("to", "to"), ("than", "than"), ("from", "from"), ("over", "over")], 0,
  "'Superior' takes 'to', not 'than'.", "'Superior' য়ে 'than' নহয় 'to' লয়।")
P("Fill in the blank: She is married ___ a doctor.",
  "Fill in the blank: He is engaged ___ his work.", "খালী ঠাই পূৰণ কৰা: He is engaged ___ his work.",
  [("in", "in"), ("with", "with"), ("to", "to"), ("for", "for")], 0,
  "'Engaged in' means occupied with something.", "'Engaged in' ৰ অৰ্থ কামত ব্যস্ত থকা।")
P("Fill in the blank: The book is ___ the table.",
  "Fill in the blank: The cat is hiding ___ the bed.", "খালী ঠাই পূৰণ কৰা: The cat is hiding ___ the bed.",
  [("under", "under"), ("on", "on"), ("over", "over"), ("of", "of")], 0,
  "'Under' shows a position below something.", "'Under' য়ে কিবা এটাৰ তলৰ অৱস্থান দেখুৱায়।")
P("Fill in the blank: We must abide ___ the rules.",
  "Fill in the blank: She insisted ___ going alone.", "খালী ঠাই পূৰণ কৰা: She insisted ___ going alone.",
  [("on", "on"), ("for", "for"), ("to", "to"), ("at", "at")], 0,
  "'Insist' is followed by 'on'.", "'Insist' ৰ পিছত 'on' আহে।")

# ---------------- General English: idioms, one-word substitution ----------------
P("The idiom 'a blessing in disguise' means —",
  "The idiom 'to burn the midnight oil' means —", "'to burn the midnight oil' বাক্যৰীতিটোৰ অৰ্থ —",
  [("to work late into the night", "ৰাতি বহুপৰলৈ কাম কৰা"), ("to waste oil", "তেল নষ্ট কৰা"), ("to sleep early", "সোনকালে টোপনি যোৱা"), ("to light a lamp", "চাকি জ্বলোৱা")], 0,
  "'To burn the midnight oil' means to study or work late into the night.", "'To burn the midnight oil' ৰ অৰ্থ ৰাতি বহুপৰলৈ পঢ়া বা কাম কৰা।")
P("The idiom 'to beat about the bush' means —",
  "The idiom 'to smell a rat' means —", "'to smell a rat' বাক্যৰীতিটোৰ অৰ্থ —",
  [("to suspect something wrong", "কিবা ভুল হোৱাৰ সন্দেহ কৰা"), ("to smell bad", "দুৰ্গন্ধ পোৱা"), ("to catch a rat", "এটা নিগনি ধৰা"), ("to feel happy", "সুখী অনুভৱ কৰা")], 0,
  "'To smell a rat' means to suspect a trick or something wrong.", "'To smell a rat' ৰ অৰ্থ কিবা চক্ৰ বা ভুলৰ সন্দেহ কৰা।")
P("The idiom 'once in a blue moon' means —",
  "The idiom 'to show the white feather' means —", "'to show the white feather' বাক্যৰীতিটোৰ অৰ্থ —",
  [("to act like a coward", "কাপুৰুষৰ দৰে চলা"), ("to be brave", "সাহসী হোৱা"), ("to help others", "আনক সহায় কৰা"), ("to work hard", "পৰিশ্ৰম কৰা")], 0,
  "'To show the white feather' means to show cowardice.", "'To show the white feather' ৰ অৰ্থ কাপুৰুষতা দেখুওৱা।")
P("The idiom 'to make both ends meet' means —",
  "The idiom 'to add fuel to the fire' means —", "'to add fuel to the fire' বাক্যৰীতিটোৰ অৰ্থ —",
  [("to make matters worse", "পৰিস্থিতি আৰু বেয়া কৰা"), ("to put out a fire", "জুই নুমুওৱা"), ("to cook food", "খাদ্য ৰন্ধা"), ("to keep warm", "গৰম থাকা")], 0,
  "'To add fuel to the fire' means to aggravate a situation.", "'To add fuel to the fire' ৰ অৰ্থ পৰিস্থিতি আৰু বেয়া কৰা।")
P("The idiom 'a piece of cake' means —",
  "The idiom 'to be in hot water' means —", "'to be in hot water' বাক্যৰীতিটোৰ অৰ্থ —",
  [("to be in trouble", "বিপদত পৰা"), ("to be happy", "সুখী হোৱা"), ("to be thirsty", "তৃষ্ণা পোৱা"), ("to be rich", "ধনী হোৱা")], 0,
  "'To be in hot water' means to be in trouble or difficulty.", "'To be in hot water' ৰ অৰ্থ বিপদ বা অসুবিধাত পৰা।")
P("The idiom 'to turn a deaf ear' means —",
  "The idiom 'to play second fiddle' means —", "'to play second fiddle' বাক্যৰীতিটোৰ অৰ্থ —",
  [("to take a subordinate role", "গৌণ ভূমিকা লোৱা"), ("to play music", "সংগীত বজোৱা"), ("to lead others", "আনক নেতৃত্ব দিয়া"), ("to be selfish", "স্বাৰ্থপৰ হোৱা")], 0,
  "'To play second fiddle' means to take a secondary role.", "'To play second fiddle' ৰ অৰ্থ গৌণ ভূমিকা লোৱা।")
P("The idiom 'in the nick of time' means —",
  "The idiom 'to have an axe to grind' means —", "'to have an axe to grind' বাক্যৰীতিটোৰ অৰ্থ —",
  [("to have a selfish motive", "স্বাৰ্থপৰ উদ্দেশ্য থকা"), ("to cut wood", "কাঠ কটা"), ("to be very busy", "অতি ব্যস্ত হোৱা"), ("to be angry", "খঙত হোৱা")], 0,
  "'To have an axe to grind' means to have a selfish purpose.", "'To have an axe to grind' ৰ অৰ্থ স্বাৰ্থপৰ উদ্দেশ্য থকা।")
P("One who is present everywhere is called —",
  "One who studies the origin and structure of the universe is called a —", "ব্ৰহ্মাণ্ডৰ উৎপত্তি আৰু গঠন অধ্যয়ন কৰা জনক কি বোলা হয় —",
  [("cosmologist", "cosmologist"), ("astronomer", "astronomer"), ("geologist", "geologist"), ("botanist", "botanist")], 0,
  "A cosmologist studies the origin and structure of the universe.", "cosmologist য়ে ব্ৰহ্মাণ্ডৰ উৎপত্তি আৰু গঠন অধ্যয়ন কৰে।")

# ---------------- General Knowledge & Current Affairs ----------------
P("Who was the first President of India?",
  "Who was the first Vice-President of India?", "ভাৰতৰ প্ৰথম উপ-ৰাষ্ট্ৰপতি কোন আছিল?",
  [("Dr. S. Radhakrishnan", "ড° এছ. ৰাধাকৃষ্ণন"), ("Zakir Hussain", "জাকিৰ হুছেইন"), ("V. V. Giri", "ভি. ভি. গিৰি"), ("Gopal Swarup Pathak", "গোপাল স্বৰূপ পাঠক")], 0,
  "Dr. S. Radhakrishnan was the first Vice-President of India.", "ড° এছ. ৰাধাকৃষ্ণন ভাৰতৰ প্ৰথম উপ-ৰাষ্ট্ৰপতি আছিল।")
P("Where is the headquarters of the United Nations?",
  "In which year was the United Nations founded?", "ৰাষ্ট্ৰসংঘ কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
  [("1945", "১৯৪৫"), ("1947", "১৯৪৭"), ("1950", "১৯৫০"), ("1919", "১৯১৯")], 0,
  "The United Nations was founded in 1945.", "ৰাষ্ট্ৰসংঘ ১৯৪৫ চনত প্ৰতিষ্ঠা হৈছিল।")
P("Which planet is known as the Red Planet?",
  "Which planet is known as the 'Evening Star'?", "কোন গ্ৰহক 'সন্ধিয়াৰ তৰা' বুলি জনা যায়?",
  [("Venus", "শুক্ৰ"), ("Mars", "মঙ্গল"), ("Mercury", "বুধ"), ("Jupiter", "বৃহস্পতি")], 0,
  "Venus is called the Evening Star.", "শুক্ৰ গ্ৰহক সন্ধিয়াৰ তৰা বোলা হয়।")
P("Which country is the largest by area in the world?",
  "Which is the smallest continent in the world?", "বিশ্বৰ আটাইতকৈ সৰু মহাদেশ কোনটো?",
  [("Australia", "অষ্ট্ৰেলিয়া"), ("Europe", "ইউৰোপ"), ("Antarctica", "এণ্টাৰ্কটিকা"), ("South America", "দক্ষিণ আমেৰিকা")], 0,
  "Australia is the smallest continent.", "অষ্ট্ৰেলিয়া আটাইতকৈ সৰু মহাদেশ।")
P("Which is the largest planet in the solar system?",
  "Which planet is known as the 'Blue Planet'?", "কোন গ্ৰহক 'নীলা গ্ৰহ' বুলি জনা যায়?",
  [("Earth", "পৃথিৱী"), ("Neptune", "নেপচুন"), ("Uranus", "ইউৰেনাছ"), ("Venus", "শুক্ৰ")], 0,
  "Earth is called the Blue Planet.", "পৃথিৱীক নীলা গ্ৰহ বোলা হয়।")
P("Which is the currency of Japan?",
  "Which is the currency of South Korea?", "দক্ষিণ কোৰিয়াৰ মুদ্ৰা কি?",
  [("Won", "ৱন"), ("Yen", "য়েন"), ("Yuan", "য়ুৱান"), ("Baht", "বাহত")], 0,
  "The currency of South Korea is the won.", "দক্ষিণ কোৰিয়াৰ মুদ্ৰা ৱন।")
P("Who was the first Prime Minister of India?",
  "Who was the second Prime Minister of India?", "ভাৰতৰ দ্বিতীয় প্ৰধানমন্ত্ৰী কোন আছিল?",
  [("Lal Bahadur Shastri", "লাল বাহাদুৰ শাস্ত্ৰী"), ("Gulzarilal Nanda", "গুলজাৰীলাল নন্দা"), ("Indira Gandhi", "ইন্দিৰা গান্ধী"), ("Morarji Desai", "মোৰাৰজী দেশাই")], 0,
  "Lal Bahadur Shastri was the second Prime Minister of India.", "লাল বাহাদুৰ শাস্ত্ৰী ভাৰতৰ দ্বিতীয় প্ৰধানমন্ত্ৰী আছিল।")
P("The Indian National Congress was founded in which year?",
  "Who was the first President of the Indian National Congress?", "ভাৰতীয় জাতীয় কংগ্ৰেছৰ প্ৰথম সভাপতি কোন আছিল?",
  [("W. C. Bonnerjee", "ডব্লিউ. চি. বেনাৰ্জী"), ("Dadabhai Naoroji", "দাদাভাই নৌৰজী"), ("A. O. Hume", "এ. অ'. হিউম"), ("Surendranath Banerjee", "সুৰেন্দ্ৰনাথ বেনাৰ্জী")], 0,
  "W. C. Bonnerjee was the first President of the INC.", "ডব্লিউ. চি. বেনাৰ্জী কংগ্ৰেছৰ প্ৰথম সভাপতি আছিল।")
P("The chemical formula of water is —",
  "What is the chemical formula of common salt?", "সাধাৰণ নিমখৰ ৰাসায়নিক সংকেত কি?",
  [("NaCl", "NaCl"), ("KCl", "KCl"), ("CaCO3", "CaCO3"), ("NaOH", "NaOH")], 0,
  "Common salt is sodium chloride, NaCl.", "সাধাৰণ নিমখ হ'ল ছ'ডিয়াম ক্ল'ৰাইড, NaCl।")
P("Which is the largest ocean in the world?",
  "Which is the deepest ocean in the world?", "বিশ্বৰ আটাইতকৈ গভীৰ মহাসাগৰ কোনটো?",
  [("Pacific Ocean", "প্ৰশান্ত মহাসাগৰ"), ("Atlantic Ocean", "আটলাণ্টিক মহাসাগৰ"), ("Indian Ocean", "ভাৰত মহাসাগৰ"), ("Arctic Ocean", "উত্তৰ মহাসাগৰ")], 0,
  "The Pacific Ocean is the deepest.", "প্ৰশান্ত মহাসাগৰ আটাইতকৈ গভীৰ।")
P("Who gave the slogan 'Give me blood, I will give you freedom'?",
  "Who gave the slogan 'Inquilab Zindabad'?", "'ইনকিলাব জিন্দাবাদ' slogan কোনে দিছিল?",
  [("Bhagat Singh", "ভগত সিং"), ("Subhas Chandra Bose", "সুভাষ চন্দ্ৰ বসু"), ("Mahatma Gandhi", "মহাত্মা গান্ধী"), ("Lala Lajpat Rai", "লালা লাজপত ৰায়")], 0,
  "Bhagat Singh popularised 'Inquilab Zindabad'.", "ভগত সিঙে 'ইনকিলাব জিন্দাবাদ' জনপ্ৰিয় কৰিছিল।")
P("Which country has the largest population in the world?",
  "Which country has the highest population density among these?", "এইবোৰৰ ভিতৰত কোন দেশৰ জনসংখ্যা ঘনত্ব সৰ্বাধিক?",
  [("Bangladesh", "বাংলাদেশ"), ("India", "ভাৰত"), ("China", "চীন"), ("USA", "আমেৰিকা")], 0,
  "Among these, Bangladesh has the highest population density.", "এইবোৰৰ ভিতৰত বাংলাদেশৰ জনসংখ্যা ঘনত্ব সৰ্বাধিক।")
P("Which vitamin is obtained from sunlight?",
  "Deficiency of which vitamin causes night blindness?", "কোন ভিটামিনৰ অভাৱত ৰাতি-অন্ধতা হয়?",
  [("Vitamin A", "ভিটামিন A"), ("Vitamin C", "ভিটামিন C"), ("Vitamin D", "ভিটামিন D"), ("Vitamin K", "ভিটামিন K")], 0,
  "Night blindness is caused by a deficiency of Vitamin A.", "ভিটামিন A ৰ অভাৱত ৰাতি-অন্ধতা হয়।")
P("Who was the first Governor-General of independent India?",
  "Who was the first Indian Governor-General of independent India?", "স্বাধীন ভাৰতৰ প্ৰথম ভাৰতীয় গৱৰ্ণৰ-জেনেৰেল কোন আছিল?",
  [("C. Rajagopalachari", "চি. ৰাজাগোপালাচাৰী"), ("Lord Mountbatten", "লৰ্ড মাউণ্টবেটেন"), ("Rajendra Prasad", "ৰাজেন্দ্ৰ প্ৰসাদ"), ("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু")], 0,
  "C. Rajagopalachari was the first Indian Governor-General.", "চি. ৰাজাগোপালাচাৰী প্ৰথম ভাৰতীয় গৱৰ্ণৰ-জেনেৰেল আছিল।")
P("The Nobel Prize is awarded in how many categories?",
  "In which year were the first Nobel Prizes awarded?", "প্ৰথম ন'বেল বঁটা কোন বছৰত প্ৰদান কৰা হৈছিল?",
  [("1901", "১৯০১"), ("1895", "১৮৯৫"), ("1911", "১৯১১"), ("1921", "১৯২১")], 0,
  "The first Nobel Prizes were awarded in 1901.", "প্ৰথম ন'বেল বঁটা ১৯০১ চনত প্ৰদান কৰা হৈছিল।")
P("The Quit India Movement was launched in which year?",
  "The Champaran Satyagraha was launched by Gandhi in which year?", "গান্ধীয়ে চম্পাৰণ সত্যাগ্ৰহ কোন বছৰত আৰম্ভ কৰিছিল?",
  [("1917", "১৯১৭"), ("1920", "১৯২০"), ("1930", "১৯৩০"), ("1942", "১৯৪২")], 0,
  "The Champaran Satyagraha began in 1917.", "চম্পাৰণ সত্যাগ্ৰহ ১৯১৭ চনত আৰম্ভ হৈছিল।")
P("Which gas is most abundant in the Earth's atmosphere?",
  "Which gas is used by plants to make proteins?", "উদ্ভিদে প্ৰ'টিন তৈয়াৰ কৰিবলৈ কোন গেছ ব্যৱহাৰ কৰে?",
  [("Nitrogen", "নাইট্ৰজেন"), ("Oxygen", "অক্সিজেন"), ("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Hydrogen", "হাইড্ৰজেন")], 0,
  "Plants use nitrogen to make proteins.", "উদ্ভিদে প্ৰ'টিন তৈয়াৰ কৰিবলৈ নাইট্ৰজেন ব্যৱহাৰ কৰে।")
P("Who is known as the 'Iron Man of India'?",
  "Who is known as the 'Father of the Nation' in India?", "ভাৰতত কাক 'ৰাষ্ট্ৰপিতা' বুলি জনা যায়?",
  [("Mahatma Gandhi", "মহাত্মা গান্ধী"), ("Sardar Patel", "সৰ্দাৰ পেটেল"), ("Nehru", "নেহৰু"), ("Bose", "বসু")], 0,
  "Mahatma Gandhi is called the Father of the Nation.", "মহাত্মা গান্ধীক ৰাষ্ট্ৰপিতা বোলা হয়।")
P("Which is the smallest bone in the human body?",
  "How many bones are there in the adult human body?", "প্ৰাপ্তবয়স্ক মানৱ শৰীৰত কিমানখন হাড় থাকে?",
  [("206", "২০৬"), ("200", "২০০"), ("212", "২১২"), ("180", "১৮০")], 0,
  "An adult human body has 206 bones.", "প্ৰাপ্তবয়স্ক মানৱ শৰীৰত ২০৬ খন হাড় থাকে।")
P("The Kyoto Protocol is related to —",
  "The Montreal Protocol is related to —", "মণ্ট্ৰিয়েল প্ৰ'ট'কল কিসৰ সৈতে জড়িত —",
  [("the ozone layer", "অ'জন স্তৰ"), ("climate change", "জলবায়ু পৰিৱৰ্তন"), ("trade", "বাণিজ্য"), ("health", "স্বাস্থ্য")], 0,
  "The Montreal Protocol deals with protection of the ozone layer.", "মণ্ট্ৰিয়েল প্ৰ'ট'কলে অ'জন স্তৰ সুৰক্ষাৰ সৈতে কাম কৰে।")
P("Who was the first woman Prime Minister of India?",
  "Who was the first woman Chief Minister in India?", "ভাৰতৰ প্ৰথম মহিলা মুখ্যমন্ত্ৰী কোন আছিল?",
  [("Sucheta Kripalani", "সুচেতা কৃপালানী"), ("Indira Gandhi", "ইন্দিৰা গান্ধী"), ("Sarojini Naidu", "সৰোজিনী নাইডু"), ("Vijaya Lakshmi Pandit", "বিজয়া লক্ষ্মী পণ্ডিত")], 0,
  "Sucheta Kripalani was the first woman Chief Minister in India.", "সুচেতা কৃপালানী ভাৰতৰ প্ৰথম মহিলা মুখ্যমন্ত্ৰী আছিল।")
P("Which country hosted the 2020 Summer Olympics?",
  "Which country will host the 2028 Summer Olympics?", "২০২৮ গ্ৰীষ্মকালীন অলিম্পিক কোন দেশে আয়োজন কৰিব?",
  [("USA", "আমেৰিকা"), ("France", "ফ্ৰান্স"), ("Australia", "অষ্ট্ৰেলিয়া"), ("Japan", "জাপান")], 0,
  "The USA (Los Angeles) will host the 2028 Summer Olympics.", "আমেৰিকা (লছ এঞ্জেলেছ) য়ে ২০২৮ গ্ৰীষ্মকালীন অলিম্পিক আয়োজন কৰিব।")
P("Who founded the Maurya Empire?",
  "Who wrote the ancient treatise 'Arthashastra'?", "প্ৰাচীন 'অৰ্থশাস্ত্ৰ' গ্ৰন্থ কোনে লিখিছিল?",
  [("Chanakya", "চাণক্য"), ("Ashoka", "অশোক"), ("Chandragupta Maurya", "চন্দ্ৰগুপ্ত মৌৰ্য"), ("Kalidasa", "কালিদাস")], 0,
  "Chanakya (Kautilya) wrote the Arthashastra.", "চাণক্যই (কৌটিল্য) অৰ্থশাস্ত্ৰ লিখিছিল।")
P("Which planet is closest to the Sun?",
  "Which planet is the hottest in the solar system?", "সৌৰজগতৰ আটাইতকৈ উষ্ণ গ্ৰহ কোনটো?",
  [("Venus", "শুক্ৰ"), ("Mercury", "বুধ"), ("Mars", "মঙ্গল"), ("Jupiter", "বৃহস্পতি")], 0,
  "Venus is the hottest planet due to its thick atmosphere.", "ঘন বায়ুমণ্ডলৰ বাবে শুক্ৰ আটাইতকৈ উষ্ণ গ্ৰহ।")
P("Which is the largest continent in the world?",
  "Which is the largest country in South America by area?", "মাটিকালিৰ ফালৰপৰা দক্ষিণ আমেৰিকাৰ আটাইতকৈ ডাঙৰ দেশ কোনখন?",
  [("Brazil", "ব্ৰাজিল"), ("Argentina", "আৰ্জেণ্টিনা"), ("Peru", "পেৰু"), ("Chile", "চিলি")], 0,
  "Brazil is the largest country in South America.", "ব্ৰাজিল দক্ষিণ আমেৰিকাৰ আটাইতকৈ ডাঙৰ দেশ।")
P("Who built the Taj Mahal?",
  "Who built the Red Fort in Delhi?", "দিল্লীৰ ৰঙা কিল্লা কোনে নিৰ্মাণ কৰিছিল?",
  [("Shah Jahan", "শাহজাহান"), ("Akbar", "আকবৰ"), ("Aurangzeb", "আওৰাংজেব"), ("Babur", "বাবৰ")], 0,
  "Shah Jahan built the Red Fort in Delhi.", "শাহজাহানে দিল্লীৰ ৰঙা কিল্লা নিৰ্মাণ কৰিছিল।")
P("Which article of the Constitution deals with the Right to Equality?",
  "Which article of the Constitution deals with the Right to Constitutional Remedies?", "সংবিধানৰ কোন অনুচ্ছেদ সাংবিধানিক প্ৰতিকাৰৰ অধিকাৰৰ সৈতে জড়িত?",
  [("Article 32", "অনুচ্ছেদ ৩২"), ("Article 14", "অনুচ্ছেদ ১৪"), ("Article 19", "অনুচ্ছেদ ১৯"), ("Article 21", "অনুচ্ছেদ ২১")], 0,
  "Article 32 provides the Right to Constitutional Remedies.", "অনুচ্ছেদ ৩২ সাংবিধানিক প্ৰতিকাৰৰ অধিকাৰ প্ৰদান কৰে।")
P("Which country is known as the 'Land of the Rising Sun'?",
  "Which country is known as the 'Land of the Midnight Sun'?", "কোন দেশক 'মাজনিশাৰ সূৰ্যৰ দেশ' বুলি জনা যায়?",
  [("Norway", "নৰৱে"), ("Japan", "জাপান"), ("Finland", "ফিনলেণ্ড"), ("Iceland", "আইচলেণ্ড")], 0,
  "Norway is called the Land of the Midnight Sun.", "নৰৱেক মাজনিশাৰ সূৰ্যৰ দেশ বোলা হয়।")
P("Which Indian city is known as the 'Silicon Valley of India'?",
  "Which Indian city is known as the 'Pink City'?", "কোন ভাৰতীয় চহৰক 'গোলাপী চহৰ' বুলি জনা যায়?",
  [("Jaipur", "জয়পুৰ"), ("Jodhpur", "যোধপুৰ"), ("Udaipur", "উদয়পুৰ"), ("Agra", "আগ্ৰা")], 0,
  "Jaipur is called the Pink City.", "জয়পুৰক গোলাপী চহৰ বোলা হয়।")
P("The Reserve Bank of India was established in which year?",
  "The State Bank of India was established in which year?", "ভাৰতীয় ষ্টেট বেংক কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
  [("1955", "১৯৫৫"), ("1935", "১৯৩৫"), ("1947", "১৯৪৭"), ("1969", "১৯৬৯")], 0,
  "The State Bank of India was established in 1955.", "ভাৰতীয় ষ্টেট বেংক ১৯৫৫ চনত প্ৰতিষ্ঠা হৈছিল।")
P("Which is the largest organ of the human body?",
  "Which is the largest gland in the human body?", "মানৱ শৰীৰৰ আটাইতকৈ ডাঙৰ গ্ৰন্থি কোনটো?",
  [("Liver", "যকৃত"), ("Pancreas", "অগ্ন্যাশয়"), ("Thyroid", "থাইৰয়ড"), ("Skin", "ছাল")], 0,
  "The liver is the largest gland in the human body.", "যকৃত মানৱ শৰীৰৰ আটাইতকৈ ডাঙৰ গ্ৰন্থি।")
P("Who was the first woman President of India?",
  "Who was the first woman Speaker of the Lok Sabha?", "লোকসভাৰ প্ৰথম মহিলা অধ্যক্ষ কোন আছিল?",
  [("Meira Kumar", "মীৰা কুমাৰ"), ("Sumitra Mahajan", "সুমিত্ৰা মহাজন"), ("Pratibha Patil", "প্ৰতিভা পাটিল"), ("Sarojini Naidu", "সৰোজিনী নাইডু")], 0,
  "Meira Kumar was the first woman Speaker of the Lok Sabha.", "মীৰা কুমাৰ লোকসভাৰ প্ৰথম মহিলা অধ্যক্ষ আছিল।")
P("Which is the highest civilian award of India?",
  "Which is the highest gallantry award of India?", "ভাৰতৰ সৰ্বোচ্চ বীৰত্ব সন্মান কোনটো?",
  [("Param Vir Chakra", "পৰম বীৰ চক্ৰ"), ("Ashoka Chakra", "অশোক চক্ৰ"), ("Maha Vir Chakra", "মহা বীৰ চক্ৰ"), ("Bharat Ratna", "ভাৰত ৰত্ন")], 0,
  "The Param Vir Chakra is India's highest gallantry award.", "পৰম বীৰ চক্ৰ ভাৰতৰ সৰ্বোচ্চ বীৰত্ব সন্মান।")
P("Which acid is present in lemon?",
  "Which acid is present in vinegar?", "ভিনিগাৰত কোন এচিড থাকে?",
  [("Acetic acid", "এচেটিক এচিড"), ("Citric acid", "চিট্ৰিক এচিড"), ("Lactic acid", "লেক্টিক এচিড"), ("Sulphuric acid", "ছালফিউৰিক এচিড")], 0,
  "Vinegar contains acetic acid.", "ভিনিগাৰত এচেটিক এচিড থাকে।")
P("Which is the largest desert in the world?",
  "Which is the largest cold desert in the world?", "বিশ্বৰ আটাইতকৈ ডাঙৰ শীতল মৰুভূমি কোনটো?",
  [("Antarctic Desert", "এণ্টাৰ্কটিক মৰুভূমি"), ("Sahara", "চাহাৰা"), ("Gobi", "গোবি"), ("Thar", "থৰ")], 0,
  "Antarctica is the largest cold desert in the world.", "এণ্টাৰ্কটিকা বিশ্বৰ আটাইতকৈ ডাঙৰ শীতল মৰুভূমি।")
P("Who wrote the national song 'Vande Mataram'?",
  "Who wrote the Indian national anthem 'Jana Gana Mana'?", "ভাৰতৰ ৰাষ্ট্ৰীয় সংগীত 'জন গণ মন' কোনে লিখিছিল?",
  [("Rabindranath Tagore", "ৰবীন্দ্ৰনাথ ঠাকুৰ"), ("Bankim Chandra Chatterjee", "বঙ্কিম চন্দ্ৰ চট্টোপাধ্যায়"), ("Sarojini Naidu", "সৰোজিনী নাইডু"), ("Premchand", "প্ৰেমচন্দ")], 0,
  "Rabindranath Tagore wrote 'Jana Gana Mana'.", "ৰবীন্দ্ৰনাথ ঠাকুৰে 'জন গণ মন' লিখিছিল।")
P("Which day is celebrated as International Yoga Day?",
  "Which day is celebrated as World Population Day?", "বিশ্ব জনসংখ্যা দিৱস কোন তাৰিখে পালন কৰা হয়?",
  [("11 July", "১১ জুলাই"), ("21 June", "২১ জুন"), ("5 June", "৫ জুন"), ("1 May", "১ মে")], 0,
  "World Population Day is observed on 11 July.", "বিশ্ব জনসংখ্যা দিৱস ১১ জুলাই তাৰিখে পালন কৰা হয়।")
P("The Non-Cooperation Movement was launched by Gandhi in which year?",
  "The Dandi March took place in which year?", "ডাণ্ডি যাত্ৰা কোন বছৰত হৈছিল?",
  [("1930", "১৯৩০"), ("1920", "১৯২০"), ("1942", "১৯৪২"), ("1919", "১৯১৯")], 0,
  "The Dandi March took place in 1930.", "ডাণ্ডি যাত্ৰা ১৯৩০ চনত হৈছিল।")
P("Who was the last Viceroy of India?",
  "Who was the first Viceroy of India?", "ভাৰতৰ প্ৰথম ভাইচৰয় কোন আছিল?",
  [("Lord Canning", "লৰ্ড কেনিং"), ("Lord Mountbatten", "লৰ্ড মাউণ্টবেটেন"), ("Lord Curzon", "লৰ্ড কাৰ্জন"), ("Lord Dalhousie", "লৰ্ড ডেলহাউচি")], 0,
  "Lord Canning was the first Viceroy of India.", "লৰ্ড কেনিং ভাৰতৰ প্ৰথম ভাইচৰয় আছিল।")
P("Which is the longest river in the world?",
  "Which is the largest river by volume of water in the world?", "পানীৰ পৰিমাণৰ ফালৰপৰা বিশ্বৰ আটাইতকৈ ডাঙৰ নদী কোনটো?",
  [("Amazon", "আমাজন"), ("Nile", "নীল"), ("Yangtze", "য়াংচি"), ("Mississippi", "মিছিছিপি")], 0,
  "The Amazon carries the largest volume of water.", "আমাজনে আটাইতকৈ বেছি পানী কঢ়িয়াই নিয়ে।")
P("Who appoints the Chief Justice of India?",
  "Who administers the oath of office to the President of India?", "ভাৰতৰ ৰাষ্ট্ৰপতিক শপত কোনে গ্ৰহণ কৰায়?",
  [("The Chief Justice of India", "ভাৰতৰ প্ৰধান ন্যায়াধীশে"), ("The Prime Minister", "প্ৰধানমন্ত্ৰীয়ে"), ("The Vice-President", "উপ-ৰাষ্ট্ৰপতিয়ে"), ("The Speaker", "অধ্যক্ষই")], 0,
  "The Chief Justice of India administers the President's oath.", "ভাৰতৰ প্ৰধান ন্যায়াধীশে ৰাষ্ট্ৰপতিক শপত গ্ৰহণ কৰায়।")
P("Which country gifted the Statue of Liberty to the USA?",
  "The Eiffel Tower is located in which country?", "আইফেল টাৱাৰ কোন দেশত অৱস্থিত?",
  [("France", "ফ্ৰান্স"), ("Italy", "ইটালী"), ("Germany", "জাৰ্মানী"), ("Spain", "স্পেইন")], 0,
  "The Eiffel Tower is in France.", "আইফেল টাৱাৰ ফ্ৰান্সত অৱস্থিত।")
P("The Right to Education was added as a fundamental right by which amendment?",
  "Which amendment is known as the 'Mini-Constitution' of India?", "ভাৰতৰ কোন সংশোধনীক 'ক্ষুদ্ৰ সংবিধান' বুলি জনা যায়?",
  [("42nd Amendment", "৪২তম সংশোধনী"), ("44th Amendment", "৪৪তম সংশোধনী"), ("73rd Amendment", "৭৩তম সংশোধনী"), ("86th Amendment", "৮৬তম সংশোধনী")], 0,
  "The 42nd Amendment (1976) is called the Mini-Constitution.", "৪২তম সংশোধনী (১৯৭৬) ক ক্ষুদ্ৰ সংবিধান বোলা হয়।")
P("How many players are there in a football team on the field?",
  "How many players are there in a hockey team on the field?", "মাঠত এটা হকী দলত কিমানজন খেলুৱৈ থাকে?",
  [("11", "১১"), ("10", "১০"), ("12", "১২"), ("9", "৯")], 0,
  "A hockey team has 11 players on the field.", "হকী দলত মাঠত ১১ জন খেলুৱৈ থাকে।")
P("How many players are there in a cricket team?",
  "How many players are there in a water polo team?", "এটা ৱাটাৰ প'ল' দলত কিমানজন খেলুৱৈ থাকে?",
  [("7", "৭"), ("6", "৬"), ("11", "১১"), ("5", "৫")], 0,
  "A water polo team has 7 players.", "ৱাটাৰ প'ল' দলত ৭ জন খেলুৱৈ থাকে।")
P("The Olympic Games are held once in how many years?",
  "The FIFA World Cup is held once in how many years?", "ফিফা বিশ্বকাপ কিমান বছৰৰ মূৰে মূৰে অনুষ্ঠিত হয়?",
  [("4", "৪"), ("2", "২"), ("3", "৩"), ("5", "৫")], 0,
  "The FIFA World Cup is held every four years.", "ফিফা বিশ্বকাপ প্ৰতি চাৰি বছৰৰ মূৰে অনুষ্ঠিত হয়।")
P("Who is known as the 'Missile Man of India'?",
  "Who is known as the 'Father of the Indian Space Programme'?", "ভাৰতীয় মহাকাশ কাৰ্যসূচীৰ 'পিতৃ' কাক জনা যায়?",
  [("Vikram Sarabhai", "বিক্ৰম সাৰাভাই"), ("Homi Bhabha", "হোমি ভাবা"), ("A. P. J. Abdul Kalam", "এ. পি. জে. আব্দুল কালাম"), ("C. V. Raman", "চি. ভি. ৰামন")], 0,
  "Vikram Sarabhai is called the Father of the Indian Space Programme.", "বিক্ৰম সাৰাভাইক ভাৰতীয় মহাকাশ কাৰ্যসূচীৰ পিতৃ বোলা হয়।")
P("The Ranji Trophy is associated with which sport?",
  "The Santosh Trophy is associated with which sport?", "সন্তোষ ট্ৰফী কোন ক্ৰীড়াৰ সৈতে জড়িত?",
  [("Football", "ফুটবল"), ("Cricket", "ক্ৰিকেট"), ("Hockey", "হকী"), ("Badminton", "বেডমিণ্টন")], 0,
  "The Santosh Trophy is a domestic football tournament.", "সন্তোষ ট্ৰফী এখন ঘৰুৱা ফুটবল প্ৰতিযোগিতা।")
P("How many rings are there in the Olympic symbol?",
  "What is the motto of the Olympic Games?", "অলিম্পিক ক্ৰীড়াৰ motto কি?",
  [("Faster, Higher, Stronger", "Faster, Higher, Stronger"), ("Play and Win", "Play and Win"), ("Unity in Sport", "Unity in Sport"), ("Peace and Power", "Peace and Power")], 0,
  "The Olympic motto is 'Faster, Higher, Stronger'.", "অলিম্পিক motto হ'ল 'Faster, Higher, Stronger'।")
P("Which country has won the most FIFA World Cups?",
  "Which country has won the most Cricket World Cups?", "সৰ্বাধিক ক্ৰিকেট বিশ্বকাপ কোন দেশে জিকিছে?",
  [("Australia", "অষ্ট্ৰেলিয়া"), ("India", "ভাৰত"), ("West Indies", "ৱেষ্ট ইণ্ডিজ"), ("England", "ইংলেণ্ড")], 0,
  "Australia has won the most Cricket World Cups.", "অষ্ট্ৰেলিয়াই সৰ্বাধিক ক্ৰিকেট বিশ্বকাপ জিকিছে।")
P("In which sport is the Davis Cup played?",
  "In which sport is the Thomas Cup played?", "থমাছ কাপ কোন ক্ৰীড়াত খেলা হয়?",
  [("Badminton", "বেডমিণ্টন"), ("Tennis", "টেনিছ"), ("Table tennis", "টেবুল টেনিছ"), ("Squash", "স্কোৱাছ")], 0,
  "The Thomas Cup is a men's badminton team event.", "থমাছ কাপ পুৰুষৰ বেডমিণ্টন দলীয় ইভেণ্ট।")
P("Independence Day of India is celebrated on —",
  "On which date did India adopt its Constitution?", "ভাৰতে কোন তাৰিখে সংবিধান গ্ৰহণ কৰিছিল?",
  [("26 November 1949", "২৬ নৱেম্বৰ ১৯৪৯"), ("26 January 1950", "২৬ জানুৱাৰী ১৯৫০"), ("15 August 1947", "১৫ আগষ্ট ১৯৪৭"), ("2 October 1950", "২ অক্টোবৰ ১৯৫০")], 0,
  "India adopted its Constitution on 26 November 1949.", "ভাৰতে ২৬ নৱেম্বৰ ১৯৪৯ তাৰিখে সংবিধান গ্ৰহণ কৰিছিল।")
P("World Water Day is observed on which date?",
  "World Ozone Day is observed on which date?", "বিশ্ব অ'জন দিৱস কোন তাৰিখে পালন কৰা হয়?",
  [("16 September", "১৬ ছেপ্তেম্বৰ"), ("22 March", "২২ মাৰ্চ"), ("5 June", "৫ জুন"), ("1 December", "১ ডিচেম্বৰ")], 0,
  "World Ozone Day is observed on 16 September.", "বিশ্ব অ'জন দিৱস ১৬ ছেপ্তেম্বৰ তাৰিখে পালন কৰা হয়।")
P("International Women's Day is observed on —",
  "International Labour Day is observed on —", "আন্তৰ্জাতিক শ্ৰমিক দিৱস কেতিয়া পালন কৰা হয় —",
  [("1 May", "১ মে"), ("8 March", "৮ মাৰ্চ"), ("5 June", "৫ জুন"), ("21 June", "২১ জুন")], 0,
  "International Labour Day is observed on 1 May.", "আন্তৰ্জাতিক শ্ৰমিক দিৱস ১ মে তাৰিখে পালন কৰা হয়।")
P("World Teachers' Day is observed on —",
  "National Education Day in India is observed on —", "ভাৰতত ৰাষ্ট্ৰীয় শিক্ষা দিৱস কেতিয়া পালন কৰা হয় —",
  [("11 November", "১১ নৱেম্বৰ"), ("5 October", "৫ অক্টোবৰ"), ("5 September", "৫ ছেপ্তেম্বৰ"), ("15 January", "১৫ জানুৱাৰী")], 0,
  "National Education Day is observed on 11 November.", "ৰাষ্ট্ৰীয় শিক্ষা দিৱস ১১ নৱেম্বৰ তাৰিখে পালন কৰা হয়।")
P("Children's Day in India is celebrated on —",
  "National Youth Day in India is celebrated on —", "ভাৰতত ৰাষ্ট্ৰীয় যুৱ দিৱস কেতিয়া পালন কৰা হয় —",
  [("12 January", "১২ জানুৱাৰী"), ("14 November", "১৪ নৱেম্বৰ"), ("2 October", "২ অক্টোবৰ"), ("15 August", "১৫ আগষ্ট")], 0,
  "National Youth Day is celebrated on 12 January.", "ৰাষ্ট্ৰীয় যুৱ দিৱস ১২ জানুৱাৰী তাৰিখে পালন কৰা হয়।")
P("World AIDS Day is observed on —",
  "World Cancer Day is observed on —", "বিশ্ব কৰ্কট ৰোগ দিৱস কেতিয়া পালন কৰা হয় —",
  [("4 February", "৪ ফেব্ৰুৱাৰী"), ("1 December", "১ ডিচেম্বৰ"), ("7 April", "৭ এপ্ৰিল"), ("5 June", "৫ জুন")], 0,
  "World Cancer Day is observed on 4 February.", "বিশ্ব কৰ্কট ৰোগ দিৱস ৪ ফেব্ৰুৱাৰী তাৰিখে পালন কৰা হয়।")
P("Gandhi Jayanti is celebrated on —",
  "National Sports Day in India is observed on —", "ভাৰতত ৰাষ্ট্ৰীয় ক্ৰীড়া দিৱস কেতিয়া পালন কৰা হয় —",
  [("29 August", "২৯ আগষ্ট"), ("2 October", "২ অক্টোবৰ"), ("14 November", "১৪ নৱেম্বৰ"), ("15 January", "১৫ জানুৱাৰী")], 0,
  "National Sports Day is observed on 29 August, Dhyan Chand's birthday.", "ৰাষ্ট্ৰীয় ক্ৰীড়া দিৱস ২৯ আগষ্ট, ধ্যানচাঁদৰ জন্মদিনত পালন কৰা হয়।")
P("World Tourism Day is observed on —",
  "World Heritage Day is observed on —", "বিশ্ব ঐতিহ্য দিৱস কেতিয়া পালন কৰা হয় —",
  [("18 April", "১৮ এপ্ৰিল"), ("27 September", "২৭ ছেপ্তেম্বৰ"), ("5 June", "৫ জুন"), ("21 June", "২১ জুন")], 0,
  "World Heritage Day is observed on 18 April.", "বিশ্ব ঐতিহ্য দিৱস ১৮ এপ্ৰিল তাৰিখে পালন কৰা হয়।")
