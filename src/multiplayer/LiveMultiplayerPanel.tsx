import { useCallback, useEffect, useMemo, useState } from 'react'
import type { DifficultyTier } from '../data'
import { DefinitionPanel } from '../definitions'
import type { GoPuzzleCount } from '../game/constants'
import type { GameMode, PlayScope } from '../game/types'
import { Button, Panel } from '../ui'
import { classNames } from '../ui/classNames'
import {
  MAX_LIVE_MULTIPLAYER_GAMES,
  addLiveMultiplayerLobby,
  acknowledgeLiveMultiplayerEntry,
  canCreateLiveMultiplayerLobby,
  canViewerCancelLiveLobby,
  canViewerJoinLiveLobby,
  canViewerSpectateLiveMatch,
  chooseLivePracticeWordLength,
  completeLiveWordLengthAnimation,
  cancelLiveMultiplayerLobby,
  createEmptyLiveMultiplayerState,
  createLiveMultiplayerLobby,
  forfeitLiveMultiplayerMatch,
  getActiveLiveMultiplayerEntries,
  getViewerLivePlayerId,
  getViewerLiveSpectator,
  getLiveMultiplayerAnswerWords,
  hasDailyLiveMultiplayerParticipation,
  hasLiveMultiplayerPlayerEntered,
  isLiveMultiplayerMatchFullyEntered,
  joinLiveMultiplayerMatchAsSpectator,
  matchLiveMultiplayerLobby,
  normalizeLiveMultiplayerState,
  resolveLivePracticeWordLength,
  startLiveMultiplayerMatch,
  submitLiveMultiplayerGuess,
  type LiveMultiplayerMatch,
  type LiveMultiplayerPlayerId,
  type LiveMultiplayerState,
} from './liveMultiplayer'
import { WordLengthSelectionPanel } from './WordLengthSelectionPanel'
import { createCustomGameLobby } from './customGames'
import type { MultiplayerProfileSummary } from './dailyMultiplayer'
import { normalizeCompetitiveMultiplayerState, upsertCustomGameLobby, type MultiplayerCompetitiveState } from './competitiveMultiplayer'
import { createMatchmakingRequest, findBestMatchForRequest } from './matchmaking'
import { MultiplayerGameSurface } from './MultiplayerGameSurface'
import { getRatingBucket, getRatingProfile } from './rating'
import { RivalIdentityCard } from './RivalIdentityCard'
import { projectLiveMultiplayerPerformance } from './scoring'

type MultiplayerMatchKind = 'unranked' | 'ranked' | 'custom'

interface LiveMultiplayerPanelProps {
  readonly authStatus?: 'anonymous' | 'authenticated' | 'unconfigured'
  readonly competitiveState?: MultiplayerCompetitiveState
  readonly dailyDateKey?: string
  readonly defaultDifficulty: DifficultyTier
  readonly defaultGoPuzzleCount: GoPuzzleCount
  readonly onChange: (state: LiveMultiplayerState) => void
  readonly onCompetitiveChange?: (state: MultiplayerCompetitiveState) => void
  readonly onJoinSpectatorMatch?: (matchId: string) => void
  readonly readOnly?: boolean
  readonly scope: PlayScope
  readonly state: LiveMultiplayerState | undefined
  readonly viewerProfile?: MultiplayerProfileSummary
  readonly viewerUserId?: string
}

function titleForScope(scope: PlayScope): string {
  return scope === 'daily' ? 'Daily Live Multiplayer' : 'Practice Live Multiplayer'
}

function moveStateClass(state: string): string {
  if (state === 'correct') {
    return 'border-emerald-300/70 bg-emerald-300/25 text-emerald-50'
  }
  if (state === 'present') {
    return 'border-amber-300/70 bg-amber-300/20 text-amber-50'
  }
  return 'border-slate-700 bg-slate-950 text-slate-400'
}

function phaseLabel(match: LiveMultiplayerMatch): string {
  if (match.phase === 'word-length-selection') {
    return 'Selecting length'
  }
  if (match.phase === 'countdown') {
    return 'Countdown'
  }
  if (match.phase === 'playing') {
    return 'Live'
  }
  if (match.phase === 'finished') {
    return match.winnerId ? `${match.players.find((player) => player.id === match.winnerId)?.label ?? match.winnerId} won` : 'Finished'
  }
  if (match.phase === 'expired') {
    return 'Expired'
  }
  return 'Aborted'
}

function isTerminalMatch(match: LiveMultiplayerMatch): boolean {
  return match.phase === 'finished' || match.phase === 'expired' || match.phase === 'aborted'
}

export function LiveMultiplayerPanel({
  authStatus = 'unconfigured',
  competitiveState,
  dailyDateKey,
  defaultDifficulty,
  defaultGoPuzzleCount,
  onChange,
  onCompetitiveChange,
  onJoinSpectatorMatch,
  readOnly = false,
  scope,
  state,
  viewerProfile,
  viewerUserId,
}: LiveMultiplayerPanelProps) {
  const normalized = useMemo(() => normalizeLiveMultiplayerState(state ?? createEmptyLiveMultiplayerState()), [state])
  const competitive = useMemo(() => normalizeCompetitiveMultiplayerState(competitiveState), [competitiveState])
  const visibleLobbies = normalized.lobbies.filter((lobby) => lobby.scope === scope && (scope === 'practice' || lobby.dailyDateKey === dailyDateKey))
  const visibleMatches = normalized.matches.filter((match) => match.scope === scope && (scope === 'practice' || match.dailyDateKey === dailyDateKey))
  const [selectedMatchId, setSelectedMatchId] = useState<string | undefined>(() => visibleMatches[0]?.id)
  const [selectedLobbyId, setSelectedLobbyId] = useState<string | undefined>(() => visibleLobbies.find((lobby) => lobby.status === 'waiting')?.id)
  const [mode, setMode] = useState<GameMode>('og')
  const [matchKind, setMatchKind] = useState<MultiplayerMatchKind>('unranked')
  const [message, setMessage] = useState<string | undefined>(undefined)
  const onlineReady = authStatus === 'authenticated' && Boolean(viewerUserId)
  const activeCount = getActiveLiveMultiplayerEntries(normalized, viewerUserId).length
  const dailyClaimedForMode = scope === 'daily'
    ? hasDailyLiveMultiplayerParticipation(normalized, dailyDateKey, mode, viewerUserId)
    : false
  const existingDailyLobbyClaim = scope === 'daily' && viewerUserId
    ? visibleLobbies.find((lobby) => lobby.mode === mode && lobby.hostUserId === viewerUserId)
    : undefined
  const existingDailyMatchClaim = scope === 'daily' && viewerUserId
    ? visibleMatches.find((match) => match.mode === mode && getViewerLivePlayerId(match, viewerUserId))
    : undefined
  const viewerActiveMatch = viewerUserId
    ? visibleMatches.find((match) => getViewerLivePlayerId(match, viewerUserId) && !isTerminalMatch(match))
      ?? visibleMatches.find((match) => getViewerLivePlayerId(match, viewerUserId))
    : undefined
  const selectedMatchForId = selectedMatchId ? visibleMatches.find((match) => match.id === selectedMatchId) : undefined
  const selectedLobbyForId = selectedLobbyId ? visibleLobbies.find((lobby) => lobby.id === selectedLobbyId) : undefined
  const selectedLobbyMatchedMatchId = selectedLobbyForId?.status === 'matched' ? selectedLobbyForId.matchId : undefined
  const selectedLobbyMatchedMatch = selectedLobbyForId?.status === 'matched' && selectedLobbyForId.matchId
    ? visibleMatches.find((match) => match.id === selectedLobbyForId.matchId)
    : undefined
  const selectedMatchBelongsToViewer = Boolean(selectedMatchForId && viewerUserId && getViewerLivePlayerId(selectedMatchForId, viewerUserId))
  const selectedLobbyMatchBelongsToViewer = Boolean(selectedLobbyMatchedMatch && viewerUserId && getViewerLivePlayerId(selectedLobbyMatchedMatch, viewerUserId))
  const effectiveSelectedMatchId = selectedLobbyMatchedMatch && (!viewerActiveMatch || selectedLobbyMatchBelongsToViewer)
    ? selectedLobbyMatchedMatch.id
    : selectedMatchForId && (!viewerActiveMatch || selectedMatchBelongsToViewer)
    ? selectedMatchForId.id
    : viewerActiveMatch?.id ?? existingDailyMatchClaim?.id ?? visibleMatches[0]?.id
  const effectiveSelectedLobbyId = selectedLobbyId && visibleLobbies.some((lobby) => lobby.id === selectedLobbyId && lobby.status === 'waiting')
    ? selectedLobbyId
    : existingDailyLobbyClaim?.id ?? visibleLobbies.find((lobby) => lobby.status === 'waiting')?.id
  const selectedMatch = visibleMatches.find((match) => match.id === effectiveSelectedMatchId)
  const selectedLobby = visibleLobbies.find((lobby) => lobby.id === effectiveSelectedLobbyId && lobby.status === 'waiting')
  const viewerPlayerId = selectedMatch ? getViewerLivePlayerId(selectedMatch, viewerUserId) : undefined
  const viewerSpectator = selectedMatch ? getViewerLiveSpectator(selectedMatch, viewerUserId) : undefined
  const viewerProgress = selectedMatch && viewerPlayerId ? selectedMatch.playerProgress.find((entry) => entry.playerId === viewerPlayerId) : undefined
  const spectatorProgress = selectedMatch ? selectedMatch.playerProgress.find((entry) => entry.serializedSession) : undefined
  const selectedMatchFullyEntered = selectedMatch ? isLiveMultiplayerMatchFullyEntered(selectedMatch) : false
  const viewerHasEnteredSelectedMatch = selectedMatch && viewerPlayerId ? hasLiveMultiplayerPlayerEntered(selectedMatch, viewerPlayerId) : false
  const canJoinSelectedLobby = selectedLobby ? canViewerJoinLiveLobby(selectedLobby, viewerUserId) : false
  const canCancelSelectedLobby = selectedLobby ? canViewerCancelLiveLobby(selectedLobby, viewerUserId) && !readOnly : false
  const canJoinSelectedMatchAsSpectator = selectedMatch ? canViewerSpectateLiveMatch(selectedMatch, viewerUserId) && !readOnly : false
  const spectatableLobbies = visibleLobbies.filter((lobby) => (
    lobby.status === 'matched'
    && lobby.matchId
    && lobby.hostUserId !== viewerUserId
  ))
  const joiningWouldClaimDuplicateDaily = Boolean(
    selectedLobby
      && selectedLobby.scope === 'daily'
      && hasDailyLiveMultiplayerParticipation(normalized, selectedLobby.dailyDateKey, selectedLobby.mode, viewerUserId),
  )
  const canControlSelectedMatch = Boolean(onlineReady && viewerPlayerId && !readOnly)
  const canCreate = canCreateLiveMultiplayerLobby(normalized, viewerUserId) && !readOnly && onlineReady && !dailyClaimedForMode
  const rivalPlayerId = viewerPlayerId === 'player-one' ? 'player-two' : viewerPlayerId === 'player-two' ? 'player-one' : undefined
  const rivalPlayer = rivalPlayerId && selectedMatch ? selectedMatch.players.find((player) => player.id === rivalPlayerId) : undefined
  const liveDescription = scope === 'daily'
    ? `Current UTC day only${dailyDateKey ? ` (${dailyDateKey})` : ''}. The match expires at midnight UTC.`
    : 'Practice Live starts with a synchronized 1-minute word-length selection screen.'
  const authCopy = authStatus === 'authenticated'
    ? 'Signed-in realtime is ready for Supabase-backed online rooms.'
    : authStatus === 'anonymous'
      ? 'Sign in to create, join, or play shared live rooms.'
      : 'Configure Supabase and sign in to create, join, or play shared live rooms.'
  const displayedMessage = selectedLobbyMatchedMatchId ? undefined : message

  const updateFromResult = useCallback((result: { readonly error?: string; readonly lobby?: { readonly id: string }; readonly match?: LiveMultiplayerMatch; readonly state: LiveMultiplayerState }, successMessage: string) => {
    if (result.error) {
      setMessage(result.error)
      return
    }
    if (result.match) {
      setSelectedMatchId(result.match.id)
      setSelectedLobbyId(undefined)
    }
    if (result.lobby) {
      setSelectedLobbyId(result.lobby.id)
    }
    setMessage(successMessage)
    onChange(result.state)
  }, [onChange])

  const createLobby = () => {
    if (readOnly || !onlineReady || !viewerUserId) {
      return
    }
    if (existingDailyMatchClaim) {
      setSelectedMatchId(existingDailyMatchClaim.id)
      setMessage('You already have today\'s Daily Live game for this mode. Re-entering it here.')
      return
    }
    if (existingDailyLobbyClaim) {
      setSelectedLobbyId(existingDailyLobbyClaim.id)
      setMessage('You already opened today\'s Daily Live lobby for this mode. Re-entering that lobby here.')
      return
    }
    if (dailyClaimedForMode) {
      setMessage('You already claimed today\'s Daily Live game for this mode.')
      return
    }
    const ratingBucket = getRatingBucket('live', mode)
    const ranked = matchKind === 'ranked' && authStatus === 'authenticated' && Boolean(viewerUserId)
    let customGameCode: string | undefined
    let matchmakingRequestId: string | undefined
    if (matchKind === 'custom') {
      const lobby = createCustomGameLobby({
        createdByUserId: viewerUserId,
        mode,
        scope,
        transport: 'live',
      })
      customGameCode = lobby.code
      onCompetitiveChange?.(upsertCustomGameLobby(competitive, lobby))
    }
    if (ranked && viewerUserId) {
      const profile = getRatingProfile(competitive.rating, viewerUserId, ratingBucket)
      const request = createMatchmakingRequest({
        dailyDateKey,
        mode,
        rating: profile.rating,
        scope,
        transport: 'live',
        userId: viewerUserId,
      })
      const rival = createMatchmakingRequest({
        dailyDateKey,
        id: `${request.id}-preview-rival`,
        mode,
        rating: profile.rating + 20,
        scope,
        transport: 'live',
        userId: `preview-rival-${request.id}`,
      })
      matchmakingRequestId = findBestMatchForRequest(request, [rival])?.left.id ?? request.id
    }
    const lobby = createLiveMultiplayerLobby({
      customGameCode,
      dailyDateKey,
      difficulty: defaultDifficulty,
      goPuzzleCount: defaultGoPuzzleCount,
      hostProfile: viewerProfile,
      hostUserId: viewerUserId,
      matchmakingRequestId,
      mode,
      ranked,
      ratingBucket,
      scope,
    })
    const next = addLiveMultiplayerLobby(normalized, lobby)
    if (!next.lobbies.some((entry) => entry.id === lobby.id)) {
      setMessage(dailyClaimedForMode
        ? 'You already claimed today\'s Daily Live game for this mode.'
        : 'You already have five active live multiplayer games.')
      return
    }
    setSelectedLobbyId(lobby.id)
    setMessage(ranked
      ? 'Ranked live queue opened. Rating changes wait for durable authenticated settlement.'
      : matchKind === 'custom'
        ? `Custom live lobby ${customGameCode} opened. It is unranked by default.`
        : 'Live lobby opened. Waiting for another signed-in player to join.')
    onChange(next)
  }

  const matchLobby = () => {
    if (!selectedLobby || readOnly || !viewerUserId || !canJoinSelectedLobby) {
      return
    }
    updateFromResult(
      matchLiveMultiplayerLobby(normalized, {
        joiningProfile: viewerProfile,
        joiningUserId: viewerUserId,
        lobbyId: selectedLobby.id,
      }),
      scope === 'practice' ? 'Rival found. Choose word lengths.' : 'Rival found. Daily Live countdown started.',
    )
  }

  const cancelLobby = () => {
    if (!selectedLobby || readOnly || !viewerUserId) {
      return
    }
    updateFromResult(
      cancelLiveMultiplayerLobby(normalized, {
        lobbyId: selectedLobby.id,
        userId: viewerUserId,
      }),
      'Live lobby cancelled. The active-game slot and Daily Multiplayer claim are released because no rival joined.',
    )
  }

  const joinSpectator = (matchId: string | undefined) => {
    if (!matchId || !viewerUserId || readOnly) {
      return
    }
    const localMatch = normalized.matches.find((entry) => entry.id === matchId)
    if (localMatch) {
      updateFromResult(
        joinLiveMultiplayerMatchAsSpectator(normalized, {
          matchId,
          profile: viewerProfile,
          userId: viewerUserId,
        }),
        'Spectator mode joined. You can watch live state without changing the match.',
      )
      return
    }
    if (onJoinSpectatorMatch) {
      setSelectedMatchId(matchId)
      setMessage('Joining spectator mode. Live state will appear as soon as the server confirms access.')
      onJoinSpectatorMatch(matchId)
      return
    }
    setMessage('This live match is not available in the current snapshot yet.')
  }

  const chooseLength = (playerId: LiveMultiplayerPlayerId, wordLength: number) => {
    if (!selectedMatch || readOnly || playerId !== viewerPlayerId) {
      return
    }
    updateFromResult(
      chooseLivePracticeWordLength(normalized, { actorUserId: viewerUserId, matchId: selectedMatch.id, playerId, wordLength }),
      'Length choice recorded.',
    )
  }

  const resolveLength = () => {
    if (!selectedMatch || readOnly || !canControlSelectedMatch) {
      return
    }
    updateFromResult(
      resolveLivePracticeWordLength(normalized, { matchId: selectedMatch.id, randomSeed: selectedMatch.seed }),
      'Length result committed.',
    )
  }

  const completeAnimation = () => {
    if (!selectedMatch || readOnly || !canControlSelectedMatch) {
      return
    }
    updateFromResult(
      completeLiveWordLengthAnimation(normalized, selectedMatch.id),
      'Countdown started.',
    )
  }

  const startMatch = () => {
    if (!selectedMatch || readOnly || !canControlSelectedMatch) {
      return
    }
    updateFromResult(
      startLiveMultiplayerMatch(normalized, selectedMatch.id),
      'Live match started. Both players may submit at any time.',
    )
  }

  const submitGuess = (guess: string) => {
    if (!selectedMatch || readOnly || !viewerPlayerId) {
      return
    }
    const result = submitLiveMultiplayerGuess(normalized, {
      actorUserId: viewerUserId,
      guess,
      matchId: selectedMatch.id,
      playerId: viewerPlayerId,
    })
    updateFromResult(result, result.match?.phase === 'finished' ? 'Live match finished.' : 'Guess submitted.')
  }

  const forfeitMatch = () => {
    if (!selectedMatch || readOnly || !viewerPlayerId) {
      return
    }
    updateFromResult(
      forfeitLiveMultiplayerMatch(normalized, {
        actorUserId: viewerUserId,
        matchId: selectedMatch.id,
        playerId: viewerPlayerId,
      }),
      'You forfeited this live match.',
    )
  }

  useEffect(() => {
    if (!selectedMatch || !viewerPlayerId || !canControlSelectedMatch || viewerHasEnteredSelectedMatch) {
      return
    }
    const result = acknowledgeLiveMultiplayerEntry(normalized, {
      actorUserId: viewerUserId,
      matchId: selectedMatch.id,
      playerId: viewerPlayerId,
    })
    if (!result.error) {
      onChange(result.state)
    }
  }, [canControlSelectedMatch, normalized, onChange, selectedMatch, viewerHasEnteredSelectedMatch, viewerPlayerId, viewerUserId])

  useEffect(() => {
    if (!selectedMatch || readOnly || !canControlSelectedMatch) {
      return undefined
    }
    const nowMs = Date.now()
    const runAutoStep = () => {
      if (selectedMatch.phase === 'word-length-selection' && selectedMatch.selection) {
        const shouldResolve = !selectedMatch.selection.resolvedAt
          && selectedMatch.selection.endsAt
          && (selectedMatch.selection.choices.length >= 2 || Date.now() >= Date.parse(selectedMatch.selection.endsAt))
        if (shouldResolve) {
          updateFromResult(
            resolveLivePracticeWordLength(normalized, {
              matchId: selectedMatch.id,
              now: new Date().toISOString(),
              randomSeed: selectedMatch.seed,
            }),
            'Length result committed automatically.',
          )
          return
        }
        if (selectedMatch.selection.animationEndsAt && Date.now() >= Date.parse(selectedMatch.selection.animationEndsAt)) {
          updateFromResult(
            completeLiveWordLengthAnimation(normalized, selectedMatch.id, new Date().toISOString()),
            'Countdown started automatically.',
          )
        }
        return
      }
      if (selectedMatch.phase === 'countdown' && selectedMatch.countdownEndsAt && Date.now() >= Date.parse(selectedMatch.countdownEndsAt)) {
        updateFromResult(
          startLiveMultiplayerMatch(normalized, selectedMatch.id, new Date().toISOString()),
          'Live match started automatically.',
        )
      }
    }
    const futureTargetTimes = [
      selectedMatch.phase === 'word-length-selection' && !selectedMatch.selection?.resolvedAt ? selectedMatch.selection?.endsAt : undefined,
      selectedMatch.phase === 'word-length-selection' ? selectedMatch.selection?.animationEndsAt : undefined,
      selectedMatch.phase === 'countdown' ? selectedMatch.countdownEndsAt : undefined,
    ].flatMap((value) => value ? [Date.parse(value)] : []).filter((time) => time > nowMs)
    const delay = futureTargetTimes.length > 0 ? Math.max(0, Math.min(...futureTargetTimes) - nowMs) : 0
    const timeoutId = window.setTimeout(runAutoStep, delay)
    runAutoStep()
    return () => window.clearTimeout(timeoutId)
  }, [canControlSelectedMatch, normalized, readOnly, selectedMatch, updateFromResult])

  return (
    <Panel className="space-y-4 text-sm leading-6 text-slate-300" tone="muted">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-white">{titleForScope(scope)}</h3>
          <p>{liveDescription}</p>
          <p className="mt-1 text-xs text-slate-400">{authCopy}</p>
        </div>
        <p className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-100">
          {activeCount}/{MAX_LIVE_MULTIPLAYER_GAMES} active
        </p>
      </div>

      {!readOnly ? (
        <div className="grid gap-3 rounded-lg border border-white/10 bg-black/30 p-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 font-semibold text-cyan-100">
              Mode
              <select
                className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
                onChange={(event) => setMode(event.target.value as GameMode)}
                value={mode}
              >
                <option value="og">OG</option>
                <option value="go">GO</option>
              </select>
            </label>
            <label className="grid gap-1 font-semibold text-cyan-100">
              Match type
              <select
                className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
                onChange={(event) => setMatchKind(event.target.value as MultiplayerMatchKind)}
                value={matchKind}
              >
                <option value="unranked">Unranked</option>
                <option disabled={authStatus !== 'authenticated'} value="ranked">Ranked</option>
                <option value="custom">Custom code</option>
              </select>
            </label>
            <div>
              <p className="font-semibold text-cyan-100">{scope === 'daily' ? 'UTC day' : 'Difficulty'}</p>
              <p>{scope === 'daily' ? dailyDateKey : defaultDifficulty}</p>
            </div>
          </div>
          <Button disabled={!canCreate} onClick={createLobby} variant="primary">{onlineReady ? dailyClaimedForMode ? 'Daily live already claimed' : canCreate ? 'Open live lobby' : 'Active limit reached' : 'Sign in required'}</Button>
          <Button
            className={canJoinSelectedLobby && !joiningWouldClaimDuplicateDaily ? 'ring-2 ring-cyan-200/70 shadow-[0_0_34px_rgb(103_232_249/0.28)] motion-safe:animate-pulse' : undefined}
            disabled={!canJoinSelectedLobby || joiningWouldClaimDuplicateDaily}
            onClick={matchLobby}
            variant="secondary"
          >
            {joiningWouldClaimDuplicateDaily ? 'Daily live already claimed' : 'Join live lobby'}
          </Button>
        </div>
      ) : null}

      {matchKind === 'ranked' && authStatus !== 'authenticated' && !readOnly ? (
        <p className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-3 text-sm font-semibold text-amber-50">
          Sign in to enter ranked live queues. Local live preview stays unranked.
        </p>
      ) : null}

      {visibleMatches.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {visibleMatches.map((match) => (
            <Button
              key={match.id}
              onClick={() => { setSelectedMatchId(match.id); setMessage(undefined) }}
              variant={match.id === selectedMatch?.id ? 'primary' : 'secondary'}
            >
              {match.mode.toUpperCase()} · {phaseLabel(match)}
            </Button>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-white/10 bg-black/30 p-3">
          {readOnly ? 'No live match exists for this day.' : 'No live matches yet. Open a lobby to begin.'}
        </p>
      )}

      {!readOnly && visibleLobbies.filter((lobby) => lobby.status === 'waiting').length > 0 ? (
        <div className="space-y-2 rounded-lg border border-white/10 bg-black/30 p-3">
          <p className="font-semibold text-cyan-100">Waiting lobbies</p>
          <div className="flex flex-wrap gap-2">
            {visibleLobbies.filter((lobby) => lobby.status === 'waiting').map((lobby) => (
              <Button
                key={lobby.id}
                onClick={() => { setSelectedLobbyId(lobby.id); setMessage(undefined) }}
                variant={lobby.id === selectedLobby?.id ? 'primary' : 'secondary'}
              >
                {lobby.mode.toUpperCase()} · {lobby.hostUserId === viewerUserId ? 'Your lobby' : 'Joinable'}
              </Button>
            ))}
          </div>
          {selectedLobby && !canJoinSelectedLobby ? (
            <p className="text-xs text-slate-400">A second signed-in browser or device must join your waiting lobby.</p>
          ) : null}
          {selectedLobby ? (
            <RivalIdentityCard
              label={selectedLobby.hostProfile?.label ?? (selectedLobby.hostUserId === viewerUserId ? 'You' : 'Lobby host')}
              profile={selectedLobby.hostProfile}
              title={selectedLobby.hostUserId === viewerUserId ? 'Your lobby' : 'Lobby host'}
            />
          ) : null}
          {canCancelSelectedLobby ? (
            <Button onClick={cancelLobby} variant="secondary">Cancel Lobby</Button>
          ) : null}
        </div>
      ) : null}

      {!readOnly && onlineReady && spectatableLobbies.length > 0 ? (
        <div className="space-y-2 rounded-lg border border-white/10 bg-black/30 p-3">
          <p className="font-semibold text-cyan-100">Live rooms to spectate</p>
          <div className="flex flex-wrap gap-2">
            {spectatableLobbies.map((lobby) => (
              <Button key={lobby.id} onClick={() => joinSpectator(lobby.matchId)} variant="secondary">
                Spectate {lobby.mode.toUpperCase()} · {lobby.hostProfile?.label ?? 'Live room'}
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      {displayedMessage ? (
        <p className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-3 font-semibold text-cyan-50" aria-live="polite">{displayedMessage}</p>
      ) : null}

      {selectedMatch ? (
        <div className="space-y-4 rounded-lg border border-white/10 bg-black/30 p-4">
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <p className="font-semibold text-cyan-100">Phase</p>
              <p>{phaseLabel(selectedMatch)} · {selectedMatch.ranked ? 'Ranked pending settlement' : selectedMatch.customGameCode ? `Custom ${selectedMatch.customGameCode}` : 'Unranked'}</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-100">First player</p>
              <p>{selectedMatch.players.find((player) => player.id === selectedMatch.firstPlayerId)?.label}</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-100">Length</p>
              <p>{selectedMatch.wordLength ? `${selectedMatch.wordLength} letters` : 'Pending'}</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-100">Deadline</p>
              <p>{selectedMatch.deadlineAt ?? 'No UTC deadline'}</p>
            </div>
          </div>

          {selectedMatch.scope === 'practice' && selectedMatch.phase === 'word-length-selection' && selectedMatch.selection?.endsAt ? (
            <WordLengthSelectionPanel
              key={selectedMatch.id}
              match={selectedMatch}
              onChooseLength={chooseLength}
              onCompleteAnimation={completeAnimation}
              onResolve={resolveLength}
              readOnly={readOnly || !canControlSelectedMatch}
              viewerPlayerId={viewerPlayerId}
            />
          ) : selectedMatch.scope === 'practice' && selectedMatch.phase === 'word-length-selection' ? (
            <div className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-4">
              <p className="font-semibold text-cyan-50">Waiting for both players to enter</p>
              <p className="mt-1 text-sm text-cyan-100">The synchronized word-length clock starts only after both signed-in clients have loaded this match.</p>
            </div>
          ) : null}

          {viewerSpectator ? (
            <p className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-3 text-sm font-semibold text-cyan-50">
              Spectating read-only{viewerSpectator.profile?.label ? ` as ${viewerSpectator.profile.label}` : ''}. Your account can see live board updates but cannot guess, forfeit, resolve selection, or alter the match.
            </p>
          ) : null}

          {rivalPlayer ? (
            <RivalIdentityCard label={rivalPlayer.label} profile={selectedMatch.playerProfiles?.[rivalPlayer.id]} />
          ) : viewerSpectator ? (
            <div className="grid gap-3 md:grid-cols-2">
              {selectedMatch.players.map((player) => (
                <RivalIdentityCard
                  key={player.id}
                  label={player.label}
                  profile={selectedMatch.playerProfiles?.[player.id]}
                  title={player.id === 'player-one' ? 'Player One' : 'Player Two'}
                />
              ))}
            </div>
          ) : null}

          {projectLiveMultiplayerPerformance(selectedMatch) ? (
            <div className="space-y-2 rounded-lg border border-violet-300/30 bg-violet-300/10 p-3">
              <p className="font-semibold text-violet-50">{projectLiveMultiplayerPerformance(selectedMatch)?.summary}</p>
              <div className="grid gap-2 md:grid-cols-2">
                {projectLiveMultiplayerPerformance(selectedMatch)?.players.map((player) => (
                  <p className="rounded-md border border-white/10 bg-black/30 p-2" key={player.playerId}>
                    {selectedMatch.players.find((entry) => entry.id === player.playerId)?.label ?? player.playerId}: {player.summary}
                  </p>
                ))}
              </div>
              {selectedMatch.ranked ? (
                <p className="text-xs text-violet-100">ELO updates only after authenticated durable result evidence; local preview rivals stay unrated.</p>
              ) : null}
            </div>
          ) : null}

          {selectedMatch.phase === 'countdown' ? (
            <div className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-4">
              <p className="font-semibold text-cyan-50">{selectedMatch.countdownEndsAt ? 'Countdown ready' : 'Waiting for both players to enter'}</p>
              <p className="mt-1 text-sm text-cyan-100">
                {selectedMatch.countdownEndsAt
                  ? 'Both clients rendered this phase before guesses open. First-player selection is already committed.'
                  : 'The Daily Live countdown starts only after both signed-in clients have loaded this match.'}
              </p>
              <Button
                className="mt-3"
                disabled={!canControlSelectedMatch || !selectedMatchFullyEntered || !selectedMatch.countdownEndsAt}
                onClick={startMatch}
                variant="primary"
              >
                Enter live arena
              </Button>
            </div>
          ) : null}

          {selectedMatch.phase === 'playing' ? (
            viewerProgress ? (
              <MultiplayerGameSurface
                disabled={!canControlSelectedMatch || viewerProgress.status !== 'playing'}
                model={{ kind: 'live', match: selectedMatch, progress: viewerProgress }}
                onSubmitGuess={submitGuess}
                statusLabel={canControlSelectedMatch ? 'Live board' : 'Participant sign-in required'}
              />
            ) : viewerSpectator && spectatorProgress ? (
              <MultiplayerGameSurface
                disabled
                model={{ kind: 'live', match: selectedMatch, progress: spectatorProgress }}
                onSubmitGuess={() => {}}
                statusLabel="Spectating read-only"
              />
            ) : (
              <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3">
                <p className="font-semibold text-cyan-100">Spectator</p>
                <p className="text-sm text-slate-300">Join as an authenticated spectator to watch this match without changing it.</p>
                {canJoinSelectedMatchAsSpectator ? (
                  <Button className="mt-3" onClick={() => joinSpectator(selectedMatch.id)} variant="secondary">Join as Spectator</Button>
                ) : null}
              </div>
            )
          ) : null}

          {!readOnly && viewerPlayerId && selectedMatch.phase !== 'finished' && selectedMatch.phase !== 'expired' && selectedMatch.phase !== 'aborted' ? (
            <div className="rounded-lg border border-rose-300/30 bg-rose-400/10 p-3 text-sm leading-6 text-rose-50">
              <p className="font-bold">Forfeit match</p>
              <p>Forfeiting ends this multiplayer game and counts as a loss for rating purposes.</p>
              <Button className="mt-2" onClick={forfeitMatch} variant="secondary">Forfeit</Button>
            </div>
          ) : null}

          <div className="grid gap-3 md:grid-cols-2">
            {selectedMatch.playerProgress.map((progress) => {
              const player = selectedMatch.players.find((entry) => entry.id === progress.playerId)
              return (
                <div className="space-y-2 rounded-lg border border-white/10 bg-slate-950/70 p-3" key={progress.playerId}>
                  <p className="font-semibold text-cyan-100">{player?.label ?? progress.playerId} history</p>
                  {progress.moves.length > 0 ? progress.moves.map((move) => (
                    <div className="rounded-md border border-white/10 bg-black/30 p-2" key={move.id}>
                      <p className="text-xs uppercase tracking-wide text-slate-400">Puzzle {move.puzzleIndex + 1} · {move.createdAt}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {move.tiles.map((tile, index) => (
                          <span
                            className={classNames('flex h-8 w-8 items-center justify-center rounded border font-black uppercase', moveStateClass(tile.state))}
                            key={`${move.id}-${index}`}
                          >
                            {tile.letter}
                          </span>
                        ))}
                      </div>
                    </div>
                  )) : (
                    <p>No live guesses yet.</p>
                  )}
                </div>
              )
            })}
          </div>

          {selectedMatch.phase === 'finished' || selectedMatch.phase === 'expired' ? (
            <div className="space-y-3 rounded-lg border border-white/10 bg-slate-950/70 p-3">
              <p className="font-semibold text-cyan-100">Answer and definitions</p>
              {getLiveMultiplayerAnswerWords(selectedMatch).map((answer, index) => (
                <DefinitionPanel
                  enabled
                  key={`${selectedMatch.id}-${answer}-${index}`}
                  mode={selectedMatch.mode}
                  scope={selectedMatch.scope}
                  word={answer}
                  wordLength={answer.length}
                />
              ))}
            </div>
          ) : null}

          {selectedMatch.phase === 'aborted' ? (
            <p className="rounded-lg border border-rose-300/30 bg-rose-400/10 p-3 text-rose-100">
              {selectedMatch.abortReason ?? 'This live match was aborted.'}
            </p>
          ) : null}
        </div>
      ) : null}
    </Panel>
  )
}
