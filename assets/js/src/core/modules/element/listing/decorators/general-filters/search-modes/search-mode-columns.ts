/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type FieldFilter } from '../context-layer/provider/field-filters/field-filters-provider'
import { isString, isUndefined } from 'lodash'
import { FULLTEXT_SEARCH_MODE_ID, type SearchModeAbstract, type SearchModeContext } from './search-mode-abstract'

/** Columns of the applied mode; none for full text, hidden or unavailable modes (those query as full text). */
export const resolveSearchModeAdditionalColumns = (
  modes: SearchModeAbstract[],
  searchModeId: string,
  context: SearchModeContext
): GridColumnConfiguration[] => {
  if (searchModeId === FULLTEXT_SEARCH_MODE_ID) {
    return []
  }

  const mode = modes.find((candidate) => candidate.id === searchModeId && candidate.isVisible())

  if (mode?.getAvailability(context).available !== true) {
    return []
  }

  return mode.getAdditionalColumns(context)
}

export const toAdditionalSelectedColumn = (column: GridColumnConfiguration): SelectedColumn => ({
  key: column.key,
  locale: column.locale,
  type: column.type,
  config: column.config,
  sortable: column.sortable,
  editable: column.editable,
  localizable: column.localizable,
  exportable: column.exportable,
  frontendType: column.frontendType,
  group: column.group as SelectedColumn['group'],
  originalApiDefinition: column
})

const ADVANCED_COLUMN_TYPE = 'dataobject.advanced'

const isSameColumn = (a: SelectedColumn, b: SelectedColumn): boolean =>
  a.key === b.key && (a.locale ?? null) === (b.locale ?? null)

/** Session placement of a search mode column, keyed by its identity (getColumnIdentity). */
export interface SearchModeColumnPlacement {
  /** Identity of the preceding user column; null = first; undefined = appended at the end. */
  anchor?: string | null
  /** Position among mode columns sharing the same anchor. */
  order?: number
  width?: number | null
}

export type SearchModeColumnPlacements = Record<string, SearchModeColumnPlacement>

/** Stable column identity: key + locale, the per-instance __meta.uniqueId for advanced columns. */
export const getColumnIdentity = (column: SelectedColumn): string => {
  const uniqueId = column.originalApiDefinition?.__meta?.uniqueId

  if (column.type === ADVANCED_COLUMN_TYPE && isString(uniqueId)) {
    return JSON.stringify({ uniqueId })
  }

  return JSON.stringify({ key: column.key, locale: column.locale ?? null })
}

/**
 * Inserts additional columns not yet present (key + locale) after their anchored user column; a missing
 * or unknown anchor appends. Returns the input array when nothing is added.
 */
export const placeAdditionalColumns = (
  selectedColumns: SelectedColumn[],
  additionalColumns: SelectedColumn[],
  placements: SearchModeColumnPlacements = {}
): SelectedColumn[] => {
  const missing: SelectedColumn[] = []

  for (const column of additionalColumns) {
    if (![...selectedColumns, ...missing].some((existing) => isSameColumn(existing, column))) {
      missing.push(column)
    }
  }

  if (missing.length === 0) {
    return selectedColumns
  }

  const selectedIdentities = new Set(selectedColumns.map(getColumnIdentity))
  const slots = new Map<string | null | undefined, Array<{ column: SelectedColumn, order: number, index: number }>>()

  missing.forEach((column, index) => {
    const placement = placements[getColumnIdentity(column)]
    const width = placement?.width
    const anchor = isString(placement?.anchor) && !selectedIdentities.has(placement.anchor) ? undefined : placement?.anchor
    const slot = slots.get(anchor) ?? []

    slot.push({
      column: isUndefined(width) ? column : { ...column, width },
      order: placement?.order ?? Number.MAX_SAFE_INTEGER,
      index
    })
    slots.set(anchor, slot)
  })

  const take = (anchor: string | null | undefined): SelectedColumn[] => {
    const slot = slots.get(anchor) ?? []
    slots.delete(anchor)
    return slot.sort((a, b) => a.order - b.order || a.index - b.index).map((entry) => entry.column)
  }

  const placed = take(null)

  for (const column of selectedColumns) {
    placed.push(column, ...take(getColumnIdentity(column)))
  }

  return [...placed, ...take(undefined)]
}

/**
 * Splits an ordered column list (e.g. the column configuration draft) into the user's columns and the
 * placements of the mode columns among them.
 */
export const splitSearchModeColumns = (
  columns: SelectedColumn[],
  isSearchModeColumn: (column: SelectedColumn) => boolean
): { selectedColumns: SelectedColumn[], placements: SearchModeColumnPlacements } => {
  const selectedColumns: SelectedColumn[] = []
  const placements: SearchModeColumnPlacements = {}
  let anchor: string | null = null
  let order = 0

  for (const column of columns) {
    if (isSearchModeColumn(column)) {
      placements[getColumnIdentity(column)] = { anchor, order: order++ }
      continue
    }

    selectedColumns.push(column)
    anchor = getColumnIdentity(column)
    order = 0
  }

  return { selectedColumns, placements }
}

/** Columns of `previous` that are no longer in `current` (key + locale). */
export const findRemovedColumns = (previous: SelectedColumn[], current: SelectedColumn[]): SelectedColumn[] =>
  previous.filter((column) => !current.some((candidate) => isSameColumn(candidate, column)))

/** Appends mode columns whose key is not available yet (listing columns win); returns the input array when nothing is added. */
export const mergeAvailableColumns = (availableColumns: AvailableColumn[], modeColumns: GridColumnConfiguration[]): AvailableColumn[] => {
  const missing = modeColumns.filter((column, index) =>
    !availableColumns.some((existing) => existing.key === column.key) &&
    modeColumns.findIndex((candidate) => candidate.key === column.key) === index
  )

  return missing.length === 0 ? availableColumns : [...availableColumns, ...missing]
}

/** Drops filters on columns only the previous mode provided; returns the input array when nothing is dropped. */
export const dropVanishedModeColumnFilters = (
  filters: FieldFilter[],
  previousModeColumns: GridColumnConfiguration[],
  filterableColumns: AvailableColumn[]
): FieldFilter[] => {
  const kept = filters.filter((filter) =>
    !previousModeColumns.some((column) => column.key === filter.key) ||
    filterableColumns.some((column) => column.key === filter.key)
  )

  return kept.length === filters.length ? filters : kept
}
