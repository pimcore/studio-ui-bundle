/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Icon } from '@Pimcore/components/icon/icon'
import { Badge, Avatar, type MenuProps } from 'antd'
import React from 'react'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { useTranslation } from 'react-i18next'
import { useStyle } from './user-menu.styles'
import { Button } from '@Pimcore/components/button/button'
import { useLogoutMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useWidgetManager } from '../../../widget-manager/hooks/use-widget-manager'
import { useNotifications } from '../../../notifications/hooks/use-notifications'
import { NOTIFICATIONS } from '../../../notifications/widget-definitions'

interface IUserMenuProps {
  className?: string
}
export const UserMenu = ({ className }: IUserMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()

  const [logout] = useLogoutMutation()
  const { openMainWidget } = useWidgetManager()
  const { getAllNotifications } = useNotifications()

  const openNotificationWidget = async (): Promise<void> => {
    await getAllNotifications()
    openMainWidget(NOTIFICATIONS)
  }

  const handleLogout = (): void => {
    const logoutTask = logout()

    logoutTask.then(() => {
      window.location.reload()
    }).catch((error: Error) => {
      trackError(new ApiError(error))
    })
  }

  const items: MenuProps['items'] = [
    {
      key: 'title',
      label: (
        <div className={ 'user-menu__title' }>{t('user-menu.title')}</div>
      ),
      type: 'group'
    },
    {
      key: 'notifications',
      label: t('user-menu.notifications'),
      icon: <Badge count={ 5 } />,
      onClick: async () => { await openNotificationWidget() },
      extra: <Button
        className={ 'user-menu__item-extra' }
        size={ 'small' }
             >{t('user-menu.notifications-send')}</Button>
    },
    {
      key: 'myprofile',
      label: t('user-menu.my-profile'),
      icon: <Icon value={ 'user' } />,
      onClick: () => {
        console.log('My Profile clicked')
      }
    },
    {
      key: 'logout',
      label: t('user-menu.log-out'),
      icon: <Icon value={ 'log-out' } />,
      onClick: handleLogout
    }
  ]

  return (
    <Dropdown
      className={ className }
      menu={ { items } }
      overlayClassName={ [styles.userMenu].join(' ') }
      overlayStyle={ { minWidth: 275 } }
    >
      <Avatar
        icon={ <Icon value='user' /> }
        size={ 26 }
      />
    </Dropdown>
  )
}
