# Progress Step 98 - Phase 23 Stage 9 Planning

**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: 9 - Timer Bugs, Practice Hard Mode, and Multiplayer Scoring  
**Status**: Completed - Awaiting user review before Stage 9 implementation  
**Started**: 2026-06-06T17:51:38Z  
**Completed**: 2026-06-06T17:51:38Z  

## Authorization

The user explicitly authorized a planning and governance pass only for `PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md`.

No implementation was authorized. This pass did not edit source code, UI components, tests, Supabase migrations, API files, build configuration, create an implementation branch, create a PR, merge, release, implement the dedicated Multiplayer tab, expand spectators, redesign the app, or begin Stage 9 execution.

## Source Documents Reviewed

- `CONSTITUTION.md` v3.4
- `agents.md`
- `memory.md`
- `AGENT-IMPLEMENTATION-PLAN.md` v3.24 / Phase 23 §28.26
- `PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md`
- `progress/PROGRESS-STEP-96.md`
- `progress/PROGRESS-STEP-97.md`
- `CHANGELOG.md`
- Read-only current unified Multiplayer source map under `src/multiplayer/`, `src/game/`, `src/app/`, and `src/calendar/`

## Planning Completed

- Bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.25.
- Added §28.27 for Stage 9 planning and recorded the Stage 9 spec as the dedicated source of truth.
- Updated the Current Phase Index to record Stage 8 as complete and Stage 9 planning as documented under `phase_id = 98`.
- Added a Stage 9 Unreleased changelog entry.
- Updated `agents.md` with Stage 9 coordination notes, high-conflict surfaces, and suggested future execution lanes.
- Updated `memory.md` with the new durable Stage 9 gate and implementation cautions.
- Appended this progress row to `progress/PROGRESS.csv`.

## Planned Stage 9 Scope

Stage 9 execution, if later authorized, should cover:

1. **Timed Practice Multiplayer bug fix**
   - Reproduce and fix disappearing rival guesses after timed turns.
   - Correct clock handoff so only the active player's clock runs.
   - Prevent the opponent's clock from incorrectly expiring.
   - Preserve untimed Practice Multiplayer behavior.

2. **Practice Multiplayer Hard Mode**
   - Add a Practice-only creator-selected Hard Mode lobby option.
   - Show the Hard Mode setting to rivals before they join.
   - Lock the setting after join.
   - Reuse canonical solo Hard Mode validation.

3. **Multiplayer scoring**
   - Define fair, per-player point calculation for OG and GO.
   - Support winner/draw projection when players solve, fail to solve, time out, or forfeit.
   - Keep scoring suitable as future Elo/rating evidence without implementing new rating-system scope in this planning pass.

## Risks and Considerations

- Timer and board synchronization is high risk because stale repository snapshots can erase a rival's move or overwrite clock fields.
- Hard Mode must match solo validation exactly, including duplicate-letter constraints and revealed-letter requirements.
- Daily Multiplayer must remain strictly asynchronous/no-clock, five letters, UTC-day based, and separate between OG and GO.
- Scoring must not subtract points based on the rival's performance; it should remain explainable and deterministic.
- New fields must normalize safely when older Stage 8 game projections omit them.
- High-conflict surfaces should be single-writer or explicitly sequenced during execution.

## Recommended Future Work Slices

- **Timer bug lane**: `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, and focused domain/repository tests.
- **Hard Mode lane**: Practice lobby state, canonical validation wiring, and focused multiplayer Hard Mode tests.
- **Scoring lane**: `src/multiplayer/scoring.ts` and deterministic score/winner/draw fixture tests.
- **UI lane**: `src/multiplayer/MultiplayerPanel.tsx`, `src/multiplayer/MultiplayerGameSurface.tsx`, and component tests after domain contracts stabilize.
- **Coordinator lane**: `src/app/App.tsx`, repository integration, progress/changelog/memory updates, real two-client Supabase verification, responsive smoke, and final handoff.

## Verification Plan For Later Execution

When Stage 9 implementation is explicitly authorized, the final gate should include:

- Focused unit tests for timed clock application, board persistence, timeouts, untimed no-regression, Hard Mode validation, scoring, winner/draw projection, and projection normalization.
- Repository/Supabase probes for persisted timed turns, clock fields, Hard Mode fields, and terminal scoring summaries.
- Real two-client browser E2E for timed Practice Multiplayer, untimed Practice Multiplayer, Practice Hard Mode, and Daily Multiplayer no-clock non-regression.
- Desktop, tablet-like, and 390px mobile smoke with no console errors or horizontal overflow.
- Full gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Vercel preview deployment if implementation is later authorized.

## Verification For This Planning Pass

No source/test/build verification was run because implementation was not authorized and no source, test, migration, API, or build-config files were modified.

Documentation checks performed:

- Reviewed the Stage 9 spec and current governance surfaces.
- Verified the next progress id is `98`.
- Kept edits to governance, changelog, progress, and coordination/memory files only.

## Required Next Step

Halt for user review. Stage 9 implementation remains gated until the user explicitly authorizes execution in a later prompt.
