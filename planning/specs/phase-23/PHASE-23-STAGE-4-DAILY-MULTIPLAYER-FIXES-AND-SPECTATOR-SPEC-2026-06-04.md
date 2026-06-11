# PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md

**Phase**: 23 (Multiplayer Foundations and Polish)
**Stage**: 4 (Stabilization Follow-up + Spectator Foundations)
**Status**: Draft for user review
**Date**: 2026-06-04
**Related**: `brrrdle_observations_2026_06_04.md`, `AGENT-IMPLEMENTATION-PLAN.md` §28.13 (phase_id = 77/78), previous stabilization work (`phase_id = 75`–`78`)

## 1. Objective

Continue stabilizing and polishing the multiplayer systems in Phase 23 by addressing remaining bugs and small UX gaps in Daily Multiplayer, while laying clean foundations for the spectator feature. This stage focuses on **reliability, correctness, and user experience** rather than large architectural changes.

The goal is to reach a state where Daily Multiplayer (both Async and Live) feels as solid and automatic as Practice Multiplayer, while beginning responsible preparation for spectators.

## 2. Scope

### 2.1 Bug Fixes (Required)

| # | Issue | Description | Priority |
|---|-------|-------------|----------|
| 1 | **Daily Multiplayer lobby visibility** | New lobbies created by other players do not appear for users already viewing the Daily Async or Daily Live lobby list without a manual page refresh. Practice multiplayer does **not** have this problem. | High |
| 2 | **Daily Multiplayer "already played" bypass** | Users can still create/open a new lobby for a Daily Multiplayer mode even after they have already played (or claimed) that mode for the current UTC day. The warning appears, but the lobby is still created. | High |
| 3 | **Per-player vs global lobby limit** | Confirm whether the 5-lobby limit is currently applied **per player** (desired) or globally (undesired). Fix if it is global. | High |
| 4 | **Lobby cancellation for creators** | Add the ability for a lobby creator to cancel/close a lobby they created **before** any other player has joined. This should properly decrement their personal active lobby count. | Medium-High |

### 2.2 Small Feature Additions (Required)

- **Lobby cancellation UI**: Add a clear "Cancel Lobby" / "Close Lobby" action visible only to the creator when no other player has joined.
- **Rival identity improvements** (if gaps remain from phase_id = 78): Ensure rival name, avatar, and accent are consistently shown in waiting lobbies, active matches, and finished states across Async and Live.

### 2.3 Medium Feature: Spectator Foundations (Strongly Desired)

Begin implementing spectator support, with highest priority on **Live** matches.

**Minimum viable spectator behavior for this stage**:
- Allow authenticated users to join an active Live match as a **spectator** (read-only view).
- Spectators should see the current board state, guesses, and result in near real-time.
- Spectators must **not** be able to submit guesses or affect the game state.
- Clear visual distinction that the user is spectating (not playing).
- Basic spectator count / presence indicator is nice-to-have but not required in this stage.

**Out of scope for this stage**:
- Full spectator UI polish
- Spectator chat
- Async spectator mode (can be added later)
- Advanced permissions or moderation tools

### 2.4 Explicitly Deferred

- **Dedicated Multiplayer tab** with multi-game dashboard view: This is acknowledged as valuable but considered too large for the current stabilization-focused stage. Planning and architectural thinking may begin, but implementation should be deferred to a later stage or new phase.

## 3. Success Criteria

- Daily Async and Daily Live lobby lists update automatically when new lobbies are created (matching current Practice behavior).
- Users cannot create a second Daily Multiplayer lobby for a mode they have already claimed that UTC day.
- The 5-lobby limit is correctly enforced **per player**, not globally.
- Creators can cancel their own unjoined lobbies, and their personal lobby count is correctly decremented.
- Spectators can join active Live matches in a read-only capacity with a clear spectator experience.
- All existing multiplayer invariants remain intact (per-player limits, Daily claim rules, answer separation, rival identity safety, etc.).
- Full verification gate passes (lint, tests, build, typecheck, desktop + mobile smoke).

## 4. Architectural Guidance

- **Learn from Practice Multiplayer**: The fact that Practice multiplayer does not suffer from the manual refresh problem should be investigated. Apply similar subscription/state-reconciliation patterns to Daily Async and Daily Live where appropriate.
- **Daily Claim System**: Extend the existing Daily Multiplayer claim logic (`multiplayer_daily_claims` + related helpers) rather than creating parallel systems.
- **Per-player lobby counting**: The 5-lobby limit should be tracked per authenticated user (not globally). Cancellation of an unjoined lobby must release the slot.
- **Spectator model**: Treat spectators as a third role alongside `player-one` and `player-two`. Use the existing Live match infrastructure where possible. Keep spectator logic clearly separated from active player logic.
- **Minimal surface changes**: Prefer additive changes and new components over large refactors of existing multiplayer panels.

## 5. Verification Requirements

In addition to the standard gate (`npm run lint`, `npm run test`, `npm run build`, `npx tsc`, `git diff --check`), the following must be manually/smoke verified:

- Daily Async and Daily Live lobby lists update in real time across multiple browser sessions.
- Attempting to create a second Daily Multiplayer lobby for an already-claimed mode is properly blocked.
- Per-player 5-lobby limit works correctly when multiple users create lobbies.
- Lobby creators can cancel unjoined lobbies and their count is decremented.
- Spectators can join a Live match and see live updates without being able to play.
- No regressions in existing Async/Live flows, Daily claim behavior, or rival identity display.

## 6. Out of Scope for This Stage

- Full dedicated Multiplayer tab implementation
- Spectator features for Async matches (unless trivial)
- Advanced spectator tools (chat, moderation, etc.)
- Major UI/UX overhaul of multiplayer surfaces
- Any changes to solo gameplay, economy, stats, or daily solo behavior

## 7. Recommended Approach

1. Fix the four high-priority Daily Multiplayer bugs first (lobby visibility, claim bypass, per-player limits, and cancellation).
2. Add the lobby cancellation UI.
3. Implement basic spectator support for Live matches.
4. Clean up any remaining small inconsistencies discovered during the work.
5. Update all relevant tracking surfaces (`AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `memory.md`, `agents.md`, progress files).

## 8. Exit Gate

After completion, the agent must:
- Run the full verification gate.
- Update `AGENT-IMPLEMENTATION-PLAN.md` with a new subsection documenting what was done.
- Update `CHANGELOG.md`, `memory.md`, and progress tracking.
- Provide a clear summary + Vercel preview link.
- Halt for user review before any PR or merge.

---

**End of spec**
