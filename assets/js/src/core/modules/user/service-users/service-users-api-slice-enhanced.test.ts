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
import { api } from './service-users-api-slice-enhanced'

const BASE = '/pimcore-studio/api'
const COLLECTION_URL = `${BASE}/service-users`
const DETAIL_URL = `${BASE}/service-user/7`

const serviceUser = {
  id: 7,
  name: 'svc-erp-sync',
  email: null,
  active: true,
  permissions: [],
  roles: [],
  classes: [],
  docTypes: [],
  assetWorkspaces: [],
  dataObjectWorkspaces: [],
  documentWorkspaces: [],
  clientId: 'svc_abc',
  lastLogin: null,
  clientCredentialsEnabled: false,
  mcpTokens: { active: 0, latestExpiresAt: null }
}
const credentials = { serviceUserId: 7, clientId: 'svc_abc', clientSecret: 'one-time-secret' }
const accessToken = { token: 'pmcp_one-time-token', expiresAt: 1_800_000_000 }

const createStore = (): ReturnType<typeof configureStore> => configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

const json = (body: unknown): Response => new Response(JSON.stringify(body), {
  status: 200,
  headers: { 'Content-Type': 'application/json' }
})

const pathOf = (request: Request): string => new URL(request.url, 'http://localhost').pathname

describe('service users api slice', () => {
  const originalFetch = globalThis.fetch
  let fetchMock: jest.Mock
  const bodies = new Map<Request, unknown>()

  beforeEach(() => {
    bodies.clear()
    fetchMock = jest.fn(async (request: Request) => {
      const text = await request.clone().text()
      bodies.set(request, text === '' ? undefined : JSON.parse(text))
      const path = pathOf(request)

      if (path === COLLECTION_URL) {
        return json({ totalItems: 1, items: [serviceUser] })
      }
      if (path.endsWith('/mcp-token') && request.method === 'POST') {
        return json(accessToken)
      }
      if (request.method === 'DELETE') {
        return new Response(null, { status: 200 })
      }
      if (path.endsWith('/rotate-secret') || path === `${BASE}/service-user` || path.includes('/from-user/')) {
        return json(credentials)
      }

      return json(serviceUser)
    })
    globalThis.fetch = fetchMock as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  const requests = (method: string, path: string): Request[] => fetchMock.mock.calls
    .map(([request]) => request as Request)
    .filter((request) => request.method === method && pathOf(request) === path)

  const subscribeToList = async (store: ReturnType<typeof createStore>): Promise<void> => {
    await store.dispatch(api.endpoints.serviceUserGetCollection.initiate() as any)
    expect(requests('GET', COLLECTION_URL)).toHaveLength(1)
  }

  const subscribeToDetail = async (store: ReturnType<typeof createStore>): Promise<void> => {
    await store.dispatch(api.endpoints.serviceUserGetById.initiate({ id: 7 }) as any)
    expect(requests('GET', DETAIL_URL)).toHaveLength(1)
  }

  const flush = async (): Promise<void> => { await new Promise((resolve) => setTimeout(resolve, 50)) }

  it('lists the service users', async () => {
    const store = createStore()
    const result = await store.dispatch(api.endpoints.serviceUserGetCollection.initiate() as any)

    expect(result.data.items).toEqual([serviceUser])
  })

  it('creates a service user, returns the one-time credentials and refreshes the list', async () => {
    const store = createStore()
    await subscribeToList(store)

    const result = await store.dispatch(api.endpoints.serviceUserCreate.initiate({
      serviceUserCreate: { name: 'svc-new', email: 'team@example.com' }
    }) as any)

    expect(result.data).toEqual(credentials)
    expect(bodies.get(requests('POST', `${BASE}/service-user`)[0])).toEqual({ name: 'svc-new', email: 'team@example.com' })
    await waitFor(() => { expect(requests('GET', COLLECTION_URL)).toHaveLength(2) })
  })

  it('creates a service user from a user and refreshes the list', async () => {
    const store = createStore()
    await subscribeToList(store)

    const result = await store.dispatch(api.endpoints.serviceUserCreateFromUser.initiate({
      id: 3,
      serviceUserCreateFromUser: { name: 'svc-copy' }
    }) as any)

    expect(result.data).toEqual(credentials)
    expect(bodies.get(requests('POST', `${BASE}/service-user/from-user/3`)[0])).toEqual({ name: 'svc-copy' })
    await waitFor(() => { expect(requests('GET', COLLECTION_URL)).toHaveLength(2) })
  })

  it('rotates the secret without refetching the list or the detail', async () => {
    const store = createStore()
    await subscribeToList(store)
    await subscribeToDetail(store)

    const result = await store.dispatch(api.endpoints.serviceUserRotateSecret.initiate({ id: 7 }) as any)
    await flush()

    expect(result.data).toEqual(credentials)
    expect(requests('POST', `${DETAIL_URL}/rotate-secret`)).toHaveLength(1)
    expect(requests('GET', COLLECTION_URL)).toHaveLength(1)
    expect(requests('GET', DETAIL_URL)).toHaveLength(1)
  })

  it('issues an MCP access token and refreshes the token summary in the list and the detail', async () => {
    const store = createStore()
    await subscribeToList(store)
    await subscribeToDetail(store)

    const result = await store.dispatch(api.endpoints.serviceUserMcpTokenIssue.initiate({
      id: 7,
      serviceUserMcpTokenRequest: { ttlDays: 1 }
    }) as any)

    expect(result.data).toEqual(accessToken)
    expect(bodies.get(requests('POST', `${DETAIL_URL}/mcp-token`)[0])).toEqual({ ttlDays: 1 })
    await waitFor(() => {
      expect(requests('GET', COLLECTION_URL)).toHaveLength(2)
      expect(requests('GET', DETAIL_URL)).toHaveLength(2)
    })
  })

  it('revokes all MCP access tokens and refreshes the token summary in the list and the detail', async () => {
    const store = createStore()
    await subscribeToList(store)
    await subscribeToDetail(store)

    await store.dispatch(api.endpoints.serviceUserMcpTokenRevoke.initiate({ id: 7 }) as any)

    expect(requests('DELETE', `${DETAIL_URL}/mcp-token`)).toHaveLength(1)
    await waitFor(() => {
      expect(requests('GET', COLLECTION_URL)).toHaveLength(2)
      expect(requests('GET', DETAIL_URL)).toHaveLength(2)
    })
  })

  it('deactivates a service user and refreshes the list and the detail', async () => {
    const store = createStore()
    await subscribeToList(store)
    await subscribeToDetail(store)

    await store.dispatch(api.endpoints.serviceUserDeactivateById.initiate({ id: 7 }) as any)

    expect(requests('POST', `${DETAIL_URL}/deactivate`)).toHaveLength(1)
    await waitFor(() => {
      expect(requests('GET', COLLECTION_URL)).toHaveLength(2)
      expect(requests('GET', DETAIL_URL)).toHaveLength(2)
    })
  })

  it('updates a service user and refreshes the list and the detail', async () => {
    const store = createStore()
    await subscribeToList(store)
    await subscribeToDetail(store)

    await store.dispatch(api.endpoints.serviceUserUpdateById.initiate({
      id: 7,
      serviceUserUpdate: { email: 'new@example.com', roles: [2] }
    }) as any)

    expect(bodies.get(requests('PUT', DETAIL_URL)[0])).toEqual({ email: 'new@example.com', roles: [2] })
    await waitFor(() => {
      expect(requests('GET', COLLECTION_URL)).toHaveLength(2)
      expect(requests('GET', DETAIL_URL)).toHaveLength(2)
    })
  })

  it('deletes a service user and refreshes the list', async () => {
    const store = createStore()
    await subscribeToList(store)

    await store.dispatch(api.endpoints.serviceUserDeleteById.initiate({ id: 7 }) as any)

    expect(requests('DELETE', DETAIL_URL)).toHaveLength(1)
    await waitFor(() => { expect(requests('GET', COLLECTION_URL)).toHaveLength(2) })
  })
})
