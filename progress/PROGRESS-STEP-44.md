# Progress Step Report — Phase 18.8

## Step
- **Major step / phase**: Phase 18.8 — Supabase preference sync (incl. difficulty tier) + resume-ready shapes
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §23.9, §23.10 (`phase_id = 44`)
- **Report file**: `progress/PROGRESS-STEP-44.md`
- **Date updated**: 2026-05-30
- **Status**: Completed — continuing to Phase 18.9

## Summary of Changes
- Confirmed the full `GuestProgressState.settings` (including the Phase 18.3 `difficultyDefault`) already round-trips through Supabase via `progress_snapshots` (`sync.ts`) and the conflict merge `mergeGuestProgressIntoCloud` (`guestTransfer.ts`) — no schema change needed for the tier to sync when signed in.
- Hardened the settings merge: the winning settings object (selected by the existing history-length recency proxy) is now passed through `normalizeGuestSettings`, guaranteeing the tier — and any future additive field — is present and migration-safe across cloud round-trips even if one side persisted an older shape.
- Made the reserved, forward-compatible `resumeSlot` survive merges (`local.resumeSlot ?? cloud.resumeSlot`). Always `undefined` today; preserving it keeps the serialization shape stable for a future "resume most recent unfinished game" feature without another migration. No behaviour change.

## Files Changed
- `src/account/guestTransfer.ts` — import `normalizeGuestSettings`; normalize winning settings; preserve `resumeSlot`.
- `src/account/guestTransfer.test.ts` — 3 new tests (tier persistence both directions; missing-tier normalization fallback; resume-slot preservation).

## Verification
- **Checks run**: `npm run lint` (clean); `npm run test` (292/292, 3 new, 0 removed/skipped/weakened); `npm run build` (clean); `npx tsc -p tsconfig.api.json --noEmit` (clean); `git diff --check` (clean); client-bundle leak grep against `dist/` — no `@vercel/blob`, no `service_role`, Hugging Face occurrences unchanged (1, pre-existing).
- **Checks not run**: CodeQL (deferred to the 18.9 release gate).
- **Reason any checks were skipped**: none material.

## Blockers, Errors, or Critical Notes
- Settings sync remains whole-object (no per-field timestamps); the history-length recency proxy is unchanged from existing behaviour. This is consistent with how `hardModeDefault`/`reducedMotion` already synced; field-level preference merging is out of scope for Phase 18.

## User Action Required Before Next Step
- None (contiguous execution authorized).

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes.
- **Next major step**: Phase 18.9 — Final integration, cross-feature verification & release gate (full §23.12 pipeline + CodeQL).
- **Exact approval needed, if any**: None.

## Additional Notes / Annotations
- Invariants preserved: additive-only with safe defaults; data-preserving; no secrets; daily 5-letter lock and practice 2–35 untouched.
