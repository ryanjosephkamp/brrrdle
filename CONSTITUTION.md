# brrrdle Constitution

**Version**: 3.2
**Date**: 2026-05-30
**Status**: Final upgraded project constitution with the progress tracking amendment and the phase-range generalization amendment (Phases 0–11 plus all subsequently approved addenda, Phases 12+) — binding until revised with explicit user approval.

---

## 1. Purpose

This constitution governs all autonomous development of `brrrdle`. It binds implementation to the approved product specification, the approved v2.6 project plan, and the approved `AGENT-IMPLEMENTATION-PLAN.md`. The `AGENT-IMPLEMENTATION-PLAN.md` now spans Phases 0–11 plus all subsequently approved addenda (Phases 12+); every approved addendum is bound by this constitution to the same degree as the original phases.

The goal is to build a polished, production-ready Wordle + Hurdle hybrid while preventing scope creep, preserving implementation fidelity, enforcing phase-by-phase verification, maintaining durable progress records, and requiring human review at every gate.

If this constitution, `BRRRDLE-SPEC.md`, `BRRRDLE-OVERVIEW.md`, or `AGENT-IMPLEMENTATION-PLAN.md` conflict, stop immediately and ask the user for clarification. Do not guess.

---

## 2. Authoritative Sources

Treat these sources as authoritative in this order:

1. Explicit user instructions in the current task.
2. This `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. The approved v2.6 project plan in `BRRRDLE-OVERVIEW.md`, or any later explicitly approved replacement.
5. The approved `AGENT-IMPLEMENTATION-PLAN.md`.
6. Existing implementation, only when it does not conflict with the above.

No feature, dependency, architecture choice, route, data model, UX behavior, monetization behavior, or deployment change may be added simply because it seems useful. If it is not supported by the authoritative sources, it is out of scope unless explicitly approved by the user.

---

## 3. Non-Negotiable Product Scope

### 3.1 Name and Modes

- The product name is always `brrrdle`.
- `og` mode is classic single-puzzle Wordle-style play.
- `go` mode is chained 5-puzzle Hurdle-style play with carry-over pre-fills.
- Daily `og` and daily `go` are fixed at 5 letters for initial launch.
- Practice `og` and practice `go` support lengths 2 through 35.
- In practice `go`, all five puzzles in one session use the same selected length.

### 3.2 Required v1 Capabilities

Implementation must preserve:

- Exact Wordle-style tile coloring, including duplicate-letter accounting.
- Hard Mode in daily/practice `og` and daily/practice `go`.
- Guest play with local progress, coins, levels, stats, settings, and history.
- Optional Supabase accounts with email verification and cloud sync.
- Guest-to-account transfer prompt.
- XP, levels, coins, consumables, and Pay-to-Continue.
- Per-mode statistics for `og` and `go` from day one.
- A foundation for future per-length stats without enabling variable daily lengths in v1.
- Definitions shown after game end.
- Classic Wordle-style emoji sharing.
- PWA behavior where reasonable.
- Mobile-first, accessible, polished UI.

### 3.3 Out of Scope for v1

Do not implement without explicit approval:

- Variable daily word lengths.
- Multiplayer.
- Leaderboards or social graph features.
- Themes or sound effects.
- Advanced AI hints.
- Additional game modes.
- Additional monetization mechanics beyond the approved coin/consumable/Pay-to-Continue economy.

---

## 4. Mandatory Review Gates

The agent must halt and wait for explicit user approval:

- After any constitution upgrade or amendment.
- Before beginning Phase 0 scaffolding.
- After Phase 0 and after every later phase in `AGENT-IMPLEMENTATION-PLAN.md` (including all subsequently approved addenda, Phases 12+).
- Whenever a phase's pause point says to halt.
- Whenever requirements conflict.
- Whenever verification cannot be completed.
- Whenever a critical issue cannot be fixed with a small, clearly scoped change.
- Before any production release action.

Acceptable approval must be explicit, such as “APPROVE”, “Start Phase 0”, “Continue”, or “Proceed”. Silence, ambiguous feedback, or unrelated comments are not approval.

At each review gate, provide:

1. What changed.
2. What verification was run.
3. Any known limitations, risks, or skipped checks.
4. The relevant `PROGRESS.csv` and progress markdown updates.
5. The exact approval needed to continue.

Then stop. Do not continue into the next phase, scaffold, or implement additional code until approved.

---

## 5. Phase Execution Rules

The approved implementation plan defines Phases 0–11 plus all subsequently approved addenda (Phases 12+). Work must proceed in order unless the user explicitly approves a change.

### 5.1 Phase Discipline

For each phase:

- Re-read the relevant section of `AGENT-IMPLEMENTATION-PLAN.md` before editing.
- Make only changes directly tied to the current phase.
- Prefer small, cohesive, reviewable changes.
- Do not perform future-phase work early unless required to keep the current phase functional and approved by the user.
- Do not add placeholder complexity that causes lint, build, or test failures.
- Update `CHANGELOG.md` when the phase requires it.
- Commit and push only through the approved progress-reporting workflow.

### 5.2 Phase Order

1. Phase 0 — Governance, scaffolding, baseline tooling, Vercel foundation, docs foundation.
2. Phase 1 — Core game engine and shared domain model.
3. Phase 2 — Data layer and hybrid word-list consumption.
4. Phase 3 — Application shell, routing, and UI foundation.
5. Phase 4 — `og` mode gameplay.
6. Phase 5 — `go` mode gameplay.
7. Phase 6 — Definitions system.
8. Phase 7 — Persistence, progression, economy, and statistics.
9. Phase 8 — Supabase accounts, sync, and protected admin route.
10. Phase 9 — Sharing, PWA, polish, accessibility, and performance.
11. Phase 10 — GitHub Pages + Jekyll blog/docs.
12. Phase 11 — Final integration, release readiness, and deployment verification.

Phases 12 and later are introduced through explicitly approved addenda to `AGENT-IMPLEMENTATION-PLAN.md` (see its addendum sections). Each approved addendum extends this order and is governed by the same phase-discipline, verification, progress-logging, and review-gate rules; the §3 scope invariants (including the daily 5-letter lock and practice lengths 2–35) continue to apply.

### 5.3 Phase Exit Checklist

Every phase must end with:

- Relevant files created or updated.
- Changelog update where required.
- Existing lint, typecheck, test, and build commands run where project tooling exists.
- Phase-specific automated tests and manual checks completed.
- Security review appropriate to the change.
- Known limitations documented.
- Progress tracking updated in `progress/PROGRESS.csv` and the relevant `progress/PROGRESS-STEP-N.md` report once Phase 0 has created the `progress/` folder.
- Commit/push completed through the approved workflow.
- A halt for explicit user approval.

---

### 5.4 Progress Logging and Tracking

The project must maintain progress artifacts for user transparency, session resumability, and agent coordination.

- Before Phase 0 scaffolding, `PROGRESS.csv` and `PROGRESS-TEMPLATE.md` must exist at the repository root.
- During Phase 0 scaffolding/setup, the agent must create a root-level `progress/` folder and move `PROGRESS.csv` and `PROGRESS-TEMPLATE.md` into it.
- `PROGRESS.csv` must contain one row for every major phase in `AGENT-IMPLEMENTATION-PLAN.md`.
- Before beginning each phase, the agent must read the CSV and, if needed, existing `progress/PROGRESS-STEP-N.md` files to identify the next incomplete phase, blockers, and required user actions.
- After each phase, the agent must update the corresponding CSV row and generate or update `progress/PROGRESS-STEP-N.md` from the template.
- Each progress markdown report must summarize the phase changes, verification, known blockers or critical errors, required user action, and whether the user is safe/authorized to proceed to the next phase.
- If a blocker or critical error arises during a phase, the relevant progress markdown report must be annotated before halting.
- Progress artifacts must never contain secrets, credentials, or private deployment data.

---

## 6. Verification-First Standard

Never claim a phase or feature is complete without verification appropriate to that phase.

### 6.1 Required Verification Themes

Verification must cover, when relevant:

- Exact tile coloring with duplicate-letter edge cases.
- Hard Mode green/yellow/gray constraints.
- Daily modes locked to 5 letters.
- Practice support for lengths 2 and 35, plus a representative 5-letter case.
- `go` five-puzzle flow and carry-over pre-fills.
- Definitions priority and fallback behavior.
- Google search button label and URL generation.
- Word-list loading, update failure, and stale/fallback behavior.
- Guest persistence and corrupted local data recovery.
- Supabase account sync and guest transfer paths.
- Unauthorized, non-admin, and admin paths for protected refresh.
- Pay-to-Continue with enough and insufficient coins.
- Per-mode statistics separation.
- Keyboard and on-screen input.
- Mobile viewport behavior.
- Accessibility, focus order, semantics, and contrast.
- Absence of critical console errors.
- Production build health.
- No committed secrets.

### 6.2 If Verification Cannot Run

If a check cannot be run because tooling, credentials, browser access, Supabase access, deployment access, or external services are unavailable:

- Document exactly what could not be run.
- Explain why.
- State what was verified instead.
- Halt at the review gate if the missing check is phase-critical.

---

## 7. Core Engine and Game Logic Rules

### 7.1 Canonical Tile State Logic

`getTileStates` or its approved equivalent must be the single source of truth for tile coloring. It must match original Wordle behavior exactly, including duplicate-letter accounting.

Do not duplicate tile-state rules in UI, keyboard state, share output, stats, validation messages, or animations. Those systems must consume canonical results.

### 7.2 Hard Mode

Hard Mode must enforce:

- Green letters remain in the same positions in later guesses.
- Yellow letters appear somewhere in later guesses.
- Gray letters cannot be reused, subject to the canonical duplicate-letter interpretation.

Hard Mode must work in `og`, `go`, daily, and practice contexts.

### 7.3 Session State

Game state transitions must be testable without rendering the UI. Core state must handle:

- Letter entry.
- Delete.
- Submit.
- Invalid guess.
- Win.
- Loss.
- Continue after Pay-to-Continue.
- Reset/new practice puzzle.
- Daily completion persistence.
- `go` puzzle advancement.

---

## 8. Data Layer Rules

### 8.1 Word Source

Primary word data must use pre-processed English OpenList JSON files named `words_length_{N}.json` for N = 2 through 35.

The data layer must define and validate the expected JSON shape, including optional definition data when present.

### 8.2 Hybrid Consumption

The implementation must follow the approved hybrid strategy:

- Bundle selected JSON assets at production build time.
- Use length-indexed loading APIs for answer candidates, valid guesses, and definition metadata.
- Keep daily mode loading optimized for length 5.
- Support practice mode lengths 2 through 35 without making default daily play slow.
- Check for word-list updates on production deploys where supported.
- Support a protected manual refresh override.
- Degrade gracefully when remote metadata, update checks, or refresh attempts fail.

### 8.3 Data Safety

Treat imported word and definition data as untrusted for rendering. Do not render unescaped HTML from imported or external definition sources.

No client-side code may contain secrets, private tokens, service-role keys, or privileged credentials.

---

## 9. Definitions System Rules

Definitions must be shown after a game ends, win or loss.

### 9.1 Mandatory Lookup Order

The lookup order is:

1. Pre-processed English OpenList definition data bundled with word data.
2. Dictionary API (`https://api.dictionaryapi.dev/`).
3. Wiktionary fallback.
4. Google search button, always available.

### 9.2 Failure Behavior

If no definition source returns a usable result:

- Show a clear, non-intrusive fallback message.
- Recommend using the Google search button.
- Do not block post-game completion, stats, sharing, or navigation.
- Do not crash on network errors, empty responses, malformed responses, or timeouts.

### 9.3 Google Button Requirements

The Google search button must:

- Always be available in the definition panel.
- Use dynamic text like `Search Google for ‘apple’`.
- Search for `define [WORD]`.
- Open in a new tab.
- Use safe external-link behavior.
- Have tests for label and URL generation.

---

## 10. Supabase, Accounts, Sync, and Admin Rules

### 10.1 Supabase Account System

Supabase is required for optional account creation and cloud sync. Guest mode must remain fully playable without an account.

Use only public browser-safe Supabase configuration in client code. Never expose service-role privileges to the browser.

### 10.2 Guest Data and Sync

The system must support:

- Local guest progress.
- Guest-to-account transfer prompt after signup or login.
- Sync of progress, coins, levels, stats, settings, and history.
- Export data.
- Reset progress.
- Delete account flow.
- Change email/password paths as supported by Supabase.
- Graceful offline, conflict, and partial-failure handling.

### 10.3 RLS and Data Ownership

Supabase tables must use RLS so users can access only their own cloud data unless an explicitly approved admin policy applies.

Migration or setup documentation must make manual admin role assignment clear for v1.

### 10.4 Protected Admin Refresh Route

Manual word-list refresh override must be protected by:

- Supabase-authenticated user identity.
- An `admin` role.
- Server-side or protected Vercel function/API route authorization.

It is not sufficient to hide admin UI on the client. Verification must cover unauthenticated, authenticated non-admin, and authenticated admin behavior.

---

## 11. Progression, Economy, Stats, and Sharing Rules

### 11.1 Progression and Economy

XP, levels, coins, consumables, and Pay-to-Continue must be deterministic and testable.

Consumables for v1 are:

- Reveal One Letter.
- Remove Incorrect Letters.

Pay-to-Continue must be available in daily and practice modes for both `og` and `go`. Its cost must scale based on word length and completion percentage, including lower costs for shorter lengths as specified.

### 11.2 Statistics

Statistics must be separated by mode (`og` vs `go`) from day one. The data model may prepare for future per-length stats, but it must not expose variable daily lengths in v1.

### 11.3 Sharing

Emoji sharing must use canonical tile states and classic Wordle-style output. Sharing must not recompute coloring rules independently.

---

## 12. UI, Accessibility, PWA, and Performance Rules

### 12.1 UI and Interaction

The UI must be mobile-first, dark-first, touch-friendly, keyboard-accessible, and polished with icy `brrr` accents.

It must support:

- Physical keyboard input.
- On-screen keyboard input.
- Clear loading, empty, error, and invalid-guess states.
- Responsive layouts for mobile and desktop.
- Post-game definition and share flows.

### 12.2 Accessibility

Target WCAG AA minimums. Preserve:

- Semantic controls.
- Visible focus states.
- Keyboard-only navigation.
- Dialog accessibility.
- Status announcements where needed.
- Readable contrast.
- Reduced-motion support.

### 12.3 Animations

Tile pop-in, flip reveal, and row shake may be implemented, but animations must not block input, harm accessibility, or cause critical console errors.

### 12.4 PWA and Performance

PWA behavior should be implemented where reasonable. The app must prioritize fast initial load, responsive interactions, and smooth gameplay. Word-list handling must not make daily mode slow.

---

## 13. Hosting and Documentation Rules

### 13.1 Vercel

The game targets Vercel as the primary hosting platform. Configuration must support the production build and any required protected API/function routes.

Environment documentation must use placeholders only and must never include real secrets.

### 13.2 GitHub Pages + Jekyll

Blog and documentation content target GitHub Pages with Jekyll, preferably under `docs/` unless the user approves another structure.

Jekyll docs must not interfere with the Vite app or Vercel build.

### 13.3 Documentation

Documentation must stay aligned with the implemented system, especially:

- Setup.
- Available scripts.
- Environment variables.
- Supabase configuration.
- Admin role assignment.
- Deployment.
- Verification procedures.
- Known limitations.

---

## 14. Security Rules

The agent must:

- Never commit secrets.
- Never expose Supabase service-role privileges to browser code.
- Use RLS for user data.
- Validate admin authorization server-side or in protected serverless routes.
- Treat imported word and definition data as untrusted.
- Use safe external-link behavior for new tabs.
- Avoid dependencies unless justified by approved scope.
- Check dependency advisories before adding supported-ecosystem dependencies.
- Run available security review tools before finalizing code changes.

If a security issue is found in changed lines, fix it before proceeding unless the user explicitly decides otherwise.

---

## 15. Minimal-Change Implementation Conduct

Before changing files, understand the relevant code and tooling. After scaffolding, run existing checks before and after meaningful changes when practical.

The agent must:

- Use standard ecosystem tools for scaffolding and dependency management.
- Avoid unrelated refactors.
- Avoid speculative architecture.
- Avoid implementing future features early.
- Keep core logic testable outside React rendering.
- Prefer clear boundaries between game engine, data, definitions, persistence, Supabase, admin, UI, and deployment concerns.
- Preserve existing user data and migration paths once persistence exists.
- Stop instead of guessing when requirements are ambiguous.

The agent must not:

- Remove or weaken tests to make a phase pass.
- Hide broken functionality behind UI conditions.
- Duplicate canonical game logic.
- Treat local success as production readiness when deployment-aware checks are required.
- Use real external credentials in committed files.

---

## 16. Required Edge Cases

Implementation and tests must explicitly consider:

- Duplicate letters in guesses and answers.
- Word lengths 2 and 35.
- Daily modes fixed to length 5.
- Practice mode rejecting unsupported lengths.
- Hard Mode after mixed green/yellow/gray feedback.
- `go` carry-over pre-fills between all five puzzles.
- Losing with enough coins for Pay-to-Continue.
- Losing without enough coins for Pay-to-Continue.
- Consumable effects and invalid consumable use.
- Guest data transfer into a Supabase account.
- Corrupted or missing local storage.
- Offline or failed word-list update checks.
- Missing definitions from every source except Google search.
- Unauthorized, non-admin, and admin access to manual refresh.
- External definition API failures and malformed responses.
- Mobile viewport constraints and virtual keyboard behavior.
- Clipboard/share fallback behavior.
- Reduced-motion users.

---

## 17. Constitution Evolution

This constitution includes the approved second upgrade, a progress tracking amendment, and a phase-range generalization amendment (Phases 0–11 plus all subsequently approved addenda, Phases 12+). Future revisions require explicit user approval and must preserve:

- Scope fidelity.
- Mandatory review gates.
- Verification-first execution.
- Hybrid data-layer discipline.
- Definitions fallback requirements.
- Supabase and admin security requirements.
- Accessibility and performance standards.
- Minimal-change conduct.
- Progress logging for transparency, resumability, and coordination.
- Phase-range continuity, so every approved addendum (Phases 12+) remains bound by the same rules as Phases 0–11.

---

**This Constitution is binding for all future `brrrdle` development until explicitly revised with user approval.**
