# Progress Step 124 - Phase 23 Stage 15 Focused Fixes

**Date**: 2026-06-08  
**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: 15 - GO Transition Polish + Practice Seed Per-Account Randomization  
**Progress CSV row**: `phase_id = 124`  
**Status**: Completed - Final Verification Pending

## Authorization

The user explicitly authorized Stage 15 execution from `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`.

This checkpoint records the focused two-bug implementation batch only. PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, redesign, and out-of-scope work remain gated.

## Reproduction Evidence

### Bug 1 - GO Transition Regression

The regression was reproduced with focused component coverage before the fix:

- Added a Multiplayer GO test that solves puzzle 1, then solves puzzle 2 during the solved-row hold.
- Before the fix, `npm run test -- src/multiplayer/MultiplayerGameSurface.test.tsx` failed.
- Failure evidence: row 1 rendered the just-solved puzzle-2 answer instead of the prior completed puzzle-1 answer, proving the carried-forward GO row was dropped during the hold.

Root cause:

- `MultiplayerGameSurface` replaced a puzzle's canonical `session.guesses` with display-only shared move guesses whenever shared moves existed.
- In GO puzzle 2 and later, canonical guesses include prefilled prior answers. Shared moves contain only submitted turns, so replacing the list dropped prior completed puzzle rows.

### Bug 2 - Practice Seed Predictability

The seed bug was reproduced through the current code path before the fix:

- Practice OG and Practice GO both initialized `practiceSeed` to `0` in their solo components.
- The Practice setup helpers deterministically map the seed into the answer list.
- Account identity was already available in the Practice route but was not passed into solo Practice setup, so distinct authenticated accounts started from the same Practice seed path.

## Fix Summary

### GO Transition Display Fix

Updated `src/multiplayer/MultiplayerGameSurface.tsx` so display-only shared move projection preserves canonical/prefilled GO rows when shared moves are a suffix of the canonical puzzle guesses.

This is display-only:

- It does not copy rival guesses into canonical `playerSessions`.
- It does not change scoring, turn order, GO advancement, or result settlement.
- It preserves the Stage 13 solved-row hold behavior.

Regression coverage:

- `src/multiplayer/MultiplayerGameSurface.test.tsx` now verifies that during a puzzle-2 solved-row hold, row 1 still shows the prior completed answer and row 2 shows the all-green solved answer.

### Practice Seed Per-Account Fix

Added account-derived Practice seed helpers and persistent per-mode counters:

- `src/account/practiceSeeds.ts` derives account-specific seeds from authenticated user id + mode + persisted counter.
- Guests keep the existing local counter path.
- `GuestProgressState` now stores `practiceSeeds` and migrates legacy payloads safely.
- Guest/cloud transfer merges Practice seed counters by taking the furthest per-mode counter.
- The Practice route passes authenticated user id and counters into Practice OG/GO only.

Daily remains separate:

- Daily OG and Daily GO still call the existing date-keyed setup functions and do not receive account seed input.

## Focused Verification

Passed:

- `npm run test -- src/multiplayer/MultiplayerGameSurface.test.tsx`
- `npm run test -- src/multiplayer/MultiplayerGameSurface.test.tsx src/account/practiceSeeds.test.ts src/account/guestStorage.test.ts src/account/guestTransfer.test.ts src/app/games/soloHardModeDefaults.test.tsx src/game/og/session.test.ts src/game/go/session.test.ts`
  - 7 focused files
  - 40 tests passing
- `npm run test -- src/account`
  - 13 files
  - 128 tests passing

## Invariants Preserved So Far

- Daily OG/GO deterministic setup remains outside the Practice seed path.
- Guest Practice fallback remains local and minimal.
- `playerSessions` remain canonical for multiplayer state; shared move projection remains display-only.
- Stage 13 solved-row hold/coordinated advancement behavior remains intact in focused component coverage.
- No Daily Multiplayer behavior was changed.

## Pending Verification

The final Stage 15 gate is still pending:

- Real two-client Supabase-backed Multiplayer GO E2E.
- Authenticated two-account Practice seed browser verification.
- Daily OG/GO determinism browser or probe confirmation.
- Stage 12 through Stage 14 non-regression checks.
- Full automated gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`.
- Desktop/tablet/390px responsive smoke.
- Resource/memory snapshot.
- Vercel preview and protected/shareable link if needed.

## Next Step

Proceed to real browser/Supabase verification and the full final verification gate. Stage 15 is not complete until those checks pass and the final progress handoff is recorded.
