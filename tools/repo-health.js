#!/usr/bin/env node
// Repository health report. Run before a push and after any site-wide change:
//   node tools/repo-health.js
// Exits 1 when a budget in BUDGET is broken, so CI can use it as a gate.

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const MB = 1024 * 1024;

const BUDGET = {
  repoMb: 150,
  fileMb: 10,
  filesPerCommit: 1000,
};

const git = (cmd) => execSync(`git ${cmd}`, { encoding: 'utf8', maxBuffer: 256 * MB }).trim();

function packSizeMb() {
  const out = git('count-objects -v');
  const pack = Number((out.match(/^size-pack:\s*(\d+)/m) || [])[1] || 0) / 1024;
  const loose = Number((out.match(/^size:\s*(\d+)/m) || [])[1] || 0) / 1024 / 1024;
  return pack + loose;
}

function trackedFiles() {
  return git('ls-files').split('\n').filter(Boolean);
}

function largestTracked(files, n = 8) {
  return files
    .map((f) => ({ f, size: fs.statSync(path.resolve(f)).size }))
    .sort((a, b) => b.size - a.size)
    .slice(0, n);
}

function largestBlobs(limit = 6) {
  const objs = execSync("git rev-list --objects --all | cut -d' ' -f1", { encoding: 'utf8', maxBuffer: 256 * MB });
  const check = execSync('git cat-file --batch-check="%(objecttype) %(objectname) %(objectsize)"', {
    input: objs,
    encoding: 'utf8',
    maxBuffer: 256 * MB,
  });
  return check
    .split('\n')
    .filter((l) => l.startsWith('blob '))
    .map((l) => {
      const [, sha, size] = l.split(' ');
      return { sha, size: Number(size) };
    })
    .sort((a, b) => b.size - a.size)
    .slice(0, limit);
}

const problems = [];
const print = (label, value) => console.log(`  ${label.padEnd(28)} ${value}`);

console.log('Repository health\n');

const repoMb = packSizeMb();
const commits = Number(git('rev-list --count --all'));
const files = trackedFiles();
const bytes = files.reduce((sum, f) => {
  try {
    return sum + fs.statSync(path.resolve(f)).size;
  } catch {
    return sum;
  }
}, 0);

print('pack size', `${repoMb.toFixed(1)} MB (budget ${BUDGET.repoMb} MB)`);
if (repoMb > BUDGET.repoMb) problems.push(`pack size ${repoMb.toFixed(1)} MB over ${BUDGET.repoMb} MB`);

print('commits', commits);
print('branches', git('branch -a').split('\n').filter(Boolean).length);
print('tracked files', `${files.length} (${(bytes / MB).toFixed(0)} MB on disk)`);

const last = git('diff-tree --no-commit-id --name-only -r -m HEAD').split('\n').filter(Boolean).length;
print('files in HEAD commit', `${last} (budget ${BUDGET.filesPerCommit})`);
if (commits > 1 && last > BUDGET.filesPerCommit) {
  problems.push(`HEAD touched ${last} files, which is a site-wide rewrite, not a content change`);
}

console.log('\nLargest tracked files');
for (const { f, size } of largestTracked(files)) {
  const flag = size > BUDGET.fileMb * MB ? '  <-- over budget' : '';
  console.log(`  ${(size / MB).toFixed(1).padStart(6)} MB  ${f}${flag}`);
  if (size > BUDGET.fileMb * MB) problems.push(`${f} is ${(size / MB).toFixed(1)} MB`);
}

console.log('\nLargest objects in history');
for (const { sha, size } of largestBlobs()) {
  console.log(`  ${(size / MB).toFixed(1).padStart(6)} MB  ${sha.slice(0, 10)}`);
}

console.log('');
if (problems.length) {
  console.log('VERDICT: attention needed');
  problems.forEach((p) => console.log(`  - ${p}`));
  console.log('\nSee AGENTS.md -> "Repo hygiene" for what to do.');
  process.exit(1);
}
console.log('VERDICT: healthy');
