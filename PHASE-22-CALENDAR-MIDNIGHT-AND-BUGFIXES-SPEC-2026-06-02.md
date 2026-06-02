# PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02.md

## Phase Overview
**Phase 22 – Advanced Calendar / Midnight Handling + Timezone-Aware Daily Reset (+ Targeted Bug Fixes)**

This phase makes the daily puzzle system respect the player’s local device time, mitigates easy gaming of the daily reset, adds a lightweight optional countdown indicator visible across the app, provides a subtle reset alert (visual + unique sound), and includes a developer debug tool. It also prepares the daily reset logic for potential future multiplayer daily variants.

## Primary Goals
1. Daily puzzles rollover at **local midnight** in the player’s device timezone.
2. Mitigate casual gaming of the daily reset via device time manipulation (balanced approach).
3. Add a **non-intrusive countdown indicator** visible on every page/tab by default (toggleable in Settings).
4. When a new daily becomes available, show a subtle visual alert + play a **brand new unique sound** to draw the user’s attention.
5. Add a hidden developer-only “Simulate Time” floating button (dev mode only) for easy manual testing.
6. Fix any small bugs or make improvements discovered during the work (documented in progress surfaces).
7. Design the daily reset logic modularly so it can later support a special multiplayer daily variant with separate statistics.

## Strict Invariants (Must Never Break)
- Daily puzzles remain **exactly 5 letters**.
- Practice mode continues to support word lengths 2–35.
- All existing daily completion records, resume slots, per-mode stats, and sync behavior must continue to work.
- No changes to multiplayer, marketplace, or economy systems (those come in later phases).
- Guest and signed-in progress/sync must remain consistent.

## What Claude Must Do First
Before writing code, Claude must:
1. Thoroughly explore and document the current daily puzzle system (generation, completion tracking, storage, rollover logic, and all dependent UI surfaces).
2. Produce a short internal mapping of key files and decision points.
3. Identify where the current rollover decision lives and how timestamps are stored/computed.

## Detailed Requirements

### 1. Timezone-Aware Local Midnight Rollover
- New daily becomes available at **midnight in the player’s local device timezone**.
- Use reliable browser APIs for timezone handling.
- Must work reasonably for users who travel or change device timezone.
- Claude should choose the cleanest maintainable approach.

### 2. Anti-Gaming Safeguards (Balanced)
- Detect and limit large forward time jumps that would unlock future dailies.
- Recommended balanced policy:
  - Allow normal drift and small adjustments (± \~2 hours).
  - Clamp or ignore forward jumps larger than \~12–24 hours.
  - On detection, keep the previous daily or show a clear friendly message.
- Goal: Make casual cheating ineffective without being overly strict.

### 3. Optional Countdown Indicator (Visible on Every Page + Theme-Ready)
- Add a **lightweight, non-intrusive countdown** showing time until next daily reset.
- Must appear on **every page/tab** of the app by default (unless user disables it globally in Settings).
- Placement: Claude has full freedom to choose the best non-intrusive location (especially considering mobile).
- **Clickable**: Tapping/clicking the countdown navigates to the daily game surface.
- **Theme-ready**: Designed from the start using CSS variables / data attributes so future themes can easily modify its appearance (colors and potentially more).
- **Reset alert** (when daily resets at local midnight):
  - A subtle, non-modal visual indicator appears on screen (e.g., toast, banner, or gentle glow) to indicate the new daily is ready.
  - A **brand new, unique sound** (not reused from any existing sound) plays to draw attention. This sound should be clearly distinguishable so users immediately recognize it means “new daily is available.”
- **Settings toggle**: One global toggle in Settings that:
  - Hides the countdown everywhere.
  - Disables the reset visual alert and the unique reset sound.

### 4. Developer “Simulate Time” Debug Tool (Dev Mode Only)
- Add a small **floating button** that only appears in development mode.
- Clicking it opens a panel allowing:
  - Setting a specific simulated date/time
  - Jumping forward/backward by hours or days
  - Resetting to real device time
- Primary access: floating button. Fallback: keyboard shortcut if needed.
- Must never appear in production builds.
- Purpose: Make manual testing of rollover behavior fast and reliable.

### 5. Future Multiplayer Daily Preparation (Modular Design)
- Design the daily reset / rollover logic in a clean, modular way (e.g., dedicated service or hook) so it can later support a **special multiplayer variant of the daily** with separate statistics.
- Do not implement any multiplayer daily functionality in this phase — only prepare the architecture.

### 6. Bug Fixes & Improvements
- Claude should automatically fix any small bugs or make obvious improvements discovered during exploration and implementation.
- All such changes must be clearly documented in the progress tracking surfaces.

## Scope

**In Scope**
- Local midnight daily rollover with timezone awareness
- Balanced anti-gaming safeguards
- Non-intrusive countdown indicator visible across all pages + clickable + theme-ready
- Subtle non-modal reset visual alert + brand new unique reset sound
- Global Settings toggle that disables countdown + reset alerts
- Hidden dev-mode floating Simulate Time button + panel
- Modular design preparation for future multiplayer daily variant
- Any small discovered bug fixes/improvements (documented)
- Tests, documentation, and progress tracking updates

**Out of Scope**
- Changing daily word length (stays 5)
- Any actual multiplayer implementation
- Per-tab hide/minimize of countdown (global toggle only)
- Major UI redesign or new full screens
- Large-scale refactoring

## Deliverables
- Updated daily handling code with local-midnight rollover + anti-gaming logic
- Countdown indicator (visible on all pages, clickable, theme-ready) + reset alert (subtle visual + brand new unique sound)
- Global Settings toggle for countdown + alerts
- Hidden dev-mode floating Simulate Time button + panel
- Modular structure prepared for future multiplayer daily
- New/updated tests (including time mocking)
- Any discovered bug fixes (documented)
- Updated `CHANGELOG.md` and progress tracking surfaces
- Clear manual testing notes

## Success Criteria
- Daily puzzles reliably rollover at player’s local midnight.
- Reasonable gaming attempts via large forward time jumps are mitigated.
- Countdown is visible across the app, non-intrusive (especially on mobile), clickable, and theme-ready.
- Reset alert (subtle visual + brand new unique sound) works when daily becomes available.
- Settings toggle correctly disables countdown + alerts.
- Developer Simulate Time tool exists and is useful.
- Daily reset logic is modular and ready for future multiplayer daily variant.
- No regressions in existing behavior.
- All verification gates pass.

## Constitution & Process Requirements
Claude must follow the current `CONSTITUTION.md` (v3.x) at all times:
- Additive, minimal-change approach
- Full verification after every major step
- Update `AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, and all progress surfaces
- Halt for explicit user approval before creating or merging any PR

**End of Spec**
