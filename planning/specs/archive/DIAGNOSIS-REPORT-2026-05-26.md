# DIAGNOSIS-REPORT-2026-05-26.md

**Date**: 2026-05-26  
**Status**: Critical build + runtime issues identified (Phase 12 fixes were insufficient)  
**Author**: Grok (analysis based on live preview, latest Vercel build logs, progress reports, and repository state)

---

## Executive Summary

The game is **mostly functional** but still has two visible user-facing problems and a **critical underlying build issue**:

1. **Floating “polish ready” box** in the bottom-right corner (harmless but unprofessional).
2. **Practice mode** only offers lengths **2, 5, and 35** (instead of 2–35) and many valid words are rejected with “word not in list”.

**Root Cause**: The recent Phases 12–13 (Hugging Face refresh + Vercel Blob persistence layer) introduced server-side API and data-layer files that **do not compile correctly** under the project’s current TypeScript configuration. Even after Phase 12, the frontend is still falling back to old hardcoded “seed” data instead of using the full 2–35 pre-processed JSONs.

The latest Vercel build logs (provided after adding Supabase environment variables) show that the same TypeScript errors persist. Phase 12 did not fully resolve the import/extension and export issues.

---

## Detailed Issues

### 1. Floating “polish ready” Box
- Location: Bottom-right corner (visible in screenshots).
- Cause: Leftover debug component from **Phase 9** (the polish phase). It was intentionally left as a reminder and never removed.
- Severity: Cosmetic only.

### 2. Practice Mode Length Selector + “Word not in list” Errors
- Practice mode dropdown only shows 2, 5, 35.
- Most words (even valid ones from the full lists) are rejected as “not in list”.
- Cause: The frontend validation and length selector are still using the old limited “bundled seed lengths” instead of the new full 2–35 data layer. This is directly tied to the build failures preventing the new data layer from compiling and loading correctly.

### 3. Critical Build Errors (Root Cause – Still Present)

The latest Vercel build logs show the **same category of TypeScript errors** as before:

**Primary Error Class (most common)**:
- `Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'.`

**Additional Errors**:
- Missing exported members from `src/data/index.ts` (e.g. `HUGGING_FACE_API_BASE`, `HUGGING_FACE_DATASET_ID`, `fetchHuggingFaceRemoteMetadata`, `refreshWordListsFromHuggingFace`, etc.).
- JSON import syntax issues requiring `type: "json"` attribute.
- One type mismatch in `loadWordList.ts`.

These errors were introduced when the server-side persistence layer was added in Phases 12–13. Phase 12 attempted to address them but did not fully succeed.

**Impact**: The new data layer fails to compile → frontend falls back to old hardcoded seed data → limited lengths + validation failures.

---

## Current State Summary

- Core gameplay (og/go daily, keyboard, coloring, animations, etc.) is working.
- New persistence layer (Vercel Blob + daily refresh) is coded but **still not building cleanly**.
- Supabase environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) have been added to Vercel, but the build failures prevent full functionality (Admin tab remains locked, etc.).
- No secrets or major security issues.
- All prior phases (up to Phase 11 + amendments) are complete in the repo.

---

## Recommended Fix Strategy

The fix remains straightforward but requires a more complete pass on the import and export issues:

1. Add missing `.js` extensions to **all** relative imports in `src/data/` and `api/` files.
2. Ensure `src/data/index.ts` correctly re-exports all members expected by the API routes.
3. Fix JSON import syntax where needed.
4. Remove the leftover Phase 9 polish box.
5. Update the practice mode length selector to use the full dynamic range from the manifest / data layer.
6. Verify that the new persistence layer loads correctly in both development and production.

These changes should finally resolve **both** the length selector bug and the “word not in list” errors.

---

**End of Diagnosis Report**

This report is now ready to be uploaded to the repository as `DIAGNOSIS-REPORT-2026-05-26.md`.
