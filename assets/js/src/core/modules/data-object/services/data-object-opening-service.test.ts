/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// A real RTK Query api and store: the bug lives in RTK's delayed tag invalidation.
interface Deferred { promise: Promise<void>, resolve: () => void }

const mockDeferred = (): Deferred => {
  let resolve: () => void = () => {}
  const promise = new Promise<void>((_resolve) => { resolve = _resolve })

  return { promise, resolve }
}

const mockGates = { element: mockDeferred(), other: mockDeferred() }

jest.mock('../data-object-api-slice-enhanced', () => {
  const { createApi, fakeBaseQuery } = jest.requireActual('@reduxjs/toolkit/query')

  return {
    api: createApi({
      baseQuery: fakeBaseQuery(),
      tagTypes: ['DATA_OBJECT_DETAIL'],
      endpoints: (build) => ({
        dataObjectGetById: build.query({
          queryFn: async ({ id }: { id: number }) => {
            await mockGates.element.promise

            return { data: { id, key: 'car', permissions: { view: true } } }
          },
          providesTags: (result, error, { id }: { id: number }) => [{ type: 'DATA_OBJECT_DETAIL', id }]
        }),
        otherRequest: build.query({
          queryFn: async () => {
            await mockGates.other.promise

            return { data: true }
          }
        })
      })
    })
  }
})

jest.mock('@Pimcore/app/store', () => {
  const { configureStore } = jest.requireActual('@reduxjs/toolkit')
  const { api } = jest.requireMock('../data-object-api-slice-enhanced')

  return {
    store: configureStore({
      reducer: { [api.reducerPath]: api.reducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
    })
  }
})

jest.mock('@Pimcore/app/api/pimcore/tags', () => ({
  invalidatingTags: { DATA_OBJECT_DETAIL_ID: (id: number) => [{ type: 'DATA_OBJECT_DETAIL', id }] }
}))

jest.mock('@Pimcore/modules/element/permissions/permission-helper', () => ({
  checkElementPermission: () => true
}))

jest.mock('@Pimcore/modules/element/element-helper', () => ({
  getElementIcon: () => ({ type: 'name', value: 'data-object' }),
  getElementKey: () => 'car'
}))

jest.mock('@Pimcore/modules/widget-manager/widget-manager-slice', () => ({
  openMainWidget: (payload: unknown) => ({ type: 'widget-manager/openMainWidget', payload }),
  setActiveWidgetById: (payload: unknown) => ({ type: 'widget-manager/setActiveWidgetById', payload })
}))

jest.mock('../data-object-draft-slice', () => ({
  dataObjectReceived: (payload: unknown) => ({ type: 'data-object-draft/dataObjectReceived', payload })
}))

jest.mock('@Pimcore/modules/element/draft/hooks/use-tabs', () => ({
  initialTabsStateValue: {}
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: jest.fn()
}))

// eslint-disable-next-line import/first
import { store } from '@Pimcore/app/store'
// eslint-disable-next-line import/first
import { api } from '../data-object-api-slice-enhanced'
// eslint-disable-next-line import/first
import { dataObjectOpeningService } from './data-object-opening-service'

describe('DataObjectOpeningService', () => {
  it('opens the editor when the element request ends after other running requests', async () => {
    const dispatch = jest.spyOn(store, 'dispatch')

    // any request in flight, e.g. the class definitions the focus view loads on start
    const other = store.dispatch((api as any).endpoints.otherRequest.initiate(undefined))

    const opening = dataObjectOpeningService.openDataObject({ id: 1 })

    mockGates.other.resolve()
    await other
    mockGates.element.resolve()
    await opening

    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'widget-manager/openMainWidget',
      payload: expect.objectContaining({ id: 'data-object-1', component: 'data-object-editor' })
    }))
  })
})
