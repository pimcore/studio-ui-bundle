/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type FC } from 'react'
import {
  type AnyFilterDescriptor,
  type FilterControlProps,
  type FilterHostAdapter,
  createFiltersStore,
  defineFilter
} from '@Pimcore/components/filters'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import { useTranslationFilterColumns } from '@Pimcore/modules/translations/filters/hooks/use-translation-filter-columns'
import {
  type TranslationColumnFilter,
  type TranslationFilterContext,
  type TranslationFilterContribution,
  type TranslationFilterQuery
} from '@Pimcore/modules/translations/filters/types'

export const {
  FiltersStoreProvider: TranslationsAppliedFiltersProvider,
  useFiltersStore: useTranslationsAppliedFilters
} = createFiltersStore()

export const {
  FiltersStoreProvider: TranslationsDraftFiltersProvider,
  useFiltersStore: useTranslationsDraftFilters
} = createFiltersStore()

export const useTranslationsFilterContext = (): TranslationFilterContext => {
  const { getType } = useDynamicTypeResolver()
  const columns = useTranslationFilterColumns()

  return { columns, getType }
}

const prepareFieldFilters = (filters: FieldFilter[], context: TranslationFilterContext): TranslationColumnFilter[] => {
  const { columns, getType } = context
  const preparedFilters: TranslationColumnFilter[] = []

  filters.forEach((filter) => {
    const column = columns.find((col) => col.key === filter.key)

    if (column === undefined) {
      return
    }

    let type = getType({ target: 'FIELD_FILTER', dynamicTypeIds: [column.type, column.frontendType] })

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

    if (!dynamicTypeFieldFilter.shouldApply(filter)) {
      return
    }

    preparedFilters.push({ key: column.key, type: column.type, filterValue: String(filter.filterValue) })
  })

  return preparedFilters
}

const SearchTermControl: FC<FilterControlProps<string>> = ({ value, onChange }) => (
  <SearchInput
    className='w-full'
    data-testid='translations-search-input'
    maxWidth={ '100%' }
    onChange={ (event) => { onChange(event.target.value) } }
    placeholder='Search'
    value={ value }
  />
)

const searchTermDescriptor = defineFilter<string, TranslationFilterContribution, TranslationFilterContext>({
  key: 'searchTerm',
  defaultValue: '',
  section: 'search',
  order: 0,
  isEnabled: () => true,
  Control: SearchTermControl,
  toQuery: (value) => value !== '' ? { kind: 'columnFilters', filters: [{ type: 'search', filterValue: value }] } : undefined
})

const fieldFiltersDescriptor = defineFilter<FieldFilter[], TranslationFilterContribution, TranslationFilterContext>({
  key: 'fieldFilters',
  defaultValue: [],
  section: 'fields',
  order: 10,
  isEnabled: () => true,
  toQuery: (value, context) => {
    if (value.length === 0) {
      return undefined
    }

    return { kind: 'columnFilters', filters: prepareFieldFilters(value, context) }
  }
})

export const translationsFilterDescriptors: ReadonlyArray<AnyFilterDescriptor<TranslationFilterContribution, TranslationFilterContext>> = [
  searchTermDescriptor,
  fieldFiltersDescriptor
]

export const translationsFilterAdapter: FilterHostAdapter<TranslationFilterContribution, TranslationFilterContext, TranslationFilterQuery> = {
  descriptors: translationsFilterDescriptors,
  useBuildContext: useTranslationsFilterContext,
  composeIntoQuery: (contributions, baseQuery) => {
    const next: TranslationFilterQuery = { ...baseQuery }
    const columnFilters: TranslationColumnFilter[] = []

    for (const contribution of contributions) {
      columnFilters.push(...contribution.filters)
    }

    if (columnFilters.length > 0) {
      next.columnFilters = columnFilters
    }

    return next
  }
}
