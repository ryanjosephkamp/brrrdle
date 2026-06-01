# Phase 20 Variant 03 Refinement Notes

Date: 2026-06-01
Branch: `variant-03-lunar-signal-deck`

## Requested Changes Captured

- Landing copy was revised to avoid "Daily Signal" wording and remove the original "Tune the next word" language.
- Rail subtitles for non-play tabs were changed from the generic "support" label to contextual labels such as Library, Contact, Reference, Progress, Controls, and Info.
- Visible "signal" wording in the Variant 03 shell was replaced with lunar/deck/tab language while leaving internal CSS names untouched.
- The side-panel Resume button was removed from the Variant 03 shell.
- Guest progress now supports independent resume slots for daily og, daily go, practice og, and practice go, preserving the legacy single resume slot for migration/backward compatibility.
- Practice og and practice go now restore independently when switching between practice modes.
- Practice go reveal controls now appear only after at least one submitted guess in the current puzzle.
- Practice og now has a matching Give Up / Reveal Answer control after at least one submitted guess.
- The custom cursor halo now renders above the game tiles, tabs, and panels instead of behind the main interface.
- About Brrrdle was moved into a dedicated route/tab with initial page-compatible content placeholders.

## Verification Targets

- Confirm no visible "Daily Signal" or landing "Tune the next word" copy remains.
- Confirm the rail shows contextual labels instead of "support" under Words, Feedback, Defs, Stats, Settings, and About.
- Confirm the custom cursor halo remains smooth and appears above panels on pointer devices.
- Confirm practice og progress remains after switching to practice go and back.
- Confirm practice go progress remains after switching to practice og and back.
- Confirm reveal controls are hidden on fresh practice puzzles and appear after a submitted guess.
- Confirm the final landing polish removes the large "Choose your next brrrdle" headline, moves "Daily puzzle ready" into the account/status chip area, and keeps the instruction copy below the planet/moon.

## Follow-up Refinement Pass

- Restored the landing instruction block to the desktop-centered placement while keeping tablet/phone-specific compact positioning so common mobile and iPad screens can keep the landing controls visible without overlapping the moon.
- Converted the per-game Customize surfaces on og, go, and practice games into collapsed-by-default disclosure panels while preserving all difficulty, default-save, hard-mode, and go-chain controls.
- Made the right-side system readout interactive: Account opens auth/profile/settings as appropriate, Sync can trigger configured cloud sync, Sound is a switch, Theme is a live selector, and the Hard Mode readout row was removed without changing the Settings or per-game hard-mode controls.
- Added paginated rendering to Word Explorer after filtering and sorting, with 10/50/100 row page-size options, preserving all entries, filters, sort buttons, definition lookup, copy actions, and request-word flow.

## Follow-up Verification Targets

- Confirm desktop landing copy is no longer globally pushed downward, while phone and iPad landing views fit within the viewport.
- Confirm Customize is collapsed by default on daily og, daily go, practice og, and practice go, and expands to the original controls.
- Confirm the HUD Account, Sync, Sound, and Theme controls update the same state reflected by Settings.
- Confirm the Hard Mode HUD row is gone, but Settings and per-game hard-mode controls remain available.
- Confirm Word Explorer renders only the selected page while filtering, sorting, copy, definition lookup, and request-word behavior still work.

## Final Pre-Selection Exploration Pass

- Fixed the Word Explorer Define action by rendering the shared Dialog through a document-body portal and above the custom cursor layer, so definition content appears as a true pop-up over the Lunar playfield instead of being clipped by the playfield shell.
- Removed the dormant landing page command box that displayed the focused tab name; the landing page now uses only the colored horizontal route chips as click targets for entering tabs.
- Updated the landing instruction copy to point users to the colored tabs and changed the landing dock to a single horizontal chip row with mobile overflow scrolling.

## Final Pre-Selection Verification Targets

- Confirm clicking Define in Word Explorer opens the same DefinitionPanel content used after games.
- Confirm the definition pop-up can be closed and remains above the Lunar cursor/overlay layers.
- Confirm the landing page no longer shows the gray/dark selected-tab command box.
- Confirm colored route chips remain clickable on desktop and mobile, with no landing overflow regression.
