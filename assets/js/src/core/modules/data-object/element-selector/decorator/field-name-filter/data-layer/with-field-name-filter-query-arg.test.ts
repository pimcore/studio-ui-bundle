/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { useElementSelectorHelper } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper'
import { fieldNameFilterType, withFieldNameFilterQueryArg } from './with-field-name-filter-query-arg'

jest.mock('@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector-helper', () => ({
  useElementSelectorHelper: jest.fn()
}))

const mockedUseElementSelectorHelper = useElementSelectorHelper as jest.MockedFunction<typeof useElementSelectorHelper>

const tagFilter = { type: 'system.tag', key: 'system.tag', filterValue: { tags: [1], considerChildTags: false } }

const getColumnFilters = (fieldName: string | undefined, columnFilters?: ColumnFilter[]): ColumnFilter[] | undefined => {
  mockedUseElementSelectorHelper.mockReturnValue({
    config: { config: { objects: { fieldName } } }
  } as unknown as ReturnType<typeof useElementSelectorHelper>)

  const useBaseHook = (() => ({
    getArgs: () => ({ body: { filters: { columnFilters } } })
  })) as unknown as AbstractDecoratorProps['useDataQueryHelper']

  const { result } = renderHook(withFieldNameFilterQueryArg(useBaseHook))

  return result.current.getArgs().body.filters.columnFilters
}

describe('withFieldNameFilterQueryArg', () => {
  it('adds the field name filter when the selector has a field name', () => {
    expect(getColumnFilters('content.NewsCars.relatedCars', [tagFilter])).toEqual([
      tagFilter,
      { type: fieldNameFilterType, key: fieldNameFilterType, filterValue: 'content.NewsCars.relatedCars' }
    ])
  })

  it('leaves the field name filter out when the field name is empty', () => {
    expect(getColumnFilters(undefined, [tagFilter])).toEqual([tagFilter])
    expect(getColumnFilters('', [tagFilter])).toEqual([tagFilter])
  })

  it('does not duplicate a field name filter that is already in the column filters', () => {
    const existing = { type: fieldNameFilterType, key: fieldNameFilterType, filterValue: 'relatedCars' }

    expect(getColumnFilters('relatedCars', [existing, tagFilter])).toEqual([
      tagFilter,
      { type: fieldNameFilterType, key: fieldNameFilterType, filterValue: 'relatedCars' }
    ])
  })
})
