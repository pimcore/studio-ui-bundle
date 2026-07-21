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
import { AnimatePresence, motion } from 'framer-motion'
import { NotificationPopupItem } from './notification-popup-item'
import { openMainWidget } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { useAppDispatch } from '@sdk/app'
import { requestExpandNotification } from '../notifications-ui-slice'
export interface OpenNotification {
  id: number
  title: string
  sender: string | null
  /** Resolves a type specific renderer; absent for notifications written without a type. */
  type?: string
  payload?: string | Record<string, unknown> | null
}

interface NotificationPopupCollapseProps {
  notifications: OpenNotification[]
  onView: (id) => void
}

export const NotificationPopupContent: React.FC<NotificationPopupCollapseProps> = ({ notifications, onView }) => {
  const dispatch = useAppDispatch()
  const reversedNotifications = [...notifications].reverse()

  return (
    <AnimatePresence>
      {reversedNotifications.map((notification) => (
        <motion.div
          animate={ { opacity: 1, height: 'auto' } }
          exit={ { opacity: 0, height: 1 } }
          initial={ { opacity: 0, height: 1 } }
          key={ notification.id }
        >
          <NotificationPopupItem
            notification={ notification }
            onView={ () => {
              onView(notification.id)

              // Opens the widget, or just focuses its tab when it is already open. In that
              // already-open case the mounted widget keeps its original config — the widget
              // container memoises the rendered component — so a config update would never
              // reach the list. The expand request below is a live signal the rows subscribe
              // to directly, which is what makes "View" expand the item whether the widget was
              // already open or not.
              dispatch(openMainWidget({
                component: 'notifications',
                name: 'Notifications',
                id: 'notifications',
                config: {
                  translationKey: 'notifications.label',
                  icon: {
                    type: 'name',
                    value: 'notification-read'
                  },
                  activeNotification: notification.id
                }
              }))
              dispatch(requestExpandNotification(notification.id))
            } }
          />
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
