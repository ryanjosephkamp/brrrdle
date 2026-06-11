# PHASE-23-STAGE-5-MULTIPLAYER-UX-FIXES-AND-POLISH-SPEC-2026-06-05.md

**Phase**: 23 (Multiplayer Foundations and Polish)
**Stage**: 5
**Status**: Draft for user review
**Date**: 2026-06-05
**Source**: `brrrdle_phase23_stage5_ideas_2026_06_05.md`

## 1. Overview / Goal

This stage focuses on resolving the remaining high-priority multiplayer UX and correctness bugs that surfaced during real-account testing of Stage 4. The primary objective is to make Daily and Practice multiplayer (both Async and Live) feel reliable, intuitive, and consistent with user expectations, particularly around lobby visibility, joining flows, daily participation limits, and sign-in experience.

## 2. Scope

### 2.1 Bug Fixes (Required)

| Priority | Area                        | Issue                                                                 | Notes |
|----------|-----------------------------|-----------------------------------------------------------------------|-------|
| High     | Sign-in                     | Duplicate "Sign in" buttons in Email+Password flow; awkward button ordering | Remove first "Sign in" button; move "Create account" between "Sign in" and "Forgot password?" |
| High     | Daily Multiplayer Limits    | Currently restricts to only one live + one async daily total instead of 1 OG + 1 GO per transport | Must allow one Daily Live OG, one Daily Live GO, one Daily Async OG, one Daily Async GO |
| High     | Daily Live                  | "Join live lobby" button does not pulse/flash for non-host            | Non-hosts have no clear visual cue to click |
| High     | Daily Live                  | Joining a lobby as non-host fails to enter the game for both players (even after refresh) | Critical flow breakage |
| High     | Daily Live (GO)             | Brief flashing word-length selection screen appears when non-host joins (should not exist for daily) | Daily GO is fixed at 5 letters |
| High     | Practice Live               | Cannot enter lobby once rival has joined (same as Daily Live)         | Affects both OG and GO |
| High     | Practice Multiplayer        | Word length selection countdown starts as soon as lobby is created (should start only after rival joins) | |
| High     | Practice Live               | Lobbies not auto-entered after rival joins; word length selection message appears but no UI is shown | |

### 2.2 Features (Deferred / Optional for Stage 5)

The following items from the ideas document are **deferred** to later stages or future phases unless explicitly requested:

- Browser notifications system (highly configurable)
- Floating multiplayer game manager
- Multiplayer game timestamps
- Dedicated Themes tab + custom themes
- Dedicated History tab
- Turn transparency (who made each guess)
- Game data exports + GIF generation
- Practice vs Bots (Elo-based)
- General lichess.org-inspired design exploration

**Recommendation**: Keep Stage 5 tightly focused on the bug fixes above for quality and velocity. Consider adding only the lobby flashing/pulsing behavior if time permits, as it is relatively self-contained.

## 3. Out of Scope

- Dedicated Multiplayer tab implementation
- Any new competitive/rating features
- Notification system
- History/Theme tabs
- Bot opponents
- Major architecture changes

## 4. Key Requirements & Constraints

- All fixes must preserve existing invariants (daily = 5 letters, practice 2–35, solo-style board + on-screen keyboard in multiplayer, no consumables in multiplayer, safe rival/spectator identity, etc.).
- Daily participation limit must correctly support **four** independent daily buckets: `live:og`, `live:go`, `async:og`, `async:go`.
- Cancellation and claim logic from Stage 4 must remain consistent.
- Sign-in flow improvements should feel natural and reduce friction without changing auth behavior.
- All changes should be additive/minimal where possible and pass full test + browser smoke verification.

## 5. Deliverables

- Fixed sign-in button layout and ordering for Email + Password
- Corrected Daily Multiplayer participation limits (1 OG + 1 GO per live/async)
- Improved Daily Live lobby joining experience (pulsing button + reliable entry)
- Removal of erroneous word-length selection flash in Daily GO
- Fixed Practice Live lobby entry and word-length selection timing/UI
- Updated tests covering the fixed flows
- Updated documentation/progress surfaces (`AGENT-IMPLEMENTATION-PLAN.md`, `CHANGELOG.md`, `progress/PROGRESS-STEP-81.md`, etc.)

## 6. Success Criteria / Verification

- All listed bugs are resolved and no longer reproducible in desktop + 390px mobile browser smoke testing.
- `npm run test` passes with no regressions (target: 468+ passing).
- Daily Multiplayer limits behave as specified (user can complete one of each of the four daily buckets).
- Sign-in flow is clean and functional with only one working "Sign in" button in the expected location.
- No new console errors or layout issues introduced.
- Remote Supabase verification (where applicable) passes.

## 7. Recommended Approach

1. Start with sign-in UI cleanup (lowest risk, quick win).
2. Fix the Daily Multiplayer limit logic in domain + repository layers.
3. Address the Daily Live joining and pulsing button issues.
4. Fix the erroneous word-length flash in Daily GO.
5. Resolve the Practice Live entry and countdown timing problems.
6. Add/update focused tests for the affected flows.
7. Run full verification gate before halting for review.

Coordinate edits carefully on high-conflict surfaces (`src/app/App.tsx`, `src/multiplayer/`, auth flows) using the established multi-agent coordination rules.

## 8. Risks & Considerations

- Daily limit changes touch claim and participation logic that was recently stabilized in Stage 4 — changes must be surgical.
- Live joining flows have proven fragile in previous stages; thorough testing (including cross-client) is essential.
- Sign-in changes are user-facing and should feel like a polish improvement rather than a redesign.

## 9. Workflow Notes

This stage should follow the established pattern:
- Planning/governance pass first (`phase_id = XX`)
- Full execution pass after user approval (`phase_id = XX+1`)
- Halt for user review before any PR, merge, or release.

**Next step after this spec**: User review → `/planning-prompt` (or equivalent) → Codex planning pass → user approval → `/execution-prompt`.
