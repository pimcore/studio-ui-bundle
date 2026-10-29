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
import { useDataObjectGrids } from './use-data-object-grids'
import { VISIBLE_FIELDS_MAX_PARALLEL } from '../utils/grid-chunks'

interface MockSubscription {
  args: any
  options: any
  unsubscribe: jest.Mock
  refetch: jest.Mock
}

// The query state per serialized request, as the store would hold it.
const mockResults = new Map<string, Record<string, any>>()
const mockSubscriptions: MockSubscription[] = []
const mockTrackError = jest.fn()

const pending = { isUninitialized: false, isLoading: true, isSuccess: false, isError: false, data: undefined }
const uninitialized = { isUninitialized: true, isLoading: false, isSuccess: false, isError: false, data: undefined }

const mockInitiate = jest.fn((args: any, options: any): MockSubscription => {
  const subscription = { args, options, unsubscribe: jest.fn(), refetch: jest.fn() }
  mockSubscriptions.push(subscription)
  mockResults.set(JSON.stringify(args), { ...pending, data: mockResults.get(JSON.stringify(args))?.data })
  return subscription
})

jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => (action: unknown) => action,
  useAppSelector: (selector: (state: unknown) => unknown) => selector({})
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => mockTrackError(error),
  ApiError: class {
    constructor (public errorData: unknown) {}
  }
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  api: {
    endpoints: {
      dataObjectGetGrid: {
        initiate: (args: any, options: any) => mockInitiate(args, options),
        select: (args: any) => () => mockResults.get(JSON.stringify(args)) ?? uninitialized
      }
    }
  }
}))

const relatedObjects = (count: number, subtype: string, firstId: number = 1): any[] =>
  Array.from({ length: count }, (_, index) => ({ id: firstId + index, type: 'object', subtype, fullPath: `/objects/${firstId + index}`, isPublished: true }))

const range = (from: number, to: number): number[] => Array.from({ length: to - from + 1 }, (_, index) => from + index)

const nameColumns = [{ key: 'name', type: 'dataobject.adapter', locale: null, config: [] }] as any

interface GridProps {
  dataValue: any[]
  columns: any
}

// Without new props, a rerender keeps the last ones.
const renderGrids = (dataValue: any[], classIds: string[] = ['Car'], columns: any = nameColumns): Omit<ReturnType<typeof renderHook<ReturnType<typeof useDataObjectGrids>, GridProps>>, 'rerender'> & { rerender: (props?: GridProps) => void } => {
  let currentProps: GridProps = { dataValue, columns }
  const rendered = renderHook((props: GridProps) => useDataObjectGrids({
    classIds,
    convertClassName: (name: string) => ({ id: `${name}-class-id` }) as any,
    columns: props.columns,
    dataValue: props.dataValue
  }), { initialProps: currentProps })

  return { ...rendered, rerender: (props?: GridProps) => { currentProps = props ?? currentProps; rendered.rerender(currentProps) } }
}

const requestedIds = (subscription: MockSubscription): number[] => subscription.args.body.filters.columnFilters[0].filterValue

const initiatedSubscription = (index: number): MockSubscription => mockInitiate.mock.results[index].value as MockSubscription

const resolve = (subscription: MockSubscription): void => {
  const data = { items: requestedIds(subscription).map(id => ({ id, columns: [] })) }
  mockResults.set(JSON.stringify(subscription.args), { isUninitialized: false, isLoading: false, isSuccess: true, isError: false, data })
}

const reject = (subscription: MockSubscription, error: unknown): void => {
  mockResults.set(JSON.stringify(subscription.args), { isUninitialized: false, isLoading: false, isSuccess: false, isError: true, error, data: undefined })
}

// Settles the chunks one by one until every chunk got its data.
const resolveAll = (rerender: () => void): void => {
  for (let index = 0; index < mockSubscriptions.length; index++) {
    resolve(mockSubscriptions[index])
    act(() => { rerender() })
  }
}

describe('useDataObjectGrids', () => {
  beforeEach(() => {
    mockResults.clear()
    mockSubscriptions.length = 0
    mockInitiate.mockClear()
    mockTrackError.mockClear()
  })

  it('requests the related objects in chunks, each one page sized to its ids', () => {
    const { rerender } = renderGrids(relatedObjects(250, 'Car'))
    resolveAll(rerender)

    expect(mockSubscriptions.map(requestedIds)).toEqual([range(1, 100), range(101, 200), range(201, 250)])
    mockSubscriptions.forEach(subscription => {
      expect(subscription.args.classId).toBe('Car-class-id')
      expect(subscription.args.body.filters.page).toBe(1)
      expect(subscription.args.body.filters.pageSize).toBe(requestedIds(subscription).length)
      expect(subscription.args.body.filters.includeDescendants).toBe(true)
      expect(subscription.args.body.columns).toEqual(nameColumns)
      // Mirrors refetchOnMountOrArgChange: a cached grid is refreshed when the field opens.
      expect(subscription.options).toEqual(expect.objectContaining({ forceRefetch: true }))
    })
  })

  it('runs only a limited number of chunk requests at the same time', () => {
    const { rerender } = renderGrids(relatedObjects(450, 'Car'))

    expect(mockInitiate).toHaveBeenCalledTimes(VISIBLE_FIELDS_MAX_PARALLEL)

    act(() => { rerender() })
    expect(mockInitiate).toHaveBeenCalledTimes(VISIBLE_FIELDS_MAX_PARALLEL)

    resolve(mockSubscriptions[0])
    act(() => { rerender() })
    expect(mockInitiate).toHaveBeenCalledTimes(VISIBLE_FIELDS_MAX_PARALLEL + 1)
    expect(requestedIds(mockSubscriptions[VISIBLE_FIELDS_MAX_PARALLEL])).toEqual(range(VISIBLE_FIELDS_MAX_PARALLEL * 100 + 1, VISIBLE_FIELDS_MAX_PARALLEL * 100 + 100))
  })

  it('returns the rows of the first chunk while the others are still loading', () => {
    const { result, rerender } = renderGrids(relatedObjects(250, 'Car'))

    expect(result.current.isLoading).toBe(true)
    expect(result.current.loadedCount).toBe(0)
    expect(result.current.totalCount).toBe(250)

    resolve(mockSubscriptions[0])
    act(() => { rerender() })

    expect(result.current.data).toHaveLength(100)
    expect(result.current.data.map(item => item.id)).toEqual(range(1, 100))
    expect(result.current.loadedCount).toBe(100)
    expect(result.current.totalCount).toBe(250)
    expect(result.current.isLoading).toBe(true)
  })

  it('is not loading once every chunk has its data', () => {
    const { result, rerender } = renderGrids(relatedObjects(250, 'Car'))
    resolveAll(rerender)

    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.loadedCount).toBe(250)
    expect(result.current.totalCount).toBe(250)
    expect(result.current.data.map(item => item.id)).toEqual(range(1, 250))
    expect(mockTrackError).not.toHaveBeenCalled()
  })

  // Saving any data object invalidates the grids; the relation field must keep its rows while they refetch.
  it('is not loading while refetching data it already has', () => {
    const { result, rerender } = renderGrids(relatedObjects(1, 'Car'))
    resolveAll(rerender)

    mockResults.set(JSON.stringify(mockSubscriptions[0].args), { ...pending, data: { items: [{ id: 1, columns: [] }] } })
    act(() => { rerender() })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toEqual([{ id: 1, columns: [] }])
  })

  it('requests nothing without visible columns', () => {
    const { result } = renderGrids(relatedObjects(250, 'Car'), ['Car'], [])

    expect(mockInitiate).not.toHaveBeenCalled()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.totalCount).toBe(0)
  })

  it('reports a failed chunk and keeps the rows of the others', () => {
    const error = { status: 500, data: { message: 'failed' } }
    const { result, rerender } = renderGrids(relatedObjects(250, 'Car'))

    reject(mockSubscriptions[0], error)
    act(() => { rerender() })
    resolve(mockSubscriptions[1])
    act(() => { rerender() })
    resolve(mockSubscriptions[2])
    act(() => { rerender() })
    act(() => { rerender() })

    expect(result.current.isError).toBe(true)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.data.map(item => item.id)).toEqual(range(101, 250))
    expect(mockTrackError).toHaveBeenCalledTimes(1)
    expect(mockTrackError.mock.calls[0][0].errorData).toBe(error)
  })

  // Every chunk has its own request; a later failure of another chunk must be tracked as well.
  it('tracks the failures of several chunks once each', () => {
    const carError = { status: 500, data: { message: 'car failed' } }
    const bikeError = { status: 500, data: { message: 'bike failed' } }
    const { rerender } = renderGrids([...relatedObjects(1, 'Car'), ...relatedObjects(1, 'Bike', 100)], ['Car', 'Bike'])

    reject(mockSubscriptions[0], carError)
    act(() => { rerender() })
    reject(mockSubscriptions[1], bikeError)
    act(() => { rerender() })
    act(() => { rerender() })

    expect(mockTrackError.mock.calls.map(call => call[0].errorData)).toEqual([carError, bikeError])
  })

  it('requests only the last chunk again when a related object is appended', () => {
    const { rerender } = renderGrids(relatedObjects(250, 'Car'))
    resolveAll(rerender)
    const [first, second, last] = mockSubscriptions
    mockInitiate.mockClear()

    act(() => { rerender({ dataValue: relatedObjects(251, 'Car'), columns: nameColumns }) })

    expect(mockInitiate).toHaveBeenCalledTimes(1)
    expect(requestedIds(initiatedSubscription(0))).toEqual(range(201, 251))
    expect(first.unsubscribe).not.toHaveBeenCalled()
    expect(second.unsubscribe).not.toHaveBeenCalled()
    expect(last.unsubscribe).toHaveBeenCalledTimes(1)
  })

  // The chunks after a removed row hold other ids now; their old values must not be shown for them.
  it('requests the chunks after a removed related object again with the shifted ids', () => {
    const { result, rerender } = renderGrids(relatedObjects(250, 'Car'))
    resolveAll(rerender)
    const [first, second, last] = mockSubscriptions
    mockInitiate.mockClear()

    const value = relatedObjects(250, 'Car').filter(item => item.id !== 150)
    act(() => { rerender({ dataValue: value, columns: nameColumns }) })

    expect(mockInitiate.mock.results.map((_, index) => requestedIds(initiatedSubscription(index)))).toEqual([
      [...range(101, 149), ...range(151, 201)],
      range(202, 250)
    ])
    expect(first.unsubscribe).not.toHaveBeenCalled()
    expect(second.unsubscribe).toHaveBeenCalledTimes(1)
    expect(last.unsubscribe).toHaveBeenCalledTimes(1)
    expect(result.current.data.map(item => item.id)).toEqual(range(1, 100))

    resolve(initiatedSubscription(0))
    act(() => { rerender({ dataValue: value, columns: nameColumns }) })

    expect(result.current.data.map(item => item.id)).toEqual([...range(1, 149), ...range(151, 201)])
  })

  it('unsubscribes every chunk on unmount', () => {
    const { rerender, unmount } = renderGrids(relatedObjects(250, 'Car'))
    resolveAll(rerender)

    unmount()

    expect(mockSubscriptions).toHaveLength(3)
    mockSubscriptions.forEach(subscription => { expect(subscription.unsubscribe).toHaveBeenCalledTimes(1) })
  })

  // A language switch changes the columns and with them every request.
  it('unsubscribes every chunk when the columns change', () => {
    const { rerender } = renderGrids(relatedObjects(250, 'Car'))
    resolveAll(rerender)
    const previous = [...mockSubscriptions]

    act(() => { rerender({ dataValue: relatedObjects(250, 'Car'), columns: [{ ...nameColumns[0], locale: 'de' }] }) })

    previous.forEach(subscription => { expect(subscription.unsubscribe).toHaveBeenCalledTimes(1) })
    expect(mockSubscriptions.slice(previous.length).map(subscription => subscription.args.body.columns[0].locale)).toEqual(['de', 'de'])
  })

  it('refetches every requested chunk', () => {
    const { result, rerender } = renderGrids(relatedObjects(250, 'Car'))
    resolveAll(rerender)

    act(() => { result.current.refetchAll() })

    expect(mockSubscriptions).toHaveLength(3)
    mockSubscriptions.forEach(subscription => { expect(subscription.refetch).toHaveBeenCalledTimes(1) })
  })
})
