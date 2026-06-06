import { describe, expect, it } from 'vitest'
import { DEFAULT_DIFFICULTY_TIER } from '../data/difficulty'
import {
  createDailyMultiplayerGoSetup,
  createDailyMultiplayerOgSetup,
  createMultiplayerProfileSummary,
  normalizeMultiplayerProfileSummary,
} from './dailyMultiplayer'

describe('daily multiplayer helpers', () => {
  it('uses separate deterministic answer lists for Daily Async and Daily Live', () => {
    const date = new Date('2026-06-04T12:00:00.000Z')
    const asyncOg = createDailyMultiplayerOgSetup(date, DEFAULT_DIFFICULTY_TIER, 'async')
    const liveOg = createDailyMultiplayerOgSetup(date, DEFAULT_DIFFICULTY_TIER, 'live')
    const asyncGo = createDailyMultiplayerGoSetup(date, DEFAULT_DIFFICULTY_TIER, 5, 'async')
    const liveGo = createDailyMultiplayerGoSetup(date, DEFAULT_DIFFICULTY_TIER, 5, 'live')

    expect(asyncOg.dateKey).toBe('2026-06-04')
    expect(liveOg.dateKey).toBe('2026-06-04')
    expect(asyncOg.answer).not.toBe(liveOg.answer)
    expect(asyncGo.puzzles.map((puzzle) => puzzle.answer)).not.toEqual(liveGo.puzzles.map((puzzle) => puzzle.answer))
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
