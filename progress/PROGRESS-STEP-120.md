# Progress Step 120 - Phase 23 Stage 14 First Implementation Checkpoint

**Date**: 2026-06-08  
**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: 14 - Post-Stage-13 Polish, Bug Fixes, and Multiplayer Tab Foundations  
**Progress CSV row**: `phase_id = 120`  
**Status**: Completed - Final Verification Pending

## Authorization

The user explicitly authorized Stage 14 execution from `PHASE-23-STAGE-14-POST-STAGE-13-POLISH-AND-MULTIPLAYER-EXPANSION-FOUNDATIONS-SPEC-2026-06-07.md`.

This checkpoint stays inside the approved polish/foundations scope. PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator feature expansion, notifications, floating manager, bots/social features, export/GIF work, scoring/rating changes, broad refactor, redesign, and out-of-scope feature work remain gated.

## Work Completed

### Minimal Multiplayer Tab Foundations

- Added hidden `multiplayer` route metadata in `src/app/routes.ts`.
- Added `MultiplayerFoundationPanel` as an inert shell for future dedicated Multiplayer tab work.
- Added a `RoutePanel` branch for the hidden route, but did not expose the route in primary navigation or Home cards.
- Added a Lunar route eyebrow label for the hidden route in case future/persisted navigation activates it.

Current active entry points remain unchanged:

- Daily Multiplayer still opens from Calendar.
- Practice Multiplayer still opens from Practice.
- No full dedicated Multiplayer tab was implemented.

### Spectator-Adjacent Hardening

- Audited current spectator artifacts with parallel read-only explorer lanes.
- Confirmed active Stage 14 runtime no longer mounts Live spectator UI after Stage 8 unification.
- Hardened `MultiplayerPanel` so authenticated nonparticipants cannot mount the gameplay surface for another users' playing match.
- Added repository regression coverage confirming the active Supabase adapter writes only through `async_multiplayer_games`, not legacy `live_*` or `live_match_spectators` tables.
- Clarified `docs/supabase.md` that legacy Live spectator schema is compatibility-only in the active Stage 14 app and that future spectator UI/permission changes need separate specification.

## Focused Verification

Passed:

- `npm run test -- src/app/routes.test.ts src/multiplayer/MultiplayerFoundationPanel.test.tsx`
- `npm run test -- src/calendar/CalendarPanel.test.tsx src/multiplayer/MultiplayerPanel.test.tsx`
- `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts`
- `npm run test -- src/app/routes.test.ts src/multiplayer/MultiplayerFoundationPanel.test.tsx src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts src/calendar/CalendarPanel.test.tsx`

Combined focused pass: 5 test files, 27 tests passed.

## Preserved Invariants

- Daily Multiplayer remains strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- Practice Multiplayer remains the only multiplayer surface with chess-clock time limits and Hard Mode lobby settings.
- Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, row-write reduction, stale-save protections, timed Practice behavior, and scoring/result settlement were not intentionally changed.
- Stage 13 Practice solo one-shot resume behavior, submitted-row animation stability, post-game results visibility, and Multiplayer GO solved-row hold/coordinated advancement were not intentionally changed.
- Calendar and Practice multiplayer entry points remain active and unreplaced.

## Pending Verification

Still required before final Stage 14 handoff:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Desktop/tablet/390px browser smoke with no new console errors or horizontal overflow
- Real two-client Supabase-backed E2E for multiplayer-affected changes where relevant
- Remote Supabase probes/cleanup where relevant
- Resource/memory/process snapshot after verification
- Vercel preview/share URL

## Scope Guard

No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed.
