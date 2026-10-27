"use strict";

/*
 * tools/enrich-content.data.js
 *
 * Page-specific prose for the exam hub pages, keyed by section id, by
 * "section/sub-category" path and by exam id.
 *
 * The hub pages are navigational: a breadcrumb and a grid of link cards. The
 * words a crawler and an AdSense reviewer read have to come from somewhere, and
 * a single shared paragraph reused across every hub is exactly the duplicate
 * boilerplate that triggered the thin-content flag in the first place. So each
 * entry here says something only true of that section, sub-category or exam.
 *
 * Fields
 *   covers   - what the syllabus actually asks from this topic
 *   skills   - the sub-skills or question shapes the practice drills
 *   mistakes - the errors candidates actually make here
 *   method   - how to work through the set
 */

const SECTION_NOTES = {
  "elementary-mathematics": {
    covers: [
      "Elementary Mathematics in these papers is arithmetic rather than higher algebra: number system, LCM and HCF, percentage, ratio and proportion, average, profit and loss, simple and compound interest, time and work, time, speed and distance, and basic mensuration.",
      "The questions are usually one or two steps long and are designed to be finished in about a minute, so speed with the standard formulas matters more than clever manipulation.",
    ],
    skills: [
      "Converting between fractions, decimals and percentages without a calculator",
      "Applying the unitary method to work, speed and mixture problems",
      "Estimating an answer before computing it, so an arithmetic slip shows up immediately",
    ],
    mistakes: [
      "Reading a percentage increase as a percentage of the original rather than the new value",
      "Mixing up the formulas for simple and compound interest in two-year questions",
      "Leaving the ratio unsimplified and then choosing an option that is technically equivalent but not the one listed",
    ],
    method: [
      "Start with number system, LCM and HCF and percentage. Almost every other arithmetic topic leans on those three.",
      "Do the sets topic by topic. Attempting a mixed set before the individual topics are solid hides which rule you are actually weak in.",
      "Keep a one-page formula sheet and read it before each set rather than during it.",
    ],
  },
  "general-english": {
    covers: [
      "General English tests grammar and usage rather than literature: parts of speech, articles and determiners, tenses, subject-verb agreement, prepositions, voice, narration, plus vocabulary work such as synonyms, antonyms, idioms, one-word substitution and spelling.",
      "Assam recruitment papers draw heavily on the same recurring rules, so past questions repeat the same handful of concepts with different words.",
    ],
    skills: [
      "Spotting the error in a sentence by checking one rule at a time rather than reading for meaning",
      "Choosing between near-synonyms by register and collocation, not by dictionary definition alone",
      "Recognising idioms as fixed units instead of translating them word for word",
    ],
    mistakes: [
      "Deciding an option is correct because the sentence sounds natural, when the rule it breaks is agreement or tense",
      "Treating Assamese and English word order as interchangeable and so misreading the question",
      "Answering idiom questions literally, which is exactly what the distractors are built on",
    ],
    method: [
      "Work grammar before vocabulary. The grammar rules are finite and once learnt they hold for every paper.",
      "For vocabulary, revise in small groups of related words rather than a long list, and write one sentence of your own for each word.",
      "After each set, note down the rule behind every wrong answer. English marks come from the rules, not from reading volume.",
    ],
  },
  "logical-reasoning": {
    covers: [
      "Logical Reasoning and Mental Ability splits into verbal reasoning, which is read and solved in words, and non-verbal reasoning, which is solved from figures and patterns.",
      "The verbal side covers series, analogy, coding and decoding, blood relations, direction sense, ranking, syllogism, calendars and clocks. The non-verbal side covers figure series, analogy and classification, mirror and water images, paper folding, embedded figures, counting figures and pattern completion.",
    ],
    skills: [
      "Redrawing a relationship as a diagram instead of holding it in your head",
      "Timing yourself per question, because this section is decided by pace as much as accuracy",
      "Checking a pattern against every term in the series before committing to it",
    ],
    mistakes: [
      "Assuming a series is arithmetic when it alternates between two different rules",
      "Reading a direction question without fixing a starting orientation first",
      "Choosing a mirror image that has been rotated instead of reflected",
    ],
    method: [
      "Learn the question shapes first. Each type has a standard method, and recognising the type is most of the work.",
      "Practise non-verbal reasoning with a pencil. Tracing and rotating the figure by hand is faster and less error-prone than doing it mentally.",
      "Revisit the sets you scored lowest on rather than repeating the ones you already find easy.",
    ],
  },
  "general-knowledge-assam-gk": {
    covers: [
      "General Knowledge and Assam GK is the widest section in the ADRE Grade IV paper: Assam's history from ancient Kamarupa through the Ahom and Koch kingdoms and the freedom struggle, Assamese literature and folk culture, the state's geography and rivers, plus general knowledge about India, current affairs and static facts.",
      "Because the section is broad, the marks come from coverage rather than depth. A candidate who has read widely but shallowly usually outscores one who has mastered a single topic.",
    ],
    skills: [
      "Linking a fact to the year and the ruler or administration it belongs to",
      "Remembering Assam's firsts, which are asked more often than any other single category",
      "Keeping current affairs notes to the last six to eight months, which is the window these papers draw from",
    ],
    mistakes: [
      "Learning Assam and Indian history as one timeline and then attributing an Indian event to Assam",
      "Revising current affairs without dates, so two similar events are confused in the exam hall",
      "Ignoring culture and literature because it feels less examinable, when Bihu, Satriya and the major writers are reliably asked",
    ],
    method: [
      "Take Assam's history and culture first. It is the part of this section that the paper weights most heavily.",
      "Build a running one-page timeline of Assam and add to it as you study, rather than memorising separate lists.",
      "Read current affairs a little every week. A single revision pass before the exam does not stick.",
    ],
  },
  "general-knowledge-current-affairs": {
    covers: [
      "This section covers general knowledge outside Assam: Indian history, polity and economy, general science, current affairs, sports and awards, and the static facts that recruitment papers return to every year such as important days, capitals and currencies.",
      "General science here means everyday science at school level - human body, nutrition, plants, common chemical and physical facts - rather than the individual sciences.",
    ],
    skills: [
      "Recalling constitutional articles and bodies by the function they perform",
      "Answering science questions from daily-life reasoning rather than a formula",
      "Pairing countries with capitals and currencies as one unit instead of three separate lists",
    ],
    mistakes: [
      "Confusing the year an award was instituted with the year it was given",
      "Mixing up Indian and international days that fall in the same month",
      "Learning capitals without currencies, when the question asks for both",
    ],
    method: [
      "Cover the static sections first, since they never change and are guaranteed marks.",
      "Keep current affairs to a rolling window and revise the previous six months before the exam.",
      "For polity, learn the article numbers alongside the topic, because the question often asks for the number directly.",
    ],
  },
  "assam-history-geography-culture": {
    covers: [
      "This section brings Assam's history, geography and culture together: the ancient dynasties, the Ahom and Koch period, the Treaty of Yandabo and the arrival of British rule, the role of Assam in the freedom struggle, the state's physical geography and rivers, and its folk and Satriya culture.",
      "The three parts are examined separately but support each other. A question about the Brahmaputra is often a history question in disguise, and a question about Bihu is often a geography question about the agricultural calendar.",
    ],
    skills: [
      "Attaching every dynasty and event to a century, so an unfamiliar question can still be narrowed down",
      "Knowing Assam's rivers, national parks and districts by name and location",
      "Recognising the major cultural forms and the figures associated with them",
    ],
    mistakes: [
      "Placing the Ahom kingdom before or after the Koch kingdom incorrectly",
      "Confusing the Treaty of Yandabo with the later administrative changes it led to",
      "Mixing up the folk dances and the communities they belong to",
    ],
    method: [
      "Read history in chronological order once, then revise topic-wise. Out of order, the dynasties blur together.",
      "Keep a map of Assam beside you while studying geography and mark each river, park and district as you meet it.",
      "For culture, group the forms by occasion - harvest, religious, seasonal - which is how they are usually asked.",
    ],
  },
  "social-studies": {
    covers: [
      "Social Studies in the ADRE Grade IV syllabus covers Indian history, political science and the Constitution, and economy with environment.",
      "The history portion runs from ancient India through the medieval period to the freedom movement. The polity portion covers the Constitution, fundamental rights, the preamble and the working of the central and state governments and panchayati raj. The economy and environment portion covers basic economic concepts, the Indian and Assam economies, and pollution and conservation.",
    ],
    skills: [
      "Matching constitutional provisions to the articles that carry them",
      "Reading an economy question as an arithmetic problem in disguise",
      "Distinguishing the three tiers of government and what each is responsible for",
    ],
    mistakes: [
      "Confusing fundamental rights with directive principles, which are not enforceable in the same way",
      "Learning panchayati raj without the constitutional amendment that introduced it",
      "Answering environment questions from general awareness when a specific term was being asked for",
    ],
    method: [
      "Read the Constitution portion with the text of the preamble and the articles in front of you, not from a summary.",
      "For history, build the timeline before learning the detail. Dates anchor everything else.",
      "Attempt the economy and environment sets after the polity ones, since several questions assume you know how the government is structured.",
    ],
  },
};

const SUB_NOTES = {
  "elementary-mathematics/number-system": {
    focus: "Number system questions ask you to classify and compare numbers rather than calculate with them: natural and whole numbers, integers, rational and irrational numbers, prime and composite numbers, divisibility rules, place value and the number of factors a number has.",
    method: "Learn the divisibility rules for 2, 3, 4, 5, 6, 8, 9 and 11 by heart, because they turn a long division into a two-second check.",
    trap: "The commonest error is treating a recurring decimal such as 0.333... as irrational. It is rational, because it can be written as a fraction.",
  },
  "elementary-mathematics/lcm-hcf": {
    focus: "LCM and HCF questions come in three shapes: finding the two values directly, finding the smallest number that leaves a given remainder when divided by several numbers, and word problems about bells ringing together, tiles fitting a floor or things meeting again after a gap.",
    method: "Factorise into primes for both. HCF is the product of the shared prime factors with the lowest powers, LCM is the product of all prime factors with the highest powers.",
    trap: "In remainder questions, subtract the remainder before taking the LCM. Most wrong answers come from taking the LCM of the numbers as given.",
  },
  "elementary-mathematics/percentage": {
    focus: "Percentage questions cover conversion between fractions, decimals and percentages, percentage increase and decrease, successive percentage changes, and the application of percentage to marks, population, price and income.",
    method: "Convert the percentage to a fraction first. Two-thirds is easier to work with than 66.67 per cent, and the fraction usually cancels.",
    trap: "A rise of 20 per cent followed by a fall of 20 per cent does not return to the starting value. Successive changes multiply, they do not add.",
  },
  "elementary-mathematics/profit-loss": {
    focus: "Profit and loss questions are built on cost price, selling price, marked price and discount. The set covers straightforward profit and loss, profit and loss as a percentage of either price, and problems combining a marked price with a discount and then a profit.",
    method: "Decide first what the percentage is being taken of - cost price, selling price or marked price - and write that down before calculating.",
    trap: "Discount is always on the marked price while profit is always on the cost price. Applying both to the same base is the usual mistake.",
  },
  "elementary-mathematics/ratio-proportion": {
    focus: "Ratio and proportion questions cover simplifying and comparing ratios, dividing a quantity in a given ratio, direct and inverse proportion, and the partnership problems where profit is shared in proportion to capital and time.",
    method: "Convert every ratio to the form a:b with whole numbers before comparing, and use a common multiplier for the parts rather than treating them as absolute values.",
    trap: "In inverse proportion, the product is constant, not the ratio. Applying the direct-proportion method to a work or speed problem gives an answer that looks reasonable but is wrong.",
  },
  "elementary-mathematics/average": {
    focus: "Average questions cover the mean of a set of values, the effect of adding, removing or replacing an item, weighted averages, and the average of consecutive numbers and series.",
    method: "Use the total rather than the average wherever a value is added or removed. Total equals average times count, and the change in total tells you what happened.",
    trap: "When an item is replaced, the change in total is the difference between the new and old item, not the change in the average.",
  },
  "elementary-mathematics/simple-compound-interest": {
    focus: "This set covers simple interest, compound interest compounded annually and half-yearly, the difference between simple and compound interest over two and three years, and problems involving instalments and growth.",
    method: "For compound interest over two years, the total is the principal multiplied by the square of one plus the rate. Over three years, the cube. Learn the shortcut for the two-year difference as well.",
    trap: "Compound interest is not simple interest multiplied by the number of years. Interest in the second year is charged on the first year's interest as well.",
  },
  "elementary-mathematics/time-work": {
    focus: "Time and work questions cover one person or pipe filling or emptying a tank, several working together, work left unfinished when one leaves, and the efficiency-versus-time relationship where a faster worker takes fewer days.",
    method: "Convert every duration into a rate - one over the number of days - and add the rates. Working in rates avoids the fractions that make this topic feel hard.",
    trap: "A person who is twice as efficient takes half the time. Reading efficiency as time, instead of its inverse, inverts the answer.",
  },
  "elementary-mathematics/time-speed-distance": {
    focus: "This set covers speed, time and distance at a constant rate, average speed over two legs, relative speed for trains and boats, and the conversion between kilometres per hour and metres per second.",
    method: "Fix the units before you start. Multiply by five over eighteen to go from kilometres per hour to metres per second, and divide to come back.",
    trap: "Average speed over two equal distances is not the average of the two speeds. It is the total distance divided by the total time, which is the harmonic mean.",
  },
  "elementary-mathematics/simplification-fractions": {
    focus: "Simplification questions test the order of operations, brackets, fractions and decimals, surds, and the recurring simplification patterns that appear unchanged across papers.",
    method: "Follow BODMAS strictly and simplify inside the innermost bracket first, even when a shortcut seems obvious.",
    trap: "Cancelling across a plus sign. A term can only be cancelled against a factor, not against a term being added.",
  },
  "elementary-mathematics/problems-on-ages": {
    focus: "Problems on ages turn a present-age relationship into an equation: father and son, mother and daughter, or a group whose average age is given, with a past or future point attached.",
    method: "Write the present ages as variables and express every past and future age relative to that present, then solve the single equation you get.",
    trap: "Applying the age change to one person only. If two people are four years apart now, they are still four years apart ten years later.",
  },
  "elementary-mathematics/basic-mensuration": {
    focus: "Basic mensuration and geometry at Class 8 and 10 level: perimeter and area of triangles, quadrilaterals, rectangles, squares and circles, plus volume and surface area of the common solids.",
    method: "Write the formula down before substituting, and keep the units consistent throughout. Most mensuration errors are unit errors rather than formula errors.",
    trap: "Confusing perimeter with area, or using the diameter where the formula needs the radius.",
  },
  "general-english/grammar": {
    focus: "The grammar set covers parts of speech, articles and determiners, tenses and their sequence, subject-verb agreement, prepositions, active and passive voice, direct and indirect narration, and degrees of comparison.",
    method: "Check one rule at a time. Read the sentence for agreement first, then tense, then preposition. Trying to judge everything at once is what makes grammar questions feel unreliable.",
    trap: "A sentence that sounds correct can still break a rule. Sound is not evidence in a grammar question.",
  },
  "general-english/vocabulary": {
    focus: "Vocabulary covers synonyms and antonyms, one-word substitution, idioms and phrases, spelling, homophones, and the collective nouns, gender forms and animal sounds that Assam papers ask every year.",
    method: "Group words by meaning rather than by alphabet. Learning four near-synonyms together teaches you the differences between them, which is what the question actually tests.",
    trap: "Choosing a synonym that is close in meaning but wrong in register or collocation. The distractors are built from near-synonyms on purpose.",
  },
  "general-english/fill-in-the-blanks": {
    focus: "Fill in the blanks tests grammar and vocabulary together in a single sentence, usually with a preposition, a verb form, an article or a word that fits the meaning of the whole sentence.",
    method: "Read the whole sentence before looking at the options, then predict what kind of word is missing. Deciding the category first removes most of the distractors.",
    trap: "Filling the blank in isolation. A word that fits the gap grammatically may still break the meaning of the second half of the sentence.",
  },
  "general-english/error-detection": {
    focus: "Error detection gives a sentence divided into parts, one of which contains a grammatical error, or asks whether there is no error at all.",
    method: "Scan the parts in a fixed order: subject and verb agreement, then tense consistency, then articles and prepositions, then pronoun reference.",
    trap: "Choosing the part that reads awkwardly rather than the part that breaks a rule. The error is always a specific rule violation.",
  },
  "general-english/idioms-phrases": {
    focus: "Idioms and phrases questions ask for the meaning of a fixed expression, or ask you to complete a sentence with the idiom that fits.",
    method: "Learn each idiom with one full sentence of context. An idiom learnt as a definition alone is much harder to recognise in a sentence.",
    trap: "Interpreting the idiom literally. That reading is always among the options.",
  },
  "general-english/sentence-rearrangement": {
    focus: "Sentence rearrangement gives a set of jumbled parts and asks for the correct order, or asks which part comes first or last.",
    method: "Find the opening part first. It is usually the one that introduces the subject and can stand alone, and the rest of the order follows from the pronouns and connectives.",
    trap: "Ordering by narrative logic alone. Pronouns such as it and this point back to something already mentioned, and that fixes the order.",
  },
  "general-english/one-word-substitution": {
    focus: "One-word substitution asks for the single word that replaces a phrase: a person who, a place where, a thing that. The set covers the substitutions that recur in Assam recruitment papers.",
    method: "Learn the word and its exact phrase together, and note the suffix patterns such as -phobia, -cide, -logy and -archy, which let you decode an unfamiliar word in the exam.",
    trap: "Choosing a word that means something related but not the same, particularly between the -cide and -vore groups.",
  },
  "logical-reasoning/verbal-reasoning": {
    focus: "Verbal reasoning covers number and alphabet series, analogy, odd one out, coding and decoding, blood relations, direction and distance, ranking and order, mathematical operations, syllogism, Venn diagrams, clocks, calendars and word formation.",
    method: "Identify the question type before solving. Each type has one standard method, and spending ten seconds naming the type saves a minute of trial and error.",
    trap: "Solving a coding question by guessing the shift from the first example. Check the rule against every example given before applying it.",
  },
  "logical-reasoning/non-verbal-reasoning": {
    focus: "Non-verbal reasoning covers figure series, figure analogy and classification, mirror and water images, paper folding and cutting, embedded figures, counting figures, cubes and dice, and pattern completion.",
    method: "Work with a pencil. Rotating and tracing the figure on paper is both faster and less error-prone than holding the shape in your head.",
    trap: "Accepting a mirror image that has been rotated instead of reflected, which looks right at a glance and is the standard distractor.",
  },
  "assam-history-geography-culture/assam-history": {
    focus: "Assam's history runs from ancient Kamarupa and the Varman, Salastambha and Pala dynasties, through the Ahom and Koch kingdoms, the Treaty of Yandabo and the start of British rule, to the state's role in the freedom struggle.",
    method: "Learn it as one timeline and keep the dynasties attached to their centuries. Once the sequence is secure, individual facts have somewhere to sit.",
    trap: "Placing an event in the wrong century. Most history distractors are the right event with the wrong date.",
  },
  "assam-history-geography-culture/assam-geography": {
    focus: "Assam's geography covers the Brahmaputra and Barak river systems, the hills and plains, climate and rainfall, national parks and wildlife sanctuaries, natural resources, and the state's districts and boundaries.",
    method: "Study with a map. Marking each river, park and district as you meet it turns a list of names into a picture you can recall in the exam.",
    trap: "Confusing the north and south banks of the Brahmaputra, which determines which districts a question is asking about.",
  },
  "assam-history-geography-culture/assam-culture": {
    focus: "Assam's culture covers Bihu in its three forms, the Satriya tradition and Srimanta Sankardeva, folk dances and music, festivals, handicrafts and the state's major cultural institutions.",
    method: "Group the cultural forms by occasion - harvest, religious, seasonal - which is how the questions are usually framed.",
    trap: "Mixing up the folk dances and the communities they belong to. Learn each dance with its community and its occasion.",
  },
  "general-knowledge-current-affairs/indian-history-polity-economy": {
    focus: "This set covers Indian history from ancient to modern, the Constitution and how the Union and states are governed, and the basic concepts of the Indian economy including planning, banking and the budget.",
    method: "Learn the constitutional articles alongside the topic, because the question often asks for the article number directly rather than the concept.",
    trap: "Confusing fundamental rights with directive principles. They differ in whether they are enforceable by a court.",
  },
  "general-knowledge-current-affairs/general-science": {
    focus: "General science at school level: the human body and nutrition, plants and animals, common chemical substances and their uses, basic physics of everyday objects, and simple scientific facts about health and disease.",
    method: "Answer from daily-life reasoning where you can. Most general science questions are checking whether a common phenomenon is understood, not whether a formula is remembered.",
    trap: "Applying a half-remembered formula where a simple qualitative answer was being asked for.",
  },
  "general-knowledge-current-affairs/current-affairs": {
    focus: "Current affairs covers national and international events, government schemes and policies, appointments, awards, sports results, and developments in Assam, generally over the eight months before the exam.",
    method: "Keep a running one-page note and add to it weekly. A single revision pass in the last week does not hold.",
    trap: "Learning events without dates or without the office involved, which makes two similar events indistinguishable in the exam.",
  },
  "general-knowledge-current-affairs/sports-awards": {
    focus: "Sports and awards covers major tournaments and their winners, national and international sporting honours, and the civilian and gallantry awards of India with the years they were instituted.",
    method: "Learn each award with three facts at once: what it is given for, who gives it, and its place in the order of precedence.",
    trap: "Confusing the year an award was instituted with the year it was given to a particular person.",
  },
  "general-knowledge-current-affairs/important-days-capitals-currencies": {
    focus: "The static set of the syllabus: important national and international days with their dates, countries with their capitals, and countries with their currencies, including the ones newly changed.",
    method: "Learn the country, capital and currency as one unit. Splitting them into three lists is what makes them hard to recall under pressure.",
    trap: "Answering with a capital that is also a major city of the country but not its official capital.",
  },
  "general-knowledge-assam-gk/assam-history-culture": {
    focus: "Assam's history and culture for ADRE Grade IV: the ancient dynasties, the Ahom and Koch period, the Treaty of Yandabo, the freedom struggle in Assam and its martyrs, Assamese literature, and the folk and Satriya cultural tradition.",
    method: "Build a timeline first and add culture to it as you go, so a literature question and a history question reinforce each other instead of competing for memory.",
    trap: "Attributing an Indian national event to Assam, or the reverse. Keep the two timelines separate in your notes.",
  },
  "general-knowledge-assam-gk/assam-geography": {
    focus: "Assam's geography covers the Brahmaputra and Barak systems, the hills and plains, climate, national parks and sanctuaries, natural resources, and the districts and their headquarters.",
    method: "Study with an outline map and fill it in as you revise. Location questions are answered from the picture, not from the list.",
    trap: "Confusing the two valleys. The Brahmaputra valley and the Barak valley have different districts, and questions use them to separate candidates.",
  },
  "general-knowledge-assam-gk/india-general-knowledge": {
    focus: "General knowledge about India: geography including rivers, mountains and states, national symbols, awards and honours, sports, important days and dates, and the static facts that recruitment papers return to every year.",
    method: "Learn the static facts first, since they never change, and treat current affairs as a separate weekly habit.",
    trap: "Mixing up national days that fall in the same month, which is the most common distractor in this set.",
  },
  "general-knowledge-assam-gk/current-affairs": {
    focus: "Current affairs for the ADRE Grade IV paper covers Assam and national developments, government schemes, appointments and awards over roughly the preceding eight months.",
    method: "Keep a dated one-line note per event as you read the news, and revise the last six months in the final weeks.",
    trap: "Learning the event without the date or the person holding the office, so two similar developments blur together.",
  },
  "social-studies/indian-history": {
    focus: "Indian history from ancient India through the medieval period to modern India and the freedom movement, with the events, dynasties and personalities that recruitment papers ask about most often.",
    method: "Learn the timeline first, then attach the detail to it. History questions are mostly sequencing and attribution, both of which depend on the order being secure.",
    trap: "Confusing the ancient and medieval periods, and so attributing a dynasty or a text to the wrong era.",
  },
  "social-studies/polity-constitution": {
    focus: "Political science and the Constitution: the preamble, fundamental rights and duties, directive principles, the Union and state governments, the judiciary, and panchayati raj with the amendment that introduced it.",
    method: "Read the constitutional provisions with the article numbers beside them rather than from a summary. The question usually asks for the article or the body.",
    trap: "Treating fundamental rights and directive principles as equally enforceable. Only the rights are enforceable in the courts.",
  },
  "social-studies/economy-environment": {
    focus: "Economy and environment covers basic economic concepts, the Indian and Assam economies including agriculture and industry, and environment topics such as pollution, deforestation and conservation.",
    method: "Learn the terms first, then the numbers. Most questions test whether a term is understood rather than whether a figure is remembered.",
    trap: "Answering an environment question from general awareness when a specific term such as a particular pollutant or convention was being asked for.",
  },
};

const EXAM_NOTES = {
  "adre-grade-4": {
    about: [
      "ADRE 3.0 Grade IV is the Assam Direct Recruitment Examination for Grade IV posts, conducted by the State Level Recruitment Commission. The written paper is bilingual, so every question can be read in Assamese or in English.",
      "The syllabus on axomexam is organised exactly as the paper is: Elementary Mathematics, General English, General Knowledge with Assam GK, Logical Reasoning and Mental Ability, and Social Studies.",
    ],
    pattern: [
      "Elementary Mathematics carries the most questions and is entirely arithmetic, so it rewards practice more than reading.",
      "General English and Logical Reasoning together decide most cut-offs, because they are the sections where candidates who have not practised lose marks they could have kept.",
      "General Knowledge and Assam GK is the widest section. Marks here come from coverage of Assam's history, geography and culture plus general awareness of India.",
    ],
    strategy: [
      "Begin with Elementary Mathematics. It is the section where practice produces the most reliable gain in the least time.",
      "Read the Assam GK material alongside current affairs rather than after it. The two reinforce each other.",
      "Attempt full-length practice only once the individual sections are secure. A mock taken too early measures the gaps rather than closing them.",
    ],
  },
  "assam-police": {
    about: [
      "The Assam Police Constable recruitment examination for AB and UB posts is conducted by the State Level Police Recruitment Board. The paper is bilingual and is dominated by reasoning, elementary mathematics and general awareness.",
      "On axomexam the syllabus is laid out as the paper is: Elementary Mathematics, General English, Logical Reasoning and Mental Ability, Assam's History, Geography and Culture, and General Knowledge with Current Affairs.",
    ],
    pattern: [
      "Elementary Mathematics and Logical Reasoning between them carry the largest share of the paper, so they decide most cut-offs.",
      "General English questions are mostly grammar and vocabulary of the kind that repeats across years, which makes that section the easiest to secure.",
      "Assam's history, geography and culture is the section most candidates under-prepare, and it is where the paper separates them.",
    ],
    strategy: [
      "Train reasoning and mathematics together. The two sections share the arithmetic and the habit of working at speed.",
      "Do not leave Assam's history and culture to the end. It is a fixed body of facts and it can be finished well before the exam.",
      "Practise with a timer from the first set. In a constable paper, speed is part of the syllabus.",
    ],
  },
};

const EXAMS_ROOT = {
  about: [
    "axomexam organises its practice material by recruitment examination, then by subject, then by sub-category. Each exam opens into its own set of sections, and every section holds question-wise multiple choice questions with the correct answer and a worked explanation.",
    "All the material is bilingual. Each question, each option and each explanation exists in Assamese and in English, and you can switch language while reading so the same fact is reinforced in both.",
  ],
  usage: [
    "Pick the exam you are preparing for, then the subject you want to revise.",
    "Work through one sub-category at a time and read the explanation for every question you get wrong.",
    "Come back to the same sub-category a few days later. Repetition is what moves a fact from recognition to recall.",
  ],
};

module.exports = { SECTION_NOTES, SUB_NOTES, EXAM_NOTES, EXAMS_ROOT };
