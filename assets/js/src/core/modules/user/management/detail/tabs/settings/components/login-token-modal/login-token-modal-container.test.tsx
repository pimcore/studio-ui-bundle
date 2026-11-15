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
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { LoginTokenModalContainer } from './login-token-modal-container'

const mockTrigger = jest.fn()
const mockHookState: { data?: { link: string }, isLoading: boolean, isFetching: boolean } = {
  data: undefined,
  isLoading: false,
  isFetching: false
}

jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  useLazyUserTokenLinkGetQuery: () => [mockTrigger, mockHookState]
}))

const mockAddModal = jest.fn()
const mockRemoveModal = jest.fn()

jest.mock('@Pimcore/modules/app/modal-holder/use-modal-holder', () => ({
  useModalHolder: () => ({ addModal: mockAddModal, removeModal: mockRemoveModal, hasModal: () => false })
}))

const mockTrackError = jest.fn()

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => { mockTrackError(error) },
  ApiError: class MockApiError {
    constructor (public readonly errorData: unknown) {}
  }
}))

jest.mock('@Pimcore/modules/user/hooks/use-user-management-context', () => ({
  useUserManagementContext: () => ({ id: 42 })
}))

jest.mock('@Pimcore/app/config/app-config', () => ({
  currentDomain: 'http://localhost'
}))

// the real router module builds the app router (and its whole import tree) at import time
jest.mock('@Pimcore/app/router/router', () => ({
  routes: { login: '/login' }
}))

jest.mock('react-router-dom', () => ({
  generatePath: (path: string) => path
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// Button pulls in antd-style (untranspiled ESM) via its style hook
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick, disabled }: { children?: React.ReactNode, onClick?: React.MouseEventHandler<HTMLButtonElement>, disabled?: boolean }) => (
    <button
      disabled={ disabled }
      onClick={ onClick }
      type="button"
    >
      {children}
    </button>
  )
}))

// same for the modal content — the container only hands it to addModal
jest.mock('./login-token-modal', () => ({
  LoginTokenModal: () => <div />
}))

describe('LoginTokenModalContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockHookState.data = undefined
  })

  it('opens the modal with the token url when the request succeeds', async () => {
    const link = 'http://localhost/login?token=abc123'
    mockHookState.data = { link }
    mockTrigger.mockResolvedValue({ data: { link } })

    render(<LoginTokenModalContainer />)
    fireEvent.click(screen.getByRole('button', { name: 'user-management.admin.login' }))

    await waitFor(() => { expect(mockAddModal).toHaveBeenCalledTimes(1) })
    const modalElement = mockAddModal.mock.calls[0][1]
    expect(modalElement.props.tokenUrl).toBe(link)
    expect(mockTrackError).not.toHaveBeenCalled()
  })

  it('does not open an empty modal and reports the error when the request fails', async () => {
    // e.g. 403 for a user without a password or an admin target (PEES-1403)
    const error = { status: 403, data: { message: 'Cannot generate login token URL for this user without password set', errorKey: 'error_login_token_no_user_password' } }
    mockTrigger.mockResolvedValue({ error })

    render(<LoginTokenModalContainer />)
    fireEvent.click(screen.getByRole('button', { name: 'user-management.admin.login' }))

    await waitFor(() => { expect(mockTrackError).toHaveBeenCalledTimes(1) })
    expect((mockTrackError.mock.calls[0][0] as { errorData: unknown }).errorData).toBe(error)
    expect(mockAddModal).not.toHaveBeenCalled()
  })
})
