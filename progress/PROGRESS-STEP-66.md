# Progress Step Report — Phase 22 Addendum (Calendar & Countdown Positioning)

## Step
- **Major step / phase**: Phase 22 Addendum — Calendar (Central Daily Hub) & Countdown Positioning planning/governance step.
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §27.10 and `PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md`.
- **Report file**: `progress/PROGRESS-STEP-66.md`
- **Date updated**: 2026-06-03
- **Status**: Completed — awaiting explicit user approval before any addendum implementation.

## Summary of Changes
This was a planning + governance-only prompt for the newly uploaded `PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md`. It binds the addendum into the implementation plan (as §27.10, extending the existing Phase 22 §27 work), records the Calendar-as-central-daily-hub feature, the coin-gated past-daily model, and the countdown repositioning, and updates the changelog and progress tracking. It intentionally did **not** implement any calendar, navigation, routing, state-management, countdown-repositioning, economy, or other source code. The finalized Phase 21 surface foundation and every existing mechanic — including the Phase 22 Prompt 2 `src/daily/` daily-cycle work — remain 100% intact.

## Review Performed Before Changes
- Read `PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md` (authoritative spec for this addendum) in full.
- Re-read `CONSTITUTION.md` v3.3 governance, scope, and progress-tracking rules.
- Reviewed `AGENT-IMPLEMENTATION-PLAN.md` header, Current Phase Index, and §27 (§27.1–§27.9) for precedent and to find the correct insertion point.
- Reviewed `PHASE-22-CALENDAR-MIDNIGHT-AND-BUGFIXES-SPEC-2026-06-02.md` (the original Phase 22 spec) for continuity.
- Reviewed `progress/PROGRESS-STEP-65.md` and the Phase 22 Prompt 2 work (`src/daily/` modular service, `DailyCountdown.tsx`, `App.tsx`, `OgGame.tsx`/`GoGame.tsx`, Settings toggle) that this addendum builds upon.
- Reviewed `progress/PROGRESS.csv` (last row `phase_id = 65`) and the top of `CHANGELOG.md`.

## Files Changed
- `AGENT-IMPLEMENTATION-PLAN.md`
  - Bumped Plan Version 2.8 → 2.9 and refreshed the date to 2026-06-03.
  - Extended the amendment-history line to record Phase 22 Prompt 2 completion (`phase_id = 65`) and the new §27.10 addendum.
  - Updated the **Current Phase Index** Phase 22 row to reflect Prompt 1 + Prompt 2 complete and the §27.10 governance step (`phase_id = 66`).
  - Appended **§27.10 "Phase 22 Addendum – Calendar (Central Daily Hub) & Countdown Positioning"** with: purpose/relationship to Prompt 2, the Calendar feature requirements, the coin-cost model (recommended 60 coins pending confirmation), the countdown repositioning, strict rules/invariants, planned deliverables, the two-prompt workflow, and open questions/recommendations.
- `CHANGELOG.md`
  - Added the Phase 22 Addendum governance entry under Unreleased (`phase_id = 66`).
- `progress/PROGRESS.csv`
  - Appended `phase_id = 66` for this governance-only step.
- `progress/PROGRESS-STEP-66.md`
  - Created this report.

## Explicitly Not Changed
- No `src/`, `api/`, or `supabase/` files changed.
- No Calendar UI/component, navigation/tab, routing, or state-management code implemented.
- No countdown-repositioning code; `DailyCountdown.tsx` and its current placement are untouched.
- No economy code for the past-daily coin cost (the value is only recommended, pending user confirmation).
- No removal of the existing dedicated OG/GO Daily tabs.
- No multiplayer or marketplace changes; no PR created or merged.

## Coin-Cost Recommendation
- The spec requests a fixed cost in the 50–75 range (≈ 5 average practice games). **Recommended: 60 coins** — a round mid-band figure, non-trivial but not discouraging. Final value to be confirmed by the user before execution.

## Open Questions / Recommendations
1. Confirm the past-daily coin cost (proposed **60**, range 50–75).
2. Confirm streak semantics for unlocked past dailies (recommended: record stats but do not retroactively alter streak continuity).
3. Confirm whether the old dedicated OG/GO Daily tabs are fully removed (recommended) vs. hidden/redirected to the Calendar.
4. Confirm calendar history depth (how far back past dailies are selectable, and access to days before the user's first play).

## Verification
- `git diff --check` — clean.
- `progress/PROGRESS.csv` parse check — all rows 12 columns, last row `phase_id = 66`.
- No source, test, or build-config changes, so the lint/test/build baseline is unchanged from Phase 22 Prompt 2 (`npm run lint` clean; `npm run test` 370/370; `npm run build` succeeds).

## Blockers, Errors, or Critical Notes
- None.

## Authorization to Proceed
- **Safe/authorized to begin implementation?**: No — halt for explicit user approval before any addendum execution.
- **Next major step**: Phase 22 Addendum full execution (`phase_id = 67+`) after explicit user instruction and confirmation of the open questions.
- **Exact approval needed**: explicit user instruction to begin execution (and ideally the confirmed coin-cost value).
