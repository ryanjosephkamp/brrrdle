# ADDITIONS-2026-05-27.md

**Project:** brrrdle  
**Date:** 2026-05-27  
**Status:** Ready for Copilot agent  
**Purpose:** Add three new user-facing features + improve authentication + clean up repository structure.

## 1. Word Explorer Tab

### Goal
A public tab where anyone can browse and search the **exact** words the game is currently using.

### UI Requirements
- New top-level tab called **“Word Explorer”**.
- Navigation order: og | go | Practice | **Word Explorer** | **Feedback** | Settings | Admin.
- Inside the tab:
  - A clean, responsive table with integrated controls in the header:
    - **Length selector** (dropdown, default = 5, range 2–35 inclusive).
    - **Live search box** (filters instantly as the user types).
    - Two checkboxes for **Type filter**: “Show Answers” and “Show Valid Guesses” (both checked by default, combinable).
  - Table columns: **Word** | **Type** (Answer / Valid Guess).
  - Clickable column headers to sort by “Word” or “Type”.
  - Copy-to-clipboard button on every row.
  - On small screens the table collapses into a clean single-column card layout.
  - The table shows the **combined, deduplicated union** of `answers` + `validGuesses` (sorted alphabetically) for the selected length.
  - Live filtering works on the current length and type filters.
  - If search returns zero results:
    - Clear message: ““{searchTerm}” is not in the current {length}-letter word list.”
    - One-click button: **“Request this word”** (automatically includes the searched word + selected length).

### Request Word Behavior
- Creates a pre-filled GitHub Issue in `ryanjosephkamp/brrrdle` with:
  - Title: `Word request: "{word}" (length {N})`
  - Labels: `word-request`
  - Body: Automatically populated with the requested word, length, current date, note that it came from the in-game Word Explorer, and an optional **“Why this word?”** text field (pre-filled with polite prompt).

### Data Source & Answers Curation (Locked-in)
- Uses live word lists from Vercel Blob / manifest (fallback to bundled JSONs).
- **Answers curation algorithm** (applied during preprocessing in english-openlist repo):
  - If `validGuesses` < 1,000 → `answers` = full `validGuesses`
  - Else → stratified sampling by starting letter using quality-score ranking:
    - Quality score = 0.45×frequency + 0.30×positional + 0.15×vowel-balance + 0.10×uniqueness
    - Dynamic target size = `max(2000, min(8000, int(sqrt(total_valid_guesses) * 22)))`
    - Deterministic seed = `42 + length`
- Metadata in each JSON records the exact seed, target size, curation method, and date.

## 2. Feedback Tab

- New top-level tab called **“Feedback”**.
- Simple form (category dropdown: Bug Report / Feature Request / Other, description, optional details, optional email).
- Submits as a pre-filled GitHub Issue with label `feedback`.

## 3. Sound Effects

- Minimal set: tile flip, correct guess, game over (win/loss), keyboard click, invalid guess.
- Toggle in Settings: **“Sound Effects”** (On by default).
- Uses Web Audio API or small assets in `public/sounds/`.

## 4. Authentication Improvements (Critical)

- Improve the existing login flow so users can sign in with **either**:
  - Magic link (keep existing method)
  - Traditional **email + password** login (new option)
- Provide a clean toggle or tabbed interface so users can choose their preferred sign-in method.
- Ensure the frontend correctly detects the admin role from Supabase (`raw_app_meta_data.role === "admin"`) and fully renders the **Admin tab** with manual refresh controls.
- Persist login state properly so users do not have to re-authenticate frequently.

## 5. Repository Cleanup & Re-organization

### Goal
Re-organize the repository into a cleaner, more logical, and maintainable structure **without deleting any files or breaking existing functionality**.

### Requirements
- Move files/folders only as needed for better logical grouping (e.g., group related components, hooks, utilities, data layer, game logic, etc.).
- Update **all** import paths accordingly.
- Do **not** delete, rename, or remove any existing functionality.
- If any file relocation requires manual follow-up steps (e.g., Vercel environment variable reconfiguration, Supabase settings, GitHub Actions, etc.), the agent must clearly document them in the progress reports and CHANGELOG.
- Keep the cleanup conservative and safe.
- After reorganization, run full lint, test, and build checks to confirm nothing is broken.

## Implementation Constraints
- Follow existing architecture and CONSTITUTION.md.
- New tabs visible to everyone (including guests).
- No breakage of core gameplay.
- All new features must pass lint, test, and build checks.
- Update `CHANGELOG.md` and progress tracking files after each major step.
- Agent must halt for explicit user approval before executing the implementation plan addendum.

## Acceptance Criteria
- Word Explorer table is fully functional with live filtering, two Type checkboxes, sortable columns, copy buttons, and responsive card layout on mobile.
- “Request word” button creates a properly pre-filled GitHub Issue (including optional “Why this word?” field).
- Feedback tab creates properly labeled GitHub Issues.
- Sound effects are toggleable and pleasant.
- Login now supports both magic link and email + password.
- Admin tab correctly shows manual refresh controls for users with the admin role.
- Repository structure is cleaner and more logical without any breakage.
- No regressions in og, go, practice, or any existing feature.
