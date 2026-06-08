# Progress Step 107 - Final Stabilization First Bug-Fix Batch

**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: Final Stabilization & Broad Debugging Pass  
**phase_id**: 107  
**Status**: Completed - Final Stabilization Verification Continues  
**Started**: 2026-06-07T01:05:20Z  
**Completed**: 2026-06-07T01:05:20Z  

## Authorization

The user explicitly authorized execution of the Phase 23 Final Stabilization & Broad Debugging Pass.

This checkpoint remains bug-fix/stabilization-only. It does not authorize PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, notification/bot/social features, redesign, scoring/rating rule changes, or later-phase implementation.

## Bugs Found and Fixed

### Stale Multiplayer Repository Saves

Read-only multiplayer audit found a real zero-move race: the Supabase repository stale-save guard only compared move history. A stale creator-side pre-join projection could therefore cancel a lobby after a rival had already joined, because both projections still had zero moves.

Fix:

- Reject incoming projections that drop an existing `player-two`.
- Reject incoming projections that regress a non-waiting game back to `waiting`.
- Reject older playing projections that would overwrite existing `won`, `lost`, or `expired` terminal state with no newer moves.

### Snapshot and Background Result Settlement

Read-only multiplayer audit also found that direct local multiplayer changes settled competitive results, but repository snapshots and background expiry paths only wrote the multiplayer state into guest progress.

Fix:

- Added a shared `settleMultiplayerStateResults` helper.
- Used it for direct multiplayer changes, repository snapshot loads/subscriptions, save-failure reloads, Daily expiry, and timed Practice expiry.
- Settlement remains idempotent through existing result upsert and rating transaction guards.

### Solo Hard Mode Default

Read-only solo audit found that Settings saved `hardModeDefault`, but fresh OG/GO games did not consume it.

Fix:

- Fresh solo OG and GO Daily/Practice sessions now receive the saved Hard Mode default.
- Stored Daily sessions and resume slots remain authoritative and are not overwritten by the default.
- Calendar-launched Daily games also receive the setting.

### Placeholder Route Navigation

Read-only navigation audit found that App route rail construction used all non-hidden routes instead of the existing primary-navigation helper, which could expose placeholder-only routes.

Fix:

- Visible rail routes now come from `getPrimaryNavigationRoutes(isAdmin)`.

## Focused Verification

Passed:

- `npm test -- --run src/multiplayer/multiplayerRepository.test.ts src/multiplayer/competitiveMultiplayer.test.ts src/app/games/soloHardModeDefaults.test.tsx src/app/routes.test.ts src/calendar/CalendarPanel.test.tsx --maxWorkers=2`
  - 5 files passed.
  - 20 tests passed.
- `npm run lint`
- `npx tsc -p tsconfig.api.json --noEmit`

Resource check after this batch showed no runaway `next-server`, Python, Node, or browser process started by this pass.

## Updated Surfaces

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `memory.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-107.md`
- `src/app/App.tsx`
- `src/app/games/GoGame.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/soloHardModeDefaults.test.tsx`
- `src/calendar/CalendarPanel.tsx`
- `src/multiplayer/competitiveMultiplayer.ts`
- `src/multiplayer/competitiveMultiplayer.test.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerRepository.test.ts`

## Remaining Work

- Continue browser smoke across desktop/tablet/390px.
- Run real two-client Supabase-backed multiplayer E2E for untimed Practice, timed Practice, Practice Hard Mode, and Daily Multiplayer.
- Pair browser E2E with remote Supabase row probes and cleanup.
- Run full `npm run test`, `npm run build`, final `git diff --check`, and Vercel preview deployment.

## Scope Guard

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, notification/bot/social feature, redesign, scoring/rating rule change, or later-phase work was performed.
