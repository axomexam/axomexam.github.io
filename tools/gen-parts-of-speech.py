#!/usr/bin/env python3
"""Append 400+ bilingual parts-of-speech questions to the DHS grammar bank."""

import json
import re

BANK = "tools/legacy-banks/dhs-dme-technical/general-english/grammar/question-001.json"

POS = {
    "noun": ("Noun", "বিশেষ্য"),
    "pronoun": ("Pronoun", "সৰ্বনাম"),
    "verb": ("Verb", "ক্ৰিয়া"),
    "adjective": ("Adjective", "বিশেষণ"),
    "adverb": ("Adverb", "ক্ৰিয়া বিশেষণ"),
    "preposition": ("Preposition", "পদান্বয়ী অব্যয়"),
    "conjunction": ("Conjunction", "সংযোজক অব্যয়"),
    "interjection": ("Interjection", "বিস্ময়সূচক অব্যয়"),
}

FAMILY = {
    "noun": [
        ("proper_noun", "Proper noun", "নামবাচক বিশেষ্য"),
        ("common_noun", "Common noun", "জাতিবাচক বিশেষ্য"),
        ("collective_noun", "Collective noun", "সমষ্টিবাচক বিশেষ্য"),
        ("abstract_noun", "Abstract noun", "গুণবাচক বিশেষ্য"),
        ("material_noun", "Material noun", "পদাৰ্থবাচক বিশেষ্য"),
    ],
    "pronoun": [
        ("personal_pronoun", "Personal pronoun", "ব্যক্তিবাচক সৰ্বনাম"),
        ("possessive_pronoun", "Possessive pronoun", "অধিকাৰবাচক সৰ্বনাম"),
        ("reflexive_pronoun", "Reflexive pronoun", "আত্মবাচক সৰ্বনাম"),
        ("relative_pronoun", "Relative pronoun", "সম্পৰ্কবাচক সৰ্বনাম"),
        ("interrogative_pronoun", "Interrogative pronoun", "প্ৰশ্নবাচক সৰ্বনাম"),
        ("demonstrative_pronoun", "Demonstrative pronoun", "নিৰ্দেশক সৰ্বনাম"),
        ("indefinite_pronoun", "Indefinite pronoun", "অনিৰ্দিষ্ট সৰ্বনাম"),
        ("reciprocal_pronoun", "Reciprocal pronoun", "পৰস্পৰবাচক সৰ্বনাম"),
    ],
    "verb": [
        ("transitive_verb", "Transitive verb", "সকৰ্মক ক্ৰিয়া"),
        ("intransitive_verb", "Intransitive verb", "অকৰ্মক ক্ৰিয়া"),
        ("linking_verb", "Linking verb", "সংযোগী ক্ৰিয়া"),
        ("auxiliary_verb", "Auxiliary verb", "সহায়ক ক্ৰিয়া"),
        ("modal_verb", "Modal verb", "মডেল ক্ৰিয়া"),
    ],
    "adjective": [
        ("qualitative_adjective", "Qualitative adjective", "গুণবাচক বিশেষণ"),
        ("quantitative_adjective", "Quantitative adjective", "পৰিমাণবাচক বিশেষণ"),
        ("numeral_adjective", "Numeral adjective", "সংখ্যাবাচক বিশেষণ"),
        ("demonstrative_adjective", "Demonstrative adjective", "নিৰ্দেশক বিশেষণ"),
        ("possessive_adjective", "Possessive adjective", "অধিকাৰবাচক বিশেষণ"),
        ("interrogative_adjective", "Interrogative adjective", "প্ৰশ্নবাচক বিশেষণ"),
        ("distributive_adjective", "Distributive adjective", "বিতৰণবাচক বিশেষণ"),
        ("proper_adjective", "Proper adjective", "নামবাচক বিশেষণ"),
    ],
    "adverb": [
        ("manner_adverb", "Adverb of manner", "প্ৰকাৰবাচক ক্ৰিয়া বিশেষণ"),
        ("place_adverb", "Adverb of place", "স্থানবাচক ক্ৰিয়া বিশেষণ"),
        ("time_adverb", "Adverb of time", "সময়বাচক ক্ৰিয়া বিশেষণ"),
        ("frequency_adverb", "Adverb of frequency", "বাৰংবাৰ্যবাচক ক্ৰিয়া বিশেষণ"),
        ("degree_adverb", "Adverb of degree", "মাত্ৰাবাচক ক্ৰিয়া বিশেষণ"),
        ("reason_adverb", "Adverb of reason", "কাৰণবাচক ক্ৰিয়া বিশেষণ"),
    ],
}

REASON_EN = {
    "proper_noun": "it is the name of a particular person, place or thing",
    "common_noun": "it names a class of person, place or thing",
    "collective_noun": "it names a group of people, animals or things",
    "abstract_noun": "it names a quality, feeling or idea that cannot be seen or touched",
    "material_noun": "it names the material from which something is made",
    "personal_pronoun": "it stands in place of a person or thing",
    "possessive_pronoun": "it shows ownership without a following noun",
    "reflexive_pronoun": "it refers back to the subject of the sentence",
    "relative_pronoun": "it joins a clause and relates it to a noun",
    "interrogative_pronoun": "it is used to ask a question",
    "demonstrative_pronoun": "it points to a particular person or thing",
    "indefinite_pronoun": "it refers to a person or thing without naming it",
    "reciprocal_pronoun": "it shows a mutual action between two or more people",
    "transitive_verb": "it takes an object to complete its meaning",
    "intransitive_verb": "it does not take an object",
    "linking_verb": "it links the subject with a word that describes it",
    "auxiliary_verb": "it helps the main verb to form a tense or voice",
    "modal_verb": "it expresses ability, permission, possibility or obligation",
    "qualitative_adjective": "it describes the quality of a noun",
    "quantitative_adjective": "it shows how much of something there is",
    "numeral_adjective": "it shows number or position",
    "demonstrative_adjective": "it points to a particular noun",
    "possessive_adjective": "it shows who owns the noun",
    "interrogative_adjective": "it asks a question about a noun",
    "distributive_adjective": "it refers to members of a group one by one",
    "proper_adjective": "it is formed from a proper noun",
    "manner_adverb": "it tells us how an action is done",
    "place_adverb": "it tells us where an action happens",
    "time_adverb": "it tells us when an action happens",
    "frequency_adverb": "it tells us how often an action happens",
    "degree_adverb": "it tells us the intensity of an action or quality",
    "reason_adverb": "it shows the reason or result of an action",
}

POS_REASON_EN = {
    "noun": "it names a person, place, thing or idea",
    "pronoun": "it stands in place of a noun",
    "verb": "it expresses an action or a state of being",
    "adjective": "it describes or qualifies a noun",
    "adverb": "it modifies a verb, an adjective or another adverb",
    "preposition": "it shows the relation of a noun or pronoun to another word",
    "conjunction": "it joins words, phrases or clauses",
    "interjection": "it expresses a sudden feeling or emotion",
}
POS_REASON_AS = {
    "noun": "ই ব্যক্তি, ঠাই, বস্তু বা ধাৰণাৰ নাম সূচায়",
    "pronoun": "ই বিশেষ্যৰ সলনি ব্যৱহাৰ হয়",
    "verb": "ই ক্ৰিয়া বা অৱস্থা প্ৰকাশ কৰে",
    "adjective": "ই বিশেষ্যক বৰ্ণনা বা যোগ্যতা প্ৰদান কৰে",
    "adverb": "ই ক্ৰিয়া, বিশেষণ বা অন্য ক্ৰিয়া বিশেষণক পৰিৱৰ্তন কৰে",
    "preposition": "ই বিশেষ্য বা সৰ্বনামৰ সৈতে অন্য শব্দৰ সম্পৰ্ক দেখুৱায়",
    "conjunction": "ই শব্দ, বাক্যাংশ বা খণ্ডবাক্য সংযোগ কৰে",
    "interjection": "ই হঠাৎ অনুভূতি বা আৱেগ প্ৰকাশ কৰে",
}

REASON_AS = {
    "proper_noun": "ই এজন নিৰ্দিষ্ট ব্যক্তি, ঠাই বা বস্তুৰ নাম",
    "common_noun": "ই এক শ্ৰেণীৰ ব্যক্তি, ঠাই বা বস্তুৰ নাম সূচায়",
    "collective_noun": "ই মানুহ, জন্তু বা বস্তুৰ এটা সমষ্টিৰ নাম সূচায়",
    "abstract_noun": "ই এটা গুণ, অনুভূতি বা ধাৰণাৰ নাম সূচায় যাক দেখা বা স্পৰ্শ কৰিব নোৱাৰি",
    "material_noun": "ই কিবা এটা তৈয়াৰ কৰা পদাৰ্থৰ নাম সূচায়",
    "personal_pronoun": "ই ব্যক্তি বা বস্তুৰ সলনি ব্যৱহাৰ হয়",
    "possessive_pronoun": "ই পৰৱৰ্তী বিশেষ্য নোহোৱাকৈ মালিকীস্বত্ব দেখুৱায়",
    "reflexive_pronoun": "ই বাক্যৰ কৰ্তালৈ ঘূৰি সূচায়",
    "relative_pronoun": "ই এটা খণ্ডবাক্য সংযোগ কৰি বিশেষ্যৰ সৈতে সম্পৰ্ক স্থাপন কৰে",
    "interrogative_pronoun": "ই প্ৰশ্ন সুধিবলৈ ব্যৱহাৰ হয়",
    "demonstrative_pronoun": "ই এজন নিৰ্দিষ্ট ব্যক্তি বা বস্তুলৈ আঙুলিয়াই দিয়ে",
    "indefinite_pronoun": "ই নাম নোলোৱাকৈ ব্যক্তি বা বস্তু সূচায়",
    "reciprocal_pronoun": "ই দুই বা ততোধিক ব্যক্তিৰ মাজৰ পাৰস্পৰিক ক্ৰিয়া দেখুৱায়",
    "transitive_verb": "ই অৰ্থ সম্পূৰ্ণ কৰিবলৈ এটা কৰ্ম লয়",
    "intransitive_verb": "ই কৰ্ম লোৱা নাই",
    "linking_verb": "ই কৰ্তাক তাৰ বৰ্ণনা কৰা শব্দৰ সৈতে সংযোগ কৰে",
    "auxiliary_verb": "ই কাল বা বাচ্য গঠন কৰিবলৈ মূল ক্ৰিয়াক সহায় কৰে",
    "modal_verb": "ই সামৰ্থ্য, অনুমতি, সম্ভাৱনা বা বাধ্যবাধকতা প্ৰকাশ কৰে",
    "qualitative_adjective": "ই বিশেষ্যৰ গুণ বৰ্ণনা কৰে",
    "quantitative_adjective": "ই কিমান পৰিমাণ আছে দেখুৱায়",
    "numeral_adjective": "ই সংখ্যা বা স্থান দেখুৱায়",
    "demonstrative_adjective": "ই এটা নিৰ্দিষ্ট বিশেষ্যলৈ আঙুলিয়াই দিয়ে",
    "possessive_adjective": "ই বিশেষ্যৰ মালিক কোন দেখুৱায়",
    "interrogative_adjective": "ই বিশেষ্যৰ বিষয়ে প্ৰশ্ন সোধে",
    "distributive_adjective": "ই এটা গোটৰ সদস্যসকলক এজন এজনকৈ সূচায়",
    "proper_adjective": "ই নামবাচক বিশেষ্যৰ পৰা গঠিত",
    "manner_adverb": "ই ক্ৰিয়া কিদৰে সম্পন্ন হয় কয়",
    "place_adverb": "ই ক্ৰিয়া ক'ত ঘটে কয়",
    "time_adverb": "ই ক্ৰিয়া কেতিয়া ঘটে কয়",
    "frequency_adverb": "ই ক্ৰিয়া কিমান বাৰ ঘটে কয়",
    "degree_adverb": "ই ক্ৰিয়া বা গুণৰ তীব্ৰতা কয়",
    "reason_adverb": "ই ক্ৰিয়াৰ কাৰণ বা ফলাফল দেখুৱায়",
}

items = []


def add(sentence, target, family, subtype):
    items.append((sentence, target, family, subtype))


# ---- common nouns (frames) ----
NOUN_FRAMES = [
    ("The {w} is on the table.", ["book", "pen", "cup", "plate", "bag", "key", "phone", "lamp", "bottle", "box"]),
    ("She bought a new {w}.", ["dress", "car", "watch", "camera", "bicycle", "sofa", "fridge", "guitar"]),
    ("The {w} was very heavy.", ["box", "stone", "bag", "table", "machine", "trunk"]),
    ("He repaired the {w} yesterday.", ["chair", "fan", "radio", "clock", "door", "window"]),
    ("We saw a {w} in the zoo.", ["lion", "tiger", "monkey", "bear", "deer", "zebra"]),
    ("The {w} smells sweet.", ["flower", "perfume", "cake", "mango", "rose"]),
    ("She wrote a {w} to her friend.", ["letter", "note", "message", "email"]),
    ("The {w} is parked outside.", ["car", "bus", "truck", "van", "scooter"]),
    ("The {w} is ringing loudly.", ["bell", "phone", "alarm"]),
    ("He opened the {w} carefully.", ["door", "box", "letter", "window"]),
    ("The {w} is full of water.", ["bucket", "bottle", "tank", "glass"]),
    ("She planted a {w} in the garden.", ["rose", "tree", "seed", "sapling"]),
    ("The {w} is flying in the sky.", ["bird", "kite", "plane", "balloon"]),
]
for frame, words in NOUN_FRAMES:
    for w in words:
        add(frame.format(w=w), w, "noun", "common_noun")

# ---- proper nouns ----
PROPER = [
    ("___ lives in Guwahati.", "Rina"), ("___ is my best friend.", "Rahul"),
    ("___ teaches us English.", "Anjali"), ("___ is the capital of Assam.", "Dispur"),
    ("___ is the capital of India.", "New Delhi"), ("The ___ flows through Assam.", "Brahmaputra"),
    ("We will meet on ___.", "Monday"), ("___ is the first month of the year.", "January"),
    ("___ is a large country in South Asia.", "India"), ("___ is famous for tea.", "Assam"),
    ("___ National Park is famous for rhinos.", "Kaziranga"), ("___ is the highest peak in the world.", "Everest"),
    ("The ___ is a sacred river.", "Ganga"), ("___ wrote many famous plays.", "Shakespeare"),
    ("___ is a major Indian company.", "Tata"), ("We celebrate ___ in Assam.", "Bihu"),
    ("___ is the last day of the week.", "Sunday"), ("___ is the last month of the year.", "December"),
    ("___ is a busy city in Maharashtra.", "Mumbai"), ("___ is the largest ocean.", "Pacific"),
]
for s, w in PROPER:
    add(s.replace("___", w), w, "noun", "proper_noun")

# ---- collective nouns ----
COLLECTIVE = [
    ("A ___ of players entered the field.", "team"), ("A ___ of people gathered at the gate.", "crowd"),
    ("A ___ of birds flew over the lake.", "flock"), ("A ___ of cattle grazed in the field.", "herd"),
    ("A ___ of ships sailed into the harbour.", "fleet"), ("A ___ of bees surrounded the hive.", "swarm"),
    ("A ___ of wolves hunted together.", "pack"), ("A ___ of grapes hung from the vine.", "bunch"),
    ("A ___ of singers performed at the concert.", "choir"), ("An ___ of soldiers marched past.", "army"),
    ("The ___ of students waited for the teacher.", "class"), ("The whole ___ attended the wedding.", "family"),
    ("The ___ met to discuss the plan.", "committee"), ("The ___ delivered its verdict.", "jury"),
    ("The ___ of directors held a meeting.", "board"), ("The ___ of the school gathered in the hall.", "staff"),
    ("A ___ of tourists visited the museum.", "group"), ("A ___ of sticks was tied together.", "bundle"),
    ("A ___ of thieves was arrested.", "gang"), ("A ___ of actors travelled across the country.", "troupe"),
]
for s, w in COLLECTIVE:
    add(s.replace("___", w), w, "noun", "collective_noun")

# ---- abstract nouns ----
ABSTRACT = [
    ("His ___ impressed everyone.", "honesty"), ("Her ___ saved the child.", "bravery"),
    ("We were moved by her ___.", "kindness"), ("He is known for his ___.", "wisdom"),
    ("The soldiers showed great ___.", "courage"), ("She handled the situation with ___.", "patience"),
    ("His ___ helped many poor students.", "generosity"), ("She spoke with complete ___.", "sincerity"),
    ("The ___ of the valley amazed us.", "beauty"), ("He always speaks the ___.", "truth"),
    ("Everyone deserves ___.", "freedom"), ("Their ___ lasted for decades.", "friendship"),
    ("A mother's ___ is unconditional.", "love"), ("He could not control his ___.", "anger"),
    ("The child was trembling with ___.", "fear"), ("We must never lose ___.", "hope"),
    ("Her face was full of ___.", "joy"), ("The news caused great ___.", "sadness"),
    ("He showed unwavering ___ to his country.", "loyalty"), ("___ makes people helpless.", "poverty"),
]
for s, w in ABSTRACT:
    add(s.replace("___", w), w, "noun", "abstract_noun")

# ---- material nouns ----
MATERIAL = [
    ("The ring is made of ___.", "gold"), ("The spoon is made of ___.", "silver"),
    ("The gate is made of ___.", "iron"), ("The table is made of ___.", "wood"),
    ("The window is made of ___.", "glass"), ("The bridge is made of ___.", "steel"),
    ("The wire is made of ___.", "copper"), ("The lamp is made of ___.", "brass"),
    ("The aeroplane is made of ___.", "aluminium"), ("The floor is made of ___.", "marble"),
    ("The shirt is made of ___.", "cotton"), ("The sweater is made of ___.", "wool"),
    ("The saree is made of ___.", "silk"), ("The bag is made of ___.", "leather"),
    ("The pot is made of ___.", "clay"),
]
for s, w in MATERIAL:
    add(s.replace("___", w), w, "noun", "material_noun")

# ---- pronouns ----
PRONOUNS = [
    ("___ is my brother.", "He", "personal_pronoun"), ("___ is my sister.", "She", "personal_pronoun"),
    ("___ are my friends.", "They", "personal_pronoun"), ("___ am a teacher.", "I", "personal_pronoun"),
    ("___ are very kind.", "You", "personal_pronoun"), ("___ is raining heavily.", "It", "personal_pronoun"),
    ("___ are going to the market.", "We", "personal_pronoun"),
    ("This book is ___.", "mine", "possessive_pronoun"), ("That car is ___.", "yours", "possessive_pronoun"),
    ("The decision is ___.", "theirs", "possessive_pronoun"), ("The fault is ___.", "his", "possessive_pronoun"),
    ("The idea was ___.", "hers", "possessive_pronoun"), ("This house is ___.", "ours", "possessive_pronoun"),
    ("She hurt ___.", "herself", "reflexive_pronoun"), ("He blamed ___.", "himself", "reflexive_pronoun"),
    ("They enjoyed ___.", "themselves", "reflexive_pronoun"), ("I taught ___.", "myself", "reflexive_pronoun"),
    ("We prepared ___.", "ourselves", "reflexive_pronoun"), ("You should protect ___.", "yourself", "reflexive_pronoun"),
    ("The cat cleaned ___.", "itself", "reflexive_pronoun"),
    ("The man ___ helped me is a doctor.", "who", "relative_pronoun"),
    ("The book ___ I bought is interesting.", "which", "relative_pronoun"),
    ("The girl ___ won the prize is my sister.", "who", "relative_pronoun"),
    ("This is the house ___ roof is red.", "whose", "relative_pronoun"),
    ("The person ___ you met is my uncle.", "whom", "relative_pronoun"),
    ("The dog ___ barks at night is mine.", "that", "relative_pronoun"),
    ("___ are you waiting for?", "Whom", "interrogative_pronoun"),
    ("___ is your favourite teacher?", "Who", "interrogative_pronoun"),
    ("___ is this pen?", "Whose", "interrogative_pronoun"),
    ("___ do you want to eat?", "What", "interrogative_pronoun"),
    ("___ of these is yours?", "Which", "interrogative_pronoun"),
    ("___ is my house.", "This", "demonstrative_pronoun"), ("___ are my books.", "These", "demonstrative_pronoun"),
    ("___ is your bag.", "That", "demonstrative_pronoun"), ("___ are your shoes.", "Those", "demonstrative_pronoun"),
    ("___ has taken my pen.", "Someone", "indefinite_pronoun"),
    ("___ can join the class.", "Anyone", "indefinite_pronoun"),
    ("___ was present at the meeting.", "Everyone", "indefinite_pronoun"),
    ("___ knows the answer.", "Nobody", "indefinite_pronoun"),
    ("___ is possible if you try.", "Anything", "indefinite_pronoun"),
    ("___ went wrong with the machine.", "Something", "indefinite_pronoun"),
    ("___ of the two answers is correct.", "Either", "indefinite_pronoun"),
    ("___ of the boys was absent.", "Neither", "indefinite_pronoun"),
    ("They helped ___.", "each other", "reciprocal_pronoun"),
    ("The two teams encouraged ___.", "one another", "reciprocal_pronoun"),
]
for s, w, sub in PRONOUNS:
    add(s.replace("___", w), w, "pronoun", sub)

# ---- verbs ----
VERBS = [
    ("She ___ a letter.", "wrote", "transitive_verb"), ("He ___ an apple.", "ate", "transitive_verb"),
    ("The boy ___ the ball.", "kicked", "transitive_verb"), ("She ___ the wall.", "painted", "transitive_verb"),
    ("They ___ a new car.", "bought", "transitive_verb"), ("He ___ the bag.", "carried", "transitive_verb"),
    ("The baby ___ peacefully.", "slept", "intransitive_verb"), ("They ___ late.", "arrived", "intransitive_verb"),
    ("She ___ at the joke.", "laughed", "intransitive_verb"), ("The child ___ loudly.", "cried", "intransitive_verb"),
    ("The old man ___ last year.", "died", "intransitive_verb"), ("He ___ at me.", "smiled", "intransitive_verb"),
    ("He ___ tired.", "seems", "linking_verb"), ("She ___ beautiful.", "looks", "linking_verb"),
    ("He ___ a doctor.", "became", "linking_verb"), ("The food ___ delicious.", "tastes", "linking_verb"),
    ("She ___ happy.", "feels", "linking_verb"), ("It ___ to be true.", "appears", "linking_verb"),
    ("She ___ singing.", "is", "auxiliary_verb"), ("They ___ finished the work.", "have", "auxiliary_verb"),
    ("___ you like tea?", "Do", "auxiliary_verb"), ("He ___ writing a letter.", "was", "auxiliary_verb"),
    ("We ___ going tomorrow.", "are", "auxiliary_verb"),
    ("You ___ obey the rules.", "must", "modal_verb"), ("She ___ swim well.", "can", "modal_verb"),
    ("We ___ help the poor.", "should", "modal_verb"), ("It ___ rain today.", "may", "modal_verb"),
    ("He ___ come if he wishes.", "might", "modal_verb"), ("___ you please open the door?", "Could", "modal_verb"),
]
for s, w, sub in VERBS:
    add(s.replace("___", w), w, "verb", sub)

# ---- adjectives ----
ADJECTIVES = [
    ("She wore a ___ dress.", "beautiful", "qualitative_adjective"),
    ("He is a ___ boy.", "tall", "qualitative_adjective"),
    ("She is an ___ person.", "honest", "qualitative_adjective"),
    ("The soldier was very ___.", "brave", "qualitative_adjective"),
    ("He is ___ to everyone.", "kind", "qualitative_adjective"),
    ("She is a ___ student.", "smart", "qualitative_adjective"),
    ("There are ___ apples.", "many", "quantitative_adjective"),
    ("There is ___ water.", "much", "quantitative_adjective"),
    ("He has ___ friends.", "few", "quantitative_adjective"),
    ("There is ___ hope.", "little", "quantitative_adjective"),
    ("___ students were absent.", "Some", "quantitative_adjective"),
    ("We have ___ time.", "enough", "quantitative_adjective"),
    ("___ boys are playing.", "Three", "numeral_adjective"),
    ("She has ___ pens.", "five", "numeral_adjective"),
    ("He was the ___ to arrive.", "first", "numeral_adjective"),
    ("She stood ___ in the queue.", "second", "numeral_adjective"),
    ("___ people attended the meeting.", "Several", "numeral_adjective"),
    ("___ book is mine.", "This", "demonstrative_adjective"),
    ("___ shoes are new.", "These", "demonstrative_adjective"),
    ("___ house is old.", "That", "demonstrative_adjective"),
    ("___ flowers are fresh.", "Those", "demonstrative_adjective"),
    ("___ car is new.", "My", "possessive_adjective"),
    ("___ bag is heavy.", "Your", "possessive_adjective"),
    ("___ father is a teacher.", "His", "possessive_adjective"),
    ("___ dress is red.", "Her", "possessive_adjective"),
    ("___ school is far.", "Our", "possessive_adjective"),
    ("___ books are here.", "Their", "possessive_adjective"),
    ("___ colour do you like?", "Which", "interrogative_adjective"),
    ("___ book is this?", "Whose", "interrogative_adjective"),
    ("___ kind of music do you enjoy?", "What", "interrogative_adjective"),
    ("___ student got a prize.", "Each", "distributive_adjective"),
    ("___ child was given a book.", "Every", "distributive_adjective"),
    ("___ road leads home.", "Either", "distributive_adjective"),
    ("___ answer is correct.", "Neither", "distributive_adjective"),
    ("He is an ___ soldier.", "Indian", "proper_adjective"),
    ("She is an ___ writer.", "Assamese", "proper_adjective"),
    ("They serve ___ food.", "French", "proper_adjective"),
    ("He studies ___ history.", "Chinese", "proper_adjective"),
]
for s, w, sub in ADJECTIVES:
    add(s.replace("___", w), w, "adjective", sub)

# ---- adverbs ----
ADVERBS = [
    ("He runs ___.", "quickly", "manner_adverb"), ("She speaks ___.", "softly", "manner_adverb"),
    ("They worked ___.", "carefully", "manner_adverb"), ("He shouted ___.", "loudly", "manner_adverb"),
    ("She greeted us ___.", "politely", "manner_adverb"), ("He fought ___.", "bravely", "manner_adverb"),
    ("She walked ___.", "quietly", "manner_adverb"), ("He solved it ___.", "easily", "manner_adverb"),
    ("She looked ___.", "everywhere", "place_adverb"), ("Come ___.", "here", "place_adverb"),
    ("He went ___.", "there", "place_adverb"), ("The children played ___.", "outside", "place_adverb"),
    ("She waited ___.", "inside", "place_adverb"), ("He ran ___.", "upstairs", "place_adverb"),
    ("They searched ___.", "nowhere", "place_adverb"),
    ("They arrived ___.", "yesterday", "time_adverb"), ("We will meet ___.", "tomorrow", "time_adverb"),
    ("She is busy ___.", "now", "time_adverb"), ("He will come ___.", "soon", "time_adverb"),
    ("I met him ___.", "then", "time_adverb"), ("She woke up ___.", "early", "time_adverb"),
    ("He came ___.", "late", "time_adverb"),
    ("He ___ comes late.", "always", "frequency_adverb"), ("She ___ visits us.", "often", "frequency_adverb"),
    ("They ___ play cricket.", "sometimes", "frequency_adverb"), ("He ___ eats meat.", "rarely", "frequency_adverb"),
    ("She ___ tells lies.", "never", "frequency_adverb"), ("We ___ go for a walk.", "usually", "frequency_adverb"),
    ("He ___ goes to the temple.", "seldom", "frequency_adverb"),
    ("She is ___ tired.", "very", "degree_adverb"), ("He is ___ intelligent.", "quite", "degree_adverb"),
    ("The soup is ___ hot.", "extremely", "degree_adverb"), ("It is ___ cold today.", "too", "degree_adverb"),
    ("He ___ fell.", "almost", "degree_adverb"), ("She is ___ tired.", "rather", "degree_adverb"),
    ("He was ill; ___, he stayed home.", "therefore", "reason_adverb"),
    ("It rained; ___, the match was cancelled.", "hence", "reason_adverb"),
    ("She worked hard; ___, she passed.", "thus", "reason_adverb"),
    ("The road was blocked; ___, we were late.", "consequently", "reason_adverb"),
]
for s, w, sub in ADVERBS:
    add(s.replace("___", w), w, "adverb", sub)

# ---- prepositions / conjunctions / interjections (main POS) ----
PREPS = [
    ("The cat is ___ the table.", "under"), ("The book is ___ the desk.", "on"),
    ("She is ___ home.", "at"), ("He walked ___ the bridge.", "across"),
    ("The river flows ___ the city.", "through"), ("He sat ___ me.", "beside"),
    ("The bank is ___ the post office.", "near"), ("She has lived here ___ 2015.", "since"),
    ("We waited ___ the rain stopped.", "until"), ("He worked ___ the night.", "during"),
    ("The keys are ___ the drawer.", "in"), ("He jumped ___ the pool.", "into"),
    ("She climbed ___ the wall.", "over"), ("The plane flew ___ the clouds.", "above"),
    ("The valley lies ___ the hills.", "below"), ("He stood ___ the door.", "behind"),
    ("The shop is ___ the corner.", "around"), ("We walked ___ the road.", "along"),
    ("He leaned ___ the wall.", "against"), ("They talked ___ the problem.", "about"),
    ("She went ___ the market.", "to"), ("He came ___ Delhi.", "from"),
    ("The gift is ___ you.", "for"), ("He wrote ___ a pen.", "with"),
    ("She left ___ saying goodbye.", "without"), ("He is ___ the two boys.", "between"),
    ("She is popular ___ her friends.", "among"), ("We will meet ___ Monday.", "on"),
    ("The train arrived ___ time.", "on"), ("He was absent ___ class.", "from"),
    ("She is good ___ mathematics.", "at"), ("He is afraid ___ snakes.", "of"),
    ("The book belongs ___ me.", "to"), ("He insisted ___ going.", "on"),
    ("They congratulated him ___ his success.", "on"), ("She is married ___ a doctor.", "to"),
    ("He died ___ cholera.", "of"), ("The meeting was postponed ___ rain.", "due to"),
    ("He went ___ the risk.", "despite"), ("Everyone came ___ John.", "except"),
]
for s, w in PREPS:
    add(s.replace("___", w), w, "pos", "preposition")

CONJS = [
    ("I was tired, ___ I kept working.", "but", "conjunction"),
    ("She sings ___ dances well.", "and", "conjunction"),
    ("Would you like tea ___ coffee?", "or", "conjunction"),
    ("He is poor ___ honest.", "but", "conjunction"),
    ("She was late, ___ she missed the bus.", "so", "conjunction"),
    ("He is old, ___ he is strong.", "yet", "conjunction"),
    ("He neither ate ___ slept.", "nor", "conjunction"),
    ("He must be tired, ___ he worked all day.", "for", "conjunction"),
    ("___ it rains, we will stay home.", "If", "conjunction"),
    ("___ you work hard, you will fail.", "Unless", "conjunction"),
    ("He passed ___ he studied well.", "because", "conjunction"),
    ("___ he was ill, he attended the meeting.", "Although", "conjunction"),
    ("She waited ___ the bus arrived.", "until", "conjunction"),
    ("He left ___ the meeting ended.", "after", "conjunction"),
    ("___ he was young, he lived in Delhi.", "When", "conjunction"),
    ("She sang ___ she cooked.", "while", "conjunction"),
    ("He is taller ___ his brother.", "than", "conjunction"),
    ("I do not know ___ he will come.", "whether", "conjunction"),
]
for s, w, _ in CONJS:
    add(s.replace("___", w), w, "pos", "conjunction")

INTERJ = [
    ("___, what a beautiful scene!", "Wow"), ("___, I lost my keys.", "Alas"),
    ("___, that hurts!", "Ouch"), ("___, we won the match!", "Hurrah"),
    ("___, I did not know that.", "Oh"), ("___, what a surprise!", "Ah"),
    ("___, look at this!", "Hey"), ("___, you have done well.", "Bravo"),
    ("___, that was close.", "Phew"), ("___, please be quiet.", "Hush"),
    ("___, I understand now.", "Aha"), ("___, what did you say?", "Eh"),
    ("___, let me think.", "Hmm"), ("___, I am not sure.", "Um"),
    ("___, we are going to win!", "Yippee"), ("___, good morning!", "Hello"),
    ("___, how are you?", "Hi"), ("___, what a pity!", "Alas"),
    ("___, that is wonderful!", "Wow"), ("___, I made a mistake.", "Oops"),
]
for s, w in INTERJ:
    add(s.replace("___", w), w, "pos", "interjection")

# ---- mixed identification ----
MIXED = [
    ("The children played in the park.", "children", "pos", "noun"),
    ("She quickly finished her homework.", "quickly", "pos", "adverb"),
    ("The old man walked slowly.", "old", "pos", "adjective"),
    ("He bought a beautiful painting.", "beautiful", "pos", "adjective"),
    ("They will visit us tomorrow.", "tomorrow", "pos", "adverb"),
    ("The teacher explained the lesson.", "teacher", "pos", "noun"),
    ("She and I are friends.", "and", "pos", "conjunction"),
    ("He sat under the tree.", "under", "pos", "preposition"),
    ("Wow! That is amazing.", "Wow", "pos", "interjection"),
    ("She herself solved the problem.", "herself", "pos", "pronoun"),
    ("The dog barked loudly.", "loudly", "pos", "adverb"),
    ("He is a famous singer.", "famous", "pos", "adjective"),
    ("We waited at the station.", "at", "pos", "preposition"),
    ("The baby slept peacefully.", "slept", "pos", "verb"),
    ("She has a red car.", "red", "pos", "adjective"),
    ("They arrived late.", "late", "pos", "adverb"),
    ("He opened the door.", "opened", "pos", "verb"),
    ("The book is on the shelf.", "on", "pos", "preposition"),
    ("She is very kind.", "very", "pos", "adverb"),
    ("Alas! He failed.", "Alas", "pos", "interjection"),
    ("The boys are playing football.", "boys", "pos", "noun"),
    ("I gave him a pen.", "him", "pos", "pronoun"),
    ("She sings beautifully.", "beautifully", "pos", "adverb"),
    ("He is an honest man.", "honest", "pos", "adjective"),
    ("We walked across the field.", "across", "pos", "preposition"),
    ("He ran fast.", "fast", "pos", "adverb"),
    ("The flowers smell sweet.", "sweet", "pos", "adjective"),
    ("They are my cousins.", "my", "pos", "adjective"),
    ("She wrote a letter.", "wrote", "pos", "verb"),
    ("But he did not listen.", "But", "pos", "conjunction"),
]
for s, w, fam, sub in MIXED:
    add(s, w, fam, sub)


def norm(s):
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()


def options_for(family, subtype):
    if family == "pos":
        pool = list(POS.keys())
        correct_label, correct_as = POS[subtype]
    else:
        pool = [x[0] for x in FAMILY[family]]
        correct_label, correct_as = next((x[1], x[2]) for x in FAMILY[family] if x[0] == subtype)
    idx = pool.index(subtype)
    picks = [subtype]
    step = 1
    while len(picks) < 4:
        cand = pool[(idx + step) % len(pool)]
        if cand not in picks:
            picks.append(cand)
        step += 1
    return picks, correct_label, correct_as


def label_of(family, key):
    if family == "pos":
        return POS[key]
    return next((x[1], x[2]) for x in FAMILY[family] if x[0] == key)


existing = [q for q in json.load(open(BANK)) if not str(q.get("id", "")).startswith("pos-extra-")]
seen = {norm(q["q"]["en"]) for q in existing}
rows = []
slot_cycle = [0, 1, 2, 3, 2, 1, 0, 3, 1, 2, 3, 0]
for sentence, target, family, subtype in items:
    stem_en = f'In the sentence "{sentence}", the word "{target}" is a ___'
    stem_as = f'"{sentence}" বাক্যটোত "{target}" শব্দটো কি?'
    if norm(stem_en) in seen:
        continue
    seen.add(norm(stem_en))
    picks, correct_label, correct_as = options_for(family, subtype)
    labels = [label_of(family, p) for p in picks]
    rows.append({
        "sentence": sentence,
        "target": target,
        "family": family,
        "subtype": subtype,
        "stem_en": stem_en,
        "stem_as": stem_as,
        "options": labels,
        "correct": picks.index(subtype),
        "reason_en": REASON_EN[subtype] if family != "pos" else None,
        "reason_as": REASON_AS[subtype] if family != "pos" else None,
    })

# balance the key and build bank items
out = []
for i, r in enumerate(rows, 1):
    slot = slot_cycle[i % len(slot_cycle)]
    opts = r["options"][:]
    picked = opts.pop(r["correct"])
    opts.insert(slot, picked)
    if r["family"] == "pos":
        en = f'"{r["target"]}" is a {POS[r["subtype"]][0].lower()} because {POS_REASON_EN[r["subtype"]]}.'
        as_ = f'"{r["target"]}" এটা {POS[r["subtype"]][1]}, কাৰণ {POS_REASON_AS[r["subtype"]]}।'
    else:
        en = f'"{r["target"]}" is a {label_of(r["family"], r["subtype"])[0].lower()} because {r["reason_en"]}.'
        as_ = f'"{r["target"]}" এটা {label_of(r["family"], r["subtype"])[1]}, কাৰণ {r["reason_as"]}।'
    out.append({
        "id": f"pos-extra-{i:03d}",
        "leaf": "parts-of-speech",
        "q": {"en": r["stem_en"], "as": r["stem_as"]},
        "options": [{"en": e, "as": a} for e, a in opts],
        "correct": slot,
        "explanation": {"en": en, "as": as_},
    })

existing.extend(out)
json.dump(existing, open(BANK, "w"), ensure_ascii=False, indent=2)
print("added", len(out), "bank total", len(existing))
from collections import Counter
print(Counter(x["subtype"] for x in rows))
