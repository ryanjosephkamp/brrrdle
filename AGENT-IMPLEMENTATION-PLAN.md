# AGENT-IMPLEMENTATION-PLAN.md

**Project**: brrrdle
**Plan Version**: 3.58
**Date**: 2026-06-07
**Status**: Draft for user review — amended with Hugging Face word-list source integration; further amended on 2026-05-27 with the `ADDITIONS-2026-05-27.md` addendum (see §18); further amended on 2026-05-27 with the `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md` addendum (see §19); further amended on 2026-05-27 with the `AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md` addendum (see §20); further amended on 2026-05-28 with the Mobile & Tablet Responsiveness phase (see §21); further amended on 2026-05-28 with the Local Word Lists addendum (`LOCAL-WORD-LISTS-SPEC-2026-05-28.md`) as Phase 17 (see §22); further amended on 2026-05-28 with the Word List Difficulty Tiers + Word Explorer / Go / Settings improvements addendum (`PHASE-18-WORD-DIFFICULTY-AND-GO-IMPROVEMENTS-SPEC-2026-05-28.md`) as Phase 18 (see §23), whose §23.2 (Phase 18.0) performs an approved model-agnostic governance/repo cleanup and a root `README.md` upgrade in the planning stage; further amended on 2026-05-30 (v1.9) to integrate the user's definitive answers to the five §23.11 open questions (now recorded as resolved decisions) and to record the Phase 18.0 `README.md` upgrade; further amended on 2026-05-30 (v2.0) to record that Phase 18 **Prompt 2** has applied the approved constitution phase-range amendment (`CONSTITUTION.md` §1/§4/§5/§5.2/§17, v3.1 → v3.2) and the associated repo/doc adjustments, ahead of Prompt 3 (full Phase 18 feature execution); further amended on 2026-05-30 (v2.1) to append the Phase 19 addendum (`PHASE-19-ENHANCED-STATS-RESUME-CONFIGURABLE-GO-AND-POLISH-SPEC-2026-05-30.md`) as §24 (Phase 19 — Enhanced Statistics Visualizations, Configurable Go Puzzle Count, Full Resume-Most-Recent-Game Activation, Advanced Polish & Theming Foundations), whose §24.2 (Phase 19.0) performs the approved planning-stage governance/repo cleanup and a root `README.md` polish while deferring all game code changes (sub-phases 19.1–19.6) to explicit user approval ("Start Prompt 2" or equivalent); further amended on 2026-05-30 (v2.2) to record that Phase 19 **Prompt 2** has confirmed the planning-stage progress-step numbering decision (`phase_id = 46` / `progress/PROGRESS-STEP-46.md`, approved by the user) and applied the associated small clarity/governance adjustments (no game code), ahead of Prompt 3 (full Phase 19 feature execution, sub-phases 19.1–19.6); further amended on 2026-05-31 (v2.3) to upgrade `CONSTITUTION.md` to v3.3 for multi-agent workflow governance and append the Phase 20 addendum (`PHASE-20-DRAMATIC-UI-LAYOUT-EXPLORATION-SPEC-2026-05-30.md`) as §25, with governance-only tracking at `phase_id = 54`; further amended on 2026-06-01 (v2.4) to record Phase 20 completion (Variant 03 "Lunar Signal Deck" finalized) and append the Phase 21 addendum (`PHASE-21-UI-POLISH-AND-THEMING-FOUNDATION-SPEC-2026-06-01.md`) as §26 (Phase 21 — UI Polish & Theming Foundation), whose Prompt 1 is a planning + governance-only step (no UI polish, layout, or theming-foundation code) tracked at `phase_id = 59`, ahead of Prompt 2 (full Phase 21 execution); further amended on 2026-06-01 (v2.5) to record Phase 21 **Prompt 2**, a governance-only refined-instruction update incorporating the user's clarifications (keep the Lunar Signal Deck layout/tab structure mostly the same, adopt a very minimalist default background of plain black or a simple grid pattern, and capture the current Lunar Signal Deck visual style as one individual theme to be enabled in Phase 22) into the spec, §26, changelog, and progress at `phase_id = 60` — with no code, UI, layout, or theming-foundation changes — ahead of Prompt 3 (full Phase 21 execution); further amended on 2026-06-02 (v2.6) to record Phase 21 **Prompt 3** (full execution, `phase_id = 61`): added the `src/theme/surface.ts` surface-theme foundation (`minimal` default + `lunar-signal`), adopted a minimalist near-black default backdrop with a faint static grid, captured the original Lunar Signal Deck treatment as the single opt-in `lunar-signal` surface (gated by a `data-surface` attribute, to be enabled in Phase 22), and removed dead Phase-20 exploration CSS (`prism` and `command-shell` shells) plus the unused `Layout` component — with the Lunar Signal Deck layout/tab structure and every gameplay/accent-theme/stats/auth/resume/economy/sharing behavior preserved, and the Phase 22 theming system itself not implemented; further amended on 2026-06-02 (v2.7) to incorporate the **Phase 21 Addendum – Theme Proposal Templates** spec (`PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md`) as a governance/planning-only step appended at §26.8, recording the new `themes/proposals/template_proposals/` + `full_proposals/` + `theme_proposals.csv` structure that Phase 21 must produce before closing, tracked at `phase_id = 62` — with no theme code, no proposal Markdown files, no CSV population, and no folder creation in this step (the requested "§26.1" addendum is recorded as §26.8 because the §26.1–§26.7 slots were already occupied, and the version advances to v2.7 because v2.6 was already consumed by the Phase 21 Prompt 3 full-execution amendment above); further amended on 2026-06-02 (v2.8) to incorporate the **Phase 22 – Advanced Calendar / Midnight Handling + Timezone-Aware Daily Reset (+ Targeted Bug Fixes)** spec (`PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02.md`) as §27, a planning + governance-only step (Prompt 1) that records the phase goals, scope, deliverables, verification requirements, and two-prompt workflow and makes Phase 22 the active next phase — with **no** daily-rollover, timezone, countdown, reset-alert, sound, dev-tool, or other source code implemented in this step (tracked at `phase_id = 64`), ahead of Prompt 2 (full Phase 22 execution); further amended on 2026-06-03 (v2.9) to record that Phase 22 **Prompt 2** (full execution) is complete (`phase_id = 65`) — timezone-aware local-midnight daily reset, balanced anti-gaming, cross-page countdown indicator, reset alert + brand-new unique sound, global Settings toggle, dev-mode Simulate Time tool, and the modular `src/daily/` service — and to incorporate the **Phase 22 Addendum – Calendar (Central Daily Hub) & Countdown Positioning** spec (`PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md`) as §27.10, a planning + governance-only step that records the Calendar-as-central-daily-hub feature (first tab, "Play Today's OG/GO" quick-access buttons, coin-gated past dailies with a one-guess-permanently-unlocks rule, past dailies treated as full daily experiences), the countdown repositioning to the top of the UI (context-aware on the landing page vs. game tabs), and the deliverables/scope/verification — with **no** calendar, navigation, routing, state-management, countdown-repositioning, economy, or other source code implemented in this step (tracked at `phase_id = 66`), ahead of a separately approved full-execution prompt.
**Authority**: Must follow `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, and the approved v2.6 plan in `BRRRDLE-OVERVIEW.md`.

**Latest amendment (v3.1, 2026-06-03)**: Phase 23 is now approved and incorporated as §28 from `PHASE-23-MULTIPLAYER-FOUNDATIONS-AND-POLISH-SPEC-2026-06-03.md`. Stage 1 is authorized and executed first: targeted UI/UX bug fixes, the `DailyVariant` multiplayer split, async/turn-based multiplayer foundations for Practice and Daily, Calendar multiplayer indicators/archive access, and the second UTC Daily Multiplayer countdown. Stage 2 (live/real-time multiplayer), Stage 3 (ELO/matchmaking/scoring), and optional Stage 4 remain gated pending explicit user approval.

**Latest amendment (v3.2, 2026-06-03)**: Phase 23 Stage 2 planning is now documented under §28.5–§28.8 as a governance-only update (`phase_id = 70`). Stage 1 remains complete (`phase_id = 69`). Stage 2 implementation is still **not authorized**; the new sections only define the proposed live/real-time multiplayer architecture, likely modules, verification strategy, risks, and Stage 3/Stage 4 direction.

**Latest amendment (v3.3, 2026-06-04)**: Phase 23 multi-agent workflow scaffolding is now documented under §28.9 as a governance/documentation/infrastructure-only update (`phase_id = 71`). This step creates root `agents.md`, root `memory.md`, `docs/planning-index.md`, and `progress/README.md`; upgrades `CONSTITUTION.md` to v3.4 with targeted coordination-file rules; and records that Stage 2 implementation remains **not authorized**.

**Latest amendment (v3.4, 2026-06-04)**: Phase 23 Stage 2 implementation is now explicitly authorized by the user and opened under `phase_id = 72`. §28.10 records the Stage 2 execution coordination plan, file-ownership slices, and final verification gate. Stage 3 ELO/rating/scoring, PR creation, and merge remain gated.

**Latest amendment (v3.5, 2026-06-04)**: Phase 23 Stage 2 implementation is complete and verified under `phase_id = 72`. Live Practice and Daily Multiplayer now have a reducer/domain foundation, live lobby/match UI, Practice Live word-length selection, Calendar Daily Live entry and `L-OG`/`L-GO` indicators, a local/Supabase repository seam, Supabase migration/RLS/realtime hooks, and documentation/progress updates. Stage 3 ELO/rating/scoring, PR creation, and merge remain gated pending explicit user approval.

**Latest amendment (v3.6, 2026-06-04)**: Phase 23 Stage 3 planning is now documented under §28.6 and tracked under `phase_id = 73` as a governance/documentation-only update. The plan defines the ELO/rating model, advanced matchmaking, custom-game/ranked split, scoring/performance model, multiplayer stats surfaces, data-model approach, Supabase/RLS considerations, fairness and anti-abuse policy, work-slice plan, risks, and verification strategy. No Stage 3 code is authorized or implemented; PR creation and merge remain gated.

**Latest amendment (v3.7, 2026-06-04)**: Phase 23 Stage 3 implementation is complete under `phase_id = 74`. The implementation adds pure ELO/rating, scoring, matchmaking, and custom-game modules with tests; additive ranked/custom metadata on async/live matches; competitive result/rating display state in guest progress schema v6; ranked/custom controls and scoring summaries in async/live panels; multiplayer rating/result summaries in Stats; additive Supabase Stage 3 migration and docs; and progress/changelog updates. Rating eligibility remains strict: ELO changes require ranked, authenticated, distinct-player, durable result evidence, while guest/local preview and custom-unranked games remain unrated. PR creation and merge remain gated pending explicit user approval.

**Latest amendment (v3.8, 2026-06-04)**: Phase 23 Stage 3 stabilization is complete under `phase_id = 75`. This targeted follow-up fixes the user-reported multiplayer architecture gap by making async and live multiplayer signed-in, durable online experiences instead of one-device simulations; adds a Supabase-backed async repository and `async_multiplayer_games` migration; corrects live lobby joining/seat ownership and Realtime refresh semantics; removes dual-side controls from async/live panels; fixes mobile Calendar indicator density; and portals Settings tooltips above clipped containers. PR creation, merge, release, and optional Stage 4 remain gated pending explicit user approval.

**Latest amendment (v3.9, 2026-06-04)**: Phase 23 Stage 3 stabilization follow-up is complete under `phase_id = 76`. This targeted bug-fix pass verifies and hardens real account-backed async/live matchmaking, switches multiplayer play surfaces back to canonical solo-style boards plus on-screen keyboard input, disables consumable/pay-to-continue affordances in multiplayer, adds async/live forfeit handling for loss/rating projection, fixes Supabase RLS/write seams for second-player joins and matched live lobbies, and adds a dedicated password-reset interface for Supabase recovery links. PR creation, merge, release, and optional Stage 4 remain gated pending explicit user approval.

**Latest amendment (v3.10, 2026-06-04)**: Phase 23 next stabilization follow-up planning is documented under §28.13 and tracked as `phase_id = 77` as a governance-only response to `brrrdle_observations_2026_06_04.md`. The plan scopes realtime refresh fixes for Daily Async and Live selection entry, the Daily Multiplayer once-per-day participation rule, separate Daily Async and Daily Live answer selection, async header copy corrections, rival identity display, clickable Daily Multiplayer countdown navigation, and the clean path toward a future dedicated Multiplayer tab. No implementation, source-code changes, Supabase migrations, tests, PR creation, merge, release, or optional Stage 4 work is authorized by this amendment.

**Latest amendment (v3.11, 2026-06-04)**: Phase 23 stabilization follow-up execution for §28.13 is complete under `phase_id = 78`. The implementation adds automatic derived selection/entry behavior for Daily Async and Live surfaces, deterministic separate Daily Async vs Daily Live answer selection, client and Supabase-backed Daily Multiplayer claim guards for `async:og`, `async:go`, `live:og`, and `live:go`, safe rival identity display, Daily Multiplayer countdown navigation into Daily Async, corrected async headers, and lightweight groundwork for a future dedicated Multiplayer tab without replacing Calendar/Practice entry points. PR creation, merge, release, and optional Stage 4 remain gated pending explicit user approval.

**Latest amendment (v3.12, 2026-06-05)**: Phase 23 Stage 4 planning is documented under §28.15 and tracked under `phase_id = 79` as a governance/documentation-only update using `PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md` as the dedicated Stage 4 source. The plan scopes Daily Async/Daily Live lobby visibility fixes, Daily claim bypass closure, per-player five-lobby limit confirmation, creator cancellation for unjoined lobbies, safe rival identity carry-forward, and Live spectator foundations. No implementation, source-code edits, UI work, Supabase migrations, tests, PR creation, merge, release, or dedicated Multiplayer tab work is authorized by this amendment.

**Latest amendment (v3.13, 2026-06-05)**: Phase 23 Stage 4 implementation is complete under `phase_id = 80`. This execution adds per-authenticated-user active limits for async/live multiplayer, closes Daily create bypasses in domain and authenticated repository-save failure paths, adds creator-only cancellation for unjoined async/live lobbies, preserves cancelled Daily claims while releasing active slots, introduces Live spectator foundations as a distinct read-only role with Supabase persistence/RLS, and updates docs/tests/progress. PR creation, merge, release, and dedicated Multiplayer tab implementation remain gated pending explicit user approval.

**Latest amendment (v3.14, 2026-06-05)**: Phase 23 Stage 5 planning is documented under §28.17 and tracked under `phase_id = 81` as a governance/documentation-only update using `PHASE-23-STAGE-5-MULTIPLAYER-UX-FIXES-AND-POLISH-SPEC-2026-06-05.md` as the dedicated Stage 5 source. The plan scopes sign-in flow cleanup, corrected four-bucket Daily Multiplayer participation behavior, Daily Live join/pulse reliability, Daily GO fixed-length flow cleanup, Practice Live entry, and Practice Live word-length timing fixes. No implementation, source-code edits, UI/component work, Supabase migrations, tests, PR creation, merge, release, dedicated Multiplayer tab work, notification system, history/theme tab, bot opponent, or broader UX redesign is authorized by this amendment.

**Latest amendment (v3.15, 2026-06-05)**: Phase 23 Stage 5 implementation is complete under `phase_id = 82` through `phase_id = 85`. The execution removes the duplicate Email + Password sign-in affordance and orders auth actions consistently, adds regressions for the independent `async:og`, `async:go`, `live:og`, and `live:go` Daily Multiplayer buckets, hardens Daily Live so Daily games cannot fall back into Practice word-length selection, improves Practice/Live joined-match entry by preferring the viewer's active match, adds an accessible reduced-motion-safe pulse affordance for actionable non-host `Join live lobby`, verifies remote Supabase claim/join behavior, and records the completed verification gate. PR creation, merge, release, dedicated Multiplayer tab work, notification system, floating manager, History/Theme tabs, bots, exports/GIFs, broader redesign work, and later-phase work remain gated pending explicit user approval.

**Latest amendment (v3.16, 2026-06-05)**: Phase 23 Stage 6 planning is documented under §28.19 and tracked under `phase_id = 86` as a governance/documentation-only update using `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md` as the dedicated Stage 6 source. The plan scopes six critical bug fixes only: Daily Multiplayer claim release after pre-join cancellation, live board/history realtime synchronization, Practice Live post-selection flashing, creator-side word-length selection visibility, refresh preserving the current multiplayer tab/game, and general live multiplayer state instability. No implementation, source-code edits, UI/component work, tests, Supabase migrations, build/config changes, PR creation, merge, release, spectator work, dedicated Multiplayer tab work, deferred feature work, or new feature work is authorized by this amendment.

**Latest amendment (v3.17, 2026-06-05)**: Phase 23 Stage 6 planning is tightened and Phase 23 Stage 7 is proposed under `phase_id = 87` as a governance/documentation-only update. Stage 6 execution, if later authorized, must include meaningful real multiplayer testing inside Codex using two distinct authenticated browser contexts plus remote Supabase probes for the listed live flows. The broader autonomous whole-game debugging pass is intentionally split into Stage 7 (§28.20) so Stage 6 remains the critical six-bug live-multiplayer stability pass. No implementation, source-code edits, UI/component work, tests, Supabase migrations, build/config changes, PR creation, merge, release, spectator work, dedicated Multiplayer tab work, deferred feature work, or broad debugging execution is authorized by this amendment.

**Latest amendment (v3.18, 2026-06-05)**: Phase 23 Stage 6 implementation is complete and verified under `phase_id = 88` through `phase_id = 90`. The execution resolves the six approved live-multiplayer stability bugs only: pre-join Daily cancellation now releases the creator's Daily claim for that exact bucket, live match projection saves reconcile concurrent player updates, live clients receive refresh wakeups for board/history changes, Practice Live word-length selection no longer remounts on ordinary realtime updates, creators and rivals enter selection/gameplay without manual refresh, and route/Calendar multiplayer surfaces restore after browser refresh. Remote Supabase migration `phase23_stage6_daily_claim_release` was applied and probed, and real two-client browser verification passed for Practice Live and Daily Live on desktop-style and 390px mobile viewports. PR creation, merge, release, Stage 7 broad debugging, dedicated Multiplayer tab work, spectator expansion, deferred features, and later-phase work remain gated pending explicit user approval.

**Latest amendment (v3.19, 2026-06-05)**: The user explicitly authorized a narrow safety-backup PR and squash merge of the current local Phase 23 Stage 6 state to GitHub `main` before Stage 7. This backup is tracked under `phase_id = 91`; it does not close Phase 23, start Stage 7, create a release, expand the dedicated Multiplayer tab, or authorize deferred feature work. Further PRs, merges, releases, Stage 7 execution, and later-phase work remain gated pending explicit user approval.

**Latest amendment (v3.20, 2026-06-05)**: Phase 23 Stage 7 whole-game autonomous bug bash and stabilization is now explicitly authorized by the user and opened under `phase_id = 92`. The execution must start from the PR #16 safety-backup state on GitHub `main` (`49e7f400c1ba8f6be3e048795d990b8db5ad6933`), create a dedicated Stage 7 branch, record a test/audit matrix before source edits, prioritize the known post-Stage-6 Live Multiplayer creator-entry and Practice Live word-length-selection bugs, run broad solo/daily/async/live/auth/stats/words/responsive audits, perform meaningful real two-client Supabase-backed multiplayer testing, and finish with the full verification gate plus Vercel preview. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion beyond bug fixes, redesign, and deferred feature work remain gated.

**Latest amendment (v3.21, 2026-06-05)**: Phase 23 Stage 7 core stabilization fixes are implemented and tracked under `phase_id = 93`. The first bug-fix batch adds projection-based Live player entry acknowledgement before Practice word-length selection or Daily countdown timers arm, promotes a creator's selected matched lobby into its live match, tightens countdown start guards, persists host participant presence after entry, isolates in-memory Daily anti-gaming anchors per `DailyVariant`, locks solo Hard Mode toggles after the first guess, keys Word Explorer live-load responses by requested length, and improves mobile dialog scrolling. Focused regression tests pass; full Stage 7 lint/test/build/typecheck/browser/Supabase verification and preview deployment remain pending. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, and deferred feature work remain gated.

**Latest amendment (v3.22, 2026-06-06)**: Phase 23 Stage 7 stabilization and verification handoff is tracked under `phase_id = 94`. Real two-client browser E2E against the configured Supabase project covered Practice Async, Daily Async, Practice Live, and Daily Live create/discover/join/play flows; remote Supabase probes confirmed durable async moves, matched live lobbies/matches, participant rows, entry acknowledgements, and Daily claim rows; desktop, tablet-like, and 390px browser smoke passed with no console errors or horizontal overflow; Word Explorer definition modal rendering was sampled. The full lint/test/build/typecheck/whitespace gate and preview deployment must remain part of the final handoff evidence. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, and deferred feature work remain gated.

**Latest amendment (v3.23, 2026-06-06)**: Phase 23 Stage 8 planning is documented under §28.25 and tracked under `phase_id = 95` as a governance/documentation-only update using `PHASE-23-STAGE-8-MULTIPLAYER-UNIFICATION-AND-TIME-LIMITS-SPEC-2026-06-05.md` as the dedicated Stage 8 source. The plan scopes unifying Async and Live into one Multiplayer model, removing Live-specific terminology and code paths, preserving Daily Multiplayer as strictly asynchronous with UTC-midnight expiry only, adding creator-selected chess-clock-style total time limits for Practice Multiplayer, and investigating/fixing the excessive memory consumption observed during multi-client testing. No source-code edits, UI/component work, Supabase migrations, tests, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or Stage 8 execution is authorized by this amendment.

**Latest amendment (v3.24, 2026-06-06)**: Phase 23 Stage 8 implementation is tracked under `phase_id = 96`-`97`. The execution unifies the active multiplayer implementation around the durable turn-based Multiplayer model, removes mounted Live App/Calendar paths and obsolete Live modules, keeps Daily Multiplayer strictly asynchronous with no time-limit controls, adds creator-selected Practice Multiplayer chess-clock total time limits, preserves legacy Supabase/local-storage compatibility where needed, and records memory/performance verification with two authenticated browser contexts. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, notifications, bots, social features, redesign, and later-phase work remain gated pending explicit user approval.

**Latest amendment (v3.26, 2026-06-06)**: Phase 23 Stage 9 execution is documented under §28.28 and tracked under `phase_id = 99`-`100` using `PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md` as the dedicated Stage 9 source. The implementation fixes timed Practice Multiplayer board/clock synchronization with per-player sessions and stale-save guards, adds Practice-only Hard Mode as a creator-selected locked lobby setting, and adds deterministic OG/GO multiplayer points with clear winner/draw summaries. Full lint/test/build/typecheck/diff checks, focused regressions, real two-client Supabase browser E2E, remote row probes, and responsive smoke are recorded in the Stage 9 progress reports. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, and later-phase work remain gated.

**Latest amendment (v3.27, 2026-06-06)**: Phase 23 Stage 10 planning is documented under §28.29 and tracked under `phase_id = 101` as a governance/documentation-only update using `PHASE-23-STAGE-10-MULTIPLAYER-DEBUGGING-AND-BUGFIXES-SPEC-2026-06-06.md` as the dedicated Stage 10 source. The plan scopes a targeted unified Multiplayer debugging pass focused on the critical cross-client board/keyboard synchronization bug where turn history updates but the rival board/keyboard does not, plus closely related multiplayer synchronization bugs discovered during testing. Daily Multiplayer must remain strictly asynchronous, no-clock, no-Hard-Mode-lobby-control, five-letter, and claim-safe. No source-code edits, UI/component work, tests, Supabase migrations, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or Stage 10 execution is authorized by this amendment.

**Latest amendment (v3.28, 2026-06-06)**: Phase 23 Stage 10 implementation checkpoint is tracked under `phase_id = 102`. The execution reproduced the reported cross-client Practice Multiplayer board/keyboard synchronization bug with two authenticated Supabase-backed browser contexts, fixed the visible board/keyboard projection so shared moves render for both players without overwriting canonical `playerSessions`, discovered and fixed timed Practice clock double-counting, and prevented timed clock-only saves from wiping an in-progress typed guess. Focused multiplayer tests and real two-client Supabase E2E now pass for untimed two-turn refresh, timed Practice, and Practice Hard Mode. Final lint/test/build/typecheck/diff-check, responsive smoke, preview deployment, and final Stage 10 handoff remain pending. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, and later-phase work remain gated.

**Latest amendment (v3.29, 2026-06-06)**: Phase 23 Stage 10 final verification and handoff are tracked under `phase_id = 103`. Full verification passed: `npm run lint`, `npm run test` (459 tests), `npm run build` (with the existing large-chunk advisory), `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, real two-client Supabase E2E, desktop/tablet/390px responsive smoke, and a Vercel preview deployment. Stage 10 is complete for user review. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating overhaul, and later-phase work remain gated.

**Latest amendment (v3.30, 2026-06-06)**: The user explicitly authorized a safety backup of the verified post-Stage-10 local repository state. The backup is tracked under `phase_id = 104`, using branch `backup/phase-23-stage-10-final-2026-06-06` and Draft PR #18 (`https://github.com/ryanjosephkamp/brrrdle/pull/18`) as a durable GitHub snapshot. This is a backup/governance operation only: it does not authorize merging the PR, pushing to `main`, release work, dedicated Multiplayer tab work, spectator expansion, redesign, or later-phase implementation.

**Latest amendment (v3.31, 2026-06-06)**: Phase 23 Final Stabilization & Broad Debugging Pass planning is documented under §28.33 and tracked under `phase_id = 105` as a governance/documentation-only update. The planned final stage is a bug-fix and stabilization sweep across the entire game, with special emphasis on unified Multiplayer real two-client Supabase behavior, Daily Multiplayer invariants, solo/Daily/auth/stats/Words/responsive non-regression, and full verification before Phase 23 closure. No source-code edits, UI/component work, test changes, Supabase migrations, implementation branch, PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating changes, or execution of the final debugging pass is authorized by this amendment.

**Latest amendment (v3.32, 2026-06-06)**: The user explicitly authorized execution of the Phase 23 Final Stabilization & Broad Debugging Pass. This kickoff is tracked under `phase_id = 106` and records the protected dirty Stage 8-10 worktree state, final debugging test matrix, baseline resource snapshot, required real two-client Supabase-backed multiplayer E2E, memory/resource safety guardrails, and scope boundaries. Source-code changes remain limited to bug fixes/stabilization found during this pass. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating changes, and later-phase work remain gated.

**Latest amendment (v3.33, 2026-06-07)**: Phase 23 Final Stabilization checkpoint `phase_id = 108` records the timed Practice Multiplayer clock-churn fix: non-terminal chess-clock ticks now stay local/display-only, while submissions and actual timeouts remain the only durable timer writes. Focused multiplayer tests and real two-client Supabase-backed browser E2E passed for untimed Practice, timed Practice, Practice Hard Mode, and Daily Multiplayer; full final gate and preview deployment remain pending.

**Latest amendment (v3.34, 2026-06-07)**: Phase 23 Final Stabilization final verification and handoff is complete under `phase_id = 109`. The final broad debugging pass fixed multiplayer stale-save/result-settlement issues, solo Hard Mode defaults, primary navigation filtering, and timed Practice clock churn; verified unified Multiplayer with real two-client Supabase-backed browser E2E; completed lint, tests, build, API typecheck, diff check, responsive smoke, remote Supabase probes, memory/resource observation, and Vercel preview deployment/share-link verification. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating changes, and later-phase work remain gated.

**Latest amendment (v3.35, 2026-06-07)**: Phase 23 Stage 12 planning is documented under §28.38 and tracked under `phase_id = 110` as a governance/documentation-only update using `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md` as the dedicated source of truth. The plan scopes Practice Multiplayer Hard Mode enforcement, multiplayer turn propagation latency, lobby creation/join latency, on-screen keyboard responsiveness, and sound effects not playing. Daily Multiplayer invariants remain strict: asynchronous, no-clock, no-Hard-Mode-control, five-letter, UTC-day keyed, and claim-safe. No source-code edits, UI/component work, tests, Supabase migrations, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactoring, or Stage 12 execution is authorized by this amendment.

**Latest amendment (v3.36, 2026-06-07)**: Phase 23 Stage 12 execution is explicitly authorized and opened under `phase_id = 111` as a targeted bug-fix/stabilization pass from `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md`. The kickoff protects the dirty `codex/phase-23-stage-10` worktree, records the baseline resource snapshot, and defines the reproduce-first checklist for Practice Multiplayer Hard Mode enforcement, multiplayer turn propagation latency, lobby creation/join latency, on-screen keyboard responsiveness, and sound playback. Stage 12 remains strictly scoped to those bug areas; Daily Multiplayer invariants, `playerSessions` ownership, timed Practice clock semantics, stale-save protections, scoring, and terminal settlement must not be weakened. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating/ELO changes, broad refactoring, and out-of-scope work remain gated.

**Latest amendment (v3.37, 2026-06-07)**: Phase 23 Stage 12 implementation checkpoint `phase_id = 112` records the reproduced Practice Multiplayer Hard Mode enforcement bug and the first fix batch. Real two-client Supabase-backed browser E2E confirmed that an alternating-turn Hard Mode violation was accepted before the fix and rejected after the fix. Focused tests pass for multiplayer domain, repository, game surface, and sound engine changes. The fix keeps `playerSessions` canonical, validates Practice Hard Mode against shared submitted moves for the active puzzle, improves multiplayer draft-key responsiveness and sound calls, resumes suspended AudioContexts on user-triggered sounds, and reduces unnecessary Supabase row writes by skipping unchanged projections. Full Stage 12 verification, broader browser smoke, cleanup, preview deployment, and final handoff remain pending. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactoring, and out-of-scope work remain gated.

**Latest amendment (v3.38, 2026-06-07)**: Phase 23 Stage 12 final verification and handoff are documented under `phase_id = 113`. Stage 12 fixed Practice Multiplayer Hard Mode enforcement across alternating turns, improved multiplayer keyboard responsiveness and sound playback, reduced redundant Supabase row writes, and verified lobby/turn propagation behavior with real two-client Supabase-backed E2E. Full local verification passed: lint, tests, build, API typecheck, diff check, responsive smoke, remote Supabase probes/cleanup, resource check, and Vercel preview/share verification. Stage 12 remains limited to targeted bug fixes; no PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactor, redesign, or out-of-scope work was performed.

**Latest amendment (v3.39, 2026-06-07)**: Phase 23 Stage 13 planning is documented under §28.42 and tracked under `phase_id = 114` as a governance/documentation-only update using `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md` as the dedicated source of truth. The plan scopes exactly three bugs: Practice solo submitted rows re-animating on keyboard input, Practice solo immediately starting a new game without showing results, and Multiplayer GO solved-puzzle result/advance propagation across both players. Execution remains gated and must use small focused changes with verification after each logical fix. Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, and Daily Multiplayer/Daily Solo invariants must be preserved. No source-code edits, UI/component work, tests, Supabase migrations, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactoring, or Stage 13 execution is authorized by this amendment.

**Latest amendment (v3.40, 2026-06-07)**: Phase 23 Stage 13 execution is explicitly authorized and opened under `phase_id = 115`. The kickoff protects the dirty `codex/phase-23-stage-10` worktree, records baseline process/memory state, and defines the reproduce-first/small-change verification checklist for the three Stage 13 bugs. Stage 13 remains limited to Practice solo submitted-row animation, Practice solo post-game results, and Multiplayer GO solved-puzzle propagation. Stage 12 wins, Daily Solo behavior, and Daily Multiplayer invariants remain non-negotiable. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating/ELO changes, broad refactoring, redesign, and out-of-scope work remain gated.

**Latest amendment (v3.41, 2026-06-07)**: Phase 23 Stage 13 first implementation checkpoint is complete under `phase_id = 116`. Practice OG/GO now treat incoming Practice resume slots as one-shot restore sources so live resume captures from the active session no longer remount the game on every key press or immediately after completion. Focused browser reproduction verified the pre-fix Practice OG row re-animation and completion-reset bugs, and post-fix browser checks verified Practice OG/GO submitted rows no longer re-animate on later input and Practice OG/GO results stay visible after completion. Multiplayer GO solved-puzzle propagation remains the next Stage 13 work item.

**Latest amendment (v3.42, 2026-06-07)**: Phase 23 Stage 13 final implementation and verification are complete under `phase_id = 117`. Multiplayer GO solved-puzzle propagation now synchronizes solved puzzle advancement across both canonical player sessions, holds the just-solved all-green row briefly on both clients, and delays terminal GO definitions until that solved-row hold has elapsed. Focused regressions cover first-puzzle advancement, final-puzzle completion, rival solved-row display, terminal definitions hold, Stage 12 Hard Mode controls/enforcement, sound engine behavior, and Practice solo resume-key stability. Full local verification passed: lint, tests, build, API typecheck, diff check, desktop/tablet/390px smoke, and resource/browser cleanup. Real browser Supabase attempts with temporary authenticated accounts reached sign-in but did not persist the host-created lobby in this harness, so final multiplayer persistence evidence for this checkpoint is domain/component coverage plus documented browser/cleanup attempts rather than a fully clean create/join/submit browser save path. No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactoring, redesign, or out-of-scope work was performed.

**Latest amendment (v3.43, 2026-06-08)**: Phase 23 Stage 14 planning is documented under §28.46 and tracked under `phase_id = 118` as a governance/documentation-only update using `PHASE-23-STAGE-14-POST-STAGE-13-POLISH-AND-MULTIPLAYER-EXPANSION-FOUNDATIONS-SPEC-2026-06-07.md` as the binding source of truth. The planned stage is scoped to post-Stage-13 bug fixes and polish, minimal non-breaking Multiplayer tab foundations, and low-risk spectator foundation hardening while preserving all Stage 12 and Stage 13 wins. Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe. No source-code edits, UI/component work, tests, Supabase migrations, implementation branch, PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, new gameplay features, scoring/rating changes, broad refactoring, redesign, or Stage 14 execution is authorized by this amendment.

**Latest amendment (v3.44, 2026-06-08)**: Phase 23 Stage 14 execution is explicitly authorized and opened under `phase_id = 119`. The kickoff checkpoint records the protected dirty `codex/phase-23-stage-10` worktree, baseline process/memory state, the absence of a local app dev server, and a bounded Stage 14 checklist. Stage 14 remains scoped to approved small post-Stage-13 polish/bug fixes, minimal non-breaking Multiplayer tab foundations, and low-risk spectator foundation hardening. Daily Multiplayer invariants, all Stage 12 wins, and all Stage 13 wins remain non-negotiable. PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, redesign, and out-of-scope work remain gated.

**Latest amendment (v3.45, 2026-06-08)**: Phase 23 Stage 14 first implementation checkpoint is complete under `phase_id = 120`. The implementation adds hidden, inert route metadata and a basic foundation shell for a future Multiplayer tab without adding it to primary navigation or replacing Calendar/Practice entry points; hardens the active multiplayer panel so authenticated nonparticipants do not mount the gameplay surface for a playing match; adds repository coverage that the unified Supabase adapter writes only through `async_multiplayer_games`; and clarifies Supabase docs that legacy Live spectator schema remains compatibility-only in the active Stage 14 app. Focused route, Calendar, multiplayer panel, foundation shell, and repository tests passed. Full Stage 14 lint/test/build/typecheck/diff gate, browser smoke, real two-client Supabase verification, resource check, and preview remain pending. PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, redesign, and out-of-scope work remain gated.

**Latest amendment (v3.46, 2026-06-08)**: Phase 23 Stage 14 final verification and handoff are complete under `phase_id = 121`. Stage 14 added hidden/inert Multiplayer route foundations, kept Calendar and Practice as the active multiplayer entry points, hardened authenticated nonparticipant gameplay mounting, confirmed the active unified Supabase adapter writes through `async_multiplayer_games`, and documented legacy Live spectator schema as compatibility-only. Focused changed-area tests, lint, the full test suite, build, API typecheck, diff check, desktop/tablet/390px smoke, real Supabase-backed multi-context browser E2E, remote Supabase probes/cleanup, final resource checks, and Vercel preview/share verification passed. No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed.

**Latest amendment (v3.47, 2026-06-08)**: Phase 23 Stage 15 planning is documented under §28.50 and tracked under `phase_id = 122` as a governance/documentation-only update using `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md` as the binding source of truth. Stage 15 is a narrow two-bug pass only: preserve previously completed GO puzzles during the all-green solved-row hold, and make authenticated Practice OG/GO puzzle sequences per-account instead of globally identical while keeping Daily OG/GO globally deterministic. Execution remains gated and must reproduce both bugs before any source fixes. No source-code edits, tests, UI/component work, Supabase migrations, implementation branch, PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, deferred feature work, scoring/rating changes, broad refactoring, redesign, or Stage 15 execution is authorized by this amendment.

**Latest amendment (v3.48, 2026-06-08)**: Phase 23 Stage 15 execution is explicitly authorized and opened under `phase_id = 123`. The kickoff checkpoint records the protected dirty `codex/phase-23-stage-10` worktree, baseline process/memory state, the absence of a local Vite app server, an unrelated Python listener on `127.0.0.1:8765`, and an existing Playwright-style Chrome process from before this Stage 15 run. Stage 15 remains limited to reproducing and fixing exactly two bugs: GO prior-puzzle visibility during the solved-row hold, and authenticated Practice OG/GO per-account seed uniqueness while preserving Daily determinism. PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, redesign, and out-of-scope work remain gated.

**Latest amendment (v3.49, 2026-06-08)**: Phase 23 Stage 15 focused fixes are tracked under `phase_id = 124`. The GO solved-row hold regression was reproduced in focused component coverage before fixing; `MultiplayerGameSurface` now preserves canonical/prefilled GO rows while overlaying shared durable moves for display-only cross-client projection. Authenticated Practice seed predictability was traced to the zero-based local Practice seed path; account-id-derived Practice seeds plus persisted per-mode counters now make authenticated Practice OG/GO sequences account-specific while guest Practice keeps the local counter fallback and Daily OG/GO setup remains globally deterministic. Focused changed-area tests and the account suite pass; final real browser/Supabase E2E, full automated gate, responsive smoke, resource check, preview, and final handoff remain pending. PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, redesign, and out-of-scope work remain gated.

**Latest amendment (v3.50, 2026-06-08)**: Phase 23 Stage 15 final verification and handoff are complete under `phase_id = 125`. Stage 15 fixed the GO solved-row hold display regression by preserving prior canonical/prefilled GO rows while overlaying shared durable moves, and fixed authenticated Practice seed predictability with account-derived Practice seeds plus persisted per-mode counters while keeping Daily OG/GO globally deterministic. Final verification passed focused changed-area tests, lint, 478 full-suite tests, build, API typecheck, diff check, desktop/tablet/390px smoke, real two-client Supabase-backed Multiplayer GO E2E, authenticated two-account Practice seed verification, remote Supabase probes/cleanup, resource checks, and Vercel preview/share verification. No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed.

**Latest amendment (v3.51, 2026-06-08)**: Phase 23 Stage 16 planning is documented under §28.54 and tracked under `phase_id = 126` as a governance/documentation-only update from `PHASE-23-STAGE-16-PRACTICE-MULTIPLAYER-GO-BUGFIXES-SPEC-2026-06-08.md`. Stage 16 is an extremely narrow two-bug pass for Practice Multiplayer GO only: ensure all previously completed GO puzzle solutions remain accumulated/visible for every subsequent puzzle, and ensure prior-solution gray/orange board evidence is reflected on the on-screen keyboard for the current puzzle. The prompt suggested `phase_id = 123`, but the current progress ledger already uses `phase_id = 123` through `phase_id = 125` for Stage 15 execution and verification, so the next sequential ID is `126`. No source-code edits, test changes, UI/component work, Supabase migrations, configuration changes, implementation branch, PR, merge, release, or Stage 16 execution is authorized by this amendment.

**Latest amendment (v3.52, 2026-06-08)**: Phase 23 Stage 16 execution is explicitly authorized and opened under §28.55 and `phase_id = 127`. The kickoff checkpoint records the protected local branch `codex/phase-23-stage-15-final`, the existing dirty Stage 16 planning/governance state, a resource baseline before dev-server/browser testing, and the reproduce-first plan for the two Practice Multiplayer GO-only bugs. No source-code fixes have been made at this checkpoint; Stage 16 execution remains bounded to Practice Multiplayer GO previous-solution stack visibility and prior-solution keyboard color projection only.

**Latest amendment (v3.53, 2026-06-08)**: Phase 23 Stage 16 focused reproduction and fixes are tracked under §28.56 and `phase_id = 128`. Focused `MultiplayerGameSurface` regressions reproduced both Practice Multiplayer GO bugs before the fix: a later shared move could drop prior accumulated GO solution rows from the rival display, and a prior-only gray/orange evidence letter could remain an unknown keyboard key. The fix preserves the Practice GO prior-row prefix before overlaying shared durable moves, derives keyboard state from the merged display evidence, and avoids resurrecting a stale Practice GO solved-row hold after a newer move. Focused component verification now passes; real two-client Supabase E2E, full automated gate, responsive smoke, resource check, and preview remain pending.

**Latest amendment (v3.55, 2026-06-08)**: Phase 23 Stage 16 final verification and handoff are complete under §28.58 and `phase_id = 130`. Stage 16 fixed only the Practice Multiplayer GO projection path: accumulated prior GO solution rows remain visible on later puzzles, prior gray/orange board evidence now colors the current keyboard through the existing precedence rules, and stale solved-row holds do not reappear after newer moves. Verification passed focused changed-area tests, full lint/test/build/API typecheck/diff gate, desktop/tablet/390px smoke, real two-client Supabase-backed Practice Multiplayer GO E2E, remote Supabase cleanup probes, final resource checks, and Vercel preview deployment verification. No PR, merge, release, Daily Multiplayer GO change, Multiplayer OG change, solo-mode change, Stage 15 Practice seed change, full dedicated Multiplayer tab implementation, spectator expansion, notification/floating-manager/bot/social/export work, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed.

**Latest amendment (v3.56, 2026-06-08)**: Phase 23 Stage 17 planning is documented under §28.59 and tracked under `phase_id = 131` as a governance/documentation-only update from `PHASE-23-STAGE-17-SOLO-PRACTICE-GO-CUSTOMIZE-LOCK-BUGFIX-SPEC-2026-06-08.md`. Stage 17 is an extremely narrow single-bug fix for Solo Practice GO only: the Customize box incorrectly locks Difficulty and chain length on a brand-new GO chain before any guess has been submitted. Future execution must reproduce the bug before source edits, make Solo Practice GO match the existing Solo Practice OG lock rule, and verify focused tests plus the full gate/browser smoke. No source-code edits, tests, UI/component changes, configuration changes, implementation branch, PR, merge, release, or Stage 17 execution is authorized by this amendment.

**Latest amendment (v3.57, 2026-06-08)**: Phase 23 Stage 17 execution is explicitly authorized and opened under §28.60 and `phase_id = 132`. The kickoff checkpoint protects the current local `codex/phase-23-stage-16-final` worktree with Stage 17 planning/governance dirt, records the baseline process/memory snapshot before browser testing, and defines the reproduce-first plan for the Solo Practice GO Customize lock bug. No source-code fixes have been made at this checkpoint; Stage 17 remains limited to correcting the Solo Practice GO Customize locking condition so fresh GO chains stay unlocked until the first submitted guess.

**Latest amendment (v3.58, 2026-06-08)**: Phase 23 Stage 17 final verification and handoff are complete under §28.61 and `phase_id = 133`. The Solo Practice GO Customize lock bug was reproduced before the fix with a failing focused regression: fresh Practice GO chains treated prefilled GO carry-over rows as submitted guesses and locked Difficulty/chain length before user input. The fix changes only the Solo Practice GO Customize locking condition to ignore setup-prefilled rows and lock only after an actual submitted guess beyond the prefilled count. Focused regressions, the full lint/test/build/API typecheck/diff gate, desktop/tablet/390px browser smoke, Solo Practice OG non-regression, and final resource checks passed. No PR, merge, release, Daily GO change, Multiplayer GO change, Solo Practice OG behavior change, Stage 15 Practice seed change, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed.

---

## Current Phase Index

| Phase / step | Plan section | Status |
| --- | --- | --- |
| Phase 0 | §2 | Complete |
| Phase 1 | §3 | Complete |
| Phase 2 | §4 | Complete |
| Phase 3 | §5 | Complete |
| Phase 4 | §6 | Complete |
| Phase 5 | §7 | Complete |
| Phase 6 | §8 | Complete |
| Phase 7 | §9 | Complete |
| Phase 8 | §10 | Complete |
| Phase 9 | §11 | Complete |
| Phase 10 | §12 | Complete |
| Phase 11 | §13 | Release PR ready |
| Phase 12 | §16 / §17 | Complete / residual fixes complete |
| Phase 13 | §18 | Complete |
| Phase 14 | §19 | Complete |
| Phase 15 | §20 | Complete |
| Phase 16 | §21 | Complete |
| Phase 17 | §22 | Complete |
| Phase 18 | §23 | Complete |
| Phase 19 | §24 | Complete; halt before production release |
| Phase 20 | §25 | Complete — Variant 03 "Lunar Signal Deck" finalized |
| Phase 21 | §26 | Implementation complete (Prompt 3): minimalist default surface + Lunar Signal Deck captured as one opt-in surface theme; theming-foundation and CSS-architecture cleanup done |
| Phase 21 Addendum – Theme Proposal Templates | §26.8 | Governance/planning only (`phase_id = 62`): incorporates `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md`; records the `themes/proposals/template_proposals/` + `full_proposals/` + `theme_proposals.csv` structure to produce before Phase 21 closes; templates authored (`phase_id = 63`) |
| Phase 22 | §27 | Complete through addendum follow-up (`phase_id = 68`): timezone-aware local-midnight daily reset, Calendar central hub, coin-gated past dailies, top countdown positioning, and landing tab-row follow-up are implemented and verified. |
| **Phase 23 (active phase)** | §28 | **Stage 1 complete (`phase_id = 69`); Stage 2 planning documented (`phase_id = 70`); multi-agent scaffolding complete (`phase_id = 71`); Stage 2 implementation complete and verified (`phase_id = 72`); Stage 3 planning documented (`phase_id = 73`); Stage 3 implementation complete (`phase_id = 74`); Stage 3 stabilization complete (`phase_id = 75`); account-backed multiplayer/UX stabilization follow-up complete (`phase_id = 76`); next stabilization follow-up planning documented (`phase_id = 77`); §28.13 stabilization follow-up implemented (`phase_id = 78`); Stage 4 planning documented (`phase_id = 79`); Stage 4 implemented (`phase_id = 80`); Stage 5 planning documented (`phase_id = 81`); Stage 5 implemented and verified (`phase_id = 82`-`85`); Stage 6 planning documented (`phase_id = 86`); Stage 6 testing addendum + Stage 7 planning documented (`phase_id = 87`); Stage 6 implemented and verified (`phase_id = 88`-`90`); Stage 6 safety backup to GitHub `main` authorized/tracked (`phase_id = 91`); Stage 7 execution opened (`phase_id = 92`); Stage 7 core stabilization fixes implemented (`phase_id = 93`); Stage 7 verification and handoff tracked (`phase_id = 94`); Stage 8 planned (`phase_id = 95`) and implemented/verified (`phase_id = 96`-`97`); Stage 9 planning documented (`phase_id = 98`); Stage 9 implemented and verified (`phase_id = 99`-`100`); Stage 10 planned (`phase_id = 101`) and implemented/verified (`phase_id = 102`-`103`); post-Stage-10 safety backup branch/Draft PR created (`phase_id = 104`); Final Stabilization & Broad Debugging Pass planned (`phase_id = 105`) and completed (`phase_id = 106`-`109`); Stage 12 planned and implemented/verified (`phase_id = 110`-`113`); Stage 13 planned and implemented/verified (`phase_id = 114`-`117`); Stage 14 planned, implemented, and verified (`phase_id = 118`-`121`); Stage 15 planned, implemented, and verified (`phase_id = 122`-`125`); Stage 16 planned, implemented, and verified (`phase_id = 126`-`130`); Stage 17 planning documented (`phase_id = 131`); Stage 17 execution opened (`phase_id = 132`); Stage 17 final verification and handoff complete (`phase_id = 133`)**: Stage 1 delivered bug fixes and async multiplayer. Stage 2 delivered live Practice/Daily multiplayer foundations that were later retired by Stage 8. Stage 3 delivered ELO/rating, scoring, matchmaking, custom-game support, Stats summaries, and additive Supabase competitive tables. Stabilization corrected online transport/ownership defects, account-backed matchmaking, multiplayer play surfaces, forfeit, password reset, mobile UI regressions, Daily Multiplayer refresh/entry behavior, daily participation limits, rival identity, countdown navigation, creator-only cancellation, per-user active limits, spectator foundations, Stage 5 UX/correctness issues, Stage 6 realtime/Daily cancellation stability bugs, and Stage 7 whole-game audit fixes. Stage 8 unified the active multiplayer experience into one durable Multiplayer model with Practice chess clocks and Daily no-clock preservation. Stage 9 fixed timed Practice board/clock synchronization, added Practice Multiplayer Hard Mode, and added fair OG/GO scoring. Stage 10 fixed the reported cross-client board/keyboard projection bug plus nearby timed Practice clock/draft reset bugs. The post-Stage-10 backup branch and Draft PR preserve that state on GitHub without merging. The final stabilization pass is complete under `phase_id = 109`. Stage 12 completed targeted Hard Mode, responsiveness, sound, and realtime-row-churn fixes. Stage 13 fixed the scoped Practice solo UX regressions and Multiplayer GO solved-puzzle propagation. Stage 14 completed hidden/inert Multiplayer foundations, low-risk nonparticipant/spectator-adjacent hardening, full verification, real Supabase-backed multi-context browser E2E, and preview verification. Stage 15 completed GO solved-row hold prior-puzzle visibility and authenticated Practice seed uniqueness with full local, browser, Supabase, resource, and preview verification. Stage 16 completed the extremely narrow Practice Multiplayer GO previous-solution stack and prior-solution keyboard-state fixes with full local, browser, Supabase, resource, and preview verification. Stage 17 completed the single-bug Solo Practice GO Customize-lock pass: fresh GO chains keep Customize options unlocked until the first actual submitted guess, while post-guess locking and Solo Practice OG behavior remain correct. PRs, merges, releases, full dedicated Multiplayer tab work, out-of-scope mode changes, and later-phase work remain gated. |

> **Current execution gate:** Phase 23 Stage 17 final verification and handoff are complete under `phase_id = 133`. Stage 17 stayed strictly limited to the Solo Practice GO Customize locking condition. PR creation, merge, release, Daily GO changes, Multiplayer GO changes, Solo Practice OG behavior changes, Stage 15 Practice seed changes, and later-phase work remain unauthorized pending explicit user approval.

## 1. Operating Rules

This plan is the working implementation guide for building `brrrdle`. It is not approved until the user explicitly approves it. No implementation work may begin before that approval.

### 1.1 Binding Principles

- Build only the approved v1 scope.
- Keep daily `og` and `go` modes fixed at 5 letters for initial launch.
- Support practice mode lengths 2 through 35.
- Use the hybrid word-list strategy: bundle pre-processed JSON sourced from the `latest/brrrdle/` folder of the `https://huggingface.co/datasets/ryanjosephkamp/english-openlist` dataset at build time, paired with a daily scheduled refresh around 12 AM (after the upstream ~11 PM nightly regeneration), production update checks, and a protected manual admin refresh.
- Treat `latest/brrrdle/` in the Hugging Face dataset as the authoritative upstream source. It contains exactly 34 JSON dictionaries — one per valid word length from 2 through 35 — and the brrrdle app must keep its served dictionaries in sync with that folder on a daily cadence.
- Prefer pre-processed definitions, then Dictionary API, then Wiktionary, then an always-available dynamic Google search button.
- Protect admin functionality with Supabase authentication and an `admin` role.
- Target Vercel for the game and GitHub Pages + Jekyll for blog/docs.
- Make small, reviewable changes and verify after every meaningful step.
- End every phase with a commit, changelog update, verification summary, and explicit pause for user approval.
- Maintain progress tracking through `PROGRESS.csv` and per-phase markdown reports before and after every major phase gate.

### 1.2 Repository Starting Point

The repository is currently minimal and contains only governance/specification documents. Phase 0 will scaffold the application and establish tooling before feature implementation.

### 1.3 Standard Phase Exit Checklist

Every phase must finish with:

1. Relevant files created or updated.
2. Changelog updated.
3. Existing lint/build/test commands run where available.
4. Phase-specific verification completed.
5. `PROGRESS.csv` read before work begins for the phase, then updated with the phase result.
6. A `progress/PROGRESS-STEP-N.md` report created or updated from `progress/PROGRESS-TEMPLATE.md`, where `N` is the completed phase number.
7. Known limitations documented.
8. Changes committed and pushed through the approved workflow.
9. Explicit halt for user approval before continuing.

### 1.4 Progress Logging and Tracking Protocol

Progress tracking is mandatory for transparency, resumability, and agent coordination.

- The repository root starts with `PROGRESS.csv` and `PROGRESS-TEMPLATE.md`.
- Phase 0 scaffolding must create a root-level `progress/` folder and move both files into that folder.
- `PROGRESS.csv` must contain one row for every major implementation phase in this plan.
- Before beginning each phase, the agent must read `progress/PROGRESS.csv` and, if needed, any existing `progress/PROGRESS-STEP-N.md` files to determine the next incomplete phase and any blockers.
- After each phase, before halting at the prompt gate, the agent must update the relevant CSV row with status, verification, blockers, completion notes, and the next required action.
- After each phase, the agent must create or update `progress/PROGRESS-STEP-N.md` from the template. The report must concisely summarize what changed, record verification, note blockers or critical errors, and explicitly state whether the user is safe/authorized to proceed to the next phase.
- If a critical error or blocker arises during a phase, the relevant progress markdown file must be updated or annotated before halting.

---

## 2. Phase 0 — Governance, Scaffolding, and Baseline Tooling

**Goal**: Establish the project foundation without implementing game-specific behavior beyond minimal scaffold placeholders.

### Step 0.1 — Confirm Governance Baseline

**Build / modify**:
- Confirm `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, and this plan are present and aligned.
- Confirm `PROGRESS.csv` and `PROGRESS-TEMPLATE.md` are present at the repository root before scaffolding moves them into `progress/`.
- Create or initialize `CHANGELOG.md` if it does not exist.

**Key files**:
- `CONSTITUTION.md`
- `BRRRDLE-SPEC.md`
- `BRRRDLE-OVERVIEW.md`
- `AGENT-IMPLEMENTATION-PLAN.md`
- `PROGRESS.csv`
- `PROGRESS-TEMPLATE.md`
- `CHANGELOG.md`

**Verification**:
- Re-read the governance documents before changes.
- Confirm the progress tracking skeleton and template exist.
- Confirm no implementation code has been added before plan approval.

### Step 0.2 — Scaffold React/Vite Application

**Build / modify**:
- Use the ecosystem scaffold tool to create a React 19 + TypeScript + Vite app in the repository root.
- Add Tailwind CSS using supported setup commands.
- Add Zustand only when application state is introduced.
- Preserve existing governance docs.

**Key files**:
- `package.json`
- `package-lock.json` or selected lockfile
- `index.html`
- `vite.config.ts`
- `tsconfig*.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- Tailwind configuration files if required by the installed version

**Verification**:
- Install dependencies with the selected package manager.
- Run the generated build command.
- Run generated lint/test commands if present.
- Start the dev server locally only as needed for browser verification.
- Confirm governance docs remain intact.

### Step 0.3 — Establish Project Structure

**Build / modify**:
- Create a minimal directory structure for future phases without implementing features prematurely.
- Add placeholder architecture only where needed to keep imports clean.
- Create `progress/` at the repository root and move `PROGRESS.csv` and `PROGRESS-TEMPLATE.md` into it.

**Key files / directories**:
- `src/app/`
- `src/game/`
- `src/data/`
- `src/definitions/`
- `src/account/`
- `src/admin/`
- `src/stats/`
- `src/progression/`
- `src/ui/`
- `src/lib/`
- `src/types/`
- `src/test/` or project-appropriate test location
- `progress/PROGRESS.csv`
- `progress/PROGRESS-TEMPLATE.md`

**Verification**:
- Build succeeds with the scaffolded structure.
- No unused placeholder complexity that causes lint failures.
- Confirm progress tracking files were moved, not duplicated or lost.

### Step 0.4 — Configure Deployment Foundations

**Build / modify**:
- Add Vercel-ready configuration only where needed.
- Add environment variable documentation without secrets.
- Add GitHub Pages + Jekyll blog/docs foundation.

**Key files**:
- `vercel.json` if needed
- `.env.example`
- `docs/`
- `docs/_config.yml`
- `docs/index.md`
- `README.md`

**Verification**:
- Production build succeeds locally.
- Environment documentation contains no secrets.
- Jekyll docs files are static and do not interfere with Vite.

**Pause point**: Commit Phase 0, update changelog, report verification, and halt for user approval before core implementation.

---

## 3. Phase 1 — Core Game Engine and Shared Domain Model

**Goal**: Build the testable, UI-independent game rules that every mode will use.

### Step 1.1 — Domain Types and Constants

**Build / modify**:
- Define mode types, puzzle types, tile states, guess results, word lengths, daily/practice scope rules, and game status.
- Centralize constants for supported practice lengths 2–35 and daily length 5.

**Key files**:
- `src/game/types.ts`
- `src/game/constants.ts`
- `src/types/`

**Verification**:
- TypeScript build/typecheck passes.
- Unit tests cover supported length boundaries.

### Step 1.2 — Exact Tile Coloring Logic

**Build / modify**:
- Implement the canonical `getTileStates` equivalent as the only source of truth for Wordle-style coloring.
- Account for duplicate letters exactly like Wordle.

**Key files**:
- `src/game/tileStates.ts`
- `src/game/tileStates.test.ts`

**Verification**:
- Unit tests for duplicate letters, all-green, all-gray, mixed states, repeated guess letters, repeated answer letters, and lengths 2 and 35.
- Confirm no other code duplicates tile-state rules.

### Step 1.3 — Guess Validation and Hard Mode Rules

**Build / modify**:
- Implement word validation hooks against loaded word lists.
- Implement Hard Mode constraints: fixed green positions, required yellow letters, and no gray-letter reuse.

**Key files**:
- `src/game/validation.ts`
- `src/game/hardMode.ts`
- Tests for both files

**Verification**:
- Unit tests cover valid/invalid guesses, boundary lengths, and Hard Mode edge cases after mixed feedback.

### Step 1.4 — Puzzle Session State Machine

**Build / modify**:
- Implement reusable state transitions for entering letters, deleting, submitting, win/loss, continuing, and resetting.
- Keep UI concerns out of the engine.

**Key files**:
- `src/game/session.ts`
- `src/game/session.test.ts`

**Verification**:
- Unit tests cover normal play, win, loss, invalid guesses, and continuation hooks.
- Build and test commands pass.

**Pause point**: Commit Phase 1, update changelog, report verification, and halt for user approval.

---

## 4. Phase 2 — Data Layer and Hybrid Word List Consumption

**Goal**: Load length-indexed word data reliably using bundled pre-processed files sourced from the Hugging Face dataset `ryanjosephkamp/english-openlist`, plus production update checks, a daily scheduled refresh against that dataset, and a protected admin-triggered refresh path.

### Step 2.1 — Word Data Shape and Local Bundled Assets

**Build / modify**:
- Treat the Hugging Face dataset `https://huggingface.co/datasets/ryanjosephkamp/english-openlist` as the authoritative upstream word-list source. Specifically, consume the `latest/brrrdle/` folder, which contains exactly 34 JSON dictionaries — one per valid word length from 2 through 35 inclusive.
- Define the expected schema for the per-length JSON dictionaries (e.g., `words_length_{N}.json` or the exact filenames provided by the dataset, to be confirmed by inspecting `latest/brrrdle/` during Step 2.1).
- Bundle a known-good snapshot of `latest/brrrdle/` at build time, recording the upstream Hugging Face commit/revision used so future refreshes can be diffed and audited.
- Add a minimal development-safe seed data strategy if the full assets are not yet available locally, but production builds must use the real `latest/brrrdle/` payload.
- Ensure data supports optional definitions when present.

**Key files**:
- `src/data/types.ts`
- `src/data/wordListSchema.ts`
- `src/data/wordLists.ts`
- `src/data/bundled/` or equivalent
- A small metadata file recording the bundled Hugging Face revision (e.g., `src/data/bundled/source.json`)

**Verification**:
- Schema validation tests for representative lengths.
- Confirm length 2, length 5, and length 35 loading paths.
- Confirm the bundled snapshot contains all 34 expected length files and that its recorded source revision is reproducible.

### Step 2.2 — Length-Indexed Loader

**Build / modify**:
- Implement APIs to retrieve valid guesses, answer candidates, and definition metadata by length.
- Ensure daily modes request only length 5 while practice can request 2–35.

**Key files**:
- `src/data/loadWordList.ts`
- `src/data/wordRepository.ts`
- Tests for data access

**Verification**:
- Tests prove daily length is locked to 5.
- Tests prove practice rejects lengths outside 2–35 and loads supported boundaries.

### Step 2.3 — Production Update Check

**Build / modify**:
- Add a production-deploy-aware update check that compares bundled `latest/brrrdle/` metadata (revision and per-length checksums or sizes) with the current state of `latest/brrrdle/` on Hugging Face.
- Note that the upstream Hugging Face dataset is regenerated nightly at approximately 11 PM, so update checks should expect a fresh revision daily and surface staleness to the data layer.
- Degrade gracefully when remote checks fail (network failure, Hugging Face downtime, malformed metadata) — bundled data must remain fully playable.

**Key files**:
- `src/data/updateCheck.ts`
- `src/data/metadata.ts`
- Server/API route files appropriate to the selected Vite/Vercel setup

**Verification**:
- Tests or mocks for current, stale, failed-network, and malformed-metadata scenarios.
- Confirm no secrets, private tokens, or Hugging Face credentials are used client-side; the dataset is public, so anonymous access is sufficient.

### Step 2.4 — Data Caching and Failure UX Hooks

**Build / modify**:
- Add data status states for loading, ready, stale, failed, and fallback.
- Expose user-friendly error states to UI without blocking playable bundled data when available.

**Key files**:
- `src/data/status.ts`
- `src/data/cache.ts`
- UI integration hooks when UI exists

**Verification**:
- Tests cover failure and fallback behavior.
- Build and test commands pass.

### Step 2.5 — Daily Scheduled Hugging Face Refresh

**Build / modify**:
- Implement a server-side scheduled job (e.g., a Vercel Cron-triggered API/function route, or equivalent for the chosen hosting setup) that runs once daily at approximately 12 AM, shortly after the upstream Hugging Face dataset's ~11 PM nightly regeneration.
- The job must fetch the 34 length-indexed JSON dictionaries from the `latest/brrrdle/` folder of `https://huggingface.co/datasets/ryanjosephkamp/english-openlist` (lengths 2 through 35).
- Validate each downloaded file against the schema from Step 2.1 before swapping it in.
- Atomically replace the served set of dictionaries so a partial download or a single malformed file cannot corrupt the live word lists. Keep the previously served set available as a fallback until the new set is fully validated.
- Record the new Hugging Face revision and per-length status in update metadata so the Step 2.3 update check stays accurate.
- Log refresh outcomes (success/failure per length, source revision, timestamp) without exposing private data or credentials.
- Cooperate with the protected admin manual refresh route from Phase 8, so manual and scheduled refreshes share the same fetch/validate/swap pipeline.
- The exact timezone for "~11 PM" and "~12 AM" must be confirmed with the user before scheduling is finalized; document the chosen timezone explicitly in `docs/deployment.md` and `.env.example` (or equivalent) once selected.

**Key files**:
- Scheduled function/route under the chosen Vercel API directory (e.g., `api/cron/refresh-word-lists.ts`)
- `src/data/refresh.ts` (or equivalent) implementing the shared fetch/validate/swap pipeline
- `src/data/updateCheck.ts` (cooperation with metadata)
- `vercel.json` (cron schedule configuration)
- `docs/deployment.md` and `.env.example` for documented schedule and any non-secret config

**Verification**:
- Tests or mocks for the fetch/validate/swap pipeline covering: all 34 files succeed; one file malformed; network failure mid-refresh; Hugging Face returns an unexpected revision.
- Confirm the atomic-swap behavior leaves a working dictionary set after every failure case.
- Confirm that the scheduled route is protected appropriately (Vercel Cron signature/secret or equivalent) and is not invokable by anonymous clients.
- Confirm no Hugging Face credentials are required or committed — the dataset is public.

**Pause point**: Commit Phase 2, update changelog, report verification, and halt for user approval.

---

## 5. Phase 3 — Application Shell, Routing, and UI Foundation

**Goal**: Build the accessible, mobile-first shell that can host modes, settings, stats, admin, and definitions.

### Step 3.1 — App Shell and Navigation

**Build / modify**:
- Create the main layout, navigation, route structure, and mode selection.
- Keep routes minimal and aligned to approved scope.

**Key files**:
- `src/app/App.tsx`
- `src/app/routes.tsx`
- `src/ui/Layout.tsx`
- `src/ui/Navigation.tsx`

**Verification**:
- Build passes.
- Browser smoke test shows app loads without console errors.
- Keyboard navigation reaches core controls.

### Step 3.2 — Design System and Accessibility Foundation

**Build / modify**:
- Establish dark-first icy visual tokens, responsive layout primitives, buttons, dialogs, toasts, and loading/error states.
- Ensure focus states and semantic controls.

**Key files**:
- `src/index.css`
- `src/ui/`
- Tailwind config if needed

**Verification**:
- Manual responsive check for mobile and desktop widths.
- Basic accessibility checks for labels, focus, contrast, and reduced-motion behavior.

### Step 3.3 — Keyboard Input Foundation

**Build / modify**:
- Add physical keyboard handling and on-screen keyboard components using canonical game state.
- Ensure keyboard state derives from `getTileStates` results.

**Key files**:
- `src/ui/Keyboard.tsx`
- `src/game/useKeyboardInput.ts`

**Verification**:
- Manual smoke test for physical and on-screen keyboard input.
- Unit tests where practical for key normalization.

**Pause point**: Commit Phase 3, update changelog, report verification, and halt for user approval.

---

## 6. Phase 4 — `og` Mode Gameplay

**Goal**: Deliver classic single-puzzle gameplay for daily and practice variants.

### Step 4.1 — `og` Daily Mode

**Build / modify**:
- Implement daily `og` puzzle selection fixed at 5 letters.
- Add deterministic daily answer selection.
- Persist daily completion state.

**Key files**:
- `src/game/og/`
- `src/app/routes/og.tsx`
- `src/data/daily.ts`
- Persistence files under `src/account/` or `src/lib/storage/`

**Verification**:
- Tests confirm daily `og` always uses length 5.
- Manual playthrough win and loss.
- Refresh preserves appropriate daily state.

### Step 4.2 — `og` Practice Mode

**Build / modify**:
- Implement selectable practice lengths 2–35.
- Generate independent practice puzzles without affecting daily state.

**Key files**:
- `src/game/og/`
- Practice route/components

**Verification**:
- Manual and automated checks for lengths 2, 5, and 35.
- Invalid length selections are rejected or unavailable.

### Step 4.3 — `og` Hard Mode

**Build / modify**:
- Integrate Hard Mode validation into daily and practice `og` gameplay.
- Show clear feedback when a guess violates constraints.

**Key files**:
- `src/game/og/`
- `src/game/hardMode.ts`
- UI feedback components

**Verification**:
- Tests and manual checks for green, yellow, and gray constraints.

**Pause point**: Commit Phase 4, update changelog, report verification, and halt for user approval.

---

## 7. Phase 5 — `go` Mode Gameplay

**Goal**: Deliver chained 5-puzzle Hurdle-style gameplay with carry-over pre-fills.

### Step 5.1 — `go` Session Model

**Build / modify**:
- Implement five-puzzle session orchestration.
- Track current puzzle, prior answers, carry-over pre-fills, wins, losses, and session completion.

**Key files**:
- `src/game/go/`
- `src/game/go/session.ts`
- Tests for go session progression

**Verification**:
- Tests cover progression through all five puzzles.
- Tests cover failed puzzle and completion states.

### Step 5.2 — `go` Daily Mode

**Build / modify**:
- Implement daily `go` fixed at 5 letters for all five puzzles.
- Persist daily session state.

**Key files**:
- `src/app/routes/go.tsx`
- `src/game/go/`
- `src/data/daily.ts`

**Verification**:
- Tests confirm daily `go` always uses length 5.
- Manual full-session smoke test.

### Step 5.3 — `go` Practice Mode

**Build / modify**:
- Implement practice `go` with one selected length applied to all five puzzles.
- Support lengths 2–35.

**Key files**:
- `src/game/go/`
- Practice route/components

**Verification**:
- Manual checks for lengths 2, 5, and 35.
- Tests confirm all puzzles in a practice session share the selected length.

### Step 5.4 — `go` Hard Mode and Carry-Over Rules

**Build / modify**:
- Integrate Hard Mode constraints with carry-over pre-fills.
- Ensure pre-filled letters and constraints do not conflict.

**Key files**:
- `src/game/go/`
- `src/game/hardMode.ts`

**Verification**:
- Tests cover carry-over pre-fills and Hard Mode interaction.
- Manual smoke test of chained play.

**Pause point**: Commit Phase 5, update changelog, report verification, and halt for user approval.

---

## 8. Phase 6 — Definitions System

**Goal**: Show definitions after wins or losses with the required fallback order and Google search behavior.

### Step 6.1 — Definition Data Model and Pre-Processed Lookup

**Build / modify**:
- Model definition data from English OpenList files.
- Implement lookup against bundled word data first.

**Key files**:
- `src/definitions/types.ts`
- `src/definitions/preprocessed.ts`
- `src/definitions/definitionService.ts`

**Verification**:
- Tests confirm pre-processed definitions are preferred when present.

### Step 6.2 — External API Fallbacks

**Build / modify**:
- Add Dictionary API fallback.
- Add Wiktionary fallback.
- Handle network errors, empty results, malformed responses, and timeouts gracefully.

**Key files**:
- `src/definitions/dictionaryApi.ts`
- `src/definitions/wiktionary.ts`
- `src/definitions/definitionService.ts`

**Verification**:
- Mocked tests cover success and failure at each fallback layer.
- Confirm external failures do not crash the game.

### Step 6.3 — Google Search Button Fallback UI

**Build / modify**:
- Add post-game definition panel.
- Always make Google search available.
- When all definition sources fail, show clear non-intrusive fallback message recommending the button.
- Button text must be dynamic: `Search Google for ‘[WORD]’`.
- Button opens a new tab for `define [WORD]` using safe external-link behavior.

**Key files**:
- `src/definitions/DefinitionPanel.tsx`
- `src/definitions/googleSearch.ts`
- Post-game UI integration files

**Verification**:
- Unit tests for URL generation and dynamic label.
- Manual post-game checks for win and loss.
- Manual check that new tab opens correctly.

**Pause point**: Commit Phase 6, update changelog, report verification, and halt for user approval.

---

## 9. Phase 7 — Persistence, Progression, Economy, and Statistics

**Goal**: Add durable guest progress, XP, levels, coins, consumables, Pay-to-Continue, and stats.

### Step 7.1 — Local Guest Persistence

**Build / modify**:
- Store guest progress, coins, levels, stats, settings, and game history locally.
- Add versioned storage for future migrations.

**Key files**:
- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
- `src/lib/storage/`

**Verification**:
- Tests cover save/load/reset/export and corrupted data fallback.
- Manual refresh persistence check.

### Step 7.2 — Progression and Economy

**Build / modify**:
- Implement XP, level, coin award calculations based on game performance.
- Implement consumables: Reveal One Letter and Remove Incorrect Letters.
- Implement Pay-to-Continue cost scaling by word length and completion percentage.

**Key files**:
- `src/progression/experience.ts`
- `src/progression/coins.ts`
- `src/progression/consumables.ts`
- `src/progression/payToContinue.ts`

**Verification**:
- Unit tests for scoring, coin awards, consumable effects, insufficient coins, and Pay-to-Continue cost edge cases.

### Step 7.3 — Statistics

**Build / modify**:
- Track per-mode statistics for `og` and `go` from day one.
- Structure data to support future per-length statistics without exposing variable daily lengths.
- Add visual dashboard.

**Key files**:
- `src/stats/types.ts`
- `src/stats/statistics.ts`
- `src/stats/StatsDashboard.tsx`

**Verification**:
- Tests cover stat updates for wins, losses, streaks, daily/practice separation where applicable, and `og` vs `go` separation.
- Manual dashboard smoke test.

**Pause point**: Commit Phase 7, update changelog, report verification, and halt for user approval.

---

## 10. Phase 8 — Supabase Accounts, Sync, and Admin Route

**Goal**: Add optional Supabase accounts, cloud sync, guest transfer, danger-zone settings, and protected admin refresh.

### Step 8.1 — Supabase Client and Environment Setup

**Build / modify**:
- Add Supabase client configuration using public anon key only.
- Document required environment variables in `.env.example`.
- Ensure no service-role secrets are exposed to client code.

**Key files**:
- `src/account/supabaseClient.ts`
- `.env.example`
- Supabase migration/config documentation files if used

**Verification**:
- Build passes without real secrets.
- Static review confirms no secret values are committed.

### Step 8.2 — Database Schema and RLS Policies

**Build / modify**:
- Define tables for profiles, progress, stats, game history, settings, and roles.
- Add RLS policies so users can access only their data.
- Add admin role support suitable for manual dashboard assignment in v1.

**Key files**:
- `supabase/migrations/`
- `docs/supabase.md` or equivalent setup docs

**Verification**:
- Review generated SQL for RLS coverage.
- If Supabase local tooling is available, run migration validation.
- Document any verification that requires a real Supabase project.

### Step 8.3 — Authentication and Guest Transfer

**Build / modify**:
- Implement email/password or magic-link auth with email verification expectations.
- Add login/signup/logout UI.
- Prompt users to transfer guest data after account creation or login.

**Key files**:
- `src/account/auth.ts`
- `src/account/AuthPanel.tsx`
- `src/account/guestTransfer.ts`

**Verification**:
- Tests for transfer merge behavior where practical.
- Manual auth flow checklist documented for real Supabase verification.

### Step 8.4 — Cloud Sync

**Build / modify**:
- Sync progress, coins, levels, stats, settings, and game history to Supabase.
- Handle offline, conflict, and partial failure states gracefully.

**Key files**:
- `src/account/sync.ts`
- `src/account/syncStatus.ts`

**Verification**:
- Mocked tests for upload, download, conflict, and failure paths.
- Manual sync checklist for real project environment.

### Step 8.5 — Settings and Danger Zone

**Build / modify**:
- Add export data.
- Add reset progress.
- Add delete account flow.
- Add change email/password paths as supported by Supabase.

**Key files**:
- `src/account/Settings.tsx`
- `src/account/dangerZone.ts`

**Verification**:
- Tests for export/reset transformations.
- Manual UX confirmation for destructive action confirmations.

### Step 8.6 — Protected Admin Manual Refresh Route

**Build / modify**:
- Add protected admin UI/route for manual word-list refresh override.
- Require authenticated Supabase user with `admin` role.
- Validate authorization server-side or in protected Vercel function/API route.
- Never rely only on hidden UI.

**Key files**:
- `src/admin/`
- API/server route files for admin refresh
- `src/data/updateCheck.ts`
- Supabase role policy files

**Verification**:
- Tests or mocked checks for unauthenticated, authenticated non-admin, and authenticated admin states.
- Manual checklist for real Supabase admin role assignment.
- Confirm no privileged secrets in browser bundle.

**Pause point**: Commit Phase 8, update changelog, report verification, and halt for user approval.

---

## 11. Phase 9 — Sharing, PWA, Polish, and Accessibility

**Goal**: Complete user-facing polish, installability, sharing, accessibility, and performance work.

### Step 9.1 — Emoji Sharing

**Build / modify**:
- Implement classic Wordle-style emoji sharing for `og` and `go`.
- Ensure output uses canonical tile states.

**Key files**:
- `src/game/share.ts`
- Share UI components

**Verification**:
- Tests for share output formats.
- Manual clipboard/share API checks with fallback.

### Step 9.2 — PWA Support

**Build / modify**:
- Add manifest, icons, service worker strategy, and offline-capable behavior where reasonable.
- Avoid making stale data behavior confusing.

**Key files**:
- `public/manifest.webmanifest`
- `public/icons/`
- Service worker or Vite PWA configuration if selected

**Verification**:
- Production build succeeds.
- Browser application panel confirms installability where practical.
- Offline smoke test confirms graceful behavior.

### Step 9.3 — Animation and Responsive Polish

**Build / modify**:
- Add tile pop-in, flip reveal, row shake, and smooth transitions.
- Respect reduced-motion preferences.
- Polish mobile and desktop layouts.

**Key files**:
- UI component files
- `src/index.css`

**Verification**:
- Manual checks on mobile and desktop viewport sizes.
- Confirm animations do not block input or cause critical console errors.

### Step 9.4 — Accessibility Pass

**Build / modify**:
- Fix semantic labels, focus order, color contrast, keyboard behavior, dialogs, and status announcements.

**Key files**:
- UI components across `src/ui/`, game routes, dialogs, and panels

**Verification**:
- Keyboard-only navigation check.
- Screen-reader-oriented semantic review.
- WCAG AA-focused contrast review.

### Step 9.5 — Performance Pass

**Build / modify**:
- Optimize initial load and interactions.
- Ensure word-list handling does not degrade daily mode performance.

**Key files**:
- Data loading files
- Route-level code splitting if needed
- UI performance hotspots

**Verification**:
- Production build.
- Lighthouse target ≥ 90 where environment supports it.
- Manual interaction check for smooth gameplay.

**Pause point**: Commit Phase 9, update changelog, report verification, and halt for user approval.

---

## 12. Phase 10 — Blog / Docs on GitHub Pages + Jekyll

**Goal**: Establish the approved blog/docs surface without interfering with the Vercel-hosted game.

### Step 10.1 — Jekyll Foundation

**Build / modify**:
- Create or refine `docs/` as the GitHub Pages + Jekyll root.
- Add basic site config and landing page.

**Key files**:
- `docs/_config.yml`
- `docs/index.md`
- `docs/_posts/` if needed

**Verification**:
- Confirm docs files are valid static/Jekyll content.
- Confirm Vite build is unaffected.

### Step 10.2 — Project Documentation

**Build / modify**:
- Document setup, environment variables, Supabase configuration, admin role assignment, deployment, and verification procedures.
- Keep docs aligned with the implemented system.

**Key files**:
- `README.md`
- `docs/*.md`
- `docs/supabase.md`
- `docs/deployment.md`

**Verification**:
- Review docs for accuracy and absence of secrets.
- Confirm all referenced commands exist.

**Pause point**: Commit Phase 10, update changelog, report verification, and halt for user approval.

---

## 13. Phase 11 — Final Integration, Release Readiness, and Deployment Verification

**Goal**: Verify the full product against the Constitution, spec, and v2.6 success criteria.

### Step 11.1 — Full Automated Verification

**Build / modify**:
- Fix only issues directly blocking approved v1 functionality or verification.

**Key files**:
- Any files implicated by failures

**Verification**:
- Run full lint, typecheck, test, and production build commands.
- Run security checks available in the environment.
- Confirm no known critical console errors.

### Step 11.2 — Full Manual Gameplay Matrix

**Build / modify**:
- No feature work unless verification reveals a scoped defect.

**Verification**:
- `og` daily fixed at 5.
- `go` daily fixed at 5.
- `og` practice lengths 2, 5, and 35.
- `go` practice lengths 2, 5, and 35.
- Hard Mode in both modes.
- Win and loss paths.
- Pay-to-Continue with enough and insufficient coins.
- Definitions with pre-processed success, API fallback success, and total failure with Google button.
- Guest persistence and reset/export.
- Supabase auth and guest transfer where environment is available.
- Admin refresh route for unauthenticated, non-admin, and admin users where environment is available.

### Step 11.3 — Deployment Readiness

**Build / modify**:
- Finalize Vercel configuration and deployment docs.
- Finalize GitHub Pages/Jekyll docs instructions.

**Key files**:
- `vercel.json`
- `README.md`
- `docs/deployment.md`
- `.env.example`

**Verification**:
- Production build passes.
- Environment variable list is complete and contains no secrets.
- Lighthouse target ≥ 90 where environment supports it.
- Confirm update checks and manual refresh are documented for production.

### Step 11.4 — Final Governance Review

**Build / modify**:
- Update changelog and any release notes.
- Confirm implementation matches `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, and this approved plan.

**Key files**:
- `CHANGELOG.md`
- `README.md`
- `docs/`

**Verification**:
- Trace each required spec item to implemented behavior or documented limitation.
- Confirm no out-of-scope v1 features were added.

**Pause point**: Commit final integration changes, update changelog, provide release-readiness report, and halt for user approval before any production release action.

---

## 14. Cross-Phase Verification Matrix

| Requirement | Minimum verification |
|---|---|
| Exact Wordle coloring | Unit tests with duplicate-letter vectors; manual gameplay smoke test |
| Daily `og` fixed at 5 | Unit tests and manual route check |
| Daily `go` fixed at 5 | Unit tests and manual full-session check |
| Practice 2–35 | Boundary tests for 2 and 35; manual checks for 2, 5, 35 |
| Hard Mode | Unit tests for green/yellow/gray constraints; manual checks |
| Hybrid word data | Loader tests, metadata/update mocks, production build check |
| Definition priority | Mocked service tests for each fallback layer |
| Google fallback button | Unit tests for label/URL; manual new-tab check |
| Supabase RLS | Migration review and local/real Supabase checks where available |
| Admin route | Unauthenticated/non-admin/admin authorization checks |
| Guest persistence | Storage tests and refresh manual check |
| Guest transfer | Merge/transfer tests and manual auth checklist |
| Progression/economy | Unit tests for XP, coins, consumables, Pay-to-Continue |
| Statistics | Unit tests for `og`/`go` separation and streaks |
| Accessibility | Keyboard, focus, semantic, contrast checks |
| Performance | Production build, interaction smoke test, Lighthouse where available |
| Vercel | Local production build and config review |
| GitHub Pages/Jekyll | Docs config review and Vite non-interference check |

---

## 15. Known Constraints and Clarifications

- This plan does not approve implementation by itself; explicit user approval is required before Phase 0 begins.
- The authoritative upstream word-list source is the Hugging Face dataset `https://huggingface.co/datasets/ryanjosephkamp/english-openlist`. Specifically, the `latest/brrrdle/` folder contains the 34 length-indexed JSON dictionaries (one per length from 2 through 35) that brrrdle consumes.
- The upstream Hugging Face dataset is updated nightly at approximately 11 PM, and the brrrdle scheduled refresh must run at approximately 12 AM. The exact timezone for both the upstream regeneration and the brrrdle refresh must be confirmed with the user before Phase 2's scheduled job is finalized; documentation will use this confirmed timezone explicitly rather than ambiguous "11 PM / 12 AM" phrasing.
- The Hugging Face dataset is public, so anonymous read access is sufficient; no Hugging Face credentials may be committed or shipped to the client bundle.
- Real Supabase and deployment verification may require project credentials or dashboard access outside the local sandbox. If unavailable, the agent must document what was verified locally and what remains for the user to verify.
- Full English OpenList assets may be large. The agent must choose a strategy that satisfies build-time bundling and performance requirements without harming daily-mode load performance.
- No service-role secret, API key, or privileged credential may be committed.
- Any requirement conflict must stop work for user clarification.

---

## 16. Phase 12 — Fix Build Errors, Length Selector, and Polish Artifacts (Diagnosis Report 2026-05-26)

**Authority**: This phase implements the recommended fix strategy from `DIAGNOSIS-REPORT-2026-05-26.md` while strictly observing `CONSTITUTION.md` (scope fidelity, minimal change, verification-first execution, data safety, and progress tracking). It must not introduce out-of-scope v1 features.

**Goal**: Restore a clean production build of the Vercel serverless layer, remove a leftover Phase 9 debug toast, and make the practice length selector and guess validation work across the full 2–35 length range using the existing hybrid data strategy. After this phase, both visible user-facing issues and the underlying TypeScript build errors must be resolved.

**Scope boundary**: No new game features, no economy changes, no Supabase schema changes, no new external dependencies beyond what is strictly required to fix the diagnosed issues. Do not rewrite phases 0–11. Do not change daily-mode performance characteristics.

### Step 12.1 — Re-confirm Diagnosis Against the Current Repository

**Build / modify**:
- No code changes in this step.

**Verification**:
- Read `DIAGNOSIS-REPORT-2026-05-26.md`, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, and the most recent Phase 12/13 progress reports (`progress/PROGRESS-STEP-12.md`, `progress/PROGRESS-STEP-13.md`).
- Run `npm ci`, `npm run lint`, `npm run test`, and `npm run build` to capture the current baseline failure surface locally.
- Run a standalone `tsc --noEmit` over the `api/` folder using Node16/NodeNext-style module resolution to reproduce the 18 TypeScript errors described in the diagnosis report and produce an authoritative list (file, line, error code).
- Confirm which symptoms are reproducible locally and which require a Vercel preview to observe (record any Vercel-only behavior in the progress report).

**Pause behavior**: This step does not halt; it feeds the remaining steps with a verified error list.

### Step 12.2 — Establish a Dedicated TypeScript Project for `api/`

**Build / modify**:
- Add a third TypeScript project reference for the Vercel serverless functions (e.g. `tsconfig.api.json`) that:
  - Includes only `api/**/*.ts` and the `src/` types it legitimately imports.
  - Uses module/module-resolution settings compatible with how Vercel compiles serverless functions (Node-style ESM resolution).
  - Enables `strict` and the existing `noUnusedLocals`/`noUnusedParameters`/`noFallthroughCasesInSwitch` flags, plus `resolveJsonModule` where required.
  - Sets `types` to include `node` so `process`, `Buffer`, and Node globals resolve.
- Reference the new project from the root `tsconfig.json` so `tsc -b` (used by `npm run build`) typechecks the `api/` layer alongside the app.

**Key files**:
- `tsconfig.json`
- `tsconfig.api.json` (new)
- `package.json` (no script changes expected; document the change in this plan and changelog)

**Verification**:
- `npm run build` must typecheck `api/` and fail on the diagnosed errors before Step 12.3, proving that the new project surfaces those errors locally rather than only on Vercel.
- Confirm `tsconfig.app.json` and `tsconfig.node.json` are not affected.

### Step 12.3 — Fix Relative Import Extensions and JSON Import Attributes in `api/` and `src/data/`

**Build / modify**:
- Update every relative import in `api/**/*.ts` and the `src/data/*` files referenced from `api/` to satisfy the chosen `api/` module resolution. Concretely:
  - Add explicit `.js` extensions to relative imports as required by Node16/NodeNext resolution, including imports that cross the `api/` ↔ `src/` boundary.
  - Where ESLint or the bundler may complain about `.js` extensions in `src/`, prefer keeping `src/` imports unchanged and only adjusting imports actually consumed from `api/`. If a shared module is consumed from both sides, choose the smallest path that satisfies both resolutions (e.g. relocating shared helpers under `api/_lib/` or `src/data/` cleanly).
  - Convert JSON imports that fail under the new project to use the `with { type: 'json' }` import attribute (or `assert` only as a last resort) and ensure the chosen attribute is supported by the TypeScript version pinned in `package.json`.
- Fix the implicit-`any` parameter errors (`TS7006`) flagged in `api/_lib/vercelBlobStore.ts`, `api/admin-refresh.ts`, and `api/cron/refresh-word-lists.ts` by giving each parameter an explicit, accurate type drawn from the existing data-layer types — do not use `any`.
- Fix the type mismatch in `loadWordList.ts` identified in the diagnosis report by tightening the inferred type rather than weakening callers.
- Ensure `@types/node` remains in `devDependencies` and is referenced where needed (it is already present; document that no install is required if so).

**Key files**:
- `api/_lib/vercelBlobStore.ts`
- `api/_lib/wordListStore.ts`
- `api/admin-refresh.ts`
- `api/cron/refresh-word-lists.ts`
- `api/word-lists/manifest.ts`
- `src/data/refreshStore.ts`
- `src/data/loadWordList.ts`
- Any other files surfaced by Step 12.1’s error list

**Verification**:
- `npm run build` must complete with zero TypeScript errors across `tsconfig.app.json`, `tsconfig.node.json`, and the new `tsconfig.api.json`.
- `npm run lint` must pass; ESLint configuration for `api/` may need a small adjustment if `.js` extensions on relative imports are flagged. If a rule must be relaxed, scope it to the `api/` glob only and document it.
- Re-run the standalone `api/` typecheck command used in Step 12.1; the 18 diagnosed errors must all be gone with no new errors introduced.
- Do not delete or weaken any existing tests to make this step pass.

### Step 12.4 — Remove the Leftover Phase 9 “polish ready” Floating Box

**Build / modify**:
- In `src/app/App.tsx`, remove the `shellMessages` constant and the `<ToastRegion messages={shellMessages} />` mount that produces the floating “polish ready” toast in the bottom-right of every page. Keep the underlying `ToastRegion` primitive intact for future gameplay use; remove only the debug payload and its render site.
- Also remove the adjacent “Phase 9 polish” sidebar `<Panel>` (and its `LoadingState` and Review-shell-notes button) and the “Phase 9 shell notes” `Dialog`, which are debug surfaces from the same phase. Confirm via grep that no other surface depends on them. If any test references these surfaces, update or remove only those debug-only assertions; do not weaken gameplay tests.
- Sweep for other Phase 9 debug-only leftovers in `src/app/App.tsx` (and only `App.tsx`) and remove any that the diagnosis report’s “polish ready” callout effectively covers. Do not refactor unrelated logic.

**Key files**:
- `src/app/App.tsx`

**Verification**:
- After the change, no `"polish ready"`, `"Phase 9 polish"`, or `"shell notes"` string remains in `src/app/App.tsx`.
- `npm run lint` and `npm run build` pass.
- Manual smoke check (documented in the progress report) confirms that loading the app no longer shows the floating bottom-right box.
- Existing `og` and `go` gameplay routes still render and remain playable.

### Step 12.5 — Drive Practice Length Selector and Guess Validation From the Full 2–35 Data Layer

**Build / modify**:
- Replace the use of `BUNDLED_WORD_LIST_LENGTHS` (currently `[2, 5, 35]`) as the source of available practice lengths everywhere the selector is rendered and everywhere `og`/`go` practice sessions compute their allowed lengths. The full supported set is `MIN_PRACTICE_WORD_LENGTH`..`MAX_PRACTICE_WORD_LENGTH` (2..35), already defined in `src/game/constants.ts`.
- Introduce a single helper (e.g. `getSupportedPracticeLengths()` in `src/data/index.ts` or `src/game/constants.ts`) that returns the canonical 2..35 range, and have `OgGame`, `GoGame`, and the home shell consume it. Keep `BUNDLED_WORD_LIST_LENGTHS` for accurate “which lengths are seed-bundled” diagnostics only.
- Extend the bundled word-list assets in `src/data/bundled/` so practice play has a working answer set and `validGuesses` set for every length 2..35. Source the content from the existing Hugging Face dataset pipeline (`src/data/huggingFaceSource.ts` + `refresh.ts`) by running the pipeline once locally and committing the resulting 34 `words_length_<N>.json` files as bundled snapshots. This preserves the “bundle pre-processed JSON at production build time” rule in CONSTITUTION §8.2 and removes the “word not in list” regression caused by tiny seed lists.
  - If a length’s upstream file is too large to comfortably ship in the main JS bundle, switch `src/data/wordLists.ts` to dynamic, length-indexed import (`import()`) so daily mode (length 5) still loads only its file. Either approach must satisfy CONSTITUTION §8.2 and §12.4 (daily-mode performance) and §3.1 (practice 2–35). Choose whichever option keeps the daily-mode bundle size and TTI within current measurements; record the decision in the progress report.
  - Update `src/data/wordLists.ts` so the bundle map reflects the chosen strategy (either all 34 statically imported, or a `Record<number, () => Promise<WordListFile>>` lazy map) without changing the public `getWordRepository` contract — adapt callers minimally if and only if dynamic loading is chosen.
- Update `loadBundledWordList` (and any synchronous consumers it has) only as required by the chosen strategy. If dynamic loading is introduced, add an explicit async path and keep the synchronous path for daily length 5.
- Verify that practice mode no longer rejects valid words from the full lists by exercising representative guesses against lengths 2, 5, 12, 20, and 35 in unit tests.

**Key files**:
- `src/data/wordLists.ts`
- `src/data/loadWordList.ts`
- `src/data/wordRepository.ts`
- `src/data/index.ts`
- `src/data/bundled/words_length_<N>.json` for N = 2..35 (new/updated bundled snapshots)
- `src/app/OgGame.tsx`
- `src/app/GoGame.tsx`
- `src/app/App.tsx` (length-selector display only)
- `src/game/og/session.ts`
- `src/game/go/session.ts`
- Relevant `*.test.ts` files for the data layer and game sessions

**Verification**:
- Unit tests cover: practice length selector exposes every integer 2..35; `getValidGuesses` returns a non-trivial set for lengths 2, 5, 12, 20, 35; a known-valid word from the bundled list for each tested length passes validation; daily mode remains locked to length 5.
- `npm run test`, `npm run lint`, and `npm run build` pass.
- Manual smoke check (documented in the progress report): the practice length dropdown shows 2..35; submitting common words at three sampled lengths is accepted; submitting clearly invalid strings is still rejected; daily `og`/`go` still play normally.
- Data safety: imported words and definitions must still be treated as untrusted for rendering (CONSTITUTION §8.3). No unescaped HTML may be introduced.

### Step 12.6 — Verify the Persistence Layer Still Loads in Development and Production Mode

**Build / modify**:
- No new functionality. After Steps 12.2–12.3 land, re-exercise the existing persistence-layer wiring:
  - `api/_lib/vercelBlobStore.ts`, `api/_lib/wordListStore.ts`, `api/cron/refresh-word-lists.ts`, `api/admin-refresh.ts`, `api/word-lists/manifest.ts`.
- Confirm the factory still returns the documented `skipped` status when `BLOB_READ_WRITE_TOKEN` is absent, and the documented success path when it is present (use the existing test doubles in `src/data/refreshStore.ts`).

**Verification**:
- `npm run test` continues to cover the existing refresh-store and refresh-pipeline tests with no regressions.
- The persistence-layer unit tests for atomic swap, projection, and per-length failure must still pass unchanged.
- The build artifact must not bundle `@vercel/blob` into the client (`dist/`). Re-run the client-bundle leak check used in Phase 13.

### Step 12.7 — Documentation, Changelog, and Progress Artifacts

**Build / modify**:
- Add a new `Unreleased`/`Fixed` block to `CHANGELOG.md` describing:
  - The TypeScript build-error fixes (`.js` extensions, JSON import attribute, implicit-`any` fixes, `loadWordList.ts` type mismatch, new `tsconfig.api.json`).
  - Removal of the leftover Phase 9 “polish ready” floating box and adjacent debug surfaces.
  - Practice length selector now exposing the full 2..35 range and validation now using the full bundled (or lazily-loaded) word lists.
  - Any documentation updates required by the chosen bundling strategy in Step 12.5.
- Update `docs/deployment.md` only if the chosen Step 12.5 strategy changes operator-visible behavior. Do not introduce documentation about features outside the diagnosis report’s scope.
- Update `progress/PROGRESS.csv` with a new row for Phase 12 (`phase_id = 14`, title `"Phase 12 — Fix Build Errors, Length Selector, and Polish Artifacts"`).
- Create `progress/PROGRESS-STEP-14.md` from `progress/PROGRESS-TEMPLATE.md` summarizing what changed, what verification ran, known limitations, and whether the user is safe to proceed.
- If anything cannot be completed (for example because Vercel preview access is not available to verify Step 12.6 in production), annotate the progress report with the missing check, the reason, and what was verified locally instead, per CONSTITUTION §6.2.

**Key files**:
- `CHANGELOG.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-14.md`
- `docs/deployment.md` (only if required)

**Verification**:
- The CSV row matches the progress markdown summary.
- No secrets, tokens, or private deployment data appear in any updated artifact (CONSTITUTION §5.4, §14).

### Step 12.8 — Full Verification, Security Review, and Halt

**Build / modify**:
- No new code changes in this step.

**Verification**:
- Run, in order, and record results:
  - `npm ci`
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - Standalone `tsc --noEmit` over `api/` using the new `tsconfig.api.json` to confirm zero errors there.
  - `git diff --check`
  - The client-bundle leak check used in Phase 13 (confirm `@vercel/blob` is not in `dist/`).
- Run the available security review tool (`codeql_checker`) on the changes. Address any new alert that is a true positive in changed lines before halting (CONSTITUTION §14).
- Manual smoke checks captured in the progress report:
  - Home shell no longer shows the floating “polish ready” box.
  - Practice length dropdown shows 2..35 in `og` and `go`.
  - Representative known-valid guesses at lengths 2, 5, and 35 are accepted; invalid strings still rejected.
  - Daily `og` and daily `go` still play with length 5.
  - Existing post-game definitions, sharing, settings, and admin surfaces still render.
- Reconfirm CONSTITUTION compliance: no out-of-scope v1 features, no removed/weakened tests, no committed secrets, no service-role exposure to the client, no unescaped HTML from imported definitions, and progress artifacts updated.

**Pause point**: Commit and push all changes through the approved progress-reporting workflow. Provide the required review-gate summary (what changed, what was verified, limitations, progress CSV + step report links, exact approval needed) and halt for explicit user approval before any production deployment action.

### Phase 12 Exit Checklist

- All 18 TypeScript build errors from the diagnosis report are resolved.
- The floating Phase 9 “polish ready” box and adjacent Phase 9 debug surfaces are removed from `src/app/App.tsx`.
- Practice mode exposes every length 2..35 in `og` and `go`, and guess validation uses the full bundled (or lazily-loaded) word lists.
- The persistence layer continues to behave as in Phase 13 (atomic swap, factory skip-when-unconfigured, no `@vercel/blob` in the client bundle).
- `CHANGELOG.md`, `progress/PROGRESS.csv`, and `progress/PROGRESS-STEP-14.md` are updated and free of secrets.
- `npm run lint`, `npm run test`, `npm run build`, and the standalone `api/` typecheck all pass; `codeql_checker` is run and any true-positive alert in changed lines is fixed.
- Halt for explicit user approval before any production release action.

---

## 17. Phase 12 — Fix Build Errors, Length Selector, and Polish Artifacts (Updated Diagnosis Report 2026-05-26)

**Authority**: This section supersedes Section 16 as the active fix plan for the issues called out in the updated `DIAGNOSIS-REPORT-2026-05-26.md` (the version dated 2026-05-26 with the "Phase 12 fixes were insufficient" status). It is bound by `CONSTITUTION.md` (scope fidelity, minimal change, verification-first execution, hybrid data-layer discipline, data safety, progress logging) and by `BRRRDLE-SPEC.md`. No new v1 scope is added.

**Goal**: Finish the work begun in Section 16 by (a) eliminating the TypeScript build errors that the updated diagnosis report says are still reaching the Vercel build, (b) ensuring the practice length selector and the guess validator actually use the full 2–35 data layer in production rather than falling back to the small seed slice, and (c) removing every leftover Phase 9 debug surface (the "polish ready" floating box and its peers). After this section, both visible user-facing problems and the underlying build/runtime mismatch must be resolved end-to-end, locally and on Vercel.

**Scope boundary**: No new game features, no economy or stats changes, no new Supabase tables, no new client-side runtime dependencies. Do not change the daily-mode word length, the Hugging Face source contract, or the persistence-layer atomic-swap semantics. Do not rewrite Phases 0–11 or the persistence layer from Phase 13.

**Inputs to reconcile before editing**:
- `DIAGNOSIS-REPORT-2026-05-26.md` (updated version) — authoritative symptom list.
- `progress/PROGRESS-STEP-14.md` — what Section 16 actually shipped (real bundled content for lengths 2–18, deterministic synthetic placeholders for 19–35, new `tsconfig.api.json`, removed "polish ready" toast).
- Latest Vercel build logs supplied with the updated diagnosis report — authoritative for any error that does not reproduce locally.
- `BRRRDLE-SPEC.md` §§ on daily length, practice length range, and definitions.

### Step 12U.1 — Reconcile the Updated Diagnosis Against the Current Repository

**Build / modify**:
- No code changes in this step.

**Verification**:
- Re-read the updated `DIAGNOSIS-REPORT-2026-05-26.md`, `CONSTITUTION.md` §§ 2, 5.4, 6, 8, 12, 14, `BRRRDLE-SPEC.md`, and `progress/PROGRESS-STEP-12.md`, `PROGRESS-STEP-13.md`, `PROGRESS-STEP-14.md`.
- Run, in order, and capture the full output for the progress report:
  - `npm ci`
  - `npm run lint`
  - `npm run test`
  - `npm run build` (which runs `tsc -b && vite build` and so exercises `tsconfig.api.json` via the project references added in Section 16)
  - Standalone `npx tsc -p tsconfig.api.json --noEmit`
- For every error class the updated diagnosis lists (missing `.js` extensions; missing exports from `src/data/index.ts` such as `HUGGING_FACE_API_BASE`, `HUGGING_FACE_DATASET_ID`, `fetchHuggingFaceRemoteMetadata`, `refreshWordListsFromHuggingFace`; JSON import attribute issues; `loadWordList.ts` type mismatch), record whether it (a) still reproduces locally, (b) only reproduces on Vercel, or (c) is already fixed. This authoritative reproduction map drives Steps 12U.2–12U.4.
- For every user-visible symptom (practice dropdown shows 2/5/35, "word not in list" for valid words, "polish ready" floating box), reproduce locally via `npm run dev` (or `vite preview` after a build) and record the screenshot/notes.
- If any diagnosed error does **not** reproduce locally, gather the Vercel build log lines the user supplied, identify the exact upstream commit Vercel built, and check whether that commit predates Section 16. If so, the fix is "trigger a clean Vercel rebuild" and the only code-side work is whatever truly reproduces locally — document this clearly in the progress report.

**Halt behavior**: This step does not halt; it produces the reproduction map for the rest of Section 17.

### Step 12U.2 — Make the `api/` ↔ `src/data/` Boundary Robust Under Node16/NodeNext Resolution

**Build / modify** (only if Step 12U.1's reproduction map shows the errors still occur):
- For every relative import inside `api/**/*.ts` that crosses into `src/`, confirm the import path uses an explicit `.js` extension and matches the file that exists in `src/`. Add the extension where missing. Do not change `src/` → `src/` imports unless the api project actually pulls that module in.
- For every symbol the updated diagnosis says is missing from `src/data/index.ts` (`HUGGING_FACE_API_BASE`, `HUGGING_FACE_DATASET_ID`, `HUGGING_FACE_RAW_BASE`, `fetchHuggingFaceRemoteMetadata`, `refreshWordListsFromHuggingFace`, `type RefreshSourceInfo`, plus any other symbol the api files import via the barrel), verify the barrel re-exports it. If a symbol is not actually exported from its source module, export it from that module first, then re-export from `src/data/index.ts`. Do not introduce wildcard re-exports that change public API surface.
- If `api/` files reach into `src/data` modules via deep paths (`../src/data/refreshStore.js`, etc.) and that bypasses the barrel, leave the deep imports as-is and only verify the deep target itself exports the symbol with the expected name. Prefer deep imports for api ↔ data crossings to avoid increasing the client barrel surface.
- For any JSON import the api project consumes (manifest JSON, bundled JSON, etc.), confirm the import syntax matches the TypeScript version pinned in `package.json`. Use `with { type: 'json' }` import attributes if and only if the pinned TS version supports them; otherwise keep the established pattern (`resolveJsonModule` + default import) used elsewhere in `src/data/`. Do not mix patterns inside the same project.
- Fix the `loadWordList.ts` type mismatch flagged in the updated diagnosis by tightening the inferred type at the source rather than weakening callers; if the diagnosis report does not pinpoint the exact line, derive it from Step 12U.1's reproduction map.
- Keep `tsconfig.api.json`, `tsconfig.app.json`, and `tsconfig.node.json` separately scoped. Do not relax `strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, or `verbatimModuleSyntax` to silence errors.

**Key files** (final list driven by Step 12U.1):
- `src/data/index.ts`
- `src/data/huggingFaceSource.ts`
- `src/data/refresh.ts`
- `src/data/refreshStore.ts`
- `src/data/loadWordList.ts`
- `src/data/wordLists.ts` (only if JSON import pattern changes)
- `api/admin-refresh.ts`
- `api/cron/refresh-word-lists.ts`
- `api/word-lists/manifest.ts`
- `api/_lib/wordListStore.ts`
- `api/_lib/vercelBlobStore.ts`
- `tsconfig.api.json` (only if a setting actually has to change; document why)

**Verification**:
- `npm run build` exits 0 with zero TypeScript errors across all three tsconfigs.
- `npx tsc -p tsconfig.api.json --noEmit` exits 0.
- `npm run lint` exits 0.
- `npm run test` exits 0 (no test deletions or weakenings; if a test asserts an exported symbol now exists, it stays).
- A Vercel preview build (or, if Vercel access is unavailable, a local clean build invoked exactly as `vercel build` would) reports the same zero-error result. If Vercel cannot be exercised from the sandbox, document the limitation under CONSTITUTION §6.2 and ask the user to trigger a manual Vercel rebuild as the final verification.

### Step 12U.3 — Ensure the Practice Length Selector and Guess Validator Use the Full 2–35 Range in Production

**Build / modify**:
- Audit every consumer of `BUNDLED_WORD_LIST_LENGTHS`, `getAvailableOgPracticeLengths()`, and `getAvailableGoPracticeLengths()` in `src/app/`, `src/game/`, and `src/data/`. The selector and the validator must derive their length set from `SUPPORTED_PRACTICE_WORD_LENGTHS` (2..35), filtered only by which lengths actually have a usable word list available at runtime, not by whether they were originally hand-seeded.
- If any code path still treats `BUNDLED_WORD_LIST_LENGTHS` as the "what the user is allowed to pick" set, rewrite that code path to use the supported practice range and to gate per-length availability on `loadBundledWordList(...).ok`. Keep `BUNDLED_WORD_LIST_LENGTHS` strictly as a diagnostic value (`bundled lengths` display only).
- Confirm that the bundled JSON for every length 2..35 (a) loads cleanly through `loadBundledWordList`, (b) returns a non-empty `validGuesses` set, and (c) returns at least one valid answer. If a length still ships with placeholder content that fails validation or produces "word not in list" for ordinary English words at that length, replace its placeholder with a real dictionary slice from the existing Hugging Face pipeline (`refreshWordListsFromHuggingFace`/local pipeline run) under `src/data/bundled/words_length_<N>.json`. Real content is preferred for every length 2..35. If a length's upstream dictionary is so large it would noticeably increase the client bundle size, switch only those lengths to length-indexed dynamic `import()` so daily mode (length 5) still loads only its file; daily-mode load characteristics must not regress (CONSTITUTION §12.4). Record the chosen strategy per length range in the progress report.
- Where the bundled answer pool for a given length is intentionally small (e.g., very long words), make sure the validator still uses the full `validGuesses` set for that length, not just the answer pool. This avoids the "valid word rejected" symptom from the updated diagnosis even when answer pools are small.
- Update `src/data/wordRepository.ts` and the OG/GO session selectors only as much as needed to honor the above and to keep the public `getWordRepository` contract stable. If a dynamic-import path is introduced, gate it behind an explicit async API and keep the synchronous path for daily length 5.

**Key files**:
- `src/data/wordLists.ts`
- `src/data/loadWordList.ts`
- `src/data/wordRepository.ts`
- `src/data/index.ts` (only if a new helper is exported)
- `src/data/bundled/words_length_<N>.json` for every N in 2..35 that still ships placeholder content
- `src/app/App.tsx` (length-selector display only, not behavior)
- `src/app/OgGame.tsx`
- `src/app/GoGame.tsx`
- `src/game/og/session.ts`
- `src/game/go/session.ts`
- `src/game/constants.ts` (only if a new derived helper is introduced)

**Verification**:
- New or updated unit tests cover:
  - `getAvailableOgPracticeLengths()` and `getAvailableGoPracticeLengths()` each return every integer 2..35.
  - `loadBundledWordList('practice', N).ok === true` for every N in 2..35.
  - A representative real English word at each of lengths 2, 5, 12, 20, and 35 is accepted by `validateGuess`. Length-35 may be exempted if and only if the upstream dataset legitimately ships no 35-letter words on a given day; the test must then verify the **graceful fallback** path rather than acceptance.
  - Daily mode remains locked to length 5 (assert at the type and the session layer).
- `npm run test`, `npm run lint`, `npm run build` all pass.
- Manual smoke check (documented in progress report): `npm run dev` shows the practice length dropdown listing every integer 2..35 in both `og` and `go`; submitting a known real word at lengths 2, 5, 12, 20, and 35 is accepted; submitting clearly invalid strings is still rejected; daily `og` and daily `go` still play normally with length 5.
- Data safety: per CONSTITUTION §8.3, no unescaped HTML may be introduced from imported word/definition data. Reuse existing definition rendering helpers.

### Step 12U.4 — Verify Removal of Every Phase 9 Debug Surface

**Build / modify**:
- Confirm Section 16 already removed the `shellMessages` `<ToastRegion>` mount, the "Phase 9 polish" sidebar `<Panel>`, the `LoadingState` filler, the "Review shell notes" button, and the "Phase 9 shell notes" `Dialog` from `src/app/App.tsx`. If any of these (or a peer leftover such as a "polish ready" string, a debug toast payload, or a debug-only panel) still exists anywhere under `src/`, remove only that debug surface — do not modify gameplay logic, accessibility primitives, or the underlying `ToastRegion`/`Panel`/`Dialog` components.
- Grep the entire `src/` tree for `polish ready`, `Phase 9`, and any debug-only string flagged by the updated diagnosis. The grep result must be empty for the user-facing strings after this step.

**Key files**:
- `src/app/App.tsx`
- Any other file the grep surfaces (expected: none)

**Verification**:
- Grep returns no matches for the debug strings above under `src/` (or under `dist/` after `npm run build`).
- Manual smoke check confirms the floating bottom-right box no longer appears on any route.
- Existing accessibility, focus order, and ToastRegion-based future surfaces remain intact (CONSTITUTION §12).

### Step 12U.5 — Re-verify the Persistence Layer End-to-End

**Build / modify**:
- No new functionality. After Steps 12U.2–12U.4, re-exercise the existing persistence-layer wiring (`api/_lib/vercelBlobStore.ts`, `api/_lib/wordListStore.ts`, `api/cron/refresh-word-lists.ts`, `api/admin-refresh.ts`, `api/word-lists/manifest.ts`) and the client-side `refreshStore.ts` projection.
- Confirm the factory still returns the documented `skipped` status when `BLOB_READ_WRITE_TOKEN` is absent and the documented success path when it is present (use the existing test doubles in `src/data/refreshStore.ts`). Do not invent new fixtures.

**Verification**:
- `npm run test` continues to cover the existing refresh-store and refresh-pipeline tests with no regressions and no weakened assertions.
- Atomic swap, projection, and per-length failure tests still pass unchanged.
- The build artifact must not bundle `@vercel/blob` into the client (`dist/assets/*.js`). Re-run the Phase 13 client-bundle leak check (`grep -R "@vercel/blob" dist/` returns no matches in shipped chunks) and record the result.
- The public manifest endpoint shape (`{ ok, manifest }` / `{ ok: false, reason }`) and HTTP cache headers from `api/word-lists/manifest.ts` are unchanged.

### Step 12U.6 — Documentation, Changelog, and Progress Artifacts

**Build / modify**:
- Add a new `[Unreleased] — Fixed` block to `CHANGELOG.md` describing:
  - Resolution of the residual TypeScript build errors from the updated diagnosis (missing `.js` extensions across `api/`/`src/data/` boundary, missing barrel re-exports from `src/data/index.ts`, JSON import attribute alignment, `loadWordList.ts` type mismatch).
  - Practice length selector now exposing the full 2..35 range from real (or, where real content is unavailable, gracefully-handled) bundled data, with the "word not in list" regression resolved.
  - Removal of any remaining Phase 9 debug surface.
  - Any documentation update required by the bundling strategy chosen in Step 12U.3 (e.g., note about dynamic-import lengths).
- Update `docs/deployment.md` only if Step 12U.3's strategy changes operator-visible behavior (for example, if length-indexed dynamic imports change preview deployment expectations). Do not introduce documentation about features outside the diagnosis report's scope.
- Append a new row to `progress/PROGRESS.csv` for this section using `phase_id = 15`, title `"Phase 12 — Fix Build Errors, Length Selector, and Polish Artifacts (Updated Diagnosis Report 2026-05-26)"`. Reuse the prompt-gate/next-step columns consistently with prior rows.
- Create `progress/PROGRESS-STEP-15.md` from `progress/PROGRESS-TEMPLATE.md` summarizing what changed across Steps 12U.1–12U.6, what verification ran, known limitations (including any Vercel-only verification the agent could not perform), and whether the user is safe/authorized to proceed to a standard release review.
- If any step cannot be completed (for example because Vercel preview access is not available), annotate the progress markdown with the missing check, the reason, and what was verified locally instead, per CONSTITUTION §6.2.

**Key files**:
- `CHANGELOG.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-15.md`
- `docs/deployment.md` (only if required)

**Verification**:
- The new CSV row matches the progress markdown summary exactly.
- No secrets, tokens, deploy URLs containing internal identifiers, or private deployment data appear in any updated artifact (CONSTITUTION §5.4, §14).
- Changelog entry references only user-facing or build-facing behavior changes; it does not leak repository-internal debugging detail.

### Step 12U.7 — Full Verification, Security Review, and Halt

**Build / modify**:
- No new code changes in this step.

**Verification**:
- Run, in order, and record results in `progress/PROGRESS-STEP-15.md`:
  - `npm ci`
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - `npx tsc -p tsconfig.api.json --noEmit`
  - `git diff --check`
  - The Phase 13 client-bundle leak check (confirm `@vercel/blob` is not in any `dist/assets/*.js`).
- Run `codeql_checker` on the diff. Address any true-positive alert in changed lines before halting (CONSTITUTION §14). False positives may be ignored with a written justification in the progress report.
- Manual smoke checks captured in the progress report:
  - Home shell no longer shows the floating "polish ready" box or any Phase 9 debug surface on any route.
  - Practice length dropdown shows every integer 2..35 in both `og` and `go`.
  - Known real English words at lengths 2, 5, 12, 20, and 35 are accepted; clearly invalid strings are still rejected.
  - Daily `og` and daily `go` still play normally with length 5.
  - Post-game definitions, sharing, settings, and admin surfaces still render as before.
- Reconfirm CONSTITUTION compliance: no out-of-scope v1 features; no removed or weakened tests; no committed secrets; no service-role exposure to the client; no unescaped HTML from imported definition data; progress artifacts updated; daily-mode performance unchanged.

**Pause point**: Commit and push every change through the approved progress-reporting workflow. Provide the standard review-gate summary (what changed, what was verified, limitations, links to the updated `progress/PROGRESS.csv` row and `progress/PROGRESS-STEP-15.md`, exact approval needed) and halt for explicit user approval before any production deployment action.

### Section 17 Exit Checklist

- Every error class in the updated `DIAGNOSIS-REPORT-2026-05-26.md` is either resolved in code or documented as already-fixed and pending a clean Vercel rebuild, with the reproduction map preserved in `progress/PROGRESS-STEP-15.md`.
- Every Phase 9 debug surface (the "polish ready" floating box and its peers) is gone from `src/` and from the built `dist/`.
- Practice mode exposes every length 2..35 in `og` and `go`; guess validation uses the full bundled (or lazily-loaded) word lists at every length; daily mode remains locked to length 5.
- The persistence layer continues to behave as in Phase 13 (atomic swap, factory skip-when-unconfigured, no `@vercel/blob` in client bundle).
- `CHANGELOG.md`, `progress/PROGRESS.csv`, and `progress/PROGRESS-STEP-15.md` are updated and free of secrets or private deployment data.
- `npm run lint`, `npm run test`, `npm run build`, and the standalone `api/` typecheck all pass; `codeql_checker` is run and any true-positive alert in changed lines is fixed.
- The agent halts and waits for explicit user approval before any production release action.

---

## 18. Phase 13 — Plan Addendum (ADDITIONS-2026-05-27): Word Explorer, Feedback Tab, Sound Effects, Authentication Improvements, and Repository Cleanup

**Plan Version**: 1.3 (addendum)
**Date**: 2026-05-27
**Status**: Draft for user review — implementation must NOT begin until the user explicitly approves this addendum.
**Authority**: This addendum is bound by `CONSTITUTION.md` (v3.1), `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, prior sections of this plan, and `ADDITIONS-2026-05-27.md`.

### 18.1 Scope, Source of Truth, and Operating Rules

This addendum covers the five new work streams declared in `ADDITIONS-2026-05-27.md`:

1. **Word Explorer Tab** (new public tab).
2. **Feedback Tab** (new public tab).
3. **Sound Effects** (new optional in-game audio with Settings toggle).
4. **Authentication Improvements** (email + password alongside existing magic link, durable session, reliable admin role detection).
5. **Repository Cleanup & Re-organization** (safe, non-deleting reorganization with import-path updates).

Binding rules for this addendum:

- `ADDITIONS-2026-05-27.md` is the source of truth for behavior; this section is the source of truth for ordering, verification, and pause points.
- No code changes are executed by writing this addendum. Implementation begins only after explicit user approval.
- No files may be deleted, renamed in a lossy way, or have existing functionality removed at any phase below. Moves are allowed (Step 18.3) but every move must be accompanied by import-path updates so behavior is preserved.
- All new tabs (Word Explorer, Feedback) must be visible to everyone, including guests (per `ADDITIONS-2026-05-27.md` §"Implementation Constraints").
- Daily `og` and daily `go` remain fixed at 5 letters (CONSTITUTION §3, BRRRDLE-SPEC §3.1). Nothing in this addendum may change that.
- Every step ends with verification and an explicit halt-for-approval gate, per CONSTITUTION §5.3 and §6, and per the Standard Phase Exit Checklist in §1.3 of this plan.
- `progress/PROGRESS.csv` and a new `progress/PROGRESS-STEP-N.md` report must be created/updated for every step below before halting. `CHANGELOG.md` must receive a corresponding `[Unreleased]` entry at every step that ships user-visible or build-visible change.
- No secrets, tokens, deploy URLs containing internal identifiers, or private deployment data may appear in any artifact (CONSTITUTION §5.4, §14).
- All new code paths must pass `npm run lint`, `npm run test`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit` (where api/ is touched), and `codeql_checker` must be run after each step and any true-positive alert in changed lines fixed before halting (CONSTITUTION §14).
- Network calls that the sandbox cannot reach (e.g., Hugging Face, Supabase production, Vercel deploy hooks) must be recorded as documented limitations per CONSTITUTION §6.2; they must not be silently skipped.

### 18.2 Phase 13.0 — Pre-flight, Baseline, and Risk Map

**Goal**: Lock the current `main` as a known-good baseline before any addendum work begins, and produce a written risk map.

**Build / modify**: No source changes. Produce only progress artifacts.

**Activities**:
- Read `progress/PROGRESS.csv` and the most recent `progress/PROGRESS-STEP-N.md` to confirm no in-flight blockers remain from Phase 12 follow-ons.
- Confirm `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, this plan, and `ADDITIONS-2026-05-27.md` are aligned (no conflicts with daily 5-letter lock, practice 2–35, definitions ordering, admin role gate).
- Produce an internal risk map of:
  - Files most likely to move during Step 18.3 (cleanup).
  - Modules consumed by `api/` (server) so any cleanup move preserves serverless build behavior and the standalone `tsconfig.api.json` typecheck.
  - All places that currently read Supabase session/role (for the auth improvements step).
  - Places that already wire navigation order (for the new tabs).
- Record the risk map and the chosen execution order (the order in §18.1 list above) in `progress/PROGRESS-STEP-18.md`.

**Key files**:
- `progress/PROGRESS.csv` (append a new row for `phase_id = 18`, title `"Phase 13.0 — Plan Addendum Pre-flight & Risk Map (ADDITIONS-2026-05-27)"`).
- `progress/PROGRESS-STEP-18.md` (new, from `progress/PROGRESS-TEMPLATE.md`).
- `CHANGELOG.md` (`[Unreleased] — Documentation` entry noting that the addendum and risk map were produced and that implementation has not yet started).

**Verification**:
- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Recorded confirmation that no test was weakened or removed (CONSTITUTION §6.3).

**Pause point**: Commit/push via the approved progress-reporting workflow. Halt for explicit user approval of the addendum and the risk map before beginning Step 18.3 (Repository Cleanup).

### 18.3 Phase 13.1 — Repository Cleanup & Re-organization (Safe, Non-Destructive)

**Goal**: Re-organize `src/` (and adjacent assets) into a cleaner, more logical layout, without deleting anything and without changing behavior. This step is executed **first** so that all subsequent feature work in this addendum lands on the cleaned layout.

**Constitutional guardrails** (CONSTITUTION §3, §6.3, §14):
- No file may be deleted.
- No file may be renamed in a way that drops its content.
- No test may be removed, skipped, or weakened.
- Daily 5-letter lock and practice 2–35 contract must remain intact.
- Server-side `api/` build behavior, the `tsconfig.api.json` standalone typecheck, and the "no `@vercel/blob` in client bundle" invariant (Phase 13 of this plan) must remain intact.

**Build / modify** (executed in clearly separated sub-commits so review is feasible):

- **18.3.1 Audit & Move Map (no moves yet).** Produce a concrete move map listing each source path and its proposed new path, grouped by logical concern (e.g., gameplay engine, data layer, UI primitives, account/auth, admin, PWA, stats/progression, definitions, app shell). The move map is committed as part of `progress/PROGRESS-STEP-19.md` so the user can approve it before any file actually moves. The map must:
  - Preserve all module boundaries currently relied on by `api/` and by `tsconfig.api.json`.
  - Preserve the existing barrel re-exports from `src/data/index.ts`, `src/ui/index.ts`, `src/account/index.ts`, and `src/admin/index.ts`.
  - Avoid moving JSON word-list assets unless absolutely required; if moved, the build-time JSON import attributes and the bundled-source path documented in the data layer must be updated atomically.
- **18.3.2 Execute moves in small, reviewable groups.** Each group is a separate commit. For each group:
  - Move files with `git mv` (history-preserving).
  - Update every import path that references the moved file, including TypeScript path aliases (if any are introduced).
  - Update any `__tests__` paths and Vitest configuration that depends on file location.
  - Re-export from existing barrel files so external consumers (including `api/`, `src/App.tsx`, `src/main.tsx`) do not need to change.
- **18.3.3 Update tooling references.** If any move changes paths used by:
  - `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `vercel.json`, `public/brrrdle-sw.js`, `docs/`, `progress/`, or any GitHub Actions workflow,
  - those references must be updated in the same commit as the move and listed in the corresponding `progress/PROGRESS-STEP-N.md`.

**Key files** (representative; exact list is enumerated by 18.3.1):
- `src/**`
- `api/**` (only import paths if needed; no behavior change)
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.api.json`
- `vite.config.ts`
- `eslint.config.js`
- `vercel.json`
- `docs/**` (only if a path referenced from docs moves)

**Verification** (run after every sub-commit, recorded in `progress/PROGRESS-STEP-19.md`):
- `npm ci`
- `npm run lint`
- `npm run test` (full suite, expect identical count and identical pass set; no test may be added or removed in this step except where the test itself moves)
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- Client-bundle leak check: `grep -R "@vercel/blob" dist/` returns no matches in shipped chunks (Phase 13 invariant).
- `git diff --check`
- `codeql_checker` on the cumulative diff at end of step.

**Manual follow-up steps the user may need to perform** (documented in `progress/PROGRESS-STEP-19.md` and in `CHANGELOG.md`):
- **Vercel**: If `vercel.json` rewrites, the `api/` entry-points, or the cron route path change because of a move, the user must redeploy and re-verify that the Vercel Cron schedule and `BLOB_READ_WRITE_TOKEN` / `CRON_SECRET` environment variables still bind to the correct routes. If no `api/` path changed, no Vercel reconfiguration is required and this must be stated explicitly.
- **Supabase**: If the Supabase client module path changes (currently `src/account/supabaseClient.ts`), the user does **not** need to reconfigure Supabase project settings — only the local `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` envs continue to apply. This must be stated explicitly so the user is not misled.
- **GitHub Pages / Jekyll docs**: If any `docs/` file moves, confirm the `_config.yml` `permalink` strategy and any internal cross-links still resolve.
- **GitHub Actions**: If a workflow path expression depends on a moved directory, the workflow file must be updated in the same commit; otherwise, no Actions reconfiguration is required.

**Progress tracking**:
- Append `phase_id = 19`, title `"Phase 13.1 — Repository Cleanup & Re-organization (ADDITIONS-2026-05-27)"` to `progress/PROGRESS.csv`.
- Create `progress/PROGRESS-STEP-19.md` with the move map, per-group commit list, verification results, and the explicit manual-follow-up list above.
- Add a `CHANGELOG.md` `[Unreleased] — Changed` entry summarizing only the reorganization at a behavior-preserving level (no new features).

**Pause point**: Commit/push via the approved workflow. Halt for explicit user approval before beginning Step 18.4.

### 18.4 Phase 13.2 — Word Explorer Tab

**Goal**: Add a new public top-level tab that shows the exact word lists the game is currently using, with live filtering, sortable columns, copy buttons, and a pre-filled "Request word" GitHub Issue path.

**Build / modify**:

- **18.4.1 Data hook.** Add a hook that returns, for a chosen length `N` in 2..35, the combined deduplicated union of `answers` ∪ `validGuesses`, tagged with `Type = "Answer"` and/or `Type = "Valid Guess"` (a word that appears in both is tagged as both, per the requirement that the two checkboxes are combinable). The hook must reuse the existing data layer (the same loader used by gameplay) so it inherits the Vercel Blob / manifest → bundled JSON fallback chain. It must not introduce a new fetch path or duplicate the loader.
- **18.4.2 UI.** Add a new route `word-explorer` with:
  - Length selector (default = 5; range = 2..35 inclusive, intersected with `BUNDLED_WORD_LIST_LENGTHS` and any extra lengths the live manifest exposes).
  - Live search box (case-insensitive, exact and prefix-aware; filters incrementally as the user types).
  - Two checkboxes — "Show Answers" and "Show Valid Guesses" — both checked by default and combinable.
  - Sortable column headers ("Word", "Type"). Sort must be deterministic and reversible.
  - Per-row copy-to-clipboard button using the existing UI primitive style (`src/ui/Button.tsx`) and the standard browser clipboard API with a focus-safe fallback.
  - Responsive layout: on small screens the table collapses into a single-column card list (use existing Tailwind utilities; do not introduce a new responsive framework).
  - Empty state: `"{searchTerm}" is not in the current {length}-letter word list.` plus a "Request this word" button.
- **18.4.3 "Request this word" link.** Build a URL to GitHub's pre-filled new-issue endpoint for `ryanjosephkamp/brrrdle` with:
  - Title: `Word request: "{word}" (length {N})`
  - Labels: `word-request`
  - Body: contains the requested word, the selected length, the current date (ISO-8601, generated client-side), a note that the request came from the in-game Word Explorer, and a "Why this word?" optional section with a polite prompt.
  - All URL parameters must be percent-encoded.
  - The link opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`).
- **18.4.4 Navigation.** Update `src/app/routes.ts` (or its post-cleanup equivalent path from Step 18.3) so the navigation order is exactly: og | go | Practice | **Word Explorer** | **Feedback** | Settings | Admin. The Admin entry must remain hidden for non-admins (CONSTITUTION §8.2).
- **18.4.5 Accessibility & motion.** Keyboard-navigable controls, visible focus rings, ARIA labels on the copy buttons, and respect for `prefers-reduced-motion` (CONSTITUTION §12).
- **18.4.6 Tests.**
  - Unit tests for the combine/dedupe/tag logic at length 5 and at least one short (2 or 3) and one long (≥20) length.
  - Unit tests for the GitHub Issue URL builder, including encoding of words with quotes, apostrophes, and Unicode (where applicable to the bundled set).
  - Unit tests for the empty-state copy and the route ordering.

**Curation note (read-only for this repo)**: The answers curation algorithm in `ADDITIONS-2026-05-27.md` §1 Data Source ("Quality score = 0.45×frequency + 0.30×positional + 0.15×vowel-balance + 0.10×uniqueness", dynamic target size, deterministic seed `42 + length`) is owned by the upstream `english-openlist` preprocessing repo, **not** by this repo. The brrrdle app only **consumes** the resulting JSONs and the `metadata` block they contain. This step must document — in the progress report — that no curation algorithm is being implemented inside `brrrdle` and that the metadata block is surfaced verbatim if the live manifest contains it.

**Key files** (paths reflect post-cleanup layout; exact names finalized in Step 18.3):
- New: route file for `WordExplorer`, page component, table component, length selector wrapping the existing primitive (if any), GitHub Issue URL helper, hook.
- Updated: `src/app/routes.ts` (navigation order, route entry), `src/app/App.tsx` (route wiring).
- Updated: barrel `index.ts` files as needed.

**Verification**:
- `npm run lint`
- `npm run test`
- `npm run build`
- Client-bundle leak check unchanged.
- Manual smoke checks, recorded in the progress report:
  - Word Explorer tab is visible while signed-out and while signed-in.
  - Default load is length 5, both checkboxes on, sorted alphabetically.
  - Length 2 and length 35 each show the expected data shape (real or synthetic-placeholder as documented in CHANGELOG, per §17 of this plan).
  - Search filters live and matches are case-insensitive.
  - Sort toggles both directions on both columns.
  - Copy button writes the word to clipboard and announces success without leaking focus.
  - Empty state surfaces the exact `"{searchTerm}" is not in the current {length}-letter word list.` message and the Request button opens a correctly pre-filled GitHub Issue URL (verified by inspecting the URL without actually submitting an issue from the sandbox).
- `codeql_checker` run; any true-positive alert in changed lines fixed.

**Manual follow-up steps**: None expected for Vercel/Supabase. If the GitHub repo `word-request` label does not yet exist on `ryanjosephkamp/brrrdle`, the user must create it once (documented in the progress report).

**Progress tracking**: Append `phase_id = 20`, title `"Phase 13.2 — Word Explorer Tab (ADDITIONS-2026-05-27)"` to `progress/PROGRESS.csv`. Create `progress/PROGRESS-STEP-20.md`. Add a `CHANGELOG.md` `[Unreleased] — Added` entry.

**Pause point**: Halt for explicit user approval before beginning Step 18.5.

### 18.5 Phase 13.3 — Feedback Tab

**Goal**: Add a new public top-level tab that lets any visitor file a structured feedback item as a pre-filled GitHub Issue.

**Build / modify**:

- New route `feedback`, added to `src/app/routes.ts` between Word Explorer and Settings, preserving the order in Step 18.4.4.
- A simple, accessible form with:
  - **Category** dropdown: `Bug Report` | `Feature Request` | `Other`.
  - **Description** (required, plain text, character ceiling enforced and clearly displayed).
  - **Optional details** (multi-line text).
  - **Optional email** (free-form; not validated against an external service; documented as optional and never required).
  - A "Submit" button that constructs a pre-filled GitHub Issue URL for `ryanjosephkamp/brrrdle`:
    - Title: derived from category + short summary.
    - Labels: `feedback` (plus a category-derived label when straightforward: `bug`, `enhancement`, or none).
    - Body: includes category, description, optional details, optional email, the current date, and a note that the report came from the in-game Feedback tab.
    - URL parameters percent-encoded; link opens in a new tab with `noopener noreferrer`.
- Form must be keyboard-accessible, focus-managed, and respect `prefers-reduced-motion`.
- No server-side endpoint, no client-side email transport, and no PII storage. The optional email is only embedded into the issue body the user reviews before submitting on github.com.

**Tests**:
- Unit tests for the issue-URL builder, including each category and presence/absence of each optional field.
- Unit tests for required-field validation (description cannot be empty/whitespace).
- Snapshot or DOM tests that confirm the form is keyboard-traversable in the documented order.

**Verification**:
- `npm run lint`
- `npm run test`
- `npm run build`
- Manual smoke checks:
  - Feedback tab is visible while signed-out and while signed-in.
  - Each category produces a distinct, correctly-labeled pre-filled URL.
  - Empty description blocks submission with a visible, accessible error.
- `codeql_checker` run; any true-positive alert in changed lines fixed.

**Manual follow-up steps**: If the `feedback` (and optionally `bug`, `enhancement`) labels do not yet exist on `ryanjosephkamp/brrrdle`, the user must create them once. Documented in the progress report.

**Progress tracking**: Append `phase_id = 21`, title `"Phase 13.3 — Feedback Tab (ADDITIONS-2026-05-27)"`. Create `progress/PROGRESS-STEP-21.md`. Add a `CHANGELOG.md` `[Unreleased] — Added` entry.

**Pause point**: Halt for explicit user approval before beginning Step 18.6.

### 18.6 Phase 13.4 — Sound Effects

**Goal**: Add a minimal, pleasant, fully-toggleable set of sound effects.

**Build / modify**:

- A small sound-effect engine, isolated behind a single module, that exposes named events:
  - `tile-flip`
  - `correct-guess`
  - `game-over-win`
  - `game-over-loss`
  - `keyboard-click`
  - `invalid-guess`
- Implementation must use the **Web Audio API** by default (no media autoplay), with optional small assets in `public/sounds/` if pre-rendered samples are needed. If samples are added, they must be small (<= a few KB each), license-clean, and listed with their provenance in the progress report and CHANGELOG.
- Wire the engine into the existing game flow at the minimum surface area required:
  - `tile-flip` and `keyboard-click` in the keyboard/input layer.
  - `correct-guess`, `invalid-guess`, `game-over-win`, `game-over-loss` in the `og` and `go` session orchestrators.
- Add a **"Sound Effects"** toggle to Settings, **On by default**, persisted via the same local persistence used by other user preferences (no new storage mechanism). The toggle must be honored synchronously by the engine — when off, the engine is a no-op and constructs no `AudioContext`.
- Respect `prefers-reduced-motion` if the platform also signals reduced audio (do not couple silently to motion; document the chosen behavior in the progress report).
- The engine must not throw on environments without Web Audio (older browsers, SSR-style preview); it must degrade to a no-op.

**Tests**:
- Unit tests verifying the engine no-ops when the toggle is off.
- Unit tests verifying event names and dispatch ordering (mock the `AudioContext` boundary; do not assert on audible output).
- Unit tests for Settings persistence of the toggle.

**Verification**:
- `npm run lint`
- `npm run test`
- `npm run build`
- Manual smoke checks (on a device with audio):
  - Each of the six events plays at a reasonable volume.
  - Toggling off silences every event immediately.
  - The toggle survives a page reload.
- `codeql_checker` run; any true-positive alert in changed lines fixed.

**Manual follow-up steps**: None for Vercel/Supabase. If new asset files are added under `public/sounds/`, the user must confirm they are committed and that the PWA service worker (`public/brrrdle-sw.js`) cache list includes them or that they are loaded lazily; the chosen behavior is documented in the progress report.

**Progress tracking**: Append `phase_id = 22`, title `"Phase 13.4 — Sound Effects (ADDITIONS-2026-05-27)"`. Create `progress/PROGRESS-STEP-22.md`. Add a `CHANGELOG.md` `[Unreleased] — Added` entry.

**Pause point**: Halt for explicit user approval before beginning Step 18.7.

### 18.7 Phase 13.5 — Authentication Improvements

**Goal**: Add email + password sign-in alongside the existing magic link flow, persist sessions reliably, and ensure the Admin tab renders fully for users whose Supabase `raw_app_meta_data.role` is `"admin"`.

**Build / modify**:

- **18.7.1 Email + password support in `AuthPanel`.** Add a tabbed or toggle UI inside the existing `AuthPanel` (post-cleanup path) so the user can choose:
  - **Magic link** (existing behavior, unchanged).
  - **Email + password** (new): sign-in and sign-up sub-flows using `supabase.auth.signInWithPassword` and `supabase.auth.signUp`, with clear, accessible error reporting (no raw Supabase error strings shown unfiltered to the user).
- **18.7.2 Session persistence.** Confirm and, where needed, configure the Supabase client (`src/account/supabaseClient.ts`, post-cleanup path) so sessions persist across reloads via the default `persistSession: true` / `autoRefreshToken: true` settings, and so the app subscribes to `onAuthStateChange` exactly once. Do not change the env var names (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) and do not introduce any service-role usage on the client (CONSTITUTION §14).
- **18.7.3 Admin role detection.** Confirm and, where needed, fix the front-end to derive admin status from `session.user.app_metadata.role === "admin"` (which maps to Supabase's `raw_app_meta_data.role`). The Admin tab must render with the manual refresh controls already implemented in Phase 8 / Phase 12 work whenever this condition holds. Non-admin users must continue to see the Admin tab hidden.
- **18.7.4 UX & accessibility.** The auth UI must be keyboard-navigable, focus-managed, screen-reader-labeled, and must not autofocus past the first input. Password inputs must use `type="password"` and an optional show/hide toggle; no plaintext logging of passwords or tokens anywhere (CONSTITUTION §14).
- **18.7.5 Backwards compatibility.** Existing magic-link users must not be required to set a password. The two flows must coexist; choosing one must not disable the other for the same email.

**Tests**:
- Unit tests for the new sign-in/sign-up handlers using Supabase client doubles (no live network calls in tests).
- Unit tests for admin detection: a session with `app_metadata.role === "admin"` exposes the Admin tab; a session without it does not; an absent session does not.
- Unit tests that confirm session persistence is enabled (assertion against the constructed client options).
- A regression test that confirms the magic-link path still works through its existing seam.

**Verification**:
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit` (in case any shared type touches the API side)
- Manual smoke checks (recorded in the progress report; live Supabase access required for some):
  - Magic link still works.
  - Email + password sign-up + sign-in works against a Supabase project with password auth enabled.
  - Reload of the page preserves the session.
  - A user whose Supabase `raw_app_meta_data.role` is `"admin"` sees the Admin tab with refresh controls.
  - A non-admin user does not see the Admin tab.
- Static secret-pattern review on changed lines.
- `codeql_checker` run; any true-positive alert in changed lines fixed.

**Manual follow-up steps**:
- **Supabase (required)**: The user must enable **Email + Password** authentication in the Supabase project's Auth providers settings if it is not already enabled. The user must verify that the project's email templates (confirmation, password reset) are configured. These steps cannot be performed by the agent.
- **Supabase (required for admin verification)**: The user must confirm that at least one user has `raw_app_meta_data.role = "admin"` set via the Supabase dashboard or admin API for end-to-end admin verification.
- **Vercel**: No env var changes are expected. If the user previously set any auth-related env vars, this step does not require modifying them; this must be stated explicitly in the progress report.
- **Documentation**: Update `docs/supabase.md` only if user-facing setup instructions for password auth are needed; otherwise leave docs unchanged.

**Progress tracking**: Append `phase_id = 23`, title `"Phase 13.5 — Authentication Improvements (ADDITIONS-2026-05-27)"`. Create `progress/PROGRESS-STEP-23.md`. Add a `CHANGELOG.md` `[Unreleased] — Changed` and `Added` entries.

**Pause point**: Halt for explicit user approval before beginning Step 18.8.

### 18.8 Phase 13.6 — Final Integration, Cross-Feature Verification, and Release Gate

**Goal**: Confirm that the cleanup, the two new tabs, sound effects, and the auth improvements coexist with each other and with the existing game features without regression.

**Build / modify**: No new functionality. Only fixes for any defect the cross-feature verification surfaces, and final progress/CHANGELOG bookkeeping.

**Verification**:
- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- Client-bundle leak check (no `@vercel/blob` in `dist/assets/*.js`).
- `git diff --check`
- Cross-feature manual smoke checks:
  - Daily `og` and daily `go` still play normally with length 5 (the daily lock is intact).
  - Practice mode still exposes lengths 2..35 with the same content guarantees documented in CHANGELOG §17 limitations.
  - Word Explorer tab loads and behaves correctly while signed-out, while signed-in as a non-admin, and while signed-in as an admin.
  - Feedback tab loads and behaves correctly in all three states.
  - Sound effects toggle survives reloads and applies immediately.
  - Sign-in with magic link, sign-in with email + password, session persistence, and admin tab visibility all behave as designed.
  - Sharing, definitions, settings, stats, and the existing admin refresh controls behave unchanged.
- `codeql_checker` run on the cumulative diff for the addendum; any true-positive alert in changed lines fixed.

**Manual follow-up steps (final consolidation)**: Re-list, in the final progress report, every Vercel / Supabase / GitHub-Pages / GitHub-Actions / GitHub-label step the user is required to perform, with checkmarks for those that were completed during the steps above and explicit "user must do" markers for those that remain.

**Progress tracking**: Append `phase_id = 24`, title `"Phase 13.6 — Final Integration & Release Gate (ADDITIONS-2026-05-27)"`. Create `progress/PROGRESS-STEP-24.md`. Add a `CHANGELOG.md` consolidating entry.

**Pause point**: Commit/push via the approved workflow. Halt for explicit user approval before any production deployment action.

### 18.9 Phase 13 Exit Checklist

- Every requirement in `ADDITIONS-2026-05-27.md` (§1 Word Explorer, §2 Feedback, §3 Sound Effects, §4 Authentication, §5 Cleanup) is implemented or explicitly documented as user-action-required.
- Daily `og` and daily `go` remain locked to 5 letters; practice still exposes 2..35.
- No file was deleted; no test was removed, skipped, or weakened.
- No secrets, service-role keys, or private deployment data appear in any artifact.
- No `@vercel/blob` import is present in the client bundle.
- `npm run lint`, `npm run test`, `npm run build`, and the standalone `tsconfig.api.json` typecheck all pass.
- `codeql_checker` was run after every step and every true-positive alert in changed lines is fixed.
- `progress/PROGRESS.csv`, all new `progress/PROGRESS-STEP-N.md` reports, and `CHANGELOG.md` are updated and free of sensitive data.
- All manual follow-up steps (Supabase password-auth enablement, label creation on `ryanjosephkamp/brrrdle`, optional Vercel reconfiguration only if any move actually touched a Vercel-bound path) are listed in the final progress report.
- The agent halts and waits for explicit user approval before any production release action.

---

## 19. Phase 14 — Plan Addendum (DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27): Fix the Admin Tab

**Plan Version**: 1.4 (addendum)
**Date**: 2026-05-27
**Status**: Draft for user review — implementation must NOT begin until the user explicitly approves this addendum.
**Authority**: This addendum is bound by `CONSTITUTION.md` (v3.1), `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, all prior sections of this plan, `ADDITIONS-2026-05-27.md`, and `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md` (the binding diagnosis report for this addendum).

### 19.1 Scope, Source of Truth, and Operating Rules

This addendum is **scoped strictly** to fixing the Admin tab regression described in `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md`. It does **not** introduce any feature outside that scope.

Binding rules:

- `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md` is the source of truth for the observed behavior and expected behavior; this section is the source of truth for sequencing, verification, and pause points.
- No source file may be deleted or renamed in a lossy way. Every change must be a minimal, additive or in-place edit that preserves all existing behavior outside the admin path.
- The daily 5-letter lock (CONSTITUTION §3, BRRRDLE-SPEC §3.1) and the practice 2..35 contract are out of scope and must remain untouched.
- The Supabase env-var contract is unchanged: only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` may be read on the client. No service-role key may ever appear on the client (CONSTITUTION §14).
- The existing `/api/admin-refresh` server route, its authorization checks, and its env-var bindings (`SUPABASE_URL` / `SUPABASE_ANON_KEY`) must not be weakened. Any client-side call to it must continue to send the user's Supabase access token via `Authorization: Bearer …`.
- Both authentication flows (magic link and email + password) must continue to work after this addendum, and the admin tab must behave correctly under either.
- No test may be removed, skipped, or weakened (CONSTITUTION §6.3).
- The Phase 13 client-bundle leak invariant (`@vercel/blob` must not appear in any `dist/assets/*.js` chunk) must remain intact.
- Every step ends with verification and an explicit halt-for-approval gate (CONSTITUTION §5.3, §6, and Standard Phase Exit Checklist in §1.3).
- `progress/PROGRESS.csv` and a new `progress/PROGRESS-STEP-N.md` report must be created/updated for every implementation step below before halting. `CHANGELOG.md` must receive a corresponding `[Unreleased]` entry at every step that ships a user-visible or build-visible change.
- No secrets, tokens, deployment URLs containing internal identifiers, or private deployment data may appear in any artifact (CONSTITUTION §5.4, §14).

### 19.2 Root-Cause Diagnosis

The observed symptom — the Admin tab consistently shows the static copy beginning with `"PROTECTED ADMIN / Manual refresh controls / Manual refresh requests must be sent through the protected /api/admin-refresh server route…"` — is produced by `src/admin/AdminPanel.tsx`. Concretely:

- That copy is the `access.allowed === true` branch of `AdminPanel.tsx`. When the user reports "the Admin tab is still showing only the placeholder text", the user is in fact **already** being recognised as having admin access; the panel simply has no actionable controls rendered inside the allowed branch. The current allowed branch is a descriptive `<Panel>` only — there is no manual refresh button, no status surface, and no call site for `/api/admin-refresh`.
- This is consistent with the diagnosis report's expected behaviour: "the Admin tab must render the full manual refresh UI/controls (the button that calls `/api/admin-refresh`)." Today the controls do not exist on the client. This is the **primary** root cause of the Admin tab regression.

In addition, there are two **secondary** robustness gaps that the diagnosis report explicitly calls out and that this addendum must close so the fix is durable:

- **Role-source coverage.** `src/account/auth.ts → getRoles()` derives admin status by reading `user.app_metadata.roles` (array) and `user.app_metadata.role` (string). In Supabase's JS client `app_metadata` mirrors the database column `raw_app_meta_data`, so in normal operation `app_metadata.role === "admin"` correctly reflects `raw_app_meta_data.role === "admin"`. However, the function does not defensively read `user.raw_app_meta_data?.role` (or `roles`) when present on the returned `User`. In practice this can matter when (a) a future auth-helper or middleware shape exposes the raw column directly, (b) older cached sessions surface only one of the two shapes, or (c) the user inspects the session in the browser console (the diagnostic commands in the diagnosis report) and is misled by an inconsistency between the two shapes. The fix must check **both** shapes and accept admin if either resolves to `"admin"`.
- **Stale session after login.** `App.tsx` subscribes to `onAuthStateChange` exactly once and hydrates `authState` from `getCurrentAuthState()` on mount. That is correct, but immediately after a successful magic-link or email + password sign-in (or sign-up confirmation), the access token in memory still embeds the role claim from the moment the JWT was issued. If the Supabase admin role was granted **after** the JWT was minted, the cached `User` will not yet reflect `role === "admin"` until the next auto-refresh. The fix must explicitly call `supabase.auth.refreshSession()` after a successful sign-in / sign-up (and on the `SIGNED_IN` / `TOKEN_REFRESHED` / `USER_UPDATED` events) so the next role read sees the freshest claim, and the Admin tab updates immediately on first login.

### 19.3 Scope of Fix (summary)

In one minimal, focused phase the agent will:

1. **Render the actual manual-refresh controls** inside `AdminPanel.tsx`'s allowed branch: a single "Refresh now" button that POSTs to `/api/admin-refresh` with `Authorization: Bearer <access_token>`, an accessible status region for the in-flight / success / failure states, and a small read-out of the last refresh response (revision, generatedAt, fetchedAt, per-length summary, persistence status) so admins can verify it ran. The descriptive paragraphs already in the allowed branch must be **kept** (no deletions) and merely complemented by the new controls.
2. **Harden admin-role detection** in `src/account/auth.ts` so that admin is granted when **any** of the following resolves to `"admin"`:
   - `user.app_metadata.roles[]` contains `"admin"`,
   - `user.app_metadata.role === "admin"`,
   - `user.raw_app_meta_data?.roles[]` contains `"admin"` (defensive read; `raw_app_meta_data` is not part of the published `User` type but may be present at runtime),
   - `user.raw_app_meta_data?.role === "admin"` (defensive read).
   The function must remain pure, must continue to return `readonly string[]`, must preserve the array-vs-string preference, and must never throw on missing/null shapes.
3. **Force a session refresh after successful sign-in / sign-up** so the Admin tab updates immediately:
   - After a successful `signInWithPassword`, `signUpWithPassword`, and on the `SIGNED_IN`, `TOKEN_REFRESHED`, and `USER_UPDATED` events delivered through `onAuthStateChange`, call `supabase.auth.refreshSession()` once and re-derive `authState` from the refreshed user. The magic-link flow already redirects through Supabase and arrives at `SIGNED_IN`, so the same `onAuthStateChange` path covers it.
   - The refresh must be best-effort: failures must not log the user out, must not throw to the UI, and must be reported through the existing `subscribeToAuthChanges` listener path only.
4. **Cover both auth flows** (magic link and email + password) by the same `onAuthStateChange` plumbing so no flow-specific code is needed.
5. **Keep the change non-breaking**: no file deletion, no file rename, no removal of existing behavior, no test removal. The current Phase 13 `subscribeToAuthChanges` contract and `App.tsx` admin-tab visibility predicate (`authState.user?.roles.includes('admin')`) continue to work unchanged.

Explicitly **out of scope**: Word Explorer, Feedback tab, Sound Effects, Repository Cleanup, OG/GO gameplay, daily lock, practice lengths, definitions, sharing, PWA, Supabase RLS changes, server-route behavior changes.

### 19.4 Phase 14.0 — Pre-flight & Reproduction Map

**Goal**: Confirm a clean baseline and record the exact failure surface before any edit.

**Build / modify**: No source changes. Produce only progress artifacts.

**Activities**:

- Run the baseline verification commands listed in §19.6 against the current `main` and record their results in `progress/PROGRESS-STEP-20.md`.
- Read `src/admin/AdminPanel.tsx`, `src/admin/authorization.ts`, `src/account/auth.ts`, `src/account/AuthPanel.tsx`, `src/account/supabaseClient.ts`, and `src/app/App.tsx` and confirm the current code paths match the diagnosis in §19.2. Record any deltas in the progress report.
- Confirm `supabaseClient.ts` already constructs the client with `persistSession: true` and `autoRefreshToken: true`; if it does not, record that as a blocker for §19.5.3. Do not change it yet.
- Confirm `/api/admin-refresh` continues to read the bearer token and check `app_metadata.role`/`roles` for `"admin"`. If it does, no server change is required by this addendum.
- Record the planned change list (§19.5.1–§19.5.4) and the user-action follow-ups (§19.7) in the progress report.

**Verification**: §19.6 baseline list.

**Pause point**: Halt for explicit user approval before beginning Step 19.5.

### 19.5 Phase 14.1 — Fix the Admin Tab (minimal, surgical)

**Goal**: Implement the four-part fix described in §19.3 with the smallest, safest diff that closes the regression.

**Build / modify** (in clearly separated sub-commits so review is feasible):

- **19.5.1 Harden role detection** (`src/account/auth.ts`).
  - Extend `getRoles(user)` to also defensively read `user.raw_app_meta_data?.roles` (when an array of strings) and `user.raw_app_meta_data?.role` (when a string), in that priority order after the existing `app_metadata` reads, deduplicated. Treat `raw_app_meta_data` as an unknown record (no `User` type widening) and use a narrow runtime guard so the published `@supabase/supabase-js` `User` type does not need to change.
  - Add an explicit `isAdminUser(user)` helper that returns `true` iff any of the four checks in §19.3.2 resolves to `"admin"`. Use it from `summarizeUser` so `AuthUserSummary.roles` continues to be the single source the UI consults.
  - Preserve the existing function signatures, return types (`readonly string[]`), and behavior for non-admin users. Do not introduce new exports beyond `isAdminUser`.

- **19.5.2 Render the manual refresh controls** (`src/admin/AdminPanel.tsx`, `src/admin/index.ts`, new `src/admin/manualRefresh.ts`, new `src/admin/ManualRefreshControls.tsx`).
  - Add `src/admin/manualRefresh.ts` exporting a pure async client helper `requestAdminRefresh({ supabase })` that:
    - Reads the current session via `supabase.auth.getSession()`,
    - Returns `{ ok: false, reason: 'missing-session' }` when there is no session,
    - POSTs to `/api/admin-refresh` with `Authorization: Bearer <access_token>` and `accept: application/json`, no body,
    - Parses the JSON response and returns a discriminated union: `{ ok: true, payload: AdminRefreshSuccess }` for HTTP 202, otherwise `{ ok: false, reason: 'unauthorized' | 'forbidden' | 'server-error' | 'network-error', status?: number, message?: string }`,
    - Never logs the bearer token; never persists the response payload to `localStorage`; never calls `console.error` with the token in scope.
  - Add `src/admin/ManualRefreshControls.tsx` rendering, inside the existing allowed-branch `<Panel>` (without removing the existing paragraphs):
    - A primary `<Button>` labeled "Refresh now" wired to `requestAdminRefresh`,
    - An accessible `aria-live="polite"` status region that shows idle / in-flight / success / failure states,
    - A read-out of the last successful response (revision, generatedAt, fetchedAt, length count, persistence.status) and, on failure, the diagnostic stage and message,
    - Disabled state while a request is in flight and after a successful refresh until the user re-arms (to avoid accidental double-refresh).
  - Update `AdminPanel.tsx` to render `ManualRefreshControls` inside the allowed branch in addition to the existing descriptive paragraphs. The existing `ErrorState` branches for `missing-authentication`, `missing-admin-role`, and `unconfigured` are unchanged. Re-export `ManualRefreshControls` from `src/admin/index.ts`.
  - The new component must accept the Supabase client via prop (not via a module-level import) so it remains testable with a client double, mirrors the pattern used elsewhere in `src/account/`, and supports the `unconfigured` case without crashing.

- **19.5.3 Force fresh session after auth events** (`src/account/auth.ts`, `src/account/AuthPanel.tsx`, `src/app/App.tsx`).
  - In `signInWithPassword` and `signUpWithPassword`, after a successful Supabase call, invoke `await client.auth.refreshSession()` (best-effort: ignore errors, do not surface to the UI, do not log tokens). Return the existing `{ ok: true }` shape unchanged so callers do not need to change.
  - In `subscribeToAuthChanges`, on `SIGNED_IN`, `TOKEN_REFRESHED`, and `USER_UPDATED` events, re-derive the listener payload from `session.user` (already happens) **and** opportunistically call `getCurrentAuthState(client)` after a fresh `getUser()` to pick up server-side role updates that the cached JWT may not yet reflect. Debounce so we never issue more than one `getUser()` per event.
  - In `App.tsx`, no new effects are required; the existing single `useEffect` that subscribes to `subscribeToAuthChanges` will receive the refreshed state through the same listener and re-render the navigation and Admin tab automatically. Verify by trace, not by adding code.
  - Do not call `refreshSession()` for the magic-link send path (`sendMagicLink`); the magic-link redirect arrives at `SIGNED_IN` and the listener path covers it.

- **19.5.4 Tests** (new or extended, no removals):
  - `src/account/auth.test.ts` — add cases for `isAdminUser` / `summarizeUser` covering all four shapes in §19.3.2 (including `raw_app_meta_data.role` only, `raw_app_meta_data.roles` only, `app_metadata.role` only, `app_metadata.roles` only, and combinations); cases for `signInWithPassword` / `signUpWithPassword` confirming that `refreshSession` is invoked on success and **not** invoked on failure; case confirming the refresh failure is swallowed and does not change the returned `{ ok: true }` shape.
  - `src/admin/authorization.test.ts` — add cases confirming the allowed/denied branches are unchanged for the new role-source shapes (the test continues to drive `evaluateAdminAccess` through `AuthState`, not through raw `User`).
  - New `src/admin/manualRefresh.test.ts` — cases for `requestAdminRefresh`: missing session, 401, 403, 502, network failure, and 202 success; assert that the `Authorization` header carries `Bearer <token>` and that the token never appears in the returned payload.
  - New `src/admin/ManualRefreshControls.test.tsx` — render the component with a Supabase client double and a fetch double; assert idle → in-flight → success and idle → in-flight → failure transitions; assert that the status region is `aria-live="polite"`; assert that the button is disabled during the request; assert that the existing descriptive paragraphs continue to render alongside the new controls (proving no deletion).
  - All other existing tests must continue to pass unmodified.

**Key files**:

- Modified: `src/account/auth.ts`, `src/account/auth.test.ts`, `src/admin/AdminPanel.tsx`, `src/admin/authorization.test.ts`, `src/admin/index.ts`.
- New: `src/admin/manualRefresh.ts`, `src/admin/manualRefresh.test.ts`, `src/admin/ManualRefreshControls.tsx`, `src/admin/ManualRefreshControls.test.tsx`.
- Unchanged (verified by inspection, not edit): `src/account/AuthPanel.tsx` body (no UI change), `src/account/supabaseClient.ts` (already persists session / auto-refreshes token), `api/admin-refresh.ts` (server contract unchanged), `src/app/App.tsx` admin-tab visibility predicate.

### 19.6 Verification

After **every** sub-commit in §19.5 and one final time at the end of the phase, the agent must run and record:

- `npm ci`
- `npm run lint`
- `npm run test` — full suite must pass with **strictly more** tests than before (new tests added, no tests removed or skipped).
- `npm run build` — `tsc -b` + `vite build` must succeed with no new TypeScript errors. The pre-existing >500 kB chunk-size warning may remain unchanged.
- `npx tsc -p tsconfig.api.json --noEmit` — must succeed.
- Client-bundle leak check: `grep -R "@vercel/blob" dist/assets/*.js` returns no matches.
- `git diff --check` — clean.
- `codeql_checker` — run on the cumulative diff at the end of the phase; every true-positive alert in changed lines must be fixed before halting.

**Diagnostic console commands** (to be executed manually by the user in the deployed app, recorded in the progress report verbatim, exactly as listed in `DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md`):

```js
// 1. Check current user role
supabase.auth.getUser().then(({ data }) => {
  console.log("Full user:", data.user);
  console.log("app_metadata.role:", data.user?.app_metadata?.role);
  console.log("raw_app_meta_data.role:", data.user?.raw_app_meta_data?.role);
  console.log("Is admin?", data.user?.raw_app_meta_data?.role === "admin");
});

// 2. Check if Admin tab should be visible
console.log("Current session:", supabase.auth.getSession());
```

**Manual smoke checks** (recorded in `progress/PROGRESS-STEP-20.md`):

- Sign in via magic link as a Supabase user with `raw_app_meta_data.role = "admin"`. The Admin tab becomes visible in the primary navigation **without a manual page reload** within one auth event, and shows both the existing descriptive paragraphs **and** the new "Refresh now" button.
- Repeat with email + password sign-in. Same expected result.
- Repeat with email + password sign-up for a brand-new user that the operator promotes to admin in the Supabase dashboard **after** sign-up; on the next `TOKEN_REFRESHED` (or after the operator triggers `Refresh now` once, or after the operator signs out and back in), the Admin tab appears.
- Sign in as a non-admin user. The Admin tab remains hidden from the primary navigation, and the `evaluateAdminAccess`-driven `ErrorState` would show if the route were forced.
- Click "Refresh now" as the admin user. The status region transitions idle → in-flight → success (or → failure with a diagnostic stage/message). The browser DevTools network panel shows a POST to `/api/admin-refresh` with `Authorization: Bearer …`. No service-role key is sent.
- Reload the page after sign-in. The session persists, the Admin tab remains visible, and the refresh button remains operational.

### 19.7 Manual Follow-Up Steps (User-Required)

These steps must be listed verbatim in `progress/PROGRESS-STEP-20.md` and in the `CHANGELOG.md` `[Unreleased] — User action required` block:

- **Supabase (required)**: Confirm that at least one user has `raw_app_meta_data.role = "admin"` set via the Supabase dashboard or admin API. Without this, no smoke check in §19.6 can verify the admin path end-to-end.
- **Supabase (required for email + password verification)**: Confirm the Email + Password provider remains enabled (carried over from the Phase 13.5 follow-up in §18.7).
- **Vercel**: No environment-variable or routing change is required. `SUPABASE_URL` and `SUPABASE_ANON_KEY` (or their `VITE_`-prefixed counterparts) must continue to be set on the Vercel project so `/api/admin-refresh` can validate the bearer token.
- **GitHub Actions / Pages / labels**: No action required.
- **Browser session hygiene** (recommended once after deploy): The first time an existing admin user opens the new build, ask them to sign out and sign back in so the locally cached JWT is replaced. This guarantees the `raw_app_meta_data` claim that was minted before the deploy is immediately re-read.

### 19.8 Progress Tracking and CHANGELOG

- Append `phase_id = 20` ("Phase 14.0 — Admin Tab Fix Pre-flight & Reproduction Map") and `phase_id = 21` ("Phase 14.1 — Admin Tab Fix (Implementation & Verification)") to `progress/PROGRESS.csv` as their respective steps are executed.
- Create `progress/PROGRESS-STEP-20.md` (for Phase 14.0, pre-flight) and `progress/PROGRESS-STEP-21.md` (for Phase 14.1, implementation) using `progress/PROGRESS-TEMPLATE.md`.
- For the addendum-drafting step itself (this section), append a note to the most recent existing progress report (`progress/PROGRESS-STEP-19.md`) and add an `[Unreleased] — Documentation` entry to `CHANGELOG.md` recording that the addendum has been created and that implementation has not begun.
- For Phase 14.1, add `[Unreleased] — Fixed` and `[Unreleased] — Added` entries to `CHANGELOG.md` describing the admin-tab regression fix, the new manual-refresh controls component, the hardened role detection, and the post-login session refresh.

### 19.9 Phase 14 Exit Checklist

- The Admin tab renders an actionable "Refresh now" button (plus the existing descriptive paragraphs) for users whose Supabase user has `raw_app_meta_data.role === "admin"` (or `app_metadata.role === "admin"`).
- Admin role detection accepts admin from any of `app_metadata.roles[]`, `app_metadata.role`, `raw_app_meta_data.roles[]`, or `raw_app_meta_data.role`.
- The Admin tab updates immediately after sign-in (magic link or email + password) without requiring a manual page reload, via the `onAuthStateChange` listener and an explicit best-effort `refreshSession()` call.
- No file was deleted; no test was removed, skipped, or weakened.
- The daily 5-letter lock and the practice 2..35 contract are unchanged.
- No service-role key is present on the client; `/api/admin-refresh` server contract is unchanged.
- `npm run lint`, `npm run test`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit` all pass.
- `codeql_checker` was run on the cumulative diff and every true-positive alert in changed lines is fixed.
- `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-20.md`, `progress/PROGRESS-STEP-21.md`, and `CHANGELOG.md` are updated and free of sensitive data.
- The agent halts and waits for explicit user approval before any production release action.

---

## 20. Phase 15 — Plan Addendum (AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27): Authentication & Profile UX Redesign

**Plan Version**: 1.5 (addendum). Bound by `AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md`, `CONSTITUTION.md` v3.1, `BRRRDLE-SPEC.md`, and the prior plan.

### 20.1 Scope, Source of Truth, and Operating Rules

- **Source of truth**: `AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md`. Every creative decision is documented here.
- **Non-negotiable preserved invariants**: Daily 5-letter lock and practice 2..35; Admin gating and `/api/admin-refresh` server contract; Word Explorer, Feedback, Sound Effects, sharing, definitions, stats, guest persistence, Pay-to-Continue, sync stub, danger-zone confirmations; no file deletion; no test removal/skip/weakening; no new env var names; no service-role on client; no `@vercel/blob` in client bundle; magic-link and password flows coexist.
- **Architecture (creative)**: Profile data stored in `auth.users.user_metadata` via `supabase.auth.updateUser({ data })`. Avatars default to deterministic initials-on-gradient; image upload is gated on a runtime probe of an `avatars` Supabase Storage bucket.

### 20.2 Phase 15.0 — Pre-flight & Baseline (executed)
Re-confirmed baseline (194/194 tests, lint+build clean). Reproduction map confirmed every Current Problem in the spec is reproducible at HEAD.

### 20.3 Phase 15.1 — Auth Helper Surface Expansion (executed)
- `src/account/profile.ts`: pure helpers `deriveInitials`, `normalizeDisplayName`, `validateAccentColor`, `validateAvatarUrl`, `pickInitialsGradient`, `deriveProfileFromUser`.
- `src/account/auth.ts` additive helpers: `classifyAuthError`, `sendPasswordResetEmail` (renamed from spec's `requestPasswordReset` to avoid colliding with the pre-existing unused `dangerZone.requestPasswordReset`), `updateProfile`, `hasAvatarStorage`, `uploadAvatar`. `AuthUserSummary.profile` derived in `summarizeUser`.

### 20.4 Phase 15.2 — `AuthModal` (executed)
- `src/account/AuthModal.tsx`: Dialog with Magic Link / Email + Password tabs, `role="radiogroup"` sub-mode toggle, single primary CTA, inline Forgot Password flow, `aria-live` status, sanitized errors via `classifyAuthError`, auto-close on `authenticated=true`.

### 20.5 Phase 15.3 — Global `AccountBadge` (executed)
- `src/account/AccountBadge.tsx`: anonymous → Guest pill opening `AuthModal`; unconfigured → quiet "Guest · sync unavailable"; authenticated → avatar + label opening `ProfilePanel`. Mobile-first responsive (avatar-only under `sm`).

### 20.6 Phase 15.4 — `ProfilePanel` (executed)
- `src/account/ProfilePanel.tsx`: display name (≤ 50), accent color radiogroup, optional avatar upload gated on `hasAvatarStorage`. Save → `updateProfile`. Falls back to initials avatar when no bucket exists.

### 20.7 Phase 15.5 — Wiring (executed)
- `src/app/App.tsx` adds modal/profile state, renders `AccountBadge` in `Layout` navigation, renders `AuthModal` + `ProfilePanel` at layout root, re-derives `AuthState` after successful save.
- `src/account/Settings.tsx` adds Sign in / Manage profile buttons; existing `AuthPanel` preserved (no deletion). Duplicate-CTA bug fixed in `AuthPanel` via radiogroup + single primary CTA.
- `src/app/routes.ts` unchanged; profile is a dialog, not a route.

### 20.8 Phase 15.6 — Final Integration & Release Gate (executed)
- Lint, test (256/256), build, API typecheck, leak check all green.
- CodeQL run on changed lines; no true-positive alerts.
- CHANGELOG, PROGRESS.csv, PROGRESS-STEP-22.md, docs/supabase.md additive note all updated.

### 20.9 Phase 15 Exit Checklist
- Every spec requirement (§1, §3.1–§3.5, §4, §5) is implemented or explicitly documented as user-action-required.
- No duplicate primary CTAs in any sign-in/sign-up surface on any viewport.
- Global signed-in / Guest indicator present on every route.
- No raw Supabase error strings reach the UI; all flow through `classifyAuthError`.
- Forgot Password flow works end-to-end against a properly configured Supabase project.
- Profile persists via `auth.users.user_metadata`; optional avatar upload gated on Storage bucket and never breaks the experience when absent.
- Daily 5-letter lock, practice 2..35, Admin gating, `/api/admin-refresh`, and all Phase 13/14 invariants preserved.
- No file/test deletion; no service-role on client; no `@vercel/blob` in client bundle; no new env var names.
- `npm run lint`, `npm run test`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit` all pass.
- `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-22.md`, and `CHANGELOG.md` updated and free of sensitive data.
- Halt before any production release action.

---

## 21. Phase 16 — Mobile & Tablet Responsiveness Improvements (Keyboard, Grid, and Touch Scaling)

**Plan Version**: 1.6 (addendum). Bound by `CONSTITUTION.md` v3.1, `BRRRDLE-SPEC.md`, and the prior plan (Phases 0–15). Triggered by a user report that the game grid tiles, on-screen keyboard, and letter sizing do not scale properly on phones and tablets (especially iPads), breaking the app-like feel.

### 21.1 Scope, Source of Truth, and Operating Rules

- **Source of truth for this phase**: this Section 21 of `AGENT-IMPLEMENTATION-PLAN.md` plus the user request transcribed in §21.2. No new top-level spec document is required; design decisions are documented inline here.
- **Non-negotiable preserved invariants** (carried unchanged from Phases 0–15):
  - Daily `og`/`go` modes locked at 5 letters; practice mode supports lengths 2–35.
  - Admin tab gating via `session.user.app_metadata.role === "admin"` and the `/api/admin-refresh` server contract.
  - Word Explorer, Feedback Tab, Sound Effects, Sharing, definitions stack, stats, guest persistence, Pay-to-Continue economy, sync stub, danger-zone confirmations.
  - Auth flows: magic link, email + password, forgot password, `AuthModal`, `AccountBadge`, `ProfilePanel`, `classifyAuthError`, no raw Supabase error strings in UI.
  - No file deletion, no test removal/skip/weakening, no new env var names, no service-role on client, no `@vercel/blob` in client bundle.
  - All existing keyboard-input semantics (`useKeyboardInput`, `Keyboard.onInput` contract, `letterStates` coloring) remain byte-identical at the public API level.
- **Operating rules**:
  - Changes are CSS/Tailwind/markup-only inside existing components. No changes to game state, validation, persistence, networking, or auth.
  - Prefer Tailwind responsive utilities, CSS `clamp()`, dynamic viewport units (`dvh`/`svh`/`dvw`), and CSS container queries (`@container` / `cqi`) over JavaScript-measured sizing. Touch JS only when absolutely necessary (e.g., a `useResizeObserver` hook is **not** required for v1 of this phase).
  - No new runtime dependencies. Tailwind v4 already supports container queries and dynamic viewport units natively.
  - Visual changes must be additive: existing class strings may be extended, but no class that another component or test depends on may be removed without a documented replacement.

### 21.2 User Request (verbatim summary)

> The current UI (especially the game grid tiles, on-screen keyboard, and letter sizing) does not scale properly on mobile devices and tablets — particularly iPads. Tiles and keyboard keys become either too large or too small, breaking the app-like feel on smaller and larger touch screens.

### 21.3 Diagnosis of Current Scaling Issues

Findings are based on HEAD as of Plan Version 1.5:

1. **Grid tiles use fixed `min-h-*` with `aspect-square` and CSS Grid `minmax(0, 1fr)` columns** (`src/app/games/OgGame.tsx:80–95`, `src/app/games/GoGame.tsx:80–95`):
   - Classes `flex aspect-square min-h-8 ... sm:min-h-10 sm:text-base` only define a *floor* on tile size, never a ceiling.
   - Because the row is a `grid` with `repeat(N, minmax(0, 1fr))` inside the full-width `<main>` Panel, the tile width is `(panelWidth − gaps) / N`. On iPad portrait (~768 px viewport, panel ~720 px after padding), 5-letter daily rows produce tiles of ~135 px each — visually oversized relative to `text-base` (16 px) letters, breaking the app-like feel.
   - On 35-letter practice rows on a phone, columns shrink below the `min-h-8` (32 px) floor in the *width* dimension while `aspect-square` keeps height ≥ 32 px, producing non-square tiles and overflow risk.
   - Font sizing (`text-sm` / `sm:text-base`) is decoupled from tile size — letters stay tiny while tiles bloom on tablets, or letters look cramped on phones with long practice words.

2. **On-screen keyboard keys use fixed `min-h-11 ... sm:min-h-12` and `text-sm`** (`src/ui/Keyboard.tsx:38, 55, 57`):
   - The widest row is `qwertyuiop` (10 keys) plus `flex justify-center gap-1.5 sm:gap-2`. On a 320 px phone in portrait, 10 keys + 9 gaps + outer padding leave ~26 px per key — visually cramped and below the WCAG 24 px / Apple HIG 44 pt touch-target guidance once `px-2` padding is consumed.
   - On iPad portrait, the same row consumes only ~520 px of a 720 px panel, producing a centered floating bar that looks under-sized relative to the grid above.
   - The bottom row Enter/Del buttons use a smaller `text-xs` than the letter keys; on tablets this becomes visually inconsistent.

3. **Outer Layout shell does not adapt to mobile viewport realities** (`src/ui/Layout.tsx:14–32`):
   - `min-h-svh` is used (good), but inner padding `px-4 py-6 sm:px-6 lg:px-8` is symmetric and ignores iOS safe-area insets, so on notched devices the AccountBadge and grid edge under the status bar / home indicator in standalone PWA mode.
   - `index.html` viewport tag (`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`, `index.html:11`) lacks `viewport-fit=cover`, which is a precondition for `env(safe-area-inset-*)` to take effect.

4. **No use of CSS container queries**:
   - Tile and key sizes are driven by viewport breakpoints (`sm:`, `lg:`), not by the size of the panel/section they actually live in. The header Panel takes ~25 % of vertical space on phones, but the grid sizes itself off viewport width regardless of how much space the header consumes. On iPad split-view (e.g., 50 % width) the grid is treated as a phone because viewport width is small, even though container width is generous.

5. **No dynamic viewport height handling for mobile browser chrome**:
   - `min-h-svh` correctly accounts for the small viewport, but no element uses `dvh` (dynamic viewport height) for the playable area, so when the URL bar collapses there is a visible gap below the keyboard in Safari iOS.

### 21.4 Proposed Solution (clean, minimal, non-breaking)

The fix is delivered as a single new phase with five small steps. All changes are additive Tailwind class extensions and CSS variable definitions; no component contracts change.

**Design principles**:
- Use **CSS `clamp()`** to define a tile and key size with explicit floor, fluid middle (driven by container-query inline units `cqi` where supported, viewport units `vw` otherwise), and ceiling.
- Use **CSS container queries** on the grid section and keyboard section so sizing follows the actual panel width, not the raw viewport.
- Use **dynamic viewport units** (`dvh`, `svh`) on the app shell and `safe-area-inset-*` padding for iOS standalone PWA polish.
- Use **explicit Tailwind breakpoints** (`sm` 640, `md` 768, `lg` 1024, `xl` 1280) for coarse adjustments, with `clamp()`/container queries doing the fluid work in between.
- Tie **letter font-size to tile size** (and key font-size to key size) via `cqi` or `em` so glyphs grow and shrink together with their container.

**Step 21.4.1 — Establish design tokens for tile and key sizing**

- Add CSS variables in `src/index.css` (or a small `src/styles/responsive.css` imported from `src/index.css`):
  - `--brrrdle-tile-min`, `--brrrdle-tile-ideal`, `--brrrdle-tile-max` (e.g., `2rem`, `clamp(2rem, 8cqi, 4.25rem)`, `4.25rem`).
  - `--brrrdle-key-min`, `--brrrdle-key-ideal`, `--brrrdle-key-max` (e.g., `2.25rem`, `clamp(2.25rem, 9cqi, 3.75rem)`, `3.75rem`).
  - `--brrrdle-tile-font` and `--brrrdle-key-font` expressed as `cqi`/`em` of the tile/key.
- Defaults must reproduce current desktop appearance at ≥ `lg` viewports so no regression occurs on existing screens.

**Step 21.4.2 — Make the grid section a CSS container and apply container-query sizing**

- In `src/app/games/OgGame.tsx` and `src/app/games/GoGame.tsx`, wrap the existing `<div role="grid">` (or its parent) with a Tailwind container-query parent (`@container` / `class="@container"` via the Tailwind v4 built-in `container-type: inline-size` utility).
- Replace the tile className:
  - From: `flex aspect-square min-h-8 ... sm:min-h-10 sm:text-base`
  - To (semantically): `flex aspect-square items-center justify-center rounded-xl border shadow-inner shadow-slate-950/20 font-black uppercase` plus inline `style={{ fontSize: 'clamp(0.875rem, 6cqi, 1.5rem)' }}` (or a Tailwind arbitrary value).
- Cap the entire row's max width with `style={{ maxWidth: 'min(100%, calc(var(--brrrdle-tile-max) * N + gap * (N-1)))' }}` so 5-letter daily rows on iPads stop ballooning past ~340 px while 35-letter practice rows still occupy full width on phones.
- Center the row with `mx-auto` so capped rows remain visually balanced.

**Step 21.4.3 — Responsive on-screen keyboard**

- In `src/ui/Keyboard.tsx`, wrap the `<section>` with `@container` and key sizing driven by `cqi`:
  - Replace `min-h-11 ... sm:min-h-12` with `min-h-[2.25rem] @md:min-h-[2.75rem] @lg:min-h-[3.25rem]` plus inline `style={{ fontSize: 'clamp(0.75rem, 4.25cqi, 1.05rem)', minWidth: 'clamp(1.75rem, 8.5cqi, 2.75rem)' }}`.
  - Set Enter/Del to `style={{ minWidth: 'clamp(2.5rem, 12cqi, 4.25rem)' }}` and use `text-[clamp(0.625rem,3.5cqi,0.95rem)]` so they scale with letter keys instead of staying at a fixed `text-xs`.
- Preserve the 44 px Apple HIG touch-target floor by clamping `min-h` ≥ `2.25rem` (36 px logical; ≥ 44 px once tapped area + padding considered) and adding `touch-action: manipulation` to prevent iOS double-tap zoom on rapid letter entry.
- On `@sm`-and-narrower containers, reduce gap from `gap-1.5` to `gap-1` and reduce horizontal padding so 10 keys always fit one row at ≥ 320 px viewport.

**Step 21.4.4 — App-shell and viewport polish**

- Update `index.html:11` viewport tag to `<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />`.
- In `src/ui/Layout.tsx`:
  - Add safe-area padding: `pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]` and equivalent left/right for landscape on notched devices.
  - Switch the shell to `min-h-dvh` (with `min-h-svh` retained as fallback for older Safari via the existing `min-h-svh` class — Tailwind v4 emits the `dvh` variant cleanly).
  - On `@md`-and-up containers, consider a two-column layout where the keyboard sits to the side on landscape tablets/desktops (optional polish; only if it keeps the app-like feel — see §21.4.5).

**Step 21.4.5 — Tasteful creative polish (optional within this phase)**

- Sticky keyboard on phone portrait: on `< @md` containers, keyboard becomes `sticky bottom-0` with a subtle backdrop-blur, ensuring it never scrolls out of reach during practice with long words and a tall grid.
- Subtle haptic-style press animation (`active:scale-95 transition-transform`) on keyboard buttons for mobile app-feel. Respect `motion-reduce` users (`motion-safe:` prefix).
- Grid row "shake" and tile "reveal" animations already exist and remain unchanged.
- iPad portrait: introduce a comfortable `max-w-md` cap on the keyboard so it visually mirrors the capped 5-letter daily grid above instead of stretching to the full panel.

### 21.5 Phase 16 — Sub-Phase Plan

| Sub-phase | Title | Files Touched (planned) | Verification |
|-----------|-------|-------------------------|--------------|
| 16.0 | Pre-flight & responsive baseline capture | none (read-only) | Re-confirm 256/256 tests pass; capture before-screenshots at iPhone SE (375×667), iPhone 14 Pro (393×852), iPad mini portrait (744×1133), iPad Pro 11" portrait (834×1194), iPad Pro 11" landscape (1194×834), and desktop (1440×900) — used only as agent notes, not committed |
| 16.1 | Design tokens & viewport polish | `index.html`, `src/index.css` (+/- a new `src/styles/responsive.css`), `src/ui/Layout.tsx` | `npm run lint`, `npm run build`, visual sanity check |
| 16.2 | Responsive grid tiles | `src/app/games/OgGame.tsx`, `src/app/games/GoGame.tsx` | `npm run test` (existing grid tests must remain green), `npm run build` |
| 16.3 | Responsive on-screen keyboard | `src/ui/Keyboard.tsx` | `npm run test` (keyboard tests remain green), `npm run build` |
| 16.4 | Optional polish (sticky keyboard, press animation, iPad keyboard cap) | `src/ui/Keyboard.tsx`, `src/app/games/OgGame.tsx`, `src/app/games/GoGame.tsx` (markup only) | `npm run test`, `npm run build` |
| 16.5 | Final integration, cross-feature verification, and release gate | docs/changelog/progress only | full pipeline (see §21.6) |

Each sub-phase ends with a `progress/PROGRESS-STEP-N.md` and a `progress/PROGRESS.csv` row appended for the corresponding `phase_id` (next available IDs after Phase 15's last). The agent halts at every sub-phase gate per CONSTITUTION.md §1.3 unless the user explicitly authorizes contiguous execution.

### 21.6 Verification & Release Gate (Phase 16.5)

Required to pass before declaring Phase 16 complete:

1. `npm run lint` — clean.
2. `npm run test` — all existing tests (currently 256) pass with zero new failures. Add at least one new render test per modified component asserting the presence of the new responsive class tokens (no new `data-testid`s introduced gratuitously).
3. `npm run build` — clean; no new bundle-size regressions beyond a small CSS delta.
4. `npx tsc -p tsconfig.api.json --noEmit` — clean.
5. Client-bundle leak check: `grep -R "@vercel/blob" dist/` returns no matches (Phase 13 invariant).
6. Manual visual verification at the six viewports listed in §21.5 Phase 16.0. Grid tiles must:
   - Remain visually square at every breakpoint.
   - Cap at ~`4.25rem` per side on 5-letter daily rows on iPad portrait and wider.
   - Scale font-size with tile size so the letter always fills ~55–65 % of the tile height.
7. Keyboard must:
   - Fit 10 keys + gaps within a 320 px viewport without horizontal scroll.
   - Show ≥ 44 px effective touch targets on phones.
   - Not exceed `max-w-md`-equivalent on iPad portrait so it visually mirrors the capped grid.
8. CodeQL run on changed lines after Phase 16.4; any true-positive alerts must be fixed before Phase 16.5 closes.

### 21.7 Preserved Invariants (Phase 16-specific re-statement)

- Daily 5-letter lock and practice 2..35 — unchanged; grid still uses `repeat(${session.wordLength}, minmax(0, 1fr))`.
- Admin tab — purely a navigation/visibility concern; not touched.
- Word Explorer, Feedback, Sound Effects, Auth flows (`AuthModal`, `AccountBadge`, `ProfilePanel`, `classifyAuthError`, magic-link + password coexistence) — markup may receive responsive class additions only; component contracts unchanged.
- Pay-to-Continue economy, sharing, definitions, stats, guest persistence, sync stub — untouched.
- No file deletion, no test removal/skip/weakening.
- No new env vars, no service-role on client, no `@vercel/blob` in client bundle.
- No new runtime dependency.

### 21.8 Progress Tracking and CHANGELOG

- Append rows to `progress/PROGRESS.csv` for each of Phases 16.0 through 16.5, using the next contiguous `phase_id` values after the highest currently recorded ID. Titles follow the pattern `"Phase 16.x — <Sub-phase title>"`.
- Create `progress/PROGRESS-STEP-N.md` from `progress/PROGRESS-TEMPLATE.md` for each sub-phase, summarising what changed, verification results, blockers, and explicit go/no-go for the next sub-phase.
- Add `[Unreleased] — Changed` and `[Unreleased] — Added` entries to `CHANGELOG.md` for: responsive design tokens, container-query-driven grid sizing, responsive on-screen keyboard, iOS safe-area / viewport-fit polish, and any optional polish actually shipped.

### 21.9 Phase 16 Exit Checklist

- All §21.3 diagnoses are demonstrably resolved on the six reference viewports.
- All §21.7 invariants verified intact.
- All Phase 16.6 verification items (§21.6) green.
- `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, and `CHANGELOG.md` updated and free of sensitive data.
- Halt for explicit user approval before any production release action.

---

## 22. Phase 17 — Use Local brrrdle Word List JSONs from `src/latest/` (Addendum, LOCAL-WORD-LISTS-SPEC-2026-05-28)

**Plan Version**: 1.7 (addendum). Bound by `CONSTITUTION.md` v3.1, `BRRRDLE-SPEC.md`, the prior plan (Phases 0–16), and `LOCAL-WORD-LISTS-SPEC-2026-05-28.md` (the source of truth for this phase). Triggered by the user manually placing the latest 34 authoritative per-length JSON dictionaries inside the repository and reporting that the runtime Hugging Face fetch is failing and producing "word not in list" errors and incomplete practice lengths.

> Status: **No code changes yet.** This addendum exists for user review. Implementation is gated on explicit user approval (see §22.10).

### 22.1 Scope, Source of Truth, and Operating Rules

- **Source of truth for this phase**: `LOCAL-WORD-LISTS-SPEC-2026-05-28.md` and this Section 22. If the spec and prior phases conflict, the spec wins for the narrow concerns of (a) where the word data is read from and (b) deprecation of the runtime Hugging Face path for normal gameplay. All other invariants from Phases 0–16 are preserved.
- **Authoritative on-disk path discrepancy (must reconcile during 17.1)**:
  - The spec text refers to `src/latest/brrrdle/`.
  - The repository as committed places the 34 files directly at `src/latest/` (verified at HEAD: `src/latest/words_length_2.json` … `src/latest/words_length_35.json`, plus `manifest.json`, `README.md`, and transitional `brrrdle_words.json` / `brrrdle_words.txt` length-5 compatibility files).
  - Treat the actual on-disk location (`src/latest/`) as authoritative for code. Mention the spec's `src/latest/brrrdle/` wording in `CHANGELOG.md` and Phase 17 progress notes so the discrepancy is auditable. If the user prefers, a one-time `git mv` to `src/latest/brrrdle/` may be performed during Sub-phase 17.1 as a pure rename; the loader path constant is the single point that decides which layout is in effect.
- **Non-negotiable preserved invariants** (carried unchanged from Phases 0–16):
  - Daily `og`/`go` locked at 5 letters; practice 2–35.
  - Admin tab + `/api/admin-refresh` server contract intact; the refresh endpoint and Phase 14 admin authorization remain in place as an optional override only.
  - Word Explorer, Feedback tab, Sound Effects, Sharing, Pay-to-Continue economy, Auth flows, stats, definitions stack, mobile/tablet responsiveness — all untouched.
  - Public APIs of the data layer remain byte-identical at the signature level: `loadBundledWordList`, `getWordRepository`, `getRequestedWordLength`, `getAnswerCandidates`, `getValidGuesses`, `getDefinitionsForWord`, `validateGuess`, and barrel exports in `src/data/index.ts`.
  - `NormalizedWordList`, `WordEntry`, `WordDefinitionEntry`, `WordListFile`, `WordListMetadata`, and `RemoteWordListMetadata` types remain backward-compatible. Any change is additive (optional fields only).
  - No file deletion. No removal/skip/weakening of existing tests. No new env vars. No service-role on client. No `@vercel/blob` in client bundle. No new runtime dependency. No change to `MIN_PRACTICE_WORD_LENGTH=2` / `MAX_PRACTICE_WORD_LENGTH=35` / `DAILY_WORD_LENGTH=5`.
- **Operating rules**:
  - Strictly minimal, non-breaking changes.
  - The runtime Hugging Face fetch is **deprecated, not deleted**. `src/data/huggingFaceSource.ts`, `src/data/refresh.ts`, `src/data/refreshStore.ts`, `src/data/updateCheck.ts`, and `api/admin-refresh.ts` continue to compile, pass existing tests, and remain reachable from the protected admin route. Only the **default loading path used by gameplay** moves to local JSON.
  - Use static `import` of the 34 local JSON files via Vite's JSON loader (mirroring the existing pattern in `src/data/wordLists.ts`). No new dependency is required.
  - All data-layer error reasons and result shapes (`unsupported-length`, `daily-length-locked`, `missing-bundled-list`, `invalid-bundled-list`) remain unchanged. A new failure surface is permitted only if additive (e.g., `'invalid-local-list'`) and only if absolutely required — preferred is to reuse `'invalid-bundled-list'` so consumers don't have to change.

### 22.2 Diagnosis of the Current Remote-Fetch Problem

Findings against HEAD (Plan Version 1.6):

1. **The bundled snapshot under `src/data/bundled/` is the 2026-05-26 development seed, not the real 2026-05-28 dataset.**
   - `src/data/bundled/source.json` self-identifies as `version: bundle-2026-05-26` with `lengths: [2, 5, 35]` and the note "Bundled development seed. The first successful scheduled or admin refresh … will replace this snapshot".
   - The seed is sparse for many lengths (e.g., length 5 `answers` includes the curated `{ word: "crane", definitions: […] }` object followed by a handful of plain strings), so practice modes for lengths outside 2/5/35 fall back to thin lists and reject common words as "not in list".
2. **The runtime path that was supposed to upgrade the seed is the Hugging Face refresh** (`src/data/huggingFaceSource.ts` + `src/data/refresh.ts`, swapped in by `refreshStore.ts` and triggered by the daily Vercel Cron and `/api/admin-refresh`). The user reports this is failing in the current environment, leaving gameplay on the seed permanently.
3. **The user has now committed the real authoritative data into the repo at `src/latest/`** (34 files, lengths 2–35, generated at `2026-05-28T01:39:10.899912+00:00`, schema version `2.0`, per-length counts ranging from 134 at length 2 to 47,763 at length 9). Per-length `answers` is a curated array of plain strings produced by `stratified_quality_score_v1`; `validGuesses` is the full per-length list.
4. **Schema gap**: the new files do **not** match the current `WordListMetadata` schema validator:
   - `metadata` contains only a `curation` block (no `length`, `source`, `version`, `generatedAt` strings).
   - `answers` is `string[]` (no inline `definitions`). The existing `validateWordEntry` already accepts strings, so this half is compatible.
   - `validGuesses` is `string[]` — already compatible.
   - Without an adjustment to `validateWordListFile` (or a new local-list adapter), every local file would be rejected with `invalid-bundled-list` and four "metadata required" issues.
5. **Definitions consequence**: the new per-length files do not carry inline `definitions`. The post-game Definitions System (Phase 6) already falls back through Dictionary API → Wiktionary → Google search, so eliminating inline definitions for the curated subset is acceptable — but the addendum must explicitly confirm this and the verification matrix must re-cover §6.

### 22.3 Proposed Solution (minimal, non-breaking)

The fix is delivered as **one logical change**: add a thin "local source" path that statically imports the 34 JSONs from `src/latest/` and feeds them into the existing normalization pipeline, then make `BUNDLED_WORD_LISTS` resolve from the local source by default. Everything downstream is unchanged.

**Design choices**:

- **Single new file, single edit point**: introduce `src/data/localWordLists.ts` containing 34 static JSON imports (mirroring `src/data/wordLists.ts`) plus a `LOCAL_WORD_LISTS` record. This keeps the diff cohesive and reviewable. `src/data/wordLists.ts` becomes a thin re-export of `LOCAL_WORD_LISTS` aliased as `BUNDLED_WORD_LISTS`, preserving the existing import name used by `loadBundledWordList`.
- **Adapter, not schema rewrite**: add a `normalizeLocalWordListFile(raw, length): WordListFile` adapter that:
  - Synthesizes the legacy `WordListMetadata` block from the manifest + per-length file (e.g., `length: N`, `source: 'src/latest (english-openlist-brrrdle 2026-05-28)'`, `version: '<release_date from manifest.json>'`, `generatedAt: '<generated_at from manifest.json>'`).
  - Passes the raw `metadata.curation` block through on an additive, optional `curation?` field added to `WordListMetadata` (additive only — existing consumers ignore unknown fields).
  - Leaves `answers` and `validGuesses` as-is (strings), letting the existing `validateWordListFile` continue to do the heavy validation.
- **No change to `loadBundledWordList`'s public surface**: it still calls `validateWordListFile(bundled)` and returns `LoadWordListResult`. The adapter runs **before** `validateWordListFile`, so any malformed local file is still caught by the canonical schema validator and surfaces as `invalid-bundled-list`.
- **Curated answers subset (BRRRDLE-ANSWERS-CURATION-SPEC) is preserved automatically**: the local files already encode the curated subset in `answers` — the loader does not need to re-curate.
- **Definitions**: `definitionsByWord` becomes an empty Map for the local-source path. The Definitions System already handles "no inline definition" gracefully via the Dictionary API → Wiktionary → Google fallback chain. No UI change.
- **Daily-mode performance**: static imports of all 34 files are no slower than the existing `src/data/bundled/` pattern. To safeguard daily mode bundle size, length 5 must remain in the initial JS chunk; the other 33 may be code-split via `import('…').then(…)` **only if** the bundle-size delta from static imports is judged unacceptable in 17.4 verification. Default plan: keep static imports (matches current Phase 2 pattern). Code-split is a fall-back lever, not a baseline change.
- **`src/data/bundled/` is kept on disk** (no deletion, per invariant) and updates its `source.json` to record that it is now a historical seed superseded by `src/latest/`. The seed JSONs remain valid emergency fallbacks; the loader does not consult them by default.
- **Hugging Face path stays compiled and tested** but is no longer the gameplay default. `refreshStore`'s in-memory swap can still be triggered by the admin route; gameplay reads the local source first and the refresh store only when the admin route has explicitly swapped a length in-session. Final wiring detail to be confirmed during 17.2.

### 22.4 Phase 17 — Sub-Phase Plan

| Sub-phase | Title | Files Touched (planned) | Verification |
|-----------|-------|-------------------------|--------------|
| 17.0 | Pre-flight, baseline capture, reconciliation note | none (read-only) | Re-confirm `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit` all green at HEAD. Confirm 34 files present at `src/latest/`. Decide and document whether to keep `src/latest/` or `git mv` to `src/latest/brrrdle/` to match the spec wording. |
| 17.1 | Add local source loader & metadata adapter | **New**: `src/data/localWordLists.ts`, `src/data/localWordLists.test.ts`. **Edit (additive only)**: `src/data/types.ts` (add optional `curation?` to `WordListMetadata`), `src/data/wordListSchema.ts` (accept synthesized metadata, no removal of existing checks). | New unit tests covering: lengths 2, 5, 12, 20, 35 load; metadata is synthesized correctly; answers/validGuesses pass canonical schema; malformed local file is still rejected with `invalid-bundled-list`. |
| 17.2 | Re-point `BUNDLED_WORD_LISTS` to local source | **Edit**: `src/data/wordLists.ts` (re-export `LOCAL_WORD_LISTS` as `BUNDLED_WORD_LISTS`; keep `BUNDLED_WORD_LIST_LENGTHS` array). **Update**: `src/data/bundled/source.json` to mark itself as historical seed. **No change**: `src/data/loadWordList.ts`, `src/data/wordRepository.ts`. | `src/data/loadWordList.test.ts`, `src/data/wordRepository.test.ts`, `src/data/practiceLengthCoverage.test.ts` all green unchanged. Existing daily-length-locked tests unchanged. |
| 17.3 | Deprecate runtime HF fetch as default; keep it as optional admin override | **Edit (annotation/JSDoc only, no logic change)**: `src/data/huggingFaceSource.ts`, `src/data/refresh.ts`, `src/data/refreshStore.ts`, `src/data/updateCheck.ts`, `api/admin-refresh.ts`. | Existing HF-related tests (`huggingFaceSource.test.ts`, `refresh.test.ts`, `refreshStore.test.ts`, `updateCheck.test.ts`) remain green. Admin-route auth tests remain green. |
| 17.4 | Full verification & bundle-leak check | docs/changelog/progress only | Full §22.5 pipeline. |
| 17.5 | Progress tracking, CHANGELOG, halt for user approval | `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-N.md` (next contiguous IDs after Phase 16's last), `CHANGELOG.md` | Manual review of progress and changelog updates. |

Each sub-phase ends with a `progress/PROGRESS-STEP-N.md` and a `progress/PROGRESS.csv` row appended for the corresponding `phase_id`. The agent halts at every sub-phase gate per CONSTITUTION.md §4 unless the user explicitly authorizes contiguous execution.

### 22.5 Verification & Release Gate (Phase 17.4)

Required to pass before declaring Phase 17 complete:

1. `npm run lint` — clean.
2. `npm run test` — all existing tests pass with zero new failures. New tests added in 17.1 must:
   - Assert that lengths 2, 5, 12, 20, and 35 load real local content (answer count and valid-guess count match `src/latest/manifest.json` per-length counts to within an exact equality for `validGuesses` and exact equality for the curated `answers` subset shipped in each file).
   - Assert daily mode loads length 5 and rejects non-5 lengths.
   - Assert practice mode rejects length 1 and length 36.
   - Assert that one carefully chosen ordinary English word per representative length (a word previously reported as "not in list") now validates as a guess.
   - Assert that a deliberately malformed mock local JSON is rejected via the canonical schema, producing `reason: 'invalid-bundled-list'` (or the alias chosen in 17.1).
3. `npm run build` — clean. Bundle-size delta over HEAD recorded in `progress/PROGRESS-STEP-N.md`. If the production JS bundle grows by more than +20% over current HEAD, fall back to the code-split plan described in §22.3.
4. `npx tsc -p tsconfig.api.json --noEmit` — clean.
5. Client-bundle leak checks (Phase 13/16 invariants), all run against `dist/`:
   - `grep -R "@vercel/blob" dist/` — no matches.
   - `grep -R "huggingface.co" dist/` — matches **only** inside dead-code-eliminated branches or admin-only modules; gameplay chunks must not contain any HF URL. If any gameplay chunk still references HF, treat it as a bug for 17.3 to fix by lazy-import.
   - No service-role keys, no Supabase admin secrets in `dist/`.
6. Definitions System manual smoke (Phase 6 invariant): post-game definition flow still works because the Dictionary API → Wiktionary → Google fallback chain handles the now-empty inline definitions cleanly; the Google search button remains always available.
7. Admin tab manual smoke (Phase 14 invariant): `/api/admin-refresh` still authenticates, still authorizes, still returns the same response shape. If a successful refresh is triggered, the new dataset is merged into `refreshStore` and gameplay reflects it without a reload — i.e., the local source acts as the default and the admin refresh acts as an opt-in override.
8. Auth flows, Word Explorer, Feedback, Sound Effects, Pay-to-Continue, sharing, and Phase 16 responsive UI: spot-checked unchanged.
9. CodeQL: run on changed lines after 17.3; any true-positive alerts must be fixed before 17.4 closes.

### 22.6 Preserved Invariants (Phase 17-specific re-statement)

- Daily 5-letter lock and practice 2..35 — unchanged.
- Hard Mode constraints — unchanged.
- Curated `answers` subset (BRRRDLE-ANSWERS-CURATION-SPEC) — preserved by reading the curated arrays already produced by `stratified_quality_score_v1` in each local file.
- Admin tab + `/api/admin-refresh` — preserved as an optional override.
- Word Explorer, Feedback, Sound Effects, Auth (`AuthModal`, `AccountBadge`, `ProfilePanel`, `classifyAuthError`, magic-link + password coexistence), Pay-to-Continue, sharing, definitions, stats, guest persistence, sync stub — untouched.
- Mobile/tablet responsiveness (Phase 16) — untouched.
- No file deletion. No test removal/skip/weakening. No new env vars, no service-role on client, no `@vercel/blob` in client bundle. No new runtime dependency.
- `src/data/index.ts` barrel export surface is preserved; any new exports (`LOCAL_WORD_LISTS`, `localWordListsManifest`) are additive.

### 22.7 Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Bundle-size regression from statically importing 34 large files in the main chunk. | Measure `dist/` size delta in 17.4; if > +20%, code-split lengths ≠ 5 via dynamic `import()` (loader becomes async for non-daily lengths; daily stays sync). |
| Path mismatch between spec (`src/latest/brrrdle/`) and repo (`src/latest/`). | Single loader-path constant in `localWordLists.ts`; either keep `src/latest/` and document, or `git mv` to `src/latest/brrrdle/` in 17.1 as a pure rename. |
| Existing schema validator rejects new metadata shape. | Synthesize legacy `WordListMetadata` from `src/latest/manifest.json` and per-length file in the adapter; do not weaken the validator. |
| Loss of inline definitions for curated answers (the local files don't carry them). | Existing Definitions System fallback chain (Phase 6) handles this — Dictionary API → Wiktionary → Google. Verification 22.5 §6 re-confirms. |
| Admin refresh path silently rots because gameplay no longer touches it. | Keep all existing HF tests green; Phase 17.3 only adds JSDoc deprecation notes; the cron route and `/api/admin-refresh` continue to compile and run. |
| Stale `src/data/bundled/` confuses future contributors. | Update `src/data/bundled/source.json.note` in 17.2 to explicitly state "Historical seed. Do not load at runtime. Superseded by `src/latest/` per LOCAL-WORD-LISTS-SPEC-2026-05-28." |
| Transitional length-5 compatibility files (`brrrdle_words.json`, `brrrdle_words.txt`) in `src/latest/` cause confusion. | Loader uses `words_length_N.json` filenames only; compatibility files are ignored. Documented in 17.1 progress notes. |

### 22.8 Out of Scope for Phase 17

- Changing the curated-answers algorithm.
- Adding inline definitions to the local per-length files.
- Removing or rewriting the Hugging Face fetch, refresh store, or admin refresh contract.
- Changing daily-mode length, practice-mode bounds, or any UI.
- Any documentation rewrite beyond the changelog entry and the seed `source.json` historical note.

### 22.9 Progress Tracking and CHANGELOG

- Append rows to `progress/PROGRESS.csv` for each of Phases 17.0 through 17.5, using the next contiguous `phase_id` values after the highest currently recorded ID. Titles follow the pattern `"Phase 17.x — <Sub-phase title>"`.
- Create `progress/PROGRESS-STEP-N.md` from `progress/PROGRESS-TEMPLATE.md` for each sub-phase, summarising what changed, verification results, blockers, and explicit go/no-go for the next sub-phase.
- Add `[Unreleased] — Changed` and `[Unreleased] — Deprecated` entries to `CHANGELOG.md` for: local-first word-list loading, deprecation of the runtime HF fetch as the default gameplay path, and the seed-snapshot historical-note update.

### 22.10 Phase 17 Exit Checklist

- All §22.2 diagnoses are demonstrably resolved (daily and practice 2–35 load real local content, previously rejected ordinary words now validate).
- All §22.6 invariants verified intact.
- All §22.5 verification items green.
- `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, and `CHANGELOG.md` updated and free of sensitive data.
- Halt for explicit user approval before any production release action.

---

## 23. Phase 18 — Word List Difficulty Tiers + Word Explorer / Go / Settings Improvements (Addendum, PHASE-18-WORD-DIFFICULTY-AND-GO-IMPROVEMENTS-SPEC-2026-05-28)

**Plan Version**: 1.8 (addendum). Bound by `CONSTITUTION.md` v3.1, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, the prior plan (Phases 0–17), and `PHASE-18-WORD-DIFFICULTY-AND-GO-IMPROVEMENTS-SPEC-2026-05-28.md` (the source of truth for this phase). Triggered by the user's Phase 18 spec requesting selectable answer-difficulty tiers, Word Explorer / Go-mode / Settings polish, and a critical daily Og↔Go overlap fix.

> Status: **No game code changes yet.** This addendum exists for user review. The only changes made during the drafting of this addendum are the §23.2 (Phase 18.0) governance/repo cleanup items that the user explicitly authorized for the planning stage (model-agnostic edits + a root `README.md` upgrade + documentation). All gameplay/feature implementation (18.1 onward) is gated on explicit user approval (see §23.13). On 2026-05-30 (plan v1.9), the user provided definitive answers to all five §23.11 open questions; those answers are now integrated below as resolved decisions, and the §23.11 section records them.

### 23.1 Scope, Source of Truth, and Operating Rules

- **Source of truth for this phase**: `PHASE-18-WORD-DIFFICULTY-AND-GO-IMPROVEMENTS-SPEC-2026-05-28.md` and this Section 23. If the spec and prior phases conflict, the spec wins for the narrow concerns it covers (answer-difficulty tiers, the Customize quick menu, Settings reorganization, Word Explorer difficulty column + per-row Define, Go-mode per-puzzle definitions and practice-only reveal, and the daily Og↔Go overlap fix). All other invariants from Phases 0–17 are preserved.
- **Constitutional fit / scope check**: `CONSTITUTION.md` §3.3 lists "Themes or sound effects" and "Additional game modes" as out of scope without approval, but sound effects and the Word Explorer/Feedback tabs were already explicitly approved and shipped via the `ADDITIONS-2026-05-27.md` addendum (Phase 13). Phase 18 adds **no new game mode** and **no new monetization mechanic** — answer-difficulty tiers refine the existing answer-selection within the already-approved data layer, and the practice-only "Give Up / Reveal Answer" reuses the existing coin/streak economy. This addendum treats the user's Phase 18 spec as the explicit approval required by §3.3/§2 for these specific additions, and records that interpretation here for auditability. **Resolved (user answer #4, 2026-05-30): the user confirmed the Phase 18 spec serves as the §3.3/§2 scope approval for the difficulty tiers and the practice-only reveal.**
- **Non-negotiable preserved invariants** (carried unchanged from Phases 0–17):
  - Daily `og`/`go` locked at 5 letters; practice 2–35. Difficulty tiers do **not** introduce variable daily lengths.
  - `getTileStates`/`getGuessResult` remains the single source of truth for coloring (CONSTITUTION §7.1). Difficulty tiers touch **answer selection only**, never tile logic or Hard Mode.
  - **Valid Guesses are identical across all three tiers** (spec §1): tiers subset the **answers** pool only; `validGuesses` is always the full per-length list. This is the central correctness rule for the whole phase.
  - Admin tab + `/api/admin-refresh` server contract intact; local-source loader from Phase 17 remains the gameplay default.
  - Public sync-API data-layer signatures from Phase 17 remain backward-compatible; any new parameter (e.g., a `difficulty` selector) is **additive with a default that reproduces today's behavior** (default tier = **Expert** = current full curated list, per spec §1).
  - No file deletion. No removal/skip/weakening of existing tests. No service-role on client. No `@vercel/blob` in client bundle. No new runtime dependency unless justified by approved scope and cleared against advisories (CONSTITUTION §14).
- **Operating rules**: strictly minimal, cohesive, reviewable changes; re-read the relevant plan section before each sub-phase; halt at each sub-phase gate per CONSTITUTION §4 unless the user authorizes contiguous execution; update `progress/PROGRESS.csv`, the relevant `progress/PROGRESS-STEP-N.md`, and `CHANGELOG.md` at every sub-phase; run `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and the client-bundle leak checks before declaring any sub-phase complete; run CodeQL on changed lines.

### 23.2 Phase 18.0 — Governance & Repository Cleanup (Model-Agnostic) — performed in the planning stage

This sub-step is the only part of Phase 18 executed during plan drafting, per the user's explicit instruction to perform the allowed constitution/repo cleanup now while deferring all game code changes.

**What was reviewed and changed now (planning stage):**

1. **`BRRRDLE-OVERVIEW.md` made model-agnostic.** The three GPT-5.5 references were rewritten so the plan no longer assumes a specific model:
   - Title: "Autonomous GPT-5.5 Copilot Agent Build" → "Autonomous Copilot Agent Build".
   - Core Approach line: "GitHub Copilot agent (GPT-5.5) sessions" → "a GitHub Copilot coding agent (model-agnostic — any sufficiently capable model, e.g. Claude Opus 4.8)".
   - Goal line: "the autonomous GPT-5.5 Copilot workflow" → "the autonomous Copilot agent workflow (model-agnostic)".
   - A repo-wide grep (`GPT-5`, `GPT 5`, `gpt-5`, `GPT5`) afterward returns **zero** matches across `*.md`, `*.ts`, `*.tsx`, `*.json`, `*.html`. No rules, scope, or success criteria were removed — only the model attribution changed.
2. **`CONSTITUTION.md` reviewed in the planning stage; the approved phase-range amendment is applied in Prompt 2 (not in the planning stage).** The constitution names **no** model anywhere, so no model-agnostic edit is required — it is already model-neutral and suitable for Claude Opus 4.8 or any capable model. Two staleness observations were recorded for the user during planning (the agent does **not** self-edit the binding constitution outside an explicitly approved amendment, per CONSTITUTION §17):
   - §1/§5/§5.2 said the plan "defines Phases 0 through 11," which predates the approved Phase 12–18 addenda. **Resolved (user answer #3) and APPLIED in Prompt 2 (2026-05-30):** generalized to "Phases 0–11 plus all subsequently approved addenda (Phases 12+)" in `CONSTITUTION.md` §1, §5, and §5.2 (with a new §5.2 addenda note), plus a §4 review-gate clarification, a §17 amendment record, and a version bump v3.1 → **v3.2**. No rule was removed or weakened.
   - §4 / §5.2's enumerated phase list could optionally cite the addendum sections (§§16–23). Applied in Prompt 2 as a §5.2 note pointing at the plan's addendum sections; the §4 gate was also clarified to cover "any constitution upgrade or amendment" and "every later phase … (including all subsequently approved addenda, Phases 12+)."
3. **Light repository organization — evaluated, conservative action taken.** The repository root holds many dated governance/spec/report files (`ADDITIONS-2026-05-27.md`, `AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md`, `LOCAL-WORD-LISTS-SPEC-2026-05-28.md`, `DIAGNOSIS-REPORT-*.md`, `VERCEL-*-LOGS-*.md`, `PHASE-18-…-SPEC-2026-05-28.md`). A cross-reference scan shows **nearly all are referenced by bare filename** from `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, multiple `progress/PROGRESS-STEP-N.md`, and even a source test (`src/wordExplorer/wordExplorerData.test.ts` references `ADDITIONS-2026-05-27.md`). Physically moving them now would silently break those governance references. **Resolved (user answer #5):** the user elected to **keep the current root layout for now** and defer any reorganization to a later optional cleanup phase. Per that decision and the "do not delete or edit game scripts" / minimal-change mandate, **no files were moved.**
4. **Root `README.md` upgraded (planning stage).** Per the user's explicit Phase 18.0 instruction, the root `README.md` was rewritten into a professional, comprehensive, visually appealing project README. It adds: a project tagline + badge row, a features overview (modes, difficulty tiers preview, progression/economy, accounts/sync, definitions, sharing, PWA, Word Explorer/Feedback/sound), a "Why brrrdle" section, a quick-start, a full tech-stack table, available-scripts table, environment-variable guidance (public-only, no secrets), Supabase/admin setup, deployment targets, an updated repository-structure tree (now including `src/latest/`), a governance/authoritative-sources section, a contributing guide reflecting the phase-gated workflow, and accessibility/security notes. **No facts were invented:** scripts, env vars, structure, and behavior were taken from `package.json`, `.env.example`, the on-disk tree, and existing docs. This is a documentation-only change.
5. **`BRRRDLE-SPEC.md` reviewed; left unchanged.** It names no model and required no model-agnostic edit.

**Documentation of the cleanup** lives in `CHANGELOG.md` (Unreleased → Phase 18.0 entry) and `progress/PROGRESS-STEP-35.md`, with a `progress/PROGRESS.csv` row at `phase_id = 35`.

**Verification for 18.0**: documentation-only changes (no source, no tooling). `git diff --check` clean; repo-wide GPT-5 grep returns zero matches. Lint/build/test are not required for Markdown-only governance/README edits per the plan's operating rules, and were therefore not run for 18.0.

### 23.3 Diagnosis of the Daily Og↔Go Overlap Bug (spec §5)

Confirmed against HEAD:

- `src/game/go/session.ts` builds the **daily** go answer sequence with `selectAnswerSequence(repository.answers, getDailyAnswerIndex(dateKey, repository.answers.length))` (lines ~87–88), where `repository` is `getWordRepository({ mode: 'go', scope: 'daily', length: 5 })`.
- `src/data/daily.ts` `getDailyOgPuzzle` picks the daily **og** answer with the *same* `getDailyAnswerIndex(dateKey, answers.length)` against `getWordRepository({ mode: 'og', scope: 'daily', length: 5 })`.
- Because og and go daily both resolve to the identical length-5 curated `answers` array and the identical seed index for a given `dateKey`, **the first go puzzle is consistently the same word as the daily og answer.** This is the exact symptom the spec calls out.

**Root cause**: a single shared seed function (`getDailyAnswerIndex`) with no mode-specific offset/salt. The fix must give daily go an **independent** deterministic seed while keeping both deterministic per `dateKey` (so the daily puzzle is stable for all players on a date) and keeping daily go's five words mutually distinct (existing behavior).

### 23.4 Proposed Solution — Difficulty Tiers (spec §1)

Central rule: **tiers subset answers only; valid guesses are always the full list.**

- **Tier model**: introduce a `DifficultyTier = 'casual' | 'standard' | 'expert'` type in the game/data layer with `DEFAULT_DIFFICULTY_TIER = 'expert'` (spec default reproduces today's behavior). Expert = the full curated `answers` already shipped per length in `src/latest/words_length_N.json`.
- **Answer-subset derivation** (the key design decision — needs a data source for Casual/Standard):
  - **Expert**: the existing curated `answers` array verbatim. No new data.
  - **Standard**: union (or larger) of the classic official Wordle answer list and the classic Hurdle answer set. These exist **only at length 5**. **Resolved (user answers #1 + #2):**
    - **Length 5**: ship a small curated `standard-5` answer list as a static JSON asset under `src/data/difficulty/`, built as the **union (or a larger superset) of the classic Wordle + Hurdle answer sets**, intersected with the shipped Expert length-5 `answers` so `Standard ⊆ Expert` holds.
    - **Lengths ≠ 5**: define **Standard as "Expert minus the rarest stratum"** — i.e., drop the lowest-quality/rarest tail of Expert using the same deterministic in-repo heuristic that powers Casual (see below), with a less aggressive cutoff than Casual. This guarantees `Casual ⊆ Standard ⊆ Expert` at every length 2–35 and is unit-tested as a hard invariant.
  - **Casual**: "common/frequent words only, dynamically scaled per length" (spec §1). The current per-length JSONs carry **no per-word frequency score** at runtime (only a `metadata.curation` description of the offline `stratified_quality_score_v1` method). **Resolved (user answer #1):** compute the Casual (and non-5 Standard) tiers **in-repo via a deterministic heuristic** from the existing local JSON files — **no external data-pipeline dependency**. The heuristic reproducibly scores each Expert word per length (e.g., letter-frequency / positional-frequency / vowel-balance, mirroring the spirit of the offline `stratified_quality_score_v1`) and selects a stable top fraction per length as Casual, and a larger stable top fraction as non-5 Standard. The scoring must be pure/deterministic (no randomness, no clock, no network) so the same inputs always yield the same tiers, and the loader stays **ready to consume explicit per-word tier/score tags** if a future data regeneration ships them (forward-compatible, but not required now).
  - **Performance**: subsetting happens at answer-selection time from already-loaded per-length data; no extra network and no daily-mode slowdown. Casual/Standard subset computation must be memoized per (length, tier).
- **Selection wiring**:
  - Add an **additive, defaulted** `difficulty?: DifficultyTier` to the answer-selection path (`WordRepositoryRequest` and the daily/practice selectors), defaulting to Expert so all existing callers and tests are unchanged.
  - `getAnswerCandidates` / daily+practice selectors filter the Expert `answers` down to the requested tier's subset. `validateGuess`/`getValidGuesses` are **untouched** (full list always).
- **Persistence** (spec §1, §6): the **global default tier** is a new user setting saved to the guest profile (`GuestSettingsState`) and, when signed in, to the Supabase profile alongside other preferences. A **per-game override** is selected via the Customize quick menu and is **locked once a game starts** (changing it requires a new game).

### 23.5 Proposed Solution — UI: Customize Quick Menu + Settings (spec §1, §2)

- **Customize quick menu** (creative-but-tasteful per spec/Agent Instructions): a small **"Customize"** button near the mode selector opens an accessible popover/quick menu exposing the three tiers (Casual/Standard/Expert) with short descriptions/tooltips and a **"Save as default"** button. Selecting a tier sets the per-game override; "Save as default" also persists it as the global default. Once a game is in progress the control is disabled/locked with a clear hint ("Start a new game to change difficulty"). Reuse existing `ui/Dialog`/`Panel`/`Button` primitives; honor focus-trap, ESC-to-close, reduced-motion, and WCAG-AA contrast (CONSTITUTION §12.2).
- **Settings reorganization** (spec §2): move the existing **Hard Mode** control into the same section as the new **global difficulty** selector (Hard Mode currently lives per-game in `OgGame.tsx`/`GoGame.tsx` via `session.hardMode`, with `hardModeDefault` already stored in `GuestSettingsState`; the Settings section gains a global Hard-Mode-default toggle co-located with the difficulty selector — the per-game Hard Mode toggles remain). Add accessible **tooltips** (hover + click/focus) for the major settings in this section. Tooltips must be keyboard-reachable and screen-reader friendly.

### 23.6 Proposed Solution — Word Explorer (spec §3)

- Add a **"Difficulty"** column to `src/wordExplorer/WordExplorerPanel.tsx` / `wordExplorerData.ts` showing the applicable tier label per word: `"Casual"`, `"Standard + Expert"`, `"Expert only"`, computed from the same nested-subset logic in §23.4 (so a word in Casual is by definition also in Standard and Expert). The column is **filterable and sortable** consistent with the existing Word Explorer table affordances. Non-answer valid-guess-only rows render an explicit "—/Valid guess only" so the answer-vs-guess distinction stays clear.
- Add a **"Define"** button per row that opens the existing post-game definition surface (`src/definitions/DefinitionPanel.tsx`) in a modal, including the always-available Google fallback (CONSTITUTION §9). Reuse the existing `definitionService` lookup order; no new definition source.

### 23.7 Proposed Solution — Go Mode (spec §4)

- **Per-puzzle definitions**: after each go puzzle is solved correctly, render its definition **below the grid**, stacking vertically as subsequent puzzles are solved. Reuse `DefinitionPanel`/`definitionService`; the existing end-of-chain `DefinitionPanel` in `GoGame.tsx` stays. Add a **"Hide Definitions" / "Show All"** toggle controlling the stacked list.
- **Give Up / Reveal Answer (practice only)**: add a button rendered **only when `scope === 'practice'`** in `GoGame.tsx`. Revealing applies an appropriate coin/streak penalty using the **existing** economy helpers (no new monetization mechanic). It must integrate with stats as a loss-equivalent for that puzzle and must not appear in daily go. Daily go remains penalty-locked to preserve fairness. Edge cases: insufficient coins, reveal on the last puzzle, and reveal interacting with Pay-to-Continue must all be specified and tested.

### 23.8 Proposed Solution — Daily Og↔Go Overlap Fix (spec §5)

- Give daily go an **independent deterministic seed** so its first word is not tied to the daily og index. Approach: add a mode/scope **salt** to the daily index derivation (e.g., a dedicated `getDailyGoSeedIndex(dateKey, answerCount)` or a salted variant of `getDailyAnswerIndex` that incorporates a stable `'go'` discriminator), keeping determinism per `dateKey` and preserving the five-word mutual-distinctness already guaranteed by `selectAnswerSequence`. The fix must guarantee, via unit test across a range of `dateKey`s, that **daily go's first word differs from the daily og answer** for that date (allowing the rare legitimate coincidence only if mathematically unavoidable for a tiny answer pool — assert inequality for length-5 where the pool is large).
- This is the spec's only item flagged **Critical** and should be sequenced early (its own sub-phase, 18.5) so it can ship independently of the larger tier/UI work if the user wants a fast fix.

### 23.9 Proposed Solution — Preferences Persistence & Future-Proofing (spec §6)

- Persist as many user settings as possible — **including the difficulty tier** — to the Supabase profile when signed in, reusing the existing profile/sync plumbing (`src/account/profile.ts`, `sync.ts`, `storageSchema.ts`). All additions to `GuestSettingsState` are **additive with safe defaults** and a guest-storage schema migration that preserves existing data (CONSTITUTION §15: "preserve existing user data and migration paths"). Bump `GUEST_PROGRESS_SCHEMA_VERSION` only if the shape changes, with a forward-compatible migration.
- **Future-proof for "resume most recent unfinished game"**: do **not** implement resume in this phase, but ensure the new settings/serialization shapes leave room for it (e.g., reserve a clearly-named optional slot) without enabling it. No behavior change.

### 23.10 Phase 18 — Sub-Phase Plan

| Sub-phase | `phase_id` | Title | Files Touched (planned) | Verification |
|-----------|-----------|-------|-------------------------|--------------|
| 18.0 | 35 | Governance & repo cleanup (model-agnostic) + root README upgrade — **done in planning stage** | `BRRRDLE-OVERVIEW.md` (model-agnostic), `README.md` (professional upgrade), `AGENT-IMPLEMENTATION-PLAN.md` (this §23), `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-35.md` | Markdown-only; `git diff --check`; repo-wide GPT-5 grep = 0 matches |
| 18.1 | 36 | Pre-flight & baseline capture (doc reorg **declined** by user answer #5; root layout retained) | read-only baseline | Re-confirm `npm run lint` / `npm run test` / `npm run build` / `npx tsc -p tsconfig.api.json --noEmit` green at HEAD |
| 18.2 | 37 | Difficulty-tier data model & answer-subset logic (answers-only; valid guesses untouched) | **New**: `src/data/difficulty/` (tier types, subset derivation, optional `standard-5` asset, tests). **Edit (additive)**: answer-selection path in `wordRepository.ts`/`daily.ts`/`go/session.ts` with defaulted `difficulty` | Unit tests: `Casual ⊆ Standard ⊆ Expert` for all lengths 2–35; Expert == today's answers; `validGuesses` byte-identical across tiers; daily 5-lock and practice 2–35 unchanged |
| 18.3 | 38 | Settings reorg + global difficulty selector + tooltips | **Edit**: `src/account/Settings.tsx`, `src/account/storageSchema.ts` (additive setting + migration) | Tests for migration/back-compat; a11y checks (focus, tooltips, contrast) |
| 18.4 | 39 | Customize quick menu + per-game override (lock-on-start) + "Save as default" | **New** quick-menu component; **Edit**: mode selector area, `OgGame.tsx`/`GoGame.tsx` to consume override | Tests: override applied; locked once started; save-as-default persists; a11y/focus-trap |
| 18.5 | 40 | **Critical** daily Og↔Go overlap fix | **Edit**: `src/data/daily.ts` and/or `src/game/go/session.ts` (salted daily-go seed) | Unit test across many `dateKey`s: daily-go first word ≠ daily-og answer at length 5; five go words remain distinct; determinism per date preserved |
| 18.6 | 41 | Word Explorer difficulty column (filter/sort) + per-row Define modal | **Edit**: `src/wordExplorer/wordExplorerData.ts`, `WordExplorerPanel.tsx` | Tests: tier label correctness, filter/sort, Define modal opens with Google fallback |
| 18.7 | 42 | Go-mode per-puzzle definitions stack + Hide/Show toggle + practice-only Reveal | **Edit**: `src/app/games/GoGame.tsx`, go session/state | Tests: definition shown on solve, toggle, reveal practice-only with penalty + stats, daily unaffected |
| 18.8 | 43 | Supabase preference sync (incl. tier) + resume-game-ready shapes | **Edit**: `src/account/sync.ts`, `profile.ts`, `storageSchema.ts` | Tests: signed-in persistence, guest fallback, migration, no behavior change for resume slot |
| 18.9 | 44 | Final integration, cross-feature verification & release gate | docs/changelog/progress only | Full §23.12 pipeline + CodeQL |

Each sub-phase ends with a `progress/PROGRESS-STEP-N.md`, a `progress/PROGRESS.csv` row, a `CHANGELOG.md` entry, and a halt for explicit user approval per CONSTITUTION §4 unless the user authorizes contiguous execution.

> **Phase-id note (3-prompt workflow).** Phase 18.0 (planning) is recorded at `phase_id = 35`. The Prompt 2 constitution/repo adjustments (this amendment) are recorded at `phase_id = 36` (`progress/PROGRESS-STEP-36.md`). The feature sub-phases 18.1–18.9 above keep their projected `phase_id` column for planning purposes; their final `phase_id` integers are assigned sequentially (37+) when each is executed in Prompt 3.

### 23.11 Resolved User Answers (formerly Open Questions)

On 2026-05-30 the user provided definitive answers to all five questions. They are now binding decisions for Phase 18 and are integrated above (§23.2, §23.4). No open questions remain blocking.

1. **Casual/Standard data source** (§23.4): **Resolved → compute tiers in-repo via a deterministic heuristic from the existing local JSON files** (default approach; no external data-pipeline dependency). The loader stays forward-compatible with explicit per-word tier/score tags if a future data regeneration ships them.
2. **Standard at non-5 lengths** (§23.4): **Resolved → define Standard as "Expert minus the rarest stratum"** for lengths ≠ 5 (drop the lowest-quality tail). For length 5, use the **union (or larger superset) of the classic Wordle + Hurdle answer sets**. `Casual ⊆ Standard ⊆ Expert` is preserved at every length and unit-tested.
3. **Constitution amendment** (§23.2): **Resolved → approved and APPLIED in Prompt 2 (2026-05-30).** Generalized CONSTITUTION §1/§5/§5.2 "Phases 0 through 11" to "Phases 0–11 plus all subsequently approved addenda (Phases 12+)," with supporting §4/§5.2/§17 clarifications and a version bump v3.1 → v3.2. No rule was removed or weakened.
4. **Scope approval** (§23.1): **Resolved → confirmed.** The Phase 18 spec serves as the explicit CONSTITUTION §3.3/§2 approval for the difficulty tiers and the practice-only reveal.
5. **Optional doc reorg** (§23.2/18.1): **Resolved → keep the current root layout for now;** defer any reorganization to a later optional cleanup phase.

### 23.12 Verification & Release Gate (Phase 18.9)

1. `npm run lint` — clean.
2. `npm run test` — all existing tests pass with zero new failures; new tests added per sub-phase, including the nesting invariant, the valid-guess-identity-across-tiers invariant, and the daily Og↔Go inequality invariant.
3. `npm run build` — clean; record bundle-size delta; keep daily-mode (length 5) fast.
4. `npx tsc -p tsconfig.api.json --noEmit` — clean.
5. Client-bundle leak checks against `dist/`: no `@vercel/blob`; no service-role/Supabase admin secrets; no regression in HF-URL occurrence vs. Phase 17 baseline.
6. Manual smokes: difficulty selection (default Expert reproduces current behavior), Customize lock-on-start, Settings tooltips/a11y, Word Explorer difficulty filter/sort + Define modal, Go per-puzzle definitions + practice-only reveal penalty, daily Og↔Go non-overlap, signed-in preference sync + guest migration.
7. CodeQL on changed lines; fix any true-positive before the gate closes.

### 23.13 Phase 18 Exit Checklist

- Difficulty tiers subset **answers only**, valid guesses identical across tiers, default tier Expert reproduces current behavior; `Casual ⊆ Standard ⊆ Expert` for all lengths.
- Settings reorganized with co-located Hard Mode + difficulty and accessible tooltips; Customize quick menu with lock-on-start and Save-as-default.
- Word Explorer difficulty column (filter/sort) and per-row Define modal in place.
- Go per-puzzle definitions stack + Hide/Show toggle; practice-only Reveal with correct penalty/stats; daily unaffected.
- Daily Og↔Go overlap fixed and unit-tested.
- Preferences (incl. tier) persist to guest storage and Supabase when signed in, with a data-preserving migration; resume-ready shapes reserved but not enabled.
- Daily 5-letter lock and practice 2–35 preserved; all §23.1 invariants intact.
- `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, and `CHANGELOG.md` updated and free of sensitive data.
- All §23.11 questions resolved by the user (2026-05-30); decisions integrated into §23.2/§23.4. Constitution amendment (answer #3) applied in prompt 2.
- Halt for explicit user approval before any production release action.

---

## 24. Phase 19 — Enhanced Statistics Visualizations, Configurable Go Puzzle Count, Full Resume-Most-Recent-Game Activation, Advanced Polish & Theming Foundations (Addendum, PHASE-19-ENHANCED-STATS-RESUME-CONFIGURABLE-GO-AND-POLISH-SPEC-2026-05-30)

**Plan Version**: 2.2 (addendum). Bound by `CONSTITUTION.md` v3.2, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, the prior plan (Phases 0–18), and `PHASE-19-ENHANCED-STATS-RESUME-CONFIGURABLE-GO-AND-POLISH-SPEC-2026-05-30.md` (the **binding source of truth** for this phase). Triggered by the user's Phase 19 spec requesting a richer statistics dashboard, a configurable Go puzzle count (5/7/10), full activation of the resume-most-recent-unfinished-game slot reserved in Phase 18, advanced polish/accessibility, and a light theming foundation. Executed via the user's 3-prompt workflow; **Prompt 1 (planning)** drafted this addendum (v2.1) and **Prompt 2 (governance/clarity)** confirmed the `phase_id = 46` numbering decision and applied the final non-code adjustments (v2.2).

> Status: **Phase 19 feature execution complete (Prompt 3).** Sub-phases 19.1–19.6 are implemented and verified on the working branch (final ids 48–53): 19.1 Enhanced Statistics Dashboard, 19.2 Configurable Go Puzzle Count (5/7/10), 19.3 Resume Most-Recent Unfinished Game, 19.4 Advanced Polish & Accessibility (sound categories + a11y/motion audit), 19.5 Light Theming Foundation (4 accent-only themes), and 19.6 Final Integration & Release Gate. Full verification matrix green (`npm ci`; lint; **test 321/321**; build; `tsc -p tsconfig.api.json --noEmit`; client-bundle leak checks; `git diff --check`) and CodeQL clean (0 alerts). All invariants preserved (daily 5-letter lock; practice 2–35; valid guesses identical across tiers; default Expert). **Halt before any production release** per CONSTITUTION §4: the user reviews/merges and performs any manual Vercel/Supabase follow-up.

### 24.1 Scope, Source of Truth, and Operating Rules

- **Source of truth for this phase**: `PHASE-19-ENHANCED-STATS-RESUME-CONFIGURABLE-GO-AND-POLISH-SPEC-2026-05-30.md` and this Section 24. If the spec and prior phases conflict, the spec wins for the narrow concerns it covers (statistics visualizations, configurable Go puzzle count, resume activation, polish/theming). All other invariants from Phases 0–18 are preserved.
- **Constitutional fit / scope check**: `CONSTITUTION.md` §3.3 lists "Themes or sound effects" as out of scope without approval. Phase 19's **Light Theming Foundation** (accent/border-only "Icy/Classic/Neon/Country Flag" selection) and **categorized sound effects** are treated as **explicitly approved** by the Phase 19 spec (spec §1, §3), which the user approved for autonomous execution. Sound effects were already shipped via the `ADDITIONS-2026-05-27.md` addendum (Phase 13); Phase 19 only categorizes/refines them. Phase 19 adds **no new game mode** and **no new monetization mechanic** (spec §1 "Out of scope": monetization changes, multiplayer, leaderboards, heavy AI hints remain reserved). This addendum records the Phase 19 spec as the §3.3/§2 approval for theming and sound categorization, for auditability.
- **Non-negotiable preserved invariants** (carried unchanged from Phases 0–18):
  - Daily `og`/`go` locked at 5 letters; practice 2–35 (CONSTITUTION §3.1). The configurable Go puzzle count changes **how many puzzles are in a Go chain (5/7/10)**, never the per-puzzle word length, and never unlocks variable daily lengths.
  - `getTileStates`/`getGuessResult` remains the single source of truth for tile coloring and Hard Mode (CONSTITUTION §7.1). No Phase 19 feature recomputes coloring.
  - **Valid Guesses identical across all difficulty tiers**; difficulty tiers subset **answers only** (Phase 18 §23.1 invariant) — unchanged by Phase 19.
  - **Default difficulty tier = Expert** reproduces current behavior (Phase 18). Phase 19's new defaults follow the same rule: each new setting is **additive with a default that reproduces today's behavior** — default Go count = **5**, default theme = **Icy** (current look), resume = **off until a real unfinished game exists**.
  - Per-mode statistics separation (`og` vs `go`) and the per-length foundation (CONSTITUTION §11.2) are preserved; the new dashboard **visualizes existing stats**, it does not change how stats are computed or unlock variable daily lengths.
  - Guest-first: every feature must work for guests with local storage; signed-in users additionally sync via the existing Supabase profile plumbing. Auto-resume "works for signed-in users" (spec §2) but the resume **button** also works for guests when a local unfinished game exists.
  - Admin tab + `/api/admin-refresh` server contract intact; local-source loader (Phase 17) remains the gameplay default; difficulty tiers (Phase 18) untouched.
  - No file deletion. No removal/skip/weakening of existing tests. No service-role on client. No `@vercel/blob` in client bundle. **No new heavy charting dependency** — spec §2 requires "simple, accessible libraries already in the ecosystem (no new heavy deps)"; the dashboard must be built from lightweight, accessible, dependency-free SVG/CSS primitives (or an already-present dependency), not a new heavy chart library. Any dependency at all requires advisory clearance (CONSTITUTION §14) and explicit justification.
  - All new features must be "toggleable/off-by-default where appropriate and fully testable" (spec §2).
- **Operating rules**: strictly minimal, cohesive, reviewable changes; re-read the relevant plan section before each sub-phase; halt at each sub-phase gate per CONSTITUTION §4 unless the user authorizes contiguous execution; update `progress/PROGRESS.csv`, the relevant `progress/PROGRESS-STEP-N.md`, and `CHANGELOG.md` at every sub-phase; run `npm run lint`, `npm run test`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit`, plus the client-bundle leak checks, before declaring any sub-phase complete; run CodeQL on changed lines.

### 24.2 Phase 19.0 — Planning Stage: Governance & Repository Cleanup + README Polish (performed now)

This sub-step is the only part of Phase 19 executed during plan drafting, per the user's explicit Prompt-1 instruction to draft the addendum and perform the allowed light governance/repo cleanup while deferring all game code changes.

**What was reviewed and changed now (planning stage):**

1. **Authoritative documents reviewed in order** (per the Prompt-1 instruction): `CONSTITUTION.md` (v3.2), `BRRRDLE-SPEC.md`, `AGENT-IMPLEMENTATION-PLAN.md` (v2.0 → now v2.1), the new `PHASE-19-…-SPEC-2026-05-30.md`, the root `README.md`, and the relevant source areas (`src/stats/`, `src/game/go/`, `src/game/constants.ts`, `src/account/` — `storageSchema.ts`, `guestStorage.ts`, `profile.ts`, `sync.ts`, `auth.ts`, `Settings.tsx`, `ProfilePanel.tsx`, `src/app/games/`, `src/sound/`). Findings are captured in §24.3.
2. **Model-agnostic / clarity review.** A repo-wide scan for hard-coded model attributions (`GPT-5*`, `GPT5`) in governance/source files returns **zero** matches; the remaining model references in `BRRRDLE-OVERVIEW.md`, `README.md`, and the plan are already phrased model-agnostically (e.g. "any sufficiently capable model, e.g. Claude Opus 4.8"). No model-attribution edit is required this phase. The binding `CONSTITUTION.md` names no model and is left untouched (the agent does not self-edit the constitution outside an explicitly approved amendment, per CONSTITUTION §17).
3. **Plan addendum appended (this §24)** and the plan version bumped v2.0 → **v2.1** with an updated header changelog line.
4. **Root `README.md` polished (planning stage).** The stale "Project status" line (which still said "through Phase 17 … Phase 18 … planned and awaiting approval") is corrected to reflect that Phase 18 is implemented and Phase 19 is now planned and awaiting approval; the features list is lightly updated to mention answer-difficulty tiers (shipped in Phase 18) and to preview the approved Phase 19 enhancements (richer stats dashboard, configurable Go count, resume, theming). **No facts were invented** — the changes reflect on-disk code (Phase 18 difficulty tiers in `src/data/difficulty/`, the reserved `resumeSlot`, the existing accent-color profile field) and the approved Phase 19 spec. Documentation-only change.
5. **Repository organization — evaluated, no files moved.** Consistent with the Phase 18.0 decision (§23.2 item 3; user answer #5: keep the current root layout, defer reorganization), the many dated root governance/spec/report files are referenced by bare filename across the plan, changelog, progress reports, and a source test, so moving them now would break governance references. No files were moved or deleted.
6. **`BRRRDLE-SPEC.md` and `CONSTITUTION.md` reviewed; left unchanged.** Neither names a model; neither requires a Phase 19 edit. No constitution amendment is required for Phase 19 (the v3.2 phase-range generalization already covers "all subsequently approved addenda, Phases 12+").

**Progress-step numbering note (deviation from the literal prompt — now confirmed by the user).** The Prompt-1 instruction said to "create `progress/PROGRESS-STEP-37.md` for the planning stage." However, `progress/PROGRESS-STEP-37.md` **already exists** and records **Phase 18.1** (the progress sequence currently runs through `PROGRESS-STEP-45.md` / `phase_id = 45`, Phase 18.9). Overwriting step 37 would destroy an existing phase record, violating CONSTITUTION §15 ("preserve existing user data and migration paths") and the no-deletion rule. To honor the **intent** of the instruction (create a planning-stage progress report) without destroying data, the Phase 19.0 planning report was recorded at the **next sequential** id, **`progress/PROGRESS-STEP-46.md` / `phase_id = 46`**, and the discrepancy was flagged to the user. **In Prompt 2 the user reviewed and explicitly approved this decision** ("use `phase_id = 46` / `progress/PROGRESS-STEP-46.md` — smart preservation of existing records"); the numbering is therefore **confirmed**, and subsequent Phase 19 steps continue sequentially from it (Prompt 2 itself is recorded at `phase_id = 47`; see §24.10).

**Documentation of the cleanup** lives in `CHANGELOG.md` (Unreleased → Phase 19.0 entry) and `progress/PROGRESS-STEP-46.md`, with a `progress/PROGRESS.csv` row at `phase_id = 46`.

**Prompt 2 adjustments (governance/clarity only — performed now, `phase_id = 47`).** After the user reviewed Prompt 1 and approved the numbering decision, Prompt 2 applied the final constitution/repo adjustments: recorded the **confirmed** `phase_id = 46` numbering decision in this §24.2, in the §24.10 phase-id note, and in the §24.12 exit checklist; bumped the plan version **v2.1 → v2.2** with an updated header changelog line; and refreshed the stale "flagged for confirmation" cross-references to "confirmed." **No constitution amendment is required for Phase 19** — `CONSTITUTION.md` v3.2 already binds "all subsequently approved addenda, Phases 12+" to the same rules as Phases 0–11, names no model, and (per CONSTITUTION §17) is not self-edited outside an explicitly approved amendment. **No game code, tests, or source files were touched.** Documentation is recorded in `CHANGELOG.md` (Unreleased → Phase 19 Prompt 2 entry) and `progress/PROGRESS-STEP-47.md`, with a `progress/PROGRESS.csv` row at `phase_id = 47`.

**Verification for 19.0**: planning/documentation-only changes (Markdown only — plan, README, changelog, progress). The pre-existing baseline was nonetheless confirmed green before drafting (`npm run lint` clean, `npm run test` **292/292**, `npm run build` clean, `npx tsc -p tsconfig.api.json --noEmit` clean) so sub-phase 19.1 starts from a known-good state. `git diff --check` clean; repo-wide GPT-5 grep returns zero matches.

### 24.3 Diagnosis of Current Stats / Resume / Configurable-Go / Theming State (against HEAD)

**Statistics (spec §3 / sub-phase 19.1).**
- The model lives in `src/stats/`: `types.ts` (`GameStatsBucket` with `played/won/lost/currentStreak/maxStreak/totalAttempts/bestAttempts/byLength`, and `StatisticsState = Record<GameMode, Record<PlayScope, GameStatsBucket>>`), `statistics.ts` (`createEmptyStatistics`, `updateStatistics`, `getStatsBucket`, `getWinRate`, `getAverageAttempts`), and `StatsDashboard.tsx`.
- `StatsDashboard.tsx` currently renders **four static numeric cards** (og daily, og practice, go daily, go practice), each showing Played, Win rate %, Current/Max streak, Best/Avg attempts. There are **no charts** (no win-rate-by-tier/length bars, no streak calendar, no XP-progress visual, no coin-usage trend). Per-length data (`byLength`) is **stored but not visualized**.
- XP/level/coins live separately in `GuestProgressionState` (`storageSchema.ts`); coin/XP awards and history are in `GuestProgressState.history` (`GameHistoryEntry[]` includes `coinAward`, `xpAward`, `completedAt`, `wordLength`). **The dashboard does not currently read `history` or `progression`** — the raw material for XP-progress and coin-usage-trend visuals already exists but is unwired.
- **Gap for 19.1**: add interactive, accessible charts (win rate by mode/scope and by length/tier; streak calendar from `history.completedAt`; XP progress from `progression.xp`/level thresholds; coin-usage trend from `history.coinAward`) using lightweight in-repo SVG/CSS primitives — no new heavy dependency (spec §2). Difficulty tier is **not** currently captured per game in `GameHistoryEntry`; win-rate-by-tier needs either an additive `difficulty?` field on history entries going forward (additive, back-compatible) or a clear "tier data available from <date>" empty state for older entries. This is a design decision to settle in 19.1.

**Configurable Go puzzle count (spec §1 / sub-phase 19.2).**
- `src/game/constants.ts` hard-codes `GO_PUZZLE_COUNT = 5`. `src/game/go/session.ts` builds daily and practice chains using this constant; `src/game/go/session.test.ts` asserts `puzzles.toHaveLength(GO_PUZZLE_COUNT)`.
- `recordCompletedGame`'s `CompletedGameInput` already carries an optional `puzzleCount?: number` (`guestStorage.ts`), so the scoring path is partially ready for variable counts, but session construction, carry-over pre-fill logic, and the UI are all fixed at 5.
- **Gap for 19.2**: introduce a `GoPuzzleCount = 5 | 7 | 10` concept with `DEFAULT_GO_PUZZLE_COUNT = 5`; thread an **additive, defaulted** count through `createDailyGoSetup`/`createPracticeGoSetup`/`createGoSession` and the carry-over pre-fill; add a **global default** setting (guest + Supabase profile) and a **per-game override** via the existing `CustomizeMenu`, **locked once a game starts** (mirroring the Phase 18 difficulty lock-on-start). Daily Go may use the chosen count while each puzzle stays at the daily 5-letter length (count ≠ length — invariant preserved). Tests must cover 5/7/10 and the lock-after-start behavior.

**Resume most-recent unfinished game (spec §1, §2 / sub-phase 19.3).**
- Phase 18.8 reserved `GuestProgressState.resumeSlot?: unknown` (`storageSchema.ts`) and `guestTransfer.ts` already **preserves a reserved resume slot from either side without enabling it** (there is a passing test for this). The slot is currently always `undefined`; **no resume capture, UI, or auto-resume exists**.
- `og`/`go` sessions are serializable (`SerializedGoSession` exists in `go/session.ts`; Og sessions have analogous serialization), which is the substrate a resume feature needs.
- **Gap for 19.3**: define a concrete typed shape for `resumeSlot` (mode, scope, length, difficulty, Go count, serialized session, timestamp), capture/clear it as a game progresses/finishes, add a **home-screen Resume button that only appears when an unfinished game exists**, and **auto-resume on load for signed-in users** (spec §2). Must integrate with the schema migration (additive; only bump `GUEST_PROGRESS_SCHEMA_VERSION` if the persisted shape changes) and preserve all existing data. End-to-end test: start → leave → resume restores exact state.

**Advanced polish & accessibility (spec §1 / sub-phase 19.4).**
- Sound exists in `src/sound/` (`soundEngine.ts`, `SoundProvider.tsx`, toggle). Tile animations exist (pop-in/flip/shake) and honor reduced-motion. Touch scaling was addressed in Phase 16.
- **Gap for 19.4**: smoother/categorized tile animations, **sound categories** (e.g., key-press vs. win vs. loss vs. UI) layered on the existing engine, larger mobile touch targets where measured insufficient, and a **final a11y pass** (axe/lighthouse, focus order, contrast, keyboard navigation). Off-by-default/toggleable where appropriate.

**Light theming foundation (spec §1 / sub-phase 19.5).**
- A profile **accent color** concept already exists from Phase 15: `auth.ts` validates `accentColor` against an allow-list (`PROFILE_ACCENT_COLORS`, default `'ice'`) and persists `accent_color` to the Supabase profile; `profile.ts` derives accent into the UI. This is the natural substrate for theming.
- **Gap for 19.5**: a `Theme = 'icy' | 'classic' | 'neon' | 'country-flag'` selector (default `'icy'` = current look) in Settings/Customize, stored in the guest profile **and** the Supabase profile (reusing/extending the accent plumbing), applying **accent/border-only** changes for v1 (spec §1 — "UI changes limited to accents/borders for v1"). Must not alter layout, contrast minima, or tile coloring. Four themes switchable and persisted; tested.

**Final integration & release gate (spec §3 / sub-phase 19.6).**
- Cross-feature tests, changelog, progress update, full verification pipeline, manual smoke on a Vercel preview, and a "safe to merge & test" statement. Halt for explicit user approval before any production release action (CONSTITUTION §4).

### 24.4 Proposed Solution — Enhanced Statistics Dashboard (spec §3, sub-phase 19.1)

- **No new heavy dependency.** Build charts from small, accessible, in-repo SVG/CSS components (e.g., a reusable `<BarChart>`, `<CalendarHeatmap>`, `<ProgressMeter>`, `<TrendSparkline>` under `src/stats/charts/`) with text/`aria` fallbacks and a tabular equivalent for screen readers. If any already-present dependency suffices it may be reused after advisory clearance; otherwise dependency-free.
- **Visualizations** (all derived from existing data): win rate by mode/scope (and by length from `byLength`, and by tier once tier-tagged history exists), a streak calendar/heatmap from `history.completedAt`, XP-progress meter from `progression.xp` against level thresholds (reuse `src/progression`), and a coin-usage/earning trend from `history.coinAward`. Each chart is responsive and keyboard/screen-reader accessible (WCAG AA, CONSTITUTION §12.2).
- **Tier-aware win rate**: add an **additive, optional** `difficulty?: DifficultyTier` to `GameHistoryEntry` recorded going forward (back-compatible — older entries simply lack it and render in an "all/untagged" group). No migration of historical rows; default behavior unchanged.
- **Pure, testable selectors**: chart inputs come from pure functions in `statistics.ts` (or a new `statsSelectors.ts`) so they unit-test without rendering (CONSTITUTION §7.3 spirit). The existing four-card summary is preserved or folded into the richer view without losing any current number.

### 24.5 Proposed Solution — Configurable Go Puzzle Count (spec §1, sub-phase 19.2)

- **Type & default**: `GoPuzzleCount = 5 | 7 | 10`, `DEFAULT_GO_PUZZLE_COUNT = 5` in `src/game/constants.ts` (keep `GO_PUZZLE_COUNT = 5` as the default-valued constant or re-express it via the new default so existing imports/tests stay valid).
- **Session wiring (additive, defaulted)**: thread an optional `puzzleCount` (default 5) through `createDailyGoSetup`/`createPracticeGoSetup`/`createGoSession` and the carry-over pre-fill so chains of 7 or 10 build correctly and each later puzzle still pre-fills prior answers. Daily Go keeps each puzzle at the 5-letter daily length regardless of count (count ≠ length). Existing `selectAnswerSequence` distinctness must hold for 7/10 (the length-5 answer pool is large enough; assert in tests).
- **Persistence & override**: global default `goPuzzleCountDefault` added to `GuestSettingsState` (additive, defaulted to 5, migrated) and synced to the Supabase profile; per-game override in `CustomizeMenu` with **lock-on-start** (mirrors Phase 18 difficulty lock) and an inline "start a new game to change" hint.
- **Stats/economy**: `recordCompletedGame` already accepts `puzzleCount`; ensure the actual count flows in so coin/XP/stats reflect longer chains correctly. No new monetization mechanic.

### 24.6 Proposed Solution — Resume Most-Recent Unfinished Game (spec §1, §2, sub-phase 19.3)

- **Typed `resumeSlot`**: replace the reserved `unknown` with a concrete optional shape capturing `{ mode, scope, wordLength, difficulty, goPuzzleCount?, serializedSession, updatedAt }`. Bump `GUEST_PROGRESS_SCHEMA_VERSION` **only if** the persisted shape changes, with a forward-compatible, data-preserving migration; `guestTransfer.ts` already round-trips the slot.
- **Capture/clear**: write the slot as an unfinished game advances (debounced/at sensible checkpoints) and clear it on completion or explicit abandon. Reuse existing `SerializedGoSession`/Og serialization.
- **UI**: a **home-screen Resume button visible only when an unfinished game exists** (spec §2), restoring exact mode/scope/length/difficulty/count and board state. **Auto-resume on load for signed-in users** (spec §2); guests get the button (no surprise auto-navigation). Off when no slot exists.
- **Tests**: end-to-end start → leave → resume restores state for og and go; button hidden when no unfinished game; signed-in auto-resume; guest-transfer preserves the slot.

### 24.7 Proposed Solution — Advanced Polish & Accessibility (spec §1, sub-phase 19.4)

- **Animations**: smoother tile pop-in/flip/shake timings, still reduced-motion-aware and non-blocking (CONSTITUTION §12.3). **Sound categories** layered on `src/sound/soundEngine.ts` (e.g., `keypress | submit | win | loss | ui`) with per-category respect for the existing master toggle; off/at-current-behavior by default.
- **Touch & a11y**: audit and enlarge mobile touch targets where measured below comfortable minimums (building on Phase 16); run an axe/Lighthouse pass; verify focus order, dialog focus traps, status announcements, contrast, and full keyboard navigation. Document residual findings.

### 24.8 Proposed Solution — Light Theming Foundation (spec §1, sub-phase 19.5)

- **Type & default**: `Theme = 'icy' | 'classic' | 'neon' | 'country-flag'`, default `'icy'` (current look). Selector surfaced in Settings (global default) and optionally `CustomizeMenu`.
- **Storage**: persist to the guest profile (additive `themeDefault` setting, migrated) **and** the Supabase profile, reusing/extending the Phase 15 accent plumbing (`auth.ts` `accent_color`/allow-list, `profile.ts` derivation). Validate against an allow-list (untrusted-input safe).
- **Application**: **accent/border-only** CSS-variable swaps for v1 — no layout change, no tile-coloring change, preserved contrast minima (spec §1; CONSTITUTION §7.1, §12.2). Four themes switchable and persisted; tested.

### 24.9 Proposed Solution — Preferences Persistence & Migration (cross-cutting)

- All new settings — `goPuzzleCountDefault`, `themeDefault`, the optional history `difficulty` tag, and the typed `resumeSlot` — are **additive with safe defaults** that reproduce today's behavior, persisted to guest storage and synced to the Supabase profile via the existing `profile.ts`/`sync.ts`/`storageSchema.ts` plumbing. Bump `GUEST_PROGRESS_SCHEMA_VERSION` once (if the shape changes) with a single forward-compatible migration that preserves all existing coins/XP/level/history/stats/settings (CONSTITUTION §15). No data loss; corrupt payloads still fall back to a fresh default.

### 24.10 Phase 19 — Sub-Phase Plan

| Sub-phase | `phase_id` | Title | Files Touched (planned) | Verification |
|-----------|-----------|-------|-------------------------|--------------|
| 19.0 | 46 | Pre-flight & baseline + planning-stage governance/repo cleanup + README polish + **this §24 addendum** — **done in planning stage** | `AGENT-IMPLEMENTATION-PLAN.md` (this §24, v2.1), `README.md` (status/feature polish), `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-46.md` | Markdown-only; baseline re-confirmed green (lint, test **292/292**, build, tsc-api); `git diff --check`; GPT-5 grep = 0 |
| 19.1 | 47 | Enhanced Stats Dashboard (interactive accessible charts; no new heavy dep) | **New**: `src/stats/charts/*`, pure stat selectors; **Edit (additive)**: `src/stats/StatsDashboard.tsx`, `statistics.ts`/`types.ts`, optional additive `difficulty?` on `GameHistoryEntry` | Unit tests for selectors; responsive + a11y (axe/keyboard/SR); existing numbers preserved |
| 19.2 | 48 | Configurable Go Puzzle Count (5/7/10; global + per-game; lock-on-start) | **Edit (additive)**: `src/game/constants.ts`, `src/game/go/session.ts`, `src/app/games/GoGame.tsx`, `CustomizeMenu.tsx`, `src/account/storageSchema.ts` (additive setting + migration) | Tests for 5/7/10 chains + carry-over; lock-after-start; daily length stays 5; distinctness holds |
| 19.3 | 49 | Resume Most-Recent Unfinished Game (typed slot + capture/clear + button + signed-in auto-resume) | **Edit**: `src/account/storageSchema.ts` (typed `resumeSlot` + migration), `guestStorage.ts`, `guestTransfer.ts`, `src/app/App.tsx` + home UI, `OgGame.tsx`/`GoGame.tsx` | E2E start→leave→resume (og+go); button hidden when none; signed-in auto-resume; transfer preserves slot |
| 19.4 | 50 | Advanced Polish & Accessibility (animations, sound categories, touch targets, final a11y pass) | **Edit**: `src/sound/*`, animation/CSS, touch-target tweaks | Manual multi-device + axe/Lighthouse; reduced-motion; toggles off-by-default where appropriate |
| 19.5 | 51 | Light Theming Foundation (4 accent themes; profile storage; accent/border-only) | **Edit**: Settings/Customize, `src/account/auth.ts`/`profile.ts` (theme storage), CSS variables, `storageSchema.ts` (additive setting + migration) | 4 themes switchable + persisted (guest + Supabase); no layout/contrast/tile-color change |
| 19.6 | 52 | Final Integration & Release Gate (cross-feature tests, changelog, progress, full verification) | docs/changelog/progress only | Full §24.11 pipeline + CodeQL + Vercel preview smoke; "safe to merge & test" statement |

Each sub-phase ends with a `progress/PROGRESS-STEP-N.md`, a `progress/PROGRESS.csv` row, a `CHANGELOG.md` entry, and a halt for explicit user approval per CONSTITUTION §4 unless the user authorizes contiguous execution.

> **Phase-id note (3-prompt workflow).** Phase 19.0 (planning, Prompt 1) is recorded at `phase_id = 46` — the next sequential id after Phase 18.9 (`phase_id = 45`). This intentionally diverges from the literal Prompt-1 text ("create `progress/PROGRESS-STEP-37.md`"), because step 37 already records Phase 18.1; see §24.2 for the rationale (preserve existing data). **The user reviewed and confirmed this `phase_id = 46` decision in Prompt 2.** The Prompt 2 constitution/repo adjustments (this amendment) are recorded at the next sequential id, **`phase_id = 47`** (`progress/PROGRESS-STEP-47.md`). The feature sub-phases 19.1–19.6 retain the **projected** `phase_id` values 47–52 in the table above for planning purposes; because Prompt 2 consumed id 47, their **final** ids are assigned sequentially from **48** onward as each is executed in Prompt 3.

### 24.11 Verification & Release Gate (Phase 19.6)

1. `npm run lint` — clean.
2. `npm run test` — all existing tests pass with zero new failures; new tests added per sub-phase (stat selectors; Go counts 5/7/10 + lock; resume round-trip; theme persistence; migration back-compat).
3. `npm run build` — clean; record bundle-size delta; **confirm no new heavy charting dependency** and that daily-mode (length 5) stays fast.
4. `npx tsc -p tsconfig.api.json --noEmit` — clean.
5. Client-bundle leak checks against `dist/`: no `@vercel/blob`; no service-role/Supabase admin secrets; no HF-URL regression vs. the Phase 17/18 baseline.
6. Manual smokes: enhanced stats render + are keyboard/SR accessible; Go count 5/7/10 with lock-on-start and correct carry-over; resume button appears only when unfinished, restores state, signed-in auto-resume; polish/sound categories/touch targets; four themes switch and persist (guest + signed-in); daily 5-lock and practice 2–35 intact.
7. CodeQL on changed lines; fix any true-positive before the gate closes.

### 24.12 Phase 19 Exit Checklist

- Enhanced statistics dashboard ships interactive, accessible visualizations derived from existing stats/history/progression, with **no new heavy dependency**; all current numbers preserved.
- Configurable Go puzzle count (5/7/10) with global default + per-game override + lock-on-start; daily per-puzzle length stays 5; carry-over correct for all counts.
- Resume-most-recent-unfinished-game fully activated: typed `resumeSlot`, capture/clear, home-screen button (only when unfinished), signed-in auto-resume; guest-transfer preserves the slot; data-preserving migration.
- Advanced polish: smoother animations, categorized sound effects, improved touch targets, final a11y pass (axe/Lighthouse), reduced-motion respected.
- Light theming foundation: four accent/border-only themes (default Icy = current look), persisted to guest + Supabase profile; no layout/contrast/tile-color change.
- All Phase 0–18 invariants intact: daily 5-letter lock; practice 2–35; valid guesses identical across difficulty tiers (answers-only subsetting); default difficulty Expert; `getTileStates`/Hard Mode untouched; per-mode stats separation.
- New settings additive with defaults reproducing today's behavior; single forward-compatible migration; no data loss; no file deletion; no weakened tests; no secrets; no service-role on client.
- `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, and `CHANGELOG.md` updated and free of sensitive data.
- Progress-step numbering deviation (planning recorded at `PROGRESS-STEP-46.md`, not `37`) **confirmed by the user in Prompt 2** (§24.2); Prompt 2 itself recorded at `phase_id = 47`, with feature sub-phases 19.1–19.6 assigned final ids 48+.
- Halt for explicit user approval ("Start Prompt 2" or equivalent) before any game code changes, and before any production release action.

---

## 25. Phase 20 – Dramatic UI/Layout Exploration (Addendum, PHASE-20-DRAMATIC-UI-LAYOUT-EXPLORATION-SPEC-2026-05-30)

**Plan Version**: 2.3 (addendum). Bound by `CONSTITUTION.md` v3.3, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, the prior plan (Phases 0–19), and `PHASE-20-DRAMATIC-UI-LAYOUT-EXPLORATION-SPEC-2026-05-30.md` (the binding source of truth for this phase). Triggered by the user's Phase 20 spec requesting dramatic UI/layout exploration while preserving every existing mechanic, feature, and behavior exactly.

> Status: **Phase 20 Prompt 1 governance setup complete (`phase_id = 54`)**. This prompt upgrades the constitution for multi-agent workflow, appends this §25 addendum, and records progress. **No layout code, UI implementation, auth fix, game logic, word-list filtering, source files, or tests changed in Prompt 1.** Halt for explicit user approval before Prompt 2 or any Phase 20 implementation.

### 25.1 Scope, Source of Truth, and Operating Rules

- **Source of truth for this phase**: `PHASE-20-DRAMATIC-UI-LAYOUT-EXPLORATION-SPEC-2026-05-30.md` and this §25. If either conflicts with earlier plan language for the narrow concerns of sign-out repair or layout exploration, stop and ask the user; do not infer.
- **Phase goal**: explore and iterate a dramatically improved brrrdle UI/layout that feels premium, modern, immersive, game-like, responsive, polished, and future-proof for later theming work, while preserving all existing gameplay, data, auth, stats, sharing, definitions, settings, accessibility, PWA, and persistence behavior.
- **Phase boundary**: Phase 20 is only the sign-out bug fix plus dramatic UI/layout exploration. No new game modes, no word-list filtering, no canonical game-logic changes, no new monetization mechanics, and no Phase 21 theming/effects work.
- **One variant at a time**: never generate, implement, present, or compare multiple full layout variants in a single review cycle. Finish the active variant's preview/review loop before starting another.
- **Preview before commit/merge**: every layout variant must be shown with a live Vercel preview link whenever available. If a live preview is not available, provide detailed screenshots plus a component breakdown before committing, merging, or carrying the variant forward.
- **Explicit approval required**: no layout code may be committed, merged, or treated as selected until the user explicitly approves that variant. Silence or casual feedback is not approval.
- **About Brrrdle surface**: keep About Brrrdle as a dedicated page-compatible surface, not a required tab-only section, so it can fit whichever final layout wins.
- **Reference-driven design allowed**: Codex and sub-agents may draw heavy inspiration from user-linked websites, games, or design references, but must not copy assets or behavior in a way that breaks project scope, accessibility, or licensing expectations.
- **Multi-agent fit**: if sub-agents are used, the coordinating agent assigns non-overlapping work packets, keeps only one active review variant, consolidates reports, and reruns verification before any gate closes.

### 25.2 Phase 20.0 — Critical Sign-Out Bug Fix (Required First)

The first implementation sub-phase must fix the broken sign-out button reported in the spec: after a user signs in, clicking sign out currently does nothing. This must be completed and verified before any layout variant work begins.

Required implementation behavior:

- Locate the failing sign-out path across `src/app/App.tsx`, `src/account/auth.ts`, `src/account/ProfilePanel.tsx`, `src/account/Settings.tsx`, `src/account/AuthPanel.tsx`, and any tests or mocks that cover Supabase auth.
- Ensure clicking sign out calls the Supabase sign-out path, closes account/profile surfaces as appropriate, clears authenticated UI state, returns the app to an anonymous/unconfigured-safe state, and displays a safe user-facing failure message if the provider rejects the sign-out.
- Preserve guest progress, local settings, stats, history, and resume behavior. Signing out must not reset local guest data unless the user explicitly uses reset/delete flows.
- Add or update focused tests for successful sign-out, sign-out failure messaging, and no accidental local-progress reset.
- Verify auth surfaces manually or with component tests before moving to layout exploration.

### 25.3 Layout Variant Workflow

After 20.0 is verified, each variant follows the same strict loop:

1. **Pre-flight**: re-read this §25 and the spec, inspect current UI files, confirm no dirty unrelated changes, and define the single variant concept in one paragraph.
2. **Implement one variant only**: edit only the minimum UI/layout files required for the active concept. Preserve all props, callbacks, state flows, game mechanics, and existing accessible semantics unless the change improves accessibility without behavior loss.
3. **Verify locally**: run lint, tests, build, API typecheck, and targeted manual/browser checks on mobile/tablet/desktop viewports. Include auth sign-out smoke coverage because 20.0 is a prerequisite.
4. **Preview first**: provide a live Vercel preview link when possible. If unavailable, provide screenshots for key viewports and a concise component breakdown.
5. **User review**: wait for explicit feedback. Iterate the same variant if requested, or abandon it and start a new single variant only when the user asks.
6. **Selection and polish**: once the user chooses a clear favorite, refine only that layout, clean up temporary experimentation, update README screenshots, update CHANGELOG and progress files, rerun full verification, and halt for merge approval.

### 25.4 Final Layout Success Criteria

The final selected Phase 20 layout must:

- Feel materially more polished, engaging, and impressive than the current minimalist UI.
- Preserve all existing behavior exactly: `og`, `go`, daily 5-letter lock, practice 2–35, difficulty tiers, configurable Go count, resume, stats, economy, auth/sync, Word Explorer, definitions, sharing, PWA, sound, and light accent themes.
- Stay responsive and polished on mobile, tablet, and desktop.
- Preserve WCAG AA goals, keyboard navigation, visible focus, status announcements, reduced-motion support, and readable contrast.
- Keep the codebase cleaner and more extensible for future Phase 21 theming/effects work.
- Include updated root `README.md` screenshots of the chosen layout before Phase 20 closes.

### 25.5 Phase 20 Sub-Phase Plan

| Sub-phase | `phase_id` | Title | Scope | Verification |
| --- | --- | --- | --- | --- |
| 20 Prompt 1 | 54 | Governance setup and addendum | `CONSTITUTION.md` v3.3; §25 addendum; progress/changelog tracking | Markdown/governance only; confirm no source changes; `git diff --check`; CSV parse; install baseline |
| 20.0 | 55 | Critical sign-out fix | Minimal auth/UI fix for sign-out button | Focused auth tests; lint; test; build; API typecheck; manual sign-out smoke |
| 20.1 | 56 | Variant 1 pre-flight and implementation | One dramatic layout concept only | Local checks plus live Vercel preview or screenshots before commit/merge |
| 20.N | 57+ | Additional single variants or iterations | Only if the user requests another variant or iteration | Same one-variant loop; each variant gets its own progress row/report |
| 20 final | TBD | Selected layout polish and release gate | Polish chosen layout, README screenshots, cleanup, progress/changelog | Full verification matrix; preview reviewed; explicit user approval before merge/release |

The final ids after 20.1 are assigned sequentially in `progress/PROGRESS.csv` as the user requests variants or iterations. Never overwrite existing progress reports.

### 25.6 Verification and Release Gate

Before declaring any Phase 20 implementation sub-phase complete:

1. `npm run lint` — clean.
2. `npm run test` — all existing tests pass with zero weakened/removed tests.
3. `npm run build` — clean.
4. `npx tsc -p tsconfig.api.json --noEmit` — clean.
5. `git diff --check` — clean.
6. Client-bundle leak check where source changes touch auth, data, API-adjacent, or build surfaces: no `@vercel/blob`, service-role strings, privileged credentials, or new secret-like values in client chunks.
7. Manual/browser smoke: sign-out works; daily/practice `og` and `go` still playable; resume still works; stats/settings/Word Explorer/definitions/sharing still accessible; responsive mobile/tablet/desktop layout; keyboard-only navigation; reduced-motion behavior; no critical console errors.
8. Live Vercel preview link preferred for every layout variant; screenshots plus component breakdown acceptable only when preview is unavailable.

Phase 20 must halt before any merge or production release. The user must explicitly approve the selected variant and any merge/release action.

### 25.7 Phase 20 Exit Checklist

- Sign-out bug fixed first and verified.
- Exactly one layout variant active per review cycle.
- Preview provided before any layout commit/merge; user explicitly approved the selected layout.
- Final layout polished and README screenshots updated.
- All existing features and invariants preserved, including auth, stats, sync, game logic, daily/practice constraints, word data, economy, definitions, sharing, PWA, accessibility, and current light themes.
- `progress/PROGRESS.csv`, relevant `progress/PROGRESS-STEP-*.md`, and `CHANGELOG.md` updated with no secrets.
- Full verification matrix and manual responsive/accessibility smoke checks documented.
- Halt for explicit user approval before merge and before any production release.

---

## 26. Phase 21 – UI Polish & Theming Foundation (Addendum, PHASE-21-UI-POLISH-AND-THEMING-FOUNDATION-SPEC-2026-06-01)

**Plan Version**: 2.5 (addendum). Bound by `CONSTITUTION.md` v3.3, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, the prior plan (Phases 0–20), and `PHASE-21-UI-POLISH-AND-THEMING-FOUNDATION-SPEC-2026-06-01.md` (the binding source of truth for this phase). Triggered by the user's Phase 21 spec requesting that the finalized Phase 20 "Lunar Signal Deck" layout be polished and upgraded — UI, components, and CSS architecture — into a sophisticated, consistent, extensible foundation that is ready for advanced theming in Phase 22, while preserving every existing mechanic 100% intact.

> Status: **Phase 21 Prompt 1 (planning + governance) complete (`phase_id = 59`)**; **Phase 21 Prompt 2 (governance-only refined-instruction update) complete (`phase_id = 60`)**; **Phase 21 Prompt 3 (full execution) complete (`phase_id = 61`)**. Prompt 1 appended this §26 addendum, updated the phase index, and recorded progress. Prompt 2 records the user's refined instructions (minimalist default background; current Lunar Signal Deck visual style preserved as one Phase 22 theme) into the spec, this section, the changelog, and progress tracking. Prompt 3 implemented the foundation: a new `src/theme/surface.ts` surface-theme module (`minimal` default + `lunar-signal`), a minimalist near-black default backdrop with a faint static grid, the original Lunar Signal Deck treatment (signal glow, animated star/moon canvas, scan grid, custom cursor) captured as the single opt-in `lunar-signal` surface gated by a `data-surface` attribute, and a CSS-architecture cleanup that removed dead Phase-20 exploration styles (the `prism` and `command-shell` shells plus the unused `Layout` component). The Lunar Signal Deck **layout and tab structure are preserved**, and every gameplay mechanic, accent theme, stat, definition, auth/sync, resume, economy, and sharing behavior is unchanged. The Phase 22 dramatic theming system itself is **not** implemented — only the foundation.

### 26.0 Refined User Instructions (Prompt 2 Addendum)

After Prompt 1, the user provided additional binding instructions that must be reflected before any Phase 21 implementation begins. They are recorded here as governance-only clarifications (no code changed in Prompt 2):

- Keep the overall **Lunar Signal Deck layout and tab structure** mostly the same.
- Make the **background very minimalist** (plain black or a simple grid pattern is preferred); tone down the current heavier background treatment (aurora bands, glow, depth effects) to this minimalist baseline for the default surface.
- Turn the current Lunar Signal Deck visual style (background, effects, etc.) into **one individual theme** to be enabled in Phase 22 — preserved as a selectable theme rather than the permanent default background.
- The agent **may** polish, upgrade, and improve visual effects, sounds, animations, component structure, and CSS architecture, as long as nothing is broken or significantly removed.
- The agent must **not** change any core gameplay mechanics, word logic, daily/practice rules, difficulty tiers, definitions, stats, economy, auth/sync, resume, sharing, or any other essential features.

These refined instructions take precedence over earlier §26 language where they conflict on the narrow concerns of the default background and the treatment of the Lunar Signal Deck visual style.


### 26.1 Scope, Source of Truth, and Operating Rules

- **Source of truth for this phase**: `PHASE-21-UI-POLISH-AND-THEMING-FOUNDATION-SPEC-2026-06-01.md` and this §26. If either conflicts with earlier plan language for the narrow concerns of UI polish or theming-foundation preparation, stop and ask the user; do not infer.
- **Phase goal**: take the finalized Phase 20 "Lunar Signal Deck" layout and polish/upgrade the entire UI and codebase so it is significantly more sophisticated, consistent, extensible, and ready for advanced, visually awesome theming in Phase 22.
- **Phase boundary**: Phase 21 is UI polish plus a theming *foundation* only. It does **not** implement the Phase 22 dramatic theming system, nor any other future-phase features (consumables shop, calendar, multiplayer, etc.). Only prepare the foundation; do not build future-phase features.
- **Preserve every mechanic 100% intact**: all existing gameplay, data, auth, sync, stats, definitions, sharing, PWA, sound, settings, resume, economy, accessibility, and current accent themes must behave exactly as before. No regressions are acceptable.
- **About Brrrdle remains a dedicated page**: keep the About Brrrdle section as its own dedicated page/route.
- **Maximum autonomy with guardrails**: maximum autonomy is allowed as long as nothing significant is broken or removed; `CONSTITUTION.md` v3.3 governs at all times.
- **One major change set at a time where possible**, using the established 2-prompt workflow (this planning addendum first, then execution).
- **Update tracking surfaces after every major step**: `CHANGELOG.md`, `progress/PROGRESS.csv`, and `progress/PROGRESS-STEP-N.md` must be updated after each major step.

### 26.2 Core Objectives (from the spec)

1. Polish and refine the current Lunar Signal Deck layout to the highest professional standard, keeping the overall layout and tab structure mostly the same while adopting a very minimalist default background (plain black or a simple grid pattern).
2. Improve code organization, component structure, and CSS architecture to make future theming (Phase 22) much easier and more powerful.
3. Ensure the UI feels cohesive, modern, and impressive while preserving every existing mechanic 100% intact.
4. Prepare the codebase for the upcoming planned phases (22–26) without implementing any of their features yet.
5. Update all progress tracking surfaces, changelog, and documentation.

### 26.3 Strict Rules for Execution (from the spec)

- Maximum autonomy is allowed as long as nothing significant is broken or removed.
- Follow `CONSTITUTION.md` strictly at all times.
- Update `CHANGELOG.md` and progress tracking surfaces (`PROGRESS.csv` + `PROGRESS-STEP-N.md`) after every major step.
- Do not implement features from future phases (theming system, consumables shop, calendar, multiplayer, etc.). Only prepare the foundation.
- Keep the About Brrrdle section as a dedicated page.
- One major change set at a time where possible; use the 2-prompt workflow (planning addendum first, then execution).
- After completing the phase, create a PR and merge it (or instruct the user to do so).

### 26.4 Prompt Workflow

| Prompt | `phase_id` | Title | Scope | Verification |
| --- | --- | --- | --- | --- |
| 21 Prompt 1 | 59 | Planning & governance addendum | Append §26; update phase index/header; update progress/changelog | Markdown/governance only; confirm no source changes; `git diff --check`; CSV parse |
| 21 Prompt 2 | 60 | Governance-only refined-instruction update | Record refined instructions (minimalist default background; Lunar Signal Deck visuals → one Phase 22 theme) into spec, §26, changelog, progress | Markdown/governance only; confirm no source changes; `git diff --check`; CSV parse |
| 21 Prompt 3 | 61+ | Full execution of Phase 21 | Polish Lunar Signal Deck layout (mostly preserved); minimalist default background; capture current visual style as one Phase 22 theme; improve component structure and CSS architecture; build theming foundation; update docs/README screenshots | Full verification matrix (§26.6); responsive/accessibility smoke; preview before merge |

The Prompt 3 id(s) are assigned sequentially in `progress/PROGRESS.csv` as the work proceeds. Never overwrite existing progress reports.

### 26.5 Phase Deliverables (from the spec)

1. Polished and upgraded Lunar Signal Deck layout (layout and tab structure mostly preserved) with a very minimalist default background (plain black or a simple grid pattern).
2. Improved theming foundation (CSS variables, component structure, etc.).
3. The current Lunar Signal Deck visual style (background, effects, etc.) captured as **one individual theme** to be enabled in Phase 22 (not the permanent default background).
4. Updated progress files and changelog.
5. Merged PR with the final state.

### 26.6 Success Criteria and Verification Gate

The final Phase 21 result must be:

- Visually cohesive and significantly more polished than before Phase 20.
- Technically excellent and easy to theme in Phase 22.
- Fully responsive and accessible (WCAG AA goals, keyboard navigation, visible focus, status announcements, reduced-motion support, readable contrast).
- Free of any regressions in gameplay, auth, stats, definitions, sync, sharing, PWA, sound, settings, resume, economy, or current accent themes.

Before declaring any Phase 21 implementation step complete:

1. `npm run lint` — clean.
2. `npm run test` — all existing tests pass with zero weakened/removed tests.
3. `npm run build` — clean.
4. `npx tsc -p tsconfig.api.json --noEmit` — clean.
5. `git diff --check` — clean.
6. Client-bundle leak check where source changes touch auth, data, API-adjacent, or build surfaces: no `@vercel/blob`, service-role strings, privileged credentials, or new secret-like values in client chunks.
7. Manual/browser smoke across mobile, tablet, and desktop viewports: daily/practice `og` and `go` still playable; resume, stats, settings, Word Explorer, definitions, sharing, sound, auth/sync, and accent themes intact; About Brrrdle remains a dedicated page; keyboard-only navigation and reduced-motion behavior preserved; no critical console errors; no horizontal overflow.

### 26.7 Phase 21 Exit Checklist

- Lunar Signal Deck layout polished and upgraded to a professional standard, with the overall layout and tab structure mostly preserved and a very minimalist default background (plain black or a simple grid pattern).
- Current Lunar Signal Deck visual style (background, effects, etc.) captured as one individual theme to be enabled in Phase 22, rather than left as the permanent default background.
- Component structure and CSS architecture improved into a clean, extensible theming foundation (CSS variables, tokens, component organization) — without implementing the Phase 22 theming system.
- About Brrrdle kept as a dedicated page.
- All existing features and invariants preserved exactly, including daily 5-letter lock, practice 2–35, difficulty tiers, configurable Go count, resume, stats, economy, auth/sync, Word Explorer, definitions, sharing, PWA, sound, accessibility, and current accent themes.
- `CHANGELOG.md`, `progress/PROGRESS.csv`, relevant `progress/PROGRESS-STEP-*.md`, and documentation/README screenshots updated with no secrets.
- Full verification matrix and responsive/accessibility smoke checks documented.
- Halt for explicit user approval before merge; create and merge the PR (or instruct the user to do so) only after approval.

### 26.8 Phase 21 Addendum – Theme Proposal Templates (Governance Step)

**Source of truth**: `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` (the binding spec for this addendum) and `CONSTITUTION.md` v3.3. This subsection records the user's requested "§26.1" Phase 21 addendum; because the §26.1–§26.7 numbers were already occupied by the Phase 21 UI Polish & Theming Foundation content above, the addendum is recorded here as §26.8 to preserve existing numbering, and the plan version advances to v2.7 (v2.6 was already consumed by the Phase 21 Prompt 3 full-execution amendment).

> Status: **Governance / planning-only step complete (`phase_id = 62`)**. This step binds the new Theme Proposal Templates spec into the plan, records the target repository structure, and updates the changelog and progress tracking. **No theme code, no proposal Markdown files, no CSV population, and no folder creation were performed in this step.** The finalized Phase 21 surface foundation and every existing mechanic remain 100% intact. Full autonomous execution of the template proposals (the "Prompt 3" creative step) requires explicit user approval.

#### 26.8.1 Purpose

This addendum adds a governance + creative-planning step **before the final Phase 21 PR is merged**. In the execution step (separately approved), 5–10 fully fleshed-out **theme proposal template documents** will be authored so that a later phase (Phase 22 and beyond) can implement complete, sophisticated themes. This subsection is the governance record only; it does not author the templates.

#### 26.8.2 Repository Structure to Use

The spec defines the structure as `Themes/proposals/template-proposals/`, `Themes/proposals/full-proposals/`, `Themes/proposals/theme_proposals.csv`, and `Themes/themes.csv`. On disk this is realized (case- and separator-normalized) as:

- `themes/proposals/template_proposals/` — destination for all Markdown template proposal files (currently empty; populated only in the approved execution step).
- `themes/proposals/full_proposals/` — left empty (reserved for later fully implemented themes).
- `themes/proposals/theme_proposals.csv` — to be populated/updated with every proposed template (planned columns: Template Name, Category/Type, Proposed Date, Status (Template), Markdown File, Description/Notes). Left empty in this governance step.
- `themes/proposals/README.md` — documents the folder structure and purpose (updated in this step).
- `themes/themes.csv` — left untouched (reserved for later actual implemented themes).

These folders and placeholder files already exist in the repository; this step does **not** create new folders.

#### 26.8.3 Planned Deliverables (execution step, separately approved)

- `themes/proposals/README.md` (created/updated — done in this governance step).
- 5–10 Markdown files in `themes/proposals/template_proposals/`, including at minimum: (1) an upgraded "Command Center" / "Frozen Command Center" style template, (2) a reusable Country / Nationality theme template, (3) a reusable Holiday / Special Event theme template, and 2–7 additional diverse categories (e.g., Sci-Fi, Nature, Retro, Cyberpunk, Fantasy, Minimal Neon).
- A populated `themes/proposals/theme_proposals.csv`.

Each proposal Markdown file must use a consistent header: Theme Name; Category / Type; Author; Date; Description; Visual Style (preserving correct/incorrect/absent tile distinctions); Special Effects & Animations; Sound Theme; Component / CSS Changes Needed; Implementation Notes for the implementing agent; Future Extensibility Notes.

#### 26.8.4 Strict Rules for This Addendum

- Follow `CONSTITUTION.md` v3.3 strictly.
- Do **not** implement any actual theme code, create proposal Markdown files, populate the CSV, or create folders in this governance step.
- Preserve the current minimalist default background and the Lunar Signal Deck layout/tab structure.
- Update `CHANGELOG.md`, `progress/PROGRESS.csv`, and the relevant `progress/PROGRESS-STEP-N.md` for this governance step (done at `phase_id = 62` / `progress/PROGRESS-STEP-62.md`).
- After the governance updates, halt for explicit user approval before beginning the template-proposal execution step. This addendum must be completed before the final Phase 21 PR is merged.

#### 26.8.5 Prompt Workflow

| Prompt | phase_id | Type | Key activity | Gate |
| --- | --- | --- | --- |
| Addendum Prompt 1 | (spec upload) | Spec authored | User uploads `PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md` | n/a |
| Addendum Prompt 2 | 62 | Governance / planning addendum | Append §26.8; update header/version, phase index, changelog, progress; update `themes/proposals/README.md` | Markdown/governance only; confirm no source changes; `git diff --check`; CSV parse |
| Addendum Prompt 3 | 63+ | Full execution (separately approved) | Author 5–10 template proposals, populate `theme_proposals.csv`, finalize README | Per-spec verification; halt before merging the final Phase 21 PR |

---

## 27. Phase 22 – Advanced Calendar / Midnight Handling + Timezone-Aware Daily Reset (Addendum, PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02)

**Plan Version**: 2.8 (addendum). Bound by `CONSTITUTION.md` v3.3, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, the prior plan (Phases 0–21 plus the §26.8 addendum), and `PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02.md` (the binding source of truth for this phase). Triggered by the user's Phase 22 spec requesting that the daily puzzle system respect the player's local device time, mitigate easy gaming of the daily reset, add a lightweight cross-page countdown indicator, provide a subtle reset alert (visual + a brand-new unique sound), add a developer-only Simulate Time debug tool, and design the rollover logic modularly so a future multiplayer daily variant can reuse it — all while preserving every existing mechanic 100% intact.

> Status: **Phase 22 Prompt 1 (planning + governance only) complete (`phase_id = 64`)**. This step appends this §27 addendum, makes Phase 22 the active next phase in the Current Phase Index, references the spec, and records the goals, scope, deliverables, verification requirements, and two-prompt workflow. **No daily-rollover, timezone, anti-gaming, countdown, reset-alert, sound, dev-tool, modular-refactor, or bug-fix source code was implemented in this step.** The finalized Phase 21 surface foundation and every existing mechanic remain 100% intact. Full execution (Prompt 2) requires explicit user approval.

### 27.1 Scope, Source of Truth, and Operating Rules

- **Source of truth for this phase**: `PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02.md` and this §27. If either conflicts with earlier plan language on the narrow concerns of daily rollover, timezone handling, the countdown indicator, reset alerts, the dev Simulate Time tool, or the modular daily-reset architecture, stop and ask the user; do not infer.
- **Phase goal**: make the daily puzzle system roll over at **local midnight in the player's device timezone**, add balanced anti-gaming safeguards, surface a non-intrusive cross-page countdown, play a brand-new unique reset alert, ship a dev-only Simulate Time tool, and prepare the rollover logic for a future multiplayer daily variant.
- **Phase boundary**: Phase 22 implements the calendar/midnight/timezone work, the countdown + reset alert, the global Settings toggle, the dev-mode Simulate Time tool, the modular design *preparation*, and any small discovered bug fixes only. It does **not** implement any actual multiplayer daily functionality, the dramatic theming system, a consumables shop, or other future-phase features.
- **Preserve every mechanic 100% intact**: all existing daily completion records, resume slots, per-mode stats, sync behavior, guest/signed-in consistency, and the rest of the app must behave exactly as before. No regressions are acceptable.
- **Strict invariants (must never break)**: daily puzzles remain **exactly 5 letters**; practice mode continues to support lengths **2–35**; no changes to multiplayer, marketplace, or economy systems; guest and signed-in progress/sync remain consistent.
- **Maximum autonomy with guardrails**: the agent may automatically fix small bugs and make obvious improvements discovered during exploration/implementation, documenting every such change in the progress surfaces; `CONSTITUTION.md` v3.3 governs at all times.
- **Update tracking surfaces after every major step**: `CHANGELOG.md`, `progress/PROGRESS.csv`, and `progress/PROGRESS-STEP-N.md` must be updated after each major step.

### 27.2 Primary Goals (from the spec)

1. Daily puzzles roll over at **local midnight** in the player's device timezone (using reliable browser APIs; reasonable for travelers / timezone changes).
2. Mitigate casual gaming of the daily reset via device time manipulation (balanced approach).
3. Add a **non-intrusive countdown indicator** visible on every page/tab by default (toggleable in Settings), clickable to navigate to the daily game, and theme-ready (CSS variables / data attributes).
4. When a new daily becomes available, show a subtle, non-modal visual alert + play a **brand-new unique sound** (not reused from any existing sound) that clearly signals "new daily is available."
5. Add a hidden developer-only "Simulate Time" floating button (dev mode only) with a panel to set a specific date/time, jump by hours/days, and reset to real device time. Must never appear in production builds.
6. Automatically fix any small bugs / make obvious improvements discovered during the work (documented in the progress surfaces).
7. Design the daily reset / rollover logic modularly (e.g., dedicated service or hook) so it can later support a special multiplayer daily variant with separate statistics — without implementing multiplayer in this phase.

### 27.3 Anti-Gaming Policy (balanced, from the spec)

- Allow normal drift and small adjustments (±~2 hours).
- Clamp or ignore forward jumps larger than ~12–24 hours.
- On detection, keep the previous daily or show a clear, friendly message.
- Goal: make casual cheating ineffective without being overly strict.

### 27.4 What Claude Must Do First (Prompt 2, before writing code)

Before writing any Phase 22 code, the agent must:

1. Thoroughly explore and document the current daily puzzle system (generation, completion tracking, storage, rollover logic, and all dependent UI surfaces).
2. Produce a short internal mapping of key files and decision points.
3. Identify where the current rollover decision lives and how timestamps are stored/computed (today this lives in `src/data/daily.ts`, which derives the daily `dateKey` from UTC via `toISOString().slice(0, 10)` and is the primary surface Phase 22 must make timezone-aware).

### 27.5 Scope Summary (from the spec)

**In Scope**

- Local-midnight daily rollover with timezone awareness.
- Balanced anti-gaming safeguards.
- Non-intrusive countdown indicator visible across all pages + clickable + theme-ready.
- Subtle non-modal reset visual alert + brand-new unique reset sound.
- Global Settings toggle that disables the countdown + reset alerts.
- Hidden dev-mode floating Simulate Time button + panel.
- Modular design preparation for a future multiplayer daily variant.
- Any small discovered bug fixes/improvements (documented).
- Tests (including time mocking), documentation, and progress tracking updates.

**Out of Scope**

- Changing daily word length (stays 5).
- Any actual multiplayer implementation.
- Per-tab hide/minimize of the countdown (global toggle only).
- Major UI redesign or new full screens.
- Large-scale refactoring.

### 27.6 Phase Deliverables (from the spec)

1. Updated daily-handling code with local-midnight rollover + anti-gaming logic.
2. Countdown indicator (visible on all pages, clickable, theme-ready) + reset alert (subtle visual + brand-new unique sound).
3. Global Settings toggle for the countdown + alerts.
4. Hidden dev-mode floating Simulate Time button + panel.
5. Modular structure prepared for a future multiplayer daily.
6. New/updated tests (including time mocking).
7. Any discovered bug fixes (documented).
8. Updated `CHANGELOG.md` and progress tracking surfaces.
9. Clear manual testing notes.

### 27.7 Prompt Workflow

| Prompt | `phase_id` | Title | Scope | Verification |
| --- | --- | --- | --- | --- |
| 22 Prompt 1 | 64 | Planning & governance addendum | Append §27; bump plan to v2.8; update phase index/roadmap; update changelog + progress | Markdown/governance only; confirm no source changes; `git diff --check`; CSV parse |
| 22 Prompt 2 | 65+ | Full execution of Phase 22 | Timezone-aware local-midnight rollover + anti-gaming; cross-page clickable theme-ready countdown; subtle reset alert + brand-new unique sound; global Settings toggle; dev-mode Simulate Time tool; modular daily-reset design; documented bug fixes; tests (time mocking); manual testing notes | Full verification matrix (§27.8); responsive/accessibility smoke; preview before merge |

The Prompt 2 id(s) are assigned sequentially in `progress/PROGRESS.csv` as the work proceeds. Never overwrite existing progress reports.

### 27.8 Success Criteria and Verification Gate

The final Phase 22 result must:

- Reliably roll over daily puzzles at the player's local midnight.
- Mitigate reasonable gaming attempts via large forward time jumps.
- Show a countdown that is visible across the app, non-intrusive (especially on mobile), clickable, and theme-ready.
- Play the reset alert (subtle visual + brand-new unique sound) when the daily becomes available.
- Correctly disable the countdown + alerts via the Settings toggle.
- Provide a useful dev-mode Simulate Time tool that never appears in production.
- Keep the daily reset logic modular and ready for a future multiplayer daily variant.
- Introduce no regressions in existing behavior, and preserve all strict invariants (§27.1).

Before declaring any Phase 22 implementation step complete:

1. `npm run lint` — clean.
2. `npm run test` — all existing tests pass with zero weakened/removed tests, plus new time-mocking tests for rollover/anti-gaming.
3. `npm run build` — clean.
4. `npx tsc -p tsconfig.api.json --noEmit` — clean.
5. `git diff --check` — clean.
6. Client-bundle leak check where source changes touch auth, data, API-adjacent, or build surfaces.
7. Manual/browser smoke across mobile, tablet, and desktop viewports: local-midnight rollover, anti-gaming clamp, countdown visibility/click/theme-readiness, reset alert + unique sound, Settings toggle, and the dev Simulate Time tool (dev only) all behave per spec; daily/practice `og` and `go`, resume, stats, definitions, sharing, sound, auth/sync, and accent/surface themes intact; no critical console errors; no horizontal overflow.

### 27.9 Phase 22 Exit Checklist

- Timezone-aware local-midnight daily rollover implemented with balanced anti-gaming safeguards.
- Cross-page, clickable, theme-ready countdown indicator implemented.
- Subtle non-modal reset visual alert + brand-new unique reset sound implemented.
- Global Settings toggle disables the countdown + reset alerts.
- Hidden dev-mode floating Simulate Time button + panel implemented and excluded from production builds.
- Daily reset logic refactored into a modular service/hook ready for a future multiplayer daily variant (no multiplayer implemented).
- Any discovered bug fixes/improvements applied and documented.
- All strict invariants preserved (daily = 5 letters; practice 2–35; no multiplayer/marketplace/economy changes; guest/signed-in sync consistent; existing completion records, resume slots, and per-mode stats intact).
- `CHANGELOG.md`, `progress/PROGRESS.csv`, the relevant `progress/PROGRESS-STEP-*.md`, and documentation/manual-testing notes updated with no secrets.
- Full verification matrix and responsive/accessibility smoke checks documented.
- Halt for explicit user approval before creating or merging any PR.

### 27.10 Phase 22 Addendum – Calendar (Central Daily Hub) & Countdown Positioning (Governance Step, PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03)

**Source of truth**: `PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md` (the binding spec for this addendum), `CONSTITUTION.md` v3.3, and the existing Phase 22 work (§27.1–§27.9, the `src/daily/` service, and `DailyCountdown.tsx` from Prompt 2). This subsection extends Phase 22; it is recorded as §27.10 to preserve existing §27.1–§27.9 numbering. The plan version advances to **v2.9** (v2.8 was consumed by the original §27 Prompt 1 amendment).

> Status: **Governance / planning-only step complete (`phase_id = 66`); full execution complete (`phase_id = 67`).** The governance step bound the new Calendar & Countdown Positioning spec into the plan; the execution step then implemented it in full — the Calendar is now the first navigation tab and central hub for all dailies (current + past, OG + GO) with "Play Today's OG/GO" buttons, coin-gated past dailies (fixed **60 coins**, one-guess-permanently-unlocks), past dailies as full daily experiences, the dedicated OG/GO Daily tabs removed (legacy deep links redirect into the Calendar), calendar history fixed to start **January 1, 2025**, and the daily countdown repositioned to the top of the UI. The finalized Phase 21 surface foundation and every existing mechanic — including the Phase 22 Prompt 2 daily-cycle work — remain 100% intact. Halting for explicit user review before creating the Phase 22 PR.

#### 27.10.1 Purpose and Relationship to Prior Phase 22 Work

This addendum builds directly on the modular `src/daily/` service and `DailyCountdown.tsx` created during Phase 22 Prompt 2 (`phase_id = 65`). It adds a full **Calendar** feature that becomes the central hub for accessing both current and past daily puzzles (replacing the previous separate dedicated daily tabs) and repositions the countdown indicator from the bottom to the top of the UI. The local-midnight rollover, anti-gaming guard, reset alert, unique sound, Settings toggle, and dev Simulate Time tool delivered in Prompt 2 are all preserved and reused; the calendar and countdown work layer on top of them.

#### 27.10.2 Calendar Feature (Central Hub for All Dailies)

- **Central navigation role**: the Calendar becomes the **first tab** in the top horizontal navigation and the single source of truth for all daily play (current and historical). The previous separate dedicated "OG Daily" and "GO Daily" tabs are removed / fully integrated into the Calendar experience.
- **Visual design**: a clean monthly calendar view (optional weekly overview); each day clearly indicates OG and GO daily completion status; the current day is prominently highlighted using the Prompt 2 local-midnight logic; current streak and longest streak are displayed prominently on or near the calendar; fully theme-ready via the existing `data-surface` + CSS-variable/accent-token system.
- **Prominent quick-access buttons**: clear, prominent **"Play Today's OG"** and **"Play Today's GO"** buttons for fast access to the current day's dailies.
- **Accessing past dailies**: every calendar day exposes separate OG and GO entry points. Clicking a past day's button opens a confirmation modal offering either (a) pay a fixed coin cost to unlock and play that daily, or (b) cancel/close. Today's dailies load normally with no coin cost.
- **Unlock persistence**: once a user makes **at least one guess** on a past daily instance, that specific instance remains **permanently unlocked** (it does not re-lock after the next calendar day begins).
- **Full daily experience**: unlocked past dailies are treated as full daily experiences — full stats recording, hard-mode support, resume functionality, definitions, etc. — for consistency with current daily play. Partial progress must persist correctly.

#### 27.10.3 Coin Cost for Past Dailies

- One **fixed** coin cost applies to unlocking any past daily, **identical across OG and GO modes**.
- The spec asks the agent to select and justify a specific value in the suggested range **50–75 coins** (≈ the coin earnings from ~5 average-performance practice games). **Recommended value (pending user confirmation): 60 coins** — a round mid-range figure that sits comfortably within the suggested band and is non-trivial without discouraging exploration. The final value is to be confirmed by the user before execution.
- The cost integrates with the existing coin economy and spending paths; no other economy/marketplace changes are introduced.

#### 27.10.4 Countdown Indicator Repositioning

- Move the countdown from the **bottom** of the screen to the **top** of the UI on all pages, in a **context-aware** way:
  - **Landing / Home page**: near the existing daily-puzzle status area and the user login/status information.
  - **Game / tab pages**: near the top-right account/user area (cleanest horizontal placement relative to the account pill; exact placement chosen during execution).
- Keep it non-intrusive (especially on mobile), still clickable (navigates to the current daily), and fully theme-ready.
- The existing global Settings toggle ("Daily countdown & reset alerts") continues to control its visibility and reset-alert behavior.

#### 27.10.5 Strict Rules and Preserved Invariants

- Build on the existing `src/daily/` service and `DailyCountdown.tsx`; do not regress the Prompt 2 rollover/anti-gaming/reset-alert/sound/Settings/dev-tool behavior.
- Preserve every invariant: daily puzzles remain **exactly 5 letters**; practice supports **2–35**; stats, economy (beyond the new fixed past-daily cost), auth/sync, resume behavior, and guest/signed-in consistency all remain intact.
- The calendar and repositioned countdown must feel cohesive with the Lunar Signal Deck layout and the minimalist default surface, and must be fully theme-ready.
- Strictly follow `CONSTITUTION.md` v3.3; update `CHANGELOG.md` and progress tracking after every major step; document any extra improvements discovered; halt for explicit user approval before creating the final Phase 22 PR.

#### 27.10.6 Planned Deliverables (Execution Step, Separately Approved)

1. Fully functional Calendar as the first navigation tab — the central hub for all daily access (current + past, OG + GO).
2. Prominent "Play Today's OG" and "Play Today's GO" buttons on the calendar.
3. Coin-gated unlocking flow for past dailies with the "one guess = permanently unlocked" persistence rule and the confirmed fixed cost.
4. Unlocked past dailies treated as full daily experiences (stats, hard mode, resume, definitions).
5. Repositioned, context-aware countdown at the top of all pages (landing vs. game tabs).
6. Necessary updates to navigation, routing, and state management; removal/integration of the old dedicated daily tabs.
7. Updated tests covering the new flows; documentation of any additional improvements discovered.

#### 27.10.7 Prompt Workflow

| Prompt | `phase_id` | Title | Scope | Verification |
| --- | --- | --- | --- | --- |
| 22 Addendum Prompt 1 | 66 | Calendar & Countdown Positioning planning/governance | Append §27.10; bump plan to v2.9; update phase index; update changelog + progress | Markdown/governance only; confirm no source changes; `git diff --check`; CSV parse |
| 22 Addendum Prompt 2 | 67 | Full execution (separately approved) — **complete** | Added `src/calendar/` (model + `CalendarPanel`) as the central first-tab daily hub with "Play Today's OG/GO" buttons, month grid (Jan 1 2025 → today) with completion/lock badges, OG/GO streak + coin readouts, and a 60-coin unlock confirmation modal; `src/daily/pastDailies.ts` (cost/start-date + unlock helpers); additive `unlockedDailies` persistence + migrate + cloud merge; `affectsStreak` stat flag (past dailies record stats but never patch streaks); per-date daily session storage; OG/GO games accept `pastDailyDateKey` + first-guess unlock; legacy `og-daily`/`go-daily` routes hidden and redirected into the Calendar; countdown moved into the top account stack | `npm run lint` clean; `npm run test` 390/390; `npm run build` succeeds; `tsc -b` clean; `git diff --check` clean; CodeQL reviewed; halt before creating the final Phase 22 PR |

#### 27.10.8 Open Questions / Recommendations for the User — RESOLVED

All four open questions were answered by the user and applied in the `phase_id = 67` execution:

1. **Past-daily coin cost** — Confirmed **60 coins** (fixed; same for OG and GO).
2. **Streak semantics on the calendar** — Confirmed: unlocked past dailies record full stats but do **not** retroactively affect or patch streak continuity (streaks reflect natural current-day play only).
3. **Tab removal scope** — Confirmed: the dedicated OG Daily / GO Daily tabs are fully removed; the Calendar is the single source of truth, and legacy deep links redirect into the Calendar with the appropriate mode/day pre-selected.
4. **Calendar history depth** — Confirmed: fixed start date **January 1, 2025** (not rolling); any daily from 2025-01-01 onward is selectable; earlier days are out of scope.


---

## 28. Phase 23 – Multiplayer Foundations and Polish

**Source of truth**: `PHASE-23-MULTIPLAYER-FOUNDATIONS-AND-POLISH-SPEC-2026-06-03.md`, `CONSTITUTION.md` v3.4, and this §28 addendum. If this section conflicts with the spec on Phase 23 scope or sequencing, stop and ask the user rather than inferring.

> Status: **Stage 1 complete under `phase_id = 69`; Stage 2 planning documented under `phase_id = 70`; multi-agent workflow scaffolding documented under `phase_id = 71`; Stage 2 implementation complete and verified under `phase_id = 72`; Stage 3 planning documented under `phase_id = 73`; Stage 3 implementation complete under `phase_id = 74`; Stage 3 stabilization complete under `phase_id = 75`; account-backed multiplayer/UX stabilization follow-up complete under `phase_id = 76`; next stabilization follow-up planning documented under `phase_id = 77`; §28.13 follow-up implemented under `phase_id = 78`; Stage 4 planning documented under `phase_id = 79`; Stage 4 implemented under `phase_id = 80`; Stage 5 planning documented under `phase_id = 81`; Stage 5 implemented and verified under `phase_id = 82`-`85`; Stage 6 planning documented under `phase_id = 86`; Stage 6 real multiplayer testing addendum and Stage 7 planning documented under `phase_id = 87`; Stage 6 implemented and verified under `phase_id = 88`-`90`; Stage 6 safety backup to GitHub `main` authorized/tracked under `phase_id = 91`; Stage 7 execution and verification tracked under `phase_id = 92`-`94`; Stage 8 planning documented under `phase_id = 95`; Stage 8 implementation and verification tracked under `phase_id = 96`-`97`; Stage 9 planning documented under `phase_id = 98`; Stage 9 implementation and verification tracked under `phase_id = 99`-`100`; Stage 10 planning documented under `phase_id = 101`; Stage 10 implementation and final stabilization are complete under `phase_id = 102`-`109`; Stage 12 planning and implementation are complete under `phase_id = 110`-`113`.** Phase 23 is intentionally staged. Stage 1 covers bug fixes, foundations, async/turn-based multiplayer, Calendar/countdown updates, and persistence. Stage 2 covered live/real-time foundations that were later retired by Stage 8. Stage 3 covers advanced multiplayer/ELO, scoring, matchmaking, custom games, and competitive persistence. Stabilization corrected online transport/ownership defects, account-backed matchmaking, gameplay parity, auth recovery, mobile UI regressions, realtime Daily Multiplayer refresh/entry behavior, daily participation limits, separate answer variants, rival identity, countdown navigation, creator cancellation, per-user active limits, spectator foundations, Stage 5 multiplayer UX/correctness issues, Stage 6 realtime/Daily cancellation stability bugs, Stage 7 whole-game audit fixes, unified Multiplayer correctness, timed Practice clock stability, and final broad stabilization. Stage 8 unified the active multiplayer experience into one durable Multiplayer model, added Practice Multiplayer chess-clock limits, preserved Daily Multiplayer as strictly asynchronous, and removed the mounted Live paths that were causing complexity and memory pressure. Stage 9 fixed timed Practice Multiplayer clock/board synchronization, added optional Practice Multiplayer Hard Mode, and implemented multiplayer scoring. Stage 10 fixed cross-client board/keyboard synchronization and related multiplayer state consistency bugs. Stage 12 fixed Practice Multiplayer Hard Mode enforcement, multiplayer responsiveness, lobby/turn propagation observations, on-screen keyboard responsiveness, sound playback, and redundant realtime row churn. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, and later phase work remain gated until the user explicitly approves them.

### 28.1 Stage Structure

1. **Stage 1 — Foundations + Bug Fixes + Async/Turn-based Core**: complete under `phase_id = 69`.
2. **Stage 2 — Live / Real-time Multiplayer Features**: complete and verified under `phase_id = 72`.
3. **Stage 3 — Advanced Multiplayer Features**: ELO, matchmaking, scoring, custom games, and related refinements; planning documented under `phase_id = 73`, implementation complete under `phase_id = 74`.
4. **Stage 4 — Daily Multiplayer Fixes & Spectator Foundations**: planned under §28.15 and implemented under §28.16 from `PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md`; complete under `phase_id = 79`-`80`.
5. **Stage 5 — Multiplayer UX Fixes & Polish**: planned under §28.17 and implemented under §28.18 from `PHASE-23-STAGE-5-MULTIPLAYER-UX-FIXES-AND-POLISH-SPEC-2026-06-05.md`; complete under `phase_id = 82`-`85`.
6. **Stage 6 — Live Multiplayer Stability & Daily Claim Fixes**: implemented and verified under §28.19 from `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md`.
7. **Stage 7 — Whole-Game Autonomous Bug Bash & Stabilization**: planned under §28.20 and implemented under §28.22-§28.24; complete under `phase_id = 92`-`94`.
8. **Stage 8 — Multiplayer Unification + Time-Limited Practice Games**: planned under §28.25 and implemented under §28.26 from `PHASE-23-STAGE-8-MULTIPLAYER-UNIFICATION-AND-TIME-LIMITS-SPEC-2026-06-05.md`; complete under `phase_id = 96`-`97` and awaiting user review before any PR, merge, release, dedicated Multiplayer tab work, or later-stage work.
9. **Stage 9 — Timer Bugs + Multiplayer Hard Mode + Multiplayer Scoring**: implemented and verified under §28.28 from `PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md`; PR/merge/release and later work remain gated.
10. **Stage 10 — Multiplayer Debugging and Bug Fixes**: planned under §28.29 and implemented/verified under §28.30-§28.32 from `PHASE-23-STAGE-10-MULTIPLAYER-DEBUGGING-AND-BUGFIXES-SPEC-2026-06-06.md`; complete under `phase_id = 101`-`103`.
11. **Stage 12 — Multiplayer Hard Mode Enforcement + Performance & Responsiveness Fixes**: planned under §28.38 and implemented/verified under §28.39-§28.41 from `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md`; complete under `phase_id = 110`-`113` and awaiting user review before any PR, merge, release, dedicated Multiplayer tab work, spectator expansion, or later-stage work.
12. **Stage 13 — Practice Solo UX Bugs + Multiplayer GO Result Propagation Fix**: planning documented under §28.42 from `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md`; implementation remains gated until explicit user authorization.

### 28.2 Stage 1 Binding Requirements

- Fix the Stage 1 bug list: dynamic landing title (`COMMAND CENTER`), outside-click dismissal for popups/modals, mobile-safe Settings tooltips, mobile-safe Calendar indicators, and hidden answer/definitions on loss until the player explicitly declines continuation.
- Fully introduce the `DailyVariant` system with a solo/local daily variant and a multiplayer/UTC daily variant.
- Build an async/turn-based multiplayer foundation for Practice and Daily modes without disrupting solo gameplay.
- Practice async multiplayer supports word lengths 2-35, no time limit, persistent turns, and up to five active async games.
- Daily async multiplayer is current-day only for active play, uses midnight UTC, expires unfinished games when the UTC day changes, and exposes past daily multiplayer games as view-only archives with full move history, final answer, and definitions.
- Calendar must show distinct OG/GO indicators for both solo and multiplayer.
- Add a second Daily Multiplayer countdown near the solo countdown, controlled by its own Settings toggle and unique reset sound.
- Preserve all existing solo mechanics: daily OG/GO, practice OG/GO, difficulty tiers, Word Explorer, definitions, stats, auth/sync, sounds, themes, economy, resume, sharing, and admin behavior.

### 28.3 Stage 1 Implementation Summary

- `src/ui/Dialog.tsx` and `src/ui/Tooltip.tsx` gained outside-click/tap dismissal and mobile-safe tooltip placement.
- `src/app/LunarSignalStage.tsx` exposes a dynamic `commandTitle` with `Command Center` as the default.
- OG/GO session serialization now preserves explicit answer-reveal loss state, and OG/GO gameplay hides answers, share output, and definitions until the player explicitly chooses reveal instead of continuing.
- `src/daily/` now supports the `multiplayer` `DailyVariant` with UTC day keys, UTC reset math, countdown labels, and a separate storage namespace.
- `src/sound/soundEngine.ts` adds the unique `daily-multiplayer-reset` event.
- `src/account/` schema v5 adds `dailyMultiplayerCountdownEnabled` and persisted async multiplayer progress with guest/cloud merge support.
- `src/multiplayer/` adds the async multiplayer model and UI panel: game creation, turn submission, move history, answer/definition archive display, daily expiry, and the five-active-game cap.
- `src/calendar/CalendarPanel.tsx` adds Daily Multiplayer access, view-only past daily multiplayer archives, and four per-day text indicators: solo OG, solo GO, multiplayer OG, multiplayer GO.
- `src/app/App.tsx` wires multiplayer state persistence, UTC expiry, the second countdown, Settings updates, and Practice/Calendar multiplayer entry points.

### 28.4 Verification and Gate

Stage 1 must end with:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. `npx tsc -p tsconfig.api.json --noEmit`
5. `git diff --check`
6. Browser smoke on desktop and mobile-sized viewports

After Stage 1 verification, halt for user review. Do not begin Stage 2 or create the Phase 23 PR until explicitly approved.

### 28.5 Stage 2 Planning — Live / Real-time Multiplayer Features (Governance Only)

**Authorization status**: planning documented only. Do not implement Stage 2 until the user explicitly approves a Stage 2 execution prompt.

Stage 2 will add live/real-time multiplayer on top of the Stage 1 async model. The implementation should reuse the existing multiplayer vocabulary (`mode`, `scope`, `DailyVariant`, UTC daily deadline, player ids, status, move history) but introduce a distinct live-match layer so async games and live games do not collide in persistence, UI, or stats.

#### 28.5.1 Proposed Technical Approach

- **Backend transport**: prefer Supabase Realtime channels backed by persistent Postgres rows, since the project already uses Supabase auth/sync. Realtime should be treated as a transport for presence and live updates; the durable match record must still live in storage so reloads, reconnects, and cross-device resume are possible.
- **Durable match model**: introduce live-specific models parallel to `src/multiplayer/asyncMultiplayer.ts`, likely `src/multiplayer/liveMultiplayer.ts`, with explicit match phases: `lobby`, `word-length-selection`, `countdown`, `playing`, `finished`, `aborted`, and `expired`.
- **Realtime repository seam**: create a narrow abstraction such as `LiveMultiplayerRepository` so UI code can operate against a typed interface. The first implementation can use Supabase; tests can use an in-memory fake. This prevents live UI from depending directly on Supabase client calls.
- **Presence and clock policy**: live play needs a server-time anchor for phase deadlines. Use server timestamps where possible; client timers should be display-only and reconciled against authoritative match timestamps.
- **Daily Multiplayer live variant**: reuse the Stage 1 multiplayer `DailyVariant` UTC date key and deadline. Live Daily Multiplayer must be available only for the current UTC day and must expire/abort at midnight UTC.
- **Practice Multiplayer live variant**: support all word lengths 2-35 through the required pre-game word-length selection phase. Do not assume both players choose the same length before matching.
- **No local-only live state as source of truth**: local state may drive optimistic UI, but the match result, guesses, winner, abort reason, and timestamps must be recoverable from durable match records.

#### 28.5.2 Likely Files and Modules

- `src/multiplayer/liveMultiplayer.ts` — framework-agnostic live match types, phase reducer, scoring-free winner resolution, deadline handling, and serialization.
- `src/multiplayer/liveRepository.ts` or `src/multiplayer/supabaseLiveRepository.ts` — typed persistence/realtime adapter.
- `src/multiplayer/LiveMultiplayerPanel.tsx` — shared live lobby/match shell for Practice and Daily entry points.
- `src/multiplayer/WordLengthSelectionPanel.tsx` — dedicated pre-game screen for the required 1-minute Practice Live word-length choice.
- `src/multiplayer/liveMultiplayer.test.ts` and repository fake tests — deterministic tests for phase transitions, timeout/abort behavior, word-length selection, and winner resolution.
- `src/app/App.tsx` — route-level state wiring and auth/sync integration, kept thin.
- `src/calendar/CalendarPanel.tsx` — Daily Live Multiplayer entry point and UTC deadline messaging.
- `src/account/storageSchema.ts` / `guestStorage.ts` / `guestTransfer.ts` — only if local guest live state needs durable queueing or recovery beyond Supabase rows.
- Supabase SQL migrations or schema docs — likely needed for live lobbies/matches, participants, events, and optional presence metadata. Any migration must include RLS rules and tests/review notes.

#### 28.5.3 Live Match Data Model — Proposed Shape

Stage 2 should distinguish:

- **Lobby records**: discovery/matchmaking state, scope (`practice`/`daily`), mode (`og`/`go`), live/async kind, optional requested constraints, created/updated timestamps, and participant count.
- **Match records**: durable match id, daily UTC key when applicable, selected word length, difficulty, mode, scope, phase, players, first player id, current winner/result, deadline timestamps, and final answer references.
- **Event records**: append-only events for joins, ready state, word-length choices, guesses, phase transitions, disconnects/reconnects, aborts, expiry, and finish. Event streams make debugging easier and reduce race-condition ambiguity.
- **Client projection**: a derived view used by React components. Components should render from this projection and submit commands, not directly mutate records.

This model intentionally leaves ELO/rating fields out of Stage 2 except for nullable future-safe placeholders if they simplify Stage 3. Do not implement ELO scoring early.

#### 28.5.4 Practice Live Word-Length Selection

The spec requires a dedicated pre-game screen:

- After a match forms, both players have **1 minute** to choose a preferred word length.
- Players may change their choice during the minute.
- If one player chooses and the other does not, the chosen length wins.
- If both choose different lengths, select randomly between the two with a non-skippable bounce/highlight animation before locking the result.
- If neither chooses, abort the match.
- The random choice must be recorded in the durable match/event log so both clients converge on the same result after reconnect.
- The animation is UI-only; the chosen result should be committed once, then displayed consistently.

#### 28.5.5 Gameplay Semantics for Live Matches

- **Practice Live**: no UTC deadline; optional time limits may be offered only if they do not conflict with the required word-length selection. First player is random after the pre-game phase.
- **Daily Live**: current UTC day only; current day key comes from the multiplayer `DailyVariant`; matches must expire at midnight UTC.
- **Simultaneous vs turn semantics**: the spec says players play simultaneously. Stage 2 should model live play as simultaneous submissions against the same puzzle state where appropriate, with deterministic tie handling if both clients finish nearly at once. If a turn-like interaction is retained for any mode, document the reason and confirm with the user before implementation.
- **Definitions and reveal**: finished live matches may reuse existing definition surfaces. Do not reveal answers before match completion or expiry.
- **Stats/economy**: keep solo stats unchanged. Multiplayer stats can be tracked separately or deferred to Stage 3, but Stage 2 must not corrupt existing solo statistics, streaks, coins, or resume lanes.

#### 28.5.6 UX and Navigation Plan

- Keep **Daily** entry through the Calendar. Add Daily Live Multiplayer alongside the Stage 1 Daily Async Multiplayer surface, clearly labeled.
- Keep **Practice** entry through the Practice tab. Add a live lobby surface near the async multiplayer panel, but avoid crowding the solo game area.
- Make live status obvious: looking for player, matched, selecting length, countdown, playing, finished, reconnecting, opponent disconnected, aborted, expired.
- Provide graceful anonymous/local-only messaging. If true live play requires Supabase authentication, say so in the UI and provide an account path rather than failing silently.
- Preserve mobile layout first: live lobbies and the word-length selection screen must fit common phone widths and be usable by touch.

#### 28.5.7 Risks and Mitigations

- **Race conditions**: use append-only events and server timestamps; make reducers idempotent.
- **Clock drift**: use server-authoritative phase timestamps; client timers are display-only.
- **Disconnects**: store match phases durably and support reconnect/resume; define timeout/forfeit behavior before implementation.
- **Authentication/RLS**: live multiplayer will likely require stronger Supabase policies than guest local progress. Design RLS before writing UI that depends on it.
- **Daily UTC expiry**: keep Daily Live tied to the existing multiplayer `DailyVariant`; test around UTC boundary.
- **Bundle/UI complexity**: keep live logic in `src/multiplayer/`; do not spread realtime command handling across `App.tsx` or gameplay components.

#### 28.5.8 Stage 2 Verification Plan

Stage 2 execution must include:

1. Unit tests for the live match reducer and word-length selection phase.
2. Repository/fake tests for realtime command handling and reconnect projections.
3. Component tests for lobby, pre-game screen, live match status, and Daily Live entry points.
4. Full local gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`.
5. Browser smoke across desktop and mobile for Practice Live, Daily Live, reconnect/refresh, and UTC deadline messaging.
6. Supabase/RLS review if migrations are added.

### 28.6 Stage 3 Planning — Advanced Multiplayer Features (Governance Only)

**Authorization status**: planning documented only under `phase_id = 73`. Do not implement Stage 3 until the user explicitly approves a Stage 3 execution prompt.

Stage 3 should add skill-based ratings, ranked matchmaking, custom games, scoring/performance tracking, and multiplayer stats by layering on top of the Stage 1 async model and Stage 2 live model. It must not rewrite canonical solo gameplay rules in `src/game/`, corrupt existing solo stats/economy/resume lanes, or blur the user-visible separation between Daily via Calendar and Practice via Practice tab.

#### 28.6.1 Stage 3 Product Goals

- Give players a clear multiplayer skill signal through a conservative ELO-style rating system.
- Improve basic Stage 2 lobby matching with fair ranked matchmaking that considers rating, mode, scope, transport (`async` vs `live`), wait time, and daily eligibility.
- Add custom/unranked games so players can invite or replay friends without distorting ranked ratings.
- Add explainable multiplayer scoring/performance summaries without changing Wordle/Hurdle answer validation or tile coloring.
- Add multiplayer stats surfaces separate from solo stats so solo streaks, coins, XP, history, and resume behavior remain intact.
- Preserve the Stage 2 live/realtime architecture so Stage 3 is mostly additive: new rating/scoring/matchmaking modules, new persistence records, and UI surfaces that consume existing async/live match results.

#### 28.6.2 Rating Model

Use a compact ELO-style rating model rather than a complex hidden MMR system for the first ranked release.

- **Rating buckets**: keep ratings separate by transport and mode to avoid mixing fundamentally different skill profiles:
  - `async:og`
  - `async:go`
  - `live:og`
  - `live:go`
- **Scope handling**: start with Practice-ranked matches as the primary rating source. Daily ranked support may record rated outcomes only if both players enter the same current UTC day and the match finishes before deadline; otherwise Daily results should remain view-only/unrated until fairness is reviewed.
- **Initial rating**: default new players to `1200`, with `provisional = true` until a minimum number of rated results, recommended 10 per bucket.
- **K-factor**:
  - Provisional: higher K (recommended 40) so ratings settle quickly.
  - Established: lower K (recommended 24).
  - Large mismatch or inactivity adjustments should be deferred unless needed during execution.
- **Expected score**: standard ELO expected-score formula using rating difference. Treat draw/tie as `0.5`; win as `1`; loss as `0`.
- **Rated eligibility**: only completed ranked matches between two authenticated distinct users with durable server-side result evidence should update ratings. Local-only smoke matches, anonymous fallback matches, custom unranked matches, aborted matches, expired matches, guest-progress-only async matches, and matches with incomplete result evidence must not update ratings.
- **Async ranked caveat**: current Stage 1 async state is local/guest-progress-first. Stage 3 must add an authenticated durable result/settlement path before async matches can affect ratings; otherwise async remains unranked until that path exists.
- **Idempotency**: each rated match must produce at most one rating transaction per affected rating bucket. Replaying or reconnecting a match projection must not double-apply rating deltas.

#### 28.6.3 Scoring and Performance Model

Scoring should explain how a player won without becoming a second hidden game.

- **Primary result**: win/loss/tie remains the source of truth for rating.
- **Performance metrics**:
  - OG: solved/lost, attempts used, remaining attempts, time-to-finish for live matches, invalid/aborted state excluded.
  - GO: number of puzzles solved, total attempts used, final status, chain progress, time-to-finish for live matches.
  - Daily: UTC deadline compliance and final status.
- **Tie handling**:
  - Live simultaneous ties should first compare completion status, then timestamp/server event order, then attempts/progress, and finally deterministic player order only as a last resort.
  - Async ties should be rare; if both lose or both reach equivalent terminal state, treat the rating score as `0.5` only when the match format truly permits a draw.
- **Score display**: expose an explainable result summary such as `Won in 4 guesses`, `Solved 4/5 boards`, `Faster finish`, or `More chain progress`; avoid opaque point formulas unless the user approves a more game-like scoring layer.
- **No solo contamination**: Stage 3 multiplayer scoring must not alter existing solo `StatsDashboard` math, daily streaks, coins, XP, Pay-to-Continue, or resume slots unless a later prompt explicitly approves multiplayer economy/stats integration.

#### 28.6.4 Advanced Matchmaking

Upgrade Stage 2 basic lobbies into a matching service/pure selector that can be tested without Supabase.

- **Queue model**: introduce ranked matchmaking requests with mode, scope, transport, rating bucket, rating at enqueue time, queued-at timestamp, optional word length for async practice, and a generated idempotency key.
- **Initial search band**: match within roughly +/-100 rating points for established players; provisional users may use a wider band (recommended +/-200).
- **Wait-time widening**: widen the search band over time, for example +50 rating points every 15 seconds for live queues and every 10 minutes for async queues, with a sensible max band.
- **Compatibility filters**:
  - Same transport (`async` or `live`).
  - Same mode (`og` or `go`).
  - Same scope (`practice` or eligible current UTC daily).
  - Same word length when required by async practice; live practice can continue using Stage 2's word-length selection after matching.
  - Distinct authenticated users.
  - No blocked/self/rematch-abuse candidate if those controls exist by execution time.
- **Daily policy**: Daily ranked matchmaking must use the multiplayer UTC `DailyVariant` day key and must not match after the day expires. Past daily matches remain view-only and should not start new ranked games.
- **Fallback**: if no fair ranked match appears, the UI should offer to keep waiting, widen the search, or create an unranked custom game rather than silently matching a very unfair opponent.
- **Implementation style**: keep the ranking/matching selector pure and deterministic; Supabase/RPC integration can persist queues and atomically claim matches after the pure selector chooses a candidate.

#### 28.6.5 Custom Games and Ranked/Unranked Split

Custom games should support friendly play without damaging ranked integrity.

- **Custom game default**: unranked by default.
- **Invite/share model**: create a custom lobby with a shareable code or link, scope/mode/transport, optional word length or live selection rules, and expiration.
- **Ranked custom games**: defer or require strict constraints if introduced later. A custom game should be rated only if both players explicitly opt into ranked and the match passes the same eligibility and anti-abuse checks as matchmaking-created ranked games.
- **Replay/rematch**: allow unranked rematches freely; rate-limited ranked rematches should either be capped or have abuse checks before affecting ELO.
- **Storage**: custom lobby metadata should be separate from rating transactions so deleting/expiring a lobby cannot erase the immutable match result/rating audit trail.

#### 28.6.6 Data Model and Persistence Plan

Prefer additive, auditable data structures.

Likely new or extended TypeScript modules:

- `src/multiplayer/rating.ts` — pure ELO calculations, rating bucket normalization, provisional logic, idempotent transaction application.
- `src/multiplayer/rating.test.ts` — K-factor, expected-score, provisional, draw, idempotency, and per-bucket tests.
- `src/multiplayer/matchmaking.ts` — pure queue/candidate selection, wait-band widening, compatibility filters, ranked/unranked split.
- `src/multiplayer/matchmaking.test.ts` — deterministic matching, widening, daily UTC eligibility, no-self-match, provisional band tests.
- `src/multiplayer/scoring.ts` — result summary and performance metric projection from async/live match data.
- `src/multiplayer/scoring.test.ts` — OG/GO/live/async result summaries and tie handling.
- `src/multiplayer/MultiplayerStatsPanel.tsx` or route-local components — multiplayer ratings, recent rated matches, mode/transport filters, and explanatory copy.
- `src/multiplayer/RankedMatchmakingPanel.tsx` or additions to existing async/live panels — ranked queue controls and custom game creation/entry.
- `src/account/storageSchema.ts`, `guestStorage.ts`, `guestTransfer.ts` — only if local display/cache shapes are needed; authenticated Supabase tables should remain the durable source for ranked records.
- `supabase/migrations/` — additive Stage 3 migration.
- `docs/supabase.md` — setup notes for ranked multiplayer tables/RLS/RPCs.

Likely Supabase additions:

- `multiplayer_rating_profiles`: user id, rating bucket, rating, games played, wins/losses/draws, provisional flag, updated timestamp.
- `multiplayer_rating_transactions`: immutable transaction id, match id, bucket, player ids, old/new ratings, deltas, expected scores, reason, created timestamp, idempotency key.
- `multiplayer_match_results`: immutable rated/unrated result summary keyed by source match id, transport, mode, scope, daily key, ranked flag, terminal status, winner/tie outcome, and settled timestamp.
- `multiplayer_player_results`: per-player result metrics such as attempts, solved boards, finish time, rating bucket, and participant id.
- `multiplayer_matchmaking_queue`: user id, request id, transport, mode, scope, rating bucket, rating snapshot, status, queued-at, expires-at, matched match id.
- `custom_game_lobbies`: code/id, creator, transport, mode, scope, ranked flag, status, expires-at, optional constraints.

RLS/RPC guidance:

- Rating profiles should be readable by authenticated users where appropriate; only trusted RPCs or secure server-side flows should mutate rating values.
- Rating transactions should be append-only and participant-readable; direct client inserts should be avoided if possible.
- Match results and per-player results should be append-only after settlement; clients may submit commands/events, but must not directly write old/new rating deltas.
- Queue insert/update should be user-owned, but atomic match claiming should happen in an RPC to avoid two clients claiming the same opponent.
- No service-role keys may be exposed to the browser.

#### 28.6.7 Integration Points With Stage 1 and Stage 2

- **Async matches**: consume `AsyncMultiplayerGame` terminal results and moves from `src/multiplayer/asyncMultiplayer.ts`; do not change turn mechanics merely to support scoring.
- **Async ranked settlement**: because async currently persists through guest/cloud progress rather than shared match tables, Stage 3 must create authenticated result-settlement records before applying ELO to async matches. Guest/local async remains unranked.
- **Live matches**: consume `LiveMultiplayerMatch` terminal phases and player progress from `src/multiplayer/liveMultiplayer.ts`; keep Stage 2's simultaneous-play semantics.
- **Repository seam**: extend or add repositories beside `liveRepository.ts` rather than putting rating writes into React components.
- **Calendar**: Daily ranked status may appear in Calendar only as a concise indicator or entry point; avoid crowding day cells beyond the existing solo/async/live chips.
- **Practice route**: primary home for ranked practice queues and custom game setup.
- **Stats route**: preferred long-term home for multiplayer rating/stats summaries so gameplay panels do not become dashboards.
- **Auth/account**: ranked play should require authenticated users. Anonymous/local-only users can still use unranked local previews if the UI clearly labels them as unrated.

#### 28.6.8 Fairness and Anti-Abuse

- Require distinct authenticated users for rated matches.
- Prevent duplicate rating application through idempotency keys and immutable transactions.
- Do not rate aborted, expired, local-only, anonymous, or corrupted matches.
- Define disconnect handling before rating live matches: a disconnect after match start may count as loss only after a documented grace period; a pre-start disconnect should abort/unrate.
- Daily ranked matches must expire at UTC midnight and should not award ratings if the deadline invalidates completion.
- Rematch abuse: track recent repeated rated pairings and either cap rating impact or force unranked rematches after a threshold.
- Sandbagging: provisional ratings may move quickly, but avoid exploitable large rating deltas from repeated obvious mismatches.
- Transparency: show enough rating-change explanation that users understand why a result changed their rating.
- Privacy: expose display names and ratings, not private auth emails or internal Supabase ids in public UI.

#### 28.6.9 Stage 3 Work Slices for Parallel Agents

When Stage 3 execution is authorized, split work into narrow, low-conflict lanes:

- **Rating domain lane**: `rating.ts`, rating tests, transaction normalization, idempotency rules.
- **Scoring domain lane**: `scoring.ts`, result projection from async/live matches, tie handling tests.
- **Matchmaking domain lane**: `matchmaking.ts`, queue model, compatibility filters, widening tests.
- **Supabase lane**: Stage 3 migration/RLS/RPC documentation, Supabase setup docs, security review notes.
- **UI lane**: ranked/custom controls in multiplayer panels and multiplayer stats/rating surface, after domain shapes stabilize.
- **Coordinator lane**: `App.tsx`, Calendar/Practice/Stats integration, progress/changelog/memory updates, final verification.

High-conflict files (`src/app/App.tsx`, `src/calendar/CalendarPanel.tsx`, `src/account/storageSchema.ts`, `CHANGELOG.md`, `progress/PROGRESS.csv`, and this plan) should stay coordinator-owned unless explicitly sequenced.

#### 28.6.10 Risks and Mitigations

- **Ranking volatility**: keep conservative K-factors and provisional flags; add tests for expected deltas.
- **Race conditions**: make queue matching and rating transaction creation idempotent; prefer RPC/transaction boundaries in Supabase.
- **Scope creep**: do not implement leaderboards, social graph, economy rewards, or public profiles unless separately approved.
- **Calendar density**: keep ranked Daily UI compact; put detailed stats elsewhere.
- **Data migration risk**: keep Stage 3 schema additive; do not mutate existing guest progress unless unavoidable.
- **Rating fairness**: do not rate matches without complete terminal evidence.
- **Security/RLS**: require participant ownership and authenticated access; never trust client-provided old/new rating deltas.

#### 28.6.11 Stage 3 Verification Strategy

Stage 3 execution must include:

1. Unit tests for ELO calculations, provisional behavior, expected score, draw handling, and idempotent transaction application.
2. Unit tests for scoring projections from async/live OG and GO terminal matches.
3. Unit tests for matchmaking compatibility filters, wait-band widening, no-self-match, daily UTC eligibility, and ranked/unranked split.
4. Repository/RPC adapter tests with in-memory fakes for queue and rating transaction flows.
5. Component tests for ranked queue controls, custom game labels, rating summaries, and empty/unrated states.
6. Supabase migration/RLS review; local SQL validation if Supabase tooling is available.
7. Full gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`.
8. Browser smoke across desktop and mobile for ranked Practice, custom unranked flow, rating display, and no Calendar overflow.

### 28.7 Stage 4 Planning — Optional UI / Front-end Polish (Governance Only)

This subsection captured the original high-level optional Stage 4 direction before the user provided a dedicated Stage 4 spec. It remains useful as UI-polish context only. The binding Stage 4 planning for the next authorized work is now §28.15, which keeps Daily Multiplayer fixes and Live spectator foundations in scope while deferring the broader dedicated Multiplayer tab.

Stage 4 was originally optional and should only be triggered after Stage 3 if the multiplayer surfaces feel inconsistent, crowded, or fragile.

- **Live/ranked lobby polish**: simplify queue state, opponent found, reconnect, timeout, and match-result screens.
- **Mobile ergonomics**: audit Practice and Calendar multiplayer panels at common phone widths; ensure touch targets, dropdowns, and match-history surfaces remain usable.
- **Accessibility**: add or refine focus management, `aria-live` status updates for queue/matchmaking events, reduced-motion handling for word-length/randomized/result animations, and keyboard navigation for custom game flows.
- **Calendar density**: revisit solo/async/live/ranked indicators after Stage 3; move dense detail to drill-down panels instead of adding more day-cell clutter.
- **Stats presentation**: polish multiplayer rating/stats charts or summaries after the underlying model is stable.
- **Copy and onboarding**: clarify ranked vs unranked, provisional ratings, Daily UTC rules, and rating-change explanations without adding tutorial clutter.
- **Constraint**: Stage 4 must remain UI/front-end polish. It must not add new multiplayer rules, rating formulas, scoring formulas, economy rewards, or social systems unless the user explicitly approves expanded scope.

### 28.8 Phase 23 Governance Workflow

| Stage / step | `phase_id` | Scope | Status / gate |
| --- | --- | --- | --- |
| Stage 1 | 69 | Bug fixes, DailyVariant, async multiplayer core, Calendar/countdown updates | Complete; awaiting user review |
| Stage 2 planning | 70 | Documentation/governance only for live/real-time multiplayer | Complete in plan; no Stage 2 code authorized |
| Multi-agent workflow scaffolding | 71 | Documentation/infrastructure only: coordination guide, project memory, planning index, progress README, targeted constitution update | Complete; no Stage 2 code authorized |
| Stage 2 execution | 72 | Live Practice + Daily Multiplayer, realtime lobby, word-length selection | Complete and verified; halt for user review |
| Stage 3 planning | 73 | ELO/rating, advanced matchmaking, custom games, scoring, fairness, verification strategy | Complete in plan; no Stage 3 code authorized |
| Stage 3 execution | 74 | ELO/rating implementation, matchmaking, custom games, scoring/stats UI, Supabase competitive migration | Complete locally; PR/merge gated |
| Stage 3 stabilization | 75 | True online async/live ownership/persistence fixes, mobile Calendar indicators, Settings tooltip layering | Complete locally; PR/merge gated |
| Stage 3 stabilization follow-up | 76 | Account-backed matchmaking hardening, canonical multiplayer play surface, forfeit, password reset, RLS/write hardening | Complete locally; PR/merge gated |
| Next stabilization follow-up planning | 77 | Realtime refresh, Daily Multiplayer participation limits, separate daily answer lists, rival identity, countdown navigation, Multiplayer-tab path | Planning documented; implementation not authorized |
| Stage 4 optional | TBD | UI polish/cleanup if needed | Trigger only after Stage 3 if needed |

### 28.9 Multi-Agent Workflow Scaffolding (Governance / Infrastructure Only)

**Authorization status**: complete as a documentation and infrastructure step. This subsection does not authorize Stage 2 implementation.

This step creates durable coordination surfaces so later Phase 23 work can use parallel sub-agents without weakening the one-stage-at-a-time governance model.

#### 28.9.1 New Coordination Surfaces

- `agents.md` — practical multi-agent workflow guide, including startup checklist, work-packet template, file ownership rules, Stage 2 work-slice suggestions, handoff format, integration checklist, and stop conditions.
- `memory.md` — compact persistent project memory with the current Phase 23 gate, Stage 1 completion summary, Stage 2 planning summary, core invariants, module map, recent progress IDs, and update policy.
- `docs/planning-index.md` — low-churn index for the current planning/progress source files. It avoids moving root specs during an active dirty working state while still giving future sessions an obvious navigation map.
- `progress/README.md` — progress tracking guide documenting the 12-column CSV shape, monotonic `phase_id` rule, exact `PROGRESS-STEP-N.md` parity preference going forward, and no-secrets rule.

#### 28.9.2 Targeted Constitution Update

`CONSTITUTION.md` is updated to v3.4 with minimal coordination-file rules:

- Coordination files are subordinate operational aids and cannot authorize new scope, implementation, merges, releases, or stage progression.
- Stale or contradictory coordination files are an explicit halt condition.
- `agents.md` and `memory.md` should be updated only at approved governance/progress gates when durable state changes.
- Sub-agents should read `agents.md`, and the coordinating agent resolves conflicts against the authority stack before work proceeds.

#### 28.9.3 Document Reorganization Decision

No root-level phase specs are moved in this step. The current root spec filenames are referenced throughout `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, and progress reports. Moving them during Phase 23 would create broad reference churn and increase integration risk while Stage 1 source changes are already present in the working tree.

A future docs-only reorganization may move specs into `docs/planning/specs/` if the user approves a dedicated cleanup pass. That pass must update every reference atomically and record the move in progress tracking.

#### 28.9.4 Gate

After this scaffolding update, before the later Stage 2 authorization prompt:

- Stage 1 remains complete.
- Stage 2 planning remains documented.
- Stage 2 implementation remains unauthorized until explicit user approval.
- The coordinating agent must halt for user review before any live/realtime multiplayer implementation.

### 28.10 Stage 2 Execution Coordination Plan

**Authorization status**: explicitly authorized by the user on 2026-06-04, implemented, verified, and tracked under `phase_id = 72`.

Stage 2 implementation should use the multi-agent scaffolding from §28.9 while keeping high-conflict surfaces under coordinator control.

#### 28.10.1 Work Slices

- **Domain / reducer / repository seam**: implement framework-agnostic live match models, lobby/match phases, word-length selection resolution, deterministic winner/abort/expiry handling, serialization, and an in-memory realtime-style repository fake for tests.
- **Supabase schema and RLS planning**: add migration/schema documentation for durable live lobbies, matches, participants, and events, with RLS notes. Do not require production credentials for local verification.
- **UI components**: implement Practice/Daily live lobby surfaces, dedicated Practice Live word-length selection screen, live status/projection display, non-skippable random-length highlight animation, reconnect/expired/aborted messaging, and mobile-safe component tests.
- **Coordinator integration**: wire Practice and Calendar entry points, persistence/repository state, and route-level behavior in `src/app/App.tsx`, preserving solo and async behavior.
- **Verification/docs**: update changelog, progress, `memory.md`, and `agents.md`; run full local verification plus desktop/mobile browser smoke.

#### 28.10.2 File Ownership Rules

- The coordinator owns `src/app/App.tsx`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-72.md`, `AGENT-IMPLEMENTATION-PLAN.md`, `memory.md`, and final integration.
- Domain work should stay in `src/multiplayer/live*.ts` and tests where possible.
- UI work should stay in `src/multiplayer/*Live*.tsx`, `src/multiplayer/WordLengthSelectionPanel.tsx`, and related tests until coordinator integration.
- Calendar work should be limited to adding Daily Live entry points and indicators without rewriting the central Calendar hub.
- Do not edit canonical `src/game/` rules except for a small, reviewed helper if absolutely necessary.

#### 28.10.3 Stage 2 Exit Gate

Stage 2 must end with:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. `npx tsc -p tsconfig.api.json --noEmit`
5. `git diff --check`
6. Desktop and mobile browser smoke covering Practice Live, Daily Live, word-length selection, refresh/reconnect projection, and UTC deadline messaging

After Stage 2 verification, halt for user review. Do not create a PR, merge, or begin Stage 3 until explicitly approved.

#### 28.10.4 Stage 2 Completion Summary

Stage 2 is complete and verified under `phase_id = 72`.

- Added `src/multiplayer/liveMultiplayer.ts` with live lobby/match phases, Practice Live word-length selection, countdown, simultaneous guess submission, winner resolution, daily UTC expiry, answer extraction, normalization, and merge helpers.
- Added `src/multiplayer/liveRepository.ts` with memory/localStorage repositories and a Supabase-backed adapter for durable live projections plus realtime broadcasts.
- Added `WordLengthSelectionPanel` and `LiveMultiplayerPanel` for the dedicated pre-game selection screen, live lobby, match status, countdown, live arena, move history, finished/expired answer + definitions, and aborted states.
- Integrated Practice Live through the Practice route and Daily Live through the Calendar hub, including `L-OG` and `L-GO` live indicators.
- Added `supabase/migrations/20260604024500_phase23_live_multiplayer.sql` and updated `docs/supabase.md`.
- Verification: `npm run lint` clean; `npm run test` 417/417; `npm run build` succeeds with existing large-chunk advisory; `npx tsc -p tsconfig.api.json --noEmit` clean; `git diff --check` clean; Playwright browser smoke clean for desktop Practice Live, desktop Daily Live, reload persistence, UTC messaging, mobile Calendar live indicators, and no horizontal overflow.
- Gate: halt for user review. Stage 3 ELO/rating/scoring, PR creation, merge, and release remain unauthorized.

### 28.11 Stage 3 Stabilization — Online Multiplayer Corrections

**Authorization status**: explicitly authorized by the user on 2026-06-04 as targeted fixes after Stage 3 review; implemented and tracked under `phase_id = 75`.

This follow-up corrects user-reported defects in the Stage 1/2/3 multiplayer transport rather than adding optional Stage 4 scope. The binding issue was that async and live panels could still simulate both sides on one device. The stabilized architecture now requires a signed-in viewer to own exactly one player seat for online match mutation.

#### 28.11.1 Durable Async Transport

- Async multiplayer now has a repository seam (`asyncRepository.ts`) parallel to the live repository, with localStorage fallback and a Supabase-backed adapter.
- Authenticated async state is persisted through `async_multiplayer_games` rows and Realtime `postgres_changes` subscriptions so a second browser/device can see waiting games and submitted turns after refresh.
- Async games have an explicit `waiting` status. Creating a signed-in async match opens a waiting game with `player-one` owned by the creator. A separate signed-in user must join to claim `player-two` before turns can begin.
- The async UI exposes only the current viewer's seat and only enables the guess form when it is that viewer's turn. Waiting games never reveal answer/definition content.

#### 28.11.2 Live Realtime Ownership

- Live lobbies now carry the creator's `hostUserId`; a second signed-in user joins a waiting lobby and becomes `player-two`.
- The Supabase live repository now saves only rows the current user owns or participates in, writes participant rows with the correct `player_id`, and refreshes from Realtime Postgres change events on `live_lobbies`, `live_matches`, and `live_match_participants`.
- Live UI no longer renders two simultaneous local guess inputs. It shows one viewer-owned guess form and limits Practice Live word-length selection to the signed-in player's seat.
- A new additive migration updates the live lobby RLS policy so a second authenticated user can claim a waiting lobby without broadening rating-settlement permissions.

#### 28.11.3 Mobile/UI Stabilization

- Calendar day cells use compact mobile-visible indicator labels while preserving full accessible labels for `S-OG`, `S-GO`, `M-OG`, `M-GO`, `L-OG`, and `L-GO`.
- Settings tooltips render through a body portal with a high stacking layer, avoiding clipping by the Lunar Signal playfield's overflow/backdrop container.
- Settings label rows wrap on narrow screens and tooltip triggers do not shrink.

#### 28.11.4 Gate

After stabilization verification, halt for user review. Do not create a PR, merge, release, or begin optional Stage 4 until explicitly approved.

### 28.12 Stage 3 Stabilization Follow-up — Account-Backed Multiplayer UX and Password Recovery

**Authorization status**: explicitly authorized by the user on 2026-06-04 as targeted fixes after `phase_id = 75`; implemented and tracked under `phase_id = 76`.

This follow-up remains within Phase 23 stabilization scope. It does not begin optional Stage 4, create a PR, merge, release, add leaderboards, add social systems, or change solo gameplay rules.

#### 28.12.1 Account-backed async/live matchmaking hardening

- Supabase async and live repositories now avoid broad upserts against waiting-room rows they do not own. Host-owned rows use explicit insert/update handling, while joined/visible rows are updated only through the current participant path.
- Live Realtime projection publishing now uses the available Realtime channel send path instead of a REST fallback that can warn or fail in browser clients.
- Additional additive Supabase migrations grant the expected authenticated table/function access and refine live-lobby RLS so a second authenticated user can claim a waiting lobby and still read the matched lobby row after the update.
- Remote cross-client probes were run against the configured Supabase project using generated authenticated sessions for the two confirmed test accounts after the supplied passwords were rejected by Supabase Auth. Those probes verified async lobby visibility/join/turn sync and live lobby visibility/join/start/play sync between distinct authenticated users.

#### 28.12.2 Multiplayer play-surface parity

- Async and live multiplayer now share a dedicated `MultiplayerGameSurface` that renders the full blank puzzle grid from match start and uses the same on-screen `Keyboard` interaction model as solo play.
- Multiplayer guesses are validated through the canonical OG/GO session reducers, preserving valid-guess checks, word length, Hard Mode constraints, tile coloring, and keyboard letter-state updates.
- Multiplayer does not render consumables, Pay-to-Continue, reveal-answer, or extra-guess purchase affordances.
- Async and live modes now expose a forfeit action. Forfeit marks the forfeiting player as the loser and feeds the result projection path as a loss for rating purposes when the match is otherwise rated/eligible.

#### 28.12.3 Password recovery

- Supabase password-reset redirect URLs now carry an explicit reset marker and `PASSWORD_RECOVERY` auth events open a dedicated password-reset modal instead of silently treating the link like a normal magic-link resume.
- The reset UI validates password confirmation and calls Supabase password update through the existing account boundary.

#### 28.12.4 Mobile/UI carry-forward checks

- Calendar mobile indicators now visibly render the full `S-OG`, `S-GO`, `M-OG`, `M-GO`, `L-OG`, and `L-GO` labels without clipping or page overflow by stacking the indicators inside narrow mobile day cells while preserving the denser two-column desktop layout.
- Settings tooltips remain portaled and viewport-aware with a high stacking layer.

#### 28.12.5 Gate

After follow-up verification, halt for user review. Do not create a PR, merge, release, or begin optional Stage 4 until explicitly approved.

### 28.13 Stage 3 Stabilization Follow-up Planning — Realtime Refresh, Daily Limits, Rival Identity, and Multiplayer Navigation

**Authorization status**: planning and governance only, tracked under `phase_id = 77`. This subsection documents the next targeted Phase 23 follow-up requested from `brrrdle_observations_2026_06_04.md`. It does not authorize implementation, source-code edits, Supabase migrations, tests, PR creation, merge, release, or optional Stage 4 work.

This follow-up should stay narrowly inside Phase 23 stabilization. The goal is to polish the multiplayer architecture that already exists rather than add a broad new competitive system.

#### 28.13.1 Binding Scope

The next implementation pass, if explicitly approved, should address only these items:

1. **Daily Async realtime refresh**: waiting-game lists must update automatically when another signed-in player creates a Daily Async lobby; the creator's screen must also transition automatically when a second player joins. Manual page refresh must not be required for lobby visibility, join state, or active-game entry.
2. **Live selection and entry refresh**: Practice Live and Daily Live must resolve "Resolve Selection" automatically when both players submit. If the word-length selection clock expires, both clients should enter the game automatically from current Realtime/repository state without a manual refresh.
3. **Daily Multiplayer one-play-per-day rule**: for each signed-in user and UTC day, each of the four Daily Multiplayer buckets (`async:og`, `async:go`, `live:og`, `live:go`) allows only one Daily Multiplayer participation. One owned/open lobby and one joined game are the same daily claim for that bucket; after the game finishes, expires, is forfeited, or otherwise becomes terminal, the user cannot create or join another game in that same bucket for that UTC day. Existing participated games must remain viewable from the Calendar/history surfaces.
4. **Separate Daily Async and Daily Live answers**: Daily Async and Daily Live must use distinct deterministic answer selections so the answer lists do not match by transport. This must preserve the daily 5-letter invariant, valid-guess lists, solo Daily OG/GO answer selection, and Practice behavior.
5. **Async header copy corrections**: Practice async should be labeled "Practice Async Multiplayer"; Daily async should be labeled "Daily Async Multiplayer". Existing Live labels should remain clear and separate.
6. **Rival identity display**: all multiplayer modes should show safe rival profile details where available: display name, avatar, accent color, initials/fallback, and room for future non-private profile fields. The UI must not expose private emails or internal Supabase ids as public-facing rival identity.
7. **Clickable Daily Multiplayer countdown**: the `DAILY MULTIPLAYER` countdown should remain visually unchanged but become clickable like `NEXT DAILY`, navigating to the current UTC day's Daily Async Multiplayer surface.
8. **Dedicated Multiplayer tab path**: analyze and prepare the cleanest path toward a future Multiplayer tab that centralizes lobby browsing and multiplayer entry without breaking existing Calendar and Practice flows. Implementation of the new tab should not occur unless the user explicitly authorizes it in the execution prompt.

#### 28.13.2 Proposed Technical Approach

- Treat async and live repository subscriptions as the first place to debug manual-refresh behavior. Realtime callbacks should trigger a normalized reload/merge of the relevant async games, live lobbies, live matches, and participant rows, then update the React state that panels derive from. Avoid local optimistic state that hides the latest Supabase projection.
- Add or reuse a small Daily Multiplayer participation helper that answers: "Has this authenticated user already claimed this UTC date + transport + mode bucket?" The helper should check both owned waiting lobbies and joined/participated games, including terminal states. A waiting lobby should block opening a second lobby; the user may re-enter the existing waiting lobby instead.
- Prefer an additive persistence guard for the daily one-play rule. A client-side guard is necessary for UX, but a server-side guard or unique participation record should be considered during implementation so two tabs cannot race into duplicate Daily Multiplayer claims.
- Add a transport-specific Daily Multiplayer answer variant or deterministic seed salt, for example separate `daily-multiplayer-async` and `daily-multiplayer-live` variants. Store enough metadata on multiplayer rows to keep existing in-progress games stable while new games use the corrected variant.
- Reuse the account profile boundary for rival display. Project only safe fields such as `displayName`, `avatarUrl`, `accentColor`, initials, and label. If a profile is missing, render a non-private fallback such as "Rival" plus a generated accent.
- Make countdown navigation additive. If the existing countdown component already supports click handlers, use that seam; otherwise add a generic accessible button/link affordance without changing the visual treatment. Navigation should deep-link to Daily Async Multiplayer for the current UTC date, likely through the Calendar launch model.
- Treat a dedicated Multiplayer tab as a follow-up routing/architecture step. The cleanest path is an additive `multiplayer` route that aggregates Practice Async, Practice Live, Daily Async, and Daily Live entry cards using the same repository state, while Calendar countdown/deep links and Practice entry points remain as aliases until the new surface proves stable.

#### 28.13.3 Recommended Work Slices

If the user later authorizes implementation, split the work carefully:

- **Lane A - Repository and domain refresh**: async/live subscription reload semantics, Daily Multiplayer participation helper, transport-specific daily-answer variant metadata, and unit tests. Avoid `src/app/App.tsx` until coordinator integration.
- **Lane B - UI polish**: async header copy, rival identity components, countdown click affordance, waiting/re-entry messaging, and component tests.
- **Lane C - Supabase/RLS review**: identify whether a small additive migration or RPC is needed for daily participation uniqueness and profile projection. Keep it minimal and backward-compatible.
- **Coordinator lane**: `src/app/App.tsx`, Calendar launch/deep-link behavior, Daily countdown wiring, final docs/progress updates, and full verification.

`src/app/App.tsx`, `src/calendar/CalendarPanel.tsx`, `src/daily/dailyVariant.ts`, async/live repository adapters, Supabase migrations, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` should remain coordinator-owned or explicitly sequenced.

#### 28.13.4 Risks and Mitigations

- **Duplicate daily participation race**: client-only checks can fail across two tabs or devices. Mitigate with repository-level checks and, if feasible, a server-side unique participation constraint or transactional RPC.
- **Breaking existing Daily history**: adding transport-specific answer variants could change in-progress or archived answers if not versioned. Mitigate by persisting variant metadata and keeping existing stored game answers authoritative.
- **Realtime churn or infinite loops**: subscription callbacks that blindly save/reload can loop. Mitigate with read-only refresh callbacks, debouncing if needed, and repository tests that simulate cross-client updates.
- **Profile privacy**: rival identity should not leak raw auth emails or ids. Mitigate by using safe derived profile fields and fallbacks.
- **Navigation churn**: a new Multiplayer tab could duplicate state and confuse users. Mitigate by planning it as an additive aggregator route after the targeted fixes are stable, while retaining Calendar and Practice aliases.
- **Calendar density**: Daily participation lockout/status should avoid adding more cramped day-cell labels. Prefer concise messaging in the selected-day panel or future Multiplayer tab.

#### 28.13.5 Verification Strategy

The execution pass must finish with the full local gate:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. `npx tsc -p tsconfig.api.json --noEmit`
5. `git diff --check`

Additional required verification:

- Remote or Supabase-shaped two-client tests proving Daily Async lobby creation, visibility, join transition, and active-game entry update without manual refresh.
- Live two-client tests proving word-length selection resolves and both clients enter the match automatically after both submissions and after countdown expiry.
- Tests for the Daily Multiplayer one-play-per-day rule across `async:og`, `async:go`, `live:og`, and `live:go`, including waiting lobbies, joined games, terminal games, expired games, and Calendar view-only access.
- Tests that Daily Async and Daily Live answer selection differs while solo daily and practice answer behavior remain unchanged.
- Component/browser smoke for corrected async headers, rival identity rendering, clickable Daily Multiplayer countdown navigation, desktop and 390px mobile layouts, and no console errors.

#### 28.13.6 Gate

After this planning update, halt for user review. Do not implement §28.13 until the user explicitly authorizes the execution pass. Do not create a PR, merge, release, or begin optional Stage 4 unless separately approved.

### 28.14 Stage 3 Stabilization Follow-up Execution — Realtime Refresh, Daily Claims, Rival Identity, and Countdown Navigation

**Status**: implemented under `phase_id = 78` after explicit user authorization. This execution remains inside the §28.13 targeted stabilization scope. It does not create a PR, merge, release, replace Calendar/Practice entry points, or begin optional Stage 4.

#### 28.14.1 Delivered Scope

- **Daily Async refresh and entry**: Async panels now derive the active selected game from live repository state when the previous selection disappears or a user's existing daily claim appears. This lets Supabase subscription refreshes surface newly visible lobbies, joined games, and re-entry state without requiring a page refresh.
- **Live selection and entry refresh**: Live panels derive selected lobby/match state from current repository snapshots, automatically resolve Practice Live word-length selection when both players submit or the one-minute clock expires, automatically complete the selection animation, and automatically enter the live arena when the countdown expires.
- **Daily Multiplayer participation rule**: Added client/domain helpers and reducer guards so each authenticated user can claim only one Daily Multiplayer participation per UTC date, transport, and mode bucket: `async:og`, `async:go`, `live:og`, and `live:go`. Existing waiting lobbies count as the claim and remain re-enterable.
- **Supabase claim guard**: Added `supabase/migrations/20260604223000_phase23_daily_multiplayer_claims.sql`, which creates `multiplayer_daily_claims`, adds live lobby `host_profile`, and enforces the same daily-claim invariant through additive triggers for async games, live lobbies, and live matches.
- **Separate Daily Async and Daily Live answer variants**: Added deterministic transport-specific Daily Multiplayer setup helpers. Async and Live use separate answer offsets while preserving solo Daily answers, daily five-letter length, valid-guess lists, and Practice behavior.
- **Header and rival identity polish**: Async section headers now read `Practice Async Multiplayer` and `Daily Async Multiplayer`; async/live waiting and active surfaces render safe rival identity summaries with display label, avatar, initials, and accent-compatible metadata without exposing raw emails or internal ids.
- **Countdown navigation**: The `DAILY MULTIPLAYER` countdown now launches the current UTC Daily Async Multiplayer surface through the Calendar launch request model.
- **Future Multiplayer tab groundwork**: The implementation keeps Calendar and Practice entry points intact and limits groundwork to reusable launch/profile/daily-claim helpers, leaving any dedicated Multiplayer tab as separately gated future work.

#### 28.14.2 Files and Modules Involved

- `src/multiplayer/dailyMultiplayer.ts` for transport-specific daily setups and safe public profile summaries.
- `src/multiplayer/asyncMultiplayer.ts` and `src/multiplayer/liveMultiplayer.ts` for daily participation helpers, duplicate-claim guards, profile metadata, and live auto-resolution support.
- `src/multiplayer/AsyncMultiplayerPanel.tsx`, `LiveMultiplayerPanel.tsx`, `WordLengthSelectionPanel.tsx`, `RivalIdentityCard.tsx`, and `MultiplayerGameSurface.tsx` for UI wiring, rival identity display, selection refresh, and transport-aware validation.
- `src/calendar/CalendarPanel.tsx` and `src/app/App.tsx` for Daily Multiplayer launch/deep-link behavior and profile propagation.
- `src/multiplayer/liveRepository.ts`, `docs/supabase.md`, and the new Supabase migration for persistence and setup documentation.

#### 28.14.3 Verification

Required verification for this pass includes:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. `npx tsc -p tsconfig.api.json --noEmit`
5. `git diff --check`
6. Desktop and 390px mobile browser smoke, especially Daily Async launch, Daily Live/Practice Live surfaces, Calendar indicators, and console cleanliness.

Focused regression coverage added:

- Daily Async and Daily Live use separate deterministic answer sequences.
- Daily Async and Daily Live duplicate claims are rejected at the domain layer.
- Rival profile summaries are sanitized and preserved in match projections.
- Live host profile metadata is persisted by the Supabase repository adapter.
- Calendar launch requests can open Daily Async Multiplayer from the countdown path.

#### 28.14.4 Gate

After implementation and verification, halt for user review. Do not create a PR, merge, release, replace existing multiplayer entry points, implement a dedicated Multiplayer tab, or begin optional Stage 4 until the user explicitly approves that later step.

### 28.15 Stage 4 Planning — Daily Multiplayer Fixes and Spectator Foundations

**Authorization status**: planning and governance only, tracked under `phase_id = 79`. This subsection documents the next approved Stage 4 plan from `PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md`. It does not authorize implementation, source-code edits, UI work, Supabase migrations, tests, PR creation, merge, release, or dedicated Multiplayer tab work.

This stage should stay narrowly focused on multiplayer reliability, correctness, and small UX gaps. It should not become a broad redesign, competitive-system expansion, social feature pass, or dedicated Multiplayer tab implementation.

#### 28.15.1 Binding Scope

The next implementation pass, if explicitly approved, should address these items:

1. **Daily Multiplayer lobby visibility**: Daily Async and Daily Live lobby lists must update automatically when another signed-in player creates a lobby, matching the reliability currently observed in Practice multiplayer. Manual page refresh must not be required for a waiting lobby to appear.
2. **Daily claim bypass closure**: if a signed-in user has already claimed a Daily Multiplayer bucket for the current UTC day, the create/open-lobby action must be blocked before a new lobby row is created. The warning state is not sufficient if the action still persists a lobby.
3. **Per-player five-lobby limit**: confirm and enforce that the five-active-lobby/game cap is per authenticated user, not global. A user's own waiting lobbies, active games, and other non-terminal in-scope multiplayer rows should count for that user only.
4. **Creator lobby cancellation**: a lobby creator may cancel/close their own unjoined lobby before another player joins. Cancellation must make the lobby unavailable to rivals and must release the creator's active-lobby slot.
5. **Lobby cancellation UI**: render a clear `Cancel Lobby` or `Close Lobby` action only when the viewer is the creator/host and the lobby is still unjoined. The action must not be available to rivals, spectators, or either player after a second player has joined.
6. **Rival identity carry-forward**: if gaps remain after `phase_id = 78`, waiting lobbies, active matches, terminal states, and spectator views should consistently show safe public identity fields only: label/display name, avatar, accent, initials, and non-private fallbacks.
7. **Live spectator foundations**: authenticated users may join an active Live match as read-only spectators. Spectators should see current board/guess/result state update in near real time, must not submit guesses or mutate match state, and must see a clear spectating status.
8. **Dedicated Multiplayer tab deferral**: planning and architectural thinking may continue, but implementation of a central Multiplayer tab remains out of scope for this Stage 4 pass.

#### 28.15.2 Daily Lobby Refresh Approach

Daily Async and Daily Live refresh should be debugged against the Practice multiplayer behavior before adding new abstractions.

- First compare subscription setup, repository reload callbacks, and derived selected-lobby state between Practice Async/Live and Daily Async/Live. The expected fix is likely state reconciliation rather than a separate polling loop.
- Realtime callbacks should trigger read-only reload/merge of relevant waiting lobbies, active games/matches, and participant rows. They must not blindly write visible public waiting rows back to Supabase.
- UI panels should derive visible lobby lists from the latest repository snapshot and current viewer identity. Avoid stale local copies that are only updated after a full page load.
- If Supabase Realtime does not deliver a specific table/update path for Daily rows, add the smallest persistence/repository hook needed so Daily creation, join, cancellation, and terminal transitions publish the same way Practice rows do.
- Tests should simulate two repository clients: client A creates a Daily lobby, client B receives it without refresh, client B joins, and client A sees the joined/active state without refresh.

#### 28.15.3 Claim, Limit, and Cancellation Approach

The existing Daily claim system should remain the authority for one-play-per-day behavior; Stage 4 should close gaps around create/open timing and cancellation.

- Use the existing `multiplayer_daily_claims` concept and `src/multiplayer/dailyMultiplayer.ts` helpers rather than creating a parallel claim store.
- Add a preflight guard before lobby creation/open actions. If the user already has a claim for `user + UTC date + transport + mode`, show the existing claim/re-entry state and do not create a new row.
- A waiting lobby counts as a daily claim while it exists. If the creator cancels the unjoined lobby, the implementation should decide whether the daily claim is released or terminally consumed. For this spec, the operational goal is to release the creator's active-lobby slot; the daily-claim release policy should be implemented consistently with the existing claim table and documented in the execution report.
- Prefer cancellation as an explicit lobby status such as `cancelled` or `aborted`, not a hard delete, so Realtime can notify viewers, history can ignore/categorize it, and debugging remains possible.
- Ensure cancellation is allowed only before a second player joins. Once a rival has joined, the existing forfeit/terminal flow is the correct player exit path.
- Count active multiplayer capacity per authenticated user. Include owned waiting lobbies and joined active games; exclude cancelled/unjoined lobbies after cancellation and other terminal records that no longer occupy an active slot.
- If client-side checks are insufficient for races, plan a minimal additive Supabase guard/RPC/migration during execution, but do not weaken RLS or grant browser clients direct authority over other users' rows.

#### 28.15.4 Live Spectator Foundation Approach

Spectators should be modeled as a third role, separate from `player-one` and `player-two`.

- Add spectator participation as read-only identity/presence metadata in the Live repository/domain model. Do not overload player seats or use player controls with disabled styling only.
- A spectator may subscribe to and render an active Live match projection but may not submit guesses, resolve word-length selection, forfeit on behalf of a player, edit lobby metadata, or settle rating.
- The UI should use the existing multiplayer board surface in read-only mode where practical: full board state, keyboard state if useful for visualization, move history, result, answer/definition archive when the match is terminal, and a clear `Spectating` status.
- Spectator count/presence is nice-to-have. If added, keep it ephemeral or additive and avoid adding chat, moderation, async spectator mode, or public profile expansion in this stage.
- Rating, scoring, and forfeit logic must ignore spectators entirely.
- RLS must distinguish participant-player write permissions from spectator read permissions. If a migration is needed, it should grant spectators read access only to the intended live match/lobby projection.

#### 28.15.5 Recommended Work Slices

If the user later authorizes implementation, use these slices:

- **Lane A - Daily repository refresh and limits**: inspect Practice vs Daily subscription paths; fix Daily Async/Daily Live lobby-list refresh; add per-user active-count helpers; add unit/repository tests.
- **Lane B - Claim and cancellation domain**: close create/open claim bypass; add cancellation status/action model; define claim/slot release behavior; add reducer/domain tests for own waiting lobby, already-claimed bucket, cancellation, and terminal states.
- **Lane C - Live spectator domain and persistence**: add spectator role/read-only model, repository projection, any minimal Supabase/RLS changes, and tests that spectators cannot mutate state.
- **Lane D - UI integration**: cancellation controls, spectator entry/read-only views, safe rival identity carry-forward, accessible empty/error states, and mobile layout checks.
- **Coordinator lane**: `src/app/App.tsx`, Calendar/Practice routing/deep links, high-conflict docs/progress updates, final integration review, full verification, and Vercel preview.

Keep `src/app/App.tsx`, `src/calendar/CalendarPanel.tsx`, `src/multiplayer/liveRepository.ts`, `src/multiplayer/asyncMultiplayer.ts`, `src/multiplayer/liveMultiplayer.ts`, Supabase migrations, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` coordinator-owned or explicitly sequenced.

#### 28.15.6 Risks and Considerations

- **Realtime refresh regressions**: fixing Daily subscriptions could accidentally duplicate Practice behavior or create reload loops. Mitigate with two-client repository tests and read-only refresh callbacks.
- **Claim/cancellation ambiguity**: a cancelled unjoined Daily lobby may either release only the active slot or also release the daily claim. The implementation must choose the policy that best matches the spec and existing Supabase claim constraints, then document it clearly.
- **Race conditions**: two browser tabs can try to create or cancel simultaneously. Mitigate with repository-level checks and server-side constraints/RPCs if client-only guards are insufficient.
- **RLS leakage**: spectator read access must not expose private profile fields, auth emails, service data, or matches outside the intended active Live spectator surface.
- **Player/spectator role confusion**: avoid disabled player controls as the only signal. Spectators need a distinct read-only state, and player actions must check role before mutating state.
- **Scope creep**: do not implement chat, async spectator mode, broad dashboard navigation, social graph, leaderboards, moderation, or economy rewards as part of this pass.
- **Mobile density**: cancellation, spectator, and rival identity affordances must not crowd Calendar or multiplayer panels. Prefer concise action rows and collapsible/secondary details where needed.

#### 28.15.7 Verification Strategy

The execution pass must finish with the standard gate:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. `npx tsc -p tsconfig.api.json --noEmit`
5. `git diff --check`

Additional required verification:

- Two-client Daily Async and Daily Live tests proving lobby creation appears for the other user without refresh.
- Daily claim bypass regression tests proving no new lobby row is created after an existing claim for the same UTC date/transport/mode bucket.
- Per-player active-limit tests proving five-lobby limits are per user and are released for cancelled unjoined lobbies.
- Creator-only cancellation tests proving the host can cancel before join, rivals cannot cancel, and joined lobbies use forfeit/terminal flows instead.
- Live spectator tests proving an authenticated spectator can view an active match, receives live updates, and cannot submit guesses, forfeit, resolve selection, or mutate match state.
- Browser smoke on desktop and 390px mobile for Daily lobby refresh, cancellation UI, spectator read-only mode, rival identity display, no horizontal overflow, and no console errors.
- Supabase/RLS manual verification if a migration/RPC is added, including no direct browser write access to rating/settlement rows and no raw email/id exposure in spectator or rival identity surfaces.

#### 28.15.8 Gate

After this planning update, halt for user review. Do not implement Stage 4, add Supabase migrations, change UI/components, create tests, create a PR, merge, release, or implement a dedicated Multiplayer tab until the user explicitly authorizes the execution pass.

### 28.16 Stage 4 Execution — Daily Multiplayer Fixes and Live Spectator Foundations

**Status**: implemented under `phase_id = 80` after explicit user authorization. This execution remains inside `PHASE-23-STAGE-4-DAILY-MULTIPLAYER-FIXES-AND-SPECTATOR-SPEC-2026-06-04.md`; it does not create a PR, merge, release, replace Calendar/Practice multiplayer entry points, or implement the deferred dedicated Multiplayer tab.

#### 28.16.1 Implemented Scope

- **Per-user active limits**: async and live active-count helpers now scope the five-active-game limit to the authenticated user instead of all visible public lobbies.
- **Daily claim bypass closure**: async and live domain create helpers reject duplicate Daily claims for the same authenticated user, UTC date, transport, and mode. Authenticated repository save failures now reload the authoritative repository snapshot instead of preserving rejected optimistic Daily creates locally.
- **Creator cancellation**: async and live lobby creators can cancel their own unjoined waiting lobbies. Rivals cannot cancel another user's lobby, and joined games continue to use the existing forfeit/terminal flow.
- **Cancellation policy**: cancelled unjoined lobbies release the creator's active-game slot but still consume the Daily Multiplayer claim for that UTC bucket. This avoids an open/cancel/open loophole while satisfying the Stage 4 active-slot requirement.
- **Live spectators**: Live matches now support authenticated spectators as a third read-only role, separate from `player-one` and `player-two`. Spectators can join active Live matches, see board/history state, and are blocked from guess submission, word-length selection, forfeit, lobby cancellation, and rating mutation paths.
- **Supabase persistence/RLS**: added `supabase/migrations/20260605043000_phase23_stage4_lobby_cancel_spectators.sql` to allow async `cancelled` status and create the additive `live_match_spectators` table/policies/publication hook.
- **UI and identity**: async/live panels expose cancellation only to eligible creators, show cancellation status safely, provide Live spectator entry/read-only surfaces, and continue to use safe public profile summaries for identity display.
- **Docs/tests**: added/updated focused domain, repository, and panel tests plus Supabase documentation for Stage 4 migration and manual checks.

#### 28.16.2 Important Decisions

- Cancellation is a terminal/unavailable state rather than a hard delete, so Realtime subscribers can reconcile the lobby state and logs/history remain debuggable.
- Daily cancellation releases active capacity only, not the Daily claim, because the existing `multiplayer_daily_claims` table is intentionally one-way for a daily bucket.
- Spectators are persisted in `live_match_spectators`, not `live_match_participants`, so player-seat uniqueness and participant write policies remain intact.
- The live repository tolerates a missing spectator table during read refresh so existing live multiplayer does not fail if a deployment briefly runs before the Stage 4 migration is applied; spectator joining requires the migration.

#### 28.16.3 Verification Requirements

Before reporting Stage 4 complete, run:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. `npx tsc -p tsconfig.api.json --noEmit`
5. `git diff --check`
6. Desktop and 390px mobile browser smoke for Daily Async/Live lobby surfaces, creator cancellation, spectator read-only mode, Calendar/Settings regressions, and console cleanliness.

After verification, halt for user review. PR creation, merge, release, dedicated Multiplayer tab implementation, and later-phase work remain gated.

### 28.17 Stage 5 Planning — Multiplayer UX Fixes and Polish

**Authorization status**: planning and governance only, tracked under `phase_id = 81`. This subsection documents the next approved Stage 5 plan from `PHASE-23-STAGE-5-MULTIPLAYER-UX-FIXES-AND-POLISH-SPEC-2026-06-05.md`. It does not authorize implementation, source-code edits, UI/component work, Supabase migrations, tests, PR creation, merge, release, dedicated Multiplayer tab work, notification-system work, history/theme tab work, bot opponents, or broader design exploration.

Stage 5 should be a narrow bug-fix and polish pass driven by real-account testing feedback after Stage 4. The goal is to make Daily and Practice multiplayer feel reliable and intuitive without changing the broader Phase 23 architecture or reopening deferred feature tracks.

#### 28.17.1 Binding Scope

The next implementation pass, if explicitly approved, should address these items:

1. **Sign-in flow cleanup**: remove the duplicate first `Sign in` action in the Email + Password flow and order the remaining actions as `Sign in`, `Create account`, then `Forgot password?`. This is a polish fix only; auth behavior, Supabase recovery handling, and password-reset semantics should not change.
2. **Daily Multiplayer four-bucket participation limit**: ensure each authenticated user can claim exactly one of each Daily Multiplayer bucket per UTC day: `live:og`, `live:go`, `async:og`, and `async:go`. The implementation must not accidentally restrict the user to one total live claim plus one total async claim.
3. **Daily Live join affordance**: make `Join live lobby` visibly pulse/flash for non-host viewers when a joinable lobby is selected or visible, while preserving accessibility and reduced-motion expectations.
4. **Daily Live join reliability**: joining as a non-host must reliably enter the game for both players without manual refresh. This is the highest-risk live-flow fix and should be verified with two clients.
5. **Daily Live GO fixed-length behavior**: Daily Live GO must not briefly show a Practice-style word-length selection phase. Daily games are fixed at five letters; after a Daily Live join, the state should proceed directly to countdown/playing according to the existing Daily Live flow.
6. **Practice Live entry reliability**: Practice Live lobbies must be enterable after a rival joins for both OG and GO. If the current state says the rival joined, the UI must surface the appropriate Practice Live word-length selection/countdown/play state instead of a dead message-only surface.
7. **Practice Live word-length timing**: Practice Live word-length selection countdown should start only after a rival joins and a match exists, not when the host merely opens a lobby.
8. **Practice Live word-length UI visibility**: when a Practice Live match enters the word-length selection phase, both clients should see the actual selection UI rather than only a status message.

#### 28.17.2 Explicitly Deferred Items

Do not implement these during Stage 5 unless a later user prompt explicitly expands scope:

- Browser notifications.
- Floating multiplayer game manager.
- Multiplayer game timestamps.
- Dedicated Themes tab or custom theme system expansion.
- Dedicated History tab.
- Turn transparency / guess attribution beyond what is required to fix entry state.
- Game-data exports or GIF generation.
- Practice vs Bots.
- Lichess-inspired redesign exploration.
- Dedicated Multiplayer tab implementation.
- Any new competitive/rating features.

#### 28.17.3 Recommended Implementation Order

If the user later authorizes execution, implement in this order:

1. **Sign-in cleanup**: inspect `src/account/AuthModal.tsx`, its tests, and related auth helpers; make the lowest-risk layout/action-order correction first.
2. **Daily bucket audit**: trace client/domain and Supabase claim checks for `hasDailyAsyncMultiplayerParticipation`, `hasDailyLiveMultiplayerParticipation`, `multiplayer_daily_claims`, and repository save/reload paths. Confirm mode is preserved in all checks and UI gating.
3. **Live join state reconciliation**: inspect `matchLiveMultiplayerLobby`, live repository save/load/update behavior, selected lobby/match derivation in `LiveMultiplayerPanel`, and App/Calendar/Practice callback wiring. Fix reliable entry before adding animation polish.
4. **Daily Live phase correction**: ensure Daily Live OG/GO joins never pass through Practice-only word-length selection. Daily match creation should commit the five-letter countdown path immediately.
5. **Practice Live selection timing**: ensure word-length selection records and timers are created only after a two-player match forms, and both clients receive/render that phase.
6. **Join button pulsing polish**: add the non-host visual cue after correctness is stable, with accessible copy/state and no layout shifts.
7. **Focused tests and smoke**: add or update unit, repository, component, and browser/remote probes for the corrected flows.

#### 28.17.4 Suggested Work Slices

If parallel sub-agents are used during the later execution pass, split work conservatively:

- **Lane A - Auth UI polish**: `src/account/AuthModal.tsx` and auth modal tests only. No multiplayer files.
- **Lane B - Daily claim/domain audit**: async/live daily participation helpers, claim guards, and Supabase claim migration/RLS review. This lane should be sequenced with Live join changes if both need `src/multiplayer/liveMultiplayer.ts`.
- **Lane C - Live join/phase domain and repository**: `src/multiplayer/liveMultiplayer.ts`, `src/multiplayer/liveRepository.ts`, and focused live tests. Owns reliable join, Daily fixed-length phase, and Practice selection timing.
- **Lane D - Live UI integration**: `src/multiplayer/LiveMultiplayerPanel.tsx`, `WordLengthSelectionPanel.tsx` if needed, and panel tests. Owns visible selection UI, join affordance, and mobile polish after Lane C stabilizes state shapes.
- **Coordinator lane**: `src/app/App.tsx`, `src/calendar/CalendarPanel.tsx`, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, progress files, `agents.md`, `memory.md`, final verification, remote Supabase probe, and Vercel preview.

Because `src/multiplayer/liveMultiplayer.ts`, `src/multiplayer/LiveMultiplayerPanel.tsx`, `src/app/App.tsx`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` are high-conflict surfaces, only one writer should own each at a time. If more than one fix needs the same file, sequence those edits rather than merging overlapping patches.

#### 28.17.5 Risks and Considerations

- **Daily claim regression risk**: Stage 4 intentionally preserved Daily claims after cancellation. Stage 5 must correct bucket granularity without weakening the one-claim-per-user/date/transport/mode invariant or reopening create/cancel/recreate loopholes.
- **Live join fragility**: previous phases repeatedly touched live lobby/match persistence, selected state, participant rows, and realtime reconciliation. Treat join reliability as an architectural correctness issue, not only a UI refresh issue.
- **Daily vs Practice phase confusion**: Daily Live should be fixed-length and skip Practice selection; Practice Live should delay selection until the rival joins. Tests should cover both directions to avoid swapping one bug for the other.
- **Realtime and reload races**: two clients may see lobby, matched lobby, match, and participant updates in different orders. UI should derive from authoritative match state and recover on refresh.
- **Visual cue accessibility**: pulsing/flashing should not be the only signal. Pair animation with clear enabled button state, disabled state, and reduced-motion-safe styling.
- **Scope creep**: defer all optional ideas from the Stage 5 spec unless the user explicitly authorizes them.

#### 28.17.6 Verification Strategy

The later execution pass must finish with the standard gate:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. `npx tsc -p tsconfig.api.json --noEmit`
5. `git diff --check`

Additional required verification:

- Auth modal test or browser smoke proving there is one Email + Password `Sign in` action and the order is `Sign in`, `Create account`, `Forgot password?`.
- Daily Multiplayer bucket tests proving one user can claim `async:og`, `async:go`, `live:og`, and `live:go` independently on the same UTC day, while duplicate claims in the same bucket remain blocked.
- Two-client Daily Live remote or Supabase-shaped repository test proving host/rival join visibility, match entry for both users, and no manual refresh requirement.
- Daily Live GO regression test proving no word-length selection screen flashes or becomes selectable.
- Practice Live test proving word-length selection starts only after a rival joins and both clients render the selection UI.
- Browser smoke on desktop and 390px mobile for sign-in modal, Daily Live join flow, Practice Live join/selection flow, no console errors, and no horizontal overflow.
- Remote Supabase verification where applicable, especially if join/claim fixes touch repository or RLS behavior.

#### 28.17.7 Gate

After this planning update, halt for user review. Do not implement Stage 5, edit source files, add tests, add Supabase migrations, create a PR, merge, release, implement the dedicated Multiplayer tab, or begin optional/deferred feature work until the user explicitly authorizes the execution pass.

### 28.18 Stage 5 Execution — Multiplayer UX Fixes and Polish

**Authorization status**: complete under `phase_id = 82` through `phase_id = 85` after explicit user authorization. This execution remained within the narrow Stage 5 bug-fix and polish scope. No PR, merge, release, dedicated Multiplayer tab, notification system, floating multiplayer manager, History/Theme tab, bot opponent, exports/GIFs, broader redesign, or later-phase work was performed.

#### 28.18.1 Implemented Changes

1. **Sign-in flow cleanup**: removed the duplicate password-mode `Sign in` affordance from the clean auth modal and ordered Email + Password actions as `Sign in`, `Create account`, then `Forgot password?`. The Settings inline auth fallback now presents the same action order without changing Supabase auth behavior.
2. **Daily Multiplayer four-bucket regressions**: added explicit tests proving `async:og`, `async:go`, `live:og`, and `live:go` remain independently claimable on the same UTC day while duplicate claims inside a bucket stay blocked.
3. **Daily Live fixed-length safety**: hardened live match normalization so Daily Live matches cannot fall back into Practice word-length selection when remote phase metadata is missing or invalid.
4. **Practice/Live entry reconciliation**: updated the Live panel to prefer the viewer's active joined match across Practice and Daily scopes, so host and rival clients can enter the active match state after joins instead of remaining on a stale lobby/status surface.
5. **Practice-only word-length rendering**: restricted the word-length selection UI to Practice Live matches. Daily Live OG/GO stays on the fixed five-letter Daily flow.
6. **Join live lobby affordance**: added a visible, reduced-motion-safe pulse/ring to actionable non-host `Join live lobby` buttons without changing disabled states or layout structure.

#### 28.18.2 Verification

Stage 5 completion verification:

1. `npm run lint` — clean.
2. `npm run test` — clean, 473 tests passing.
3. `npm run build` — clean, with the existing Vite large-chunk advisory.
4. `npx tsc -p tsconfig.api.json --noEmit` — clean.
5. `git diff --check` — clean.
6. Focused tests for auth, async multiplayer, live multiplayer domain, and live multiplayer panel behavior — clean.
7. Remote Supabase probe using temporary authenticated users — passed for async/live four-bucket behavior, duplicate guards, live lobby visibility/join, and cross-client live phase updates.
8. Desktop and 390px mobile browser smoke — clean for landing, Practice multiplayer, Settings/auth actions, no horizontal overflow, and no console errors.

#### 28.18.3 Remaining Gates

The following remain explicitly gated and require a later user prompt:

- PR creation.
- Merge.
- Release/deployment promotion.
- Dedicated Multiplayer tab implementation.
- Browser notifications, floating multiplayer manager, multiplayer timestamps, History/Theme tabs, bot opponents, exports/GIFs, lichess-style redesign work, or any later-phase scope.

### 28.19 Stage 6 Planning — Live Multiplayer Stability and Daily Claim Fixes

**Authorization status**: complete and verified under `phase_id = 88`-`90`. This subsection documents the critical Stage 6 bug-fix plan and completion record from `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md`. PR creation, merge, release, Stage 7 broad debugging, spectator expansion, dedicated Multiplayer tab work, deferred feature work, and later-phase work remain gated.

Stage 6 is a bug-only stability pass. The goal is to make live multiplayer playable and reliable again while correcting the Daily Multiplayer claim behavior introduced by the current cancellation policy. Async multiplayer is explicitly stable enough to use as a behavioral reference for live realtime state reconciliation.

#### 28.19.1 Binding Bug Scope

The next implementation pass, if explicitly approved, must address exactly these six bugs:

1. **Daily Multiplayer claim release after early cancellation**: when the creator cancels an unjoined Daily lobby before a rival joins, the active slot and the daily claim for that `transport:mode` bucket should be released. This applies to `async:og`, `async:go`, `live:og`, and `live:go`.
2. **Live board and turn-history realtime updates**: both players must see board state and turn history update without manual refresh during Live Practice and Live Daily games. Stale state and board/history mismatch are considered blocking defects.
3. **Practice Live flashing after word-length selection**: after word-length selection resolves, both players must transition cleanly into gameplay without rapid flashing between selection and gameplay surfaces.
4. **Creator-side word-length selection visibility**: when a rival joins a Practice Live lobby, the creator must see the word-length selection UI in realtime without refreshing.
5. **Browser refresh route preservation**: refreshing inside a multiplayer game should preserve the current tab/game context instead of returning to the Command Center/dashboard.
6. **General live instability cleanup**: delayed board updates, flashing puzzle areas, and inconsistent state between Live clients should be fixed where they share causes with the five specific bugs above.

#### 28.19.2 Explicitly Out of Scope

Do not implement during Stage 6 unless a later user prompt explicitly expands scope:

- New features of any kind.
- Spectator feature implementation, redesign, or testing beyond avoiding regressions.
- Dedicated Multiplayer tab.
- Browser notifications, floating game manager, History/Theme tabs, bots, exports/GIFs, timestamps, turn transparency, or lichess-style redesign work.
- Broad refactors that are not necessary to fix the listed bugs.

#### 28.19.3 Recommended Implementation Approach

If the user later authorizes execution, implement in this order:

1. **Reproduce and instrument first**: run two-client local and remote Supabase probes for the listed Live flows before changing behavior. Record the exact stale-state/flashing sequence so fixes are aimed at the failing transition rather than at symptoms.
2. **Daily claim release on pre-join cancellation**: audit `src/multiplayer/dailyMultiplayer.ts`, async/live cancellation helpers, repository save paths, and `multiplayer_daily_claims` handling. Change the policy narrowly so creator cancellation before a rival joins releases both active slot and Daily claim, while joined/terminal games still preserve the claim.
3. **Live realtime reconciliation**: compare live subscription/load/update behavior in `src/multiplayer/liveRepository.ts` and `src/app/App.tsx` against the more reliable async repository pattern. Prefer authoritative repository snapshots plus idempotent selected-match derivation over local optimistic oscillation.
4. **Word-length phase transition**: inspect `src/multiplayer/liveMultiplayer.ts`, `src/multiplayer/LiveMultiplayerPanel.tsx`, and `src/multiplayer/WordLengthSelectionPanel.tsx` for phase derivation races. Ensure Practice Live selection starts once after the second player joins, resolves once, and cannot re-enter selection from stale lobby/match data.
5. **Creator realtime visibility**: ensure the host subscribes to and reconciles the same joined match/participant updates as the joining rival. The creator should not need a refresh to leave the waiting lobby surface.
6. **Refresh route preservation**: inspect route persistence and launch state in `src/app/App.tsx` and related storage. Preserve the current tab/game context on reload without changing the route model or introducing the deferred Multiplayer tab.
7. **Tight verification loop**: add focused regressions after each bug fix, then finish with two authenticated browser sessions against Supabase for Live Practice, Live Daily, cancellation/reclaim, refresh preservation, board updates, and turn history.

#### 28.19.4 Suggested Work Slices

If parallel sub-agents are used during a later execution prompt, keep ownership narrow:

- **Lane A - Claim and cancellation policy**: `src/multiplayer/dailyMultiplayer.ts`, async/live cancellation helpers, repository claim/reload behavior, and relevant domain tests. Coordinate with any Supabase/RLS review before touching migrations.
- **Lane B - Live repository/realtime**: `src/multiplayer/liveRepository.ts`, subscription handling, remote snapshot normalization, and repository tests. This lane owns board/history freshness.
- **Lane C - Live domain/phase transitions**: `src/multiplayer/liveMultiplayer.ts`, word-length selection resolution, idempotent transition rules, and live domain tests. This lane owns flashing/glitch prevention.
- **Lane D - Live UI/rendering**: `src/multiplayer/LiveMultiplayerPanel.tsx`, `src/multiplayer/WordLengthSelectionPanel.tsx`, `src/multiplayer/MultiplayerGameSurface.tsx`, and component tests after Lane B/C state shapes are stable.
- **Lane E - Route preservation**: `src/app/App.tsx`, route launch/persistence state, and focused browser smoke. This lane must be coordinator-owned or explicitly sequenced because `App.tsx` is high-conflict.
- **Coordinator lane**: final integration, `CHANGELOG.md`, `progress/PROGRESS.csv`, progress reports, `agents.md`, `memory.md`, remote Supabase verification, desktop/mobile smoke, and Vercel preview after implementation.

Keep `src/app/App.tsx`, `src/multiplayer/liveMultiplayer.ts`, `src/multiplayer/liveRepository.ts`, `src/multiplayer/LiveMultiplayerPanel.tsx`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` single-writer or explicitly sequenced. Do not let one lane revert or overwrite another lane's changes.

#### 28.19.5 Risks and Considerations

- **Claim policy reversal risk**: Stage 4 deliberately preserved Daily claims after cancellation. Stage 6 intentionally changes only the pre-join cancellation case. Joined, finished, forfeited, expired, or spectator-involved flows must not become claim-reset loopholes.
- **Realtime race risk**: live lobbies, live matches, participant rows, phase updates, and local selected-state derivation can arrive in different orders. Fixes should be idempotent and recoverable from fresh snapshots.
- **Flashing/glitching risk**: the selection-to-gameplay flash may come from dueling local timers, stale normalized phases, optimistic local state, or route/selected-match fallback. Treat UI flicker as a state-machine bug until proven otherwise.
- **Refresh preservation risk**: route persistence must not corrupt solo resume slots, Calendar daily launch state, or the dedicated Daily Multiplayer countdown route behavior.
- **Schema/RLS caution**: no Supabase migration is expected. If a schema or RLS adjustment becomes necessary during implementation, it must be minimal, additive, documented, and verified remotely.
- **Scope creep**: spectator testing, dedicated Multiplayer tab work, notifications, redesign, and other deferred features remain out of scope.

#### 28.19.6 Verification Strategy

The later execution pass must finish with the standard gate:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. `npx tsc -p tsconfig.api.json --noEmit`
5. `git diff --check`

Additional required verification:

- Focused unit/domain tests for Daily claim release after creator cancellation before a rival joins, with duplicate-claim guards still enforced after a joined/terminal game.
- Async and Live cancellation/reclaim repository tests where relevant.
- Live repository/realtime tests proving both players receive board and turn-history updates.
- Practice Live two-client test proving the creator and joiner both see word-length selection without refresh, then transition once into gameplay without flashing.
- Live Daily test proving fixed five-letter Daily flow remains intact while board/history updates synchronize.
- Browser refresh test proving the active multiplayer tab/game is restored rather than falling back to the dashboard.
- Remote Supabase verification with two distinct authenticated clients for cancellation/reclaim, Practice Live selection, Live Daily/Practice board updates, and turn-history updates.
- Desktop and 390px mobile browser smoke with no console errors, no horizontal overflow, and no manual refresh needed for the listed Live flows.

#### 28.19.7 Meaningful Real Multiplayer Testing Requirement

Stage 6 execution must include real cross-client testing inside the Codex environment, not only unit tests or local single-browser simulation.

The execution agent should:

1. Run the app locally against the configured Supabase project.
2. Open at least two isolated authenticated browser contexts using Playwright/browser tooling.
3. Sign into two distinct real or temporary accounts.
4. Use those two accounts to create, discover, join, and play Live Practice and Live Daily matches.
5. Verify that the host and rival independently see lobby changes, word-length selection, countdown/gameplay transitions, board updates, turn history updates, cancellation/reclaim behavior, and browser-refresh restoration without manual refresh.
6. Pair browser E2E evidence with remote Supabase probes that validate RLS, durable row updates, subscriptions, and cleanup.
7. Record what was verified through browser contexts, what was verified through repository/domain tests, and what was verified through remote Supabase probes in the final progress report.

If real browser sign-in is blocked by credentials, Supabase project configuration, email verification, rate limits, Vercel/Supabase outages, or a connector/auth limitation, the agent must halt only if it cannot make meaningful progress. Otherwise, it should create temporary authenticated users through the available Supabase/admin path, run remote probes plus browser tests with those users, document the limitation clearly, and continue within the approved bug-fix scope.

#### 28.19.8 Gate

Stage 6 implementation is now complete under `phase_id = 88`-`90`. Halt for user review. Do not create a PR, merge, release, begin Stage 7, expand spectator work, implement a dedicated Multiplayer tab, or begin deferred/new feature work until the user explicitly authorizes that later step.

#### 28.19.9 Completion Record (`phase_id = 88`-`90`)

Stage 6 resolved the six approved bugs without adding new features:

- **Daily claim release**: unjoined creator-cancelled Daily Async games and Daily Live lobbies now release the creator's exact daily bucket claim (`async:og`, `async:go`, `live:og`, or `live:go`) while joined, terminal, forfeited, expired, and matched states remain claimed.
- **Supabase claim policy**: added and remotely applied `supabase/migrations/20260605223500_phase23_stage6_daily_claim_release.sql`; a service-role probe confirmed Live and Async claims exist after creation and are deleted after creator cancellation before a rival joins.
- **Live realtime synchronization**: Supabase live match saves now merge with the latest persisted projection and run a short post-write reconciliation loop so near-simultaneous player updates converge instead of erasing word-length choices, initialized sessions, moves, or turn history.
- **Realtime wakeups**: successful Supabase live saves broadcast lightweight refresh events to affected player channels; Postgres rows remain the source of truth.
- **Practice Live transition stability**: word-length selection rendering uses a stable match key so ordinary `updatedAt` refreshes do not remount the selection surface or create visible flashing.
- **Creator/rival realtime entry**: two-client testing confirmed the host and rival both see Practice Live word-length selection, countdown/gameplay transitions, and Daily Live gameplay without manual refresh.
- **Browser refresh preservation**: app route/practice mode and Calendar daily/async/live surfaces persist in browser storage so refreshes restore the active multiplayer context.

Verification completed:

- Focused tests for live/async domain/repository, Live panel, word-length selection, and Calendar restoration.
- Full gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Real two-client browser E2E against the configured Supabase project with temporary authenticated users for Practice Live and Daily Live on desktop-style and 390px mobile viewports.
- 390px route smoke for landing, Practice, Calendar, and Settings with no console errors and no horizontal overflow.

### 28.20 Stage 7 Planning — Whole-Game Autonomous Bug Bash and Stabilization

**Authorization status**: planned under `phase_id = 87` and explicitly authorized for execution under `phase_id = 92`. This is intentionally split from Stage 6. Stage 6 stayed focused on the six critical live multiplayer and Daily claim bugs; Stage 7 is the broad autonomous debugging pass across the whole game. Stage 7 authorizes bug fixes, stabilization, targeted tests, browser/Supabase verification, and progress tracking only; PR creation, merge, release, dedicated Multiplayer tab work, deferred feature work, redesign, and feature development remain out of scope unless separately approved.

#### 28.20.1 Rationale for Splitting Stage 7

Combining the broad bug bash with Stage 6 would blur the critical bug-only boundary in `PHASE-23-STAGE-6-LIVE-MULTIPLAYER-STABILITY-AND-DAILY-CLAIM-FIXES-SPEC-2026-06-05.md`. Stage 6 should be small enough to finish with high confidence and should not become a catch-all stabilization phase. Stage 7 can then intentionally search for and fix additional defects after the live multiplayer firebreak is resolved.

#### 28.20.2 Proposed Stage 7 Scope

If later authorized, Stage 7 should be a bug-fix and quality pass across:

1. **Core solo gameplay**: Daily OG/GO, Practice OG/GO, word lengths 2-35, hard mode, tile coloring, keyboard behavior, loss/reveal, give-up/reveal, definitions, and resume.
2. **Calendar and daily systems**: current dailies, past-daily unlocks, countdowns, midnight/reset behavior, local vs UTC daily variants, indicators, and mobile calendar rendering.
3. **Async multiplayer**: lobby creation/discovery/join, claims, cancellation, turn submission, turn history, rival identity, forfeit, refresh/reload, and mobile layout.
4. **Live multiplayer**: after Stage 6 fixes, re-test Practice/Daily live flows, board/history sync, route persistence, cancellation, forfeit, spectator non-regression, and mobile layout.
5. **Auth and sync**: sign-in, sign-up, magic link, password reset, sign-out, guest/cloud progress merge, profile, settings sync, and no duplicate GoTrue clients.
6. **Stats/economy/history**: stats dashboard, multiplayer rating summaries, coins/XP, past-daily unlock costs, history entries, sharing, and no solo/multiplayer contamination.
7. **Words/definitions/admin**: Word Explorer filtering/pagination/definition modals, definition fallbacks, admin route gating, and protected refresh behavior.
8. **Responsive/accessibility/performance**: desktop, tablet-like, and 390px mobile smoke, no console errors, no horizontal overflow, reduced-motion behavior, keyboard/touch ergonomics, and obvious loading/error states.

#### 28.20.3 Proposed Method

- Start with a written test matrix that maps routes/features to automated/unit/browser/remote checks.
- Use parallel sub-agents for read-only audits and focused lanes, but keep high-conflict source and governance surfaces coordinator-owned.
- Prefer fixing clear bugs discovered during testing; do not add new features or redesigns unless a bug cannot be resolved without a minimal UI adjustment.
- Update `CHANGELOG.md`, `progress/PROGRESS.csv`, matching `PROGRESS-STEP-N.md` files, `memory.md`, and `agents.md` after major milestones.
- Run the full verification gate and deploy a Vercel preview before halting.

#### 28.20.4 Proposed Stage 7 Verification

Stage 7 should finish with:

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. `npx tsc -p tsconfig.api.json --noEmit`
5. `git diff --check`
6. Desktop, tablet-like, and 390px mobile browser smoke for major routes.
7. Remote Supabase verification for auth/sync and multiplayer flows.
8. A concise bug-fix inventory listing every issue found, every issue fixed, any issues deferred, and the reason for each deferral.

#### 28.20.5 Gate

Stage 7 was authorized by the user's Stage 7 execution prompt after the Stage 6 safety backup merged to `main`. The execution branch is `codex/phase-23-stage-7`. Do not create a PR, merge, release, implement the dedicated Multiplayer tab, expand spectators beyond bug fixes/non-regression, or begin deferred feature work without later explicit approval.

### 28.21 Stage 6 Safety Backup Merge (`phase_id = 91`)

**Authorization status**: the user explicitly authorized this one backup/safety PR and squash merge of the current local Stage 6 state into GitHub `main` before Stage 7. This is not the official end of Phase 23 and does not authorize Stage 7 execution, a release, the dedicated Multiplayer tab, spectator expansion, deferred feature work, or later-phase work.

Purpose:

- Preserve the verified Stage 6 state on GitHub `main` before the broader Stage 7 bug bash begins.
- Give the user a clean backup/reversion point if Stage 7 introduces difficult-to-undo problems.
- Keep the backup PR focused on the current local state through Stage 6 plus this tracking record.

Gate after merge:

- Halt for user review. This gate was satisfied by the user's later Stage 7 execution prompt, which opens Stage 7 under `phase_id = 92`.
- Do not create additional PRs, merges, releases, dedicated Multiplayer tab work, deferred features, or later-phase work without later explicit approval.

### 28.22 Stage 7 Execution Kickoff and Test Matrix (`phase_id = 92`)

**Authorization status**: execution authorized by the user. This section records the required Stage 7 kickoff, branch, audit matrix, and scope guard before source-code fixes.

Starting state:

- Base branch: `main`.
- Safety-backup PR: #16.
- Base commit: `49e7f400c1ba8f6be3e048795d990b8db5ad6933`.
- Working branch: `codex/phase-23-stage-7`.

Known user-prioritized bugs:

1. **Live lobby creator auto-entry**: creators are not always automatically entering the lobby/game after a second player joins.
2. **Practice Live word-length selection timing**: selection must start only after both players are connected/entered, both clients must see the selection UI automatically, and no manual refresh should be required.
3. **Live phase instability**: continue investigating lobby creation/joining, word-length selection sync, board/history realtime updates, UI flashing, route restoration, and related Live Multiplayer instability.

Stage 7 test/audit matrix:

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

Required verification before Stage 7 completion:

1. Focused tests for every changed area.
2. `npm run lint`.
3. `npm run test`.
4. `npm run build`.
5. `npx tsc -p tsconfig.api.json --noEmit`.
6. `git diff --check`.
7. Desktop, tablet-like, and 390px browser smoke.
8. Meaningful two-client Supabase-backed browser E2E for multiplayer flows touched or audited.
9. Remote Supabase probes for relevant auth/sync/multiplayer state.
10. Vercel preview deployment, with a share URL if the direct preview is protected.

Scope guard:

- Do not create a PR, merge, or release.
- Do not implement the dedicated Multiplayer tab.
- Do not expand spectator functionality beyond bug fixes/non-regression.
- Do not add major new features, redesign the app, or begin deferred features.
- Preserve all existing invariants, especially Daily 5-letter games, Practice 2-35 lengths, four Daily Multiplayer buckets, separated rating buckets, signed-in online multiplayer ownership, solo stats/economy/history integrity, and disabled multiplayer consumable/pay-to-continue affordances.

### 28.23 Stage 7 Core Stabilization Fixes (`phase_id = 93`)

**Authorization status**: implementation checkpoint complete; Stage 7 remains active and final verification is still pending. This subsection records the first Stage 7 bug-fix batch after the kickoff/test matrix.

Implemented fixes:

1. **Live player entry acknowledgement**
   - Added an additive `playerEntryAt` projection field to Live matches.
   - Practice Live word-length selection and Daily Live countdown timers now arm only after both player seats acknowledge entering the match surface.
   - This preserves the existing Supabase schema while giving both browser clients time to render the joined match before timers progress.

2. **Live creator auto-entry and phase guardrails**
   - `LiveMultiplayerPanel` now follows a selected lobby's `matchId` once that lobby becomes matched, instead of falling back only to a generic active match.
   - Authenticated players automatically acknowledge entry when their selected match surface appears.
   - Countdown start is blocked until the countdown exists and has elapsed.
   - Supabase-backed saves merge/preserve entry acknowledgement alongside choices, progress, spectators, player IDs, and match phase.

3. **DailyVariant anti-gaming isolation**
   - The in-memory anti-gaming anchor is now keyed by `DailyVariant`.
   - Solo local-midnight and multiplayer UTC daily clocks no longer reuse the same live page-session baseline.

4. **Small whole-game audit fixes**
   - Solo Hard Mode toggles are disabled after the first submitted guess.
   - Word Explorer live-load results are keyed by requested length so stale live responses cannot render old-length entries under a new length label.
   - Shared dialogs now have mobile-safe max-height and internal scrolling.

Focused verification:

- `npm run test -- src/multiplayer/liveMultiplayer.test.ts src/multiplayer/liveRepository.test.ts src/multiplayer/LiveMultiplayerPanel.test.tsx src/multiplayer/WordLengthSelectionPanel.test.tsx src/daily/dailyCycle.test.ts src/wordExplorer/wordExplorerData.test.ts`
- Result: 57 focused tests passing.

Remaining Stage 7 verification:

- Full `npm run lint`, `npm run test`, `npm run build`, API typecheck, and `git diff --check`.
- Desktop/tablet/390px browser smoke.
- Real two-client Supabase-backed browser E2E for Async and Live Practice/Daily flows.
- Remote Supabase probes for relevant auth/sync/multiplayer rows and realtime behavior.
- Vercel preview deployment.

Scope guard remains unchanged: do not create a PR, merge, release, implement the dedicated Multiplayer tab, expand spectators beyond bug fixes/non-regression, redesign, or begin deferred feature work without later explicit user approval.

### 28.24 Stage 7 Verification and Handoff (`phase_id = 94`)

**Authorization status**: verification and handoff checkpoint for the approved Stage 7 bug-fix/stabilization pass. No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or deferred feature work is authorized by this checkpoint.

Verification coverage recorded for handoff:

1. **Real two-client multiplayer browser E2E**
   - Used two isolated authenticated browser contexts against the configured Supabase project.
   - Practice Live: creator opened a lobby, rival discovered/joined it, both clients entered word-length selection after entry acknowledgement, selection resolved, gameplay started, host submitted `about`, and rival saw board/history update without refresh.
   - Daily Live: creator opened a Daily Live OG lobby, rival discovered/joined it, both clients auto-entered the fixed 5-letter daily board without Practice-style word-length selection, and Daily claim gating appeared for the bucket.
   - Practice Async: creator opened a waiting match, rival discovered/joined it, host submitted `about`, and rival saw board/history plus turn ownership update without refresh.
   - Daily Async: Daily Multiplayer countdown opened the Daily Async surface, creator opened a Daily Async OG match, rival discovered/joined it, host submitted `about`, and rival saw board/history plus turn ownership update without refresh.

2. **Remote Supabase probes**
   - Confirmed durable async rows for Practice Async and Daily Async with both player seats and persisted `about` moves.
   - Confirmed matched live lobbies, playing live matches, both-player `playerEntryAt` acknowledgement, live participant rows, and Daily `async:og` / `live:og` claim rows for the temporary test users.
   - Temporary Stage 7 auth users and exact related async/live/claim rows were deleted after verification.

3. **Browser smoke**
   - Desktop 1440px: Word Explorer renders with pagination; definition modal opens with live dictionary content.
   - Tablet-like 834px: Settings route renders.
   - Mobile 390px: Calendar route renders.
   - All three smoke sessions reported zero console errors and no horizontal overflow.

4. **Automated gate**
   - Final lint/test/build/API-typecheck/whitespace results are recorded in `progress/PROGRESS-STEP-94.md` and the final user handoff.

No bugs were intentionally deferred during this Stage 7 pass. Remaining future work is gated to later user authorization: PR creation, merge, release, dedicated Multiplayer tab, broader spectator expansion, notifications, bots, redesigns, or later phases.

### 28.25 Stage 8 Planning — Multiplayer Unification + Time-Limited Practice Games (`phase_id = 95`)

**Authorization status**: planning and governance only. `PHASE-23-STAGE-8-MULTIPLAYER-UNIFICATION-AND-TIME-LIMITS-SPEC-2026-06-05.md` is the dedicated Stage 8 source of truth. This subsection documents the implementation plan, risks, coordination strategy, and verification expectations only. It does **not** authorize source-code edits, UI work, Supabase migrations, test changes, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or Stage 8 execution.

#### 28.25.1 Stage 8 Goals

Stage 8 should simplify Phase 23 multiplayer by replacing the current Async/Live split with one coherent **Multiplayer** model:

1. Remove the user-facing and internal distinction between "Async Multiplayer" and "Live Multiplayer".
2. Preserve the reliable async/durable-row foundation as the behavioral baseline for all multiplayer.
3. Keep **Daily Multiplayer** strictly asynchronous: current UTC day, five-letter daily lock, OG/GO separation, existing one-claim-per-day-per-mode policy, and UTC-midnight expiry only.
4. Extend **Practice Multiplayer** with optional creator-selected total time limits per side: no limit, 30 seconds, 1 minute, 2 minutes, 5 minutes, 10 minutes, 30 minutes, or 1 hour.
5. Implement timed Practice games as a chess-clock model: each player has one total budget for the whole game, the active player's clock runs while it is their turn, and time expiration produces a loss.
6. Investigate and fix the excessive memory consumption observed during multi-client testing, especially Chrome/Node/Python-like runaway processes and browser instability when two authenticated sessions are open.

#### 28.25.2 Current Architecture Observations

Current Phase 23 code contains separate async and live models:

- Async path: `src/multiplayer/asyncMultiplayer.ts`, `AsyncMultiplayerPanel.tsx`, `asyncRepository.ts`, and `async_multiplayer_games` persistence.
- Live path: `src/multiplayer/liveMultiplayer.ts`, `LiveMultiplayerPanel.tsx`, `WordLengthSelectionPanel.tsx`, `liveRepository.ts`, live lobby/match/participant/spectator migrations, live Realtime subscriptions, and live-specific Calendar indicators.
- Competitive/rating helpers currently encode transport buckets such as `async:og`, `async:go`, `live:og`, and `live:go`.
- Calendar and App wiring currently distinguish Daily Async and Daily Live surfaces.
- Stage 7 added entry-gated Live timers and a live repository subscription backstop, which improved correctness but also reinforces the need to review subscription counts, timers, and duplicate render/state loops during Stage 8.

The Stage 8 execution should use the async repository's durable row and turn-based behavior as the starting point, then selectively carry forward only the live concepts that remain useful for timed Practice games (server timestamps, participant identity, reconnect safety, and clear player-seat ownership). Live simultaneous play, live-specific selection phases, live spectators, live countdowns, and transport-specific daily buckets should be removed or migrated away unless required for data migration compatibility.

#### 28.25.3 Key Work Areas

1. **Unified multiplayer domain**
   - Create or evolve a single multiplayer model that covers Practice and Daily, OG and GO, timed and untimed Practice, waiting/joined/playing/finished/cancelled/forfeited/expired states, move history, rival identity, rating evidence, and archive views.
   - Migrate or map existing async fields into this model first; treat current live fields as compatibility input rather than the primary future shape.
   - Preserve canonical solo-style board and on-screen keyboard behavior for every multiplayer game.

2. **Practice time-limit system**
   - Add a creator-selected `timeLimitPerSideMs` or equivalent field for Practice Multiplayer lobbies/games.
   - Use server-authoritative timestamps and deterministic elapsed-time accounting where possible.
   - Run only the active player's clock for turn-based games; persist remaining time after every submitted move, forfeit, cancellation, timeout, and refresh.
   - Keep "No time limit" equivalent to current reliable async Practice behavior.

3. **Daily Multiplayer preservation**
   - Keep Daily Multiplayer strictly async, five letters, UTC day key, UTC-midnight expiry, separate OG/GO answer lists, and no time-limit UI.
   - Collapse former `async:og` / `live:og` / `async:go` / `live:go` daily buckets into the new unified Daily policy only after explicitly deciding the durable compatibility mapping. The user-facing rule in Stage 8 becomes one Daily Multiplayer OG and one Daily Multiplayer GO per UTC day unless a later prompt states otherwise.
   - Calendar indicators should simplify to solo OG/GO plus unified multiplayer OG/GO; past Daily Multiplayer archives remain view-only.

4. **Terminology and UI cleanup**
   - Replace "Async Multiplayer" with "Multiplayer".
   - Remove "Live Multiplayer" from player-facing surfaces.
   - Update Practice and Calendar sections, route launch requests, status copy, settings labels, stats summaries, progress docs, and tests.
   - Do not implement the dedicated Multiplayer tab in Stage 8; keep Calendar and Practice as entry points unless the execution prompt explicitly changes this gate.

5. **Persistence and Supabase**
   - Prefer additive migrations and compatibility views/columns over destructive table rewrites unless the user separately approves a migration strategy.
   - Decide whether to evolve `async_multiplayer_games` into the unified table or add a new `multiplayer_games` table and migrate reads/writes in stages.
   - Preserve RLS: authenticated distinct users, no self-match, seat-owned mutations only, safe rival identity, no direct rating mutation, and no raw email/id exposure.
   - Remove or retire live lobbies/matches/participants/spectators only after compatibility and cleanup are planned.

6. **Ratings, scoring, stats, and history**
   - Update rating bucket terminology away from `async`/`live` toward unified Multiplayer buckets while preserving historical safety and not double-applying rating transactions.
   - Ensure timed Practice losses produce valid result evidence when rated eligibility allows it.
   - Keep solo stats/economy/history isolated from multiplayer.

7. **Memory and performance investigation**
   - Audit duplicate Supabase clients, realtime subscriptions, polling intervals, useEffect dependency loops, localStorage restore loops, heavy all-row snapshots, large in-memory projections, and unnecessary rerenders in `src/app/App.tsx`, Calendar, and multiplayer panels.
   - Treat the Stage 7/Stage 8 multi-client memory issue as a blocking requirement, not polish.
   - Measure before and after with two isolated browser contexts and process/browser memory checks. Do not rely on subjective responsiveness alone.

#### 28.25.4 Recommended Sequencing

Stage 8 should be implemented in deliberate slices:

1. **Read-only baseline and instrumentation**
   - Record current multiplayer data flow, route flow, subscription counts, timers, and two-client memory baseline.
   - Add or prepare lightweight memory/performance probes if needed, but keep them dev/test-only.

2. **Unified model design and compatibility plan**
   - Define the single multiplayer domain shape, time-limit fields, Daily policy, rating bucket mapping, and Supabase migration strategy.
   - Decide whether live records become migrated data, archived compatibility data, or unsupported pre-release artifacts.

3. **Domain and tests**
   - Implement pure timed/untimed Practice logic, Daily expiry logic, claim rules, timeout loss settlement, forfeit/cancel behavior, and rating evidence mapping with focused tests before UI integration.

4. **Repository and Supabase seam**
   - Consolidate repository subscriptions and save paths around the unified model.
   - Reduce duplicated realtime/polling listeners and ensure unsubscribe cleanup is deterministic.

5. **UI integration**
   - Replace Async/Live panels with the unified Multiplayer surface while preserving Calendar and Practice entry points.
   - Add Practice time-limit selection and visible clocks.
   - Simplify Calendar indicators and terminology.

6. **Removal and cleanup**
   - Remove unused Live-specific modules, tests, CSS, route state, localStorage breadcrumbs, and docs references after replacement is verified.
   - Keep compatibility shims only where they have a clear migration purpose and a removal note.

7. **Verification and preview**
   - Run full automated and browser gates, real two-client timed and untimed Practice Multiplayer, Daily Multiplayer, memory checks, and a preview deploy.

#### 28.25.5 Parallel Work Slices

If execution uses sub-agents, use narrow disjoint lanes:

- **Domain lane**: unified model, timed clock reducer, Daily policy, rating/scoring compatibility. Own pure `src/multiplayer/` domain modules and tests only.
- **Persistence lane**: Supabase schema/adapter strategy, RLS, repository subscription cleanup, migration docs. Own repository/migration files only after the coordinator approves the model shape.
- **UI lane**: Practice time-limit selector, clocks, unified panel copy, Calendar indicators, responsive states. Avoid `src/app/App.tsx` until coordinator integration.
- **Performance lane**: read-only memory/subscription audit first; later own dev-only probes or focused performance fixes with explicit file ownership.
- **Coordinator lane**: `src/app/App.tsx`, route/launch integration, high-conflict docs, changelog, progress, final verification, Vercel preview, and remote cleanup.

Only one writer should touch `src/app/App.tsx`, `src/multiplayer/index.ts`, repository adapters, Supabase migrations, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` at a time.

#### 28.25.6 Major Risks and Considerations

- **Scope size**: this is a significant refactor. Execution should avoid trying to simultaneously implement the deferred dedicated Multiplayer tab or redesign the app.
- **Data compatibility**: existing async/live/local/Supabase records may exist in user storage or remote tables. Plan for safe migration, ignore-with-explanation, or compatibility reads before removing code paths.
- **Daily invariants**: Daily Multiplayer must stay five letters, UTC-based, no time limits, and one claim per mode/day under the unified policy.
- **Clock fairness**: timed Practice games need server-time anchoring and deterministic timeout settlement; client-only timers are display hints, not authoritative state.
- **Rating correctness**: transport bucket changes must not mix old async/live ratings unsafely or double-apply previous result transactions.
- **Memory pressure**: removing Live terminology alone is not enough. Execution must demonstrate fewer duplicate clients/subscriptions/timers and stable multi-client memory behavior.
- **Spectator remnants**: Stage 8 removes Live as a concept and does not expand spectator functionality. Any existing spectator code should be removed, archived, or compatibility-gated rather than extended.

#### 28.25.7 Verification Requirements

Stage 8 execution must finish with:

1. Focused unit tests for unified multiplayer state, timed Practice clocks, timeout loss, Daily no-time-limit policy, claims, cancellation, forfeit, scoring/rating evidence, and compatibility mappings.
2. Repository/Supabase tests or probes for unified lobby creation, discovery, joining, turn submission, timeout settlement, and RLS ownership.
3. Component/browser tests for Practice Multiplayer timed and untimed games, Daily Multiplayer OG/GO, Calendar indicators, terminology cleanup, and mobile clock layout.
4. Real two-client browser E2E with distinct authenticated sessions for:
   - Practice Multiplayer untimed.
   - Practice Multiplayer timed with visible clocks and at least one timeout/near-timeout path.
   - Daily Multiplayer OG and GO with no time-limit UI.
   - Refresh/reconnect during a timed Practice game.
5. Memory/performance checks:
   - Establish baseline before implementation if possible.
   - Re-test two concurrent authenticated browser sessions after implementation.
   - Report process/browser memory observations and any remaining suspected high-memory sources.
6. Full gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, desktop/tablet/390px smoke, no console errors, no horizontal overflow, remote Supabase cleanup/probes, and Vercel preview deployment.

#### 28.25.8 Gate

This `phase_id = 95` step is complete when the planning/tracking surfaces are updated and the user receives a summary. Stage 8 implementation remains gated until the user explicitly authorizes it in a later prompt. Do not edit `src/`, `api/`, or `supabase/`, create implementation branches, run migrations, create a PR, merge, release, or begin deferred feature work in this planning pass.

### 28.26 Stage 8 Execution — Unified Multiplayer, Practice Chess Clocks, and Memory Remediation (`phase_id = 96`-`97`)

**Authorization status**: implemented after explicit user authorization. `PHASE-23-STAGE-8-MULTIPLAYER-UNIFICATION-AND-TIME-LIMITS-SPEC-2026-06-05.md` remains the Stage 8 source of truth. This section records the executed state and verification handoff only; it does **not** authorize PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, notifications, bots, social features, redesign, or later-phase work.

#### 28.26.1 Implemented State

Stage 8 collapses the active multiplayer experience into one **Multiplayer** model:

1. **Unified active model**
   - The durable async foundation was renamed into the active `multiplayer` domain, repository, panel, and tests.
   - The user-facing Calendar and Practice surfaces now expose **Daily Multiplayer** and **Practice Multiplayer** instead of separate Async/Live choices.
   - Mounted Live App/Calendar paths and obsolete Live modules were removed from the active source tree.
   - Legacy Calendar restore payloads and guest-storage `asyncMultiplayer` payloads remain readable compatibility input.

2. **Daily Multiplayer preservation**
   - Daily Multiplayer remains strictly asynchronous and turn-based.
   - Daily games remain five-letter, UTC-day keyed, and UTC-midnight expiring.
   - Daily OG and GO answer selection remains separate from solo Daily and from each other.
   - No Practice time-limit UI, chess-clock fields, or timeout behavior is exposed for Daily Multiplayer.
   - Existing Supabase `async_multiplayer_games` and `multiplayer_daily_claims` plumbing remains as compatibility storage for the unified durable model.

3. **Practice chess-clock time limits**
   - Practice lobby creators can choose no limit, 30 seconds, 1 minute, 2 minutes, 5 minutes, 10 minutes, 30 minutes, or 1 hour per side.
   - The time model is a total per-player budget for the whole game, not a per-turn increment.
   - Timed Practice games start clocks only once a second authenticated player joins.
   - The active player's clock runs while it is their turn; each submitted move persists elapsed time, remaining budgets, and the next turn.
   - Running out of time records a timeout loss for the timed-out player.
   - Untimed Practice games continue to behave like the previous reliable durable turn-based flow.

4. **Persistence compatibility**
   - The app keeps the existing `async_multiplayer_games` table and `brrrdle:async-multiplayer:v1` local-storage key as private compatibility plumbing.
   - The in-projection model uses unified rating buckets such as `multiplayer:og`; top-level Supabase storage writes use legacy-compatible bucket values only where the deployed table's historical check constraints require them.
   - No destructive Supabase migration was introduced in this execution pass.

5. **Memory/performance remediation**
   - Removing mounted Live paths deletes the duplicate live repository, live panel, live match reducer, Practice Live selection panel, live timers, and live subscription path from the active app.
   - Practice clock display uses a single interval only while a visible timed Practice game is playing.
   - Browser smoke and CDP heap/DOM-counter sampling were used to confirm two authenticated contexts remain bounded during multi-client testing.

#### 28.26.2 Verification Summary

Stage 8 verification covered:

- Focused regression tests for the unified multiplayer domain, repository, panel, scoring, and Calendar.
- Full lint, test, build, API typecheck, and whitespace gates.
- Real two-client Supabase-backed browser checks with temporary authenticated users:
  - Untimed Practice Multiplayer create/join/turn/history/refresh.
  - Timed Practice Multiplayer create/join with a visible 30-second chess clock in both browsers.
  - Daily Multiplayer create/join with no time-limit UI and durable Daily claim rows.
- Desktop, tablet-like, and 390px mobile browser smoke for Calendar/Practice terminology, no horizontal overflow, and no console errors.
- Memory/performance smoke with two authenticated contexts held open and navigated across surfaces.

#### 28.26.3 Remaining Gates

Stage 8 is complete for user review, but the following remain explicitly gated:

- PR creation.
- Merge.
- Release.
- Dedicated Multiplayer tab implementation.
- Spectator expansion or replacement.
- Notifications, floating game manager, bots, social features, or redesign work.
- Later Phase 23 stages or Phase 24+ work.

### 28.27 Stage 9 Planning — Timer Bugs, Practice Hard Mode, and Multiplayer Scoring (`phase_id = 98`)

**Authorization status**: planning and governance only. `PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md` is the dedicated Stage 9 source of truth. This subsection documents the proposed implementation approach, risks, coordination strategy, and verification expectations only. It does **not** authorize source-code edits, UI/component work, tests, Supabase migrations, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or Stage 9 execution.

#### 28.27.1 Stage 9 Goals

Stage 9 should build directly on the Stage 8 unified Multiplayer model:

1. Fix the critical timed Practice Multiplayer turn timer / board synchronization bug.
2. Add optional **Practice Multiplayer Hard Mode** as a creator-selected lobby setting that is visible before join and locked after join.
3. Define and implement a fair, explainable multiplayer scoring/point system for OG and GO games.
4. Preserve Daily Multiplayer invariants: Daily remains strictly asynchronous/no-clock, five letters, UTC-day keyed, UTC-midnight expiring, and separated between OG and GO.
5. Keep the unified Multiplayer terminology and do not reintroduce player-facing Async/Live concepts.

#### 28.27.2 Current Architecture Observations

Stage 8 leaves the active multiplayer source centered on these files:

- `src/multiplayer/multiplayer.ts`: unified domain model, Practice time-limit fields, turns, timeouts, forfeit, cancel, Daily expiry, and helpers.
- `src/multiplayer/multiplayerRepository.ts`: local/Supabase persistence over the compatibility `async_multiplayer_games` table and repository subscription behavior.
- `src/multiplayer/MultiplayerPanel.tsx`: Practice/Daily lobby creation, joining, status panels, and time-limit selector.
- `src/multiplayer/MultiplayerGameSurface.tsx`: canonical solo-style board and on-screen keyboard gameplay surface for multiplayer.
- `src/multiplayer/scoring.ts`, `rating.ts`, `competitiveMultiplayer.ts`, `customGames.ts`, and `matchmaking.ts`: competitive projections that must be aligned with the unified scoring model.
- `src/game/session.ts`, `src/game/hardMode.ts`, `src/game/og/session.ts`, and `src/game/go/session.ts`: canonical solo validation and Hard Mode behavior that Stage 9 should reuse rather than fork.
- `src/app/App.tsx` and `src/calendar/CalendarPanel.tsx`: high-conflict integration surfaces; Daily must remain no-clock and Calendar entry points should stay unchanged unless required for status display.

The Stage 9 timer bug likely lives at the intersection of `turnStartedAt`, `timeRemainingMs`, repository snapshot reconciliation, and the board/session state saved after a timed turn. Execution should reproduce it with two authenticated browser contexts before changing code, then add focused regressions that fail for disappearing rival guesses or the wrong player's clock expiring.

#### 28.27.3 Key Work Areas

1. **Timed Practice clock and board synchronization**
   - Reproduce the reported bug in a timed Practice Multiplayer match with two real authenticated browser contexts.
   - Inspect the turn submission flow from `MultiplayerGameSurface` through `submitMultiplayerGuess`, `applyActivePlayerClock`, repository save/load, and subscription reconciliation.
   - Ensure a submitted guess persists on both players' boards after refresh/subscription updates.
   - Ensure only the active player's clock is decremented during their turn; the opponent's clock must remain stable until their turn begins.
   - Keep untimed Practice Multiplayer behavior identical to the Stage 8 durable turn-based baseline.
   - Treat displayed clocks as derived display state; persisted clock state should be authoritative enough to survive refresh/reconnect and remote row reconciliation.

2. **Practice Multiplayer Hard Mode**
   - Add a Practice-only `hardMode` or equivalent field to the unified lobby/game model.
   - Expose the setting in Practice lobby creation only; do not add Hard Mode controls to Daily Multiplayer beyond existing Daily game behavior.
   - Show Hard Mode status to a prospective rival before joining so the rival can make an informed decision.
   - Lock Hard Mode once the game is joined; no player should be able to change it mid-game.
   - Reuse canonical Hard Mode validation from `src/game/hardMode.ts` / session reducers to avoid multiplayer-specific drift.
   - Store Hard Mode in the durable game projection so reloads, remote clients, and archives remain consistent.

3. **Multiplayer scoring and winner/draw rules**
   - Define a pure scoring module or extend `src/multiplayer/scoring.ts` so score projection is deterministic, side-effect free, and testable from completed game state.
   - Points must be earned from each player's own guesses and solve status only; one player's performance must not directly subtract from the rival's score.
   - OG winner policy:
     - If exactly one player solves, that player wins.
     - If both solve, compare points and declare higher score winner or draw on equal points.
     - If neither solves, compare points and declare higher score winner or draw on equal points.
   - GO winner policy:
     - Compare total points across the full GO session.
     - Solving the final puzzle contributes points, but winner is still highest total points; equal totals draw.
   - Timed-out or forfeited games should produce clear terminal scoring evidence without granting the losing player an artificial solve.
   - Hard Mode bonus should be explicit, modest, and documented in tests so it can later become rating evidence without distorting fairness.
   - Keep ELO/rating settlement integration deferred unless Stage 9 execution specifically needs to pass scoring evidence to already-existing projection helpers without applying new rating rules.

4. **UI and feedback**
   - Display Hard Mode and time-limit status in waiting lobbies, joined games, and finished summaries.
   - Display per-player points and the final winner/draw reason on game completion.
   - Keep mobile layouts compact and avoid large result panels that push the board/keyboard off-screen.
   - Do not redesign the multiplayer surface or implement the dedicated Multiplayer tab.

5. **Persistence and compatibility**
   - Store new Hard Mode and scoring fields inside the existing unified game projection first.
   - Avoid destructive Supabase schema changes. If the current JSON projection can carry the fields, prefer no migration in Stage 9 unless a constraint or query requirement forces one.
   - Preserve existing `async_multiplayer_games` table compatibility naming as private plumbing.
   - Do not weaken RLS/seat ownership, distinct-user joins, Daily claim rules, or safe rival identity projection.

#### 28.27.4 Recommended Sequencing

Stage 9 execution should be ordered to reduce risk:

1. **Reproduction and failing tests**
   - Use two-client Supabase-backed browser E2E to reproduce the timed Practice bug.
   - Add focused failing tests around clock application, turn handoff, board persistence, and repository reconciliation.

2. **Timer/board fix**
   - Fix the minimal domain/repository/UI seam needed so timed moves persist and clocks advance for the correct player only.
   - Verify untimed Practice and Daily Multiplayer are unchanged.

3. **Hard Mode model and validation**
   - Add Practice-only Hard Mode to lobby creation and durable game state.
   - Reuse canonical validation and add tests that invalid Hard Mode guesses are rejected in multiplayer.
   - Add lobby/result UI copy only after the model is stable.

4. **Scoring model**
   - Implement pure point calculation for OG and GO with fixture-heavy tests covering solve, no-solve, tie, timeout, forfeit, and Hard Mode bonus cases.
   - Integrate scoring into terminal game summaries without changing rating settlement rules unless strictly required by existing code.

5. **Final integration and verification**
   - Run real two-client timed/untimed Practice E2E, Daily non-regression, desktop/mobile smoke, remote Supabase probes, and the full automated gate.

#### 28.27.5 Parallel Work Slices

If execution uses sub-agents, keep ownership narrow:

- **Timer bug lane**: `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, and focused domain/repository tests for timed move persistence and clock handoff.
- **Hard Mode lane**: Practice lobby state, canonical validation wiring, and focused tests in `src/multiplayer/` after the timer lane stabilizes the domain shape.
- **Scoring lane**: `src/multiplayer/scoring.ts` and scoring tests; read-only access to domain/session types until integration is sequenced.
- **UI lane**: `src/multiplayer/MultiplayerPanel.tsx`, `src/multiplayer/MultiplayerGameSurface.tsx`, and component tests after domain/scoring contracts stabilize.
- **Coordinator lane**: `src/app/App.tsx`, repository integration, high-conflict docs/progress/changelog, real two-client Supabase verification, responsive smoke, and final handoff.

Keep `src/app/App.tsx`, `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, `src/multiplayer/MultiplayerPanel.tsx`, `src/multiplayer/MultiplayerGameSurface.tsx`, `CHANGELOG.md`, `AGENT-IMPLEMENTATION-PLAN.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` single-writer or explicitly sequenced.

#### 28.27.6 Major Risks and Considerations

- **Clock fairness**: client-side display intervals must not become authoritative game state. Persisted elapsed-time application should use stable timestamps and avoid penalizing the inactive player.
- **Snapshot races**: the bug description suggests stale repository projections can overwrite submitted moves or clock state. Execution should preserve both players' boards and clock fields during save/reconcile.
- **Daily regression risk**: Daily Multiplayer must remain strictly no-clock and should not inherit Practice Hard Mode lobby controls or scoring fields in a way that changes Daily claim/expiry behavior.
- **Hard Mode parity**: multiplayer Hard Mode must match solo Hard Mode constraints, including discovered greens/yellows and duplicate-letter edge cases.
- **Scoring clarity**: score rules must be easy to explain in UI and tests. Avoid hidden penalties based on the rival's performance.
- **ELO boundary**: Stage 9 scoring may prepare evidence for future rating work, but it should not overhaul ELO/rating unless the execution prompt explicitly authorizes that integration.
- **Compatibility**: new fields should serialize and normalize safely when old game projections omit them.

#### 28.27.7 Verification Requirements

Stage 9 execution must finish with:

1. Focused unit tests for timed Practice clock application, board persistence, timeout loss, untimed no-regression, Hard Mode validation, score calculation, winner/draw projection, and legacy projection normalization.
2. Repository/Supabase tests or probes for persisted timed turns, rival snapshot visibility, clock fields, Hard Mode fields, and terminal scoring summaries.
3. Component/browser tests for lobby Hard Mode visibility, time-limit display, clocks, multiplayer board retention after a move, and finished points/outcome summaries.
4. Real two-client browser E2E with distinct authenticated sessions for:
   - Timed Practice Multiplayer, including at least one turn handoff after a submitted guess.
   - Untimed Practice Multiplayer non-regression.
   - Practice Hard Mode lobby creation, join visibility, invalid Hard Mode guess rejection, and terminal scoring.
   - Daily Multiplayer OG/GO no-clock, no-Hard-Mode-lobby-control, and no-claim-regression smoke.
5. Responsive smoke for desktop, tablet-like, and 390px mobile viewports with no console errors and no horizontal overflow.
6. Full gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, remote Supabase cleanup/probes, and Vercel preview deployment if implementation is authorized.

#### 28.27.8 Gate

This `phase_id = 98` planning step is complete when the planning/tracking surfaces are updated and the user receives a summary. Stage 9 implementation remains gated until the user explicitly authorizes it in a later prompt. Do not edit `src/`, `api/`, or `supabase/`, create implementation branches, run migrations, create a PR, merge, release, or begin deferred feature work in this planning pass.

### 28.28 Stage 9 Execution — Timer Bug Fix, Practice Hard Mode, and Multiplayer Scoring (`phase_id = 99`-`100`)

**Authorization status**: implementation completed for user review. The user explicitly authorized Stage 9 execution from `PHASE-23-STAGE-9-TIMER-BUGS-AND-MULTIPLAYER-SCORING-SPEC-2026-06-06.md`. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, notifications, bots, social features, redesign work, and later-phase work remain gated.

#### 28.28.1 Implemented Scope

Stage 9 implemented the approved timer/Hard Mode/scoring scope on top of the Stage 8 unified Multiplayer model:

1. **Timed Practice Multiplayer synchronization**
   - Added per-player `playerSessions` to unified Multiplayer game projections while preserving the shared `serializedSession` compatibility field for older storage and answer access.
   - Updated turn submission so a guess mutates only the submitting player's session and the play surface restores the viewer player's own board.
   - Fixed GO move history to record the submitting player's current puzzle index rather than the shared compatibility session's puzzle index.
   - Treated stored `playing` as a valid normalized game status so active GO/Practice games are not accidentally re-derived as terminal from a compatibility session.
   - Scoped timed Practice expiration to the authenticated viewer's active turn in `App.tsx`, preventing an inactive rival browser from expiring the wrong clock.
   - Hardened Supabase saves so duplicate create races use `upsert(..., ignoreDuplicates: true)` and existing-row updates reject stale projections that would drop already-persisted moves.

2. **Practice Multiplayer Hard Mode**
   - Added a Practice-only `hardMode` field to lobby/game creation and normalization.
   - Copied the Hard Mode flag into each player's canonical OG/GO serialized session, reusing the existing solo validation behavior.
   - Added a creator-selected Practice lobby control and a rival-visible waiting/active game status display.
   - Kept Daily Multiplayer free of Practice time-limit and Hard Mode lobby controls.

3. **Multiplayer scoring**
   - Added deterministic per-player points for OG and GO based on the player's own guesses, solve status, unused attempts, and a modest Hard Mode solve bonus.
   - Kept scoring pure and suitable as future rating evidence without changing ELO/rating settlement rules.
   - Implemented winner/draw summaries for solve, timeout, forfeit, and points outcomes; GO winners are projected from total points across the full session.

#### 28.28.2 Files and Surfaces

High-impact implementation surfaces:

- `src/multiplayer/multiplayer.ts`: per-player sessions, Hard Mode projection, timed expiry ownership, GO puzzle-index fixes, and normalization.
- `src/multiplayer/multiplayerRepository.ts`: duplicate-safe Supabase row creation and stale-save protection.
- `src/multiplayer/scoring.ts`: deterministic OG/GO points and winner/draw summaries.
- `src/multiplayer/MultiplayerGameSurface.tsx`: viewer-seat board restoration.
- `src/multiplayer/MultiplayerPanel.tsx`: Practice-only Hard Mode UI and game status display.
- `src/app/App.tsx`: viewer-owned timed Practice expiration interval.
- Focused tests under `src/multiplayer/*.test.ts(x)`.

#### 28.28.3 Verification Summary

Automated verification passed:

- `npm run lint`
- `npm run test` (69 files / 458 tests)
- `npm run build` (succeeds with the existing large-chunk advisory)
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`

Focused Stage 9 regressions passed for:

- Timed Practice board persistence and active-player-only clock decrement.
- Stale timed timeout projections not overwriting newer submitted turns.
- Practice Hard Mode creation/validation and Daily no-Hard-Mode UI non-regression.
- Viewer-seat board rendering in the multiplayer play surface.
- OG points winner, Hard Mode score bonus, and GO total-points winner projection.

Real Supabase-backed browser verification passed with temporary authenticated users:

- Timed Practice Multiplayer with 30-second clocks and Hard Mode on: lobby visible to rival, Hard Mode visible before join, both players joined, host submitted through the on-screen keyboard, host refresh preserved the submitted board, rival submitted, both per-player sessions and moves persisted, and no console/network errors were recorded.
- Untimed Practice Multiplayer: lobby creation, join, on-screen keyboard submission, turn handoff, durable row persistence, and no console/network errors.
- Daily Multiplayer: lobby creation/join/submission, Daily claim rows, no Practice time-limit or Hard Mode controls, no Daily clock/Hard Mode projection leakage, and no console/network errors.
- Desktop, tablet-like, and 390px mobile route smoke for Calendar, Practice, Words, Stats, and Settings passed with no console/page errors and no horizontal overflow.

All temporary Supabase users, multiplayer rows, and Daily claim rows created during verification were cleaned up.

#### 28.28.4 Residual Notes

- The deployed Supabase table remains `async_multiplayer_games` as private Stage 8 compatibility plumbing; this is not user-facing terminology.
- Stage 9 did not add Supabase migrations because the existing JSON projection can carry `playerSessions`, Practice Hard Mode, and scoring-derived data.
- Custom-code Practice lobbies still appear dependent on deployed schema parity for `custom_game_code`; this was not part of the Stage 9 spec and remains outside the completed timer/Hard Mode/scoring scope.
- PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, and later-phase work remain gated.

### 28.29 Stage 10 Planning — Multiplayer Debugging and Bug Fixes (`phase_id = 101`)

**Authorization status**: planning and governance only. `PHASE-23-STAGE-10-MULTIPLAYER-DEBUGGING-AND-BUGFIXES-SPEC-2026-06-06.md` is the dedicated Stage 10 source of truth. The spec originally names §28.28 as the future plan slot, but §28.28 is already occupied by Stage 9 execution in the current repository, so Stage 10 is recorded here as the next available subsection, §28.29.

This planning entry does **not** authorize source-code edits, UI/component work, tests, Supabase migrations, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, or Stage 10 execution.

#### 28.29.1 Stage 10 Goal

Stage 10 is a targeted debugging and stabilization pass for the current unified Multiplayer system. Its primary goal is to fix the critical cross-client board/keyboard synchronization bug reported after Stage 9:

- Player 1 submits a valid Practice Multiplayer guess.
- Turn history updates for both players.
- Player 1's board and keyboard update correctly.
- Player 2's board does not display the submitted letters, and Player 2's keyboard state does not reflect the played letters.

The stage may also fix other clearly broken multiplayer synchronization, state, or UX bugs discovered during the required real two-client testing, provided they stay tightly related to multiplayer stability and do not expand into new features.

#### 28.29.2 Key Invariants

Stage 10 execution must preserve these invariants:

- Daily Multiplayer remains strictly asynchronous, five letters, UTC-day keyed, UTC-midnight expiring, and separate between OG and GO.
- Daily Multiplayer must not gain Practice time limits, Practice Hard Mode lobby controls, or new Daily claim behavior.
- Practice Multiplayer chess-clock time limits, optional Practice Hard Mode, scoring, unified terminology, and Stage 8/9 compatibility behavior must not regress.
- The `playerSessions` + `getMultiplayerSessionForPlayer` model remains the preferred viewer-board source. The shared `serializedSession` remains compatibility/answer plumbing only.
- Solo gameplay, Daily solo behavior, economy, stats, auth/sync, admin, and non-multiplayer areas are out of scope except for non-regression checks.

#### 28.29.3 Recommended Debugging Approach

Execution should follow a reproduce-first flow:

1. **Reproduce with real two-client Supabase E2E**
   - Use two isolated authenticated browser contexts and the configured Supabase project.
   - Reproduce the bug in untimed Practice Multiplayer first, then timed Practice, then Practice Hard Mode.
   - Capture whether Supabase rows contain the submitted move, whether repository subscriptions deliver it, and whether each client renders the expected board and keyboard state.

2. **Isolate the failure point**
   - Check whether `submitMultiplayerGuess` persists the move into the correct player session and move history.
   - Check whether `multiplayerRepository.ts` projection reconciliation preserves both player sessions, shared compatibility session fields, moves, and timestamps.
   - Check whether `MultiplayerGameSurface` intentionally renders only the viewer player's session, and whether the desired rival-board/keyboard feedback requires an opponent-progress projection rather than reading from the viewer session.
   - Confirm keyboard state expectations for the rival view: if both players should see all played letters, the projection must be derived from shared move/session evidence without letting one player mutate the other's canonical session.

3. **Fix minimally and robustly**
   - Prefer a targeted strengthening of projection/state derivation over a broad multiplayer rewrite.
   - Preserve the Stage 9 stale-save and duplicate-safe upsert protections.
   - Avoid changing Daily claim, Daily answer, rating, scoring, or solo session behavior unless a regression test proves the change is required and remains inside Stage 10 scope.

4. **Broaden within multiplayer only**
   - After the critical bug is fixed, run a focused multiplayer bug sweep for nearby synchronization failures: consecutive turns, refresh/reconnect, timed clocks, Hard Mode validation, scoring summaries, forfeits, cancellation, and Daily non-regression.

#### 28.29.4 Suggested Work Slices

If execution uses parallel sub-agents, keep ownership narrow and sequence high-conflict surfaces:

- **Reproduction/probe lane**: read-only two-client browser reproduction, Supabase row snapshots, subscription/event notes, and a concise failure matrix.
- **Domain/session lane**: `src/multiplayer/multiplayer.ts` and focused tests for per-player sessions, shared move visibility, keyboard derivation, and turn progression.
- **Repository lane**: `src/multiplayer/multiplayerRepository.ts` and repository tests for projection reconciliation, stale-save guards, subscription delivery, and refresh restoration.
- **UI surface lane**: `src/multiplayer/MultiplayerGameSurface.tsx`, `src/multiplayer/MultiplayerPanel.tsx`, and component tests after the domain/repository contract is clear.
- **Verification lane**: real two-client E2E, remote Supabase cleanup/probes, responsive smoke, and final full gate evidence.
- **Coordinator lane**: `src/app/App.tsx` if needed, plus `CHANGELOG.md`, `progress/PROGRESS.csv`, `agents.md`, `memory.md`, and final integration.

Keep `src/app/App.tsx`, `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, `src/multiplayer/MultiplayerGameSurface.tsx`, `src/multiplayer/MultiplayerPanel.tsx`, `CHANGELOG.md`, `AGENT-IMPLEMENTATION-PLAN.md`, `progress/PROGRESS.csv`, `agents.md`, and `memory.md` single-writer or explicitly sequenced.

#### 28.29.5 Risks and Considerations

- **Viewer-session vs shared-state semantics**: Stage 9 intentionally restored each viewer's board from that viewer's own session. Stage 10 must distinguish preserving player-owned guesses from also showing shared rival progress. Do not solve the bug by letting one browser overwrite the other player's canonical session.
- **Keyboard derivation**: The shared keyboard state may need a pure projection from all visible multiplayer moves while canonical guess validation still uses the active player's own session.
- **Snapshot races**: Repository saves and subscriptions must not drop player sessions, moves, clock fields, Hard Mode, scoring evidence, or terminal state.
- **Daily safety**: Daily Multiplayer must remain no-clock and no-Hard-Mode. Daily non-regression is mandatory, but Daily behavior changes are out of scope.
- **Test determinism**: Supabase-backed browser tests should create isolated temporary users/rows, probe exact rows, and clean them up.
- **Scope creep**: Stage 10 is not a dedicated Multiplayer tab, spectator expansion, notification, bot, social, redesign, scoring overhaul, rating overhaul, or release stage.

#### 28.29.6 Verification Expectations

Execution must include:

1. Focused tests that fail before the fix and pass after for cross-client board/keyboard visibility, turn history consistency, subscription/repository reconciliation, timed Practice clocks, untimed Practice, and Hard Mode Practice.
2. Real two-client Supabase-backed browser E2E for:
   - Untimed Practice Multiplayer.
   - Timed Practice Multiplayer.
   - Practice Multiplayer with Hard Mode enabled.
   - Multiple consecutive turns and at least one browser refresh/reload.
3. Daily Multiplayer non-regression checks confirming no clocks, no Practice Hard Mode lobby controls, Daily claim safety, and unchanged Daily answer/expiry semantics.
4. Responsive smoke on desktop, tablet-like, and 390px mobile viewports with zero console errors and no horizontal overflow.
5. Full gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, remote Supabase probes/cleanup, and Vercel preview deployment if implementation is later authorized.

#### 28.29.7 Gate

This `phase_id = 101` planning step is complete when the planning/tracking surfaces are updated and the user receives a summary. Stage 10 implementation remains gated until the user explicitly authorizes it in a later prompt. Do not edit `src/`, `api/`, or `supabase/`, create implementation branches, run migrations, create a PR, merge, release, or begin deferred feature work in this planning pass.

### 28.30 Stage 10 Implementation Checkpoint — Multiplayer Synchronization Fixes (`phase_id = 102`)

**Authorization status**: execution authorized by the user from `PHASE-23-STAGE-10-MULTIPLAYER-DEBUGGING-AND-BUGFIXES-SPEC-2026-06-06.md`. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating overhaul, and later-phase work remain gated.

#### 28.30.1 Reproduction Evidence

Stage 10 followed the reproduce-first requirement before source changes:

- Two isolated authenticated browser contexts were created against the configured Supabase project using temporary users.
- Practice Multiplayer lobby creation, rival discovery, join, and one submitted OG turn were exercised through the real UI.
- Supabase rows showed one durable shared move and player-one's canonical `playerSessions['player-one']` guess, while player-two's canonical session correctly remained empty.
- Before the fix, player-one's board/keyboard rendered the submitted `aahed` row and colored keys, but player-two's board showed blank row-one tiles and player-two's keyboard remained in the unknown state.

#### 28.30.2 Implemented Fixes

Stage 10 implementation remains narrow and multiplayer-focused:

1. **Shared visible board/keyboard projection**
   - `MultiplayerGameSurface` now derives a display-only puzzle projection from durable `game.moves` for the active puzzle index.
   - Both players see submitted shared moves on the visible board and keyboard.
   - Canonical validation and mutation still use the viewer's `playerSessions` entry via `getMultiplayerSessionForPlayer`.
   - The shared `serializedSession` remains compatibility/answer plumbing only.

2. **Timed Practice clock checkpointing**
   - `applyClockForTurn` now checkpoints `turnStartedAt` whenever it persists a non-terminal remaining-time decrement.
   - This prevents repeated app interval saves and UI clock reads from double-counting the same elapsed time.
   - Timed Practice games no longer expire the active player prematurely during normal first-turn entry.

3. **Timed Practice draft stability**
   - `MultiplayerGameSurface` no longer uses `game.updatedAt` in the local draft reset key.
   - Clock-only Supabase saves no longer wipe a partially typed on-screen-keyboard guess in timed Practice games.
   - The reset key still responds to gameplay identity, current turn/status, player id, and move history changes.

#### 28.30.3 Focused Verification Completed

Focused automated tests passed:

- `npm test -- --run src/multiplayer/MultiplayerGameSurface.test.tsx`
- `npm test -- --run src/multiplayer/multiplayer.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx`
- `npm test -- --run src/multiplayer/multiplayerRepository.test.ts src/multiplayer/scoring.test.ts src/multiplayer/MultiplayerPanel.test.tsx`

New/updated regressions cover:

- Rival board and keyboard rendering submitted multiplayer moves.
- Timed Practice clock checkpointing so repeated ticks do not double-count elapsed time.
- Existing repository, scoring, and panel behavior around unified Multiplayer remains intact.

Real two-client Supabase-backed browser E2E passed after the fixes for:

- Untimed Practice Multiplayer with two consecutive turns and browser refresh restoration.
- Timed Practice Multiplayer with a 30-second clock, submitted move persistence, visible rival row sync, and active-clock handoff.
- Practice Multiplayer with Hard Mode enabled, visible Hard Mode state, and shared row sync.

Temporary Supabase users and multiplayer rows created during these probes were cleaned up.

#### 28.30.4 Pending Final Gate

Before Stage 10 final handoff, the coordinator must still run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Desktop/tablet/390px responsive smoke with no console errors or horizontal overflow.
- A final Vercel preview deployment if the final Stage 10 handoff includes a preview link.

Daily Multiplayer no-clock/no-Hard-Mode invariants should be smoke-checked before final handoff, but no Daily behavior change was introduced by this checkpoint.

### 28.31 Stage 10 Final Verification and Handoff (`phase_id = 103`)

**Authorization status**: Stage 10 execution was authorized and is complete for user review. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, notification system, bot/social features, redesign, scoring/rating overhaul, and later-phase work remain gated.

#### 28.31.1 Final Verification

Full automated gate passed:

- `npm run lint`
- `npm run test` — 69 files / 459 tests passed.
- `npm run build` — passed with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`

Real two-client Supabase-backed browser verification passed:

- Untimed Practice Multiplayer: lobby creation/discovery/join, two consecutive turns, shared board/keyboard rendering for both players, durable row persistence, and browser refresh restoration.
- Timed Practice Multiplayer: 30-second chess clock, submitted move persistence, rival row sync, active-clock handoff, and no premature timeout.
- Practice Hard Mode Multiplayer: creator-selected Hard Mode visible/locked, submitted move persistence, and shared rival row sync.

Responsive smoke passed:

- Desktop, tablet-like, and 390px mobile viewports.
- Landing, Calendar, Practice, and Settings route checks.
- Zero console/page errors.
- No horizontal overflow.
- Daily Multiplayer surface did not expose Practice-only `Time per side` or `Hard Mode` controls.

Preview deployment:

- Direct protected preview: `https://brrrdle-qkrszkoqp-ryanjosephkamps-projects.vercel.app`
- Share URL verified with the Vercel bypass-cookie flow: `https://brrrdle-qkrszkoqp-ryanjosephkamps-projects.vercel.app/?_vercel_share=wJfg309HjQthxKiqe0vtRR0uUIeNIVPp`

#### 28.31.2 Final Stage 10 State

Stage 10 fixes are complete:

- The reported cross-client Practice Multiplayer board/keyboard synchronization bug is fixed.
- Timed Practice clock ticks no longer double-count elapsed time.
- Timed Practice clock-only saves no longer wipe an in-progress typed guess.
- Daily Multiplayer remains no-clock, no-Hard-Mode-control, five-letter, UTC-day keyed, and claim-safe.
- Temporary Supabase users and multiplayer rows from verification were cleaned up.

No PR, merge, release, dedicated Multiplayer tab, spectator expansion, notification system, bot/social feature, redesign, scoring/rating overhaul, or later-phase work was performed.

### 28.32 Post-Stage-10 Safety Backup (`phase_id = 104`)

**Authorization status**: the user explicitly authorized a backup and documentation-only GitHub safety operation after Stage 10 verification. This operation is not an implementation stage and does not authorize merging the backup PR.

#### 28.32.1 Backup Snapshot

- Backup branch: `backup/phase-23-stage-10-final-2026-06-06`
- Draft PR: `https://github.com/ryanjosephkamp/brrrdle/pull/18`
- Latest verified preview share URL recorded in the PR: `https://brrrdle-qkrszkoqp-ryanjosephkamps-projects.vercel.app/?_vercel_share=wJfg309HjQthxKiqe0vtRR0uUIeNIVPp`

The backup branch was created from the current verified Stage 10 local snapshot and pushed to GitHub as a durable restore point. The draft PR is intentionally marked as a safety snapshot and should not be merged unless the user explicitly approves that later.

#### 28.32.2 Scope Guard

No game code, tests, UI behavior, Supabase migrations, release work, production deployment, branch deletion, force-push, or merge to `main` was authorized or performed as part of this backup tracking step.

### 28.33 Phase 23 Final Stabilization & Broad Debugging Pass Planning (`phase_id = 105`)

**Authorization status**: planning and governance only. This section defines the recommended final broad debugging stage before Phase 23 closure. It does not authorize source-code edits, UI/component work, test changes, Supabase migrations, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating changes, or execution.

#### 28.33.1 Primary Goal

Perform one comprehensive final bug-fix and stabilization sweep across the entire current game, with special emphasis on unified Multiplayer, before Phase 23 is formally closed.

This stage should be treated as a quality gate, not a feature phase. The implementation pass should actively search for bugs, regressions, race conditions, stale UI state, restore/refresh failures, mobile layout defects, console errors, and unreliable multiplayer behavior. Clear bugs may be fixed; new features and redesign work remain gated.

#### 28.33.2 Scope and Priorities

Priority 1 — Unified Multiplayer:

- Practice Multiplayer lobby creation, discovery, join, cancellation, forfeit, refresh restoration, and resume behavior.
- Untimed Practice Multiplayer board, keyboard, turn history, scoring summary, and result consistency across both players.
- Timed Practice Multiplayer chess-clock behavior, including active-player-only decrement, timeout loss, refresh/reconnect, and no typed-draft resets from clock-only updates.
- Practice Hard Mode lobby state, locked setting behavior, validation parity with solo Hard Mode, and scoring bonus display.
- Daily Multiplayer strict asynchronous behavior, UTC-day keyed participation, no clocks, no Hard Mode controls, no Practice-only settings, claim safety, archive/view-only behavior, answer-list separation, and Calendar entry points.
- Supabase-backed persistence, subscriptions/state reconciliation, stale-save protections, duplicate-safe upserts, and cleanup of temporary test data.

Priority 2 — Core solo and Daily systems:

- Daily OG/GO and Practice OG/GO gameplay, including tile colors, on-screen keyboard states, valid-guess handling, Hard Mode, give-up/reveal, definitions, loss/win summaries, and resume behavior.
- Calendar hub, daily archive unlocks, countdowns, local/UTC DailyVariant boundaries, and mobile indicator rendering.
- Auth and sync flows: sign-in, sign-up, password reset, magic/recovery links, sign-out, guest/cloud merge, Settings/profile sync, and Supabase client lifecycle.

Priority 3 — Supporting surfaces and polish:

- Stats, history, ratings/scoring summaries, economy/coins/XP, share surfaces, and solo/multiplayer data separation.
- Words/definitions/admin surfaces, including filtering, pagination, definition modal behavior, fallback links, and admin gating.
- Desktop, tablet-like, and 390px mobile responsive behavior, no horizontal overflow, no console errors, tooltip/dialog layering, reduced-motion safety, keyboard/touch ergonomics, loading/error states, and performance/memory stability with two authenticated contexts.

#### 28.33.3 Work Slices and Coordination

Suggested lanes if the execution prompt authorizes parallel agents:

- **Audit/test-matrix lane**: produce a concise final Stage 11-style matrix before source edits, covering solo, Calendar/Daily, Multiplayer, auth/sync, stats/economy/history, Words/admin, responsive/accessibility, and performance.
- **Multiplayer domain/repository lane**: `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, related tests, Supabase row probes, stale-save and clock checks.
- **Multiplayer UI lane**: `src/multiplayer/MultiplayerPanel.tsx`, `src/multiplayer/MultiplayerGameSurface.tsx`, stats/scoring displays, and focused component/browser tests.
- **Solo/Daily/Calendar lane**: core game reducers/session behavior, `src/calendar/`, `src/daily/`, DailyVariant boundaries, and Calendar mobile rendering.
- **Auth/sync/storage lane**: `src/account/`, Supabase client lifecycle, guest transfer, password recovery, and storage schema non-regression.
- **Responsive/performance lane**: desktop/tablet/mobile browser smoke, console capture, horizontal-overflow checks, two-context memory/performance observation, and Vercel preview validation.
- **Coordinator lane**: high-conflict integration, `src/app/App.tsx`, progress/changelog/memory updates, final verification, remote cleanup, and final handoff.

Keep these high-conflict surfaces single-writer or explicitly sequenced:

- `src/app/App.tsx`
- `src/multiplayer/`
- `src/calendar/`
- `src/account/`
- `src/game/`
- `src/daily/`
- `src/stats/`
- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`
- `agents.md`
- `memory.md`

#### 28.33.4 Required Real Multiplayer Testing

Execution must include real two-client Supabase-backed browser E2E for multiplayer flows, not only single-browser simulation or unit tests.

At minimum, the final debugging pass should verify:

- Practice Multiplayer untimed: create, discover, join, submit multiple turns, board/keyboard/history sync for both players, forfeit/cancel where applicable, refresh/reconnect, and final result/scoring display.
- Practice Multiplayer timed: supported clock behavior for at least one short timed game, active-player-only countdown, timeout behavior, refresh/reconnect, and no draft reset from clock-only saves.
- Practice Multiplayer Hard Mode: visible locked setting, validation behavior, shared board/keyboard/history sync, scoring summary, and refresh behavior.
- Daily Multiplayer: create/discover/join, one-per-day claim behavior, no Practice time/Hard Mode controls, five-letter Daily behavior, UTC day boundary assumptions, archive/view-only behavior, and Calendar entry.
- Remote Supabase probes: durable rows, participant ids, claim rows, move history, per-player sessions, time-limit fields, Hard Mode fields where Practice-only, RLS-compatible reads/writes, and cleanup.

Temporary users and rows created for verification must be cleaned up when possible. Any cleanup limitation must be documented in the final report.

#### 28.33.5 Success Criteria

The final debugging pass should only be marked complete when:

- All clear bugs found during the sweep are fixed or explicitly documented as deferred with a reason.
- Unified Multiplayer behaves consistently across both players for untimed Practice, timed Practice, Practice Hard Mode, and Daily Multiplayer.
- Daily Multiplayer remains strictly asynchronous, no-clock, no-Hard-Mode-control, five-letter, UTC-day keyed, answer-separated, and claim-safe.
- Solo Daily/Practice, Calendar, auth/sync, stats/economy/history, Words/definitions/admin, responsive behavior, and performance receive meaningful non-regression coverage.
- Full automated and browser verification passes.
- A Vercel preview is deployed and a clickable share URL is provided if the preview is protected.

#### 28.33.6 Final Verification Gate

Before halting after execution, run and pass:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Focused tests for any changed areas.
- Desktop browser smoke.
- Tablet-like browser smoke.
- 390px mobile browser smoke.
- Real two-client Supabase-backed browser E2E for the multiplayer flows listed above.
- Remote Supabase probes for relevant auth/sync/multiplayer rows.
- Memory/performance observation with two authenticated browser contexts.

#### 28.33.7 Explicit Scope Boundaries

This stage must not add new product features or redesign the app. The following remain out of scope unless the user explicitly authorizes them later:

- Dedicated Multiplayer tab implementation.
- Spectator expansion.
- Notifications.
- Floating multiplayer manager.
- Bots.
- Social features.
- New history/theme tabs.
- Export/GIF features.
- Scoring/rating rule changes.
- Economy changes outside bug fixes.
- Production release.
- PR creation or merge.

Small UI copy, feedback, or error-state adjustments are allowed only when they directly fix or clarify a bug discovered in the stabilization pass.

#### 28.33.8 Gate

This `phase_id = 105` planning step is complete once the planning/tracking surfaces are updated and the user receives a summary. The final broad debugging execution remains gated until the user explicitly authorizes it in a later prompt.

### 28.34 Phase 23 Final Stabilization Execution Kickoff (`phase_id = 106`)

**Authorization status**: the user explicitly authorized execution of the Phase 23 Final Stabilization & Broad Debugging Pass. This remains a bug-fix/stabilization stage only. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, notification/bot/social feature work, redesign, scoring/rating rule changes, and later-phase work remain gated.

#### 28.34.1 Protected Starting State

Execution begins from the active dirty `codex/phase-23-stage-10` worktree, which contains the verified Stage 8-10 local state and the `phase_id = 104` backup record. The current restore point is:

- Backup branch: `backup/phase-23-stage-10-final-2026-06-06`
- Draft PR: `https://github.com/ryanjosephkamp/brrrdle/pull/18`

The execution pass must not pull over, reset, rebase, switch away from, or otherwise risk losing the active dirty worktree. Any branch/worktree adjustment must preserve the current local state first.

#### 28.34.2 Final Debugging Test Matrix

The kickoff matrix for this pass covers:

- Solo Daily OG/GO: fixed five-letter behavior, tile colors, keyboard state, valid guesses, win/loss/reveal, definitions, resume, and sharing.
- Solo Practice OG/GO: 2-35 word lengths, Hard Mode locking/validation, keyboard behavior, definitions, give-up/reveal, resume, and responsive play.
- Calendar and Daily systems: central hub entry points, archive unlock/view behavior, countdowns, local vs UTC DailyVariant boundaries, Daily Multiplayer indicators, and mobile rendering.
- Unified Practice Multiplayer: lobby creation/discovery/join/cancel/forfeit, untimed play, timed chess-clock play, Hard Mode lobbies, scoring/results, board/keyboard/history sync, refresh/reconnect, and Supabase row durability.
- Daily Multiplayer: strictly asynchronous, five-letter, UTC-day keyed, no clocks, no Hard Mode controls, OG/GO answer separation, claims, Calendar entry/archive behavior, and refresh/reconnect.
- Auth and sync: sign-in, sign-up, sign-out, password reset/recovery, magic-link handling, guest/cloud merge, Settings/profile sync, and Supabase client lifecycle.
- Stats, economy, and history: solo stat isolation, multiplayer summaries, ratings display, coins/XP, past daily unlocks, sharing, and history separation.
- Words, definitions, and admin: filtering, pagination, definition modals, fallback links, and admin route gating.
- Responsive, accessibility, and performance: desktop, tablet-like, 390px mobile, no horizontal overflow, no console errors, tooltip/dialog layering, reduced motion, keyboard/touch ergonomics, loading/error states, and memory stability with two authenticated browser contexts.

#### 28.34.3 Baseline Resource Snapshot

The kickoff resource snapshot shows no Stage 7-style runaway `next-server` or Python process before final-pass browser testing starts, but the machine is under memory pressure and must be handled conservatively:

- `ps aux -m | head -20`: largest visible RSS processes are Codex renderer (~779 MB), Finder (~410 MB), VS Code plugin helpers (~381 MB and ~338 MB), Chrome renderers (~341 MB and ~315 MB), Codex app server (~272 MB), and Chrome main (~263 MB).
- `top -l 1 -o mem | head -30`: several unrelated desktop apps have large compressed memory footprints; physical memory reports ~17 GB used, ~244 MB unused, and ~6.7 GB compressor.
- `vm_stat`: about 14,124 free pages at 16 KB page size (~226 MB free) and ~1,980,430 pages stored in compressor.

Resource guardrails for this pass:

- Run only one dev server at a time.
- Avoid parallel full builds/tests.
- Use the minimum browser contexts needed and close them promptly.
- Periodically re-check memory during two-client browser E2E.
- Gracefully terminate only processes started by this pass if they become clear memory offenders.

#### 28.34.4 Next Work

Proceed with read-only audits, focused automated tests, safe browser smoke, real two-client Supabase-backed multiplayer E2E, scoped bug fixes, and final verification. Every source-code change must be traceable to a clear bug or stabilization need discovered in this pass.

### 28.35 Phase 23 Final Stabilization First Bug-Fix Batch (`phase_id = 107`)

**Authorization status**: final stabilization execution is authorized. This checkpoint records the first scoped bug-fix batch; PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating changes, and later-phase work remain gated.

#### 28.35.1 Bugs Fixed

- Supabase-backed Multiplayer repository saves now reject stale projections that would drop an already-joined rival, regress a non-waiting game back to waiting, or overwrite terminal results with an older playing state. This closes a zero-move race where a stale creator-side cancel could erase a rival's newer join.
- Multiplayer result settlement now has a shared state-level helper and runs when terminal games arrive through repository snapshots or background expiry paths, not only when a local player directly submits or forfeits.
- The saved solo `hardModeDefault` setting now applies to fresh OG/GO Daily and Practice games. Stored Daily sessions and resume slots remain authoritative and are not overwritten by the default.
- The visible route rail now uses the existing primary-navigation helper, keeping placeholder-only routes out of normal navigation.

#### 28.35.2 Focused Verification

Passed:

- `npm test -- --run src/multiplayer/multiplayerRepository.test.ts src/multiplayer/competitiveMultiplayer.test.ts src/app/games/soloHardModeDefaults.test.tsx src/app/routes.test.ts src/calendar/CalendarPanel.test.tsx --maxWorkers=2`
- `npm run lint`
- `npx tsc -p tsconfig.api.json --noEmit`

Browser E2E, full `npm run test`, build, final diff check, Supabase probes, and preview deployment remain pending for the final handoff.

### 28.36 Phase 23 Final Stabilization Multiplayer Timer Churn Fix (`phase_id = 108`)

**Authorization status**: final stabilization execution remains authorized as a bug-fix/stabilization-only pass. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating rule changes, and later-phase work remain gated.

#### 28.36.1 Bug Fixed

Timed Practice Multiplayer no longer persists non-terminal chess-clock ticks every second. The browser continues to display live clock countdowns from `turnStartedAt` and `timeRemainingMs`, but the background expiry loop now writes only when a player actually times out. Turn submissions still checkpoint the submitting player's elapsed time and start the opponent clock.

This closes a race and performance issue discovered during real two-client testing: clock-only row updates could churn Supabase Realtime, compete with move submissions, and intermittently delay or hide the rival board projection in timed Practice games.

#### 28.36.2 Focused Verification

Passed:

- `npm test -- --run src/multiplayer/multiplayer.test.ts src/multiplayer/multiplayerRepository.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx src/multiplayer/MultiplayerPanel.test.tsx --maxWorkers=2`
- Real two-client Supabase-backed browser E2E for untimed Practice Multiplayer: two temp users created/joined a lobby, submitted `dream` and `tesla`, both boards and turn history updated, durable row contained both moves and per-player sessions, and no console/page errors were captured.
- Real two-client Supabase-backed browser E2E for timed Practice Multiplayer: two temp users created/joined a 30-second timed lobby, waited before submitting, `dream` persisted, both boards updated, Player A elapsed time was checkpointed, Player B retained full starting time at turn handoff, and no clock-only row churn appeared before submission.
- Real two-client Supabase-backed browser E2E for Practice Multiplayer Hard Mode: rival saw Hard Mode locked on before joining, first move synced to both boards, durable row retained `hardMode: true`, and no console/page errors were captured.
- Real two-client Supabase-backed browser E2E for Daily Multiplayer: Daily surface had no Practice clock or Hard Mode controls, the game stayed five letters with `timeLimitMs = null` and `hardMode = false`, claim rows existed for both users, `dream` synced to both boards, refresh restored the board, and no console/page errors were captured.

Full `npm run test`, build, final diff check, responsive smoke, final memory check, and preview deployment remain pending for the final handoff.

### 28.37 Phase 23 Final Stabilization Final Verification and Handoff (`phase_id = 109`)

**Authorization status**: the user explicitly authorized the Phase 23 Final Stabilization & Broad Debugging Pass. This final checkpoint completes the approved bug-fix/stabilization pass for user review. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, notification/bot/social feature work, redesign, scoring/rating rule changes, and later-phase work remain gated.

#### 28.37.1 Bugs Fixed

- Multiplayer stale-save protection now rejects incoming Supabase projections that would drop a joined rival, regress non-waiting games back to waiting, overwrite terminal state with an older playing projection, or lose already-saved moves.
- Multiplayer result settlement now runs for terminal repository snapshots and background expiry paths, not only direct local submit/forfeit handlers.
- Fresh solo OG/GO Daily and Practice sessions now honor the saved `hardModeDefault` setting while preserving stored Daily sessions and resume slots as authoritative.
- Primary navigation now filters through the existing primary-route helper so placeholder-only routes stay out of the visible route rail.
- Timed Practice Multiplayer no longer writes non-terminal chess-clock ticks every second; live clocks are display-only between submitted turns or actual timeout/loss saves.

#### 28.37.2 Verification

Passed:

- `npm run lint`
- `npm run test -- --maxWorkers=2` (463 passing tests)
- `npm run build` (succeeds; existing large-chunk advisory remains)
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Focused regressions for multiplayer domain/repository/surface/panel, competitive settlement, solo Hard Mode defaults, routes, and Calendar behavior.
- Real two-client Supabase-backed browser E2E for untimed Practice Multiplayer, timed Practice Multiplayer with 30-second clocks, Practice Multiplayer Hard Mode, and Daily Multiplayer.
- Remote Supabase probes for durable moves, per-player sessions, time-limit fields, Hard Mode fields, Daily claim rows, participant ownership, and cleanup.
- Desktop, tablet-like, and 390px mobile browser smoke for landing, Calendar, Practice, Settings tooltip layering, and Words, with no console/page errors and no horizontal overflow.
- Memory/resource observation with two authenticated browser contexts; no Stage 7-style runaway `next-server` or high-memory Python process was produced by this pass.

#### 28.37.3 Preview

- Direct protected preview: `https://brrrdle-3zm8qw3vg-ryanjosephkamps-projects.vercel.app`
- Share URL verified with the Vercel bypass-cookie flow: `https://brrrdle-3zm8qw3vg-ryanjosephkamps-projects.vercel.app/?_vercel_share=y8zu6kGORWOe2zed4KoDJjk6UUyTOkob`

#### 28.37.4 Final State

The final stabilization pass is complete for user review. Daily Multiplayer remains strictly asynchronous, no-clock, no-Hard-Mode-control, five-letter, UTC-day keyed, answer-separated, and claim-safe. Practice Multiplayer remains the only owner of chess-clock time limits and Practice Hard Mode. No PR, merge, release, dedicated Multiplayer tab, spectator expansion, redesign, scoring/rating rule change, or out-of-scope feature work was performed.

### 28.38 Stage 12 Planning — Multiplayer Hard Mode Enforcement + Performance & Responsiveness Fixes (`phase_id = 110`)

**Authorization status**: planning and governance only. `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md` is the dedicated Stage 12 source of truth. The user-provided spec names this Stage 12; this plan records it in the next available §28 subsection after the final stabilization checkpoint.

This planning entry does **not** authorize source-code edits, UI/component work, tests, Supabase migrations, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactoring, or Stage 12 execution.

#### 28.38.1 Stage 12 Goal

Stage 12 is a targeted bug-fix and stabilization stage for the unified Multiplayer system after `phase_id = 109`.

The approved scope is limited to:

1. **Practice Multiplayer Hard Mode enforcement**: Hard Mode is stored, shown, and copied into player sessions, but real gameplay reports indicate the canonical Hard Mode validation rules are not applied during guess submission.
2. **Multiplayer turn propagation latency**: investigate and reduce the roughly five-second delay between one player submitting a turn and the rival seeing board, keyboard, and history updates.
3. **Lobby creation/join latency**: investigate and improve creator-side entry and both-player state updates when lobbies are created or joined.
4. **On-screen keyboard responsiveness and sound playback**: reduce key-tap latency and restore sound effects when Settings enables them.

#### 28.38.2 Invariants and Boundaries

Execution, if later authorized, must preserve:

- Daily Multiplayer remains strictly asynchronous, five letters, UTC-day keyed, no time limits, no Hard Mode lobby controls, answer-separated, and claim-safe.
- Practice Multiplayer remains the only owner of chess-clock time limits and Practice Hard Mode.
- `playerSessions` plus `getMultiplayerSessionForPlayer` remain the canonical per-viewer board and validation model.
- Shared `serializedSession` remains compatibility/answer plumbing only.
- Existing stale-save protections, duplicate-safe create/join behavior, terminal result settlement, timed clock behavior, and scoring summaries must not be weakened.
- No dedicated Multiplayer tab, spectator expansion, new feature work, scoring/rating/ELO changes, broad architecture rewrite, PR, merge, or release is in scope.

#### 28.38.3 Recommended Investigation and Implementation Approach

1. **Reproduce Hard Mode failure first** with real two-client Supabase-backed browser E2E: create a Hard Mode Practice Multiplayer lobby, submit a first guess with gray feedback, then attempt an invalid gray-letter reuse on the next turn.
2. **Trace validation flow** through `submitMultiplayerGuess`, viewer `playerSessions`, `getMultiplayerSessionForPlayer`, and canonical Hard Mode validation helpers. Confirm `hardMode` survives repository projection, subscription updates, and browser refresh before fixing.
3. **Measure responsiveness before changes** where practical: turn-submit-to-rival-render timing, lobby create-to-entry timing, join-to-both-clients-updated timing, and keyboard tap-to-tile-feedback timing.
4. **Inspect repository and UI reconciliation paths** for unnecessary full projections, delayed `updatedAt` signals, expensive remounts/rerenders, clock/minor-field churn, and subscription updates that fight local input.
5. **Inspect sound wiring** from Settings through `SoundProvider`/sound engine initialization and gameplay call sites for keyboard clicks, invalid guesses, tile flips, wins, and losses in solo and multiplayer.
6. **Fix minimally and verify repeatedly**, preferring targeted changes that keep the unified Multiplayer architecture intact.

#### 28.38.4 Suggested Work Slices

If execution is later parallelized, keep edits narrow and sequenced:

- **Hard Mode domain lane**: `src/multiplayer/multiplayer.ts`, canonical validation wiring, and focused multiplayer Hard Mode tests.
- **Repository/latency lane**: `src/multiplayer/multiplayerRepository.ts`, stale-save/reconciliation timing, subscription projection behavior, and remote Supabase probes.
- **UI responsiveness lane**: `src/multiplayer/MultiplayerGameSurface.tsx`, `src/multiplayer/MultiplayerPanel.tsx`, shared keyboard components, and component/browser checks.
- **Sound lane**: sound provider/engine, Settings toggle wiring, and gameplay sound call sites.
- **Coordinator lane**: `src/app/App.tsx`, high-conflict integration, progress/changelog/memory/agents updates, real two-client E2E, resource checks, and final verification.

Keep `src/app/App.tsx`, `src/multiplayer/`, keyboard components, sound-related files, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `agents.md`, and `memory.md` single-writer or explicitly sequenced.

#### 28.38.5 Verification Expectations

Execution, if later authorized, must include:

- Real two-client Supabase-backed browser E2E for Practice Multiplayer Hard Mode before/after the fix, including invalid guess rejection and refresh/reconnect state preservation.
- Real two-client timing observations for untimed and timed Practice turn propagation and lobby create/join responsiveness, with before/after notes when practical.
- Focused automated regressions for multiplayer Hard Mode validation and any practical keyboard/sound fixes.
- Full gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Desktop, tablet-like, and 390px mobile smoke with no new console errors or horizontal overflow.
- Resource check confirming no runaway processes.
- Remote Supabase probes plus cleanup of temporary users/rows/claims created by verification.

#### 28.38.6 Risks and Considerations

- **Hard Mode correctness risk**: fixing enforcement must use the viewer's canonical session and must not make one player's session overwrite another player's validation state.
- **Latency measurement risk**: browser/device/network timing may vary; record approximate observed timings and avoid claiming exact universal latency guarantees.
- **Realtime tradeoff risk**: reducing perceived latency must not weaken durable save ordering, stale-save guards, or cross-client consistency.
- **Keyboard responsiveness risk**: optimistic local feedback should not allow invalid committed guesses or corrupt server-backed state.
- **Sound playback risk**: browser audio policies often require user activation; fixes should respect those constraints and avoid autoplay-like behavior.
- **Resource risk**: Stage 12 should keep browser E2E conservative and avoid reintroducing the heavy memory pressure seen in earlier broad debugging work.

#### 28.38.7 Gate

This `phase_id = 110` planning step is complete when the governance/tracking surfaces are updated and the user receives a summary. Stage 12 implementation remains gated until the user explicitly authorizes execution in a later prompt. Do not edit `src/`, `api/`, or `supabase/`, run tests/builds/browser verification, create implementation branches, create a PR, merge, release, or begin deferred feature work in this planning pass.

---

### 28.39 Stage 12 Execution Kickoff — Protected State, Baseline Resources, and Reproduction Checklist (`phase_id = 111`)

**Authorization status**: Stage 12 execution is explicitly authorized by the user. `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md` remains the binding source of truth.

This kickoff checkpoint records the protected starting state before Stage 12 source edits:

- Active branch: `codex/phase-23-stage-10`.
- The worktree is intentionally dirty with verified Stage 8-10, final-stabilization, and Stage 12 planning changes. Do not reset, rebase, pull over, switch away from, or discard this state.
- Existing restore point: backup branch `backup/phase-23-stage-10-final-2026-06-06` and Draft PR #18. Do not merge it without explicit later authorization.
- No local app dev server was listening during the baseline server check.

#### 28.39.1 Stage 12 Execution Checklist

Execution proceeds with a reproduce-first workflow:

1. Reproduce Practice Multiplayer Hard Mode non-enforcement with two isolated authenticated browser contexts against the configured Supabase project.
2. Capture practical before-change timing observations for lobby creation, rival join, turn submission to rival render, and keyboard tap to visible feedback.
3. Reproduce sound playback silence with Settings enabled, accounting for browser user-gesture audio policies.
4. Fix Hard Mode enforcement first, then turn/lobby propagation latency, then keyboard responsiveness, then sound playback.
5. Pair browser evidence with focused automated tests, remote Supabase probes, and cleanup.
6. Run the full gate before handoff: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, responsive smoke, real two-client E2E, remote probes, resource snapshot, and Vercel preview/share URL.

#### 28.39.2 Resource Baseline and Safety

Baseline resource checks showed moderate load and compressed memory pressure but no current Stage 7-style multi-GB runaway app process:

- `ps aux -m | head -25`: largest visible RSS entries included Codex renderer (~816 MB), VS Code helpers (~584 MB and ~428 MB), Codex app server (~403 MB), Codex main (~341 MB), Chrome renderer (~316 MB), Obsidian renderer (~306 MB), Finder (~295 MB), and Chrome main (~284 MB).
- `top -l 1 -o mem | head -30`: load average about 3; physical memory about 17 GB used with about 619 MB unused and about 5.7 GB in compressor. Some unrelated desktop apps had large compressed footprints.
- `vm_stat`: about 35,239 free 16 KB pages (~564 MB free), about 1.76M pages stored in compressor, and about 362k pages occupied by compressor.
- Python processes around ~507 MB and ~459 MB were visible but not multi-GB runaways. Existing Node-related MCP/repl processes were small. No listening Vite/Next dev server was detected.

Stage 12 browser testing should therefore remain conservative: one dev server, minimal browser contexts, sequential heavy gates, closed contexts after use, periodic process checks, and no unbounded scripts or large logs.

#### 28.39.3 Scope Guard

This execution checkpoint does not authorize any work outside the Stage 12 bug areas. Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe. Practice Multiplayer remains the only owner of chess-clock time limits and Practice Hard Mode. `playerSessions` remain canonical and player-owned for validation/mutation; shared projections may display submitted moves but must not overwrite another player's canonical session.

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new gameplay feature, scoring/rating/ELO change, broad refactor, or later-phase work is authorized.

---

### 28.40 Stage 12 Implementation Checkpoint — Hard Mode Enforcement, Responsiveness, Sound, and Row-Write Reduction (`phase_id = 112`)

**Status**: first Stage 12 fix batch implemented; final verification remains pending.

#### 28.40.1 Reproduction and Fixes

Real two-client Supabase-backed browser E2E reproduced the core bug before source changes:

- A Practice Multiplayer OG Hard Mode lobby was created with two isolated authenticated contexts.
- Player one submitted a valid first guess that created shared Hard Mode constraints.
- Player two then submitted a valid dictionary word that violated the shared Hard Mode constraint.
- Before the fix, the invalid player-two guess was accepted, persisted as a second move, and written into player two's canonical session.

The fix keeps `playerSessions` canonical and player-owned, but validates Practice Multiplayer Hard Mode guesses against the shared submitted move projection for the active puzzle before mutating the current player's session. This makes the shared board's Hard Mode constraints enforceable without copying player one guesses into player two's canonical session. Daily Multiplayer remains outside this validation path.

After the fix, real two-client E2E confirmed the invalid follow-up guess was rejected, the durable move count stayed at one, `currentTurn` remained with player two, and player two's canonical session remained empty.

#### 28.40.2 Additional Stage 12 Fixes

This checkpoint also implements targeted responsiveness and sound fixes within the Stage 12 scope:

- Multiplayer keyboard input now uses functional draft updates to reduce stale-closure latency during quick key taps.
- Multiplayer sound hooks now play keyboard-click, invalid-guess, tile-flip, correct-guess, and terminal win/loss sounds from actual multiplayer input and persisted move/status changes.
- The sound engine now requests `AudioContext.resume()` when a user-triggered sound finds the browser context suspended.
- Rival attempt counts now derive from the shared displayed board instead of the viewer-only canonical session.
- Supabase multiplayer repository saves now skip unchanged participant rows, reducing redundant writes and realtime events when only one visible game changed.

#### 28.40.3 Verification So Far

Focused automated verification passed:

- `npm run test -- src/multiplayer/multiplayer.test.ts src/multiplayer/multiplayerRepository.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx src/sound/soundEngine.test.ts`
- Result: 4 files passed, 43 tests passed.

Real two-client browser evidence so far:

- Pre-fix Hard Mode violation accepted and persisted in a Practice Multiplayer Hard Mode game.
- Post-fix Hard Mode violation rejected with visible Hard Mode feedback and no second move persisted.
- Observed lobby join timings during reproduction were sub-second to roughly one second in the tested run; broader timing verification remains pending.

#### 28.40.4 Remaining Stage 12 Work

Before Stage 12 can be handed off, continue with:

- Full real two-client E2E for untimed Practice, timed Practice, Practice Hard Mode refresh/reconnect, and Daily Multiplayer non-regression.
- Remote Supabase probes and cleanup for temporary users/rows/claims.
- Sound verification in a real browser with Settings enabled and browser audio policies respected.
- Desktop/tablet/390px responsive smoke and resource snapshot.
- Full gate: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Vercel preview deployment/share URL.

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new gameplay feature, scoring/rating/ELO change, broad refactor, or out-of-scope feature work is authorized.

### 28.41 Stage 12 Final Verification and Handoff (`phase_id = 113`)

**Status**: completed and ready for user review. PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, new gameplay features, scoring/rating/ELO changes, broad refactoring, redesign, and later-phase work remain gated.

#### 28.41.1 Bugs Fixed

Stage 12 completed the targeted bug-fix scope from `PHASE-23-STAGE-12-MULTIPLAYER-HARD-MODE-ENFORCEMENT-AND-PERFORMANCE-FIXES-SPEC-2026-06-07.md`:

- Practice Multiplayer Hard Mode is now enforced during actual gameplay. The fix validates submitted guesses against shared submitted moves for the active puzzle before mutating the current player's canonical `playerSessions` entry.
- Multiplayer keyboard input uses functional draft updates so rapid key taps update the local row more promptly.
- Multiplayer sound calls now cover keyboard clicks, invalid guesses, tile flips, correct guesses, and terminal win/loss transitions; the sound engine requests `AudioContext.resume()` for user-triggered playback when the browser context is suspended.
- Rival attempt counts now derive from the shared displayed board so the opposing player sees the same submitted-move pressure.
- Supabase multiplayer saves skip unchanged participant projections, reducing redundant writes and realtime churn without weakening stale-save protections.

#### 28.41.2 Real Multiplayer and Supabase Verification

Real two-client Supabase-backed browser E2E used isolated authenticated contexts and temporary users. Temporary rows, claims, and users were cleaned up after verification where applicable.

Verified flows:

- Practice Multiplayer Hard Mode: reproduced the pre-fix invalid alternating-turn guess acceptance, then confirmed the invalid guess is rejected after the fix; durable move count stays stable, `currentTurn` stays with the violating player, and the violating player's canonical session is not corrupted.
- Untimed Practice Multiplayer: create/discover/join, key responsiveness, invalid rejection, valid turn submission, board/history/result visibility, sound calls, and durable row updates.
- Timed Practice Multiplayer: 30-second Practice lobby, active-player-only turn handoff preservation, submitted turn durability, typed draft preservation during clock-only updates, and durable time-limit fields.
- Daily Multiplayer non-regression: no Practice time controls, no Hard Mode controls, fixed five-letter Daily behavior, UTC date key, claim rows in `multiplayer_daily_claims`, and no clock/Hard Mode leakage.

Representative measured observations from the verified runs:

- Practice lobby creation was roughly 0.5 seconds in tested runs.
- Rival join durable writes completed in roughly 0.25 to 0.3 seconds in tested runs.
- A valid post-fix second-turn submission propagated and completed in roughly 0.7 seconds in the tested untimed run.
- Key tap to local visual feedback was roughly 40 milliseconds in the tested browser run.

These are practical test-run observations, not universal network guarantees.

#### 28.41.3 Final Verification Gate

Final verification passed:

- `npm run lint`
- `npm run test -- --maxWorkers=2` (466 tests passing)
- `npm run build` (succeeds with the existing large-chunk advisory)
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Focused Stage 12 tests for multiplayer domain/repository/surface and sound engine changes
- Desktop, tablet-like, and 390px mobile smoke with no console/page errors and no horizontal overflow
- Remote Supabase probes for durable multiplayer rows, participant IDs, moves, per-player sessions, Hard Mode fields, time-limit fields, Daily claim rows, and cleanup
- Vercel preview deployment plus protected preview share URL verification

Resource checks after browser testing did not show a Stage 7-style runaway app process, local Vite/Playwright/browser contexts from the verification run were closed, and no local dev server remained listening. The machine still showed general macOS memory pressure from long-lived GUI apps and compressed memory, so future browser E2E should continue the one-dev-server/minimal-context discipline.

#### 28.41.4 Scope Guard

Stage 12 did not create a PR, merge, release, implement the dedicated Multiplayer tab, expand spectator functionality, add notifications/bots/social features, change scoring/rating/ELO rules, redesign the app, or perform broad architecture work. Daily Multiplayer invariants remain strict: asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.

### 28.42 Stage 13 Planning — Practice Solo UX Bugs + Multiplayer GO Result Propagation Fix (`phase_id = 114`)

**Authorization status**: planning and governance only. `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md` is the dedicated Stage 13 source of truth.

This planning entry does **not** authorize source-code edits, UI/component work, tests, Supabase migrations, implementation branches, PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, new features, scoring/rating changes, broad refactoring, or Stage 13 execution.

#### 28.42.1 Stage 13 Goal

Stage 13 is a targeted, three-bug stabilization stage after `phase_id = 113`. It exists to fix two Practice solo UX regressions and one Multiplayer GO result-propagation issue while preserving all Stage 12 improvements.

The approved bug scope is limited to:

1. **Practice solo submitted-row animation regression**: in Practice OG and Practice GO, on-screen keyboard input causes already-submitted guess rows to replay flip/reveal animations. Daily Solo does not exhibit this bug and must remain untouched.
2. **Practice solo missing results screen**: after a Practice solo win or loss, the app immediately starts a new puzzle instead of showing the normal post-game results panel with answer, definitions, share, stats, and review affordances.
3. **Multiplayer GO solved-puzzle propagation**: when one player solves a GO puzzle, both players should briefly see the all-green solved row, then advance together to the next puzzle or final definitions. The solver must not skip the solved row, and the rival must not become stuck waiting to submit the already-solved answer.

#### 28.42.2 Invariants and Boundaries

Execution, if later authorized, must preserve:

- Daily Multiplayer remains strictly asynchronous, fixed at five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- Practice Multiplayer remains the only multiplayer mode with time-limit and Hard Mode lobby settings.
- `playerSessions` plus `getMultiplayerSessionForPlayer` remain canonical for viewer state.
- Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, rival attempt-count projection, stale-save protections, timed Practice clock behavior, scoring/result settlement, and unchanged-projection save skipping must remain working.
- Daily Solo keyboard animation and post-game behavior must not be altered.
- No dedicated Multiplayer tab, spectator expansion, new gameplay feature, scoring/rating/ELO change, broad refactoring, redesign, PR, merge, release, or later-phase work is in scope.

#### 28.42.3 Required Execution Discipline

Stage 13 execution must follow the spec's small-change discipline:

1. Make one focused fix, or one tightly related group of small fixes, at a time.
2. Run the relevant focused verification subset before moving to the next bug.
3. Reproduce Bug 1 before fixing it, using a browser or component-level route that can observe the repeated animation behavior.
4. Reproduce Bug 3 before fixing it with real two-client Supabase-backed browser E2E.
5. Verify after every significant change that Stage 12 Hard Mode enforcement, keyboard responsiveness, and sound effects have not regressed.
6. Avoid broad rewrites; prefer minimal changes aligned with Daily Solo's working pattern and the existing unified Multiplayer model.

#### 28.42.4 Suggested Work Slices

If execution is later parallelized, keep high-conflict files single-writer or explicitly sequenced:

- **Practice solo post-game lane**: inspect `src/app/games/OgGame.tsx`, `src/app/games/GoGame.tsx`, solo session creation/resume helpers, and any Practice play-again/new-game handling. Goal: stop auto-starting a new Practice puzzle before results are shown.
- **Practice solo animation lane**: inspect shared board/tile animation props, solo keyboard handling, and Daily-vs-Practice render keys. Goal: make submitted Practice rows animate once on submission, not on every later key press.
- **Multiplayer GO propagation lane**: inspect `src/multiplayer/multiplayer.ts`, `src/multiplayer/MultiplayerGameSurface.tsx`, GO puzzle index/session projection, result transition timing, and tests. Goal: both players briefly see the solved row and advance together.
- **Verification lane**: focused unit/component tests, Practice solo browser smoke, real two-client Supabase E2E for Multiplayer GO, Daily/Stage-12 regression checks, responsive smoke, resource observation, and final Vercel preview.
- **Coordinator lane**: owns `src/app/App.tsx` if needed, all high-conflict governance/progress surfaces, final integration verification, and user handoff.

Likely high-conflict surfaces include `src/app/games/`, `src/game/`, `src/game/go/`, shared keyboard/board UI, `src/multiplayer/`, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `agents.md`, and `memory.md`.

#### 28.42.5 Verification Expectations

Stage 13 execution, if later authorized, must include:

- Practice Solo focused verification for OG and GO: submitted rows do not re-flip on later on-screen keyboard input, results are shown after win/loss, and Play Again/New Game works only after the results view.
- Multiplayer GO real two-client Supabase-backed browser E2E for first-four-puzzle and final-puzzle solved-row propagation where practical.
- Practice Multiplayer untimed and timed non-regression, including Stage 12 Hard Mode enforcement, keyboard responsiveness, and sound playback.
- Daily Solo non-regression for keyboard animation and post-game results behavior.
- Daily Multiplayer invariant check: no clocks, no Hard Mode controls, five-letter UTC-day claim-safe behavior.
- Full automated gate before handoff: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Desktop, tablet-like, and 390px mobile smoke with no new console errors or layout regressions.
- Resource sanity check confirming no runaway processes or significant new memory pressure.
- Vercel preview demonstrating the fixes.

#### 28.42.6 Risks and Considerations

- **Animation key risk**: a naive key/render fix could suppress the initial reveal animation or affect Daily Solo, which currently works. Compare Practice to Daily before changing shared components.
- **Practice post-game risk**: blocking auto-start must not break explicit Play Again/New Game flows or stored Daily/resume behavior.
- **GO transition risk**: Multiplayer GO needs a coordinated solved-row delay without corrupting each player's canonical `playerSessions`, timing clocks, scoring, or final definitions transition.
- **Realtime risk**: cross-client GO advancement must not depend on one client manually submitting the already-solved answer, but it also must not introduce stale-save races or double-advance.
- **Stage 12 regression risk**: keyboard, sound, Hard Mode, row-write reduction, and timed Practice fixes are recent and must be actively rechecked.

#### 28.42.7 Gate

This `phase_id = 114` planning step is complete when governance/tracking surfaces are updated and the user receives a summary. Stage 13 implementation remains gated until the user explicitly authorizes execution in a later prompt. Do not edit `src/`, `api/`, or `supabase/`, run migrations/tests/builds/browser verification, create implementation branches, create a PR, merge, release, or begin out-of-scope feature work in this planning pass.

### 28.43 Stage 13 Execution Kickoff — Protected State, Baseline Resources, and Verification Checklist (`phase_id = 115`)

**Authorization status**: Stage 13 execution is explicitly authorized by the user. `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md` remains the binding source of truth.

This kickoff checkpoint records the protected starting state before Stage 13 source edits:

- Active branch: `codex/phase-23-stage-10`.
- The worktree is intentionally dirty with verified Stage 8-10, final-stabilization, Stage 12, and Stage 13 planning changes. Do not reset, rebase, pull over, switch away from, or discard this state.
- No local app dev server was detected on the process/listener check.
- Existing post-Stage-10 restore point remains Draft PR #18 / `backup/phase-23-stage-10-final-2026-06-06`; do not merge it without explicit later authorization.

#### 28.43.1 Stage 13 Execution Checklist

Execution proceeds with one focused change at a time:

1. Investigate Practice solo post-game flow and write a failing focused test before fixing Bug 2.
2. Reproduce Bug 1 before fixing: Practice OG/GO submitted rows should not replay flip/reveal animations when later keyboard input changes the current row.
3. Fix Bug 1 with focused tests and Practice solo browser smoke while preserving Daily Solo behavior.
4. Reproduce Bug 3 with real two-client Supabase-backed browser E2E: Multiplayer GO solved row must briefly appear for both players, then both clients advance together.
5. Fix Bug 3 with focused tests and real two-client E2E, then recheck Practice Multiplayer Stage 12 Hard Mode, keyboard responsiveness, sound, timed/untimed flows, and Daily Multiplayer invariants.
6. Run the final gate before handoff: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, desktop/tablet/390px smoke, resource snapshot, and Vercel preview/share URL.

#### 28.43.2 Baseline Resource Snapshot

Baseline resource checks before source edits showed general desktop memory pressure but no Stage 7-style app runaway:

- `ps aux -m | head -25`: largest visible RSS entries included Codex renderer (~697 MB), Codex main (~498 MB), VS Code plugin helpers (~416 MB and ~390 MB), Finder (~275 MB), Chrome main (~260 MB), and Chrome renderers (~227 MB to ~195 MB).
- `top -l 1 -o mem | head -30`: load average about 3.25; physical memory about 16 GB used, about 1.2 GB unused, and about 6.4 GB in compressor. Long-lived unrelated GUI/Python processes remain visible.
- `vm_stat`: about 72,496 free 16 KB pages (~1.1 GB free), about 1.83M pages stored in compressor, and about 414k pages occupied by compressor.
- Listener check showed unrelated Python/Jupyter listeners but no local Vite/Next app dev server started by this pass.

Stage 13 browser testing should therefore continue the resource-safety discipline: one dev server, minimal browser contexts, sequential heavy gates, closed contexts after use, and no unbounded scripts or large logs.

#### 28.43.3 Scope Guard

This execution checkpoint does not authorize any work outside the three Stage 13 bugs. Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe. Daily Solo working behavior must not be changed. Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, stale-save protections, timed Practice behavior, and unchanged-projection save skipping must remain working.

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new gameplay feature, scoring/rating/ELO change, broad refactor, redesign, or later-phase work is authorized.

### 28.44 Stage 13 First Fix Checkpoint — Practice Solo Results and Submitted-Row Animation (`phase_id = 116`)

**Authorization status**: Stage 13 execution remains authorized and scoped to the three-bug spec. This checkpoint completes the Practice solo fix batch; Multiplayer GO solved-puzzle propagation remains pending.

#### 28.44.1 Root Cause and Fix

Practice OG/GO were using the current `initialResume` prop directly in the Practice session key. Because the app writes a Practice resume capture on every input, the parent passed each live capture back as a new `initialResume`; this changed the keyed `OgGameSession` / `GoGameSession` child repeatedly.

That remount caused both reported Practice solo regressions:

- Already-submitted rows re-ran reveal animations when later key input updated the resume slot and remounted the board.
- On completion, `recordCompletedGame` cleared the resume slot, which removed the resume key suffix and remounted a fresh Practice puzzle before the post-game result UI could remain visible.

The fix is intentionally small: `OgGame` and `GoGame` now capture the incoming Practice resume slot once at component mount and treat it as a one-shot restore source. Live resume captures from the active session continue to persist for resume support, but they no longer drive the active game key or remount the board/result surface.

#### 28.44.2 Focused Verification

Focused verification completed before moving to Multiplayer GO:

- Pre-fix Practice OG browser reproduction: after submitting `CRANE`, a later key press triggered 5 `animationstart` events on Row 1, confirming the already-submitted row replayed reveal animations.
- Pre-fix Practice OG completion reproduction: solving the current Practice answer dropped the view back to a fresh `playing` puzzle with no share/result UI.
- Post-fix Practice OG browser check: the same later key press triggered 0 Row 1 `animationstart` events.
- Post-fix Practice OG completion check: solving the answer kept the result/share state visible.
- Post-fix Practice GO browser check: submitted rows did not re-animate on later key input.
- Post-fix Practice GO completion check: solving the full five-puzzle chain kept the won result state visible with GO share and solved definitions.
- Focused automated check: `npm run test -- src/app/games/soloHardModeDefaults.test.tsx` passed (2 tests).

#### 28.44.3 Remaining Stage 13 Work

Continue with the required Bug 3 lane:

- Reproduce Multiplayer GO solved-puzzle propagation with real two-client Supabase-backed browser E2E before source changes.
- Verify the solver and rival both see the all-green solved row, then advance together after the intended brief delay.
- Preserve Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, timed Practice behavior, Daily Solo behavior, and Daily Multiplayer invariants.

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new feature, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed in this checkpoint.

### 28.45 Stage 13 Final Fix and Verification — Multiplayer GO Result Propagation (`phase_id = 117`)

**Authorization status**: Stage 13 execution remains scoped to `PHASE-23-STAGE-13-PRACTICE-SOLO-AND-GO-MULTIPLAYER-BUGFIXES-SPEC-2026-06-07.md`. This checkpoint completes the remaining Multiplayer GO bug and the final Stage 13 handoff.

#### 28.45.1 Root Cause and Fix

The GO multiplayer issue had two layers:

- The domain layer only advanced the submitting player's canonical GO `playerSessions` entry after a solved puzzle, leaving the rival's canonical session on the previous puzzle.
- Once both sessions were synchronized, the UI needed a short presentation hold so both players could see the all-green solved row before advancing to the next puzzle or final definitions.

The fix keeps `playerSessions` canonical while applying a solved GO answer to both players' canonical sessions only when they are still on that same puzzle and the answer matches. Non-solving guesses remain player-owned. The game surface now derives a brief solved-GO transition from the latest all-correct move, displays that solved puzzle/row for roughly two seconds, disables input during the hold, then resumes the canonical current puzzle. Terminal GO games are held in the play surface briefly before the final definitions panel appears.

#### 28.45.2 Verification

Focused verification:

- `npm run test -- src/multiplayer/multiplayer.test.ts -t "go sessions"` passed for first-puzzle advancement and final-puzzle completion across both player sessions.
- `npm run test -- src/multiplayer/MultiplayerGameSurface.test.tsx -t "solved go"` passed for rival solved-row display.
- `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx -t "completed go surface"` passed for the terminal GO hold before definitions.
- `npm run test -- src/app/games/soloHardModeDefaults.test.tsx src/multiplayer/multiplayer.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx src/multiplayer/MultiplayerPanel.test.tsx src/sound/soundEngine.test.ts` passed (47 tests).

Full verification:

- `npm run lint` passed with no output.
- `npm run test` passed (71 files, 470 tests).
- `npm run build` passed with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- `git diff --check` passed.
- Desktop, tablet-like, and 390px-class browser smoke passed with no console errors and no horizontal overflow.
- Playwright browser sessions were closed after smoke.

Real-browser Supabase note: Stage 13 browser attempts used temporary authenticated accounts through the actual sign-in modal, but host-created Practice GO lobbies did not persist to the remote row within the polling window in this harness. Temporary accounts were cleaned up. Because that persistence path could not be made reliable without expanding the scope, this checkpoint records the limitation and relies on focused domain/component regression tests plus documented browser/cleanup attempts rather than claiming a fully clean create/join/submit browser save path for Bug 3.

#### 28.45.3 Scope Guard

Stage 13 stayed inside the three approved bugs. Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe. Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, timed Practice behavior, stale-save protections, and scoring rules were not intentionally changed.

No PR, merge, release, dedicated Multiplayer tab work, spectator expansion, new feature, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed.

### 28.46 Stage 14 Planning — Post-Stage-13 Polish, Bug Fixes, and Multiplayer Tab Foundations (`phase_id = 118`)

**Authorization status**: planning and governance only. `PHASE-23-STAGE-14-POST-STAGE-13-POLISH-AND-MULTIPLAYER-EXPANSION-FOUNDATIONS-SPEC-2026-06-07.md` is the binding Stage 14 source of truth.

This planning entry does **not** authorize source-code edits, UI/component work, tests, Supabase migrations, configuration changes, implementation branches, PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, new gameplay features, scoring/rating changes, broad refactoring, redesign, or Stage 14 execution.

#### 28.46.1 Stage 14 Goal

Stage 14 is a targeted polish, stabilization, and foundations stage after Stage 13. Its purpose is to address approved small post-Stage-13 bugs or UX friction, preserve all Stage 12 and Stage 13 wins, and prepare safe groundwork for a future dedicated Multiplayer tab without replacing the existing Calendar and Practice multiplayer entry points.

The planned scope is limited to:

1. **Bug fixes and polish**: small post-Stage-13 regressions or UX friction documented before execution begins, including minor keyboard, focus, or animation polish in solo and multiplayer surfaces where needed.
2. **Multiplayer tab foundations**: design/document the intended future Multiplayer navigation structure and, if execution is later authorized, add only minimal non-breaking scaffolding such as types, a route placeholder, or a basic shell.
3. **Spectator foundation hardening**: review and lightly harden existing spectator read-only behavior and related RLS/tests where low-risk, without adding new spectator features or permissions.
4. **Verification and documentation**: preserve Stage 12/13 regression coverage and update plan, changelog, agents, memory, and progress surfaces.

#### 28.46.2 Invariants and Boundaries

Stage 14 execution, if later authorized, must preserve:

- Daily Multiplayer remains strictly asynchronous, fixed at five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- Practice Multiplayer remains the only multiplayer surface with chess-clock time limits and Hard Mode lobby settings.
- `playerSessions` plus `getMultiplayerSessionForPlayer` remain canonical for viewer state and validation.
- Shared move projection may display submitted moves, but must not overwrite another player's canonical session.
- Stage 12 Hard Mode enforcement, keyboard responsiveness, sound playback, row-write reduction, stale-save protections, timed Practice clock behavior, and scoring/result settlement remain working.
- Stage 13 Practice solo one-shot resume behavior, submitted-row animation stability, post-game results visibility, and Multiplayer GO solved-row hold/advance behavior remain working.
- Daily Solo behavior remains unchanged except for preserving existing correctness.

Explicitly out of scope:

- Full dedicated Multiplayer tab UI/navigation replacement.
- Spectator feature expansion or permission expansion.
- Notifications, floating game manager, bots, social features, History/Theme/export/GIF work, new gameplay features, scoring/rating/ELO changes, broad refactoring, redesign, PR creation, merge, or release.

#### 28.46.3 Required Execution Discipline

Stage 14 execution must continue the recent small-change workflow:

1. Start with any specific post-Stage-13 bug reports provided by the user.
2. Make one focused change, or one tightly related small group of changes, at a time.
3. Run focused verification for that change before moving on.
4. Use real two-client Supabase-backed browser E2E for any multiplayer-affected behavior claims.
5. Keep resource usage cautious: one dev server, minimal browser contexts, sequential heavy gates, closed contexts after use, and no unbounded scripts or large logs.
6. Avoid replacing Calendar/Practice entry points; future Multiplayer tab scaffolding must be additive and inert unless explicitly activated by a later authorized stage.

#### 28.46.4 Suggested Work Slices

If execution is later parallelized, keep high-conflict files single-writer or explicitly sequenced:

- **Post-Stage-13 polish lane**: inspect user-reported friction, Practice solo, Daily Solo, shared keyboard/board behavior, focus states, animation stability, and sound/feedback non-regression.
- **Multiplayer foundations lane**: plan and implement only additive scaffolding for a future Multiplayer tab, likely around route metadata, route placeholder decisions, and a basic panel shell that does not replace current flows.
- **Spectator hardening lane**: review existing spectator/RLS/read-only assumptions and add focused tests or documentation only where they reduce risk without expanding capability.
- **Regression verification lane**: Stage 12 Hard Mode/sound/keyboard checks, Stage 13 Practice solo/GO propagation checks, Daily Multiplayer invariant checks, responsive smoke, resource observation, and Vercel preview if execution is later authorized.
- **Coordinator lane**: owns `src/app/App.tsx` if touched, `src/multiplayer/` integration sequencing, and all governance/progress surfaces.

Likely high-conflict surfaces include `src/app/App.tsx`, `src/app/games/`, `src/game/`, shared board/keyboard UI, `src/multiplayer/`, `src/calendar/`, Supabase/RLS docs or migrations if explicitly authorized later, `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `agents.md`, and `memory.md`.

#### 28.46.5 Verification Expectations

Stage 14 execution, if later authorized, must include:

- Focused verification immediately after each scoped bug fix or polish change.
- Regression checks for Stage 12 Hard Mode enforcement, keyboard responsiveness, sound effects, row-write reduction, timed Practice behavior, and stale-save protections.
- Regression checks for Stage 13 Practice solo submitted-row animation, Practice solo results visibility, and Multiplayer GO solved-row hold/advance behavior.
- Daily Multiplayer invariant checks: no clocks, no Hard Mode controls, fixed five-letter games, UTC-day keyed claim safety, and existing Calendar/archive behavior.
- Real two-client Supabase-backed browser E2E for any multiplayer-affected changes, paired with remote Supabase probes and cleanup where relevant.
- Full automated gate before handoff: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Desktop, tablet-like, and 390px mobile smoke with no new console errors, no horizontal overflow, and resource sanity checks.
- Vercel preview demonstrating the final Stage 14 state.

#### 28.46.6 Risks and Considerations

- **Navigation risk**: even placeholder Multiplayer tab work can collide with existing Calendar/Practice entry points if it becomes active too early. Keep scaffolding additive and non-replacing.
- **Regression risk**: keyboard, animation, sound, Practice resume, and GO transition behavior were recently fixed; compare against Stage 12/13 evidence before changing shared surfaces.
- **Spectator risk**: hardening should reduce mutation risk without introducing new spectator UX or permissions.
- **Scope risk**: Stage 14 is not the full dedicated Multiplayer tab implementation. Execution should not drift into new feature work unless the user explicitly expands scope.
- **Resource risk**: real two-client E2E remains necessary for multiplayer claims, but should be run with the established one-dev-server/minimal-context discipline.

#### 28.46.7 Gate

This `phase_id = 118` planning step is complete when governance/tracking surfaces are updated and the user receives a summary. Stage 14 implementation remains gated until the user explicitly authorizes execution in a later prompt. Do not edit `src/`, `api/`, or `supabase/`, run migrations/tests/builds/browser verification, create implementation branches, create a PR, merge, release, or begin out-of-scope feature work in this planning pass.

### 28.47 Stage 14 Execution Kickoff — Protected State, Baseline Resources, and Work Checklist (`phase_id = 119`)

**Authorization status**: Stage 14 execution is explicitly authorized by the user. `PHASE-23-STAGE-14-POST-STAGE-13-POLISH-AND-MULTIPLAYER-EXPANSION-FOUNDATIONS-SPEC-2026-06-07.md` remains the binding source of truth.

This kickoff checkpoint records the protected starting state before Stage 14 source edits:

- Active branch: `codex/phase-23-stage-10`.
- The worktree is intentionally dirty with verified Stage 8-10, final-stabilization, Stage 12, Stage 13, and Stage 14 planning changes. Do not reset, rebase, pull over, switch away from, or discard this state.
- No local app dev server was detected on the listener check.
- A single unrelated Python listener was visible on `127.0.0.1:8765`.
- Existing post-Stage-10 restore point remains Draft PR #18 / `backup/phase-23-stage-10-final-2026-06-06`; do not merge it without explicit later authorization.

#### 28.47.1 Stage 14 Execution Checklist

No additional post-Stage-13 user-reported bug list was supplied in the execution prompt. Stage 14 therefore proceeds as a bounded polish/foundations pass inside the approved scope:

1. Run a scoped read-only audit of post-Stage-13 Practice solo, multiplayer surface consistency, existing route metadata, and spectator/RLS surfaces.
2. Fix only clear, reproducible, small polish issues found within the Stage 14 scope.
3. Add minimal, non-breaking Multiplayer tab foundations without replacing Calendar or Practice multiplayer entry points.
4. Lightly harden spectator foundations where low-risk and verifiable without expanding spectator features or permissions.
5. After each logical source change, run focused verification for the changed area before moving on.
6. Finish with the full Stage 14 gate: lint, full tests, build, API typecheck, diff check, focused tests, responsive smoke, real two-client Supabase E2E for multiplayer-affected changes, remote Supabase probes/cleanup where relevant, resource snapshot, and Vercel preview/share URL.

#### 28.47.2 Baseline Resource Snapshot

Baseline resource checks before source edits showed notable compressed-memory pressure but no Stage 7-style app runaway:

- `ps aux -m | head -25`: largest visible RSS entries included VS Code plugin helper (~628 MB), Codex renderers (~449 MB and ~249 MB), Chrome main/renderer processes (~316 MB and ~297 MB), Codex main (~220 MB), Finder (~152 MB in RSS output), and other long-lived GUI processes.
- `top -l 1 -o mem | head -30`: load average about 2.68; physical memory about 17 GB used, about 255 MB unused, and about 7.2 GB in compressor. Obsidian and Finder had high compressed-memory footprints in the `top` view.
- `vm_stat`: about 10,217 free 16 KB pages (~160 MB free), about 1.75M pages stored in compressor, and about 462k pages occupied by compressor.
- Listener check showed no local Vite/Next app dev server. One unrelated Python listener was present on `127.0.0.1:8765`.
- `npx` is available at `/opt/homebrew/bin/npx` for Playwright/Vercel/npm workflows.

Stage 14 browser and verification work should use one dev server, minimal browser contexts, sequential heavy gates, closed contexts after use, and periodic process/memory checks.

#### 28.47.3 Scope Guard

Stage 14 execution remains limited to approved polish/foundations work. Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe. Stage 12 and Stage 13 wins must remain protected.

No PR, merge, release, full dedicated Multiplayer tab implementation, spectator feature expansion, notification system, floating manager, bots/social features, export/GIF work, scoring/rating/ELO change, broad refactor, redesign, or out-of-scope work is authorized.

### 28.48 Stage 14 First Implementation Checkpoint — Minimal Multiplayer Foundations and Spectator-Adjacent Hardening (`phase_id = 120`)

**Authorization status**: Stage 14 execution remains authorized and scoped by `PHASE-23-STAGE-14-POST-STAGE-13-POLISH-AND-MULTIPLAYER-EXPANSION-FOUNDATIONS-SPEC-2026-06-07.md`.

This checkpoint completed the first small implementation batch:

- Added hidden `multiplayer` route metadata and a basic `MultiplayerFoundationPanel` shell for future dedicated Multiplayer tab work.
- Kept the hidden `multiplayer` route out of `getPrimaryNavigationRoutes` and out of Home mode cards, so Calendar and Practice remain the only active entry points for Daily and Practice Multiplayer.
- Added a route/eyebrow guard so a future or persisted hidden Multiplayer route renders coherent shell metadata without becoming visible in primary navigation.
- Hardened the active `MultiplayerPanel` so an authenticated nonparticipant observer cannot mount the live gameplay surface for another users' playing match.
- Added repository coverage confirming the unified Supabase multiplayer adapter writes only through `async_multiplayer_games` and does not touch legacy `live_*` / `live_match_spectators` tables.
- Clarified `docs/supabase.md` that legacy Live spectator schema is compatibility-only in the active Stage 14 app and that future spectator permission/UI work requires separate specification.

Focused verification passed:

- `npm run test -- src/app/routes.test.ts src/multiplayer/MultiplayerFoundationPanel.test.tsx`
- `npm run test -- src/calendar/CalendarPanel.test.tsx src/multiplayer/MultiplayerPanel.test.tsx`
- `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts`
- `npm run test -- src/app/routes.test.ts src/multiplayer/MultiplayerFoundationPanel.test.tsx src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts src/calendar/CalendarPanel.test.tsx` (5 files, 27 tests)

The Stage 14 full gate remains pending: lint, full test suite, build, API typecheck, diff check, responsive smoke, real two-client Supabase verification where relevant, remote Supabase probes/cleanup where relevant, final resource snapshot, and Vercel preview/share URL.

No PR, merge, release, full dedicated Multiplayer tab implementation, spectator feature expansion, notification system, floating manager, bots/social features, export/GIF work, scoring/rating/ELO change, broad refactor, redesign, or out-of-scope work was performed.

### 28.49 Stage 14 Final Verification and Handoff (`phase_id = 121`)

**Authorization status**: Stage 14 execution is complete and ready for user review. Any PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator feature expansion, notification system, floating manager, bots/social/export work, scoring/rating/ELO change, broad refactor, redesign, or later-phase work remains gated until later explicit approval.

Stage 14 stayed inside the approved polish/foundations scope:

- Added hidden/inert `multiplayer` route metadata and `MultiplayerFoundationPanel` shell only; no primary navigation tab was added.
- Preserved Calendar as the Daily Multiplayer entry point and Practice as the Practice Multiplayer entry point.
- Hardened `MultiplayerPanel` so authenticated nonparticipants cannot mount another active match's gameplay surface.
- Confirmed the active unified Supabase multiplayer adapter writes through `async_multiplayer_games`; legacy `live_*` and `live_match_spectators` artifacts remain compatibility schema only in the active Stage 14 app.
- Kept Stage 12 and Stage 13 behavior intact; no Daily Multiplayer invariant was intentionally changed.

Final verification passed:

- Focused changed-area tests: route/foundation shell, Calendar/Multiplayer panels, repository table usage, and combined changed-area pass (5 files, 27 tests).
- Full automated gate: `npm run lint`, `npm run test` (72 files, 472 tests), `npm run build` (existing large-chunk advisory only), `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Responsive smoke: desktop, tablet-like, and 390px mobile viewports passed with no new console errors and no horizontal overflow.
- Real Supabase-backed browser E2E: isolated host/rival/observer authenticated contexts verified Practice Multiplayer create/join, nonparticipant gameplay guard, durable turn propagation, both-player board visibility, and Daily no-Practice-controls non-regression.
- Remote Supabase probe: confirmed the temporary Practice row used `async_multiplayer_games`, had host/rival participants, did not include the observer as a participant, had one submitted move, and contained two `playerSessions`; temporary Stage 14 users and the touched row were cleaned up.
- Resource check: final process snapshots showed no Stage 14 runaway app process; the local dev server was stopped after verification.
- Preview: Vercel preview deployed successfully. The direct preview is deployment-protected, so a protected share URL was generated and verified with HTTP 200 for final user review; the tokenized share URL is intentionally not committed to repository docs.

### 28.50 Stage 15 Planning — GO Transition Polish and Practice Seed Per-Account Randomization (`phase_id = 122`)

**Authorization status**: planning and governance only. `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md` is the binding Stage 15 source of truth.

This planning step does **not** authorize source-code edits, test changes, UI/component work, Supabase migrations, configuration changes, implementation branches, PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, deferred feature work, scoring/rating changes, broad refactoring, redesign, or Stage 15 execution.

#### 28.50.1 Stage 15 Goal

Stage 15 is a narrow targeted bug-fix stage with exactly two scoped issues:

1. **GO transition regression**: during the brief all-green solved-row hold, previously completed puzzles in the GO chain must remain visible and stable instead of disappearing or resetting.
2. **Practice seed predictability**: authenticated Practice OG and Practice GO puzzle sequences must become per-account so distinct accounts do not receive the same Practice sequence; Daily OG/GO must remain globally deterministic for the same UTC day.

#### 28.50.2 Scope And Invariants

Stage 15 execution, if later authorized, must preserve:

- Stage 12 wins: Practice Multiplayer Hard Mode enforcement, keyboard responsiveness, sound playback, row-write reduction, stale-save protections, timed Practice behavior, and scoring/result settlement.
- Stage 13 wins: Practice solo one-shot resume behavior, submitted-row animation stability, post-game results visibility, Multiplayer GO solved-row hold, and coordinated advancement for both players.
- Stage 14 wins: hidden/inert Multiplayer foundations, Calendar and Practice as active multiplayer entry points, nonparticipant gameplay guard, and the unified `async_multiplayer_games` path.
- Daily Multiplayer as strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- `playerSessions` as canonical for per-viewer multiplayer validation/mutation and shared `serializedSession` as compatibility/answer plumbing only.
- Daily OG/GO puzzle selection as globally deterministic and unaffected by authenticated Practice seed changes.

Stage 15 must not introduce a Practice overhaul, Daily behavior changes, GO timing/animation-feel changes beyond the direct visual-regression fix, spectator expansion, notifications, floating manager, bots/social/export work, History/Theme tabs, scoring/rating/ELO changes, full dedicated Multiplayer tab work, PR creation, merge, release, or production deployment.

#### 28.50.3 Recommended Execution Sequence

If execution is later authorized, use the small-change-then-verify workflow:

1. Protect the current dirty worktree and capture a lightweight resource baseline before browser work.
2. Reproduce the GO transition bug first, including Multiplayer GO if possible and solo GO if the same root cause is visible.
3. Add focused regression coverage for prior-puzzle visibility during the solved-row hold.
4. Make the smallest GO transition fix, verify focused tests, then run a targeted browser check.
5. Reproduce the Practice seed issue with two distinct authenticated accounts receiving identical Practice OG/GO sequences.
6. Add focused regression coverage for per-account authenticated Practice seeding while proving Daily selection remains unchanged.
7. Make the smallest Practice seed fix, verify focused tests, then verify with authenticated browser/Supabase-backed flows where relevant.
8. Finish with the full Stage 15 gate: lint, full tests, build, API typecheck, diff check, desktop/tablet/390px smoke, real two-client Supabase-backed E2E for Multiplayer GO if touched, remote Supabase probes/cleanup where relevant, resource check, and preview.

#### 28.50.4 High-Conflict Surfaces And Suggested Lanes

Likely high-conflict surfaces:

- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/app/games/GoGame.tsx`
- `src/game/go/`
- Practice session creation and resume paths
- guest/account progress or storage schema surfaces if authenticated Practice seed state needs persistence
- `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `agents.md`, and `memory.md`

Suggested execution lanes if parallelized later:

- **GO transition lane**: reproduce/render prior-puzzle disappearance, map GO solved-row hold state, add focused regression coverage, and implement the minimal visibility fix.
- **Practice seed lane**: audit Practice answer/session seed inputs for authenticated vs guest users, design the smallest persistent per-account seed/state change, add Daily determinism regression coverage, and implement the scoped seed fix.
- **Multiplayer verification lane**: real two-client Supabase-backed Multiplayer GO transition verification, remote probes, and cleanup.
- **Coordinator lane**: high-conflict integration, progress/changelog/memory updates, full gate, resource checks, preview, and final handoff.

#### 28.50.5 Verification Requirements

Stage 15 execution must document reproduction of both bugs before fixes. Final verification must include focused changed-area tests, the full automated gate, responsive smoke, resource sanity, and real two-client Supabase-backed browser E2E for any Multiplayer GO change. Any authenticated Practice seed claim must be checked with distinct accounts, and Daily OG/GO determinism must be explicitly protected.

#### 28.50.6 Gate

This `phase_id = 122` planning step is complete when governance/tracking surfaces are updated and the user receives a summary. Stage 15 implementation remains gated until the user explicitly authorizes execution in a later prompt.

### 28.51 Stage 15 Execution Kickoff — Protected State, Resource Baseline, and Reproduction Plan (`phase_id = 123`)

**Authorization status**: Stage 15 execution is explicitly authorized by the user. `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md` remains the binding source of truth.

This kickoff checkpoint records the protected starting state before Stage 15 source edits:

- Current branch: `codex/phase-23-stage-10`.
- The worktree is intentionally dirty with verified Stage 8-15 planning work. Do not reset, rebase, pull over, switch away from, discard, or overwrite this state.
- No PR creation, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, deferred feature work, or later-phase work is authorized.

#### 28.51.1 Baseline Resource Snapshot

Baseline process/resource checks were captured before Stage 15 dev-server or browser testing:

- No local Vite app server was listening on the common app ports checked.
- One unrelated Python listener was present on `127.0.0.1:8765`.
- An existing Playwright-style Chrome process was visible before Stage 15 testing began; because it was not started by this Stage 15 run, it was recorded rather than terminated.
- Memory pressure was elevated, with `top` reporting about 17 GB physical memory used, about 7.3 GB compressed, and about 132 MB unused. Browser/E2E work should therefore use one dev server, minimal contexts, and explicit cleanup.

#### 28.51.2 Reproduction Plan

Stage 15 will reproduce both bugs before source fixes:

1. **GO transition regression**:
   - Start with code-level and focused browser reproduction around GO solved-row hold rendering.
   - Confirm whether the prior completed puzzle rows disappear/reset in Multiplayer GO and whether the same rendering path affects solo Practice GO or Daily GO.
   - Preserve Stage 13 solved-row hold and coordinated advancement behavior while diagnosing.
2. **Practice seed predictability**:
   - Use two distinct authenticated contexts/accounts where practical to confirm Practice OG/GO initial sequences are identical before the fix.
   - Pair browser evidence with code-level seed/session inspection to identify the seed source.
   - Explicitly check that Daily OG/GO selection remains globally deterministic.

#### 28.51.3 Stage 15 Checklist

1. Reproduce GO transition bug; document evidence.
2. Add focused failing regression coverage for prior completed GO puzzle visibility during solved-row hold.
3. Implement the smallest GO transition fix.
4. Run focused verification for the GO fix and Stage 13 solved-row hold behavior.
5. Reproduce authenticated Practice seed predictability bug; document evidence.
6. Add focused failing regression coverage for per-account Practice OG/GO seed uniqueness and Daily determinism.
7. Implement the smallest Practice seed fix.
8. Run focused verification for the seed fix.
9. Complete real Supabase-backed browser E2E where relevant, full automated gate, responsive smoke, resource check, Vercel preview, and final handoff.

No source-code fixes have been made in this kickoff checkpoint.

### 28.52 Stage 15 Focused Fixes — GO Transition Display and Authenticated Practice Seeds (`phase_id = 124`)

**Authorization status**: Stage 15 execution remains limited to `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`.

This checkpoint implements the two scoped fixes and records focused verification. Final browser/Supabase E2E, full automated gate, responsive smoke, resource check, preview, and final handoff remain pending.

#### 28.52.1 Reproduction Evidence

1. **GO transition regression**:
   - Focused component reproduction was added before the display fix.
   - The reproduction solved puzzle 1, solved puzzle 2 during the GO solved-row hold, and rendered `MultiplayerGameSurface`.
   - Before the fix, `npm run test -- src/multiplayer/MultiplayerGameSurface.test.tsx` failed because row 1 rendered the puzzle-2 solved answer instead of the carried-forward puzzle-1 answer.
   - Root cause: shared durable move projection replaced canonical GO puzzle guesses. For puzzle 2 and later, canonical guesses include prior-answer prefilled rows; shared moves include submitted turns only.
2. **Practice seed predictability**:
   - Code-path reproduction confirmed both Practice OG and Practice GO initialized `practiceSeed` to `0`, and the deterministic Practice setup helpers mapped that seed to identical answer/chain starts for different accounts.
   - Authenticated user id was available in the Practice route but was not threaded into solo Practice setup.

#### 28.52.2 Implemented Fixes

1. **GO solved-row hold display**:
   - `MultiplayerGameSurface` now merges shared durable moves with canonical puzzle guesses instead of replacing the full list.
   - The merge preserves canonical/prefilled GO rows when shared moves are a suffix, then overlays/uses shared moves for cross-client display.
   - This is display-only. It does not copy rival moves into another player's canonical `playerSessions`, change scoring, change GO advancement, or change turn settlement.
2. **Authenticated Practice seeds**:
   - Added account-derived Practice seed helpers with stable user-id hashing plus per-mode counters.
   - Added `practiceSeeds` to guest/cloud progress, with migration normalization and max-counter merge behavior.
   - Practice OG/GO receive authenticated user id and the relevant counter through the Practice route; guests keep the existing local counter fallback.
   - Daily OG/GO setup remains date-keyed and outside the account-seed path.

#### 28.52.3 Focused Verification

Passed:

- `npm run test -- src/multiplayer/MultiplayerGameSurface.test.tsx`
- `npm run test -- src/multiplayer/MultiplayerGameSurface.test.tsx src/account/practiceSeeds.test.ts src/account/guestStorage.test.ts src/account/guestTransfer.test.ts src/app/games/soloHardModeDefaults.test.tsx src/game/og/session.test.ts src/game/go/session.test.ts`
  - 7 focused files
  - 40 tests passing
- `npm run test -- src/account`
  - 13 files
  - 128 tests passing

New focused coverage verifies:

- Multiplayer GO puzzle-2 solved-row hold keeps the prior completed puzzle row visible.
- Authenticated Practice OG/GO seeds diverge for two distinct account ids.
- Guest Practice seed fallback remains the local counter path.
- Practice seed counters normalize, advance, and merge safely.
- Daily OG/GO selection remains globally deterministic for the same date.
- Legacy progress migration backfills Practice seed state.

#### 28.52.4 Pending Final Gate

Stage 15 is not complete until the following pass:

- Real two-client Supabase-backed Multiplayer GO E2E for solved-row hold, prior-row visibility, coordinated advancement, and final puzzle definitions transition.
- Authenticated two-account Practice OG/GO seed verification.
- Daily OG/GO determinism confirmation across accounts for the same UTC day.
- Stage 12, Stage 13, Stage 14, and Daily Multiplayer invariant checks.
- `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Desktop/tablet/390px browser smoke with no new console errors or horizontal overflow.
- Resource/memory/process snapshot and cleanup of any process started by this Stage 15 pass.
- Vercel preview deployment and protected/share URL if the direct preview is protected.

### 28.53 Stage 15 Final Verification and Handoff (`phase_id = 125`)

**Authorization status**: Stage 15 execution is complete for user review. No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, deferred feature work, or later-phase work is authorized by this handoff.

This final checkpoint closes the strict two-bug Stage 15 scope from `PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md`.

#### 28.53.1 Final Behavior

1. **GO transition polish**:
   - Previously completed GO puzzles remain visible during the all-green solved-row hold.
   - The fix preserves canonical/prefilled GO rows and overlays shared durable moves for display only.
   - The Stage 13 solved-row hold, coordinated Multiplayer GO advancement, and terminal definitions delay remain intact.
2. **Authenticated Practice seed randomization**:
   - Authenticated Practice OG and Practice GO use account-derived seeds plus persisted per-mode counters.
   - Distinct authenticated accounts receive different Practice OG answers and different Practice GO chains.
   - Guest Practice keeps the local counter fallback.
   - Daily OG/GO selection remains globally deterministic for the same UTC day and does not use account seed state.

#### 28.53.2 Real Browser And Supabase Verification

Passed:

- Real two-client Supabase-backed browser E2E with isolated authenticated host/rival contexts.
- Temporary authenticated accounts were created, signed in, used for verification, and cleaned up.
- Authenticated Practice seed verification confirmed:
  - Practice OG differed across accounts.
  - Practice GO differed across accounts.
  - Daily OG and Daily GO remained identical across accounts for `2026-06-08`.
  - UI-triggered Practice seed counters persisted for both OG and GO.
- Multiplayer GO verification confirmed:
  - Practice GO lobby creation persisted as a waiting row.
  - Rival join persisted and started the game.
  - Five GO answers were submitted through the multiplayer surface on-screen keyboard.
  - After puzzle 2, both clients showed row 1 as the prior completed answer and row 2 as the current all-green solved answer during the solved-row hold.
  - Final puzzle completion showed prior rows and transitioned both clients to answer/definition results.
- Remote Supabase probe confirmed the final temporary row had `moves=5`, `status=won`, and `playerSessions=2`.
- Temporary users and touched multiplayer rows were cleaned up.

#### 28.53.3 Automated And Responsive Verification

Passed:

- Focused changed-area tests: 7 files, 40 tests.
- `npm run lint`
- `npm run test`: 73 files, 478 tests.
- `npm run build`: succeeded with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- `progress/PROGRESS.csv` parse check.
- Desktop/tablet/390px browser smoke on Home, Practice, and Calendar with no console errors and no horizontal overflow.

#### 28.53.4 Resource And Preview Notes

- Stage 15 used one local Vite dev server for browser verification.
- Playwright contexts from Stage 15 verification were closed after use.
- Final resource checks showed the Stage 15 Vite process before cleanup and no Stage 15 runaway browser contexts. Pre-existing user/Codex/Chrome processes were recorded and not terminated.
- The local Vite server started for Stage 15 was stopped after verification.
- Vercel preview deployed successfully. The direct preview is deployment-protected, so a protected share URL is provided only in the final chat and intentionally not committed to repo docs.

No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating change, broad refactor, redesign, or out-of-scope work was performed.

### 28.54 Stage 16 Planning — Practice Multiplayer GO Bug Fixes (`phase_id = 126`)

**Authorization status**: planning and governance only. `PHASE-23-STAGE-16-PRACTICE-MULTIPLAYER-GO-BUGFIXES-SPEC-2026-06-08.md` is the binding Stage 16 source of truth.

This planning step does **not** authorize source-code edits, test changes, UI/component work, Supabase migrations, configuration changes, implementation branches, PR creation, merge, release, production deployment, full dedicated Multiplayer tab implementation, spectator expansion, deferred feature work, scoring/rating changes, broad refactoring, redesign, or Stage 16 execution.

The user prompt referenced `phase_id = 123`, but the current repository ledger already contains `progress/PROGRESS-STEP-123.md` through `progress/PROGRESS-STEP-125.md` for Stage 15 execution, focused fixes, and final verification. To preserve the sequential progress invariant and avoid overwriting Stage 15 records, this planning pass uses the next available progress id: `phase_id = 126`.

#### 28.54.1 Stage 16 Goal

Stage 16 is an extremely narrow targeted bug-fix stage for **Practice Multiplayer GO only**. It has exactly two scoped bugs:

1. **Missing previous solutions in the GO chain stack**: every previously completed puzzle in a Practice Multiplayer GO chain must remain accumulated and visible for every subsequent puzzle.
2. **Keyboard state not reflecting prior solutions**: letters that are gray or orange on the board from prior GO solutions must be reflected correctly on the on-screen keyboard for the current Practice Multiplayer GO puzzle.

#### 28.54.2 Scope Boundaries

Only Practice Multiplayer GO may be investigated or changed during future Stage 16 execution. The following are explicitly out of scope:

- Daily Multiplayer GO, even if a similar symptom is found.
- Multiplayer OG, which the user confirmed is working correctly.
- Solo Practice GO, solo Daily GO, Daily Solo, Practice solo, and all other solo modes.
- The Stage 15 authenticated Practice seed system.
- Broader GO chain, keyboard, multiplayer architecture, scoring/rating, spectator, notification, floating-manager, bot/social/export, History/Theme, full dedicated Multiplayer tab, PR, merge, release, production deployment, broad refactor, redesign, or later-phase work.

#### 28.54.3 Invariants To Preserve

Future Stage 16 execution must preserve:

- Stage 12 wins: Practice Multiplayer Hard Mode enforcement, keyboard responsiveness, sound playback, row-write reduction, stale-save protections, timed Practice behavior, and scoring/result settlement.
- Stage 13 wins: Practice solo one-shot resume behavior, submitted-row animation stability, post-game results visibility, Multiplayer GO solved-row hold, and coordinated advancement.
- Stage 14 wins: hidden/inert Multiplayer foundations, Calendar/Practice as active multiplayer entry points, nonparticipant gameplay guard, and unified `async_multiplayer_games` path.
- Stage 15 wins: GO solved-row hold prior-puzzle visibility and authenticated Practice per-account seeding.
- Daily Multiplayer as strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- `playerSessions` as canonical for per-viewer multiplayer validation/mutation and shared `serializedSession` as compatibility/answer plumbing only.

#### 28.54.4 Required Future Execution Discipline

If Stage 16 execution is later authorized, use the established reproduce-first, small-change-then-verify workflow:

1. Protect the current worktree and capture a lightweight resource baseline before browser work.
2. Reproduce both Practice Multiplayer GO bugs with clear evidence before source fixes.
3. Prioritize missing previous solutions in the GO stack, then prior-solution keyboard state.
4. Make one minimal Practice Multiplayer GO-only fix at a time.
5. Run focused verification immediately after each logical fix.
6. Use real two-client Supabase-backed browser E2E with isolated authenticated contexts for any multiplayer behavior claim.
7. Pair browser evidence with remote Supabase probes/cleanup where relevant.
8. Finish with focused changed-area tests, full lint/test/build/API typecheck/diff gate, desktop/tablet/390px smoke, resource checks, and a preview only if execution is later authorized.

#### 28.54.5 High-Conflict Surfaces And Suggested Lanes

Likely high-conflict surfaces for later execution:

- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/multiplayer.ts`
- multiplayer GO display/projection helpers
- focused multiplayer GO tests
- `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `agents.md`, and `memory.md`

Suggested lanes if execution is later parallelized:

- **Practice Multiplayer GO display lane**: reproduce missing accumulated previous solutions and map the display projection.
- **Practice Multiplayer GO keyboard lane**: reproduce gray/orange prior-solution keyboard state gaps and design the smallest projection fix.
- **Verification lane**: real two-client Supabase-backed Practice Multiplayer GO E2E, remote probes/cleanup, Stage 12-15 invariant checks, responsive/resource smoke.
- **Coordinator lane**: high-conflict integration, governance/progress updates, full gate, preview, and handoff.

#### 28.54.6 Gate

This `phase_id = 126` planning step is complete when governance/tracking surfaces are updated and the user receives a summary. Stage 16 implementation remains gated until the user explicitly authorizes execution in a later prompt.

### 28.55 Stage 16 Execution Kickoff — Protected State, Resource Baseline, And Reproduction Plan (`phase_id = 127`)

**Authorization status**: execution explicitly authorized by the user. This checkpoint records the required starting state before any Stage 16 source-code fixes.

#### 28.55.1 Protected Starting State

- Active branch: `codex/phase-23-stage-15-final`.
- Starting worktree: dirty with the Stage 16 planning/governance files already present (`AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `agents.md`, `memory.md`, `progress/PROGRESS.csv`, `PHASE-23-STAGE-16-PRACTICE-MULTIPLAYER-GO-BUGFIXES-SPEC-2026-06-08.md`, and `progress/PROGRESS-STEP-126.md`).
- The current local repository state remains the source of truth. No reset, rebase, pull-over, branch switch, discard, force-push, branch deletion, PR, merge, or release is authorized.

#### 28.55.2 Resource Baseline

Before dev-server/browser testing, a lightweight resource snapshot found:

- No local Vite listener on `127.0.0.1:5173` or `127.0.0.1:5174`.
- `top -l 1 -o mem` reported 537 total processes, load average about `3.65, 3.69, 3.07`, CPU about 60% idle, and physical memory at `17G used` with `6286M compressor` and `145M unused`.
- `vm_stat` reported 5,209 free pages, 1,848,284 pages stored in the compressor, and no new Stage 16-owned long-running process yet.
- The highest-memory processes were pre-existing user/system apps such as Obsidian, Finder, Eloquent, Chrome, Codex, VS Code, Python, and WindowServer. Stage 16 browser work should use one Vite server, minimal browser contexts, sequential heavy gates, and explicit cleanup.

#### 28.55.3 Reproduction Plan

Stage 16 must reproduce both Practice Multiplayer GO bugs before source fixes:

1. **Previous-solution stack**: create/join a Practice Multiplayer GO lobby with two authenticated contexts, solve multiple GO puzzles, and inspect both clients on later puzzle indexes where multiple prior solution rows should remain visible and accumulated.
2. **Prior-solution keyboard state**: in the same Practice Multiplayer GO flow where possible, compare gray/orange visible board evidence from prior GO solutions with the current on-screen keyboard state on both host and rival.

#### 28.55.4 Scope Boundary And Verification Plan

Execution remains strictly limited to Practice Multiplayer GO display/projection behavior. Daily Multiplayer GO, Multiplayer OG, solo modes, the Stage 15 authenticated Practice seed system, Daily OG/GO deterministic selection, scoring/rating, spectator features, full Multiplayer tab work, and broad architecture changes remain out of scope.

The intended verification path is focused regression coverage for each bug, targeted browser checks, real two-client Supabase-backed Practice Multiplayer GO E2E, remote Supabase probes/cleanup where relevant, Stage 12-15 non-regression checks, full lint/test/build/API typecheck/diff gate, responsive smoke, resource snapshot, and Vercel preview/share verification before final handoff.

### 28.56 Stage 16 Focused Reproduction And Fixes — Practice Multiplayer GO Projection (`phase_id = 128`)

Focused component regressions reproduced both scoped Stage 16 bugs before source fixes:

1. On Practice Multiplayer GO puzzle 3, after puzzles 1 and 2 were solved and a shared current-puzzle move arrived, the rival display could lose an accumulated prior solution row and render stale/partial stack state.
2. In the same projected later-puzzle state, a prior-only gray/orange evidence letter remained an unknown keyboard key instead of using the app's existing keyboard color precedence.

The targeted fix stays in `src/multiplayer/MultiplayerGameSurface.tsx`:

- Practice GO display projection now preserves the prior-row prefix before overlaying shared durable moves.
- Keyboard colors are derived from the merged display evidence rather than only the current shared move list.
- A stale Practice GO solved-row hold is not re-entered after a newer move has arrived.

This remains display/projection-only and does not mutate another player's canonical `playerSessions`. Daily Multiplayer GO, Multiplayer OG, solo modes, and the Stage 15 Practice seed system were not intentionally modified.

Focused verification:

- `npx vitest run src/multiplayer/MultiplayerGameSurface.test.tsx` failed before the fix on the two new Stage 16 regression tests.
- `npx vitest run src/multiplayer/MultiplayerGameSurface.test.tsx` passes after the fix (1 file, 6 tests).

At this `phase_id = 128` checkpoint, final verification still remained pending and was completed later under `phase_id = 129` and `phase_id = 130`.

### 28.57 Stage 16 Real Browser E2E And Remote Probe Checkpoint (`phase_id = 129`)

Real two-client Supabase-backed browser E2E verified the scoped Practice Multiplayer GO fixes against the local app server and the configured Supabase project.

Evidence:

- Temporary host/rival authenticated users were created through Supabase admin APIs, signed into two isolated browser contexts through the app UI, and then deleted during cleanup.
- The host created a Practice Multiplayer GO lobby through the UI; the rival joined through the UI.
- The run solved the first two GO puzzles, advanced to puzzle 3, submitted a valid distinct wrong guess, and verified both clients showed the accumulated row sequence `erhus` -> `ernes` -> `escar`.
- The keyboard check used prior-only absent evidence (`H`) from the visible prior GO solution rows and confirmed that key was no longer in the unknown keyboard state on both clients.
- The run finished the five-puzzle GO chain and remotely probed the durable row as `status = won`, `moves = 6`, `scope = practice`, `mode = go`, with both `player-one` and `player-two` sessions present.
- Remote cleanup removed the touched `async_multiplayer_games` row (`multiplayer-practice-go-14636837-c422-4ed7-af99-9c4088218e25`) and both temporary auth users. A follow-up probe confirmed the two Stage 16 E2E game ids no longer had rows.

This checkpoint also tightened the Stage 16 keyboard-color fix so merged display-evidence keyboard derivation is gated to Practice GO only; non-Practice-GO multiplayer modes keep the previous keyboard source path. Focused changed-area verification after that tightening passed:

- `npx vitest run src/multiplayer/MultiplayerGameSurface.test.tsx src/multiplayer/multiplayer.test.ts src/game/go/session.test.ts src/account/practiceSeeds.test.ts` passed (4 files, 44 tests).

### 28.58 Stage 16 Final Verification And Handoff (`phase_id = 130`)

Stage 16 is complete for user review.

Final fix summary:

- Practice Multiplayer GO now preserves every accumulated prior GO solution row during later-puzzle display projection before overlaying shared durable moves.
- Practice Multiplayer GO keyboard colors now derive from the merged visible board evidence, so prior gray/orange rows color the current puzzle keyboard through the existing precedence rules.
- The stale solved-row hold guard prevents an older Practice GO solved-row transition from reappearing after a newer move arrives.
- The fix remains display/projection-only and does not mutate rival canonical `playerSessions`.

Final verification:

- Focused changed-area tests passed: `npx vitest run src/multiplayer/MultiplayerGameSurface.test.tsx src/multiplayer/multiplayer.test.ts src/game/go/session.test.ts src/account/practiceSeeds.test.ts` (4 files, 44 tests).
- Full automated gate passed: `npm run lint`, `npm run test` (73 files, 480 tests), `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Desktop, tablet-like, and 390px browser smoke passed with no new console errors and no document-level horizontal overflow.
- Real two-client Supabase-backed Practice Multiplayer GO E2E passed twice; the strongest run verified accumulated rows on both clients (`erhus` -> `ernes` -> `escar`), prior-only absent keyboard evidence (`H`) on both clients, final five-puzzle completion (`status = won`, six moves, both `playerSessions`), and no manual duplicate rival answer entry.
- Remote Supabase probes confirmed durable row state before cleanup and confirmed the Stage 16 E2E game rows were deleted afterward along with temporary auth users.
- Resource checks confirmed the Stage 16 Vite/dev-server and browser processes were closed and no Stage 16-owned runaway CPU/RAM/disk pressure remained.
- Vercel preview deployed successfully and the protected preview responded with HTTP 200 through authenticated Vercel CLI verification: `https://brrrdle-66ikyvyc0-ryanjosephkamps-projects.vercel.app`. A deployment-specific shareable-link protection-bypass record was created with a 30-day TTL, but the Vercel CLI/API response did not return a verified browser share URL; no bypass token was committed to repository docs.

Scope confirmation:

- Only Practice Multiplayer GO behavior was changed.
- Daily Multiplayer GO, Multiplayer OG, solo modes, Daily determinism, and the Stage 15 authenticated Practice seed system were not modified.
- No PR, merge, release, full dedicated Multiplayer tab implementation, spectator expansion, notifications, floating manager, bots/social/export work, scoring/rating changes, broad refactor, redesign, or out-of-scope work was performed.

### 28.59 Stage 17 Planning — Solo Practice GO Customize Lock Bug Fix (`phase_id = 131`)

**Authorization status**: planning and governance only. `PHASE-23-STAGE-17-SOLO-PRACTICE-GO-CUSTOMIZE-LOCK-BUGFIX-SPEC-2026-06-08.md` is the binding Stage 17 source of truth.

This planning step does not authorize source-code edits, tests, UI/component work, configuration changes, implementation branches, PR creation, merge, release, production deployment, or Stage 17 execution.

#### 28.59.1 Stage 17 Goal

Stage 17 is an extremely narrow single-bug fix for **Solo Practice GO only**.

The scoped bug: the Solo Practice GO Customize box incorrectly shows the locked-state message and disables Difficulty / chain length controls on brand-new GO chains before the player has submitted any guess:

> "Difficulty and chain length are locked because this puzzle has started. Start a new puzzle to change them."

Correct behavior: Solo Practice GO should match Solo Practice OG. Difficulty and chain length remain unlocked on a fresh Practice GO chain until the first guess is submitted in the current chain, then the options lock.

#### 28.59.2 Scope Boundaries

In scope for future execution only:

- Reproduce the Solo Practice GO Customize early-lock bug before source edits.
- Study the existing Solo Practice OG locking condition.
- Apply the smallest targeted Solo Practice GO locking-condition fix.
- Add or update focused regression tests for fresh GO chains and GO chains with at least one submitted guess.
- Verify that fresh Solo Practice GO chains allow Difficulty and chain length changes, and in-progress chains correctly lock.

Explicitly out of scope:

- Solo Practice OG behavior changes.
- Solo Daily GO or Daily Multiplayer GO changes.
- Practice Multiplayer GO or any Multiplayer GO changes.
- Any other solo mode changes.
- Stage 15 authenticated Practice seed system changes.
- Hard Mode behavior, resume behavior, scoring, GO chain advancement, Customize layout/styling/copy, broad Practice GO refactors, broad Customize refactors, PR creation, merge, release, or later-phase work.

If future execution finds that the root cause requires touching an out-of-scope surface, stop and report rather than broadening the fix.

#### 28.59.3 Verification Requirements

Future Stage 17 execution must use small-change-then-verify discipline:

- Reproduce the bug before source changes.
- Make one focused locking-condition fix.
- Run focused tests for the changed area.
- Run the full gate before handoff: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- Run desktop, tablet-like, and 390px browser smoke with no new console errors or horizontal overflow.
- Verify Solo Practice OG remains unchanged and Stage 12-16 wins/invariants remain preserved.

#### 28.59.4 Planning Deliverables

This `phase_id = 131` planning step updates `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `agents.md`, `memory.md`, `progress/PROGRESS.csv`, and `progress/PROGRESS-STEP-131.md` only. Stage 17 implementation remains gated until a later explicit execution prompt.

### 28.60 Stage 17 Execution Kickoff — Protected State, Resource Baseline, And Reproduction Plan (`phase_id = 132`)

**Authorization status**: execution explicitly authorized by the user for `PHASE-23-STAGE-17-SOLO-PRACTICE-GO-CUSTOMIZE-LOCK-BUGFIX-SPEC-2026-06-08.md`.

This checkpoint opens Stage 17 execution and records the required state before any source-code fix.

#### 28.60.1 Protected Starting State

- Active branch: `codex/phase-23-stage-16-final`.
- `git status --short` shows the Stage 17 planning/governance dirt as the current source of truth:
  - Modified: `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `agents.md`, `memory.md`, `progress/PROGRESS.csv`.
  - Untracked: `PHASE-23-STAGE-17-SOLO-PRACTICE-GO-CUSTOMIZE-LOCK-BUGFIX-SPEC-2026-06-08.md`, `progress/PROGRESS-STEP-131.md`.
- Do not reset, rebase, pull over, switch branches, discard changes, force-push, delete branches, create a PR, merge, release, or otherwise risk losing the current local state.

#### 28.60.2 Baseline Resource Snapshot

Captured before source fixes, dev-server startup, or browser testing:

- No Vite/dev-server listener was found on the usual local app ports (`5173`, `5174`, `3000`, `4173`).
- `top -l 1 -o mem` reported 647 processes, load average about `5.73, 4.96, 4.69`, `17G` physical memory used, `186M` unused, and `6365M` compressor.
- High-memory processes were pre-existing user/system apps, including Obsidian, Finder, Eloquent, WindowServer, Codex, Chrome, VS Code, and Python workers. No Stage 17-owned long-running app server or browser context has been started yet.
- Resource plan: use one Vite server only if browser verification requires it, avoid parallel heavy gates, close browser contexts after smoke checks, and finish with a resource/process snapshot.

#### 28.60.3 Reproduction Plan

Before writing a source fix, Stage 17 must demonstrate:

1. A freshly created Solo Practice GO chain shows the locked Customize message before any guess is submitted.
2. Difficulty and/or chain length controls are unavailable or treated as locked despite zero submitted guesses.
3. Solo Practice OG remains the behavioral reference and does not show the same fresh-puzzle lock.

Reproduction can use a focused test harness, browser smoke, or both, but must be recorded before the locking-condition fix.

#### 28.60.4 Execution Scope

Allowed work is limited to:

- Locating the Solo Practice GO Customize locking condition.
- Comparing against the correct Solo Practice OG lock rule.
- Applying the smallest targeted Solo Practice GO condition change so fresh GO chains are unlocked until the first submitted guess.
- Adding focused regression coverage for fresh-chain unlocked behavior and post-first-guess locked behavior.
- Updating progress/governance records.

Explicitly out of scope: Solo Practice OG behavior changes, Daily GO, Daily Multiplayer GO, Practice Multiplayer GO, any Multiplayer GO path, any other solo mode, Stage 15 authenticated Practice seeds, Daily deterministic selection, Hard Mode, resume behavior, scoring/rating, GO chain advancement, Customize layout/styling/copy, broad refactors, PR creation, merge, release, production deployment, and later-phase work.

#### 28.60.5 Verification Plan

Focused verification should run immediately after the single locking-condition fix, then the final gate must include:

- Focused changed-area tests.
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Desktop, tablet-like, and 390px browser smoke with no new console errors or horizontal overflow.
- Solo Practice GO fresh-chain unlocked check, post-first-guess locked check, and Solo Practice OG non-regression.
- Resource/process snapshot after testing.

### 28.61 Stage 17 Final Verification And Handoff (`phase_id = 133`)

**Authorization status**: Stage 17 execution complete for user review. No PR, merge, release, production deployment, or later-phase work was authorized or performed.

#### 28.61.1 Reproduction Evidence

The Solo Practice GO Customize-lock bug was reproduced before the fix with a focused regression in `src/app/games/soloHardModeDefaults.test.tsx`.

Pre-fix behavior:

- A brand-new Practice GO chain rendered the locked Customize message before any user-submitted guess:
  - "Difficulty and chain length are locked because this puzzle has started. Start a new puzzle to change them."
- Difficulty and chain length controls were disabled on that fresh GO chain.
- Solo Practice OG remained the behavioral reference: a fresh OG puzzle kept Difficulty unlocked.

The root cause was local to the Solo Practice GO lock predicate: GO setup materializes later puzzles with prefilled carry-over rows, and the previous chain-wide `puzzle.guesses.length > 0` check treated those prefilled rows as player-submitted guesses.

#### 28.61.2 Implemented Fix

Stage 17 made one targeted Solo Practice GO locking-condition change:

- `GoGame` now computes whether any GO puzzle has an actual submitted guess beyond its setup-prefilled rows.
- The Customize menu locks only when that submitted-guess count is present.
- Setup-prefilled GO rows no longer lock Customize on a fresh chain.

No Customize copy, layout, styling, GO advancement, resume behavior, Hard Mode behavior, seed behavior, multiplayer path, Daily path, scoring/rating rule, or Solo Practice OG behavior was intentionally changed.

#### 28.61.3 Verification Evidence

Focused verification:

- `npx vitest run src/app/games/soloHardModeDefaults.test.tsx` first failed before the fix on the fresh Practice GO Customize-lock regression, then passed after the fix (5 tests).
- `npx vitest run src/app/games/soloHardModeDefaults.test.tsx src/game/go/session.test.ts src/account/practiceSeeds.test.ts src/account/resumeSlot.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx` passed (5 files, 39 tests).

Full local gate:

- `npm run lint` passed.
- `npm run test` passed (73 files, 483 tests).
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- `git diff --check` passed.

Browser smoke:

- Desktop, tablet-like, and 390px smoke verified fresh Solo Practice GO Customize controls are unlocked.
- The same smoke verified fresh Solo Practice OG Customize behavior remains unlocked.
- A targeted Practice GO browser check verified Customize locks after the first submitted guess and unlocks again after `New go chain`.
- No new console/page errors or document-level horizontal overflow were observed in the browser smoke.

#### 28.61.4 Resource And Scope Notes

- One Vite dev server was used for browser smoke and then stopped.
- The Playwright browser context was closed, and generated `.playwright-cli/` artifacts were removed from the worktree.
- Final resource checks found no Stage 17-owned dev server or browser context left running.

Stage 17 changed only Solo Practice GO locking behavior plus focused regression coverage and governance/progress records. Daily GO, Daily Multiplayer GO, Practice Multiplayer GO, any Multiplayer GO path, Multiplayer OG, Solo Practice OG behavior, Stage 15 Practice seeds, Daily determinism, Hard Mode, resume, scoring/rating, GO advancement, broad refactors, redesign, PR creation, merge, release, and later-phase work remained out of scope and were not performed.

---

**End of AGENT-IMPLEMENTATION-PLAN.md**
