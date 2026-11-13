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
import { fireEvent, render, screen } from '@testing-library/react'
import { RolesTab } from './roles-tab'
import { SettingsTab } from './settings-tab'
import { type ServiceUser } from '../../service-users-api-slice-enhanced'

let mockRoleList: { totalItems?: number, items: Array<{ id: number, name: string }> } | undefined = {
  totalItems: 2,
  items: [{ id: 1, name: 'editors' }, { id: 2, name: 'integrations' }]
}
jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  useUserGetCollectionQuery: () => ({ data: { items: [{ id: 3, username: 'jane' }] } })
}))
jest.mock('@Pimcore/modules/user/roles/roles-api-slice-enhanced', () => ({
  useRoleGetCollectionQuery: () => ({
    isLoading: false,
    data: mockRoleList
  })
}))
jest.mock('@Pimcore/components/users-roles-dropdown/users-roles-dropdown', () => {
  // Like the real dropdown, it reads its initial value once into its own state.
  const { useState } = jest.requireActual('react')
  return {
    UsersRolesDropdown: ({ initialSharedUsers, initialSharedRoles, onChange }: {
      initialSharedUsers: number[]
      initialSharedRoles: number[]
      onChange: (change: { sharedUsers: number[], sharedRoles: number[] }) => void
    }) => {
      const [users] = useState(initialSharedUsers)
      const [roles] = useState(initialSharedRoles)
      return (
        <button
          onClick={ () => { onChange({ sharedUsers: [5, 3], sharedRoles: [9] }) } }
          type="button"
        >{`responsibles:${users.join(',')}|${roles.join(',')}`}</button>
      )
    }
  }
})
jest.mock('../../credentials/credentials-section', () => ({
  CredentialsSection: ({ serviceUser }: { serviceUser: { clientId: string } }) => <div>{`credentials:${serviceUser.clientId}`}</div>
}))
jest.mock('@Pimcore/components/select/select', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/input/input', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/flex/flex', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/text/text', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/tag/tag', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/content/content', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const serviceUser: ServiceUser = {
  id: 7,
  name: 'svc-erp-sync',
  email: 'erp@example.com',
  active: true,
  permissions: [],
  roles: [1],
  classes: [],
  docTypes: [],
  assetWorkspaces: [],
  dataObjectWorkspaces: [],
  documentWorkspaces: [],
  clientId: 'svc_7',
  lastLogin: null,
  clientCredentialsEnabled: false,
  mcpTokens: { active: 0, latestExpiresAt: null },
  responsibleUsers: [3],
  responsibleRoles: [9]
}

describe('RolesTab', () => {
  it('assigns roles', () => {
    const onChange = jest.fn()
    render(
      <RolesTab
        onChange={ onChange }
        roles={ [1] }
      />
    )
    const select = screen.getByLabelText('service-users.roles')

    expect(screen.getByText('integrations')).toBeInTheDocument()

    Array.from((select as HTMLSelectElement).options).forEach((option) => { option.selected = true })
    fireEvent.change(select)

    expect(onChange).toHaveBeenCalledWith([1, 2])
  })
})

describe('SettingsTab', () => {
  beforeEach(() => {
    mockRoleList = { items: [{ id: 9, name: 'ops' }] }
  })

  it('shows the name read-only and the credentials', () => {
    render(
      <SettingsTab
        draft={ { email: serviceUser.email, responsibleUsers: [3], responsibleRoles: [9] } }
        onChange={ jest.fn() }
        serviceUser={ serviceUser }
      />
    )

    expect(screen.getByLabelText('service-users.field.name')).toHaveAttribute('readonly')
    expect(screen.getByLabelText('service-users.field.name')).toHaveValue('svc-erp-sync')
    expect(screen.getByText('credentials:svc_7')).toBeInTheDocument()
  })

  it('changes the contact email and clears it to null', () => {
    const onChange = jest.fn()
    render(
      <SettingsTab
        draft={ { email: serviceUser.email, responsibleUsers: [3], responsibleRoles: [9] } }
        onChange={ onChange }
        serviceUser={ serviceUser }
      />
    )
    const email = screen.getByLabelText('service-users.field.email')

    fireEvent.change(email, { target: { value: 'team@example.com' } })
    fireEvent.change(email, { target: { value: '' } })

    expect(onChange).toHaveBeenNthCalledWith(1, { email: 'team@example.com' })
    expect(onChange).toHaveBeenNthCalledWith(2, { email: null })
  })

  it('shows the responsible users and roles and reports a change with both lists', () => {
    const onChange = jest.fn()
    render(
      <SettingsTab
        draft={ { email: serviceUser.email, responsibleUsers: [3], responsibleRoles: [9] } }
        onChange={ onChange }
        serviceUser={ serviceUser }
      />
    )

    expect(screen.getByText('service-users.field.responsible-users')).toBeInTheDocument()
    expect(screen.getByText('service-users.field.responsible-users.help')).toBeInTheDocument()

    fireEvent.click(screen.getByText('responsibles:3|9'))

    expect(onChange).toHaveBeenCalledWith({ responsibleUsers: [3, 5], responsibleRoles: [9] })
  })

  it('does not offer the field while the role list is unavailable, so stored roles are never reclassified', () => {
    mockRoleList = undefined
    render(
      <SettingsTab
        draft={ { email: serviceUser.email, responsibleUsers: [3], responsibleRoles: [9] } }
        onChange={ jest.fn() }
        serviceUser={ serviceUser }
      />
    )

    expect(screen.queryByText('responsibles:3|9')).not.toBeInTheDocument()
  })

  it('shows the new selection when the saved responsibles change', () => {
    const props = { onChange: jest.fn(), draft: { email: serviceUser.email, responsibleUsers: [3], responsibleRoles: [9] } }
    const { rerender } = render(
      <SettingsTab
        { ...props }
        serviceUser={ serviceUser }
      />
    )
    expect(screen.getByText('responsibles:3|9')).toBeInTheDocument()

    rerender(
      <SettingsTab
        draft={ { ...props.draft, responsibleUsers: [3, 4] } }
        onChange={ props.onChange }
        serviceUser={ { ...serviceUser, responsibleUsers: [3, 4] } }
      />
    )

    expect(screen.getByText('responsibles:3,4|9')).toBeInTheDocument()
  })
})
