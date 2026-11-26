import json, io

R = {
"Buddha delivered his first sermon at": ("The wheel of law was first set in motion by the Buddha in the deer park of","বুদ্ধই প্ৰথম ধৰ্মচক্ৰ প্ৰৱৰ্তন কৰিছিল কাৰ মৃগ উদ্যানত",
  ["Isipatana","Kapilavastu","Rajagaha","Vesali"],
  ["ইছিপতন","কপিলৱস্তু","ৰাজগহ","ৱেসালী"],0,
  "The deer park near Varanasi carries that name, which is why it is the answer. The others are other Buddhist sites.",
  "বাৰাণসীৰ ওচৰৰ মৃগ উদ্যানৰ সেই নাম, সেয়ে ই উত্তৰ। বাকীবোৰ আন বৌদ্ধ স্থান।"),

"The last Mauryan ruler was": ("The Mauryan line ended with the killing of","মৌৰ্য বংশ কাৰ হত্যাৰে শেষ হৈছিল",
  ["Samprati","Brihadratha","Ashoka","Bindusara"],
  ["সম্প্ৰতি","বৃহদ্ৰথ","অশোক","বিন্দুসাৰ"],1,
  "Pushyamitra killed the last ruler, which is why Brihadratha is the answer. The others ruled earlier.",
  "পুষ্যমিত্ৰই শেষ শাসকক বধ কৰিছিল, সেয়ে বৃহদ্ৰথ উত্তৰ। বাকীয়ে আগতে ৰাজত্ব কৰিছিল।"),

"The Mauryan empire reached its greatest extent under": ("Kalinga was added to the Mauryan empire by","কলিঙ্গ মৌৰ্য সাম্ৰাজ্যত যোগ কৰিছিল কাৰ",
  ["Bindusara","Brihadratha","Ashoka","Chandragupta Maurya"],
  ["বিন্দুসাৰ","বৃহদ্ৰথ","অশোক","চন্দ্ৰগুপ্ত মৌৰ্য"],2,
  "The Kalinga war was his, which is why Ashoka is the answer. The others ruled before or after the peak.",
  "কলিঙ্গ যুদ্ধ তেওঁৰ, সেয়ে অশোক উত্তৰ। বাকীয়ে শিখৰৰ আগে বা পিছে ৰাজত্ব কৰিছিল।"),

"The Vedic god of fire was": ("The sacrificial flame of the Vedic hymns is addressed to","বৈদিক স্তৱকৰ যজ্ঞৰ শিখাক কাক সম্বোধন কৰা হয়",
  ["Agni","Varuna","Indra","Surya"],
  ["অগ্নি","ৱৰুণ","ইন্দ্ৰ","সূৰ্য"],0,
  "The fire deity receives the offerings, which is why Agni is the answer. The others are other deities.",
  "অগ্নি দেৱতাই নৈবেদ্য গ্ৰহণ কৰে, সেয়ে অগ্নি উত্তৰ। বাকীবোৰ আন দেৱতা।"),

"The Mughal emperor who built Fatehpur Sikri was": ("The abandoned capital near Agra built by Akbar is known as","আগ্ৰাৰ ওচৰত আকবৰে সজা পৰিত্যক্ত ৰাজধানীৰ নাম",
  ["Fatehpur Sikri","Shahjahanabad","Dinpanah","Agra Fort"],
  ["ফতেহপুৰ চিক্ৰী","শাহজাহানাবাদ","দীনপনা","আগ্ৰা কিল্লা"],0,
  "The new capital carried that name, which is why it is the answer. The others are other Mughal sites.",
  "নতুন ৰাজধানীয়ে সেই নাম ধৰিছিল, সেয়ে ই উত্তৰ। বাকীবোৰ আন মোগল স্থান।"),

"The first battle of Panipat was fought in": ("Babur's victory over Ibrahim Lodi came in the year","ইব্ৰাহিম লোদীৰ ওপৰত বাবুৰৰ বিজয় কোন বছৰত হৈছিল",
  ["1398","1526","1556","1761"],
  ["১৩৯৮","১৫২৬","১৫৫৬","১৭৬১"],1,
  "The 1526 battle opened Mughal rule, which is why the year is the answer. The others are other battles.",
  "১৫২৬ ৰ যুদ্ধই মোগল শাসন আৰম্ভ কৰিছিল, সেয়ে বছৰটো উত্তৰ। বাকীবোৰ আন যুদ্ধ।"),

"The Indian National Congress was founded in": ("The first Congress session met in Bombay in the year","প্ৰথম কংগ্ৰেছ অধিৱেশন বোম্বেত বহিছিল কোন বছৰত",
  ["1857","1905","1919","1885"],
  ["১৮৫৭","১৯০৫","১৯১৯","১৮৮৫"],3,
  "The party was founded in 1885, which is why the year is the answer. The others are other years.",
  "দল ১৮৮৫ চনত প্ৰতিষ্ঠিত, সেয়ে বছৰটো উত্তৰ। বাকীবোৰ আন বছৰ।"),

"The partition of Bengal was announced in": ("Curzon carried out the division of Bengal in the year","কাৰ্জনে বংগ বিভাজন কাৰ বছৰত ৰূপায়ণ কৰিছিল",
  ["1885","1911","1919","1905"],
  ["১৮৮৫","১৯১১","১৯১৯","১৯০৫"],3,
  "The split took effect in 1905, which is why the year is the answer. 1911 saw the reversal.",
  "বিভাজন ১৯০৫ ত কাৰ্যকৰী, সেয়ে বছৰটো উত্তৰ। ১৯১১ ত প্ৰত্যাহাৰ।"),

"The Rowlatt Act was passed in": ("The law allowing detention without trial came in the year","বিচাৰ নোহোৱাকৈ আটকৰ অনুমতি দিয়া আইন কোন বছৰত আহিছিল",
  ["1919","1909","1935","1942"],
  ["১৯১৯","১৯০৯","১৯৩৫","১৯৪২"],0,
  "The Act was passed in 1919, which is why the year is the answer. The others are other laws.",
  "আইন ১৯১৯ চনত গৃহীত, সেয়ে বছৰটো উত্তৰ। বাকীবোৰ আন আইন।"),

"The Jallianwala Bagh massacre took place in": ("Troops fired on a gathering at Amritsar in the year","অমৃতসৰত সমাৱেশত সেনাই কাৰ বছৰত গুলি চলাইছিল",
  ["1905","1922","1930","1919"],
  ["১৯০৫","১৯২২","১৯৩০","১৯১৯"],3,
  "The firing happened in 1919, which is why the year is the answer. The others are other events.",
  "গুলিচালনা ১৯১৯ ত হৈছিল, সেয়ে বছৰটো উত্তৰ। বাকীবোৰ আন ঘটনা।"),

"The Jallianwala Bagh massacre took place at": ("The enclosed ground where Dyer ordered firing is in the city of","ডায়াৰে গুলিচালনাৰ আদেশ দিয়া বন্ধ চোতালখন কাৰ নগৰত",
  ["Delhi","Kanpur","Amritsar","Lahore"],
  ["দিল্লী","কানপুৰ","অমৃতসৰ","লাহোৰ"],2,
  "The site is in Amritsar, which is why the city is the answer. The others saw other events.",
  "স্থানটো অমৃতসৰত, সেয়ে নগৰখন উত্তৰ। বাকীবোৰত আন ঘটনা হৈছিল।"),

"The Round Table Conferences were held in": ("The talks between British ministers and Indian leaders met in the city of","ব্ৰিটিছ মন্ত্ৰী আৰু ভাৰতীয় নেতাৰ আলোচনা কাৰ নগৰত বহিছিল",
  ["London","Delhi","Bombay","Simla"],
  ["লণ্ডন","দিল্লী","বোম্বে","চিমলা"],0,
  "The conferences were held in London, which is why the city is the answer. The others hosted other meetings.",
  "সন্মিলন লণ্ডনত হৈছিল, সেয়ে নগৰখন উত্তৰ। বাকীবোৰে আন সভা ধৰিছিল।"),

"The Poona Pact was signed between Gandhi and": ("The reserved seats compromise of 1932 was agreed by Gandhi with","১৯৩২ ৰ আৰক্ষিত আসনৰ আপোচ গান্ধীয়ে কাৰ লগত কৰিছিল",
  ["Nehru","Subhas Chandra Bose","B. R. Ambedkar","Jinnah"],
  ["নেহৰু","সুভাষ চন্দ্ৰ বসু","বি. আৰ. আম্বেদকাৰ","জিন্না"],2,
  "The Dalit leader signed it, which is why Ambedkar is the answer. The others were not party to it.",
  "দলিত নেতাই স্বাক্ষৰ কৰিছিল, সেয়ে আম্বেদকাৰ উত্তৰ। বাকী পক্ষ নাছিল।"),

"The Quit India Movement was launched in": ("The August resolution that launched Quit India was passed in","ভাৰত ছাড় আৰম্ভ কৰা আগষ্ট প্ৰস্তাৱ কেতিয়া গৃহীত হৈছিল",
  ["1942","1930","1919","1946"],
  ["১৯৪২","১৯৩০","১৯১৯","১৯৪৬"],0,
  "The campaign began in 1942, which is why the year is the answer. 1930 is civil disobedience.",
  "অভিযান ১৯৪২ ত আৰম্ভ, সেয়ে বছৰটো উত্তৰ। ১৯৩০ আইন অমান্য।"),

"The first Prime Minister of India was": ("Who formed the first government of independent India?","স্বাধীন ভাৰতৰ প্ৰথম চৰকাৰ কাৰে গঠন কৰিছিল?",
  ["Gandhi","Jawaharlal Nehru","Sardar Patel","Rajendra Prasad"],
  ["গান্ধী","জৱাহৰলাল নেহৰু","চৰ্দাৰ পেটেল","ৰাজেন্দ্ৰ প্ৰসাদ"],1,
  "Nehru took office in 1947, which is why he is the answer. The others held other posts.",
  "নেহৰু ১৯৪৭ ত কাৰ্যভাৰ লৈছিল, সেয়ে তেওঁ উত্তৰ। বাকীয়ে আন পদ লৈছিল।"),

"The Indian Independence Act was passed in": ("The British Parliament passed the Act that created two dominions in","ব্ৰিটিছ সংসদে দুটা ডমিনিয়ন সৃষ্টি কৰা আইন কেতিয়া গৃহীত কৰিছিল",
  ["1950","1935","1947","1946"],
  ["১৯৫০","১৯৩৫","১৯৪৭","১৯৪৬"],2,
  "The Act came in 1947, which is why the year is the answer. The others are other laws or years.",
  "আইন ১৯৪৭ ত আহিছিল, সেয়ে বছৰটো উত্তৰ। বাকীবোৰ আন আইন বা বছৰ।"),

"The first woman President of India was": ("Which woman took the office of President in 2007?","২০০৭ চনত কোন মহিলাই ৰাষ্ট্ৰপতিৰ পদ লৈছিল?",
  ["Indira Gandhi","Sarojini Naidu","Sucheta Kripalani","Pratibha Patil"],
  ["ইন্দিৰা গান্ধী","সৰোজিনী নাইডু","সুচেতা কৃপালানী","প্ৰতিভা পাটিল"],3,
  "Pratibha Patil took office then, which is why she is the answer. The others held other posts.",
  "প্ৰতিভা পাটিলে তেতিয়া কাৰ্যভাৰ লৈছিল, সেয়ে তেওঁ উত্তৰ। বাকীয়ে আন পদ লৈছিল।"),

"The Assam Accord was signed in": ("The movement in Assam ended with an agreement signed in","অসমৰ আন্দোলন কাৰ বছৰত স্বাক্ষৰিত চুক্তিৰে শেষ হৈছিল",
  ["1990","1985","1972","1979"],
  ["১৯৯০","১৯৮৫","১৯৭২","১৯৭৯"],1,
  "The Accord came in 1985, which is why the year is the answer. The others are other years.",
  "চুক্তি ১৯৮৫ ত আহিছিল, সেয়ে বছৰটো উত্তৰ। বাকীবোৰ আন বছৰ।"),

"The Poona Pact was signed in": ("Gandhi's fast ended with an agreement in the year","গান্ধীৰ অনশন কাৰ বছৰত চুক্তিৰে শেষ হৈছিল",
  ["1932","1930","1935","1942"],
  ["১৯৩২","১৯৩০","১৯৩৫","১৯৪২"],0,
  "The Pact was signed in 1932, which is why the year is the answer. The others are other years.",
  "চুক্তি ১৯৩২ ত স্বাক্ষৰিত, সেয়ে বছৰটো উত্তৰ। বাকীবোৰ আন বছৰ।"),

"The Tashkent Agreement was signed in": ("The post war settlement brokered by Moscow came in","মস্কোৰ মধ্যস্থতাত যুদ্ধৰ পিছৰ নিষ্পত্তি কেতিয়া আহিছিল",
  ["1966","1965","1971","1972"],
  ["১৯৬৬","১৯৬৫","১৯৭১","১৯৭২"],0,
  "The agreement was signed in 1966, which is why the year is the answer. 1972 is Simla.",
  "চুক্তি ১৯৬৬ ত স্বাক্ষৰিত, সেয়ে বছৰটো উত্তৰ। ১৯৭২ চিমলা।"),

"The first Five Year Plan of India was launched in": ("Agriculture was the focus of the plan that began in","কৃষি লক্ষ্য থকা পৰিকল্পনা কাৰ বছৰত আৰম্ভ হৈছিল",
  ["1961","1951","1947","1956"],
  ["১৯৬১","১৯৫১","১৯৪৭","১৯৫৬"],1,
  "The first plan began in 1951, which is why the year is the answer. The others are other plan years.",
  "প্ৰথম পৰিকল্পনা ১৯৫১ ত আৰম্ভ, সেয়ে বছৰটো উত্তৰ। বাকীবোৰ আন পৰিকল্পনা বছৰ।"),

"Vande Mataram was written by": ("The song that appears in the novel Anandamath was composed by","আনন্দমঠ উপন্যাসত থকা গীতটো কাৰ ৰচনা",
  ["Subramania Bharati","Bankim Chandra Chatterjee","Rabindranath Tagore","Sarojini Naidu"],
  ["সুব্ৰমণ্য ভাৰতী","বঙ্কিম চন্দ্ৰ চট্টোপাধ্যায়","ৰবীন্দ্ৰনাথ ঠাকুৰ","সৰোজিনী নাইডু"],1,
  "The novelist wrote it, which is why Chatterjee is the answer. Tagore wrote the anthem.",
  "ঔপন্যাসিকে ইয়াক লিখিছিল, সেয়ে চট্টোপাধ্যায় উত্তৰ। ঠাকুৰে ৰাষ্ট্ৰীয় সংগীত লিখিছিল।"),

"The Sanchi stupa was originally built by": ("The Mauryan emperor who raised the original mound at Sanchi was","সাঁচীত মূল ঢিপ তোলা মৌৰ্য সম্ৰাট আছিল",
  ["Kanishka","Harsha","Rajaraja Chola","Ashoka"],
  ["কণিষ্ক","হৰ্ষ","ৰাজৰাজ চোল","অশোক"],3,
  "Ashoka began the stupa, which is why he is the answer. The others built or patronised other monuments.",
  "অশোকে স্তূপ আৰম্ভ কৰিছিল, সেয়ে তেওঁ উত্তৰ। বাকীয়ে আন স্মৃতিচিহ্ন সাজিছিল।"),

"The Red Fort at Delhi was built by": ("Shahjahanabad's fortress palace was raised by","শাহজাহানাবাদৰ দুৰ্গ প্ৰাসাদ কাৰে সাজিছিল",
  ["Aurangzeb","Shah Jahan","Akbar","Babur"],
  ["আওৰংজেব","শাহজাহান","আকবৰ","বাবুৰ"],1,
  "Shah Jahan built it, which is why he is the answer. The others built other structures.",
  "শাহজাহানে ইয়াক সাজিছিল, সেয়ে তেওঁ উত্তৰ। বাকীয়ে আন গাঁথনি সাজিছিল।"),

"The Elephanta caves are located near": ("The island caves reached by ferry from the harbour lie off","বন্দৰৰপৰা ফেৰীৰে যোৱা দ্বীপ গুহাবোৰ কাৰ ওচৰত",
  ["Mumbai","Goa","Kochi","Chennai"],
  ["মুম্বাই","গোৱা","কোচি","চেন্নাই"],0,
  "The caves lie off Mumbai, which is why the city is the answer. The others have other cave sites.",
  "গুহাবোৰ মুম্বাইৰ ওচৰত, সেয়ে নগৰখন উত্তৰ। বাকীবোৰত আন গুহা স্থান আছে।"),

"The President of India is elected by": ("The head of state is chosen by an indirect vote of","ৰাষ্ট্ৰপতি কাৰ পৰোক্ষ ভোটেৰে নিৰ্বাচিত হয়",
  ["the people directly","the Supreme Court","the Cabinet","an electoral college"],
  ["পোনপটীয়াকৈ জনতা","উচ্চতম ন্যায়ালয়","মন্ত্ৰীসভা","এটা নিৰ্বাচক মণ্ডলী"],3,
  "Elected members and MLAs vote, which is why the college is the answer. The others do not elect.",
  "নিৰ্বাচিত সদস্য আৰু বিধায়কে ভোট দিয়ে, সেয়ে মণ্ডলী উত্তৰ। বাকীয়ে নিৰ্বাচন নকৰে।"),

"The maximum strength of the Lok Sabha is": ("The Constitution caps the size of the lower House at","সংবিধানে নিম্ন সদনৰ আকাৰৰ সৰ্বোচ্চ সীমা নিৰ্ধাৰণ কৰে",
  ["552","500","545","600"],
  ["৫৫২","৫০০","৫৪৫","৬০০"],0,
  "The ceiling is 552, which is why the number is the answer. 545 is the present strength.",
  "সৰ্বোচ্চ সীমা ৫৫২, সেয়ে সংখ্যাটো উত্তৰ। ৫৪৫ বৰ্তমান সংখ্যা।"),

"The Attorney General of India is appointed by the": ("The Union's chief law officer is named by the","সংঘৰ প্ৰধান আইন বিষয়াক কাৰ নাম দিয়ে",
  ["President","Chief Justice","Parliament","Cabinet"],
  ["ৰাষ্ট্ৰপতি","মুখ্য ন্যায়াধীশ","সংসদ","মন্ত্ৰীসভা"],0,
  "The President appoints the law officer, which is why the office is the answer. The others do not appoint.",
  "ৰাষ্ট্ৰপতিয়ে আইন বিষয়া নিযুক্তি দিয়ে, সেয়ে পদটো উত্তৰ। বাকীয়ে নিয়োগ নকৰে।"),

"The Chief Minister of a state is appointed by the": ("Who invites the leader of the majority party to head a state government?","সংখ্যাগৰিষ্ঠ দলৰ নেতাক ৰাজ্য চৰকাৰ চলাবলৈ কোনে আমন্ত্ৰণ কৰে?",
  ["Chief Justice","Governor","President","Speaker"],
  ["মুখ্য ন্যায়াধীশ","ৰাজ্যপাল","ৰাষ্ট্ৰপতি","অধ্যক্ষ"],1,
  "The Governor makes the appointment, which is why the office is the answer. The others do not appoint.",
  "ৰাজ্যপালে নিয়োগ কৰে, সেয়ে পদটো উত্তৰ। বাকীয়ে নিয়োগ নকৰে।"),

"The Fundamental Duties were added by the": ("Which amendment inserted the list of citizen duties?","নাগৰিক কৰ্তব্যৰ তালিকা কোন সংশোধনীয়ে সন্নিবেশ কৰিছিল?",
  ["44th Amendment","52nd Amendment","1st Amendment","42nd Amendment"],
  ["৪৪ সংখ্যক সংশোধনী","৫২ সংখ্যক সংশোধনী","১ সংখ্যক সংশোধনী","৪২ সংখ্যক সংশোধনী"],3,
  "The 1976 amendment added them, which is why it is the answer. The others changed other provisions.",
  "১৯৭৬ ৰ সংশোধনীয়ে সেয়া যোগ কৰিছিল, সেয়ে ই উত্তৰ। বাকীয়ে আন ধাৰা সলনি কৰিছিল।"),

"The executive power of the Union is vested in the": ("Article 53 places the Union's executive power with the","অনুচ্ছেদ ৫৩য়ে সংঘৰ কাৰ্যবাহী ক্ষমতা কাৰ ওপৰত ন্যস্ত কৰে",
  ["Parliament","President","Prime Minister","Cabinet"],
  ["সংসদ","ৰাষ্ট্ৰপতি","প্ৰধানমন্ত্ৰী","মন্ত্ৰীসভা"],1,
  "The power vests in the President, which is why the office is the answer. The others exercise or advise.",
  "ক্ষমতা ৰাষ্ট্ৰপতিৰ ওপৰত ন্যস্ত, সেয়ে পদটো উত্তৰ। বাকীয়ে প্ৰয়োগ বা পৰামৰ্শ দিয়ে।"),
}

files = ['ancient-part1.json','medieval-part1.json','modern-part1.json',
         'economy-part1.json','artculture-part1.json','governance-part1.json']
done=set(); counts={}
for fn in files:
    p='tools/india-gk-src/'+fn
    d=json.load(io.open(p,encoding='utf-8'))
    n=0
    for r in d:
        k=r[0]
        if k in R and k not in done:
            q,qas,o,oas,c,e,eas=R[k]
            r[0],r[1]=q,qas
            r[2]=[o[0],oas[0]]; r[3]=[o[1],oas[1]]
            r[4]=[o[2],oas[2]]; r[5]=[o[3],oas[3]]
            r[6],r[7],r[8]=c,e,eas
            done.add(k); n+=1
    if n:
        io.open(p,'w',encoding='utf-8').write(json.dumps(d,ensure_ascii=False,indent=1)+'\n')
        counts[fn]=n
print('replaced:',counts,'total',sum(counts.values()),'of',len(R))
print('missed:',set(R)-done)
