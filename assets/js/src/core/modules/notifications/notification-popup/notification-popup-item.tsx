/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Button, Flex, Icon, Text } from '@sdk/components'
import { useTranslation } from 'react-i18next'
import { useStyles } from './notification-popup.styles'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeNotificationRegistry } from '../dynamic-types/registry/dynamic-type-notification-registry'
import { parseNotificationPayload } from '../utils/notification-payload'

export interface INotificationPopupNotification {
  id: number
  title: string
  sender: string | null
  type?: string
  payload?: string | Record<string, unknown> | null
}

export interface INotificationPopupItem {
  notification: INotificationPopupNotification
  onView: () => void
}

export const NotificationPopupItem = ({ notification, onView }: INotificationPopupItem): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  // A notification type may render its own content — thread context, an excerpt, a status.
  // Types without a definition, and definitions that decline to render a toast, fall through
  // to the plain title-and-sender treatment below.
  const customContent = useMemo(() => {
    const type = notification.type

    if (type === undefined || type === '') {
      return null
    }

    const registry = container.get<DynamicTypeNotificationRegistry>(
      serviceIds['DynamicTypes/NotificationRegistry']
    )

    if (!registry.hasDynamicType(type)) {
      return null
    }

    return registry.getDynamicType(type).getPopupContent({
      type,
      title: notification.title,
      sender: notification.sender,
      payload: parseNotificationPayload(notification.payload)
    })
  }, [notification.type, notification.id, notification.title, notification.sender, notification.payload])

  return (
    <Flex
      align='center'
      gap={ 'extra-small' }
      justify={ 'space-between' }
    >
      {customContent ?? (
        <Flex
          align='center'
          gap={ 'mini' }
        >
          <Icon
            className={ styles.notificationPopupIcon }
            value='notification-unread'
          />
          <Text strong>{ notification.title }</Text>
          <Text type={ 'secondary' }>{notification.sender}</Text>
        </Flex>
      )}
      {/* The action stays host-owned so every renderer keeps the route into the bell. */}
      <Button
        className={ styles.notificationPopupButton }
        onClick={ onView }
        type='link'
      >
        {t('notifications.new-notifications.show')}
      </Button>
    </Flex>
  )
}
