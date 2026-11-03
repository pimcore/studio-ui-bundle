/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockSessionQuery = jest.fn()
const mockCurrentUserQuery = jest.fn()
const mockDispatch = jest.fn()
let mockIsAuthenticated: boolean | undefined

jest.mock('../authorization-api-slice.gen', () => ({
  useSessionGetStatusQuery: (...args: unknown[]) => mockSessionQuery(...args)
}))
// Only a backend without the session route is asked here: the current-user route answers 401 without a session
jest.mock('../user/user-api-slice-enhanced', () => ({
  useUserGetCurrentInformationQuery: (...args: unknown[]) => mockCurrentUserQuery(...args)
}))
jest.mock('@sdk/app', () => ({
  injectSliceWithState: jest.fn(),
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: unknown) => unknown) => selector({
    authentication: { isAuthenticated: mockIsAuthenticated, twoFactor: undefined }
  })
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { setAuthState, setTwoFactorChallenge } from '../auth-slice'
// eslint-disable-next-line import/first
import { useIsAuthenticated } from './use-is-authenticated'

const queryResult = (overrides: object): object => ({
  isError: false,
  isSuccess: false,
  error: undefined,
  data: undefined,
  refetch: jest.fn(),
  ...overrides
})

describe('useIsAuthenticated', () => {
  beforeEach(() => {
    mockIsAuthenticated = undefined
    mockSessionQuery.mockReturnValue(queryResult({}))
    mockCurrentUserQuery.mockReturnValue(queryResult({}))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('asks the session status route first and leaves the current-user route alone', () => {
    renderHook(() => useIsAuthenticated())

    expect(mockSessionQuery).toHaveBeenCalledWith(undefined, { skip: false })
    expect(mockCurrentUserQuery).toHaveBeenCalledWith(undefined, { skip: true })
  })

  it('asks the current-user route when the backend does not know the session route yet', () => {
    mockSessionQuery.mockReturnValue(queryResult({ isError: true, error: { status: 404, data: {} } }))
    mockCurrentUserQuery.mockReturnValue(queryResult({ isSuccess: true }))

    renderHook(() => useIsAuthenticated())

    expect(mockCurrentUserQuery).toHaveBeenCalledWith(undefined, { skip: false })
    expect(mockDispatch).toHaveBeenCalledWith(setAuthState(true))
    expect(mockDispatch).not.toHaveBeenCalledWith(setAuthState(false))
  })

  it('shows the login when the old backend has no session either', () => {
    mockSessionQuery.mockReturnValue(queryResult({ isError: true, error: { status: 404, data: {} } }))
    mockCurrentUserQuery.mockReturnValue(queryResult({ isError: true, error: { status: 401, data: {} } }))

    renderHook(() => useIsAuthenticated())

    expect(mockDispatch).toHaveBeenCalledWith(setAuthState(false))
  })

  it('does not ask again once the state is known', () => {
    mockIsAuthenticated = true

    renderHook(() => useIsAuthenticated())

    expect(mockSessionQuery).toHaveBeenCalledWith(undefined, { skip: true })
  })

  it('is authenticated when the status says so', () => {
    mockSessionQuery.mockReturnValue(queryResult({ isSuccess: true, data: { authenticated: true } }))

    renderHook(() => useIsAuthenticated())

    expect(mockDispatch).toHaveBeenCalledWith(setAuthState(true))
  })

  it('shows the login without any error when the status says there is no session', () => {
    mockSessionQuery.mockReturnValue(queryResult({ isSuccess: true, data: { authenticated: false } }))

    renderHook(() => useIsAuthenticated())

    expect(mockDispatch).toHaveBeenCalledWith(setTwoFactorChallenge(undefined))
    expect(mockDispatch).toHaveBeenCalledWith(setAuthState(false))
    expect(mockDispatch).not.toHaveBeenCalledWith(setAuthState(true))
  })

  it('keeps a login that waits for its code on the code step', () => {
    mockSessionQuery.mockReturnValue(queryResult({
      isSuccess: true,
      data: { authenticated: false, twoFactorRequired: true, twoFactorStep: 'verify', digits: 6 }
    }))

    renderHook(() => useIsAuthenticated())

    expect(mockDispatch).toHaveBeenCalledWith(setTwoFactorChallenge({ step: 'verify', digits: 6 }))
    expect(mockDispatch).toHaveBeenCalledWith(setAuthState(false))
  })

  it('falls back to the login when the status route answers 401', () => {
    mockSessionQuery.mockReturnValue(queryResult({ isError: true, error: { status: 401, data: {} } }))

    renderHook(() => useIsAuthenticated())

    expect(mockDispatch).toHaveBeenCalledWith(setAuthState(false))
  })

  it('still reads the code step from a 401 answer', () => {
    mockSessionQuery.mockReturnValue(queryResult({
      isError: true,
      error: { status: 401, data: { twoFactorRequired: true, twoFactorStep: 'setup', digits: 8 } }
    }))

    renderHook(() => useIsAuthenticated())

    expect(mockDispatch).toHaveBeenCalledWith(setTwoFactorChallenge({ step: 'setup', digits: 8 }))
  })

  it('reads the code step from the current-user answer of a backend without the session route', () => {
    mockSessionQuery.mockReturnValue(queryResult({ isError: true, error: { status: 404, data: {} } }))
    mockCurrentUserQuery.mockReturnValue(queryResult({
      isError: true,
      error: { status: 401, data: { twoFactorRequired: true, twoFactorStep: 'verify', digits: 6 } }
    }))

    renderHook(() => useIsAuthenticated())

    expect(mockDispatch).toHaveBeenCalledWith(setTwoFactorChallenge({ step: 'verify', digits: 6 }))
    expect(mockDispatch).toHaveBeenCalledWith(setAuthState(false))
  })
})
