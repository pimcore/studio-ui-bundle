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
import { ServiceUserList } from './service-user-list'
import { type ServiceUser } from '../service-users-api-slice-enhanced'

jest.mock('@Pimcore/components/button/button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/icon-button/icon-button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/icon-text-button/icon-text-button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/content/content', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/page-layout/page-layout', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/toolbar/toolbar', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/icon/icon', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/dropdown/dropdown', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/dropdown-button/dropdown-button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/flex/flex', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/text/text', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/tag/tag', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/search-input/search-input', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/input-number/input-number', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('./service-user-list.styles', () => ({
  useStyles: () => ({ styles: {}, cx: (...names: unknown[]) => names.filter(Boolean).join(' ') })
}))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const DAY = 86400
const NOW = 1_800_000_000

const serviceUser = (id: number, name: string, lastLogin: number | null, active = true): ServiceUser => ({
  id,
  name,
  email: null,
  active,
  permissions: [],
  roles: [],
  classes: [],
  docTypes: [],
  assetWorkspaces: [],
  dataObjectWorkspaces: [],
  documentWorkspaces: [],
  clientId: `client-${id}`,
  lastLogin,
  clientCredentialsEnabled: false,
  mcpTokens: { active: 0, latestExpiresAt: null },
  responsibleUsers: [],
  responsibleRoles: []
})

const items = [
  serviceUser(1, 'svc-erp-sync', NOW - DAY),
  serviceUser(2, 'svc-pim-export', NOW - (100 * DAY)),
  serviceUser(3, 'svc-agent', null, false)
]

const handlers = {
  onSelect: jest.fn(),
  onCreate: jest.fn(),
  onCreateFromUser: jest.fn(),
  onRefresh: jest.fn()
}

const renderList = (): void => {
  render(
    <ServiceUserList
      isLoading={ false }
      now={ NOW }
      selectedId={ undefined }
      serviceUsers={ items }
      { ...handlers }
    />
  )
}

describe('ServiceUserList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('lists every service user', () => {
    renderList()

    expect(screen.getByText('svc-erp-sync')).toBeInTheDocument()
    expect(screen.getByText('svc-pim-export')).toBeInTheDocument()
    expect(screen.getByText('svc-agent')).toBeInTheDocument()
  })

  it('marks inactive, never used and long unused service users', () => {
    renderList()

    expect(screen.getByText('service-users.status.inactive')).toBeInTheDocument()
    expect(screen.getByText('service-users.dormancy.never-used')).toBeInTheDocument()
    expect(screen.getByText('service-users.dormancy.warning')).toBeInTheDocument()
  })

  it('shows only the service users unused for more than the given number of days', () => {
    renderList()

    fireEvent.change(screen.getByLabelText('service-users.filter.unused-days'), { target: { value: '30' } })

    expect(screen.queryByText('svc-erp-sync')).toBeNull()
    expect(screen.getByText('svc-pim-export')).toBeInTheDocument()
    expect(screen.getByText('svc-agent')).toBeInTheDocument()
  })

  it('shows every service user again when the filter is cleared', () => {
    renderList()
    const filter = screen.getByLabelText('service-users.filter.unused-days')

    fireEvent.change(filter, { target: { value: '30' } })
    fireEvent.change(filter, { target: { value: '' } })

    expect(screen.getByText('svc-erp-sync')).toBeInTheDocument()
  })

  it('filters by name', () => {
    renderList()

    fireEvent.change(screen.getByLabelText('search'), { target: { value: 'export' } })

    expect(screen.queryByText('svc-erp-sync')).toBeNull()
    expect(screen.getByText('svc-pim-export')).toBeInTheDocument()
  })

  it('selects a service user on click', () => {
    renderList()

    fireEvent.click(screen.getByText('svc-pim-export'))

    expect(handlers.onSelect).toHaveBeenCalledWith(2)
  })

  it('keeps both create actions in one new menu, so the narrow list pane shows them', () => {
    renderList()

    expect(screen.queryByText('service-users.create')).toBeNull()
    expect(screen.queryByText('service-users.create-from-user')).toBeNull()
    expect(screen.getByText('toolbar.new')).toBeInTheDocument()
  })

  it('offers create in the new menu', async () => {
    renderList()

    fireEvent.click(screen.getByText('toolbar.new'))
    fireEvent.click(await screen.findByText('service-users.create'))

    expect(handlers.onCreate).toHaveBeenCalledTimes(1)
    expect(handlers.onCreateFromUser).not.toHaveBeenCalled()
  })

  it('offers create from user in the new menu', async () => {
    renderList()

    fireEvent.click(screen.getByText('toolbar.new'))
    fireEvent.click(await screen.findByText('service-users.create-from-user'))

    expect(handlers.onCreateFromUser).toHaveBeenCalledTimes(1)
    expect(handlers.onCreate).not.toHaveBeenCalled()
  })

  it('reloads the list', () => {
    renderList()

    fireEvent.click(screen.getByText('toolbar.reload'))

    expect(handlers.onRefresh).toHaveBeenCalledTimes(1)
  })
})
