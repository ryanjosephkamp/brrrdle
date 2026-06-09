# Progress Step 133: Phase 23 Stage 17 Final Verification And Handoff

**Phase**: 23 — Multiplayer Foundations and Polish
**Stage**: 17 — Solo Practice GO Customize Lock Bug Fix
**Status**: Completed — Awaiting User Review Before PR Or Later Work
**Date**: 2026-06-08
**phase_id**: 133

## Summary

Stage 17 is complete for user review.

The Solo Practice GO Customize lock bug was reproduced before the fix, corrected with one targeted locking-condition change, and verified through focused tests, the full local gate, desktop/tablet/mobile browser smoke, and final resource checks.

No PR, merge, release, production deployment, full dedicated Multiplayer tab work, spectator expansion, or later-phase work was authorized or performed.

## Reproduction Evidence

Before source-code fixes, a focused regression in `src/app/games/soloHardModeDefaults.test.tsx` reproduced the reported bug:

- Fresh Solo Practice GO chains displayed the locked Customize message before any user-submitted guess:
  - "Difficulty and chain length are locked because this puzzle has started. Start a new puzzle to change them."
- Difficulty and chain length controls were disabled on that fresh GO chain.
- Fresh Solo Practice OG remained unlocked and served as the behavioral reference.

Root cause:

- `createGoSession` materializes later GO puzzles with setup-prefilled carry-over rows.
- The old Practice GO Customize lock predicate checked whether any puzzle had any guesses.
- That incorrectly counted setup-prefilled rows as submitted guesses before the player had actually started the chain.

## Fix Summary

The fix is intentionally narrow:

- `src/app/games/GoGame.tsx` now computes whether any GO puzzle has an actual submitted guess beyond that puzzle's setup-prefilled rows.
- Solo Practice GO Customize locks only after such a submitted guess exists.
- Fresh GO chains remain unlocked.
- In-progress GO chains still lock after the first submitted guess.
- `New go chain` returns Customize to unlocked behavior.

No Customize copy, layout, styling, GO advancement, resume behavior, Hard Mode behavior, Practice seed behavior, Daily behavior, multiplayer behavior, scoring/rating rule, broad refactor, or Solo Practice OG behavior was intentionally changed.

## Focused Verification

Focused red/green verification:

- `npx vitest run src/app/games/soloHardModeDefaults.test.tsx`
  - Failed before the fix on the fresh Practice GO Customize-lock regression.
  - Passed after the fix: 1 file, 5 tests.

Wider focused regression set:

- `npx vitest run src/app/games/soloHardModeDefaults.test.tsx src/game/go/session.test.ts src/account/practiceSeeds.test.ts src/account/resumeSlot.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx`
  - Passed: 5 files, 39 tests.

This covered the changed Solo Practice GO lock condition, Solo Practice OG reference behavior, GO session behavior, Stage 15 Practice seed regressions, resume-slot behavior, and Stage 16 Practice Multiplayer GO projection regressions.

## Full Verification Gate

All required local verification passed:

- `npm run lint` — passed.
- `npm run test` — passed, 73 files and 483 tests.
- `npm run build` — passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` — passed.
- `git diff --check` — passed.

## Browser Smoke

Browser smoke used one Vite dev server and the Playwright wrapper, then closed the browser context and stopped the server.

Desktop, tablet-like, and 390px mobile checks verified:

- Fresh Solo Practice GO Customize controls are unlocked.
- Fresh Solo Practice OG Customize behavior remains unlocked.
- No new console/page errors were observed.
- No document-level horizontal overflow was observed.

Targeted Practice GO behavior check verified:

- After the first submitted guess, Customize locks.
- After `New go chain`, Customize returns to unlocked.

## Resource And Cleanup Notes

Baseline before browser work showed high pre-existing compressed-memory pressure from user/system processes and no local Vite/dev-server listener on the usual app ports.

Final resource snapshot:

- The Stage 17 Vite dev server was stopped.
- The Playwright browser context was closed.
- Generated `.playwright-cli/` artifacts were removed from the worktree.
- No Stage 17-owned runaway dev-server/browser process remained.

## Scope Confirmation

Stage 17 changed only:

- Solo Practice GO Customize locking behavior.
- Focused regression coverage.
- Governance/progress records.

Out-of-scope systems were not intentionally modified:

- Daily GO.
- Daily Multiplayer GO.
- Practice Multiplayer GO.
- Any Multiplayer GO path.
- Multiplayer OG.
- Solo Practice OG behavior.
- Other solo modes.
- Stage 15 authenticated Practice seed behavior.
- Daily OG/GO deterministic selection.
- Hard Mode behavior.
- Resume behavior.
- Scoring/rating/ELO logic.
- GO chain advancement.
- Customize layout, styling, or copy.
- Broad Practice GO or Customize architecture.

## Files Updated In This Checkpoint

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-133.md`

## Gate

Stage 17 is complete for user review under `phase_id = 133`.

PR creation, merge, release, production deployment, full dedicated Multiplayer tab implementation, spectator expansion, later-phase work, and any out-of-scope changes remain gated until the user explicitly authorizes them.
