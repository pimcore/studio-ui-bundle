/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockLogout = jest.fn(async () => {})

jest.mock('@Pimcore/modules/auth/components/login-form/login-form-style', () => ({ useStyle: () => ({ styles: {} }) }))
jest.mock('@Pimcore/modules/auth/authorization-api-slice.gen', () => ({ useLogoutMutation: () => [mockLogout] }))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ isAdmin: false }) }))
jest.mock('@Pimcore/modules/auth/services/statisticsService', () => ({ sendStatistics: jest.fn() }))
jest.mock('../forgot-password-form/forgot-password-form', () => ({ ForgotPasswordForm: () => <div>forgot-password</div> }))
jest.mock('../two-factor-form/two-factor-form', () => ({
  TwoFactorForm: ({ onGetBack }: { onGetBack: () => void }) => <button onClick={ onGetBack }>verify-step</button>
}))
jest.mock('../two-factor-setup-form/two-factor-setup-form', () => ({ TwoFactorSetupForm: () => <div>setup-step</div> }))
jest.mock('./login-form', () => ({
  LoginForm: ({ onTwoFactorRequired }: { onTwoFactorRequired: (step: string) => void }) => (
    <>
      <button onClick={ () => { onTwoFactorRequired('verify') } }>login-verify</button>
      <button onClick={ () => { onTwoFactorRequired('setup') } }>login-setup</button>
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
  afterEach(() => {
    mockLogout.mockClear()
  })

  it('shows the code step when the login requires a code', () => {
    render(<LoginFormContainer />)

    fireEvent.click(screen.getByText('login-verify'))

    expect(screen.getByText('verify-step')).toBeTruthy()
    expect(screen.queryByText('login-verify')).toBeNull()
  })

  it('shows the setup step when the login requires a setup', () => {
    render(<LoginFormContainer />)

    fireEvent.click(screen.getByText('login-setup'))

    expect(screen.getByText('setup-step')).toBeTruthy()
  })

  it('logs out and returns to the login step when going back', async () => {
    render(<LoginFormContainer />)

    fireEvent.click(screen.getByText('login-verify'))
    fireEvent.click(screen.getByText('verify-step'))

    await waitFor(() => { expect(screen.getByText('login-verify')).toBeTruthy() })
    expect(mockLogout).toHaveBeenCalledTimes(1)
  })
})
