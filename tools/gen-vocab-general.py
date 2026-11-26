#!/usr/bin/env python3
"""General Vocabulary: 200 odd-one-out questions from 50 categories."""

import sys
sys.path.insert(0, "tools")
from vocab_bank import append

CATS = [
    ("fruits", "apple,banana,mango,orange,grapes"),
    ("vegetables", "carrot,potato,onion,cabbage,spinach"),
    ("animals", "tiger,lion,elephant,horse,dog"),
    ("birds", "sparrow,crow,parrot,peacock,eagle"),
    ("colours", "red,blue,green,yellow,black"),
    ("flowers", "rose,lotus,lily,jasmine,sunflower"),
    ("trees", "neem,banyan,peepal,oak,deodar"),
    ("metals", "iron,copper,gold,silver,zinc"),
    ("gems", "diamond,ruby,emerald,sapphire,topaz"),
    ("planets", "Mars,Venus,Jupiter,Saturn,Neptune"),
    ("rivers", "Ganga,Brahmaputra,Yamuna,Godavari,Narmada"),
    ("mountains", "Everest,Kanchenjunga,Fuji,Kilimanjaro,Elbrus"),
    ("countries", "India,Nepal,Bhutan,Japan,France"),
    ("cities", "Delhi,Mumbai,Kolkata,Chennai,Bengaluru"),
    ("currencies", "rupee,dollar,yen,pound,euro"),
    ("languages", "Hindi,Assamese,Bengali,English,French"),
    ("occupations", "doctor,teacher,engineer,lawyer,farmer"),
    ("sports", "cricket,football,hockey,tennis,badminton"),
    ("musical instruments", "guitar,piano,violin,flute,drum"),
    ("vehicles", "car,bus,train,aeroplane,ship"),
    ("furniture", "table,chair,sofa,bed,cupboard"),
    ("clothing", "shirt,trousers,saree,jacket,skirt"),
    ("body parts", "eye,ear,nose,hand,foot"),
    ("diseases", "malaria,typhoid,cholera,dengue,measles"),
    ("medicines", "aspirin,paracetamol,antibiotic,antiseptic,vaccine"),
    ("weather", "rain,snow,storm,fog,wind"),
    ("seasons", "summer,winter,autumn,spring,monsoon"),
    ("months", "January,March,July,September,December"),
    ("days", "Monday,Wednesday,Friday,Sunday,Tuesday"),
    ("numbers", "one,two,three,four,five"),
    ("shapes", "circle,square,triangle,rectangle,oval"),
    ("units", "metre,litre,gram,second,kilometre"),
    ("tools", "hammer,screwdriver,spanner,saw,drill"),
    ("kitchen items", "knife,spoon,fork,plate,cup"),
    ("school items", "pen,pencil,eraser,ruler,notebook"),
    ("computer parts", "keyboard,mouse,monitor,printer,scanner"),
    ("festivals", "Diwali,Holi,Bihu,Christmas,Eid"),
    ("religions", "Hinduism,Islam,Christianity,Buddhism,Jainism"),
    ("stars", "Sun,Sirius,Polaris,Vega,Rigel"),
    ("oceans", "Pacific,Atlantic,Indian,Arctic,Southern"),
    ("seas", "Arabian,Red,Caspian,Dead,Black"),
    ("deserts", "Sahara,Thar,Gobi,Kalahari,Atacama"),
    ("islands", "Sri Lanka,Maldives,Andaman,Lakshadweep,Java"),
    ("dances", "Bharatanatyam,Kathak,Odissi,Manipuri,Kuchipudi"),
    ("literary forms", "novel,poem,essay,drama,story"),
    ("vitamins", "A,B,C,D,K"),
    ("organs", "heart,liver,kidney,lung,brain"),
    ("gases", "oxygen,nitrogen,hydrogen,helium,argon"),
    ("cereals", "rice,wheat,maize,barley,oats"),
    ("pulses", "lentil,chickpea,bean,pea,soybean"),
]

rows = []
for ci, (name, words) in enumerate(CATS):
    ws = words.split(",")
    other_name, other_words = CATS[(ci + 1) % len(CATS)]
    ows = other_words.split(",")
    for k in range(4):
        trio = [ws[(k + j) % len(ws)] for j in range(3)]
        odd = ows[k % len(ows)]
        four = trio + [odd]
        four = [four[(k + j) % 4] for j in range(4)]
        stem = "Which word does not belong with the others: " + ", ".join(four) + "?"
        rows.append({
            "stem": stem,
            "stem_as": "কোন শব্দটো বাকীবোৰৰ সৈতে নিমিলে: " + ", ".join(four) + "?",
            "correct": (odd, odd),
            "dists": [(w, w) for w in trio],
            "exp_en": f"The other three are {name}; '{odd}' belongs to {other_name}.",
            "exp_as": f"বাকী তিনিটা {name}; '{odd}' {other_name} ৰ অন্তৰ্গত।",
        })

append("general-vocabulary", rows)
