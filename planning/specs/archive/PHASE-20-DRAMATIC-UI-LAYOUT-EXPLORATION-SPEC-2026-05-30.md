# PHASE-20-DRAMATIC-UI-LAYOUT-EXPLORATION-SPEC-2026-05-30.md

## Phase Overview
**Phase 20 – Dramatic UI/Layout Exploration**

This phase focuses **exclusively** on exploring and iterating dramatically improved UI layouts and overall visual presentation for brrrdle. The goal is to move far beyond the current minimalist design into a much more modern, immersive, game-like, and/or futuristic experience (2026–2036 professional polish) while preserving **every single existing mechanic, feature, and behavior 100% intact**.

## Core Objectives
1. Generate **one sophisticated layout variant at a time** (no parallel big batches).
2. Each variant must feel significantly more polished, engaging, and impressive than the current UI.
3. Provide **live Vercel preview links** (preferred) or detailed screenshots + component breakdowns so the user can interact immediately.
4. Fully iterative process: user reviews → gives detailed feedback → Codex iterates or generates the next one.
5. Codex is explicitly encouraged to draw heavy inspiration from any example websites, games, or design references the user links.
6. Once the user selects a clear favorite, refine and polish that layout extensively.
7. Make the final codebase cleaner and more extensible for future phases (especially Phase 21 theming).

## Strict Rules for Codex
- **One variant at a time** — never generate more than one full layout proposal in a single response.
- **Always show preview first** — provide a live Vercel preview link (or high-quality screenshots + interactive description) **before** committing any code changes.
- Do **not** merge or commit any layout code until the user explicitly approves a variant.
- Preserve **all existing functionality** exactly.
- Keep the About Brrrdle section as a **dedicated page** (not strictly a tab) that will fit whatever final layout is chosen.
- No word-list filtering or changes to game logic.

## Phase 20.0 – Critical Bug Fix (Required First)
- Fix the broken **sign-out button**: After a user signs in, clicking the sign-out button currently does nothing. Users must be able to successfully sign out.
- This fix must be completed and verified **before** starting layout variants so the new UI starts with fully working auth.

## Success Criteria for Final Layout
The chosen layout must feel:
- Premium and modern
- Immersive and game-like (with appropriate depth and visual hierarchy)
- Responsive and polished on mobile, tablet, and desktop
- Future-proof and easy to extend (especially for theming in Phase 21)
- Significantly more visually compelling than the current minimalist design

## Phase Deliverables
1. One final selected and fully polished layout (merged and verified).
2. Fixed sign-out functionality confirmed working.
3. Updated root README.md with new screenshots of the chosen layout.
4. Any necessary code refactoring to support the new layout structure.
5. Updated PROGRESS-STEP-N.md and CHANGELOG.md entries.
6. Confirmation that all existing features (including auth) still work perfectly.

## Phase Boundaries
- This phase is **layout and UI exploration + the sign-out fix only**.
- Theming (sounds, colors, special effects) is reserved for **Phase 21**.
- No other new features.

**Constitution Reminder**: Follow CONSTITUTION.md strictly. One-variant-at-a-time rule, preview-before-commit rule, and explicit user approval required before any merge.

---

**End of Spec**

---
