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
import { DynamicTypeFieldFilterDate } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/date/dynamic-type-field-filter-date'
import { type DateValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import {
  type NotesFieldFilter,
  type NotesFilterColumn,
  type NotesFilterContext, type NotesFilterContribution, NotesFilterOperator, type NotesFilterQuery,
  type OperatorValue
} from '@Pimcore/modules/notes-and-events/filters/types'
import { getDateOperatorValues } from '@Pimcore/modules/notes-and-events/filters/helpers'

export const NOTES_FILTERABLE_FIELDS: NotesFilterColumn[] = [
  { key: 'type', translationKey: 'notes-and-events.columns.type', type: 'string', frontendType: 'string' },
  { key: 'title', translationKey: 'notes-and-events.columns.title', type: 'string', frontendType: 'string' },
  { key: 'description', translationKey: 'notes-and-events.columns.description', type: 'string', frontendType: 'string' },
  { key: 'userName', translationKey: 'notes-and-events.columns.user', type: 'string', frontendType: 'string' },
  { key: 'date', translationKey: 'notes-and-events.columns.date', type: 'date', frontendType: 'date' }
]

export const {
  FiltersStoreProvider: NotesAppliedFiltersProvider,
  useFiltersStore: useNotesAppliedFilters
} = createFiltersStore()

export const {
  FiltersStoreProvider: NotesDraftFiltersProvider,
  useFiltersStore: useNotesDraftFilters
} = createFiltersStore()

export const useNotesFilterContext = (): NotesFilterContext => {
  const { getType } = useDynamicTypeResolver()

  return { columns: NOTES_FILTERABLE_FIELDS, getType }
}

const prepareFieldFilters = (filters: FieldFilter[], context: NotesFilterContext): NotesFieldFilter[] => {
  const { columns, getType } = context
  const preparedFilters: NotesFieldFilter[] = []

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

    let operatorValues: OperatorValue[]

    if (dynamicTypeFieldFilter instanceof DynamicTypeFieldFilterDate) {
      operatorValues = getDateOperatorValues(filter.filterValue as DateValue)
    } else {
      operatorValues = [{ operator: NotesFilterOperator.Like, value: String(filter.filterValue) }]
    }

    operatorValues.forEach(({ operator, value }) => {
      preparedFilters.push({ field: column.key, type: column.type, operator, value })
    })
  })

  return preparedFilters
}

const SearchTermControl: FC<FilterControlProps<string>> = ({ value, onChange }) => (
  <SearchInput
    className='w-full'
    data-testid="notes-search-term-input"
    maxWidth={ '100%' }
    onChange={ (event) => { onChange(event.target.value) } }
    placeholder='Search'
    value={ value }
  />
)

const searchTermDescriptor = defineFilter<string, NotesFilterContribution, NotesFilterContext>({
  key: 'searchTerm',
  defaultValue: '',
  section: 'search',
  order: 0,
  isEnabled: () => true,
  Control: SearchTermControl,
  toQuery: (value) => value !== '' ? { kind: 'filter', value } : undefined
})

const fieldFiltersDescriptor = defineFilter<FieldFilter[], NotesFilterContribution, NotesFilterContext>({
  key: 'fieldFilters',
  defaultValue: [],
  section: 'fields',
  order: 10,
  isEnabled: () => true,
  toQuery: (value, context) => {
    if (value.length === 0) {
      return undefined
    }

    return { kind: 'fieldFilters', filters: prepareFieldFilters(value, context) }
  }
})

export const notesFilterDescriptors: ReadonlyArray<AnyFilterDescriptor<NotesFilterContribution, NotesFilterContext>> = [
  searchTermDescriptor,
  fieldFiltersDescriptor
]

export const notesFilterAdapter: FilterHostAdapter<NotesFilterContribution, NotesFilterContext, NotesFilterQuery> = {
  descriptors: notesFilterDescriptors,
  useBuildContext: useNotesFilterContext,
  composeIntoQuery: (contributions, baseQuery) => {
    const next: NotesFilterQuery = { ...baseQuery }
    const fieldFilters: NotesFieldFilter[] = []

    for (const contribution of contributions) {
      if (contribution.kind === 'filter') {
        next.filter = contribution.value
      } else {
        fieldFilters.push(...contribution.filters)
      }
    }

    if (fieldFilters.length > 0) {
      next.fieldFilters = JSON.stringify(fieldFilters)
    }

    return next
  }
}
