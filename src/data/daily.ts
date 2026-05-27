import { DAILY_WORD_LENGTH } from '../game/constants.js'
import type { WordEntry } from './types.js'
import { getWordRepository, isWordRepositoryFailure } from './wordRepository.js'

export interface DailyPuzzle {
  readonly answer: string
  readonly dateKey: string
  readonly index: number
  readonly length: number
}

const MS_PER_DAY = 86_400_000

export function getDailyDateKey(date = new Date()): string {
  return date.toISOString().slice(0, 10)
}

export function getDailyAnswerIndex(dateKey: string, answerCount: number): number {
  if (answerCount < 1) {
    throw new Error('At least one answer candidate is required for a daily puzzle.')
  }

  const day = Date.parse(`${dateKey}T00:00:00.000Z`) / MS_PER_DAY
  return Math.trunc(day) % answerCount
}

export function selectDailyAnswer(answers: readonly WordEntry[], date = new Date()): DailyPuzzle {
  const dateKey = getDailyDateKey(date)
  const index = getDailyAnswerIndex(dateKey, answers.length)
  const answer = answers[index].word

  return {
    answer,
    dateKey,
    index,
    length: answer.length,
  }
}

export function getDailyOgPuzzle(date = new Date()): DailyPuzzle {
  const repository = getWordRepository({ mode: 'og', scope: 'daily', length: DAILY_WORD_LENGTH })
  if (isWordRepositoryFailure(repository)) {
    throw new Error(repository.message)
  }

  return selectDailyAnswer(repository.answers, date)
}
