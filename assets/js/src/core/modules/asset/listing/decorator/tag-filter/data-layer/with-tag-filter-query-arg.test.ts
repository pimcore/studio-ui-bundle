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
import { withTagFilterQueryArg } from './with-tag-filter-query-arg'

let dataQueryArg: ColumnFilter | undefined

jest.mock('../context-layer/provider/tag-filter/use-tag-filter', () => ({
  useTagFilter: () => ({ getDataQueryArg: () => dataQueryArg })
}))

const tagFilter = { type: 'system.tag', filterValue: { considerChildTags: true, tags: [3] } }
const untaggedFilter: ColumnFilter = { type: 'system.tag', operator: 'empty', filterValue: null }

const columnFiltersFor = (baseColumnFilters: ColumnFilter[]): ColumnFilter[] => {
  const useBaseHook = (() => ({
    getArgs: () => ({ body: { folderId: 1, filters: { page: 1, columnFilters: baseColumnFilters } } })
  })) as unknown as AbstractDecoratorProps['useDataQueryHelper']

  const { result } = renderHook(() => withTagFilterQueryArg(useBaseHook)())

  return result.current.getArgs().body.filters.columnFilters
}

describe('withTagFilterQueryArg', () => {
  it('sends the tag filter of the provider', () => {
    dataQueryArg = tagFilter

    expect(columnFiltersFor([])).toEqual([tagFilter])
  })

  it('sends no tag filter while the provider has none', () => {
    dataQueryArg = undefined

    expect(columnFiltersFor([tagFilter])).toEqual([])
  })

  it('replaces a tag filter already in the query with the untagged filter and leaves the PQL filter as it is', () => {
    dataQueryArg = untaggedFilter
    const pqlFilter = { type: 'system.pql', filterValue: 'color = "red"' }

    expect(columnFiltersFor([pqlFilter, tagFilter])).toEqual([pqlFilter, untaggedFilter])
  })
})
