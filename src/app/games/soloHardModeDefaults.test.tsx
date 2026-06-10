import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { DEFAULT_DIFFICULTY_TIER } from '../../data'
import { DEFAULT_GO_PUZZLE_COUNT } from '../../game/constants'
import {
  createDailyGoSetup,
  createGoSession,
  createPracticeGoSetup,
  enterGoLetter,
  serializeGoSession,
  submitGoGuess,
} from '../../game'
import { GoGame } from './GoGame'
import { getSoloGoSolvedTransition } from './goTransitions'
import { OgGame } from './OgGame'

function spendNothing() {
  return false
}

function submitGoAnswer() {
  const setup = createPracticeGoSetup(5, 0)
  const filled = [...setup.puzzles[0].answer].reduce((session, letter) => enterGoLetter(session, letter), createGoSession(setup))
  return serializeGoSession(submitGoGuess(filled))
}

function submitFirstGoAnswer(setup: ReturnType<typeof createPracticeGoSetup> | ReturnType<typeof createDailyGoSetup>) {
  const initial = createGoSession(setup)
  const filled = [...setup.puzzles[0].answer].reduce((session, letter) => enterGoLetter(session, letter), initial)
  return { initial, next: submitGoGuess(filled) }
}

describe('solo game defaults', () => {
  it('starts fresh og games in Hard Mode when requested by settings', () => {
    const html = renderToStaticMarkup(
      <OgGame
        coins={0}
        defaultHardMode
        keyboardDisabled
        onSpendCoins={spendNothing}
        scope="practice"
      />,
    )

    expect(html).toMatch(/<input[^>]*type="checkbox"[^>]*checked=""/)
    expect(html).toContain('Hard mode')
  })

  it('starts fresh go games in Hard Mode when requested by settings', () => {
    const html = renderToStaticMarkup(
      <GoGame
        coins={0}
        defaultHardMode
        keyboardDisabled
        onSpendCoins={spendNothing}
        scope="practice"
      />,
    )

    expect(html).toMatch(/<input[^>]*type="checkbox"[^>]*checked=""/)
    expect(html).toContain('Hard mode')
  })

  it('keeps the Hard Mode toggle enabled on fresh practice go chains', () => {
    const html = renderToStaticMarkup(
      <GoGame
        coins={0}
        keyboardDisabled
        onSaveDifficultyDefault={() => undefined}
        onSaveGoPuzzleCountDefault={() => undefined}
        onSpendCoins={spendNothing}
        scope="practice"
      />,
    )

    const hardModeInput = html.match(/<input[^>]*type="checkbox"[^>]*>/)?.[0]
    expect(hardModeInput).toBeDefined()
    expect(hardModeInput).not.toContain('disabled')
  })

  it('locks the Hard Mode toggle on practice go chains after the first submitted guess', () => {
    const html = renderToStaticMarkup(
      <GoGame
        coins={0}
        initialResume={{
          difficulty: DEFAULT_DIFFICULTY_TIER,
          goPuzzleCount: DEFAULT_GO_PUZZLE_COUNT,
          mode: 'go',
          scope: 'practice',
          serializedSession: submitGoAnswer(),
          updatedAt: '2026-06-08T22:00:00.000Z',
          wordLength: 5,
        }}
        keyboardDisabled
        onSaveDifficultyDefault={() => undefined}
        onSaveGoPuzzleCountDefault={() => undefined}
        onSpendCoins={spendNothing}
        scope="practice"
      />,
    )

    const hardModeInput = html.match(/<input[^>]*type="checkbox"[^>]*>/)?.[0]
    expect(hardModeInput).toBeDefined()
    expect(hardModeInput).toContain('disabled')
  })

  it('keeps Customize unlocked on fresh practice og puzzles', () => {
    const html = renderToStaticMarkup(
      <OgGame
        coins={0}
        keyboardDisabled
        onSaveDifficultyDefault={() => undefined}
        onSpendCoins={spendNothing}
        scope="practice"
      />,
    )

    expect(html).not.toContain('Difficulty is locked because this puzzle has started.')
  })

  it('keeps Customize unlocked on fresh practice go chains until the first submitted guess', () => {
    const html = renderToStaticMarkup(
      <GoGame
        coins={0}
        keyboardDisabled
        onSaveDifficultyDefault={() => undefined}
        onSaveGoPuzzleCountDefault={() => undefined}
        onSpendCoins={spendNothing}
        scope="practice"
      />,
    )

    expect(html).not.toContain('Difficulty and chain length are locked because this puzzle has started.')
  })

  it('locks Customize on practice go chains after the first submitted guess', () => {
    const html = renderToStaticMarkup(
      <GoGame
        coins={0}
        initialResume={{
          difficulty: DEFAULT_DIFFICULTY_TIER,
          goPuzzleCount: DEFAULT_GO_PUZZLE_COUNT,
          mode: 'go',
          scope: 'practice',
          serializedSession: submitGoAnswer(),
          updatedAt: '2026-06-08T22:00:00.000Z',
          wordLength: 5,
        }}
        keyboardDisabled
        onSaveDifficultyDefault={() => undefined}
        onSaveGoPuzzleCountDefault={() => undefined}
        onSpendCoins={spendNothing}
        scope="practice"
      />,
    )

    expect(html).toContain('Difficulty and chain length are locked because this puzzle has started.')
  })

  it.each(['practice', 'daily'] as const)('detects solved-row transitions for intermediate solo %s go puzzles', (scope) => {
    const setup = scope === 'daily'
      ? createDailyGoSetup(new Date('2026-06-09T00:00:00.000Z'))
      : createPracticeGoSetup(5, 0)
    const { initial, next } = submitFirstGoAnswer(setup)

    expect(next.currentPuzzleIndex).toBe(1)
    expect(getSoloGoSolvedTransition(initial, next)).toEqual({ puzzleIndex: 0 })
  })
})
