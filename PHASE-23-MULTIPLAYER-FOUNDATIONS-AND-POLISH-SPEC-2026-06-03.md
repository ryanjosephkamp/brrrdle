**PHASE-23-MULTIPLAYER-FOUNDATIONS-AND-POLISH-SPEC-2026-06-03.md**

### Purpose
Phase 23 delivers a complete multiplayer experience (async/turn-based + live/real-time) for both Practice and Daily modes across multiple logical stages. The phase also includes important bug fixes and UI improvements identified after Phase 22. The architecture is designed so that advanced features (such as ELO) can be added cleanly in later stages.

### Phase Structure

Phase 23 will be executed in **three main Codex stages**, with an optional fourth stage only if needed:

- **Stage 1**: Bug Fixes + Foundations + Async/Turn-based Multiplayer Core + Calendar & Countdown Updates
- **Stage 2**: Live / Real-time Multiplayer Features
- **Stage 3**: Advanced Multiplayer Features (ELO, Matchmaking, Scoring)
- **Stage 4 (Optional)**: UI / Front-end Polish & Cleanup (only triggered if significant issues are identified after Stage 3)

Stages will be completed sequentially.

---

### Stage 1: Foundations + Bug Fixes + Async/Turn-based Core

**Bug Fixes & Improvements**

1. **Landing Page Title**  
   Change “LUNAR COMMAND CENTER” to **“COMMAND CENTER”**. Make the title dynamic so themes can override it in the future.

2. **Popup / Popover Dismissal**  
   All popups, modals, and popovers must close when clicking or tapping outside the element (in addition to the X button).

3. **Tooltip Mobile Display**  
   Tooltips in Settings must be properly repositioned on mobile so they fit within the viewport and appear above other UI elements. Maintain tap-to-show behavior.

4. **Calendar Mobile Icons & Indicators**  
   Fix icon rendering on mobile. The Calendar must clearly show **separate indicators/buttons for OG and GO** on each day for both solo and multiplayer modes.

5. **Answer + Definitions Reveal on Loss**  
   When a player loses, both the answer **and** the definitions must remain hidden if the player still has the option to buy more guesses. They are only revealed if the player explicitly chooses not to continue.

**Multiplayer Foundations (Async / Turn-based)**

- Introduce and fully implement a `DailyVariant` system to cleanly separate solo vs. multiplayer logic.
- Build core multiplayer session models, turn-based gameplay, and persistent progress saving.
- **Practice Multiplayer (Async)**: Full turn-based experience with no time limit. Players can take turns over extended periods and resume games. Support all word lengths (2–35). Players may have up to **5 simultaneous async games** running at once.
- **Daily Multiplayer (Async)**: Available only for the **current day**. All games must be completed by **midnight UTC**. Any in-progress game is automatically lost when the day changes. Players cannot replay past daily multiplayer games (they are view-only).
- Basic lobby and game creation flow for async multiplayer.
- Strong integration with the existing Calendar (first tab).

**Calendar Updates (Stage 1)**

- Past daily multiplayer games appear grayed out and view-only.
- Players can view the **full game history**, the final word, and all definitions for past daily multiplayer games (for both OG and GO variants).
- Separate, distinct indicators/buttons for OG and GO in both solo and multiplayer categories on each day.

**UI Additions (Stage 1)**

- Add a **second countdown clock** for Daily Multiplayer showing time until UTC midnight.
- Position it near the existing solo daily countdown.
- Make the Daily Multiplayer countdown toggleable in Settings.
- Use a **brand-new unique sound** for the Daily Multiplayer reset alert (different from the solo daily reset sound).
- Clearly display the UTC deadline in the UI and in Settings.

---

### Stage 2: Live / Real-time Multiplayer Features

**Goals**
- Add real-time/live variants on top of the async foundation from Stage 1.

**Features**

- **Practice Multiplayer (Live)**: Real-time matchmaking with optional time limits. Players play simultaneously. First player is chosen randomly. Support all word lengths (2–35).
- **Daily Multiplayer (Live)**: Real-time version available only for the current day (UTC midnight deadline still applies).
- Basic real-time lobby and matchmaking system (simple lobby-based / anyone currently looking for a game). The architecture must be designed to allow clean addition of ELO-based matchmaking in Stage 3.

**Word Length Selection in Live Practice Multiplayer**

After players are matched in a live Practice game:
- Each player has **1 minute** to choose their preferred word length.
- If only one player chooses a length within the minute → that length is used.
- If both players choose different lengths → a random selection is made between the two (with a visual animation that bounces/highlights between the choices before landing on one). **The animation is not skippable**.
- If neither player chooses within the minute → the game is aborted.
- Players may change their selection during the 1-minute window.
- This selection will take place on a **dedicated pre-game screen**.

---

### Stage 3: Advanced Multiplayer Features

**Goals**
- Add skill-based systems and more advanced functionality.

**Features**

- ELO / skill rating system with fair matchmaking (Codex should propose a reasonable implementation).
- Option for players to create custom games (not purely ELO-based).
- Refined scoring and performance tracking for multiplayer games.
- Any remaining core multiplayer improvements that build cleanly on the Stage 2 foundation.

---

### Stage 4 (Optional): UI / Front-end Polish & Cleanup

This stage is **only triggered** if Codex or the user identifies significant UI, layout, or interaction issues after Stage 3.

- Can be executed using Claude Opus 4.8 via GitHub Copilot.
- Focus on polishing, consistency, and mobile experience improvements.
- Should remain relatively lightweight.

---

### General Requirements

- All multiplayer progress (async and live) must save and persist correctly.
- Daily and Practice modes remain clearly separated in navigation (Daily via Calendar, Practice via Practice tab), while solo and multiplayer variants are logically grouped.
- Daily Multiplayer is restricted to the current day only and uses **UTC** for deadlines and countdowns.
- The existing solo daily countdown and behavior must remain completely unchanged.
- Full compatibility with existing stats, economy, resume, auth/sync, and solo gameplay.
- Codex must follow `CONSTITUTION.md` v3.3 and update progress tracking after every major step.

### Success Criteria

- All listed bugs are resolved.
- A complete async + live multiplayer experience exists for both Practice and Daily modes.
- The Calendar properly supports separate OG/GO indicators and view-only past daily multiplayer games with full history and word reveal.
- Daily Multiplayer has its own countdown clock and unique reset sound.
- Word length selection flow in live Practice multiplayer works as specified (including non-skippable animation on a dedicated pre-game screen).
- The system is well-structured and ready for ELO-based matchmaking in Stage 3 with minimal refactoring.
- No regressions in solo gameplay or existing features.
- Mobile experience is solid.

### Process Requirements

- Codex must work against the latest version of the repository from GitHub.
- Stages must be completed sequentially with verification after each major stage.
- Full verification (lint, test, build, responsive/browser smoke) after significant changes.
- Update `CHANGELOG.md` and progress surfaces after every major step.
- Halt for explicit user approval before creating the Phase 23 PR.
