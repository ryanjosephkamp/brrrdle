import type { User } from '@supabase/supabase-js'
import type { BrrrdleSupabaseClient } from './supabaseClient'

export interface AuthUserSummary {
  readonly email?: string
  readonly id: string
  readonly roles: readonly string[]
}

export interface AuthState {
  readonly status: 'anonymous' | 'authenticated' | 'unconfigured'
  readonly user?: AuthUserSummary
}

function getRoles(user: User): readonly string[] {
  const metadataRoles = user.app_metadata.roles
  if (Array.isArray(metadataRoles) && metadataRoles.every((role) => typeof role === 'string')) {
    return metadataRoles
  }

  const singleRole = user.app_metadata.role
  return typeof singleRole === 'string' ? [singleRole] : []
}

export function summarizeUser(user: User): AuthUserSummary {
  return {
    email: user.email ?? undefined,
    id: user.id,
    roles: getRoles(user),
  }
}

export async function getCurrentAuthState(client: BrrrdleSupabaseClient | undefined): Promise<AuthState> {
  if (!client) {
    return { status: 'unconfigured' }
  }

  const { data, error } = await client.auth.getUser()
  if (error || !data.user) {
    return { status: 'anonymous' }
  }

  return { status: 'authenticated', user: summarizeUser(data.user) }
}

export async function sendMagicLink(client: BrrrdleSupabaseClient, email: string): Promise<{ readonly ok: true } | { readonly message: string; readonly ok: false }> {
  const normalizedEmail = email.trim().toLocaleLowerCase('en-US')
  const { error } = await client.auth.signInWithOtp({ email: normalizedEmail })
  return error ? { message: error.message, ok: false } : { ok: true }
}

export async function signOut(client: BrrrdleSupabaseClient): Promise<{ readonly ok: true } | { readonly message: string; readonly ok: false }> {
  const { error } = await client.auth.signOut()
  return error ? { message: error.message, ok: false } : { ok: true }
}
