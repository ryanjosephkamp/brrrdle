# PHASE-18-WORD-DIFFICULTY-AND-GO-IMPROVEMENTS-SPEC-2026-05-28.md

**Title**: Word List Difficulty Tiers (Casual / Standard / Expert) + Word Explorer Enhancements + Go Mode Polish + Daily Overlap Fix + Settings & Per-Game UI Improvements  
**Date**: 2026-05-28  
**Version**: 1.3 (final with all user clarifications)  
**Priority**: Phase 18 (Immediate)

## 1. Word List Difficulty Tiers

**Naming**: Casual, Standard, Expert  
**Default**: Expert (current full curated behavior)

**Requirements**
- Valid Guesses = always the full list (unchanged across all tiers)
- Answers subset per tier:
  - **Casual**: Common/frequent words only. Dynamically scaled per length.
  - **Standard**: Union (or larger) of classic official Wordle + Hurdle answer sets.
  - **Expert**: Current full curated list (includes all new English OpenList words)
- Difficulty selector:
  - **Global default** saved to user profile (configurable in Settings)
  - **Per-game override** via a small **“Customize”** button near the mode selector that opens a clean popover/quick menu
  - The quick menu must include a **“Save as default”** button
  - Once a game has started, the override becomes locked (changing it requires starting a new game)

## 2. Settings Tab Improvements
- Move the existing **Hard Mode** checkbox to the same general section as the global difficulty selector
- Add helpful **tooltips** (hover/click) for all major settings in this section

## 3. Word Explorer Enhancements
- Add “Difficulty” column showing applicable tiers (e.g. “Casual”, “Standard + Expert”, “Expert only”)
- Column must be filterable and sortable
- Add “Define” button per row → opens modal identical to post-game definition screen (with Google fallback)

## 4. Go Mode Improvements
- After correctly solving each puzzle, immediately show its definition below the grid
- Definitions stack vertically
- Add “Hide Definitions” / “Show All” toggle
- Add “Give Up / Reveal Answer” button **only in practice mode** (with appropriate coin/streak penalty)

## 5. Critical Fix – Daily Word Overlap
- Daily Go must use a **completely independent daily seed** from daily Og
- First word of daily Go must **not** be consistently the same as daily Og

## 6. Additional Preferences
- As many user settings as possible (including difficulty tier) should be saved to Supabase profile when signed in
- System should be future-proof for “resume most recent unfinished game”

## Agent Instructions
- Read CONSTITUTION.md, current AGENT-IMPLEMENTATION-PLAN.md, BRRRDLE-SPEC.md, and this document.
- Append as **Phase 18** to the implementation plan.
- Allow creative but tasteful UI decisions for the “Customize” quick menu and tooltips.
- Follow the 3-prompt workflow described by the user (constitution/repo cleanup in prompt 2, full execution in prompt 3).
- Halt for user review before any code changes.

**End of spec**
