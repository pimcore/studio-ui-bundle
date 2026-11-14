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
import { ServiceUsersContainer } from './service-users-container'
import { setServiceUsersDirty } from './dirty/service-users-dirty-slice'

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
jest.mock('@Pimcore/components/page-layout/page-layout', () => jest.requireActual('./service-users-container.mocks'))
jest.mock('@Pimcore/components/content/content', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/tabs/tabs', () => jest.requireActual('./service-users-container.mocks'))
jest.mock('./list/service-user-list', () => jest.requireActual('./service-users-container.mocks'))
jest.mock('./detail/service-user-detail', () => jest.requireActual('./service-users-container.mocks'))
jest.mock('./create/create-service-user-modal', () => jest.requireActual('./service-users-container.mocks'))
jest.mock('./credentials/one-time-secret-modal', () => jest.requireActual('./service-users-container.mocks'))

describe('ServiceUsersContainer tabs', () => {
  const tabNames = (): string[] => screen.getAllByRole('tab').map((tab) => tab.textContent?.replace(/\s*\*$/, '') ?? '')
  const isActive = (name: string): boolean =>
    screen.getAllByRole('tab').find((tab) => tab.textContent?.startsWith(name))?.getAttribute('aria-selected') === 'true'
  // antd keeps a closed Popconfirm in the DOM, so only the ones not hidden count.
  const visible = (elements: HTMLElement[]): HTMLElement[] =>
    elements.filter((element) => element.closest('.ant-popover-hidden') === null)
  const openConfirmations = (): number => visible(screen.queryAllByText('widget-manager.tab-title.close-confirmation')).length

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
    fireEvent.click(within(screen.getAllByRole('tab')[1]).getByText('svc-second'))

    fireEvent.click(screen.getByText('close-others'))

    expect(tabNames()).toEqual(['svc-second'])
    expect(isActive('svc-second')).toBe(true)
  })

  it('closes the clean tabs of a bulk close at once and asks for the modified one', async () => {
    render(<ServiceUsersContainer />)
    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.click(screen.getByText('svc-second'))
    fireEvent.click(screen.getByText('svc-new'))
    fireEvent.change(screen.getByLabelText('field:5'), { target: { value: 'draft' } })

    fireEvent.click(screen.getByText('close-all'))

    expect(tabNames()).toEqual(['svc-second'])
    expect(await screen.findByText('widget-manager.tab-title.close-confirmation')).toBeInTheDocument()

    fireEvent.click(screen.getByText('OK'))
    await waitFor(() => { expect(screen.queryAllByRole('tab')).toHaveLength(0) })
  })

  it('asks for every modified tab of a bulk close, one after another', async () => {
    render(<ServiceUsersContainer />)
    fireEvent.click(screen.getByText('svc-existing'))
    fireEvent.click(screen.getByText('svc-second'))
    fireEvent.change(screen.getByLabelText('field:4'), { target: { value: 'draft' } })
    fireEvent.change(screen.getByLabelText('field:5'), { target: { value: 'draft' } })

    fireEvent.click(screen.getByText('close-all'))

    expect(tabNames()).toEqual(['svc-existing', 'svc-second'])
    await waitFor(() => { expect(openConfirmations()).toBe(1) })

    // Keeping the first one moves the question on to the second.
    fireEvent.click(visible(screen.getAllByText('Cancel'))[0])
    await waitFor(() => { expect(openConfirmations()).toBe(1) })
    expect(tabNames()).toEqual(['svc-existing', 'svc-second'])

    fireEvent.click(visible(screen.getAllByText('OK'))[0])
    await waitFor(() => { expect(tabNames()).toEqual(['svc-existing']) })
    expect(isActive('svc-existing')).toBe(true)
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

