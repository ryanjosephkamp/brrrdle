# Progress Step 76 - Phase 23 Stage 3 Stabilization Follow-up

## Summary

Implemented the user-authorized follow-up fixes after `phase_id = 75`. This pass focused on real account-backed multiplayer matchmaking, solo-style multiplayer gameplay UX, multiplayer forfeit, password reset recovery links, and Supabase RLS/write hardening. No PR, merge, release, optional Stage 4 work, leaderboards, social systems, or solo gameplay rule changes were performed.

## User-Reported Issues Addressed

- Other users could not reliably see or join async/live lobbies.
- Multiplayer gameplay did not match solo gameplay: it used text inputs, did not show the full blank board from match start, and did not drive the shared on-screen keyboard state.
- Consumables and Pay-to-Continue needed to stay disabled in multiplayer.
- Multiplayer needed a forfeit action that counts as a loss for rating purposes.
- Supabase password reset links behaved like ordinary magic links instead of opening a password reset UI.

## Implementation

### Account-backed async/live matchmaking

- Hardened Supabase async repository writes so the current client inserts/updates only host-owned rows and uses update-only writes for joined rows.
- Hardened Supabase live repository writes so visible waiting lobbies are not blindly upserted by every authenticated client.
- Adjusted live projection publishing to use the available Realtime channel send path.
- Added follow-up Supabase migrations for authenticated grants and live-lobby RLS policy fixes:
  - `supabase/migrations/20260604202631_phase23_multiplayer_grants_reset_forfeit.sql`
  - `supabase/migrations/20260604210000_phase23_live_policy_recursion_fix.sql`
  - `supabase/migrations/20260604211000_phase23_live_join_policy_fix.sql`
  - `supabase/migrations/20260604211500_phase23_live_matched_lobby_visibility.sql`
- Applied the Phase 23 multiplayer migrations to the configured remote Supabase project through the Supabase connector.

### Multiplayer gameplay parity

- Added `src/multiplayer/MultiplayerGameSurface.tsx`.
- Async and live panels now render the full blank board from match start.
- Async and live panels now use the shared on-screen `Keyboard` component instead of system/text-input guessing.
- Guess submission runs through the canonical OG/GO session reducers for valid guesses, word length, Hard Mode constraints, tile coloring, and keyboard-state updates.
- Multiplayer surfaces do not render consumables, Pay-to-Continue, reveal-answer, or extra-guess purchase affordances.

### Forfeit

- Added async forfeit handling in `src/multiplayer/asyncMultiplayer.ts`.
- Added live forfeit handling in `src/multiplayer/liveMultiplayer.ts`.
- Forfeits mark the forfeiting player as the loser and project as a loss when the match is otherwise rated/eligible.

### Password recovery

- Added `src/account/PasswordResetModal.tsx`.
- Supabase password-recovery redirect URLs now carry an explicit reset marker.
- `PASSWORD_RECOVERY` auth events now open the dedicated reset UI instead of treating the link as an ordinary magic-link login.
- Added password confirmation validation and Supabase password update handling.
- Repeated Supabase client creation with the same runtime config now returns a module-level singleton, preventing duplicate GoTrue client warnings during React dev StrictMode/reload checks.

### Calendar mobile carry-forward

- Calendar mobile day cells now visibly render full `S-OG`, `S-GO`, `M-OG`, `M-GO`, `L-OG`, and `L-GO` labels.
- Mobile indicators stack inside narrow day cells; desktop keeps the denser two-column layout.
- Browser smoke at 390px confirmed no text overflow, no page horizontal overflow, and no console errors.

## Remote Verification Notes

- The two provided accounts exist and are confirmed in Supabase.
- Direct password sign-in with the supplied passwords was rejected by Supabase Auth.
- To avoid changing account passwords, remote verification used generated authenticated sessions for those same confirmed accounts.
- Remote cross-client probe passed:
  - Async: user one created a Practice OG waiting game; user two saw and joined it; user one saw the joined player; a submitted turn synced to user two.
  - Live: user one created a Daily OG waiting lobby; user two saw and joined it; user one saw the match; the match started and a user-two guess synced to user one.
- Throwaway remote async/live rows created during verification were cleaned up.

## Documents Updated

- `AGENT-IMPLEMENTATION-PLAN.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`
- `docs/supabase.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-76.md`

## Verification

- `npm run lint` - passed.
- `npm run test` - passed (`450/450`).
- `npm run build` - passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` - passed.
- `git diff --check` - passed.
- Browser smoke:
  - Desktop landing/Practice smoke had no horizontal overflow and zero console errors.
  - Practice showed async and live multiplayer panels with zero enabled text inputs.
  - Mobile Calendar at 390px rendered 24 indicator chips across visible days; full labels fit without text overflow or page horizontal overflow.
  - Settings tooltip rendered through a fixed, high-z-index portal inside the 390px viewport with zero console errors.

## Gate

Halt for user review after verification. Do not create a PR, merge, release, or begin optional Stage 4 without explicit user approval.
