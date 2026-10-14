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
import { api } from './asset-api-slice-enhanced'

const PARENT_ID = 5
const TARGET_PARENT_ID = 7
const GRID_URL = '/pimcore-studio/api/assets/grid'

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const getUrl = (input: RequestInfo | URL): string => input instanceof Request ? input.url : input.toString()

describe('asset api cache invalidation', () => {
  const originalFetch = globalThis.fetch
  let fetchMock: jest.Mock

  const gridFolderIds = new Map<Request, number>()

  beforeEach(() => {
    gridFolderIds.clear()
    fetchMock = jest.fn(async (input: Request) => {
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
    await store.dispatch(api.endpoints.assetGetGrid.initiate({ body: { folderId } }) as any)
    expect(countGridRequests(folderId)).toBe(1)
  }

  const flushRefetches = async (): Promise<void> => { await new Promise((resolve) => setTimeout(resolve, 50)) }

  it('refetches the parent children grid after an asset is added', async () => {
    const store = createStore()
    await subscribeToGrid(store, PARENT_ID)

    await store.dispatch(api.endpoints.assetAdd.initiate({
      parentId: PARENT_ID,
      body: { file: new Blob(['content']) }
    }) as any)

    await waitFor(() => { expect(countGridRequests(PARENT_ID)).toBe(2) })
  })

  it('refetches the old and the new parent children grid after an asset is moved', async () => {
    const store = createStore()
    await subscribeToGrid(store, PARENT_ID)
    await subscribeToGrid(store, TARGET_PARENT_ID)

    await store.dispatch(api.endpoints.assetPatchById.initiate({ body: { data: [{ id: 12, parentId: TARGET_PARENT_ID }] } }) as any)

    await waitFor(() => {
      expect(countGridRequests(PARENT_ID)).toBe(2)
      expect(countGridRequests(TARGET_PARENT_ID)).toBe(2)
    })
  })

  it('does not refetch children grids for a patch that keeps the parent', async () => {
    const store = createStore()
    await subscribeToGrid(store, PARENT_ID)

    await store.dispatch(api.endpoints.assetPatchById.initiate({ body: { data: [{ id: 12, key: 'renamed' }] } }) as any)
    await flushRefetches()

    expect(countGridRequests(PARENT_ID)).toBe(1)
  })
})
