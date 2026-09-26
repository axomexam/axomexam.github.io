# ADRE 3.0 Grade IV — Question Upload Guide

This folder uses the **exact same structure as** `data/exams/assam-police/`.
The list of sections and topics is controlled by `data/exams/index.json` (repo root).

## How the folder is organised

```
data/exams/adre/
  syllabus.json                       <- syllabus notes (section type: syllabus)
  <section>.json                      <- section landing data (e.g. elementary-mathematics.json)
  <section>/<topic>/
    index.json                        <- manifest listing the question files (fallback copy)
    question-001.json                 <- question bank file 1
    question-002.json                 <- add more files as question-002, question-003 ...
  <section>/<group>/<topic>/          <- for topics that sit inside a group
    index.json
    question-001.json
```

## Rules

1. Upload questions **only** inside the exact topic folder shown in the table below.
2. Every new file must be named `question-002.json`, `question-003.json`, ... (keep the number rising).
3. Do not put questions in `index.json`. That file is only a manifest; update its `"files"` array when you add a new file.
4. A question file may contain one question object, or an array `[ ... ]` of question objects.
5. Every question needs bilingual `en` and `as` text for `q`, each option and the `explanation`. `correct` is the 0-based index of the right option.

### Sample question file

```json
{
  "id": "synonyms-antonyms-002",
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
```

## Where to upload — section & topic wise

| Section | Topic | Upload folder (inside `data/exams/adre/`) |
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
| General English | Grammar → Parts of Speech | `general-english/grammar/parts-of-speech` |
| General English | Grammar → Articles | `general-english/grammar/articles-determiners` |
| General English | Grammar → Prepositions | `general-english/grammar/prepositions` |
| General English | Grammar → Tenses | `general-english/grammar/tenses-rules` |
| General English | Grammar → Subject-Verb Agreement | `general-english/grammar/subject-verb-agreement` |
| General English | Grammar → Voice Change | `general-english/grammar/voice-change` |
| General English | Vocabulary → Synonyms & Antonyms | `general-english/vocabulary/synonyms-antonyms` |
| General English | Vocabulary → One Word Substitution | `general-english/vocabulary/one-word-substitution` |
| General English | Vocabulary → Idioms & Phrases | `general-english/vocabulary/idioms-phrases` |
| General English | Vocabulary → Spelling Correction / Spotting Errors | `general-english/vocabulary/error-detection` |
| General English | Vocabulary → Fill in the Blanks | `general-english/vocabulary/fill-in-the-blanks` |
| General Knowledge & Assam GK | Assam's History & Culture → Ancient Assam | `general-knowledge-assam-gk/assam-history-culture/ancient-assam` |
| General Knowledge & Assam GK | Assam's History & Culture → Ahom Era & Koch Kingdom | `general-knowledge-assam-gk/assam-history-culture/ahom-koch-kingdoms` |
| General Knowledge & Assam GK | Assam's History & Culture → Yandabo Treaty & British Rule | `general-knowledge-assam-gk/assam-history-culture/yandabo-british-rule` |
| General Knowledge & Assam GK | Assam's History & Culture → Assam in the Freedom Struggle | `general-knowledge-assam-gk/assam-history-culture/assam-freedom-struggle` |
| General Knowledge & Assam GK | Assam's History & Culture → Folk Culture, Bihu & Satriya | `general-knowledge-assam-gk/assam-history-culture/assam-folk-culture` |
| General Knowledge & Assam GK | Assam's History & Culture → Assamese Literature | `general-knowledge-assam-gk/assam-history-culture/assamese-literature` |
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
| Reasoning & Mental Ability | Non-Verbal Reasoning → Figure Series | `logical-reasoning/non-verbal-reasoning/figure-series` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Figure Analogy | `logical-reasoning/non-verbal-reasoning/figure-analogy` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Figure Classification (Odd One Out) | `logical-reasoning/non-verbal-reasoning/figure-classification` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Mirror Image & Water Image | `logical-reasoning/non-verbal-reasoning/mirror-water-image` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Pattern Completion | `logical-reasoning/non-verbal-reasoning/pattern-completion` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Embedded Figures | `logical-reasoning/non-verbal-reasoning/embedded-figures` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Counting of Figures | `logical-reasoning/non-verbal-reasoning/counting-figures` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Paper Folding & Paper Cutting | `logical-reasoning/non-verbal-reasoning/paper-folding-cutting` |
| Reasoning & Mental Ability | Non-Verbal Reasoning → Cubes & Dice | `logical-reasoning/non-verbal-reasoning/cubes-dice` |
| Social Studies | Indian History | `social-studies/indian-history` |
| Social Studies | Political Science & Constitution → Constitution, Preamble, Rights & Duties | `social-studies/polity-constitution/constitution-preamble-rights` |
| Social Studies | Political Science & Constitution → President, PM, Governor & CM | `social-studies/polity-constitution/president-pm-governor-cm` |
| Social Studies | Political Science & Constitution → Panchayati Raj System | `social-studies/polity-constitution/panchayati-raj` |
| Social Studies | Economy & Environment → Indian & Assam Economy | `social-studies/economy-environment/indian-assam-economy` |
| Social Studies | Economy & Environment → Environment & Pollution | `social-studies/economy-environment/environment-pollution` |
