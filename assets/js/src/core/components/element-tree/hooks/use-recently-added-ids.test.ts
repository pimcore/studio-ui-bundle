/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { recentlyAddedHighlightDuration, useRecentlyAddedIds } from './use-recently-added-ids'

interface Props {
  ids: string[]
  isLoading?: boolean
  listKey?: string
}

const renderList = (initialProps: Props): ReturnType<typeof renderHook<Set<string>, Props>> =>
  renderHook(
    ({ ids, isLoading = false, listKey = '1|' }: Props) => useRecentlyAddedIds(ids, { isLoading, listKey }),
    { initialProps }
  )

describe('useRecentlyAddedIds', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('highlights nothing when a list is loaded for the first time', () => {
    const { result } = renderList({ ids: ['1', '2'] })

    expect(result.current.size).toBe(0)
  })

  it('highlights children that were added to a loaded list for a short moment', () => {
    const { result, rerender } = renderList({ ids: ['1', '2'] })

    rerender({ ids: ['1', '2'], isLoading: true })
    rerender({ ids: ['1', '2', '3'] })

    expect([...result.current]).toEqual(['3'])

    act(() => { jest.advanceTimersByTime(recentlyAddedHighlightDuration) })

    expect(result.current.size).toBe(0)
  })

  it('highlights nothing when paging or searching replaces the children', () => {
    const { result, rerender } = renderList({ ids: ['1', '2'] })

    rerender({ ids: ['3', '4'], listKey: '2|' })

    expect(result.current.size).toBe(0)
  })

  it('treats many new children at once as a reload', () => {
    const { result, rerender } = renderList({ ids: ['1'] })

    rerender({ ids: ['1', ...Array.from({ length: 11 }, (_, index) => `new-${index}`)] })

    expect(result.current.size).toBe(0)
  })

  it('clears an active highlight when paging or searching', () => {
    const { result, rerender } = renderList({ ids: ['1', '2'] })

    rerender({ ids: ['1', '2', '3'] })
    expect([...result.current]).toEqual(['3'])

    rerender({ ids: ['1', '2', '3'], listKey: '1|search' })

    expect(result.current.size).toBe(0)
  })

  it('highlights nothing when the results of a page arrive after the page changed', () => {
    const { result, rerender } = renderList({ ids: ['1', '2'] })

    // the page changes before its children are fetched, then the new children arrive
    rerender({ ids: ['1', '2'], listKey: '2|' })
    rerender({ ids: ['3', '4'], listKey: '2|' })

    expect(result.current.size).toBe(0)

    // from then on additions to that page are highlighted again
    rerender({ ids: ['3', '4', '5'], listKey: '2|' })

    expect([...result.current]).toEqual(['5'])
  })
})
