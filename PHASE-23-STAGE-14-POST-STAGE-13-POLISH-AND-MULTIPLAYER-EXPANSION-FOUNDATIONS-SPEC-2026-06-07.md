# PHASE-23-STAGE-14-POST-STAGE-13-POLISH-AND-MULTIPLAYER-EXPANSION-FOUNDATIONS-SPEC-2026-06-07.md

**Stage**: 14 — Post-Stage-13 Polish, Bug Fixes, and Multiplayer Tab Foundations  
**Phase**: 23 — Multiplayer Foundations and Polish  
**Status**: Planning / Governance  
**Date**: 2026-06-07  
**Authority**: This spec is the binding source of truth for Stage 14. All work must stay strictly inside the scoped items below.

---

## 1. Overview / Goal

Stage 13 successfully resolved the three critical regressions introduced during Stage 12 (Practice solo animation remounts, missing post-game results, and Multiplayer GO solved-puzzle propagation).

Stage 14 is a targeted **polish + stabilization + foundations** stage. It exists to:
- Address any remaining small bugs or UX friction discovered after Stage 13.
- Lay clean, minimal foundations for the long-requested **dedicated Multiplayer tab** (without implementing the full tab yet).
- Improve spectator foundations and related UX where low-risk.
- Continue the strict “small changes + rigorous verification after every logical step” discipline established in recent stages.

The goal is to leave the game in a visibly more polished, stable state while creating safe architectural groundwork for future Multiplayer tab and spectator expansion work.

---

## 2. Scope (In)

### Bug Fixes & Polish (High Priority)
- Any small post-Stage-13 regressions or UX friction discovered during final review (to be documented by the user before execution begins).
- Minor keyboard / focus / animation polish in solo and multiplayer surfaces where friction remains.
- Ensure Practice solo and Multiplayer surfaces remain consistent after the Stage 13 resume and GO propagation fixes.

### Multiplayer Tab Foundations (Planning + Minimal Scaffolding Only)
- Design and document the intended structure for a future dedicated **Multiplayer** navigation tab (separate from Calendar and Practice entry points).
- Create minimal, non-breaking scaffolding (types, route placeholder, basic panel shell) that does **not** replace existing Calendar/Practice multiplayer entry points.
- Ensure all existing multiplayer flows (Practice Multiplayer, Daily Multiplayer) continue to work unchanged.

### Spectator Foundations Hardening (Low-Risk)
- Review and lightly harden existing Live spectator read-only behavior and RLS.
- Ensure spectators cannot accidentally mutate game state or affect ratings.

### Verification & Documentation
- Full regression verification of Stage 12 + Stage 13 wins.
- Updated coordination notes in `agents.md` and `memory.md`.

---

## 3. Out of Scope / Explicitly Deferred

- Full implementation of the dedicated Multiplayer tab UI and navigation change (this stage only creates safe foundations and documentation).
- Any expansion of spectator permissions or new spectator features beyond hardening existing foundations.
- New gameplay features (bots, exports/GIFs, notifications, floating manager, etc.).
- Scoring/rating/ELO changes.
- Broad refactoring or redesign.
- PR creation, merge to `main`, or release work.

---

## 4. Key Requirements & Constraints

### Small Changes + Rigorous Verification (Mandatory)
Codex **must** continue the established discipline:
- Make one focused, small logical change (or a very small related group) at a time.
- Run focused verification immediately after each change.
- Only proceed after verification passes cleanly.
- Do not batch many unrelated changes and verify only at the end.

### Preserve All Previous Wins
Stage 14 must not regress:
- Stage 12 Hard Mode enforcement, keyboard responsiveness, sound effects.
- Stage 13 Practice solo animation and results fixes.
- Multiplayer GO solved-row propagation and hold behavior.
- Daily Multiplayer invariants (strictly asynchronous, 5 letters, UTC-day keyed, no-clock, no-Hard-Mode-control).
- Daily Solo behavior.

### Real Two-Client Supabase E2E Where Relevant
Any change that touches multiplayer behavior must include real two-client authenticated browser verification against Supabase.

---

## 5. Deliverables

By the end of Stage 14 the following must exist:

- All approved bug fixes and polish items completed and verified.
- Clean, minimal scaffolding + documentation for a future dedicated Multiplayer tab (types, route placeholder, basic shell — non-breaking).
- Spectator foundations lightly reviewed/hardened with focused tests.
- Updated `CHANGELOG.md`, `AGENT-IMPLEMENTATION-PLAN.md` §28, `agents.md`, `memory.md`, and a new `progress/PROGRESS-STEP-118.md`.
- Full automated gate passed (`lint`, `test`, `build`, `tsc`, `git diff --check`).
- Desktop / tablet-like / 390px mobile smoke with no new console errors or layout issues.
- Working Vercel preview demonstrating the changes.
- Clear statement of any remaining known limitations.

---

## 6. Success Criteria / Verification

Stage 14 is complete only when:

1. All scoped bug fixes and polish items pass focused + regression verification.
2. Multiplayer tab scaffolding is present but does **not** replace existing entry points or break current flows.
3. Real two-client Supabase-backed browser E2E passes for any multiplayer-affected changes.
4. Full automated gate + responsive smoke passes cleanly.
5. No regressions in Stage 12/13 wins or Daily Multiplayer invariants.
6. All progress/governance surfaces are updated.
7. User has reviewed the Vercel preview and given explicit approval to proceed to the next stage or PR work.

---

## 7. Recommended Approach

- Start with any post-Stage-13 bug fixes the user reports (highest priority).
- Then implement the minimal Multiplayer tab scaffolding in a very small, isolated way.
- Treat spectator hardening as low-risk polish only.
- Keep high-conflict surfaces (`src/app/App.tsx`, `src/multiplayer/`, governance files) single-writer or explicitly sequenced.
- After every significant logical change, run the relevant focused verification before moving on.

---

## 8. Risks & Considerations

- Introducing even minimal Multiplayer tab scaffolding carries a small risk of navigation or state conflicts if not kept strictly additive.
- Any animation or keyboard polish must be compared against Daily Solo behavior to avoid re-introducing the problems fixed in Stage 13.
- Resource caution remains active for any browser E2E work.

---

## 9. Workflow Notes

This spec authorizes a **planning + execution** flow for Stage 14:

1. Planning prompt (governance-only) — updates plan, changelog, agents.md, memory.md, creates progress step.
2. Execution prompt — full implementation following the small-change + verify discipline.
3. Final handoff only after all success criteria are met.

**No PR, merge, or release work is authorized in Stage 14.**

---

**End of Specification**