import {App, notification} from 'antd'
import React, { type ReactNode, useState } from 'react'
import { type ArgsProps, type NotificationInstance } from 'antd/es/notification/interface'
import { useStyle } from '@Pimcore/components/notification/notification.style'
import { Icon } from '@Pimcore/components/icon/icon'

interface ICompletedAction {
  description: string
  descriptionAction: ReactNode
}

interface INotificationConfig extends ArgsProps {
  expandable?: boolean
  title: string
  summary?: ReactNode
  completedActions?: ICompletedAction[]
}

export const useNotification = (): readonly [NotificationInstance] => {
  const {notification: notificationApi} = App.useApp();
  const decoratedNotificationApi = {...notificationApi};
  const { styles } = useStyle()
  const [isCollapsed, setIsCollapsed] = useState(true)

  const collapsableHeader = (config: INotificationConfig): React.JSX.Element => {
    return (
      <div className={ styles['notification-header'] }>
        <div className={ 'notification-header__content' }>
          <div className={ 'notification-header__content_headline' }>
            <p>{config.title}</p>

            <span
              onClick={ () => { setIsCollapsed(!isCollapsed) } }
              onKeyDown={ () => { setIsCollapsed(!isCollapsed) } }
              role={ 'button' }
              tabIndex={ 0 }
            >
              {isCollapsed
                ? (
                  <Icon
                    name={ 'chevron-down-wide' }
                    options={ { width: 22, height: 22 } }
                  />
                  )
                : (
                  <Icon
                    name={ 'chevron-up-wide' }
                    options={ { width: 22, height: 22 } }
                  />
                  )
              }
            </span>

          </div>
          <div className={ 'notification-header__content__summary' }>
            {config.summary}
          </div>
        </div>
      </div>
    )
  }

  const description = (config: INotificationConfig): React.JSX.Element => {
    return (
      <div
        className={ [
          styles['notification-description'],
          isCollapsed ? 'collapse' : 'collapse' // first one "collapsed"
        ].join(' ') }
      >
        {config.description}

        <div className={ 'notification-description__completed-actions' }>
          <div className={ 'notification-description__completed-actions__headline' }>
            <Icon
              name={ 'check-circle-filled' }
              options={ { width: 14, height: 14 } }
            />
            <p>Completed actions</p>
          </div>

          <div className={ 'notification-description__completed-actions__actions' }>
            {config.completedActions?.map((action, index) => (
              <div
                className={ 'notification-description__completed-actions__actions__action' }
                key={ index }
              >
                <p>{action.description}</p>
                {action.descriptionAction}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  decoratedNotificationApi.open = (config: INotificationConfig) => {
    const message = collapsableHeader(config)
    const craftedDescription = description(config)

    notificationApi.open({
      ...config,
      message,
      duration: 0,
      description: craftedDescription,
      className: styles.notification
    })
  }

  return [decoratedNotificationApi]
}
