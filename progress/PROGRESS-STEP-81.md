# Progress Step 81 - Phase 23 Stage 5 Planning

**Phase / step**: Phase 23 Stage 5 - Multiplayer UX fixes and polish planning
**Date**: 2026-06-05
**Status**: Completed; awaiting user review before Stage 5 implementation
**Authority**: User explicitly authorized a planning/governance-only pass from `PHASE-23-STAGE-5-MULTIPLAYER-UX-FIXES-AND-POLISH-SPEC-2026-06-05.md`
**Gates preserved**: No implementation, source-code edits, UI/component work, tests, Supabase migrations, build configuration changes, PR, merge, release, dedicated Multiplayer tab, deferred feature work, or later-phase work.

## Scope Reviewed

This planning pass reviewed the current Phase 23 state and the dedicated Stage 5 spec. Stage 4 is complete under `phase_id = 80`; Stage 5 is now documented as the next proposed targeted stabilization pass but is not authorized for execution.

The Stage 5 spec focuses on these required bug fixes:

- Email + Password sign-in flow cleanup: remove the duplicate `Sign in` action and order actions as `Sign in`, `Create account`, then `Forgot password?`.
- Daily Multiplayer limits: support one claim per UTC day in each of four buckets: `async:og`, `async:go`, `live:og`, and `live:go`.
- Daily Live join affordance: add a clear non-host `Join live lobby` pulse/flash cue.
- Daily Live join reliability: ensure joining a lobby enters the game for host and rival without manual refresh.
- Daily Live GO phase correctness: avoid any Practice-style word-length selection flash because Daily is fixed at five letters.
- Practice Live entry reliability: allow host/rival to enter after joining for both OG and GO.
- Practice Live word-length timing: start the selection countdown only after a rival joins.
- Practice Live selection UI: show the actual word-length selection surface when the match reaches that phase.

## Planning Updates Made

- `AGENT-IMPLEMENTATION-PLAN.md`
  - Bumped plan version from v3.13 to v3.14.
  - Added latest amendment text for Stage 5 planning.
  - Updated the Current Phase Index and upcoming roadmap.
  - Updated §28 status/stage structure.
  - Added §28.17, documenting Stage 5 scope, deferred items, recommended implementation order, work slices, risks, verification strategy, and the halt gate.

- `CHANGELOG.md`
  - Added an Unreleased entry for Phase 23 Stage 5 planning under `phase_id = 81`.

- `agents.md`
  - Updated the current phase gate.
  - Added Stage 5 planning lane notes, future work-slice guidance, and high-conflict surface coordination rules.

- `memory.md`
  - Updated the current snapshot, plan version, Phase 23 state, progress ledger, and next-workflow guidance.
  - Recorded durable Stage 5 planning decisions and deferred scope.

- `progress/PROGRESS.csv`
  - Appended `phase_id = 81`.

- `progress/PROGRESS-STEP-81.md`
  - Created this governance/planning-only progress report.

## Recommended Future Execution Order

If the user later authorizes Stage 5 execution:

1. Fix the sign-in modal action duplication/order first.
2. Audit and correct Daily Multiplayer four-bucket claim behavior.
3. Fix Daily Live join reliability before adding pulse/flash polish.
4. Remove the Daily Live GO word-length-selection flash.
5. Fix Practice Live post-join entry, selection timer timing, and selection UI visibility.
6. Add/update focused tests and run full verification.

## Coordination Notes

Potential future execution should keep these high-conflict surfaces sequenced or coordinator-owned:

- `src/app/App.tsx`
- `src/calendar/CalendarPanel.tsx`
- `src/account/AuthModal.tsx`
- `src/multiplayer/liveMultiplayer.ts`
- `src/multiplayer/liveRepository.ts`
- `src/multiplayer/LiveMultiplayerPanel.tsx`
- `src/multiplayer/dailyMultiplayer.ts`
- Supabase migrations, if any become necessary
- `CHANGELOG.md`
- `progress/PROGRESS.csv`
- `agents.md`
- `memory.md`

## Verification

Because this was a documentation-only planning pass, no game source, tests, migrations, UI components, or build configuration were modified.

Completed checks:

- `git diff --check`
- `PROGRESS.csv` column-shape parse
- Source-code modification audit for this step: only planning/tracking markdown and CSV files were edited.

Not run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- Browser smoke
- Remote Supabase verification

These were intentionally skipped because implementation was not authorized and no source/runtime behavior was changed in this step.

## Gate

Halt for user review. Do not begin Stage 5 implementation until the user explicitly authorizes an execution prompt.

PR creation, merge, release, dedicated Multiplayer tab implementation, notification system, history/theme tab work, bot work, broader design exploration, and later-phase work remain gated.
