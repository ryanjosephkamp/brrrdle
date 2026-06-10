# Progress Step 142 — Phase 23 Stage 20 Execution Kickoff

**Date**: 2026-06-10  
**Phase**: 23 — Multiplayer Foundations and Polish  
**Stage**: 20 — Multiplayer Status Text Synchronization + Forfeit Win/Loss Precedence Bug Fixes  
**Status**: Completed — Reproduction And Fixes Pending  
**Scope**: Execution kickoff only; no source fixes yet

---

## 1. Summary

Stage 20 execution is now open after explicit user authorization from the Stage 20 execution prompt.

The stage remains an extremely narrow two-bug multiplayer pass:

1. **Status text synchronization**: the status/message box above turn history must update for both players on lobby creation, join, turn submission, normal completion, forfeit, and timeout events across applicable OG/GO Practice/Daily multiplayer flows.
2. **Forfeit win/loss precedence**: a player who forfeits after at least one submitted guess must lose regardless of current point totals. Pre-guess forfeits may remain non-results/cancellations, and existing timeout-loser behavior must remain unchanged.

No source-code fixes have been made in this checkpoint.

---

## 2. Protected Starting State

- Active branch: `main`.
- Starting state: clean local `main` after PR #23 merged Stage 19 final changes and Stage 20 planning.
- `git status --short`: clean at kickoff.
- PR creation, merge, release, production deployment, full dedicated Multiplayer tab work, spectator expansion, Phase 24 work, and out-of-scope work remain unauthorized.

---

## 3. Baseline Resource Snapshot

Captured before dev-server/browser testing:

- No app/dev-server listener on `5173`, `5174`, `3000`, or `4173`.
- Existing unrelated local Python server on `127.0.0.1:8765`.
- Existing user/system Chrome, Codex, VS Code, Obsidian, and MCP/Node helper processes.
- Memory pressure was already high before Stage 20 browser work:
  - `17G used`
  - `540M unused`
  - about `6930M` compressor

Resource plan:

- Use one Vite dev server unless a clear reason appears.
- Keep browser contexts minimal and close them promptly.
- Do not run full heavy gates in parallel.
- Clean up temporary Supabase users/rows/claims and generated browser artifacts.
- Confirm no Stage 20-owned runaway process before final handoff.

---

## 4. Reproduction Plan

Stage 20 must follow reproduce-first discipline.

### Bug 1 — Status Text Synchronization

Use real two-client Supabase-backed browser E2E with isolated authenticated contexts to compare each client’s status text after:

- Lobby creation/opening.
- Second player joining.
- Either player submitting a turn.
- Normal completion.
- Forfeit.
- Timeout non-regression where practical.

Coverage should include OG and GO, Practice and Daily where applicable. Browser evidence should be paired with remote Supabase row probes for status, current turn, participants, moves, and terminal state.

### Bug 2 — Forfeit Win/Loss Precedence

Use real two-client Supabase-backed browser E2E and focused tests to reproduce:

- A player ahead on points forfeits after at least one submitted guess.
- Current behavior incorrectly declares or implies that forfeiting player wins on points.

Also verify:

- Pre-guess forfeit remains non-result/cancellation if that is current intended behavior.
- Timeout loser precedence remains unchanged.

---

## 5. Scope Boundary

Authorized changes are limited to:

- Multiplayer status/message text synchronization.
- Forfeit-specific final win/loss precedence.
- Minimal supporting state/projection/event/test changes required for those two issues.

Explicitly out of scope:

- Gameplay board, letter tiles, keyboard behavior, tile coloring, Hard Mode validation, solved-row hold/transition behavior, GO/OG advancement rules, or core gameplay mechanics.
- Scoring formula changes, rating/ELO changes, or broader result-system redesign.
- Daily Multiplayer rule changes.
- New features, UI redesign, full Multiplayer tab work, spectator expansion, notifications, floating manager, bots, exports, Phase 24 work, broad refactoring, PR creation, merge, release, or production deployment.

If either bug requires out-of-scope changes, execution must stop and report.

---

## 6. Verification Plan

Before final handoff, Stage 20 must pass:

- Focused changed-area tests.
- Wider multiplayer/GO regressions.
- `npm run lint`.
- `npm run test`.
- `npm run build`.
- `npx tsc -p tsconfig.api.json --noEmit`.
- `git diff --check`.
- Desktop, tablet-like, and 390px browser smoke with no new console errors or horizontal overflow.
- Real two-client Supabase-backed browser E2E for affected OG/GO Practice/Daily flows.
- Join, turn, forfeit, timeout non-regression, and normal completion coverage.
- Remote Supabase probes and cleanup.
- Final resource/process snapshot.

---

## 7. Gate

Stage 20 execution is open, but no source fix has been made in this kickoff checkpoint.

Next required action: reproduce the two Stage 20 bugs before any production-source fix.
