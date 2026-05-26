---
layout: page
title: Deployment
---

# Deployment

`brrrdle` has two deployment surfaces:

1. The playable game, deployed to Vercel from the Vite production build.
2. The documentation/blog, deployed to GitHub Pages from the `docs/` directory with Jekyll.

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
```

Only use the public anon key in `VITE_*` variables. Never place service-role keys or privileged credentials in browser-exposed configuration.

## Game deployment on Vercel

The checked-in `vercel.json` configures Vercel for the Vite app:

- Framework: `vite`
- Build command: `npm run build`
- Output directory: `dist`

Deployment checklist:

1. Connect the repository to a Vercel project.
2. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` if account/cloud-sync features should be active.
3. Do not configure service-role keys as `VITE_*` values.
4. Deploy with the default Vercel build command from `vercel.json`.
5. Confirm the app loads, daily modes remain 5 letters, practice routes load, sharing works after a completed game, and the manifest/service worker are available.

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
- The documentation site builds as static Jekyll content from `docs/`.
