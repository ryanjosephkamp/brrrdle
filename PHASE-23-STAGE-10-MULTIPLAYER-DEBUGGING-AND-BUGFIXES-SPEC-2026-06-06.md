# PHASE-23-STAGE-10-MULTIPLAYER-DEBUGGING-AND-BUGFIXES-SPEC-2026-06-06.md

**Phase**: 23 — Multiplayer Foundations and Polish  
**Stage**: 10 — Multiplayer Debugging and Bug Fixes  
**Status**: Planning / Governance (to be followed by execution)  
**Date**: 2026-06-06  
**Source of Truth**: This document + `AGENT-IMPLEMENTATION-PLAN.md` §28.28 (to be added)

---

## 1. Overview / Goal

Stage 10 is a **targeted debugging and stabilization stage** focused exclusively on the unified Multiplayer system delivered in Stages 8 and 9.

The primary objective is to achieve reliable, consistent real-time (or near real-time) multiplayer gameplay so that both players see each other’s moves correctly on their boards and keyboards, with correct turn history, clock behavior (when applicable), and state synchronization.

This stage exists because a critical synchronization bug was discovered after Stage 9: when one player submits a guess, the second player’s gameplay board and keyboard do not update, even though the turn history does update for both players.

---

## 2. Critical Bug (Must Be Fixed)

**Description**:
When playing a Practice Multiplayer game (timed or untimed):

- Player 1 submits a valid guess.
- The turn history correctly shows the guess for **both** players.
- Player 1’s board and on-screen keyboard update correctly.
- **Player 2’s board does NOT display the submitted letters** in the active row.
- Player 2’s keyboard state is not updated to reflect the letters that were just played.

This breaks the fundamental expectation of multiplayer: both players must see the same game state in their respective views.

**Root Cause Hypothesis** (for Codex to investigate):
The issue likely lies in how the second player’s view receives and applies the first player’s move — specifically in the interaction between:
- `playerSessions` (per-player serialized sessions)
- The shared `serializedSession`
- Repository subscription / projection reconciliation logic
- `MultiplayerGameSurface` rendering logic for the non-active player

---

## 3. Scope

### In Scope
- Systematic debugging of the current unified Multiplayer implementation (post Stage 9).
- Fixing the critical board/keyboard synchronization bug described above.
- Identifying and fixing **other multiplayer-related bugs** discovered during thorough testing.
- Ensuring robust state synchronization between two real players using the Supabase backend.
- Adding or improving focused tests and E2E verification for multiplayer state consistency.
- Updating all relevant tracking surfaces (`AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/`, `agents.md`, `memory.md`).

### Out of Scope
- New features (e.g., dedicated Multiplayer tab, spectator improvements, notifications, bots, social features).
- Any changes to Daily Multiplayer (must remain strictly asynchronous, no clocks, no Hard Mode lobby controls).
- PR creation, merge, or release (unless explicitly authorized in a future prompt).
- Major refactoring or redesign of the Multiplayer architecture.
- Changes to solo gameplay, daily system, economy, or non-multiplayer areas.

---

## 4. Key Requirements & Constraints

1. **Real Two-Client Testing is Mandatory**  
   All significant fixes must be verified with real two-client Supabase-backed browser E2E testing using distinct authenticated accounts (not local simulations).

2. **Daily Multiplayer Invariants**  
   Daily Multiplayer must remain untouched in behavior. It must stay strictly asynchronous with no time limits and no Hard Mode controls.

3. **Per-Player Session Model**  
   The `playerSessions` + `getMultiplayerSessionForPlayer` pattern introduced in Stage 9 should be respected and improved where necessary. The shared `serializedSession` should remain compatibility/answer plumbing only.

4. **No Regression on Stage 8/9 Deliverables**  
   Hard Mode, scoring, chess-clock time limits (Practice only), and unified terminology must continue to work correctly.

---

## 5. Deliverables

By the end of Stage 10, the following should exist:

- A working fix for the critical board/keyboard synchronization bug.
- A list of all other multiplayer bugs discovered and fixed during this stage.
- Improved test coverage for multiplayer state synchronization (focused unit + E2E).
- Updated documentation in `AGENT-IMPLEMENTATION-PLAN.md` §28.28 documenting the fixes and any new durable decisions.
- Updated `CHANGELOG.md`, `progress/PROGRESS.csv`, and a new `progress/PROGRESS-STEP-101.md` (or next sequential ID).
- Updated `agents.md` and `memory.md` with any new coordination notes or invariants.

---

## 6. Success Criteria / Verification

Stage 10 is considered successful when:

1. The critical bug is resolved: Both players see each other’s submitted guesses appear correctly on their boards and keyboards in real time (or near real time).
2. Turn history, board state, and keyboard state remain consistent between both players after every move.
3. Real two-client Supabase E2E testing passes for:
   - Untimed Practice Multiplayer
   - Timed Practice Multiplayer (with clocks)
   - Practice Multiplayer with Hard Mode enabled
   - Multiple consecutive turns / full games
4. No regressions are introduced in Daily Multiplayer or solo gameplay.
5. All automated gates pass: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`.
6. Desktop, tablet-like, and 390px mobile responsive smoke tests pass with zero console errors and no horizontal overflow.

---

## 7. Recommended Approach

1. **Reproduce First** — Use two authenticated browser contexts to reliably reproduce the reported bug before making code changes.
2. **Isolate the Failure Point** — Determine whether the issue is in:
   - How moves are saved to Supabase
   - How subscriptions/projected state are reconciled on the second client
   - How `MultiplayerGameSurface` renders the non-active player’s view
   - Interaction between `playerSessions` and the shared session
3. **Fix Minimally but Robustly** — Prefer targeted fixes that strengthen the existing per-player session model rather than large rewrites.
4. **Broad Debugging Pass** — While fixing the main bug, Codex should actively look for other synchronization, state, or UX issues in multiplayer and fix them in the same stage.
5. **Verify Extensively** — Run real two-client E2E testing after every significant change.

---

## 8. Risks & Considerations

- **State Synchronization Complexity**: Multiplayer state bugs are often subtle and can reappear under different network conditions or timing.
- **Daily Multiplayer Safety**: Any changes to the unified model must not accidentally affect Daily Multiplayer behavior or claim logic.
- **Test Reliability**: Real Supabase E2E tests can be flaky. Codex should make them as deterministic as possible and clean up test data.
- **Scope Creep**: There is a temptation to keep debugging forever. This stage should be time-boxed around fixing the reported bug + other clearly broken multiplayer behaviors discovered during testing.

---

## 9. Workflow Notes

This stage will follow the established two-prompt workflow:

1. **Planning Prompt** (documentation/governance only) — Codex reviews the repo + this spec, updates `AGENT-IMPLEMENTATION-PLAN.md` §28.28, `agents.md`, `memory.md`, creates the next progress step, and halts for review.
2. **Execution Prompt** — After user approval, Codex performs the actual debugging and bug fixing work autonomously (using parallel sub-agents where helpful), updates all tracking surfaces, runs full verification, and halts for final user review.

No PR, merge, or release is authorized in this stage unless explicitly added in a future prompt.

---

## 10. Gate

This planning document is complete. Stage 10 implementation remains **gated** until the user explicitly authorizes the execution prompt in a subsequent message.
