/* ============================================================
   axomexam — app.js
   Application logic: i18n, navigation, routing, rendering,
   search, Q&A reader, Math Engine (Assamese + English), Mock Tests,
   Dedicated Downloads Search, Detailed Bilingual AdSense Legal Pages,
   Mobile-Optimized Clean Article Reader for Study Guides,
   Pure Path-Based Routing (No # Hashes Anywhere).
   Domain: axomexam.in
   Default UI Language: English ("en").
   ============================================================ */

(() => {
  "use strict";

  /* ================= State ================= */
  const state = {
    categories: [],        
    topicMap: {},          
    topicIndex: [],        
    ready: false,
    page: 0,               
    lang: "as",            
    uiLang: "en",          
    mock: null,            
    isGeneratingPdf: false,
    mockSetCache: {},
    exams: null,
    examQuestionTotal: 0,
    examTotalLoaded: false,
    examTotalPromise: null,
    counts: null,
    caCounts: null,
    caQuestionTotal: 0,
    caTotalPromise: null,
    searchCorpusReady: false
  };

  /* Max mock test set number to probe per subcategory */
  const MAX_MOCK_SETS = 20;
  /* Minimum number of set cards to show once at least one set exists */
  const DEFAULT_VISIBLE_SETS = 5;
  /* Displayed question total = real live count + this bonus, so the site
     always shows a higher number while staying in sync as questions are added. */
  const QUESTION_DISPLAY_BONUS = 6000;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ================= On-demand third-party libraries =================
     html2canvas / jsPDF are only needed when the user generates a PDF or
     shares a result card. KaTeX is only needed on pages that actually
     contain math delimiters. All three are loaded lazily instead of
     shipping ~600 KB of unused JavaScript on every page. */
  let _pdfLibsPromise = null;
  let _html2canvasPromise = null;
  let _katexPromise = null;

  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load " + src));
      document.head.appendChild(s);
    });
  }

  function loadStyleOnce(id, href) {
    if (document.getElementById(id)) return;
    const l = document.createElement("link");
    l.id = id;
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }

  function ensureKatex() {
    if (typeof window.renderMathInElement === "function") return Promise.resolve();
    if (!_katexPromise) {
      loadStyleOnce("katex-css", "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css");
      _katexPromise = loadScriptOnce("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js")
        .then(() => loadScriptOnce("https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"))
        .catch((e) => { _katexPromise = null; throw e; });
    }
    return _katexPromise;
  }

  function ensureHtml2canvas() {
    if (window.html2canvas) return Promise.resolve();
    if (!_html2canvasPromise) {
      _html2canvasPromise = loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js")
        .catch((e) => { _html2canvasPromise = null; throw e; });
    }
    return _html2canvasPromise;
  }

  function ensurePdfLibs() {
    if (window.jspdf && window.html2canvas) return Promise.resolve();
    if (!_pdfLibsPromise) {
      _pdfLibsPromise = (async () => {
        if (!window.html2canvas) await ensureHtml2canvas();
        if (!window.jspdf) {
          await loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
        }
      })().catch((e) => { _pdfLibsPromise = null; throw e; });
    }
    return _pdfLibsPromise;
  }

  /* Direct Vector Brand Logo */
  const BRAND_LOGO_SVG = `
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
  `;

  /* PDF Optimized Vector Logo */
  const PDF_BRAND_LOGO_SVG = `
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
  `;

  /* ================= i18n helpers ================= */
  function t(key) {
    if (typeof I18N !== "undefined") {
      const langObj = I18N[state.uiLang] || I18N.en || I18N.as;
      if (langObj && langObj[key]) return langObj[key];
      if (I18N.en && I18N.en[key]) return I18N.en[key];
    }
    return key;
  }

  function localized(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    const l = state.uiLang || "en";
    return obj[l] || obj.en || obj.as || "";
  }

  /* ================= Deep content for thin hub pages =================
     These blurbs describe the real scope of each subject. They are
     combined with live data (topic names + real question counts) so that
     every category, mock-test and previous-year page carries genuine,
     page-specific study content instead of a bare list of links. */
  const SUBJECT_INFO = {
    gk: "General Knowledge carries a large weight in almost every Assam recruitment examination. It combines Assam-specific history, literature, geography, art and culture with Indian polity, history, geography and economics. Because the section is factual and predictable, consistent revision usually converts into a high, reliable score in ADRE, Assam Police and APSC papers.",
    "assam-history": "Assam History covers the ancient Kamarupa kingdom and its rulers, the medieval Ahom and Koch dynasties, the Burmese invasions and the Treaty of Yandabo, and the colonial and freedom-struggle period. Questions generally test dynasties, capitals, battles, treaties and administrative reforms.",
    "assam-literature": "Assam Literature spans the pre-Vaishnavite period, Sankaradeva and the Vaishnavite age, the Ahom-era chronicles, and the modern era from Arunodoi to Jonaki. Aspirants are asked about authors, works, literary movements and major awards.",
    "indian-history": "Indian History covers ancient civilisations, the Mauryas and Guptas, medieval Sultanates and the Mughals, and the modern freedom movement. Questions focus on timelines, personalities, administrative systems and landmark events.",
    polity: "Political Science covers the Indian Constitution, fundamental rights and duties, the Union and State machinery, panchayati raj, and Assam-specific provisions such as the Sixth Schedule and Article 371B. It is a high-scoring, factual section.",
    geography: "Geography covers physical, economic and social geography with dedicated blocks on the rivers, hills, climate and resources of Assam, alongside Indian and world geography. Map-based and location questions are common.",
    economics: "Economics covers basic economic concepts, Indian economic policy and planning, budgeting and banking, along with the agriculture and industry of Assam. Questions are mostly conceptual and current-affairs linked.",
    "art-culture": "Art and Culture covers the festivals, dance, music, crafts, temples and heritage of Assam and India. Questions test classical dances, musical instruments, festivals, monuments and folk traditions.",
    math: "Mathematics tests numerical ability and quantitative aptitude and is one of the biggest scoring areas in ADRE, Assam Police, SSC and Railway tests. It brings together arithmetic, advanced math and statistics with data interpretation.",
    arithmetic: "Arithmetic covers percentages, profit and loss, ratio and proportion, averages, time-speed-distance, time and work, simple and compound interest, and mensuration. These topics carry the largest number of questions in state recruitment papers.",
    "advanced-math": "Advanced Math covers algebra, geometry, trigonometry, number systems and higher-level problem solving. It is especially useful for APSC, SSC and technical posts.",
    "statistics-and-data-interpretation": "Statistics and Data Interpretation covers averages, measures of central tendency, tables, bar and pie charts, and line graphs. The focus is on fast calculation and reading data accurately.",
    science: "General Science covers Physics, Chemistry and Biology at a Class 6 to 10 level, which is the standard followed by Assam government recruitment tests. Questions test everyday science, definitions, units and simple applications.",
    physics: "Physics covers motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and the basics of modern physics. Units, definitions and simple numericals are frequently asked.",
    chemistry: "Chemistry covers matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry. Chemical formulae and common reactions are important.",
    biology: "Biology covers the human body and its systems, nutrition and health, plants, cell biology, ecology and the environment. Health and disease questions are common in Assam Police and ADRE tests.",
    reasoning: "Reasoning Ability tests logical and analytical thinking through verbal, non-verbal and critical reasoning questions. Because speed and accuracy decide the score, timed practice is essential.",
    "verbal-reasoning": "Verbal Reasoning covers series, coding-decoding, blood relations, direction sense, analogy and classification. Most questions become quick to solve with regular practice.",
    "analytical-critical-reasoning": "Analytical and Critical Reasoning covers statements and conclusions, assumptions, syllogism, seating arrangement and puzzles. It rewards careful reading over guesswork.",
    "non-verbal-reasoning": "Non-Verbal Reasoning covers figure series, mirror and water images, paper folding, embedded figures and pattern completion. Spatial visualisation is the main skill tested.",
    english: "General English tests grammar, vocabulary, sentence structure and comprehension. It appears in ADRE, Assam Police, SSC and Railway exams and is relatively easy to score with steady revision.",
    "parts-of-speech": "Parts of Speech covers nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections, and how each of them functions inside a sentence.",
    grammar: "Grammar covers tenses, articles, subject-verb agreement, active and passive voice, direct and indirect speech, and common error spotting.",
    "sentence-structure": "Sentence Structure covers sentence types, phrases and clauses, sentence correction, and paragraph organisation and ordering.",
    vocabulary: "Vocabulary covers synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling. Regular reading and short word lists help the most.",
    computer: "Computer Awareness tests the fundamentals of computers, software and operating systems, MS Office, networking and the internet, cyber security, DBMS and number systems. It is a quick-scoring section in ADRE and other state tests.",
    "fundamentals-hardware": "Computer Fundamentals and Hardware covers input and output devices, memory, storage, the CPU and the generations of computers.",
    "software-os": "Software and Operating Systems covers types of software, the functions of an operating system, file management, and common Windows and Linux features.",
    "ms-office-suite": "MS Office Suite covers Microsoft Word, Excel and PowerPoint, including commonly used menu options, shortcuts and formulas.",
    "networking-internet": "Networking and Internet covers network types and topologies, IP addresses, protocols such as HTTP and FTP, browsers, email and internet services.",
    "cyber-security": "Cyber Security covers online threats such as viruses, malware, phishing and hacking, along with passwords, encryption and safe internet practices.",
    "dbms-number-shortcuts": "DBMS, Number System and Shortcuts covers database basics, number system conversions, and keyboard shortcuts with their common uses.",
    articles: "Articles are long-form, easy-reading study pieces that explain a topic in depth and in simple bilingual language, so you can build conceptual clarity before attempting questions.",
    "assam-police": "Assam Police previous year papers help you understand the actual question pattern, difficulty level and frequently repeated topics for Sub-Inspector and Constable recruitment conducted by SLPRB.",
    "dhs-dme": "DHS and DME previous year papers cover the question patterns for Directorate of Health Services and Directorate of Medical Education recruitment in Assam.",
    "guwahati-hc": "Guwahati High Court previous year papers cover the pattern for Grade III, Grade IV, Junior Assistant (JAA) and related recruitment under the High Court of Assam.",
    railway: "Railway previous year papers cover NTPB, Group D, ALP and related central railway recruitment patterns, including the computer-based test structure.",
    ssc: "SSC previous year papers cover CGL, CHSL, MTS and related central government recruitment patterns, useful for candidates preparing for both central and state posts."
  };

  /* ==== BEGIN GENERATED DEEP CONTENT (scripts/build-deep-content.js) ==== */
  const DEEP_CONTENT = {"arithmetic":{"title":"Arithmetic Questions and Short Tricks for ADRE, APSC and Assam Police | axomexam","meta":"Free arithmetic practice for ADRE 2.0, Assam Police, APSC, SSC and Railway exams. Percentage, profit and loss, ratio, average, time and work, SI and CI with bilingual explanations.","lead":["Arithmetic is the backbone of the quantitative aptitude section in almost every Assam government recruitment examination. ADRE Grade 3 and Grade 4, Assam Police Constable and Sub-Inspector, APSC CCE, DHS, DME, Gauhati High Court, SSC and Railway papers all test the same core arithmetic chapters, and these questions often decide whether a candidate clears the cut-off.","On axomexam the subject is organised chapter by chapter so that you can build speed and accuracy step by step. Every topic links to a practice set with worked solutions in English and Assamese, so you learn the exact method the examiner expects instead of memorising individual answers."],"sections":[{"h":"Why arithmetic decides your mathematics score","p":["Numerical ability usually carries 15 to 25 questions in Assam recruitment papers and arithmetic forms the largest share of that block. The questions are formula-based and repetitive, which means a well-practised candidate can solve them quickly and score reliably. Because the same chapters repeat across state and central exams, one solid round of arithmetic preparation pays off in several tests at the same time."]},{"h":"Arithmetic chapters covered on axomexam","list":["Number System and Simplification — divisibility rules, HCF, LCM, remainders, surds and fast calculation.","Percentage — increase and decrease, successive change and percentage-based word problems.","Ratio and Proportion — direct and inverse proportion and division of quantities.","Profit, Loss and Discount — cost price, selling price, marked price, successive discounts and dishonest-dealer problems.","Average — simple average, weighted average and average age and speed problems.","Time and Work — efficiency, work and wages and pipes and cisterns.","Time, Speed and Distance — relative speed, problems on trains, boats and streams.","Simple and Compound Interest — instalments, growth and depreciation.","Mensuration — area, perimeter, volume and surface area of standard shapes.","Problems on Ages, Partnership and Mixture and Alligation."]},{"h":"Most repeated arithmetic chapters in ADRE and Assam Police","p":["Based on past papers, the following chapters appear again and again and deserve extra revision: percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest, and mensuration. If you are short on time, master these eight first."]},{"h":"How to prepare arithmetic for Assam exams","list":["Learn the formula or short method for a chapter before attempting its questions.","Solve 15 to 20 questions per topic every day and time yourself with a stopwatch.","Keep a formula notebook and revise it for five minutes before each practice session.","Read the explanation for every wrong answer and note the exact reason for the mistake.","Re-attempt the same set after three days and check whether your accuracy has improved.","Take a full timed mock test every week to get used to exam-day pressure."]},{"h":"Common mistakes to avoid","list":["Rushing through reading and misreading values such as 'less than' and 'more than'.","Skipping the units and mixing percentages with absolute numbers.","Solving every question the long way instead of using short tricks.","Ignoring mensuration because it looks difficult — it is one of the most predictable chapters."]}],"faqs":[{"q":"Which arithmetic topics are most important for ADRE 2.0?","a":"Percentage, profit and loss, ratio and proportion, average, time and work, time–speed–distance, simple and compound interest and mensuration carry the highest marks. Practise these before the less frequently asked chapters."},{"q":"How can I improve my speed in arithmetic calculations?","a":"Use tables up to 20, squares up to 30, and percentage-to-fraction conversions. Practise with a timer and use approximation wherever the options allow it."},{"q":"Is arithmetic in Assam Police exams difficult?","a":"No. Assam Police arithmetic stays close to the standard patterns. With regular practice and correct basics, most candidates can attempt the entire section comfortably."},{"q":"Can I practise arithmetic in Assamese on axomexam?","a":"Yes. Questions and explanations are bilingual. You can switch between Assamese and English at any time, so the same concept is reinforced in both languages."},{"q":"How much time should I give to arithmetic every day?","a":"One to one-and-a-half hours of focused practice is enough for most aspirants. Spend the first 20 minutes on formulas and the rest on timed questions and error review."},{"q":"Is arithmetic practice on axomexam free?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge."}]},"non-verbal-reasoning":{"title":"Non-Verbal Reasoning Questions with Answers for ADRE and APSC | axomexam","meta":"Practice non-verbal reasoning for ADRE, Assam Police, APSC, SSC and Railway exams. Figure series, mirror and water images, paper folding, embedded figures, figure matrix, cube and dice.","lead":["Non-verbal reasoning tests how quickly you can read visual information such as figures, patterns, shapes and spatial arrangements. It does not depend on language or vocabulary, so the marks are decided purely by your powers of observation and practice.","This section appears in ADRE, Assam Police, APSC CCE, SSC, Railway and many other recruitment tests. On axomexam every chapter links to a practice set with clear visual explanations so you can train your eye to spot the rule behind each figure quickly."],"sections":[{"h":"What non-verbal reasoning actually tests","p":["Each question shows a sequence or a group of figures and asks you to find the next figure, the odd figure or the hidden figure. The underlying rule may involve rotation, reflection, addition or removal of parts, shading, or movement of elements. Once you identify the rule, the answer follows almost mechanically — which is why this section can become very high-scoring."]},{"h":"Non-verbal reasoning chapters covered on axomexam","list":["Image Series — find the next figure by tracking rotation, growth and shading.","Image Analogy — apply the same relationship between a pair of figures.","Image Classification — pick the figure that does not fit the group.","Mirror Images — reflect a figure across a vertical mirror line.","Water Images — reflect a figure across a horizontal water line.","Paper Folding and Paper Cutting — visualise the punched pattern after unfolding.","Embedded Figures — locate a smaller figure hidden inside a larger one.","Completion of Incomplete Pattern — identify the missing piece of a design.","Figure Matrix — follow the row and column logic of a matrix of figures.","Counting of Figures — count triangles, squares or straight lines in a complex figure.","Cube and Dice — solve painted-cube, dice-rule and opposite-face problems.","Rule Detection and Shape Construction."]},{"h":"Non-verbal reasoning preparation strategy","list":["Practise every chapter by drawing the figures yourself; the hand learns the pattern as fast as the eye.","For series questions, check rotation, number of elements, shading and symmetry one by one.","Memorise the dice rule and opposite-face tricks for cube and dice questions.","Solve at least 20 figures a day and note down the rule you missed for each wrong answer.","Use a mirror or folded paper for the first few mirror, water and paper-folding questions.","Attempt figure-based sets in timed blocks to build visual speed."]},{"h":"Common mistakes to avoid","list":["Guessing the rule from the first two figures instead of checking it against all figures.","Confusing clockwise and anticlockwise rotation.","Losing track of the number of dots, lines or shaded parts.","Rushing through counting-figures questions, which need a systematic point-by-point count."]}],"faqs":[{"q":"Is non-verbal reasoning hard to prepare?","a":"No. It rewards consistent practice more than talent. Once you learn the standard rule types, most questions become quick and mechanical."},{"q":"Which non-verbal topics are most important for ADRE and Assam Police?","a":"Image series, analogy, mirror and water images, paper folding and cutting, embedded figures and counting of figures are asked most frequently."},{"q":"How do I solve cube and dice questions quickly?","a":"Learn the dice rule for adjacent and opposite faces and the counting rule for painted cubes. With these two methods most questions can be solved in a few seconds."},{"q":"Can I practise non-verbal reasoning in Assamese?","a":"Yes. The practice sets and explanations are bilingual, so you can read them in Assamese or English and switch whenever you want."},{"q":"How much daily practice does non-verbal reasoning need?","a":"Twenty to thirty figures a day is enough. Regular short sessions work better than occasional long ones for visual reasoning."},{"q":"Is non-verbal reasoning practice free on axomexam?","a":"Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription."}]},"verbal-reasoning":{"title":"Verbal Reasoning Questions and Practice for ADRE, APSC and Assam Police | axomexam","meta":"Free verbal reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Analogy, coding-decoding, blood relations, direction sense, series, syllogism and clock and calendar.","lead":["Verbal reasoning checks how well you can find patterns in words, numbers and letters, and how logically you can follow a set of statements. It is one of the most reliable scoring areas in the reasoning section because the patterns repeat year after year.","This page covers the full verbal reasoning syllabus for ADRE, Assam Police, APSC CCE, SSC and Railway exams. Each chapter links to a practice set with step-by-step bilingual explanations so that you understand the logic behind every answer."],"sections":[{"h":"Why verbal reasoning is high-scoring","p":["Most verbal reasoning questions follow a fixed set of rules — the same logic that has appeared in previous papers. Coding-decoding, blood relations, direction sense and series in particular can be mastered with a handful of techniques. Once the rules are clear, these questions take little time and rarely go wrong."]},{"h":"Verbal reasoning chapters covered on axomexam","list":["Analogy — identify the relationship between a given pair of words or numbers.","Classification and Odd One Out — find the item that does not belong to the group.","Number Series, Alphabet Series and Alpha-Numeric Series.","Coding-Decoding — letter, number and symbol based coding rules.","Blood Relations — family trees, generations and coded relationships.","Direction and Distance Test — track movement and find the final direction.","Order and Ranking — arrange people by height, age, marks or position.","Alphabet Test and Word Formation.","Logical Venn Diagrams — decide the correct relationship between sets.","Syllogism — draw valid conclusions from given statements.","Clock and Calendar — angle, hands, odd days and day-of-the-week problems.","Mathematical Operations, Data Sufficiency and Input-Output."]},{"h":"Verbal reasoning preparation strategy","list":["Learn the standard rule for each chapter, then solve fifty questions of that chapter.","For series, always check difference, ratio, square, cube and alternating patterns in order.","Draw blood-relation and direction questions on paper instead of solving them mentally.","Memorise the Venn diagram combinations and the odd-days table for calendar questions.","Maintain a log of every question where you guessed, and revise it before the exam.","Practise mixed sets so you learn to switch logic quickly under time pressure."]},{"h":"Common mistakes to avoid","list":["Not reading the question carefully — one changed word can change the whole logic.","Assuming extra information that is not given, especially in syllogism.","Mixing up the direction of movement in direction-sense questions.","Spending too long on one puzzle instead of moving on and returning later."]}],"faqs":[{"q":"Which verbal reasoning topics are most important for ADRE?","a":"Coding-decoding, blood relations, direction sense, series, analogy and classification are the most frequently asked topics in ADRE and Assam Police papers."},{"q":"Is verbal reasoning easier than non-verbal reasoning?","a":"Many candidates find verbal reasoning easier because the rules are clearly defined. Personal strength varies, so practise both and see where you score faster."},{"q":"How do I solve coding-decoding questions quickly?","a":"Compare the given word with its code and note the shift in positions of letters and numbers. Once the shift is identified, apply it to the new word."},{"q":"Can I prepare verbal reasoning in Assamese?","a":"Yes. Questions and explanations are available in both Assamese and English, and you can switch languages while reading."},{"q":"How many reasoning questions should I solve daily?","a":"Fifty to sixty questions across two or three chapters is a healthy daily target, along with a review of every mistake."},{"q":"Is verbal reasoning practice on axomexam free?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free, with no login or subscription."}]},"analytical-critical-reasoning":{"title":"Analytical and Critical Reasoning Practice for ADRE and APSC | axomexam","meta":"Practice analytical and critical reasoning for ADRE, APSC, Assam Police, SSC and Railway. Seating arrangement, puzzles, statement and assumption, conclusion, assertion and reason.","lead":["Analytical and critical reasoning measures how well you can organise information and judge arguments. It covers seating arrangements, complex puzzles, coded inequalities, and the statement-based chapters such as assumption, conclusion, argument and course of action.","This is the part of reasoning where careful reading matters more than quick guessing. On axomexam each chapter includes solved examples and practice sets with detailed bilingual explanations so that you can see exactly how a conclusion is derived from the given statements."],"sections":[{"h":"What the analytical and critical section demands","p":["Puzzle and arrangement questions test your ability to place people or objects according to a set of conditions. The statement-based chapters test your judgement of what is implied, assumed, strengthened or weakened by a given passage. Both require patience, and both become much easier once you learn to represent information in a simple diagram or table."]},{"h":"Analytical and critical reasoning chapters covered on axomexam","list":["Seating Arrangement — linear, circular and square arrangements with mixed clues.","Complex Puzzles — floor, box, scheduling, month and category based puzzles.","Inequality — direct and coded inequalities with all possible conclusions.","Statement and Assumptions — identify the implicit assumption behind a statement.","Statement and Conclusions — decide which conclusion logically follows.","Statement and Arguments — judge the strength of arguments for and against.","Statement and Course of Action — choose the most practical response.","Cause and Effect — separate the cause from the effect.","Assertion and Reason — evaluate the link between an assertion and its reason.","Decision Making, Drawing Inferences and Data Sufficiency."]},{"h":"Analytical and critical reasoning preparation strategy","list":["For arrangements and puzzles, draw the layout and mark fixed positions first, then the uncertain ones.","Learn the standard conclusion rules for inequality and syllogism and apply them mechanically.","For assumption and conclusion questions, separate what is stated from what is only implied.","Practise puzzles of increasing difficulty instead of jumping straight to complex sets.","Review the full solution even when your answer was correct, to confirm the reasoning.","Attempt one full puzzle set under a timer every day to build stamina."]},{"h":"Common mistakes to avoid","list":["Adding real-world knowledge that is not part of the given passage.","Assuming a conclusion is valid when it is only probably true.","Making a single wrong placement early in a puzzle and then continuing with it.","Spending a large amount of time on one puzzle and losing easy marks elsewhere."]}],"faqs":[{"q":"Are puzzles and seating arrangement important for ADRE?","a":"Yes. Analytical reasoning, including seating arrangement and puzzles, carries good weight and also appears in the Assam Police and APSC papers."},{"q":"How do I improve in statement and conclusion questions?","a":"Decide clearly what the statement guarantees. A conclusion that needs extra information beyond the statement is not valid."},{"q":"What is the difference between assumption and conclusion?","a":"An assumption is an unstated idea the speaker takes for granted, while a conclusion is the logical result that follows from the given information."},{"q":"How much time should I spend on one puzzle?","a":"If a puzzle is not opening up within about a minute and a half, mark the possibilities and move on. Return to it after finishing the easier questions."},{"q":"Can I practise analytical reasoning in Assamese?","a":"Yes. All practice sets and explanations are bilingual, so you can study in Assamese or English as you prefer."},{"q":"Is analytical reasoning practice free on axomexam?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},"science":{"title":"General Science Questions for ADRE, Assam Police and SSC | axomexam","meta":"Free general science practice for ADRE, Assam Police, APSC, SSC and Railway. Physics, Chemistry and Biology questions at Class 6 to 10 level with bilingual explanations.","lead":["General Science is one of the most predictable sections in Assam government recruitment exams. The questions come from Physics, Chemistry and Biology at roughly the Class 6 to 10 level, so a candidate who has revised the school textbooks carefully can score very well.","On axomexam the subject is divided into Physics, Chemistry and Biology, each with chapter-wise practice sets and explanations. The focus is on everyday science, definitions, units, simple applications and the health and environment facts that examiners repeat most often."],"sections":[{"h":"Which science questions are asked","p":["Questions usually test basic definitions, units of measurement, common chemical formulae, parts and functions of the human body, plant and animal classification, and everyday applications of physics and chemistry. Direct memory questions and simple numericals from physics make up a large part of the paper."]},{"h":"Science chapters covered on axomexam","list":["Physics — motion, force, work and energy, gravitation, heat, light, sound, electricity and magnetism, and basic modern physics.","Chemistry — matter, atoms and molecules, the periodic table, acids and bases, metals and non-metals, and everyday chemistry.","Biology — the human body and its systems, nutrition and health, plants, cell biology, genetics, ecology and the environment."]},{"h":"Most repeated science topics in Assam exams","list":["Units and measurements of physical quantities.","Human body systems, especially the digestive, circulatory and nervous systems.","Vitamins, their sources and deficiency diseases.","Common chemical formulae and everyday chemical reactions.","Scientific names, plant and animal classification.","Environment, pollution and ecological terms."]},{"h":"General science preparation strategy","list":["Revise one chapter from the NCERT or standard textbook, then attempt its practice set immediately.","Make short notes of definitions, units and formulae — these are asked directly.","Memorise common abbreviations, vitamins and deficiency diseases in table form.","Practise physics numericals separately, since they need formula application.","Revise the diagrams of important systems and experiments.","Attempt a mixed science set every week to check retention."]},{"h":"Common mistakes to avoid","list":["Skipping Biology as 'easy' and losing direct-mark questions.","Confusing units and symbols of similar physical quantities.","Studying from too many sources instead of mastering one standard textbook.","Ignoring everyday-science questions that are based on daily-life observations."]}],"faqs":[{"q":"What is the standard of science questions in ADRE and Assam Police?","a":"Most questions are at the Class 6 to 10 level. A careful revision of school textbooks covers the vast majority of the syllabus."},{"q":"Which science subject is most important for Assam exams?","a":"All three carry weight, but Biology and everyday science appear most frequently, followed by Physics and Chemistry."},{"q":"Do I need to memorise formulas for general science?","a":"Only a limited set — mainly units, simple physics formulae and common chemical equations. Most questions are direct and factual."},{"q":"Can I study general science in Assamese?","a":"Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English."},{"q":"How should I revise science before the exam?","a":"Use short notes and tables for facts, units and formulae, and solve past-paper questions to see which facts repeat."},{"q":"Is general science practice free on axomexam?","a":"Yes. All practice sets, explanations and PDF notes on axomexam.in are completely free with no login or subscription."}]},"english":{"title":"General English Grammar and Vocabulary for ADRE, Assam Police | axomexam","meta":"Practice general English for ADRE, Assam Police, APSC, SSC and Railway. Grammar, parts of speech, sentence structure, vocabulary, synonyms, antonyms, idioms and error spotting.","lead":["General English is a steady, low-risk scoring section in ADRE, Assam Police, APSC, SSC and Railway exams. It tests grammar, vocabulary and comprehension, and the syllabus is limited — which means regular revision quickly translates into marks.","On axomexam the subject is organised into grammar, parts of speech, sentence structure and vocabulary, with practice questions and clear explanations. The goal is to help you recognise the same rule in an exam question, even when it is worded differently."],"sections":[{"h":"What general English tests","p":["The section checks whether you can identify correct grammar in use, choose the right word for a blank, spot an error in a sentence, and understand the meaning of words and phrases. Direct questions on synonyms, antonyms, one-word substitution and idioms are common."]},{"h":"English chapters covered on axomexam","list":["Grammar — tenses, articles, subject-verb agreement, active and passive voice, and direct and indirect speech.","Parts of Speech — nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions and interjections.","Sentence Structure — sentence types, phrases and clauses, sentence correction and paragraph ordering.","Vocabulary — synonyms, antonyms, one-word substitutions, idioms and phrases, and spelling."]},{"h":"Most repeated English topics","list":["Subject-verb agreement and common error spotting.","Tenses and their correct usage.","Prepositions and articles.","Synonyms, antonyms and one-word substitutions.","Idioms and phrases with their meanings.","Fill in the blanks and cloze tests."]},{"h":"General English preparation strategy","list":["Revise one grammar rule at a time and then solve twenty questions on it.","Read one short passage daily and note unfamiliar words with their meanings.","Learn five new words, five synonyms and three idioms every day.","Practise error-spotting by reading a sentence as a whole before choosing an option.","Revise the rules of articles, prepositions and subject-verb agreement most often.","Attempt a full English set weekly to track your accuracy."]},{"h":"Common mistakes to avoid","list":["Choosing an option because it 'sounds correct' instead of applying the rule.","Ignoring articles and prepositions, which are asked every year.","Learning words without usage or example sentences.","Reading the entire comprehension passage before looking at the questions."]}],"faqs":[{"q":"Is general English easy to score in ADRE?","a":"Yes. The syllabus is limited and rule-based, so with steady revision most candidates can score well above average in this section."},{"q":"Which grammar topics are most important?","a":"Tenses, subject-verb agreement, articles, prepositions, active and passive voice and direct and indirect speech are asked most often."},{"q":"How can I improve my vocabulary quickly?","a":"Learn words in small daily sets with their usage, and revise synonyms, antonyms, one-word substitutions and idioms regularly."},{"q":"Can I study English in Assamese on axomexam?","a":"The explanations are bilingual so that the rule is clear in both languages, and the questions follow the English exam pattern."},{"q":"Is comprehension asked in these exams?","a":"Yes, many papers include a short reading-comprehension passage along with the direct grammar and vocabulary questions."},{"q":"Is general English practice free on axomexam?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},"articles":{"title":"Study Articles and Notes for Assam Competitive Exams | axomexam","meta":"Read free high-quality study articles for ADRE, APSC, Assam Police, SSC and Railway exams. Long-form notes on general knowledge, mathematics, science, reasoning, English and computers.","lead":["Axomexam articles are long-form study pieces that explain a topic in depth and in simple language. They are written to build conceptual clarity before you attempt questions, which makes them ideal for beginning a new topic or revising one that keeps going wrong.","The collection spans general knowledge, mathematics, general science, reasoning ability, general English and computer awareness, so there is a suitable article whether you are strengthening a weak area or looking for a quick revision of a familiar one."],"sections":[{"h":"How to use the articles section","p":["Read the article once to understand the concept, then attempt the related practice set. Articles are deliberately kept simple and example-driven so that the idea stays with you when you face a similar question in the exam."]},{"h":"Article categories available","list":["General Knowledge — Assam history, literature, geography, polity, economy and art and culture.","Mathematics — arithmetic, advanced math and data interpretation concepts explained step by step.","General Science — physics, chemistry and biology topics in everyday language.","Reasoning Ability — verbal, non-verbal and analytical reasoning techniques.","General English — grammar rules, vocabulary building and common error patterns.","Computer Awareness — fundamentals, software, MS Office, networking and cyber security."]},{"h":"How articles help your exam preparation","list":["They explain the 'why' behind a rule, which helps you apply it to new questions.","They are ideal revision material in the final weeks before the exam.","They connect theory with solved examples from previous papers.","They build the reading habit needed for comprehension and general awareness."]},{"h":"Tips to get the most from study articles","list":["Read with a pen and note down key points and formulas.","Attempt the linked practice set immediately after reading.","Revisit the article after a week to test your retention.","Use the bilingual view to strengthen terminology in both English and Assamese."]}],"faqs":[{"q":"What kind of articles are published on axomexam?","a":"Long-form, easy-reading study pieces on general knowledge, mathematics, science, reasoning, English and computer awareness, written for Assam competitive exams."},{"q":"Are the articles useful for ADRE and APSC?","a":"Yes. The articles cover the concepts and facts that appear in ADRE, APSC CCE, Assam Police, SSC and Railway papers."},{"q":"Should I read articles before or after practice questions?","a":"Read the article first to understand the concept, then attempt the linked practice set and review your mistakes."},{"q":"Are the articles available in Assamese?","a":"The content is designed to support both Assamese and English readers, and the key terms are explained in both languages."},{"q":"How often are new articles added?","a":"New articles are added regularly, so check the page again as you progress through your syllabus."},{"q":"Is the articles section free to use?","a":"Yes. Every article and study resource on axomexam.in is completely free with no login or subscription."}]},"math":{"title":"Mathematics for ADRE, APSC and Assam Police Exams | axomexam","meta":"Free mathematics practice for ADRE, Assam Police, APSC, SSC and Railway. Arithmetic, advanced math, statistics and data interpretation with bilingual step-by-step solutions.","lead":["Mathematics, or quantitative aptitude, is one of the highest-scoring areas in ADRE, Assam Police, APSC, SSC and Railway exams. The subject rewards practice: the more patterns you have seen, the faster and more accurately you solve on exam day.","On axomexam mathematics is divided into arithmetic, advanced math, and statistics and data interpretation. Each section builds from the basics to exam-level questions so that you can strengthen one area at a time."],"sections":[{"h":"Why mathematics matters in Assam exams","p":["Numerical ability carries a large number of questions and is usually the section where well-prepared candidates pull ahead. Because the concepts are fixed and the patterns repeat, mathematics gives a better return on preparation time than most other subjects."]},{"h":"Mathematics sections covered on axomexam","list":["Arithmetic — number system, percentage, ratio, profit and loss, average, time and work, time and distance, and simple and compound interest.","Advanced Math — algebra, geometry, trigonometry, number systems and higher-level problem solving.","Statistics and Data Interpretation — averages, tables, bar charts, pie charts and line graphs."]},{"h":"Mathematics preparation strategy","list":["Master the basics of a chapter before moving to its advanced questions.","Learn and apply short tricks instead of solving every question the long way.","Practise with a timer to build the speed the exam demands.","Keep a formula notebook and revise it regularly.","Analyse every wrong answer to find whether the mistake was conceptual or careless.","Take a full maths mock test every week and track your accuracy."]},{"h":"Common mistakes to avoid","list":["Attempting advanced questions without clear basics.","Ignoring data interpretation, which offers easy marks for careful readers.","Making calculation errors under time pressure because of skipped approximation practice.","Not practising enough variety of question types."]}],"faqs":[{"q":"Which mathematics topics are most important for ADRE?","a":"Arithmetic forms the core, especially percentage, ratio, average, profit and loss, time and work and time–speed–distance. Advanced math and data interpretation add the remaining marks."},{"q":"Is advanced math needed for Assam Police and ADRE?","a":"Basic algebra and geometry are useful, while the emphasis stays on arithmetic. APSC and technical posts need a stronger grip on advanced math."},{"q":"How can I increase my calculation speed?","a":"Memorise tables, squares, cubes and percentage-to-fraction values, and practise approximation techniques with timed sets."},{"q":"How much time should I spend on mathematics daily?","a":"One to one-and-a-half hours of focused practice per day is enough when combined with regular error review and weekly mock tests."},{"q":"Can I practise mathematics in Assamese?","a":"Yes. All practice sets and step-by-step explanations are bilingual and can be read in Assamese or English."},{"q":"Is mathematics practice free on axomexam?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},"reasoning":{"title":"Reasoning Ability Questions for ADRE, APSC and Assam Police | axomexam","meta":"Free reasoning practice for ADRE, Assam Police, APSC, SSC and Railway. Verbal, non-verbal and analytical reasoning with step-by-step bilingual explanations and timed sets.","lead":["Reasoning ability tests logical and analytical thinking rather than memorised facts. It is divided into verbal reasoning, non-verbal reasoning and analytical and critical reasoning, and together they form a scoring section in ADRE, Assam Police, APSC, SSC and Railway exams.","Because speed and accuracy decide the score in reasoning, timed practice is essential. On axomexam each of the three branches has chapter-wise sets followed by detailed explanations, so you can train both the logic and the pace."],"sections":[{"h":"Why reasoning is a high-scoring section","p":["Reasoning questions follow fixed patterns that repeat across papers. Once a candidate learns the standard rules for series, coding, arrangements and statement-based questions, the section becomes fast and dependable. It also requires no additional study material beyond regular practice."]},{"h":"Reasoning branches covered on axomexam","list":["Verbal Reasoning — analogy, classification, series, coding-decoding, blood relations, direction sense, ranking, syllogism and clock and calendar.","Non-Verbal Reasoning — figure series, mirror and water images, paper folding and cutting, embedded figures, figure matrix, counting of figures and cube and dice.","Analytical and Critical Reasoning — seating arrangement, puzzles, inequality, and statement-based chapters such as assumption, conclusion, argument and course of action."]},{"h":"Reasoning preparation strategy","list":["Learn the rule for a chapter, then solve a set of at least twenty questions on it.","Draw diagrams for arrangements, blood relations and directions instead of solving mentally.","Practise mixed sets to get used to switching logic quickly.","Time every set so that speed improves along with accuracy.","Review wrong answers immediately and note the rule you missed.","Attempt a full reasoning mock test every week."]},{"h":"Common mistakes to avoid","list":["Guessing the logic instead of checking it against every part of the question.","Getting stuck on a single puzzle while easier questions wait.","Ignoring non-verbal reasoning because it looks unfamiliar.","Not practising enough variety, so unfamiliar patterns feel difficult in the exam."]}],"faqs":[{"q":"How many reasoning questions come in ADRE and Assam Police?","a":"The reasoning section usually carries between 15 and 25 questions depending on the post and paper."},{"q":"Which reasoning branch is most important?","a":"All three are asked, but verbal and analytical reasoning usually carry more questions than non-verbal reasoning."},{"q":"How can I improve reasoning speed?","a":"Learn the standard rules and then practise timed sets. Drawing diagrams for arrangements and puzzles also saves a lot of time."},{"q":"Is reasoning difficult for beginners?","a":"No. It is one of the most practice-friendly sections. With consistent daily practice, beginners improve quickly."},{"q":"Can I prepare reasoning in Assamese?","a":"Yes. Questions and explanations are bilingual and you can switch between Assamese and English while reading."},{"q":"Is reasoning practice free on axomexam?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]},"computer":{"title":"Computer Awareness Questions for ADRE, Assam Police and APSC | axomexam","meta":"Free computer awareness practice for ADRE, Assam Police, APSC, SSC and Railway. Fundamentals, hardware, software, MS Office, networking, cyber security, DBMS and number system.","lead":["Computer awareness is one of the quickest sections to prepare and score in ADRE, Assam Police, APSC, DHS, DME, Gauhati High Court and other state recruitment exams. Most questions are direct and factual, so a short, focused revision can secure almost full marks.","On axomexam the subject is divided into fundamentals and hardware, software and operating systems, MS Office, networking and the internet, cyber security, and DBMS with number system and shortcuts. Each chapter links to a practice set with clear explanations."],"sections":[{"h":"What computer awareness covers","p":["The syllabus begins with the basics of computers, their generations, input and output devices and memory, and then moves to software, operating systems and application packages. Networking and the internet, cyber security and database concepts complete the section."]},{"h":"Computer chapters covered on axomexam","list":["Computer Fundamentals and Hardware — generations, input and output devices, memory, storage and the CPU.","Software and Operating System — types of software, functions of an operating system, file management and common Windows and Linux features.","MS Office Suite — Word, Excel and PowerPoint, including menu options, shortcuts and formulas.","Networking and Internet — network types and topologies, IP addresses, protocols, browsers, email and internet services.","Cyber Security — viruses, malware, phishing, hacking, passwords, encryption and safe internet practices.","DBMS, Number System and Shortcuts — database basics, number system conversions and keyboard shortcuts."]},{"h":"Most repeated computer topics in Assam exams","list":["Generations of computers and their characteristics.","Input, output and storage devices with examples.","Keyboard shortcuts for common operations.","Basic MS Word and MS Excel functions and formulas.","Full forms of common computer abbreviations.","Types of computer viruses and cyber safety tips."]},{"h":"Computer awareness preparation strategy","list":["Make a one-page list of full forms and abbreviations and revise it daily.","Learn the keyboard shortcuts by actually using them on a computer.","Prepare a small table of input, output and storage devices.","Practise basic Excel formulas and Word menu options.","Revise number system conversions with a few examples each.","Attempt a chapter-wise set after studying each topic."]},{"h":"Common mistakes to avoid","list":["Ignoring the topic because it seems easy, and then forgetting the full forms.","Mixing up similar terms such as RAM and ROM, or hardware and software.","Not practising shortcuts, which are asked directly every year.","Studying advanced topics while the basics remain unclear."]}],"faqs":[{"q":"Is computer awareness asked in ADRE and Assam Police?","a":"Yes. It is part of the general awareness section and is one of the easiest areas to score in, because most questions are direct and factual."},{"q":"How much time is needed to prepare computer awareness?","a":"A focused revision of one or two weeks is usually enough, since the syllabus is small and mostly factual."},{"q":"Which computer topics are most important?","a":"Fundamentals, hardware and software differences, MS Office shortcuts and formulas, networking basics and cyber security are asked most often."},{"q":"Do I need a computer to prepare this section?","a":"A computer helps for shortcuts and MS Office, but the theory can be prepared from notes and practice questions on any device."},{"q":"Can I study computer awareness in Assamese?","a":"Yes. The practice sets and explanations on axomexam are bilingual and can be read in Assamese or English."},{"q":"Is computer awareness practice free on axomexam?","a":"Yes. Every practice set, explanation and PDF note on axomexam.in is completely free with no login or subscription."}]}};
  /* ==== END GENERATED DEEP CONTENT ==== */

  function subjectInfo(id) {
    return SUBJECT_INFO[id] || "";
  }

  function subjectTips(id) {
    const quant = ["math", "arithmetic", "advanced-math", "statistics-and-data-interpretation", "science", "physics", "chemistry", "biology", "reasoning", "verbal-reasoning", "analytical-critical-reasoning", "non-verbal-reasoning", "computer", "dbms-number-shortcuts"];
    if (quant.indexOf(id) !== -1) {
      return [
        "Revise the basic formulas and concepts of this section before you begin practising.",
        "Attempt the questions under a timer so that you get used to the speed expected on exam day.",
        "Read the explanation for every wrong answer and note down exactly why you missed it.",
        "Return to the same sets after a few days and check whether your accuracy has improved."
      ];
    }
    return [
      "Read the topic notes once, then attempt the related questions to test your recall.",
      "Mark the facts you keep forgetting and revise them in short, repeated sessions.",
      "Practise in both languages so you can recognise the same fact in Assamese and English.",
      "Review the explanations even for questions you answered correctly to strengthen retention."
    ];
  }

  function seoFaqBlockHTML(spec) {
    const info = spec.info || "";
    const items = spec.items || [];
    const tips = spec.tips || [];
    const faqs = spec.faqs || [];
    const listHTML = items.length
      ? `<h3 style="color:var(--ink,#0f172a); margin-top:22px;">${escapeHtml("What is covered here")}</h3><ul style="margin:8px 0 0 20px; line-height:1.9;">${items.map((it) => `<li><strong>${escapeHtml(it.name)}</strong>${it.count ? ` &mdash; ${it.count} ${escapeHtml(it.unit || "topics")}` : ""}</li>`).join("")}</ul>`
      : "";
    const tipsHTML = tips.length
      ? `<h3 style="color:var(--ink,#0f172a); margin-top:22px;">${escapeHtml("How to prepare " + (spec.name || ""))}</h3><ul style="margin:8px 0 0 20px; line-height:1.9;">${tips.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`
      : "";
    const faqHTML = faqs.length
      ? `<h3 style="color:var(--ink,#0f172a); margin-top:24px;">${escapeHtml("Frequently Asked Questions")}</h3><div class="seo-faq">${faqs.map((f) => `<details style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"><summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">${escapeHtml(f.q)}</summary><p style="margin:8px 0 0;">${escapeHtml(f.a)}</p></details>`).join("")}</div>`
      : "";
    return `
      <section class="section seo-deep" style="padding-bottom:48px;">
        <div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;">
          <h2 style="margin-top:0; color:var(--ink,#0f172a);">${escapeHtml(spec.h2 || spec.name || "")}</h2>
          ${info ? `<p>${escapeHtml(info)}</p>` : ""}
          ${listHTML}
          ${tipsHTML}
          ${faqHTML}
        </div>
      </section>`;
  }

  function appendSeoFaq(main, spec) {
    if (!main || !spec) return;
    const tmp = document.createElement("div");
    tmp.innerHTML = seoFaqBlockHTML(spec);
    if (tmp.firstElementChild) main.appendChild(tmp.firstElementChild);
  }

  /* ---- Rich, hand-written page content (see scripts/deep-content.data.js).
     Rendered identically to the pre-rendered static block so that SPA
     navigation shows the same content a crawler sees. ---- */
  function deepFaqHTML(faqs) {
    if (!faqs || !faqs.length) return "";
    return '<h3 style="color:var(--ink,#0f172a); margin-top:22px;">Frequently Asked Questions</h3><div class="seo-faq">' +
      faqs.map((f) => '<details style="border-bottom:1px solid var(--border,#e2e8f0); padding:12px 0;"><summary style="cursor:pointer; font-weight:700; color:var(--ink,#0f172a);">' + escapeHtml(f.q) + '</summary><p style="margin:8px 0 0;">' + escapeHtml(f.a) + "</p></details>").join("") +
      "</div>";
  }

  function deepSectionsHTML(sections) {
    return (sections || []).map((s) => {
      let html = '<h3 style="color:var(--ink,#0f172a); margin-top:22px;">' + escapeHtml(s.h) + "</h3>";
      if (s.p && s.p.length) html += s.p.map((p) => "<p>" + escapeHtml(p) + "</p>").join("");
      if (s.list && s.list.length) html += '<ul style="margin:8px 0 0 20px; line-height:1.9;">' + s.list.map((li) => "<li>" + escapeHtml(li) + "</li>").join("") + "</ul>";
      return html;
    }).join("");
  }

  function deepSectionHTML(entry) {
    const lead = (entry.lead || []).map((p) => "<p>" + escapeHtml(p) + "</p>").join("");
    const h2 = entry.h2 || String(entry.title || "").replace(/\s*\|\s*axomexam\s*$/i, "");
    return '<section class="section seo-deep" data-axo-deep="1" style="padding-bottom:48px;"><div class="info-panel" style="background:var(--bg,#ffffff); border:1px solid var(--border,#e2e8f0); border-radius:18px; padding:28px 24px; line-height:1.8; color:var(--ink-soft,#475569); max-width:900px; margin:0 auto; text-align:left;"><h2 style="margin-top:0; color:var(--ink,#0f172a);">' + escapeHtml(h2) + "</h2>" + lead + deepSectionsHTML(entry.sections) + deepFaqHTML(entry.faqs) + "</div></section>";
  }

  function autoSeo(main, o) {
    const deep = o && o.id ? DEEP_CONTENT[o.id] : null;
    if (deep) {
      const tmp = document.createElement("div");
      tmp.innerHTML = deepSectionHTML(deep);
      if (tmp.firstElementChild) main.appendChild(tmp.firstElementChild);
      return;
    }
    const name = o.name || "";
    const info = o.info || subjectInfo(o.id) || "";
    const faqs = (o.faqs || []).slice();
    const count = o.count || 0;
    const total = o.total || 0;
    if (!o.noDefaults) {
      faqs.push({
        q: "Is " + name + " available for free on axomexam?",
        a: "Yes. Every mock test, question bank, explanation and PDF note on axomexam.in is completely free. There is no login, subscription or hidden charge."
      });
      faqs.push({
        q: "Can I study " + name + " in Assamese as well as English?",
        a: "Yes. Questions and explanations are bilingual. You can switch between Assamese and English while reading so the same concept is reinforced in both languages."
      });
      if (count > 0) {
        faqs.push({
          q: "How much material is available for " + name + "?",
          a: "This section currently offers " + count + " topics" + (total > 0 ? " with around " + total + " questions" : "") + " and is updated regularly as new questions are added."
        });
      }
    }
    appendSeoFaq(main, {
      h2: o.h2 || (name + " - Overview"),
      name: name,
      info: info,
      items: o.items || [],
      tips: o.tips || subjectTips(o.id),
      faqs: faqs
    });
  }

  /* ================= Math & Formula Formatter ================= */
  function formatMath(str) {
    if (str == null) return "";
    let s = String(str);
    const hasLatex = /\$[^$]+\$|\\\([^\\]+\\\)/.test(s);
    if (!hasLatex) {
      s = escapeHtml(s);
      s = s.replace(/sqrt\(([^)]+)\)/gi, '&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>');
      s = s.replace(/√\(([^)]+)\)/g, '&radic;<span style="text-decoration:overline;padding-left:1px;">$1</span>');
      s = s.replace(/\^{([^}]+)}/g, '<sup>$1</sup>');
      s = s.replace(/\^([\-\+]?[0-9০-৯a-zA-Z\u0980-\u09FF]+)/g, '<sup>$1</sup>');
      s = s.replace(/_{([^}]+)}/g, '<sub>$1</sub>');
      s = s.replace(/_([0-9০-৯a-zA-Z\u0980-\u09FF]+)/g, '<sub>$1</sub>');
      s = s.replace(/\+\/-/g, '&plusmn;');
      s = s.replace(/&lt;=/g, '&le;').replace(/&gt;=/g, '&ge;');
    }
    return s;
  }

  function renderMathJax(el) {
    if (!el) return;
    /* Only pay for KaTeX when the element actually contains math. */
    if (!/\$|\\\(|\\\[/.test(el.textContent || "")) return;
    ensureKatex().then(function () {
      if (typeof renderMathInElement !== "function") return;
      try {
        renderMathInElement(el, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      } catch (e) { }
    }).catch(function () { });
  }

  /* Universal content extractor */
  function extractField(item, fieldName, forcedLang) {
    if (!item) return "";
    const targetLang = forcedLang || ((state.mock && state.mock.testLang) ? state.mock.testLang : state.lang);
    const longLang = targetLang === "en" ? "english" : "assamese";

    const processVal = (v) => {
      if (v === undefined || v === null) return "";
      if (Array.isArray(v)) {
        return v.map(line => `<div class="qa-step-line" style="margin:0 0 6px 0; padding:0; line-height:1.65; text-align:left;">${formatMath(line)}</div>`).join("");
      }
      if (typeof v === "object") {
        return processVal(v[targetLang] || v.as || v.en || Object.values(v)[0] || "");
      }
      return String(v);
    };

    const maybeResolveAnswer = (val) =>
      fieldName === "answer" ? resolveOptionAnswer(item, val, targetLang) : val;

    /* For multiple-choice questions the answer must clearly point to the
       correct option (A/B/C/D). When options + a correct option key exist,
       prefer "(Letter) option text" over a free-form descriptive answer so
       the reader can see exactly which choice is right. Step-by-step array
       answers are left untouched. */
    if (fieldName === "answer") {
      const idx = getCorrectOptionIndex(item);
      const opts = getOptionsList(item, targetLang);
      const rawAnsVal = item.answer !== undefined ? item.answer : item.a;
      const isStepAnswer = Array.isArray(rawAnsVal)
        || (rawAnsVal && typeof rawAnsVal === "object" && Object.keys(rawAnsVal).some((k) => Array.isArray(rawAnsVal[k])));
      if (idx >= 0 && idx < opts.length && opts[idx] !== undefined && String(opts[idx]).trim() !== "" && !isStepAnswer) {
        return processVal(resolveOptionAnswer(item, idx, targetLang));
      }
    }

    if (item[longLang] && typeof item[longLang] === "object") {
      if (item[longLang][fieldName] !== undefined) return processVal(maybeResolveAnswer(item[longLang][fieldName]));
      const shortF = fieldName === "question" ? "q" : fieldName === "answer" ? "a" : fieldName === "explanation" ? "exp" : "";
      if (shortF && item[longLang][shortF] !== undefined) return processVal(maybeResolveAnswer(item[longLang][shortF]));
    }

    const directKey = `${fieldName}_${targetLang}`;
    if (item[directKey] !== undefined && item[directKey] !== null) return processVal(maybeResolveAnswer(item[directKey]));

    const shortFieldName = fieldName === "question" ? "q" : fieldName === "answer" ? "a" : fieldName === "explanation" ? "exp" : "";
    if (shortFieldName) {
      const shortDirect = `${shortFieldName}_${targetLang}`;
      if (item[shortDirect] !== undefined && item[shortDirect] !== null) return processVal(maybeResolveAnswer(item[shortDirect]));
    }

    const candidateKeys = [fieldName];
    if (fieldName === "question") candidateKeys.push("q", "question_text", "headline", "title");
    if (fieldName === "answer") candidateKeys.push("a", "ans", "content", "body", "description");
    if (fieldName === "explanation") candidateKeys.push("exp", "desc", "key_points", "summary");

    for (const k of candidateKeys) {
      const val = item[k];
      if (val !== undefined && val !== null) {
        return processVal(maybeResolveAnswer(val));
      }
    }

    if (fieldName === "answer") {
      const idx = Number.isInteger(item.answer) ? item.answer
                   : Number.isInteger(item.correct) ? item.correct
                   : Number.isInteger(item.correct_index) ? item.correct_index
                   : -1;
      if (idx >= 0) {
        const opts = getOptionsList(item, targetLang);
        if (opts[idx] !== undefined) return processVal(resolveOptionAnswer(item, idx, targetLang));
      }
    }

    const asKey = `${fieldName}_as`;
    const enKey = `${fieldName}_en`;
    if (item[asKey] !== undefined && item[asKey] !== null) return processVal(item[asKey]);
    if (item[enKey] !== undefined && item[enKey] !== null) return processVal(item[enKey]);

    return "";
  }

  function localizeContent(obj, forcedLang) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    if (Array.isArray(obj)) return obj.join("\n");
    const targetLang = forcedLang || ((state.mock && state.mock.testLang) ? state.mock.testLang : state.lang);
    const val = obj[targetLang] || obj.as || obj.en || "";
    return Array.isArray(val) ? val.join("\n") : String(val);
  }

  function getOptionsList(item, forcedLang) {
    if (!item) return [];
    const targetLang = forcedLang || ((state.mock && state.mock.testLang) ? state.mock.testLang : state.lang);
    const longLang = targetLang === "en" ? "english" : "assamese";

    if (item[longLang] && Array.isArray(item[longLang].options)) {
      return item[longLang].options.map(String);
    }

    if (item.options && typeof item.options === "object" && !Array.isArray(item.options)) {
      const optArr = item.options[targetLang] || item.options.as || item.options.en;
      if (Array.isArray(optArr)) return optArr.map(String);
    }

    if (Array.isArray(item.options) && item.options.length) {
      return item.options.map(opt => {
        if (typeof opt === "string") return opt;
        if (typeof opt === "object" && opt !== null) return opt[targetLang] || opt.as || opt.en || "";
        return String(opt);
      });
    }

    const directOpts = item[`options_${targetLang}`];
    if (Array.isArray(directOpts) && directOpts.length) return directOpts.map(String);
    if (Array.isArray(item.options_as) && item.options_as.length) return item.options_as.map(String);
    if (Array.isArray(item.options_en) && item.options_en.length) return item.options_en.map(String);

    return [];
  }

  /* Resolve a stored answer (option letter like "A" / "b)" or a 0-based
     option index) into a readable "letter + option text" form, e.g.
     "(B) 7.2 days". Non-option answers (plain text, arrays, localized
     objects) are returned untouched so normal Q&A content is unaffected. */
  function resolveOptionAnswer(item, rawVal, forcedLang) {
    const opts = getOptionsList(item, forcedLang);
    if (!opts || !opts.length) return rawVal;

    const letters = "ABCDEFGHIJ";
    let idx = -1;

    if (Number.isInteger(rawVal)) {
      idx = rawVal;
    } else if (typeof rawVal === "string") {
      const m = /^[\(\[]?\s*([a-jA-J])\s*[\)\]]?[.)]?$/.exec(rawVal.trim());
      if (m) idx = letters.indexOf(m[1].toUpperCase());
    }

    if (idx < 0 || idx >= opts.length) return rawVal;

    const letter = letters[idx] || "";
    const optText = opts[idx];
    if (optText === undefined || optText === null || String(optText).trim() === "") {
      return letter || rawVal;
    }
    return letter ? `(${letter}) ${optText}` : String(optText);
  }

  /* Detect the 0-based correct option index from any of the common keys
     (an integer index, or a letter such as "a" / "(B)"). Returns -1 when
     no usable option key is present. */
  function getCorrectOptionIndex(item) {
    if (!item) return -1;
    const candidates = [item.correct, item.correct_index, item.answer, item.a];
    for (const c of candidates) {
      if (Number.isInteger(c)) return c;
      if (typeof c === "string") {
        const m = /^[\(\[]?\s*([a-jA-J])\s*[\)\]]?[.)]?$/.exec(c.trim());
        if (m) return "ABCDEFGHIJ".indexOf(m[1].toUpperCase());
      }
    }
    return -1;
  }

  /* ================= Visual media support (figures, shapes & data tables) =================
     Reasoning questions (esp. non-verbal reasoning) often carry a picture or a
     diagram instead of plain text: image analogy, image classification, venn
     diagrams, mirror/water images, figure series, counting of figures, shape
     construction, and data-table based puzzles. A question may provide:

       item.fig          -> trusted HTML (usually an inline <svg> shape diagram or
                             an <img src="...">) shown under the question text.
       item.table        -> structured data table { head?: [...], rows: [[...]],
                             caption?: {...} } rendered as a real HTML table.
       option.fig        -> a figure attached to an individual option (used when
                             the choices themselves are pictures/shapes).

   All SVG / image content is authored by the site owner (not end users); the
   sanitizer below still strips script tags & event handlers as a safety net. */

  function sanitizeMedia(html) {
    if (html == null) return "";
    return String(html)
      .replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi, "")
      .replace(/<\s*script[\s\S]*$/gi, "")
      .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
      .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
      .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
      .replace(/javascript\s*:/gi, "");
  }

  function tableBlockHTML(tbl) {
    if (!tbl) return "";
    const obj = tbl && typeof tbl === "object" && !Array.isArray(tbl) ? tbl : { rows: tbl };
    const head = Array.isArray(obj.head) ? obj.head : (Array.isArray(obj.headers) ? obj.headers : []);
    const rows = Array.isArray(obj.rows) ? obj.rows : [];
    if (!head.length && !rows.length) return "";
    const cellHTML = (v) => (v === undefined || v === null ? "" : formatMath(localizeContent(v)));
    const cap = obj.caption ? `<div class="nv-table-cap">${escapeHtml(localizeContent(obj.caption))}</div>` : "";
    return `
      <div class="nv-table-wrap">${cap}
        <table class="nv-table">
          ${head.length ? `<thead><tr>${head.map((h) => `<th>${cellHTML(h)}</th>`).join("")}</tr></thead>` : ""}
          <tbody>${rows.map((r) => `<tr>${(Array.isArray(r) ? r : []).map((td) => `<td>${cellHTML(td)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>
      </div>`;
  }

  /* Block of media attached to one question (figure + optional data table). */
  function mediaBlock(item) {
    if (!item) return "";
    const parts = [];
    if (item.fig) parts.push(`<div class="nv-media">${sanitizeMedia(item.fig)}</div>`);
    if (item.table) parts.push(tableBlockHTML(item.table));
    return parts.join("");
  }

  /* Detect whether the options of a question are picture/shape choices. */
  function figureOptions(item) {
    if (!item || !Array.isArray(item.options)) return null;
    if (!item.options.some((o) => o && typeof o === "object" && o.fig)) return null;
    return item.options.map((o, i) => {
      const letters = "ABCDEFGHIJ";
      const letter = o && typeof o === "object" && o.option ? String(o.option) : letters[i] || "";
      if (!o || typeof o !== "object") return { letter, fig: "", text: String(o || "") };
      return { letter, fig: sanitizeMedia(o.fig || ""), text: localizeContent(o) || "" };
    });
  }

  /* Option grid for picture/shape choices (each option = a labelled figure). */
  function figureOptionsHTML(item, { compact } = {}) {
    const fops = figureOptions(item);
    if (!fops) return "";
    return `
      <div class="nv-fig-grid${compact ? " nv-fig-grid-compact" : ""}">
        ${fops.map((o) => `
          <div class="nv-fig-item">
            <div class="nv-fig-key">(${o.letter})</div>
            <div class="nv-fig-box">${o.fig || (o.text ? `<span class="nv-fig-textonly">${formatMath(o.text)}</span>` : "")}</div>
            ${o.fig && o.text ? `<div class="nv-fig-cap">${formatMath(o.text)}</div>` : ""}
          </div>`).join("")}
      </div>`;
  }

  /* ================= Pure White High-Contrast Stylish Footer ================= */

  /* Mock-test option helpers (option text + optional figure). */
  function mockOptText(opt) {
    if (opt == null) return "";
    return typeof opt === "object" ? localizeContent(opt) : String(opt);
  }
  function mockOptFig(opt) {
    return opt && typeof opt === "object" && typeof opt.fig === "string" ? sanitizeMedia(opt.fig) : "";
  }
  function renderDynamicFooter() {
    const footerContainer = $("footer.site-footer") || $("footer");
    if (!footerContainer) return;

    const isAs = state.uiLang === "as";
    footerContainer.innerHTML = `
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
              ${isAs ? "অসমৰ সৰ্ববৃহৎ দ্বিভাষিক প্ৰতিযোগিতামূলক পৰীক্ষাৰ প্ৰস্তুতি মঞ্চ। ADRE, অসম আৰক্ষী, APSC আদি পৰীক্ষাৰ বিনামূলীয়া সমল।" : "Assam's premier bilingual competitive exam preparation portal. Free study notes, mock tests and previous papers."}
            </p>
          </div>
          
          <div style="display:flex; gap:40px; flex-wrap:wrap;">
            <div style="text-align:left;">
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#ffffff; display:block; margin-bottom:12px;">${isAs ? "দ্ৰুত লিংক" : "Quick Links"}</span>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
                <li><a href="/mock-test" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "মক টেষ্ট" : "Mock Test"}</a></li>
                <li><a href="/category/articles" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "প্ৰবন্ধসমূহ" : "Articles"}</a></li>
                <li><a href="/previous-year" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "বিগত বৰ্ষৰ প্ৰশ্ন" : "Previous Papers"}</a></li>
                <li><a href="/ebooks" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "ই-বুক" : "E-Books"}</a></li>
                <li><a href="/downloads" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "নোটসমূহ ডাউনল'ড" : "Download Notes"}</a></li>
                <li><a href="/download-app" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "এপ ডাউনলোড" : "Download App"}</a></li>
                <li><a href="/submit" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "প্ৰশ্ন প্ৰেৰণ কৰক" : "Submit Q&A"}</a></li>
              </ul>
            </div>

            <div style="text-align:left;">
              <span style="font-size:0.78rem; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#ffffff; display:block; margin-bottom:12px;">${isAs ? "আইনী নীতি" : "Legal & Info"}</span>
              <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px; font-size:0.86rem;">
                <li><a href="/about" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "আমাৰ বিষয়ে" : "About Us"}</a></li>
                <li><a href="/contact" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "যোগাযোগ কৰক" : "Contact Us"}</a></li>
                <li><a href="/privacy" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "গোপনীয়তা নীতি" : "Privacy Policy"}</a></li>
                <li><a href="/terms" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "নীতি আৰু চৰ্তসমূহ" : "Terms & Conditions"}</a></li>
                <li><a href="/disclaimer" style="color:#ffffff; text-decoration:none; font-weight:500; transition:opacity 0.2s;">${isAs ? "দাবীত্যাগ" : "Disclaimer"}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div style="padding-top:16px; font-size:0.82rem; color:#f8fafc; display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; align-items:center;">
          <span>© ${new Date().getFullYear()} <strong style="color:#ffffff;">axomexam.in</strong>. All Rights Reserved.</span>
          <span style="color:#f8fafc;">Made for Assam Competitive Aspirants</span>
        </div>
      </div>
    `;
  }

  function applyStaticI18n() {
    const searchEl = $("#master-search");
    if (searchEl) searchEl.placeholder = t("search.placeholder");
    $$("[aria-label]").forEach((el) => {
      const k = el.getAttribute("data-aria-i18n");
      if (k) el.setAttribute("aria-label", t(k));
    });
    renderDynamicFooter();
  }

  /* Global UI Language Toggle */
  function initGlobalLangToggle() {
    const deskTheme = document.querySelector(".header-center .theme-toggle") || document.querySelector(".site-header .theme-toggle");
    if (deskTheme && !document.querySelector(".desktop-lang-toggle")) {
      const dWrap = document.createElement("div");
      dWrap.className = "desktop-lang-toggle";
      dWrap.style.cssText = "display:inline-flex;align-items:center;background:var(--bg-subtle,#f1f5f9);border:1px solid var(--border,#e2e8f0);border-radius:20px;padding:2px;margin-right:8px;";
      dWrap.innerHTML = `
        <button type="button" class="glang-btn ${state.uiLang === "en" ? "active" : ""}" data-glang="en" style="border:none;background:${state.uiLang === "en" ? "var(--primary,#0ea5e9)" : "transparent"};color:${state.uiLang === "en" ? "#fff" : "var(--ink-soft,#64748b)"};padding:3px 9px;border-radius:14px;cursor:pointer;font-size:0.75rem;font-weight:700;">EN</button>
        <button type="button" class="glang-btn ${state.uiLang === "as" ? "active" : ""}" data-glang="as" style="border:none;background:${state.uiLang === "as" ? "var(--primary,#0ea5e9)" : "transparent"};color:${state.uiLang === "as" ? "#fff" : "var(--ink-soft,#64748b)"};padding:3px 9px;border-radius:14px;cursor:pointer;font-size:0.75rem;font-weight:700;">অসমীয়া</button>
      `;
      deskTheme.insertAdjacentElement("beforebegin", dWrap);
    }

    const mobileMenu = $("#mobile-menu");
    if (mobileMenu && !mobileMenu.querySelector(".mobile-lang-bar")) {
      const mBar = document.createElement("div");
      mBar.className = "mobile-lang-bar";
      mBar.style.cssText = "display:flex;justify-content:center;padding:12px 16px;border-bottom:1px solid var(--border,#e2e8f0);background:var(--bg-subtle,#f8fafc);box-sizing:border-box;";
      mBar.innerHTML = `
        <div style="display:inline-flex;background:var(--bg,#fff);border:1px solid var(--border,#cbd5e1);border-radius:20px;padding:2px;width:100%;max-width:240px;box-sizing:border-box;">
          <button type="button" class="glang-btn ${state.uiLang === "en" ? "active" : ""}" data-glang="en" style="flex:1;border:none;background:${state.uiLang === "en" ? "var(--primary,#0ea5e9)" : "transparent"};color:${state.uiLang === "en" ? "#fff" : "var(--ink-soft,#64748b)"};padding:6px 0;border-radius:14px;cursor:pointer;font-size:0.82rem;font-weight:700;text-align:center;">English</button>
          <button type="button" class="glang-btn ${state.uiLang === "as" ? "active" : ""}" data-glang="as" style="flex:1;border:none;background:${state.uiLang === "as" ? "var(--primary,#0ea5e9)" : "transparent"};color:${state.uiLang === "as" ? "#fff" : "var(--ink-soft,#64748b)"};padding:6px 0;border-radius:14px;cursor:pointer;font-size:0.82rem;font-weight:700;text-align:center;">অসমীয়া</button>
        </div>
      `;
      mobileMenu.insertBefore(mBar, mobileMenu.firstChild);
    }

    $$(".glang-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetLang = btn.dataset.glang;
        if (state.uiLang === targetLang) return;
        state.uiLang = targetLang;
        try { localStorage.setItem("axomexam-ui-lang", targetLang); } catch (err) {}
        
        $$(".glang-btn").forEach((b) => {
          const isAct = b.dataset.glang === state.uiLang;
          b.classList.toggle("active", isAct);
          b.style.background = isAct ? "var(--primary,#0ea5e9)" : "transparent";
          b.style.color = isAct ? "#fff" : "var(--ink-soft,#64748b)";
        });

        applyStaticI18n();
        buildDesktopNav();
        buildMobileNav();
        renderRoute();
      });
    });
  }

  /* ================= Data normalization ================= */
  function normalize(data) {
    const cats = [];
    const topicMap = {};
    const topicIndex = [];

    const pushTopic = (topic, cat, sub, section) => {
      const path = [cat.id, sub ? sub.id : "", section ? section.id : ""]
        .filter(Boolean)
        .concat([topic.id])
        .join("/");
      const rec = {
        path,
        cat, sub, section, topic,
        title: topic.title || topic.name,
        desc: topic.description,
        tags: topic.tags || [],
        nQuestions: (topic.questions || []).length,
        pdf: topic.pdf || null,
        popularity: Number(topic.popularity) || 0,
      };
      topicMap[path] = rec;
      topicIndex.push(rec);
    };

    const walkCategory = (cat) => {
      cat.name = cat.name || { en: cat.id, as: cat.id };
      cat.description = cat.description || {};
      const subs = cat.subcategories || [];
      if (subs.length) {
        subs.forEach((sub) => {
          sub.name = sub.name || { en: sub.id, as: sub.id };
          const sections = sub.sections || [];
          if (sections.length) {
            sections.forEach((sec) => {
              sec.name = sec.name || { en: sec.id, as: sec.id };
              (sec.topics || []).forEach((tp) => pushTopic(tp, cat, sub, sec));
            });
          } else if ((sub.topics || []).length) {
            (sub.topics || []).forEach((tp) => pushTopic(tp, cat, sub, null));
          } else {
            const leaf = {
              id: sub.id,
              name: sub.name,
              description: sub.description,
              popularity: Number(sub.popularity) || 0
            };
            const path = [cat.id, sub.id].join("/");
            const rec = {
              path, cat, sub, section: null, topic: leaf,
              title: leaf.name, desc: leaf.description, tags: [],
              nQuestions: 0, pdf: null, popularity: leaf.popularity
            };
            topicMap[path] = rec;
            topicIndex.push(rec);
          }
        });
      } else {
        const sections = cat.sections || [];
        if (sections.length) {
          sections.forEach((sec) => {
            sec.name = sec.name || { en: sec.id, as: sec.id };
            (sec.topics || []).forEach((tp) => pushTopic(tp, cat, null, sec));
          });
        } else {
          (cat.topics || []).forEach((tp) => pushTopic(tp, cat, null, null));
        }
      }
      cats.push(cat);
    };

    (data.categories || []).forEach(walkCategory);
    return { categories: cats, topicMap, topicIndex };
  }

  /* Apply precomputed counts from data/counts.json so the UI shows exact
     numbers without downloading every topic / exam file on page load.
     Records missing from the manifest keep their previous value. */
  function applyPrecomputedCounts(counts) {
    if (!counts || typeof counts !== "object") return;
    state.counts = counts;

    const topicCounts = counts.topicCounts || {};
    state.topicIndex.forEach((rec) => {
      if (Object.prototype.hasOwnProperty.call(topicCounts, rec.path)) {
        rec.nQuestions = Number(topicCounts[rec.path]) || 0;
      }
    });

    if (typeof counts.examsTotal === "number") {
      state.examQuestionTotal = counts.examsTotal;
      state.examTotalLoaded = true;
    }
  }

  /* ================= Navigation helpers ================= */
  function catColor(id) {
    const c = state.categories.find((x) => x.id === id);
    return (c && c.color) || (typeof CATEGORY_COLORS !== "undefined" ? (CATEGORY_COLORS[id] || CATEGORY_COLORS.default) : "#0ea5e9");
  }
  function catIcon(id) {
    const c = state.categories.find((x) => x.id === id);
    return (c && c.icon) || (typeof CATEGORY_ICONS !== "undefined" ? CATEGORY_ICONS[id] : "A") || "A";
  }
  function catIconHTML(id) {
    const svg = typeof CATEGORY_ICON_SVG !== "undefined" && CATEGORY_ICON_SVG[id];
    if (svg) return `<span class="cat-svg">${svg}</span>`;
    return escapeHtml(catIcon(id));
  }

  function topicIconHTML(topicId, catId) {
    const id = String(topicId || "");
    if (typeof TOPIC_ICON_RULES !== "undefined") {
      for (const [re, svg] of TOPIC_ICON_RULES) {
        if (re.test(id)) return `<span class="cat-svg">${svg}</span>`;
      }
    }
    return catIconHTML(catId);
  }

  function countTopics(cat) {
    return state.topicIndex.filter((r) => r.cat.id === cat.id).length;
  }

  /* Home grid order — keep the Articles card directly below Computer Awareness */
  function homeCategoriesOrder() {
    const list = state.categories.slice();
    const artIdx = list.findIndex((c) => c.id === "articles");
    if (artIdx !== -1) {
      const [art] = list.splice(artIdx, 1);
      const pos = list.findIndex((c) => c.id === "computer");
      if (pos !== -1) list.splice(pos + 1, 0, art);
      else list.push(art);
    }
    return list;
  }

  function navLinkHTML(item, activePath) {
    const kids = item.subcategories || item.sections || [];
    const hasKids = !!(kids && kids.length);
    const isActive = activePath && activePath.split("/")[0] === item.id;
    return `
      <li class="${hasKids ? "has-drop" : ""}">
        <a class="nav-link ${isActive ? "active" : ""}" href="/category/${item.id}">
          <span>${escapeHtml(localized(item.name))}</span>
          ${hasKids ? '<span class="caret"></span>' : ""}
        </a>
        ${hasKids ? renderDesktopDrop(item, activePath) : ""}
      </li>`;
  }

  function renderDesktopDrop(item, activePath) {
    const kids = item.subcategories || item.sections || [];
    return `
      <div class="dropdown">
        ${kids.map((sub) => {
          const grand = sub.sections;
          if (grand && grand.length) {
            return `
              <div class="has-drop">
                <a href="/category/${item.id}/${sub.id}">
                  <span>${escapeHtml(localized(sub.name))}</span><span class="d-caret"></span>
                </a>
                <div class="dropdown">
                  ${grand.map((sec) => `
                    <a href="/category/${item.id}/${sub.id}/${sec.id}">
                      <span>${escapeHtml(localized(sec.name))}</span>
                    </a>`).join("")}
                </div>
              </div>`;
          }
          const isLeaf = !(sub.topics && sub.topics.length);
          const href = isLeaf ? `/topic/${item.id}/${sub.id}` : `/category/${item.id}/${sub.id}`;
          return `<a href="${href}">${escapeHtml(localized(sub.name))}</a>`;
        }).join("")}
      </div>`;
  }

  const FEATURED_IDS = ["gk", "science", "math", "history", "reasoning"];

  function buildDesktopNav() {
    const list = $("#nav-list");
    if (!list) return;
    const activePath = currentPath();
    const featured = state.categories.filter((c) => FEATURED_IDS.includes(c.id));
    const rest = state.categories.filter((c) => !FEATURED_IDS.includes(c.id));
    const items = [];

    items.push(extraLink("/", t("nav.home"), activePath));
    featured.forEach((c) => items.push(navLinkHTML(c, activePath)));
    items.push(extraLink("/mock-test", t("nav.mock"), activePath));
    items.push(extraLink("/exams", t("nav.exams"), activePath));
    items.push(extraLink("/downloads", t("nav.downloads"), activePath));
    items.push(moreDropdownHTML(rest, activePath));
    list.innerHTML = items.join("");
  }

  function extraLink(href, label, activePath) {
    const on = activePath.split("/")[0] === href.replace(/^\//, "");
    return `<li><a class="nav-link ${on ? "active" : ""}" href="${href}">${escapeHtml(label)}</a></li>`;
  }

  function moreDropdownHTML(rest, activePath) {
    const root = activePath.split("/")[0];
    const isInside = rest.some((c) => c.id === root) || ["submit", "previous-year", "ebooks", "exams", "download-app", "contact", "about", "privacy", "privacy-policy", "terms", "disclaimer"].includes(root);

    const links = rest.map((c) => {
      const on = root === c.id;
      return `<a class="${on ? "active" : ""}" href="/category/${c.id}">${escapeHtml(localized(c.name))}</a>`;
    });

    /* E-Books and Your Exams sit directly below the Articles link inside "More ▸" */
    const ebookOn = root === "ebooks";
    const ebookLink = `
      <a class="ebook-nav-link ${ebookOn ? "active" : ""}" href="/ebooks">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        <span>${escapeHtml(t("nav.ebooks"))}</span>
      </a>`;
    const examsOn = root === "exams";
    const examsLink = `
      <a class="ebook-nav-link ${examsOn ? "active" : ""}" href="/exams">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        <span>${escapeHtml(t("nav.exams"))}</span>
      </a>`;
    const artPos = rest.findIndex((c) => c.id === "articles");
    if (artPos !== -1) links.splice(artPos + 1, 0, ebookLink, examsLink);
    else links.push(ebookLink, examsLink);

    const catLinks = links.join("");

    const extraLinks = [
      ["/previous-year", t("nav.previousYear")],
      ["/submit", t("nav.submit")],
      ["/contact", "Contact Us"],
      ["/download-app", t("nav.downloadApp")]
    ].map(([href, label]) => {
      const on = root === href.replace(/^\//, "");
      return `<a class="${on ? "active" : ""}" href="${href}">${escapeHtml(label)}</a>`;
    }).join("");

    return `
      <li class="has-drop">
        <a class="nav-link ${isInside ? "active" : ""}" href="/categories">
          <span>${escapeHtml(t("nav.more"))}</span><span class="caret"></span>
        </a>
        <div class="dropdown">
          ${catLinks ? `<div class="d-label">${escapeHtml(t("nav.categories"))}</div>${catLinks}` : ""}
          <div class="d-label">${escapeHtml(t("mmenu.extra"))}</div>
          ${extraLinks}
        </div>
      </li>`;
  }

  /* ================= Mobile Menu Builder (Fixed Order) ================= */
  function buildMobileNav() {
    const nav = $("#mobile-nav");
    if (!nav) return;
    const activePath = currentPath();
    const orderedCats = homeCategoriesOrder();
    /* Mobile-only order: keep Articles directly ABOVE Computer Awareness */
    const mobileCats = orderedCats.slice();
    const mArtIdx = mobileCats.findIndex((c) => c.id === "articles");
    const mCompIdx = mobileCats.findIndex((c) => c.id === "computer");
    if (mArtIdx !== -1 && mCompIdx !== -1 && mArtIdx !== mCompIdx - 1) {
      const [art] = mobileCats.splice(mArtIdx, 1);
      mobileCats.splice(mobileCats.findIndex((c) => c.id === "computer"), 0, art);
    }

    const catParts = mobileCats.map((cat) => {
      const kids = cat.subcategories || cat.sections || [];
      return `
        <li>
          <div class="m-row">
            <a class="m-item ${activePath.split("/")[0] === cat.id ? "active" : ""}" href="/category/${cat.id}">
              ${escapeHtml(localized(cat.name))}
            </a>
            ${kids.length ? `<button class="m-toggle" data-toggle data-target="${cat.id}" aria-label="toggle"><span class="caret"></span></button>` : ""}
          </div>
          ${kids.length ? `<div class="m-sub" id="msub-${cat.id}">${kids.map((sub) => {
            const grand = sub.sections;
            if (grand && grand.length) {
              return `
                <div class="m-row">
                  <a class="m-item" href="/category/${cat.id}/${sub.id}"><span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(sub.name))}</span></a>
                  <button class="m-toggle" data-toggle data-target="${cat.id}-${sub.id}" aria-label="toggle"><span class="caret"></span></button>
                </div>
                <div class="m-sub m-nested" id="msub-${cat.id}-${sub.id}">
                  ${grand.map((sec) => `<a href="/category/${cat.id}/${sub.id}/${sec.id}"><span style="font-weight:600; font-size:0.87rem; color:var(--ink-soft,#475569);">${escapeHtml(localized(sec.name))}</span></a>`).join("")}
                </div>`;
            }
            const isLeaf = !(sub.topics && sub.topics.length);
            const href = isLeaf ? `/topic/${cat.id}/${sub.id}` : `/category/${cat.id}/${sub.id}`;
            return `<a href="${href}"><span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(sub.name))}</span></a>`;
          }).join("")}</div>` : ""}
        </li>`;
    });

    const mBtnStyle = `display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;background:var(--bg-subtle,#f8fafc);color:var(--ink,#0f172a);font-weight:700;border:1px solid var(--border,#e2e8f0);box-shadow:0 1px 3px rgba(0,0,0,0.03);`;

    const ebookItem = `
      <li class="m-ebook" style="margin-top:8px;">
        <a class="m-item ${activePath === "ebooks" ? "active" : ""}" href="/ebooks" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
          ${escapeHtml(t("nav.ebooks"))}
        </a>
      </li>`;

    const examItem = `
      <li class="m-exam" style="margin-top:8px;">
        <a class="m-item ${activePath === "exams" ? "active" : ""}" href="/exams" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          ${escapeHtml(t("nav.exams"))}
        </a>
      </li>`;

    const downloadItem = `
      <li class="m-download" style="margin-top:8px;">
        <a class="m-item ${activePath === "downloads" ? "active" : ""}" href="/downloads" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>
          ${escapeHtml(t("nav.downloads"))}
        </a>
      </li>`;

    const prevYearItem = `
      <li class="m-py" style="margin-top:6px;">
        <a class="m-item ${activePath === "previous-year" ? "active" : ""}" href="/previous-year" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h6"/><path d="M9 16h4"/><path d="M7 3v3"/><path d="M17 3v3"/><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 9h8a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/></svg>
          ${escapeHtml(t("nav.previousYear"))}
        </a>
      </li>`;

    const submitItem = `
      <li class="m-submit" style="margin-top:6px;">
        <a class="m-item ${activePath === "submit" ? "active" : ""}" href="/submit" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          ${escapeHtml(t("nav.submit"))}
        </a>
      </li>`;

    const contactItem = `
      <li class="m-contact" style="margin-top:6px;margin-bottom:8px;">
        <a class="m-item ${activePath === "contact" ? "active" : ""}" href="/contact" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Contact Us
        </a>
      </li>`;

    const downloadAppItem = `
      <li class="m-download-app" style="margin-bottom:8px;">
        <a class="m-item ${activePath === "download-app" ? "active" : ""}" href="/download-app" style="${mBtnStyle}">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2.2"/><path d="M12 7v7"/><path d="m9.5 11.5 2.5 2.5 2.5-2.5"/></svg>
          ${escapeHtml(t("nav.downloadApp"))}
        </a>
      </li>`;

    catParts.push(examItem, ebookItem, downloadAppItem, downloadItem, prevYearItem, submitItem, contactItem);

    nav.innerHTML = catParts.join("");

    $$("[data-toggle]", nav).forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = $(`#msub-${btn.dataset.target}`);
        if (!target) return;
        target.classList.toggle("open");
        btn.classList.toggle("open");
      });
    });
  }

  /* ================= Routing ================= */
  function parsePath() {
    let p = window.location.pathname.replace(/^\/|\/$/g, "");
    if (window.location.search && window.location.search.startsWith("?/")) {
      p = window.location.search.slice(2).replace(/~and~/g, "&");
      window.history.replaceState(null, null, "/" + p);
    }
    return p.split("/").filter(Boolean);
  }

  function currentPath() {
    return parsePath().filter((s) => s !== "category" && s !== "topic" && s !== "mock-test").join("/");
  }

  function navigateTo(url) {
    window.history.pushState(null, null, url);
    buildDesktopNav();
    buildMobileNav();
    renderRoute();
  }

  function resetScroll() {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = prev;
  }

  /* Keep <title>, meta description and canonical unique per route for SEO */
  function updateSEO() {
    try {
      const segs = parsePath();
      let title = "axomexam | Assam Exam Preparation – Mock Tests, Previous Papers & PDF Notes";
      let desc = "Free bilingual (Assamese & English) Q&A, mock tests and PDF notes for Assam exam, ADRE, APSC and Assam Police preparation.";

      if (segs[0] === "topic") {
        const rec = state.topicMap[segs.slice(1).join("/")];
        if (rec) {
          const t = localized(rec.topic.title || rec.title);
          title = t ? t + " | axomexam" : title;
          const d = localized(rec.topic.description || rec.desc);
          if (d) desc = d;
        }
      } else if (segs[0] === "category" && segs[1]) {
        const cat = state.categories.find((c) => c.id === segs[1]);
        if (cat) {
          const n = localized(cat.name);
          title = n ? n + " | axomexam" : title;
          const d = localized(cat.description);
          if (d) desc = d;
        }
      } else if (segs[0] === "mock-test") {
        const cat = state.categories.find((c) => c.id === segs[1]);
        const n = cat ? localized(cat.name) : "";
        title = (n ? n + " " : "") + "Mock Test | axomexam";
      } else if (segs[0] === "previous-year") {
        title = "Previous Year Question Papers | axomexam";
      } else if (segs[0] === "trending") {
        title = "Trending Topics | axomexam";
      } else if (segs[0] === "downloads") {
        title = "Download Free PDF Notes | axomexam";
      } else if (segs[0] === "download-app") {
        title = "Download axomexam App (APK) | axomexam";
        desc = "Download the free axomexam Android app (APK, v1.9) — mock tests, bilingual Q&A practice, e-books and previous year papers for ADRE, APSC, Assam Police, SSC & Railway exams.";
      } else if (segs[0] === "ebooks") {
        title = segs[1] ? "Read E-Book Online | axomexam" : "E-Books Library | axomexam";
        desc = "Free online e-books for Assam competitive exams (ADRE, APSC, Assam Police) — Assam History, Indian History, Art & Culture, Polity, Economy and Geography. Read online in English and Assamese, no PDF download.";
      } else if (segs[0] === "exams") {
        const exam = (state.exams || []).find((e) => e.id === segs[1]);
        const exName = exam ? localized(exam.title) : "";
        const sec = exam && segs[2] ? (exam.sections || []).find((s) => s.id === segs[2]) : null;
        const secName = sec ? localized(sec.title) : "";
        const sub = sec && segs[3] ? (sec.subcategories || []).find((s) => s.id === segs[3]) : null;
        const subName = sub ? localized(sub.title) : "";
        if (subName) {
          title = subName + (secName ? " — " + secName : "") + " | axomexam";
          desc = "Practise " + subName + " MCQs with answers and explanations for Assam Police Constable (AB & UB) and other competitive exams in Assam.";
        } else if (secName) {
          title = secName + (exName ? " — " + exName : "") + " | axomexam";
        } else if (segs[1]) {
          title = (exName ? exName + " " : "") + "Exam Book | axomexam";
        } else {
          title = "Your Exams | axomexam";
        }
        if (!subName) desc = "Choose your exam and prepare subject-wise — syllabus, Elementary Mathematics, General English, Logical Reasoning & Mental Ability, Assam's History, Geography & Culture and General Knowledge & Current Affairs. Read online in English and Assamese, no download.";
      } else if (segs[0] === "current-affairs") {
        const slug = (segs[1] || "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        if (slug) {
          title = slug + " Current Affairs Q&A | axomexam";
          desc = "Free " + slug + " current affairs questions with explained answers in Assamese and English — updated regularly by the axomexam team.";
        } else {
          title = "Free Current Affairs Questions & Answers | axomexam";
          desc = "Free bilingual current affairs Q&A for Assam competitive exams — sports, awards, appointments, economy, environment and more, updated by the axomexam team.";
        }
      } else if (segs[0] === "categories") {
        title = "All Categories | axomexam";
      } else if (["about", "privacy", "privacy-policy", "terms", "disclaimer", "contact", "submit"].includes(segs[0])) {
        const map = { about: "About Us", privacy: "Privacy Policy", "privacy-policy": "Privacy Policy", terms: "Terms & Conditions", disclaimer: "Disclaimer", contact: "Contact Us", submit: "Submit Q&A" };
        title = (map[segs[0]] || "axomexam") + " | axomexam";
      }

      document.title = title;
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement("meta");
        m.name = "description";
        document.head.appendChild(m);
      }
      m.content = desc;

      let p = window.location.pathname;
      if (!p.endsWith("/")) p += "/";
      const link = document.querySelector('link[rel="canonical"]');
      if (link) link.href = window.location.origin + p;
    } catch (e) { }
  }

  async function renderRoute() {
    if (!state.ready) return;
    const segs = parsePath();
    const main = $("#app");
    closeMobileMenu();
    closeReadingModal();
    updateTabbar(segs);
    resetScroll();
    updateSEO();
    clearEbookProgress();

    if (segs[0] !== "mock-test" && state.mock && state.mock.timerId) {
      stopMockTimer();
      state.mock = null;
    }

    state.lang = isEnglishContent(segs) ? "en" : "as";
    document.body.setAttribute("data-lang", state.lang);

    if (segs.length === 0) return renderHome(main);
    if (segs[0] === "category") {
      const cat = state.categories.find((c) => c.id === segs[1]);
      if (!cat) return render404(main);
      if (segs.length >= 2 && segs[2]) return renderSubOrSection(main, segs);
      return renderCategoryPage(main, cat);
    }
    if (segs[0] === "topic") {
      const path = segs.slice(1).join("/");
      const rec = state.topicMap[path];
      if (!rec) return render404(main);
      return renderTopicPage(main, rec);
    }
    
    if (["about", "privacy", "privacy-policy", "terms", "disclaimer"].includes(segs[0])) {
      const pageKey = segs[0] === "privacy-policy" ? "privacy" : segs[0];
      return renderStatic(main, pageKey);
    }
    
    if (segs[0] === "contact") return renderContactPage(main);
    if (segs[0] === "trending") return renderTrendingPage(main);
    if (segs[0] === "previous-year") return renderPreviousYear(main, segs);
    if (segs[0] === "categories") return renderCategoriesPage(main);
    if (segs[0] === "search") return renderSearchPage(main);
    if (segs[0] === "downloads") return renderDownloadsPage(main);
    if (segs[0] === "download-app") return renderDownloadAppPage(main);
    if (segs[0] === "ebooks") {
      if (segs[1]) return renderEbookReaderPage(main, segs[1]);
      return renderEbooksPage(main);
    }
    if (segs[0] === "exams") {
      if (segs[1] && segs[2] && segs[3] && segs[4]) return renderExamSubSubcategoryPage(main, segs[1], segs[2], segs[3], segs[4]);
      if (segs[1] && segs[2] && segs[3]) return renderExamSubcategoryPage(main, segs[1], segs[2], segs[3]);
      if (segs[1] && segs[2]) return renderExamSectionPage(main, segs[1], segs[2]);
      if (segs[1]) return renderExamPage(main, segs[1]);
      return renderExamsPage(main);
    }
    if (segs[0] === "current-affairs") {
      if (segs[1]) return renderCurrentAffairsCategoryPage(main, segs[1]);
      return renderCurrentAffairsPage(main);
    }
    if (segs[0] === "submit") return renderSubmitPage(main);
    if (segs[0] === "mock-test") {
      return handleMockRouting(main, segs);
    }
    return render404(main);
  }

  /* ================= Homepage ================= */
  function renderHome(main) {
    const totalQuestions = state.topicIndex.reduce((a, r) => a + (r.nQuestions || 0), 0) + QUESTION_DISPLAY_BONUS + (state.examQuestionTotal || 0) + (state.caQuestionTotal || 0);
    const totalPdfs = state.topicIndex.length + (state.topicIndex.filter((r) => r.pdf).length);
    const trending = trendingTopics(state.topicIndex).slice(0, typeof CONFIG !== "undefined" ? CONFIG.TRENDING_COUNT : 6);
    const firstCat = state.categories[0]?.id || "gk";

    main.innerHTML = `
      <section class="hero reveal visible">
        <div class="hero-content">
          <a class="hero-badge" href="/mock-test">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
            ${t("hero.daily")} • ADRE 3.0 / RRB
          </a>
          <h1>${t("hero.title") || "Crack Assam Competitive Exams with Bilingual Q&A & PDF Notes"}</h1>
          <p class="sub">${t("hero.sub") || "Practice thousands of questions for Assam competitive exams and download printable PDF notes in both Assamese and English — for ADRE 3.0, APSC, Assam Police, SSC, Railway & more."}</p>
          <div class="hero-stats">
            <div class="stat"><b id="stat-total-questions">${totalQuestions.toLocaleString()}+</b><span>${t("stat.questions")}</span></div>
            <div class="stat"><b>${state.topicIndex.length}+</b><span>${t("stat.topics")}</span></div>
            <div class="stat"><b id="stat-total-pdfs">${totalPdfs}+</b><span>${t("stat.pdfs")}</span></div>
          </div>
        </div>
        ${heroVisualHTML()}
      </section>

      <section class="section feat-sec">
        <div class="section-head reveal">
          <div>
            <h2>${state.uiLang === "as" ? "সুবিধাসমূহ" : "Features"}</h2>
            <p class="sec-sub">${state.uiLang === "as" ? "আৰম্ভ কৰিবলৈ এটা বিকল্প বাছনি কৰক" : "Quick ways to start your preparation"}</p>
          </div>
        </div>
        <div class="feat-grid">
          <a class="feat-card reveal" href="/category/${firstCat}" style="--fc:#4f46e5">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়াকৈ অনুশীলন আৰম্ভ কৰক" : "Free Practicing"}</b><span>${state.uiLang === "as" ? "বিষয়ভিত্তিক প্ৰশ্ন অনুশীলন" : "Practice Q&A by subject"}</span></span>
          </a>
          <a class="feat-card reveal" href="/mock-test" style="--fc:#0ea5e9">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়াকৈ মক টেষ্ট দিয়ক" : "Free Mock Test"}</b><span>${state.uiLang === "as" ? "সময়বদ্ধ পৰীক্ষা-ধৰণৰ টেষ্ট" : "Timed exam-pattern tests"}</span></span>
          </a>
          <a class="feat-card reveal" href="/ebooks" style="--fc:#f59e0b">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া ই-বুক" : "Free eBooks"}</b><span>${state.uiLang === "as" ? "যিকোনো সময়ত অনলাইন পঢ়ক" : "Read online, anytime"}</span></span>
          </a>
          <a class="feat-card reveal" href="/exams" style="--fc:#8b5cf6">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া পৰীক্ষা-বহী" : "Free Exam Books"}</b><span>${state.uiLang === "as" ? "পৰীক্ষা-ভিত্তিক প্ৰস্তুতি" : "Exam-wise preparation"}</span></span>
          </a>
          <a class="feat-card reveal" href="/previous-year" style="--fc:#10b981">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "পূৰ্ববৰ্তী বছৰৰ প্ৰশ্ন" : "Previous Year Questions"}</b><span>${state.uiLang === "as" ? "পূৰ্বৰ প্ৰশ্নপত্ৰসমূহ" : "Solved past papers"}</span></span>
          </a>
          <a class="feat-card reveal" href="/category/articles" style="--fc:#e11d48">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া সবিশেষ প্ৰবন্ধ" : "Free Detailed Articles"}</b><span>${state.uiLang === "as" ? "অধ্যয়ন প্ৰবন্ধ" : "Study articles"}</span></span>
          </a>
          <a class="feat-card reveal" href="/downloads" style="--fc:#0d9488">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া PDF টোকা" : "Free PDF Notes"}</b><span>${state.uiLang === "as" ? "প্ৰিন্ট কৰিব পৰা PDF নোট" : "Printable PDF notes"}</span></span>
          </a>
          <a class="feat-card reveal" href="/current-affairs" style="--fc:#ef4444">
            <span class="feat-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/><path d="M8 16h3"/></svg></span>
            <span class="feat-body"><b>${state.uiLang === "as" ? "বিনামূলীয়া চলিত ঘটনাৱলী" : "Free Current Affairs"}</b><span>${state.uiLang === "as" ? "দৈনিক প্ৰশ্ন আৰু ব্যাখ্যা" : "Updated Q&A with answers"}</span></span>
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
            <h2>${t("home.categories")}</h2>
            <p class="sec-sub">${t("home.categories.sub")}</p>
          </div>
        </div>
        <div class="cat-grid">
          ${homeCategoriesOrder().map((c, i) => {
            const color = catColor(c.id);
            return `
              <a class="cat-card reveal" href="/category/${c.id}" data-cat="${c.id}" style="--cat:${color}" data-delay="${i * 60}">
                <span class="cat-ico">${catIconHTML(c.id)}</span>
                <span class="cat-meta">
                  <b>${escapeHtml(localized(c.name))}</b>
                  <span>${c.id === "articles" ? (state.uiLang === "as" ? "প্ৰবন্ধসমূহ" : "Articles") : `<span class="cat-count">${countTopics(c)}</span> ${c.id === "study-guides" ? (state.uiLang === "as" ? "টা গাইড" : "Guides") : t("cat.topics")}`}</span>
                </span>
              </a>`;
          }).join("")}
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
            <h2>${t("home.trending")}</h2>
            <p class="sec-sub">${t("home.trending.sub")}</p>
          </div>
          <a class="see-all" href="/trending">${t("see.all")}</a>
        </div>
        <div class="trend-grid">
          ${trending.map((r, i) => `
            <a class="topic-card reveal" href="/topic/${r.path}" style="--cat:${catColor(r.cat.id)}" data-delay="${i * 50}">
              <span class="topic-ico">${topicIconHTML(r.topic.id, r.cat.id)}</span>
              <span class="rank">${i + 1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(r.title))}</span>
                <span id="trend-count-${r.path.replace(/\//g, '-')}">${escapeHtml(localized(r.cat.name))} • ${r.cat.id === "study-guides" ? (state.uiLang === "as" ? "পঢ়ক →" : "Read Guide →") : `${r.nQuestions || 0} ${t("topic.questions")}`}</span>
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
      </section>`;

    const seoBtn = $("#seo-read-more-btn");
    if (seoBtn) {
      seoBtn.addEventListener("click", () => {
        const box = $("#seo-read-more");
        if (!box) return;
        const expanded = box.classList.contains("expanded");
        box.classList.toggle("expanded", !expanded);
        seoBtn.textContent = expanded ? "Read More" : "Read Less";
      });
    }

    observeReveals();
    loadExamQuestionTotal();
    loadCurrentAffairsTotal();
  }

  function heroVisualHTML() {
    const examName = (typeof CONFIG !== "undefined" && CONFIG.MOCK && CONFIG.MOCK.EXAM_NAME) || "ADRE / Assam Police";
    const target = new Date((typeof CONFIG !== "undefined" && CONFIG.MOCK && CONFIG.MOCK.EXAM_DATE) || "2026-12-31").getTime();
    const now = Date.now();
    const daysLeft = target > now ? Math.max(0, Math.ceil((target - now) / 86400000)) : 0;
    const fraction = target > now ? Math.min(1, daysLeft / 365) : 0;
    const C = 314;
    const offset = C * (1 - fraction);
    return `
      <div class="hero-visual">
        <div class="countdown-ring">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle class="ring-bg" cx="60" cy="60" r="50"></circle>
            <circle class="ring-fg" cx="60" cy="60" r="50" stroke-dashoffset="${offset.toFixed(1)}"></circle>
          </svg>
          <div class="ring-center">
            <span class="ring-num">${daysLeft}</span>
            <span class="ring-label">${t("hero.days")}</span>
            <span class="ring-label">${escapeHtml(examName)}</span>
          </div>
        </div>
        <span class="float-chip c1"><span class="dot"></span>ADRE</span>
        <span class="float-chip c2"><span class="dot"></span>GK & Math</span>
        <span class="float-chip c3"><span class="dot"></span>Assam Police</span>
      </div>`;
  }

  function trendingTopics(list) {
    return list.slice().sort((a, b) => {
      if (!!a.extra !== !!b.extra) return a.extra ? -1 : 1;
      if (a.popularity !== b.popularity) return b.popularity - a.popularity;
      return (b.nQuestions || 0) - (a.nQuestions || 0);
    });
  }

  /* ================= Category page ================= */
  function renderCategoryPage(main, cat) {
    const subs = cat.subcategories || cat.sections || [];
    const directTopics = cat.topics || [];
    const isArticlesCat = cat.id === "articles";
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(cat.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(cat.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(cat.description)) || escapeHtml(localized(cat.name))}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${subs.length ? `
          <div class="sub-grid">
            ${subs.map((s, i) => {
              const isLeaf = !isArticlesCat && !(s.sections && s.sections.length) && !(s.topics && s.topics.length);
              const rec = isLeaf ? state.topicMap[`${cat.id}/${s.id}`] : null;
              const href = isArticlesCat
                ? `/category/${cat.id}/${s.id}/read`
                : (isLeaf ? `/topic/${cat.id}/${s.id}` : `/category/${cat.id}/${s.id}`);
              const meta = isArticlesCat
                ? (state.uiLang === "as" ? "প্ৰবন্ধ পঢ়ক →" : "Read Articles →")
                : isLeaf
                  ? `<span id="count-${rec ? rec.path.replace(/\//g, '-') : `${cat.id}-${s.id}`}">${rec && rec.nQuestions > 0 ? `${rec.nQuestions} ${t("topic.questions")}` : t("btn.practice")}</span>`
                  : `${(s.sections ? s.sections.length : 0) || (s.topics ? s.topics.length : 0)} ${s.sections ? t("cat.subsections") : t("cat.topics")}`;
              return `
              <a class="sub-card reveal" href="${href}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
                <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(s.name))}</span>
                  <span style="font-size:0.75rem; font-weight:${isArticlesCat ? "700" : "400"}; color:${isArticlesCat ? catColor(cat.id) : "var(--ink-soft,#64748b)"};">${meta}</span>
                </span>
              </a>`;
            }).join("")}
          </div>`
        : (directTopics.length ? topicListHTML(cat, null, null, directTopics) : emptyHTML())}
      </section>`;
    observeReveals();
    const catRecs = state.topicIndex.filter((r) => r.cat && r.cat.id === cat.id);
    const catQuestions = catRecs.reduce((a, r) => a + (r.nQuestions || 0), 0);
    const catItems = subs.map((s) => ({
      name: localized(s.name),
      count: (s.sections && s.sections.length) || (s.topics && s.topics.length) || 0
    }));
    autoSeo(main, {
      id: cat.id,
      name: localized(cat.name),
      count: subs.length,
      total: catQuestions,
      h2: localized(cat.name) + " preparation for Assam exams",
      items: catItems
    });
  }

  function renderSubOrSection(main, segs) {
    const cat = state.categories.find((c) => c.id === segs[1]);
    const sub = (cat.subcategories || cat.sections || []).find((s) => s.id === segs[2]);
    if (!sub) return render404(main);

    /* Articles category — read-only rich articles, never in Downloads */
    if (cat.id === "articles") {
      return renderArticleReader(main, cat, sub);
    }

    if (segs[3]) {
      const sec = (sub.sections || []).find((s) => s.id === segs[3]);
      if (!sec) return render404(main);
      return renderSectionPage(main, cat, sub, sec);
    }

    if (!(sub.sections && sub.sections.length) && !(sub.topics && sub.topics.length)) {
      const rec = state.topicMap[`${cat.id}/${sub.id}`];
      if (rec) return renderTopicPage(main, rec);
    }

    const secs = sub.sections;
    const topics = sub.topics;
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${cat.id}">${escapeHtml(localized(cat.name))}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(sub.description)) || ""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${secs && secs.length ? `
          <div class="sub-grid">
            ${secs.map((s, i) => `
              <a class="sub-card reveal" href="/category/${cat.id}/${sub.id}/${s.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
                <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(s.name))}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${(s.topics || []).length} ${t("cat.topics")}</span>
                </span>
              </a>`).join("")}
          </div>` : (topics && topics.length ? topicListHTML(cat, sub, null, topics) : emptyHTML())}
      </section>`;
    observeReveals();
    const subRecs = state.topicIndex.filter((r) => r.cat && r.cat.id === cat.id && r.sub && r.sub.id === sub.id);
    const subQuestions = subRecs.reduce((a, r) => a + (r.nQuestions || 0), 0);
    const subItems = (secs && secs.length ? secs : (topics || [])).map((s) => ({
      name: localized(s.name),
      count: (s.topics && s.topics.length) || 0
    }));
    autoSeo(main, {
      id: sub.id,
      name: localized(sub.name),
      count: subItems.length,
      total: subQuestions,
      h2: localized(sub.name) + " - topics and practice questions",
      items: subItems
    });
  }

  function renderSectionPage(main, cat, sub, sec) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${cat.id}">${escapeHtml(localized(cat.name))}</a>
          <span class="bc-sep">/</span>
          <a href="/category/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a>
          <span class="bc-sep">/</span><span>${escapeHtml(localized(sec.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sec.name))}</h1>
        <p class="page-desc">${escapeHtml(localized(sec.description)) || ""}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${topicListHTML(cat, sub, sec, sec.topics || [])}
      </section>`;
    observeReveals();
    const secRecs = state.topicIndex.filter((r) => r.cat && r.cat.id === cat.id && r.sub && r.sub.id === sub.id && r.section && r.section.id === sec.id);
    const secQuestions = secRecs.reduce((a, r) => a + (r.nQuestions || 0), 0);
    autoSeo(main, {
      id: sec.id,
      name: localized(sec.name),
      count: (sec.topics || []).length,
      total: secQuestions,
      h2: localized(sec.name) + " - practice questions and revision",
      items: (sec.topics || []).map((tp) => ({ name: localized(tp.name), count: (state.topicMap[[cat.id, sub.id, sec.id, tp.id].join("/")] || {}).nQuestions || 0, unit: "questions" }))
    });
  }

  function topicListHTML(cat, sub, sec, topics) {
    if (!topics.length) return emptyHTML();
    const isStudyGuide = cat.id === "study-guides";
    const actionLabel = state.uiLang === "as" ? "পঢ়ক (Read Guide) →" : "Read Guide →";

    return `
      <div class="sub-grid">
        ${topics.map((tp, i) => {
          const path = [cat.id, sub ? sub.id : "", sec ? sec.id : ""].filter(Boolean).concat([tp.id]).join("/");
          const rec = state.topicMap[path];
          const qCount = (rec && rec.nQuestions > 0) ? rec.nQuestions : ((tp.questions || []).length);
          const countDisplay = isStudyGuide ? actionLabel : (qCount > 0 ? `${qCount} ${t("topic.questions")}` : t("btn.practice"));

          return `
            <a class="sub-card reveal" href="/topic/${path}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
              <span class="sub-ico">${topicIconHTML(tp.id, cat.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(tp.name))}</span>
                <span id="count-${path.replace(/\//g, '-')}" style="${isStudyGuide ? "color:var(--primary,#2563eb); font-weight:700;" : ""}">${countDisplay}</span>
              </span>
            </a>`;
        }).join("")}
      </div>`;
  }

  function emptyHTML() {
    return `<div class="qa-empty"><div class="big">
      <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"/><path d="M9 9h6"/><path d="M9 13h4"/><path d="m15 16 2 2 4-4"/></svg>
    </div><p>${t("search.noresult")}</p></div>`;
  }

  /* ================= Articles (read-only) =================
     The "articles" category works differently from Q&A topics:
     each subcategory holds a JSON file of rich articles that are
     rendered in a full reading view. They are NOT part of the
     topic index, so they never appear in Downloads / Trending /
     Search — reading only, exactly as required. */
  async function renderArticleReader(main, cat, sub) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    let data = null;
    try {
      data = await API.getArticles(sub.id);
    } catch (e) {
      data = null;
    }

    if (!data || !((data.articles || data.questions || []).length)) {
      const isAs = state.uiLang === "as";
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${escapeHtml(localized(sub.name))}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${isAs ? "এতিয়ালৈকে ইয়াত কোনো প্ৰবন্ধ যোগ কৰা হোৱা নাই।" : "No articles have been added here yet."}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/category/${cat.id}">${isAs ? "পিছলৈ যাওক" : "Go Back"}</a></div>
        </div>`;
      return;
    }

    const rec = {
      path: `articles/${sub.id}`,
      cat: cat,
      sub: sub,
      section: null,
      topic: {
        id: sub.id,
        title: (data && data.title) || sub.name,
        description: (data && data.description) || sub.description || {},
        questions: (data && (data.articles || data.questions)) || [],
      },
    };
    renderDedicatedArticlePage(main, rec);
  }

  /* ================= Topic & Article Page Handler ================= */
  function breadcrumbForTopic(rec) {
    const bits = [`<a href="/">${t("breadcrumb.home")}</a>`];
    bits.push(`<a href="/category/${rec.cat.id}">${escapeHtml(localized(rec.cat.name))}</a>`);
    if (rec.sub) bits.push(`<a href="/category/${rec.cat.id}/${rec.sub.id}">${escapeHtml(localized(rec.sub.name))}</a>`);
    if (rec.section) bits.push(`<a href="/category/${rec.cat.id}/${rec.sub ? rec.sub.id + "/" : ""}${rec.section.id}">${escapeHtml(localized(rec.section.name))}</a>`);
    return bits.map((b, i) => (i ? `<span class="bc-sep">/</span>` : "") + b).join("");
  }

  async function renderTopicPage(main, rec) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    try {
      const data = await API.getTopic(rec.cat.id, rec.topic.id, rec.sub && rec.sub.id, rec.cat && rec.cat.contentLayout);
      if (data) {
        rec.topic = Object.assign({}, rec.topic, data);
        rec.topic.title = rec.topic.title || rec.title;
        rec.nQuestions = (data.questions || []).length;
      }
    } catch { }

    if (rec.cat.id === "study-guides") {
      return renderDedicatedArticlePage(main, rec);
    }

    state.page = 0;
    const qs = rec.topic.questions || [];

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">${breadcrumbForTopic(rec)}</nav>
        <h1>${escapeHtml(localized(rec.topic.title))}</h1>
        <p class="page-desc">${escapeHtml(localized(rec.topic.description)) || ""}</p>
      </div>

      <div class="topic-layout" style="max-width:100%; margin:0 auto;">
        <div>
          <div class="qa-toolbar" style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px; margin-bottom:16px;">
            <span class="qt-info" style="font-weight:700; font-size:0.92rem; color:var(--ink-soft,#64748b);">${qs.length} ${t("topic.questions")}</span>
            <div class="qa-actions" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <button class="btn btn-sm btn-outline qa-tool-btn" id="qa-reading" type="button" style="display:inline-flex; align-items:center; gap:6px; font-weight:700;">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
                Reading Mode
              </button>
              <div class="lang-switch" role="group" aria-label="Reading language" style="display:inline-flex; border-radius:10px; overflow:hidden; border:1px solid var(--border,#cbd5e1);">
                <button class="lang-btn ${state.lang === "as" ? "active" : ""}" type="button" data-lang="as" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${t("topic.lang.as")}</button>
                <button class="lang-btn ${state.lang === "en" ? "active" : ""}" type="button" data-lang="en" style="padding:6px 12px; font-weight:700; border:none; cursor:pointer;">${t("topic.lang.en")}</button>
              </div>
            </div>
          </div>
          <div id="qa-list" class="qa-list" style="width:100%; box-sizing:border-box;"></div>
          <div id="pager" style="display:flex; justify-content:center; align-items:center; gap:12px; margin-top:24px;"></div>
        </div>
      </div>
    `;

    renderQAPage();

    $("#qa-reading").addEventListener("click", openReadingModal);
    $$(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.lang = btn.dataset.lang;
        document.body.setAttribute("data-lang", state.lang);
        $$(".lang-btn").forEach((x) => x.classList.toggle("active", x.dataset.lang === state.lang));
        renderQAPage();
        refreshReadingModal();
      });
    });
  }

  /* ================= Dedicated Rich Article Layout (Stylish & Mobile-Optimized) ================= */
  function renderDedicatedArticlePage(main, rec) {
    const rawItems = rec.topic.questions || rec.topic.sections || [];
    const isAs = state.lang === "as";
    const isArticles = rec.cat && rec.cat.id === "articles";
    const artBadge = isArticles
      ? (isAs ? "প্ৰবন্ধ পঢ়া • পঢ়া-মাত্ৰ" : "Read Articles • Reading Only")
      : (isAs ? "সম্পূৰ্ণ অধ্যয়ন নিৰ্দেশিকা (Theory Guide)" : "Complete In-Depth Study Guide");

    main.innerHTML = `
      <div class="page-head" style="text-align:left; max-width:860px; margin:0 auto 20px auto; padding:0 16px; box-sizing:border-box;">
        <nav class="breadcrumb">${breadcrumbForTopic(rec)}</nav>
        <h1 class="art-main-title">${escapeHtml(localized(rec.topic.title))}</h1>
        <p class="page-desc" style="font-size:0.96rem; line-height:1.6; color:var(--ink-soft,#475569); margin:0 0 16px 0;">${escapeHtml(localized(rec.topic.description)) || ""}</p>
        
        <div class="art-top-bar">
          <span style="font-size:0.82rem; font-weight:800; color:var(--primary,#2563eb); text-transform:uppercase; letter-spacing:0.5px; display:inline-flex; align-items:center; gap:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>
            ${artBadge}
          </span>
          <div class="art-lang-switch-box" role="group" aria-label="Article Language">
            <button class="art-glang-btn ${state.lang === "as" ? "active" : ""}" type="button" data-lang="as">
              <span class="active-dot"></span>অসমীয়া
            </button>
            <button class="art-glang-btn ${state.lang === "en" ? "active" : ""}" type="button" data-lang="en">
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
    `;

    const renderArticleText = () => {
      const artBox = $("#article-body-content");
      if (!artBox) return;

      artBox.innerHTML = rawItems.map((item, idx) => {
        const headline = extractField(item, "question");
        const bodyText = extractField(item, "answer");
        const explanation = extractField(item, "explanation");

        return `
          <div class="article-part-block">
            <h2 class="art-headline">
              <span>${formatMath(headline)}</span>
            </h2>
            <div class="art-paragraph">${formatMath(bodyText)}</div>
            ${explanation ? `
              <div class="art-keynote">
                <b style="color:var(--primary,#2563eb);">${state.lang === "as" ? "গুৰুত্বপূৰ্ণ বিষয় (Key Takeaway)" : "Key Highlights"}:</b> ${formatMath(explanation)}
              </div>` : ""
            }
          </div>
        `;
      }).join("");

      renderMathJax(artBox);
    };

    renderArticleText();

    $$(".art-glang-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.lang;
        if (state.lang === target) return;
        state.lang = target;
        document.body.setAttribute("data-lang", state.lang);
        
        $$(".art-glang-btn").forEach((x) => {
          x.classList.toggle("active", x.dataset.lang === state.lang);
        });

        renderArticleText();
      });
    });
  }

  /* ================= Smart Hybrid Q&A Renderer ================= */
  function renderQAPage() {
    const rec = currentTopicRec();
    if (!rec) return;
    const qs = rec.topic.questions || [];
    const perPage = typeof CONFIG !== "undefined" ? CONFIG.PER_PAGE : 10;
    const totalPages = Math.max(1, Math.ceil(qs.length / perPage));
    const start = state.page * perPage;
    const slice = qs.slice(start, start + perPage);

    const list = $("#qa-list");

    const wideFigTopic = /(?:^|\/)(image-series|image-analogy)$/.test(rec.path || "");
    list.classList.toggle("nv-fig-wide", wideFigTopic);

    if (!slice.length) {
      list.innerHTML = `<div class="qa-empty"><div class="big">
        <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
      </div><p>${t("toast.noquestions")}</p></div>`;
    } else {
      list.innerHTML = slice.map((item, i) => {
        const n = start + i + 1;
        const qtext = extractField(item, "question");
        const atext = extractField(item, "answer");
        const options = getOptionsList(item);
        const explanation = extractField(item, "explanation");
        const media = mediaBlock(item);
        const fopts = figureOptions(item);

        const targetLang = (state.mock && state.mock.testLang) ? state.mock.testLang : state.lang;
        const rawAns = (item.a && typeof item.a === "object" && item.a[targetLang]) || item.a || item.answer;
        const isStepArray = Array.isArray(rawAns) || atext.includes("qa-step-line");

        if (isStepArray) {
          return `
            <article class="qa-card" data-n="${n}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
                ${n}. ${formatMath(qtext)}
              </div>
              ${media}
              ${fopts ? figureOptionsHTML(item, { compact: true }) : options.length ? `
                <div class="qa-options-inline" style="margin:0 0 12px 0; padding:0; font-size:0.92rem; color:var(--ink-soft,#334155); display:flex; flex-direction:column; gap:6px; font-weight:500; text-align:left; align-items:flex-start;">
                  ${options.map((opt, optIdx) => {
                    const optDisplay = `(${String.fromCharCode(65 + optIdx)}) ${opt}`;
                    return `<span>${formatMath(optDisplay)}</span>`;
                  }).join("")}
                </div>` : ""
              }
              <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
                <div class="a-body" style="margin:0; padding:0; text-align:left;">${atext}</div>
                ${explanation ? `
                  <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                    <b style="color:var(--ink,#0f172a);">${state.lang === "as" ? "ব্যাখ্যা" : "Explanation"}:</b> ${explanation}
                  </div>` : ""
                }
              </div>
            </article>`;
        } else {
          return `
            <article class="qa-card" data-n="${n}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:16px; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
              <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
                <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${n}</span>
                <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${formatMath(qtext)}</span>
              </div>
              ${media}
              ${fopts ? figureOptionsHTML(item) : options.length ? `
                <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                  ${options.map((opt, optIdx) => `
                    <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
                      <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65 + optIdx)})</b> 
                      <span style="flex:1; line-height:1.4;">${formatMath(opt)}</span>
                    </div>
                  `).join("")}
                </div>` : ""
              }
              <div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
                <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${t("topic.answer")}:</span>
                <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${formatMath(atext)}</span>
              </div>
              ${explanation ? `
                <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
                  <b style="color:var(--ink,#0f172a);">${state.lang === "as" ? "ব্যাখ্যা" : "Explanation"}:</b> ${formatMath(explanation)}
                </div>` : ""
              }
            </article>`;
        }
      }).join("");

      renderMathJax(list);
    }

    const pager = $("#pager");
    if (totalPages > 1) {
      pager.innerHTML = `
        <button id="pg-prev" class="btn btn-sm btn-outline" ${state.page === 0 ? "disabled" : ""} style="padding:6px 14px; font-weight:700;">${t("topic.prev")}</button>
        <span class="pager-info" style="font-weight:700; font-size:0.88rem; color:var(--ink-soft,#64748b);">${state.page + 1} / ${totalPages}</span>
        <button id="pg-next" class="btn btn-sm btn-outline" ${state.page >= totalPages - 1 ? "disabled" : ""} style="padding:6px 14px; font-weight:700;">${t("topic.next")}</button>`;
      $("#pg-prev").addEventListener("click", () => { if (state.page > 0) { state.page--; renderQAPage(); refreshReadingModal(); window.scrollTo({ top: 0, behavior: "smooth" }); } });
      $("#pg-next").addEventListener("click", () => { if (state.page < totalPages - 1) { state.page++; renderQAPage(); refreshReadingModal(); window.scrollTo({ top: 0, behavior: "smooth" }); } });
    } else {
      pager.innerHTML = "";
    }
  }

  /* ================= Reading-mode popup ================= */
  function ensureReadingModal() {
    let modal = $("#read-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "read-modal";
    modal.className = "read-modal";
    modal.hidden = true;
    modal.innerHTML = `
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
          <button id="read-prev" type="button" class="btn btn-sm btn-outline" style="padding:6px 16px; font-weight:700;">${t("topic.prev")}</button>
          <span class="read-pageinfo" id="read-pageinfo" style="font-weight:700; font-size:0.88rem; color:var(--ink-soft,#64748b);"></span>
          <button id="read-next" type="button" class="btn btn-sm btn-outline" style="padding:6px 16px; font-weight:700;">${t("topic.next")}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    $("#read-modal-close", modal).addEventListener("click", closeReadingModal);
    $("#read-modal-backdrop", modal).addEventListener("click", closeReadingModal);

    $("#read-prev", modal).addEventListener("click", () => {
      if (state.page > 0) {
        state.page--;
        renderQAPage();
        renderReadingModalPage();
        const b = $("#read-modal-body");
        if (b) b.scrollTop = 0;
      }
    });

    $("#read-next", modal).addEventListener("click", () => {
      const rec = currentTopicRec();
      if (!rec) return;
      const qs = rec.topic.questions || [];
      const perPage = typeof CONFIG !== "undefined" ? CONFIG.PER_PAGE : 10;
      const totalPages = Math.max(1, Math.ceil(qs.length / perPage));

      if (state.page < totalPages - 1) {
        state.page++;
        renderQAPage();
        renderReadingModalPage();
        const b = $("#read-modal-body");
        if (b) b.scrollTop = 0;
      }
    });

    return modal;
  }

  function openReadingModal() {
    const rec = currentTopicRec();
    if (!rec) return;
    const modal = ensureReadingModal();
    const qs = rec.topic.questions || [];
    $(".read-modal-title", modal).textContent = localized(rec.topic.title);
    $(".read-modal-sub", modal).textContent = `${qs.length} ${t("topic.questions")} • ${state.lang === "as" ? t("topic.lang.as") : t("topic.lang.en")}`;
    modal.hidden = false;
    renderReadingModalPage();
  }

  function closeReadingModal() {
    const modal = $("#read-modal");
    if (modal) modal.hidden = true;
  }

  function renderReadingModalPage() {
    const rec = currentTopicRec();
    const modal = $("#read-modal");
    if (!rec || !modal || modal.hidden) return;
    const qs = rec.topic.questions || [];
    const perPage = typeof CONFIG !== "undefined" ? CONFIG.PER_PAGE : 10;
    const totalPages = Math.max(1, Math.ceil(qs.length / perPage));
    const start = state.page * perPage;
    const slice = qs.slice(start, start + perPage);

    $(".read-modal-sub", modal).textContent = `${qs.length} ${t("topic.questions")} • ${state.lang === "as" ? t("topic.lang.as") : t("topic.lang.en")}`;

    const body = $("#read-modal-body", modal);
    body.innerHTML = slice.map((item, i) => {
      const n = start + i + 1;
      const qtext = extractField(item, "question");
      const atext = extractField(item, "answer");
      const options = getOptionsList(item);
      const media = mediaBlock(item);
      const fopts = figureOptions(item);

      const targetLang = (state.mock && state.mock.testLang) ? state.mock.testLang : state.lang;
      const rawAns = (item.a && typeof item.a === "object" && item.a[targetLang]) || item.a || item.answer;
      const isStepArray = Array.isArray(rawAns) || atext.includes("qa-step-line");

      if (isStepArray) {
        return `
          <article class="qa-card read-item" data-n="${n}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="margin:0 0 8px 0; padding:0; font-size:0.96rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
              ${n}. ${formatMath(qtext)}
            </div>
            ${media}
            ${fopts ? figureOptionsHTML(item, { compact: true }) : options.length ? `
              <div class="qa-options-inline" style="margin:0 0 10px 0; padding:0; display:flex; flex-direction:column; gap:6px; font-size:0.9rem; color:var(--ink-soft,#334155); font-weight:500; text-align:left; align-items:flex-start;">
                ${options.map((opt, optIdx) => {
                  const optDisplay = `(${String.fromCharCode(65 + optIdx)}) ${opt}`;
                  return `<span>${formatMath(optDisplay)}</span>`;
                }).join("")}
              </div>` : ""
            }
            <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:8px; margin:0; font-size:0.88rem; color:var(--ink-soft,#334155); line-height:1.6; text-align:left;">
              <div class="a-body" style="margin:0; padding:0; text-align:left;">${atext}</div>
            </div>
          </article>`;
      } else {
        return `
          <article class="qa-card read-item" data-n="${n}" style="margin-bottom:16px; padding:16px 18px; border:1px solid var(--border,#e2e8f0); border-radius:12px; background:var(--card-bg,#fff); text-align:left;">
            <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 8px 0; padding:0; text-align:left;">
              <span class="qno" style="flex-shrink:0; width:26px; height:26px; border-radius:6px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.84rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; margin-top:1px;">${n}</span>
              <span class="qtext" style="flex:1; font-weight:500; font-size:0.94rem; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">${formatMath(qtext)}</span>
            </div>
            ${media}
            ${fopts ? figureOptionsHTML(item) : options.length ? `
              <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
                ${options.map((opt, optIdx) => `
                  <div style="font-size:0.86rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:7px 10px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
                    <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65 + optIdx)})</b>
                    <span style="flex:1; line-height:1.4;">${formatMath(opt)}</span>
                  </div>
                `).join("")}
              </div>` : ""
            }
            <div class="qa-a" style="margin:6px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
              <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); font-size:0.9rem;">${t("topic.answer")}:</span>
              <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); font-size:0.9rem; line-height:1.45;">${formatMath(atext)}</span>
            </div>
          </article>`;
      }
    }).join("");

    renderMathJax(body);
    $("#read-pageinfo", modal).textContent = `${state.page + 1} / ${totalPages}`;
    $("#read-prev", modal).disabled = state.page === 0;
    $("#read-next", modal).disabled = state.page >= totalPages - 1;
  }

  function refreshReadingModal() {
    const modal = $("#read-modal");
    if (!modal || modal.hidden) return;
    renderReadingModalPage();
  }

  function currentTopicRec() {
    const segs = parsePath();
    if (segs[0] !== "topic") return null;
    return state.topicMap[segs.slice(1).join("/")];
  }

  /* ================= Trending page ================= */
  function renderTrendingPage(main) {
    const trending = trendingTopics(state.topicIndex);
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.trending.title")}</span></nav>
        <h1>${t("page.trending.title")}</h1>
        <p class="page-desc">${t("page.trending.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="simple-list">
          ${trending.map((r, i) => `
            <a class="topic-card reveal" href="/topic/${r.path}" style="--cat:${catColor(r.cat.id)}" data-delay="${(i % 10) * 40}">
              <span class="topic-ico">${topicIconHTML(r.topic.id, r.cat.id)}</span>
              <span class="rank">${i + 1}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(r.title))}</span>
                <span id="trend-count-${r.path.replace(/\//g, '-')}">${escapeHtml(localized(r.cat.name))}${r.sub ? " • " + escapeHtml(localized(r.sub.name)) : ""} • ${r.cat.id === "study-guides" ? (state.uiLang === "as" ? "পঢ়ক →" : "Read Guide →") : `${r.nQuestions || 0} ${t("topic.questions")}`}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  /* ================= Detailed Bilingual Legal Pages ================= */
  function renderStatic(main, key) {
    const isAs = state.uiLang === "as";
    let title = "";
    let desc = "";
    let content = "";

    if (key === "about") {
      title = isAs ? "axomexam সম্পৰ্কে" : "About axomexam";
      desc = isAs ? "আমি কোন, আমাৰ অধ্যয়ন সামগ্ৰী কেনেদৰে প্ৰস্তুত কৰা হয়, আৰু অসমৰ প্ৰতিজন পৰীক্ষাৰ্থীৰ বাবে ইয়াক কেনেদৰে বিনামূলীয়া আৰু নিৰ্ভুল ৰখা হয়।" : "Who we are, how our study material is prepared, and how we keep it free and accurate for every Assam exam aspirant.";
      content = isAs ? `
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
      ` : `
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
      `;
    } else if (key === "privacy" || key === "privacy-policy") {
      title = isAs ? "গোপনীয়তা নীতি" : "Privacy Policy";
      content = isAs ? `
        <p><strong>axomexam.in</strong> ত আপোনাৰ ব্যক্তিগত তথ্যৰ সুৰক্ষা আৰু গোপনীয়তা ৰক্ষা কৰাটো আমাৰ অন্যতম অগ্ৰাধিকাৰ। এই নথিয়ে আমি কি তথ্য সংগ্ৰহ কৰোঁ আৰু সেয়া কেনেদৰে ব্যৱহাৰ কৰোঁ তাৰ স্পষ্ট বিৱৰণ দিয়ে।</p>
        <h3>১. আমি সংগ্ৰহ কৰা তথ্যসমূহ</h3>
        <p>আমি আমাৰ ব্যৱহাৰকাৰীৰ পৰা কোনো গোপনীয় ব্যক্তিগত তথ্য (যেনে বেংক বিৱৰণ, পাছৱৰ্ড আদি) সংগ্ৰহ নকৰোঁ। ব্যৱহাৰকাৰীয়ে যেতিয়া Contact বা Submit ফৰ্ম ব্যৱহাৰ কৰে, তেতিয়া কেৱল নাম আৰু ইমেইল ঠিকনাহে প্ৰয়োজন সাপেক্ষে সংগ্ৰহ কৰা হয়।</p>
        <h3>২. ল'গ ফাইল আৰু এনালিটিক্স</h3>
        <p>আন সকলো ষ্টেণ্ডাৰ্ড ৱেবছাইটৰ দৰে, axomexam.in এ ছাইটৰ কাৰ্যক্ষমতা আৰু ব্যৱহাৰকাৰীৰ অভিজ্ঞতা উন্নত কৰিবলৈ ল’গ ফাইল ব্যৱহাৰ কৰে (যেনে IP ঠিকনা, ব্ৰাউজাৰৰ প্ৰকাৰ, পৃষ্ঠা পৰিদৰ্শনৰ সময়)। এইবোৰ কোনো ব্যক্তিবিশেষৰ পৰিচয়ৰ সৈতে সংযুক্ত নহয়।</p>
        <h3>৩. গুগল ডাবল-ক্লিক DART কুকিজ আৰু বিজ্ঞাপন</h3>
        <p>Google আমাৰ ৱেবছাইটৰ এজন অন্যতম তৃতীয় পক্ষৰ বিজ্ঞাপনদাতা। Google-এ ব্যৱহাৰকাৰীৰ পূৰ্বৰ ইণ্টাৰনেট কাৰ্যকলাপৰ ওপৰত ভিত্তি কৰি প্ৰাসংগিক বিজ্ঞাপন প্ৰদৰ্শন কৰিবলৈ DART কুকিজ ব্যৱহাৰ কৰিব পাৰে। ব্যৱহাৰকাৰীয়ে Google Privacy & Terms পৃষ্ঠালৈ গৈ এই বিজ্ঞাপন ব্যক্তিগতকৰণ নিয়ন্ত্ৰণ কৰিব পাৰে।</p>
        <h3>৪. নীতিৰ সন্মতি</h3>
        <p>আমাৰ ৱেবছাইট ব্যৱহাৰ কৰাৰ জৰিয়তে আপুনি আমাৰ গোপনীয়তা নীতিৰ চৰ্তসমূহত সন্মতি প্ৰকাশ কৰা বুলি গণ্য কৰা হ'ব।</p>
      ` : `
        <p>At <strong>axomexam.in</strong> (accessible via https://axomexam.in), the privacy of our visitors is of paramount importance. This document outlines the types of personal and analytical information received and collected by our platform.</p>
        <h3>1. Information Collection and Handling</h3>
        <p>We do not mandate personal account creation or collect sensitive personal identification details. Information submitted via contact or feedback forms (such as Name and Email) is used strictly to respond to user inquiries.</p>
        <h3>2. Log Files & Standard Analytics</h3>
        <p>Like standard web portals, axomexam.in utilizes standard log files. The data inside includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click metrics. This data is non-personally identifiable and used purely for site maintenance.</p>
        <h3>3. Google AdSense & Third-Party Cookies</h3>
        <p>Google, as a third-party vendor, uses cookies to serve contextual advertisements on our site. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visits to axomexam.in and other sites across the web. You can opt out of personalized advertising by visiting Google Ad Settings.</p>
        <h3>4. Consent</h3>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to all its operational terms.</p>
      `;
    } else if (key === "terms") {
      title = isAs ? "নীতি আৰু চৰ্তসমূহ" : "Terms & Conditions";
      content = isAs ? `
        <p><strong>axomexam.in</strong> লৈ স্বাগতম। এই ৱেবছাইটটো ব্যৱহাৰ কৰাৰ ক্ষেত্ৰত তলত উল্লেখ কৰা নীতি আৰু চৰ্তসমূহ প্ৰযোজ্য হ'ব:</p>
        <h3>১. বৌদ্ধিক সম্পত্তি আৰু ব্যৱহাৰৰ নিয়ম</h3>
        <p>axomexam.in ত প্ৰকাশিত সকলো পাঠ্যক্ৰম, প্ৰশ্নোত্তৰ, মক টেষ্ট আৰু PDF সমল কেৱল ছাত্ৰ-ছাত্ৰী আৰু পৰীক্ষাৰ্থীৰ ব্যক্তিগত শিক্ষাৰ বাবেহে অনুমোদিত। আমাৰ অনুমতি অবিহনে কোনো সমল ব্যৱসায়িক স্বাৰ্থত পুনৰ প্ৰকাশ, বিক্ৰী বা অনৈতিকভাৱে ব্যৱহাৰ কৰা নিষিদ্ধ।</p>
        <h3>২. তথ্যৰ শুদ্ধতা আৰু সীমাবদ্ধতা</h3>
        <p>আমি সকলো প্ৰশ্ন আৰু উত্তৰ নিৰ্ভুলভাৱে যুগুত কৰিবলৈ যথাসম্ভৱ চেষ্টা কৰোঁ। তথাপিও কোনো তথ্যৰ অনিচ্ছাকৃত ত্ৰুটিৰ বাবে হোৱা শৈক্ষিক বা আনুসংগিক ক্ষতিৰ বাবে ৱেবছাইট প্ৰশাসক আইনগতভাৱে দায়বদ্ধ নহ’ব।</p>
        <h3>৩. বাহ্যিক লিংক</h3>
        <p>আমাৰ ৱেবছাইটত তৃতীয় পক্ষৰ লিংক (যেনে চৰকাৰী জাননী, অফিচিয়েল পৰীক্ষা প’ৰ্টেল আদি) থাকিব পাৰে। সেই বাহ্যিক ৱেবছাইটসমূহৰ সমল বা নীতিৰ বাবে আমি দায়বদ্ধ নহওঁ।</p>
      ` : `
        <p>Welcome to <strong>axomexam.in</strong>. By accessing and browsing this website, you accept and agree to comply with the following Terms and Conditions.</p>
        <h3>1. Content Usage & Intellectual Property</h3>
        <p>All materials, structured questions, study notes, and downloadable assets published on axomexam.in are intended strictly for educational, personal, and non-commercial usage. Redistribution, commercial reproduction, or resale without written permission is strictly prohibited.</p>
        <h3>2. Accuracy & Limitation of Liability</h3>
        <p>While our editorial team endeavors to ensure absolute factual correctness across all subjects, study materials are provided on an 'as-is' basis. axomexam.in does not warrant the completeness or absolute infallibility of contents for official evaluation criteria.</p>
        <h3>3. External Hyperlinks</h3>
        <p>Our pages may occasionally contain links to official external sites or reference sources. We hold no responsibility for the content, privacy guidelines, or accuracy of third-party platforms.</p>
      `;
    } else if (key === "disclaimer") {
      title = isAs ? "দাবীত্যাগ (Disclaimer)" : "Disclaimer";
      content = isAs ? `
        <p><strong>https://axomexam.in</strong> ত প্ৰকাশিত সকলো তথ্য কেৱল সাধাৰণ শিক্ষা আৰু জ্ঞান আহৰণৰ উদ্দেশ্যতহে আগবঢ়োৱা হৈছে।</p>
        <h3>১. চৰকাৰী সংস্থাৰ সৈতে সম্পৰ্কহীনতা</h3>
        <p>axomexam.in কোনো চৰকাৰী সংস্থা, অসম লোকসেৱা আয়োগ (APSC), বা কোনো পৰীক্ষা পৰিচালনা কৰা চৰকাৰী নিগমৰ অফিচিয়েল ৱেবছাইট নহয়। ই এক স্বতন্ত্ৰ শিক্ষামূলক প’ৰ্টেল। অফিচিয়েল জাননীৰ বাবে পৰীক্ষাৰ্থীসকলক সদায় চৰকাৰী গেজেট বা অফিচিয়েল প’ৰ্টেল অনুসৰণ কৰিবলৈ পৰামৰ্শ দিয়া হয়।</p>
        <h3>২. পেছাদাৰী পৰামৰ্শ নহয়</h3>
        <p>আমাৰ ৱেবছাইটত উপলব্ধ সমলসমূহ পৰীক্ষাৰ্থীৰ অনুশীলনৰ সহায়ৰ বাবেহে তৈয়াৰ কৰা হৈছে। ইয়াৰ ওপৰত ভিত্তি কৰি লোৱা যিকোনো সিদ্ধান্ত আপোনাৰ নিজা বিবেচনাধীন।</p>
      ` : `
        <p>All content and question banks on <strong>https://axomexam.in</strong> are published in good faith and solely for general educational, academic, and competitive examination preparation purposes.</p>
        <h3>1. Non-Affiliation with Government Authorities</h3>
        <p>axomexam.in is an independent private educational website. It is NOT affiliated with, sponsored by, or endorsed by the Government of Assam, APSC, SLPRB, State Recruitment Boards, or any governmental testing agency. Candidates must always cross-reference with official state recruitment gazettes.</p>
        <h3>2. Educational Warranties</h3>
        <p>We make no absolute warranties regarding test pattern guarantees or exam success outcomes. Use of study resources and mock practices is at the user's sole discretion.</p>
      `;
    } else {
      content = `<p>${t(`page.${key}.p1`)}</p>`;
    }

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${isAs ? "গৃহপৃষ্ঠা" : "Home"}</a><span class="bc-sep">/</span><span>${escapeHtml(title)}</span></nav>
        <h1>${escapeHtml(title)}</h1>
        ${desc ? `<p class="page-desc">${escapeHtml(desc)}</p>` : ""}
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="info-panel" style="background:var(--bg,#ffffff); padding:28px 24px; border-radius:18px; border:1px solid var(--border,#e2e8f0); line-height:1.75; color:var(--ink-soft,#475569); box-shadow:0 8px 24px -4px rgba(15,23,42,0.03); max-width:860px; margin:0 auto; text-align:left;">
          ${content}
        </div>
      </section>`;
    
    applyStaticI18n();
    window.scrollTo(0, 0);
  }

  /* ================= Contact Us Page ================= */
  function renderContactPage(main) {
    const isAs = state.uiLang === "as";
    const subjectOptions = isAs
      ? ["সমল সংশোধন", "ভাঙা লিংক বা ডাউনল'ড সমস্যা", "নতুন বিষয়ৰ অনুৰোধ", "প্ৰশ্ন আগবঢ়াওক", "কপিৰাইট / টেকডাউন অনুৰোধ", "অন্যান্য"]
      : ["Content correction", "Broken link or download problem", "New topic request", "Contribute questions", "Copyright / takedown request", "Other"];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${isAs ? "গৃহপৃষ্ঠা" : "Home"}</a><span class="bc-sep">/</span><span>${isAs ? "যোগাযোগ কৰক" : "Contact Us"}</span></nav>
        <h1>${isAs ? "যোগাযোগ কৰক" : "Contact Us"}</h1>
        <p class="page-desc">${isAs ? "ভুল উত্তৰ জনাওক, নতুন বিষয় বিচাৰক, প্ৰশ্ন আগবঢ়াওক, বা পৰীক্ষাৰ প্ৰস্তুতিত সহায় বিচাৰক।" : "Report a wrong answer, request a topic, contribute questions, or ask for help with your exam preparation."}</p>
      </div>

      <section class="section" style="padding-bottom:40px;">
        <article style="max-width:860px; margin:0 auto; line-height:1.85; color:var(--ink-soft,#475569); text-align:left;">
          <p>${isAs ? "আমি লাভ কৰা প্ৰতিটো বাৰ্তা পঢ়োঁ আৰু সেই প্ৰতিক্ৰিয়া axomexam.in ৰ প্ৰশ্ন-সংগ্ৰহ, নোট আৰু মক টেষ্ট উন্নত কৰিবলৈ ব্যৱহাৰ কৰোঁ। আপুনি এটা ভুল উত্তৰ জনাব, নতুন এটা বিষয়ৰ পৰামৰ্শ দিব, প্ৰশ্ন আগবঢ়াব বা অধ্যয়ন সামগ্ৰীৰ বিষয়ে সোধা-পোছা কৰিব বিচাৰে নে নাই — এই পৃষ্ঠাই আমাৰ সৈতে যোগাযোগ কৰাৰ আটাইতকৈ ভাল উপায় ব্যাখ্যা কৰে।" : "We read every message we receive and use the feedback to improve the question banks, notes and mock tests on axomexam.in. Whether you want to report a wrong answer, suggest a new topic, contribute questions or ask about study material, this page explains the best way to reach us."}</p>

          <h2>${isAs ? "ইমেইল সহায়" : "Email Support"}</h2>
          <p>${isAs ? "যোগাযোগৰ আটাইতকৈ দ্ৰুত উপায় হ'ল" : "The fastest way to contact us is by email at"} <a href="mailto:axomexam@outlook.com">axomexam@outlook.com</a>${isAs ? " লৈ ইমেইল। আমাক উত্তৰ দিবলৈ অনুগ্ৰহ কৰি এটা বৈধ ইমেইল ঠিকনাৰ পৰা লিখক। আমি সাধাৰণতে" : ". Please write from a valid email address so that we can reply. We usually respond within"} <strong>${isAs ? "দুৰৰ পৰা তিনি কৰ্মদিৱসৰ" : "two to three working days"}</strong>${isAs ? " ভিতৰত উত্তৰ দিওঁ।" : "."}</p>

          <form id="contact-form" action="mailto:axomexam@outlook.com" method="post" enctype="text/plain" style="margin:22px 0 10px; padding:22px; border:1px solid var(--border,#e2e8f0); border-radius:16px; background:var(--card-bg,#fff);">
            <h3 style="margin-top:0; color:var(--ink,#0f172a);">${isAs ? "আমাক এটা বাৰ্তা পঠিয়াওক" : "Send us a message"}</h3>
            <div style="margin-bottom:12px;">
              <label for="c-name" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${isAs ? "আপোনাৰ নাম" : "Your name"}</label>
              <input id="c-name" name="name" type="text" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:12px;">
              <label for="c-email" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${isAs ? "আপোনাৰ ইমেইল" : "Your email"}</label>
              <input id="c-email" name="email" type="email" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:12px;">
              <label for="c-subject" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${isAs ? "বিষয়" : "Subject"}</label>
              <select id="c-subject" name="subject" style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;">
                ${subjectOptions.map((o) => `<option>${o}</option>`).join("")}
              </select>
            </div>
            <div style="margin-bottom:16px;">
              <label for="c-message" style="display:block; font-weight:700; margin-bottom:6px; color:var(--ink,#0f172a);">${isAs ? "বাৰ্তা" : "Message"}</label>
              <textarea id="c-message" name="message" rows="5" required style="width:100%; padding:10px 12px; border:1px solid var(--border,#cbd5e1); border-radius:10px; font:inherit; box-sizing:border-box;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">${isAs ? "বাৰ্তা পঠিয়াওক" : "Send message"}</button>
            <p style="font-size:0.82rem; color:#64748b; margin:10px 0 0;">${isAs ? "ই আপোনাৰ ইমেইল এপটো তথ্য ভৰাই খুলিব। যদি নুখুলে, তেন্তে পোনপটীয়াকৈ" : "This opens your email app with the details filled in. If it does not open, simply email us directly at"} <a href="mailto:axomexam@outlook.com">axomexam@outlook.com</a>${isAs ? " লৈ ইমেইল কৰক।" : "."}</p>
          </form>

          <h2>${isAs ? "আপোনাৰ বাৰ্তাত কি অন্তৰ্ভুক্ত কৰিব" : "What to Include in Your Message"}</h2>
          <ul>
            <li>${isAs ? "<strong>সমল সংশোধনৰ বাবে:</strong> পৃষ্ঠাৰ সঠিক লিংক, প্ৰশ্ন নম্বৰ, আপুনি ভুল বুলি ভবা কথাটো, আৰু এটা চুটি কাৰণ বা উৎসসহ সঠিক উত্তৰ।" : "<strong>For a content correction:</strong> the exact page link, the question number, what you believe is wrong, and the correct answer with a short reason or source."}</li>
            <li>${isAs ? "<strong>ভাঙা লিংক বা ডাউনল'ড সমস্যাৰ বাবে:</strong> লিংকটো দেখা পোৱা পৃষ্ঠা আৰু ফাইল বা প্ৰশ্নকাকতৰ নাম।" : "<strong>For a broken link or download problem:</strong> the page where the link appears and the name of the file or paper."}</li>
            <li>${isAs ? "<strong>নতুন বিষয় অনুৰোধৰ বাবে:</strong> পৰীক্ষাৰ নাম, বিষয় আৰু আমি যোগ কৰিবলগীয়া নিৰ্দিষ্ট বিষয়টো।" : "<strong>For a new topic request:</strong> the exam name, subject and the specific topic you would like us to add."}</li>
            <li>${isAs ? "<strong>প্ৰশ্ন আগবঢ়োৱাৰ বাবে:</strong> বিষয়, প্ৰশ্ন চাৰিটা বিকল্পসহ, সঠিক বিকল্প আৰু এটা চুটি ব্যাখ্যা।" : "<strong>For contributing questions:</strong> the subject, topic, questions with four options, the correct option and a brief explanation."}</li>
          </ul>

          <h2>${isAs ? "উত্তৰৰ সময়" : "Response Time"}</h2>
          <p>${isAs ? "আমি প্ৰতিটো প্ৰামাণিক বাৰ্তাৰ উত্তৰ দুৰৰ পৰা তিনি কৰ্মদিৱসৰ ভিতৰত দিবলৈ চেষ্টা কৰোঁ। বাৰ্তাসমূহ অহা ক্ৰমত পৰিচালনা কৰা হয়, আৰু যাচাইযোগ্য উৎসসহ সমল সংশোধনসমূহ সাধাৰণতে আগতে প্ৰক্ৰিয়া কৰা হয়।" : "We aim to reply to every genuine message within two to three working days. Messages are handled in the order they arrive, and content corrections that include a verifiable source are usually processed first."}</p>

          <h2>${isAs ? "কপিৰাইট সমল জনাওক" : "Report Copyright Content"}</h2>
          <p>${isAs ? "যদি আপুনি বিশ্বাস কৰে যে axomexam.in ৰ কোনো সামগ্ৰীয়ে আপোনাৰ কপিৰাইট উলংঘা কৰিছে, পৃষ্ঠাৰ লিংক আৰু মালিকীস্বত্বৰ প্ৰমাণসহ আমালৈ ইমেইল কৰক। আমি অনুৰোধ পৰ্যালোচনা কৰি প্ৰয়োজন হ'লে সামগ্ৰী আঁতৰাব। আমি বৌদ্ধিক সম্পত্তিক সন্মান কৰোঁ আৰু বৈধ টেকডাউন অনুৰোধসমূহ তৎক্ষণাত পালন কৰোঁ।" : "If you believe any material on axomexam.in infringes your copyright, email us with the page link and proof of ownership. We will review the request and remove the material if required. We respect intellectual property and act on valid takedown requests promptly."}</p>

          <h2>${isAs ? "সাধাৰণ প্ৰশ্ন" : "Common Questions"}</h2>
          <p>${isAs ? "<strong>ফোন নম্বৰ বা লাইভ চেট আছে নেকি?</strong> নাই। মঞ্চখন বিনামূলীয়া আৰু সমল-কেন্দ্ৰিত ৰাখিবলৈ সহায় সম্পূৰ্ণৰূপে ইমেইলৰ জৰিয়তে কৰা হয়।" : "<strong>Is there a phone number or live chat?</strong> No. To keep the platform free and focused on content, support is handled by email only."}</p>
          <p>${isAs ? "<strong>মই অধ্যয়ন পৰিকল্পনা বিচাৰিব পাৰোঁ নেকি?</strong> হয়। আপুনি যি পৰীক্ষাৰ বাবে প্ৰস্তুতি চলাইছে আৰু পৰীক্ষাৰ তাৰিখ কওক, আমি আপোনাক আটাইতকৈ প্ৰাসংগিক শিতান আৰু অধ্যয়নৰ পৰামৰ্শিত ক্ৰমলৈ নিৰ্দেশ কৰিম।" : "<strong>Can I request a study plan?</strong> Yes. Tell us the exam you are preparing for and the date of the exam, and we will point you to the most relevant sections and a suggested order of study."}</p>
          <p>${isAs ? "<strong>আপোনালোকে মোৰ তথ্য শ্বেয়াৰ বা বিক্ৰী কৰে নেকি?</strong> কেতিয়াও নহয়। আপোনাৰ ইমেইল কেৱল আপোনাৰ অনুসন্ধানৰ উত্তৰ দিবলৈ ব্যৱহাৰ কৰা হয়, আমাৰ <a href=\"/privacy/\">গোপনীয়তা নীতি</a>ত ব্যাখ্যা কৰাৰ দৰে।" : "<strong>Do you share or sell my details?</strong> Never. Your email is used only to reply to your query, as explained in our <a href=\"/privacy/\">Privacy Policy</a>."}</p>
          <p>${isAs ? "<strong>মই ছাইটলৈ প্ৰশ্ন আগবঢ়াব পাৰোঁ নেকি?</strong> হয়। চাৰিটা বিকল্প আৰু এটা চুটি ব্যাখ্যাসহ পঠিয়াওক, আমাৰ দলে প্ৰকাশৰ আগতে পৰ্যালোচনা কৰিব।" : "<strong>Can I contribute questions to the site?</strong> Yes. Send them with four options and a short explanation, and our team will review them before publishing."}</p>

          <p style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border,#e2e8f0); font-size:0.88rem; color:#64748b;"><strong>${isAs ? "শেষ হালনাগাদ:" : "Last updated:"}</strong> ${isAs ? "২০ ছেপ্তেম্বৰ ২০২৬" : "20 September 2026"} &middot; ${isAs ? "প্ৰকাশক:" : "Publisher:"} axomexam.in</p>
        </article>
      </section>
    `;

    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = (document.getElementById("c-name") || {}).value || "";
        const email = (document.getElementById("c-email") || {}).value || "";
        const subject = (document.getElementById("c-subject") || {}).value || "Website enquiry";
        const message = (document.getElementById("c-message") || {}).value || "";
        const body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;
        window.location.href = "mailto:axomexam@outlook.com?subject=" + encodeURIComponent("[axomexam] " + subject) + "&body=" + encodeURIComponent(body);
      });
    }

    applyStaticI18n();
    observeReveals();
    window.scrollTo(0, 0);
  }

  /* ================= Master Search ================= */
  function normalizeText(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  function allLangs(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    if (Array.isArray(obj)) return obj.join(" ");
    return [obj.en, obj.as].filter(Boolean).map(x => Array.isArray(x) ? x.join(" ") : x).join(" ");
  }

  function searchIndex(query) {
    const q = normalizeText(query);
    if (q.length < 2) return [];
    const hits = [];
    const searchLimit = typeof CONFIG !== "undefined" ? CONFIG.SEARCH_LIMIT : 20;
    for (const r of state.topicIndex) {
      const titleEn = normalizeText(localized({ en: r.title.en }));
      const titleAs = normalizeText(localized({ as: r.title.as }));
      const tagHits = (r.tags || []).filter((tag) => normalizeText(tag).includes(q));
      const qHits = (r.topic.questions || []).filter((item) => {
        const qStr = (typeof item.q === "object" ? allLangs(item.q) : (item.q || item.question_en || "") + " " + (item.question_as || ""));
        const aStr = (typeof item.a === "object" ? allLangs(item.a) : (item.a || item.answer_en || "") + " " + (item.answer_as || ""));
        return normalizeText(qStr).includes(q) || normalizeText(aStr).includes(q);
      });
      let score = 0;
      if (titleEn.includes(q)) score += 5;
      if (titleAs.includes(q)) score += 5;
      score += tagHits.length * 3;
      score += qHits.length * 1.5;
      if (score > 0) hits.push({ rec: r, score, matchCount: qHits.length + tagHits.length });
    }
    return hits.sort((a, b) => b.score - a.score).slice(0, searchLimit);
  }

  /* Full-text search over question/answer bodies needs every topic loaded.
     Instead of downloading all of them on boot (the old behaviour, ~24 MB),
     the corpus is loaded on demand the first time the user actually searches,
     with limited concurrency, and cached for the rest of the session. */
  let _searchCorpusPromise = null;
  function ensureSearchCorpus() {
    if (state.searchCorpusReady) return Promise.resolve();
    if (_searchCorpusPromise) return _searchCorpusPromise;
    _searchCorpusPromise = (async () => {
      const queue = state.topicIndex.filter((r) => !(r.topic && Array.isArray(r.topic.questions) && r.topic.questions.length));
      const worker = async () => {
        while (queue.length) {
          const rec = queue.shift();
          try {
            const data = await API.getTopic(rec.cat.id, rec.topic.id, rec.sub && rec.sub.id, rec.cat && rec.cat.contentLayout);
            if (data) {
              const list = Array.isArray(data) ? data : (Array.isArray(data.questions) ? data.questions : []);
              rec.topic.questions = list;
              if (!rec.nQuestions) rec.nQuestions = list.length;
            }
          } catch (e) { /* individual topic failures are non-fatal */ }
        }
      };
      const workers = Math.min(8, queue.length);
      await Promise.all(Array.from({ length: workers }, worker));
      state.searchCorpusReady = true;
    })().finally(() => { _searchCorpusPromise = null; });
    return _searchCorpusPromise;
  }

  function bindSearch() {
    const input = $("#master-search");
    const box = $("#search-results");
    if (!input || !box) return;
    let timer;

    const close = () => { box.hidden = true; box.innerHTML = ""; };

    const renderDropdown = (v) => {
      const hits = searchIndex(v);
      if (!hits.length) {
        box.innerHTML = `<div class="sr-empty">${t("search.noresult")}</div>`;
      } else {
        box.innerHTML = `
          <div class="sr-head">${t("search.results")} (${hits.length})</div>
          ${hits.map((h, i) => `
            <a class="sr-item" href="/topic/${h.rec.path}" data-idx="${i}">
              <span class="chip">${escapeHtml(localized(h.rec.cat.name))}</span>
              <span style="display:flex; flex-direction:column; gap:2px;">
                <span class="sr-title">${escapeHtml(localized(h.rec.title))}</span>
                <span class="sr-sub">${escapeHtml(localized(h.rec.section ? h.rec.section.name : (h.rec.sub ? h.rec.sub.name : "")))} • ${h.rec.cat.id === "study-guides" ? (state.uiLang === "as" ? "নিৰ্দেশিকা" : "Guide") : `${h.rec.nQuestions || 0} ${t("topic.questions")}`}</span>
              </span>
            </a>`).join("")}`;
        box.innerHTML += `<a class="sr-item" href="/trending" style="justify-content:center;color:var(--primary);font-weight:600;">${t("see.all")}</a>`;
      }
      box.hidden = false;
    };

    const onInput = (e) => {
      clearTimeout(timer);
      const v = e.target.value;
      if (v.trim().length < 2) { close(); return; }
      timer = setTimeout(() => {
        renderDropdown(v);
        ensureSearchCorpus().then(() => {
          if (!box.hidden && input.value.trim() === v.trim()) renderDropdown(v);
        });
      }, 180);
    };

    input.addEventListener("input", onInput);
    input.addEventListener("focus", () => {
      if (input.value.trim().length >= 2) onInput({ target: input });
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrap")) close();
    });
    box.addEventListener("click", (e) => {
      const a = e.target.closest("a.sr-item");
      if (a) { input.value = ""; close(); }
    });
  }

  /* ================= Dedicated search page ================= */
  function renderSearchPage(main) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("tab.search")}</span></nav>
        <h1>${t("tab.search")}</h1>
      </div>
      <div class="search-page">
        <div class="sp-bar">
          <input type="search" id="page-search" autocomplete="off" spellcheck="false" placeholder="${t("search.placeholder")}" />
        </div>
        <div class="sp-results" id="page-search-results">
          <div class="sp-empty">${t("search.hint")}</div>
        </div>
      </div>`;

    const input = $("#page-search");
    const results = $("#page-search-results");
    let timer;
    const run = () => {
      const q = input.value.trim();
      if (q.length < 2) {
        results.innerHTML = `<div class="sp-empty">${t("search.hint")}</div>`;
        return;
      }
      const hits = searchIndex(q);
      if (!hits.length) {
        results.innerHTML = `<div class="sp-empty">${t("search.noresult")}</div>`;
        return;
      }
      results.innerHTML = hits.map((h) => `
        <a class="sp-topic" href="/topic/${h.rec.path}">
          <span class="chip">${escapeHtml(localized(h.rec.cat.name))}</span>
          <span style="display:flex; flex-direction:column; gap:2px;">
            <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(h.rec.title))}</span>
            <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${escapeHtml(localized(h.rec.section ? h.rec.section.name : (h.rec.sub ? h.rec.sub.name : "")))} • ${h.rec.cat.id === "study-guides" ? (state.uiLang === "as" ? "নিৰ্দেশিকা" : "Guide") : `${h.rec.nQuestions || 0} ${t("topic.questions")}`}</span>
          </span>
        </a>`).join("");
    };
    input.addEventListener("input", () => {
      clearTimeout(timer);
      const v = input.value;
      timer = setTimeout(() => {
        run();
        ensureSearchCorpus().then(() => {
          if (input.value.trim() === v.trim()) run();
        });
      }, 180);
    });
  }

  /* ================= Mobile menu ================= */
  function closeMobileMenu() {
    const m = $("#mobile-menu");
    const b = $("#mobile-backdrop");
    const h = $("#hamburger");
    if (m) { m.classList.remove("open"); m.hidden = true; }
    if (b) { b.classList.remove("open"); b.hidden = true; }
    if (h) { h.classList.remove("open"); h.setAttribute("aria-expanded", "false"); }
  }
  function openMobileMenu() {
    const m = $("#mobile-menu");
    const b = $("#mobile-backdrop");
    const h = $("#hamburger");
    if (m) m.hidden = false;
    if (b) b.hidden = false;
    requestAnimationFrame(() => {
      if (m) m.classList.add("open");
      if (b) b.classList.add("open");
    });
    if (h) { h.classList.add("open"); h.setAttribute("aria-expanded", "true"); }
  }

  /* ================= Reveal on scroll ================= */
  let revealObserver;
  function observeReveals() {
    if (revealObserver) revealObserver.disconnect();
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    els.forEach((el) => {
      const d = parseInt(el.dataset.delay || "0", 10);
      if (d) el.style.transitionDelay = `${d}ms`;
    });
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          revealObserver.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    els.forEach((el) => revealObserver.observe(el));
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function render404(main) {
    main.innerHTML = `
      <div class="page-head" style="padding:80px 0;text-align:center;">
        <h1 style="font-size:3rem;">404</h1>
        <p class="page-desc" style="margin:12px auto;">${t("page.error.sub")}</p>
        <div style="margin-top:22px;"><a class="btn btn-primary" href="/">${t("page.error.btn")}</a></div>
      </div>`;
  }

  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("show"), 2400);
  }

  /* ================= Categories page ================= */
  function renderCategoriesPage(main) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("tab.categories")}</span></nav>
        <h1>${t("tab.categories")}</h1>
        <p class="page-desc">${t("home.categories.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="cat-grid">
          ${state.categories.map((c, i) => {
            const color = catColor(c.id);
            return `
              <a class="cat-card reveal" href="/category/${c.id}" style="--cat:${color}" data-delay="${i * 50}">
                <span class="cat-ico">${catIconHTML(c.id)}</span>
                <span class="cat-meta">
                  <b>${escapeHtml(localized(c.name))}</b>
                  <span>${c.id === "articles" ? (state.uiLang === "as" ? "প্ৰবন্ধসমূহ" : "Articles") : `<span class="cat-count">${countTopics(c)}</span> ${c.id === "study-guides" ? (state.uiLang === "as" ? "টা গাইড" : "Guides") : t("cat.topics")}`}</span>
                </span>
              </a>`;
          }).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  /* ================= PDF Spinner Overlay Helper ================= */
  function showPdfSpinner(message) {
    let spinner = $("#pdf-loading-overlay");
    if (!spinner) {
      spinner = document.createElement("div");
      spinner.id = "pdf-loading-overlay";
      spinner.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,23,42,0.8);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(4px);";
      spinner.innerHTML = `
        <div style="width:48px;height:48px;border:3.5px solid rgba(255,255,255,0.15);border-top:3.5px solid #3b82f6;border-radius:50%;animation:pdfSpin 0.8s linear infinite;margin-bottom:16px;"></div>
        <div id="pdf-spinner-text" style="color:#ffffff;font-size:0.98rem;font-weight:700;letter-spacing:0.3px;font-family:'Plus Jakarta Sans',sans-serif;">${escapeHtml(message || "Generating PDF...")}</div>
        <style>@keyframes pdfSpin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>
      `;
      document.body.appendChild(spinner);
    } else {
      $("#pdf-spinner-text").textContent = message || "Generating PDF...";
      spinner.style.display = "flex";
    }
  }

  function hidePdfSpinner() {
    const spinner = $("#pdf-loading-overlay");
    if (spinner) spinner.style.display = "none";
  }

  /* ================= Enhanced Language Selection Modal ================= */
  function showPdfDownloadModal(rec) {
    const existing = $("#pdf-lang-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "pdf-lang-modal";
    modal.className = "read-modal";
    modal.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;display:flex;align-items:center;justify-content:center;";
    modal.innerHTML = `
      <div class="read-modal-backdrop" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.7);backdrop-filter:blur(4px);"></div>
      <div class="read-modal-box pdf-pop-box" role="dialog" style="position:relative; z-index:2; width:90%; max-width:340px; padding:24px 20px; text-align:center; background:var(--bg,#ffffff); color:var(--ink,#0f172a); border-radius:20px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.3); border:1px solid var(--border,#e2e8f0); animation:popIn 0.22s cubic-bezier(0.16,1,0.3,1); box-sizing:border-box; display:flex; flex-direction:column; align-items:center;">
        
        <div style="width:52px; height:52px; background:rgba(37,99,235,0.1); color:#2563eb; border-radius:14px; display:flex; align-items:center; justify-content:center; margin:0 auto 12px auto; font-size:1.6rem;">
          📄
        </div>

        <h3 style="font-size:1.15rem; font-weight:800; margin:0 0 6px 0; color:var(--ink,#0f172a); letter-spacing:-0.2px; text-align:center; width:100%;">Select PDF Language</h3>
        <p style="color:var(--ink-soft,#64748b); font-size:0.84rem; margin:0 0 20px 0; line-height:1.4; padding:0 4px; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; text-align:center; width:100%;">
          <b>${escapeHtml(localized(rec.title))}</b>
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
    `;
    document.body.appendChild(modal);

    const close = () => modal.remove();
    $("#pdf-btn-cancel", modal).addEventListener("click", close);
    $(".read-modal-backdrop", modal).addEventListener("click", close);

    $("#pdf-btn-as", modal).addEventListener("click", (e) => {
      e.currentTarget.style.transform = "scale(0.95)";
      setTimeout(() => { close(); generateTopicPdf(rec, "as"); }, 100);
    });

    $("#pdf-btn-en", modal).addEventListener("click", (e) => {
      e.currentTarget.style.transform = "scale(0.95)";
      setTimeout(() => { close(); generateTopicPdf(rec, "en"); }, 100);
    });
  }

  /* ================= Natural Flow-Based A4 PDF Exporter ================= */
  async function generateTopicPdf(rec, lang) {
    if (state.isGeneratingPdf) return;
    state.isGeneratingPdf = true;

    showPdfSpinner(lang === "as" ? "PDF প্ৰস্তুত হৈ আছে, অনুগ্ৰহ কৰি ৰওক..." : "Generating PDF, please wait...");
    await new Promise((r) => setTimeout(r, 40));

    let qs = rec.topic.questions || [];

    if (!qs.length) {
      try {
        const data = await API.getTopic(rec.cat.id, rec.topic.id, rec.sub && rec.sub.id, rec.cat && rec.cat.contentLayout);
        if (data) {
          qs = Array.isArray(data) ? data : (data.questions || []);
          rec.topic.questions = qs;
        }
      } catch (err) {
        console.error("PDF fetch error:", err);
      }
    }

    if (!qs.length) {
      hidePdfSpinner();
      state.isGeneratingPdf = false;
      toast(lang === "as" ? "এই বিষয়ত প্ৰশ্ন উপলব্ধ নহয়!" : "No questions available in this topic!");
      return;
    }

    const titleText = rec.title[lang] || rec.title.as || rec.title.en || rec.topic.id;
    const catText = rec.cat.name[lang] || rec.cat.name.as || rec.cat.name.en || "";
    const langLabel = lang === "as" ? "অসমীয়া মাধ্যম" : "English Medium";
    const ansLabel = lang === "as" ? "উত্তৰ" : "Answer";
    const expLabel = lang === "as" ? "ব্যাখ্যা" : "Explanation";
    const fontFam = lang === "as" ? "'Noto Serif Bengali', serif" : "'Plus Jakarta Sans', sans-serif";

    const testMeasureDiv = document.createElement("div");
    testMeasureDiv.style.cssText = "position:absolute; left:-9999px; top:-9999px; visibility:hidden; width:726px; font-family:" + fontFam + ";";
    document.body.appendChild(testMeasureDiv);

    const renderedCards = qs.map((item, idx) => {
      const qText = extractField(item, "question", lang);
      const aText = extractField(item, "answer", lang);
      const exp = extractField(item, "explanation", lang);
      const options = getOptionsList(item, lang);
      const media = mediaBlock(item);
      const fopts = figureOptions(item);

      const targetLang = lang;
      const rawAns = (item.a && typeof item.a === "object" && item.a[targetLang]) || item.a || item.answer;
      const isStepArray = Array.isArray(rawAns) || aText.includes("qa-step-line");

      const row = document.createElement("div");
      row.className = "qa-row";
      row.style.cssText = "border-bottom:1px dashed #e2e8f0; padding-bottom:4px; margin-bottom:7px; line-height:1.4; text-align:left;";
      
      if (isStepArray) {
        row.innerHTML = `
          <div style="font-size:12.8px; font-weight:700; color:#0f172a; margin-bottom:1px; text-align:left;">${idx + 1}. ${formatMath(qText)}</div>
          ${media}
          ${fopts ? figureOptionsHTML(item, { compact: true }) : options.length ? `
            <div style="font-size:11.2px; color:#475569; margin-bottom:3px; display:flex; flex-wrap:wrap; gap:12px; text-align:left; justify-content:flex-start;">
              ${options.map((opt, optIdx) => {
                const optDisplay = `(${String.fromCharCode(65 + optIdx)}) ${opt}`;
                return `<span>${formatMath(optDisplay)}</span>`;
              }).join("")}
            </div>` : ""
          }
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${aText}</div>
          ${exp ? `<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${expLabel}:</b> ${exp}</div>` : ""}
        `;
      } else {
        row.innerHTML = `
          <div style="font-size:12.8px; font-weight:500; color:#0f172a; margin-bottom:1px; text-align:left;">${idx + 1}. ${formatMath(qText)}</div>
          ${media}
          ${fopts ? figureOptionsHTML(item, { compact: true }) : ""}
          <div style="font-size:12.2px; font-weight:600; color:#334155; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;">${ansLabel}: ${formatMath(aText)}</div>
          ${exp ? `<div style="font-size:10.5px; color:#64748b; margin-top:1px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif; text-align:left;"><b>${expLabel}:</b> ${exp}</div>` : ""}
        `;
      }

      testMeasureDiv.appendChild(row);
      const h = row.offsetHeight + 7;
      return { html: row.outerHTML, height: h };
    });
    testMeasureDiv.remove();

    const pages = [];
    let currentPage = [];
    let currentHeight = 0;
    const pageMaxHeight = 1010;

    renderedCards.forEach(card => {
      if (currentHeight + card.height > pageMaxHeight && currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [card.html];
        currentHeight = card.height;
      } else {
        currentPage.push(card.html);
        currentHeight += card.height;
      }
    });
    if (currentPage.length > 0) pages.push(currentPage);

    const totalPages = pages.length;

    const pdfContainer = document.createElement("div");
    pdfContainer.id = "dynamic-pdf-export-container";
    pdfContainer.style.cssText = "position:absolute; left:-9999px; top:-9999px; width:794px; background:#fff;";

    pages.forEach((pageRows, pageIdx) => {
      const pageNum = pageIdx + 1;
      const isFirst = pageNum === 1;

      const pageDiv = document.createElement("div");
      pageDiv.className = "pdf-page-node";
      pageDiv.style.cssText = `
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
        font-family: ${fontFam};
      `;

      const headerHtml = isFirst ? `
        <div style="border-bottom:2px solid #4f46e5; padding-bottom:6px; margin-bottom:4px; height:48px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="vertical-align:bottom; text-align:left;">
                <div style="font-size:15px; font-weight:800; color:#0f172a; line-height:1.2; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${escapeHtml(titleText)}</div>
                <div style="font-size:10.5px; color:#64748b; margin-top:2px; font-family:'Noto Sans Bengali', 'Plus Jakarta Sans', sans-serif;">${escapeHtml(catText)} • ${lang === "as" ? "মুঠ বিষয়" : "Total Content"}: ${qs.length} | ${langLabel}</div>
              </td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${PDF_BRAND_LOGO_SVG}
              </td>
            </tr>
          </table>
        </div>
      ` : `
        <div style="border-bottom:1.5px solid #e2e8f0; padding-bottom:6px; margin-bottom:4px; height:36px; box-sizing:border-box;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td></td>
              <td style="vertical-align:bottom; text-align:right; width:155px; white-space:nowrap; padding-right:4px;">
                ${PDF_BRAND_LOGO_SVG}
              </td>
            </tr>
          </table>
        </div>
      `;

      pageDiv.innerHTML = `
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) rotate(-35deg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; pointer-events:none; user-select:none; z-index:0; opacity:0.075; width:140%;">
          <div style="width:110px; height:110px; background:#4f46e5; color:#ffffff; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:68px; font-weight:800; font-family:Arial, sans-serif;">A</div>
          <div style="font-size:58px; font-weight:800; color:#4f46e5; letter-spacing:2px; line-height:1;">axomexam.in</div>
        </div>
        ${headerHtml}
        <div style="position:relative; z-index:2; flex:1; display:flex; flex-direction:column; justify-content:flex-start; margin-top:8px; margin-bottom:8px;">
          ${pageRows.join("")}
        </div>
        <div style="border-top:1px solid #e2e8f0; padding-top:4px; display:flex; justify-content:space-between; align-items:center; font-size:9.5px; color:#64748b; font-family:'Plus Jakarta Sans', sans-serif; position:relative; z-index:2;">
          <span>© axomexam.in — Free Educational Notes for Assam Competitive Exams</span>
          <span style="position:absolute; left:50%; transform:translateX(-50%); font-weight:700; color:#334155; font-size:10px;">— Page ${pageNum} of ${totalPages} —</span>
          <span>axomexam.in</span>
        </div>
      `;

      pdfContainer.appendChild(pageDiv);
    });

    document.body.appendChild(pdfContainer);
    renderMathJax(pdfContainer);

    try {
      await ensurePdfLibs();
      if (!window.jspdf || !window.html2canvas) {
        throw new Error("jsPDF or html2canvas library is missing.");
      }
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageElements = pdfContainer.querySelectorAll('.pdf-page-node');

      for (let i = 0; i < pageElements.length; i++) {
        const canvas = await window.html2canvas(pageElements[i], { scale: 2, useCORS: true, logging: false });
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        if (i > 0) pdf.addPage('a4', 'p');
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
      }

      pdf.save(`${rec.topic.id}-${lang}.pdf`);
      pdfContainer.remove();
      hidePdfSpinner();
      state.isGeneratingPdf = false;
      toast(lang === "as" ? "PDF ডাউনলোড সফল হ'ল!" : "PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      pdfContainer.remove();
      hidePdfSpinner();
      state.isGeneratingPdf = false;
      toast("Failed to generate PDF. Please try again.");
    }
  }

  /* ================= Downloads page ================= */
  async function renderDownloadsPage(main) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    let files = [];
    try { files = await API.listDownloads(); } catch (err) {}

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.downloads.title")}</span></nav>
        <h1>${t("page.downloads.title")}</h1>
        <p class="page-desc">${escapeHtml(t("page.downloads.desc"))}</p>
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
          ${state.topicIndex.map((rec, i) => `
            <div class="dl-item reveal topic-dl-card" data-title="${escapeHtml(allLangs(rec.title))}" data-cat="${escapeHtml(allLangs(rec.cat.name))}" data-delay="${(i % 12) * 30}">
              <span class="dl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </span>
              <span class="dl-meta">
                <b>${escapeHtml(localized(rec.title))}</b>
                <span>${escapeHtml(localized(rec.cat.name))}${rec.sub ? " • " + escapeHtml(localized(rec.sub.name)) : ""} • <span id="dl-count-${rec.path.replace(/\//g, '-')}">${rec.nQuestions || 0}</span> ${rec.cat.id === "study-guides" ? "Chapters" : "Questions"}</span>
              </span>
              <button class="dl-btn dl-save topic-pdf-btn" data-path="${escapeHtml(rec.path)}" type="button" style="text-transform:none;">Download</button>
            </div>
          `).join("")}
        </div>
        <div id="dl-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>No matching PDF topic found.</p></div>
      </section>

      <section class="section" style="padding-bottom:44px; border-top:1px solid var(--border,#e2e8f0); padding-top:30px;">
        <div class="section-head"><div><h2>Special E-Books & Hand-written Notes</h2><p class="sec-sub">Direct official PDFs and curated study materials.</p></div></div>
        ${files.length ? `
          <div class="dl-list">
            ${files.map(f => `
              <div class="dl-item">
                <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
                <span class="dl-meta"><b>${escapeHtml(f.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "))}</b><span>PDF Document</span></span>
                <a class="dl-btn dl-save" href="${f.url}" download target="_blank" rel="noopener" style="text-transform:none;">Download</a>
              </div>`).join("")}
          </div>` : `<div class="info-panel"><p>No extra manual PDF uploaded yet.</p></div>`}
      </section>`;

    $$(".topic-pdf-btn", main).forEach(btn => {
      btn.addEventListener("click", () => {
        const path = btn.dataset.path;
        const rec = state.topicMap[path];
        if (rec) showPdfDownloadModal(rec);
      });
    });

    const dlSearchInput = $("#dl-search-input");
    const cards = $$(".topic-dl-card", main);
    const noMatch = $("#dl-no-match");

    if (dlSearchInput) {
      dlSearchInput.addEventListener("input", (e) => {
        const q = normalizeText(e.target.value);
        let visibleCount = 0;
        cards.forEach(card => {
          const tName = normalizeText(card.dataset.title);
          const cName = normalizeText(card.dataset.cat);
          if (tName.includes(q) || cName.includes(q)) { card.style.display = ""; visibleCount++; }
          else { card.style.display = "none"; }
        });
        if (noMatch) noMatch.style.display = visibleCount === 0 ? "block" : "none";
      });
    }
    observeReveals();
  }

  /* ================= E-Books Library (read-only shelf) =================
     Topic-wise online e-books for Assam competitive exams. Every book is a
     JSON file uploaded to /data/books/<id>.json. Clicking a book opens it
     directly in a reading view with topic-wise explanations. Books are
     reading-only and are never offered as a PDF download. */
  function ebkColor(book) {
    const c = book && book.color;
    return /^#[0-9a-fA-F]{3,8}$/.test(c || "") ? c : "#4f46e5";
  }

  function ebkLang(obj, lang) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    const l = lang || state.lang || "en";
    if (obj[l] && String(obj[l]).trim()) return obj[l];
    return obj.en || obj.as || "";
  }

  function ebkContentHTML(text) {
    if (text == null) return "";
    const lines = String(text).split("\n");
    let html = "";
    let listOpen = false;
    const closeList = () => { if (listOpen) { html += "</ul>"; listOpen = false; } };
    lines.forEach((raw) => {
      const line = (raw || "").trim();
      if (!line) { closeList(); return; }
      const bullet = line.match(/^[-•*]\s+(.*)$/);
      if (bullet) {
        if (!listOpen) { html += '<ul class="ebk-list">'; listOpen = true; }
        html += `<li>${formatMath(bullet[1])}</li>`;
      } else {
        closeList();
        html += `<p class="ebk-para">${formatMath(line)}</p>`;
      }
    });
    closeList();
    return html;
  }

  async function renderEbooksPage(main) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    let books = [];
    try {
      books = await API.listBooks();
    } catch (e) {
      books = [];
    }

    const showEmpty = (extra) => {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:760px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("ebooks.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${t("ebooks.sub")}</p>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        </div><p>${escapeHtml(extra || t("ebooks.empty"))}</p></div>`;
    };

    if (!books.length) return showEmpty();

    const sorted = books.slice().sort((a, b) =>
      ebkLang(a.title, "en").localeCompare(ebkLang(b.title, "en")));

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("nav.ebooks")}</span>
        </nav>
        <h1>${t("ebooks.title")}</h1>
        <p class="page-desc">${t("ebooks.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="ebooks-grid">
          ${sorted.map((book, bi) => {
            const chCount = (book.chapters || []).length;
            const color = ebkColor(book);
            const titleEn = ebkLang(book.title, "en");
            const subjectEn = ebkLang(book.subject, "en");
            const cover = book.cover ? String(book.cover) : "";
            const coverAlt = ebkLang(book.coverAlt, state.lang) || (titleEn + " e-book cover");
            const coverInner = cover
              ? `<img class="ebook-cover-img" src="${escapeHtml(cover)}" alt="${escapeHtml(coverAlt)}" loading="lazy" decoding="async">`
              : `<span class="ebook-cover-frame" aria-hidden="true"></span>
                  <span class="ebook-cover-top">
                    <span class="ebook-cover-publisher">axomexam</span>
                    <span class="ebook-cover-tag">E-Book</span>
                  </span>
                  <span class="ebook-cover-title">
                    <span class="ebk-tt-en">${escapeHtml(titleEn)}</span>
                  </span>
                  <span class="ebook-cover-subject">${escapeHtml(subjectEn)}</span>`;
            return `
              <a class="ebook-card reveal" href="/ebooks/${encodeURIComponent(book.id)}" style="--ebk:${color}" data-delay="${bi * 60}">
                <span class="ebook-cover${cover ? " has-photo" : ""}">${coverInner}</span>
                <span class="ebook-meta">
                  <b>${escapeHtml(titleEn)}</b>
                  <span class="ebook-meta-sub"><span>${chCount} ${t("ebooks.chapters")}</span></span>
                  <span class="ebook-read-btn">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
                    ${t("ebooks.readNow")}
                  </span>
                </span>
              </a>`;
          }).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  /* ================= E-Book Reader (reading mode only) ================= */
  function ebkReaderBodyHTML(book, lang) {
    const chapters = book.chapters || [];
    const toc = chapters.map((c, i) => `
      <a class="ebk-toc-item" href="#ebk-ch-${i}">
        <span class="ebk-toc-no">${i + 1}</span>
        <span>${escapeHtml(ebkLang(c.title, lang))}</span>
      </a>`).join("");
    const list = chapters.map((c, i) => `
      <section class="ebk-chapter" id="ebk-ch-${i}">
        <h3 class="ebk-ch-title"><span class="ebk-ch-no">${i + 1}</span>${escapeHtml(ebkLang(c.title, lang))}</h3>
        <div class="ebk-ch-body">${ebkContentHTML(ebkLang(c.content, lang))}</div>
      </section>`).join("");
    return `
      ${chapters.length > 1 ? `<nav class="ebk-toc" aria-label="${escapeHtml(t("ebooks.toc"))}"><h4>${t("ebooks.toc")}</h4>${toc}</nav>` : ""}
      <div class="ebk-chapters">${list}</div>`;
  }

  /* Reading progress bar — mobile browsers hide the native scrollbar while
     reading, so the reader shows a slim fixed progress strip at the top. */
  let ebkRaf = null;
  function scheduleEbkProgress() {
    if (ebkRaf) return;
    ebkRaf = requestAnimationFrame(drawEbkProgress);
  }
  function drawEbkProgress() {
    ebkRaf = null;
    const fill = document.getElementById("ebk-progress-fill");
    if (!fill) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const top = window.pageYOffset || doc.scrollTop || 0;
    const pct = max > 0 ? Math.min(100, Math.max(0, (top / max) * 100)) : 0;
    fill.style.width = pct.toFixed(2) + "%";
  }
  function clearEbookProgress() {
    const bar = document.getElementById("ebk-progress");
    if (bar) bar.remove();
    window.removeEventListener("scroll", scheduleEbkProgress);
    window.removeEventListener("resize", scheduleEbkProgress);
    if (ebkRaf) { cancelAnimationFrame(ebkRaf); ebkRaf = null; }
  }
  function showEbookProgress(color) {
    clearEbookProgress();
    const bar = document.createElement("div");
    bar.id = "ebk-progress";
    bar.className = "ebk-progress";
    bar.style.setProperty("--ebk", color);
    const fill = document.createElement("span");
    fill.id = "ebk-progress-fill";
    bar.appendChild(fill);
    document.body.appendChild(bar);
    window.addEventListener("scroll", scheduleEbkProgress, { passive: true });
    window.addEventListener("resize", scheduleEbkProgress);
    scheduleEbkProgress();
  }

  async function renderEbookReaderPage(main, bookId) {
    const safeId = String(bookId || "").replace(/[^A-Za-z0-9_-]/g, "");
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    if (!safeId) return render404(main);

    let book = null;
    try {
      book = await API.getBook(safeId);
    } catch (e) {
      book = null;
    }

    if (!book || !book.title || !(book.chapters && book.chapters.length)) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("ebooks.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${t("ebooks.empty")}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/ebooks">${t("ebooks.backToLib")}</a></div>
        </div>`;
      return;
    }

    const chapters = book.chapters || [];
    let readLang = (state.lang === "as") ? "as" : "en";
    const titleEn = ebkLang(book.title, "en");
    const titleAs = ebkLang(book.title, "as");
    const subjectEn = ebkLang(book.subject, "en");
    const subjectAs = ebkLang(book.subject, "as");
    const color = ebkColor(book);
    const hasAsTitle = titleAs && titleAs !== titleEn;

    main.innerHTML = `
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/ebooks">${t("nav.ebooks")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(titleEn)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${color};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${escapeHtml(subjectEn)}${subjectAs && subjectAs !== subjectEn ? `<span class="ebk-chip-as"> ${escapeHtml(subjectAs)}</span>` : ""}</span>
            </div>
            <h2 class="ebk-head-title">${escapeHtml(titleEn)}${hasAsTitle ? `<span class="ebk-head-title-as">${escapeHtml(titleAs)}</span>` : ""}</h2>
            ${book.description ? `<p class="ebk-desc">${escapeHtml(localized(book.description)).replace(/\n/g, "<br>")}</p>` : ""}
            <div class="ebk-head-meta">
              ${book.author ? `<span><b>${escapeHtml(localized(book.author))}</b></span>` : ""}
              <span>${chapters.length} ${t("ebooks.chapters")}</span>
              ${book.updated ? `<span>${t("ebooks.updated")}: ${escapeHtml(book.updated)}</span>` : ""}
            </div>
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${readLang === "as" ? "active" : ""}" data-ebklang="as">${t("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${readLang === "en" ? "active" : ""}" data-ebklang="en">${t("topic.lang.en")}</button>
          </div>
        </div>

        <div id="ebk-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/ebooks">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${t("ebooks.backToLib")}
          </a>
          <p class="ebk-no-pdf">${t("ebooks.noPdf")}</p>
        </div>
      </div>`;

    const body = $("#ebk-body");
    if (body) body.innerHTML = ebkReaderBodyHTML(book, readLang);
    showEbookProgress(color);

    $$(".lang-btn", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.ebklang;
        if (readLang === target) return;
        readLang = target;
        $$(".lang-btn", main).forEach((x) => x.classList.toggle("active", x.dataset.ebklang === readLang));
        if (body) {
          body.innerHTML = ebkReaderBodyHTML(book, readLang);
          scheduleEbkProgress();
        }
      });
    });
  }

  /* ================= Your Exams (read-only exam library) =================
     Exam books work exactly like e-books: read-only, online only, never
     downloadable as a PDF. data/exams/index.json lists every exam and its
     sections. Each section is one JSON file at
     data/exams/<exam-id>/<section-id>.json and is shown in a simple
     reading view (Q&A question banks or syllabus notes). */
  const EXAM_SECTION_ICONS = {
    syllabus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3.5 6h.01"/><path d="M3.5 12h.01"/><path d="M3.5 18h.01"/></svg>',
    "elementary-mathematics": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h4"/></svg>',
    "general-english": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6"/><path d="M9 11h6"/></svg>',
    "logical-reasoning": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.8.7 1.1 1.5 1.1 2.7h5c0-1.2.3-2 1.1-2.7A6 6 0 0 0 12 3z"/></svg>',
    "assam-history-geography-culture": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9.5 21v-6h5v6"/></svg>',
    "general-knowledge-current-affairs": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',
    default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>',
  };

  function examSectionIcon(sec) {
    const id = (sec && sec.id) || "";
    if (EXAM_SECTION_ICONS[id]) return EXAM_SECTION_ICONS[id];
    if (sec && sec.type === "syllabus") return EXAM_SECTION_ICONS.syllabus;
    return EXAM_SECTION_ICONS.default;
  }

  function examColor(exam, section) {
    const c = (section && section.color) || (exam && exam.color);
    return /^#[0-9a-fA-F]{3,8}$/.test(c || "") ? c : "#4f46e5";
  }

  async function getExamsList() {
    if (Array.isArray(state.exams)) return state.exams;
    let exams = [];
    try { exams = await API.listExams(); } catch (e) { exams = []; }
    state.exams = Array.isArray(exams) ? exams : [];
    return state.exams;
  }

  function findExam(examId) {
    return (state.exams || []).find((e) => e.id === examId) || null;
  }

  function examIsAvailable(exam) {
    return !!(exam && exam.status === "available" && (exam.sections || []).length);
  }

  function examCoverAlt(exam, lang) {
    const txt = ebkLang(exam && exam.coverAlt, lang) || ebkLang(exam && exam.title, lang);
    return txt || "Exam book cover";
  }

  function examBookCardHTML(exam, i) {
    const color = examColor(exam);
    const titleEn = ebkLang(exam.title, "en");
    const titleAs = ebkLang(exam.title, "as");
    const subEn = ebkLang(exam.subtitle, "en");
    const available = examIsAvailable(exam);
    const statusLabel = available ? t("exams.readNow") : t("exams.comingSoon");
    const name = normalizeText(titleEn + " " + titleAs + " " + subEn);
    const cover = exam.cover ? String(exam.cover) : "";
    const soonBadge = available ? "" : `<span class="exam-soon-badge">${escapeHtml(t("exams.comingSoon"))}</span>`;
    const coverInner = cover
      ? `<img class="ebook-cover-img" src="${escapeHtml(cover)}" alt="${escapeHtml(examCoverAlt(exam, state.lang))}" loading="lazy" decoding="async">${soonBadge}`
      : `<span class="ebook-cover-frame" aria-hidden="true"></span>
          <span class="ebook-cover-top">
            <span class="ebook-cover-publisher">axomexam</span>
            <span class="ebook-cover-tag">${escapeHtml(available ? t("nav.exams") : t("exams.comingSoon"))}</span>
          </span>
          <span class="ebook-cover-title">
            <span class="ebk-tt-en">${escapeHtml(titleEn)}</span>
            ${titleAs && titleAs !== titleEn ? `<span class="ebk-tt-as">${escapeHtml(titleAs)}</span>` : ""}
          </span>
          <span class="ebook-cover-subject">${escapeHtml(subEn)}</span>
          ${soonBadge}`;
    return `
      <a class="ebook-card reveal exam-card ${available ? "" : "is-soon"}" href="/exams/${encodeURIComponent(exam.id)}" style="--ebk:${color}" data-name="${escapeHtml(name)}" data-delay="${(i % 8) * 50}">
        <span class="ebook-cover${cover ? " has-photo" : ""}">${coverInner}</span>
        <span class="ebook-meta">
          <b>${escapeHtml(titleEn)}</b>
          <span class="ebook-meta-sub">${titleAs && titleAs !== titleEn ? `<span class="ebk-tt-as">${escapeHtml(titleAs)}</span>` : `<span>${escapeHtml(subEn)}</span>`}</span>
          <span class="ebook-read-btn">${escapeHtml(statusLabel)}</span>
        </span>
      </a>`;
  }

  /* ================= Free Current Affairs =================
     A separate bilingual Q&A library (Sports, Awards, Appointments ...).
     data/current-affairs/index.json lists the sub-categories; each
     sub-category folder keeps one JSON question per file, discovered at
     runtime like the Your Exams library. Every category page carries its
     topic intro, the upload date and "uploaded by axomexam team", then a
     simple question with an explained answer and a language toggle. */
  const CA_ICONS = {
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="m8.5 13.5-1.5 8 5-3 5 3-1.5-8"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/></svg>',
    atom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.4"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.4" transform="rotate(120 12 12)"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22V2"/><path d="M5 3c4 0 4 3 8 3s4-3 8-3v10c-4 0-4-3-8-3s-4 3-8 3"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    coins: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15v3M12 10v8M17 6v12"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M17.5 14.6c2.4.5 4 2.1 4 4.4"/></svg>',
    flower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2a3 3 0 0 1 0 6 3 3 0 0 1 0-6z"/><path d="M12 16a3 3 0 0 1 0 6 3 3 0 0 1 0-6z"/><path d="M2 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/><path d="M16 12a3 3 0 0 1 6 0 3 3 0 0 1-6 0z"/></svg>',
  };

  function currentAffairsIcon(cat) {
    const key = (cat && cat.icon) || "";
    if (CA_ICONS[key]) return CA_ICONS[key];
    if (typeof TOPIC_ICON_RULES !== "undefined") {
      const hay = ((cat && cat.id) || "") + " " + ((cat && cat.title && cat.title.en) || "");
      for (const [re, svg] of TOPIC_ICON_RULES) {
        if (re.test(hay)) return svg;
      }
    }
    return (typeof CATEGORY_ICON_SVG !== "undefined" && CATEGORY_ICON_SVG["current-affairs"]) || CA_ICONS.globe;
  }

  function currentAffairsCardHTML(cat, i) {
    const color = cat.color || "#ef4444";
    const nameEn = ebkLang(cat.title, "en");
    const nameAs = ebkLang(cat.title, "as");
    return `
      <a class="sub-card reveal exam-sec-card" href="/current-affairs/${encodeURIComponent(cat.id)}" style="--cat:${color}" data-delay="${(i % 8) * 40}">
        <span class="sub-ico"><span class="cat-svg">${currentAffairsIcon(cat)}</span></span>
        <span class="exam-sec-txt">
          <b>${escapeHtml(nameEn)}</b>
          ${nameAs && nameAs !== nameEn ? `<span class="exam-sec-as">${escapeHtml(nameAs)}</span>` : ""}
          <span class="exam-sec-count" data-ca-count="${escapeHtml(cat.id)}" hidden></span>
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`;
  }

  async function renderCurrentAffairsPage(main) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    let cats = [];
    try { cats = await API.listCurrentAffairs(); } catch (e) { cats = []; }
    if (!Array.isArray(cats)) cats = [];

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("nav.currentAffairs")}</span>
        </nav>
        <h1>${t("ca.title")}</h1>
        <p class="page-desc">${t("ca.sub")}</p>
        <p class="exams-choose">${t("ca.choose")}</p>
      </div>
      <section class="section" style="padding-bottom:46px;">
        ${cats.length
          ? `<div class="sub-grid exam-sec-grid" style="--cat:#ef4444">${cats.map((c, i) => currentAffairsCardHTML(c, i)).join("")}</div>`
          : `<div class="qa-empty"><div class="big">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h13a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"/><path d="M4 6V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><path d="M8 10h6"/><path d="M8 13h6"/></svg>
            </div><p>${escapeHtml(t("ca.empty"))}</p></div>`}
        <p class="ebooks-note">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          ${escapeHtml(t("ca.note"))}
        </p>
      </section>`;
    observeReveals();
    refreshCurrentAffairsCounts();
    loadCurrentAffairsTotal();
  }

  async function renderCurrentAffairsCategoryPage(main, catId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;

    let meta = null;
    let questions = [];
    try { meta = await API.getCurrentAffairsCategory(catId); } catch (e) { meta = null; }
    try { questions = await API.listCurrentAffairsQuestions(catId); } catch (e) { questions = []; }
    if (!Array.isArray(questions)) questions = [];

    if (!meta) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("ca.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${escapeHtml(t("ca.noCategory"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/current-affairs">${t("ca.back")}</a></div>
        </div>`;
      return;
    }

    const color = meta.color || "#ef4444";
    const titleEn = ebkLang(meta.title, "en") || catId;
    const titleAs = ebkLang(meta.title, "as");
    const readLang = state.lang === "as" ? "as" : "en";
    const count = questions.length;

    main.innerHTML = `
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/current-affairs">${t("nav.currentAffairs")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(titleEn)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${color};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${t("nav.currentAffairs")}</span>
              <span class="ebk-chip">${t("ca.questions")}</span>
            </div>
            <h2 class="ebk-head-title">${escapeHtml(titleEn)}${titleAs && titleAs !== titleEn ? `<span class="ebk-head-title-as">${escapeHtml(titleAs)}</span>` : ""}</h2>
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${t("ca.uploadedBy")}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${readLang === "as" ? "active" : ""}" data-calang="as">${t("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${readLang === "en" ? "active" : ""}" data-calang="en">${t("topic.lang.en")}</button>
          </div>
        </div>

        <div id="ca-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/current-affairs">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${t("ca.back")}
          </a>
        </div>
      </div>`;

    const CA_PER_PAGE = 40;
    let caPage = 0;
    const caTotalPages = Math.max(1, Math.ceil(count / CA_PER_PAGE));

    const body = $("#ca-body");
    const updated = meta.updated || "";
    const uploadedBy = meta.uploadedBy || "axomexam team";
    const paint = (lang) => {
      if (!body) return;
      const intro = ebkLang(meta.intro, lang);
      const introHTML = intro
        ? `<div class="ca-intro" style="margin:0 0 14px; padding:14px 16px; border-radius:14px; border:1px solid var(--border,#e2e8f0); background:linear-gradient(180deg, color-mix(in srgb, ${color} 9%, transparent), transparent); font-size:.92rem; line-height:1.65; color:var(--ink-soft,#334155); text-align:left;">${escapeHtml(intro)}</div>`
        : "";
      const metaHTML = `
        <div class="ca-meta" style="display:flex; flex-wrap:wrap; gap:6px 18px; margin:0 0 18px; font-size:.78rem; color:var(--ink-muted,#64748b);">
          ${updated ? `<span><b>${lang === "as" ? "আপডেট" : "Updated"}:</b> ${escapeHtml(updated)}</span>` : ""}
          <span><b>${lang === "as" ? "আপলোড কৰিছে" : "Uploaded by"}:</b> ${escapeHtml(uploadedBy)}</span>
        </div>`;
      const start = caPage * CA_PER_PAGE;
      const pageQuestions = questions.slice(start, start + CA_PER_PAGE);
      const qHTML = count
        ? `<div class="qa-list">${pageQuestions.map((q, i) => examQACardHTML(q, start + i + 1, lang, true)).join("")}</div>`
        : `<div class="qa-empty"><p>${escapeHtml(t("ca.noContent"))}</p></div>`;
      const pagerHTML = caTotalPages > 1
        ? `<div class="ca-pager" style="display:flex; justify-content:center; align-items:center; gap:12px; margin-top:24px;">
            <button id="ca-prev" class="btn btn-sm btn-outline" ${caPage === 0 ? "disabled" : ""} style="padding:6px 14px; font-weight:700;">${t("topic.prev")}</button>
            <span class="pager-info" style="font-weight:700; font-size:.88rem; color:var(--ink-soft,#64748b);">${caPage + 1} / ${caTotalPages}</span>
            <button id="ca-next" class="btn btn-sm btn-outline" ${caPage >= caTotalPages - 1 ? "disabled" : ""} style="padding:6px 14px; font-weight:700;">${t("topic.next")}</button>
          </div>`
        : "";
      body.innerHTML = introHTML + metaHTML + qHTML + pagerHTML;
      if (caTotalPages > 1) {
        const prevBtn = $("#ca-prev");
        const nextBtn = $("#ca-next");
        if (prevBtn) prevBtn.addEventListener("click", () => { if (caPage > 0) { caPage--; paint(lang); scheduleEbkProgress(); window.scrollTo({ top: 0, behavior: "smooth" }); } });
        if (nextBtn) nextBtn.addEventListener("click", () => { if (caPage < caTotalPages - 1) { caPage++; paint(lang); scheduleEbkProgress(); window.scrollTo({ top: 0, behavior: "smooth" }); } });
      }
    };
    paint(readLang);
    showEbookProgress(color);

    $$(".lang-btn", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.calang;
        $$(".lang-btn", main).forEach((x) => x.classList.toggle("active", x.dataset.calang === target));
        paint(target);
        scheduleEbkProgress();
      });
    });
  }

  async function renderExamsPage(main) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    const exams = await getExamsList();

    if (!exams.length) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:760px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${t("exams.sub")}</p>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
        </div><p>${escapeHtml(t("exams.empty"))}</p></div>`;
      return;
    }

    const sorted = exams.slice().sort((a, b) => {
      const av = examIsAvailable(a) ? 0 : 1;
      const bv = examIsAvailable(b) ? 0 : 1;
      if (av !== bv) return av - bv;
      return ebkLang(a.title, "en").localeCompare(ebkLang(b.title, "en"));
    });

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("nav.exams")}</span>
        </nav>
        <h1>${t("exams.title")}</h1>
        <p class="page-desc">${t("exams.sub")}</p>
        <p class="exams-choose">${t("exams.choose")}</p>
        <div class="exams-search-wrap">
          <svg class="exams-search-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input id="exam-search" type="search" autocomplete="off" spellcheck="false" placeholder="${escapeHtml(t("exams.search.ph"))}" aria-label="${escapeHtml(t("exams.search.ph"))}" />
        </div>
      </div>
      <section class="section" style="padding-bottom:46px;">
        <div class="ebooks-grid" id="exams-grid">${sorted.map((e, i) => examBookCardHTML(e, i)).join("")}</div>
        <div id="exams-no-match" class="qa-empty" style="display:none; padding:30px 10px;"><p>${escapeHtml(t("exams.noMatch"))}</p></div>
        <p class="ebooks-note">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          ${escapeHtml(t("exams.readOnly"))}
        </p>
      </section>`;

    const input = $("#exam-search");
    const cards = $$(".exam-card", main);
    const noMatch = $("#exams-no-match");
    if (input) {
      input.addEventListener("input", () => {
        const q = normalizeText(input.value);
        let visible = 0;
        cards.forEach((card) => {
          const match = !q || (card.dataset.name || "").indexOf(q) !== -1;
          card.style.display = match ? "" : "none";
          if (match) visible++;
        });
        if (noMatch) noMatch.style.display = visible ? "none" : "block";
      });
    }
    observeReveals();
  }

  function examSectionCardHTML(exam, sec, i) {
    const color = examColor(exam, sec);
    const nameEn = ebkLang(sec.title, "en");
    const nameAs = ebkLang(sec.title, "as");
    const isSyllabus = (sec.type === "syllabus");
    return `
      <a class="sub-card reveal exam-sec-card" href="/exams/${encodeURIComponent(exam.id)}/${encodeURIComponent(sec.id)}" style="--cat:${color}" data-delay="${(i % 8) * 40}">
        <span class="sub-ico">${examSectionIcon(sec)}</span>
        <span class="exam-sec-txt">
          <b>${escapeHtml(nameEn)}</b>
          ${nameAs && nameAs !== nameEn ? `<span class="exam-sec-as">${escapeHtml(nameAs)}</span>` : ""}
          ${isSyllabus ? "" : `<span class="exam-sec-count" data-count-exam="${escapeHtml(exam.id)}" data-count-section="${escapeHtml(sec.id)}" hidden></span>`}
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`;
  }

  function examSubIcon(sub) {
    const id = ((sub && sub.id) || "").toLowerCase();
    const label = String(ebkLang(sub && sub.title, "en") || "").toLowerCase();
    const hay = id + " " + label;
    if (typeof TOPIC_ICON_RULES !== "undefined") {
      for (const [re, svg] of TOPIC_ICON_RULES) {
        if (re.test(hay)) return svg;
      }
    }
    return EXAM_SECTION_ICONS.default;
  }

  function examSubcategoryCardHTML(exam, sec, sub, i, parentSubId) {
    const color = examColor(exam, sec);
    const nameEn = ebkLang(sub.title, "en");
    const nameAs = ebkLang(sub.title, "as");
    const href = `/exams/${encodeURIComponent(exam.id)}/${encodeURIComponent(sec.id)}/${parentSubId ? encodeURIComponent(parentSubId) + "/" : ""}${encodeURIComponent(sub.id)}`;
    const countPath = parentSubId ? `${parentSubId}/${sub.id}` : sub.id;
    return `
      <a class="sub-card reveal exam-sec-card" href="${href}" style="--cat:${color}" data-delay="${(i % 8) * 40}">
        <span class="sub-ico">${examSubIcon(sub)}</span>
        <span class="exam-sec-txt">
          <b>${escapeHtml(nameEn)}</b>
          ${nameAs && nameAs !== nameEn ? `<span class="exam-sec-as">${escapeHtml(nameAs)}</span>` : ""}
          <span class="exam-sec-count" data-count-exam="${escapeHtml(exam.id)}" data-count-section="${escapeHtml(sec.id)}" data-count-path="${escapeHtml(countPath)}" hidden></span>
        </span>
        <span class="exam-sec-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </a>`;
  }

  /* ---- Question counts on exam cards ----
     Counts resolve lazily after the grid renders so the page paints
     immediately; each card's badge fills in as its folder is read. */
  function examFindSubNode(subs, path) {
    let list = subs || [];
    let node = null;
    for (const id of path) {
      node = list.find((s) => s && s.id === id) || null;
      if (!node) return null;
      list = node.subcategories || [];
    }
    return node;
  }

  async function examSubtreeQuestionCount(examId, sectionId, path, node) {
    const children = (node && Array.isArray(node.subcategories)) ? node.subcategories : [];
    if (children.length) {
      const sums = await Promise.all(
        children.map((c) => examSubtreeQuestionCount(examId, sectionId, path.concat(c.id), c))
      );
      return sums.reduce((a, b) => a + b, 0);
    }
    const qs = await API.listExamQuestions(examId, sectionId, path[0], path[1]);
    return qs.length;
  }

  async function examSectionQuestionCount(examId, sec) {
    const subs = Array.isArray(sec.subcategories) ? sec.subcategories : [];
    if (subs.length) {
      const sums = await Promise.all(
        subs.map((s) => examSubtreeQuestionCount(examId, sec.id, [s.id], s))
      );
      return sums.reduce((a, b) => a + b, 0);
    }
    const data = await API.getExamSection(examId, sec.id);
    return ((data && data.questions) || []).length;
  }

  async function hydrateExamCardCounts(scope, exam) {
    if (!scope || !exam) return;
    const badges = Array.from(scope.querySelectorAll(".exam-sec-count"));
    const precomputed = state.counts && state.counts.examSectionCounts;
    await Promise.all(badges.map(async (badge) => {
      const examId = badge.dataset.countExam || exam.id;
      const secId = badge.dataset.countSection;
      const sec = (exam.sections || []).find((s) => s.id === secId);
      if (!sec || sec.type === "syllabus") return;
      const pathStr = badge.dataset.countPath || "";
      if (precomputed) {
        const key = pathStr ? `${examId}/${secId}/${pathStr}` : `${examId}/${secId}`;
        if (Object.prototype.hasOwnProperty.call(precomputed, key)) {
          const pn = Number(precomputed[key]) || 0;
          if (pn > 0) {
            badge.textContent = `${pn} ${t("topic.questions")}`;
            badge.hidden = false;
          }
          return;
        }
      }
      let n = 0;
      try {
        if (pathStr) {
          const path = pathStr.split("/").filter(Boolean);
          const node = examFindSubNode(sec.subcategories || [], path);
          n = await examSubtreeQuestionCount(examId, secId, path, node);
        } else {
          n = await examSectionQuestionCount(examId, sec);
        }
      } catch (e) {
        n = 0;
      }
      if (n > 0) {
        badge.textContent = `${n} ${t("topic.questions")}`;
        badge.hidden = false;
      }
    }));
  }

  /* Recompute the homepage hero counters (used live while counts load). */
  function updateHeroTotals() {
    const totalEl = $("#stat-total-questions");
    if (totalEl) {
      const total = state.topicIndex.reduce((a, r) => a + (r.nQuestions || 0), 0)
        + QUESTION_DISPLAY_BONUS + (state.examQuestionTotal || 0) + (state.caQuestionTotal || 0);
      totalEl.textContent = `${total.toLocaleString()}+`;
    }
    const pdfEl = $("#stat-total-pdfs");
    if (pdfEl) {
      const totalPdfs = state.topicIndex.length + state.topicIndex.filter((r) => r.pdf).length;
      pdfEl.textContent = `${totalPdfs}+`;
    }
  }

  /* Sum every question in the "Your Exams" library and add it to the hero
     counter. Runs once per page load; updates the counter as each exam loads. */
  function loadExamQuestionTotal() {
    /* Precomputed total from data/counts.json — no exam files downloaded. */
    if (state.counts && typeof state.counts.examsTotal === "number") {
      state.examQuestionTotal = state.counts.examsTotal;
      state.examTotalLoaded = true;
      updateHeroTotals();
      return Promise.resolve(state.examQuestionTotal);
    }
    if (state.examTotalPromise) return state.examTotalPromise;
    state.examTotalPromise = (async () => {
      try {
        await getExamsList();
        const exams = (state.exams || []).filter((e) => examIsAvailable(e));
        let total = 0;
        for (const exam of exams) {
          const sections = Array.isArray(exam.sections) ? exam.sections : [];
          const parts = await Promise.all(sections.map((sec) => {
            if (!sec || sec.type === "syllabus") return Promise.resolve(0);
            return examSectionQuestionCount(exam.id, sec).catch(() => 0);
          }));
          total += parts.reduce((a, b) => a + b, 0);
          state.examQuestionTotal = total;
          updateHeroTotals();
        }
        state.examQuestionTotal = total;
        state.examTotalLoaded = true;
      } catch (e) {
        /* leave the counter as-is if exam data is unavailable */
      }
      updateHeroTotals();
      return state.examQuestionTotal;
    })();
    return state.examTotalPromise;
  }

  /* Current Affairs live counts. The total feeds the homepage hero counter
     and each category card shows its own question count, hydrated once its
     folder is read (mirrors the "Your Exams" section cards). */
  function refreshCurrentAffairsCounts() {
    const counts = state.caCounts || {};
    $$(".exam-sec-count[data-ca-count]").forEach((badge) => {
      const id = badge.dataset.caCount;
      if (!id || !Object.prototype.hasOwnProperty.call(counts, id)) return;
      const n = Number(counts[id]) || 0;
      if (n > 0) {
        badge.textContent = `${n} ${t("topic.questions")}`;
        badge.hidden = false;
      }
    });
  }

  /* Sum every question in the Free Current Affairs library and add it to the
     hero counter. Runs once per page load; the counter updates as soon as the
     counts arrive. */
  function loadCurrentAffairsTotal() {
    if (state.caTotalPromise) return state.caTotalPromise;
    state.caTotalPromise = (async () => {
      try {
        const data = await API.getCurrentAffairsCounts();
        state.caCounts = (data && data.counts) || {};
        state.caQuestionTotal = (data && data.total) || 0;
        updateHeroTotals();
        refreshCurrentAffairsCounts();
      } catch (e) {
        /* leave the counters as-is if current affairs data is unavailable */
      }
      return state.caQuestionTotal;
    })();
    return state.caTotalPromise;
  }

  async function renderExamPage(main, examId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    await getExamsList();
    const exam = findExam(examId);

    if (!exam) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${escapeHtml(t("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${t("exams.backToExams")}</a></div>
        </div>`;
      return;
    }

    const color = examColor(exam);
    const titleEn = ebkLang(exam.title, "en");
    const titleAs = ebkLang(exam.title, "as");
    const subEn = ebkLang(exam.subtitle, "en");
    const subAs = ebkLang(exam.subtitle, "as");
    const available = examIsAvailable(exam);

    if (!available) {
      main.innerHTML = `
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
            <span>${escapeHtml(titleEn)}</span>
          </nav>
        </div>
        <div class="exam-soon-panel" style="--ebk:${color}">
          <span class="exam-soon-ico">${EXAM_SECTION_ICONS.default}</span>
          <h1>${escapeHtml(titleEn)}${titleAs && titleAs !== titleEn ? ` <span class="exam-soon-as">${escapeHtml(titleAs)}</span>` : ""}</h1>
          ${subEn ? `<p class="exam-soon-sub">${escapeHtml(subEn)}</p>` : ""}
          <span class="exam-soon-chip">${t("exams.comingSoon")}</span>
          <p class="exam-soon-msg">${escapeHtml(t("exams.comingSoonMsg"))}</p>
          <a class="btn btn-accent" href="/exams">${t("exams.backToExams")}</a>
        </div>`;
      return;
    }

    const sections = exam.sections || [];
    const cover = exam.cover ? String(exam.cover) : "";
    const titleHTML = `${escapeHtml(titleEn)}${titleAs && titleAs !== titleEn ? ` <span class="exam-head-as">${escapeHtml(titleAs)}</span>` : ""}`;
    const descHTML = `${escapeHtml(subEn)}${subAs && subAs !== subEn ? ` &bull; ${escapeHtml(subAs)}` : ""}`;
    const crumbHTML = `
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(titleEn)}</span>`;
    const headHTML = cover
      ? `<div class="page-head">
          <nav class="breadcrumb">${crumbHTML}</nav>
        </div>
        <section class="exam-cover-hero" style="--ebk:${color}">
          <div class="exam-cover-hero-media">
            <img src="${escapeHtml(cover)}" alt="${escapeHtml(examCoverAlt(exam, state.lang))}" width="912" height="1166" loading="eager" decoding="async">
          </div>
          <div class="exam-cover-hero-info">
            <h1>${titleHTML}</h1>
            <p class="page-desc">${descHTML}</p>
            <p class="exams-choose">${t("exams.subjects")}</p>
            <p class="exam-cover-hero-note">${escapeHtml(t("exams.readOnly"))}</p>
          </div>
        </section>`
      : `<div class="page-head">
          <nav class="breadcrumb">${crumbHTML}</nav>
          <h1>${titleHTML}</h1>
          <p class="page-desc">${descHTML}</p>
          <p class="exams-choose">${t("exams.subjects")}</p>
        </div>`;
    main.innerHTML = `
      ${headHTML}
      <section class="section" style="padding-bottom:46px;">
        <div class="sub-grid exam-sec-grid" style="--cat:${color}">
          ${sections.map((sec, i) => examSectionCardHTML(exam, sec, i)).join("")}
        </div>
        <p class="ebooks-note">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          ${escapeHtml(t("exams.readOnly"))}
        </p>
      </section>`;
    observeReveals();
    hydrateExamCardCounts(main, exam);
  }

  /* Options list for an exam question — same 4-option view as the practice section. */
  function examOptionsHTML(q, lang) {
    const options = getOptionsList(q, lang);
    if (!options.length) return "";
    return `
      <div class="qa-options" style="display:flex; flex-direction:column; gap:8px; margin:0 0 12px 0; padding:0; text-align:left;">
        ${options.map((opt, optIdx) => `
          <div style="font-size:0.88rem; color:var(--ink-soft,#334155); background:var(--bg-subtle,#f8fafc); padding:8px 12px; border-radius:8px; border:1px solid var(--border,#e2e8f0); display:flex; align-items:flex-start; gap:6px; text-align:left;">
            <b style="color:var(--primary,#2563eb); flex-shrink:0;">(${String.fromCharCode(65 + optIdx)})</b>
            <span style="flex:1; line-height:1.4;">${formatMath(opt)}</span>
          </div>
        `).join("")}
      </div>`;
  }

  /* Resolve the stored answer to something readable.
     - A text option is shown with its letter, e.g. "A) Forsake".
     - Picture/shape options have no text, so the stored index (or letter)
       is shown as the option letter instead, e.g. "A". */
  function examResolveAnswer(q, lang, answerText) {
    const plain = String(answerText || "").replace(/<[^>]+>/g, "").trim();
    if (plain) {
      const m = /^[\(\[]?([a-eA-E])[\)\]]?[.)]?$/.exec(plain);
      if (!m) return answerText;
      const options = getOptionsList(q, lang);
      const idx = m[1].toLowerCase().charCodeAt(0) - 97;
      if (options[idx] === undefined || options[idx] === "") return answerText;
      return `${m[1].toUpperCase()}) ${options[idx]}`;
    }

    /* No textual answer: for picture/shape choices fall back to the letter. */
    const fops = figureOptions(q);
    if (fops && fops.length) {
      const raw = q && q.correct !== undefined ? q.correct : (q ? q.answer : undefined);
      if (Number.isInteger(raw)) {
        if (raw >= 0 && raw < fops.length) {
          return fops[raw].letter || String.fromCharCode(65 + raw);
        }
      } else if (typeof raw === "string") {
        const lm = /^[\(\[]?([a-eA-E])[\)\]]?[.)]?$/.exec(raw.trim());
        if (lm) return lm[1].toUpperCase();
      }
    }
    return answerText;
  }

  function examQACardHTML(q, n, lang, hideCat) {
    const cat = hideCat ? "" : ebkLang(q.category, lang);
    const qtext = extractField(q, "question", lang);
    const atext = examResolveAnswer(q, lang, extractField(q, "answer", lang));
    const explanation = extractField(q, "explanation", lang);
    const media = mediaBlock(q);
    const fopts = figureOptions(q);

    const rawAns = (q.a && typeof q.a === "object" && q.a[lang]) || q.a || q.answer;
    const isStepArray = Array.isArray(rawAns) || atext.includes("qa-step-line");

    const catChip = cat
      ? `<span style="display:block; margin-bottom:4px; font-size:.68rem; font-weight:800; letter-spacing:.4px; text-transform:uppercase; color:var(--ebk,#4f46e5);">${escapeHtml(cat)}</span>`
      : "";

    if (isStepArray) {
      return `
        <article class="qa-card" data-n="${n}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:12px; padding:18px 20px; margin-bottom:0; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
          <div class="qa-q" style="margin:0 0 10px 0; padding:0; font-size:1rem; font-weight:700; color:var(--ink,#0f172a); line-height:1.5; text-align:left;">
            ${catChip}${n}. ${formatMath(qtext)}
          </div>
          ${media}
          ${fopts ? figureOptionsHTML(q, { compact: true }) : examOptionsHTML(q, lang)}
          <div class="qa-solution" style="border-top:1px dashed var(--border,#e2e8f0); padding-top:10px; margin:0; font-size:0.9rem; line-height:1.6; color:var(--ink-soft,#334155); text-align:left;">
            <div class="a-body" style="margin:0; padding:0; text-align:left;">${atext}</div>
            ${explanation ? `
              <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); text-align:left;">
                <b style="color:var(--ink,#0f172a);">${lang === "as" ? "ব্যাখ্যা" : "Explanation"}:</b> ${explanation}
              </div>` : ""}
          </div>
        </article>`;
    }

    return `
      <article class="qa-card" data-n="${n}" style="box-sizing:border-box; width:100%; background:var(--card-bg,#fff); border:1px solid var(--border,#e2e8f0); border-radius:14px; padding:18px 20px; margin-bottom:0; box-shadow:0 2px 6px rgba(0,0,0,0.03); text-align:left;">
        <div class="qa-q" style="display:flex; align-items:flex-start; gap:10px; margin:0 0 12px 0; padding:0; text-align:left;">
          <span class="qno" style="flex-shrink:0; width:28px; height:28px; border-radius:8px; background:var(--primary-soft,#eff6ff); color:var(--primary,#2563eb); font-weight:800; font-size:0.88rem; display:inline-flex; align-items:center; justify-content:center; line-height:1; box-sizing:border-box; margin-top:1px;">${n}</span>
          <span class="qtext" style="flex:1; font-weight:500; font-size:0.96rem; color:var(--ink,#0f172a); line-height:1.55; text-align:left; margin:0; padding:0;">${catChip}${formatMath(qtext)}</span>
        </div>
        ${media}
        ${fopts ? figureOptionsHTML(q) : examOptionsHTML(q, lang)}
        ${atext ? `<div class="qa-a" style="margin:10px 0 0 0; padding:0; display:flex; align-items:flex-start; gap:6px; text-align:left;">
          <span class="a-label" style="font-weight:700; color:var(--primary,#2563eb); flex-shrink:0; font-size:0.92rem;">${t("topic.answer")}:</span>
          <span class="a-body" style="font-weight:600; color:var(--ink,#0f172a); line-height:1.45; font-size:0.92rem; text-align:left;">${formatMath(atext)}</span>
        </div>` : ""}
        ${explanation ? `
          <div class="qa-exp" style="margin-top:8px; padding:0; font-size:0.86rem; color:var(--ink-muted,#64748b); line-height:1.45; text-align:left;">
            <b style="color:var(--ink,#0f172a);">${lang === "as" ? "ব্যাখ্যা" : "Explanation"}:</b> ${formatMath(explanation)}
          </div>` : ""}
      </article>`;
  }

  function examBodyHTML(data, sec, lang) {
    const type = data.type || (sec && sec.type) || "qa";

    if (type === "syllabus" || (data.chapters && data.chapters.length)) {
      const chapters = data.chapters || [];
      if (!chapters.length) return `<div class="qa-empty"><p>${escapeHtml(t("exams.noContent"))}</p></div>`;
      return `<div class="ebk-chapters">${chapters.map((c, i) => `
        <section class="ebk-chapter" id="exam-ch-${i}">
          <h3 class="ebk-ch-title"><span class="ebk-ch-no">${i + 1}</span>${escapeHtml(ebkLang(c.title, lang))}</h3>
          <div class="ebk-ch-body">${ebkContentHTML(ebkLang(c.content, lang))}</div>
        </section>`).join("")}</div>`;
    }

    const qs = Array.isArray(data.questions) ? data.questions : [];
    if (!qs.length) return `<div class="qa-empty"><p>${escapeHtml(t("exams.noContent"))}</p></div>`;

    return `<div class="qa-list">${qs.map((q, i) => examQACardHTML(q, i + 1, lang)).join("")}</div>`;
  }

  async function renderExamSectionPage(main, examId, sectionId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    await getExamsList();
    const exam = findExam(examId);
    const sec = exam ? (exam.sections || []).find((s) => s.id === sectionId) : null;

    if (!exam || !sec) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${escapeHtml(t("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${t("exams.backToExams")}</a></div>
        </div>`;
      return;
    }

    const subs = Array.isArray(sec.subcategories) ? sec.subcategories : [];
    if (subs.length) {
      const color = examColor(exam, sec);
      const examEn = ebkLang(exam.title, "en");
      const secEn = ebkLang(sec.title, "en");
      const secAs = ebkLang(sec.title, "as");
      main.innerHTML = `
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
            <span>${escapeHtml(secEn)}</span>
          </nav>
          <h1>${escapeHtml(secEn)}${secAs && secAs !== secEn ? ` <span class="exam-head-as">${escapeHtml(secAs)}</span>` : ""}</h1>
          <p class="exams-choose">${t("exams.subCategories")}</p>
        </div>
        <section class="section" style="padding-bottom:46px;">
          <div class="sub-grid exam-sec-grid" style="--cat:${color}">
            ${subs.map((sub, i) => examSubcategoryCardHTML(exam, sec, sub, i)).join("")}
          </div>
          <p class="ebooks-note">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${escapeHtml(t("exams.readOnly"))}
          </p>
        </section>`;
      observeReveals();
      hydrateExamCardCounts(main, exam);
      return;
    }

    let data = null;
    try { data = await API.getExamSection(examId, sectionId); } catch (e) { data = null; }

    const color = examColor(exam, sec);
    const examEn = ebkLang(exam.title, "en");
    const secEn = ebkLang(sec.title, "en");

    if (!data) {
      main.innerHTML = `
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
            <span>${escapeHtml(secEn)}</span>
          </nav>
          <h1>${escapeHtml(secEn)}</h1>
        </div>
        <div class="qa-empty"><div class="big">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>
        </div><p>${escapeHtml(t("exams.noContent"))}</p>
        <div style="margin-top:16px;"><a class="btn btn-outline btn-sm" href="/exams/${encodeURIComponent(examId)}">${t("exams.backToExams")}</a></div></div>`;
      return;
    }

    const readLang = state.lang === "as" ? "as" : "en";
    const titleD = ebkLang(data.title, "en") || secEn;
    const titleDAs = ebkLang(data.title, "as") || ebkLang(sec.title, "as");
    const descD = localized(data.description);
    const isSyllabus = (data.type || sec.type) === "syllabus";

    main.innerHTML = `
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(titleD)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${color};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${escapeHtml(examEn)}</span>
              <span class="ebk-chip">${escapeHtml(isSyllabus ? t("exams.syllabus") : t("exams.questions"))}</span>
            </div>
            <h2 class="ebk-head-title">${escapeHtml(titleD)}${titleDAs && titleDAs !== titleD ? `<span class="ebk-head-title-as">${escapeHtml(titleDAs)}</span>` : ""}</h2>
            ${descD ? `<p class="ebk-desc">${escapeHtml(descD).replace(/\n/g, "<br>")}</p>` : ""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${escapeHtml(t("exams.readOnly"))}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${readLang === "as" ? "active" : ""}" data-exlang="as">${t("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${readLang === "en" ? "active" : ""}" data-exlang="en">${t("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="/exams/${encodeURIComponent(examId)}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${t("exams.backToExams")}
          </a>
          <p class="ebk-no-pdf">${escapeHtml(t("exams.readOnly"))}</p>
        </div>
      </div>`;

    const body = $("#exam-body");
    const paint = (lang) => { if (body) body.innerHTML = examBodyHTML(data, sec, lang); };
    paint(readLang);
    showEbookProgress(color);

    $$(".lang-btn", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.exlang;
        $$(".lang-btn", main).forEach((x) => x.classList.toggle("active", x.dataset.exlang === target));
        paint(target);
        scheduleEbkProgress();
      });
    });
  }

  async function renderExamSubcategoryPage(main, examId, sectionId, subId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    await getExamsList();
    const exam = findExam(examId);
    const sec = exam ? (exam.sections || []).find((s) => s.id === sectionId) : null;
    const sub = sec ? (sec.subcategories || []).find((s) => s.id === subId) : null;

    if (!exam || !sec || !sub) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${escapeHtml(t("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${t("exams.backToExams")}</a></div>
        </div>`;
      return;
    }

    const childSubs = Array.isArray(sub.subcategories) ? sub.subcategories : [];
    if (childSubs.length) {
      const color = examColor(exam, sec);
      const examEn = ebkLang(exam.title, "en");
      const secEn = ebkLang(sec.title, "en");
      const subEn = ebkLang(sub.title, "en");
      const subAs = ebkLang(sub.title, "as");
      const secHref = `/exams/${encodeURIComponent(examId)}/${encodeURIComponent(sectionId)}`;
      main.innerHTML = `
        <div class="page-head">
          <nav class="breadcrumb">
            <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
            <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
            <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
            <a href="${secHref}">${escapeHtml(secEn)}</a><span class="bc-sep">/</span>
            <span>${escapeHtml(subEn)}</span>
          </nav>
          <h1>${escapeHtml(subEn)}${subAs && subAs !== subEn ? ` <span class="exam-head-as">${escapeHtml(subAs)}</span>` : ""}</h1>
          <p class="exams-choose">${t("exams.subCategories")}</p>
        </div>
        <section class="section" style="padding-bottom:46px;">
          <div class="sub-grid exam-sec-grid" style="--cat:${color}">
            ${childSubs.map((child, i) => examSubcategoryCardHTML(exam, sec, child, i, sub.id)).join("")}
          </div>
          <p class="ebooks-note">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${escapeHtml(t("exams.readOnly"))}
          </p>
        </section>`;
      observeReveals();
      hydrateExamCardCounts(main, exam);
      return;
    }

    const color = examColor(exam, sec);
    const examEn = ebkLang(exam.title, "en");
    const secEn = ebkLang(sec.title, "en");
    const subEn = ebkLang(sub.title, "en");
    const subAs = ebkLang(sub.title, "as");
    const secHref = `/exams/${encodeURIComponent(examId)}/${encodeURIComponent(sectionId)}`;

    let questions = [];
    try { questions = await API.listExamQuestions(examId, sectionId, subId); } catch (e) { questions = []; }
    if (!Array.isArray(questions)) questions = [];

    const readLang = state.lang === "as" ? "as" : "en";
    const count = questions.length;

    main.innerHTML = `
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
          <a href="${secHref}">${escapeHtml(secEn)}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(subEn)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${color};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${escapeHtml(examEn)}</span>
              <span class="ebk-chip">${escapeHtml(t("exams.practice"))}</span>
            </div>
            <h2 class="ebk-head-title">${escapeHtml(subEn)}${subAs && subAs !== subEn ? `<span class="ebk-head-title-as">${escapeHtml(subAs)}</span>` : ""}</h2>
            ${count ? `<p class="ebk-desc">${count} ${escapeHtml(t("exams.questionCount"))}</p>` : ""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${escapeHtml(t("exams.readOnly"))}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${readLang === "as" ? "active" : ""}" data-exlang="as">${t("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${readLang === "en" ? "active" : ""}" data-exlang="en">${t("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="${secHref}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${t("exams.backToSection")}
          </a>
          <p class="ebk-no-pdf">${escapeHtml(t("exams.readOnly"))}</p>
        </div>
      </div>`;

    const body = $("#exam-body");
    const paint = (lang) => {
      if (!body) return;
      if (!count) {
        body.innerHTML = `<div class="qa-empty"><p>${escapeHtml(t("exams.noContent"))}</p></div>`;
        return;
      }
      body.innerHTML = `<div class="qa-list">${questions.map((q, i) => examQACardHTML(q, i + 1, lang)).join("")}</div>`;
    };
    paint(readLang);
    showEbookProgress(color);

    $$(".lang-btn", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.exlang;
        $$(".lang-btn", main).forEach((x) => x.classList.toggle("active", x.dataset.exlang === target));
        paint(target);
        scheduleEbkProgress();
      });
    });
  }

  async function renderExamSubSubcategoryPage(main, examId, sectionId, subId, childId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    await getExamsList();
    const exam = findExam(examId);
    const sec = exam ? (exam.sections || []).find((s) => s.id === sectionId) : null;
    const sub = sec ? (sec.subcategories || []).find((s) => s.id === subId) : null;
    const child = sub ? (sub.subcategories || []).find((s) => s.id === childId) : null;

    if (!exam || !sec || !sub || !child) {
      main.innerHTML = `
        <div class="page-head" style="text-align:center; max-width:720px; margin:0 auto; padding:40px 16px; box-sizing:border-box;">
          <h1>${t("exams.title")}</h1>
          <p class="page-desc" style="margin:12px auto 0 auto; text-align:center;">${escapeHtml(t("exams.noExam"))}</p>
          <div style="margin-top:20px;"><a class="btn btn-accent" href="/exams">${t("exams.backToExams")}</a></div>
        </div>`;
      return;
    }

    const color = examColor(exam, sec);
    const examEn = ebkLang(exam.title, "en");
    const secEn = ebkLang(sec.title, "en");
    const subEn = ebkLang(sub.title, "en");
    const childEn = ebkLang(child.title, "en");
    const childAs = ebkLang(child.title, "as");
    const secHref = `/exams/${encodeURIComponent(examId)}/${encodeURIComponent(sectionId)}`;
    const subHref = `${secHref}/${encodeURIComponent(subId)}`;

    let questions = [];
    try { questions = await API.listExamQuestions(examId, sectionId, subId, childId); } catch (e) { questions = []; }
    if (!Array.isArray(questions)) questions = [];

    const readLang = state.lang === "as" ? "as" : "en";
    const count = questions.length;

    main.innerHTML = `
      <div class="page-head ebk-page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/exams">${t("nav.exams")}</a><span class="bc-sep">/</span>
          <a href="/exams/${encodeURIComponent(examId)}">${escapeHtml(examEn)}</a><span class="bc-sep">/</span>
          <a href="${secHref}">${escapeHtml(secEn)}</a><span class="bc-sep">/</span>
          <a href="${subHref}">${escapeHtml(subEn)}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(childEn)}</span>
        </nav>
      </div>
      <div class="ebk-reader" style="--ebk:${color};">
        <header class="ebk-head-card ebk-head-clean">
          <div class="ebk-head-info">
            <div class="ebk-chips">
              <span class="ebk-chip ebk-chip-solid">${escapeHtml(examEn)}</span>
              <span class="ebk-chip">${escapeHtml(t("exams.practice"))}</span>
            </div>
            <h2 class="ebk-head-title">${escapeHtml(childEn)}${childAs && childAs !== childEn ? `<span class="ebk-head-title-as">${escapeHtml(childAs)}</span>` : ""}</h2>
            ${count ? `<p class="ebk-desc">${count} ${escapeHtml(t("exams.questionCount"))}</p>` : ""}
          </div>
        </header>

        <div class="ebk-read-toolbar">
          <div class="ebk-instruct">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            ${escapeHtml(t("exams.readOnly"))}
          </div>
          <div class="lang-switch ebk-tswitch" role="group" aria-label="Reading language">
            <button type="button" class="lang-btn ${readLang === "as" ? "active" : ""}" data-exlang="as">${t("topic.lang.as")}</button>
            <button type="button" class="lang-btn ${readLang === "en" ? "active" : ""}" data-exlang="en">${t("topic.lang.en")}</button>
          </div>
        </div>

        <div id="exam-body"></div>

        <div class="ebk-reader-foot">
          <a class="btn btn-outline btn-sm" href="${subHref}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            ${escapeHtml(t("exams.backToSection"))}
          </a>
          <p class="ebk-no-pdf">${escapeHtml(t("exams.readOnly"))}</p>
        </div>
      </div>`;

    const body = $("#exam-body");
    const paint = (lang) => {
      if (!body) return;
      if (!count) {
        body.innerHTML = `<div class="qa-empty"><p>${escapeHtml(t("exams.noContent"))}</p></div>`;
        return;
      }
      body.innerHTML = `<div class="qa-list">${questions.map((q, i) => examQACardHTML(q, i + 1, lang)).join("")}</div>`;
    };
    paint(readLang);
    showEbookProgress(color);

    $$(".lang-btn", main).forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.exlang;
        $$(".lang-btn", main).forEach((x) => x.classList.toggle("active", x.dataset.exlang === target));
        paint(target);
        scheduleEbkProgress();
      });
    });
  }

  /* ================= Download App (APK) ================= */
  function renderDownloadAppPage(main) {
    const features = [
      ["All Mock Tests", "Timed chapter-wise mock tests with instant score and review, exactly like the real exam."],
      ["Bilingual Q&A Practice", "Practice questions, answers and explanations in both English and Assamese."],
      ["E-Books On the Go", "Read every subject e-book right inside the app — Assam History, Polity, Geography and more."],
      ["Previous Year Papers", "Solved past papers organised by exam and year for focused revision."],
      ["PDF Notes & Downloads", "Save study material and keep it ready for offline revision."],
      ["Lightweight & Fast", "The complete axomexam experience in a tiny 389 KB app."]
    ];
    const feats = features.map(([title, text]) => `
        <div class="appdl-feature">
          <span class="appdl-ico"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
          <h3>${title}</h3>
          <p>${text}</p>
        </div>`).join("");

    const faqs = [
      ["Is the axomexam app free?", "Yes. The app is 100% free with no sign-up, subscription or hidden charges."],
      ["Why is it not on the Google Play Store?", "We distribute the app as a direct APK download so it stays free for every aspirant. A Play Store release may come later."],
      ["Do I need an internet connection?", "Yes. Study content, mock tests and notes are loaded online, so an active connection is required."],
      ["Is it safe to install?", "Yes. This is our own official build. For your safety, download it only from this page (axomexam.in)."],
      ["Which Android versions are supported?", "The app works on modern Android phones with an up-to-date Android System WebView."]
    ];
    const faqHTML = faqs.map(([q, a]) => `
        <details class="appdl-faq">
          <summary>${q}</summary>
          <p>${a}</p>
        </details>`).join("");

    main.innerHTML = `
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
        <div class="appdl-grid">${feats}</div>
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
        <div class="appdl-faqs">${faqHTML}</div>
      </section>

      <section class="section">
        <div class="appdl-safety">
          <b>Safety &amp; disclaimer:</b> For your security, download the app only from this official page (axomexam.in). axomexam is NOT an official app of APSC, Assam Police, SSC, Railway, ADRE or any government body. All exam names and trademarks belong to their respective owners. This is an independent study aid.
        </div>
      </section>`;
    const dlLink = main.querySelector(".appdl-download");
    if (dlLink) dlLink.addEventListener("click", markAppPromptDone);
    observeReveals();
  }

  /* ================= Previous Year Questions ================= */
  async function renderPreviousYear(main, segs) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("load.loading")}</p></div>`;
    if (segs.length === 1) return renderPreviousYearExams(main);
    const exam = ((typeof CONFIG !== "undefined" && CONFIG.PYEAR_EXAMS) || []).find((e) => e.id === segs[1]);
    if (!exam) return render404(main);

    const children = Array.isArray(exam.children) ? exam.children : [];
    const hasChildren = children.length > 0;

    if (hasChildren) {
      if (segs.length === 2) return renderPreviousYearSubExams(main, exam, children);
      const subExam = children.find((c) => c.id === segs[2]);
      if (!subExam) return render404(main);
      if (segs.length === 3) {
        const years = await API.listPreviousYearYears(exam.id, subExam.id);
        return renderPreviousYearYears(main, subExam, years, exam);
      }
      const year = segs[3];
      const files = await API.listPreviousYearPdfs(exam.id, year, subExam.id);
      return renderPreviousYearPapers(main, subExam, year, files, exam);
    }

    if (segs.length === 2) {
      const years = await API.listPreviousYearYears(exam.id);
      return renderPreviousYearYears(main, exam, years);
    }
    const year = segs[2];
    const files = await API.listPreviousYearPdfs(exam.id, year);
    renderPreviousYearPapers(main, exam, year, files);
  }

  function renderPreviousYearSubExams(main, exam, children) {
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${t("page.previous-year.title")}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(exam.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(exam.name))}</h1>
        <p class="page-desc">${t("pyear.chooseSection.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="section-head"><div><h2>${t("pyear.chooseSection")}</h2></div></div>
        <div class="sub-grid">
          ${children.map((c, i) => `
            <a class="sub-card reveal" href="/previous-year/${exam.id}/${c.id}" style="--cat:${c.color || exam.color}" data-delay="${i * 40}">
              <span class="sub-ico">${escapeHtml(c.icon || c.id.slice(0, 2).toUpperCase())}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(c.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${t("pyear.years")}</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
    autoSeo(main, {
      id: exam.id,
      name: localized(exam.name) + " Previous Year Papers",
      count: children.length,
      h2: localized(exam.name) + " Previous Year Question Papers",
      items: children.map((c) => ({ name: localized(c.name), count: 0 }))
    });
  }

  function renderPreviousYearExams(main) {
    const exams = (typeof CONFIG !== "undefined" && CONFIG.PYEAR_EXAMS) || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span><span>${t("page.previous-year.title")}</span></nav>
        <h1>${t("page.previous-year.title")}</h1>
        <p class="page-desc">${t("page.previous-year.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${exams.length ? `
          <div class="section-head"><div><h2>${t("pyear.choose")}</h2><p class="sec-sub">${t("pyear.choose.sub")}</p></div></div>
          <div class="sub-grid">
            ${exams.map((ex, i) => `
              <a class="sub-card reveal" href="/previous-year/${ex.id}" style="--cat:${ex.color}" data-delay="${i * 40}">
                <span class="sub-ico">${escapeHtml(ex.icon || ex.id.slice(0, 2).toUpperCase())}</span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(ex.name))}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${t("pyear.years")}</span>
                </span>
              </a>`).join("")}
          </div>` : `<div class="info-panel"><p>${t("downloads.none")}</p></div>`}
      </section>`;
    observeReveals();
    autoSeo(main, {
      name: "Previous Year Question Papers",
      noDefaults: true,
      h2: "Previous Year Question Papers for Assam and Central Exams",
      info: "Solving previous year papers is the fastest way to understand the real difficulty of an examination. On this page you can download original question papers year by year for Assam Police, DHS and DME, Guwahati High Court, Railway and SSC recruitment. Use them to identify repeated topics, judge the weight of each section and plan your revision with evidence rather than guesswork.",
      items: exams.map((ex) => ({ name: localized(ex.name), count: 0 })),
      tips: [
        "Attempt the paper once under a timer without looking at any notes.",
        "Compare your answers with the official key and list every repeated topic.",
        "Shortlist the two or three sections where you lost the most marks.",
        "Reattempt the same paper after two weeks to confirm real improvement."
      ],
      faqs: [
        { q: "Are these the original previous year question papers?", a: "Yes. Each PDF is a compiled question paper for the mentioned exam and year, provided for practice and revision." },
        { q: "Can I download the papers for offline practice?", a: "Yes. Every paper can be downloaded as a PDF and used on a mobile or printed copy for offline practice." },
        { q: "Do previous year papers repeat in the actual exam?", a: "Exact questions rarely repeat, but the topics, difficulty level and question style repeat often. That is why solving them is so useful." }
      ]
    });
  }

  function renderPreviousYearYears(main, exam, years, parent) {
    const parentCrumb = parent
      ? `<a href="/previous-year/${parent.id}">${escapeHtml(localized(parent.name))}</a><span class="bc-sep">/</span>`
      : "";
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${t("page.previous-year.title")}</a><span class="bc-sep">/</span>
          ${parentCrumb}
          <span>${escapeHtml(localized(exam.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(exam.name))}</h1>
        <p class="page-desc">${t("pyear.chooseYear")}</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        ${years.length ? `
          <div class="sub-grid">
            ${years.map((yr, i) => `
              <a class="sub-card reveal" href="/previous-year/${parent ? parent.id + "/" : ""}${exam.id}/${yr}" style="--cat:${exam.color}" data-delay="${i * 50}">
                <span class="sub-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/></svg></span>
                <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                  <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(yr)}</span>
                  <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${t("pyear.papers")}</span>
                </span>
              </a>`).join("")}
          </div>` : `<div class="info-panel"><p>${t("pyear.noYears")}</p></div>`}
      </section>`;
    observeReveals();
    autoSeo(main, {
      id: exam.id,
      name: localized(exam.name) + " previous year papers",
      count: years.length,
      h2: localized(exam.name) + " Previous Year Papers by Year",
      items: years.map((yr) => ({ name: String(yr), count: 0 }))
    });
  }

  function renderPreviousYearPapers(main, exam, year, files, parent) {
    const examHref = parent ? `/previous-year/${parent.id}/${exam.id}` : `/previous-year/${exam.id}`;
    const parentCrumb = parent
      ? `<a href="/previous-year/${parent.id}">${escapeHtml(localized(parent.name))}</a><span class="bc-sep">/</span>`
      : "";
    const card = (f) => `
      <div class="dl-item">
        <span class="dl-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></span>
        <span class="dl-meta"><b>${escapeHtml(f.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "))}</b><span>${escapeHtml(localized(exam.name))} • ${escapeHtml(year)}</span></span>
        <a class="dl-btn dl-save" href="${f.url}" download target="_blank" rel="noopener" style="text-transform:none;">Download</a>
      </div>`;

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">${t("breadcrumb.home")}</a><span class="bc-sep">/</span>
          <a href="/previous-year">${t("page.previous-year.title")}</a><span class="bc-sep">/</span>
          ${parentCrumb}
          <a href="${examHref}">${escapeHtml(localized(exam.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(year)}</span>
        </nav>
        <h1>${escapeHtml(localized(exam.name))} — ${escapeHtml(year)}</h1>
        <p class="page-desc">${t("page.downloads.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:44px;">
        ${files.length ? `<div class="dl-list">${files.map(card).join("")}</div>` : `<div class="info-panel"><p>${t("pyear.none")}</p></div>`}
      </section>`;
    autoSeo(main, {
      id: exam.id,
      name: localized(exam.name) + " " + year + " question paper",
      count: files.length,
      h2: localized(exam.name) + " " + year + " Question Paper",
      items: files.map((f) => ({ name: f.name.replace(/\.pdf$/i, "").replace(/[-_]+/g, " "), count: 0 })),
      faqs: [
        { q: "Is the " + localized(exam.name) + " " + year + " paper a solved or unsolved paper?", a: "The PDF contains the question paper for practice. Attempt it first, then cross-check your answers with the relevant answer key or study notes on axomexam.in." },
        { q: "Can I download the " + localized(exam.name) + " " + year + " paper?", a: "Yes. Use the download button beside the paper to save the PDF for offline practice." }
      ]
    });
  }

  /* ================= Submit Q&A page ================= */
  function renderSubmitPage(main) {
    main.innerHTML = `
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
    `;

    const i18nSubmit = {
      en: {
        title: "Submit Q&A Note", desc: "Contribute notes or feedback for aspirants.",
        name: "Your Name", namePh: "e.g. Rahul Borah", email: "Email Address", emailPh: "name@example.com",
        topic: "Subject / Topic (Optional)", topicPh: "e.g. Assam History, Science",
        question: "Question (Optional)", questionPh: "Type the question here...",
        answer: "Answer / Message (Optional)", answerPh: "Provide complete answer, steps or message...",
        captcha: "Security:", captchaPh: "Ans", btn: "Submit", submitting: "Submitting...",
        captchaError: "Incorrect math answer! Please try again.", popTitle: "Sent Successfully!", popDesc: "Your message has been received."
      },
      as: {
        title: "প্ৰশ্ন প্ৰেৰণ কৰক (Submit Q&A)", desc: "প্ৰশ্ন বা বাৰ্তা জমা দি শিক্ষাৰ্থীসকলক সহায় কৰক।",
        name: "আপোনাৰ নাম", namePh: "যেনে: ৰাহুল বৰা", email: "ইমেইল ঠিকনা", emailPh: "name@example.com",
        topic: "বিষয় / অধ্যায় (ঐচ্ছিক)", topicPh: "যেনে: অসম বুৰঞ্জী, বিজ্ঞান",
        question: "প্ৰশ্ন (ঐচ্ছিক)", questionPh: "প্ৰশ্নটো ইয়াত লিখক...",
        answer: "উত্তৰ বা বাৰ্তা (ঐচ্ছিক)", answerPh: "সম্পূৰ্ণ উত্তৰ বা বাৰ্তা ইয়াত লিখক...",
        captcha: "সুৰক্ষা:", captchaPh: "উত্তৰ", btn: "জমা দিয়ক", submitting: "প্ৰেৰণ হৈ আছে...",
        captchaError: "অংকৰ উত্তৰ ভুল হৈছে! পুনৰ চেষ্টা কৰক।", popTitle: "সফলতাৰে প্ৰেৰণ হ'ল!", popDesc: "আপোনাৰ বাৰ্তা লাভ কৰা হৈছে।"
      }
    };

    let currentFormLang = "en";
    let correctCaptcha = 0;

    function generateCaptcha() {
      const num1 = Math.floor(Math.random() * 9) + 1;
      const num2 = Math.floor(Math.random() * 9) + 1;
      correctCaptcha = num1 + num2;
      $("#math-expression").textContent = `${num1} + ${num2} = ?`;
      $("#captcha-answer").value = "";
    }

    function updateFormLanguage(lang) {
      currentFormLang = lang;
      const btnEn = $("#btn-en");
      const btnAs = $("#btn-as");

      if (lang === "en") {
        btnEn.style.background = "#2563eb"; btnEn.style.color = "#ffffff";
        btnAs.style.background = "transparent"; btnAs.style.color = "var(--ink-soft,#64748b)";
      } else {
        btnAs.style.background = "#2563eb"; btnAs.style.color = "#ffffff";
        btnEn.style.background = "transparent"; btnEn.style.color = "var(--ink-soft,#64748b)";
      }

      const tObj = i18nSubmit[lang];
      $("#txt-title").textContent = tObj.title; $("#txt-desc").textContent = tObj.desc;
      $("#lbl-name").textContent = tObj.name; $("#name").placeholder = tObj.namePh;
      $("#lbl-email").textContent = tObj.email; $("#email").placeholder = tObj.emailPh;
      $("#lbl-topic").textContent = tObj.topic; $("#subject").placeholder = tObj.topicPh;
      $("#lbl-question").textContent = tObj.question; $("#question").placeholder = tObj.questionPh;
      $("#lbl-answer").textContent = tObj.answer; $("#answer").placeholder = tObj.answerPh;
      $("#lbl-captcha").textContent = tObj.captcha; $("#captcha-answer").placeholder = tObj.captchaPh;
      $("#txt-btn").textContent = tObj.btn; $("#pop-title").textContent = tObj.popTitle; $("#pop-desc").textContent = tObj.popDesc;
    }

    function showSuccessPopup() {
      const popup = $("#successPopup");
      popup.style.display = "grid"; popup.style.opacity = "1";
      setTimeout(() => {
        popup.style.opacity = "0"; setTimeout(() => { popup.style.display = "none"; }, 200);
      }, 2000);
    }

    $("#btn-en").addEventListener("click", () => updateFormLanguage("en"));
    $("#btn-as").addEventListener("click", () => updateFormLanguage("as"));
    $("#btn-refresh-captcha").addEventListener("click", generateCaptcha);

    $("#qaForm").addEventListener("submit", async function(e) {
      e.preventDefault();
      const errorEl = $("#form-error");
      errorEl.style.display = "none";
      const userCaptcha = parseInt($("#captcha-answer").value, 10);
      if (userCaptcha !== correctCaptcha) {
        errorEl.textContent = i18nSubmit[currentFormLang].captchaError;
        errorEl.style.display = "block"; generateCaptcha(); return;
      }

      const submitBtn = $("#submitBtn"); const txtBtn = $("#txt-btn");
      submitBtn.disabled = true; txtBtn.textContent = i18nSubmit[currentFormLang].submitting;

      const topicVal = $("#subject").value.trim() || "General Note";
      const questionVal = $("#question").value.trim() || "N/A";
      const answerVal = $("#answer").value.trim() || "N/A";

      const payload = {
        apiKey: "sf_304846a9720d7354070bd57c",
        replyTo: "axomexam@outlook.com",
        name: $("#name").value.trim(),
        email: $("#email").value.trim(),
        subject: `[axomexam Submission] ${topicVal}`,
        message: `Topic: ${topicVal}\n\nQuestion:\n${questionVal}\n\nAnswer/Message:\n${answerVal}\n\nSent to: axomexam@outlook.com`
      };

      try {
        const response = await fetch("https://api.staticforms.dev/submit", {
          method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (data.success) {
          $("#qaForm").reset(); generateCaptcha(); showSuccessPopup();
        } else {
          errorEl.textContent = data.message || "Failed to submit. Please try again."; errorEl.style.display = "block";
        }
      } catch (err) {
        errorEl.textContent = "Network error. Please check your connection."; errorEl.style.display = "block";
      } finally {
        submitBtn.disabled = false; txtBtn.textContent = i18nSubmit[currentFormLang].btn;
      }
    });

    generateCaptcha();
  }

  /* ================= MOCK TEST SYSTEM ================= */
  function getTopicsForMockFilter(cat, subId, secId, topicId) {
    const matched = [];
    state.topicIndex.forEach((rec) => {
      if (rec.cat.id !== cat.id) return;
      if (subId && subId !== "all" && (!rec.sub || rec.sub.id !== subId)) return;
      if (secId && (!rec.section || rec.section.id !== secId)) return;
      if (topicId && rec.topic.id !== topicId) return;
      matched.push(rec);
    });
    return matched;
  }

  async function collectQuestionsForMock(cat, subId, secId, topicId) {
    const matchedTopics = getTopicsForMockFilter(cat, subId, secId, topicId);
    if (!matchedTopics.length) return [];

    const results = await Promise.all(
      matchedTopics.map((rec) =>
        API.getTopic(rec.cat.id, rec.topic.id, rec.sub && rec.sub.id, rec.cat && rec.cat.contentLayout)
          .then((d) => ({ d, rec }))
          .catch(() => null)
      )
    );

    const rawList = [];
    results.forEach((r) => {
      if (!r || !r.d) return;
      const list = Array.isArray(r.d) ? r.d : (Array.isArray(r.d.questions) ? r.d.questions : []);
      list.forEach((qItem) => {
        const qTextObj = {
          en: extractField(qItem, "question", "en"),
          as: extractField(qItem, "question", "as")
        };

        const aTextObj = {
          en: extractField(qItem, "answer", "en"),
          as: extractField(qItem, "answer", "as")
        };

        const optsEn = getOptionsList(qItem, "en");
        const optsAs = getOptionsList(qItem, "as");
        const rawOpts = Array.isArray(qItem.options) ? qItem.options : [];
        let optionsList = [];

        if (optsEn.length || optsAs.length) {
          const maxLen = Math.max(optsEn.length, optsAs.length);
          for (let i = 0; i < maxLen; i++) {
            const src = rawOpts[i];
            optionsList.push({
              en: optsEn[i] || "",
              as: optsAs[i] || "",
              fig: src && typeof src === "object" && typeof src.fig === "string" ? src.fig : ""
            });
          }
        }

        let correctIdx = 0;
        if (typeof qItem.correct === "string") {
          const letter = qItem.correct.trim().toLowerCase();
          const charCode = letter.charCodeAt(0);
          if (charCode >= 97 && charCode <= 101) correctIdx = charCode - 97;
        } else if (typeof qItem.a === "string") {
          const letter = qItem.a.trim().toLowerCase();
          const charCode = letter.charCodeAt(0);
          if (charCode >= 97 && charCode <= 101) correctIdx = charCode - 97;
        } else if (Number.isInteger(qItem.correct_index)) {
          correctIdx = qItem.correct_index;
        } else if (Number.isInteger(qItem.correct)) {
          correctIdx = qItem.correct;
        } else if (Number.isInteger(qItem.answer)) {
          correctIdx = qItem.answer;
        }

        rawList.push({
          q: qTextObj,
          a: aTextObj,
          fig: typeof qItem.fig === "string" ? qItem.fig : "",
          table: qItem.table || null,
          options: optionsList.length >= 2 ? optionsList : null,
          correct: correctIdx,
          topicTitle: r.rec.title,
          catId: r.rec.cat.id,
        });
      });
    });

    return rawList;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function stopMockTimer() {
    if (state.mock && state.mock.timerId) {
      clearInterval(state.mock.timerId);
      state.mock.timerId = null;
    }
  }

  function showModalPopup({ title, message, confirmText, cancelText, onConfirm }) {
    const existing = $("#confirm-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "confirm-modal";
    modal.className = "read-modal";
    modal.innerHTML = `
      <div class="read-modal-backdrop"></div>
      <div class="read-modal-box" role="dialog" style="max-width:440px; padding:24px; text-align:center; height:max-content; margin:auto;">
        <h3 style="font-size:1.2rem; margin-bottom:10px;">${escapeHtml(title)}</h3>
        <p style="color:var(--ink-soft); font-size:.92rem; margin-bottom:20px;">${escapeHtml(message)}</p>
        <div style="display:flex; gap:10px; justify-content:center;">
          <button class="btn btn-outline" id="modal-cancel-btn" style="flex:1;">${escapeHtml(cancelText || "Cancel")}</button>
          <button class="btn btn-primary" id="modal-confirm-btn" style="flex:1;">${escapeHtml(confirmText || "Confirm")}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    $("#modal-cancel-btn", modal).addEventListener("click", () => modal.remove());
    $(".read-modal-backdrop", modal).addEventListener("click", () => modal.remove());
    $("#modal-confirm-btn", modal).addEventListener("click", () => {
      modal.remove();
      if (onConfirm) onConfirm();
    });
  }

  function mockSubcategories(cat) {
    if (!cat) return [];
    if (cat.id === "english") {
      return [
        { id: "grammar", name: { en: "Grammar", as: "ব্যাকৰণ" } },
        { id: "vocabulary", name: { en: "Vocabulary", as: "শব্দভাণ্ডাৰ" } }
      ];
    }
    if (cat.id === "computer") {
      return [
        { id: "comp-fundamentals", name: { en: "Fundamentals", as: "মৌলিক" } },
        { id: "ms-office", name: { en: "MS Office", as: "MS Office" } }
      ];
    }
    return cat.subcategories || [];
  }

  function isEnglishContent(segs) {
    if (!segs || !segs.length) return false;
    if (segs[0] === "category" && segs[1] === "english") return true;
    if (segs[0] === "topic" && segs[1] === "english") return true;
    if (segs[0] === "mock-test" && segs[1] === "english") return true;
    if (segs[0] === "category" && segs[1] === "articles" && segs[2] === "english") return true;
    return false;
  }

  function handleMockRouting(main, segs) {
    if (segs.length === 1) return renderMockCategoryPicker(main);

    const catId = segs[1];
    const cat = state.categories.find((c) => c.id === catId);
    if (!cat) return render404(main);

    const subId = segs[2];
    const secId = segs[3];
    const topicId = segs[4];

    if (subId && subId.startsWith("topic-") || segs.includes("start")) {
      return renderMockSetup(main, cat, subId, secId, topicId);
    }

    const subs = mockSubcategories(cat);
    if (!subId && subs.length) return renderMockSubcategoryPicker(main, cat);

    if (subId && !secId) {
      const sub = subs.find((s) => s.id === subId);
      if (sub) {
        return renderMockSubLevel(main, cat, sub);
      }
      return renderMockSetup(main, cat, subId, null, null);
    }

    if (subId && secId) {
      const sub = subs.find((s) => s.id === subId);
      if (!sub) return render404(main);

      /* Manual JSON mock test sets: /mock-test/<cat>/<sub>/set-<n> */
      if (/^set-\d+$/.test(secId)) {
        const setNumber = parseInt(secId.replace("set-", ""), 10);
        if (!(setNumber >= 1 && setNumber <= MAX_MOCK_SETS)) return render404(main);
        return renderMockSetDifficulty(main, cat, sub, setNumber);
      }

      const sec = (sub.sections || []).find((sc) => sc.id === secId);
      if (sec && sec.topics && sec.topics.length) {
        return renderMockTopicPicker(main, cat, sub, sec);
      }
      return renderMockSetup(main, cat, subId, secId, null);
    }

    return renderMockSetup(main, cat, null, null, null);
  }

  /* Subcategory landing: show manual JSON sets when available,
     otherwise fall back to the old section / topic flow. */
  async function renderMockSubLevel(main, cat, sub) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("mock.loading")}</p></div>`;
    const sets = await detectMockSets(cat.id, sub.id);
    return renderMockSetPicker(main, cat, sub, sets);
  }

  function renderMockCategoryPicker(main) {
    const mockCategories = state.categories.filter(c => c.id !== "study-guides" && c.id !== "articles");

    main.innerHTML = `
      <div class="mock-intro">
        <h1>${t("mock.title")}</h1>
        <p class="page-desc">${t("mock.sub")}</p>
      </div>
      <section class="section" style="padding-bottom:30px;">
        <div class="section-head"><div><h2>${t("mock.pick")}</h2><p class="sec-sub">${t("mock.pick.sub")}</p></div></div>
        <div class="mock-grid">
          ${mockCategories.map((c, i) => {
            const color = catColor(c.id);
            return `
              <div class="mock-card reveal" style="--cat:${color}" data-delay="${i * 40}">
                <div class="mock-top">
                  <span class="mock-ico">${catIconHTML(c.id)}</span>
                  <span>
                    <b>${escapeHtml(localized(c.name))}</b>
                    <span class="mock-count">${t("mock.practicing")}</span>
                  </span>
                </div>
                <div class="mock-go">
                  <a class="mock-start" href="/mock-test/${c.id}">
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    ${t("mock.start")}
                  </a>
                </div>
              </div>`;
          }).join("")}
        </div>
      </section>`;
    observeReveals();
    autoSeo(main, {
      name: "Mock Tests",
      noDefaults: true,
      h2: "Timed Mock Tests for Assam Competitive Exams",
      info: "Each mock test on axomexam.in works like the real examination. A live timer runs while you attempt the questions, your score is calculated instantly, and every question is followed by a clear bilingual explanation. The sets are arranged subject-wise and paper-wise so you can practise exactly the section you are preparing for.",
      items: mockCategories.map((c) => ({ name: localized(c.name), count: countTopics(c) })),
      tips: [
        "Start with the subject you find hardest, so you have the most time to improve it.",
        "Attempt one full set under the timer before checking any answer.",
        "Maintain an error log of every wrong answer and revise it weekly.",
        "Increase the number of questions gradually once your accuracy is stable."
      ],
      faqs: [
        { q: "How does the online mock test work?", a: "Choose a subject, pick a paper and attempt the questions within the timer. Once you submit, you immediately see your score along with the correct answers and explanations." },
        { q: "Can I attempt the mock tests more than once?", a: "Yes. All mock tests are unlimited. You can reattempt any set as many times as you like at no cost." },
        { q: "Are the mock tests suitable for ADRE and Assam Police?", a: "Yes. The subjects and question patterns follow the syllabus of ADRE 2.0, Assam Police, APSC, Gauhati High Court, SSC and Railway recruitment exams." }
      ]
    });
  }

  function renderMockSubcategoryPicker(main, cat) {
    const subs = mockSubcategories(cat);
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(cat.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(cat.name))}</h1>
        <p class="page-desc">Choose a paper to begin your timed mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${subs.map((s, i) => `
            <a class="sub-card reveal" href="/mock-test/${cat.id}/${s.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
              <span class="sub-ico">${topicIconHTML(s.id, cat.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(s.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">Timed practice sets</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
    const mSubRecs = state.topicIndex.filter((r) => r.cat && r.cat.id === cat.id);
    autoSeo(main, {
      id: cat.id,
      name: localized(cat.name) + " Mock Test",
      count: subs.length,
      total: mSubRecs.reduce((a, r) => a + (r.nQuestions || 0), 0),
      h2: localized(cat.name) + " Mock Tests with Answers",
      items: subs.map((s) => ({ name: localized(s.name), count: 0 }))
    });
  }

  function renderMockSectionPicker(main, cat, sub) {
    const secs = sub.sections || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">Choose a section to begin your test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${secs.map((sec, i) => `
            <a class="sub-card reveal" href="/mock-test/${cat.id}/${sub.id}/${sec.id}" style="--cat:${catColor(cat.id)}" data-delay="${i * 50}">
              <span class="sub-ico">${topicIconHTML(sec.id, cat.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.94rem; color:var(--ink,#0f172a);">${escapeHtml(localized(sec.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">${(sec.topics || []).length} Topics</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
    autoSeo(main, {
      id: sub.id,
      name: localized(sub.name) + " Mock Test",
      count: secs.length,
      h2: localized(sub.name) + " Mock Test - " + localized(cat.name),
      items: secs.map((s) => ({ name: localized(s.name), count: (s.topics || []).length }))
    });
  }

  function renderMockTopicPicker(main, cat, sub, sec) {
    const topics = sec.topics || [];
    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(sec.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sec.name))}</h1>
        <p class="page-desc">Select a topic to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="sub-grid">
          ${topics.map((tp, i) => `
            <a class="sub-card reveal" href="/mock-test/${cat.id}/start" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
              <span class="sub-ico">${topicIconHTML(tp.id, cat.id)}</span>
              <span style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span style="font-weight:600; font-size:0.91rem; color:var(--ink,#0f172a);">${escapeHtml(localized(tp.name))}</span>
                <span style="font-size:0.75rem; color:var(--ink-soft,#64748b);">Take Mock Test</span>
              </span>
            </a>`).join("")}
        </div>
      </section>`;
    observeReveals();
    autoSeo(main, {
      id: sec.id,
      name: localized(sec.name) + " Mock Test",
      count: topics.length,
      h2: localized(sec.name) + " Mock Test Questions",
      items: topics.map((tp) => ({ name: localized(tp.name), count: 0 }))
    });
  }

  /* ================= Manual JSON Mock Test Sets ================= */

  function hasMockQuestions(data) {
    if (!data) return false;
    if (Array.isArray(data)) return data.length > 0;
    return Array.isArray(data.questions) && data.questions.length > 0;
  }

  /* Probe set-N.json files until the first gap to discover how many
     sets exist for a subcategory. Results are cached per session. */
  async function detectMockSets(catId, subId) {
    const cacheKey = catId + "/" + subId;
    if (state.mockSetCache[cacheKey]) return state.mockSetCache[cacheKey];

    const found = [];
    for (let n = 1; n <= MAX_MOCK_SETS; n++) {
      const data = await API.getMockSet(catId, subId, n);
      if (hasMockQuestions(data)) {
        found.push(n);
      } else {
        break;
      }
    }
    state.mockSetCache[cacheKey] = found;
    return found;
  }

  /* Normalise one question object from a manually uploaded set file
     into the internal quiz format used by the mock test engine. */
  function normalizeMockQuestion(item) {
    if (!item || typeof item !== "object") return null;

    const qTextObj = {
      en: extractField(item, "question", "en"),
      as: extractField(item, "question", "as")
    };
    if (!qTextObj.en && !qTextObj.as) return null;

    const aTextObj = {
      en: extractField(item, "answer", "en"),
      as: extractField(item, "answer", "as")
    };

    const optsEn = getOptionsList(item, "en");
    const optsAs = getOptionsList(item, "as");
    const rawOpts = Array.isArray(item.options) ? item.options : [];
    let optionsList = [];
    if (optsEn.length || optsAs.length) {
      const maxLen = Math.max(optsEn.length, optsAs.length);
      for (let i = 0; i < maxLen; i++) {
        const src = rawOpts[i];
        optionsList.push({
          en: optsEn[i] || "",
          as: optsAs[i] || "",
          fig: src && typeof src === "object" && typeof src.fig === "string" ? src.fig : ""
        });
      }
    }

    let correctIdx = 0;
    if (typeof item.correct === "string") {
      const letter = item.correct.trim().toLowerCase();
      const charCode = letter.charCodeAt(0);
      if (charCode >= 97 && charCode <= 101) correctIdx = charCode - 97;
    } else if (typeof item.a === "string") {
      const letter = item.a.trim().toLowerCase();
      const charCode = letter.charCodeAt(0);
      if (charCode >= 97 && charCode <= 101) correctIdx = charCode - 97;
    } else if (Number.isInteger(item.correct_index)) {
      correctIdx = item.correct_index;
    } else if (Number.isInteger(item.correct)) {
      correctIdx = item.correct;
    } else if (Number.isInteger(item.answer)) {
      correctIdx = item.answer;
    }

    let difficulty = String(item.difficulty || "medium").toLowerCase().trim();
    if (difficulty !== "easy" && difficulty !== "hard") difficulty = "medium";

    const expTextObj = {
      en: extractField(item, "explanation", "en"),
      as: extractField(item, "explanation", "as")
    };

    return {
      q: qTextObj,
      a: aTextObj,
      fig: typeof item.fig === "string" ? item.fig : "",
      table: item.table || null,
      options: optionsList.length >= 2 ? optionsList : null,
      correct: correctIdx,
      difficulty: difficulty,
      explanation: { en: expTextObj.en, as: expTextObj.as }
    };
  }

  async function loadMockSetQuestions(cat, sub, setNumber) {
    const data = await API.getMockSet(cat.id, sub.id, setNumber);
    if (!hasMockQuestions(data)) return null;
    const list = Array.isArray(data) ? data : (Array.isArray(data.questions) ? data.questions : []);
    const questions = list.map(normalizeMockQuestion).filter(Boolean);
    if (!questions.length) return null;
    return {
      setNumber,
      title: (data && data.title) || `Set ${setNumber}`,
      subject: (data && data.subject) || (sub && sub.name) || "",
      questions
    };
  }

  function groupByDifficulty(questions) {
    const groups = { easy: [], medium: [], hard: [] };
    (questions || []).forEach((q) => {
      if (!q.options || q.options.length < 2) return;
      groups[q.difficulty] = groups[q.difficulty] || [];
      groups[q.difficulty].push(q);
    });
    return groups;
  }

  function difficultyLabel(d, lang) {
    const l = lang || state.uiLang;
    if (d === "easy") return l === "as" ? "সহজ" : "Easy";
    if (d === "hard") return l === "as" ? "কঠিন" : "Hard";
    return l === "as" ? "মধ্যম" : "Medium";
  }

  function renderMockSetPicker(main, cat, sub, setNumbers) {
    const existing = new Set(setNumbers);
    const visible = DEFAULT_VISIBLE_SETS;

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(localized(sub.name))}</span>
        </nav>
        <h1>${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">Pick a set to start your mock test.</p>
      </div>
      <section class="section" style="padding-bottom:40px;">
        <div class="set-grid">
          ${Array.from({ length: visible }, (_, i) => {
            const n = i + 1;
            if (existing.has(n)) {
              return `
              <a class="set-card reveal" href="/mock-test/${cat.id}/${sub.id}/set-${n}" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
                <span class="set-card-head">
                  <span class="set-num">${String(n).padStart(2, "0")}</span>
                  <span class="set-status">Available</span>
                </span>
                <span class="set-name">Mock Test Set ${n}</span>
                <span class="set-meta">Full paper • Instant scoring</span>
                <span class="set-go">
                  <span>Start Test</span>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </a>`;
            }
            return `
              <div class="set-card set-card-locked reveal" style="--cat:${catColor(cat.id)}" data-delay="${i * 40}">
                <span class="set-card-head">
                  <span class="set-num">${String(n).padStart(2, "0")}</span>
                  <span class="set-status set-status-locked">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    Coming Soon
                  </span>
                </span>
                <span class="set-name">Mock Test Set ${n}</span>
                <span class="set-meta">Not published yet</span>
              </div>`;
          }).join("")}
        </div>
      </section>`;
    observeReveals();
  }

  async function renderMockSetDifficulty(main, cat, sub, setNumber) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("mock.loading")}</p></div>`;

    const loaded = await loadMockSetQuestions(cat, sub, setNumber);
    if (!loaded) {
      main.innerHTML = `
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>Questions for Set ${setNumber} have not been uploaded yet. Please check back soon.</p>
          <div style="margin-top:18px;">
            <a class="btn btn-outline" href="/mock-test/${cat.id}/${sub.id}">← Back to Sets</a>
          </div>
        </div>`;
      return;
    }

    const quizPool = loaded.questions.filter((q) => q.options && q.options.length >= 2);
    const fullPool = quizPool.length ? quizPool : loaded.questions;
    const countOptions = [10, 15, 20, 25].filter((n) => n <= fullPool.length);
    if (!countOptions.length) countOptions.push(fullPool.length);
    const defaultCount = countOptions.includes(25) ? 25 : countOptions[countOptions.length - 1];

    state.mock = {
      cat, pool: fullPool, configured: false, count: defaultCount,
      testLang: cat.id === "english" ? "en" : "as",
      setInfo: { setNumber, title: loaded.title, subject: localized(sub.name) }
    };

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb">
          <a href="/">Home</a><span class="bc-sep">/</span>
          <a href="/mock-test">Mock Test</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}">${escapeHtml(localized(cat.name))}</a><span class="bc-sep">/</span>
          <a href="/mock-test/${cat.id}/${sub.id}">${escapeHtml(localized(sub.name))}</a><span class="bc-sep">/</span>
          <span>${escapeHtml(loaded.title)}</span>
        </nav>
        <h1>${escapeHtml(loaded.title)} — ${escapeHtml(localized(sub.name))}</h1>
        <p class="page-desc">Choose your language and start when ready.</p>
      </div>

      <div class="mt-setup">
        <div class="mt-hero" style="--cat:${catColor(cat.id)}">
          <span class="mt-hero-icon">${catIconHTML(cat.id)}</span>
          <span style="min-width:0;">
            <span class="mt-hero-cat">${escapeHtml(localized(cat.name))}</span>
            <span class="mt-hero-title">${escapeHtml(loaded.title)} • ${escapeHtml(localized(sub.name))}</span>
            <span class="mt-hero-chips">
              <span class="mt-chip">${state.mock.pool.length} ${t("mock.questions")}</span>
              <span class="mt-chip">অসমীয়া / English</span>
            </span>
          </span>
        </div>

        <div class="mt-block">
          <div class="mt-label">Question Language <span>প্ৰশ্নৰ ভাষা</span></div>
          <div class="mt-segmented">
            <button type="button" class="mt-seg-btn ${state.mock.testLang === "as" ? "active" : ""}" data-mocklang="as">
              <span class="mt-seg-ico">অ</span> অসমীয়া (Assamese)
            </button>
            <button type="button" class="mt-seg-btn ${state.mock.testLang === "en" ? "active" : ""}" data-mocklang="en">
              <span class="mt-seg-ico">A</span> English
            </button>
          </div>
        </div>

        <div class="mt-block">
          <div class="mt-label">Number of Questions <span>প্ৰশ্নৰ সংখ্যা</span></div>
          <div class="count-picker" id="set-count-picker" style="margin:0;">
            ${countOptions.map((n) => `<button type="button" data-count="${n}" class="${n === defaultCount ? "active" : ""}">${n}</button>`).join("")}
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

        <button class="btn btn-primary mt-start" id="mock-begin-btn">${t("mock.begin")} →</button>
      </div>`;

    $$("[data-mocklang]").forEach((b) => {
      b.addEventListener("click", () => {
        $$("[data-mocklang]").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        state.mock.testLang = b.dataset.mocklang;
      });
    });

    let selectedCount = defaultCount;
    const countPicker = $("#set-count-picker");
    if (countPicker) {
      $$("button", countPicker).forEach((b) => {
        b.addEventListener("click", () => {
          $$("button", countPicker).forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          selectedCount = parseInt(b.dataset.count, 10);
          state.mock.count = selectedCount;
        });
      });
    }

    $("#mock-begin-btn").addEventListener("click", () => {
      showModalPopup({
        title: `Start ${loaded.title}?`,
        message: `You are about to start a ${selectedCount} question mock test in ${state.mock.testLang === "as" ? "অসমীয়া" : "English"}. Do you want to proceed?`,
        confirmText: "Start Test",
        cancelText: "Cancel",
        onConfirm: () => startSetMock(selectedCount)
      });
    });
  }

  function startSetMock(count) {
    if (!state.mock) return;
    const source = state.mock.pool.filter((q) => q.options && q.options.length >= 2);
    const full = source.length ? source : state.mock.pool;
    const n = Math.min(count || full.length, full.length);
    state.mock = Object.assign(state.mock, {
      pool: shuffle(full).slice(0, n),
      count: n,
      idx: 0,
      answers: [],
      elapsedSec: 0,
      started: true,
      timerId: null
    });
    renderMockQuiz();
  }

  async function renderMockSetup(main, cat, subId, secId, topicId) {
    main.innerHTML = `<div class="loader"><div class="spinner"></div><p>${t("mock.loading")}</p></div>`;

    const pool = await collectQuestionsForMock(cat, subId, secId, topicId);
    if (!pool.length) {
      main.innerHTML = `
        <div class="qa-empty" style="padding:60px 20px;">
          <div class="big"><svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg></div>
          <p>${t("mock.noQuestions")}</p>
          <div style="margin-top:18px;"><a class="btn btn-outline" href="/mock-test">← Choose Another Category</a></div>
        </div>`;
      return;
    }

    state.mock = { cat, pool, configured: false, count: 0, testLang: cat.id === "english" ? "en" : "as" };
    const counts = [10, 20, 50, 100].filter((n) => n <= pool.length);
    if (!counts.includes(pool.length)) counts.push(pool.length);

    main.innerHTML = `
      <div class="page-head">
        <nav class="breadcrumb"><a href="/">Home</a><span class="bc-sep">/</span><a href="/mock-test">Mock Test</a><span class="bc-sep">/</span><span>${escapeHtml(localized(cat.name))}</span></nav>
        <h1>${t("mock.setup.title")}</h1>
        <p class="page-desc">${escapeHtml(localized(cat.name))} • ${pool.length} ${t("mock.questions")}</p>
      </div>

      <div class="setup-panel">
        <div class="sp-title">
          <span class="mock-ico" style="background:${catColor(cat.id)};width:40px;height:40px;border-radius:11px;">${catIconHTML(cat.id)}</span>
          <b>${escapeHtml(localized(cat.name))} Mock Test</b>
        </div>
        <p class="sp-sub">Configure your test settings below.</p>
        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">Select Question Language / প্ৰশ্নৰ ভাষা:</p>
        <div class="lang-switch" style="margin-top:8px; display:inline-flex; width:100%;">
          <button type="button" class="lang-btn ${state.mock.testLang === "as" ? "active" : ""}" data-mocklang="as" style="flex:1; padding:10px; font-weight:700;">অসমীয়া (Assamese)</button>
          <button type="button" class="lang-btn ${state.mock.testLang === "en" ? "active" : ""}" data-mocklang="en" style="flex:1; padding:10px; font-weight:700;">English</button>
        </div>

        <p style="margin-top:18px;font-weight:700;font-size:.9rem;">${t("mock.setup.count")} / প্ৰশ্নৰ সংখ্যা বাছনি কৰক:</p>
        <div class="count-picker" id="count-picker">
          ${counts.map((n, i) => `<button type="button" data-count="${n}" class="${i === 0 ? "active" : ""}">${n}</button>`).join("")}
        </div>

        <div class="setup-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span>Stopwatch Timer will track your total time taken. Instant grading on final submission.</span>
        </div>
        <button class="btn btn-primary btn-begin" id="mock-begin-btn">${t("mock.begin")}</button>
      </div>`;

    $$("[data-mocklang]").forEach((b) => {
      b.addEventListener("click", () => {
        $$("[data-mocklang]").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        state.mock.testLang = b.dataset.mocklang;
      });
    });

    const picker = $("#count-picker");
    let selected = counts[0] || pool.length;
    $$("button", picker).forEach((b) => {
      b.addEventListener("click", () => {
        $$("button", picker).forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        selected = parseInt(b.dataset.count, 10);
      });
    });

    $("#mock-begin-btn").addEventListener("click", () => {
      showModalPopup({
        title: "Start Mock Test?",
        message: `You are about to start a ${selected} question test in ${state.mock.testLang === "as" ? "অসমীয়া" : "English"}. Do you want to proceed?`,
        confirmText: "Start Test",
        cancelText: "Cancel",
        onConfirm: () => startMock(selected)
      });
    });
  }

  function startMock(count) {
    if (!state.mock) return;
    const pool = shuffle(state.mock.pool).slice(0, count);
    state.mock = Object.assign(state.mock, { pool, idx: 0, answers: [], elapsedSec: 0, started: true, timerId: null });
    renderMockQuiz();
  }

  function renderMockQuiz() {
    const m = state.mock;
    const q = m.pool[m.idx];
    if (!q) return renderMockResults();
    const main = $("#app");
    const answered = m.answers[m.idx] !== undefined;
    const keys = ["A", "B", "C", "D", "E"];

    const qText = localizeContent(q.q);
    const optList = q.options || [];
    const qMedia = mediaBlock(q);
    const setLabel = m.setInfo
      ? `${escapeHtml(localized(m.cat.name))} • ${escapeHtml(m.setInfo.title)}`
      : `${escapeHtml(localized(m.cat.name))}`;

    main.innerHTML = `
      <div class="quiz-wrap">
        <div class="quiz-top">
          <span class="qt-cat">${setLabel} • Question ${m.idx + 1}/${m.pool.length}</span>
          <span class="quiz-timer" id="quiz-timer" title="Time Elapsed">⏱ ${fmtTime(m.elapsedSec)}</span>
          <button class="quiz-quit" id="quiz-quit-btn">${t("mock.quit")}</button>
        </div>
        <div class="quiz-progress"><span id="quiz-progress" style="width:${((m.idx) / m.pool.length * 100).toFixed(1)}%"></span></div>
        <div class="quiz-card">
          <div class="quiz-qno">Question ${m.idx + 1}</div>
          <div class="quiz-qtext">${formatMath(qText)}</div>
          ${qMedia}

          <div class="quiz-options" id="quiz-options">
            ${optList.map((opt, i) => {
              const tx = mockOptText(opt);
              const fg = mockOptFig(opt);
              return `
              <button class="quiz-option${fg ? " quiz-option-fig" : ""}" data-opt="${i}" ${answered ? "disabled" : ""}>
                <span class="opt-key">${keys[i]}</span>
                <span class="opt-main">${fg ? `<span class="opt-fig">${fg}</span>` : ""}${tx ? `<span class="opt-text">${formatMath(tx)}</span>` : ""}</span>
              </button>`;
            }).join("")}
          </div>

          <div class="quiz-feedback" id="quiz-feedback"></div>
          <button class="btn btn-primary quiz-next" id="quiz-next" type="button">
            ${m.idx + 1 === m.pool.length ? "Final Submit" : (answered ? t("mock.next") + " →" : t("mock.skip") + " →")}
          </button>
        </div>
      </div>`;

    resetScroll();

    const qCard = $(".quiz-card");
    if (qCard) renderMathJax(qCard);

    const optionsBox = $("#quiz-options");
    if (optionsBox) {
      $$(".quiz-option", optionsBox).forEach((opt) => {
        opt.addEventListener("click", () => {
          if (m.answers[m.idx] !== undefined) return;
          const sel = parseInt(opt.dataset.opt, 10);
          m.answers[m.idx] = sel;
          $$(".quiz-option", optionsBox).forEach((o) => {
            o.disabled = true;
            const i = parseInt(o.dataset.opt, 10);
            if (i === q.correct) o.classList.add("correct");
            else if (i === sel) o.classList.add("wrong");
            if (i === sel) o.classList.add("selected");
          });
          const fb = $("#quiz-feedback");
          fb.classList.add(sel === q.correct ? "good" : "bad");
          fb.style.display = "block";
          const corrOpt = optList[q.correct];
          const corrLetter = corrOpt && typeof corrOpt === "object" && corrOpt.option
            ? String(corrOpt.option)
            : (keys[q.correct] || "");
          const corrHTML = `${corrLetter ? `<b>(${corrLetter})</b> ` : ""}${mockOptFig(corrOpt) ? `<span class="opt-fig fb-fig">${mockOptFig(corrOpt)}</span>` : ""}${mockOptText(corrOpt) ? formatMath(mockOptText(corrOpt)) : ""}`;
          fb.innerHTML = sel === q.correct ? t("mock.revealCorrect") : `${t("mock.correctAnswer")}: ${corrHTML || corrLetter || ""}`;
          renderMathJax(fb);
          const nextBtn = $("#quiz-next");
          if (nextBtn) {
            nextBtn.disabled = false;
            nextBtn.textContent = m.idx + 1 === m.pool.length ? "Final Submit" : t("mock.next") + " →";
          }
        });
      });
    }

    $("#quiz-next").addEventListener("click", () => {
      m.idx++;
      if (m.idx >= m.pool.length) { stopMockTimer(); renderMockResults(); }
      else { renderMockQuiz(); }
    });

    $("#quiz-quit-btn").addEventListener("click", () => {
      showModalPopup({
        title: "Quit Mock Test?",
        message: "Are you sure you want to quit the mock test? Your current progress will be lost.",
        confirmText: "Yes, Quit",
        cancelText: "Resume Test",
        onConfirm: () => { stopMockTimer(); state.mock = null; navigateTo("/mock-test"); }
      });
    });

    if (!m.timerId) startMockTimer();
  }

  function startMockTimer() {
    const m = state.mock;
    const tick = () => {
      if (!m || !m.started || m.timerId === null) return;
      m.elapsedSec++;
      const tEl = $("#quiz-timer");
      if (tEl) tEl.textContent = `⏱ ${fmtTime(m.elapsedSec)}`;
    };
    m.timerId = setInterval(tick, 1000);
  }

  function fmtTime(sec) {
    const s = Math.max(0, sec);
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }

  function renderMockResults() {
    const m = state.mock;
    stopMockTimer();
    if (!m) return;

    let correct = 0, wrong = 0, skipped = 0;
    const results = m.pool.map((q, i) => {
      const a = m.answers[i];
      let ok = false;
      if (a === undefined) skipped++;
      else if (a === q.correct) { ok = true; correct++; }
      else wrong++;
      return { q, a, ok };
    });

    const timeTaken = m.elapsedSec;
    const pct = m.pool.length ? Math.round((correct / m.pool.length) * 100) : 0;
    const msgKey = pct >= 80 ? "mock.result.msgExcellent" : pct >= 55 ? "mock.result.msgGood" : pct >= 35 ? "mock.result.msgAverage" : "mock.result.msgPoor";
    const R = 52.5, C = 2 * Math.PI * R;
    const offset = C * (1 - pct / 100);

    const main = $("#app");
    main.innerHTML = `
      <div class="result-wrap">
        <div class="result-panel">
          <div class="result-ring">
            <svg viewBox="0 0 120 120">
              <circle class="r-bg" cx="60" cy="60" r="${R}"></circle>
              <circle class="r-fg" cx="60" cy="60" r="${R}" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}"></circle>
            </svg>
            <div class="result-percent">${pct}%</div>
          </div>
          <h2 style="font-size:1.25rem;">${t("mock.result.title")}</h2>
          ${m.setInfo ? `<p style="font-size:.85rem; color:var(--ink-soft,#64748b); margin:2px 0 0;">${escapeHtml(m.setInfo.title)}${m.setInfo.difficulty ? " • " + difficultyLabel(m.setInfo.difficulty) : ""}</p>` : ""}
          <p class="result-msg">${t(msgKey)}</p>
          <div class="result-stats">
            <div class="rstat"><b>${correct}</b><span>${t("mock.result.correct")}</span></div>
            <div class="rstat bad"><b>${wrong}</b><span>${t("mock.result.wrong")}</span></div>
            <div class="rstat skip"><b>${skipped}</b><span>${t("mock.result.skipped")}</span></div>
            <div class="rstat"><b>${fmtTime(timeTaken)}</b><span>Total Time Taken</span></div>
          </div>
          <div class="result-actions">
            <button class="btn btn-accent" id="mock-share-btn">${svgShareIcon()} ${t("mock.result.share")}</button>
            <button class="btn btn-outline" id="mock-retry">${t("mock.result.retry")}</button>
            <a class="btn btn-outline" href="/mock-test">${t("mock.result.changeCat")}</a>
            <button class="btn btn-outline" id="mock-review-toggle">${t("mock.result.review")}</button>
            <a class="btn btn-outline" href="/mock-test">${t("mock.result.exit")}</a>
          </div>
        </div>
        <div class="review-list" id="review-list" hidden>
          ${results.map((r, i) => {
            const q = r.q;
            const badge = r.a === undefined
              ? `<span class="rv-badge" style="background:#f1f5f9;color:#64748b;">${t("mock.result.skipped")}</span>`
              : `<span class="rv-badge ${r.ok ? "good" : "bad"}">${r.ok ? "✓ " + t("mock.result.correct") : "✕ " + t("mock.result.wrong")}</span>`;

            const optList = q.options || [];
            const rvOpt = (idx) => {
              if (!optList[idx]) return "";
              const letter = String.fromCharCode(65 + idx);
              const fg = mockOptFig(optList[idx]);
              const tx = mockOptText(optList[idx]);
              return `<b>(${letter})</b> ${fg ? `<span class="rv-fig">${fg}</span>` : ""}${tx ? formatMath(tx) : (fg ? "" : "(No text)")}`;
            };
            let ansLine = "";
            if (r.a !== undefined && optList.length) {
              ansLine = `<div class="rv-ans"><b>${t("mock.answer")}:</b> ${rvOpt(r.a)}</div>`;
              if (!r.ok) ansLine += `<div class="rv-ans correct-line"><b>${t("mock.correctAnswer")}:</b> ${rvOpt(q.correct)}</div>`;
            } else if (optList.length) {
              ansLine = `<div class="rv-ans correct-line"><b>${t("mock.correctAnswer")}:</b> ${rvOpt(q.correct)}</div>`;
            }
            const expText = localizeContent(q.explanation);
            const expLabel = (state.mock && state.mock.testLang === "as") ? "ব্যাখ্যা" : "Explanation";
            const expLine = expText ? `<div class="rv-exp"><b>${expLabel}:</b> ${formatMath(expText)}</div>` : "";
            return `
              <div class="review-item">
                <div class="rv-q">Q${i + 1}. ${formatMath(localizeContent(q.q))}</div>
                ${mediaBlock(q)}
                ${badge}
                ${ansLine}
                ${expLine}
              </div>`;
          }).join("")}
        </div>
      </div>`;

    resetScroll();

    const revList = $("#review-list");
    if (revList) renderMathJax(revList);

    requestAnimationFrame(() => {
      const fg = $(".result-ring .r-fg");
      if (fg) fg.style.strokeDashoffset = offset.toFixed(1);
    });

    $("#mock-retry").addEventListener("click", () => startMock(m.pool.length));
    const shareBtn = $("#mock-share-btn");
    if (shareBtn) shareBtn.addEventListener("click", openMockShareModal);
    const reviewBtn = $("#mock-review-toggle");
    reviewBtn.addEventListener("click", () => {
      const list = $("#review-list");
      const hidden = list.hidden;
      list.hidden = !hidden;
      reviewBtn.textContent = hidden ? t("mock.result.hideReview") : t("mock.result.review");
    });

    if (m.timerId) { clearInterval(m.timerId); m.timerId = null; }
  }

  /* ================= Share result as a report card ================= */
  const SHARE_SITE_ORIGIN = "https://axomexam.in";

  function svgShareIcon() {
    return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>`;
  }
  function svgWhatsapp() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  }
  function svgFacebook() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
  }
  function svgTelegram() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`;
  }
  function svgTwitter() {
    return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
  }
  function svgMoreApps() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/></svg>`;
  }
  function svgDownload() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  }
  function svgCopy() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
  }
  function svgCamera() {
    return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;
  }
  function svgAvatarPlaceholder() {
    return `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  }
  function svgTrophy() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`;
  }

  function buildShareSummary() {
    const m = state.mock;
    if (!m) return null;
    let correct = 0, wrong = 0, skipped = 0;
    m.pool.forEach((q, i) => {
      const a = m.answers[i];
      if (a === undefined) skipped++;
      else if (a === q.correct) correct++;
      else wrong++;
    });
    const pct = m.pool.length ? Math.round((correct / m.pool.length) * 100) : 0;
    const msgKey = pct >= 80 ? "mock.result.msgExcellent" : pct >= 55 ? "mock.result.msgGood" : pct >= 35 ? "mock.result.msgAverage" : "mock.result.msgPoor";
    let path = "/mock-test";
    if (location.pathname && location.pathname.indexOf("/mock-test/") === 0) path = location.pathname.replace(/\/index\.html$/, "");
    const setTitle = (m.setInfo && m.setInfo.title) ? m.setInfo.title : "";
    const subject = (m.setInfo && m.setInfo.subject) ? m.setInfo.subject : localized(m.cat && m.cat.name);
    const title = setTitle ? (subject ? subject + " • " + setTitle : setTitle) : (localized(m.cat && m.cat.name) + " Mock Test");
    return {
      correct, wrong, skipped, pct, msgKey,
      url: SHARE_SITE_ORIGIN + path,
      title,
      time: fmtTime(m.elapsedSec),
      count: m.pool.length
    };
  }

  function shareTextFor(S) {
    return t("share.text")
      .replace("{p}", String(S.pct))
      .replace("{t}", S.title)
      .replace("{url}", S.url)
      .replace("{site}", SHARE_SITE_ORIGIN);
  }

  function dataUrlToBlob(dataUrl) {
    const parts = String(dataUrl).split(",");
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/png";
    const bin = atob(parts[1]);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  function rcRoundRect(ctx, x, y, w, h, r) {
    const rad = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rad, y);
    ctx.arcTo(x + w, y, x + w, y + h, rad);
    ctx.arcTo(x + w, y + h, x, y + h, rad);
    ctx.arcTo(x, y + h, x, y, rad);
    ctx.arcTo(x, y, x + w, y, rad);
    ctx.closePath();
  }

  function drawShareBrandPng() {
    const scale = 2, w = 186, h = 34, font = "'Plus Jakarta Sans','Inter',Arial,sans-serif";
    const c = document.createElement("canvas");
    c.width = w * scale;
    c.height = h * scale;
    const ctx = c.getContext("2d");
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    rcRoundRect(ctx, 0, 0, 34, 34, 9);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 18px " + font;
    ctx.fillText("A", 17, 17);
    ctx.textAlign = "left";
    ctx.font = "800 21px " + font;
    ctx.fillText("axomexam.in", 46, 17);
    return c.toDataURL("image/png");
  }

  function drawShareBadgePng(label) {
    const scale = 2, h = 28, padX = 16, font = "'Plus Jakarta Sans','Inter',Arial,sans-serif";
    const measure = document.createElement("canvas").getContext("2d");
    measure.font = "800 11px " + font;
    const w = Math.ceil(measure.measureText(label).width + padX * 2);
    const c = document.createElement("canvas");
    c.width = w * scale;
    c.height = h * scale;
    const ctx = c.getContext("2d");
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    rcRoundRect(ctx, 0.5, 0.5, w - 1, h - 1, 99);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "800 11px " + font;
    ctx.fillText(label, w / 2, h / 2);
    return c.toDataURL("image/png");
  }

  async function generateReportImage(S, name, photo) {
    try { await document.fonts.ready; } catch (e) {}
    const R = 52.5, C = 2 * Math.PI * R;
    const offset = C * (1 - Math.max(0, Math.min(100, S.pct)) / 100);
    const initial = (String(name || "").trim().charAt(0) || "A").toUpperCase();
    const svgFont = "font-family:'Plus Jakarta Sans','Inter',Arial,sans-serif";
    const brandPng = drawShareBrandPng();
    const badgePng = drawShareBadgePng(t("share.reportBadge"));
    const avatar = photo
      ? ('<img src="' + photo + '" alt="" />')
      : ('<svg viewBox="0 0 84 84" width="84" height="84" aria-hidden="true"><text x="42" y="56.5" text-anchor="middle" fill="#ffffff" font-size="40" font-weight="800" style="' + svgFont + '">' + escapeHtml(initial) + '</text></svg>');
    const stats = [
      { v: S.correct, l: t("mock.result.correct") },
      { v: S.wrong, l: t("mock.result.wrong") },
      { v: S.skipped, l: t("mock.result.skipped") },
      { v: S.time, l: t("mock.result.time") }
    ];
    const card = document.createElement("div");
    card.className = "report-card";
    card.innerHTML =
      '<div class="rc-top">' +
        '<div class="rc-brand"><img src="' + brandPng + '" alt="" /></div>' +
        '<div class="rc-badge"><img src="' + badgePng + '" alt="" /></div>' +
      '</div>' +
      '<div class="rc-user">' +
        '<div class="rc-avatar' + (photo ? ' has-photo' : '') + '">' + avatar + '</div>' +
        '<div><div class="rc-name">' + escapeHtml(name) + '</div>' +
        '<div class="rc-test">' + escapeHtml(S.title) + '</div></div>' +
      '</div>' +
      '<div class="rc-score-row">' +
        '<div class="rc-ring">' +
          '<svg class="rc-ring-arc" viewBox="0 0 120 120">' +
            '<circle class="rc-r-bg" cx="60" cy="60" r="' + R + '"></circle>' +
            '<circle class="rc-r-fg" cx="60" cy="60" r="' + R + '" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + offset.toFixed(1) + '"></circle>' +
          '</svg>' +
          '<svg class="rc-ring-label" viewBox="0 0 120 120" aria-hidden="true">' +
            '<text x="60" y="71" text-anchor="middle" fill="#ffffff" font-size="32" font-weight="800" style="' + svgFont + '">' + S.pct + '%</text>' +
            '<text x="60" y="88" text-anchor="middle" fill="#ffffff" fill-opacity="0.85" font-size="9" font-weight="700" style="' + svgFont + '">' + escapeHtml(t("share.score")) + '</text>' +
          '</svg>' +
        '</div>' +
        '<div class="rc-msg">' +
          '<div class="rc-msg-title">' + escapeHtml(t(S.msgKey)) + '</div>' +
          '<div class="rc-msg-sub">' + escapeHtml(S.correct + " " + t("mock.result.correct") + "  •  " + S.wrong + " " + t("mock.result.wrong") + "  •  " + S.skipped + " " + t("mock.result.skipped")) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="rc-stats">' +
        stats.map(function (st) { return '<div class="rc-stat"><b>' + escapeHtml(String(st.v)) + '</b><span>' + escapeHtml(st.l) + '</span></div>'; }).join("") +
      '</div>' +
      '<div class="rc-challenge">' +
        '<div class="rc-challenge-ico">' + svgTrophy() + '</div>' +
        '<div><div class="rc-challenge-title">' + escapeHtml(t("share.challenge")) + '</div>' +
        '<div class="rc-challenge-link">' + escapeHtml(S.url) + '</div></div>' +
      '</div>' +
      '<div class="rc-foot">' +
        '<div class="rc-foot-line">' + escapeHtml(t("share.cardLine1").replace("{p}", String(S.pct)).replace("{t}", S.title).replace("{site}", SHARE_SITE_ORIGIN + "/")) + '</div>' +
        '<div class="rc-foot-line rc-foot-link">' + escapeHtml(S.url) + '</div>' +
      '</div>';

    const holder = document.createElement("div");
    holder.className = "report-card-holder";
    holder.appendChild(card);
    document.body.appendChild(holder);
    try {
      await ensureHtml2canvas();
      if (!window.html2canvas) throw new Error("html2canvas unavailable");
      const canvas = await window.html2canvas(card, { scale: 2, useCORS: true, logging: false, backgroundColor: "#4f46e5" });
      return canvas.toDataURL("image/png");
    } finally {
      holder.remove();
    }
  }

  function triggerDownload(dataUrl, fileName) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function nativeShareFile(file, text) {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text: text, title: "axomexam Result" });
        return true;
      } catch (err) {
        if (err && err.name === "AbortError") return true;
      }
    }
    return false;
  }

  async function copyShareLink(url) {
    try {
      await navigator.clipboard.writeText(url);
      toast(t("share.linkCopied"));
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); toast(t("share.linkCopied")); } catch (e2) {}
      ta.remove();
    }
  }

  function openMockShareModal() {
    const S = buildShareSummary();
    if (!S) return;
    const existing = $("#share-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "share-modal";
    modal.className = "read-modal share-modal";
    modal.innerHTML =
      '<div class="read-modal-backdrop"></div>' +
      '<div class="read-modal-box" role="dialog" aria-modal="true">' +
        '<div class="read-modal-head">' +
          '<div class="read-modal-titles">' +
            '<span class="read-modal-title" id="share-modal-title">' + escapeHtml(t("share.title")) + '</span>' +
            '<span class="read-modal-sub" id="share-modal-sub">' + escapeHtml(t("share.subtitle")) + '</span>' +
          '</div>' +
          '<button class="read-close" id="share-close" type="button" aria-label="Close">✕</button>' +
        '</div>' +
        '<div class="read-modal-body" id="share-body">' +
          '<form class="share-form" id="share-form" novalidate>' +
            '<div>' +
              '<label for="share-name">' + escapeHtml(t("share.nameLabel")) + '</label>' +
              '<input type="text" id="share-name" maxlength="40" autocomplete="name" placeholder="' + escapeHtml(t("share.namePlaceholder")) + '" />' +
            '</div>' +
            '<div>' +
              '<label>' + escapeHtml(t("share.photoLabel")) + '</label>' +
              '<div class="share-photo-row">' +
                '<div class="share-photo-preview" id="share-photo-preview">' + svgAvatarPlaceholder() + '</div>' +
                '<div class="share-photo-actions">' +
                  '<label class="share-file-btn" for="share-photo-input">' + svgCamera() + ' ' + escapeHtml(t("share.photoChoose")) + '</label>' +
                  '<input type="file" id="share-photo-input" accept="image/*" hidden />' +
                  '<button type="button" class="share-photo-remove" id="share-photo-remove" hidden>' + escapeHtml(t("share.photoRemove")) + '</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex; gap:10px; margin-top:6px;">' +
              '<button type="button" class="btn btn-outline" id="share-cancel">' + escapeHtml(t("share.cancel")) + '</button>' +
              '<button type="submit" class="btn btn-primary" id="share-generate">' + escapeHtml(t("share.generate")) + '</button>' +
            '</div>' +
          '</form>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    let photoData = "";
    const close = () => modal.remove();
    $("#share-close", modal).addEventListener("click", close);
    $(".read-modal-backdrop", modal).addEventListener("click", close);
    $("#share-cancel", modal).addEventListener("click", close);

    const photoInput = $("#share-photo-input", modal);
    const photoPreview = $("#share-photo-preview", modal);
    const photoRemove = $("#share-photo-remove", modal);
    photoInput.addEventListener("change", () => {
      const file = photoInput.files && photoInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        photoData = String(reader.result || "");
        photoPreview.innerHTML = '<img src="' + photoData + '" alt="" />';
        photoRemove.hidden = false;
      };
      reader.readAsDataURL(file);
    });
    photoRemove.addEventListener("click", () => {
      photoData = "";
      photoInput.value = "";
      photoPreview.innerHTML = svgAvatarPlaceholder();
      photoRemove.hidden = true;
    });

    $("#share-form", modal).addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameInput = $("#share-name", modal);
      const name = (nameInput.value || "").trim();
      if (!name) { toast(t("share.nameRequired")); nameInput.focus(); return; }
      const genBtn = $("#share-generate", modal);
      genBtn.disabled = true;
      genBtn.textContent = t("share.generating");
      let dataUrl = "";
      try {
        dataUrl = await generateReportImage(S, name, photoData);
      } catch (err) {
        console.error("Report card generation failed:", err);
        genBtn.disabled = false;
        genBtn.textContent = t("share.generate");
        toast(t("share.error"));
        return;
      }
      showSharePreview(modal, { S, name, dataUrl });
    });
  }

  function showSharePreview(modal, payload) {
    const S = payload.S;
    const dataUrl = payload.dataUrl;
    const text = shareTextFor(S);
    const fileName = "axomexam-report-" + S.pct + "percent.png";
    const body = $("#share-body", modal);
    if (!body) return;

    const target = (cls, kind, i18nKey, icon) =>
      '<button type="button" class="share-target ' + cls + '" data-share="' + kind + '">' + icon + '<span>' + escapeHtml(t(i18nKey)) + '</span></button>';

    body.innerHTML =
      '<img class="share-preview-img" src="' + dataUrl + '" alt="' + escapeHtml(t("share.previewTitle")) + '" />' +
      '<div class="share-targets">' +
        target("wa", "whatsapp", "share.whatsapp", svgWhatsapp()) +
        target("fb", "facebook", "share.facebook", svgFacebook()) +
        target("tg", "telegram", "share.telegram", svgTelegram()) +
        target("tw", "twitter", "share.twitter", svgTwitter()) +
        target("more", "more", "share.more", svgMoreApps()) +
        target("dl", "dl", "share.download", svgDownload()) +
        target("copy", "copy", "share.copy", svgCopy()) +
      '</div>' +
      '<button type="button" class="btn btn-outline" id="share-back" style="width:100%;">← ' + escapeHtml(t("share.back")) + '</button>';

    const titleEl = $("#share-modal-title", modal);
    if (titleEl) titleEl.textContent = t("share.previewTitle");
    const subEl = $("#share-modal-sub", modal);
    if (subEl) subEl.textContent = t("share.shareNow");

    const blob = dataUrlToBlob(dataUrl);
    let file = blob;
    try { file = new File([blob], fileName, { type: "image/png" }); } catch (e) { file = blob; }
    const canFiles = !!(navigator.canShare && navigator.canShare({ files: [file] }));

    $("#share-back", modal).addEventListener("click", () => {
      modal.remove();
      openMockShareModal();
    });

    $$("[data-share]", modal).forEach((btn) => {
      btn.addEventListener("click", async () => {
        const kind = btn.dataset.share;
        const enc = encodeURIComponent;
        if (kind === "whatsapp") {
          if (canFiles && await nativeShareFile(file, text)) return;
          triggerDownload(dataUrl, fileName);
          toast(t("share.imageSaved"));
          window.open("https://wa.me/?text=" + enc(text), "_blank");
        } else if (kind === "facebook") {
          if (canFiles && await nativeShareFile(file, text)) return;
          triggerDownload(dataUrl, fileName);
          toast(t("share.imageSaved"));
          window.open("https://www.facebook.com/sharer/sharer.php?u=" + enc(S.url) + "&quote=" + enc(text), "_blank");
        } else if (kind === "telegram") {
          if (canFiles && await nativeShareFile(file, text)) return;
          triggerDownload(dataUrl, fileName);
          toast(t("share.imageSaved"));
          window.open("https://t.me/share/url?url=" + enc(S.url) + "&text=" + enc(text), "_blank");
        } else if (kind === "twitter") {
          if (canFiles && await nativeShareFile(file, text)) return;
          triggerDownload(dataUrl, fileName);
          toast(t("share.imageSaved"));
          window.open("https://twitter.com/intent/tweet?url=" + enc(S.url) + "&text=" + enc(text), "_blank");
        } else if (kind === "more") {
          if (canFiles) { if (await nativeShareFile(file, text)) return; }
          triggerDownload(dataUrl, fileName);
          await copyShareLink(text);
        } else if (kind === "dl") {
          triggerDownload(dataUrl, fileName);
          toast(t("share.downloaded"));
        } else if (kind === "copy") {
          await copyShareLink(text);
        }
      });
    });
  }

  /* ================= Extra trending topics ================= */
  function registerExtraTrending(extras) {
    const extraCat = {
      id: "trending",
      name: { en: "Trending", as: "জনপ্ৰিয়" },
      color: "#f97316",
      icon: "↗",
    };
    extras.forEach((tp) => {
      if (!tp || !tp.id) return;
      const path = `trending/${tp.id}`;
      const rec = {
        path,
        cat: extraCat,
        sub: null,
        section: null,
        topic: tp,
        title: tp.title || tp.name,
        desc: tp.description,
        tags: tp.tags || [],
        nQuestions: (tp.questions || []).length,
        pdf: tp.pdf || null,
        popularity: Number(tp.popularity) || 0,
        extra: true,
      };
      state.topicMap[path] = rec;
      state.topicIndex.push(rec);
    });
  }

  /* ================= Global Link Handler ================= */
  function bindLinkInterception() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href && href.startsWith("/") && !href.startsWith("//") && !a.hasAttribute("download") && a.target !== "_blank") {
        e.preventDefault();
        navigateTo(href);
      }
    });
  }

  /* ================= Boot ================= */
  async function boot() {
    const pre = $("#preloader");
    
    try {
      const savedUiLang = localStorage.getItem("axomexam-ui-lang");
      if (savedUiLang) state.uiLang = savedUiLang;
      else state.uiLang = "en";
    } catch (e) {
      state.uiLang = "en";
    }

    document.body.setAttribute("data-lang", state.lang);
    applyStaticI18n();
    initAppPrompt();

    /* Fetch boot data in parallel (was sequential) to shorten time-to-render. */
    const [categoriesData, countsData, trendingData] = await Promise.all([
      API.getCategories().catch((err) => {
        console.error("Failed to load categories:", err);
        return null;
      }),
      API.getCounts().catch(() => null),
      API.getTrendingTopics().catch((err) => {
        console.error("Failed to load extra trending topics:", err);
        return null;
      }),
    ]);

    if (categoriesData) Object.assign(state, normalize(categoriesData));
    if (countsData) applyPrecomputedCounts(countsData);
    if (trendingData) registerExtraTrending(trendingData);

    if (state.categories.length) {
      state.ready = true;
      buildDesktopNav();
      buildMobileNav();
      bindSearch();
      initGlobalLangToggle();
      bindLinkInterception();

      window.addEventListener("popstate", () => {
        buildDesktopNav();
        buildMobileNav();
        renderRoute();
      });

      renderRoute();

      /* Counts are taken from data/counts.json (applyPrecomputedCounts),
         so no per-topic downloads happen during boot. */
      updateHeroTotals();

    } else {
      $("#app").innerHTML = `<div class="loader"><p>${t("load.error")}</p></div>`;
    }

    if (pre) setTimeout(() => pre.classList.add("done"), 350);
  }

  /* ================= Expandable "Read More" Page Description ================= */
  function enhancePageDesc() {
    const app = $("#app");
    if (!app) return;

    const READ_MORE = (typeof I18N !== "undefined" && I18N.en && I18N.en["desc.readMore"]) || "Read More";
    const READ_LESS = (typeof I18N !== "undefined" && I18N.en && I18N.en["desc.readLess"]) || "Show Less";

    app.querySelectorAll(".page-desc").forEach((el) => {
      if (el.dataset.enhanced === "1") return;
      el.dataset.enhanced = "1";

      const raw = el.textContent || "";
      if (!raw.includes("\n")) return;

      const lines = raw.split("\n").map((s) => s.trim()).filter(Boolean);
      let html = "";
      let inList = false;
      lines.forEach((line) => {
        const m = line.match(/^[•\-*]\s*(.*)$/);
        if (m) {
          if (!inList) { html += "<ul>"; inList = true; }
          html += "<li>" + escapeHtml(m[1]) + "</li>";
        } else {
          if (inList) { html += "</ul>"; inList = false; }
          html += "<p>" + escapeHtml(line) + "</p>";
        }
      });
      if (inList) html += "</ul>";

      const wrapper = document.createElement("div");
      wrapper.className = "page-desc desc-expandable";
      wrapper.dataset.enhanced = "1";
      wrapper.innerHTML = '<div class="desc-inner">' + html + "</div>";
      el.replaceWith(wrapper);

      const inner = wrapper.querySelector(".desc-inner");
      const lineH = parseFloat(getComputedStyle(inner).lineHeight) || 24;
      const collapsedMax = Math.round(lineH * 3.2);
      if (inner.scrollHeight <= collapsedMax) return;

      inner.style.setProperty("--desc-max", collapsedMax + "px");
      wrapper.classList.add("is-collapsed");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "desc-toggle";
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = READ_MORE +
        '<svg class="desc-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
      btn.addEventListener("click", () => {
        const collapsed = wrapper.classList.toggle("is-collapsed");
        inner.style.maxHeight = "";
        btn.innerHTML = (collapsed ? READ_MORE : READ_LESS) +
          '<svg class="desc-chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
        btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
      });
      wrapper.appendChild(btn);
    });
  }

  function initDescEnhancer() {
    const app = $("#app");
    if (!app) return;
    enhancePageDesc();
    const mo = new MutationObserver(() => enhancePageDesc());
    mo.observe(app, { childList: true, subtree: true });
  }

  function bindHamburger() {
    const burger = $("#hamburger");
    if (!burger) return;
    burger.addEventListener("click", () => {
      const menu = $("#mobile-menu");
      if (menu && menu.classList.contains("open")) closeMobileMenu();
      else openMobileMenu();
    });
    const mb = $("#mobile-backdrop");
    if (mb) mb.addEventListener("click", closeMobileMenu);
    const mc = $("#mobile-close");
    if (mc) mc.addEventListener("click", closeMobileMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeMobileMenu(); const sr = $("#search-results"); if (sr) sr.hidden = true; }
    });
  }

  function updateTabbar(segs) {
    const tabs = $$("#tabbar .tab-item");
    let active = "home";
    if (segs[0] === "mock-test") active = "mock";
    else if (segs[0] === "categories" || segs[0] === "category" || segs[0] === "topic") active = "categories";
    else if (segs[0] === "exams") active = "exams";
    else if (segs[0] && segs[0] !== "") active = "";
    tabs.forEach((el) => el.classList.toggle("active", el.dataset.tab === active));
  }

  function bindTabbar() {
    const tm = $("#tab-menu");
    if (tm) tm.addEventListener("click", () => openMobileMenu());
  }

  /* ================= Enhanced Dark Mode Toggle ================= */
  function updateThemeIcons(theme) {
    const isDark = theme === "dark";
    const iconHtml = isDark ? `
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
    ` : `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

    $$(".theme-toggle").forEach((btn) => {
      btn.innerHTML = iconHtml;
      btn.style.cssText = "display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:10px; border:1px solid var(--border,#e2e8f0); background:var(--bg-subtle,#f8fafc); color:var(--ink,#0f172a); cursor:pointer; padding:0; outline:none; transition:all 0.2s ease;";
    });
  }

  /* ================= Mobile App Download Prompt ================= */
  const APP_PROMPT_DONE_KEY = "axomexam-app-prompt-done";
  let appPromptDismissed = false;

  function appPromptDone() {
    try { return localStorage.getItem(APP_PROMPT_DONE_KEY) === "1"; } catch (e) { return false; }
  }

  function dismissAppPrompt() {
    appPromptDismissed = true;
    const el = document.getElementById("app-prompt");
    if (!el) return;
    el.classList.remove("show");
    window.setTimeout(() => { if (el) el.hidden = true; }, 300);
  }

  function markAppPromptDone() {
    try { localStorage.setItem(APP_PROMPT_DONE_KEY, "1"); } catch (e) { }
    dismissAppPrompt();
  }

  /* The axomexam Android app is a WebView wrapper, so the promo popup must
     never appear inside it. Detect the app via a JS bridge (if the app exposes
     one), a custom "axomexam" user-agent, or the standard Android WebView "wv" marker. */
  function isInAxomexamApp() {
    try {
      if (window.axomexamApp || window.__AXOMEXAM_APP__ || window.AxomexamApp) return true;
      const ua = (navigator.userAgent || "").toLowerCase();
      if (ua.indexOf("axomexam") !== -1) return true;
      if (/(^|[;( ])wv([; )]|$)/.test(ua)) return true;
    } catch (e) { }
    return false;
  }

  function initAppPrompt() {
    if (isInAxomexamApp()) return;
    if (window.matchMedia && !window.matchMedia("(max-width: 900px)").matches) return;
    if (appPromptDone()) return;

    const el = document.createElement("div");
    el.id = "app-prompt";
    el.className = "app-prompt";
    el.hidden = true;
    el.innerHTML = `
      <a class="app-prompt-link" href="/download-app">
        <img class="app-prompt-icon" src="/app/axomexam-icon.png" alt="" width="40" height="40" />
        <span class="app-prompt-text">
          <b>${escapeHtml(t("appPrompt.title"))}</b>
          <span>${escapeHtml(t("appPrompt.msg"))}</span>
        </span>
      </a>
      <button class="app-prompt-close" type="button" aria-label="${escapeHtml(t("appPrompt.close"))}" title="${escapeHtml(t("appPrompt.close"))}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>`;
    document.body.appendChild(el);

    el.querySelector(".app-prompt-close").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dismissAppPrompt();
    });
    el.querySelector(".app-prompt-link").addEventListener("click", () => {
      dismissAppPrompt();
    });

    window.setTimeout(() => {
      if (appPromptDismissed || appPromptDone()) return;
      el.hidden = false;
      el.classList.add("show");
    }, 5000);
  }

  function initTheme() {
    const html = document.documentElement;
    let savedTheme = "light";
    try { savedTheme = localStorage.getItem("axomexam-theme") || "light"; } catch (e) { }

    if (savedTheme === "dark") html.setAttribute("data-theme", "dark");
    else html.removeAttribute("data-theme");
    updateThemeIcons(savedTheme);

    const apply = (theme) => {
      if (theme === "dark") html.setAttribute("data-theme", "dark");
      else html.removeAttribute("data-theme");
      try { localStorage.setItem("axomexam-theme", theme); } catch (e) { }
      updateThemeIcons(theme);
    };

    $$(".theme-toggle").forEach((btn) => {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = "1";
      btn.addEventListener("click", () => {
        const isDark = html.getAttribute("data-theme") === "dark";
        apply(isDark ? "light" : "dark");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindHamburger();
    bindTabbar();
    initTheme();
    initDescEnhancer();
    boot();
  });
})();
