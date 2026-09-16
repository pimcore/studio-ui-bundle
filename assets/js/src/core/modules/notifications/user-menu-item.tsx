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
import { theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { Badge } from '@Pimcore/components/badge/badge'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { type ContextMenuItemProvider } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { useModalHolder } from '@Pimcore/modules/app/modal-holder/use-modal-holder'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { NOTIFICATIONS } from './widget-configs'
import { useNotificationGetUnreadCountQuery } from './notifications-slice.gen'
import { SendNotificationModal } from './send-notification/send-notification-modal'
import { requestNotificationsSection } from './notifications-ui-slice'
import { useAppDispatch } from '@Pimcore/app/store'

const SEND_MODAL_ID = 'user-menu-send-notification'

export const notificationsUserMenuItemProvider: ContextMenuItemProvider = {
  name: 'notifications',
  priority: contextMenuConfig.userMenu.priority.notifications,
  useMenuItem: () => {
    const { t } = useTranslation()
    const { token } = theme.useToken()
    const { openMainWidget } = useWidgetManager()
    const { addModal, removeModal } = useModalHolder()
    const dispatch = useAppDispatch()
    const allowed = isAllowed(UserPermission.Notifications)
    const { data } = useNotificationGetUnreadCountQuery(undefined, { skip: !allowed })

    if (!allowed) {
      return null
    }

    const count = data?.unreadNotificationsCount ?? 0

    return {
      key: 'notifications',
      label: t('user-menu.notifications'),
      icon: (
        <Badge
          count={ count }
          showZero
          styles={ {
            indicator: {
              // A zero goes grey rather than wearing the accent colour.
              background: count > 0 ? token.colorPrimary : token.colorTextQuaternary,
              width: 20,
              height: 20,
              minWidth: 20,
              lineHeight: '20px',
              borderRadius: '50%',
              fontSize: count > 99 ? 9 : 10,
              fontWeight: 'normal',
              padding: 0,
              boxShadow: 'none'
            },
            root: { marginRight: 0 }
          } }
        />
      ),
      onClick: () => {
        openMainWidget(NOTIFICATIONS)
        dispatch(requestNotificationsSection('inbox'))
      },
      // Opens a modal rather than the bell, so it stops the row's onClick. Notification settings
      // are reached through the widget's own Settings section, not from here.
      extra: (
        <Flex
          align={ 'center' }
          gap={ 'mini' }
        >
          {isAllowed(UserPermission.SendNotifications) && (
            <Button
              className={ 'user-menu__item-extra' }
              onClick={ (e) => {
                e.stopPropagation()
                addModal(
                  SEND_MODAL_ID,
                  <SendNotificationModal
                    onClose={ () => { removeModal(SEND_MODAL_ID) } }
                    open
                  />
                )
              } }
              size={ 'small' }
            >{t('user-menu.notification.send')}</Button>
          )}
        </Flex>
      )
    }
  }
}
