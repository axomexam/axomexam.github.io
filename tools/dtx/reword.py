"""Rewordings for DHS & DME Technical extra-bank questions whose English text
would otherwise duplicate a question already published elsewhere on the site.

The bank is authored fresh, but a few natural phrasings for very common facts
clash with wording already used by the other exam banks. Each entry below
replaces the question stem with a different, equally clear phrasing so the
extra sets stay fully unique across the site. Options, answer key and
explanations are unchanged.

Keyed by the original English stem; the value is (new English, new Assamese).
"""

REWORD = {
    # ---- biology ----
    "The number of teeth in an adult human is?":
        ("How many teeth does a normal adult human being have?",
         "এজন স্বাভাৱিক প্ৰাপ্তবয়স্ক মানুহৰ কিমানটা দাঁত থাকে?"),
    "Which acid is present in the human stomach?":
        ("Name the acid secreted in the human stomach.",
         "মানুহৰ পেটত নিঃসৃত হোৱা আম্লৰ নাম কি?"),
    "Which gland is called the master gland of the human body?":
        ("Which endocrine gland is regarded as the master gland of the human body?",
         "কোন অন্তঃস্ৰাৱী গ্ৰন্থিক মানৱ শৰীৰৰ মুখ্য গ্ৰন্থি বুলি গণ্য কৰা হয়?"),
    "Who is known as the father of genetics?":
        ("Who is regarded as the father of the science of genetics?",
         "বংশগতি বিজ্ঞানৰ পিতৃ বুলি কাক গণ্য কৰা হয়?"),
    "Which gas is mainly responsible for the greenhouse effect?":
        ("Which gas is the chief contributor to the greenhouse effect?",
         "গ্ৰীণহাউছ প্ৰভাৱৰ প্ৰধান কাৰক গেছ কোনটো?"),
    "Kaziranga National Park is famous for which animal?":
        ("For which animal is Kaziranga National Park best known?",
         "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান কোন জন্তুৰ বাবে আটাইতকৈ বেছি পৰিচিত?"),
    "Which is the largest national park of Assam?":
        ("Name the biggest national park located in Assam.",
         "অসমত অৱস্থিত আটাইতকৈ ডাঙৰ ৰাষ্ট্ৰীয় উদ্যানৰ নাম কি?"),
    "Deepor Beel, a Ramsar site, is located near which city?":
        ("Near which city is Deepor Beel, a Ramsar wetland, situated?",
         "ৰামছাৰ জলাশয় দীপৰ বিল কোন নগৰৰ ওচৰত অৱস্থিত?"),
    "The state animal of Assam is?":
        ("Which animal has been declared the state animal of Assam?",
         "কোন জন্তুক অসমৰ ৰাজ্যিক জন্তু ঘোষণা কৰা হৈছে?"),
    "The state bird of Assam is?":
        ("Which bird has been declared the state bird of Assam?",
         "কোন চৰাইক অসমৰ ৰাজ্যিক চৰাই ঘোষণা কৰা হৈছে?"),
    "Which part of the plant absorbs water and minerals from the soil?":
        ("Through which plant part are water and minerals taken up from the soil?",
         "উদ্ভিদৰ কোন অংশৰ জৰিয়তে মাটিৰ পৰা পানী আৰু খনিজ গ্ৰহণ কৰা হয়?"),
    "Which gas do plants absorb during photosynthesis?":
        ("Which gas is taken in by plants during the process of photosynthesis?",
         "সালোকসংশ্লেষণ প্ৰক্ৰিয়াত উদ্ভিদে কোন গেছ গ্ৰহণ কৰে?"),
    "Which disease is caused by a virus?":
        ("Which one of these diseases is caused by a virus?",
         "এইবোৰৰ কোনটো ৰোগ ভাইৰাছৰ দ্বাৰা হয়?"),
    "The largest organ of the human body is?":
        ("Which is the biggest organ of the human body?",
         "মানৱ শৰীৰৰ আটাইতকৈ ডাঙৰ অংগ কোনটো?"),
    "The largest gland in the human body is?":
        ("Which is the biggest gland in the human body?",
         "মানৱ শৰীৰৰ আটাইতকৈ ডাঙৰ গ্ৰন্থি কোনটো?"),
    "The smallest bone in the human body is?":
        ("Which is the tiniest bone found in the human body?",
         "মানৱ শৰীৰত পোৱা আটাইতকৈ সৰু হাড় কোনটো?"),
    "The longest bone in the human body is?":
        ("Which is the longest bone found in the human body?",
         "মানৱ শৰীৰত পোৱা আটাইতকৈ দীঘল হাড় কোনটো?"),
    "Which organ pumps blood throughout the body?":
        ("Which organ of the body keeps blood circulating throughout the body?",
         "শৰীৰৰ কোন অংগই সমগ্ৰ শৰীৰত তেজ চলাচল কৰাই থাকে?"),
    "Which blood group is called the universal donor?":
        ("Which blood group is regarded as the universal donor?",
         "কোন ৰক্ত-গোটক সৰ্বজনীন দাতা বুলি গণ্য কৰা হয়?"),
    "Which of the following is a biodegradable waste?":
        ("Which one among these is a biodegradable waste material?",
         "এইবোৰৰ কোনটো জৈৱ-বিয়োজনীয় আৱৰ্জনা?"),
    "Which of the following is a non-biodegradable waste?":
        ("Which one among these is a non-biodegradable waste material?",
         "এইবোৰৰ কোনটো অ-জৈৱ-বিয়োজনীয় আৱৰ্জনা?"),
    "The fusion of male and female gametes is called?":
        ("The union of a male gamete and a female gamete is termed?",
         "পুং জনন কোষ আৰু মাইকী জনন কোষৰ মিলনক কি বোলা হয়?"),
    "The functional unit of the nervous system is?":
        ("Which is the functional unit of the human nervous system?",
         "মানৱ স্নায়ু তন্ত্ৰৰ কাৰ্যকৰী একক কোনটো?"),
    "Which nutrient is called the body-building nutrient?":
        ("Which nutrient is referred to as the body-building nutrient?",
         "কোন পুষ্টিক শৰীৰ-গঠনকাৰী পুষ্টি বুলি কোৱা হয়?"),
    "Which is the state flower of Assam?":
        ("Name the state flower of Assam.",
         "অসমৰ ৰাজ্যিক ফুলৰ নাম কি?"),
    "Which is the state tree of Assam?":
        ("Name the state tree of Assam.",
         "অসমৰ ৰাজ্যিক বৃক্ষৰ নাম কি?"),
    "Which of the following is a flying mammal?":
        ("Which one among these animals is a mammal that can fly?",
         "এইবোৰৰ কোনটো উৰিব পৰা স্তন্যপায়ী প্ৰাণী?"),
    "The respiratory organ of fish is?":
        ("Through which organ do fish breathe?",
         "মাছে কোন অংগৰ জৰিয়তে শ্বাস লয়?"),

    # ---- chemistry ----
    "Which of the following is a noble gas?":
        ("Which one among these gases is an inert (noble) gas?",
         "এইবোৰৰ কোনটো নিষ্ক্ৰিয় (নিষ্ক্ৰিয়) গেছ?"),
    "Which acid is present in vinegar?":
        ("Which acid gives vinegar its characteristic nature?",
         "কোন আম্লই ভিনেগাৰৰ বৈশিষ্ট্য প্ৰদান কৰে?"),
    "Which of the following is a strong base?":
        ("Which one among these is a strong base?",
         "এইবোৰৰ কোনটো এটা প্ৰবল ক্ষাৰক?"),
    "What is the chemical formula of common salt?":
        ("Write the chemical formula of common salt.",
         "সাধাৰণ নিমখৰ ৰাসায়নিক সংকেত লিখক।"),
    "Which metal is liquid at room temperature?":
        ("Which metal remains liquid at ordinary room temperature?",
         "কোন ধাতু সাধাৰণ কোঠৰ তাপমাত্ৰাত তৰল হৈ থাকে?"),
    "Which of the following is a saturated hydrocarbon?":
        ("Which one among these compounds is a saturated hydrocarbon?",
         "এইবোৰৰ কোনটো যৌগ এটা সম্পৃক্ত হাইড্ৰ'কাৰ্বন?"),
    "Which of the following is an unsaturated hydrocarbon?":
        ("Which one among these compounds is an unsaturated hydrocarbon?",
         "এইবোৰৰ কোনটো যৌগ এটা অসম্পৃক্ত হাইড্ৰ'কাৰ্বন?"),
    "Which gas is most abundant in the Earth's atmosphere?":
        ("Which gas forms the largest part of the Earth's atmosphere?",
         "কোন গেছে পৃথিৱীৰ বায়ুমণ্ডলৰ আটাইতকৈ বেছি অংশ গঠন কৰে?"),
    "Which of the following is a physical change?":
        ("Which one among these is an example of a physical change?",
         "এইবোৰৰ কোনটো এটা ভৌতিক পৰিৱৰ্তনৰ উদাহৰণ?"),
    "Which of the following is a chemical change?":
        ("Which one among these is an example of a chemical change?",
         "এইবোৰৰ কোনটো এটা ৰাসায়নিক পৰিৱৰ্তনৰ উদাহৰণ?"),
    "A reaction in which heat is absorbed is called?":
        ("What is a reaction that absorbs heat called?",
         "তাপ শোষণ কৰা বিক্ৰিয়াক কি বোলা হয়?"),
    "A homogeneous mixture of two or more substances is called?":
        ("What is a uniform mixture of two or more substances called?",
         "দুই বা অধিক পদাৰ্থৰ সুষম মিশ্ৰণক কি বোলা হয়?"),
    "The number of groups in the modern periodic table is?":
        ("How many groups are there in the modern periodic table?",
         "আধুনিক পৰ্যায় সাৰণীত কিমানটা শ্ৰেণী আছে?"),
    "The number of periods in the modern periodic table is?":
        ("How many periods are there in the modern periodic table?",
         "আধুনিক পৰ্যায় সাৰণীত কিমানটা পৰ্যায় আছে?"),
    "Which of the following is an alkali metal?":
        ("Which one among these metals is an alkali metal?",
         "এইবোৰৰ কোনটো ধাতু এটা ক্ষাৰ ধাতু?"),
    "Which of the following is a halogen?":
        ("Which one among these elements is a halogen?",
         "এইবোৰৰ কোনটো মৌল এটা হেল'জেন?"),
    "Which of the following is a transition metal?":
        ("Which one among these metals is a transition metal?",
         "এইবোৰৰ কোনটো ধাতু এটা সংক্ৰমণ ধাতু?"),
    "The valency of sodium is?":
        ("What is the valency of the element sodium?",
         "ছ'ডিয়াম মৌলৰ যোজনী কিমান?"),
    "The valency of oxygen is?":
        ("What is the valency of the element oxygen?",
         "অক্সিজেন মৌলৰ যোজনী কিমান?"),
    "The chemical formula of carbon dioxide is?":
        ("Write the chemical formula of carbon dioxide.",
         "কাৰ্বন ডাইঅক্সাইডৰ ৰাসায়নিক সংকেত লিখক।"),
    "The chemical formula of ammonia is?":
        ("Write the chemical formula of ammonia.",
         "এম'নিয়াৰ ৰাসায়নিক সংকেত লিখক।"),
    "The chemical formula of methane is?":
        ("Write the chemical formula of methane.",
         "মিথেনৰ ৰাসায়নিক সংকেত লিখক।"),
    "The chemical formula of ethanol is?":
        ("Write the chemical formula of ethanol.",
         "ইথানলৰ ৰাসায়নিক সংকেত লিখক।"),
    "The chemical formula of glucose is?":
        ("Write the chemical formula of glucose.",
         "গ্লুক'জৰ ৰাসায়নিক সংকেত লিখক।"),
    "Which acid is present in lemon?":
        ("Which acid is naturally found in lemon?",
         "লেমুত স্বাভাৱিকভাৱে কোন আম্ল পোৱা যায়?"),
    "Which of the following is used in the manufacture of glass?":
        ("Which one among these is a raw material for making glass?",
         "এইবোৰৰ কোনটো কাচ তৈয়াৰ কৰাৰ কেঁচামাল?"),
    "Which of the following is a thermosetting plastic?":
        ("Which one among these plastics is a thermosetting plastic?",
         "এইবোৰৰ কোনটো প্লাষ্টিক তাপ-দৃঢ় প্লাষ্টিক?"),
    "Which of the following is a thermoplastic?":
        ("Which one among these plastics is a thermoplastic?",
         "এইবোৰৰ কোনটো প্লাষ্টিক তাপ-নমনীয় প্লাষ্টিক?"),
    "Which of the following is a natural polymer?":
        ("Which one among these is a naturally occurring polymer?",
         "এইবোৰৰ কোনটো প্ৰাকৃতিকভাৱে পোৱা পলিমাৰ?"),
    "Which of the following is a synthetic polymer?":
        ("Which one among these is a man-made (synthetic) polymer?",
         "এইবোৰৰ কোনটো মানৱ-নিৰ্মিত (কৃত্ৰিম) পলিমাৰ?"),
    "Which of the following is a fossil fuel?":
        ("Which one among these fuels is a fossil fuel?",
         "এইবোৰৰ কোনটো ইন্ধন জীৱাশ্ম ইন্ধন?"),
    "Which metal is the best conductor of heat?":
        ("Which metal conducts heat better than all others?",
         "কোন ধাতুৱে আন সকলোতকৈ ভালদৰে তাপ পৰিবহন কৰে?"),
    "Which of the following is a good conductor of electricity?":
        ("Which one among these is a good conductor of electricity?",
         "এইবোৰৰ কোনটো বিদ্যুৎৰ সুপৰিবাহী?"),
    "Which of the following is an insulator?":
        ("Which one among these is an electrical insulator?",
         "এইবোৰৰ কোনটো বিদ্যুৎৰ অ-পৰিবাহী?"),
    "An acid turns blue litmus?":
        ("What colour does an acid turn blue litmus paper?",
         "আম্লই নীলা লিটমাছ কাগজক কি ৰঙলৈ সলনি কৰে?"),
    "A base turns red litmus?":
        ("What colour does a base turn red litmus paper?",
         "ক্ষাৰকে ৰঙা লিটমাছ কাগজক কি ৰঙলৈ সলনি কৰে?"),
    "Which of the following is used as an antacid?":
        ("Which one among these is commonly used as an antacid?",
         "এইবোৰৰ কোনটো সাধাৰণতে এণ্টাছিড ৰূপে ব্যৱহৃত হয়?"),
    "Which of the following is a greenhouse gas?":
        ("Which one among these gases is a greenhouse gas?",
         "এইবোৰৰ কোনটো গেছ এটা গ্ৰীণহাউছ গেছ?"),

    # ---- physics ----
    "The rate of change of displacement is called?":
        ("What is the rate of change of displacement known as?",
         "সৰণৰ পৰিৱৰ্তনৰ হাৰক কি বোলা হয়?"),
    "The rate of change of velocity is called?":
        ("What is the rate of change of velocity known as?",
         "বেগৰ পৰিৱৰ্তনৰ হাৰক কি বোলা হয়?"),
    "The acceleration due to gravity on Earth is approximately?":
        ("What is the approximate value of the acceleration due to gravity on Earth?",
         "পৃথিৱীত মাধ্যাকৰ্ষণ ত্বৰণৰ প্ৰায় মান কিমান?"),
    "The slope of a distance-time graph gives?":
        ("What does the slope of a distance-time graph represent?",
         "দূৰত্ব-সময় লেখৰ ঢালে কি প্ৰতিনিধিত্ব কৰে?"),
    "The product of mass and velocity is called?":
        ("What is the product of mass and velocity known as?",
         "ভৰ আৰু বেগৰ গুণফলক কি বোলা হয়?"),
    "The momentum of a body at rest is?":
        ("What is the momentum of a body that is at rest?",
         "বিশ্ৰামত থকা বস্তুৰ ভৰবেগ কিমান?"),
    "Which instrument is used to measure atmospheric pressure?":
        ("Name the instrument used to measure atmospheric pressure.",
         "বায়ুমণ্ডলীয় চাপ জুখিবলৈ ব্যৱহৃত যন্ত্ৰৰ নাম কি?"),
    "Archimedes' principle is related to?":
        ("With which phenomenon is Archimedes' principle associated?",
         "আৰ্কিমিডিছৰ নীতি কোন পৰিঘটনাৰ সৈতে জড়িত?"),
    "The density of water is maximum at?":
        ("At what temperature is the density of water the greatest?",
         "কোন উষ্ণতাত পানীৰ ঘনত্ব আটাইতকৈ বেছি হয়?"),
    "Work done is zero when the angle between force and displacement is?":
        ("For what angle between force and displacement is the work done zero?",
         "বল আৰু সৰণৰ মাজৰ কোন কোণত কাৰ্য শূন্য হয়?"),
    "A rainbow is formed due to?":
        ("A rainbow in the sky is formed because of what?",
         "আকাশত ৰামধেনু কিৰ বাবে গঠন হয়?"),
    "The image formed by a plane mirror is?":
        ("What type of image is formed by a plane mirror?",
         "সমতল দাপোণে কি ধৰণৰ প্ৰতিবিম্ব গঠন কৰে?"),
    "Optical fibre works on the principle of?":
        ("On which principle does an optical fibre operate?",
         "অপটিকেল ফাইবাৰ কোন নীতিত কাম কৰে?"),
    "Sound cannot travel through?":
        ("Through which of these media can sound not travel?",
         "এইবোৰৰ কোন মাধ্যমৰ মাজেদি শব্দ যাব নোৱাৰে?"),
    "The speed of sound is maximum in?":
        ("In which medium is the speed of sound the greatest?",
         "কোন মাধ্যমত শব্দৰ গতি আটাইতকৈ বেছি?"),
    "The loudness of sound is measured in?":
        ("In which unit is the loudness of sound measured?",
         "শব্দৰ প্ৰাবল্য কোন এককত জোখা হয়?"),
    "Heat is a form of?":
        ("Heat is a form of what?",
         "তাপ কিৰ এটা ৰূপ?"),
    "The SI unit of electric current is?":
        ("What is the SI unit used to measure electric current?",
         "বিদ্যুৎ প্ৰৱাহ জুখিবলৈ ব্যৱহৃত SI একক কি?"),
    "The SI unit of electric charge is?":
        ("What is the SI unit of electric charge?",
         "বিদ্যুৎ আধানৰ SI একক কি?"),
    "The device used to measure electric current is?":
        ("Name the device used to measure electric current.",
         "বিদ্যুৎ প্ৰৱাহ জুখিবলৈ ব্যৱহৃত যন্ত্ৰৰ নাম কি?"),
    "A fuse wire is used in an electric circuit to?":
        ("For what purpose is a fuse wire used in an electric circuit?",
         "বিদ্যুৎ বৰ্তনীত ফিউজ তাৰ কি উদ্দেশ্যে ব্যৱহৃত হয়?"),
    "The commercial unit of electrical energy is?":
        ("What is the commercial unit of electrical energy?",
         "বিদ্যুৎ শক্তিৰ ব্যৱসায়িক একক কি?"),
    "The device that converts electrical energy into mechanical energy is?":
        ("Which device converts electrical energy into mechanical energy?",
         "কোন যন্ত্ৰই বিদ্যুৎ শক্তিক যান্ত্ৰিক শক্তিলৈ ৰূপান্তৰ কৰে?"),
    "The filament of an electric bulb is made of?":
        ("Of which metal is the filament of an electric bulb made?",
         "বিদ্যুৎ বাল্বৰ ফিলামেণ্ট কোন ধাতুৰে তৈয়াৰী?"),
    "A transformer works on the principle of?":
        ("On which principle does a transformer work?",
         "ট্ৰান্সফৰ্মাৰ কোন নীতিত কাম কৰে?"),
    "The strength of an electromagnet can be increased by?":
        ("How can the strength of an electromagnet be increased?",
         "তড়িৎ চুম্বকৰ শক্তি কেনেকৈ বঢ়াব পাৰি?"),
    "X-rays were discovered by?":
        ("Who discovered X-rays?",
         "এক্স-ৰশ্মি কোনে আৱিষ্কাৰ কৰিছিল?"),
    "Radioactivity was discovered by?":
        ("Who discovered the phenomenon of radioactivity?",
         "ৰেডিঅ'সক্ৰিয়তা পৰিঘটনা কোনে আৱিষ্কাৰ কৰিছিল?"),
    "Which particle has no charge?":
        ("Which subatomic particle carries no electric charge?",
         "কোন উপ-পাৰমাণৱিক কণিকাই কোনো বিদ্যুৎ আধান বহন নকৰে?"),
    "The first Indian satellite was?":
        ("What was the name of India's first satellite?",
         "ভাৰতৰ প্ৰথম উপগ্ৰহৰ নাম কি আছিল?"),
    "ISRO was established in which year?":
        ("In which year was the Indian Space Research Organisation set up?",
         "ভাৰতীয় মহাকাশ গৱেষণা সংস্থা কোন বছৰত স্থাপন কৰা হৈছিল?"),
    "Which radiation has the highest penetrating power?":
        ("Which type of radiation has the greatest penetrating power?",
         "কোন ধৰণৰ বিকিৰণৰ ভেদন ক্ষমতা আটাইতকৈ বেছি?"),
    "Which of the following is used in solar cells?":
        ("Which one among these materials is used in solar cells?",
         "এইবোৰৰ কোনটো পদাৰ্থ ছ'লাৰ চেলত ব্যৱহৃত হয়?"),
    "Which of the following is a semiconductor?":
        ("Which one among these materials is a semiconductor?",
         "এইবোৰৰ কোনটো পদাৰ্থ এটা অৰ্ধপৰিবাহী?"),
    "Friction can be reduced by?":
        ("By which method can friction be reduced?",
         "কোন পদ্ধতিৰে ঘৰ্ষণ কমাব পাৰি?"),
    "Which of the following is a scalar quantity?":
        ("Which one among these is a scalar quantity?",
         "এইবোৰৰ কোনটো এটা স্কেলাৰ ৰাশি?"),
    "Which of the following is a vector quantity?":
        ("Which one among these is a vector quantity?",
         "এইবোৰৰ কোনটো এটা ভেক্টৰ ৰাশি?"),
    "The nearest star to the Earth after the Sun is?":
        ("Which star is nearest to the Earth after the Sun?",
         "সূৰ্যৰ পিছত পৃথিৱীৰ আটাইতকৈ ওচৰৰ তৰা কোনটো?"),
    "Which of the following is not a unit of energy?":
        ("Which one among these is not a unit of energy?",
         "এইবোৰৰ কোনটো শক্তিৰ একক নহয়?"),
    "1 kWh is equal to?":
        ("How many joules make one kilowatt-hour?",
         "এক কিল'ৱাট-ঘণ্টা কিমান জুলৰ সমান?"),
    "Which of the following is a non-renewable source of energy?":
        ("Which one among these is a non-renewable source of energy?",
         "এইবোৰৰ কোনটো অ-নৱীকৰণযোগ্য শক্তিৰ উৎস?"),
    "The power of a lens is measured in?":
        ("In which unit is the power of a lens expressed?",
         "লেন্ছৰ ক্ষমতা কোন এককত প্ৰকাশ কৰা হয়?"),
    "The SI unit of magnetic field is?":
        ("What is the SI unit of magnetic field?",
         "চুম্বক ক্ষেত্ৰৰ SI একক কি?"),
    "The voltage of household AC supply in India is about?":
        ("What is the approximate voltage of the household AC supply in India?",
         "ভাৰতত ঘৰুৱা AC যোগানৰ প্ৰায় ভল্টেজ কিমান?"),
    "If the length of a simple pendulum is increased, its time period?":
        ("What happens to the time period of a simple pendulum when its length is increased?",
         "সৰল দোলকৰ দীঘ বঢ়ালে ইয়াৰ আবৰ্তন কালৰ কি হয়?"),
    "The slope of a velocity-time graph gives?":
        ("What does the slope of a velocity-time graph represent?",
         "বেগ-সময় লেখৰ ঢালে কি প্ৰতিনিধিত্ব কৰে?"),
    "In a series combination of resistors, the current is?":
        ("What is the current through each resistor in a series combination?",
         "শ্ৰেণী সংযোগত প্ৰতিটো ৰোধকৰ মাজেৰে প্ৰৱাহ কেনেকুৱা?"),
    "The unit of radioactivity is?":
        ("What is the unit used to measure radioactivity?",
         "ৰেডিঅ'সক্ৰিয়তা জুখিবলৈ ব্যৱহৃত একক কি?"),
    "Alpha particles are?":
        ("What kind of electric charge do alpha particles carry?",
         "আলফা কণিকাই কি ধৰণৰ বিদ্যুৎ আধান বহন কৰে?"),
    "Beta particles are?":
        ("What kind of electric charge do beta particles carry?",
         "বিটা কণিকাই কি ধৰণৰ বিদ্যুৎ আধান বহন কৰে?"),

    # ---- general knowledge ----
    "Who is known as the Father of the Indian Constitution?":
        ("Who is regarded as the Father of the Constitution of India?",
         "ভাৰতৰ সংবিধানৰ জনক বুলি কাক গণ্য কৰা হয়?"),
    "How many members can the President of India nominate to the Rajya Sabha?":
        ("How many members may the President of India nominate to the Rajya Sabha?",
         "ভাৰতৰ ৰাষ্ট্ৰপতিয়ে ৰাজ্যসভালৈ কিমানজন সদস্য মনোনয়ন কৰিব পাৰে?"),
    "What is the maximum strength of the Lok Sabha?":
        ("What is the maximum permitted strength of the Lok Sabha?",
         "লোকসভাৰ সৰ্বাধিক অনুমোদিত সদস্য সংখ্যা কিমান?"),
    "Who is the constitutional head of the Indian State?":
        ("Who is regarded as the constitutional head of the Indian State?",
         "ভাৰত ৰাজ্যৰ সাংবিধানিক মুৰব্বী বুলি কাক গণ্য কৰা হয়?"),
    "Who appoints the Chief Justice of India?":
        ("By whom is the Chief Justice of India appointed?",
         "ভাৰতৰ প্ৰধান বিচাৰপতীক কোনে নিয়োগ কৰে?"),
    "Who was the first Chief Minister of Assam?":
        ("Who held the office of the first Chief Minister of Assam?",
         "অসমৰ প্ৰথম মুখ্যমন্ত্ৰীৰ পদত কোন আছিল?"),
    "Which is the largest city of Assam?":
        ("Name the biggest city in Assam.",
         "অসমৰ আটাইতকৈ ডাঙৰ নগৰৰ নাম কি?"),
    "Which river is known as the lifeline of Assam?":
        ("Which river is referred to as the lifeline of Assam?",
         "কোন নদীক অসমৰ জীৱনৰেখা বুলি কোৱা হয়?"),
    "Which is the state bird of Assam?":
        ("Name the state bird of Assam.",
         "অসমৰ ৰাজ্যিক চৰাইৰ নাম কি?"),
    "Which is the largest river island in the world, located in Assam?":
        ("Which river island in Assam is the largest of its kind in the world?",
         "অসমৰ কোন নদী-দ্বীপ বিশ্বৰ ভিতৰত আটাইতকৈ ডাঙৰ?"),
    "Which Assamese festival is celebrated as the harvest festival?":
        ("Which festival of Assam is observed as the harvest festival?",
         "অসমৰ কোন উৎসৱ শস্য-চপোৱা উৎসৱ ৰূপে পালন কৰা হয়?"),
    "Which is the longest river in India?":
        ("Name the longest river flowing in India.",
         "ভাৰতত বৈ যোৱা আটাইতকৈ দীঘল নদীৰ নাম কি?"),
    "Which is the highest mountain peak in India?":
        ("Name the highest mountain peak located within India.",
         "ভাৰতৰ ভিতৰত অৱস্থিত আটাইতকৈ উচ্চ পৰ্বত শিখৰৰ নাম কি?"),
    "Which is the largest state of India by area?":
        ("Which Indian state is the largest in terms of area?",
         "কালিৰ ফালৰ পৰা কোন ভাৰতীয় ৰাজ্য আটাইতকৈ ডাঙৰ?"),
    "The Tropic of Cancer passes through how many Indian states?":
        ("Through how many Indian states does the Tropic of Cancer pass?",
         "কৰ্কট ক্ৰান্তি ৰেখা ভাৰতৰ কিমানখন ৰাজ্যৰ মাজেৰে পাৰ হয়?"),
    "Which is the smallest state of India by area?":
        ("Which Indian state is the smallest in terms of area?",
         "কালিৰ ফালৰ পৰা কোন ভাৰতীয় ৰাজ্য আটাইতকৈ সৰু?"),
    "Which planet is known as the Red Planet?":
        ("Which planet of the solar system is called the Red Planet?",
         "সৌৰজগতৰ কোন গ্ৰহক ৰঙা গ্ৰহ বোলা হয়?"),
    "Which is the largest planet in the solar system?":
        ("Name the biggest planet of the solar system.",
         "সৌৰজগতৰ আটাইতকৈ ডাঙৰ গ্ৰহৰ নাম কি?"),
    "Which is the closest planet to the Sun?":
        ("Name the planet nearest to the Sun.",
         "সূৰ্যৰ আটাইতকৈ ওচৰৰ গ্ৰহৰ নাম কি?"),
    "Which is the highest gallantry award of India?":
        ("Name the highest gallantry award of India.",
         "ভাৰতৰ সৰ্বোচ্চ বীৰত্ব সন্মানৰ নাম কি?"),
    "How many players are there in a cricket team on the field?":
        ("How many players of a cricket team are on the field at a time?",
         "এক সময়ত এটা ক্ৰিকেট দলৰ কিমানজন খেলুৱৈ খেলপথাৰত থাকে?"),
    "How many players are there in a football team on the field?":
        ("How many players of a football team are on the field at a time?",
         "এক সময়ত এটা ফুটবল দলৰ কিমানজন খেলুৱৈ খেলপথাৰত থাকে?"),
    "Which day is celebrated as India's Independence Day?":
        ("On which date is India's Independence Day celebrated?",
         "কোন তাৰিখে ভাৰতৰ স্বাধীনতা দিৱস পালন কৰা হয়?"),
    "Which day is celebrated as India's Republic Day?":
        ("On which date is India's Republic Day celebrated?",
         "কোন তাৰিখে ভাৰতৰ গণৰাজ্য দিৱস পালন কৰা হয়?"),
    "World Water Day is observed on which date?":
        ("On which date is World Water Day observed every year?",
         "প্ৰতি বছৰে কোন তাৰিখে বিশ্ব জল দিৱস পালন কৰা হয়?"),
    "Which is the national animal of India?":
        ("Name the national animal of India.",
         "ভাৰতৰ ৰাষ্ট্ৰীয় জন্তুৰ নাম কি?"),
    "Which is the national bird of India?":
        ("Name the national bird of India.",
         "ভাৰতৰ ৰাষ্ট্ৰীয় চৰাইৰ নাম কি?"),
    "Which is the national flower of India?":
        ("Name the national flower of India.",
         "ভাৰতৰ ৰাষ্ট্ৰীয় ফুলৰ নাম কি?"),
    "Who was the first President of India?":
        ("Who held the office of the first President of India?",
         "ভাৰতৰ প্ৰথম ৰাষ্ট্ৰপতিৰ পদত কোন আছিল?"),
    "The Battle of Saraighat was fought in which year?":
        ("The historic Battle of Saraighat took place in which year?",
         "ঐতিহাসিক শৰাইঘাটৰ যুদ্ধ কোন বছৰত সংঘটিত হৈছিল?"),
    "The Treaty of Yandabo was signed in which year?":
        ("The historic Treaty of Yandabo was signed in which year?",
         "ঐতিহাসিক য়াণ্ডাবু সন্ধি কোন বছৰত স্বাক্ষৰিত হৈছিল?"),
    "Which is the capital of Assam?":
        ("Name the capital city of Assam.",
         "অসমৰ ৰাজধানী নগৰৰ নাম কি?"),

    # ---- general english ----
    "Choose the synonym of 'brave'.":
        ("Select the word closest in meaning to 'brave'.",
         "'brave' ৰ অৰ্থৰ আটাইতকৈ ওচৰৰ শব্দ বাছনি কৰক।"),
    "Choose the antonym of 'ancient'.":
        ("Select the word opposite in meaning to 'ancient'.",
         "'ancient' ৰ বিপৰীত অৰ্থৰ শব্দ বাছনি কৰক।"),
    "Choose the synonym of 'abundant'.":
        ("Select the word closest in meaning to 'abundant'.",
         "'abundant' ৰ অৰ্থৰ আটাইতকৈ ওচৰৰ শব্দ বাছনি কৰক।"),
    "Choose the antonym of 'victory'.":
        ("Select the word opposite in meaning to 'victory'.",
         "'victory' ৰ বিপৰীত অৰ্থৰ শব্দ বাছনি কৰক।"),
    "Choose the correctly spelt word.":
        ("Select the option that is spelt correctly.",
         "শুদ্ধ বানানৰ বিকল্পটো বাছনি কৰক।"),
    "Choose the correct sentence.":
        ("Select the sentence that is grammatically correct.",
         "ব্যাকৰণগতভাৱে শুদ্ধ বাক্যটো বাছনি কৰক।"),

    # ---- logical reasoning ----
    "Pointing to a man, a woman said, 'He is the son of my mother.' How is the man related to the woman?":
        ("A woman pointing at a man says, 'He is my mother's son.' What is the man to the woman?",
         "এগৰাকী মহিলাই এজন মানুহলৈ আঙুলিয়াই কয়, 'তেওঁ মোৰ মাকৰ পুত্ৰ।' মহিলাগৰাকীৰ সৈতে মানুহজনৰ সম্পৰ্ক কি?"),
    "A is the father of B. B is the sister of C. How is A related to C?":
        ("A is B's father and B is C's sister. What is A to C?",
         "A, B ৰ পিতৃ আৰু B, C ৰ ভগ্নী। C ৰ সৈতে A ৰ সম্পৰ্ক কি?"),
    "How many times do the hands of a clock coincide in 12 hours?":
        ("In a period of 12 hours, how many times do the two hands of a clock overlap?",
         "১২ ঘণ্টাৰ কালছোৱাত ঘড়ীৰ দুটা কাঁটা কিমানবাৰ ওপৰা-উপৰি হয়?"),
    "What is the angle between the hands of a clock at 3 o'clock?":
        ("At exactly 3 o'clock, what is the angle between the two hands of a clock?",
         "ঠিক ৩ বজাত ঘড়ীৰ দুটা কাঁটাৰ মাজৰ কোণ কিমান?"),
}


def apply_reword(rows):
    """Replace any stem that duplicates existing site wording with its reworded
    twin from REWORD, keeping the options, key and explanations intact."""
    for r in rows:
        fix = REWORD.get(r["en"])
        if fix:
            r["en"], r["as"] = fix
    return rows
