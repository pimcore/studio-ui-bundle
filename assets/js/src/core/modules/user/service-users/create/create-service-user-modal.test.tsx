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
import { CreateServiceUserModal } from './create-service-user-modal'

const mockCreate = jest.fn()
const mockCreateFromUser = jest.fn()
const mockIssue = jest.fn()
const mockServiceUserQuery = jest.fn()
const mockCopy = jest.fn()
const mockTrackError = jest.fn()
let mockCreating = false
let mockIssuing = false

jest.mock('../service-users-api-slice-enhanced', () => ({
  useServiceUserCreateMutation: () => [mockCreate, { isLoading: mockCreating }],
  useServiceUserCreateFromUserMutation: () => [mockCreateFromUser, { isLoading: false }],
  useServiceUserMcpTokenIssueMutation: () => [mockIssue, { isLoading: mockIssuing }],
  useServiceUserGetByIdQuery: (args: unknown, options: unknown) => mockServiceUserQuery(args, options)
}))
jest.mock('@Pimcore/utils/clipboard', () => ({
  copyToClipboardWithFeedback: async (text: string, onSuccess: () => void) => { mockCopy(text); onSuccess() }
}))
jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: jest.fn(), error: jest.fn() })
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => { mockTrackError(error) },
  ApiError: class MockApiError {
    constructor (public readonly errorData: unknown) {}
  }
}))
jest.mock('@Pimcore/modules/user/components/user-select/user-select', () => {
  const { Select } = jest.requireActual('@test-utils/mocks/studio-component-mocks')
  return {
    UserSelect: (props: Record<string, unknown>) => Select({ ...props, options: [{ value: 3, label: 'editor' }] })
  }
})
jest.mock('@Pimcore/components/modal/modal', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/input/input', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/flex/flex', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/text/text', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/input-number/input-number', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/alert/alert', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/button/button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/formatted-date-time/formatted-date-time', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const credentials = { serviceUserId: 9, clientId: 'svc_9', clientSecret: 'secret-9' }
const accessToken = { token: 'pmcp_shown-once', expiresAt: 1_800_000_000 }

const instanceWith = (clientCredentialsEnabled: boolean): void => {
  mockServiceUserQuery.mockImplementation((args: unknown, options: { skip?: boolean }) =>
    options.skip === true
      ? { data: undefined, isFetching: false }
      : { data: { id: 9, clientCredentialsEnabled }, isFetching: false }
  )
  // The API sends the client secret only while the grant is on.
  const created = { ...credentials, clientSecret: clientCredentialsEnabled ? credentials.clientSecret : null }
  mockCreate.mockResolvedValue({ data: created })
  mockCreateFromUser.mockResolvedValue({ data: created })
}

const onCreated = jest.fn()
const onCancel = jest.fn()

const renderModal = (mode: 'create' | 'from-user'): void => {
  render(
    <CreateServiceUserModal
      mode={ mode }
      onCancel={ onCancel }
      onCreated={ onCreated }
      open
    />
  )
}

const type = (label: string, value: string): void => {
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
}

describe('CreateServiceUserModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockCreating = false
    mockIssuing = false
    mockCreate.mockResolvedValue({ data: credentials })
    mockCreateFromUser.mockResolvedValue({ data: credentials })
    mockIssue.mockResolvedValue({ data: accessToken })
    instanceWith(false)
  })

  it('creates a service user with name and contact email and continues with the credentials step', async () => {
    renderModal('create')

    type('service-users.field.name', 'svc-erp-sync')
    type('service-users.field.email', 'erp-team@example.com')
    fireEvent.click(screen.getByText('service-users.create.ok'))

    await screen.findByText('service-users.create.credentials.title')
    expect(onCreated).not.toHaveBeenCalled()
    expect(mockServiceUserQuery).toHaveBeenLastCalledWith({ id: 9 }, { skip: false })
    expect(mockCreate).toHaveBeenCalledWith({
      serviceUserCreate: { name: 'svc-erp-sync', email: 'erp-team@example.com' }
    })
  })

  it('sends no email when the field is blank', async () => {
    renderModal('create')

    type('service-users.field.name', 'svc-erp-sync')
    fireEvent.click(screen.getByText('service-users.create.ok'))

    await waitFor(() => { expect(mockCreate).toHaveBeenCalledWith({ serviceUserCreate: { name: 'svc-erp-sync', email: null } }) })
  })

  it('refuses a name the API would refuse', () => {
    renderModal('create')

    type('service-users.field.name', 'svc erp')

    expect(screen.getByText('service-users.create.ok')).toBeDisabled()
    expect(screen.getByText('service-users.field.name.invalid')).toBeInTheDocument()
  })

  it('creates a service user from a user', async () => {
    renderModal('from-user')

    type('service-users.field.name', 'svc-editor-copy')
    expect(screen.getByText('service-users.create.ok')).toBeDisabled()

    type('service-users.field.source-user', '3')
    fireEvent.click(screen.getByText('service-users.create.ok'))

    await screen.findByText('service-users.create.credentials.title')
    expect(mockCreateFromUser).toHaveBeenCalledWith({
      id: 3,
      serviceUserCreateFromUser: { name: 'svc-editor-copy', email: null }
    })
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('reports a failed creation and keeps the dialog open', async () => {
    mockCreate.mockResolvedValue({ error: { status: 409, data: { message: 'taken' } } })
    renderModal('create')

    type('service-users.field.name', 'svc-erp-sync')
    fireEvent.click(screen.getByText('service-users.create.ok'))

    await waitFor(() => { expect(mockTrackError).toHaveBeenCalledTimes(1) })
    expect(onCreated).not.toHaveBeenCalled()
  })

  it('cannot be dismissed while the creation is pending', () => {
    mockCreating = true
    renderModal('create')

    const cancel = screen.getByText('button.cancel')
    expect(cancel).toBeDisabled()
    fireEvent.click(cancel)

    expect(onCancel).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  describe('credentials step', () => {
    const createAndContinue = async (): Promise<void> => {
      renderModal('create')
      type('service-users.field.name', 'svc-test-token')
      fireEvent.click(screen.getByText('service-users.create.ok'))
      await screen.findByText('service-users.create.credentials.title')
    }

    const clientSecretCredential = { clientId: 'svc_9', clientSecret: 'secret-9' }

    it('offers only an access token when client credentials are disabled and issues it with the chosen lifetime', async () => {
      await createAndContinue()

      expect(screen.getByText('service-users.credentials.issue.title')).toBeInTheDocument()
      expect(screen.getByText('service-users.create.credentials.token-description')).toBeInTheDocument()
      expect(screen.queryByDisplayValue('secret-9')).toBeNull()
      expect(screen.queryByText('service-users.secret.client-secret')).toBeNull()
      expect(screen.queryByText('service-users.create.credentials.which')).toBeNull()
      expect(screen.getByLabelText('service-users.credentials.issue.ttl')).toHaveValue(30)

      type('service-users.credentials.issue.ttl', '1')
      fireEvent.click(screen.getByText('service-users.credentials.issue'))

      await waitFor(() => { expect(onCreated).toHaveBeenCalledWith(9, [accessToken]) })
      expect(mockIssue).toHaveBeenCalledWith({ id: 9, serviceUserMcpTokenRequest: { ttlDays: 1 } })
    })

    it('explains the choice but does not show the client secret inline when client credentials are enabled', async () => {
      instanceWith(true)
      await createAndContinue()

      expect(screen.getByText('service-users.create.credentials.which')).toBeInTheDocument()
      expect(screen.queryByText('service-users.create.credentials.token-description')).toBeNull()
      expect(screen.queryByDisplayValue('secret-9')).toBeNull()
      expect(screen.queryByLabelText('service-users.secret.client-secret')).toBeNull()
      expect(screen.queryByText('service-users.secret.copy')).toBeNull()
      expect(screen.getByLabelText('service-users.credentials.issue.ttl')).toHaveValue(30)
    })

    it('hands over the client secret and the token together when the grant is on and a token is issued', async () => {
      instanceWith(true)
      await createAndContinue()

      fireEvent.click(screen.getByText('service-users.credentials.issue'))

      await waitFor(() => { expect(onCreated).toHaveBeenCalledWith(9, [clientSecretCredential, accessToken]) })
      expect(mockIssue).toHaveBeenCalledWith({ id: 9, serviceUserMcpTokenRequest: { ttlDays: 30 } })
    })

    it('hands over the client secret alone when the grant is on and the token step is skipped', async () => {
      instanceWith(true)
      await createAndContinue()

      fireEvent.click(screen.getByText('service-users.create.credentials.skip'))

      expect(onCreated).toHaveBeenCalledWith(9, [clientSecretCredential])
      expect(mockIssue).not.toHaveBeenCalled()
    })

    it('hands over the client secret when the token step is skipped while the detail is still loading', async () => {
      instanceWith(true)
      mockServiceUserQuery.mockImplementation((args: unknown, options: { skip?: boolean }) => ({
        data: undefined,
        isFetching: options.skip !== true
      }))
      await createAndContinue()

      fireEvent.click(screen.getByText('service-users.create.credentials.skip'))

      expect(onCreated).toHaveBeenCalledWith(9, [clientSecretCredential])
    })

    it('hands over nothing when the grant is off and the token step is skipped', async () => {
      await createAndContinue()

      fireEvent.click(screen.getByText('service-users.create.credentials.skip'))

      expect(onCreated).toHaveBeenCalledWith(9, [])
      expect(mockIssue).not.toHaveBeenCalled()
    })

    it('cannot be skipped while the token is being issued', async () => {
      mockIssuing = true
      await createAndContinue()

      const skip = screen.getByText('service-users.create.credentials.skip')
      expect(skip).toBeDisabled()
      fireEvent.click(skip)

      expect(onCreated).not.toHaveBeenCalled()
      expect(screen.getByText('service-users.create.credentials.title')).toBeInTheDocument()
    })

    it('refuses a lifetime outside 1 to 90 days', async () => {
      await createAndContinue()

      type('service-users.credentials.issue.ttl', '0')

      expect(screen.getByText('service-users.credentials.issue')).toBeDisabled()
      expect(screen.getByText('service-users.credentials.issue.ttl.invalid')).toBeInTheDocument()
    })

    it('reports a failed issue and stays on the step', async () => {
      mockIssue.mockResolvedValue({ error: { status: 422 } })
      await createAndContinue()

      fireEvent.click(screen.getByText('service-users.credentials.issue'))

      await waitFor(() => { expect(mockTrackError).toHaveBeenCalledTimes(1) })
      expect(onCreated).not.toHaveBeenCalled()
      expect(screen.getByText('service-users.create.credentials.title')).toBeInTheDocument()
    })
  })
})
