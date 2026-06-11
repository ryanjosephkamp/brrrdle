import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export async function navigateToPractice(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^Practice$/i }).click()
  await expect(page.getByRole('heading', { level: 1, name: /^Practice$/i })).toBeVisible()
}

export async function navigateToCalendar(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^Calendar$/i }).click()
  await expect(page.getByRole('heading', { level: 1, name: /^Calendar$/i })).toBeVisible()
}

export async function chooseMultiplayerMode(page: Page, mode: 'go' | 'og', scope: 'daily' | 'practice' = 'practice'): Promise<void> {
  const panel = page.getByTestId(`multiplayer-panel-${scope}`)
  await expect(panel).toBeVisible()
  const modeSelect = panel.locator('select').first()
  await expect(modeSelect).toBeVisible()
  await modeSelect.selectOption(mode)
  await expect(modeSelect).toHaveValue(mode)
}

export async function setPracticeMultiplayerTimeLimit(page: Page, valueMs: string): Promise<void> {
  const panel = page.getByTestId('multiplayer-panel-practice')
  await expect(panel).toBeVisible()
  const timeLimitSelect = panel.locator('select').nth(2)
  await expect(timeLimitSelect).toBeVisible()
  await timeLimitSelect.selectOption(valueMs)
  await expect(timeLimitSelect).toHaveValue(valueMs)
}

export async function openMultiplayerMatch(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^Open multiplayer match$/i }).click()
  await expect(page.getByTestId('multiplayer-status-message')).toContainText(/Multiplayer match opened|Ranked multiplayer match opened|Custom multiplayer lobby/i)
}

export async function selectMultiplayerGame(page: Page, gameId: string): Promise<void> {
  await page.getByTestId(`multiplayer-game-tab-${gameId}`).click()
  await expect(page.getByTestId('multiplayer-selected-game')).toHaveAttribute('data-game-id', gameId)
}

export async function joinMultiplayerMatch(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^Join multiplayer match$/i }).click()
  await expect(page.getByText(/Joined multiplayer match|Waiting for the next player|Your turn|Rival joined/i)).toBeVisible()
}

export async function submitGuessWithKeyboard(page: Page, guess: string): Promise<void> {
  const game = page.getByTestId('multiplayer-selected-game')
  for (const letter of guess.toLocaleUpperCase('en-US')) {
    await game.getByRole('button', { name: new RegExp(`^Enter ${letter}$`, 'i') }).click()
  }
  await game.getByRole('button', { name: /^Submit guess$/i }).click()
}

export async function submitSoloGuessWithKeyboard(page: Page, regionName: RegExp, guess: string): Promise<void> {
  const game = page.getByRole('region', { name: regionName })
  for (const letter of guess.toLocaleUpperCase('en-US')) {
    await game.getByRole('button', { name: new RegExp(`^Enter ${letter}$`, 'i') }).click()
  }
  await game.getByRole('button', { name: /^Submit guess$/i }).click()
}

export async function waitForTurn(page: Page): Promise<void> {
  await expect(page.getByText(/^Your turn$/i)).toBeVisible({ timeout: 20_000 })
}

export async function launchDailyMultiplayer(page: Page): Promise<void> {
  await navigateToCalendar(page)
  await page.getByRole('button', { name: /^Daily Multiplayer$/i }).click()
  await expect(page.getByRole('heading', { name: /^Daily Multiplayer$/i })).toBeVisible()
}
