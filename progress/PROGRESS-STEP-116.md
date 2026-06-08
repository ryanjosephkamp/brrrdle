# Progress Step 116 - Phase 23 Stage 13 Practice Solo Fix Batch

**Date**: 2026-06-07  
**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: 13 - Practice Solo UX Bugs + Multiplayer GO Result Propagation Fix  
**Progress CSV row**: `phase_id = 116`  
**Status**: Completed - Multiplayer GO Fix Pending

## Authorization

The user explicitly authorized full Stage 13 execution from `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md`.

This checkpoint remains inside the strict three-bug scope. It completes the Practice solo fix batch for Bug 1 and Bug 2. Multiplayer GO solved-puzzle propagation remains pending.

## Bugs Reproduced

### Bug 1 - Practice Solo Submitted Rows Re-Animating

Pre-fix browser reproduction in Practice OG:

- Loaded Practice OG through the real browser against the local Vite app.
- Submitted a valid first-row guess (`CRANE`).
- Added a document-level `animationstart` counter for Row 1 tiles.
- Pressed a later key after the submitted row had settled.
- Observed 5 new Row 1 animation events, confirming the submitted row replayed reveal animations.

### Bug 2 - Practice Solo Missing Results Screen

Pre-fix browser reproduction in Practice OG:

- Loaded a fresh Practice OG puzzle.
- Used the current persisted Practice resume slot to identify the local test answer.
- Submitted the answer.
- Observed the app return to a fresh `playing` Practice puzzle instead of keeping the post-game result/share/definition surface visible.

## Root Cause

Practice OG and Practice GO used the live `initialResume` prop directly in their Practice session key. The app writes a Practice resume capture on every input, so the parent re-passed each live capture as a new `initialResume` value. That changed the keyed `OgGameSession` / `GoGameSession` child and remounted the board.

The same key churn caused:

- Submitted rows to replay reveal animations on later input.
- Completed Practice games to remount into a fresh puzzle when completion cleared the resume slot.

Daily Solo did not show the same bug because its game key is stable and does not include a live Practice resume suffix.

## Fix

Updated:

- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`

Both components now capture the incoming Practice resume slot once at component mount and treat it as a one-shot restore source. Live resume captures from the active session continue to persist in-progress games, but they no longer drive the active game key or remount the current board/result surface.

## Focused Verification

Automated:

- `npm run test -- src/app/games/soloHardModeDefaults.test.tsx` passed (2 tests).

Browser checks:

- Post-fix Practice OG submitted-row animation check: later key input produced 0 Row 1 animation restarts.
- Post-fix Practice GO submitted-row animation check: later key input produced 0 Row 1 animation restarts.
- Post-fix Practice OG completion check: solving the current answer kept the result/share state visible.
- Post-fix Practice GO completion check: solving the full five-puzzle chain kept the won state visible with GO share and solved definitions.

## Remaining Work

Continue Stage 13 with Bug 3:

- Reproduce Multiplayer GO solved-puzzle propagation with real two-client Supabase-backed browser E2E.
- Fix so both players briefly see the all-green solved row, then advance together.
- Recheck Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, timed/untimed Practice Multiplayer, Daily Solo, and Daily Multiplayer invariants.

## Scope Guard

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new feature, scoring/rating change, broad refactor, redesign, or later-phase work was performed in this checkpoint.
