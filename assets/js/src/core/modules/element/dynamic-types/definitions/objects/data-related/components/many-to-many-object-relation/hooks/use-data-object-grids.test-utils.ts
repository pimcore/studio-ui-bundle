/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act } from '@testing-library/react'

export interface MockSubscription {
  args: any
  options: any
  unsubscribe: jest.Mock
  refetch: jest.Mock
}

// The query state per serialized request, as the store would hold it.
export const mockResults = new Map<string, Record<string, any>>()
export const mockSubscriptions: MockSubscription[] = []

// Every settled request has its own id, as RTK Query gives it.
let requestCounter = 0

export const pending = { isUninitialized: false, isLoading: true, isSuccess: false, isError: false, data: undefined }
const uninitialized = { isUninitialized: true, isLoading: false, isSuccess: false, isError: false, data: undefined }

export const mockInitiate = jest.fn((args: any, options: any): MockSubscription => {
  const subscription = { args, options, unsubscribe: jest.fn(), refetch: jest.fn() }
  mockSubscriptions.push(subscription)
  mockResults.set(JSON.stringify(args), { ...pending, data: mockResults.get(JSON.stringify(args))?.data })
  return subscription
})

// Stands in for api.endpoints.dataObjectGetGrid of data-object-api-slice.gen.
export const mockGridEndpoint = {
  initiate: (args: any, options: any) => mockInitiate(args, options),
  select: (args: any) => () => mockResults.get(JSON.stringify(args)) ?? uninitialized
}

export const resetGridMocks = (): void => {
  mockResults.clear()
  mockSubscriptions.length = 0
  mockInitiate.mockClear()
}

export const relatedObjects = (count: number, subtype: string, firstId: number = 1): any[] =>
  Array.from({ length: count }, (_, index) => ({ id: firstId + index, type: 'object', subtype, fullPath: `/objects/${firstId + index}`, isPublished: true }))

export const range = (from: number, to: number): number[] => Array.from({ length: to - from + 1 }, (_, index) => from + index)

export const nameColumns = [{ key: 'name', type: 'dataobject.adapter', locale: null, config: [] }] as any

export const requestedIds = (subscription: MockSubscription): number[] => subscription.args.body.filters.columnFilters[0].filterValue

export const initiatedSubscription = (index: number): MockSubscription => mockInitiate.mock.results[index].value as MockSubscription

// The value of each row tells which locale it was loaded in.
export const resolve = (subscription: MockSubscription): void => {
  const locale = subscription.args.body.columns[0]?.locale ?? 'default'
  const data = { items: requestedIds(subscription).map(id => ({ id, columns: [{ key: 'name', value: `${locale}-${id}` }] })) }
  mockResults.set(JSON.stringify(subscription.args), { isUninitialized: false, isLoading: false, isSuccess: true, isError: false, requestId: `request-${++requestCounter}`, data })
}

export const reject = (subscription: MockSubscription, error: unknown): void => {
  mockResults.set(JSON.stringify(subscription.args), { isUninitialized: false, isLoading: false, isSuccess: false, isError: true, error, data: undefined })
}

// Settles the chunks one by one until every chunk got its data.
export const resolveAll = (rerender: () => void): void => {
  for (let index = 0; index < mockSubscriptions.length; index++) {
    resolve(mockSubscriptions[index])
    act(() => { rerender() })
  }
}
