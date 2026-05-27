# brrrdle

`brrrdle` is a Wordle + Hurdle hybrid web game. It includes classic `og` puzzles, chained `go` sessions, guest progress, optional Supabase account sync, post-game definitions, emoji sharing, Pay-to-Continue, and PWA foundations.

The implementation is governed by `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, and `AGENT-IMPLEMENTATION-PLAN.md`.

## Current status

Phase 13 addendum work is implemented on top of the v1 launch scope and the repository is prepared for production release review. Implemented launch scope includes:

- React 19 + TypeScript + Vite + Tailwind CSS v4 app shell.
- Daily `og` and `go` modes fixed at 5 letters for launch.
- Practice gameplay using available launch seed lengths in the approved 2–35 range.
- Hard Mode, keyboard input, definitions, local guest persistence, progression/statistics, Pay-to-Continue, optional Supabase account sync, protected admin-route foundations, sharing, and PWA shell caching.
- Word Explorer and Feedback tabs, email + password auth support alongside magic links, and toggleable sound effects.
- GitHub Pages + Jekyll docs in `docs/`.

Production deployment must wait for explicit release approval after PR review. Do not merge the release PR or trigger Vercel production deployment without that approval.

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
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-public-anon-key
```

`VITE_*` values are public and included in the browser bundle. Use only the public Supabase project URL and anon key. Never commit secrets, service-role keys, JWT signing secrets, database passwords, or privileged credentials.

`SUPABASE_URL` and `SUPABASE_ANON_KEY` are server-side aliases used by `/api/admin-refresh` in deployment environments. They should point to the same public URL and anon key unless the hosting platform intentionally shares the `VITE_*` values with serverless functions. Do not use a service-role key for `SUPABASE_ANON_KEY`.

## Supabase and admin setup

See `docs/supabase.md` for schema, RLS, account sync, and admin role guidance. The browser client uses only the public project URL and anon key. Admin roles must be assigned through a secure Supabase dashboard or server-side process, not from browser code.

The protected admin refresh endpoint is `POST /api/admin-refresh`. It requires a Supabase bearer token for an authenticated user whose `app_metadata.role` is `admin` or whose `app_metadata.roles` contains `admin`. Unauthenticated users receive `401`, authenticated non-admin users receive `403`, and authorized admins receive the placeholder refresh acknowledgement until a production refresh job is wired.

## Deployment targets

- Game: Vercel using `npm run build` and the `dist/` output configured in `vercel.json`.
- Blog/docs: GitHub Pages + Jekyll from `docs/`.

See `docs/deployment.md` for deployment and verification checklists, including environment variable warnings, PWA asset checks, and production smoke checks.

## Repository organization

```text
brrrdle/
├── api/                              # Vercel serverless functions and server-only helpers
│   ├── _lib/                         # Vercel Blob word-list persistence adapters
│   ├── cron/                         # Scheduled word-list refresh endpoint
│   └── word-lists/                   # Public word-list manifest endpoint
├── docs/                             # GitHub Pages / Jekyll documentation site
├── progress/                         # Phase progress CSV, template, and step reports
├── public/                           # Static PWA assets, icons, manifest, and service worker
├── src/                              # React application and shared TypeScript modules
│   ├── account/                      # Supabase auth, guest storage, sync, and settings UI
│   ├── admin/                        # Admin authorization helpers and admin panel
│   ├── app/                          # App shell, routes, navigation composition
│   │   └── games/                    # Playable og/go route panel components
│   ├── data/                         # Word-list loading, validation, refresh, cache, daily selection
│   │   └── bundled/                  # Bundled fallback word-list JSON files for lengths 2–35
│   ├── definitions/                  # Post-game definition lookup and rendering
│   ├── feedback/                     # Feedback tab UI
│   ├── game/                         # UI-independent game engine and gameplay helpers
│   │   ├── go/                       # Go-mode session state logic
│   │   ├── input/                    # Physical keyboard normalization and input hook
│   │   ├── og/                       # Og-mode session state logic
│   │   └── storage/                  # Daily in-progress game session local-storage helpers
│   ├── lib/                          # Cross-feature utilities that are not game-specific
│   ├── progression/                  # XP, levels, coins, consumables, and Pay-to-Continue
│   ├── pwa/                          # Service worker registration
│   ├── sound/                        # Toggleable Web Audio sound effects
│   ├── stats/                        # Statistics model and dashboard UI
│   ├── test/                         # Shared test helpers and testing documentation
│   ├── types/                        # Shared ambient/type-only project area
│   ├── ui/                           # Reusable UI primitives and layout controls
│   └── wordExplorer/                 # Word Explorer data helpers and tab UI
├── supabase/                         # Supabase migrations and setup assets
├── .env.example                      # Placeholder environment variable documentation
├── eslint.config.js                  # ESLint configuration
├── index.html                        # Vite HTML entry point
├── package.json                      # npm scripts and dependency manifest
├── tsconfig*.json                    # TypeScript project references and compiler configs
├── vercel.json                       # Vercel build and cron configuration
└── vite.config.ts                    # Vite + React + Tailwind configuration
```
