**PHASE-23-STAGE-20-MULTIPLAYER-STATUS-TEXT-AND-FORFEIT-LOGIC-BUGFIXES-SPEC-2026-06-09.md**

**Phase**: 23 — Multiplayer Foundations and Polish  
**Stage**: 20 — Multiplayer Status Text Synchronization + Forfeit Win/Loss Precedence Bug Fixes  
**Status**: Planning / Governance (to be executed after explicit user approval)  
**Date**: 2026-06-09  
**Source of truth for this stage**: This document + current `AGENT-IMPLEMENTATION-PLAN.md` §28 (latest v3.65) + `CONSTITUTION.md` + attached Stage 19 handoff (`progress/PROGRESS-STEP-140.md`) + prior invariants from Stages 12–19.

### 1. Overview & Purpose

Stage 20 is an **extremely narrow, bug-fix-only pass** inside Phase 23. It addresses two remaining minor but noticeable issues in the unified Multiplayer system (both OG and GO, Practice and Daily) that were identified after Stage 19 completion.

The goals are:
- Make the status text box (immediately above the turn history, under the player name) reactive and correctly synchronized for **both players** on all relevant game events.
- Ensure that **forfeiting a match always makes the forfeiting player lose** (unless no guesses have been submitted yet), taking clear precedence over current point totals. (Losing on time already works correctly and must not be changed.)

This stage must **not** touch gameplay mechanics, the puzzle board/letter area, keyboard logic, tile coloring, Hard Mode enforcement during play, solved-row hold behavior, scoring formulas, or any core game rules. All changes must be small, targeted, and outside the primary gameplay surface where possible.

Stage 20 is intended to be the **final bug-fix stage** in Phase 23 before the project moves to Phase 24 (dedicated Multiplayer tab foundations and related navigation/UI work).

### 2. Bugs to Fix (Detailed)

#### Bug 1 — Status Text Box Does Not Update for Both Players
**Location**: The small status/message box that appears directly above the turn history section (and just under the current player’s name) in multiplayer games.

**Current broken behavior** (affects OG and GO, Practice and Daily equally):
- Player 1 opens a lobby → sees “Multiplayer match opened. Waiting for another signed-in player to join.”
- Player 2 joins → Player 2 correctly sees “Joined multiplayer match. Turns now persist between both signed-in players.” **but Player 1’s text remains stale**.
- Player 1 submits a turn → Player 1’s text updates to “Turn submitted. Waiting for the next player.” **but Player 2’s text remains stale**.
- Subsequent turns and most game-end conditions (forfeit by one player, loss on time, or normal completion) leave at least one player with stale text.
- Only certain terminal states on one specific client sometimes update correctly; the other client is often left with outdated messaging.

**Desired behavior**:
The status box must update on **both clients** whenever a meaningful game event occurs:
- Lobby creation / opening
- Second player joining
- Either player submitting a guess/turn
- Game ending for any reason (normal win, forfeit, timeout, etc.)

The exact wording can be refined during implementation for clarity and consistency, but the box must always reflect the current shared game state from the perspective of the viewing player.

#### Bug 2 — Forfeit Does Not Override Points When Determining Winner/Loser
**Current broken behavior**:
- If a player who currently has more points forfeits, the game incorrectly declares that player the winner “on points.”
- This only affects the **forfeit** path. Losing on time already correctly makes the timed-out player lose regardless of points (this behavior must be preserved exactly).

**Desired behavior**:
- Forfeiting a match must make the forfeiting player **lose** the match, regardless of current point totals.
- Exception: If a player forfeits **before any guesses have been submitted** (brand-new lobby, zero guesses total), the match can be treated as a non-result / cancelled (no winner declared).
- Losing on time must continue to work exactly as it does today (timed-out player loses regardless of points).

### 3. Strict Scope & Boundaries

**In scope (only these two bugs)**:
- The multiplayer status/message text box and its update logic on both clients.
- The win/loss determination logic specifically when a player **forfeits** (must override point totals, with the narrow pre-guess exception noted above).
- Any supporting state, event emission, or projection updates required to make the above two items work correctly and stay in sync across clients.

**Explicitly out of scope**:
- Any changes to the gameplay board, letter tiles, keyboard, coloring rules, Hard Mode validation during play, solved-row hold/transition behavior, or core game mechanics.
- Changes to scoring/point calculation formulas themselves (only the final win/loss decision when forfeiting).
- Daily Multiplayer invariants (strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode lobby controls, answer-separated, claim-safe).
- `playerSessions` as the canonical per-player state.
- Any new features, UI redesign, dedicated Multiplayer tab work, spectator expansion, notifications, floating manager, bots, exports, or Phase 24 work.
- Broad refactoring or performance work beyond what is strictly necessary to fix the two reported bugs.

If investigation reveals that a deeper architectural change is required, stop and report rather than expanding scope.

### 4. Invariants to Preserve (from Stages 12–19)

- All wins from Stages 12–19 (Hard Mode enforcement, keyboard responsiveness, sound, stale-save protections, timed Practice clock rules, GO solved-row hold/advance, Practice seed behavior, hidden Multiplayer foundations, nonparticipant guard, etc.).
- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode lobby controls, answer-separated between OG/GO, and claim-safe.
- `playerSessions` remains the canonical per-viewer state; shared projections are display-only.
- Real two-client Supabase-backed browser E2E + remote probe + cleanup discipline for any multiplayer claim or state change.
- Full verification gate on every logical change (reproduce → small targeted fix → focused verify → full gate).

### 5. Execution Discipline (Mandatory)

1. **Reproduce first** — Both bugs must be reliably reproduced (ideally with real two-client Supabase-backed browser E2E where applicable) before any source edits.
2. **One small targeted change at a time** — Make the smallest possible edit, run focused verification, then proceed.
3. **Real end-to-end multiplayer testing** — Use two distinct authenticated browser contexts + remote Supabase probes for any claim/state change. Do not rely solely on unit/integration tests.
4. **Parallel sub-agents** — Use multiple parallel sub-agents where helpful (e.g., one for status text reactivity, one for forfeit precedence logic, one for verification), coordinated by the main agent. All agents must follow this spec and the constitution.
5. **Update surfaces continuously** — After every major step, update `CHANGELOG.md`, `AGENT-IMPLEMENTATION-PLAN.md`, `progress/PROGRESS.csv`, a new `progress/PROGRESS-STEP-XXX.md`, `agents.md` (if coordination notes change), and `memory.md`.
6. **Resource safety** — One dev server, minimal browser contexts, close contexts promptly, monitor memory, clean up after verification.
7. **Iterate until clean** — Continue until both bugs are fixed, no regressions exist, all tests pass, and the full verification gate is green. Do not stop early.

### 6. Verification Requirements (Full Gate)

Must pass before handoff:
- Focused changed-area tests + wider multiplayer/GO regressions
- `npm run lint`, `npm run test` (full suite), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`
- Desktop / tablet-like / 390px mobile browser smoke (no new console errors or horizontal overflow)
- Real two-client Supabase-backed browser E2E for both OG and GO (Practice + Daily) covering join, turns, forfeit, timeout, and normal completion scenarios
- Remote Supabase probes + cleanup of temporary users/rows/claims
- Resource / process checks (no Stage 20-owned runaway processes)
- Vercel preview (optional but recommended for final handoff)

### 7. Out-of-Scope / Explicitly Forbidden

- Any gameplay mechanics, board, keyboard, or tile changes
- Changes to Daily Multiplayer rules or claim behavior beyond what is strictly required for Bug 2
- Introduction of new features, UI redesign, or Phase 24 work
- Broad refactoring
- PR creation, merge, or release (gated until after this stage completes successfully)

### 8. Success Criteria

Stage 20 is complete when:
- Both reported bugs are reliably fixed and stay fixed under real two-client play.
- The status text box updates correctly and in sync for both players on all relevant events.
- Forfeiting a match (after at least one guess) always makes the forfeiting player lose, regardless of current points.
- No regressions to any prior Stage 12–19 behavior or Daily Multiplayer invariants.
- Full verification gate passes cleanly.
- All progress, changelog, and memory surfaces are updated.

### 9. Suggested High-Conflict / Coordination Surfaces (for future execution)

High-conflict surfaces likely touched:
- `src/multiplayer/MultiplayerGameSurface.tsx` or equivalent (status text box)
- `src/multiplayer/multiplayer.ts` or scoring/result settlement logic (forfeit win/loss precedence)
- Related event emission or projection helpers
- `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `agents.md`, `memory.md`

If parallel sub-agents are used, keep these surfaces single-writer or explicitly sequenced by the coordinator.

### 10. Handoff & Next Steps

After successful completion of Stage 20:
- Full verification gate + real E2E evidence
- Updated progress surfaces and changelog
- Clear statement that Phase 23 bug fixing is now considered complete
- Readiness to move to Phase 24 (dedicated Multiplayer tab foundations)

**Gate**: This spec is planning/governance only. No source code edits, tests, or implementation are authorized until the user explicitly approves execution (via a future “execution prompt” or equivalent).
