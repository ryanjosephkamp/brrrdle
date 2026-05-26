import { describe, expect, it } from 'vitest'
import { getSupabaseRuntimeConfig } from './supabaseClient'

describe('supabase client config', () => {
  it('requires both public URL and anon key', () => {
    expect(getSupabaseRuntimeConfig({}).isConfigured).toBe(false)
    expect(getSupabaseRuntimeConfig({ VITE_SUPABASE_URL: 'https://example.supabase.co' }).isConfigured).toBe(false)
    expect(getSupabaseRuntimeConfig({ VITE_SUPABASE_URL: 'https://example.supabase.co', VITE_SUPABASE_ANON_KEY: 'anon' })).toEqual({
      anonKey: 'anon',
      isConfigured: true,
      url: 'https://example.supabase.co',
    })
  })
})
