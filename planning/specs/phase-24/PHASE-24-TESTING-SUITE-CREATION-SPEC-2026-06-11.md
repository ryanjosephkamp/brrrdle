# PHASE-24-TESTING-SUITE-CREATION-SPEC-2026-06-11.md

**Project**: brrrdle
**Phase**: Phase 24 (Post-Phase 23 Stabilization)
**Date**: 2026-06-11
**Version**: 1.2 (Updated draft)
**Status**: Draft — pending final alignment

---

## 1. Purpose

Create a comprehensive, maintainable debugging and testing suite focused exclusively on **gameplay correctness**. This suite will serve as the primary regression safety net for the game going forward, with particular strength in the areas that historically produced the most subtle and high-impact bugs.

The suite is designed to be used in two ways:
- As a **full comprehensive suite** that Codex runs toward the end of significant work (or in the middle + end for very long iterations).
- As a **modular resource** from which Codex can draw individual tests or subsets during active implementation when needed.

---

## 2. Scope (Strict)

**In Scope**:
- Gameplay correctness for both **solo** and **multiplayer** modes.
- OG (single puzzle) and GO (5-puzzle chain) behavior.
- **Practice and Daily** variants, including Daily claim/guard behavior.
- **Daily puzzle rotation** — verification that a new daily puzzle becomes available after the UTC day rolls over (midnight UTC).
- Hard Mode enforcement and interaction with other systems.
- GO-specific mechanics: puzzle transitions, carry-over rows, solved-row hold behavior, definitions display after completion.
- Forfeit, timeout, and precedence logic in multiplayer.
- Timing/clock behavior in timed multiplayer games.
- Keyboard state, coloring, and duplicate-letter logic consistency across solo and multiplayer.
- Critical user flows: creating games/lobbies, joining, submitting guesses, viewing results, resuming games, refresh/reconnect behavior, and Daily claim interactions.

**Primary Emphasis**:
- Real two-client Supabase-backed browser E2E testing. This should be a prominent and well-exercised part of the suite.

---

## 3. Out of Scope

- Testing of the `planning/` directory structure, governance files, specs, or repository organization.
- Testing of non-gameplay systems (auth flows beyond what is required to reach gameplay, settings persistence unrelated to gameplay state, Word Explorer, Feedback tab, economy/stats displays, etc.).
- UI/visual regression testing (beyond what is necessary to verify gameplay state).
- Performance or load testing.
- Implementation of new gameplay features.
- Deletion or major refactoring of existing low-value tests (this can be addressed in a future step or phase).

---

## 4. Deliverables

Codex must produce:

1. **Documentation**
   - An updated and significantly expanded `planning/testing/TESTING-SUITE.md` that serves as the canonical testing strategy document.
   - This document must include a clear **coverage / smoke matrix** (table or structured list) showing which critical flows have E2E coverage.
   - The document should explain how the suite can be run in full or as subsets/individual tests.

2. **Actual Tests**
   - New and expanded test files that implement the strategy.
   - Tests should primarily **build upon and extend** the existing test suite rather than replace it.
   - Strong coverage via **real two-client Supabase E2E tests**, especially for multiplayer flows and Daily variants.
   - Codex may create temporary test accounts or use other reasonable methods (including temporarily managing daily limits) to properly test Daily variants and daily rotation behavior.

---

## 5. Key Requirements

### 5.1 Two-Client Supabase E2E Prominence
Real two-client browser E2E testing (using Playwright + Supabase) must be a first-class citizen. Many subtle multiplayer bugs only surface under real concurrent client conditions.

### 5.2 Priority Areas
Codex must treat the following as high-priority areas:
- GO puzzle transitions and state carry-over between puzzles.
- Keyboard state and coloring consistency between players (especially after GO transitions).
- Hard Mode enforcement in both solo and multiplayer contexts.
- Forfeit/precedence logic and status text synchronization.
- Daily Multiplayer claim/guard behavior and Daily solo flows.
- **Daily puzzle rotation at midnight UTC** — verification that a new daily becomes available after the UTC day rolls over.
- Timing/clock accuracy and timeout handling.
- Refresh/reconnect behavior while games are in progress.

### 5.3 Maintainability & Existing Tests
- Tests should be written with long-term maintainability in mind.
- Codex should **utilize and build upon** the existing test suite rather than deleting or significantly refactoring current tests.
- Prefer stable selectors (roles, labels, test IDs) over brittle DOM paths.
- Codex has flexibility on test file locations (it may colocate tests with source code or create a dedicated `e2e/` folder), but it must keep the overall test structure clean and easy to navigate for future agents.

### 5.4 Modularity
The suite should be designed so that Codex (or future agents) can easily run:
- The full suite,
- Logical subsets of tests, or
- Individual tests when needed during implementation.

This allows efficient use during active development without requiring a full suite run after every change.

### 5.5 Documentation Quality
`planning/testing/TESTING-SUITE.md` should be genuinely useful. It should clearly explain testing philosophy, how to run different layers of the suite (full vs subset vs single test), how to add new E2E scenarios, and known gaps.

---

## 6. Success Criteria / Definition of Done

Codex should consider the initial version of the suite complete when:

- `planning/testing/TESTING-SUITE.md` exists, is well-written, and includes a coverage/smoke matrix.
- All critical gameplay paths (with special attention to the priority areas above, including Daily puzzle rotation) have meaningful test coverage.
- There is a solid body of passing **real two-client Supabase E2E tests** for both Practice and Daily multiplayer flows, plus Daily solo rotation behavior.
- The suite supports running full, subset, and individual tests.
- All new and modified tests pass cleanly (`npm run test`).
- Codex has documented any significant remaining gaps and proposed a reasonable path to address them in future iterations.

If Codex runs the full suite and tests fail, it should make the best changes and re-run the full suite, repeating until all tests pass.

Codex is encouraged to add additional high-value tests beyond the minimum where it identifies important gaps.

---

## 7. Execution Guidance for Codex

When authorized, Codex should:

1. Review the current state of existing tests (especially under `src/multiplayer/` and related game logic).
2. Review and significantly expand `planning/testing/TESTING-SUITE.md`, including coverage matrix and modularity guidance.
3. Prioritize implementation of real two-client Supabase E2E tests for the historically problematic areas, including Daily puzzle rotation.
4. Build upon, rather than replace, the existing test foundation.
5. Ensure the suite supports both full runs (at the end of major work) and selective/subset runs during implementation.
6. Keep the suite focused strictly on gameplay correctness.
7. Update progress tracking appropriately throughout the work.

---

## 8. Verification Requirements

Before handing off, Codex must:
- Run the full test suite and confirm all tests pass.
- Verify that new E2E tests actually exercise real multiplayer scenarios with two separate authenticated clients.
- Confirm that Daily puzzle rotation at midnight UTC is properly tested.
- Confirm that `planning/testing/TESTING-SUITE.md` accurately describes the implemented suite, includes a coverage matrix, and explains how to run subsets/individual tests.
- Document any known gaps or areas left for future expansion.

---

## 9. Notes

This spec is intentionally narrow and focused on gameplay correctness. The full comprehensive suite is intended to be run toward the end of significant work (or middle + end for very long iterations), while individual tests or subsets can be used during active implementation for efficiency.
