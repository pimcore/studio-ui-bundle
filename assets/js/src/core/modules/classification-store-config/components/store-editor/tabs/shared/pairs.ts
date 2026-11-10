/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/** The stored map, as the API reports it: any JSON value per member. */
export type PairMap = Record<string, unknown>

/** One row of the pair list; a row whose stored value is not a string is read-only. */
export interface PairRow {
  key: string
  value: string | undefined
  readOnly: boolean
  /** Key as stored, kept only on read-only rows, which cannot be renamed. */
  storedKey?: string
}

/** What tells the generic view from the titles view over the same stored map. */
export interface PairView {
  includes: (storedKey: string) => boolean
  toDisplayKey: (storedKey: string) => string
  toStoredKey: (typedKey: string) => string
  keyLabel: string
  valueLabel: string
  duplicateMessage: string
}

export type PairError = 'key-required' | 'value-required' | 'duplicate' | 'list'

export interface PairRowErrors {
  key?: PairError
  value?: PairError
}

export const toRows = (value: object | null | undefined, view: PairView): PairRow[] =>
  Object.entries(value ?? {})
    .filter(([storedKey]) => view.includes(storedKey))
    .map(([storedKey, stored]): PairRow => typeof stored === 'string'
      ? { key: view.toDisplayKey(storedKey), value: stored, readOnly: false }
      : { key: view.toDisplayKey(storedKey), value: undefined, readOnly: true, storedKey })

const storedKeyOf = (row: PairRow, view: PairView): string =>
  row.readOnly ? row.storedKey! : view.toStoredKey(row.key.trim())

/** A map whose keys are exactly 0 … n-1 is what the API reads back as a JSON list. */
const isListShaped = (keys: Set<string>): boolean => {
  if (keys.size === 0) return false

  for (let index = 0; index < keys.size; index++) {
    if (!keys.has(String(index))) return false
  }

  return true
}

/** The keys of the whole map the save would send: these rows plus every member the view hides. */
const wholeKeysOf = (rows: PairRow[], original: PairMap | null, view: PairView): Set<string> => {
  const keys = new Set<string>(Object.keys(original ?? {}).filter((key) => !view.includes(key)))
  rows.forEach((row) => {
    if (row.readOnly || row.key.trim() !== '') keys.add(storedKeyOf(row, view))
  })

  return keys
}

/** Whether the map the save would send reads back as a list, whichever rows contribute its keys. */
export const wouldBeList = (rows: PairRow[], original: PairMap | null, view: PairView): boolean =>
  isListShaped(wholeKeysOf(rows, original, view))

export const rowErrors = (
  rows: PairRow[],
  original: PairMap | null,
  view: PairView
): PairRowErrors[] => {
  const typed = (row: PairRow): boolean => row.readOnly || row.key.trim() !== ''
  const stored = rows.map((row) => typed(row) ? storedKeyOf(row, view) : undefined)

  const counts = new Map<string, number>()
  stored.forEach((key) => { if (key !== undefined) counts.set(key, (counts.get(key) ?? 0) + 1) })

  const wholeIsList = wouldBeList(rows, original, view)

  return rows.map((row, index): PairRowErrors => {
    if (row.readOnly) return {}

    const key = stored[index]
    if (key === undefined) return { key: 'key-required' }
    if ((counts.get(key) ?? 0) > 1) return { key: 'duplicate' }
    if (wholeIsList) return { key: 'list' }
    if (row.value === undefined || row.value === '') return { value: 'value-required' }

    return {}
  })
}

/** The next map in row order; read-only rows carry their original value by reference. */
export const buildMap = (rows: PairRow[], original: PairMap | null, view: PairView): PairMap | null => {
  const entries: Array<[string, unknown]> = Object.entries(original ?? {})
    .filter(([storedKey]) => !view.includes(storedKey))

  rows.forEach((row) => {
    const key = storedKeyOf(row, view)
    entries.push([key, row.readOnly ? (original!)[key] : row.value])
  })

  return entries.length === 0 ? null : Object.fromEntries(entries)
}

export const jsonTypeOf = (value: unknown): 'object' | 'array' | 'number' | 'boolean' | 'null' => {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'boolean') return 'boolean'

  return 'object'
}
