import type { ReactNode } from 'react'
import { Panel } from './Panel'

interface LayoutProps {
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly navigation: ReactNode
  readonly children: ReactNode
}

export function Layout({ eyebrow, title, description, navigation, children }: LayoutProps) {
  return (
    <div className="min-h-svh bg-[radial-gradient(circle_at_top_left,var(--color-aurora-glow),transparent_30rem),linear-gradient(180deg,var(--color-polar-night),var(--color-deep-ice))] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Panel as="header" className="p-6 sm:p-8" tone="accent">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-ice-200)]">{eyebrow}</p>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
              <p className="text-base leading-7 text-slate-300">{description}</p>
            </div>
            {navigation}
          </div>
        </Panel>

        <Panel as="main">
          {children}
        </Panel>
      </div>
    </div>
  )
}
