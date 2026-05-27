import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Panel } from '../ui'
import { buildWordRequestIssueUrl } from '../lib/githubIssue'
import {
  DEFAULT_WORD_EXPLORER_LENGTH,
  WORD_EXPLORER_LENGTHS,
  emptyStateMessage,
  filterAndSortEntries,
  loadWordExplorerEntries,
  loadWordExplorerEntriesFromLive,
  typeBadgeLabel,
  type SortDirection,
  type SortField,
  type WordExplorerLoadResult,
} from './wordExplorerData'

function currentIsoDate(): string {
  return new Date().toISOString().slice(0, 10)
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to false
  }
  return false
}

export function WordExplorerPanel() {
  const [length, setLength] = useState<number>(DEFAULT_WORD_EXPLORER_LENGTH)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showAnswers, setShowAnswers] = useState<boolean>(true)
  const [showValidGuesses, setShowValidGuesses] = useState<boolean>(true)
  const [sortField, setSortField] = useState<SortField>('word')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [copiedWord, setCopiedWord] = useState<string | undefined>(undefined)
  const bundledEntries = useMemo(() => loadWordExplorerEntries(length), [length])
  const [liveLoad, setLiveLoad] = useState<WordExplorerLoadResult | undefined>(undefined)

  useEffect(() => {
    let isMounted = true
    void loadWordExplorerEntriesFromLive(length).then((result) => {
      if (isMounted) {
        setLiveLoad(result)
      }
    })
    return () => {
      isMounted = false
    }
  }, [length])

  const effectiveLoad = liveLoad ?? { entries: bundledEntries, source: 'bundled' as const, message: 'Checking live word list…' }
  const entries = effectiveLoad.entries
  const filtered = useMemo(
    () => filterAndSortEntries(entries, { searchTerm, showAnswers, showValidGuesses }, { field: sortField, direction: sortDirection }),
    [entries, searchTerm, showAnswers, showValidGuesses, sortField, sortDirection],
  )

  const toggleSort = useCallback((field: SortField) => {
    if (field === sortField) {
      setSortDirection((dir) => (dir === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }, [sortField])

  const handleCopy = useCallback(async (word: string) => {
    const ok = await copyToClipboard(word)
    if (ok) {
      setCopiedWord(word)
      setTimeout(() => setCopiedWord((current) => (current === word ? undefined : current)), 1200)
    }
  }, [])

  const requestUrl = useMemo(
    () => buildWordRequestIssueUrl({ word: searchTerm.trim(), length, date: currentIsoDate() }),
    [searchTerm, length],
  )

  const showEmptyState = filtered.length === 0 && searchTerm.trim().length > 0 && (showAnswers || showValidGuesses)

  return (
    <section className="space-y-4" aria-labelledby="word-explorer-title">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-200)]">word data</p>
      <h2 id="word-explorer-title" className="text-3xl font-bold text-white">Word Explorer</h2>
      <p className="max-w-3xl text-base leading-7 text-slate-300">
        Browse and search the exact words this build of brrrdle is using. Choose a length, search the live list,
        and request additions for missing words.
      </p>

      <Panel className="space-y-3 text-sm leading-6 text-slate-300" tone="muted">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="grid gap-1 font-semibold text-cyan-100">
            Length
            <select
              aria-label="Word length"
              className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              onChange={(event) => setLength(Number(event.target.value))}
              value={length}
            >
              {WORD_EXPLORER_LENGTHS.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 font-semibold text-cyan-100 sm:col-span-2 lg:col-span-2">
            Search
            <input
              aria-label="Search words"
              className="rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={`Filter ${length}-letter words…`}
              type="search"
              value={searchTerm}
            />
          </label>
          <div className="grid gap-1 font-semibold text-cyan-100">
            <span>Show</span>
            <label className="flex items-center gap-2 text-slate-100">
              <input
                checked={showAnswers}
                onChange={(event) => setShowAnswers(event.target.checked)}
                type="checkbox"
              /> Answers
            </label>
            <label className="flex items-center gap-2 text-slate-100">
              <input
                checked={showValidGuesses}
                onChange={(event) => setShowValidGuesses(event.target.checked)}
                type="checkbox"
              /> Valid Guesses
            </label>
          </div>
        </div>
        <p aria-live="polite" className="text-xs text-slate-400">
          Showing {filtered.length} of {entries.length} {length}-letter word{entries.length === 1 ? '' : 's'} from {effectiveLoad.source === 'live' ? 'the live manifest' : 'bundled fallback data'}.
          {effectiveLoad.message ? ` ${effectiveLoad.message}` : ''}
        </p>
      </Panel>

      {showEmptyState ? (
        <Panel className="space-y-3 text-sm leading-6 text-slate-200" tone="muted">
          <p>{emptyStateMessage(searchTerm.trim(), length)}</p>
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-ice-200)] bg-[var(--color-ice-200)] px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
            href={requestUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Request this word
          </a>
        </Panel>
      ) : null}

      {filtered.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/60">
          <table className="hidden w-full table-fixed text-left text-sm md:table">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-cyan-100">
              <tr>
                <th className="w-2/5 px-4 py-3">
                  <button
                    aria-label={`Sort by word (currently ${sortField === 'word' ? sortDirection : 'unsorted'})`}
                    className="inline-flex items-center gap-1 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
                    onClick={() => toggleSort('word')}
                    type="button"
                  >
                    Word{sortField === 'word' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                  </button>
                </th>
                <th className="w-2/5 px-4 py-3">
                  <button
                    aria-label={`Sort by type (currently ${sortField === 'type' ? sortDirection : 'unsorted'})`}
                    className="inline-flex items-center gap-1 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
                    onClick={() => toggleSort('type')}
                    type="button"
                  >
                    Type{sortField === 'type' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                  </button>
                </th>
                <th className="w-1/5 px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={entry.word} className="border-t border-slate-800 text-slate-100">
                  <td className="px-4 py-2 font-mono">{entry.word}</td>
                  <td className="px-4 py-2 text-slate-300">{typeBadgeLabel(entry.types)}</td>
                  <td className="px-4 py-2 text-right">
                    <Button
                      aria-label={`Copy ${entry.word} to clipboard`}
                      onClick={() => void handleCopy(entry.word)}
                      size="sm"
                      variant="secondary"
                    >
                      {copiedWord === entry.word ? 'Copied' : 'Copy'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="grid gap-2 p-3 md:hidden">
            {filtered.map((entry) => (
              <li key={entry.word} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-100">
                <p className="font-mono text-base">{entry.word}</p>
                <p className="mt-1 text-xs text-slate-300">{typeBadgeLabel(entry.types)}</p>
                <div className="mt-2">
                  <Button
                    aria-label={`Copy ${entry.word} to clipboard`}
                    onClick={() => void handleCopy(entry.word)}
                    size="sm"
                    variant="secondary"
                  >
                    {copiedWord === entry.word ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
