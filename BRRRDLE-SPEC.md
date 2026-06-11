# BRRRDLE-SPEC.md

**Project**: brrrdle
**Version**: 2.0 (Current-state audit after Phase 23 Stage 20)
**Date**: 2026-06-10
**Status**: Active product specification and authority-stack entrypoint

---

## 1. Project Overview

`brrrdle` is a polished browser word game that combines classic Wordle-style single puzzles with Hurdle-style chained puzzles. The game supports solo Daily play, solo Practice play, and authenticated two-player Multiplayer play.

The two core variants are:

- **OG**: a classic single-puzzle Wordle-style game.
- **GO**: a five-puzzle chained game where solved answers carry forward as prefilled evidence in later puzzles.

The product emphasizes exact word-game rules, responsive mobile-first play, accessible interaction, durable progress, clear definitions, and careful phase-gated development.

---

## 2. Current Game Modes

### 2.1 Solo Daily

- Daily OG and Daily GO are fixed at five letters.
- Daily puzzles are keyed by the daily cycle and are globally deterministic for the same day.
- Daily GO is a five-puzzle chain.
- Daily games support Hard Mode.
- Daily completion shows definitions and sharing/result affordances.

### 2.2 Solo Practice

- Practice OG and Practice GO support word lengths 2 through 35.
- Practice GO uses one selected word length across the five-puzzle chain.
- Authenticated Practice puzzle sequences are account-specific so different accounts do not receive identical Practice sequences.
- Guest Practice uses local/device progress behavior.
- Practice supports Hard Mode, configurable setup controls where applicable, post-game results, definitions, and replay/new-game actions.

### 2.3 Multiplayer

Multiplayer is authenticated and uses the unified multiplayer model built during Phase 23.

Supported multiplayer surfaces:

- Practice Multiplayer OG.
- Practice Multiplayer GO.
- Daily Multiplayer OG.
- Daily Multiplayer GO.

Practice Multiplayer:

- Supports lobby creation/join flows.
- Supports OG and GO variants.
- Supports Practice-specific Hard Mode lobby settings.
- Supports Practice-specific time limits and timeout settlement.
- Preserves turn order, forfeit behavior, status messaging, and result settlement through shared persisted game state.

Daily Multiplayer:

- Is strictly asynchronous.
- Is fixed at five letters.
- Is UTC-day keyed.
- Has no clocks or timers.
- Has no Hard Mode lobby control.
- Keeps OG and GO answer selection separated.
- Is claim-safe so each Daily multiplayer bucket is protected from duplicate participation.

GO Multiplayer:

- Preserves prior solution rows throughout the GO chain.
- Projects visible keyboard evidence from submitted/prior GO rows using the app's existing color precedence.
- Keeps final puzzle play active until a correct solve.
- Shows solved-row holds before advancing and before terminal results.
- Synchronizes transition/terminal state across both players.

Current multiplayer result rules:

- Normal completion settles from the completed game state.
- Timeout makes the timed-out player lose regardless of points.
- Post-guess forfeit makes the forfeiting player lose before any points fallback.
- Pre-guess forfeit may cancel without a winner.
- Scoring formulas and rating/ELO behavior must not be changed without explicit future authorization.

---

## 3. Core Gameplay Rules

### 3.1 Tile And Keyboard Coloring

Tile coloring follows Wordle-style duplicate-letter accounting:

- Green means the letter is correct in that position.
- Orange/yellow means the letter is present elsewhere.
- Gray means the letter is not available after duplicate accounting.

Keyboard color precedence is:

1. Green.
2. Orange/yellow.
3. Gray.

### 3.2 Hard Mode

Hard Mode is available in solo Daily and Practice and in Practice Multiplayer where enabled by the lobby.

Hard Mode rules:

- Green letters must remain in the exact same position in later guesses.
- Orange/yellow letters must be reused in later guesses.
- Gray letters cannot be reused when the local rules determine they are excluded.

Daily Multiplayer must not expose a Hard Mode lobby control.

### 3.3 GO Chain Behavior

- GO chains contain five puzzles.
- Solved answers can appear as prefilled/carry-over rows in later puzzles.
- Setup-prefilled carry-over rows do not count as user-submitted guesses for setup-locking behavior.
- A solved GO puzzle shows the expected solved-row transition before advancing.
- Terminal GO completion shows final definitions/results after the final solved-row hold.

---

## 4. Data, Words, And Definitions

### 4.1 Word Lists

- Practice supports word lengths 2 through 35.
- Daily modes currently remain five-letter experiences.
- Word-list data is bundled with the app and supported by the project's existing word-list generation and refresh approach.
- Protected admin tooling exists for operational word-list management as documented in the project plan and implementation history.

### 4.2 Definitions

Definitions are shown after game completion where available.

Definition fallback priority:

1. Bundled/preprocessed definition data when available.
2. Dictionary API or other app-supported external fallback.
3. Wiktionary or equivalent fallback where supported.
4. A Google search affordance when no definition is available.

Fallback UI should remain clear and non-intrusive.

---

## 5. Accounts, Persistence, And Sync

### 5.1 Guest Play

- Guests can play without signing in.
- Guest progress, settings, stats, economy, and history are stored locally.

### 5.2 Supabase Accounts

- Users can create/sign in to Supabase-backed accounts.
- Authenticated data syncs through the project's account/cloud progress system.
- Guest-to-account transfer is supported.
- Multiplayer requires authenticated participants.

### 5.3 Persistence Boundaries

- Solo progress, stats, economy, settings, and history must remain separate from multiplayer result plumbing.
- Multiplayer uses canonical per-player session state for validation and mutation.
- Shared multiplayer projections are display/compatibility plumbing and must not overwrite another player's canonical session.
- Supabase RLS and claim protections must remain enforced.

---

## 6. Progression, Economy, Stats, And History

- The game includes XP, levels, coins, settings, stats, and history.
- Consumables and Pay-to-Continue are solo-mode economy features.
- Consumables and Pay-to-Continue remain disabled in multiplayer.
- Stats support OG and GO from the beginning and include foundations for future per-length and richer reporting.

---

## 7. UI, UX, Accessibility, And Sound

The current app includes:

- Dark, polished responsive UI.
- Calendar and Practice entry points for current Daily/Practice flows.
- Hidden/inert foundations for a future dedicated Multiplayer tab.
- Physical keyboard and on-screen keyboard input.
- Tile animations and solved-row transition behavior.
- Sound effects controlled by Settings and browser audio activation rules.
- Definition, sharing, result, and status-message surfaces.
- Desktop, tablet-like, and narrow mobile responsiveness.

Accessibility and responsiveness remain required for future work.

---

## 8. Hosting And Deployment

- The game deploys on Vercel.
- Repository docs/blog surfaces may use GitHub Pages/Jekyll where applicable.
- Preview deployments are review tools; production release/deployment actions require explicit user authorization.

---

## 9. Current Governance And Planning Structure

- `CONSTITUTION.md` is the top project governance document after current user instructions.
- This file remains the active product spec.
- `BRRRDLE-OVERVIEW.md` remains the historical v2.6 product/development plan.
- `AGENT-IMPLEMENTATION-PLAN.md` is now a lightweight root compatibility entrypoint after repository reorganization.
- The full historical implementation plan and changelog live under `planning/history/`.
- Future planning should use the tiered `planning/` structure and keep active phase plans concise.
- `progress/PROGRESS.csv` and `progress/PROGRESS-STEP-*.md` remain the canonical progress ledger.

---

## 10. Explicit Current Non-Goals

Do not implement or change without explicit future authorization:

- Variable daily word lengths.
- New gameplay modes.
- New scoring, rating, or ELO rules.
- New social graph, bot, notification, export/GIF, or leaderboard systems.
- Full dedicated Multiplayer tab implementation.
- Spectator feature expansion.
- Production deployment or release.
- Broad redesign or architecture rewrite.
- Phase 24 implementation before the user provides and authorizes the Phase 24 scope.

---

## 11. Agent Implementation Notes

Future agents must:

- Follow the current user prompt, `CONSTITUTION.md`, this spec, `BRRRDLE-OVERVIEW.md`, and the active planning/progress files.
- Preserve Daily Multiplayer invariants unless a higher-authority future spec explicitly changes them.
- Use real two-client Supabase-backed browser E2E for multiplayer behavior claims.
- Keep source changes scoped to explicitly authorized work.
- Update progress records and halt at required review gates.

---

**End of BRRRDLE-SPEC.md**
