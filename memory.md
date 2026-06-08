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
- Stage 7 broad bug-bash execution is authorized and opened under `phase_id = 92` on branch `codex/phase-23-stage-7`.
- Stage 7 final verification and handoff are tracked under `phase_id = 94`.
- Stage 8 planning for Multiplayer unification, Practice time limits, and memory/performance remediation is documented under `phase_id = 95`; Stage 8 execution and verification are complete under `phase_id = 96`-`97`.
- Stage 9 planning is documented under `phase_id = 98`; Stage 9 implementation and verification for timed Practice synchronization, Practice Hard Mode, and multiplayer scoring are complete under `phase_id = 99`-`100`.
- Stage 10 planning for unified Multiplayer debugging and bug fixes is documented under `phase_id = 101`; Stage 10 implementation and verification are complete under `phase_id = 102`-`103`.
- The verified post-Stage-10 local state has been backed up to GitHub under `phase_id = 104` on branch `backup/phase-23-stage-10-final-2026-06-06` with Draft PR `https://github.com/ryanjosephkamp/brrrdle/pull/18`. Do not merge that PR unless the user explicitly authorizes it later.
- Phase 23 Final Stabilization & Broad Debugging Pass planning is documented under `phase_id = 105`; execution and final verification are complete under `phase_id = 106`-`109`.
- Stage 12 planning for Multiplayer Hard Mode enforcement plus performance/responsiveness fixes is documented under `phase_id = 110`; implementation and verification are complete under `phase_id = 111` through `phase_id = 113`.
- Stage 13 planning for Practice solo UX bugs plus Multiplayer GO result propagation is documented under `phase_id = 114`; execution and verification are complete under `phase_id = 115` through `phase_id = 117`.
- Stage 14 planning for post-Stage-13 polish, bug fixes, minimal Multiplayer tab foundations, and spectator foundation hardening is documented under `phase_id = 118`; execution and verification are complete under `phase_id = 119` through `phase_id = 121`.
- Stage 15 planning for GO transition polish plus authenticated Practice seed fixes is documented under `phase_id = 122`; execution and final verification are complete under `phase_id = 123` through `phase_id = 125`.
- Stage 16 planning for Practice Multiplayer GO-only bug fixes is documented under `phase_id = 126`; execution is opened under `phase_id = 127`; focused fixes are tracked under `phase_id = 128`; real two-client E2E and remote cleanup are tracked under `phase_id = 129`; final verification and handoff are complete under `phase_id = 130`.
- Do not create further Phase 23 PRs, merges, releases, implement the full dedicated Multiplayer tab, expand spectators beyond low-risk hardening, start deferred feature work, or start later-phase implementation until the user explicitly approves that later step.

## 2. Current Governance Files

- `CONSTITUTION.md`: binding project constitution. Version 3.4 after this scaffolding pass.
- `AGENT-IMPLEMENTATION-PLAN.md`: active implementation plan. Version 3.55 after the Stage 16 final verification and handoff.
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

### Stage 7 Execution - Opened

Planning tracked by `progress/PROGRESS-STEP-87.md`; execution opened by `progress/PROGRESS-STEP-92.md`.

Durable execution decisions:

- Stage 7 should be a separate whole-game autonomous bug bash after Stage 6, not part of the Stage 6 critical live-multiplayer firebreak.
- Proposed Stage 7 lanes: solo gameplay, Daily/Calendar, Async Multiplayer, Live Multiplayer post-Stage-6 regression, auth/sync, stats/economy/history, words/definitions/admin, and responsive/accessibility/performance.
- Stage 7 should fix clear bugs discovered during systematic testing. It should not add features, redesign the app, implement a dedicated Multiplayer tab, or start deferred feature work unless the user explicitly authorizes that expanded scope.
- Stage 7 should end with the full gate, remote Supabase verification for relevant flows, desktop/tablet/mobile browser smoke, Vercel preview, and a bug inventory listing fixed/deferred issues.
- Stage 7 execution is now authorized under `phase_id = 92`. The known priority bugs are Live lobby creator auto-entry, Practice Live word-length selection timing/visibility after both players connect, and remaining Live Multiplayer phase instability.
- Stage 7 must not create a PR, merge, release, implement the dedicated Multiplayer tab, expand spectators beyond bug fixes/non-regression, redesign, or add deferred features.
- `phase_id = 93` records the first Stage 7 implementation checkpoint. Durable decision: Live matches now require per-player entry acknowledgement before Practice word-length selection or Daily countdown clocks arm. This is stored additively in the live match projection and avoids a schema migration while giving both browser clients time to enter the match surface.
- Stage 7 also isolated in-memory Daily guard anchors by `DailyVariant`; solo local-midnight and multiplayer UTC dailies must never reuse each other's live anti-gaming baseline.

### Stage 8 - Complete

Planning tracked by `progress/PROGRESS-STEP-95.md`. Implementation and verification tracked by `progress/PROGRESS-STEP-96.md` and `progress/PROGRESS-STEP-97.md`.

Planning-only decisions from `PHASE-23-STAGE-8-MULTIPLAYER-UNIFICATION-AND-TIME-LIMITS-SPEC-2026-06-05.md`:

- Stage 8 is an active, gated Multiplayer unification and performance pass.
- The implementation removes the user-facing and internal Async/Live split and moves toward one coherent Multiplayer model.
- The reliable async/durable-row foundation is the behavioral baseline. Live-specific code should be removed, migrated, or compatibility-gated rather than extended.
- Daily Multiplayer remains strictly asynchronous: five letters, UTC day key, UTC-midnight expiry, separate OG/GO answers, and no time-limit UI.
- Practice Multiplayer gains optional creator-selected chess-clock-style total time per side: no limit, 30 seconds, 1 minute, 2 minutes, 5 minutes, 10 minutes, 30 minutes, or 1 hour.
- Memory/performance remediation is blocking Stage 8 scope. Future execution should investigate duplicate Supabase clients, realtime subscriptions, polling intervals, timers, restore loops, large projections, and rerender hot spots with two authenticated browser contexts.
- `phase_id = 96` records the first implementation checkpoint: mounted Live App/Calendar paths and obsolete Live modules were removed, Practice Multiplayer chess-clock primitives were added, and focused regressions passed. The existing durable `async_multiplayer_games` Supabase table/local key may remain as compatibility plumbing while the app presents one unified Multiplayer model.
- Dedicated Multiplayer tab work, spectator expansion, notifications, bots, social systems, redesign, PR creation, merge, release, and later-phase work remain gated.

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
- `src/multiplayer/` contains the unified Multiplayer domain/repository/panel plus competitive helpers. Keep rating/scoring/matchmaking pure and keep rating settlement centralized rather than in React components.
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
- `92`: Phase 23 Stage 7 execution kickoff and test matrix.
- `93`: Phase 23 Stage 7 core stabilization fixes and focused regression tests.
- `94`: Phase 23 Stage 7 final verification and handoff.
- `95`: Phase 23 Stage 8 planning for Multiplayer unification, Practice time limits, and memory/performance remediation; no implementation authorized.
- `96`: Phase 23 Stage 8 unified Multiplayer implementation checkpoint and focused regressions.
- `97`: Phase 23 Stage 8 final verification and handoff for unified Multiplayer, Practice chess clocks, Daily asynchronous preservation, and memory/performance smoke.
- `98`: Phase 23 Stage 9 planning for timed Practice Multiplayer timer bugs, Practice Multiplayer Hard Mode, and multiplayer scoring; no implementation authorized.
- `99`: Phase 23 Stage 9 focused implementation for per-player multiplayer sessions, stale timed save guards, Practice Hard Mode lobby state, and multiplayer scoring; full verification pending.
- `100`: Phase 23 Stage 9 final verification and handoff for timed Practice synchronization, Practice Hard Mode, multiplayer scoring, Supabase save hardening, browser/Supabase E2E, and responsive smoke.
- `101`: Phase 23 Stage 10 planning for unified Multiplayer debugging and bug fixes; no implementation authorized.
- `102`: Phase 23 Stage 10 implementation checkpoint for cross-client board/keyboard projection, timed Practice clock checkpointing, and timed draft stability.
- `103`: Phase 23 Stage 10 final verification and handoff complete for user review.
- `104`: Post-Stage-10 safety backup branch and Draft PR created on GitHub; backup/governance only, no merge authorized.
- `105`: Phase 23 Final Stabilization & Broad Debugging Pass planning; documentation/governance only, execution remains gated.
- `106`: Phase 23 Final Stabilization execution kickoff, final test matrix, and baseline resource snapshot.
- `107`: Phase 23 Final Stabilization first bug-fix batch for multiplayer stale saves, settlement, solo defaults, and navigation.
- `108`: Phase 23 Final Stabilization timed Practice clock-churn fix and real two-client multiplayer verification.
- `109`: Phase 23 Final Stabilization final verification and preview handoff complete for user review.
- `110`: Phase 23 Stage 12 planning for Practice Multiplayer Hard Mode enforcement, multiplayer responsiveness, lobby latency, keyboard latency, and sound playback; no implementation authorized.
- `111`: Phase 23 Stage 12 execution kickoff, protected state, resource baseline, and reproduction checklist.
- `112`: Phase 23 Stage 12 Hard Mode enforcement, multiplayer responsiveness/sound, and Supabase row-write reduction.
- `113`: Phase 23 Stage 12 final verification and handoff for Hard Mode enforcement and responsiveness fixes.
- `114`: Phase 23 Stage 13 planning for Practice solo UX bugs and Multiplayer GO result propagation; no implementation authorized.
- `115`: Phase 23 Stage 13 execution kickoff, protected state, baseline resources, and bug checklist.
- `116`: Phase 23 Stage 13 Practice solo resume-key stability fixes for results and submitted-row animation.
- `117`: Phase 23 Stage 13 final Multiplayer GO propagation fix and verification handoff.
- `118`: Phase 23 Stage 14 planning for post-Stage-13 polish, minimal Multiplayer tab foundations, and spectator foundation hardening; no implementation authorized.
- `119`: Phase 23 Stage 14 execution kickoff, protected state, baseline resources, and bounded checklist.
- `120`: Phase 23 Stage 14 first implementation checkpoint for hidden Multiplayer route foundations, spectator-adjacent participant guard, repository guard, and docs clarification.
- `121`: Phase 23 Stage 14 final verification and handoff; hidden Multiplayer foundations, nonparticipant guard, repository/docs hardening, real Supabase-backed browser verification, full local gate, resource cleanup, and Vercel preview/share verification complete.
- `122`: Phase 23 Stage 15 planning for GO transition prior-puzzle visibility and authenticated Practice per-account seed fixes; implementation remains gated.
- `123`: Phase 23 Stage 15 execution kickoff, protected dirty worktree, baseline resources, reproduction plan, and checklist.
- `124`: Phase 23 Stage 15 focused fixes for GO solved-row hold prior-row display and authenticated Practice account-specific seed counters; final verification remains pending.
- `125`: Phase 23 Stage 15 final verification and handoff; real two-client Supabase-backed Multiplayer GO E2E, authenticated two-account Practice seed checks, Daily determinism checks, full local gate, responsive smoke, resource cleanup, and Vercel preview/share verification complete.
- `126`: Phase 23 Stage 16 planning for two Practice Multiplayer GO-only bugs: accumulated previous GO solution visibility and prior-solution keyboard color state.
- `127`: Phase 23 Stage 16 execution kickoff, protected local branch/worktree state, baseline resources, reproduction plan, and Practice Multiplayer GO-only checklist.
- `128`: Phase 23 Stage 16 focused reproduction and fixes for Practice Multiplayer GO previous-solution stack projection and prior-solution keyboard state.
- `129`: Phase 23 Stage 16 real two-client Supabase-backed Practice Multiplayer GO E2E, remote row/user cleanup, and Practice-GO-only keyboard derivation tightening.
- `130`: Phase 23 Stage 16 final verification and handoff; focused/full local gates, responsive smoke, real E2E, remote cleanup, resource check, and Vercel preview verification complete.

Use the next available integer for the next major step. Do not overwrite existing progress files.

## 7. Recommended Workflow For Next Authorized Step

For the next Phase 23 step:

1. Re-read `CONSTITUTION.md`, `agents.md`, this file, `AGENT-IMPLEMENTATION-PLAN.md` §28, `progress/PROGRESS-STEP-69.md` through `progress/PROGRESS-STEP-130.md`, the Phase 23 spec, and the relevant Stage 4/5/6/7/8/9/10/final-stabilization/Stage 12/Stage 13/Stage 14/Stage 15/Stage 16 planning and progress notes.
2. Confirm the branch and pull latest remote changes.
3. Confirm the user has explicitly authorized any PR work, merge, release, dedicated Multiplayer tab work, deferred feature work, or later-phase implementation before making source-code or migration changes.
4. Keep final `src/app/App.tsx`, progress tracking, and changelog integration under coordinator ownership.
5. Run the full local gate plus desktop/mobile browser smoke before reporting completion for any implementation work.
6. Halt for user review before any further PR or merge unless explicitly authorized.

Stage 7 durable verification note:

- Live timers are entry-gated through `playerEntryAt` in the live match projection; Practice selection and Daily countdown should not arm merely because a lobby matched.
- Stage 7 real two-client verification covered Practice Async, Daily Async, Practice Live, and Daily Live against the configured Supabase project; temporary auth users and exact related async/live/claim rows were removed after probing.
- Do not rely on local one-device multiplayer simulations for future multiplayer claims; pair browser E2E with remote Supabase row probes when fixing async/live behavior.

Stage 8 durable verification note:

- The active app now exposes unified Practice Multiplayer and Daily Multiplayer only. Do not reintroduce mounted Live App/Calendar surfaces or obsolete Live modules without new explicit user authorization.
- Daily Multiplayer remains strictly asynchronous/no-clock; Practice Multiplayer owns all chess-clock time-limit behavior.
- The deployed `async_multiplayer_games` table and `brrrdle:async-multiplayer:v1` local key remain private compatibility plumbing. They are not user-facing product terminology.
- Supabase persistence keeps unified `multiplayer:*` rating buckets inside game projections, but writes legacy-compatible top-level bucket values when needed for historical deployed table constraints.
- Stage 8 real two-client verification covered untimed Practice, timed Practice with visible 30-second clocks, and Daily Multiplayer with durable Daily claim rows. CDP memory smoke with two authenticated contexts stayed bounded after Live path removal.

Stage 9 planning note:

- `PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md` is the Stage 9 source of truth. Planning was tracked under `phase_id = 98`; implementation and verification are complete under `phase_id = 99`-`100`.
- The highest-risk Stage 9 item was the timed Practice Multiplayer timer/board synchronization bug. The fix was verified with two authenticated browser contexts and focused tests for submitted guess persistence and active-player-only clock decrement.
- Practice Multiplayer Hard Mode is now a creator-selected, rival-visible, locked lobby setting that reuses canonical solo Hard Mode validation.
- Multiplayer scoring remains fair and deterministic: points come from each player's own guesses and solve status, with OG/GO winner/draw rules documented in tests. Do not use future follow-up work to overhaul ELO/rating unless the user explicitly expands scope.
- Daily Multiplayer remains strictly asynchronous, no-clock, five-letter, UTC-day based, and separate between OG and GO. Do not add Practice time limits or Practice Hard Mode lobby controls to Daily Multiplayer.

Stage 9 implementation note:

- `phase_id = 99` adds per-player `playerSessions` to unified Multiplayer games while keeping the shared `serializedSession` as compatibility data. Future Stage 9 fixes should read the viewer board with `getMultiplayerSessionForPlayer` and avoid rebuilding UI state from the shared compatibility session.
- Timed Practice expiration is viewer-owned in the App interval, and repository saves now guard against incoming projections that would lose already-saved moves. Do not weaken these stale-save checks during browser/Supabase follow-up.
- Practice Hard Mode is Practice-only, creator-selected before join, stored on the game, and copied into each canonical session. Daily Multiplayer must not show or accept this control.
- Multiplayer scoring is deterministic and per-player; points should remain explainable and not directly penalize a player for the rival's guesses.
- `phase_id = 100` completes Stage 9 verification. Preserve these durable decisions in future work:
  - The active player board must be read from `playerSessions` via `getMultiplayerSessionForPlayer`; `serializedSession` is compatibility/answer plumbing only.
  - Stored `playing` status is valid and should not be re-derived as terminal from the compatibility session.
  - GO move history must use the submitting player's current puzzle index.
  - Supabase first writes use duplicate-safe upsert semantics, while existing updates remain stale-guarded.
  - Daily Multiplayer remains no-clock and no-Hard-Mode regardless of Practice Multiplayer settings.

Stage 10 planning note:

- `PHASE-23-STAGE-10-MULTIPLAYER-DEBUGGING-AND-BUGFIXES-SPEC-2026-06-06.md` is the Stage 10 source of truth. Planning is tracked under `phase_id = 101`; execution remains gated.
- Stage 10 should reproduce the reported cross-client board/keyboard synchronization bug with two authenticated browser contexts before source changes.
- The likely investigation seam is the relationship among `playerSessions`, shared `serializedSession`, repository subscription/projection reconciliation, and `MultiplayerGameSurface` rendering.
- Preserve the Stage 9 invariant that the canonical viewer board comes from `getMultiplayerSessionForPlayer`; any shared rival-move visibility should come from a safe projection of durable moves/session evidence rather than overwriting the rival's canonical session.
- Daily Multiplayer must remain strictly asynchronous, no-clock, no-Hard-Mode-lobby-control, five-letter, UTC-day keyed, and claim-safe.
- Stage 10 does not authorize a dedicated Multiplayer tab, spectator expansion, notification system, bot/social features, redesign, scoring/rating overhaul, PR, merge, release, or source edits until a future execution prompt explicitly approves them.

Stage 10 implementation checkpoint:

- `phase_id = 102` reproduced the reported board/keyboard sync bug with two real authenticated browser contexts against Supabase before source edits.
- The durable fix keeps `playerSessions` canonical and player-owned, but lets `MultiplayerGameSurface` render a display-only board/keyboard projection from shared `game.moves` for the active puzzle index. Future fixes must not copy one player's submitted guess into the rival's canonical session to make it visible.
- Timed Practice clock ticks must checkpoint both `timeRemainingMs` and `turnStartedAt` together. Persisting only remaining time while leaving the old `turnStartedAt` double-counts elapsed time on the next tick/render.
- Timed Practice clock-only saves must not reset a typed draft guess. `MultiplayerGameSurface` reset keys should respond to gameplay changes such as move history, turn, status, and player id, not ordinary clock-only `updatedAt` changes.
- Focused tests and real two-client Supabase E2E passed for untimed two-turn refresh, timed Practice, and Practice Hard Mode. Final Stage 10 lint/test/build/typecheck/diff/responsive/preview gate remains pending.

Stage 10 final verification note:

- `phase_id = 103` completes Stage 10 for user review. Full verification passed: lint, 459 tests, build, API typecheck, diff check, real two-client Supabase E2E, and desktop/tablet/390px browser smoke.
- Preview deployment: `https://brrrdle-qkrszkoqp-ryanjosephkamps-projects.vercel.app/?_vercel_share=wJfg309HjQthxKiqe0vtRR0uUIeNIVPp`.
- Daily Multiplayer non-regression smoke confirmed no Practice-only clock or Hard Mode controls on the Daily surface.
- PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating overhaul, and later-phase work remain gated.

Post-Stage-10 safety backup note:

- `phase_id = 104` records the backup branch `backup/phase-23-stage-10-final-2026-06-06` and Draft PR `https://github.com/ryanjosephkamp/brrrdle/pull/18`.
- The Draft PR is a safety snapshot of the verified Stage 10 state. It should not be merged without explicit later user authorization.
- The backup step was documentation/Git-only; no game code, UI behavior, tests, Supabase migrations, force-push, branch deletion, release, or later-phase work was performed.

Final stabilization planning note:

- `phase_id = 105` plans the Phase 23 Final Stabilization & Broad Debugging Pass.
- `phase_id = 106` opens execution of the Phase 23 Final Stabilization & Broad Debugging Pass and records the final test matrix plus baseline resource snapshot.
- The pass is a bug-fix/stabilization sweep across unified Multiplayer, Daily Multiplayer, solo gameplay, Calendar, auth/sync, stats/economy/history, Words/definitions/admin, responsive/accessibility, and performance.
- Real two-client Supabase-backed browser E2E is required for multiplayer claims, paired with remote Supabase probes and cleanup when possible.
- Resource safety is part of the gate. Run only one dev server, avoid parallel full verification, use minimal browser contexts, close contexts promptly, and monitor memory because the baseline snapshot shows high memory compression even though no Stage 7-style runaway process is visible.
- Daily Multiplayer must remain strictly asynchronous, no-clock, no-Hard-Mode-control, five-letter, UTC-day keyed, answer-separated, and claim-safe.
- Do not add new features, redesign, scoring/rating changes, spectator expansion, notification systems, bots, social features, the dedicated Multiplayer tab, PRs, merges, or releases unless the user explicitly authorizes them later.

Final stabilization first implementation note:

- `phase_id = 107` hardens the unified Multiplayer repository against stale zero-move saves that would drop a newer rival join, regress a non-waiting row to waiting, or overwrite terminal state with older playing state.
- Multiplayer result settlement should run for repository snapshots and background expiry paths, not only direct local submit/forfeit handlers.
- `hardModeDefault` now applies to fresh solo OG/GO Daily and Practice sessions while stored Daily sessions and resume slots remain authoritative.
- Visible navigation should use `getPrimaryNavigationRoutes` so placeholder-only routes stay out of normal rail navigation.

Final stabilization timed Practice note:

- `phase_id = 108` changes timed Practice clock persistence: non-terminal chess-clock ticks must remain local/display-only and should not be saved every second.
- Durable timed Practice writes should happen on submitted turns, where the submitting player's elapsed time is checkpointed and the opponent clock starts, or on actual timeout/loss.
- This decision reduces Supabase Realtime churn, avoids clock-only subscription races around move submission, and helps keep two-authenticated-context browser testing memory-stable.
- Real two-client Supabase E2E passed for untimed Practice, timed Practice, Practice Hard Mode, and Daily Multiplayer after this change. Daily Multiplayer remains no-clock and no-Hard-Mode.

Final stabilization completion note:

- `phase_id = 109` completes the Phase 23 Final Stabilization & Broad Debugging Pass for user review.
- Full verification passed: lint, 463 tests, build, API typecheck, diff check, desktop/tablet/390px smoke, real two-client Supabase E2E, remote Supabase probes/cleanup, memory/resource observation, and Vercel preview/share verification.
- Final preview share URL: `https://brrrdle-3zm8qw3vg-ryanjosephkamps-projects.vercel.app/?_vercel_share=y8zu6kGORWOe2zed4KoDJjk6UUyTOkob`.
- No PR, merge, release, dedicated Multiplayer tab, spectator expansion, redesign, scoring/rating rule change, or out-of-scope feature work was performed.

Stage 12 planning note:

- `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md` is the Stage 12 source of truth. Planning is tracked under `phase_id = 110`; execution remains gated.
- Stage 12 is targeted bug-fix/stabilization only: Practice Multiplayer Hard Mode enforcement, multiplayer turn propagation latency, lobby create/join latency, on-screen keyboard responsiveness, and sound effects not playing.
- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- Future execution must reproduce/verify Hard Mode and responsiveness claims with real two-client Supabase-backed browser E2E plus remote Supabase probes/cleanup.
- Do not use Stage 12 to implement a dedicated Multiplayer tab, spectator expansion, new features, scoring/rating/ELO changes, broad refactoring, PR, merge, or release.

Stage 12 execution kickoff note:

- `phase_id = 111` opens Stage 12 execution after explicit user authorization.
- The active `codex/phase-23-stage-10` worktree remains intentionally dirty and is the source of truth; do not reset, pull over, rebase, switch away from, or discard this state.
- The first checkpoint records a baseline resource snapshot and reproduction checklist before source fixes. No local app dev server was detected at kickoff; resource checks showed moderate load and compressed memory pressure but no Stage 7-style multi-GB app runaway.
- Stage 12 execution should use one dev server, minimal two-client browser contexts, sequential heavy gates, and periodic memory/process checks.
- Reproduce Hard Mode enforcement failure, turn/lobby latency, keyboard responsiveness, and sound silence before fixing where practical.

Stage 12 first implementation note:

- `phase_id = 112` fixes Practice Multiplayer Hard Mode enforcement across alternating turns by validating a submitted guess against shared `game.moves` for the active puzzle before mutating the current player's canonical session.
- Keep `playerSessions` canonical and player-owned. Do not copy one player's submitted guesses into the rival's canonical session to enforce or display Hard Mode constraints.
- Shared submitted moves can constrain Practice Hard Mode validation and display shared board/keyboard evidence; Daily Multiplayer remains strictly asynchronous, no-clock, no-Hard-Mode-control, five-letter, UTC-day keyed, and claim-safe.
- Multiplayer keyboard responsiveness now depends on functional draft updates. Avoid reintroducing stale `draftSession` closures for rapid key taps.
- Multiplayer sound is now wired from `MultiplayerGameSurface`, and the sound engine requests `AudioContext.resume()` for user-triggered sounds when the context is suspended.
- Supabase multiplayer saves should skip unchanged participant projections to reduce redundant realtime churn. Preserve stale-save protections and durable ordering when changing this path.

Stage 12 completion note:

- `phase_id = 113` completes Stage 12 for user review.
- Practice Multiplayer Hard Mode enforcement now validates submitted guesses against shared submitted moves for the active puzzle before mutating the current player's canonical `playerSessions` entry.
- Real two-client Supabase-backed E2E verified Practice Hard Mode rejection, untimed Practice, timed Practice, Daily Multiplayer non-regression, remote Supabase durable rows/claims/session fields, cleanup, responsive smoke, sound calls, and resource behavior.
- Full verification passed: lint, 466 tests, build, API typecheck, diff check, responsive smoke, remote Supabase probes/cleanup, Vercel preview/share verification, and final resource check.
- Final preview share URL: `https://brrrdle-jp7f1lkee-ryanjosephkamps-projects.vercel.app/?_vercel_share=MpGGeAx0lbud1bFh2qEzaSh9Jz8AWoMD`.
- No PR, merge, release, dedicated Multiplayer tab, spectator expansion, new features, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed.

Stage 13 planning note:

- `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md` is the Stage 13 source of truth. Planning is tracked under `phase_id = 114`; execution remains gated.
- Stage 13 is targeted bug-fix/stabilization only and is limited to three bugs: Practice solo submitted rows re-animating on on-screen keyboard input, Practice solo skipping the results screen by immediately starting a new puzzle, and Multiplayer GO solved-puzzle row/advance propagation across both clients.
- Future execution must make one focused fix at a time and verify after each logical change before moving on.
- Bug 1 and Bug 3 should be reproduced before source fixes where practical; Bug 3 requires real two-client Supabase-backed browser E2E.
- Preserve Daily Solo working behavior, Daily Multiplayer no-clock/no-Hard-Mode/five-letter/UTC claim invariants, and all Stage 12 wins: Hard Mode enforcement, keyboard responsiveness, sound playback, stale-save protections, timed Practice behavior, and unchanged-projection save skipping.
- Do not use Stage 13 to implement a dedicated Multiplayer tab, spectator expansion, new features, scoring/rating/ELO changes, broad refactoring, redesign, PR, merge, or release.

Stage 13 execution kickoff note:

- `phase_id = 115` opens Stage 13 execution after explicit user authorization.
- The active `codex/phase-23-stage-10` worktree remains intentionally dirty and is the source of truth; do not reset, pull over, rebase, switch away from, or discard this state.
- Baseline resource checks showed general compressed-memory pressure and unrelated Python/Jupyter listeners, but no local app dev server or Stage 7-style app runaway from this pass.
- Stage 13 execution must proceed one focused fix at a time: Practice solo missing results screen, Practice solo repeated submitted-row animation, then Multiplayer GO solved-puzzle propagation.
- Reproduce Bug 1 and Bug 3 before fixing where practical, and use real two-client Supabase-backed browser E2E for Bug 3.

Stage 13 Practice solo fix note:

- `phase_id = 116` fixes the shared Practice solo remount root cause for Bug 1 and Bug 2.
- Practice OG/GO must treat incoming Practice resume slots as one-shot restore sources. Do not reintroduce active `initialResume` prop changes into the Practice game session key, because live resume captures are written on every input and will remount the current board/result surface.
- Pre-fix browser reproduction confirmed Practice OG submitted rows replayed reveal animations on later key input and completion reset into a fresh puzzle. Post-fix browser checks confirmed Practice OG/GO submitted rows no longer re-animate and Practice OG/GO result/share states remain visible after completion.
- Multiplayer GO solved-puzzle propagation is complete under `phase_id = 117`: solved GO answers synchronize both canonical player sessions when both players are on the solved puzzle, both clients briefly see the all-green solved row, and terminal GO definitions wait until the short solved-row hold ends.
- Stage 13 final verification passed lint, full tests, build, API typecheck, diff check, responsive smoke, and focused Stage 12 regression checks. Real temporary-account browser attempts reached sign-in but did not persist the host-created Practice GO row in this harness, so do not describe Stage 13 Bug 3 as having a fully clean create/join/submit browser-save E2E pass.

Stage 14 planning note:

- `phase_id = 118` documents Stage 14 planning from `PHASE-23-STAGE-14-POST-STAGE-13-POLISH-AND-MULTIPLAYER-EXPANSION-FOUNDATIONS-SPEC-2026-06-07.md`; execution remains gated.
- Stage 14 is scoped to approved small post-Stage-13 bugs/UX polish, minimal non-breaking Multiplayer tab foundations, and low-risk spectator foundation hardening.
- Minimal Multiplayer tab foundations must not replace Calendar or Practice multiplayer entry points and must not become the full dedicated Multiplayer tab implementation without later explicit authorization.
- Preserve Stage 12 wins: Practice Multiplayer Hard Mode enforcement, keyboard responsiveness, sound playback, stale-save protections, timed Practice clock behavior, row-write reduction, and scoring/result settlement.
- Preserve Stage 13 wins: Practice solo one-shot resume behavior, submitted-row animation stability, post-game results visibility, and Multiplayer GO solved-row hold/advance behavior.
- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- Stage 14 does not authorize PR creation, merge, release, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, or redesign.

Stage 14 execution kickoff note:

- `phase_id = 119` opens Stage 14 execution after explicit user authorization.
- The active `codex/phase-23-stage-10` worktree remains intentionally dirty and is the source of truth; do not reset, pull over, rebase, switch away from, or discard this state.
- Baseline resource checks showed high compressed-memory pressure and no local app dev server. One unrelated Python listener was visible on `127.0.0.1:8765`; future browser E2E should continue one-dev-server, minimal-context, sequential-gate discipline.
- No specific post-Stage-13 bug list was supplied in the execution prompt, so Stage 14 should perform only a bounded in-scope polish/foundations audit and fix clear, small, reproducible issues.
- Stage 14 execution remains limited to scoped polish, minimal non-breaking Multiplayer tab foundations, and low-risk spectator hardening. Preserve Stage 12 and Stage 13 wins plus Daily Multiplayer invariants.

Stage 14 first implementation checkpoint note:

- `phase_id = 120` adds hidden/inert Multiplayer route foundations only. The future `multiplayer` route metadata and foundation shell are not in primary navigation and do not replace Calendar or Practice entry points.
- Active runtime spectator-adjacent hardening is limited to preventing authenticated nonparticipants from mounting the gameplay surface for another users' playing match.
- The unified Supabase multiplayer repository remains on `async_multiplayer_games`; legacy `live_*` and `live_match_spectators` artifacts are documented as compatibility schema and should not be treated as active Stage 14 runtime without later explicit authorization.
- Focused changed-area tests passed for route metadata, Calendar/Multiplayer panels, the foundation shell, and repository table usage. Full Stage 14 gate, browser smoke, real two-client Supabase verification where relevant, resource check, and preview remain pending.

Stage 14 final verification note:

- `phase_id = 121` completes Stage 14 for user review. Hidden/inert Multiplayer foundations remain out of primary navigation; Calendar and Practice remain the active multiplayer entry points.
- Final verification passed focused changed-area tests, lint, 472 full-suite tests, build, API typecheck, diff check, desktop/tablet/390px smoke, real Supabase-backed multi-context browser E2E, remote probes/cleanup, resource checks, and Vercel preview/share verification.
- The real browser E2E used host/rival/observer authenticated contexts to verify Practice Multiplayer create/join/turn propagation, the nonparticipant gameplay guard, and Daily no-Practice-controls non-regression. Temporary Stage 14 users and the touched row were cleaned up.
- Vercel direct previews may be deployment-protected. It is acceptable to provide a verified protected share URL in the final chat, but do not commit the bypass token into repository docs.
- No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed.

Stage 15 planning note:

- `phase_id = 122` documents Stage 15 planning from `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`; implementation remains gated.
- Stage 15 is a strict two-bug pass: keep previously completed GO puzzles visible during the all-green solved-row hold, and make authenticated Practice OG/GO sequences per-account instead of globally identical.
- Execution must reproduce both bugs before source fixes, use small targeted changes, and verify after each logical fix.
- Daily OG/GO must remain globally deterministic for the same UTC day. Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- Preserve Stage 12 Hard Mode/keyboard/sound/row-write/timed/scoring wins, Stage 13 Practice/GO wins, and Stage 14 hidden foundations/nonparticipant guard/unified repository path.
- No broader Practice overhaul, Daily behavior change, GO timing/animation-feel work beyond the direct visual-regression fix, full dedicated Multiplayer tab work, spectator expansion, scoring/rating change, PR, merge, release, broad refactor, redesign, or out-of-scope work is authorized.

Stage 15 execution kickoff note:

- `phase_id = 123` opens Stage 15 execution after explicit user authorization.
- The active `codex/phase-23-stage-10` worktree remains intentionally dirty and is the source of truth; do not reset, pull over, rebase, switch away from, or discard this state.
- Baseline resource checks showed no local Vite app server, one unrelated Python listener on `127.0.0.1:8765`, one existing Playwright-style Chrome process before Stage 15 testing, and elevated compressed-memory pressure. Use one dev server, minimal browser contexts, and explicit cleanup.
- Stage 15 must reproduce both scoped bugs before source fixes: GO prior-puzzle disappearance during solved-row hold, and identical authenticated Practice OG/GO sequences across distinct accounts.

Stage 15 focused-fix note:

- `phase_id = 124` fixes the GO solved-row hold display path by preserving canonical/prefilled GO rows while overlaying shared durable moves; this remains display-only and must not become canonical rival-session mutation.
- `phase_id = 124` fixes authenticated Practice seed predictability with account-id-derived Practice seeds plus persisted per-mode counters in guest/cloud progress. Guest Practice fallback remains local-counter based.
- Daily OG/GO setup remains outside the account seed path and must stay globally deterministic for the same UTC day.
- Focused verification passed for `MultiplayerGameSurface`, account seed helpers, migration/transfer, solo hard-mode defaults, and OG/GO session setup; final browser E2E, full automated gate, resource check, and preview remain pending.

Stage 15 final verification note:

- `phase_id = 125` completes Stage 15 for user review.
- Real two-client Supabase-backed browser E2E verified Practice Multiplayer GO lobby creation/join, five answer submissions through the multiplayer on-screen keyboard, prior completed GO rows visible during solved-row hold, final definitions transition, and remote durable row state with five moves, `status=won`, and two `playerSessions`.
- Authenticated two-account browser verification confirmed Practice OG and Practice GO sequences differ by account, Practice seed counters persist from UI actions, and Daily OG/GO remain globally deterministic for the same UTC day.
- Full verification passed focused changed-area tests, lint, 478 full-suite tests, build, API typecheck, diff check, responsive smoke, remote Supabase probes/cleanup, resource checks, and Vercel preview/share verification.
- No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed.

Stage 16 planning note:

- `phase_id = 126` documents Stage 16 planning from `PHASE-23-STAGE-16-PRACTICE-MULTIPLAYER-GO-BUGFIXES-SPEC-2026-06-08.md`.
- The user prompt referenced `phase_id = 123`, but the repository already uses `phase_id = 123` through `phase_id = 125` for Stage 15, so Stage 16 planning uses the next available id, `126`.
- Stage 16 is limited to two Practice Multiplayer GO-only bugs: all previously completed GO puzzle solutions must remain accumulated/visible for subsequent puzzles, and gray/orange board evidence from prior solutions must color the on-screen keyboard for the current puzzle.
- Daily Multiplayer GO, Multiplayer OG, solo modes, and the Stage 15 Practice seed system are out of scope and must remain untouched unless the user explicitly changes the spec later.
- `phase_id = 127` opens Stage 16 execution. The protected local branch is `codex/phase-23-stage-15-final`; the Stage 16 planning/governance dirt is preserved as source-of-truth local state.
- The kickoff baseline found no local Vite listener on 5173/5174 and high pre-existing memory pressure (`17G used`, `6286M compressor`, `145M unused`), so use one Vite server, minimal browser contexts, sequential heavy gates, and explicit cleanup.
- Both Practice Multiplayer GO bugs still must be reproduced before source fixes.
- `phase_id = 128` reproduced both bugs with focused `MultiplayerGameSurface` regressions before fixing. The fix preserves the Practice GO prior-row prefix before overlaying shared durable moves, derives keyboard color state from merged display guesses, and avoids stale Practice GO solved-row holds after a newer move. This remains display-only projection and must not become rival canonical session mutation.
- `phase_id = 129` tightens keyboard derivation so merged display-evidence keyboard state is Practice GO-only; non-Practice-GO multiplayer modes retain the old keyboard source path.
- `phase_id = 129` real two-client Supabase-backed browser E2E passed: host/rival signed in through isolated contexts, created/joined Practice Multiplayer GO through the UI, verified accumulated puzzle-3 rows on both clients (`erhus` -> `ernes` -> `escar`), verified prior-only absent key evidence (`H`) on both keyboards, finished the five-puzzle chain to `status=won` with six moves and both player sessions, then deleted the touched row and temporary auth users. A cleanup probe confirmed no Stage 16 E2E rows remained.
- `phase_id = 130` completes Stage 16 final verification and handoff. Focused changed-area tests, lint, the 480-test full suite, build, API typecheck, diff check, responsive smoke, real two-client Supabase-backed Practice Multiplayer GO E2E, remote probes/cleanup, resource check, and Vercel preview verification passed. A deployment-specific Vercel shareable-link record was created with a 30-day TTL, but no verified browser share URL was returned by the CLI/API and no bypass token was committed. Stage 16 changed only Practice Multiplayer GO behavior; Daily Multiplayer GO, Multiplayer OG, solo modes, Daily determinism, and the Stage 15 Practice seed system were not modified.

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
