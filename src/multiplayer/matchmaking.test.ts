import { describe, expect, it } from 'vitest'
import {
  createMatchmakingRequest,
  findBestMatchForRequest,
  getSearchBand,
  isMatchmakingCompatible,
  markMatched,
} from './matchmaking'

describe('multiplayer matchmaking', () => {
  it('widens live search bands over wait time', () => {
    const request = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      rating: 1400,
      scope: 'practice',
      transport: 'live',
      userId: 'user-a',
    })

    expect(getSearchBand(request, new Date('2026-06-04T12:00:00.000Z'))).toBe(100)
    expect(getSearchBand(request, new Date('2026-06-04T12:00:45.000Z'))).toBe(250)
  })

  it('filters by transport, mode, scope, daily UTC key, word length, and distinct users', () => {
    const left = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'go',
      rating: 1200,
      scope: 'practice',
      transport: 'async',
      userId: 'user-a',
      wordLength: 8,
    })
    const right = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'go',
      rating: 1210,
      scope: 'practice',
      transport: 'async',
      userId: 'user-b',
      wordLength: 8,
    })
    const wrongLength = { ...right, id: 'wrong-length', wordLength: 9 }
    const sameUser = { ...right, id: 'same-user', userId: 'user-a' }

    expect(isMatchmakingCompatible(left, right, new Date('2026-06-04T12:00:01.000Z'))).toBe(true)
    expect(isMatchmakingCompatible(left, wrongLength, new Date('2026-06-04T12:00:01.000Z'))).toBe(false)
    expect(isMatchmakingCompatible(left, sameUser, new Date('2026-06-04T12:00:01.000Z'))).toBe(false)
  })

  it('requires current UTC daily for daily ranked matching', () => {
    const left = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      scope: 'daily',
      transport: 'live',
      userId: 'user-a',
    })
    const right = createMatchmakingRequest({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      mode: 'og',
      scope: 'daily',
      transport: 'live',
      userId: 'user-b',
    })

    expect(isMatchmakingCompatible(left, right, new Date('2026-06-04T23:59:00.000Z'))).toBe(true)
    expect(isMatchmakingCompatible(left, right, new Date('2026-06-05T00:01:00.000Z'))).toBe(false)
  })

  it('selects the closest compatible queued opponent and marks both matched', () => {
    const left = createMatchmakingRequest({ id: 'left', mode: 'og', rating: 1300, scope: 'practice', transport: 'live', userId: 'user-a' })
    const close = createMatchmakingRequest({ id: 'close', mode: 'og', rating: 1320, scope: 'practice', transport: 'live', userId: 'user-b' })
    const far = createMatchmakingRequest({ id: 'far', mode: 'og', rating: 1500, scope: 'practice', transport: 'live', userId: 'user-c' })

    const selection = findBestMatchForRequest(left, [far, close], new Date(left.createdAt))
    expect(selection?.right.id).toBe('close')
    expect(markMatched([left, close, far], selection!).filter((request) => request.status === 'matched').map((request) => request.id)).toEqual(['left', 'close'])
  })
})
