"use strict";

/*
 * Human-written source material for the DHS & DME Technical Grade III study
 * notes. Every entry points at prose that was written for this site, not at a
 * template: the RRB NTPC topic articles, the ADRE Grade III notes, and the
 * long-form e-book chapters in data/books.
 *
 *   r: "mathematics/percentage"  -> tools/rrb-ntpc-ga-articles/<path>.js
 *   a: "percentage"              -> tools/adre-grade-3.notes.js
 *   e: "percentage"              -> tools/adre-grade-3.expand-notes.js
 *   n: "parts-of-speech"         -> tools/adre-grade-3.english-notes.js
 *   b: ["assam-history", [...]]  -> data/books/<book>.json, selected chapters
 *   o: true                      -> no source; written in notes.original.js
 *
 * Sources are blended (not copied whole) so a DHS page is not a duplicate of
 * the RRB or ADRE page that shares the topic.
 */

module.exports = {
  /* ---------------- General Knowledge ---------------- */
  "assam-history-ancient": [
    { b: ["assam-history", ["pragjyotisha-kamarupa", "kamarupa-dynasties", "regional-kingdoms", "culture-heritage"]] },
    { a: "assam-history-ancient" },
  ],
  "assam-history-medieval": [
    { b: ["assam-history", ["ahom-foundation", "ahom-administration", "ahom-mughal-saraighat", "koch-kingdom", "sankardeva-vaishnavism"]] },
    { a: "assam-history-medieval" },
  ],
  "assam-history-modern": [
    { b: ["assam-history", ["moamoria-rebellion", "burmese-yandabo", "british-annexation", "colonial-economy", "freedom-movement", "assam-movement", "post-independence"]] },
    { a: "assam-history-modern" },
  ],
  "assam-geography": [
    { b: ["assam-geography", ["location-boundaries", "relief-structure", "brahmaputra-river-system", "climate", "soils", "forests-vegetation", "agriculture", "minerals-energy", "population-demography", "natural-hazards-disasters"]] },
  ],
  "india-geography": [
    { b: ["indian-geography", ["india-location-extent", "geological-structure-relief", "himalayas", "northern-plains", "peninsular-plateau-coastal", "himalayan-rivers", "climate-monsoon", "soils-india", "agriculture-crops", "minerals-energy", "population-demography", "north-east-india"]] },
    { r: "geography/indian-geography" },
  ],
  "polity": [
    { b: ["indian-polity", ["making-of-constitution", "salient-features", "preamble", "fundamental-rights", "directive-principles", "fundamental-duties", "union-executive", "parliament", "supreme-court", "panchayati-raj", "amendment-basic-structure", "elections-ec", "constitutional-bodies"]] },
    { r: "polity/constitution" },
  ],
  "assam-culture-festivals": [
    { b: ["assam-art-culture", ["cultural-heritage-overview", "folk-dances", "festivals", "traditional-attire-jewellery", "traditional-cuisine", "tribal-arts-culture", "sattra-namghar-institutions"]] },
    { a: "assam-folk-culture" },
  ],
  "assam-economy": [
    { r: "economy/assam-economy" },
    { e: "indian-assam-economy" },
    { a: "indian-assam-economy" },
  ],
  "assam-tribes-communities": [
    { b: ["assam-art-culture", ["tribal-arts-culture", "cultural-heritage-overview"]] },
    { b: ["assam-history", ["culture-heritage", "ahom-administration"]] },
    { a: "assam-folk-culture" },
  ],
  "assam-wildlife-environment": [
    { b: ["assam-geography", ["wildlife-national-parks", "forests-vegetation", "water-wetlands", "natural-hazards-disasters"]] },
    { a: "assam-national-parks" },
    { a: "assam-natural-resources" },
  ],
  "assam-current-affairs": [{ e: "assam-india-current-affairs" }],
  "indian-history": [
    { b: ["indian-history", ["prehistoric-india", "indus-valley", "vedic-age", "mahajanapadas-religions", "persian-maurya", "gupta-harsha", "delhi-sultanate", "mughal-empire", "british-conquest", "revolt-1857", "freedom-movement"]] },
    { a: "indian-history" },
  ],
  "indian-economy": [
    { b: ["indian-economy", ["indian-economy-basics", "national-income", "money-banking-rbi", "inflation", "government-budget", "taxation-gst", "planning-niti-aayog", "agriculture-food-security", "industry-msme-services", "foreign-trade-bop", "poverty-unemployment-social", "economic-reforms-initiatives"]] },
    { r: "economy/indian-economy" },
  ],
  "indian-art-culture": [
    { b: ["indian-art-culture", ["prehistoric-art", "indus-valley-art", "mauryan-art", "gupta-classical-art", "nagara-temples", "dravida-vesara-temples", "indo-islamic-architecture", "rock-cut-caves", "indian-sculpture", "miniature-painting", "classical-dances", "classical-music", "textiles-handicrafts", "unesco-heritage-sites"]] },
    { r: "static-gk-computers/art-culture" },
  ],
  "indian-governance": [
    { r: "polity/governance" },
    { a: "constitution-preamble-rights" },
    { a: "panchayati-raj" },
  ],
  "world-geography": [
    { r: "geography/world-geography" },
    { a: "indian-geography" },
  ],
  "world-history": [{ a: "world-history" }, { e: "world-history" }, { b: ["indian-history", ["advent-europeans", "freedom-movement", "culture-heritage"]] }],
  "international-organizations": [
    { r: "static-gk-computers/organizations-institutions" },
    { a: "constitution-preamble-rights" },
  ],
  "awards-honours": [
    { e: "awards-honours" },
    { r: "current-affairs/awards-books-indexes" },
    { a: "awards-honours" },
  ],
  "books-authors": [
    { r: "current-affairs/awards-books-indexes" },
    { e: "assamese-literature" },
  ],
  "important-days": [
    { e: "important-days-dates" },
    { a: "important-days-dates" },
  ],
  "sports-games": [
    { e: "sports" },
    { r: "current-affairs/sports" },
    { a: "sports" },
  ],
  "inventions-discoveries": [{ r: "current-affairs/science-tech-environment" }],
  "organizations-institutions": [
    { r: "static-gk-computers/organizations-institutions" },
    { a: "constitution-preamble-rights" },
  ],
  "space-defence": [
    { r: "static-gk-computers/space-defence" },
    { r: "current-affairs/science-tech-environment" },
  ],
  "miscellaneous-static-gk": [{ r: "static-gk-computers/miscellaneous-static-gk" }],
  "national-international-news": [{ r: "current-affairs/national-international-news" }],
  "appointments-obituaries": [
    { r: "current-affairs/appointments-obituaries" },
    { e: "assam-india-current-affairs" },
  ],
  "government-schemes": [
    { e: "government-schemes" },
    { r: "current-affairs/government-schemes-initiatives" },
    { a: "government-schemes" },
  ],
  "science-tech-environment": [
    { r: "current-affairs/science-tech-environment" },
    { e: "environment-pollution" },
    { a: "environment-pollution" },
  ],

  /* ---------------- General English ---------------- */
  "parts-of-speech": [{ n: "parts-of-speech" }],
  "articles-determiners": [{ n: "articles-determiners" }],
  "prepositions": [{ n: "prepositions" }],
  "tenses": [{ n: "tenses-rules" }],
  "subject-verb-agreement": [{ n: "subject-verb-agreement" }],
  "voice": [{ n: "voice-change" }],
  "narration": [{ n: "narration" }],
  "sentence-correction": [{ n: "error-detection" }],
  "degrees-of-comparison": [{ o: true }],
  "question-tags-modals": [{ o: true }],
  "conjunctions": [{ o: true }],
  "non-finite-verbs": [{ o: true }],
  "general-grammar": [{ n: "prepositions" }, { n: "subject-verb-agreement" }, { n: "voice-change" }],
  "synonyms": [{ n: "synonyms" }],
  "antonyms": [{ n: "antonyms" }],
  "one-word-substitution": [{ n: "one-word-substitution" }],
  "idioms-phrases": [{ n: "idioms-phrases" }],
  "phrasal-verbs": [{ n: "fill-in-the-blanks" }],
  "spelling": [{ n: "error-detection" }],
  "word-formation-roots": [{ a: "word-formation-dictionary" }, { o: true }],
  "homonyms-confusables": [{ n: "synonyms" }, { n: "antonyms" }],
  "general-vocabulary": [{ n: "idioms-phrases" }, { n: "fill-in-the-blanks" }],
  "reading-comprehension": [{ o: true }],
  "cloze-test": [{ n: "fill-in-the-blanks" }],
  "sentence-completion": [{ n: "error-detection" }],
  "paragraph-ordering": [{ n: "sentence-rearrangement" }],
  "precis-summary": [{ o: true }],

  /* ---------------- Numerical Aptitude ---------------- */
  "number-system": [{ r: "mathematics/number-system" }, { a: "number-system" }],
  "simplification-bodmas": [{ r: "mathematics/simplification-bodmas" }, { a: "simplification-fractions" }],
  "decimals-fractions": [{ r: "mathematics/decimals-fractions" }, { a: "simplification-fractions" }],
  "lcm-hcf": [{ r: "mathematics/lcm-hcf" }, { a: "lcm-hcf" }],
  "percentage": [{ r: "mathematics/percentage" }, { a: "percentage" }],
  "ratio-proportion": [{ r: "mathematics/ratio-proportion" }, { a: "ratio-proportion" }],
  "average": [{ r: "mathematics/average" }, { a: "average" }],
  "profit-loss-discount": [{ r: "mathematics/profit-loss-discount" }, { a: "profit-loss" }],
  "simple-interest": [{ r: "mathematics/simple-interest" }, { a: "simple-compound-interest" }],
  "compound-interest": [{ r: "mathematics/compound-interest" }, { a: "simple-compound-interest" }],
  "partnership": [{ r: "mathematics/partnership" }, { a: "partnership" }],
  "mixture-alligation": [{ r: "mathematics/mixture-alligation" }, { a: "mixture-and-alligation" }],
  "time-work": [{ r: "mathematics/time-work" }, { a: "time-work" }],
  "pipes-cisterns": [{ r: "mathematics/pipes-cisterns" }, { a: "pipes-and-cisterns" }],
  "time-speed-distance": [{ r: "mathematics/time-speed-distance" }, { a: "time-speed-distance" }],
  "problems-on-trains": [{ r: "mathematics/problems-on-trains" }],
  "boats-streams": [{ r: "mathematics/boats-streams" }, { a: "boats-and-streams" }],
  "problems-on-ages": [{ r: "mathematics/problems-on-ages" }, { a: "problems-on-ages" }],
  "elementary-algebra": [{ r: "mathematics/elementary-algebra" }, { a: "algebra" }],
  "quadratic-linear-equations": [{ r: "mathematics/quadratic-linear-equations" }, { a: "algebra" }],
  "geometry": [{ r: "mathematics/geometry" }, { a: "geometry" }],
  "mensuration-2d": [{ r: "mathematics/mensuration-2d" }, { a: "mensuration-2d" }],
  "mensuration-3d": [{ r: "mathematics/mensuration-3d" }, { a: "mensuration-3d" }],
  "trigonometry": [{ r: "mathematics/trigonometry" }, { a: "trigonometry" }],
  "height-distance": [{ r: "mathematics/height-distance" }, { a: "trigonometry" }],
  "coordinate-geometry": [{ r: "mathematics/coordinate-geometry" }],
  "statistics": [{ r: "mathematics/statistics" }, { a: "statistics" }],
  "data-interpretation": [{ r: "mathematics/data-interpretation" }, { a: "data-interpretation" }],
  "permutation-combination": [{ o: true }],
  "probability": [{ o: true }],

  /* ---------------- Logical Reasoning ---------------- */
  "analogy": [{ r: "verbal-reasoning/analogy" }, { a: "analogy" }],
  "classification-odd-one-out": [{ r: "verbal-reasoning/classification-odd-one-out" }, { a: "odd-one-out" }],
  "number-series": [{ r: "verbal-reasoning/number-series" }, { a: "number-alphabet-series" }],
  "order-ranking": [{ r: "verbal-reasoning/order-ranking" }, { a: "ranking-order" }],
  "alphabet-test-word-formation": [{ r: "verbal-reasoning/alphabet-test" }, { a: "alphabet-test-word-formation" }],
  "logical-sequence-words": [{ r: "verbal-reasoning/logical-sequence-words" }],
  "mathematical-operations": [{ r: "verbal-reasoning/mathematical-operations" }, { a: "mathematical-operations" }],
  "input-output": [{ r: "verbal-reasoning/input-output" }, { a: "input-output-machine" }],
  "general-verbal-reasoning": [{ r: "verbal-reasoning/order-ranking" }, { r: "verbal-reasoning/logical-sequence-words" }, { r: "verbal-reasoning/mathematical-operations" }],
  "venn-diagrams": [{ r: "analytical-logical-reasoning/venn-diagrams" }, { a: "venn-diagrams" }],
  "statement-conclusions": [{ r: "analytical-logical-reasoning/statement-conclusions" }, { a: "statement-conclusions" }],
  "statement-assumptions": [{ r: "analytical-logical-reasoning/statement-assumptions" }, { a: "statement-assumptions" }],
  "statement-arguments": [{ r: "analytical-logical-reasoning/statement-arguments" }, { a: "statement-arguments" }],
  "statement-course-of-action": [{ r: "analytical-logical-reasoning/statement-course-of-action" }, { a: "statement-course-of-action" }],
  "cause-effect": [{ r: "analytical-logical-reasoning/cause-effect" }, { a: "cause-effect" }],
  "assertion-reason": [{ r: "analytical-logical-reasoning/assertion-reason" }, { a: "assertion-reason" }],
  "decision-making-data-sufficiency": [{ r: "analytical-logical-reasoning/decision-making-data-sufficiency" }, { a: "decision-making" }],
  "inequality": [{ r: "verbal-reasoning/inequality" }, { a: "inequality" }],
  "figure-series": [{ r: "non-verbal-reasoning/figure-series" }, { a: "figure-series" }],
  "figure-analogy-classification": [{ r: "non-verbal-reasoning/figure-series" }, { a: "figure-analogy" }, { a: "figure-classification" }],
  "mirror-water-image": [{ r: "non-verbal-reasoning/mirror-water-image" }, { a: "mirror-water-image" }],
  "paper-cutting-folding": [{ r: "non-verbal-reasoning/paper-cutting-folding" }, { a: "paper-folding-cutting" }],
  "embedded-figures": [{ r: "non-verbal-reasoning/embedded-figures" }, { a: "embedded-figures" }],
  "pattern-completion": [{ r: "non-verbal-reasoning/pattern-completion" }, { a: "pattern-completion" }],
  "counting-figures": [{ r: "non-verbal-reasoning/counting-figures" }, { a: "counting-figures" }],
  "visual-memory": [{ o: true }],
  "general-non-verbal-reasoning": [{ r: "non-verbal-reasoning/paper-cutting-folding" }, { r: "non-verbal-reasoning/embedded-figures" }, { r: "non-verbal-reasoning/counting-figures" }],
};
