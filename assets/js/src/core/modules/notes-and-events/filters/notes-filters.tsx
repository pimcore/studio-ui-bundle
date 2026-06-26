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
import {
  useDynamicTypeResolver,
  type UseDynamicTypeResolverReturnType
} from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { DynamicTypeFieldFilterNumber } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/number/dynamic-type-field-filter-number'
import { DynamicTypeFieldFilterDate } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/types/date/dynamic-type-field-filter-date'
import { NumberFilterSettingValue, type NumberValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-number-component'
import { DatePickerSettingValue, type DateValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/components/dynamic-type-field-filter-date-component'
import { type FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'

/** Operators accepted by the notes `fieldFilters` payload. */
export enum NotesFilterOperator {
  Equal = 'eq',
  LessThan = 'lt',
  GreaterThan = 'gt',
  Like = 'like'
}

/** A single entry of the notes `fieldFilters` request payload. */
export interface NotesFieldFilter {
  operator: NotesFilterOperator
  value: string
  field: string
  type: string
}

/**
 * Describes a note property that can be filtered. `frontendType` resolves a registered
 * `DynamicTypeFieldFilter` (e.g. 'string', 'number', 'date') so the control comes from the
 * dynamic-type registry; `type` is the value sent in the payload's `type` field.
 */
export interface NotesFilterColumn {
  /** Backend field name; becomes the payload's `field`. */
  key: string
  /** Translation key shown in the picker and the filter tag. */
  translationKey: string
  /** Payload `type` token ('string' | 'numeric' | 'date'). */
  type: string
  /** Registry id used to resolve the control / value handling. */
  frontendType: string
}

/** Tagged-union contribution: search maps to `filter`, field filters to `fieldFilters`. */
export type NotesFilterContribution =
  | { kind: 'filter', value: string }
  | { kind: 'fieldFilters', filters: NotesFieldFilter[] }

export interface NotesFilterContext {
  columns: NotesFilterColumn[]
  getType: UseDynamicTypeResolverReturnType['getType']
}

/**
 * Filter slice of the notes collection request body (page/pageSize stay with the hook).
 * `fieldFilters` is a JSON string — the backend json_decodes it into an array.
 */
export interface NotesFilterQuery {
  filter?: string
  fieldFilters?: string
}

/**
 * Notes have no backend column-config endpoint, so the field-filter picker offers this fixed
 * list. `cPath`/`data` for element/details are best-effort mappings to confirm with the backend.
 */
export const NOTES_FILTERABLE_FIELDS: NotesFilterColumn[] = [
  { key: 'id', translationKey: 'id', type: 'numeric', frontendType: 'number' },
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

interface OperatorValue {
  operator: NotesFilterOperator
  value: string
}

const toStringValue = (value: number | string | null): string => value == null ? '' : String(value)

/** Maps a number filter (is / less / more / between) to operator+value pairs. */
const getNumberOperatorValues = (value: NumberValue): OperatorValue[] => {
  const { setting, is, from, to } = value

  switch (setting) {
    case NumberFilterSettingValue.LESS:
      return [{ operator: NotesFilterOperator.LessThan, value: toStringValue(to) }]
    case NumberFilterSettingValue.MORE:
      return [{ operator: NotesFilterOperator.GreaterThan, value: toStringValue(from) }]
    case NumberFilterSettingValue.BETWEEN:
      return [
        { operator: NotesFilterOperator.GreaterThan, value: toStringValue(from) },
        { operator: NotesFilterOperator.LessThan, value: toStringValue(to) }
      ]
    default:
      return [{ operator: NotesFilterOperator.Equal, value: toStringValue(is) }]
  }
}

/** Maps a date filter (on / before / after / between) to operator+value pairs. */
const getDateOperatorValues = (value: DateValue): OperatorValue[] => {
  const { setting, on, from, to } = value

  switch (setting) {
    case DatePickerSettingValue.BEFORE:
      return [{ operator: NotesFilterOperator.LessThan, value: toStringValue(to) }]
    case DatePickerSettingValue.AFTER:
      return [{ operator: NotesFilterOperator.GreaterThan, value: toStringValue(from) }]
    case DatePickerSettingValue.BETWEEN:
      return [
        { operator: NotesFilterOperator.GreaterThan, value: toStringValue(from) },
        { operator: NotesFilterOperator.LessThan, value: toStringValue(to) }
      ]
    default:
      return [{ operator: NotesFilterOperator.Equal, value: toStringValue(on) }]
  }
}

/**
 * Builds the `fieldFilters` payload. The control / value shape comes from the registered
 * `DynamicTypeFieldFilter` (resolved via the registry, like the general-filters host); the
 * value is then expanded into `{operator, value, field, type}` entries the notes API expects.
 */
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

    if (dynamicTypeFieldFilter instanceof DynamicTypeFieldFilterNumber) {
      operatorValues = getNumberOperatorValues(filter.filterValue as NumberValue)
    } else if (dynamicTypeFieldFilter instanceof DynamicTypeFieldFilterDate) {
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
