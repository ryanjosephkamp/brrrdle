# PHASE-23-STAGE-17-SOLO-PRACTICE-GO-CUSTOMIZE-LOCK-BUGFIX-SPEC-2026-06-08.md

**Phase**: 23 — Multiplayer Foundations and Polish
**Stage**: 17 — Solo Practice GO Customize Lock Bug Fix
**Status**: Draft for planning pass
**Date**: 2026-06-08
**Binding Authority**: This document is the source of truth for Stage 17 scope, invariants, and verification requirements.

---

## 1. Overview / Goal

Stage 17 is a single-bug, narrowly scoped fix for **Solo Practice GO** mode only.

**The Bug**:
In the Solo Practice GO "Customize" box, the message
> "Difficulty and chain length are locked because this puzzle has started. Start a new puzzle to change them."

appears even for **brand new GO chains** in which the player has not yet submitted any guess. The customization options (Difficulty and chain length) should remain available until the player submits the **first guess** in the current GO chain.

**Correct Behavior** (already working correctly in Solo Practice OG):
The "Puzzle options" section should only become locked **after the player has submitted at least one guess** in the current GO chain. Freshly created GO chains (with zero submitted guesses) must allow the player to change Difficulty and chain length.

The goal of Stage 17 is to make Solo Practice GO follow the same locking rule that Solo Practice OG already uses, using the smallest possible targeted change.

---

## 2. Scope (Strictly Limited)

### In Scope
- Fix the incorrect early locking of the "Customize" box in **Solo Practice GO** mode only.
- Study the existing correct implementation in Solo Practice OG and apply an equivalent or very similar locking condition to Solo Practice GO.
- Add or update focused regression tests for the corrected behavior.
- Perform verification that the fix works for both new GO chains and in-progress GO chains.
- Update all relevant governance and progress tracking surfaces.

### Explicitly Out of Scope
- Any changes to **Solo Practice OG** (it already works correctly).
- Any changes to Daily GO (solo or multiplayer).
- Any changes to Multiplayer GO (Practice or Daily).
- Any changes to the "Customize" box UI layout, styling, or copy outside of the locking logic.
- Any changes to Hard Mode behavior, resume behavior, scoring, or GO chain advancement logic.
- Any broader refactoring of the Practice GO or Customize components.
- PR creation, merge, release, or production deployment.

---

## 3. Key Requirements & Constraints (Invariants)

Stage 17 **must** preserve without regression:

- All Stage 12–16 wins and invariants.
- The existing correct locking behavior in Solo Practice OG.
- The ability to change Difficulty and chain length on a freshly created GO chain before any guess is submitted.
- The correct locking behavior once the first guess has been submitted in a GO chain.
- All existing GO chain creation, resume, and "New go chain" flows.
- All Stage 15 authenticated Practice seed behavior.

Any change that risks the above is out of scope.

---

## 4. Deliverables

By the end of Stage 17, the following must exist:

1. The incorrect early locking of the Customize box in Solo Practice GO is verifiably fixed.
2. Focused regression tests covering the locking behavior for both new GO chains and chains that have received at least one guess.
3. Full automated verification gate (`lint`, `test`, `build`, API typecheck, `git diff --check`).
4. Responsive browser smoke (desktop, tablet-like, 390px) with no new issues.
5. Updated governance surfaces:
   - `AGENT-IMPLEMENTATION-PLAN.md` (new subsection under §28)
   - `CHANGELOG.md`
   - `agents.md` and `memory.md`
   - `progress/PROGRESS.csv` and a new `progress/PROGRESS-STEP-131.md`

---

## 5. Success Criteria / Verification

Stage 17 is complete only when **all** of the following are true:

- The bug is reproduced with clear evidence before any source changes.
- The bug is verifiably fixed: freshly created Solo Practice GO chains allow Difficulty and chain length changes; chains with at least one submitted guess correctly show the locked message.
- Focused changed-area tests pass.
- Full test suite passes with no regressions.
- `npm run lint`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` all pass cleanly.
- Desktop, tablet-like, and 390px mobile browser smoke shows no new console errors or horizontal overflow.
- Solo Practice OG behavior remains completely unchanged and continues to work correctly.
- No changes were made outside of the Solo Practice GO Customize locking logic.

---

## 6. Recommended Approach & Workflow Discipline

Stage 17 must follow the established small-change-then-verify discipline:

1. **Reproduce first** — Clearly document reproduction of the bug in Solo Practice GO (new chain shows locked message before any guess is submitted).
2. **Study the OG implementation** — Examine how Solo Practice OG correctly determines when to lock the Customize options.
3. **Make the smallest targeted change** in Solo Practice GO to match the OG locking condition.
4. **Verify immediately** after the change with focused tests and browser checks.
5. **Run the full verification gate** at the end.

---

## 7. Risks & Considerations

- **Risk of over-locking or under-locking**: The fix must only change the condition under which the "locked" message appears. It must not alter when a new GO chain is created or how guesses are submitted.
- **Regression risk**: Even though the change is small, full regression testing against existing GO flows (new chain, resume, "New go chain", Hard Mode) is required.
- **Scope risk**: The user has been very clear — only the locking condition in Solo Practice GO may be touched. Any drift into OG, Daily, or Multiplayer code is not allowed.

---

## 8. Workflow Notes

- This stage follows the standard two-prompt pattern:
  - **Prompt 1 (Planning)**: Governance-only update to planning surfaces. No source edits.
  - **Prompt 2 (Execution)**: Full implementation of the single bug fix with the discipline described above.
- Stage 17 does **not** authorize PR creation, merge, release, or any later-phase work.
- After successful final verification, the user must explicitly authorize any subsequent steps (including potentially marking Phase 23 complete).

---

**End of Specification**