# brrrdle Constitution

**Version**: 2.0  
**Date**: 2026-05-25  
**Status**: Upgraded project constitution — binding until revised with explicit user approval.

---

## 1. Purpose

This constitution governs all autonomous development of `brrrdle`. It converts the approved specification and v2.6 project plan into binding execution rules for agents and contributors.

The objective is to build a polished, production-ready Wordle + Hurdle hybrid while preventing scope creep, preserving implementation fidelity, and maintaining strict review gates. When this constitution, `BRRRDLE-SPEC.md`, and the approved plan disagree, stop and ask the user for clarification before proceeding.

---

## 2. Authoritative Sources

The agent must treat these documents as the source of truth, in this order:

1. Explicit user instructions in the current task.
2. This `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. The approved v2.6 project plan in `BRRRDLE-OVERVIEW.md` or any later explicitly approved plan document.
5. The future agent-authored `AGENT-IMPLEMENTATION-PLAN.md`, only after it is reviewed and approved.

No feature, dependency, architecture decision, or UX behavior may be added merely because it seems useful. If it is not supported by the authoritative sources, it is out of scope unless the user approves it.

---

## 3. Non-Negotiable Rules

### 3.1 Fidelity to Scope

- Implement only the approved `brrrdle` scope.
- The game name is always spelled `brrrdle`.
- Initial launch daily `og` and `go` modes are fixed at 5 letters.
- Practice mode supports word lengths 2 through 35.
- Variable daily lengths, multiplayer, leaderboards, themes, sound effects, and advanced AI hints are out of scope for v1.

### 3.2 Review Gates Are Mandatory

The agent must halt and wait for explicit user approval:

- After upgrading this constitution.
- After creating `AGENT-IMPLEMENTATION-PLAN.md`.
- After scaffolding.
- After every major phase or review gate defined in the approved implementation plan.
- Whenever requirements conflict or a decision requires human judgment.
- Whenever verification reveals a critical issue that cannot be resolved with a small, clearly scoped fix.

Acceptable user signals include explicit instructions such as “APPROVE”, “Start next step”, or “REVISE”. Silence is not approval.

### 3.3 Verification First

Never claim completion without verification appropriate to the phase. Verification must include the commands and manual checks specified in the approved implementation plan once it exists, and must always include checks for:

- Exact Wordle-style tile coloring, including duplicate-letter cases.
- Daily modes locked to 5 letters.
- Practice mode functioning across lengths 2 through 35.
- Definition fallback behavior and dynamic Google search button.
- Protected admin refresh route authorization.
- Absence of critical console errors.
- Build, lint, and test health where project tooling exists.

If verification cannot be run, document why and halt for review.

### 3.4 Exact Coloring Logic

`getTileStates` or its approved equivalent must be the single source of truth for tile states. It must match original Wordle behavior exactly, including duplicate-letter accounting. Any UI keyboard state, share output, validation feedback, or statistics derived from guesses must rely on this canonical logic rather than duplicating rules.

### 3.5 Data Layer Discipline

The word list and definition system must follow the approved hybrid strategy:

- Primary word list source: pre-processed English OpenList JSON files, `words_length_{N}.json` for N = 2 through 35.
- Production builds bundle the selected JSON assets at build time.
- Runtime update checks occur on production deploys.
- A protected admin route supports manual refresh override.
- The implementation must degrade gracefully when updates or definition sources are unavailable.

No client-side code may contain secrets, private tokens, service-role keys, or privileged Supabase credentials.

### 3.6 Definitions System Priority

Definitions are displayed after a game ends. The lookup order is mandatory:

1. Pre-processed English OpenList JSON definition, when available.
2. Dictionary API.
3. Wiktionary fallback.
4. Google search button, always available.

If definition sources fail, show a clear, non-intrusive fallback message and a dynamic button labeled like `Search Google for ‘apple’`. The button must open a new tab searching Google for `define [WORD]`.

### 3.7 Supabase and Admin Requirements

Supabase is required for account and cloud-sync functionality. Guest mode must work without an account, but the account system must be designed for Supabase from day one.

The manual word list refresh override must be protected by a Supabase authenticated user with an `admin` role. Manual admin role assignment through the Supabase dashboard is acceptable for v1. RLS policies must be enforced for cloud data, and authorization checks must never rely only on client-side UI hiding.

### 3.8 Hosting and Deployment

The game targets Vercel as the primary hosting platform. Blog and documentation content target GitHub Pages with Jekyll. Implementation choices must not undermine those hosting decisions without explicit user approval.

---

## 4. Product Requirements to Preserve

Every implementation phase must preserve these required capabilities:

- `og` mode: classic single-puzzle Wordle-style play.
- `go` mode: chained 5-puzzle Hurdle-style play with carry-over pre-fills.
- Daily and practice variants for both modes within the approved length rules.
- Hard Mode in both modes and both daily/practice contexts.
- Guest play with local progress, coins, levels, stats, and history.
- Optional Supabase account creation with email verification and cloud sync.
- Guest-to-account data transfer prompt.
- Experience, levels, coins, consumables, and Pay-to-Continue as specified.
- Per-mode statistics from day one, with a foundation for future per-length stats.
- Emoji sharing in classic Wordle format.
- PWA behavior where reasonable.
- Mobile-first, accessible, polished UI.

---

## 5. Architecture and Quality Standards

### 5.1 Technical Stack

Use the approved stack unless the user explicitly changes it:

- React 19
- TypeScript in strict mode
- Vite
- Tailwind CSS
- Zustand
- Supabase
- Vercel deployment
- GitHub Pages + Jekyll for blog/docs

### 5.2 Separation of Concerns

Keep these concerns cleanly separated:

- Game engine and validation logic.
- Word list loading and update checks.
- Definition lookup and fallback handling.
- Local guest persistence.
- Supabase account sync.
- Admin authorization and refresh actions.
- UI components, animations, and accessibility behavior.

Core logic should be testable without rendering the full UI.

### 5.3 Accessibility and UX

The app must meet WCAG AA minimums. It must support keyboard input, on-screen keyboard input, touch-friendly mobile use, readable focus states, semantic controls, and understandable loading/error/empty states. Animations must be smooth and should not block interaction.

### 5.4 Performance

Prioritize fast initial load, responsive interactions, and smooth 60 fps animations. Avoid wasteful client-side processing of large word lists when build-time or indexed access is available. Practice support for lengths 2 through 35 must not make the default daily experience slow.

### 5.5 Security

- Never commit secrets.
- Never expose Supabase service-role privileges to the browser.
- Enforce RLS for user data.
- Validate authorization server-side for admin actions.
- Treat imported word and definition data as untrusted input for rendering.
- Use safe external-link behavior for new tabs.

---

## 6. Implementation Conduct

Before changing code, the agent must understand the relevant files and existing tooling. Changes should be small, cohesive, and directly tied to the approved phase.

The agent must:

- Prefer established project tooling over manual workarounds.
- Avoid unrelated refactors.
- Avoid adding dependencies unless justified by the approved scope.
- Update documentation and changelog entries when a phase requires it.
- Keep commits aligned to reviewable units of work.
- Preserve user data migration and backward compatibility where relevant.
- Stop instead of guessing when requirements are ambiguous.

The agent must not:

- Invent new game modes or monetization mechanics.
- Skip edge cases for very short or very long practice words.
- Duplicate game rules in multiple places.
- Hide broken functionality behind UI conditions.
- Treat local success as production readiness without deployment-aware verification.

---

## 7. Required Edge Cases

Implementation and tests must explicitly consider:

- Duplicate letters in guesses and answers.
- Word lengths 2 and 35.
- Hard Mode constraints after mixed green/yellow/gray feedback.
- `go` mode carry-over pre-fills between puzzles.
- Losing with and without enough coins for Pay-to-Continue.
- Guest data transfer into a Supabase account.
- Offline or failed word list update checks.
- Missing definitions from every source except Google search.
- Unauthorized, non-admin, and admin access to the manual refresh route.
- Mobile viewport constraints and virtual keyboard behavior.

---

## 8. Review Gate Protocol

At each review gate, the agent must provide a concise status update with:

1. What changed.
2. What verification was run.
3. Any known limitations or risks.
4. The exact approval needed to continue.

The agent must then halt. It may not proceed to the next phase, scaffold additional systems, or write implementation code until the user explicitly approves.

---

## 9. Constitution Evolution

This constitution may be revised only with explicit user approval. Future revisions must preserve the core principles of scope fidelity, mandatory verification, data-layer discipline, security, accessibility, and review gates.

After the agent creates and receives approval for `AGENT-IMPLEMENTATION-PLAN.md`, a second constitution upgrade may be performed if the approved plan reveals additional project-specific governance needs.

---

**This constitution is binding for all work on the `brrrdle` project until revised with explicit user approval.**
