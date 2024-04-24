import { Icon } from '@Pimcore/components/icon/icon'
import React, { type ReactNode, useState } from 'react'
import { Button } from 'antd'
import { useStyle } from './action-list.style'
import { Progressbar } from '@Pimcore/components/progressbar/progressbar'
import { useTranslation } from 'react-i18next'
import { onKeyEnterExecuteClick } from '@Pimcore/utils/helpers'

interface IActions {
  key: number
  description: string
  progress: number
  progressDetail: string
  completed: boolean
  completedAction?: ReactNode
  cancel: () => void
}

export interface IActionListProps {
  actions: IActions[]
}

export const ActionList = ({ actions }: IActionListProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const { t } = useTranslation()

  const cancelAllActions = (): void => {
    actions.forEach(action => {
      if (!action.completed) {
        action.cancel()
      }
    })
  }

  return (
    <div className={ styles['notification-content'] }>
      <div className={ 'notification-content__header' }>
        <div className={ 'notification-content__header__content' }>
          <div className={ 'notification-content__header__headline' }>
            <div>
              <p>{actions.length} {t('notification.action-list.actions')}</p>
              <Button
                aria-label={ t('aria.notification.action-list.toggle-collapse') }
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
                onKeyDown={ onKeyEnterExecuteClick }
              />
            </div>
            <Button
              aria-label={ t('aria.notification.action-list.cancel-all') }
              onClick={ cancelAllActions }
              onKeyDown={ onKeyEnterExecuteClick }
              type={ 'link' }
            >
              {t('notification.action-list.cancel-all')}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={ [
          'notification-content__content',
          isCollapsed ? 'collapsed' : 'collapse'
        ].join(' ') }
      >
        {actions.filter(action => !action.completed).length > 0 && (
          <div className={ 'notification-content__content__actions' }>
            <div className={ 'notification-content__content__actions__actions' }>
              {actions.filter(action => !action.completed).map((action) => (
                <div
                  aria-label={ action.description }
                  className={ 'notification-content__content__actions__action' }
                  key={ action.key }
                >
                  <Progressbar
                    description={ action.description }
                    descriptionAction={ (
                      <Button
                        aria-label={ `${t('aria.notification.action-list.cancel')} "${action.description}"` }
                        onClick={ action.cancel }
                        onKeyDown={ onKeyEnterExecuteClick }
                        type={ 'link' }
                      >
                        {t('notification.action-list.cancel')}
                      </Button>
                    ) }
                    percent={ action.progress }
                    progressStatus={ action.progressDetail }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {actions.filter(action => action.completed)?.length > 0 && (
          <div className={ 'notification-content__content__completed-actions' }>
            <div className={ 'notification-content__content__completed-actions__headline' }>
              <Icon
                name={ 'check-circle-filled' }
                options={ { width: 14, height: 14 } }
              />
              <p>{t('notification.action-list.completed-actions')}</p>
            </div>

            <div className={ 'notification-content__content__completed-actions__actions' }>
              {actions.filter(action => action.completed)?.map((action) => (
                <div
                  aria-label={ action.description }
                  className={ 'notification-content__content__completed-actions__actions__action' }
                  key={ action.key }
                >
                  <p>{action.description}</p>
                  {action.completedAction}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
