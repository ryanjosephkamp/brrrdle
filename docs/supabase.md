---
layout: page
title: Supabase setup
---

# Supabase setup

Supabase support is optional. Without configuration, the app remains playable in guest mode and shows a clear unconfigured state in account-related settings.

## Browser environment variables

The browser app only uses these public values:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Example local `.env.local` values:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Never commit secrets. Never expose service-role keys, database passwords, JWT secrets, or other privileged credentials through `VITE_*` variables.

## Phase 23 Stage 8 multiplayer note

As of Phase 23 Stage 8, the app exposes one user-facing **Multiplayer** model:

- **Practice Multiplayer** can be untimed or use creator-selected chess-clock total time limits per side.
- **Daily Multiplayer** remains strictly turn-based/asynchronous with no time limits, five-letter Daily puzzles, UTC-midnight expiry, and separate OG/GO answers.
- The previously separate Live Multiplayer UI/domain path is no longer mounted by the app.

Some Supabase tables, functions, storage keys, and migration names below still contain historical `async` or `live` wording. Those names are compatibility plumbing for pre-Stage-8 migrations and deployed schemas. The active browser app writes current Multiplayer game projections through `async_multiplayer_games`; Live tables are not part of the mounted Stage 8 multiplayer flow.

## Schema and RLS

Apply `supabase/migrations/20260526012500_phase8_accounts.sql` to create:

- `profiles`
- `progress_snapshots`
- `game_history`
- `settings`

All user-owned tables have row-level security enabled. Users can read and write only rows where `auth.uid()` matches the row owner. Admin access is represented with an `admin` role in user metadata or profile data managed outside the browser client.

For Phase 23 live multiplayer, also apply `supabase/migrations/20260604024500_phase23_live_multiplayer.sql`. It creates:

- `live_lobbies`
- `live_matches`
- `live_match_participants`
- `live_match_events`
- `get_live_multiplayer_server_time()`

These tables are additive and RLS-protected. Authenticated players can create/join live lobbies and can read/write only match rows, participant rows, and append-only events for matches they participate in. The migration also attempts to add the live tables to the `supabase_realtime` publication when that publication exists.

For Phase 23 Stage 3 competitive multiplayer, also apply `supabase/migrations/20260604033000_phase23_competitive_multiplayer.sql` after the live multiplayer migration. It additively creates or extends:

- `live_lobbies.ranked`, `rating_bucket`, `matchmaking_request_id`, and `custom_game_code`
- `live_matches.ranked`, `rating_bucket`, `matchmaking_request_id`, and `custom_game_code`
- `multiplayer_rating_profiles`
- `multiplayer_match_results`
- `multiplayer_player_results`
- `multiplayer_rating_transactions`
- `multiplayer_matchmaking_queue`
- `custom_game_lobbies`

Stage 3 rating rows are intentionally stricter than live projections. Browser clients can read permitted profile/result/transaction rows and can create their own queue/custom-lobby requests, but the migration does not grant direct client insert/update policies for rating profiles, match results, player results, or rating transactions. Production rating settlement should happen through trusted RPC/server-side code with idempotency keys so clients cannot forge old/new ELO values.

For the Phase 23 Stage 3 online-multiplayer stabilization, also apply `supabase/migrations/20260604050824_phase23_online_multiplayer_fixes.sql` after the live and competitive migrations. It creates:

- `async_multiplayer_games`

It also updates the live-lobby update policy so a second authenticated player can claim a waiting live lobby, and it adds `async_multiplayer_games` to the `supabase_realtime` publication when that publication exists. Async and live browser clients should now write only rows owned by, or participated in by, the current authenticated user; public waiting rooms can be read for matchmaking but should not be blindly upserted by every client.

For the Phase 23 Stage 3 stabilization follow-up, also apply these additive migrations in order:

- `supabase/migrations/20260604202631_phase23_multiplayer_grants_reset_forfeit.sql`
- `supabase/migrations/20260604210000_phase23_live_policy_recursion_fix.sql`
- `supabase/migrations/20260604211000_phase23_live_join_policy_fix.sql`
- `supabase/migrations/20260604211500_phase23_live_matched_lobby_visibility.sql`
- `supabase/migrations/20260604223000_phase23_daily_multiplayer_claims.sql`
- `supabase/migrations/20260605043000_phase23_stage4_lobby_cancel_spectators.sql`
- `supabase/migrations/20260605223500_phase23_stage6_daily_claim_release.sql`

These migrations grant the expected authenticated access to the multiplayer tables/functions, refine live-lobby policies so a second signed-in player can claim a waiting lobby and continue reading the matched lobby row after the join update, persist safe live-lobby host profile summaries, and enforce one Daily Multiplayer claim per authenticated user, UTC date, transport, and mode. The daily claim buckets are `async:og`, `async:go`, `live:og`, and `live:go`. They do not grant browser clients direct write access to rating profiles, rating transactions, or trusted result-settlement tables.

The Stage 4 migration adds the async `cancelled` status and a separate `live_match_spectators` table. The Stage 6 migration then narrows cancellation behavior so creator-cancelled unjoined Daily Async games and Daily Live lobbies release the matching Daily claim; joined, terminal, forfeited, expired, or matched games remain claimed for that UTC date and bucket. Live spectators are authenticated read-only viewers recorded outside `live_match_participants`; they can read the live match after joining spectator mode but cannot update match rows, participant rows, ratings, guesses, forfeits, or word-length selection.

Phase 23 Stage 14 re-audits these spectator artifacts as legacy compatibility schema. The active Stage 14 app has no mounted Live spectator runtime and does not write `live_*` or `live_match_spectators` tables; future spectator work should be separately specified before changing permissions or reactivating UI.

## Account and sync behavior

Implemented account features include:

- Supabase client creation from public browser configuration.
- Magic-link sign-in helper and sign-out helper.
- Guest progress loading, export, reset, and merge helpers.
- Cloud progress upload/download helpers with merge and failure states.
- Settings UI that shows unconfigured, anonymous, or signed-in states.

Account-backed sync and Multiplayer require a real Supabase project, applied migrations, configured environment variables, and email/auth settings in Supabase.

## Admin role assignment

For v1, assign admin privileges manually through a secure Supabase dashboard or server-side workflow. Do not assign admin roles from browser code.

Admin verification checklist:

1. Create or choose a Supabase user.
2. Assign the user an `admin` role in the approved server-side/profile metadata location.
3. Confirm the app's admin route remains locked for anonymous users.
4. Confirm the admin route remains locked for signed-in non-admin users.
5. Confirm the admin panel unlocks for the admin user.
6. Confirm `/api/admin-refresh` rejects missing auth, non-admin auth, and non-POST requests.
7. Confirm `/api/admin-refresh` accepts only authenticated admin POST requests.

## Manual verification checklist

1. Create a Supabase project.
2. Run the Phase 8 migration.
3. Run the Phase 23 multiplayer migrations listed above that match your deployed project history. Stage 8 keeps the historical table names as compatibility storage for the unified Multiplayer model.
4. Run the Phase 23 Stage 3 competitive multiplayer migration if ranked/custom multiplayer is enabled.
5. Run the Phase 23 Stage 3 online-multiplayer stabilization migration if shared account-backed Multiplayer play is enabled.
6. Run the Phase 23 Stage 3 stabilization follow-up migrations if account-backed Multiplayer matchmaking is enabled.
7. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` locally or in Vercel.
8. Sign in with a magic link.
9. Transfer local guest progress to the account.
10. Refresh and confirm cloud progress can be downloaded.
11. Confirm a second user cannot read the first user's `progress_snapshots`, `game_history`, or `settings` rows.
12. Confirm two signed-in browsers can create/join an untimed Practice Multiplayer match, submit one turn, refresh the other browser, and see the submitted turn without controlling the other player seat.
13. Confirm two signed-in browsers can create/join a timed Practice Multiplayer match and both see the same per-side chess-clock budgets.
14. Confirm Daily Multiplayer does not expose time-limit controls and persists Daily claim rows for both joined players.
15. Confirm a signed-in user cannot create or join more than one Daily Multiplayer game for the same UTC date and mode, even after the first game becomes terminal.
16. Confirm Daily Multiplayer OG and GO reveal different deterministic answer sequences for the same UTC date.
17. Confirm a Daily Multiplayer lobby creator can cancel an unjoined lobby, the lobby leaves the active count, and the same Daily mode becomes available again only while no rival has joined.
18. Confirm the five-active-game limit is enforced per authenticated user, not globally across all visible lobbies.
19. Confirm no Live Multiplayer UI is mounted in the Stage 8 app flow.
20. Confirm a user can create their own `multiplayer_matchmaking_queue` row and `custom_game_lobbies` row.
21. Confirm a browser client cannot directly insert/update `multiplayer_rating_profiles`, `multiplayer_match_results`, `multiplayer_player_results`, or `multiplayer_rating_transactions`.
22. Confirm the active browser app does not mount Live spectator UI or write `live_*` / `live_match_spectators` tables.
23. Assign an admin role through a secure server-side path, then confirm the admin route unlocks only for that user.
24. Confirm `/api/admin-refresh` rejects missing auth, non-admin auth, and non-POST requests.

## Optional: avatar uploads (Phase 15)

Phase 15 (AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27) adds an optional avatar
upload affordance in the new Profile panel. By default brrrdle renders
deterministic initials on a colored gradient, which requires no Supabase
Storage configuration. To enable image uploads:

1. In the Supabase dashboard, create a **public** Storage bucket named
   `avatars`.
2. Add an RLS policy that allows each authenticated user to insert/update
   only paths under their own `auth.uid()/`. For example:

   ```sql
   create policy "Avatars are publicly readable"
     on storage.objects for select
     using ( bucket_id = 'avatars' );

   create policy "Users can manage their own avatar"
     on storage.objects for all
     using ( bucket_id = 'avatars' and (auth.uid())::text = (storage.foldername(name))[1] )
     with check ( bucket_id = 'avatars' and (auth.uid())::text = (storage.foldername(name))[1] );
   ```

3. brrrdle probes for the bucket at runtime. If the probe fails (no
   bucket, RLS denied), the upload UI is silently hidden and the
   initials avatar is used everywhere — nothing else breaks.

Uploads are limited to PNG, JPEG, or WebP under 200 KB and are stored
under `avatars/<user-id>/avatar.<ext>` via `supabase.storage.from('avatars').upload(...)`.
