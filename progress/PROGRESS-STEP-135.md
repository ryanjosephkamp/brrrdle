# Progress Step 135: Phase 23 Stage 18 Execution Kickoff

**Phase**: 23 — Multiplayer Foundations and Polish
**Stage**: 18 — Multiplayer GO Final Puzzle Behavior + Solo Practice GO Hard Mode Checkbox Fixes
**Status**: Completed — Reproduction And Fixes Pending
**Date**: 2026-06-08
**phase_id**: 135

## Summary

Stage 18 execution is open after explicit user authorization.

This checkpoint protects the current local worktree, records baseline resource state, and defines the reproduce-first plan before source-code fixes.

No source-code fix, test change, UI/component change, Supabase migration, configuration change, PR creation, merge, release, production deployment, Phase 24 work, or out-of-scope work has been performed in this checkpoint.

## Protected Starting State

- Active branch: `main`.
- Current local worktree is the source of truth.
- Existing Stage 18 planning/governance dirt is preserved:
  - modified `AGENT-IMPLEMENTATION-PLAN.md`
  - modified `CHANGELOG.md`
  - modified `agents.md`
  - modified `memory.md`
  - modified `progress/PROGRESS.csv`
  - untracked `PHASE-23-STAGE-18-MULTIPLAYER-GO-FINAL-PUZZLE-AND-SOLO-PRACTICE-GO-HARD-MODE-FIXES-SPEC-2026-06-08.md`
  - untracked `progress/PROGRESS-STEP-134.md`
- No reset, rebase, pull-over, branch switch, discard, force-push, branch deletion, PR creation, merge, release, production deployment, or Phase 24 work is authorized.

## Baseline Resource Snapshot

Captured before Stage 18 dev-server/browser testing:

- No local Vite/dev-server listener was found on ports `5173`, `5174`, `3000`, or `4173`.
- One unrelated Python listener was already present on `127.0.0.1:8765` with PID `26051`.
- Existing user/system processes included Codex, Chrome, VS Code, Finder, and other unrelated apps.
- `top` reported high pre-existing memory pressure:
  - `17G used`
  - `123M unused`
  - approximately `7047M` compressor
- No Stage 18-owned Vite dev server, Playwright run, or browser process was running at kickoff.

Resource discipline for the rest of Stage 18:

- Use one Vite dev server unless clearly necessary.
- Keep browser contexts minimal.
- Close browser contexts after verification.
- Avoid running full build/test/typecheck gates in parallel.
- Stop and report if resource usage becomes unsafe.

## Reproduction Plan

Stage 18 must follow reproduce-first discipline.

### Bug 1 — Multiplayer GO Final Puzzle Premature Termination

Priority: highest.

Planned reproduction:

- Use real two-client Supabase-backed browser E2E with isolated authenticated contexts where practical.
- Reproduce or verify the final-puzzle premature termination behavior in Practice Multiplayer GO.
- Reproduce or verify the same risk in Daily Multiplayer GO.
- Record puzzle index, wrong-guess sequence, status/result transition, and remote row state.
- Add focused regression coverage before source fixes.

### Bug 2 — Multiplayer GO Final Solved-Row Hold

Planned reproduction:

- Verify the existing puzzles 1-4 solved-row hold behavior as the reference.
- Reproduce the missing solved-row hold after puzzle 5 in Practice Multiplayer GO.
- Reproduce or verify the same terminal-puzzle hold behavior in Daily Multiplayer GO.
- Add focused regression coverage before source fixes.

### Bug 3 — Solo Practice GO Hard Mode Checkbox

Planned reproduction:

- Reproduce that Solo Practice GO Hard Mode checkbox clicks do not toggle the setting.
- Compare with Solo Practice OG checkbox behavior as the working reference.
- Add focused regression coverage for toggle-on, toggle-off, first-guess enforcement, and Solo Practice OG non-regression before source fixes.

## Strict Scope Boundary

Authorized Stage 18 work is limited to:

- Multiplayer GO final-puzzle no-premature-termination until correct solve.
- Multiplayer GO final solved-row hold/transition after puzzle 5.
- Solo Practice GO Hard Mode checkbox toggle/persistence/first-guess enforcement.

Explicitly out of scope:

- Solo Practice OG behavior changes.
- Daily Solo GO changes.
- Any OG mode changes.
- Scoring/rating/ELO changes.
- Non-final GO advancement changes.
- Multiplayer GO Hard Mode enforcement changes.
- Customize box behavior, layout, styling, or copy changes.
- Resume behavior changes.
- Seed behavior changes or Stage 15 authenticated Practice seed changes.
- Broad `src/game/go/`, `src/multiplayer/`, session-management, or app-architecture refactors.
- PR creation, merge, release, production deployment, full dedicated Multiplayer tab work, spectator expansion, notifications, floating manager, bots/social/export features, Phase 24 work, or later-phase work.

If a scoped bug appears to require out-of-scope work, execution must stop and report rather than broadening the fix.

## Verification Plan

Focused verification after each logical fix:

- Focused tests for the changed bug.
- Wider focused regression set for affected GO/multiplayer/solo Hard Mode surfaces.
- Real two-client Supabase-backed browser E2E for Practice/Daily Multiplayer GO claims.
- Remote Supabase probes and cleanup where relevant.
- Solo Practice GO Hard Mode browser smoke and Solo Practice OG non-regression for the checkbox fix.

Final gate:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Desktop browser smoke.
- Tablet-like browser smoke.
- 390px mobile browser smoke.
- No new console errors.
- No horizontal overflow.
- Resource/memory/process snapshot after testing.

## Gate

Stage 18 execution is open under `phase_id = 135`, but source fixes remain pending.

Next step: reproduce the scoped bugs before source-code fixes, starting with Multiplayer GO final-puzzle premature termination.
