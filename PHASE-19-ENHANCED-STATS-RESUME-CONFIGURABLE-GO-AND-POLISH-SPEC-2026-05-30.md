# PHASE-19-ENHANCED-STATS-RESUME-CONFIGURABLE-GO-AND-POLISH-SPEC-2026-05-30.md

**Phase Name**: Phase 19 — Enhanced Statistics Visualizations, Configurable Go Puzzle Count, Full Resume-Most-Recent-Game Activation, Advanced Polish & Theming Foundations  
**Date**: 2026-05-30  
**Author**: Grok (on behalf of Otto)  
**Status**: Approved by user for Claude Opus 4.8 autonomous execution (via 3-prompt workflow)

This spec is the **binding source of truth** for Phase 19. It builds directly on the completed Phase 18 (difficulty tiers, Customize menu, Settings reorg, Word Explorer, Go definitions, overlap fix) and activates several features that were explicitly future-proofed/reserved in prior phases.

## 1. Goals & Scope (Approved by User)

Implement the following high-value, user-requested enhancements while preserving **all** existing invariants (daily locked at 5, practice 2–35, validGuesses identical across tiers, Expert default, etc.):

- **Rich Statistics Dashboard** — interactive charts (win rate by mode/tier/length, streak calendar, XP progress, coin usage trends).
- **Configurable Go Puzzle Count** — global setting + per-game override: 5 / 7 / 10 puzzles (default 5). Persisted in profile.
- **Full Resume Most-Recent Unfinished Game** — now activate the slot that was reserved in Phase 18. Button on home screen + auto-resume on load when signed in.
- **Advanced Polish** — smoother tile animations, categorized sound effects, improved mobile touch targets, final accessibility audit, keyboard navigation polish.
- **Light Theming Foundation** — ability to select "Icy", "Classic", "Neon", or "Country Flag" accent (stored in profile; UI changes limited to accents/borders for v1).

**Out of scope for this phase**: full monetization changes, multiplayer, leaderboards, heavy AI hints. These stay reserved for future addenda.

## 2. Key User Preferences (Confirmed)

- Global default settings (Go count, difficulty tier, Hard Mode, theme) saved to profile + guest storage.
- Per-game overrides via the existing "Customize" menu with "Save as default" button.
- Resume button only appears when a game is unfinished; auto-resume works for signed-in users.
- Charts use simple, accessible libraries already in the ecosystem (no new heavy deps).
- All new features must be toggleable/off-by-default where appropriate and fully testable.

## 3. Sub-Phase Plan (for Claude to Follow)

| Sub-phase | Title | Key Deliverables | Verification |
|-----------|-------|------------------|--------------|
| 19.0 | Pre-flight & Baseline | Read all docs, capture current stats/dashboard state, confirm invariants | Full lint/test/build green |
| 19.1 | Enhanced Stats Dashboard | Interactive charts (win rate, streak, XP, coins) in Stats tab | Visual + unit tests, responsive |
| 19.2 | Configurable Go Puzzle Count | Global + per-game selector (5/7/10), persistence, session logic update | Tests for all counts, UI lock after start |
| 19.3 | Resume Most-Recent Game | Full activation of reserved slot + UI button + auto-resume | End-to-end test (start → leave → resume) |
| 19.4 | Advanced Polish & Accessibility | Tile animations, sound categories, touch targets, final a11y pass | Manual multi-device test + axe/lighthouse |
| 19.5 | Light Theming Foundation | Theme selector in Settings/Customize, profile storage, accent application | 4 themes switchable, saved correctly |
| 19.6 | Final Integration & Release Gate | Cross-feature tests, changelog, progress update, full verification | All tests + manual smoke on Vercel preview |

## 4. Agent Instructions (Must Follow Exactly)

Claude must:
- Use the established 3-prompt workflow if you prefer, or execute in one session with per-sub-phase halts (your choice).
- Make **small, reviewable changes** and run full verification after every sub-phase.
- Update `CHANGELOG.md`, `progress/PROGRESS.csv`, and `progress/PROGRESS-STEP-N.md` after each major step.
- Preserve **all** Phase 0–18 invariants.
- End with a comprehensive status report listing changed files, verification results, and clear "safe to merge & test" statement.
