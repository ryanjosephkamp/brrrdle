# PHASE-23-STAGE-15-GO-TRANSITION-AND-PRACTICE-SEED-FIXES-SPEC-2026-06-08.md

**Phase**: 23 — Multiplayer Foundations and Polish  
**Stage**: 15 — GO Transition Polish + Practice Seed Per-Account Randomization  
**Status**: Draft for planning pass  
**Date**: 2026-06-08  
**Binding Authority**: This document is the source of truth for Stage 15 scope, invariants, and verification requirements.

---

## 1. Overview / Goal

Stage 15 is a narrow, targeted bug-fix stage that addresses two issues discovered during Stage 14 review:

1. **GO transition regression**: When a GO puzzle is solved, the brief all-green solved-row hold causes previously completed puzzles in the chain to disappear or reset visually.
2. **Practice seed predictability / exploitability**: Practice OG and Practice GO currently produce the same puzzle sequence for different accounts. This makes Practice mode gameable and allows artificial inflation of stats/performance.

The goal is to fix both issues with minimal, surgical changes while preserving all prior Stage 12–14 behavior and invariants.

---

## 2. Scope (In-Scope)

### 2.1 GO Transition Fix
- Ensure that when a GO puzzle is solved and the all-green solved-row hold is displayed, all previously completed puzzles in the current GO chain remain visible (their solved rows stay rendered and stable).
- The fix must apply to **Multiplayer GO** (primary) and, if the same root cause exists, to solo Practice GO and Daily GO.
- The ~2-second solved-row hold behavior introduced in Stage 13 must be preserved; only the visual regression (disappearing prior solutions) is in scope.

### 2.2 Practice Seed Per-Account Randomization
- Practice OG and Practice GO must generate puzzle sequences that are unique per account (authenticated users) so that different accounts receive different puzzles when playing the same Practice mode.
- Authenticated users should have a persistent per-account practice seed/state so the sequence continues uniquely across sessions.
- Guest users may fall back to device-local or session-based seeding (current shared behavior is acceptable for guests if it keeps changes minimal).
- **Daily OG/GO must remain completely unaffected** — Daily puzzles must stay globally deterministic and identical for all players on the same UTC day.

### 2.3 Verification & Documentation
- Reproduction of both bugs before fixes.
- Focused regression tests + full automated gate.
- Real two-client Supabase-backed browser E2E for any Multiplayer GO changes.
- Update of `CHANGELOG.md`, `AGENT-IMPLEMENTATION-PLAN.md` §28, `agents.md`, `memory.md`, and a new `progress/PROGRESS-STEP-122.md`.

---

## 3. Out of Scope / Explicitly Deferred

- Any broader Practice mode overhaul or new Practice features.
- Changes to Daily mode behavior or determinism.
- UI/UX polish beyond what is strictly required to fix the two bugs.
- Spectator expansion, notification system, floating manager, bots, exports/GIFs, History/Theme tabs, or any deferred Phase 23 features.
- Scoring, rating, or ELO changes.
- Full dedicated Multiplayer tab implementation.
- PR creation, merge, release, or production deployment.
- Any work on GO transition timing, sound, or animation feel unless it is the direct cause of prior solutions disappearing.

---

## 4. Key Requirements & Constraints (Invariants)

Stage 15 **must** preserve the following without regression:

- All Stage 12 wins (Hard Mode enforcement, keyboard responsiveness, sound playback, row-write reduction, stale-save protections, timed Practice behavior, scoring/result settlement).
- All Stage 13 wins (Practice solo one-shot resume behavior, submitted-row animation stability, post-game results visibility, Multiplayer GO solved-row hold + coordinated advancement for both players).
- All Stage 14 wins (hidden/inert Multiplayer foundations, Calendar/Practice as active entry points, nonparticipant gameplay guard, unified `async_multiplayer_games` path).
- Daily Multiplayer remains strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-control, answer-separated, and claim-safe.
- `playerSessions` remain canonical for per-viewer validation and mutation in Multiplayer.
- Shared `serializedSession` remains compatibility/answer plumbing only.
- Daily OG/GO puzzle selection remains globally deterministic.
- Practice mode must not leak information between accounts after the fix.

Any change that would violate the above is out of scope.

---

## 5. Deliverables

By the end of Stage 15, the following must exist:

1. Working fixes for both reported bugs.
2. Focused regression tests covering:
   - GO chain previous-puzzle visibility during solved-row hold (Multiplayer + solo if affected).
   - Different authenticated accounts receiving different Practice OG/GO sequences.
3. Full automated verification gate (`lint`, `test`, `build`, API typecheck, `git diff --check`).
4. Responsive browser smoke (desktop, tablet-like, 390px) with no new console errors or horizontal overflow.
5. Real two-client Supabase-backed browser E2E for Multiplayer GO transition behavior (if the fix touches multiplayer surfaces).
6. Updated governance surfaces:
   - `AGENT-IMPLEMENTATION-PLAN.md` §28 (new subsection for Stage 15)
   - `CHANGELOG.md` (Unreleased section)
   - `agents.md` and `memory.md` (coordination notes)
   - `progress/PROGRESS-STEP-122.md`
7. Clean handoff report with verification evidence and explicit scope guard.

---

## 6. Success Criteria / Verification

Stage 15 is considered complete only when **all** of the following pass:

- Both bugs are reproduced before any source changes (documented in the execution checkpoint).
- Both bugs are fixed and no longer reproducible.
- Focused changed-area tests pass.
- Full test suite passes (target: 472+ tests, no regressions).
- `npm run lint`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check` all pass cleanly.
- Desktop, tablet-like, and 390px mobile browser smoke show no new errors or layout issues.
- Real Supabase two-client E2E (where relevant) confirms Multiplayer GO transition no longer drops prior solutions and Practice seed behavior is now per-account for authenticated users.
- All Stage 12–14 invariants remain intact (verified via regression checks and manual smoke).
- No new console errors, no horizontal overflow, and resource usage remains bounded (one dev server, minimal browser contexts).

---

## 7. Recommended Approach & Workflow Discipline

Stage 15 must follow the established small-change-then-verify discipline used successfully in Stages 12–14:

1. **Reproduce first** — Document clear reproduction steps for both bugs (especially the seed issue using two distinct authenticated accounts) before writing any fixes.
2. **One logical change at a time** — Make the smallest possible targeted edit, then run focused verification before moving to the next item.
3. **Prioritize the GO transition bug first** (lower risk), then the Practice seed fix.
4. **High-conflict surfaces** — Keep `src/multiplayer/MultiplayerGameSurface.tsx`, `src/app/games/GoGame.tsx`, `src/game/go/`, Practice session creation paths, and guest progress schema under coordinator ownership or explicit sequencing.
5. **Resource caution** — Use one Vite dev server, close browser contexts promptly after verification, and monitor for runaway processes.
6. **Halt for review** after each major checkpoint (reproduction, first fix batch, final verification).

---

## 8. Risks & Considerations

- **GO transition risk**: The solved-row hold logic added in Stage 13 may have subtle remount or keying issues in the GO chain renderer. Changes must be minimal and preserve the intentional hold behavior.
- **Practice seed risk**: Introducing per-account seeding is a correctness improvement but touches session creation and persistence. The change must be additive and must not affect Daily mode or existing stored Daily sessions.
- **Guest vs Authenticated behavior**: The spec allows simpler guest fallback behavior to keep the fix minimal. If the user later wants fully unique guest seeds, that can be a follow-up.
- **Regression surface**: Both bugs touch recently modified areas (GO transition from Stage 13, session creation patterns). Strong regression coverage and two-client E2E are mandatory.

---

## 9. Workflow Notes

- This stage follows the standard two-prompt pattern:  
  **Prompt 1 (Planning)** — Governance-only update to `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `agents.md`, `memory.md`, and creation of `progress/PROGRESS-STEP-122.md`. No source edits.  
  **Prompt 2 (Execution)** — Full implementation of the fixes with the discipline described above.
- Stage 15 does **not** authorize PR creation, merge, release, or any later-phase work.
- After successful final verification, the user must explicitly authorize any subsequent PR/merge work in a separate prompt.

---

**End of Specification**