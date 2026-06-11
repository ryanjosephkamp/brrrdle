# PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md

**Phase**: 23 (Multiplayer Foundations and Polish)
**Stage**: 6
**Status**: Draft for user review
**Date**: 2026-06-05
**Priority**: Critical — must be resolved immediately

## 1. Overview / Goal

This stage addresses a set of high-severity bugs that are making live multiplayer (both Practice and Daily) unreliable and, in some cases, unplayable. The primary goals are:

- Fix the Daily Multiplayer claim logic so that cancelling a lobby **before** a rival joins properly releases the daily claim.
- Make live multiplayer real-time updates reliable (board state + turn history) without requiring manual refreshes.
- Eliminate the flashing/glitching behavior after word-length selection in Practice Live.
- Ensure the lobby creator sees word-length selection without needing to refresh.
- Make browser refresh preserve the current tab/game instead of returning to the dashboard.

Async multiplayer is relatively stable and should be used as a reference for how live multiplayer should behave.

## 2. Scope (Bugs to Fix)

### 2.1 Critical Bugs (Highest Priority)

| # | Bug | Description | Impact |
|---|-----|-------------|--------|
| 1 | Daily Multiplayer claim on early cancellation | Cancelling a daily lobby before any rival joins still consumes the daily claim for that bucket (`async:og`, `async:go`, `live:og`, `live:go`). The claim should be released. | Players are incorrectly blocked from creating another daily lobby of the same type/mode on the same day. |
| 2 | Live multiplayer real-time updates broken | The main game board and "Turn history" areas do not update properly when players take turns in live games. The board often flashes or shows stale state. | Live multiplayer is currently unplayable. |
| 3 | Practice Live flashing/glitching after word length selection | After word-length selection resolves, **both players** experience rapid flashing/glitching between the selection screen and gameplay screen. Requires manual refresh to stabilize. | Live Practice games become unusable. |
| 4 | Word length selection not visible to lobby creator | When a rival joins a live lobby, the joining player sees the word-length selection UI, but the creator must manually refresh to see it. | Breaks the "no manual refresh ever" requirement. |

### 2.2 Important Related Bugs

| # | Bug | Description |
|---|-----|-------------|
| 5 | Browser refresh returns to dashboard | Refreshing the page while inside a multiplayer game sends the user back to the Command Center / dashboard instead of keeping them on the current tab/game. |
| 6 | General live multiplayer instability | Multiple reports of delayed board updates, flashing puzzle areas, and inconsistent state between players in live games (both Practice and Daily). |

**Note**: The user has not yet tested the spectator feature. Spectator work is explicitly out of scope for Stage 6.

## 3. Out of Scope

- Any new features (including those listed in the earlier Stage 5 ideas document).
- Spectator feature implementation or testing.
- Dedicated Multiplayer tab.
- Browser notifications, floating game manager, History/Theme tabs, bots, exports/GIFs, or any other deferred items.
- Broad refactoring or architecture changes beyond what is necessary to fix the listed bugs.

## 4. Key Requirements

- Daily claim release on early cancellation must be reliable and prevent the "create → cancel → blocked" loop.
- Live multiplayer must deliver real-time board and turn history updates to **both** players without manual refresh (match or exceed the quality of async multiplayer).
- After word-length selection resolves in Practice Live, both clients must transition cleanly to gameplay without flashing or glitching.
- The lobby creator must see word-length selection state in real time when a rival joins.
- Browser refresh while in a game must preserve the current route/tab.
- All fixes must preserve existing invariants (daily = 5 letters, Practice 2–35, canonical tile coloring, Hard Mode, solo-style board + on-screen keyboard in multiplayer, etc.).
- No Supabase migration is expected, but any necessary schema or RLS adjustments must be minimal and well-documented.

## 5. Recommended Approach

1. **Daily claim release on cancellation** — Audit the current claim + cancellation logic in `dailyMultiplayer.ts`, async/live domain layers, and repository paths. Ensure early cancellation (before rival joins) releases the claim while still protecting against create/cancel/recreate abuse.

2. **Live real-time updates** — Treat this as the highest-risk item. Compare the current live implementation against how async multiplayer successfully updates "Turn history" and board state. Align live behavior with the working async approach where possible. Focus on reliable repository + Realtime reconciliation for both players.

3. **Word length selection sync + flashing fix** — Ensure the creator receives the same state updates as the joiner. Investigate and eliminate the flashing/glitching transition after selection resolves in Practice Live.

4. **Browser refresh behavior** — Ensure route/tab state is preserved on hard refresh (likely a routing or app-shell level fix).

5. **Verification** — Use two-client (or multi-client) testing, focused unit/repository tests, remote Supabase probes, and desktop + mobile browser smoke testing.

**Suggested work slices (if parallelized):**
- Lane A: Daily claim/cancellation logic
- Lane B: Live real-time board + history updates (highest effort)
- Lane C: Word length selection sync + flashing/glitching fix
- Lane D: Browser refresh tab preservation + general polish
- Coordinator: `src/app/App.tsx`, high-conflict multiplayer files, final integration, verification, and docs

## 6. Success Criteria / Verification

- All six bugs listed above are resolved and no longer reproducible.
- `npm run test` passes with no regressions (target: 473+ passing).
- `npm run lint`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit` all pass.
- `git diff --check` clean.
- Desktop + 390px mobile browser smoke passes with no console errors or layout issues.
- Remote Supabase verification confirms correct daily claim release behavior and reliable live multiplayer state synchronization between two distinct authenticated clients.
- No manual refresh is required for any of the affected live flows.

## 7. Risks & Considerations

- Live real-time synchronization has been fragile in previous stages. This is the highest-risk area and should be approached carefully with strong two-client testing.
- Daily claim logic was recently modified in Stage 4 and Stage 5. Changes must be precise to avoid reintroducing bypasses or overly strict blocking.
- The flashing/glitching issue may be related to React state transitions or routing during phase changes — investigate both domain state and UI rendering.

## 8. Gate

After implementation, halt for explicit user review.
**PR creation, merge, release, dedicated Multiplayer tab work, and any deferred feature work remain gated** until the user provides further approval.

---

**End of spec**