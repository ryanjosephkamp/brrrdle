# Progress Step Report — Phase 18.0

## Step
- **Major step / phase**: Phase 18.0 — Governance & Repository Cleanup (Model-Agnostic), planning stage
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §23 (and §23.2 specifically)
- **Report file**: `progress/PROGRESS-STEP-35.md`
- **Date updated**: 2026-05-30
- **Status**: Completed — awaiting user approval before any Phase 18 game code changes

## Summary of Changes
- Reviewed (in order) `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `AGENT-IMPLEMENTATION-PLAN.md`, the new `PHASE-18-WORD-DIFFICULTY-AND-GO-IMPROVEMENTS-SPEC-2026-05-28.md`, the root `README.md`, and the current state of `src/data/`, `src/app/`, `src/account/`, `src/admin/`, `src/game/`, `src/wordExplorer/`, `src/feedback/`, `src/sound/`, plus difficulty/settings/daily-selection touch points.
- **Integrated the user's definitive answers to all five §23.11 questions.** They are now recorded as resolved decisions in `AGENT-IMPLEMENTATION-PLAN.md` §23.2/§23.4/§23.11: (1) compute Casual/Standard tiers **in-repo via a deterministic heuristic** from the existing local JSONs; (2) **Standard = "Expert minus the rarest stratum"** for lengths ≠ 5 and the **union of classic Wordle + Hurdle** at length 5, preserving `Casual ⊆ Standard ⊆ Expert`; (3) the constitution phase-range amendment is **approved** but **applied in prompt 2** per the 3-prompt workflow; (4) the Phase 18 spec is confirmed as the §3.3/§2 scope approval; (5) the **root layout is retained** (doc reorg deferred).
- **Upgraded the root `README.md`** into a professional, comprehensive, visually appealing README (badges, features overview, "Why brrrdle", quick start, tech-stack + scripts tables, env-var guidance, Supabase/admin setup, deployment targets, PWA notes, an updated structure tree incl. `src/latest/`, governance/authoritative-sources, contributing guide, accessibility/security notes). Documentation-only; all facts sourced from `package.json`, `.env.example`, the on-disk tree, and existing docs.
- **Made `BRRRDLE-OVERVIEW.md` model-agnostic.** The three GPT-5.5 references (title, Core Approach, Goal) were rewritten to remove the specific-model assumption while preserving all rules, scope, and success criteria. A repo-wide grep for `GPT-5`/`GPT 5`/`gpt-5`/`GPT5` now returns zero matches.
- **Reviewed `CONSTITUTION.md`; left unchanged in this prompt.** It names no model and is already suitable for Claude Opus 4.8 or any capable model. Per CONSTITUTION §17 and the user's 3-prompt workflow, the approved phase-range amendment (user answer #3) is deferred to prompt 2.
- **Evaluated repository organization; moved no files** (user answer #5 retains the root layout). Nearly all root-level dated spec/report files are referenced by bare filename from governance docs and a source test, so a physical move now would break references.
- **Updated `AGENT-IMPLEMENTATION-PLAN.md` §23** (plan version bumped 1.7 → 1.8 → 1.9): §23.2 cleanup record incl. README upgrade, the finalized answers-only difficulty-tier design, §23.11 rewritten as resolved decisions, sub-phase table rows 18.0/18.1 updated, and exit checklist updated.
- **Updated `CHANGELOG.md`** Phase 18.0 entry documenting exactly what changed.

## Files Changed
- `README.md` — full professional upgrade (documentation-only).
- `BRRRDLE-OVERVIEW.md` — 3 GPT-5.5 references → model-agnostic wording.
- `AGENT-IMPLEMENTATION-PLAN.md` — header status/version (1.7 → 1.8 → 1.9) and §23 Phase 18 addendum updated to integrate the resolved §23.11 answers.
- `CHANGELOG.md` — Unreleased → Phase 18.0 entry.
- `progress/PROGRESS.csv` — row `phase_id = 35`.
- `progress/PROGRESS-STEP-35.md` — this report.

## Verification
- **Checks run**: `git diff --check` (clean); repo-wide grep for `GPT-5`/`GPT 5`/`gpt-5`/`GPT5` across `*.md`, `*.ts`, `*.tsx`, `*.json`, `*.html` → 0 matches.
- **Checks not run**: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`.
- **Reason any checks were skipped**: Phase 18.0 changes are documentation/governance Markdown only — no source, tooling, or config changed. Per the plan's operating rules, lint/build/test are not required for Markdown-only governance edits.

## Blockers, Errors, or Critical Notes
- None blocking. All five §23.11 questions have been **resolved by the user** (2026-05-30) and their answers are integrated into `AGENT-IMPLEMENTATION-PLAN.md` §23.2/§23.4/§23.11. No open questions remain.

## User Action Required Before Next Step
- Review the finalized Phase 18 addendum (`AGENT-IMPLEMENTATION-PLAN.md` §23) and the §23.2 cleanup + upgraded `README.md`.
- Proceed with the 3-prompt workflow: **prompt 2** applies the approved constitution/repo adjustments (incl. the §1/§5/§5.2 phase-range amendment); **prompt 3** executes the Phase 18 feature work.
- Provide explicit approval (e.g., "APPROVE", "Proceed", "Start prompt 2") before any constitution edits or game code changes.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: No — halt for explicit user approval per CONSTITUTION §4 and the user's instruction to halt after drafting the addendum.
- **Next major step**: Phase 18.1 — Pre-flight, baseline capture & optional reference-safe doc reorg.
- **Exact approval needed, if any**: Explicit approval plus resolution of the §23.11 open questions.

## Additional Notes / Annotations
- No game code, tests, or game scripts were changed in this step, per the user's instruction to keep all gameplay/feature implementation gated on approval.
