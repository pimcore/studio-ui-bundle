/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { defineFilter } from '@Pimcore/components/filters'
import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { type FieldFilter } from '../../context-layer/provider/field-filters/field-filters-provider'
import { type ElementFilterContribution, type ElementListingFilterContext } from '../element-listing-filter-context'

const prepareFieldFilters = (filters: FieldFilter[], context: ElementListingFilterContext): ColumnFilter[] => {
  const { availableColumns, getType } = context
  const preparedFilters: ColumnFilter[] = []

  filters.forEach((filter) => {
    const column = availableColumns.find((col) => col.key === filter.key)

    if (column === undefined) {
      return
    }

    let type = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [column.type, column.frontendType!] })

    if (type === null) {
      return
    }

    if (!(type instanceof DynamicTypeFieldFilterAbstract)) {
      if ('dynamicTypeFieldFilterType' in type) {
        type = type.dynamicTypeFieldFilterType as DynamicTypeFieldFilterAbstract
      } else {
        return
      }
    }

    const dynamicTypeFieldFilter = type as DynamicTypeFieldFilterAbstract

    if (dynamicTypeFieldFilter.shouldApply(filter)) {
      preparedFilters.push(dynamicTypeFieldFilter.transformFilterToApiRequest(filter))
    }
  })

  return preparedFilters
}

export const fieldFiltersFilterDescriptor = defineFilter<FieldFilter[], ElementFilterContribution, ElementListingFilterContext>({
  key: 'fieldFilters',
  defaultValue: [],
  section: 'fields',
  order: 40,
  isEnabled: () => true,
  toQuery: (value, context) => {
    if (value.length === 0) {
      return undefined
    }

    return { kind: 'columnFilters', filters: prepareFieldFilters(value, context) }
  }
})
