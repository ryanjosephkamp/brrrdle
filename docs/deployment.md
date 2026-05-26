---
layout: page
title: Deployment
---

# Deployment

`brrrdle` has two deployment surfaces:

1. The playable game, deployed to Vercel from the Vite production build.
2. The documentation/blog, deployed to GitHub Pages from the `docs/` directory with Jekyll.

Production deployment must wait for explicit release approval after PR review. Do not merge the release PR or trigger Vercel production deployment until approval is given.

## Local setup

Run from the repository root:

```bash
npm ci
npm run dev
```

Use `.env.local` for local public Supabase configuration when needed:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-public-anon-key
```

`VITE_*` values are browser-exposed public configuration. Only use the public project URL and public anon key. Never place service-role keys, JWT signing secrets, database passwords, or privileged credentials in `VITE_*` variables or committed files.

`SUPABASE_URL` and `SUPABASE_ANON_KEY` are server-side aliases for Vercel functions such as `/api/admin-refresh`. They should use the same public Supabase URL and anon key unless the deployment environment intentionally exposes the `VITE_*` values to serverless functions. Do not use service-role credentials for `SUPABASE_ANON_KEY`.

## Game deployment on Vercel

The checked-in `vercel.json` configures Vercel for the Vite app:

- Framework: `vite`
- Build command: `npm run build`
- Output directory: `dist`

Vercel environment variable checklist:

1. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` when account/cloud-sync features should be active in the browser.
2. Configure `SUPABASE_URL` and `SUPABASE_ANON_KEY` for `/api/admin-refresh` unless the serverless environment is confirmed to receive the `VITE_*` values.
3. Confirm all four values are the project URL or public anon key only.
4. Confirm no service-role keys or privileged secrets are configured as public `VITE_*` values.
5. Keep production, preview, and development variables aligned intentionally; do not copy secrets from unrelated projects.

Deployment checklist:

1. Connect the repository to a Vercel project.
2. Confirm the Vercel project uses the checked-in `vercel.json` settings.
3. Configure the environment variables above if Supabase-backed features should be active.
4. Deploy from the reviewed and approved `main` branch only after explicit approval.
5. Confirm the app loads, daily modes remain 5 letters, practice routes load, sharing works after a completed game, and the manifest/service worker are available.

## Protected admin refresh route

`POST /api/admin-refresh` is the protected manual refresh route for deployment environments.

Required request properties:

- Method: `POST`.
- Header: `Authorization: Bearer <supabase-access-token>`.
- Supabase user metadata: `app_metadata.role === "admin"` or `app_metadata.roles` containing `"admin"`.

Expected authorization behavior:

- Missing Supabase configuration, missing bearer token, or invalid token: `401 Unauthorized`.
- Valid authenticated non-admin user: `403 Forbidden`.
- Valid authenticated admin user: `202 Accepted` with a placeholder acknowledgement until the production refresh job is wired.

The route currently verifies authorization and intentionally does not embed privileged refresh credentials. If a future production refresh job needs elevated access, keep those credentials server-only and never expose them through `VITE_*` variables.

## Word-list update checks and manual refresh

The v1 data strategy is hybrid:

- Bundled word-list seed data ships with the Vite production build.
- Runtime update-check helpers can compare bundled metadata with newer production metadata.
- Protected manual refresh is exposed through `/api/admin-refresh` and must remain limited to authenticated Supabase users with the `admin` role.
- A scheduled refresh job (`/api/cron/refresh-word-lists`) runs once daily to sync the served dictionaries with the authoritative upstream Hugging Face dataset.

### Upstream source

The authoritative upstream word-list source is the Hugging Face dataset:

- Dataset: <https://huggingface.co/datasets/ryanjosephkamp/english-openlist>
- Folder: `latest/brrrdle/`
- Contents: exactly 34 length-indexed JSON dictionaries, one per word length from 2 through 35 inclusive.

The upstream dataset is regenerated nightly at approximately 11 PM. The dataset is public, so no Hugging Face credentials are required or committed; anonymous read access is sufficient.

The bundled snapshot revision and folder are recorded in `src/data/bundled/source.json` and surfaced as `BUNDLED_SOURCE` for verification.

### Scheduled refresh (Vercel Cron)

`vercel.json` configures Vercel Cron to invoke `POST /api/cron/refresh-word-lists` on the schedule `0 0 * * *` (every day at **00:00 UTC**). This is intentionally a default chosen for predictability: the upstream regeneration finishes around 11 PM in its publishing timezone and the brrrdle refresh runs shortly afterward.

If the upstream "around 11 PM" cadence is anchored to a specific non-UTC timezone, the brrrdle schedule should be moved to match. Vercel Cron schedules are always evaluated in UTC, so a different local target (for example, midnight US/Pacific = 08:00 UTC) is expressed by changing the cron expression in `vercel.json`. After changing the schedule, re-deploy so Vercel picks up the new cron configuration.

The cron route:

1. Verifies the `Authorization: Bearer <CRON_SECRET>` header attached by Vercel Cron to scheduled requests. Missing or mismatched secrets return `401 Unauthorized`, so the route is not invokable by anonymous clients.
2. Fetches the current dataset revision from `https://huggingface.co/api/datasets/ryanjosephkamp/english-openlist`.
3. Runs the shared atomic `refreshWordListsFromHuggingFace` pipeline against `latest/brrrdle/`, fetching all 34 length-indexed JSON dictionaries and validating each against the brrrdle schema.
4. Returns the validated dictionaries plus per-length counts on success (`200`), or per-length failure detail on partial failure (`502`). The previous served set remains in place on any failure so gameplay is never blocked by a bad upstream revision.

### Persisting the refreshed dictionaries

Validated dictionaries are persisted server-side via a pluggable `WordListStore` abstraction (`src/data/refreshStore.ts`). The repository ships one production driver — Vercel Blob (`api/_lib/vercelBlobStore.ts`) — selected automatically when `BLOB_READ_WRITE_TOKEN` is configured. To use a different backend (Vercel KV, Supabase Storage, S3, etc.), implement the `WordListStore` interface and update the factory in `api/_lib/wordListStore.ts`.

Atomic-swap discipline (enforced by the Vercel Blob driver and by the `WordListStore` contract):

1. Each validated length file is uploaded to `word-lists/<revision>/words_length_<n>.json` first. Per-length uploads are independent; if any one fails, the swap aborts before the manifest pointer is touched and the previously served manifest remains live.
2. Only after every length upload succeeds does the driver write `word-lists/manifest.json` (with `allowOverwrite: true`). `put` either succeeds atomically or fails; readers cannot observe a half-written manifest.
3. `GET /api/word-lists/manifest` reads the current manifest from the store and returns `{ ok: true, manifest }` (or `{ ok: true, manifest: null }` when persistence is not configured / no manifest has been written yet). Clients fall back to the bundled seed when no manifest is available.

Alternative persistence approaches that conform to the same `WordListStore` contract:

- **Vercel KV**: write each length under a versioned key and update a `current-revision` pointer key last.
- **Supabase Storage**: write to a private bucket under a per-revision prefix and atomically move the `current` pointer using a server-only service-role key. Never expose service-role credentials in `VITE_*` variables or in committed files.
- **Re-deploy with refreshed seeds**: have the cron post the validated payload to a Git-backed pipeline that updates `src/data/bundled/` and triggers a new Vercel build. Re-uses the existing bundled-asset path but adds deployment latency.

### Environment variables for refresh

- `CRON_SECRET`: shared secret authorizing scheduled invocations of `/api/cron/refresh-word-lists`. Generate a long random value (for example, `openssl rand -hex 32`) and configure it identically in the Vercel project environment so Vercel Cron and the function agree.
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob read/write token for the production persistence layer. When set, `/api/cron/refresh-word-lists` and `/api/admin-refresh` atomically swap the served manifest. When unset, the refresh pipeline still validates upstream files but persistence is skipped and the existing bundled seed remains the served source. Obtain this token from the Vercel project's Blob store settings.
- `SUPABASE_URL`, `SUPABASE_ANON_KEY`: server-side aliases used by `/api/admin-refresh` for Supabase user/role lookup. Already documented above.
- No Hugging Face credentials are needed — the dataset is public.

### Deployment-environment configuration steps

These steps must be performed in the Vercel dashboard or via the Vercel CLI; they cannot be performed from the repository.

1. **Provision the Vercel Blob store**. In the Vercel dashboard, open the project → Storage → Create Database → Blob. Create the store; Vercel automatically exposes `BLOB_READ_WRITE_TOKEN` to the linked project.
2. **Set `CRON_SECRET`**. In the Vercel dashboard, open the project → Settings → Environment Variables. Add `CRON_SECRET` with a long random value to the Production, Preview, and Development scopes that should accept scheduled refreshes. The same value will be attached by Vercel Cron as `Authorization: ****** on scheduled invocations.
3. **Verify `BLOB_READ_WRITE_TOKEN`** is also present in the same scopes (Vercel sets this automatically when the Blob store is linked, but confirm in the Environment Variables list).
4. **Re-deploy** so the function runtime picks up the new environment variables. Cron schedules in `vercel.json` are read at deploy time.
5. **Manually validate** the protected routes after deploy (see Production verification checklist below).

### Production verification checklist

1. Confirm the deployed bundle contains the expected launch seed lengths and that `src/data/bundled/source.json` reflects the intended revision.
2. Confirm `CRON_SECRET` and `BLOB_READ_WRITE_TOKEN` are set in the Vercel project environment for the relevant deployment.
3. Confirm a manual `POST /api/cron/refresh-word-lists` without the correct `Authorization: ****** header returns `401`.
4. Confirm Vercel Cron is configured with the schedule in `vercel.json` (default: `0 0 * * *`).
5. Confirm non-admin users cannot trigger `/api/admin-refresh`.
6. Confirm authenticated admin users can call `/api/admin-refresh` with `POST` where Supabase auth is configured.
7. Confirm a partial failure (any single length malformed or unreachable) does not corrupt the live serving layer — `GET /api/word-lists/manifest` continues to return the previously served manifest.
8. Confirm `GET /api/word-lists/manifest` returns the latest manifest after a successful cron or admin refresh, including the upstream revision, generated-at timestamp, and per-length URLs.
9. Confirm failed update checks leave bundled data available so gameplay is not blocked.

## PWA manifest and service worker

Production PWA assets are checked in under `public/`:

- `public/manifest.webmanifest`
- `public/brrrdle-sw.js`
- `public/favicon.svg`
- `public/icons/icon.svg`
- `public/icons/maskable.svg`

PWA verification checklist:

1. Confirm `/manifest.webmanifest` returns valid JSON and references existing icons.
2. Confirm `/brrrdle-sw.js` is served by the production deployment.
3. Confirm first load succeeds online and subsequent shell fallback works where service workers are supported.
4. Confirm service worker cache updates are safe when deploying a new build.

## GitHub Pages + Jekyll docs deployment

The docs surface lives in `docs/` and uses the `minima` Jekyll theme through `docs/_config.yml`.

GitHub Pages checklist:

1. In repository settings, enable GitHub Pages.
2. Select the branch used for releases and set the Pages source folder to `/docs`.
3. Confirm Pages builds `docs/index.md`, `docs/deployment.md`, and `docs/supabase.md`.
4. Keep docs content separate from the Vercel-hosted game so Pages routing does not affect the app in `dist/`.

## Verification before release

Run the repository checks from the root:

```bash
npm run test
npm run lint
npm run build
```

Manual smoke checklist:

- `og` daily loads at 5 letters.
- `go` daily loads at 5 letters.
- Practice mode can select available launch seed lengths.
- Hard Mode rejects guesses that violate revealed feedback.
- Pay-to-Continue appears after losses, blocks insufficient coin balances, and spends coins for one more attempt when affordable.
- Post-game definitions and Google search fallback remain available.
- Share text appears after completion and can be shared or copied where supported.
- Settings account panel clearly reports whether Supabase is configured.
- Admin route remains locked unless a signed-in user has the admin role.
- Manifest and service worker assets are available from production.
- The documentation site builds as static Jekyll content from `docs/`.
