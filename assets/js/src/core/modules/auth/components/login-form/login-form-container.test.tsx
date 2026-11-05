/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockLogout = jest.fn<Promise<{ data?: unknown, error?: unknown }>, []>(async () => ({ data: null }))
const mockTrackError = jest.fn()
const mockVerifyCode = jest.fn(async (code: string) => {})
const mockReload = jest.fn()

jest.mock('@Pimcore/modules/auth/components/login-form/login-form-style', () => ({ useStyle: () => ({ styles: {} }) }))
jest.mock('@Pimcore/modules/auth/authorization-api-slice.gen', () => ({ useLogoutMutation: () => [mockLogout] }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => mockTrackError(error),
  ApiError: class {
    constructor (public readonly cause: unknown) {}
  }
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ isAdmin: false }) }))
jest.mock('@Pimcore/modules/auth/services/statisticsService', () => ({ sendStatistics: jest.fn() }))
jest.mock('../../hooks/use-two-factor-authentication', () => ({
  useTwoFactorAuthentication: () => ({ verifyCode: mockVerifyCode, loadSetup: jest.fn() })
}))
jest.mock('../forgot-password-form/forgot-password-form', () => ({ ForgotPasswordForm: () => <div>forgot-password</div> }))
jest.mock('../two-factor-form/two-factor-form', () => ({
  TwoFactorForm: ({ onGetBack, digits }: { onGetBack: () => void, digits: number }) => (
    <>
      <button onClick={ onGetBack }>verify-step</button>
      <span>{`digits ${digits}`}</span>
    </>
  )
}))
jest.mock('../two-factor-setup-form/two-factor-setup-form', () => ({
  TwoFactorSetupForm: ({ onConfirm }: { onConfirm: (code: string) => Promise<void> }) => (
    <button onClick={ () => { void onConfirm('123456') } }>setup-step</button>
  )
}))
jest.mock('./login-form', () => ({
  LoginForm: ({ onTwoFactorRequired }: { onTwoFactorRequired: (challenge: { step: string, digits: number }) => void }) => (
    <>
      <button onClick={ () => { onTwoFactorRequired({ step: 'verify', digits: 8 }) } }>login-verify</button>
      <button onClick={ () => { onTwoFactorRequired({ step: 'setup', digits: 6 }) } }>login-setup</button>
    </>
  )
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { LoginFormContainer } from './login-form-container'

describe('LoginFormContainer two-factor steps', () => {
  const originalLocation = globalThis.location

  beforeAll(() => {
    Object.defineProperty(globalThis, 'location', { configurable: true, value: { ...originalLocation, reload: mockReload } })
  })

  afterAll(() => {
    Object.defineProperty(globalThis, 'location', { configurable: true, value: originalLocation })
  })

  afterEach(() => {
    mockLogout.mockClear()
    mockTrackError.mockClear()
    mockVerifyCode.mockClear()
    mockReload.mockClear()
  })

  it('shows the code step when the login requires a code', () => {
    render(<LoginFormContainer />)

    fireEvent.click(screen.getByText('login-verify'))

    expect(screen.getByText('verify-step')).toBeTruthy()
    expect(screen.getByText('digits 8')).toBeTruthy()
    expect(screen.queryByText('login-verify')).toBeNull()
  })

  it('shows the setup step when the login requires a setup', () => {
    render(<LoginFormContainer />)

    fireEvent.click(screen.getByText('login-setup'))

    expect(screen.getByText('setup-step')).toBeTruthy()
  })

  it('finishes a login setup with the login code endpoint and reloads', async () => {
    render(<LoginFormContainer />)

    fireEvent.click(screen.getByText('login-setup'))
    fireEvent.click(screen.getByText('setup-step'))

    await waitFor(() => { expect(mockReload).toHaveBeenCalledTimes(1) })
    expect(mockVerifyCode).toHaveBeenCalledWith('123456')
  })

  it('opens the step of a login that is still waiting for its code', () => {
    render(<LoginFormContainer pendingTwoFactor={ { step: 'verify', digits: 7 } } />)

    expect(screen.getByText('verify-step')).toBeTruthy()
    expect(screen.getByText('digits 7')).toBeTruthy()
    expect(screen.queryByText('login-verify')).toBeNull()
  })

  it('logs out and returns to the login step when going back', async () => {
    render(<LoginFormContainer />)

    fireEvent.click(screen.getByText('login-verify'))
    fireEvent.click(screen.getByText('verify-step'))

    await waitFor(() => { expect(screen.getByText('login-verify')).toBeTruthy() })
    expect(mockLogout).toHaveBeenCalledTimes(1)
    expect(mockTrackError).not.toHaveBeenCalled()
  })

  it('reports a failed logout and still returns to the login step', async () => {
    mockLogout.mockResolvedValueOnce({ error: { status: 500, data: {} } })
    render(<LoginFormContainer />)

    fireEvent.click(screen.getByText('login-verify'))
    fireEvent.click(screen.getByText('verify-step'))

    await waitFor(() => { expect(screen.getByText('login-verify')).toBeTruthy() })
    expect(mockTrackError).toHaveBeenCalledTimes(1)
  })
})
