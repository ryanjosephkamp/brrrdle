# REPOSITORY-REORGANIZATION-PLAN.md

**Project**: brrrdle
**Date**: 2026-06-10
**Version**: 1.0 (Ready for Codex)
**Purpose**: Reorganize the repository between the completion of Phase 23 and the start of Phase 24 to reduce root-level clutter, improve long-term maintainability, and create a more efficient context structure for Codex and future agents.

---

## Core Principles

- **Nothing will be deleted.** Only files may be moved or (in limited, approved cases) lightly edited.
- Codex has authority to make intelligent decisions about final placement of documents where flexibility was explicitly granted.
- The primary goals are:
  - Clean up the cluttered root directory.
  - Reduce context bloat for Codex going forward.
  - Establish a scalable, phase-oriented planning structure.
  - Preserve full historical access to all previous work.

---

## Final Proposed Directory Structure

```
brrrdle/
├── README.md
├── package.json, tsconfig*.json, vite.config.ts, vercel.json, etc.
├── .env.example, .gitignore, index.html
│
├── src/
├── api/
├── public/
├── supabase/
├── themes/
│
├── planning/                          ← New central planning hub (at root)
│   ├── README.md
│   ├── IMPLEMENTATION-PLAN.md         ← Lightweight, living high-level plan
│   │
│   ├── specs/
│   │   ├── phase-23/                  ← All Phase 23 spec-related documents (flat)
│   │   ├── phase-24/
│   │   └── archive/
│   │
│   ├── phase-24/                      ← Active phase working folder
│   │   ├── IMPLEMENTATION-PLAN.md
│   │   └── CHANGELOG.md
│   │
│   ├── history/
│   │   ├── AGENT-IMPLEMENTATION-PLAN.md
│   │   ├── CHANGELOG.md
│   │   └── AGENT-IMPLEMENTATION-PLAN-SUMMARY.md
│   │
│   └── testing/
│       └── TESTING-SUITE.md
│
├── progress/                          ← Kept at root (existing system)
│
├── docs/
│
└── (Governance files placed by Codex in best location)
```

---

## Instructions for Codex

You are authorized to perform the following tasks. You must follow the project `CONSTITUTION.md` throughout this process.

### 1. Root Directory Cleanup
- Move all Phase 23 spec-related files (including formal specs, bug notes, diagnosis reports, additions documents, and any other files that were created as part of Phase 23 planning or execution) into `planning/specs/phase-23/`.
- Keep the folder flat unless you have a strong reason to create subfolders.

### 2. Governance Documents
- First, carefully audit `BRRRDLE-SPEC.md` and update it so that it accurately reflects the current state of the game (including all features added after the early phases).
- Decide the best final location for the following files and move them there:
  - `CONSTITUTION.md`
  - `agents.md`
  - `memory.md`
  - `BRRRDLE-SPEC.md` (after updating)
  - `BRRRDLE-OVERVIEW.md`
- You may make minor updates to the Constitution if you determine it improves clarity for the new structure.

### 3. Historical / Noisy Root Files
- Move the following types of files into an appropriate location inside `planning/history/` or `planning/specs/phase-23/`:
  - All `VERCEL-*-LOGS-*.md` files
  - All `DIAGNOSIS-REPORT-*.md` files
  - `ADDITIONS-2026-05-27.md`, `AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md`, and similar historical artifacts
- You decide the cleanest organization. Do not delete any files.

### 4. Implementation Plan & Changelog Strategy
- Move the current long `AGENT-IMPLEMENTATION-PLAN.md` and `CHANGELOG.md` into `planning/history/`.
- Create a new condensed file: `planning/history/AGENT-IMPLEMENTATION-PLAN-SUMMARY.md` that summarizes the history up to the end of Phase 23 and includes links back to the full original documents.
- Create the new lightweight files:
  - `planning/IMPLEMENTATION-PLAN.md` (high-level ongoing plan)
  - `planning/phase-24/IMPLEMENTATION-PLAN.md`
  - `planning/phase-24/CHANGELOG.md`

### 5. Planning System Documentation
- Create `planning/README.md` that clearly explains:
  - The new tiered implementation plan approach (overall + per-phase)
  - How to find historical context
  - The purpose and rules of the testing suite
  - Expectations for keeping plans reasonably concise going forward

### 6. Testing Suite Foundations
- Create the folder `planning/testing/`.
- Create `planning/testing/TESTING-SUITE.md` that defines a comprehensive testing approach with:
  - **Primary focus**: Core gameplay mechanics (solo and multiplayer, including real E2E multiplayer flows).
  - **Secondary scope**: Basic smoke tests for routing and authentication.
  - **UI flexibility**: The suite should allow reasonable flexibility for significant UI changes planned in Phase 24 and beyond.
- Do **not** implement the full testing suite yet. Only create the foundation document.

### 7. Progress Tracking & Autonomy
- You are encouraged to create a new progress document (e.g. `progress/PROGRESS-STEP-REPO-REORG.md`) to log major steps of this reorganization.
- You may use multiple parallel sub-agents if you determine it will improve quality or speed.
- Run autonomously. Only stop when the new structure is fully in place and you have verified that all moves and edits were completed correctly.

### 8. Verification
- After completing the reorganization, perform a final verification that:
  - No files were deleted.
  - The new directory structure matches the plan (or your optimized version of it).
  - All governance and historical documents remain accessible.
  - `BRRRDLE-SPEC.md` has been updated and is current.

---

## What "Done" Looks Like

You should consider this task complete only when:
- The new `planning/` structure exists and is populated.
- All root-level clutter has been moved.
- `BRRRDLE-SPEC.md` has been audited and updated.
- Governance files are in their final (Codex-chosen) locations.
- `planning/README.md` and `planning/testing/TESTING-SUITE.md` have been created.
- A progress record of the work exists.
- You have performed a final self-verification.

After you finish, create a pull request with a clear summary of the changes so the user can review and merge.

---

**End of Proposal**
