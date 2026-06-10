# Phase 23 Stage 19 — Solo/Daily GO Transition Screen, Keyboard Coloring, and Multiplayer GO Transition Propagation Bug Fixes

**Plan Version**: 1.0 (initial)
**Date**: 2026-06-09
**Status**: Draft for user review — implementation must NOT begin until the user explicitly approves this spec and authorizes execution via the planning/execution prompt workflow.
**Authority**: This spec is bound by `CONSTITUTION.md` (latest), `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, `AGENT-IMPLEMENTATION-PLAN.md` §28 (Phase 23), all prior Stage 12–18 invariants and wins, and the attached `phase23_stage19_bugs.md`.

## 1. Overview and Goal

Phase 23 Stage 19 is a **narrow, targeted bug-fix-only stage**. It addresses exactly three related defects in GO-mode behavior that were introduced or left unaddressed during earlier stages (particularly the multiplayer GO transition and solved-row hold work in Stage 18 and prior GO propagation fixes).

**Primary goal**: Restore consistent, correct GO transition behavior and keyboard coloring across **all** GO variants (solo Practice, solo Daily, multiplayer Practice, multiplayer Daily) while preserving every win from Stages 12–18.

The three bugs (as described in the attached `phase23_stage19_bugs.md`):

1. **Missing transition screen + sound after correct solution in Solo GO** (both Practice and Daily).
   - After a correct guess in solo GO, there is no all-green transition screen and no confirming sound (unlike the behavior that was correctly implemented for Practice Multiplayer GO in Stage 18).
   - This affects both **solo Daily GO** and **solo Practice GO**.

2. **Keyboard coloring rules not enforced on the final puzzle of Daily GO** (both solo and multiplayer).
   - The canonical rules (green on board → green on keyboard; orange on board with no green of same letter → orange on keyboard; gray on board with no green/orange of same letter → gray on keyboard) work correctly for Practice GO (solo + multiplayer) but fail on the **final puzzle** of Daily GO chains.
   - This is likely related to Bug 3.

3. **Critical asymmetric transition / stuck-player bug in Multiplayer GO** (primarily observed in Practice Multiplayer GO; Daily Multiplayer GO should also be verified).
   - In a 5-puzzle multiplayer GO game, after one player solves puzzle 4 (sometimes after many guesses), the solved-row transition screen appears on only one player's screen.
   - One player proceeds into puzzle 5 (or sees solo-like behavior), while the other player's screen freezes/stays on the puzzle-4 transition state.
   - The game can still reach a terminal state for both when the second player finishes puzzle 5, but one player is effectively locked out of meaningful participation during puzzle 5.
   - This is a critical fairness and multiplayer integrity bug.

**Success criteria**: All three bugs are fully reproduced before any source changes, fixed with the smallest possible targeted edits, and verified with focused regressions + full automated gate + real two-client Supabase-backed browser E2E (for multiplayer flows) + responsive smoke. No regressions to any Stage 12–18 behavior.

## 2. Strict Scope Boundaries

### In Scope (only these three bugs)
- Bug 1: Add the missing all-green transition screen + sound to **solo Practice GO** and **solo Daily GO** by mirroring the exact implementation pattern used for Practice Multiplayer GO (Stage 18).
- Bug 2: Fix keyboard coloring derivation on the **final puzzle** of Daily GO chains (solo and multiplayer) so the canonical green/orange/gray precedence rules are always respected.
- Bug 3: Fix the asymmetric transition / stuck-player propagation issue in Multiplayer GO so that a solved puzzle 4 correctly triggers the transition screen and advances **both** players into puzzle 5 (or terminal state) together.

### Explicitly Out of Scope
- Any change to Solo Practice OG, Daily OG, or any OG-mode behavior.
- Any change to Practice Multiplayer GO or Daily Multiplayer GO behavior **except** the specific final-puzzle transition propagation and keyboard coloring fixes described above.
- Any change to GO chain advancement rules for non-final puzzles.
- Any change to Hard Mode enforcement, Customize box behavior, resume behavior, scoring/rating/ELO, Daily determinism, authenticated Practice seeds (Stage 15), or the unified Multiplayer model.
- Any UI layout, styling, copy, theming, or visual polish work.
- Any new features, spectator expansion, dedicated Multiplayer tab work, notifications, bots, social features, exports, or Phase 24 work.
- Any broad refactoring of `src/game/go/`, `src/multiplayer/`, session management, or projection logic.
- PR creation, merge, release, production deployment, or later-phase work.

If investigation of Bug 2 or Bug 3 reveals that the root cause requires touching surfaces outside the narrow list above, **stop immediately and report** rather than expanding scope.

## 3. Invariants to Preserve (Mandatory)

Stage 19 **must not regress** any of the following (all previous stages remain authoritative):

- All Stage 12–18 wins (Hard Mode enforcement, keyboard responsiveness, sound playback, stale-save protections, timed Practice clock behavior, row-write reduction, GO prior-solution visibility + keyboard projection, solved-row hold coordination, Solo Practice GO Customize locking, etc.).
- Daily Multiplayer invariants: strictly asynchronous, 5 letters, UTC-day keyed, no-clock, no-Hard-Mode-lobby-control, answer-separated, claim-safe.
- `playerSessions` remain canonical per-viewer state; shared `serializedSession` remains compatibility/answer plumbing only.
- Solo Practice OG behavior and Daily OG/GO global determinism.
- Scoring/result settlement rules.
- All existing focused tests and E2E expectations for GO transition behavior (especially the Practice Multiplayer GO implementation from Stage 18).

## 4. Recommended Execution Discipline

1. **Reproduce first** (especially Bug 3 with real two-client Supabase-backed browser E2E).
2. Study the exact transition + solved-row hold implementation that was added for Practice Multiplayer GO in Stage 18.
3. Make the **smallest possible targeted change** for each bug.
4. Run focused verification immediately after each logical fix before moving to the next bug.
5. Use real two-client Supabase-backed browser E2E for all multiplayer GO flows.
6. Finish with the full verification gate (see below).

## 5. Verification Requirements

**Mandatory full gate after all fixes**:
- Focused changed-area tests + wider GO regressions.
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Desktop, tablet-like, and 390px browser smoke (no new console errors or horizontal overflow).
- Real two-client Supabase-backed browser E2E for Practice Multiplayer GO and Daily Multiplayer GO (create/join/solve final puzzle with multiple wrong guesses on puzzle 4, verify symmetric transition + keyboard coloring on puzzle 5, confirm terminal state).
- Remote Supabase probes + cleanup of temporary rows/users.
- Solo Practice GO and solo Daily GO manual/browser verification of the new transition screen + sound after correct guesses.
- Resource/process sanity check (no runaway processes, one dev server only, cleanup of generated artifacts).
- Confirmation that **no** Stage 12–18 invariants or out-of-scope behaviors were affected.

## 6. Deliverables

### Planning / Governance (this pass)
- Create this spec file at root.
- Update `AGENT-IMPLEMENTATION-PLAN.md` (new §28.65 or next available subsection) with planning details, scope, invariants, and execution gate.
- Append row to `progress/PROGRESS.csv` (next sequential `phase_id`).
- Create `progress/PROGRESS-STEP-XXX.md` (planning report).
- Update `CHANGELOG.md`, `agents.md`, and `memory.md` with planning entry and coordination notes.
- No source code, tests, UI components, or Supabase migrations may be edited in the planning pass.

### Execution (after explicit user authorization)
- Targeted fixes + focused regressions.
- Full verification gate + real E2E evidence.
- Final handoff report + updated governance/progress files.
- No PR/merge/release unless separately authorized after handoff.

## 7. Risks and Notes

- Bug 2 and Bug 3 may share a common root cause in how the final puzzle's projection / transition state is updated or broadcast in Daily GO and Multiplayer GO paths.
- The asymmetric transition bug (Bug 3) is high-risk for multiplayer fairness; real two-client E2E is non-negotiable.
- All changes must remain extremely narrow. Any sign that a fix is touching broader GO session or projection logic should trigger an immediate stop-and-report.

## 8. Workflow

1. User reviews and approves this spec.
2. Planning prompt is issued to Codex (governance-only pass, updates docs/progress only).
3. User reviews planning output and explicitly authorizes execution.
4. Codex executes with reproduce-first discipline, full verification, and handoff.
5. User reviews final handoff and decides on next steps (possible Stage 20 only if necessary, or official Phase 23 closure + Phase 24 start).

**This spec is now ready for upload to the repository root.**