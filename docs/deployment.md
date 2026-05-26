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

Production verification checklist:

1. Confirm the deployed bundle contains the expected launch seed lengths.
2. Confirm non-admin users cannot trigger `/api/admin-refresh`.
3. Confirm authenticated admin users can call `/api/admin-refresh` with `POST` where Supabase auth is configured.
4. Confirm failed update checks leave bundled data available so gameplay is not blocked.

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
