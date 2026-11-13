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

jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  useUserGetShareCollectionQuery: () => ({ data: { items: [{ id: 3, username: 'jane' }] } })
}))
jest.mock('@Pimcore/modules/user/roles/roles-api-slice-enhanced', () => ({
  useRoleGetCollectionQuery: () => ({
    isLoading: false,
    data: { totalItems: 2, items: [{ id: 1, name: 'editors' }, { id: 2, name: 'integrations' }] }
  }),
  useRoleGetShareCollectionQuery: () => ({ data: { items: [{ id: 9, name: 'ops' }] } })
}))
jest.mock('@Pimcore/components/users-roles-dropdown/users-roles-dropdown', () => ({
  UsersRolesDropdown: ({ initialSharedUsers, initialSharedRoles, onChange }: {
    initialSharedUsers: number[]
    initialSharedRoles: number[]
    onChange: (change: { sharedUsers: number[], sharedRoles: number[] }) => void
  }) => (
    <button
      onClick={ () => { onChange({ sharedUsers: [3, 5], sharedRoles: [9] }) } }
      type="button"
    >{`responsibles:${initialSharedUsers.join(',')}|${initialSharedRoles.join(',')}`}</button>
  )
}))
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
})
