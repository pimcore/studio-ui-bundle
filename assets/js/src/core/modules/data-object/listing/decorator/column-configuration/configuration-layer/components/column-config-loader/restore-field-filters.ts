/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isArray } from 'lodash'
import { type GridFilter } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

const readSavedColumnFilters = (filter: GridFilter[] | GridFilter | undefined): FieldFilter[] => {
  const savedFilter = isArray(filter) ? undefined : filter
  const columnFilters = savedFilter?.columnFilters

  return isArray(columnFilters) ? columnFilters as unknown as FieldFilter[] : []
}

/**
 * The backend returns the saved grid-configuration filter as either the persisted
 * object or `[]` when the configuration never had one saved (saveFilter was false) -
 * see GridDetailedConfiguration.filter in the Studio backend.
 */
export const restoreFieldFilters = (filter: GridFilter[] | GridFilter | undefined, availableColumns: AvailableColumn[]): FieldFilter[] => {
  const restored: FieldFilter[] = []

  for (const columnFilter of readSavedColumnFilters(filter)) {
    const availableColumn = availableColumns.find((column) => column.key === columnFilter.key)

    if (availableColumn === undefined) {
      continue
    }

    restored.push({
      key: columnFilter.key,
      type: availableColumn.type,
      filterValue: columnFilter.filterValue,
      locale: columnFilter.locale ?? null,
      meta: columnFilter.meta ?? { translationKey: columnFilter.key }
    })
  }

  return restored
}
