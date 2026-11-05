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
import { OneTimeSecretModal } from './one-time-secret-modal'
import { CredentialsSection } from './credentials-section'
import { type ServiceUser } from '../service-users-api-slice-enhanced'

const mockRotate = jest.fn()
const mockTrackError = jest.fn()
const mockCopy = jest.fn()
const mockConfirm = jest.fn()

jest.mock('../service-users-api-slice-enhanced', () => ({
  useServiceUserRotateSecretMutation: () => [mockRotate, { isLoading: false }]
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => { mockTrackError(error) },
  ApiError: class MockApiError {
    constructor (public readonly errorData: unknown) {}
  }
}))
jest.mock('@Pimcore/utils/clipboard', () => ({
  copyToClipboardWithFeedback: async (text: string, onSuccess: () => void) => { mockCopy(text); onSuccess() }
}))
jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: jest.fn(), error: jest.fn() })
}))
jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({
  useStudioModal: () => ({ modal: { confirm: mockConfirm } })
}))
jest.mock('@Pimcore/components/modal/modal', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/button/button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/input/input', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/alert/alert', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/flex/flex', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/text/text', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/formatted-date-time/formatted-date-time', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const credentials = { serviceUserId: 7, clientId: 'svc_7', clientSecret: 'shown-once' }

const serviceUser = (lastLogin: number | null): ServiceUser => ({
  id: 7,
  name: 'svc-erp-sync',
  email: null,
  active: true,
  permissions: [],
  roles: [],
  classes: [],
  docTypes: [],
  assetWorkspaces: [],
  dataObjectWorkspaces: [],
  documentWorkspaces: [],
  clientId: 'svc_7',
  lastLogin
})

describe('OneTimeSecretModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('is closed without credentials', () => {
    render(<OneTimeSecretModal onClose={ jest.fn() } />)

    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('shows client id and secret with the warning that the secret is shown only once', () => {
    render(
      <OneTimeSecretModal
        credentials={ credentials }
        onClose={ jest.fn() }
      />
    )

    expect(screen.getByLabelText('service-users.credentials.client-id')).toHaveValue('svc_7')
    expect(screen.getByLabelText('service-users.secret.client-secret')).toHaveValue('shown-once')
    expect(screen.getByRole('alert')).toHaveTextContent('service-users.secret.warning')
  })

  it('copies the secret and closes', () => {
    const onClose = jest.fn()
    render(
      <OneTimeSecretModal
        credentials={ credentials }
        onClose={ onClose }
      />
    )

    fireEvent.click(screen.getByText('service-users.secret.copy'))
    fireEvent.click(screen.getByText('service-users.secret.close'))

    expect(mockCopy).toHaveBeenCalledWith('shown-once')
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

describe('CredentialsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockConfirm.mockImplementation(({ onOk }: { onOk: () => Promise<void> }) => { void onOk() })
    mockRotate.mockResolvedValue({ data: credentials })
  })

  it('shows the client id and when the credentials were last used', () => {
    render(<CredentialsSection serviceUser={ serviceUser(1_700_000_000) } />)

    expect(screen.getByText('svc_7')).toBeInTheDocument()
    expect(screen.getByText('date:1700000000')).toBeInTheDocument()
  })

  it('says when the credentials were never used', () => {
    render(<CredentialsSection serviceUser={ serviceUser(null) } />)

    expect(screen.getByText('service-users.credentials.never-used')).toBeInTheDocument()
  })

  it('rotates the secret after confirmation and shows the new secret once', async () => {
    render(<CredentialsSection serviceUser={ serviceUser(null) } />)

    fireEvent.click(screen.getByText('service-users.credentials.rotate'))

    expect(mockConfirm).toHaveBeenCalledTimes(1)
    await waitFor(() => { expect(screen.getByLabelText('service-users.secret.client-secret')).toHaveValue('shown-once') })
    expect(mockRotate).toHaveBeenCalledWith({ id: 7 })

    fireEvent.click(screen.getByText('service-users.secret.close'))

    expect(screen.queryByDisplayValue('shown-once')).toBeNull()
  })

  it('does not rotate without confirmation', () => {
    mockConfirm.mockImplementation(() => {})
    render(<CredentialsSection serviceUser={ serviceUser(null) } />)

    fireEvent.click(screen.getByText('service-users.credentials.rotate'))

    expect(mockRotate).not.toHaveBeenCalled()
  })

  it('reports a failed rotation', async () => {
    mockRotate.mockResolvedValue({ error: { status: 500 } })
    render(<CredentialsSection serviceUser={ serviceUser(null) } />)

    fireEvent.click(screen.getByText('service-users.credentials.rotate'))

    await waitFor(() => { expect(mockTrackError).toHaveBeenCalledTimes(1) })
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
