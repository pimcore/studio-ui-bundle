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
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { CredentialsSection } from './credentials-section'
import { type ServiceUser } from '../service-users-api-slice-enhanced'

const mockRotate = jest.fn()
const mockIssue = jest.fn()
const mockRevoke = jest.fn()
const mockSuccess = jest.fn()
const mockTrackError = jest.fn()
const mockCopy = jest.fn()
const mockConfirm = jest.fn()
let mockIssuing = false

jest.mock('../service-users-api-slice-enhanced', () => ({
  useServiceUserRotateSecretMutation: () => [mockRotate, { isLoading: false }],
  useServiceUserMcpTokenIssueMutation: () => [mockIssue, { isLoading: mockIssuing }],
  useServiceUserMcpTokenRevokeMutation: () => [mockRevoke, { isLoading: false }]
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
  useMessage: () => ({ success: mockSuccess, error: jest.fn() })
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
jest.mock('@Pimcore/components/input-number/input-number', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const credentials = { serviceUserId: 7, clientId: 'svc_7', clientSecret: 'shown-once' }
const accessToken = { token: 'pmcp_shown-once', expiresAt: 1_800_000_000 }

interface ServiceUserOptions {
  clientCredentialsEnabled?: boolean
  active?: number
  latestExpiresAt?: number | null
}

const serviceUser = (
  lastLogin: number | null,
  { clientCredentialsEnabled = true, active = 0, latestExpiresAt = null }: ServiceUserOptions = {}
): ServiceUser => ({
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
  lastLogin,
  clientCredentialsEnabled,
  mcpTokens: { active, latestExpiresAt },
  responsibleUsers: [],
  responsibleRoles: []
})

describe('CredentialsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockIssuing = false
    mockConfirm.mockImplementation(({ onOk }: { onOk: () => Promise<void> }) => { void onOk() })
    mockRotate.mockResolvedValue({ data: credentials })
    mockIssue.mockResolvedValue({ data: accessToken })
    mockRevoke.mockResolvedValue({ data: null })
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

  it('shows the OAuth hint on rotation when client credentials are enabled', () => {
    render(<CredentialsSection serviceUser={ serviceUser(null) } />)

    expect(screen.getByText('service-users.credentials.oauth.rotate-hint')).toBeInTheDocument()
    expect(screen.queryByText('service-users.credentials.oauth.disabled')).toBeNull()
  })

  it('hides the OAuth client when client credentials are disabled on the instance', () => {
    render(<CredentialsSection serviceUser={ serviceUser(1_700_000_000, { clientCredentialsEnabled: false }) } />)

    expect(screen.getByText('service-users.credentials.oauth.disabled')).toBeInTheDocument()
    expect(screen.queryByText('svc_7')).toBeNull()
    expect(screen.queryByText('service-users.credentials.rotate')).toBeNull()
    expect(screen.queryByText('service-users.credentials.client-id')).toBeNull()
  })

  it('shows the token summary', () => {
    render(<CredentialsSection serviceUser={ serviceUser(null, { active: 2, latestExpiresAt: 1_800_000_000 }) } />)

    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('date:1800000000')).toBeInTheDocument()
    expect(screen.getByText('service-users.credentials.revoke')).not.toBeDisabled()
  })

  it('says there is no active token and offers no revocation then', () => {
    render(<CredentialsSection serviceUser={ serviceUser(null) } />)

    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('service-users.credentials.mcp-tokens.none')).toBeInTheDocument()
    expect(screen.getByText('service-users.credentials.revoke')).toBeDisabled()
  })

  it('issues a token with the chosen lifetime and shows it once', async () => {
    render(<CredentialsSection serviceUser={ serviceUser(null, { clientCredentialsEnabled: false }) } />)

    fireEvent.click(screen.getByText('service-users.credentials.issue'))
    expect(screen.getByLabelText('service-users.credentials.issue.ttl')).toHaveValue(30)

    fireEvent.change(screen.getByLabelText('service-users.credentials.issue.ttl'), { target: { value: '1' } })
    fireEvent.click(within(screen.getByRole('dialog')).getByText('service-users.credentials.issue'))

    await waitFor(() => { expect(screen.getByLabelText('service-users.credentials.token')).toHaveValue('pmcp_shown-once') })
    expect(mockIssue).toHaveBeenCalledWith({ id: 7, serviceUserMcpTokenRequest: { ttlDays: 1 } })

    fireEvent.click(screen.getByText('service-users.secret.close'))

    expect(screen.queryByDisplayValue('pmcp_shown-once')).toBeNull()
  })

  it('cannot be dismissed while the token is being issued', () => {
    const { rerender } = render(<CredentialsSection serviceUser={ serviceUser(null) } />)
    fireEvent.click(screen.getByText('service-users.credentials.issue'))

    mockIssuing = true
    rerender(<CredentialsSection serviceUser={ serviceUser(null) } />)

    const cancel = within(screen.getByRole('dialog')).getByText('button.cancel')
    expect(cancel).toBeDisabled()
    fireEvent.click(cancel)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('refuses a lifetime outside 1 to 90 days', () => {
    render(<CredentialsSection serviceUser={ serviceUser(null) } />)

    fireEvent.click(screen.getByText('service-users.credentials.issue'))
    fireEvent.change(screen.getByLabelText('service-users.credentials.issue.ttl'), { target: { value: '91' } })

    expect(within(screen.getByRole('dialog')).getByText('service-users.credentials.issue')).toBeDisabled()
    expect(screen.getByText('service-users.credentials.issue.ttl.invalid')).toBeInTheDocument()
    expect(mockIssue).not.toHaveBeenCalled()
  })

  it('offers no token for an inactive service user', () => {
    render(<CredentialsSection serviceUser={ { ...serviceUser(null), active: false } } />)

    expect(screen.getByText('service-users.credentials.issue')).toBeDisabled()
  })

  it('revokes all tokens after confirmation', async () => {
    render(<CredentialsSection serviceUser={ serviceUser(null, { active: 1, latestExpiresAt: 1_800_000_000 }) } />)

    fireEvent.click(screen.getByText('service-users.credentials.revoke'))

    expect(mockConfirm).toHaveBeenCalledWith(expect.objectContaining({
      content: 'service-users.credentials.revoke.confirm'
    }))
    await waitFor(() => { expect(mockRevoke).toHaveBeenCalledWith({ id: 7 }) })
    await waitFor(() => { expect(mockSuccess).toHaveBeenCalledWith('service-users.credentials.revoke.success') })
  })

  it('does not revoke without confirmation', () => {
    mockConfirm.mockImplementation(() => {})
    render(<CredentialsSection serviceUser={ serviceUser(null, { active: 1, latestExpiresAt: 1_800_000_000 }) } />)

    fireEvent.click(screen.getByText('service-users.credentials.revoke'))

    expect(mockRevoke).not.toHaveBeenCalled()
  })

  it('reports a failed revocation', async () => {
    mockRevoke.mockResolvedValue({ error: { status: 500 } })
    render(<CredentialsSection serviceUser={ serviceUser(null, { active: 1, latestExpiresAt: 1_800_000_000 }) } />)

    fireEvent.click(screen.getByText('service-users.credentials.revoke'))

    await waitFor(() => { expect(mockTrackError).toHaveBeenCalledTimes(1) })
    expect(mockSuccess).not.toHaveBeenCalled()
  })
})
