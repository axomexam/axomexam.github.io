# CLAUDE.md

Read **AGENTS.md** in this repository before doing anything. It holds the
working rules, the content quality bar, the merge conflict rule and the repo
hygiene budget. This file exists only so tools that look for `CLAUDE.md`
instead of `AGENTS.md` find their way there.

Non-negotiables, copied from AGENTS.md so they are visible even if only this
file is read:

- Never lose content, never change the UI without being asked.
- Never invent a fact, a date, a name or a source.
- `node tools/repo-health.js` must end with `VERDICT: healthy` before a push.
- The pre-commit gate lives in `.githooks/pre-commit`; enable it with
  `git config core.hooksPath .githooks`.
- Never commit generated artifacts, tokens, keys or backups.
