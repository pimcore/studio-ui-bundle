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
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { type FieldFilter } from '../context-layer/provider/field-filters/field-filters-provider'

export const withGeneralFiltersQueryArg = (useBaseHook: AbstractDecoratorProps['useDataQueryHelper']): AbstractDecoratorProps['useDataQueryHelper'] => {
  const useDataQueryHelperGeneralFiltersExtension: AbstractDecoratorProps['useDataQueryHelper'] = () => {
    const { getArgs: baseGetArgs, ...baseMethods } = useBaseHook()
    const { getDataQueryFilterArg: getSearchTermFilterArg } = useSearchTermFilter()
    const { getDataQueryFilterArg: getPqlFilterArg } = usePqlFilter()
    const { onlyDirectChildren } = useDirectChildrenFilter()
    const { fieldFilters } = useFieldFilters()
    const { availableColumns } = useAvailableColumns()
    const { getType } = useDynamicTypeResolver()
    const { currentLanguage } = useLanguageSelection()

    const getColumnLocale = (columnKey: string, providedLocale?: string): string | null => {
      const column = availableColumns.find(col => col.key === columnKey)
      return column?.localizable === true ? (providedLocale ?? currentLanguage) : null
    }

    const getFilterType = (filterType?: string, type?: string): string | undefined => {
      return filterType ?? type
    }

    const getUpdatedColumnFilters = (columnFilters: any[]): any[] => {
      return columnFilters.map(({ filterType, type, ...rest }) => ({
        ...rest,
        type: getFilterType(filterType as string | undefined, type as string | undefined),
        locale: getColumnLocale(rest.key as string, rest.locale as string | undefined)
      }))
    }

    const prepareFilters = (filters: FieldFilter[]): FieldFilter[] => {
      const preparedFilters: FieldFilter[] = []

      filters.forEach((filter) => {
        const column = availableColumns.find(col => col.key === filter.key)
        let frontendType = column?.frontendType ?? filter.type ?? 'string'

        if (column === undefined) {
          return
        }

        if (column.type === 'dataobject.classificationstore') {
          frontendType = column.type
        }

        let type = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [frontendType] }) as DynamicTypeFieldFilterAbstract | null

        if (type === null) {
          return
        }

        if ('dynamicTypeFieldFilterType' in type) {
          type = type.dynamicTypeFieldFilterType as DynamicTypeFieldFilterAbstract
        }

        if (type.shouldApply(filter)) {
          preparedFilters.push(type.transformFilterToApiResponse(filter))
        }
      })

      return preparedFilters
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
        newColumnFilters.push(...prepareFilters(fieldFilters))
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
