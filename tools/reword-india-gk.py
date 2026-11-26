import json, io

R = {
"Gautama Buddha was born at": ("In which grove was Siddhartha Gautama born?","সিদ্ধাৰ্থ গৌতম কোন উদ্যানত জন্মগ্ৰহণ কৰিছিল?",
  ["the Lumbini grove","the Deer Park","the Jetavana grove","the Kusinara grove"],
  ["লুম্বিনী উদ্যান","মৃগ উদ্যান","জেতৱন উদ্যান","কুশিনাৰা উদ্যান"],0,
  "The birth took place in a garden at Lumbini, which is why the grove is named. The Deer Park, Jetavana and Kusinara belong to other events.",
  "জন্ম লুম্বিনীৰ উদ্যানত হৈছিল, সেয়ে উদ্যানটোৰ নাম। মৃগ উদ্যান, জেতৱন আৰু কুশিনাৰা আন ঘটনাৰ।"),

"The first Buddhist council was held at": ("Which place hosted the council convened soon after the Buddha's death?","বুদ্ধৰ মৃত্যুৰ কিছু পিছত অনুষ্ঠিত পৰিষদ ক'ত বহিছিল?",
  ["Rajagaha","Vesali","Pataliputta","Kundalvana"],
  ["ৰাজগহ","ৱেসালী","পাটলিপুত্ৰ","কুণ্ডলৱন"],0,
  "The first council met at Rajagaha, which is why the city is the answer. Vesali hosted the second and Pataliputta the third.",
  "প্ৰথম পৰিষদ ৰাজগহত বহিছিল, সেয়ে নগৰখন উত্তৰ। ৱেসালীত দ্বিতীয় আৰু পাটলিপুত্ৰত তৃতীয়।"),

"The greatest Kushana ruler was": ("Which Kushana king convened the fourth Buddhist council?","কোন কুষাণ ৰজাই চতুৰ্থ বৌদ্ধ পৰিষদ মিলাইছিল?",
  ["Huvishka","Vasudeva","Kanishka","Kujula Kadphises"],
  ["হুবিষ্ক","ৱাসুদেৱ","কণিষ্ক","কুজুল কদফিচেছ"],2,
  "Kanishka called the council, which is why he is the answer. The others ruled before or after him.",
  "কণিষ্কই পৰিষদ মিলাইছিল, সেয়ে তেওঁ উত্তৰ। বাকীয়ে তেওঁৰ আগে বা পিছে ৰাজত্ব কৰিছিল।"),

"The Mughal emperor who built the Taj Mahal was": ("The Taj Mahal was raised as a tomb for the wife of which emperor?","তাজমহল কোন সম্ৰাটৰ পত্নীৰ সমাধি হিচাপে সজা হৈছিল?",
  ["Shah Jahan","Akbar","Jahangir","Aurangzeb"],
  ["শাহজাহান","আকবৰ","জাহাংগীৰ","আওৰংজেব"],0,
  "Mumtaz Mahal was his queen, which is why Shah Jahan is the answer. The others ruled before or after.",
  "মমতাজ মহল তেওঁৰ ৰাণী আছিল, সেয়ে শাহজাহান উত্তৰ। বাকীয়ে আগে বা পিছে ৰাজত্ব কৰিছিল।"),

"The battle of Plassey was fought in": ("Clive's victory at Plassey took place in the year","পলাশীত ক্লাইভৰ বিজয় কোন বছৰত হৈছিল",
  ["1757","1764","1857","1707"],
  ["১৭৫৭","১৭৬৪","১৮৫৭","১৭০৭"],0,
  "The battle was fought in 1757, which is why the year is the answer. 1764 is Buxar and the others are other years.",
  "যুদ্ধ ১৭৫৭ চনত হৈছিল, সেয়ে বছৰটো উত্তৰ। ১৭৬৪ বক্সাৰ আৰু বাকীবোৰ আন বছৰ।"),

"The Regulating Act was passed in": ("Which year saw Parliament first supervise the Company's Indian affairs?","কোন বছৰত সংসদে প্ৰথম কোম্পানীৰ ভাৰতীয় কাৰ্যৰ ওপৰত নজৰ দিছিল?",
  ["1773","1784","1793","1813"],
  ["১৭৭৩","১৭৮৪","১৭৯৩","১৮১৩"],0,
  "The 1773 Act began parliamentary oversight, which is why that year is the answer. The others are later Acts.",
  "১৭৭৩ ৰ আইনে সংসদীয় নজৰদাৰী আৰম্ভ কৰিছিল, সেয়ে সেই বছৰ উত্তৰ। বাকীবোৰ পিছৰ আইন।"),

"The first railway line in India ran between": ("The 1853 railway in India linked Bombay with","১৮৫৩ চনৰ ভাৰতীয় ৰেলপথে বোম্বেক কাৰ লগত জুৰিছিল",
  ["Thane","Agra","Calcutta","Bangalore"],
  ["থানে","আগ্ৰা","কলিকতা","বাংগালোৰ"],0,
  "The line ran to Thane, which is why it is the answer. The others were later destinations.",
  "পথটো থানেলৈ গৈছিল, সেয়ে ই উত্তৰ। বাকীবোৰ পিছৰ গন্তব্য।"),

"The Revolt of 1857 began at": ("The sepoys first rose in May 1857 at","মে ১৮৫৭ ত সৈনিকসকলে প্ৰথম বিদ্ৰোহ কৰিছিল ক'ত",
  ["Meerut","Delhi","Kanpur","Jhansi"],
  ["মীৰাট","দিল্লী","কানপুৰ","ঝাঁসী"],0,
  "The first outbreak was at Meerut, which is why it is the answer. The others joined soon after.",
  "প্ৰথম বিস্ফোৰণ মীৰাটত, সেয়ে ই উত্তৰ। বাকীবোৰ কিছু পিছত যোগ দিছিল।"),

"The Non-Cooperation Movement was launched in": ("Gandhi began the Non-Cooperation campaign in the year","গান্ধীয়ে অসহযোগ অভিযান কোন বছৰত আৰম্ভ কৰিছিল",
  ["1920","1919","1930","1942"],
  ["১৯২০","১৯১৯","১৯৩০","১৯৪২"],0,
  "The campaign started in 1920, which is why the year is the answer. 1919 is Rowlatt and 1930 civil disobedience.",
  "অভিযান ১৯২০ চনত আৰম্ভ হৈছিল, সেয়ে বছৰটো উত্তৰ। ১৯১৯ ৰাউলাট আৰু ১৯৩০ আইন অমান্য।"),

"India attained independence on": ("The transfer of power to India took effect on","ভাৰতলৈ ক্ষমতা হস্তান্তৰ কাৰ্যকৰী হৈছিল কেতিয়া",
  ["15 August 1947","26 January 1950","26 November 1949","15 August 1946"],
  ["১৫ আগষ্ট ১৯৪৭","২৬ জানুৱাৰী ১৯৫০","২৬ নৱেম্বৰ ১৯৪৯","১৫ আগষ্ট ১৯৪৬"],0,
  "Power passed on that date, which is why it is the answer. The others are constitution dates.",
  "সেই তাৰিখে ক্ষমতা হস্তান্তৰ হৈছিল, সেয়ে ই উত্তৰ। বাকীবোৰ সংবিধানৰ তাৰিখ।"),

"The Constitution of India came into force on": ("The Republic of India began on","ভাৰত গণৰাজ্য আৰম্ভ হৈছিল কেতিয়া",
  ["26 January 1950","15 August 1947","26 November 1949","9 December 1946"],
  ["২৬ জানুৱাৰী ১৯৫০","১৫ আগষ্ট ১৯৪৭","২৬ নৱেম্বৰ ১৯৪৯","৯ ডিচেম্বৰ ১৯৪৬"],0,
  "The Constitution took effect that day, which is why it is the answer. The others are other milestones.",
  "সংবিধান সেই দিনা কাৰ্যকৰী হৈছিল, সেয়ে ই উত্তৰ। বাকীবোৰ আন মাইলৰ খুঁটি।"),

"The Constitution of India was adopted on": ("The Constituent Assembly passed the Constitution on","সংবিধান সভাই সংবিধান গৃহীত কৰিছিল কেতিয়া",
  ["26 November 1949","26 January 1950","15 August 1947","26 January 1949"],
  ["২৬ নৱেম্বৰ ১৯৪৯","২৬ জানুৱাৰী ১৯৫০","১৫ আগষ্ট ১৯৪৭","২৬ জানুৱাৰী ১৯৪৯"],0,
  "The Assembly adopted it that day, which is why it is the answer. 26 January 1950 is enforcement.",
  "সভাই সেই দিনা গৃহীত কৰিছিল, সেয়ে ই উত্তৰ। ২৬ জানুৱাৰী ১৯৫০ কাৰ্যকৰণ।"),

"Meghalaya became a full state in": ("The autonomous hill area became the state of Meghalaya in","স্বায়ত্তশাসিত পাহাৰীয়া অঞ্চল মেঘালয় ৰাজ্য হৈছিল কোন বছৰত",
  ["1972","1960","1963","1987"],
  ["১৯৭২","১৯৬০","১৯৬৩","১৯৮৭"],0,
  "Statehood came in 1972, which is why the year is the answer. 1963 is Nagaland and 1987 Mizoram.",
  "ৰাজ্যত্ব ১৯৭২ ত আহিছিল, সেয়ে বছৰটো উত্তৰ। ১৯৬৩ নগালেণ্ড আৰু ১৯৮৭ মিজোৰাম।"),

"The Reserve Bank of India was nationalised in": ("The central bank passed into public ownership in","কেন্দ্ৰীয় বেংক ৰাজহুৱা মালিকানালৈ গৈছিল কোন বছৰত",
  ["1949","1935","1955","1969"],
  ["১৯৪৯","১৯৩৫","১৯৫৫","১৯৬৯"],0,
  "The takeover came in 1949, which is why the year is the answer. 1935 is its founding and 1969 the bank nationalisation.",
  "অধিগ্ৰহণ ১৯৪৯ ত হৈছিল, সেয়ে বছৰটো উত্তৰ। ১৯৩৫ ইয়াৰ প্ৰতিষ্ঠা আৰু ১৯৬৯ বেংক ৰাষ্ট্ৰীয়কৰণ।"),

"The Constituent Assembly adopted the national flag on": ("The tricolour was adopted by the Assembly on","তিৰংগা সভাই গ্ৰহণ কৰিছিল কেতিয়া",
  ["22 July 1947","15 August 1947","26 January 1950","26 November 1949"],
  ["২২ জুলাই ১৯৪৭","১৫ আগষ্ট ১৯৪৭","২৬ জানুৱাৰী ১৯৫০","২৬ নৱেম্বৰ ১৯৪৯"],0,
  "The flag was adopted in July 1947, which is why the date is the answer. The others are other milestones.",
  "পতাকা ১৯৪৭ চনৰ জুলাইত গৃহীত হৈছিল, সেয়ে তাৰিখটো উত্তৰ। বাকীবোৰ আন মাইলৰ খুঁটি।"),

"The Finance Commission is constituted every": ("How often is the constitutional body that devolves central taxes set up?","কেন্দ্ৰীয় কৰ হস্তান্তৰ কৰা সাংবিধানিক সংস্থা কিমান বছৰৰ মূৰে মূৰে গঠিত হয়?",
  ["five years","two years","ten years","three years"],
  ["পাঁচ বছৰ","দুই বছৰ","দহ বছৰ","তিনি বছৰ"],0,
  "The award period is five years, which is why the interval is the answer. The others are wrong intervals.",
  "ৰায়ৰ কাল পাঁচ বছৰ, সেয়ে ব্যৱধানটো উত্তৰ। বাকীবোৰ ভুল ব্যৱধান।"),

"The Bharat Ratna is India's": ("Which honour stands at the top of the civilian list?","অসামৰিক তালিকাৰ শীৰ্ষত কোন সন্মান আছে?",
  ["the highest civilian award","the highest military award","the highest literary award","the highest sports award"],
  ["সৰ্বোচ্চ অসামৰিক বঁটা","সৰ্বোচ্চ সামৰিক বঁটা","সৰ্বোচ্চ সাহিত্য বঁটা","সৰ্বোচ্চ ক্ৰীড়া বঁটা"],0,
  "The civilian honour tops the list, which is why it is the answer. Military, literary and sports awards are separate.",
  "অসামৰিক সন্মান তালিকাৰ শীৰ্ষত, সেয়ে ই উত্তৰ। সামৰিক, সাহিত্য আৰু ক্ৰীড়া বঁটা পৃথক।"),

"The Sanchi stupa is located in": ("In which state does the great Buddhist stupa of Sanchi stand?","সাঁচীৰ মহান বৌদ্ধ স্তূপ কোন ৰাজ্যত আছে?",
  ["Madhya Pradesh","Uttar Pradesh","Bihar","Maharashtra"],
  ["মধ্য প্ৰদেশ","উত্তৰ প্ৰদেশ","বিহাৰ","মহাৰাষ্ট্ৰ"],0,
  "The site lies in Madhya Pradesh, which is why the state is the answer. The others have other stupa sites.",
  "স্থানটো মধ্য প্ৰদেশত, সেয়ে ৰাজ্যটো উত্তৰ। বাকীবোৰত আন স্তূপ স্থান আছে।"),

"The Jagannath temple is located at": ("The chariot festival of Jagannath starts from the temple town of","জগন্নাথৰ ৰথ যাত্ৰা কাৰ মন্দিৰ নগৰৰপৰা আৰম্ভ হয়",
  ["Puri","Konark","Cuttack","Bhubaneswar"],
  ["পুৰী","কোণাৰ্ক","কটক","ভুৱনেশ্বৰ"],0,
  "The shrine stands at Puri, which is why it is the answer. The others have other temples.",
  "মন্দিৰ পুৰীত, সেয়ে ই উত্তৰ। বাকীবোৰত আন মন্দিৰ আছে।"),

"The Jantar Mantar observatories were built by": ("Which astronomer king commissioned the Jantar Mantar observatories?","কোন জ্যোতিৰ্বিজ্ঞানী ৰজাই যন্ত্ৰ মন্তৰ মানমন্দিৰ সজাইছিল?",
  ["Sawai Jai Singh II","Akbar","Shah Jahan","Rajaraja Chola"],
  ["সাৱাই জয় সিং দ্বিতীয়","আকবৰ","শাহজাহান","ৰাজৰাজ চোল"],0,
  "The Jaipur ruler built them, which is why he is the answer. The others ruled in other periods.",
  "জয়পুৰৰ ৰজাই সেয়া সাজিছিল, সেয়ে তেওঁ উত্তৰ। বাকীয়ে আন যুগত ৰাজত্ব কৰিছিল।"),

"The Vice President of India is the ex officio Chairman of the": ("Which House does the Vice President chair by virtue of office?","উপ-ৰাষ্ট্ৰপতিয়ে পদাধিকাৰক্ৰমে কোন সদনত অধ্যক্ষতা কৰে?",
  ["Rajya Sabha","Lok Sabha","Supreme Court","Election Commission"],
  ["ৰাজ্যসভা","লোকসভা","উচ্চতম ন্যায়ালয়","নিৰ্বাচন আয়োগ"],0,
  "The upper House is chaired by him, which is why it is the answer. The others have other presiding officers.",
  "ওপৰৰ সদনত তেওঁ অধ্যক্ষতা কৰে, সেয়ে ই উত্তৰ। বাকীবোৰৰ আন প্ৰিসাইডিং বিষয়া আছে।"),

"The Prime Minister of India is appointed by the": ("Who formally appoints the head of the Union government?","সংঘ চৰকাৰৰ মুৰব্বীক আনুষ্ঠানিকভাৱে কাৰ নিয়োগ কৰে?",
  ["President","Chief Justice","Election Commission","Lok Sabha"],
  ["ৰাষ্ট্ৰপতি","মুখ্য ন্যায়াধীশ","নিৰ্বাচন আয়োগ","লোকসভা"],0,
  "The President makes the appointment, which is why it is the answer. The others do not appoint.",
  "ৰাষ্ট্ৰপতিয়ে নিয়োগ কৰে, সেয়ে ই উত্তৰ। বাকীয়ে নিয়োগ নকৰে।"),

"The Council of Ministers is collectively responsible to the": ("Which House can defeat the government on a confidence vote?","কোন সদনে অবিশ্বাস ভোটত চৰকাৰ পৰাস্ত কৰিব পাৰে?",
  ["Lok Sabha","Rajya Sabha","Supreme Court","President"],
  ["লোকসভা","ৰাজ্যসভা","উচ্চতম ন্যায়ালয়","ৰাষ্ট্ৰপতি"],0,
  "Confidence is tested there, which is why the House is the answer. The others do not decide it.",
  "তাত বিশ্বাস পৰীক্ষা হয়, সেয়ে সদনটো উত্তৰ। বাকীয়ে সেয়া নিৰ্ধাৰণ নকৰে।"),

"A Money Bill can be introduced only in the": ("Which House alone may originate a bill dealing with taxes and spending?","কৰ আৰু ব্যয় সম্পৰ্কীয় বিধেয়ক কেৱল কোন সদনে আৰম্ভ কৰিব পাৰে?",
  ["Lok Sabha","Rajya Sabha","joint sitting","either House"],
  ["লোকসভা","ৰাজ্যসভা","যুটীয়া অধিৱেশন","যিকোনো সদন"],0,
  "The Constitution restricts origin to it, which is why the House is the answer. The others cannot start it.",
  "সংবিধানে আৰম্ভণি ইয়াত সীমিত কৰে, সেয়ে সদনটো উত্তৰ। বাকীয়ে আৰম্ভ কৰিব নোৱাৰে।"),

"The Election Commission of India is constituted under": ("Which article creates the body that conducts national elections?","ৰাষ্ট্ৰীয় নিৰ্বাচন চলোৱা সংস্থা কোন অনুচ্ছেদে সৃষ্টি কৰে?",
  ["Article 324","Article 280","Article 315","Article 148"],
  ["অনুচ্ছেদ ৩২৪","অনুচ্ছেদ ২৮০","অনুচ্ছেদ ৩১৫","অনুচ্ছেদ ১৪৮"],0,
  "Article 324 creates it, which is why it is the answer. The others cover finance, services and audit.",
  "অনুচ্ছেদ ৩২৪য়ে ইয়াক সৃষ্টি কৰে, সেয়ে ই উত্তৰ। বাকীয়ে বিত্ত, সেৱা আৰু হিচাপ পৰীক্ষা সামৰে।"),

"The National Human Rights Commission is a": ("The body set up by the Protection of Human Rights Act is a","মানৱ অধিকাৰ সুৰক্ষা আইনে গঠন কৰা সংস্থা এটা",
  ["statutory body","constitutional body","judicial body","private body"],
  ["বিধিবদ্ধ সংস্থা","সাংবিধানিক সংস্থা","বিচাৰিক সংস্থা","ব্যক্তিগত সংস্থা"],0,
  "An ordinary Act created it, which is why it is statutory. Constitutional bodies are named in the Constitution.",
  "সাধাৰণ আইনে ইয়াক সৃষ্টি কৰিছিল, সেয়ে ই বিধিবদ্ধ। সাংবিধানিক সংস্থা সংবিধানত নাম থকা।"),

"The National Disaster Management Authority is chaired by the": ("Who heads the national body that coordinates disaster response?","দুৰ্যোগ সঁহাৰি সমন্বয় কৰা ৰাষ্ট্ৰীয় সংস্থাৰ মুৰব্বী কোন?",
  ["Prime Minister","President","Home Minister","Cabinet Secretary"],
  ["প্ৰধানমন্ত্ৰী","ৰাষ্ট্ৰপতি","গৃহ মন্ত্ৰী","মন্ত্ৰীসভা সচিব"],0,
  "The Prime Minister chairs it, which is why he is the answer. The others are members or other officials.",
  "প্ৰধানমন্ত্ৰীয়ে অধ্যক্ষতা কৰে, সেয়ে তেওঁ উত্তৰ। বাকীবোৰ সদস্য বা আন বিষয়া।"),

"President's rule in a state is imposed under": ("Which article allows the centre to take over a state's administration?","কেন্দ্ৰই ৰাজ্যৰ প্ৰশাসন অধিগ্ৰহণ কৰিব পৰা অনুচ্ছেদ কোনটো?",
  ["Article 356","Article 360","Article 365","Article 352"],
  ["অনুচ্ছেদ ৩৫৬","অনুচ্ছেদ ৩৬০","অনুচ্ছেদ ৩৬৫","অনুচ্ছেদ ৩৫২"],0,
  "Constitutional breakdown grounds it, which is why 356 is the answer. 352 and 360 are the other emergencies.",
  "সাংবিধানিক ভাঙন ইয়াৰ ভিত্তি, সেয়ে ৩৫৬ উত্তৰ। ৩৫২ আৰু ৩৬০ আন জৰুৰীকাল।"),

"The minimum age to contest a panchayat election is": ("A candidate for a village panchayat must have completed","গাঁৱৰ পঞ্চায়তৰ প্ৰাৰ্থীৰ বয়স সম্পূৰ্ণ হ'ব লাগে",
  ["twenty one years","eighteen years","twenty five years","thirty years"],
  ["একৈশ বছৰ","আঠৰ বছৰ","পঁচিশ বছৰ","ত্ৰিশ বছৰ"],0,
  "The Constitution sets that age, which is why it is the answer. The others are wrong ages.",
  "সংবিধানে সেই বয়স নিৰ্ধাৰণ কৰে, সেয়ে ই উত্তৰ। বাকীবোৰ ভুল বয়স।"),

"The National Commission for Women is a": ("The body created by the 1990 Act for women's issues is a","১৯৯০ ৰ আইনে মহিলাৰ বিষয়ত গঠন কৰা সংস্থা এটা",
  ["statutory body","constitutional body","judicial body","private body"],
  ["বিধিবদ্ধ সংস্থা","সাংবিধানিক সংস্থা","বিচাৰিক সংস্থা","ব্যক্তিগত সংস্থা"],0,
  "An ordinary Act created it, which is why it is statutory. Constitutional bodies are named in the Constitution.",
  "সাধাৰণ আইনে ইয়াক সৃষ্টি কৰিছিল, সেয়ে ই বিধিবদ্ধ। সাংবিধানিক সংস্থা সংবিধানত নাম থকা।"),

"The Advocate General of a state is appointed by the": ("Who appoints the chief law officer of a state?","ৰাজ্যৰ প্ৰধান আইন বিষয়া কাৰ নিয়োগ কৰে?",
  ["Governor","President","Chief Justice","Chief Minister"],
  ["ৰাজ্যপাল","ৰাষ্ট্ৰপতি","মুখ্য ন্যায়াধীশ","মুখ্যমন্ত্ৰী"],0,
  "The Governor appoints the state officer, which is why he is the answer. The others do not appoint.",
  "ৰাজ্যপালে ৰাজ্যৰ বিষয়া নিযুক্তি দিয়ে, সেয়ে তেওঁ উত্তৰ। বাকীয়ে নিয়োগ নিদিয়ে।"),

"The State Finance Commission is constituted under": ("Which article provides for the body that reviews panchayat finances?","পঞ্চায়ত বিত্ত পুনৰীক্ষণ কৰা সংস্থাৰ ব্যৱস্থা কোন অনুচ্ছেদে কৰে?",
  ["Article 243I","Article 280","Article 243Y","Article 324"],
  ["অনুচ্ছেদ ২৪৩আই","অনুচ্ছেদ ২৮০","অনুচ্ছেদ ২৪৩ৱাই","অনুচ্ছেদ ৩২৪"],0,
  "The panchayat finance article is 243I, which is why it is the answer. 280 is the Union body and 243Y municipalities.",
  "পঞ্চায়ত বিত্তৰ অনুচ্ছেদ ২৪৩আই, সেয়ে ই উত্তৰ। ২৮০ সংঘৰ সংস্থা আৰু ২৪৩ৱাই নগৰপালিকা।"),
}

files = ['ancient-part1.json','medieval-part1.json','modern-part1.json',
         'economy-part1.json','artculture-part1.json','governance-part1.json']
done = set()
counts = {}
for fn in files:
    p = 'tools/india-gk-src/' + fn
    d = json.load(io.open(p, encoding='utf-8'))
    n = 0
    for r in d:
        key = r[0]
        if key in R and key not in done:
            q, qas, o, oas, c, e, eas = R[key]
            r[0], r[1] = q, qas
            r[2] = [o[0], oas[0]]
            r[3] = [o[1], oas[1]]
            r[4] = [o[2], oas[2]]
            r[5] = [o[3], oas[3]]
            r[6], r[7], r[8] = c, e, eas
            done.add(key)
            n += 1
    if n:
        io.open(p, 'w', encoding='utf-8').write(json.dumps(d, ensure_ascii=False, indent=1) + '\n')
        counts[fn] = n
print('replaced:', counts)
print('total', sum(counts.values()), 'of', len(R), '| missed:', set(R) - done)
