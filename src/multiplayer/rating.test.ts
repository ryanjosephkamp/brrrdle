import { describe, expect, it } from 'vitest'
import {
  MULTIPLAYER_ESTABLISHED_K,
  MULTIPLAYER_PROVISIONAL_K,
  applyRatedMatch,
  calculateExpectedScore,
  createEmptyRatingState,
  createInitialRatingProfile,
  getRatedMatchEligibility,
  getRatingBucket,
  getRatingKFactor,
} from './rating'

describe('multiplayer rating model', () => {
  it('keeps independent buckets by game mode', () => {
    expect(getRatingBucket('og')).toBe('multiplayer:og')
    expect(getRatingBucket('go')).toBe('multiplayer:go')
  })

  it('uses provisional and established K factors', () => {
    expect(getRatingKFactor(createInitialRatingProfile('user-a', 'multiplayer:og'))).toBe(MULTIPLAYER_PROVISIONAL_K)
    expect(getRatingKFactor({ gamesPlayed: 12, provisional: false })).toBe(MULTIPLAYER_ESTABLISHED_K)
  })

  it('calculates expected score from rating difference', () => {
    expect(calculateExpectedScore(1200, 1200)).toBeCloseTo(0.5)
    expect(calculateExpectedScore(1400, 1200)).toBeGreaterThan(0.75)
  })

  it('rejects unranked, anonymous, non-durable, and duplicate-user evidence', () => {
    const base = {
      authenticated: true,
      bucket: 'multiplayer:og' as const,
      durableResult: true,
      matchId: 'match-1',
      playerResults: [
        { outcome: 'win' as const, playerId: 'player-one', userId: 'user-a' },
        { outcome: 'loss' as const, playerId: 'player-two', userId: 'user-b' },
      ],
      ranked: true,
      terminalStatus: 'completed' as const,
    }

    expect(getRatedMatchEligibility({ ...base, ranked: false }).eligible).toBe(false)
    expect(getRatedMatchEligibility({ ...base, authenticated: false }).eligible).toBe(false)
    expect(getRatedMatchEligibility({ ...base, durableResult: false }).eligible).toBe(false)
    expect(getRatedMatchEligibility({
      ...base,
      playerResults: [
        { outcome: 'win', playerId: 'player-one', userId: 'user-a' },
        { outcome: 'loss', playerId: 'player-two', userId: 'user-a' },
      ],
    }).eligible).toBe(false)
  })

  it('applies one idempotent rating transaction pair per match and bucket', () => {
    const evidence = {
      authenticated: true,
      bucket: 'multiplayer:og' as const,
      durableResult: true,
      matchId: 'match-1',
      playerResults: [
        { outcome: 'win' as const, playerId: 'player-one', userId: 'user-a' },
        { outcome: 'loss' as const, playerId: 'player-two', userId: 'user-b' },
      ],
      ranked: true,
      terminalStatus: 'completed' as const,
    }
    const first = applyRatedMatch(createEmptyRatingState(), evidence, '2026-06-04T12:00:00.000Z')
    expect(first.transactions).toHaveLength(2)
    expect(first.state.profiles.find((profile) => profile.userId === 'user-a')?.rating).toBe(1220)
    expect(first.state.profiles.find((profile) => profile.userId === 'user-b')?.rating).toBe(1180)

    const second = applyRatedMatch(first.state, evidence, '2026-06-04T12:01:00.000Z')
    expect(second.transactions).toHaveLength(0)
    expect(second.state.profiles.find((profile) => profile.userId === 'user-a')?.rating).toBe(1220)
  })
})
