"""Technical-science / Biology - 130 fresh bilingual questions."""
from .common import R


def rows():
    r = []
    A = r.append

    # ---- Cell biology ----
    A(R("Which cell organelle is called the suicidal bag of the cell?",
        "কোন কোষ অংগাণুকক কোষৰ আত্মহত্যাকাৰী মোন বোলা হয়?",
        [("Lysosome", "লাইছ'ছ'ম"), ("Ribosome", "ৰাইব'ছ'ম"), ("Mitochondria", "মাইট'কণ্ড্ৰিয়া"), ("Nucleus", "কোষকেন্দ্ৰ")], 0,
        "Lysosomes contain digestive enzymes and can digest the cell itself, hence the name.",
        "লাইছ'ছ'মত পাচক এনজাইম থাকে আৰু ই কোষক নিজেই পাচন কৰিব পাৰে, সেয়ে এই নাম।"))
    A(R("Which organelle is called the protein factory of the cell?",
        "কোন অংগাণুকক কোষৰ প্ৰ'টিন কাৰখানা বোলা হয়?",
        [("Ribosome", "ৰাইব'ছ'ম"), ("Lysosome", "লাইছ'ছ'ম"), ("Golgi body", "গলজি বডি"), ("Vacuole", "ৰসধাৰী")], 0,
        "Ribosomes are the site of protein synthesis.",
        "ৰাইব'ছ'ম হৈছে প্ৰ'টিন সংশ্লেষণৰ স্থান।"))
    A(R("Which organelle is known as the transport system of the cell?",
        "কোন অংগাণুকক কোষৰ পৰিবহন তন্ত্ৰ বোলা হয়?",
        [("Endoplasmic reticulum", "এণ্ড'প্লাজমিক ৰেটিকুলাম"), ("Lysosome", "লাইছ'ছ'ম"), ("Centrosome", "কেন্দ্ৰক"), ("Ribosome", "ৰাইব'ছ'ম")], 0,
        "Endoplasmic reticulum transports materials within the cell.",
        "এণ্ড'প্লাজমিক ৰেটিকুলামে কোষৰ ভিতৰত পদাৰ্থ পৰিবহন কৰে।"))
    A(R("The cell wall of a plant cell is mainly made of which substance?",
        "উদ্ভিদ কোষৰ কোষবেৰ মূলতঃ কি পদাৰ্থৰে গঠিত?",
        [("Cellulose", "ছেলুল'জ"), ("Chitin", "কাইটিন"), ("Protein", "প্ৰ'টিন"), ("Lipid", "লিপিড")], 0,
        "The plant cell wall is chiefly made of cellulose.",
        "উদ্ভিদ কোষবেৰ প্ৰধানতঃ ছেলুল'জেৰে গঠিত।"))
    A(R("Which pigment gives green colour to leaves?",
        "কোন ৰঞ্জকে পাতক সেউজীয়া ৰং দিয়ে?",
        [("Chlorophyll", "ক্ল'ৰ'ফিল"), ("Carotene", "কেৰ'টিন"), ("Xanthophyll", "জেণ্ঠ'ফিল"), ("Anthocyanin", "এন্থ'ছায়ানিন")], 0,
        "Chlorophyll is the green pigment that absorbs light for photosynthesis.",
        "ক্ল'ৰ'ফিল হৈছে সেউজীয়া ৰঞ্জক যিয়ে সালোকসংশ্লেষণৰ বাবে পোহৰ শোষণ কৰে।"))
    A(R("Which organelle is present only in animal cells and helps in cell division?",
        "কোন অংগাণুক কেৱল প্ৰাণী কোষত থাকে আৰু কোষ বিভাজনত সহায় কৰে?",
        [("Centrosome", "কেন্দ্ৰক"), ("Chloroplast", "ক্ল'ৰ'প্লাষ্ট"), ("Cell wall", "কোষবেৰ"), ("Plastid", "প্লাষ্টিড")], 0,
        "The centrosome helps in spindle formation during cell division.",
        "কেন্দ্ৰকে কোষ বিভাজনৰ সময়ত টানি গঠনত সহায় কৰে।"))
    A(R("Which structure controls the entry and exit of substances in an animal cell?",
        "প্ৰাণী কোষত পদাৰ্থৰ প্ৰৱেশ আৰু প্ৰস্থান কোন গঠনে নিয়ন্ত্ৰণ কৰে?",
        [("Plasma membrane", "প্লাজমা আৱৰণ"), ("Cell wall", "কোষবেৰ"), ("Nucleus", "কোষকেন্দ্ৰ"), ("Golgi body", "গলজি বডি")], 0,
        "The plasma membrane is selectively permeable and controls transport.",
        "প্লাজমা আৱৰণ আংশিকভাৱে ভেদ্য আৰু ই পৰিবহন নিয়ন্ত্ৰণ কৰে।"))

    # ---- Human physiology ----
    A(R("How many bones are there in the human skull?",
        "মানৱ কৰোঁটত কিমানখন হাড় থাকে?",
        [("22", "২২"), ("29", "২৯"), ("26", "২৬"), ("12", "১২")], 0,
        "The human skull is made of 22 bones.",
        "মানৱ কৰোঁট ২২ খন হাড়েৰে গঠিত।"))
    A(R("Which part of the brain controls balance and coordination of the body?",
        "মগজুৰ কোন অংশে শৰীৰৰ ভাৰসাম্য আৰু সমন্বয় নিয়ন্ত্ৰণ কৰে?",
        [("Cerebellum", "চেৰিবেলাম"), ("Cerebrum", "চেৰিব্ৰাম"), ("Medulla", "মেডুলা"), ("Pons", "পনছ")], 0,
        "The cerebellum controls balance, posture and coordination.",
        "চেৰিবেলামে ভাৰসাম্য, ভঙ্গি আৰু সমন্বয় নিয়ন্ত্ৰণ কৰে।"))
    A(R("Which part of the brain controls heartbeat and breathing?",
        "মগজুৰ কোন অংশে হৃদস্পন্দন আৰু শ্বাস-প্ৰশ্বাস নিয়ন্ত্ৰণ কৰে?",
        [("Medulla oblongata", "মেডুলা অবলংগাটা"), ("Cerebrum", "চেৰিব্ৰাম"), ("Cerebellum", "চেৰিবেলাম"), ("Thalamus", "থেলামাছ")], 0,
        "The medulla oblongata controls involuntary actions like heartbeat and breathing.",
        "মেডুলা অবলংগাটাই হৃদস্পন্দন আৰু শ্বাস-প্ৰশ্বাসৰ দৰে অনৈচ্ছিক ক্ৰিয়া নিয়ন্ত্ৰণ কৰে।"))
    A(R("The number of teeth in an adult human is?",
        "এজন প্ৰাপ্তবয়স্ক মানুহৰ দাঁতৰ সংখ্যা কিমান?",
        [("32", "৩২"), ("28", "২৮"), ("30", "৩০"), ("36", "৩৬")], 0,
        "An adult human has 32 permanent teeth.",
        "এজন প্ৰাপ্তবয়স্ক মানুহৰ ৩২ টা স্থায়ী দাঁত থাকে।"))
    A(R("Which enzyme in the stomach digests proteins?",
        "পেটত থকা কোন এনজাইমে প্ৰ'টিন পাচন কৰে?",
        [("Pepsin", "পেপচিন"), ("Amylase", "এমাইলেজ"), ("Lipase", "লাইপেজ"), ("Trypsin", "ট্ৰিপচিন")], 0,
        "Pepsin, active in acidic medium, digests proteins.",
        "পেপচিনে আম্লিক মাধ্যমত সক্ৰিয় হৈ প্ৰ'টিন পাচন কৰে।"))
    A(R("Which acid is present in the human stomach?",
        "মানুহৰ পেটত কোন আম্ল থাকে?",
        [("Hydrochloric acid", "হাইড্ৰ'ক্লৰিক আম্ল"), ("Sulphuric acid", "ছালফিউৰিক আম্ল"), ("Nitric acid", "নাইট্ৰিক আম্ল"), ("Acetic acid", "এছেটিক আম্ল")], 0,
        "Hydrochloric acid in gastric juice kills germs and activates pepsin.",
        "গেষ্ট্ৰিক ৰসৰ হাইড্ৰ'ক্লৰিক আম্লই কীটাণু মাৰে আৰু পেপচিন সক্ৰিয় কৰে।"))
    A(R("The exchange of gases in the lungs takes place in the?",
        "হাওঁফাওঁত গেছৰ বিনিময় ক'ত হয়?",
        [("Alveoli", "এলভিঅ'লাই"), ("Bronchi", "ব্ৰংকাই"), ("Trachea", "ট্ৰেকিয়া"), ("Pleura", "প্লুৰা")], 0,
        "Gas exchange occurs in the alveoli, tiny air sacs of the lungs.",
        "হাওঁফাওঁৰ সৰু বায়ু-মোন এলভিঅ'লাইত গেছৰ বিনিময় হয়।"))
    A(R("Which blood vessel carries blood away from the heart?",
        "কোন ৰক্তনলীয়ে হৃদযন্ত্ৰৰ পৰা তেজ লৈ যায়?",
        [("Artery", "ধমনী"), ("Vein", "শিৰা"), ("Capillary", "কেশিকা"), ("Lymph vessel", "লসিকা নলী")], 0,
        "Arteries carry blood away from the heart.",
        "ধমনীয়ে হৃদযন্ত্ৰৰ পৰা তেজ লৈ যায়।"))
    A(R("Which vitamin helps in blood clotting?",
        "কোন ভিটামিনে তেজ জমাট বন্ধাত সহায় কৰে?",
        [("Vitamin K", "ভিটামিন K"), ("Vitamin C", "ভিটামিন C"), ("Vitamin A", "ভিটামিন A"), ("Vitamin D", "ভিটামিন D")], 0,
        "Vitamin K is essential for blood clotting.",
        "ভিটামিন K তেজ জমাট বন্ধাৰ বাবে অত্যাৱশ্যক।"))
    A(R("The iron-containing protein in red blood cells is?",
        "ৰঙা তেজ কণিকাত থকা লো-যুক্ত প্ৰ'টিন কি?",
        [("Haemoglobin", "হিম'গ্লবিন"), ("Fibrin", "ফাইব্ৰিন"), ("Albumin", "এলবিউমিন"), ("Globulin", "গ্লবিউলিন")], 0,
        "Haemoglobin carries oxygen in the blood.",
        "হিম'গ্লবিনে তেজত অক্সিজেন পৰিবহন কৰে।"))
    A(R("The number of ribs in the human body is?",
        "মানৱ শৰীৰত কিমান যোৰ পাঁজৰ থাকে?",
        [("12 pairs", "১২ যোৰ"), ("10 pairs", "১০ যোৰ"), ("14 pairs", "১৪ যোৰ"), ("11 pairs", "১১ যোৰ")], 0,
        "Humans have 12 pairs of ribs.",
        "মানুহৰ ১২ যোৰ পাঁজৰ থাকে।"))
    A(R("Which hormone regulates blood sugar level in the human body?",
        "মানৱ শৰীৰত কোন হৰম'নে ৰক্ত-শৰ্কৰাৰ মাত্ৰা নিয়ন্ত্ৰণ কৰে?",
        [("Insulin", "ইনচুলিন"), ("Adrenaline", "এড্ৰিনেলিন"), ("Thyroxine", "থাইৰক্সিন"), ("Testosterone", "টেষ্ট'ষ্টেৰন")], 0,
        "Insulin, secreted by the pancreas, lowers blood sugar.",
        "অগ্নাশয়ে নিঃসৰণ কৰা ইনচুলিনে ৰক্ত-শৰ্কৰা কমায়।"))
    A(R("Which gland is called the master gland of the human body?",
        "কোন গ্ৰন্থিক মানৱ শৰীৰৰ মুখ্য গ্ৰন্থি বোলা হয়?",
        [("Pituitary gland", "পিটিউটাৰী গ্ৰন্থি"), ("Thyroid gland", "থাইৰয়ড গ্ৰন্থি"), ("Adrenal gland", "এড্ৰিনেল গ্ৰন্থি"), ("Pancreas", "অগ্নাশয়")], 0,
        "The pituitary gland controls the other endocrine glands.",
        "পিটিউটাৰী গ্ৰন্থিয়ে আন অন্তঃস্ৰাৱী গ্ৰন্থি নিয়ন্ত্ৰণ কৰে।"))

    # ---- Nutrition & deficiency ----
    A(R("Deficiency of which vitamin causes scurvy?",
        "কোন ভিটামিনৰ অভাৱত স্কাৰ্ভি ৰোগ হয়?",
        [("Vitamin C", "ভিটামিন C"), ("Vitamin A", "ভিটামিন A"), ("Vitamin D", "ভিটামিন D"), ("Vitamin B1", "ভিটামিন B1")], 0,
        "Scurvy is caused by a deficiency of vitamin C.",
        "ভিটামিন C ৰ অভাৱত স্কাৰ্ভি ৰোগ হয়।"))
    A(R("Which disease is caused by deficiency of iodine?",
        "আয়'ডিনৰ অভাৱত কোন ৰোগ হয়?",
        [("Goitre", "গলগণ্ড"), ("Anaemia", "ৰক্তাল্পতা"), ("Rickets", "ৰিকেটছ"), ("Beriberi", "বেৰিবেৰি")], 0,
        "Iodine deficiency causes goitre, an enlargement of the thyroid gland.",
        "আয়'ডিনৰ অভাৱত থাইৰয়ড গ্ৰন্থি ডাঙৰ হৈ গলগণ্ড হয়।"))
    A(R("Night blindness is caused by the deficiency of which vitamin?",
        "ৰাতি-অন্ধতা কোন ভিটামিনৰ অভাৱত হয়?",
        [("Vitamin A", "ভিটামিন A"), ("Vitamin C", "ভিটামিন C"), ("Vitamin K", "ভিটামিন K"), ("Vitamin B12", "ভিটামিন B12")], 0,
        "Vitamin A deficiency causes night blindness.",
        "ভিটামিন A ৰ অভাৱত ৰাতি-অন্ধতা হয়।"))
    A(R("Which mineral is necessary for the formation of haemoglobin?",
        "হিম'গ্লবিন গঠনৰ বাবে কোন খনিজ প্ৰয়োজন?",
        [("Iron", "লো"), ("Calcium", "কেলচিয়াম"), ("Sodium", "ছ'ডিয়াম"), ("Potassium", "পটাছিয়াম")], 0,
        "Iron is needed for haemoglobin formation; its deficiency causes anaemia.",
        "হিম'গ্লবিন গঠনৰ বাবে লো প্ৰয়োজন; ইয়াৰ অভাৱত ৰক্তাল্পতা হয়।"))
    A(R("Which nutrient is the main source of energy for the human body?",
        "কোন পুষ্টি মানৱ শৰীৰৰ বাবে শক্তিৰ মূল উৎস?",
        [("Carbohydrate", "শৰ্কৰা"), ("Protein", "প্ৰ'টিন"), ("Vitamin", "ভিটামিন"), ("Mineral", "খনিজ")], 0,
        "Carbohydrates are the chief source of energy.",
        "শৰ্কৰা হৈছে শক্তিৰ মূল উৎস।"))
    A(R("Which food group is the richest source of protein?",
        "কোন খাদ্য শ্ৰেণী প্ৰ'টিনৰ সৰ্বাধিক উৎস?",
        [("Pulses and milk", "দাইল আৰু গাখীৰ"), ("Rice and potato", "চাউল আৰু আলু"), ("Sugar and jaggery", "চেনি আৰু গুড়"), ("Butter and oil", "মাখন আৰু তেল")], 0,
        "Pulses and milk are rich in protein.",
        "দাইল আৰু গাখীৰ প্ৰ'টিনেৰে ভৰপূৰ।"))
    A(R("Rickets in children is caused by the deficiency of which vitamin?",
        "শিশুৰ ৰিকেটছ ৰোগ কোন ভিটামিনৰ অভাৱত হয়?",
        [("Vitamin D", "ভিটামিন D"), ("Vitamin A", "ভিটামিন A"), ("Vitamin C", "ভিটামিন C"), ("Vitamin K", "ভিটামিন K")], 0,
        "Vitamin D deficiency causes rickets, leading to weak bones.",
        "ভিটামিন D ৰ অভাৱত ৰিকেটছ হয় আৰু হাড় দুৰ্বল হৈ পৰে।"))

    # ---- Genetics ----
    A(R("Who is known as the father of genetics?",
        "কাক বংশগতি বিজ্ঞানৰ পিতৃ বোলা হয়?",
        [("Gregor Mendel", "গ্ৰেগৰ মেণ্ডেল"), ("Charles Darwin", "চাৰ্লছ ডাৰউইন"), ("Louis Pasteur", "লুই পাষ্টাৰ"), ("Robert Hooke", "ৰবাৰ্ট হুক")], 0,
        "Gregor Mendel is regarded as the father of genetics.",
        "গ্ৰেগৰ মেণ্ডেলক বংশগতি বিজ্ঞানৰ পিতৃ বোলা হয়।"))
    A(R("Which is the unit of heredity?",
        "বংশগতিৰ একক কি?",
        [("Gene", "জিন"), ("Cell", "কোষ"), ("Tissue", "কলা"), ("Organ", "অংগ")], 0,
        "A gene is the basic unit of heredity.",
        "জিন হৈছে বংশগতিৰ মৌলিক একক।"))
    A(R("How many chromosomes are present in a normal human cell?",
        "এটা স্বাভাৱিক মানৱ কোষত কিমানটা ক্ৰ'ম'জম থাকে?",
        [("46", "৪৬"), ("23", "২৩"), ("44", "৪৪"), ("48", "৪৮")], 0,
        "A normal human cell has 46 chromosomes (23 pairs).",
        "এটা স্বাভাৱিক মানৱ কোষত ৪৬ টা (২৩ যোৰ) ক্ৰ'ম'জম থাকে।"))
    A(R("Who proposed the theory of evolution by natural selection?",
        "প্ৰাকৃতিক নিৰ্বাচনৰ দ্বাৰা বিবৰ্তনৰ তত্ত্ব কোনে দিছিল?",
        [("Charles Darwin", "চাৰ্লছ ডাৰউইন"), ("Gregor Mendel", "গ্ৰেগৰ মেণ্ডেল"), ("Lamarck", "লামাৰ্ক"), ("Hugo de Vries", "হিউগ' ডি ভ্ৰিছ")], 0,
        "Charles Darwin proposed evolution by natural selection.",
        "চাৰ্লছ ডাৰউইনে প্ৰাকৃতিক নিৰ্বাচনৰ দ্বাৰা বিবৰ্তন প্ৰস্তাৱ কৰিছিল।"))
    A(R("The scientific name of the human being is?",
        "মানুহৰ বৈজ্ঞানিক নাম কি?",
        [("Homo sapiens", "হ'ম' চেপিয়েন্স"), ("Homo erectus", "হ'ম' ইৰেক্টাছ"), ("Pan troglodytes", "পেন ট্ৰ'গ্ল'ডাইটছ"), ("Hylobates hoolock", "হাইল'বেটছ হুলক")], 0,
        "The scientific name of modern humans is Homo sapiens.",
        "আধুনিক মানুহৰ বৈজ্ঞানিক নাম হ'ম' চেপিয়েন্স।"))
    A(R("The father of taxonomy is?",
        "শ্ৰেণীবিভাগ বিজ্ঞানৰ পিতৃ কোন?",
        [("Carolus Linnaeus", "কাৰ'লাছ লিনিয়াছ"), ("Gregor Mendel", "গ্ৰেগৰ মেণ্ডেল"), ("Aristotle", "এৰিষ্ট'টল"), ("Theophrastus", "থিঅ'ফ্ৰাষ্টাছ")], 0,
        "Carolus Linnaeus introduced binomial nomenclature and is called the father of taxonomy.",
        "কাৰ'লাছ লিনিয়াছে দ্বিপদ নামকৰণ প্ৰৱৰ্তন কৰিছিল আৰু তেওঁক শ্ৰেণীবিভাগ বিজ্ঞানৰ পিতৃ বোলা হয়।"))
    A(R("Which of the following is a sex-linked disease?",
        "তলৰ কোনটো যৌন-সংযুক্ত ৰোগ?",
        [("Haemophilia", "হিম'ফিলিয়া"), ("Malaria", "মেলেৰিয়া"), ("Typhoid", "টাইফয়ড"), ("Cholera", "কলেৰা")], 0,
        "Haemophilia is a sex-linked (X-linked) genetic disorder.",
        "হিম'ফিলিয়া এটা যৌন-সংযুক্ত (X-সংযুক্ত) বংশগত ৰোগ।"))

    # ---- Ecology & environment ----
    A(R("The ozone layer is present in which layer of the atmosphere?",
        "অ'জ'ন স্তৰ বায়ুমণ্ডলৰ কোন স্তৰত আছে?",
        [("Stratosphere", "ষ্ট্ৰেট'ছ্ফিয়াৰ"), ("Troposphere", "ট্ৰ'প'ছ্ফিয়াৰ"), ("Mesosphere", "মেছ'ছ্ফিয়াৰ"), ("Ionosphere", "আয়ন'ছ্ফিয়াৰ")], 0,
        "The ozone layer lies in the stratosphere and absorbs UV rays.",
        "অ'জ'ন স্তৰ ষ্ট্ৰেট'ছ্ফিয়াৰত থাকে আৰু অতিবেঙুনীয় ৰশ্মি শোষণ কৰে।"))
    A(R("Which gas is mainly responsible for the greenhouse effect?",
        "গ্ৰীণহাউছ প্ৰভাৱৰ বাবে মূলতঃ কোন গেছ দায়ী?",
        [("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Helium", "হিলিয়াম")], 0,
        "Carbon dioxide is a major greenhouse gas.",
        "কাৰ্বন ডাইঅক্সাইড এটা প্ৰধান গ্ৰীণহাউছ গেছ।"))
    A(R("World Environment Day is observed on which date?",
        "বিশ্ব পৰিৱেশ দিৱস কোন তাৰিখে পালন কৰা হয়?",
        [("5 June", "৫ জুন"), ("22 April", "২২ এপ্ৰিল"), ("16 September", "১৬ ছেপ্তেম্বৰ"), ("1 December", "১ ডিচেম্বৰ")], 0,
        "World Environment Day is observed on 5 June every year.",
        "প্ৰতি বছৰে ৫ জুনত বিশ্ব পৰিৱেশ দিৱস পালন কৰা হয়।"))
    A(R("Kaziranga National Park is famous for which animal?",
        "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান কোন জন্তুৰ বাবে বিখ্যাত?",
        [("One-horned rhinoceros", "এশিঙীয়া গঁড়"), ("Tiger", "বাঘ"), ("Elephant", "হাতী"), ("Lion", "সিংহ")], 0,
        "Kaziranga is famous for the Indian one-horned rhinoceros.",
        "কাজিৰঙা ভাৰতীয় এশিঙীয়া গঁড়ৰ বাবে বিখ্যাত।"))
    A(R("Which is the largest national park of Assam?",
        "অসমৰ আটাইতকৈ ডাঙৰ ৰাষ্ট্ৰীয় উদ্যান কোনটো?",
        [("Manas National Park", "মানস ৰাষ্ট্ৰীয় উদ্যান"), ("Kaziranga National Park", "কাজিৰঙা ৰাষ্ট্ৰীয় উদ্যান"), ("Nameri National Park", "নামেৰি ৰাষ্ট্ৰীয় উদ্যান"), ("Dibru-Saikhowa", "ডিব্ৰু-শৈখোৱা")], 0,
        "Manas National Park is the largest national park in Assam.",
        "মানস ৰাষ্ট্ৰীয় উদ্যান অসমৰ আটাইতকৈ ডাঙৰ ৰাষ্ট্ৰীয় উদ্যান।"))
    A(R("Deepor Beel, a Ramsar site, is located near which city?",
        "ৰামছাৰ স্থান দীপৰ বিল কোন নগৰৰ ওচৰত অৱস্থিত?",
        [("Guwahati", "গুৱাহাটী"), ("Jorhat", "যোৰহাট"), ("Dibrugarh", "ডিব্ৰুগড়"), ("Silchar", "শিলচৰ")], 0,
        "Deepor Beel is a wetland near Guwahati, a Ramsar site.",
        "দীপৰ বিল গুৱাহাটীৰ ওচৰত অৱস্থিত এটা ৰামছাৰ স্থান।"))
    A(R("The state animal of Assam is?",
        "অসমৰ ৰাজ্যিক জন্তু কি?",
        [("One-horned rhinoceros", "এশিঙীয়া গঁড়"), ("Golden langur", "সোণালী বান্দৰ"), ("Elephant", "হাতী"), ("Tiger", "বাঘ")], 0,
        "The Indian one-horned rhinoceros is the state animal of Assam.",
        "ভাৰতীয় এশিঙীয়া গঁড় অসমৰ ৰাজ্যিক জন্তু।"))
    A(R("The state bird of Assam is?",
        "অসমৰ ৰাজ্যিক চৰাই কি?",
        [("White-winged wood duck", "দেওহাঁহ"), ("Peacock", "ময়ূৰ"), ("Parrot", "ভাটৌ"), ("Swan", "ৰাজহংস")], 0,
        "The white-winged wood duck (Deo haah) is the state bird of Assam.",
        "দেওহাঁহ অসমৰ ৰাজ্যিক চৰাই।"))
    A(R("Which one of the following is a renewable source of energy?",
        "তলৰ কোনটো নৱীকৰণযোগ্য শক্তিৰ উৎস?",
        [("Solar energy", "সৌৰ শক্তি"), ("Coal", "কয়লা"), ("Petroleum", "পেট্ৰ'লিয়াম"), ("Natural gas", "প্ৰাকৃতিক গেছ")], 0,
        "Solar energy is renewable, unlike fossil fuels.",
        "সৌৰ শক্তি নৱীকৰণযোগ্য, কিন্তু জীৱাশ্ম ইন্ধন নহয়।"))
    A(R("Which of the following causes air pollution?",
        "তলৰ কোনটোৱে বায়ু প্ৰদূষণ ঘটায়?",
        [("Burning of fossil fuels", "জীৱাশ্ম ইন্ধন দহন"), ("Planting trees", "গছ ৰোপণ"), ("Use of solar energy", "সৌৰ শক্তিৰ ব্যৱহাৰ"), ("Rainfall", "বৰষুণ")], 0,
        "Burning fossil fuels releases pollutants into the air.",
        "জীৱাশ্ম ইন্ধন দহনে বায়ুত প্ৰদূষক নিৰ্গত কৰে।"))

    # ---- Plant biology ----
    A(R("Which part of the plant absorbs water and minerals from the soil?",
        "উদ্ভিদৰ কোন অংশে মাটিৰ পৰা পানী আৰু খনিজ শোষণ কৰে?",
        [("Root", "শিপা"), ("Stem", "কাণ্ড"), ("Leaf", "পাত"), ("Flower", "ফুল")], 0,
        "Roots absorb water and dissolved minerals from the soil.",
        "শিপাই মাটিৰ পৰা পানী আৰু দ্ৰৱীভূত খনিজ শোষণ কৰে।"))
    A(R("The process by which plants lose water as vapour through leaves is called?",
        "উদ্ভিদে পাতৰ জৰিয়তে জলীয় বাষ্প ৰূপে পানী হেৰুওৱা প্ৰক্ৰিয়াক কি বোলা হয়?",
        [("Transpiration", "বাষ্পীভৱন"), ("Photosynthesis", "সালোকসংশ্লেষণ"), ("Respiration", "শ্বসন"), ("Absorption", "শোষণ")], 0,
        "Transpiration is the loss of water vapour from plant leaves.",
        "বাষ্পীভৱন হৈছে উদ্ভিদৰ পাতৰ পৰা জলীয় বাষ্পৰ ক্ষয়।"))
    A(R("Which tissue transports food in plants?",
        "উদ্ভিদত কোন কলাই খাদ্য পৰিবহন কৰে?",
        [("Phloem", "ফ্লয়েম"), ("Xylem", "জাইলেম"), ("Cambium", "কেম্বিয়াম"), ("Epidermis", "এপিডাৰ্মিছ")], 0,
        "Phloem transports prepared food in plants.",
        "ফ্লয়েমে উদ্ভিদত প্ৰস্তুত খাদ্য পৰিবহন কৰে।"))
    A(R("Which tissue conducts water upward in plants?",
        "উদ্ভিদত কোন কলাই পানী ওপৰলৈ পৰিবহন কৰে?",
        [("Xylem", "জাইলেম"), ("Phloem", "ফ্লয়েম"), ("Cortex", "কৰ্টেক্স"), ("Pith", "মজ্জা")], 0,
        "Xylem conducts water and minerals upward from roots.",
        "জাইলেমে শিপাৰ পৰা পানী আৰু খনিজ ওপৰলৈ পৰিবহন কৰে।"))
    A(R("The male reproductive part of a flower is?",
        "ফুলৰ পুং প্ৰজনন অংগ কি?",
        [("Stamen", "পুংকেশৰ"), ("Pistil", "স্ত্ৰীকেশৰ"), ("Ovary", "ডিম্বাশয়"), ("Sepal", "বৃতি")], 0,
        "The stamen is the male reproductive organ of a flower.",
        "পুংকেশৰ ফুলৰ পুং প্ৰজনন অংগ।"))
    A(R("Which gas do plants absorb during photosynthesis?",
        "সালোকসংশ্লেষণত উদ্ভিদে কোন গেছ শোষণ কৰে?",
        [("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Hydrogen", "হাইড্ৰ'জেন")], 0,
        "Plants absorb carbon dioxide for photosynthesis.",
        "উদ্ভিদে সালোকসংশ্লেষণৰ বাবে কাৰ্বন ডাইঅক্সাইড শোষণ কৰে।"))
    A(R("Which part of the plant develops into a fruit?",
        "উদ্ভিদৰ কোন অংশ ফললৈ পৰিণত হয়?",
        [("Ovary", "ডিম্বাশয়"), ("Ovule", "ডিম্বক"), ("Stamen", "পুংকেশৰ"), ("Petal", "পাহি")], 0,
        "The ovary develops into the fruit after fertilisation.",
        "নিষেকৰ পিছত ডিম্বাশয় ফললৈ পৰিণত হয়।"))
    A(R("Which pigment is responsible for the red colour of tomato?",
        "টমেটোৰ ৰঙা ৰঙৰ বাবে কোন ৰঞ্জক দায়ী?",
        [("Lycopene", "লাইক'পিন"), ("Chlorophyll", "ক্ল'ৰ'ফিল"), ("Carotene", "কেৰ'টিন"), ("Xanthophyll", "জেণ্ঠ'ফিল")], 0,
        "Lycopene gives tomato its red colour.",
        "লাইক'পিনে টমেটোক ৰঙা ৰং দিয়ে।"))

    # ---- Classification & microbiology ----
    A(R("Which kingdom includes unicellular eukaryotes like Amoeba?",
        "অ'মিবাৰ দৰে এককোষী ইউকেৰিয়'ট কোন ৰাজ্যত পৰে?",
        [("Protista", "প্ৰ'টিষ্টা"), ("Monera", "মনেৰা"), ("Fungi", "ফাংগাই"), ("Plantae", "প্লাণ্টাই")], 0,
        "Amoeba belongs to the kingdom Protista.",
        "অ'মিবা প্ৰ'টিষ্টা ৰাজ্যৰ অন্তৰ্গত।"))
    A(R("Bacteria belong to which kingdom?",
        "বেক্টেৰিয়া কোন ৰাজ্যৰ অন্তৰ্গত?",
        [("Monera", "মনেৰা"), ("Protista", "প্ৰ'টিষ্টা"), ("Fungi", "ফাংগাই"), ("Animalia", "এনিমেলিয়া")], 0,
        "Bacteria are prokaryotes placed in the kingdom Monera.",
        "বেক্টেৰিয়া প্ৰ'কাৰিয়'ট আৰু মনেৰা ৰাজ্যত পৰে।"))
    A(R("Which microorganism causes tuberculosis?",
        "কোন অণুজীৱে যক্ষ্মা ৰোগ ঘটায়?",
        [("Bacterium", "বেক্টেৰিয়া"), ("Virus", "ভাইৰাছ"), ("Fungus", "ফাংগাছ"), ("Protozoan", "প্ৰ'ট'জ'ৱা")], 0,
        "Tuberculosis is caused by the bacterium Mycobacterium tuberculosis.",
        "মাইক'বেক্টেৰিয়াম টিউবাৰকুল'ছিছ বেক্টেৰিয়াই যক্ষ্মা ৰোগ ঘটায়।"))
    A(R("Which disease is caused by a virus?",
        "কোন ৰোগ ভাইৰাছৰ দ্বাৰা হয়?",
        [("Dengue", "ডেংগু"), ("Typhoid", "টাইফয়ড"), ("Cholera", "কলেৰা"), ("Tetanus", "ধনুষ্টংকাৰ")], 0,
        "Dengue is caused by the dengue virus, spread by mosquitoes.",
        "ডেংগু ভাইৰাছৰ দ্বাৰা হয়, মশাৰ জৰিয়তে বিয়পে।"))
    A(R("Malaria is transmitted by which vector?",
        "মেলেৰিয়া কোন বাহকে সংক্ৰমিত কৰে?",
        [("Female Anopheles mosquito", "মাইকী এন'ফেলিছ মশা"), ("Aedes mosquito", "এডিছ মশা"), ("Housefly", "ঘৰুৱা মাখি"), ("Tick", "উকুন")], 0,
        "Malaria spreads through the bite of the female Anopheles mosquito.",
        "মাইকী এন'ফেলিছ মশাৰ কামোৰত মেলেৰিয়া বিয়পে।"))
    A(R("Which microorganism is used in the production of curd from milk?",
        "গাখীৰৰ পৰা দৈ তৈয়াৰ কৰাত কোন অণুজীৱ ব্যৱহৃত হয়?",
        [("Lactobacillus", "লেক্ট'বেচিলাছ"), ("Yeast", "ঈষ্ট"), ("Rhizobium", "ৰাইজ'বিয়াম"), ("Penicillium", "পেনিচিলিয়াম")], 0,
        "Lactobacillus bacteria curdle milk into curd.",
        "লেক্ট'বেচিলাছ বেক্টেৰিয়াই গাখীৰক দৈলৈ ৰূপান্তৰ কৰে।"))
    A(R("Yeast is used in the baking industry because it produces?",
        "ঈষ্ট বেকিং উদ্যোগত ব্যৱহৃত হয় কাৰণ ই কি উৎপন্ন কৰে?",
        [("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Hydrogen", "হাইড্ৰ'জেন")], 0,
        "Yeast produces carbon dioxide, which makes dough rise.",
        "ঈষ্টে কাৰ্বন ডাইঅক্সাইড উৎপন্ন কৰে, যিয়ে ময়দা ফুলাই তোলে।"))

    # ---- Diseases & immunity ----
    A(R("Which disease is caused by the deficiency of vitamin B1?",
        "কোন ৰোগ ভিটামিন B1 ৰ অভাৱত হয়?",
        [("Beriberi", "বেৰিবেৰি"), ("Scurvy", "স্কাৰ্ভি"), ("Rickets", "ৰিকেটছ"), ("Night blindness", "ৰাতি-অন্ধতা")], 0,
        "Vitamin B1 (thiamine) deficiency causes beriberi.",
        "ভিটামিন B1 (থায়ামিন) ৰ অভাৱত বেৰিবেৰি হয়।"))
    A(R("Which of the following is a viral disease of humans?",
        "তলৰ কোনটো মানুহৰ ভাইৰাছজনিত ৰোগ?",
        [("AIDS", "এইডছ"), ("Typhoid", "টাইফয়ড"), ("Tuberculosis", "যক্ষ্মা"), ("Plague", "প্লেগ")], 0,
        "AIDS is caused by the human immunodeficiency virus (HIV).",
        "এইডছ হিউমেন ইমিউন'ডেফিচিয়েন্সি ভাইৰাছ (HIV) ৰ দ্বাৰা হয়।"))
    A(R("Which cells of the human body fight infection?",
        "মানৱ শৰীৰৰ কোন কোষে সংক্ৰমণৰ বিৰুদ্ধে যুঁজে?",
        [("White blood cells", "বগা তেজ কণিকা"), ("Red blood cells", "ৰঙা তেজ কণিকা"), ("Platelets", "অণুচক্ৰিকা"), ("Plasma", "প্লাজমা")], 0,
        "White blood cells defend the body against infection.",
        "বগা তেজ কণিকাই শৰীৰক সংক্ৰমণৰ পৰা ৰক্ষা কৰে।"))
    A(R("The largest organ of the human body is?",
        "মানৱ শৰীৰৰ আটাইতকৈ ডাঙৰ অংগ কি?",
        [("Skin", "ছাল"), ("Liver", "যকৃত"), ("Brain", "মগজু"), ("Heart", "হৃদযন্ত্ৰ")], 0,
        "The skin is the largest organ of the human body.",
        "ছাল মানৱ শৰীৰৰ আটাইতকৈ ডাঙৰ অংগ।"))
    A(R("The largest gland in the human body is?",
        "মানৱ শৰীৰৰ আটাইতকৈ ডাঙৰ গ্ৰন্থি কি?",
        [("Liver", "যকৃত"), ("Pancreas", "অগ্নাশয়"), ("Thyroid", "থাইৰয়ড"), ("Salivary gland", "লালটি গ্ৰন্থি")], 0,
        "The liver is the largest gland in the human body.",
        "যকৃত মানৱ শৰীৰৰ আটাইতকৈ ডাঙৰ গ্ৰন্থি।"))

    # ---- Assam-specific biology ----
    A(R("The golden langur is mainly found in which state of India?",
        "সোণালী বান্দৰ ভাৰতৰ কোন ৰাজ্যত মূলতঃ পোৱা যায়?",
        [("Assam", "অসম"), ("Kerala", "কেৰালা"), ("Gujarat", "গুজৰাট"), ("Punjab", "পঞ্জাব")], 0,
        "The golden langur is found in Assam, mainly in the Chakrashila sanctuary.",
        "সোণালী বান্দৰ অসমত, মূলতঃ চক্ৰশিলা অভয়াৰণ্যত পোৱা যায়।"))
    A(R("Which is the only ape species found in India?",
        "ভাৰতত পোৱা একমাত্ৰ নৰবান্দৰ প্ৰজাতি কোনটো?",
        [("Hoolock gibbon", "হুলক গিবন"), ("Chimpanzee", "চিম্পাঞ্জী"), ("Gorilla", "গৰিলা"), ("Orangutan", "অৰাংগুটান")], 0,
        "The hoolock gibbon is the only ape found in India, seen in Assam.",
        "হুলক গিবন ভাৰতত পোৱা একমাত্ৰ নৰবান্দৰ, অসমত দেখা যায়।"))
    A(R("Which is the largest mammal in the world?",
        "বিশ্বৰ আটাইতকৈ ডাঙৰ স্তন্যপায়ী প্ৰাণী কোনটো?",
        [("Blue whale", "নীলা তিমি"), ("Elephant", "হাতী"), ("Giraffe", "জিৰাফ"), ("Hippopotamus", "জলহস্তী")], 0,
        "The blue whale is the largest mammal in the world.",
        "নীলা তিমি বিশ্বৰ আটাইতকৈ ডাঙৰ স্তন্যপায়ী প্ৰাণী।"))
    A(R("Which bird is known as the largest bird in the world?",
        "বিশ্বৰ আটাইতকৈ ডাঙৰ চৰাই কোনটো?",
        [("Ostrich", "অ'ষ্ট্ৰিচ"), ("Eagle", "ঈগল"), ("Emu", "ঈমু"), ("Peacock", "ময়ূৰ")], 0,
        "The ostrich is the largest living bird.",
        "অ'ষ্ট্ৰিচ জীৱিত আটাইতকৈ ডাঙৰ চৰাই।"))
    A(R("Pobitora Wildlife Sanctuary is famous for?",
        "পবিতৰা অভয়াৰণ্য কিৰ বাবে বিখ্যাত?",
        [("One-horned rhinoceros", "এশিঙীয়া গঁড়"), ("Elephant", "হাতী"), ("Tiger", "বাঘ"), ("Deer", "হৰিণ")], 0,
        "Pobitora is famous for its high density of one-horned rhinoceros.",
        "পবিতৰা এশিঙীয়া গঁড়ৰ উচ্চ ঘনত্বৰ বাবে বিখ্যাত।"))

    # ---- More human body ----
    A(R("The smallest bone in the human body is?",
        "মানৱ শৰীৰৰ আটাইতকৈ সৰু হাড় কি?",
        [("Stapes", "ষ্টেপিছ"), ("Femur", "ফিমাৰ"), ("Tibia", "টিবিয়া"), ("Humerus", "হিউমেৰাছ")], 0,
        "The stapes, in the middle ear, is the smallest bone.",
        "মাজৰ কাণত থকা ষ্টেপিছ আটাইতকৈ সৰু হাড়।"))
    A(R("The longest bone in the human body is?",
        "মানৱ শৰীৰৰ আটাইতকৈ দীঘল হাড় কি?",
        [("Femur", "ফিমাৰ"), ("Stapes", "ষ্টেপিছ"), ("Radius", "ৰেডিয়াছ"), ("Ulna", "আলনা")], 0,
        "The femur (thigh bone) is the longest bone.",
        "ফিমাৰ (জঙ্ঘাৰ হাড়) আটাইতকৈ দীঘল হাড়।"))
    A(R("Which organ pumps blood throughout the body?",
        "কোন অংগই সমগ্ৰ শৰীৰত তেজ পাম্প কৰে?",
        [("Heart", "হৃদযন্ত্ৰ"), ("Lungs", "হাওঁফাওঁ"), ("Liver", "যকৃত"), ("Kidney", "বৃক্ক")], 0,
        "The heart pumps blood through the circulatory system.",
        "হৃদযন্ত্ৰই সংবহন তন্ত্ৰৰ জৰিয়তে তেজ পাম্প কৰে।"))
    A(R("How many chambers does the human heart have?",
        "মানৱ হৃদযন্ত্ৰত কিমানটা কোঠালি থাকে?",
        [("Four", "চাৰিটা"), ("Two", "দুটাকৈ"), ("Three", "তিনিটা"), ("Five", "পাঁচটা")], 0,
        "The human heart has four chambers: two atria and two ventricles.",
        "মানৱ হৃদযন্ত্ৰত চাৰিটা কোঠালি থাকে: দুটা আলিন্দ আৰু দুটা নিলয়।"))
    A(R("Which organ filters waste from the blood in the human body?",
        "মানৱ শৰীৰত কোন অংগই তেজৰ পৰা আৱৰ্জনা ছাঁননি কৰে?",
        [("Kidney", "বৃক্ক"), ("Liver", "যকৃত"), ("Heart", "হৃদযন্ত্ৰ"), ("Spleen", "প্লীহা")], 0,
        "The kidneys filter waste products from the blood as urine.",
        "বৃক্কই তেজৰ পৰা আৱৰ্জনা প্ৰস্ৰাৱ ৰূপে ছাঁননি কৰে।"))
    A(R("Which gas is exhaled during respiration by humans?",
        "মানুহে শ্বসনত কোন গেছ ত্যাগ কৰে?",
        [("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Hydrogen", "হাইড্ৰ'জেন")], 0,
        "Humans exhale carbon dioxide produced during respiration.",
        "মানুহে শ্বসনত উৎপন্ন কাৰ্বন ডাইঅক্সাইড ত্যাগ কৰে।"))
    A(R("The number of muscles in the human body is about?",
        "মানৱ শৰীৰত প্ৰায় কিমানটা পেশী থাকে?",
        [("600", "৬০০"), ("206", "২০৬"), ("300", "৩০০"), ("450", "৪৫০")], 0,
        "The human body has about 600 muscles.",
        "মানৱ শৰীৰত প্ৰায় ৬০০ টা পেশী থাকে।"))
    A(R("Insulin is secreted by which organ?",
        "ইনচুলিন কোন অংগই নিঃসৰণ কৰে?",
        [("Pancreas", "অগ্নাশয়"), ("Liver", "যকৃত"), ("Kidney", "বৃক্ক"), ("Thyroid", "থাইৰয়ড")], 0,
        "The pancreas secretes insulin from its beta cells.",
        "অগ্নাশয়ে ইয়াৰ বিটা কোষৰ পৰা ইনচুলিন নিঃসৰণ কৰে।"))
    A(R("Which part of the human eye controls the amount of light entering it?",
        "মানৱ চকুৰ কোন অংশই ভিতৰলৈ সোমোৱা পোহৰৰ পৰিমাণ নিয়ন্ত্ৰণ কৰে?",
        [("Iris", "তাৰা"), ("Cornea", "কৰ্ণিয়া"), ("Retina", "ৰেটিনা"), ("Lens", "লেন্ছ")], 0,
        "The iris controls the size of the pupil and hence light entry.",
        "তাৰাই তাৰালিৰ আকাৰ নিয়ন্ত্ৰণ কৰি পোহৰ প্ৰৱেশ নিয়ন্ত্ৰণ কৰে।"))
    A(R("The deficiency of which mineral causes weak bones and teeth?",
        "কোন খনিজৰ অভাৱত হাড় আৰু দাঁত দুৰ্বল হয়?",
        [("Calcium", "কেলচিয়াম"), ("Iron", "লো"), ("Iodine", "আয়'ডিন"), ("Zinc", "জিংক")], 0,
        "Calcium is essential for strong bones and teeth.",
        "কেলচিয়াম সবল হাড় আৰু দাঁতৰ বাবে অত্যাৱশ্যক।"))

    # ---- More general biology ----
    A(R("Photosynthesis takes place in which part of the plant cell?",
        "সালোকসংশ্লেষণ উদ্ভিদ কোষৰ কোন অংশত হয়?",
        [("Chloroplast", "ক্ল'ৰ'প্লাষ্ট"), ("Mitochondria", "মাইট'কণ্ড্ৰিয়া"), ("Nucleus", "কোষকেন্দ্ৰ"), ("Ribosome", "ৰাইব'ছ'ম")], 0,
        "Photosynthesis occurs in the chloroplasts, which contain chlorophyll.",
        "সালোকসংশ্লেষণ ক্ল'ৰ'প্লাষ্টত হয়, য'ত ক্ল'ৰ'ফিল থাকে।"))
    A(R("Which cell organelle is known as the powerhouse of the cell?",
        "কোন কোষ অংগাণুকক কোষৰ শক্তি-গৃহ বোলা হয়?",
        [("Mitochondria", "মাইট'কণ্ড্ৰিয়া"), ("Ribosome", "ৰাইব'ছ'ম"), ("Lysosome", "লাইছ'ছ'ম"), ("Golgi body", "গলজি বডি")], 0,
        "Mitochondria release energy as ATP and are called the powerhouse of the cell.",
        "মাইট'কণ্ড্ৰিয়াই ATP ৰূপে শক্তি মুক্ত কৰে আৰু ইয়াক কোষৰ শক্তি-গৃহ বোলা হয়।"))
    A(R("The process by which green plants make their own food is called?",
        "সেউজীয়া উদ্ভিদে নিজৰ খাদ্য নিজে প্ৰস্তুত কৰা প্ৰক্ৰিয়াক কি বোলা হয়?",
        [("Photosynthesis", "সালোকসংশ্লেষণ"), ("Respiration", "শ্বসন"), ("Transpiration", "বাষ্পীভৱন"), ("Digestion", "পাচন")], 0,
        "Green plants make food by photosynthesis using sunlight.",
        "সেউজীয়া উদ্ভিদে সূৰ্যৰ পোহৰ ব্যৱহাৰ কৰি সালোকসংশ্লেষণৰ দ্বাৰা খাদ্য প্ৰস্তুত কৰে।"))
    A(R("Which of the following is a unicellular organism?",
        "তলৰ কোনটো এককোষী জীৱ?",
        [("Amoeba", "অ'মিবা"), ("Hydra", "হাইড্ৰা"), ("Earthworm", "কেঁচু"), ("Sponge", "স্পঞ্জ")], 0,
        "Amoeba is a single-celled organism.",
        "অ'মিবা এটা এককোষী জীৱ।"))
    A(R("Which blood group is called the universal donor?",
        "কোন ৰক্ত-গোটক সৰ্বজনীন দাতা বোলা হয়?",
        [("O negative", "O নেগেটিভ"), ("AB positive", "AB পজিটিভ"), ("A positive", "A পজিটিভ"), ("B positive", "B পজিটিভ")], 0,
        "O negative blood is called the universal donor blood group.",
        "O নেগেটিভ তেজক সৰ্বজনীন দাতা ৰক্ত-গোট বোলা হয়।"))
    A(R("Which blood group is called the universal recipient?",
        "কোন ৰক্ত-গোটক সৰ্বজনীন গ্ৰহণকৰ্তা বোলা হয়?",
        [("AB positive", "AB পজিটিভ"), ("O negative", "O নেগেটিভ"), ("A negative", "A নেগেটিভ"), ("B negative", "B নেগেটিভ")], 0,
        "AB positive blood is called the universal recipient blood group.",
        "AB পজিটিভ তেজক সৰ্বজনীন গ্ৰহণকৰ্তা ৰক্ত-গোট বোলা হয়।"))
    A(R("Which vitamin is produced in the human body on exposure to sunlight?",
        "সূৰ্যৰ পোহৰত মানৱ শৰীৰত কোন ভিটামিন উৎপন্ন হয়?",
        [("Vitamin D", "ভিটামিন D"), ("Vitamin A", "ভিটামিন A"), ("Vitamin C", "ভিটামিন C"), ("Vitamin K", "ভিটামিন K")], 0,
        "Sunlight helps the skin synthesise vitamin D.",
        "সূৰ্যৰ পোহৰে ছালক ভিটামিন D সংশ্লেষণত সহায় কৰে।"))
    A(R("The study of the human body is called?",
        "মানৱ শৰীৰৰ অধ্যয়নক কি বোলা হয়?",
        [("Anatomy", "শৰীৰতত্ত্ব"), ("Botany", "উদ্ভিদবিজ্ঞান"), ("Zoology", "প্ৰাণীবিজ্ঞান"), ("Ecology", "পৰিৱেশবিজ্ঞান")], 0,
        "Anatomy is the study of the structure of the human body.",
        "শৰীৰতত্ত্ব হৈছে মানৱ শৰীৰৰ গঠনৰ অধ্যয়ন।"))
    A(R("Which of the following is a biodegradable waste?",
        "তলৰ কোনটো জৈৱ-বিয়োজনীয় আৱৰ্জনা?",
        [("Vegetable peel", "পাচলিৰ বাকলি"), ("Plastic bag", "প্লাষ্টিকৰ মোনা"), ("Glass bottle", "কাচৰ বটল"), ("Aluminium can", "এলুমিনিয়াম কেণ")], 0,
        "Vegetable peels are biodegradable, broken down by microorganisms.",
        "পাচলিৰ বাকলি জৈৱ-বিয়োজনীয়, অণুজীৱে ইয়াক বিয়োজিত কৰে।"))
    A(R("Which of the following is a non-biodegradable waste?",
        "তলৰ কোনটো অ-জৈৱ-বিয়োজনীয় আৱৰ্জনা?",
        [("Plastic", "প্লাষ্টিক"), ("Paper", "কাগজ"), ("Leaf", "পাত"), ("Food waste", "খাদ্য আৱৰ্জনা")], 0,
        "Plastic is non-biodegradable and persists in the environment.",
        "প্লাষ্টিক অ-জৈৱ-বিয়োজনীয় আৰু পৰিৱেশত থাকি যায়।"))

    # ---- Reproduction & growth ----
    A(R("The fusion of male and female gametes is called?",
        "পুং আৰু মাইকী জনন কোষৰ মিলনক কি বোলা হয়?",
        [("Fertilisation", "নিষেক"), ("Pollination", "পৰাগযোগ"), ("Germination", "অংকুৰণ"), ("Fission", "বিভাজন")], 0,
        "Fertilisation is the fusion of male and female gametes.",
        "নিষেক হৈছে পুং আৰু মাইকী জনন কোষৰ মিলন।"))
    A(R("The transfer of pollen from anther to stigma is called?",
        "পৰাগকেশৰৰ পৰা গৰ্ভমুণ্ডলৈ পৰাগ ৰেণুৰ স্থানান্তৰণক কি বোলা হয়?",
        [("Pollination", "পৰাগযোগ"), ("Fertilisation", "নিষেক"), ("Germination", "অংকুৰণ"), ("Transpiration", "বাষ্পীভৱন")], 0,
        "Pollination is the transfer of pollen to the stigma.",
        "পৰাগযোগ হৈছে গৰ্ভমুণ্ডলৈ পৰাগ ৰেণুৰ স্থানান্তৰণ।"))
    A(R("Which part of a seed stores food for the growing plant?",
        "বীজৰ কোন অংশই গজা উদ্ভিদৰ বাবে খাদ্য সঞ্চয় কৰে?",
        [("Cotyledon", "বীজপত্ৰ"), ("Seed coat", "বীজৰ বাকলি"), ("Radicle", "মূলাঙ্কুৰ"), ("Plumule", "প্ৰৰোহ")], 0,
        "Cotyledons store food for the young plant.",
        "বীজপত্ৰই সৰু উদ্ভিদৰ বাবে খাদ্য সঞ্চয় কৰে।"))
    A(R("The growing of a seed into a young plant is called?",
        "বীজৰ পৰা সৰু উদ্ভিদ হোৱা প্ৰক্ৰিয়াক কি বোলা হয়?",
        [("Germination", "অংকুৰণ"), ("Pollination", "পৰাগযোগ"), ("Fertilisation", "নিষেক"), ("Transpiration", "বাষ্পীভৱন")], 0,
        "Germination is the growth of a seed into a seedling.",
        "অংকুৰণ হৈছে বীজৰ পৰা পুলি হোৱা প্ৰক্ৰিয়া।"))
    A(R("Which of the following reproduces by binary fission?",
        "তলৰ কোনটো দ্বি-বিভাজনৰ জৰিয়তে বংশবৃদ্ধি কৰে?",
        [("Amoeba", "অ'মিবা"), ("Hydra", "হাইড্ৰা"), ("Rose", "গোলাপ"), ("Fern", "ঢেকীয়াশাক")], 0,
        "Amoeba reproduces asexually by binary fission.",
        "অ'মিবাই দ্বি-বিভাজনৰ জৰিয়তে অযৌন বংশবৃদ্ধি কৰে।"))

    # ---- Nervous system ----
    A(R("The functional unit of the nervous system is?",
        "স্নায়ু তন্ত্ৰৰ কাৰ্যকৰী একক কি?",
        [("Neuron", "স্নায়ুকোষ"), ("Nephron", "নেফ্ৰন"), ("Alveolus", "এলভিঅ'লাছ"), ("Sarcomere", "ছাৰ্ক'মিয়াৰ")], 0,
        "The neuron is the structural and functional unit of the nervous system.",
        "স্নায়ুকোষ স্নায়ু তন্ত্ৰৰ গাঁথনিগত আৰু কাৰ্যকৰী একক।"))
    A(R("Which part of the brain is the largest?",
        "মগজুৰ কোন অংশ আটাইতকৈ ডাঙৰ?",
        [("Cerebrum", "চেৰিব্ৰাম"), ("Cerebellum", "চেৰিবেলাম"), ("Medulla", "মেডুলা"), ("Hypothalamus", "হাইপ'থেলামাছ")], 0,
        "The cerebrum is the largest part of the human brain.",
        "চেৰিব্ৰাম মানৱ মগজুৰ আটাইতকৈ ডাঙৰ অংশ।"))
    A(R("Which organ is protected by the skull?",
        "কোন অংগ কৰোঁটৰ দ্বাৰা সুৰক্ষিত থাকে?",
        [("Brain", "মগজু"), ("Heart", "হৃদযন্ত্ৰ"), ("Lungs", "হাওঁফাওঁ"), ("Liver", "যকৃত")], 0,
        "The skull protects the brain.",
        "কৰোঁটে মগজুক সুৰক্ষা দিয়ে।"))

    # ---- Vitamins & health ----
    A(R("Which vitamin is also known as ascorbic acid?",
        "কোন ভিটামিনক এছকৰবিক আম্ল বুলিও জনা যায়?",
        [("Vitamin C", "ভিটামিন C"), ("Vitamin A", "ভিটামিন A"), ("Vitamin D", "ভিটামিন D"), ("Vitamin E", "ভিটামিন E")], 0,
        "Vitamin C is chemically known as ascorbic acid.",
        "ভিটামিন C ক ৰাসায়নিকভাৱে এছকৰবিক আম্ল বোলা হয়।"))
    A(R("Which vitamin is essential for good eyesight?",
        "ভাল দৃষ্টিশক্তিৰ বাবে কোন ভিটামিন অত্যাৱশ্যক?",
        [("Vitamin A", "ভিটামিন A"), ("Vitamin C", "ভিটামিন C"), ("Vitamin D", "ভিটামিন D"), ("Vitamin K", "ভিটামিন K")], 0,
        "Vitamin A is essential for healthy vision.",
        "ভিটামিন A সুস্থ দৃষ্টিশক্তিৰ বাবে অত্যাৱশ্যক।"))
    A(R("Anaemia is caused by the deficiency of which nutrient?",
        "কোন পুষ্টিৰ অভাৱত ৰক্তাল্পতা হয়?",
        [("Iron", "লো"), ("Calcium", "কেলচিয়াম"), ("Iodine", "আয়'ডিন"), ("Sodium", "ছ'ডিয়াম")], 0,
        "Iron deficiency causes anaemia.",
        "লোৰ অভাৱত ৰক্তাল্পতা হয়।"))
    A(R("Which nutrient is called the body-building nutrient?",
        "কোন পুষ্টিক শৰীৰ-গঠনকাৰী পুষ্টি বোলা হয়?",
        [("Protein", "প্ৰ'টিন"), ("Carbohydrate", "শৰ্কৰা"), ("Fat", "চৰ্বি"), ("Vitamin", "ভিটামিন")], 0,
        "Proteins are called body-building nutrients as they help growth and repair.",
        "প্ৰ'টিনে বৃদ্ধি আৰু মেৰামতিৰ সহায় কৰে, সেয়ে ইয়াক শৰীৰ-গঠনকাৰী পুষ্টি বোলা হয়।"))

    # ---- Environment & biodiversity ----
    A(R("Which of the following is a primary consumer in a food chain?",
        "খাদ্য শৃংখলত তলৰ কোনটো প্ৰাথমিক খাদক?",
        [("Herbivore", "তৃণভোজী"), ("Carnivore", "মাংসভোজী"), ("Producer", "উৎপাদক"), ("Decomposer", "বিয়োজক")], 0,
        "Herbivores are primary consumers that eat producers.",
        "তৃণভোজী প্ৰাথমিক খাদক, যিয়ে উৎপাদক খায়।"))
    A(R("The 10 percent law of energy transfer in food chains was given by?",
        "খাদ্য শৃংখলত শক্তি স্থানান্তৰণৰ ১০ শতাংশ বিধি কোনে দিছিল?",
        [("Lindeman", "লিণ্ডেমেন"), ("Darwin", "ডাৰউইন"), ("Mendel", "মেণ্ডেল"), ("Odum", "অ'ডাম")], 0,
        "Raymond Lindeman proposed the 10 percent law of energy transfer.",
        "ৰেমণ্ড লিণ্ডেমেনে শক্তি স্থানান্তৰণৰ ১০ শতাংশ বিধি প্ৰস্তাৱ কৰিছিল।"))
    A(R("Which of the following is a decomposer in an ecosystem?",
        "পৰিৱেশ তন্ত্ৰত তলৰ কোনটো বিয়োজক?",
        [("Fungi", "ফাংগাই"), ("Grass", "ঘাঁহ"), ("Deer", "হৰিণ"), ("Lion", "সিংহ")], 0,
        "Fungi and bacteria are decomposers that break down dead matter.",
        "ফাংগাই আৰু বেক্টেৰিয়া বিয়োজক, যিয়ে মৃত পদাৰ্থ বিয়োজন কৰে।"))
    A(R("Which is the state flower of Assam?",
        "অসমৰ ৰাজ্যিক ফুল কি?",
        [("Kopou phul (Foxtail orchid)", "কপৌ ফুল"), ("Lotus", "পদুম"), ("Sunflower", "সূৰ্যমুখী"), ("Rose", "গোলাপ")], 0,
        "The foxtail orchid (Kopou phul) is the state flower of Assam.",
        "কপৌ ফুল অসমৰ ৰাজ্যিক ফুল।"))
    A(R("Which is the state tree of Assam?",
        "অসমৰ ৰাজ্যিক বৃক্ষ কি?",
        [("Hollong", "হলং"), ("Banyan", "বট"), ("Neem", "নিম"), ("Mango", "আম")], 0,
        "Hollong (Dipterocarpus macrocarpus) is the state tree of Assam.",
        "হলং অসমৰ ৰাজ্যিক বৃক্ষ।"))
    A(R("Which gas in the atmosphere protects us from harmful ultraviolet rays?",
        "বায়ুমণ্ডলৰ কোন গেছে ক্ষতিকাৰক অতিবেঙুনীয় ৰশ্মিৰ পৰা ৰক্ষা কৰে?",
        [("Ozone", "অ'জ'ন"), ("Oxygen", "অক্সিজেন"), ("Nitrogen", "নাইট্ৰ'জেন"), ("Carbon dioxide", "কাৰ্বন ডাইঅক্সাইড")], 0,
        "The ozone layer absorbs harmful ultraviolet rays.",
        "অ'জ'ন স্তৰে ক্ষতিকাৰক অতিবেঙুনীয় ৰশ্মি শোষণ কৰে।"))
    A(R("Which of the following is a renewable natural resource?",
        "তলৰ কোনটো নৱীকৰণযোগ্য প্ৰাকৃতিক সম্পদ?",
        [("Forest", "বন"), ("Coal", "কয়লা"), ("Petroleum", "পেট্ৰ'লিয়াম"), ("Minerals", "খনিজ")], 0,
        "Forests are renewable resources as they can regrow.",
        "বন নৱীকৰণযোগ্য সম্পদ, কাৰণ ই পুনৰ গজিব পাৰে।"))
    A(R("The Chipko Movement was mainly associated with?",
        "চিপক' আন্দোলন মূলতঃ কিৰ সৈতে জড়িত আছিল?",
        [("Protection of trees", "গছ সুৰক্ষা"), ("Water conservation", "জল সংৰক্ষণ"), ("Wildlife protection", "বন্যপ্ৰাণী সুৰক্ষা"), ("Soil conservation", "মাটি সংৰক্ষণ")], 0,
        "The Chipko Movement aimed to protect trees from felling.",
        "চিপক' আন্দোলনৰ উদ্দেশ্য আছিল গছ কটাৰ পৰা ৰক্ষা কৰা।"))

    # ---- More physiology ----
    A(R("Which organ is the main site of absorption of digested food?",
        "পাচিত খাদ্য শোষণৰ মূল স্থান কোন অংগ?",
        [("Small intestine", "ক্ষুদ্ৰান্ত্ৰ"), ("Stomach", "পেট"), ("Large intestine", "বৃহদান্ত্ৰ"), ("Oesophagus", "অন্ননলী")], 0,
        "Most nutrients are absorbed in the small intestine.",
        "বেছিভাগ পুষ্টি ক্ষুদ্ৰান্ত্ৰত শোষিত হয়।"))
    A(R("Which enzyme in saliva begins the digestion of starch?",
        "লালটিৰ কোন এনজাইমে শৰ্কৰাৰ পাচন আৰম্ভ কৰে?",
        [("Salivary amylase", "লালটি এমাইলেজ"), ("Pepsin", "পেপচিন"), ("Trypsin", "ট্ৰিপচিন"), ("Lipase", "লাইপেজ")], 0,
        "Salivary amylase starts the digestion of starch in the mouth.",
        "লালটি এমাইলেজে মুখতে শৰ্কৰাৰ পাচন আৰম্ভ কৰে।"))
    A(R("The process by which the body maintains a steady internal state is called?",
        "শৰীৰে স্থিৰ আভ্যন্তৰীণ অৱস্থা ৰক্ষা কৰা প্ৰক্ৰিয়াক কি বোলা হয়?",
        [("Homeostasis", "হ'মিঅ'ষ্টেছিছ"), ("Metabolism", "বিপাক"), ("Osmosis", "অভিসৰণ"), ("Diffusion", "বিস্তাৰ")], 0,
        "Homeostasis is the maintenance of a stable internal environment.",
        "হ'মিঅ'ষ্টেছিছ হৈছে স্থিৰ আভ্যন্তৰীণ পৰিৱেশ ৰক্ষা কৰা।"))
    A(R("Which of the following is the largest part of the human brain?",
        "তলৰ কোনটো মানৱ মগজুৰ আটাইতকৈ ডাঙৰ অংশ?",
        [("Cerebrum", "চেৰিব্ৰাম"), ("Cerebellum", "চেৰিবেলাম"), ("Medulla", "মেডুলা"), ("Spinal cord", "স্নায়ু ৰজ্জু")], 0,
        "The cerebrum occupies the largest part of the brain.",
        "চেৰিব্ৰামে মগজুৰ আটাইতকৈ ডাঙৰ অংশ অধিকাৰ কৰে।"))
    A(R("The colour of blood is red because of the presence of?",
        "তেজ ৰঙা হয় কাৰণ ইয়াত কি থাকে?",
        [("Haemoglobin", "হিম'গ্লবিন"), ("Plasma", "প্লাজমা"), ("Platelets", "অণুচক্ৰিকা"), ("Water", "পানী")], 0,
        "Haemoglobin, an iron-containing pigment, gives blood its red colour.",
        "লো-যুক্ত ৰঞ্জক হিম'গ্লবিনে তেজক ৰঙা ৰং দিয়ে।"))
    A(R("Which of the following is a function of the white blood cells?",
        "তলৰ কোনটো বগা তেজ কণিকাৰ কাৰ্য?",
        [("Defending the body against germs", "শৰীৰক কীটাণুৰ পৰা ৰক্ষা কৰা"), ("Carrying oxygen", "অক্সিজেন পৰিবহন কৰা"), ("Clotting blood", "তেজ জমাট বন্ধোৱা"), ("Carrying nutrients", "পুষ্টি পৰিবহন কৰা")], 0,
        "White blood cells defend the body against infection.",
        "বগা তেজ কণিকাই শৰীৰক সংক্ৰমণৰ পৰা ৰক্ষা কৰে।"))

    # ---- Miscellaneous biology ----
    A(R("Which of the following is the longest cell in the human body?",
        "তলৰ কোনটো মানৱ শৰীৰৰ আটাইতকৈ দীঘল কোষ?",
        [("Nerve cell", "স্নায়ুকোষ"), ("Red blood cell", "ৰঙা তেজ কণিকা"), ("Muscle cell", "পেশী কোষ"), ("Skin cell", "ছালৰ কোষ")], 0,
        "Nerve cells (neurons) are the longest cells in the human body.",
        "স্নায়ুকোষ মানৱ শৰীৰৰ আটাইতকৈ দীঘল কোষ।"))
    A(R("The process of cell division that produces gametes is called?",
        "জনন কোষ উৎপন্ন কৰা কোষ বিভাজন প্ৰক্ৰিয়াক কি বোলা হয়?",
        [("Meiosis", "মিয়'ছিছ"), ("Mitosis", "মাইট'ছিছ"), ("Binary fission", "দ্বি-বিভাজন"), ("Budding", "মুকুলোদগম")], 0,
        "Meiosis produces gametes with half the chromosome number.",
        "মিয়'ছিছে আধা ক্ৰ'ম'জম সংখ্যাৰ জনন কোষ উৎপন্ন কৰে।"))
    A(R("Mitosis results in the formation of?",
        "মাইট'ছিছৰ ফলত কি গঠন হয়?",
        [("Two identical cells", "দুটা অভিন্ন কোষ"), ("Four gametes", "চাৰিটা জনন কোষ"), ("One cell", "এটা কোষ"), ("Eight cells", "আঠটা কোষ")], 0,
        "Mitosis produces two genetically identical daughter cells.",
        "মাইট'ছিছে দুটা বংশগতিভাৱে অভিন্ন অপত্য কোষ উৎপন্ন কৰে।"))
    A(R("Which of the following is the largest flower in the world?",
        "তলৰ কোনটো বিশ্বৰ আটাইতকৈ ডাঙৰ ফুল?",
        [("Rafflesia", "ৰাফ্লেছিয়া"), ("Sunflower", "সূৰ্যমুখী"), ("Lotus", "পদুম"), ("Rose", "গোলাপ")], 0,
        "Rafflesia arnoldii produces the largest single flower in the world.",
        "ৰাফ্লেছিয়া আৰনল্ডাই বিশ্বৰ আটাইতকৈ ডাঙৰ এটা ফুল উৎপন্ন কৰে।"))
    A(R("Which of the following animals is a mammal that lays eggs?",
        "তলৰ কোনটো স্তন্যপায়ী প্ৰাণীয়ে কণী পাৰে?",
        [("Platypus", "প্লেটিপাছ"), ("Bat", "বাদুলি"), ("Whale", "তিমি"), ("Kangaroo", "কেংগেৰু")], 0,
        "The platypus is an egg-laying mammal.",
        "প্লেটিপাছ এটা কণী পৰা স্তন্যপায়ী প্ৰাণী।"))
    A(R("Which of the following is a flying mammal?",
        "তলৰ কোনটো উৰণীয়া স্তন্যপায়ী প্ৰাণী?",
        [("Bat", "বাদুলি"), ("Squirrel", "কটৌ"), ("Flying fish", "উৰণীয়া মাছ"), ("Pigeon", "পাৰ")], 0,
        "Bats are the only mammals capable of true flight.",
        "বাদুলি হৈছে প্ৰকৃত উৰণৰ ক্ষমতা থকা একমাত্ৰ স্তন্যপায়ী প্ৰাণী।"))
    A(R("The respiratory organ of fish is?",
        "মাছৰ শ্বসন অংগ কি?",
        [("Gills", "ফুলকা"), ("Lungs", "হাওঁফাওঁ"), ("Skin", "ছাল"), ("Trachea", "ট্ৰেকিয়া")], 0,
        "Fish breathe through gills.",
        "মাছে ফুলকাৰ জৰিয়তে শ্বাস লয়।"))
    A(R("Which of the following is a cold-blooded animal?",
        "তলৰ কোনটো শীতল-ৰক্তৰ প্ৰাণী?",
        [("Fish", "মাছ"), ("Dog", "কুকুৰ"), ("Cow", "গৰু"), ("Human", "মানুহ")], 0,
        "Fish are cold-blooded (ectothermic) animals.",
        "মাছ শীতল-ৰক্তৰ প্ৰাণী।"))
    A(R("Which part of the human digestive system produces bile?",
        "মানৱ পাচন তন্ত্ৰৰ কোন অংশই পিত্ত উৎপন্ন কৰে?",
        [("Liver", "যকৃত"), ("Gall bladder", "পিত্তথলী"), ("Pancreas", "অগ্নাশয়"), ("Stomach", "পেট")], 0,
        "The liver produces bile, which is stored in the gall bladder.",
        "যকৃতই পিত্ত উৎপন্ন কৰে, যি পিত্তথলীত সঞ্চিত থাকে।"))
    A(R("Which of the following is essential for the clotting of blood?",
        "তেজ জমাট বন্ধাৰ বাবে তলৰ কোনটো অত্যাৱশ্যক?",
        [("Platelets", "অণুচক্ৰিকা"), ("Plasma", "প্লাজমা"), ("Red blood cells", "ৰঙা তেজ কণিকা"), ("Water", "পানী")], 0,
        "Platelets help in the clotting of blood.",
        "অণুচক্ৰিকাই তেজ জমাট বন্ধাত সহায় কৰে।"))
    A(R("Which of the following is the largest organ inside the human body?",
        "তলৰ কোনটো মানৱ শৰীৰৰ ভিতৰৰ আটাইতকৈ ডাঙৰ অংগ?",
        [("Liver", "যকৃত"), ("Heart", "হৃদযন্ত্ৰ"), ("Stomach", "পেট"), ("Lung", "হাওঁফাওঁ")], 0,
        "The liver is the largest internal organ of the human body.",
        "যকৃত মানৱ শৰীৰৰ ভিতৰৰ আটাইতকৈ ডাঙৰ অংগ।"))
    A(R("Which part of the plant is called the food factory?",
        "উদ্ভিদৰ কোন অংশক খাদ্য কাৰখানা বোলা হয়?",
        [("Leaf", "পাত"), ("Root", "শিপা"), ("Stem", "কাণ্ড"), ("Flower", "ফুল")], 0,
        "Leaves make food by photosynthesis and are called the food factory.",
        "পাতে সালোকসংশ্লেষণৰ দ্বাৰা খাদ্য প্ৰস্তুত কৰে, সেয়ে ইয়াক খাদ্য কাৰখানা বোলা হয়।"))
    A(R("Which of the following blood cells carries oxygen?",
        "তলৰ কোন তেজ কণিকাই অক্সিজেন পৰিবহন কৰে?",
        [("Red blood cells", "ৰঙা তেজ কণিকা"), ("White blood cells", "বগা তেজ কণিকা"), ("Platelets", "অণুচক্ৰিকা"), ("Plasma", "প্লাজমা")], 0,
        "Red blood cells carry oxygen using haemoglobin.",
        "ৰঙা তেজ কণিকাই হিম'গ্লবিনৰ জৰিয়তে অক্সিজেন পৰিবহন কৰে।"))
    A(R("Which of the following is the hardest part of the human body?",
        "তলৰ কোনটো মানৱ শৰীৰৰ আটাইতকৈ কঠিন অংশ?",
        [("Tooth enamel", "দাঁতৰ এনামেল"), ("Bone", "হাড়"), ("Cartilage", "উপাস্থি"), ("Nail", "নখ")], 0,
        "Tooth enamel is the hardest substance in the human body.",
        "দাঁতৰ এনামেল মানৱ শৰীৰৰ আটাইতকৈ কঠিন পদাৰ্থ।"))
    A(R("Which of the following is the largest bird found in Assam?",
        "তলৰ কোনটো অসমত পোৱা আটাইতকৈ ডাঙৰ চৰাই?",
        [("Great hornbill", "ৰাজ ধনেশ"), ("Sparrow", "চৰাই"), ("Crow", "কাউৰী"), ("Myna", "শালিকা")], 0,
        "The great hornbill is the largest bird found in Assam.",
        "ৰাজ ধনেশ অসমত পোৱা আটাইতকৈ ডাঙৰ চৰাই।"))

    return r
