# Progress Step 75 - Phase 23 Stage 3 Stabilization

## Summary

Implemented targeted follow-up fixes after user review of Phase 23 Stage 3. This step corrects online multiplayer architecture and two mobile/UI defects without beginning optional Stage 4, creating a PR, or merging.

## User-Reported Issues Addressed

- Async and Live Multiplayer appeared local/simulated, with one browser able to control both sides.
- Calendar daily indicators (`S-OG`, `S-GO`, `M-OG`, `M-GO`, `L-OG`, `L-GO`) were cramped or clipped on mobile.
- Settings tab tooltips were clipped behind layout containers.

## Implementation

### True Online Async Multiplayer

- Added `src/multiplayer/asyncRepository.ts`.
- Added localStorage and Supabase-backed async repository adapters.
- Added durable `async_multiplayer_games` schema in `supabase/migrations/20260604050824_phase23_online_multiplayer_fixes.sql`.
- Added explicit async `waiting` status.
- Async games now require a distinct signed-in second player to join before turns begin.
- The async UI only enables the current viewer's own turn and never renders controls for both players.
- Waiting async games no longer reveal answer/definition content.
- Local repository fallback seeds from legacy guest-progress async state when no dedicated async repository key exists.

### True Online Live Multiplayer

- Live lobbies now preserve `hostUserId`.
- A second signed-in user joins a waiting live lobby and becomes `player-two`.
- The Supabase live repository now saves only rows owned by or participated in by the current user.
- Live participant rows now use the current user's actual `player_id`.
- Live repository subscriptions refresh through Supabase Realtime `postgres_changes` on live lobbies, matches, and participants.
- Live UI no longer renders two local guess inputs or dual-side word-length controls.

### Supabase / RLS

- Added `async_multiplayer_games` with RLS, indexes, and Realtime publication hook.
- Updated live-lobby update policy so an authenticated second player can claim a waiting lobby through the intended join path.
- Preserved conservative rating policies: browser clients still cannot directly write rating profiles, match results, player results, or rating transactions.

### Calendar Mobile Rendering

- Calendar day cells now use compact mobile-visible labels (`SO`, `SG`, `MO`, `MG`, `LO`, `LG`) while preserving full accessible labels.
- Reduced mobile chip spacing and increased mobile cell height so all six indicators remain visible.

### Settings Tooltip Layering

- Shared `Tooltip` now renders its bubble through a `document.body` portal.
- Tooltip bubble uses a high stacking layer and viewport-aware positioning.
- Settings label rows wrap on mobile and tooltip triggers do not shrink.

## Documents Updated

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `docs/supabase.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-75.md`

## Verification

Verification is run after implementation and before halt:

- `npx tsc -p tsconfig.app.json --noEmit` - passed.
- Focused multiplayer tests - passed, including async and live cross-client repository scenarios.
- `npm run lint` - passed.
- `npm run test` - passed (`441/441`).
- `npm run build` - passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` - passed.
- `git diff --check` - passed.
- Browser smoke:
  - Mobile Calendar at 390px showed 24 daily indicator chips with zero clipped chips and no horizontal overflow.
  - Settings tooltip rendered through a `document.body` portal at `z-index: 9999`, fully inside the 390px viewport.
  - Practice page rendered both async and live multiplayer online gates with no enabled local guess inputs for an unsigned/local session.
  - Browser console reported zero errors.

## Gate

Halt for user review after full verification. Do not create a PR, merge, release, or begin optional Stage 4 without explicit user approval.
