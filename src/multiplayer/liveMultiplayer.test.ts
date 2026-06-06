import { describe, expect, it } from 'vitest'
import {
  MAX_LIVE_MULTIPLAYER_GAMES,
  addLiveMultiplayerLobby,
  acknowledgeLiveMultiplayerEntry,
  canCreateLiveMultiplayerLobby,
  canViewerCancelLiveLobby,
  cancelLiveMultiplayerLobby,
  chooseLivePracticeWordLength,
  completeLiveWordLengthAnimation,
  createLiveMultiplayerLobby,
  expireStaleDailyLiveMultiplayerMatches,
  forfeitLiveMultiplayerMatch,
  getViewerLiveSpectator,
  getLiveMultiplayerAnswerWords,
  hasDailyLiveMultiplayerMatch,
  hasDailyLiveMultiplayerParticipation,
  joinLiveMultiplayerMatchAsSpectator,
  matchLiveMultiplayerLobby,
  normalizeLiveMultiplayerState,
  resolveLivePracticeWordLength,
  startLiveMultiplayerMatch,
  submitLiveMultiplayerGuess,
  type LiveMultiplayerState,
} from './liveMultiplayer'

function createMatchedPracticeState() {
  const lobby = createLiveMultiplayerLobby({
    createdAt: '2026-06-04T12:00:00.000Z',
    mode: 'og',
    scope: 'practice',
  })
  return matchLiveMultiplayerLobby(
    { lobbies: [lobby], matches: [] },
    { joiningUserId: 'rival-user', lobbyId: lobby.id, now: '2026-06-04T12:00:05.000Z', playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' }, seed: 2 },
  )
}

function enterHost(state: LiveMultiplayerState, matchId: string, now = '2026-06-04T12:00:06.000Z'): LiveMultiplayerState {
  return acknowledgeLiveMultiplayerEntry(state, {
    actorUserId: 'host-user',
    matchId,
    now,
    playerId: 'player-one',
  }).state
}

function createEnteredPracticeState(): LiveMultiplayerState {
  const matched = createMatchedPracticeState()
  return enterHost(matched.state, matched.state.matches[0].id)
}

describe('live multiplayer foundation', () => {
  it('matches a practice lobby, then arms word-length selection after both clients enter', () => {
    const result = createMatchedPracticeState()

    expect(result.error).toBeUndefined()
    expect(result.match?.phase).toBe('word-length-selection')
    expect(result.match?.selection?.endsAt).toBeUndefined()
    expect(result.match?.firstPlayerId).toBe('player-one')

    const entered = acknowledgeLiveMultiplayerEntry(result.state, {
      actorUserId: 'host-user',
      matchId: result.state.matches[0].id,
      now: '2026-06-04T12:00:06.000Z',
      playerId: 'player-one',
    })
    expect(entered.error).toBeUndefined()
    expect(entered.match?.selection?.endsAt).toBe('2026-06-04T12:01:06.000Z')
  })

  it('resolves different practice length choices with a non-skippable animation before countdown', () => {
    let state = createEnteredPracticeState()
    const matchId = state.matches[0].id
    state = chooseLivePracticeWordLength(state, {
      matchId,
      now: '2026-06-04T12:00:10.000Z',
      playerId: 'player-one',
      wordLength: 5,
    }).state
    state = chooseLivePracticeWordLength(state, {
      matchId,
      now: '2026-06-04T12:00:11.000Z',
      playerId: 'player-two',
      wordLength: 8,
    }).state
    const resolved = resolveLivePracticeWordLength(state, {
      matchId,
      now: '2026-06-04T12:00:12.000Z',
      randomSeed: 1,
    })

    expect(resolved.error).toBeUndefined()
    expect(resolved.match?.phase).toBe('word-length-selection')
    expect(resolved.match?.selection?.selectionCandidates).toEqual([5, 8])
    expect(resolved.match?.selection?.selectedWordLength).toBe(8)
    expect(resolved.match?.selection?.animationEndsAt).toBe('2026-06-04T12:00:13.800Z')

    const early = completeLiveWordLengthAnimation(resolved.state, matchId, '2026-06-04T12:00:13.000Z')
    expect(early.error).toContain('still running')

    const completed = completeLiveWordLengthAnimation(resolved.state, matchId, '2026-06-04T12:00:13.800Z')
    expect(completed.error).toBeUndefined()
    expect(completed.match?.phase).toBe('countdown')
    expect(completed.match?.wordLength).toBe(8)
  })

  it('aborts practice live when neither player chooses within the minute', () => {
    const state = createEnteredPracticeState()
    const resolved = resolveLivePracticeWordLength(state, {
      matchId: state.matches[0].id,
      now: '2026-06-04T12:01:07.000Z',
    })

    expect(resolved.match?.phase).toBe('aborted')
    expect(resolved.match?.abortReason).toContain('No player chose')
  })

  it('creates a daily live match with a UTC date key and deadline', () => {
    const lobby = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T23:30:00.000Z',
      mode: 'go',
      scope: 'daily',
    })
    const result = matchLiveMultiplayerLobby(
      { lobbies: [lobby], matches: [] },
      { joiningUserId: 'rival-user', lobbyId: lobby.id, now: '2026-06-04T23:31:00.000Z', seed: 3 },
    )

    expect(result.error).toBeUndefined()
    expect(result.match?.phase).toBe('countdown')
    expect(result.match?.dailyDateKey).toBe('2026-06-04')
    expect(result.match?.deadlineAt).toBe('2026-06-05T00:00:00.000Z')
    expect(result.match?.wordLength).toBe(5)
    expect(result.match?.countdownEndsAt).toBeUndefined()
    expect(hasDailyLiveMultiplayerMatch(result.state, '2026-06-04', 'go')).toBe(true)

    const entered = acknowledgeLiveMultiplayerEntry(result.state, {
      matchId: result.state.matches[0].id,
      now: '2026-06-04T23:31:01.000Z',
      playerId: 'player-one',
    })
    expect(entered.match?.countdownEndsAt).toBe('2026-06-04T23:31:04.000Z')
  })

  it('rejects a second Daily Live claim for the same user, day, and mode', () => {
    const claimed = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      hostUserId: 'user-1',
      mode: 'og',
      scope: 'daily',
    })
    const available = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:01:00.000Z',
      dailyDateKey: '2026-06-04',
      hostUserId: 'other-user',
      mode: 'og',
      scope: 'daily',
    })
    const state = { lobbies: [available, claimed], matches: [] }
    const result = matchLiveMultiplayerLobby(state, {
      joiningUserId: 'user-1',
      lobbyId: available.id,
    })

    expect(hasDailyLiveMultiplayerParticipation(state, '2026-06-04', 'og', 'user-1')).toBe(true)
    expect(result.error).toContain('already claimed')
  })

  it('allows separate Daily Live OG and GO claims for the same user and UTC day', () => {
    const og = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      hostUserId: 'user-1',
      mode: 'og',
      scope: 'daily',
    })
    const go = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:02:00.000Z',
      dailyDateKey: '2026-06-04',
      hostUserId: 'user-1',
      mode: 'go',
      scope: 'daily',
    })
    const state = addLiveMultiplayerLobby(addLiveMultiplayerLobby({ lobbies: [], matches: [] }, og), go)

    expect(state.lobbies.map((lobby) => lobby.mode).sort()).toEqual(['go', 'og'])
    expect(hasDailyLiveMultiplayerParticipation(state, '2026-06-04', 'og', 'user-1')).toBe(true)
    expect(hasDailyLiveMultiplayerParticipation(state, '2026-06-04', 'go', 'user-1')).toBe(true)
  })

  it('normalizes Daily Live matches without falling back to Practice word-length selection', () => {
    const normalized = normalizeLiveMultiplayerState({
      lobbies: [],
      matches: [{
        createdAt: '2026-06-04T12:00:00.000Z',
        dailyDateKey: '2026-06-04',
        id: 'live-match-daily-go',
        mode: 'go',
        playerProgress: [],
        players: [],
        scope: 'daily',
        seed: 1,
        updatedAt: '2026-06-04T12:00:00.000Z',
        wordLength: 5,
      }],
    })

    expect(normalized.matches[0].phase).toBe('countdown')
    expect(normalized.matches[0].scope).toBe('daily')
    expect(normalized.matches[0].wordLength).toBe(5)
  })

  it('blocks duplicate Daily Live lobby creation in the domain layer', () => {
    const first = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      hostUserId: 'user-1',
      mode: 'og',
      scope: 'daily',
    })
    const duplicate = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:02:00.000Z',
      dailyDateKey: '2026-06-04',
      hostUserId: 'user-1',
      mode: 'og',
      scope: 'daily',
    })
    const state = addLiveMultiplayerLobby({ lobbies: [], matches: [] }, first)
    const next = addLiveMultiplayerLobby(state, duplicate)

    expect(next.lobbies.map((lobby) => lobby.id)).toEqual([first.id])
  })

  it('scopes the active live limit to the authenticated player', () => {
    let state: LiveMultiplayerState = { lobbies: [], matches: [] }
    for (let index = 0; index < MAX_LIVE_MULTIPLAYER_GAMES; index += 1) {
      state = addLiveMultiplayerLobby(state, createLiveMultiplayerLobby({
        hostUserId: `other-${index}`,
        mode: 'og',
        scope: 'practice',
      }))
    }

    expect(canCreateLiveMultiplayerLobby(state, 'user-1')).toBe(true)

    for (let index = 0; index < MAX_LIVE_MULTIPLAYER_GAMES; index += 1) {
      state = addLiveMultiplayerLobby(state, createLiveMultiplayerLobby({
        hostUserId: 'user-1',
        mode: 'og',
        scope: 'practice',
      }))
    }

    expect(canCreateLiveMultiplayerLobby(state, 'user-1')).toBe(false)
  })

  it('lets only the creator cancel an unjoined live lobby and releases the Daily claim', () => {
    const lobby = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:00:00.000Z',
      dailyDateKey: '2026-06-04',
      hostUserId: 'host-user',
      mode: 'go',
      scope: 'daily',
    })
    const state = addLiveMultiplayerLobby({ lobbies: [], matches: [] }, lobby)
    const rivalDenied = cancelLiveMultiplayerLobby(state, {
      lobbyId: lobby.id,
      userId: 'rival-user',
    })
    const cancelled = cancelLiveMultiplayerLobby(state, {
      lobbyId: lobby.id,
      now: '2026-06-04T12:05:00.000Z',
      userId: 'host-user',
    })

    expect(canViewerCancelLiveLobby(lobby, 'host-user')).toBe(true)
    expect(rivalDenied.error).toContain('Only the creator')
    expect(cancelled.error).toBeUndefined()
    expect(cancelled.lobby?.status).toBe('cancelled')
    expect(canCreateLiveMultiplayerLobby(cancelled.state, 'host-user')).toBe(true)
    expect(hasDailyLiveMultiplayerParticipation(cancelled.state, '2026-06-04', 'go', 'host-user')).toBe(false)
  })

  it('preserves public rival profile labels when a live lobby is matched', () => {
    const lobby = createLiveMultiplayerLobby({
      hostProfile: { accentColor: '#67e8f9', initials: 'HP', label: 'Host Pilot' },
      hostUserId: 'host-user',
      mode: 'og',
      scope: 'practice',
    })
    const result = matchLiveMultiplayerLobby(
      { lobbies: [lobby], matches: [] },
      {
        joiningProfile: { accentColor: '#f0abfc', initials: 'RP', label: 'Rival Pilot' },
        joiningUserId: 'rival-user',
        lobbyId: lobby.id,
        seed: 2,
      },
    )

    expect(result.match?.players.map((player) => player.label)).toEqual(['Host Pilot', 'Rival Pilot'])
    expect(result.match?.playerProfiles?.['player-one']?.initials).toBe('HP')
    expect(result.match?.playerProfiles?.['player-two']?.initials).toBe('RP')
  })

  it('accepts simultaneous player guesses without turn enforcement and resolves the first winner', () => {
    const lobby = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      scope: 'daily',
    })
    let state = matchLiveMultiplayerLobby(
      { lobbies: [lobby], matches: [] },
      {
        joiningUserId: 'rival-user',
        lobbyId: lobby.id,
        now: '2026-06-04T12:00:01.000Z',
        playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
        seed: 2,
      },
    ).state
    const matchId = state.matches[0].id
    state = enterHost(state, matchId, '2026-06-04T12:00:02.000Z')
    state = startLiveMultiplayerMatch(state, matchId, '2026-06-04T12:00:05.000Z').state
    const answer = getLiveMultiplayerAnswerWords(state.matches[0])[0]
    const first = submitLiveMultiplayerGuess(state, {
      guess: answer,
      matchId,
      now: '2026-06-04T12:00:07.000Z',
      playerId: 'player-two',
    })

    expect(first.error).toBeUndefined()
    expect(first.match?.phase).toBe('finished')
    expect(first.match?.winnerId).toBe('player-two')
  })

  it('lets either player forfeit an active live match', () => {
    const lobby = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:00:00.000Z',
      mode: 'og',
      scope: 'daily',
    })
    let state = matchLiveMultiplayerLobby(
      { lobbies: [lobby], matches: [] },
      {
        joiningUserId: 'rival-user',
        lobbyId: lobby.id,
        now: '2026-06-04T12:00:01.000Z',
        playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
        seed: 2,
      },
    ).state
    const matchId = state.matches[0].id
    state = enterHost(state, matchId, '2026-06-04T12:00:02.000Z')
    state = startLiveMultiplayerMatch(state, matchId, '2026-06-04T12:00:05.000Z').state
    const forfeited = forfeitLiveMultiplayerMatch(state, {
      matchId,
      now: '2026-06-04T12:00:07.000Z',
      playerId: 'player-one',
    })

    expect(forfeited.error).toBeUndefined()
    expect(forfeited.match?.phase).toBe('finished')
    expect(forfeited.match?.winnerId).toBe('player-two')
    expect(forfeited.match?.playerProgress.find((entry) => entry.playerId === 'player-one')?.status).toBe('lost')
    expect(forfeited.match?.playerProgress.find((entry) => entry.playerId === 'player-two')?.status).toBe('won')
  })

  it('adds spectators as read-only non-player participants', () => {
    const lobby = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T12:00:00.000Z',
      hostUserId: 'host-user',
      mode: 'og',
      scope: 'daily',
    })
    let state = matchLiveMultiplayerLobby(
      { lobbies: [lobby], matches: [] },
      {
        joiningUserId: 'rival-user',
        lobbyId: lobby.id,
        now: '2026-06-04T12:00:01.000Z',
        playerUserIds: { 'player-one': 'host-user', 'player-two': 'rival-user' },
        seed: 2,
      },
    ).state
    const matchId = state.matches[0].id
    state = enterHost(state, matchId, '2026-06-04T12:00:02.000Z')
    state = startLiveMultiplayerMatch(state, matchId, '2026-06-04T12:00:05.000Z').state
    const spectating = joinLiveMultiplayerMatchAsSpectator(state, {
      matchId,
      now: '2026-06-04T12:00:06.000Z',
      profile: { initials: 'SP', label: 'Spectator Pilot' },
      userId: 'spectator-user',
    })
    const blockedGuess = submitLiveMultiplayerGuess(spectating.state, {
      actorUserId: 'spectator-user',
      guess: getLiveMultiplayerAnswerWords(spectating.state.matches[0])[0],
      matchId,
      playerId: 'player-one',
    })
    const blockedForfeit = forfeitLiveMultiplayerMatch(spectating.state, {
      actorUserId: 'spectator-user',
      matchId,
      playerId: 'player-one',
    })

    expect(spectating.error).toBeUndefined()
    expect(getViewerLiveSpectator(spectating.state.matches[0], 'spectator-user')?.profile?.label).toBe('Spectator Pilot')
    expect(blockedGuess.error).toContain('Only the signed-in player')
    expect(blockedForfeit.error).toContain('Only the signed-in player')
  })

  it('expires unfinished daily live matches at the UTC deadline', () => {
    const lobby = createLiveMultiplayerLobby({
      createdAt: '2026-06-04T23:30:00.000Z',
      mode: 'og',
      scope: 'daily',
    })
    const matched = matchLiveMultiplayerLobby(
      { lobbies: [lobby], matches: [] },
      { lobbyId: lobby.id, now: '2026-06-04T23:31:00.000Z' },
    )
    const expired = expireStaleDailyLiveMultiplayerMatches(matched.state, new Date('2026-06-05T00:00:01.000Z'))

    expect(expired.matches[0].phase).toBe('expired')
    expect(expired.matches[0].endedAt).toBe('2026-06-05T00:00:01.000Z')
  })
})
