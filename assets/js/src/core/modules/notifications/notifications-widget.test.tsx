/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type NotificationsSectionRequest } from './notifications-ui-slice'
import { NotificationsWidget } from './notifications-widget'

const dispatch = jest.fn()
let sectionRequest: NotificationsSectionRequest | null = null

// The ui slice self-registers with the app store on import, which would drag the whole router
// graph (and its ESM-only deps) into the test. jest hoists this above the imports.
jest.mock('@sdk/app', () => ({
  injectSliceWithState: jest.fn()
}))

jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => dispatch,
  useAppSelector: (selector: unknown) => {
    void selector

    return sectionRequest
  }
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// The layout chrome carries no behaviour under test; the tab bar and the panes do.
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ renderTopBar, children }: { renderTopBar?: React.ReactNode, children: React.ReactNode }) => (
    <div>
      {renderTopBar}
      {children}
    </div>
  )
}))

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

jest.mock('@Pimcore/components/title/title', () => ({
  Title: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>
}))

jest.mock('@sdk/components', () => ({
  Header: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  IconTextButton: ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => (
    <button
      onClick={ onClick }
      type='button'
    >{children}</button>
  )
}))

// Stubbed with antd's own mounting semantics, including `destroyInactiveTabPane`, so the
// round-trip test below fails if that prop is ever added to this widget — which is what would
// silently discard an unsaved settings draft on a section switch.
jest.mock('@Pimcore/components/tabs/tabs', () => ({
  Tabs: ({ items, activeKey, onChange, destroyInactiveTabPane }: {
    items: Array<{ key: string, label: string, children: React.ReactNode }>
    activeKey: string
    onChange: (key: string) => void
    destroyInactiveTabPane?: boolean
  }) => (
    <div>
      {items.map((item) => (
        <button
          key={ item.key }
          onClick={ () => { onChange(item.key) } }
          type='button'
        >{item.label}</button>
      ))}
      {items.map((item) => {
        const active = item.key === activeKey

        return (
          <div
            data-testid={ `pane-${item.key}` }
            hidden={ !active }
            key={ item.key }
          >{destroyInactiveTabPane === true && !active ? null : item.children}</div>
        )
      })}
    </div>
  )
}))

jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: () => true
}))

// Each section is represented by a marker that remembers how often it mounted, so a remount
// (which would discard an unsaved settings draft) is observable.
const mountCounts = { inbox: 0, settings: 0 }

jest.mock('./notifications-container', () => ({
  NotificationsContainer: () => {
    React.useEffect(() => { mountCounts.inbox += 1 }, [])

    return <div>inbox-content</div>
  }
}))

jest.mock('./settings/notification-settings-container', () => ({
  NotificationSettingsContainer: () => {
    React.useEffect(() => { mountCounts.settings += 1 }, [])

    return <div>settings-content</div>
  }
}))

jest.mock('./send-notification/send-notification-modal', () => ({
  SendNotificationModal: ({ open }: { open: boolean }) => (open ? <div>send-modal</div> : null)
}))

describe('NotificationsWidget', () => {
  beforeEach(() => {
    dispatch.mockClear()
    sectionRequest = null
    mountCounts.inbox = 0
    mountCounts.settings = 0
  })

  const activePaneKey = (): string | undefined =>
    ['inbox', 'settings'].find((key) => !screen.getByTestId(`pane-${key}`).hidden)

  it('opens on the inbox', () => {
    render(<NotificationsWidget />)

    expect(activePaneKey()).toBe('inbox')
  })

  it('selects the requested section and acknowledges the request', () => {
    sectionRequest = { section: 'settings', token: 1 }

    render(<NotificationsWidget />)

    expect(activePaneKey()).toBe('settings')
    // Consumed, so the user can leave the section by hand afterwards.
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'notifications-ui/clearNotificationsSectionRequest' })
    )
  })

  it('keeps both panes mounted across a round trip so an unsaved draft survives', async () => {
    const user = userEvent.setup()

    render(<NotificationsWidget />)

    expect(mountCounts.settings).toBe(1)

    await user.click(screen.getByText('notifications.tab.settings'))
    expect(activePaneKey()).toBe('settings')

    await user.click(screen.getByText('notifications.tab.inbox'))
    expect(activePaneKey()).toBe('inbox')

    // Neither section remounted, so neither lost its state.
    expect(mountCounts.inbox).toBe(1)
    expect(mountCounts.settings).toBe(1)
  })

  it('renders the send modal only once the send action is used', async () => {
    const user = userEvent.setup()

    render(<NotificationsWidget />)

    expect(screen.queryByText('send-modal')).not.toBeInTheDocument()

    await user.click(screen.getByText('user-menu.notification.send'))

    expect(screen.getByText('send-modal')).toBeInTheDocument()
  })
})
