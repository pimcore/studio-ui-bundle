/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isArray, isObject, isString, isUndefined } from 'lodash'
import { type GridFilter } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

/**
 * GridDetailedConfiguration.filter is generated as GridFilter[], but the backend only ever
 * sends a single Filter object (JSON-encoded as an object, since Filter::toArray() has string
 * keys) or `[]` when the configuration never had one saved (saveFilter was false) - see
 * DetailedConfigurationHydrator in the Studio backend. The array form never carries an item.
 */
export const normalizeSavedGridFilter = (filter: GridFilter[] | GridFilter | undefined): GridFilter | undefined => {
  return isArray(filter) ? undefined : filter
}

const readSavedColumnFilters = (filter: GridFilter[] | GridFilter | undefined): FieldFilter[] => {
  const columnFilters = normalizeSavedGridFilter(filter)?.columnFilters

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

  return isObject(filters) && 'key' in filters && isString((filters as { key?: unknown }).key)
    ? (filters as { key: string }).key
    : undefined
}

const CLASSIFICATION_STORE_COLUMN_TYPE = 'dataobject.classificationstore'

/**
 * DynamicTypeFieldFilterClassificationStore#transformFilterToApiRequest wraps the scalar
 * value as `{ value, keyId, groupId }` for the API request, but the editor (and the rest of
 * this restore path) expects the plain scalar in filterValue - the ids live in meta instead.
 */
const restoreFilterValue = (column: AvailableColumn, filterValue: unknown): unknown => {
  if (column.type !== CLASSIFICATION_STORE_COLUMN_TYPE) {
    return filterValue
  }

  return isObject(filterValue) && 'value' in filterValue ? (filterValue as { value: unknown }).value : filterValue
}

export const restoreFieldFilters = (filter: GridFilter[] | GridFilter | undefined, availableColumns: AvailableColumn[]): FieldFilter[] => {
  const restored: FieldFilter[] = []

  for (const columnFilter of readSavedColumnFilters(filter)) {
    const availableColumn = availableColumns.find((column) => (getConfiguredFilterKey(column) ?? column.key) === columnFilter.key)

    if (isUndefined(availableColumn)) {
      continue
    }

    restored.push({
      key: availableColumn.key,
      type: availableColumn.type,
      filterValue: restoreFilterValue(availableColumn, columnFilter.filterValue),
      locale: columnFilter.locale ?? null,
      meta: columnFilter.meta ?? { translationKey: availableColumn.key }
    })
  }

  return restored
}
