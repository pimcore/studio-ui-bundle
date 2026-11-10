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
import { ServiceUsersContainer } from './service-users-container'

const token = { token: 'pmcp_shown-once', expiresAt: 1_800_000_000 }

jest.mock('./service-users-api-slice-enhanced', () => ({
  useServiceUserGetCollectionQuery: () => ({
    data: { totalItems: 1, items: [{ id: 4, name: 'svc-existing' }] },
    isLoading: false,
    refetch: jest.fn()
  })
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: jest.fn()
}))
jest.mock('@Pimcore/components/predefined-layouts/config/config-layout', () => ({
  ConfigLayout: ({ leftItem, rightItem }: { leftItem: { children: React.ReactNode }, rightItem: { children: React.ReactNode } }) => (
    <div>{leftItem.children}{rightItem.children}</div>
  )
}))
jest.mock('@Pimcore/components/content/content', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('./list/service-user-list', () => ({
  ServiceUserList: ({ serviceUsers, onSelect, onCreate, onCreateFromUser }: {
    serviceUsers: Array<{ id: number, name: string }>
    onSelect: (id: number) => void
    onCreate: () => void
    onCreateFromUser: () => void
  }) => (
    <div>
      {serviceUsers.map((item) => (
        <button
          key={ item.id }
          onClick={ () => { onSelect(item.id) } }
          type="button"
        >{item.name}</button>
      ))}
      <button
        onClick={ onCreate }
        type="button"
      >create</button>
      <button
        onClick={ onCreateFromUser }
        type="button"
      >create-from-user</button>
    </div>
  )
}))
jest.mock('./detail/service-user-detail', () => ({
  ServiceUserDetail: ({ id, onDeleted }: { id: number, onDeleted: (id: number) => void }) => (
    <button
      onClick={ () => { onDeleted(id) } }
      type="button"
    >{`detail:${id}`}</button>
  )
}))
jest.mock('./create/create-service-user-modal', () => ({
  CreateServiceUserModal: ({ open, mode, onCreated }: {
    open: boolean
    mode: string
    onCreated: (serviceUserId: number, issued?: unknown) => void
  }) => open
    ? (
      <>
        <button
          onClick={ () => { onCreated(9, token) } }
          type="button"
        >{`submit:${mode}`}</button>
        <button
          onClick={ () => { onCreated(9) } }
          type="button"
        >{`skip:${mode}`}</button>
      </>
      )
    : null
}))
jest.mock('./credentials/one-time-secret-modal', () => ({
  OneTimeSecretModal: ({ credential, onClose }: { credential?: { token: string }, onClose: () => void }) =>
    credential === undefined
      ? null
      : (
        <button
          onClick={ onClose }
          type="button"
        >{`secret:${credential.token}`}</button>
        )
}))

describe('ServiceUsersContainer', () => {
  it('opens the editor of the selected service user', () => {
    render(<ServiceUsersContainer />)

    expect(screen.getByTestId('content-none')).toBeInTheDocument()

    fireEvent.click(screen.getByText('svc-existing'))

    expect(screen.getByText('detail:4')).toBeInTheDocument()
  })

  it('shows the issued token once after creating and opens the new service user', () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('create'))
    fireEvent.click(screen.getByText('submit:create'))

    expect(screen.queryByText('submit:create')).toBeNull()
    expect(screen.getByText('detail:9')).toBeInTheDocument()

    fireEvent.click(screen.getByText('secret:pmcp_shown-once'))

    expect(screen.queryByText('secret:pmcp_shown-once')).toBeNull()
  })

  it('opens the new service user without a one-time modal when the token step was skipped', () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('create'))
    fireEvent.click(screen.getByText('skip:create'))

    expect(screen.getByText('detail:9')).toBeInTheDocument()
    expect(screen.queryByText(/^secret:/)).toBeNull()
  })

  it('creates from a user in the from-user mode', () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('create-from-user'))

    expect(screen.getByText('submit:from-user')).toBeInTheDocument()
  })

  it('closes the editor after a deletion', () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.click(screen.getByText('detail:4'))

    expect(screen.queryByText('detail:4')).toBeNull()
  })
})
