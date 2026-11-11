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
import { render, screen, within, fireEvent } from '@testing-library/react'
import { type McpServerAccessGrant } from '../../mcp-servers-api-slice.gen'

const GridContext = React.createContext<{ value: unknown[], onChange: (next: unknown[]) => void }>({ value: [], onChange: () => {} })

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// The users share list holds a service user name here on purpose: the Users grid must not
// rely on the backend filtering service users out of it.
const mockUserShareCollection = { items: [{ username: 'owner' }, { username: 'jane' }, { username: 'svc-c' }] }
jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  useUserGetShareCollectionQuery: () => ({ data: mockUserShareCollection, isLoading: false })
}))

const serviceUsersLoaded = {
  data: { items: [{ name: 'svc-a', active: true }, { name: 'svc-b', active: false }, { name: 'svc-c', active: true }] },
  isLoading: false,
  isError: false
}
// A 403 for an owner who may share but has no user management permission.
const serviceUsersForbidden = { data: undefined, isLoading: false, isError: true }
let mockServiceUsersResult: { data?: { items: Array<{ name: string, active: boolean }> }, isLoading: boolean, isError: boolean } = serviceUsersLoaded
jest.mock('@Pimcore/modules/user/service-users/service-users-api-slice-enhanced', () => ({
  useServiceUserGetCollectionQuery: () => mockServiceUsersResult
}))

jest.mock('@Pimcore/modules/user/roles/roles-api-slice-enhanced', () => ({
  useRoleGetShareCollectionQuery: () => ({ data: { items: [] } })
}))

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ disabled, title, onClick }: { disabled?: boolean, title?: string, onClick?: () => void }) => (
    <button
      data-testid="row-action"
      disabled={ disabled }
      onClick={ onClick }
      title={ title }
      type="button"
    />
  )
}))

// Renders each row's name and actions cells from the real column definitions, the
// column ids, and the add picker's options, without the grid itself.
jest.mock('@Pimcore/components/operational-grid/operational-grid', () => {
  interface Column { id?: string, accessorFn?: unknown, accessorKey?: string, cell?: (info: unknown) => React.ReactNode }
  const Grid = ({ columns, value, onChange, children }: { columns: Column[], value: Array<{ name: string }>, onChange: (next: unknown[]) => void, children: React.ReactNode }): React.JSX.Element => {
    const actions = columns.find((column) => column.id === 'actions')
    const name = columns.find((column) => column.id === 'name')
    const ids = columns.map((column) => column.id ?? column.accessorKey)
    return (
      <div
        data-columns={ ids.join(',') }
        data-testid="grid"
      >
        {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
        <GridContext.Provider value={ { value, onChange } }>{children}</GridContext.Provider>
        {value.map((row, index) => (
          <div
            data-testid="grant-row"
            key={ index }
          >
            {name?.cell?.({ getValue: () => row.name })}
            {actions?.cell?.({ row: { index, original: row } })}
          </div>
        ))}
      </div>
    )
  }
  const Operations = ({ children }: { children: (ops: { addRow: (row: unknown) => void }) => React.ReactNode }): React.JSX.Element => {
    const ctx = React.useContext(GridContext)
    return <>{children({ addRow: (row: unknown) => { ctx.onChange([...ctx.value, row]) } })}</>
  }
  const GridBody = (): null => null
  Grid.Operations = Operations
  Grid.Grid = GridBody
  return { OperationalGrid: Grid }
})

jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }))
jest.mock('@Pimcore/components/title/title', () => ({ Title: ({ children }: { children: React.ReactNode }) => <h5>{children}</h5> }))
jest.mock('@Pimcore/components/switch/switch', () => ({ Switch: (): null => null }))
jest.mock('@Pimcore/components/select/select', () => ({
  Select: ({ options, onChange }: { options: Array<{ value: string }>, onChange: (name: string) => void }) => (
    <div data-testid="picker">
      {options.map((option) => (
        <button
          data-testid={ `pick-${option.value}` }
          key={ option.value }
          onClick={ () => { onChange(option.value) } }
          type="button"
        />
      ))}
    </div>
  )
}))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({ Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: (): null => null }))

// eslint-disable-next-line import/first
import { SharingFields } from './sharing-fields'

const grant = (name: string): McpServerAccessGrant => ({ name, canRead: true, canAccess: true, canEdit: true })

const renderUsers = (sharedUsers: McpServerAccessGrant[], disabled = false, onSharedUsersChange = jest.fn(), shareGlobal = false): void => {
  render(
    <SharingFields
      disabled={ disabled }
      onShareGlobalChange={ jest.fn() }
      onSharedRolesChange={ jest.fn() }
      onSharedUsersChange={ onSharedUsersChange }
      ownerName="owner"
      shareGlobal={ shareGlobal }
      sharedRoles={ [] }
      sharedUsers={ sharedUsers }
    />
  )
}

describe('SharingFields', () => {
  beforeEach(() => {
    mockServiceUsersResult = serviceUsersLoaded
  })

  // The owner's row is locked: removing it would drop the owner's MCP Server Access
  // while their implicit Read + Edit stay; revoking Access is done with its checkbox.
  it('does not let the owner row be removed', () => {
    renderUsers([grant('owner'), grant('jane')])

    const [ownerRemove, janeRemove] = screen.getAllByTestId('row-action')
    expect(ownerRemove).toBeDisabled()
    expect(janeRemove).toBeEnabled()
  })

  // A new private server seeds the owner row with Config Read + Edit but without
  // MCP Server Access, so nobody can connect yet and the summary must not claim
  // that admins or the owner can.
  it('reports that nobody can connect for a default private server', () => {
    renderUsers([{ name: 'owner', canRead: true, canEdit: true, canAccess: false }])

    expect(screen.getByText('mcp-servers.sharing.who-can-access: mcp-servers.access.nobody')).toBeInTheDocument()
  })

  it('gives the icon-only remove control an accessible name', () => {
    renderUsers([grant('jane')])

    expect(screen.getByTestId('row-action')).toHaveAttribute('title', 'delete')
  })

  describe('service users', () => {
    const svc = (name: string): McpServerAccessGrant => ({ name, canRead: false, canEdit: false, canAccess: true })
    const grids = (): HTMLElement[] => screen.getAllByTestId('grid')
    const names = (grid: HTMLElement): string[] => within(grid).getAllByTestId('grant-row').map((row) => row.textContent ?? '')

    it('splits sharedUsers by name into the Users and Service users grids', () => {
      renderUsers([grant('owner'), svc('svc-a'), grant('jane')])

      const [users, , serviceUsers] = grids()
      expect(names(users)).toEqual(['owner', 'jane'])
      expect(names(serviceUsers)).toEqual(['svc-a'])
    })

    it('hides the Config Read and Config Edit columns for service users only', () => {
      renderUsers([])

      const [users, , serviceUsers] = grids()
      expect(users.dataset.columns).toBe('name,canRead,canEdit,canAccess,actions')
      expect(serviceUsers.dataset.columns).toBe('name,canAccess,actions')
    })

    it('hides all three grids while sharing globally', () => {
      renderUsers([], false, jest.fn(), true)

      expect(screen.queryAllByTestId('grid')).toHaveLength(0)
      expect(screen.queryByText('mcp-servers.sharing.service-users')).not.toBeInTheDocument()
    })

    it('shows the hint under the Service users title', () => {
      renderUsers([])

      expect(screen.getByText('mcp-servers.sharing.service-users-hint')).toBeInTheDocument()
    })

    it('adds a service user as an access-only entry and keeps the human grants', () => {
      const onChange = jest.fn()
      renderUsers([grant('jane')], false, onChange)

      const serviceUsers = grids()[2]
      fireEvent.click(within(serviceUsers.parentElement!).getAllByTestId('pick-svc-a')[0])

      expect(onChange).toHaveBeenCalledWith([grant('jane'), { name: 'svc-a', canRead: false, canEdit: false, canAccess: true }])
    })

    it('removes a service user from sharedUsers', () => {
      const onChange = jest.fn()
      renderUsers([grant('jane'), svc('svc-a')], false, onChange)

      const [removeJane, removeSvc] = screen.getAllByTestId('row-action')
      expect(removeJane).toBeEnabled()
      fireEvent.click(removeSvc)

      expect(onChange).toHaveBeenCalledWith([grant('jane')])
    })

    it('never offers a service user to the users grid, nor a human to the service users grid', () => {
      renderUsers([svc('svc-a')])

      const picks = screen.getAllByTestId(/^pick-/).map((button) => button.dataset.testid)
      // users picker: owner, jane (svc-c from the share list is a service user);
      // service users picker: svc-b, svc-c (svc-a is already granted)
      expect(picks).toEqual(['pick-owner', 'pick-jane', 'pick-svc-b', 'pick-svc-c'])
    })

    describe('when the service users cannot be loaded', () => {
      beforeEach(() => {
        mockServiceUsersResult = serviceUsersForbidden
      })

      it('keeps service-user grants out of the Users grid and hides the Service users grid', () => {
        renderUsers([grant('jane'), svc('svc-x')])

        const users = grids()
        expect(users).toHaveLength(2)
        expect(names(users[0])).toEqual(['jane'])
        expect(screen.queryByText('mcp-servers.sharing.service-users-hint')).not.toBeInTheDocument()
        expect(screen.getByText('mcp-servers.sharing.service-users-unavailable')).toBeInTheDocument()
      })

      it('keeps the service-user grants when a human user is added', () => {
        const onChange = jest.fn()
        renderUsers([grant('jane'), svc('svc-x')], false, onChange)

        fireEvent.click(screen.getByTestId('pick-owner'))

        expect(onChange).toHaveBeenCalledWith([grant('jane'), expect.objectContaining({ name: 'owner' }), svc('svc-x')])
      })

      it('still counts the service-user grants as service users in the summary', () => {
        renderUsers([grant('jane'), svc('svc-x')])

        expect(screen.getByText(/mcp-servers.access.users-count/)).toBeInTheDocument()
        expect(screen.getByText(/mcp-servers.access.service-users-count/)).toBeInTheDocument()
      })
    })

    it('counts service users separately in the summary', () => {
      renderUsers([grant('jane'), svc('svc-a'), svc('svc-c')])

      expect(screen.getByText(/mcp-servers.access.users-count/)).toBeInTheDocument()
      expect(screen.getByText(/mcp-servers.access.service-users-count/)).toBeInTheDocument()
    })

    it('marks a deactivated service user as inactive and keeps the grant', () => {
      renderUsers([svc('svc-a'), svc('svc-b')])

      const [activeRow, inactiveRow] = within(grids()[2]).getAllByTestId('grant-row')
      expect(within(activeRow).queryByText('mcp-servers.sharing.inactive')).not.toBeInTheDocument()
      expect(within(inactiveRow).getByText('mcp-servers.sharing.inactive')).toBeInTheDocument()
    })
  })
})
