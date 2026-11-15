/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import dayjs from 'dayjs'
import { type ReactElement } from 'react'
import { isArray, isNil } from 'lodash'
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { FieldFilterFrontendType } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/frontendTypes'
import { DatePickerSettingValue, NumberFilterSettingValue } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/utils/filter-setting-values'
import type { FieldFilter } from '@Pimcore/modules/element/listing/decorators/general-filters/context-layer/provider/field-filters/field-filters-provider'
import type { DisplayManyToManyRelationValueItem } from '../../hooks/use-value'
import type { RelationFilterColumn, RelationFilterContext } from '../types'
import { createRowMatchers } from './row-matchers'

/**
 * Stands in for the registered field filter types: it reports the filter type
 * of the column and applies the emptiness rules of the number and date filters.
 */
class TestFieldFilterType extends DynamicTypeFieldFilterAbstract {
  id = 'test'

  constructor (private readonly fieldFilterType: string) {
    super()
  }

  getFieldFilterType (): string {
    return this.fieldFilterType
  }

  shouldApply (filter: FieldFilter): boolean {
    const value = filter.filterValue

    if (this.fieldFilterType === FieldFilterFrontendType.Number && !isNil(value) && !isArray(value)) {
      return value.is != null || value.from != null || value.to != null
    }

    if (this.fieldFilterType === FieldFilterFrontendType.Date && !isNil(value) && !isArray(value)) {
      return value.on != null || value.from != null || value.to != null
    }

    return super.shouldApply(filter)
  }

  getFieldFilterComponent (): ReactElement {
    return null as unknown as ReactElement
  }
}

const createColumn = (key: string, valueKey: string, frontendType: FieldFilterFrontendType): RelationFilterColumn => ({
  key,
  valueKey,
  title: key,
  type: 'test',
  frontendType
})

const idColumn = createColumn('id', 'id', FieldFilterFrontendType.Number)
const pathColumn = createColumn('fullPath', 'fullPath', FieldFilterFrontendType.String)
const typeColumn = createColumn('type', 'type', FieldFilterFrontendType.String)
const nameColumn = createColumn('{"key":"name","locale":null}', 'name', FieldFilterFrontendType.String)
const createdColumn = createColumn('{"key":"created","locale":null}', 'created', FieldFilterFrontendType.Date)
const activeColumn = createColumn('{"key":"active","locale":null}', 'active', FieldFilterFrontendType.Boolean)

const items: DisplayManyToManyRelationValueItem[] = [
  { id: 1, type: 'object', subtype: 'Product', fullPath: '/Products/Chair', isPublished: true },
  { id: 2, type: 'asset', subtype: 'image', fullPath: '/Assets/chair.jpg', isPublished: null },
  { id: 3, type: 'document', subtype: 'page', fullPath: '/Home/Table', isPublished: true }
]

const createContext = (columns: RelationFilterColumn[]): RelationFilterContext => ({
  columns,
  visibleFieldsMap: new Map([
    [1, { id: 1, name: 'Wooden chair', created: dayjs('2026-03-01').unix(), active: true }],
    [2, { id: 2, name: 'Chair photo', created: dayjs('2026-04-15').unix(), active: false }],
    [3, { id: 3, name: 'Table page', created: dayjs('2026-05-20').unix(), active: null }]
  ]),
  getType: ({ dynamicTypeIds }) => {
    const [, frontendType] = dynamicTypeIds

    return new TestFieldFilterType(frontendType)
  }
})

const createFilter = (key: string, filterValue: unknown): FieldFilter => ({
  key,
  type: 'test',
  filterValue,
  locale: null,
  meta: { translationKey: key }
})

const filterItems = (filters: FieldFilter[], columns: RelationFilterColumn[]): number[] => {
  const matchers = createRowMatchers(filters, createContext(columns))

  return items
    .filter((item) => matchers.every((matcher) => matcher(item)))
    .map((item) => item.id)
}

describe('createRowMatchers', () => {
  it('matches a number filter against the relation id', () => {
    const filters = [createFilter('id', { setting: NumberFilterSettingValue.IS, is: 2, from: null, to: null })]

    expect(filterItems(filters, [idColumn])).toEqual([2])
  })

  it('supports the number filter ranges', () => {
    const filters = [createFilter('id', { setting: NumberFilterSettingValue.BETWEEN, is: null, from: 2, to: 3 })]

    expect(filterItems(filters, [idColumn])).toEqual([2, 3])
  })

  it('matches a text filter case insensitively', () => {
    const filters = [createFilter('fullPath', 'CHAIR')]

    expect(filterItems(filters, [pathColumn])).toEqual([1, 2])
  })

  it('reads the value of a visible field column from the visible fields', () => {
    const filters = [createFilter(nameColumn.key, 'wooden')]

    expect(filterItems(filters, [nameColumn])).toEqual([1])
  })

  it('matches a date filter by calendar day', () => {
    const on = [createFilter(createdColumn.key, { setting: DatePickerSettingValue.ON, on: '2026-04-15T00:00:00Z', from: null, to: null })]
    const after = [createFilter(createdColumn.key, { setting: DatePickerSettingValue.AFTER, on: null, from: '2026-04-15T00:00:00Z', to: null })]
    const between = [createFilter(createdColumn.key, { setting: DatePickerSettingValue.BETWEEN, on: null, from: '2026-03-15T00:00:00Z', to: '2026-05-01T00:00:00Z' })]

    expect(filterItems(on, [createdColumn])).toEqual([2])
    expect(filterItems(after, [createdColumn])).toEqual([2, 3])
    expect(filterItems(between, [createdColumn])).toEqual([2])
  })

  it('matches a boolean filter including the empty selection', () => {
    expect(filterItems([createFilter(activeColumn.key, [true])], [activeColumn])).toEqual([1])
    expect(filterItems([createFilter(activeColumn.key, [false, null])], [activeColumn])).toEqual([2, 3])
  })

  it('combines the filters of several columns', () => {
    const filters = [
      createFilter('fullPath', 'chair'),
      createFilter('type', 'asset')
    ]

    expect(filterItems(filters, [pathColumn, typeColumn])).toEqual([2])
  })

  it('ignores filters of columns that are not filterable', () => {
    const filters = [createFilter('gone', 'chair')]

    expect(createRowMatchers(filters, createContext([pathColumn]))).toHaveLength(0)
  })

  it('ignores filters without a value', () => {
    const filters = [
      createFilter('fullPath', ''),
      createFilter(activeColumn.key, []),
      createFilter('id', { setting: NumberFilterSettingValue.IS, is: null, from: null, to: null }),
      createFilter(createdColumn.key, { setting: DatePickerSettingValue.ON, on: null, from: null, to: null })
    ]

    expect(createRowMatchers(filters, createContext([pathColumn, activeColumn, idColumn, createdColumn]))).toHaveLength(0)
  })
})
