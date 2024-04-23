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
      duration: 0,
      className: styles.notification
    })
  }

  return [decoratedNotificationApi]
}
