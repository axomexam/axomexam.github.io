"""Technical-science / Chemistry - 130 fresh bilingual questions."""
from .common import R


def rows():
    r = []
    A = r.append

    # ---- Matter & atomic structure ----
    A(R("Which of the following is a noble gas?",
        "তলৰ কোনটো নিষ্ক্ৰিয় গেছ?",
        [("Argon", "আৰ্গন"), ("Oxygen", "অক্সিজেন"), ("Chlorine", "ক্ল'ৰিন"), ("Hydrogen", "হাইড্ৰ'জেন")], 0,
        "Argon is a noble gas with a stable electronic configuration.",
        "আৰ্গন এটা নিষ্ক্ৰিয় গেছ, যাৰ সুস্থিৰ ইলেক্ট্ৰন বিন্যাস আছে।"))
    A(R("The number of neutrons in a carbon-12 atom is?",
        "কাৰ্বন-১২ পৰমাণুত কিমানটা নিউট্ৰন থাকে?",
        [("6", "৬"), ("12", "১২"), ("7", "৭"), ("8", "৮")], 0,
        "Carbon-12 has 6 protons and 6 neutrons.",
        "কাৰ্বন-১২ ত ৬ টা প্ৰ'টন আৰু ৬ টা নিউট্ৰন থাকে।"))
    A(R("Which particle is present in the nucleus of an atom?",
        "পৰমাণুৰ নিউক্লিয়াছত কোন কণিকা থাকে?",
        [("Protons and neutrons", "প্ৰ'টন আৰু নিউট্ৰন"), ("Only electrons", "কেৱল ইলেক্ট্ৰন"), ("Only protons", "কেৱল প্ৰ'টন"), ("Electrons and protons", "ইলেক্ট্ৰন আৰু প্ৰ'টন")], 0,
        "The nucleus contains protons and neutrons.",
        "নিউক্লিয়াছত প্ৰ'টন আৰু নিউট্ৰন থাকে।"))
    A(R("The atomic number of an element is equal to the number of?",
        "কোনো মৌলৰ পাৰমাণৱিক সংখ্যা কিৰ সংখ্যাৰ সমান?",
        [("Protons", "প্ৰ'টন"), ("Neutrons", "নিউট্ৰন"), ("Nucleons", "নিউক্লিয়ন"), ("Electrons plus neutrons", "ইলেক্ট্ৰন আৰু নিউট্ৰন")], 0,
        "The atomic number equals the number of protons in the nucleus.",
        "পাৰমাণৱিক সংখ্যা নিউক্লিয়াছৰ প্ৰ'টনৰ সংখ্যাৰ সমান।"))
    A(R("Which of the following is an isotope of hydrogen?",
        "তলৰ কোনটো হাইড্ৰ'জেনৰ আইছ'ট'প?",
        [("Deuterium", "ডিউটেৰিয়াম"), ("Helium", "হিলিয়াম"), ("Lithium", "লিথিয়াম"), ("Neon", "নিয়ন")], 0,
        "Deuterium is an isotope of hydrogen with one neutron.",
        "ডিউটেৰিয়াম হাইড্ৰ'জেনৰ এটা আইছ'ট'প, যাৰ এটা নিউট্ৰন থাকে।"))
    A(R("The maximum number of electrons that can occupy the first shell is?",
        "প্ৰথম কক্ষত সৰ্বাধিক কিমানটা ইলেক্ট্ৰন থাকিব পাৰে?",
        [("2", "২"), ("8", "৮"), ("18", "১৮"), ("4", "৪")], 0,
        "The first shell can hold a maximum of 2 electrons.",
        "প্ৰথম কক্ষত সৰ্বাধিক ২ টা ইলেক্ট্ৰন থাকিব পাৰে।"))

    # ---- Chemical bonding ----
    A(R("Which type of bond is formed between sodium and chlorine in common salt?",
        "সাধাৰণ নিমখত ছ'ডিয়াম আৰু ক্ল'ৰিনৰ মাজত কোন ধৰণৰ বান্ধোন গঠন হয়?",
        [("Ionic bond", "আয়নীয় বান্ধোন"), ("Covalent bond", "সমযোজী বান্ধোন"), ("Metallic bond", "ধাতৱীয় বান্ধোন"), ("Hydrogen bond", "হাইড্ৰ'জেন বান্ধোন")], 0,
        "Sodium chloride is formed by an ionic bond from the transfer of an electron.",
        "ছ'ডিয়াম ক্ল'ৰাইড ইলেক্ট্ৰন স্থানান্তৰণৰ জৰিয়তে আয়নীয় বান্ধোনেৰে গঠিত।"))
    A(R("A covalent bond is formed by the?",
        "সমযোজী বান্ধোন কিৰ জৰিয়তে গঠন হয়?",
        [("Sharing of electrons", "ইলেক্ট্ৰন ভাগ কৰি"), ("Transfer of electrons", "ইলেক্ট্ৰন স্থানান্তৰণেৰে"), ("Loss of protons", "প্ৰ'টন হেৰুৱাই"), ("Gain of neutrons", "নিউট্ৰন লাভ কৰি")], 0,
        "A covalent bond is formed by sharing of electrons between atoms.",
        "সমযোজী বান্ধোন পৰমাণুবোৰৰ মাজত ইলেক্ট্ৰন ভাগ কৰি গঠন হয়।"))
    A(R("Which of the following is an example of a covalent compound?",
        "তলৰ কোনটো এটা সমযোজী যৌগৰ উদাহৰণ?",
        [("Methane", "মিথেন"), ("Sodium chloride", "ছ'ডিয়াম ক্ল'ৰাইড"), ("Potassium chloride", "পটাছিয়াম ক্ল'ৰাইড"), ("Calcium oxide", "কেলচিয়াম অক্সাইড")], 0,
        "Methane is a covalent compound formed by sharing electrons.",
        "মিথেন ইলেক্ট্ৰন ভাগ কৰি গঠিত এটা সমযোজী যৌগ।"))

    # ---- Acids, bases & salts ----
    A(R("Which acid is present in vinegar?",
        "ভিনেগাৰত কোন আম্ল থাকে?",
        [("Acetic acid", "এছেটিক আম্ল"), ("Citric acid", "চিট্ৰিক আম্ল"), ("Lactic acid", "লেক্টিক আম্ল"), ("Formic acid", "ফৰ্মিক আম্ল")], 0,
        "Vinegar contains acetic acid.",
        "ভিনেগাৰত এছেটিক আম্ল থাকে।"))
    A(R("Which acid is used in car batteries?",
        "গাড়ীৰ বেটেৰীত কোন আম্ল ব্যৱহৃত হয়?",
        [("Sulphuric acid", "ছালফিউৰিক আম্ল"), ("Hydrochloric acid", "হাইড্ৰ'ক্লৰিক আম্ল"), ("Nitric acid", "নাইট্ৰিক আম্ল"), ("Citric acid", "চিট্ৰিক আম্ল")], 0,
        "Sulphuric acid is used as the electrolyte in lead-acid car batteries.",
        "ছীহ-আম্ল বেটেৰীত ছালফিউৰিক আম্ল বিদ্যুৎ-বিশ্লেষ্য ৰূপে ব্যৱহৃত হয়।"))
    A(R("What is the pH value of a neutral solution?",
        "এটা প্ৰশম দ্ৰৱৰ pH মান কিমান?",
        [("7", "৭"), ("0", "০"), ("14", "১৪"), ("1", "১")], 0,
        "A neutral solution has a pH of 7.",
        "প্ৰশম দ্ৰৱৰ pH মান ৭।"))
    A(R("What happens to the pH when an acid is added to water?",
        "পানীত আম্ল যোগ কৰিলে pH মানৰ কি হয়?",
        [("It decreases", "কমি যায়"), ("It increases", "বাঢ়ি যায়"), ("It remains 7", "৭ হৈয়ে থাকে"), ("It becomes 14", "১৪ হয়")], 0,
        "Adding an acid decreases the pH below 7.",
        "আম্ল যোগ কৰিলে pH ৭ ৰ তললৈ কমি যায়।"))
    A(R("Which of the following is a strong base?",
        "তলৰ কোনটো এটা প্ৰবল ক্ষাৰক?",
        [("Sodium hydroxide", "ছ'ডিয়াম হাইড্ৰ'ক্সাইড"), ("Ammonium hydroxide", "এম'নিয়াম হাইড্ৰ'ক্সাইড"), ("Acetic acid", "এছেটিক আম্ল"), ("Carbonic acid", "কাৰ্বনিক আম্ল")], 0,
        "Sodium hydroxide is a strong base that fully dissociates in water.",
        "ছ'ডিয়াম হাইড্ৰ'ক্সাইড এটা প্ৰবল ক্ষাৰক, পানীত সম্পূৰ্ণৰূপে বিয়োজিত হয়।"))
    A(R("Which gas is released when an acid reacts with a metal?",
        "আম্লই ধাতুৰ সৈতে বিক্ৰিয়া কৰিলে কোন গেছ নিৰ্গত হয়?",
        [("Hydrogen", "হাইড্ৰ'জেন"), ("Oxygen", "অক্সিজেন"), ("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Nitrogen", "নাইট্ৰ'জেন")], 0,
        "Acids react with metals to release hydrogen gas.",
        "আম্লই ধাতুৰ সৈতে বিক্ৰিয়া কৰি হাইড্ৰ'জেন গেছ নিৰ্গত কৰে।"))
    A(R("Which gas turns limewater milky?",
        "কোন গেছে চূণপানী ঘোলা কৰে?",
        [("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Oxygen", "অক্সিজেন"), ("Hydrogen", "হাইড্ৰ'জেন"), ("Nitrogen", "নাইট্ৰ'জেন")], 0,
        "Carbon dioxide turns limewater milky by forming calcium carbonate.",
        "কাৰ্বন ডাইঅক্সাইডে কেলচিয়াম কাৰ্বনেট গঠন কৰি চূণপানী ঘোলা কৰে।"))
    A(R("What is the chemical formula of common salt?",
        "সাধাৰণ নিমখৰ ৰাসায়নিক সংকেত কি?",
        [("NaCl", "NaCl"), ("KCl", "KCl"), ("CaCl2", "CaCl₂"), ("MgCl2", "MgCl₂")], 0,
        "Common salt is sodium chloride, NaCl.",
        "সাধাৰণ নিমখ হৈছে ছ'ডিয়াম ক্ল'ৰাইড, NaCl।"))
    A(R("What is the chemical formula of baking soda?",
        "বেকিং ছ'ডাৰ ৰাসায়নিক সংকেত কি?",
        [("NaHCO3", "NaHCO₃"), ("Na2CO3", "Na₂CO₃"), ("CaCO3", "CaCO₃"), ("NaOH", "NaOH")], 0,
        "Baking soda is sodium bicarbonate, NaHCO3.",
        "বেকিং ছ'ডা হৈছে ছ'ডিয়াম বাইকাৰ্বনেট, NaHCO₃।"))
    A(R("What is the chemical formula of washing soda?",
        "ৱাছিং ছ'ডাৰ ৰাসায়নিক সংকেত কি?",
        [("Na2CO3.10H2O", "Na₂CO₃·১০H₂O"), ("NaHCO3", "NaHCO₃"), ("CaCO3", "CaCO₃"), ("NaCl", "NaCl")], 0,
        "Washing soda is hydrated sodium carbonate.",
        "ৱাছিং ছ'ডা হৈছে জলযুক্ত ছ'ডিয়াম কাৰ্বনেট।"))
    A(R("What is the chemical formula of plaster of Paris?",
        "প্লাষ্টাৰ অৱ পেৰিছৰ ৰাসায়নিক সংকেত কি?",
        [("CaSO4.1/2H2O", "CaSO₄·½H₂O"), ("CaSO4.2H2O", "CaSO₄·২H₂O"), ("CaCO3", "CaCO₃"), ("CaO", "CaO")], 0,
        "Plaster of Paris is calcium sulphate hemihydrate.",
        "প্লাষ্টাৰ অৱ পেৰিছ হৈছে কেলচিয়াম ছালফেট হেমিহাইড্ৰেট।"))

    # ---- Metals & non-metals ----
    A(R("Which metal is liquid at room temperature?",
        "কোন ধাতু কোঠৰ তাপমাত্ৰাত তৰল?",
        [("Mercury", "পাৰা"), ("Sodium", "ছ'ডিয়াম"), ("Aluminium", "এলুমিনিয়াম"), ("Iron", "লো")], 0,
        "Mercury is the only metal that is liquid at room temperature.",
        "পাৰা একমাত্ৰ ধাতু যি কোঠৰ তাপমাত্ৰাত তৰল।"))
    A(R("Which non-metal is a good conductor of electricity?",
        "কোন অধাতু বিদ্যুৎৰ সুপৰিবাহী?",
        [("Graphite", "গ্ৰেফাইট"), ("Sulphur", "ছালফাৰ"), ("Phosphorus", "ফছফৰাছ"), ("Iodine", "আয়'ডিন")], 0,
        "Graphite, a form of carbon, conducts electricity.",
        "গ্ৰেফাইট, কাৰ্বনৰ এটা ৰূপ, বিদ্যুৎ পৰিবহন কৰে।"))
    A(R("Which metal is the best conductor of electricity?",
        "কোন ধাতু বিদ্যুৎৰ শ্ৰেষ্ঠ পৰিবাহী?",
        [("Silver", "ৰূপ"), ("Copper", "তাম"), ("Aluminium", "এলুমিনিয়াম"), ("Iron", "লো")], 0,
        "Silver is the best conductor of electricity.",
        "ৰূপ বিদ্যুৎৰ শ্ৰেষ্ঠ পৰিবাহী।"))
    A(R("The process of coating iron with zinc to prevent rusting is called?",
        "মামৰ প্ৰতিৰোধৰ বাবে লোত জিংকৰ আৱৰণ দিয়া প্ৰক্ৰিয়াক কি বোলা হয়?",
        [("Galvanisation", "গেলভানাইজেচন"), ("Electroplating", "তড়িৎলেপন"), ("Alloying", "মিশ্ৰধাতু"), ("Anodising", "এন'ডাইজিং")], 0,
        "Galvanisation is coating iron with zinc to prevent rust.",
        "গেলভানাইজেচন হৈছে মামৰ প্ৰতিৰোধৰ বাবে লোত জিংকৰ আৱৰণ দিয়া।"))
    A(R("Which of the following is an alloy of copper and zinc?",
        "তলৰ কোনটো তাম আৰু জিংকৰ মিশ্ৰধাতু?",
        [("Brass", "পিতল"), ("Bronze", "কাঁহ"), ("Steel", "ষ্টীল"), ("Solder", "ছ'ল্ডাৰ")], 0,
        "Brass is an alloy of copper and zinc.",
        "পিতল তাম আৰু জিংকৰ মিশ্ৰধাতু।"))
    A(R("Which of the following is an alloy of copper and tin?",
        "তলৰ কোনটো তাম আৰু টিনৰ মিশ্ৰধাতু?",
        [("Bronze", "কাঁহ"), ("Brass", "পিতল"), ("Steel", "ষ্টীল"), ("Duralumin", "ডিউৰালুমিন")], 0,
        "Bronze is an alloy of copper and tin.",
        "কাঁহ তাম আৰু টিনৰ মিশ্ৰধাতু।"))
    A(R("Which ore is the main source of aluminium?",
        "এলুমিনিয়ামৰ মূল উৎস কোন আয়াস্ক?",
        [("Bauxite", "বক্সাইট"), ("Haematite", "হিমাটাইট"), ("Galena", "গেলেনা"), ("Cinnabar", "ছিনাবাৰ")], 0,
        "Bauxite is the principal ore of aluminium.",
        "বক্সাইট এলুমিনিয়ামৰ প্ৰধান আয়াস্ক।"))
    A(R("Which ore is the main source of iron?",
        "লোৰ মূল উৎস কোন আয়াস্ক?",
        [("Haematite", "হিমাটাইট"), ("Bauxite", "বক্সাইট"), ("Galena", "গেলেনা"), ("Cinnabar", "ছিনাবাৰ")], 0,
        "Haematite is the main ore of iron.",
        "হিমাটাইট লোৰ মূল আয়াস্ক।"))
    A(R("Rusting of iron is caused by the presence of?",
        "লোৰ মামৰ কাৰণ কিৰ উপস্থিতি?",
        [("Oxygen and moisture", "অক্সিজেন আৰু আৰ্দ্ৰতা"), ("Nitrogen only", "কেৱল নাইট্ৰ'জেন"), ("Carbon dioxide only", "কেৱল কাৰ্বন ডাইঅক্সাইড"), ("Helium", "হিলিয়াম")], 0,
        "Rusting occurs when iron is exposed to oxygen and moisture.",
        "লো অক্সিজেন আৰু আৰ্দ্ৰতাৰ সংস্পৰ্শত আহিলে মামৰ ধৰে।"))

    # ---- Carbon & organic chemistry ----
    A(R("Which of the following is the main constituent of biogas?",
        "তলৰ কোনটো বায়'গেছৰ মূল উপাদান?",
        [("Methane", "মিথেন"), ("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Hydrogen", "হাইড্ৰ'জেন"), ("Nitrogen", "নাইট্ৰ'জেন")], 0,
        "Biogas contains mainly methane.",
        "বায়'গেছত মূলতঃ মিথেন থাকে।"))
    A(R("Which of the following is a saturated hydrocarbon?",
        "তলৰ কোনটো এটা সম্পৃক্ত হাইড্ৰ'কাৰ্বন?",
        [("Ethane", "ইথেন"), ("Ethene", "ইথিন"), ("Ethyne", "ইথাইন"), ("Benzene", "বেনজিন")], 0,
        "Ethane is a saturated hydrocarbon with single bonds only.",
        "ইথেন এটা সম্পৃক্ত হাইড্ৰ'কাৰ্বন, য'ত কেৱল একক বান্ধোন থাকে।"))
    A(R("Which of the following is an unsaturated hydrocarbon?",
        "তলৰ কোনটো এটা অসম্পৃক্ত হাইড্ৰ'কাৰ্বন?",
        [("Ethene", "ইথিন"), ("Ethane", "ইথেন"), ("Methane", "মিথেন"), ("Propane", "প্ৰ'পেন")], 0,
        "Ethene contains a double bond and is unsaturated.",
        "ইথিনত দ্বৈত বান্ধোন থাকে, সেয়ে ই অসম্পৃক্ত।"))
    A(R("The functional group -OH is present in?",
        "-OH কাৰ্যকৰী গোট কিৰ উপস্থিত থাকে?",
        [("Alcohols", "এলকহল"), ("Carboxylic acids", "কাৰ্বক্সিলিক আম্ল"), ("Aldehydes", "এলডিহাইড"), ("Ketones", "কিট'ন")], 0,
        "The hydroxyl (-OH) group is present in alcohols.",
        "হাইড্ৰ'ক্সিল (-OH) গোট এলকহলত উপস্থিত থাকে।"))
    A(R("Which gas is used in soft drinks to give them fizz?",
        "কোমল পানীয়ত ফেন সৃষ্টি কৰিবলৈ কোন গেছ ব্যৱহৃত হয়?",
        [("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Argon", "আৰ্গন")], 0,
        "Carbon dioxide dissolved under pressure gives soft drinks their fizz.",
        "চাপত দ্ৰৱীভূত কাৰ্বন ডাইঅক্সাইডে কোমল পানীয়ত ফেন সৃষ্টি কৰে।"))
    A(R("Which of the following is the general formula of alkenes?",
        "তলৰ কোনটো এলকিনৰ সাধাৰণ সংকেত?",
        [("CnH2n", "CnH2n"), ("CnH2n+2", "CnH2n+2"), ("CnH2n-2", "CnH2n-2"), ("CnHn", "CnHn")], 0,
        "The general formula of alkenes is CnH2n.",
        "এলকিনৰ সাধাৰণ সংকেত CnH2n।"))

    # ---- Everyday chemistry ----
    A(R("Which substance is used as a common disinfectant in water treatment?",
        "পানী শোধনত সাধাৰণ জীৱাণুনাশক ৰূপে কোন পদাৰ্থ ব্যৱহৃত হয়?",
        [("Chlorine", "ক্ল'ৰিন"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Hydrogen", "হাইড্ৰ'জেন")], 0,
        "Chlorine is widely used to disinfect water.",
        "ক্ল'ৰিন পানী জীৱাণুমুক্ত কৰিবলৈ বহুলভাৱে ব্যৱহৃত হয়।"))
    A(R("Which chemical is used as a preservative in pickles?",
        "আচাৰত সংৰক্ষক ৰূপে কোন ৰাসায়নিক ব্যৱহৃত হয়?",
        [("Vinegar", "ভিনেগাৰ"), ("Sugar", "চেনি"), ("Salt", "নিমখ"), ("Water", "পানী")], 0,
        "Vinegar, containing acetic acid, acts as a preservative in pickles.",
        "এছেটিক আম্ল থকা ভিনেগাৰে আচাৰত সংৰক্ষক ৰূপে কাম কৰে।"))
    A(R("Which substance is used in the manufacture of soap?",
        "চাবোন উৎপাদনত কোন পদাৰ্থ ব্যৱহৃত হয়?",
        [("Sodium hydroxide", "ছ'ডিয়াম হাইড্ৰ'ক্সাইড"), ("Hydrochloric acid", "হাইড্ৰ'ক্লৰিক আম্ল"), ("Sulphuric acid", "ছালফিউৰিক আম্ল"), ("Ammonia", "এম'নিয়া")], 0,
        "Sodium hydroxide is used in soap manufacture.",
        "ছ'ডিয়াম হাইড্ৰ'ক্সাইড চাবোন উৎপাদনত ব্যৱহৃত হয়।"))
    A(R("Which gas is used in electric bulbs?",
        "বিদ্যুৎ বাল্বত কোন গেছ ব্যৱহৃত হয়?",
        [("Argon", "আৰ্গন"), ("Oxygen", "অক্সিজেন"), ("Hydrogen", "হাইড্ৰ'জেন"), ("Chlorine", "ক্ল'ৰিন")], 0,
        "Argon, an inert gas, is used in electric bulbs.",
        "নিষ্ক্ৰিয় গেছ আৰ্গন বিদ্যুৎ বাল্বত ব্যৱহৃত হয়।"))
    A(R("Which gas is used in fire extinguishers?",
        "অগ্নি-নির্বাপক যন্ত্ৰত কোন গেছ ব্যৱহৃত হয়?",
        [("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Oxygen", "অক্সিজেন"), ("Hydrogen", "হাইড্ৰ'জেন"), ("Methane", "মিথেন")], 0,
        "Carbon dioxide is used in fire extinguishers as it does not support combustion.",
        "কাৰ্বন ডাইঅক্সাইড অগ্নি-নির্বাপক যন্ত্ৰত ব্যৱহৃত হয় কাৰণ ই দহনত সহায় নকৰে।"))
    A(R("Which gas is filled in balloons to make them float?",
        "বেলুন উৰুৱাবলৈ তাত কোন গেছ ভৰোৱা হয়?",
        [("Helium", "হিলিয়াম"), ("Oxygen", "অক্সিজেন"), ("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Nitrogen", "নাইট্ৰ'জেন")], 0,
        "Helium is lighter than air and is used in balloons.",
        "হিলিয়াম বায়ুতকৈ পাতল, সেয়ে বেলুনত ব্যৱহৃত হয়।"))
    A(R("Which gas is known as laughing gas?",
        "কোন গেছক হাঁহিৰ গেছ বোলা হয়?",
        [("Nitrous oxide", "নাইট্ৰাছ অক্সাইড"), ("Nitric oxide", "নাইট্ৰিক অক্সাইড"), ("Ammonia", "এম'নিয়া"), ("Methane", "মিথেন")], 0,
        "Nitrous oxide is known as laughing gas.",
        "নাইট্ৰাছ অক্সাইডক হাঁহিৰ গেছ বোলা হয়।"))
    A(R("Which substance is known as the universal solvent?",
        "কোন পদাৰ্থক সৰ্বজনীন দ্ৰাৱক বোলা হয়?",
        [("Water", "পানী"), ("Alcohol", "এলকহল"), ("Petrol", "পেট্ৰ'ল"), ("Acetone", "এছিট'ন")], 0,
        "Water is called the universal solvent as it dissolves many substances.",
        "পানীয়ে বহু পদাৰ্থ দ্ৰৱীভূত কৰে, সেয়ে ইয়াক সৰ্বজনীন দ্ৰাৱক বোলা হয়।"))
    A(R("Which chemical is used in photographic films?",
        "ফটোগ্ৰাফিক ফিল্মত কোন ৰাসায়নিক ব্যৱহৃত হয়?",
        [("Silver bromide", "ছিলভাৰ ব্ৰ'মাইড"), ("Sodium chloride", "ছ'ডিয়াম ক্ল'ৰাইড"), ("Calcium carbonate", "কেলচিয়াম কাৰ্বনেট"), ("Potassium nitrate", "পটাছিয়াম নাইট্ৰেট")], 0,
        "Silver bromide is light-sensitive and used in photographic films.",
        "ছিলভাৰ ব্ৰ'মাইড পোহৰ-সংবেদনশীল, সেয়ে ফটোগ্ৰাফিক ফিল্মত ব্যৱহৃত হয়।"))

    # ---- Gases & atmosphere ----
    A(R("Which gas is most abundant in the Earth's atmosphere?",
        "পৃথিৱীৰ বায়ুমণ্ডলত কোন গেছ সৰ্বাধিক পৰিমাণে আছে?",
        [("Nitrogen", "নাইট্ৰ'জেন"), ("Oxygen", "অক্সিজেন"), ("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Argon", "আৰ্গন")], 0,
        "Nitrogen makes up about 78 percent of the atmosphere.",
        "নাইট্ৰ'জেনে বায়ুমণ্ডলৰ প্ৰায় ৭৮ শতাংশ গঠন কৰে।"))
    A(R("Which gas is essential for combustion?",
        "দহনৰ বাবে কোন গেছ অত্যাৱশ্যক?",
        [("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Helium", "হিলিয়াম")], 0,
        "Oxygen supports combustion.",
        "অক্সিজেনে দহনত সহায় কৰে।"))
    A(R("The percentage of oxygen in the air is about?",
        "বায়ুত অক্সিজেনৰ শতাংশ প্ৰায় কিমান?",
        [("21", "২১"), ("78", "৭৮"), ("50", "৫০"), ("1", "১")], 0,
        "Oxygen makes up about 21 percent of air.",
        "অক্সিজেনে বায়ুৰ প্ৰায় ২১ শতাংশ গঠন কৰে।"))
    A(R("Which gas is used in the manufacture of ammonia by the Haber process?",
        "হেবাৰ প্ৰক্ৰিয়াত এম'নিয়া উৎপাদনত কোন গেছ ব্যৱহৃত হয়?",
        [("Nitrogen and hydrogen", "নাইট্ৰ'জেন আৰু হাইড্ৰ'জেন"), ("Oxygen and hydrogen", "অক্সিজেন আৰু হাইড্ৰ'জেন"), ("Nitrogen and oxygen", "নাইট্ৰ'জেন আৰু অক্সিজেন"), ("Carbon and oxygen", "কাৰ্বন আৰু অক্সিজেন")], 0,
        "Ammonia is made from nitrogen and hydrogen in the Haber process.",
        "হেবাৰ প্ৰক্ৰিয়াত নাইট্ৰ'জেন আৰু হাইড্ৰ'জেনৰ পৰা এম'নিয়া তৈয়াৰ হয়।"))
    A(R("Which gas causes acid rain?",
        "কোন গেছে আম্ল বৰষুণ ঘটায়?",
        [("Sulphur dioxide", "ছালফাৰ ডাইঅক্সাইড"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Helium", "হিলিয়াম")], 0,
        "Sulphur dioxide and nitrogen oxides cause acid rain.",
        "ছালফাৰ ডাইঅক্সাইড আৰু নাইট্ৰ'জেন অক্সাইডে আম্ল বৰষুণ ঘটায়।"))

    # ---- Reactions & equations ----
    A(R("Which of the following is a physical change?",
        "তলৰ কোনটো এটা ভৌতিক পৰিৱৰ্তন?",
        [("Melting of ice", "বৰফ গলি যোৱা"), ("Rusting of iron", "লো মামৰে ধৰা"), ("Burning of paper", "কাগজ জ্বলোৱা"), ("Souring of milk", "গাখীৰ টেঙা হোৱা")], 0,
        "Melting of ice is a physical change as it is reversible and no new substance forms.",
        "বৰফ গলি যোৱা ভৌতিক পৰিৱৰ্তন, কাৰণ ই প্ৰত্যাৱৰ্তনীয় আৰু নতুন পদাৰ্থ গঠন নহয়।"))
    A(R("Which of the following is a chemical change?",
        "তলৰ কোনটো এটা ৰাসায়নিক পৰিৱৰ্তন?",
        [("Rusting of iron", "লো মামৰে ধৰা"), ("Melting of wax", "মম গলি যোৱা"), ("Boiling of water", "পানী উতলোৱা"), ("Cutting of paper", "কাগজ কটা")], 0,
        "Rusting is a chemical change forming a new substance.",
        "মামৰ ধৰা ৰাসায়নিক পৰিৱৰ্তন, য'ত নতুন পদাৰ্থ গঠন হয়।"))
    A(R("A reaction in which heat is released is called?",
        "যি বিক্ৰিয়াত তাপ নিৰ্গত হয় তাক কি বোলা হয়?",
        [("Exothermic reaction", "তাপনিৰ্গমী বিক্ৰিয়া"), ("Endothermic reaction", "তাপশোষী বিক্ৰিয়া"), ("Neutralisation", "প্ৰশমন"), ("Oxidation", "জাৰণ")], 0,
        "An exothermic reaction releases heat.",
        "তাপনিৰ্গমী বিক্ৰিয়াত তাপ নিৰ্গত হয়।"))
    A(R("A reaction in which heat is absorbed is called?",
        "যি বিক্ৰিয়াত তাপ শোষিত হয় তাক কি বোলা হয়?",
        [("Endothermic reaction", "তাপশোষী বিক্ৰিয়া"), ("Exothermic reaction", "তাপনিৰ্গমী বিক্ৰিয়া"), ("Displacement", "স্থানচ্যুতি"), ("Combustion", "দহন")], 0,
        "An endothermic reaction absorbs heat.",
        "তাপশোষী বিক্ৰিয়াত তাপ শোষিত হয়।"))
    A(R("The reaction between an acid and a base is called?",
        "আম্ল আৰু ক্ষাৰকৰ মাজৰ বিক্ৰিয়াক কি বোলা হয়?",
        [("Neutralisation", "প্ৰশমন"), ("Oxidation", "জাৰণ"), ("Reduction", "বিজাৰণ"), ("Combustion", "দহন")], 0,
        "An acid and a base react to form salt and water in neutralisation.",
        "প্ৰশমনত আম্ল আৰু ক্ষাৰকে বিক্ৰিয়া কৰি নিমখ আৰু পানী গঠন কৰে।"))
    A(R("The law of conservation of mass states that mass can neither be created nor?",
        "ভৰ সংৰক্ষণ বিধি অনুসৰি ভৰ সৃষ্টি নহয় আৰু কি নহয়?",
        [("Destroyed", "ধ্বংস"), ("Transferred", "স্থানান্তৰিত"), ("Converted", "ৰূপান্তৰিত"), ("Multiplied", "বহুগুণিত")], 0,
        "Mass can neither be created nor destroyed in a chemical reaction.",
        "ৰাসায়নিক বিক্ৰিয়াত ভৰ সৃষ্টি বা ধ্বংস নহয়।"))

    # ---- Solutions & mixtures ----
    A(R("A homogeneous mixture of two or more substances is called?",
        "দুই বা অধিক পদাৰ্থৰ সমসত্ব মিশ্ৰণক কি বোলা হয়?",
        [("Solution", "দ্ৰৱ"), ("Suspension", "নিলম্বন"), ("Colloid", "কলইড"), ("Compound", "যৌগ")], 0,
        "A homogeneous mixture is called a solution.",
        "সমসত্ব মিশ্ৰণক দ্ৰৱ বোলা হয়।"))
    A(R("In a solution, the substance present in larger amount is called the?",
        "দ্ৰৱত বেছি পৰিমাণে থকা পদাৰ্থক কি বোলা হয়?",
        [("Solvent", "দ্ৰাৱক"), ("Solute", "দ্ৰৱ্য"), ("Suspension", "নিলম্বন"), ("Mixture", "মিশ্ৰণ")], 0,
        "The substance in larger amount is the solvent.",
        "বেছি পৰিমাণে থকা পদাৰ্থটো হৈছে দ্ৰাৱক।"))
    A(R("The process of separation of a solid from a liquid by passing it through filter paper is called?",
        "ফিল্টাৰ পেপাৰৰ জৰিয়তে তৰলৰ পৰা কঠিন পদাৰ্থ পৃথক কৰা প্ৰক্ৰিয়াক কি বোলা হয়?",
        [("Filtration", "ছাঁননি"), ("Distillation", "পাতন"), ("Evaporation", "বাষ্পীভৱন"), ("Sublimation", "উৰ্ধপাতন")], 0,
        "Filtration separates an insoluble solid from a liquid.",
        "ছাঁননিয়ে অদ্ৰৱণীয় কঠিন পদাৰ্থক তৰলৰ পৰা পৃথক কৰে।"))

    # ---- Water & hardness ----
    A(R("The hardness of water is due to the presence of salts of?",
        "পানীৰ কাঠিন্য কিৰ লৱণৰ উপস্থিতিৰ বাবে হয়?",
        [("Calcium and magnesium", "কেলচিয়াম আৰু মেগনেছিয়াম"), ("Sodium and potassium", "ছ'ডিয়াম আৰু পটাছিয়াম"), ("Iron and copper", "লো আৰু তাম"), ("Zinc and lead", "জিংক আৰু ছীহ")], 0,
        "Hardness of water is caused by calcium and magnesium salts.",
        "পানীৰ কাঠিন্য কেলচিয়াম আৰু মেগনেছিয়াম লৱণৰ বাবে হয়।"))
    A(R("Which of the following is used to remove temporary hardness of water?",
        "পানীৰ সাময়িক কাঠিন্য দূৰ কৰিবলৈ তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Boiling", "উতলোৱা"), ("Filtration", "ছাঁননি"), ("Sedimentation", "অৱক্ষেপণ"), ("Chlorination", "ক্ল'ৰিনীকৰণ")], 0,
        "Boiling removes temporary hardness caused by bicarbonates.",
        "উতলালে বাইকাৰ্বনেটৰ বাবে হোৱা সাময়িক কাঠিন্য দূৰ হয়।"))
    A(R("Which of the following is the purest form of water?",
        "তলৰ কোনটো পানীৰ আটাইতকৈ শুদ্ধ ৰূপ?",
        [("Rainwater", "বৰষুণৰ পানী"), ("Sea water", "সাগৰৰ পানী"), ("River water", "নদীৰ পানী"), ("Well water", "কুঁৱাৰ পানী")], 0,
        "Rainwater is the purest natural form of water.",
        "বৰষুণৰ পানী পানীৰ আটাইতকৈ শুদ্ধ প্ৰাকৃতিক ৰূপ।"))

    # ---- Assam / India chemistry context ----
    A(R("Which of the following is India's largest oil refinery, located in Assam?",
        "অসমত অৱস্থিত ভাৰতৰ আটাইতকৈ ডাঙৰ তেল শোধনাগাৰ কোনটো?",
        [("Numaligarh Refinery", "নুমলীগড় শোধনাগাৰ"), ("Barauni Refinery", "বৰৌনী শোধনাগাৰ"), ("Koyali Refinery", "কয়ালী শোধনাগাৰ"), ("Mathura Refinery", "মথুৰা শোধনাগাৰ")], 0,
        "Numaligarh Refinery in Assam is a major petroleum refinery.",
        "অসমৰ নুমলীগড় শোধনাগাৰ এটা প্ৰধান পেট্ৰ'লিয়াম শোধনাগাৰ।"))
    A(R("Digboi in Assam is famous for?",
        "অসমৰ ডিগবৈ কিৰ বাবে বিখ্যাত?",
        [("Oil refinery", "তেল শোধনাগাৰ"), ("Coal mine", "কয়লা খনি"), ("Steel plant", "ষ্টীল কাৰখানা"), ("Cement plant", "চিমেণ্ট কাৰখানা")], 0,
        "Digboi is famous as one of the oldest oil refineries in India.",
        "ডিগবৈ ভাৰতৰ আটাইতকৈ পুৰণি তেল শোধনাগাৰবোৰৰ এটা ৰূপে বিখ্যাত।"))

    # ---- More chemistry fundamentals ----
    A(R("Which subatomic particle carries a negative charge?",
        "কোন উপ-পাৰমাণৱিক কণিকাই ঋণাত্মক আধান বহন কৰে?",
        [("Electron", "ইলেক্ট্ৰন"), ("Proton", "প্ৰ'টন"), ("Neutron", "নিউট্ৰন"), ("Nucleus", "নিউক্লিয়াছ")], 0,
        "Electrons carry a negative charge.",
        "ইলেক্ট্ৰনে ঋণাত্মক আধান বহন কৰে।"))
    A(R("Which subatomic particle carries a positive charge?",
        "কোন উপ-পাৰমাণৱিক কণিকাই ধনাত্মক আধান বহন কৰে?",
        [("Proton", "প্ৰ'টন"), ("Electron", "ইলেক্ট্ৰন"), ("Neutron", "নিউট্ৰন"), ("Photon", "ফটন")], 0,
        "Protons carry a positive charge.",
        "প্ৰ'টনে ধনাত্মক আধান বহন কৰে।"))
    A(R("Which of the following has a neutral charge?",
        "তলৰ কোনটোৰ আধান প্ৰশম?",
        [("Neutron", "নিউট্ৰন"), ("Proton", "প্ৰ'টন"), ("Electron", "ইলেক্ট্ৰন"), ("Ion", "আয়ন")], 0,
        "Neutrons have no charge.",
        "নিউট্ৰনৰ কোনো আধান নাই।"))
    A(R("The modern periodic table is arranged in order of increasing?",
        "আধুনিক পৰ্যায় সাৰণী কিৰ বৰ্ধিত ক্ৰমত সজ্জিত?",
        [("Atomic number", "পাৰমাণৱিক সংখ্যা"), ("Atomic mass", "পাৰমাণৱিক ভৰ"), ("Density", "ঘনত্ব"), ("Valency", "যোজনী")], 0,
        "The modern periodic table is arranged by increasing atomic number.",
        "আধুনিক পৰ্যায় সাৰণী বৰ্ধিত পাৰমাণৱিক সংখ্যাৰ ক্ৰমত সজ্জিত।"))
    A(R("The number of groups in the modern periodic table is?",
        "আধুনিক পৰ্যায় সাৰণীত কিমানটা শ্ৰেণী আছে?",
        [("18", "১৮"), ("8", "৮"), ("7", "৭"), ("16", "১৬")], 0,
        "The modern periodic table has 18 groups.",
        "আধুনিক পৰ্যায় সাৰণীত ১৮ টা শ্ৰেণী আছে।"))
    A(R("The number of periods in the modern periodic table is?",
        "আধুনিক পৰ্যায় সাৰণীত কিমানটা পৰ্যায় আছে?",
        [("7", "৭"), ("8", "৮"), ("18", "১৮"), ("6", "৬")], 0,
        "The modern periodic table has 7 periods.",
        "আধুনিক পৰ্যায় সাৰণীত ৭ টা পৰ্যায় আছে।"))
    A(R("Which of the following is an alkali metal?",
        "তলৰ কোনটো এটা ক্ষাৰ ধাতু?",
        [("Sodium", "ছ'ডিয়াম"), ("Calcium", "কেলচিয়াম"), ("Iron", "লো"), ("Copper", "তাম")], 0,
        "Sodium belongs to group 1 and is an alkali metal.",
        "ছ'ডিয়াম শ্ৰেণী ১ ৰ অন্তৰ্গত আৰু এটা ক্ষাৰ ধাতু।"))
    A(R("Which of the following is a halogen?",
        "তলৰ কোনটো এটা হেল'জেন?",
        [("Chlorine", "ক্ল'ৰিন"), ("Sodium", "ছ'ডিয়াম"), ("Calcium", "কেলচিয়াম"), ("Argon", "আৰ্গন")], 0,
        "Chlorine belongs to group 17 and is a halogen.",
        "ক্ল'ৰিন শ্ৰেণী ১৭ ৰ অন্তৰ্গত আৰু এটা হেল'জেন।"))
    A(R("Which metal is stored in kerosene?",
        "কোন ধাতু কেৰাচিনত ৰখা হয়?",
        [("Sodium", "ছ'ডিয়াম"), ("Iron", "লো"), ("Copper", "তাম"), ("Gold", "সোণ")], 0,
        "Sodium is stored in kerosene as it reacts vigorously with air and water.",
        "ছ'ডিয়াম কেৰাচিনত ৰখা হয় কাৰণ ই বায়ু আৰু পানীৰ সৈতে প্ৰচণ্ডভাৱে বিক্ৰিয়া কৰে।"))
    A(R("Which of the following is a transition metal?",
        "তলৰ কোনটো এটা সংক্ৰমণ ধাতু?",
        [("Iron", "লো"), ("Sodium", "ছ'ডিয়াম"), ("Calcium", "কেলচিয়াম"), ("Potassium", "পটাছিয়াম")], 0,
        "Iron is a transition metal in the d-block.",
        "লো d-ব্লকৰ এটা সংক্ৰমণ ধাতু।"))
    A(R("The valency of sodium is?",
        "ছ'ডিয়ামৰ যোজনী কিমান?",
        [("1", "১"), ("2", "২"), ("3", "৩"), ("4", "৪")], 0,
        "Sodium has one electron in its outermost shell, so its valency is 1.",
        "ছ'ডিয়ামৰ বাহিৰৰ কক্ষত এটা ইলেক্ট্ৰন থাকে, সেয়ে ইয়াৰ যোজনী ১।"))
    A(R("The valency of oxygen is?",
        "অক্সিজেনৰ যোজনী কিমান?",
        [("2", "২"), ("1", "১"), ("3", "৩"), ("4", "৪")], 0,
        "Oxygen needs two electrons to complete its outer shell, so its valency is 2.",
        "অক্সিজেনৰ বাহিৰৰ কক্ষ সম্পূৰ্ণ কৰিবলৈ দুটা ইলেক্ট্ৰন লাগে, সেয়ে ইয়াৰ যোজনী ২।"))
    A(R("The chemical formula of carbon dioxide is?",
        "কাৰ্বন ডাইঅক্সাইডৰ ৰাসায়নিক সংকেত কি?",
        [("CO2", "CO₂"), ("CO", "CO"), ("C2O", "C₂O"), ("CaCO3", "CaCO₃")], 0,
        "Carbon dioxide is CO2.",
        "কাৰ্বন ডাইঅক্সাইড হৈছে CO₂।"))
    A(R("The chemical formula of ammonia is?",
        "এম'নিয়াৰ ৰাসায়নিক সংকেত কি?",
        [("NH3", "NH₃"), ("NH4", "NH₄"), ("NO2", "NO₂"), ("N2O", "N₂O")], 0,
        "Ammonia is NH3.",
        "এম'নিয়া হৈছে NH₃।"))
    A(R("The chemical formula of methane is?",
        "মিথেনৰ ৰাসায়নিক সংকেত কি?",
        [("CH4", "CH₄"), ("C2H6", "C₂H₆"), ("C2H4", "C₂H₄"), ("CH3OH", "CH₃OH")], 0,
        "Methane is CH4.",
        "মিথেন হৈছে CH₄।"))
    A(R("The chemical formula of ethanol is?",
        "ইথানলৰ ৰাসায়নিক সংকেত কি?",
        [("C2H5OH", "C₂H₅OH"), ("CH3OH", "CH₃OH"), ("CH3COOH", "CH₃COOH"), ("C2H6", "C₂H₆")], 0,
        "Ethanol is C2H5OH.",
        "ইথানল হৈছে C₂H₅OH।"))
    A(R("The chemical formula of glucose is?",
        "গ্লুক'জৰ ৰাসায়নিক সংকেত কি?",
        [("C6H12O6", "C₆H₁₂O₆"), ("C12H22O11", "C₁₂H₂₂O₁₁"), ("C2H5OH", "C₂H₅OH"), ("CH4", "CH₄")], 0,
        "Glucose is C6H12O6.",
        "গ্লুক'জ হৈছে C₆H₁₂O₆।"))
    A(R("The chemical formula of common sugar (sucrose) is?",
        "সাধাৰণ চেনি (ছুক্ৰ'জ) ৰ ৰাসায়নিক সংকেত কি?",
        [("C12H22O11", "C₁₂H₂₂O₁₁"), ("C6H12O6", "C₆H₁₂O₆"), ("C2H5OH", "C₂H₅OH"), ("CH3COOH", "CH₃COOH")], 0,
        "Sucrose is C12H22O11.",
        "ছুক্ৰ'জ হৈছে C₁₂H₂₂O₁₁।"))
    A(R("Which acid is present in lemon?",
        "লেমুত কোন আম্ল থাকে?",
        [("Citric acid", "চিট্ৰিক আম্ল"), ("Acetic acid", "এছেটিক আম্ল"), ("Lactic acid", "লেক্টিক আম্ল"), ("Oxalic acid", "অক্সালিক আম্ল")], 0,
        "Lemon contains citric acid.",
        "লেমুত চিট্ৰিক আম্ল থাকে।"))
    A(R("Which acid is present in curd?",
        "দৈত কোন আম্ল থাকে?",
        [("Lactic acid", "লেক্টিক আম্ল"), ("Citric acid", "চিট্ৰিক আম্ল"), ("Acetic acid", "এছেটিক আম্ল"), ("Formic acid", "ফৰ্মিক আম্ল")], 0,
        "Curd contains lactic acid.",
        "দৈত লেক্টিক আম্ল থাকে।"))
    A(R("Which acid is present in an ant's sting?",
        "পৰুৱাৰ হুলত কোন আম্ল থাকে?",
        [("Formic acid", "ফৰ্মিক আম্ল"), ("Acetic acid", "এছেটিক আম্ল"), ("Citric acid", "চিট্ৰিক আম্ল"), ("Lactic acid", "লেক্টিক আম্ল")], 0,
        "An ant's sting contains formic acid.",
        "পৰুৱাৰ হুলত ফৰ্মিক আম্ল থাকে।"))
    A(R("Which of the following is used as a fertiliser?",
        "তলৰ কোনটো সাৰ ৰূপে ব্যৱহৃত হয়?",
        [("Urea", "ইউৰিয়া"), ("Common salt", "সাধাৰণ নিমখ"), ("Sugar", "চেনি"), ("Vinegar", "ভিনেগাৰ")], 0,
        "Urea is a widely used nitrogenous fertiliser.",
        "ইউৰিয়া এটা বহুলভাৱে ব্যৱহৃত নাইট্ৰ'জেনীয় সাৰ।"))
    A(R("Which of the following is used in the manufacture of glass?",
        "কাচ উৎপাদনত তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Silica", "ছিলিকা"), ("Iron", "লো"), ("Copper", "তাম"), ("Sulphur", "ছালফাৰ")], 0,
        "Silica (sand) is the main raw material for glass.",
        "ছিলিকা (বালি) কাচৰ মূল কেঁচামাল।"))
    A(R("Which of the following is a thermosetting plastic?",
        "তলৰ কোনটো এটা তাপ-দৃঢ় প্লাষ্টিক?",
        [("Bakelite", "বেকেলাইট"), ("Polythene", "পলিথিন"), ("PVC", "PVC"), ("Nylon", "নাইলন")], 0,
        "Bakelite is a thermosetting plastic that cannot be remoulded.",
        "বেকেলাইট এটা তাপ-দৃঢ় প্লাষ্টিক যি পুনৰ গঢ় দিব নোৱাৰি।"))
    A(R("Which of the following is a thermoplastic?",
        "তলৰ কোনটো এটা তাপ-নমনীয় প্লাষ্টিক?",
        [("Polythene", "পলিথিন"), ("Bakelite", "বেকেলাইট"), ("Melamine", "মেলামাইন"), ("Vulcanised rubber", "ভালকানাইজড ৰবৰ")], 0,
        "Polythene is a thermoplastic that softens on heating.",
        "পলিথিন এটা তাপ-নমনীয় প্লাষ্টিক যি গৰম কৰিলে নম্ৰ হয়।"))
    A(R("The three R's of waste management stand for Reduce, Reuse and?",
        "আৱৰ্জনা ব্যৱস্থাপনাৰ তিনিটা R ৰ অৰ্থ Reduce, Reuse আৰু?",
        [("Recycle", "Recycle"), ("Remove", "Remove"), ("Repair", "Repair"), ("Replace", "Replace")], 0,
        "The three R's are Reduce, Reuse and Recycle.",
        "তিনিটা R হৈছে Reduce, Reuse আৰু Recycle।"))
    A(R("Which of the following is a natural polymer?",
        "তলৰ কোনটো এটা প্ৰাকৃতিক পলিমাৰ?",
        [("Cellulose", "ছেলুল'জ"), ("Nylon", "নাইলন"), ("Polythene", "পলিথিন"), ("PVC", "PVC")], 0,
        "Cellulose is a natural polymer found in plants.",
        "ছেলুল'জ উদ্ভিদত পোৱা এটা প্ৰাকৃতিক পলিমাৰ।"))
    A(R("Which of the following is a synthetic polymer?",
        "তলৰ কোনটো এটা কৃত্ৰিম পলিমাৰ?",
        [("Nylon", "নাইলন"), ("Cellulose", "ছেলুল'জ"), ("Starch", "ষ্টাৰ্চ"), ("Protein", "প্ৰ'টিন")], 0,
        "Nylon is a synthetic polymer.",
        "নাইলন এটা কৃত্ৰিম পলিমাৰ।"))
    A(R("Which of the following is a fossil fuel?",
        "তলৰ কোনটো এটা জীৱাশ্ম ইন্ধন?",
        [("Coal", "কয়লা"), ("Biogas", "বায়'গেছ"), ("Wood", "কাঠ"), ("Hydrogen", "হাইড্ৰ'জেন")], 0,
        "Coal is a fossil fuel formed from ancient organic matter.",
        "কয়লা প্ৰাচীন জৈৱ পদাৰ্থৰ পৰা গঠিত এটা জীৱাশ্ম ইন্ধন।"))
    A(R("The main constituent of LPG is?",
        "LPG ৰ মূল উপাদান কি?",
        [("Butane and propane", "বিউটেন আৰু প্ৰ'পেন"), ("Methane", "মিথেন"), ("Hydrogen", "হাইড্ৰ'জেন"), ("Ethanol", "ইথানল")], 0,
        "LPG mainly contains butane and propane.",
        "LPG ত মূলতঃ বিউটেন আৰু প্ৰ'পেন থাকে।"))
    A(R("The main constituent of CNG is?",
        "CNG ৰ মূল উপাদান কি?",
        [("Methane", "মিথেন"), ("Butane", "বিউটেন"), ("Propane", "প্ৰ'পেন"), ("Octane", "অক্টেন")], 0,
        "CNG is mainly methane.",
        "CNG মূলতঃ মিথেন।"))
    A(R("Which of the following is the cleanest fuel?",
        "তলৰ কোনটো আটাইতকৈ পৰিষ্কাৰ ইন্ধন?",
        [("Hydrogen", "হাইড্ৰ'জেন"), ("Coal", "কয়লা"), ("Petrol", "পেট্ৰ'ল"), ("Diesel", "ডিজেল")], 0,
        "Hydrogen is the cleanest fuel, producing only water on burning.",
        "হাইড্ৰ'জেন আটাইতকৈ পৰিষ্কাৰ ইন্ধন, দহিলে কেৱল পানী উৎপন্ন হয়।"))
    A(R("The process of separating petroleum into its fractions is called?",
        "পেট্ৰ'লিয়ামক ইয়াৰ ভগ্নাংশত পৃথক কৰা প্ৰক্ৰিয়াক কি বোলা হয়?",
        [("Fractional distillation", "ভগ্নাংশিক পাতন"), ("Filtration", "ছাঁননি"), ("Sublimation", "উৰ্ধপাতন"), ("Evaporation", "বাষ্পীভৱন")], 0,
        "Fractional distillation separates petroleum into fractions.",
        "ভগ্নাংশিক পাতনে পেট্ৰ'লিয়ামক ভগ্নাংশত পৃথক কৰে।"))

    # ---- Additional chemistry ----
    A(R("Which of the following is the hardest natural substance?",
        "তলৰ কোনটো আটাইতকৈ কঠিন প্ৰাকৃতিক পদাৰ্থ?",
        [("Diamond", "হীৰা"), ("Graphite", "গ্ৰেফাইট"), ("Iron", "লো"), ("Quartz", "কোৱাৰ্টজ")], 0,
        "Diamond, an allotrope of carbon, is the hardest natural substance.",
        "হীৰা, কাৰ্বনৰ এটা ৰূপ, আটাইতকৈ কঠিন প্ৰাকৃতিক পদাৰ্থ।"))
    A(R("Diamond and graphite are both allotropes of?",
        "হীৰা আৰু গ্ৰেফাইট দুয়োটা কিৰ ৰূপভেদ?",
        [("Carbon", "কাৰ্বন"), ("Silicon", "ছিলিকন"), ("Sulphur", "ছালফাৰ"), ("Phosphorus", "ফছফৰাছ")], 0,
        "Diamond and graphite are allotropes of carbon.",
        "হীৰা আৰু গ্ৰেফাইট কাৰ্বনৰ ৰূপভেদ।"))
    A(R("Which gas is produced during the electrolysis of water at the cathode?",
        "পানীৰ তড়িৎ বিশ্লেষণত কেথ'ডত কোন গেছ উৎপন্ন হয়?",
        [("Hydrogen", "হাইড্ৰ'জেন"), ("Oxygen", "অক্সিজেন"), ("Chlorine", "ক্ল'ৰিন"), ("Nitrogen", "নাইট্ৰ'জেন")], 0,
        "Hydrogen is produced at the cathode during electrolysis of water.",
        "পানীৰ তড়িৎ বিশ্লেষণত কেথ'ডত হাইড্ৰ'জেন উৎপন্ন হয়।"))
    A(R("Which gas is produced at the anode during the electrolysis of water?",
        "পানীৰ তড়িৎ বিশ্লেষণত এন'ডত কোন গেছ উৎপন্ন হয়?",
        [("Oxygen", "অক্সিজেন"), ("Hydrogen", "হাইড্ৰ'জেন"), ("Chlorine", "ক্ল'ৰিন"), ("Nitrogen", "নাইট্ৰ'জেন")], 0,
        "Oxygen is produced at the anode during electrolysis of water.",
        "পানীৰ তড়িৎ বিশ্লেষণত এন'ডত অক্সিজেন উৎপন্ন হয়।"))
    A(R("Which of the following is used as a moderator in a nuclear reactor?",
        "পাৰমাণৱিক ৰিয়েক্টৰত তলৰ কোনটো মডাৰেটৰ ৰূপে ব্যৱহৃত হয়?",
        [("Heavy water", "ভাৰী পানী"), ("Common salt", "সাধাৰণ নিমখ"), ("Sugar", "চেনি"), ("Vinegar", "ভিনেগাৰ")], 0,
        "Heavy water is used as a moderator in nuclear reactors.",
        "ভাৰী পানী পাৰমাণৱিক ৰিয়েক্টৰত মডাৰেটৰ ৰূপে ব্যৱহৃত হয়।"))
    A(R("Which of the following is the lightest element?",
        "তলৰ কোনটো আটাইতকৈ পাতল মৌল?",
        [("Hydrogen", "হাইড্ৰ'জেন"), ("Helium", "হিলিয়াম"), ("Lithium", "লিথিয়াম"), ("Carbon", "কাৰ্বন")], 0,
        "Hydrogen is the lightest element.",
        "হাইড্ৰ'জেন আটাইতকৈ পাতল মৌল।"))
    A(R("Which of the following is the most abundant element in the universe?",
        "বিশ্বব্ৰহ্মাণ্ডত তলৰ কোনটো মৌল সৰ্বাধিক পৰিমাণে আছে?",
        [("Hydrogen", "হাইড্ৰ'জেন"), ("Oxygen", "অক্সিজেন"), ("Carbon", "কাৰ্বন"), ("Helium", "হিলিয়াম")], 0,
        "Hydrogen is the most abundant element in the universe.",
        "হাইড্ৰ'জেন বিশ্বব্ৰহ্মাণ্ডত সৰ্বাধিক পৰিমাণে থকা মৌল।"))
    A(R("Which of the following is the most abundant element in the Earth's crust?",
        "পৃথিৱীৰ ভূত্বকত তলৰ কোনটো মৌল সৰ্বাধিক পৰিমাণে আছে?",
        [("Oxygen", "অক্সিজেন"), ("Silicon", "ছিলিকন"), ("Aluminium", "এলুমিনিয়াম"), ("Iron", "লো")], 0,
        "Oxygen is the most abundant element in the Earth's crust.",
        "অক্সিজেন পৃথিৱীৰ ভূত্বকত সৰ্বাধিক পৰিমাণে থকা মৌল।"))
    A(R("Which metal is the best conductor of heat?",
        "কোন ধাতু তাপৰ শ্ৰেষ্ঠ পৰিবাহী?",
        [("Silver", "ৰূপ"), ("Iron", "লো"), ("Lead", "ছীহ"), ("Mercury", "পাৰা")], 0,
        "Silver is the best conductor of heat.",
        "ৰূপ তাপৰ শ্ৰেষ্ঠ পৰিবাহী।"))
    A(R("Which of the following is a good conductor of electricity?",
        "তলৰ কোনটো বিদ্যুৎৰ সুপৰিবাহী?",
        [("Copper", "তাম"), ("Rubber", "ৰবৰ"), ("Wood", "কাঠ"), ("Plastic", "প্লাষ্টিক")], 0,
        "Copper is a good conductor of electricity.",
        "তাম বিদ্যুৎৰ সুপৰিবাহী।"))
    A(R("Which of the following is an insulator?",
        "তলৰ কোনটো এটা অ-পৰিবাহী?",
        [("Rubber", "ৰবৰ"), ("Copper", "তাম"), ("Aluminium", "এলুমিনিয়াম"), ("Silver", "ৰূপ")], 0,
        "Rubber is an insulator and does not conduct electricity.",
        "ৰবৰ এটা অ-পৰিবাহী, ই বিদ্যুৎ পৰিবহন নকৰে।"))
    A(R("The process of slow oxidation of iron in the presence of moisture is called?",
        "আৰ্দ্ৰতাৰ উপস্থিতিত লোৰ লেহেমীয়া জাৰণ প্ৰক্ৰিয়াক কি বোলা হয়?",
        [("Rusting", "মামৰ ধৰা"), ("Combustion", "দহন"), ("Neutralisation", "প্ৰশমন"), ("Sublimation", "উৰ্ধপাতন")], 0,
        "Rusting is the slow oxidation of iron.",
        "মামৰ ধৰা হৈছে লোৰ লেহেমীয়া জাৰণ।"))
    A(R("Which of the following is used to test the presence of starch?",
        "ষ্টাৰ্চৰ উপস্থিতি পৰীক্ষা কৰিবলৈ তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Iodine solution", "আয়'ডিন দ্ৰৱ"), ("Limewater", "চূণপানী"), ("Litmus paper", "লিটমাছ কাগজ"), ("Baking soda", "বেকিং ছ'ডা")], 0,
        "Iodine solution turns blue-black in the presence of starch.",
        "আয়'ডিন দ্ৰৱে ষ্টাৰ্চৰ উপস্থিতিত নীলা-ক'লা ৰং ধৰে।"))
    A(R("Which of the following is used to test whether a solution is acidic or basic?",
        "এটা দ্ৰৱ আম্লিক নে ক্ষাৰকীয় পৰীক্ষা কৰিবলৈ তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Litmus paper", "লিটমাছ কাগজ"), ("Filter paper", "ফিল্টাৰ কাগজ"), ("Blotting paper", "শোষক কাগজ"), ("Graph paper", "গ্ৰাফ কাগজ")], 0,
        "Litmus paper indicates whether a solution is acidic or basic.",
        "লিটমাছ কাগজে দ্ৰৱ আম্লিক নে ক্ষাৰকীয় সূচায়।"))
    A(R("An acid turns blue litmus?",
        "আম্লই নীলা লিটমাছক কি ৰং দিয়ে?",
        [("Red", "ৰঙা"), ("Blue", "নীলা"), ("Green", "সেউজীয়া"), ("Yellow", "হালধীয়া")], 0,
        "An acid turns blue litmus red.",
        "আম্লই নীলা লিটমাছক ৰঙা কৰে।"))
    A(R("A base turns red litmus?",
        "ক্ষাৰকে ৰঙা লিটমাছক কি ৰং দিয়ে?",
        [("Blue", "নীলা"), ("Red", "ৰঙা"), ("Green", "সেউজীয়া"), ("Colourless", "ৰংহীন")], 0,
        "A base turns red litmus blue.",
        "ক্ষাৰকে ৰঙা লিটমাছক নীলা কৰে।"))
    A(R("Which of the following is used as an antacid?",
        "তলৰ কোনটো এণ্টাছিড ৰূপে ব্যৱহৃত হয়?",
        [("Magnesium hydroxide", "মেগনেছিয়াম হাইড্ৰ'ক্সাইড"), ("Hydrochloric acid", "হাইড্ৰ'ক্লৰিক আম্ল"), ("Sulphuric acid", "ছালফিউৰিক আম্ল"), ("Acetic acid", "এছেটিক আম্ল")], 0,
        "Magnesium hydroxide is a mild base used as an antacid.",
        "মেগনেছিয়াম হাইড্ৰ'ক্সাইড এটা মৃদু ক্ষাৰক যি এণ্টাছিড ৰূপে ব্যৱহৃত হয়।"))
    A(R("Which of the following is used in the manufacture of cement?",
        "চিমেণ্ট উৎপাদনত তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Limestone", "চূণশিল"), ("Silver", "ৰূপ"), ("Copper", "তাম"), ("Sulphur", "ছালফাৰ")], 0,
        "Limestone is a key raw material for cement.",
        "চূণশিল চিমেণ্টৰ এটা মূল কেঁচামাল।"))
    A(R("Which of the following is a chemical formula of limestone?",
        "তলৰ কোনটো চূণশিলৰ ৰাসায়নিক সংকেত?",
        [("CaCO3", "CaCO₃"), ("CaO", "CaO"), ("Ca(OH)2", "Ca(OH)₂"), ("CaSO4", "CaSO₄")], 0,
        "Limestone is mainly calcium carbonate, CaCO3.",
        "চূণশিল মূলতঃ কেলচিয়াম কাৰ্বনেট, CaCO₃।"))
    A(R("Which of the following is the chemical formula of quicklime?",
        "তলৰ কোনটো কুইকলাইমৰ ৰাসায়নিক সংকেত?",
        [("CaO", "CaO"), ("CaCO3", "CaCO₃"), ("Ca(OH)2", "Ca(OH)₂"), ("CaCl2", "CaCl₂")], 0,
        "Quicklime is calcium oxide, CaO.",
        "কুইকলাইম হৈছে কেলচিয়াম অক্সাইড, CaO।"))
    A(R("Which of the following is the chemical formula of slaked lime?",
        "তলৰ কোনটো চূণপানীৰ ৰাসায়নিক সংকেত?",
        [("Ca(OH)2", "Ca(OH)₂"), ("CaO", "CaO"), ("CaCO3", "CaCO₃"), ("CaSO4", "CaSO₄")], 0,
        "Slaked lime is calcium hydroxide, Ca(OH)2.",
        "চূণপানী হৈছে কেলচিয়াম হাইড্ৰ'ক্সাইড, Ca(OH)₂।"))
    A(R("Which of the following is the chemical formula of sulphuric acid?",
        "তলৰ কোনটো ছালফিউৰিক আম্লৰ ৰাসায়নিক সংকেত?",
        [("H2SO4", "H₂SO₄"), ("HCl", "HCl"), ("HNO3", "HNO₃"), ("H2CO3", "H₂CO₃")], 0,
        "Sulphuric acid is H2SO4.",
        "ছালফিউৰিক আম্ল হৈছে H₂SO₄।"))
    A(R("Which of the following is the chemical formula of nitric acid?",
        "তলৰ কোনটো নাইট্ৰিক আম্লৰ ৰাসায়নিক সংকেত?",
        [("HNO3", "HNO₃"), ("H2SO4", "H₂SO₄"), ("HCl", "HCl"), ("H3PO4", "H₃PO₄")], 0,
        "Nitric acid is HNO3.",
        "নাইট্ৰিক আম্ল হৈছে HNO₃।"))
    A(R("Aqua regia is a mixture of which two acids?",
        "একুৱা ৰিজিয়া কোন দুটা আম্লৰ মিশ্ৰণ?",
        [("Hydrochloric acid and nitric acid", "হাইড্ৰ'ক্লৰিক আম্ল আৰু নাইট্ৰিক আম্ল"), ("Sulphuric acid and nitric acid", "ছালফিউৰিক আম্ল আৰু নাইট্ৰিক আম্ল"), ("Hydrochloric acid and sulphuric acid", "হাইড্ৰ'ক্লৰিক আম্ল আৰু ছালফিউৰিক আম্ল"), ("Acetic acid and citric acid", "এছেটিক আম্ল আৰু চিট্ৰিক আম্ল")], 0,
        "Aqua regia is a mixture of concentrated hydrochloric and nitric acids.",
        "একুৱা ৰিজিয়া ঘন হাইড্ৰ'ক্লৰিক আৰু নাইট্ৰিক আম্লৰ মিশ্ৰণ।"))
    A(R("Which of the following is used as a refrigerant?",
        "তলৰ কোনটো শীতলক ৰূপে ব্যৱহৃত হয়?",
        [("Freon", "ফ্ৰিয়ন"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Helium", "হিলিয়াম")], 0,
        "Freon is used as a refrigerant in refrigerators and air conditioners.",
        "ফ্ৰিয়ন ৰেফ্ৰিজাৰেটৰ আৰু এয়াৰ কণ্ডিচনাৰত শীতলক ৰূপে ব্যৱহৃত হয়।"))
    A(R("Which of the following is a greenhouse gas?",
        "তলৰ কোনটো এটা গ্ৰীণহাউছ গেছ?",
        [("Methane", "মিথেন"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Helium", "হিলিয়াম")], 0,
        "Methane is a potent greenhouse gas.",
        "মিথেন এটা প্ৰবল গ্ৰীণহাউছ গেছ।"))
    A(R("Which of the following is used to detect the presence of carbon dioxide?",
        "কাৰ্বন ডাইঅক্সাইডৰ উপস্থিতি ধৰা পেলাবলৈ তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Limewater", "চূণপানী"), ("Iodine solution", "আয়'ডিন দ্ৰৱ"), ("Litmus paper", "লিটমাছ কাগজ"), ("Salt solution", "নিমখৰ দ্ৰৱ")], 0,
        "Limewater turns milky in the presence of carbon dioxide.",
        "কাৰ্বন ডাইঅক্সাইডৰ উপস্থিতিত চূণপানী ঘোলা হয়।"))
    A(R("Which of the following is an example of a chemical change?",
        "তলৰ কোনটো ৰাসায়নিক পৰিৱৰ্তনৰ উদাহৰণ?",
        [("Burning of wood", "কাঠ জ্বলোৱা"), ("Melting of ice", "বৰফ গলি যোৱা"), ("Boiling of water", "পানী উতলোৱা"), ("Dissolving sugar", "চেনি দ্ৰৱীভূত কৰা")], 0,
        "Burning of wood is a chemical change producing new substances.",
        "কাঠ জ্বলোৱা ৰাসায়নিক পৰিৱৰ্তন, য'ত নতুন পদাৰ্থ উৎপন্ন হয়।"))
    A(R("Which of the following is used in the vulcanisation of rubber?",
        "ৰবৰৰ ভালকানাইজেচনত তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Sulphur", "ছালফাৰ"), ("Carbon", "কাৰ্বন"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন")], 0,
        "Sulphur is used to vulcanise rubber.",
        "ৰবৰ ভালকানাইজ কৰিবলৈ ছালফাৰ ব্যৱহৃত হয়।"))
    A(R("Which of the following is the chemical name of vitamin C?",
        "তলৰ কোনটো ভিটামিন C ৰ ৰাসায়নিক নাম?",
        [("Ascorbic acid", "এছকৰবিক আম্ল"), ("Citric acid", "চিট্ৰিক আম্ল"), ("Acetic acid", "এছেটিক আম্ল"), ("Lactic acid", "লেক্টিক আম্ল")], 0,
        "Vitamin C is chemically ascorbic acid.",
        "ভিটামিন C ৰ ৰাসায়নিক নাম এছকৰবিক আম্ল।"))
    A(R("Which of the following is used in the manufacture of matches?",
        "দিয়াচলাই উৎপাদনত তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Red phosphorus", "ৰঙা ফছফৰাছ"), ("Sodium", "ছ'ডিয়াম"), ("Iron", "লো"), ("Copper", "তাম")], 0,
        "Red phosphorus is used on the striking surface of matchboxes.",
        "দিয়াচলাইৰ ঘঁহনি পৃষ্ঠত ৰঙা ফছফৰাছ ব্যৱহৃত হয়।"))
    A(R("Which of the following is the chemical formula of ozone?",
        "তলৰ কোনটো অ'জ'নৰ ৰাসায়নিক সংকেত?",
        [("O3", "O₃"), ("O2", "O₂"), ("CO2", "CO₂"), ("NO2", "NO₂")], 0,
        "Ozone is O3, an allotrope of oxygen.",
        "অ'জ'ন হৈছে O₃, অক্সিজেনৰ এটা ৰূপ।"))
    A(R("Which of the following is used as a fuel in nuclear reactors?",
        "পাৰমাণৱিক ৰিয়েক্টৰত ইন্ধন ৰূপে তলৰ কোনটো ব্যৱহৃত হয়?",
        [("Uranium", "ইউৰেনিয়াম"), ("Iron", "লো"), ("Copper", "তাম"), ("Zinc", "জিংক")], 0,
        "Uranium is used as nuclear fuel.",
        "ইউৰেনিয়াম পাৰমাণৱিক ইন্ধন ৰূপে ব্যৱহৃত হয়।"))
    A(R("Which of the following is the chemical formula of hydrogen peroxide?",
        "তলৰ কোনটো হাইড্ৰ'জেন পাৰ-অক্সাইডৰ ৰাসায়নিক সংকেত?",
        [("H2O2", "H₂O₂"), ("H2O", "H₂O"), ("HO", "HO"), ("H2O3", "H₂O₃")], 0,
        "Hydrogen peroxide is H2O2, used as an antiseptic.",
        "হাইড্ৰ'জেন পাৰ-অক্সাইড হৈছে H₂O₂, জীৱাণুনাশক ৰূপে ব্যৱহৃত হয়।"))

    return r
