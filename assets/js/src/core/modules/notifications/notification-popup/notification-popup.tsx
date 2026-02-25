/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useState } from 'react'
import { useGlobalMessageBus } from '@Pimcore/modules/global-message-bus/hooks/use-global-message-bus'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { NotificationMessageHandler } from './handlers/notification-message-handler'
import { NotificationPopupCollapse, type OpenNotification } from './notification-popup-collapse'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { useTranslation } from 'react-i18next'

export const NotificationPopup = (): React.JSX.Element => {
  const { t } = useTranslation()
  const globalMessageBus = useGlobalMessageBus()
  const [notificationApi] = useNotification()
  const [openNotifications, setOpenNotifications] = useState<OpenNotification[]>([])

  const MAX_NOTIFICATIONS = 3
  const POPUP_KEY = 'notification-popup-group'

  const handleMessage = useCallback((message: AbstractMercureMessage) => {
    const payload = message.payload as any
    const notificationData = payload.notification

    setOpenNotifications((prev) => {
      const next = [...prev]
      if (next.length >= MAX_NOTIFICATIONS) {
        next.shift()
      }

      next.push({
        id: notificationData.id,
        title: notificationData.title,
        sender: notificationData.sender
      })

      return next
    })
  }, [])

  useEffect(() => {
    if (openNotifications.length > 0) {
      notificationApi.open({
        key: POPUP_KEY,
        message: t('notifications.label'),
        description: (
          <NotificationPopupCollapse
            notifications={ openNotifications }
            onView={ (id?: number) => {
              setOpenNotifications((prev) => {
                if (id !== undefined) {
                  const newNotifications = prev.filter((notification) => notification.id !== id)
                  if (newNotifications.length === 0) {
                    notificationApi.destroy(POPUP_KEY)
                  }
                  return newNotifications
                }

                notificationApi.destroy(POPUP_KEY)
                return []
              })
            } }
          />
        ),
        placement: 'bottomRight',
        duration: 0,
        closable: false
      })
    }
  }, [openNotifications])

  useEffect(() => {
    const handler = new NotificationMessageHandler(handleMessage)

    globalMessageBus.registerHandler(handler)

    return () => {
      globalMessageBus.unregisterHandler(handler.getId())
    }
  }, [globalMessageBus, handleMessage])

  return <></>
}
