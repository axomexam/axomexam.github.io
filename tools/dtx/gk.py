"""Section: General Knowledge & Current Affairs - 60 fresh bilingual questions."""
from .common import R


def rows():
    r = []
    A = r.append

    # ---- Indian polity ----
    A(R("Who is known as the Father of the Indian Constitution?",
        "ভাৰতৰ সংবিধানৰ জনক কাক জনা যায়?",
        [("Dr. B. R. Ambedkar", "ড° বি. আৰ. আম্বেদকাৰ"), ("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"), ("Mahatma Gandhi", "মহাত্মা গান্ধী"), ("Sardar Patel", "সৰ্দাৰ পেটেল")], 0,
        "Dr. B. R. Ambedkar chaired the Drafting Committee of the Constitution.",
        "ড° বি. আৰ. আম্বেদকাৰে সংবিধানৰ খচৰা সমিতিৰ অধ্যক্ষতা কৰিছিল।"))
    A(R("How many members can the President of India nominate to the Rajya Sabha?",
        "ভাৰতৰ ৰাষ্ট্ৰপতিয়ে ৰাজ্যসভালৈ কিমানজন সদস্য মনোনীত কৰিব পাৰে?",
        [("12", "১২"), ("2", "২"), ("10", "১০"), ("15", "১৫")], 0,
        "The President nominates 12 members to the Rajya Sabha.",
        "ৰাষ্ট্ৰপতিয়ে ৰাজ্যসভালৈ ১২ জন সদস্য মনোনীত কৰে।"))
    A(R("What is the maximum strength of the Lok Sabha?",
        "লোকসভাৰ সৰ্বাধিক সদস্য সংখ্যা কিমান?",
        [("552", "৫৫২"), ("545", "৫৪৫"), ("500", "৫০০"), ("600", "৬০০")], 0,
        "The maximum strength of the Lok Sabha is 552.",
        "লোকসভাৰ সৰ্বাধিক সদস্য সংখ্যা ৫৫২।"))
    A(R("Who is the constitutional head of the Indian State?",
        "ভাৰত ৰাজ্যৰ সাংবিধানিক মুৰব্বী কোন?",
        [("President", "ৰাষ্ট্ৰপতি"), ("Prime Minister", "প্ৰধানমন্ত্ৰী"), ("Chief Justice", "প্ৰধান বিচাৰপতি"), ("Speaker", "অধ্যক্ষ")], 0,
        "The President is the constitutional head of the Indian State.",
        "ৰাষ্ট্ৰপতি ভাৰত ৰাজ্যৰ সাংবিধানিক মুৰব্বী।"))
    A(R("The Right to Education is a fundamental right under which article?",
        "শিক্ষাৰ অধিকাৰ কোন অনুচ্ছেদৰ অধীনত মৌলিক অধিকাৰ?",
        [("Article 21A", "অনুচ্ছেদ ২১A"), ("Article 19", "অনুচ্ছেদ ১৯"), ("Article 14", "অনুচ্ছেদ ১৪"), ("Article 32", "অনুচ্ছেদ ৩২")], 0,
        "The Right to Education is guaranteed under Article 21A.",
        "শিক্ষাৰ অধিকাৰ অনুচ্ছেদ ২১A ৰ অধীনত নিশ্চিত।"))
    A(R("Who appoints the Chief Justice of India?",
        "ভাৰতৰ প্ৰধান বিচাৰপতীক কোনে নিয়োগ কৰে?",
        [("President", "ৰাষ্ট্ৰপতি"), ("Prime Minister", "প্ৰধানমন্ত্ৰী"), ("Parliament", "সংসদ"), ("Law Minister", "আইন মন্ত্ৰী")], 0,
        "The President appoints the Chief Justice of India.",
        "ৰাষ্ট্ৰপতিয়ে ভাৰতৰ প্ৰধান বিচাৰপতীক নিয়োগ কৰে।"))
    A(R("The Preamble of the Indian Constitution declares India to be a?",
        "ভাৰতৰ সংবিধানৰ প্ৰস্তাৱনাই ভাৰতক কি ৰূপে ঘোষণা কৰে?",
        [("Sovereign Socialist Secular Democratic Republic", "সাৰ্বভৌম সমাজবাদী ধৰ্মনিৰপেক্ষ গণৰাজ্য"), ("Monarchy", "ৰাজতন্ত্ৰ"), ("Federation", "সংঘ"), ("Dictatorship", "একনায়কত্ব")], 0,
        "The Preamble declares India a Sovereign Socialist Secular Democratic Republic.",
        "প্ৰস্তাৱনাই ভাৰতক সাৰ্বভৌম সমাজবাদী ধৰ্মনিৰপেক্ষ গণৰাজ্য ঘোষণা কৰে।"))
    A(R("Which schedule of the Constitution deals with the languages?",
        "সংবিধানৰ কোন তালিকাই ভাষাৰ বিষয়ে উল্লেখ কৰে?",
        [("Eighth Schedule", "অষ্টম তালিকা"), ("Seventh Schedule", "সপ্তম তালিকা"), ("Ninth Schedule", "নৱম তালিকা"), ("Sixth Schedule", "ষষ্ঠ তালিকা")], 0,
        "The Eighth Schedule lists the recognised languages of India.",
        "অষ্টম তালিকাত ভাৰতৰ স্বীকৃত ভাষাসমূহ তালিকাভুক্ত।"))

    # ---- Assam GK ----
    A(R("Who was the first Chief Minister of Assam?",
        "অসমৰ প্ৰথম মুখ্যমন্ত্ৰী কোন আছিল?",
        [("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), ("Bishnuram Medhi", "বিষ্ণুৰাম মেধি"), ("Bimala Prasad Chaliha", "বিমলা প্ৰসাদ চলিহা"), ("Sarat Chandra Sinha", "সৰৎ চন্দ্ৰ সিংহ")], 0,
        "Gopinath Bordoloi was the first Chief Minister of Assam.",
        "গোপীনাথ বৰদলৈ অসমৰ প্ৰথম মুখ্যমন্ত্ৰী আছিল।"))
    A(R("Which is the largest city of Assam?",
        "অসমৰ আটাইতকৈ ডাঙৰ নগৰ কোনটো?",
        [("Guwahati", "গুৱাহাটী"), ("Dibrugarh", "ডিব্ৰুগড়"), ("Silchar", "শিলচৰ"), ("Jorhat", "যোৰহাট")], 0,
        "Guwahati is the largest city of Assam.",
        "গুৱাহাটী অসমৰ আটাইতকৈ ডাঙৰ নগৰ।"))
    A(R("The Assamese New Year Bihu is celebrated in which month?",
        "অসমীয়া নৱবৰ্ষ বিহু কোন মাহত পালন কৰা হয়?",
        [("April", "এপ্ৰিল"), ("January", "জানুৱাৰী"), ("October", "অক্টোবৰ"), ("July", "জুলাই")], 0,
        "Bohag Bihu, the Assamese New Year, is celebrated in April.",
        "অসমীয়া নৱবৰ্ষ ব'হাগ বিহু এপ্ৰিল মাহত পালন কৰা হয়।"))
    A(R("Which river is known as the lifeline of Assam?",
        "কোন নদীক অসমৰ জীৱনৰেখা বোলা হয়?",
        [("Brahmaputra", "ব্ৰহ্মপুত্ৰ"), ("Ganga", "গংগা"), ("Barak", "বৰাক"), ("Subansiri", "সুৱনশিৰি")], 0,
        "The Brahmaputra is known as the lifeline of Assam.",
        "ব্ৰহ্মপুত্ৰ নদীক অসমৰ জীৱনৰেখা বোলা হয়।"))
    A(R("Which is the state bird of Assam?",
        "অসমৰ ৰাজ্যিক চৰাই কি?",
        [("White-winged wood duck", "দেওহাঁহ"), ("Peacock", "ময়ূৰ"), ("Parrot", "ভাটৌ"), ("Dove", "পাৰ")], 0,
        "The white-winged wood duck is the state bird of Assam.",
        "দেওহাঁহ অসমৰ ৰাজ্যিক চৰাই।"))
    A(R("The Ahom kingdom was founded by?",
        "আহোম ৰাজ্য কোনে প্ৰতিষ্ঠা কৰিছিল?",
        [("Sukapha", "চুকাফা"), ("Rudra Singha", "ৰুদ্ৰ সিংহ"), ("Shivaji", "শিৱাজী"), ("Naranarayan", "নাৰায়ণ")], 0,
        "The Ahom kingdom was founded by Sukapha in 1228.",
        "চুকাফাই ১২২৮ চনত আহোম ৰাজ্য প্ৰতিষ্ঠা কৰিছিল।"))
    A(R("Which is the largest river island in the world, located in Assam?",
        "অসমত অৱস্থিত বিশ্বৰ আটাইতকৈ ডাঙৰ নদী-দ্বীপ কোনটো?",
        [("Majuli", "মাজুলী"), ("Umananda", "উমানন্দ"), ("Peacock Island", "পিকক আইলেণ্ড"), ("Dibru", "ডিব্ৰু")], 0,
        "Majuli in Assam is the largest river island in the world.",
        "অসমৰ মাজুলী বিশ্বৰ আটাইতকৈ ডাঙৰ নদী-দ্বীপ।"))
    A(R("Which Assamese festival is celebrated as the harvest festival?",
        "কোন অসমীয়া উৎসৱক শস্য-চপোৱা উৎসৱ ৰূপে পালন কৰা হয়?",
        [("Magh Bihu", "মাঘ বিহু"), ("Bohag Bihu", "ব'হাগ বিহু"), ("Kati Bihu", "কাতি বিহু"), ("Ali-Ai-Ligang", "আলি-আই-লৃগাং")], 0,
        "Magh Bihu is the harvest festival of Assam.",
        "মাঘ বিহু অসমৰ শস্য-চপোৱা উৎসৱ।"))

    # ---- Indian geography ----
    A(R("Which is the longest river in India?",
        "ভাৰতৰ আটাইতকৈ দীঘল নদী কোনটো?",
        [("Ganga", "গংগা"), ("Brahmaputra", "ব্ৰহ্মপুত্ৰ"), ("Godavari", "গোদাবৰী"), ("Yamuna", "যমুনা")], 0,
        "The Ganga is the longest river in India.",
        "গংগা ভাৰতৰ আটাইতকৈ দীঘল নদী।"))
    A(R("Which is the highest mountain peak in India?",
        "ভাৰতৰ আটাইতকৈ উচ্চ পৰ্বত শিখৰ কোনটো?",
        [("Kangchenjunga", "কাঞ্চনজঙ্ঘা"), ("K2", "কে-২"), ("Nanda Devi", "নন্দা দেৱী"), ("Anamudi", "আনামুদি")], 0,
        "Kangchenjunga is the highest peak located in India.",
        "কাঞ্চনজঙ্ঘা ভাৰতত অৱস্থিত আটাইতকৈ উচ্চ শিখৰ।"))
    A(R("Which is the largest state of India by area?",
        "কালিৰ ফালৰ পৰা ভাৰতৰ আটাইতকৈ ডাঙৰ ৰাজ্য কোনটো?",
        [("Rajasthan", "ৰাজস্থান"), ("Madhya Pradesh", "মধ্য প্ৰদেশ"), ("Maharashtra", "মহাৰাষ্ট্ৰ"), ("Uttar Pradesh", "উত্তৰ প্ৰদেশ")], 0,
        "Rajasthan is the largest state of India by area.",
        "কালিৰ ফালৰ পৰা ৰাজস্থান ভাৰতৰ আটাইতকৈ ডাঙৰ ৰাজ্য।"))
    A(R("The Tropic of Cancer passes through how many Indian states?",
        "কৰ্কট ক্ৰান্তি ৰেখা ভাৰতৰ কিমানখন ৰাজ্যৰ মাজেৰে যায়?",
        [("8", "৮"), ("6", "৬"), ("10", "১০"), ("12", "১২")], 0,
        "The Tropic of Cancer passes through 8 Indian states.",
        "কৰ্কট ক্ৰান্তি ৰেখা ভাৰতৰ ৮ খন ৰাজ্যৰ মাজেৰে যায়।"))
    A(R("Which is the smallest state of India by area?",
        "কালিৰ ফালৰ পৰা ভাৰতৰ আটাইতকৈ সৰু ৰাজ্য কোনটো?",
        [("Goa", "গোৱা"), ("Sikkim", "ছিক্কিম"), ("Tripura", "ত্ৰিপুৰা"), ("Manipur", "মণিপুৰ")], 0,
        "Goa is the smallest state of India by area.",
        "কালিৰ ফালৰ পৰা গোৱা ভাৰতৰ আটাইতকৈ সৰু ৰাজ্য।"))

    # ---- Science & technology GK ----
    A(R("Which planet is known as the Red Planet?",
        "কোন গ্ৰহক ৰঙা গ্ৰহ বোলা হয়?",
        [("Mars", "মংগল"), ("Venus", "শুক্ৰ"), ("Jupiter", "বৃহস্পতি"), ("Mercury", "বুধ")], 0,
        "Mars appears red due to iron oxide on its surface.",
        "পৃষ্ঠত লো-অক্সাইডৰ বাবে মংগল গ্ৰহ ৰঙা দেখা যায়।"))
    A(R("Which is the largest planet in the solar system?",
        "সৌৰজগতৰ আটাইতকৈ ডাঙৰ গ্ৰহ কোনটো?",
        [("Jupiter", "বৃহস্পতি"), ("Saturn", "শনি"), ("Neptune", "নেপচুন"), ("Earth", "পৃথিৱী")], 0,
        "Jupiter is the largest planet in the solar system.",
        "বৃহস্পতি সৌৰজগতৰ আটাইতকৈ ডাঙৰ গ্ৰহ।"))
    A(R("Which is the closest planet to the Sun?",
        "সূৰ্যৰ আটাইতকৈ ওচৰৰ গ্ৰহ কোনটো?",
        [("Mercury", "বুধ"), ("Venus", "শুক্ৰ"), ("Earth", "পৃথিৱী"), ("Mars", "মংগল")], 0,
        "Mercury is the closest planet to the Sun.",
        "বুধ সূৰ্যৰ আটাইতকৈ ওচৰৰ গ্ৰহ।"))
    A(R("India's first Prime Minister was?",
        "ভাৰতৰ প্ৰথম প্ৰধানমন্ত্ৰী কোন আছিল?",
        [("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"), ("Lal Bahadur Shastri", "লাল বাহাদুৰ শাস্ত্ৰী"), ("Sardar Patel", "সৰ্দাৰ পেটেল"), ("Rajendra Prasad", "ৰাজেন্দ্ৰ প্ৰসাদ")], 0,
        "Jawaharlal Nehru was India's first Prime Minister.",
        "জৱাহৰলাল নেহৰু ভাৰতৰ প্ৰথম প্ৰধানমন্ত্ৰী আছিল।"))

    # ---- Awards, sports & organisations ----
    A(R("The highest civilian award of India is?",
        "ভাৰতৰ সৰ্বোচ্চ অসামৰিক সন্মান কি?",
        [("Bharat Ratna", "ভাৰত ৰত্ন"), ("Padma Vibhushan", "পদ্ম বিভূষণ"), ("Padma Bhushan", "পদ্ম ভূষণ"), ("Padma Shri", "পদ্ম শ্ৰী")], 0,
        "The Bharat Ratna is the highest civilian award of India.",
        "ভাৰত ৰত্ন ভাৰতৰ সৰ্বোচ্চ অসামৰিক সন্মান।"))
    A(R("Which is the highest gallantry award of India?",
        "ভাৰতৰ সৰ্বোচ্চ বীৰত্ব সন্মান কি?",
        [("Param Vir Chakra", "পৰম বীৰ চক্ৰ"), ("Ashoka Chakra", "অশোক চক্ৰ"), ("Vir Chakra", "বীৰ চক্ৰ"), ("Shaurya Chakra", "শৌৰ্য চক্ৰ")], 0,
        "The Param Vir Chakra is India's highest military gallantry award.",
        "পৰম বীৰ চক্ৰ ভাৰতৰ সৰ্বোচ্চ সামৰিক বীৰত্ব সন্মান।"))
    A(R("The headquarters of the United Nations is located in?",
        "ৰাষ্ট্ৰসংঘৰ মুখ্য কাৰ্যালয় ক'ত অৱস্থিত?",
        [("New York", "নিউয়ৰ্ক"), ("Geneva", "জেনেভা"), ("Paris", "পেৰিছ"), ("London", "লণ্ডন")], 0,
        "The UN headquarters is in New York.",
        "ৰাষ্ট্ৰসংঘৰ মুখ্য কাৰ্যালয় নিউয়ৰ্কত অৱস্থিত।"))
    A(R("How many players are there in a cricket team on the field?",
        "খেলপথাৰত এটা ক্ৰিকেট দলত কিমানজন খেলুৱৈ থাকে?",
        [("11", "১১"), ("10", "১০"), ("9", "৯"), ("12", "১২")], 0,
        "A cricket team has 11 players on the field.",
        "এটা ক্ৰিকেট দলত খেলপথাৰত ১১ জন খেলুৱৈ থাকে।"))
    A(R("How many players are there in a football team on the field?",
        "খেলপথাৰত এটা ফুটবল দলত কিমানজন খেলুৱৈ থাকে?",
        [("11", "১১"), ("12", "১২"), ("9", "৯"), ("7", "৭")], 0,
        "A football team has 11 players on the field.",
        "এটা ফুটবল দলত খেলপথাৰত ১১ জন খেলুৱৈ থাকে।"))
    A(R("The Olympic Games are held once in every?",
        "অলিম্পিক ক্ৰীড়া কিমান বছৰৰ মূৰে মূৰে অনুষ্ঠিত হয়?",
        [("4 years", "৪ বছৰ"), ("2 years", "২ বছৰ"), ("3 years", "৩ বছৰ"), ("5 years", "৫ বছৰ")], 0,
        "The Summer Olympics are held every four years.",
        "গ্ৰীষ্মকালীন অলিম্পিক প্ৰতি চাৰি বছৰৰ মূৰে মূৰে অনুষ্ঠিত হয়।"))

    # ---- Current affairs & economy ----
    A(R("Which is the currency of India?",
        "ভাৰতৰ মুদ্ৰা কি?",
        [("Rupee", "ৰূপী"), ("Dollar", "ডলাৰ"), ("Taka", "টকা"), ("Yen", "য়েন")], 0,
        "The Indian rupee is the currency of India.",
        "ভাৰতীয় ৰূপী ভাৰতৰ মুদ্ৰা।"))
    A(R("Which organisation is responsible for monetary policy in India?",
        "ভাৰতত মুদ্ৰা নীতিৰ বাবে কোন অনুষ্ঠান দায়ী?",
        [("Reserve Bank of India", "ভাৰতীয় ৰিজাৰ্ভ বেংক"), ("State Bank of India", "ভাৰতীয় ষ্টেট বেংক"), ("NABARD", "নাবাৰ্ড"), ("SEBI", "ছেবি")], 0,
        "The Reserve Bank of India formulates monetary policy.",
        "ভাৰতীয় ৰিজাৰ্ভ বেংকে মুদ্ৰা নীতি প্ৰণয়ন কৰে।"))
    A(R("GST in India stands for?",
        "ভাৰতত GST ৰ পূৰ্ণ ৰূপ কি?",
        [("Goods and Services Tax", "সামগ্ৰী আৰু সেৱা কৰ"), ("General Sales Tax", "সাধাৰণ বিক্ৰয় কৰ"), ("Gross Service Tax", "মুঠ সেৱা কৰ"), ("Government Service Tax", "চৰকাৰী সেৱা কৰ")], 0,
        "GST stands for Goods and Services Tax.",
        "GST ৰ অৰ্থ হৈছে সামগ্ৰী আৰু সেৱা কৰ।"))
    A(R("The capital of India is?",
        "ভাৰতৰ ৰাজধানী কি?",
        [("New Delhi", "নতুন দিল্লী"), ("Mumbai", "মুম্বাই"), ("Kolkata", "কলিকতা"), ("Chennai", "চেন্নাই")], 0,
        "New Delhi is the capital of India.",
        "নতুন দিল্লী ভাৰতৰ ৰাজধানী।"))
    A(R("Which day is celebrated as India's Independence Day?",
        "কোন দিনটো ভাৰতৰ স্বাধীনতা দিৱস ৰূপে পালন কৰা হয়?",
        [("15 August", "১৫ আগষ্ট"), ("26 January", "২৬ জানুৱাৰী"), ("2 October", "২ অক্টোবৰ"), ("14 November", "১৪ নৱেম্বৰ")], 0,
        "India celebrates Independence Day on 15 August.",
        "ভাৰতে ১৫ আগষ্টত স্বাধীনতা দিৱস পালন কৰে।"))
    A(R("Which day is celebrated as India's Republic Day?",
        "কোন দিনটো ভাৰতৰ গণৰাজ্য দিৱস ৰূপে পালন কৰা হয়?",
        [("26 January", "২৬ জানুৱাৰী"), ("15 August", "১৫ আগষ্ট"), ("2 October", "২ অক্টোবৰ"), ("1 May", "১ মে")], 0,
        "India celebrates Republic Day on 26 January.",
        "ভাৰতে ২৬ জানুৱাৰীত গণৰাজ্য দিৱস পালন কৰে।"))
    A(R("Gandhi Jayanti is celebrated on which date?",
        "গান্ধী জয়ন্তী কোন তাৰিখে পালন কৰা হয়?",
        [("2 October", "২ অক্টোবৰ"), ("14 November", "১৪ নৱেম্বৰ"), ("26 January", "২৬ জানুৱাৰী"), ("5 September", "৫ ছেপ্তেম্বৰ")], 0,
        "Gandhi Jayanti is celebrated on 2 October.",
        "গান্ধী জয়ন্তী ২ অক্টোবৰত পালন কৰা হয়।"))
    A(R("Teachers' Day in India is celebrated on which date?",
        "ভাৰতত শিক্ষক দিৱস কোন তাৰিখে পালন কৰা হয়?",
        [("5 September", "৫ ছেপ্তেম্বৰ"), ("2 October", "২ অক্টোবৰ"), ("14 November", "১৪ নৱেম্বৰ"), ("1 May", "১ মে")], 0,
        "Teachers' Day is celebrated on 5 September, the birthday of Dr. Radhakrishnan.",
        "শিক্ষক দিৱস ৫ ছেপ্তেম্বৰত, ড° ৰাধাকৃষ্ণনৰ জন্মদিনত পালন কৰা হয়।"))
    A(R("Children's Day in India is celebrated on which date?",
        "ভাৰতত শিশু দিৱস কোন তাৰিখে পালন কৰা হয়?",
        [("14 November", "১৪ নৱেম্বৰ"), ("5 September", "৫ ছেপ্তেম্বৰ"), ("2 October", "২ অক্টোবৰ"), ("15 August", "১৫ আগষ্ট")], 0,
        "Children's Day is celebrated on 14 November, Nehru's birthday.",
        "শিশু দিৱস ১৪ নৱেম্বৰত, নেহৰুৰ জন্মদিনত পালন কৰা হয়।"))

    # ---- Environment & misc GK ----
    A(R("World Water Day is observed on which date?",
        "বিশ্ব জল দিৱস কোন তাৰিখে পালন কৰা হয়?",
        [("22 March", "২২ মাৰ্চ"), ("5 June", "৫ জুন"), ("16 September", "১৬ ছেপ্তেম্বৰ"), ("1 December", "১ ডিচেম্বৰ")], 0,
        "World Water Day is observed on 22 March.",
        "বিশ্ব জল দিৱস ২২ মাৰ্চত পালন কৰা হয়।"))
    A(R("Which is the national animal of India?",
        "ভাৰতৰ ৰাষ্ট্ৰীয় জন্তু কি?",
        [("Tiger", "বাঘ"), ("Lion", "সিংহ"), ("Elephant", "হাতী"), ("Peacock", "ময়ূৰ")], 0,
        "The Bengal tiger is the national animal of India.",
        "বংগৰ বাঘ ভাৰতৰ ৰাষ্ট্ৰীয় জন্তু।"))
    A(R("Which is the national bird of India?",
        "ভাৰতৰ ৰাষ্ট্ৰীয় চৰাই কি?",
        [("Peacock", "ময়ূৰ"), ("Parrot", "ভাটৌ"), ("Swan", "ৰাজহংস"), ("Eagle", "ঈগল")], 0,
        "The peacock is the national bird of India.",
        "ময়ূৰ ভাৰতৰ ৰাষ্ট্ৰীয় চৰাই।"))
    A(R("Which is the national flower of India?",
        "ভাৰতৰ ৰাষ্ট্ৰীয় ফুল কি?",
        [("Lotus", "পদুম"), ("Rose", "গোলাপ"), ("Sunflower", "সূৰ্যমুখী"), ("Marigold", "গাঁদা")], 0,
        "The lotus is the national flower of India.",
        "পদুম ভাৰতৰ ৰাষ্ট্ৰীয় ফুল।"))
    A(R("The National Anthem of India was written by?",
        "ভাৰতৰ ৰাষ্ট্ৰীয় সংগীত কোনে ৰচনা কৰিছিল?",
        [("Rabindranath Tagore", "ৰবীন্দ্ৰনাথ ঠাকুৰ"), ("Bankim Chandra Chatterjee", "বঙ্কিম চন্দ্ৰ চট্টোপাধ্যায়"), ("Sarojini Naidu", "সৰোজিনী নাইডু"), ("Mahatma Gandhi", "মহাত্মা গান্ধী")], 0,
        "Rabindranath Tagore wrote the National Anthem, Jana Gana Mana.",
        "ৰবীন্দ্ৰনাথ ঠাকুৰে ৰাষ্ট্ৰীয় সংগীত জন গণ মন ৰচনা কৰিছিল।"))
    A(R("The National Song of India, Vande Mataram, was written by?",
        "ভাৰতৰ ৰাষ্ট্ৰীয় গীত বন্দে মাতৰম কোনে ৰচনা কৰিছিল?",
        [("Bankim Chandra Chatterjee", "বঙ্কিম চন্দ্ৰ চট্টোপাধ্যায়"), ("Rabindranath Tagore", "ৰবীন্দ্ৰনাথ ঠাকুৰ"), ("Premchand", "প্ৰেমচন্দ"), ("Sarojini Naidu", "সৰোজিনী নাইডু")], 0,
        "Bankim Chandra Chatterjee wrote Vande Mataram.",
        "বঙ্কিম চন্দ্ৰ চট্টোপাধ্যায়ে বন্দে মাতৰম ৰচনা কৰিছিল।"))
    A(R("The National Flag of India was adopted on which date?",
        "ভাৰতৰ ৰাষ্ট্ৰীয় পতাকা কোন তাৰিখে গ্ৰহণ কৰা হৈছিল?",
        [("22 July 1947", "২২ জুলাই ১৯৪৭"), ("15 August 1947", "১৫ আগষ্ট ১৯৪৭"), ("26 January 1950", "২৬ জানুৱাৰী ১৯৫০"), ("2 October 1947", "২ অক্টোবৰ ১৯৪৭")], 0,
        "The National Flag was adopted on 22 July 1947.",
        "ৰাষ্ট্ৰীয় পতাকা ২২ জুলাই ১৯৪৭ তাৰিখে গ্ৰহণ কৰা হৈছিল।"))
    A(R("Which of the following is the largest democracy in the world?",
        "তলৰ কোনটো বিশ্বৰ আটাইতকৈ ডাঙৰ গণতন্ত্ৰ?",
        [("India", "ভাৰত"), ("USA", "আমেৰিকা"), ("Indonesia", "ইণ্ডোনেছিয়া"), ("Brazil", "ব্ৰাজিল")], 0,
        "India is the largest democracy in the world.",
        "ভাৰত বিশ্বৰ আটাইতকৈ ডাঙৰ গণতন্ত্ৰ।"))
    A(R("The Indian Railways was founded in which year?",
        "ভাৰতীয় ৰে'ল কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
        [("1853", "১৮৫৩"), ("1947", "১৯৪৭"), ("1900", "১৯০০"), ("1920", "১৯২০")], 0,
        "Indian Railways began operations in 1853.",
        "ভাৰতীয় ৰে'লে ১৮৫৩ চনত কাম আৰম্ভ কৰিছিল।"))
    A(R("Which is the highest civilian award for women in India, awarded for bravery?",
        "বীৰতালৈ প্ৰদান কৰা ভাৰতৰ মহিলাৰ সৰ্বোচ্চ অসামৰিক সন্মান কি?",
        [("Sarojini Naidu Award", "সৰোজিনী নাইডু বঁটা"), ("Rani Lakshmibai Award", "ৰাণী লক্ষ্মীবাই বঁটা"), ("Kasturba Gandhi Award", "কস্তুৰবা গান্ধী বঁটা"), ("Indira Gandhi Award", "ইন্দিৰা গান্ধী বঁটা")], 0,
        "The Rani Lakshmibai Award recognises acts of bravery by women.",
        "ৰাণী লক্ষ্মীবাই বঁটাই মহিলাৰ বীৰতাক স্বীকৃতি দিয়ে।"))
    A(R("The Indian Space Research Organisation (ISRO) has its headquarters at?",
        "ভাৰতীয় মহাকাশ গৱেষণা সংস্থা (ইছৰ') ৰ মুখ্য কাৰ্যালয় ক'ত?",
        [("Bengaluru", "বেংগালুৰু"), ("New Delhi", "নতুন দিল্লী"), ("Hyderabad", "হাইদৰাবাদ"), ("Mumbai", "মুম্বাই")], 0,
        "ISRO's headquarters is in Bengaluru.",
        "ইছৰ'ৰ মুখ্য কাৰ্যালয় বেংগালুৰুত।"))
    A(R("Which of the following is the apex bank of India?",
        "তলৰ কোনটো ভাৰতৰ শীৰ্ষ বেংক?",
        [("Reserve Bank of India", "ভাৰতীয় ৰিজাৰ্ভ বেংক"), ("State Bank of India", "ভাৰতীয় ষ্টেট বেংক"), ("Punjab National Bank", "পাঞ্জাব নেচনেল বেংক"), ("Bank of Baroda", "বেংক অৱ বৰোদা")], 0,
        "The Reserve Bank of India is the central bank of India.",
        "ভাৰতীয় ৰিজাৰ্ভ বেংক ভাৰতৰ কেন্দ্ৰীয় বেংক।"))
    A(R("Who wrote the Indian National Anthem's music?",
        "ভাৰতৰ ৰাষ্ট্ৰীয় সংগীতৰ সুৰ কোনে দিছিল?",
        [("Rabindranath Tagore", "ৰবীন্দ্ৰনাথ ঠাকুৰ"), ("Bankim Chandra Chatterjee", "বঙ্কিম চন্দ্ৰ চট্টোপাধ্যায়"), ("Sarat Chandra", "সৰৎ চন্দ্ৰ"), ("Dwijendralal Roy", "দ্বিজেন্দ্ৰলাল ৰায়")], 0,
        "Rabindranath Tagore composed both the words and music of Jana Gana Mana.",
        "ৰবীন্দ্ৰনাথ ঠাকুৰে জন গণ মন ৰ কথা আৰু সুৰ দুয়োটা ৰচনা কৰিছিল।"))
    A(R("The Constitution of India was adopted on which date?",
        "ভাৰতৰ সংবিধান কোন তাৰিখে গ্ৰহণ কৰা হৈছিল?",
        [("26 November 1949", "২৬ নৱেম্বৰ ১৯৪৯"), ("26 January 1950", "২৬ জানুৱাৰী ১৯৫০"), ("15 August 1947", "১৫ আগষ্ট ১৯৪৭"), ("22 July 1947", "২২ জুলাই ১৯৪৭")], 0,
        "The Constitution was adopted on 26 November 1949.",
        "সংবিধান ২৬ নৱেম্বৰ ১৯৪৯ তাৰিখে গ্ৰহণ কৰা হৈছিল।"))
    A(R("Who was the first President of India?",
        "ভাৰতৰ প্ৰথম ৰাষ্ট্ৰপতি কোন আছিল?",
        [("Dr. Rajendra Prasad", "ড° ৰাজেন্দ্ৰ প্ৰসাদ"), ("Dr. S. Radhakrishnan", "ড° এছ. ৰাধাকৃষ্ণন"), ("Zakir Hussain", "জাকিৰ হুছেইন"), ("V. V. Giri", "ভি. ভি. গিৰি")], 0,
        "Dr. Rajendra Prasad was the first President of India.",
        "ড° ৰাজেন্দ্ৰ প্ৰসাদ ভাৰতৰ প্ৰথম ৰাষ্ট্ৰপতি আছিল।"))
    A(R("The Battle of Saraighat was fought in which year?",
        "শৰাইঘাটৰ যুদ্ধ কোন বছৰত হৈছিল?",
        [("1671", "১৬৭১"), ("1661", "১৬৬১"), ("1757", "১৭৫৭"), ("1826", "১৮২৬")], 0,
        "The Battle of Saraighat was fought in 1671 under Lachit Borphukan.",
        "শৰাইঘাটৰ যুদ্ধ ১৬৭১ চনত লাচিত বৰফুকনৰ নেতৃত্বত হৈছিল।"))
    A(R("Who is known as the 'Mahabir' of Assam?",
        "অসমৰ 'মহাবীৰ' কাক জনা যায়?",
        [("Lachit Borphukan", "লাচিত বৰফুকন"), ("Sukapha", "চুকাফা"), ("Rudra Singha", "ৰুদ্ৰ সিংহ"), ("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ")], 0,
        "Lachit Borphukan is known as the Mahabir of Assam for his bravery.",
        "বীৰতাৰ বাবে লাচিত বৰফুকনক অসমৰ মহাবীৰ বোলা হয়।"))
    A(R("The Treaty of Yandabo was signed in which year?",
        "য়াণ্ডাবু সন্ধি কোন বছৰত স্বাক্ষৰিত হৈছিল?",
        [("1826", "১৮২৬"), ("1857", "১৮৫৭"), ("1757", "১৭৫৭"), ("1947", "১৯৪৭")], 0,
        "The Treaty of Yandabo was signed in 1826, marking the end of Ahom rule.",
        "য়াণ্ডাবু সন্ধি ১৮২৬ চনত স্বাক্ষৰিত হৈছিল, যাৰ দ্বাৰা আহোম শাসনৰ অন্ত পৰে।"))
    A(R("Which Assamese was the first to receive the Bharat Ratna?",
        "ভাৰত ৰত্ন লাভ কৰা প্ৰথম অসমীয়া কোন আছিল?",
        [("Gopinath Bordoloi", "গোপীনাথ বৰদলৈ"), ("Jyoti Prasad Agarwala", "জ্যোতি প্ৰসাদ আগৰৱালা"), ("Bishnu Prasad Rabha", "বিষ্ণু প্ৰসাদ ৰাভা"), ("Bhupen Hazarika", "ভূপেন হাজৰিকা")], 0,
        "Gopinath Bordoloi was the first Assamese to receive the Bharat Ratna.",
        "গোপীনাথ বৰদলৈ ভাৰত ৰত্ন লাভ কৰা প্ৰথম অসমীয়া আছিল।"))
    A(R("Which is the capital of Assam?",
        "অসমৰ ৰাজধানী কি?",
        [("Dispur", "দিছপুৰ"), ("Guwahati", "গুৱাহাটী"), ("Jorhat", "যোৰহাট"), ("Tezpur", "তেজপুৰ")], 0,
        "Dispur, within Guwahati, is the capital of Assam.",
        "গুৱাহাটীৰ অন্তৰ্গত দিছপুৰ অসমৰ ৰাজধানী।"))

    return r
