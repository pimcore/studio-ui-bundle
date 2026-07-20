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
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useLogoutMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { NOTIFICATIONS, NOTIFICATION_SETTINGS } from '@Pimcore/modules/notifications'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useWidgetManager } from '@sdk/modules/widget-manager'
import { theme } from 'antd'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useStyle } from './user-menu.styles'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { USERPROFILE } from '@Pimcore/modules/auth/profile/profile-container'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { Avatar } from '@Pimcore/components/avatar/avatar'
import { useUserHelper } from '@Pimcore/modules/auth/hooks/use-user-helper'
import { useNotificationGetUnreadCountQuery } from '@Pimcore/modules/notifications/notifications-slice.gen'

interface IUserMenuProps {
  className?: string
}
export const UserMenu = ({ className }: IUserMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { token } = theme.useToken()
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

  const notificationCount = data?.unreadNotificationsCount ?? 0

  const items: DropdownMenuProps['items'] = [
    {
      key: 'title',
      label: (
        <div className={ 'user-menu__title' }>
          {t('user-menu.title')}
          {' '}
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
          count={ notificationCount }
          showZero
          styles={ {
            indicator: {
              // Inside the menu the count always shows, but a zero is not news — it goes grey
              // rather than wearing the accent colour.
              background: notificationCount > 0 ? token.colorPrimary : token.colorTextQuaternary,
              width: 20,
              height: 20,
              minWidth: 20,
              lineHeight: '20px',
              borderRadius: '50%',
              fontSize: notificationCount > 99 ? 9 : 10,
              fontWeight: 'normal',
              padding: 0,
              boxShadow: 'none'
            },
            root: { marginRight: 0 }
          } }
        />
      </div>,
      onClick: () => { openMainWidget(NOTIFICATIONS) },
      hidden: !isAllowed(UserPermission.Notifications),
      // Opens the preferences rather than the bell, so the click must not bubble to the row.
      extra: isAllowed(UserPermission.Notifications)
        ? (
          <IconButton
            className={ 'user-menu__item-extra' }
            icon={ { value: 'settings' } }
            onClick={ (e) => {
              e.stopPropagation()
              openMainWidget(NOTIFICATION_SETTINGS)
            } }
            title={ t('notifications.settings.label') }
            type={ 'text' }
          />
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
        {/*
          * Surfaces unread notifications at the top level of the rail. The count comes from the
          * query already feeding the menu item, which the Mercure handler keeps current, so
          * this stays live without any extra fetching or subscription.
          *
          * No showZero: this sits permanently on screen and must go quiet when there is
          * nothing to report.
          */}
        <Badge
          count={ notificationCount }
          data-testid="user-menu-avatar-badge"
          size={ 'small' }
        >
          <Avatar
            data-testid="user-menu-avatar"
            size={ 26 }
            src={ user?.hasImage && user?.image != null ? user?.image : undefined }
          />
        </Badge>
      </Dropdown>
    </>
  )
}
