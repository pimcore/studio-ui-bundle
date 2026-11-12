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
import { renderHook } from '@testing-library/react'
import { useUserHelper } from './use-user-helper'

const mockDispatch = jest.fn()
const mockMessageError = jest.fn()
const mockMessageSuccess = jest.fn()

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => mockDispatch
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/auth/user/user-api-slice-enhanced', () => ({
  api: {
    endpoints: {
      userUpdateProfile: { initiate: (arg: unknown) => ({ endpoint: 'userUpdateProfile', arg }) },
      userUpdatePasswordById: { initiate: (arg: unknown) => ({ endpoint: 'userUpdatePasswordById', arg }) },
      userGetImage: { initiate: (arg: unknown) => ({ endpoint: 'userGetImage', arg }) }
    }
  }
}))

jest.mock('@Pimcore/modules/auth/user/user-slice', () => ({
  userProfileUpdated: (payload: unknown) => ({ type: 'auth/userProfileUpdated', payload }),
  userProfileImageUpdated: (payload: unknown) => ({ type: 'auth/userProfileImageUpdated', payload })
}))

jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ error: mockMessageError, success: mockMessageSuccess })
}))

const DASHBOARD_PATH = 'dashboards/sales'

const setupDispatch = (results: Record<string, Record<string, unknown>>): void => {
  mockDispatch.mockImplementation((action: { endpoint?: string }): unknown => {
    if (!isUndefined(action.endpoint)) {
      return Promise.resolve(results[action.endpoint])
    }
    return action
  })
}

const dispatchedProfile = (): Record<string, unknown> | undefined =>
  mockDispatch.mock.calls
    .map(([action]) => action)
    .find((action) => action?.endpoint === 'userUpdateProfile')?.arg.updateUserProfile

const profile = { id: 7, firstname: 'Jane', lastname: 'Doe', welcomeScreen: true, keyBindings: [] }

const saveProfile = async (user: Record<string, unknown>): Promise<void> => {
  const { result } = renderHook(() => useUserHelper())
  await result.current.updateUserProfile(user)
}

describe('useUserHelper.updateUserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    setupDispatch({ userUpdateProfile: { data: profile } })
  })

  it('sends the chosen welcome screen path', async () => {
    await saveProfile({ ...profile, welcomeScreenPath: '', modifiedCells: { welcomeScreenPath: DASHBOARD_PATH } })

    expect(dispatchedProfile()).toMatchObject({ welcomeScreen: true, welcomeScreenPath: DASHBOARD_PATH })
    expect(mockMessageSuccess).toHaveBeenCalledWith('user-management.save-user.success')
  })

  it('sends an empty welcome screen path when the choice was cleared', async () => {
    await saveProfile({ ...profile, welcomeScreenPath: DASHBOARD_PATH, modifiedCells: { welcomeScreenPath: '' } })

    expect(dispatchedProfile()).toMatchObject({ welcomeScreen: true, welcomeScreenPath: '' })
  })

  it('leaves the welcome screen path undefined when the backend did not return it', async () => {
    await saveProfile(profile)

    expect(dispatchedProfile()).toMatchObject({ welcomeScreen: true, firstname: 'Jane' })
    expect(dispatchedProfile()?.welcomeScreenPath).toBeUndefined()
  })
})
