/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import { renderHook, waitFor } from '@testing-library/react'
import { useUserManagementDraft } from './use-user-management-draft'

const mockDispatch = jest.fn()

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => undefined
}))

jest.mock('@Pimcore/modules/auth/user/user-api-slice.gen', () => ({
  api: {
    endpoints: {
      userGetById: { initiate: (arg: unknown) => ({ endpoint: 'userGetById', arg }) }
    }
  }
}))

jest.mock('@Pimcore/modules/user/user-management-slice', () => ({
  selectUserById: jest.fn(),
  userFetched: (payload: unknown) => ({ type: 'user/userFetched', payload }),
  userRemoved: jest.fn(),
  changeUser: jest.fn(),
  updateUserImage: jest.fn()
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError extends Error {}
}))

const forbiddenId = 1
const accessibleId = 2

const fetchedUserIds = (): unknown[] =>
  mockDispatch.mock.calls
    .map(([action]) => action)
    .filter((action) => action?.endpoint === 'userGetById')
    .map((action) => action.arg.id)

describe('useUserManagementDraft', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockDispatch.mockImplementation((action: { endpoint?: string, arg?: { id: number } }): unknown => {
      if (isUndefined(action.endpoint)) {
        return action
      }
      if (action.arg?.id === forbiddenId) {
        return Promise.resolve({ isError: true, error: { status: 403 } })
      }
      return Promise.resolve({ isError: false, data: { id: action.arg?.id, name: 'editor' } })
    })
  })

  // PEES-1935
  it('fetches the newly selected user when the id changes after a failed fetch', async () => {
    const { result, rerender } = renderHook(({ id }) => useUserManagementDraft(id), {
      initialProps: { id: forbiddenId }
    })

    await waitFor(() => { expect(result.current.isLoading).toBe(false) })
    expect(fetchedUserIds()).toEqual([forbiddenId])

    rerender({ id: accessibleId })

    await waitFor(() => { expect(fetchedUserIds()).toEqual([forbiddenId, accessibleId]) })
  })
})
