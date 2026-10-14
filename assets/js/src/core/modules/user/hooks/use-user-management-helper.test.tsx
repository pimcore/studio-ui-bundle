/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { useUserManagementHelper } from './use-user-management-helper'

const mockDispatch = jest.fn()
const mockMessageError = jest.fn()
const mockMessageSuccess = jest.fn()

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => undefined
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  api: {
    endpoints: {
      userUpdateById: { initiate: (arg: unknown) => ({ endpoint: 'userUpdateById', arg }) },
      userUpdatePasswordById: { initiate: (arg: unknown) => ({ endpoint: 'userUpdatePasswordById', arg }) }
    }
  }
}))

jest.mock('@Pimcore/modules/user/user-management-slice', () => ({
  userOpened: jest.fn(),
  userClosed: jest.fn(),
  changeUser: jest.fn(),
  userAvailablePermissionsFetched: jest.fn(),
  userUpdated: (payload: unknown) => ({ type: 'user/userUpdated', payload })
}))

jest.mock('@Pimcore/modules/user/hooks/use-user-management-trackable-changes', () => ({}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError extends Error {}
}))

jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({
  useUser: () => ({ id: 1, isAdmin: true })
}))

jest.mock('@Pimcore/modules/perspectives/hooks/use-perspectives', () => ({
  usePerspectives: () => ({ refreshPerspectives: jest.fn() })
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ error: mockMessageError, success: mockMessageSuccess })
}))

type ApiResult = Record<string, unknown>

const setupDispatch = (results: Record<string, ApiResult>): void => {
  mockDispatch.mockImplementation((action: { endpoint?: string }): unknown => {
    if (action.endpoint !== undefined) {
      return Promise.resolve(results[action.endpoint])
    }
    return action
  })
}

const dispatchedUserUpdated = (): unknown[] =>
  mockDispatch.mock.calls
    .map(([action]) => action)
    .filter((action) => action?.type === 'user/userUpdated')

const user = { id: 42, name: 'editor', perspectives: [] } as any

describe('useUserManagementHelper.updateUserById', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('does not upsert an entity without id when the user update fails', async () => {
    const error = { status: 422, data: { message: 'Validation failed' } }
    setupDispatch({ userUpdateById: { error } })

    const { result } = renderHook(() => useUserManagementHelper())
    await result.current.updateUserById({ id: 42, user })

    expect(dispatchedUserUpdated()).toEqual([])
    expect(mockMessageError).toHaveBeenCalledWith('Validation failed')
    expect(mockMessageSuccess).not.toHaveBeenCalled()
  })

  it('surfaces the user update error even when a password change is included', async () => {
    const error = { status: 422, data: { message: 'Validation failed' } }
    setupDispatch({ userUpdateById: { error }, userUpdatePasswordById: { data: null } })

    const { result } = renderHook(() => useUserManagementHelper())
    await result.current.updateUserById({ id: 42, user: { ...user, password: 'secret-password' } })

    expect(dispatchedUserUpdated()).toEqual([])
    expect(mockMessageError).toHaveBeenCalledWith('Validation failed')
    expect(mockMessageSuccess).not.toHaveBeenCalled()
  })

  it('applies the saved user data on success', async () => {
    setupDispatch({ userUpdateById: { data: { ...user, name: 'saved' } } })

    const { result } = renderHook(() => useUserManagementHelper())
    await result.current.updateUserById({ id: 42, user })

    expect(dispatchedUserUpdated()).toEqual([
      { type: 'user/userUpdated', payload: { ...user, name: 'saved', modified: false, changes: {}, modifiedCells: {} } }
    ])
    expect(mockMessageSuccess).toHaveBeenCalledWith('user-management.save-user.success')
  })

  it('still applies the saved user data when only the password update fails', async () => {
    const passwordError = { status: 422, data: { message: 'Password too short' } }
    setupDispatch({ userUpdateById: { data: { ...user, name: 'saved' } }, userUpdatePasswordById: { error: passwordError } })

    const { result } = renderHook(() => useUserManagementHelper())
    await result.current.updateUserById({ id: 42, user: { ...user, password: 'x' } })

    expect(dispatchedUserUpdated()).toHaveLength(1)
    expect(mockMessageError).toHaveBeenCalledWith('Password too short')
  })
})
