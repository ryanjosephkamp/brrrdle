# REPOSITORY-REORGANIZATION-PLAN-OPTIMIZED.md

**Project**: brrrdle
**Date**: 2026-06-10
**Version**: 1.1 (Optimized for Codex execution)
**Status**: Optimized planning document only. Reorganization execution remains gated until the user explicitly authorizes it.
**Based on**: `REPOSITORY-REORGANIZATION-PLAN.md` version 1.0

---

## 1. Purpose

This document refines the repository reorganization plan for the transition between Phase 23 and Phase 24.

The goal of the future execution pass is to reduce root-level clutter, preserve historical access, and make future Codex sessions faster and less error-prone without changing gameplay behavior or project runtime configuration.

This optimized plan is written for agentic execution. It separates inventory, moves, compatibility decisions, documentation updates, verification, and handoff so a future Codex agent can execute the work safely.

---

## 2. Authority And Scope

### 2.1 Authority

Use this authority order during the future execution pass:

1. The current user prompt that explicitly authorizes repository reorganization execution.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `BRRRDLE-OVERVIEW.md`.
5. `AGENT-IMPLEMENTATION-PLAN.md` or its approved replacement/shim if the reorganization has already moved it.
6. This optimized plan.
7. Supporting coordination files such as `agents.md`, `memory.md`, and progress reports.

If these sources conflict, stop and report the conflict. Do not silently choose a lower-authority source.

### 2.2 What This Document Authorizes

This document authorizes planning only. It does not authorize moving files, editing source, creating branches, committing, creating a PR, merging, deploying, or beginning Phase 24.

A later execution prompt must explicitly authorize the reorganization before any file moves or edits occur.

### 2.3 Future Execution Scope

The later reorganization execution pass may perform only documentation and repository-organization work unless the user explicitly expands the scope.

Allowed future work:

- Move documentation files into a clearer `planning/` structure.
- Create lightweight planning, history, and testing documentation.
- Audit and update `BRRRDLE-SPEC.md` so it describes the current game accurately.
- Update documentation references that would otherwise break after moves.
- Create progress records for the reorganization.
- Create a PR only if the future execution prompt explicitly authorizes PR creation.

Forbidden future work unless separately authorized:

- Source-code changes under `src/`.
- API changes under `api/`.
- Supabase schema, migration, RLS, policy, or data changes under `supabase/`.
- Test implementation or test rewrites.
- Package, build, lint, TypeScript, Vite, Vercel, or deployment configuration changes.
- Gameplay behavior changes.
- Production deployment, release, or Phase 24 implementation.
- Destructive git operations, file deletion, force-push, branch deletion, reset, rebase, or checkout that discards work.

---

## 3. Current Assumptions

The future execution agent must verify these assumptions before acting:

- Phase 23 bug-fix work is complete for user review and any requested PR/merge steps have either already happened or remain explicitly gated.
- The local worktree is the source of truth named by the user in the future execution prompt.
- The root directory contains many phase and stage specs, diagnosis reports, Vercel logs, and historical planning documents that create context noise.
- `progress/` remains the canonical progress ledger and should stay at the repository root.
- Existing prompts, progress files, and governance documents often refer to root-level filenames such as `CONSTITUTION.md`, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `agents.md`, `memory.md`, `BRRRDLE-SPEC.md`, and `BRRRDLE-OVERVIEW.md`.
- Any move of an authoritative file must preserve an obvious compatibility path, either by keeping the file at root or replacing it with a short root-level pointer/shim that links to the new canonical location.

---

## 4. Target Structure

The target structure should be close to:

```text
brrrdle/
├── README.md
├── package.json
├── package-lock.json
├── tsconfig*.json
├── vite.config.ts
├── vercel.json
├── eslint.config.js
├── .env.example
├── .gitignore
├── index.html
│
├── CONSTITUTION.md                 # active root entrypoint, or short root shim if explicitly moved
├── agents.md                       # active root entrypoint for Codex coordination
├── memory.md                       # active root coordination state
├── BRRRDLE-SPEC.md                 # active root entrypoint, or short root shim if explicitly moved
├── BRRRDLE-OVERVIEW.md             # active root entrypoint, or short root shim if explicitly moved
├── AGENT-IMPLEMENTATION-PLAN.md    # short root compatibility shim after historical move
├── CHANGELOG.md                    # short root compatibility/current changelog shim after historical move
│
├── src/
├── api/
├── public/
├── supabase/
├── themes/
├── docs/
├── progress/
│
└── planning/
    ├── README.md
    ├── IMPLEMENTATION-PLAN.md
    │
    ├── governance/
    │   ├── README.md
    │   └── active-file-index.md
    │
    ├── specs/
    │   ├── phase-23/
    │   ├── phase-24/
    │   └── archive/
    │
    ├── phase-24/
    │   ├── IMPLEMENTATION-PLAN.md
    │   └── CHANGELOG.md
    │
    ├── history/
    │   ├── AGENT-IMPLEMENTATION-PLAN.md
    │   ├── CHANGELOG.md
    │   └── AGENT-IMPLEMENTATION-PLAN-SUMMARY.md
    │
    └── testing/
        └── TESTING-SUITE.md
```

The exact final layout may be adjusted during execution if the inventory shows a safer placement, but the agent must document every adjustment and why it improves future maintainability.

---

## 5. Execution Sequence For The Future Reorganization Pass

### Phase 0 - Safety, Inventory, And Baseline

1. Read the future execution prompt, `CONSTITUTION.md`, this optimized plan, `agents.md`, `memory.md`, and the latest progress report.
2. Run:
   - `git branch --show-current`
   - `git status --short`
   - `git diff --name-status`
3. Confirm whether the worktree is clean or intentionally dirty.
4. Create a before-manifest:
   - `find . -path ./.git -prune -o -type f -print | sort > /tmp/brrrdle-files-before.txt`
5. Capture root clutter before moves:
   - `find . -maxdepth 1 -type f -print | sort`
6. Do not use destructive git commands. Do not delete files. If a file-move mistake occurs, stop and report.

### Phase 1 - File Classification

Classify root-level markdown documents before moving them.

Use these categories:

- **Active root entrypoint**: files future agents or users are expected to read directly by root filename.
- **Historical governance**: long completed plans, historical changelogs, old summaries.
- **Phase/stage spec**: formal phase specs, stage specs, bug notes, diagnosis reports tied to a phase.
- **Operational log/report**: Vercel logs, diagnosis reports, temporary execution notes.
- **Current product documentation**: product spec, overview, README, user-facing docs.
- **Testing documentation**: test philosophy, smoke expectations, E2E matrix.

Produce a short classification table in the progress report before moves.

### Phase 2 - Create Planning Skeleton

Create the target folders first:

- `planning/`
- `planning/governance/`
- `planning/specs/`
- `planning/specs/phase-23/`
- `planning/specs/phase-24/`
- `planning/specs/archive/`
- `planning/phase-24/`
- `planning/history/`
- `planning/testing/`

Do not move files until the skeleton exists.

### Phase 3 - Move Historical And Phase-Specific Documents

Move phase-specific and historical root files into the appropriate planning folder.

Recommended destinations:

- `PHASE-23-*.md` and `phase23_*.md` -> `planning/specs/phase-23/`
- `PHASE-18-*.md`, `PHASE-19-*.md`, `PHASE-20-*.md`, `PHASE-21-*.md`, `PHASE-22-*.md` -> `planning/specs/archive/` unless a phase-specific archive folder is created.
- `ADDITIONS-*.md`, `AUTH-UX-*.md`, `LOCAL-WORD-LISTS-*.md` -> `planning/specs/archive/`
- `DIAGNOSIS-REPORT-*.md` -> `planning/specs/phase-23/` if Phase 23-specific, otherwise `planning/specs/archive/`
- `VERCEL-*-LOGS-*.md` -> `planning/history/`
- `REPOSITORY-REORGANIZATION-PLAN.md` and this optimized plan -> `planning/specs/archive/` or `planning/specs/phase-24/` only if the execution prompt authorizes moving the active plan documents. Otherwise leave them at root until the reorganization completes.

Use `git mv` for tracked files. For untracked files, use normal file moves only after confirming they are intentionally included in the reorganization.

Keep `progress/` at root.

### Phase 4 - Governance File Placement And Compatibility

Use this decision rule:

- Keep a file at root if the constitution, user prompts, Codex startup behavior, or existing agent habits expect that exact root filename.
- Move a file to `planning/history/` if it is long, historical, and no longer the active working plan.
- Move a file to `planning/specs/` if it is a phase or stage source-of-truth spec.
- Move a file to `planning/testing/` if it describes verification philosophy or test strategy.
- If an authoritative file moves, create a short root-level compatibility shim with the original filename unless the user explicitly tells you not to.

Recommended final handling:

- `CONSTITUTION.md`: keep at root as an active authority entrypoint. Optionally add a short note linking to `planning/README.md` only if needed.
- `agents.md`: keep at root as an active Codex coordination entrypoint. Moving it risks future agents missing local instructions.
- `memory.md`: keep at root as the active project coordination state. Archive only older snapshots if they exist.
- `BRRRDLE-SPEC.md`: keep at root unless the future prompt explicitly authorizes root shims. It is constitutionally authoritative and should remain easy to find.
- `BRRRDLE-OVERVIEW.md`: keep at root unless the future prompt explicitly authorizes root shims. It is also part of the current authority stack.
- `AGENT-IMPLEMENTATION-PLAN.md`: move the long Phase 0-23 historical plan to `planning/history/AGENT-IMPLEMENTATION-PLAN.md`, then create a concise root shim named `AGENT-IMPLEMENTATION-PLAN.md` that explains the new plan structure and links to:
  - `planning/IMPLEMENTATION-PLAN.md`
  - `planning/phase-24/IMPLEMENTATION-PLAN.md`
  - `planning/history/AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`: move the long historical changelog to `planning/history/CHANGELOG.md`, then create a concise root shim or current changelog index named `CHANGELOG.md` that links to historical and Phase 24 changelogs.

This compatibility strategy keeps future prompts and agent habits from breaking while still reducing context bloat.

### Phase 5 - BRRRDLE-SPEC.md Audit And Update

The `BRRRDLE-SPEC.md` audit is the highest-risk documentation edit in the reorganization. Treat it as a focused current-state update, not a rewrite.

Rules:

- Ground every material statement in current implementation, current docs, or recent progress reports.
- Prefer concise current-state sections over long historical narrative.
- Do not invent future features, Phase 24 work, or aspirational behavior.
- Do not remove important product constraints just because they are old.
- Separate "current behavior" from "future planned work".
- Preserve known launch constraints such as Daily OG/GO five-letter behavior unless current approved docs explicitly changed them.
- Accurately describe current multiplayer behavior, including Practice/Daily, OG/GO, clocks, Hard Mode controls, forfeit behavior, and Daily Multiplayer invariants.
- Accurately describe current solo behavior, including Practice/Daily, OG/GO, Hard Mode, Customize behavior, GO transitions, definitions, stats/economy, auth/cloud sync, and guest behavior.

Suggested source-grounding:

- `src/app/`
- `src/game/`
- `src/multiplayer/`
- `src/daily/`
- `src/account/`
- `src/stats/`
- `supabase/`
- latest `progress/PROGRESS-STEP-*.md` files
- `planning/history/AGENT-IMPLEMENTATION-PLAN.md` after it moves
- current `CHANGELOG.md` or `planning/history/CHANGELOG.md`

Verification for the spec audit:

- Review the spec diff directly.
- Search for unsupported claims such as "planned", "future", "will", or feature names that are not present in implementation.
- Confirm the updated spec does not say Phase 24 work already exists.
- Document any uncertainty as a known limitation rather than guessing.

### Phase 6 - Create Lightweight Planning Documents

Create:

- `planning/README.md`
- `planning/IMPLEMENTATION-PLAN.md`
- `planning/phase-24/IMPLEMENTATION-PLAN.md`
- `planning/phase-24/CHANGELOG.md`
- `planning/history/AGENT-IMPLEMENTATION-PLAN-SUMMARY.md`
- `planning/governance/README.md`
- `planning/governance/active-file-index.md`

`planning/README.md` should explain:

- The new tiered planning structure.
- Which files future agents should read first.
- Where historical Phase 23 context lives.
- How to add future phase specs without cluttering root.
- How to keep future plans concise.
- How progress tracking remains rooted in `progress/`.

`planning/IMPLEMENTATION-PLAN.md` should be a high-level living plan, not a replacement for detailed phase specs.

`planning/phase-24/IMPLEMENTATION-PLAN.md` should start Phase 24 with a concise structure and leave detailed implementation gated until the user provides the Phase 24 spec.

`planning/phase-24/CHANGELOG.md` should start empty or with a short "Unreleased" section for future Phase 24 work.

`planning/history/AGENT-IMPLEMENTATION-PLAN-SUMMARY.md` should summarize the history through Phase 23 and link to the full archived plan. Keep it concise enough to be useful as a first-pass orientation file.

### Phase 7 - Testing Suite Foundation

Create `planning/testing/TESTING-SUITE.md` as documentation only.

It should define testing philosophy, not implement tests.

Required principles:

- Core gameplay correctness comes first.
- Wordle-style duplicate-letter coloring and Hard Mode behavior are high-value regression targets.
- Solo and multiplayer flows both need coverage.
- Any future multiplayer behavior claim should use real two-client Supabase-backed browser E2E unless explicitly scoped otherwise.
- Smoke tests should cover routing, auth, Daily/Practice entry points, and basic responsive rendering.
- UI tests should avoid overfitting Phase 23 visuals because Phase 24 may intentionally change navigation and layout.
- Test selectors should prefer stable roles, labels, and durable test IDs where appropriate.
- Resource checks should remain part of heavy E2E work: one dev server, minimal browser contexts, close contexts promptly, and verify no runaway processes.

Explicitly out of scope during repository reorganization:

- Implementing the full testing suite.
- Rewriting existing tests.
- Changing test commands or package scripts.
- Adding new test dependencies.

### Phase 8 - Reference And Link Updates

After moves, update references in documentation so readers can still find files.

Recommended approach:

1. Use `rg` to find old root references:
   - `rg -n "AGENT-IMPLEMENTATION-PLAN.md|CHANGELOG.md|PHASE-23-|BRRRDLE-SPEC.md|BRRRDLE-OVERVIEW.md|CONSTITUTION.md|agents.md|memory.md|REPOSITORY-REORGANIZATION-PLAN"`
2. Update references in docs, planning files, progress reports, and root shims where appropriate.
3. Do not edit source code, tests, configs, or Supabase files just to update comments or links unless the execution prompt explicitly authorizes it.
4. If source/test/config files contain stale documentation references, report them as known limitations instead of changing code-adjacent files.

### Phase 9 - Progress Tracking

Use numeric progress tracking as the canonical record.

Recommended strategy:

- Read `progress/PROGRESS.csv` at execution start and use the next sequential numeric `phase_id`.
- Append one new row for the repository reorganization.
- Create `progress/PROGRESS-STEP-<N>.md` for the same numeric ID.
- Optionally create `progress/PROGRESS-STEP-REPO-REORG.md` only as a human-friendly pointer to the numeric report, if the execution prompt explicitly allows an extra progress file.

The progress report must include:

- Starting branch and status.
- Whether the worktree was clean or intentionally dirty.
- Before/after root file inventory.
- File classification summary.
- Files moved.
- Files created.
- Files edited.
- Files intentionally left at root and why.
- `BRRRDLE-SPEC.md` audit summary.
- Reference update summary.
- Verification commands and results.
- Known limitations.
- Whether PR creation was authorized and performed.

### Phase 10 - Final Verification

Run the following checks before handoff:

- Confirm no files were deleted:
  - Compare `/tmp/brrrdle-files-before.txt` with a new after-manifest.
  - Review `git diff --name-status` for unexpected `D` entries.
- Confirm root clutter was reduced:
  - Compare before/after `find . -maxdepth 1 -type f -print | sort`.
- Confirm moved files are accessible:
  - `test -f` for each expected destination.
- Confirm key root entrypoints still exist or have clear shims:
  - `CONSTITUTION.md`
  - `agents.md`
  - `memory.md`
  - `BRRRDLE-SPEC.md`
  - `BRRRDLE-OVERVIEW.md`
  - `AGENT-IMPLEMENTATION-PLAN.md`
  - `CHANGELOG.md`
- Confirm references were updated:
  - Run targeted `rg` checks for old paths and filenames.
- Confirm source/test/config/Supabase files were not changed unless explicitly authorized:
  - `git diff --name-only`
  - inspect any path under `src/`, `api/`, `supabase/`, `public/`, `themes/`, package/config files, or TypeScript/Vite/Vercel config.
- Run:
  - `git diff --check`
- Run app tests only if the future prompt authorizes them or if the reorganization touches source/config/package files. For docs-only movement, `git diff --check`, inventory checks, and link/path checks are the primary gate.

### Phase 11 - Optional PR

Create a PR only if the later execution prompt explicitly authorizes it.

If PR creation is authorized:

- Create a branch with the `codex/` prefix.
- Commit only the reorganization changes.
- Push the branch.
- Create a PR with a concise summary, verification checklist, and explicit note that no gameplay/source behavior changed.
- Do not merge unless the user explicitly authorizes merge in the same prompt or a later prompt.

---

## 6. File Classification And Placement Rules

### 6.1 Keep At Root

Keep these at root unless the user explicitly authorizes root shims and the execution agent updates compatibility references:

- `README.md`
- `CONSTITUTION.md`
- `agents.md`
- `memory.md`
- `BRRRDLE-SPEC.md`
- `BRRRDLE-OVERVIEW.md`
- `progress/`
- Runtime and tooling files such as `package.json`, `package-lock.json`, `tsconfig*.json`, `vite.config.ts`, `vercel.json`, `eslint.config.js`, `.env.example`, `.gitignore`, and `index.html`.

Rationale: these are active entrypoints, authority-stack files, or tooling files. Moving them without compatibility shims can cost future agents more context and create avoidable errors.

### 6.2 Move To `planning/history/`

Move long historical planning documents and operational logs here:

- Archived full `AGENT-IMPLEMENTATION-PLAN.md`.
- Archived full `CHANGELOG.md`.
- `VERCEL-*-LOGS-*.md`.
- Completed historical reports not tied to a still-active phase spec.

### 6.3 Move To `planning/specs/phase-23/`

Move Phase 23 formal specs, stage specs, bug notes, diagnosis reports, and supporting Phase 23 planning artifacts here.

Examples:

- `PHASE-23-*.md`
- `phase23_*.md`
- Phase 23 diagnosis reports if clearly tied to Phase 23.

### 6.4 Move To `planning/specs/archive/`

Move earlier phase specs and historical artifacts here unless a cleaner per-phase archive is created.

Examples:

- `PHASE-18-*.md`
- `PHASE-19-*.md`
- `PHASE-20-*.md`
- `PHASE-21-*.md`
- `PHASE-22-*.md`
- `ADDITIONS-*.md`
- `AUTH-UX-*.md`
- `LOCAL-WORD-LISTS-*.md`

### 6.5 Move To `planning/testing/`

Move or create test-strategy documentation here. Do not place executable test code here.

---

## 7. Stop Conditions

Stop and report immediately if:

- Any required file is missing or cannot be read.
- The future execution prompt does not clearly authorize reorganization execution.
- A move would require deleting a file.
- A move would require changing source, tests, configs, Supabase, deployment settings, or package metadata without explicit authorization.
- An authoritative file would be moved without a root compatibility entrypoint.
- A reference update would require broad rewriting of historical progress reports.
- `BRRRDLE-SPEC.md` cannot be updated without guessing about current behavior.
- `git diff --name-status` shows unexpected deletions.
- Verification reveals broken paths that cannot be fixed with documentation-only edits.
- The agent is tempted to use `git reset`, `git checkout --`, `git clean`, force-push, or branch deletion.

---

## 8. Final Handoff Requirements

The future execution handoff must include:

- Summary of what was reorganized.
- Final branch name and worktree state.
- Files moved, files created, and files edited.
- Files intentionally left at root and why.
- `BRRRDLE-SPEC.md` audit/update summary.
- New planning structure summary.
- Progress report path and `phase_id`.
- Verification commands and results.
- Confirmation that no source code, tests, configs, Supabase files, gameplay behavior, deployment settings, production state, or Phase 24 implementation work changed unless explicitly authorized.
- Known limitations or deferred cleanup.
- PR URL only if PR creation was explicitly authorized and completed.
- Clear next step for user review.

---

## 9. Optimization Notes

This optimized version changes the original plan in the following ways:

- It separates the future execution into inventory, classification, skeleton creation, moves, governance placement, spec audit, reference updates, progress tracking, verification, and optional PR phases. This reduces ambiguity and makes it easier for Codex to proceed safely.
- It adds compatibility rules for authoritative root files. This prevents future agents from losing the expected entrypoints while still allowing the large historical plan and changelog to move out of the root.
- It tightens `BRRRDLE-SPEC.md` update guidance so the audit is grounded in current implementation and approved docs rather than a historical rewrite or aspirational feature list.
- It makes the testing-suite foundation explicitly documentation-only and avoids implementing or rewriting tests during a repository cleanup pass.
- It makes numeric progress tracking canonical while allowing a human-friendly repo-reorg pointer only if explicitly authorized.
- It adds concrete verification commands for no-deletion checks, root clutter reduction, path accessibility, reference checks, and source/config non-touch confirmation.
- It gates PR creation and merge behind explicit future authorization, avoiding accidental publication from a docs cleanup plan.

These changes should reduce token waste in future work, keep the active context smaller, and protect the repository from broken references or accidental scope expansion during the reorganization.
