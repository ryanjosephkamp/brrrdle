# Progress Step 141 — Phase 23 Stage 20 Planning

**Date**: 2026-06-10  
**Phase**: 23 — Multiplayer Foundations and Polish  
**Stage**: 20 — Multiplayer Status Text Synchronization + Forfeit Win/Loss Precedence Bug Fixes  
**Status**: Completed — Awaiting User Review Before Stage 20 Execution  
**Scope**: Governance/documentation only

---

## 1. Summary

This planning pass incorporates `PHASE-23-STAGE-20-MULTIPLAYER-STATUS-TEXT-AND-FORFEIT-LOGIC-BUGFIXES-SPEC-2026-06-09.md` into the Phase 23 governance trail.

Stage 20 is planned as an extremely narrow multiplayer bug-fix pass for exactly two issues:

1. **Multiplayer status text synchronization**: the status/message text box above turn history must update for both players across lobby creation, join, turn submission, forfeit, timeout, and normal completion events.
2. **Forfeit win/loss precedence**: a player who forfeits after at least one submitted guess must lose regardless of current point totals. A forfeit before any submitted guesses may remain a non-result/cancellation. Existing timeout behavior already makes the timed-out player lose and must not change.

No implementation work was authorized or performed in this step.

---

## 2. Governance Updates

Updated planning/tracking surfaces:

- `AGENT-IMPLEMENTATION-PLAN.md`
  - Bumped to v3.66.
  - Added §28.69 for Stage 20 planning.
  - Updated the Current Phase Index and current execution gate.
- `CHANGELOG.md`
  - Added an Unreleased Stage 20 planning entry.
- `agents.md`
  - Added Stage 20 coordination notes, high-conflict surfaces, and suggested future lanes.
- `memory.md`
  - Recorded the Stage 20 gate and durable planning decisions.
- `progress/PROGRESS.csv`
  - Appended `phase_id = 141`.
- `progress/PROGRESS-STEP-141.md`
  - Created this planning report.

---

## 3. Scope Boundaries

### In Scope For Future Execution

- The multiplayer status/message text box and its state-derived update logic.
- Forfeit-specific final win/loss precedence.
- Minimal supporting projection, event, or state changes required to keep those two items synchronized across real multiplayer clients.
- Focused tests and real two-client Supabase-backed browser verification for affected multiplayer flows.

### Explicitly Out Of Scope

- Gameplay board, letter tiles, keyboard behavior, tile coloring, Hard Mode validation during play, solved-row hold/transition behavior, GO/OG advancement rules, or core gameplay mechanics.
- Scoring formulas, rating rules, or ELO logic. Only final forfeit winner/loser precedence is in scope.
- Daily Multiplayer rule changes beyond preserving existing strict async behavior.
- New features, UI redesign, full dedicated Multiplayer tab work, spectator expansion, notifications, floating manager, bots, exports, Phase 24 work, broad refactoring, PR creation, merge, release, or production deployment.

If future execution discovers that either bug requires broad architecture, scoring/rating, game-board, keyboard, or out-of-scope mode changes, the agent must stop and report rather than broaden scope.

---

## 4. Invariants To Protect

Future Stage 20 execution must preserve:

- All Stage 12 through Stage 19 wins.
- Daily Multiplayer as strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-lobby-control, answer-separated, and claim-safe.
- `playerSessions` as canonical per-viewer state.
- Shared projections as display/compatibility plumbing only.
- Existing timeout behavior where the timed-out player loses regardless of points.
- Existing scoring formulas and rating/ELO behavior.
- Solo and GO fixes from prior stages, including solved-row holds, Daily GO keyboard projection, Practice Multiplayer GO projection fixes, Solo Practice GO Customize and Hard Mode behavior, authenticated Practice seeds, and Stage 19 Multiplayer GO propagation recovery.

---

## 5. Future Execution Approach

If the user later authorizes Stage 20 execution:

1. Reproduce both bugs before source-code fixes.
2. Make one small targeted change at a time.
3. Run focused verification immediately after each logical change.
4. Use real two-client Supabase-backed browser E2E plus remote Supabase probes and cleanup for multiplayer claims.
5. Cover OG and GO, Practice and Daily where applicable, including join, turn submission, forfeit, timeout non-regression, and normal completion.
6. Keep high-conflict surfaces single-writer or explicitly sequenced.

Likely future high-conflict surfaces:

- `src/multiplayer/MultiplayerGameSurface.tsx` or equivalent status-text rendering surface.
- `src/multiplayer/multiplayer.ts`.
- Multiplayer result/settlement and forfeit helpers.
- Related projection/event helpers.
- Focused multiplayer status/forfeit tests.
- Governance files and progress reports.

---

## 6. Future Verification Expectations

Future execution must finish with:

- Focused changed-area tests.
- Wider multiplayer/GO regressions.
- `npm run lint`.
- `npm run test`.
- `npm run build`.
- `npx tsc -p tsconfig.api.json --noEmit`.
- `git diff --check`.
- Desktop, tablet-like, and 390px browser smoke.
- Real two-client Supabase-backed browser E2E for affected OG/GO and Practice/Daily multiplayer flows.
- Remote Supabase probes and cleanup of temporary rows/users/claims where applicable.
- Resource/process checks confirming no stage-owned runaway processes.
- Optional Vercel preview if useful for review.

---

## 7. Gate

This was a governance/documentation-only step.

No source code, tests, UI components, Supabase migrations, configuration changes, browser verification, build/test gates, implementation branch, PR, merge, release, production deployment, Phase 24 work, or Stage 20 execution was performed.

Stage 20 implementation remains gated until the user explicitly authorizes a separate execution prompt.
