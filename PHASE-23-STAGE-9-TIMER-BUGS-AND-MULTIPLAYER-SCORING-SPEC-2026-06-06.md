# PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md

**Phase**: 23 — Multiplayer Foundations and Polish  
**Stage**: 9 — Timed Multiplayer Timer Bug Fixes + Multiplayer Hard Mode + Multiplayer Scoring System  
**Status**: Draft for user review  
**Date**: 2026-06-06  
**Source of Truth**: This document  

## 1. Goals

Stage 9 has two primary objectives:

1. **Fix the critical turn timer bug** in timed Practice Multiplayer games.
2. **Implement a proper multiplayer scoring system** that works for both OG and GO games, supports Hard Mode as an optional lobby setting, and produces a clear winner (or draw) even when no player solves the puzzle.

This stage must preserve all existing invariants established through Stage 8:
- Daily Multiplayer remains strictly asynchronous (no time limits).
- Practice Multiplayer supports both untimed and timed (chess-clock) games.
- The unified Multiplayer model is the only active surface.

## 2. Scope

### In Scope

**Bug Fixes**
- Fix the turn timer / clock synchronization bug in timed Practice Multiplayer games.
  - After a player submits a guess, the rival’s board must correctly reflect the move without the guess disappearing.
  - Clocks must update correctly and consistently for both players.
  - The active player’s clock must continue running properly; the opponent’s clock must not incorrectly expire.
  - Untimed games must remain unaffected.

**Features**
- **Multiplayer Hard Mode** (optional lobby setting)
  - When creating a Practice Multiplayer lobby, the creator can toggle Hard Mode on/off.
  - The rival sees the Hard Mode status before joining.
  - Once joined, Hard Mode is locked for that game.
  - Hard Mode games should award higher points than normal games (exact bonus to be defined during implementation).

- **Multiplayer Scoring System**
  - Define a clear, consistent point system for both OG and GO multiplayer games.
  - OG games: Winner = player who solves the word, **or** the player with the highest points if no one solves it.
  - GO games: Winner = player with the highest total points across the full session (even if they solve the final puzzle).
  - Ties result in a draw.
  - Points are earned based on the player’s own guesses and whether they solved the puzzle.
  - One player’s performance must **not** directly reduce the other player’s points.
  - The scoring system must be designed so it can later serve as the foundation for the Elo/rating system (deferred to a later phase).

### Out of Scope (Deferred)

- Word length resolution / selection for Practice Multiplayer lobbies (optional future feature).
- Any changes to Daily Multiplayer.
- Dedicated Multiplayer tab.
- Spectator expansion.
- Notifications, bots, social features, or redesign work.
- Elo/rating integration (future phase).

## 3. Current State (Post Stage 8)

- The app uses a single unified **Multiplayer** model.
- Practice Multiplayer supports both untimed and timed (chess-clock) games.
- Daily Multiplayer is strictly asynchronous with no time limits.
- Live-specific code paths have been removed from the active surface.
- Legacy `async_multiplayer_games` table and local storage keys remain as compatibility plumbing only.

Stage 9 must work within this unified model.

## 4. Key Work Areas

### 4.1 Timer Bug Investigation & Fix (Critical)

- Extensively test timed Practice Multiplayer using real two-client Supabase E2E.
- Identify root cause of:
  - Guess disappearing on the rival’s board after submission.
  - Clocks behaving incorrectly (one clock running out prematurely).
- Implement a robust fix for clock state synchronization and board update reconciliation after each turn.
- Ensure the fix does not regress untimed games.

### 4.2 Multiplayer Hard Mode

- Add an optional `hardMode` boolean flag when creating a Practice Multiplayer lobby.
- Display Hard Mode status to the rival before they join.
- Lock Hard Mode for the duration of the game once joined.
- Integrate Hard Mode constraints into the existing game session (reuse solo Hard Mode logic where possible).
- Award bonus points for Hard Mode games.

### 4.3 Multiplayer Scoring System

- Design and implement a point system for multiplayer OG and GO games.
- Points should be calculated per player based on their own performance (guesses + solve status).
- Define clear win/draw conditions:
  - OG: Solve > Highest points (if no solve)
  - GO: Highest total points across the session
- Ensure the system is clean, explainable, and suitable as future input for Elo.
- Update relevant UI (game over screens, stats summaries) to show points and outcome.

### 4.4 Testing & Verification

- Real two-client Supabase-backed browser E2E testing is required for:
  - Timed Practice Multiplayer (including timer bug scenarios)
  - Hard Mode games
  - Scoring and win/draw outcomes in both OG and GO
- Full automated gate + responsive smoke testing.

## 5. Risks & Considerations

- The timer bug is described as difficult to reproduce without visual observation. Codex must perform thorough real multiplayer testing.
- Scoring system must feel fair and not punish players for their rival’s performance.
- Hard Mode must be clearly communicated to both players before the game starts.
- All changes must stay within the unified Multiplayer model established in Stage 8.

## 6. Verification Requirements

Stage 9 must pass:

- Full `npm run lint`, `npm run test`, `npm run build`, and TypeScript checks.
- Real two-client browser E2E for timed/untimed Practice Multiplayer and Hard Mode games.
- Correct clock behavior and board synchronization in timed games.
- Correct win/draw logic and point calculation in both OG and GO.
- Desktop + 390px mobile browser smoke with no console errors or horizontal overflow.
- Updated progress tracking, changelog, `agents.md`, and `memory.md`.

## 7. Coordination Notes

- High-conflict surfaces (`src/app/App.tsx`, `src/multiplayer/`, scoring logic) should be coordinated carefully.
- Suggested lanes if parallelized:
  - **Timer bug lane**: Focused on clock state, board reconciliation, and turn synchronization.
  - **Scoring lane**: Point calculation, win/draw logic, and UI updates.
  - **Hard Mode lane**: Lobby creation flag, visibility, and constraint enforcement.
  - **Coordinator lane**: Final integration, testing, and governance updates.

## 8. Success Criteria

Stage 9 is complete when:

- The critical turn timer bug in timed Practice Multiplayer is resolved.
- Multiplayer Hard Mode works as an optional, visible, and lockable lobby setting.
- A clean, fair multiplayer scoring system exists for both OG and GO games.
- All verification requirements are met.
- Tracking surfaces are updated and the user has reviewed the final handoff.

---

**End of Spec**