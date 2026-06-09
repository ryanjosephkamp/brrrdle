# Phase 23 Stage 18 — Multiplayer GO Final Puzzle Behavior + Solo Practice GO Hard Mode Checkbox Fixes

**Status**: Planning + Governance Document (Prompt 1)
**Date**: 2026-06-08
**Authority**: This document is the binding source of truth for Stage 18 scope, invariants, reproduction requirements, and verification criteria. It supersedes any conflicting instructions in chat history for this stage.

---

## 1. Purpose

Stage 18 is the final targeted bug-fix stage inside Phase 23. It addresses three remaining defects that must be resolved before Phase 23 can be considered complete and before any work on Phase 24 may begin.

The three bugs are:

1. **Solo Practice GO Hard Mode checkbox is not toggleable** (minor but user-visible regression).
2. **Missing final solved-row hold / all-green transition** at the end of Multiplayer GO chains (cosmetic inconsistency).
3. **Multiplayer GO chains end prematurely on the final puzzle** (most significant of the three; breaks the expected alternating-turn-until-solved contract on puzzle 5).

Stage 18 must remain extremely narrow. All changes must be the smallest possible targeted fixes. Broad refactoring of GO chain logic, scoring, or session management is out of scope unless a minimal change is proven necessary for Bug 3.

---

## 2. Scope

### 2.1 In Scope (Authorized Work)

- **Bug 1**: Make the Hard Mode checkbox functional in Solo Practice GO.
  - Reference implementation: Solo Practice OG (closest working analog).
  - The checkbox must toggle correctly, persist the choice, and enforce Hard Mode rules on the first guess.

- **Bug 2**: Add the brief all-green solved-row hold + transition behavior after the final (5th) puzzle is solved in Multiplayer GO.
  - This must occur for both Practice Multiplayer GO and Daily Multiplayer GO.
  - The transition must use the exact same timing, visual treatment, and advancement logic already used after puzzles 1–4.

- **Bug 3**: Ensure Multiplayer GO chains (both Practice and Daily) allow players to continue alternating guesses on the final puzzle until one player submits the correct answer.
  - Currently the chain can terminate early on puzzle 5 after a small number of consecutive wrong guesses, awarding a points-based win without a correct solve.
  - Desired behavior: identical to puzzles 1–4 — players keep alternating until a correct solve occurs, then the final solved-row hold + transition runs, followed by the terminal results screen.

### 2.2 Explicitly Out of Scope

- Any changes to Solo Practice OG, Daily Solo GO, or any OG mode.
- Any changes to Practice Multiplayer OG or Daily Multiplayer OG.
- Scoring, rating, or ELO logic changes.
- GO chain advancement rules for non-final puzzles.
- Hard Mode enforcement in Multiplayer GO (already working).
- Customize box behavior (fixed in Stage 17).
- Resume behavior, seed behavior, or authenticated Practice seed system (Stage 15).
- Any UI layout, styling, copy, or theming changes.
- Broad refactoring of `src/game/go/`, `src/multiplayer/`, or session management.
- PR creation, merge, release, production deployment, dedicated Multiplayer tab work, spectator expansion, notifications, floating manager, bots, social/export features, or any Phase 24 work.

If the root cause of Bug 3 appears to require changes outside the narrow surfaces listed above, the agent must stop and report rather than broaden scope.

---

## 3. Bug-by-Bug Detail

### Bug 1: Solo Practice GO Hard Mode Checkbox Not Toggleable

**Symptom**
In Solo Practice GO, clicking the Hard Mode checkbox does nothing. The toggle state never changes and Hard Mode is never activated.

**Working Reference**
Solo Practice OG correctly implements the checkbox. Multiplayer Practice GO also works. Solo Practice GO is the outlier.

**Required Fix**
Make Solo Practice GO use the same (or equivalent minimal) wiring that Solo Practice OG uses for the Hard Mode checkbox. The smallest possible delta is preferred.

**Verification**
- Checkbox toggles visually and the choice is respected on first guess.
- Fresh Solo Practice GO + Hard Mode on → first guess must obey Hard Mode rules.
- Toggling off must correctly disable Hard Mode.
- No regression in Solo Practice OG or Multiplayer GO Hard Mode behavior.

---

### Bug 2: Missing Final Solved-Row Hold in Multiplayer GO

**Symptom**
After solving puzzles 1–4 in a Multiplayer GO chain, both players briefly see the all-green solved row before advancing. After solving puzzle 5 (the final puzzle), this transition is skipped and players jump directly to the terminal results screen.

**Desired Behavior**
The same solved-row hold + transition must occur after the final puzzle solve, using identical timing and visual treatment, before showing the full turn history + definitions screen.

**Scope Note**
This must be verified for both Practice Multiplayer GO and Daily Multiplayer GO.

---

### Bug 3: Multiplayer GO Chains Terminate Prematurely on Final Puzzle (Highest Priority)

**Symptom**
On puzzles 1–4, players can alternate guesses indefinitely until one submits the correct answer. On puzzle 5, after a small number of consecutive wrong guesses (observed \~4–5), the game ends prematurely and declares a winner based on points without either player having solved the final puzzle.

**Desired Behavior**
The final puzzle must behave identically to all previous puzzles: players continue alternating turns until one player submits the correct answer. Only then does the solved-row hold + transition occur, followed by the terminal results screen.

**Priority**
This is the most significant of the three bugs. Codex should prioritize reproducing and fixing Bug 3 first.

**Verification Requirement**
Real two-client Supabase-backed browser E2E is required for Bug 3. The test must demonstrate that on a 5-puzzle GO chain, puzzle 5 continues alternating turns until a correct solve occurs.

---

## 4. Invariants to Preserve

Stage 18 must not regress any of the following:

- All Stage 12–17 wins (Hard Mode enforcement, keyboard responsiveness, sound, stale-save protections, timed Practice behavior, GO solved-row hold, authenticated Practice seeds, Customize locking, Practice Multiplayer GO projection, etc.).
- Daily Multiplayer remains strictly asynchronous, five letters, UTC-day keyed, no-clock, no-Hard-Mode-lobby-control, answer-separated, and claim-safe.
- `playerSessions` remains canonical per-viewer state.
- Shared `serializedSession` remains compatibility/answer plumbing only.
- Solo Practice OG behavior must remain completely unchanged.
- Daily OG/GO deterministic selection must remain unchanged.
- No scoring, rating, or ELO rule changes.

---

## 5. Execution Discipline (Mandatory)

If execution is later authorized:

1. **Reproduce first** — especially Bug 3 with two-client Supabase-backed E2E.
2. Make the smallest possible targeted change for each bug.
3. Run focused verification immediately after each logical fix.
4. Use real two-client Supabase-backed browser E2E for any Multiplayer GO claim (Bug 2 and Bug 3).
5. Finish with the full verification gate:
   - Focused changed-area tests
   - `npm run lint`
   - `npm run test`
   - `npm run build`
   - `npx tsc -p tsconfig.api.json --noEmit`
   - `git diff --check`
   - Desktop / tablet-like / 390px browser smoke
   - Solo Practice OG non-regression confirmation
   - Resource check (no runaway processes)
6. No PR, merge, release, or later-phase work is authorized by this stage.

---

## 6. Recommended Execution Order (if authorized)

1. Bug 3 (premature final-puzzle termination) — highest priority, requires real multiplayer testing.
2. Bug 2 (missing final solved-row hold).
3. Bug 1 (Solo Practice GO Hard Mode checkbox).

---

## 7. Governance & Tracking Requirements

If execution is authorized, the agent must:

- Update `AGENT-IMPLEMENTATION-PLAN.md` with a new §28.62 subsection documenting the three bugs, fixes, and verification.
- Update `CHANGELOG.md` under Unreleased.
- Update `agents.md` and `memory.md` with Stage 18 coordination notes and durable decisions.
- Append the next sequential `phase_id` to `progress/PROGRESS.csv` and create `progress/PROGRESS-STEP-XXX.md`.
- Clearly state at the end of the final handoff that Stage 18 is complete for user review and that no PR/merge/release or Phase 24 work is authorized.

---

## 8. Gate

This planning document (`phase_id = 134` when recorded) authorizes only governance, planning, and documentation updates. No source code changes, tests, UI work, or browser verification may occur until the user explicitly authorizes execution in a subsequent prompt.

Stage 18 implementation remains gated until that explicit authorization is given.
