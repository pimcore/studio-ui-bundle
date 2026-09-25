/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockIsSessionGone = jest.fn()

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/pimcore-studio/api'
}))

jest.mock('@Pimcore/modules/auth/util/session-end', () => ({
  isSessionGone: async () => await mockIsSessionGone()
}))

// eslint-disable-next-line import/first
import { rtkQueryErrorLogger } from './rtkQueryErrorLogger'
// eslint-disable-next-line import/first
import type { MiddlewareAPI } from '@reduxjs/toolkit'

const LOGGED_OUT = { type: 'authentication/setAuthState', payload: false }

const rejected = (
  status: number,
  url?: string,
  endpointName = 'someEndpoint'
): Record<string, unknown> => ({
  type: 'api/executeQuery/rejected',
  payload: { status },
  error: { message: 'Rejected' },
  meta: {
    rejectedWithValue: true,
    requestStatus: 'rejected',
    requestId: 'r1',
    arg: { endpointName },
    ...(url === undefined ? {} : { baseQueryMeta: { request: { url } } })
  }
})

const run = (action: Record<string, unknown>): { dispatch: jest.Mock, next: jest.Mock } => {
  const dispatch = jest.fn()
  const next = jest.fn()
  const store: MiddlewareAPI = { dispatch, getState: jest.fn() }
  rtkQueryErrorLogger(store)(next)(action)

  return { dispatch, next }
}

const settle = async (): Promise<void> => { await new Promise(resolve => setTimeout(resolve, 0)) }

describe('rtkQueryErrorLogger', () => {
  beforeEach(() => {
    mockIsSessionGone.mockResolvedValue(false)
  })

  afterEach(() => {
    mockIsSessionGone.mockReset()
  })

  it('logs the user out of the UI on a 401 from the Studio API', () => {
    const { dispatch, next } = run(rejected(401, 'http://localhost/pimcore-studio/api/documents/tree'))

    expect(dispatch).toHaveBeenCalledWith(LOGGED_OUT)
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'auth/setUser' }))
    expect(next).not.toHaveBeenCalled()
  })

  /**
   * An external service answering 401 because its own check failed must not log the user
   * out of Studio. The request failed, nothing more, so its action goes on right away: the
   * caller reads the result from the store as soon as the request settles.
   */
  it('passes a 401 from an external service on as a normal error', async () => {
    const action = rejected(401, 'http://localhost/agent-server/api/conversations')

    const { dispatch, next } = run(action)

    expect(next).toHaveBeenCalledWith(action)
    await settle()
    expect(dispatch).not.toHaveBeenCalled()
  })

  /**
   * The external service may have failed because the Studio session expired, and it may be
   * the only thing still sending requests. The server is asked, without holding the action.
   */
  it('logs the user out after a 401 from an external service once the session is gone', async () => {
    mockIsSessionGone.mockResolvedValue(true)
    const action = rejected(401, 'http://localhost/agent-server/api/conversations')

    const { dispatch, next } = run(action)

    expect(next).toHaveBeenCalledWith(action)
    await settle()
    expect(dispatch).toHaveBeenCalledWith(LOGGED_OUT)
  })

  it('does not take a path that merely starts like the Studio API for it', () => {
    const action = rejected(401, 'http://localhost/pimcore-studio/api-docs/spec')

    const { next } = run(action)

    expect(next).toHaveBeenCalledWith(action)
  })

  it('treats a request with an unreadable URL as Studio\'s', () => {
    const { dispatch, next } = run(rejected(401, 'http://[not-a-url'))

    expect(dispatch).toHaveBeenCalledWith(LOGGED_OUT)
    expect(next).not.toHaveBeenCalled()
  })

  it('treats a request to another origin as external, whatever its path', async () => {
    const action = rejected(401, 'https://other.example/pimcore-studio/api/user')

    const { dispatch, next } = run(action)

    expect(next).toHaveBeenCalledWith(action)
    await settle()
    expect(dispatch).not.toHaveBeenCalled()
  })

  it('treats a 401 without a known request as the end of the session, as before', () => {
    const { dispatch, next } = run(rejected(401))

    expect(dispatch).toHaveBeenCalledWith(LOGGED_OUT)
    expect(next).not.toHaveBeenCalled()
  })

  it('leaves the current-user check to its own handling', () => {
    const action = rejected(401, 'http://localhost/pimcore-studio/api/user/current-user-information', 'userGetCurrentInformation')

    const { dispatch, next } = run(action)

    expect(next).toHaveBeenCalledWith(action)
    expect(dispatch).not.toHaveBeenCalled()
  })

  it('passes other errors on', () => {
    const action = rejected(500, 'http://localhost/pimcore-studio/api/documents/tree')

    const { dispatch, next } = run(action)

    expect(next).toHaveBeenCalledWith(action)
    expect(dispatch).not.toHaveBeenCalled()
  })
})
