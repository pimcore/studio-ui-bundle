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
import {
  type MockSubscription,
  mockGridEndpoint,
  mockInitiate,
  mockSubscriptions,
  nameColumns,
  range,
  relatedObjects,
  requestedIds,
  resetGridMocks,
  resolve,
  resolveAll
} from './use-data-object-grids.test-utils'
import { useDataObjectGrids } from './use-data-object-grids'
import { VISIBLE_FIELDS_MAX_PARALLEL } from '../utils/grid-chunks'

jest.mock('../utils/grid-chunks', () => ({ ...jest.requireActual('../utils/grid-chunks'), VISIBLE_FIELDS_CHUNK_SIZE: 100, VISIBLE_FIELDS_FIRST_CHUNK_SIZE: 100, VISIBLE_FIELDS_MAX_PARALLEL: 2 }))
jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => (action: unknown) => action,
  useAppSelector: (selector: (state: unknown) => unknown) => selector({})
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class { constructor (public errorData: unknown) {} }
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  api: { endpoints: { get dataObjectGetGrid () { return mockGridEndpoint } } }
}))

const renderGrids = (dataValue: any[]): ReturnType<typeof renderHook<ReturnType<typeof useDataObjectGrids>, unknown>> =>
  renderHook(() => useDataObjectGrids({
    classIds: ['Car'],
    convertClassName: (name: string) => ({ id: `${name}-class-id` }) as any,
    columns: nameColumns,
    dataValue
  }))

describe('useDataObjectGrids refetchAll', () => {
  beforeEach(() => {
    resetGridMocks()
  })

  it('requests the chunks again through the queue, first rows first', () => {
    const { result, rerender } = renderGrids(relatedObjects(450, 'Car'))
    resolveAll(rerender)
    expect(mockInitiate).toHaveBeenCalledTimes(5)

    act(() => { result.current.refetchAll() })

    // Only the allowed number of requests is in flight, not one per chunk.
    expect(mockInitiate).toHaveBeenCalledTimes(5 + VISIBLE_FIELDS_MAX_PARALLEL)
    expect(mockSubscriptions.slice(5).map(requestedIds)).toEqual([range(1, 100), range(101, 200)])

    // The next chunk starts when one settles.
    resolve(mockSubscriptions[5])
    act(() => { rerender() })
    expect(mockInitiate).toHaveBeenCalledTimes(5 + VISIBLE_FIELDS_MAX_PARALLEL + 1)
    expect(requestedIds(mockSubscriptions[7])).toEqual(range(201, 300))

    mockSubscriptions.slice(6, 8).forEach(subscription => { resolve(subscription) })
    act(() => { rerender() })
    resolve(mockSubscriptions[8])
    act(() => { rerender() })
    expect(mockSubscriptions.slice(5).map(requestedIds)).toEqual([range(1, 100), range(101, 200), range(201, 300), range(301, 400), range(401, 450)])
  })

  it('keeps the values visible while the chunks load again', () => {
    const { result, rerender } = renderGrids(relatedObjects(450, 'Car'))
    resolveAll(rerender)

    act(() => { result.current.refetchAll() })

    expect(result.current.data.map(item => item.id)).toEqual(range(1, 450))
    expect(result.current.isLoading).toBe(false)
  })

  // The pending state of a fast request is never rendered, the cached data is fulfilled before and after it.
  it('keeps requesting the next chunks when the first wave settles before its pending state is rendered', () => {
    const { result, rerender } = renderGrids(relatedObjects(450, 'Car'))
    resolveAll(rerender)
    const initiate = mockInitiate.getMockImplementation()
    mockInitiate.mockImplementation((args: any, options: any) => {
      const subscription = initiate!(args, options)
      resolve(subscription)
      return subscription
    })

    act(() => { result.current.refetchAll() })
    expect(mockSubscriptions.slice(5).map(requestedIds)).toEqual([range(1, 100), range(101, 200)])

    act(() => { rerender() })
    expect(mockSubscriptions.slice(7, 9).map(requestedIds)).toEqual([range(201, 300), range(301, 400)])
  })
})
