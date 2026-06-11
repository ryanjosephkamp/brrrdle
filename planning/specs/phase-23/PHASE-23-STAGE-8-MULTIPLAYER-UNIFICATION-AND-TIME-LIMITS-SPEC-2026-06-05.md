# PHASE-23-STAGE-8-MULTIPLAYER-UNIFICATION-AND-TIME-LIMITS-SPEC-2026-06-05.md

**Stage**: Phase 23 Stage 8 — Multiplayer Unification + Time-Limited Practice Games  
**Date**: 2026-06-05  
**Status**: Draft for user review  
**Goal**: Simplify the multiplayer system by removing the artificial Async vs Live split, introduce chess-clock-style time limits for Practice Multiplayer, and resolve the excessive memory consumption that is currently causing browser instability (especially when running multiple game instances).

---

## 1. Overview / Goal

This stage unifies the current Async and Live multiplayer systems into one coherent **Multiplayer** experience while also addressing a critical performance regression.

The core changes are:
- There is no longer a separate "Live" multiplayer mode.
- All multiplayer is fundamentally asynchronous, with optional time limits available in **Practice Multiplayer**.
- **Daily Multiplayer** remains strictly asynchronous with no time limits (only UTC midnight expiry).
- The lobby creator in Practice Multiplayer can choose a total time limit per player (chess clock model).
- The implementation must fix the excessive memory usage that is currently causing Google Chrome to become unstable or crash when running multiple instances of the game (e.g. two browser windows with different accounts for multiplayer testing).

This change is intended to reduce complexity, eliminate recurring Live implementation problems, make the future dedicated Multiplayer tab easier to build, and restore acceptable memory/performance characteristics.

---

## 2. Rationale

The separation between Async and Live has created ongoing implementation friction. Additionally, recent changes (particularly in the multiplayer layers) have introduced significant memory bloat. When attempting to test multiplayer by opening two browser windows with separate accounts, Chrome becomes unresponsive or crashes due to very high memory consumption (observed usage exceeding 8–9 GB from individual processes).

Unifying the system and explicitly requiring memory/performance cleanup in this stage addresses both the architectural complexity and the practical stability issues.

---

## 3. Scope

### In Scope for Stage 8

- Unify terminology across the entire app: Remove "Async" and "Live" distinctions. Everything becomes simply **Multiplayer**.
- **Daily Multiplayer**:
  - Remains strictly asynchronous.
  - No per-player or total-game time limits.
  - Games expire automatically at UTC midnight.
  - Separate OG and GO modes with separate answer lists.
  - All existing Daily Multiplayer rules and restrictions preserved.
- **Practice Multiplayer**:
  - Lobby creator selects a time limit per side when creating the lobby.
  - Initial time limit options: No time limit, 30 seconds, 1 minute, 2 minutes, 5 minutes, 10 minutes, 30 minutes, 1 hour.
  - Time limit model: Total time allocated to each player for the entire game (sum of all their turns/guesses), modeled after a chess clock.
  - The game must visibly show remaining time and enforce the limit (player loses if time runs out).
- Investigate and fix the root causes of excessive memory consumption, particularly when multiple game instances are running simultaneously.
- Update all domain logic, state machines, timers, lobby creation, gameplay surfaces, Calendar indicators, and related UI.
- Ensure the unified system remains stable under normal multiplayer testing conditions (including two concurrent browser sessions).

### Out of Scope (Deferred)

- Dedicated Multiplayer tab.
- Spectator mode expansion.
- Notifications, floating game manager, or other deferred features.
- Major UI redesign.
- Bots or AI opponents.
- Public leaderboards or social features.
- Adding time limits to Daily Multiplayer.

---

## 4. Detailed Behavior

### 4.1 Daily Multiplayer

- Strictly turn-based and asynchronous.
- No time limits on turns or total game duration.
- Automatic expiry at UTC midnight (existing behavior preserved).
- Separate answer lists for OG and GO modes.
- All existing claim limits, anti-gaming rules, and one-per-day restrictions remain in force.

### 4.2 Practice Multiplayer

- When creating a lobby, the creator chooses a **Time Limit per Side**.
- Supported options include "No time limit" plus several timed options.
- The time limit represents the **total time** each player has for the whole game (all guesses combined).
- Both players see visible clocks showing remaining time for each side.
- If a player exhausts their time, they lose the game.
- "No time limit" games behave like the current working asynchronous multiplayer.
- All other core mechanics (lobby creation, discovery, joining, turn submission, history, forfeit, etc.) should follow the reliable async implementation patterns.

### 4.3 Terminology & Labeling

Replace throughout the application:
- "Async Multiplayer" → "Multiplayer"
- "Live Multiplayer" → (removed entirely)
- "Practice Async" / "Practice Live" → "Practice Multiplayer"
- "Daily Async" / "Daily Live" → "Daily Multiplayer"

Update all labels, routes, Calendar indicators, settings, and documentation.

### 4.4 Memory & Performance Requirements

The implementation must address the current excessive memory usage. Specifically:

- The game should remain stable when running multiple instances (e.g. two browser windows with different authenticated accounts).
- Root causes of high memory consumption (such as duplicate Supabase clients, excessive realtime subscriptions, unoptimized state management, multiple listeners, or heavy component re-renders) must be identified and resolved.
- Memory usage should be reasonable under normal multiplayer testing conditions.
- This is considered a blocking requirement for Stage 8 completion.

---

## 5. Key Constraints & Invariants

- Daily Multiplayer must remain strictly asynchronous with **no** time limit options.
- Daily 5-letter invariant and one-claim-per-day-per-mode rules must be preserved.
- Practice Multiplayer must cleanly support both timed and untimed games.
- Time enforcement (when enabled) must be fair and accurate.
- No regression to solo gameplay, stats, economy, resume, definitions, Calendar, or auth behavior.
- The memory/performance issues must be meaningfully improved.

---

## 6. Deliverables

By the end of Stage 8:

- A single unified Multiplayer system exists (no separate Async/Live paths).
- Daily Multiplayer is strictly asynchronous with UTC midnight expiry only.
- Practice Multiplayer supports creator-chosen time limits (including no limit) using a total-time-per-player model.
- Excessive memory consumption has been investigated and significantly reduced.
- All UI, domain logic, timers, and state handling updated for the new model.
- Calendar, lobby creation, and gameplay surfaces are consistent with the unified model.
- Full verification gate passed.
- Relevant documentation and tracking surfaces updated.

---

## 7. Success Criteria / Verification

- Daily Multiplayer has no time limits and expires only at UTC midnight.
- Practice Multiplayer correctly enforces chosen time limits (or no limit) with visible clocks.
- Both timed and untimed Practice games are playable end-to-end.
- No "Live" code paths or terminology remain in the multiplayer system.
- The game remains stable when running two concurrent browser instances with different accounts (no crashes or extreme memory spikes).
- Full automated verification + browser smoke passes.
- Real multiplayer testing performed on both timed and untimed Practice games.

---

## 8. Risks & Considerations

- This is a significant refactor. There is a risk of introducing new bugs in state management, timers, and lobby handling.
- Live-related code must be removed or repurposed cleanly.
- Time enforcement logic must not be exploitable.
- Daily Multiplayer behavior must not regress.
- Memory fixes must be genuine and not just superficial.
- The change should simplify (not complicate) the future dedicated Multiplayer tab.

---

## 9. Workflow Notes

- This work will be executed as **Stage 8** of Phase 23 in a single stage.
- Subsequent stages can be used to smooth out bugs or polish issues.
- The first Codex prompt should be planning/governance only.
- A later prompt will authorize full execution.
- Memory/performance investigation and fixes are considered part of the core scope of this stage.

---

**End of Spec**