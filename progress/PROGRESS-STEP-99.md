# Progress Step 99 - Phase 23 Stage 9 Focused Implementation

**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: 9 - Timer Bugs, Practice Hard Mode, and Multiplayer Scoring  
**Status**: Completed - Stage 9 verification pending  
**Started**: 2026-06-06T18:11:33Z  
**Completed**: 2026-06-06T18:11:33Z  

## Authorization

The user explicitly authorized full Stage 9 execution from `PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md`.

This checkpoint records the first implementation slice. PR creation, merge, release, the dedicated Multiplayer tab, spectator expansion, notifications, bots, social features, redesign work, and later-phase work remain gated.

## Implementation Completed

- Added per-player serialized multiplayer sessions so each player's board restores from their own guesses rather than the latest shared compatibility session.
- Updated timed Practice Multiplayer expiration so a client only expires the viewer-owned active turn, preventing an inactive rival browser from running the wrong clock to zero.
- Added a repository stale-projection guard that refuses to persist an incoming game projection when it would drop already-saved moves.
- Added Practice-only Multiplayer Hard Mode as a creator-selected lobby setting that is stored in the game projection and normalized for older games.
- Reused the canonical OG/GO session validation by carrying the Hard Mode flag into each player's serialized session.
- Added deterministic multiplayer scoring with per-player points, Hard Mode solve bonus, and explicit winner/draw summaries suitable for future rating evidence.
- Updated Multiplayer UI tests and components so the active play surface renders the viewer player's board and Practice lobbies expose Hard Mode before join.

## Focused Verification

Passed:

```bash
npm run test -- --run src/multiplayer/multiplayer.test.ts src/multiplayer/multiplayerRepository.test.ts src/multiplayer/scoring.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx src/multiplayer/MultiplayerPanel.test.tsx
```

Result: 5 files passed, 36 tests passed.

## Additional Focused Fix Found During Verification

Browser verification exposed a duplicate-insert `409` from Supabase when host-owned row creation raced with an already-persisted multiplayer row. The repository now uses duplicate-safe `upsert(..., ignoreDuplicates: true)` for first writes and stale-guarded updates for existing rows. A follow-up network probe verified that the 409 no longer appears during two-client Practice Multiplayer creation/join/turn submission.

## Remaining Verification

The following remain pending for final Stage 9 completion:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Real two-client Supabase-backed browser E2E for timed Practice Multiplayer, untimed Practice Multiplayer, Practice Hard Mode, and Daily Multiplayer no-clock non-regression
- Desktop, tablet-like, and 390px mobile browser smoke
- Vercel preview deployment

## Scope Guard

No PR, merge, release, dedicated Multiplayer tab, spectator expansion, notifications, bots, social features, redesign work, or later-phase work was performed.

## Next Step

Continue Stage 9 execution with full-app verification, real multiplayer browser/Supabase testing, any scoped fixes found during verification, preview deployment, and final handoff.
