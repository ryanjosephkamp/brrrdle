# brrrdle Game Development Plan (Autonomous Copilot Agent Build) — Updated v2.6 (Final Aligned Version)

**Project**: `brrrdle` (no space) – The ultimate Wordle + Hurdle hybrid web game  
**Repository**: https://github.com/ryanjosephkamp/brrrdle (currently cleaned/minimal)  
**Core Approach**: Maximum autonomy via a GitHub Copilot coding agent (model-agnostic — any sufficiently capable model, e.g. Claude Opus 4.8) guided by a strong base Constitution + self-generated implementation plan with mandatory human review gates.  
**Date**: 2026-05-25  
**Version**: v2.6 (Final aligned version — all major decisions resolved)

---

## 1. Goal & SMART Success Criteria

**Goal**: Build a complete, polished, production-ready `brrrdle` game using the autonomous Copilot agent workflow (model-agnostic). All strategic, technical, hosting, data, scope, and UX decisions are now fully aligned.

**SMART Success Criteria**:
- Fully playable `og` + `go` modes with exact coloring, Hard Mode, hybrid word list updates (tied to production deploys + protected admin override), and clean definition fallback with dynamic Google search button.
- Daily modes fixed at 5 letters for initial launch; practice mode supports lengths 2–35.
- Lighthouse ≥ 90, zero critical errors, full testing across lengths 2–35.
- Vercel deployment for the game + GitHub Pages + Jekyll blog.

---

## 2. Exploration Summary, Assumptions & Clarifying Questions

**What was explored**:
- Successful live English OpenList preprocessing pipeline producing `words_length_{N}.json` files (2–35) with optional definitions.
- All previous decisions across hosting, data strategy, scope, UX, and operational details.

**Final Decisions Integrated**:
- **Hosting**: Vercel (primary for the game) + GitHub Pages + Jekyll (blog/docs).
- **Data consumption**: Hybrid (bundled at build time + update checking on production deploys).
- **Word list refresh**: Tied to production deploys, with manual override via protected admin route.
- **Admin route protection**: Supabase user with an `admin` role (manual assignment via Supabase dashboard for v1).
- **Definition fallback UX**: Clear non-intrusive message + dynamic “Search Google for ‘[WORD]’” button that opens a Google search in a new tab.
- **Daily puzzle policy (initial launch)**: Daily `og` and `go` modes fixed at 5 letters. Practice mode supports 2–35. Variable daily lengths will be added in future updates.
- **Supabase schemas**: Keep high-level in the spec; agent designs concrete tables and RLS policies during implementation.
- **Agent’s self-generated plan filename**: `AGENT-IMPLEMENTATION-PLAN.md`.

**Current Status of Clarification Questions / Recommendations**:
- All previous questions have been answered and integrated.
- **I currently have no new clarification questions or recommendations.**

---

## 3. Multi-Perspective Analysis

**Architect View**: The plan is now coherent, pragmatic, and well-scoped. All major architectural decisions (hosting, data layer, admin access, definition UX) are aligned and low-risk.

**Researcher / Autonomy Advocate View**: The iterative alignment process has produced an excellent, high-fidelity plan that balances autonomy with safety.

**Risk Analyst View**: Overall risk is now low. All major technical and UX risks have been addressed through clear decisions.

**Stakeholder View** (you): The plan reflects careful, thoughtful decision-making across every dimension of the project.

---

## 4. Alternative Plans

The **Full Comprehensive autonomous workflow** (base Constitution → agent upgrades it twice + creates its own implementation plan → executes with review gates) remains the recommended and aligned path.

---

## 5. Decision Matrix & MoSCoW (Final)

**MoSCoW**:
- **Must (Initial Launch)**: Core `og` + `go` gameplay (daily fixed at 5 letters), practice mode with 2–35 support, hybrid word list updates with protected admin override, definition system with dynamic Google search button, progression system, Supabase accounts, Vercel deployment + GitHub Pages blog.
- **Should**: Clean admin role management via Supabase dashboard for v1.
- **Could**: More advanced admin tooling or automated role seeding in later updates.
- **Won’t (v1)**: Variable lengths in daily modes at initial launch.

---

## 6. Detailed Step-by-Step Implementation Plan (Phased)

**Phase 0 – Governance & Scaffolding** (mandatory halt after)
- Upload `CONSTITUTION.md` (base), `BRRRDLE-SPEC.md`, and this plan (v2.6).
- Agent performs the 3-prompt constitution upgrade workflow and creates `AGENT-IMPLEMENTATION-PLAN.md`.
- Agent begins scaffolding, including:
  - Vercel configuration
  - Data layer with hybrid updates + protected admin route (Supabase `admin` role)
  - Definitions system with dynamic Google search button fallback behavior

**Subsequent Phases** (to be detailed by the agent in `AGENT-IMPLEMENTATION-PLAN.md`):
- Core engine + length-indexed data consumption
- `og` mode (daily fixed at 5, practice 2–35)
- `go` mode (daily fixed at 5, practice 2–35)
- Definitions system (pre-processed JSON first → fallback with dynamic Google button)
- Progression system, Supabase accounts, polish, blog content, deployment, and verification

Every major phase must end with commit + changelog update + explicit user approval to proceed.

---

## 7. Resources & Dependencies

- English OpenList pre-processed JSONs (live on Hugging Face)
- Vercel (primary game hosting)
- GitHub Pages + Jekyll (blog/docs)
- Supabase (auth + admin role support)
- Public definition fallback APIs

---

## 8. Edge Cases, Risks & Mitigations (Final)

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Admin role assignment is unclear | Low | Low | Clear documentation: manual assignment via Supabase dashboard for v1 |
| Definition fallback UX is inconsistent | Low | Low | Explicit dynamic button text and message behavior specified |
| Word list becomes stale between deploys | Low | Low | Hybrid approach + manual override option |

---

## 9. Verification Methods & KPIs

- Per-phase verification commands defined in `AGENT-IMPLEMENTATION-PLAN.md`
- Final verification must confirm:
  - Protected admin route (Supabase `admin` role) works for manual refresh override
  - Dynamic Google search button text and functionality work as specified
  - Daily modes locked to 5 letters; practice supports 2–35
  - Word lists refresh on production deploys
  - Lighthouse ≥ 90

---

## 10. Self-Critique / Reflexion

v2.6 represents the final aligned version of the plan. All major decisions have been made with your input, and I currently have no remaining questions or recommendations. The plan is now ready to move into the detailed specification phase (`BRRRDLE-SPEC.md` and base `CONSTITUTION.md`).

---

## 11. Constitution / PROJECT.md (Base Version)

(The base Constitution remains consistent with previous versions. It will be strengthened with the final decisions around admin routes and definition fallback UX when we finalize it in the next phase.)

---