import { describe, expect, it } from 'vitest'
import { DEFAULT_DIFFICULTY_TIER } from '../data/difficulty'
import {
  createDailyMultiplayerGoSetup,
  createDailyMultiplayerOgSetup,
  createMultiplayerProfileSummary,
  normalizeMultiplayerProfileSummary,
} from './dailyMultiplayer'

describe('daily multiplayer helpers', () => {
  it('uses deterministic Daily Multiplayer answer lists for OG and GO', () => {
    const date = new Date('2026-06-04T12:00:00.000Z')
    const og = createDailyMultiplayerOgSetup(date, DEFAULT_DIFFICULTY_TIER)
    const repeatedOg = createDailyMultiplayerOgSetup(date, DEFAULT_DIFFICULTY_TIER)
    const go = createDailyMultiplayerGoSetup(date, DEFAULT_DIFFICULTY_TIER, 5)

    expect(og.dateKey).toBe('2026-06-04')
    expect(repeatedOg.answer).toBe(og.answer)
    expect(go.puzzles).toHaveLength(5)
    expect(go.puzzles[0].answer).not.toBe(og.answer)
  })

  it('sanitizes rival profile summaries before they enter match projections', () => {
    const summary = createMultiplayerProfileSummary({
      accentColor: '#67e8f9',
      avatarUrl: 'https://example.test/avatar.png',
      displayName: 'Lunar Player',
      label: 'private@example.test',
    })
    const rejectedEmailLabel = normalizeMultiplayerProfileSummary({ label: 'private@example.test' })

    expect(summary.label).toBe('Lunar Player')
    expect(summary.initials).toBe('LP')
    expect(summary.accentColor).toBe('#67e8f9')
    expect(rejectedEmailLabel).toBeUndefined()
  })
})
