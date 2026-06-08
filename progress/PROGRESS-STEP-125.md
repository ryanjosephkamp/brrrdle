# Progress Step 125 — Phase 23 Stage 15 Final Verification and Handoff

**Date**: 2026-06-08  
**phase_id**: 125  
**Status**: Completed - Awaiting User Review Before PR Or Later Work  
**Scope**: Phase 23 Stage 15 final verification for GO transition polish and authenticated Practice seed fixes

---

## Summary

Stage 15 is complete for user review.

The stage stayed limited to the two scoped bugs from `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`:

1. **GO transition regression**: previously completed GO puzzles must stay visible during the all-green solved-row hold.
2. **Practice seed predictability**: authenticated Practice OG/GO sequences must become per-account while Daily OG/GO remain globally deterministic.

No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, redesign, or out-of-scope work was performed.

---

## Bugs Reproduced Before Fixes

### GO Transition Regression

Focused component reproduction was added before the fix.

- The reproduction solved puzzle 1, then solved puzzle 2 during the GO solved-row hold.
- Before the fix, the puzzle-2 hold rendered row 1 as the puzzle-2 answer instead of the carried-forward puzzle-1 answer.
- Root cause: shared durable move projection replaced the canonical GO puzzle guesses. For later GO puzzles, canonical guesses include prior-answer prefilled rows, while shared moves include only submitted turns.

### Practice Seed Predictability

The seed path was reproduced by code inspection and focused tests:

- Practice OG and Practice GO both initialized from the same zero-based local seed path.
- Authenticated account identity was available in the Practice route but was not threaded into solo Practice setup.
- Distinct accounts therefore received identical deterministic Practice OG/GO sequences.

---

## Fix Summary

### GO Transition Fix

- `MultiplayerGameSurface` now merges shared durable moves with canonical/prefilled GO rows instead of replacing the full guess list.
- Shared moves remain display-only cross-client projection evidence.
- `playerSessions` remain canonical and player-owned.
- The fix does not copy rival moves into another player's canonical session, alter scoring, change turn settlement, or change GO advancement rules.

### Practice Seed Fix

- Added account-derived Practice seed helpers using stable user-id hashing plus per-mode counters.
- Added persisted `practiceSeeds` state for guest/cloud progress.
- Added migration normalization and max-counter merge behavior.
- Threaded authenticated user id and seed counters into Practice OG/GO.
- Guest Practice keeps the existing local counter fallback.
- Daily OG/GO remain outside the account seed path and stay globally deterministic.

---

## Real Browser And Supabase Evidence

Passed real two-client Supabase-backed browser E2E with isolated authenticated contexts:

- Created two temporary authenticated users.
- Verified Practice OG answers differ across the two accounts.
- Verified Practice GO chains differ across the two accounts.
- Verified Daily OG and Daily GO remain deterministic across accounts for `2026-06-08`.
- Verified UI-triggered Practice OG/GO seed counters persisted.
- Created a real Practice Multiplayer GO lobby from the host account.
- Joined the lobby from the rival account.
- Submitted all five GO answers through the multiplayer surface on-screen keyboard.
- Verified after puzzle 2 that both clients showed:
  - Row 1: the prior completed GO answer.
  - Row 2: the current all-green solved answer.
- Verified final puzzle completion moved both clients to answer/definition results.
- Remote Supabase probe confirmed the final row had:
  - `moves = 5`
  - `status = won`
  - `playerSessions = 2`
- Temporary users and the touched multiplayer row were cleaned up.

---

## Automated Verification

Passed:

- `npm run test -- src/multiplayer/MultiplayerGameSurface.test.tsx src/account/practiceSeeds.test.ts src/account/guestStorage.test.ts src/account/guestTransfer.test.ts src/app/games/soloHardModeDefaults.test.tsx src/game/og/session.test.ts src/game/go/session.test.ts`
  - 7 files
  - 40 tests
- `npm run lint`
- `npm run test`
  - 73 files
  - 478 tests
- `npm run build`
  - Succeeded with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- `progress/PROGRESS.csv` parse check

---

## Responsive Smoke

Passed browser smoke on:

- Desktop: Home, Practice, Calendar
- Tablet-like: Home, Practice, Calendar
- 390px mobile: Home, Practice, Calendar

Results:

- No console errors.
- No page errors.
- No horizontal overflow.

---

## Resource And Cleanup Notes

- Stage 15 used one local Vite dev server for browser verification.
- Playwright browser contexts created by Stage 15 were closed after use.
- The successful E2E run cleaned up temporary Supabase users and the touched multiplayer row.
- Final resource checks showed no Stage 15 runaway browser context or app process.
- Pre-existing user/Codex/Chrome processes were recorded and not terminated.
- The local Vite dev server started for Stage 15 was stopped after final verification.

---

## Preview

Vercel preview deployed successfully.

The direct preview is deployment-protected, so a protected share URL was verified and will be provided in the final Codex chat handoff only. The tokenized share URL is intentionally not committed to repository docs.

---

## Invariants Preserved

- Daily OG/GO remain globally deterministic for the same UTC day.
- Daily Multiplayer remains strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- Practice Multiplayer remains the only multiplayer surface with chess clocks and Hard Mode lobby settings.
- `playerSessions` remain canonical for per-viewer multiplayer validation and mutation.
- Shared `serializedSession` remains compatibility/answer plumbing only.
- Stage 12 wins remain protected: Hard Mode enforcement, keyboard responsiveness, sound playback, row-write reduction, stale-save protections, timed Practice behavior, and scoring/result settlement.
- Stage 13 wins remain protected: Practice solo one-shot resume behavior, submitted-row animation stability, post-game results visibility, Multiplayer GO solved-row hold, and coordinated advancement.
- Stage 14 wins remain protected: hidden/inert Multiplayer foundations, Calendar/Practice entry points, nonparticipant guard, and unified `async_multiplayer_games` path.

---

## Next Step

Await user review. Any PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, later phase, or out-of-scope work requires a separate explicit user authorization prompt.
