# PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md

**Phase**: 23 — Multiplayer Foundations and Polish  
**Stage**: 12 — Multiplayer Hard Mode Enforcement + Performance & Responsiveness Fixes  
**Status**: Planning / Governance Document  
**Date**: 2026-06-07  
**Author**: User + Grok (planning)  
**Authority**: This document becomes binding once the user explicitly authorizes execution via a later prompt. Until then it is planning-only.

---

## 1. Purpose

Stage 12 is a **targeted bug-fix and stabilization stage** focused on two high-impact areas that remain broken or degraded after the Final Stabilization pass (`phase_id = 109`):

1. **Hard Mode enforcement in Practice Multiplayer** is completely non-functional. The setting is correctly stored, displayed in lobbies, and visible to both players, but the actual Hard Mode validation rules are **not applied** during gameplay.
2. **Multiplayer performance and responsiveness** issues are causing noticeable lag that harms playability:
   - \~5 second delay between a player submitting a turn and the result appearing on the rival’s screen.
   - Noticeable lag when creating/joining lobbies (especially on the creator side).
   - On-screen keyboard click latency (visual feedback and grid update are delayed).
   - Sound effects are not playing even when enabled in Settings.

The goal of Stage 12 is to make Practice Multiplayer Hard Mode actually enforce rules, and to meaningfully improve the perceived responsiveness and reliability of the multiplayer experience without introducing new features or redesigning architecture.

---

## 2. Scope

### In Scope (Required)

- **Hard Mode Enforcement in Practice Multiplayer**
  - Investigate why `hardMode: true` is stored and displayed but validation is bypassed.
  - Ensure Hard Mode rules (fixed green positions, required yellow letters, no gray-letter reuse) are enforced on every guess submission for both players.
  - Preserve the existing `playerSessions` + `getMultiplayerSessionForPlayer` model.
  - Ensure Hard Mode state is correctly projected to both clients and survives refresh/reconnect.

- **Multiplayer Turn Propagation Latency**
  - Investigate and reduce the delay between a successful turn submission and the rival seeing the updated board/keyboard/history.
  - Focus on repository save → subscription → projection → UI update path.

- **Lobby Creation / Join Latency**
  - Investigate and improve the time between lobby creation and the creator entering the lobby, and between a rival joining and both sides seeing the updated state.

- **On-Screen Keyboard Responsiveness**
  - Reduce visual and input latency when tapping keys (both the key highlight and the letter appearing in the current row).

- **Sound Effects Not Playing**
  - Diagnose why the sound engine (added in earlier phases) is silent even when the Settings toggle is enabled.
  - Restore correct sound playback for keyboard clicks, tile flips, invalid guesses, wins, and losses in both solo and multiplayer contexts.

### Out of Scope (Explicitly Forbidden)

- Any work on a dedicated Multiplayer tab
- Spectator mode expansions
- New features (lobby management UI, history redesign, Go puzzle transition effects, etc.)
- Scoring, rating, or ELO changes
- Daily Multiplayer behavior changes (must remain strictly asynchronous, no-clock, no-Hard-Mode controls)
- Broad refactoring or architecture changes
- PR creation, merge, or release

---

## 3. Background & Known Context

- Practice Multiplayer Hard Mode was introduced in Stage 9 (`phase_id = 99–100`). The lobby UI correctly shows and persists the setting, and it is copied into each player’s canonical session. However, real gameplay testing after Stage 10 and the Final Stabilization pass shows that Hard Mode validation is **not being applied**.
- Multiple multiplayer stability passes (Stages 6–10 + Final Stabilization) have improved correctness but have not addressed perceived latency.
- The sound system was implemented earlier and was verified working at the time. It is currently silent for most users.
- The on-screen keyboard uses standard React event handling; latency may be caused by re-render patterns, state batching, or subscription-driven updates fighting local input.

---

## 4. Investigation & Fix Priorities

### Priority 1: Hard Mode Enforcement (Highest)

Reproduce the bug with two-client testing:
- Create a Practice Multiplayer lobby with Hard Mode enabled.
- Submit a first guess that receives gray feedback.
- On the second turn, attempt to re-use a gray letter.
- Confirm the guess is incorrectly accepted.

Expected fix direction:
- Ensure `validateGuess` (or equivalent Hard Mode logic) is called with the correct `hardMode` flag from the viewer’s `playerSessions` entry during `submitMultiplayerGuess`.
- Confirm the flag survives projection, subscription, and refresh paths.
- Add or strengthen focused regression tests.

### Priority 2: Turn Propagation & Lobby Join Latency

Investigate the full path:
1. `submitMultiplayerGuess` → repository save
2. Supabase Realtime subscription delivery
3. Projection reconciliation in `multiplayerRepository.ts`
4. `MultiplayerGameSurface` / panel re-render

Look for:
- Unnecessary full-projection overwrites
- Missing or delayed `updatedAt` / change signals
- Re-render thrashing caused by clock or minor field updates
- Potential batching or debounce opportunities without hurting correctness

### Priority 3: On-Screen Keyboard Latency

Focus on:
- Local optimistic key press feedback vs server-driven state
- Whether subscription updates are causing the entire keyboard component to remount or re-render expensively
- Touch/click event handling and state updates in the keyboard component

### Priority 4: Sound Effects Silent

- Verify the `SoundProvider` and sound engine initialization
- Check Settings toggle wiring to the sound engine
- Confirm sound calls are being reached in both solo and multiplayer game surfaces
- Check for any recent changes that may have broken the audio context or playback

---

## 5. Verification Requirements

Stage 12 execution **must** include:

1. **Real two-client Supabase-backed browser E2E**
   - Practice Multiplayer with Hard Mode enabled (reproduce the invalid guess acceptance bug, then verify it is fixed)
   - Untimed and timed Practice Multiplayer turn propagation timing observation (before/after if possible)
   - Lobby creation and join flow timing
   - Hard Mode state surviving browser refresh for both players

2. **Focused automated tests**
   - Hard Mode validation regressions in multiplayer context
   - Any new tests for keyboard input latency or sound (if practical)

3. **Full automated gate**
   - `npm run lint`
   - `npm run test` (all tests must pass)
   - `npm run build`
   - `npx tsc -p tsconfig.api.json --noEmit`
   - `git diff --check`

4. **Responsive & resource smoke**
   - Desktop, tablet-like, and 390px mobile
   - No new console errors or horizontal overflow
   - Memory/resource check (no runaway processes)

5. **Remote Supabase probe + cleanup** of any temporary test data created during verification.

---

## 6. Invariants (Must Be Preserved)

- Daily Multiplayer remains strictly asynchronous, five letters, UTC-day keyed, no time limits, no Hard Mode lobby controls, and claim-safe.
- The `playerSessions` + `getMultiplayerSessionForPlayer` model remains the source of truth for each viewer’s canonical board and validation.
- Existing stale-save protections and duplicate-safe create/join behavior must not be weakened.
- All previous Stage 9/10/Final Stabilization multiplayer behavior (scoring, timed clocks, result settlement, etc.) must continue to work.

---

## 7. Coordination Guidance

- High-conflict surfaces likely to be touched: `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, `src/multiplayer/MultiplayerGameSurface.tsx`, `src/multiplayer/MultiplayerPanel.tsx`, keyboard components, and sound-related files.
- The coordinator should own final integration into `src/app/App.tsx` and all progress/governance updates.
- Real two-client testing is mandatory for any claim that Hard Mode or latency has improved.
- Resource caution is advised: avoid running full verification gates in parallel with browser testing.

---

## 8. Deliverables

Upon successful completion of Stage 12, the following must exist:

- Hard Mode rules are correctly enforced in Practice Multiplayer for both players.
- Measurable improvement in turn propagation and lobby join responsiveness (document observed before/after behavior).
- On-screen keyboard feels responsive.
- Sound effects play reliably when enabled.
- All verification requirements above are satisfied and documented.
- Updated surfaces: `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `agents.md`, `memory.md`, `progress/PROGRESS.csv`, and a new `progress/PROGRESS-STEP-110.md`.

---

## 9. Gate

This document authorizes **planning and governance work only** (`phase_id = 110` planning step). 

**No source code changes, tests, Supabase migrations, implementation branches, PRs, merges, or releases are authorized** until the user explicitly starts the execution prompt for Stage 12.

---

**End of Specification**
