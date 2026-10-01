(()=>{"use strict";const p={categories:[],topicMap:{},topicIndex:[],ready:!1,page:0,lang:"as",uiLang:"en",mock:null,isGeneratingPdf:!1,mockSetCache:{},exams:null,examQuestionTotal:0,examTotalLoaded:!1,examTotalPromise:null,counts:null,caCounts:null,caQuestionTotal:0,caTotalPromise:null,searchCorpusReady:!1},We=20,Ht=5,Ve=6e3,f=(e,t=document)=>t.querySelector(e),M=(e,t=document)=>Array.from(t.querySelectorAll(e));let ue=null,he=null,me=null;function fe(e){return new Promise((t,a)=>{const n=document.createElement("script");n.src=e,n.async=!0,n.onload=()=>t(),n.onerror=()=>a(new Error("Failed to load "+e)),document.head.appendChild(n)})}function Rt(e,t){if(document.getElementById(e))return;const a=document.createElement("link");a.id=e,a.rel="stylesheet",a.href=t,document.head.appendChild(a)}function Dt(){return typeof window.renderMathInElement=="function"?Promise.resolve():(me||(Rt("katex-css","https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"),me=fe("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js").then(()=>fe("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js")).catch(e=>{throw me=null,e})),me)}function Ke(){return window.html2canvas?Promise.resolve():(he||(he=fe("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js").catch(e=>{throw he=null,e})),he)}function Bt(){return window.jspdf&&window.html2canvas?Promise.resolve():(ue||(ue=(async()=>{window.html2canvas||await Ke(),window.jspdf||await fe("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js")})().catch(e=>{throw ue=null,e})),ue)}const Gn=`
    <svg width="152" height="30" viewBox="0 0 152 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
      <defs>
        <linearGradient id="gradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="30" height="30" rx="8" fill="url(#gradLogo)"/>
      <text x="15" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">A</text>
      <text x="38" y="21" fill="currentColor" style="color:var(--ink, #0f172a);" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="-0.4">axomexam<tspan fill="#3b82f6">.in</tspan></text>
    </svg>
  `,Je=`
    <svg width="146" height="28" viewBox="0 0 146 28" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
      <defs>
        <linearGradient id="gradLogoPdf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="7" fill="url(#gradLogoPdf)"/>
      <text x="14" y="19.5" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" text-anchor="middle">A</text>
      <text x="36" y="19.5" fill="#0f172a" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="15" letter-spacing="-0.3">axomexam<tspan fill="#2563eb">.in</tspan></text>
    </svg>
  `;function r(e){if(typeof I18N<"u"){const t=I18N[p.uiLang]||I18N.en||I18N.as;if(t&&t[e])return t[e];if(I18N.en&&I18N.en[e])return I18N.en[e]}return e}function b(e){if(e==null)return"";if(typeof e=="string")return e;const t=p.uiLang||"en";return e[t]||e.en||e.as||""}const Ot={gk:"General Knowledge carries a large weight in almost every Assam recruitment examination. It combines Assam-specific history, literature, geography, art and culture with Indian polity, history, geography and economics. Because the section is factual and predictable, consistent revision usually converts into a high, reliable score in ADRE, Assam Police and APSC papers.","assam-history":"Assam History covers the ancient Kamarupa kingdom and its rulers, the medieval Ahom and Koch dynasties, the Burmese invasions and the Treaty of Yandabo, and the colonial and freedom-struggle period. Questions generally test dynasties, capitals, battles, treaties and administrative reforms.","assam-literature":"Assam Literature spans the pre-Vaishnavite period, Sankaradeva and the Vaishnavite age, the Ahom-era chronicles, and the modern era from Arunodoi to Jonaki. Aspirants are asked about authors, works, literary movements and major awards.","indian-history":"Indian History covers ancient civilisations, the Mauryas and Guptas, medieval Sultanates and the Mughals, and the modern freedom movement. Questions focus on timelines, personalities, administrative systems and landmark events.",polity:"Political Science covers the Indian Constitution, fundamental rights and duties, the Union and State machinery, panchayati raj, and Assam-specific provisions such as the Sixth Schedule and Article 371B. It is a high-scoring, factual section.",geography:"Geography covers physical, economic and social geography with dedicated blocks on the rivers, hills, climate and resources of Assam, alongside Indian and world geography. Map-based and location questions are common.",economics:"Economics covers basic economic concepts, Indian economic policy and planning, budgeting and banking, along with the agriculture and industry of Assam. Questions are mostly conceptual and current-affairs linked.","art-culture":"Art and Culture covers the festivals, dance, music, crafts, temples and heritage of Assam and India. Questions test classical dances, musical instruments, festivals, monuments and folk traditions.",math:"Mathematics tests numerical ability and quantitative aptitude and is one of the biggest scoring areas in ADRE, Assam Police, SSC and Railway tests. It brings together arithmetic, advanced math and statistics with data interpretation.",arithmetic:"Arithmetic covers percentages, profit and loss, ratio and proportion, averages, time-speed-distance, time and work, simple and compound interest, and mensuration. These topics carry the largest number of questions in state recruitment papers.","advanced-math":"Advanced Math covers algebra, geometry, trigonometry, number systems and higher-level problem solving. It is especially useful for APSC, SSC and technical posts.","statistics-and-data-interpretation":"Statistics and Data Interpretation covers averages, measures of central tendency, tables, bar and pie charts, and line graphs. The focus is on fast calculation and reading data accurately.",science:"General Science covers Physics, Chemistry and Biology at a Class 6 to 10 level, which is the standard followed by Assam government recruitment tests. Questions test everyday science, definitions, units and simple applications.",physics:"Physics covers motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and the basics of modern physics. Units, definitions and simple numericals are frequently asked.",chemistry:"Chemistry covers matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry. Chemical formulae and common reactions are important.",biology:"Biology covers the human body and its systems, nutrition and health, plants, cell biology, ecology and the environment. Health and disease questions are common in Assam Police and ADRE tests.",reasoning:"Reasoning Ability tests logical and analytical thinking through verbal, non-verbal and critical reasoning questions. Because speed and accuracy decide the score, timed practice is essential.","verbal-reasoning":"Verbal Reasoning covers series, coding-decoding, blood relations, direction sense, analogy and classification. Most questions become quick to solve with regular practice.","analytical-critical-reasoning":"Analytical and Critical Reasoning covers statements and conclusions, assumptions, syllogism, seating arrangement and puzzles. It rewards careful reading over guesswork.","non-verbal-reasoning":"Non-Verbal Reasoning covers figure series, mirror and water images, paper folding, embedded figures and pattern completion. Spatial visualisation is the main skill tested.",english:"General English tests grammar, vocabulary, sentence structure and comprehension. It appears in ADRE, Assam Police, SSC and Railway exams and is relatively easy to score with steady revision.","parts-of-speech":"Parts of Speech covers nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections, and how each of them functions inside a sentence.",grammar:"Grammar covers tenses, articles, subject-verb agreement, active and passive voice, direct and indirect speech, and common error spotting.","sentence-structure":"Sentence Structure covers sentence types, phrases and clauses, sentence correction, and paragraph organisation and ordering.",vocabulary:"Vocabulary covers synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling. Regular reading and short word lists help the most.",computer:"Computer Awareness tests the fundamentals of computers, software and operating systems, MS Office, networking and the internet, cyber security, DBMS and number systems. It is a quick-scoring section in ADRE and other state tests.","fundamentals-hardware":"Computer Fundamentals and Hardware covers input and output devices, memory, storage, the CPU and the generations of computers.","software-os":"Software and Operating Systems covers types of software, the functions of an operating system, file management, and common Windows and Linux features.","ms-office-suite":"MS Office Suite covers Microsoft Word, Excel and PowerPoint, including commonly used menu options, shortcuts and formulas.","networking-internet":"Networking and Internet covers network types and topologies, IP addresses, protocols such as HTTP and FTP, browsers, email and internet services.","cyber-security":"Cyber Security covers online threats such as viruses, malware, phishing and hacking, along with passwords, encryption and safe internet practices.","dbms-number-shortcuts":"DBMS, Number System and Shortcuts covers database basics, number system conversions, and keyboard shortcuts with their common uses.",articles:"Articles are long-form, easy-reading study pieces that explain a topic in depth and in simple bilingual language, so you can build conceptual clarity before attempting questions.","assam-police":"Assam Police previous year papers help you understand the actual question pattern, difficulty level and frequently repeated topics for Sub-Inspector and Constable recruitment conducted by SLPRB.","dhs-dme":"DHS and DME previous year papers cover the question patterns for Directorate of Health Services and Directorate of Medical Education recruitment in Assam.","guwahati-hc":"Guwahati High Court previous year papers cover the pattern for Grade III, Grade IV, Junior Assistant (JAA) and related recruitment under the High Court of Assam.",railway:"Railway previous year papers cover NTPB, Group D, ALP and related central railway recruitment patterns, including the computer-based test structure.",ssc:"SSC previous year papers cover CGL, CHSL, MTS and related central government recruitment patterns, useful for candidates preparing for both central and state posts."},Ft={arithmetic:{title:"Arithmetic Questions and Short Tricks for ADRE, APSC and Assam Police | axomexam",meta:"Free arithmetic practice for ADRE 2.0, Assam Police, APSC, SSC and Railway exams. Percentage, profit and loss, ratio, average, time and work, SI and CI with bilingual explanations.",lead:["Arithmetic is the backbone of the quantitative aptitude section in almost every Assam government recruitment examination. ADRE Grade 3 and Grade 4, Assam Police Constable and Sub-Inspector, APSC CCE, DHS, DME, Gauhati High Court, SSC and Railway papers all test the same core arithmetic chapters, and these questions often decide whether a candidate clears the cut-off.","On axomexam the subject is organised chapter by chapter so that you can build speed and accuracy step by step. Every topic links to a practice set with worked solutions in English and Assamese, so you learn the exact method the examiner expects instead of memorising individual answers."],sections:[{h:"Why arithmetic decides your mathematics score",p:["Numerical ability usually carries 15 to 25 questions in Assam recruitment papers and arithmetic forms the largest share of that block. The questions are formula-based and repetitive, which means a well-practised candidate can solve them quickly and score reliably. Because the same chapters repeat across state and central exams, one solid round of arithmetic preparation pays off in several tests at the same time."]},{h:"Arithmetic chapters covered on axomexam",list:["Number System and Simplification — divisibility rules, HCF, LCM, remainders, surds and fast calculation.","Percentage — increase and decrease, successive change and percentage-based word problems.","Ratio and Proportion — direct and inverse proportion and division of quantities.","Profit, Loss and Discount — cost price, selling price, marked price, successive discounts and dishonest-dealer problems.","Average — simple average, weighted average and average age and speed problems.","Time and Work — efficiency, work and wages and pipes and cisterns.","Time, Speed and Distance — relative speed, problems on trains, boats and streams.","Simple and Compound Interest — instalments, growth and depreciation.","Mensuration — area, perimeter, volume and surface area of standard shapes.","Problems on Ages, Partnership and Mixture and Alligation."]},{h:"Most repeated arithmetic chapters in ADRE and Assam Police",p:["Based on past papers, the following chapters appear again and again and deserve extra revision: percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest, and mensuration. If you are short on time, master these eight first."]},{h:"How to prepare arithmetic for Assam exams",list:["Learn the formula or short method for a chapter before attempting its questions.","Solve 15 to 20 questions per topic every day and time yourself with a stopwatch.","Keep a formula notebook and revise it for five minutes before each practice session.","Read the explanation for every wrong answer and note the exact reason for the mistake.","Re-attempt the same set after three days and check whether your accuracy has improved.","Take a full timed mock test every week to get used to exam-day pressure."]},{h:"Common mistakes to avoid",list:["Rushing through reading and misreading values such as 'less than' and 'more than'.","Skipping the units and mixing percentages with absolute numbers.","Solving every question the long way instead of using short tricks.","Ignoring mensuration because it looks difficult — it is one of the most predictable chapters."]}],faqs:[{q:"Which arithmetic topics are most important for ADRE 2.0?",a:"Percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest and mensuration carry the highest marks. Practise these before the less frequently asked chapters."},{q:"How can I improve my speed in arithmetic calculations?",a:"Use tables up to 20, squares up to 30, and percentage-to-fraction conversions. Practise with a timer and use approximation wherever the options allow it."},{q:"Is arithmetic in Assam Police exams difficult?",a:"No. Assam Police arithmetic stays close to the standard patterns. With regular practice and correct basics, most candidates can attempt the entire section comfortably."},{q:"Can I practise arithmetic in Assamese on axomexam?",a:"Yes. Questions and explanations are bilingual. You can switch between Assamese and English at any time, so the same concept is reinforced in both languages."},{q:"How much time should I give to arithmetic every day?",a:"One to one-and-a-half hours of focused practice is enough for most aspirants. Spend the first 20 minutes on formulas and the rest on timed questions and error review."},{q:"Is arithmetic practice on axomexam free?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge."}]},"non-verbal-reasoning":{title:"Non-Verbal Reasoning Questions with Answers for ADRE and APSC | axomexam",meta:"Practice non-verbal reasoning for ADRE, Assam Police, APSC, SSC and Railway exams. Figure series, mirror and water images, paper folding, embedded figures, figure matrix, cube and dice.",lead:["Non-verbal reasoning tests how quickly you can read visual information such as figures, patterns, shapes and spatial arrangements. It does not depend on language or vocabulary, so the marks are decided purely by your powers of observation and practice.","This section appears in ADRE, Assam Police, APSC CCE, SSC, Railway and many other recruitment tests. On axomexam every chapter links to a practice set with clear visual explanations so you can train your eye to spot the rule behind each figure quickly."],sections:[{h:"What non-verbal reasoning actually tests",p:["Each question shows a sequence or a group of figures and asks you to find the next figure, the odd figure or the hidden figure. The underlying rule may involve rotation, reflection, addition or removal of parts, shading, or movement of elements. Once you identify the rule, the answer follows almost mechanically — which is why this section can become very high-scoring."]},{h:"Non-verbal reasoning chapters covered on axomexam",list:["Image Series — find the next figure by tracking rotation, growth and shading.","Image Analogy — apply the same relationship between a pair of figures.","Image Classification — pick the figure that does not fit the group.","Mirror Images — reflect a figure across a vertical mirror line.","Water Images — reflect a figure across a horizontal water line.","Paper Folding and Paper Cutting — visualise the punched pattern after unfolding.","Embedded Figures — locate a smaller figure hidden inside a larger one.","Completion of Incomplete Pattern — identify the missing piece of a design.","Figure Matrix — follow the row and column logic of a matrix of figures.","Counting of Figures — count triangles, squares or straight lines in a complex figure.","Cube and Dice — solve painted-cube, dice-rule and opposite-face problems.","Rule Detection and Shape Construction."]},{h:"Non-verbal reasoning preparation strategy",list:["Practise every chapter by drawing the figures yourself; the hand learns the pattern as fast as the eye.","For series questions, check rotation, number of elements, shading and symmetry one by one.","Memorise the dice rule and opposite-face tricks for cube and dice questions.","Solve at least 20 figures a day and note down the rule you missed for each wrong answer.","Use a mirror or folded paper for the first few mirror, water and paper-folding questions.","Attempt figure-based sets in timed blocks to build visual speed."]},{h:"Common mistakes to avoid",list:["Guessing the rule from the first two figures instead of checking it against all figures.","Confusing clockwise and anticlockwise rotation.","Losing track of the number of dots, lines or shaded parts.","Rushing through counting-figures questions, which need a systematic point-by-point count."]}],faqs:[{q:"Is non-verbal reasoning hard to prepare?",a:"No. It rewards consistent practice more than talent. Once you learn the standard rule types, most questions become quick and mechanical."},{q:"Which non-verbal topics are most important for ADRE and Assam Police?",a:"Image series, analogy, mirror and water images, paper folding and cutting, embedded figures and counting of figures are asked most frequently."},{q:"How do I solve cube and dice questions quickly?",a:"Learn the dice rule for adjacent and opposite faces and the counting rule for painted cubes. With these two methods most questions can be solved in a few seconds."},{q:"Can I practise non-verbal reasoning in Assamese?",a:"Yes. The practice sets and explanations are bilingual, so you can read them in Assamese or English and switch whenever you want."},{q:"How much daily practice does non-verbal reasoning need?",a:"Twenty to thirty figures a day is enough. Regular short sessions work better than occasional long ones for visual reasoning."},{q:"Is non-verbal reasoning practice free on axomexam?",a:"Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription."}]},"verbal-reasoning":{title:"Verbal Reasoning Questions and Practice for ADRE, APSC and Assam Police | axomexam",meta:"Free verbal reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Analogy, coding-decoding, blood relations, direction sense, series, syllogism and clock and calendar.",lead:["Verbal reasoning checks how well you can find patterns in words, numbers and letters, and how logically you can follow a set of statements. It is one of the most reliable scoring areas in the reasoning section because the patterns repeat year after year.","This page covers the full verbal reasoning syllabus for ADRE, Assam Police, APSC CCE, SSC and Railway exams. Each chapter links to a practice set with step-by-step bilingual explanations so that you understand the logic behind every answer."],sections:[{h:"Why verbal reasoning is high-scoring",p:["Most verbal reasoning questions follow a fixed set of rules — the same logic that has appeared in previous papers. Coding-decoding, blood relations, direction sense and series in particular can be mastered with a handful of techniques. Once the rules are clear, these questions take little time and rarely go wrong."]},{h:"Verbal reasoning chapters covered on axomexam",list:["Analogy — identify the relationship between a given pair of words or numbers.","Classification and Odd One Out — find the item that does not belong to the group.","Number Series, Alphabet Series and Alpha-Numeric Series.","Coding-Decoding — letter, number and symbol based coding rules.","Blood Relations — family trees, generations and coded relationships.","Direction and Distance Test — track movement and find the final direction.","Order and Ranking — arrange people by height, age, marks or position.","Alphabet Test and Word Formation.","Logical Venn Diagrams — decide the correct relationship between sets.","Syllogism — draw valid conclusions from given statements.","Clock and Calendar — angle, hands, odd days and day-of-the-week problems.","Mathematical Operations, Data Sufficiency and Input-Output."]},{h:"Verbal reasoning preparation strategy",list:["Learn the standard rule for each chapter, then solve fifty questions of that chapter.","For series, always check difference, ratio, square, cube and alternating patterns in order.","Draw blood-relation and direction questions on paper instead of solving them mentally.","Memorise the Venn diagram combinations and the odd-days table for calendar questions.","Maintain a log of every question where you guessed, and revise it before the exam.","Practise mixed sets so you learn to switch logic quickly under time pressure."]},{h:"Common mistakes to avoid",list:["Not reading the question carefully — one changed word can change the whole logic.","Assuming extra information that is not given, especially in syllogism.","Mixing up the direction of movement in direction-sense questions.","Spending too long on one puzzle instead of moving on and returning later."]}],faqs:[{q:"Which verbal reasoning topics are most important for ADRE?",a:"Coding-decoding, blood relations, direction sense, series, analogy and classification are the most frequently asked topics in ADRE and Assam Police papers."},{q:"Is verbal reasoning easier than non-verbal reasoning?",a:"Many candidates find verbal reasoning easier because the rules are clearly defined. Personal strength varies, so practise both and see where you score faster."},{q:"How do I solve coding-decoding questions quickly?",a:"Compare the given word with its code and note the shift in positions of letters and numbers. Once the shift is identified, apply it to the new word."},{q:"Can I prepare verbal reasoning in Assamese?",a:"Yes. Questions and explanations are available in both Assamese and English, and you can switch languages while reading."},{q:"How many reasoning questions should I solve daily?",a:"Fifty to sixty questions across two or three chapters is a healthy daily target, along with a review of every mistake."},{q:"Is verbal reasoning practice on axomexam free?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free, with no login or subscription."}]},"analytical-critical-reasoning":{title:"Analytical and Critical Reasoning Practice for ADRE and APSC | axomexam",meta:"Practice analytical and critical reasoning for ADRE, APSC, Assam Police, SSC and Railway. Seating arrangement, puzzles, statement and assumption, conclusion, assertion and reason.",lead:["Analytical and critical reasoning measures how well you can organise information and judge arguments. It covers seating arrangements, complex puzzles, coded inequalities, and the statement-based chapters such as assumption, conclusion, argument and course of action.","This is the part of reasoning where careful reading matters more than quick guessing. On axomexam each chapter includes solved examples and practice sets with detailed bilingual explanations so that you can see exactly how a conclusion is derived from the given statements."],sections:[{h:"What the analytical and critical section demands",p:["Puzzle and arrangement questions test your ability to place people or objects according to a set of conditions. The statement-based chapters test your judgement of what is implied, assumed, strengthened or weakened by a given passage. Both require patience, and both become much easier once you learn to represent information in a simple diagram or table."]},{h:"Analytical and critical reasoning chapters covered on axomexam",list:["Seating Arrangement — linear, circular and square arrangements with mixed clues.","Complex Puzzles — floor, box, scheduling, month and category based puzzles.","Inequality — direct and coded inequalities with all possible conclusions.","Statement and Assumptions — identify the implicit assumption behind a statement.","Statement and Conclusions — decide which conclusion logically follows.","Statement and Arguments — judge the strength of arguments for and against.","Statement and Course of Action — choose the most practical response.","Cause and Effect — separate the cause from the effect.","Assertion and Reason — evaluate the link between an assertion and its reason.","Decision Making, Drawing Inferences and Data Sufficiency."]},{h:"Analytical and critical reasoning preparation strategy",list:["For arrangements and puzzles, draw the layout and mark fixed positions first, then the uncertain ones.","Learn the standard conclusion rules for inequality and syllogism and apply them mechanically.","For assumption and conclusion questions, separate what is stated from what is only implied.","Practise puzzles of increasing difficulty instead of jumping straight to complex sets.","Review the full solution even when your answer was correct, to confirm the reasoning.","Attempt one full puzzle set under a timer every day to build stamina."]},{h:"Common mistakes to avoid",list:["Adding real-world knowledge that is not part of the given passage.","Assuming a conclusion is valid when it is only probably true.","Making a single wrong placement early in a puzzle and then continuing with it.","Spending a large amount of time on one puzzle and losing easy marks elsewhere."]}],faqs:[{q:"Are puzzles and seating arrangement important for ADRE?",a:"Yes. Analytical reasoning, including seating arrangement and puzzles, carries good weight and also appears in the Assam Police and APSC papers."},{q:"How do I improve in statement and conclusion questions?",a:"Decide clearly what the statement guarantees. A conclusion that needs extra information beyond the statement is not valid."},{q:"What is the difference between assumption and conclusion?",a:"An assumption is an unstated idea the speaker takes for granted, while a conclusion is the logical result that follows from the given information."},{q:"How much time should I spend on one puzzle?",a:"If a puzzle is not opening up within about a minute and a half, mark the possibilities and move on. Return to it after finishing the easier questions."},{q:"Can I practise analytical reasoning in Assamese?",a:"Yes. All practice sets and explanations are bilingual, so you can study in Assamese or English as you prefer."},{q:"Is analytical reasoning practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},science:{title:"General Science Questions for ADRE, Assam Police and SSC | axomexam",meta:"Free general science practice for ADRE, Assam Police, APSC, SSC and Railway. Physics, Chemistry and Biology questions at Class 6 to 10 level with bilingual explanations.",lead:["General Science is one of the most predictable sections in Assam government recruitment exams. The questions come from Physics, Chemistry and Biology at roughly the Class 6 to 10 level, so a candidate who has revised the school textbooks carefully can score very well.","On axomexam the subject is divided into Physics, Chemistry and Biology, each with chapter-wise practice sets and explanations. The focus is on everyday science, definitions, units, simple applications and the health and environment facts that examiners repeat most often."],sections:[{h:"Which science questions are asked",p:["Questions usually test basic definitions, units of measurement, common chemical formulae, parts and functions of the human body, plant and animal classification, and everyday applications of physics and chemistry. Direct memory questions and simple numericals from physics make up a large part of the paper."]},{h:"Science chapters covered on axomexam",list:["Physics — motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and basic modern physics.","Chemistry — matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry.","Biology — the human body and its systems, nutrition and health, plants, cell biology, genetics, ecology and the environment."]},{h:"Most repeated science topics in Assam exams",list:["Units and measurements of physical quantities.","Human body systems, especially the digestive, circulatory and nervous systems.","Vitamins, their sources and deficiency diseases.","Common chemical formulae and everyday chemical reactions.","Scientific names, plant and animal classification.","Environment, pollution and ecological terms."]},{h:"General science preparation strategy",list:["Revise one chapter from the NCERT or standard textbook, then attempt its practice set immediately.","Make short notes of definitions, units and formulae — these are asked directly.","Memorise common abbreviations, vitamins and deficiency diseases in table form.","Practise physics numericals separately, since they need formula application.","Revise the diagrams of important systems and experiments.","Attempt a mixed science set every week to check retention."]},{h:"Common mistakes to avoid",list:["Skipping Biology as 'easy' and losing direct-mark questions.","Confusing units and symbols of similar physical quantities.","Studying from too many sources instead of mastering one standard textbook.","Ignoring everyday-science questions that are based on daily-life observations."]}],faqs:[{q:"What is the standard of science questions in ADRE and Assam Police?",a:"Most questions are at the Class 6 to 10 level. A careful revision of school textbooks covers the vast majority of the syllabus."},{q:"Which science subject is most important for Assam exams?",a:"All three carry weight, but Biology and everyday science appear most frequently, followed by Physics and Chemistry."},{q:"Do I need to memorise formulas for general science?",a:"Only a limited set — mainly units, simple physics formulae and common chemical equations. Most questions are direct and factual."},{q:"Can I study general science in Assamese?",a:"Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English."},{q:"How should I revise science before the exam?",a:"Use short notes and tables for facts, units and formulae, and solve past-paper questions to see which facts repeat."},{q:"Is general science practice free on axomexam?",a:"Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription."}]},english:{title:"General English Grammar and Vocabulary for ADRE, Assam Police | axomexam",meta:"Practice general English for ADRE, Assam Police, APSC, SSC and Railway. Grammar, parts of speech, sentence structure, vocabulary, synonyms, antonyms, idioms and error spotting.",lead:["General English is a steady, low-risk scoring section in ADRE, Assam Police, APSC, SSC and Railway exams. It tests grammar, vocabulary and comprehension, and the syllabus is limited — which means regular revision quickly translates into marks.","On axomexam the subject is organised into grammar, parts of speech, sentence structure and vocabulary, with practice questions and clear explanations. The goal is to help you recognise the same rule in an exam question, even when it is worded differently."],sections:[{h:"What general English tests",p:["The section checks whether you can identify correct grammar in use, choose the right word for a blank, spot an error in a sentence, and understand the meaning of words and phrases. Direct questions on synonyms, antonyms, one-word substitution and idioms are common."]},{h:"English chapters covered on axomexam",list:["Grammar — tenses, articles, subject-verb agreement, active and passive voice, and direct and indirect speech.","Parts of Speech — nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections.","Sentence Structure — sentence types, phrases and clauses, sentence correction and paragraph ordering.","Vocabulary — synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling."]},{h:"Most repeated English topics",list:["Subject-verb agreement and common error spotting.","Tenses and their correct usage.","Prepositions and articles.","Synonyms, antonyms and one-word substitutions.","Idioms and phrases with their meanings.","Fill in the blanks and cloze tests."]},{h:"General English preparation strategy",list:["Revise one grammar rule at a time and then solve twenty questions on it.","Read one short passage daily and note unfamiliar words with their meanings.","Learn five new words, five synonyms and three idioms every day.","Practise error-spotting by reading a sentence as a whole before choosing an option.","Revise the rules of articles, prepositions and subject-verb agreement most often.","Attempt a full English set weekly to track your accuracy."]},{h:"Common mistakes to avoid",list:["Choosing an option because it 'sounds correct' instead of applying the rule.","Ignoring articles and prepositions, which are asked every year.","Learning words without usage or example sentences.","Reading the entire comprehension passage before looking at the questions."]}],faqs:[{q:"Is general English easy to score in ADRE?",a:"Yes. The syllabus is limited and rule-based, so with steady revision most candidates can score well above average in this section."},{q:"Which grammar topics are most important?",a:"Tenses, subject-verb agreement, articles, prepositions, active and passive voice and direct and indirect speech are asked most often."},{q:"How can I improve my vocabulary quickly?",a:"Learn words in small daily sets with their usage, and revise synonyms, antonyms, one-word substitutions and idioms regularly."},{q:"Can I study English in Assamese on axomexam?",a:"The explanations are bilingual so that the rule is clear in both languages, and the questions follow the English exam pattern."},{q:"Is comprehension asked in these exams?",a:"Yes, many papers include a short reading-comprehension passage along with the direct grammar and vocabulary questions."},{q:"Is general English practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},articles:{title:"Study Articles and Notes for Assam Competitive Exams | axomexam",meta:"Read free high-quality study articles for ADRE, APSC, Assam Police, SSC and Railway exams. Long-form notes on general knowledge, mathematics, science, reasoning, English and computers.",lead:["Axomexam articles are long-form study pieces that explain a topic in depth and in simple language. They are written to build conceptual clarity before you attempt questions, which makes them ideal for beginning a new topic or revising one that keeps going wrong.","The collection spans general knowledge, mathematics, general science, reasoning ability, general English and computer awareness, so there is a suitable article whether you are strengthening a weak area or looking for a quick revision of a familiar one."],sections:[{h:"How to use the articles section",p:["Read the article once to understand the concept, then attempt the related practice set. Articles are deliberately kept simple and example-driven so that the idea stays with you when you face a similar question in the exam."]},{h:"Article categories available",list:["General Knowledge — Assam history, literature, geography, polity, economy and art and culture.","Mathematics — arithmetic, advanced math and data interpretation concepts explained step by step.","General Science — physics, chemistry and biology topics in everyday language.","Reasoning Ability — verbal, non-verbal and analytical reasoning techniques.","General English — grammar rules, vocabulary building and common error patterns.","Computer Awareness — fundamentals, software, MS Office, networking and cyber security."]},{h:"How articles help your exam preparation",list:["They explain the 'why' behind a rule, which helps you apply it to new questions.","They are ideal revision material in the final weeks before the exam.","They connect theory with solved examples from previous papers.","They build the reading habit needed for comprehension and general awareness."]},{h:"Tips to get the most from study articles",list:["Read with a pen and note down key points and formulas.","Attempt the linked practice set immediately after reading.","Revisit the article after a week to test your retention.","Use the bilingual view to strengthen terminology in both English and Assamese."]}],faqs:[{q:"What kind of articles are published on axomexam?",a:"Long-form, easy-reading study pieces on general knowledge, mathematics, science, reasoning, English and computer awareness, written for Assam competitive exams."},{q:"Are the articles useful for ADRE and APSC?",a:"Yes. The articles cover the concepts and facts that appear in ADRE, APSC CCE, Assam Police, SSC and Railway papers."},{q:"Should I read articles before or after practice questions?",a:"Read the article first to understand the concept, then attempt the linked practice set and review your mistakes."},{q:"Are the articles available in Assamese?",a:"The content is designed to support both Assamese and English readers, and the key terms are explained in both languages."},{q:"How often are new articles added?",a:"New articles are added regularly, so check the page again as you progress through your syllabus."},{q:"Is the articles section free to use?",a:"Yes. Every article and study resource on axomexam.in is completely free with no login or subscription."}]},math:{title:"Mathematics for ADRE, APSC and Assam Police Exams | axomexam",meta:"Free mathematics practice for ADRE, Assam Police, APSC, SSC and Railway. Arithmetic, advanced math, statistics and data interpretation with bilingual step-by-step solutions.",lead:["Mathematics, or quantitative aptitude, is one of the highest-scoring areas in ADRE, Assam Police, APSC, SSC and Railway exams. The subject rewards practice: the more patterns you have seen, the faster and more accurately you solve on exam day.","On axomexam mathematics is divided into arithmetic, advanced math, and statistics and data interpretation. Each section builds from the basics to exam-level questions so that you can strengthen one area at a time."],sections:[{h:"Why mathematics matters in Assam exams",p:["Numerical ability carries a large number of questions and is usually the section where well-prepared candidates pull ahead. Because the concepts are fixed and the patterns repeat, mathematics gives a better return on preparation time than most other subjects."]},{h:"Mathematics sections covered on axomexam",list:["Arithmetic — number system, percentage, ratio, profit and loss, average, time and work, time and distance, and simple and compound interest.","Advanced Math — algebra, geometry, trigonometry, number systems and higher-level problem solving.","Statistics and Data Interpretation — averages, tables, bar charts, pie charts and line graphs."]},{h:"Mathematics preparation strategy",list:["Master the basics of a chapter before moving to its advanced questions.","Learn and apply short tricks instead of solving every question the long way.","Practise with a timer to build the speed the exam demands.","Keep a formula notebook and revise it regularly.","Analyse every wrong answer to find whether the mistake was conceptual or careless.","Take a full maths mock test every week and track your accuracy."]},{h:"Common mistakes to avoid",list:["Attempting advanced questions without clear basics.","Ignoring data interpretation, which offers easy marks for careful readers.","Making calculation errors under time pressure because of skipped approximation practice.","Not practising enough variety of question types."]}],faqs:[{q:"Which mathematics topics are most important for ADRE?",a:"Arithmetic forms the core, especially percentage, ratio, average, profit and loss, time and work and time–speed–distance. Advanced math and data interpretation add the remaining marks."},{q:"Is advanced math needed for Assam Police and ADRE?",a:"Basic algebra and geometry are useful, while the emphasis stays on arithmetic. APSC and technical posts need a stronger grip on advanced math."},{q:"How can I increase my calculation speed?",a:"Memorise tables, squares, cubes and percentage-to-fraction values, and practise approximation techniques with timed sets."},{q:"How much time should I spend on mathematics daily?",a:"One to one-and-a-half hours of focused practice per day is enough when combined with regular error review and weekly mock tests."},{q:"Can I practise mathematics in Assamese?",a:"Yes. All practice sets and step-by-step explanations are bilingual and can be read in Assamese or English."},{q:"Is mathematics practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},reasoning:{title:"Reasoning Ability Questions for ADRE, APSC and Assam Police | axomexam",meta:"Free reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Verbal, non-verbal and analytical reasoning with step-by-step bilingual explanations and timed sets.",lead:["Reasoning ability tests logical and analytical thinking rather than memorised facts. It is divided into verbal reasoning, non-verbal reasoning and analytical and critical reasoning, and together they form a scoring section in ADRE, Assam Police, APSC, SSC and Railway exams.","Because speed and accuracy decide the score in reasoning, timed practice is essential. On axomexam each of the three branches has chapter-wise sets followed by detailed explanations, so you can train both the logic and the pace."],sections:[{h:"Why reasoning is a high-scoring section",p:["Reasoning questions follow fixed patterns that repeat across papers. Once a candidate learns the standard rules for series, coding, arrangements and statement-based questions, the section becomes fast and dependable. It also requires no additional study material beyond regular practice."]},{h:"Reasoning branches covered on axomexam",list:["Verbal Reasoning — analogy, classification, series, coding-decoding, blood relations, direction sense, ranking, syllogism and clock and calendar.","Non-Verbal Reasoning — figure series, mirror and water images, paper folding and cutting, embedded figures, figure matrix, counting of figures and cube and dice.","Analytical and Critical Reasoning — seating arrangement, puzzles, inequality, and statement-based chapters such as assumption, conclusion, argument and course of action."]},{h:"Reasoning preparation strategy",list:["Learn the rule for a chapter, then solve a set of at least twenty questions on it.","Draw diagrams for arrangements, blood relations and directions instead of solving mentally.","Practise mixed sets to get used to switching logic quickly.","Time every set so that speed improves along with accuracy.","Review wrong answers immediately and note the rule you missed.","Attempt a full reasoning mock test every week."]},{h:"Common mistakes to avoid",list:["Guessing the logic instead of checking it against every part of the question.","Getting stuck on a single puzzle while easier questions wait.","Ignoring non-verbal reasoning because it looks unfamiliar.","Not practising enough variety, so unfamiliar patterns feel difficult in the exam."]}],faqs:[{q:"How many reasoning questions come in ADRE and Assam Police?",a:"The reasoning section usually carries between 15 and 25 questions depending on the post and paper."},{q:"Which reasoning branch is most important?",a:"All three are asked, but verbal and analytical reasoning usually carry more questions than non-verbal reasoning."},{q:"How can I improve reasoning speed?",a:"Learn the standard rules and then practise timed sets. Drawing diagrams for arrangements and puzzles also saves a lot of time."},{q:"Is reasoning difficult for beginners?",a:"No. It is one of the most practice-friendly sections. With consistent daily practice, beginners improve quickly."},{q:"Can I prepare reasoning in Assamese?",a:"Yes. Questions and explanations are bilingual and you can switch between Assamese and English while reading."},{q:"Is reasoning practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},computer:{title:"Computer Awareness Questions for ADRE, Assam Police and APSC | axomexam",meta:"Free computer awareness practice for ADRE, Assam Police, APSC, SSC and Railway. Fundamentals, hardware, software, MS Office, networking, cyber security, DBMS and number system.",lead:["Computer awareness is one of the quickest sections to prepare and score in ADRE, Assam Police, APSC, DHS, DME, Gauhati High Court and other state recruitment exams. Most questions are direct and factual, so a short, focused revision can secure almost full marks.","On axomexam the subject is divided into fundamentals and hardware, software and operating systems, MS Office, networking and the internet, cyber security, and DBMS with number system and shortcuts. Each chapter links to a practice set with clear explanations."],sections:[{h:"What computer awareness covers",p:["The syllabus begins with the basics of computers, their generations, input and output devices and memory, and then moves to software, operating systems and application packages. Networking and the internet, cyber security and database concepts complete the section."]},{h:"Computer chapters covered on axomexam",list:["Computer Fundamentals and Hardware — generations, input and output devices, memory, storage and the CPU.","Software and Operating System — types of software, functions of an operating system, file management and common Windows and Linux features.","MS Office Suite — Word, Excel and PowerPoint, including menu options, shortcuts and formulas.","Networking and Internet — network types and topologies, IP addresses, protocols, browsers, email and internet services.","Cyber Security — viruses, malware, phishing, hacking, passwords, encryption and safe internet practices.","DBMS, Number System and Shortcuts — database basics, number system conversions and keyboard shortcuts."]},{h:"Most repeated computer topics in Assam exams",list:["Generations of computers and their characteristics.","Input, output and storage devices with examples.","Keyboard shortcuts for common operations.","Basic MS Word and MS Excel functions and formulas.","Full forms of common computer abbreviations.","Types of computer viruses and cyber safety tips."]},{h:"Computer awareness preparation strategy",list:["Make a one-page list of full forms and abbreviations and revise it daily.","Learn the keyboard shortcuts by actually using them on a computer.","Prepare a small table of input, output and storage devices.","Practise basic Excel formulas and Word menu options.","Revise number system conversions with a few examples each.","Attempt a chapter-wise set after studying each topic."]},{h:"Common mistakes to avoid",list:["Ignoring the topic because it seems easy, and then forgetting the full forms.","Mixing up similar terms such as RAM and ROM, or hardware and software.","Not practising shortcuts, which are asked directly every year.","Studying advanced topics while the basics remain unclear."]}],faqs:[{q:"Is computer awareness asked in ADRE and Assam Police?",a:"Yes. It is part of the general awareness section and is one of the easiest areas to score in, because most questions are direct and factual."},{q:"How much time is needed to prepare computer awareness?",a:"A focused revision of one or two weeks is usually enough, since the syllabus is small and mostly factual."},{q:"Which computer topics are most important?",a:"Fundamentals, hardware and software differences, MS Office shortcuts and formulas, networking basics and cyber security are asked most often."},{q:"Do I need a computer to prepare this section?",a:"A computer helps for shortcuts and MS Office, but the theory can be prepared from notes and practice questions on any device."},{q:"Can I study computer awareness in Assamese?",a:"Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English."},{q:"Is computer awareness practice free on axomexam?",a:"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]}};function Nt(e){return Ot[e]||""}function Gt(e){return["math","arithmetic","advanced-math","statistics-and-data-interpretation","science","physics","chemistry","biology","reasoning","verbal-reasoning","analytical-critical-reasoning","non-verbal-reasoning","computer","dbms-number-shortcuts"].indexOf(e)!==-1?["Revise the basic formulas and concepts of this section before you begin practising.","Attempt the questions under a timer so that you get used to the speed expected on exam day.","Read the explanation for every wrong answer and note down exactly why you missed it.","Return to the same sets after a few days and check whether your accuracy has improved."]:["Read the topic notes once, then attempt the related questions to test your recall.","Mark the facts you keep forgetting and revise them in short, repeated sessions.","Practise in both languages so you can recognise the same fact in Assamese and English.","Review the explanations even for questions you answered correctly to strengthen retention."]}function Qt(e){const t=e.info||"",a=e.items||[],n=e.tips||[],s=e.faqs||[],o=a.length?`<h3 style="color:var(--ink,#0f172a); margin-top:22px;">${l("What is covered here")}</h3><ul style="margin:8px 0 0 20px; line-height:1.9;">${a.map(d=>`<li><strong>${l(d.name)}</strong>${d.count?` &mdash; ${d.count} ${l(d.unit||"topics")}`:""}</li>`).join("")}</ul>`:"",i=n.length?`<h3 style="color:var(--ink,#0f172a); margin-top:22px;">${l("How to prepare "+(e.name||""))}</h3><ul style="margin:8px 0 0 20px; line-height:1.9;">${n.map(d=>`<li>${l(d)}</li>`).join("")}</ul>`:"",c=s.length?`<h3 style="color:var(--ink,#0f172a); margin-top:24px;">${l("Frequently Asked Questions")}</h3><div class="seo-faq">${s.map(d=>`<details style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"><summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">${l(d.q)}</summary><p style="margin:8px 0 0;">${l(d.a)}</p></details>`).join("")}</div>`:"";return`
      <section class="section seo-deep" style="padding-bottom:48px;">
        <div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">
          <h2 style="margin-top:0; color:var(--ink,#0f172a);">${l(e.h2||e.name||"")}</h2>
          ${t?`<p>${l(t)}</p>`:""}
          ${o}
          ${i}
          ${c}
        </div>
      </section>`}function _t(e,t){if(!e||!t)return;const a=document.createElement("div");a.innerHTML=Qt(t),a.firstElementChild&&e.appendChild(a.firstElementChild)}function Yt(e){return!e||!e.length?"":'<h3 style="color:var(--ink,#0f172a); margin-top:22px;">Frequently Asked Questions</h3><div class="seo-faq">'+e.map(t=>'<details style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"><summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">'+l(t.q)+'</summary><p style="margin:8px 0 0;">'+l(t.a)+"</p></details>").join("")+"</div>"}function Ut(e){return(e||[]).map(t=>{let a='<h3 style="color:var(--ink,#0f172a); margin-top:22px;">'+l(t.h)+"</h3>";return t.p&&t.p.length&&(a+=t.p.map(n=>"<p>"+l(n)+"</p>").join("")),t.list&&t.list.length&&(a+='<ul style="margin:8px 0 0 20px; line-height:1.9;">'+t.list.map(n=>"<li>"+l(n)+"</li>").join("")+"</ul>"),a}).join("")}function Wt(e){const t=(e.lead||[]).map(n=>"<p>"+l(n)+"</p>").join(""),a=e.h2||String(e.title||"").replace(/\s*\|\s*axomexam\s*$/i,"");return'<section class="section seo-deep" data-axo-deep="1" style="padding-bottom:48px;"><div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;"><h2 style="margin-top:0; color:var(--ink,#0f172a);">'+l(a)+"</h2>"+t+Ut(e.sections)+Yt(e.faqs)+"</div></section>"}function R(e,t){const a=t&&t.id?Ft[t.id]:null;if(a){const d=document.createElement("div");d.innerHTML=Wt(a),d.firstElementChild&&e.appendChild(d.firstElementChild);return}const n=t.name||"",s=t.info||Nt(t.id)||"",o=(t.faqs||[]).slice(),i=t.count||0,c=t.total||0;t.noDefaults||(o.push({q:"Is "+n+" available for free on axomexam?",a:"Yes. Every mock test, question bank, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge."}),o.push({q:"Can I study "+n+" in Assamese as well as English?",a:"Yes. Questions and explanations are bilingual. You can switch between Assamese and English while reading so the same concept is reinforced in both languages."}),i>0&&o.push({q:"How much material is available for "+n+"?",a:"This section currently offers "+i+" topics"+(c>0?" with around "+c+" questions":"")+" and is updated regularly as new questions are added."})),_t(e,{h2:t.h2||n+" - Overview",name:n,info:s,items:t.items||[],tips:t.tips||Gt(t.id),faqs:o})}function S(e){if(e==null)return"";let t=String(e);return/\$[^$]+\$|\\\([^\\]+\\\)/.test(t)||(t=l(t),t=t.replace(/sqrt\(([^)]+)\)/gi,'&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>'),t=t.replace(/√\(([^)]+)\)/g,'&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>'),t=t.replace(/\^{([^}]+)}/g,"<sup>$1</sup>"),t=t.replace(/\^([\-\+]?[0-9০-৯a-zA-Z\u0980-\u09FF]+)/g,"<sup>$1</sup>"),t=t.replace(/_{([^}]+)}/g,"<sub>$1</sub>"),t=t.replace(/_([0-9০-৯a-zA-Z\u0980-\u09FF]+)/g,"<sub>$1</sub>"),t=t.replace(/\+\/-/g,"&plusmn;"),t=t.replace(/&lt;=/g,"&le;").replace(/&gt;=/g,"&ge;")),t}function U(e){e&&/\$|\\\(|\\\[/.test(e.textContent||"")&&Dt().then(function(){if(typeof renderMathInElement=="function")try{renderMathInElement(e,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1},{left:"\\[",right:"\\]",display:!0}],throwOnError:!1})}catch{}}).catch(function(){})}function q(e,t,a){if(!e)return"";const n=a||(p.mock&&p.mock.testLang?p.mock.testLang:p.lang),s=n==="en"?"english":"assamese",o=m=>m==null?"":Array.isArray(m)?m.map(y=>`<div class="qa-step-line" style="margin:0 0 6px 0; padding:0; line-height:1.65; text-align:left;">${S(y)}</div>`).join(""):typeof m=="object"?o(m[n]||m.as||m.en||Object.values(m)[0]||""):String(m),i=m=>t==="answer"?Te(e,m,n):m;if(t==="answer"){const m=Vt(e),y=j(e,n),k=e.answer!==void 0?e.answer:e.a,x=Array.isArray(k)||k&&typeof k=="object"&&Object.keys(k).some(w=>Array.isArray(k[w]));if(m>=0&&m<y.length&&y[m]!==void 0&&String(y[m]).trim()!==""&&!x)return o(Te(e,m,n))}if(e[s]&&typeof e[s]=="object"){if(e[s][t]!==void 0)return o(i(e[s][t]));const m=t==="question"?"q":t==="answer"?"a":t==="explanation"?"exp":"";if(m&&e[s][m]!==void 0)return o(i(e[s][m]))}const c=`${t}_${n}`;if(e[c]!==void 0&&e[c]!==null)return o(i(e[c]));const d=t==="question"?"q":t==="answer"?"a":t==="explanation"?"exp":"";if(d){const m=`${d}_${n}`;if(e[m]!==void 0&&e[m]!==null)return o(i(e[m]))}const u=[t];t==="question"&&u.push("q","question_text","headline","title"),t==="answer"&&u.push("a","ans","content","body","description"),t==="explanation"&&u.push("exp","desc","key_points","summary");for(const m of u){const y=e[m];if(y!=null)return o(i(y))}if(t==="answer"){const m=Number.isInteger(e.answer)?e.answer:Number.isInteger(e.correct)?e.correct:Number.isInteger(e.correct_index)?e.correct_index:-1;if(m>=0&&j(e,n)[m]!==void 0)return o(Te(e,m,n))}const h=`${t}_as`,g=`${t}_en`;return e[h]!==void 0&&e[h]!==null?o(e[h]):e[g]!==void 0&&e[g]!==null?o(e[g]):""}function W(e,t){if(e==null)return"";if(typeof e=="string")return e;if(Array.isArray(e))return e.join(`
`);const a=t||(p.mock&&p.mock.testLang?p.mock.testLang:p.lang),n=e[a]||e.as||e.en||"";return Array.isArray(n)?n.join(`
`):String(n)}function j(e,t){if(!e)return[];const a=t||(p.mock&&p.mock.testLang?p.mock.testLang:p.lang),n=a==="en"?"english":"assamese";if(e[n]&&Array.isArray(e[n].options))return e[n].options.map(String);if(e.options&&typeof e.options=="object"&&!Array.isArray(e.options)){const o=e.options[a]||e.options.as||e.options.en;if(Array.isArray(o))return o.map(String)}if(Array.isArray(e.options)&&e.options.length)return e.options.map(o=>typeof o=="string"?o:typeof o=="object"&&o!==null?o[a]||o.as||o.en||"":String(o));const s=e[`options_${a}`];return Array.isArray(s)&&s.length?s.map(String):Array.isArray(e.options_as)&&e.options_as.length?e.options_as.map(String):Array.isArray(e.options_en)&&e.options_en.length?e.options_en.map(String):[]}function Te(e,t,a){const n=j(e,a);if(!n||!n.length)return t;const s="ABCDEFGHIJ";let o=-1;if(Number.isInteger(t))o=t;else if(typeof t=="string"){const d=/^[\(\[]?\s*([a-jA-J])\s*[\)\]]?[.)]?$/.exec(t.trim());d&&(o=s.indexOf(d[1].toUpperCase()))}if(o<0||o>=n.length)return t;const i=s[o]||"",c=n[o];return c==null||String(c).trim()===""?i||t:i?`(${i}) ${c}`:String(c)}function Vt(e){if(!e)return-1;const t=[e.correct,e.correct_index,e.answer,e.a];for(const a of t){if(Number.isInteger(a))return a;if(typeof a=="string"){const n=/^[\(\[]?\s*([a-jA-J])\s*[\)\]]?[.)]?$/.exec(a.trim());if(n)return"ABCDEFGHIJ".indexOf(n[1].toUpperCase())}}return-1}function Ie(e){return e==null?"":String(e).replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi,"").replace(/<\s*script[\s\S]*$/gi,"").replace(/\son[a-z]+\s*=\s*"[^"]*"/gi,"").replace(/\son[a-z]+\s*=\s*'[^']*'/gi,"").replace(/\son[a-z]+\s*=\s*[^\s>]+/gi,"").replace(/javascript\s*:/gi,"")}function Kt(e){if(!e)return"";const t=e&&typeof e=="object"&&!Array.isArray(e)?e:{rows:e},a=Array.isArray(t.head)?t.head:Array.isArray(t.headers)?t.headers:[],n=Array.isArray(t.rows)?t.rows:[];if(!a.length&&!n.length)return"";const s=i=>i==null?"":S(W(i));return`
      <div class="nv-table-wrap">${t.caption?`<div class="nv-table-cap">${l(W(t.caption))}</div>`:""}
        <table class="nv-table">
          ${a.length?`<thead><tr>${a.map(i=>`<th>${s(i)}</th>`).join("")}</tr></thead>`:""}
          <tbody>${n.map(i=>`<tr>${(Array.isArray(i)?i:[]).map(c=>`<td>${s(c)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>`}function V(e){if(!e)return"";const t=[];return e.fig&&t.push(`<div class="nv-media">${Ie(e.fig)}</div>`),e.table&&t.push(Kt(e.table)),t.join("")}function K(e){return!e||!Array.isArray(e.options)||!e.options.some(t=>t&&typeof t=="object"&&t.fig)?null:e.options.map((t,a)=>{const s=t&&typeof t=="object"&&t.option?String(t.option):"ABCDEFGHIJ"[a]||"";return!t||typeof t!="object"?{letter:s,fig:"",text:String(t||"")}:{letter:s,fig:Ie(t.fig||""),text:W(t)||""}})}function Q(e,{compact:t}={}){const a=K(e);return a?`
      <div class="nv-fig-grid${t?" nv-fig-grid-compact":""}">
        ${a.map(n=>`
          <div class="nv-fig-item">
            <div class="nv-fig-key">(${n.letter})</div>
            <div class="nv-fig-box">${n.fig||(n.text?`<span class="nv-fig-textonly">${S(n.text)}</span>`:"")}</div>
            ${n.fig&&n.text?`<div class="nv-fig-cap">${S(n.text)}</div>`:""}
          </div>`).join("")}
      </div>`:""}function ge(e){return e==null?"":typeof e=="object"?W(e):String(e)}function be(e){return e&&typeof e=="object"&&typeof e.fig=="string"?Ie(e.fig):""}function Jt(){const e=f("footer.site-footer")||f("footer");if(!e)return;const t=p.uiLang==="as";e.innerHTML=`
      <div style="max-width:1100px; margin:0 auto; padding:32px 16px 20px; box-sizing:border-box; color:#ffffff;">
        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-start; gap:24px; padding-bottom:24px; border-bottom:1px solid rgba(255,255,255,0.15);">
          <div style="flex:1; min-width:240px; text-align:left;">
            <div style="margin-bottom:10px; color:#ffffff;">
              <svg width="152" height="30" viewBox="0 0 152 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block; vertical-align:middle;">
                <defs>
                  <linearGradient id="gradLogoFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#6366f1" />
                    <stop offset="100%" stop-color="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="30" height="30" rx="8" fill="url(#gradLogoFooter)"/>
                <text x="15" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" text-anchor="middle">A</text>
                <text x="38" y="21" fill="#ffffff" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-weight="900" font-size="16" letter-spacing="-0.4">axomexam<tspan fill="#38bdf8">.in</tspan></text>
              </svg>
            </div>
            <p style="font-size:0.86rem; color:#f8fafc; line-height:1.55; margin:0; max-width:320px; font-weight:400;">
              ${t?"অসমৰ সৰ্ববৃহৎ দ্বিভাষিক প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতি মঞ্চ। ADRE, অসম আৰক্ষী, APSC আদি পৰীক্ষাৰ বিনামূলীয়া সমল।":"Assam's premier bilingual competitive exam preparation portal. Free study notes, mock tests and previous papers."}
            </p>
          </div>
          
          <div style="display:flex; gap:40px; flex-wrap:wrap;">
            <div style="text-align:left;">
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#ffffff; display:block; margin-bottom:12px;">${t?"দ্ৰুত লিংক":"Quick Links"}</span>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
                <li><a href="/mock-test" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"মক টেষ্ট":"Mock Test"}</a></li>
                <li><a href="/category/articles" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"প্ৰবন্ধসমূহ":"Articles"}</a></li>
                <li><a href="/previous-year" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"বিগত বৰ্ষৰ প্ৰশ্ন":"Previous Papers"}</a></li>
                <li><a href="/ebooks" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"ই-বুক":"E-Books"}</a></li>
                <li><a href="/downloads" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"নোটসমূহ ডাউনল'ড":"Download Notes"}</a></li>
                <li><a href="/download-app" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"এপ ডাউনলোড":"Download App"}</a></li>
                <li><a href="/submit" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"প্ৰশ্ন প্ৰেৰণ কৰক":"Submit Q&A"}</a></li>
              </ul>
            </div>

            <div style="text-align:left;">
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#ffffff; display:block; margin-bottom:12px;">${t?"আইনী নীতি":"Legal & Info"}</span>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
                <li><a href="/about" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"আমাৰ বিষয়ে":"About Us"}</a></li>
                <li><a href="/contact" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"যোগাযোগ কৰক":"Contact Us"}</a></li>
                <li><a href="/privacy" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"গোপনীয়তা নীতি":"Privacy Policy"}</a></li>
                <li><a href="/terms" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"নীতি আৰু চৰ্তসমূহ":"Terms & Conditions"}</a></li>
                <li><a href="/disclaimer" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${t?"দাবীত্যাগ":"Disclaimer"}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div style="padding-top:16px; font-size:0.82rem; color:#f8fafc; display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; align-items:center;">
          <span>© ${new Date().getFullYear()} <strong style="color:#ffffff;">axomexam.in</strong>. All Rights Reserved.</span>
          <span style="color:#f8fafc;">Made for Assam Competitive Aspirants</span>
        </div>
      </div>
    `}function ve(){const e=f("#master-search");e&&(e.placeholder=r("search.placeholder")),M("[aria-label]").forEach(t=>{const a=t.getAttribute("data-aria-i18n");a&&t.setAttribute("aria-label",r(a))}),Jt()}function Xt(){const e=document.querySelector(".header-center .theme-toggle")||document.querySelector(".site-header .theme-toggle");if(e&&!document.querySelector(".desktop-lang-toggle")){const a=document.createElement("div");a.className="desktop-lang-toggle",a.style.cssText="display:inline-flex;align-items:center;background:var(--bg-subtle,#f1f5f9);border:1px solid var(--border,#e2e8f0);border-radius:20px;padding:2px;margin-right:8px;",a.innerHTML=`
        <button type="button" class="glang-btn ${p.uiLang==="en"?"active":""}" data-glang="en" style="border:none;background:${p.uiLang==="en"?"var(--primary,#0ea5e9)":"transparent"};color:${p.uiLang==="en"?"#fff":"var(--ink-soft,#64748b)"};padding:3px 9px;border-radius:14px;cursor:pointer;font-size:0.75rem;font-weight:700;">EN</button>
        <button type="button" class="glang-btn ${p.uiLang==="as"?"active":""}" data-glang="as" style="border:none;background:${p.uiLang==="as"?"var(--primary,#0ea5e9)":"transparent"};color:${p.uiLang==="as"?"#fff":"var(--ink-soft,#64748b)"};padding:3px 9px;border-radius:14px;cursor:pointer;font-size:0.75rem;font-weight:700;">অসমীয়া</button>
      `,e.insertAdjacentElement("beforebegin",a)}const t=f("#mobile-menu");if(t&&!t.querySelector(".mobile-lang-bar")){const a=document.createElement("div");a.className="mobile-lang-bar",a.style.cssText="display:flex;justify-content:center;padding:12px 16px;border-bottom:1px solid var(--border,#e2e8f0);background:var(--bg-subtle,#f8fafc);box-sizing:border-box;",a.innerHTML=`
        <div style="display:inline-flex;background:var(--bg,#fff);border:1px solid var(--border,#cbd5e1);border-radius:20px;padding:2px;width:100%;max-width:240px;box-sizing:border-box;">
          <button type="button" class="glang-btn ${p.uiLang==="en"?"active":""}" data-glang="en" style="flex:1;border:none;background:${p.uiLang==="en"?"var(--primary,#0ea5e9)":"transparent"};color:${p.uiLang==="en"?"#fff":"var(--ink-soft,#64748b)"};padding:6px 0;border-radius:14px;cursor:pointer;font-size:0.82rem;font-weight:700;text-align:center;">English</button>
          <button type="button" class="glang-btn ${p.uiLang==="as"?"active":""}" data-glang="as" style="flex:1;border:none;background:${p.uiLang==="as"?"var(--primary,#0ea5e9)":"transparent"};color:${p.uiLang==="as"?"#fff":"var(--ink-soft,#64748b)"};padding:6px 0;border-radius:14px;cursor:pointer;font-size:0.82rem;font-weight:700;text-align:center;">অসমীয়া</button>
        </div>
      `,t.insertBefore(a,t.firstChild)}M(".glang-btn").forEach(a=>{a.addEventListener("click",n=>{n.preventDefault();const s=a.dataset.glang;if(p.uiLang!==s){p.uiLang=s;try{localStorage.setItem("axomexam-ui-lang",s)}catch{}M(".glang-btn").forEach(o=>{const i=o.dataset.glang===p.uiLang;o.classList.toggle("active",i),o.style.background=i?"var(--primary,#0ea5e9)":"transparent",o.style.color=i?"#fff":"var(--ink-soft,#64748b)"}),ve(),ye(),ke(),$e()}})})}function Zt(e){const t=[],a={},n=[],s=(i,c,d,u)=>{const h=[c.id,d?d.id:"",u?u.id:""].filter(Boolean).concat([i.id]).join("/"),g={path:h,cat:c,sub:d,section:u,topic:i,title:i.title||i.name,desc:i.description,tags:i.tags||[],nQuestions:(i.questions||[]).length,pdf:i.pdf||null,popularity:Number(i.popularity)||0};a[h]=g,n.push(g)},o=i=>{i.name=i.name||{en:i.id,as:i.id},i.description=i.description||{};const c=i.subcategories||[];if(c.length)c.forEach(d=>{d.name=d.name||{en:d.id,as:d.id};const u=d.sections||[];if(u.length)u.forEach(h=>{h.name=h.name||{en:h.id,as:h.id},(h.topics||[]).forEach(g=>s(g,i,d,h))});else if((d.topics||[]).length)(d.topics||[]).forEach(h=>s(h,i,d,null));else{const h={id:d.id,name:d.name,description:d.description,popularity:Number(d.popularity)||0},g=[i.id,d.id].join("/"),m={path:g,cat:i,sub:d,section:null,topic:h,title:h.name,desc:h.description,tags:[],nQuestions:0,pdf:null,popularity:h.popularity};a[g]=m,n.push(m)}});else{const d=i.sections||[];d.length?d.forEach(u=>{u.name=u.name||{en:u.id,as:u.id},(u.topics||[]).forEach(h=>s(h,i,null,u))}):(i.topics||[]).forEach(u=>s(u,i,null,null))}t.push(i)};return(e.categories||[]).forEach(o),{categories:t,topicMap:a,topicIndex:n}}function ea(e){if(!e||typeof e!="object")return;p.counts=e;const t=e.topicCounts||{};p.topicIndex.forEach(a=>{Object.prototype.hasOwnProperty.call(t,a.path)&&(a.nQuestions=Number(t[a.path])||0)}),typeof e.examsTotal=="number"&&(p.examQuestionTotal=e.examsTotal,p.examTotalLoaded=!0)}function I(e){const t=p.categories.find(a=>a.id===e);return t&&t.color||(typeof CATEGORY_COLORS<"u"?CATEGORY_COLORS[e]||CATEGORY_COLORS.default:"#0ea5e9")}function ta(e){const t=p.categories.find(a=>a.id===e);return t&&t.icon||(typeof CATEGORY_ICONS<"u"?CATEGORY_ICONS[e]:"A")||"A"}function J(e){const t=typeof CATEGORY_ICON_SVG<"u"&&CATEGORY_ICON_SVG[e];return t?`<span class="cat-svg">${t}</span>`:l(ta(e))}function _(e,t){const a=String(e||"");if(typeof TOPIC_ICON_RULES<"u"){for(const[n,s]of TOPIC_ICON_RULES)if(n.test(a))return`<span class="cat-svg">${s}</span>`}return J(t)}function ze(e){return p.topicIndex.filter(t=>t.cat.id===e.id).length}function Xe(){const e=p.categories.slice(),t=e.findIndex(a=>a.id==="articles");if(t!==-1){const[a]=e.splice(t,1),n=e.findIndex(s=>s.id==="computer");n!==-1?e.splice(n+1,0,a):e.push(a)}return e}function aa(e,t){const a=e.subcategories||e.sections||[],n=!!(a&&a.length),s=t&&t.split("/")[0]===e.id;return`
      <li class="${n?"has-drop":""}">
        <a class="nav-link ${s?"active":""}" href="/category/${e.id}">
          <span>${l(b(e.name))}</span>
          ${n?'<span class="caret"></span>':""}
        </a>
        ${n?na(e,t):""}
      </li>`}function na(e,t){return`
      <div class="dropdown">
        ${(e.subcategories||e.sections||[]).map(n=>{const s=n.sections;return s&&s.length?`
              <div class="has-drop">
                <a href="/category/${e.id}/${n.id}">
                  <span>${l(b(n.name))}</span><span class="d-caret"></span>
                </a>
                <div class="dropdown">
                  ${s.map(c=>`
                    <a href="/category/${e.id}/${n.id}/${c.id}">
                      <span>${l(b(c.name))}</span>
                    </a>`).join("")}
                </div>
              </div>`:`<a href="${!(n.topics&&n.topics.length)?`/topic/${e.id}/${n.id}`:`/category/${e.id}/${n.id}`}">${l(b(n.name))}</a>`}).join("")}
      </div>`}const Ze=["gk","science","math","history","reasoning"];function ye(){const e=f("#nav-list");if(!e)return;const t=et(),a=p.categories.filter(o=>Ze.includes(o.id)),n=p.categories.filter(o=>!Ze.includes(o.id)),s=[];s.push(xe("/",r("nav.home"),t)),a.forEach(o=>s.push(aa(o,t))),s.push(xe("/mock-test",r("nav.mock"),t)),s.push(xe("/exams",r("nav.exams"),t)),s.push(xe("/downloads",r("nav.downloads"),t)),s.push(sa(n,t)),e.innerHTML=s.join("")}function xe(e,t,a){return`<li><a class="nav-link ${a.split("/")[0]===e.replace(/^\//,"")?"active":""}" href="${e}">${l(t)}</a></li>`}function sa(e,t){const a=t.split("/")[0],n=e.some(m=>m.id===a)||["submit","previous-year","ebooks","exams","download-app","contact","about","privacy","privacy-policy","terms","disclaimer"].includes(a),s=e.map(m=>`<a class="${a===m.id?"active":""}" href="/category/${m.id}">${l(b(m.name))}</a>`),i=`
      <a class="ebook-nav-link ${a==="ebooks"?"active":""}" href="/ebooks">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        <span>${l(r("nav.ebooks"))}</span>
      </a>`,d=`
      <a class="ebook-nav-link ${a==="exams"?"active":""}" href="/exams">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        <span>${l(r("nav.exams"))}</span>
      </a>`,u=e.findIndex(m=>m.id==="articles");u!==-1?s.splice(u+1,0,i,d):s.push(i,d);const h=s.join(""),g=[["/previous-year",r("nav.previousYear")],["/submit",r("nav.submit")],["/contact","Contact Us"],["/download-app",r("nav.downloadApp")]].map(([m,y])=>`<a class="${a===m.replace(/^\//,"")?"active":""}" href="${m}">${l(y)}</a>`).join("");return`
      <li class="has-drop">
        <a class="nav-link ${n?"active":""}" href="/categories">
          <span>${l(r("nav.more"))}</span><span class="caret"></span>
        </a>
        <div class="dropdown">
          ${h?`<div class="d-label">${l(r("nav.categories"))}</div>${h}`:""}
          <div class="d-label">${l(r("mmenu.extra"))}</div>
          ${g}
        </div>
      </li>`}function ke(){const e=f("#mobile-nav");if(!e)return;const t=et(),n=Xe().slice(),s=n.findIndex(x=>x.id==="articles"),o=n.findIndex(x=>x.id==="computer");if(s!==-1&&o!==-1&&s!==o-1){const[x]=n.splice(s,1);n.splice(n.findIndex(w=>w.id==="computer"),0,x)}const i=n.map(x=>{const w=x.subcategories||x.sections||[];return`
        <li>
          <div class="m-row">
            <a class="m-item ${t.split("/")[0]===x.id?"active":""}" href="/category/${x.id}">
              ${l(b(x.name))}
            </a>
            ${w.length?`<button class="m-toggle" data-toggle data-target="${x.id}" aria-label="toggle"><span class="caret"></span></button>`:""}
          </div>
          ${w.length?`<div class="m-sub" id="msub-${x.id}">${w.map(v=>{const C=v.sections;return C&&C.length?`
                <div class="m-row">
                  <a class="m-item" href="/category/${x.id}/${v.id}"><span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${l(b(v.name))}</span></a>
                  <button class="m-toggle" data-toggle data-target="${x.id}-${v.id}" aria-label="toggle"><span class="caret"></span></button>
                </div>
                <div class="m-sub m-nested" id="msub-${x.id}-${v.id}">
                  ${C.map(E=>`<a href="/category/${x.id}/${v.id}/${E.id}"><span style="font-weight:600; font-size:0.87rem; color:var(--ink-soft,#475569);">${l(b(E.name))}</span></a>`).join("")}
                </div>`:`<a href="${!(v.topics&&v.topics.length)?`/topic/${x.id}/${v.id}`:`/category/${x.id}/${v.id}`}"><span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${l(b(v.name))}</span></a>`}).join("")}</div>`:""}
        </li>`}),c="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;background:var(--bg-subtle,#f8fafc);color:var(--ink,#0f172a);font-weight:700;border:1px solid var(--border,#e2e8f0);box-shadow:0 1px 3px rgba(0,0,0,0.03);",d=`
      <li class="m-ebook" style="margin-top:8px;">
        <a class="m-item ${t==="ebooks"?"active":""}" href="/ebooks" style="${c}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
          ${l(r("nav.ebooks"))}
        </a>
      </li>`,u=`
      <li class="m-exam" style="margin-top:8px;">
        <a class="m-item ${t==="exams"?"active":""}" href="/exams" style="${c}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          ${l(r("nav.exams"))}
        </a>
      </li>`,h=`
      <li class="m-download" style="margin-top:8px;">
        <a class="m-item ${t==="downloads"?"active":""}" href="/downloads" style="${c}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>
          ${l(r("nav.downloads"))}
        </a>
      </li>`,g=`
      <li class="m-py" style="margin-top:6px;">
        <a class="m-item ${t==="previous-year"?"active":""}" href="/previous-year" style="${c}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h6"/><path d="M9 16h4"/><path d="M7 3v3"/><path d="M17 3v3"/><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 9h8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/></svg>
          ${l(r("nav.previousYear"))}
        </a>
      </li>`,m=`
      <li class="m-submit" style="margin-top:6px;">
        <a class="m-item ${t==="submit"?"active":""}" href="/submit" style="${c}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          ${l(r("nav.submit"))}
        </a>
      </li>`,y=`
      <li class="m-contact" style="margin-top:6px;margin-bottom:8px;">
        <a class="m-item ${t==="contact"?"active":""}" href="/contact" style="${c}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Contact Us
        </a>
      </li>`,k=`
      <li class="m-download-app" style="margin-bottom:8px;">
        <a class="m-item ${t==="download-app"?"active":""}" href="/download-app" style="${c}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2.2"/><path d="M12 7v7"/><path d="m9.5 11.5 2.5 2.5 2.5-2.5"/></svg>
          ${l(r("nav.downloadApp"))}
        </a>
      </li>`;i.push(u,d,k,h,g,m,y),e.innerHTML=i.join(""),M("[data-toggle]",e).forEach(x=>{x.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation();const v=f(`#msub-${x.dataset.target}`);v&&(v.classList.toggle("open"),x.classList.toggle("open"))})})}function we(){let e=window.location.pathname.replace(/^\/|\/$/g,"");return window.location.search&&window.location.search.startsWith("?/")&&(e=window.location.search.slice(2).replace(/~and~/g,"&"),window.history.replaceState(null,null,"/"+e)),e.split("/").filter(Boolean)}function et(){return we().filter(e=>e!=="category"&&e!=="topic"&&e!=="mock-test").join("/")}function tt(e){window.history.pushState(null,null,e),ye(),ke(),$e()}function je(){const e=document.documentElement,t=e.style.scrollBehavior;e.style.scrollBehavior="auto",window.scrollTo(0,0),e.style.scrollBehavior=t}function oa(){try{const e=we();let t="axomexam | Assam Exam Preparation – Mock Tests, Previous Papers & PDF Notes",a="Free bilingual (Assamese & English) Q&A, mock tests and PDF notes for Assam exam, ADRE, APSC and Assam Police preparation.";if(e[0]==="topic"){const i=p.topicMap[e.slice(1).join("/")];if(i){const c=b(i.topic.title||i.title);t=c?c+" | axomexam":t;const d=b(i.topic.description||i.desc);d&&(a=d)}}else if(e[0]==="category"&&e[1]){const i=p.categories.find(c=>c.id===e[1]);if(i){const c=b(i.name);t=c?c+" | axomexam":t;const d=b(i.description);d&&(a=d)}}else if(e[0]==="mock-test"){const i=p.categories.find(d=>d.id===e[1]),c=i?b(i.name):"";t=(c?c+" ":"")+"Mock Test | axomexam"}else if(e[0]==="previous-year")t="Previous Year Question Papers | axomexam";else if(e[0]==="trending")t="Trending Topics | axomexam";else if(e[0]==="downloads")t="Download Free PDF Notes | axomexam";else if(e[0]==="download-app")t="Download axomexam App (APK) | axomexam",a="Download the free axomexam Android app (APK, v1.9) — mock tests, bilingual Q&A practice, e-books and previous year papers for ADRE, APSC, Assam Police, SSC & Railway exams.";else if(e[0]==="ebooks")t=e[1]?"Read E-Book Online | axomexam":"E-Books Library | axomexam",a="Free online e-books for Assam competitive exams (ADRE, APSC, Assam Police) — Assam History, Indian History, Art & Culture, Polity, Economy and Geography. Read online in English and Assamese, no PDF download.";else if(e[0]==="exams"){const i=(p.exams||[]).find(m=>m.id===e[1]),c=i?b(i.title):"",d=i&&e[2]?(i.sections||[]).find(m=>m.id===e[2]):null,u=d?b(d.title):"",h=d&&e[3]?(d.subcategories||[]).find(m=>m.id===e[3]):null,g=h?b(h.title):"";g?(t=g+(u?" — "+u:"")+" | axomexam",a="Practise "+g+" MCQs with answers and explanations for Assam Police Constable (AB & UB) and other competitive exams in Assam."):u?t=u+(c?" — "+c:"")+" | axomexam":e[1]?t=(c?c+" ":"")+"Exam Book | axomexam":t="Your Exams | axomexam",g||(a="Choose your exam and prepare subject-wise — syllabus, Elementary Mathematics, General English, Logical Reasoning & Mental Ability, Assam's History, Geography & Culture and General Knowledge & Current Affairs. Read online in English and Assamese, no download.")}else if(e[0]==="current-affairs"){const i=(e[1]||"").replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase());i?(t=i+" Current Affairs Q&A | axomexam",a="Free "+i+" current affairs questions with explained answers in Assamese and English — updated regularly by the axomexam team."):(t="Free Current Affairs Questions & Answers | axomexam",a="Free bilingual current affairs Q&A for Assam competitive exams — sports, awards, appointments, economy, environment and more, updated by the axomexam team.")}else e[0]==="categories"?t="All Categories | axomexam":["about","privacy","privacy-policy","terms","disclaimer","contact","submit"].includes(e[0])&&(t=({about:"About Us",privacy:"Privacy Policy","privacy-policy":"Privacy Policy",terms:"Terms & Conditions",disclaimer:"Disclaimer",contact:"Contact Us",submit:"Submit Q&A"}[e[0]]||"axomexam")+" | axomexam");document.title=t;let n=document.querySelector('meta[name="description"]');n||(n=document.createElement("meta"),n.name="description",document.head.appendChild(n)),n.content=a;let s=window.location.pathname;s.endsWith("/")||(s+="/");const o=document.querySelector('link[rel="canonical"]');o&&(o.href=window.location.origin+s)}catch{}}async function $e(){if(!p.ready)return;const e=we(),t=f("#app");if(se(),De(),In(e),je(),oa(),ht(),e[0]!=="mock-test"&&p.mock&&p.mock.timerId&&(Pe(),p.mock=null),p.lang=Ka(e)?"en":"as",document.body.setAttribute("data-lang",p.lang),e.length===0)return ia(t);if(e[0]==="category"){const a=p.categories.find(n=>n.id===e[1]);return a?e.length>=2&&e[2]?ca(t,e):la(t,a):B(t)}if(e[0]==="topic"){const a=e.slice(1).join("/"),n=p.topicMap[a];return n?st(t,n):B(t)}if(["about","privacy","privacy-policy","terms","disclaimer"].includes(e[0])){const a=e[0]==="privacy-policy"?"privacy":e[0];return fa(t,a)}return e[0]==="contact"?ga(t):e[0]==="trending"?ma(t):e[0]==="previous-year"?Qa(t,e):e[0]==="categories"?ya(t):e[0]==="search"?va(t):e[0]==="downloads"?wa(t):e[0]==="download-app"?Ga(t):e[0]==="ebooks"?e[1]?Ca(t,e[1]):$a(t):e[0]==="exams"?e[1]&&e[2]&&e[3]&&e[4]?Na(t,e[1],e[2],e[3],e[4]):e[1]&&e[2]&&e[3]?Fa(t,e[1],e[2],e[3]):e[1]&&e[2]?Oa(t,e[1],e[2]):e[1]?Ra(t,e[1]):Ta(t):e[0]==="current-affairs"?e[1]?qa(t,e[1]):La(t):e[0]==="submit"?Ua(t):e[0]==="mock-test"?Ja(t,e):B(t)}function ia(e){const t=p.topicIndex.reduce((i,c)=>i+(c.nQuestions||0),0)+Ve+(p.examQuestionTotal||0)+(p.caQuestionTotal||0),a=p.topicIndex.length+p.topicIndex.filter(i=>i.pdf).length,n=at(p.topicIndex).slice(0,typeof CONFIG<"u"?CONFIG.TRENDING_COUNT:6),s=p.categories[0]?.id||"gk";e.innerHTML=`
      <section class="hero reveal visible">
        <div class="hero-content">
          <a class="hero-badge" href="/mock-test">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
            ${r("hero.daily")} • ADRE 3.0 / RRB
          </a>
          <h1>${r("hero.title")||"Crack Assam Competitive Exams with Bilingual Q&A & PDF Notes"}</h1>
          <p class="sub">${r("hero.sub")||"Practice thousands of questions for Assam competitive exams and download printable PDF notes in both Assamese and English — for ADRE 3.0, APSC, Assam Police, SSC, Railway & more."}</p>
          <div class="hero-stats">
            <div class="stat"><b id="stat-total-questions">${t.toLocaleString()}+</b><span>${r("stat.questions")}</span></div>
            <div class="stat"><b>${p.topicIndex.length}+</b><span>${r("stat.topics")}</span></div>
            <div class="stat"><b id="stat-total-pdfs">${a}+</b><span>${r("stat.pdfs")}</span></div>
          </div>
        </div>
        ${ra()}
      </section>

      <section class="section feat-sec">
        <div class="section-head reveal">
          <div>
            <h2>${p.uiLang==="as"?"সুবিধাসমূহ":"Features"}</h2>
            <p class="sec-sub">${p.uiLang==="as"?"আৰম্ভ কৰিবলৈ এটা বিকল্প বাছনি কৰক":"Quick ways to start your preparation"}</p>
          </div>
        </div>
        <div class="feat-grid">
          <a class="feat-card reveal" href="/category/${s}" style="--fc:#4f46e5">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
            <span class="feat-body"><b>${p.uiLang==="as"?"বিনামূলীয়াকৈ অনুশীলন আৰম্ভ কৰক":"Free Practicing"}</b><span>${p.uiLang==="as"?"বিষয়ভিত্তিক প্ৰশ্ন অনুশীলন":"Practice Q&A by subject"}</span></span>
          </a>
          <a class="feat-card reveal" href="/mock-test" style="--fc:#0ea5e9">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/></svg></span>
            <span class="feat-body"><b>${p.uiLang==="as"?"বিনামূলীয়াকৈ মক টেষ্ট দিয়ক":"Free Mock Test"}</b><span>${p.uiLang==="as"?"সময়বদ্ধ পৰীক্ষা-ধৰণৰ টেষ্ট":"Timed exam-pattern tests"}</span></span>
          </a>
          <a class="feat-card reveal" href="/ebooks" style="--fc:#f59e0b">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg></span>
            <span class="feat-body"><b>${p.uiLang==="as"?"বিনামূলীয়া ই-বুক":"Free eBooks"}</b><span>${p.uiLang==="as"?"যিকোনো সময়ত অনলাইন পঢ়ক":"Read online, anytime"}</span></span>
          </a>
          <a class="feat-card reveal" href="/exams" style="--fc:#8b5cf6">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span>
            <span class="feat-body"><b>${p.uiLang==="as"?"বিনামূলীয়া পৰীক্ষা-বহী":"Free Exam Books"}</b><span>${p.uiLang==="as"?"পৰীক্ষা-ভিত্তিক প্ৰস্তুতি":"Exam-wise preparation"}</span></span>
          </a>
          <a class="feat-card reveal" href="/previous-year" style="--fc:#10b981">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>
            <span class="feat-body"><b>${p.uiLang==="as"?"পূৰ্ববৰ্তী বছৰৰ প্ৰশ্ন":"Previous Year Questions"}</b><span>${p.uiLang==="as"?"পূৰ্বৰ প্ৰশ্নপত্ৰসমূহ":"Solved past papers"}</span></span>
          </a>
          <a class="feat-card reveal" href="/category/articles" style="--fc:#e11d48">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg></span>
            <span class="feat-body"><b>${p.uiLang==="as"?"বিনামূলীয়া সবিশেষ প্ৰবন্ধ":"Free Detailed Articles"}</b><span>${p.uiLang==="as"?"অধ্যয়ন প্ৰবন্ধ":"Study articles"}</span></span>
          </a>
          <a class="feat-card reveal" href="/downloads" style="--fc:#0d9488">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg></span>
            <span class="feat-body"><b>${p.uiLang==="as"?"বিনামূলীয়া PDF টোকা":"Free PDF Notes"}</b><span>${p.uiLang==="as"?"প্ৰিন্ট কৰিব পৰা PDF নোট":"Printable PDF notes"}</span></span>
          </a>
          <a class="feat-card reveal" href="/current-affairs" style="--fc:#ef4444">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/><path d="M8 16h3"/></svg></span>
            <span class="feat-body"><b>${p.uiLang==="as"?"বিনামূলীয়া চলিত ঘটনাৱলী":"Free Current Affairs"}</b><span>${p.uiLang==="as"?"দৈনিক প্ৰশ্ন আৰু ব্যাখ্যা":"Updated Q&A with answers"}</span></span>
          </a>
        </div>
        <style>
          .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
          .feat-card { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 20px 16px; border-radius: 18px; border: 1px solid var(--line); background: radial-gradient(140% 140% at 100% 0%, color-mix(in srgb, var(--fc) 13%, transparent), transparent 58%), linear-gradient(180deg, var(--bg), var(--bg-soft)); box-shadow: var(--card-shadow); overflow: hidden; isolation: isolate; transition: transform .28s cubic-bezier(.22, .61, .36, 1), box-shadow .28s, border-color .28s; }
          .feat-card::before { content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, color-mix(in srgb, var(--fc) 78%, transparent), transparent 46%, color-mix(in srgb, var(--fc) 45%, transparent)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude; opacity: 0; transition: opacity .28s; pointer-events: none; }
          .feat-card::after { content: ""; position: absolute; top: 0; bottom: 0; left: -120%; width: 55%; background: linear-gradient(100deg, transparent, color-mix(in srgb, var(--fc) 26%, transparent), transparent); transform: skewX(-18deg); transition: left .75s cubic-bezier(.22, .61, .36, 1); pointer-events: none; }
          .feat-card:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--fc) 42%, var(--line)); box-shadow: 0 20px 42px -20px color-mix(in srgb, var(--fc) 60%, transparent), var(--card-shadow-hover); }
          .feat-card:hover::before { opacity: 1; }
          .feat-card:hover::after { left: 145%; }
          .feat-card:active { transform: translateY(-2px) scale(.99); }
          .feat-ico { flex: 0 0 auto; width: 50px; height: 50px; border-radius: 15px; display: grid; place-items: center; color: #fff; background: linear-gradient(145deg, color-mix(in srgb, var(--fc) 82%, #fff), var(--fc) 52%, color-mix(in srgb, var(--fc) 68%, #000)); box-shadow: 0 12px 24px -12px color-mix(in srgb, var(--fc) 90%, transparent), inset 0 1px 0 rgba(255, 255, 255, .4); transition: transform .28s cubic-bezier(.22, .61, .36, 1), box-shadow .28s; }
          .feat-card:hover .feat-ico { transform: scale(1.07) rotate(-4deg); box-shadow: 0 16px 30px -12px color-mix(in srgb, var(--fc) 95%, transparent), inset 0 1px 0 rgba(255, 255, 255, .5); }
          .feat-ico svg { width: 23px; height: 23px; }
          .feat-body { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 3px; min-width: 0; }
          .feat-body b { font-size: .98rem; font-weight: 700; letter-spacing: -.2px; color: var(--ink); }
          .feat-body span { font-size: .775rem; line-height: 1.35; color: var(--ink-faint); }
          @media (max-width: 640px) {
            .feat-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
            .feat-card { gap: 9px; padding: 16px 12px; border-radius: 16px; min-height: 118px; }
            .feat-ico { width: 44px; height: 44px; border-radius: 13px; }
            .feat-ico svg { width: 21px; height: 21px; }
            .feat-body b { font-size: .9rem; }
            .feat-body span { font-size: .71rem; }
          }
        </style>
      </section>

      <section class="section">
        <div class="section-head reveal">
          <div>
            <h2>${r("home.categories")}</h2>
            <p class="sec-sub">${r("home.categories.sub")}</p>
          </div>
        </div>
        <div class="cat-grid">
          ${Xe().map((i,c)=>{const d=I(i.id);return`
              <a class="cat-card reveal" href="/category/${i.id}" data-cat="${i.id}" style="--cat:${d}" data-delay="${c*60}">
                <span class="cat-ico">${J(i.id)}</span>
                <span class="cat-meta">
                  <b>${l(b(i.name))}</b>
                  <span>${i.id==="articles"?p.uiLang==="as"?"প্ৰবন্ধসমূহ":"Articles":`<span class="cat-count">${ze(i)}</span> ${i.id==="study-guides"?p.uiLang==="as"?"টা গাইড":"Guides":r("cat.topics")}`}</span>
                </span>
              </a>`}).join("")}
        </div>
        <style>
          @media (min-width: 544px) and (max-width: 799px) {
            .cat-card[data-cat="articles"] { grid-column: 2; }
          }
        </style>
      </section>

      <section class="section" style="padding-bottom: 40px;">
        <div class="section-head reveal">
          <div>
            <h2>${r("home.trending")}</h2>
            <p class="sec-sub">${r("home.trending.sub")}</p>
          </div>
          <a class="see-all" href="/trending">${r("see.all")}</a>
        </div>
        <div class="trend-grid">
          ${n.map((i,c)=>`
            <a class="topic-card reveal" href="/topic/${i.path}" style="--cat:${I(i.cat.id)}" data-delay="${c*50}">
              <span class="topic-ico">${_(i.topic.id,i.cat.id)}</span>
              <span class="rank">${c+1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${l(b(i.title))}</span>
                <span id="trend-count-${i.path.replace(/\//g,"-")}">${l(b(i.cat.name))} • ${i.cat.id==="study-guides"?p.uiLang==="as"?"পঢ়ক →":"Read Guide →":`${i.nQuestions||0} ${r("topic.questions")}`}</span>
              </span>
              <span class="trend-flame">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
              </span>
            </a>`).join("")}
        </div>
      </section>

      <section class="section" style="padding-bottom:40px;">
        <div class="section-head reveal">
          <div>
            <h2>Assam Exam Preparation at Your Fingertips</h2>
            <p class="sec-sub">Free mock tests, previous year papers & study notes for every Assam competitive exam</p>
          </div>
        </div>
        <style>
          .seo-read-more { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
          .seo-read-more.expanded { display:block; -webkit-line-clamp:unset; }
        </style>
        <div style="max-width:860px; margin:0 auto; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:26px 28px; box-shadow:0 6px 20px -8px rgba(15,23,42,0.06); text-align:left;">
          <div class="seo-read-more" id="seo-read-more">
            <p style="font-size:0.97rem; line-height:1.8; color:var(--ink-soft,#334155); margin:0 0 14px 0;">
              <b style="color:var(--ink,#0f172a);">axomexam</b> is a free bilingual study platform built for <b>Assam exam</b> aspirants — however you search for it, whether <b>axom exam</b>, <b>assam exam</b> or <b>assamexam</b>. Whether you are preparing for the <b>ADRE</b> (Assam Direct Recruitment Examination), <b>APSC</b>, <b>Assam Police</b>, or central exams like SSC and Railway, you will find thousands of practice questions, mock tests and previous year papers — all available in both English and Assamese. Many students look for the <b>exam Assam</b> or <b>exam Axom</b> (অসম পৰীক্ষা), and <b>axomexam</b> makes sure every major Assam government recruitment exam is covered here.
            </p>
            <p style="font-size:0.97rem; line-height:1.8; color:var(--ink-soft,#334155); margin:0 0 14px 0;">
              From Assam General Knowledge, Assam History and Assam Geography to Indian Polity, Mathematics, Reasoning, General English and Science, the question bank is organised subject-wise so you can practise topic by topic. Each question includes a clear answer and explanation, and every mock test runs on a live timer just like the real exam — completely free, with no registration needed.
            </p>
            <p style="font-size:0.97rem; line-height:1.8; color:var(--ink-soft,#334155); margin:0;">
              Get started with a <a href="/mock-test" style="color:var(--primary,#2563eb); font-weight:700; text-decoration:underline;">free mock test</a>, go through the <a href="/previous-year" style="color:var(--primary,#2563eb); font-weight:700; text-decoration:underline;">previous year solved papers</a>, or download <a href="/downloads" style="color:var(--primary,#2563eb); font-weight:700; text-decoration:underline;">PDF study notes</a> for offline practice.
            </p>
          </div>
          <button id="seo-read-more-btn" type="button" style="margin-top:14px; padding:8px 18px; border-radius:99px; font-weight:800; font-size:0.85rem; cursor:pointer; color:var(--primary,#2563eb); background:var(--primary-soft,#eff6ff); border:1px solid var(--border,#cbd5e1);">Read More</button>
        </div>
      </section>

      <section class="section" style="padding-bottom:40px;">
        <div class="section-head reveal">
          <div>
            <h2>Frequently Asked Questions</h2>
            <p class="sec-sub">Everything you need to know about practising on axomexam</p>
          </div>
        </div>
        <div style="max-width:860px; margin:0 auto; text-align:left;">
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Is axomexam free to use?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. axomexam is completely free. All mock tests, previous year solved papers and PDF notes are available without registration or payment.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Which exams does axomexam cover?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">axomexam covers Assam state exams such as ADRE (Assam Direct Recruitment Examination), APSC, Assam Police / SLPRB, DHS and DME/DTE, as well as central exams including SSC (CGL, CHSL, GD) and Railway (RRB NTPC, Group D).</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Are the questions available in Assamese as well as English?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. Every question, answer and explanation on axomexam is bilingual, so you can practise in both Assamese and English.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Does axomexam provide timed mock tests?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. axomexam mock tests run on a live timer and follow the real exam pattern, with instant results and answer explanations.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Can I download PDF notes and previous year papers?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">Yes. PDF study notes, e-books and previous year solved papers can be downloaded for offline practice.</p>
          </details>
          <details style="border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:16px 20px; margin-bottom:12px; background:var(--card-bg,#fff);">
            <summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">Do I need an account to practise on axomexam?</summary>
            <p style="margin:10px 0 0; color:var(--ink-soft,#334155); line-height:1.8;">No. You can start practising mock tests and questions immediately without creating an account.</p>
          </details>
        </div>
      </section>`;const o=f("#seo-read-more-btn");o&&o.addEventListener("click",()=>{const i=f("#seo-read-more");if(!i)return;const c=i.classList.contains("expanded");i.classList.toggle("expanded",!c),o.textContent=c?"Read More":"Read Less"}),T(),Ha(),vt()}function ra(){const e=typeof CONFIG<"u"&&CONFIG.MOCK&&CONFIG.MOCK.EXAM_NAME||"ADRE / Assam Police",t=new Date(typeof CONFIG<"u"&&CONFIG.MOCK&&CONFIG.MOCK.EXAM_DATE||"2026-12-31").getTime(),a=Date.now(),n=t>a?Math.max(0,Math.ceil((t-a)/864e5)):0;return`
      <div class="hero-visual">
        <div class="countdown-ring">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle class="ring-bg" cx="60" cy="60" r="50"></circle>
            <circle class="ring-fg" cx="60" cy="60" r="50" stroke-dashoffset="${(314*(1-(t>a?Math.min(1,n/365):0))).toFixed(1)}"></circle>
          </svg>
          <div class="ring-center">
            <span class="ring-num">${n}</span>
            <span class="ring-label">${r("hero.days")}</span>
            <span class="ring-label">${l(e)}</span>
          </div>
        </div>
        <span class="float-chip c1"><span class="dot"></span>ADRE</span>
        <span class="float-chip c2"><span class="dot"></span>GK & Math</span>
        <span class="float-chip c3"><span class="dot"></span>Assam Police</span>
      </div>`}function at(e){return e.slice().sort((t,a)=>!!t.extra!=!!a.extra?t.extra?-1:1:t.popularity!==a.popularity?a.popularity-t.popularity:(a.nQuestions||0)-(t.nQuestions||0))}function la(e,t){const a=t.subcategories||t.sections||[],n=t.topics||[],s=t.id==="articles";e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a>
          <span class="bc-sep">/</span><span>${l(b(t.name))}</span>
        </nav>
        <h1>${l(b(t.name))}</h1>
        <p class="page-desc">${l(b(t.description))||l(b(t.name))}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${a.length?`
          <div class="sub-grid">
            ${a.map((d,u)=>{const h=!s&&!(d.sections&&d.sections.length)&&!(d.topics&&d.topics.length),g=h?p.topicMap[`${t.id}/${d.id}`]:null,m=s?`/category/${t.id}/${d.id}/read`:h?`/topic/${t.id}/${d.id}`:`/category/${t.id}/${d.id}`,y=s?p.uiLang==="as"?"প্ৰবন্ধ পঢ়ক →":"Read Articles →":h?`<span id="count-${g?g.path.replace(/\//g,"-"):`${t.id}-${d.id}`}">${g&&g.nQuestions>0?`${g.nQuestions} ${r("topic.questions")}`:r("btn.practice")}</span>`:`${(d.sections?d.sections.length:0)||(d.topics?d.topics.length:0)} ${d.sections?r("cat.subsections"):r("cat.topics")}`;return`
              <a class="sub-card reveal" href="${m}" style="--cat:${I(t.id)}" data-delay="${u*50}">
                <span class="sub-ico">${_(d.id,t.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${l(b(d.name))}</span>
                  <span style="font-size:0.75rem; font-weight:${s?"700":"400"}; color:${s?I(t.id):"var(--ink-soft,#64748b)"};">${y}</span>
                </span>
              </a>`}).join("")}
          </div>`:n.length?He(t,null,null,n):Re()}
      </section>`,T();const i=p.topicIndex.filter(d=>d.cat&&d.cat.id===t.id).reduce((d,u)=>d+(u.nQuestions||0),0),c=a.map(d=>({name:b(d.name),count:d.sections&&d.sections.length||d.topics&&d.topics.length||0}));R(e,{id:t.id,name:b(t.name),count:a.length,total:i,h2:b(t.name)+" preparation for Assam exams",items:c})}function ca(e,t){const a=p.categories.find(u=>u.id===t[1]),n=(a.subcategories||a.sections||[]).find(u=>u.id===t[2]);if(!n)return B(e);if(a.id==="articles")return pa(e,a,n);if(t[3]){const u=(n.sections||[]).find(h=>h.id===t[3]);return u?da(e,a,n,u):B(e)}if(!(n.sections&&n.sections.length)&&!(n.topics&&n.topics.length)){const u=p.topicMap[`${a.id}/${n.id}`];if(u)return st(e,u)}const s=n.sections,o=n.topics;e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${a.id}">${l(b(a.name))}</a>
          <span class="bc-sep">/</span><span>${l(b(n.name))}</span>
        </nav>
        <h1>${l(b(n.name))}</h1>
        <p class="page-desc">${l(b(n.description))||""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${s&&s.length?`
          <div class="sub-grid">
            ${s.map((u,h)=>`
              <a class="sub-card reveal" href="/category/${a.id}/${n.id}/${u.id}" style="--cat:${I(a.id)}" data-delay="${h*50}">
                <span class="sub-ico">${_(u.id,a.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${l(b(u.name))}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${(u.topics||[]).length} ${r("cat.topics")}</span>
                </span>
              </a>`).join("")}
          </div>`:o&&o.length?He(a,n,null,o):Re()}
      </section>`,T();const c=p.topicIndex.filter(u=>u.cat&&u.cat.id===a.id&&u.sub&&u.sub.id===n.id).reduce((u,h)=>u+(h.nQuestions||0),0),d=(s&&s.length?s:o||[]).map(u=>({name:b(u.name),count:u.topics&&u.topics.length||0}));R(e,{id:n.id,name:b(n.name),count:d.length,total:c,h2:b(n.name)+" - topics and practice questions",items:d})}function da(e,t,a,n){e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${t.id}">${l(b(t.name))}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${t.id}/${a.id}">${l(b(a.name))}</a>
          <span class="bc-sep">/</span><span>${l(b(n.name))}</span>
        </nav>
        <h1>${l(b(n.name))}</h1>
        <p class="page-desc">${l(b(n.description))||""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${He(t,a,n,n.topics||[])}
      </section>`,T();const o=p.topicIndex.filter(i=>i.cat&&i.cat.id===t.id&&i.sub&&i.sub.id===a.id&&i.section&&i.section.id===n.id).reduce((i,c)=>i+(c.nQuestions||0),0);R(e,{id:n.id,name:b(n.name),count:(n.topics||[]).length,total:o,h2:b(n.name)+" - practice questions and revision",items:(n.topics||[]).map(i=>({name:b(i.name),count:(p.topicMap[[t.id,a.id,n.id,i.id].join("/")]||{}).nQuestions||0,unit:"questions"}))})}function He(e,t,a,n){if(!n.length)return Re();const s=e.id==="study-guides",o=p.uiLang==="as"?"পঢ়ক (Read Guide) →":"Read Guide →";return`
      <div class="sub-grid">
        ${n.map((i,c)=>{const d=[e.id,t?t.id:"",a?a.id:""].filter(Boolean).concat([i.id]).join("/"),u=p.topicMap[d],h=u&&u.nQuestions>0?u.nQuestions:(i.questions||[]).length,g=s?o:h>0?`${h} ${r("topic.questions")}`:r("btn.practice");return`
            <a class="sub-card reveal" href="/topic/${d}" style="--cat:${I(e.id)}" data-delay="${c*50}">
              <span class="sub-ico">${_(i.id,e.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${l(b(i.name))}</span>
                <span id="count-${d.replace(/\//g,"-")}" style="${s?"color:var(--primary,#2563eb); font-weight:700;":""}">${g}</span>
              </span>
            </a>`}).join("")}
      </div>`}function Re(){return`<div class="qa-empty"><div class="big">
      <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/><path d="M9 9h6"/><path d="M9 13h4"/><path d="m15 16 2 2 4-4"/></svg>
    </div><p>${r("search.noresult")}</p></div>`}async function pa(e,t,a){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;let n=null;try{n=await API.getArticles(a.id)}catch{n=null}if(!n||!(n.articles||n.questions||[]).length){const o=p.uiLang==="as";e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${l(b(a.name))}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${o?"এতিয়ালৈকে ইয়াত কোনো প্ৰবন্ধ যোগ কৰা হোৱা নাই।":"No articles have been added here yet."}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/category/${t.id}">${o?"পিছলৈ যাওক":"Go Back"}</a></div>
        </div>`;return}const s={path:`articles/${a.id}`,cat:t,sub:a,section:null,topic:{id:a.id,title:n&&n.title||a.name,description:n&&n.description||a.description||{},questions:n&&(n.articles||n.questions)||[]}};ot(e,s)}function nt(e){const t=[`<a href="/">${r("breadcrumb.home")}</a>`];return t.push(`<a href="/category/${e.cat.id}">${l(b(e.cat.name))}</a>`),e.sub&&t.push(`<a href="/category/${e.cat.id}/${e.sub.id}">${l(b(e.sub.name))}</a>`),e.section&&t.push(`<a href="/category/${e.cat.id}/${e.sub?e.sub.id+"/":""}${e.section.id}">${l(b(e.section.name))}</a>`),t.map((a,n)=>(n?'<span class="bc-sep">/</span>':"")+a).join("")}async function st(e,t){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;try{const n=await API.getTopic(t.cat.id,t.topic.id,t.sub&&t.sub.id,t.cat&&t.cat.contentLayout);n&&(t.topic=Object.assign({},t.topic,n),t.topic.title=t.topic.title||t.title,t.nQuestions=(n.questions||[]).length)}catch{}if(t.cat.id==="study-guides")return ot(e,t);p.page=0;const a=t.topic.questions||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">${nt(t)}</nav>
        <h1>${l(b(t.topic.title))}</h1>
        <p class="page-desc">${l(b(t.topic.description))||""}</p>
      </div>

      <div class="topic-layout" style="max-width:100%; margin:0 auto;">
        <div>
          <div class="qa-toolbar" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px; margin-bottom:16px;">
            <span class="qt-info" style="font-weight:700; font-size:0.92rem; color:var(--ink-soft,#64748b);">${a.length} ${r("topic.questions")}</span>
            <div class="qa-actions" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-sm btn-outline qa-tool-btn" id="qa-reading" type="button" style="display:inline-flex; align-items:center; gap:6px; font-weight:700;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
                Reading Mode
              </button>
              <div class="lang-switch" role="group" aria-label="Reading language" style="display:inline-flex; border-radius:10px; overflow:hidden; border:1px solid var(--border,#cbd5e1);">
                <button class="lang-btn ${p.lang==="as"?"active":""}" type="button" data-lang="as" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${r("topic.lang.as")}</button>
                <button class="lang-btn ${p.lang==="en"?"active":""}" type="button" data-lang="en" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${r("topic.lang.en")}</button>
              </div>
            </div>
          </div>
          <div id="qa-list" class="qa-list" style="width:100%; box-sizing:border-box;"></div>
          <div id="pager" style="display:flex; justify-content:center; align-items:center; gap:12px; margin-top:24px;"></div>
        </div>
      </div>
    `,X(),f("#qa-reading").addEventListener("click",ha),M(".lang-btn").forEach(n=>{n.addEventListener("click",()=>{p.lang=n.dataset.lang,document.body.setAttribute("data-lang",p.lang),M(".lang-btn").forEach(s=>s.classList.toggle("active",s.dataset.lang===p.lang)),X(),Be()})})}function ot(e,t){const a=t.topic.questions||t.topic.sections||[],n=p.lang==="as",o=t.cat&&t.cat.id==="articles"?n?"প্ৰবন্ধ পঢ়া • পঢ়া-মাত্ৰ":"Read Articles • Reading Only":n?"সম্পূৰ্ণ অধ্যয়ন নিৰ্দেশিকা (Theory Guide)":"Complete In-Depth Study Guide";e.innerHTML=`
      <div class="page-head" style="text-align:left; max-width:860px; margin:0 auto 20px auto; padding:0 16px; box-sizing:border-box;">
        <nav class="breadcrumb">${nt(t)}</nav>
        <h1 class="art-main-title">${l(b(t.topic.title))}</h1>
        <p class="page-desc" style="font-size:0.96rem; line-height:1.6; color:var(--ink-soft,#475569); margin:0 0 16px 0;">${l(b(t.topic.description))||""}</p>
        
        <div class="art-top-bar">
          <span style="font-size:0.82rem; font-weight:800; color:var(--primary,#2563eb); text-transform:uppercase; letter-spacing:0.5px; display:inline-flex; align-items:center; gap:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
            ${o}
          </span>
          <div class="art-lang-switch-box" role="group" aria-label="Article Language">
            <button class="art-glang-btn ${p.lang==="as"?"active":""}" type="button" data-lang="as">
              <span class="active-dot"></span>অসমীয়া
            </button>
            <button class="art-glang-btn ${p.lang==="en"?"active":""}" type="button" data-lang="en">
              <span class="active-dot"></span>English
            </button>
          </div>
        </div>
      </div>

      <div class="article-wrapper" style="max-width:860px; margin:0 auto; padding:0 16px 50px 16px; box-sizing:border-box;">
        <article id="article-body-content" class="article-card-box"></article>
      </div>

      <style>
        .art-main-title { font-size: 1.8rem; font-weight: 900; line-height: 1.35; color: var(--ink, #0f172a); margin-bottom: 10px; letter-spacing: -0.3px; }
        .art-top-bar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--border, #e2e8f0); border-bottom: 1px solid var(--border, #e2e8f0); padding: 12px 0; }
        .art-lang-switch-box { display: inline-flex; background: var(--bg-subtle, #f1f5f9); border: 1.5px solid var(--border, #cbd5e1); border-radius: 24px; padding: 3px; gap: 2px; }
        .art-glang-btn { display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px; font-weight: 700; font-size: 0.82rem; border-radius: 20px; border: none; cursor: pointer; transition: all 0.2s ease-in-out; background: transparent; color: var(--ink-soft, #64748b); }
        .art-glang-btn .active-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; display: none; }
        .art-glang-btn.active { background: #2563eb !important; color: #ffffff !important; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35); }
        .art-glang-btn.active .active-dot { display: inline-block; }
        .article-card-box { background: var(--card-bg, #ffffff); border: 1px solid var(--border, #e2e8f0); border-radius: 20px; padding: 36px 32px; box-shadow: 0 10px 30px -6px rgba(15,23,42,0.04); text-align: left; }
        .article-part-block { margin-bottom: 34px; padding-bottom: 26px; border-bottom: 1px dashed var(--border, #e2e8f0); }
        .article-part-block:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .art-headline { font-size: 1.3rem; font-weight: 800; color: var(--ink, #0f172a); margin: 0 0 14px 0; line-height: 1.4; display: flex; align-items: flex-start; gap: 8px; }
        .art-paragraph { font-size: 1.02rem; line-height: 1.85; color: var(--ink-soft, #334155); margin: 0 0 16px 0; text-align: left; word-break: break-word; font-weight: 400; }
        .art-keynote { background: var(--bg-subtle, #f8fafc); border-left: 4px solid var(--primary, #2563eb); padding: 14px 18px; border-radius: 10px; font-size: 0.92rem; line-height: 1.65; color: var(--ink-muted, #475569); border-top: 1px solid var(--border, #f1f5f9); border-right: 1px solid var(--border, #f1f5f9); border-bottom: 1px solid var(--border, #f1f5f9); }
        
        @media (max-width: 640px) {
          .art-main-title { font-size: 1.35rem !important; line-height: 1.35 !important; }
          .article-card-box { padding: 20px 16px !important; border-radius: 14px !important; }
          .art-headline { font-size: 1.12rem !important; }
          .art-paragraph { font-size: 0.95rem !important; line-height: 1.75 !important; }
          .art-top-bar { justify-content: center !important; flex-direction: column !important; text-align: center !important; gap: 10px !important; }
          .art-lang-switch-box { width: 100% !important; justify-content: center !important; }
          .art-glang-btn { flex: 1 !important; justify-content: center !important; padding: 8px 0 !important; }
        }

        [data-theme="dark"] .article-card-box { background: var(--bg-soft, #0f172a) !important; border-color: var(--border, #2b3a55) !important; }
        [data-theme="dark"] .art-lang-switch-box { background: #0f172a !important; border-color: #334155 !important; }
        [data-theme="dark"] .art-glang-btn { color: #94a3b8 !important; }
        [data-theme="dark"] .art-keynote { background: #1e293b !important; border-color: #334155 !important; color: #cbd5e1 !important; }
      </style>
    `;const i=()=>{const c=f("#article-body-content");c&&(c.innerHTML=a.map((d,u)=>{const h=q(d,"question"),g=q(d,"answer"),m=q(d,"explanation");return`
          <div class="article-part-block">
            <h2 class="art-headline">
              <span>${S(h)}</span>
            </h2>
            <div class="art-paragraph">${S(g)}</div>
            ${m?`
              <div class="art-keynote">
                <b style="color:var(--primary,#2563eb);">${p.lang==="as"?"গুৰুত্বপূৰ্ণ বিষয় (Key Takeaway)":"Key Highlights"}:</b> ${S(m)}
              </div>`:""}
          </div>
        `}).join(""),U(c))};i(),M(".art-glang-btn").forEach(c=>{c.addEventListener("click",()=>{const d=c.dataset.lang;p.lang!==d&&(p.lang=d,document.body.setAttribute("data-lang",p.lang),M(".art-glang-btn").forEach(u=>{u.classList.toggle("active",u.dataset.lang===p.lang)}),i())})})}function X(){const e=Ce();if(!e)return;const t=e.topic.questions||[],a=typeof CONFIG<"u"?CONFIG.PER_PAGE:10,n=Math.max(1,Math.ceil(t.length/a)),s=p.page*a,o=t.slice(s,s+a),i=f("#qa-list"),c=/(?:^|\/)(image-series|image-analogy)$/.test(e.path||"");i.classList.toggle("nv-fig-wide",c),o.length?(i.innerHTML=o.map((u,h)=>{const g=s+h+1,m=q(u,"question"),y=q(u,"answer"),k=j(u),x=q(u,"explanation"),w=V(u),v=K(u),C=p.mock&&p.mock.testLang?p.mock.testLang:p.lang,A=u.a&&typeof u.a=="object"&&u.a[C]||u.a||u.answer;return Array.isArray(A)||y.includes("qa-step-line")?`
            <article class="qa-card" data-n="${g}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
                ${g}. ${S(m)}
              </div>
              ${w}
              ${v?Q(u,{compact:!0}):k.length?`
                <div class="qa-options-inline" style="margin:0 0 12px 0; padding:0; font-size:0.92rem; color:var(--ink-soft,#334155); display:flex; flex-direction:column; gap:6px; font-weight:500; text-align:left; align-items:flex-start;">
                  ${k.map((E,L)=>{const z=`(${String.fromCharCode(65+L)}) ${E}`;return`<span>${S(z)}</span>`}).join("")}
                </div>`:""}
              <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
                <div class="a-body" style="margin:0; padding:0; text-align:left;">${y}</div>
                ${x?`
                  <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                    <b style="color:var(--ink,#0f172a);">${p.lang==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${x}
                  </div>`:""}
              </div>
            </article>`:`
            <article class="qa-card" data-n="${g}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
                <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${g}</span>
                <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${S(m)}</span>
              </div>
              ${w}
              ${v?Q(u):k.length?`
                <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                  ${k.map((E,L)=>`
                    <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
                      <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65+L)})</b> 
                      <span style="flex:1; line-height:1.4;">${S(E)}</span>
                    </div>
                  `).join("")}
                </div>`:""}
              <div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
                <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${r("topic.answer")}:</span>
                <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${S(y)}</span>
              </div>
              ${x?`
                <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
                  <b style="color:var(--ink,#0f172a);">${p.lang==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${S(x)}
                </div>`:""}
            </article>`}).join(""),U(i)):i.innerHTML=`<div class="qa-empty"><div class="big">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
      </div><p>${r("toast.noquestions")}</p></div>`;const d=f("#pager");n>1?(d.innerHTML=`
        <button id="pg-prev" class="btn btn-sm btn-outline" ${p.page===0?"disabled":""} style="padding:6px 14px; font-weight:700;">${r("topic.prev")}</button>
        <span class="pager-info" style="font-weight:700; font-size:0.88rem; color:var(--ink-soft,#64748b);">${p.page+1} / ${n}</span>
        <button id="pg-next" class="btn btn-sm btn-outline" ${p.page>=n-1?"disabled":""} style="padding:6px 14px; font-weight:700;">${r("topic.next")}</button>`,f("#pg-prev").addEventListener("click",()=>{p.page>0&&(p.page--,X(),Be(),window.scrollTo({top:0,behavior:"smooth"}))}),f("#pg-next").addEventListener("click",()=>{p.page<n-1&&(p.page++,X(),Be(),window.scrollTo({top:0,behavior:"smooth"}))})):d.innerHTML=""}function ua(){let e=f("#read-modal");return e||(e=document.createElement("div"),e.id="read-modal",e.className="read-modal",e.hidden=!0,e.innerHTML=`
      <div class="read-modal-backdrop" id="read-modal-backdrop"></div>
      <div class="read-modal-box" role="dialog" aria-modal="true" style="max-width:760px; width:92%; margin:auto; border-radius:18px; text-align:left; background:var(--bg,#ffffff);">
        <div class="read-modal-head" style="display:flex; justify-content:space-between; align-items:center; padding:16px 20px; border-bottom:1px solid var(--border,#e2e8f0);">
          <div class="read-modal-titles" style="text-align:left;">
            <span class="read-modal-title" style="font-size:1.15rem; font-weight:800; display:block; color:var(--ink,#0f172a);"></span>
            <span class="read-modal-sub" style="font-size:0.82rem; color:var(--ink-muted,#64748b);"></span>
          </div>
          <button id="read-modal-close" class="read-close" type="button" aria-label="Close" style="background:transparent; border:none; cursor:pointer; padding:6px;">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <div class="read-modal-body" id="read-modal-body" style="padding:20px; max-height:70vh; overflow-y:auto; text-align:left; box-sizing:border-box;"></div>
        <div class="read-modal-foot" style="display:flex; justify-content:space-between; align-items:center; padding:14px 20px; border-top:1px solid var(--border,#e2e8f0);">
          <button id="read-prev" type="button" class="btn btn-sm btn-outline" style="padding:6px 16px; font-weight:700;">${r("topic.prev")}</button>
          <span class="read-pageinfo" id="read-pageinfo" style="font-weight:700; font-size:0.88rem; color:var(--ink-soft,#64748b);"></span>
          <button id="read-next" type="button" class="btn btn-sm btn-outline" style="padding:6px 16px; font-weight:700;">${r("topic.next")}</button>
        </div>
      </div>`,document.body.appendChild(e),f("#read-modal-close",e).addEventListener("click",De),f("#read-modal-backdrop",e).addEventListener("click",De),f("#read-prev",e).addEventListener("click",()=>{if(p.page>0){p.page--,X(),Ae();const t=f("#read-modal-body");t&&(t.scrollTop=0)}}),f("#read-next",e).addEventListener("click",()=>{const t=Ce();if(!t)return;const a=t.topic.questions||[],n=typeof CONFIG<"u"?CONFIG.PER_PAGE:10,s=Math.max(1,Math.ceil(a.length/n));if(p.page<s-1){p.page++,X(),Ae();const o=f("#read-modal-body");o&&(o.scrollTop=0)}}),e)}function ha(){const e=Ce();if(!e)return;const t=ua(),a=e.topic.questions||[];f(".read-modal-title",t).textContent=b(e.topic.title),f(".read-modal-sub",t).textContent=`${a.length} ${r("topic.questions")} • ${p.lang==="as"?r("topic.lang.as"):r("topic.lang.en")}`,t.hidden=!1,Ae()}function De(){const e=f("#read-modal");e&&(e.hidden=!0)}function Ae(){const e=Ce(),t=f("#read-modal");if(!e||!t||t.hidden)return;const a=e.topic.questions||[],n=typeof CONFIG<"u"?CONFIG.PER_PAGE:10,s=Math.max(1,Math.ceil(a.length/n)),o=p.page*n,i=a.slice(o,o+n);f(".read-modal-sub",t).textContent=`${a.length} ${r("topic.questions")} • ${p.lang==="as"?r("topic.lang.as"):r("topic.lang.en")}`;const c=f("#read-modal-body",t);c.innerHTML=i.map((d,u)=>{const h=o+u+1,g=q(d,"question"),m=q(d,"answer"),y=j(d),k=V(d),x=K(d),w=p.mock&&p.mock.testLang?p.mock.testLang:p.lang,v=d.a&&typeof d.a=="object"&&d.a[w]||d.a||d.answer;return Array.isArray(v)||m.includes("qa-step-line")?`
          <article class="qa-card read-item" data-n="${h}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="margin:0 0 8px 0; padding:0; font-size:0.96rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
              ${h}. ${S(g)}
            </div>
            ${k}
            ${x?Q(d,{compact:!0}):y.length?`
              <div class="qa-options-inline" style="margin:0 0 10px 0; padding:0; display:flex; flex-direction:column; gap:6px; font-size:0.9rem; color:var(--ink-soft,#334155); font-weight:500; text-align:left; align-items:flex-start;">
                ${y.map((A,P)=>{const E=`(${String.fromCharCode(65+P)}) ${A}`;return`<span>${S(E)}</span>`}).join("")}
              </div>`:""}
            <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:8px; margin:0; font-size:0.88rem; color:var(--ink-soft,#334155); line-height:1.6; text-align:left;">
              <div class="a-body" style="margin:0; padding:0; text-align:left;">${m}</div>
            </div>
          </article>`:`
          <article class="qa-card read-item" data-n="${h}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 8px 0; padding:0; text-align:left;">
              <span class="qno" style="flex-shrink:0; width:26px; height:26px; border-radius:6px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.84rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; margin-top:1px;">${h}</span>
              <span class="qtext" style="flex:1; font-weight:500; font-size:0.94rem; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">${S(g)}</span>
            </div>
            ${k}
            ${x?Q(d):y.length?`
              <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                ${y.map((A,P)=>`
                  <div style="font-size:0.86rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:7px 10px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
                    <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65+P)})</b>
                    <span style="flex:1; line-height:1.4;">${S(A)}</span>
                  </div>
                `).join("")}
              </div>`:""}
            <div class="qa-a" style="margin:6px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
              <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); font-size:0.9rem;">${r("topic.answer")}:</span>
              <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); font-size:0.9rem; line-height:1.45;">${S(m)}</span>
            </div>
          </article>`}).join(""),U(c),f("#read-pageinfo",t).textContent=`${p.page+1} / ${s}`,f("#read-prev",t).disabled=p.page===0,f("#read-next",t).disabled=p.page>=s-1}function Be(){const e=f("#read-modal");!e||e.hidden||Ae()}function Ce(){const e=we();return e[0]!=="topic"?null:p.topicMap[e.slice(1).join("/")]}function ma(e){const t=at(p.topicIndex);e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("page.trending.title")}</span></nav>
        <h1>${r("page.trending.title")}</h1>
        <p class="page-desc">${r("page.trending.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="simple-list">
          ${t.map((a,n)=>`
            <a class="topic-card reveal" href="/topic/${a.path}" style="--cat:${I(a.cat.id)}" data-delay="${n%10*40}">
              <span class="topic-ico">${_(a.topic.id,a.cat.id)}</span>
              <span class="rank">${n+1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${l(b(a.title))}</span>
                <span id="trend-count-${a.path.replace(/\//g,"-")}">${l(b(a.cat.name))}${a.sub?" • "+l(b(a.sub.name)):""} • ${a.cat.id==="study-guides"?p.uiLang==="as"?"পঢ়ক →":"Read Guide →":`${a.nQuestions||0} ${r("topic.questions")}`}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`,T()}function fa(e,t){const a=p.uiLang==="as";let n="",s="",o="";t==="about"?(n=a?"axomexam সম্পৰ্কে":"About axomexam",s=a?"আমি কোন, আমাৰ অধ্যয়ন সামগ্ৰী কেনেদৰে প্ৰস্তুত কৰা হয়, আৰু অসমৰ প্ৰতিজন পৰীক্ষাৰ্থীৰ বাবে ইয়াক কেনেদৰে বিনামূলীয়া আৰু নিৰ্ভুল ৰখা হয়।":"Who we are, how our study material is prepared, and how we keep it free and accurate for every Assam exam aspirant.",o=a?`
        <p><strong>axomexam.in</strong> হৈছে অসমৰ চৰকাৰী নিযুক্তি পৰীক্ষা আৰু ৰাজ্যখনত জনপ্ৰিয় কেন্দ্ৰীয় পৰীক্ষাসমূহৰ বাবে প্ৰস্তুতি চলাই থকা প্ৰাৰ্থীসকলৰ বাবে এখন স্বতন্ত্ৰ, বিনামূলীয়া অধ্যয়ন মঞ্চ। ই দ্বিভাষিক অনুশীলন প্ৰশ্নৰ এখন সৰু সংগ্ৰহ হিচাপে আৰম্ভ হৈছিল আৰু এতিয়া সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি, সাধাৰণ ইংৰাজী আৰু কম্পিউটাৰ সজাগতা সামৰি এটা সংগঠিত লাইব্ৰেৰী হৈ পৰিছে — য'ত প্ৰতিটো প্ৰশ্ন, উত্তৰ আৰু ব্যাখ্যা ইংৰাজী আৰু অসমীয়া দুয়োটা ভাষাত উপলব্ধ।</p>

        <h2>আমাৰ লক্ষ্য</h2>
        <p>আমাৰ বিশ্বাস যে সৰু চহৰত পঢ়া এজন প্ৰাৰ্থীয়ে চহৰৰ কোচিং কেন্দ্ৰৰ প্ৰাৰ্থীৰ দৰেই একে মানৰ অনুশীলন সমল পোৱা উচিত — কোনো মাচুল নিদিয়াকৈ আৰু একাউণ্ট নখুলাকৈ। axomexam.in ৰ প্ৰতিটো অংশ পঢ়া, অনুশীলন কৰা আৰু ডাউনল'ড কৰা বিনামূলীয়া, আৰু ভাষা কেতিয়াও প্ৰস্তুতিৰ বাধা নহয়।</p>

        <h2>আমি কি আগবঢ়াওঁ</h2>
        <ul>
          <li><strong>বিষয়ভিত্তিক প্ৰশ্ন-সংগ্ৰহ:</strong> সাধাৰণ জ্ঞান, গণিত, সাধাৰণ বিজ্ঞান, যুক্তি আৰু ইংৰাজীত, প্ৰতিটোৰ উত্তৰ আৰু প্ৰয়োজনত ধাপে ধাপে সমাধানসহ।</li>
          <li><strong>সময় নিৰ্ধাৰিত মক টেষ্ট:</strong> প্ৰকৃত প্ৰশ্নকাকতৰ আৰ্হি অনুসৰি, লাইভ কাউণ্টডাউন, তৎক্ষণাত ফলাফল আৰু উত্তৰ পুনৰীক্ষণসহ।</li>
          <li><strong>বিগত বৰ্ষৰ সমাধান কৰা প্ৰশ্নকাকত:</strong> SSC, ৰে'লৱে, অসম আৰক্ষী, গুৱাহাটী উচ্চ ন্যায়ালয়, DHS আৰু DME আদি পৰীক্ষাৰ বাবে।</li>
          <li><strong>ই-বুক আৰু PDF নোট:</strong> পুনৰাবৃত্তিৰ বাবে, অসমৰ ইতিহাস, ভাৰতীয় ৰাজনীতি, ভূগোল, অৰ্থনীতি, কলা আৰু সংস্কৃতি আদি সামৰি।</li>
          <li><strong>এখন বিনামূলীয়া Android এপ:</strong> যাতে অনুশীলন সামগ্ৰী য'ত-ত'ৱে অফলাইনত ব্যৱহাৰ কৰিব পাৰি।</li>
        </ul>

        <h2>আমাৰ সমল কেনেদৰে প্ৰস্তুত কৰা হয়</h2>
        <p>প্ৰতিটো বিষয় প্ৰথমে সংশ্লিষ্ট পৰীক্ষাৰ চৰকাৰী পাঠ্যক্ৰম অনুসৰি শিতান আৰু বিষয়ত ভাগ কৰা হয়। তাৰ পিছত বিষয় অনুসৰি প্ৰশ্ন যোগ কৰি সত্যতা, বানান আৰু স্পষ্টতা পৰীক্ষা কৰা হয়। যি প্ৰাৰ্থীয়ে এটা প্ৰশ্ন ভুল কৰিছে তেওঁ উত্তৰটো মুখস্থ নকৰি ধাৰণাটো বুজি পোৱাৰ বাবে সহজ ভাষাত ব্যাখ্যা লিখা হয়। প্ৰকাশৰ আগতে তথ্যসমূহ চৰকাৰী জাননী, মানক প্ৰসংগ পুথি আৰু ৰাজহুৱাভাৱে উপলব্ধ চৰকাৰী উৎসৰ সৈতে মিলাই পৰীক্ষা কৰা হয়।</p>

        <h2>সম্পাদকীয় মান</h2>
        <p>সকলো সামগ্ৰী axomexam সম্পাদকীয় দলৰ দ্বাৰা প্ৰস্তুত আৰু পৰ্যালোচনা কৰা হয়, যিয়ে কেৱল এই মঞ্চৰ অধ্যয়ন সমলত কাম কৰে। কোনো পৰীক্ষা, কোচিং প্ৰতিষ্ঠান বা সামগ্ৰী অন্তৰ্ভুক্ত কৰাৰ বাবে আমি ধন লোৱা নাই, আৰু পৃষ্ঠপোষকতা কৰা সামগ্ৰী কেতিয়াও অধ্যয়ন সমল হিচাপে প্ৰকাশ নকৰা হয়। পাঠ্যক্ৰম, পৰীক্ষাৰ আৰ্হি বা তথ্য সলনি হ'লে পৃষ্ঠাসমূহ নিয়মীয়াকৈ পৰ্যালোচনা আৰু হালনাগাদ কৰা হয়।</p>

        <h2>শুদ্ধতা আৰু সংশোধন</h2>
        <p>আমি প্ৰতিটো তথ্য সঠিক ৰাখিবলৈ চেষ্টা কৰোঁ, কিন্তু পৰীক্ষাৰ আৰ্হি, পাঠ্যক্ৰমৰ বিৱৰণ আৰু চৰকাৰী জাননী সলনি হ'ব পাৰে। axomexam.in এখন স্বতন্ত্ৰ অধ্যয়ন সহায়িকা, চৰকাৰী প'ৰ্টেল নহয় — তাৰিখ, যোগ্যতা আৰু পৰীক্ষাৰ আৰ্হি সদায় চৰকাৰী জাননীৰ পৰা নিশ্চিত কৰক। আপুনি কিবা ভুল বা ভাঙা লিংক পালে পৃষ্ঠাৰ লিংক আৰু সঠিক তথ্যসহ আমালৈ লিখক, আমি যাচাই কৰি সংশোধন কৰিম। সংশোধন আৰু অৱদান কেতিয়াও কোনো বাণিজ্যিক উদ্দেশ্যত ব্যৱহাৰ কৰা নহয়।</p>

        <h2>এই ছাইট কাৰ বাবে</h2>
        <p>এই সামগ্ৰী ADRE তৃতীয় আৰু চতুৰ্থ শ্ৰেণী, অসম আৰক্ষী উপ-পৰিদৰ্শক আৰু কনিষ্টবল, APSC, পঞ্চায়ত আৰু গ্ৰামোন্নয়ন, বন বিভাগ, DHS আৰু DME, লগতে SSC CGL, CHSL আৰু GD, আৰু RRB NTPC আৰু Group D ৰ দৰে কেন্দ্ৰীয় পৰীক্ষাৰ প্ৰাৰ্থীসকলৰ বাবে ডিজাইন কৰা হৈছে। আপুনি আৰম্ভণিৰ পৰা শিকিছে নে চূড়ান্ত পুনৰাবৃত্তি কৰিছে, বিষয়ভিত্তিক গাঁথনিয়ে আপোনাক নিজৰ গতিত অধ্যয়ন কৰিবলৈ দিয়ে।</p>

        <h2>যোগাযোগ কৰক</h2>
        <p>প্ৰশ্ন, সংশোধন আৰু পৰামৰ্শ সদায় স্বাগতম। <a href="mailto:axomexam@outlook.com">axomexam@outlook.com</a> লৈ ইমেইল কৰক বা আমাৰ <a href="/contact/">যোগাযোগ পৃষ্ঠা</a> ব্যৱহাৰ কৰক। আমি সাধাৰণতে দুৰৰ পৰা তিনি কৰ্মদিৱসৰ ভিতৰত উত্তৰ দিওঁ।</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>শেষ হালনাগাদ:</strong> ২০ ছেপ্তেম্বৰ ২০২৬ &middot; প্ৰকাশক: axomexam.in</p>
      `:`
        <p><strong>axomexam.in</strong> is an independent, free study platform for candidates preparing for government recruitment examinations in Assam and for central examinations that are popular in the state. It began as a small collection of bilingual practice questions and has grown into a structured library that covers General Knowledge, Mathematics, General Science, Reasoning Ability, General English and Computer Awareness — with every question, answer and explanation available in both English and Assamese.</p>

        <h2>Our Mission</h2>
        <p>We believe that a candidate studying in a small town should have access to the same quality of practice material as a candidate in a city coaching centre — without paying a fee and without creating an account. Every part of axomexam.in is free to read, practise and download, and language is never a barrier to preparation.</p>

        <h2>What We Offer</h2>
        <ul>
          <li><strong>Topic-wise question banks</strong> in General Knowledge, Mathematics, General Science, Reasoning and English, each with answers and, wherever needed, step-by-step working.</li>
          <li><strong>Timed mock tests</strong> that follow the real paper pattern, with a live countdown, instant results and answer review.</li>
          <li><strong>Previous year solved papers</strong> for exams such as SSC, Railway, Assam Police, Guwahati High Court, DHS and DME.</li>
          <li><strong>E-books and PDF notes</strong> for revision, covering Assam History, Indian Polity, Geography, Economy, Art and Culture, and more.</li>
          <li><strong>A free Android app</strong> so practice material can be used offline on the go.</li>
        </ul>

        <h2>How Our Content Is Prepared</h2>
        <p>Each subject is first divided into sections and topics that follow the official syllabus of the relevant examination. Questions are then added topic by topic and checked for factual accuracy, spelling and clarity. Explanations are written in plain language so that a candidate who answered a question incorrectly can understand the concept instead of simply memorising the answer. Facts are cross-checked against official notifications, standard reference books and publicly available government sources before publishing.</p>

        <h2>Editorial Standards</h2>
        <p>All material is prepared and reviewed by the axomexam editorial team, which works only on study content for this platform. We do not accept payment for including any exam, coaching institute or product, and sponsored material is never published as study content. Pages are reviewed periodically and updated whenever a syllabus, exam pattern or fact changes.</p>

        <h2>Accuracy and Corrections</h2>
        <p>We try to keep every fact correct, but examination patterns, syllabus details and official notifications can change. axomexam.in is an independent study aid and not a government portal — always confirm dates, eligibility and exam patterns from the official notification. If you find an error or a broken link, write to us with the page link and the correct information, and we will verify it and make the correction. Corrections and contributions are never used for any commercial purpose.</p>

        <h2>Who This Site Is For</h2>
        <p>The material is designed for aspirants of ADRE Grade III and IV, Assam Police Sub-Inspector and Constable, APSC, Panchayat and Rural Development, Forest Department, DHS and DME, and for central exams such as SSC CGL, CHSL and GD, and RRB NTPC and Group D. Whether you are starting from the basics or doing a final revision, the topic-wise structure lets you study at your own pace.</p>

        <h2>Contact Us</h2>
        <p>Questions, corrections and suggestions are always welcome. Email <a href="mailto:axomexam@outlook.com">axomexam@outlook.com</a> or use our <a href="/contact/">contact page</a>. We usually reply within two to three working days.</p>

        <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>Last updated:</strong> 20 September 2026 &middot; Publisher: axomexam.in</p>
      `):t==="privacy"||t==="privacy-policy"?(n=a?"গোপনীয়তা নীতি":"Privacy Policy",o=a?`
        <p><strong>axomexam.in</strong> ত আপোনাৰ ব্যক্তিগত তথ্যৰ সুৰক্ষা আৰু গোপনীয়তা ৰক্ষা কৰাটো আমাৰ অন্যতম অগ্ৰাধিকাৰ। এই নথিয়ে আমি কি তথ্য সংগ্ৰহ কৰোঁ আৰু সেয়া কেনেদৰে ব্যৱহাৰ কৰোঁ তাৰ স্পষ্ট বিৱৰণ দিয়ে।</p>
        <h3>১. আমি সংগ্ৰহ কৰা তথ্যসমূহ</h3>
        <p>আমি আমাৰ ব্যৱহাৰকাৰীৰ পৰা কোনো গোপনীয় ব্যক্তিগত তথ্য (যেনে বেংক বিৱৰণ, পাছৱৰ্ড আদি) সংগ্ৰহ নকৰোঁ। ব্যৱহাৰকাৰীয়ে যেতিয়া Contact বা Submit ফৰ্ম ব্যৱহাৰ কৰে, তেতিয়া কেৱল নাম আৰু ইমেইল ঠিকনাহে প্ৰয়োজন সাপেক্ষে সংগ্ৰহ কৰা হয়।</p>
        <h3>২. ল'গ ফাইল আৰু এনালিটিক্স</h3>
        <p>আন সকলো ষ্টেণ্ডাৰ্ড ৱেবছাইটৰ দৰে, axomexam.in এ ছাইটৰ কাৰ্যক্ষমতা আৰু ব্যৱহাৰকাৰীৰ অভিজ্ঞতা উন্নত কৰিবলৈ ল’গ ফাইল ব্যৱহাৰ কৰে (যেনে IP ঠিকনা, ব্ৰাউজাৰৰ প্ৰকাৰ, পৃষ্ঠা পৰিদৰ্শনৰ সময়)। এইবোৰ কোনো ব্যক্তিবিশেষৰ পৰিচয়ৰ সৈতে সংযুক্ত নহয়।</p>
        <h3>৩. গুগল ডাবল-ক্লিক DART কুকিজ আৰু বিজ্ঞাপন</h3>
        <p>Google আমাৰ ৱেবছাইটৰ এজন অন্যতম তৃতীয় পক্ষৰ বিজ্ঞাপনদাতা। Google-এ ব্যৱহাৰকাৰীৰ পূৰ্বৰ ইণ্টাৰনেট কাৰ্যকলাপৰ ওপৰত ভিত্তি কৰি প্ৰাসংগিক বিজ্ঞাপন প্ৰদৰ্শন কৰিবলৈ DART কুকিজ ব্যৱহাৰ কৰিব পাৰে। ব্যৱহাৰকাৰীয়ে Google Privacy & Terms পৃষ্ঠালৈ গৈ এই বিজ্ঞাপন ব্যক্তিগতকৰণ নিয়ন্ত্ৰণ কৰিব পাৰে।</p>
        <h3>৪. নীতিৰ সন্মতি</h3>
        <p>আমাৰ ৱেবছাইট ব্যৱহাৰ কৰাৰ জৰিয়তে আপুনি আমাৰ গোপনীয়তা নীতিৰ চৰ্তসমূহত সন্মতি প্ৰকাশ কৰা বুলি গণ্য কৰা হ'ব।</p>
      `:`
        <p>At <strong>axomexam.in</strong> (accessible via https://axomexam.in), the privacy of our visitors is of paramount importance. This document outlines the types of personal and analytical information received and collected by our platform.</p>
        <h3>1. Information Collection and Handling</h3>
        <p>We do not mandate personal account creation or collect sensitive personal identification details. Information submitted via contact or feedback forms (such as Name and Email) is used strictly to respond to user inquiries.</p>
        <h3>2. Log Files & Standard Analytics</h3>
        <p>Like standard web portals, axomexam.in utilizes standard log files. The data inside includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click metrics. This data is non-personally identifiable and used purely for site maintenance.</p>
        <h3>3. Google AdSense & Third-Party Cookies</h3>
        <p>Google, as a third-party vendor, uses cookies to serve contextual advertisements on our site. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to axomexam.in and other sites across the web. You can opt out of personalized advertising by visiting Google Ad Settings.</p>
        <h3>4. Consent</h3>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to all its operational terms.</p>
      `):t==="terms"?(n=a?"নীতি আৰু চৰ্তসমূহ":"Terms & Conditions",o=a?`
        <p><strong>axomexam.in</strong> লৈ স্বাগতম। এই ৱেবছাইটটো ব্যৱহাৰ কৰাৰ ক্ষেত্ৰত তলত উল্লেখ কৰা নীতি আৰু চৰ্তসমূহ প্ৰযোজ্য হ'ব:</p>
        <h3>১. বৌদ্ধিক সম্পত্তি আৰু ব্যৱহাৰৰ নিয়ম</h3>
        <p>axomexam.in ত প্ৰকাশিত সকলো পাঠ্যক্ৰম, প্ৰশ্নোত্তৰ, মক টেষ্ট আৰু PDF সমল কেৱল ছাত্ৰ-ছাত্ৰী আৰু পৰীক্ষাৰ্থীৰ ব্যক্তিগত শিক্ষাৰ বাবেহে অনুমোদিত। আমাৰ অনুমতি অবিহনে কোনো সমল ব্যৱসায়িক স্বাৰ্থত পুনৰ প্ৰকাশ, বিক্ৰী বা অনৈতিকভাৱে ব্যৱহাৰ কৰা নিষিদ্ধ।</p>
        <h3>২. তথ্যৰ শুদ্ধতা আৰু সীমাবদ্ধতা</h3>
        <p>আমি সকলো প্ৰশ্ন আৰু উত্তৰ নিৰ্ভুলভাৱে যুগুত কৰিবলৈ যথাসম্ভৱ চেষ্টা কৰোঁ। তথাপিও কোনো তথ্যৰ অনিচ্ছাকৃত ত্ৰুটিৰ বাবে হোৱা শৈক্ষিক বা আনুসংগিক ক্ষতিৰ বাবে ৱেবছাইট প্ৰশাসক আইনগতভাৱে দায়বদ্ধ নহ’ব।</p>
        <h3>৩. বাহ্যিক লিংক</h3>
        <p>আমাৰ ৱেবছাইটত তৃতীয় পক্ষৰ লিংক (যেনে চৰকাৰী জাননী, অফিচিয়েল পৰীক্ষা প’ৰ্টেল আদি) থাকিব পাৰে। সেই বাহ্যিক ৱেবছাইটসমূহৰ সমল বা নীতিৰ বাবে আমি দায়বদ্ধ নহওঁ।</p>
      `:`
        <p>Welcome to <strong>axomexam.in</strong>. By accessing and browsing this website, you accept and agree to comply with the following Terms and Conditions.</p>
        <h3>1. Content Usage & Intellectual Property</h3>
        <p>All materials, structured questions, study notes, and downloadable assets published on axomexam.in are intended strictly for educational, personal, and non-commercial usage. Redistribution, commercial reproduction, or resale without written permission is strictly prohibited.</p>
        <h3>2. Accuracy & Limitation of Liability</h3>
        <p>While our editorial team endeavors to ensure absolute factual correctness across all subjects, study materials are provided on an 'as-is' basis. axomexam.in does not warrant the completeness or absolute infallibility of contents for official evaluation criteria.</p>
        <h3>3. External Hyperlinks</h3>
        <p>Our pages may occasionally contain links to official external sites or reference sources. We hold no responsibility for the content, privacy guidelines, or accuracy of third-party platforms.</p>
      `):t==="disclaimer"?(n=a?"দাবীত্যাগ (Disclaimer)":"Disclaimer",o=a?`
        <p><strong>https://axomexam.in</strong> ত প্ৰকাশিত সকলো তথ্য কেৱল সাধাৰণ শিক্ষা আৰু জ্ঞান আহৰণৰ উদ্দেশ্যতহে আগবঢ়োৱা হৈছে।</p>
        <h3>১. চৰকাৰী সংস্থাৰ সৈতে সম্পৰ্কহীনতা</h3>
        <p>axomexam.in কোনো চৰকাৰী সংস্থা, অসম লোকসেৱা আয়োগ (APSC), বা কোনো পৰীক্ষা পৰিচালনা কৰা চৰকাৰী নিগমৰ অফিচিয়েল ৱেবছাইট নহয়। ই এক স্বতন্ত্ৰ শিক্ষামূলক প’ৰ্টেল। অফিচিয়েল জাননীৰ বাবে পৰীক্ষাৰ্থীসকলক সদায় চৰকাৰী গেজেট বা অফিচিয়েল প’ৰ্টেল অনুসৰণ কৰিবলৈ পৰামৰ্শ দিয়া হয়।</p>
        <h3>২. পেছাদাৰী পৰামৰ্শ নহয়</h3>
        <p>আমাৰ ৱেবছাইটত উপলব্ধ সমলসমূহ পৰীক্ষাৰ্থীৰ অনুশীলনৰ সহায়ৰ বাবেহে তৈয়াৰ কৰা হৈছে। ইয়াৰ ওপৰত ভিত্তি কৰি লোৱা যিকোনো সিদ্ধান্ত আপোনাৰ নিজা বিবেচনাধীন।</p>
      `:`
        <p>All content and question banks on <strong>https://axomexam.in</strong> are published in good faith and solely for general educational, academic, and competitive examination preparation purposes.</p>
        <h3>1. Non-Affiliation with Government Authorities</h3>
        <p>axomexam.in is an independent private educational website. It is NOT affiliated with, sponsored by, or endorsed by the Government of Assam, APSC, SLPRB, State Recruitment Boards, or any governmental testing agency. Candidates must always cross-reference with official state recruitment gazettes.</p>
        <h3>2. Educational Warranties</h3>
        <p>We make no absolute warranties regarding test pattern guarantees or exam success outcomes. Use of study resources and mock practices is at the user's sole discretion.</p>
      `):o=`<p>${r(`page.${t}.p1`)}</p>`,e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${a?"গৃহপৃষ্ঠা":"Home"}</a><span class="bc-sep">/</span><span>${l(n)}</span></nav>
        <h1>${l(n)}</h1>
        ${s?`<p class="page-desc">${l(s)}</p>`:""}
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="info-panel" style="background:var(--bg,#ffffff); padding:28px 24px; border-radius:18px; border:1px solid var(--border,#e2e8f0); line-height:1.75; color:var(--ink-soft,#475569); box-shadow:0 8px 24px -4px rgba(15,23,42,0.03); max-width:860px; margin:0 auto; text-align:left;">
          ${o}
        </div>
      </section>`,ve(),window.scrollTo(0,0)}function ga(e){const t=p.uiLang==="as",a=t?["সমল সংশোধন","ভাঙা লিংক বা ডাউনল'ড সমস্যা","নতুন বিষয়ৰ অনুৰোধ","প্ৰশ্ন আগবঢ়াওক","কপিৰাইট / টেকডাউন অনুৰোধ","অন্যান্য"]:["Content correction","Broken link or download problem","New topic request","Contribute questions","Copyright / takedown request","Other"];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t?"গৃহপৃষ্ঠা":"Home"}</a><span class="bc-sep">/</span><span>${t?"যোগাযোগ কৰক":"Contact Us"}</span></nav>
        <h1>${t?"যোগাযোগ কৰক":"Contact Us"}</h1>
        <p class="page-desc">${t?"ভুল উত্তৰ জনাওক, নতুন বিষয় বিচাৰক, প্ৰশ্ন আগবঢ়াওক, বা পৰীক্ষাৰ প্ৰস্তুতিত সহায় বিচাৰক।":"Report a wrong answer, request a topic, contribute questions, or ask for help with your exam preparation."}</p>
      </div>

      <section class="section" style="padding-bottom:40px;">
        <article style="max-width:860px; margin:0 auto; line-height:1.85; color:var(--ink-soft,#475569); text-align:left;">
          <p>${t?"আমি লাভ কৰা প্ৰতিটো বাৰ্তা পঢ়োঁ আৰু সেই প্ৰতিক্ৰিয়া axomexam.in ৰ প্ৰশ্ন-সংগ্ৰহ, নোট আৰু মক টেষ্ট উন্নত কৰিবলৈ ব্যৱহাৰ কৰোঁ। আপুনি এটা ভুল উত্তৰ জনাব, নতুন এটা বিষয়ৰ পৰামৰ্শ দিব, প্ৰশ্ন আগবঢ়াব বা অধ্যয়ন সামগ্ৰীৰ বিষয়ে সোধা-পোছা কৰিব বিচাৰে নে নাই — এই পৃষ্ঠাই আমাৰ সৈতে যোগাযোগ কৰাৰ আটাইতকৈ ভাল উপায় ব্যাখ্যা কৰে।":"We read every message we receive and use the feedback to improve the question banks, notes and mock tests on axomexam.in. Whether you want to report a wrong answer, suggest a new topic, contribute questions or ask about study material, this page explains the best way to reach us."}</p>

          <h2>${t?"ইমেইল সহায়":"Email Support"}</h2>
          <p>${t?"যোগাযোগৰ আটাইতকৈ দ্ৰুত উপায় হ'ল":"The fastest way to contact us is by email at"} <a href="mailto:axomexam@outlook.com">axomexam@outlook.com</a>${t?" লৈ ইমেইল। আমাক উত্তৰ দিবলৈ অনুগ্ৰহ কৰি এটা বৈধ ইমেইল ঠিকনাৰ পৰা লিখক। আমি সাধাৰণতে":". Please write from a valid email address so that we can reply. We usually respond within"} <strong>${t?"দুৰৰ পৰা তিনি কৰ্মদিৱসৰ":"two to three working days"}</strong>${t?" ভিতৰত উত্তৰ দিওঁ।":"."}</p>

          <form id="contact-form" action="mailto:axomexam@outlook.com" method="post" enctype="text/plain" style="margin:22px 0 10px; padding:22px; border:1px solid var(--border,#e2e8f0); border-radius:16px; background:var(--card-bg,#fff);">
            <h3 style="margin-top:0; color:var(--ink,#0f172a);">${t?"আমাক এটা বাৰ্তা পঠিয়াওক":"Send us a message"}</h3>
            <div style="margin-bottom:12px;">
              <label for="c-name" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${t?"আপোনাৰ নাম":"Your name"}</label>
              <input id="c-name" name="name" type="text" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:12px;">
              <label for="c-email" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${t?"আপোনাৰ ইমেইল":"Your email"}</label>
              <input id="c-email" name="email" type="email" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:12px;">
              <label for="c-subject" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${t?"বিষয়":"Subject"}</label>
              <select id="c-subject" name="subject" style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;">
                ${a.map(s=>`<option>${s}</option>`).join("")}
              </select>
            </div>
            <div style="margin-bottom:16px;">
              <label for="c-message" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${t?"বাৰ্তা":"Message"}</label>
              <textarea id="c-message" name="message" rows="5" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">${t?"বাৰ্তা পঠিয়াওক":"Send message"}</button>
            <p style="font-size:0.82rem; color:#64748b; margin:10px 0 0;">${t?"ই আপোনাৰ ইমেইল এপটো তথ্য ভৰাই খুলিব। যদি নুখুলে, তেন্তে পোনপটীয়াকৈ":"This opens your email app with the details filled in. If it does not open, simply email us directly at"} <a href="mailto:axomexam@outlook.com">axomexam@outlook.com</a>${t?" লৈ ইমেইল কৰক।":"."}</p>
          </form>

          <h2>${t?"আপোনাৰ বাৰ্তাত কি অন্তৰ্ভুক্ত কৰিব":"What to Include in Your Message"}</h2>
          <ul>
            <li>${t?"<strong>সমল সংশোধনৰ বাবে:</strong> পৃষ্ঠাৰ সঠিক লিংক, প্ৰশ্ন নম্বৰ, আপুনি ভুল বুলি ভবা কথাটো, আৰু এটা চুটি কাৰণ বা উৎসসহ সঠিক উত্তৰ।":"<strong>For a content correction:</strong> the exact page link, the question number, what you believe is wrong, and the correct answer with a short reason or source."}</li>
            <li>${t?"<strong>ভাঙা লিংক বা ডাউনল'ড সমস্যাৰ বাবে:</strong> লিংকটো দেখা পোৱা পৃষ্ঠা আৰু ফাইল বা প্ৰশ্নকাকতৰ নাম।":"<strong>For a broken link or download problem:</strong> the page where the link appears and the name of the file or paper."}</li>
            <li>${t?"<strong>নতুন বিষয় অনুৰোধৰ বাবে:</strong> পৰীক্ষাৰ নাম, বিষয় আৰু আমি যোগ কৰিবলগীয়া নিৰ্দিষ্ট বিষয়টো।":"<strong>For a new topic request:</strong> the exam name, subject and the specific topic you would like us to add."}</li>
            <li>${t?"<strong>প্ৰশ্ন আগবঢ়োৱাৰ বাবে:</strong> বিষয়, প্ৰশ্ন চাৰিটা বিকল্পসহ, সঠিক বিকল্প আৰু এটা চুটি ব্যাখ্যা।":"<strong>For contributing questions:</strong> the subject, topic, questions with four options, the correct option and a brief explanation."}</li>
          </ul>

          <h2>${t?"উত্তৰৰ সময়":"Response Time"}</h2>
          <p>${t?"আমি প্ৰতিটো প্ৰামাণিক বাৰ্তাৰ উত্তৰ দুৰৰ পৰা তিনি কৰ্মদিৱসৰ ভিতৰত দিবলৈ চেষ্টা কৰোঁ। বাৰ্তাসমূহ অহা ক্ৰমত পৰিচালনা কৰা হয়, আৰু যাচাইযোগ্য উৎসসহ সমল সংশোধনসমূহ সাধাৰণতে আগতে প্ৰক্ৰিয়া কৰা হয়।":"We aim to reply to every genuine message within two to three working days. Messages are handled in the order they arrive, and content corrections that include a verifiable source are usually processed first."}</p>

          <h2>${t?"কপিৰাইট সমল জনাওক":"Report Copyright Content"}</h2>
          <p>${t?"যদি আপুনি বিশ্বাস কৰে যে axomexam.in ৰ কোনো সামগ্ৰীয়ে আপোনাৰ কপিৰাইট উলংঘা কৰিছে, পৃষ্ঠাৰ লিংক আৰু মালিকীস্বত্বৰ প্ৰমাণসহ আমালৈ ইমেইল কৰক। আমি অনুৰোধ পৰ্যালোচনা কৰি প্ৰয়োজন হ'লে সামগ্ৰী আঁতৰাব। আমি বৌদ্ধিক সম্পত্তিক সন্মান কৰোঁ আৰু বৈধ টেকডাউন অনুৰোধসমূহ তৎক্ষণাত পালন কৰোঁ।":"If you believe any material on axomexam.in infringes your copyright, email us with the page link and proof of ownership. We will review the request and remove the material if required. We respect intellectual property and act on valid takedown requests promptly."}</p>

          <h2>${t?"সাধাৰণ প্ৰশ্ন":"Common Questions"}</h2>
          <p>${t?"<strong>ফোন নম্বৰ বা লাইভ চেট আছে নেকি?</strong> নাই। মঞ্চখন বিনামূলীয়া আৰু সমল-কেন্দ্ৰিত ৰাখিবলৈ সহায় সম্পূৰ্ণৰূপে ইমেইলৰ জৰিয়তে কৰা হয়।":"<strong>Is there a phone number or live chat?</strong> No. To keep the platform free and focused on content, support is handled by email only."}</p>
          <p>${t?"<strong>মই অধ্যয়ন পৰিকল্পনা বিচাৰিব পাৰোঁ নেকি?</strong> হয়। আপুনি যি পৰীক্ষাৰ বাবে প্ৰস্তুতি চলাইছে আৰু পৰীক্ষাৰ তাৰিখ কওক, আমি আপোনাক আটাইতকৈ প্ৰাসংগিক শিতান আৰু অধ্যয়নৰ পৰামৰ্শিত ক্ৰমলৈ নিৰ্দেশ কৰিম।":"<strong>Can I request a study plan?</strong> Yes. Tell us the exam you are preparing for and the date of the exam, and we will point you to the most relevant sections and a suggested order of study."}</p>
          <p>${t?'<strong>আপোনালোকে মোৰ তথ্য শ্বেয়াৰ বা বিক্ৰী কৰে নেকি?</strong> কেতিয়াও নহয়। আপোনাৰ ইমেইল কেৱল আপোনাৰ অনুসন্ধানৰ উত্তৰ দিবলৈ ব্যৱহাৰ কৰা হয়, আমাৰ <a href="/privacy/">গোপনীয়তা নীতি</a>ত ব্যাখ্যা কৰাৰ দৰে।':'<strong>Do you share or sell my details?</strong> Never. Your email is used only to reply to your query, as explained in our <a href="/privacy/">Privacy Policy</a>.'}</p>
          <p>${t?"<strong>মই ছাইটলৈ প্ৰশ্ন আগবঢ়াব পাৰোঁ নেকি?</strong> হয়। চাৰিটা বিকল্প আৰু এটা চুটি ব্যাখ্যাসহ পঠিয়াওক, আমাৰ দলে প্ৰকাশৰ আগতে পৰ্যালোচনা কৰিব।":"<strong>Can I contribute questions to the site?</strong> Yes. Send them with four options and a short explanation, and our team will review them before publishing."}</p>

          <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>${t?"শেষ হালনাগাদ:":"Last updated:"}</strong> ${t?"২০ ছেপ্তেম্বৰ ২০২৬":"20 September 2026"} &middot; ${t?"প্ৰকাশক:":"Publisher:"} axomexam.in</p>
        </article>
      </section>
    `;const n=document.getElementById("contact-form");n&&n.addEventListener("submit",function(s){s.preventDefault();const o=(document.getElementById("c-name")||{}).value||"",i=(document.getElementById("c-email")||{}).value||"",c=(document.getElementById("c-subject")||{}).value||"Website enquiry",d=(document.getElementById("c-message")||{}).value||"",u="Name: "+o+`
Email: `+i+`

`+d;window.location.href="mailto:axomexam@outlook.com?subject="+encodeURIComponent("[axomexam] "+c)+"&body="+encodeURIComponent(u)}),ve(),T(),window.scrollTo(0,0)}function D(e){return(e||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}function Me(e){return e==null?"":typeof e=="string"?e:Array.isArray(e)?e.join(" "):[e.en,e.as].filter(Boolean).map(t=>Array.isArray(t)?t.join(" "):t).join(" ")}function it(e){const t=D(e);if(t.length<2)return[];const a=[],n=typeof CONFIG<"u"?CONFIG.SEARCH_LIMIT:20;for(const s of p.topicIndex){const o=D(b({en:s.title.en})),i=D(b({as:s.title.as})),c=(s.tags||[]).filter(h=>D(h).includes(t)),d=(s.topic.questions||[]).filter(h=>{const g=typeof h.q=="object"?Me(h.q):(h.q||h.question_en||"")+" "+(h.question_as||""),m=typeof h.a=="object"?Me(h.a):(h.a||h.answer_en||"")+" "+(h.answer_as||"");return D(g).includes(t)||D(m).includes(t)});let u=0;o.includes(t)&&(u+=5),i.includes(t)&&(u+=5),u+=c.length*3,u+=d.length*1.5,u>0&&a.push({rec:s,score:u,matchCount:d.length+c.length})}return a.sort((s,o)=>o.score-s.score).slice(0,n)}let ne=null;function rt(){return p.searchCorpusReady?Promise.resolve():ne||(ne=(async()=>{const e=p.topicIndex.filter(n=>!(n.topic&&Array.isArray(n.topic.questions)&&n.topic.questions.length)),t=async()=>{for(;e.length;){const n=e.shift();try{const s=await API.getTopic(n.cat.id,n.topic.id,n.sub&&n.sub.id,n.cat&&n.cat.contentLayout);if(s){const o=Array.isArray(s)?s:Array.isArray(s.questions)?s.questions:[];n.topic.questions=o,n.nQuestions||(n.nQuestions=o.length)}}catch{}}},a=Math.min(8,e.length);await Promise.all(Array.from({length:a},t)),p.searchCorpusReady=!0})().finally(()=>{ne=null}),ne)}function ba(){const e=f("#master-search"),t=f("#search-results");if(!e||!t)return;let a;const n=()=>{t.hidden=!0,t.innerHTML=""},s=i=>{const c=it(i);c.length?(t.innerHTML=`
          <div class="sr-head">${r("search.results")} (${c.length})</div>
          ${c.map((d,u)=>`
            <a class="sr-item" href="/topic/${d.rec.path}" data-idx="${u}">
              <span class="chip">${l(b(d.rec.cat.name))}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span class="sr-title">${l(b(d.rec.title))}</span>
                <span class="sr-sub">${l(b(d.rec.section?d.rec.section.name:d.rec.sub?d.rec.sub.name:""))} • ${d.rec.cat.id==="study-guides"?p.uiLang==="as"?"নিৰ্দেশিকা":"Guide":`${d.rec.nQuestions||0} ${r("topic.questions")}`}</span>
              </span>
            </a>`).join("")}`,t.innerHTML+=`<a class="sr-item" href="/trending" style="justify-content:center;color:var(--primary);font-weight:600;">${r("see.all")}</a>`):t.innerHTML=`<div class="sr-empty">${r("search.noresult")}</div>`,t.hidden=!1},o=i=>{clearTimeout(a);const c=i.target.value;if(c.trim().length<2){n();return}a=setTimeout(()=>{s(c),rt().then(()=>{!t.hidden&&e.value.trim()===c.trim()&&s(c)})},180)};e.addEventListener("input",o),e.addEventListener("focus",()=>{e.value.trim().length>=2&&o({target:e})}),document.addEventListener("click",i=>{i.target.closest(".search-wrap")||n()}),t.addEventListener("click",i=>{i.target.closest("a.sr-item")&&(e.value="",n())})}function va(e){e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("tab.search")}</span></nav>
        <h1>${r("tab.search")}</h1>
      </div>
      <div class="search-page">
        <div class="sp-bar">
          <input type="search" id="page-search" autocomplete="off" spellcheck="false" placeholder="${r("search.placeholder")}" />
        </div>
        <div class="sp-results" id="page-search-results">
          <div class="sp-empty">${r("search.hint")}</div>
        </div>
      </div>`;const t=f("#page-search"),a=f("#page-search-results");let n;const s=()=>{const o=t.value.trim();if(o.length<2){a.innerHTML=`<div class="sp-empty">${r("search.hint")}</div>`;return}const i=it(o);if(!i.length){a.innerHTML=`<div class="sp-empty">${r("search.noresult")}</div>`;return}a.innerHTML=i.map(c=>`
        <a class="sp-topic" href="/topic/${c.rec.path}">
          <span class="chip">${l(b(c.rec.cat.name))}</span>
          <span style="display:flex; flex-direction:column; gap:2px;">
            <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${l(b(c.rec.title))}</span>
            <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${l(b(c.rec.section?c.rec.section.name:c.rec.sub?c.rec.sub.name:""))} • ${c.rec.cat.id==="study-guides"?p.uiLang==="as"?"নিৰ্দেশিকা":"Guide":`${c.rec.nQuestions||0} ${r("topic.questions")}`}</span>
          </span>
        </a>`).join("")};t.addEventListener("input",()=>{clearTimeout(n);const o=t.value;n=setTimeout(()=>{s(),rt().then(()=>{t.value.trim()===o.trim()&&s()})},180)})}function se(){const e=f("#mobile-menu"),t=f("#mobile-backdrop"),a=f("#hamburger");e&&(e.classList.remove("open"),e.hidden=!0),t&&(t.classList.remove("open"),t.hidden=!0),a&&(a.classList.remove("open"),a.setAttribute("aria-expanded","false"))}function lt(){const e=f("#mobile-menu"),t=f("#mobile-backdrop"),a=f("#hamburger");e&&(e.hidden=!1),t&&(t.hidden=!1),requestAnimationFrame(()=>{e&&e.classList.add("open"),t&&t.classList.add("open")}),a&&(a.classList.add("open"),a.setAttribute("aria-expanded","true"))}let oe;function T(){oe&&oe.disconnect();const e=M(".reveal");if(!("IntersectionObserver"in window)){e.forEach(t=>t.classList.add("visible"));return}e.forEach(t=>{const a=parseInt(t.dataset.delay||"0",10);a&&(t.style.transitionDelay=`${a}ms`)}),oe=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("visible"),oe.unobserve(a.target))})},{threshold:.08,rootMargin:"0px 0px -30px 0px"}),e.forEach(t=>oe.observe(t))}function l(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function B(e){e.innerHTML=`
      <div class="page-head" style="padding:80px 0;text-align:center;">
        <h1 style="font-size:3rem;">404</h1>
        <p class="page-desc" style="margin:12px auto;">${r("page.error.sub")}</p>
        <div style="margin-top:22px;"><a class="btn btn-primary" href="/">${r("page.error.btn")}</a></div>
      </div>`}function H(e){const t=f("#toast");t&&(t.textContent=e,t.classList.add("show"),clearTimeout(t._t),t._t=setTimeout(()=>t.classList.remove("show"),2400))}function ya(e){e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("tab.categories")}</span></nav>
        <h1>${r("tab.categories")}</h1>
        <p class="page-desc">${r("home.categories.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="cat-grid">
          ${p.categories.map((t,a)=>{const n=I(t.id);return`
              <a class="cat-card reveal" href="/category/${t.id}" style="--cat:${n}" data-delay="${a*50}">
                <span class="cat-ico">${J(t.id)}</span>
                <span class="cat-meta">
                  <b>${l(b(t.name))}</b>
                  <span>${t.id==="articles"?p.uiLang==="as"?"প্ৰবন্ধসমূহ":"Articles":`<span class="cat-count">${ze(t)}</span> ${t.id==="study-guides"?p.uiLang==="as"?"টা গাইড":"Guides":r("cat.topics")}`}</span>
                </span>
              </a>`}).join("")}
        </div>
      </section>`,T()}function xa(e){let t=f("#pdf-loading-overlay");t?(f("#pdf-spinner-text").textContent=e||"Generating PDF...",t.style.display="flex"):(t=document.createElement("div"),t.id="pdf-loading-overlay",t.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,23,42,0.8);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(4px);",t.innerHTML=`
        <div style="width:48px;height:48px;border:3.5px solid rgba(255,255,255,0.15);border-top:3.5px solid #3b82f6;border-radius:50%;animation:pdfSpin 0.8s linear infinite;margin-bottom:16px;"></div>
        <div id="pdf-spinner-text" style="color:#ffffff;font-size:0.98rem;font-weight:700;letter-spacing:0.3px;font-family:'Plus Jakarta Sans',sans-serif;">${l(e||"Generating PDF...")}</div>
        <style>@keyframes pdfSpin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>
      `,document.body.appendChild(t))}function Oe(){const e=f("#pdf-loading-overlay");e&&(e.style.display="none")}function ka(e){const t=f("#pdf-lang-modal");t&&t.remove();const a=document.createElement("div");a.id="pdf-lang-modal",a.className="read-modal",a.style.cssText="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;display:flex;align-items:center;justify-content:center;",a.innerHTML=`
      <div class="read-modal-backdrop" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.7);backdrop-filter:blur(4px);"></div>
      <div class="read-modal-box pdf-pop-box" role="dialog" style="position:relative; z-index:2; width:90%; max-width:340px; padding:24px 20px; text-align:center; background:var(--bg,#ffffff); color:var(--ink,#0f172a); border-radius:20px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.3); border:1px solid var(--border,#e2e8f0); animation:popIn 0.22s cubic-bezier(0.16,1,0.3,1); box-sizing:border-box; display:flex; flex-direction:column; align-items:center;">
        
        <div style="width:52px; height:52px; background:rgba(37,99,235,0.1); color:#2563eb; border-radius:14px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px auto; font-size:1.6rem;">
          📄
        </div>

        <h3 style="font-size:1.15rem; font-weight:800; margin:0 0 6px 0; color:var(--ink,#0f172a); letter-spacing:-0.2px; text-align:center; width:100%;">Select PDF Language</h3>
        <p style="color:var(--ink-soft,#64748b); font-size:0.84rem; margin:0 0 20px 0; line-height:1.4; padding:0 4px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; text-align:center; width:100%;">
          <b>${l(b(e.title))}</b>
        </p>

        <div style="display:flex; flex-direction:column; gap:10px; width:100%;">
          <button type="button" class="pdf-action-btn pdf-btn-as-action" id="pdf-btn-as">
            <span style="display:flex; align-items:center; gap:8px;">
              <span class="btn-indicator-dot"></span>
              অসমীয়া মাধ্যম (Assamese)
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>

          <button type="button" class="pdf-action-btn pdf-btn-en-action" id="pdf-btn-en">
            <span style="display:flex; align-items:center; gap:8px;">
              <span class="btn-indicator-dot" style="background:#0ea5e9;"></span>
              English Medium
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>

          <button type="button" id="pdf-btn-cancel" style="border:none; background:transparent; padding:8px; font-size:0.82rem; margin-top:4px; color:var(--ink-muted,#94a3b8); font-weight:700; cursor:pointer; transition:color 0.2s;">
            Cancel
          </button>
        </div>
      </div>
      
      <style>
        @keyframes popIn { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .pdf-action-btn { width: 100%; padding: 13px 16px; font-weight: 700; font-size: 0.92rem; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; border: 1.5px solid transparent; cursor: pointer; transition: all 0.15s ease-in-out; outline: none; box-sizing: border-box; user-select: none; }
        .pdf-btn-as-action { background: #2563eb; color: #ffffff; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35); }
        .pdf-btn-as-action:hover { background: #1d4ed8; transform: translateY(-1px); }
        .pdf-btn-as-action:active { transform: scale(0.96); }
        .pdf-btn-en-action { background: var(--bg-subtle, #f8fafc); color: var(--ink, #0f172a); border-color: var(--border, #cbd5e1); }
        .pdf-btn-en-action:hover { background: var(--bg-soft, #f1f5f9); border-color: #2563eb; color: #2563eb; transform: translateY(-1px); }
        .pdf-btn-en-action:active { transform: scale(0.96); }
        .btn-indicator-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; display: inline-block; }
        [data-theme="dark"] .pdf-pop-box { background: #0f172a !important; border-color: #334155 !important; color: #f8fafc !important; }
        [data-theme="dark"] .pdf-btn-en-action { background: #1e293b !important; color: #f8fafc !important; border-color: #334155 !important; }
        [data-theme="dark"] .pdf-btn-en-action:hover { border-color: #38bdf8 !important; color: #38bdf8 !important; }
      </style>
    `,document.body.appendChild(a);const n=()=>a.remove();f("#pdf-btn-cancel",a).addEventListener("click",n),f(".read-modal-backdrop",a).addEventListener("click",n),f("#pdf-btn-as",a).addEventListener("click",s=>{s.currentTarget.style.transform="scale(0.95)",setTimeout(()=>{n(),ct(e,"as")},100)}),f("#pdf-btn-en",a).addEventListener("click",s=>{s.currentTarget.style.transform="scale(0.95)",setTimeout(()=>{n(),ct(e,"en")},100)})}async function ct(e,t){if(p.isGeneratingPdf)return;p.isGeneratingPdf=!0,xa(t==="as"?"PDF প্ৰস্তুত হৈ আছে, অনুগ্ৰহ কৰি ৰওক...":"Generating PDF, please wait..."),await new Promise(v=>setTimeout(v,40));let a=e.topic.questions||[];if(!a.length)try{const v=await API.getTopic(e.cat.id,e.topic.id,e.sub&&e.sub.id,e.cat&&e.cat.contentLayout);v&&(a=Array.isArray(v)?v:v.questions||[],e.topic.questions=a)}catch(v){console.error("PDF fetch error:",v)}if(!a.length){Oe(),p.isGeneratingPdf=!1,H(t==="as"?"এই বিষয়ত প্ৰশ্ন উপলব্ধ নহয়!":"No questions available in this topic!");return}const n=e.title[t]||e.title.as||e.title.en||e.topic.id,s=e.cat.name[t]||e.cat.name.as||e.cat.name.en||"",o=t==="as"?"অসমীয়া মাধ্যম":"English Medium",i=t==="as"?"উত্তৰ":"Answer",c=t==="as"?"ব্যাখ্যা":"Explanation",d=t==="as"?"'Noto Serif Bengali', serif":"'Plus Jakarta Sans', sans-serif",u=document.createElement("div");u.style.cssText="position:absolute; left:-9999px; top:-9999px; visibility:hidden; width:726px; font-family:"+d+";",document.body.appendChild(u);const h=a.map((v,C)=>{const A=q(v,"question",t),P=q(v,"answer",t),E=q(v,"explanation",t),L=j(v,t),z=V(v),O=K(v),Y=t,de=v.a&&typeof v.a=="object"&&v.a[Y]||v.a||v.answer,pe=Array.isArray(de)||P.includes("qa-step-line"),N=document.createElement("div");N.className="qa-row",N.style.cssText="border-bottom:1px dashed #e2e8f0; padding-bottom:4px; margin-bottom:7px; line-height:1.4; text-align:left;",pe?N.innerHTML=`
          <div style="font-size:12.8px; font-weight:700; color:#0f172a; margin-bottom:1px; text-align:left;">${C+1}. ${S(A)}</div>
          ${z}
          ${O?Q(v,{compact:!0}):L.length?`
            <div style="font-size:11.2px; color:#475569; margin-bottom:3px; display:flex; flex-wrap:wrap; gap:12px; text-align:left; justify-content:flex-start;">
              ${L.map((On,Fn)=>{const Nn=`(${String.fromCharCode(65+Fn)}) ${On}`;return`<span>${S(Nn)}</span>`}).join("")}
            </div>`:""}
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${P}</div>
          ${E?`<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${c}:</b> ${E}</div>`:""}
        `:N.innerHTML=`
          <div style="font-size:12.8px; font-weight:500; color:#0f172a; margin-bottom:1px; text-align:left;">${C+1}. ${S(A)}</div>
          ${z}
          ${O?Q(v,{compact:!0}):""}
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${i}: ${S(P)}</div>
          ${E?`<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${c}:</b> ${E}</div>`:""}
        `,u.appendChild(N);const Bn=N.offsetHeight+7;return{html:N.outerHTML,height:Bn}});u.remove();const g=[];let m=[],y=0;const k=1010;h.forEach(v=>{y+v.height>k&&m.length>0?(g.push(m),m=[v.html],y=v.height):(m.push(v.html),y+=v.height)}),m.length>0&&g.push(m);const x=g.length,w=document.createElement("div");w.id="dynamic-pdf-export-container",w.style.cssText="position:absolute; left:-9999px; top:-9999px; width:794px; background:#fff;",g.forEach((v,C)=>{const A=C+1,P=A===1,E=document.createElement("div");E.className="pdf-page-node",E.style.cssText=`
        width: 794px;
        height: 1122px;
        max-height: 1122px;
        background: #ffffff;
        color: #0f172a;
        padding: 20px 34px 14px 34px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        margin: 0;
        display: flex;
        flex-direction: column;
        font-family: ${d};
      `;const L=P?`
        <div style="border-bottom:2px solid #4f46e5; padding-bottom:6px; margin-bottom:4px; height:48px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="vertical-align:bottom; text-align:left;">
                <div style="font-size:15px; font-weight:800; color:#0f172a; line-height:1.2; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${l(n)}</div>
                <div style="font-size:10.5px; color:#64748b; margin-top:2px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${l(s)} • ${t==="as"?"মুঠ বিষয়":"Total Content"}: ${a.length} | ${o}</div>
              </td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${Je}
              </td>
            </tr>
          </table>
        </div>
      `:`
        <div style="border-bottom:1.5px solid #e2e8f0; padding-bottom:6px; margin-bottom:4px; height:36px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td></td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${Je}
              </td>
            </tr>
          </table>
        </div>
      `;E.innerHTML=`
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate(-35deg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; pointer-events:none; user-select:none; z-index:0; opacity:0.075; width:140%;">
          <div style="width:110px; height:110px; background:#4f46e5; color:#ffffff; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:68px; font-weight:800; font-family:Arial, sans-serif;">A</div>
          <div style="font-size:58px; font-weight:800; color:#4f46e5; letter-spacing:2px; line-height:1;">axomexam.in</div>
        </div>
        ${L}
        <div style="position:relative; z-index:2; flex:1; display:flex; flex-direction:column; justify-content:flex-start; margin-top:8px; margin-bottom:8px;">
          ${v.join("")}
        </div>
        <div style="border-top:1px solid #e2e8f0; padding-top:4px; display:flex; justify-content:space-between; align-items:center; font-size:9.5px; color:#64748b; font-family:'Plus Jakarta Sans', sans-serif; position:relative; z-index:2;">
          <span>© axomexam.in — Free Educational Notes for Assam Competitive Exams</span>
          <span style="position:absolute; left:50%; transform:translateX(-50%); font-weight:700; color:#334155; font-size:10px;">— Page ${A} of ${x} —</span>
          <span>axomexam.in</span>
        </div>
      `,w.appendChild(E)}),document.body.appendChild(w),U(w);try{if(await Bt(),!window.jspdf||!window.html2canvas)throw new Error("jsPDF or html2canvas library is missing.");const{jsPDF:v}=window.jspdf,C=new v("p","mm","a4"),A=w.querySelectorAll(".pdf-page-node");for(let P=0;P<A.length;P++){const L=(await window.html2canvas(A[P],{scale:2,useCORS:!0,logging:!1})).toDataURL("image/jpeg",.98);P>0&&C.addPage("a4","p"),C.addImage(L,"JPEG",0,0,210,297)}C.save(`${e.topic.id}-${t}.pdf`),w.remove(),Oe(),p.isGeneratingPdf=!1,H(t==="as"?"PDF ডাউনলোড সফল হ'ল!":"PDF downloaded successfully!")}catch(v){console.error("PDF generation failed:",v),w.remove(),Oe(),p.isGeneratingPdf=!1,H("Failed to generate PDF. Please try again.")}}async function wa(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;let t=[];try{t=await API.listDownloads()}catch{}e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("page.downloads.title")}</span></nav>
        <h1>${r("page.downloads.title")}</h1>
        <p class="page-desc">${l(r("page.downloads.desc"))}</p>
      </div>

      <section class="section" style="padding-bottom:28px;">
        <div class="section-head" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:14px;">
          <div>
            <h2>Topic-wise Q&A PDF Notes</h2>
            <p class="sec-sub">Download complete bilingual questions & answers for each topic in PDF format.</p>
          </div>
          <div style="width:100%; max-width:320px; margin:0 auto; position:relative;">
            <input type="search" id="dl-search-input" placeholder="Search PDF by topic name..." autocomplete="off" spellcheck="false"
                   style="width:100%; padding:9px 12px 9px 36px; border-radius:20px; border:1px solid var(--border,#cbd5e1); background:var(--bg,#ffffff); color:var(--ink,#0f172a); font-size:0.85rem; outline:none; box-sizing:border-box; box-shadow:0 1px 3px rgba(0,0,0,0.05);" />
            <svg style="position:absolute; left:12px; top:50%; transform:translateY(-50%); width:15px; height:15px; color:var(--ink-soft,#64748b);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>

        <div class="dl-list" id="topic-pdf-list">
          ${p.topicIndex.map((o,i)=>`
            <div class="dl-item reveal topic-dl-card" data-title="${l(Me(o.title))}" data-cat="${l(Me(o.cat.name))}" data-delay="${i%12*30}">
              <span class="dl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </span>
              <span class="dl-meta">
                <b>${l(b(o.title))}</b>
                <span>${l(b(o.cat.name))}${o.sub?" • "+l(b(o.sub.name)):""} • <span id="dl-count-${o.path.replace(/\//g,"-")}">${o.nQuestions||0}</span> ${o.cat.id==="study-guides"?"Chapters":"Questions"}</span>
              </span>
              <button class="dl-btn dl-save topic-pdf-btn" data-path="${l(o.path)}" type="button" style="text-transform:none;">Download</button>
            </div>
          `).join("")}
        </div>
        <div id="dl-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>No matching PDF topic found.</p></div>
      </section>

      <section class="section" style="padding-bottom:44px; border-top:1px solid var(--border,#e2e8f0); padding-top:30px;">
        <div class="section-head"><div><h2>Special E-Books & Hand-written Notes</h2><p class="sec-sub">Direct official PDFs and curated study materials.</p></div></div>
        ${t.length?`
          <div class="dl-list">
            ${t.map(o=>`
              <div class="dl-item">
                <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
                <span class="dl-meta"><b>${l(o.name.replace(/\.pdf$/i,"").replace(/[-_]+/g," "))}</b><span>PDF Document</span></span>
                <a class="dl-btn dl-save" href="${o.url}" download target="_blank" rel="noopener" style="text-transform:none;">Download</a>
              </div>`).join("")}
          </div>`:'<div class="info-panel"><p>No extra manual PDF uploaded yet.</p></div>'}
      </section>`,M(".topic-pdf-btn",e).forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.path,c=p.topicMap[i];c&&ka(c)})});const a=f("#dl-search-input"),n=M(".topic-dl-card",e),s=f("#dl-no-match");a&&a.addEventListener("input",o=>{const i=D(o.target.value);let c=0;n.forEach(d=>{const u=D(d.dataset.title),h=D(d.dataset.cat);u.includes(i)||h.includes(i)?(d.style.display="",c++):d.style.display="none"}),s&&(s.style.display=c===0?"block":"none")}),T()}function dt(e){const t=e&&e.color;return/^#[0-9a-fA-F]{3,8}$/.test(t||"")?t:"#4f46e5"}function $(e,t){if(e==null)return"";if(typeof e=="string")return e;const a=t||p.lang||"en";return e[a]&&String(e[a]).trim()?e[a]:e.en||e.as||""}function pt(e){if(e==null)return"";const t=String(e).split(`
`);let a="",n=!1;const s=()=>{n&&(a+="</ul>",n=!1)};return t.forEach(o=>{const i=(o||"").trim();if(!i){s();return}const c=i.match(/^[-•*]\s+(.*)$/);c?(n||(a+='<ul class="ebk-list">',n=!0),a+=`<li>${S(c[1])}</li>`):(s(),a+=`<p class="ebk-para">${S(i)}</p>`)}),s(),a}async function $a(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;let t=[];try{t=await API.listBooks()}catch{t=[]}const a=s=>{e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:760px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("ebooks.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${r("ebooks.sub")}</p>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        </div><p>${l(s||r("ebooks.empty"))}</p></div>`};if(!t.length)return a();const n=t.slice().sort((s,o)=>$(s.title,"en").localeCompare($(o.title,"en")));e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("nav.ebooks")}</span>
        </nav>
        <h1>${r("ebooks.title")}</h1>
        <p class="page-desc">${r("ebooks.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="ebooks-grid">
          ${n.map((s,o)=>{const i=(s.chapters||[]).length,c=dt(s),d=$(s.title,"en"),u=$(s.subject,"en"),h=s.cover?String(s.cover):"",g=$(s.coverAlt,p.lang)||d+" e-book cover",m=h?`<img class="ebook-cover-img" src="${l(h)}" alt="${l(g)}" loading="lazy" decoding="async">`:`<span class="ebook-cover-frame" aria-hidden="true"></span>
                  <span class="ebook-cover-top">
                    <span class="ebook-cover-publisher">axomexam</span>
                    <span class="ebook-cover-tag">E-Book</span>
                  </span>
                  <span class="ebook-cover-title">
                    <span class="ebk-tt-en">${l(d)}</span>
                  </span>
                  <span class="ebook-cover-subject">${l(u)}</span>`;return`
              <a class="ebook-card reveal" href="/ebooks/${encodeURIComponent(s.id)}" style="--ebk:${c}" data-delay="${o*60}">
                <span class="ebook-cover${h?" has-photo":""}">${m}</span>
                <span class="ebook-meta">
                  <b>${l(d)}</b>
                  <span class="ebook-meta-sub"><span>${i} ${r("ebooks.chapters")}</span></span>
                  <span class="ebook-read-btn">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
                    ${r("ebooks.readNow")}
                  </span>
                </span>
              </a>`}).join("")}
        </div>
      </section>`,T()}function ut(e,t){const a=e.chapters||[],n=a.map((o,i)=>`
      <a class="ebk-toc-item" href="#ebk-ch-${i}">
        <span class="ebk-toc-no">${i+1}</span>
        <span>${l($(o.title,t))}</span>
      </a>`).join(""),s=a.map((o,i)=>`
      <section class="ebk-chapter" id="ebk-ch-${i}">
        <h3 class="ebk-ch-title"><span class="ebk-ch-no">${i+1}</span>${l($(o.title,t))}</h3>
        <div class="ebk-ch-body">${pt($(o.content,t))}</div>
      </section>`).join("");return`
      ${a.length>1?`<nav class="ebk-toc" aria-label="${l(r("ebooks.toc"))}"><h4>${r("ebooks.toc")}</h4>${n}</nav>`:""}
      <div class="ebk-chapters">${s}</div>`}let Z=null;function F(){Z||(Z=requestAnimationFrame(Aa))}function Aa(){Z=null;const e=document.getElementById("ebk-progress-fill");if(!e)return;const t=document.documentElement,a=t.scrollHeight-window.innerHeight,n=window.pageYOffset||t.scrollTop||0,s=a>0?Math.min(100,Math.max(0,n/a*100)):0;e.style.width=s.toFixed(2)+"%"}function ht(){const e=document.getElementById("ebk-progress");e&&e.remove(),window.removeEventListener("scroll",F),window.removeEventListener("resize",F),Z&&(cancelAnimationFrame(Z),Z=null)}function ie(e){ht();const t=document.createElement("div");t.id="ebk-progress",t.className="ebk-progress",t.style.setProperty("--ebk",e);const a=document.createElement("span");a.id="ebk-progress-fill",t.appendChild(a),document.body.appendChild(t),window.addEventListener("scroll",F,{passive:!0}),window.addEventListener("resize",F),F()}async function Ca(e,t){const a=String(t||"").replace(/[^A-Za-z0-9_-]/g,"");if(e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,!a)return B(e);let n=null;try{n=await API.getBook(a)}catch{n=null}if(!n||!n.title||!(n.chapters&&n.chapters.length)){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("ebooks.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${r("ebooks.empty")}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/ebooks">${r("ebooks.backToLib")}</a></div>
        </div>`;return}const s=n.chapters||[];let o=p.lang==="as"?"as":"en";const i=$(n.title,"en"),c=$(n.title,"as"),d=$(n.subject,"en"),u=$(n.subject,"as"),h=dt(n),g=c&&c!==i;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/ebooks">${r("nav.ebooks")}</a><span class="bc-sep">/</span>
          <span>${l(i)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${h};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${l(d)}${u&&u!==d?`<span class="ebk-chip-as"> ${l(u)}</span>`:""}</span>
            </div>
            <h2 class="ebk-head-title">${l(i)}${g?`<span class="ebk-head-title-as">${l(c)}</span>`:""}</h2>
            ${n.description?`<p class="ebk-desc">${l(b(n.description)).replace(/\n/g,"<br>")}</p>`:""}
            <div class="ebk-head-meta">
              ${n.author?`<span><b>${l(b(n.author))}</b></span>`:""}
              <span>${s.length} ${r("ebooks.chapters")}</span>
              ${n.updated?`<span>${r("ebooks.updated")}: ${l(n.updated)}</span>`:""}
            </div>
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${o==="as"?"active":""}" data-ebklang="as">${r("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${o==="en"?"active":""}" data-ebklang="en">${r("topic.lang.en")}</button>
          </div>
        </div>

        <div id="ebk-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/ebooks">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${r("ebooks.backToLib")}
          </a>
          <p class="ebk-no-pdf">${r("ebooks.noPdf")}</p>
        </div>
      </div>`;const m=f("#ebk-body");m&&(m.innerHTML=ut(n,o)),ie(h),M(".lang-btn",e).forEach(y=>{y.addEventListener("click",()=>{const k=y.dataset.ebklang;o!==k&&(o=k,M(".lang-btn",e).forEach(x=>x.classList.toggle("active",x.dataset.ebklang===o)),m&&(m.innerHTML=ut(n,o),F()))})})}const ee={syllabus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3.5 6h.01"/><path d="M3.5 12h.01"/><path d="M3.5 18h.01"/></svg>',"elementary-mathematics":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h4"/></svg>',"general-english":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6"/><path d="M9 11h6"/></svg>',"logical-reasoning":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.8.7 1.1 1.5 1.1 2.7h5c0-1.2.3-2 1.1-2.7A6 6 0 0 0 12 3z"/></svg>',"assam-history-geography-culture":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9.5 21v-6h5v6"/></svg>',"general-knowledge-current-affairs":'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',default:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>'};function Ma(e){const t=e&&e.id||"";return ee[t]?ee[t]:e&&e.type==="syllabus"?ee.syllabus:ee.default}function G(e,t){const a=t&&t.color||e&&e.color;return/^#[0-9a-fA-F]{3,8}$/.test(a||"")?a:"#4f46e5"}async function te(){if(Array.isArray(p.exams))return p.exams;let e=[];try{e=await API.listExams()}catch{e=[]}return p.exams=Array.isArray(e)?e:[],p.exams}function Ee(e){return(p.exams||[]).find(t=>t.id===e)||null}function re(e){return!!(e&&e.status==="available"&&(e.sections||[]).length)}function mt(e,t){return $(e&&e.coverAlt,t)||$(e&&e.title,t)||"Exam book cover"}function Ea(e,t){const a=G(e),n=$(e.title,"en"),s=$(e.title,"as"),o=$(e.subtitle,"en"),i=re(e),c=r(i?"exams.readNow":"exams.comingSoon"),d=D(n+" "+s+" "+o),u=e.cover?String(e.cover):"",h=i?"":`<span class="exam-soon-badge">${l(r("exams.comingSoon"))}</span>`,g=u?`<img class="ebook-cover-img" src="${l(u)}" alt="${l(mt(e,p.lang))}" loading="lazy" decoding="async">${h}`:`<span class="ebook-cover-frame" aria-hidden="true"></span>
          <span class="ebook-cover-top">
            <span class="ebook-cover-publisher">axomexam</span>
            <span class="ebook-cover-tag">${l(r(i?"nav.exams":"exams.comingSoon"))}</span>
          </span>
          <span class="ebook-cover-title">
            <span class="ebk-tt-en">${l(n)}</span>
            ${s&&s!==n?`<span class="ebk-tt-as">${l(s)}</span>`:""}
          </span>
          <span class="ebook-cover-subject">${l(o)}</span>
          ${h}`;return`
      <a class="ebook-card reveal exam-card ${i?"":"is-soon"}" href="/exams/${encodeURIComponent(e.id)}" style="--ebk:${a}" data-name="${l(d)}" data-delay="${t%8*50}">
        <span class="ebook-cover${u?" has-photo":""}">${g}</span>
        <span class="ebook-meta">
          <b>${l(n)}</b>
          <span class="ebook-meta-sub">${s&&s!==n?`<span class="ebk-tt-as">${l(s)}</span>`:`<span>${l(o)}</span>`}</span>
          <span class="ebook-read-btn">${l(c)}</span>
        </span>
      </a>`}const Fe={trophy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/></svg>',award:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.5 8 5-3 5 3-1.5-8"/></svg>',calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',atom:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.4"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(120 12 12)"/></svg>',map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22V2"/><path d="M5 3c4 0 4 3 8 3s4-3 8-3v10c-4 0-4-3-8-3s-4 3-8 3"/></svg>',shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',coins:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>',chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/></svg>',leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M17.5 14.6c2.4.5 4 2.1 4 4.4"/></svg>',flower:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 0 1 0 6 3 3 0 0 1 0-6z"/><path d="M12 16a3 3 0 0 1 0 6 3 3 0 0 1 0-6z"/><path d="M2 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/><path d="M16 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/></svg>'};function Sa(e){const t=e&&e.icon||"";if(Fe[t])return Fe[t];if(typeof TOPIC_ICON_RULES<"u"){const a=(e&&e.id||"")+" "+(e&&e.title&&e.title.en||"");for(const[n,s]of TOPIC_ICON_RULES)if(n.test(a))return s}return typeof CATEGORY_ICON_SVG<"u"&&CATEGORY_ICON_SVG["current-affairs"]||Fe.globe}function Pa(e,t){const a=e.color||"#ef4444",n=$(e.title,"en"),s=$(e.title,"as");return`
      <a class="sub-card reveal exam-sec-card" href="/current-affairs/${encodeURIComponent(e.id)}" style="--cat:${a}" data-delay="${t%8*40}">
        <span class="sub-ico"><span class="cat-svg">${Sa(e)}</span></span>
        <span class="exam-sec-txt">
          <b>${l(n)}</b>
          ${s&&s!==n?`<span class="exam-sec-as">${l(s)}</span>`:""}
          <span class="exam-sec-count" data-ca-count="${l(e.id)}" hidden></span>
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`}async function La(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;let t=[];try{t=await API.listCurrentAffairs()}catch{t=[]}Array.isArray(t)||(t=[]),e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("nav.currentAffairs")}</span>
        </nav>
        <h1>${r("ca.title")}</h1>
        <p class="page-desc">${r("ca.sub")}</p>
        <p class="exams-choose">${r("ca.choose")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        ${t.length?`<div class="sub-grid exam-sec-grid" style="--cat:#ef4444">${t.map((a,n)=>Pa(a,n)).join("")}</div>`:`<div class="qa-empty"><div class="big">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/></svg>
            </div><p>${l(r("ca.empty"))}</p></div>`}
        <p class="ebooks-note">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          ${l(r("ca.note"))}
        </p>
      </section>`,T(),bt(),vt()}async function qa(e,t){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;let a=null,n=[];try{a=await API.getCurrentAffairsCategory(t)}catch{a=null}try{n=await API.listCurrentAffairsQuestions(t)}catch{n=[]}if(Array.isArray(n)||(n=[]),!a){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("ca.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${l(r("ca.noCategory"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/current-affairs">${r("ca.back")}</a></div>
        </div>`;return}const s=a.color||"#ef4444",o=$(a.title,"en")||t,i=$(a.title,"as"),c=p.lang==="as"?"as":"en",d=n.length;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/current-affairs">${r("nav.currentAffairs")}</a><span class="bc-sep">/</span>
          <span>${l(o)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${s};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${r("nav.currentAffairs")}</span>
              <span class="ebk-chip">${r("ca.questions")}</span>
            </div>
            <h2 class="ebk-head-title">${l(o)}${i&&i!==o?`<span class="ebk-head-title-as">${l(i)}</span>`:""}</h2>
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${r("ca.uploadedBy")}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${c==="as"?"active":""}" data-calang="as">${r("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${c==="en"?"active":""}" data-calang="en">${r("topic.lang.en")}</button>
          </div>
        </div>

        <div id="ca-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/current-affairs">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${r("ca.back")}
          </a>
        </div>
      </div>`;const u=f("#ca-body"),h=a.updated||"",g=a.uploadedBy||"axomexam team",m=y=>{if(!u)return;const k=$(a.intro,y),x=k?`<div class="ca-intro" style="margin:0 0 14px; padding:14px 16px; border-radius:14px; border:1px solid var(--border,#e2e8f0); background:linear-gradient(180deg, color-mix(in srgb, ${s} 9%, transparent), transparent); font-size:.92rem; line-height:1.65; color:var(--ink-soft,#334155); text-align:left;">${l(k)}</div>`:"",w=`
        <div class="ca-meta" style="display:flex; flex-wrap:wrap; gap:6px 18px; margin:0 0 18px; font-size:.78rem; color:var(--ink-muted,#64748b);">
          ${h?`<span><b>${y==="as"?"আপডেট":"Updated"}:</b> ${l(h)}</span>`:""}
          <span><b>${y==="as"?"আপলোড কৰিছে":"Uploaded by"}:</b> ${l(g)}</span>
        </div>`,v=d?`<div class="qa-list">${n.map((C,A)=>Se(C,A+1,y)).join("")}</div>`:`<div class="qa-empty"><p>${l(r("ca.noContent"))}</p></div>`;u.innerHTML=x+w+v};m(c),ie(s),M(".lang-btn",e).forEach(y=>{y.addEventListener("click",()=>{const k=y.dataset.calang;M(".lang-btn",e).forEach(x=>x.classList.toggle("active",x.dataset.calang===k)),m(k),F()})})}async function Ta(e){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`;const t=await te();if(!t.length){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:760px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${r("exams.sub")}</p>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div><p>${l(r("exams.empty"))}</p></div>`;return}const a=t.slice().sort((i,c)=>{const d=re(i)?0:1,u=re(c)?0:1;return d!==u?d-u:$(i.title,"en").localeCompare($(c.title,"en"))});e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("nav.exams")}</span>
        </nav>
        <h1>${r("exams.title")}</h1>
        <p class="page-desc">${r("exams.sub")}</p>
        <p class="exams-choose">${r("exams.choose")}</p>
        <div class="exams-search-wrap">
          <svg class="exams-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="exam-search" type="search" autocomplete="off" spellcheck="false" placeholder="${l(r("exams.search.ph"))}" aria-label="${l(r("exams.search.ph"))}" />
        </div>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="ebooks-grid" id="exams-grid">${a.map((i,c)=>Ea(i,c)).join("")}</div>
        <div id="exams-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>${l(r("exams.noMatch"))}</p></div>
        <p class="ebooks-note">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          ${l(r("exams.readOnly"))}
        </p>
      </section>`;const n=f("#exam-search"),s=M(".exam-card",e),o=f("#exams-no-match");n&&n.addEventListener("input",()=>{const i=D(n.value);let c=0;s.forEach(d=>{const u=!i||(d.dataset.name||"").indexOf(i)!==-1;d.style.display=u?"":"none",u&&c++}),o&&(o.style.display=c?"none":"block")}),T()}function Ia(e,t,a){const n=G(e,t),s=$(t.title,"en"),o=$(t.title,"as"),i=t.type==="syllabus";return`
      <a class="sub-card reveal exam-sec-card" href="/exams/${encodeURIComponent(e.id)}/${encodeURIComponent(t.id)}" style="--cat:${n}" data-delay="${a%8*40}">
        <span class="sub-ico">${Ma(t)}</span>
        <span class="exam-sec-txt">
          <b>${l(s)}</b>
          ${o&&o!==s?`<span class="exam-sec-as">${l(o)}</span>`:""}
          ${i?"":`<span class="exam-sec-count" data-count-exam="${l(e.id)}" data-count-section="${l(t.id)}" hidden></span>`}
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`}function za(e){const t=(e&&e.id||"").toLowerCase(),a=String($(e&&e.title,"en")||"").toLowerCase(),n=t+" "+a;if(typeof TOPIC_ICON_RULES<"u"){for(const[s,o]of TOPIC_ICON_RULES)if(s.test(n))return o}return ee.default}function ft(e,t,a,n,s){const o=G(e,t),i=$(a.title,"en"),c=$(a.title,"as"),d=`/exams/${encodeURIComponent(e.id)}/${encodeURIComponent(t.id)}/${s?encodeURIComponent(s)+"/":""}${encodeURIComponent(a.id)}`,u=s?`${s}/${a.id}`:a.id;return`
      <a class="sub-card reveal exam-sec-card" href="${d}" style="--cat:${o}" data-delay="${n%8*40}">
        <span class="sub-ico">${za(a)}</span>
        <span class="exam-sec-txt">
          <b>${l(i)}</b>
          ${c&&c!==i?`<span class="exam-sec-as">${l(c)}</span>`:""}
          <span class="exam-sec-count" data-count-exam="${l(e.id)}" data-count-section="${l(t.id)}" data-count-path="${l(u)}" hidden></span>
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`}function ja(e,t){let a=e||[],n=null;for(const s of t){if(n=a.find(o=>o&&o.id===s)||null,!n)return null;a=n.subcategories||[]}return n}async function Ne(e,t,a,n){const s=n&&Array.isArray(n.subcategories)?n.subcategories:[];return s.length?(await Promise.all(s.map(c=>Ne(e,t,a.concat(c.id),c)))).reduce((c,d)=>c+d,0):(await API.listExamQuestions(e,t,a[0],a[1])).length}async function gt(e,t){const a=Array.isArray(t.subcategories)?t.subcategories:[];if(a.length)return(await Promise.all(a.map(o=>Ne(e,t.id,[o.id],o)))).reduce((o,i)=>o+i,0);const n=await API.getExamSection(e,t.id);return(n&&n.questions||[]).length}async function Ge(e,t){if(!e||!t)return;const a=Array.from(e.querySelectorAll(".exam-sec-count")),n=p.counts&&p.counts.examSectionCounts;await Promise.all(a.map(async s=>{const o=s.dataset.countExam||t.id,i=s.dataset.countSection,c=(t.sections||[]).find(h=>h.id===i);if(!c||c.type==="syllabus")return;const d=s.dataset.countPath||"";if(n){const h=d?`${o}/${i}/${d}`:`${o}/${i}`;if(Object.prototype.hasOwnProperty.call(n,h)){const g=Number(n[h])||0;g>0&&(s.textContent=`${g} ${r("topic.questions")}`,s.hidden=!1);return}}let u=0;try{if(d){const h=d.split("/").filter(Boolean),g=ja(c.subcategories||[],h);u=await Ne(o,i,h,g)}else u=await gt(o,c)}catch{u=0}u>0&&(s.textContent=`${u} ${r("topic.questions")}`,s.hidden=!1)}))}function le(){const e=f("#stat-total-questions");if(e){const a=p.topicIndex.reduce((n,s)=>n+(s.nQuestions||0),0)+Ve+(p.examQuestionTotal||0)+(p.caQuestionTotal||0);e.textContent=`${a.toLocaleString()}+`}const t=f("#stat-total-pdfs");if(t){const a=p.topicIndex.length+p.topicIndex.filter(n=>n.pdf).length;t.textContent=`${a}+`}}function Ha(){return p.counts&&typeof p.counts.examsTotal=="number"?(p.examQuestionTotal=p.counts.examsTotal,p.examTotalLoaded=!0,le(),Promise.resolve(p.examQuestionTotal)):(p.examTotalPromise||(p.examTotalPromise=(async()=>{try{await te();const e=(p.exams||[]).filter(a=>re(a));let t=0;for(const a of e){const n=Array.isArray(a.sections)?a.sections:[],s=await Promise.all(n.map(o=>!o||o.type==="syllabus"?Promise.resolve(0):gt(a.id,o).catch(()=>0)));t+=s.reduce((o,i)=>o+i,0),p.examQuestionTotal=t,le()}p.examQuestionTotal=t,p.examTotalLoaded=!0}catch{}return le(),p.examQuestionTotal})()),p.examTotalPromise)}function bt(){const e=p.caCounts||{};M(".exam-sec-count[data-ca-count]").forEach(t=>{const a=t.dataset.caCount;if(!a||!Object.prototype.hasOwnProperty.call(e,a))return;const n=Number(e[a])||0;n>0&&(t.textContent=`${n} ${r("topic.questions")}`,t.hidden=!1)})}function vt(){return p.caTotalPromise||(p.caTotalPromise=(async()=>{try{const e=await API.getCurrentAffairsCounts();p.caCounts=e&&e.counts||{},p.caQuestionTotal=e&&e.total||0,le(),bt()}catch{}return p.caQuestionTotal})()),p.caTotalPromise}async function Ra(e,t){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,await te();const a=Ee(t);if(!a){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${l(r("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${r("exams.backToExams")}</a></div>
        </div>`;return}const n=G(a),s=$(a.title,"en"),o=$(a.title,"as"),i=$(a.subtitle,"en"),c=$(a.subtitle,"as");if(!re(a)){e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
            <span>${l(s)}</span>
          </nav>
        </div>
        <div class="exam-soon-panel" style="--ebk:${n}">
          <span class="exam-soon-ico">${ee.default}</span>
          <h1>${l(s)}${o&&o!==s?` <span class="exam-soon-as">${l(o)}</span>`:""}</h1>
          ${i?`<p class="exam-soon-sub">${l(i)}</p>`:""}
          <span class="exam-soon-chip">${r("exams.comingSoon")}</span>
          <p class="exam-soon-msg">${l(r("exams.comingSoonMsg"))}</p>
          <a class="btn btn-accent" href="/exams">${r("exams.backToExams")}</a>
        </div>`;return}const u=a.sections||[],h=a.cover?String(a.cover):"",g=`${l(s)}${o&&o!==s?` <span class="exam-head-as">${l(o)}</span>`:""}`,m=`${l(i)}${c&&c!==i?` &bull; ${l(c)}`:""}`,y=`
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
          <span>${l(s)}</span>`,k=h?`<div class="page-head">
          <nav class="breadcrumb">${y}</nav>
        </div>
        <section class="exam-cover-hero" style="--ebk:${n}">
          <div class="exam-cover-hero-media">
            <img src="${l(h)}" alt="${l(mt(a,p.lang))}" width="912" height="1166" loading="eager" decoding="async">
          </div>
          <div class="exam-cover-hero-info">
            <h1>${g}</h1>
            <p class="page-desc">${m}</p>
            <p class="exams-choose">${r("exams.subjects")}</p>
            <p class="exam-cover-hero-note">${l(r("exams.readOnly"))}</p>
          </div>
        </section>`:`<div class="page-head">
          <nav class="breadcrumb">${y}</nav>
          <h1>${g}</h1>
          <p class="page-desc">${m}</p>
          <p class="exams-choose">${r("exams.subjects")}</p>
        </div>`;e.innerHTML=`
      ${k}
      <section class="section" style="padding-bottom:46px;">
        <div class="sub-grid exam-sec-grid" style="--cat:${n}">
          ${u.map((x,w)=>Ia(a,x,w)).join("")}
        </div>
        <p class="ebooks-note">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          ${l(r("exams.readOnly"))}
        </p>
      </section>`,T(),Ge(e,a)}function yt(e,t){const a=j(e,t);return a.length?`
      <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
        ${a.map((n,s)=>`
          <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
            <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65+s)})</b>
            <span style="flex:1; line-height:1.4;">${S(n)}</span>
          </div>
        `).join("")}
      </div>`:""}function Da(e,t,a){const n=String(a||"").replace(/<[^>]+>/g,"").trim();if(n){const o=/^[\(\[]?([a-eA-E])[\)\]]?[.)]?$/.exec(n);if(!o)return a;const i=j(e,t),c=o[1].toLowerCase().charCodeAt(0)-97;return i[c]===void 0||i[c]===""?a:`${o[1].toUpperCase()}) ${i[c]}`}const s=K(e);if(s&&s.length){const o=e&&e.correct!==void 0?e.correct:e?e.answer:void 0;if(Number.isInteger(o)){if(o>=0&&o<s.length)return s[o].letter||String.fromCharCode(65+o)}else if(typeof o=="string"){const i=/^[\(\[]?([a-eA-E])[\)\]]?[.)]?$/.exec(o.trim());if(i)return i[1].toUpperCase()}}return a}function Se(e,t,a){const n=$(e.category,a),s=q(e,"question",a),o=Da(e,a,q(e,"answer",a)),i=q(e,"explanation",a),c=V(e),d=K(e),u=e.a&&typeof e.a=="object"&&e.a[a]||e.a||e.answer,h=Array.isArray(u)||o.includes("qa-step-line"),g=n?`<span style="display:block; margin-bottom:4px; font-size:.68rem; font-weight:800; letter-spacing:.4px; text-transform:uppercase; color:var(--ebk,#4f46e5);">${l(n)}</span>`:"";return h?`
        <article class="qa-card" data-n="${t}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:0; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
          <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
            ${g}${t}. ${S(s)}
          </div>
          ${c}
          ${d?Q(e,{compact:!0}):yt(e,a)}
          <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
            <div class="a-body" style="margin:0; padding:0; text-align:left;">${o}</div>
            ${i?`
              <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                <b style="color:var(--ink,#0f172a);">${a==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${i}
              </div>`:""}
          </div>
        </article>`:`
      <article class="qa-card" data-n="${t}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:0; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
        <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
          <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${t}</span>
          <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${g}${S(s)}</span>
        </div>
        ${c}
        ${d?Q(e):yt(e,a)}
        ${o?`<div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
          <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${r("topic.answer")}:</span>
          <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${S(o)}</span>
        </div>`:""}
        ${i?`
          <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
            <b style="color:var(--ink,#0f172a);">${a==="as"?"ব্যাখ্যা":"Explanation"}:</b> ${S(i)}
          </div>`:""}
      </article>`}function Ba(e,t,a){if((e.type||t&&t.type||"qa")==="syllabus"||e.chapters&&e.chapters.length){const o=e.chapters||[];return o.length?`<div class="ebk-chapters">${o.map((i,c)=>`
        <section class="ebk-chapter" id="exam-ch-${c}">
          <h3 class="ebk-ch-title"><span class="ebk-ch-no">${c+1}</span>${l($(i.title,a))}</h3>
          <div class="ebk-ch-body">${pt($(i.content,a))}</div>
        </section>`).join("")}</div>`:`<div class="qa-empty"><p>${l(r("exams.noContent"))}</p></div>`}const s=Array.isArray(e.questions)?e.questions:[];return s.length?`<div class="qa-list">${s.map((o,i)=>Se(o,i+1,a)).join("")}</div>`:`<div class="qa-empty"><p>${l(r("exams.noContent"))}</p></div>`}async function Oa(e,t,a){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,await te();const n=Ee(t),s=n?(n.sections||[]).find(v=>v.id===a):null;if(!n||!s){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${l(r("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${r("exams.backToExams")}</a></div>
        </div>`;return}const o=Array.isArray(s.subcategories)?s.subcategories:[];if(o.length){const v=G(n,s),C=$(n.title,"en"),A=$(s.title,"en"),P=$(s.title,"as");e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(t)}">${l(C)}</a><span class="bc-sep">/</span>
            <span>${l(A)}</span>
          </nav>
          <h1>${l(A)}${P&&P!==A?` <span class="exam-head-as">${l(P)}</span>`:""}</h1>
          <p class="exams-choose">${r("exams.subCategories")}</p>
        </div>
        <section class="section" style="padding-bottom:46px;">
          <div class="sub-grid exam-sec-grid" style="--cat:${v}">
            ${o.map((E,L)=>ft(n,s,E,L)).join("")}
          </div>
          <p class="ebooks-note">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${l(r("exams.readOnly"))}
          </p>
        </section>`,T(),Ge(e,n);return}let i=null;try{i=await API.getExamSection(t,a)}catch{i=null}const c=G(n,s),d=$(n.title,"en"),u=$(s.title,"en");if(!i){e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(t)}">${l(d)}</a><span class="bc-sep">/</span>
            <span>${l(u)}</span>
          </nav>
          <h1>${l(u)}</h1>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        </div><p>${l(r("exams.noContent"))}</p>
        <div style="margin-top:16px;"><a class="btn btn-outline btn-sm" href="/exams/${encodeURIComponent(t)}">${r("exams.backToExams")}</a></div></div>`;return}const h=p.lang==="as"?"as":"en",g=$(i.title,"en")||u,m=$(i.title,"as")||$(s.title,"as"),y=b(i.description),k=(i.type||s.type)==="syllabus";e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(t)}">${l(d)}</a><span class="bc-sep">/</span>
          <span>${l(g)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${c};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${l(d)}</span>
              <span class="ebk-chip">${l(r(k?"exams.syllabus":"exams.questions"))}</span>
            </div>
            <h2 class="ebk-head-title">${l(g)}${m&&m!==g?`<span class="ebk-head-title-as">${l(m)}</span>`:""}</h2>
            ${y?`<p class="ebk-desc">${l(y).replace(/\n/g,"<br>")}</p>`:""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${l(r("exams.readOnly"))}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${h==="as"?"active":""}" data-exlang="as">${r("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${h==="en"?"active":""}" data-exlang="en">${r("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/exams/${encodeURIComponent(t)}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${r("exams.backToExams")}
          </a>
          <p class="ebk-no-pdf">${l(r("exams.readOnly"))}</p>
        </div>
      </div>`;const x=f("#exam-body"),w=v=>{x&&(x.innerHTML=Ba(i,s,v))};w(h),ie(c),M(".lang-btn",e).forEach(v=>{v.addEventListener("click",()=>{const C=v.dataset.exlang;M(".lang-btn",e).forEach(A=>A.classList.toggle("active",A.dataset.exlang===C)),w(C),F()})})}async function Fa(e,t,a,n){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,await te();const s=Ee(t),o=s?(s.sections||[]).find(A=>A.id===a):null,i=o?(o.subcategories||[]).find(A=>A.id===n):null;if(!s||!o||!i){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${l(r("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${r("exams.backToExams")}</a></div>
        </div>`;return}const c=Array.isArray(i.subcategories)?i.subcategories:[];if(c.length){const A=G(s,o),P=$(s.title,"en"),E=$(o.title,"en"),L=$(i.title,"en"),z=$(i.title,"as"),O=`/exams/${encodeURIComponent(t)}/${encodeURIComponent(a)}`;e.innerHTML=`
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(t)}">${l(P)}</a><span class="bc-sep">/</span>
            <a href="${O}">${l(E)}</a><span class="bc-sep">/</span>
            <span>${l(L)}</span>
          </nav>
          <h1>${l(L)}${z&&z!==L?` <span class="exam-head-as">${l(z)}</span>`:""}</h1>
          <p class="exams-choose">${r("exams.subCategories")}</p>
        </div>
        <section class="section" style="padding-bottom:46px;">
          <div class="sub-grid exam-sec-grid" style="--cat:${A}">
            ${c.map((Y,de)=>ft(s,o,Y,de,i.id)).join("")}
          </div>
          <p class="ebooks-note">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${l(r("exams.readOnly"))}
          </p>
        </section>`,T(),Ge(e,s);return}const d=G(s,o),u=$(s.title,"en"),h=$(o.title,"en"),g=$(i.title,"en"),m=$(i.title,"as"),y=`/exams/${encodeURIComponent(t)}/${encodeURIComponent(a)}`;let k=[];try{k=await API.listExamQuestions(t,a,n)}catch{k=[]}Array.isArray(k)||(k=[]);const x=p.lang==="as"?"as":"en",w=k.length;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(t)}">${l(u)}</a><span class="bc-sep">/</span>
          <a href="${y}">${l(h)}</a><span class="bc-sep">/</span>
          <span>${l(g)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${d};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${l(u)}</span>
              <span class="ebk-chip">${l(r("exams.practice"))}</span>
            </div>
            <h2 class="ebk-head-title">${l(g)}${m&&m!==g?`<span class="ebk-head-title-as">${l(m)}</span>`:""}</h2>
            ${w?`<p class="ebk-desc">${w} ${l(r("exams.questionCount"))}</p>`:""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${l(r("exams.readOnly"))}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${x==="as"?"active":""}" data-exlang="as">${r("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${x==="en"?"active":""}" data-exlang="en">${r("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="${y}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${r("exams.backToSection")}
          </a>
          <p class="ebk-no-pdf">${l(r("exams.readOnly"))}</p>
        </div>
      </div>`;const v=f("#exam-body"),C=A=>{if(v){if(!w){v.innerHTML=`<div class="qa-empty"><p>${l(r("exams.noContent"))}</p></div>`;return}v.innerHTML=`<div class="qa-list">${k.map((P,E)=>Se(P,E+1,A)).join("")}</div>`}};C(x),ie(d),M(".lang-btn",e).forEach(A=>{A.addEventListener("click",()=>{const P=A.dataset.exlang;M(".lang-btn",e).forEach(E=>E.classList.toggle("active",E.dataset.exlang===P)),C(P),F()})})}async function Na(e,t,a,n,s){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,await te();const o=Ee(t),i=o?(o.sections||[]).find(L=>L.id===a):null,c=i?(i.subcategories||[]).find(L=>L.id===n):null,d=c?(c.subcategories||[]).find(L=>L.id===s):null;if(!o||!i||!c||!d){e.innerHTML=`
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${r("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${l(r("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${r("exams.backToExams")}</a></div>
        </div>`;return}const u=G(o,i),h=$(o.title,"en"),g=$(i.title,"en"),m=$(c.title,"en"),y=$(d.title,"en"),k=$(d.title,"as"),x=`/exams/${encodeURIComponent(t)}/${encodeURIComponent(a)}`,w=`${x}/${encodeURIComponent(n)}`;let v=[];try{v=await API.listExamQuestions(t,a,n,s)}catch{v=[]}Array.isArray(v)||(v=[]);const C=p.lang==="as"?"as":"en",A=v.length;e.innerHTML=`
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${r("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(t)}">${l(h)}</a><span class="bc-sep">/</span>
          <a href="${x}">${l(g)}</a><span class="bc-sep">/</span>
          <a href="${w}">${l(m)}</a><span class="bc-sep">/</span>
          <span>${l(y)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${u};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${l(h)}</span>
              <span class="ebk-chip">${l(r("exams.practice"))}</span>
            </div>
            <h2 class="ebk-head-title">${l(y)}${k&&k!==y?`<span class="ebk-head-title-as">${l(k)}</span>`:""}</h2>
            ${A?`<p class="ebk-desc">${A} ${l(r("exams.questionCount"))}</p>`:""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${l(r("exams.readOnly"))}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${C==="as"?"active":""}" data-exlang="as">${r("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${C==="en"?"active":""}" data-exlang="en">${r("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="${w}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${l(r("exams.backToSection"))}
          </a>
          <p class="ebk-no-pdf">${l(r("exams.readOnly"))}</p>
        </div>
      </div>`;const P=f("#exam-body"),E=L=>{if(P){if(!A){P.innerHTML=`<div class="qa-empty"><p>${l(r("exams.noContent"))}</p></div>`;return}P.innerHTML=`<div class="qa-list">${v.map((z,O)=>Se(z,O+1,L)).join("")}</div>`}};E(C),ie(u),M(".lang-btn",e).forEach(L=>{L.addEventListener("click",()=>{const z=L.dataset.exlang;M(".lang-btn",e).forEach(O=>O.classList.toggle("active",O.dataset.exlang===z)),E(z),F()})})}function Ga(e){const a=[["All Mock Tests","Timed chapter-wise mock tests with instant score and review, exactly like the real exam."],["Bilingual Q&A Practice","Practice questions, answers and explanations in both English and Assamese."],["E-Books On the Go","Read every subject e-book right inside the app — Assam History, Polity, Geography and more."],["Previous Year Papers","Solved past papers organised by exam and year for focused revision."],["PDF Notes & Downloads","Save study material and keep it ready for offline revision."],["Lightweight & Fast","The complete axomexam experience in a tiny 389 KB app."]].map(([i,c])=>`
        <div class="appdl-feature">
          <span class="appdl-ico"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
          <h3>${i}</h3>
          <p>${c}</p>
        </div>`).join(""),s=[["Is the axomexam app free?","Yes. The app is 100% free with no sign-up, subscription or hidden charges."],["Why is it not on the Google Play Store?","We distribute the app as a direct APK download so it stays free for every aspirant. A Play Store release may come later."],["Do I need an internet connection?","Yes. Study content, mock tests and notes are loaded online, so an active connection is required."],["Is it safe to install?","Yes. This is our own official build. For your safety, download it only from this page (axomexam.in)."],["Which Android versions are supported?","The app works on modern Android phones with an up-to-date Android System WebView."]].map(([i,c])=>`
        <details class="appdl-faq">
          <summary>${i}</summary>
          <p>${c}</p>
        </details>`).join("");e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">Home</a><span class="bc-sep">/</span><span>Download App</span></nav>
        <h1>Download the axomexam App</h1>
        <p class="page-desc">Get the axomexam Android app — all mock tests, bilingual Q&amp;A practice, e-books and previous year papers in one lightweight app. Free, no sign-up.</p>
      </div>

      <section class="section appdl-hero">
        <div class="appdl-card">
          <img class="appdl-logo" src="/app/axomexam-icon.png" alt="axomexam app logo" width="104" height="104" />
          <div class="appdl-body">
            <h2 class="appdl-title">axomexam — Exam Prep App</h2>
            <p class="appdl-tag">Assam competitive exam preparation, now on your phone.</p>
            <ul class="appdl-meta">
              <li><b>Version</b> 1.9</li>
              <li><b>Size</b> 389 KB</li>
              <li><b>Updated</b> 10 Sep 2026</li>
              <li><b>Format</b> APK</li>
              <li><b>Package</b> in.axomexam.app</li>
              <li><b>Price</b> Free</li>
            </ul>
            <div class="appdl-actions">
              <a class="btn btn-accent appdl-download" href="/app/axomexam-v1.9.apk" download>Download APK (389 KB)</a>
              <a class="btn btn-outline" href="#install">How to install</a>
            </div>
            <p class="appdl-note">Direct download · No sign-up · 100% free</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">What's inside the app</h2>
        <div class="appdl-grid">${a}</div>
      </section>

      <section class="section" id="install">
        <h2 class="appdl-section-title">How to install the APK</h2>
        <ol class="appdl-steps">
          <li><b>Download the APK.</b> Tap the Download button above. The file <code>axomexam-v1.9.apk</code> will be saved to your phone.</li>
          <li><b>Allow the install.</b> If Android blocks it, open Settings and enable “Install unknown apps” (or “Unknown sources”) for your browser.</li>
          <li><b>Install the app.</b> Open the downloaded file from Downloads or the notification, then tap <b>Install</b>.</li>
          <li><b>Open and start learning.</b> Launch <b>axomexam</b> from your app drawer and begin practising.</li>
        </ol>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">System requirements</h2>
        <ul class="appdl-meta">
          <li><b>Platform</b> Android</li>
          <li><b>App version</b> 1.9</li>
          <li><b>File size</b> 389 KB</li>
          <li><b>Internet</b> Required</li>
          <li><b>Price</b> Free</li>
        </ul>
      </section>

      <section class="section">
        <h2 class="appdl-section-title">Frequently asked questions</h2>
        <div class="appdl-faqs">${s}</div>
      </section>

      <section class="section">
        <div class="appdl-safety">
          <b>Safety &amp; disclaimer:</b> For your security, download the app only from this official page (axomexam.in). axomexam is NOT an official app of APSC, Assam Police, SSC, Railway, ADRE or any government body. All exam names and trademarks belong to their respective owners. This is an independent study aid.
        </div>
      </section>`;const o=e.querySelector(".appdl-download");o&&o.addEventListener("click",jn),T()}async function Qa(e,t){if(e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("load.loading")}</p></div>`,t.length===1)return Ya(e);const a=(typeof CONFIG<"u"&&CONFIG.PYEAR_EXAMS||[]).find(c=>c.id===t[1]);if(!a)return B(e);const n=Array.isArray(a.children)?a.children:[];if(n.length>0){if(t.length===2)return _a(e,a,n);const c=n.find(h=>h.id===t[2]);if(!c)return B(e);if(t.length===3){const h=await API.listPreviousYearYears(a.id,c.id);return xt(e,c,h,a)}const d=t[3],u=await API.listPreviousYearPdfs(a.id,d,c.id);return kt(e,c,d,u,a)}if(t.length===2){const c=await API.listPreviousYearYears(a.id);return xt(e,a,c)}const o=t[2],i=await API.listPreviousYearPdfs(a.id,o);kt(e,a,o,i)}function _a(e,t,a){e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${r("page.previous-year.title")}</a><span class="bc-sep">/</span>
          <span>${l(b(t.name))}</span>
        </nav>
        <h1>${l(b(t.name))}</h1>
        <p class="page-desc">${r("pyear.chooseSection.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="section-head"><div><h2>${r("pyear.chooseSection")}</h2></div></div>
        <div class="sub-grid">
          ${a.map((n,s)=>`
            <a class="sub-card reveal" href="/previous-year/${t.id}/${n.id}" style="--cat:${n.color||t.color}" data-delay="${s*40}">
              <span class="sub-ico">${l(n.icon||n.id.slice(0,2).toUpperCase())}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${l(b(n.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${r("pyear.years")}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`,T(),R(e,{id:t.id,name:b(t.name)+" Previous Year Papers",count:a.length,h2:b(t.name)+" Previous Year Question Papers",items:a.map(n=>({name:b(n.name),count:0}))})}function Ya(e){const t=typeof CONFIG<"u"&&CONFIG.PYEAR_EXAMS||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${r("page.previous-year.title")}</span></nav>
        <h1>${r("page.previous-year.title")}</h1>
        <p class="page-desc">${r("page.previous-year.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${t.length?`
          <div class="section-head"><div><h2>${r("pyear.choose")}</h2><p class="sec-sub">${r("pyear.choose.sub")}</p></div></div>
          <div class="sub-grid">
            ${t.map((a,n)=>`
              <a class="sub-card reveal" href="/previous-year/${a.id}" style="--cat:${a.color}" data-delay="${n*40}">
                <span class="sub-ico">${l(a.icon||a.id.slice(0,2).toUpperCase())}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${l(b(a.name))}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${r("pyear.years")}</span>
                </span>
              </a>`).join("")}
          </div>`:`<div class="info-panel"><p>${r("downloads.none")}</p></div>`}
      </section>`,T(),R(e,{name:"Previous Year Question Papers",noDefaults:!0,h2:"Previous Year Question Papers for Assam and Central Exams",info:"Solving previous year papers is the fastest way to understand the real difficulty of an examination. On this page you can download original question papers year by year for Assam Police, DHS and DME, Guwahati High Court, Railway and SSC recruitment. Use them to identify repeated topics, judge the weight of each section and plan your revision with evidence rather than guesswork.",items:t.map(a=>({name:b(a.name),count:0})),tips:["Attempt the paper once under a timer without looking at any notes.","Compare your answers with the official key and list every repeated topic.","Shortlist the two or three sections where you lost the most marks.","Reattempt the same paper after two weeks to confirm real improvement."],faqs:[{q:"Are these the original previous year question papers?",a:"Yes. Each PDF is a compiled question paper for the mentioned exam and year, provided for practice and revision."},{q:"Can I download the papers for offline practice?",a:"Yes. Every paper can be downloaded as a PDF and used on a mobile or printed copy for offline practice."},{q:"Do previous year papers repeat in the actual exam?",a:"Exact questions rarely repeat, but the topics, difficulty level and question style repeat often. That is why solving them is so useful."}]})}function xt(e,t,a,n){const s=n?`<a href="/previous-year/${n.id}">${l(b(n.name))}</a><span class="bc-sep">/</span>`:"";e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${r("page.previous-year.title")}</a><span class="bc-sep">/</span>
          ${s}
          <span>${l(b(t.name))}</span>
        </nav>
        <h1>${l(b(t.name))}</h1>
        <p class="page-desc">${r("pyear.chooseYear")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${a.length?`
          <div class="sub-grid">
            ${a.map((o,i)=>`
              <a class="sub-card reveal" href="/previous-year/${n?n.id+"/":""}${t.id}/${o}" style="--cat:${t.color}" data-delay="${i*50}">
                <span class="sub-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/></svg></span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${l(o)}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${r("pyear.papers")}</span>
                </span>
              </a>`).join("")}
          </div>`:`<div class="info-panel"><p>${r("pyear.noYears")}</p></div>`}
      </section>`,T(),R(e,{id:t.id,name:b(t.name)+" previous year papers",count:a.length,h2:b(t.name)+" Previous Year Papers by Year",items:a.map(o=>({name:String(o),count:0}))})}function kt(e,t,a,n,s){const o=s?`/previous-year/${s.id}/${t.id}`:`/previous-year/${t.id}`,i=s?`<a href="/previous-year/${s.id}">${l(b(s.name))}</a><span class="bc-sep">/</span>`:"",c=d=>`
      <div class="dl-item">
        <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
        <span class="dl-meta"><b>${l(d.name.replace(/\.pdf$/i,"").replace(/[-_]+/g," "))}</b><span>${l(b(t.name))} • ${l(a)}</span></span>
        <a class="dl-btn dl-save" href="${d.url}" download target="_blank" rel="noopener" style="text-transform:none;">Download</a>
      </div>`;e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${r("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${r("page.previous-year.title")}</a><span class="bc-sep">/</span>
          ${i}
          <a href="${o}">${l(b(t.name))}</a><span class="bc-sep">/</span>
          <span>${l(a)}</span>
        </nav>
        <h1>${l(b(t.name))} — ${l(a)}</h1>
        <p class="page-desc">${r("page.downloads.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:44px;">
        ${n.length?`<div class="dl-list">${n.map(c).join("")}</div>`:`<div class="info-panel"><p>${r("pyear.none")}</p></div>`}
      </section>`,R(e,{id:t.id,name:b(t.name)+" "+a+" question paper",count:n.length,h2:b(t.name)+" "+a+" Question Paper",items:n.map(d=>({name:d.name.replace(/\.pdf$/i,"").replace(/[-_]+/g," "),count:0})),faqs:[{q:"Is the "+b(t.name)+" "+a+" paper a solved or unsolved paper?",a:"The PDF contains the question paper for practice. Attempt it first, then cross-check your answers with the relevant answer key or study notes on axomexam.in."},{q:"Can I download the "+b(t.name)+" "+a+" paper?",a:"Yes. Use the download button beside the paper to save the PDF for offline practice."}]})}function Ua(e){e.innerHTML=`
      <div class="success-modal-overlay" id="successPopup" style="position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(5px);display:none;place-items:center;z-index:99999;opacity:0;transition:opacity 0.2s ease;">
        <div class="success-modal-card" style="background:var(--bg,#ffffff);color:var(--ink,#0f172a);border-radius:24px;padding:30px 24px;width:82%;max-width:300px;text-align:center;box-shadow:0 25px 50px -12px rgba(0,0,0,0.35);border:1px solid var(--line,#e2e8f0);">
          <div class="tick-circle" style="width:68px;height:68px;background:#10b981;border-radius:50%;display:grid;place-items:center;margin:0 auto 16px;box-shadow:0 8px 24px -4px rgba(16,185,129,0.5);">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="width:36px;height:36px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 id="pop-title" style="font-size:1.25rem;font-weight:800;color:var(--ink,#0f172a);margin-bottom:4px;">Sent Successfully!</h3>
          <p id="pop-desc" style="font-size:0.84rem;color:var(--ink-soft,#64748b);font-weight:600;">Your message has been received.</p>
        </div>
      </div>

      <div class="form-wrapper" style="width:100%;max-width:540px;margin:20px auto 40px;background:var(--bg,#ffffff);color:var(--ink,#0f172a);border-radius:20px;border:1px solid var(--line,#e2e8f0);box-shadow:var(--card-shadow, 0 12px 36px -8px rgba(15,23,42,0.08));padding:30px 24px;display:flex;flex-direction:column;box-sizing:border-box;">
        <div class="form-header" style="display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:22px;gap:12px;">
          <div class="lang-toggle" style="display:inline-flex;background:var(--bg-soft,#f1f5f9);border:1px solid var(--line,#e2e8f0);border-radius:99px;padding:3px;">
            <button type="button" class="lang-btn active" id="btn-en" style="border:none;background:#2563eb;color:#ffffff;padding:5px 14px;border-radius:99px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">EN</button>
            <button type="button" class="lang-btn" id="btn-as" style="border:none;background:transparent;color:var(--ink-soft,#64748b);padding:5px 14px;border-radius:99px;font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s;">অসমীয়া</button>
          </div>
          <div class="form-title" style="text-align:center;width:100%;">
            <h2 id="txt-title" style="font-size:1.35rem;font-weight:800;color:var(--ink,#0f172a);letter-spacing:-0.4px;">Submit Q&A Note</h2>
            <p id="txt-desc" style="margin-top:4px;font-size:0.84rem;color:var(--ink-soft,#64748b);">Contribute notes or feedback for aspirants.</p>
          </div>
        </div>

        <form id="qaForm" class="form-body" style="display:flex;flex-direction:column;gap:14px;">
          <input type="hidden" name="apiKey" value="sf_304846a9720d7354070bd57c">
          <input type="hidden" name="replyTo" value="axomexam@outlook.com">
          <input type="text" name="honeypot" style="display:none" tabindex="-1" autocomplete="off">

          <div class="field">
            <label id="lbl-name" for="name" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Your Name</label>
            <input type="text" id="name" name="name" placeholder="e.g. Rahul Borah" required style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-email" for="email" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Email Address</label>
            <input type="email" id="email" name="email" placeholder="name@example.com" required style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-topic" for="subject" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Subject / Topic (Optional)</label>
            <input type="text" id="subject" name="subject" placeholder="e.g. Assam History, Science" style="width:100%;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;box-sizing:border-box;font-family:inherit;">
          </div>
          <div class="field">
            <label id="lbl-question" for="question" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Question (Optional)</label>
            <textarea id="question" name="question" rows="2" placeholder="Type the question here..." style="width:100%;min-height:55px;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>
          </div>
          <div class="field">
            <label id="lbl-answer" for="answer" style="display:block;font-size:0.82rem;font-weight:700;margin-bottom:5px;color:var(--ink,#0f172a);">Answer / Message (Optional)</label>
            <textarea id="answer" name="answer" rows="3" placeholder="Provide complete answer, steps or message..." style="width:100%;min-height:90px;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line,#e2e8f0);background:var(--bg-soft,#f8fafc);color:var(--ink,#0f172a);font-size:0.92rem;outline:none;resize:vertical;box-sizing:border-box;font-family:inherit;"></textarea>
          </div>

          <div class="captcha-container" style="background:var(--bg-soft,#f8fafc);border:1.5px solid var(--line,#e2e8f0);border-radius:12px;padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <div class="captcha-left" style="display:flex;align-items:center;gap:8px;">
              <span class="captcha-label" id="lbl-captcha" style="font-size:0.8rem;font-weight:700;color:var(--ink-soft,#64748b);">Security:</span>
              <div class="captcha-badge-wrap" style="display:inline-flex;align-items:center;gap:4px;background:var(--bg,#ffffff);padding:3px 6px 3px 8px;border-radius:8px;border:1px solid var(--line,#cbd5e1);">
                <span class="captcha-math" id="math-expression" style="font-size:0.92rem;font-weight:800;color:#2563eb;user-select:none;">2 + 3 = ?</span>
                <button type="button" class="captcha-refresh-btn" id="btn-refresh-captcha" title="Change Captcha" style="border:none;background:transparent;color:var(--ink-faint,#94a3b8);width:24px;height:24px;display:grid;place-items:center;cursor:pointer;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/></svg>
                </button>
              </div>
            </div>
            <input type="number" id="captcha-answer" placeholder="Ans" required style="width:80px;text-align:center;font-weight:700;font-size:0.92rem;padding:7px 8px;background:var(--bg,#ffffff);color:var(--ink,#0f172a);border:1.5px solid var(--line,#cbd5e1);border-radius:8px;outline:none;-moz-appearance:textfield;">
          </div>

          <button type="submit" id="submitBtn" style="width:100%;padding:14px 20px;font-size:0.95rem;font-weight:700;border-radius:12px;margin-top:4px;cursor:pointer;border:none;background:#2563eb !important;color:#ffffff !important;box-shadow:0 6px 16px -4px rgba(37,99,235,0.45);transition:all 0.2s ease;">
            <span id="txt-btn">Submit</span>
          </button>

          <div id="form-error" class="error-msg" style="padding:10px 12px;border-radius:12px;font-size:0.84rem;font-weight:600;display:none;text-align:center;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;"></div>
        </form>
      </div>
    `;const t={en:{title:"Submit Q&A Note",desc:"Contribute notes or feedback for aspirants.",name:"Your Name",namePh:"e.g. Rahul Borah",email:"Email Address",emailPh:"name@example.com",topic:"Subject / Topic (Optional)",topicPh:"e.g. Assam History, Science",question:"Question (Optional)",questionPh:"Type the question here...",answer:"Answer / Message (Optional)",answerPh:"Provide complete answer, steps or message...",captcha:"Security:",captchaPh:"Ans",btn:"Submit",submitting:"Submitting...",captchaError:"Incorrect math answer! Please try again.",popTitle:"Sent Successfully!",popDesc:"Your message has been received."},as:{title:"প্ৰশ্ন প্ৰেৰণ কৰক (Submit Q&A)",desc:"প্ৰশ্ন বা বাৰ্তা জমা দি শিক্ষাৰ্থীসকলক সহায় কৰক।",name:"আপোনাৰ নাম",namePh:"যেনে: ৰাহুল বৰা",email:"ইমেইল ঠিকনা",emailPh:"name@example.com",topic:"বিষয় / অধ্যায় (ঐচ্ছিক)",topicPh:"যেনে: অসম বুৰঞ্জী, বিজ্ঞান",question:"প্ৰশ্ন (ঐচ্ছিক)",questionPh:"প্ৰশ্নটো ইয়াত লিখক...",answer:"উত্তৰ বা বাৰ্তা (ঐচ্ছিক)",answerPh:"সম্পূৰ্ণ উত্তৰ বা বাৰ্তা ইয়াত লিখক...",captcha:"সুৰক্ষা:",captchaPh:"উত্তৰ",btn:"জমা দিয়ক",submitting:"প্ৰেৰণ হৈ আছে...",captchaError:"অংকৰ উত্তৰ ভুল হৈছে! পুনৰ চেষ্টা কৰক।",popTitle:"সফলতাৰে প্ৰেৰণ হ'ল!",popDesc:"আপোনাৰ বাৰ্তা লাভ কৰা হৈছে।"}};let a="en",n=0;function s(){const c=Math.floor(Math.random()*9)+1,d=Math.floor(Math.random()*9)+1;n=c+d,f("#math-expression").textContent=`${c} + ${d} = ?`,f("#captcha-answer").value=""}function o(c){a=c;const d=f("#btn-en"),u=f("#btn-as");c==="en"?(d.style.background="#2563eb",d.style.color="#ffffff",u.style.background="transparent",u.style.color="var(--ink-soft,#64748b)"):(u.style.background="#2563eb",u.style.color="#ffffff",d.style.background="transparent",d.style.color="var(--ink-soft,#64748b)");const h=t[c];f("#txt-title").textContent=h.title,f("#txt-desc").textContent=h.desc,f("#lbl-name").textContent=h.name,f("#name").placeholder=h.namePh,f("#lbl-email").textContent=h.email,f("#email").placeholder=h.emailPh,f("#lbl-topic").textContent=h.topic,f("#subject").placeholder=h.topicPh,f("#lbl-question").textContent=h.question,f("#question").placeholder=h.questionPh,f("#lbl-answer").textContent=h.answer,f("#answer").placeholder=h.answerPh,f("#lbl-captcha").textContent=h.captcha,f("#captcha-answer").placeholder=h.captchaPh,f("#txt-btn").textContent=h.btn,f("#pop-title").textContent=h.popTitle,f("#pop-desc").textContent=h.popDesc}function i(){const c=f("#successPopup");c.style.display="grid",c.style.opacity="1",setTimeout(()=>{c.style.opacity="0",setTimeout(()=>{c.style.display="none"},200)},2e3)}f("#btn-en").addEventListener("click",()=>o("en")),f("#btn-as").addEventListener("click",()=>o("as")),f("#btn-refresh-captcha").addEventListener("click",s),f("#qaForm").addEventListener("submit",async function(c){c.preventDefault();const d=f("#form-error");if(d.style.display="none",parseInt(f("#captcha-answer").value,10)!==n){d.textContent=t[a].captchaError,d.style.display="block",s();return}const h=f("#submitBtn"),g=f("#txt-btn");h.disabled=!0,g.textContent=t[a].submitting;const m=f("#subject").value.trim()||"General Note",y=f("#question").value.trim()||"N/A",k=f("#answer").value.trim()||"N/A",x={apiKey:"sf_304846a9720d7354070bd57c",replyTo:"axomexam@outlook.com",name:f("#name").value.trim(),email:f("#email").value.trim(),subject:`[axomexam Submission] ${m}`,message:`Topic: ${m}

Question:
${y}

Answer/Message:
${k}

Sent to: axomexam@outlook.com`};try{const v=await(await fetch("https://api.staticforms.dev/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(x)})).json();v.success?(f("#qaForm").reset(),s(),i()):(d.textContent=v.message||"Failed to submit. Please try again.",d.style.display="block")}catch{d.textContent="Network error. Please check your connection.",d.style.display="block"}finally{h.disabled=!1,g.textContent=t[a].btn}}),s()}function Wa(e,t,a,n){const s=[];return p.topicIndex.forEach(o=>{o.cat.id===e.id&&(t&&t!=="all"&&(!o.sub||o.sub.id!==t)||a&&(!o.section||o.section.id!==a)||n&&o.topic.id!==n||s.push(o))}),s}async function Va(e,t,a,n){const s=Wa(e,t,a,n);if(!s.length)return[];const o=await Promise.all(s.map(c=>API.getTopic(c.cat.id,c.topic.id,c.sub&&c.sub.id,c.cat&&c.cat.contentLayout).then(d=>({d,rec:c})).catch(()=>null))),i=[];return o.forEach(c=>{if(!c||!c.d)return;(Array.isArray(c.d)?c.d:Array.isArray(c.d.questions)?c.d.questions:[]).forEach(u=>{const h={en:q(u,"question","en"),as:q(u,"question","as")},g={en:q(u,"answer","en"),as:q(u,"answer","as")},m=j(u,"en"),y=j(u,"as"),k=Array.isArray(u.options)?u.options:[];let x=[];if(m.length||y.length){const v=Math.max(m.length,y.length);for(let C=0;C<v;C++){const A=k[C];x.push({en:m[C]||"",as:y[C]||"",fig:A&&typeof A=="object"&&typeof A.fig=="string"?A.fig:""})}}let w=0;if(typeof u.correct=="string"){const C=u.correct.trim().toLowerCase().charCodeAt(0);C>=97&&C<=101&&(w=C-97)}else if(typeof u.a=="string"){const C=u.a.trim().toLowerCase().charCodeAt(0);C>=97&&C<=101&&(w=C-97)}else Number.isInteger(u.correct_index)?w=u.correct_index:Number.isInteger(u.correct)?w=u.correct:Number.isInteger(u.answer)&&(w=u.answer);i.push({q:h,a:g,fig:typeof u.fig=="string"?u.fig:"",table:u.table||null,options:x.length>=2?x:null,correct:w,topicTitle:c.rec.title,catId:c.rec.cat.id})})}),i}function wt(e){const t=e.slice();for(let a=t.length-1;a>0;a--){const n=Math.floor(Math.random()*(a+1));[t[a],t[n]]=[t[n],t[a]]}return t}function Pe(){p.mock&&p.mock.timerId&&(clearInterval(p.mock.timerId),p.mock.timerId=null)}function Qe({title:e,message:t,confirmText:a,cancelText:n,onConfirm:s}){const o=f("#confirm-modal");o&&o.remove();const i=document.createElement("div");i.id="confirm-modal",i.className="read-modal",i.innerHTML=`
      <div class="read-modal-backdrop"></div>
      <div class="read-modal-box" role="dialog" style="max-width:440px; padding:24px; text-align:center; height:max-content; margin:auto;">
        <h3 style="font-size:1.2rem; margin-bottom:10px;">${l(e)}</h3>
        <p style="color:var(--ink-soft); font-size:.92rem; margin-bottom:20px;">${l(t)}</p>
        <div style="display:flex; gap:10px; justify-content:center;">
          <button class="btn btn-outline" id="modal-cancel-btn" style="flex:1;">${l(n||"Cancel")}</button>
          <button class="btn btn-primary" id="modal-confirm-btn" style="flex:1;">${l(a||"Confirm")}</button>
        </div>
      </div>`,document.body.appendChild(i),f("#modal-cancel-btn",i).addEventListener("click",()=>i.remove()),f(".read-modal-backdrop",i).addEventListener("click",()=>i.remove()),f("#modal-confirm-btn",i).addEventListener("click",()=>{i.remove(),s&&s()})}function $t(e){return e?e.id==="english"?[{id:"grammar",name:{en:"Grammar",as:"ব্যাকৰণ"}},{id:"vocabulary",name:{en:"Vocabulary",as:"শব্দভাণ্ডাৰ"}}]:e.id==="computer"?[{id:"comp-fundamentals",name:{en:"Fundamentals",as:"মৌলিক"}},{id:"ms-office",name:{en:"MS Office",as:"MS Office"}}]:e.subcategories||[]:[]}function Ka(e){return!e||!e.length?!1:e[0]==="category"&&e[1]==="english"||e[0]==="topic"&&e[1]==="english"||e[0]==="mock-test"&&e[1]==="english"||e[0]==="category"&&e[1]==="articles"&&e[2]==="english"}function Ja(e,t){if(t.length===1)return Za(e);const a=t[1],n=p.categories.find(d=>d.id===a);if(!n)return B(e);const s=t[2],o=t[3],i=t[4];if(s&&s.startsWith("topic-")||t.includes("start"))return Le(e,n,s,o,i);const c=$t(n);if(!s&&c.length)return en(e,n);if(s&&!o){const d=c.find(u=>u.id===s);return d?Xa(e,n,d):Le(e,n,s,null,null)}if(s&&o){const d=c.find(h=>h.id===s);if(!d)return B(e);if(/^set-\d+$/.test(o)){const h=parseInt(o.replace("set-",""),10);return h>=1&&h<=We?ln(e,n,d,h):B(e)}const u=(d.sections||[]).find(h=>h.id===o);return u&&u.topics&&u.topics.length?tn(e,n,d,u):Le(e,n,s,o,null)}return Le(e,n,null,null,null)}async function Xa(e,t,a){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("mock.loading")}</p></div>`;const n=await an(t.id,a.id);return rn(e,t,a,n)}function Za(e){const t=p.categories.filter(a=>a.id!=="study-guides"&&a.id!=="articles");e.innerHTML=`
      <div class="mock-intro">
        <h1>${r("mock.title")}</h1>
        <p class="page-desc">${r("mock.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:30px;">
        <div class="section-head"><div><h2>${r("mock.pick")}</h2><p class="sec-sub">${r("mock.pick.sub")}</p></div></div>
        <div class="mock-grid">
          ${t.map((a,n)=>`
              <div class="mock-card reveal" style="--cat:${I(a.id)}" data-delay="${n*40}">
                <div class="mock-top">
                  <span class="mock-ico">${J(a.id)}</span>
                  <span>
                    <b>${l(b(a.name))}</b>
                    <span class="mock-count">${r("mock.practicing")}</span>
                  </span>
                </div>
                <div class="mock-go">
                  <a class="mock-start" href="/mock-test/${a.id}">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    ${r("mock.start")}
                  </a>
                </div>
              </div>`).join("")}
        </div>
      </section>`,T(),R(e,{name:"Mock Tests",noDefaults:!0,h2:"Timed Mock Tests for Assam Competitive Exams",info:"Each mock test on axomexam.in works like the real examination. A live timer runs while you attempt the questions, your score is calculated instantly, and every question is followed by a clear bilingual explanation. The sets are arranged subject-wise and paper-wise so you can practise exactly the section you are preparing for.",items:t.map(a=>({name:b(a.name),count:ze(a)})),tips:["Start with the subject you find hardest, so you have the most time to improve it.","Attempt one full set under the timer before checking any answer.","Maintain an error log of every wrong answer and revise it weekly.","Increase the number of questions gradually once your accuracy is stable."],faqs:[{q:"How does the online mock test work?",a:"Choose a subject, pick a paper and attempt the questions within the timer. Once you submit, you immediately see your score along with the correct answers and explanations."},{q:"Can I attempt the mock tests more than once?",a:"Yes. All mock tests are unlimited. You can reattempt any set as many times as you like at no cost."},{q:"Are the mock tests suitable for ADRE and Assam Police?",a:"Yes. The subjects and question patterns follow the syllabus of ADRE 2.0, Assam Police, APSC, Gauhati High Court, SSC and Railway recruitment exams."}]})}function en(e,t){const a=$t(t);e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <span>${l(b(t.name))}</span>
        </nav>
        <h1>${l(b(t.name))}</h1>
        <p class="page-desc">Choose a paper to begin your timed mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${a.map((s,o)=>`
            <a class="sub-card reveal" href="/mock-test/${t.id}/${s.id}" style="--cat:${I(t.id)}" data-delay="${o*40}">
              <span class="sub-ico">${_(s.id,t.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${l(b(s.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">Timed practice sets</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`,T();const n=p.topicIndex.filter(s=>s.cat&&s.cat.id===t.id);R(e,{id:t.id,name:b(t.name)+" Mock Test",count:a.length,total:n.reduce((s,o)=>s+(o.nQuestions||0),0),h2:b(t.name)+" Mock Tests with Answers",items:a.map(s=>({name:b(s.name),count:0}))})}function Qn(e,t,a){const n=a.sections||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}">${l(b(t.name))}</a><span class="bc-sep">/</span>
          <span>${l(b(a.name))}</span>
        </nav>
        <h1>${l(b(a.name))}</h1>
        <p class="page-desc">Choose a section to begin your test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${n.map((s,o)=>`
            <a class="sub-card reveal" href="/mock-test/${t.id}/${a.id}/${s.id}" style="--cat:${I(t.id)}" data-delay="${o*50}">
              <span class="sub-ico">${_(s.id,t.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${l(b(s.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${(s.topics||[]).length} Topics</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`,T(),R(e,{id:a.id,name:b(a.name)+" Mock Test",count:n.length,h2:b(a.name)+" Mock Test - "+b(t.name),items:n.map(s=>({name:b(s.name),count:(s.topics||[]).length}))})}function tn(e,t,a,n){const s=n.topics||[];e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}">${l(b(t.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}/${a.id}">${l(b(a.name))}</a><span class="bc-sep">/</span>
          <span>${l(b(n.name))}</span>
        </nav>
        <h1>${l(b(n.name))}</h1>
        <p class="page-desc">Select a topic to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${s.map((o,i)=>`
            <a class="sub-card reveal" href="/mock-test/${t.id}/start" style="--cat:${I(t.id)}" data-delay="${i*40}">
              <span class="sub-ico">${_(o.id,t.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${l(b(o.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">Take Mock Test</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`,T(),R(e,{id:n.id,name:b(n.name)+" Mock Test",count:s.length,h2:b(n.name)+" Mock Test Questions",items:s.map(o=>({name:b(o.name),count:0}))})}function At(e){return e?Array.isArray(e)?e.length>0:Array.isArray(e.questions)&&e.questions.length>0:!1}async function an(e,t){const a=e+"/"+t;if(p.mockSetCache[a])return p.mockSetCache[a];const n=[];for(let s=1;s<=We;s++){const o=await API.getMockSet(e,t,s);if(At(o))n.push(s);else break}return p.mockSetCache[a]=n,n}function nn(e){if(!e||typeof e!="object")return null;const t={en:q(e,"question","en"),as:q(e,"question","as")};if(!t.en&&!t.as)return null;const a={en:q(e,"answer","en"),as:q(e,"answer","as")},n=j(e,"en"),s=j(e,"as"),o=Array.isArray(e.options)?e.options:[];let i=[];if(n.length||s.length){const h=Math.max(n.length,s.length);for(let g=0;g<h;g++){const m=o[g];i.push({en:n[g]||"",as:s[g]||"",fig:m&&typeof m=="object"&&typeof m.fig=="string"?m.fig:""})}}let c=0;if(typeof e.correct=="string"){const g=e.correct.trim().toLowerCase().charCodeAt(0);g>=97&&g<=101&&(c=g-97)}else if(typeof e.a=="string"){const g=e.a.trim().toLowerCase().charCodeAt(0);g>=97&&g<=101&&(c=g-97)}else Number.isInteger(e.correct_index)?c=e.correct_index:Number.isInteger(e.correct)?c=e.correct:Number.isInteger(e.answer)&&(c=e.answer);let d=String(e.difficulty||"medium").toLowerCase().trim();d!=="easy"&&d!=="hard"&&(d="medium");const u={en:q(e,"explanation","en"),as:q(e,"explanation","as")};return{q:t,a,fig:typeof e.fig=="string"?e.fig:"",table:e.table||null,options:i.length>=2?i:null,correct:c,difficulty:d,explanation:{en:u.en,as:u.as}}}async function sn(e,t,a){const n=await API.getMockSet(e.id,t.id,a);if(!At(n))return null;const o=(Array.isArray(n)?n:Array.isArray(n.questions)?n.questions:[]).map(nn).filter(Boolean);return o.length?{setNumber:a,title:n&&n.title||`Set ${a}`,subject:n&&n.subject||t&&t.name||"",questions:o}:null}function _n(e){const t={easy:[],medium:[],hard:[]};return(e||[]).forEach(a=>{!a.options||a.options.length<2||(t[a.difficulty]=t[a.difficulty]||[],t[a.difficulty].push(a))}),t}function on(e,t){const a=t||p.uiLang;return e==="easy"?a==="as"?"সহজ":"Easy":e==="hard"?a==="as"?"কঠিন":"Hard":a==="as"?"মধ্যম":"Medium"}function rn(e,t,a,n){const s=new Set(n),o=Ht;e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}">${l(b(t.name))}</a><span class="bc-sep">/</span>
          <span>${l(b(a.name))}</span>
        </nav>
        <h1>${l(b(a.name))}</h1>
        <p class="page-desc">Pick a set to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="set-grid">
          ${Array.from({length:o},(i,c)=>{const d=c+1;return s.has(d)?`
              <a class="set-card reveal" href="/mock-test/${t.id}/${a.id}/set-${d}" style="--cat:${I(t.id)}" data-delay="${c*40}">
                <span class="set-card-head">
                  <span class="set-num">${String(d).padStart(2,"0")}</span>
                  <span class="set-status">Available</span>
                </span>
                <span class="set-name">Mock Test Set ${d}</span>
                <span class="set-meta">Full paper • Instant scoring</span>
                <span class="set-go">
                  <span>Start Test</span>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </a>`:`
              <div class="set-card set-card-locked reveal" style="--cat:${I(t.id)}" data-delay="${c*40}">
                <span class="set-card-head">
                  <span class="set-num">${String(d).padStart(2,"0")}</span>
                  <span class="set-status set-status-locked">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Coming Soon
                  </span>
                </span>
                <span class="set-name">Mock Test Set ${d}</span>
                <span class="set-meta">Not published yet</span>
              </div>`}).join("")}
        </div>
      </section>`,T()}async function ln(e,t,a,n){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("mock.loading")}</p></div>`;const s=await sn(t,a,n);if(!s){e.innerHTML=`
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>Questions for Set ${n} have not been uploaded yet. Please check back soon.</p>
          <div style="margin-top:18px;">
            <a class="btn btn-outline" href="/mock-test/${t.id}/${a.id}">← Back to Sets</a>
          </div>
        </div>`;return}const o=s.questions.filter(g=>g.options&&g.options.length>=2),i=o.length?o:s.questions,c=[10,15,20,25].filter(g=>g<=i.length);c.length||c.push(i.length);const d=c.includes(25)?25:c[c.length-1];p.mock={cat:t,pool:i,configured:!1,count:d,testLang:t.id==="english"?"en":"as",setInfo:{setNumber:n,title:s.title,subject:b(a.name)}},e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}">${l(b(t.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${t.id}/${a.id}">${l(b(a.name))}</a><span class="bc-sep">/</span>
          <span>${l(s.title)}</span>
        </nav>
        <h1>${l(s.title)} — ${l(b(a.name))}</h1>
        <p class="page-desc">Choose your language and start when ready.</p>
      </div>

      <div class="mt-setup">
        <div class="mt-hero" style="--cat:${I(t.id)}">
          <span class="mt-hero-icon">${J(t.id)}</span>
          <span style="min-width:0;">
            <span class="mt-hero-cat">${l(b(t.name))}</span>
            <span class="mt-hero-title">${l(s.title)} • ${l(b(a.name))}</span>
            <span class="mt-hero-chips">
              <span class="mt-chip">${p.mock.pool.length} ${r("mock.questions")}</span>
              <span class="mt-chip">অসমীয়া / English</span>
            </span>
          </span>
        </div>

        <div class="mt-block">
          <div class="mt-label">Question Language <span>প্ৰশ্নৰ ভাষা</span></div>
          <div class="mt-segmented">
            <button type="button" class="mt-seg-btn ${p.mock.testLang==="as"?"active":""}" data-mocklang="as">
              <span class="mt-seg-ico">অ</span> অসমীয়া (Assamese)
            </button>
            <button type="button" class="mt-seg-btn ${p.mock.testLang==="en"?"active":""}" data-mocklang="en">
              <span class="mt-seg-ico">A</span> English
            </button>
          </div>
        </div>

        <div class="mt-block">
          <div class="mt-label">Number of Questions <span>প্ৰশ্নৰ সংখ্যা</span></div>
          <div class="count-picker" id="set-count-picker" style="margin:0;">
            ${c.map(g=>`<button type="button" data-count="${g}" class="${g===d?"active":""}">${g}</button>`).join("")}
          </div>
        </div>

        <div class="mt-block">
          <div class="mt-label">Instructions <span>নিৰ্দেশনা</span></div>
          <ul class="mt-rules">
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>This is a timed test — a stopwatch tracks your total time.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>Choose the best answer. Results are graded instantly on submit.</li>
            <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>You can quit anytime — your current progress will be lost.</li>
          </ul>
        </div>

        <button class="btn btn-primary mt-start" id="mock-begin-btn">${r("mock.begin")} →</button>
      </div>`,M("[data-mocklang]").forEach(g=>{g.addEventListener("click",()=>{M("[data-mocklang]").forEach(m=>m.classList.remove("active")),g.classList.add("active"),p.mock.testLang=g.dataset.mocklang})});let u=d;const h=f("#set-count-picker");h&&M("button",h).forEach(g=>{g.addEventListener("click",()=>{M("button",h).forEach(m=>m.classList.remove("active")),g.classList.add("active"),u=parseInt(g.dataset.count,10),p.mock.count=u})}),f("#mock-begin-btn").addEventListener("click",()=>{Qe({title:`Start ${s.title}?`,message:`You are about to start a ${u} question mock test in ${p.mock.testLang==="as"?"অসমীয়া":"English"}. Do you want to proceed?`,confirmText:"Start Test",cancelText:"Cancel",onConfirm:()=>cn(u)})})}function cn(e){if(!p.mock)return;const t=p.mock.pool.filter(s=>s.options&&s.options.length>=2),a=t.length?t:p.mock.pool,n=Math.min(e||a.length,a.length);p.mock=Object.assign(p.mock,{pool:wt(a).slice(0,n),count:n,idx:0,answers:[],elapsedSec:0,started:!0,timerId:null}),_e()}async function Le(e,t,a,n,s){e.innerHTML=`<div class="loader"><div class="spinner"></div><p>${r("mock.loading")}</p></div>`;const o=await Va(t,a,n,s);if(!o.length){e.innerHTML=`
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>${r("mock.noQuestions")}</p>
          <div style="margin-top:18px;"><a class="btn btn-outline" href="/mock-test">← Choose Another Category</a></div>
        </div>`;return}p.mock={cat:t,pool:o,configured:!1,count:0,testLang:t.id==="english"?"en":"as"};const i=[10,20,50,100].filter(u=>u<=o.length);i.includes(o.length)||i.push(o.length),e.innerHTML=`
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">Home</a><span class="bc-sep">/</span><a href="/mock-test">Mock Test</a><span class="bc-sep">/</span><span>${l(b(t.name))}</span></nav>
        <h1>${r("mock.setup.title")}</h1>
        <p class="page-desc">${l(b(t.name))} • ${o.length} ${r("mock.questions")}</p>
      </div>

      <div class="setup-panel">
        <div class="sp-title">
          <span class="mock-ico" style="background:${I(t.id)};width:40px;height:40px;border-radius:11px;">${J(t.id)}</span>
          <b>${l(b(t.name))} Mock Test</b>
        </div>
        <p class="sp-sub">Configure your test settings below.</p>
        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">Select Question Language / প্ৰশ্নৰ ভাষা:</p>
        <div class="lang-switch" style="margin-top:8px; display:inline-flex; width:100%;">
          <button type="button" class="lang-btn ${p.mock.testLang==="as"?"active":""}" data-mocklang="as" style="flex:1; padding:10px; font-weight:700;">অসমীয়া (Assamese)</button>
          <button type="button" class="lang-btn ${p.mock.testLang==="en"?"active":""}" data-mocklang="en" style="flex:1; padding:10px; font-weight:700;">English</button>
        </div>

        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">${r("mock.setup.count")} / প্ৰশ্নৰ সংখ্যা বাছনি কৰক:</p>
        <div class="count-picker" id="count-picker">
          ${i.map((u,h)=>`<button type="button" data-count="${u}" class="${h===0?"active":""}">${u}</button>`).join("")}
        </div>

        <div class="setup-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span>Stopwatch Timer will track your total time taken. Instant grading on final submission.</span>
        </div>
        <button class="btn btn-primary btn-begin" id="mock-begin-btn">${r("mock.begin")}</button>
      </div>`,M("[data-mocklang]").forEach(u=>{u.addEventListener("click",()=>{M("[data-mocklang]").forEach(h=>h.classList.remove("active")),u.classList.add("active"),p.mock.testLang=u.dataset.mocklang})});const c=f("#count-picker");let d=i[0]||o.length;M("button",c).forEach(u=>{u.addEventListener("click",()=>{M("button",c).forEach(h=>h.classList.remove("active")),u.classList.add("active"),d=parseInt(u.dataset.count,10)})}),f("#mock-begin-btn").addEventListener("click",()=>{Qe({title:"Start Mock Test?",message:`You are about to start a ${d} question test in ${p.mock.testLang==="as"?"অসমীয়া":"English"}. Do you want to proceed?`,confirmText:"Start Test",cancelText:"Cancel",onConfirm:()=>Ct(d)})})}function Ct(e){if(!p.mock)return;const t=wt(p.mock.pool).slice(0,e);p.mock=Object.assign(p.mock,{pool:t,idx:0,answers:[],elapsedSec:0,started:!0,timerId:null}),_e()}function _e(){const e=p.mock,t=e.pool[e.idx];if(!t)return Mt();const a=f("#app"),n=e.answers[e.idx]!==void 0,s=["A","B","C","D","E"],o=W(t.q),i=t.options||[],c=V(t),d=e.setInfo?`${l(b(e.cat.name))} • ${l(e.setInfo.title)}`:`${l(b(e.cat.name))}`;a.innerHTML=`
      <div class="quiz-wrap">
        <div class="quiz-top">
          <span class="qt-cat">${d} • Question ${e.idx+1}/${e.pool.length}</span>
          <span class="quiz-timer" id="quiz-timer" title="Time Elapsed">⏱ ${qe(e.elapsedSec)}</span>
          <button class="quiz-quit" id="quiz-quit-btn">${r("mock.quit")}</button>
        </div>
        <div class="quiz-progress"><span id="quiz-progress" style="width:${(e.idx/e.pool.length*100).toFixed(1)}%"></span></div>
        <div class="quiz-card">
          <div class="quiz-qno">Question ${e.idx+1}</div>
          <div class="quiz-qtext">${S(o)}</div>
          ${c}

          <div class="quiz-options" id="quiz-options">
            ${i.map((g,m)=>{const y=ge(g),k=be(g);return`
              <button class="quiz-option${k?" quiz-option-fig":""}" data-opt="${m}" ${n?"disabled":""}>
                <span class="opt-key">${s[m]}</span>
                <span class="opt-main">${k?`<span class="opt-fig">${k}</span>`:""}${y?`<span class="opt-text">${S(y)}</span>`:""}</span>
              </button>`}).join("")}
          </div>

          <div class="quiz-feedback" id="quiz-feedback"></div>
          <button class="btn btn-primary quiz-next" id="quiz-next" type="button">
            ${e.idx+1===e.pool.length?"Final Submit":n?r("mock.next")+" →":r("mock.skip")+" →"}
          </button>
        </div>
      </div>`,je();const u=f(".quiz-card");u&&U(u);const h=f("#quiz-options");h&&M(".quiz-option",h).forEach(g=>{g.addEventListener("click",()=>{if(e.answers[e.idx]!==void 0)return;const m=parseInt(g.dataset.opt,10);e.answers[e.idx]=m,M(".quiz-option",h).forEach(C=>{C.disabled=!0;const A=parseInt(C.dataset.opt,10);A===t.correct?C.classList.add("correct"):A===m&&C.classList.add("wrong"),A===m&&C.classList.add("selected")});const y=f("#quiz-feedback");y.classList.add(m===t.correct?"good":"bad"),y.style.display="block";const k=i[t.correct],x=k&&typeof k=="object"&&k.option?String(k.option):s[t.correct]||"",w=`${x?`<b>(${x})</b> `:""}${be(k)?`<span class="opt-fig fb-fig">${be(k)}</span>`:""}${ge(k)?S(ge(k)):""}`;y.innerHTML=m===t.correct?r("mock.revealCorrect"):`${r("mock.correctAnswer")}: ${w||x||""}`,U(y);const v=f("#quiz-next");v&&(v.disabled=!1,v.textContent=e.idx+1===e.pool.length?"Final Submit":r("mock.next")+" →")})}),f("#quiz-next").addEventListener("click",()=>{e.idx++,e.idx>=e.pool.length?(Pe(),Mt()):_e()}),f("#quiz-quit-btn").addEventListener("click",()=>{Qe({title:"Quit Mock Test?",message:"Are you sure you want to quit the mock test? Your current progress will be lost.",confirmText:"Yes, Quit",cancelText:"Resume Test",onConfirm:()=>{Pe(),p.mock=null,tt("/mock-test")}})}),e.timerId||dn()}function dn(){const e=p.mock,t=()=>{if(!e||!e.started||e.timerId===null)return;e.elapsedSec++;const a=f("#quiz-timer");a&&(a.textContent=`⏱ ${qe(e.elapsedSec)}`)};e.timerId=setInterval(t,1e3)}function qe(e){const t=Math.max(0,e);return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}function Mt(){const e=p.mock;if(Pe(),!e)return;let t=0,a=0,n=0;const s=e.pool.map((x,w)=>{const v=e.answers[w];let C=!1;return v===void 0?n++:v===x.correct?(C=!0,t++):a++,{q:x,a:v,ok:C}}),o=e.elapsedSec,i=e.pool.length?Math.round(t/e.pool.length*100):0,c=i>=80?"mock.result.msgExcellent":i>=55?"mock.result.msgGood":i>=35?"mock.result.msgAverage":"mock.result.msgPoor",d=52.5,u=2*Math.PI*d,h=u*(1-i/100),g=f("#app");g.innerHTML=`
      <div class="result-wrap">
        <div class="result-panel">
          <div class="result-ring">
            <svg viewBox="0 0 120 120">
              <circle class="r-bg" cx="60" cy="60" r="${d}"></circle>
              <circle class="r-fg" cx="60" cy="60" r="${d}" stroke-dasharray="${u.toFixed(1)}" stroke-dashoffset="${u.toFixed(1)}"></circle>
            </svg>
            <div class="result-percent">${i}%</div>
          </div>
          <h2 style="font-size:1.25rem;">${r("mock.result.title")}</h2>
          ${e.setInfo?`<p style="font-size:.85rem; color:var(--ink-soft,#64748b); margin:2px 0 0;">${l(e.setInfo.title)}${e.setInfo.difficulty?" • "+on(e.setInfo.difficulty):""}</p>`:""}
          <p class="result-msg">${r(c)}</p>
          <div class="result-stats">
            <div class="rstat"><b>${t}</b><span>${r("mock.result.correct")}</span></div>
            <div class="rstat bad"><b>${a}</b><span>${r("mock.result.wrong")}</span></div>
            <div class="rstat skip"><b>${n}</b><span>${r("mock.result.skipped")}</span></div>
            <div class="rstat"><b>${qe(o)}</b><span>Total Time Taken</span></div>
          </div>
          <div class="result-actions">
            <button class="btn btn-accent" id="mock-share-btn">${pn()} ${r("mock.result.share")}</button>
            <button class="btn btn-outline" id="mock-retry">${r("mock.result.retry")}</button>
            <a class="btn btn-outline" href="/mock-test">${r("mock.result.changeCat")}</a>
            <button class="btn btn-outline" id="mock-review-toggle">${r("mock.result.review")}</button>
            <a class="btn btn-outline" href="/mock-test">${r("mock.result.exit")}</a>
          </div>
        </div>
        <div class="review-list" id="review-list" hidden>
          ${s.map((x,w)=>{const v=x.q,C=x.a===void 0?`<span class="rv-badge" style="background:#f1f5f9;color:#64748b;">${r("mock.result.skipped")}</span>`:`<span class="rv-badge ${x.ok?"good":"bad"}">${x.ok?"✓ "+r("mock.result.correct"):"✕ "+r("mock.result.wrong")}</span>`,A=v.options||[],P=Y=>{if(!A[Y])return"";const de=String.fromCharCode(65+Y),pe=be(A[Y]),N=ge(A[Y]);return`<b>(${de})</b> ${pe?`<span class="rv-fig">${pe}</span>`:""}${N?S(N):pe?"":"(No text)"}`};let E="";x.a!==void 0&&A.length?(E=`<div class="rv-ans"><b>${r("mock.answer")}:</b> ${P(x.a)}</div>`,x.ok||(E+=`<div class="rv-ans correct-line"><b>${r("mock.correctAnswer")}:</b> ${P(v.correct)}</div>`)):A.length&&(E=`<div class="rv-ans correct-line"><b>${r("mock.correctAnswer")}:</b> ${P(v.correct)}</div>`);const L=W(v.explanation),z=p.mock&&p.mock.testLang==="as"?"ব্যাখ্যা":"Explanation",O=L?`<div class="rv-exp"><b>${z}:</b> ${S(L)}</div>`:"";return`
              <div class="review-item">
                <div class="rv-q">Q${w+1}. ${S(W(v.q))}</div>
                ${V(v)}
                ${C}
                ${E}
                ${O}
              </div>`}).join("")}
        </div>
      </div>`,je();const m=f("#review-list");m&&U(m),requestAnimationFrame(()=>{const x=f(".result-ring .r-fg");x&&(x.style.strokeDashoffset=h.toFixed(1))}),f("#mock-retry").addEventListener("click",()=>Ct(e.pool.length));const y=f("#mock-share-btn");y&&y.addEventListener("click",Lt);const k=f("#mock-review-toggle");k.addEventListener("click",()=>{const x=f("#review-list"),w=x.hidden;x.hidden=!w,k.textContent=r(w?"mock.result.hideReview":"mock.result.review")}),e.timerId&&(clearInterval(e.timerId),e.timerId=null)}const Ye="https://axomexam.in";function pn(){return'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>'}function un(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'}function hn(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'}function mn(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>'}function fn(){return'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'}function gn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>'}function bn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'}function vn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'}function yn(){return'<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>'}function Et(){return'<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'}function xn(){return'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>'}function kn(){const e=p.mock;if(!e)return null;let t=0,a=0,n=0;e.pool.forEach((h,g)=>{const m=e.answers[g];m===void 0?n++:m===h.correct?t++:a++});const s=e.pool.length?Math.round(t/e.pool.length*100):0,o=s>=80?"mock.result.msgExcellent":s>=55?"mock.result.msgGood":s>=35?"mock.result.msgAverage":"mock.result.msgPoor";let i="/mock-test";location.pathname&&location.pathname.indexOf("/mock-test/")===0&&(i=location.pathname.replace(/\/index\.html$/,""));const c=e.setInfo&&e.setInfo.title?e.setInfo.title:"",d=e.setInfo&&e.setInfo.subject?e.setInfo.subject:b(e.cat&&e.cat.name),u=c?d?d+" • "+c:c:b(e.cat&&e.cat.name)+" Mock Test";return{correct:t,wrong:a,skipped:n,pct:s,msgKey:o,url:Ye+i,title:u,time:qe(e.elapsedSec),count:e.pool.length}}function wn(e){return r("share.text").replace("{p}",String(e.pct)).replace("{t}",e.title).replace("{url}",e.url).replace("{site}",Ye)}function $n(e){const t=String(e).split(","),a=t[0].match(/:(.*?);/),n=a?a[1]:"image/png",s=atob(t[1]),o=new Uint8Array(s.length);for(let i=0;i<s.length;i++)o[i]=s.charCodeAt(i);return new Blob([o],{type:n})}function St(e,t,a,n,s,o){const i=Math.min(o,n/2,s/2);e.beginPath(),e.moveTo(t+i,a),e.arcTo(t+n,a,t+n,a+s,i),e.arcTo(t+n,a+s,t,a+s,i),e.arcTo(t,a+s,t,a,i),e.arcTo(t,a,t+n,a,i),e.closePath()}function An(){const n="'Plus Jakarta Sans','Inter',Arial,sans-serif",s=document.createElement("canvas");s.width=372,s.height=68;const o=s.getContext("2d");return o.scale(2,2),o.fillStyle="rgba(255,255,255,0.18)",St(o,0,0,34,34,9),o.fill(),o.fillStyle="#ffffff",o.textAlign="center",o.textBaseline="middle",o.font="900 18px "+n,o.fillText("A",17,17),o.textAlign="left",o.font="800 21px "+n,o.fillText("axomexam.in",46,17),s.toDataURL("image/png")}function Cn(e){const s="'Plus Jakarta Sans','Inter',Arial,sans-serif",o=document.createElement("canvas").getContext("2d");o.font="800 11px "+s;const i=Math.ceil(o.measureText(e).width+32),c=document.createElement("canvas");c.width=i*2,c.height=56;const d=c.getContext("2d");return d.scale(2,2),d.fillStyle="rgba(255,255,255,0.16)",St(d,.5,.5,i-1,27,99),d.fill(),d.strokeStyle="rgba(255,255,255,0.28)",d.lineWidth=1,d.stroke(),d.fillStyle="#ffffff",d.textAlign="center",d.textBaseline="middle",d.font="800 11px "+s,d.fillText(e,i/2,28/2),c.toDataURL("image/png")}async function Mn(e,t,a){try{await document.fonts.ready}catch{}const n=52.5,s=2*Math.PI*n,o=s*(1-Math.max(0,Math.min(100,e.pct))/100),i=(String(t||"").trim().charAt(0)||"A").toUpperCase(),c="font-family:'Plus Jakarta Sans','Inter',Arial,sans-serif",d=An(),u=Cn(r("share.reportBadge")),h=a?'<img src="'+a+'" alt="" />':'<svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true"><text x="42" y="56.5" text-anchor="middle" fill="#ffffff" font-size="40" font-weight="800" style="'+c+'">'+l(i)+"</text></svg>",g=[{v:e.correct,l:r("mock.result.correct")},{v:e.wrong,l:r("mock.result.wrong")},{v:e.skipped,l:r("mock.result.skipped")},{v:e.time,l:r("mock.result.time")}],m=document.createElement("div");m.className="report-card",m.innerHTML='<div class="rc-top"><div class="rc-brand"><img src="'+d+'" alt="" /></div><div class="rc-badge"><img src="'+u+'" alt="" /></div></div><div class="rc-user"><div class="rc-avatar'+(a?" has-photo":"")+'">'+h+'</div><div><div class="rc-name">'+l(t)+'</div><div class="rc-test">'+l(e.title)+'</div></div></div><div class="rc-score-row"><div class="rc-ring"><svg class="rc-ring-arc" viewBox="0 0 120 120"><circle class="rc-r-bg" cx="60" cy="60" r="'+n+'"></circle><circle class="rc-r-fg" cx="60" cy="60" r="'+n+'" stroke-dasharray="'+s.toFixed(1)+'" stroke-dashoffset="'+o.toFixed(1)+'"></circle></svg><svg class="rc-ring-label" viewBox="0 0 120 120" aria-hidden="true"><text x="60" y="71" text-anchor="middle" fill="#ffffff" font-size="32" font-weight="800" style="'+c+'">'+e.pct+'%</text><text x="60" y="88" text-anchor="middle" fill="#ffffff" fill-opacity="0.85" font-size="9" font-weight="700" style="'+c+'">'+l(r("share.score"))+'</text></svg></div><div class="rc-msg"><div class="rc-msg-title">'+l(r(e.msgKey))+'</div><div class="rc-msg-sub">'+l(e.correct+" "+r("mock.result.correct")+"  •  "+e.wrong+" "+r("mock.result.wrong")+"  •  "+e.skipped+" "+r("mock.result.skipped"))+'</div></div></div><div class="rc-stats">'+g.map(function(k){return'<div class="rc-stat"><b>'+l(String(k.v))+"</b><span>"+l(k.l)+"</span></div>"}).join("")+'</div><div class="rc-challenge"><div class="rc-challenge-ico">'+xn()+'</div><div><div class="rc-challenge-title">'+l(r("share.challenge"))+'</div><div class="rc-challenge-link">'+l(e.url)+'</div></div></div><div class="rc-foot"><div class="rc-foot-line">'+l(r("share.cardLine1").replace("{p}",String(e.pct)).replace("{t}",e.title).replace("{site}",Ye+"/"))+'</div><div class="rc-foot-line rc-foot-link">'+l(e.url)+"</div></div>";const y=document.createElement("div");y.className="report-card-holder",y.appendChild(m),document.body.appendChild(y);try{if(await Ke(),!window.html2canvas)throw new Error("html2canvas unavailable");return(await window.html2canvas(m,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#4f46e5"})).toDataURL("image/png")}finally{y.remove()}}function ae(e,t){const a=document.createElement("a");a.href=e,a.download=t,document.body.appendChild(a),a.click(),a.remove()}async function ce(e,t){if(navigator.canShare&&navigator.canShare({files:[e]}))try{return await navigator.share({files:[e],text:t,title:"axomexam Result"}),!0}catch(a){if(a&&a.name==="AbortError")return!0}return!1}async function Pt(e){try{await navigator.clipboard.writeText(e),H(r("share.linkCopied"))}catch{const a=document.createElement("textarea");a.value=e,document.body.appendChild(a),a.select();try{document.execCommand("copy"),H(r("share.linkCopied"))}catch{}a.remove()}}function Lt(){const e=kn();if(!e)return;const t=f("#share-modal");t&&t.remove();const a=document.createElement("div");a.id="share-modal",a.className="read-modal share-modal",a.innerHTML='<div class="read-modal-backdrop"></div><div class="read-modal-box" role="dialog" aria-modal="true"><div class="read-modal-head"><div class="read-modal-titles"><span class="read-modal-title" id="share-modal-title">'+l(r("share.title"))+'</span><span class="read-modal-sub" id="share-modal-sub">'+l(r("share.subtitle"))+'</span></div><button class="read-close" id="share-close" type="button" aria-label="Close">✕</button></div><div class="read-modal-body" id="share-body"><form class="share-form" id="share-form" novalidate><div><label for="share-name">'+l(r("share.nameLabel"))+'</label><input type="text" id="share-name" maxlength="40" autocomplete="name" placeholder="'+l(r("share.namePlaceholder"))+'" /></div><div><label>'+l(r("share.photoLabel"))+'</label><div class="share-photo-row"><div class="share-photo-preview" id="share-photo-preview">'+Et()+'</div><div class="share-photo-actions"><label class="share-file-btn" for="share-photo-input">'+yn()+" "+l(r("share.photoChoose"))+'</label><input type="file" id="share-photo-input" accept="image/*" hidden /><button type="button" class="share-photo-remove" id="share-photo-remove" hidden>'+l(r("share.photoRemove"))+'</button></div></div></div><div style="display:flex; gap:10px; margin-top:6px;"><button type="button" class="btn btn-outline" id="share-cancel">'+l(r("share.cancel"))+'</button><button type="submit" class="btn btn-primary" id="share-generate">'+l(r("share.generate"))+"</button></div></form></div></div>",document.body.appendChild(a);let n="";const s=()=>a.remove();f("#share-close",a).addEventListener("click",s),f(".read-modal-backdrop",a).addEventListener("click",s),f("#share-cancel",a).addEventListener("click",s);const o=f("#share-photo-input",a),i=f("#share-photo-preview",a),c=f("#share-photo-remove",a);o.addEventListener("change",()=>{const d=o.files&&o.files[0];if(!d)return;const u=new FileReader;u.onload=()=>{n=String(u.result||""),i.innerHTML='<img src="'+n+'" alt="" />',c.hidden=!1},u.readAsDataURL(d)}),c.addEventListener("click",()=>{n="",o.value="",i.innerHTML=Et(),c.hidden=!0}),f("#share-form",a).addEventListener("submit",async d=>{d.preventDefault();const u=f("#share-name",a),h=(u.value||"").trim();if(!h){H(r("share.nameRequired")),u.focus();return}const g=f("#share-generate",a);g.disabled=!0,g.textContent=r("share.generating");let m="";try{m=await Mn(e,h,n)}catch(y){console.error("Report card generation failed:",y),g.disabled=!1,g.textContent=r("share.generate"),H(r("share.error"));return}En(a,{S:e,name:h,dataUrl:m})})}function En(e,t){const a=t.S,n=t.dataUrl,s=wn(a),o="axomexam-report-"+a.pct+"percent.png",i=f("#share-body",e);if(!i)return;const c=(y,k,x,w)=>'<button type="button" class="share-target '+y+'" data-share="'+k+'">'+w+"<span>"+l(r(x))+"</span></button>";i.innerHTML='<img class="share-preview-img" src="'+n+'" alt="'+l(r("share.previewTitle"))+'" /><div class="share-targets">'+c("wa","whatsapp","share.whatsapp",un())+c("fb","facebook","share.facebook",hn())+c("tg","telegram","share.telegram",mn())+c("tw","twitter","share.twitter",fn())+c("more","more","share.more",gn())+c("dl","dl","share.download",bn())+c("copy","copy","share.copy",vn())+'</div><button type="button" class="btn btn-outline" id="share-back" style="width:100%;">← '+l(r("share.back"))+"</button>";const d=f("#share-modal-title",e);d&&(d.textContent=r("share.previewTitle"));const u=f("#share-modal-sub",e);u&&(u.textContent=r("share.shareNow"));const h=$n(n);let g=h;try{g=new File([h],o,{type:"image/png"})}catch{g=h}const m=!!(navigator.canShare&&navigator.canShare({files:[g]}));f("#share-back",e).addEventListener("click",()=>{e.remove(),Lt()}),M("[data-share]",e).forEach(y=>{y.addEventListener("click",async()=>{const k=y.dataset.share,x=encodeURIComponent;if(k==="whatsapp"){if(m&&await ce(g,s))return;ae(n,o),H(r("share.imageSaved")),window.open("https://wa.me/?text="+x(s),"_blank")}else if(k==="facebook"){if(m&&await ce(g,s))return;ae(n,o),H(r("share.imageSaved")),window.open("https://www.facebook.com/sharer/sharer.php?u="+x(a.url)+"&quote="+x(s),"_blank")}else if(k==="telegram"){if(m&&await ce(g,s))return;ae(n,o),H(r("share.imageSaved")),window.open("https://t.me/share/url?url="+x(a.url)+"&text="+x(s),"_blank")}else if(k==="twitter"){if(m&&await ce(g,s))return;ae(n,o),H(r("share.imageSaved")),window.open("https://twitter.com/intent/tweet?url="+x(a.url)+"&text="+x(s),"_blank")}else if(k==="more"){if(m&&await ce(g,s))return;ae(n,o),await Pt(s)}else k==="dl"?(ae(n,o),H(r("share.downloaded"))):k==="copy"&&await Pt(s)})})}function Sn(e){const t={id:"trending",name:{en:"Trending",as:"জনপ্ৰিয়"},color:"#f97316",icon:"↗"};e.forEach(a=>{if(!a||!a.id)return;const n=`trending/${a.id}`,s={path:n,cat:t,sub:null,section:null,topic:a,title:a.title||a.name,desc:a.description,tags:a.tags||[],nQuestions:(a.questions||[]).length,pdf:a.pdf||null,popularity:Number(a.popularity)||0,extra:!0};p.topicMap[n]=s,p.topicIndex.push(s)})}function Pn(){document.addEventListener("click",e=>{const t=e.target.closest("a");if(!t)return;const a=t.getAttribute("href");a&&a.startsWith("/")&&!a.startsWith("//")&&!t.hasAttribute("download")&&t.target!=="_blank"&&(e.preventDefault(),tt(a))})}async function Ln(){const e=f("#preloader");try{const s=localStorage.getItem("axomexam-ui-lang");s?p.uiLang=s:p.uiLang="en"}catch{p.uiLang="en"}document.body.setAttribute("data-lang",p.lang),ve(),Rn();const[t,a,n]=await Promise.all([API.getCategories().catch(s=>(console.error("Failed to load categories:",s),null)),API.getCounts().catch(()=>null),API.getTrendingTopics().catch(s=>(console.error("Failed to load extra trending topics:",s),null))]);t&&Object.assign(p,Zt(t)),a&&ea(a),n&&Sn(n),p.categories.length?(p.ready=!0,ye(),ke(),ba(),Xt(),Pn(),window.addEventListener("popstate",()=>{ye(),ke(),$e()}),$e(),le()):f("#app").innerHTML=`<div class="loader"><p>${r("load.error")}</p></div>`,e&&setTimeout(()=>e.classList.add("done"),350)}function qt(){const e=f("#app");if(!e)return;const t=typeof I18N<"u"&&I18N.en&&I18N.en["desc.readMore"]||"Read More",a=typeof I18N<"u"&&I18N.en&&I18N.en["desc.readLess"]||"Show Less";e.querySelectorAll(".page-desc").forEach(n=>{if(n.dataset.enhanced==="1")return;n.dataset.enhanced="1";const s=n.textContent||"";if(!s.includes(`
`))return;const o=s.split(`
`).map(y=>y.trim()).filter(Boolean);let i="",c=!1;o.forEach(y=>{const k=y.match(/^[•\-*]\s*(.*)$/);k?(c||(i+="<ul>",c=!0),i+="<li>"+l(k[1])+"</li>"):(c&&(i+="</ul>",c=!1),i+="<p>"+l(y)+"</p>")}),c&&(i+="</ul>");const d=document.createElement("div");d.className="page-desc desc-expandable",d.dataset.enhanced="1",d.innerHTML='<div class="desc-inner">'+i+"</div>",n.replaceWith(d);const u=d.querySelector(".desc-inner"),h=parseFloat(getComputedStyle(u).lineHeight)||24,g=Math.round(h*3.2);if(u.scrollHeight<=g)return;u.style.setProperty("--desc-max",g+"px"),d.classList.add("is-collapsed");const m=document.createElement("button");m.type="button",m.className="desc-toggle",m.setAttribute("aria-expanded","false"),m.innerHTML=t+'<svg class="desc-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',m.addEventListener("click",()=>{const y=d.classList.toggle("is-collapsed");u.style.maxHeight="",m.innerHTML=(y?t:a)+'<svg class="desc-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',m.setAttribute("aria-expanded",y?"false":"true")}),d.appendChild(m)})}function qn(){const e=f("#app");if(!e)return;qt(),new MutationObserver(()=>qt()).observe(e,{childList:!0,subtree:!0})}function Tn(){const e=f("#hamburger");if(!e)return;e.addEventListener("click",()=>{const n=f("#mobile-menu");n&&n.classList.contains("open")?se():lt()});const t=f("#mobile-backdrop");t&&t.addEventListener("click",se);const a=f("#mobile-close");a&&a.addEventListener("click",se),document.addEventListener("keydown",n=>{if(n.key==="Escape"){se();const s=f("#search-results");s&&(s.hidden=!0)}})}function In(e){const t=M("#tabbar .tab-item");let a="home";e[0]==="mock-test"?a="mock":e[0]==="categories"||e[0]==="category"||e[0]==="topic"?a="categories":e[0]==="exams"?a="exams":e[0]&&e[0]!==""&&(a=""),t.forEach(n=>n.classList.toggle("active",n.dataset.tab===a))}function zn(){const e=f("#tab-menu");e&&e.addEventListener("click",()=>lt())}function Tt(e){const a=e==="dark"?`
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="12" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `:`
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;M(".theme-toggle").forEach(n=>{n.innerHTML=a,n.style.cssText="display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:10px; border:1px solid var(--border,#e2e8f0); background:var(--bg-subtle,#f8fafc); color:var(--ink,#0f172a); cursor:pointer; padding:0; outline:none; transition:all 0.2s ease;"})}const It="axomexam-app-prompt-done";let zt=!1;function jt(){try{return localStorage.getItem(It)==="1"}catch{return!1}}function Ue(){zt=!0;const e=document.getElementById("app-prompt");e&&(e.classList.remove("show"),window.setTimeout(()=>{e&&(e.hidden=!0)},300))}function jn(){try{localStorage.setItem(It,"1")}catch{}Ue()}function Hn(){try{if(window.axomexamApp||window.__AXOMEXAM_APP__||window.AxomexamApp)return!0;const e=(navigator.userAgent||"").toLowerCase();if(e.indexOf("axomexam")!==-1||/(^|[;( ])wv([; )]|$)/.test(e))return!0}catch{}return!1}function Rn(){if(Hn()||window.matchMedia&&!window.matchMedia("(max-width: 900px)").matches||jt())return;const e=document.createElement("div");e.id="app-prompt",e.className="app-prompt",e.hidden=!0,e.innerHTML=`
      <a class="app-prompt-link" href="/download-app">
        <img class="app-prompt-icon" src="/app/axomexam-icon.png" alt="" width="40" height="40" />
        <span class="app-prompt-text">
          <b>${l(r("appPrompt.title"))}</b>
          <span>${l(r("appPrompt.msg"))}</span>
        </span>
      </a>
      <button class="app-prompt-close" type="button" aria-label="${l(r("appPrompt.close"))}" title="${l(r("appPrompt.close"))}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>`,document.body.appendChild(e),e.querySelector(".app-prompt-close").addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),Ue()}),e.querySelector(".app-prompt-link").addEventListener("click",()=>{Ue()}),window.setTimeout(()=>{zt||jt()||(e.hidden=!1,e.classList.add("show"))},5e3)}function Dn(){const e=document.documentElement;let t="light";try{t=localStorage.getItem("axomexam-theme")||"light"}catch{}t==="dark"?e.setAttribute("data-theme","dark"):e.removeAttribute("data-theme"),Tt(t);const a=n=>{n==="dark"?e.setAttribute("data-theme","dark"):e.removeAttribute("data-theme");try{localStorage.setItem("axomexam-theme",n)}catch{}Tt(n)};M(".theme-toggle").forEach(n=>{n.dataset.themeBound||(n.dataset.themeBound="1",n.addEventListener("click",()=>{const s=e.getAttribute("data-theme")==="dark";a(s?"light":"dark")}))})}document.addEventListener("DOMContentLoaded",()=>{Tn(),zn(),Dn(),qn(),Ln()})})();
