import { useMemo, useState } from 'react'
import type { DifficultyTier } from '../data'
import type { GoPuzzleCount } from '../game/constants'
import type { GameMode, PlayScope } from '../game/types'
import { DefinitionPanel } from '../definitions'
import { Button, Panel } from '../ui'
import { classNames } from '../ui/classNames'
import {
  MAX_ASYNC_MULTIPLAYER_GAMES,
  addAsyncMultiplayerGame,
  canCreateAsyncMultiplayerGame,
  canViewerCancelAsyncGame,
  canViewerJoinAsyncGame,
  cancelAsyncMultiplayerGame,
  createAsyncMultiplayerGame,
  forfeitAsyncMultiplayerGame,
  getViewerAsyncPlayerId,
  getActiveAsyncMultiplayerGames,
  getAsyncMultiplayerAnswerWords,
  hasDailyAsyncMultiplayerParticipation,
  joinAsyncMultiplayerGame,
  normalizeAsyncMultiplayerState,
  submitAsyncMultiplayerGuess,
  type AsyncMultiplayerGame,
  type AsyncMultiplayerState,
} from './asyncMultiplayer'
import { createCustomGameLobby } from './customGames'
import type { MultiplayerProfileSummary } from './dailyMultiplayer'
import { normalizeCompetitiveMultiplayerState, upsertCustomGameLobby, type MultiplayerCompetitiveState } from './competitiveMultiplayer'
import { createMatchmakingRequest, findBestMatchForRequest } from './matchmaking'
import { MultiplayerGameSurface } from './MultiplayerGameSurface'
import { getRatingBucket, getRatingProfile } from './rating'
import { RivalIdentityCard } from './RivalIdentityCard'
import { projectAsyncMultiplayerPerformance } from './scoring'

type MultiplayerMatchKind = 'unranked' | 'ranked' | 'custom'

interface AsyncMultiplayerPanelProps {
  readonly authStatus?: 'anonymous' | 'authenticated' | 'unconfigured'
  readonly competitiveState?: MultiplayerCompetitiveState
  readonly dailyDateKey?: string
  readonly defaultDifficulty: DifficultyTier
  readonly defaultGoPuzzleCount: GoPuzzleCount
  readonly onChange: (state: AsyncMultiplayerState) => void
  readonly onCompetitiveChange?: (state: MultiplayerCompetitiveState) => void
  readonly readOnly?: boolean
  readonly scope: PlayScope
  readonly state: AsyncMultiplayerState | undefined
  readonly viewerProfile?: MultiplayerProfileSummary
  readonly viewerUserId?: string
}

function getGameTitle(game: AsyncMultiplayerGame): string {
  const scope = game.scope === 'daily' ? `Daily ${game.dailyDateKey}` : `${game.wordLength} letters`
  const mode = game.mode.toUpperCase()
  return `${mode} async · ${scope}`
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

export function AsyncMultiplayerPanel({
  authStatus = 'unconfigured',
  competitiveState,
  dailyDateKey,
  defaultDifficulty,
  defaultGoPuzzleCount,
  onChange,
  onCompetitiveChange,
  readOnly = false,
  scope,
  state,
  viewerProfile,
  viewerUserId,
}: AsyncMultiplayerPanelProps) {
  const normalized = useMemo(() => normalizeAsyncMultiplayerState(state), [state])
  const competitive = useMemo(() => normalizeCompetitiveMultiplayerState(competitiveState), [competitiveState])
  const visibleGames = normalized.games.filter((game) => game.scope === scope && (scope === 'practice' || game.dailyDateKey === dailyDateKey))
  const [selectedGameId, setSelectedGameId] = useState<string | undefined>(() => visibleGames[0]?.id)
  const [mode, setMode] = useState<GameMode>('og')
  const [matchKind, setMatchKind] = useState<MultiplayerMatchKind>('unranked')
  const [wordLength, setWordLength] = useState(5)
  const [message, setMessage] = useState<string | undefined>(undefined)
  const activeCount = getActiveAsyncMultiplayerGames(normalized, viewerUserId).length
  const onlineReady = authStatus === 'authenticated' && Boolean(viewerUserId)
  const dailyClaimedForMode = scope === 'daily'
    ? hasDailyAsyncMultiplayerParticipation(normalized, dailyDateKey, mode, viewerUserId)
    : false
  const existingDailyClaim = scope === 'daily' && viewerUserId
    ? visibleGames.find((game) => game.mode === mode && getViewerAsyncPlayerId(game, viewerUserId))
    : undefined
  const effectiveSelectedGameId = selectedGameId && visibleGames.some((game) => game.id === selectedGameId)
    ? selectedGameId
    : existingDailyClaim?.id ?? visibleGames[0]?.id
  const selectedGame = visibleGames.find((game) => game.id === effectiveSelectedGameId)
  const viewerPlayerId = selectedGame ? getViewerAsyncPlayerId(selectedGame, viewerUserId) : undefined
  const rivalPlayerId = viewerPlayerId === 'player-one' ? 'player-two' : viewerPlayerId === 'player-two' ? 'player-one' : undefined
  const rivalPlayer = rivalPlayerId && selectedGame ? selectedGame.players.find((player) => player.id === rivalPlayerId) : undefined
  const waitingHostPlayer = !viewerPlayerId && selectedGame ? selectedGame.players.find((player) => player.id === 'player-one') : undefined
  const canJoinSelectedGame = selectedGame ? canViewerJoinAsyncGame(selectedGame, viewerUserId) : false
  const canCancelSelectedGame = selectedGame ? canViewerCancelAsyncGame(selectedGame, viewerUserId) && !readOnly : false
  const joiningWouldClaimDuplicateDaily = Boolean(
    selectedGame
      && selectedGame.scope === 'daily'
      && hasDailyAsyncMultiplayerParticipation(normalized, selectedGame.dailyDateKey, selectedGame.mode, viewerUserId),
  )
  const canSubmitSelectedGame = Boolean(
    selectedGame
      && onlineReady
      && viewerPlayerId
      && selectedGame.status === 'playing'
      && selectedGame.currentTurn === viewerPlayerId
      && !readOnly,
  )
  const canCreate = canCreateAsyncMultiplayerGame(normalized, viewerUserId) && !readOnly && onlineReady && !dailyClaimedForMode

  const createGame = () => {
    if (existingDailyClaim) {
      setSelectedGameId(existingDailyClaim.id)
      setMessage('You already have today\'s Daily Async game for this mode. Re-entering it here.')
      return
    }
    if (!canCreate) {
      return
    }
    const ratingBucket = getRatingBucket('async', mode)
    const ranked = matchKind === 'ranked' && authStatus === 'authenticated' && Boolean(viewerUserId)
    let customGameCode: string | undefined
    let matchmakingRequestId: string | undefined
    if (matchKind === 'custom') {
      const lobby = createCustomGameLobby({
        createdByUserId: viewerUserId,
        mode,
        scope,
        transport: 'async',
        wordLength: scope === 'practice' ? wordLength : undefined,
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
        transport: 'async',
        userId: viewerUserId,
        wordLength: scope === 'practice' ? wordLength : undefined,
      })
      const rival = createMatchmakingRequest({
        dailyDateKey,
        id: `${request.id}-preview-rival`,
        mode,
        rating: profile.rating + 20,
        scope,
        transport: 'async',
        userId: `preview-rival-${request.id}`,
        wordLength: scope === 'practice' ? wordLength : undefined,
      })
      matchmakingRequestId = findBestMatchForRequest(request, [rival])?.left.id ?? request.id
    }
    const game = createAsyncMultiplayerGame({
      customGameCode,
      dailyDateKey,
      difficulty: defaultDifficulty,
      goPuzzleCount: defaultGoPuzzleCount,
      matchmakingRequestId,
      mode,
      playerProfiles: viewerProfile ? { 'player-one': viewerProfile } : undefined,
      playerUserIds: viewerUserId ? { 'player-one': viewerUserId } : undefined,
      ranked,
      ratingBucket,
      scope,
      wordLength,
    })
    const next = addAsyncMultiplayerGame(normalized, game)
    if (!next.games.some((entry) => entry.id === game.id)) {
      setMessage(dailyClaimedForMode
        ? 'You already claimed today\'s Daily Async game for this mode.'
        : 'You already have five active async multiplayer games.')
      return
    }
    setSelectedGameId(game.id)
    setMessage(ranked
      ? 'Ranked async match opened. Rating changes wait for durable authenticated settlement.'
      : matchKind === 'custom'
        ? `Custom async lobby ${customGameCode} opened. It is unranked by default.`
        : 'Async match opened. Waiting for another signed-in player to join.')
    onChange(next)
  }

  const joinGame = () => {
    if (!selectedGame || !viewerUserId || readOnly) {
      return
    }
    const result = joinAsyncMultiplayerGame(normalized, {
      gameId: selectedGame.id,
      playerProfile: viewerProfile,
      userId: viewerUserId,
    })
    if (result.error) {
      setMessage(result.error)
      return
    }
    setMessage('Joined async match. Turns now persist between both signed-in players.')
    onChange(result.state)
  }

  const cancelGame = () => {
    if (!selectedGame || !viewerUserId || readOnly) {
      return
    }
    const result = cancelAsyncMultiplayerGame(normalized, {
      gameId: selectedGame.id,
      userId: viewerUserId,
    })
    if (result.error) {
      setMessage(result.error)
      return
    }
    setMessage('Async lobby cancelled. The active-game slot and Daily Multiplayer claim are released because no rival joined.')
    onChange(result.state)
  }

  const submitTurn = (guess: string) => {
    if (!selectedGame || readOnly || !viewerPlayerId) {
      return
    }
    const result = submitAsyncMultiplayerGuess(normalized, {
      gameId: selectedGame.id,
      guess,
      playerId: viewerPlayerId,
    })
    if (result.error) {
      setMessage(result.error)
      return
    }
    setMessage(result.game?.status === 'playing' ? 'Turn submitted. Waiting for the next player.' : 'Match finished.')
    onChange(result.state)
  }

  const forfeitGame = () => {
    if (!selectedGame || readOnly || !viewerPlayerId) {
      return
    }
    const result = forfeitAsyncMultiplayerGame(normalized, {
      gameId: selectedGame.id,
      playerId: viewerPlayerId,
    })
    if (result.error) {
      setMessage(result.error)
      return
    }
    setMessage('You forfeited this async match.')
    onChange(result.state)
  }

  return (
    <Panel className="space-y-4 text-sm leading-6 text-slate-300" tone="muted">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-white">{scope === 'daily' ? 'Daily Async Multiplayer' : 'Practice Async Multiplayer'}</h3>
          <p>
            Async turn-based matches sync between signed-in players. You can keep up to {MAX_ASYNC_MULTIPLAYER_GAMES} active games at once.
            {scope === 'daily' ? ' Daily Multiplayer uses midnight UTC and past games are view-only.' : ' Practice games have no time limit.'}
          </p>
          {!onlineReady && !readOnly ? (
            <p className="mt-1 text-xs text-amber-100">Sign in to create, join, or submit real online async turns.</p>
          ) : null}
        </div>
        <p className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-100">
          {activeCount}/{MAX_ASYNC_MULTIPLAYER_GAMES} active
        </p>
      </div>

      {!readOnly ? (
        <div className="grid gap-3 rounded-lg border border-white/10 bg-black/30 p-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="grid gap-3 sm:grid-cols-3">
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
            {scope === 'practice' ? (
              <label className="grid gap-1 font-semibold text-cyan-100">
                Length
                <input
                  className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
                  max={35}
                  min={2}
                  onChange={(event) => setWordLength(Number(event.target.value))}
                  type="number"
                  value={wordLength}
                />
              </label>
            ) : (
              <div>
                <p className="font-semibold text-cyan-100">UTC day</p>
                <p>{dailyDateKey}</p>
              </div>
            )}
            <div>
              <p className="font-semibold text-cyan-100">Difficulty</p>
              <p className="capitalize">{defaultDifficulty}</p>
            </div>
          </div>
          <Button disabled={!canCreate} onClick={createGame} variant="primary">
            {canCreate ? 'Open async match' : dailyClaimedForMode ? 'Daily async already claimed' : onlineReady ? 'Active limit reached' : 'Sign in required'}
          </Button>
        </div>
      ) : null}

      {matchKind === 'ranked' && authStatus !== 'authenticated' && !readOnly ? (
        <p className="rounded-lg border border-amber-300/30 bg-amber-300/10 p-3 text-sm font-semibold text-amber-50">
          Sign in to enter ranked async queues. Guest and local-preview games remain unranked.
        </p>
      ) : null}

      {visibleGames.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {visibleGames.map((game) => (
            <Button
              key={game.id}
              onClick={() => { setSelectedGameId(game.id); setMessage(undefined) }}
              variant={game.id === selectedGame?.id ? 'primary' : 'secondary'}
            >
              {game.mode.toUpperCase()} · {game.status}
            </Button>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-white/10 bg-black/30 p-3">
          {readOnly ? 'No Daily Multiplayer games were recorded for this day.' : 'No async multiplayer games yet.'}
        </p>
      )}

      {selectedGame ? (
        <div className="space-y-4 rounded-lg border border-white/10 bg-black/30 p-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <p className="font-semibold text-cyan-100">{getGameTitle(selectedGame)}</p>
              <p className="capitalize">Status: {selectedGame.status} · {selectedGame.ranked ? 'Ranked pending settlement' : selectedGame.customGameCode ? `Custom ${selectedGame.customGameCode}` : 'Unranked'}</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-100">Turn</p>
              <p>{selectedGame.players.find((player) => player.id === selectedGame.currentTurn)?.label ?? selectedGame.currentTurn}</p>
            </div>
            <div>
              <p className="font-semibold text-cyan-100">Deadline</p>
              <p>{selectedGame.deadlineAt ? `${selectedGame.deadlineAt} UTC` : 'No time limit'}</p>
            </div>
          </div>

          {!readOnly && selectedGame.status === 'waiting' ? (
            <div className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-4">
              <p className="font-semibold text-cyan-50">
                {canJoinSelectedGame ? 'Waiting async match available' : 'Waiting for another signed-in player'}
              </p>
              <p className="mt-1 text-sm text-cyan-100">
                {canJoinSelectedGame
                  ? 'Join this match to claim the rival seat. After that, each player can submit only on their own turn.'
                  : 'This match will start once a second signed-in player joins from another browser or device.'}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {canJoinSelectedGame ? <Button disabled={joiningWouldClaimDuplicateDaily} onClick={joinGame} variant="primary">{joiningWouldClaimDuplicateDaily ? 'Daily async already claimed' : 'Join async match'}</Button> : null}
                {canCancelSelectedGame ? <Button onClick={cancelGame} variant="secondary">Cancel Lobby</Button> : null}
              </div>
            </div>
          ) : null}

          {rivalPlayer ? (
            <RivalIdentityCard label={rivalPlayer.label} profile={selectedGame.playerProfiles?.[rivalPlayer.id]} />
          ) : canJoinSelectedGame && waitingHostPlayer ? (
            <RivalIdentityCard label={waitingHostPlayer.label} profile={selectedGame.playerProfiles?.['player-one']} title="Lobby host" />
          ) : selectedGame.status === 'waiting' ? (
            <RivalIdentityCard label="Waiting for a signed-in rival" title="Rival" />
          ) : null}

          {!readOnly && selectedGame.status === 'playing' ? (
            <MultiplayerGameSurface
              disabled={!canSubmitSelectedGame}
              model={{ game: selectedGame, kind: 'async' }}
              onSubmitGuess={submitTurn}
              statusLabel={canSubmitSelectedGame ? 'Your turn' : 'Waiting for the other player'}
            />
          ) : null}

          {selectedGame.status === 'cancelled' ? (
            <p className="rounded-lg border border-slate-500/30 bg-slate-900/70 p-3 text-sm text-slate-300">
              This async lobby was cancelled before a rival joined. It no longer counts against the active-game limit.
            </p>
          ) : null}

          {!readOnly && viewerPlayerId && selectedGame.status === 'playing' ? (
            <div className="rounded-lg border border-rose-300/30 bg-rose-400/10 p-3 text-sm leading-6 text-rose-50">
              <p className="font-bold">Forfeit match</p>
              <p>Forfeiting ends this multiplayer game and counts as a loss for rating purposes when both players are present.</p>
              <Button className="mt-2" onClick={forfeitGame} variant="secondary">Forfeit</Button>
            </div>
          ) : null}

          {message ? <p className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-3 font-semibold text-cyan-50">{message}</p> : null}

          {projectAsyncMultiplayerPerformance(selectedGame) ? (
            <div className="space-y-2 rounded-lg border border-violet-300/30 bg-violet-300/10 p-3">
              <p className="font-semibold text-violet-50">{projectAsyncMultiplayerPerformance(selectedGame)?.summary}</p>
              <div className="grid gap-2 md:grid-cols-2">
                {projectAsyncMultiplayerPerformance(selectedGame)?.players.map((player) => (
                  <p className="rounded-md border border-white/10 bg-black/30 p-2" key={player.playerId}>
                    {selectedGame.players.find((entry) => entry.id === player.playerId)?.label ?? player.playerId}: {player.summary}
                  </p>
                ))}
              </div>
              {selectedGame.ranked ? (
                <p className="text-xs text-violet-100">ELO updates only after authenticated durable result evidence; local preview rivals stay unrated.</p>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-2">
            <p className="font-semibold text-cyan-100">Turn history</p>
            {selectedGame.moves.length > 0 ? (
              <div className="space-y-2">
                {selectedGame.moves.map((move) => (
                  <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3" key={move.id}>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {selectedGame.players.find((player) => player.id === move.playerId)?.label ?? move.playerId} · Puzzle {move.puzzleIndex + 1} · {move.createdAt}
                    </p>
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
                ))}
              </div>
            ) : (
              <p>No turns submitted yet.</p>
            )}
          </div>

          {(selectedGame.status !== 'cancelled' && (readOnly || selectedGame.status === 'won' || selectedGame.status === 'lost' || selectedGame.status === 'expired')) ? (
            <div className="space-y-3 rounded-lg border border-white/10 bg-slate-950/70 p-3">
              <p className="font-semibold text-cyan-100">Answer and definitions</p>
              {getAsyncMultiplayerAnswerWords(selectedGame).map((answer, index) => (
                <DefinitionPanel
                  enabled
                  key={`${selectedGame.id}-${answer}-${index}`}
                  mode={selectedGame.mode}
                  scope={selectedGame.scope}
                  word={answer}
                  wordLength={answer.length}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </Panel>
  )
}
