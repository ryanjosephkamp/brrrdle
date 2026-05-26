export const DAILY_WORD_LENGTH = 5
export const MIN_PRACTICE_WORD_LENGTH = 2
export const MAX_PRACTICE_WORD_LENGTH = 35
export const DEFAULT_MAX_ATTEMPTS = 6
export const GO_PUZZLE_COUNT = 5

export const SUPPORTED_PRACTICE_WORD_LENGTHS = Array.from(
  { length: MAX_PRACTICE_WORD_LENGTH - MIN_PRACTICE_WORD_LENGTH + 1 },
  (_, index) => index + MIN_PRACTICE_WORD_LENGTH,
) as readonly number[]

export function isSupportedPracticeWordLength(length: number): boolean {
  return Number.isInteger(length) &&
    length >= MIN_PRACTICE_WORD_LENGTH &&
    length <= MAX_PRACTICE_WORD_LENGTH
}

export function isSupportedDailyWordLength(length: number): boolean {
  return length === DAILY_WORD_LENGTH
}
