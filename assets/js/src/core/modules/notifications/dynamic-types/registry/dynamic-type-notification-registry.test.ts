/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeNotificationRegistry } from './dynamic-type-notification-registry'
import { DynamicTypeNotificationChannelRegistry } from './dynamic-type-notification-channel-registry'
import { DynamicTypeAbstractNotification } from '../definitions/dynamic-type-abstract-notification'
import { DynamicTypeAbstractNotificationChannel } from '../definitions/dynamic-type-abstract-notification-channel'

const trackError = jest.fn()

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (...args: unknown[]) => trackError(...args),
  GeneralError: class {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

class MentionNotification extends DynamicTypeAbstractNotification {
  readonly id = 'collab.mention'
}

class EmailChannel extends DynamicTypeAbstractNotificationChannel {
  readonly id = 'email'
  readonly icon = 'email'
}

describe('DynamicTypeNotificationRegistry', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('resolves a registered definition by notification type', () => {
    const registry = new DynamicTypeNotificationRegistry()
    const definition = new MentionNotification()

    registry.registerDynamicType(definition)

    expect(registry.hasDynamicType('collab.mention')).toBe(true)
    expect(registry.getDynamicType('collab.mention')).toBe(definition)
  })

  it('reports an unregistered type as absent', () => {
    const registry = new DynamicTypeNotificationRegistry()

    expect(registry.hasDynamicType('collab.mention')).toBe(false)
  })

  it('tracks an error when the same type is registered twice', () => {
    const registry = new DynamicTypeNotificationRegistry()

    registry.registerDynamicType(new MentionNotification())
    registry.registerDynamicType(new MentionNotification())

    expect(trackError).toHaveBeenCalledTimes(1)
  })

  it('renders nothing by default so partial definitions are viable', () => {
    const definition = new MentionNotification()
    const props = { type: 'collab.mention', title: 'Title', sender: null, payload: null }

    expect(definition.getPopupContent(props)).toBeNull()
    expect(definition.getDetailContent(props, { attachment: null })).toBeNull()
    expect(definition.appendsAttachment()).toBe(true)
  })
})

describe('DynamicTypeNotificationChannelRegistry', () => {
  it('resolves channel presentation by channel id', () => {
    const registry = new DynamicTypeNotificationChannelRegistry()
    const channel = new EmailChannel()

    registry.registerDynamicType(channel)

    expect(registry.getDynamicType('email').icon).toBe('email')
  })

  it('reports an unknown channel as absent rather than failing', () => {
    const registry = new DynamicTypeNotificationChannelRegistry()

    expect(registry.hasDynamicType('teams')).toBe(false)
  })
})
