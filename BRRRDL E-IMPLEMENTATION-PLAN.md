# brrrdle Implementation Plan - Complete Specification

**Project Name**: brrrdle  
**Version**: Final v5 (as of May 2026)  
**Goal**: Build a single, high-quality web game that combines faithful recreations of Wordle (og mode) and Hurdle (go mode) with extensive new features.

## 1. Core Concept

`brrrdle` is a modern, polished single-page web app that lets users play **both**:
- **og mode** — Classic single-puzzle Wordle
- **go mode** — Chained 5-puzzle Hurdle (with automatic carry-over pre-filled guesses)

The app must feel cohesive and premium while preserving the exact feel of the original games. All shared systems (coloring, keyboard, animations, etc.) are built once and reused.

## 2. Faithful Recreation Requirements

### og mode (Wordle)
- 6 guesses maximum (adjusts dynamically by word length in practice)
- Standard green / yellow / gray feedback with exact duplicate handling
- Hard Mode toggle (must use revealed hints)
- Daily puzzle (initially fixed 5 letters) + Practice mode
- Emoji sharing (classic Wordle format)

### go mode (Hurdle)
- 5 sequential puzzles
- Puzzles 1–4: full guesses (dynamic by length)
- Puzzle 5: first 4 rows pre-filled with previous answers + only 2 guesses remaining
- All puzzles in a session use the **same word length**
- Hard Mode supported
- Replays of daily go allowed but do **not** count toward stats

**Hard Mode Rules** (both modes):
- Green letters must stay in exact position
- Yellow letters must appear somewhere in every subsequent guess
- Gray letters cannot be used again

## 3. Word Length System

**Practice Mode (both og and go)**:
- User selects word length **2 to 35** via dropdown before starting
- Default = 5
- Remembers last used length
- “Random” option (picks 2–35)
- In go mode: all five puzzles use the **same** selected length

**Daily Mode**:
- Starts at fixed 5 letters
- Architecture must support future iterative expansion to more lengths

**Dynamic Guess Count** (for balance):

| Word Length | Max Guesses |
|-------------|-------------|
| 2           | 7           |
| 3           | 6           |
| 4–7         | 6 (default) |
| 8–10        | 4           |
| 11–35       | 3           |

## 4. Master Word List

- Use the **English OpenList** (https://github.com/ryanjosephkamp/english-openlist) as the single source of truth.
- Pre-process into length-indexed JSON files for fast loading.
- Daily GitHub Action should keep the list current (non-breaking — app must never crash if sync fails).

## 5. Word Definitions at Game End

Fallback sequence:
1. Dictionary API (`https://api.dictionaryapi.dev/`)
2. Wiktionary API
3. Clear message + **Google Search button** ("define [WORD]")

- Always display the source of the definition
- In daily go mode: only show definitions for puzzles the player reached
- Google button available in all cases

## 6. Progression System (v1)

- **Experience Levels** — level up through play and wins
- **Coins** — earned based on performance
- **Simple Consumables** (included in v1):
  - “Reveal One Letter”
  - “Remove Incorrect Letters”
- **Pay-to-Continue** — available in **both daily and practice** (og and go)
  - Cost scales based on **word length + completion percentage** (how close the player was)
  - Lower cost for shorter/harder lengths

**Scoring**:
- Perfect game (first-try solve) = maximum points/coins for that word length
- All other games earn proportionally less

## 7. Account System (Optional)

- Guest mode (temporary localStorage account) for immediate play
- Full account creation: email, unique username, password + email verification
- All data (settings, history, levels, coins, consumables) syncs to account
- Option to transfer guest data when signing in/creating account
- Settings page with export stats, change credentials, Danger Zone

## 8. Statistics System

- Per-mode tracking from launch
- Designed to easily support **per-word-length stats** later
- Foundation for rich interactive dashboard

## 9. UI / UX / Polish Requirements

- Clean, modern, dark-first theme with icy “brrr” accents
- Responsive (excellent on mobile)
- Satisfying animations: tile pop-in, flip reveal, row shake
- On-screen + physical keyboard support
- Toast notifications, modals, help, stats, settings
- PWA-ready

## 10. Technical Stack & Architecture

- React 19 + TypeScript + Vite
- Tailwind CSS + CSS variables for theming
- Zustand for state management
- Length-indexed word lists
- Supabase (planned for accounts)
- GitHub Pages + Jekyll for blog

**Folder structure** (must be followed):
```
src/
├── components/
├── modes/ (og/ and go/)
├── core/ (Coloring, WordValidator, definitions, progression, etc.)
├── store/
├── types/
├── hooks/
└── utils/
```

## 11. Blog

- GitHub Pages + Jekyll + Markdown
- Design should match the cool, playful `brrrdle` vibe

## 12. Extensibility

The architecture must make it easy to add in future updates:
- Variable daily word lengths
- Optional random word lengths per puzzle in go mode
- More modes, themes, sound effects, social features, leaderboards, etc.

---

**End of Plan**