import type { AuthState } from '../account/auth'
import { ErrorState, Panel } from '../ui'
import { evaluateAdminAccess } from './authorization'

interface AdminPanelProps {
  readonly authState: AuthState
}

const reasonMessages = {
  'missing-admin-role': 'Your Supabase account does not have the admin role required for manual refresh controls.',
  'missing-authentication': 'Sign in with a Supabase account before using protected admin controls.',
  unconfigured: 'Supabase is not configured in this environment, so admin controls are unavailable.',
} as const

export function AdminPanel({ authState }: AdminPanelProps) {
  const access = evaluateAdminAccess(authState)

  if (!access.allowed) {
    return <ErrorState message={reasonMessages[access.reason ?? 'missing-authentication']} title="Admin controls locked" />
  }

  return (
    <section className="space-y-4" aria-labelledby="admin-title">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">protected admin</p>
      <h2 id="admin-title" className="text-3xl font-bold text-white">Manual refresh controls</h2>
      <Panel className="space-y-3 text-sm leading-6 text-slate-300" tone="muted">
        <p>Manual refresh requests must be sent through the protected `/api/admin-refresh` server route with a valid Supabase session.</p>
        <p>The browser never receives service-role credentials; admin authorization must also be enforced by Supabase RLS and the server handler.</p>
      </Panel>
    </section>
  )
}
