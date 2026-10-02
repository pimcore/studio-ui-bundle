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
import { render, screen } from '@testing-library/react'
import { type McpServerAccessGrant } from '../../mcp-servers-api-slice.gen'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/user/user-api-slice-enhanced', () => ({
  useUserGetShareCollectionQuery: () => ({ data: { items: [] } })
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

// Renders each row's actions cell from the real column definitions, so the test
// exercises the same cell the grid would render, without the grid itself.
jest.mock('@Pimcore/components/operational-grid/operational-grid', () => {
  const Grid = ({ columns, value }: { columns: Array<{ id?: string, cell?: (info: unknown) => React.ReactNode }>, value: unknown[] }): React.JSX.Element => {
    const actions = columns.find((column) => column.id === 'actions')
    return (
      <div>
        {value.map((row, index) => (
          <div
            data-testid="grant-row"
            key={ index }
          >
            {actions?.cell?.({ row: { index, original: row } })}
          </div>
        ))}
      </div>
    )
  }
  const Operations = (): null => null
  const GridBody = (): null => null
  Grid.Operations = Operations
  Grid.Grid = GridBody
  return { OperationalGrid: Grid }
})

jest.mock('@Pimcore/components/flex/flex', () => ({ Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div> }))
jest.mock('@Pimcore/components/text/text', () => ({ Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }))
jest.mock('@Pimcore/components/title/title', () => ({ Title: ({ children }: { children: React.ReactNode }) => <h5>{children}</h5> }))
jest.mock('@Pimcore/components/switch/switch', () => ({ Switch: (): null => null }))
jest.mock('@Pimcore/components/select/select', () => ({ Select: (): null => null }))
jest.mock('@Pimcore/components/tooltip/tooltip', () => ({ Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</> }))
jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: (): null => null }))

// eslint-disable-next-line import/first
import { SharingFields } from './sharing-fields'

const grant = (name: string): McpServerAccessGrant => ({ name, canRead: true, canAccess: true, canEdit: true })

const renderUsers = (sharedUsers: McpServerAccessGrant[], disabled = false): void => {
  render(
    <SharingFields
      disabled={ disabled }
      onShareGlobalChange={ jest.fn() }
      onSharedRolesChange={ jest.fn() }
      onSharedUsersChange={ jest.fn() }
      ownerName="owner"
      shareGlobal={ false }
      sharedRoles={ [] }
      sharedUsers={ sharedUsers }
    />
  )
}

describe('SharingFields', () => {
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
})
