/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

export interface SavedColumn { key?: string, locale?: string | null, width?: number | null }

/** what a restored column is judged by: a late default write can keep the key and still reset the rest */
export interface RestoredColumn { key: string, locale: string | null, width: number | null }

/** Merges the saved key/locale/width with the live available-column definition (same transform grid-config uses). */
export const buildSelectedColumns = (savedColumns: SavedColumn[], availableColumns: AvailableColumn[]): SelectedColumn[] => {
  const selectedColumns: SelectedColumn[] = []
  for (const savedColumn of savedColumns) {
    const availableColumn = availableColumns.find((available) => available.key === savedColumn.key)
    if (isNil(availableColumn)) {
      continue
    }
    selectedColumns.push({
      key: savedColumn.key,
      // normalized to null: the column mappers compare locale strictly, and the grid data
      // carries null — a column saved without a locale (an agent's bare key) must still map
      locale: savedColumn.locale ?? null,
      type: availableColumn.type,
      config: availableColumn.config,
      sortable: availableColumn.sortable,
      editable: availableColumn.editable,
      localizable: availableColumn.localizable,
      exportable: availableColumn.exportable,
      frontendType: availableColumn.frontendType,
      group: availableColumn.group,
      width: savedColumn.width,
      originalApiDefinition: availableColumn
    })
  }
  return selectedColumns
}

/**
 * The column layout a saved search resolves to against the live available columns — what the
 * restore is expected to leave in the grid. Empty when nothing the search names is available.
 */
export const restoredColumnLayout = (saved: SavedColumn[], available: AvailableColumn[]): RestoredColumn[] =>
  buildSelectedColumns(saved, available).map((column) => ({
    key: column.key ?? '',
    locale: column.locale ?? null,
    width: column.width ?? null
  }))

/** whether the grid carries exactly that layout, in order */
export const carriesLayout = (selected: SelectedColumn[], expected: RestoredColumn[]): boolean =>
  selected.length === expected.length && expected.every((column, index) =>
    selected[index]?.key === column.key &&
    (selected[index]?.locale ?? null) === column.locale &&
    (selected[index]?.width ?? null) === column.width)
