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
  mockGridEndpoint,
  initiatedSubscription,
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

interface GridProps { dataValue: any[] }

const renderGrids = (dataValue: any[]): ReturnType<typeof renderHook<ReturnType<typeof useDataObjectGrids>, GridProps>> =>
  renderHook((props: GridProps) => useDataObjectGrids({
    classIds: ['Car'],
    convertClassName: (name: string) => ({ id: `${name}-class-id` }) as any,
    columns: nameColumns,
    dataValue: props.dataValue
  }), { initialProps: { dataValue } })

describe('useDataObjectGrids values kept per related object', () => {
  beforeEach(() => {
    resetGridMocks()
  })

  // 201 related objects are chunks of 100, 100 and 1; without the first one there are only two chunks.
  it('keeps the values of the last row when removing a row leaves fewer chunks', () => {
    const { result, rerender } = renderGrids(relatedObjects(201, 'Car'))
    resolveAll(() => { rerender({ dataValue: relatedObjects(201, 'Car') }) })
    expect(result.current.data.map(item => item.id)).toEqual(range(1, 201))

    act(() => { rerender({ dataValue: relatedObjects(201, 'Car').slice(1) }) })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data.map(item => item.id)).toEqual(range(2, 201))
    expect(result.current.data[199].columns).toEqual([{ key: 'name', value: 'default-201' }])
    expect(result.current.loadedCount).toBe(200)
    expect(result.current.totalCount).toBe(200)
  })

  it('keeps the values of a chunk while another one completes first', () => {
    const { result, rerender } = renderGrids(relatedObjects(250, 'Car'))
    resolveAll(() => { rerender({ dataValue: relatedObjects(250, 'Car') }) })
    mockInitiate.mockClear()

    act(() => { rerender({ dataValue: relatedObjects(250, 'Car').filter(item => item.id !== 1) }) })
    // The chunks 2-101 and 102-200 run, the last one waits for a free slot. Only the second completes.
    resolve(initiatedSubscription(1))
    act(() => { rerender({ dataValue: relatedObjects(250, 'Car').filter(item => item.id !== 1) }) })

    expect(result.current.data.map(item => item.id)).toEqual(range(2, 250))
    expect(result.current.data[0].columns).toEqual([{ key: 'name', value: 'default-2' }])
    expect(result.current.data[248].columns).toEqual([{ key: 'name', value: 'default-250' }])
    expect(result.current.loadedCount).toBe(249)
  })
})
