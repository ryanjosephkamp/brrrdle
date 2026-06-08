# brrrdle Multi-Agent Workflow Guide

**Status**: Coordination handbook for Phase 23 and later work.
**Authority**: Supporting guidance only. If this file conflicts with `CONSTITUTION.md`, `AGENT-IMPLEMENTATION-PLAN.md`, an approved phase spec, or current user instructions, follow the higher-authority source and report the conflict.

## 1. Purpose

This file explains how a coordinating Codex agent and parallel sub-agents should divide work, avoid conflicts, hand off results, and integrate changes in `brrrdle`.

The project now has enough parallelizable work that a clear coordination layer is useful. The goal is faster development without weakening the existing review gates, phase gates, verification rules, or user-approval requirements.

## 2. Current Phase Gate

- Active project area: Phase 23, Multiplayer Foundations and Polish.
- Stage 1 is complete and tracked as `phase_id = 69`.
- Stage 2 planning is documented and tracked as `phase_id = 70`.
- Multi-agent scaffolding is tracked as `phase_id = 71`.
- Stage 2 implementation is complete and verified under `phase_id = 72`.
- Stage 3 planning is documented under `phase_id = 73`.
- Stage 3 implementation is complete under `phase_id = 74`.
- Stage 3 stabilization follow-up is complete under `phase_id = 76`.
- Next Stage 3 stabilization follow-up planning is documented under `phase_id = 77`.
- The §28.13 Stage 3 stabilization follow-up implementation is complete under `phase_id = 78`.
- Stage 4 planning for Daily Multiplayer fixes and Live spectator foundations is documented under `phase_id = 79`.
- Stage 4 implementation is complete under `phase_id = 80`.
- Stage 5 planning for multiplayer UX fixes and polish is documented under `phase_id = 81`.
- Stage 5 implementation is complete and verified under `phase_id = 82` through `phase_id = 85`.
- Stage 6 planning for Live Multiplayer stability and Daily claim fixes is documented under `phase_id = 86`.
- Stage 6 real multiplayer testing requirements and Stage 7 broad bug-bash planning are documented under `phase_id = 87`.
- Stage 6 implementation is complete and verified under `phase_id = 88` through `phase_id = 90`.
- Stage 6 safety backup to GitHub `main` is authorized/tracked under `phase_id = 91` as a one-time backup before Stage 7.
- Stage 7 implementation is authorized and opened under `phase_id = 92` as a broad bug-fix and stabilization pass.
- Stage 7 core stabilization fixes are tracked under `phase_id = 93`; full Stage 7 verification remains pending.
- Stage 7 final verification and handoff are tracked under `phase_id = 94`; further PRs, merges, releases, dedicated Multiplayer tab work, spectator expansion, redesign, deferred features, and later-phase work remain gated.
- Stage 8 planning for Multiplayer unification, Practice time limits, and memory/performance remediation is documented under `phase_id = 95`.
- Stage 8 implementation and verification are complete under `phase_id = 96`-`97`.
- Stage 9 implementation and verification for timed Practice Multiplayer fixes, Practice Hard Mode, and multiplayer scoring are complete under `phase_id = 99`-`100`.
- Stage 10 planning for unified Multiplayer debugging and bug fixes is documented under `phase_id = 101`; Stage 10 implementation and verification are complete under `phase_id = 102`-`103`.
- The verified post-Stage-10 state is backed up under `phase_id = 104` on branch `backup/phase-23-stage-10-final-2026-06-06` with Draft PR #18.
- Phase 23 Final Stabilization & Broad Debugging Pass planning is documented under `phase_id = 105`; execution and verification are complete under `phase_id = 106`-`109`.
- Stage 12 planning for Multiplayer Hard Mode enforcement and performance/responsiveness fixes is documented under `phase_id = 110`; implementation and verification are complete under `phase_id = 111` through `phase_id = 113`.
- Stage 13 planning for Practice solo UX bugs and Multiplayer GO result propagation is documented under `phase_id = 114`; execution and verification are complete under `phase_id = 115` through `phase_id = 117`.
- Stage 14 planning for post-Stage-13 polish, bug fixes, minimal Multiplayer tab foundations, and spectator foundation hardening is documented under `phase_id = 118`; execution and verification are complete under `phase_id = 119` through `phase_id = 121`.
- Stage 15 planning for GO transition polish and authenticated Practice seed fixes is documented under `phase_id = 122`; execution and final verification are complete under `phase_id = 123` through `phase_id = 125`.
- Stage 16 planning for Practice Multiplayer GO-only bug fixes is documented under `phase_id = 126`; execution is opened under `phase_id = 127`; focused Practice Multiplayer GO projection fixes are tracked under `phase_id = 128`; real two-client Supabase-backed E2E and remote cleanup are tracked under `phase_id = 129`; final verification and handoff are complete under `phase_id = 130`.
- Further PR creation, merges, release, full dedicated Multiplayer tab work, spectator expansion, deferred feature work, and later-phase work remain unauthorized until later explicit approval.

## 3. Authority Stack

Use this order when sources disagree:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `BRRRDLE-OVERVIEW.md`.
5. `AGENT-IMPLEMENTATION-PLAN.md`.
6. Approved phase-specific spec files referenced by the plan.
7. This `agents.md` guide.
8. `memory.md`.
9. Sub-agent notes, branch-local handoffs, and local implementation observations.
10. Existing code, only when it does not conflict with the above.

When in doubt, stop and ask the coordinating agent or user. Do not silently choose a lower-authority source.

## 4. Roles

### 4.0 Startup Checklist

Before accepting or assigning Phase 23 work, the coordinator should read:

- The current user prompt.
- `CONSTITUTION.md`.
- `AGENT-IMPLEMENTATION-PLAN.md` §28.
- `PHASE-23-MULTIPLAYER-FOUNDATIONS-AND-POLISH-SPEC-2026-06-03.md`.
- `progress/PROGRESS.csv`.
- The latest relevant progress reports, currently `progress/PROGRESS-STEP-106.md` through `progress/PROGRESS-STEP-130.md` for the final stabilization, Stage 12, Stage 13, Stage 14, Stage 15, and Stage 16 trail.
- This file and `memory.md`.

Sub-agents should read the subset named in their work packet and must always read this file before parallel work.

### 4.1 Coordinating Agent

The coordinating agent owns:

- Reading the current user prompt, constitution, plan, spec, progress CSV, and relevant progress reports.
- Choosing whether parallel work is appropriate.
- Assigning disjoint file or module ownership to sub-agents.
- Keeping Stage 2 and later gates enforced.
- Reviewing sub-agent diffs or reports before integration.
- Running final verification after integration.
- Updating `CHANGELOG.md`, `progress/PROGRESS.csv`, progress reports, `memory.md`, and this guide when needed.
- Halting for user review at every required gate.

The coordinating agent must not treat a sub-agent report as final verification. Integration verification must be rerun in the main working state.

### 4.2 Explorer Agent

Use an explorer for read-only questions:

- Map current code ownership.
- Find relevant tests.
- Summarize a spec or risk area.
- Identify likely conflicts before edits begin.
- Review a focused diff for scope or regression risk.

Explorer agents should not edit files unless the coordinating agent explicitly converts the task into a worker assignment.

### 4.3 Worker Agent

Use a worker only when the task is authorized and the write scope is clear.

Every worker must be told:

- The active phase and sub-stage.
- The exact files or modules it owns.
- The files or modules it must avoid.
- That other agents may be changing the repository.
- That it must not revert or overwrite changes it did not make.
- The verification commands it should run.
- The expected handoff format.

## 5. Work Packet Template

Every sub-agent assignment should include:

```md
## Work Packet

Phase/stage:
Authorization:
Source of truth:
Goal:
Owned files/modules:
Read-only files/modules:
Forbidden files/modules:
Expected behavior:
Verification to run:
Handoff format:
Stop conditions:
```

For implementation work, "owned files/modules" must be narrow and concrete. Avoid broad ownership such as "multiplayer" unless the task genuinely requires it and no parallel worker will touch the same area.

## 6. File Ownership and Conflict Rules

Only one writer should own a high-conflict surface at a time.

High-conflict surfaces:

- `src/app/`
- `src/account/`
- `src/calendar/`
- `src/daily/`
- `src/game/`
- `src/multiplayer/`
- `src/stats/`
- `src/ui/`
- `src/data/`
- `supabase/`
- `AGENT-IMPLEMENTATION-PLAN.md`
- `CONSTITUTION.md`
- `CHANGELOG.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`
- `memory.md`
- `agents.md`

If two tasks need the same file, sequence them. If sequencing is too slow, the coordinating agent must define an explicit integration plan before either task begins.

## 7. Recommended Parallelization Pattern

For large implementation stages, use a three-lane workflow:

- **Lane A - Domain and persistence**: framework-agnostic model, reducers, serialization, migrations, repository seams, and tests.
- **Lane B - UI and interaction**: panels, dialogs, navigation, responsive behavior, accessibility, and component tests.
- **Lane C - Verification and docs**: smoke-test scripts, regression audits, changelog/progress drafts, and final review checklists.

Keep Lane A and Lane B from editing the same React state wiring file at the same time. Usually the coordinator should own final `src/app/App.tsx` integration.

## 8. Phase 23 Stage 2 Suggested Work Slices

Stage 2 is now complete. The implemented slices were:

- Live match model and reducer in new `src/multiplayer/liveMultiplayer.ts` plus tests.
- Live repository seam and Supabase adapter design in `src/multiplayer/liveRepository.ts` or similar.
- Practice Live word-length selection screen in a dedicated component and tests.
- Live lobby/match UI panel in `src/multiplayer/LiveMultiplayerPanel.tsx`.
- Calendar and Practice entry-point wiring, owned by the coordinator or one tightly scoped worker.
- Supabase schema/RLS plan and migration, owned by one backend-focused worker.
- Browser smoke and responsive verification, owned by the coordinator after integration.

Do not expand the completed Stage 2 work into Stage 3 ELO/rating/scoring or PR/merge work before explicit approval.

## 8.1 Phase 23 Stage 3 Suggested Work Slices

Stage 3 implementation is complete. If follow-up fixes or optional Stage 4 work are later approved, preserve these disjoint lanes:

- **Rating domain lane**: `src/multiplayer/rating.ts` and tests for ELO, provisional ratings, bucket normalization, and idempotent transaction application.
- **Scoring domain lane**: `src/multiplayer/scoring.ts` and tests projecting explainable results from async/live OG and GO matches.
- **Matchmaking domain lane**: `src/multiplayer/matchmaking.ts` and tests for queue compatibility, wait-band widening, Daily UTC eligibility, no-self-match, and ranked/unranked split.
- **Supabase lane**: additive Stage 3 migration, RLS/RPC review, and `docs/supabase.md` updates for ratings, rating transactions, queues, and custom lobbies.
- **UI lane**: ranked queue/custom-game controls and multiplayer rating/stat summaries after domain shapes stabilize.
- **Coordinator lane**: App/Calendar/Practice/Stats integration, high-conflict docs/progress updates, and final verification.

Keep `src/app/App.tsx`, `src/calendar/CalendarPanel.tsx`, `src/account/storageSchema.ts`, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` coordinator-owned unless work is explicitly sequenced.

Do not use Stage 3 follow-up work to add leaderboards, social graph, public profiles, economy rewards, or broader competitive systems unless a later user prompt approves that scope.

### Phase 23 Stage 9 Coordination Notes

Stage 9 is complete under `phase_id = 100`. Future multiplayer work must preserve these invariants unless a higher-authority spec explicitly changes them:

- Unified Multiplayer games keep per-player `playerSessions`; UI and gameplay workers should use `getMultiplayerSessionForPlayer` for viewer boards.
- The shared `serializedSession` remains compatibility/answer plumbing and must not become the source of truth for a specific player's board.
- Timed Practice expiration is viewer-owned for the authenticated active player, and repository saves must continue guarding against stale projections that drop moves.
- Supabase row creation uses duplicate-safe upsert semantics to avoid recoverable `409` console/network noise during create/join races.
- Practice Hard Mode is Practice-only, creator-selected before join, and copied into canonical sessions. Daily Multiplayer must not expose or persist Practice Hard Mode or Practice time-limit controls.
- Multiplayer scoring is deterministic and per-player; do not introduce rival-performance penalties or ELO/rating rule changes without explicit scope.

Coordinator-owned high-conflict surfaces for any follow-up: `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, `src/multiplayer/MultiplayerGameSurface.tsx`, `src/multiplayer/MultiplayerPanel.tsx`, `src/multiplayer/scoring.ts`, `src/app/App.tsx`, and all progress/changelog/memory files.

### Phase 23 Stage 10 Coordination Notes

Stage 10 planning is documented under `phase_id = 101` from `PHASE-23-STAGE-10-MULTIPLAYER-DEBUGGING-AND-BUGFIXES-SPEC-2026-06-06.md`. Implementation and verification are complete under `phase_id = 102`-`103`.

Durable Stage 10 decisions:

- `MultiplayerGameSurface` may render display-only shared move projections from durable `game.moves` so both players see submitted letters and keyboard states.
- `playerSessions` remain canonical and player-owned for validation/mutation. Do not copy one player's submitted guess into the rival's canonical session to make it visible.
- The shared `serializedSession` remains compatibility/answer plumbing only.
- Timed Practice clock ticks must checkpoint `timeRemainingMs` and `turnStartedAt` together.
- Timed Practice clock-only saves must not reset a typed local draft.
- Daily Multiplayer remains strictly asynchronous, no-clock, no-Hard-Mode-lobby-control, five-letter, UTC-day keyed, answer-separated, and claim-safe.
- Do not use Stage 10 follow-up work to implement the dedicated Multiplayer tab, expand spectators, add notifications, add bots/social features, redesign the app, or change scoring/rating rules.

Coordinator-owned high-conflict surfaces for future multiplayer debugging: `src/app/App.tsx`, `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, `src/multiplayer/MultiplayerGameSurface.tsx`, `src/multiplayer/MultiplayerPanel.tsx`, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md`.

### Phase 23 Stage 12 Coordination Notes

Stage 12 planning is documented under `phase_id = 110`; execution and verification are complete under `phase_id = 111` through `phase_id = 113` from `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md`.

Stage 12 was targeted bug-fix/stabilization only:

- Practice Multiplayer Hard Mode enforcement during real gameplay.
- Multiplayer turn propagation latency.
- Lobby creation/join latency.
- On-screen keyboard responsiveness.
- Sound effects not playing when enabled.

Future follow-up must preserve the Stage 12 decisions: shared submitted moves constrain Practice Multiplayer Hard Mode validation without copying moves into the rival's canonical session; multiplayer keyboard updates use functional draft state; multiplayer sound calls are wired from persisted move/status changes and user input; suspended AudioContexts are resumed only from user-triggered playback; unchanged participant projections are skipped to reduce realtime churn.

Suggested lanes if parallelized:

- **Hard Mode domain lane**: `src/multiplayer/multiplayer.ts`, canonical validation wiring, and focused regressions.
- **Repository/latency lane**: `src/multiplayer/multiplayerRepository.ts`, stale-save/reconciliation timing, Supabase subscription behavior, and row probes.
- **UI responsiveness lane**: `src/multiplayer/MultiplayerGameSurface.tsx`, `src/multiplayer/MultiplayerPanel.tsx`, shared keyboard components, and browser checks.
- **Sound lane**: sound provider/engine, Settings toggle wiring, and gameplay call sites.
- **Coordinator lane**: `src/app/App.tsx`, high-conflict integration, progress/changelog/memory updates, real E2E, resource checks, preview, and final handoff.

Keep `src/app/App.tsx`, `src/multiplayer/`, shared keyboard components, sound-related files, and all governance/progress surfaces single-writer or explicitly sequenced. Resource caution is required: use one dev server, minimal browser contexts, sequential heavy gates, and periodic process/memory checks.

Stage 12 preserved Daily Multiplayer as strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe. Do not use Stage 12 follow-up work to add features, change scoring/rating rules, broaden architecture, create a PR, merge, or release.

### Phase 23 Stage 13 Coordination Notes

Stage 13 planning is documented under `phase_id = 114` from `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md`. Execution and verification are complete under `phase_id = 115` through `phase_id = 117`.

Stage 13 is a strict three-bug pass:

- Practice solo submitted rows must stop re-playing flip/reveal animations on later on-screen keyboard input.
- Practice solo must show the normal post-game results view after win/loss instead of immediately starting a new puzzle.
- Multiplayer GO solved-puzzle results must briefly show the all-green row to both players, then advance both clients together to the next puzzle or final definitions.

Execution used small focused changes with verification after each logical fix. Bug 1 was reproduced in-browser before fixing. Bug 3 has domain/component coverage plus temporary-account browser attempts; the browser sign-in path worked, but host-created Practice GO rows did not persist in this harness, so future agents should not overstate Stage 13 as a fully clean create/join/submit browser-save E2E pass. Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, stale-save protection, and row-write reduction must remain protected in later work.

Suggested execution lanes if later authorized:

- **Practice post-game lane**: `src/app/games/OgGame.tsx`, `src/app/games/GoGame.tsx`, solo session creation/resume helpers, and Practice Play Again/New Game handling.
- **Practice animation lane**: shared board/tile animation props, keyboard input handling, and Daily-vs-Practice render keys.
- **Multiplayer GO propagation lane**: `src/multiplayer/multiplayer.ts`, `src/multiplayer/MultiplayerGameSurface.tsx`, GO puzzle-index/session projection, timing, and tests.
- **Regression verification lane**: Practice solo browser smoke, real two-client Multiplayer GO E2E, Stage 12 Hard Mode/sound/keyboard checks, Daily Solo non-regression, Daily Multiplayer invariant checks, responsive/resource smoke.
- **Coordinator lane**: `src/app/App.tsx` if needed, high-conflict integration, progress/changelog/memory updates, final gate, Vercel preview, and final report.

Keep `src/app/games/`, `src/game/`, `src/game/go/`, shared keyboard/board UI, `src/multiplayer/`, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `agents.md`, and `memory.md` single-writer or explicitly sequenced. Do not edit Daily Solo behavior except to preserve it, and do not change Daily Multiplayer invariants.

### Phase 23 Stage 16 Coordination Notes

Stage 16 planning is documented under `phase_id = 126`, execution is opened under `phase_id = 127`, focused Practice Multiplayer GO projection fixes are tracked under `phase_id = 128`, real two-client E2E/remote cleanup are tracked under `phase_id = 129`, and final verification/handoff are complete under `phase_id = 130` from `PHASE-23-STAGE-16-PRACTICE-MULTIPLAYER-GO-BUGFIXES-SPEC-2026-06-08.md`.

The user prompt suggested `phase_id = 123`, but Stage 15 already uses `phase_id = 123` through `phase_id = 125`. Future agents must preserve the progress ledger and continue from `phase_id = 126` rather than overwriting existing Stage 15 records.

Stage 16 is an extremely narrow two-bug pass for **Practice Multiplayer GO only**:

- Missing previous solutions in the GO chain stack: all previously completed Practice Multiplayer GO puzzles must remain accumulated and visible for every subsequent puzzle.
- Keyboard state not reflecting prior solutions: gray/orange board evidence from previous GO solutions must color the on-screen keyboard correctly for the current Practice Multiplayer GO puzzle.

Strict scope boundaries:

- Do not touch Daily Multiplayer GO, Multiplayer OG, solo Practice GO, solo Daily GO, Daily Solo, Practice solo, or the Stage 15 Practice seed system.
- Do not make broader GO chain, keyboard, multiplayer architecture, scoring/rating, spectator, notification, floating-manager, bot/social/export, History/Theme, full dedicated Multiplayer tab, PR, merge, release, production deployment, broad refactor, redesign, or later-phase changes.
- Reproduce both Practice Multiplayer GO bugs before any future source fixes.
- Use minimal, targeted changes and focused verification after each logical fix if execution is later authorized.
- Real two-client Supabase-backed browser E2E is mandatory for any Stage 16 multiplayer behavior claim.
- Preserve the `phase_id = 127` protected-starting-state baseline: one Vite server only when needed, minimal browser contexts, sequential heavy gates, and explicit cleanup because memory pressure was already high before Stage 16 browser work.
- `phase_id = 128` fixed the focused display/keyboard projection path in `MultiplayerGameSurface`: preserve the Practice GO prior-row prefix, overlay shared durable moves as display evidence, derive keyboard colors from merged display guesses, and avoid stale Practice GO solved-row holds after newer moves. Do not convert this display projection into rival canonical `playerSessions` mutation.
- `phase_id = 129` tightened the keyboard derivation so the merged display-evidence keyboard path is Practice GO-only; non-Practice-GO multiplayer modes retain their previous keyboard source path.
- `phase_id = 129` real two-client Supabase-backed browser E2E verified a Practice Multiplayer GO lobby through the UI, accumulated rows across puzzle 3 on host/rival (`erhus` -> `ernes` -> `escar`), prior-only keyboard evidence on both clients (`H` absent), final five-puzzle completion (`status=won`, six moves, both `playerSessions`), and cleanup of the touched row plus temporary auth users.
- `phase_id = 130` final verification passed focused changed-area tests (4 files, 44 tests), lint, full test suite (480 tests), build, API typecheck, diff check, desktop/tablet/390px smoke, real two-client Supabase-backed Practice Multiplayer GO E2E, remote probes/cleanup, resource checks, and Vercel preview verification. A deployment-specific Vercel shareable-link record was created with a 30-day TTL, but no verified browser share URL was returned by the CLI/API and no bypass token was committed.
- Future work must preserve that Stage 16 was Practice Multiplayer GO-only. Daily Multiplayer GO, Multiplayer OG, solo modes, Daily determinism, and the Stage 15 Practice seed system were not modified during this stage.

Preserve Stage 12 Hard Mode/keyboard/sound/row-write/timed/scoring wins, Stage 13 Practice/GO wins, Stage 14 hidden foundations/nonparticipant guard/unified repository path, Stage 15 GO transition/Practice seed wins, Daily Multiplayer invariants, `playerSessions` as canonical viewer state, and shared `serializedSession` as compatibility/answer plumbing only.

Likely high-conflict surfaces if execution is later authorized:

- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/multiplayer.ts`
- multiplayer GO display/projection helpers
- focused multiplayer GO tests
- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`
- `agents.md`
- `memory.md`

Suggested lanes if execution is later parallelized:

- **Practice Multiplayer GO display lane**: reproduce missing accumulated previous solutions and map the display projection.
- **Practice Multiplayer GO keyboard lane**: reproduce prior-solution keyboard color gaps and design the smallest projection fix.
- **Verification lane**: real two-client Supabase-backed Practice Multiplayer GO E2E, remote probes/cleanup, Stage 12-15 invariant checks, responsive/resource smoke.
- **Coordinator lane**: high-conflict integration, governance/progress updates, full gate, preview, and handoff.

### Phase 23 Stage 15 Coordination Notes

Stage 15 planning is documented under `phase_id = 122`, execution opens under `phase_id = 123`, focused fixes are tracked under `phase_id = 124`, and final verification is complete under `phase_id = 125` from `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`.

Stage 15 is a strict two-bug pass:

- GO transition regression: previously completed puzzles in a GO chain must remain visible and stable during the all-green solved-row hold.
- Practice seed predictability: authenticated Practice OG/GO puzzle sequences must be per-account so different accounts do not receive the same Practice sequence.

Execution requirements and invariants:

- Reproduce both bugs before source fixes.
- `phase_id = 123` baseline found no local Vite app server, one unrelated Python listener on `127.0.0.1:8765`, and an existing Playwright-style Chrome process before Stage 15 browser work. Future Stage 15 browser/E2E should use one dev server, minimal contexts, and explicit cleanup.
- `phase_id = 124` fixed the GO solved-row hold as display-only: `MultiplayerGameSurface` preserves canonical/prefilled GO rows while overlaying shared durable moves. Do not mutate rival canonical `playerSessions` to display prior rows.
- `phase_id = 124` fixed authenticated Practice seed predictability with account-id-derived Practice seeds plus persisted per-mode counters in guest/cloud progress. Guest Practice may continue using the local counter path. Daily OG/GO setup must stay outside this account-seed path.
- `phase_id = 125` verified Stage 15 with real two-client Supabase-backed Multiplayer GO browser E2E, authenticated two-account Practice seed checks, Daily determinism checks, full local gate, responsive smoke, remote probes/cleanup, resource checks, and Vercel preview/share verification.
- Make minimal, targeted changes and verify after each logical fix.
- Preserve the Stage 13 solved-row hold timing/coordination; only the disappearance/reset of prior GO puzzles is in scope.
- Preserve globally deterministic Daily OG/GO selection for the same UTC day.
- Preserve Stage 12 Hard Mode/keyboard/sound/row-write/timed/scoring wins, Stage 13 Practice/GO wins, and Stage 14 hidden foundations/nonparticipant guard/unified repository path.
- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- No broader Practice overhaul, Daily behavior change, GO timing/animation-feel polish, full dedicated Multiplayer tab work, spectator expansion, notification/floating-manager/bot/social/export work, scoring/rating change, PR, merge, release, broad refactor, or redesign is authorized.

Suggested lanes if execution is later parallelized:

- **GO transition lane**: `src/multiplayer/MultiplayerGameSurface.tsx`, `src/multiplayer/multiplayer.ts`, `src/app/games/GoGame.tsx`, and `src/game/go/` only as needed; reproduce prior-solution disappearance and add focused visibility regressions.
- **Practice seed lane**: Practice session creation, account/guest progress, storage schema, and seed helpers only as needed; add authenticated per-account seed tests and Daily determinism regressions.
- **Verification lane**: real two-client Supabase-backed Multiplayer GO E2E if multiplayer surfaces are touched, authenticated two-account Practice seed checks, responsive/resource smoke, and cleanup.
- **Coordinator lane**: high-conflict integration, progress/changelog/memory updates, full gate, preview, and final handoff.

Keep `src/multiplayer/`, `src/app/games/GoGame.tsx`, `src/game/go/`, Practice session creation paths, account/guest progress schema surfaces, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `agents.md`, and `memory.md` single-writer or explicitly sequenced.

### Phase 23 Stage 14 Coordination Notes

Stage 14 planning is documented under `phase_id = 118`, execution opens under `phase_id = 119`, and final verification is complete under `phase_id = 121` from `PHASE-23-STAGE-14-POST-STAGE-13-POLISH-AND-MULTIPLAYER-EXPANSION-FOUNDATIONS-SPEC-2026-06-07.md`.

Stage 14 is polish/foundations work only:

- Address approved small post-Stage-13 bugs or UX friction discovered before execution begins.
- Preserve Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, row-write reduction, stale-save protections, timed Practice clock behavior, and scoring/result settlement.
- Preserve Stage 13 Practice solo one-shot resume behavior, submitted-row animation stability, post-game results visibility, and Multiplayer GO solved-row hold/advance behavior.
- Add only minimal, non-breaking foundations for a future dedicated Multiplayer tab if execution is later authorized; do not replace Calendar or Practice multiplayer entry points.
- Lightly harden spectator foundations only where it reduces mutation/RLS risk without adding spectator features or permissions.
- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.

Durable Stage 14 implementation notes:

- Minimal Multiplayer tab foundations are hidden/inert only: the `multiplayer` route metadata and foundation shell must stay out of primary navigation until a later explicit full-tab stage.
- Calendar remains the Daily Multiplayer entry point and Practice remains the Practice Multiplayer entry point.
- Authenticated nonparticipants should not mount the gameplay surface for another users' playing match; future spectator UX requires separate authorization.
- The active unified Supabase multiplayer adapter should continue writing through `async_multiplayer_games` only. Legacy `live_*` and `live_match_spectators` schema artifacts are compatibility-only in the mounted Stage 14 app.
- Stage 14 final verification passed focused changed-area tests, lint, 472 full-suite tests, build, API typecheck, diff check, desktop/tablet/390px smoke, real Supabase-backed multi-context browser E2E, remote probes/cleanup, resource checks, and Vercel preview/share verification.
- The Vercel direct preview may be deployment-protected. Provide a verified protected share URL in chat when handing off, but do not commit bypass tokens to repository docs.

Suggested lanes if execution is later parallelized:

- **Post-Stage-13 polish lane**: user-reported bugs, keyboard/focus/animation polish, Practice solo and multiplayer surface consistency.
- **Multiplayer foundations lane**: additive route metadata/types/basic shell scaffolding for a future Multiplayer tab, kept inert/non-replacing.
- **Spectator hardening lane**: read-only spectator and RLS safety review, focused tests or docs where low-risk.
- **Regression verification lane**: Stage 12/13 non-regression, Daily Multiplayer invariant checks, real two-client Supabase E2E for multiplayer-affecting changes, responsive/resource smoke.
- **Coordinator lane**: `src/app/App.tsx` if touched, `src/multiplayer/` integration sequencing, all progress/changelog/memory updates, final verification, preview, and handoff.

Keep `src/app/App.tsx`, `src/app/games/`, `src/game/`, shared board/keyboard UI, `src/multiplayer/`, `src/calendar/`, `supabase/`, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `agents.md`, and `memory.md` single-writer or explicitly sequenced. Do not let Stage 14 become the full dedicated Multiplayer tab, spectator expansion, notification/floating-manager/bot/social/export work, scoring/rating change, redesign, PR, merge, or release.

### Phase 23 Final Stabilization Coordination Notes

Planning for the Phase 23 Final Stabilization & Broad Debugging Pass is documented under `phase_id = 105`. Execution and final verification are complete under `phase_id = 106`-`109`.

The final pass is a bug-fix/stabilization sweep only:

- Hunt for and fix clear bugs across unified Multiplayer, Daily Multiplayer, solo Daily/Practice, Calendar, auth/sync, stats/economy/history, Words/definitions/admin, responsive/accessibility, and performance.
- Do not add new product features, redesigns, scoring/rating changes, spectator expansion, notification systems, bots, social features, a dedicated Multiplayer tab, PRs, merges, or releases without a later explicit prompt.
- Preserve Daily Multiplayer as strictly asynchronous, no-clock, no-Hard-Mode-control, five-letter, UTC-day keyed, answer-separated, and claim-safe.
- Treat the backup branch `backup/phase-23-stage-10-final-2026-06-06` and Draft PR #18 as the current restore point. Do not merge it unless the user explicitly authorizes that later.

Suggested final-pass execution lanes if parallelized:

- **Audit/test-matrix lane**: define the final pass matrix before edits and track discovered bugs.
- **Multiplayer domain/repository lane**: `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, stale saves, clocks, sessions, Supabase row probes, and focused tests.
- **Multiplayer UI lane**: `src/multiplayer/MultiplayerPanel.tsx`, `src/multiplayer/MultiplayerGameSurface.tsx`, scoring summaries, and component/browser checks.
- **Solo/Daily/Calendar lane**: game reducers/session behavior, `src/daily/`, `src/calendar/`, DailyVariant boundaries, and Calendar mobile rendering.
- **Auth/sync/storage lane**: `src/account/`, Supabase client lifecycle, guest transfer, password recovery, and storage schema non-regression.
- **Responsive/performance lane**: desktop/tablet/390px smoke, console capture, overflow checks, and two-authenticated-context memory observation.
- **Coordinator lane**: high-conflict integration, `src/app/App.tsx`, progress/changelog/memory updates, full verification, Vercel preview, and final report.

Real two-client Supabase-backed browser E2E is required for multiplayer execution claims. Final verification should pair browser evidence with remote Supabase probes and cleanup of temporary users/rows where possible.

Resource-safety coordination for `phase_id = 106`:

- Use only one local dev server unless there is an explicit reason to start another.
- Do not run full lint/test/build/typecheck gates in parallel.
- Keep browser E2E to the minimum required isolated contexts and close contexts after each flow.
- Record long-running process PIDs and periodically check memory during multiplayer browser testing.
- If a process started by the agent becomes a clear memory offender, terminate it gracefully before considering force kill. Do not kill unrelated or system-critical user processes.

Final stabilization completion notes:

- `phase_id = 109` completes the final stabilization pass for user review; no PR, merge, release, dedicated Multiplayer tab, spectator expansion, redesign, scoring/rating change, or later-phase work was performed.
- `phase_id = 109` verification passed lint, 463 tests, build, API typecheck, diff check, desktop/tablet/390px smoke, real two-client Supabase E2E, remote Supabase probes/cleanup, memory/resource observation, and Vercel preview/share verification.
- Preserve the `phase_id = 107` stale-save protections and the `phase_id = 108` timed Practice clock rule in future multiplayer work.

Keep `src/app/App.tsx`, `src/multiplayer/`, `src/calendar/`, `src/account/`, `src/game/`, `src/daily/`, `src/stats/`, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `agents.md`, and `memory.md` single-writer or explicitly sequenced.

### Phase 23 Stage 12 Coordination Notes

Stage 12 planning is documented under `phase_id = 110` from `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md`. Implementation remains gated until the user explicitly authorizes it.

Stage 12 is targeted bug-fix/stabilization only:

- Enforce Practice Multiplayer Hard Mode during actual guess submission.
- Investigate and reduce multiplayer turn propagation latency.
- Investigate and reduce lobby creation/join latency.
- Improve on-screen keyboard responsiveness.
- Restore sound effects when enabled in Settings.

Preserve these boundaries:

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- `playerSessions` plus `getMultiplayerSessionForPlayer` remain canonical for viewer validation/mutation.
- Shared `serializedSession` remains compatibility/answer plumbing only.
- Existing stale-save protections, duplicate-safe create/join behavior, timed clock behavior, and terminal result settlement must not be weakened.
- No dedicated Multiplayer tab, spectator expansion, new features, scoring/rating/ELO changes, broad refactoring, PR, merge, or release.

Suggested execution lanes if later authorized:

- **Hard Mode domain lane**: `src/multiplayer/multiplayer.ts`, canonical validation wiring, and focused multiplayer Hard Mode regressions.
- **Repository/latency lane**: `src/multiplayer/multiplayerRepository.ts`, subscription/projection timing, stale-save/reconciliation behavior, and remote Supabase probes.
- **UI responsiveness lane**: `src/multiplayer/MultiplayerGameSurface.tsx`, `src/multiplayer/MultiplayerPanel.tsx`, shared keyboard components, and component/browser checks.
- **Sound lane**: sound provider/engine, Settings toggle wiring, and gameplay sound call sites.
- **Coordinator lane**: `src/app/App.tsx`, high-conflict integration, progress/changelog/memory/agents updates, real two-client E2E, resource checks, and final verification.

Real two-client Supabase-backed browser E2E is mandatory for Hard Mode enforcement and latency claims. Resource caution remains active: run one dev server, avoid parallel full gates, use minimal browser contexts, close contexts promptly, and monitor memory.

### Phase 23 Stage 3 Stabilization Lane Notes

After `phase_id = 75`, async and live multiplayer must be treated as real signed-in online transports, not one-device simulations:

- A browser session may mutate only the seat owned by the authenticated `viewerUserId`.
- Async games start as `waiting` rows in `async_multiplayer_games`; a distinct signed-in user must join as `player-two` before turns begin.
- Live lobbies start as waiting rows owned by `hostUserId`; a distinct signed-in user joins to become `player-two`.
- Repository adapters must not blindly upsert all visible waiting rooms. They may save only rows owned by or participated in by the current authenticated user.
- UI workers must not reintroduce dual-side guess inputs, dual-side word-length controls, local preview rivals, or answer reveal for waiting online matches.

After `phase_id = 76`, preserve these additional multiplayer UX and auth decisions:

- Async/live gameplay surfaces must use the canonical solo-style board and on-screen keyboard, not text inputs or OS keyboard-only flows.
- Full blank rows should be visible from match start, and guesses must run through the canonical OG/GO session reducers so valid-guess, Hard Mode, tile coloring, and keyboard-state rules stay aligned with solo play.
- Consumables, Pay-to-Continue, reveal-answer, and extra-guess purchase affordances remain disabled in multiplayer unless a later approved phase explicitly reintroduces them.
- Async/live forfeit is an allowed terminal action and should continue to count as a loss for rating projection when the match is otherwise rated and eligible.
- Supabase password recovery links should open the dedicated reset interface; do not collapse `PASSWORD_RECOVERY` into ordinary magic-link auto-resume behavior.

After `phase_id = 78`, preserve these stabilization follow-up decisions:

- Daily Async and Live refresh/entry behavior should continue to flow from repository subscriptions and derived selected lobby/match state. Do not reintroduce manual-refresh assumptions.
- Daily Multiplayer participation is one claim per authenticated user, UTC date, transport, and mode bucket: `async:og`, `async:go`, `live:og`, and `live:go`.
- A user's own waiting Daily Multiplayer lobby counts as that bucket's daily claim; the user should re-enter that existing lobby rather than create another, including after terminal outcomes.
- Daily Async and Daily Live use separate deterministic answer variants while preserving solo Daily answers and Practice behavior.
- Rival identity display must use safe public profile projection fields only. Do not expose raw auth emails or internal Supabase ids.
- The clickable `DAILY MULTIPLAYER` countdown should deep-link to Daily Async Multiplayer without visually changing the countdown.
- A dedicated Multiplayer tab is a planned/additive navigation direction only. Do not implement it unless the user explicitly authorizes that scope.
- `src/multiplayer/dailyMultiplayer.ts`, `src/multiplayer/RivalIdentityCard.tsx`, and `supabase/migrations/20260604223000_phase23_daily_multiplayer_claims.sql` are now part of the multiplayer stabilization surface; coordinate edits to them with async/live domain and UI changes.

### Phase 23 Stage 4 Implementation Lane Notes

After `phase_id = 80`, Stage 4 implementation is complete. If follow-up fixes are later approved, preserve these coordination boundaries:

- Daily Async and Daily Live refresh should continue through repository subscriptions and derived selected state. Do not reintroduce manual-refresh assumptions or broad polling unless a later bug proves subscriptions insufficient.
- Daily claim, creator cancellation, and active-limit behavior share one policy seam. Keep them coordinator-owned or tightly sequenced.
- A creator may cancel only their own unjoined lobby. As of Stage 6 core fixes, creator-cancelled unjoined Daily Async games and Daily Live lobbies release both the active slot and that exact Daily claim; joined, terminal, forfeited, expired, matched, or spectator-involved states remain claimed.
- Once a second player joins, use the existing forfeit/terminal flow rather than a lobby-cancel action.
- Spectators are a third role, not a disabled player seat. They live in `live_match_spectators`, may read active Live match state, and must not submit guesses, resolve selection, forfeit, mutate lobbies/matches, or affect rating/scoring.
- Any Supabase/RLS changes for cancellation or spectators must remain additive, privacy-preserving, and reviewed against `docs/supabase.md`; browser clients still must not receive direct rating-settlement authority.
- The dedicated Multiplayer tab remains deferred. Do not replace Calendar/Practice entry points unless a later prompt explicitly expands scope.

### Phase 23 Stage 5 Implementation Lane Notes

Stage 5 planning is documented under `phase_id = 81`, and implementation is complete under `phase_id = 82` through `phase_id = 85` from `PHASE-23-STAGE-5-MULTIPLAYER-UX-FIXES-AND-POLISH-SPEC-2026-06-05.md`.

If Stage 5 follow-up fixes are later approved, keep the work narrow and bug-focused:

- Fix Email + Password sign-in action duplication/order without changing auth semantics, password recovery behavior, profile behavior, or Supabase client setup.
- Correct Daily Multiplayer participation to four independent UTC buckets: `async:og`, `async:go`, `live:og`, and `live:go`; do not weaken duplicate-claim guards inside a bucket.
- Treat Daily Live join reliability as a cross-client state/repository issue before adding visual polish. Verify both host and rival enter without manual refresh.
- Daily Live, including GO, is fixed at five letters and must not show Practice word-length selection.
- Practice Live word-length selection starts only after a rival joins and must render the actual selection UI for both clients.
- Add the non-host `Join live lobby` pulsing/flash affordance only after the join flow is correct; animation must not be the only accessibility signal.
- Keep browser notifications, floating multiplayer game manager, timestamps, dedicated Theme/History tabs, turn transparency, exports/GIFs, bot play, lichess-style redesign, and the dedicated Multiplayer tab deferred unless a later prompt explicitly expands scope.

Suggested execution ownership if parallelized:

- **Auth UI lane**: `src/account/AuthModal.tsx` and auth modal tests only.
- **Daily claim lane**: `src/multiplayer/dailyMultiplayer.ts`, async/live participation helpers, and any Supabase claim review, sequenced with live domain edits.
- **Live domain/repository lane**: `src/multiplayer/liveMultiplayer.ts`, `src/multiplayer/liveRepository.ts`, and focused live tests.
- **Live UI lane**: `src/multiplayer/LiveMultiplayerPanel.tsx`, `WordLengthSelectionPanel.tsx`, and panel tests after domain state shapes stabilize.
- **Coordinator lane**: `src/app/App.tsx`, `src/calendar/CalendarPanel.tsx`, governance/progress docs, remote Supabase probe, desktop/mobile smoke, and Vercel preview.

Keep `src/multiplayer/liveMultiplayer.ts`, `src/multiplayer/LiveMultiplayerPanel.tsx`, `src/app/App.tsx`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` single-writer or explicitly sequenced.

### Phase 23 Stage 6 Planning Lane Notes

Stage 6 planning is documented under `phase_id = 86` from `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md`. Implementation is complete and verified under `phase_id = 88` through `phase_id = 90`.

If Stage 6 follow-up fixes are later approved, keep the pass strictly bug-only:

- Fix Daily Multiplayer claim release only for creator cancellation before any rival joins. Do not turn cancellation into a broad claim-reset path for joined, terminal, forfeited, expired, matched, or spectator-involved games.
- Treat Live realtime board and turn-history synchronization as the highest-risk work. Compare against the async repository/subscription pattern and avoid local optimistic oscillation that can fight authoritative snapshots.
- Supabase live saves must reconcile against the latest persisted projection before writing and run a short post-write reconciliation loop; do not reintroduce blind full-projection overwrites that can erase the other player's word-length choices, initialized session, board, moves, or history.
- Practice Live word-length selection must appear for both creator and joiner without refresh, resolve once, and transition once into gameplay without flashing between surfaces.
- Browser refresh should restore the active multiplayer tab/game context through the lightweight route/practice/Calendar surface breadcrumbs, without changing the route model or implementing the deferred dedicated Multiplayer tab.
- Remote Supabase migration `phase23_stage6_daily_claim_release` is applied and was probed successfully for Daily Async and Daily Live claim release after creator-cancelled unjoined entries.
- Stage 6 real two-client browser E2E passed for Practice Live and Daily Live on desktop-style and 390px mobile viewports using temporary authenticated users.
- Spectator feature work remains out of scope except avoiding regressions; do not expand or test spectators as a Stage 6 deliverable unless a later prompt explicitly changes scope.
- Do not add notifications, floating manager, History/Theme tabs, bots, exports/GIFs, redesign work, or broad refactors.
- Meaningful real multiplayer testing is required: use two isolated authenticated browser contexts plus remote Supabase probes where credentials/config allow it. Document which evidence came from browser E2E, repository/domain tests, and remote Supabase probes.
- `phase_id = 91` is a one-time safety backup to GitHub `main` before Stage 7. Do not treat it as a release, Phase 23 closure, Stage 7 authorization, or standing permission for further PRs/merges.

Suggested execution ownership if parallelized:

- **Claim/cancellation lane**: `src/multiplayer/dailyMultiplayer.ts`, async/live cancellation helpers, repository claim behavior, and focused tests.
- **Realtime repository lane**: `src/multiplayer/liveRepository.ts` and repository tests for live snapshot/subscription delivery.
- **Live phase lane**: `src/multiplayer/liveMultiplayer.ts` and tests for word-length selection, phase normalization, and idempotent transition rules.
- **Live UI lane**: `src/multiplayer/LiveMultiplayerPanel.tsx`, `src/multiplayer/WordLengthSelectionPanel.tsx`, `src/multiplayer/MultiplayerGameSurface.tsx`, and component tests after domain/repository state shapes stabilize.
- **Route preservation lane**: `src/app/App.tsx` and browser smoke, coordinator-owned or explicitly sequenced.
- **Coordinator lane**: docs/progress, final integration, remote Supabase two-client verification, desktop/mobile smoke, and Vercel preview if implementation is approved.

Keep `src/app/App.tsx`, `src/multiplayer/liveRepository.ts`, `src/multiplayer/liveMultiplayer.ts`, `src/multiplayer/LiveMultiplayerPanel.tsx`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` single-writer or explicitly sequenced.

### Phase 23 Stage 7 Execution Lane Notes

Stage 7 planning is documented under `phase_id = 87` as a separate broad autonomous bug-bash and stabilization pass. Stage 7 execution is authorized under `phase_id = 92` from the PR #16 safety-backup state on GitHub `main`.

Stage 7 remains a bug-fix and stabilization stage:

- Fix clear bugs found through systematic testing.
- Prioritize the known post-Stage-6 Live creator auto-entry and Practice Live word-length selection timing/visibility bugs.
- Use meaningful two-client Supabase-backed browser verification for multiplayer flows.
- Keep high-conflict source and governance surfaces coordinator-owned or explicitly sequenced.
- Do not create a PR, merge, release, implement the dedicated Multiplayer tab, expand spectators beyond bug fixes/non-regression, redesign, or add deferred features.

Suggested Stage 7 lanes:

- **Solo gameplay lane**: Daily/Practice OG/GO, hard mode, keyboard/tile behavior, loss/reveal, resume, and definitions.
- **Daily/Calendar lane**: Calendar hub, past-daily unlocks, countdowns, reset behavior, mobile indicators, and DailyVariant boundaries.
- **Async multiplayer lane**: lobbies, claims, cancellation, turn submission/history, rival identity, forfeit, refresh, and mobile layout.
- **Live multiplayer lane**: post-Stage-6 regression sweep of Practice/Daily live, cancellation, forfeit, route persistence, spectator non-regression, and mobile layout.
- **Auth/sync lane**: sign-in/up, magic link, reset password, sign-out, guest/cloud merge, profile/settings sync, and Supabase client lifecycle.
- **Stats/economy/history lane**: stats, ratings summaries, coins/XP, history, sharing, and solo/multiplayer separation.
- **Responsive/accessibility/performance lane**: desktop/tablet/mobile smoke, console errors, horizontal overflow, reduced motion, keyboard/touch ergonomics, and loading/error states.

Stage 7 should fix clear bugs only unless a later prompt explicitly authorizes feature work or redesign.

After `phase_id = 93`, Live Practice and Daily phase timers must be treated as entry-gated:

- A live match may exist after a rival joins, but Practice word-length selection and Daily countdown timers should arm only after both player seats have acknowledged entering the match surface.
- The entry acknowledgement lives in the live match projection, not a new table/column, unless a later migration is explicitly justified.
- UI workers must not reintroduce timers that start merely from lobby matching; both clients need a chance to render/enter first.
- Repository workers must preserve `playerEntryAt`, word-length choices, countdown fields, player progress, and rival moves when reconciling stale live saves.

After `phase_id = 94`, future multiplayer workers should preserve the Stage 7 verification standard:

- Use isolated authenticated browser contexts for real async/live checks, not local dual-side simulations.
- Pair browser evidence with remote Supabase probes for durable rows, participant/claim records, and realtime-reconciled projections.
- Clean generated test users and exact related remote rows after verification.
- Do not downgrade the live repository subscription backstop without replacing it with equally reliable realtime-state reconciliation.

After `phase_id = 95`, Stage 8 execution must treat Multiplayer unification as a coordinated refactor, not a broad redesign:

- `PHASE-23-STAGE-8-MULTIPLAYER-UNIFICATION-AND-TIME-LIMITS-SPEC-2026-06-05.md` is the dedicated Stage 8 source of truth.
- The future execution should collapse Async/Live into one user-facing Multiplayer model, preserve the reliable async/durable-row behavior as the baseline, and remove Live-specific terminology and code paths only after compatibility and verification are planned.
- Daily Multiplayer remains strictly asynchronous: five letters, UTC day key, UTC-midnight expiry, separate OG/GO answers, no Practice time-limit controls, and no solo-daily/stat contamination.
- Practice Multiplayer gains optional creator-selected chess-clock-style total time per side; clock enforcement must be domain/persistence-driven and server-time-aware where possible.
- Memory/performance remediation is a blocking Stage 8 requirement. Assign a read-only performance lane first to inspect duplicate Supabase clients, realtime subscriptions, polling intervals, timers, localStorage restore loops, large projections, and rerender hot spots before edits.
- Suggested Stage 8 lanes: unified domain/timer model, persistence/Supabase compatibility, UI/terminology/Calendar integration, performance audit/fixes, and coordinator-owned App/progress/changelog integration.
- Keep `src/app/App.tsx`, `src/multiplayer/index.ts`, repository adapters, Supabase migrations, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` single-writer or explicitly sequenced.
- Do not implement the dedicated Multiplayer tab, expand spectators, add notifications/bots/social systems, or redesign the app during Stage 8 unless the user separately authorizes that scope.

After `phase_id = 96`, Stage 8 workers should treat the existing `async_multiplayer_games` table/local storage key as compatibility plumbing unless a later migration explicitly replaces it:

- The user-facing and source-facing model is unified Multiplayer.
- Mounted Live App/Calendar surfaces and obsolete Live modules should not be reintroduced.
- Practice clock work should stay on the unified Multiplayer model and must not add time limits to Daily Multiplayer.

After `phase_id = 97`, Stage 8 is complete for user review:

- Keep future multiplayer fixes on the unified `src/multiplayer/multiplayer.ts`, `MultiplayerPanel.tsx`, `MultiplayerGameSurface.tsx`, and `multiplayerRepository.ts` path unless a later prompt explicitly authorizes a new transport or dedicated Multiplayer tab.
- Treat `async_multiplayer_games` and `brrrdle:async-multiplayer:v1` as private compatibility names. Do not surface "Async" or "Live" to players when referring to current Multiplayer.
- Daily Multiplayer remains no-clock and UTC-midnight based; Practice Multiplayer is the only timed multiplayer surface.
- If future agents touch Supabase rating bucket persistence, preserve the Stage 8 storage-edge mapping: unified `multiplayer:*` buckets live in projections, while top-level storage columns may need historical compatible values until a migration changes constraints.

### Phase 23 Stage 9 Lane Notes

Stage 9 planning was documented under `phase_id = 98`, and implementation/verification are complete under `phase_id = 99`-`100` from `PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md`.

For any Stage 9 follow-up, keep the work inside the unified Multiplayer model:

- Fix the timed Practice Multiplayer timer/board synchronization bug before building broader scoring features. Reproduce it with two authenticated browser contexts first, then pin the behavior with focused tests.
- Timed Practice clocks must decrement only the active player's remaining time. The inactive player's clock must not expire while waiting.
- Submitted guesses must persist on both players' boards after repository saves, subscription refreshes, and browser refreshes.
- Practice Multiplayer Hard Mode is a creator-selected lobby setting. It must be visible before join, locked after join, stored in the game projection, and validated through canonical solo Hard Mode logic.
- Daily Multiplayer must remain strictly asynchronous/no-clock. Do not add Practice Hard Mode lobby controls, Practice time limits, or new Daily claim behavior while working on Stage 9.
- Multiplayer scoring should be deterministic and per-player: one player's points are based on their own guesses and solve status, not penalties caused by the rival's performance.
- Keep ELO/rating-system changes deferred unless the Stage 9 execution prompt explicitly authorizes rating integration beyond exposing score evidence to existing helpers.
- Avoid destructive Supabase schema changes. Prefer projection fields and compatibility normalization unless a migration is clearly required and explicitly authorized.

Suggested Stage 9 execution ownership if parallelized:

- **Timer bug lane**: `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, and timed-turn domain/repository tests.
- **Hard Mode lane**: Practice lobby setting and canonical validation wiring after the timer lane stabilizes domain shape.
- **Scoring lane**: `src/multiplayer/scoring.ts` and deterministic score/winner/draw tests.
- **UI lane**: `src/multiplayer/MultiplayerPanel.tsx`, `src/multiplayer/MultiplayerGameSurface.tsx`, and component tests after domain/scoring contracts stabilize.
- **Coordinator lane**: `src/app/App.tsx`, high-conflict docs/progress, real Supabase two-client verification, responsive smoke, and final handoff.

Keep `src/app/App.tsx`, `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, `src/multiplayer/MultiplayerPanel.tsx`, `src/multiplayer/MultiplayerGameSurface.tsx`, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` single-writer or explicitly sequenced.

### Phase 23 Stage 10 Lane Notes

Stage 10 planning was documented under `phase_id = 101`; implementation and verification are complete under `phase_id = 102`-`103`.

For future Stage 10 follow-up or multiplayer sync fixes:

- Treat `game.moves` as the shared display evidence for what both players should see on the visible board and keyboard.
- Keep `playerSessions` canonical and player-owned. Do not make a rival guess visible by writing it into the other player's canonical session.
- The shared `serializedSession` remains compatibility/answer plumbing only.
- Timed Practice clock persistence must update `timeRemainingMs` and `turnStartedAt` together. Do not persist a decremented remaining time while leaving the old turn start timestamp in place.
- Final stabilization `phase_id = 108` further narrows timed Practice persistence: non-terminal chess-clock ticks should not be durably saved every second. Let the UI compute live countdowns from `turnStartedAt` + `timeRemainingMs`; save only submitted-turn checkpoints and actual timeout/loss state.
- UI draft reset keys must avoid clock-only `updatedAt` churn. Use gameplay-changing fields such as move history, turn, status, and player id to decide when the local draft should reset.
- Real two-client Supabase browser E2E is required for any future claim that board, keyboard, clock, refresh, or Hard Mode multiplayer synchronization is fixed.
- Stage 10 completion does not authorize a PR, merge, release, dedicated Multiplayer tab, spectator expansion, notification system, bot/social feature, redesign, scoring/rating overhaul, or later-phase work.

### Phase 23 Stage 12 Implementation Coordination Notes

After `phase_id = 112`, Practice Multiplayer Hard Mode enforcement uses the shared submitted move projection as validation evidence while keeping `playerSessions` canonical and player-owned.

For any remaining Stage 12 follow-up work:

- Do not copy submitted moves into the rival's canonical session to enforce Hard Mode or improve display.
- Keep Daily Multiplayer out of Practice Hard Mode, time-limit, and keyboard/sound experimentation paths.
- Treat `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, `src/multiplayer/MultiplayerGameSurface.tsx`, and sound files as high-conflict surfaces; sequence edits through the coordinator.
- Preserve the repository optimization that skips unchanged participant row projections unless a correctness issue proves it unsafe.
- Real two-client E2E plus remote Supabase probes are required before claiming Hard Mode enforcement or responsiveness fixes are complete.
- Continue resource caution: one dev server, minimal browser contexts, no parallel full gates, and cleanup of temporary users/rows.

Stage 12 final handoff note:

- `phase_id = 113` completes Stage 12 for user review.
- Future agents should treat the shared-move Hard Mode validation path, functional multiplayer draft updates, multiplayer sound hooks, and unchanged-projection save skipping as intentional Stage 12 decisions.
- Any follow-up changes must preserve Daily Multiplayer no-clock/no-Hard-Mode invariants, canonical `playerSessions`, stale-save protections, timed Practice clock behavior, scoring/result settlement, and the row-write reduction unless a focused regression proves otherwise.

## 9. Sub-Agent Handoff Template

Every sub-agent report should use this shape:

```md
## Handoff

Status:
Files changed:
Behavior changed:
Verification run:
Verification not run:
Known risks:
Conflicts or touched shared surfaces:
Recommended next step:
User approval needed:
```

For read-only exploration, replace "Files changed" with "Files inspected".

## 10. Integration Checklist

Before accepting sub-agent work:

- Read the diff or report against the original work packet.
- Confirm no unauthorized phase work entered the branch.
- Confirm no unrelated refactors or generated noise were added.
- Confirm no tests were weakened, skipped, or deleted without approval.
- Confirm secrets and private deployment data were not committed.
- Confirm user data migrations are backward-compatible.
- Run the relevant automated verification in the coordinator workspace.
- Update progress tracking and changelog before halting at the gate.

## 11. Progress and Memory Updates

Use the next sequential `phase_id` in `progress/PROGRESS.csv`.

For every major governance, planning, or implementation step:

- Append a CSV row.
- Create or update the matching `progress/PROGRESS-STEP-N.md`.
- Update `CHANGELOG.md`.
- Update `memory.md` with the current gate and any durable architectural decision.

Progress documents are canonical history. Do not overwrite old progress reports unless the user explicitly asks for a correction.

## 12. Root Document Organization

The root currently contains many approved phase specs with direct references from the plan, changelog, and progress reports. Avoid moving those files during an active dirty working state unless the user specifically approves a reorganization pass.

If a future cleanup is approved, prefer:

- Move old phase specs into `docs/planning/specs/`.
- Add a root `docs/planning/README.md` index.
- Update every reference in `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, progress reports, and README in the same commit.
- Run link/reference checks before halting.

Until then, keep approved specs at the root and rely on `agents.md` plus `memory.md` for navigation.

## 13. Stop Conditions

Any agent must stop and report if:

- A source-of-truth conflict appears.
- The task would require unauthorized PR/merge/release, dedicated Multiplayer tab work, deferred feature work, or later implementation.
- A requested change would weaken game invariants.
- The assigned files overlap another active work packet.
- Verification fails and the fix is not small and clearly in scope.
- A secret, credential, or private deployment artifact appears.
- The work would require a merge, production deployment, or branch deletion without explicit user approval.
