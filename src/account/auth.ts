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

function authFailureMessage(action: 'sign-in' | 'sign-up'): string {
  return action === 'sign-in'
    ? 'Unable to sign in with those credentials. Check your email and password, then try again.'
    : 'Unable to create an account right now. Check the details and try again.'
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

export async function signInWithPassword(
  client: BrrrdleSupabaseClient,
  email: string,
  password: string,
): Promise<{ readonly ok: true } | { readonly message: string; readonly ok: false }> {
  const normalizedEmail = email.trim().toLocaleLowerCase('en-US')
  if (!normalizedEmail || !password) {
    return { message: 'Email and password are required.', ok: false }
  }
  const { error } = await client.auth.signInWithPassword({ email: normalizedEmail, password })
  return error ? { message: authFailureMessage('sign-in'), ok: false } : { ok: true }
}

export async function signUpWithPassword(
  client: BrrrdleSupabaseClient,
  email: string,
  password: string,
): Promise<{ readonly ok: true } | { readonly message: string; readonly ok: false }> {
  const normalizedEmail = email.trim().toLocaleLowerCase('en-US')
  if (!normalizedEmail || !password) {
    return { message: 'Email and password are required.', ok: false }
  }
  if (password.length < 8) {
    return { message: 'Password must be at least 8 characters.', ok: false }
  }
  const { error } = await client.auth.signUp({ email: normalizedEmail, password })
  return error ? { message: authFailureMessage('sign-up'), ok: false } : { ok: true }
}

export type AuthChangeListener = (state: AuthState) => void

export interface AuthSubscription {
  readonly unsubscribe: () => void
}

export function subscribeToAuthChanges(
  client: BrrrdleSupabaseClient | undefined,
  listener: AuthChangeListener,
): AuthSubscription {
  if (!client) {
    return { unsubscribe: () => undefined }
  }

  const { data } = client.auth.onAuthStateChange((_event, session) => {
    if (!session?.user) {
      listener({ status: 'anonymous' })
      return
    }
    listener({ status: 'authenticated', user: summarizeUser(session.user) })
  })

  return { unsubscribe: () => data.subscription.unsubscribe() }
}

export async function signOut(client: BrrrdleSupabaseClient): Promise<{ readonly ok: true } | { readonly message: string; readonly ok: false }> {
  const { error } = await client.auth.signOut()
  return error ? { message: error.message, ok: false } : { ok: true }
}
