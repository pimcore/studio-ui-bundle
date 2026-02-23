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
import { useStyles } from './notifications.styles'
import {Flex, Icon, Text} from '@sdk/components'
import {Button} from "antd";
import {useNotificationsHelper} from "@Pimcore/modules/notifications/hooks/use-notifications-helper";
import {useTranslation} from "@Pimcore/modules/translations/hooks/use-translation";

export interface INotificationPopupItem {
  notification: any,
  onHideItem: () => void,
}

export const NotificationPopupItem = ({ notification, onHideItem }: INotificationPopupItem): React.JSX.Element => {
  const { styles } = useStyles()
  const {t} = useTranslation()
  const { setNotificationReadById } = useNotificationsHelper()

  return (
      <Flex
          align='center'
          justify='space-between'
      >
        <Flex
            align='center'
            gap={ 'small' }
        >
          <Icon value='notification-unread' className={styles.unreadNotificationIcon} />
          <Text strong>{ notification.title }</Text>
          <Text>{notification.sender}</Text>
        </Flex>
        <Flex gap={ 'mini' }>
          <Button
              onClick={ async () => {
                await setNotificationReadById(notification.id)
                onHideItem()
              } }
              type='link'
          >{t('notifications.mark-as-read')}</Button>
          <Button
              onClick={ onHideItem }
              type='link'
          >{t('notifications.hide')}</Button>
        </Flex>
      </Flex>
  )
}
