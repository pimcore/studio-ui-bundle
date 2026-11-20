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
import { useRelationVisibleFieldValues } from './use-relation-visible-field-values'

interface MockSubscription {
  args: any
  options: any
  unsubscribe: jest.Mock
}

const mockResults = new Map<string, Record<string, any>>()
const mockSubscriptions: MockSubscription[] = []
const mockTrackError = jest.fn()
let mockRequestCounter = 0

const mockPending = { isUninitialized: false, isLoading: true, isSuccess: false, isError: false, data: undefined }
const mockUninitialized = { isUninitialized: true, isLoading: false, isSuccess: false, isError: false, data: undefined }

const mockValuesEndpoint = {
  initiate: (args: any, options: any): MockSubscription => {
    const subscription = { args, options, unsubscribe: jest.fn() }
    mockSubscriptions.push(subscription)
    mockResults.set(JSON.stringify(args), { ...mockPending, data: mockResults.get(JSON.stringify(args))?.data })
    return subscription
  },
  select: (args: any) => () => mockResults.get(JSON.stringify(args)) ?? mockUninitialized
}

jest.mock('../../many-to-many-object-relation/utils/grid-chunks', () => ({
  ...jest.requireActual('../../many-to-many-object-relation/utils/grid-chunks'),
  VISIBLE_FIELDS_CHUNK_SIZE: 3,
  VISIBLE_FIELDS_FIRST_CHUNK_SIZE: 2,
  VISIBLE_FIELDS_MAX_PARALLEL: 2
}))

jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => (action: unknown) => action,
  useAppSelector: (selector: (state: unknown) => unknown) => selector({})
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => mockTrackError(error),
  ApiError: class { constructor (public errorData: unknown) {} }
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  api: { endpoints: { get dataObjectGetVisibleFieldValuesForRelation () { return mockValuesEndpoint } } }
}))

const row = (type: string, id: number): any => ({ id, type, subtype: null, fullPath: `/${type}/${id}`, isPublished: true })

const requestedElements = (subscription: MockSubscription): Array<{ type: string, id: number }> =>
  subscription.args.relationVisibleFieldValuesRequest.elements

// The value of each element tells which language it was loaded in.
const resolve = (subscription: MockSubscription): void => {
  const { locale, elements } = subscription.args.relationVisibleFieldValuesRequest
  const data = {
    items: elements.map(({ type, id }: { type: string, id: number }) => ({
      type,
      id,
      columns: [{ key: 'title', locale, value: `${locale}-${type}-${id}` }]
    }))
  }
  mockResults.set(JSON.stringify(subscription.args), { isUninitialized: false, isLoading: false, isSuccess: true, isError: false, requestId: `request-${++mockRequestCounter}`, data })
}

interface Props {
  dataValue: any[]
  locale: string | null
  enabled: boolean
}

const renderValues = (initialProps: Props): ReturnType<typeof renderHook<ReturnType<typeof useRelationVisibleFieldValues>, Props>> =>
  renderHook((props: Props) => useRelationVisibleFieldValues({
    enabled: props.enabled,
    classId: 'CAR',
    relationField: 'related',
    locale: props.locale,
    dataValue: props.dataValue
  }), { initialProps })

describe('useRelationVisibleFieldValues', () => {
  beforeEach(() => {
    mockResults.clear()
    mockSubscriptions.length = 0
    mockTrackError.mockClear()
  })

  it('requests the rows of every element type in pages, a few at the same time', () => {
    const dataValue = [row('asset', 1), row('object', 1), row('document', 2), row('asset', 3), row('object', 4), row('asset', 5)]
    const props = { dataValue, locale: 'en', enabled: true }
    const { result, rerender } = renderValues(props)

    expect(mockSubscriptions.map(requestedElements)).toEqual([
      [{ type: 'asset', id: 1 }, { type: 'object', id: 1 }],
      [{ type: 'document', id: 2 }, { type: 'asset', id: 3 }, { type: 'object', id: 4 }]
    ])
    expect(mockSubscriptions[0].args.relationVisibleFieldValuesRequest).toEqual(expect.objectContaining({ classId: 'CAR', relationField: 'related', locale: 'en' }))
    expect(mockSubscriptions[0].options).toEqual(expect.objectContaining({ forceRefetch: true }))
    expect(result.current.isLoading).toBe(true)
    expect(result.current.totalCount).toBe(6)

    resolve(mockSubscriptions[0])
    act(() => { rerender(props) })

    expect(mockSubscriptions.map(requestedElements)[2]).toEqual([{ type: 'asset', id: 5 }])
    expect(result.current.loadedCount).toBe(2)
    expect(result.current.valuesByElement.get('asset:1')?.[0].value).toBe('en-asset-1')
    expect(result.current.valuesByElement.get('object:1')?.[0].value).toBe('en-object-1')

    resolve(mockSubscriptions[1])
    resolve(mockSubscriptions[2])
    act(() => { rerender(props) })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.loadedCount).toBe(6)
    expect(result.current.valuesByElement.size).toBe(6)
  })

  it('requests nothing while disabled', () => {
    const { result } = renderValues({ dataValue: [row('asset', 1)], locale: 'en', enabled: false })

    expect(mockSubscriptions).toHaveLength(0)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.valuesByElement.size).toBe(0)
  })

  it('keeps the values of the rows while a page boundary moves, but not across languages', () => {
    const props = { dataValue: [row('asset', 1), row('object', 2)], locale: 'en', enabled: true }
    const { result, rerender } = renderValues(props)
    resolve(mockSubscriptions[0])
    act(() => { rerender(props) })

    // a row prepended: the first page now holds other elements, the loaded ones keep their values meanwhile
    const prepended = { ...props, dataValue: [row('document', 9), ...props.dataValue] }
    act(() => { rerender(prepended) })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.valuesByElement.get('asset:1')?.[0].value).toBe('en-asset-1')

    act(() => { rerender({ ...prepended, locale: 'de' }) })

    expect(result.current.valuesByElement.size).toBe(0)
  })

  it('tells about a failed page once', () => {
    const props = { dataValue: [row('asset', 1)], locale: 'en', enabled: true }
    const { result, rerender } = renderValues(props)
    const error = { status: 500 }
    mockResults.set(JSON.stringify(mockSubscriptions[0].args), { isUninitialized: false, isLoading: false, isSuccess: false, isError: true, error, data: undefined })
    act(() => { rerender(props) })
    act(() => { rerender(props) })

    expect(result.current.isError).toBe(true)
    expect(mockTrackError).toHaveBeenCalledTimes(1)
  })
})
