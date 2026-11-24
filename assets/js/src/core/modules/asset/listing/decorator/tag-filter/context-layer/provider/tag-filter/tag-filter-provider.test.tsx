/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { act, renderHook } from '@testing-library/react'
import { TagFilterProvider } from './tag-filter-provider'
import { useTagFilter } from './use-tag-filter'

const renderTagFilter = (): ReturnType<typeof renderHook<ReturnType<typeof useTagFilter>, unknown>> =>
  renderHook(() => useTagFilter(), {
    wrapper: ({ children }) => <TagFilterProvider showOnlyUntaggedFilter>{children}</TagFilterProvider>
  })

describe('TagFilterProvider', () => {
  it('has no filter while no tag is selected', () => {
    const { result } = renderTagFilter()

    expect(result.current.getDataQueryArg()).toBeUndefined()
  })

  it('filters by the selected tags', () => {
    const { result } = renderTagFilter()

    act(() => { result.current.setTags([3, 5]) })

    expect(result.current.getDataQueryArg()).toEqual({
      type: 'system.tag',
      filterValue: { considerChildTags: true, tags: [3, 5] }
    })
  })

  it('filters by an empty tags field instead of the selected tags while "only untagged" is ticked', () => {
    const { result } = renderTagFilter()

    act(() => {
      result.current.setTags([3])
      result.current.setOnlyUntagged(true)
    })

    expect(result.current.getDataQueryArg()).toEqual({
      key: 'system_fields.tags',
      type: 'system.tag',
      operator: 'empty',
      filterValue: null
    })
  })
})
