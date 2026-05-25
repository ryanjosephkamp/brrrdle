# brrrdle

`brrrdle` is a Wordle + Hurdle hybrid web game. The implementation is governed by `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, and `AGENT-IMPLEMENTATION-PLAN.md`.

## Current status

Phase 0 scaffolding is in progress. The app currently provides a React 19 + TypeScript + Vite + Tailwind CSS foundation without game-specific behavior.

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run build
```

No test command exists yet; tests will be introduced with the implementation phases that define testable behavior.

## Environment variables

Copy `.env.example` to `.env.local` for local configuration. Only public browser-safe Supabase values may be exposed through `VITE_*` variables. Never commit service-role keys or privileged credentials.

## Deployment targets

- Game: Vercel using the Vite production build in `dist/`.
- Blog/docs: GitHub Pages + Jekyll from `docs/`.
