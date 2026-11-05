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
const mockTrackError = jest.fn()

jest.mock('../service-users-api-slice-enhanced', () => ({
  useServiceUserCreateMutation: () => [mockCreate, { isLoading: false }],
  useServiceUserCreateFromUserMutation: () => [mockCreateFromUser, { isLoading: false }]
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
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const credentials = { serviceUserId: 9, clientId: 'svc_9', clientSecret: 'secret-9' }

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
    mockCreate.mockResolvedValue({ data: credentials })
    mockCreateFromUser.mockResolvedValue({ data: credentials })
  })

  it('creates a service user with name and contact email and hands over the credentials', async () => {
    renderModal('create')

    type('service-users.field.name', 'svc-erp-sync')
    type('service-users.field.email', 'erp-team@example.com')
    fireEvent.click(screen.getByText('service-users.create.ok'))

    await waitFor(() => { expect(onCreated).toHaveBeenCalledWith(credentials) })
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

    await waitFor(() => { expect(onCreated).toHaveBeenCalledWith(credentials) })
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
})
