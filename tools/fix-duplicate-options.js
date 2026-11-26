#!/usr/bin/env node
// Replaces duplicate answer options with a fresh distractor drawn from the same
// bank, so every question keeps four distinct options and the key never moves.
// Only touches questions whose options are otherwise sound; the "(incorrect)"
// padded template and the tautological template are reported, not rewritten.
//
//   node tools/fix-duplicate-options.js            # dry run, prints the plan
//   node tools/fix-duplicate-options.js --apply    # writes data + pages + source
//
// The page HTML is pre-rendered from the same bank, and some banks are built
// from a compact row module under tools/, so all three copies are patched
// together. A bank that is not traceable to a source module is reported.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '')
  .split('=').slice(1).join('=')
  .split(',')
  .filter(Boolean);
const PADDED = /\((incorrect|incorrect form|wrong|not correct)/i;

const norm = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();
const unescapeHtml = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.json')) out.push(full);
  }
  return out;
}

function loadBanks() {
  const banks = [];
  for (const file of walk(path.join(ROOT, 'data'))) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch {
      continue;
    }
    if (!Array.isArray(data)) continue;
    const questions = data.filter((q) => q && Array.isArray(q.options) && q.options.length >= 2);
    if (questions.length && (!ONLY.length || ONLY.some((o) => file.includes(o)))) banks.push({ file, questions });
  }
  return banks;
}

function duplicates(options) {
  const seen = new Map();
  options.forEach((o, i) => {
    const key = norm(o.en);
    if (!key) return;
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key).push(i);
  });
  return [...seen.values()].filter((idxs) => idxs.length > 1);
}

const shape = (s) =>
  /^[\d.:,/ -]+$/.test(s) ? 'numeric' : /^[A-Z]/.test(s) ? 'proper' : 'plain';

const TEMPLATE = (qEn) =>
  String(qEn || '')
    .replace(/\b[A-Z][\w'-]*(?:\s+(?:of\s+)?[A-Z][\w'-]*)*/g, ' ')
    .replace(/[^a-z ]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function pickDistractor(question, pool, used, target) {
  const wanted = shape(target.en);
  const targetLen = target.en.length;
  const candidates = pool.filter((c) => {
    if (!c.en || !c.as) return false;
    if (used.has(norm(c.en))) return false;
    if (shape(c.en) !== wanted) return false;
    const plural = /\b(districts|rivers|states|countries)\b/i.test(question.q.en);
    const hasAnd = /\band\b/i.test(c.en);
    if (plural !== hasAnd) return false;
    return true;
  });
  candidates.sort(
    (a, b) => Math.abs(a.en.length - targetLen) - Math.abs(b.en.length - targetLen),
  );
  return candidates[0];
}

function patchPage(bank, question, replacements) {
  const page = path.join(
    ROOT,
    path.relative(ROOT, bank.file)
      .replace(/^data[\\/]exams[\\/]/, 'exams/')
      .replace(/question-001\.json$/, 'index.html'),
  );
  if (!fs.existsSync(page)) return { page: null, changed: 0 };

  let html = fs.readFileSync(page, 'utf8');
  const qText = unescapeHtml(question.q.en);
  let cursor = -1;
  for (let attempt = 0; attempt < 400; attempt += 1) {
    const found = html.indexOf(qText, cursor + 1);
    if (found === -1) break;
    // the question text must sit inside a qa-item block, not in a nav or meta tag
    const blockStart = html.lastIndexOf('<div class="qa-item', found);
    if (blockStart === -1 || found - blockStart > 400) { cursor = found; continue; }
    const blockEnd = html.indexOf('<div class="qa-item', found);
    const block = html.slice(blockStart, blockEnd === -1 ? html.length : blockEnd);

    let changed = 0;
    let newBlock = block;
    for (const { letter, from, to } of replacements) {
      const fromEsc = escapeHtml(from.en);
      const re = new RegExp(
        `\\(${letter}\\) ${fromEsc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} <span class="qs2" lang="as">`,
      );
      if (!re.test(newBlock)) continue;
      newBlock = newBlock.replace(
        re,
        `(${letter}) ${escapeHtml(to.en)} <span class="qs2" lang="as">`,
      );
      // the Assamese span that follows this option now needs the new text
      const at = newBlock.indexOf(`(${letter}) ${escapeHtml(to.en)} <span class="qs2" lang="as">`);
      if (at !== -1) {
        const spanStart = at + newBlock.slice(at).indexOf('lang="as">') + 'lang="as">'.length;
        const spanEnd = newBlock.indexOf('</span>', spanStart);
        if (spanEnd !== -1) {
          newBlock = newBlock.slice(0, spanStart) + escapeHtml(to.as) + newBlock.slice(spanEnd);
        }
      }
      changed += 1;
    }
    if (!changed) { cursor = found; continue; }
    html = html.slice(0, blockStart) + newBlock + html.slice(blockStart + block.length);
    if (APPLY) fs.writeFileSync(page, html);
    return { page: path.relative(ROOT, page), changed };
  }
  return { page: null, changed: 0 };
}

function patchSource(question, replacements) {
  const toolsDir = path.join(ROOT, 'tools');
  const stack = [toolsDir];
  const qEn = question.q.en;
  const touched = [];
  while (stack.length) {
    const dir = stack.pop();
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { continue; }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) { stack.push(full); continue; }
      if (!/\.(js|json)$/.test(entry.name)) continue;
      let text;
      try { text = fs.readFileSync(full, 'utf8'); } catch { continue; }
      if (!text.includes(qEn)) continue;
      const lines = text.split('\n');
      let changed = false;
      for (let i = 0; i < lines.length; i += 1) {
        if (!lines[i].includes(qEn)) continue;
        for (const { from, to } of replacements) {
          if (!lines[i].includes(from.en)) continue;
          lines[i] = lines[i].split(`"${from.en}", "${from.as}"`).join(`"${to.en}", "${to.as}"`);
          lines[i] = lines[i].split(`'${from.en}', '${from.as}'`).join(`'${to.en}', '${to.as}'`);
          changed = true;
        }
      }
      if (changed) {
        if (APPLY) fs.writeFileSync(full, lines.join('\n'));
        touched.push(path.relative(ROOT, full));
      }
    }
  }
  return touched;
}


// --- page sync ---------------------------------------------------------------
// The pages are pre-rendered copies of the bank. They drift when the bank is
// edited by hand, and older pages carry no Assamese span inside an option.
function syncPage(bank, questions) {
  const page = path.join(
    ROOT,
    path.relative(ROOT, bank.file)
      .replace(/^data[\\/]exams[\\/]/, 'exams/')
      .replace(/question-001\.json$/, 'index.html'),
  );
  if (!fs.existsSync(page)) return null;

  let html = fs.readFileSync(page, 'utf8');
  let fixed = 0;
  for (const q of questions) {
    const qText = unescapeHtml(q.q.en);
    const found = html.indexOf(qText);
    if (found === -1) continue;
    const blockStart = html.lastIndexOf('<div class="qa-item', found);
    if (blockStart === -1 || found - blockStart > 400) continue;
    const nextBlock = html.indexOf('<div class="qa-item', found);
    const blockEnd = nextBlock === -1 ? html.length : nextBlock;
    const block = html.slice(blockStart, blockEnd);

    let changed = false;
    const newBlock = block.replace(
      /<div class="qs1" lang="en">\(([A-D])\) ([\s\S]*?)<\/div>/g,
      (whole, letter, content) => {
        const idx = letter.charCodeAt(0) - 65;
        const option = q.options[idx];
        if (!option) return whole;
        const hadAs = /<span class="qs2" lang="as">/.test(content);
        const pageEn = unescapeHtml(content.replace(/<span class="qs2"[\s\S]*$/, '')).trim();
        const asMatch = content.match(/<span class="qs2" lang="as">([\s\S]*?)<\/span>/);
        const pageAs = asMatch ? unescapeHtml(asMatch[1]).trim() : null;
        const enSame = pageEn === option.en.trim();
        const asSame = hadAs ? pageAs === option.as.trim() : true;
        if (enSame && asSame) return whole;
        changed = true;
        const en = escapeHtml(option.en);
        return hadAs
          ? `<div class="qs1" lang="en">(${letter}) ${en} <span class="qs2" lang="as">${escapeHtml(option.as)}</span></div>`
          : `<div class="qs1" lang="en">(${letter}) ${en}</div>`;
      },
    );
    if (!changed) continue;
    html = html.slice(0, blockStart) + newBlock + html.slice(blockEnd);
    fixed += 1;
  }
  if (fixed && APPLY) fs.writeFileSync(page, html);
  return { page: path.relative(ROOT, page), fixed };
}

const banks = loadBanks();
if (process.argv.includes('--sync-pages')) {
  let total = 0;
  for (const bank of banks) {
    const result = syncPage(bank, bank.questions);
    if (result && result.fixed) {
      total += result.fixed;
      console.log(`${APPLY ? 'synced' : 'would sync'} ${String(result.fixed).padStart(3)} question(s)  ${result.page}`);
    }
  }
  console.log(`\n${APPLY ? 'Synced' : 'Would sync'} ${total} question(s).`);
  process.exit(0);
}



// Positional sync: block N in the page belongs to question N in the bank.
// Only used on banks where the block count matches the question count.
function syncPageOrdered(bank) {
  const page = path.join(
    ROOT,
    path.relative(ROOT, bank.file)
      .replace(/^data[\\/]exams[\\/]/, 'exams/')
      .replace(/question-001\.json$/, 'index.html'),
  );
  if (!fs.existsSync(page)) return { page: null, fixed: 0, why: 'no page' };

  let html = fs.readFileSync(page, 'utf8');
  const starts = [...html.matchAll(/<div class="qa-item/g)].map((m) => m.index);
  if (starts.length !== bank.questions.length) {
    return { page: path.relative(ROOT, page), fixed: 0, why: `block count ${starts.length} vs ${bank.questions.length}` };
  }

  let fixed = 0;
  for (let k = starts.length - 1; k >= 0; k -= 1) {
    const start = starts[k];
    const end = k + 1 < starts.length ? starts[k + 1] : html.length;
    const block = html.slice(start, end);
    const q = bank.questions[k];
    let changed = false;
    const rebuilt = block.replace(
      /<div class="qs1" lang="en">\(([A-D])\) ([\s\S]*?)<\/div>/g,
      (whole, letter, content) => {
        const idx = letter.charCodeAt(0) - 65;
        const option = q.options[idx];
        if (!option) return whole;
        const hadAs = /<span class="qs2" lang="as">/.test(content);
        const pageEn = unescapeHtml(content.replace(/<span class="qs2"[\s\S]*$/, '')).trim();
        const asMatch = content.match(/<span class="qs2" lang="as">([\s\S]*?)<\/span>/);
        const pageAs = asMatch ? unescapeHtml(asMatch[1]).trim() : null;
        if (pageEn === option.en.trim() && (!hadAs || pageAs === option.as.trim())) return whole;
        changed = true;
        const en = escapeHtml(option.en);
        return hadAs
          ? `<div class="qs1" lang="en">(${letter}) ${en} <span class="qs2" lang="as">${escapeHtml(option.as)}</span></div>`
          : `<div class="qs1" lang="en">(${letter}) ${en}</div>`;
      },
    );
    if (!changed) continue;
    html = html.slice(0, start) + rebuilt + html.slice(end);
    fixed += 1;
  }
  if (fixed && APPLY) fs.writeFileSync(page, html);
  return { page: path.relative(ROOT, page), fixed };
}

if (process.argv.includes('--sync-ordered')) {
  let total = 0;
  for (const bank of banks) {
    const r = syncPageOrdered(bank);
    if (r.fixed) { total += r.fixed; console.log(`${APPLY ? 'synced' : 'would sync'} ${String(r.fixed).padStart(3)}  ${r.page}`); }
    else if (r.why && r.why !== 'no page') console.log(`  skipped ${r.page}: ${r.why}`);
  }
  console.log(`\n${APPLY ? 'Synced' : 'Would sync'} ${total} question(s).`);
  process.exit(0);
}

const plan = [];
const skipped = [];

for (const bank of banks) {
  const pool = [];
  for (const q of bank.questions) for (const o of q.options) pool.push({ en: o.en, as: o.as });

  // Answers of questions that share a template are the only safe distractors:
  // they belong to the same category (a river question gets a river).
  const byTemplate = new Map();
  for (const q of bank.questions) {
    const key = TEMPLATE(q.q && q.q.en);
    if (!key) continue;
    if (!byTemplate.has(key)) byTemplate.set(key, []);
    const answer = q.options[q.correct];
    if (answer) byTemplate.get(key).push({ en: answer.en, as: answer.as });
  }

  for (const question of bank.questions) {
    const groups = duplicates(question.options);
    if (!groups.length) continue;
    const texts = question.options.map((o) => o.en);
    if (texts.some((t) => PADDED.test(t))) {
      skipped.push({ bank: bank.file, id: question.id, why: 'padded (incorrect) template' });
      continue;
    }
    const qtext = norm(question.q && question.q.en);
    const echoes = texts.filter((t) => norm(t) && qtext.includes(norm(t))).length;
    if (echoes >= 3) {
      skipped.push({ bank: bank.file, id: question.id, why: 'tautological template' });
      continue;
    }

    const used = new Set(texts.map(norm));
    const replacements = [];
    let feasible = true;
    for (const idxs of groups) {
      const keep = idxs.includes(question.correct) ? question.correct : idxs[0];
      for (const idx of idxs) {
        if (idx === keep) continue;
        const templatePool = byTemplate.get(TEMPLATE(question.q && question.q.en)) || [];
        // Only answers to the same template are safe. A wider pool produced
        // nonsense ("___ you like some tea?" answered with "is he").
        const picked = pickDistractor(question, templatePool, used, question.options[idx]) || null;
        if (!picked) { feasible = false; break; }
        used.add(norm(picked.en));
        replacements.push({
          index: idx,
          letter: String.fromCharCode(65 + idx),
          from: { en: question.options[idx].en, as: question.options[idx].as },
          to: picked,
        });
      }
    }
    if (!feasible || !replacements.length) {
      skipped.push({ bank: bank.file, id: question.id, why: 'no suitable distractor in pool' });
      continue;
    }
    plan.push({ bank, question, replacements });
  }
}

console.log(`${APPLY ? 'APPLYING' : 'DRY RUN'} — ${plan.length} question(s) to fix, ${skipped.length} skipped\n`);
for (const { bank, question, replacements } of plan) {
  console.log(`${path.relative(ROOT, bank.file)}  ${question.id}`);
  console.log(`  Q: ${question.q.en}`);
  for (const r of replacements) {
    console.log(`  ${r.letter}) ${JSON.stringify(r.from.en)}  ->  ${JSON.stringify(r.to.en)}  (${r.to.as})`);
  }
}
if (skipped.length) {
  console.log('\nSkipped (needs an editorial rewrite, not a mechanical swap):');
  for (const s of skipped) console.log(`  ${path.relative(ROOT, s.bank)}  ${s.id}  — ${s.why}`);
}

if (!APPLY) {
  console.log('\nNothing written. Re-run with --apply to patch data, pages and source modules.');
  process.exit(0);
}

let pageCount = 0;
let sourceCount = 0;
for (const { bank, question, replacements } of plan) {
  const original = fs.readFileSync(bank.file, 'utf8');
  const data = JSON.parse(original);
  if (`${JSON.stringify(data, null, 2)}\n` !== original) {
    console.log(`  ! formatting differs, skipped to avoid a whole-file rewrite: ${path.relative(ROOT, bank.file)}`);
    continue;
  }
  const target = data.find((q) => q && q.id === question.id);
  for (const r of replacements) target.options[r.index] = { ...target.options[r.index], ...r.to };
  fs.writeFileSync(bank.file, `${JSON.stringify(data, null, 2)}\n`);

  const pageResult = patchPage(bank, question, replacements);
  if (pageResult.changed) pageCount += 1;
  else console.log(`  ! page not patched: ${path.relative(ROOT, bank.file)} ${question.id}`);

  const sources = patchSource(question, replacements);
  if (sources.length) sourceCount += sources.length;
}

console.log(`\nPatched ${plan.length} questions in data, ${pageCount} pages and ${sourceCount} source module(s).`);
