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
import { useTranslation } from 'react-i18next'
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
import { DynamicTypeFieldFilterDate } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/date/dynamic-type-field-filter-date'
import { type DateValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'
import { transformDateFilter } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/date-filter-transform'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import {
  type RecycleBinColumnFilter,
  type RecycleBinFilterColumn,
  type RecycleBinFilterContext,
  type RecycleBinFilterContribution,
  type RecycleBinFilterQuery
} from '@Pimcore/modules/recycle-bin/filters/types'

export const RECYCLE_BIN_FILTERABLE_FIELDS: RecycleBinFilterColumn[] = [
  { key: 'path', translationKey: 'recycle-bin.columns.path', type: 'like', frontendType: 'string' },
  { key: 'deletedby', translationKey: 'recycle-bin.columns.deleted-by', type: 'like', frontendType: 'string' }
  // TODO: should be available as soon as this bug (https://github.com/pimcore/studio-backend-bundle/issues/1937) is fixed
  // { key: 'date', translationKey: 'recycle-bin.columns.date', type: 'date', frontendType: 'date' }
]

export const {
  FiltersStoreProvider: RecycleBinAppliedFiltersProvider,
  useFiltersStore: useRecycleBinAppliedFilters
} = createFiltersStore()

export const {
  FiltersStoreProvider: RecycleBinDraftFiltersProvider,
  useFiltersStore: useRecycleBinDraftFilters
} = createFiltersStore()

export const useRecycleBinFilterContext = (): RecycleBinFilterContext => {
  const { getType } = useDynamicTypeResolver()

  return { columns: RECYCLE_BIN_FILTERABLE_FIELDS, getType }
}

const prepareFieldFilters = (filters: FieldFilter[], context: RecycleBinFilterContext): RecycleBinColumnFilter[] => {
  const { columns, getType } = context
  const preparedFilters: RecycleBinColumnFilter[] = []

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

    if (dynamicTypeFieldFilter instanceof DynamicTypeFieldFilterDate) {
      transformDateFilter(filter.filterValue as DateValue).forEach((filterValue) => {
        preparedFilters.push({ key: column.key, type: column.type, filterValue })
      })
    } else {
      preparedFilters.push({ key: column.key, type: column.type, filterValue: String(filter.filterValue) })
    }
  })

  return preparedFilters
}

const SearchTermControl: FC<FilterControlProps<string>> = ({ value, onChange }) => {
  const { t } = useTranslation()

  return (
    <SearchInput
      className='w-full'
      data-testid='recycle-bin-search-input'
      maxWidth={ '100%' }
      onChange={ (event) => { onChange(event.target.value) } }
      placeholder={ t('search') }
      value={ value }
    />
  )
}

const searchTermDescriptor = defineFilter<string, RecycleBinFilterContribution, RecycleBinFilterContext>({
  key: 'searchTerm',
  defaultValue: '',
  section: 'search',
  order: 0,
  isEnabled: () => true,
  Control: SearchTermControl,
  toQuery: (value) => value !== '' ? { kind: 'columnFilters', filters: [{ key: 'path', type: 'like', filterValue: value }] } : undefined
})

const fieldFiltersDescriptor = defineFilter<FieldFilter[], RecycleBinFilterContribution, RecycleBinFilterContext>({
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

export const recycleBinFilterDescriptors: ReadonlyArray<AnyFilterDescriptor<RecycleBinFilterContribution, RecycleBinFilterContext>> = [
  searchTermDescriptor,
  fieldFiltersDescriptor
]

export const recycleBinFilterAdapter: FilterHostAdapter<RecycleBinFilterContribution, RecycleBinFilterContext, RecycleBinFilterQuery> = {
  descriptors: recycleBinFilterDescriptors,
  useBuildContext: useRecycleBinFilterContext,
  composeIntoQuery: (contributions, baseQuery) => {
    const next: RecycleBinFilterQuery = { ...baseQuery }
    const columnFilters: RecycleBinColumnFilter[] = []

    for (const contribution of contributions) {
      columnFilters.push(...contribution.filters)
    }

    if (columnFilters.length > 0) {
      next.columnFilters = columnFilters
    }

    return next
  }
}
