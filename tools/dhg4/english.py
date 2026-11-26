"""Section: General English (Grade IV extra bank, 80 rows).

Covers grammar (articles, prepositions, tenses, subject-verb agreement,
voice, parts of speech) and vocabulary (synonyms, antonyms, one-word
substitution, spelling, idioms).
"""
from .common import R


def rows():
    r = []
    A = r.append

    A(R("Fill in the blank: She has been living here ___ 2015.",
        "খালী ঠাই পূৰণ কৰক: She has been living here ___ 2015.",
        [("since", "since"), ("for", "for"), ("from", "from"), ("by", "by")], 0,
        "'Since' is used with a point of time in the present perfect continuous.",
        "প্ৰেজেণ্ট পাৰফেক্ট কণ্টিনিউৱাছত নিৰ্দিষ্ট সময়বিন্দুৰ লগত 'since' ব্যৱহাৰ হয়।"))
    A(R("Choose the correct article: He is ___ honest man.",
        "শুদ্ধ article বাছনি কৰক: He is ___ honest man.",
        [("an", "an"), ("a", "a"), ("the", "the"), ("no article", "article নালাগে")], 0,
        "'Honest' begins with a vowel sound, so 'an' is used.",
        "'Honest' স্বৰধ্বনিৰে আৰম্ভ হয়, সেয়ে 'an' ব্যৱহাৰ হয়।"))
    A(R("Fill in the blank: Neither of the boys ___ present.",
        "খালী ঠাই পূৰণ কৰক: Neither of the boys ___ present.",
        [("was", "was"), ("were", "were"), ("are", "are"), ("have", "have")], 0,
        "'Neither of' takes a singular verb.",
        "'Neither of' ৰ লগত একবচন ক্ৰিয়া লগে।"))
    A(R("Choose the correct preposition: She is good ___ mathematics.",
        "শুদ্ধ প্ৰিপজিচন বাছনি কৰক: She is good ___ mathematics.",
        [("at", "at"), ("in", "in"), ("on", "on"), ("for", "for")], 0,
        "'Good at' is the correct collocation for a skill.",
        "দক্ষতাৰ বাবে শুদ্ধ প্ৰয়োগ 'good at'।"))
    A(R("Fill in the blank with the correct form: He ___ to school every day.",
        "শুদ্ধ ৰূপৰে খালী ঠাই পূৰণ কৰক: He ___ to school every day.",
        [("goes", "goes"), ("go", "go"), ("going", "going"), ("gone", "gone")], 0,
        "A third-person singular subject takes 'goes' in the simple present.",
        "তৃতীয় পুৰুষ একবচন কৰ্তাৰ লগত সৰল বৰ্তমানত 'goes' লগে।"))
    A(R("Choose the correct word: I have ___ my homework.",
        "শুদ্ধ শব্দ বাছনি কৰক: I have ___ my homework.",
        [("done", "done"), ("did", "did"), ("do", "do"), ("doing", "doing")], 0,
        "The present perfect uses the past participle 'done'.",
        "প্ৰেজেণ্ট পাৰফেক্টত অতীত কালৰ পূৰ্বকালীন ৰূপ 'done' ব্যৱহাৰ হয়।"))
    A(R("Fill in the blank: The teacher asked the students to ___ quiet.",
        "খালী ঠাই পূৰণ কৰক: The teacher asked the students to ___ quiet.",
        [("keep", "keep"), ("kept", "kept"), ("keeping", "keeping"), ("keeps", "keeps")], 0,
        "'To' is followed by the base form of the verb.",
        "'to' ৰ পিছত ক্ৰিয়াৰ মূল ৰূপ লগে।"))
    A(R("Choose the correct plural: The ___ are playing in the field.",
        "শুদ্ধ বহুবচন বাছনি কৰক: The ___ are playing in the field.",
        [("children", "children"), ("childs", "childs"), ("childrens", "childrens"), ("child", "child")], 0,
        "The plural of 'child' is 'children'.",
        "'child' ৰ বহুবচন 'children'।"))
    A(R("Fill in the blank: She is the ___ girl in the class.",
        "খালী ঠাই পূৰণ কৰক: She is the ___ girl in the class.",
        [("tallest", "tallest"), ("taller", "taller"), ("tall", "tall"), ("most tall", "most tall")], 0,
        "The superlative degree 'tallest' is used with 'the'.",
        "'the' ৰ লগত অতিশয় ঊৰ্ধ্বৱাচক 'tallest' ব্যৱহাৰ হয়।"))
    A(R("Choose the correct option: He is used to ___ early.",
        "শুদ্ধ বিকল্প বাছনি কৰক: He is used to ___ early.",
        [("getting up", "getting up"), ("get up", "get up"), ("got up", "got up"), ("gets up", "gets up")], 0,
        "'Used to' (accustomed) is followed by a gerund.",
        "'used to' (অভ্যস্ত) ৰ পিছত gerund লগে।"))
    A(R("Fill in the blank: If it ___ tomorrow, we will cancel the trip.",
        "খালী ঠাই পূৰণ কৰক: If it ___ tomorrow, we will cancel the trip.",
        [("rains", "rains"), ("will rain", "will rain"), ("rained", "rained"), ("is raining", "is raining")], 0,
        "In a first conditional, the if-clause takes the simple present.",
        "প্ৰথম চৰ্তসূচক বাক্যত if-খণ্ডত সৰল বৰ্তমান লগে।"))
    A(R("Choose the correct passive form: They built the bridge in 1990.",
        "শুদ্ধ কৰ্মবাচ্য ৰূপ বাছনি কৰক: They built the bridge in 1990.",
        [("The bridge was built in 1990", "The bridge was built in 1990"), ("The bridge is built in 1990", "The bridge is built in 1990"), ("The bridge has built in 1990", "The bridge has built in 1990"), ("The bridge were built in 1990", "The bridge were built in 1990")], 0,
        "The simple past passive is 'was/were + past participle'.",
        "সৰল অতীত কৰ্মবাচ্য 'was/were + past participle'।"))
    A(R("Fill in the blank: The book is ___ the table.",
        "খালী ঠাই পূৰণ কৰক: The book is ___ the table.",
        [("on", "on"), ("in", "in"), ("at", "at"), ("of", "of")], 0,
        "'On' is used for a surface.",
        "পৃষ্ঠৰ বাবে 'on' ব্যৱহাৰ হয়।"))
    A(R("Choose the correct word: He is ___ than his brother.",
        "শুদ্ধ শব্দ বাছনি কৰক: He is ___ than his brother.",
        [("taller", "taller"), ("tallest", "tallest"), ("tall", "tall"), ("more tall", "more tall")], 0,
        "The comparative degree is used with 'than'.",
        "'than' ৰ লগত তুলনামূলক ঊৰ্ধ্বৱাচক ৰূপ লগে।"))
    A(R("Fill in the blank: I ___ him yesterday.",
        "খালী ঠাই পূৰণ কৰক: I ___ him yesterday.",
        [("met", "met"), ("meet", "meet"), ("have met", "have met"), ("meeting", "meeting")], 0,
        "'Yesterday' requires the simple past.",
        "'yesterday' ৰ লগত সৰল অতীত লগে।"))
    A(R("Choose the correct pronoun: This book is ___.",
        "শুদ্ধ সৰ্বনাম বাছনি কৰক: This book is ___.",
        [("mine", "mine"), ("my", "my"), ("me", "me"), ("I", "I")], 0,
        "'Mine' is a possessive pronoun.",
        "'mine' এটা অধিকাৰসূচক সৰ্বনাম।"))
    A(R("Fill in the blank: She speaks English ___.",
        "খালী ঠাই পূৰণ কৰক: She speaks English ___.",
        [("fluently", "fluently"), ("fluent", "fluent"), ("fluency", "fluency"), ("fluentness", "fluentness")], 0,
        "An adverb modifies the verb 'speaks'.",
        "ক্ৰিয়া 'speaks' ক adverb-এ বিৱৰণ কৰে।"))
    A(R("Choose the correct option: The number of students ___ increasing.",
        "শুদ্ধ বিকল্প বাছনি কৰক: The number of students ___ increasing.",
        [("is", "is"), ("are", "are"), ("were", "were"), ("have", "have")], 0,
        "'The number of' takes a singular verb.",
        "'The number of' ৰ লগত একবচন ক্ৰিয়া লগে।"))
    A(R("Fill in the blank: Hardly had he arrived ___ the meeting began.",
        "খালী ঠাই পূৰণ কৰক: Hardly had he arrived ___ the meeting began.",
        [("when", "when"), ("than", "than"), ("then", "then"), ("that", "that")], 0,
        "'Hardly ... when' is the correct pair.",
        "'Hardly ... when' শুদ্ধ যোৰ।"))
    A(R("Choose the correct word: He is ___ M.A. in English.",
        "শুদ্ধ শব্দ বাছনি কৰক: He is ___ M.A. in English.",
        [("an", "an"), ("a", "a"), ("the", "the"), ("no article", "article নালাগে")], 0,
        "'M' is pronounced with a vowel sound, so 'an' is used.",
        "'M' স্বৰধ্বনিৰে উচ্চাৰিত হয়, সেয়ে 'an' ব্যৱহাৰ হয়।"))
    A(R("Fill in the blank: The letter ___ by him yesterday.",
        "খালী ঠাই পূৰণ কৰক: The letter ___ by him yesterday.",
        [("was written", "was written"), ("was wrote", "was wrote"), ("is written", "is written"), ("were written", "were written")], 0,
        "The simple past passive is 'was + past participle'.",
        "সৰল অতীত কৰ্মবাচ্য 'was + past participle'।"))
    A(R("Choose the synonym of 'begin'.",
        "'begin' ৰ সমাৰ্থক শব্দ বাছনি কৰক।",
        [("Commence", "Commence"), ("Cease", "Cease"), ("Stop", "Stop"), ("End", "End")], 0,
        "'Commence' means to begin.",
        "'Commence' ৰ অৰ্থ আৰম্ভ কৰা।"))
    A(R("Choose the synonym of 'brave'.",
        "'brave' ৰ সমাৰ্থক শব্দ বাছনি কৰক।",
        [("Courageous", "Courageous"), ("Timid", "Timid"), ("Weak", "Weak"), ("Afraid", "Afraid")], 0,
        "'Courageous' means brave.",
        "'Courageous' ৰ অৰ্থ সাহসী।"))
    A(R("Choose the synonym of 'quiet'.",
        "'quiet' ৰ সমাৰ্থক শব্দ বাছনি কৰক।",
        [("Silent", "Silent"), ("Loud", "Loud"), ("Noisy", "Noisy"), ("Busy", "Busy")], 0,
        "'Silent' means quiet.",
        "'Silent' ৰ অৰ্থ নীৰৱ।"))
    A(R("Choose the synonym of 'rapid'.",
        "'rapid' ৰ সমাৰ্থক শব্দ বাছনি কৰক।",
        [("Swift", "Swift"), ("Slow", "Slow"), ("Late", "Late"), ("Sluggish", "Sluggish")], 0,
        "'Swift' means rapid.",
        "'Swift' ৰ অৰ্থ দ্ৰুত।"))
    A(R("Choose the synonym of 'vacant'.",
        "'vacant' ৰ সমাৰ্থক শব্দ বাছনি কৰক।",
        [("Empty", "Empty"), ("Full", "Full"), ("Occupied", "Occupied"), ("Crowded", "Crowded")], 0,
        "'Empty' means vacant.",
        "'Empty' ৰ অৰ্থ খালী।"))
    A(R("Choose the synonym of 'assist'.",
        "'assist' ৰ সমাৰ্থক শব্দ বাছনি কৰক।",
        [("Help", "Help"), ("Hinder", "Hinder"), ("Oppose", "Oppose"), ("Stop", "Stop")], 0,
        "'Assist' means to help.",
        "'Assist' ৰ অৰ্থ সহায় কৰা।"))
    A(R("Choose the antonym of 'ancient'.",
        "'ancient' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Modern", "Modern"), ("Old", "Old"), ("Past", "Past"), ("Antique", "Antique")], 0,
        "'Ancient' means very old; its antonym is 'modern'.",
        "'ancient' ৰ অৰ্থ অতি পুৰণি; ইয়াৰ বিপৰীত 'modern'।"))
    A(R("Choose the antonym of 'victory'.",
        "'victory' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Defeat", "Defeat"), ("Win", "Win"), ("Success", "Success"), ("Triumph", "Triumph")], 0,
        "The opposite of 'victory' is 'defeat'.",
        "'victory' ৰ বিপৰীত 'defeat'।"))
    A(R("Choose the antonym of 'poverty'.",
        "'poverty' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Wealth", "Wealth"), ("Hunger", "Hunger"), ("Need", "Need"), ("Lack", "Lack")], 0,
        "The opposite of 'poverty' is 'wealth'.",
        "'poverty' ৰ বিপৰীত 'wealth'।"))
    A(R("Choose the antonym of 'permanent'.",
        "'permanent' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Temporary", "Temporary"), ("Lasting", "Lasting"), ("Stable", "Stable"), ("Fixed", "Fixed")], 0,
        "The opposite of 'permanent' is 'temporary'.",
        "'permanent' ৰ বিপৰীত 'temporary'।"))
    A(R("Choose the antonym of 'accept'.",
        "'accept' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Reject", "Reject"), ("Receive", "Receive"), ("Take", "Take"), ("Agree", "Agree")], 0,
        "The opposite of 'accept' is 'reject'.",
        "'accept' ৰ বিপৰীত 'reject'।"))
    A(R("Choose the antonym of 'expand'.",
        "'expand' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Contract", "Contract"), ("Grow", "Grow"), ("Widen", "Widen"), ("Enlarge", "Enlarge")], 0,
        "The opposite of 'expand' is 'contract'.",
        "'expand' ৰ বিপৰীত 'contract'।"))
    A(R("One word for 'a person who studies the stars' is:",
        "'তৰা অধ্যয়ন কৰা ব্যক্তি'ৰ বাবে এক শব্দ কি?",
        [("Astronomer", "Astronomer"), ("Astrologer", "Astrologer"), ("Geologist", "Geologist"), ("Botanist", "Botanist")], 0,
        "An astronomer studies stars and celestial bodies.",
        "Astronomer-এ তৰা আৰু মহাকাশীয় বস্তু অধ্যয়ন কৰে।"))
    A(R("One word for 'a place where books are kept' is:",
        "'কিতাপ ৰখা ঠাই'ৰ বাবে এক শব্দ কি?",
        [("Library", "Library"), ("Bookshop", "Bookshop"), ("Museum", "Museum"), ("Archive", "Archive")], 0,
        "A library is a place where books are kept.",
        "Library হৈছে কিতাপ ৰখা ঠাই।"))
    A(R("One word for 'a person who cannot read or write' is:",
        "'পঢ়িব আৰু লিখিব নোৱাৰা ব্যক্তি'ৰ বাবে এক শব্দ কি?",
        [("Illiterate", "Illiterate"), ("Ignorant", "Ignorant"), ("Dumb", "Dumb"), ("Blind", "Blind")], 0,
        "An illiterate person cannot read or write.",
        "Illiterate ব্যক্তিয়ে পঢ়িব-লিখিব নোৱাৰে।"))
    A(R("One word for 'a speech made without preparation' is:",
        "'প্ৰস্তুতি নোহোৱাকৈ দিয়া ভাষণ'ৰ বাবে এক শব্দ কি?",
        [("Extempore", "Extempore"), ("Debate", "Debate"), ("Lecture", "Lecture"), ("Recital", "Recital")], 0,
        "An extempore speech is made without preparation.",
        "Extempore ভাষণ প্ৰস্তুতি নোহোৱাকৈ দিয়া হয়।"))
    A(R("One word for 'fear of water' is:",
        "'পানীৰ ভয়'ৰ বাবে এক শব্দ কি?",
        [("Hydrophobia", "Hydrophobia"), ("Claustrophobia", "Claustrophobia"), ("Acrophobia", "Acrophobia"), ("Xenophobia", "Xenophobia")], 0,
        "Hydrophobia is the fear of water.",
        "Hydrophobia হৈছে পানীৰ ভয়।"))
    A(R("One word for 'a government by the people' is:",
        "'জনতাৰ দ্বাৰা চৰকাৰ'ৰ বাবে এক শব্দ কি?",
        [("Democracy", "Democracy"), ("Monarchy", "Monarchy"), ("Autocracy", "Autocracy"), ("Oligarchy", "Oligarchy")], 0,
        "Democracy is government by the people.",
        "Democracy হৈছে জনতাৰ চৰকাৰ।"))
    A(R("Select the word that is spelt correctly.",
        "শুদ্ধভাৱে বানান কৰা শব্দটো বাছনি কৰক।",
        [("Receive", "Receive"), ("Recieve", "Recieve"), ("Receeve", "Receeve"), ("Receve", "Receve")], 0,
        "The correct spelling is 'receive'.",
        "শুদ্ধ বানান 'receive'।"))
    A(R("Which of these words has the correct spelling?",
        "এইবোৰৰ কোনটো শব্দৰ বানান শুদ্ধ?",
        [("Necessary", "Necessary"), ("Neccessary", "Neccessary"), ("Necesary", "Necesary"), ("Necessery", "Necessery")], 0,
        "The correct spelling is 'necessary'.",
        "শুদ্ধ বানান 'necessary'।"))
    A(R("Identify the correctly spelt word.",
        "শুদ্ধ বানানৰ শব্দটো চিনাক্ত কৰক।",
        [("Definitely", "Definitely"), ("Definately", "Definately"), ("Definitly", "Definitly"), ("Defenitely", "Defenitely")], 0,
        "The correct spelling is 'definitely'.",
        "শুদ্ধ বানান 'definitely'।"))
    A(R("Pick the word with the correct spelling.",
        "শুদ্ধ বানানৰ শব্দটো বাছনি কৰক।",
        [("Occurrence", "Occurrence"), ("Occurence", "Occurence"), ("Ocurrence", "Ocurrence"), ("Occurrance", "Occurrance")], 0,
        "The correct spelling is 'occurrence'.",
        "শুদ্ধ বানান 'occurrence'।"))
    A(R("The idiom 'a piece of cake' means:",
        "ইডিয়ম 'a piece of cake' ৰ অৰ্থ কি?",
        [("Something very easy", "অতি সহজ কাম"), ("A birthday gift", "জন্মদিনৰ উপহাৰ"), ("A sweet dish", "মিঠা খাদ্য"), ("A difficult task", "কঠিন কাম")], 0,
        "'A piece of cake' means something very easy.",
        "'a piece of cake' ৰ অৰ্থ অতি সহজ কাম।"))
    A(R("The idiom 'once in a blue moon' means:",
        "ইডিয়ম 'once in a blue moon' ৰ অৰ্থ কি?",
        [("Very rarely", "অতি বিৰলভাৱে"), ("Very often", "অতি সঘনাই"), ("Every night", "প্ৰতি ৰাতি"), ("Never", "কেতিয়াও নহয়")], 0,
        "'Once in a blue moon' means very rarely.",
        "'once in a blue moon' ৰ অৰ্থ অতি বিৰলভাৱে।"))
    A(R("The idiom 'to break the ice' means:",
        "ইডিয়ম 'to break the ice' ৰ অৰ্থ কি?",
        [("To start a conversation", "কথোপকথন আৰম্ভ কৰা"), ("To destroy something", "কিবা ধ্বংস কৰা"), ("To feel cold", "শীত অনুভৱ কৰা"), ("To win a race", "দৌৰত জিকা")], 0,
        "'To break the ice' means to start a conversation in a social setting.",
        "'to break the ice' ৰ অৰ্থ সামাজিক পৰিৱেশত কথোপকথন আৰম্ভ কৰা।"))
    A(R("The idiom 'a blessing in disguise' means:",
        "ইডিয়ম 'a blessing in disguise' ৰ অৰ্থ কি?",
        [("A hidden benefit", "লুকাই থকা লাভ"), ("A big loss", "ডাঙৰ ক্ষতি"), ("A false hope", "মিছা আশা"), ("A sudden danger", "আকস্মিক বিপদ")], 0,
        "'A blessing in disguise' means an apparent misfortune that turns out well.",
        "'a blessing in disguise' ৰ অৰ্থ আপাততঃ বিপদ যি শেষত ভাল হয়।"))
    A(R("Which of the following sentences is grammatically correct?",
        "তলৰ কোনটো বাক্য ব্যাকৰণগতভাৱে শুদ্ধ?",
        [("He does not know the answer.", "He does not know the answer."), ("He do not know the answer.", "He do not know the answer."), ("He does not knows the answer.", "He does not knows the answer."), ("He not know the answer.", "He not know the answer.")], 0,
        "After 'does not', the base form of the verb is used.",
        "'does not' ৰ পিছত ক্ৰিয়াৰ মূল ৰূপ লগে।"))
    A(R("Fill in the blank: The boy ___ is wearing a red shirt is my cousin.",
        "খালী ঠাই পূৰণ কৰক: The boy ___ is wearing a red shirt is my cousin.",
        [("who", "who"), ("which", "which"), ("whom", "whom"), ("whose", "whose")], 0,
        "'Who' is used as a relative pronoun for a person as subject.",
        "কৰ্তা হিচাপে ব্যক্তিৰ বাবে 'who' সম্বন্ধসূচক সৰ্বনাম হিচাপে লগে।"))
    A(R("Fill in the blank: He is the man ___ car was stolen.",
        "খালী ঠাই পূৰণ কৰক: He is the man ___ car was stolen.",
        [("whose", "whose"), ("who", "who"), ("whom", "whom"), ("which", "which")], 0,
        "'Whose' shows possession.",
        "'whose' অধিকাৰ দেখুৱায়।"))
    A(R("Choose the correct degree: This is the ___ book I have ever read.",
        "শুদ্ধ ডিগ্ৰী বাছনি কৰক: This is the ___ book I have ever read.",
        [("best", "best"), ("better", "better"), ("good", "good"), ("well", "well")], 0,
        "The superlative 'best' is used with 'the'.",
        "'the' ৰ লগত অতিশয় 'best' ব্যৱহাৰ হয়।"))
    A(R("Fill in the blank: She ___ her homework before the bell rang.",
        "খালী ঠাই পূৰণ কৰক: She ___ her homework before the bell rang.",
        [("had finished", "had finished"), ("finished", "finished"), ("has finished", "has finished"), ("finish", "finish")], 0,
        "The past perfect is used for the earlier of two past actions.",
        "দুটা অতীত কামৰ আগতীয়াটোৰ বাবে past perfect ব্যৱহাৰ হয়।"))
    A(R("Choose the correct option: I look forward to ___ you.",
        "শুদ্ধ বিকল্প বাছনি কৰক: I look forward to ___ you.",
        [("meeting", "meeting"), ("meet", "meet"), ("met", "met"), ("meets", "meets")], 0,
        "'Look forward to' is followed by a gerund.",
        "'look forward to' ৰ পিছত gerund লগে।"))
    A(R("Fill in the blank: There is ___ milk in the jug.",
        "খালী ঠাই পূৰণ কৰক: There is ___ milk in the jug.",
        [("a little", "a little"), ("a few", "a few"), ("many", "many"), ("few", "few")], 0,
        "'A little' is used with uncountable nouns.",
        "অগণনীয় বিশেষ্যৰ লগত 'a little' ব্যৱহাৰ হয়।"))
    A(R("Fill in the blank: There are ___ books on the shelf.",
        "খালী ঠাই পূৰণ কৰক: There are ___ books on the shelf.",
        [("a few", "a few"), ("a little", "a little"), ("much", "much"), ("little", "little")], 0,
        "'A few' is used with countable nouns.",
        "গণনীয় বিশেষ্যৰ লগত 'a few' ব্যৱহাৰ হয়।"))
    A(R("Choose the correct word: He ran ___ to catch the bus.",
        "শুদ্ধ শব্দ বাছনি কৰক: He ran ___ to catch the bus.",
        [("fast", "fast"), ("fastly", "fastly"), ("fasterly", "fasterly"), ("fastness", "fastness")], 0,
        "'Fast' is both adjective and adverb; 'fastly' is not standard.",
        "'fast' adjective আৰু adverb দুয়ো; 'fastly' শুদ্ধ নহয়।"))
    A(R("Fill in the blank: The cat hid ___ the bed.",
        "খালী ঠাই পূৰণ কৰক: The cat hid ___ the bed.",
        [("under", "under"), ("on", "on"), ("over", "over"), ("above", "above")], 0,
        "'Under' shows position below something.",
        "'under' কাৰোবাৰ তলত থকা অৱস্থান দেখুৱায়।"))
    A(R("Select the grammatically correct sentence.",
        "ব্যাকৰণগতভাৱে শুদ্ধ বাক্যটো বাছনি কৰক।",
        [("One of my friends is a doctor.", "One of my friends is a doctor."), ("One of my friends are a doctor.", "One of my friends are a doctor."), ("One of my friend is a doctor.", "One of my friend is a doctor."), ("One of my friends were a doctor.", "One of my friends were a doctor.")], 0,
        "'One of' takes a plural noun and a singular verb.",
        "'one of' ৰ পিছত বহুবচন বিশেষ্য আৰু একবচন ক্ৰিয়া লগে।"))
    A(R("Fill in the blank: He has been working here ___ two years.",
        "খালী ঠাই পূৰণ কৰক: He has been working here ___ two years.",
        [("for", "for"), ("since", "since"), ("from", "from"), ("by", "by")], 0,
        "'For' is used with a period of time.",
        "সময়ছোৱাৰ বাবে 'for' ব্যৱহাৰ হয়।"))
    A(R("Choose the correct option: Neither he nor I ___ going.",
        "শুদ্ধ বিকল্প বাছনি কৰক: Neither he nor I ___ going.",
        [("am", "am"), ("is", "is"), ("are", "are"), ("were", "were")], 0,
        "With 'neither ... nor', the verb agrees with the nearer subject.",
        "'neither ... nor' ৰ লগত ক্ৰিয়া ওচৰৰ কৰ্তাৰ লগত মিলে।"))
    A(R("Fill in the blank: The news ___ shocking.",
        "খালী ঠাই পূৰণ কৰক: The news ___ shocking.",
        [("is", "is"), ("are", "are"), ("were", "were"), ("have", "have")], 0,
        "'News' is an uncountable singular noun.",
        "'news' অগণনীয় একবচন বিশেষ্য।"))
    A(R("Choose the word that is a noun.",
        "বিশেষ্য হোৱা শব্দটো বাছনি কৰক।",
        [("Beauty", "Beauty"), ("Beautiful", "Beautiful"), ("Beautifully", "Beautifully"), ("Beautify", "Beautify")], 0,
        "'Beauty' is a noun; the others are adjective, adverb and verb.",
        "'Beauty' বিশেষ্য; বাকীবোৰ adjective, adverb আৰু verb।"))
    A(R("Choose the word that is an adjective.",
        "বিশেষণ হোৱা শব্দটো বাছনি কৰক।",
        [("Careful", "Careful"), ("Care", "Care"), ("Carefully", "Carefully"), ("Caring", "Caring")], 0,
        "'Careful' is an adjective.",
        "'Careful' এটা বিশেষণ।"))
    A(R("Choose the word that is a verb.",
        "ক্ৰিয়া হোৱা শব্দটো বাছনি কৰক।",
        [("Decide", "Decide"), ("Decision", "Decision"), ("Decisive", "Decisive"), ("Decisively", "Decisively")], 0,
        "'Decide' is a verb.",
        "'Decide' এটা ক্ৰিয়া।"))
    A(R("Fill in the blank: The sun rises ___ the east.",
        "খালী ঠাই পূৰণ কৰক: The sun rises ___ the east.",
        [("in", "in"), ("on", "on"), ("at", "at"), ("to", "to")], 0,
        "'In' is used with directions and regions.",
        "দিশ আৰু অঞ্চলৰ লগত 'in' ব্যৱহাৰ হয়।"))
    A(R("Choose the correct question tag: She is coming, ___?",
        "শুদ্ধ প্ৰশ্ন-টেগ বাছনি কৰক: She is coming, ___?",
        [("isn't she", "isn't she"), ("is she", "is she"), ("doesn't she", "doesn't she"), ("won't she", "won't she")], 0,
        "A positive statement takes a negative tag with the same auxiliary.",
        "ধনাত্মক বাক্যত একে auxiliary ৰ ঋণাত্মক টেগ লগে।"))
    A(R("Fill in the blank: I would rather ___ at home.",
        "খালী ঠাই পূৰণ কৰক: I would rather ___ at home.",
        [("stay", "stay"), ("to stay", "to stay"), ("staying", "staying"), ("stayed", "stayed")], 0,
        "'Would rather' is followed by the base form.",
        "'would rather' ৰ পিছত ক্ৰিয়াৰ মূল ৰূপ লগে।"))
    A(R("Choose the correct word: The teacher made him ___ the poem.",
        "শুদ্ধ শব্দ বাছনি কৰক: The teacher made him ___ the poem.",
        [("recite", "recite"), ("to recite", "to recite"), ("reciting", "reciting"), ("recited", "recited")], 0,
        "After 'make' (causative), the bare infinitive is used.",
        "causative 'make' ৰ পিছত bare infinitive লগে।"))
    A(R("Fill in the blank: She is capable ___ doing the work.",
        "খালী ঠাই পূৰণ কৰক: She is capable ___ doing the work.",
        [("of", "of"), ("for", "for"), ("to", "to"), ("in", "in")], 0,
        "'Capable' is followed by 'of'.",
        "'capable' ৰ পিছত 'of' লগে।"))
    A(R("Choose the synonym of 'honest'.",
        "'honest' ৰ সমাৰ্থক শব্দ বাছনি কৰক।",
        [("Truthful", "Truthful"), ("Deceitful", "Deceitful"), ("Clever", "Clever"), ("Rude", "Rude")], 0,
        "'Truthful' means honest.",
        "'Truthful' ৰ অৰ্থ সৎ।"))
    A(R("Choose the antonym of 'generous'.",
        "'generous' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Miserly", "Miserly"), ("Kind", "Kind"), ("Liberal", "Liberal"), ("Noble", "Noble")], 0,
        "The opposite of 'generous' is 'miserly'.",
        "'generous' ৰ বিপৰীত 'miserly'।"))
    A(R("Choose the antonym of 'humble'.",
        "'humble' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Arrogant", "Arrogant"), ("Modest", "Modest"), ("Meek", "Meek"), ("Simple", "Simple")], 0,
        "The opposite of 'humble' is 'arrogant'.",
        "'humble' ৰ বিপৰীত 'arrogant'।"))
    A(R("Choose the correct word: He apologized ___ being late.",
        "শুদ্ধ শব্দ বাছনি কৰক: He apologized ___ being late.",
        [("for", "for"), ("of", "of"), ("to", "to"), ("at", "at")], 0,
        "'Apologize for' is the correct collocation.",
        "শুদ্ধ প্ৰয়োগ 'apologize for'।"))
    A(R("Fill in the blank: The train ___ at 6 p.m. daily.",
        "খালী ঠাই পূৰণ কৰক: The train ___ at 6 p.m. daily.",
        [("departs", "departs"), ("depart", "depart"), ("departing", "departing"), ("departed", "departed")], 0,
        "A habitual action takes the simple present.",
        "অভ্যাসগত কামৰ বাবে সৰল বৰ্তমান লগে।"))
    A(R("Choose the correct option: If I ___ rich, I would travel the world.",
        "শুদ্ধ বিকল্প বাছনি কৰক: If I ___ rich, I would travel the world.",
        [("were", "were"), ("was", "was"), ("am", "am"), ("will be", "will be")], 0,
        "The second conditional uses 'were' for all subjects.",
        "দ্বিতীয় চৰ্তসূচক বাক্যত সকলো কৰ্তাৰ বাবে 'were' ব্যৱহাৰ হয়।"))
    A(R("Fill in the blank: He is senior ___ me.",
        "খালী ঠাই পূৰণ কৰক: He is senior ___ me.",
        [("to", "to"), ("than", "than"), ("from", "from"), ("of", "of")], 0,
        "'Senior', 'junior', 'superior' take 'to', not 'than'.",
        "'senior', 'junior', 'superior' ৰ লগত 'than' নহয় 'to' লগে।"))
    A(R("Choose the correct word: She is married ___ a doctor.",
        "শুদ্ধ শব্দ বাছনি কৰক: She is married ___ a doctor.",
        [("to", "to"), ("with", "with"), ("by", "by"), ("from", "from")], 0,
        "'Married to' is the correct collocation.",
        "শুদ্ধ প্ৰয়োগ 'married to'।"))
    A(R("Fill in the blank: I have known him ___ ten years.",
        "খালী ঠাই পূৰণ কৰক: I have known him ___ ten years.",
        [("for", "for"), ("since", "since"), ("from", "from"), ("by", "by")], 0,
        "'For' is used with a duration.",
        "সময়ছোৱাৰ বাবে 'for' ব্যৱহাৰ হয়।"))
    A(R("Choose the antonym of 'enlarge'.",
        "'enlarge' ৰ বিপৰীত শব্দ বাছনি কৰক।",
        [("Shrink", "Shrink"), ("Grow", "Grow"), ("Spread", "Spread"), ("Widen", "Widen")], 0,
        "The opposite of 'enlarge' is 'shrink'.",
        "'enlarge' ৰ বিপৰীত 'shrink'।"))
    A(R("One word for 'the life history of a person written by himself' is:",
        "'নিজে লিখা এজন ব্যক্তিৰ জীৱন-কাহিনী'ৰ বাবে এক শব্দ কি?",
        [("Autobiography", "Autobiography"), ("Biography", "Biography"), ("Bibliography", "Bibliography"), ("Monograph", "Monograph")], 0,
        "An autobiography is a life history written by oneself.",
        "Autobiography হৈছে নিজে লিখা জীৱন-কাহিনী।"))
    A(R("One word for 'a person who loves mankind' is:",
        "'মানৱজাতিক ভালপোৱা ব্যক্তি'ৰ বাবে এক শব্দ কি?",
        [("Philanthropist", "Philanthropist"), ("Misanthrope", "Misanthrope"), ("Patriot", "Patriot"), ("Philosopher", "Philosopher")], 0,
        "A philanthropist loves and helps mankind.",
        "Philanthropist-এ মানৱজাতিক ভালপাই সহায় কৰে।"))
    A(R("One word for 'that which cannot be avoided' is:",
        "'যি এৰাব নোৱাৰি'ৰ বাবে এক শব্দ কি?",
        [("Inevitable", "Inevitable"), ("Invisible", "Invisible"), ("Incredible", "Incredible"), ("Invincible", "Invincible")], 0,
        "Inevitable means that which cannot be avoided.",
        "Inevitable ৰ অৰ্থ যি এৰাব নোৱাৰি।"))
    A(R("Choose the sentence that is grammatically correct.",
        "ব্যাকৰণগতভাৱে শুদ্ধ বাক্যটো বাছনি কৰক।",
        [("She has been waiting since morning.", "She has been waiting since morning."), ("She is waiting since morning.", "She is waiting since morning."), ("She has waited since morning.", "She has waited since morning."), ("She waits since morning.", "She waits since morning.")], 0,
        "The present perfect continuous with 'since' describes an action still continuing.",
        "'since' ৰ লগত present perfect continuous এ চলি থকা কাম সূচায়।"))
    return r
