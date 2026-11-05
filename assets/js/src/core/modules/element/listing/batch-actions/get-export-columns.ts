/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import { type GridColumnRequest } from '@sdk/api/asset'
import {
  type SelectedColumn
} from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'

const ADVANCED_COLUMN_TYPE = 'dataobject.advanced'
const CLASSIFICATION_STORE_COLUMN_TYPE = 'dataobject.classificationstore'

const normalizeLocale = (locale?: string | null): string | null => locale === undefined || locale === 'default' ? null : locale

// A selected column without a locale follows the current language, so any request locale fits it;
// a fixed locale must match, or a same-key column of another locale (e.g. from a search mode) is exported too.
const matchesLocale = (column: GridColumnRequest, selectedColumn: SelectedColumn): boolean =>
  selectedColumn.locale === undefined || selectedColumn.locale === null ||
  normalizeLocale(selectedColumn.locale) === normalizeLocale(column.locale)

// Classification store siblings share the field key; the store key and group tell them apart.
const matchesClassificationStoreKey = (column: GridColumnRequest, selectedColumn: SelectedColumn): boolean => {
  if (column.type !== CLASSIFICATION_STORE_COLUMN_TYPE) {
    return true
  }

  const config = column.config as { keyId?: unknown, groupId?: unknown } | undefined

  return config?.keyId === selectedColumn.config?.keyId && config?.groupId === selectedColumn.config?.groupId
}

// The grid request sends an advanced column under its per-instance `__meta.uniqueId` instead of its
// shared 'advanced' key, so sibling advanced columns can be told apart (see use-data-query-helper.ts).
const findSelectedColumn = (
  column: GridColumnRequest,
  selectedColumns: SelectedColumn[]
): SelectedColumn | undefined => {
  if (column.type === ADVANCED_COLUMN_TYPE) {
    return selectedColumns.find((selectedColumn) =>
      selectedColumn.type === ADVANCED_COLUMN_TYPE &&
      selectedColumn.originalApiDefinition?.__meta?.uniqueId === column.key
    )
  }

  return selectedColumns.find((selectedColumn) =>
    selectedColumn.key === column.key &&
    matchesLocale(column, selectedColumn) &&
    matchesClassificationStoreKey(column, selectedColumn)
  )
}

/**
 * Picks the grid request columns that are selected for export, keeping their order.
 * Every column is exported under the selected column's own key: the backend names the export header after it,
 * and export rows are positional, so advanced columns sharing the 'advanced' key keep their own values.
 */
export const getExportColumns = (
  columns: GridColumnRequest[],
  selectedColumns: SelectedColumn[]
): GridColumnRequest[] => {
  const exportColumns: GridColumnRequest[] = []

  for (const column of columns) {
    const selectedColumn = findSelectedColumn(column, selectedColumns)

    if (isUndefined(selectedColumn)) {
      continue
    }

    exportColumns.push({
      key: selectedColumn.key ?? column.key,
      type: column.type,
      group: column.group as unknown as string[] | undefined,
      locale: column.locale,
      config: column.config
    })
  }

  return exportColumns
}
