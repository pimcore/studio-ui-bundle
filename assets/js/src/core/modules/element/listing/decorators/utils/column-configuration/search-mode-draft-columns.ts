/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import {
  getColumnIdentity,
  type SearchModeColumnPlacement,
  splitSearchModeColumns
} from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/search-mode-columns'
import { type AvailableColumn } from './context-layer/provider/available-columns/available-columns-provider'

/** Whether a column configuration draft entry was added by the applied search mode (session-only, never saved). */
export const isSearchModeDraftColumn = (column: AvailableColumn): boolean => column.__meta?.searchModeColumn === true

/** Builds the column configuration draft from the visible columns, tagging the search mode columns. */
export const buildColumnConfigurationDraft = (
  visibleColumns: SelectedColumn[],
  isSearchModeColumn: (column: SelectedColumn) => boolean,
  toDraftColumn: (column: SelectedColumn) => AvailableColumn
): AvailableColumn[] => visibleColumns.map((column) => {
  const draft = toDraftColumn(column)

  if (!isSearchModeColumn(column)) {
    return draft
  }

  return {
    ...draft,
    // stable id so the list item survives draft re-syncs
    __meta: { ...draft.__meta, uniqueId: `search-mode:${getColumnIdentity(column)}`, searchModeColumn: true }
  }
})

/** Draft columns to persist in a grid configuration: search mode columns are left out. */
export const withoutSearchModeDraftColumns = (columns: AvailableColumn[]): AvailableColumn[] =>
  columns.filter((column) => !isSearchModeDraftColumn(column))

/** Applies the draft: user columns become the selected columns, search mode columns keep their position as session placement. */
export const applyColumnConfigurationDraft = (
  columns: AvailableColumn[],
  toSelectedColumn: (column: AvailableColumn) => SelectedColumn,
  setSelectedColumns: (columns: SelectedColumn[]) => void,
  updateSearchModeColumnPlacements: (placements: Record<string, Partial<SearchModeColumnPlacement>>) => void
): void => {
  const { selectedColumns, placements } = splitSearchModeColumns(
    columns.map(toSelectedColumn),
    (column) => column.originalApiDefinition?.__meta?.searchModeColumn === true
  )

  setSelectedColumns(selectedColumns)
  updateSearchModeColumnPlacements(placements)
}
