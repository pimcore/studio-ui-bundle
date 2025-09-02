/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { useSearchTermFilter } from '../context-layer/provider/search-term-filter/use-search-term-filter'
import { searchTermFilterType } from '../context-layer/provider/search-term-filter/search-term-filter-provider'
import { useDirectChildrenFilter } from '../context-layer/provider/direct-children-filter/use-direct-children-filter'
import { pqlFilterType } from '../context-layer/provider/pql-filter/pql-filter-provider'
import { usePqlFilter } from '../context-layer/provider/pql-filter/use-pql-filter'
import { useFieldFilters } from '../context-layer/provider/field-filters/use-field-filters'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { type DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { type ColumnFilter } from '@tanstack/react-table'

export const withGeneralFiltersQueryArg = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useDataQueryHelperGeneralFiltersExtension: AbstractDecoratorProps['useDataQueryHelper'] = () => {
    const { getArgs: baseGetArgs, ...baseMethods } = useBaseHook()
    const { getDataQueryFilterArg: getSearchTermFilterArg } = useSearchTermFilter()
    const { getDataQueryFilterArg: getPqlFilterArg } = usePqlFilter()
    const { onlyDirectChildren } = useDirectChildrenFilter()
    const { fieldFilters } = useFieldFilters()
    const { availableColumns } = useAvailableColumns()
    const { hasType, getType } = useDynamicTypeResolver()

    const getUpdatedColumnFilters = (columnFilters: any[]): any[] => {
      return columnFilters.map(({ filterType, ...rest }) => ({
        ...rest,
        ...(filterType !== undefined && { type: filterType })
      }))
    }

    const getApplicableFieldFilters = (filters: any[]): any[] => {
      return filters.filter((filter) => {
        const column = availableColumns.find(col => col.key === filter.key)
        const frontendType = column?.frontendType ?? filter.type ?? 'string'

        if (hasType({ target: 'FIELD_FILTER', dynamicTypeIds: [frontendType] })) {
          const dynamicType = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [frontendType] }) as DynamicTypeFieldFilterAbstract | null
          if (dynamicType !== null && 'dynamicTypeFieldFilterType' in dynamicType) {
            const fieldFilterType = dynamicType.dynamicTypeFieldFilterType as DynamicTypeFieldFilterAbstract
            return fieldFilterType.shouldApply(filter.filterValue)
          }
        }

        return false
      })
    }

    const getArgs: typeof baseGetArgs = () => {
      const baseArgs = baseGetArgs()
      const searchTermFilter = getSearchTermFilterArg()
      const pqlFilter = getPqlFilterArg()

      const columnsToFilterOut = availableColumns.map((column) => column.key)
      columnsToFilterOut.push(pqlFilterType, searchTermFilterType)

      const currentColumnFilters = baseArgs.body.filters.columnFilters ?? []
      const newColumnFilters = [
        ...currentColumnFilters.filter((currentFilter) => !columnsToFilterOut.includes(currentFilter.type as string))
      ]

      if (searchTermFilter !== undefined) {
        newColumnFilters.push(searchTermFilter)
      }

      if (pqlFilter !== undefined) {
        newColumnFilters.push(pqlFilter)
      }

      if (fieldFilters.length > 0) {
        const applicableFieldFilters = getApplicableFieldFilters(fieldFilters)
        newColumnFilters.push(...applicableFieldFilters as ColumnFilter[])
      }

      return {
        ...baseArgs,
        body: {
          ...baseArgs.body,
          filters: {
            ...baseArgs.body.filters,
            includeDescendants: !onlyDirectChildren,
            columnFilters: getUpdatedColumnFilters(newColumnFilters)
          }
        }
      }
    }

    return {
      ...baseMethods,
      getArgs
    }
  }

  return useDataQueryHelperGeneralFiltersExtension
}
