/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockConfirmSetup = jest.fn(async () => {})
const mockDisable = jest.fn(async () => {})
const mockDispatch = jest.fn()
const mockSuccess = jest.fn()
const mockError = jest.fn()
const mockTwoFactor = { isAvailable: true }
const mockUser: { id: number, twoFactorAuthentication: { required: boolean, enabled: boolean, type: string, active: boolean } } = {
  id: 1,
  twoFactorAuthentication: { required: false, enabled: false, type: '', active: false }
}

jest.mock('@Pimcore/modules/auth/hooks/use-two-factor-authentication', () => ({
  useTwoFactorAuthentication: () => ({
    isAvailable: mockTwoFactor.isAvailable,
    loadSetup: jest.fn(),
    confirmSetup: mockConfirmSetup,
    disableTwoFactor: mockDisable
  })
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => mockUser }))
jest.mock('@Pimcore/modules/auth/user/user-slice', () => ({ setUser: (payload: unknown) => ({ type: 'auth/setUser', payload }) }))
jest.mock('@sdk/app', () => ({ useAppDispatch: () => mockDispatch }))
jest.mock('@sdk/components', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))
jest.mock('@Pimcore/components/accordion/accordion', () => ({
  Accordion: ({ items }: { items: Array<{ key: string, children: React.ReactNode }> }) => <>{items.map((item) => <div key={ item.key }>{item.children}</div>)}</>
}))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => <button onClick={ onClick }>{children}</button>
}))
jest.mock('@Pimcore/components/modal/modal', () => ({
  Modal: ({ open, children }: { open: boolean, children: React.ReactNode }) => open ? <div>{children}</div> : null
}))
jest.mock('@Pimcore/modules/auth/components/two-factor-setup-form/two-factor-setup-form', () => ({
  TwoFactorSetupForm: ({ onConfirm }: { onConfirm: (code: string) => Promise<void> }) => (
    <button onClick={ () => { void onConfirm('123456') } }>confirm-setup</button>
  )
}))
jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: mockSuccess, error: mockError })
}))
jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: ({ onOk }: { onOk: () => Promise<void> }) => { void onOk() } })
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { TwoFactorAccordion } from './two-factor-accordion'

const setupLabel = 'user-profile.two-factor-authentication.setup'
const renewLabel = 'user-profile.two-factor-authentication.renew'
const disableLabel = 'user-profile.two-factor-authentication.disable'
const requiredHint = 'user-profile.two-factor-authentication.required-hint'

const setTwoFactor = (active: boolean, required: boolean): void => {
  mockUser.twoFactorAuthentication = { required, enabled: active, type: active ? 'google' : '', active }
}

describe('TwoFactorAccordion', () => {
  beforeEach(() => {
    mockTwoFactor.isAvailable = true
    setTwoFactor(false, false)
    mockConfirmSetup.mockClear()
    mockDisable.mockReset()
    mockDisable.mockResolvedValue(undefined)
    mockDispatch.mockClear()
    mockSuccess.mockClear()
    mockError.mockClear()
  })

  it('is hidden while the backend does not provide 2FA', () => {
    mockTwoFactor.isAvailable = false
    const { container } = render(<TwoFactorAccordion />)

    expect(container.innerHTML).toBe('')
  })

  it('offers setup but no disable when 2FA is not set up', () => {
    render(<TwoFactorAccordion />)

    expect(screen.getByText(setupLabel)).toBeTruthy()
    expect(screen.queryByText(disableLabel)).toBeNull()
  })

  it('offers renew and disable when 2FA is active and not required', () => {
    setTwoFactor(true, false)
    render(<TwoFactorAccordion />)

    expect(screen.getByText(renewLabel)).toBeTruthy()
    expect(screen.getByText(disableLabel)).toBeTruthy()
  })

  it('hides disable and explains why when 2FA is required', () => {
    setTwoFactor(true, true)
    render(<TwoFactorAccordion />)

    expect(screen.getByText(renewLabel)).toBeTruthy()
    expect(screen.getByText(requiredHint)).toBeTruthy()
    expect(screen.queryByText(disableLabel)).toBeNull()
  })

  it('marks 2FA active after a confirmed setup and keeps required unchanged', async () => {
    render(<TwoFactorAccordion />)

    fireEvent.click(screen.getByText(setupLabel))
    fireEvent.click(screen.getByText('confirm-setup'))

    await waitFor(() => { expect(mockSuccess).toHaveBeenCalled() })
    expect(mockConfirmSetup).toHaveBeenCalledWith('123456')
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'auth/setUser',
      payload: expect.objectContaining({
        twoFactorAuthentication: { required: false, enabled: true, type: 'google', active: true }
      })
    })
    expect(screen.queryByText('confirm-setup')).toBeNull()
  })

  it('marks 2FA inactive after disabling', async () => {
    setTwoFactor(true, false)
    render(<TwoFactorAccordion />)

    fireEvent.click(screen.getByText(disableLabel))

    await waitFor(() => { expect(mockSuccess).toHaveBeenCalled() })
    expect(mockDisable).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'auth/setUser',
      payload: expect.objectContaining({
        twoFactorAuthentication: { required: false, enabled: false, type: '', active: false }
      })
    })
  })

  it('shows an error and keeps the state when disabling fails', async () => {
    setTwoFactor(true, false)
    mockDisable.mockRejectedValue(new Error('failed'))
    render(<TwoFactorAccordion />)

    fireEvent.click(screen.getByText(disableLabel))

    await waitFor(() => { expect(mockError).toHaveBeenCalled() })
    expect(mockDispatch).not.toHaveBeenCalled()
  })
})
