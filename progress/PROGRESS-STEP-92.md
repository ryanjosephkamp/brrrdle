# Progress Step 92 - Phase 23 Stage 7 Kickoff and Test Matrix

**Phase / Stage**: Phase 23 Stage 7 - Whole-Game Autonomous Bug Bash and Stabilization
**phase_id**: 92
**Status**: In progress
**Date**: 2026-06-05 / 2026-06-06 UTC
**Branch**: `codex/phase-23-stage-7`

## Authorization

The user explicitly authorized Stage 7 execution after the Stage 6 safety backup was squash-merged to GitHub `main` via PR #16 at commit `49e7f400c1ba8f6be3e048795d990b8db5ad6933`.

This is a bug-fix and stabilization pass only. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion beyond bug fixes/non-regression, redesign, major new features, and deferred feature work remain gated.

## Known Priority Bugs

1. **Live lobby creator auto-entry**: creators are not always automatically entering the lobby/game when a second player joins.
2. **Practice Live word-length selection timing**: Practice Live word-length selection must begin only after both players are connected/entered, and both clients must automatically see the selection surface without refresh.
3. **Live phase instability**: lobby creation/joining, word-length selection timing/sync, board/history realtime updates, UI flashing, and route restoration need a post-Stage-6 regression sweep.

## Stage 7 Test Matrix

| Lane | Surfaces | Automated checks | Browser / remote checks | Special attention |
| --- | --- | --- | --- | --- |
| Solo gameplay | Daily OG/GO, Practice OG/GO, Hard Mode, tile coloring, keyboard, loss/reveal, definitions, resume | `src/game/**` tests, game session tests, focused regressions for discovered issues | Desktop/tablet/mobile playthrough smoke for Daily and Practice | Duplicate-letter coloring, reveal/definition gating, resume integrity |
| Calendar/Daily | Calendar hub, daily archives, countdowns, indicators, DailyVariant boundaries | Calendar and daily clock/cycle tests | Calendar route smoke at desktop/tablet/390px; daily archive and countdown checks | Daily 5-letter invariant, local-vs-UTC boundaries, mobile indicator density |
| Async Multiplayer | Practice Async, Daily Async, lobbies, claims, cancellation, turns/history, rival identity, forfeit, refresh | Async domain/repository/panel tests | Two-client Supabase-backed Practice/Daily Async create/discover/join/play/refresh/forfeit | Four daily buckets, signed-in ownership, no dual-side control |
| Live Multiplayer | Practice Live, Daily Live, lobbies, word-length selection, countdown/gameplay, board/history sync, cancellation/forfeit, refresh | Live domain/repository/panel/selection tests | Two-client Supabase-backed Practice/Daily Live create/discover/join/selection/play/refresh/cancel/forfeit | Creator auto-entry, selection countdown timing, realtime convergence |
| Auth/sync | Sign-in/up, password reset, magic/recovery links, sign-out, guest/cloud merge, settings/profile sync | Auth, storage, guest transfer, Supabase client lifecycle tests | Browser auth smoke and remote Supabase probes where relevant | No duplicate GoTrue clients, no secret leakage in docs/logs |
| Stats/economy/history | Stats dashboard, rating summaries, coins/XP, past daily unlocks, sharing/history separation | Stats/storage/economy-adjacent tests as available | Browser smoke of stats/history/share surfaces | Solo/multiplayer separation and coin unlock safety |
| Words/definitions/admin | Word Explorer, filtering/pagination, definition modals/fallbacks, admin gating | Existing data/definition/admin tests as available; add regressions for found bugs | Browser smoke for Words, definitions modal, admin gating/protected refresh | Preserve dictionaries; do not remove words/features |
| Responsive/accessibility/performance | Landing, Practice, Calendar, Words, Stats, Settings, auth dialogs, multiplayer panels | Lint/build/typecheck plus focused component tests | Desktop, tablet-like, and 390px smoke; console health; no horizontal overflow | Tooltip/dialog layering, reduced motion, touch ergonomics |

## Initial Work Plan

1. Dispatch read-only audit lanes for solo/Daily, multiplayer, and auth/responsive surfaces.
2. Reproduce the known Live Multiplayer bugs using focused automated tests and two-client browser checks.
3. Fix root causes with scoped tests.
4. Run broad browser and Supabase verification against the matrix.
5. Update final progress/changelog/memory/agents surfaces.
6. Deploy a Vercel preview and halt for user review.

## Verification Status

Kickoff only so far:

- Latest `main` pulled and confirmed up to date.
- Local `HEAD` and `origin/main` confirmed at `49e7f400c1ba8f6be3e048795d990b8db5ad6933`.
- Working tree confirmed clean before branch creation.
- Created `codex/phase-23-stage-7`.

Final verification remains pending.

## Gate

Continue Stage 7 implementation and verification. Do not create a PR, merge, release, implement the dedicated Multiplayer tab, expand spectators beyond bug fixes/non-regression, redesign, or begin deferred feature work without explicit user approval.
