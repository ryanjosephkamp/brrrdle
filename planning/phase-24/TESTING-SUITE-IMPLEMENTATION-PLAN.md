# Phase 24 Testing Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` for parallel execution lanes or `superpowers:executing-plans` for inline execution. This plan is intentionally task-oriented and uses checkbox syntax for execution tracking.

**Goal:** Build a comprehensive, maintainable gameplay-correctness testing suite for `brrrdle`, with strong real two-client Supabase-backed E2E coverage and practical modular commands for full, subset, and individual test runs.

**Architecture:** Keep the existing Vitest suite as the fast domain/component regression layer, then add a Playwright E2E layer for real browser gameplay flows. Use shared E2E fixtures for authenticated users, two-client contexts, remote Supabase probes, cleanup, deterministic daily time control, and stable gameplay actions.

**Tech Stack:** Vitest, React Testing Library-style component tests already in the repo, Playwright, Vite dev server, Supabase JS, existing `src/game/`, `src/daily/`, and `src/multiplayer/` domain helpers.

---

## 1. Authority, Scope, And Non-Goals

### Binding Inputs

- `CONSTITUTION.md`
- `planning/specs/phase-24/PHASE-24-TESTING-SUITE-CREATION-SPEC-2026-06-11.md`
- `planning/testing/TESTING-SUITE.md`
- Current implementation and existing tests under `src/`

### In Scope For Future Execution

- Gameplay correctness tests for solo and multiplayer.
- OG and GO behavior.
- Practice and Daily variants.
- Daily puzzle rotation at midnight UTC.
- Daily Multiplayer claim/guard behavior.
- Hard Mode behavior.
- GO transitions, carry-over rows, solved-row holds, definitions, and terminal state.
- Multiplayer forfeit, timeout, status/result precedence, and refresh/reconnect behavior.
- Keyboard state, color precedence, duplicate-letter handling, and carry-over evidence.
- Documentation updates to `planning/testing/TESTING-SUITE.md`.
- Progress tracking for the execution pass.

### Out Of Scope For Future Execution

- New gameplay features.
- UI redesign or visual regression testing beyond gameplay-state assertions.
- Performance/load testing.
- Repository-organization tests.
- Broad deletion or replacement of existing tests.
- Non-gameplay auth/settings/economy/stats/Word Explorer coverage except where needed to reach gameplay.
- Production deployment.

---

## 2. Current Baseline Assumptions

The repository currently has:

- `npm run test` mapped to `vitest run`.
- Existing gameplay and multiplayer tests under `src/`, including:
  - `src/game/go/session.test.ts`
  - `src/game/og/session.test.ts`
  - `src/game/hardMode.test.ts`
  - `src/game/tileStates.test.ts`
  - `src/daily/dailyCycle.test.ts`
  - `src/multiplayer/multiplayer.test.ts`
  - `src/multiplayer/dailyMultiplayer.test.ts`
  - `src/multiplayer/MultiplayerGameSurface.test.tsx`
  - `src/multiplayer/multiplayerRepository.test.ts`
- No dedicated `e2e/` folder.
- No committed Playwright config.
- Supabase-backed gameplay exists through `src/account/supabaseClient.ts` and `src/multiplayer/multiplayerRepository.ts`.
- `planning/testing/TESTING-SUITE.md` is currently a foundation document, not a full coverage matrix.

Execution must verify these assumptions at the start, because the repository may change before implementation begins.

---

## 3. Overall Strategy

### Layer 1: Fast Domain And Component Tests

Use Vitest for deterministic gameplay invariants:

- Wordle duplicate-letter accounting.
- Keyboard color precedence.
- Hard Mode validation.
- GO chain setup, carry-over rows, solved-row states, and terminal status.
- Daily UTC date-key behavior and anti-gaming guards.
- Multiplayer reducer/domain rules: turn ownership, claims, forfeit, timeout, status/result settlement.

These tests should stay fast and should continue to run through `npm run test`.

### Layer 2: Browser E2E Gameplay Tests

Add Playwright for actual app flows:

- Two separate authenticated browser contexts for multiplayer.
- Real Supabase persistence and realtime/reload behavior.
- Practice Multiplayer OG and GO.
- Daily Multiplayer OG and GO.
- Solo Practice and Daily gameplay smoke with focus on GO and Daily rotation.

These tests should run through explicit E2E scripts so agents can run them as full, subset, or single-scenario checks without making every local `npm run test` require remote credentials.

### Layer 3: Documentation And Coverage Matrix

Expand `planning/testing/TESTING-SUITE.md` into the canonical map of:

- What is covered by Vitest.
- What is covered by Playwright E2E.
- What commands to run for full, subset, and individual tests.
- Which critical gameplay risks are still known gaps.

---

## 4. Proposed Test File Structure

### Modify Existing Fast-Test Files

- `src/game/tileStates.test.ts`
  - Add explicit duplicate-letter keyboard precedence cases if gaps remain.
- `src/game/hardMode.test.ts`
  - Add any missing GO/OG Hard Mode edge cases shared by solo and multiplayer validation.
- `src/game/go/session.test.ts`
  - Add or strengthen GO transition, carry-over, solved-row, and terminal definition-state domain coverage.
- `src/daily/dailyCycle.test.ts`
  - Strengthen midnight UTC rotation and Daily anti-gaming guard tests.
- `src/multiplayer/multiplayer.test.ts`
  - Strengthen forfeit, timeout, turn ownership, GO final-state, and result precedence coverage.
- `src/multiplayer/dailyMultiplayer.test.ts`
  - Strengthen Daily claim/guard and claim-separation coverage.
- `src/multiplayer/MultiplayerGameSurface.test.tsx`
  - Strengthen display-only projection, keyboard state, and status text component coverage.

### Create E2E Harness Files

- `e2e/README.md`
  - Human-readable guide for local credentials, commands, cleanup, and troubleshooting.
- `e2e/fixtures/env.ts`
  - Validates E2E environment variables and fails with clear messages when required credentials are missing.
- `e2e/fixtures/supabaseAdmin.ts`
  - Creates Supabase clients for remote probes and cleanup. Uses service-role credentials only from local environment variables and never logs secrets.
- `e2e/fixtures/testUsers.ts`
  - Creates unique authenticated test users, signs them in, records cleanup handles, and removes users where permissions allow.
- `e2e/fixtures/twoClientGame.ts`
  - Opens two isolated browser contexts, signs in distinct users, starts or joins games, and exposes host/rival pages plus cleanup.
- `e2e/fixtures/gameActions.ts`
  - Stable gameplay actions: navigate to Practice/Calendar, choose OG/GO, create lobby, join lobby, enter guesses, wait for turn, wait for solved-row hold, wait for terminal results.
- `e2e/fixtures/dailyClock.ts`
  - Installs deterministic `Date` and `Date.now` mocks with `page.addInitScript` before app load for Daily rotation tests.
- `e2e/fixtures/assertions.ts`
  - Shared assertions for board rows, keyboard state, current player status, turn history, terminal status, definitions, and no console/page errors.
- `e2e/fixtures/cleanup.ts`
  - Deletes or cancels temporary game rows, claims, and users where allowed; documents any cleanup limitation in test output.

### Create E2E Specs

- `e2e/gameplay/practice-multiplayer-og.spec.ts`
  - Practice OG create/join, alternating turns, Hard Mode where relevant, forfeit, timeout, normal completion.
- `e2e/gameplay/practice-multiplayer-go.spec.ts`
  - Practice GO create/join, GO transitions, carry-over rows, keyboard state after transitions, refresh/reconnect, terminal results.
- `e2e/gameplay/daily-multiplayer-og.spec.ts`
  - Daily OG claim guard, create/join, turn submission, normal completion, claim cleanup/limitations.
- `e2e/gameplay/daily-multiplayer-go.spec.ts`
  - Daily GO claim guard, GO transitions, keyboard state on later puzzles, final completion, synchronized terminal state.
- `e2e/gameplay/solo-practice-go.spec.ts`
  - Solo Practice GO Hard Mode, solved-row transition, carry-over rows, definitions/results.
- `e2e/gameplay/solo-daily-go.spec.ts`
  - Solo Daily GO keyboard state, solved-row transition, definitions/results, Daily persistence.
- `e2e/gameplay/daily-rotation.spec.ts`
  - Solo Daily OG and GO date rollover at midnight UTC using deterministic browser time.

### Create Or Modify Config Files During Execution

- `package.json`
  - Add Playwright scripts.
- `package-lock.json`
  - Update if a new dependency is installed.
- `playwright.config.ts`
  - Configure one Vite web server, Chromium project, one worker by default for remote Supabase safety, traces/screenshots on failure, and E2E-specific timeouts.

Do not create these files in this planning pass. They are future execution targets only.

---

## 5. Proposed Scripts And Modularity

Keep `npm run test` as the fast Vitest command unless the user explicitly asks to redefine it. Add explicit E2E/full commands:

```json
{
  "test": "vitest run",
  "test:unit": "vitest run",
  "test:unit:watch": "vitest",
  "test:e2e": "playwright test",
  "test:e2e:practice": "playwright test --grep @practice",
  "test:e2e:daily": "playwright test --grep @daily",
  "test:e2e:multiplayer": "playwright test --grep @multiplayer",
  "test:e2e:solo": "playwright test --grep @solo",
  "test:full": "npm run test:unit && npm run test:e2e"
}
```

Execution may adjust exact Playwright file globs if the Playwright CLI requires a safer pattern. The final scripts must support:

- Full fast suite: `npm run test`
- Full browser suite: `npm run test:e2e`
- Everything: `npm run test:full`
- Practice-only E2E: `npm run test:e2e:practice`, powered by `@practice` tags in Playwright test titles or `test.describe` blocks.
- Daily-only E2E: `npm run test:e2e:daily`, powered by `@daily` tags.
- Multiplayer-only E2E: `npm run test:e2e:multiplayer`, powered by `@multiplayer` tags.
- Solo-only E2E: `npm run test:e2e:solo`, powered by `@solo` tags.
- Single test: `npx playwright test e2e/gameplay/practice-multiplayer-go.spec.ts -g "GO transitions"`

Rationale: remote Supabase E2E should be first-class, but it should not make every lightweight unit-test run depend on browser binaries, live credentials, and remote cleanup.

---

## 6. Prioritization

### Priority 1: E2E Harness Reliability

Build the shared Playwright/Supabase harness before adding many specs. A small number of reliable tests is more valuable than many brittle flows.

Deliverables:

- `playwright.config.ts`
- E2E env validation.
- Two-client auth fixture.
- Remote probe/cleanup fixture.
- Stable gameplay actions and assertions.
- Resource-safety discipline: one dev server, one worker by default, minimal contexts, cleanup after each test.

### Priority 2: Multiplayer GO Transitions And Keyboard State

These have historically produced subtle bugs. Cover Practice GO first, then Daily GO:

- Both clients remain synchronized across later GO puzzles.
- Carry-over rows remain visible.
- Keyboard reflects board evidence with precedence `green > orange > gray`.
- Solved-row hold appears and resolves.
- Puzzle 5 remains multiplayer and terminal results are synchronized.
- Refresh/reconnect preserves state.

### Priority 3: Daily Claim/Guard And Daily Rotation

Cover:

- Daily Multiplayer OG and GO claim separation.
- Already-claimed guard behavior.
- Cancellation/cleanup behavior where it affects claim availability.
- Solo Daily OG/GO availability changes after midnight UTC.
- Daily puzzle identity changes after UTC rollover without relying on local machine time.

### Priority 4: Hard Mode, Forfeit, Timeout, And Result Precedence

Cover:

- Solo Hard Mode domain and browser smoke.
- Practice Multiplayer Hard Mode enforcement.
- Forfeit loser precedence after at least one guess.
- Pre-guess forfeit cancellation behavior.
- Timeout loser precedence.
- Timed Practice clock countdown and expiration.

### Priority 5: Broader Solo And Regression Coverage

Cover:

- Solo Practice OG/GO and Solo Daily OG/GO gameplay sanity.
- Definitions and results after completion.
- Resume/refresh behavior for in-progress games.
- Basic route/auth smoke only as needed to reach gameplay.

---

## 7. Two-Client Supabase E2E Strategy

### Environment Variables

Use local environment variables only. Do not commit secrets.

Required for real E2E:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
E2E_SUPABASE_URL=...
E2E_SUPABASE_ANON_KEY=...
```

Recommended for robust remote probes and cleanup:

```bash
E2E_SUPABASE_SERVICE_ROLE_KEY=...
```

If service-role cleanup is unavailable, tests may still run with browser-authenticated clients, but the execution handoff must document cleanup limitations and any durable temporary rows/users left behind.

### User Strategy

- Generate unique emails using a stable prefix and timestamp, for example:
  - `brrrdle-e2e-host-<run-id>@example.test`
  - `brrrdle-e2e-rival-<run-id>@example.test`
- Prefer creating users through Supabase Admin API when `E2E_SUPABASE_SERVICE_ROLE_KEY` is available.
- Fall back to app sign-up only if the project configuration allows immediate email/password sign-in.
- Do not print passwords or tokens.
- Delete users after tests when the service role is available.

### Browser Context Strategy

- Use one Playwright browser with two isolated contexts.
- Sign in host and rival in separate contexts.
- Capture console errors and page errors from both contexts.
- Close contexts in `afterEach`, even on failure.
- Tag test-created rows with deterministic prefixes where the schema allows it.

### Remote Probe Strategy

Probe the remote database after important events:

- Lobby/game row exists.
- Both participants are represented.
- Moves are persisted.
- Current turn and status match expected app UI.
- Daily claim rows exist or are released according to the scenario.
- Terminal result fields are correct.

Use probes for evidence and cleanup, not as a replacement for UI assertions.

### Flake Control

- Use one Playwright worker by default for Supabase E2E.
- Prefer app-observed states over fixed sleeps.
- Poll with bounded timeouts for realtime propagation.
- Keep each E2E scenario short and deterministic.
- Split long flows into separate specs where cleanup boundaries are clearer.

---

## 8. Daily Rotation Testing Strategy

### Domain Coverage

Strengthen `src/daily/dailyCycle.test.ts` and related daily setup tests:

- Solo daily uses the expected local/UTC date behavior already defined by existing helpers.
- Multiplayer daily uses UTC date keys.
- Natural rollover across midnight UTC grants the new Daily.
- Suspicious in-session jumps remain clamped where anti-gaming rules require it.

### Browser Coverage

Use Playwright `page.addInitScript` before app load to freeze browser time:

```ts
await page.addInitScript(({ isoNow, monotonicMs }) => {
  const fixedTime = new Date(isoNow).getTime()
  const OriginalDate = Date
  class MockDate extends OriginalDate {
    constructor(...args: ConstructorParameters<typeof Date>) {
      if (args.length === 0) {
        super(fixedTime)
      } else {
        super(...args)
      }
    }
    static now() {
      return fixedTime
    }
  }
  window.Date = MockDate as DateConstructor
  Object.defineProperty(window.performance, 'now', {
    configurable: true,
    value: () => monotonicMs,
  })
}, { isoNow: '2026-06-11T23:59:50.000Z', monotonicMs: 1_000 })
```

Execution should refine this helper until it typechecks in Playwright. The important behavior is:

- Install the clock before `page.goto`.
- Use a fresh browser context for the post-midnight daily when testing true new-day availability.
- Assert the new date key/puzzle availability through visible gameplay state and, where practical, local storage or remote claim state.

### Daily Multiplayer Claim Collision Avoidance

- Use unique authenticated users for each Daily E2E scenario.
- Use cleanup after each run.
- If testing repeated claim guard behavior, keep it inside one test with one user pair so the claim relationship is explicit.

---

## 9. Documentation Plan

Expand `planning/testing/TESTING-SUITE.md` into the canonical strategy document with these sections:

1. Purpose and scope.
2. Test layers:
   - Vitest domain/component.
   - Playwright E2E.
   - Manual/resource smoke for rare cases.
3. Commands:
   - Full suite.
   - Unit/domain only.
   - E2E only.
   - Practice/Daily/Multiplayer/Solo subsets.
   - Single-test examples.
4. Environment setup for E2E:
   - Required env vars.
   - Optional service-role cleanup.
   - Secret-handling rules.
5. Coverage/smoke matrix.
6. Adding a new E2E scenario.
7. Remote Supabase probe and cleanup rules.
8. Resource-safety rules.
9. Known gaps and future expansion.

### Required Coverage Matrix Shape

Use a table similar to:

| Area | Unit/Domain | Component | Real E2E | Command | Notes |
| --- | --- | --- | --- | --- | --- |
| Solo Practice OG | Yes | Yes | Smoke | `npm run test`, `npm run test:e2e:solo` | Gameplay sanity and Hard Mode reference |
| Solo Practice GO | Yes | Yes | Yes | `npm run test:e2e:solo` | GO transitions, carry-over, Hard Mode |
| Solo Daily OG | Yes | Smoke | Rotation | `npm run test:e2e:daily` | UTC/local behavior documented |
| Solo Daily GO | Yes | Smoke | Yes | `npm run test:e2e:daily` | Final-puzzle keyboard and rotation |
| Practice Multiplayer OG | Yes | Yes | Yes | `npm run test:e2e:practice` | Join, turn, forfeit, timeout |
| Practice Multiplayer GO | Yes | Yes | Yes | `npm run test:e2e:practice` | Two-client GO transition priority |
| Daily Multiplayer OG | Yes | Yes | Yes | `npm run test:e2e:daily` | Claim guard and completion |
| Daily Multiplayer GO | Yes | Yes | Yes | `npm run test:e2e:daily` | Claim guard, GO transitions, keyboard |

Fill the matrix with actual file names and known gaps after implementation.

---

## 10. Execution Tasks

### Task 0: Preflight And Governance

**Files:**
- Read: `CONSTITUTION.md`
- Read: `planning/specs/phase-24/PHASE-24-TESTING-SUITE-CREATION-SPEC-2026-06-11.md`
- Read: `planning/phase-24/TESTING-SUITE-IMPLEMENTATION-PLAN.md`
- Modify: `progress/PROGRESS.csv`
- Create: `progress/PROGRESS-STEP-146.md` if no newer progress row exists; otherwise create a progress report named with the next numeric `phase_id` after reading `progress/PROGRESS.csv`.
- Modify: `planning/phase-24/CHANGELOG.md`

- [ ] Confirm the worktree state with `git branch --show-current`, `git status --short`, and `git diff --name-status`.
- [ ] Confirm the next numeric `phase_id` from `progress/PROGRESS.csv`.
- [ ] Create the execution kickoff progress report with the test-suite scope, starting state, resource plan, and verification plan.
- [ ] Record that implementation is gameplay-testing only and does not authorize gameplay feature work.

### Task 1: Existing Test Inventory

**Files:**
- Read: `package.json`
- Read: `src/game/**/*.test.ts`
- Read: `src/daily/**/*.test.ts`
- Read: `src/multiplayer/**/*.test.ts`
- Read: `src/multiplayer/**/*.test.tsx`
- Modify: `planning/testing/TESTING-SUITE.md`

- [ ] Run `rg --files | rg '(^e2e/|\\.test\\.|\\.spec\\.|playwright|vitest|testing)' | sort`.
- [ ] Build an inventory of existing coverage by area: solo OG, solo GO, Daily, Practice, Multiplayer OG, Multiplayer GO, Hard Mode, keyboard, forfeit, timeout, claims, resume.
- [ ] Add the inventory summary to `planning/testing/TESTING-SUITE.md`.
- [ ] Identify exact gaps that future tasks will close.

### Task 2: Add Playwright E2E Foundation

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `playwright.config.ts`
- Create: `e2e/README.md`
- Create: `e2e/fixtures/env.ts`
- Create: `e2e/fixtures/assertions.ts`

- [ ] Install Playwright as a dev dependency with `npm install -D @playwright/test`.
- [ ] Install Chromium for local E2E with `npx playwright install chromium`.
- [ ] Add scripts described in Section 5.
- [ ] Create `playwright.config.ts` with:
  - Vite web server on one local port.
  - `reuseExistingServer: true`.
  - One worker by default.
  - Chromium project.
  - traces/screenshots/videos on failure.
  - bounded timeouts suitable for Supabase realtime flows.
- [ ] Create env validation that fails with clear messages when required E2E variables are missing.
- [ ] Run `npm run test`.
- [ ] Run `npx playwright test --list`.

### Task 3: Build Supabase Two-Client Fixtures

**Files:**
- Create: `e2e/fixtures/supabaseAdmin.ts`
- Create: `e2e/fixtures/testUsers.ts`
- Create: `e2e/fixtures/twoClientGame.ts`
- Create: `e2e/fixtures/cleanup.ts`
- Create: `e2e/fixtures/gameActions.ts`

- [ ] Implement unique run IDs and test-user naming.
- [ ] Implement user creation through Supabase Admin API when service-role credentials are available.
- [ ] Implement browser sign-in helper for each isolated context.
- [ ] Implement cleanup for users, multiplayer rows, moves, claims, and related rows available through the schema/RLS.
- [ ] Implement bounded polling helpers for realtime state.
- [ ] Verify the fixtures with one minimal two-client login smoke test.
- [ ] Run the minimal smoke with `npx playwright test e2e/gameplay/authenticated-two-client-smoke.spec.ts`.

### Task 4: Strengthen Fast Gameplay Regression Tests

**Files:**
- Modify: `src/game/tileStates.test.ts`
- Modify: `src/game/hardMode.test.ts`
- Modify: `src/game/go/session.test.ts`
- Modify: `src/daily/dailyCycle.test.ts`
- Modify: `src/multiplayer/multiplayer.test.ts`
- Modify: `src/multiplayer/dailyMultiplayer.test.ts`
- Modify: `src/multiplayer/MultiplayerGameSurface.test.tsx`

- [ ] Add missing keyboard precedence and duplicate-letter cases.
- [ ] Add missing GO carry-over/transition domain cases.
- [ ] Add midnight UTC Daily rotation cases.
- [ ] Add Daily claim guard and claim separation cases.
- [ ] Add forfeit, timeout, and result-precedence edge cases.
- [ ] Add display-projection component cases for multiplayer keyboard and carry-over evidence.
- [ ] Run focused tests after each file change.
- [ ] Run `npm run test` before moving to E2E expansion.

### Task 5: Practice Multiplayer E2E

**Files:**
- Create: `e2e/gameplay/practice-multiplayer-og.spec.ts`
- Create: `e2e/gameplay/practice-multiplayer-go.spec.ts`

- [ ] Cover Practice OG create/join, turn submission, normal completion, forfeit, and timeout.
- [ ] Cover Practice GO create/join, puzzle transitions, carry-over rows, keyboard state, solved-row hold, refresh/reconnect, and terminal results.
- [ ] Verify both host and rival UIs.
- [ ] Probe remote rows after key events.
- [ ] Cleanup temporary rows/users.
- [ ] Run `npm run test:e2e:practice`.

### Task 6: Daily Multiplayer E2E

**Files:**
- Create: `e2e/gameplay/daily-multiplayer-og.spec.ts`
- Create: `e2e/gameplay/daily-multiplayer-go.spec.ts`

- [ ] Cover Daily OG claim, create/join, turn submission, normal completion, and already-claimed guard.
- [ ] Cover Daily GO claim, transitions, keyboard state, terminal results, and claim separation from Daily OG.
- [ ] Verify Daily games remain five-letter, UTC-day keyed, no-clock, no-Hard-Mode-lobby-control, answer-separated, and claim-safe.
- [ ] Probe remote claims and game rows.
- [ ] Cleanup what can be safely cleaned; document any claim cleanup limitation.
- [ ] Run `npm run test:e2e:daily`.

### Task 7: Solo Daily Rotation And Solo GO E2E

**Files:**
- Create: `e2e/fixtures/dailyClock.ts`
- Create: `e2e/gameplay/daily-rotation.spec.ts`
- Create: `e2e/gameplay/solo-practice-go.spec.ts`
- Create: `e2e/gameplay/solo-daily-go.spec.ts`

- [ ] Implement deterministic pre-load browser clock helper.
- [ ] Cover Solo Daily OG/GO availability before and after midnight UTC.
- [ ] Cover Solo Daily GO solved-row transition and keyboard state.
- [ ] Cover Solo Practice GO Hard Mode, solved-row transition, carry-over rows, and definitions.
- [ ] Confirm tests use visible gameplay state rather than exact layout details.
- [ ] Run `npm run test:e2e:solo`.

### Task 8: Documentation Expansion

**Files:**
- Modify: `planning/testing/TESTING-SUITE.md`
- Modify: `planning/phase-24/CHANGELOG.md`
- Modify: the execution progress report created in Task 0.

- [ ] Replace the foundation-only testing doc with the canonical strategy.
- [ ] Add the coverage/smoke matrix with exact test files and commands.
- [ ] Add how to run full, subset, and individual tests.
- [ ] Add E2E environment setup and cleanup rules.
- [ ] Add known gaps and future expansion notes.
- [ ] Update the progress report with completed coverage and verification.

### Task 9: Full Verification And Stabilization

**Files:**
- Read/verify all changed files.
- Modify progress/changelog only if final verification discovers documentation gaps.

- [ ] Run `npm run lint`.
- [ ] Run `npm run test`.
- [ ] Run `npm run test:e2e`.
- [ ] Run `npm run test:full`.
- [ ] Run `npm run build`.
- [ ] Run `npx tsc -p tsconfig.api.json --noEmit` if `tsconfig.api.json` exists.
- [ ] Run `git diff --check`.
- [ ] Review `git status --short`.
- [ ] Confirm no secrets or credentials were committed.
- [ ] Confirm temporary Supabase users/rows/claims were cleaned up or documented.
- [ ] Record any known gaps in `planning/testing/TESTING-SUITE.md` and the progress report.

---

## 11. Risk Register And Mitigations

### Risk: Playwright Adds New Tooling Surface

Mitigation:

- Keep Playwright config small.
- Add scripts that do not disturb `npm run test`.
- Use one browser project first.
- Avoid broad CI assumptions unless separately authorized.

### Risk: Supabase E2E Flakiness

Mitigation:

- One worker by default.
- Unique users and rows per run.
- Bounded polling around realtime propagation.
- Remote probes for evidence.
- Cleanup in `afterEach` and `afterAll`.

### Risk: Email Confirmation Blocks Test Users

Mitigation:

- Prefer Supabase Admin API user creation with service-role credentials.
- If service-role credentials are unavailable and email confirmation blocks sign-in, stop and report the credential requirement instead of weakening tests.

### Risk: Daily Claims Collide Across Runs

Mitigation:

- Use unique users per Daily scenario.
- Clean up claims where authorized.
- Keep claim-guard tests explicit and self-contained.

### Risk: Browser Clock Mock Diverges From App Anti-Gaming Logic

Mitigation:

- Use domain tests for anti-gaming rules.
- Use fresh browser contexts for true post-midnight availability checks.
- Mock `Date.now`, `new Date()`, and `performance.now` before app load.

### Risk: Tests Overfit Phase 23 UI Before Phase 24 UI Work

Mitigation:

- Prefer roles, labels, and stable test IDs.
- Assert gameplay state, not visual card placement.
- Add minimal test IDs only where accessible labels cannot identify gameplay-critical elements.

### Risk: Suite Becomes Too Slow For Development

Mitigation:

- Keep Vitest as the fast default.
- Split E2E into clear subsets.
- Document single-test commands.
- Reserve `npm run test:full` for end-of-iteration gates.

---

## 12. Expected Initial Gaps After Implementation

The initial suite should be strong enough to protect gameplay correctness, but these areas can remain documented as future expansion:

- Full visual regression testing.
- Performance/load testing.
- Exhaustive testing across all Practice word lengths from 2 through 35.
- Exhaustive browser coverage beyond Chromium.
- Deep non-gameplay auth/account-settings/economy/stats display testing.
- CI scheduling and secret management for remote Supabase E2E, unless separately authorized.

These are intentionally not blockers for the initial gameplay-correctness suite.

---

## 13. Final Handoff Requirements For Future Execution

The future execution handoff must include:

- Summary of tests and documentation added.
- Exact test commands run and results.
- Confirmation that real two-client Supabase E2E ran with distinct authenticated clients.
- Confirmation that Daily rotation at midnight UTC is tested.
- Confirmation that `planning/testing/TESTING-SUITE.md` includes a coverage/smoke matrix.
- Known gaps and future recommendations.
- Resource and cleanup notes.
- Confirmation that no gameplay features, UI redesign, production deployment, or unrelated work was performed.

---

## 14. Key Decisions And Rationale

- **Keep Vitest as the fast default:** This preserves the existing developer workflow and keeps routine checks quick.
- **Add Playwright as a separate first-class layer:** Real browser/Supabase behavior is essential for multiplayer bugs, but it should be runnable independently to control cost and flake.
- **Build fixtures before scenarios:** A reliable two-client harness prevents each E2E spec from inventing its own auth, cleanup, polling, and assertion patterns.
- **Prioritize GO and Daily multiplayer first:** Those areas produced the most subtle Phase 23 bugs and are the highest-risk regression surfaces.
- **Use deterministic browser time for Daily rotation:** This tests midnight UTC behavior without depending on the local machine clock or waiting for a real day rollover.
- **Document gaps explicitly:** The first suite should be comprehensive for gameplay correctness without pretending to cover visual regression, load testing, or every non-gameplay surface.
