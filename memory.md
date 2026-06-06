# brrrdle Project Memory

**Status**: Persistent project context for future Codex sessions and sub-agents.
**Authority**: Supporting memory only. If this file conflicts with current user instructions, `CONSTITUTION.md`, `AGENT-IMPLEMENTATION-PLAN.md`, or an approved spec, follow the higher-authority source and update this file after the discrepancy is resolved.

## 1. Current Snapshot

- Repository: `brrrdle`.
- Primary remote: `https://github.com/ryanjosephkamp/brrrdle`.
- Current local branch during Stage 2 completion: `codex/phase-23-stage-1`.
- Current phase area: Phase 23, Multiplayer Foundations and Polish.
- Stage 1 is complete and tracked as `phase_id = 69`.
- Stage 2 planning is documented and tracked as `phase_id = 70`.
- Multi-agent workflow scaffolding is tracked as `phase_id = 71`.
- Stage 2 live/realtime multiplayer implementation is complete and verified under `phase_id = 72`.
- Stage 3 planning is documented under `phase_id = 73`.
- Stage 3 implementation is complete under `phase_id = 74`.
- Stage 3 stabilization is complete under `phase_id = 75`; the account-backed multiplayer UX/password-recovery follow-up is complete under `phase_id = 76`.
- The next Phase 23 stabilization follow-up is planned under `phase_id = 77` and implemented under `phase_id = 78`.
- Stage 4 planning for Daily Multiplayer fixes and Live spectator foundations is documented under `phase_id = 79`.
- Stage 4 implementation is complete under `phase_id = 80`.
- Stage 5 planning for multiplayer UX fixes and polish is documented under `phase_id = 81`.
- Stage 5 execution for multiplayer UX fixes and polish is complete under `phase_id = 82` through `phase_id = 85`.
- Stage 6 planning for Live Multiplayer stability and Daily claim fixes is documented under `phase_id = 86`.
- Stage 6 real multiplayer testing requirements and Stage 7 broad bug-bash planning are documented under `phase_id = 87`.
- Stage 6 execution is complete and verified under `phase_id = 88` through `phase_id = 90`; it stayed limited to the six critical bug fixes in the Stage 6 spec and included meaningful two-client Supabase-backed browser testing.
- The user explicitly authorized a one-time Stage 6 safety-backup PR and squash merge to GitHub `main` under `phase_id = 91` before Stage 7. This backup does not close Phase 23 or authorize Stage 7.
- Stage 7 broad bug-bash execution is not authorized yet.
- Do not create further Phase 23 PRs, merges, releases, implement a dedicated Multiplayer tab, start deferred feature work, or start later-phase work until the user explicitly approves that later step.

## 2. Current Governance Files

- `CONSTITUTION.md`: binding project constitution. Version 3.4 after this scaffolding pass.
- `AGENT-IMPLEMENTATION-PLAN.md`: active implementation plan. Version 3.19 after the Stage 6 safety-backup merge authorization.
- `PHASE-23-MULTIPLAYER-FOUNDATIONS-AND-POLISH-SPEC-2026-06-03.md`: approved Phase 23 spec.
- `agents.md`: multi-agent workflow guide.
- `memory.md`: this persistent state file.
- `progress/PROGRESS.csv`: sequential phase/progress ledger.
- `CHANGELOG.md`: user-facing and governance-facing change history.

## 3. Phase 23 State

### Stage 1 - Complete

Tracked by `progress/PROGRESS-STEP-69.md`.

Delivered:

- Dynamic `COMMAND CENTER` landing title.
- Outside-click dismissal for dialogs.
- Mobile-safe Settings tooltips.
- Calendar indicators for solo OG, solo GO, multiplayer OG, and multiplayer GO.
- Loss reveal behavior that keeps answers/share/definitions hidden until explicit reveal.
- `DailyVariant` split for solo/local and multiplayer/UTC daily behavior.
- Local-first async multiplayer foundation in `src/multiplayer/`.
- Practice and Daily async game creation, turn submission, move history, view-only archives, and five-active-game cap.
- Daily Multiplayer UTC countdown, Settings toggle, and unique reset sound.
- Guest progress schema v5 with async multiplayer and countdown settings.

Verification recorded for Stage 1:

- `npm run lint` clean.
- `npm run test` 402/402.
- `npm run build` succeeded with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` clean.
- `git diff --check` clean.
- Desktop and mobile browser smoke completed.

### Stage 2 - Complete

Tracked by `progress/PROGRESS-STEP-70.md`.
Execution tracked by `progress/PROGRESS-STEP-72.md`.

Delivered:

- Live Practice Multiplayer and Live Daily Multiplayer foundations.
- `src/multiplayer/liveMultiplayer.ts` reducer/domain with lobby, word-length-selection, countdown, playing, finished, aborted, and expired phases.
- Dedicated Practice Live word-length selection screen with a 1-minute decision window and committed random selection animation state.
- `LiveMultiplayerPanel` for lobby creation, matching, countdown, simultaneous guess submission, move history, answer/definition archive, and aborted/expired messaging.
- Calendar Daily Live entry plus `L-OG` and `L-GO` indicators beside existing solo and async multiplayer indicators.
- `src/multiplayer/liveRepository.ts` memory/localStorage/Supabase repository seam.
- Supabase migration `20260604024500_phase23_live_multiplayer.sql` with live lobbies, matches, participants, events, RLS, server-time RPC, indexes, and realtime publication hooks.
- Stage 3 ELO/rating/matchmaking remains out of Stage 2.

Verification recorded for Stage 2:

- `npm run lint` clean.
- `npm run test` 417/417.
- `npm run build` succeeded with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` clean.
- `git diff --check` clean.
- Desktop and mobile Playwright browser smoke completed.

### Stage 3 - Complete

Planning tracked by `progress/PROGRESS-STEP-73.md`.
Execution tracked by `progress/PROGRESS-STEP-74.md`.

Delivered:

- Pure multiplayer modules: `rating.ts`, `scoring.ts`, `matchmaking.ts`, `customGames.ts`, and `competitiveMultiplayer.ts`.
- Separate rating buckets for `async:og`, `async:go`, `live:og`, and `live:go`, initial rating `1200`, 10-game provisional window, K=40 provisional, K=24 established.
- Strict rating eligibility: ranked, authenticated, distinct-player, durable result evidence; local preview/custom-unranked/anonymous/expired/aborted/corrupt matches stay unrated.
- Additive async/live ranked/custom metadata and scoring summaries.
- Guest progress schema v6 with `competitiveMultiplayer` display/cache state; solo stats/economy/history/resume remain separate.
- Stats route multiplayer rating/result summaries.
- Additive Supabase migration `20260604033000_phase23_competitive_multiplayer.sql` and Supabase docs.

### Stage 3 Stabilization - Complete

Tracked by `progress/PROGRESS-STEP-75.md`.

Durable decisions:

- Async and live multiplayer are signed-in online experiences; local/guest fallback is only a persistence fallback, not a supported simulated multiplayer UX.
- A single browser may control only the authenticated viewer's own seat.
- Async matches use a durable `waiting` status until a distinct authenticated second user joins through `async_multiplayer_games`.
- Live lobbies use `hostUserId`; a distinct authenticated second user joins and becomes `player-two`.
- Supabase repositories filter writes to rows owned by or participated in by the current user, because waiting rooms can be readable without being writable.
- Calendar day indicators now visibly render the full `S-OG`, `S-GO`, `M-OG`, `M-GO`, `L-OG`, and `L-GO` labels on mobile by stacking them inside narrow day cells.
- Shared tooltips render through a body portal so clipped/stacked layout containers cannot hide Settings help text.

### Stage 3 Stabilization Follow-up - Complete

Tracked by `progress/PROGRESS-STEP-76.md`.

Durable decisions:

- Supabase async/live repository adapters must avoid blind upserts against visible waiting-room rows. Host-created rows use explicit insert/update handling; joined rows are update-only through the current authenticated participant.
- Remote verification used generated authenticated sessions for the two confirmed test accounts because the supplied passwords were rejected by Supabase Auth. Do not store or repeat the passwords in docs.
- Async/live gameplay surfaces use the canonical solo-style grid and on-screen keyboard through `MultiplayerGameSurface`; do not reintroduce text guess inputs or OS-keyboard-only multiplayer flows.
- Multiplayer guesses must continue to run through the canonical OG/GO reducers for valid guesses, Hard Mode, tile coloring, and keyboard-state updates.
- Consumables, Pay-to-Continue, reveal-answer, and extra-guess purchase affordances are disabled in multiplayer for now.
- Async/live forfeit is a terminal action and counts as a loss for rating projection when the match is rated/eligible.
- Supabase password recovery links and `PASSWORD_RECOVERY` auth events open the dedicated reset-password UI rather than ordinary auto-resume.
- `createBrrrdleSupabaseClient` caches one client per runtime config so React dev StrictMode/reload checks do not create duplicate GoTrue clients with the same storage key.

Current gate:

- PR creation, merge, release, and optional Stage 4 remain gated.

### Stage 3 Stabilization Follow-up Planning - Documented

Tracked by `progress/PROGRESS-STEP-77.md`.

Planning-only decisions from `brrrdle_observations_2026_06_04.md`:

- Daily Async lobby visibility and creator join/entry state should update automatically through repository subscriptions/state reconciliation; manual refresh should not be part of the intended UX.
- Live Practice and Daily Live word-length selection should resolve automatically when both players submit or when the selection clock expires, and both clients should enter the match without manual refresh.
- Daily Multiplayer should allow only one participation claim per authenticated user, UTC date, transport, and mode bucket: `async:og`, `async:go`, `live:og`, and `live:go`. A user's own waiting lobby counts as that bucket's daily claim.
- Daily Async and Daily Live should use separate deterministic daily answer variants while preserving solo daily and practice behavior.
- Async headers should distinguish `Practice Async Multiplayer` and `Daily Async Multiplayer`.
- Rival display should use safe public profile fields such as display name, avatar, accent color, initials, and fallback label; do not expose raw auth emails or internal ids.
- The `DAILY MULTIPLAYER` countdown should remain visually unchanged but become clickable and navigate to the current UTC Daily Async Multiplayer surface.
- A dedicated Multiplayer tab is a likely additive future navigation surface, but implementation remains gated and should not replace Calendar/Practice entry points until explicitly approved and verified.

### Stage 3 Stabilization Follow-up Execution - Complete

Tracked by `progress/PROGRESS-STEP-78.md`.

Durable decisions:

- Daily Async and Live surfaces should derive their active selected lobby/match/game from the latest repository snapshot so Realtime/subscription refreshes update the entered state without manual refresh.
- Daily Multiplayer claims are enforced in both client/domain helpers and Supabase triggers. The claim key is authenticated user, UTC date, transport, and mode. Buckets are `async:og`, `async:go`, `live:og`, and `live:go`.
- A waiting Daily Multiplayer lobby counts as the user's claim for that bucket and should remain re-enterable; terminal games stay viewable but do not free a second same-day claim.
- Daily Async and Daily Live use transport-specific deterministic answer offsets from `src/multiplayer/dailyMultiplayer.ts`. Do not collapse them back to the solo daily answer helpers.
- Rival identity must flow through safe public profile summaries only (`label`, `displayName`, `avatarUrl`, `accentColor`, `gradient`, `initials`) and must not expose email addresses or Supabase ids.
- The `DAILY MULTIPLAYER` countdown launches the current UTC Daily Async Multiplayer surface through the Calendar launch request model.
- `supabase/migrations/20260604223000_phase23_daily_multiplayer_claims.sql` must be applied after prior Phase 23 multiplayer migrations when account-backed Daily Multiplayer is enabled.

Current gate:

- Phase 23 stabilization and Stage 5 implementation are complete through `phase_id = 85`. PR creation, merge, release, dedicated Multiplayer tab implementation, deferred feature work, and later-phase work remain gated.

### Stage 4 Implementation - Complete

Tracked by `progress/PROGRESS-STEP-80.md`.

Durable decisions from `PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md`:

- Stage 4 is a targeted Daily Multiplayer fixes and Live spectator foundations pass, not a broad redesign or new competitive/social system.
- Daily Async and Daily Live lobby state should continue to flow through repository subscriptions and derived selected state rather than manual refreshes or broad polling.
- Daily Multiplayer claim bypasses are blocked in the domain layer and through authenticated repository save rollback/reload behavior.
- The five-active-lobby/game limit is enforced per authenticated user, not globally.
- A lobby creator may cancel their own unjoined lobby; cancellation makes the lobby unavailable and releases the active-lobby slot, but the Daily claim remains consumed for that UTC bucket. Once a rival has joined, use forfeit/terminal flows instead.
- Spectators are a third role for Live matches: authenticated, read-only, distinct from `player-one`/`player-two`, persisted in `live_match_spectators`, able to view active match state in near real time, and unable to mutate game state or rating/scoring.
- Rival/spectator identity display must continue to use safe public profile summaries only and must not expose raw emails or internal Supabase ids.
- The dedicated Multiplayer tab remains deferred and must not be implemented without explicit authorization.

### Stage 5 Planning - Documented

Tracked by `progress/PROGRESS-STEP-81.md`.

Planning-only decisions from `PHASE-23-STAGE-5-MULTIPLAYER-UX-FIXES-AND-POLISH-SPEC-2026-06-05.md`:

- Stage 5 is a narrow multiplayer UX/correctness bug-fix pass. It is not a broad redesign or a new feature phase.
- Required planned fixes: Email + Password sign-in action duplication/order, Daily Multiplayer four-bucket participation behavior, Daily Live join pulsing/affordance, Daily Live reliable cross-client entry, Daily Live GO fixed-length flow cleanup, Practice Live post-join entry, Practice Live word-length timer start, and Practice Live word-length UI visibility.
- The Daily participation buckets remain `async:og`, `async:go`, `live:og`, and `live:go`. Stage 5 should correct any overly broad live/async gating while preserving duplicate blocking inside each bucket and preserving Stage 4 cancellation/claim decisions.
- Daily Live is fixed at five letters and should not show Practice word-length selection. Practice Live word-length selection should begin only after a rival joins.
- Deferred items remain out of scope unless later approved: browser notifications, floating multiplayer game manager, multiplayer timestamps, dedicated Theme/History tabs, turn transparency, exports/GIFs, bot play, lichess-style redesign, and dedicated Multiplayer tab implementation.
- Later execution should sequence high-conflict live domain/repository/UI edits carefully and verify with two-client or remote Supabase-backed flows.

### Stage 5 Execution - Complete

Tracked by `progress/PROGRESS-STEP-82.md` through `progress/PROGRESS-STEP-85.md`.

Durable decisions:

- The clean auth modal should not render password sub-mode buttons that look like first-class sign-in/create-account actions. Email + Password actions are direct and ordered `Sign in`, `Create account`, `Forgot password?`.
- The Settings inline auth fallback should not preserve the older duplicate-action pattern; keep it aligned with the cleaned direct password actions while preserving existing auth handlers.
- Daily Live matches must never normalize into Practice word-length selection. If remote phase metadata is missing or invalid, Daily Live should default to countdown/fixed five-letter behavior.
- Live panels should derive the selected/entered match from the viewer's active participant match when repository/realtime updates arrive, including Practice Live matches that have no Daily claim helper.
- The actionable non-host `Join live lobby` affordance should be visually obvious but reduced-motion safe.
- Stage 5 did not add Supabase migrations. It verified the existing online seams with a temporary-user remote Supabase probe for async/live four-bucket claims, duplicate guards, live lobby visibility/join, and cross-client live phase updates.
- Stage 5 full verification passed: lint, tests, build, API typecheck, whitespace check, desktop smoke, and 390px mobile smoke.

### Stage 6 Planning - Documented

Tracked by `progress/PROGRESS-STEP-86.md` and tightened under `progress/PROGRESS-STEP-87.md`.

Planning-only decisions from `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md`:

- Stage 6 is a critical bug-only stability pass. It is not a feature stage, redesign stage, spectator stage, or dedicated Multiplayer tab stage.
- Required planned fixes: release Daily Multiplayer claims after creator cancellation before any rival joins; make Live board and turn history realtime updates reliable; stop Practice Live flashing after word-length selection; show word-length selection to the lobby creator without refresh; preserve the current multiplayer tab/game on browser refresh; and clean up related Live instability.
- The Daily claim-release change is a narrow policy exception for pre-join cancellation only. Joined, terminal, forfeited, expired, or spectator-involved games should not become claim-reset loopholes.
- Async multiplayer should be used as the behavioral reference for reliable repository subscription/state reconciliation.
- Live realtime, word-length phase transitions, and route preservation are high-conflict areas. Keep `src/app/App.tsx`, `src/multiplayer/liveRepository.ts`, `src/multiplayer/liveMultiplayer.ts`, and `src/multiplayer/LiveMultiplayerPanel.tsx` single-writer or explicitly sequenced.
- Stage 6 execution must include meaningful real multiplayer testing: two isolated authenticated browser contexts, real or temporary accounts, Live Practice and Live Daily create/join/play flows, cancellation/reclaim, board/history updates, word-length selection visibility, and refresh restoration. Pair browser evidence with remote Supabase probes and focused repository/domain tests.
- Stage 6 execution is complete and verified under `phase_id = 88` through `phase_id = 90`; it stayed bug-only and limited to the six listed fixes.
- Stage 6 Daily claim release is a narrow behavior: only creator-cancelled, unjoined Daily Async games and Daily Live lobbies release the matching claim. Joined, terminal, forfeited, expired, matched, or spectator-involved states remain claimed.
- Supabase live match saves must reconcile against the latest persisted projection before writing. Preserve the other seat's newer progress, initialized session, moves/history, word-length choices, and non-regressing phase state; do not return to blind full-projection overwrites.
- Supabase live match saves also run a short post-write reconciliation loop to converge near-simultaneous player updates that arrive during the race window between load/merge/write.
- Remote Supabase migration `phase23_stage6_daily_claim_release` is applied. A service-role probe confirmed unjoined creator-cancelled Daily Live and Daily Async claims are released.
- Real two-client browser E2E passed for Practice Live and Daily Live using temporary authenticated users in isolated browser contexts on desktop-style and 390px mobile viewports.
- Practice Live word-length selection UI should not be keyed by `updatedAt`; realtime refreshes should update props without remounting/flickering the chooser.
- Browser refresh restoration uses small localStorage breadcrumbs for app route, practice mode, and Calendar daily/async/live active surfaces. This is a restore aid, not a new navigation system or dedicated Multiplayer tab.
- Stage 6 must not expand into Stage 7, spectator expansion/testing, dedicated Multiplayer tab work, deferred features, redesign, additional PR creation, additional merge, or release.
- `phase_id = 91` is the narrow exception where the user authorized a safety-backup PR and squash merge of the current Stage 6 local state to GitHub `main` before Stage 7. Treat it as a backup checkpoint only, not as Phase 23 closure or Stage 7 authorization.

### Stage 7 Planning - Documented

Tracked by `progress/PROGRESS-STEP-87.md`.

Planning-only decisions:

- Stage 7 should be a separate whole-game autonomous bug bash after Stage 6, not part of the Stage 6 critical live-multiplayer firebreak.
- Proposed Stage 7 lanes: solo gameplay, Daily/Calendar, Async Multiplayer, Live Multiplayer post-Stage-6 regression, auth/sync, stats/economy/history, words/definitions/admin, and responsive/accessibility/performance.
- Stage 7 should fix clear bugs discovered during systematic testing. It should not add features, redesign the app, implement a dedicated Multiplayer tab, or start deferred feature work unless the user explicitly authorizes that expanded scope.
- Stage 7 should end with the full gate, remote Supabase verification for relevant flows, desktop/tablet/mobile browser smoke, Vercel preview, and a bug inventory listing fixed/deferred issues.
- Stage 7 implementation is not authorized until the user explicitly approves a separate execution prompt or clearly expands an execution prompt to include Stage 7.

## 4. Core Invariants To Preserve

- Product name remains `brrrdle`.
- Daily OG and Daily GO remain fixed at 5 letters.
- Practice OG and Practice GO support lengths 2 through 35.
- Exact Wordle duplicate-letter tile coloring remains canonical.
- Hard Mode, definitions, stats, auth/sync, sounds, themes, economy, resume, sharing, and admin behavior must not regress.
- The Calendar remains the central daily hub after Phase 22.
- Existing solo daily countdown behavior remains unchanged; Daily Multiplayer has a separate UTC countdown.
- Multiplayer work must not corrupt solo stats, streaks, coins, resume lanes, or daily history.

## 5. Architecture Notes

- `src/game/` owns canonical session/game behavior. Avoid duplicating rules in UI code.
- `src/daily/` owns daily date keys, clocks, variants, countdowns, and reset behavior.
- `src/calendar/` owns the central daily hub and daily archive surface.
- `src/multiplayer/` contains async, live, and competitive multiplayer foundations. Keep rating/scoring/matchmaking pure and keep rating settlement centralized rather than in React components.
- `src/account/` owns guest storage schema, sync, transfer, settings, and persistence migration.
- `src/app/App.tsx` is a high-conflict integration surface. Prefer one coordinator owner for final wiring.
- `CHANGELOG.md`, `progress/PROGRESS.csv`, `CONSTITUTION.md`, and `AGENT-IMPLEMENTATION-PLAN.md` are high-conflict governance surfaces.

## 6. Progress ID Ledger

Recent IDs:

- `69`: Phase 23 Stage 1 implementation complete.
- `70`: Phase 23 Stage 2 planning/governance documented.
- `71`: Multi-agent workflow scaffolding, documentation, and infrastructure only.
- `72`: Phase 23 Stage 2 live/realtime multiplayer complete and verified.
- `73`: Phase 23 Stage 3 planning/governance documented; no Stage 3 code authorized.
- `74`: Phase 23 Stage 3 ELO/rating/matchmaking/scoring implementation complete.
- `75`: Phase 23 Stage 3 stabilization for true online async/live multiplayer plus mobile Calendar/tooltips.
- `76`: Phase 23 Stage 3 stabilization follow-up for account-backed matchmaking, multiplayer play surface parity, forfeit, and password reset.
- `77`: Phase 23 next stabilization follow-up planning for realtime refresh, Daily Multiplayer participation limits, separate daily answers, rival identity, countdown navigation, and Multiplayer-tab path.
- `78`: Phase 23 stabilization follow-up execution for realtime refresh/entry, Daily claims, separate Daily Async/Live answers, rival identity, and countdown navigation.
- `79`: Phase 23 Stage 4 planning for Daily Multiplayer lobby visibility, claim bypass closure, per-player lobby limits, creator cancellation, and Live spectator foundations.
- `80`: Phase 23 Stage 4 implementation for per-user active limits, creator cancellation, Daily claim hardening, and Live spectator foundations.
- `81`: Phase 23 Stage 5 planning for multiplayer UX fixes and polish; no implementation authorized.
- `82`: Phase 23 Stage 5 execution start and broad implementation tracking.
- `83`: Phase 23 Stage 5 Email + Password sign-in action cleanup.
- `84`: Phase 23 Stage 5 Daily bucket, Daily Live, and Practice Live flow fixes.
- `85`: Phase 23 Stage 5 final verification and completion.
- `86`: Phase 23 Stage 6 planning for critical Live Multiplayer stability and Daily claim release fixes; no implementation authorized.
- `87`: Phase 23 Stage 6 real multiplayer testing addendum and Stage 7 whole-game bug-bash planning; no implementation authorized.
- `88`: Phase 23 Stage 6 execution start for Live Multiplayer stability and Daily claim release fixes.
- `89`: Phase 23 Stage 6 core live stability fixes and focused regressions.
- `90`: Phase 23 Stage 6 final verification and preview handoff; Stage 6 complete.
- `91`: Phase 23 Stage 6 safety-backup PR and squash merge to GitHub `main` before Stage 7.

Use the next available integer for the next major step. Do not overwrite existing progress files.

## 7. Recommended Workflow For Next Authorized Step

For the next Phase 23 step:

1. Re-read `CONSTITUTION.md`, `agents.md`, this file, `AGENT-IMPLEMENTATION-PLAN.md` §28, `progress/PROGRESS-STEP-69.md` through `progress/PROGRESS-STEP-87.md`, the Phase 23 spec, and `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md`.
2. Confirm the branch and pull latest remote changes.
3. Confirm the user has explicitly authorized Stage 7 execution, additional PR work, another specific follow-up, dedicated Multiplayer tab work, deferred feature work, or later-phase implementation.
4. Keep final `src/app/App.tsx`, progress tracking, and changelog integration under coordinator ownership.
5. Run the full local gate plus desktop/mobile browser smoke before reporting completion for any implementation work.
6. Halt for user review before any further PR or merge unless explicitly authorized.

## 8. Document Organization Decision

The root still contains many approved phase specs. They are intentionally left in place for now because the plan, changelog, and progress reports refer to their current root paths. A future reorganization should be its own docs-only pass so references can be updated atomically.

## 9. Update Policy

Update this file when:

- A phase or stage closes.
- The user authorizes a new stage.
- A durable architectural decision is made.
- A new progress ID is added.
- A coordination rule changes.

Keep entries concise and factual. Do not store secrets, private preview identifiers beyond already-public links, or temporary command noise.
