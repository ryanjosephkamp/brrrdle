# Changelog

All notable changes to `brrrdle` will be documented in this file.

## Unreleased

### Phase 23 Stage 15 — GO Transition Polish and Practice Seed Fixes

#### 23 Stage 15 final verification and handoff (`phase_id = 125`)
- **Stage complete**: completed the narrow two-bug Stage 15 pass for user review.
- **Real browser/Supabase verification**: real two-client Supabase-backed browser E2E verified Practice Multiplayer GO lobby creation, join, five answer submissions through the multiplayer on-screen keyboard, prior GO rows remaining visible during solved-row hold, final definitions transition, and remote row state (`moves=5`, `status=won`, two `playerSessions`).
- **Practice seed verification**: authenticated two-account browser checks confirmed Practice OG and Practice GO sequences differ by account, UI-triggered OG/GO Practice counters persist, and Daily OG/GO remain deterministic for the same UTC day.
- **Full verification**: focused changed-area tests pass (7 files, 40 tests); `npm run lint`, `npm run test` (478 passing), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, and `progress/PROGRESS.csv` parsing pass.
- **Responsive/resource/preview**: desktop/tablet/390px smoke passed with no console errors or horizontal overflow; temporary Supabase users/rows were cleaned up; resource checks showed no Stage 15 runaway process; Vercel preview deployed and protected share access was verified without committing the bypass token.
- **Scope guard**: no PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactoring, redesign, or out-of-scope work was performed.

#### 23 Stage 15 focused fixes (`phase_id = 124`)
- **GO transition fix**: preserved canonical/prefilled GO rows while overlaying shared durable move projection, so prior completed GO puzzles stay visible during Multiplayer GO solved-row holds.
- **Practice seed fix**: added account-derived Practice seed helpers and persistent per-mode counters so authenticated Practice OG/GO sequences become account-specific while guest fallback keeps the existing local counter path.
- **Daily determinism**: kept Daily OG/GO setup outside the account-seed path and added focused coverage that repeated Daily selection for the same date remains identical.
- **Focused verification**: reproduced the GO prior-row disappearance with a failing component regression before the display fix; changed-area tests pass (7 files, 40 tests) and the account suite passes (13 files, 128 tests).
- **Pending final gate**: real Supabase-backed browser E2E, authenticated two-account seed verification, responsive smoke, full automated gate, resource check, and preview remain pending.

#### 23 Stage 15 execution kickoff (`phase_id = 123`)
- **Execution opened**: recorded explicit authorization for Stage 15 execution from `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`.
- **Protected state**: confirmed the active dirty `codex/phase-23-stage-10` worktree is the source of truth and must not be reset, rebased, pulled over, switched away from, or discarded.
- **Baseline resources**: captured process and memory snapshots before source edits, dev-server startup, or browser E2E; no local Vite app server was listening, one unrelated Python listener was present on `127.0.0.1:8765`, and an existing Playwright-style Chrome process was observed before Stage 15 testing.
- **Execution checklist**: documented reproduce-first sequencing for the GO prior-puzzle visibility regression and authenticated Practice seed predictability bug, with small-change-then-verify discipline and Daily determinism checks.
- **Scope guard**: no PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactoring, redesign, or out-of-scope work is authorized.

#### 23 Stage 15 planning (`phase_id = 122`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.47 and added §28.50 from `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`.
- **Planned scope**: documented a narrow two-bug pass for GO solved-row hold visibility preserving prior completed puzzles and authenticated Practice OG/GO per-account seed uniqueness.
- **Invariants**: reaffirmed that Daily OG/GO remain globally deterministic; Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe; Stage 12, Stage 13, and Stage 14 wins must be preserved.
- **Execution discipline**: recorded the requirement to reproduce both bugs before source fixes, use small-change-then-verify sequencing, and run real two-client Supabase-backed browser E2E for Multiplayer GO changes.
- **Progress tracking**: appended `phase_id = 122` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-122.md`.
- **Gate**: documentation/planning only. No source code, UI components, tests, Supabase migrations, configuration changes, implementation branch, PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, new features, scoring/rating changes, broad refactoring, redesign, or Stage 15 execution was performed.

### Phase 23 Stage 14 — Post-Stage-13 Polish and Multiplayer Tab Foundations

#### 23 Stage 14 final verification and handoff (`phase_id = 121`)
- **Stage complete**: completed Stage 14 for user review with hidden/inert Multiplayer foundations, nonparticipant gameplay hardening, and legacy spectator-schema documentation.
- **Full verification**: `npm run lint`, `npm run test` (472 passing), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` pass.
- **Browser and Supabase verification**: desktop/tablet/390px smoke passed with no console errors or horizontal overflow; real Supabase-backed multi-context browser E2E verified Practice Multiplayer create/join/turn propagation, the nonparticipant gameplay guard, and Daily no-Practice-controls non-regression; temporary Stage 14 users/row were cleaned up.
- **Preview/resource**: Vercel preview deployed; protected share access was verified and is provided in the final handoff without committing the bypass token to repository docs. Final resource checks showed no Stage 14 runaway process after cleanup.
- **Scope guard**: no PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, redesign, or out-of-scope work was performed.

#### 23 Stage 14 first implementation checkpoint (`phase_id = 120`)
- **Multiplayer foundations**: added a hidden future `multiplayer` route and inert `MultiplayerFoundationPanel` shell without exposing a primary nav tab or replacing Calendar/Practice multiplayer entry points.
- **Spectator-adjacent hardening**: prevented authenticated nonparticipants from mounting the gameplay surface for another users' active match, and added repository coverage that the unified Supabase adapter writes only through `async_multiplayer_games`.
- **Supabase docs**: clarified that legacy Live spectator schema remains compatibility-only in the active Stage 14 app and that future spectator UI/permission work needs separate authorization.
- **Focused verification**: changed-area tests pass for route metadata, Calendar multiplayer entry points, the foundation shell, Multiplayer panel behavior, and repository table usage (5 focused files, 27 tests).
- **Scope guard**: full dedicated Multiplayer tab implementation, spectator expansion, PR creation, merge, release, scoring/rating changes, redesign, and out-of-scope work remain gated.

#### 23 Stage 14 execution kickoff (`phase_id = 119`)
- **Execution opened**: recorded explicit authorization for Stage 14 execution from `PHASE-23-STAGE-14-POST-STAGE-13-POLISH-AND-MULTIPLAYER-EXPANSION-FOUNDATIONS-SPEC-2026-06-07.md`.
- **Protected state**: confirmed the active dirty `codex/phase-23-stage-10` worktree is the source of truth and must not be reset, rebased, pulled over, switched away from, or discarded.
- **Baseline resources**: captured process and memory snapshots before source edits, dev-server startup, or browser E2E; no local app dev server was visible, but compressed memory is high and one unrelated Python listener is present on `127.0.0.1:8765`.
- **Execution checklist**: documented the bounded Stage 14 order for scoped polish audit, minimal Multiplayer tab foundations, spectator hardening, focused verification after each logical change, final gate, and preview.
- **Scope guard**: no PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social features, export/GIF work, scoring/rating changes, broad refactoring, redesign, or out-of-scope work is authorized.

#### 23 Stage 14 planning (`phase_id = 118`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.43 and added §28.46 from `PHASE-23-STAGE-14-POST-STAGE-13-POLISH-AND-MULTIPLAYER-EXPANSION-FOUNDATIONS-SPEC-2026-06-07.md`.
- **Planned scope**: documented a targeted polish/foundations pass for approved post-Stage-13 bug fixes, minimal non-breaking Multiplayer tab scaffolding, and low-risk spectator foundation hardening.
- **Invariants**: reaffirmed that Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe; all Stage 12 and Stage 13 wins must be preserved.
- **Execution discipline**: recorded the required small-change-then-verify workflow, including real two-client Supabase-backed browser E2E for multiplayer-affected changes and resource-cautious browser testing.
- **Progress tracking**: appended `phase_id = 118` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-118.md`.
- **Gate**: documentation/planning only. No source code, UI components, tests, Supabase migrations, configuration changes, implementation branch, PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, new features, scoring/rating changes, broad refactoring, redesign, or Stage 14 execution was performed.

### Phase 23 Stage 13 — Practice Solo UX Bugs + Multiplayer GO Result Propagation Fix

#### 23 Stage 13 Multiplayer GO propagation and final verification (`phase_id = 117`)
- **GO solve propagation**: when either player solves a GO puzzle, both canonical `playerSessions` entries now advance together when they are still on the solved puzzle; final GO solves complete both sessions together.
- **Solved-row hold**: Multiplayer GO now briefly renders the solved all-green row before advancing to the next puzzle, and terminal GO games briefly keep the game surface visible before final definitions.
- **Regression coverage**: added focused domain and component coverage for first-puzzle GO advancement, final-puzzle completion, rival solved-row rendering, and terminal GO result hold.
- **Verification**: `npm run lint`, `npm run test` (470 passing), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` pass; desktop/tablet/390px smoke passed with no console errors or horizontal overflow.
- **Real-browser note**: temporary-account browser attempts reached real sign-in, but host-created Practice GO lobbies did not persist to Supabase in this harness; this limitation is recorded in `progress/PROGRESS-STEP-117.md` instead of overclaiming a clean create/join/submit browser save path.

#### 23 Stage 13 Practice solo fixes (`phase_id = 116`)
- **Practice resume stability**: Practice OG/GO now treat incoming Practice resume slots as one-shot restore sources, so live resume captures from the active session no longer remount the current game on every key press or after completion.
- **Submitted-row animation fix**: verified Practice OG and Practice GO submitted rows no longer replay reveal animations when later keyboard input changes the current row.
- **Post-game result fix**: verified Practice OG results stay visible after solving and Practice GO keeps the won result/share/definition state after completing the full chain.
- **Verification**: reproduced the Practice OG row-animation and completion-reset bugs before the fix; post-fix browser checks passed for Practice OG/GO; focused `soloHardModeDefaults` tests pass.

#### 23 Stage 13 execution kickoff (`phase_id = 115`)
- **Execution opened**: recorded explicit authorization for Stage 13 implementation from `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md`.
- **Protected state**: confirmed the active dirty `codex/phase-23-stage-10` worktree is the source of truth and must not be reset, rebased, pulled over, switched away from, or discarded.
- **Baseline resources**: captured process and memory snapshots before source edits, dev-server startup, or browser E2E; no local app dev server or Stage 7-style app runaway was visible.
- **Execution checklist**: documented the small-change-then-verify order for Practice solo post-game results, Practice solo submitted-row animations, and Multiplayer GO solved-puzzle propagation.
- **Scope guard**: no PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactoring, redesign, or out-of-scope work is authorized.

#### 23 Stage 13 planning (`phase_id = 114`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.39 and added §28.42 from `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md`.
- **Planned bug-fix scope**: documented a targeted three-bug pass for Practice solo submitted rows re-animating on key input, Practice solo missing post-game results because a new game starts immediately, and Multiplayer GO solved-puzzle result/advance propagation for both players.
- **Execution discipline**: recorded the required small-change-then-verify workflow, including focused verification after each logical fix and real two-client Supabase-backed browser E2E for multiplayer-affected flows.
- **Invariants**: reaffirmed that Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe; Daily Solo behavior must remain untouched; Stage 12 Hard Mode enforcement, keyboard responsiveness, and sound fixes must be preserved.
- **Progress tracking**: appended `phase_id = 114` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-114.md`.
- **Gate**: documentation/planning only. No source code, UI components, tests, Supabase migrations, implementation branch, PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactoring, or Stage 13 execution was performed.

### Phase 23 Stage 12 — Multiplayer Hard Mode Enforcement + Performance Fixes

#### 23 Stage 12 final verification and handoff (`phase_id = 113`)
- **Stage complete**: completed Stage 12 targeted bug fixes and final verification for user review.
- **Hard Mode enforcement**: Practice Multiplayer Hard Mode now rejects alternating-turn violations against shared submitted moves while preserving canonical per-player `playerSessions`.
- **Responsiveness and sound**: multiplayer key input now updates via functional draft state, rival attempt counts follow the shared board, multiplayer sound calls fire for key/invalid/flip/correct/result events, and suspended AudioContexts are resumed on user-triggered playback.
- **Repository latency**: Supabase multiplayer saves skip unchanged participant projections to reduce redundant writes and realtime churn.
- **Real multiplayer verification**: two-client Supabase-backed browser checks passed for Practice Hard Mode, untimed Practice, timed Practice, and Daily Multiplayer non-regression; remote probes confirmed durable rows, moves, per-player sessions, Hard Mode/time-limit fields, Daily claim rows, and cleanup.
- **Automated verification**: `npm run lint`, `npm run test -- --maxWorkers=2` (466 passing), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` pass.
- **Responsive/resource/preview**: desktop, tablet-like, and 390px mobile smoke passed with no console/page errors or horizontal overflow; final resource checks showed no Stage 7-style runaway app process; Vercel preview deployed and share URL verified.
- **Scope guard**: no PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, redesign, broad refactor, or out-of-scope work was performed.

#### 23 Stage 12 first fix batch (`phase_id = 112`)
- **Hard Mode enforcement**: reproduced the Practice Multiplayer Hard Mode bug with real two-client Supabase-backed E2E, then fixed alternating-turn Hard Mode validation so shared submitted moves constrain both players without copying moves into the rival's canonical `playerSessions`.
- **Regression coverage**: added focused tests for shared-board Hard Mode enforcement across alternating turns.
- **Responsiveness and sound**: improved multiplayer draft keyboard updates, added multiplayer sound calls, resumed suspended AudioContexts on user-triggered sounds, and aligned rival attempt counts with the shared displayed board.
- **Repository latency**: reduced redundant Supabase writes/realtime events by skipping unchanged participant row projections on follow-up saves.
- **Verification so far**: focused multiplayer domain, repository, surface, and sound tests pass (43/43); broader Stage 12 E2E/full gate/preview remains pending.

#### 23 Stage 12 execution kickoff (`phase_id = 111`)
- **Execution opened**: recorded explicit authorization for Stage 12 implementation from `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md`.
- **Protected state**: confirmed the active dirty `codex/phase-23-stage-10` worktree is the source of truth and must not be reset, rebased, pulled over, or discarded.
- **Baseline resources**: captured process and memory snapshots before source edits, dev-server startup, or browser E2E; no local app dev server or Stage 7-style runaway app process was visible, but compressed memory remains notable.
- **Execution checklist**: documented the reproduce-first plan for Practice Multiplayer Hard Mode enforcement, turn/lobby latency, on-screen keyboard responsiveness, and sound playback.
- **Scope guard**: no PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactoring, or out-of-scope work is authorized.

#### 23 Stage 12 planning (`phase_id = 110`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.35 and added §28.38 from `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md`.
- **Planned bug-fix scope**: documented a targeted Stage 12 pass for Practice Multiplayer Hard Mode enforcement, multiplayer turn propagation latency, lobby creation/join latency, on-screen keyboard responsiveness, and sound effects not playing.
- **Invariants**: reaffirmed that Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- **Verification expectations**: recorded mandatory real two-client Supabase-backed browser E2E, focused regressions, full automated gate, responsive/resource smoke, remote Supabase probes, and cleanup.
- **Coordination surfaces**: updated `agents.md` and `memory.md` with Stage 12 high-conflict surfaces, suggested work lanes, resource caution, and execution gates.
- **Progress tracking**: appended `phase_id = 110` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-110.md`.
- **Gate**: documentation/planning only. No source code, UI components, tests, Supabase migrations, implementation branch, PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactoring, or Stage 12 execution was performed.

### Phase 23 Final Stabilization & Broad Debugging Pass

#### 23 Final stabilization final verification and handoff (`phase_id = 109`)
- **Stage complete**: completed the final broad debugging and stabilization pass for Phase 23 user review.
- **Bugs fixed**: hardened multiplayer stale-save protection, settled terminal multiplayer results from repository/background snapshots, wired saved solo Hard Mode defaults into fresh sessions, filtered placeholder routes out of primary navigation, and stopped non-terminal timed Practice clock writes from churning Supabase Realtime.
- **Real multiplayer verification**: two-client Supabase-backed browser checks passed for untimed Practice, timed Practice with 30-second clocks, Practice Hard Mode, and Daily Multiplayer; remote probes confirmed durable moves, per-player sessions, time-limit fields, Hard Mode fields, Daily claim rows, and cleanup.
- **Automated verification**: `npm run lint`, `npm run test -- --maxWorkers=2` (463 passing), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` pass.
- **Responsive/resource verification**: desktop, tablet-like, and 390px mobile smoke passed with no console/page errors and no horizontal overflow; two authenticated browser contexts remained stable without a Stage 7-style runaway process.
- **Preview**: deployed a Vercel preview and generated a share URL for the protected deployment.
- **Scope guard**: no PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating changes, or out-of-scope feature work was performed.

#### 23 Final stabilization timed Practice clock-churn fix (`phase_id = 108`)
- **Timed Practice clocks**: stopped persisting non-terminal chess-clock ticks every second; live countdown remains local/display-only until a submitted turn checkpoints elapsed time or a real timeout is saved.
- **Realtime stability**: reduced Supabase row churn that could race against move submissions and intermittently delay rival board projection in timed Practice games.
- **Real multiplayer verification**: two-client Supabase-backed browser checks passed for untimed Practice, timed Practice, Practice Hard Mode, and Daily Multiplayer; temp users/rows were cleaned up.
- **Daily invariant check**: Daily Multiplayer stayed five-letter, asynchronous, no-clock, no-Hard-Mode, claim-backed, and refresh-restorable.

#### 23 Final stabilization execution kickoff (`phase_id = 106`)
- **Execution opened**: recorded explicit authorization for the final broad debugging and stabilization pass before Phase 23 closure.
- **Protected state**: confirmed the active dirty `codex/phase-23-stage-10` worktree is the source of truth and that backup branch `backup/phase-23-stage-10-final-2026-06-06` / Draft PR #18 remain restore-only.
- **Test matrix**: documented final-pass coverage across solo Daily/Practice, Calendar/Daily, unified Practice Multiplayer, Daily Multiplayer, auth/sync, stats/economy/history, Words/definitions/admin, responsive/accessibility, and performance.
- **Resource baseline**: captured a lightweight process/memory snapshot before dev-server/browser testing; no Stage 7-style runaway `next-server` or Python process was visible, but system memory compression is high and browser E2E must be resource-conscious.
- **Gate**: no PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating changes, or later-phase work is authorized.

#### 23 Final stabilization first bug-fix batch (`phase_id = 107`)
- **Multiplayer stale-save safety**: hardened Supabase multiplayer updates so stale zero-move creator projections cannot drop a rival join, regress non-waiting games back to waiting, or overwrite terminal results with older playing state.
- **Multiplayer result settlement**: added shared settlement for terminal multiplayer snapshots/background expiry paths, so results and ratings settle when terminal state arrives via repository refresh as well as direct local submission.
- **Solo Hard Mode defaults**: connected the saved `hardModeDefault` setting to fresh OG/GO Daily and Practice session creation while preserving stored Daily sessions and resume slots.
- **Navigation cleanup**: aligned the visible route rail with the primary-navigation helper so placeholder-only routes do not appear in normal navigation.
- **Focused verification**: focused repository, competitive settlement, solo Hard Mode default, route, and Calendar tests pass; `npm run lint` and `npx tsc -p tsconfig.api.json --noEmit` are clean.

#### 23 Final stabilization planning (`phase_id = 105`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.31 and added §28.33 for the final broad debugging and stabilization stage before Phase 23 closure.
- **Planned scope**: documented a bug-fix/stabilization-only sweep across unified Multiplayer, Daily Multiplayer, solo Daily/Practice, Calendar, auth/sync, stats/economy/history, Words/definitions/admin, responsive behavior, accessibility, and performance.
- **Multiplayer verification**: recorded that execution must include real two-client Supabase-backed browser E2E for untimed Practice, timed Practice, Practice Hard Mode, and Daily Multiplayer, paired with remote Supabase probes and cleanup.
- **Invariants**: reaffirmed that Daily Multiplayer remains strictly asynchronous, no-clock, no-Hard-Mode-control, five-letter, UTC-day keyed, answer-separated, and claim-safe.
- **Coordination surfaces**: updated `agents.md` and `memory.md` with final-pass lanes, high-conflict surfaces, backup awareness, and execution gates.
- **Progress tracking**: appended `phase_id = 105` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-105.md`.
- **Gate**: documentation/planning only. No source code, UI components, tests, Supabase migrations, implementation branch, PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating changes, or final debugging execution was performed.

### Phase 23 Post-Stage-10 Safety Backup

#### 23 Post-Stage-10 backup (`phase_id = 104`)
- **Backup branch**: created `backup/phase-23-stage-10-final-2026-06-06` as a durable GitHub snapshot of the verified Stage 10 local state.
- **Draft PR**: opened `https://github.com/ryanjosephkamp/brrrdle/pull/18` targeting `main` and marked it as a safety snapshot that should not be merged without explicit later authorization.
- **Preview reference**: recorded the latest verified Vercel share URL in the draft PR body.
- **Scope guard**: no game code, tests, UI behavior, Supabase migrations, force-push, branch deletion, merge to `main`, release, dedicated Multiplayer tab work, spectator expansion, redesign, or later-phase implementation was performed in this backup tracking step.

### Phase 23 Stage 10 — Multiplayer Debugging and Bug Fixes

#### 23 Stage 10 planning (`phase_id = 101`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.27 and added §28.29 from `PHASE-23-STAGE-10-MULTIPLAYER-DEBUGGING-AND-BUGFIXES-SPEC-2026-06-06.md`.
- **Planned debugging scope**: documented a targeted unified Multiplayer stabilization pass for the critical bug where turn history updates across clients but the rival board and keyboard do not reflect submitted guesses.
- **Invariants**: recorded that Daily Multiplayer remains strictly asynchronous, no-clock, no-Hard-Mode-lobby-control, five-letter, UTC-day keyed, and claim-safe.
- **Coordination surfaces**: updated `agents.md` and `memory.md` with Stage 10 reproduce-first workflow, per-player session/shared projection boundaries, and real two-client Supabase verification requirements.
- **Progress tracking**: appended `phase_id = 101` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-101.md`.
- **Gate**: documentation/planning only. No source code, UI components, tests, Supabase migrations, implementation branch, PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or Stage 10 execution was performed.

#### 23 Stage 10 implementation checkpoint (`phase_id = 102`)
- **Reproduced first**: reproduced the reported cross-client Practice Multiplayer bug with two isolated authenticated browser contexts against Supabase before source changes.
- **Board/keyboard sync**: `MultiplayerGameSurface` now projects shared `game.moves` onto the visible board and keyboard for both players while preserving canonical per-player `playerSessions` for validation and mutation.
- **Timed Practice clocks**: fixed double-counted chess-clock ticks by checkpointing `turnStartedAt` whenever a non-terminal remaining-time decrement is persisted.
- **Timed Practice input stability**: stopped clock-only `updatedAt` changes from resetting a typed multiplayer guess before submission.
- **Focused verification**: focused multiplayer surface/domain/repository/panel/scoring tests pass, and real two-client Supabase E2E passes for untimed two-turn refresh, timed Practice, and Practice Hard Mode.
- **Gate**: final lint/test/build/typecheck/diff-check, responsive smoke, and preview deployment remain pending before the Stage 10 final handoff. No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating overhaul, or out-of-scope feature work was performed.

#### 23 Stage 10 final verification and handoff (`phase_id = 103`)
- **Stage complete**: completed the approved Stage 10 multiplayer debugging pass for user review.
- **Automated verification**: `npm run lint`, `npm run test` (459 passing), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` pass.
- **Real multiplayer verification**: temporary authenticated users verified untimed Practice two-turn refresh, timed Practice with a 30-second chess clock, and Practice Hard Mode against Supabase; temporary users and rows were cleaned up.
- **Responsive smoke**: desktop, tablet-like, and 390px mobile smoke passed for landing, Calendar, Practice, and Settings with zero console errors and no horizontal overflow.
- **Daily non-regression**: Calendar/Daily smoke confirmed Daily Multiplayer does not expose Practice-only clock or Hard Mode controls.
- **Preview**: deployed a Vercel preview and generated a share URL for the protected deployment.
- **Scope guard**: no PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating overhaul, or later-phase work was performed.

### Phase 23 Stage 9 — Timer Bugs + Practice Hard Mode + Multiplayer Scoring

#### 23 Stage 9 planning (`phase_id = 98`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.25 and added §28.27 from `PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md`.
- **Planned fixes**: scoped the timed Practice Multiplayer timer/board synchronization bug so execution must reproduce and fix disappearing rival guesses, incorrect clock handoff, and wrong-player timeout behavior without regressing untimed Practice games.
- **Planned features**: documented optional Practice Multiplayer Hard Mode as a creator-selected, rival-visible, locked lobby setting and a fair multiplayer scoring/point system for OG and GO games.
- **Coordination surfaces**: updated `agents.md` and `memory.md` with Stage 9 file ownership, sequencing, Daily no-clock invariants, Hard Mode parity, scoring fairness, and real two-client verification notes.
- **Progress tracking**: appended `phase_id = 98` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-98.md`.
- **Gate**: documentation/planning only. No source code, UI components, tests, Supabase migrations, implementation branch, PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or Stage 9 execution was performed.

#### 23 Stage 9 focused implementation (`phase_id = 99`)
- **Timed Practice fix**: multiplayer now stores and restores per-player serialized sessions, preventing submitted rival guesses from leaking into the viewer board or being lost when a stale shared projection refreshes.
- **Clock safety**: timed Practice expiration is scoped to the authenticated viewer's active turn, and repository saves reject stale incoming projections that would drop already-saved moves.
- **Practice Hard Mode**: Practice Multiplayer lobbies now carry a creator-selected Hard Mode setting into both players' canonical sessions and show the setting before the rival joins.
- **Scoring**: added deterministic per-player multiplayer points with explicit OG/GO winner/draw summaries and a modest Hard Mode solve bonus.
- **Focused verification**: focused domain, repository, scoring, surface, and panel regressions pass (36/36); full Stage 9 verification remains pending.

#### 23 Stage 9 final verification and handoff (`phase_id = 100`)
- **Stage complete**: completed the approved Stage 9 timer/Hard Mode/scoring pass without PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or deferred feature work.
- **Timer and board stability**: timed Practice Multiplayer now preserves each player's own board through turn saves, repository refreshes, and browser reloads; only the authenticated active player's clock can persist a timeout from the app interval.
- **Supabase save hardening**: duplicate create races no longer surface `409` console/network errors, and stale saves remain guarded against move loss.
- **GO scoring correctness**: GO winner projection now uses total points across the full session, and move history records the submitting player's current puzzle index.
- **Verification**: `npm run lint`, `npm run test` (458 passing), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` pass.
- **Real multiplayer verification**: temporary authenticated users verified timed Hard Mode Practice, untimed Practice, and Daily Multiplayer against Supabase with no console errors or network failures; temporary users, game rows, and Daily claim rows were cleaned up.
- **Responsive smoke**: desktop, tablet-like, and 390px mobile smoke passed for Calendar, Practice, Words, Stats, and Settings with no page errors or horizontal overflow.

### Phase 23 Stage 8 — Multiplayer Unification + Time-Limited Practice Games

#### 23 Stage 8 planning (`phase_id = 95`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.23 and added §28.25 from `PHASE-23-STAGE-8-MULTIPLAYER-UNIFICATION-AND-TIME-LIMITS-SPEC-2026-06-05.md`.
- **Planned architecture**: scoped unifying Async and Live into a single Multiplayer model, removing Live-specific terminology/code paths, preserving Daily Multiplayer as strictly asynchronous with UTC-midnight expiry only, and extending Practice Multiplayer with creator-selected chess-clock-style time limits.
- **Performance focus**: documented memory/performance investigation as a blocking Stage 8 requirement, with attention to duplicate Supabase clients, realtime subscriptions, polling intervals, large projections, localStorage restore loops, and multi-client browser stability.
- **Coordination surfaces**: updated `agents.md` and `memory.md` with Stage 8 file ownership, work-slice, Daily invariant, rating/transport, and memory-risk notes.
- **Progress tracking**: appended `phase_id = 95` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-95.md`.
- **Gate**: documentation/planning only. No source code, UI components, tests, Supabase migrations, implementation branch, PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or Stage 8 execution was performed.

#### 23 Stage 8 unified Multiplayer checkpoint (`phase_id = 96`)
- **Unified surface**: removed mounted Live App and Calendar paths, collapsed Calendar to one Daily Multiplayer entry point, and retained legacy saved Calendar transport values as readable compatibility data.
- **Domain and UI**: renamed the durable async foundation to the unified Multiplayer domain/repository/panel naming and added Practice Multiplayer chess-clock primitives plus time-limit controls.
- **Memory remediation direction**: deleted obsolete Live domain/repository/panel/selection modules from the active source tree, removing the heaviest duplicate subscription/timer path identified in the Stage 8 audit.
- **Focused verification**: focused Multiplayer, repository, scoring, panel, and Calendar regressions pass (31/31); full Stage 8 verification remains pending.

#### 23 Stage 8 final verification and handoff (`phase_id = 97`)
- **Unified Multiplayer complete**: the mounted app now exposes one Multiplayer model with Practice Multiplayer and Daily Multiplayer entry points; Live Multiplayer panels, reducers, repositories, word-length selection UI, and Calendar indicators are removed from the active source tree.
- **Practice clocks**: Practice Multiplayer lobbies support no limit, 30 seconds, 1 minute, 2 minutes, 5 minutes, 10 minutes, 30 minutes, and 1 hour per side using chess-clock total-time semantics.
- **Daily preservation**: Daily Multiplayer remains strictly asynchronous/turn-based with no time-limit controls, UTC-midnight expiry, five-letter games, and separate OG/GO answer lists.
- **Supabase compatibility**: the deployed `async_multiplayer_games` table remains the private durable storage seam for unified Multiplayer projections; legacy top-level storage bucket values are written only where needed for historical database constraints.
- **Memory/performance**: obsolete Live subscription/timer paths were removed and two authenticated browser contexts remained bounded in CDP heap/DOM-counter smoke testing.
- **Real multiplayer verification**: temporary authenticated users verified untimed Practice Multiplayer, timed Practice Multiplayer with visible 30-second clocks, and Daily Multiplayer with durable Daily claim rows against the configured Supabase project.
- **Scope guard**: no PR, merge, release, dedicated Multiplayer tab, spectator expansion, notifications, bots, social features, or redesign work was introduced.

### Phase 23 Stage 7 — Whole-Game Bug Bash & Stabilization

#### 23 Stage 7 execution start and test matrix (`phase_id = 92`)
- **Execution authorized**: began the broad Stage 7 bug-fix and stabilization pass from the PR #16 safety-backup state on GitHub `main`.
- **Known priority bugs**: Live lobby creator auto-entry, Practice Live word-length selection timing/visibility, and remaining Live Multiplayer phase instability.
- **Audit matrix**: recorded a Stage 7 test matrix covering solo gameplay, Calendar/Daily, Async Multiplayer, Live Multiplayer, auth/sync, stats/economy/history, Words/definitions/admin, and responsive/accessibility/performance.
- **Scope guard**: no PR, merge, release, dedicated Multiplayer tab, spectator expansion, redesign, or deferred feature work is authorized during Stage 7.

#### 23 Stage 7 core stabilization fixes (`phase_id = 93`)
- **Live entry synchronization**: Live matches now record per-player entry acknowledgement before Practice word-length selection or Daily countdown clocks arm, preventing creators and rivals from being outrun by phase timers before their clients enter the match surface.
- **Creator auto-entry**: the Live panel now promotes a creator's selected lobby to its matched game when a rival joins, improving no-refresh entry into Practice Live and Daily Live.
- **Countdown guardrails**: Live countdowns cannot start gameplay until the countdown exists and has elapsed.
- **DailyVariant isolation**: solo local-midnight and multiplayer UTC daily anti-gaming anchors are isolated in memory so the two variants cannot cross-contaminate during one page session.
- **Small stability fixes**: Hard Mode toggles lock after the first submitted solo guess, Word Explorer live-load responses are keyed by requested length, and dialogs gain mobile-safe max-height scrolling.
- **Focused verification**: focused multiplayer, DailyVariant, and Word Explorer regression tests pass; full Stage 7 verification remains pending.

#### 23 Stage 7 final verification and handoff (`phase_id = 94`)
- **Real multiplayer E2E**: verified Practice Async, Daily Async, Practice Live, and Daily Live with two isolated authenticated browser contexts against the configured Supabase project, including lobby discovery/joining, entry transitions, selection/countdown behavior where applicable, board/history updates, turn ownership, and Daily claim gating.
- **Remote Supabase probes**: confirmed durable async moves, matched live lobbies/matches, live participant rows, both-player live entry acknowledgements, and Daily claim rows; temporary Stage 7 auth users and exact related test rows were cleaned up afterward.
- **Responsive smoke**: desktop Words pagination and definition modal, tablet Settings, and 390px mobile Calendar smoke checks passed with zero console errors and no horizontal overflow.
- **Scope guard**: no PR, merge, release, dedicated Multiplayer tab, spectator expansion, redesign, or deferred feature work was introduced.

### Phase 23 Stage 6 Safety Backup Merge

#### 23 Stage 6 safety backup (`phase_id = 91`)
- **Backup authorization**: user explicitly authorized a one-time safety PR and squash merge of the current local Stage 6 state to GitHub `main` before Stage 7.
- **Purpose**: preserves the verified Stage 6 multiplayer stability work as an easy reversion point before the broader Stage 7 bug bash.
- **Scope guard**: this backup merge does not close Phase 23, start Stage 7, create a release, expand spectators, implement the dedicated Multiplayer tab, or authorize deferred/later-phase work.

### Phase 23 Stage 6 — Live Multiplayer Stability & Daily Claim Fixes

Targeted execution of `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md`. This is a bug-fix-only pass; PR creation, merge, release, Stage 7 broad debugging, the dedicated Multiplayer tab, spectator expansion, deferred features, and redesign work remain gated.

#### 23 Stage 6 execution start (`phase_id = 88`)
- **Execution authorized**: began Stage 6 implementation for the six approved bugs only.
- **Required fixes**: Daily claim release after pre-join creator cancellation, Live board/history realtime synchronization, Practice Live post-selection flashing, creator-side word-length selection visibility, browser refresh restoring the current multiplayer context, and related Live instability.
- **Testing standard**: Stage 6 must finish with focused automated coverage, the full lint/test/build/typecheck/whitespace gate, remote Supabase probes, and meaningful two-client authenticated browser verification.
- **Progress tracking**: appended `phase_id = 88` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-88.md`.

#### 23 Stage 6 core stability fixes (`phase_id = 89`)
- **Daily claim release**: client/domain checks now free a Daily claim only when the creator cancels an unjoined Daily Async game or Daily Live lobby; Supabase gets the same narrow policy through `20260605223500_phase23_stage6_daily_claim_release.sql`.
- **Live projection reconciliation**: Supabase live match saves now merge against the latest persisted projection before writing so stale clients preserve the other player's initialized session, moves, turn history, word-length choices, and phase progress.
- **Realtime wakeups**: successful Supabase live saves send lightweight refresh broadcasts to affected player channels while Postgres rows remain the source of truth.
- **Practice Live stability**: word-length selection panels no longer remount just because `updatedAt` changed during realtime refreshes.
- **Refresh restoration**: app route/practice mode and Calendar daily/async/live surfaces are remembered in browser storage so refreshes restore the active multiplayer context.
- **Focused verification**: focused multiplayer, live panel, word-length selection, Calendar restore, and API typecheck commands pass; full verification and real two-client Supabase browser testing remain pending.

#### 23 Stage 6 final verification (`phase_id = 90`)
- **Stage complete**: completed the bug-fix-only Stage 6 pass for live stability and Daily claim release; no Stage 7, PR, merge, release, spectator expansion, dedicated Multiplayer tab, deferred feature, or redesign work was introduced.
- **Supabase migration**: applied `phase23_stage6_daily_claim_release` to the configured Supabase project and verified with temporary authenticated rows that creator-cancelled, unjoined Daily Live and Daily Async claims are released.
- **Two-client browser E2E**: temporary authenticated users in isolated browser contexts passed Practice Live and Daily Live create/discover/join/play/refresh flows against the configured Supabase project on desktop-style and 390px mobile viewports.
- **Full verification**: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` pass; 390px route smoke passes for landing, Practice, Calendar, and Settings with no console errors or horizontal overflow.
- **Preview**: a Vercel preview was deployed for user review at `https://brrrdle-jcn4qxmk4-ryanjosephkamps-projects.vercel.app/?_vercel_share=qutzJOrx1WDssbsNRGJtzTFAyAg3jRz7`.

### Phase 23 Stage 6 Testing Addendum + Stage 7 Planning

Documentation/governance-only update responding to the user's request to require meaningful real multiplayer testing and to plan a broader autonomous debugging pass. No source code, UI components, tests, Supabase migrations, build configuration, PR creation, merge, release, dedicated Multiplayer tab work, deferred feature work, or implementation was performed.

#### 23 Stage 6 testing addendum + Stage 7 planning (`phase_id = 87`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.17, tightened §28.19 with a required real two-client multiplayer testing subsection, and added §28.20 for a separate Stage 7 whole-game bug bash.
- **Stage 6 testing**: documented that Stage 6 execution must use isolated authenticated browser contexts plus remote Supabase probes to verify Live Practice, Live Daily, Daily claim release, board/history updates, word-length selection visibility, and refresh restoration.
- **Stage 7 split**: recorded that the broader autonomous debugging pass should be a separate stage after Stage 6 so the critical live-multiplayer stability pass remains bug-only and bounded.
- **Coordination surfaces**: updated `agents.md` and `memory.md` with the new Stage 6 testing expectation and Stage 7 broad QA lanes.
- **Progress tracking**: appended `phase_id = 87` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-87.md`.
- **Gate**: halt for user review. Stage 6 execution and Stage 7 execution both remain gated until explicit authorization.

### Phase 23 Stage 6 Planning — Live Multiplayer Stability & Daily Claim Fixes

Documentation/governance-only update for `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md`. No source code, UI components, tests, Supabase migrations, build configuration, PR creation, merge, release, spectator work, dedicated Multiplayer tab work, deferred feature work, or new feature work was performed.

#### 23 Stage 6 planning (`phase_id = 86`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.16 and added §28.19 for Stage 6.
- **Critical bug scope**: documented the six required bug fixes: Daily claim release after pre-join cancellation, Live board/turn-history realtime synchronization, Practice Live post-selection flashing, creator-side word-length selection visibility, browser refresh preserving current multiplayer tab/game, and general Live instability cleanup.
- **Bug-only gate**: recorded that Stage 6 must not add features, spectator work, the dedicated Multiplayer tab, notifications, floating manager, History/Theme tabs, bots, exports/GIFs, or broad redesign/refactor work.
- **Coordination surfaces**: updated `agents.md` and `memory.md` with Stage 6 file ownership, realtime synchronization, phase-transition, route-preservation, and Daily claim-release notes.
- **Progress tracking**: appended `phase_id = 86` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-86.md`.
- **Gate**: halt for user review. Stage 6 implementation, source edits, tests, Supabase migrations, build/config changes, PR creation, merge, release, spectator testing/expansion, and deferred feature work remain gated.

### Phase 23 Stage 5 — Multiplayer UX Fixes & Polish

Targeted implementation of `PHASE-23-STAGE-5-MULTIPLAYER-UX-FIXES-AND-POLISH-SPEC-2026-06-05.md`. This remains inside the approved Stage 5 bug-fix scope and does not create a PR, merge, release, implement the dedicated Multiplayer tab, or start deferred feature work.

#### 23 Stage 5 final verification (`phase_id = 85`)
- **Stage complete**: completed the Stage 5 execution pass covering sign-in action cleanup, Daily Multiplayer four-bucket regressions, Daily Live fixed-length safety, Practice/Live joined-match entry, and the non-host `Join live lobby` pulse affordance.
- **Verification**: `npm run lint`, `npm run test` (473 passing), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` all pass.
- **Remote Supabase probe**: temporary authenticated-user verification passed for async/live four-bucket claims, duplicate guards, live lobby visibility/join, and cross-client live phase updates.
- **Browser smoke**: desktop and 390px mobile smoke passed for landing, Practice multiplayer, Settings/auth action ordering, no horizontal overflow, and no console errors.
- **Gate**: halt for user review. PR creation, merge, release, dedicated Multiplayer tab work, and deferred feature work remain gated.

#### 23 Stage 5 sign-in cleanup (`phase_id = 83`)
- **Email + Password actions**: removed the duplicate password-mode `Sign in` affordance from the clean auth modal and ordered actions as `Sign in`, `Create account`, and `Forgot password?`.
- **Settings fallback**: aligned the visible Settings inline password action row with the same `Sign in` / `Create account` ordering so the older fallback surface does not preserve the awkward duplicate-action pattern.
- **Behavior preserved**: kept existing Supabase sign-in, sign-up, and password-reset handlers intact.
- **Focused verification**: `npm run test -- src/account/AuthModal.test.tsx` passes.

#### 23 Stage 5 multiplayer flow fixes (`phase_id = 84`)
- **Four Daily buckets**: added focused regressions for independent `async:og`, `async:go`, `live:og`, and `live:go` claims while preserving duplicate blocking inside each bucket.
- **Daily Live fixed length**: hardened Daily Live normalization so Daily matches cannot fall back to the Practice word-length selection UI when remote phase metadata is missing or invalid.
- **Practice/Live entry**: the Live panel now prefers the viewer's active joined match, including Practice Live matches, when realtime/repository state updates after a rival joins.
- **Join affordance**: added a reduced-motion-safe pulse/ring to the actionable non-host `Join live lobby` button.
- **Remote verification**: a temporary-user Supabase probe passed for async/live bucket separation, duplicate guards, live lobby visibility/join, and cross-client live phase updates.

### Phase 23 Stage 5 Planning — Multiplayer UX Fixes & Polish

Documentation/governance-only update for `PHASE-23-STAGE-5-MULTIPLAYER-UX-FIXES-AND-POLISH-SPEC-2026-06-05.md`. No source code, UI components, tests, Supabase migrations, build configuration, PR creation, merge, release, dedicated Multiplayer tab work, notification system, history/theme tab work, bot work, or broader design exploration was performed.

#### 23 Stage 5 planning (`phase_id = 81`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.14 and added §28.17 for Stage 5.
- **Planned fixes**: scoped sign-in action ordering cleanup, corrected four-bucket Daily Multiplayer participation behavior, Daily Live join affordance/reliability, Daily Live GO fixed-length phase cleanup, Practice Live entry reliability, and Practice Live word-length selection timing/UI.
- **Deferred scope**: recorded that browser notifications, floating multiplayer manager, timestamps, dedicated Theme/History tabs, turn transparency, exports/GIFs, bot play, lichess-style redesign work, and the dedicated Multiplayer tab remain out of scope unless separately approved.
- **Coordination surfaces**: updated `agents.md` and `memory.md` with Stage 5 file ownership, work-slice, and gate notes for later execution.
- **Progress tracking**: appended `phase_id = 81` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-81.md`.
- **Gate**: halt for user review. Stage 5 implementation, source edits, tests, Supabase migrations, PR creation, merge, release, and deferred feature work remain gated.

### Phase 23 Stage 4 — Daily Multiplayer Fixes & Live Spectator Foundations

Targeted implementation of `PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md`. This remains inside Phase 23 stabilization scope and does not create a PR, merge, release, replace Calendar/Practice multiplayer entry points, or implement the deferred dedicated Multiplayer tab.

#### 23 Stage 4 execution (`phase_id = 80`)
- **Daily/active-limit correctness**: async and live active-game counts are now scoped per authenticated user instead of globally across all visible lobbies.
- **Claim bypass closure**: async/live domain creation rejects duplicate Daily Multiplayer claims, and authenticated save failures reload the authoritative repository snapshot instead of preserving rejected optimistic Daily creates locally.
- **Creator cancellation**: async and live lobby creators can cancel their own unjoined waiting lobbies; rivals cannot cancel them, and joined matches continue to use forfeit/terminal flows.
- **Cancellation policy**: cancelled unjoined lobbies release the creator's active-game slot while preserving the Daily claim for that UTC day and bucket.
- **Live spectators**: added authenticated read-only spectator foundations for Live matches, with spectators stored separately from player participants and blocked from guesses, word-length selection, forfeit, lobby cancellation, and rating/scoring mutation.
- **Supabase schema**: added `supabase/migrations/20260605043000_phase23_stage4_lobby_cancel_spectators.sql` for async `cancelled` status and the additive `live_match_spectators` table/RLS/realtime publication hook.
- **UI/tests/docs**: added creator-only cancel controls, spectator entry/read-only UI, focused async/live domain and panel tests, repository spectator persistence tests, and Supabase setup documentation updates.
- **Gate**: halt for user review. PR creation, merge, release, dedicated Multiplayer tab implementation, and later-phase work remain gated.

### Phase 23 Stage 4 Planning — Daily Multiplayer Fixes & Spectator Foundations

Documentation/governance-only update for the dedicated Stage 4 spec `PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md`. No game code, UI components, Supabase migrations, tests, PR creation, merge, release, or dedicated Multiplayer tab work was performed.

#### 23 Stage 4 planning (`phase_id = 79`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.12 and added §28.15 for Stage 4.
- **Planned fixes**: scoped Daily Async/Daily Live lobby visibility refresh, Daily claim bypass closure, per-player five-lobby limit confirmation, and creator cancellation for unjoined lobbies.
- **Spectator foundations**: documented Live spectator support as authenticated read-only participation with no game-state, forfeit, selection, or rating/scoring mutation authority.
- **Coordination surfaces**: updated `agents.md` and `memory.md` with Stage 4 role boundaries, cancellation/claim-limit coordination notes, spectator separation, and the continued dedicated Multiplayer tab deferral.
- **Progress tracking**: appended `phase_id = 79` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-79.md`.
- **Gate**: halt for user review. Stage 4 implementation, Supabase migrations, tests, PR creation, merge, release, and dedicated Multiplayer tab work remain gated.

### Phase 23 Stage 3 Stabilization Follow-up — Realtime Refresh, Daily Claims & Rival Identity

Targeted implementation of the `phase_id = 77` plan from `brrrdle_observations_2026_06_04.md`. This remains inside Phase 23 stabilization scope and does not create a PR, merge, release, replace Calendar/Practice multiplayer entry points, or begin optional Stage 4.

#### 23 Stage 3 stabilization follow-up execution (`phase_id = 78`)
- **Realtime-derived entry state**: Daily Async and Live panels now derive selected lobbies/matches from the latest repository state so newly visible lobbies, joined games, and existing daily claims can appear without a manual refresh.
- **Live auto-flow**: Practice Live automatically resolves word-length selection after both players choose or the selection clock expires, automatically completes the highlight/countdown transition, and automatically enters the live arena when countdown expires.
- **Daily participation limit**: added per-user/per-UTC-day/per-transport/per-mode claim checks for `async:og`, `async:go`, `live:og`, and `live:go`; waiting lobbies count as the user's daily claim and can be re-entered.
- **Supabase schema**: added `supabase/migrations/20260604223000_phase23_daily_multiplayer_claims.sql` for `multiplayer_daily_claims`, daily-claim triggers, and live lobby `host_profile` persistence.
- **Separate Daily answers**: Daily Async and Daily Live now use deterministic transport-specific answer variants while preserving solo Daily answers, Practice behavior, valid guesses, and the daily 5-letter invariant.
- **Rival identity**: added safe public rival summaries and cards for async/live waiting and active surfaces, using display label/avatar/initials/accent-compatible metadata without exposing private emails or internal ids.
- **Countdown navigation**: the `DAILY MULTIPLAYER` countdown now opens the current UTC Daily Async Multiplayer surface through the Calendar launch model.
- **Tests**: added regression coverage for Daily answer separation, Daily claim rejection, rival profile sanitization/preservation, live host-profile repository persistence, and countdown-to-Daily-Async Calendar launch.
- **Gate**: halt for user review. PR creation, merge, release, dedicated Multiplayer tab implementation, and optional Stage 4 remain gated.

### Phase 23 Stage 3 Stabilization Follow-up Planning — Realtime Refresh, Daily Limits & Multiplayer Navigation

Documentation/governance-only update after the observations recorded in `brrrdle_observations_2026_06_04.md`. No source code, tests, Supabase migrations, PR creation, merge, release, or optional Stage 4 work was performed.

#### 23 Stage 3 next stabilization follow-up planning (`phase_id = 77`)
- **Implementation plan**: bumped `AGENT-IMPLEMENTATION-PLAN.md` to v3.10 and added §28.13 for the next targeted Phase 23 follow-up.
- **Planned fixes**: scoped Daily Async and Live automatic refresh/entry behavior, the Daily Multiplayer one-play-per-day rule, separate Daily Async vs Daily Live answer variants, async header copy corrections, rival profile display, clickable Daily Multiplayer countdown navigation, and the path toward a future Multiplayer tab.
- **Daily participation policy**: documented the intended per-user/per-UTC-day/per-bucket rule for `async:og`, `async:go`, `live:og`, and `live:go`, with a user's own waiting lobby counting as that bucket's daily claim.
- **Architecture notes**: recorded that realtime refresh should be handled through repository subscription/state reconciliation first, daily answer separation should be deterministic and transport-specific, and rival identity must use safe public profile fields.
- **Coordination surfaces**: updated `agents.md` and `memory.md` so future sub-agents treat `phase_id = 77` as planned but not authorized for implementation.
- **Progress tracking**: appended `phase_id = 77` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-77.md`.
- **Gate**: halt for user review. Implementation of §28.13, PR creation, merge, release, and optional Stage 4 remain gated.

### Phase 23 Stage 3 Stabilization Follow-up — Account-backed Multiplayer UX & Password Recovery

Targeted follow-up after real-account testing feedback. This stays within Phase 23 stabilization scope and does not begin optional Stage 4, create a PR, or merge.

#### 23 Stage 3 stabilization follow-up (`phase_id = 76`)
- **Async/live matchmaking hardening**: changed Supabase repository writes away from blind upserts so second-player joins and participant updates work under RLS; added additive grants/RLS follow-up migrations for authenticated matchmaking flows.
- **Remote account-backed verification**: applied the Phase 23 multiplayer migrations to the configured Supabase project and verified async lobby visibility/join/turn sync plus live lobby visibility/join/start/play sync between two distinct authenticated sessions. The provided account passwords were rejected by Supabase Auth, so verification used generated sessions for those same confirmed accounts without changing their passwords.
- **Solo-style multiplayer play surface**: added a shared multiplayer game surface with the full blank grid visible from match start, canonical OG/GO validation, Hard Mode constraints, tile coloring, and the same on-screen keyboard interaction/state updates as solo play.
- **Multiplayer economy controls**: kept consumables, Pay-to-Continue, reveal-answer, and extra-guess purchase affordances out of async/live multiplayer.
- **Forfeit**: added async and live forfeit actions; forfeits settle as losses for the forfeiting player and feed rating projection when the match is otherwise rated/eligible.
- **Password reset**: Supabase password recovery events and reset URLs now open a dedicated password-reset modal instead of treating the link as a normal magic-link login.
- **Supabase client cleanup**: repeated client creation with the same runtime config now reuses one module-level client, avoiding duplicate GoTrue client warnings during React dev StrictMode/reload checks.
- **Mobile Calendar carry-forward**: mobile day cells now visibly render full `S-OG`, `S-GO`, `M-OG`, `M-GO`, `L-OG`, and `L-GO` labels without clipping or page overflow by stacking indicators on narrow screens.
- **Gate**: halt for user review. PR creation, merge, release, and optional Stage 4 remain gated.

### Phase 23 Stage 3 Stabilization — Online Multiplayer Corrections & Mobile Polish

Targeted follow-up after Stage 3 review. This fixes user-reported bugs and architectural gaps without beginning optional Stage 4, creating a PR, or merging.

#### 23 Stage 3 stabilization (`phase_id = 75`)
- **Async multiplayer is now real online turn-based play**: added `asyncRepository.ts` with local/Supabase repository adapters, durable `async_multiplayer_games` persistence, Realtime refresh subscriptions, explicit `waiting` status, second-player join flow, and viewer-seat ownership helpers.
- **Live multiplayer now uses real participant ownership**: live lobbies persist `hostUserId`, second clients join as `player-two`, the Supabase live repository refreshes from Postgres change events, writes participant rows with the correct player seat, and saves only rows owned by or participated in by the current user.
- **No more one-device rival control**: async/live panels no longer render controls for both sides. Signed-in users can only create/join/submit for their own seat, and waiting async games do not reveal answers.
- **Supabase schema**: added `supabase/migrations/20260604050824_phase23_online_multiplayer_fixes.sql` for `async_multiplayer_games`, async Realtime publication hooks, and a live-lobby RLS update that permits the intended second-player join flow without granting direct rating mutations.
- **Calendar mobile fix**: compact mobile chip labels keep `S-OG`, `S-GO`, `M-OG`, `M-GO`, `L-OG`, and `L-GO` indicators visible in narrow calendar cells while preserving full accessible labels.
- **Settings tooltip fix**: tooltips now render through a body portal with a high stacking layer and mobile-safe positioning, avoiding clipping by the Lunar Signal playfield containers.
- **Docs/governance**: updated Supabase docs, implementation plan, coordination/memory files, changelog, and progress tracking.
- **Gate**: halt for user review. PR creation, merge, release, and optional Stage 4 remain gated.

### Phase 23 Stage 3 — ELO / Rating, Advanced Matchmaking, Scoring & Custom Games

Full Stage 3 execution for Phase 23. This adds competitive multiplayer foundations on top of the Stage 1 async and Stage 2 live systems while preserving solo gameplay, solo stats, economy, resume lanes, auth/sync behavior, definitions, countdowns, and Calendar navigation.

#### 23 Stage 3 — Competitive multiplayer (`phase_id = 74`)
- **ELO/rating domain**: added pure rating helpers for `async:og`, `async:go`, `live:og`, and `live:go` buckets, initial 1200 ratings, 10-game provisional handling, K=40 provisional / K=24 established defaults, expected-score math, idempotent rating transactions, and strict ranked eligibility checks.
- **Scoring/performance model**: added async/live performance projections with explainable player summaries, win/loss/draw outcomes, attempts used, GO progress, source match metadata, and conversion into rated-match evidence.
- **Advanced matchmaking**: added pure queue/request helpers with rating snapshots, compatibility filters, no-self-match rules, Practice word-length constraints, Daily UTC eligibility, and wait-time widening for live/async searches.
- **Custom games**: added custom-game lobby helpers with compact invite codes and unranked-by-default behavior so friendly play does not distort ratings.
- **Async/live metadata**: extended async games and live lobbies/matches with optional ranked/custom/matchmaking/rating metadata while keeping existing Stage 1/2 payloads backward-compatible.
- **Competitive state**: added guest progress schema v6 with additive `competitiveMultiplayer` display/cache state for rating profiles, rating transactions, result summaries, and custom lobbies. Solo stats/economy/history/resume remain separate.
- **UI integration**: added match-type controls to async/live multiplayer panels, auth-gated ranked copy, custom code creation, terminal scoring summaries, and dedicated multiplayer rating/result summaries in the Stats route.
- **Supabase schema**: added `supabase/migrations/20260604033000_phase23_competitive_multiplayer.sql` with competitive metadata columns, rating profiles, immutable match/player results, rating transactions, matchmaking queue, custom lobbies, indexes, and RLS. Browser clients do not get direct rating-mutation policies.
- **Docs/governance**: updated Supabase setup docs, implementation plan, coordination files, changelog, and progress tracking.
- **Tests**: added pure rating, matchmaking, scoring, custom-game, and multiplayer stats panel coverage. Full suite now passes at 433 tests.
- **Gate**: halt for explicit user review. PR creation, merge, release, and optional Stage 4 remain gated.

### Phase 23 Stage 3 Planning — ELO / Rating, Advanced Matchmaking, Scoring & Custom Games

Documentation/governance-only update for Phase 23 after Stage 2 completion. **No Stage 3 code, ELO/rating implementation, matchmaking implementation, scoring implementation, custom-game UI, Supabase Stage 3 migration, PR creation, or merge was performed in this step.**

#### 23 Stage 3 planning (`phase_id = 73`)
- **`AGENT-IMPLEMENTATION-PLAN.md`**: bumped Plan Version 3.5 -> 3.6; updated the Current Phase Index to show Stage 2 complete (`phase_id = 72`) and Stage 3 planning documented but not authorized for execution.
- **Expanded §28.6**: added detailed Stage 3 planning for ELO/rating, advanced matchmaking, scoring/performance records, custom-game/ranked separation, multiplayer stats surfaces, additive data-model approach, Supabase/RLS considerations, fairness/anti-abuse policy, risks, and verification strategy.
- **Rating policy direction**: documented separate rating buckets for async/live and OG/GO modes, a 1200 provisional starting rating, a 10-game provisional window, ranked eligibility rules, and the requirement that ratings only update from durable authenticated result evidence.
- **Execution split**: documented recommended parallel lanes for rating math, scoring, matchmaking, Supabase/RLS, UI integration, and coordinator-owned integration of high-conflict files.
- **Stage 4 direction**: expanded optional high-level notes for post-Stage-3 UI polish, mobile ergonomics, accessibility, Calendar density, and responsive verification.
- **Coordination surfaces**: updated `agents.md`, `memory.md`, `docs/planning-index.md`, and `progress/README.md` so future sessions can pick up the Stage 3 plan without accidentally treating implementation as authorized.
- **Progress tracking**: appended `phase_id = 73` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-73.md`.
- **Verification**: documentation-only; `git diff --check` and `PROGRESS.csv` column-shape parse completed after edits.
- **Gate**: halt for explicit user review. Stage 3 implementation, PR creation, merge, and release remain unauthorized until later explicit approval.

### Phase 23 Stage 2 — Live / Real-time Multiplayer Implementation

Full Stage 2 execution for Phase 23. This adds live Practice and Daily Multiplayer foundations on top of the Stage 1 async model while preserving all solo mechanics, async behavior, stats, economy, resume lanes, auth/sync, countdowns, definitions, and Calendar behavior.

#### 23 Stage 2 — Live multiplayer (`phase_id = 72`)
- **Live multiplayer domain**: added `src/multiplayer/liveMultiplayer.ts` with framework-agnostic live lobby/match types, live phases, deterministic first-player selection, Practice Live word-length selection, countdown, simultaneous guess submission, winner resolution, daily UTC expiry, answer extraction, and safe normalization/merge helpers.
- **Practice Live word-length selection**: added a dedicated pre-game `WordLengthSelectionPanel` where both players can choose a 2–35 letter length during the 1-minute window; differing choices resolve to one committed length with a non-skippable highlight/animation state before countdown.
- **Live UI panel**: added `LiveMultiplayerPanel` for Practice and Daily live flows: lobby creation, basic rival matching, phase/status display, countdown entry, simultaneous player guess inputs, move history, finished/expired answer + definitions, aborted messaging, auth-aware copy, and local preview support.
- **Persistence and realtime seam**: added `liveRepository.ts` with in-memory, localStorage, and Supabase-backed repository implementations. Authenticated sessions can use the Supabase table-backed adapter to load/save live projections and broadcast updates; anonymous/unconfigured sessions keep a local fallback for smoke tests and guest play.
- **Supabase schema**: added `supabase/migrations/20260604024500_phase23_live_multiplayer.sql` for `live_lobbies`, `live_matches`, `live_match_participants`, `live_match_events`, server-time RPC, RLS policies, indexes, and realtime publication hooks.
- **Calendar integration**: added Daily Live Multiplayer beside Daily Async in the Calendar hub; Calendar day cells now include `L-OG`/`L-GO` live indicators alongside existing solo and async multiplayer indicators, with past live matches viewable read-only when present.
- **App integration**: Practice now exposes both async and live multiplayer panels; App-level live state persists through the repository seam and expires stale Daily Live matches on the multiplayer UTC day rollover.
- **Documentation/governance**: updated Supabase setup docs, coordination files, implementation plan status, changelog, and progress tracking. Stage 3 ELO/rating/scoring, PR creation, and merge remain explicitly gated.
- **Tests**: added live reducer, repository, word-length selection, live panel, and Calendar integration coverage. Full suite now passes at 417 tests.
- **Verification**: `npm run lint` clean; `npm run test` 417/417; `npm run build` succeeds with the existing large-chunk advisory; `npx tsc -p tsconfig.api.json --noEmit` clean; `git diff --check` clean; Playwright browser smoke passed for desktop Practice Live, desktop Daily Live, reload persistence, UTC messaging, mobile Calendar live indicators, and no horizontal overflow.
- **Gate**: halt for explicit user review. Do not create a PR, merge, or begin Stage 3 until explicitly approved.

### Phase 23 Multi-Agent Workflow Scaffolding — Documentation & Infrastructure Only

Governance/documentation/infrastructure-only update for Phase 23 after Stage 2 planning. **No Stage 2 code, realtime transport, Supabase migration, UI implementation, game logic, stats, economy, or multiplayer rule changes were implemented in this step.**

#### 23 Multi-agent scaffolding (`phase_id = 71`)
- **New `agents.md`**: added the project-wide multi-agent workflow guide with authority hierarchy, startup checklist, work-packet template, file ownership rules, Stage 2 work-slice suggestions, handoff format, integration checklist, and stop conditions.
- **New `memory.md`**: added compact persistent project memory summarizing the current Phase 23 gate, Stage 1 completion, Stage 2 planning status, core invariants, architecture notes, progress ID ledger, and update policy.
- **New `docs/planning-index.md`**: added a low-churn planning index instead of moving active root specs during a dirty Phase 23 working state.
- **New `progress/README.md`**: documented progress tracking conventions, the 12-column CSV shape, monotonic `phase_id` rule, and no-secrets requirements.
- **`CONSTITUTION.md`**: upgraded v3.3 → v3.4 with targeted coordination-file rules that keep `agents.md`, `memory.md`, and planning indexes subordinate to the authority stack and unable to authorize scope or stage progression.
- **`AGENT-IMPLEMENTATION-PLAN.md`**: bumped Plan Version 3.2 → 3.3; updated the Current Phase Index and §28 with the multi-agent scaffolding step.
- **Progress tracking**: appended `phase_id = 71` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-71.md`.
- **Verification**: documentation-only; `git diff --check` and `PROGRESS.csv` column-shape parse completed after edits.
- **Gate**: halt for explicit user review. Stage 2 implementation remains unauthorized.

### Phase 23 Stage 2 Planning — Live / Real-time Multiplayer Governance Update

Documentation/governance-only update for Phase 23 after Stage 1 completion. **No Stage 2 code, realtime transport, Supabase migration, UI implementation, game logic, stats, economy, or multiplayer rule changes were implemented in this step.**

#### 23 Stage 2 planning (`phase_id = 70`)
- **`AGENT-IMPLEMENTATION-PLAN.md`**: bumped Plan Version 3.1 → 3.2; updated the Current Phase Index to show Stage 1 complete (`phase_id = 69`) and Stage 2 planning documented but not authorized for implementation.
- **Expanded §28**: added detailed Stage 2 planning for Live / Real-time Multiplayer, including proposed Supabase Realtime + durable Postgres approach, live match model, repository seam, presence/clock policy, Practice Live word-length selection flow, Daily Live UTC behavior, likely files/modules, risks, and verification plan.
- **Stage 3 / Stage 4 direction**: added high-level planning notes for ELO/rating, matchmaking, custom games, scoring, anti-abuse/fairness, and optional UI/mobile/accessibility polish.
- **Progress tracking**: appended `phase_id = 70` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-70.md`.
- **Verification**: documentation-only; `git diff --check` and `PROGRESS.csv` column-shape parse completed after edits.
- **Gate**: halt for explicit user review. Stage 2 implementation remains unauthorized.

### Phase 23 Stage 1 — Multiplayer Foundations, Bug Fixes & Daily Multiplayer Countdown (PHASE-23-MULTIPLAYER-FOUNDATIONS-AND-POLISH-SPEC-2026-06-03)

Full Stage 1 execution for Phase 23. This adds the local-first async/turn-based multiplayer foundation while preserving all existing solo mechanics and halting before Stage 2 live multiplayer.

#### 23 Stage 1 — Foundations and async multiplayer (`phase_id = 69`)
- **Bug fixes and polish**: dynamic `COMMAND CENTER` title; outside-click dismissal for Dialog-based modals; mobile-safe Settings tooltips; Calendar day chips no longer rely on emoji rendering; OG/GO losses keep answers, sharing, and definitions hidden until the player explicitly reveals instead of continuing.
- **Daily variants**: `DailyVariant` now separates solo/local daily from multiplayer/UTC daily with distinct storage namespaces, date keys, reset math, labels, and countdown context.
- **Async multiplayer foundation**: new `src/multiplayer/` model and panel support Practice and Daily async games, turn submission, move history, persisted guest/cloud progress, daily UTC expiry, view-only answer/definition archives, and the five-active-game cap.
- **Calendar + countdown**: Calendar now exposes solo OG, solo GO, multiplayer OG, and multiplayer GO indicators per day; today can open Daily Multiplayer, while past multiplayer games are view-only. The app also renders a second Daily Multiplayer UTC countdown with its own Settings toggle and unique `daily-multiplayer-reset` sound.
- **Persistence/sync**: guest progress schema is now v5, adding `dailyMultiplayerCountdownEnabled` and `asyncMultiplayer` with migration defaults and cloud merge behavior.
- **Tests**: added async multiplayer model coverage; extended daily clock/cycle/countdown, sound, storage/transfer, calendar, and session reveal tests.
- **Verification**: `npm run lint` clean; `npm run test` 402/402; `npm run build` succeeds with the existing large-chunk advisory; `npx tsc -p tsconfig.api.json --noEmit` clean; `git diff --check` clean; desktop and mobile in-app browser smoke completed.
- **Gate**: halt for explicit user review before Phase 23 Stage 2 or any Phase 23 PR.

### Phase 22 Addendum Follow-up — Landing Tab-Row Layout Fix & Feedback Tab Reorder

Small UI/UX follow-up on the Phase 22 addendum branch in response to user feedback. **No new scope, gameplay, economy, persistence, sync, or daily-cycle behavior changed. Invariants hold: daily puzzles remain exactly 5 letters; practice still supports 2–35.**

- **Landing tab row no longer cut off (`src/index.css`)**: the Lunar Signal Deck landing region (`.brrrdle-lunar-intro`) now fills the viewport via flexbox (`.brrrdle-lunar-interface` is a flex column; the intro is `flex: 1; min-height: 0`) instead of a magic-number `calc(100svh - Nrem)` estimate of the topbar height. Previously, when the topbar was taller than the estimate (notably on mobile, where the account/countdown stack vertically), the intro overflowed and pushed the bottom-anchored horizontal tab dock below the fold, making it unreachable on both mobile and desktop. The redundant per-breakpoint intro height estimates were neutralized accordingly.
- **Slightly larger landing tabs (`src/index.css`)**: the landing dock chips were enlarged modestly — desktop `min-height` 2.5rem → 2.85rem with larger padding/font (and dot 0.55rem → 0.6rem); mobile `min-height` 2rem → 2.3rem with larger padding/font. The in-game (awake) rail is unchanged.
- **Feedback tab repositioned (`src/app/routes.ts`)**: the `feedback` route now sits second-to-last in the navigation order — immediately after `settings` and immediately before `about`. `getPrimaryNavigationRoutes`' membership list and `routes.test.ts` expectations were updated to match.
- **Verification**: `npm run lint` clean; `npm run test` 390/390; `npm run build` succeeds; `git diff --check` clean.

### Phase 22 Addendum — Full Execution: Calendar (Central Daily Hub), Coin-Gated Past Dailies & Top Countdown Positioning (PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03)

Full autonomous implementation of the Phase 22 addendum (§27.10), building on the Phase 22 Prompt 2 `src/daily/` service and `DailyCountdown.tsx`. Introduces the **Calendar** as the first navigation tab and single central hub for all daily play (current + past, OG + GO), coin-gated access to past dailies, and repositions the daily countdown from the fixed bottom corner to the top of the UI. **All Phase 22 Prompt 2 behavior (local-midnight rollover, anti-gaming guard, reset alert + unique sound, Settings toggle, dev Simulate-Time tool) is preserved. Strict invariants hold: daily puzzles remain exactly 5 letters; practice still supports 2–35; no multiplayer/marketplace changes; the only economy addition is the fixed past-daily unlock cost; guest and signed-in sync stay consistent.**

#### 22 Addendum — Calendar implementation (`phase_id = 67`)
- **User decisions applied**: past-daily unlock cost fixed at **60 coins** (same for OG and GO); unlocked past dailies record full stats but **never** patch streak continuity (streaks reflect natural current-day play only); the dedicated "OG Daily"/"GO Daily" tabs are fully removed with legacy deep links redirecting into the Calendar; calendar history starts at a fixed **January 1, 2025** (not rolling).
- **New `src/daily/pastDailies.ts`** (+ test): `PAST_DAILY_UNLOCK_COST = 60`, `CALENDAR_START_DATE_KEY = '2025-01-01'`, `pastDailyKey`/`isDailyUnlocked`/`normalizeUnlockedDailies`/`isPastDailyDateKey` helpers.
- **New `src/calendar/` module**: `calendarModel.ts` (framework-agnostic month-grid builder clamped between Jan 1 2025 and the granted today, per-mode completion derivation from `completedGameIds`, daily streak reader) + `CalendarPanel.tsx` (prominent "Play Today's OG/GO" buttons, month grid with per-day OG/GO completion + lock badges, prev/next month navigation, OG/GO daily streak + coin readouts, a 60-coin unlock confirmation modal, and the inline full OG/GO daily experience with a back-to-Calendar control) + tests.
- **`src/app/routes.ts`**: added the `calendar` route as the first play tab; added a `hidden` flag and marked the legacy `og-daily`/`go-daily` routes hidden (kept for backward-compatible redirects); `getPrimaryNavigationRoutes` is now Calendar-first.
- **`src/app/App.tsx`**: renders `CalendarPanel` for the `calendar` route; `handleNavigate` redirects `og-daily`/`go-daily` deep links into the Calendar with today's daily for the requested mode pre-launched; the countdown tap and daily resume now land in the Calendar; added a `unlockedDailies` update handler; the `DailyCountdown` is now passed into `LunarSignalStage` (top) instead of the bottom overlay.
- **`src/app/LunarSignalStage.tsx`**: accepts an optional `dailyCountdown` node rendered in the top account stack (context-aware, non-intrusive); added a `calendar` eyebrow.
- **`src/index.css`**: `.brrrdle-daily-countdown-region` changed from `position: fixed` bottom-corner to an inline top-stack element.
- **Per-date daily persistence**: `dailyOgStorage.ts` / `dailyGoStorage.ts` gained optional per-date storage keys so each past daily resumes independently while today's daily keeps its existing bare key (backward compatible).
- **Stats**: additive `affectsStreak` flag on `CompletedGameStatsInput`; `updateStatistics` preserves `currentStreak`/`maxStreak` when `affectsStreak === false` (past dailies still record played/won/lost/attempts/per-length).
- **Persistence/sync**: additive `unlockedDailies` field on `GuestProgressState` (`${mode}:${dateKey}`) with migration backfill and a union-merge in guest→cloud transfer; no schema bump (normalized on load and synced via the existing JSON payload). "First guess permanently unlocks" is enforced — the OG/GO daily marks the day unlocked on the first guess.
- **OG/GO games**: accept an optional `pastDailyDateKey` (renders that specific past day as a full daily experience: puzzle, persistence, stats, hard mode, resume, definitions) and an `onMarkDailyUnlocked` callback fired on the first guess.
- **Tests**: new `pastDailies.test.ts`, `calendar/calendarModel.test.ts`, `calendar/CalendarPanel.test.tsx`; extended `statistics.test.ts` (affectsStreak), `dailyOgStorage.test.ts` (per-date namespacing), and `routes.test.ts` (Calendar-first nav + hidden legacy routes).
- **Verification**: `npm run lint` clean; `npm run test` 390/390 (was 370, +20 new); `npm run build` succeeds; `tsc -b` clean; `git diff --check` clean.
- **Gate**: halt for explicit user review before creating the Phase 22 PR.

### Phase 22 Addendum — Calendar (Central Daily Hub) & Countdown Positioning spec incorporated (Governance Step) (PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03)

Planning + governance-only step that binds the newly uploaded Phase 22 addendum (`PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md`) into the implementation plan, building on the Phase 22 Prompt 2 `src/daily/` service and `DailyCountdown.tsx`. **No calendar, navigation, routing, state-management, countdown-repositioning, economy, or other source code was implemented in this step.** The finalized Phase 21 surface foundation and every existing mechanic — including the Phase 22 Prompt 2 daily-cycle work — remain 100% intact.

#### 22 Addendum — Plan §27.10 + progress tracking (`phase_id = 66`)
- **`AGENT-IMPLEMENTATION-PLAN.md`**: bumped Plan Version 2.8 → 2.9 (and Date → 2026-06-03); extended the amendment history to record Phase 22 Prompt 2 completion (`phase_id = 65`) and the new addendum; updated the Current Phase Index Phase 22 row (Prompt 1 + Prompt 2 complete; addendum §27.10 governance step at `phase_id = 66`); appended **§27.10 "Phase 22 Addendum – Calendar (Central Daily Hub) & Countdown Positioning"** referencing `PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md` and recording: the Calendar as the central first-tab hub for all dailies (current + past, OG + GO) replacing the dedicated daily tabs; "Play Today's OG/GO" quick-access buttons; coin-gated past dailies with a confirmation modal and a one-guess-permanently-unlocks rule; past dailies treated as full daily experiences (stats, hard mode, resume, definitions); the fixed past-daily coin cost (recommended **60 coins**, range 50–75, pending user confirmation); the countdown repositioning from bottom to **top** of the UI (context-aware: near daily status on the landing page, near the top-right account pill on game tabs); strict preserved invariants; planned deliverables; the two-prompt workflow (governance `phase_id = 66`; full execution `phase_id = 67+`); and open questions/recommendations.
- **Reviewed (no changes)**: `PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md` (binding spec), `CONSTITUTION.md` v3.3, `PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02.md`, `progress/PROGRESS-STEP-65.md`, and the Prompt 2 `src/daily/` + `DailyCountdown.tsx` surfaces.
- **`progress/PROGRESS.csv`**: appended `phase_id = 66` for this governance-only step.
- **`progress/PROGRESS-STEP-66.md`**: new report documenting this planning/governance step.
- **Verification**: `git diff --check` clean; `progress/PROGRESS.csv` parse check (all rows 12 columns, last row `phase_id = 66`); no source, test, or build-config changes, so the lint/test/build baseline is unchanged from Phase 22 Prompt 2 (370/370).
- **Gate**: halt here for explicit user approval before the addendum full-execution prompt. The strict invariants remain in force (daily = 5 letters; practice 2–35; no multiplayer/marketplace changes; the only economy addition is the new fixed past-daily unlock cost; guest/signed-in sync consistent).

### Phase 22 Prompt 2 — Full Execution: Timezone-Aware Local-Midnight Daily Reset + Countdown + Reset Alert + Dev Simulate-Time Tool (PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02)

Full autonomous implementation of Phase 22 per the bound spec and plan §27. Adds timezone-aware local-midnight daily rollover with a balanced anti-gaming guard, a cross-page clickable theme-ready countdown indicator, a subtle non-modal reset alert with a brand-new unique sound, a global Settings toggle, and a hidden dev-only "Simulate Time" tool — all as additive changes. **Strict invariants preserved: daily puzzles remain exactly 5 letters; practice still supports 2–35; no changes to multiplayer/marketplace/economy; guest and signed-in settings sync stay consistent. No actual multiplayer daily functionality was implemented (only a modular seam).**

#### 22 Prompt 2 — Daily-cycle implementation (`phase_id = 65`)
- **`src/data/daily.ts`**: `getDailyDateKey` now derives the daily `dateKey` from the **local** calendar day (`getFullYear`/`getMonth`/`getDate`) instead of UTC (`toISOString().slice(0, 10)`), so the daily rolls over at the player's local midnight. Answer/seed selection still hashes the dateKey string deterministically (unchanged sequence semantics).
- **New modular `src/daily/` service** (framework-agnostic, multiplayer-ready seam — no multiplayer implemented):
  - `dailyClock.ts` — timezone helpers (`getDeviceTimeZone`, `getNextLocalMidnight`, `getMillisUntilNextLocalMidnight`, `formatCountdown`, MS constants).
  - `antiGaming.ts` — balanced guard comparing wall-clock vs monotonic (`performance.now`) advance; a forward "clock jump" ≥ 12h within one live session is clamped (the previous daily is held until the clock is consistent again); cold loads trust the wall clock; backward moves never regress.
  - `dailyVariant.ts` — `DailyVariant` registry (`'solo'`) providing per-variant storage namespaces for a future multiplayer daily.
  - `simulatedClock.ts` — dev time-offset store (offset applied to **both** wall and monotonic readings so simulated jumps exercise the real rollover path, not the clamp).
  - `dailyCycle.ts` — `resolveDaily` / `getActiveDailyDate` core shared by the hook and the daily game surfaces (so a clamped/granted day actually gates the generated puzzle); keeps an in-memory live anchor so the monotonic baseline survives within a page session.
  - `useDailyCycle.ts` — React hook ticking once a second; fires `onReset` exactly once per genuine rollover.
  - `DailyCountdown.tsx` — fixed, non-intrusive, clickable, theme-ready countdown pill with a subtle reset-alert state and an `aria-live` announcement.
  - `SimulateTimePanel.tsx` — dev-only floating tool (set/jump/reset time, jump to next local midnight, `Shift+Alt+T` toggle) that renders **nothing** unless `import.meta.env.DEV`.
- **`src/app/App.tsx`**: wires `useDailyCycle`; on rollover plays the new sound and briefly glows the countdown; renders `<DailyCountdown>` (when enabled) and `<SimulateTimePanel>` only under `import.meta.env.DEV`.
- **`src/app/games/OgGame.tsx` / `GoGame.tsx`**: daily setup uses `getActiveDailyDate()` instead of `new Date()` so the anti-gaming clamp and dev simulation gate the actual puzzle.
- **`src/sound/soundEngine.ts`**: adds a brand-new unique `daily-reset` sound (ascending four-note bell-like arpeggio, not reused from any existing event).
- **`src/account/storageSchema.ts`**: additive `dailyCountdownEnabled` setting (default `true`); no schema bump — `normalizeGuestSettings` backfills it and `guestTransfer` syncs it to Supabase.
- **`src/account/Settings.tsx`**: global toggle to disable the countdown + reset alerts.
- **`src/index.css`**: theme-ready countdown + reset-glow CSS (with reduced-motion fallback) and dev Simulate-Time tool styling.
- **Tests**: new `dailyClock.test.ts`, `antiGaming.test.ts`, `dailyCycle.test.ts`, `simulatedClock.test.ts`, `DailyCountdown.test.tsx` (time-mocking for rollover/clamp scenarios) + a `daily-reset` case in `soundEngine.test.ts`; rewrote `daily.test.ts` to be timezone-robust (local Date construction).
- **Bug/robustness fix discovered during work**: the persisted guard anchor loses its monotonic baseline across reloads, so an in-memory live anchor is now shared by the countdown hook and the daily game surfaces; without it the wall-vs-monotonic clamp could never fire within a session.
- **Verification**: `npm run lint` clean; `npm run test` 370/370 pass; `npm run build` succeeds; `npx tsc -p tsconfig.api.json --noEmit` clean; `git diff --check` clean; production bundle confirmed free of the dev Simulate-Time tool.
- **Gate**: halt for explicit user approval before creating the Phase 22 PR.



Planning + governance-only step that binds the newly uploaded Phase 22 spec into the implementation plan and makes Phase 22 the active next phase, ahead of full execution. **No daily-rollover, timezone, anti-gaming, countdown, reset-alert, sound, dev-tool, modular-refactor, or bug-fix source code was implemented in this step.** The finalized Phase 21 surface foundation and every existing mechanic remain 100% intact.

#### 22 Prompt 1 — Plan addendum §27 + progress tracking (`phase_id = 64`)
- **`AGENT-IMPLEMENTATION-PLAN.md`**: bumped Plan Version 2.7 → 2.8; extended the amendment history; updated the Current Phase Index to add a **Phase 22 (active next phase) → §27** row and refreshed the upcoming-roadmap note (Phases 23–26); appended §27 "Phase 22 – Advanced Calendar / Midnight Handling + Timezone-Aware Daily Reset" referencing `PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02.md` and recording the goals, balanced anti-gaming policy, "what to do first" exploration steps, in/out-of-scope summary, deliverables, two-prompt workflow (Prompt 1 governance at `phase_id = 64`; Prompt 2 full execution at `phase_id = 65+`), success criteria/verification gate, and exit checklist.
- **Reviewed (no changes)**: `PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02.md` (binding spec), `CONSTITUTION.md` v3.3, and the existing daily system (`src/data/daily.ts` currently derives the daily `dateKey` from UTC via `toISOString().slice(0, 10)` — the primary surface Phase 22 must make timezone-aware).
- **`progress/PROGRESS.csv`**: appended `phase_id = 64` for this governance-only step.
- **`progress/PROGRESS-STEP-64.md`**: new report documenting this planning/governance step.
- **Verification**: `git diff --check` clean; `progress/PROGRESS.csv` parse check (all rows 12 columns, last row `phase_id = 64`); no source, test, or build-config changes, so the lint/test/build baseline is unchanged from the prior phase.
- **Gate**: halt here for explicit user approval before Phase 22 Prompt 2 (full execution). The strict invariants remain in force (daily = 5 letters; practice 2–35; no multiplayer/marketplace/economy changes; guest/signed-in sync consistent).



Execution of the Phase 21 addendum template-proposal step. Authored the proposal documentation set described by the spec (plan §26.8) so a later, separately approved phase (Phase 22+) has Codex-ready blueprints for sophisticated themes. **Planning artifacts only — no theme code, no CSS, no surface/accent/sound modules were changed; `themes/proposals/full_proposals/` and `themes/themes.csv` are untouched; the minimalist default surface and the Lunar Signal Deck layout/tab structure remain intact.**

#### Addendum Prompt 3 — README, 8 template proposals, and populated CSV (`phase_id = 63`)
- **`themes/proposals/README.md`**: rewritten to fully document the folder structure with a table (`template_proposals/`, `full_proposals/`, `theme_proposals.csv`, `themes/themes.csv`), the template-vs-full-proposal distinction, how a template maps onto the existing theming foundation (`src/theme/theme.ts` accent tokens, `src/theme/surface.ts` `data-surface`, `src/sound/soundEngine.ts`), the tile-state invariant (correct=emerald / present=amber / absent=slate preserved), and an index table of all eight templates.
- **8 Markdown templates in `themes/proposals/template_proposals/`** (each with the consistent header: Theme Name, Category/Type, Author, Date, Status, Description, Visual Style, Special Effects & Animations, Sound Theme, Component/CSS Changes Needed, Implementation Notes for Codex, Future Extensibility Notes):
  1. `command-center.md` — upgraded Command Center / Frozen Command Center (tactical HUD), re-expressed as a pure surface+accent theme so it no longer touches layout.
  2. `country-nationality.md` — reusable, placeholder-driven Country / Nationality template (data-only per-country additions).
  3. `holiday-special-event.md` — reusable, placeholder-driven Holiday / Special Event template with an active date window.
  4. `sci-fi-stellar-cartography.md` — Sci-Fi / Deep Space.
  5. `nature-verdant-grove.md` — Nature / Organic.
  6. `retro-arcade-crt.md` — Retro / 8-bit CRT.
  7. `cyberpunk-neon.md` — Cyberpunk / Neon.
  8. `fantasy-arcane-athenaeum.md` — Fantasy / Mystical.
- **`themes/proposals/theme_proposals.csv`**: populated with all eight templates (columns: Template Name, Category/Type, Proposed Date, Status (Template), Markdown File, Description/Notes).
- **Preserved exactly**: `themes/proposals/full_proposals/` (empty/reserved) and `themes/themes.csv` (untouched); all source, tests, and build config; the Phase 21 surface foundation; the Lunar Signal Deck layout/tab structure; and every gameplay/word/daily/practice/difficulty/definition/stats/economy/auth/resume/sharing behavior. About Brrrdle remains a dedicated page.
- **Verification**: `git diff --check` clean; `theme_proposals.csv` parse check (header + 8 rows, all 6 columns); `git status` confirms `themes/themes.csv` and `full_proposals/` unchanged; no source/test/build-config changes, so the lint/test/build baseline is unchanged from Phase 21 Prompt 3 (338/338).
- **Gate**: halt after authoring; do **not** create or merge a PR in this step. The final Phase 21 PR is ready to be created/merged on explicit user instruction.
- **Docs/tracking**: updated `progress/PROGRESS.csv` (`phase_id = 63`) and added `progress/PROGRESS-STEP-63.md`.

### Phase 21 Addendum – Theme Proposal Templates spec uploaded and incorporated (Governance Step) (PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02)

Governance/documentation-only step that incorporates the newly uploaded `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` as a Phase 21 addendum before the final Phase 21 PR is merged. **No theme code, no proposal Markdown files, no CSV population, and no folder creation were performed in this step.** The finalized Phase 21 surface foundation and every existing mechanic remain 100% intact.

#### Addendum Prompt 2 — Spec incorporated into plan, changelog, progress, and proposals README (`phase_id = 62`)
- **`AGENT-IMPLEMENTATION-PLAN.md`**: bumped Plan Version 2.6 → 2.7; extended the amendment history; added a Current Phase Index row for the addendum; appended §26.8 "Phase 21 Addendum – Theme Proposal Templates (Governance Step)" referencing the spec, recording the target `themes/proposals/template_proposals/` + `full_proposals/` + `theme_proposals.csv` + `themes/themes.csv` structure, the planned deliverables, strict rules, and the addendum prompt workflow. (The user-requested "§26.1" addendum is recorded as §26.8 because §26.1–§26.7 were already occupied, and the version advances to v2.7 because v2.6 was already consumed by the Phase 21 Prompt 3 full-execution amendment.)
- **`themes/proposals/README.md`**: populated the previously empty placeholder with a short note acknowledging the new `template_proposals/` (Markdown templates), `full_proposals/` (reserved/empty), `theme_proposals.csv` (proposal index), and `themes/themes.csv` (reserved) structure and its governance status.
- **`progress/PROGRESS.csv`**: appended `phase_id = 62` for this governance-only step.
- **`progress/PROGRESS-STEP-62.md`**: new report documenting this governance step.
- **Verification**: `git diff --check` clean; `PROGRESS.csv` parse check (all rows 12 columns, last row `phase_id = 62`); no source, test, or build-config changes, so the lint/test/build baseline is unchanged from Phase 21 Prompt 3 (338/338).
- **Gate**: halt here for explicit user approval before the template-proposal execution step (authoring 5–10 templates and populating the CSV). About Brrrdle remains a dedicated page.



Full execution of Phase 21. Polishes the finalized Phase 20 "Lunar Signal Deck" layout into a sophisticated, theming-ready foundation **with the layout and tab structure preserved**, adopts a very minimalist default background, and captures the original heavier Lunar Signal Deck visual style as **one individual, opt-in surface theme** to be enabled in Phase 22. Every gameplay mechanic, accent theme, and supporting feature is preserved 100% intact, and the Phase 22 dramatic theming system itself is intentionally **not** implemented.

#### 21 Prompt 3 — Minimalist default surface + Lunar Signal Deck as opt-in theme (`phase_id = 61`)
- **New surface-theme foundation (`src/theme/surface.ts` + tests)**: a pure module with `SURFACE_THEMES = ['minimal', 'lunar-signal']`, `DEFAULT_SURFACE_THEME = 'minimal'`, `isSurfaceTheme`/`normalizeSurfaceTheme`/`getSurfaceThemeMeta`, and `applySurfaceTheme` (reflects the active surface onto `<html>` via a `data-surface` attribute; the default removes it). Mirrors the existing accent `theme.ts` conventions and is fully unit-tested (9 new tests).
- **Minimalist default background**: `.brrrdle-lunar-shell` now renders a plain near-black surface with a faint, static, edge-fading grid. The original radial signal-glow background and screen-blended scan grid are gated behind `.brrrdle-lunar-shell[data-surface='lunar-signal']`.
- **Lunar Signal Deck captured as one opt-in surface**: the original treatment (signal glow, animated star/moon canvas, scan grid, custom cursor) is preserved verbatim as the `lunar-signal` surface. `LunarSignalStage` renders the animated canvas and custom cursor only under that surface and skips background pointer-tracking work otherwise; `App` applies the default `minimal` surface on mount. No future-phase surface-switching UI was added.
- **CSS-architecture cleanup**: removed dead Phase-20 layout-exploration styles — the entire `.brrrdle-command-shell` block and all `.brrrdle-prism-*` rules except the still-used `.brrrdle-prism-mode-card::before` accent overlay — plus the now-unused `--prism-*` custom properties, and deleted the unused `Layout` component (the only consumer of the `command-shell` CSS) and its barrel export.
- **Preserved exactly**: the Lunar Signal Deck layout and tab structure; daily/practice `og` and `go`; difficulty tiers; configurable Go count; resume; stats; definitions; economy; auth/sync; sharing; PWA; sound; and the four accent themes (`icy`/`classic`/`neon`/`country-flag`). About Brrrdle remains a dedicated page.
- **Verification**: `npm run lint` clean; `npx tsc -p tsconfig.app.json --noEmit` clean; `npm run test` **338/338**; `npm run build` clean (existing chunk-size advisory only); `npx tsc -p tsconfig.api.json --noEmit` clean; `git diff --check` clean; `PROGRESS.csv` parse check (all rows 12 columns, last row `phase_id = 61`); browser smoke clean (minimal default + `lunar-signal` restore, no console errors).
- **Docs/tracking**: updated `AGENT-IMPLEMENTATION-PLAN.md` (v2.5 → v2.6, §26 status + phase index), `progress/PROGRESS.csv` (`phase_id = 61`), and `progress/PROGRESS-STEP-60.md`.



Governance/documentation-only step that records the user's refined Phase 21 instructions before any implementation begins. **No code, UI polish, layout change, theming-foundation code, component refactor, CSS architecture change, or future-phase feature was implemented in this step.** The finalized Phase 20 "Lunar Signal Deck" layout and every existing mechanic remain 100% intact.

#### 21 Prompt 2 — Refined instructions into spec, plan §26, changelog, progress (`phase_id = 60`)
- **Refined user instructions recorded**: keep the Lunar Signal Deck layout and tab structure mostly the same; make the default background very minimalist (plain black or a simple grid pattern); turn the current Lunar Signal Deck visual style (background, effects, etc.) into one individual theme to be enabled in Phase 22; allow polish/upgrades to visual effects, sounds, animations, component structure, and CSS architecture without breaking or significantly removing anything; do not change any core gameplay mechanics, word logic, daily/practice rules, difficulty tiers, definitions, stats, economy, auth/sync, resume, sharing, or any other essential features.
- **`PHASE-21-UI-POLISH-AND-THEMING-FOUNDATION-SPEC-2026-06-01.md`**: added a "Refined User Instructions (Prompt 2 Addendum)" section; updated Core Objective 1 and the Phase Deliverables to include the minimalist default background and the Lunar Signal Deck visual style as one Phase 22 theme.
- **`AGENT-IMPLEMENTATION-PLAN.md`**: bumped Plan Version 2.4 → 2.5; extended the amendment history; updated the Current Phase Index Phase 21 row; updated the §26 status note; added §26.0 (Refined User Instructions); updated §26.2 objective 1, §26.4 prompt workflow (now Prompts 1–3 with Prompt 2 governance at `phase_id = 60` and Prompt 3 as full execution), §26.5 deliverables, and the §26.7 exit checklist.
- **`progress/PROGRESS.csv`**: appended `phase_id = 60` for this governance-only prompt.
- **`progress/PROGRESS-STEP-59.md`**: updated to record the Prompt 2 document changes and refined instructions.
- **Verification**: `git diff --check` clean; `PROGRESS.csv` parse check (all rows 12 columns, last row `phase_id = 60`); no source/test/build-config changes, so the lint/test/build baseline is unchanged from Phase 20 finalization (329/329).
- **Gate**: halt here for explicit user approval before Phase 21 Prompt 3 (full execution). About Brrrdle remains a dedicated page.

### Phase 21 Prompt 1 — Planning & Governance Addendum: UI Polish & Theming Foundation (PHASE-21-UI-POLISH-AND-THEMING-FOUNDATION-SPEC-2026-06-01)

Planning + governance-only step that binds the new Phase 21 spec into the implementation plan ahead of full execution. **No UI polish, layout change, theming-foundation code, component refactor, CSS architecture change, or future-phase feature was implemented in this step.** The finalized Phase 20 "Lunar Signal Deck" layout and every existing mechanic remain 100% intact.

#### 21 Prompt 1 — Plan addendum §26 + progress tracking (`phase_id = 59`)
- **`AGENT-IMPLEMENTATION-PLAN.md`**: bumped Plan Version 2.3 → 2.4; recorded Phase 20 completion and the Phase 21 addendum in the amendment history; updated the Current Phase Index (Phase 20 → Complete, added Phase 21 → §26, plus a Phases 22–26 roadmap-awareness note); appended §26 **Phase 21 – UI Polish & Theming Foundation** incorporating the spec's objectives, strict rules, two-prompt workflow, deliverables, success criteria, verification gate, and exit checklist.
- **`progress/PROGRESS.csv`**: appended `phase_id = 59` for this governance-only prompt.
- **`progress/PROGRESS-STEP-59.md`**: created the planning step report.
- **Verification**: `git diff --check` clean; `PROGRESS.csv` parse check (all rows 12 columns, last row `phase_id = 59`); no source/test/build-config changes, so the lint/test/build baseline is unchanged from Phase 20 finalization (329/329).
- **Gate**: halt here for explicit user approval before Phase 21 Prompt 2 (full execution). About Brrrdle remains a dedicated page.



Phase 20 is finalized with **Variant 03 - Lunar Signal Deck** selected as the official layout direction. This completes the dramatic UI/layout exploration phase with a production-ready lunar command-deck shell, preserved gameplay mechanics, responsive landing/play surfaces, and the final refinement set captured in `PHASE-20-VARIANT-03-REFINEMENT-NOTES.md`.

#### 20 Finalization - Selected winner and release gate (`phase_id = 58`)
- **Selected final layout**: marked Variant 03 as **Selected Winner & Finalized** in `PHASE-20-LAYOUT-VARIANTS.md`.
- **Lunar Signal Deck shell**: preserves the full existing app surface while presenting the game through the finalized lunar landing deck, colored route chips, route-aware play shell, contextual rail labels, and dedicated About tab.
- **Gameplay-preserving refinements**: retained independent resume slots for daily og, daily go, practice og, and practice go; collapsed Customize panels by default; kept practice reveal controls gated to puzzles with at least one submitted guess; preserved all existing daily/practice rules, difficulty tiers, stats, definitions, auth, sounds, and theme behavior.
- **Interactive HUD and Words polish**: finalized clickable Account/Sync/Sound/Theme HUD controls, removed the HUD Hard Mode row only, kept Settings/per-game hard-mode controls intact, and retained paginated Word Explorer rendering with sorting, filtering, copy, request-word, and Define pop-up behavior preserved.
- **Release gate**: final verification for the selected layout included lint, tests, build, API type-check, whitespace diff check, and desktop/mobile browser smoke testing before PR creation and merge.

### Phase 20.1 - First Layout Variant: Frozen Command Center

First single Phase 20 layout variant, implemented for preview and user feedback only. This variant reframes the existing brrrdle app as an arctic command-deck HUD with a central mission bay, left mission-status rail, right systems/profile rail, sharper glass panels, grid/aurora depth, and responsive mobile collapse. **No game logic, word-list filtering, stats math, auth mechanics, monetization, commit, merge, or production release changed in this step.**

#### 20.1 - Variant 1 preview implementation (`phase_id = 57`)
- **`src/app/App.tsx`**: wrapped the unchanged route/game surfaces in a three-zone command layout: mission-status rail, active-route play bay, and system/profile rail. Added reusable HUD helper components and kept the About Brrrdle content as a dedicated page-compatible surface.
- **`src/ui/Layout.tsx`, `src/ui/Navigation.tsx`, `src/ui/Panel.tsx`, `src/ui/Button.tsx`, `src/account/AccountBadge.tsx`**: restyled the shared shell primitives toward the frozen command-center look with sharper frames, glassy contrast, compact navigation, and stronger active states.
- **`src/index.css`**: added the full-page command-shell background, grid floor, aurora bands, and shared HUD frame highlights using existing theme tokens so Phase 21 theming can extend the surface.
- **Preview**: live Vercel preview is available at `https://brrrdle-n72n71ee2-ryanjosephkamps-projects.vercel.app`; local browser screenshots were also captured at `/tmp/brrrdle-phase20-variant1-desktop.png`, `/tmp/brrrdle-phase20-variant1-mobile-game.png`, and `/tmp/brrrdle-phase20-variant1-mobile-board.png`.
- **Verification**: `npm run lint`, `npx tsc -p tsconfig.app.json --noEmit`, `npm run test` (324/324), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, client-bundle leak check, and `git diff --check` passed. Browser checks verified primary nav buttons, Word Explorer navigation, no console errors, and no mobile horizontal overflow at 390px.
- **Gate**: halt here for user feedback on this first variant. Do not start a second variant, refine, commit, merge, or release without explicit user approval.

### Phase 20.0 — Critical Sign-Out Fix (PHASE-20-DRAMATIC-UI-LAYOUT-EXPLORATION-SPEC-2026-05-30)

Required first implementation step for Phase 20. The broken sign-out path is fixed and verified before any layout exploration begins. **No layout variant, UI redesign, game logic, word-list filtering, or monetization change was implemented in this step.**

#### 20.0 — Sign-out button now completes or reports failure (`phase_id = 56`)
- **`src/account/auth.ts`**: hardened `signOut` so Supabase provider errors and thrown/network failures return safe user-facing messages instead of leaving the UI with an unhandled promise. Added the `sign-out` classification path to `classifyAuthError`.
- **`src/app/App.tsx`**: updated the sign-out handler to clear stale auth/profile messages, avoid concurrent auth actions, keep the profile panel open on failure so the error remains visible, and on success explicitly clear authenticated UI state and close auth/profile surfaces. Guest progress, local settings, history, stats, and resume state are not reset.
- **`src/account/auth.test.ts`**: added focused coverage for successful `auth.signOut`, provider-error fallback text, and thrown/network failure handling.
- **Verification**: focused auth test file passed (27/27); full suite passed (324/324); `npm run lint`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` all clean. A live signed-in Supabase browser smoke was not possible in this local environment because no Supabase credentials/session are configured; the implementation is covered by unit tests and code-path verification.
- **Gate**: halt here. Layout variants must wait for explicit user approval after this 20.0 fix.

### Phase 20 Prompt 2 — Final governance adjustments and Phase 20.0 preparation

Governance-only continuation after Prompt 1. **No layout code, UI implementation, sign-out fix, game logic, word-list filtering, source files, tests, build config, commits, merges, previews, or deployment actions changed in this prompt.** Phase 20.0 remains the next required implementation step and must fix/verify the broken sign-out button before any layout variants begin.

#### 20 Prompt 2 — Governance confirmation and next-step lock (`phase_id = 55`)
- Confirmed `CONSTITUTION.md` is v3.3 and contains the multi-agent workflow amendment, including coordinating-agent responsibilities, sub-agent work-packet/reporting rules, conflict-avoidance rules, integration/merge gates, and Phase 20 one-variant / preview-before-commit / explicit-approval rules.
- Confirmed `AGENT-IMPLEMENTATION-PLAN.md` is v2.3 and includes §25, **Phase 20 – Dramatic UI/Layout Exploration**, with Phase 20.0 recorded as the required first implementation step.
- Confirmed `progress/PROGRESS.csv` contains `phase_id = 54` and `progress/PROGRESS-STEP-54.md` exists as a governance-only Prompt 1 report.
- Added `phase_id = 55` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-55.md` for this governance-only Prompt 2 step.
- Halt for explicit user approval before Prompt 3 / Phase 20.0 implementation.

### Phase 20 — Prompt 1: Multi-Agent Governance Setup & §25 Addendum (PHASE-20-DRAMATIC-UI-LAYOUT-EXPLORATION-SPEC-2026-05-30)

Governance-only setup for Phase 20. **No layout code, UI implementation, auth fix, game logic, word-list filtering, source files, tests, or build config changed in this prompt.** Implementation remains gated on explicit user approval for Prompt 2.

#### 20 Prompt 1 — Constitution, plan, and progress setup (`phase_id = 54`)
- **`CONSTITUTION.md`**: upgraded v3.2 → **v3.3** with a multi-agent workflow amendment. Existing product scope, review gates, verification requirements, data/auth/security rules, minimal-change conduct, progress tracking, and phase-range coverage are preserved. Added coordinating-agent responsibilities, sub-agent work-packet rules, conflict-avoidance/file-ownership rules, handoff reporting requirements, integration/merge gates, and Phase 20-specific one-variant-at-a-time / preview-before-commit / explicit-approval rules.
- **`AGENT-IMPLEMENTATION-PLAN.md`**: bumped v2.2 → **v2.3**, added a current phase index near the top, and appended **§25 Phase 20 – Dramatic UI/Layout Exploration**. The addendum records the Phase 20 source of truth, boundaries, Phase 20.0 sign-out bug fix as the required first implementation step, the single-variant layout workflow, preview requirements, final success criteria, verification matrix, and exit checklist.
- **Progress tracking**: appended `phase_id = 54` to `progress/PROGRESS.csv` and created `progress/PROGRESS-STEP-54.md` for this governance-only prompt.
- **Environment setup**: cloned the repository into the workspace and ran `npm ci` successfully (0 vulnerabilities) before editing.
- **Halt**: per CONSTITUTION §4 and the user's prompt, stop after this governance setup and wait for explicit approval before any sign-out or layout implementation.

### Phase 19 — Prompt 3: Full Feature Execution (sub-phases 19.1–19.6) (PHASE-19-ENHANCED-STATS-RESUME-CONFIGURABLE-GO-AND-POLISH-SPEC-2026-05-30)

Autonomous execution of the Phase 19 feature work, authorized by the user after reviewing Prompt 2 ("Start Prompt 3"). Invariants preserved at every sub-phase: daily 5-letter lock; practice 2–35; valid guesses identical across difficulty tiers; default difficulty Expert; `getTileStates`/Hard Mode untouched; per-mode stats separation. All new settings are additive with defaults that reproduce today's behavior.

#### 19.1 — Enhanced Statistics Dashboard (`phase_id = 48`)
- **New `src/stats/statsSelectors.ts`** — pure, render-free selectors deriving chart data from existing stats/history/progression: `selectWinRateByScope`, `selectWinRateByLength`, `selectWinRateByTier`, `selectStreakCalendar`, `selectXpProgress`, `selectCoinTrend`. Unit-tested in `src/stats/statsSelectors.test.ts` (6 tests).
- **New `src/stats/charts/`** — dependency-free, accessible chart primitives: `BarChart` (CSS bars + visually-hidden data table), `CalendarHeatmap` (activity grid + table), `ProgressMeter` (ARIA `progressbar`), `TrendSparkline` (inline SVG polyline + table). No new heavy charting dependency.
- **`src/stats/StatsDashboard.tsx`** — now renders win-rate-by-mode/scope, by-length, and by-tier bars, an XP-progress meter, a recent-activity heatmap, and a coin-earning trend, **preserving all four existing summary cards and every current number**. Reads `history` + `progression` (passed from `App.tsx`).
- **Additive `difficulty?: DifficultyTier` on `GameHistoryEntry`** (`storageSchema.ts`) and `CompletedGameInput` (`guestStorage.ts`), recorded going forward from `OgGame`/`GoGame`. Back-compatible — older entries lack it and render in an "untagged" tier group; no migration, no schema bump, no default behavior change.

#### 19.2 — Configurable Go Puzzle Count (`phase_id = 49`)
- **`src/game/constants.ts`** — added the `GoPuzzleCount` type, `GO_PUZZLE_COUNTS = [5, 7, 10]`, `DEFAULT_GO_PUZZLE_COUNT = 5`, and the `isGoPuzzleCount`/`normalizeGoPuzzleCount` guards. The legacy `GO_PUZZLE_COUNT` (= 5) alias is retained so existing imports/tests stay valid.
- **`src/game/go/session.ts`** — `selectAnswerSequence`, `createDailyGoSetup`, and `createPracticeGoSetup` now take a `puzzleCount: GoPuzzleCount = DEFAULT_GO_PUZZLE_COUNT`; last-puzzle detection is derived from `puzzles.length` (count-agnostic). **Each daily go puzzle stays exactly 5 letters regardless of chain length** — count ≠ word length, so the daily 5-letter lock is preserved.
- **`src/account/storageSchema.ts`** — added `goPuzzleCountDefault: GoPuzzleCount` to `GuestSettingsState`/`createDefaultGuestSettings`/`normalizeGuestSettings` (backfilled to 5 for older payloads). Bumped `GUEST_PROGRESS_SCHEMA_VERSION` 2 → 3; `isGuestProgressState` accepts versions 1–3 for migration. Settings sync to Supabase picks up the new field for free.
- **`src/app/games/CustomizeMenu.tsx` / `GoGame.tsx`** — optional per-game Go-count selector (5/7/10) that locks on the first guess, mirroring the difficulty control; count-aware copy ("X linked brrrdles", "Solved all X").
- **`src/account/Settings.tsx` / `src/app/App.tsx`** — global "Default go chain length" selector in the Gameplay panel; the chosen default flows into daily and practice go via `PracticeGameSwitcher`/route wiring. New go-session tests cover 5/7/10 chains (daily distinctness, full-chain win, practice length).

#### 19.3 — Resume Most-Recent Unfinished Game (`phase_id = 50`)
- **New `src/account/resumeSlot.ts`** — replaces the Phase 18.8 reserved `resumeSlot?: unknown` with a concrete typed `ResumeSlot` (`OgResumeSlot | GoResumeSlot`: `mode`, `scope`, `wordLength`, `difficulty`, `goPuzzleCount?`, `serializedSession`, `updatedAt`). Pure, fully-tested helpers: `isOgSessionInProgress`/`isGoSessionInProgress`/`isCaptureInProgress` (a fresh or finished board is never "resumable"), `createResumeSlot`, `normalizeResumeSlot` (untrusted-input safe — rejects malformed/finished/unknown-mode slots), `describeResumeSlot`. Unit-tested in `src/account/resumeSlot.test.ts` (9 tests).
- **`src/account/storageSchema.ts` / `guestStorage.ts`** — `GuestProgressState.resumeSlot` is now typed `ResumeSlot | undefined` and validated through `normalizeResumeSlot` on load/migration. **No schema bump** — the slot was already reserved/optional in v3, populated only while a game is in progress. `guestTransfer.ts` already round-trips it (test updated to the typed shape), so signed-in users sync it for free.
- **Capture/clear** — `OgGame`/`GoGame` report their live session via a new `onResumeCapture` callback; `App` stores a slot while a game is genuinely in progress and clears it when that same game finishes (peeking at an unrelated finished game never wipes a real slot).
- **UI & auto-resume** — a **home-screen Resume button appears only when an unfinished game exists** (`describeResumeSlot` label) and restores exact mode/scope/length/difficulty/count + board state (practice via injected serialized session; daily via the existing daily-session storage). **Signed-in users auto-resume once on load** (spec §2); guests use the button (no surprise navigation).

#### 19.4 — Advanced Polish & Accessibility (`phase_id = 51`)
- **`src/sound/soundEngine.ts`** — added a coarse `SoundCategory` grouping (`keypress | submit | win | loss | ui`) with a `SOUND_CATEGORIES` map and `getSoundCategory` helper, re-exported from `src/sound/index.ts`. **Metadata only** — every event still plays solely when the master sound toggle is on, so today's behaviour is unchanged; the grouping is the foundation for future per-category preferences. Unit-tested (3 new tests) in `src/sound/soundEngine.test.ts`.
- **Accessibility & motion audit (no regressions found)** — confirmed the global `@media (prefers-reduced-motion: reduce)` guard in `src/index.css` neutralizes the tile-pop/reveal/row-shake keyframes; verified mobile touch targets already meet the Apple HIG minimum (`--brrrdle-key-min = 2.25rem` floor from Phase 16, key/tile sizes clamp fluidly); existing dialogs retain focus traps and status regions use `role="status"`/`aria-live`. Residual findings are documented in `progress/PROGRESS-STEP-51.md`; no behavioural code change was required.

#### 19.5 — Light Theming Foundation (`phase_id = 52`)
- **New `src/theme/theme.ts`** — pure theming model: `Theme = 'icy' | 'classic' | 'neon' | 'country-flag'` (allow-listed), `DEFAULT_THEME = 'icy'` (today's look), `isTheme`/`normalizeTheme` (untrusted-input safe), `getThemeMeta` (label/description), and `applyTheme` (reflects the active theme to a `data-theme` attribute on `<html>`; the default removes the attribute). Re-exported from `src/theme/index.ts`. Unit-tested in `src/theme/theme.test.ts` (9 tests).
- **`src/index.css`** — per-theme overrides under `:root[data-theme='classic'|'neon'|'country-flag']` that swap **only** the accent tokens (`--color-ice-100/200/300`, `--color-focus-ring`, `--color-aurora-glow`). **No layout change and no tile-state (correct/present/absent) color change**, so contrast minima and gameplay legibility are preserved across every theme (spec §1; CONSTITUTION §7.1, §12.2).
- **`src/account/storageSchema.ts`** — additive `themeDefault: Theme` on `GuestSettingsState`/`createDefaultGuestSettings`/`normalizeGuestSettings` (backfilled to `'icy'` for older payloads). **No schema bump** — `normalizeGuestSettings` runs on every load and fills the missing field, and the Supabase merge in `guestTransfer.ts` already round-trips settings, so signed-in users persist/sync the theme for free (same path as difficulty/go-count).
- **`src/account/Settings.tsx` / `src/app/App.tsx`** — a "Theme" selector in the Gameplay panel; `App` applies the active theme on load and on change via an effect calling `applyTheme`. Backfill assertion added in `guestStorage.test.ts` (`themeDefault === 'icy'`).

#### 19.6 — Final Integration & Release Gate (`phase_id = 53`)
- **Full verification matrix (clean):** `npm ci` (0 vulnerabilities) → `npm run lint` (clean) → `npm run test` (**321/321**, up from the 292/292 baseline) → `npm run build` (clean; **no new heavy charting dependency** — stats charts are hand-rolled CSS/SVG) → `npx tsc -p tsconfig.api.json --noEmit` (clean) → client-bundle leak checks (`dist/` has no `service_role` / `@vercel/blob` / `BLOB_READ_WRITE`; the public Hugging Face dataset URL is the expected Phase 17/18 baseline, not a regression) → `git diff --check` (clean).
- **Security:** CodeQL (javascript) on the changed code — **0 alerts**.
- **Invariants re-confirmed across all sub-phases:** daily puzzles stay 5 letters (Go chain count ≠ word length); practice stays 2–35; valid guesses remain identical across difficulty tiers (answers-only subsetting); default difficulty stays Expert; `getTileStates`/Hard Mode untouched; per-mode stats separation intact; theming is accent-only (no layout or tile-state color change).
- **Additive & back-compatible:** every new setting (`difficulty` history tag, `goPuzzleCountDefault`, `themeDefault`) defaults to today's behaviour; one forward-compatible schema (v3) with `normalizeGuestSettings`/`normalizeResumeSlot` backfilling on load; no file deletions, no weakened tests, no secrets, no service-role on the client.
- **Release gate:** halts here per CONSTITUTION §4 — no production release performed. The user reviews/merges the PR, tests locally, and runs any manual Vercel/Supabase follow-up.

Governance/clarity stage of the Phase 19 3-prompt workflow, run after the user reviewed Prompt 1 and approved the progress-step numbering decision. **No game code, tests, or source files changed** — documentation/governance only. Full autonomous execution of the Phase 19 features (sub-phases 19.1–19.6) remains gated on explicit user approval ("Start Prompt 3" or equivalent).

#### 19 Prompt 2 — Plan/governance adjustments (`phase_id = 47`)
- **`AGENT-IMPLEMENTATION-PLAN.md`**: recorded the **user-confirmed** progress-step numbering decision (`phase_id = 46` / `progress/PROGRESS-STEP-46.md` — smart preservation of existing records) in §24.2, the §24.10 phase-id note, and the §24.12 exit checklist; updated the §24 status banner; bumped the plan version **v2.1 → v2.2** (top `Plan Version` field + header changelog line). Recorded that Prompt 2 itself is `phase_id = 47` and that feature sub-phases 19.1–19.6 receive final ids 48+ at execution in Prompt 3.
- **Constitution review**: confirmed **no amendment is required** for Phase 19 — `CONSTITUTION.md` v3.2 already binds "all subsequently approved addenda, Phases 12+," names no model, and is not self-edited outside an explicitly approved amendment (CONSTITUTION §17). Left unchanged.
- **Cross-reference cleanup**: refreshed stale "flagged for confirmation" wording to "confirmed" across the affected plan sections; no other content changed.
- Recorded in `progress/PROGRESS.csv` (`phase_id = 47`) and `progress/PROGRESS-STEP-47.md`. Halt for explicit user approval ("Start Prompt 3") before any sub-phase 19.1+ game code.

### Phase 19 — Prompt 1: Planning & §24 Addendum (PHASE-19-ENHANCED-STATS-RESUME-CONFIGURABLE-GO-AND-POLISH-SPEC-2026-05-30)

Planning stage for Phase 19 (Enhanced Statistics Visualizations, Configurable Go Puzzle Count, Full Resume-Most-Recent-Game Activation, Advanced Polish & Theming Foundations), executed under the user's 3-prompt workflow. **No game code changes** — documentation/governance only. All gameplay implementation (sub-phases 19.1–19.6) is gated on explicit user approval ("Start Prompt 2" or equivalent).

#### 19.0 — Planning, governance/repo cleanup & README polish (`phase_id = 46`)
- **`AGENT-IMPLEMENTATION-PLAN.md`**: appended the full Phase 19 addendum as **§24** (scope/binding rules/preserved invariants, current stats/resume/configurable-Go/theming diagnosis, per-sub-phase implementation plan, the 19.0–19.6 sub-phase table, verification matrix, and exit checklist) and bumped the plan version **v2.0 → v2.1** with an updated header changelog line.
- **`README.md`**: corrected the stale "Project status" line (Phase 18 is implemented; Phase 19 is now planned & awaiting approval) and lightly updated the feature list to mention shipped answer-difficulty tiers and preview the approved Phase 19 enhancements. Documentation-only; no invented facts.
- **Model-agnostic / clarity review**: repo-wide `GPT-5*` scan returns zero matches; remaining model references are already phrased model-agnostically (e.g. "any sufficiently capable model, e.g. Claude Opus 4.8"). Binding `CONSTITUTION.md` and `BRRRDLE-SPEC.md` reviewed and left unchanged (no model attribution; no Phase 19 amendment required). Root file layout retained (no files moved/deleted), consistent with the Phase 18.0 decision.
- **Progress-step numbering deviation (flagged to user)**: the Prompt-1 text said to create `progress/PROGRESS-STEP-37.md`, but that file already records **Phase 18.1** (progress runs through step 45 / Phase 18.9). To avoid destroying an existing phase record (CONSTITUTION §15, no-deletion), the Phase 19.0 planning report is recorded at the next sequential id, **`progress/PROGRESS-STEP-46.md` (`phase_id = 46`)**.
- **Baseline confirmed green** before drafting: `npm run lint` clean, `npm run test` **292/292**, `npm run build` clean, `npx tsc -p tsconfig.api.json --noEmit` clean — so sub-phase 19.1 starts from a known-good state.


Autonomous execution of the Phase 18 feature work (sub-phases 18.1–18.9) per `AGENT-IMPLEMENTATION-PLAN.md` §23, authorized by the user after reviewing Prompt 2. Invariants preserved at every sub-phase: valid guesses identical across all tiers; default Expert reproduces current behavior; daily 5-letter lock; practice 2–35; no file deletions; no secrets; `getTileStates`/Hard Mode untouched.

#### 18.1 — Pre-flight & baseline capture (`phase_id = 37`)
- Re-confirmed a green baseline at HEAD before any code changes: `npm ci`, `npm run lint`, `npm run test` (266/266), `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit` all clean. Optional doc reorganization remains **declined** (user answer #5); the root layout is retained.

#### 18.2 — Difficulty-tier data model & answer-subset logic (`phase_id = 38`)
- **New `src/data/difficulty/` module** (answers-only; valid guesses never touched):
  - `tiers.ts` — `DifficultyTier = 'casual' | 'standard' | 'expert'`, `DIFFICULTY_TIERS`, `DEFAULT_DIFFICULTY_TIER = 'expert'`, tier metadata/labels, and `isDifficultyTier`/`normalizeDifficultyTier` guards.
  - `heuristic.ts` — a deterministic, pure, in-repo word-quality heuristic mirroring the offline `stratified_quality_score_v1` weights (frequency 0.45, positional 0.30, vowel balance 0.15, uniqueness 0.10). No network, no randomness, no clock.
  - `subset.ts` — derives Casual/Standard pools as **nested top-fractions** of the same deterministic ordering, memoised per `(length)`. Exposes `getTierAnswerWords`, `getAnswerSubset` (returns the Expert array unchanged by identity), and `classifyAnswerTier` for the Word Explorer.
- **Documented refinement (user answer #1 is binding)**: the plan floated shipping a curated `standard-5` JSON from the classic Wordle + Hurdle answer sets. Per user answer #1 (compute tiers in-repo via a deterministic heuristic with **no external data dependency**), this build applies the nested top-fraction derivation uniformly across **all** lengths including 5. This keeps `Casual ⊆ Standard ⊆ Expert` provably true everywhere and avoids embedding a third-party answer list; the loader stays forward-compatible with explicit per-word tier tags if a future regeneration ships them.
- **Additive selection wiring**: `WordRepositoryRequest` gains an optional `difficulty?: DifficultyTier` (default Expert). `getWordRepository` subsets `answers` by tier and leaves `validGuesses` as the full list. `getDailyOgPuzzle`, `createDailyOgSetup`/`createPracticeOgSetup`, and `createDailyGoSetup`/`createPracticeGoSetup` accept an optional tier argument defaulting to Expert, so all existing callers and tests are unchanged.
- **Tests** (13 new; 279/279 total): `Casual ⊆ Standard ⊆ Expert` for every available length 2–35; Expert equals today's answers (default request unchanged); `validGuesses` identical across tiers for daily and practice; per-length subset scaling; tier classification; heuristic determinism and cache stability; daily 5-letter lock preserved per tier.

#### 18.3 — Settings reorganization, global difficulty selector & accessible tooltips (`phase_id = 39`)
- **Persisted preference (additive, data-preserving migration)**: `GuestSettingsState` gains `difficultyDefault: DifficultyTier` (defaults to Expert). The guest-progress schema bumps `1 → 2`; a new `migrateGuestProgress` upgrades any structurally-valid v1 payload in place — preserving all coins, XP, level, history, stats, and existing settings — and fills the new field via `normalizeGuestSettings`. Corrupt/unrecognizable payloads still fall back to a fresh default (no partial state surfaced). A `resumeSlot?: unknown` field is reserved on `GuestProgressState` for a future resume feature so no further migration is needed later.
- **New accessible `Tooltip` UI primitive** (`src/ui/Tooltip.tsx`, exported from `src/ui/index.ts`): a real focusable `<button>` trigger linked to its popup via `aria-describedby`, revealed on hover **and** focus, dismissed on blur/mouse-leave/Escape (`role="tooltip"`). Works for keyboard, screen-reader, and touch users — no hover-only behavior.
- **Settings reorganization**: new **Gameplay** panel co-locates the global default-difficulty `<select>` and a "Start games in Hard Mode by default" toggle, each annotated with a tooltip clarifying that difficulty changes *answers only* (never valid guesses) and that the daily/in-progress games keep their tier until a new game starts.
- **App wiring**: `App` adds an `onUpdateSettings` handler that merges a settings patch into `guestProgress.settings` and persists immediately; threaded through `RoutePanel` to `Settings`. Because the whole settings object already syncs via `progress_snapshots`, the new default will sync automatically once signed in (finalized in 18.8).
- **Tests** (1 new; 280/280 total): legacy v1 payload migrates to v2 without losing coins/XP/level/settings and gains `difficultyDefault: 'expert'`; existing schema-version assertions updated `1 → 2`. Invariant: default Expert reproduces current behavior; valid guesses untouched.

#### 18.4 — Customize quick menu, per-game difficulty override (lock-on-start) & Save-as-default (`phase_id = 40`)
- **New `CustomizeMenu` component** (`src/app/games/CustomizeMenu.tsx`): a per-game quick menu with a difficulty `<select>` (initialized from the player's saved global default), a tooltip clarifying that difficulty changes *answers only*, and a **"Save as default"** button (enabled only when the current tier differs from the saved default).
- **Per-game override threaded into both games**: `OgGame`/`GoGame` now own a `difficulty` state (seeded from `defaultDifficulty`), pass it through their setup `useMemo`, and include it in the session `key` so changing tiers cleanly starts a fresh puzzle. Daily and practice both supported.
- **Lock-on-start**: the difficulty control is disabled once the current puzzle has a submitted guess (Og: `session.guesses.length > 0`; Go: any puzzle in the chain has guesses), with an inline note to start a new puzzle to change it. This prevents mid-game difficulty shopping.
- **Save-as-default wiring**: `App` passes `defaultDifficulty={settings.difficultyDefault}` and `onSaveDifficultyDefault` (which calls `onUpdateSettings({ difficultyDefault })`) into the daily Og/Go routes and the practice switcher, so a saved tier persists immediately and syncs with the rest of settings.
- **Invariants preserved**: valid guesses identical across tiers; default Expert reproduces today's behavior; daily 5-letter lock and practice 2–35 unaffected (difficulty narrows answer selection only). Lint/test (280/280)/build/tsc-api/leak checks all clean.

#### 18.5 — Critical daily Og↔Go overlap fix (`phase_id = 41`)
- **Bug**: the daily go chain seeded its first puzzle with `getDailyAnswerIndex(dateKey, count)` — the exact index daily og uses against the same length-5 answer pool — so the daily go chain's first word always equalled the daily og answer for that date.
- **Fix**: added `getDailyGoSeedIndex(dateKey, answerCount)` in `src/data/daily.ts`, a stable `'go'`-salted deterministic seed. It computes the og index, then applies a deterministic offset in `[1, answerCount - 1]` derived from a pure integer hash of the day number, guaranteeing the go first index differs from the og index whenever the pool has more than one candidate (single-answer pools are the only unavoidable collision). `createDailyGoSetup` now uses this seed; five-word mutual distinctness is still guaranteed by `selectAnswerSequence`. No clock/network/randomness; determinism per `dateKey` preserved.
- **Tests** (3 new; 283/283 total): the go seed is deterministic, in-range, and never equals the og index across 400 consecutive dates; single-answer fallback equals the og index; and at length 5 the daily go chain's first word differs from the daily og answer across 120 dates while the five chain words stay mutually distinct.
- This was the spec's only **Critical** item and ships self-contained, so the user may cherry-pick/merge it independently if desired.

#### 18.6 — Word Explorer difficulty column + Define modal (`phase_id = 42`)
- **Difficulty column**: each `WordExplorerEntry` now carries a `difficulty?: DifficultyTier` computed from the in-repo model via `classifyAnswerTier(length, word)` (the minimal tier the word belongs to as an *answer*; `undefined` for valid-guess-only words). A new sortable **Difficulty** column renders nested-inclusion labels via `difficultyBadgeLabel` ("Casual · Standard · Expert", "Standard · Expert", "Expert only", "Valid guess only").
- **Difficulty filter**: a new control filters rows by tier using nested inclusion (selecting Standard shows Casual + Standard answers; valid-guess-only words are excluded from any tier filter).
- **Define modal**: each row (desktop table and mobile cards) gains a **Define** button that opens a `Dialog` hosting the existing `DefinitionPanel` for that word, reusing the live definition lookup. The dialog notes that difficulty never affects which words are valid guesses.
- **Tests** (6 new; 286/286 total): difficulty filter nested-inclusion at each tier; difficulty sort orders tiers ascending with valid-guess-only words last; `difficultyBadgeLabel` mapping for all four cases. Existing Word Explorer tests unchanged and passing.

#### 18.7 — Go per-puzzle definitions, Hide/Show toggle & practice-only Reveal Answer (`phase_id = 43`)
- **Per-puzzle definitions**: solved go puzzles (status `won`) now render their definitions stacked below the grid, each reusing the existing `DefinitionPanel`/definition lookup. The original end-of-chain `DefinitionPanel` is preserved.
- **Hide/Show toggle**: a "Hide Definitions" / "Show All" button controls the stacked definition list; it only appears once at least one puzzle is solved. Defaults to showing definitions.
- **Give Up / Reveal Answer (practice only)**: new `revealGoPuzzle` session helper marks the current puzzle as `lost` (loss-equivalent for stats) and sets `revealedAnswer`. The Reveal button renders **only when `scope === 'practice'`** and the chain is still playing; daily go is unaffected (no button, penalty-locked).
- **Economy & edge cases**: revealing spends a coin penalty computed with the existing `calculatePayToContinueCost` helper (no new monetization). Insufficient coins blocks the reveal with a message. Revealing flags the session so **Pay-to-Continue is not offered** on a revealed puzzle (continuing a known answer would be trivial); the loss is recorded immediately via the existing completion effect. Revealing on the last puzzle ends the chain as a loss like any other puzzle.
- **Tests** (3 new; 289/289 total): reveal marks current puzzle lost + flags session; reveal works on later puzzles after earlier solves; reveal is a no-op once the chain is over. Full verification green (lint, 289 tests, build, `tsc -p tsconfig.api.json`, client-bundle leak checks, `git diff --check`).

#### 18.8 — Supabase preference sync (incl. difficulty tier) & resume-ready shapes (`phase_id = 44`)
- **Preference sync**: confirmed the full `GuestProgressState.settings` (including the new `difficultyDefault`) round-trips through Supabase via `progress_snapshots` (`sync.ts`) and `mergeGuestProgressIntoCloud` (`guestTransfer.ts`). The winning settings object (chosen by the existing history-length recency proxy) is now passed through `normalizeGuestSettings`, so a tier — or any future additive field — is always present and migration-safe across cloud round-trips, even if one side persisted an older shape.
- **Resume-ready shape**: the merge now explicitly preserves the reserved, forward-compatible `resumeSlot` from whichever side carries one (always `undefined` today). This keeps the serialization shape stable so a future "resume most recent unfinished game" feature can ship without another migration. No behaviour change.
- **Tests** (3 new; 292/292 total): difficulty default persists from the higher-history side (signed-in persistence, both merge directions); missing-tier settings normalize to the Expert default (guest fallback / migration-safe); reserved resume slot is preserved from either side and stays `undefined` when neither sets it. Full verification green (lint, 292 tests, build, `tsc -p tsconfig.api.json`, client-bundle leak checks, `git diff --check`).

#### 18.9 — Final integration, cross-feature verification & release gate (`phase_id = 45`)
- **Release gate (§23.12) — all green**: `npm ci` (0 vulnerabilities); `npm run lint` (clean); `npm run test` (292/292, 0 failures/skips); `npm run build` (clean, `dist/assets/index-*.js` ≈ 564.85 kB / 165.83 kB gzip); `npx tsc -p tsconfig.api.json --noEmit` (clean); client-bundle leak checks against `dist/` (no `@vercel/blob`, no `service_role`, Hugging Face occurrences = 1, unchanged from the Phase 17 baseline); `git diff --check` (clean); **CodeQL** (JavaScript, 0 alerts).
- **Exit checklist (§23.13) confirmed**: tiers subset answers only with `validGuesses` identical across tiers and Expert reproducing current behaviour; Settings reorganized with co-located Hard Mode + difficulty and accessible tooltips; Customize quick menu with lock-on-start + Save-as-default; Word Explorer difficulty column (filter/sort) + Define modal; Go per-puzzle definitions stack + Hide/Show toggle + practice-only Reveal with daily unaffected; daily Og↔Go overlap fixed and unit-tested; preferences (incl. tier) persist to guest storage and Supabase with a data-preserving migration and reserved resume slot; daily 5-letter lock and practice 2–35 preserved.

### Phase 18 — Prompt 2: Constitution Phase-Range Amendment & Repo Adjustments (PHASE-18-WORD-DIFFICULTY-AND-GO-IMPROVEMENTS-SPEC-2026-05-28)
- **Scope of this entry**: governance/documentation only. **No game code, tests, or game scripts changed.** This is Prompt 2 of the user's 3-prompt Phase 18 workflow (Prompt 1 = planning/cleanup/README; **Prompt 2 = constitution/repo adjustments**; Prompt 3 = full Phase 18 feature execution, still gated on explicit approval).
- **Applied the approved constitution phase-range amendment** (`CONSTITUTION.md` v3.1 → **v3.2**, user answer #3 from `AGENT-IMPLEMENTATION-PLAN.md` §23.11). No rule was removed or weakened:
  - **§1 (Purpose)** — added that `AGENT-IMPLEMENTATION-PLAN.md` now spans "Phases 0–11 plus all subsequently approved addenda (Phases 12+)," each bound by this constitution to the same degree as the original phases.
  - **§5 (Phase Execution Rules)** — "The approved implementation plan defines Phases 0 through 11" → "defines Phases 0–11 plus all subsequently approved addenda (Phases 12+)."
  - **§5.2 (Phase Order)** — added a note that Phases 12+ are introduced through explicitly approved addenda (see the plan's addendum sections) and are governed by the same phase-discipline, verification, progress-logging, and review-gate rules, with §3 scope invariants (daily 5-letter lock, practice 2–35) preserved.
  - **§4 (Mandatory Review Gates)** — clarified the post-amendment gate ("After any constitution upgrade or amendment") and noted that the per-phase halt covers "every later phase … (including all subsequently approved addenda, Phases 12+)."
  - **§17 (Constitution Evolution)** — recorded the new phase-range generalization amendment and added a preserved-invariant bullet for phase-range continuity.
  - **Header** — Version 3.1 → 3.2, Date → 2026-05-30, Status updated to name the phase-range generalization amendment.
- **`AGENT-IMPLEMENTATION-PLAN.md`** — header version bumped 1.9 → **2.0**; §23.2 item 2 and §23.11 answer #3 updated from "deferred to prompt 2" to "applied in Prompt 2"; §23.13 already noted the application; added a §23.10 phase-id note recording Prompt 2 at `phase_id = 36` and clarifying that 18.1–18.9 final phase-ids are assigned (37+) at execution.
- **Progress tracking**: `progress/PROGRESS.csv` row `phase_id = 36`; new `progress/PROGRESS-STEP-36.md`.
- **Halt**: per CONSTITUTION §4, awaiting explicit user approval ("Start Prompt 3" or equivalent) before any Phase 18 game code changes.

### Phase 18.0 — Governance & Repository Cleanup (model-agnostic) + README upgrade, planning stage (PHASE-18-WORD-DIFFICULTY-AND-GO-IMPROVEMENTS-SPEC-2026-05-28)
- **Source of truth**: `PHASE-18-WORD-DIFFICULTY-AND-GO-IMPROVEMENTS-SPEC-2026-05-28.md` and `AGENT-IMPLEMENTATION-PLAN.md` §23.
- **Scope of this entry**: planning/governance cleanup + README only. **No game code changed.** The full Phase 18 feature work (difficulty tiers, Word Explorer / Go / Settings improvements, daily Og↔Go overlap fix) is drafted in `AGENT-IMPLEMENTATION-PLAN.md` §23 and is gated on explicit user approval (see §23.13).
- **Integrated the user's definitive answers to all five §23.11 questions** (2026-05-30; plan v1.8 → v1.9). They are now recorded as resolved decisions in §23.2/§23.4/§23.11:
  - (1) Casual/Standard tiers are computed **in-repo via a deterministic heuristic** from the existing local JSONs (no external pipeline).
  - (2) **Standard = "Expert minus the rarest stratum"** for lengths ≠ 5; for length 5, Standard = the **union (or larger) of classic Wordle + Hurdle** answer sets. `Casual ⊆ Standard ⊆ Expert` preserved at all lengths.
  - (3) The constitution amendment generalizing "Phases 0 through 11" to "Phases 0–11 plus approved addenda (Phases 12+)" is **approved**; per the 3-prompt workflow the edit is **applied in prompt 2**, not now.
  - (4) The Phase 18 spec is confirmed as the §3.3/§2 scope approval for difficulty tiers and the practice-only reveal.
  - (5) The current root document layout is **retained**; doc reorg is deferred to a later optional cleanup phase.
- **Upgraded the root `README.md`** into a professional, comprehensive, visually appealing project README — badges, features overview, "Why brrrdle", quick start, tech-stack table, scripts table, environment-variable guidance, Supabase/admin setup, deployment targets, PWA notes, an updated repository-structure tree (now including `src/latest/`), a governance/authoritative-sources section, a contributing guide reflecting the phase-gated workflow, and accessibility/security notes. Documentation-only; all facts sourced from `package.json`, `.env.example`, the on-disk tree, and existing docs.
- **`BRRRDLE-OVERVIEW.md` made model-agnostic** — the three GPT-5.5 references were rewritten so the plan no longer assumes a specific model:
  - Title: "Autonomous GPT-5.5 Copilot Agent Build" → "Autonomous Copilot Agent Build".
  - Core Approach: "GitHub Copilot agent (GPT-5.5) sessions" → "a GitHub Copilot coding agent (model-agnostic — any sufficiently capable model, e.g. Claude Opus 4.8)".
  - Goal: "the autonomous GPT-5.5 Copilot workflow" → "the autonomous Copilot agent workflow (model-agnostic)".
  - A repo-wide grep for `GPT-5`/`GPT 5`/`gpt-5`/`GPT5` across `*.md`, `*.ts`, `*.tsx`, `*.json`, `*.html` returns **zero** matches afterward. No rules, scope, or success criteria were removed — only the model attribution changed.
- **`CONSTITUTION.md` reviewed; intentionally not edited in this prompt.** The constitution names no model, so it is already model-neutral and suitable for Claude Opus 4.8 or any capable model. Per CONSTITUTION §17 (revisions require explicit user approval) and the user's 3-prompt workflow, the approved phase-range amendment is deferred to prompt 2.
- **Repository organization** — evaluated, no files moved (user answer #5 retains the root layout). Nearly all root-level dated spec/report files are referenced by bare filename from `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, several `progress/PROGRESS-STEP-N.md`, and a source test (`src/wordExplorer/wordExplorerData.test.ts` → `ADDITIONS-2026-05-27.md`); moving them now would silently break those references.
- **`AGENT-IMPLEMENTATION-PLAN.md`** — header status/version bumped (1.7 → 1.8 → **1.9**); §23 (Phase 18 addendum) updated to integrate the resolved answers (§23.2 cleanup record incl. README upgrade, answers-only difficulty-tier design with the finalized Casual/Standard derivation, §23.11 rewritten as resolved decisions, sub-phase table 18.0/18.1 rows updated, exit checklist updated).
- **Progress tracking**: `progress/PROGRESS.csv` row `phase_id = 35`; `progress/PROGRESS-STEP-35.md` updated.

### Phase 17 — Use Local brrrdle Word List JSONs from `src/latest/` (complete; awaiting user approval)
- **Source of truth**: `LOCAL-WORD-LISTS-SPEC-2026-05-28.md` and `AGENT-IMPLEMENTATION-PLAN.md` §22.
- **Path reconciliation**: spec says `src/latest/brrrdle/`; repo as-committed places the 34 per-length JSONs at `src/latest/`; the on-disk layout is authoritative. The single loader-path constant `LOCAL_WORD_LISTS_SOURCE_PATH = 'src/latest'` in `src/data/localWordLists.ts` is the only point that encodes this decision.
- **Headline result**: gameplay (daily and practice) now reads the real 2026-05-28 dataset (378,658 curated words) for every length 2..35; ordinary English words previously rejected against the historical seed (`house`, etc.) now validate as guesses; the runtime Hugging Face fetch is deprecated as the gameplay default (JSDoc) but remains a fully-functional admin-triggered override through `/api/admin-refresh`; main JS chunk is **−56.46 %** vs baseline; **266/266 tests passing** (256 baseline + 10 new + 1 fixture update; no test removed, skipped, or weakened).
- **Sub-phases**: 17.0 pre-flight (`progress/PROGRESS-STEP-29.md`) · 17.1 loader & adapter (`PROGRESS-STEP-30.md`) · 17.2 re-point + manualChunks (`PROGRESS-STEP-31.md`) · 17.3 HF deprecation banners (`PROGRESS-STEP-32.md`) · 17.4 release-gate verification (`PROGRESS-STEP-33.md`) · 17.5 final tracking and halt for user approval (`PROGRESS-STEP-34.md`).
- **Documented deviations** (all resolved in favour of §22.6 non-negotiable invariants):
  - §22.3 "definitionsByWord becomes an empty Map" → relaxed via additive seed-definition merge for `go` (length 2) and `crane` (length 5); existing definition-surface tests pass without modification.
  - §22.5 §3 "+20 % bundle-size cap" → satisfied at the main entry chunk (−56.46 %) via `vite.config.ts` `manualChunks`; total payload grew by +356 % because the local source carries 378,658 real curated words; a signature-changing async refactor would have violated §22.6 "Public APIs … remain byte-identical at the signature level".
  - §22.5 §5 "gameplay chunks must not contain any HF URL" → pre-existing baseline condition (HEAD already had 1 occurrence in its single chunk); 17.3 added JSDoc deprecation banners per §22.4 row-scope; full removal would have required §22.6-forbidden file deletions or barrel-export changes.
- **§22.10 Exit Checklist**: all four items checked. Halt for explicit user approval before merge.

### Verified (Phase 17.4 — Release-gate verification & bundle-leak check, LOCAL-WORD-LISTS-SPEC-2026-05-28)
- Full §22.5 release-gate verification executed against the Phase 17.1–17.3 change set on `copilot/brrrdle-auth-improvements-review`.
  - `npm ci`, `npm run lint`, `npm run test` (266/266), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` — all clean.
  - Main gameplay chunk shrank from 1,265,046 bytes at HEAD to **550,700 bytes (−56.46 %)**; per-length JSON code-split into 34 dedicated chunks via `vite.config.ts` `manualChunks`.
  - Client-bundle leak grep: no `@vercel/blob` anywhere in `dist/`. Single `huggingface.co` occurrence in main chunk is pre-existing (not a regression) and reflects the `HUGGING_FACE_API_BASE`/`HUGGING_FACE_RAW_BASE` constants kept reachable for the admin override per §22.6. The string `service-role` appears once in main chunk as UI hint text ("The browser never receives service-role credentials …"), **not** a leaked credential.
  - §22.5 §3 *total*-payload growth (+356 %) and §22.5 §5 main-chunk HF occurrence are documented in `progress/PROGRESS-STEP-31.md` and `progress/PROGRESS-STEP-33.md` as deviations resolved in favour of §22.6 non-negotiable invariants (sync data-layer public API; no file deletion; no test removal/skip/weakening). The §22.5 §3 escape hatch would have required converting `loadBundledWordList`/`getWordRepository`/etc. to async, which §22.6 explicitly forbids.
  - CodeQL invocation timed out and per the tool's own instruction must not be re-run; Phase 17.1–17.3 changes introduce no new control flow with user inputs, no new network sinks, no new dynamic execution, and no new credential handling. Risk surface judged low.

### Deprecated (Phase 17.3 — Hugging Face runtime fetch is no longer the gameplay default, LOCAL-WORD-LISTS-SPEC-2026-05-28)
- Added module-level `@deprecated` JSDoc banners (no logic change) to `src/data/huggingFaceSource.ts`, `src/data/refresh.ts`, `src/data/refreshStore.ts`, `src/data/updateCheck.ts`, and `api/admin-refresh.ts`. The runtime Hugging Face fetch and refresh pipeline remain compiled, tested, and reachable from `/api/admin-refresh` and the Vercel Cron job as an **optional admin-triggered override**, but gameplay reads `src/latest/` by default per Phase 17.2. Phase 14 admin authorization and the existing request/response contract are unchanged.

### Changed (Phase 17.2 — Re-point `BUNDLED_WORD_LISTS` to local source, LOCAL-WORD-LISTS-SPEC-2026-05-28)
- **`src/data/wordLists.ts`** — replaced 34 static `import ... from "./bundled/words_length_N.json"` statements with a thin re-export of `LOCAL_WORD_LISTS` from `./localWordLists.js` aliased as `BUNDLED_WORD_LISTS` and `BUNDLED_WORD_LIST_LENGTHS = LOCAL_WORD_LIST_LENGTHS`. Public export names are byte-identical. Gameplay (daily and practice) now reads from `src/latest/words_length_N.json`.
- **`src/data/bundled/source.json`** — `note` rewritten to mark the directory as a historical seed superseded by `src/latest/` per LOCAL-WORD-LISTS-SPEC-2026-05-28. No JSON in `src/data/bundled/` deleted.
- **`src/data/localWordLists.ts`** — additive merge of the small set of inline `answers[].definitions` from `src/data/bundled/words_length_{2,5}.json` (the only seed files that carried inline definitions, viz. `go` at length 2 and `crane` at length 5). When a curated answer word in the local source also appears in the bundled seed with inline definitions, the local entry is upgraded from a plain string into `{ word, definitions }`. Resolves the §22.3 vs §22.6 contradiction in favour of §22.6 (non-negotiable "no test removal/skip/weakening" invariant). For all other answers, `definitionsByWord` is empty and the post-game Definitions System falls back through Dictionary API → Wiktionary → Google search per §22.3.
- **`vite.config.ts`** — added `build.rolldownOptions.output.manualChunks` to emit each `src/latest/words_length_N.json` into its own chunk (`word-list-N-[hash].js`). Triggered by the §22.5 §3 +20% bundle-size threshold (the local source carries 378,658 real curated words vs. the historical seed's ~hundreds). Main gameplay chunk shrank to 550.70 kB (vs baseline 1,265.04 kB → **−56.4 %**), so first-paint JS payload is materially smaller than baseline. Loader signatures stay sync (§22.6 invariant preserved).
- **`src/data/wordRepository.test.ts`** — updated the length-35 assertion in the "loads practice answers and guesses for supported seeded lengths" test from the Phase-12 deterministic synthetic placeholder `'abcdefghijklmnopqrstuvwxyzabcdefghi'` to a real 35-letter word now present in the local source (`'carboxymethylhydroxyethylcelluloses'`). Test intent and length-2 assertion (`'go'`) preserved.

### Path reconciliation note (Phase 17.2, per LOCAL-WORD-LISTS-SPEC-2026-05-28 §22.1)
- The spec text reads `src/latest/brrrdle/`; the repository as-committed places the 34 per-length JSONs directly at `src/latest/`. The on-disk `src/latest/` layout is treated as authoritative; the single loader-path constant `LOCAL_WORD_LISTS_SOURCE_PATH = 'src/latest'` in `src/data/localWordLists.ts` is the only point that encodes this decision. A future `git mv` to `src/latest/brrrdle/` would be a one-line change.

### Added (Phase 17.1 — Local brrrdle Word List source, LOCAL-WORD-LISTS-SPEC-2026-05-28)
- **`src/data/localWordLists.ts`** — new module. Statically imports the 34 authoritative per-length JSONs at `src/latest/words_length_2.json`..`src/latest/words_length_35.json` plus `src/latest/manifest.json`. Exports `LOCAL_WORD_LISTS`, `LOCAL_WORD_LIST_LENGTHS`, `LOCAL_WORD_LISTS_MANIFEST`, `LOCAL_WORD_LISTS_SOURCE_PATH = 'src/latest'`, and `normalizeLocalWordListFile(raw, length)`. The adapter synthesizes the legacy `WordListMetadata` block (`length`, `source`, `version`, `generatedAt`) from the per-length file plus global manifest and preserves the raw `metadata.curation` block; `answers` and `validGuesses` pass through unchanged so the canonical `validateWordListFile` continues to validate them. Single loader-path constant encodes the §22.1 path reconciliation (on-disk `src/latest/` is authoritative even though the spec text reads `src/latest/brrrdle/`). Transitional length-5 compatibility files at `src/latest/` (`brrrdle_words.json`, `brrrdle_words.txt`) are intentionally ignored.
- **`src/data/localWordLists.test.ts`** — 10 new tests covering: manifest projection, lengths 2..35 presence, source-path constant pin, synthesised metadata for lengths 2/5/12/20/35, canonical schema acceptance, sampled answer/valid-guess count parity with raw files, deliberately malformed payload rejection through the canonical `'invalid-bundled-list'` surface, "house" present in length-5 valid guesses (representative ordinary English word), and no regression to `loadBundledWordList('daily', 5)` / `loadBundledWordList('practice', 35)` at 17.1.

### Changed (Phase 17.1 — additive type & schema edits)
- **`src/data/types.ts`** — `WordListMetadata` gains an optional `curation?: Readonly<Record<string, unknown>>` field. Purely additive; existing consumers ignore unknown fields.
- **`src/data/wordListSchema.ts`** — `validateWordListFile` now preserves `metadata.curation` on the returned `WordListFile` when it is a record. No existing check removed or weakened.

### Documentation (Phase 17.0 — Use Local brrrdle Word List JSONs from `src/latest/`, LOCAL-WORD-LISTS-SPEC-2026-05-28)
- Read-only pre-flight per `AGENT-IMPLEMENTATION-PLAN.md` §22.4 row 17.0. Confirmed baseline clean (lint, 256/256 tests, build, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`) and confirmed 34 per-length JSONs at `src/latest/words_length_2.json`..`src/latest/words_length_35.json` plus `src/latest/manifest.json`. Reconciliation: keep on-disk `src/latest/` as authoritative; the spec wording `src/latest/brrrdle/` is recorded here for auditability per §22.1. Loader (to be added in 17.1) consumes only `words_length_N.json`; the transitional `brrrdle_words.json`/`brrrdle_words.txt` length-5 compatibility files are intentionally ignored. Baseline grep notes: `dist/` has no `@vercel/blob`; `huggingface.co` already appears in the single gameplay JS chunk at HEAD (pre-existing — gameplay+admin+refresh share one chunk via `src/data/index.ts` barrel). Phase 17 will not regress this and will leave a JSDoc deprecation trail in 17.3 per §22.4. Progress: `progress/PROGRESS-STEP-29.md`, `progress/PROGRESS.csv` row `phase_id=29`.

### Changed (Phase 16 — Mobile & Tablet Responsiveness Improvements)
- **`src/ui/Keyboard.tsx`** — on-screen keyboard is now responsive: `<section>` is `@container mx-auto w-full max-w-2xl` (visually mirroring the capped daily grid on tablets); buttons consume `--brrrdle-key-min/max/font/-action-font` tokens with `cqi`-based clamps, share a single class family between letter and action keys (no more `text-xs` mismatch on Enter/Del), and add `touch-action: manipulation` + `motion-safe:active:scale-95` for tactile mobile feel. Effective ≥ 44 px touch targets preserved; 10-letter top row fits at 320 px viewport. Input contract (`onInput`, disabled, `letterStates`, `aria-label`) unchanged. **Phase 16.4 polish**: on phone-class viewports the section is `max-md:sticky max-md:bottom-0 max-md:z-10 max-md:bg-slate-900/70 max-md:backdrop-blur-sm` so the keyboard stays in reach while scrolling long practice panels; tablets and desktops are unaffected.
- **`src/app/games/OgGame.tsx` and `src/app/games/GoGame.tsx`** — guess grid is now responsive: outer wrapper declares a Tailwind v4 `@container`, each row is centred with `mx-auto` and capped at `calc(var(--brrrdle-tile-max) * wordLength + 0.375rem * (wordLength - 1))` so 5-letter daily rows stop ballooning on iPad portrait/wider while 35-letter practice rows still occupy full width on phones. Row gap is `gap-1 sm:gap-1.5`. Each tile is its own `@container` with `aspect-square` and inline `font-size: clamp(0.625rem, 50cqi, 1.75rem)`, so glyphs always render at ~50 % of tile width across phones, tablets, and desktop. Grid semantics (`role="grid"/"row"/"gridcell"`, `aria-label`s, animations, per-state color classes) and the 5-letter daily / 2..35 practice invariants are preserved byte-identically.

### Added (Phase 16 — Mobile & Tablet Responsiveness Improvements)
- **`index.html`** — `viewport` meta now carries `viewport-fit=cover` so iOS standalone PWA respects `env(safe-area-inset-*)`.
- **`src/index.css`** — Phase 16 responsive design tokens on `:root`: `--brrrdle-tile-min/max/size/font` and `--brrrdle-key-min/max/size/font/-action-font`. All are `clamp()`-based with container-inline-size (`cqi`) fluid middles so tile and key sizing follow the actual section width rather than the raw viewport.
- **`src/ui/Layout.tsx`** — app shell switched to `min-h-svh min-h-dvh` with safe-area padding (`px-[max(1rem,env(safe-area-inset-left))] py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 lg:px-8`) for notched-device polish without altering header/main composition.

### Added (Phase 15 — AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27 authentication & profile UX redesign)
- **`src/account/profile.ts`** — pure profile helpers: `deriveInitials`, `normalizeDisplayName`, `validateAccentColor`, `validateAvatarUrl`, `pickInitialsGradient`, and `deriveProfileFromUser`. Allow-listed accent colors and a 200 KB hard cap for data-URL avatar fallbacks. No Supabase client, no React, no I/O — fully unit-testable.
- **`src/account/AuthModal.tsx`** — new single Auth dialog built on the existing `Dialog` primitive: two tabs (Magic Link / Email + Password), a sub-mode radio group for Sign in vs Create account, and **a single primary submit button whose label and action follow the active sub-mode**. Forgot Password is a three-step inline flow (form → send → confirmation). Auto-closes on successful authentication. Errors come exclusively through `classifyAuthError`.
- **`src/account/AccountBadge.tsx`** — global signed-in / Guest indicator rendered inside the existing `Layout` header on every route. Shows avatar (image if uploaded, otherwise initials on a deterministic gradient) + display name / email when signed in; "Guest · Sign in to sync" pill when anonymous; "Guest · sync unavailable" quiet hint when Supabase is unconfigured. Mobile-first (avatar-only under `sm`, full label at and above `sm`).
- **`src/account/ProfilePanel.tsx`** — new `Dialog`-based profile editor for display name (≤ 50 chars), allow-listed accent color, optional Supabase Storage avatar upload (PNG/JPEG/WebP under 200 KB) gated on a runtime probe of an `avatars` bucket. Falls back gracefully to the initials avatar when no bucket is present; **never throws to the caller**.
- **Auth helper surface in `src/account/auth.ts`** (additive):
  - `classifyAuthError(error, action)` returns one of a closed set of safe, user-facing strings ("Email or password is incorrect.", "That email is already registered. Try signing in instead.", "Please confirm your email before signing in.", "Too many attempts — please wait a minute and try again.", "Network unavailable — please try again.", "That email address does not look valid.", and per-action defaults). No raw Supabase error strings ever reach the UI.
  - `sendPasswordResetEmail(client, email)` wraps `supabase.auth.resetPasswordForEmail` with `window.location.origin` as the `redirectTo` when available; returns a sanitized success/failure envelope.
  - `updateProfile(client, { displayName?, accentColor?, avatarUrl? })` wraps `supabase.auth.updateUser({ data })`. Validates inputs via `profile.ts`; rejects unsafe avatar URLs (no `javascript:`, no `http:`, no oversized data URLs); supports clearing display name with the empty string.
  - `hasAvatarStorage(client)` + `uploadAvatar(client, { contentType, data, userId })` — runtime Storage probe and user-scoped upload to `avatars/{userId}/avatar.{ext}` with sanitized id. Never surfaces raw provider errors.
  - `AuthUserSummary.profile` now carries the derived `{ accentColor, avatarUrl, displayName, email, gradient, initials, label }` so the badge and panel render without re-deriving on every mount.
- **`src/app/App.tsx`** wires the new modal/profile state, threads `onOpenAuthModal` / `onOpenProfilePanel` through `RoutePanel` to Settings, renders `AccountBadge` in the header (inside the existing `navigation` slot), and renders `AuthModal` + `ProfilePanel` at the layout root. `handleSendMagicLink` now routes its failure path through `classifyAuthError`. After a successful `updateProfile`, `getCurrentAuthState` is re-read so `AccountBadge` reflects the new metadata immediately.
- **`src/account/Settings.tsx`** adds "Sign in / Create account" (anonymous) and "Manage profile" (authenticated) buttons that open the new modals. The existing inline `AuthPanel` continues to render on Settings as a fallback. **No file is removed; no test is weakened.**
- **62 new unit tests** across `src/account/profile.test.ts` (21), `src/account/authHelpers.test.ts` (27), `src/account/AuthModal.test.tsx` (6), `src/account/AccountBadge.test.tsx` (4), and `src/account/ProfilePanel.test.tsx` (4). Component tests use `react-dom/server`'s `renderToStaticMarkup` (no new DOM testing dependency added). **Total: 256 tests passing.**

### Fixed (Phase 15 — AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27)
- **Duplicate "Create account" buttons on mobile** in `src/account/AuthPanel.tsx`: the Email + Password sub-mode toggle is now a real `role="radiogroup"` with `aria-checked` radios, distinct from a single primary submit button whose label follows the active sub-mode. The visual duplicate-CTA pattern is gone on every viewport, while the existing `AuthPanel` API and all wired handlers remain unchanged.
- **Generic "Unable to create an account right now" error** now routed through `classifyAuthError`, which maps known Supabase error patterns (rate limit, network failure, already-registered, unconfirmed email, invalid credentials, weak password, invalid email) to specific, friendly messages.
- **No global signed-in / Guest indicator** before Phase 15 — `AccountBadge` is now rendered on every route (Home, og daily, go daily, Practice, Word Explorer, Feedback, Stats, Settings, Admin).

### Documentation (Phase 15)
- Appended Section 20 (Phase 15) plan addendum to `AGENT-IMPLEMENTATION-PLAN.md`.
- `docs/supabase.md`: appended an additive note on enabling the optional `avatars` Storage bucket for image avatars (initials-avatar path requires no setup).
- Added `progress/PROGRESS-STEP-22.md` and appended `phase_id = 22` row to `progress/PROGRESS.csv`.

### User action required (Phase 15)
- **Supabase**: confirm the Email + Password provider is enabled (carried over from Phase 13.5) and that the password-reset email template is configured.
- **Supabase (optional, for image avatars)**: create a public Storage bucket named `avatars` with RLS that allows each authenticated user to read/write only paths under `auth.uid()/*`. Without this bucket, brrrdle silently falls back to the initials avatar.
- **Supabase**: continue to maintain `raw_app_meta_data.role = "admin"` for admin users (carried over from Phase 14).
- **Vercel**: no env var changes; `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are still the only required client-side variables.

### Fixed (Phase 14 — DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27 admin tab regression)
- **Admin tab now renders actionable manual-refresh controls** for users whose Supabase account has the admin role. The existing descriptive paragraphs are preserved verbatim and are now joined by a "Refresh now" button, an `aria-live="polite"` `role="status"` region, and a structured read-out of `revision`, `generatedAt`, `fetchedAt`, length count, and `persistence.status`. The button is disabled while a request is in flight and after a success until the operator explicitly re-arms, preventing accidental double-refresh. Source: `src/admin/ManualRefreshControls.tsx`, `src/admin/AdminPanel.tsx`.
- **Hardened admin-role detection** in `src/account/auth.ts::getRoles` to accept admin from any of `app_metadata.roles[]`, `app_metadata.role`, `raw_app_meta_data.roles[]`, or `raw_app_meta_data.role`, deduplicated. The function still returns `readonly string[]`, never throws on missing/`null` shapes, and continues to feed `summarizeUser → AuthUserSummary.roles` as the single source the UI consults. A new pure helper `isAdminUser(user)` returns `true` iff any of those four sources resolves to `"admin"`.
- **Forced fresh session after sign-in / sign-up so the Admin tab updates immediately.** `signInWithPassword` and `signUpWithPassword` now invoke a private best-effort `refreshSession()` after a successful Supabase call (a thrown refresh is swallowed; the user is not signed out and the bearer token is never logged). `subscribeToAuthChanges` now opportunistically re-derives the listener payload via `getCurrentAuthState(client)` on `SIGNED_IN` / `TOKEN_REFRESHED` / `USER_UPDATED` events, debounced to one in-flight refresh at a time. Both auth flows (magic link and email + password) flow through the same listener, so no flow-specific code was added. Source: `src/account/auth.ts`.

### Added (Phase 14 — DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27 admin tab regression)
- `src/admin/manualRefresh.ts` — pure client helper `requestAdminRefresh({ supabase, fetchImpl?, endpoint? })` that POSTs to `/api/admin-refresh` with `Authorization: Bearer <access_token>` and `accept: application/json` (no body), parses the JSON response, and returns a discriminated union (`{ ok: true, … }` on HTTP 202, otherwise `{ ok: false, reason: 'missing-session' | 'unauthorized' | 'forbidden' | 'server-error' | 'network-error', status?, message?, stage? }`). The bearer token is never logged, never persisted, and never included in the returned payload.
- `src/admin/ManualRefreshControls.tsx` — accessible UI component that calls `requestAdminRefresh` via prop-injected Supabase client (testable with a client double).
- `src/admin/index.ts` re-exports the new module and component.
- `src/app/App.tsx` threads the existing `supabaseClient` memo through `RoutePanel` to `AdminPanel`. No new effects, state, or callbacks were required.
- 27 new unit tests across `src/account/auth.test.ts`, `src/admin/authorization.test.ts`, `src/admin/manualRefresh.test.ts`, and `src/admin/ManualRefreshControls.test.tsx`. Total: 194 tests passing, 0 removed or weakened. Component-render tests use `react-dom/server`'s `renderToStaticMarkup` so no new DOM testing dependency was added.

### Documentation (Phase 14 — DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27 admin tab regression)
- Added `progress/PROGRESS-STEP-20.md` (Phase 14.0 pre-flight & reproduction map) and `progress/PROGRESS-STEP-21.md` (Phase 14.1 implementation & verification).
- Appended `phase_id = 20` and `phase_id = 21` rows to `progress/PROGRESS.csv`.

### User action required (Phase 14)
- **Supabase**: confirm at least one user has `raw_app_meta_data.role = "admin"` set in the dashboard or via the admin API; confirm the Email + Password provider remains enabled (carried over from Phase 13).
- **Vercel**: **no action required**; `SUPABASE_URL` and `SUPABASE_ANON_KEY` (or their `VITE_`-prefixed counterparts) must continue to be set so `/api/admin-refresh` can validate the bearer token.
- **GitHub Actions / Pages / labels**: **no action required**.
- **Browser session hygiene** (recommended once after deploy): existing admin users should sign out and back in once so the locally cached JWT is replaced and the `raw_app_meta_data` claim minted before the deploy is immediately re-read.

### Added (ADDITIONS-2026-05-27 — Phase 13 execution)
- **Word Explorer tab** (`src/wordExplorer/`): new public route with length selector (default 5, range 2–35), live case-insensitive search, two combinable type checkboxes ("Show Answers" / "Show Valid Guesses"), sortable Word/Type columns, per-row copy-to-clipboard button, responsive single-column card layout on small screens, empty-state with `"<term>" is not in the current <N>-letter word list.` message and a "Request this word" button that opens a pre-filled GitHub Issue (`word-request` label) in a new tab.
- **Feedback tab** (`src/feedback/`): new public route with a category dropdown (Bug Report / Feature Request / Other), required description (2,000-char limit), optional details and optional email fields, and a submit button that opens a pre-filled GitHub Issue (`feedback` plus category-derived labels) in a new tab. Nothing is sent automatically; the user reviews the issue on github.com before submitting.
- **Sound Effects** (`src/sound/`): minimal, dependency-free Web Audio engine with six events (`tile-flip`, `correct-guess`, `game-over-win`, `game-over-loss`, `keyboard-click`, `invalid-guess`), Settings toggle (On by default, persisted to `localStorage` under `brrrdle:sound-effects-enabled`), full no-op when toggled off, graceful no-op when Web Audio is unavailable. Wired into the og and go game flows for keyboard clicks, tile flips, invalid guesses, correct guesses, and win/loss tones.
- **Authentication improvements** (`src/account/`): `AuthPanel` now offers a magic-link / email + password toggle, with sub-modes for sign-in and create-account, a show/hide-password toggle, password length validation (≥ 8 chars), and an accessible error/info message line. `App.tsx` now subscribes to Supabase `onAuthStateChange` so the UI reflects session changes from any tab. Admin detection continues to use `app_metadata.role === "admin"` (which maps to Supabase `raw_app_meta_data.role`) or the existing `app_metadata.roles` array.
- **GitHub Issue helper** (`src/lib/githubIssue.ts`): shared, percent-encoded URL builders for both Word Explorer word-requests and the Feedback tab.
- **Routes**: `src/app/routes.ts` adds `word-explorer` and `feedback` between Practice and Definitions/Stats/Settings/Admin per ADDITIONS-2026-05-27.md §1 navigation order. No existing route was removed.
- **Tests**: 43 new unit tests (`src/lib/githubIssue.test.ts`, `src/wordExplorer/wordExplorerData.test.ts`, `src/sound/soundEngine.test.ts`, `src/account/auth.test.ts`). Total: 163 tests passing.

### Changed (ADDITIONS-2026-05-27 — Phase 13 execution)
- **Repository organization follow-up**: moved playable game route panels into `src/app/games/`, physical keyboard gameplay helpers into `src/game/input/`, and daily in-progress session storage into `src/game/storage/`; added README files for the new folders and refreshed the root repository tree. This is behavior-preserving and does not change Vercel routes, Supabase configuration, GitHub Actions, the daily 5-letter lock, or practice 2–35 support.
- Follow-up hardening aligned the primary navigation with the exact approved top-level order (`og`, `go`, `Practice`, `Word Explorer`, `Feedback`, `Settings`, `Admin`) and keeps the Admin entry hidden unless the signed-in user has the Supabase admin role.
- Word Explorer now attempts the live `/api/word-lists/manifest` read path first and falls back to bundled dictionaries when no live manifest or length file is available, preserving the Vercel Blob / manifest → bundled JSON contract.
- Password auth errors shown in the UI are sanitized generic messages rather than raw Supabase provider strings.
- Feedback's optional email field is free-form text, matching the requirement that it is optional and not externally validated.
- `src/app/App.tsx` now wraps the root in a `SoundProvider`, subscribes to Supabase auth changes via `subscribeToAuthChanges`, plays the win/loss tones when a game completes, and threads the new auth handlers and sound toggle into `Settings`.
- `src/account/Settings.tsx` adds an optional "Sound Effects" panel and passes the password/sign-up handlers through to `AuthPanel`.
- `src/account/auth.ts` adds `signInWithPassword`, `signUpWithPassword`, and `subscribeToAuthChanges` alongside the existing magic-link flow; the existing magic-link behavior is unchanged.
- `src/app/games/OgGame.tsx` and `src/app/games/GoGame.tsx` consume the sound engine to emit `keyboard-click`, `tile-flip`, `invalid-guess`, and `correct-guess` events at the minimum surface area required by ADDITIONS-2026-05-27.md §3.

### Documentation (Plan Addendum — DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27)
- Drafted a new Section 19 ("Phase 14 — Plan Addendum (DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27): Fix the Admin Tab") at the end of `AGENT-IMPLEMENTATION-PLAN.md`. The addendum is scoped strictly to the Admin-tab regression. It diagnoses the root cause (the allowed branch of `src/admin/AdminPanel.tsx` renders only descriptive copy, with no `/api/admin-refresh` button, so even correctly-detected admins see the static "PROTECTED ADMIN / Manual refresh controls / Manual refresh requests must be sent…" paragraphs), and plans a minimal, non-deleting fix that (a) renders an actionable "Refresh now" button plus a live status region inside the existing allowed branch via a new `ManualRefreshControls` component, (b) hardens `src/account/auth.ts` admin-role detection to accept admin from any of `app_metadata.roles[]`, `app_metadata.role`, `raw_app_meta_data.roles[]`, or `raw_app_meta_data.role`, and (c) forces a best-effort `supabase.auth.refreshSession()` after successful sign-in/sign-up and on `SIGNED_IN` / `TOKEN_REFRESHED` / `USER_UPDATED` so the Admin tab updates immediately for both the magic-link and the email + password flows. The addendum is split into Phase 14.0 (pre-flight & reproduction map) and Phase 14.1 (the surgical fix), each with verification commands, manual diagnostic console snippets, smoke checks, and a halt-for-approval gate after every step.
- Bumped the implementation plan header to version 1.4 to record the new addendum.
- Updated `progress/PROGRESS-STEP-19.md` with a note that the addendum has been drafted and that implementation has not yet begun.
- No source code, route table, server route, configuration file, or test was modified by this addendum-drafting step. No file was deleted or renamed.

### Documentation (Plan Addendum — ADDITIONS-2026-05-27)
- Drafted a new Section 18 ("Phase 13 — Plan Addendum (ADDITIONS-2026-05-27)") at the end of `AGENT-IMPLEMENTATION-PLAN.md` covering the Word Explorer tab, Feedback tab, Sound Effects, Authentication Improvements (email + password alongside magic link, durable session, admin role detection from `raw_app_meta_data.role === "admin"`), and a safe, non-destructive Repository Cleanup & Re-organization. The addendum is broken into clear phases (13.0 Pre-flight & Risk Map, 13.1 Cleanup, 13.2 Word Explorer, 13.3 Feedback, 13.4 Sound Effects, 13.5 Authentication, 13.6 Final Integration) with per-step verification commands, explicit manual follow-up notes (Supabase password-auth enablement, GitHub label creation, conditional Vercel reconfiguration), and a halt-for-approval gate after every step.
- Bumped the implementation plan header to version 1.3 to record the addendum.
- Appended a new `phase_id = 18` row to `progress/PROGRESS.csv` noting that the addendum is drafted and awaiting explicit user approval; no implementation work has begun.
- Added `progress/PROGRESS-STEP-18.md` summarizing the addendum, the required user actions, and the next major step (Phase 13.0).

### Known limitations (ADDITIONS-2026-05-27 — Phase 13 execution)
- **Repository Cleanup (Phase 13.1)** was executed conservatively. The existing `src/` layout already groups code by concern (`game/`, `ui/`, `account/`, `admin/`, `data/`, `definitions/`, `app/`, `lib/`, `pwa/`, `stats/`, `types/`, `test/`); the new feature modules (`src/wordExplorer/`, `src/feedback/`, `src/sound/`) were added as new sibling directories under that same convention. No existing files were moved, renamed, or deleted, so no Vercel/Supabase/GitHub Actions reconfiguration is required. A larger structural reorganization can be performed in a follow-up plan addendum if desired.
- **Sound Effects** uses synthesized Web Audio tones only; no asset files were added under `public/sounds/`, so the PWA service worker cache list does not need to change.
- **Authentication** changes are end-to-end-verifiable only against a Supabase project with **Email + Password** auth enabled in the Auth providers settings; the agent sandbox cannot complete that step (see "User action required" below).

### User action required (ADDITIONS-2026-05-27 — Phase 13 execution)
- **Supabase**: enable the **Email + Password** provider in the project's Authentication settings; configure password-reset / confirmation email templates as desired. At least one user must have `raw_app_meta_data.role = "admin"` for end-to-end admin verification.
- **GitHub labels**: create `word-request`, `feedback`, `bug`, and `enhancement` labels on `ryanjosephkamp/brrrdle` if they do not already exist (the pre-filled issues request these labels).
- **Vercel**: no env-var or routing change is required; no `api/` path or `vercel.json` entry was modified in this phase.

### Fixed (Residual Vercel discriminated-union TypeScript narrowing — 2026-05-27)
- Fixed the new Vercel TypeScript narrowing errors reported after `VERCEL-REDEPLOY-BUILD-LOGS-2026-05-26.md` and `DIAGNOSIS-REPORT-2026-05-26.md` by adding explicit type guards for `RefreshResult`, `SchemaValidationResult`, `LoadWordListResult`, and `WordRepositoryResult`, then using them at the failure-only field access sites in the data layer and refresh API routes.

### Fixed (Residual Vercel TypeScript build errors — 2026-05-27)
- Fixed the residual NodeNext/Node16 TypeScript errors shown in `VERCEL-REDEPLOY-BUILD-LOGS-2026-05-26.md` and diagnosed by `DIAGNOSIS-REPORT-2026-05-26.md` by making the remaining `src/data/` barrel and module imports Vercel-compatible with explicit `.js` extensions.
- Added `type: "json"` import attributes to bundled word-list and bundled-source JSON imports so Vercel's serverless TypeScript pass accepts the same JSON imports that the app build consumes.
- Tightened `loadWordList.ts` length-resolution typing so the failure branch cannot be inferred as a successful result missing `wordList`.

### Fixed (Phase 12 — Updated Diagnosis Report 2026-05-26)
- Verified that the build, lint, test, and standalone `tsc -p tsconfig.api.json --noEmit` checks all pass locally with zero TypeScript errors across the app, node, and api project references. The TypeScript build errors described in the updated diagnosis report (missing `.js` extensions, missing barrel re-exports from `src/data/index.ts`, JSON import attribute issues, `loadWordList.ts` type mismatch) are no longer reproducible from the current `main`, indicating that the residual Vercel failures originated from a stale Vercel build cache rather than from any unresolved source defect; trigger a clean Vercel rebuild against the latest commit to pick up the fix.
- Added `src/data/practiceLengthCoverage.test.ts` to lock in the practice length contract: `loadBundledWordList` returns `ok` and a non-empty `validGuesses`/`answers` set for every length 2..35, the canonical `validateGuess` accepts a representative real bundled word at lengths 2, 5, 12, and 20, and clearly invalid strings are still rejected. This is the regression suite for the "practice mode dropdown shows only 2/5/35" and "valid words rejected as not in list" symptoms.
- Confirmed that no Phase 9 debug surface remains in `src/`. The "polish ready" floating toast, the "Phase 9 polish" sidebar `Panel`, and the "Phase 9 shell notes" `Dialog` mounts were removed in the previous Phase 12 pass; the underlying `ToastRegion`, `Panel`, and `Dialog` UI primitives stay available in `src/ui/` for future gameplay use.
- Re-verified that `@vercel/blob` is not present in the client bundle (`dist/assets/*.js`) and that the Vercel Blob–backed word-list store retains its atomic-swap and skip-when-unconfigured behavior with no regressions.

### Known limitations
- The bundled word lists for lengths 23–35 still ship deterministic synthetic placeholders rather than real English dictionary slices, because Hugging Face hosts are not reachable from the agent sandbox and a refresh against `https://huggingface.co/datasets/ryanjosephkamp/english-openlist/resolve/main/latest/brrrdle/` could not be performed locally. The selector exposes these lengths per the BRRRDLE-SPEC §3.1 practice range, but they will only contain authoritative content after the scheduled Vercel Cron route or the protected admin refresh runs with `CRON_SECRET` and `BLOB_READ_WRITE_TOKEN` configured. This limitation is recorded in `progress/PROGRESS-STEP-15.md`.

## Previous Unreleased

### Fixed (Phase 12 — Diagnosis Report 2026-05-26)
- Fixed Vercel TypeScript build errors in `api/` by adding a dedicated `tsconfig.api.json` project reference (bundler-mode resolution, `types: ["node"]`, strict flags matching the app config) so `npm run build` (`tsc -b && vite build`) now type-checks the serverless functions locally with the same strictness Vercel applies in CI.
- Added explicit `.js` extensions to every relative import inside `api/_lib/vercelBlobStore.ts`, `api/_lib/wordListStore.ts`, `api/admin-refresh.ts`, `api/cron/refresh-word-lists.ts`, and `api/word-lists/manifest.ts`, satisfying both bundler- and NodeNext-style resolution and matching the recommendation in `DIAGNOSIS-REPORT-2026-05-26.md`.
- Reworked `VercelBlobWordListStore` to declare the auth-token field explicitly instead of using a TypeScript parameter property, restoring compatibility with the repository-wide `erasableSyntaxOnly` lint posture.
- Removed the floating "polish ready" Phase 9 debug toast, the "Phase 9 polish" sidebar panel, and the "Phase 9 shell notes" dialog from `src/app/App.tsx`. The reusable `Dialog`, `LoadingState`, and `ToastRegion` UI primitives remain in `src/ui/` for future use; only the temporary debug payload and its mount sites were removed so the production shell renders cleanly.
- Expanded the bundled word list catalogue to cover every supported practice length 2–35 (`src/data/bundled/words_length_<N>.json`). Lengths now ship real dictionary content where available (lengths 2–18) and deterministic synthetic placeholders for the long-tail lengths (19–35), so the practice length selector exposes the full Spec range and "word not in list" no longer mis-rejects valid guesses at previously unbundled lengths.
- Updated `getAvailableOgPracticeLengths()` and `getAvailableGoPracticeLengths()` to drive the selector off `SUPPORTED_PRACTICE_WORD_LENGTHS` intersected with `BUNDLED_WORD_LIST_LENGTHS`, so the UI reflects the canonical 2–35 contract rather than only the legacy three-length seed set.
- Refreshed the affected unit tests (`src/data/loadWordList.test.ts`, `src/data/cache.test.ts`, `src/data/updateCheck.test.ts`, `src/data/wordRepository.test.ts`, `src/game/og/session.test.ts`, `src/game/go/session.test.ts`) to assert the new 34-length bundled catalogue.

### Added
- Added a vendor-neutral `WordListStore` abstraction (`src/data/refreshStore.ts`) with atomic-swap semantics, plus reusable `InMemoryWordListStore` and `FailingInMemoryWordListStore` test doubles and a `projectManifest` helper that maps a refresh result onto the served-manifest shape.
- Added a production Vercel Blob persistence driver (`api/_lib/vercelBlobStore.ts`) using `@vercel/blob`. The driver uploads every length file under `word-lists/<revision>/words_length_<n>.json` first, then atomically swaps the `word-lists/manifest.json` pointer; per-length upload failures abort before the pointer is touched so the previously-served manifest stays intact.
- Added a server-side store factory (`api/_lib/wordListStore.ts`) that selects the Vercel Blob driver when `BLOB_READ_WRITE_TOKEN` is configured and otherwise returns a clearly-reasoned `skipped` status, keeping the cron pipeline safe in unconfigured environments.
- Wired `api/cron/refresh-word-lists.ts` and `api/admin-refresh.ts` to invoke `store.atomicSwap()` after a successful refresh; persistence outcomes (`swapped`, `skipped`, `failed`) are surfaced in the response and logged. Persistence failure returns `502` so a partial state cannot be reported as success.
- Added the public read endpoint `GET /api/word-lists/manifest` that returns the currently-served manifest (or `{ manifest: null }` when persistence is not configured) with a short cache for cheap polling.
- Added unit tests `src/data/refreshStore.test.ts` covering manifest projection, the empty-store initial state, the upload-then-swap discipline, prior-revision tracking on subsequent swaps, and the atomic-rollback contract on simulated per-length failure.
- Added `@vercel/blob@^2.4.0` as a server-only dependency (used exclusively by `api/_lib/vercelBlobStore.ts`; build output confirmed not present in the client bundle).
- Documented production deployment-environment configuration steps for `CRON_SECRET` and `BLOB_READ_WRITE_TOKEN` in `docs/deployment.md`, including a step-by-step setup walkthrough and an updated production verification checklist that includes the new `GET /api/word-lists/manifest` route. Added `BLOB_READ_WRITE_TOKEN` to `.env.example`.

### Added (Hugging Face source integration — plan v1.2 amendment)
- Added Hugging Face word-list source integration: `src/data/huggingFaceSource.ts` defines the dataset (`ryanjosephkamp/english-openlist`), the `latest/brrrdle/` folder, the 34 expected length-indexed dictionaries (lengths 2–35), per-length URL builders, and a `RemoteWordListMetadata` projection of the dataset's current revision.
- Added the shared atomic `refreshWordListsFromHuggingFace` pipeline in `src/data/refresh.ts`. The pipeline fetches each length file via an injected `fetchJson`, validates against the existing word-list schema, accepts either full schema-shaped payloads or flat string-array payloads, and returns all-or-nothing success so the caller can perform an atomic swap into production storage.
- Added the scheduled Vercel Cron route `api/cron/refresh-word-lists.ts`, configured in `vercel.json` to run daily at `0 0 * * *` (00:00 UTC). The route verifies `Authorization: Bearer ${CRON_SECRET}`, fetches the current Hugging Face dataset revision, runs the shared refresh pipeline, and returns validated dictionaries (with per-length counts) or per-length failure detail.
- Wired `api/admin-refresh.ts` to invoke the same refresh pipeline after Supabase admin authorization succeeds, so manual and scheduled refreshes share one fetch/validate path.
- Recorded the bundled snapshot's Hugging Face dataset, folder, revision, and note in `src/data/bundled/source.json` and exposed it as `BUNDLED_SOURCE` from the data layer.
- Added `CRON_SECRET` to `.env.example` and documented the upstream dataset, the cron schedule, the UTC timezone default plus override instructions, persistence-layer guidance, and the expanded production verification checklist in `docs/deployment.md`.
- Added unit tests `src/data/huggingFaceSource.test.ts` and `src/data/refresh.test.ts` covering URL construction, the 34-length expectation, malformed dataset info, all-success refresh, flat-array payload coercion, per-length schema failure, and per-length network failure (atomic abort).

### Added (prior unreleased entries)
- Added v1 production release preparation documentation for Vercel deployment, environment variable handling, PWA assets, and the protected `/api/admin-refresh` route.
- Added Phase 11 Pay-to-Continue gameplay integration for `og` and `go` losses plus final release-readiness documentation updates.
- Added Phase 10 GitHub Pages/Jekyll documentation foundation, deployment guide, and updated setup/Supabase/admin docs.
- Added Phase 9 emoji sharing, PWA manifest/icons/service worker, reduced-motion-aware tile animations, accessibility refinements, and responsive polish.
- Added Phase 8 optional Supabase accounts, cloud sync foundations, RLS migration, danger-zone settings helpers, and protected admin authorization surfaces.
- Added Phase 7 local guest persistence, XP/level/coin progression, consumable and Pay-to-Continue economy calculators, and statistics dashboard.
- Added Phase 6 post-game definitions with bundled lookup, Dictionary API and Wiktionary fallbacks, and Google define-search buttons.
- Added Phase 5 go daily and practice gameplay with five-puzzle chains, carry-over pre-filled rows, daily persistence, and hard mode support.
- Added Phase 4 og daily and practice gameplay with deterministic daily selection, local daily persistence, hard mode, and playable keyboard-driven UI.
- Added Phase 3.3 physical keyboard normalization, on-screen keyboard component, keyboard-state derivation, and shell preview plumbing.
- Added Phase 3.2 dark-first UI tokens, reusable button/panel/dialog/toast/status primitives, and accessibility-focused shell states.
- Added Phase 3.1 app shell with minimal route definitions, layout, navigation, and mode-selection placeholders.
- Added Phase 2 bundled word-list data layer with schema validation and seed data.
- Added length-indexed repository APIs for answers, valid guesses, and bundled definitions.
- Added remote metadata update checks plus data status and cache/fallback helpers.
- Added Phase 2 data-layer unit tests.
- Added Phase 1 UI-independent core game engine domain types and constants.
- Added canonical Wordle-style tile coloring with duplicate-letter accounting.
- Added guess validation, hard-mode constraints, and puzzle session state transitions.
- Added Vitest unit tests for Phase 1 game engine behavior.
- Initialized Phase 0 React, TypeScript, Vite, and Tailwind CSS scaffold.
- Added baseline project directories for future implementation phases.
- Added Vercel, environment, README, and GitHub Pages/Jekyll documentation foundations.
- Moved progress tracking files into `progress/` for phase-by-phase implementation tracking.
