# Progress Step 132: Phase 23 Stage 17 Execution Kickoff

**Phase**: 23 — Multiplayer Foundations and Polish
**Stage**: 17 — Solo Practice GO Customize Lock Bug Fix
**Status**: Completed — Reproduction And Fix Pending
**Date**: 2026-06-08
**phase_id**: 132

## Summary

Stage 17 execution is now explicitly opened from `PHASE-23-STAGE-17-SOLO-PRACTICE-GO-CUSTOMIZE-LOCK-BUGFIX-SPEC-2026-06-08.md`.

This checkpoint records the protected starting state, baseline resource snapshot, reproduction plan, Solo Practice GO-only scope boundary, and verification plan before any source-code fix.

## Protected Starting State

- Active branch: `codex/phase-23-stage-16-final`.
- `git status --short` confirmed the current local Stage 17 planning/governance state is present and must be preserved.
- Existing Stage 17 planning/governance dirt at kickoff:
  - Modified: `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `agents.md`, `memory.md`, `progress/PROGRESS.csv`.
  - Untracked: `PHASE-23-STAGE-17-SOLO-PRACTICE-GO-CUSTOMIZE-LOCK-BUGFIX-SPEC-2026-06-08.md`, `progress/PROGRESS-STEP-131.md`.
- No reset, rebase, pull, branch switch, discard, force-push, branch deletion, PR creation, merge, release, or production deployment is authorized.

## Baseline Resource Snapshot

Captured before source fixes, dev-server startup, or browser verification:

- `ps aux -m | head -25` showed existing Codex, VS Code, Chrome, Finder, Eloquent, and system processes. No Stage 17-owned app server or browser context had been started.
- `top -l 1 -o mem | head -30` reported:
  - 647 processes.
  - Load average around `5.73, 4.96, 4.69`.
  - Physical memory: `17G used`, `186M unused`, `6365M compressor`.
  - Highest memory processes were pre-existing user/system apps such as Obsidian, Finder, Eloquent, WindowServer, Codex, Chrome, VS Code, and Python workers.
- `vm_stat` confirmed high compressed-memory pressure was already present before Stage 17 browser work.
- `lsof` found no Vite/dev-server listener on the usual local app ports (`5173`, `5174`, `3000`, `4173`).

Resource discipline for this tiny stage:

- Use one Vite dev server only if browser verification requires it.
- Avoid parallel full gates.
- Avoid excessive browser contexts/tabs.
- Close browser contexts and any Stage 17-owned dev server after verification.
- Finish with a final resource/process snapshot.

## Scope Boundary

Stage 17 is limited to one bug in **Solo Practice GO only**:

- The Customize box currently locks Difficulty and chain length on a brand-new GO chain before any guess is submitted.
- Correct behavior: match Solo Practice OG. Fresh Practice GO chains keep options unlocked until the first submitted guess in the current chain, then lock.

Explicitly out of scope:

- Solo Practice OG behavior changes.
- Solo Daily GO or Daily Multiplayer GO changes.
- Practice Multiplayer GO or any Multiplayer GO changes.
- Any other solo mode changes.
- Stage 15 authenticated Practice seed behavior.
- Daily OG/GO deterministic selection.
- Hard Mode behavior.
- Resume behavior.
- Scoring/rating/ELO logic.
- GO chain advancement.
- Customize layout, styling, or copy.
- Broad Practice GO or Customize architecture changes.
- PR creation, merge, release, production deployment, or later-phase work.

If the root cause requires an out-of-scope surface, execution must stop and report rather than broadening the fix.

## Reproduction Plan

Before any source fix, Stage 17 must demonstrate:

1. A freshly created Solo Practice GO chain shows the locked Customize message before any guess is submitted.
2. Difficulty and/or chain length controls are unavailable or treated as locked despite zero submitted guesses.
3. Solo Practice OG does not have this fresh-puzzle lock and remains the behavioral reference.

The reproduction may use focused regression tests, targeted browser verification, or both, but evidence must be captured before changing the locking condition.

## Verification Plan

After the single focused fix:

1. Run focused changed-area tests for the locking condition.
2. Verify:
   - Solo Practice GO fresh chain: Customize options are unlocked.
   - Solo Practice GO after first submitted guess: Customize options are locked.
   - Solo Practice GO "New go chain" returns Customize options to unlocked.
   - Solo Practice OG remains unchanged.
3. Run the full automated gate:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
   - `npx tsc -p tsconfig.api.json --noEmit`
   - `git diff --check`
4. Run desktop, tablet-like, and 390px browser smoke with no new console errors or horizontal overflow.
5. Confirm Stage 12-16 invariants remain preserved through the focused/full verification surface.
6. Capture final resource/process state.

## Files Updated In This Checkpoint

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-132.md`

## Gate

Stage 17 execution is open, but no source fix has been made at this checkpoint. The next step is to reproduce the Solo Practice GO fresh-chain Customize-lock bug before editing source code.

No PR, merge, release, Daily GO change, Multiplayer GO change, Solo Practice OG behavior change, Stage 15 Practice seed change, Hard Mode change, resume change, scoring/rating change, GO advancement change, broad refactor, redesign, or out-of-scope work was performed.
