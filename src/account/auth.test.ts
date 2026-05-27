import { describe, expect, it, vi } from 'vitest'
import {
  signInWithPassword,
  signUpWithPassword,
  subscribeToAuthChanges,
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
    expect(listener).toHaveBeenCalledWith({
      status: 'authenticated',
      user: { id: 'u1', email: 'admin@example.com', roles: ['admin'] },
    })
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
