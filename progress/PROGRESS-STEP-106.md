# Progress Step 106 - Final Stabilization Execution Kickoff

**Phase**: 23 - Multiplayer Foundations and Polish  
**Stage**: Final Stabilization & Broad Debugging Pass  
**phase_id**: 106  
**Status**: Completed - Final Stabilization Continued Under `phase_id = 107`-`109`  
**Started**: 2026-06-07T00:54:19Z  
**Completed**: 2026-06-07T00:54:19Z  

## Authorization

The user explicitly authorized execution of the Phase 23 Final Stabilization & Broad Debugging Pass.

This is a bug-fix and stabilization pass only. It does not authorize PR creation, merge, release, dedicated Multiplayer tab work, spectator expansion, notification/bot/social features, redesign, scoring/rating rule changes, or later-phase implementation.

## Protected Starting State

- Active branch: `codex/phase-23-stage-10`.
- The active worktree is intentionally dirty with the verified Stage 8-10 local state.
- Restore point: backup branch `backup/phase-23-stage-10-final-2026-06-06`.
- Restore PR: `https://github.com/ryanjosephkamp/brrrdle/pull/18`.

The current dirty worktree is the source of truth for this pass. No reset, rebase, pull-over, or branch switch is allowed unless the current local state is preserved first.

## Final Stabilization Test Matrix

### Solo Daily OG/GO

- Fixed five-letter Daily behavior.
- Valid guess handling.
- Tile coloring and duplicate-letter behavior.
- On-screen keyboard states.
- Win, loss, reveal, give-up, definitions, resume, and sharing.

### Solo Practice OG/GO

- Practice word lengths 2-35.
- Hard Mode locking and validation.
- Tile coloring and keyboard behavior.
- Definitions, give-up/reveal, win/loss summaries, and resume.
- Desktop, tablet-like, and 390px mobile play.

### Calendar and Daily Systems

- Calendar hub entry points.
- Daily archive/unlock behavior.
- Countdown behavior.
- Local daily vs UTC Daily Multiplayer boundaries.
- Daily Multiplayer indicators and mobile rendering.

### Unified Practice Multiplayer

- Lobby creation, discovery, join, cancellation, forfeit, refresh restoration, and resume.
- Untimed board, keyboard, turn history, scoring, and result consistency for both players.
- Timed chess-clock behavior, including active-player-only decrement, timeout loss, refresh/reconnect, and typed draft preservation.
- Practice Hard Mode lobby visibility/locking, canonical validation, and scoring bonus.
- Supabase persistence, subscriptions, stale-save protections, duplicate-safe create/join behavior, and cleanup.

### Daily Multiplayer

- Strict asynchronous behavior.
- Fixed five-letter games.
- UTC-day keyed claims.
- No clocks and no Hard Mode controls.
- OG/GO answer separation.
- Calendar entry/archive behavior.
- Refresh/reconnect and claim safety.

### Auth and Sync

- Sign-in, sign-up, sign-out.
- Password reset and recovery link handling.
- Magic-link behavior.
- Guest/cloud merge.
- Settings/profile sync.
- Supabase client lifecycle.

### Stats, Economy, and History

- Solo stats isolation.
- Multiplayer ratings and scoring summaries.
- Coins/XP behavior.
- Past daily unlocks.
- Share/history separation.

### Words, Definitions, and Admin

- Word Explorer filtering and pagination.
- Definition modal behavior.
- Fallback definition links.
- Admin route gating.

### Responsive, Accessibility, and Performance

- Desktop, tablet-like, and 390px mobile smoke.
- No horizontal overflow.
- No console errors.
- Tooltip/dialog layering.
- Reduced-motion behavior.
- Keyboard/touch ergonomics.
- Loading and error states.
- Memory stability with two authenticated browser contexts.

## Baseline Resource Snapshot

Captured before source edits, local dev-server startup, or browser E2E.

### `ps aux -m | head -20`

Largest visible RSS processes included:

- Codex renderer: about 779 MB.
- Finder: about 410 MB.
- VS Code plugin helpers: about 381 MB and 338 MB.
- Chrome renderers: about 341 MB and 315 MB.
- Codex app server: about 272 MB.
- Chrome main process: about 263 MB.

No Stage 7-style runaway `next-server` or multi-GB Python process was visible in this snapshot.

### `top -l 1 -o mem | head -30`

Notable memory state:

- Physical memory: about 17 GB used.
- Wired memory: about 3.8 GB.
- Compressor: about 6.7 GB.
- Unused memory: about 244 MB.

Several unrelated desktop apps show large compressed memory footprints, so browser E2E should stay conservative.

### `vm_stat`

Notable memory state:

- Page size: 16 KB.
- Free pages: 14,124, about 226 MB.
- Pages stored in compressor: 1,980,430.
- Pages occupied by compressor: 434,842.

## Resource Safety Plan

- Use one local dev server unless there is a concrete reason otherwise.
- Avoid parallel full lint/test/build/typecheck gates.
- Use one browser process with two isolated authenticated contexts for multiplayer E2E.
- Run multiplayer E2E flows sequentially.
- Close browser contexts after each flow where practical.
- Periodically re-check process/memory usage during browser testing.
- Gracefully terminate only agent-started runaway processes if they become clear memory offenders.
- Do not kill unrelated or system-critical user processes.

## Initial Read-Only Audit Queue

Sub-agent audits are running or completed for:

- Unified Multiplayer domain/repository/UI risk surfaces.
- Solo/Daily/Calendar/auth/stats/Words/responsive non-regression surfaces.
- Verification command order, Supabase environment usage, and resource/performance risk surfaces.

Early high-priority risks identified for focused testing:

- Stale zero-move multiplayer saves may not be guarded strongly enough against newer joins, cancellations, or terminal states.
- Terminal multiplayer result settlement may need verification when a terminal state arrives through repository snapshots or background effects rather than a direct local submit.
- Shared move projection must continue to display rival moves without corrupting each player's canonical `playerSessions`, Hard Mode validation, GO puzzle index, or typed draft.

## Scope Guard

No game source code, UI components, tests, Supabase migrations, PR, merge, release, dedicated Multiplayer tab work, spectator expansion, redesign, scoring/rating rule changes, or later-phase work has been performed in this kickoff checkpoint.

## Next Step

Proceed with focused audits, targeted automated tests, safe browser smoke, real two-client Supabase-backed multiplayer E2E, scoped bug fixes for confirmed issues, progress updates after milestones, and final verification.
