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

jest.mock('@Pimcore/modules/user/roles/roles-api-slice-enhanced', () => ({
  useRoleGetCollectionQuery: () => ({
    isLoading: false,
    data: { totalItems: 2, items: [{ id: 1, name: 'editors' }, { id: 2, name: 'integrations' }] }
  })
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
  lastLogin: null
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
        draft={ { email: serviceUser.email } }
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
        draft={ { email: serviceUser.email } }
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
})
