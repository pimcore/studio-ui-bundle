/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import { useLogoutCheck } from './use-logout-check'

const mockConfirm = jest.fn()
const mockDestroy = jest.fn()
const mockDeactivate = jest.fn()
const mockState: { data: { active: boolean } | undefined } = { data: undefined }
const mockTrackError = jest.fn()

jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({
  useStudioModal: () => ({ modal: { confirm: mockConfirm } })
}))
jest.mock('../maintenance-mode-api-slice-enhanced', () => ({
  useMaintenanceModeGetQuery: () => ({ data: mockState.data }),
  useMaintenanceModeDeactivateMutation: () => [mockDeactivate]
}))
jest.mock('@Pimcore/modules/auth/permission-helper', () => ({ isAllowed: () => true }))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => <button onClick={ onClick }>{children}</button>
}))
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => mockTrackError(error),
  ApiError: jest.fn()
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const runCheck = (logout: jest.Mock): void => {
  const { result } = renderHook(() => useLogoutCheck())
  result.current(logout)
}

const renderFooter = (): void => {
  const { footer } = mockConfirm.mock.calls[0][0] as { footer: () => React.ReactElement }
  render(<>{footer()}</>)
}

describe('useLogoutCheck', () => {
  beforeEach(() => {
    mockState.data = { active: true }
    mockConfirm.mockReset()
    mockConfirm.mockReturnValue({ destroy: mockDestroy })
    mockDestroy.mockReset()
    mockDeactivate.mockReset()
    mockDeactivate.mockResolvedValue({ data: { active: false } })
    mockTrackError.mockReset()
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

  it('asks first while maintenance mode is on and offers three choices', () => {
    const logout = jest.fn()

    runCheck(logout)

    expect(logout).not.toHaveBeenCalled()
    expect(mockConfirm).toHaveBeenCalledWith(expect.objectContaining({ title: 'maintenance-mode.logout.title' }))
    renderFooter()
    expect(screen.getAllByRole('button').map(button => button.textContent)).toEqual([
      'cancel',
      'maintenance-mode.logout.log-out-anyway',
      'maintenance-mode.logout.deactivate-and-log-out'
    ])
  })

  it('does nothing on cancel', () => {
    const logout = jest.fn()
    runCheck(logout)
    renderFooter()

    fireEvent.click(screen.getByText('cancel'))

    expect(mockDestroy).toHaveBeenCalled()
    expect(logout).not.toHaveBeenCalled()
    expect(mockDeactivate).not.toHaveBeenCalled()
  })

  it('logs out without deactivating on "log out anyway"', () => {
    const logout = jest.fn()
    runCheck(logout)
    renderFooter()

    fireEvent.click(screen.getByText('maintenance-mode.logout.log-out-anyway'))

    expect(logout).toHaveBeenCalledTimes(1)
    expect(mockDeactivate).not.toHaveBeenCalled()
  })

  it('deactivates, then logs out', async () => {
    const logout = jest.fn()
    runCheck(logout)
    renderFooter()

    fireEvent.click(screen.getByText('maintenance-mode.logout.deactivate-and-log-out'))

    await waitFor(() => { expect(logout).toHaveBeenCalledTimes(1) })
    expect(mockDeactivate).toHaveBeenCalledTimes(1)
  })

  it('stays logged in when deactivating fails', async () => {
    mockDeactivate.mockResolvedValue({ error: { status: 500 } })
    const logout = jest.fn()
    runCheck(logout)
    renderFooter()

    fireEvent.click(screen.getByText('maintenance-mode.logout.deactivate-and-log-out'))

    await waitFor(() => { expect(mockTrackError).toHaveBeenCalledTimes(1) })
    expect(logout).not.toHaveBeenCalled()
  })
})
