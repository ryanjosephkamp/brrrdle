<div align="center">

# ❄️ brrrdle

### A polished Wordle + Hurdle hybrid — daily puzzles, chained sessions, and an icy `brrr` aesthetic.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?logo=pwa&logoColor=white)](#-progressive-web-app)

*Guess the word. Then guess five more. Stay frosty.* 🧊

</div>

---

## ✨ What is brrrdle?

`brrrdle` is a mobile-first, accessible, production-minded word game that blends two beloved formats:

- **`og` mode** — classic single-puzzle, Wordle-style play.
- **`go` mode** — chained five-puzzle, Hurdle-style play where solved answers pre-fill carry-over rows into the next puzzle.

It ships with guest progress, optional cloud accounts, post-game definitions, emoji sharing, an in-app economy, and Progressive Web App foundations — all wrapped in a dark-first UI with icy `brrr` accents.

> **Project status:** v1 launch scope plus approved addenda **through Phase 18** (answer-difficulty tiers, Word Explorer / Go / Settings polish, and the daily-overlap fix) are implemented; **Phase 19** (enhanced statistics visualizations, a configurable Go puzzle count, full resume-most-recent-game activation, advanced polish, and a light theming foundation) is **planned and awaiting approval**. Production deployment requires explicit release approval after PR review — do **not** trigger a production deploy without it.

---

## 🎮 Features

### Core gameplay
- 🟩 **Exact Wordle tile coloring**, including correct duplicate-letter accounting, from a single canonical source of truth.
- 🔗 **`go` chained sessions** of five puzzles with carry-over pre-fills between rounds.
- 🧠 **Hard Mode** for `og` and `go`, in both daily and practice contexts.
- 📅 **Daily puzzles** fixed at 5 letters; **Practice** supports word lengths **2 through 35**.
- ⌨️ **Physical keyboard + on-screen keyboard** input with clear loading, empty, error, and invalid-guess states.

### Progression, economy & stats
- ⭐ **XP, levels, and coins** earned through play.
- 🛒 **Consumables** — *Reveal One Letter* and *Remove Incorrect Letters*.
- 💸 **Pay-to-Continue** in daily and practice, scaled by word length and completion.
- 📊 **Per-mode statistics** (`og` vs `go`) tracked from day one.

### Words, definitions & discovery
- 📚 **Local curated word lists** for every length 2–35 (hundreds of thousands of real English words).
- 🎚️ **Answer-difficulty tiers** (*Casual / Standard / Expert*) that subset the answer pool only — valid guesses stay identical across tiers.
- 🔍 **Post-game definitions** with a graceful lookup chain: bundled data → Dictionary API → Wiktionary → an always-available *Search Google* button.
- 🧭 **Word Explorer** tab for browsing and inspecting the dictionary.

### Accounts, sharing & platform
- 👤 **Guest play** with full local progress, coins, levels, stats, settings, and history.
- ☁️ **Optional Supabase accounts** with email verification, cloud sync, and a guest-to-account transfer prompt.
- 🟦🟨⬜ **Classic emoji sharing** generated from canonical tile states.
- 📱 **PWA shell** with offline caching where reasonable.
- 🔊 **Toggleable sound effects** and a **Feedback** tab.
- 🛡️ **Protected admin route** (`/api/admin-refresh`) for word-list refresh, gated by Supabase auth + an `admin` role.

---

## 🧊 Why brrrdle?

- **Faithful, not fragile.** Tile coloring, Hard Mode, and sharing all consume one canonical engine — never re-implemented per surface.
- **Accessible by default.** Targets WCAG AA: semantic controls, visible focus, keyboard-only navigation, reduced-motion support, and readable contrast.
- **Offline-friendly data.** Word lists are bundled locally, so daily play stays fast and resilient.
- **Governed & auditable.** Every change follows a written constitution, a phased plan, and per-phase progress reports.

---

## 🚀 Quick start

```bash
# 1. Install dependencies from the lockfile (reproducible)
npm ci

# 2. Start the dev server
npm run dev
```

Then open the printed local URL (Vite defaults to <http://localhost:5173>).

> Use `npm install` only when you intentionally change dependencies; otherwise prefer `npm ci`.

### Optional: configure Supabase (for accounts/sync)

```bash
cp .env.example .env.local
# then fill in your public Supabase project URL + anon key (see "Environment variables" below)
```

Guest mode is fully playable **without** any Supabase configuration.

---

## 🛠️ Tech stack

| Layer | Technology |
| --- | --- |
| UI framework | **React 19** + **TypeScript** |
| Build tooling | **Vite 8** (`@vitejs/plugin-react`) |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`) |
| Testing | **Vitest** |
| Linting | **ESLint** + `typescript-eslint` + React Hooks/Refresh plugins |
| Accounts / sync | **Supabase** (`@supabase/supabase-js`) |
| Hosting (game) | **Vercel** (serverless API routes + cron) |
| Hosting (docs) | **GitHub Pages + Jekyll** (`docs/`) |
| PWA | Service worker + web manifest |

---

## 📜 Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR. |
| `npm run build` | Type-check (`tsc -b`) and produce the production bundle in `dist/`. |
| `npm run preview` | Serve the built `dist/` locally to smoke-check production output. |
| `npm run test` | Run the Vitest unit-test suite once. |
| `npm run lint` | Lint the project with ESLint. |

### Recommended verification before a PR

```bash
npm run lint
npm run test
npm run build
npx tsc -p tsconfig.api.json --noEmit   # type-check the serverless API project
```

---

## 🔐 Environment variables

Copy `.env.example` to `.env.local` and provide **public** Supabase values only:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-public-anon-key
```

- `VITE_*` values are **public** and shipped in the browser bundle — use only the public project URL and anon key.
- `SUPABASE_URL` / `SUPABASE_ANON_KEY` are server-side aliases used by `/api/admin-refresh`; they should point to the same public URL and anon key.
- **Never** commit secrets, service-role keys, JWT signing secrets, database passwords, or any privileged credentials.

---

## 🧩 Supabase & admin setup

See [`docs/supabase.md`](docs/supabase.md) for schema, Row-Level Security, account sync, and admin-role guidance. The browser client uses only the public project URL and anon key; admin roles must be assigned through a secure Supabase dashboard or server-side process — never from browser code.

The protected refresh endpoint is `POST /api/admin-refresh`. It requires a Supabase bearer token for a user whose `app_metadata.role` is `admin` (or whose `app_metadata.roles` contains `admin`):

| Caller | Response |
| --- | --- |
| Unauthenticated | `401` |
| Authenticated, non-admin | `403` |
| Authenticated admin | Refresh acknowledgement |

---

## 🚢 Deployment targets

- **Game:** Vercel, using `npm run build` and the `dist/` output configured in `vercel.json`.
- **Blog / docs:** GitHub Pages + Jekyll from `docs/`.

See [`docs/deployment.md`](docs/deployment.md) for deployment and verification checklists (environment-variable warnings, PWA asset checks, and production smoke checks).

---

## 📱 Progressive Web App

`brrrdle` registers a service worker and ships a web manifest so it can be installed and remain usable offline where reasonable. Word-list handling is optimized so daily mode loads quickly and gameplay stays smooth.

---

## 🗂️ Repository structure

```text
brrrdle/
├── api/                     # Vercel serverless functions and server-only helpers
│   ├── _lib/                # Word-list persistence adapters (Vercel Blob)
│   ├── cron/                # Scheduled word-list refresh endpoint
│   ├── word-lists/          # Public word-list manifest endpoint
│   └── admin-refresh.ts     # Protected admin refresh route
├── docs/                    # GitHub Pages / Jekyll documentation site
├── progress/                # Phase progress CSV, template, and step reports
├── public/                  # Static PWA assets, icons, manifest, service worker
├── src/                     # React application and shared TypeScript modules
│   ├── account/             # Supabase auth, guest storage, sync, settings UI
│   ├── admin/               # Admin authorization helpers and admin panel
│   ├── app/                 # App shell, routing, navigation
│   │   └── games/           # Playable og/go route panels
│   ├── data/                # Word-list loading, validation, refresh, cache, daily selection
│   │   └── bundled/         # Historical bundled fallback word-list seed
│   ├── definitions/         # Post-game definition lookup and rendering
│   ├── feedback/            # Feedback tab UI
│   ├── game/                # UI-independent game engine and gameplay helpers
│   │   ├── go/              # Go-mode session state logic
│   │   ├── input/           # Keyboard normalization and input hook
│   │   ├── og/              # Og-mode session state logic
│   │   └── storage/         # Daily in-progress session local-storage helpers
│   ├── latest/              # Local curated per-length word-list JSONs (lengths 2–35)
│   ├── lib/                 # Cross-feature, non-game-specific utilities
│   ├── progression/         # XP, levels, coins, consumables, Pay-to-Continue
│   ├── pwa/                 # Service worker registration
│   ├── sound/               # Toggleable Web Audio sound effects
│   ├── stats/               # Statistics model and dashboard UI
│   ├── test/                # Shared test helpers and testing docs
│   ├── types/               # Shared ambient/type-only declarations
│   ├── ui/                  # Reusable UI primitives and layout controls
│   └── wordExplorer/        # Word Explorer data helpers and tab UI
├── supabase/                # Supabase migrations and setup assets
├── .env.example             # Placeholder environment-variable documentation
├── eslint.config.js         # ESLint configuration
├── index.html               # Vite HTML entry point
├── package.json             # npm scripts and dependency manifest
├── tsconfig*.json           # TypeScript project references and compiler configs
├── vercel.json              # Vercel build and cron configuration
└── vite.config.ts           # Vite + React + Tailwind configuration
```

---

## 🧭 Governance & authoritative sources

`brrrdle` is built under a strict, written governance model. When in doubt, these documents win — in this order:

1. **[`CONSTITUTION.md`](CONSTITUTION.md)** — binding rules for scope, review gates, verification, security, and conduct.
2. **[`BRRRDLE-SPEC.md`](BRRRDLE-SPEC.md)** — the product specification.
3. **[`BRRRDLE-OVERVIEW.md`](BRRRDLE-OVERVIEW.md)** — the approved project plan.
4. **[`AGENT-IMPLEMENTATION-PLAN.md`](AGENT-IMPLEMENTATION-PLAN.md)** — root shim for the active lightweight plan and the archived full historical plan.
5. **[`CHANGELOG.md`](CHANGELOG.md)** — root shim for historical and Phase 24 changelog locations.
6. **[`planning/`](planning/README.md)** — current planning hub, specs, history, and testing strategy.
7. **`progress/`** — per-phase progress reports and `PROGRESS.csv`.

> The agent workflow is **model-agnostic** — any sufficiently capable coding model (e.g., Claude Opus 4.8) can drive it.

---

## 🤝 Contributing

This project follows a **phase-gated, verification-first** workflow:

1. **Read the governance docs first** — `CONSTITUTION.md`, then `BRRRDLE-SPEC.md`, then `AGENT-IMPLEMENTATION-PLAN.md` and the relevant planning files it links to.
2. **Make small, cohesive, reviewable changes** tied to the current phase. Avoid speculative refactors and out-of-scope features.
3. **Preserve canonical logic** — never duplicate tile-coloring or Hard Mode rules; consume the shared engine.
4. **Verify before you finish** — run `npm run lint`, `npm run test`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit`.
5. **Never weaken or remove tests** to make a phase pass, and **never commit secrets**.
6. **Update the changelog and progress artifacts** when a phase requires it, then halt for review at the relevant gate.

---

## ♿ Accessibility & 🔒 security at a glance

- **Accessibility:** WCAG AA targets — semantic controls, visible focus, keyboard-only navigation, dialog accessibility, status announcements, readable contrast, and reduced-motion support.
- **Security:** no committed secrets; no service-role privileges in browser code; Row-Level Security for user data; server-side admin authorization; imported word/definition data treated as untrusted; safe external-link behavior for new tabs.

---

<div align="center">

Built with ❄️ and care. Stay frosty.

</div>
