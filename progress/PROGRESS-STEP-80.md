# Progress Step 80 - Phase 23 Stage 4 Execution

**Phase / step**: Phase 23 Stage 4 - Daily Multiplayer fixes and Live spectator foundations
**Date**: 2026-06-05
**Status**: Completed; awaiting user review before PR, merge, release, dedicated Multiplayer tab, or later work
**Authority**: User explicitly authorized Stage 4 implementation from `PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md`
**Gates preserved**: No PR, merge, release, dedicated Multiplayer tab, or later-phase work.

## Scope Implemented

This step implements the Stage 4 scope from the dedicated spec:

- Daily Async and Daily Live active capacity now counts per authenticated user rather than globally.
- Duplicate Daily create/open bypasses are blocked in the async/live domain layer.
- Authenticated repository-save failures reload the authoritative repository snapshot rather than preserving a rejected optimistic Daily create locally.
- Async lobby creators can cancel their own unjoined waiting lobbies.
- Live lobby creators can cancel their own unjoined waiting lobbies.
- Cancelled unjoined lobbies release the active-game slot but preserve the Daily Multiplayer claim for that UTC day/transport/mode bucket.
- Live spectators are modeled as authenticated read-only viewers separate from `player-one` and `player-two`.
- Spectators can enter active Live matches, view board/history state, and cannot submit guesses, resolve word-length selection, forfeit, cancel lobbies, or mutate rating/scoring paths.
- The deferred dedicated Multiplayer tab remains out of scope.

## Files Changed

- `src/multiplayer/asyncMultiplayer.ts`
  - Added `cancelled` async status.
  - Added per-viewer active game counting.
  - Added duplicate Daily create guard.
  - Added creator-only unjoined async lobby cancellation.

- `src/multiplayer/AsyncMultiplayerPanel.tsx`
  - Uses per-viewer active count.
  - Shows creator-only `Cancel Lobby` for eligible waiting async lobbies.
  - Hides forfeit for unjoined waiting lobbies.
  - Avoids answer reveal for cancelled Daily lobbies.

- `src/multiplayer/liveMultiplayer.ts`
  - Added per-viewer live active counting.
  - Added duplicate Daily live create guard.
  - Added creator-only unjoined live lobby cancellation.
  - Added separate Live spectator role and mutation guards.

- `src/multiplayer/LiveMultiplayerPanel.tsx`
  - Shows per-viewer active capacity.
  - Shows creator-only live lobby cancellation.
  - Adds spectator entry and read-only spectator display.
  - Displays spectator public label where available.

- `src/multiplayer/liveRepository.ts`
  - Added repository `joinSpectator` seam.
  - Added local/memory/Supabase spectator persistence paths.
  - Reads additive `live_match_spectators` rows when present and tolerates missing spectator table during read refresh.

- `src/app/App.tsx`
  - Adds App-owned spectator join callback.
  - Reloads authoritative async/live snapshots on authenticated save failures to avoid preserving rejected optimistic rows.

- `src/calendar/CalendarPanel.tsx`
  - Threads the spectator join callback into Daily Live Multiplayer.

- `src/multiplayer/scoring.ts`
  - Excludes cancelled async lobbies from rating/scoring projection.

- `src/multiplayer/asyncMultiplayer.test.ts`
- `src/multiplayer/AsyncMultiplayerPanel.test.tsx`
- `src/multiplayer/liveMultiplayer.test.ts`
- `src/multiplayer/LiveMultiplayerPanel.test.tsx`
- `src/multiplayer/liveRepository.test.ts`
  - Added regression coverage for per-user limits, duplicate Daily create guards, cancellation, spectator persistence, and spectator read-only behavior.

- `supabase/migrations/20260605043000_phase23_stage4_lobby_cancel_spectators.sql`
  - Adds async `cancelled` status.
  - Adds `live_match_spectators` table, RLS policies, grants, and realtime publication hook.

- `docs/supabase.md`
  - Documents the Stage 4 migration and verification checklist items.

- `AGENT-IMPLEMENTATION-PLAN.md`
  - Bumped to v3.13 and added §28.16 execution record.

- `CHANGELOG.md`
  - Added the Stage 4 execution entry.

- `progress/PROGRESS.csv`
  - Added `phase_id = 80`.

## Durable Decisions

- **Cancellation does not release the Daily claim**: it releases only the active-game slot. This prevents a user from repeatedly creating/cancelling Daily Multiplayer lobbies until a favorable state appears.
- **Spectators are not participants**: they are stored in `live_match_spectators`, not `live_match_participants`, so they cannot inherit player write permissions or occupy player seats.
- **Authenticated save errors reload**: for signed-in multiplayer, rejected saves now cause a repository reload instead of a local-only fallback for the rejected state.

## Final Verification

- Focused multiplayer tests pass:
  - `src/multiplayer/asyncMultiplayer.test.ts`
  - `src/multiplayer/AsyncMultiplayerPanel.test.tsx`
  - `src/multiplayer/liveMultiplayer.test.ts`
  - `src/multiplayer/LiveMultiplayerPanel.test.tsx`
  - `src/multiplayer/liveRepository.test.ts`
  - `src/multiplayer/scoring.test.ts`
- `npx tsc -p tsconfig.app.json --noEmit` passes.
- `npm run lint` passes.
- `npm run test` passes (`468/468` tests).
- `npm run build` passes with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passes.
- `git diff --check` passes.
- Remote Supabase migrations are applied on project `lbqpyiglufjafakzohbb`:
  - `phase23_daily_multiplayer_claims`
  - `phase23_stage4_lobby_cancel_spectators`
- Remote Supabase Stage 4 probe passes with isolated cleanup:
  - Daily Async lobby visibility, join visibility, duplicate Daily guard, and cancellation persistence.
  - Daily Live lobby visibility, match visibility, spectator join/projection, duplicate Daily guard, and cancellation persistence.
- Desktop and 390px mobile browser smoke passes for:
  - Landing page.
  - Calendar indicators.
  - Daily Async Multiplayer.
  - Daily Live Multiplayer.
  - Settings route.
  - No horizontal overflow and no console/page errors.
- Vercel preview deployed at `https://brrrdle-8gkrs65cg-ryanjosephkamps-projects.vercel.app`.
  - The plain preview URL is protected (`HTTP 401`).
  - The automation-bypass preview URL returns `HTTP 200`; the clickable bypass URL is supplied in the final Codex chat response only, not stored in repository docs.

## Next Step

User review. PR creation, merge, release, the dedicated Multiplayer tab, and later-phase work remain explicitly gated.
