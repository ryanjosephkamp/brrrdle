# brrrdle

`brrrdle` is a Wordle + Hurdle hybrid web game. It includes classic `og` puzzles, chained `go` sessions, guest progress, optional Supabase account sync, post-game definitions, emoji sharing, and PWA foundations.

The implementation is governed by `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, and `AGENT-IMPLEMENTATION-PLAN.md`.

## Current status

Phase 10 documentation is in progress. Implemented foundations include:

- React 19 + TypeScript + Vite + Tailwind CSS v4 app shell.
- Daily `og` and `go` modes fixed at 5 letters for launch.
- Practice gameplay using available launch seed lengths in the approved 2–35 range.
- Hard Mode, keyboard input, definitions, local guest persistence, progression/statistics, Pay-to-Continue, optional Supabase account sync, protected admin-route foundations, sharing, and PWA shell caching.
- GitHub Pages + Jekyll docs in `docs/`.

## Local development

```bash
npm ci
npm run dev
```

Use `npm install` only when intentionally changing dependencies. Use `npm ci` for reproducible setup from the lockfile.

## Verification

```bash
npm run test
npm run lint
npm run build
```

`npm run preview` can be used after `npm run build` to smoke-check the production build locally.

## Environment variables

Copy `.env.example` to `.env.local` for local Supabase configuration.

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Only public browser-safe Supabase values may be exposed through `VITE_*` variables. Never commit service-role keys or privileged credentials.

## Supabase and admin setup

See `docs/supabase.md` for schema, RLS, account sync, and admin role guidance. The browser client uses only the public project URL and anon key. Admin roles must be assigned through a secure Supabase dashboard or server-side process, not from browser code.

## Deployment targets

- Game: Vercel using `npm run build` and the `dist/` output configured in `vercel.json`.
- Blog/docs: GitHub Pages + Jekyll from `docs/`.

See `docs/deployment.md` for deployment and verification checklists.
