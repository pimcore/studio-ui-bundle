/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { configureStore } from '@reduxjs/toolkit'
import { waitFor } from '@testing-library/react'
import { api as classDefinitionApi } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { api } from './data-object-api-slice-enhanced'

const PARENT_ID = 5
const TARGET_PARENT_ID = 7
const GRID_URL = '/pimcore-studio/api/data-objects/grid/Product'
const AVAILABLE_COLUMNS_URL = '/pimcore-studio/api/data-object/grid/available-columns'

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const getUrl = (input: RequestInfo | URL): string => input instanceof Request ? input.url : input.toString()

describe('data object api cache invalidation', () => {
  const originalFetch = globalThis.fetch
  let fetchMock: jest.Mock

  const gridFolderIds = new Map<Request, number>()

  beforeEach(() => {
    gridFolderIds.clear()
    fetchMock = jest.fn(async (input: Request) => {
      // A single-element patch is applied synchronously and answered with an empty response.
      if (input.method === 'PATCH') {
        return new Response(null, { status: 200 })
      }

      if (input.url.endsWith(GRID_URL)) {
        gridFolderIds.set(input, JSON.parse(await input.clone().text()).folderId as number)
      }

      return new Response(JSON.stringify({ items: [], totalItems: 0, id: 99, jobRunId: 1 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    })
    globalThis.fetch = fetchMock as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  const countGridRequests = (folderId: number): number => fetchMock.mock.calls.filter(([input]) => {
    const request = input as Request
    return getUrl(request).endsWith(GRID_URL) && gridFolderIds.get(request) === folderId
  }).length

  const subscribeToGrid = async (store: ReturnType<typeof createStore>, folderId: number): Promise<void> => {
    await store.dispatch(api.endpoints.dataObjectGetGrid.initiate({ classId: 'Product', body: { folderId } }) as any)
    expect(countGridRequests(folderId)).toBe(1)
  }

  const countAvailableColumnsRequests = (classId: string): number => fetchMock.mock.calls.filter(([input]) => {
    const url = getUrl(input as Request)
    return url.includes(AVAILABLE_COLUMNS_URL) && url.includes(`classId=${classId}`)
  }).length

  const subscribeToAvailableColumns = async (store: ReturnType<typeof createStore>, classId: string): Promise<void> => {
    await store.dispatch(api.endpoints.dataObjectGetAvailableGridColumns.initiate({ classId, folderId: PARENT_ID }) as any)
    expect(countAvailableColumnsRequests(classId)).toBe(1)
  }

  const flushRefetches = async (): Promise<void> => { await new Promise((resolve) => setTimeout(resolve, 50)) }

  it('refetches the parent children grid after a data object is added', async () => {
    const store = createStore()
    await subscribeToGrid(store, PARENT_ID)

    await store.dispatch(api.endpoints.dataObjectAdd.initiate({
      parentId: PARENT_ID,
      dataObjectAddParameters: { key: 'new-child', classId: 'Product', type: 'object' }
    }) as any)

    await waitFor(() => { expect(countGridRequests(PARENT_ID)).toBe(2) })
  })

  it('refetches the old and the new parent children grid after a data object is moved', async () => {
    const store = createStore()
    await subscribeToGrid(store, PARENT_ID)
    await subscribeToGrid(store, TARGET_PARENT_ID)

    await store.dispatch(api.endpoints.dataObjectPatchById.initiate({ body: { data: [{ id: 12, parentId: TARGET_PARENT_ID }] } }) as any)

    await waitFor(() => {
      expect(countGridRequests(PARENT_ID)).toBe(2)
      expect(countGridRequests(TARGET_PARENT_ID)).toBe(2)
    })
  })

  it('does not refetch children grids while a multi-element move still runs as a job', async () => {
    const store = createStore()
    await subscribeToGrid(store, PARENT_ID)
    fetchMock.mockImplementationOnce(async () => new Response(JSON.stringify({ jobRunId: 1 }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    }))

    await store.dispatch(api.endpoints.dataObjectPatchById.initiate({ body: { data: [{ id: 12, parentId: TARGET_PARENT_ID }, { id: 13, parentId: TARGET_PARENT_ID }] } }) as any)
    await flushRefetches()

    expect(countGridRequests(PARENT_ID)).toBe(1)
  })

  it.each(['save', 'publish', 'unpublish'] as const)('refetches children grids after a data object is updated with task %s', async (task) => {
    const store = createStore()
    await subscribeToGrid(store, PARENT_ID)

    await store.dispatch(api.endpoints.dataObjectUpdateById.initiate({ id: 12, body: { data: { task } } }) as any)

    await waitFor(() => { expect(countGridRequests(PARENT_ID)).toBe(2) })
  })

  it('does not refetch children grids after an auto save', async () => {
    const store = createStore()
    await subscribeToGrid(store, PARENT_ID)

    await store.dispatch(api.endpoints.dataObjectUpdateById.initiate({ id: 12, body: { data: { task: 'autoSave' } } }) as any)
    await flushRefetches()

    expect(countGridRequests(PARENT_ID)).toBe(1)
  })

  it.each([
    ['rename', { key: 'renamed' }],
    ['lock', { locked: 'self' }]
  ])('refetches children grids after a %s', async (_, change) => {
    const store = createStore()
    await subscribeToGrid(store, PARENT_ID)

    await store.dispatch(api.endpoints.dataObjectPatchById.initiate({ body: { data: [{ id: 12, ...change }] } }) as any)

    await waitFor(() => { expect(countGridRequests(PARENT_ID)).toBe(2) })
  })

  it('does not refetch children grids for an inline edit, which updates the cached rows itself', async () => {
    const store = createStore()
    await subscribeToGrid(store, PARENT_ID)

    await store.dispatch(api.endpoints.dataObjectPatchById.initiate({ body: { data: [{ id: 12, editableData: { name: 'changed' } }] } }) as any)
    await flushRefetches()

    expect(countGridRequests(PARENT_ID)).toBe(1)
  })

  // The available columns carry the serialized field definitions the inline edit renders from, so an
  // open grid keeps the field settings of the class it was opened with until this query is invalidated.
  it('refetches the available grid columns of an open grid after its class definition is saved', async () => {
    const store = createStore()
    await subscribeToAvailableColumns(store, 'Product')

    await store.dispatch(classDefinitionApi.endpoints.classDefinitionUpdate.initiate({
      id: 'Product',
      classDefinitionUpdate: { configuration: {}, values: {} }
    }) as any)

    await waitFor(() => { expect(countAvailableColumnsRequests('Product')).toBe(2) })
  })
})
