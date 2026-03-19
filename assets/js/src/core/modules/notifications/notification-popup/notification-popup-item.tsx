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
import { Button, Flex, Icon, Text } from '@sdk/components'
import { useTranslation } from 'react-i18next'
import { useStyles } from './notification-popup.styles'

export interface INotificationPopupItem {
  notification: any
  onView: () => void
}

export const NotificationPopupItem = ({ notification, onView }: INotificationPopupItem): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  return (
    <Flex
      align='center'
      gap={ 'extra-small' }
      justify={ 'space-between' }
    >
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
