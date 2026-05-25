# brrrdle Constitution

**Version**: 1.1  
**Date**: 2026-05-25  
**Status**: Upgraded governance for autonomous development, pending explicit user review and approval.

---

## Purpose

This Constitution is the binding operating agreement for building `brrrdle`. It exists to keep autonomous development aligned with the approved product scope, technical decisions, quality bar, and review process.

The agent must follow this Constitution, `BRRRDLE-SPEC.md`, and the approved v2.6 project plan in `BRRRDLE-OVERVIEW.md`. If these documents appear to conflict, the agent must stop, describe the conflict, and ask the user for a decision before proceeding.

---

## Source-of-Truth Hierarchy

1. Explicit user instructions in the current task.
2. This Constitution.
3. `BRRRDLE-SPEC.md`.
4. The approved v2.6 plan in `BRRRDLE-OVERVIEW.md`.
5. Future `AGENT-IMPLEMENTATION-PLAN.md` content, once created and approved.

No implementation detail, dependency, feature, route, or workflow may be added unless it is supported by these sources or explicitly approved by the user.

---

## Non-Negotiable Rules

1. **Fidelity to Scope**
   - Implement only what is required by the approved documents.
   - Do not add “nice-to-have” features, speculative extensibility, themes, multiplayer, leaderboards, social features, advanced AI hints, or variable-length daily puzzles for v1.
   - When uncertain, stop and ask rather than guessing.

2. **Review Gates Are Mandatory**
   - After this Constitution upgrade, halt and wait for explicit user approval.
   - After scaffolding and after every major phase defined in the future `AGENT-IMPLEMENTATION-PLAN.md`, commit the work, update the changelog if one exists or is introduced, summarize verification, and halt for explicit approval.
   - Valid forward signals are explicit user instructions such as “APPROVE”, “Start next step”, or equivalent approval language.
   - Any critical error, architectural uncertainty, data-source ambiguity, security question, or scope conflict requires an immediate halt.

3. **No Implementation Before Approved Planning**
   - Do not write application code until the Constitution upgrade is approved and the next required planning step is explicitly authorized.
   - The future `AGENT-IMPLEMENTATION-PLAN.md` must define phase boundaries, verification commands, review gates, and acceptance criteria before substantial implementation begins.

4. **Exact Game Logic**
   - `getTileStates` or its equivalent must be the single source of truth for tile coloring.
   - Coloring must match Wordle behavior exactly, including duplicate-letter handling.
   - Hard Mode must enforce green letters in fixed positions, yellow letters somewhere in subsequent guesses, and gray letters not reused.
   - Known vectors and edge cases must be tested before game logic is considered complete.

5. **Daily and Practice Scope**
   - Initial launch daily `og` mode is fixed at 5 letters.
   - Initial launch daily `go` mode is fixed at 5 letters for all five puzzles.
   - Practice mode must support lengths 2 through 35.
   - Future variable-length daily modes must not be implemented in v1.

6. **Data Layer Discipline**
   - English OpenList pre-processed JSON files are the primary word-list and definition source.
   - The hybrid strategy is mandatory: bundle selected word-list JSON at production build time and support update checking tied to production deploys.
   - Manual refresh override must be available only through a protected admin route.
   - Data-loading code must gracefully handle missing, stale, malformed, or unavailable data without breaking gameplay.

7. **Definitions System Requirements**
   - Definitions appear after a game ends, win or lose.
   - Definition priority order is mandatory:
     1. Pre-processed English OpenList JSON.
     2. Dictionary API.
     3. Wiktionary fallback.
     4. Google Search button.
   - If definitions are unavailable, show a clear, non-intrusive message that recommends the Google search action.
   - The Google button must remain available, use dynamic text in the form `Search Google for ‘[WORD]’`, and open a new tab searching `define [WORD]`.

8. **Supabase and Admin Security**
   - Supabase is the required foundation for optional accounts, cloud sync, and admin authorization.
   - Guest play must work without an account, with local progress, coins, levels, stats, and history stored locally.
   - Account creation or login must offer guest-data transfer.
   - Admin refresh controls require a Supabase user with an `admin` role; manual assignment through the Supabase dashboard is acceptable for v1.
   - Supabase Row Level Security policies must be designed deliberately and verified. Never expose secrets, service-role keys, or privileged operations in client-side code.

9. **Hosting and Deployment Alignment**
   - The game targets Vercel as the primary hosting platform.
   - Blog/docs target GitHub Pages + Jekyll.
   - Configuration should support these targets without introducing unrelated deployment systems.

10. **Verification First**
    - Run the repository’s existing lint, build, test, and verification commands at the appropriate phase.
    - Do not claim behavior works without verifying it.
    - Required verification must cover daily 5-letter lock, practice lengths 2–35, `og` and `go` flows, Hard Mode, duplicate-letter coloring, definition fallback, admin authorization, responsive/mobile behavior, accessibility, and production build behavior.

11. **Naming and Identity**
    - The game name is always `brrrdle`.
    - Use this spelling consistently in code, file names, documentation, comments, UI copy, routes, and deployment configuration unless an external system requires otherwise.

---

## Architecture and Implementation Principles

- Use React 19, TypeScript strict mode, Vite, Tailwind CSS, and Zustand unless the user approves a change.
- Prefer simple, testable modules with clear separation between game engine, UI, data access, persistence, definitions, authentication, admin operations, and deployment configuration.
- Keep client code safe for public delivery; all privileged operations must be server-side or otherwise protected by the chosen platform and Supabase policies.
- Preserve future extensibility only where it naturally follows from the required v1 architecture. Do not build unapproved future features.
- Use existing libraries and platform capabilities when appropriate, but add dependencies only when necessary and after checking for known vulnerabilities.
- Avoid large rewrites. Make small, reviewable changes tied to one phase or acceptance criterion.

---

## User Experience Standards

- Build mobile-first.
- Maintain smooth, responsive interactions suitable for 60 fps gameplay.
- Support physical keyboard and on-screen keyboard input.
- Provide clear loading, error, empty, success, and offline/degraded states.
- Meet WCAG AA accessibility at minimum.
- Preserve a polished dark-first visual direction with icy `brrr` accents.
- Keep fallbacks understandable and non-disruptive; users should never be stranded by a failed definition lookup or word-list refresh.

---

## Data, Persistence, and Progression Standards

- Practice word lengths must be length-indexed and validated for 2–35.
- Daily puzzle selection must be deterministic and fixed at 5 letters for v1.
- `og` and `go` statistics must be separated from day one.
- The data model must support future per-length statistics without requiring v1 daily variable lengths.
- Experience, levels, coins, consumables, Pay-to-Continue, game history, settings, export, reset/delete, and account changes must follow `BRRRDLE-SPEC.md`.
- Pay-to-Continue cost must account for word length and completion percentage.
- Guest data must remain usable offline where reasonable and transferable to an account when the user opts in.

---

## Admin Route Requirements

- The admin route exists only for operational functions specified by the plan, especially manual word-list refresh override.
- Access must require authenticated Supabase identity plus an `admin` role.
- Non-admin users must receive safe denial behavior without leaking privileged details.
- Admin actions must have clear success, failure, loading, and stale-data states.
- Admin functionality must be verified before release and must not rely on client-side trust alone.

---

## Review Gate Protocol

At each required gate, the agent must:

1. Stop feature work.
2. Ensure changes are committed through the approved workflow.
3. Update relevant documentation or changelog entries when applicable.
4. Report:
   - What changed.
   - What verification was run.
   - Any known risks, limitations, or unresolved questions.
5. Ask for explicit approval before continuing.

The agent must not continue past a review gate based on assumptions, silence, or implied approval.

---

## Strictly Forbidden Anti-Patterns

- Implementing features outside `BRRRDLE-SPEC.md` or the approved plan.
- Continuing past a review gate without explicit approval.
- Writing application code before the required governance and planning steps are approved.
- Skipping verification or relying on visual inspection alone for logic.
- Adding secrets, API keys, service-role keys, or privileged credentials to client code or source control.
- Weakening Supabase authorization, bypassing RLS, or trusting client-side admin checks.
- Implementing variable-length daily puzzles for v1.
- Treating external definition APIs as the primary definition source.
- Hiding definition failure instead of showing the required fallback message and Google search button.
- Mixing `og` and `go` statistics in a way that prevents per-mode reporting.
- Using any spelling other than `brrrdle` for the project name unless required by an external platform.

---

## Constitution Evolution

This Constitution may be revised only with explicit user approval. Future revisions should strengthen clarity, safety, and execution quality without weakening the core commitments above.

After the user approves this upgraded Constitution, the next governance step is to create the agent’s implementation plan as required by the approved v2.6 workflow. No implementation work should begin until that next step is explicitly authorized and completed.

---

**This Constitution is binding for all `brrrdle` work until the user explicitly approves a replacement.**
