import { describe, expect, it } from 'vitest'
import { loadBundledWordList, resolveWordListLength } from './loadWordList'

describe('loadBundledWordList', () => {
  it('loads bundled boundary lengths 2, 5, and 35', () => {
    expect(loadBundledWordList('practice', 2).ok).toBe(true)
    expect(loadBundledWordList('practice', 5).ok).toBe(true)
    expect(loadBundledWordList('practice', 35).ok).toBe(true)
  })

  it('loads every supported practice length between 2 and 35', () => {
    for (let length = 2; length <= 35; length += 1) {
      expect(loadBundledWordList('practice', length).ok).toBe(true)
    }
  })

  it('rejects practice lengths outside 2 through 35', () => {
    expect(resolveWordListLength('practice', 1)).toMatchObject({ ok: false, reason: 'unsupported-length' })
    expect(resolveWordListLength('practice', 36)).toMatchObject({ ok: false, reason: 'unsupported-length' })
  })

  it('locks direct daily loading to five letters', () => {
    expect(resolveWordListLength('daily', 5)).toEqual({ ok: true, length: 5 })
    expect(resolveWordListLength('daily', 6)).toMatchObject({ ok: false, reason: 'daily-length-locked' })
  })

  it('returns normalized valid guesses and definitions', () => {
    const result = loadBundledWordList('practice', 5)
    expect(result.ok).toBe(true)
    if (!result.ok) {
      throw new Error('Expected bundled word list to load.')
    }

    expect(result.wordList.validGuesses.has('crane')).toBe(true)
    expect(result.wordList.definitionsByWord.get('crane')?.[0].definition).toContain('bird')
  })
})
