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
- Stage 7 implementation remains unauthorized until a later explicit execution prompt.
- Further PR creation, merges, release, dedicated Multiplayer tab work, deferred feature work, and later-phase work remain unauthorized until later explicit approval.

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
- The latest relevant progress reports, currently `progress/PROGRESS-STEP-69.md` through `progress/PROGRESS-STEP-91.md`.
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

### Phase 23 Stage 7 Planning Lane Notes

Stage 7 planning is documented under `phase_id = 87` as a separate broad autonomous bug-bash and stabilization pass. Stage 7 implementation is not authorized until a later explicit execution prompt.

Do not fold Stage 7 into Stage 6 unless the user explicitly overrides the Stage 6 bug-only boundary. The recommended sequence is:

1. Finish Stage 6 critical live multiplayer stability fixes and verification.
2. Halt for user review.
3. If approved, run Stage 7 as a separate whole-game bug-fix pass.

Suggested Stage 7 lanes if later approved:

- **Solo gameplay lane**: Daily/Practice OG/GO, hard mode, keyboard/tile behavior, loss/reveal, resume, and definitions.
- **Daily/Calendar lane**: Calendar hub, past-daily unlocks, countdowns, reset behavior, mobile indicators, and DailyVariant boundaries.
- **Async multiplayer lane**: lobbies, claims, cancellation, turn submission/history, rival identity, forfeit, refresh, and mobile layout.
- **Live multiplayer lane**: post-Stage-6 regression sweep of Practice/Daily live, cancellation, forfeit, route persistence, spectator non-regression, and mobile layout.
- **Auth/sync lane**: sign-in/up, magic link, reset password, sign-out, guest/cloud merge, profile/settings sync, and Supabase client lifecycle.
- **Stats/economy/history lane**: stats, ratings summaries, coins/XP, history, sharing, and solo/multiplayer separation.
- **Responsive/accessibility/performance lane**: desktop/tablet/mobile smoke, console errors, horizontal overflow, reduced motion, keyboard/touch ergonomics, and loading/error states.

Stage 7 should fix clear bugs only unless a later prompt explicitly authorizes feature work or redesign.

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
