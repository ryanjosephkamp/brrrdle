# PHASE-21-THEME-PROPOSAL-TEMPLATES-SPEC-2026-06-02.md

## Phase Overview (Addendum to Phase 21)
**Phase 21 – Theme Proposal Templates (Governance + Creative Planning Step)**

This is an additional governance + creative planning step **before Claude closes Phase 21**.  
Claude must generate 5–10 fully fleshed-out **theme proposal template documents** that will live in the new `Themes/proposals/` folder. These templates will give Codex (GPT-5.5) everything needed to implement complete, sophisticated themes in Phase 22 and beyond.

## Core Objectives
1. Create (or confirm) the folder `Themes/proposals/` at the repository root.
2. Create a clear `README.md` in `Themes/proposals/` that explains the purpose of the folder and how to use the templates.
3. Generate **5–10 separate Markdown files**, each one a complete, self-contained theme proposal/template.
   - First template: **Upgraded "Command Center" / "Frozen Command Center" style** (the original Phase 20 variant Claude removed — now upgraded with improvements).
   - Second template: **Country / Nationality Theme Template** (a reusable template for any country; more elaborate than the existing one; includes placeholders for colors, icons, flags, sounds, etc.).
   - Third template: **Holiday / Special Event Theme Template** (reusable for limited-time events; includes placeholders for seasonal visuals, sounds, animations, etc.).
   - Remaining templates (Claude should create 2–7 more): diverse, creative categories (e.g. Sci-Fi, Nature, Retro, Cyberpunk, Fantasy, Minimal Neon, etc.). Maximize diversity.
4. Each proposal must be comprehensive enough for Codex to implement the full theme later.

## Required Content in Each Theme Proposal Markdown File
Use a consistent header structure at the top of every file:
- Theme Name
- Category / Type
- Author: Claude Opus 4.8
- Date
- Description (1–2 paragraphs)
- Visual Style (background, colors, accents, letter tile colors while preserving correct/incorrect/gray distinctions)
- Special Effects & Animations
- Sound Theme (unique sounds for key events)
- Component / CSS Changes Needed
- Implementation Notes for Codex (exact steps, files to edit, CSS variables, etc.)
- Future Extensibility Notes

## Strict Rules for Claude
- Follow `CONSTITUTION.md` v3.3 strictly.
- Do **not** implement any actual theme code yet — only create the proposal documents.
- Preserve the current minimalist default background and Lunar Signal Deck layout/tab structure.
- Update `CHANGELOG.md` and `progress/PROGRESS.csv` + `progress/PROGRESS-STEP-*.md` for this governance step.
- After generating all templates and the README, immediately halt and provide a clear summary report titled **"Phase 21 Theme Proposal Templates – Governance Step Complete"**.
- Do **not** create or merge any PR in this step.

**Deliverables**
- `Themes/proposals/README.md`
- 5–10 individual Markdown files in `Themes/proposals/` (named clearly, e.g. `01-command-center.md`, `02-country-template.md`, etc.)

This step must be completed **before** Claude merges the final Phase 21 PR.

**Constitution Reminder**: This is still governance + planning only. No code implementation of themes yet.

---

**End of Spec**
