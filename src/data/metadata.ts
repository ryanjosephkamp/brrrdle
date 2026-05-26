import type { RemoteWordListMetadata, WordListMetadata } from './types'
import bundledSource from './bundled/source.json'
import { BUNDLED_WORD_LISTS } from './wordLists'
import { validateWordListFile } from './wordListSchema'

export interface BundledSourceInfo {
  readonly datasetUrl: string
  readonly datasetId: string
  readonly folder: string
  readonly revision: string
  readonly generatedAt: string
  readonly lengths: readonly number[]
  readonly note?: string
}

export const BUNDLED_SOURCE: BundledSourceInfo = bundledSource

export const BUNDLED_DATA_VERSION = BUNDLED_SOURCE.revision

export const BUNDLED_METADATA = Object.values(BUNDLED_WORD_LISTS).flatMap((wordList) => {
  const validation = validateWordListFile(wordList)
  return validation.ok ? [validation.value.metadata] : []
}) satisfies readonly WordListMetadata[]

export const BUNDLED_REMOTE_METADATA: RemoteWordListMetadata = {
  version: BUNDLED_DATA_VERSION,
  generatedAt: BUNDLED_SOURCE.generatedAt,
  lengths: BUNDLED_METADATA.map((metadata) => metadata.length),
}
