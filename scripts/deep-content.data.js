"use strict";

/*
 * deep-content.data.js
 *
 * Page-specific, high-signal study content for the category pages that were
 * previously thin. Each entry drives two things:
 *
 *   1. the short <title> / meta description for that page, and
 *   2. the rich "seo-deep" block rendered by scripts/build-deep-content.js.
 *
 * The generated block is written into the static HTML with the marker
 * data-axo-deep="1" so that js/app.js preserves it at runtime instead of
 * replacing it with generic boilerplate.
 *
 * Shape:
 *   id: {
 *     title: string,
 *     meta:  string,
 *     lead:  [paragraph, ...],
 *     sections: [ { h, p?: [paragraph], list?: [item] }, ... ],
 *     faqs: [ { q, a }, ... ]
 *   }
 */

module.exports = {
  arithmetic: {
    title: "Arithmetic Questions and Short Tricks for ADRE, APSC and Assam Police | axomexam",
    meta: "Free arithmetic practice for ADRE 2.0, Assam Police, APSC, SSC and Railway exams. Percentage, profit and loss, ratio, average, time and work, SI and CI with bilingual explanations.",
    lead: [
      "Arithmetic is the backbone of the quantitative aptitude section in almost every Assam government recruitment examination. ADRE Grade 3 and Grade 4, Assam Police Constable and Sub-Inspector, APSC CCE, DHS, DME, Gauhati High Court, SSC and Railway papers all test the same core arithmetic chapters, and these questions often decide whether a candidate clears the cut-off.",
      "On axomexam the subject is organised chapter by chapter so that you can build speed and accuracy step by step. Every topic links to a practice set with worked solutions in English and Assamese, so you learn the exact method the examiner expects instead of memorising individual answers."
    ],
    sections: [
      { h: "Why arithmetic decides your mathematics score", p: [
        "Numerical ability usually carries 15 to 25 questions in Assam recruitment papers and arithmetic forms the largest share of that block. The questions are formula-based and repetitive, which means a well-practised candidate can solve them quickly and score reliably. Because the same chapters repeat across state and central exams, one solid round of arithmetic preparation pays off in several tests at the same time."
      ] },
      { h: "Arithmetic chapters covered on axomexam", list: [
        "Number System and Simplification — divisibility rules, HCF, LCM, remainders, surds and fast calculation.",
        "Percentage — increase and decrease, successive change and percentage-based word problems.",
        "Ratio and Proportion — direct and inverse proportion and division of quantities.",
        "Profit, Loss and Discount — cost price, selling price, marked price, successive discounts and dishonest-dealer problems.",
        "Average — simple average, weighted average and average age and speed problems.",
        "Time and Work — efficiency, work and wages and pipes and cisterns.",
        "Time, Speed and Distance — relative speed, problems on trains, boats and streams.",
        "Simple and Compound Interest — instalments, growth and depreciation.",
        "Mensuration — area, perimeter, volume and surface area of standard shapes.",
        "Problems on Ages, Partnership and Mixture and Alligation."
      ] },
      { h: "Most repeated arithmetic chapters in ADRE and Assam Police", p: [
        "Based on past papers, the following chapters appear again and again and deserve extra revision: percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest, and mensuration. If you are short on time, master these eight first."
      ] },
      { h: "How to prepare arithmetic for Assam exams", list: [
        "Learn the formula or short method for a chapter before attempting its questions.",
        "Solve 15 to 20 questions per topic every day and time yourself with a stopwatch.",
        "Keep a formula notebook and revise it for five minutes before each practice session.",
        "Read the explanation for every wrong answer and note the exact reason for the mistake.",
        "Re-attempt the same set after three days and check whether your accuracy has improved.",
        "Take a full timed mock test every week to get used to exam-day pressure."
      ] },
      { h: "Common mistakes to avoid", list: [
        "Rushing through reading and misreading values such as 'less than' and 'more than'.",
        "Skipping the units and mixing percentages with absolute numbers.",
        "Solving every question the long way instead of using short tricks.",
        "Ignoring mensuration because it looks difficult — it is one of the most predictable chapters."
      ] }
    ],
    faqs: [
      { q: "Which arithmetic topics are most important for ADRE 2.0?", a: "Percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest and mensuration carry the highest marks. Practise these before the less frequently asked chapters." },
      { q: "How can I improve my speed in arithmetic calculations?", a: "Use tables up to 20, squares up to 30, and percentage-to-fraction conversions. Practise with a timer and use approximation wherever the options allow it." },
      { q: "Is arithmetic in Assam Police exams difficult?", a: "No. Assam Police arithmetic stays close to the standard patterns. With regular practice and correct basics, most candidates can attempt the entire section comfortably." },
      { q: "Can I practise arithmetic in Assamese on axomexam?", a: "Yes. Questions and explanations are bilingual. You can switch between Assamese and English at any time, so the same concept is reinforced in both languages." },
      { q: "How much time should I give to arithmetic every day?", a: "One to one-and-a-half hours of focused practice is enough for most aspirants. Spend the first 20 minutes on formulas and the rest on timed questions and error review." },
      { q: "Is arithmetic practice on axomexam free?", a: "Yes. Every practice set, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge." }
    ]
  },

  "non-verbal-reasoning": {
    title: "Non-Verbal Reasoning Questions with Answers for ADRE and APSC | axomexam",
    meta: "Practice non-verbal reasoning for ADRE, Assam Police, APSC, SSC and Railway exams. Figure series, mirror and water images, paper folding, embedded figures, figure matrix, cube and dice.",
    lead: [
      "Non-verbal reasoning tests how quickly you can read visual information such as figures, patterns, shapes and spatial arrangements. It does not depend on language or vocabulary, so the marks are decided purely by your powers of observation and practice.",
      "This section appears in ADRE, Assam Police, APSC CCE, SSC, Railway and many other recruitment tests. On axomexam every chapter links to a practice set with clear visual explanations so you can train your eye to spot the rule behind each figure quickly."
    ],
    sections: [
      { h: "What non-verbal reasoning actually tests", p: [
        "Each question shows a sequence or a group of figures and asks you to find the next figure, the odd figure or the hidden figure. The underlying rule may involve rotation, reflection, addition or removal of parts, shading, or movement of elements. Once you identify the rule, the answer follows almost mechanically — which is why this section can become very high-scoring."
      ] },
      { h: "Non-verbal reasoning chapters covered on axomexam", list: [
        "Image Series — find the next figure by tracking rotation, growth and shading.",
        "Image Analogy — apply the same relationship between a pair of figures.",
        "Image Classification — pick the figure that does not fit the group.",
        "Mirror Images — reflect a figure across a vertical mirror line.",
        "Water Images — reflect a figure across a horizontal water line.",
        "Paper Folding and Paper Cutting — visualise the punched pattern after unfolding.",
        "Embedded Figures — locate a smaller figure hidden inside a larger one.",
        "Completion of Incomplete Pattern — identify the missing piece of a design.",
        "Figure Matrix — follow the row and column logic of a matrix of figures.",
        "Counting of Figures — count triangles, squares or straight lines in a complex figure.",
        "Cube and Dice — solve painted-cube, dice-rule and opposite-face problems.",
        "Rule Detection and Shape Construction."
      ] },
      { h: "Non-verbal reasoning preparation strategy", list: [
        "Practise every chapter by drawing the figures yourself; the hand learns the pattern as fast as the eye.",
        "For series questions, check rotation, number of elements, shading and symmetry one by one.",
        "Memorise the dice rule and opposite-face tricks for cube and dice questions.",
        "Solve at least 20 figures a day and note down the rule you missed for each wrong answer.",
        "Use a mirror or folded paper for the first few mirror, water and paper-folding questions.",
        "Attempt figure-based sets in timed blocks to build visual speed."
      ] },
      { h: "Common mistakes to avoid", list: [
        "Guessing the rule from the first two figures instead of checking it against all figures.",
        "Confusing clockwise and anticlockwise rotation.",
        "Losing track of the number of dots, lines or shaded parts.",
        "Rushing through counting-figures questions, which need a systematic point-by-point count."
      ] }
    ],
    faqs: [
      { q: "Is non-verbal reasoning hard to prepare?", a: "No. It rewards consistent practice more than talent. Once you learn the standard rule types, most questions become quick and mechanical." },
      { q: "Which non-verbal topics are most important for ADRE and Assam Police?", a: "Image series, analogy, mirror and water images, paper folding and cutting, embedded figures and counting of figures are asked most frequently." },
      { q: "How do I solve cube and dice questions quickly?", a: "Learn the dice rule for adjacent and opposite faces and the counting rule for painted cubes. With these two methods most questions can be solved in a few seconds." },
      { q: "Can I practise non-verbal reasoning in Assamese?", a: "Yes. The practice sets and explanations are bilingual, so you can read them in Assamese or English and switch whenever you want." },
      { q: "How much daily practice does non-verbal reasoning need?", a: "Twenty to thirty figures a day is enough. Regular short sessions work better than occasional long ones for visual reasoning." },
      { q: "Is non-verbal reasoning practice free on axomexam?", a: "Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription." }
    ]
  },

  "verbal-reasoning": {
    title: "Verbal Reasoning Questions and Practice for ADRE, APSC and Assam Police | axomexam",
    meta: "Free verbal reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Analogy, coding-decoding, blood relations, direction sense, series, syllogism and clock and calendar.",
    lead: [
      "Verbal reasoning checks how well you can find patterns in words, numbers and letters, and how logically you can follow a set of statements. It is one of the most reliable scoring areas in the reasoning section because the patterns repeat year after year.",
      "This page covers the full verbal reasoning syllabus for ADRE, Assam Police, APSC CCE, SSC and Railway exams. Each chapter links to a practice set with step-by-step bilingual explanations so that you understand the logic behind every answer."
    ],
    sections: [
      { h: "Why verbal reasoning is high-scoring", p: [
        "Most verbal reasoning questions follow a fixed set of rules — the same logic that has appeared in previous papers. Coding-decoding, blood relations, direction sense and series in particular can be mastered with a handful of techniques. Once the rules are clear, these questions take little time and rarely go wrong."
      ] },
      { h: "Verbal reasoning chapters covered on axomexam", list: [
        "Analogy — identify the relationship between a given pair of words or numbers.",
        "Classification and Odd One Out — find the item that does not belong to the group.",
        "Number Series, Alphabet Series and Alpha-Numeric Series.",
        "Coding-Decoding — letter, number and symbol based coding rules.",
        "Blood Relations — family trees, generations and coded relationships.",
        "Direction and Distance Test — track movement and find the final direction.",
        "Order and Ranking — arrange people by height, age, marks or position.",
        "Alphabet Test and Word Formation.",
        "Logical Venn Diagrams — decide the correct relationship between sets.",
        "Syllogism — draw valid conclusions from given statements.",
        "Clock and Calendar — angle, hands, odd days and day-of-the-week problems.",
        "Mathematical Operations, Data Sufficiency and Input-Output."
      ] },
      { h: "Verbal reasoning preparation strategy", list: [
        "Learn the standard rule for each chapter, then solve fifty questions of that chapter.",
        "For series, always check difference, ratio, square, cube and alternating patterns in order.",
        "Draw blood-relation and direction questions on paper instead of solving them mentally.",
        "Memorise the Venn diagram combinations and the odd-days table for calendar questions.",
        "Maintain a log of every question where you guessed, and revise it before the exam.",
        "Practise mixed sets so you learn to switch logic quickly under time pressure."
      ] },
      { h: "Common mistakes to avoid", list: [
        "Not reading the question carefully — one changed word can change the whole logic.",
        "Assuming extra information that is not given, especially in syllogism.",
        "Mixing up the direction of movement in direction-sense questions.",
        "Spending too long on one puzzle instead of moving on and returning later."
      ] }
    ],
    faqs: [
      { q: "Which verbal reasoning topics are most important for ADRE?", a: "Coding-decoding, blood relations, direction sense, series, analogy and classification are the most frequently asked topics in ADRE and Assam Police papers." },
      { q: "Is verbal reasoning easier than non-verbal reasoning?", a: "Many candidates find verbal reasoning easier because the rules are clearly defined. Personal strength varies, so practise both and see where you score faster." },
      { q: "How do I solve coding-decoding questions quickly?", a: "Compare the given word with its code and note the shift in positions of letters and numbers. Once the shift is identified, apply it to the new word." },
      { q: "Can I prepare verbal reasoning in Assamese?", a: "Yes. Questions and explanations are available in both Assamese and English, and you can switch languages while reading." },
      { q: "How many reasoning questions should I solve daily?", a: "Fifty to sixty questions across two or three chapters is a healthy daily target, along with a review of every mistake." },
      { q: "Is verbal reasoning practice on axomexam free?", a: "Yes. Every practice set, explanation and PDF note on axomexam.in is completely free, with no login or subscription." }
    ]
  },

  "analytical-critical-reasoning": {
    title: "Analytical and Critical Reasoning Practice for ADRE and APSC | axomexam",
    meta: "Practice analytical and critical reasoning for ADRE, APSC, Assam Police, SSC and Railway. Seating arrangement, puzzles, statement and assumption, conclusion, assertion and reason.",
    lead: [
      "Analytical and critical reasoning measures how well you can organise information and judge arguments. It covers seating arrangements, complex puzzles, coded inequalities, and the statement-based chapters such as assumption, conclusion, argument and course of action.",
      "This is the part of reasoning where careful reading matters more than quick guessing. On axomexam each chapter includes solved examples and practice sets with detailed bilingual explanations so that you can see exactly how a conclusion is derived from the given statements."
    ],
    sections: [
      { h: "What the analytical and critical section demands", p: [
        "Puzzle and arrangement questions test your ability to place people or objects according to a set of conditions. The statement-based chapters test your judgement of what is implied, assumed, strengthened or weakened by a given passage. Both require patience, and both become much easier once you learn to represent information in a simple diagram or table."
      ] },
      { h: "Analytical and critical reasoning chapters covered on axomexam", list: [
        "Seating Arrangement — linear, circular and square arrangements with mixed clues.",
        "Complex Puzzles — floor, box, scheduling, month and category based puzzles.",
        "Inequality — direct and coded inequalities with all possible conclusions.",
        "Statement and Assumptions — identify the implicit assumption behind a statement.",
        "Statement and Conclusions — decide which conclusion logically follows.",
        "Statement and Arguments — judge the strength of arguments for and against.",
        "Statement and Course of Action — choose the most practical response.",
        "Cause and Effect — separate the cause from the effect.",
        "Assertion and Reason — evaluate the link between an assertion and its reason.",
        "Decision Making, Drawing Inferences and Data Sufficiency."
      ] },
      { h: "Analytical and critical reasoning preparation strategy", list: [
        "For arrangements and puzzles, draw the layout and mark fixed positions first, then the uncertain ones.",
        "Learn the standard conclusion rules for inequality and syllogism and apply them mechanically.",
        "For assumption and conclusion questions, separate what is stated from what is only implied.",
        "Practise puzzles of increasing difficulty instead of jumping straight to complex sets.",
        "Review the full solution even when your answer was correct, to confirm the reasoning.",
        "Attempt one full puzzle set under a timer every day to build stamina."
      ] },
      { h: "Common mistakes to avoid", list: [
        "Adding real-world knowledge that is not part of the given passage.",
        "Assuming a conclusion is valid when it is only probably true.",
        "Making a single wrong placement early in a puzzle and then continuing with it.",
        "Spending a large amount of time on one puzzle and losing easy marks elsewhere."
      ] }
    ],
    faqs: [
      { q: "Are puzzles and seating arrangement important for ADRE?", a: "Yes. Analytical reasoning, including seating arrangement and puzzles, carries good weight and also appears in the Assam Police and APSC papers." },
      { q: "How do I improve in statement and conclusion questions?", a: "Decide clearly what the statement guarantees. A conclusion that needs extra information beyond the statement is not valid." },
      { q: "What is the difference between assumption and conclusion?", a: "An assumption is an unstated idea the speaker takes for granted, while a conclusion is the logical result that follows from the given information." },
      { q: "How much time should I spend on one puzzle?", a: "If a puzzle is not opening up within about a minute and a half, mark the possibilities and move on. Return to it after finishing the easier questions." },
      { q: "Can I practise analytical reasoning in Assamese?", a: "Yes. All practice sets and explanations are bilingual, so you can study in Assamese or English as you prefer." },
      { q: "Is analytical reasoning practice free on axomexam?", a: "Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription." }
    ]
  },

  science: {
    title: "General Science Questions for ADRE, Assam Police and SSC | axomexam",
    meta: "Free general science practice for ADRE, Assam Police, APSC, SSC and Railway. Physics, Chemistry and Biology questions at Class 6 to 10 level with bilingual explanations.",
    lead: [
      "General Science is one of the most predictable sections in Assam government recruitment exams. The questions come from Physics, Chemistry and Biology at roughly the Class 6 to 10 level, so a candidate who has revised the school textbooks carefully can score very well.",
      "On axomexam the subject is divided into Physics, Chemistry and Biology, each with chapter-wise practice sets and explanations. The focus is on everyday science, definitions, units, simple applications and the health and environment facts that examiners repeat most often."
    ],
    sections: [
      { h: "Which science questions are asked", p: [
        "Questions usually test basic definitions, units of measurement, common chemical formulae, parts and functions of the human body, plant and animal classification, and everyday applications of physics and chemistry. Direct memory questions and simple numericals from physics make up a large part of the paper."
      ] },
      { h: "Science chapters covered on axomexam", list: [
        "Physics — motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and basic modern physics.",
        "Chemistry — matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry.",
        "Biology — the human body and its systems, nutrition and health, plants, cell biology, genetics, ecology and the environment."
      ] },
      { h: "Most repeated science topics in Assam exams", list: [
        "Units and measurements of physical quantities.",
        "Human body systems, especially the digestive, circulatory and nervous systems.",
        "Vitamins, their sources and deficiency diseases.",
        "Common chemical formulae and everyday chemical reactions.",
        "Scientific names, plant and animal classification.",
        "Environment, pollution and ecological terms."
      ] },
      { h: "General science preparation strategy", list: [
        "Revise one chapter from the NCERT or standard textbook, then attempt its practice set immediately.",
        "Make short notes of definitions, units and formulae — these are asked directly.",
        "Memorise common abbreviations, vitamins and deficiency diseases in table form.",
        "Practise physics numericals separately, since they need formula application.",
        "Revise the diagrams of important systems and experiments.",
        "Attempt a mixed science set every week to check retention."
      ] },
      { h: "Common mistakes to avoid", list: [
        "Skipping Biology as 'easy' and losing direct-mark questions.",
        "Confusing units and symbols of similar physical quantities.",
        "Studying from too many sources instead of mastering one standard textbook.",
        "Ignoring everyday-science questions that are based on daily-life observations."
      ] }
    ],
    faqs: [
      { q: "What is the standard of science questions in ADRE and Assam Police?", a: "Most questions are at the Class 6 to 10 level. A careful revision of school textbooks covers the vast majority of the syllabus." },
      { q: "Which science subject is most important for Assam exams?", a: "All three carry weight, but Biology and everyday science appear most frequently, followed by Physics and Chemistry." },
      { q: "Do I need to memorise formulas for general science?", a: "Only a limited set — mainly units, simple physics formulae and common chemical equations. Most questions are direct and factual." },
      { q: "Can I study general science in Assamese?", a: "Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English." },
      { q: "How should I revise science before the exam?", a: "Use short notes and tables for facts, units and formulae, and solve past-paper questions to see which facts repeat." },
      { q: "Is general science practice free on axomexam?", a: "Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription." }
    ]
  },

  english: {
    title: "General English Grammar and Vocabulary for ADRE, Assam Police | axomexam",
    meta: "Practice general English for ADRE, Assam Police, APSC, SSC and Railway. Grammar, parts of speech, sentence structure, vocabulary, synonyms, antonyms, idioms and error spotting.",
    lead: [
      "General English is a steady, low-risk scoring section in ADRE, Assam Police, APSC, SSC and Railway exams. It tests grammar, vocabulary and comprehension, and the syllabus is limited — which means regular revision quickly translates into marks.",
      "On axomexam the subject is organised into grammar, parts of speech, sentence structure and vocabulary, with practice questions and clear explanations. The goal is to help you recognise the same rule in an exam question, even when it is worded differently."
    ],
    sections: [
      { h: "What general English tests", p: [
        "The section checks whether you can identify correct grammar in use, choose the right word for a blank, spot an error in a sentence, and understand the meaning of words and phrases. Direct questions on synonyms, antonyms, one-word substitution and idioms are common."
      ] },
      { h: "English chapters covered on axomexam", list: [
        "Grammar — tenses, articles, subject-verb agreement, active and passive voice, and direct and indirect speech.",
        "Parts of Speech — nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections.",
        "Sentence Structure — sentence types, phrases and clauses, sentence correction and paragraph ordering.",
        "Vocabulary — synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling."
      ] },
      { h: "Most repeated English topics", list: [
        "Subject-verb agreement and common error spotting.",
        "Tenses and their correct usage.",
        "Prepositions and articles.",
        "Synonyms, antonyms and one-word substitutions.",
        "Idioms and phrases with their meanings.",
        "Fill in the blanks and cloze tests."
      ] },
      { h: "General English preparation strategy", list: [
        "Revise one grammar rule at a time and then solve twenty questions on it.",
        "Read one short passage daily and note unfamiliar words with their meanings.",
        "Learn five new words, five synonyms and three idioms every day.",
        "Practise error-spotting by reading a sentence as a whole before choosing an option.",
        "Revise the rules of articles, prepositions and subject-verb agreement most often.",
        "Attempt a full English set weekly to track your accuracy."
      ] },
      { h: "Common mistakes to avoid", list: [
        "Choosing an option because it 'sounds correct' instead of applying the rule.",
        "Ignoring articles and prepositions, which are asked every year.",
        "Learning words without usage or example sentences.",
        "Reading the entire comprehension passage before looking at the questions."
      ] }
    ],
    faqs: [
      { q: "Is general English easy to score in ADRE?", a: "Yes. The syllabus is limited and rule-based, so with steady revision most candidates can score well above average in this section." },
      { q: "Which grammar topics are most important?", a: "Tenses, subject-verb agreement, articles, prepositions, active and passive voice and direct and indirect speech are asked most often." },
      { q: "How can I improve my vocabulary quickly?", a: "Learn words in small daily sets with their usage, and revise synonyms, antonyms, one-word substitutions and idioms regularly." },
      { q: "Can I study English in Assamese on axomexam?", a: "The explanations are bilingual so that the rule is clear in both languages, and the questions follow the English exam pattern." },
      { q: "Is comprehension asked in these exams?", a: "Yes, many papers include a short reading-comprehension passage along with the direct grammar and vocabulary questions." },
      { q: "Is general English practice free on axomexam?", a: "Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription." }
    ]
  },

  articles: {
    title: "Study Articles and Notes for Assam Competitive Exams | axomexam",
    meta: "Read free high-quality study articles for ADRE, APSC, Assam Police, SSC and Railway exams. Long-form notes on general knowledge, mathematics, science, reasoning, English and computers.",
    lead: [
      "Axomexam articles are long-form study pieces that explain a topic in depth and in simple language. They are written to build conceptual clarity before you attempt questions, which makes them ideal for beginning a new topic or revising one that keeps going wrong.",
      "The collection spans general knowledge, mathematics, general science, reasoning ability, general English and computer awareness, so there is a suitable article whether you are strengthening a weak area or looking for a quick revision of a familiar one."
    ],
    sections: [
      { h: "How to use the articles section", p: [
        "Read the article once to understand the concept, then attempt the related practice set. Articles are deliberately kept simple and example-driven so that the idea stays with you when you face a similar question in the exam."
      ] },
      { h: "Article categories available", list: [
        "General Knowledge — Assam history, literature, geography, polity, economy and art and culture.",
        "Mathematics — arithmetic, advanced math and data interpretation concepts explained step by step.",
        "General Science — physics, chemistry and biology topics in everyday language.",
        "Reasoning Ability — verbal, non-verbal and analytical reasoning techniques.",
        "General English — grammar rules, vocabulary building and common error patterns.",
        "Computer Awareness — fundamentals, software, MS Office, networking and cyber security."
      ] },
      { h: "How articles help your exam preparation", list: [
        "They explain the 'why' behind a rule, which helps you apply it to new questions.",
        "They are ideal revision material in the final weeks before the exam.",
        "They connect theory with solved examples from previous papers.",
        "They build the reading habit needed for comprehension and general awareness."
      ] },
      { h: "Tips to get the most from study articles", list: [
        "Read with a pen and note down key points and formulas.",
        "Attempt the linked practice set immediately after reading.",
        "Revisit the article after a week to test your retention.",
        "Use the bilingual view to strengthen terminology in both English and Assamese."
      ] }
    ],
    faqs: [
      { q: "What kind of articles are published on axomexam?", a: "Long-form, easy-reading study pieces on general knowledge, mathematics, science, reasoning, English and computer awareness, written for Assam competitive exams." },
      { q: "Are the articles useful for ADRE and APSC?", a: "Yes. The articles cover the concepts and facts that appear in ADRE, APSC CCE, Assam Police, SSC and Railway papers." },
      { q: "Should I read articles before or after practice questions?", a: "Read the article first to understand the concept, then attempt the linked practice set and review your mistakes." },
      { q: "Are the articles available in Assamese?", a: "The content is designed to support both Assamese and English readers, and the key terms are explained in both languages." },
      { q: "How often are new articles added?", a: "New articles are added regularly, so check the page again as you progress through your syllabus." },
      { q: "Is the articles section free to use?", a: "Yes. Every article and study resource on axomexam.in is completely free with no login or subscription." }
    ]
  },

  math: {
    title: "Mathematics for ADRE, APSC and Assam Police Exams | axomexam",
    meta: "Free mathematics practice for ADRE, Assam Police, APSC, SSC and Railway. Arithmetic, advanced math, statistics and data interpretation with bilingual step-by-step solutions.",
    lead: [
      "Mathematics, or quantitative aptitude, is one of the highest-scoring areas in ADRE, Assam Police, APSC, SSC and Railway exams. The subject rewards practice: the more patterns you have seen, the faster and more accurately you solve on exam day.",
      "On axomexam mathematics is divided into arithmetic, advanced math, and statistics and data interpretation. Each section builds from the basics to exam-level questions so that you can strengthen one area at a time."
    ],
    sections: [
      { h: "Why mathematics matters in Assam exams", p: [
        "Numerical ability carries a large number of questions and is usually the section where well-prepared candidates pull ahead. Because the concepts are fixed and the patterns repeat, mathematics gives a better return on preparation time than most other subjects."
      ] },
      { h: "Mathematics sections covered on axomexam", list: [
        "Arithmetic — number system, percentage, ratio, profit and loss, average, time and work, time and distance, and simple and compound interest.",
        "Advanced Math — algebra, geometry, trigonometry, number systems and higher-level problem solving.",
        "Statistics and Data Interpretation — averages, tables, bar charts, pie charts and line graphs."
      ] },
      { h: "Mathematics preparation strategy", list: [
        "Master the basics of a chapter before moving to its advanced questions.",
        "Learn and apply short tricks instead of solving every question the long way.",
        "Practise with a timer to build the speed the exam demands.",
        "Keep a formula notebook and revise it regularly.",
        "Analyse every wrong answer to find whether the mistake was conceptual or careless.",
        "Take a full maths mock test every week and track your accuracy."
      ] },
      { h: "Common mistakes to avoid", list: [
        "Attempting advanced questions without clear basics.",
        "Ignoring data interpretation, which offers easy marks for careful readers.",
        "Making calculation errors under time pressure because of skipped approximation practice.",
        "Not practising enough variety of question types."
      ] }
    ],
    faqs: [
      { q: "Which mathematics topics are most important for ADRE?", a: "Arithmetic forms the core, especially percentage, ratio, average, profit and loss, time and work and time–speed–distance. Advanced math and data interpretation add the remaining marks." },
      { q: "Is advanced math needed for Assam Police and ADRE?", a: "Basic algebra and geometry are useful, while the emphasis stays on arithmetic. APSC and technical posts need a stronger grip on advanced math." },
      { q: "How can I increase my calculation speed?", a: "Memorise tables, squares, cubes and percentage-to-fraction values, and practise approximation techniques with timed sets." },
      { q: "How much time should I spend on mathematics daily?", a: "One to one-and-a-half hours of focused practice per day is enough when combined with regular error review and weekly mock tests." },
      { q: "Can I practise mathematics in Assamese?", a: "Yes. All practice sets and step-by-step explanations are bilingual and can be read in Assamese or English." },
      { q: "Is mathematics practice free on axomexam?", a: "Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription." }
    ]
  },

  reasoning: {
    title: "Reasoning Ability Questions for ADRE, APSC and Assam Police | axomexam",
    meta: "Free reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Verbal, non-verbal and analytical reasoning with step-by-step bilingual explanations and timed sets.",
    lead: [
      "Reasoning ability tests logical and analytical thinking rather than memorised facts. It is divided into verbal reasoning, non-verbal reasoning and analytical and critical reasoning, and together they form a scoring section in ADRE, Assam Police, APSC, SSC and Railway exams.",
      "Because speed and accuracy decide the score in reasoning, timed practice is essential. On axomexam each of the three branches has chapter-wise sets followed by detailed explanations, so you can train both the logic and the pace."
    ],
    sections: [
      { h: "Why reasoning is a high-scoring section", p: [
        "Reasoning questions follow fixed patterns that repeat across papers. Once a candidate learns the standard rules for series, coding, arrangements and statement-based questions, the section becomes fast and dependable. It also requires no additional study material beyond regular practice."
      ] },
      { h: "Reasoning branches covered on axomexam", list: [
        "Verbal Reasoning — analogy, classification, series, coding-decoding, blood relations, direction sense, ranking, syllogism and clock and calendar.",
        "Non-Verbal Reasoning — figure series, mirror and water images, paper folding and cutting, embedded figures, figure matrix, counting of figures and cube and dice.",
        "Analytical and Critical Reasoning — seating arrangement, puzzles, inequality, and statement-based chapters such as assumption, conclusion, argument and course of action."
      ] },
      { h: "Reasoning preparation strategy", list: [
        "Learn the rule for a chapter, then solve a set of at least twenty questions on it.",
        "Draw diagrams for arrangements, blood relations and directions instead of solving mentally.",
        "Practise mixed sets to get used to switching logic quickly.",
        "Time every set so that speed improves along with accuracy.",
        "Review wrong answers immediately and note the rule you missed.",
        "Attempt a full reasoning mock test every week."
      ] },
      { h: "Common mistakes to avoid", list: [
        "Guessing the logic instead of checking it against every part of the question.",
        "Getting stuck on a single puzzle while easier questions wait.",
        "Ignoring non-verbal reasoning because it looks unfamiliar.",
        "Not practising enough variety, so unfamiliar patterns feel difficult in the exam."
      ] }
    ],
    faqs: [
      { q: "How many reasoning questions come in ADRE and Assam Police?", a: "The reasoning section usually carries between 15 and 25 questions depending on the post and paper." },
      { q: "Which reasoning branch is most important?", a: "All three are asked, but verbal and analytical reasoning usually carry more questions than non-verbal reasoning." },
      { q: "How can I improve reasoning speed?", a: "Learn the standard rules and then practise timed sets. Drawing diagrams for arrangements and puzzles also saves a lot of time." },
      { q: "Is reasoning difficult for beginners?", a: "No. It is one of the most practice-friendly sections. With consistent daily practice, beginners improve quickly." },
      { q: "Can I prepare reasoning in Assamese?", a: "Yes. Questions and explanations are bilingual and you can switch between Assamese and English while reading." },
      { q: "Is reasoning practice free on axomexam?", a: "Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription." }
    ]
  },

  computer: {
    title: "Computer Awareness Questions for ADRE, Assam Police and APSC | axomexam",
    meta: "Free computer awareness practice for ADRE, Assam Police, APSC, SSC and Railway. Fundamentals, hardware, software, MS Office, networking, cyber security, DBMS and number system.",
    lead: [
      "Computer awareness is one of the quickest sections to prepare and score in ADRE, Assam Police, APSC, DHS, DME, Gauhati High Court and other state recruitment exams. Most questions are direct and factual, so a short, focused revision can secure almost full marks.",
      "On axomexam the subject is divided into fundamentals and hardware, software and operating systems, MS Office, networking and the internet, cyber security, and DBMS with number system and shortcuts. Each chapter links to a practice set with clear explanations."
    ],
    sections: [
      { h: "What computer awareness covers", p: [
        "The syllabus begins with the basics of computers, their generations, input and output devices and memory, and then moves to software, operating systems and application packages. Networking and the internet, cyber security and database concepts complete the section."
      ] },
      { h: "Computer chapters covered on axomexam", list: [
        "Computer Fundamentals and Hardware — generations, input and output devices, memory, storage and the CPU.",
        "Software and Operating System — types of software, functions of an operating system, file management and common Windows and Linux features.",
        "MS Office Suite — Word, Excel and PowerPoint, including menu options, shortcuts and formulas.",
        "Networking and Internet — network types and topologies, IP addresses, protocols, browsers, email and internet services.",
        "Cyber Security — viruses, malware, phishing, hacking, passwords, encryption and safe internet practices.",
        "DBMS, Number System and Shortcuts — database basics, number system conversions and keyboard shortcuts."
      ] },
      { h: "Most repeated computer topics in Assam exams", list: [
        "Generations of computers and their characteristics.",
        "Input, output and storage devices with examples.",
        "Keyboard shortcuts for common operations.",
        "Basic MS Word and MS Excel functions and formulas.",
        "Full forms of common computer abbreviations.",
        "Types of computer viruses and cyber safety tips."
      ] },
      { h: "Computer awareness preparation strategy", list: [
        "Make a one-page list of full forms and abbreviations and revise it daily.",
        "Learn the keyboard shortcuts by actually using them on a computer.",
        "Prepare a small table of input, output and storage devices.",
        "Practise basic Excel formulas and Word menu options.",
        "Revise number system conversions with a few examples each.",
        "Attempt a chapter-wise set after studying each topic."
      ] },
      { h: "Common mistakes to avoid", list: [
        "Ignoring the topic because it seems easy, and then forgetting the full forms.",
        "Mixing up similar terms such as RAM and ROM, or hardware and software.",
        "Not practising shortcuts, which are asked directly every year.",
        "Studying advanced topics while the basics remain unclear."
      ] }
    ],
    faqs: [
      { q: "Is computer awareness asked in ADRE and Assam Police?", a: "Yes. It is part of the general awareness section and is one of the easiest areas to score in, because most questions are direct and factual." },
      { q: "How much time is needed to prepare computer awareness?", a: "A focused revision of one or two weeks is usually enough, since the syllabus is small and mostly factual." },
      { q: "Which computer topics are most important?", a: "Fundamentals, hardware and software differences, MS Office shortcuts and formulas, networking basics and cyber security are asked most often." },
      { q: "Do I need a computer to prepare this section?", a: "A computer helps for shortcuts and MS Office, but the theory can be prepared from notes and practice questions on any device." },
      { q: "Can I study computer awareness in Assamese?", a: "Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English." },
      { q: "Is computer awareness practice free on axomexam?", a: "Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription." }
    ]
  }
};
