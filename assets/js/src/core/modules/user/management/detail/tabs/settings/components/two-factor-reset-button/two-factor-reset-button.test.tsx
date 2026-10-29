/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockReset = jest.fn(async () => {})
const mockSuccess = jest.fn()
const mockError = jest.fn()
const mockCurrentUser = { id: 1, isAdmin: true }

jest.mock('@Pimcore/modules/auth/hooks/use-two-factor-authentication', () => ({
  useTwoFactorAuthentication: () => ({ resetUserTwoFactor: mockReset })
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => mockCurrentUser }))
jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: mockSuccess, error: mockError })
}))
jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: ({ onOk }: { onOk: () => Promise<void> }) => { void onOk() } })
}))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => <button onClick={ onClick }>{children}</button>
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { TwoFactorResetButton } from './two-factor-reset-button'

const label = 'user-management.two-factor-authentication.reset'

const renderButton = (isTwoFactorActive: boolean, userId: number): void => {
  render(
    <TwoFactorResetButton
      isTwoFactorActive={ isTwoFactorActive }
      userId={ userId }
    />
  )
}

describe('TwoFactorResetButton', () => {
  beforeEach(() => {
    mockCurrentUser.id = 1
    mockCurrentUser.isAdmin = true
    mockReset.mockReset()
    mockReset.mockResolvedValue(undefined)
    mockSuccess.mockClear()
    mockError.mockClear()
  })

  it('is hidden when the user has no active 2FA', () => {
    renderButton(false, 5)

    expect(screen.queryByText(label)).toBeNull()
  })

  it('lets an admin reset another user', () => {
    renderButton(true, 5)

    expect(screen.getByText(label)).toBeTruthy()
  })

  it('does not let a non-admin reset another user', () => {
    mockCurrentUser.isAdmin = false
    renderButton(true, 5)

    expect(screen.queryByText(label)).toBeNull()
  })

  it('lets a non-admin reset themselves', () => {
    mockCurrentUser.isAdmin = false
    renderButton(true, 1)

    expect(screen.getByText(label)).toBeTruthy()
  })

  it('resets after confirmation', async () => {
    renderButton(true, 5)

    fireEvent.click(screen.getByText(label))

    await waitFor(() => { expect(mockSuccess).toHaveBeenCalled() })
    expect(mockReset).toHaveBeenCalledWith(5)
  })

  it('keeps the button and shows an error when the reset fails', async () => {
    mockReset.mockRejectedValue(new Error('failed'))
    renderButton(true, 5)

    fireEvent.click(screen.getByText(label))

    await waitFor(() => { expect(mockError).toHaveBeenCalled() })
    expect(screen.getByText(label)).toBeTruthy()
  })
})
