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
import { NotificationDetail } from './notification-detail'
import { useStyles } from './notifications.styles'
import { Space } from '@sdk/components'
import { type NotificationGetCollectionApiResponse } from './notifications-slice-enhanced'

export interface NotificationDetailProps {
  notifications: NotificationGetCollectionApiResponse
}

export const NotificationList = ({ notifications }: NotificationDetailProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Space
      className={ styles.notificationsList }
      direction={ 'vertical' }
      size={ 'small' }
    >{notifications?.items.map(notification => (
      <NotificationDetail
        key={ notification.id }
        notification={ notification }
      />
    ))}</Space>
  )
}
