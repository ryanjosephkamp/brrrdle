# AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md

**Title:** Authentication & User Profile Experience Redesign  
**Date:** 2026-05-27  
**Version:** 1.0  
**Author:** Grok (for Claude Opus 4.7 Copilot agent)  
**Applies to:** brrrdle repository (Phase 15 addendum)

## 1. Goals & Success Criteria

The goal is to make the sign-in / authentication experience **bug-free, intuitive, and app-like** while preserving all existing functionality (magic link, email+password, Supabase integration, admin role detection, guest persistence, etc.).

**Success criteria (must be met):**
- No duplicate buttons or confusing UI states (especially on mobile).
- Clear visual indication on **every page** whether the user is signed in or a guest.
- Forgot password flow.
- User profile settings (name, avatar/icon, optional other details).
- Guest users see a clear “Guest” indicator with easy upgrade path.
- All existing flows (magic link, daily 5-letter lock, practice 2–35, Admin tab, Word Explorer, etc.) remain 100% functional.
- No deletions of existing code; changes must be minimal and additive where possible.
- Full test coverage for new flows; all existing tests must continue to pass.

## 2. Current Problems (observed by user)

- Duplicate “Create account” buttons on mobile.
- Generic “Unable to create an account right now” error hides real Supabase errors.
- No clear “you are signed in” indicator on pages other than Settings.
- No Forgot Password option.
- No user profile customization (avatar, display name, etc.).
- Guests have no obvious visual distinction from signed-in users.
- Magic-link rate limiting feels punishing with no clear workaround.

## 3. Proposed New User Experience

### 3.1 Global Signed-in / Guest Indicator
- Top navigation bar (or Settings icon area) always shows:
  - Signed-in user: small circular avatar (default = first letter of email or custom image) + display name (or email if no name set).
  - Guest: “Guest” badge with subtle “Sign in to sync” button.
- Clicking the avatar/name opens a new **Profile** panel (modal or side drawer) with quick settings.

### 3.2 Improved Sign-in / Sign-up Flow
- Single, clean **Auth Modal** (triggered from top nav or Settings).
- Two clear tabs: **Magic Link** and **Email + Password**.
- Email + Password tab has sub-modes: **Sign in** / **Create account** (no duplicate buttons).
- Forgot Password link (visible only on Sign in mode).
- Real-time error messages (friendly but informative, never generic “unable”).
- Loading states and success animations.
- After successful sign-in: immediate visual feedback + refresh of global indicator.

### 3.3 Forgot Password Flow
- Standard Supabase reset password flow.
- Clear success message (“Check your email for reset link”).

### 3.4 User Profile & Customization
- In Profile panel or dedicated Settings section:
  - Upload/customize avatar (simple image picker, stored in Supabase Storage or as base64 in user metadata).
  - Editable display name.
  - Optional: preferred color/theme accent, bio (future-proof fields).
- All changes saved to Supabase `auth.users` metadata (or a new `profiles` table if agent deems it cleaner).

### 3.5 Agent Creative Freedom
The agent (Claude) has full creative freedom to:
- Choose modern, clean UI patterns (Tailwind + existing primitives).
- Decide exact placement of avatar/indicator.
- Propose any small quality-of-life improvements (e.g., “Stay signed in” toggle, biometric hints on supported devices, etc.).
- Suggest better error handling or loading states.
All creative decisions must be documented in the implementation plan and must not break existing contracts.

## 4. Technical Requirements

- Continue using existing Supabase client (`src/account/supabaseClient.ts`).
- Extend `src/account/auth.ts` with new helpers: `resetPassword`, `updateProfile`, `uploadAvatar`, etc.
- Update `src/account/AuthPanel.tsx` and `src/app/App.tsx` for the new modal/global indicator.
- Add new component(s): `ProfilePanel.tsx`, `AuthModal.tsx` (or improve existing).
- Persist avatar/display-name in Supabase user metadata (or `profiles` table).
- Maintain all Phase 13/14 invariants (no deletions, daily 5-letter lock, practice range, sound effects, Word Explorer, etc.).
- Add unit + integration tests for new flows.
- Mobile-first responsive design.

## 5. Files Expected to Change / Be Created

**New files (recommended):**
- `src/account/ProfilePanel.tsx`
- `src/account/AuthModal.tsx` (or improved version)
- `src/account/profile.ts` (profile helpers)
- Tests for new components

**Modified files:**
- `src/account/auth.ts`
- `src/account/AuthPanel.tsx`
- `src/account/Settings.tsx`
- `src/app/App.tsx`
- `src/app/routes.ts` (if new profile route is added)
- `CHANGELOG.md`, `AGENT-IMPLEMENTATION-PLAN.md`, progress files

## 6. Agent Instructions

1. Read `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27.md`, and the latest `AGENT-IMPLEMENTATION-PLAN.md`.
2. Append a new **Phase 15** addendum to `AGENT-IMPLEMENTATION-PLAN.md`.
3. Halt for user review/approval before any code changes.
4. When authorized, implement autonomously with full verification (lint, test, build, etc.).
5. Update `CHANGELOG.md` and progress artifacts after each major step.
6. No deletions of existing functionality.

This spec is binding. The agent may propose small refinements in the plan addendum, but must stay within the spirit and goals above.

**End of spec.**