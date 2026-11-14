"""Section B: GK - current affairs, sports-awards and important days."""
from .common import R


def rows3():
    r = []
    A = r.append

    # ================= current-affairs (30) =================
    A(R("Which organisation publishes the Human Development Index?", "কোন সংস্থাই মানৱ উন্নয়ন সূচকাংক প্ৰকাশ কৰে?",
        [("UNDP", "UNDP"), ("WHO", "WHO"), ("IMF", "IMF"), ("World Bank", "বিশ্ব বেংক")], 0,
        "The UNDP publishes the Human Development Index.", "UNDP য়ে মানৱ উন্নয়ন সূচকাংক প্ৰকাশ কৰে।"))
    A(R("Where is the headquarters of the United Nations?", "ৰাষ্ট্ৰসংঘৰ মুখ্য কাৰ্যালয় ক'ত?",
        [("New York", "নিউয়ৰ্ক"), ("Geneva", "জেনেভা"), ("Paris", "পেৰিছ"), ("Vienna", "ভিয়েনা")], 0,
        "The UN headquarters is in New York.", "ৰাষ্ট্ৰসংঘৰ মুখ্য কাৰ্যালয় নিউয়ৰ্কত।"))
    A(R("Which country is the largest by area in the world?", "মাটিকালিৰ ফালৰপৰা বিশ্বৰ আটাইতকৈ ডাঙৰ দেশ কোনখন?",
        [("Russia", "ৰাছিয়া"), ("Canada", "কানাডা"), ("China", "চীন"), ("USA", "আমেৰিকা")], 0,
        "Russia is the largest country by area.", "মাটিকালিৰ ফালৰপৰা ৰাছিয়া আটাইতকৈ ডাঙৰ দেশ।"))
    A(R("Which is the currency of Japan?", "জাপানৰ মুদ্ৰা কি?",
        [("Yen", "য়েন"), ("Won", "ৱন"), ("Yuan", "য়ুৱান"), ("Ringgit", "ৰিংগিট")], 0,
        "The currency of Japan is the yen.", "জাপানৰ মুদ্ৰা য়েন।"))
    A(R("The headquarters of the World Health Organization is at —", "বিশ্ব স্বাস্থ্য সংস্থাৰ মুখ্য কাৰ্যালয় ক'ত —",
        [("Geneva", "জেনেভা"), ("New York", "নিউয়ৰ্ক"), ("Paris", "পেৰিছ"), ("Rome", "ৰোম")], 0,
        "The WHO headquarters is in Geneva.", "WHO ৰ মুখ্য কাৰ্যালয় জেনেভাত।"))
    A(R("Which is the largest ocean in the world?", "বিশ্বৰ আটাইতকৈ ডাঙৰ মহাসাগৰ কোনটো?",
        [("Pacific Ocean", "প্ৰশান্ত মহাসাগৰ"), ("Atlantic Ocean", "আটলাণ্টিক মহাসাগৰ"), ("Indian Ocean", "ভাৰত মহাসাগৰ"), ("Arctic Ocean", "উত্তৰ মহাসাগৰ")], 0,
        "The Pacific is the largest ocean.", "প্ৰশান্ত মহাসাগৰ আটাইতকৈ ডাঙৰ।"))
    A(R("Which country has the largest population in the world?", "বিশ্বত আটাইতকৈ বেছি জনসংখ্যা কোন দেশৰ?",
        [("India", "ভাৰত"), ("China", "চীন"), ("USA", "আমেৰিকা"), ("Indonesia", "ইণ্ডোনেছিয়া")], 0,
        "India is now the most populous country in the world.", "ভাৰত এতিয়া বিশ্বৰ আটাইতকৈ বেছি জনসংখ্যাৰ দেশ।"))
    A(R("Which is the smallest country in the world by area?", "মাটিকালিৰ ফালৰপৰা বিশ্বৰ আটাইতকৈ সৰু দেশ কোনখন?",
        [("Vatican City", "ভেটিকান চিটি"), ("Monaco", "মোনাকো"), ("Nauru", "নাউৰু"), ("Maldives", "মালদ্বীপ")], 0,
        "Vatican City is the smallest country in the world.", "ভেটিকান চিটি বিশ্বৰ আটাইতকৈ সৰু দেশ।"))
    A(R("The Nobel Prize is awarded in how many categories?", "ন'বেল বঁটা কিমান শাখাত প্ৰদান কৰা হয়?",
        [("Six", "ছয়টা"), ("Five", "পাঁচটা"), ("Four", "চাৰিটা"), ("Seven", "সাতটা")], 0,
        "The Nobel Prize is awarded in six categories.", "ন'বেল বঁটা ছয়টা শাখাত প্ৰদান কৰা হয়।"))
    A(R("Which organisation is known as the 'world's central bank' for cooperation?", "সহযোগিতাৰ বাবে কোন সংস্থাক 'বিশ্বৰ কেন্দ্ৰীয় বেংক' বুলি জনা যায়?",
        [("IMF", "IMF"), ("WHO", "WHO"), ("UNESCO", "UNESCO"), ("WTO", "WTO")], 0,
        "The IMF promotes global monetary cooperation.", "IMF য়ে বিশ্ব মুদ্ৰা সহযোগিতা আগবঢ়ায়।"))
    A(R("Which day is observed as World Environment Day?", "বিশ্ব পৰিৱেশ দিৱস কোন তাৰিখে পালন কৰা হয়?",
        [("5 June", "৫ জুন"), ("22 April", "২২ এপ্ৰিল"), ("16 September", "১৬ ছেপ্তেম্বৰ"), ("1 December", "১ ডিচেম্বৰ")], 0,
        "World Environment Day is observed on 5 June.", "বিশ্ব পৰিৱেশ দিৱস ৫ জুন তাৰিখে পালন কৰা হয়।"))
    A(R("The Kyoto Protocol is related to —", "কিয়'ট' প্ৰ'ট'কল কিসৰ সৈতে জড়িত —",
        [("climate change", "জলবায়ু পৰিৱৰ্তন"), ("trade", "বাণিজ্য"), ("nuclear weapons", "পাৰমাণৱিক অস্ত্ৰ"), ("health", "স্বাস্থ্য")], 0,
        "The Kyoto Protocol deals with climate change and greenhouse gases.", "কিয়'ট' প্ৰ'ট'কলে জলবায়ু পৰিৱৰ্তন আৰু গ্ৰীণহাউছ গেছৰ সৈতে কাম কৰে।"))
    A(R("Which country hosted the 2020 Summer Olympics?", "২০২০ গ্ৰীষ্মকালীন অলিম্পিক কোন দেশে আয়োজন কৰিছিল?",
        [("Japan", "জাপান"), ("China", "চীন"), ("Brazil", "ব্ৰাজিল"), ("UK", "ইউকে")], 0,
        "The 2020 Summer Olympics were held in Tokyo, Japan.", "২০২০ গ্ৰীষ্মকালীন অলিম্পিক জাপানৰ টকিঅ'ত অনুষ্ঠিত হৈছিল।"))
    A(R("Which is the official language of the United Nations among these?", "এইবোৰৰ ভিতৰত কোনটো ৰাষ্ট্ৰসংঘৰ চৰকাৰী ভাষা?",
        [("Arabic", "আৰবী"), ("Hindi", "হিন্দী"), ("Bengali", "বঙালী"), ("Portuguese", "পৰ্তুগীজ")], 0,
        "Arabic is one of the six official UN languages.", "আৰবী ৰাষ্ট্ৰসংঘৰ ছয়টা চৰকাৰী ভাষাৰ এটা।"))
    A(R("Which is the largest continent in the world?", "বিশ্বৰ আটাইতকৈ ডাঙৰ মহাদেশ কোনটো?",
        [("Asia", "এছিয়া"), ("Africa", "আফ্ৰিকা"), ("Europe", "ইউৰোপ"), ("North America", "উত্তৰ আমেৰিকা")], 0,
        "Asia is the largest continent.", "এছিয়া আটাইতকৈ ডাঙৰ মহাদেশ।"))
    A(R("Which organisation publishes the Global Hunger Index?", "কোন সংস্থাই গোলকীয় ভোক সূচকাংক প্ৰকাশ কৰে?",
        [("Concern Worldwide and Welthungerhilfe", "কনচাৰ্ন ৱৰ্ল্ডৱাইড আৰু ৱেল্থাংগাৰহিলফে"), ("WHO", "WHO"), ("IMF", "IMF"), ("UNICEF", "UNICEF")], 0,
        "The Global Hunger Index is published by Concern Worldwide and Welthungerhilfe.", "গোলকীয় ভোক সূচকাংক কনচাৰ্ন ৱৰ্ল্ডৱাইড আৰু ৱেল্থাংগাৰহিলফে প্ৰকাশ কৰে।"))
    A(R("The G20 is a group of —", "G20 হ'ল এক গোট —",
        [("major economies", "প্ৰধান অৰ্থনীতি"), ("developed countries only", "কেৱল উন্নত দেশ"), ("developing countries only", "কেৱল উন্নয়নশীল দেশ"), ("island nations", "দ্বীপ ৰাষ্ট্ৰ")], 0,
        "The G20 is a group of major economies.", "G20 প্ৰধান অৰ্থনীতিসমূহৰ এটা গোট।"))
    A(R("Which country is known as the 'Land of the Rising Sun'?", "কোন দেশক 'উদয়মান সূৰ্যৰ দেশ' বুলি জনা যায়?",
        [("Japan", "জাপান"), ("China", "চীন"), ("Thailand", "থাইলেণ্ড"), ("Korea", "কোৰিয়া")], 0,
        "Japan is called the Land of the Rising Sun.", "জাপানক উদয়মান সূৰ্যৰ দেশ বোলা হয়।"))
    A(R("Which Indian city is known as the 'Silicon Valley of India'?", "কোন ভাৰতীয় চহৰক 'ভাৰতৰ চিলিকন ভেলী' বুলি জনা যায়?",
        [("Bengaluru", "বেংগালুৰু"), ("Hyderabad", "হায়দৰাবাদ"), ("Pune", "পুনে"), ("Chennai", "চেন্নাই")], 0,
        "Bengaluru is called the Silicon Valley of India.", "বেংগালুৰুক ভাৰতৰ চিলিকন ভেলী বোলা হয়।"))
    A(R("Which is the currency of the United Kingdom?", "যুক্তৰাজ্যৰ মুদ্ৰা কি?",
        [("Pound Sterling", "পাউণ্ড ষ্টাৰলিং"), ("Euro", "ইউৰো"), ("Dollar", "ডলাৰ"), ("Franc", "ফ্ৰেংক")], 0,
        "The currency of the UK is the pound sterling.", "যুক্তৰাজ্যৰ মুদ্ৰা পাউণ্ড ষ্টাৰলিং।"))
    A(R("Which country has the largest army in terms of personnel?", "সৈন্য সংখ্যাৰ ফালৰপৰা আটাইতকৈ ডাঙৰ সেনা কোন দেশৰ?",
        [("China", "চীন"), ("India", "ভাৰত"), ("USA", "আমেৰিকা"), ("Russia", "ৰাছিয়া")], 0,
        "China has the largest active military personnel.", "চীনৰ আটাইতকৈ বেছি সক্ৰিয় সামৰিক সৈন্য আছে।"))
    A(R("The International Court of Justice is located at —", "আন্তৰ্জাতিক ন্যায়ালয় ক'ত অৱস্থিত —",
        [("The Hague", "হেগ"), ("Geneva", "জেনেভা"), ("New York", "নিউয়ৰ্ক"), ("Paris", "পেৰিছ")], 0,
        "The ICJ is located at The Hague.", "আন্তৰ্জাতিক ন্যায়ালয় হেগত অৱস্থিত।"))
    A(R("Which is the largest desert in the world?", "বিশ্বৰ আটাইতকৈ ডাঙৰ মৰুভূমি কোনটো?",
        [("Sahara", "চাহাৰা"), ("Gobi", "গোবি"), ("Thar", "থৰ"), ("Kalahari", "কালাহাৰী")], 0,
        "The Sahara is the largest hot desert.", "চাহাৰা আটাইতকৈ ডাঙৰ উষ্ণ মৰুভূমি।"))
    A(R("Which day is celebrated as International Yoga Day?", "আন্তৰ্জাতিক যোগ দিৱস কোন তাৰিখে পালন কৰা হয়?",
        [("21 June", "২১ জুন"), ("5 June", "৫ জুন"), ("1 May", "১ মে"), ("8 March", "৮ মাৰ্চ")], 0,
        "International Yoga Day is observed on 21 June.", "আন্তৰ্জাতিক যোগ দিৱস ২১ জুন তাৰিখে পালন কৰা হয়।"))
    A(R("Which organisation is the apex body for athletics worldwide?", "বিশ্বজুৰি এথলেটিক্সৰ সৰ্বোচ্চ সংস্থা কোনটো?",
        [("World Athletics", "ৱৰ্ল্ড এথলেটিক্স"), ("FIFA", "ফিফা"), ("ICC", "ICC"), ("BCCI", "BCCI")], 0,
        "World Athletics governs the sport of athletics.", "ৱৰ্ল্ড এথলেটিক্সে এথলেটিক্স ক্ৰীড়া পৰিচালনা কৰে।"))
    A(R("Which is the largest island in the world?", "বিশ্বৰ আটাইতকৈ ডাঙৰ দ্বীপ কোনটো?",
        [("Greenland", "গ্ৰীণলেণ্ড"), ("Madagascar", "মাদাগাস্কাৰ"), ("Borneo", "বৰ্ণিঅ"), ("New Guinea", "নিউ গিনি")], 0,
        "Greenland is the largest island in the world.", "গ্ৰীণলেণ্ড বিশ্বৰ আটাইতকৈ ডাঙৰ দ্বীপ।"))
    A(R("Which country is known as the 'Land of a Thousand Lakes'?", "কোন দেশক 'হাজাৰ হ্ৰদৰ দেশ' বুলি জনা যায়?",
        [("Finland", "ফিনলেণ্ড"), ("Canada", "কানাডা"), ("Sweden", "ছুইডেন"), ("Norway", "নৰৱে")], 0,
        "Finland is called the Land of a Thousand Lakes.", "ফিনলেণ্ডক হাজাৰ হ্ৰদৰ দেশ বোলা হয়।"))
    A(R("Which is the longest river in the world?", "বিশ্বৰ আটাইতকৈ দীঘল নদী কোনটো?",
        [("Nile", "নীল"), ("Amazon", "আমাজন"), ("Yangtze", "য়াংচি"), ("Mississippi", "মিছিছিপি")], 0,
        "The Nile is generally regarded as the longest river in the world.", "নীল নদীক সাধাৰণতে বিশ্বৰ আটাইতকৈ দীঘল নদী বুলি গণ্য কৰা হয়।"))
    A(R("Which country gifted the Statue of Liberty to the USA?", "কোন দেশে আমেৰিকাক স্বাধীনতাৰ মূৰ্তি উপহাৰ দিছিল?",
        [("France", "ফ্ৰান্স"), ("UK", "ইউকে"), ("Spain", "স্পেইন"), ("Italy", "ইটালী")], 0,
        "France gifted the Statue of Liberty to the USA.", "ফ্ৰান্সে আমেৰিকাক স্বাধীনতাৰ মূৰ্তি উপহাৰ দিছিল।"))

    # ================= sports-awards (25) =================
    A(R("How many players are there in a football team on the field?", "মাঠত এটা ফুটবল দলত কিমানজন খেলুৱৈ থাকে?",
        [("11", "১১"), ("10", "১০"), ("12", "১২"), ("9", "৯")], 0,
        "A football team has 11 players on the field.", "ফুটবল দলত মাঠত ১১ জন খেলুৱৈ থাকে।"))
    A(R("How many players are there in a cricket team?", "এটা ক্ৰিকেট দলত কিমানজন খেলুৱৈ থাকে?",
        [("11", "১১"), ("12", "১২"), ("10", "১০"), ("9", "৯")], 0,
        "A cricket team has 11 players.", "ক্ৰিকেট দলত ১১ জন খেলুৱৈ থাকে।"))
    A(R("The Olympic Games are held once in how many years?", "অলিম্পিক ক্ৰীড়া কিমান বছৰৰ মূৰে মূৰে অনুষ্ঠিত হয়?",
        [("4", "৪"), ("2", "২"), ("3", "৩"), ("5", "৫")], 0,
        "The Summer Olympics are held every four years.", "গ্ৰীষ্মকালীন অলিম্পিক প্ৰতি চাৰি বছৰৰ মূৰে অনুষ্ঠিত হয়।"))
    A(R("Which country won the first Cricket World Cup in 1975?", "১৯৭৫ চনত প্ৰথম ক্ৰিকেট বিশ্বকাপ কোনে জিকিছিল?",
        [("West Indies", "ৱেষ্ট ইণ্ডিজ"), ("Australia", "অষ্ট্ৰেলিয়া"), ("England", "ইংলেণ্ড"), ("India", "ভাৰত")], 0,
        "West Indies won the first Cricket World Cup in 1975.", "১৯৭৫ চনত প্ৰথম ক্ৰিকেট বিশ্বকাপ ৱেষ্ট ইণ্ডিজে জিকিছিল।"))
    A(R("The Bharat Ratna is India's highest award in which field?", "ভাৰত ৰত্ন ভাৰতৰ কোন ক্ষেত্ৰৰ সৰ্বোচ্চ সন্মান?",
        [("Any field of achievement", "যিকোনো ক্ষেত্ৰৰ কৃতিত্ব"), ("Sports only", "কেৱল ক্ৰীড়া"), ("Science only", "কেৱল বিজ্ঞান"), ("Literature only", "কেৱল সাহিত্য")], 0,
        "The Bharat Ratna is awarded for exceptional service in any field.", "ভাৰত ৰত্ন যিকোনো ক্ষেত্ৰত অসাধাৰণ সেৱাৰ বাবে প্ৰদান কৰা হয়।"))
    A(R("In which sport is the term 'love' used?", "কোন ক্ৰীড়াত 'love' শব্দ ব্যৱহাৰ কৰা হয়?",
        [("Tennis", "টেনিছ"), ("Football", "ফুটবল"), ("Cricket", "ক্ৰিকেট"), ("Hockey", "হকী")], 0,
        "'Love' means zero in tennis.", "টেনিছত 'love' ৰ অৰ্থ শূন্য।"))
    A(R("How many players are there in a volleyball team?", "এটা ভলীবল দলত কিমানজন খেলুৱৈ থাকে?",
        [("6", "৬"), ("7", "৭"), ("5", "৫"), ("8", "৮")], 0,
        "A volleyball team has 6 players on court.", "ভলীবল দলত কোৰ্টত ৬ জন খেলুৱৈ থাকে।"))
    A(R("The term 'hat-trick' is associated with which sport?", "হেট-ট্ৰিক শব্দ কোন ক্ৰীড়াৰ সৈতে জড়িত?",
        [("Football and hockey", "ফুটবল আৰু হকী"), ("Chess", "দবা"), ("Swimming", "সাঁতোৰ"), ("Athletics", "এথলেটিক্স")], 0,
        "A hat-trick is common in football and hockey.", "হেট-ট্ৰিক ফুটবল আৰু হকীত সাধাৰণ।"))
    A(R("Which Indian won the first individual Olympic gold medal?", "প্ৰথম ব্যক্তিগত অলিম্পিক স্বৰ্ণ পদক কোন ভাৰতীয়ই জিকিছিল?",
        [("Abhinav Bindra", "অভিনৱ বিন্দ্ৰা"), ("Neeraj Chopra", "নীৰজ চোপ্ৰা"), ("Milkha Singh", "মিলখা সিং"), ("P. T. Usha", "পি. টি. উষা")], 0,
        "Abhinav Bindra won India's first individual Olympic gold in 2008.", "অভিনৱ বিন্দ্ৰাই ২০০৮ চনত ভাৰতৰ প্ৰথম ব্যক্তিগত অলিম্পিক স্বৰ্ণ জিকিছিল।"))
    A(R("The Ranji Trophy is associated with which sport?", "ৰঞ্জী ট্ৰফী কোন ক্ৰীড়াৰ সৈতে জৰিত?",
        [("Cricket", "ক্ৰিকেট"), ("Hockey", "হকী"), ("Football", "ফুটবল"), ("Badminton", "বেডমিণ্টন")], 0,
        "The Ranji Trophy is a domestic cricket tournament.", "ৰঞ্জী ট্ৰফী এখন ঘৰুৱা ক্ৰিকেট প্ৰতিযোগিতা।"))
    A(R("The Dronacharya Award is given to —", "দ্ৰোণাচাৰ্য বঁটা কাক প্ৰদান কৰা হয় —",
        [("coaches", "প্ৰশিক্ষক"), ("players", "খেলুৱৈ"), ("referees", "ৰেফাৰী"), ("sports journalists", "ক্ৰীড়া সাংবাদিক")], 0,
        "The Dronacharya Award honours outstanding coaches.", "দ্ৰোণাচাৰ্য বঁটাই উৎকৃষ্ট প্ৰশিক্ষকসকলক সন্মান কৰে।"))
    A(R("How many rings are there in the Olympic symbol?", "অলিম্পিক প্ৰতীকত কিমানটা আঙুঠি থাকে?",
        [("5", "৫"), ("4", "৪"), ("6", "৬"), ("3", "৩")], 0,
        "The Olympic symbol has five rings.", "অলিম্পিক প্ৰতীকত পাঁচটা আঙুঠি থাকে।"))
    A(R("Which sport is associated with the term 'smash'?", "স্মেশ শব্দ কোন ক্ৰীড়াৰ সৈতে জড়িত?",
        [("Badminton", "বেডমিণ্টন"), ("Cricket", "ক্ৰিকেট"), ("Chess", "দবা"), ("Boxing", "বক্সিং")], 0,
        "A smash is a powerful shot in badminton.", "স্মেশ বেডমিণ্টনত এটা শক্তিশালী শ্বট।"))
    A(R("The Arjuna Award is given for excellence in —", "অৰ্জুন বঁটা কিসত উৎকৃষ্টতাৰ বাবে প্ৰদান কৰা হয় —",
        [("sports", "ক্ৰীড়া"), ("literature", "সাহিত্য"), ("science", "বিজ্ঞান"), ("music", "সংগীত")], 0,
        "The Arjuna Award recognises excellence in sports.", "অৰ্জুন বঁটাই ক্ৰীড়াত উৎকৃষ্টতাক স্বীকৃতি দিয়ে।"))
    A(R("In which country did the modern Olympic Games begin?", "আধুনিক অলিম্পিক ক্ৰীড়া কোন দেশত আৰম্ভ হৈছিল?",
        [("Greece", "গ্ৰীছ"), ("Italy", "ইটালী"), ("France", "ফ্ৰান্স"), ("England", "ইংলেণ্ড")], 0,
        "The modern Olympic Games began in Greece in 1896.", "আধুনিক অলিম্পিক ক্ৰীড়া ১৮৯৬ চনত গ্ৰীছত আৰম্ভ হৈছিল।"))
    A(R("Which is the national sport of India (as per common belief)?", "ভাৰতৰ ৰাষ্ট্ৰীয় ক্ৰীড়া (সাধাৰণ বিশ্বাস অনুসৰি) কি?",
        [("Hockey", "হকী"), ("Cricket", "ক্ৰিকেট"), ("Kabaddi", "কবাডী"), ("Football", "ফুটবল")], 0,
        "Field hockey is widely regarded as India's national sport.", "ফিল্ড হকীক ভাৰতৰ ৰাষ্ট্ৰীয় ক্ৰীড়া হিচাপে ব্যাপকভাৱে গণ্য কৰা হয়।"))
    A(R("How many players are there in a basketball team on court?", "কোৰ্টত এটা বাস্কেটবল দলত কিমানজন খেলুৱৈ থাকে?",
        [("5", "৫"), ("6", "৬"), ("7", "৭"), ("4", "৪")], 0,
        "A basketball team has 5 players on court.", "বাস্কেটবল দলত কোৰ্টত ৫ জন খেলুৱৈ থাকে।"))
    A(R("The term 'checkmate' belongs to which game?", "চেকমেট শব্দ কোন খেলৰ সৈতে জড়িত?",
        [("Chess", "দবা"), ("Carrom", "কেৰাম"), ("Ludo", "লুডু"), ("Polo", "প'ল'")], 0,
        "Checkmate is the winning move in chess.", "চেকমেট দবাৰ জয়ী চাল।"))
    A(R("Which award is given to the best sportsperson in India?", "ভাৰতত শ্ৰেষ্ঠ ক্ৰীড়াবিদক কোন বঁটা প্ৰদান কৰা হয়?",
        [("Khel Ratna", "খেল ৰত্ন"), ("Dronacharya", "দ্ৰোণাচাৰ্য"), ("Arjuna", "অৰ্জুন"), ("Dhyan Chand", "ধ্যানচাঁদ")], 0,
        "The Major Dhyan Chand Khel Ratna is India's highest sporting honour.", "মেজৰ ধ্যানচাঁদ খেল ৰত্ন ভাৰতৰ সৰ্বোচ্চ ক্ৰীড়া সন্মান।"))
    A(R("Which country has won the most FIFA World Cups?", "সৰ্বাধিক ফিফা বিশ্বকাপ কোন দেশে জিকিছে?",
        [("Brazil", "ব্ৰাজিল"), ("Germany", "জাৰ্মানী"), ("Italy", "ইটালী"), ("Argentina", "আৰ্জেণ্টিনা")], 0,
        "Brazil has won the most FIFA World Cups.", "ব্ৰাজিলে সৰ্বাধিক ফিফা বিশ্বকাপ জিকিছে।"))
    A(R("In which sport is the Davis Cup played?", "ডেভিছ কাপ কোন ক্ৰীড়াত খেলা হয়?",
        [("Tennis", "টেনিছ"), ("Badminton", "বেডমিণ্টন"), ("Table tennis", "টেবুল টেনিছ"), ("Squash", "স্কোৱাছ")], 0,
        "The Davis Cup is a men's tennis tournament.", "ডেভিছ কাপ পুৰুষৰ টেনিছ প্ৰতিযোগিতা।"))
    A(R("Which Indian sportsperson is called the 'Flying Sikh'?", "কোন ভাৰতীয় ক্ৰীড়াবিদক 'উৰন্ত শিখ' বুলি জনা যায়?",
        [("Milkha Singh", "মিলখা সিং"), ("Neeraj Chopra", "নীৰজ চোপ্ৰা"), ("Dhyan Chand", "ধ্যানচাঁদ"), ("Sachin Tendulkar", "শচীন তেণ্ডুলকাৰ")], 0,
        "Milkha Singh is called the Flying Sikh.", "মিলখা সিংক উৰন্ত শিখ বোলা হয়।"))
    A(R("The Ashes series is played between which two countries?", "এছেছ শৃংখলা কোন দুখন দেশৰ মাজত খেলা হয়?",
        [("England and Australia", "ইংলেণ্ড আৰু অষ্ট্ৰেলিয়া"), ("India and Pakistan", "ভাৰত আৰু পাকিস্তান"), ("India and Australia", "ভাৰত আৰু অষ্ট্ৰেলিয়া"), ("England and India", "ইংলেণ্ড আৰু ভাৰত")], 0,
        "The Ashes is played between England and Australia.", "এছেছ ইংলেণ্ড আৰু অষ্ট্ৰেলিয়াৰ মাজত খেলা হয়।"))
    A(R("How many players are there in a kabaddi team on court?", "কোৰ্টত এটা কবাডী দলত কিমানজন খেলুৱৈ থাকে?",
        [("7", "৭"), ("6", "৬"), ("8", "৮"), ("5", "৫")], 0,
        "A kabaddi team has 7 players on court.", "কবাডী দলত কোৰ্টত ৭ জন খেলুৱৈ থাকে।"))

    # ================= important-days-capitals-currencies (25) =================
    A(R("World Health Day is observed on which date?", "বিশ্ব স্বাস্থ্য দিৱস কোন তাৰিখে পালন কৰা হয়?",
        [("7 April", "৭ এপ্ৰিল"), ("5 June", "৫ জুন"), ("1 December", "১ ডিচেম্বৰ"), ("21 June", "২১ জুন")], 0,
        "World Health Day is observed on 7 April.", "বিশ্ব স্বাস্থ্য দিৱস ৭ এপ্ৰিল তাৰিখে পালন কৰা হয়।"))
    A(R("What is the capital of Australia?", "অষ্ট্ৰেলিয়াৰ ৰাজধানী কি?",
        [("Canberra", "কেনবেৰা"), ("Sydney", "ছিডনী"), ("Melbourne", "মেলবৰ্ণ"), ("Perth", "পাৰ্থ")], 0,
        "The capital of Australia is Canberra.", "অষ্ট্ৰেলিয়াৰ ৰাজধানী কেনবেৰা।"))
    A(R("What is the capital of Canada?", "কানাডাৰ ৰাজধানী কি?",
        [("Ottawa", "অটৱা"), ("Toronto", "টৰণ্টো"), ("Vancouver", "ভেনকুভাৰ"), ("Montreal", "মণ্ট্ৰিয়েল")], 0,
        "The capital of Canada is Ottawa.", "কানাডাৰ ৰাজধানী অটৱা।"))
    A(R("What is the currency of the United States?", "আমেৰিকা যুক্তৰাষ্ট্ৰৰ মুদ্ৰা কি?",
        [("Dollar", "ডলাৰ"), ("Pound", "পাউণ্ড"), ("Euro", "ইউৰো"), ("Peso", "পেছো")], 0,
        "The currency of the USA is the dollar.", "আমেৰিকাৰ মুদ্ৰা ডলাৰ।"))
    A(R("What is the capital of Japan?", "জাপানৰ ৰাজধানী কি?",
        [("Tokyo", "টকিঅ'"), ("Osaka", "ওচাকা"), ("Kyoto", "কিয়'ট'"), ("Nagoya", "নাগ'য়া")], 0,
        "The capital of Japan is Tokyo.", "জাপানৰ ৰাজধানী টকিঅ'।"))
    A(R("Independence Day of India is celebrated on —", "ভাৰতৰ স্বাধীনতা দিৱস কেতিয়া পালন কৰা হয় —",
        [("15 August", "১৫ আগষ্ট"), ("26 January", "২৬ জানুৱাৰী"), ("2 October", "২ অক্টোবৰ"), ("14 November", "১৪ নৱেম্বৰ")], 0,
        "India's Independence Day is on 15 August.", "ভাৰতৰ স্বাধীনতা দিৱস ১৫ আগষ্ট।"))
    A(R("Republic Day of India is celebrated on —", "ভাৰতৰ গণতন্ত্ৰ দিৱস কেতিয়া পালন কৰা হয় —",
        [("26 January", "২৬ জানুৱাৰী"), ("15 August", "১৫ আগষ্ট"), ("2 October", "২ অক্টোবৰ"), ("1 May", "১ মে")], 0,
        "India's Republic Day is on 26 January.", "ভাৰতৰ গণতন্ত্ৰ দিৱস ২৬ জানুৱাৰী।"))
    A(R("World Water Day is observed on which date?", "বিশ্ব জল দিৱস কোন তাৰিখে পালন কৰা হয়?",
        [("22 March", "২২ মাৰ্চ"), ("5 June", "৫ জুন"), ("7 April", "৭ এপ্ৰিল"), ("16 September", "১৬ ছেপ্তেম্বৰ")], 0,
        "World Water Day is observed on 22 March.", "বিশ্ব জল দিৱস ২২ মাৰ্চ তাৰিখে পালন কৰা হয়।"))
    A(R("What is the currency of China?", "চীনৰ মুদ্ৰা কি?",
        [("Yuan", "য়ুৱান"), ("Yen", "য়েন"), ("Won", "ৱন"), ("Ringgit", "ৰিংগিট")], 0,
        "The currency of China is the yuan.", "চীনৰ মুদ্ৰা য়ুৱান।"))
    A(R("What is the capital of France?", "ফ্ৰান্সৰ ৰাজধানী কি?",
        [("Paris", "পেৰিছ"), ("Lyon", "লিয়ন"), ("Marseille", "মাৰ্চেইল"), ("Nice", "নিচ")], 0,
        "The capital of France is Paris.", "ফ্ৰান্সৰ ৰাজধানী পেৰিছ।"))
    A(R("International Women's Day is observed on —", "আন্তৰ্জাতিক নাৰী দিৱস কেতিয়া পালন কৰা হয় —",
        [("8 March", "৮ মাৰ্চ"), ("1 May", "১ মে"), ("21 June", "২১ জুন"), ("5 June", "৫ জুন")], 0,
        "International Women's Day is observed on 8 March.", "আন্তৰ্জাতিক নাৰী দিৱস ৮ মাৰ্চ তাৰিখে পালন কৰা হয়।"))
    A(R("What is the capital of the United Kingdom?", "যুক্তৰাজ্যৰ ৰাজধানী কি?",
        [("London", "লণ্ডন"), ("Manchester", "মাঞ্চেষ্টাৰ"), ("Edinburgh", "এডিনবাৰ্গ"), ("Birmingham", "বাৰ্মিংহাম")], 0,
        "The capital of the UK is London.", "যুক্তৰাজ্যৰ ৰাজধানী লণ্ডন।"))
    A(R("World Teachers' Day is observed on —", "বিশ্ব শিক্ষক দিৱস কেতিয়া পালন কৰা হয় —",
        [("5 October", "৫ অক্টোবৰ"), ("5 September", "৫ ছেপ্তেম্বৰ"), ("14 November", "১৪ নৱেম্বৰ"), ("15 January", "১৫ জানুৱাৰী")], 0,
        "World Teachers' Day is observed on 5 October.", "বিশ্ব শিক্ষক দিৱস ৫ অক্টোবৰ তাৰিখে পালন কৰা হয়।"))
    A(R("Children's Day in India is celebrated on —", "ভাৰতত শিশু দিৱস কেতিয়া পালন কৰা হয় —",
        [("14 November", "১৪ নৱেম্বৰ"), ("2 October", "২ অক্টোবৰ"), ("15 August", "১৫ আগষ্ট"), ("26 January", "২৬ জানুৱাৰী")], 0,
        "Children's Day is celebrated on 14 November, Jawaharlal Nehru's birthday.", "শিশু দিৱস ১৪ নৱেম্বৰ, জৱাহৰলাল নেহৰুৰ জন্মদিনত পালন কৰা হয়।"))
    A(R("What is the currency of Russia?", "ৰাছিয়াৰ মুদ্ৰা কি?",
        [("Ruble", "ৰুবল"), ("Euro", "ইউৰো"), ("Dollar", "ডলাৰ"), ("Pound", "পাউণ্ড")], 0,
        "The currency of Russia is the ruble.", "ৰাছিয়াৰ মুদ্ৰা ৰুবল।"))
    A(R("What is the capital of the United States?", "আমেৰিকা যুক্তৰাষ্ট্ৰৰ ৰাজধানী কি?",
        [("Washington D.C.", "ৱাশিংটন ডি.চি."), ("New York", "নিউয়ৰ্ক"), ("Chicago", "চিকাগো"), ("Los Angeles", "লছ এঞ্জেলেছ")], 0,
        "The capital of the USA is Washington D.C.", "আমেৰিকাৰ ৰাজধানী ৱাশিংটন ডি.চি.।"))
    A(R("World AIDS Day is observed on —", "বিশ্ব এইডছ দিৱস কেতিয়া পালন কৰা হয় —",
        [("1 December", "১ ডিচেম্বৰ"), ("5 June", "৫ জুন"), ("7 April", "৭ এপ্ৰিল"), ("21 June", "২১ জুন")], 0,
        "World AIDS Day is observed on 1 December.", "বিশ্ব এইডছ দিৱস ১ ডিচেম্বৰ তাৰিখে পালন কৰা হয়।"))
    A(R("What is the currency of Germany?", "জাৰ্মানীৰ মুদ্ৰা কি?",
        [("Euro", "ইউৰো"), ("Mark", "মাৰ্ক"), ("Franc", "ফ্ৰেংক"), ("Pound", "পাউণ্ড")], 0,
        "Germany uses the euro.", "জাৰ্মানীয়ে ইউৰো ব্যৱহাৰ কৰে।"))
    A(R("National Science Day in India is observed on —", "ভাৰতত ৰাষ্ট্ৰীয় বিজ্ঞান দিৱস কেতিয়া পালন কৰা হয় —",
        [("28 February", "২৮ ফেব্ৰুৱাৰী"), ("5 September", "৫ ছেপ্তেম্বৰ"), ("2 October", "২ অক্টোবৰ"), ("15 January", "১৫ জানুৱাৰী")], 0,
        "National Science Day is observed on 28 February.", "ৰাষ্ট্ৰীয় বিজ্ঞান দিৱস ২৮ ফেব্ৰুৱাৰী তাৰিখে পালন কৰা হয়।"))
    A(R("What is the capital of China?", "চীনৰ ৰাজধানী কি?",
        [("Beijing", "বেইজিং"), ("Shanghai", "ছাংহাই"), ("Hong Kong", "হংকং"), ("Guangzhou", "গুৱাংঝৌ")], 0,
        "The capital of China is Beijing.", "চীনৰ ৰাজধানী বেইজিং।"))
    A(R("Gandhi Jayanti is celebrated on —", "গান্ধী জয়ন্তী কেতিয়া পালন কৰা হয় —",
        [("2 October", "২ অক্টোবৰ"), ("15 August", "১৫ আগষ্ট"), ("26 January", "২৬ জানুৱাৰী"), ("14 November", "১৪ নৱেম্বৰ")], 0,
        "Gandhi Jayanti is celebrated on 2 October.", "গান্ধী জয়ন্তী ২ অক্টোবৰ তাৰিখে পালন কৰা হয়।"))
    A(R("What is the currency of Bangladesh?", "বাংলাদেশৰ মুদ্ৰা কি?",
        [("Taka", "টকা"), ("Rupee", "ৰুপী"), ("Dollar", "ডলাৰ"), ("Riel", "ৰিয়েল")], 0,
        "The currency of Bangladesh is the taka.", "বাংলাদেশৰ মুদ্ৰা টকা।"))
    A(R("What is the capital of Bhutan?", "ভূটানৰ ৰাজধানী কি?",
        [("Thimphu", "থিম্পু"), ("Paro", "পাৰো"), ("Punakha", "পুনাখা"), ("Gelephu", "গেলেফু")], 0,
        "The capital of Bhutan is Thimphu.", "ভূটানৰ ৰাজধানী থিম্পু।"))
    A(R("World Tourism Day is observed on —", "বিশ্ব পৰ্যটন দিৱস কেতিয়া পালন কৰা হয় —",
        [("27 September", "২৭ ছেপ্তেম্বৰ"), ("5 June", "৫ জুন"), ("21 June", "২১ জুন"), ("1 December", "১ ডিচেম্বৰ")], 0,
        "World Tourism Day is observed on 27 September.", "বিশ্ব পৰ্যটন দিৱস ২৭ ছেপ্তেম্বৰ তাৰিখে পালন কৰা হয়।"))
    A(R("What is the currency of Nepal?", "নেপালৰ মুদ্ৰা কি?",
        [("Nepalese Rupee", "নেপালী ৰুপী"), ("Taka", "টকা"), ("Ngultrum", "গুলট্ৰাম"), ("Kyat", "ক্যাট")], 0,
        "The currency of Nepal is the Nepalese rupee.", "নেপালৰ মুদ্ৰা নেপালী ৰুপী।"))
    A(R("What is the capital of Sri Lanka?", "শ্ৰীলংকাৰ ৰাজধানী কি?",
        [("Sri Jayawardenepura Kotte", "শ্ৰী জয়ৱৰ্ধনেপুৰা ক'টে"), ("Colombo", "কলম্বো"), ("Kandy", "কেণ্ডি"), ("Galle", "গলে")], 0,
        "The official capital of Sri Lanka is Sri Jayawardenepura Kotte.", "শ্ৰীলংকাৰ চৰকাৰী ৰাজধানী শ্ৰী জয়ৱৰ্ধনেপুৰা ক'টে।"))

    return r
