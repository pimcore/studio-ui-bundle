/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isArray, isObject } from 'lodash'
import { type GridFilter } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

const readSavedColumnFilters = (filter: GridFilter[] | GridFilter | undefined): FieldFilter[] => {
  const savedFilter = isArray(filter) ? undefined : filter
  const columnFilters = savedFilter?.columnFilters

  return isArray(columnFilters) ? columnFilters as unknown as FieldFilter[] : []
}

/**
 * Mirrors the `meta.filters.key ?? key` precedence DynamicTypeFieldFilterAbstract uses when
 * serializing a filter for the API, so a column with a configured key override can still be
 * matched back against the raw key the backend persisted.
 */
const getConfiguredFilterKey = (column: AvailableColumn): string | undefined => {
  const config = column.config

  if (!isObject(config) || !('filters' in config)) {
    return undefined
  }

  const filters = (config as { filters?: unknown }).filters

  return isObject(filters) && 'key' in filters && typeof (filters as { key?: unknown }).key === 'string'
    ? (filters as { key: string }).key
    : undefined
}

/**
 * The backend returns the saved grid-configuration filter as either the persisted
 * object or `[]` when the configuration never had one saved (saveFilter was false) -
 * see GridDetailedConfiguration.filter in the Studio backend.
 */
export const restoreFieldFilters = (filter: GridFilter[] | GridFilter | undefined, availableColumns: AvailableColumn[]): FieldFilter[] => {
  const restored: FieldFilter[] = []

  for (const columnFilter of readSavedColumnFilters(filter)) {
    const availableColumn = availableColumns.find((column) => (getConfiguredFilterKey(column) ?? column.key) === columnFilter.key)

    if (availableColumn === undefined) {
      continue
    }

    restored.push({
      key: availableColumn.key,
      type: availableColumn.type,
      filterValue: columnFilter.filterValue,
      locale: columnFilter.locale ?? null,
      meta: columnFilter.meta ?? { translationKey: availableColumn.key }
    })
  }

  return restored
}
