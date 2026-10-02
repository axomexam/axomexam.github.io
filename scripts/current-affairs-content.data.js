"use strict";

/*
 * current-affairs-content.data.js
 *
 * Hand-written, page-specific editorial content for every Current Affairs
 * page. scripts/build-current-affairs-content.js reads these entries and
 * writes a static rich-content block (plus a FAQPage JSON-LD node) into each
 * page so that crawlers and AdSense reviewers see substantial unique content
 * even before JavaScript runs.
 *
 * Keep every entry genuinely different from the others: the whole point is to
 * remove thin/duplicate boilerplate, so avoid copy-pasting the same sentences
 * across categories.
 */

module.exports = {
  index: {
    title: "Free Current Affairs for ADRE, Assam Police and APSC | axomexam",
    meta: "Free bilingual current affairs with answers and explanations for ADRE 2.0, Assam Police, APSC, SSC and Railway exams. Sports, awards, appointments, economy, environment and more, updated regularly.",
    h2: "Free Current Affairs for Assam and Central Government Exams",
    lead: [
      "Current affairs is the section that separates an average score from a competitive one in almost every Assam recruitment examination. ADRE Grade 3 and Grade 4, Assam Police Constable and Sub-Inspector, APSC CCE, Gauhati High Court, DHS, DME, SSC and Railway papers all include a current affairs or general awareness block, and the questions are drawn from the events of the last twelve to eighteen months.",
      "Axomexam keeps this library organised into focused sections such as sports, awards and honours, important days and themes, appointments and resignations, science and technology, state current affairs, national affairs, defence and security, economy and banking, international affairs, environment and ecology, summits and conferences, books and authors, rankings and reports, and obituaries. Every question is bilingual, carries the correct answer and a short explanation, and is refreshed as new events take place."
    ],
    sections: [
      {
        h: "How current affairs is asked in Assam exams",
        p: [
          "Most papers ask direct, factual questions rather than opinion-based ones. A typical question names an event, a person, a place, a scheme or a rank and expects a single correct answer. Because the examiners rarely go beyond the headlines of the year, a candidate who revises the major events systematically can attempt almost the entire section with confidence. Static portions such as books and authors, important days and themes, and appointments overlap heavily with the current affairs paper, so revising them serves double duty."
        ]
      },
      {
        h: "Current affairs sections on axomexam",
        list: [
          "Sports and Awards and Honours — tournaments, winners, records and national and international honours.",
          "Important Days and Themes — the day, its date and the official theme of the year.",
          "Books and Authors and Obituaries — newly released books, their writers, and the contributions of noted personalities who passed away.",
          "Appointments and Resignations — who holds which constitutional, government, corporate and international post.",
          "National, State and International Affairs — governance, schemes, Assam and North-East developments, and world events.",
          "Science and Technology, Defence and Security, Economy and Banking, Environment and Ecology, and Summits and Conferences.",
          "Rankings, Reports and Indices — country and state positions in global reports and indices."
        ]
      },
      {
        h: "How to prepare current affairs without wasting time",
        list: [
          "Fix one revision slot every day and read only the day's major headlines, not everything.",
          "Note the fact in one line with the who, what, where and when, and revise your notes weekly.",
          "Practise the question sets section by section instead of reading passively.",
          "Pay extra attention to Assam and North-East news, because state exams give it heavy weight.",
          "Revise important days and themes, awards and appointments in the final month as they are pure memory questions.",
          "Attempt a monthly current affairs mock test to check what you have actually retained."
        ]
      },
      {
        h: "Why current affairs rewards consistency",
        p: [
          "Unlike mathematics or reasoning, current affairs cannot be mastered in a single week. It grows with you. Fifteen focused minutes a day across a few months is far more effective than trying to memorise a year of events in the last ten days. The sections on axomexam are built to support exactly this habit: short sets, clear answers and explanations that tell you why a fact is important, so that revision stays quick and regular."
        ]
      }
    ],
    faqs: [
      { q: "Which current affairs sections are most important for ADRE and Assam Police?", a: "Sports, awards and honours, appointments and resignations, important days and themes, national affairs and Assam state current affairs carry the most questions. They are also the fastest to revise because the questions are direct and factual." },
      { q: "How old should current affairs be for the exam?", a: "Prepare the last twelve to eighteen months thoroughly, with extra focus on the six months immediately before the exam. Older events matter mainly if they are linked to a scheme, an award or a continuing policy." },
      { q: "Are the current affairs questions free on axomexam?", a: "Yes. Every question, answer and explanation in the current affairs library is free. There is no login, subscription or payment of any kind." },
      { q: "Can I read current affairs in Assamese?", a: "Yes. All questions and explanations are bilingual. You can switch between Assamese and English at any time so the same fact is reinforced in both languages." },
      { q: "How often is the current affairs library updated?", a: "New questions are added as important events take place, and each section carries the date it was last updated so you always know how fresh the material is." },
      { q: "Is one month enough to prepare current affairs?", a: "One month is enough for a focused revision if you already follow the news, but for a first-time preparation three to four months of daily short revision works much better." }
    ]
  },

  sports: {
    title: "Sports Current Affairs Questions with Answers for ADRE, Assam Police | axomexam",
    meta: "Sports current affairs for ADRE 2.0, Assam Police, APSC and SSC. Winners, tournaments, records, Olympics, Asian Games and national championships with bilingual answers and explanations.",
    h2: "Sports Current Affairs Questions with Answers",
    lead: [
      "Sports is one of the most predictable parts of the current affairs paper. Questions almost always ask who won an event, who set a record, where a tournament was held, or which country hosted a championship. Because the answers are names and places, careful revision of the year's major events converts directly into marks.",
      "The axomexam sports section collects cricket, football, badminton, hockey, athletics, Olympics, Asian Games, Commonwealth Games, national games and major league results, and presents each as a short bilingual question with an explanation. Instead of reading long match reports, you revise the single fact the examiner is likely to ask."
    ],
    sections: [
      {
        h: "What sports questions are usually asked",
        p: [
          "Examiners focus on winners and runners-up, host cities and countries, record holders, trophy names, and the Indian players who performed well on the international stage. Questions on the Olympic and Asian Games medal tables, the venue of a World Cup, and the winner of a national award in sport appear very frequently. Direct questions on the captain of a team or the coach of a national side are also common."
        ]
      },
      {
        h: "Sports areas covered on axomexam",
        list: [
          "Cricket — ICC and BCCI tournaments, World Cups, IPL, Asia Cup and player records.",
          "Football — FIFA events, ISL, Santosh Trophy and major league winners.",
          "Olympics, Asian Games and Commonwealth Games — hosts, medal winners and records.",
          "Racquet and indoor sports — badminton, tennis, table tennis, chess and squash.",
          "Hockey, athletics and traditional Indian sports.",
          "National sports awards and the personalities who received them."
        ]
      },
      {
        h: "How to remember sports facts quickly",
        list: [
          "Group facts by sport rather than by date, so related winners sit together in your memory.",
          "Make a one-line card for every final: event, winner, runner-up and venue.",
          "Learn the host country first, because venue questions are asked more than match scores.",
          "Revise the sports awards along with the awards and honours section to avoid studying them twice.",
          "Attempt the sports question set once a week so names stay fresh.",
          "Mark the events that repeat every year, such as the IPL and the national games, for extra revision."
        ]
      }
    ],
    faqs: [
      { q: "How many sports questions come in ADRE and Assam Police?", a: "Sports usually contributes three to six questions in the general awareness portion, and the number rises when a major event such as the Olympics or a World Cup has taken place." },
      { q: "Do I need to remember match scores?", a: "Rarely. The examiner is far more likely to ask the winner, the runner-up, the host or a record, so focus on those facts first." },
      { q: "Are sports awards asked separately?", a: "Yes. Awards such as the Major Dhyan Chand Khel Ratna and Arjuna Award are often asked, and they overlap with the awards and honours section, so revising them once is enough." },
      { q: "Can I revise sports current affairs in Assamese?", a: "Yes. Every question and explanation is bilingual and can be read in Assamese or English." },
      { q: "How much time should I give to sports?", a: "Ten to fifteen minutes a week is enough for revision once you have noted the winners of the major events of the year." },
      { q: "Is the sports section free on axomexam?", a: "Yes. All sports questions, answers and explanations are completely free with no login or subscription." }
    ]
  },

  "awards-honours": {
    title: "Awards and Honours Current Affairs Questions for ADRE, APSC | axomexam",
    meta: "Awards and honours current affairs for ADRE, Assam Police, APSC and SSC. Bharat Ratna, Padma awards, Nobel Prizes, Khel Ratna, Sahitya Akademi and Jnanpith with bilingual answers.",
    h2: "Awards and Honours Current Affairs Questions",
    lead: [
      "Awards and honours is a small but very high-scoring area, because a question almost always pairs a person with an award or an award with a field. Bharat Ratna, the Padma awards, the Nobel Prizes, the Khel Ratna and Arjuna awards, the Sahitya Akademi and Jnanpith awards, and the national film awards are all asked repeatedly.",
      "On axomexam this section lists each award with the recipient, the year and the field, so you can revise the pairing directly. Because the same awards are asked in the static general knowledge paper, the current affairs and static portions reinforce each other."
    ],
    sections: [
      {
        h: "The awards you cannot afford to skip",
        list: [
          "Bharat Ratna and the Padma Vibhushan, Padma Bhushan and Padma Shri honours.",
          "The Nobel Prizes in physics, chemistry, medicine, literature, peace and economics.",
          "Sports honours — Major Dhyan Chand Khel Ratna, Arjuna, Dronacharya and Dhyan Chand awards.",
          "Literary honours — Jnanpith, Sahitya Akademi and Assam Valley Literary Award.",
          "Cinema honours — Dadasaheb Phalke, National Film Awards and the Oscars.",
          "Gallantry and service awards such as the Param Vir Chakra and the Ashoka Chakra."
        ]
      },
      {
        h: "How award questions are framed",
        p: [
          "Two patterns dominate. The first names the award and asks for the recipient, and the second names the person and asks for the award. Occasionally a question asks for the year, the field, or the first Indian to receive a particular honour. A few questions test the number of awards given in a year, especially for the Padma series and the Bharat Ratna, so it helps to remember the count along with the names."
        ]
      },
      {
        h: "Tips to avoid mixing up similar awards",
        list: [
          "Learn each award with its field first, then with its recipient.",
          "Note the first Indian and the youngest or oldest recipient for major awards, as these are favourite question areas.",
          "Keep the sports and cinema honours in separate columns so they do not blur together.",
          "Revise the full list once a week in a table format of award, recipient and year.",
          "Pay special attention to awards announced for Assam and North-East personalities.",
          "Attempt the awards question set after each revision to confirm the pairings."
        ]
      }
    ],
    faqs: [
      { q: "Which awards are most important for Assam exams?", a: "Bharat Ratna, the Padma awards, the Khel Ratna and Arjuna awards, the Jnanpith and Sahitya Akademi awards, and the national film awards are the most frequently asked." },
      { q: "Are awards from other countries asked?", a: "Yes, the Nobel Prizes are asked every year, and occasionally honours such as the Booker Prize, the Pulitzer Prize and the Ramon Magsaysay Award appear." },
      { q: "Do I need to know the exact year of an award?", a: "The year is asked less often than the recipient, but it helps in eliminating options when the same person has received more than one honour." },
      { q: "How can I remember so many names?", a: "Learn awards in a table of award, field and recipient, and revise it in short daily sessions rather than all at once." },
      { q: "Can I study awards in Assamese?", a: "Yes. The awards questions and explanations on axomexam are bilingual and can be read in Assamese or English." },
      { q: "Is the awards and honours section free?", a: "Yes. Every award question, answer and explanation on axomexam.in is completely free with no login or subscription." }
    ]
  },

  "important-days-themes": {
    title: "Important Days and Themes Questions for ADRE and Assam Police | axomexam",
    meta: "Important national and international days with the official theme of the year for ADRE, Assam Police, APSC and SSC. Bilingual answers and explanations, updated every year.",
    h2: "Important Days and Themes with the Official Theme",
    lead: [
      "Important days is the most factual and the most reliable area in the current affairs paper. The examiner gives a date and asks for the day, or gives the day and asks for its theme for the year. There is no analysis involved, so full marks are within reach for anyone who revises the list carefully.",
      "Axomexam lists national and international days alongside their official yearly themes, so that both halves of the question are covered together. Because the same date-based facts also appear in the static general knowledge paper, this section is worth revising again and again."
    ],
    sections: [
      {
        h: "Days that appear almost every year",
        list: [
          "National days — Republic Day, Independence Day, Gandhi Jayanti, National Unity Day and Constitution Day.",
          "International days — International Women's Day, World Environment Day, World Health Day, Yoga Day and Human Rights Day.",
          "Science and health days — National Science Day, World AIDS Day, World Tuberculosis Day and National Vaccination Day.",
          "Environment days — World Water Day, Earth Day, World Wildlife Day and International Day of Forests.",
          "Assam-specific days — Assam Day or Sukapha Divas, Bihu and other state observances.",
          "United Nations observances with their annual themes."
        ]
      },
      {
        h: "How the theme part is asked",
        p: [
          "International days, especially those observed by the United Nations, change their theme every year. A question typically states the theme and asks which day it belongs to, or names the day and asks for the year's theme. For national days the theme can also change, so the safe method is to note the theme of the current year for the major days and revise it in the month before the exam."
        ]
      },
      {
        h: "A simple revision method for dates",
        list: [
          "Make a calendar-year chart and write each important day against its month.",
          "Group days by theme, such as health, environment, women, and the United Nations, to remember them in clusters.",
          "Keep a separate column for the yearly theme and update it each year.",
          "Revise the chart twice a week; dates are learnt only through repetition.",
          "Pay special attention to the days that carry the name of a personality, since they are asked as 'whose birth anniversary'.",
          "Attempt the important days set to check which dates you keep forgetting."
        ]
      }
    ],
    faqs: [
      { q: "Are the themes of all days asked?", a: "No. The themes of major international days, particularly the United Nations observances, are asked most often. For most national days only the date and the reason are asked." },
      { q: "Which important days are asked in Assam exams?", a: "National days, the major United Nations days, and Assam-specific observances such as Assam Day and Bihu are asked most frequently." },
      { q: "Do the days change every year?", a: "The dates stay fixed, but the official themes are announced each year and can change, so the theme column needs a yearly update." },
      { q: "How can I stop confusing similar dates?", a: "Group days by month and by theme, and revise the list as a chart rather than as isolated facts." },
      { q: "Can I read important days in Assamese?", a: "Yes. Every entry is bilingual and can be read in Assamese or English." },
      { q: "Is the important days section free on axomexam?", a: "Yes. All important days and themes content is free with no login or subscription." }
    ]
  },

  "books-authors": {
    title: "Books and Authors Current Affairs Questions for ADRE, APSC | axomexam",
    meta: "Books and authors current affairs for ADRE, Assam Police, APSC and SSC. Newly released books, award-winning titles, autobiographies and Assamese literature with bilingual answers.",
    h2: "Books and Authors Current Affairs Questions",
    lead: [
      "Books and authors is a compact, high-return topic. The question usually pairs a newly released or award-winning book with its author, or asks which book a well-known personality wrote. Launched books by the Prime Minister and other leaders, award-winning novels, and famous autobiographies are the most common sources.",
      "The axomexam books and authors section also covers Assamese literature, biographies of national leaders, and books that won the Jnanpith or Sahitya Akademi award. Revising it alongside the awards section makes the preparation efficient, because the same authors and titles keep reappearing."
    ],
    sections: [
      {
        h: "What is asked from books and authors",
        list: [
          "Newly launched books and their authors, especially those released by national leaders.",
          "Award-winning books, including the Jnanpith, Sahitya Akademi and Booker Prize winners.",
          "Autobiographies and biographies of famous personalities.",
          "Assamese books, authors and literary works.",
          "Books on history, polity, economy and culture that were in the news.",
          "The title of a book when only the author is given, and the reverse."
        ]
      },
      {
        h: "How to separate the author from the title",
        p: [
          "Most mistakes in this section happen because similar-sounding titles and authors get mixed up. The reliable method is to learn the book together with a one-line description of what it is about, because the description helps you recall the author even if the title is confusing. For autobiographies, remember the person first and the title second, since the person is easier to anchor."
        ]
      },
      {
        h: "Revision tips for books and authors",
        list: [
          "Keep a running list of books launched during the year with the author and the field.",
          "Revise Assamese authors separately, as state exams give them special weight.",
          "Pair each award-winning book with the award and the year in a single table.",
          "Read the one-line summary of a book instead of trying to remember its full contents.",
          "Review the list every fortnight so that old entries do not fade.",
          "Practise the set to check whether you remember the author or only the title."
        ]
      }
    ],
    faqs: [
      { q: "Are books and authors important for ADRE and Assam Police?", a: "Yes. Two to four questions usually appear, and the topic is easy to prepare because the facts are direct pairings of a book and its author." },
      { q: "Are Assamese books asked in state exams?", a: "Yes. Assamese literature, prominent Assamese authors and their works carry extra weight in Assam government recruitment examinations." },
      { q: "Which awards should I link with books?", a: "The Jnanpith, Sahitya Akademi, Booker Prize and the Vyas Samman are the awards most often paired with books in exam questions." },
      { q: "How can I remember which book belongs to which author?", a: "Learn a short one-line description of each book along with the author. The description acts as a memory hook for the title." },
      { q: "Can I study this in Assamese?", a: "Yes. Questions and explanations are bilingual and can be read in Assamese or English." },
      { q: "Is the books and authors section free?", a: "Yes. Every question, answer and explanation is free with no login or subscription." }
    ]
  },

  "appointments-resignations": {
    title: "Appointments and Resignations Current Affairs for ADRE, APSC | axomexam",
    meta: "Appointments and resignations current affairs for ADRE, Assam Police, APSC and SSC. Constitutional posts, government, RBI, corporations and international organisations with bilingual answers.",
    h2: "Appointments and Resignations Current Affairs Questions",
    lead: [
      "Appointments and resignations is a who's who section, and it is among the most frequently asked current affairs areas. The examiner names a post and asks who holds it, or names a person and asks which office they took up. Constitutional posts, the Reserve Bank, the Election Commission, the judiciary, the armed forces and international organisations all feature regularly.",
      "On axomexam each question records the person, the post and the reason for the change where relevant. Because these facts change during the year, the section is reviewed and updated so that you are not revising a superseded appointment."
    ],
    sections: [
      {
        h: "Posts that are asked most often",
        list: [
          "Constitutional posts — President, Vice-President, Prime Minister, Chief Ministers, Governors and Chief Justices.",
          "Election Commission, Comptroller and Auditor General, Attorney General and Advocate General.",
          "The Reserve Bank of India Governor and the heads of public sector banks.",
          "The Chiefs of the Army, Navy and Air Force, and the National Security Adviser.",
          "Heads of commissions and authorities such as the UPSC, NHRC and NITI Aayog.",
          "Heads of international organisations such as the United Nations, IMF, World Bank and WHO."
        ]
      },
      {
        h: "New posts and first-time appointees",
        p: [
          "Examiners like to ask about the first person to hold a newly created post, and about the first woman or the youngest person to occupy a major office. Resignations are usually asked alongside the reason and the successor, so whenever you note a resignation, also note who replaced the person. This turns a single fact into two or three possible questions."
        ]
      },
      {
        h: "How to keep appointments current",
        list: [
          "Note the post before the person, because the post is the stable part of the fact.",
          "Record the date of the appointment so you can tell old and new holders apart.",
          "Whenever someone resigns, immediately note the successor in the same line.",
          "Revise the list monthly, since appointments change faster than any other current affairs topic.",
          "Pay special attention to Assam and North-East appointments for state exams.",
          "Practise the set regularly so that superseded names do not stay in your memory."
        ]
      }
    ],
    faqs: [
      { q: "Why are appointments asked so often?", a: "They test awareness of who is currently in power and are easy to frame, so almost every paper includes at least a few appointment questions." },
      { q: "Should I learn former holders of a post?", a: "Learn the current holder first. Former holders matter mainly when a question asks who preceded the present incumbent or who resigned." },
      { q: "Which appointments are most important for Assam exams?", a: "The President, Prime Minister, Chief Minister of Assam, Governor of Assam, Chief Justice, RBI Governor and the election commissioners are asked most frequently." },
      { q: "How often does this section change?", a: "It changes throughout the year, so revise it monthly, especially in the months immediately before the exam." },
      { q: "Are international appointments asked?", a: "Yes. The heads of the United Nations, WHO, IMF and World Bank appear from time to time, though less often than Indian posts." },
      { q: "Is the appointments section free on axomexam?", a: "Yes. Every appointment question, answer and explanation is free with no login or subscription." }
    ]
  },

  "science-technology": {
    title: "Science and Technology Current Affairs for ADRE, APSC | axomexam",
    meta: "Science and technology current affairs for ADRE, Assam Police, APSC and SSC. ISRO missions, DRDO tests, space, defence technology, health and IT developments with bilingual answers.",
    h2: "Science and Technology Current Affairs Questions",
    lead: [
      "Science and technology is a favourite of question setters because it links current events with the static science syllabus. ISRO launches, DRDO missile tests, new satellites, vaccine and health developments, and advances in artificial intelligence and computing are all fair game.",
      "Axomexam groups the year's science news by theme so that you can revise mission names, launch vehicles, test sites and the purpose of each development. Where a development connects to a class six to ten concept, the explanation notes the link, which helps in the general science paper as well."
    ],
    sections: [
      {
        h: "The science news that is asked most",
        list: [
          "ISRO missions — Chandrayaan, Aditya, Gaganyaan, Mangalyaan and satellite launches with their launch vehicles.",
          "DRDO and defence technology — missile tests, radar systems and indigenous platforms.",
          "Space and astronomy — telescopes, exoplanets, black holes and international space missions.",
          "Health and medicine — vaccines, disease outbreaks and new treatments.",
          "Information technology — artificial intelligence, semiconductors, quantum computing and cybersecurity.",
          "Energy and environment technology — solar, green hydrogen and battery innovation."
        ]
      },
      {
        h: "How to link current science to the static syllabus",
        p: [
          "Most science current affairs are an application of a basic concept. A question on a satellite orbit connects to gravitation, one on a vaccine connects to immunity, and one on a new battery connects to chemistry. When you revise a piece of science news, ask which school-level chapter it belongs to. This short step turns one current affairs fact into revision for a whole topic in the general science paper."
        ]
      },
      {
        h: "Revision strategy for science and technology",
        list: [
          "For every mission, note the agency, the launch vehicle, the purpose and the launch site.",
          "Keep the full forms of the abbreviations, because examiners often ask what an acronym stands for.",
          "Separate Indian developments from international ones to avoid confusion.",
          "Link each development to its underlying science concept while reading the explanation.",
          "Revise the list before the general science revision so the overlap is fresh.",
          "Attempt the set regularly, as new missions are added through the year."
        ]
      }
    ],
    faqs: [
      { q: "Is science and technology important for ADRE?", a: "Yes. It typically contributes several questions, and the facts often overlap with the general science section of the same paper." },
      { q: "Do I need deep science knowledge for current affairs?", a: "No. You need the name, the agency, the purpose and the basic concept behind each development. Detailed technical knowledge is not required." },
      { q: "Which ISRO missions are asked most often?", a: "Chandrayaan, Aditya-L1, Gaganyaan and the major launch vehicle and satellite missions are asked most frequently." },
      { q: "Are abbreviations asked?", a: "Yes. Questions on the full forms of ISRO, DRDO, ISRO launch vehicles and common scientific acronyms appear regularly." },
      { q: "Can I study science current affairs in Assamese?", a: "Yes. Every question and explanation is bilingual and can be read in Assamese or English." },
      { q: "Is the science and technology section free?", a: "Yes. All science and technology content on axomexam.in is free with no login or subscription." }
    ]
  },

  "state-current-affairs": {
    title: "Assam State Current Affairs for ADRE, Assam Police and APSC | axomexam",
    meta: "Assam and North-East current affairs for ADRE, Assam Police, APSC and other state exams. State schemes, appointments, infrastructure, culture, festivals and regional developments with bilingual answers.",
    h2: "Assam and North-East State Current Affairs Questions",
    lead: [
      "State current affairs carries the highest weight in Assam recruitment exams, and it is also the section where candidates from outside the state lose easy marks. Questions come from Assam government schemes, state appointments, infrastructure projects, festivals, culture, sports and important regional events.",
      "Axomexam maintains a dedicated Assam and North-East section so that state news does not get buried under national and international headlines. Every question is bilingual, which is especially useful because many state schemes and institutions are best recognised by their Assamese names."
    ],
    sections: [
      {
        h: "What state current affairs covers",
        list: [
          "Assam government schemes, missions and flagship programmes.",
          "State appointments, the Chief Minister, Governor, ministers and heads of state bodies.",
          "Infrastructure — bridges, roads, airports, railways and river transport.",
          "Culture and festivals — Bihu, Ambubachi Mela, Jonbeel Mela and tourism events.",
          "Assam sports, education, health and agriculture developments.",
          "North-East news involving other states, central schemes for the region and border agreements."
        ]
      },
      {
        h: "Why state news scores more than national news",
        p: [
          "A question on an Assam scheme can usually be answered only by someone who has followed state news, whereas a national headline is known to everyone. This gives state-focused candidates a decisive advantage. The same is true for questions on state institutions, awards to Assamese personalities, and regional festivals. Spending even ten minutes a day on Assam news can therefore raise the score more than an hour on national news."
        ]
      },
      {
        h: "How to prepare Assam current affairs",
        list: [
          "Follow the state government's official releases and local news for scheme launches and appointments.",
          "Note the full name and the purpose of every scheme, because questions often give one and ask for the other.",
          "Learn the correct spelling and Assamese name of festivals, awards and institutions.",
          "Track infrastructure milestones such as new bridges, roads and airports.",
          "Revise the state list more often than the national list, given its higher weight.",
          "Attempt the state set before a mock test so the facts are fresh."
        ]
      }
    ],
    faqs: [
      { q: "How many state current affairs questions come in ADRE?", a: "State current affairs usually contributes a significant share of the general awareness section, often more than any single national topic." },
      { q: "Which Assam topics are asked most?", a: "State schemes, appointments, Bihu and festivals, infrastructure projects and awards to Assamese personalities are the most frequently asked." },
      { q: "Do I need to follow Assamese news sources?", a: "It helps, but English-language coverage of Assam news plus the axomexam state section is enough to cover the syllabus." },
      { q: "Are other North-East states included?", a: "Yes. News from Meghalaya, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura and Sikkim occasionally appears, along with central schemes for the region." },
      { q: "Can I read state current affairs in Assamese?", a: "Yes. Every question and explanation is bilingual, which is particularly helpful for state schemes and institutions." },
      { q: "Is the state current affairs section free?", a: "Yes. All Assam and North-East current affairs content is free with no login or subscription." }
    ]
  },

  "international-affairs": {
    title: "International Affairs Current Affairs for ADRE, APSC | axomexam",
    meta: "International affairs current affairs for ADRE, Assam Police, APSC and SSC. World events, bilateral relations, treaties, international organisations and global politics with bilingual answers.",
    h2: "International Affairs Current Affairs Questions",
    lead: [
      "International affairs tests your awareness of the world beyond India. Questions ask about treaties and agreements, visits by heads of state, global conflicts, the work of international organisations, and the outcome of major world events. The section is smaller than national affairs but it appears in almost every paper.",
      "Axomexam organises the year's world events by country and by theme, so you can revise India's relations with major powers, the activities of the United Nations and its agencies, and the conflicts and agreements that made headlines."
    ],
    sections: [
      {
        h: "What international news is asked",
        list: [
          "India's bilateral relations with major countries and the agreements signed.",
          "The United Nations, its agencies and peacekeeping operations.",
          "International organisations such as BRICS, G20, SAARC, ASEAN and the European Union.",
          "Conflicts, ceasefire agreements and peace talks.",
          "Global elections, new heads of state and government changes.",
          "Treaties, climate agreements and trade deals."
        ]
      },
      {
        h: "How to read international news for the exam",
        p: [
          "The examiner rarely asks for analysis. The useful facts are who met whom, which country hosted a summit, what agreement was signed, and which organisation issued a statement. When you read international news, therefore, focus on the actors, the place and the outcome. Once you note these three, most possible questions from that event are already covered."
        ]
      },
      {
        h: "Preparation tips for international affairs",
        list: [
          "Pair international summits with the summits and conferences section so you do not revise them twice.",
          "For each agreement, note the two countries and the subject of the agreement.",
          "Keep a small map in mind for capitals and host cities, since venue questions are common.",
          "Note the full names of international organisations and their headquarters.",
          "Revise the list monthly, as global events move quickly.",
          "Attempt the set to see which regions you follow least and read more about them."
        ]
      }
    ],
    faqs: [
      { q: "Is international affairs asked in Assam exams?", a: "Yes. A few questions on world events, treaties and international organisations appear in most papers, though the weight is smaller than national and state affairs." },
      { q: "Do I need to know the capitals of all countries?", a: "Only the capitals of the countries in the news for that year. The capital is most often asked when a summit or a state visit took place there." },
      { q: "Which international organisations are asked most?", a: "The United Nations, BRICS, G20, SAARC, ASEAN, IMF, World Bank and WHO are asked most frequently." },
      { q: "How much detail do I need on world conflicts?", a: "Only the basic facts: the countries involved, the reason, and any agreement or ceasefire. Deep political analysis is not required." },
      { q: "Can I read international affairs in Assamese?", a: "Yes. Questions and explanations are bilingual and can be read in Assamese or English." },
      { q: "Is the international affairs section free?", a: "Yes. All international affairs content is free with no login or subscription." }
    ]
  },

  "national-affairs": {
    title: "National Affairs Current Affairs Questions for ADRE, APSC | axomexam",
    meta: "National affairs current affairs for ADRE, Assam Police, APSC and SSC. Government schemes, bills and acts, Parliament, Supreme Court judgments and national events with bilingual answers.",
    h2: "National Affairs Current Affairs Questions",
    lead: [
      "National affairs is the largest current affairs section and the one that appears in every paper. It covers government schemes, new bills and acts, Parliament sessions, Supreme Court judgments, national programmes, and the major events that shape the country during the year.",
      "Axomexam arranges the year's national developments so that you can revise a scheme with its ministry and purpose, a bill with its key provision, and a judgment with its effect. Many of these facts also connect to the static polity and economy portions, so the revision pays off more than once."
    ],
    sections: [
      {
        h: "What national affairs includes",
        list: [
          "Central government schemes, missions and flagship programmes.",
          "New bills, acts, ordinances and constitutional amendments.",
          "Parliament sessions, major debates and the budget.",
          "Supreme Court and High Court judgments of national importance.",
          "National campaigns, observances and government initiatives.",
          "Reports, committees and commissions constituted by the central government."
        ]
      },
      {
        h: "Schemes are the most asked item",
        p: [
          "Of all national affairs topics, government schemes are asked most often. Questions typically give the scheme and ask for its purpose, or give the purpose and ask for the scheme, and occasionally ask for the ministry or the year of launch. Learning each scheme with its objective, its beneficiary group and the ministry responsible covers almost every way it can be asked."
        ]
      },
      {
        h: "How to prepare national affairs",
        list: [
          "For each scheme, note the name, the objective, the beneficiary and the ministry.",
          "For each bill or act, note the one main provision that makes it news.",
          "For each judgment, note who the parties were and what changed as a result.",
          "Link the budget announcements to the relevant economic schemes.",
          "Revise the year's national events month by month rather than at random.",
          "Attempt the set before the mock tests so the facts stay current."
        ]
      }
    ],
    faqs: [
      { q: "Why is national affairs given so much weight?", a: "It is the broadest and most stable section, covering governance and policy, and the questions are factual rather than analytical, which makes them easy to frame and easy to score." },
      { q: "Which national topics are asked most?", a: "Government schemes, new bills and acts, Parliament sessions, the budget and important Supreme Court judgments are asked most frequently." },
      { q: "Do I need to know the launch year of every scheme?", a: "The year matters mainly for examining whether a scheme is new. Focus first on the objective and the ministry, then on the year." },
      { q: "Are judgments asked in detail?", a: "Usually only the key change or the principle is asked, not the full judgment. Note the parties and the effect in one line." },
      { q: "Can I read national affairs in Assamese?", a: "Yes. Every question and explanation is bilingual and can be read in Assamese or English." },
      { q: "Is the national affairs section free?", a: "Yes. All national affairs content on axomexam.in is free with no login or subscription." }
    ]
  },

  "defence-security": {
    title: "Defence and Security Current Affairs for ADRE, APSC | axomexam",
    meta: "Defence and security current affairs for ADRE, Assam Police, APSC and SSC. Missile tests, armed forces exercises, defence acquisitions, gallantry awards and security operations with bilingual answers.",
    h2: "Defence and Security Current Affairs Questions",
    lead: [
      "Defence and security is a compact but distinctive section. The questions come from missile and weapons tests, joint military exercises, new inductions into the armed forces, border and internal security operations, and gallantry awards. Because the facts are specific and memorable, this is an easy area to score in.",
      "Axomexam records the name of each exercise and missile with the participating countries or the testing agency, so the frequent confusion between similarly named exercises is avoided. Gallantry awards are also covered here and link naturally to the awards and honours section."
    ],
    sections: [
      {
        h: "What defence questions cover",
        list: [
          "Missile and weapon tests, including their range, type and testing agency.",
          "Joint military exercises with their host country and participating forces.",
          "New aircraft, ships, submarines and defence systems inducted into service.",
          "Border security, internal security operations and disaster relief operations.",
          "Gallantry awards such as the Param Vir Chakra and the Ashoka Chakra.",
          "Defence acquisitions, agreements and indigenous defence production."
        ]
      },
      {
        h: "Avoiding the classic exercise mix-up",
        p: [
          "The most common mistake in this section is mixing up the many joint exercises, because their names are similar and each involves a different country. The safe method is to learn each exercise with its partner country in a single line, for example an exercise with the United States, one with Russia, one with Japan and so on. Once the partner is fixed in memory, the name is easy to recall."
        ]
      },
      {
        h: "Preparation tips for defence and security",
        list: [
          "Learn each exercise with its partner country and the forces taking part.",
          "For each missile, note the range category and the agency that tested it.",
          "Keep a list of the weapon systems inducted during the year.",
          "Revise gallantry awards along with the main awards list to save time.",
          "Follow defence news around national events such as Republic Day and Independence Day.",
          "Attempt the set regularly, as tests and exercises are announced through the year."
        ]
      }
    ],
    faqs: [
      { q: "Is defence and security asked in ADRE and Assam Police?", a: "Yes. Several questions usually appear, and the topic is especially important for police and paramilitary recruitment because of the security focus." },
      { q: "Which defence topics are asked most?", a: "Joint military exercises with foreign countries, missile tests, new inductions and gallantry awards are asked most frequently." },
      { q: "How do I remember so many exercises?", a: "Always pair the exercise name with its partner country. Learning them as name-and-country pairs prevents most mix-ups." },
      { q: "Are missile ranges asked?", a: "Sometimes. It helps to know whether a missile is short, medium, intermediate or intercontinental range, and which agency tested it." },
      { q: "Can I study defence current affairs in Assamese?", a: "Yes. All questions and explanations are bilingual and can be read in Assamese or English." },
      { q: "Is the defence and security section free?", a: "Yes. Every question, answer and explanation is free with no login or subscription." }
    ]
  },

  "economy-banking": {
    title: "Economy and Banking Current Affairs for ADRE, APSC | axomexam",
    meta: "Economy and banking current affairs for ADRE, Assam Police, APSC and SSC. Union Budget, GDP, RBI policy, taxes, banking developments and financial institutions with bilingual answers.",
    h2: "Economy and Banking Current Affairs Questions",
    lead: [
      "Economy and banking links current events with the static economy portion of the syllabus. Questions come from the Union Budget, GDP and inflation figures, Reserve Bank policy decisions, tax changes, new bank schemes and the work of financial institutions. The facts are numerical and precise, which makes them very scoreable once noted.",
      "Axomexam collects the year's economic developments with their figures, institutions and dates, so you can revise the budget allocations, the repo rate decisions and the flagship financial schemes together. The explanations point out the link to the static economy concepts, which helps in the general studies paper as well."
    ],
    sections: [
      {
        h: "What economy and banking questions cover",
        list: [
          "The Union Budget — allocations, new schemes, tax proposals and fiscal targets.",
          "Gross domestic product, inflation, and other economic indicators.",
          "Reserve Bank of India policy — the repo rate, monetary policy and regulatory changes.",
          "Banking developments — new schemes, mergers, digital payments and financial inclusion.",
          "Taxes — changes in direct and indirect tax and the goods and services tax.",
          "International financial institutions such as the IMF, World Bank and Asian Development Bank."
        ]
      },
      {
        h: "Why the figures matter",
        p: [
          "Unlike most current affairs topics, economy questions often hinge on a number. The examiner may ask for the size of a budget allocation, the percentage growth of GDP, or the current repo rate. This means the figures must be learnt accurately. Note each figure with its unit and the period it refers to, because confusing a lakh crore with a thousand crore, or a quarter with a year, is the most common reason for losing these marks."
        ]
      },
      {
        h: "How to prepare economy and banking",
        list: [
          "Read the budget summary and note the major allocations with their scheme names.",
          "Track the Reserve Bank's monetary policy decisions and the current repo rate.",
          "Keep a table of key economic indicators with their latest values.",
          "Link every new scheme to the ministry or institution implementing it.",
          "Revise tax changes with the section of the act they affect.",
          "Attempt the set before the static economy revision to make the overlap useful."
        ]
      }
    ],
    faqs: [
      { q: "Is economy and banking important for ADRE and APSC?", a: "Yes. It contributes a steady number of questions, and the overlap with the static economy section makes preparation efficient." },
      { q: "Do I need to memorise exact figures?", a: "For major items such as the budget size, GDP growth and the repo rate, yes. For smaller allocations, knowing the approximate figure is usually enough to eliminate wrong options." },
      { q: "Which banking topics are asked most?", a: "RBI policy decisions, the repo rate, financial inclusion schemes and digital payment developments are asked most frequently." },
      { q: "Are international financial institutions asked?", a: "Occasionally, mainly their reports, projections and heads. The IMF and World Bank appear most often." },
      { q: "Can I study economy current affairs in Assamese?", a: "Yes. Every question and explanation is bilingual and can be read in Assamese or English." },
      { q: "Is the economy and banking section free?", a: "Yes. All economy and banking content is free with no login or subscription." }
    ]
  },

  "rankings-reports-indices": {
    title: "Rankings, Reports and Indices Current Affairs for ADRE | axomexam",
    meta: "Rankings, reports and indices current affairs for ADRE, Assam Police, APSC and SSC. HDI, global indices, development reports and India's position with bilingual answers and explanations.",
    h2: "Rankings, Reports and Indices Current Affairs Questions",
    lead: [
      "Rankings, reports and indices is a small, self-contained section that is easy to master. Questions ask India's rank in a global index, the country at the top, the agency that published a report, or the topic a report deals with. The facts are precise and repeat in a predictable pattern, which makes this a reliable scoring area.",
      "Axomexam lists each major index and report with the publishing agency, India's rank and the top-ranked country. Because the same index is published every year, the section is updated so that you learn the latest position rather than an outdated one."
    ],
    sections: [
      {
        h: "The indices and reports asked most often",
        list: [
          "Human Development Index, published by the United Nations Development Programme.",
          "Global Hunger Index, Global Innovation Index and Global Competitiveness Index.",
          "Ease of Doing Business and the World Bank's development reports.",
          "Environmental indices such as the Environmental Performance Index and the Climate Change Performance Index.",
          "Happiness, gender gap and human capital indices.",
          "Indian reports such as the Economic Survey and NITI Aayog's SDG India Index."
        ]
      },
      {
        h: "How ranking questions are framed",
        p: [
          "Three patterns are common: name the index and ask India's rank, name the index and ask which country topped it, and name a report and ask which agency published it. A fourth, slightly harder, pattern asks what a particular index measures. Learning the rank together with the agency and the top country covers nearly every variation of the question."
        ]
      },
      {
        h: "Tips to remember rankings accurately",
        list: [
          "Learn each index with three facts: what it measures, who publishes it and India's rank.",
          "Note the top-ranked country as well, since it is asked as often as India's rank.",
          "Keep the reports and indices in a single table and revise it monthly.",
          "Be careful with indices that have similar names but different publishers.",
          "Note whether a rank improved or declined, as the change is sometimes asked.",
          "Attempt the set to test recall of the agency and the rank together."
        ]
      }
    ],
    faqs: [
      { q: "Are rankings and indices asked in ADRE?", a: "Yes. A few questions usually appear, and the topic is easy to prepare because the facts are limited and precise." },
      { q: "What is asked most from this section?", a: "India's rank in major global indices, the top-ranked country and the agency that publishes a given report are asked most frequently." },
      { q: "Do I need to know the methodology of the indices?", a: "Rarely. It is enough to know what each index measures in one line and who publishes it." },
      { q: "Which agency publishes most global indices?", a: "The United Nations agencies, the World Bank, the World Economic Forum and specialised organisations such as Transparency International publish the indices asked most often." },
      { q: "Can I read this section in Assamese?", a: "Yes. All questions and explanations are bilingual and can be read in Assamese or English." },
      { q: "Is the rankings and reports section free?", a: "Yes. Every question, answer and explanation is free with no login or subscription." }
    ]
  },

  "environment-ecology": {
    title: "Environment and Ecology Current Affairs for ADRE, APSC | axomexam",
    meta: "Environment and ecology current affairs for ADRE, Assam Police, APSC and SSC. Climate change, wildlife, biodiversity, pollution, conservation programmes and summits with bilingual answers.",
    h2: "Environment and Ecology Current Affairs Questions",
    lead: [
      "Environment and ecology connects current events with the static science and geography syllabus, so it rewards preparation twice over. Questions come from climate change conferences, wildlife and biodiversity, conservation programmes, pollution, and environmental agreements and reports.",
      "Axomexam covers both the global picture, such as climate summits and emission targets, and the Indian and Assamese picture, such as national parks, tiger and rhino conservation and local environmental issues. This balance matters because state exams often ask Assam-specific environment questions."
    ],
    sections: [
      {
        h: "What environment questions cover",
        list: [
          "Climate change — conferences, emission targets and climate agreements.",
          "Wildlife and biodiversity — species in the news, national parks and sanctuaries.",
          "Conservation programmes for tigers, elephants, rhinos and other species.",
          "Pollution and waste management, including air quality and single-use plastic.",
          "Renewable energy, afforestation and green initiatives.",
          "Environmental reports, indices and international agreements."
        ]
      },
      {
        h: "Assam's environment deserves special attention",
        p: [
          "For Assam exams, the state's own environment is as important as the global one. Kaziranga, Manas, the one-horned rhinoceros, the Brahmaputra, wetlands and local conservation efforts appear repeatedly. Questions on floods, erosion, deforestation and the state's biodiversity are common. Revising these together with the state current affairs section makes the preparation more effective."
        ]
      },
      {
        h: "How to prepare environment and ecology",
        list: [
          "Learn each climate conference with its host city, year and main outcome.",
          "For every species in the news, note its habitat and conservation status.",
          "Keep a list of national parks and sanctuaries along with the state they are in.",
          "Link environmental schemes to the ministry or agency that runs them.",
          "Revise Assam's environment facts along with the state current affairs section.",
          "Attempt the set regularly, as new conservation and climate developments appear through the year."
        ]
      }
    ],
    faqs: [
      { q: "Is environment and ecology important for ADRE?", a: "Yes. It contributes several questions and overlaps with the general science and geography sections, so the same revision helps in more than one place." },
      { q: "Which environment topics are asked most?", a: "Climate conferences, wildlife and biodiversity, conservation programmes and pollution-related facts are asked most frequently." },
      { q: "Are Assam environment questions asked?", a: "Yes. Kaziranga, Manas, the one-horned rhinoceros, the Brahmaputra and local conservation issues appear regularly in state exams." },
      { q: "Do I need to know scientific names of species?", a: "Only for the most prominent species in the news, and even then the common name and habitat are more important than the scientific name." },
      { q: "Can I study environment current affairs in Assamese?", a: "Yes. Every question and explanation is bilingual and can be read in Assamese or English." },
      { q: "Is the environment and ecology section free?", a: "Yes. All environment and ecology content on axomexam.in is free with no login or subscription." }
    ]
  },

  "summits-conferences": {
    title: "Summits and Conferences Current Affairs for ADRE, APSC | axomexam",
    meta: "Summits and conferences current affairs for ADRE, Assam Police, APSC and SSC. G20, BRICS, SAARC, ASEAN, United Nations and bilateral summits with hosts, outcomes and bilingual answers.",
    h2: "Summits and Conferences Current Affairs Questions",
    lead: [
      "Summits and conferences is a well-defined section built around a simple set of facts: who hosted, which countries took part, what was agreed, and where the next summit will be held. The questions are direct and the list of major summits is short, so this is an efficient topic to prepare.",
      "Axomexam records each summit with its host country or city, the participating group and the main outcome, and links it to the international affairs section so that the same event is not revised from two different places."
    ],
    sections: [
      {
        h: "The summits that are asked most",
        list: [
          "G20 and the G7 summits, with their host countries and themes.",
          "BRICS, SCO and the Shanghai Cooperation Organisation meetings.",
          "SAARC, BIMSTEC and ASEAN summits relevant to India and the North-East.",
          "United Nations General Assembly sessions and climate conferences.",
          "Bilateral summits between India and major powers.",
          "Special summits such as the Voice of the Global South and the East Asia Summit."
        ]
      },
      {
        h: "Host, theme and outcome are the three keys",
        p: [
          "Almost every summit question can be answered from three facts. The host is asked as country or city, the theme or agenda is asked for the current year, and the outcome is asked as an agreement, a declaration or a joint statement. If you note these three for every major summit, the section is fully covered. When India hosts a summit, the host city and the Sherpa or chairperson are also worth noting."
        ]
      },
      {
        h: "Preparation tips for summits",
        list: [
          "Make a table of summit name, host, year and main outcome.",
          "Learn the member countries of the major groupings at a glance.",
          "Note the theme of the current year for the largest summits.",
          "For bilateral summits, record the two countries and the agreements signed.",
          "Link each summit to the international affairs section so revision overlaps.",
          "Attempt the set after major summit months, as the facts change through the year."
        ]
      }
    ],
    faqs: [
      { q: "Are summits asked in Assam exams?", a: "Yes. A few questions on major summits, their hosts and outcomes appear in most papers, and the topic is easy because the list is limited." },
      { q: "Which summits are most important?", a: "G20, BRICS, SCO, SAARC, BIMSTEC, ASEAN and the United Nations General Assembly are the most frequently asked." },
      { q: "Do I need to know all member countries?", a: "It helps to know the members of the main groupings, as questions sometimes ask which country is not a member." },
      { q: "Is the theme of the summit asked?", a: "For major summits such as the G20, yes. The theme of the current year is often asked directly." },
      { q: "Can I read summits current affairs in Assamese?", a: "Yes. All questions and explanations are bilingual and can be read in Assamese or English." },
      { q: "Is the summits and conferences section free?", a: "Yes. Every question, answer and explanation is free with no login or subscription." }
    ]
  },

  obituaries: {
    title: "Obituaries Current Affairs Questions for ADRE, APSC | axomexam",
    meta: "Obituaries current affairs for ADRE, Assam Police, APSC and SSC. Noted personalities who passed away, their contributions and achievements with bilingual answers and explanations.",
    h2: "Obituaries Current Affairs Questions",
    lead: [
      "Obituaries is a respectful and factual section that asks about the life and contribution of noted personalities who passed away during the year. The questions pair a name with a field, an award or a famous work. Because the facts are distinct, this section can be mastered quickly with careful revision.",
      "Axomexam records each personality with the field they served, their best-known achievement and any major award, so that a question about a singer, a scientist, a politician or a sportsperson can be answered from a single line of revision."
    ],
    sections: [
      {
        h: "What obituary questions cover",
        list: [
          "Personalities from politics, literature, cinema, music, sport and science.",
          "The field, designation or organisation the person was associated with.",
          "Famous works, awards and contributions for which they were known.",
          "Assamese and North-East personalities, which are especially important for state exams.",
          "International figures who passed away during the year.",
          "The age, the place or the cause of death, which are occasionally asked."
        ]
      },
      {
        h: "How to revise obituaries respectfully and effectively",
        p: [
          "The easiest way to remember an obituary fact is to anchor it to the person's field first. The field narrows down everything else, and it is the fact most often tested. After the field, note one famous work or achievement and one award. This three-part note for each personality covers the vast majority of the ways the question can be asked, and it keeps the revision brief and dignified."
        ]
      },
      {
        h: "Preparation tips for obituaries",
        list: [
          "Group the personalities by field so that similar names do not blur together.",
          "Give extra revision time to Assamese and North-East personalities.",
          "Note one famous work or achievement for each person.",
          "Revise the list monthly along with appointments and awards.",
          "Be careful with personalities whose names are similar, and learn their field to tell them apart.",
          "Attempt the set to confirm you remember the field as well as the name."
        ]
      }
    ],
    faqs: [
      { q: "Is obituaries asked in ADRE and Assam Police?", a: "Yes. A question or two usually appears, and the topic is easy to prepare because each fact is a distinct name paired with a field or an achievement." },
      { q: "Are Assamese personalities included?", a: "Yes. Assamese and North-East personalities carry special importance in state exams and are covered clearly in this section." },
      { q: "What is asked most from this section?", a: "The field or profession of the personality, along with one famous work or award, is asked most frequently." },
      { q: "How can I avoid mixing up names?", a: "Learn each name with the field attached. The field is the strongest clue and prevents most confusion." },
      { q: "Can I read obituaries in Assamese?", a: "Yes. Every question and explanation is bilingual and can be read in Assamese or English." },
      { q: "Is the obituaries section free?", a: "Yes. All obituary questions, answers and explanations are free with no login or subscription." }
    ]
  }
};
