# Progress Step Report — Plan Amendment v1.2 (Hugging Face Word-List Source Integration)

## Step
- **Major step / phase**: Plan Amendment v1.2 — Hugging Face Word-List Source Integration
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` v1.2 — §1.1 Binding Principles (Hugging Face source bullets), §4 Phase 2 (updated Goal, Step 2.1, Step 2.3, new Step 2.5 — Daily Scheduled Hugging Face Refresh), §15 Known Constraints (HF source + timezone clarification)
- **Report file**: `progress/PROGRESS-STEP-12.md`
- **Date updated**: 2026-05-26
- **Status**: Complete — amendment implemented, all checks passing, awaiting user review

## Summary of Changes
- Added `src/data/huggingFaceSource.ts` exposing the authoritative upstream source constants — dataset ID `ryanjosephkamp/english-openlist`, folder `latest/brrrdle/`, the 34 expected length-indexed dictionaries (lengths 2 through 35 inclusive), per-length raw URL builders, and a `fetchHuggingFaceRemoteMetadata` helper that projects the Hugging Face dataset info endpoint (`sha`, `lastModified`) onto the existing `RemoteWordListMetadata` shape.
- Added the pure, testable `refreshWordListsFromHuggingFace` pipeline in `src/data/refresh.ts`. The pipeline fetches each requested length file via an injected `fetchJson`, validates the payload using the existing `validateWordListFile`, and accepts either full schema-shaped payloads or flat string-array payloads (with metadata injected from the refresh source info). The pipeline is all-or-nothing: a single failure aborts the refresh and surfaces per-length failure detail so the caller can safely leave previously persisted dictionaries in place.
- Recorded the bundled snapshot's Hugging Face dataset, folder, revision, generated-at timestamp, and lengths in `src/data/bundled/source.json` and exposed it as `BUNDLED_SOURCE` from `src/data/metadata.ts`. `BUNDLED_DATA_VERSION` and `BUNDLED_REMOTE_METADATA` now derive from this file so future ingests can be diffed and audited against a single source of truth.
- Added the scheduled Vercel Cron handler `api/cron/refresh-word-lists.ts`. The handler verifies `Authorization: Bearer ${CRON_SECRET}` (so it is not invokable by anonymous clients), fetches the current Hugging Face dataset revision, runs the shared `refreshWordListsFromHuggingFace` pipeline against `latest/brrrdle/`, and returns validated dictionaries with per-length counts on success or per-length failure detail on partial failure. The previous served set is preserved on any failure so gameplay is never blocked.
- Wired `api/admin-refresh.ts` to invoke the same shared refresh pipeline after Supabase admin authorization succeeds. Manual and scheduled refreshes now share one fetch/validate path, satisfying the plan requirement that they cooperate.
- Updated `vercel.json` with a `crons` entry that schedules `/api/cron/refresh-word-lists` at `0 0 * * *` (daily at 00:00 UTC). The default was chosen because Vercel Cron evaluates all schedules in UTC and 00:00 UTC sits after the upstream's nightly ~11 PM regeneration in most publishing timezones. `docs/deployment.md` documents the default explicitly and provides override instructions in case the upstream "around 11 PM" cadence is anchored to a specific non-UTC timezone.
- Added `CRON_SECRET` to `.env.example` with a clear, non-secret placeholder and explanatory comment.
- Expanded `docs/deployment.md` with sections covering the upstream Hugging Face source, the scheduled refresh job, persistence-layer guidance (Vercel Blob/KV, Supabase Storage, or build-time re-bundle — all without exposing service-role credentials), required environment variables, and an updated production verification checklist.
- Added unit tests `src/data/huggingFaceSource.test.ts` (URL construction, 34-length expectation, dataset-info projection, malformed and network-error paths) and `src/data/refresh.test.ts` (all-success refresh, flat-array payload coercion, atomic abort on schema failure, atomic abort on network failure, and revision propagation through injected source metadata).
- Updated `CHANGELOG.md` (Unreleased / Added) with one entry per substantive change.
- Updated `progress/PROGRESS.csv` with a row for this amendment.

## Files Changed
- `.env.example`
- `CHANGELOG.md`
- `api/admin-refresh.ts`
- `api/cron/refresh-word-lists.ts` (new)
- `docs/deployment.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-12.md` (new)
- `src/data/bundled/source.json` (new)
- `src/data/huggingFaceSource.ts` (new)
- `src/data/huggingFaceSource.test.ts` (new)
- `src/data/index.ts`
- `src/data/metadata.ts`
- `src/data/refresh.ts` (new)
- `src/data/refresh.test.ts` (new)
- `vercel.json`

## Verification
- **Checks run**:
  - `npm ci` — clean install, 0 vulnerabilities.
  - Baseline `npm run test`, `npm run lint`, `npm run build` before code changes — 97 tests passing, lint clean, build clean.
  - Post-change `npm run test` — 31 test files, **109 tests passing** (12 new tests across `huggingFaceSource.test.ts` and `refresh.test.ts`).
  - Post-change `npm run lint` — clean.
  - Post-change `npm run build` — `tsc -b` and Vite production build both succeed.
  - Targeted `npx eslint api/` — clean (covers the new cron route and updated admin-refresh).
  - CodeQL via `codeql_checker` — 0 alerts on the amendment changes.
  - Manual review confirming no Hugging Face credentials or service-role secrets are introduced in any committed file; `CRON_SECRET` placeholder in `.env.example` is clearly a placeholder.
- **Checks not run**:
  - Live invocation of `/api/cron/refresh-word-lists` against the Vercel deployment.
  - Live fetch against the Hugging Face dataset API and `latest/brrrdle/` folder.
  - End-to-end production storage swap (intentionally out of scope per `docs/deployment.md` — persistence layer is environment-specific).
- **Reason any checks were skipped**:
  - The agent runs in a sandbox without Vercel deployment access or live external network access to Hugging Face; those checks must be performed by the deployment owner during the production verification checklist in `docs/deployment.md`.

## Blockers, Errors, or Critical Notes
- **Timezone clarification (non-blocking, defaulted)**: The user did not specify the timezone for the upstream's "around 11 PM" regeneration or the brrrdle "maybe 12 AM" refresh. The cron schedule defaults to `0 0 * * *` = 00:00 UTC, which sits after the upstream's nightly regeneration in most publishing timezones. The default and override instructions are documented in `docs/deployment.md`. If the user wants a different timezone, the cron expression in `vercel.json` should be adjusted to the equivalent UTC time. This is configurable and not a hard blocker.
- **Production persistence (deferred by design)**: Both the cron route and `/api/admin-refresh` deliberately stop at "validated dictionaries returned to the caller." Persisting the refreshed dictionaries into the live serving layer is environment-specific (Vercel Blob/KV, Supabase Storage, or build-time re-bundle) and must be wired by the deployment owner. `docs/deployment.md` describes the recommended options and the no-service-role-credentials guardrail.

## User Action Required Before Next Step
- Review the amendment changes in this PR.
- Confirm the cron schedule timezone (or request a different schedule).
- Choose and wire the production persistence layer for the refreshed dictionaries, following the guidance in `docs/deployment.md`.
- Configure `CRON_SECRET` in the Vercel project environment before any deployment that intends to run the scheduled refresh.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes — all repository-side amendment work is complete, all checks pass, and no critical blocker requires agent action. The remaining items are deployment-environment configuration owned by the user.
- **Next major step**: User review of this amendment, followed by deployment-environment configuration of `CRON_SECRET` and the production persistence layer.
- **Exact approval needed, if any**: Per `CONSTITUTION.md` §4, no production deployment may occur without explicit user approval.

## Additional Notes / Annotations
- The refresh pipeline accepts both schema-shaped payloads and flat string-array payloads. This was a deliberate choice so the integration does not require coordinated changes to the Hugging Face publisher: if the dataset emits raw word arrays, the pipeline wraps them with source metadata derived from the upstream revision; if the dataset already emits brrrdle-shaped objects, the pipeline trusts the embedded metadata.
- The refresh pipeline is intentionally I/O-free except for the injected `fetchJson` callback, so both the cron route and the admin-refresh route share one tested code path. The test suite therefore covers all four required Step 2.5 scenarios (all-success, one-malformed, network failure, and unexpected-revision propagation) without any network access.
- `BUNDLED_DATA_VERSION` is now sourced from `src/data/bundled/source.json` rather than hard-coded in `metadata.ts`. The first successful refresh against the live Hugging Face dataset should update `source.json` with the real upstream revision so the bundled snapshot and live runtime stay aligned.
