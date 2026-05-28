import { describe, expect, it, vi } from 'vitest'
import {
  isAdminUser,
  signInWithPassword,
  signUpWithPassword,
  subscribeToAuthChanges,
  summarizeUser,
  getCurrentAuthState,
} from './auth'
import type { BrrrdleSupabaseClient } from './supabaseClient'

function makeClient(overrides: Record<string, unknown> = {}): BrrrdleSupabaseClient {
  return {
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
      signUp: vi.fn().mockResolvedValue({ error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      refreshSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      ...overrides,
    },
  } as unknown as BrrrdleSupabaseClient
}

describe('signInWithPassword', () => {
  it('rejects empty credentials without calling Supabase', async () => {
    const client = makeClient()
    const result = await signInWithPassword(client, '', '')
    expect(result).toEqual({ message: 'Email and password are required.', ok: false })
  })

  it('lowercases the email and forwards to supabase', async () => {
    const spy = vi.fn().mockResolvedValue({ error: null })
    const client = makeClient({ signInWithPassword: spy })
    const result = await signInWithPassword(client, 'Foo@Bar.com', 'secretpw1')
    expect(spy).toHaveBeenCalledWith({ email: 'foo@bar.com', password: 'secretpw1' })
    expect(result).toEqual({ ok: true })
  })

  it('returns a sanitized error message on failure', async () => {
    const spy = vi.fn().mockResolvedValue({ error: { message: 'bad creds' } })
    const client = makeClient({ signInWithPassword: spy })
    const result = await signInWithPassword(client, 'a@b.com', 'p1234567')
    expect(result).toEqual({
      message: 'Unable to sign in with those credentials. Check your email and password, then try again.',
      ok: false,
    })
  })
})

describe('signUpWithPassword', () => {
  it('enforces an 8-character minimum password', async () => {
    const client = makeClient()
    const result = await signUpWithPassword(client, 'a@b.com', 'short')
    expect(result).toEqual({ message: 'Password must be at least 8 characters.', ok: false })
  })

  it('forwards a valid signup to supabase', async () => {
    const spy = vi.fn().mockResolvedValue({ error: null })
    const client = makeClient({ signUp: spy })
    const result = await signUpWithPassword(client, 'a@b.com', 'longenough')
    expect(spy).toHaveBeenCalledWith({ email: 'a@b.com', password: 'longenough' })
    expect(result).toEqual({ ok: true })
  })

  it('returns a sanitized signup error message on failure', async () => {
    const spy = vi.fn().mockResolvedValue({ error: { message: 'raw provider detail' } })
    const client = makeClient({ signUp: spy })
    const result = await signUpWithPassword(client, 'a@b.com', 'longenough')
    expect(result).toEqual({
      message: 'Unable to create an account right now. Check the details and try again.',
      ok: false,
    })
  })
})

describe('subscribeToAuthChanges', () => {
  it('returns a noop unsubscribe when the client is undefined', () => {
    const sub = subscribeToAuthChanges(undefined, () => undefined)
    expect(() => sub.unsubscribe()).not.toThrow()
  })

  it('maps a session with user into an authenticated state', () => {
    let captured: unknown
    const listener = vi.fn()
    const subscribe = vi.fn((cb: (event: string, session: { user: { id: string; email: string; app_metadata: { role: string } } } | null) => void) => {
      captured = cb
      return { data: { subscription: { unsubscribe: vi.fn() } } }
    })
    const client = makeClient({ onAuthStateChange: subscribe })
    subscribeToAuthChanges(client, listener)
    expect(typeof captured).toBe('function')
    ;(captured as (event: string, session: unknown) => void)('SIGNED_IN', {
      user: { id: 'u1', email: 'admin@example.com', app_metadata: { role: 'admin' } },
    })
    expect(listener).toHaveBeenCalled()
    const call = listener.mock.calls[listener.mock.calls.length - 1][0]
    expect(call.status).toBe('authenticated')
    expect(call.user.id).toBe('u1')
    expect(call.user.email).toBe('admin@example.com')
    expect(call.user.roles).toEqual(['admin'])
  })

  it('maps an absent session into anonymous', () => {
    let captured: unknown
    const listener = vi.fn()
    const subscribe = vi.fn((cb: (event: string, session: unknown) => void) => {
      captured = cb
      return { data: { subscription: { unsubscribe: vi.fn() } } }
    })
    const client = makeClient({ onAuthStateChange: subscribe })
    subscribeToAuthChanges(client, listener)
    ;(captured as (event: string, session: unknown) => void)('SIGNED_OUT', null)
    expect(listener).toHaveBeenCalledWith({ status: 'anonymous' })
  })
})

describe('getCurrentAuthState admin role', () => {
  it('detects role from singular app_metadata.role', async () => {
    const client = makeClient({
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'u', email: 'a@b.com', app_metadata: { role: 'admin' } } },
        error: null,
      }),
    })
    const state = await getCurrentAuthState(client)
    expect(state.status).toBe('authenticated')
    expect(state.user?.roles).toContain('admin')
  })
})

describe('isAdminUser / summarizeUser role-source coverage', () => {
  function user(extras: Record<string, unknown>): Parameters<typeof isAdminUser>[0] {
    return { id: 'u', email: 'a@b.com', app_metadata: {}, ...extras } as Parameters<typeof isAdminUser>[0]
  }

  it('accepts admin from app_metadata.roles[]', () => {
    const u = user({ app_metadata: { roles: ['admin', 'support'] } })
    expect(isAdminUser(u)).toBe(true)
    expect(summarizeUser(u).roles).toEqual(['admin', 'support'])
  })

  it('accepts admin from singular app_metadata.role only', () => {
    const u = user({ app_metadata: { role: 'admin' } })
    expect(isAdminUser(u)).toBe(true)
    expect(summarizeUser(u).roles).toEqual(['admin'])
  })

  it('accepts admin from raw_app_meta_data.roles[] only', () => {
    const u = user({ raw_app_meta_data: { roles: ['admin'] } })
    expect(isAdminUser(u)).toBe(true)
    expect(summarizeUser(u).roles).toContain('admin')
  })

  it('accepts admin from raw_app_meta_data.role only', () => {
    const u = user({ raw_app_meta_data: { role: 'admin' } })
    expect(isAdminUser(u)).toBe(true)
    expect(summarizeUser(u).roles).toContain('admin')
  })

  it('combines app_metadata.role and raw_app_meta_data.roles without duplicates', () => {
    const u = user({ app_metadata: { role: 'admin' }, raw_app_meta_data: { roles: ['admin', 'support'] } })
    expect(summarizeUser(u).roles).toEqual(['admin', 'support'])
  })

  it('returns no roles when no source resolves to a string', () => {
    const u = user({ app_metadata: { role: 42 }, raw_app_meta_data: { role: null } })
    expect(isAdminUser(u)).toBe(false)
    expect(summarizeUser(u).roles).toEqual([])
  })

  it('does not throw on missing app_metadata fields', () => {
    const u = { id: 'x', app_metadata: undefined } as unknown as Parameters<typeof isAdminUser>[0]
    expect(() => isAdminUser(u)).not.toThrow()
    expect(summarizeUser(u).roles).toEqual([])
  })
})

describe('refreshSession on sign-in / sign-up', () => {
  it('invokes refreshSession after a successful signInWithPassword', async () => {
    const refreshSession = vi.fn().mockResolvedValue({ data: { session: null }, error: null })
    const client = makeClient({ refreshSession })
    const result = await signInWithPassword(client, 'a@b.com', 'longenough')
    expect(result).toEqual({ ok: true })
    expect(refreshSession).toHaveBeenCalledTimes(1)
  })

  it('does NOT invoke refreshSession when signInWithPassword fails', async () => {
    const refreshSession = vi.fn().mockResolvedValue({ data: { session: null }, error: null })
    const client = makeClient({
      signInWithPassword: vi.fn().mockResolvedValue({ error: { message: 'bad creds' } }),
      refreshSession,
    })
    const result = await signInWithPassword(client, 'a@b.com', 'longenough')
    expect('ok' in result && result.ok).toBe(false)
    expect(refreshSession).not.toHaveBeenCalled()
  })

  it('invokes refreshSession after a successful signUpWithPassword', async () => {
    const refreshSession = vi.fn().mockResolvedValue({ data: { session: null }, error: null })
    const client = makeClient({ refreshSession })
    const result = await signUpWithPassword(client, 'a@b.com', 'longenough')
    expect(result).toEqual({ ok: true })
    expect(refreshSession).toHaveBeenCalledTimes(1)
  })

  it('does NOT invoke refreshSession when signUpWithPassword fails', async () => {
    const refreshSession = vi.fn().mockResolvedValue({ data: { session: null }, error: null })
    const client = makeClient({
      signUp: vi.fn().mockResolvedValue({ error: { message: 'rejected' } }),
      refreshSession,
    })
    const result = await signUpWithPassword(client, 'a@b.com', 'longenough')
    expect('ok' in result && result.ok).toBe(false)
    expect(refreshSession).not.toHaveBeenCalled()
  })

  it('swallows refreshSession failures and still returns ok: true', async () => {
    const refreshSession = vi.fn().mockRejectedValue(new Error('refresh blew up'))
    const client = makeClient({ refreshSession })
    const result = await signInWithPassword(client, 'a@b.com', 'longenough')
    expect(result).toEqual({ ok: true })
    expect(refreshSession).toHaveBeenCalledTimes(1)
  })
})

describe('subscribeToAuthChanges role refresh on SIGNED_IN / TOKEN_REFRESHED / USER_UPDATED', () => {
  it('re-derives the listener state via getUser on SIGNED_IN', async () => {
    let captured: ((event: string, session: unknown) => void) | undefined
    const subscribe = vi.fn((cb: typeof captured) => {
      captured = cb
      return { data: { subscription: { unsubscribe: vi.fn() } } }
    })
    const getUser = vi.fn().mockResolvedValue({
      data: { user: { id: 'u1', email: 'admin@example.com', app_metadata: { role: 'admin' } } },
      error: null,
    })
    const listener = vi.fn()
    const client = makeClient({ onAuthStateChange: subscribe, getUser })

    subscribeToAuthChanges(client, listener)
    expect(captured).toBeTypeOf('function')

    captured!('SIGNED_IN', {
      user: { id: 'u1', email: 'admin@example.com', app_metadata: {} },
    })
    // Allow the async re-derive microtask to flush.
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(getUser).toHaveBeenCalled()
    // The second listener call must reflect the refreshed admin role.
    const lastCall = listener.mock.calls[listener.mock.calls.length - 1][0]
    expect(lastCall.user?.roles).toContain('admin')
  })

  it('does not re-derive state on unrelated events (e.g. SIGNED_OUT)', async () => {
    let captured: ((event: string, session: unknown) => void) | undefined
    const subscribe = vi.fn((cb: typeof captured) => {
      captured = cb
      return { data: { subscription: { unsubscribe: vi.fn() } } }
    })
    const getUser = vi.fn().mockResolvedValue({ data: { user: null }, error: null })
    const listener = vi.fn()
    const client = makeClient({ onAuthStateChange: subscribe, getUser })

    subscribeToAuthChanges(client, listener)
    captured!('SIGNED_OUT', null)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(getUser).not.toHaveBeenCalled()
  })
})
