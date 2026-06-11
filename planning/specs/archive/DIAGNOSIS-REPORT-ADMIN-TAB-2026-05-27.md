# DIAGNOSIS-REPORT-ADMIN-TAB-2026-05-27.md

**Project:** brrrdle  
**Date:** 2026-05-27  
**Status:** Binding diagnosis for Copilot agent  
**Purpose:** Diagnose and fix the Admin tab issue where manual refresh controls are not appearing even for a logged-in admin user.

## Observed Symptoms

- The Admin tab consistently shows only the placeholder text:
  > "PROTECTED ADMIN  
  > Manual refresh controls  
  > Manual refresh requests must be sent through the protected `/api/admin-refresh` server route with a valid Supabase session.  
  > The browser never receives service-role credentials; admin authorization must also be enforced by Supabase RLS and the server handler."

- No actual manual refresh button or controls are rendered.
- The user is logged in via magic link (and has also tried the new email + password flow).
- In Supabase, the user's `raw_app_meta_data.role` is correctly set to `"admin"`.
- The backend route `/api/admin-refresh` exists and previously worked.
- The issue persists after:
  - Correcting `VITE_SUPABASE_ANON_KEY`
  - Redeploying on Vercel
  - Logging out / hard-refreshing / logging back in

## Expected Behavior

When a user has `raw_app_meta_data.role === "admin"` (or `app_metadata.role === "admin"`), the Admin tab must render the full manual refresh UI/controls (the button that calls `/api/admin-refresh`).

## Files / Areas Most Likely Involved

The agent must investigate these files (in priority order):

- `src/account/auth.ts` (role detection, session handling, `onAuthStateChange`)
- `src/account/AuthPanel.tsx` (login UI and session management)
- `src/app/App.tsx` (root-level auth subscription, admin tab rendering logic)
- Any admin-specific component (e.g. `src/admin/`, `src/app/AdminPanel.tsx`, or wherever the Admin tab content lives)
- `src/account/supabaseClient.ts` (client initialization, persistSession, autoRefreshToken)
- Any place that reads `session.user.app_metadata` or `session.user.raw_app_meta_data`

## Diagnostic Commands the Agent Should Run / Suggest

The agent should include these console commands in its diagnosis and use them during verification:

```js
// 1. Check current user role
supabase.auth.getUser().then(({ data }) => {
  console.log("Full user:", data.user);
  console.log("app_metadata.role:", data.user?.app_metadata?.role);
  console.log("raw_app_meta_data.role:", data.user?.raw_app_meta_data?.role);
  console.log("Is admin?", data.user?.raw_app_meta_data?.role === "admin");
});

// 2. Check if Admin tab should be visible
console.log("Current session:", supabase.auth.getSession());
```

## Scope of Fix

- Improve admin role detection so it reliably reads from both `raw_app_meta_data` and `app_metadata`.
- Ensure the session is properly refreshed/subscribed after login so the Admin tab updates immediately.
- Make the fix robust for both magic link and email + password flows.
- Keep changes minimal and safe (no deletion of files, no breaking existing login).
- Update the most recent progress report and `CHANGELOG.md` with a clear entry.
- Run full verification (`npm run lint`, `npm run test`, `npm run build`, etc.) after the fix.

## Instructions for the Agent

When you receive this diagnosis report:
- Read the full repository to understand the current auth and Admin tab code.
- Diagnose the exact root cause of why the admin role is not being detected on the frontend.
- Create a new implementation plan **addendum** (appended to `AGENT-IMPLEMENTATION-PLAN.md` as the next section).
- The addendum must be clear, numbered, with verification steps, and include any manual user follow-up steps if needed.
- Then **halt** and wait for explicit user approval before executing any code changes.

Do not begin implementation until the user explicitly approves the new plan addendum.

This document is the binding diagnosis for the Admin tab issue.

---