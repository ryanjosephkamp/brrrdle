import { expect, test } from '@playwright/test'
import { expectNoConsoleFailures, expectVisibleStatus } from '../fixtures/assertions'
import { getCurrentAnswer, getValidWrongGuess, projectionFromRow } from '../fixtures/answers'
import { navigateToPractice, openMultiplayerMatch, joinMultiplayerMatch, selectMultiplayerGame, setPracticeMultiplayerTimeLimit, submitGuessWithKeyboard, waitForTurn } from '../fixtures/gameActions'
import { updateMultiplayerProjection, waitForMultiplayerRowForUsers } from '../fixtures/supabaseAdmin'
import { createTwoClientSession } from '../fixtures/twoClientGame'

test.describe('Practice Multiplayer OG @practice @multiplayer', () => {
  test('creates, joins, submits, and completes an OG match through two real clients', async ({ browser }) => {
    const session = await createTwoClientSession(browser)
    try {
      await navigateToPractice(session.host.page)
      await openMultiplayerMatch(session.host.page)

      const waitingRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'waiting',
        userIds: [session.host.user.id],
      })

      await navigateToPractice(session.rival.page)
      await selectMultiplayerGame(session.rival.page, waitingRow.id)
      await joinMultiplayerMatch(session.rival.page)

      const playingRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'playing',
        userIds: [session.host.user.id, session.rival.user.id],
      })
      const game = projectionFromRow(playingRow)
      const answer = getCurrentAnswer(game)

      await selectMultiplayerGame(session.host.page, playingRow.id)
      await waitForTurn(session.host.page)
      await submitGuessWithKeyboard(session.host.page, answer)

      const wonRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'won',
        userIds: [session.host.user.id, session.rival.user.id],
      })
      expect(wonRow.winner_player_id).toBe('player-one')
      await expectVisibleStatus(session.host.page, /Match finished\. You won this multiplayer match\./)
      await expectVisibleStatus(session.rival.page, /Match finished\. You lost this multiplayer match\./)

      await expectNoConsoleFailures(session.host.consoleFailures)
      await expectNoConsoleFailures(session.rival.consoleFailures)
    } finally {
      await session.cleanup()
    }
  })

  test('keeps post-guess forfeits as losses for the forfeiting player', async ({ browser }) => {
    const session = await createTwoClientSession(browser)
    try {
      await navigateToPractice(session.host.page)
      await openMultiplayerMatch(session.host.page)
      const waitingRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'waiting',
        userIds: [session.host.user.id],
      })

      await navigateToPractice(session.rival.page)
      await selectMultiplayerGame(session.rival.page, waitingRow.id)
      await joinMultiplayerMatch(session.rival.page)
      const playingRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'playing',
        userIds: [session.host.user.id, session.rival.user.id],
      })
      const game = projectionFromRow(playingRow)
      const wrongGuess = getValidWrongGuess(game)

      await selectMultiplayerGame(session.host.page, playingRow.id)
      await waitForTurn(session.host.page)
      await submitGuessWithKeyboard(session.host.page, wrongGuess)
      await waitForTurn(session.rival.page)
      await session.rival.page.getByRole('button', { name: /^Forfeit$/i }).click()

      const forfeitedRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'lost',
        userIds: [session.host.user.id, session.rival.user.id],
      })
      const forfeitedGame = projectionFromRow(forfeitedRow)
      expect(forfeitedGame.forfeitedPlayerId).toBe('player-two')
      expect(forfeitedGame.winnerId).toBe('player-one')
      await expectVisibleStatus(session.rival.page, /You forfeited this multiplayer match\./)
      await expectVisibleStatus(session.host.page, /Rival forfeited\. You won this multiplayer match\./)

      await expectNoConsoleFailures(session.host.consoleFailures)
      await expectNoConsoleFailures(session.rival.consoleFailures)
    } finally {
      await session.cleanup()
    }
  })

  test('preserves timeout loser precedence for timed Practice matches', async ({ browser }) => {
    const session = await createTwoClientSession(browser)
    try {
      await navigateToPractice(session.host.page)
      await setPracticeMultiplayerTimeLimit(session.host.page, '30000')
      await openMultiplayerMatch(session.host.page)
      const waitingRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'waiting',
        userIds: [session.host.user.id],
      })

      await navigateToPractice(session.rival.page)
      await selectMultiplayerGame(session.rival.page, waitingRow.id)
      await joinMultiplayerMatch(session.rival.page)
      const playingRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'playing',
        userIds: [session.host.user.id, session.rival.user.id],
      })
      const game = projectionFromRow(playingRow)
      expect(game.timeLimitMs).toBe(30_000)
      await selectMultiplayerGame(session.host.page, playingRow.id)
      await waitForTurn(session.host.page)
      const backdatedGame = {
        ...game,
        timeRemainingMs: { 'player-one': 1, 'player-two': 30_000 },
        turnStartedAt: new Date(Date.now() - 35_000).toISOString(),
        updatedAt: new Date().toISOString(),
      }
      await updateMultiplayerProjection(backdatedGame)
      await session.host.page.reload({ waitUntil: 'domcontentloaded' })

      const timedOutRow = await waitForMultiplayerRowForUsers({
        mode: 'og',
        scope: 'practice',
        status: 'lost',
        timeoutMs: 30_000,
        userIds: [session.host.user.id, session.rival.user.id],
      })
      const timedOutGame = projectionFromRow(timedOutRow)
      expect(timedOutGame.timedOutPlayerId).toBe('player-one')
      expect(timedOutGame.winnerId).toBe('player-two')
      await expectVisibleStatus(session.host.page, /You ran out of time and lost this multiplayer match\./)
      await expectVisibleStatus(session.rival.page, /Rival ran out of time\. You won this multiplayer match\./)

      await expectNoConsoleFailures(session.host.consoleFailures)
      await expectNoConsoleFailures(session.rival.consoleFailures)
    } finally {
      await session.cleanup()
    }
  })
})
