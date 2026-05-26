import { useMemo, useState } from 'react'
import { Button, Panel } from '../ui'
import { getSupabaseRuntimeConfig } from './supabaseClient'

interface AuthPanelProps {
  readonly authEmail?: string
  readonly authStatus: 'anonymous' | 'authenticated' | 'unconfigured'
  readonly onSendMagicLink?: (email: string) => void
  readonly onSignOut?: () => void
}

export function AuthPanel({ authEmail, authStatus, onSendMagicLink, onSignOut }: AuthPanelProps) {
  const [email, setEmail] = useState('')
  const config = useMemo(() => getSupabaseRuntimeConfig(), [])

  if (!config.isConfigured || authStatus === 'unconfigured') {
    return (
      <Panel className="space-y-2 text-sm leading-6 text-slate-300" tone="muted">
        <h3 className="text-xl font-bold text-white">Account sync setup</h3>
        <p>Supabase is not configured in this environment. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to enable sign-in and cloud sync.</p>
      </Panel>
    )
  }

  if (authStatus === 'authenticated') {
    return (
      <Panel className="space-y-3 text-sm leading-6 text-slate-300" tone="muted">
        <h3 className="text-xl font-bold text-white">Signed in</h3>
        <p>{authEmail ?? 'Authenticated Supabase user'}</p>
        <Button onClick={onSignOut} variant="secondary">Sign out</Button>
      </Panel>
    )
  }

  return (
    <Panel className="space-y-3 text-sm leading-6 text-slate-300" tone="muted">
      <h3 className="text-xl font-bold text-white">Sign in for sync</h3>
      <p>Use a magic link to create or access an account, then transfer local guest progress to cloud storage.</p>
      <label className="grid gap-1 font-semibold text-cyan-100">
        Email address
        <input
          className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          value={email}
        />
      </label>
      <Button onClick={() => onSendMagicLink?.(email)} variant="primary">Send magic link</Button>
    </Panel>
  )
}
