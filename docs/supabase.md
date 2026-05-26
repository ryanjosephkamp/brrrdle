# Supabase setup

Phase 8 adds optional Supabase accounts and cloud sync. The browser app only uses the project URL and public anon key:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Never commit or expose service-role keys in Vite environment variables.

## Schema and RLS

Apply `supabase/migrations/20260526012500_phase8_accounts.sql` to create:

- `profiles`
- `progress_snapshots`
- `game_history`
- `settings`

All user-owned tables have row-level security enabled. Users can read/write only rows where `auth.uid()` matches the row owner. Admin access is represented with an `admin` role in `app_metadata` or profile role assignment handled outside the client.

## Manual verification checklist

1. Create a Supabase project.
2. Run the Phase 8 migration.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` locally or in Vercel.
4. Sign in with a magic link.
5. Transfer local guest progress to the account.
6. Refresh and confirm cloud progress can be downloaded.
7. Confirm a second user cannot read the first user's `progress_snapshots`, `game_history`, or `settings` rows.
8. Assign an admin role through a secure server-side path, then confirm the admin route unlocks only for that user.
9. Confirm `/api/admin-refresh` rejects missing auth, non-admin auth, and non-POST requests.
