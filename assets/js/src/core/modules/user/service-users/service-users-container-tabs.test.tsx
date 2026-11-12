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
import { ServiceUsersContainer } from './service-users-container'
import { setServiceUsersDirty } from './dirty/service-users-dirty-slice'

const token = { token: 'pmcp_shown-once', expiresAt: 1_800_000_000 }

jest.mock('./service-users-api-slice-enhanced', () => ({
  useServiceUserGetCollectionQuery: () => ({
    data: { totalItems: 3, items: [{ id: 4, name: 'svc-existing' }, { id: 5, name: 'svc-second' }, { id: 9, name: 'svc-new' }] },
    isLoading: false,
    refetch: jest.fn()
  })
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: jest.fn()
}))
const mockDispatch = jest.fn()
jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => mockDispatch,
  injectSliceWithState: jest.fn()
}))
jest.mock('@Pimcore/components/page-layout/page-layout', () => ({
  PageLayout: ({ leftItem, rightItem }: { leftItem: { children: React.ReactNode }, rightItem: { children: React.ReactNode } }) => (
    <div>{leftItem.children}{rightItem.children}</div>
  )
}))
jest.mock('@Pimcore/components/content/content', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/tabs/tabs', () => ({
  Tabs: ({ items = [], activeKey, onChange, onClose }: {
    items?: Array<{ key: string, label: React.ReactNode }>
    activeKey?: string
    onChange?: (key: string) => void
    onClose?: (key: string) => void
  }) => (
    <div>
      {items.map((item) => (
        <div
          aria-selected={ item.key === activeKey }
          key={ item.key }
          role="tab"
        >
          <span
            onClick={ () => { onChange?.(item.key) } }
            role="presentation"
          >{item.label}</span>
          <button
            aria-label={ `close:${item.key}` }
            onClick={ () => { onClose?.(item.key) } }
            type="button"
          />
        </div>
      ))}
      {/* The real tab context menu calls onClose once per tab within a single event. */}
      <button
        onClick={ () => { items.forEach((item) => { onClose?.(item.key) }) } }
        type="button"
      >close-all</button>
      <button
        onClick={ () => { items.filter((item) => item.key !== activeKey).forEach((item) => { onClose?.(item.key) }) } }
        type="button"
      >close-others</button>
    </div>
  )
}))
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
  ServiceUserDetail: ({ id, onDeleted, onDirtyChange }: {
    id: number
    onDeleted: (id: number) => void
    onDirtyChange: (id: number, isDirty: boolean) => void
  }) => {
    const [value, setValue] = React.useState('')

    return (
      <div>
        <button
          onClick={ () => { onDeleted(id) } }
          type="button"
        >{`detail:${id}`}</button>
        <input
          aria-label={ `field:${id}` }
          onChange={ (event) => { setValue(event.target.value); onDirtyChange(id, event.target.value !== '') } }
          value={ value }
        />
      </div>
    )
  }
}))
jest.mock('./create/create-service-user-modal', () => ({
  CreateServiceUserModal: ({ open, mode, onCreated }: {
    open: boolean
    mode: string
    onCreated: (serviceUserId: number, issued: unknown[]) => void
  }) => open
    ? (
      <>
        <button
          onClick={ () => { onCreated(9, [token]) } }
          type="button"
        >{`submit:${mode}`}</button>
        <button
          onClick={ () => { onCreated(9, [{ clientId: 'svc_9', clientSecret: 'secret-9' }, token]) } }
          type="button"
        >{`submit-both:${mode}`}</button>
        <button
          onClick={ () => { onCreated(9, []) } }
          type="button"
        >{`skip:${mode}`}</button>
      </>
      )
    : null
}))
jest.mock('./credentials/one-time-secret-modal', () => ({
  OneTimeSecretModal: ({ credentials, onClose }: {
    credentials?: Array<{ token?: string, clientSecret?: string | null }>
    onClose: () => void
  }) =>
    credentials === undefined || credentials.length === 0
      ? null
      : (
        <button
          onClick={ onClose }
          type="button"
        >{`secret:${credentials.map((credential) => credential.token ?? credential.clientSecret).join('+')}`}</button>
        )
}))

describe('ServiceUsersContainer tabs', () => {
  const tabNames = (): string[] => screen.getAllByRole('tab').map((tab) => tab.textContent?.replace(/\s*\*$/, '') ?? '')
  const isActive = (name: string): boolean =>
    screen.getAllByRole('tab').find((tab) => tab.textContent?.startsWith(name))?.getAttribute('aria-selected') === 'true'

  it('opens two service users in two tabs with the second active', () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.click(screen.getByText('svc-second'))

    expect(tabNames()).toEqual(['svc-existing', 'svc-second'])
    expect(isActive('svc-second')).toBe(true)
    expect(isActive('svc-existing')).toBe(false)
  })

  it('does not duplicate a tab when an open row is selected again and keeps edits when switching back', () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.change(screen.getByLabelText('field:4'), { target: { value: 'draft' } })
    fireEvent.click(screen.getByText('svc-second'))
    fireEvent.click(screen.getAllByText('svc-existing', { selector: 'button' })[0])

    expect(screen.getAllByRole('tab')).toHaveLength(2)
    expect(isActive('svc-existing')).toBe(true)
    expect(screen.getByLabelText('field:4')).toHaveValue('draft')
  })

  it('closes a clean tab at once and activates its neighbour', () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.click(screen.getByText('svc-second'))
    fireEvent.click(screen.getByLabelText('close:5'))

    expect(tabNames()).toEqual(['svc-existing'])
    expect(isActive('svc-existing')).toBe(true)
    expect(screen.queryByText('widget-manager.tab-title.close-confirmation')).toBeNull()
  })

  it('shows the content placeholder after the last tab is closed', () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.click(screen.getByLabelText('close:4'))

    expect(screen.getByTestId('content-none')).toBeInTheDocument()
  })

  it('marks a modified tab and asks before closing it', async () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.change(screen.getByLabelText('field:4'), { target: { value: 'draft' } })

    expect(screen.getAllByRole('tab')[0].textContent).toContain('svc-existing *')

    fireEvent.click(screen.getByLabelText('close:4'))

    expect(await screen.findByText('widget-manager.tab-title.close-confirmation')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(1)

    fireEvent.click(screen.getByText('OK'))

    await waitFor(() => { expect(screen.queryAllByRole('tab')).toHaveLength(0) })
  })

  it('closes all tabs from one event of the tab context menu', () => {
    render(<ServiceUsersContainer />)
    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.click(screen.getByText('svc-second'))
    fireEvent.click(screen.getByText('svc-new'))

    fireEvent.click(screen.getByText('close-all'))

    expect(screen.queryAllByRole('tab')).toHaveLength(0)
    expect(screen.getByTestId('content-none')).toBeInTheDocument()
  })

  it('closes the other tabs from one event and keeps the active one', () => {
    render(<ServiceUsersContainer />)
    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.click(screen.getByText('svc-second'))
    fireEvent.click(screen.getByText('svc-new'))
    fireEvent.click(screen.getAllByText('svc-second', { selector: 'span' })[0])

    fireEvent.click(screen.getByText('close-others'))

    expect(tabNames()).toEqual(['svc-second'])
    expect(isActive('svc-second')).toBe(true)
  })

  it('publishes whether any tab has unsaved edits for the widget title', async () => {
    render(<ServiceUsersContainer />)
    expect(mockDispatch).toHaveBeenLastCalledWith(setServiceUsersDirty(false))

    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.change(screen.getByLabelText('field:4'), { target: { value: 'draft' } })
    expect(mockDispatch).toHaveBeenLastCalledWith(setServiceUsersDirty(true))

    fireEvent.click(screen.getByLabelText('close:4'))
    fireEvent.click(await screen.findByText('OK'))
    await waitFor(() => { expect(mockDispatch).toHaveBeenLastCalledWith(setServiceUsersDirty(false)) })
  })

  it('removes the tab of a deleted service user', () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.click(screen.getByText('svc-second'))
    fireEvent.click(screen.getByText('detail:5'))

    expect(tabNames()).toEqual(['svc-existing'])
    expect(isActive('svc-existing')).toBe(true)
  })

  it('opens a created service user as a new active tab', () => {
    render(<ServiceUsersContainer />)

    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.click(screen.getByText('create'))
    fireEvent.click(screen.getByText('skip:create'))

    expect(tabNames()).toEqual(['svc-existing', 'svc-new'])
    expect(isActive('svc-new')).toBe(true)
  })
})

