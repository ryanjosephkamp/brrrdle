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

## Schema and RLS

Apply `supabase/migrations/20260526012500_phase8_accounts.sql` to create:

- `profiles`
- `progress_snapshots`
- `game_history`
- `settings`

All user-owned tables have row-level security enabled. Users can read and write only rows where `auth.uid()` matches the row owner. Admin access is represented with an `admin` role in user metadata or profile data managed outside the browser client.

## Account and sync behavior

Implemented account features include:

- Supabase client creation from public browser configuration.
- Magic-link sign-in helper and sign-out helper.
- Guest progress loading, export, reset, and merge helpers.
- Cloud progress upload/download helpers with merge and failure states.
- Settings UI that shows unconfigured, anonymous, or signed-in states.

Live auth and cloud sync require a real Supabase project, applied migration, configured environment variables, and email/auth settings in Supabase.

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
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` locally or in Vercel.
4. Sign in with a magic link.
5. Transfer local guest progress to the account.
6. Refresh and confirm cloud progress can be downloaded.
7. Confirm a second user cannot read the first user's `progress_snapshots`, `game_history`, or `settings` rows.
8. Assign an admin role through a secure server-side path, then confirm the admin route unlocks only for that user.
9. Confirm `/api/admin-refresh` rejects missing auth, non-admin auth, and non-POST requests.

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
