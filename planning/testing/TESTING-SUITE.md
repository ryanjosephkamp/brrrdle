# brrrdle Gameplay Testing Suite

**Status**: Canonical Phase 24 testing strategy.
**Updated**: 2026-06-11
**Primary focus**: Gameplay correctness for solo and multiplayer brrrdle.

## Purpose

This suite is the regression safety net for gameplay behavior. It has two
layers:

- A fast Vitest layer for deterministic domain and component regressions.
- A Playwright E2E layer for browser gameplay, including real two-client
  Supabase-backed multiplayer flows.

The suite is intentionally modular. During implementation, run focused files or
tagged E2E subsets. Before handoff on major work, run the full gate.

## Test Layers

### Fast Vitest Layer

Command:

```bash
npm run test
npm run test:unit
```

Primary coverage:

- OG and GO session mechanics.
- Duplicate-letter tile states and keyboard precedence.
- Hard Mode validation.
- Daily cycle, anti-gaming, and Daily Multiplayer UTC rollover.
- Multiplayer reducer rules for create, join, turns, claims, forfeit, timeout,
  GO transitions, and result settlement.
- Multiplayer component projection for shared rows, prior GO solutions, and
  keyboard evidence.

### Playwright E2E Layer

Commands:

```bash
npm run test:e2e
npm run test:e2e:practice
npm run test:e2e:daily
npm run test:e2e:multiplayer
npm run test:e2e:solo
```

Single-test example:

```bash
npx playwright test e2e/gameplay/practice-multiplayer-go.spec.ts -g "solved GO transition"
```

The E2E layer starts one Vite dev server and uses one worker by default. Real
multiplayer tests create two distinct temporary Supabase users, sign them in
through the UI in isolated browser contexts, drive real gameplay, probe remote
rows, and clean up temporary users/rows.

### Full Suite

```bash
npm run test:full
```

`test:full` runs the fast Vitest layer followed by all Playwright E2E tests.

## E2E Environment

Required:

- `VITE_SUPABASE_URL` or `E2E_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` or `E2E_SUPABASE_ANON_KEY`

Required for the committed real two-client tests:

- `SUPABASE_SERVICE_ROLE_KEY` or `E2E_SUPABASE_SERVICE_ROLE_KEY`

The service-role key is used only from Node-side Playwright fixtures to create
and delete temporary auth users and to probe/clean test multiplayer rows. Never
print, commit, or paste secret values. The suite records only whether variables
are present.

## Coverage Matrix

| Area | Unit/Domain | Component | Real E2E | Command | Notes |
| --- | --- | --- | --- | --- | --- |
| Solo Practice OG | Yes | Yes | Indirect smoke | `npm run test`, `npm run test:e2e:solo` | Existing Vitest coverage remains primary for OG solo rules. |
| Solo Practice GO | Yes | Yes | Yes | `npm run test:e2e:solo` | `solo-practice-go.spec.ts` solves puzzle 1 and verifies carry-over into puzzle 2. |
| Solo Daily OG | Yes | Smoke | Limited | `npm run test`, `npm run test:e2e:daily` | Daily cycle and calendar coverage are mostly fast tests; no dedicated OG browser solve yet. |
| Solo Daily GO | Yes | Yes | Yes | `npm run test:e2e:solo`, `npm run test:e2e:daily` | `solo-daily-go.spec.ts` solves puzzle 1 under deterministic browser time. |
| Daily rotation | Yes | N/A | Yes | `npm run test:e2e:daily` | `daily-rotation.spec.ts` verifies Daily Multiplayer date rollover across UTC midnight. Solo Daily remains local-midnight by current product design. |
| Practice Multiplayer OG | Yes | Yes | Yes | `npm run test:e2e:practice`, `npm run test:e2e:multiplayer` | Create/join, normal completion, post-guess forfeit loss, and timeout loser precedence. |
| Practice Multiplayer GO | Yes | Yes | Yes | `npm run test:e2e:practice`, `npm run test:e2e:multiplayer` | Real two-client solved transition, prior solution visibility, keyboard evidence, and reload persistence. |
| Daily Multiplayer OG | Yes | Yes | Yes | `npm run test:e2e:daily`, `npm run test:e2e:multiplayer` | Create/join, completion, five-letter/no-clock/no-Hard-Mode checks, and claim guard. |
| Daily Multiplayer GO | Yes | Yes | Yes | `npm run test:e2e:daily`, `npm run test:e2e:multiplayer` | Real two-client solved transition, prior answer visibility, keyboard evidence, and Daily invariant checks. |
| Authenticated two-client harness | N/A | N/A | Yes | `npm run test:e2e:multiplayer` | `authenticated-two-client-smoke.spec.ts` validates temp-user creation, UI sign-in, isolated contexts, and cleanup. |

## Current E2E Files

- `e2e/gameplay/authenticated-two-client-smoke.spec.ts`
- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `e2e/gameplay/practice-multiplayer-go.spec.ts`
- `e2e/gameplay/daily-multiplayer-og.spec.ts`
- `e2e/gameplay/daily-multiplayer-go.spec.ts`
- `e2e/gameplay/solo-practice-go.spec.ts`
- `e2e/gameplay/solo-daily-go.spec.ts`
- `e2e/gameplay/daily-rotation.spec.ts`

Shared fixtures live under `e2e/fixtures/`.

## Adding E2E Scenarios

Prefer this pattern:

1. Use existing user/context helpers from `e2e/fixtures/twoClientGame.ts`.
2. Drive the app through visible UI controls where practical.
3. Use remote Supabase probes from `e2e/fixtures/supabaseAdmin.ts` for durable
   evidence and cleanup, not as a replacement for UI assertions.
4. Use bounded waits and app-observed state instead of fixed sleeps.
5. Tag tests with `@practice`, `@daily`, `@multiplayer`, and/or `@solo`.
6. Keep each scenario short enough that cleanup boundaries stay obvious.

Use durable selectors only when roles/labels cannot target a state surface
reliably. Current source test hooks are neutral `data-testid`/`data-*` attributes
around multiplayer panels and selected games; they do not change gameplay.

## Supabase Cleanup Rules

The E2E fixtures:

- Generate unique temporary emails per run.
- Create confirmed auth users through the Supabase Admin API.
- Delete multiplayer rows associated with temporary users.
- Delete temporary users after browser contexts close.

If cleanup credentials are missing or a cleanup call fails, stop and report the
limitation. Do not leave durable test users or rows unmentioned.

## Resource Safety

- One Vite dev server.
- One Playwright worker by default.
- Minimal browser contexts.
- Prompt context cleanup in `finally` blocks.
- No unbounded polling or huge logs.
- Do not commit `test-results/`, `playwright-report/`, `.env*`, screenshots,
  videos, traces, or session artifacts.

## Known Gaps

- The E2E suite intentionally avoids visual regression testing so Phase 24 UI
  work can evolve without brittle screenshot churn.
- Solo Daily currently follows the product's local-midnight variant; Daily
  Multiplayer is the UTC-midnight variant covered by browser and fast tests.
- Solo Practice OG has strong fast coverage but no dedicated standalone browser
  solve spec yet.
- Browser E2E timeout coverage uses a controlled temporary-row clock setup to
  avoid a 30-second wall-clock wait while still settling through the app's
  existing timeout path.
