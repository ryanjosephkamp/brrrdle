# PHASE-21-UI-POLISH-AND-THEMING-FOUNDATION-SPEC-2026-06-01.md

## Phase Overview
**Phase 21 – UI Polish & Theming Foundation**

This phase is executed by Claude Opus 4.8 via GitHub Copilot (on the GitHub website).  
The goal is to take the chosen "Lunar Signal Deck" layout from Phase 20 and polish/upgrade the entire UI and codebase so that it is significantly more sophisticated, consistent, extensible, and ready for advanced, visually awesome theming in Phase 22.

## Refined User Instructions (Prompt 2 Addendum — 2026-06-01)
The user provided the following additional, binding instructions after Prompt 1. They must be reflected before any Phase 21 implementation begins:
- Keep the overall **Lunar Signal Deck layout and tab structure** mostly the same.
- Make the **background very minimalist** (plain black or a simple grid pattern is preferred). The current heavier background treatment (aurora bands, glow, depth effects, etc.) should be toned down to this minimalist baseline for the default surface.
- Turn the current Lunar Signal Deck visual style (background, effects, etc.) into **one individual theme** that will be enabled in Phase 22. The current "Lunar Signal Deck" look is therefore preserved as a selectable theme rather than the permanent default background.
- The agent **may** polish, upgrade, and improve visual effects, sounds, animations, component structure, and CSS architecture — as long as nothing is broken or significantly removed.
- The agent must **not** change any core gameplay mechanics, word logic, daily/practice rules, difficulty tiers, definitions, stats, economy, auth/sync, resume, sharing, or any other essential features.

These refined instructions take precedence over any earlier language in this spec where they conflict on the narrow concerns of the default background and the treatment of the Lunar Signal Deck visual style. They are a governance-only clarification recorded in Prompt 2; no code, UI, layout, or theming-foundation work is performed in Prompt 2.

## Core Objectives
1. Polish and refine the current Lunar Signal Deck layout to the highest professional standard, keeping the overall layout and tab structure mostly the same while adopting a very minimalist default background (plain black or a simple grid pattern).
2. Improve code organization, component structure, and CSS architecture to make future theming (Phase 22) much easier and more powerful.
3. Ensure the UI feels cohesive, modern, and impressive while preserving every existing mechanic 100% intact.
4. Prepare the codebase for the upcoming planned phases without implementing any of their features yet.
5. Update all progress tracking surfaces, changelog, and documentation.

## Strict Rules for Claude
- Maximum autonomy is allowed as long as nothing significant is broken or removed.
- Follow CONSTITUTION.md strictly at all times.
- Update CHANGELOG.md and progress tracking surfaces (PROGRESS.csv + PROGRESS-STEP-N.md) after every major step.
- Do not implement features from future phases (theming system, consumables shop, calendar, multiplayer, etc.). Only prepare the foundation.
- Keep the About Brrrdle section as a dedicated page.
- One major change set at a time where possible; use the 2-prompt workflow (planning addendum first, then execution).
- After completing the phase, create a PR and merge it (or instruct the user to do so).

## Success Criteria
Claude should feel proud of the result. The final UI must be:
- Visually cohesive and significantly more polished than before Phase 20.
- Technically excellent and easy to theme in Phase 22.
- Fully responsive and accessible.
- Free of any regressions in gameplay, auth, stats, definitions, etc.

## Phase Deliverables
1. Polished and upgraded Lunar Signal Deck layout (layout and tab structure mostly preserved) with a very minimalist default background (plain black or a simple grid pattern).
2. Improved theming foundation (CSS variables, component structure, etc.).
3. The current Lunar Signal Deck visual style (background, effects, etc.) captured as **one individual theme** to be enabled in Phase 22 (not the permanent default background).
4. Updated progress files and changelog.
5. Merged PR with the final state.

**This phase must be completed before moving to Phase 22 (Dramatic Theming System).**

**Constitution Reminder**: Follow CONSTITUTION.md strictly. Update tracking surfaces after every major step. Halt for user review after the planning addendum (first prompt).

---

**End of Spec**
