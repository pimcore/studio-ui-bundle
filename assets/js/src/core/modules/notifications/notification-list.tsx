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
import { useNotifications } from './hooks/use-notifications'
import { NotificationDetail } from './notification-detail'

export const NotificationList = (): React.JSX.Element => {
  const {
    notifications
  } = useNotifications()

  return (
    <>{notifications?.items.map(notification => (
      <NotificationDetail
        key={ notification.id }
        notification={ notification }
      />
    ))}</>
  )
}
