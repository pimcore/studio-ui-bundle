/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractMessageHandler } from '@Pimcore/modules/global-message-bus/message-handlers/abstract-message-handler'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { isNil } from 'lodash'
import { api } from '@Pimcore/modules/notifications/notifications-slice-enhanced'
import { store } from '@Pimcore/app/store'
import { selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'

interface NotificationMessagePayload {
  unreadNotificationsCount: number
  notification: {
    id: number
    type: string
    title: string
    read: boolean
    creationDate: number
    recipient: number
    sender: string | null
  }
}

export class NotificationMessageHandler extends AbstractMessageHandler {
  constructor (
    private readonly onMessage: (message: AbstractMercureMessage) => void
  ) {
    super()
  }

  shouldHandle (message: AbstractMercureMessage): boolean {
    const user = selectCurrentUser(store.getState())
    const payload = message.payload as any

    return payload?.notification?.recipient === user.id && !isNil(payload?.notification) && !isNil(payload?.unreadNotificationsCount)
  }

  async handleMessage (message: AbstractMercureMessage): Promise<void> {
    const payload = message.payload as NotificationMessagePayload

    if (isNil(payload.notification)) {
      return
    }

    this.onMessage(message)

    store.dispatch(
      api.util.invalidateTags(invalidatingTags.NOTIFICATIONS())
    )

    store.dispatch(
      api.util.updateQueryData(
        'notificationGetUnreadCount',
        undefined,
        () => ({ unreadNotificationsCount: payload.unreadNotificationsCount })
      )
    )
  }

  getId (): string {
    return 'notification-popup-handler'
  }
}
