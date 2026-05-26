# DIAGNOSIS-REPORT-2026-05-26.md

**Date**: 2026-05-26  
**Status**: Critical build + runtime issues identified  
**Author**: Grok (analysis based on live preview, build logs, progress reports, and repository state)

---

## Executive Summary

The game is **mostly functional** but has two visible user-facing problems and a **critical underlying build issue**:

1. **Floating “polish ready” box** in the bottom-right corner (harmless but unprofessional).
2. **Practice mode** only offers lengths **2, 5, and 35** (instead of 2–35) and many valid words are rejected with “word not in list”.

**Root Cause**: The recent Phases 12–13 (Hugging Face refresh + Vercel Blob persistence layer) introduced server-side API and data-layer files that **do not compile correctly** under the project’s current TypeScript configuration. The frontend is therefore falling back to old hardcoded “seed” data instead of using the full 2–35 pre-processed JSONs.

The build is succeeding enough for Vercel to create a preview, but the new data layer is broken at compile time. This explains both symptoms you are seeing.

---

## Detailed Issues

### 1. Floating “polish ready” Box
- Location: Bottom-right corner (visible in screenshots).
- Cause: Leftover debug component from **Phase 9** (the polish phase). It was intentionally left as a reminder and never removed.
- Severity: Cosmetic only.

### 2. Practice Mode Length Selector + “Word not in list” Errors
- Practice mode dropdown only shows 2, 5, 35.
- Most words (even valid ones from the full lists) are rejected as “not in list”.
- Cause: The frontend validation and length selector are still using the old limited “bundled seed lengths” instead of the new full 2–35 data layer.

### 3. Critical Build Errors (Root Cause)

The Vercel build logs (provided) show **18 TypeScript errors**:

**Primary Error Class (most common)**:
- `Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'.`

Affected files include:
- All new files in `src/data/*`
- All new files in `api/*` (cron, admin-refresh, manifest, etc.)
- Many `import` statements missing `.js` extensions.

**Secondary Errors**:
- `Cannot find name 'process'` → missing `@types/node`.
- JSON import errors requiring `type: "json"` attribute.
- One type mismatch in `loadWordList.ts`.

These errors were introduced when the server-side persistence layer was added. The Vite + TypeScript configuration expects ESM-style imports with explicit extensions for Node.js-compatible files, but the new code does not follow that rule.

**Impact**: The new data layer fails to compile → frontend falls back to old hardcoded data → limited lengths + validation failures.

---

## Current State Summary

- Core gameplay (og/go daily, keyboard, coloring, animations, etc.) is working.
- New persistence layer (Vercel Blob + daily refresh) is coded but **not building**.
- Vercel preview deploys successfully but runs with broken data layer.
- No secrets or major security issues.
- All prior phases (up to Phase 11 + amendments) are complete in the repo.

---

## Recommended Fix Strategy

The fix is straightforward but requires coordinated changes:

1. Add missing `.js` extensions to all relative imports in `src/data/` and `api/` files.
2. Install and configure `@types/node`.
3. Fix JSON import syntax where needed.
4. Remove the leftover Phase 9 polish box.
5. Update the practice mode length selector to use the full dynamic range from the manifest / data layer.
6. Verify that the new persistence layer loads correctly in both development and production.

These changes should resolve **both** the length selector bug and the “word not in list” errors.

---

**End of Diagnosis Report**

This report is now ready to be uploaded to the repository as `DIAGNOSIS-REPORT-2026-05-26.md`.

---
