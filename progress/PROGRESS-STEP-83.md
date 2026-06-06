# Progress Step 83 - Stage 5 Sign-In Flow Cleanup

**Phase / step**: Phase 23 Stage 5 - Email + Password sign-in action cleanup
**Date**: 2026-06-05
**Status**: Completed - Stage 5 continues
**Authority**: User explicitly authorized Stage 5 execution from `PHASE-23-STAGE-5-MULTIPLAYER-UX-FIXES-AND-POLISH-SPEC-2026-06-05.md` and `AGENT-IMPLEMENTATION-PLAN.md` §28.17
**Gates preserved**: No PR, merge, release, dedicated Multiplayer tab, notification system, floating multiplayer manager, History/Theme tabs, bots, exports/GIFs, broader redesign, or later-phase work.

## What Changed

- Removed the duplicate password sub-mode sign-in affordance from the clean auth modal.
- Ordered the Email + Password modal actions as `Sign in`, `Create account`, and `Forgot password?`.
- Preserved the existing Supabase auth behavior: sign-in still calls `onSignInWithPassword`, account creation still calls `onSignUpWithPassword`, and password reset still uses the existing forgot-password flow.
- Aligned the visible Settings inline password action row with the cleaned sign-in/create-account ordering so the older fallback panel does not preserve the duplicate-action pattern.
- Added a small regression label constant used by the modal and pinned in `AuthModal` tests.

## Verification

- `npm run test -- src/account/AuthModal.test.tsx` passed: 7/7 tests.

Pending for the full Stage 5 gate:

- Daily Multiplayer four-bucket participation verification.
- Daily Live join reliability and pulsing affordance verification.
- Daily Live GO fixed-length verification.
- Practice Live entry/timing verification.
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Desktop and 390px mobile browser smoke.
- Remote Supabase verification where relevant.

## Gate

Stage 5 implementation continues. PR creation, merge, release, dedicated Multiplayer tab work, deferred features, and later-phase work remain gated.
