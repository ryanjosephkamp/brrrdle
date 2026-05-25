# BRRRDLE-SPEC.md

**Project**: brrrdle  
**Version**: 1.0 (Aligned)  
**Date**: 2026-05-25  
**Status**: Ready for Implementation

---

## 1. Project Overview

`brrrdle` is a modern, polished Wordle + Hurdle hybrid web game. It supports two primary modes:

- **og mode**: Classic single-puzzle Wordle experience
- **go mode**: Chained 5-puzzle Hurdle experience with carry-over pre-fills

The game emphasizes excellent user experience, mobile performance, accessibility, and clean architecture that supports future extensibility (e.g., variable daily lengths in later updates).

---

## 2. Core Modes & Scope

### 2.1 Daily vs Practice Modes (Initial Launch)

| Mode     | Daily Puzzles          | Practice Mode          | Notes |
|----------|------------------------|------------------------|-------|
| **og**   | Fixed at 5 letters     | Supports 2–35 letters  | Daily remains classic 5-letter experience at launch |
| **go**   | Fixed at 5 letters     | Supports 2–35 letters  | All 5 puzzles in a session use the same length |

**Future Consideration**: Variable lengths for daily modes will be added in a later update.

### 2.2 Hard Mode (Both og and go)

Hard Mode must be supported in both daily and practice modes with the following rules:

- Green letters must remain in the exact same position in all subsequent guesses.
- Yellow letters must appear somewhere in every subsequent guess.
- Gray letters cannot be reused.

---

## 3. Data Layer & Word Lists

### 3.1 Source of Truth

- Primary source: Pre-processed JSON files from the English OpenList project (`words_length_{N}.json` for N = 2 to 35).
- Files are generated daily by the English OpenList GitHub Action and published to Hugging Face.

### 3.2 Data Consumption Strategy (Hybrid)

- **Build time**: The selected word list JSON files are bundled into the application during the production build.
- **Runtime**: The application checks for updates on production deploys (and supports a manual override).
- **Manual Override**: Protected admin route using a Supabase user with an `admin` role. Manual assignment of the admin role is done via the Supabase dashboard for v1.

### 3.3 Word Length Support

- Practice mode: Full support for lengths 2 through 35.
- Daily mode (initial launch): Fixed at 5 letters.

---

## 4. Definitions System

Definitions are shown after a game ends (win or lose).

**Priority Order**:
1. Pre-processed JSON from English OpenList (preferred when available).
2. Dictionary API (`https://api.dictionaryapi.dev/`).
3. Wiktionary fallback.
4. Google Search button (always available).

**Fallback Behavior**:
- When both the pre-processed JSON and external APIs fail to return a definition, display a clear but non-intrusive message.
- The message must recommend that the user clicks the **“Search Google for ‘[WORD]’”** button.
- Clicking the button opens a new browser tab with a Google search for `define [WORD]`.
- Button text must be **dynamic** (e.g., “Search Google for ‘apple’”).

---

## 5. Progression System

### 5.1 Experience & Levels
- Players earn experience points based on game performance.
- Levels are earned through accumulated experience.

### 5.2 Coins & Economy
- Coins are earned based on performance (perfect games on first try earn maximum coins for that word length).
- Coins can be spent on consumables and Pay-to-Continue.

### 5.3 Consumables (v1)
- “Reveal One Letter”
- “Remove Incorrect Letters”

### 5.4 Pay-to-Continue
- Available in both daily and practice modes (og and go).
- Cost scales based on **word length + completion percentage** (how close the player was to solving the puzzle).
- Lower cost for shorter (generally harder) lengths.
- When a player loses, they are offered the option to pay coins to continue the current puzzle instead of immediately seeing the answer.

---

## 6. Account System

### 6.1 Guest Mode
- Users can play immediately without creating an account.
- Progress, coins, levels, and stats are saved locally (via localStorage / IndexedDB).

### 6.2 Supabase Accounts (Optional)
- Users can create a full account using email + password (or magic links).
- Email verification is required.
- All data (progress, coins, levels, stats, game history) syncs to the cloud.

### 6.3 Data Transfer
- When a guest user creates an account or logs in, they are offered the option to transfer their existing guest data to the new account.

### 6.4 Settings & Danger Zone
- Export data
- Delete account / reset progress
- Change email / password

---

## 7. Statistics

- Per-mode statistics (og vs go) from day one.
- Foundation for future per-word-length statistics.
- Rich, visual dashboard.

---

## 8. UI / UX / Polish Requirements

- Clean, modern, dark-first theme with “brrr” icy accents.
- Excellent mobile experience (responsive, touch-friendly).
- Smooth animations: tile pop-in, flip reveal, row shake.
- Physical keyboard + on-screen keyboard support.
- Emoji sharing (classic Wordle format).
- PWA support (installable, offline-capable where reasonable).
- WCAG AA accessibility minimum.
- Clear loading, error, and empty states.

---

## 9. Hosting & Deployment

- **Game**: Vercel (primary)
- **Blog / Docs**: GitHub Pages + Jekyll (same repository or `/docs` folder)

---

## 10. Non-Functional Requirements

- **Performance**: Fast initial load, smooth 60 fps interactions.
- **Accessibility**: WCAG AA minimum.
- **Reliability**: Graceful fallbacks for definitions and word list updates.
- **Security**: No secrets in client code. Supabase RLS policies enforced.
- **Maintainability**: Clean, well-documented code with clear separation of concerns.

---

## 11. Out of Scope for v1

- Variable lengths in daily modes (planned for future update)
- Social features / leaderboards
- Multiplayer
- Themes or sound effects
- Advanced AI hints inside the game

---

## 12. Implementation Notes for the Agent

- The agent must follow the approved `brrrdle` plan (v2.6) and this spec.
- All major phases must end with a commit, changelog update, and explicit user approval before proceeding.
- The agent should create `AGENT-IMPLEMENTATION-PLAN.md` and follow it with regular pause points for review.

---

**End of BRRRDLE-SPEC.md**