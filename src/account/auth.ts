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

function readRawAppMetaData(user: User): Record<string, unknown> | undefined {
  const candidate = (user as unknown as { readonly raw_app_meta_data?: unknown }).raw_app_meta_data
  return candidate && typeof candidate === 'object' ? (candidate as Record<string, unknown>) : undefined
}

function pickStringArray(value: unknown): readonly string[] | undefined {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string')
    ? (value as readonly string[])
    : undefined
}

function pickString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function getRoles(user: User): readonly string[] {
  const collected: string[] = []
  const seen = new Set<string>()
  const push = (value: string) => {
    if (!seen.has(value)) {
      seen.add(value)
      collected.push(value)
    }
  }

  const appMetadataRoles = pickStringArray(user.app_metadata?.roles)
  if (appMetadataRoles) {
    appMetadataRoles.forEach(push)
  } else {
    const appMetadataRole = pickString(user.app_metadata?.role)
    if (appMetadataRole) {
      push(appMetadataRole)
    }
  }

  const rawAppMetaData = readRawAppMetaData(user)
  if (rawAppMetaData) {
    const rawRoles = pickStringArray(rawAppMetaData.roles)
    if (rawRoles) {
      rawRoles.forEach(push)
    } else {
      const rawRole = pickString(rawAppMetaData.role)
      if (rawRole) {
        push(rawRole)
      }
    }
  }

  return collected
}

export function isAdminUser(user: User): boolean {
  return getRoles(user).includes('admin')
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
  if (error) {
    return { message: authFailureMessage('sign-in'), ok: false }
  }
  await refreshSessionBestEffort(client)
  return { ok: true }
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
  if (error) {
    return { message: authFailureMessage('sign-up'), ok: false }
  }
  await refreshSessionBestEffort(client)
  return { ok: true }
}

async function refreshSessionBestEffort(client: BrrrdleSupabaseClient): Promise<void> {
  try {
    await client.auth.refreshSession()
  } catch {
    // Intentionally swallowed: a failed refresh must not surface as a sign-in failure or sign the user out.
  }
}

export type AuthChangeListener = (state: AuthState) => void

export interface AuthSubscription {
  readonly unsubscribe: () => void
}

const ROLE_REFRESHING_EVENTS = new Set(['SIGNED_IN', 'TOKEN_REFRESHED', 'USER_UPDATED'])

export function subscribeToAuthChanges(
  client: BrrrdleSupabaseClient | undefined,
  listener: AuthChangeListener,
): AuthSubscription {
  if (!client) {
    return { unsubscribe: () => undefined }
  }

  let pendingRefresh: Promise<void> | undefined

  const { data } = client.auth.onAuthStateChange((event, session) => {
    if (!session?.user) {
      listener({ status: 'anonymous' })
      return
    }
    listener({ status: 'authenticated', user: summarizeUser(session.user) })

    if (!ROLE_REFRESHING_EVENTS.has(event) || pendingRefresh) {
      return
    }

    pendingRefresh = (async () => {
      try {
        const fresh = await getCurrentAuthState(client)
        if (fresh.status === 'authenticated') {
          listener(fresh)
        }
      } catch {
        // Best-effort refresh: never surface to the UI; never log tokens.
      } finally {
        pendingRefresh = undefined
      }
    })()
  })

  return { unsubscribe: () => data.subscription.unsubscribe() }
}

export async function signOut(client: BrrrdleSupabaseClient): Promise<{ readonly ok: true } | { readonly message: string; readonly ok: false }> {
  const { error } = await client.auth.signOut()
  return error ? { message: error.message, ok: false } : { ok: true }
}
