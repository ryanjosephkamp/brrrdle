# Progress Step 146 — Phase 24 Gameplay-Correctness Testing Suite

**Date**: 2026-06-11
**Phase**: Phase 24 — Gameplay Correctness Testing Suite
**Status**: Completed — Ready For Pull Request Review
**Branch**: `codex/phase-24-testing-suite`

## Authorization

The user explicitly authorized execution of the Phase 24 gameplay-correctness testing-suite work from:

- `planning/specs/phase-24/PHASE-24-TESTING-SUITE-CREATION-SPEC-2026-06-11.md`
- `planning/phase-24/TESTING-SUITE-IMPLEMENTATION-PLAN.md`

PR creation was authorized after successful verification. PR merge, release, production deployment, gameplay feature work, Supabase schema migration, broad refactoring, and out-of-scope changes remain gated.

## Protected Starting State

- Starting branch: `main`
- Working branch created: `codex/phase-24-testing-suite`
- Initial working tree contained the two untracked Phase 24 planning/spec files:
  - `planning/specs/phase-24/PHASE-24-TESTING-SUITE-CREATION-SPEC-2026-06-11.md`
  - `planning/phase-24/TESTING-SUITE-IMPLEMENTATION-PLAN.md`
- No reset, rebase, pull-over, discard, force-push, branch deletion, PR merge, release, or production deployment was performed.

## Baseline Resource Snapshot

Captured before dev-server or browser testing.

- No listeners were found on ports `5173`, `5174`, `3000`, or `4173`.
- Pre-existing processes included Codex, Chrome, VS Code, Obsidian, Finder, and unrelated Python processes.
- Memory was already under pressure before Phase 24 browser work: `top` reported about `17G used`, about `111M unused`, and a large compressor footprint.
- Resource plan used one Vite server through Playwright, one Playwright worker by default for remote Supabase safety, minimal browser contexts, cleanup in `finally` blocks, and final process/port checks.

## Implementation Summary

- Added Playwright as the browser E2E runner and installed Chromium.
- Added `playwright.config.ts` with one worker by default, one Vite web server, bounded timeouts, and retained failure artifacts only.
- Added modular E2E npm scripts:
  - `npm run test:e2e`
  - `npm run test:e2e:practice`
  - `npm run test:e2e:daily`
  - `npm run test:e2e:multiplayer`
  - `npm run test:e2e:solo`
  - `npm run test:full`
- Preserved `npm run test` as the fast Vitest layer and added `npm run test:unit`.
- Added E2E fixtures for:
  - local environment loading without printing secrets
  - Supabase admin/client setup
  - temporary user creation and deletion
  - two isolated authenticated browser contexts
  - remote multiplayer row probes and cleanup
  - deterministic browser time for Daily rollover checks
  - gameplay actions and assertions
- Added gameplay E2E coverage for:
  - authenticated two-client sign-in smoke
  - Practice Multiplayer OG create/join/complete
  - Practice Multiplayer OG post-guess forfeit loser precedence
  - Practice Multiplayer OG timeout loser precedence
  - Practice Multiplayer GO solved transition, prior row visibility, keyboard evidence, and reload persistence
  - Daily Multiplayer OG create/join/complete and claim guard
  - Daily Multiplayer GO solved transition, prior row visibility, keyboard evidence, and Daily invariants
  - Solo Practice GO first-puzzle solve and carry-over
  - Solo Daily GO first-puzzle solve under deterministic browser time
  - Daily Multiplayer UTC-midnight date rollover
- Added a fast Daily cycle regression proving a natural UTC rollover grants a new Daily Multiplayer opportunity.
- Added neutral multiplayer `data-testid`/`data-*` hooks for stable E2E targeting; these do not change gameplay behavior.
- Expanded `planning/testing/TESTING-SUITE.md` into the canonical testing strategy with layers, commands, environment rules, two-client E2E strategy, cleanup rules, resource safety, coverage matrix, and known gaps.
- Added `e2e/README.md` with focused E2E usage notes.
- Updated `.gitignore` for Playwright artifacts.
- Updated `planning/phase-24/CHANGELOG.md` and this progress ledger.

## Verification Results

Focused and modular verification:

- `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts` — passed, 3/3.
- `npm run test:e2e:practice` — passed, 5/5.
- `npm run test:e2e:daily` — passed, 4/4.
- `npm run test:e2e:multiplayer` — passed, 7/7.
- `npm run test:e2e:solo` — passed, 3/3.

Full gate:

- `npm run lint` — clean.
- `npm run test` — passed, 500/500 across 73 Vitest files.
- `npm run test:e2e` — passed, 10/10 Playwright tests.
- `npm run test:full` — passed, 500 Vitest tests + 10 Playwright E2E tests.
- `npm run build` — succeeded; existing large-chunk advisory remains.
- `npx tsc -p tsconfig.api.json --noEmit` — clean.
- `git diff --check` — clean.

Security/artifact review:

- Secret scan found only variable names, documentation placeholders, ordinary auth test strings, and deterministic temporary E2E user password construction. No real credentials, tokens, local session state, screenshots, traces, videos, or env files are intended for commit.
- Ignored `test-results/` and `playwright-report/` artifacts were removed before handoff.
- `.env.local` remains ignored and uncommitted.

## Real Two-Client Supabase E2E Evidence

The Playwright suite created two distinct temporary authenticated users per multiplayer scenario, signed them into isolated browser contexts through the UI, drove real gameplay, probed `async_multiplayer_games` through server-side fixtures, and deleted temporary users/rows in cleanup.

Covered real two-client flows:

- Practice Multiplayer OG: create, join, submit, normal completion.
- Practice Multiplayer OG: post-guess forfeit makes the forfeiting player lose.
- Practice Multiplayer OG: timeout loser precedence remains intact.
- Practice Multiplayer GO: solved transition stays synchronized with prior rows, keyboard evidence, and reload persistence.
- Daily Multiplayer OG: create, join, complete, Daily claim guard, five-letter/no-clock/no-Hard-Mode invariant checks.
- Daily Multiplayer GO: solved transition stays synchronized with prior rows, keyboard evidence, and Daily invariant checks.

## Daily Rotation Evidence

- `src/daily/dailyCycle.test.ts` now includes a fast regression proving Daily Multiplayer availability after a natural UTC date rollover.
- `e2e/gameplay/daily-rotation.spec.ts` uses deterministic browser time to verify that Daily Multiplayer exposes a new date after midnight UTC.

## Cleanup And Resource Safety

- Temporary Supabase users and multiplayer rows were cleaned up by E2E fixtures.
- No cleanup limitations were observed.
- Final resource snapshot still showed pre-existing macOS/Codex/Chrome/VS Code/Obsidian memory pressure, but no Stage 24-owned runaway process.
- Final port checks found no listeners on `5173`, `5174`, `3000`, or `4173`.

## Known Gaps

- The E2E suite intentionally avoids visual regression testing so Phase 24 UI work can evolve without brittle screenshots.
- Solo Practice OG has strong fast coverage but no dedicated standalone browser solve E2E yet.
- Daily Multiplayer is the UTC-midnight browser rotation target; Solo Daily GO remains covered by deterministic browser solve plus fast Daily cycle tests.
- Service-role credentials are required for the committed real two-client cleanup/probe tests. If unavailable in a future environment, the suite fails clearly instead of silently downgrading coverage.

## Scope Confirmation

No gameplay feature, gameplay behavior change, Supabase schema migration, production deployment, release, PR merge, broad refactor, UI redesign, or Phase 24 product implementation work was performed. Source changes were limited to testing infrastructure support and neutral E2E selectors.
