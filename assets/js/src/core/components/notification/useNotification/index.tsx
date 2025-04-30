/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { App } from 'antd'
import { type ArgsProps, type NotificationInstance } from 'antd/es/notification/interface'
import { useStyle } from '@Pimcore/components/notification/notification.style'

export const useNotification = (): readonly [NotificationInstance] => {
  const { notification: notificationApi } = App.useApp()
  const decoratedNotificationApi = { ...notificationApi }
  const { styles } = useStyle()

  decoratedNotificationApi.open = (config: ArgsProps) => {
    notificationApi.open({
      ...config,
      className: styles.notification
    })
  }

  return [decoratedNotificationApi]
}
