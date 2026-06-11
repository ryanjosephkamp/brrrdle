import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export function installConsoleGuards(page: Page): string[] {
  const failures: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      const location = message.location()
      const detail = `${message.text()}${location.url ? ` (${location.url})` : ''}`
      const isMissingDefinition = /Failed to load resource: the server responded with a status of 404/u.test(message.text())
        && (
          /\/api\/definition/u.test(location.url)
          || /api\.dictionaryapi\.dev\/api\/v2\/entries/u.test(location.url)
          || /api\.dictionaryapi\.dev\/api\/v2\/entries/u.test(message.text())
        )
      if (isMissingDefinition) {
        return
      }
      failures.push(detail)
    }
  })
  page.on('pageerror', (error) => {
    failures.push(error.message)
  })
  return failures
}

export async function expectNoConsoleFailures(failures: readonly string[]): Promise<void> {
  expect(failures, failures.join('\n')).toEqual([])
}

export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
  expect(overflow).toBe(false)
}

export async function expectKeyboardState(page: Page, letter: string, state: 'absent' | 'correct' | 'present' | 'unknown'): Promise<void> {
  const multiplayerGame = page.getByTestId('multiplayer-selected-game')
  const root = await multiplayerGame.count() > 0 ? multiplayerGame : page
  const key = root.getByRole('button', { name: new RegExp(`^Enter ${letter}$`, 'i') })
  await expect(key).toBeVisible()
  const className = await key.getAttribute('class')
  const marker = {
    absent: 'bg-slate-950',
    correct: 'bg-emerald-300',
    present: 'bg-amber-300',
    unknown: 'bg-slate-800',
  }[state]
  expect(className ?? '').toContain(marker)
}

export async function expectVisibleStatus(page: Page, text: RegExp | string): Promise<void> {
  await expect(page.getByText(text)).toBeVisible()
}
