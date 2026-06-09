# Progress Step 131 — Phase 23 Stage 17 Planning

**Date**: 2026-06-08
**Phase**: 23 - Multiplayer Foundations and Polish
**Stage**: 17 - Solo Practice GO Customize Lock Bug Fix
**Progress CSV row**: `phase_id = 131`
**Status**: Completed - Awaiting user review before Stage 17 execution

## Authorization

The user authorized a planning and governance-only pass for `PHASE-23-STAGE-17-SOLO-PRACTICE-GO-CUSTOMIZE-LOCK-BUGFIX-SPEC-2026-06-08.md`.

This pass did not authorize source-code edits, tests, UI/component changes, configuration changes, implementation branches, PR creation, merge, release, browser verification, or Stage 17 execution.

## Scope Recorded

Stage 17 is an extremely narrow single-bug fix for **Solo Practice GO only**.

The scoped bug:

- The Solo Practice GO Customize box incorrectly locks Difficulty and chain length on a brand-new GO chain before any guess has been submitted.

The required behavior:

- Solo Practice GO must match Solo Practice OG.
- Difficulty and chain length stay unlocked on a fresh GO chain until the first submitted guess.
- Once at least one guess has been submitted in the current GO chain, the options correctly lock.

## Strict Boundaries

Future Stage 17 execution must not touch:

- Solo Practice OG behavior.
- Daily GO, solo or multiplayer.
- Multiplayer GO, Practice or Daily.
- Other solo modes.
- Stage 15 authenticated Practice seed behavior.
- Hard Mode behavior.
- Resume behavior.
- Scoring.
- GO chain advancement logic.
- Customize layout, styling, or copy beyond the locking condition.
- Broad Practice GO, Customize, GO, or app architecture.
- PR creation, merge, release, or later-phase work.

If the root cause appears to require touching an out-of-scope surface, execution must stop and report rather than broadening the fix.

## Future Execution Requirements

When the user later authorizes execution, Stage 17 must:

1. Reproduce the Solo Practice GO Customize early-lock bug before source edits.
2. Compare against the existing correct Solo Practice OG locking behavior.
3. Make the smallest targeted locking-condition fix.
4. Add focused regression coverage for a fresh GO chain and an in-progress GO chain with at least one submitted guess.
5. Run focused changed-area verification.
6. Run the full gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
7. Run desktop, tablet-like, and 390px browser smoke with no new console errors or horizontal overflow.
8. Confirm Stage 12 through Stage 16 wins remain preserved.

## Governance Updates

Updated in this planning pass:

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-131.md`

No source files, test files, UI components, or configuration files were modified.

## Next Step

Halt for user review. Stage 17 implementation remains gated until the user explicitly authorizes execution in a future prompt.
