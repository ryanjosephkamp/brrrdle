# Progress Step 89 - Stage 6 Core Live Stability Fixes

**Phase / step**: Phase 23 - Stage 6 core implementation checkpoint
**Date**: 2026-06-05
**Status**: Completed - Stage 6 final verification pending
**Authority**: User explicitly authorized full Stage 6 implementation from `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md`.
**Gates preserved**: No PR, merge, release, Stage 7 broad bug bash, dedicated Multiplayer tab, spectator expansion, deferred feature work, redesign, or unrelated feature work.

## Scope Completed In This Checkpoint

- Added focused failing coverage for creator-cancelled Daily Async and Daily Live claim release.
- Added a Supabase live repository regression for stale concurrent player saves so one player cannot erase the other player's board/history.
- Released Daily participation in the client/domain only for creator-cancelled, unjoined Daily lobbies/games.
- Added `supabase/migrations/20260605223500_phase23_stage6_daily_claim_release.sql` to apply the same narrow release policy server-side without granting browser clients direct claim deletion authority.
- Updated `docs/supabase.md` to document the Stage 6 Daily claim-release policy.
- Added Supabase live projection reconciliation before match saves so stale saves preserve the other seat's newer progress, initialized sessions, word-length choices, and non-regressing phase state.
- Added targeted live refresh broadcasts as wakeup signals while keeping durable Postgres rows as the source of truth.
- Stabilized the Practice Live word-length panel key so realtime refreshes do not remount/flicker the selection UI.
- Added browser-local route/practice/Calendar surface restoration so refreshes return to the active route and Daily/Async/Live surface instead of the landing/dashboard.

## Verification Run

- `npm run test -- src/multiplayer/asyncMultiplayer.test.ts src/multiplayer/liveMultiplayer.test.ts src/multiplayer/liveRepository.test.ts` - passed, 35/35 tests.
- `npm run test -- src/calendar/CalendarPanel.test.tsx` - passed, 5/5 tests.
- `npm run test -- src/multiplayer/LiveMultiplayerPanel.test.tsx src/multiplayer/WordLengthSelectionPanel.test.tsx` - passed, 7/7 tests.
- `npx tsc -p tsconfig.api.json --noEmit` - clean.

## Verification Still Pending

- Full `npm run lint`.
- Full `npm run test`.
- Full `npm run build`.
- Final `npx tsc -p tsconfig.api.json --noEmit`.
- `git diff --check`.
- Meaningful two-client authenticated browser verification against Supabase.
- Remote Supabase probes for Daily claim release, Live Practice, Live Daily, word-length selection visibility, board/history updates, and refresh restoration.
- Desktop and 390px mobile smoke testing with no console errors and no horizontal overflow.
- Vercel preview deployment.

## Notes

- The stale-save fix is intentionally implemented at the Supabase repository seam so browser clients can continue using the existing live reducer/domain API while the persistence layer protects against cross-client projection overwrites.
- The Daily claim release remains narrow: only a creator-cancelled, unjoined Daily lobby/game releases the claim. Joined, terminal, forfeited, expired, matched, or spectator-related states remain claimed.
- Stage 6 implementation continues toward final verification. PR creation, merge, release, Stage 7 execution, spectator expansion, dedicated Multiplayer tab work, deferred features, and unrelated work remain gated.
