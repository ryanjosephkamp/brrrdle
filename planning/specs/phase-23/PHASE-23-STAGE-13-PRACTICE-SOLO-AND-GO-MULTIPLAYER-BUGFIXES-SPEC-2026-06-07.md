# PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md

**Stage**: 13 — Practice Solo UX Bugs + Multiplayer GO Result Propagation Fix  
**Phase**: 23 — Multiplayer Foundations and Polish  
**Status**: Planning / Governance  
**Date**: 2026-06-07  
**Authority**: This spec is the binding source of truth for Stage 13. All work must stay strictly inside the scoped bugs below.

---

## 1. Overview / Goal

Stage 12 successfully fixed Hard Mode enforcement, improved keyboard/snappiness, and restored sound effects. However, it introduced two regressions in **Practice solo** mode and left a long-standing UX issue in **Multiplayer GO** unresolved.

The goal of Stage 13 is to resolve these three specific, high-impact bugs with **small, incremental, rigorously verified changes** while preserving all the improvements delivered in Stage 12.

---

## 2. Scope (In)

### Bug 1: Practice Solo — On-Screen Keyboard Causes Already-Guessed Words to Flip Repeatedly
- When the player types on the on-screen keyboard in **Practice OG** or **Practice GO**, every already-submitted guess row in the grid plays its flip/reveal animation again on every key press.
- This does **not** happen in Daily Solo modes.
- Desired behavior: Flip/reveal animation must occur **only once** per guess — at the moment the guess is submitted. Subsequent typing must not re-trigger animations on previously submitted rows.

### Bug 2: Practice Solo — Game Automatically Starts New Puzzle Immediately After Completion (No Results Screen)
- After a Practice solo game ends (win or loss), the app immediately launches a brand-new game without ever showing the results panel (answer, definitions, share, stats, etc.).
- This makes it impossible for the player to see what the answer was or review their performance.
- Desired behavior: After a Practice solo game ends, the normal post-game results view must be shown (identical to Daily solo behavior). Only after the player explicitly chooses “Play Again” or “New Game” should a new puzzle be started.

### Bug 3: Multiplayer GO — Solved Puzzle Result Not Properly Propagated to Both Players
- When one player correctly guesses the answer to a GO puzzle:
  - The solving player’s screen automatically advances to the next puzzle (or final definitions) without ever showing the all-green solved row.
  - The other player’s screen updates to show the all-green solved row but then becomes stuck — they must manually type and submit the same answer again before the game will advance.
- Desired behavior: When any player correctly solves a GO puzzle, **both players** must:
  1. Briefly see the completed all-green solved row (≈ 1.5–2.5 seconds).
  2. Then both players automatically and synchronously advance to the next puzzle in the chain (or to the final definitions screen if it was the last puzzle).
- This must work cleanly for both the first four puzzles and the final (5th) puzzle in a GO session.

---

## 3. Out of Scope / Explicitly Deferred

- Any changes to Daily Solo behavior (it is currently working correctly for the keyboard animation issue).
- Any new features, UI redesigns, dedicated Multiplayer tab work, spectator expansion, scoring/rating changes, or broad refactoring.
- Any modifications to the improvements delivered in Stage 12 (Hard Mode enforcement, keyboard snappiness, sound effects).
- Creation of PRs, merges to `main`, or releases (these remain gated until after Stage 13 is verified and the user explicitly authorizes them).

---

## 4. Key Requirements & Constraints

### Small, Incremental Changes + Rigorous Verification (Mandatory)
- Codex **must** make small, focused changes.
- After every significant logical change (or group of related small changes), Codex must run a focused verification pass that includes:
  - Relevant unit / component tests.
  - Real two-client Supabase-backed browser E2E for any multiplayer-affected flows.
  - Manual or automated smoke of the affected solo Practice flows.
  - Confirmation that Stage 12 improvements (Hard Mode, keyboard responsiveness, sounds) were not regressed.
- Only after verification passes should the next small change be made.

### Reproduction First
- For Bug 1 and Bug 3, Codex must first reproduce the exact reported behavior with two-client E2E (where applicable) before writing any fix code.

### Preserve Working Behavior
- Daily Solo keyboard animation behavior must remain untouched.
- All Stage 12 Hard Mode enforcement, keyboard snappiness, and sound fixes must remain intact.

---

## 5. Investigation & Fix Priorities

**Priority 1 (Highest)**: Bug 2 — Practice solo auto-starting new game without showing results.  
This completely breaks the post-game experience and must be fixed first.

**Priority 2**: Bug 1 — On-screen keyboard re-animating already-guessed rows in Practice solo.  
Look at how Daily Solo currently handles keyboard input vs. submitted rows and align Practice solo to the same pattern.

**Priority 3**: Bug 3 — Multiplayer GO solved-puzzle propagation.  
Ensure both players see the all-green result briefly and then both advance together.

---

## 6. Verification Requirements

Stage 13 will only be considered complete when **all** of the following have passed:

1. **Real two-client Supabase-backed browser E2E**
   - Practice Multiplayer (untimed + timed) full flows.
   - Multiplayer GO sessions (multiple puzzles, including a player solving a puzzle).
   - Confirmation that Bug 3 no longer occurs.

2. **Practice Solo focused verification**
   - Keyboard typing no longer triggers flip animations on previously submitted rows.
   - Post-game results screen is always shown after win or loss.
   - “Play Again” / “New Game” flow works correctly after results are shown.

3. **Regression verification**
   - Hard Mode enforcement in Practice Multiplayer still works.
   - Keyboard responsiveness and sound effects from Stage 12 are not degraded.
   - Daily Solo behavior is unchanged.

4. **Automated gates**
   - `npm run lint`
   - `npm run test` (full suite)
   - `npm run build`
   - `npx tsc -p tsconfig.api.json --noEmit`
   - `git diff --check`

5. **Responsive smoke**
   - Desktop, tablet-like, and 390px mobile viewports with no new console errors or layout issues.

6. **Resource sanity**
   - No introduction of runaway processes or significant new memory pressure.

---

## 7. Invariants That Must Be Preserved

- Daily Multiplayer remains strictly asynchronous, 5 letters, UTC-day keyed, no-clock, no-Hard-Mode-control.
- Practice Multiplayer remains the only mode that supports time limits and Hard Mode lobby settings.
- `playerSessions` + `getMultiplayerSessionForPlayer` remain canonical for viewer state.
- All Stage 12 improvements (Hard Mode enforcement, keyboard snappiness, sounds) must remain working.
- Daily Solo behavior for keyboard animations and post-game flow must not be altered.

---

## 8. Coordination Guidance

High-conflict surfaces likely to be touched:

- `src/game/session.ts` or equivalent solo session logic (Bug 1 & 2)
- `src/ui/Keyboard.tsx` / keyboard input handling (Bug 1)
- `src/multiplayer/` domain + `MultiplayerGameSurface.tsx` (Bug 3)
- `src/game/go/` session orchestration (Bug 3)

**Recommended approach**:
- Make one focused fix at a time.
- Run the relevant verification subset after each fix before moving to the next bug.
- Keep changes small and well-commented so regressions are easy to spot.

---

## 9. Deliverables

By the end of Stage 13, the following must exist:

- All three bugs fixed and verified.
- Updated `CHANGELOG.md` entry under Unreleased.
- New progress step (`progress/PROGRESS-STEP-114.md` or next sequential ID) documenting the fixes and verification evidence.
- Updated `AGENT-IMPLEMENTATION-PLAN.md` §28 with Stage 13 completion notes.
- Clean `git diff --check` with no whitespace issues.
- Working Vercel preview demonstrating the fixes.

---

## 10. Gate / Workflow

This spec authorizes a **planning + execution** flow for Stage 13:

1. Planning prompt (governance-only) — updates plan, changelog, agents.md, memory.md, creates progress step.
2. Execution prompt — full implementation with the strict “small change → verify” discipline described above.
3. Final handoff only after all verification requirements in Section 6 are met.

**No PR, merge, or release work is authorized in Stage 13.**

---

**End of Specification**
