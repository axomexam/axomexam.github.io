# ADRE 3.0 Grade III — Question Upload Guide

This folder uses the **exact same structure as** `data/exams/adre-grade-4/`.
The list of sections and topics is controlled by `data/exams/index.json` (repo root).

## How the folder is organised

```
data/exams/adre-grade-3/
  syllabus.json                       <- syllabus notes (section type: syllabus)
  <section>.json                      <- section landing data (e.g. elementary-mathematics.json)
  <section>/<topic>/
    index.json                        <- manifest listing the question files
    question-001.json                 <- the whole question bank for the topic
  <section>/<group>/<topic>/          <- for topics that sit inside a group
    index.json
    question-001.json
```

## Rules

1. Upload questions **only** inside the exact topic folder shown in the table below.
2. Keep the whole bank for a topic in its single `question-001.json`. One topic, one file — exactly like `data/exams/adre-grade-4`. Add `question-002.json` and upward only if a topic genuinely needs a second file, and then list it in `index.json`'s `"files"` array.
3. Do not put questions in `index.json`. That file is only a manifest.
4. A question file holds an array `[ ... ]` of question objects.
5. Every question needs bilingual `en` and `as` text for `q`, each option and the `explanation`. `correct` is the 0-based index of the right option.

### Sample question file

```json
[
  {
    "id": "synonyms-002",
    "q": { "en": "...", "as": "..." },
    "options": [
      { "en": "...", "as": "..." },
      { "en": "...", "as": "..." },
      { "en": "...", "as": "..." },
      { "en": "...", "as": "..." }
    ],
    "correct": 0,
    "explanation": { "en": "...", "as": "..." }
  }
]
```

## Where to upload — section & topic wise

| Section | Topic | Upload folder (inside `data/exams/adre-grade-3/`) |
| --- | --- | --- |
| Syllabus | Syllabus notes | `syllabus.json` |
| General Mathematics | Number System | `elementary-mathematics/number-system` |
| General Mathematics | Simplification | `elementary-mathematics/simplification-fractions` |
| General Mathematics | LCM & HCF | `elementary-mathematics/lcm-hcf` |
| General Mathematics | Percentage | `elementary-mathematics/percentage` |
| General Mathematics | Ratio & Proportion | `elementary-mathematics/ratio-proportion` |
| General Mathematics | Average | `elementary-mathematics/average` |
| General Mathematics | Profit & Loss | `elementary-mathematics/profit-loss` |
| General Mathematics | Simple & Compound Interest | `elementary-mathematics/simple-compound-interest` |
| General Mathematics | Time, Speed & Distance | `elementary-mathematics/time-speed-distance` |
| General Mathematics | Time & Work | `elementary-mathematics/time-work` |
| General Mathematics | Problems on Ages | `elementary-mathematics/problems-on-ages` |
| General Mathematics | Basic Mensuration & Geometry | `elementary-mathematics/basic-mensuration` |
| General Mathematics | Partnership | `elementary-mathematics/partnership` |
| General Mathematics | Pipes & Cisterns | `elementary-mathematics/pipes-and-cisterns` |
| General Mathematics | Boats & Streams | `elementary-mathematics/boats-and-streams` |
| General Mathematics | Mixture & Alligation | `elementary-mathematics/mixture-and-alligation` |
| General Mathematics | Algebra | `elementary-mathematics/algebra` |
| General Mathematics | Surds & Indices | `elementary-mathematics/surds-and-indices` |
| General Mathematics | Geometry | `elementary-mathematics/geometry` |
| General Mathematics | Mensuration (2D) | `elementary-mathematics/mensuration-2d` |
| General Mathematics | Mensuration (3D) | `elementary-mathematics/mensuration-3d` |
| General Mathematics | Trigonometry | `elementary-mathematics/trigonometry` |
| General Mathematics | Statistics | `elementary-mathematics/statistics` |
| General Mathematics | Data Interpretation | `elementary-mathematics/data-interpretation` |
| History | Assam History → Ancient Assam | `history/assam-history/assam-history-ancient` |
| History | Assam History → Medieval Assam | `history/assam-history/assam-history-medieval` |
| History | Assam History → Modern Assam | `history/assam-history/assam-history-modern` |
| History | Indian History → Ancient India | `history/indian-history/indian-history-ancient` |
| History | Indian History → Medieval India | `history/indian-history/indian-history-medieval` |
| History | Indian History → Modern India | `history/indian-history/indian-history-modern` |
| History | World History | `history/world-history` |
| General English | Grammar → Parts of Speech | `general-english/grammar/parts-of-speech` |
| General English | Grammar → Articles | `general-english/grammar/articles-determiners` |
| General English | Grammar → Prepositions | `general-english/grammar/prepositions` |
| General English | Grammar → Tenses | `general-english/grammar/tenses-rules` |
| General English | Grammar → Subject-Verb Agreement | `general-english/grammar/subject-verb-agreement` |
| General English | Grammar → Voice Change | `general-english/grammar/voice-change` |
| General English | Grammar → Narration | `general-english/grammar/narration` |
| General English | Vocabulary → Synonyms | `general-english/vocabulary/synonyms` |
| General English | Vocabulary → Antonyms | `general-english/vocabulary/antonyms` |
| General English | Vocabulary → One Word Substitution | `general-english/vocabulary/one-word-substitution` |
| General English | Vocabulary → Idioms & Phrases | `general-english/vocabulary/idioms-phrases` |
| General English | Vocabulary → Spotting Errors | `general-english/vocabulary/error-detection` |
| General English | Vocabulary → Fill in the Blanks | `general-english/vocabulary/fill-in-the-blanks` |
| General English | Vocabulary → Sentence Rearrangement | `general-english/vocabulary/sentence-rearrangement` |
| General Knowledge & Assam GK | Assam's Culture & Literature → Folk Culture, Bihu & Satriya | `general-knowledge-assam-gk/assam-history-culture/assam-folk-culture` |
| General Knowledge & Assam GK | Assam's Culture & Literature → Assamese Literature | `general-knowledge-assam-gk/assam-history-culture/assamese-literature` |
| General Knowledge & Assam GK | Assam's Geography → Brahmaputra & Barak Rivers | `general-knowledge-assam-gk/assam-geography/brahmaputra-barak` |
| General Knowledge & Assam GK | Assam's Geography → National Parks & Sanctuaries | `general-knowledge-assam-gk/assam-geography/assam-national-parks` |
| General Knowledge & Assam GK | Assam's Geography → Natural Resources | `general-knowledge-assam-gk/assam-geography/assam-natural-resources` |
| General Knowledge & Assam GK | India General Knowledge → Rivers, Mountains & States | `general-knowledge-assam-gk/india-general-knowledge/india-rivers-mountains-states` |
| General Knowledge & Assam GK | India General Knowledge → Important Days & Dates | `general-knowledge-assam-gk/india-general-knowledge/important-days-dates` |
| General Knowledge & Assam GK | India General Knowledge → Awards & Honours | `general-knowledge-assam-gk/india-general-knowledge/awards-honours` |
| General Knowledge & Assam GK | India General Knowledge → Sports | `general-knowledge-assam-gk/india-general-knowledge/sports` |
| General Knowledge & Assam GK | Current Affairs → Assam & India Current Affairs | `general-knowledge-assam-gk/current-affairs/assam-india-current-affairs` |
| General Knowledge & Assam GK | Current Affairs → Government Schemes | `general-knowledge-assam-gk/current-affairs/government-schemes` |
| Reasoning & Mental Ability | Verbal Reasoning → Number Series & Alphabet Series | `logical-reasoning/verbal-reasoning/number-alphabet-series` |
| Reasoning & Mental Ability | Verbal Reasoning → Alpha-Numeric Series | `logical-reasoning/verbal-reasoning/alpha-numeric-series` |
| Reasoning & Mental Ability | Verbal Reasoning → Alphabet Test & Word Formation | `logical-reasoning/verbal-reasoning/alphabet-test-word-formation` |
| Reasoning & Mental Ability | Verbal Reasoning → Coding-Decoding | `logical-reasoning/verbal-reasoning/coding-decoding` |
| Reasoning & Mental Ability | Verbal Reasoning → Blood Relations | `logical-reasoning/verbal-reasoning/blood-relations` |
| Reasoning & Mental Ability | Verbal Reasoning → Direction Sense Test | `logical-reasoning/verbal-reasoning/direction-distance` |
| Reasoning & Mental Ability | Verbal Reasoning → Analogy | `logical-reasoning/verbal-reasoning/analogy` |
| Reasoning & Mental Ability | Verbal Reasoning → Classification / Odd One Out | `logical-reasoning/verbal-reasoning/odd-one-out` |
| Reasoning & Mental Ability | Verbal Reasoning → Ranking & Order Test | `logical-reasoning/verbal-reasoning/ranking-order` |
| Reasoning & Mental Ability | Verbal Reasoning → Word Formation & Dictionary Order | `logical-reasoning/verbal-reasoning/word-formation-dictionary` |
| Reasoning & Mental Ability | Verbal Reasoning → Venn Diagrams | `logical-reasoning/verbal-reasoning/venn-diagrams` |
| Reasoning & Mental Ability | Verbal Reasoning → Syllogism / Statements & Conclusions | `logical-reasoning/verbal-reasoning/syllogism` |
| Reasoning & Mental Ability | Verbal Reasoning → Mathematical Operations | `logical-reasoning/verbal-reasoning/mathematical-operations` |
| Reasoning & Mental Ability | Verbal Reasoning → Clock & Calendar | `logical-reasoning/verbal-reasoning/clock-calendar` |
| Reasoning & Mental Ability | Verbal Reasoning → Data Sufficiency | `logical-reasoning/verbal-reasoning/data-sufficiency` |
| Reasoning & Mental Ability | Verbal Reasoning → Input-Output & Machine | `logical-reasoning/verbal-reasoning/input-output-machine` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Seating Arrangement | `logical-reasoning/analytical-critical-reasoning/seating-arrangement` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Complex Puzzles | `logical-reasoning/analytical-critical-reasoning/complex-puzzles` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Inequality | `logical-reasoning/analytical-critical-reasoning/inequality` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Statement & Conclusions | `logical-reasoning/analytical-critical-reasoning/statement-conclusions` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Statement & Assumptions | `logical-reasoning/analytical-critical-reasoning/statement-assumptions` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Statement & Arguments | `logical-reasoning/analytical-critical-reasoning/statement-arguments` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Statement & Course of Action | `logical-reasoning/analytical-critical-reasoning/statement-course-of-action` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Cause & Effect | `logical-reasoning/analytical-critical-reasoning/cause-effect` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Assertion & Reason | `logical-reasoning/analytical-critical-reasoning/assertion-reason` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Decision Making | `logical-reasoning/analytical-critical-reasoning/decision-making` |
| Reasoning & Mental Ability | Analytical & Critical Reasoning → Drawing Inferences | `logical-reasoning/analytical-critical-reasoning/drawing-inferences` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Figure Series | `logical-reasoning/non-verbal-reasoning/figure-series` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Figure Analogy | `logical-reasoning/non-verbal-reasoning/figure-analogy` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Figure Classification (Odd One Out) | `logical-reasoning/non-verbal-reasoning/figure-classification` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Mirror Image & Water Image | `logical-reasoning/non-verbal-reasoning/mirror-water-image` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Pattern Completion | `logical-reasoning/non-verbal-reasoning/pattern-completion` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Embedded Figures | `logical-reasoning/non-verbal-reasoning/embedded-figures` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Counting of Figures | `logical-reasoning/non-verbal-reasoning/counting-figures` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Paper Folding & Paper Cutting | `logical-reasoning/non-verbal-reasoning/paper-folding-cutting` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Cubes & Dice | `logical-reasoning/non-verbal-reasoning/cubes-dice` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Figure Matrix | `logical-reasoning/non-verbal-reasoning/figure-matrix` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Rule Detection | `logical-reasoning/non-verbal-reasoning/rule-detection` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Shape Construction & Grouping | `logical-reasoning/non-verbal-reasoning/shape-construction-grouping` |
| Social Studies | Political Science & Constitution → Constitution, Preamble, Rights & Duties | `social-studies/polity-constitution/constitution-preamble-rights` |
| Social Studies | Political Science & Constitution → President, PM, Governor & CM | `social-studies/polity-constitution/president-pm-governor-cm` |
| Social Studies | Political Science & Constitution → Panchayati Raj System | `social-studies/polity-constitution/panchayati-raj` |
| Social Studies | Economy & Environment → Indian & Assam Economy | `social-studies/economy-environment/indian-assam-economy` |
| Social Studies | Economy & Environment → Environment & Pollution | `social-studies/economy-environment/environment-pollution` |

---

Everything in this folder is generated by `tools/build-adre-grade-3.js` from
`tools/adre-grade-3.structure.js`, `tools/adre-grade-3.notes.js` and
`tools/adre-grade-3.questions.js`. Re-run that script after editing the sources
instead of hand-editing the JSON here.
