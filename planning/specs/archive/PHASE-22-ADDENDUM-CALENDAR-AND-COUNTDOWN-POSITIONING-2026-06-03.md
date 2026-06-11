# PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md

## Purpose
This addendum extends Phase 22 to deliver a full **Calendar** feature that becomes the central hub for accessing both current and past daily puzzles (replacing the need for separate dedicated daily tabs), along with repositioning the countdown indicator to the top of the UI.

## 1. Calendar Feature (Central Hub for All Dailies)

### Core Vision
The Calendar becomes the **primary and only tab** through which users access daily puzzles. It replaces the previous separate "OG Daily" and "GO Daily" tabs. Users will access both today's dailies and all past dailies from this single calendar interface. The Calendar is placed as the **first tab** in the horizontal navigation.

### Requirements

**Visual Design**
- Clean monthly calendar view (with optional weekly overview support).
- Each day clearly indicates completion status for that day's OG and GO dailies.
- Current day is prominently highlighted using the local-midnight logic implemented in Prompt 2.
- Current streak and longest streak are displayed prominently on or near the calendar.

**Prominent Quick-Access Buttons**
- The calendar must include clear, prominent buttons for **"Play Today's OG"** and **"Play Today's GO"** for fast access to the current day's dailies.

**Accessing Past Dailies**
- Every calendar day provides separate entry points for OG mode and GO mode.
- Clicking a past day's button opens a confirmation modal/popup that offers the user the choice to:
  - Pay a fixed coin cost to unlock and play that daily, **or**
  - Cancel/close the modal.
- Once a user has made **at least one guess** on a past daily instance, that specific daily remains permanently unlocked for the user (it does not re-lock after the next calendar day begins).

**Coin Cost for Past Dailies**
- There is one fixed coin cost that applies to unlocking any past daily (same cost for both OG and GO modes).
- The cost should be reasonable and roughly equivalent to the coin earnings from approximately five completed practice games with average performance (suggested range: 50–75 coins). Claude should select and justify a specific value.

**Behavior When Loading a Daily from the Calendar**
- Today's dailies load normally with no coin cost.
- Unlocked past dailies must be treated as **full daily experiences** (full stats recording, hard mode support, resume functionality, definitions, etc.) for consistency with current daily play.

**Navigation & Structural Change**
- The Calendar becomes the **first tab** in the top horizontal navigation.
- The previous separate dedicated OG Daily and GO Daily tabs are to be removed or fully integrated into the Calendar experience. The Calendar is now the single source of truth for all daily play (current and historical).

**Technical Requirements**
- The calendar reads from existing completion history data.
- Progress on unlocked past dailies (including partial progress) must persist correctly.
- The feature must fully respect the new local-midnight daily rollover logic.
- The entire calendar must be theme-ready using the existing theming system (`data-surface`, CSS variables, accent tokens).

## 2. Countdown Indicator Repositioning

### Requirements
- Move the countdown from the bottom of the screen to the **top** of the UI on all pages.
- **Landing / Home page**: Position it near the existing daily puzzle status area and user login/status information.
- **Game / tab pages**: Position it near the top-right account/user area (Claude should choose the cleanest horizontal placement relative to the account pill).
- Keep the component non-intrusive, especially on mobile.
- It must remain clickable (navigates to the current daily).
- It must remain fully theme-ready.
- The existing global Settings toggle ("Daily countdown & reset alerts") continues to control its visibility and reset alert behavior.

## Integration & Scope
- Build directly on the excellent `src/daily/` modular service and `DailyCountdown.tsx` created during Prompt 2.
- All changes must preserve every existing invariant (daily puzzles remain exactly 5 letters, practice supports 2–35, stats, economy, auth/sync, resume behavior, etc.).
- The new calendar and repositioned countdown must feel cohesive with the current Lunar Signal Deck layout and minimalist default surface.

## Deliverables
- Fully functional Calendar as the first navigation tab, serving as the central hub for all daily access.
- Prominent "Play Today's OG" and "Play Today's GO" buttons on the calendar.
- Coin-gated unlocking flow for past dailies with the "one guess = permanently unlocked" persistence rule.
- Repositioned, context-aware countdown at the top of all pages.
- Necessary updates to navigation, routing, and state management.
- Updated tests covering the new flows.
- Clear documentation of any additional improvements discovered during implementation.

## Success Criteria
- Users can access both current and past dailies (OG and GO) through the new Calendar (first tab).
- Today's dailies are free and seamless to start.
- Past dailies require a one-time fixed coin payment and remain unlocked after partial progress.
- The countdown is now positioned at the top, non-intrusive, and contextually appropriate on both the landing page and game tabs.
- No regressions to any existing functionality or invariants.

## Process Requirements
- Strictly follow `CONSTITUTION.md` v3.3 at all times.
- Update `CHANGELOG.md` and all relevant progress tracking surfaces after every major step.
- Document any extra improvements or discoveries made while implementing.
- Halt for explicit user approval before creating the final Phase 22 PR.

**End of Addendum**
