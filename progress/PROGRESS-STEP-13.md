# Progress Step Report — Plan Amendment v1.2 Follow-on (Production Persistence Layer + CRON_SECRET Deployment Docs)

## Step
- **Major step / phase**: Plan Amendment v1.2 Follow-on — Production Persistence Layer + CRON_SECRET Deployment-Environment Configuration
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` v1.2 — §4 Phase 2 Step 2.5 (Daily Scheduled Hugging Face Refresh: "Atomically replace the served set of dictionaries so a partial download or a single malformed file cannot corrupt the live word lists. Keep the previously served set available as a fallback until the new set is fully validated. Record the new Hugging Face revision and per-length status in update metadata so the Step 2.3 update check stays accurate."), §10 Phase 8 Step 8.6, §15 Known Constraints.
- **Report file**: `progress/PROGRESS-STEP-13.md`
- **Date updated**: 2026-05-26
- **Status**: Complete in-repository — all in-code work done, all checks passing. Two deployment-environment configuration steps remain owned by the user because they require Vercel dashboard access the agent does not have.

## Summary of Changes

### Production persistence layer

- Added the vendor-neutral `WordListStore` abstraction in `src/data/refreshStore.ts`. The interface declares `loadManifest()` and `atomicSwap({ refresh })`, plus the supporting `ServedManifest`, `ManifestEntry`, and `AtomicSwapResult` types. Concrete drivers are expected to follow the upload-then-pointer-swap discipline so that per-length failures cannot corrupt the live read path.
- Provided `InMemoryWordListStore` and `FailingInMemoryWordListStore` test doubles in the same module, plus a `projectManifest` helper that maps a `RefreshSuccess` onto the served-manifest shape. The helper is reused by both the in-memory and Vercel Blob drivers so manifest projection stays consistent.
- Added the production Vercel Blob driver `api/_lib/vercelBlobStore.ts`. The driver:
  1. Uploads each validated length file to `word-lists/<revision>/words_length_<n>.json` first; per-length failures abort with `previousServedSetIntact: true` because the manifest pointer has not yet been touched.
  2. Builds the manifest using the URLs returned by Vercel Blob.
  3. Atomically swaps the manifest pointer by writing `word-lists/manifest.json` with `allowOverwrite: true`. `put` either succeeds atomically or fails; readers cannot observe a half-written manifest.
- Added the server-side factory `api/_lib/wordListStore.ts`. It selects the Vercel Blob driver when `BLOB_READ_WRITE_TOKEN` is present in the environment; otherwise it returns `{ store: null, reason: ... }`. The factory keeps the project vendor-neutral so swapping in Supabase Storage, S3, or a different backend is a one-driver change.
- Wired `api/cron/refresh-word-lists.ts` and `api/admin-refresh.ts` to invoke `store.atomicSwap()` after the shared refresh pipeline succeeds. Persistence outcomes (`swapped`, `skipped`, `failed`) are surfaced in the JSON response and logged. Persistence failures return `502` so a partial state is never reported as success; persistence skipped (no store configured) still returns the validated payload so a caller can persist externally.
- Added the public read endpoint `api/word-lists/manifest.ts` (`GET /api/word-lists/manifest`). It returns the live manifest or `{ manifest: null }` when persistence is unconfigured. Public read access is intentional because the manifest and dictionaries derive from a public Hugging Face dataset and contain no secrets. The response includes a short `Cache-Control` so cheap client polling does not hammer the store.
- Added `src/data/refreshStore.test.ts` with five focused tests covering manifest projection, initial empty state, the upload-then-swap key discipline, prior-revision reporting across consecutive swaps, and the atomic-rollback contract on a simulated per-length failure.
- Added `@vercel/blob@^2.4.0` as a dependency. The package is server-only (imported solely by `api/_lib/vercelBlobStore.ts`); a post-build grep on `dist/` confirms it is not present in the client bundle.

### Deployment-environment documentation

- Added `BLOB_READ_WRITE_TOKEN` to `.env.example` with a clear non-secret placeholder and an explanatory comment matching the existing `CRON_SECRET` block.
- Expanded `docs/deployment.md`:
  - Rewrote the "Persisting the refreshed dictionaries" section to describe the shipped Vercel Blob driver, the atomic-swap discipline, and how to wire alternative backends (Vercel KV, Supabase Storage, S3, build-time re-bundle) by implementing the same `WordListStore` interface.
  - Added an "Environment variables for refresh" entry for `BLOB_READ_WRITE_TOKEN`.
  - Added a new "Deployment-environment configuration steps" section walking through provisioning a Vercel Blob store, setting `CRON_SECRET`, confirming `BLOB_READ_WRITE_TOKEN`, and re-deploying. Each step calls out that it must be done in the Vercel dashboard (the agent cannot do this from the sandbox).
  - Updated the production verification checklist with explicit checks for `BLOB_READ_WRITE_TOKEN` configuration, partial-failure behavior, and the new `GET /api/word-lists/manifest` route.

### Tracking artifacts

- Updated `CHANGELOG.md` (Unreleased / Added) with per-change entries for the persistence layer, the public manifest route, the new dependency, the new tests, and the documentation updates.
- Updated `progress/PROGRESS.csv` with a new row for this follow-on step.

## Files Changed
- `.env.example`
- `CHANGELOG.md`
- `api/admin-refresh.ts`
- `api/cron/refresh-word-lists.ts`
- `api/_lib/vercelBlobStore.ts` (new)
- `api/_lib/wordListStore.ts` (new)
- `api/word-lists/manifest.ts` (new)
- `docs/deployment.md`
- `package-lock.json`
- `package.json`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-13.md` (new)
- `src/data/index.ts`
- `src/data/refreshStore.ts` (new)
- `src/data/refreshStore.test.ts` (new)

## Verification
- **Checks run**:
  - `npm install @vercel/blob@latest` — installed `@vercel/blob@2.4.0`. `gh-advisory-database` reports 0 vulnerabilities for that version. `npm audit` reports 0 vulnerabilities for the resolved tree (the earlier 0.27.3 version pulled in a vulnerable `undici`, which is why the latest major was selected).
  - `npm run test` — 32 test files, **114 tests passing** (5 new in `refreshStore.test.ts`, plus the 12 added in the prior amendment).
  - `npm run lint` — clean.
  - `npm run build` — `tsc -b` (project references) and Vite production build both succeed.
  - Standalone `tsc --noEmit` on the four api/ TS files (cron, admin, manifest read, factory, driver) — clean. The project's `tsc -b` does not include `api/` in `tsconfig.app.json`, so this standalone check provides explicit type coverage for the route surface.
  - `npx eslint api/` — clean (covers all routes including the new manifest and driver).
  - Client-bundle leak check — `grep -l "vercel/blob\|BlobAccessError" dist/assets/*.js` reports no match; the server-only dependency does not appear in the Vite client bundle.
  - `codeql_checker` — 0 alerts on the changes.
  - Manual review confirming no Hugging Face credentials, no Vercel service-role keys, and no other privileged secrets are introduced into committed files; `BLOB_READ_WRITE_TOKEN` placeholder in `.env.example` is clearly a placeholder.
- **Checks not run**:
  - Live invocation of `GET /api/word-lists/manifest`, `POST /api/cron/refresh-word-lists`, and `POST /api/admin-refresh` against a Vercel deployment.
  - Live atomic swap against a real Vercel Blob store.
  - Live Vercel Cron schedule confirmation in the Vercel dashboard.
- **Reason any checks were skipped**:
  - The agent runs in a sandbox without Vercel project access, without a real `BLOB_READ_WRITE_TOKEN`, and without the ability to set environment variables in the Vercel dashboard. Those checks must be performed by the deployment owner during the production verification checklist in `docs/deployment.md`.

## Blockers, Errors, or Critical Notes
- **Deployment-environment configuration must be done by the user (not blocking the in-repo work, but required before the persistence layer can be exercised in production).** The agent cannot configure environment variables in the Vercel dashboard from this sandbox. The required steps are documented end-to-end in `docs/deployment.md` ("Deployment-environment configuration steps") and reduce to: provision the Vercel Blob store, set `CRON_SECRET` to a long random value in Production/Preview/Development scopes, confirm `BLOB_READ_WRITE_TOKEN` is exposed by the linked Blob store, and re-deploy.
- **Timezone clarification (still open from the prior amendment)**: The cron defaults to `0 0 * * *` (00:00 UTC) because the upstream's "around 11 PM" cadence was not anchored to a specific timezone. The default and override instructions remain documented; no change in this step.

## User Action Required Before Next Step
- In the Vercel dashboard for the project:
  1. Storage → Create Database → Blob → create the store (this exposes `BLOB_READ_WRITE_TOKEN` to the linked project automatically).
  2. Settings → Environment Variables → add `CRON_SECRET` with a long random value (e.g. from `openssl rand -hex 32`) to Production/Preview/Development.
  3. Confirm `BLOB_READ_WRITE_TOKEN` appears in the Environment Variables list for the same scopes.
  4. Re-deploy so the function runtime picks up the new environment variables; Cron schedules in `vercel.json` are read at deploy time.
- After deploy, walk the production verification checklist in `docs/deployment.md`, especially:
  - `POST /api/cron/refresh-word-lists` without the correct `Authorization: ****** header returns `401`.
  - `GET /api/word-lists/manifest` returns the live manifest after the first successful refresh.
  - A simulated partial failure (e.g. a malformed length file in `latest/brrrdle/`) does not corrupt the served manifest.

## Authorization to Proceed
- **Safe/authorized to proceed to next major step?**: Yes — all in-repository work for the persistence layer and deployment documentation is complete and verified. The remaining items are deployment-environment configuration owned by the user.
- **Next major step**: User performs the Vercel-dashboard configuration steps above, then walks the production verification checklist. Per `CONSTITUTION.md` §4, no production deployment may occur without explicit user approval.
- **Exact approval needed, if any**: Explicit user approval before any production deployment, per the constitution.

## Additional Notes / Annotations
- The chosen production driver is Vercel Blob, picked because (a) the project is already on Vercel, (b) Vercel Blob is the canonical first-party object store and ships an actively maintained SDK that integrates cleanly with serverless functions, and (c) Vercel Blob's `put` is atomic and supports the upload-then-pointer-swap pattern with `allowOverwrite: true`. The `WordListStore` interface keeps this decision reversible — swapping to Supabase Storage, S3, or Vercel KV requires replacing only one driver file and updating the factory.
- `@vercel/blob` was upgraded from the earlier `0.27.3` candidate to `2.4.0` because the older majors transitively depend on a vulnerable `undici`. The current `2.4.0` has no advisories per both `gh-advisory-database` and `npm audit`.
- The cron route now returns persistence outcomes (`swapped`, `skipped`, `failed`) in the JSON response so the Vercel Cron logs surface what actually happened, not just whether the upstream fetch succeeded. This makes operational drift (e.g. a missing `BLOB_READ_WRITE_TOKEN` in a preview environment) visible without code changes.
- The public manifest read endpoint is intentionally cache-friendly (`max-age=300, s-maxage=300, stale-while-revalidate=86400`). A 5-minute fresh window keeps the read path cheap during a session while still picking up nightly refreshes promptly.
