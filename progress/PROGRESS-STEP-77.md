# Progress Step 77 - Phase 23 Next Stabilization Follow-up Planning

## Summary

This is a governance and planning-only step for the next targeted Phase 23 stabilization follow-up. It records the user observations from `brrrdle_observations_2026_06_04.md` and turns them into a scoped implementation plan without changing game code, UI components, Supabase queries, migrations, or tests.

## Source Reviewed

- `brrrdle_observations_2026_06_04.md`
- `AGENT-IMPLEMENTATION-PLAN.md` v3.9 before this update
- `memory.md`
- `agents.md`
- `progress/PROGRESS-STEP-76.md`
- `CHANGELOG.md`
- `docs/supabase.md`

## Planned Follow-up Scope

The next implementation pass, if the user explicitly authorizes it, should address:

- Daily Async lobby visibility and creator entry state updating without manual refresh.
- Live multiplayer word-length selection resolving and entering the game automatically without manual refresh.
- Daily Multiplayer one-play-per-day participation limits for each authenticated user, UTC date, transport, and mode bucket: `async:og`, `async:go`, `live:og`, and `live:go`.
- Separate deterministic answer variants for Daily Async and Daily Live while preserving solo daily and practice behavior.
- Header copy corrections for Practice Async Multiplayer and Daily Async Multiplayer.
- Safe rival identity display using profile fields such as display name, avatar, accent color, initials, and fallback labels.
- A clickable `DAILY MULTIPLAYER` countdown that navigates to the current UTC Daily Async Multiplayer surface without visual redesign.
- A planning path toward a future dedicated Multiplayer tab, with implementation still gated.

## Planning Decisions

- Treat the manual-refresh bugs as repository subscription and state-reconciliation problems first.
- A user's own waiting Daily Multiplayer lobby should count as that bucket's daily claim, and the user should re-enter that existing lobby rather than create another.
- The daily participation rule should be enforced in the UX and, if feasible during implementation, by an additive repository/server-side guard to prevent cross-tab or cross-device races.
- Daily Async and Daily Live should receive transport-specific deterministic answer selection metadata so in-progress and archived games remain stable.
- Rival identity must avoid exposing raw auth emails or internal Supabase ids.
- A dedicated Multiplayer tab is a clean long-term direction, but the safest path is additive: keep Calendar and Practice entry points while introducing a future aggregator route only after explicit approval.

## Recommended Work Slices

- **Lane A - Repository and domain refresh**: async/live subscription refresh, Daily participation helper, transport-specific daily-answer metadata, and tests.
- **Lane B - UI polish**: async header text, rival identity display, countdown click behavior, and component tests.
- **Lane C - Supabase/RLS review**: determine whether a minimal additive guard or RPC is needed for daily participation uniqueness.
- **Coordinator lane**: `src/app/App.tsx`, Calendar launch wiring, final integration, documentation, changelog, and verification.

## Files Updated

- `AGENT-IMPLEMENTATION-PLAN.md`
- `agents.md`
- `memory.md`
- `CHANGELOG.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-77.md`

## Verification Plan For Future Execution

The later implementation step must run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Remote or Supabase-shaped two-client verification for Daily Async and Live refresh behavior.
- Browser smoke on desktop and mobile, including countdown navigation and no console errors.

## Verification For This Planning Step

- Documentation/governance only.
- No game code, UI source, Supabase migration, or tests were modified by this step.
- Full game verification was not run because implementation was not authorized.
- `git diff --check` completed clean.
- `PROGRESS.csv` shape validation completed clean: 12 columns, last `phase_id = 77`.

## Gate

Halt for user review. Implementation of the `phase_id = 77` stabilization follow-up, PR creation, merge, release, and optional Stage 4 remain unauthorized until the user explicitly approves them.
