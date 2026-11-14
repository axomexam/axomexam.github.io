"""Section: General English - 25 fresh bilingual questions."""
from .common import R


def rows():
    r = []
    A = r.append

    # ---- Grammar ----
    A(R("Choose the correct article: He is ____ honest man.",
        "শুদ্ধ article বাছনি কৰক: He is ____ honest man.",
        [("an", "an"), ("a", "a"), ("the", "the"), ("no article", "কোনো article নহয়")], 0,
        "'Honest' begins with a vowel sound, so 'an' is used.",
        "'Honest' স্বৰধ্বনিৰে আৰম্ভ হয়, সেয়ে 'an' ব্যৱহাৰ হয়।"))
    A(R("Choose the correct preposition: She is good ____ mathematics.",
        "শুদ্ধ preposition বাছনি কৰক: She is good ____ mathematics.",
        [("at", "at"), ("in", "in"), ("on", "on"), ("for", "for")], 0,
        "'Good at' is the correct collocation for a subject.",
        "বিষয়ৰ বাবে 'good at' শুদ্ধ সংযোগ।"))
    A(R("Fill in the blank: He has been living here ____ 2010.",
        "খালী ঠাই পূৰণ কৰক: He has been living here ____ 2010.",
        [("since", "since"), ("for", "for"), ("from", "from"), ("by", "by")], 0,
        "'Since' is used with a point of time in the present perfect continuous.",
        "present perfect continuous ত সময়ৰ এটা বিন্দুৰ সৈতে 'since' ব্যৱহাৰ হয়।"))
    A(R("Fill in the blank: I have known him ____ ten years.",
        "খালী ঠাই পূৰণ কৰক: I have known him ____ ten years.",
        [("for", "for"), ("since", "since"), ("from", "from"), ("at", "at")], 0,
        "'For' is used with a period of time.",
        "সময়ৰ এটা কালছোৱাৰ সৈতে 'for' ব্যৱহাৰ হয়।"))
    A(R("Choose the correct form: She ____ to school every day.",
        "শুদ্ধ ৰূপ বাছনি কৰক: She ____ to school every day.",
        [("goes", "goes"), ("go", "go"), ("going", "going"), ("gone", "gone")], 0,
        "A third-person singular subject takes 'goes' in the simple present.",
        "তৃতীয় পুৰুষ একবচন কৰ্তাই simple present ত 'goes' লয়।"))
    A(R("Choose the correct passive voice: He writes a letter.",
        "শুদ্ধ কৰ্মবাচ্য বাছনি কৰক: He writes a letter.",
        [("A letter is written by him.", "A letter is written by him."), ("A letter was written by him.", "A letter was written by him."), ("A letter is wrote by him.", "A letter is wrote by him."), ("A letter written by him.", "A letter written by him.")], 0,
        "Simple present active becomes 'is/am/are + past participle' in passive.",
        "Simple present সকৰ্মক কৰ্মবাচ্যত 'is/am/are + past participle' হয়।"))
    A(R("Choose the correct indirect speech: He said, \"I am tired.\"",
        "শুদ্ধ পৰোক্ষ উক্তি বাছনি কৰক: He said, \"I am tired.\"",
        [("He said that he was tired.", "He said that he was tired."), ("He said that I am tired.", "He said that I am tired."), ("He says that he is tired.", "He says that he is tired."), ("He said he is tired.", "He said he is tired.")], 0,
        "In indirect speech the present tense shifts to the past.",
        "পৰোক্ষ উক্তিত বৰ্তমান কাল অতীত কাললৈ সলনি হয়।"))
    A(R("Identify the correct plural: one knife, two ____.",
        "শুদ্ধ বহুবচন চিনাক্ত কৰক: one knife, two ____.",
        [("knives", "knives"), ("knifes", "knifes"), ("knife", "knife"), ("knive", "knive")], 0,
        "Nouns ending in -fe form the plural with -ves.",
        "-fe ৰে শেষ হোৱা বিশেষ্যই -ves ৰে বহুবচন গঠন কৰে।"))
    A(R("Choose the correct degree: He is the ____ boy in the class.",
        "শুদ্ধ degree বাছনি কৰক: He is the ____ boy in the class.",
        [("tallest", "tallest"), ("taller", "taller"), ("tall", "tall"), ("most tall", "most tall")], 0,
        "The superlative degree is used when comparing more than two.",
        "দুটাতকৈ অধিক তুলনা কৰিলে superlative degree ব্যৱহাৰ হয়।"))
    A(R("Fill in the blank: Neither of the boys ____ present.",
        "খালী ঠাই পূৰণ কৰক: Neither of the boys ____ present.",
        [("was", "was"), ("were", "were"), ("are", "are"), ("have", "have")], 0,
        "'Neither of' takes a singular verb.",
        "'Neither of' এ একবচন ক্ৰিয়া লয়।"))

    # ---- Vocabulary ----
    A(R("Choose the synonym of 'brave'.",
        "'brave' ৰ সমাৰ্থক শব্দ বাছনি কৰক।",
        [("Courageous", "সাহসী"), ("Timid", "ভীতু"), ("Weak", "দুৰ্বল"), ("Lazy", "এলেহুৱা")], 0,
        "'Courageous' means brave.",
        "'Courageous' ৰ অৰ্থ সাহসী।"))
    A(R("Choose the antonym of 'ancient'.",
        "'ancient' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Modern", "আধুনিক"), ("Old", "পুৰণি"), ("Historic", "ঐতিহাসিক"), ("Past", "অতীত")], 0,
        "'Modern' is the opposite of 'ancient'.",
        "'Modern' 'ancient' ৰ বিপৰীত।"))
    A(R("Choose the synonym of 'abundant'.",
        "'abundant' ৰ সমাৰ্থক শব্দ বাছনি কৰক।",
        [("Plentiful", "প্ৰচুৰ"), ("Scarce", "দুৰ্লভ"), ("Empty", "খালী"), ("Rare", "বিৰল")], 0,
        "'Plentiful' means abundant.",
        "'Plentiful' ৰ অৰ্থ প্ৰচুৰ।"))
    A(R("Choose the antonym of 'victory'.",
        "'victory' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Defeat", "পৰাজয়"), ("Success", "সফলতা"), ("Win", "জয়"), ("Triumph", "বিজয়")], 0,
        "'Defeat' is the opposite of 'victory'.",
        "'Defeat' 'victory' ৰ বিপৰীত।"))
    A(R("Choose the correctly spelt word.",
        "শুদ্ধ বানানৰ শব্দ বাছনি কৰক।",
        [("Necessary", "Necessary"), ("Neccessary", "Neccessary"), ("Necesary", "Necesary"), ("Necessery", "Necessery")], 0,
        "'Necessary' is the correct spelling.",
        "'Necessary' শুদ্ধ বানান।"))
    A(R("Choose the one-word substitution: A person who loves books.",
        "এক-শব্দ প্ৰতিস্থাপন বাছনি কৰক: A person who loves books.",
        [("Bibliophile", "গ্ৰন্থপ্ৰেমী"), ("Philanthropist", "মানৱপ্ৰেমী"), ("Misogynist", "নাৰীবিদ্বেষী"), ("Patriot", "দেশপ্ৰেমী")], 0,
        "A bibliophile is a lover of books.",
        "Bibliophile হৈছে গ্ৰন্থপ্ৰেমী।"))
    A(R("Choose the one-word substitution: One who cannot read and write.",
        "এক-শব্দ প্ৰতিস্থাপন বাছনি কৰক: One who cannot read and write.",
        [("Illiterate", "নিৰক্ষৰ"), ("Ignorant", "অজ্ঞ"), ("Innocent", "নিৰ্দোষী"), ("Idle", "এলেহুৱা")], 0,
        "An illiterate person cannot read or write.",
        "নিৰক্ষৰ ব্যক্তিয়ে পঢ়িব বা লিখিব নোৱাৰে।"))
    A(R("Choose the correct idiom meaning: 'To let the cat out of the bag'.",
        "শুদ্ধ idiom অৰ্থ বাছনি কৰক: 'To let the cat out of the bag'.",
        [("To reveal a secret", "গোপন কথা ফাঁচ কৰা"), ("To free an animal", "জন্তু মুকলি কৰা"), ("To tell a lie", "মিছা কোৱা"), ("To run away", "পলাই যোৱা")], 0,
        "'To let the cat out of the bag' means to reveal a secret.",
        "'To let the cat out of the bag' ৰ অৰ্থ গোপন কথা ফাঁচ কৰা।"))
    A(R("Choose the correct meaning of the idiom: 'A blessing in disguise'.",
        "idiom ৰ শুদ্ধ অৰ্থ বাছনি কৰক: 'A blessing in disguise'.",
        [("An apparent misfortune that turns out to be good", "প্ৰকৃততে ভাল হৈ পৰা আপাত দুৰ্ভাগ্য"), ("A hidden curse", "লুকুৱা শাও"), ("A useless gift", "অকামী উপহাৰ"), ("A false promise", "মিছা প্ৰতিশ্ৰুতি")], 0,
        "It means something that seems bad but turns out to be beneficial.",
        "ইয়াৰ অৰ্থ হৈছে বেয়া যেন লগা কিন্তু ভাল হৈ পৰা কিবা।"))

    # ---- Sentence correction & usage ----
    A(R("Choose the correct sentence.",
        "শুদ্ধ বাক্য বাছনি কৰক।",
        [("He is senior to me.", "He is senior to me."), ("He is senior than me.", "He is senior than me."), ("He is more senior than me.", "He is more senior than me."), ("He is senior from me.", "He is senior from me.")], 0,
        "Latin comparatives like 'senior' take 'to', not 'than'.",
        "'senior' ৰ দৰে Latin তুলনাত 'than' নহয়, 'to' ব্যৱহাৰ হয়।"))
    A(R("Choose the grammatically correct sentence about 'one of'.",
        "'one of' ৰ বিষয়ে ব্যাকৰণগতভাৱে শুদ্ধ বাক্য বাছনি কৰক।",
        [("One of my friends is a doctor.", "One of my friends is a doctor."), ("One of my friend is a doctor.", "One of my friend is a doctor."), ("One of my friends are a doctor.", "One of my friends are a doctor."), ("One of my friend are a doctor.", "One of my friend are a doctor.")], 0,
        "'One of' is followed by a plural noun and a singular verb.",
        "'One of' ৰ পিছত বহুবচন বিশেষ্য আৰু একবচন ক্ৰিয়া আহে।"))
    A(R("Fill in the blank with the correct word: The team ____ playing well.",
        "শুদ্ধ শব্দৰে খালী ঠাই পূৰণ কৰক: The team ____ playing well.",
        [("is", "is"), ("are", "are"), ("were", "were"), ("have", "have")], 0,
        "'Team' is treated as a single unit and takes a singular verb here.",
        "'Team' ক একক ৰূপে ধৰি ইয়াত একবচন ক্ৰিয়া লয়।"))
    A(R("Choose the correct question tag: She sings well, ____?",
        "শুদ্ধ question tag বাছনি কৰক: She sings well, ____?",
        [("doesn't she", "doesn't she"), ("does she", "does she"), ("isn't she", "isn't she"), ("is she", "is she")], 0,
        "A positive statement takes a negative question tag.",
        "ধনাত্মক বাক্যই ঋণাত্মক question tag লয়।"))
    A(R("Choose the correct preposition: He is angry ____ me.",
        "শুদ্ধ preposition বাছনি কৰক: He is angry ____ me.",
        [("with", "with"), ("on", "on"), ("at", "at"), ("for", "for")], 0,
        "We are 'angry with' a person.",
        "ব্যক্তিৰ সৈতে 'angry with' ব্যৱহাৰ হয়।"))
    A(R("Choose the correct modal: You ____ obey your parents.",
        "শুদ্ধ modal বাছনি কৰক: You ____ obey your parents.",
        [("should", "should"), ("could", "could"), ("would", "would"), ("may", "may")], 0,
        "'Should' expresses duty or moral obligation.",
        "'Should' এ কৰ্তব্য বা নৈতিক বাধ্যবাধকতা সূচায়।"))
    A(R("Choose the correct tense: I ____ my homework before he came.",
        "শুদ্ধ কাল বাছনি কৰক: I ____ my homework before he came.",
        [("had finished", "had finished"), ("have finished", "have finished"), ("finished", "finished"), ("will finish", "will finish")], 0,
        "The past perfect is used for the earlier of two past actions.",
        "দুটা অতীত কাৰ্যৰ আগটোৰ বাবে past perfect ব্যৱহাৰ হয়।"))

    return r
