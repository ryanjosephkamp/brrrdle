# PHASE-23-STAGE-16-PRACTICE-MULTIPLAYER-GO-BUGFIXES-SPEC-2026-06-08.md

**Phase**: 23 — Multiplayer Foundations and Polish
**Stage**: 16 — Practice Multiplayer GO Bug Fixes
**Status**: Draft for planning pass
**Date**: 2026-06-08
**Binding Authority**: This document is the source of truth for Stage 16 scope, invariants, and verification requirements.

---

## 1. Overview / Goal

Stage 16 is a narrow, targeted bug-fix stage focused **exclusively** on two issues in **Practice Multiplayer GO**:

1. **Missing previous solutions in the GO chain stack**: Not all previously completed puzzles in a GO game are consistently shown/accumulated in the stack for every subsequent puzzle.
2. **Keyboard state not reflecting prior solutions**: Letters that are grayed out (or orange) on the board from previous solutions in the GO chain are not being correctly grayed out / colored on the on-screen keyboard for the current puzzle.

The goal is to fix both issues with minimal, surgical changes while preserving all prior Stage 12–15 behavior and invariants. No other game modes or variants should be modified.

---

## 2. Scope (Strictly Limited)

### In Scope
- Fix the missing previous solutions bug in **Practice Multiplayer GO** only.
- Fix the keyboard state (grayed-out and orange letters from prior solutions) bug in **Practice Multiplayer GO** only.
- Add or update focused regression tests for the above two issues.
- Perform real two-client Supabase-backed browser E2E testing for the fixes.
- Update all relevant governance and progress tracking surfaces.

### Explicitly Out of Scope
- Any changes to **Daily Multiplayer GO** (even if similar symptoms exist).
- Any changes to **Multiplayer OG** (user confirmed it is working correctly).
- Any changes to solo Practice GO or solo Daily GO.
- Any changes to the Practice seed system (the per-account randomization implemented in Stage 15 is working correctly and must remain untouched).
- Any broader GO chain, keyboard, or multiplayer architecture changes.
- Spectator features, notifications, floating manager, bots, exports, History/Theme tabs, scoring/rating changes, or any deferred Phase 23/24 work.
- PR creation, merge, release, or production deployment.

---

## 3. Key Requirements & Constraints (Invariants)

Stage 16 **must** preserve without regression:

- All Stage 12 wins (Hard Mode enforcement, keyboard responsiveness, sound, row-write reduction, stale-save protections, timed Practice behavior, scoring/result settlement).
- All Stage 13 wins (Practice solo one-shot resume, submitted-row animation stability, post-game results visibility, Multiplayer GO solved-row hold + coordinated advancement).
- All Stage 14 wins (hidden/inert Multiplayer foundations, Calendar/Practice as active entry points, nonparticipant guard, unified `async_multiplayer_games` path).
- All Stage 15 wins (GO transition visibility during solved-row hold, per-account authenticated Practice seeding).
- Daily Multiplayer remains strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- `playerSessions` remain canonical for per-viewer validation and mutation.
- Shared `serializedSession` remains compatibility/answer plumbing only.
- The Practice seed system must remain exactly as delivered in Stage 15.

Any change that risks the above is out of scope.

---

## 4. Deliverables

By the end of Stage 16, the following must exist:

1. Both reported bugs in Practice Multiplayer GO are verifiably fixed.
2. Focused regression tests covering:
   - Previous solutions visibility across the full GO chain in Practice Multiplayer.
   - Correct keyboard gray/orange state reflecting all prior solutions in the current GO game.
3. Real two-client Supabase-backed browser E2E evidence for the fixes.
4. Full automated verification gate (`lint`, `test`, `build`, API typecheck, `git diff --check`).
5. Responsive browser smoke (desktop, tablet-like, 390px) with no new issues.
6. Updated governance surfaces:
   - `AGENT-IMPLEMENTATION-PLAN.md` (new subsection under §28)
   - `CHANGELOG.md`
   - `agents.md` and `memory.md`
   - `progress/PROGRESS.csv` and a new `progress/PROGRESS-STEP-123.md`

---

## 5. Success Criteria / Verification

Stage 16 is complete only when **all** of the following are true:

- Both bugs are reproduced with clear evidence before any source changes.
- Both bugs are verifiably fixed and no longer reproducible in Practice Multiplayer GO.
- Focused changed-area tests pass.
- Full test suite passes with no regressions.
- `npm run lint`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` all pass cleanly.
- Desktop, tablet-like, and 390px mobile browser smoke shows no new console errors or horizontal overflow.
- Real two-client Supabase-backed browser E2E confirms the fixes work correctly in actual multiplayer gameplay.
- All Stage 12–15 invariants and the Stage 15 Practice seed behavior remain intact.
- No changes were made outside of Practice Multiplayer GO.

---

## 6. Recommended Approach & Workflow Discipline

Stage 16 must follow the established small-change-then-verify discipline:

1. **Reproduce first** — Clearly document reproduction of both bugs in Practice Multiplayer GO before writing any fixes.
2. **One logical change at a time** — Make the smallest targeted edit, then run focused verification before moving to the next item.
3. **Prioritize Bug 1 (missing previous solutions)** first, then Bug 2 (keyboard state).
4. **Use real multiplayer testing** — Two distinct authenticated browser contexts + remote Supabase probes where relevant.
5. **Resource caution** — One dev server, minimal browser contexts, sequential heavy gates, and periodic memory/process checks.
6. **Halt for review** after each major checkpoint if needed.

---

## 7. Risks & Considerations

- **GO chain state management risk**: The accumulated previous solutions and keyboard state across puzzles in a GO game likely live in `playerSessions`, `game.moves`, or related projection logic. Changes must be minimal and must not break the existing solved-row hold or coordinated advancement behavior from Stage 13.
- **Keyboard state synchronization risk**: The keyboard must correctly reflect the union of all prior solutions’ letter states (green/gray/orange) for the current puzzle. Avoid broad keyboard refactoring.
- **Regression risk**: These bugs touch recently stabilized areas. Strong regression checks against Stage 12–15 behavior are mandatory.
- **Scope risk**: The user has been very clear — only Practice Multiplayer GO may be touched. Any drift into Daily Multiplayer GO, solo modes, or other systems is not allowed.

---

## 8. Workflow Notes

- This stage follows the standard two-prompt pattern:
  - **Prompt 1 (Planning)**: Governance-only update to planning surfaces. No source edits.
  - **Prompt 2 (Execution)**: Full implementation of the two bug fixes with the discipline described above.
- Stage 16 does **not** authorize PR creation, merge, release, or any later-phase work.
- After successful final verification, the user must explicitly authorize any subsequent steps (including potentially marking Phase 23 complete and moving to Phase 24).

---

**End of Specification**