/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockLogin = jest.fn()
const mockSendStatistics = jest.fn()
const mockSlotRenderer = jest.fn()

jest.mock('@Pimcore/modules/auth/authorization-api-slice.gen', () => ({
  useLoginMutation: () => [mockLogin]
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ isAdmin: false }) }))
// the two-factor hooks reach antd-style through the user slices; a login without a challenge is all this needs
jest.mock('@Pimcore/modules/auth/hooks/use-two-factor-authentication', () => ({ getTwoFactorChallenge: () => undefined }))
jest.mock('@Pimcore/modules/auth/services/statisticsService', () => ({
  sendStatistics: (...args: unknown[]) => mockSendStatistics(...args)
}))
jest.mock('@Pimcore/modules/auth/components/login-form/login-form-style', () => ({ useStyle: () => ({ styles: {} }) }))
jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ error: jest.fn() }) }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError extends Error {}
}))
jest.mock('@Pimcore/modules/app/component-registry/component-config', () => ({ componentConfig: { form: { login: { name: 'form.login' } } } }))
jest.mock('@Pimcore/modules/app/component-registry/slot-renderer', () => ({
  SlotRenderer: (props: unknown) => {
    mockSlotRenderer(props)
    return null
  }
}))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('../../../../components/icon/icon', () => ({ Icon: () => null }))
// The real button pulls in antd-style, which jest does not transpile
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick, htmlType }: { children?: React.ReactNode, onClick?: () => void, htmlType?: 'submit' | 'button' }) => (
    <button
      onClick={ onClick }
      type={ htmlType ?? 'button' }
    >
      {children}
    </button>
  )
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { LoginForm } from './login-form'

describe('LoginForm', () => {
  beforeEach(() => {
    mockLogin.mockReset()
    mockSendStatistics.mockReset()
    mockSlotRenderer.mockReset()
  })

  it('does not offer a "Remember me" option, because the login has no remember-me support', () => {
    render(<LoginForm />)

    expect(screen.queryByRole('checkbox')).toBeNull()
    expect(screen.queryByText('login-form.remember-me')).toBeNull()
  })

  it('keeps the "Forgot password" link next to the credentials', () => {
    const onPasswordForgotten = jest.fn()
    render(<LoginForm onPasswordForgotten={ onPasswordForgotten } />)

    fireEvent.click(screen.getByText('login-form.forgot-password'))

    expect(onPasswordForgotten).toHaveBeenCalledTimes(1)
  })

  it('submits only the username and password', async () => {
    mockLogin.mockReturnValue(Object.assign(Promise.resolve({ error: { status: 401 } }), { catch: jest.fn() }))
    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText('login-form.username'), { target: { value: 'admin' } })
    fireEvent.change(screen.getByLabelText('login-form.password'), { target: { value: 'secret' } })
    fireEvent.submit(screen.getByLabelText('login-form.username').closest('form')!)

    await waitFor(() => { expect(mockLogin).toHaveBeenCalled() })
    expect(mockLogin).toHaveBeenCalledWith({ credentials: { username: 'admin', password: 'secret' } })
  })

  it('tells the login slot that it stands in for a guarded route', () => {
    render(<LoginForm inPlace />)

    expect(mockSlotRenderer).toHaveBeenLastCalledWith(expect.objectContaining({
      slot: 'form.login',
      props: expect.objectContaining({ inPlace: true })
    }))
  })

  it('tells the login slot that it is on the login route', () => {
    render(<LoginForm />)

    expect(mockSlotRenderer).toHaveBeenLastCalledWith(expect.objectContaining({
      props: expect.objectContaining({ inPlace: false })
    }))
  })
})
