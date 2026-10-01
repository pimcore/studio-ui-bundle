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
import { NotificationSettingsView } from './notification-settings-view'
import type {
  NotificationAvailableChannel,
  NotificationSubscribableType
} from '../notifications-slice.gen'
import { type NotificationDraft } from './hooks/use-notification-settings-draft'

const hasDynamicType = jest.fn((id: string) => id === 'email' || id === 'popup')

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: () => ({
      hasDynamicType: (id: string) => hasDynamicType(id),
      getDynamicType: (id: string) => ({ id, icon: id })
    })
  }
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@sdk/components', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Icon: ({ value }: { value: string }) => <span data-testid={ `icon-${value}` } />,
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))

// Antd primitives are stubbed with the semantics the assertions rely on (accessible name,
// disabled, checked). The cell's own decision — switch versus dash — stays under test.
jest.mock('@Pimcore/components/switch/switch', () => ({
  Switch: ({ checked, disabled, onChange, ...props }: {
    checked: boolean
    disabled?: boolean
    onChange?: (checked: boolean) => void
    'aria-label': string
  }) => (
    <button
      aria-label={ props['aria-label'] }
      aria-pressed={ checked }
      disabled={ disabled }
      onClick={ () => onChange?.(!checked) }
      type='button'
    />
  )
}))

jest.mock('@Pimcore/components/tooltip/tooltip', () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@Pimcore/components/text/text', () => ({
  Text: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}))

jest.mock('./notification-settings.styles', () => ({
  useStyles: () => ({
    styles: {
      table: 'table',
      row: 'row',
      head: 'head',
      groupRow: 'groupRow',
      typeColumn: 'typeColumn',
      cellColumn: 'cellColumn'
    }
  })
}))

const type = (
  typeId: string,
  group: string,
  channels: Array<[string, boolean, boolean]>,
  overrides: Partial<NotificationSubscribableType> = {}
): NotificationSubscribableType => ({
  typeId,
  translationKey: `${typeId}.label`,
  descriptionKey: `${typeId}.description`,
  group,
  sortOrder: 10,
  subscribed: true,
  subscriptionLocked: false,
  channels: channels.map(([id, enabled, supported]) => ({ id, enabled, supported })),
  ...overrides
})

const draftFor = (items: NotificationSubscribableType[]): NotificationDraft => {
  const draft: NotificationDraft = {}

  items.forEach((item) => {
    draft[item.typeId] = {
      subscribed: item.subscribed,
      channels: new Set(item.channels.filter((c) => c.enabled).map((c) => c.id))
    }
  })

  return draft
}

const POPUP: NotificationAvailableChannel = { id: 'popup', translationKey: 'notifications.channel.popup' }
const EMAIL: NotificationAvailableChannel = { id: 'email', translationKey: 'notifications.channel.email' }

const renderView = (
  items: NotificationSubscribableType[],
  availableChannels: NotificationAvailableChannel[],
  handlers: Partial<{
    onSubscribedChange: (typeId: string, subscribed: boolean) => void
    onChannelChange: (typeId: string, channelId: string, enabled: boolean) => void
  }> = {}
): void => {
  render(
    <NotificationSettingsView
      availableChannels={ availableChannels }
      draft={ draftFor(items) }
      items={ items }
      onChannelChange={ handlers.onChannelChange ?? jest.fn() }
      onSubscribedChange={ handlers.onSubscribedChange ?? jest.fn() }
    />
  )
}

describe('NotificationSettingsView', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders one column per available channel', () => {
    renderView([type('info', 'general', [['popup', true, true], ['email', false, true]])], [POPUP, EMAIL])

    expect(screen.getByText('notifications.channel.popup')).toBeInTheDocument()
    expect(screen.getByText('notifications.channel.email')).toBeInTheDocument()
  })

  it('renders no channel column when only the pop-up is available', () => {
    renderView([type('info', 'general', [['popup', true, true]])], [POPUP])

    expect(screen.getByText('notifications.channel.popup')).toBeInTheDocument()
    expect(screen.queryByText('notifications.channel.email')).not.toBeInTheDocument()
  })

  it('renders a dash for a channel the type cannot use', () => {
    renderView([type('info', 'general', [['popup', true, true], ['email', false, false]])], [POPUP, EMAIL])

    expect(screen.getByText('—')).toBeInTheDocument()
  })

  it('renders a switch for a channel the type supports', async () => {
    const onChannelChange = jest.fn()

    renderView(
      [type('collab.mention', 'tasks', [['popup', true, true], ['email', false, true]])],
      [POPUP, EMAIL],
      { onChannelChange }
    )

    await userEvent.click(
      screen.getByLabelText('notifications.channel.email collab.mention.label')
    )

    expect(onChannelChange).toHaveBeenCalledWith('collab.mention', 'email', true)
  })

  /** Channels are meaningless while the type itself is off. */
  it('disables channel switches when the type is unsubscribed', () => {
    renderView(
      [type('collab.mention', 'tasks', [['popup', false, true]], { subscribed: false })],
      [POPUP]
    )

    expect(screen.getByLabelText('notifications.channel.popup collab.mention.label')).toBeDisabled()
  })

  it('disables the subscribe switch for a locked type', () => {
    renderView(
      [type('info', 'general', [['popup', true, true]], { subscriptionLocked: true })],
      [POPUP]
    )

    expect(
      screen.getByLabelText('notifications.settings.column.subscribed info.label')
    ).toBeDisabled()
  })

  it('omits group headings when every type shares one group', () => {
    renderView([type('info', 'general', [['popup', true, true]])], [POPUP])

    expect(screen.queryByText('notifications.settings.group.general')).not.toBeInTheDocument()
  })

  it('shows group headings once more than one group exists', () => {
    renderView(
      [
        type('collab.mention', 'tasks', [['popup', true, true]]),
        type('info', 'general', [['popup', true, true]])
      ],
      [POPUP]
    )

    expect(screen.getByText('notifications.settings.group.tasks')).toBeInTheDocument()
    expect(screen.getByText('notifications.settings.group.general')).toBeInTheDocument()
  })

  it('falls back to a generic icon for a channel with no registered presentation', () => {
    hasDynamicType.mockImplementation((id: string) => id === 'popup')

    renderView(
      [type('collab.mention', 'tasks', [['popup', true, true], ['teams', false, true]])],
      [POPUP, { id: 'teams', translationKey: 'notifications.channel.teams' }]
    )

    expect(screen.getByText('notifications.channel.teams')).toBeInTheDocument()
    expect(screen.getByTestId('icon-notification-read')).toBeInTheDocument()
  })
})
