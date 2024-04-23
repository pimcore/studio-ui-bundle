import { Icon } from '@Pimcore/components/icon/icon'
import React, { type ReactNode, useState } from 'react'
import { useStyle } from '@Pimcore/components/notification/notification-content.style'
import { Button } from 'antd'

interface ICompletedAction {
  key: number
  description: string
  descriptionAction: ReactNode
}

export interface INotificationContentProps {
  completedActions?: ICompletedAction[]
  actions?: React.JSX.Element[]
}

export const NotificationContent = ({ actions, completedActions }: INotificationContentProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)

  return (
    <div className={ styles['notification-content'] }>
      <div className={ 'notification-content__header' }>
        <div className={ 'notification-content__header__content' }>
          <div className={ 'notification-content__header__headline' }>
            <div>
              <p>3 actions in progress</p>
              <Button
                className={ 'notification-content__header__headline__collapse-btn' }
                icon={
                  isCollapsed
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
                onClick={ () => { setIsCollapsed(!isCollapsed) } }
              />
            </div>
            <Button type={ 'link' }>Cancel all</Button>
          </div>
        </div>
      </div>

      <div
        className={ [
          'notification-content__content',
          isCollapsed ? 'collapsed' : 'collapse'
        ].join(' ') }
      >
        <div className={ 'notification-content__content__actions' }>
          <div className={ 'notification-content__content__actions__actions' }>
            {actions?.map((action) => (
              <div
                className={ 'notification-content__content__actions__action' }
                key={ action.key }
              >
                {action}
              </div>
            ))}
          </div>
        </div>

        <div className={ 'notification-content__content__completed-actions' }>
          <div className={ 'notification-content__content__completed-actions__headline' }>
            <Icon
              name={ 'check-circle-filled' }
              options={ { width: 14, height: 14 } }
            />
            <p>Completed actions</p>
          </div>

          <div className={ 'notification-content__content__completed-actions__actions' }>
            {completedActions?.map((action) => (
              <div
                className={ 'notification-content__content__completed-actions__actions__action' }
                key={ action.key }
              >
                <p>{action.description}</p>
                {action.descriptionAction}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
