/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Badge } from '@Pimcore/components/badge/badge'
import { Button } from '@Pimcore/components/button/button'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useLogoutMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { NOTIFICATIONS } from '@Pimcore/modules/notifications'
import { SendNotificationModal } from '@Pimcore/modules/notifications/send-notification/send-notification-modal'
import { useWidgetManager } from '@sdk/modules/widget-manager'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useStyle } from './user-menu.styles'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { USERPROFILE } from '@Pimcore/modules/auth/profile/profile-container'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { Avatar } from 'antd'
import { useUserHelper } from '@Pimcore/modules/auth/hooks/use-user-helper'
import { useNotificationGetUnreadCountQuery } from '@Pimcore/modules/notifications/notifications-slice.gen'

interface IUserMenuProps {
  className?: string
}
export const UserMenu = ({ className }: IUserMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const [sendModal, setSendModal] = useState<boolean>(false)
  const [logout] = useLogoutMutation()
  const { openMainWidget } = useWidgetManager()
  const user = useUser()
  const { getUserImageById, updateUserImageInState } = useUserHelper()
  const { data } = useNotificationGetUnreadCountQuery(undefined, {
    skip: !isAllowed(UserPermission.Notifications)
  })

  useEffect(() => {
    if (user.hasImage) {
      getUserImageById(user.id).then((data) => {
        if (data !== undefined) {
          updateUserImageInState(data, true)
        }
      }).catch((error: Error) => {
        console.error('Error fetching user image:', error)
      })
    }
  }, [])

  const handleLogout = (): void => {
    const logoutTask = logout()

    logoutTask.then(() => {
      window.location.reload()
    }).catch((error: Error) => {
      trackError(new ApiError(error))
    })
  }

  const items: DropdownMenuProps['items'] = [
    {
      key: 'title',
      label: (
        <div className={ 'user-menu__title' }>
          {t('user-menu.title')}
          <span className={ 'user-menu__title-username' }>
            ({user.username})
          </span>
        </div>
      ),
      type: 'group'
    },
    {
      key: 'notifications',
      label: t('user-menu.notifications'),
      icon: <div className={ 'user-menu__item-icon' }>
        <Badge
          count={ data?.unreadNotificationsCount ?? 0 }
          showZero
        />
      </div>,
      onClick: () => { openMainWidget(NOTIFICATIONS) },
      hidden: !isAllowed(UserPermission.Notifications),
      extra: isAllowed(UserPermission.SendNotifications)
        ? (
          <Button
            className={ 'user-menu__item-extra' }
            onClick={ (e) => {
              e.stopPropagation()
              setSendModal(true)
            } }
            size={ 'small' }
          >{t('user-menu.notification.send')}</Button>
          )
        : null
    },
    {
      key: 'myprofile',
      label: t('user-menu.my-profile'),
      icon: <div className={ 'user-menu__item-icon' }><Icon value={ 'user' } /></div>,
      onClick: () => { openMainWidget(USERPROFILE) }
    },
    {
      key: 'logout',
      label: t('user-menu.log-out'),
      icon: <div className={ 'user-menu__item-icon' }><Icon value={ 'log-out' } /></div>,
      onClick: handleLogout
    }
  ]

  return (
    <>
      <Dropdown
        className={ className }
        menu={ { items } }
        overlayClassName={ [styles.userMenu].join(' ') }
        overlayStyle={ { minWidth: 275 } }
        trigger={ ['click'] }
      >
        <Avatar
          data-testid="user-menu-avatar"
          icon={ <Icon value='user' /> }
          size={ 26 }
          src={ user?.hasImage && user?.image != null ? user?.image : undefined }
        ></Avatar>
      </Dropdown>

      <SendNotificationModal
        onClose={ () => { setSendModal(false) } }
        open={ sendModal }
      />
    </>
  )
}
