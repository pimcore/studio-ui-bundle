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
import { useLogoutCheck } from './use-logout-check'

const mockConfirm = jest.fn()
const mockDeactivate = jest.fn()
const mockState: { data: { active: boolean } | undefined } = { data: undefined }
const mockTrackError = jest.fn()
const mockUseGetQuery = jest.fn()
const mockUser = { isAdmin: true }

jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: mockConfirm })
}))
jest.mock('../maintenance-mode-api-slice-enhanced', () => ({
  useMaintenanceModeGetQuery: (arg: undefined, options: { skip: boolean }) => {
    mockUseGetQuery(arg, options)

    return { data: mockState.data }
  },
  useMaintenanceModeDeactivateMutation: () => [mockDeactivate]
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => mockUser }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => mockTrackError(error),
  ApiError: jest.fn()
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

interface ConfirmConfig {
  title: string
  okText: string
  cancelText: string
  footer?: unknown
  onOk: () => Promise<void>
}

const runCheck = (logout: jest.Mock): void => {
  const { result } = renderHook(() => useLogoutCheck())
  result.current(logout)
}

const confirmConfig = (): ConfirmConfig => mockConfirm.mock.calls[0][0] as ConfirmConfig

describe('useLogoutCheck', () => {
  beforeEach(() => {
    mockState.data = { active: true }
    mockConfirm.mockReset()
    mockDeactivate.mockReset()
    mockDeactivate.mockResolvedValue({ data: { active: false } })
    mockTrackError.mockReset()
    mockUseGetQuery.mockReset()
    mockUser.isAdmin = true
  })

  it('does not ask for the state for non-admins', () => {
    mockUser.isAdmin = false

    runCheck(jest.fn())

    expect(mockUseGetQuery).toHaveBeenCalledWith(undefined, { skip: true })
  })

  it('logs out right away while maintenance mode is off', () => {
    mockState.data = { active: false }
    const logout = jest.fn()

    runCheck(logout)

    expect(logout).toHaveBeenCalledTimes(1)
    expect(mockConfirm).not.toHaveBeenCalled()
  })

  it('logs out right away when the state is unknown', () => {
    mockState.data = undefined
    const logout = jest.fn()

    runCheck(logout)

    expect(logout).toHaveBeenCalledTimes(1)
  })

  it('asks first while maintenance mode is on, with Cancel and "Deactivate and log out" only', () => {
    const logout = jest.fn()

    runCheck(logout)

    expect(logout).not.toHaveBeenCalled()
    expect(confirmConfig()).toEqual(expect.objectContaining({
      title: 'maintenance-mode.logout.title',
      okText: 'maintenance-mode.logout.deactivate-and-log-out',
      cancelText: 'cancel'
    }))
    expect(confirmConfig().footer).toBeUndefined()
  })

  it('deactivates, then logs out on OK', async () => {
    const logout = jest.fn()
    runCheck(logout)

    await confirmConfig().onOk()

    expect(mockDeactivate).toHaveBeenCalledTimes(1)
    expect(logout).toHaveBeenCalledTimes(1)
    expect(mockDeactivate.mock.invocationCallOrder[0]).toBeLessThan(logout.mock.invocationCallOrder[0])
  })

  it('stays logged in when deactivating fails', async () => {
    mockDeactivate.mockResolvedValue({ error: { status: 500 } })
    const logout = jest.fn()
    runCheck(logout)

    await confirmConfig().onOk()

    expect(mockTrackError).toHaveBeenCalledTimes(1)
    expect(logout).not.toHaveBeenCalled()
  })
})
