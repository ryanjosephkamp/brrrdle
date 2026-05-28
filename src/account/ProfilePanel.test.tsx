import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { ProfilePanel } from './ProfilePanel'
import type { AuthState } from './auth'

function noop() {}

const authState: AuthState = {
  status: 'authenticated',
  user: {
    id: 'u1',
    email: 'ada@example.com',
    roles: [],
    profile: {
      accentColor: 'ice',
      displayName: 'Ada',
      email: 'ada@example.com',
      gradient: 'from-cyan-500 to-sky-700',
      initials: 'A',
      label: 'Ada',
    },
  },
}

describe('ProfilePanel', () => {
  it('renders nothing when closed', () => {
    const html = renderToStaticMarkup(
      <ProfilePanel authState={authState} isOpen={false} onClose={noop} onSave={noop} onSignOut={noop} />,
    )
    expect(html).toBe('')
  })

  it('renders the form fields, email, and Save/Cancel/Sign out controls', () => {
    const html = renderToStaticMarkup(
      <ProfilePanel authState={authState} isOpen onClose={noop} onSave={noop} onSignOut={noop} />,
    )
    expect(html).toContain('Your profile')
    expect(html).toContain('Display name')
    expect(html).toContain('Accent color')
    expect(html).toContain('ada@example.com')
    expect(html).toContain('Save')
    expect(html).toContain('Cancel')
    expect(html).toContain('Sign out')
  })

  it('renders the no-storage hint when the Supabase client is missing', () => {
    const html = renderToStaticMarkup(
      <ProfilePanel authState={authState} isOpen onClose={noop} onSave={noop} onSignOut={noop} />,
    )
    expect(html).toContain('Image upload is unavailable')
    expect(html).not.toContain('type="file"')
  })

  it('renders an accent radio group with allow-listed swatches', () => {
    const html = renderToStaticMarkup(
      <ProfilePanel authState={authState} isOpen onClose={noop} onSave={noop} onSignOut={noop} />,
    )
    expect(html).toMatch(/role="radio"/)
    expect(html).toContain('aria-label="Accent color"')
    expect(html).toContain('ice')
    expect(html).toContain('aurora')
  })
})
