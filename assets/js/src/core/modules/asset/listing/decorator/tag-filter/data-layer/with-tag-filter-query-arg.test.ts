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

let tagFilterState: { tags: number[], onlyUntagged: boolean } = { tags: [], onlyUntagged: false }

jest.mock('../context-layer/provider/tag-filter/use-tag-filter', () => ({
  useTagFilter: () => ({
    ...tagFilterState,
    getDataQueryArg: () => tagFilterState.tags.length > 0
      ? { type: 'system.tag', filterValue: { considerChildTags: true, tags: tagFilterState.tags } }
      : undefined
  })
}))

const columnFiltersFor = (baseColumnFilters: ColumnFilter[]): ColumnFilter[] => {
  const useBaseHook = (() => ({
    getArgs: () => ({ body: { folderId: 1, filters: { page: 1, columnFilters: baseColumnFilters } } })
  })) as unknown as AbstractDecoratorProps['useDataQueryHelper']

  const { result } = renderHook(() => withTagFilterQueryArg(useBaseHook)())

  return result.current.getArgs().body.filters.columnFilters
}

describe('withTagFilterQueryArg', () => {
  it('sends the selected tags as the tag filter while "only untagged" is not ticked', () => {
    tagFilterState = { tags: [3], onlyUntagged: false }

    expect(columnFiltersFor([])).toEqual([
      { type: 'system.tag', filterValue: { considerChildTags: true, tags: [3] } }
    ])
  })

  it('sends no tag filter while no tag is selected and "only untagged" is not ticked', () => {
    tagFilterState = { tags: [], onlyUntagged: false }

    expect(columnFiltersFor([])).toEqual([])
  })

  it('sends the untagged PQL condition instead of the tag filter while "only untagged" is ticked', () => {
    tagFilterState = { tags: [3], onlyUntagged: true }

    expect(columnFiltersFor([{ type: 'system.tag', filterValue: { considerChildTags: true, tags: [3] } }])).toEqual([
      { type: 'system.pql', filterValue: 'system_fields.tags = NULL' }
    ])
  })

  it('ANDs the untagged condition with a PQL filter that is already in the query', () => {
    tagFilterState = { tags: [], onlyUntagged: true }

    expect(columnFiltersFor([{ type: 'system.pql', filterValue: 'color = "red"' }])).toEqual([
      { type: 'system.pql', filterValue: '(color = "red") AND (system_fields.tags = NULL)' }
    ])
  })
})
