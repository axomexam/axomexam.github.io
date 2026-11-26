#!/usr/bin/env node
"use strict";

/* ============================================================
   axomexam — tools/build-dhs-dme-technical.js

   Publishes the "DHS & DME Technical Grade III" exam book from
   tools/dhs-dme-technical.structure.js:

     data/exams/dhs-dme-technical.json                 (registry entry)
     data/exams/dhs-dme-technical/syllabus.json
     data/exams/dhs-dme-technical/<sec>.json
     data/exams/dhs-dme-technical/<sec>/<group>/index.json
     data/exams/dhs-dme-technical/<sec>/<group>/<leaf>/{index.json,question-001.json}
     data/exams/dhs-dme-technical/<sec>/<leaf>/{index.json,question-001.json}
     exams/dhs-dme-technical/**.html                   (crawler-facing pages)
     data/exams/index.json                             (registry splice)
     sitemap.xml                                       (new URLs)

   The book used to have ten flat sub-categories. The published syllabus is
   far finer than that, so the flat banks are re-filed into the topic tree by
   LEGACY_BANKS below and the questions are classified with RULES. A question
   that matches no rule lands in that subject's "general-*" mixed-practice
   leaf, so nothing is ever dropped.

   Leaves with no question bank are still published: their page carries a
   "content is being prepared" panel and is marked noindex, because a page
   with no questions has nothing for a crawler to index yet. Once a bank is
   added the page becomes indexable and enters the sitemap on the next run.

   Idempotent: re-running rewrites the same bytes.

   Usage:
     node tools/build-dhs-dme-technical.js            # apply
     node tools/build-dhs-dme-technical.js --check    # report drift only
   ============================================================ */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { makeExamBookTools } = require("./lib/exam-book-pages");
const { EXAM, SYLLABUS } = require("./dhs-dme-technical.structure.js");

const ROOT = path.resolve(__dirname, "..");
const CHECK = process.argv.includes("--check");
const DATE = "2026-11-20";
const EXAM_ID = EXAM.id;

/* ---- where the ten flat banks live now, and where they belong ---- */
/* The committed banks sit at data/exams/<exam>/<section>/<leaf>/, so the
   legacy folder is two levels deep even when the new topic is grouped.
   [section, group|null, legacy folder, new leaf ids the questions sort into] */
const LEGACY_BANKS = [
  ["general-knowledge", "assam-history", ["general-knowledge", "assam-history"], [
    "assam-history-ancient", "assam-history-medieval", "assam-history-modern",
  ]],
  ["general-knowledge", "geography", ["general-knowledge", "geography"], [
    "assam-geography", "india-geography",
  ]],
  ["general-knowledge", "assam-gk", ["general-knowledge", "assam-gk"], [
    "assam-culture-festivals", "assam-economy", "assam-tribes-communities",
    "assam-wildlife-environment", "assam-current-affairs",
  ]],
  ["general-knowledge", "india-gk", ["general-knowledge", "india-gk"], [
    "indian-history", "indian-economy", "indian-art-culture", "indian-governance",
  ]],
  ["general-knowledge", "world-gk", ["general-knowledge", "world-gk"], [
    "world-geography", "world-history", "international-organizations",
  ]],
  ["general-knowledge", "static-gk", ["general-knowledge", "static-gk"], [
    "awards-honours", "books-authors", "important-days", "sports-games",
    "inventions-discoveries", "organizations-institutions", "space-defence",
    "miscellaneous-static-gk",
  ]],
  ["general-knowledge", "current-affairs", ["general-knowledge", "current-affairs"], [
    "national-international-news", "appointments-obituaries",
    "government-schemes", "science-tech-environment",
  ]],
  ["technical-science", "biology", ["technical-science", "biology"], [
    "cell-biology", "genetics-evolution", "human-anatomy", "human-physiology",
    "nutrition-vitamins", "diseases-health", "plant-botany", "animal-zoology",
    "ecology-environment", "microbiology-biotechnology", "general-biology",
  ]],
  ["technical-science", "chemistry", ["technical-science", "chemistry"], [
    "atomic-structure", "periodic-table", "chemical-bonding", "acids-bases-salts",
    "metals-nonmetals", "organic-chemistry", "polymers-materials", "fuels-combustion",
    "water-solutions", "chemical-reactions", "everyday-chemistry", "general-chemistry",
  ]],
  ["technical-science", "physics", ["technical-science", "physics"], [
    "units-measurement", "motion-force", "work-energy-power", "gravitation",
    "heat-thermodynamics", "sound-waves", "light-optics", "electricity-magnetism",
    "modern-nuclear-physics", "pressure-fluids", "simple-machines", "general-physics",
  ]],
  ["general-english", "grammar", ["general-english", "grammar"], [
    "parts-of-speech", "articles-determiners", "prepositions", "tenses",
    "subject-verb-agreement", "voice", "narration", "sentence-correction",
    "degrees-of-comparison", "question-tags-modals", "conjunctions",
    "non-finite-verbs", "general-grammar",
  ]],
  ["general-english", "vocabulary", ["general-english", "vocabulary"], [
    "synonyms", "antonyms", "one-word-substitution", "idioms-phrases",
    "phrasal-verbs", "spelling", "word-formation-roots", "homonyms-confusables",
    "general-vocabulary",
  ]],
  ["general-english", "comprehension-usage", ["general-english", "comprehension-usage"], [
    "reading-comprehension", "cloze-test", "sentence-completion",
    "paragraph-ordering", "precis-summary",
  ]],
  ["logical-reasoning", "verbal-reasoning", ["logical-reasoning", "verbal-reasoning"], [
    "analogy", "classification-odd-one-out", "number-series", "alphabet-series",
    "coding-decoding", "blood-relations", "direction-distance", "order-ranking",
    "alphabet-test-word-formation", "logical-sequence-words", "clock-calendar",
    "mathematical-operations", "input-output", "general-verbal-reasoning",
  ]],
  ["logical-reasoning", "non-verbal-reasoning", ["logical-reasoning", "non-verbal-reasoning"], [
    "figure-series", "figure-analogy-classification", "mirror-water-image",
    "paper-cutting-folding", "embedded-figures", "pattern-completion",
    "counting-figures", "cube-dice", "visual-memory",
    "general-non-verbal-reasoning",
  ]],
  ["numerical-aptitude", "arithmetic", ["numerical-aptitude", "arithmetic"], [
    "number-system", "simplification-bodmas", "decimals-fractions", "lcm-hcf",
    "percentage", "ratio-proportion", "average", "profit-loss-discount",
    "simple-interest", "compound-interest", "partnership", "mixture-alligation",
    "time-work", "pipes-cisterns", "time-speed-distance", "problems-on-trains",
    "boats-streams", "problems-on-ages",
  ]],
  ["numerical-aptitude", "algebra-geometry", ["numerical-aptitude", "algebra-geometry"], [
    "elementary-algebra", "quadratic-linear-equations", "geometry", "mensuration-2d",
    "mensuration-3d", "trigonometry", "height-distance", "coordinate-geometry",
  ]],
  ["numerical-aptitude", "data-combinatorics", ["numerical-aptitude", "data-combinatorics"], [
    "statistics", "data-interpretation", "permutation-combination", "probability",
  ]],
  ["technical-science", "computer-awareness", ["technical-science", "computer-awareness"], [
    "computer-fundamentals", "hardware-software", "ms-office", "networking-internet",
    "cyber-security", "dbms-number-system",
  ]],
  ["technical-science", "nursing-paramedical", ["technical-science", "nursing-paramedical"], [
    "fundamentals-nursing", "community-health-nursing", "medical-surgical-nursing",
    "maternal-child-health", "pharmacology", "lab-technology", "radiography-imaging",
    "physiotherapy-rehabilitation", "hospital-infection-control", "first-aid-emergency",
    "medical-terminology", "health-programmes-assam",
  ]],
];

/* ---- classification rules, first match wins ---- */
/* Order matters. A subject rule is listed before the generic one so that, for
   example, "the SI unit of resistance" is filed under electricity rather than
   under units-and-measurement, and "He is poor ___ honest" is filed under
   prepositions rather than under tenses just because it contains "is". */
const RULES = {
  biology: [
    ["cell-biology", /cell|cells|organelle|ribosom|lysosom|golgi|vacuol|mitochondri|nucleus|cytoplasm|membrane|prokaryot|eukaryot|amoeba|paramoecium|basic unit of life/i],
    ["genetics-evolution", /\bdna\b|\brna\b|gene|genetic|chromosom|heredity|mendel|natural selection|evolution|binomial|nomenclature|double helix|sex chromosom/i],
    ["nutrition-vitamins", /vitamin|deficiency|kwashiorkor|beriberi|goitre|anaemia|anemia|night blindness|scurvy|rickets|malnutrition|calorie/i],
    ["diseases-health", /disease|malaria|dengue|tuberculosis|\baids\b|polio|virus|bacteri|pathogen|fever|infect|transmit|mosquito|vaccin|immun/i],
    ["human-physiology", /blood|heart|lung|kidney|nervous|brain|hormone|insulin|thyroxine|adrenaline|gland|digest|enzyme|pepsin|bile|saliva|respiration|breath|pulse|pacemaker|oxygenat|pulmonary|\bwbc|\brbc|clotting|haemoglobin|hemoglobin|muscle|spinal|metabolis/i],
    ["human-anatomy", /organ|human body|largest gland|smallest bone|longest bone|number of bones|chambers|voice box|windpipe|food pipe|skin|teeth|\beye\b|\bear\b|\bnose\b|tongue|limb|skeleton|bone/i],
    ["plant-botany", /plant|xylem|phloem|stomata|transpiration|photosynthes|chlorophyll|flower|root|leaf|legume|nodule|botany|algae|fungi|fungus|moss|fern|pollen/i],
    ["animal-zoology", /animal|mammal|bird|fish|insect|reptile|amphibian|earthworm|ape\b|rhinoceros|langur|elephant|camel|whale|zoology|species|classific|kingdom|taxonom/i],
    ["microbiology-biotechnology", /microb|biotech|ferment|yeast|pasteur|antibiotic|sterilis|tissue culture|clone|vaccine production/i],
    ["ecology-environment", /ecosystem|ecology|food chain|food web|trophic|decomposer|biodiversity|environment|pollution|ozone|ramsar|wetland|national park|sanctuary|conservation|chipko|climate|habitat|niche|biotic|abiotic|nitrogen cycle|kaziranga|manas/i],
  ],
  chemistry: [
    ["atomic-structure", /atomic|electron|proton|neutron|nucleus of an atom|valency|valenc|isotope|avogadro|mole\b|molecular mass|orbit|shell/i],
    ["periodic-table", /periodic table|periods|groups|alkali metal|halogen|transition metal|first element|modern periodic/i],
    ["chemical-bonding", /bond|ionic|covalent|electrovalen|hybridis|hybridiz/i],
    ["acids-bases-salts", /\bph\b|acid|base\b|alkali|litmus|salt\b|neutralis|neutraliz|ant sting|lactic acid|tamarind|vinegar|lemon/i],
    ["metals-nonmetals", /metal|ore\b|haematite|galvanis|alloy|bronze|brass|stainless|kerosene|reactive metal|extraction of iron|non-metal/i],
    ["organic-chemistry", /carbon|hydrocarbon|alkane|alkene|alcohol|carboxylic|methane|benzene|ethanol|methanol|formalin|glucose|sucrose|protein|organic|functional group|saturated|unsaturated/i],
    ["polymers-materials", /polymer|polythene|plastic|thermosetting|thermoplastic|synthetic|natural polymer|monomer|nylon|rayon/i],
    ["fuels-combustion", /fuel|combustion|burning|calorific|fossil|petroleum|cng|lpg|natural gas|refrigerant|candle|coal|destructive distillation/i],
    ["water-solutions", /water|hardness|solution|solute|solvent|homogeneous|purify|distilled|boiling point/i],
    ["chemical-reactions", /oxidation|reduction|exothermic|endothermic|catalyst|conservation of mass|boyle|charles|reaction|rust|corrosion|physical change|chemical change|displacement/i],
    ["everyday-chemistry", /soap|detergent|glass|plaster of paris|gypsum|washing soda|baking soda|bleaching powder|matchstick|iodine test|brown ring|silver nitrate|fertilis|fertiliz|drug|dye|paint/i],
  ],
  physics: [
    /* Subject rules first: a unit question about resistance or frequency
       belongs to the topic it measures, not to units-and-measurement. */
    ["electricity-magnetism", /electric|current|voltage|resistance|ohm|circuit|magnet|ammeter|voltmeter|fuse|transformer|battery|alternating|direct current|charge|conductor|insulator|electromagnet|motor|generator|ampere|coulomb|farad|henry|tesla|weber/i],
    ["modern-nuclear-physics", /nuclear|radioactiv|x-ray|xray|photoelectric|quantum|half-life|fission|fusion|alpha particle|beta particle|gamma|einstein|planck|atom|electron|proton|neutron/i],
    ["sound-waves", /sound|wave|frequency|amplitude|echo|sonar|ultrasonic|decibel|pitch|loudness|resonan|audible range/i],
    ["light-optics", /light|optic|lens|mirror|refraction|reflection|dispersion|spectrum|colour|color|prism|focal length|magnification|laser|fibre|fiber|rainbow|myopia|hypermetropia|eye\b/i],
    ["heat-thermodynamics", /heat|temperature|thermometer|calorie|conduction|convection|radiation|boiling point|melting|latent heat|thermodynam|specific heat|expansion|furnace|pyrometer/i],
    ["gravitation", /gravitat|escape velocity|acceleration due to gravity|satellite|orbit|weightlessness|kepler|value of g\b|\bg\b is zero|weight of a body/i],
    ["motion-force", /motion|force|newton|velocity|acceleration|momentum|inertia|friction|freely falling|law of motion|pendulum/i],
    ["work-energy-power", /work\b|energy|power|joule|watt|kinetic|potential energy|horsepower/i],
    ["pressure-fluids", /pressure|fluid|liquid|density|buoyan|archimedes|barometer|hydrometer|surface tension|viscosity|pascal|float|sink/i],
    ["simple-machines", /machine|lever|pulley|inclined plane|screw|wedge|mechanical advantage|gear/i],
    ["units-measurement", /si unit|unit of|measure|instrument|least count|dimension|significant figure|vernier|screw gauge/i],
  ],
  grammar: [
    ["voice", /passive voice|active voice|change into passive|change into active/i],
    ["narration", /indirect speech|direct speech|reported speech/i],
    ["degrees-of-comparison", /comparative degree|superlative degree|positive degree|degree of|comparison/i],
    ["question-tags-modals", /question tag|\bmodal\b/i],
    ["articles-determiners", /article|determiner|\ba\b.*\ban\b.*\bthe\b|\bthe\b sun|\ban\b elephant|\ba\b best student/i],
    /* A blank before a preposition is a preposition question even when the
       sentence also contains "is", so this rule runs before tenses. */
    ["prepositions", /preposition|___\s*(honest|I return|the two brothers|the students|the river|your proposal|you on this point|mathematics|2015|morning|night|me|him|her|us|them|the zoo|the class)|\b(senior|junior|superior|inferior|prior)\s+___/i],
    ["subject-verb-agreement", /each of|neither|either|one of the|subject-verb|agreement|verb agrees/i],
    ["conjunctions", /conjunction|hardly had|no sooner|\bunless\b|\balthough\b|\bnot only\b.*\bbut also\b/i],
    ["non-finite-verbs", /infinitive|gerund|participle|non-finite/i],
    ["sentence-correction", /correct the sentence|the correct form is|the correct sentence is|spot the error|error detection|incorrect sentence/i],
    ["tenses", /tense|present perfect|past perfect|future tense|has been|have been|had been|\bwill\b|\bsince\b.*\bmorning\b|\byesterday\b|\btomorrow\b/i],
    ["parts-of-speech", /noun|pronoun|adjective|adverb|\bverb\b|interjection|parts of speech|abstract noun|plural of|word '.*' is a/i],
  ],
  vocabulary: [
    ["synonyms", /synonym/i],
    ["antonyms", /antonym/i],
    ["phrasal-verbs", /phrasal verb/i],
    ["idioms-phrases", /idiom|'to |'a |'in |'at |'bona fide'|proverb|means:/i],
    ["one-word-substitution", /one who|a person who|a place where|'a person|'a place|'a handwriting|study of|fear of|government by|killing of|a speech delivered|a life story|a book published|is called a:|is called an:/i],
    ["homonyms-confusables", /correct word|confus|homonym|choose the correct word/i],
    ["word-formation-roots", /root '|adjective form|abstract noun of|stands for|the root|which word is different/i],
    ["spelling", /spelling|correctly spelt|misspelt/i],
  ],
  "verbal-reasoning": [
    ["analogy", / is to .* as |:.*::|analogy/i],
    ["coding-decoding", /coded as|code\b|in a code/i],
    ["blood-relations", /sister|brother|mother|father|son of|daughter|related to|uncle|aunt|nephew|niece|grandfather|grandmother/i],
    ["direction-distance", /faces north|faces south|faces east|faces west|turns right|turns left|km east|km west|km north|km south|direction/i],
    ["order-ranking", /rank|from the left|from the right|from the top|from the bottom|row of/i],
    ["number-series", /next number|series:|complete:.*\d|find the next/i],
    ["alphabet-series", /series: [A-Z],|complete the series: [A-Z]|alphabet/i],
    ["clock-calendar", /clock|angle between|today is|day after tomorrow|after \d+ days|calendar/i],
    ["mathematical-operations", /\d\s*[+\-×*÷]\s*\d\s*=|means .* is|if \d+ \+ \d+ =/i],
    ["logical-sequence-words", /arrange|meaningful order|dictionary order/i],
    ["alphabet-test-word-formation", /cannot be formed|word formation|midway between|value of [A-Z]/i],
    ["classification-odd-one-out", /odd one|odd pair|different:/i],
    ["input-output", /input|output|machine/i],
    ["syllogism", /all .* are |some .* are |conclusion|therefore/i],
  ],
  "non-verbal-reasoning": [
    ["cube-dice", /\bcube\b|\bdice\b|painted.*cut|opposite face|faces painted|opposite faces add up/i],
    ["mirror-water-image", /mirror image|water image|vertical mirror/i],
    ["paper-cutting-folding", /paper cut|paper fold|folded|punched|\bhole\b/i],
    ["embedded-figures", /embedded|hidden figure/i],
    ["counting-figures", /how many (triangles|squares|rectangles|lines)|count of|number of triangles|number of squares|total number of squares/i],
    ["pattern-completion", /incomplete pattern|missing piece|complete the pattern/i],
    ["figure-analogy-classification", /figure analogy|figure classification|odd one.*(cube|sphere|circle|square|cone|cylinder|pentagon|acute|right angle|triangle)|triangle : 3 sides|pentagon : 5/i],
    ["figure-series", /figure series|series of shaded|arrows pointing|rotated 90°|next points|rotation of 360/i],
    /* Only questions that really test recall of a shape stay here: symmetry,
       nets, and pencil-tracing. The rest fall through to the mixed-practice
       leaf, so this topic never turns into a dumping ground. */
    ["visual-memory", /line of symmetry|lines of symmetry|looks the same|closed curve|net of a cube|cannot be drawn without lifting|rotational symmetry|symmetric about both axes/i],
  ],
  arithmetic: [
    ["mixture-alligation", /mixture|mixed with|replaced with water|alligation/i],
    ["problems-on-trains", /train|platform/i],
    ["boats-streams", /boat|stream|downstream|upstream/i],
    ["pipes-cisterns", /pipe|cistern|tank/i],
    ["compound-interest", /compound(ed)? (interest|annually)|compound interest/i],
    ["simple-interest", /simple interest|rate of interest per annum/i],
    ["partnership", /partners?|invests|capital/i],
    ["profit-loss-discount", /profit|loss|loses|gain|discount|marked price|selling price|cost price/i],
    ["lcm-hcf", /\blcm\b|\bhcf\b|least number which when divided/i],
    ["number-system", /least number that must be added|largest three-digit|divisible by|remainder/i],
    ["simplification-bodmas", /simplify|bodmas|the value of \d+ ÷|the value of \d+ \+/i],
    ["decimals-fractions", /which fraction is the largest|0\.6 ×|decimals?|fraction/i],
    ["percentage", /percent|%/i],
    ["ratio-proportion", /\bratio\b|is divided among|[abc] : [abc]/i],
    ["average", /average/i],
    ["time-work", /can do a work|efficient|finish a work|working together/i],
    ["time-speed-distance", /speed|distance|km\/h|walks at/i],
    ["problems-on-ages", /age|years old|older than/i],
  ],
  "algebra-geometry": [
    ["coordinate-geometry", /midpoint|distance between the points|coordinate/i],
    ["mensuration-2d", /area of a circle|perimeter of a rectangle|area of a square|triangle's area/i],
    ["mensuration-3d", /volume of a cylinder|surface area of a cube|volume of a cube|cone|sphere/i],
    ["trigonometry", /sin |cos |tan θ|trigonometr/i],
    ["height-distance", /angle of elevation|angle of depression|tower/i],
    ["elementary-algebra", /x \+ 1\/x|a \+ b =|a² \+ b²|algebra/i],
    ["quadratic-linear-equations", /roots of|equations?|solution of \d/i],
    ["geometry", /triangle|hexagon|polygon|angle|circle/i],
  ],
  "data-combinatorics": [
    ["permutation-combination", /number of ways|arrangements|selecting/i],
    ["probability", /probability|dice|card is drawn/i],
    ["data-interpretation", /pie chart|sales rose|percentage increase/i],
    ["statistics", /median|mode|mean of the data/i],
  ],
  "geography": [
    /* Assam specific physical, political and wildlife geography. */
    ["assam-geography", /assam|brahmaputra|barak|kaziranga|manas|pobitora|dibru|saikhowa|raimona|dehing|patkai|majuli|guwahati|dibrugarh|jorhat|sivasagar|tezpur|silchar|dhubri|goalpara|nagaon|kamrup|sonitpur|lakhimpur|dhemaji|tinsukia|karbi|dima hasao|haflong|umiam|cherrapunji|mawsynram|shillong|dhansiri|subansiri|manas river|kopili|burhi dihing|disang|mikir/i],
    /* Everything else is Indian and world physical, economic and political geography. */
    ["india-geography", /.*/],
  ],
  "india-gk": [
    /* Ancient, medieval and modern history share one leaf, so the rules
       cover only the other three and history falls through to the fallback. */
    ["indian-economy", /gdp|five year plan|niti aayog|planning commission|reserve bank|rbi|inflation|repo|fiscal|monetary|budget|gst|disinvestment|sebi|stock exchange|bank nationalis|green revolution|white revolution|msme|sez\b|fdi|export|import|balance of payment|poverty|unemployment|census town|economic survey|econom/i],
    /* Architecture, dance, music, painting, festivals and institutions of art. */
    ["indian-art-culture", /dance|music|raga|tala|instrument|painting|mural|sculpture|temple|stupa|architecture|festival|classical|folk|theatre|natya|bharatanatyam|kathak|odissi|kuchipudi|manipuri|mohiniyattam|hindustani|carnatic|sangeet|akademi|unesco|heritage|museum|craft|handicraft|textile|art\b|culture/i],
    /* Constitutional bodies, civil services, defence and administration. */
    ["indian-governance", /constitution|parliament|lok sabha|rajya sabha|president|prime minister|cabinet|supreme court|high court|governor|election commission|comptroller|cag\b|upsc|civil service|ias\b|ips\b|panchayat|municipal|federal|amendment|fundamental right|directive principle|attorney general|niti|civil|governance|institution|administrat/i],
  ],
  "world-gk": [
    /* Physical, political and economic geography of the world. */
    ["world-geography", /ocean|sea\b|continent|country|capital|currency|desert|mountain|river|lake|island|peninsula|gulf|bay\b|strait|canal|latitude|longitude|equator|tropic|climate|monsoon|wind|current|tide|volcano|earthquake|plate\b|atmosphere|ozone|geography|globe|map\b|scale\b|isobar|isotherm|contour/i],
    /* Civilizations, dynasties, revolutions and world wars. */
    ["world-history", /civilization|civilisation|empire|dynasty|pharaoh|roman|greek|persian|ottoman|mughal|renaissance|revolution|war\b|treaty|emperor|king\b|queen\b|explorer|voyage|colony|independence|history|ancient|medieval|modern/i],
    /* Global and regional bodies, their seats, heads and founding years. */
    ["international-organizations", /nations|organization|organisation|un\b|unesco|unicef|who\b|ilo\b|fao\b|wto\b|imf\b|world bank|nato|saarc|asean|brics|g20|g7\b|opec|commonwealth|non-aligned|interpol|amnesty|red cross|headquarters|secretariat|secretary-general|director-general|member state|charter|summit|treaty|agency|council/i],
  ],
  "assam-gk": [
    /* Festivals, performing arts, crafts, food and religious sites. */
    ["assam-culture-festivals", /bihu|bishnu|dol jatra|me-dam-me-phi|ali-ai-ligang|bohag|kati|magh|sattra|namghar|xatra|ojapali|sattriya|jhumar|bagurumba|kamakhya|ambubachi|majuli|raas|deodhani|dhulia|bhortal|tokari|gogona|jaapi|sualkuchi|muga|pat silk|eri\b|culture|festival|dance|music|instrument|weav|craft|mask|shrine|temple/i],
    /* Agriculture, tea, industry, transport, power and state finance. */
    ["assam-economy", /tea\b|garden|factory|industry|refinery|numaligarh|digboi|bongaigaon|namrup|paper mill|cement|sugar mill|oil\b|gas\b|coal|crop|paddy|rice|jute|mustard|agricultur|irrigation|forest produce|gdp|per capita|budget|revenue|tax\b|bank|credit|msme|handloom|tourism|airport|railway|highway|bridge|port\b|power|electric|econom/i],
    /* Tribes, communities, languages and social institutions. */
    ["assam-tribes-communities", /tribe|tribal|bodo\b|mising|karbi|dimasa|rabha|tiwa|lalung|deori|sonowal|thengal|chutia|koch\b|kalita|kaibarta|keot|nath|yogi|hira|muslim|sikh|bengali|nepali|community|clan|village council|gaon bura|satra\b|mahanta|language|dialect|population|literacy|sex ratio|density/i],
    /* National parks, sanctuaries, species and conservation. */
    ["assam-wildlife-environment", /national park|sanctuary|reserve|kaziranga|manas|pobitora|orang|dibru|saikhowa|nameri|raimona|garampani|burachapori|laokhowa|panidihing|dehing|amchang|borail|species|rhino|tiger|elephant|hoolock|golden langur|pigmy hog|wild buffalo|dolphin|turtle|vulture|bird|flood|erosion|earthquake|landslide|pollution|climate|forest cover|biosphere|wetland|beel\b|deforestation/i],
    /* Anything about the state's recent events, schemes and people. */
    ["assam-current-affairs", /scheme|mission|yojana|2024|2025|2026|appointed|elected|launched|inaugurated|award|chief minister|governor|commission|committee|policy|act\b|budget 20|survey|census|census 2011|sports|festival 20|summit|conclave/i],
  ],
  "assam-history": [
    /* Kamarupa and the dynasties before the Ahoms. */
    ["assam-history-ancient", /kamarupa|varman|bhaskarvarman|pushyavarman|sthitavarman|salastambha|pala\b|davaka|bhutivarman|harsha|hieun|hsiuan|hsuen|danava|naraka|bhagadatta|pragjyotisha|davaka|copper.?plate|land grant|dutaka|bhukti|gramika|maharajadhiraja|ancient/i],
    /* Ahom rule and the other medieval kingdoms, up to the British arrival. */
    ["assam-history-medieval", /ahom|sukapha|buranji|charaideo|garhgaon|rangpur|saraighat|lachit|borphukan|barbarua|paik\b|khel\b|swargadeo|suhungmung|rudra singha|siva singha|gadadhar|moamoria|maidam|satra\b|sankardeva|madhavdeva|namghar|koch\b|naranarayan|chilarai|chutiya|kachari|dimasa|jaintia|moghul|mughal|yandabo|burmese/i],
    /* Colonial and post independence Assam. */
    ["assam-history-modern", /british|colonial|maniram|dewan|annex|1857|arunodoi|jonaki|assam association|ahom sabha|gopinath bordoloi|ambedkar|partition|independence|chief minister|agitation|assam accord|congress|swadeshi|revolt|plant|tea garden|missionary|serampore|gauhati university|state of assam|1971|1985/i],
  ],
};

/* ---- read a legacy bank out of the committed folder ---- */
function readLegacyBank(parts) {
  /* The ten original flat banks are build inputs, not published content: the
     build splits them into the topic tree, and the served folder must hold
     only the split result. Keeping them under data/ made the counters read
     each question twice (once at the old flat path, once at its new topic),
     so they live in tools/legacy-banks/ instead. */
  const dir = path.join(ROOT, "tools", "legacy-banks", EXAM_ID, ...parts);
  let names = [];
  try {
    const manifest = JSON.parse(fs.readFileSync(path.join(dir, "index.json"), "utf8"));
    if (manifest && Array.isArray(manifest.files)) names = manifest.files.slice();
  } catch (e) { /* no manifest — fall back to a directory scan */ }
  if (!names.length) {
    try { names = fs.readdirSync(dir).filter((n) => /^question-.*\.json$/i.test(n)); } catch (e) { return []; }
  }
  names.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  const out = [];
  for (const name of names) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
      if (Array.isArray(data)) out.push(...data);
      else if (data && typeof data === "object") out.push(data);
    } catch (e) { /* skip an unreadable file rather than fail the build */ }
  }
  return out;
}

function classify(rules, fallback, question) {
  /* An authored item may name its leaf outright. Biology has eleven leaves
     whose vocabularies overlap badly — "bacteria" sits in both microbiology
     and disease, "DNA" in both genetics and biotechnology — so a regex pass
     over the stem cannot be trusted for the bulk-added items. An explicit
     leaf wins over the rules; a stale one fails loudly. */
  const explicit = question && question.leaf;
  if (typeof explicit === "string" && explicit) {
    if (!ALL_LEAF_IDS.has(explicit)) throw new Error(`question ${question.id}: leaf "${explicit}" is not in the tree`);
    return explicit;
  }
  const text = String((question && question.q && question.q.en) || "");
  for (const [id, re] of rules) if (re.test(text)) return id;
  return fallback;
}

/* ---- build the per-leaf question banks ---- */
const BANKS = {};
const BANK_COUNT = {};

/* A rule may point at a leaf that lives in another group of the same book —
   syllogism questions sit in the committed verbal-reasoning bank but the
   syllabus files syllogism under analytical reasoning. Buckets are therefore
   global, and every target is checked against the tree so a typo fails loudly
   instead of silently dropping questions. */
const ALL_LEAF_IDS = new Set();
function collectLeaves(node) {
  const children = Array.isArray(node.subcategories) ? node.subcategories : [];
  if (children.length) for (const c of children) collectLeaves(c);
  else ALL_LEAF_IDS.add(node.id);
}
for (const sec of EXAM.sections) {
  if (sec.type === "syllabus") continue;
  for (const sub of sec.subcategories || []) collectLeaves(sub);
}

for (const [secId, groupId, legacyParts, leafIds] of LEGACY_BANKS) {
  const fallback = leafIds[leafIds.length - 1];
  const rules = RULES[groupId] || [];
  const questions = readLegacyBank(legacyParts);
  const buckets = new Map();
  for (const q of questions) {
    const target = classify(rules, fallback, q);
    if (!ALL_LEAF_IDS.has(target)) throw new Error(`rule target "${target}" is not a leaf in the tree`);
    if (!buckets.has(target)) buckets.set(target, []);
    buckets.get(target).push(q);
  }
  for (const [id, list] of buckets) {
    BANKS[`${EXAM_ID}:${id}`] = (BANKS[`${EXAM_ID}:${id}`] || []).concat(list);
  }
}

/* Questions that sit on a plain leaf (GK banks keep their folder and id). */
for (const sec of EXAM.sections) {
  if (sec.type === "syllabus") continue;
  for (const sub of sec.subcategories || []) {
    if (Array.isArray(sub.subcategories) && sub.subcategories.length) continue;
    if (BANKS[`${EXAM_ID}:${sub.id}`]) continue;
    BANKS[`${EXAM_ID}:${sub.id}`] = readLegacyBank([sec.id, sub.id]);
  }
}

/* Non-verbal pages open with figure questions: the definition-style items that
   carry no drawing read badly as an opener, so they move to the end of the
   topic while keeping their relative order. */
const NV_LEAVES = (LEGACY_BANKS.find((b) => b[1] === "non-verbal-reasoning") || [null, null, null, []])[3];
const hasFigure = (q) =>
  Boolean(q && String(q.fig || "").trim()) ||
  (Array.isArray(q && q.options) &&
    q.options.some((o) => o && String(o.fig || "").trim()));
for (const id of NV_LEAVES) {
  const key = `${EXAM_ID}:${id}`;
  const list = BANKS[key];
  if (!list) continue;
  BANKS[key] = [...list.filter(hasFigure), ...list.filter((q) => !hasFigure(q))];
}

for (const [key, list] of Object.entries(BANKS)) BANK_COUNT[key] = list.length;

/* ---- shared page builder ---- */
const BOOK = makeExamBookTools({
  ROOT,
  DRY: CHECK,
  DATE,
  chromeLeaf: "exams/dhs-dme/general-knowledge/assam-history/index.html",
  generatorLabel: "tools/build-dhs-dme-technical.js",
  notes: require("./dhs-dme-technical.notes.js"),
  structureLabel: "tools/dhs-dme-technical.structure.js",
  noDataWrites: false,
  affiliationNote: "axomexam.in is an independent study platform and is not affiliated with the Directorate of Health Services or the Directorate of Medical Education, Assam. Verify all details from the official notification.",
});

const BOOK_EXAM = Object.assign({}, EXAM, { syllabus: SYLLABUS });

/* The shared builder writes one question-001.json per leaf, including an empty
   array for a leaf that has no bank yet. An empty array makes the app show
   "no content uploaded", so those leaves instead get files: [] plus a
   PREPARING marker that the page renderer and the app both read. */
const PREPARING = "content-preparing";

const leaves = BOOK.buildBook(BOOK_EXAM, BANKS, BANK_COUNT);

/* Study notes travel with the data, not just the static HTML: the reader is a
   client-side app and repaints the topic page from JSON. */
BOOK.writeJSON(`data/exams/${EXAM_ID}/notes.json`, BOOK.NOTES || {});
BOOK.spliceIndex([BOOK_EXAM], "dhs-dme");
BOOK.updateSitemap([BOOK_EXAM], { [BOOK_EXAM.id]: leaves });
BOOK.updateExamsIndex([BOOK_EXAM], { [BOOK_EXAM.id]: leaves }, BANK_COUNT, "Assam Police");

/* ---- post-pass: mark empty leaves as "preparing" ---- */
const { pageHead, jsonld, breadcrumbHTML, pageShell, editorialBlock, esc, lang, write } = BOOK;

function leafDirs() {
  const out = [];
  for (const l of leaves) {
    const parts = [l.sec.id, ...(l.group ? [l.group.id] : []), l.leaf.id];
    out.push({ item: l, parts, rel: ["data", "exams", EXAM_ID, ...parts].join("/"), route: `/exams/${EXAM_ID}/${parts.join("/")}` });
  }
  return out;
}

let preparingPages = 0;
let populatedPages = 0;
const preparingRoutes = [];

for (const d of leafDirs()) {
  const count = BANK_COUNT[`${EXAM_ID}:${d.item.leaf.id}`] || 0;
  if (count > 0) { populatedPages++; continue; }
  preparingPages++;
  preparingRoutes.push(d.route + "/");

  const emptyBank = path.join(ROOT, d.rel, "question-001.json");
  if (!CHECK && fs.existsSync(emptyBank)) {
    const body = JSON.parse(fs.readFileSync(emptyBank, "utf8"));
    if (Array.isArray(body) && body.length === 0) fs.unlinkSync(emptyBank);
  }
  write(`${d.rel}/index.json`, JSON.stringify({ subcategory: d.item.leaf.id, files: [], state: PREPARING }, null, 2) + "\n");
  write(`${d.route.slice(1)}/index.html`, preparingShell(d.item));
}

/* A page marked noindex must not be advertised in the sitemap: Search Console
   reports that pair as a conflict. updateSitemap above registers every leaf, so
   the preparing ones are stripped back out here. The next build re-adds a URL
   once its bank has questions. */
if (preparingRoutes.length) {
  const smRel = "sitemap.xml";
  const smAbs = path.join(ROOT, smRel);
  let xml = fs.readFileSync(smAbs, "utf8");
  const before = xml;
  for (const route of preparingRoutes) {
    const loc = `<loc>https://axomexam.in${route}</loc>`;
    const re = new RegExp(`[ \\t]*<url>(?:(?!</url>)[\\s\\S])*${loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:(?!</url>)[\\s\\S])*</url>\\n?`, "g");
    xml = xml.replace(re, "");
  }
  if (xml !== before) write(smRel, xml);
}

function preparingShell(item) {
  const secEn = lang(item.sec.title, "en");
  const secAs = lang(item.sec.title, "as");
  const leafEn = lang(item.leaf.title, "en");
  const leafAs = lang(item.leaf.title, "as");
  const examEn = lang(EXAM.title, "en");
  const groupEn = item.group ? lang(item.group.title, "en") : "";
  const route = `/exams/${EXAM_ID}/${[item.sec.id, ...(item.group ? [item.group.id] : []), item.leaf.id].join("/")}`;
  const canonical = `https://axomexam.in${route}/`;

  const title = `${leafEn} — ${secEn} — ${examEn} | axomexam`;
  const desc = `${leafEn} practice for ${examEn}. Bilingual questions, answers and explanations for ${secEn} are being prepared — check back shortly.`;

  const crumbs = [
    { name: "Home", url: "https://axomexam.in/" },
    { name: "Your Exams", url: "https://axomexam.in/exams/" },
    { name: examEn, url: `https://axomexam.in/exams/${EXAM_ID}/` },
    { name: secEn, url: `https://axomexam.in/exams/${EXAM_ID}/${item.sec.id}/` },
    ...(item.group ? [{ name: groupEn, url: `https://axomexam.in/exams/${EXAM_ID}/${item.sec.id}/${item.group.id}/` }] : []),
    { name: leafEn },
  ];

  const head = pageHead({
    title, desc, canonical, themeColor: item.sec.color,
    imageAlt: `axomexam - ${leafEn}`, cover: EXAM.cover,
    jsonld: jsonld({ canonical, title, desc, crumbs, cover: EXAM.cover, teaches: secEn }),
  }).replace(
    /<meta name="robots"[^>]*>/,
    '<meta name="robots" content="noindex, follow" />'
  );

  const siblings = (item.group ? item.group.subcategories : item.sec.subcategories)
    .filter((s) => s.id !== item.leaf.id)
    .slice(0, 12);

  const siblingLinks = siblings.map((s) =>
    `<a class="sub-card reveal" href="${route.replace(/\/[^/]+$/, "")}/${s.id}/" style="display:block; margin:8px 0; padding:12px 14px; border:1px solid var(--border,#e2e8f0); border-radius:12px; text-decoration:none;"><b style="color:var(--ink,#0f172a);">${esc(lang(s.title, "en"))}</b><span style="display:block; color:var(--ink-muted,#64748b); font-size:0.85rem;">${esc(lang(s.title, "as"))}</span></a>`
  ).join("\n        ");

  const mainHTML = `    <div class="page-head">
      ${breadcrumbHTML(crumbs)}
      <h1>${esc(leafEn)}</h1>
      <p class="page-desc">${esc(leafAs)} &bull; ${esc(secEn)} &bull; ${esc(examEn)}</p>
    </div>

    <section class="section" style="padding-bottom:34px;">
      <div class="info-panel" data-content-preparing="1" style="max-width:860px; margin:0 auto; background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:16px; padding:22px 24px; line-height:1.8; color:var(--ink-soft,#475569); text-align:left;">
        <p style="margin:0 0 10px; font-weight:800; color:var(--ink,#0f172a); font-size:1.05rem;">Content is being prepared / সমল প্ৰস্তুত কৰি থকা হৈছে</p>
        <p style="margin:0 0 10px;">The bilingual question bank for <strong>${esc(leafEn)}</strong> is being written and checked. Questions, options, answers and explanations in English and Assamese will appear on this page shortly. Please check back after some time.</p>
        <p style="margin:0;"><span lang="as">${esc(leafEn)}</span> ৰ বাবে দ্বিভাষিক প্ৰশ্ন-সংগ্ৰহ প্ৰস্তুত আৰু পৰীক্ষা কৰি থকা হৈছে। ইংৰাজী আৰু অসমীয়াত প্ৰশ্ন, বিকল্প, উত্তৰ আৰু ব্যাখ্যা অচিৰেই এই পৃষ্ঠাত উপলব্ধ হ'ব। অনুগ্ৰহ কৰি কিছু সময়ৰ পিছত পুনৰ চাওক।</p>
      </div>
    </section>

    <section class="section" style="padding-bottom:30px;">
      <div style="max-width:860px; margin:0 auto; line-height:1.85; color:var(--ink-soft,#475569);">
        <h2 style="font-size:1.12rem; color:var(--ink,#0f172a); margin:0 0 10px;">What this topic covers</h2>
        <p style="margin:0 0 12px;">${esc(leafEn)} is one of the topics in the ${esc(secEn)} section of the ${esc(examEn)} written examination. The paper is objective, carries 100 questions of one mark each in 120 minutes, and has no negative marking, so a candidate who has revised every topic in this section can attempt the full paper without leaving blanks. Questions on this topic are set at the diploma or degree standard of the post applied for, and the paper is bilingual in English and Assamese.</p>
        <p style="margin:0 0 12px;">Until the bank for this topic is published, use the neighbouring topics below. Each one is part of the same section and follows the same pattern, so practice there keeps your revision moving while this page is filled in.</p>
        <p style="margin:0;">${esc(leafAs)} — ${esc(secAs)} শিতানৰ এটা বিষয়। এই পৰীক্ষাৰ প্ৰশ্নকাকত উদ্দেশ্যমূলক, ১২০ মিনিটত ১০০ টা প্ৰশ্নৰ প্ৰতিটোৰে ১ নম্বৰ, আৰু ঋণাত্মক মাৰ্কিং নাই। এই বিষয়ৰ প্ৰশ্ন প্ৰাৰ্থীৰ ডিপ্লমা বা ডিগ্ৰী স্তৰত সোধা হয় আৰু প্ৰশ্নকাকত ইংৰাজী তথা অসমীয়া দুয়োটা ভাষাত থাকে।</p>
      </div>
    </section>

    <section class="section" data-exam-subcats style="padding-bottom:40px;">
      <h2 style="margin:0 0 6px;">Other topics in this section</h2>
      <div class="sub-grid" style="max-width:860px; margin:0 auto;">
        ${siblingLinks}
      </div>
      <div style="max-width:860px; margin:18px auto 0;"><a class="btn btn-outline btn-sm" href="/exams/${EXAM_ID}/${item.sec.id}/">Back to ${esc(secEn)}</a></div>
    </section>`;

  return pageShell({ head, mainHTML, extraHTML: editorialBlock(EXAM, item.sec.title, item.sec.id) + "\n" });
}

const total = leaves.reduce((a, l) => a + (BANK_COUNT[`${EXAM_ID}:${l.leaf.id}`] || 0), 0);
const stats = BOOK.stats();
console.log(
  `build-dhs-dme-technical: ${leaves.length} topics ` +
  `(${populatedPages} with questions, ${preparingPages} preparing), ${total} questions, ` +
  `${stats.written} file(s) ${CHECK ? "would change" : "written"}, ${stats.skipped} unchanged`
);

/* pageHead drops the hreflang trio because build-as-twins writes the correct
   pair afterwards. Running the build alone therefore leaves every rebuilt page
   without alternates, and the sitemap without its /as/ twins, so the two
   follow-up steps are part of this command rather than a thing to remember. */
if (!CHECK) {
  for (const step of ["build-as-twins.js", "sync-sitemap-alts.js"]) {
    execFileSync(process.execPath, [path.join(__dirname, step)], { stdio: "inherit" });
  }
}
