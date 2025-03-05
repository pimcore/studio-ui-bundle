/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { useSearchTermFilter } from '../context-layer/provider/search-term-filter/use-search-term-filter'
import { searchTermFilterType } from '../context-layer/provider/search-term-filter/search-term-filter-provider'
import { useDirectChildrenFilter } from '../context-layer/provider/direct-children-filter/use-direct-children-filter'
import { pqlFilterType } from '../context-layer/provider/pql-filter/pql-filter-provider'
import { usePqlFilter } from '../context-layer/provider/pql-filter/use-pql-filter'
import { useFieldFilters } from '../context-layer/provider/field-filters/use-field-filters'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'

export const withGeneralFiltersQueryArg = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useDataQueryHelperGeneralFiltersExtension: AbstractDecoratorProps['useDataQueryHelper'] = () => {
    const { getArgs: baseGetArgs, ...baseMethods } = useBaseHook()
    const { getDataQueryFilterArg: getSearchTermFilterArg } = useSearchTermFilter()
    const { getDataQueryFilterArg: getPqlFilterArg } = usePqlFilter()
    const { onlyDirectChildren } = useDirectChildrenFilter()
    const { fieldFilters } = useFieldFilters()
    const { availableColumns } = useAvailableColumns()

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
        newColumnFilters.push(...fieldFilters)
      }

      return {
        ...baseArgs,
        body: {
          ...baseArgs.body,
          filters: {
            ...baseArgs.body.filters,
            includeDescendants: !onlyDirectChildren,
            columnFilters: newColumnFilters
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
