"""Section B: General Knowledge & Current Affairs - 125 fresh questions."""
from .common import R


def rows():
    r = []
    A = r.append

    # ================= indian-history-polity-economy (35) =================
    A(R("Who was the first President of India?", "ভাৰতৰ প্ৰথম ৰাষ্ট্ৰপতি কোন আছিল?",
        [("Dr. Rajendra Prasad", "ড° ৰাজেন্দ্ৰ প্ৰসাদ"), ("Dr. S. Radhakrishnan", "ড° এছ. ৰাধাকৃষ্ণন"), ("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"), ("Zakir Hussain", "জাকিৰ হুছেইন")], 0,
        "Dr. Rajendra Prasad was the first President of India.", "ড° ৰাজেন্দ্ৰ প্ৰসাদ ভাৰতৰ প্ৰথম ৰাষ্ট্ৰপতি আছিল।"))
    A(R("The Constitution of India came into force on which date?", "ভাৰতৰ সংবিধান কোন তাৰিখে কাৰ্যকৰী হৈছিল?",
        [("26 January 1950", "২৬ জানুৱাৰী ১৯৫০"), ("15 August 1947", "১৫ আগষ্ট ১৯৪৭"), ("26 November 1949", "২৬ নৱেম্বৰ ১৯৪৯"), ("2 October 1950", "২ অক্টোবৰ ১৯৫০")], 0,
        "The Constitution came into force on 26 January 1950.", "সংবিধান ২৬ জানুৱাৰী ১৯৫০ তাৰিখে কাৰ্যকৰী হৈছিল।"))
    A(R("Who is known as the chief architect of the Indian Constitution?", "ভাৰতৰ সংবিধানৰ প্ৰধান স্থপতি কাক জনা যায়?",
        [("Dr. B. R. Ambedkar", "ড° বি. আৰ. আম্বেদকাৰ"), ("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"), ("Sardar Patel", "সৰ্দাৰ পেটেল"), ("Rajendra Prasad", "ৰাজেন্দ্ৰ প্ৰসাদ")], 0,
        "Dr. B. R. Ambedkar chaired the Drafting Committee of the Constitution.", "ড° বি. আৰ. আম্বেদকাৰে সংবিধানৰ খচৰা সমিতিৰ অধ্যক্ষতা কৰিছিল।"))
    A(R("How many fundamental rights are guaranteed by the Indian Constitution?", "ভাৰতৰ সংবিধানে কিমানটা মৌলিক অধিকাৰ প্ৰদান কৰে?",
        [("Six", "ছয়টা"), ("Five", "পাঁচটা"), ("Seven", "সাতটা"), ("Eight", "আঠটা")], 0,
        "There are six fundamental rights in the Indian Constitution.", "ভাৰতৰ সংবিধানত ছয়টা মৌলিক অধিকাৰ আছে।"))
    A(R("Who was the first Prime Minister of India?", "ভাৰতৰ প্ৰথম প্ৰধানমন্ত্ৰী কোন আছিল?",
        [("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"), ("Lal Bahadur Shastri", "লাল বাহাদুৰ শাস্ত্ৰী"), ("Sardar Patel", "সৰ্দাৰ পেটেল"), ("Rajendra Prasad", "ৰাজেন্দ্ৰ প্ৰসাদ")], 0,
        "Jawaharlal Nehru was the first Prime Minister of India.", "জৱাহৰলাল নেহৰু ভাৰতৰ প্ৰথম প্ৰধানমন্ত্ৰী আছিল।"))
    A(R("The Indian National Congress was founded in which year?", "ভাৰতীয় জাতীয় কংগ্ৰেছ কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
        [("1885", "১৮৮৫"), ("1857", "১৮৫৭"), ("1905", "১৯০৫"), ("1920", "১৯২০")], 0,
        "The Indian National Congress was founded in 1885.", "ভাৰতীয় জাতীয় কংগ্ৰেছ ১৮৮৫ চনত প্ৰতিষ্ঠা হৈছিল।"))
    A(R("Who gave the slogan 'Give me blood, I will give you freedom'?", "'মোক তেজ দিয়া, মই তোমালোকক স্বাধীনতা দিম' slogan কোনে দিছিল?",
        [("Subhas Chandra Bose", "সুভাষ চন্দ্ৰ বসু"), ("Mahatma Gandhi", "মহাত্মা গান্ধী"), ("Bhagat Singh", "ভগত সিং"), ("Lala Lajpat Rai", "লালা লাজপত ৰায়")], 0,
        "Subhas Chandra Bose gave this slogan.", "সুভাষ চন্দ্ৰ বসুৱে এই slogan দিছিল।"))
    A(R("In which year did India gain independence?", "ভাৰতে কোন বছৰত স্বাধীনতা লাভ কৰিছিল?",
        [("1947", "১৯৪৭"), ("1950", "১৯৫০"), ("1945", "১৯৪৫"), ("1942", "১৯৪২")], 0,
        "India became independent on 15 August 1947.", "ভাৰত ১৫ আগষ্ট ১৯৪৭ চনত স্বাধীন হৈছিল।"))
    A(R("Who was the first Governor-General of independent India?", "স্বাধীন ভাৰতৰ প্ৰথম গৱৰ্ণৰ-জেনেৰেল কোন আছিল?",
        [("Lord Mountbatten", "লৰ্ড মাউণ্টবেটেন"), ("C. Rajagopalachari", "চি. ৰাজাগোপালাচাৰী"), ("Warren Hastings", "ৱাৰেন হেষ্টিংছ"), ("Lord Curzon", "লৰ্ড কাৰ্জন")], 0,
        "Lord Mountbatten was the first Governor-General of independent India.", "লৰ্ড মাউণ্টবেটেন স্বাধীন ভাৰতৰ প্ৰথম গৱৰ্ণৰ-জেনেৰেল আছিল।"))
    A(R("The Quit India Movement was launched in which year?", "ভাৰত ত্যাগ আন্দোলন কোন বছৰত আৰম্ভ হৈছিল?",
        [("1942", "১৯৪২"), ("1930", "১৯৩০"), ("1920", "১৯২০"), ("1857", "১৮৫৭")], 0,
        "The Quit India Movement was launched in 1942.", "ভাৰত ত্যাগ আন্দোলন ১৯৪২ চনত আৰম্ভ হৈছিল।"))
    A(R("Who is known as the 'Iron Man of India'?", "ভাৰতৰ 'লৌহ মানৱ' কাক জনা যায়?",
        [("Sardar Vallabhbhai Patel", "সৰ্দাৰ বল্লভভাই পেটেল"), ("Jawaharlal Nehru", "জৱাহৰলাল নেহৰু"), ("Mahatma Gandhi", "মহাত্মা গান্ধী"), ("Subhas Chandra Bose", "সুভাষ চন্দ্ৰ বসু")], 0,
        "Sardar Vallabhbhai Patel is called the Iron Man of India.", "সৰ্দাৰ বল্লভভাই পেটেলক ভাৰতৰ লৌহ মানৱ বোলা হয়।"))
    A(R("The Dandi March was led by which leader?", "ডাণ্ডি যাত্ৰাৰ নেতৃত্ব কোনে দিছিল?",
        [("Mahatma Gandhi", "মহাত্মা গান্ধী"), ("Nehru", "নেহৰু"), ("Patel", "পেটেল"), ("Bose", "বসু")], 0,
        "Mahatma Gandhi led the Dandi March in 1930.", "মহাত্মা গান্ধীয়ে ১৯৩০ চনত ডাণ্ডি যাত্ৰাৰ নেতৃত্ব দিছিল।"))
    A(R("Who was the first woman Prime Minister of India?", "ভাৰতৰ প্ৰথম মহিলা প্ৰধানমন্ত্ৰী কোন আছিল?",
        [("Indira Gandhi", "ইন্দিৰা গান্ধী"), ("Sarojini Naidu", "সৰোজিনী নাইডু"), ("Pratibha Patil", "প্ৰতিভা পাটিল"), ("Sushma Swaraj", "সুষমা স্বৰাজ")], 0,
        "Indira Gandhi was the first woman Prime Minister of India.", "ইন্দিৰা গান্ধী ভাৰতৰ প্ৰথম মহিলা প্ৰধানমন্ত্ৰী আছিল।"))
    A(R("The Battle of Plassey was fought in which year?", "পলাশীৰ যুদ্ধ কোন বছৰত হৈছিল?",
        [("1757", "১৭৫৭"), ("1764", "১৭৬৪"), ("1857", "১৮৫৭"), ("1707", "১৭০৭")], 0,
        "The Battle of Plassey was fought in 1757.", "পলাশীৰ যুদ্ধ ১৭৫৭ চনত হৈছিল।"))
    A(R("Who founded the Maurya Empire?", "মৌৰ্য সাম্ৰাজ্য কোনে প্ৰতিষ্ঠা কৰিছিল?",
        [("Chandragupta Maurya", "চন্দ্ৰগুপ্ত মৌৰ্য"), ("Ashoka", "অশোক"), ("Bindusara", "বিন্দুসাৰ"), ("Samudragupta", "সমুদ্ৰগুপ্ত")], 0,
        "Chandragupta Maurya founded the Maurya Empire.", "চন্দ্ৰগুপ্ত মৌৰ্যই মৌৰ্য সাম্ৰাজ্য প্ৰতিষ্ঠা কৰিছিল।"))
    A(R("The first battle of Panipat was fought in which year?", "পানিপথৰ প্ৰথম যুদ্ধ কোন বছৰত হৈছিল?",
        [("1526", "১৫২৬"), ("1556", "১৫৫৬"), ("1761", "১৭৬১"), ("1600", "১৬০০")], 0,
        "The first battle of Panipat was fought in 1526.", "পানিপথৰ প্ৰথম যুদ্ধ ১৫২৬ চনত হৈছিল।"))
    A(R("Who built the Taj Mahal?", "তাজমহল কোনে নিৰ্মাণ কৰিছিল?",
        [("Shah Jahan", "শাহজাহান"), ("Akbar", "আকবৰ"), ("Aurangzeb", "আওৰাংজেব"), ("Babur", "বাবৰ")], 0,
        "Shah Jahan built the Taj Mahal in memory of Mumtaz Mahal.", "শাহজাহানে মুমতাজ মহলৰ স্মৃতিত তাজমহল নিৰ্মাণ কৰিছিল।"))
    A(R("Which article of the Constitution deals with the Right to Equality?", "সংবিধানৰ কোন অনুচ্ছেদ সমতাৰ অধিকাৰৰ সৈতে জড়িত?",
        [("Article 14", "অনুচ্ছেদ ১৪"), ("Article 19", "অনুচ্ছেদ ১৯"), ("Article 21", "অনুচ্ছেদ ২১"), ("Article 32", "অনুচ্ছেদ ৩২")], 0,
        "Article 14 guarantees equality before the law.", "অনুচ্ছেদ ১৪ আইনৰ আগত সমতা নিশ্চিত কৰে।"))
    A(R("Who is called the 'Father of the Indian Constitution'?", "ভাৰতৰ সংবিধানৰ 'পিতৃ' কাক বোলা হয়?",
        [("Dr. B. R. Ambedkar", "ড° বি. আৰ. আম্বেদকাৰ"), ("Nehru", "নেহৰু"), ("Rajendra Prasad", "ৰাজেন্দ্ৰ প্ৰসাদ"), ("Patel", "পেটেল")], 0,
        "Dr. B. R. Ambedkar is called the Father of the Indian Constitution.", "ড° বি. আৰ. আম্বেদকাৰক ভাৰতৰ সংবিধানৰ পিতৃ বোলা হয়।"))
    A(R("The Reserve Bank of India was established in which year?", "ভাৰতীয় ৰিজাৰ্ভ বেংক কোন বছৰত প্ৰতিষ্ঠা হৈছিল?",
        [("1935", "১৯৩৫"), ("1947", "১৯৪৭"), ("1950", "১৯৫০"), ("1920", "১৯২০")], 0,
        "The RBI was established in 1935.", "ভাৰতীয় ৰিজাৰ্ভ বেংক ১৯৩৫ চনত প্ৰতিষ্ঠা হৈছিল।"))
    A(R("Who was the first woman President of India?", "ভাৰতৰ প্ৰথম মহিলা ৰাষ্ট্ৰপতি কোন আছিল?",
        [("Pratibha Patil", "প্ৰতিভা পাটিল"), ("Indira Gandhi", "ইন্দিৰা গান্ধী"), ("Sarojini Naidu", "সৰোজিনী নাইডু"), ("Sonia Gandhi", "চোনিয়া গান্ধী")], 0,
        "Pratibha Patil was the first woman President of India.", "প্ৰতিভা পাটিল ভাৰতৰ প্ৰথম মহিলা ৰাষ্ট্ৰপতি আছিল।"))
    A(R("Which is the highest civilian award of India?", "ভাৰতৰ সৰ্বোচ্চ অসামৰিক সন্মান কোনটো?",
        [("Bharat Ratna", "ভাৰত ৰত্ন"), ("Padma Vibhushan", "পদ্ম বিভূষণ"), ("Padma Bhushan", "পদ্ম ভূষণ"), ("Param Vir Chakra", "পৰম বীৰ চক্ৰ")], 0,
        "The Bharat Ratna is the highest civilian award of India.", "ভাৰত ৰত্ন ভাৰতৰ সৰ্বোচ্চ অসামৰিক সন্মান।"))
    A(R("Who wrote the national anthem of India?", "ভাৰতৰ ৰাষ্ট্ৰীয় সংগীত কোনে লিখিছিল?",
        [("Rabindranath Tagore", "ৰবীন্দ্ৰনাথ ঠাকুৰ"), ("Bankim Chandra Chatterjee", "বঙ্কিম চন্দ্ৰ চট্টোপাধ্যায়"), ("Sarojini Naidu", "সৰোজিনী নাইডু"), ("Premchand", "প্ৰেমচন্দ")], 0,
        "Rabindranath Tagore wrote 'Jana Gana Mana', the national anthem.", "ৰবীন্দ্ৰনাথ ঠাকুৰে 'জন গণ মন' ৰাষ্ট্ৰীয় সংগীত লিখিছিল।"))
    A(R("Who wrote the national song 'Vande Mataram'?", "'বন্দে মাতৰম' ৰাষ্ট্ৰীয় গীত কোনে লিখিছিল?",
        [("Bankim Chandra Chatterjee", "বঙ্কিম চন্দ্ৰ চট্টোপাধ্যায়"), ("Rabindranath Tagore", "ৰবীন্দ্ৰনাথ ঠাকুৰ"), ("Subramania Bharati", "সুব্ৰমণ্য ভাৰতী"), ("Premchand", "প্ৰেমচন্দ")], 0,
        "Bankim Chandra Chatterjee wrote 'Vande Mataram'.", "বঙ্কিম চন্দ্ৰ চট্টোপাধ্যায়ে 'বন্দে মাতৰম' লিখিছিল।"))
    A(R("Which is the largest democracy in the world?", "বিশ্বৰ আটাইতকৈ ডাঙৰ গণতন্ত্ৰ কোনখন?",
        [("India", "ভাৰত"), ("USA", "আমেৰিকা"), ("Indonesia", "ইণ্ডোনেছিয়া"), ("Brazil", "ব্ৰাজিল")], 0,
        "India is the largest democracy in the world.", "ভাৰত বিশ্বৰ আটাইতকৈ ডাঙৰ গণতন্ত্ৰ।"))
    A(R("The Non-Cooperation Movement was launched by Gandhi in which year?", "গান্ধীয়ে অসহযোগ আন্দোলন কোন বছৰত আৰম্ভ কৰিছিল?",
        [("1920", "১৯২০"), ("1930", "১৯৩০"), ("1942", "১৯৪২"), ("1919", "১৯১৯")], 0,
        "The Non-Cooperation Movement began in 1920.", "অসহযোগ আন্দোলন ১৯২০ চনত আৰম্ভ হৈছিল।"))
    A(R("Who was the last Viceroy of India?", "ভাৰতৰ শেষ ভাইচৰয় কোন আছিল?",
        [("Lord Mountbatten", "লৰ্ড মাউণ্টবেটেন"), ("Lord Wavell", "লৰ্ড ৱেভেল"), ("Lord Curzon", "লৰ্ড কাৰ্জন"), ("C. Rajagopalachari", "চি. ৰাজাগোপালাচাৰী")], 0,
        "Lord Mountbatten was the last Viceroy of India.", "লৰ্ড মাউণ্টবেটেন ভাৰতৰ শেষ ভাইচৰয় আছিল।"))
    A(R("Which is the apex court of India?", "ভাৰতৰ সৰ্বোচ্চ আদালত কোনখন?",
        [("Supreme Court", "উচ্চতম ন্যায়ালয়"), ("High Court", "উচ্চ ন্যায়ালয়"), ("District Court", "জিলা আদালত"), ("Lok Adalat", "লোক আদালত")], 0,
        "The Supreme Court is the apex court of India.", "উচ্চতম ন্যায়ালয় ভাৰতৰ সৰ্বোচ্চ আদালত।"))
    A(R("Who appoints the Chief Justice of India?", "ভাৰতৰ প্ৰধান ন্যায়াধীশক কোনে নিয়োগ কৰে?",
        [("The President", "ৰাষ্ট্ৰপতিয়ে"), ("The Prime Minister", "প্ৰধানমন্ত্ৰীয়ে"), ("Parliament", "সংসদে"), ("The Cabinet", "মন্ত্ৰীসভাই")], 0,
        "The President appoints the Chief Justice of India.", "ৰাষ্ট্ৰপতিয়ে ভাৰতৰ প্ৰধান ন্যায়াধীশ নিয়োগ কৰে।"))
    A(R("The Right to Education was added as a fundamental right by which amendment?", "শিক্ষাৰ অধিকাৰ কোন সংশোধনীৰ দ্বাৰা মৌলিক অধিকাৰ হিচাপে যোগ কৰা হৈছিল?",
        [("86th Amendment", "৮৬তম সংশোধনী"), ("42nd Amendment", "৪২তম সংশোধনী"), ("44th Amendment", "৪৪তম সংশোধনী"), ("73rd Amendment", "৭৩তম সংশোধনী")], 0,
        "The 86th Amendment (2002) made education a fundamental right.", "৮৬তম সংশোধনী (২০০২) য়ে শিক্ষাক মৌলিক অধিকাৰ কৰিছিল।"))
    A(R("Who was the founder of the Mughal Empire in India?", "ভাৰতত মোগল সাম্ৰাজ্যৰ প্ৰতিষ্ঠাপক কোন আছিল?",
        [("Babur", "বাবৰ"), ("Akbar", "আকবৰ"), ("Humayun", "হুমায়ুন"), ("Shah Jahan", "শাহজাহান")], 0,
        "Babur founded the Mughal Empire in India in 1526.", "বাবৰে ১৫২৬ চনত ভাৰতত মোগল সাম্ৰাজ্য প্ৰতিষ্ঠা কৰিছিল।"))
    A(R("Which Five-Year Plan marked the beginning of India's planning era?", "ভাৰতৰ পৰিকল্পনা যুগৰ আৰম্ভণি কৰা প্ৰথম পঞ্চবাৰ্ষিক পৰিকল্পনা কোনটো?",
        [("First Plan", "প্ৰথম পৰিকল্পনা"), ("Second Plan", "দ্বিতীয় পৰিকল্পনা"), ("Third Plan", "তৃতীয় পৰিকল্পনা"), ("Fifth Plan", "পঞ্চম পৰিকল্পনা")], 0,
        "The First Five-Year Plan (1951-56) began India's planning era.", "প্ৰথম পঞ্চবাৰ্ষিক পৰিকল্পনা (১৯৫১-৫৬) য়ে ভাৰতৰ পৰিকল্পনা যুগ আৰম্ভ কৰিছিল।"))
    A(R("Who is known as the 'Missile Man of India'?", "ভাৰতৰ 'মিছাইল মেন' কাক জনা যায়?",
        [("Dr. A. P. J. Abdul Kalam", "ড° এ. পি. জে. আব্দুল কালাম"), ("C. V. Raman", "চি. ভি. ৰামন"), ("Homi Bhabha", "হোমি ভাবা"), ("Vikram Sarabhai", "বিক্ৰম সাৰাভাই")], 0,
        "Dr. A. P. J. Abdul Kalam is called the Missile Man of India.", "ড° এ. পি. জে. আব্দুল কালামক ভাৰতৰ মিছাইল মেন বোলা হয়।"))
    A(R("The Panchayati Raj system was given constitutional status by which amendment?", "পঞ্চায়তী ৰাজ ব্যৱস্থাক কোন সংশোধনীয়ে সাংবিধানিক মৰ্যাদা দিছিল?",
        [("73rd Amendment", "৭৩তম সংশোধনী"), ("42nd Amendment", "৪২তম সংশোধনী"), ("44th Amendment", "৪৪তম সংশোধনী"), ("86th Amendment", "৮৬তম সংশোধনী")], 0,
        "The 73rd Amendment (1992) gave constitutional status to Panchayati Raj.", "৭৩তম সংশোধনী (১৯৯২) য়ে পঞ্চায়তী ৰাজক সাংবিধানিক মৰ্যাদা দিছিল।"))
    A(R("Who was the founder of the Gupta Empire?", "গুপ্ত সাম্ৰাজ্যৰ প্ৰতিষ্ঠাপক কোন আছিল?",
        [("Sri Gupta", "শ্ৰীগুপ্ত"), ("Chandragupta I", "চন্দ্ৰগুপ্ত প্ৰথম"), ("Samudragupta", "সমুদ্ৰগুপ্ত"), ("Skandagupta", "স্কন্দগুপ্ত")], 0,
        "Sri Gupta founded the Gupta dynasty.", "শ্ৰীগুপ্তই গুপ্ত ৰাজবংশ প্ৰতিষ্ঠা কৰিছিল।"))

    return r
