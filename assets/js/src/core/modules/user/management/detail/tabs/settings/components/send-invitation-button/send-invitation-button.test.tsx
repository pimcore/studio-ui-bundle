/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockSendInvitation = jest.fn()
const mockSuccess = jest.fn()
const mockTrackError = jest.fn()

jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  useUserSendInvitationMutation: () => [mockSendInvitation, { isLoading: false }]
}))
jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: mockSuccess, error: jest.fn() })
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => { mockTrackError(error) },
  ApiError: class MockApiError {
    constructor (public readonly errorData: unknown) {}
  }
}))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ id: 1, isAdmin: true }) }))
jest.mock('@Pimcore/app/config/app-config', () => ({ currentDomain: 'http://localhost' }))
// the real router module builds the app router (and its whole import tree) at import time
jest.mock('@Pimcore/app/router/router', () => ({
  routes: { passwordReset: '/pimcore-studio/reset-password/' }
}))
jest.mock('react-router-dom', () => ({ generatePath: (path: string) => path }))
jest.mock('@Pimcore/components/button/button', () => ({
  Button: ({ children, onClick, disabled, title }: {
    children: React.ReactNode
    onClick: () => void
    disabled?: boolean
    title?: string
  }) => (
    <button
      disabled={ disabled }
      onClick={ onClick }
      title={ title }
    >{children}</button>
  )
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { SendInvitationButton } from './send-invitation-button'

describe('SendInvitationButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSendInvitation.mockResolvedValue({ data: undefined })
  })

  it('renders nothing when the user has already logged in', () => {
    render(
      <SendInvitationButton
        email="invitee@example.com"
        lastLogin={ 1730000000 }
        userId={ 42 }
      />
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it("renders nothing for the current user's own account", () => {
    render(
      <SendInvitationButton
        email="invitee@example.com"
        userId={ 1 }
      />
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('is disabled when the user has no email address', () => {
    render(
      <SendInvitationButton
        email={ null }
        userId={ 42 }
      />
    )

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('sends the invitation with the reset password URL', async () => {
    render(
      <SendInvitationButton
        email="invitee@example.com"
        userId={ 42 }
      />
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(mockSendInvitation).toHaveBeenCalledWith({
        id: 42,
        invitation: {
          invitationUrl: 'http://localhost/pimcore-studio/reset-password/'
        }
      })
    })
  })

  it('shows a success message naming the email address', async () => {
    render(
      <SendInvitationButton
        email="invitee@example.com"
        userId={ 42 }
      />
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(mockSuccess).toHaveBeenCalledWith('user-management.send-invitation.success')
    })
    expect(mockTrackError).not.toHaveBeenCalled()
  })

  it('reports an API error through trackError', async () => {
    mockSendInvitation.mockResolvedValue({ error: { status: 403 } })

    render(
      <SendInvitationButton
        email="invitee@example.com"
        userId={ 42 }
      />
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(mockTrackError).toHaveBeenCalled()
    })
    expect(mockSuccess).not.toHaveBeenCalled()
  })
})
