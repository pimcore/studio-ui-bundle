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
import { ServiceUserDetail } from './service-user-detail'
import { type ServiceUser } from '../service-users-api-slice-enhanced'

const mockQueryState: { data?: ServiceUser, isLoading: boolean, error?: unknown } = { isLoading: false }
const mockUpdate = jest.fn()
const mockDeactivate = jest.fn()
const mockDelete = jest.fn()
const mockConfirm = jest.fn()
const mockSuccess = jest.fn()
const mockTrackError = jest.fn()

jest.mock('../service-users-api-slice-enhanced', () => ({
  useServiceUserGetByIdQuery: () => mockQueryState,
  useServiceUserUpdateByIdMutation: () => [mockUpdate, { isLoading: false }],
  useServiceUserDeactivateByIdMutation: () => [mockDeactivate, { isLoading: false }],
  useServiceUserDeleteByIdMutation: () => [mockDelete, { isLoading: false }]
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => { mockTrackError(error) },
  ApiError: class MockApiError {
    constructor (public readonly errorData: unknown) {}
  }
}))
jest.mock('@Pimcore/components/message/useMessage', () => ({
  useMessage: () => ({ success: mockSuccess, error: jest.fn() })
}))
jest.mock('@Pimcore/components/modal/hooks/use-studio-modal', () => ({
  useStudioModal: () => ({ modal: { confirm: mockConfirm } })
}))
jest.mock('./tabs/settings-tab', () => ({
  SettingsTab: ({ draft, onChange }: { draft: { email: string | null, responsibleUsers: number[], responsibleRoles: number[] }, onChange: (change: object) => void }) => (
    <button
      onClick={ () => { onChange({ email: 'new@example.com', responsibleUsers: [3, 4], responsibleRoles: [] }) } }
      type="button"
    >{`email:${draft.email ?? ''}|responsibles:${draft.responsibleUsers.join(',')}|${draft.responsibleRoles.join(',')}`}</button>
  )
}))
jest.mock('./tabs/permissions-tab', () => ({
  PermissionsTab: () => <div>permissions-tab</div>
}))
jest.mock('./tabs/roles-tab', () => ({
  RolesTab: ({ roles, onChange }: { roles: number[], onChange: (roles: number[]) => void }) => (
    <button
      onClick={ () => { onChange([...roles, 2]) } }
      type="button"
    >add-role</button>
  )
}))
jest.mock('./tabs/workspaces-tab', () => ({
  WorkspacesTab: () => <div>workspaces-tab</div>
}))
jest.mock('@Pimcore/components/button/button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/content/content', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/page-layout/page-layout', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/toolbar/toolbar', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/tabs/tabs', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/tag/tag', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/flex/flex', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/text/text', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const serviceUser = (active = true): ServiceUser => ({
  id: 7,
  name: 'svc-erp-sync',
  email: 'erp@example.com',
  active,
  permissions: ['assets'],
  roles: [1],
  classes: ['CAR'],
  docTypes: [],
  assetWorkspaces: [],
  dataObjectWorkspaces: [],
  documentWorkspaces: [],
  clientId: 'svc_7',
  lastLogin: null,
  clientCredentialsEnabled: false,
  mcpTokens: { active: 0, latestExpiresAt: null },
  responsibleUsers: [3],
  responsibleRoles: [1]
})

const onDeleted = jest.fn()

const renderDetail = (): void => {
  render(
    <ServiceUserDetail
      id={ 7 }
      onDeleted={ onDeleted }
    />
  )
}

const toolbar = (): HTMLElement => screen.getAllByRole('toolbar')[0]

describe('ServiceUserDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockQueryState.data = serviceUser()
    mockQueryState.isLoading = false
    mockQueryState.error = undefined
    mockConfirm.mockImplementation(({ onOk }: { onOk: () => Promise<void> }) => { void onOk() })
    mockUpdate.mockResolvedValue({ data: serviceUser() })
    mockDeactivate.mockResolvedValue({ data: serviceUser(false) })
    mockDelete.mockResolvedValue({ data: null })
  })

  it('reports its dirty state upward when a field is edited', () => {
    const onDirtyChange = jest.fn()
    render(
      <ServiceUserDetail
        id={ 7 }
        onDeleted={ onDeleted }
        onDirtyChange={ onDirtyChange }
      />
    )

    expect(onDirtyChange).toHaveBeenLastCalledWith(7, false)

    fireEvent.click(screen.getByText('email:erp@example.com|responsibles:3|1'))

    expect(onDirtyChange).toHaveBeenLastCalledWith(7, true)
  })

  it('shows a loading state', () => {
    mockQueryState.data = undefined
    mockQueryState.isLoading = true
    renderDetail()

    expect(screen.getByTestId('content-loading')).toBeInTheDocument()
  })

  it('offers settings, permissions, roles and workspaces, and nothing for password, 2FA or perspectives', () => {
    renderDetail()

    const tabs = screen.getAllByRole('region').map((section) => section.getAttribute('aria-label'))

    expect(tabs).toEqual(['settings', 'permissions', 'roles', 'workspaces'])
    expect(screen.getByText('svc-erp-sync')).toBeInTheDocument()
  })

  it('saves the changed fields, never the name or the state', async () => {
    renderDetail()
    const save = within(toolbar()).getByText('save')

    expect(save).toBeDisabled()

    fireEvent.click(screen.getByText('add-role'))
    fireEvent.click(screen.getByText('email:erp@example.com|responsibles:3|1'))
    fireEvent.click(within(toolbar()).getByText('save'))

    await waitFor(() => { expect(mockSuccess).toHaveBeenCalledWith('service-users.save.success') })
    expect(mockUpdate).toHaveBeenCalledWith({
      id: 7,
      serviceUserUpdate: {
        email: 'new@example.com',
        permissions: ['assets'],
        roles: [1, 2],
        classes: ['CAR'],
        docTypes: [],
        assetWorkspaces: [],
        dataObjectWorkspaces: [],
        documentWorkspaces: [],
        responsibleUsers: [3, 4],
        responsibleRoles: []
      }
    })
  })

  it('keeps unsaved edits when a refetch changes only the token summary', () => {
    const { rerender } = render(
      <ServiceUserDetail
        id={ 7 }
        onDeleted={ onDeleted }
      />
    )

    fireEvent.click(screen.getByText('email:erp@example.com|responsibles:3|1'))
    expect(screen.getByText('email:new@example.com|responsibles:3,4|')).toBeInTheDocument()

    mockQueryState.data = { ...serviceUser(), mcpTokens: { active: 1, latestExpiresAt: 1_800_000_000 } }
    rerender(
      <ServiceUserDetail
        id={ 7 }
        onDeleted={ onDeleted }
      />
    )

    expect(screen.getByText('email:new@example.com|responsibles:3,4|')).toBeInTheDocument()
    expect(within(toolbar()).getByText('save')).not.toBeDisabled()
  })

  it('keeps an edit made while the refetch after a save is still pending', async () => {
    const { rerender } = render(
      <ServiceUserDetail
        id={ 7 }
        onDeleted={ onDeleted }
      />
    )

    fireEvent.click(screen.getByText('add-role'))
    fireEvent.click(within(toolbar()).getByText('save'))
    await waitFor(() => { expect(mockSuccess).toHaveBeenCalledTimes(1) })

    // Edited after the save was submitted, before the detail query came back.
    fireEvent.click(screen.getByText('email:erp@example.com|responsibles:3|1'))

    mockQueryState.data = { ...serviceUser(), roles: [1, 2] }
    rerender(
      <ServiceUserDetail
        id={ 7 }
        onDeleted={ onDeleted }
      />
    )

    expect(screen.getByText('email:new@example.com|responsibles:3,4|')).toBeInTheDocument()
    expect(within(toolbar()).getByText('save')).not.toBeDisabled()
  })

  it('takes over the loaded values when the editable part changed on the server', () => {
    const { rerender } = render(
      <ServiceUserDetail
        id={ 7 }
        onDeleted={ onDeleted }
      />
    )

    fireEvent.click(screen.getByText('email:erp@example.com|responsibles:3|1'))

    mockQueryState.data = { ...serviceUser(), email: 'other@example.com' }
    rerender(
      <ServiceUserDetail
        id={ 7 }
        onDeleted={ onDeleted }
      />
    )

    expect(screen.getByText('email:other@example.com|responsibles:3|1')).toBeInTheDocument()
  })

  it('deactivates after confirmation', async () => {
    renderDetail()

    fireEvent.click(within(toolbar()).getByText('service-users.deactivate'))

    expect(mockConfirm).toHaveBeenCalledTimes(1)
    await waitFor(() => { expect(mockDeactivate).toHaveBeenCalledWith({ id: 7 }) })
  })

  it('cannot deactivate an inactive service user and marks it inactive', () => {
    mockQueryState.data = serviceUser(false)
    renderDetail()

    expect(within(toolbar()).getByText('service-users.deactivate')).toBeDisabled()
    expect(screen.getByText('service-users.status.inactive')).toBeInTheDocument()
  })

  it('deletes after confirmation', async () => {
    renderDetail()

    fireEvent.click(within(toolbar()).getByText('service-users.delete'))

    await waitFor(() => { expect(onDeleted).toHaveBeenCalledWith(7) })
    expect(mockDelete).toHaveBeenCalledWith({ id: 7 })
  })

  it('keeps the service user when the deletion fails', async () => {
    mockDelete.mockResolvedValue({ error: { status: 500 } })
    renderDetail()

    fireEvent.click(within(toolbar()).getByText('service-users.delete'))

    await waitFor(() => { expect(mockTrackError).toHaveBeenCalledTimes(1) })
    expect(onDeleted).not.toHaveBeenCalled()
  })
})
