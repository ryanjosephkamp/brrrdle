# LOCAL-WORD-LISTS-SPEC-2026-05-28.md

**Title:** Switch to Local brrrdle Word List JSONs (src/latest/brrrdle/)  
**Date:** 2026-05-28  
**Version:** 1.0  
**Author:** Grok (for Claude Opus 4.7 Copilot agent)  
**Applies to:** brrrdle repository (Phase 17 addendum)

## 1. Goals & Success Criteria

The user has manually placed the **most recent** `latest/brrrdle/` folder (containing the 34 authoritative JSON files — one per word length 2 through 35) directly into the repository at `src/latest/brrrdle/`.

**Goal**: Make the brrrdle app load `answers` and `validGuesses` **directly from these local JSON files at build time**, eliminating the runtime fetch from Hugging Face (which is currently failing).

**Success criteria (must be met):**
- All word lists (`answers` + `validGuesses` + definitions where present) for lengths 2–35 are loaded from the local `src/latest/brrrdle/` JSON files.
- Daily `og` / `go` (fixed at 5 letters) and practice mode (2–35) continue to work exactly as before.
- The existing curated `answers` subset logic (from BRRRDLE-ANSWERS-CURATION-SPEC) remains fully respected.
- Runtime Hugging Face fetch / Vercel Blob refresh is no longer required for normal gameplay (it may remain as an optional admin override).
- No regressions to any existing feature (Admin tab, Auth, Word Explorer, Feedback, Sound Effects, Pay-to-Continue, etc.).
- All tests pass, build succeeds, and no `@vercel/blob` leaks into the client bundle.
- The change is minimal, non-breaking, and preserves all CONSTITUTION.md invariants.

## 2. Current Problems

- The app is still attempting to fetch word lists from Hugging Face at runtime (or falling back to tiny seed data), even though the full, up-to-date JSONs now exist locally in `src/latest/brrrdle/`.
- This causes the “word not in list” issues and incomplete practice lengths the user has reported.
- The current data layer is overly complex with remote fetching that is unreliable in the current environment.

## 3. Proposed Solution

- Treat `src/latest/brrrdle/` as the **single source of truth** for word lists.
- Update the data layer (`src/data/`) to statically import or lazily load the 34 JSON files from `src/latest/brrrdle/words_length_N.json`.
- Keep the existing curated `answers` subset logic (stratified sampling, quality score, metadata.curation block) — it should now run against the local files at build time or on first load.
- Deprecate (but do not remove) the runtime Hugging Face fetch path for normal gameplay. The protected `/api/admin-refresh` route may remain as an optional manual override.
- Update any metadata/manifest files (`src/data/bundled/source.json`, etc.) to point to the local latest snapshot.
- Ensure the practice length selector and daily modes continue to work perfectly with the new local data.

## 4. Technical Requirements

- Use static `import()` or dynamic `import()` for the JSON files so the app remains fast (daily length 5 must stay lightweight).
- Preserve the existing `loadWordList`, `getWordRepository`, `validateGuess`, etc. public contracts.
- Keep the full `validGuesses` array and the curated `answers` subset exactly as defined in BRRRDLE-ANSWERS-CURATION-SPEC-2026-05-27.
- Update `src/data/wordLists.ts`, `src/data/loadWordList.ts`, `src/data/wordRepository.ts`, and any related files.
- Update `src/data/index.ts` barrel exports as needed.
- No new dependencies. No deletions of existing files or functionality.
- Add/update tests to verify that lengths 2–35 now load the real local JSON content.

## 5. Files Expected to Change / Be Created

**New / Updated files:**
- `src/data/localWordLists.ts` (or similar) — main loader for `src/latest/brrrdle/`
- Updates to:
  - `src/data/wordLists.ts`
  - `src/data/loadWordList.ts`
  - `src/data/wordRepository.ts`
  - `src/data/index.ts`
  - `src/data/bundled/source.json` (or equivalent metadata)
- Tests: `src/data/loadWordList.test.ts`, `src/data/wordRepository.test.ts`, etc.
- `CHANGELOG.md`, `AGENT-IMPLEMENTATION-PLAN.md`, progress files

**Unchanged (preserved):**
- All game logic, auth, UI tabs, sound effects, etc.

## 6. Agent Instructions

1. Read (in order):
   - `CONSTITUTION.md`
   - `LOCAL-WORD-LISTS-SPEC-2026-05-28.md` (this file)
   - `AGENT-IMPLEMENTATION-PLAN.md`
   - `BRRRDLE-SPEC.md`
   - Current data layer files in `src/data/`
   - The new `src/latest/brrrdle/` folder contents

2. Append a new **Phase 17** addendum to `AGENT-IMPLEMENTATION-PLAN.md` titled something like:
   "Phase 17 — Use Local brrrdle Word List JSONs from src/latest/brrrdle/"

3. The new plan amendment must include:
   - Clear diagnosis of the current remote-fetch problem
   - Minimal, non-breaking implementation steps
   - Full verification checklist (lint, test, build, bundle-leak check)
   - Progress tracking updates
   - Explicit halt for user approval before any code changes

4. After drafting the new plan amendment, **halt** and provide a clear status report for user review.

Do **not** make any code changes yet. Only update the implementation plan.

**End of spec.**
