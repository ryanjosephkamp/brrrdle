# brrrdle Testing Suite Strategy

**Status**: Documentation foundation only. This file does not implement tests.
**Updated**: 2026-06-10

## Purpose

This document defines the intended testing philosophy for future work. It is not a runnable test suite and does not authorize rewriting existing tests or adding dependencies.

## Primary Focus: Gameplay Correctness

Core gameplay behavior is the highest-value test target:

- Wordle-style duplicate-letter accounting.
- Tile color correctness.
- Keyboard color precedence.
- Hard Mode validation.
- OG game completion.
- GO chain carry-over behavior.
- GO solved-row holds and terminal transitions.
- Solo Daily and Practice persistence/resume behavior.
- Multiplayer turn ownership, canonical per-player sessions, and result settlement.

## Multiplayer Verification

Any future claim about multiplayer behavior should use real two-client Supabase-backed browser E2E unless a future prompt explicitly scopes verification differently.

Multiplayer E2E should cover:

- Authenticated distinct users.
- Lobby creation and join.
- Turn submission.
- GO transition behavior where relevant.
- Forfeit and timeout behavior where relevant.
- Daily claim behavior where relevant.
- Remote Supabase probes and cleanup.

## Secondary Smoke Coverage

Smoke coverage should include:

- Calendar and Practice entry points.
- Authenticated and guest routing.
- Settings.
- Stats/history surfaces where relevant.
- Desktop, tablet-like, and narrow mobile viewports.
- Console/page-error checks.
- Horizontal overflow checks.

## UI Flexibility

Future Phase 24 work may intentionally change navigation and layout. Tests should avoid overfitting to Phase 23 visual structure.

Prefer:

- Stable roles and labels.
- Durable test IDs where appropriate.
- Behavior-focused assertions.
- Minimal reliance on exact card/grid layout unless the layout itself is in scope.

## Resource Safety

Heavy browser verification should use:

- One dev server unless there is a clear reason otherwise.
- Minimal browser contexts.
- Prompt cleanup of contexts, temporary users, rows, and artifacts.
- Final process/port checks for runaway dev-server or browser processes.

## Out Of Scope For Repository Reorganization

During repository reorganization, do not:

- Implement this suite.
- Rewrite existing tests.
- Add new test dependencies.
- Change `package.json` scripts.
- Run full app gates unless source/config files are touched or the user explicitly requests them.
