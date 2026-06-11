---
layout: home
title: brrrdle docs
---

# brrrdle docs

`brrrdle` is a Wordle + Hurdle hybrid game with classic `og` puzzles, chained `go` sessions, guest progress, optional Supabase accounts, post-game definitions, sharing, and installable PWA foundations.

## Launch scope

- Daily `og` and `go` modes are fixed at 5 letters for initial launch.
- Practice mode supports the available 2–35 length range. The current bundled seed lists include lengths 2, 5, and 35 while the broader refresh pipeline continues to mature.
- The game is hosted on Vercel from the Vite build output.
- This docs/blog surface is hosted separately with GitHub Pages + Jekyll from `docs/`.

## Documentation

- [Deployment guide](deployment.md): local commands, Vercel game deployment, GitHub Pages docs deployment, and verification.
- [Supabase setup](supabase.md): public environment variables, schema/RLS setup, account sync, and admin role assignment.

## Development quick start

Run these commands from the repository root:

```bash
npm ci
npm run dev
```

Primary verification commands:

```bash
npm run test
npm run lint
npm run build
```

## Governance and source docs

Development follows the root governance and planning documents:

- `CONSTITUTION.md`
- `BRRRDLE-SPEC.md`
- `BRRRDLE-OVERVIEW.md`
- `AGENT-IMPLEMENTATION-PLAN.md` root shim
- `planning/README.md`
- `planning/IMPLEMENTATION-PLAN.md`
