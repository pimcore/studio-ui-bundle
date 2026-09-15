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
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useStyle } from './user-menu.styles'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { Avatar } from '@Pimcore/components/avatar/avatar'
import { useUserHelper } from '@Pimcore/modules/auth/hooks/use-user-helper'
import { useNotificationGetUnreadCountQuery } from '@Pimcore/modules/notifications/notifications-slice.gen'
import { useContextMenuSlot } from '@Pimcore/modules/app/context-menu-registry/use-context-menu-slot'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'

interface IUserMenuProps {
  className?: string
}
export const UserMenu = ({ className }: IUserMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
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

  const notificationCount = data?.unreadNotificationsCount ?? 0

  // Providers must register at module init — useMenuItem() hooks run in slot order.
  const entries = useContextMenuSlot(contextMenuConfig.userMenu.name, {})
    .map((item) => (item !== null && 'icon' in item && item.icon !== undefined
      ? { ...item, icon: <div className={ 'user-menu__item-icon' }>{item.icon}</div> }
      : item))

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
    ...entries
  ]

  return (
    <Dropdown
      className={ className }
      menu={ { items } }
      overlayClassName={ [styles.userMenu].join(' ') }
      overlayStyle={ { minWidth: 275 } }
      trigger={ ['click'] }
    >
      {/* No showZero: permanently on screen, so it goes quiet at nothing to report. */}
      <Badge
        count={ notificationCount }
        data-testid="user-menu-avatar-badge"
        overflowCount={ 99 }
        size={ 'small' }
        styles={ {
          indicator: {
            // Fixed circle; the font steps down instead of the badge growing per digit.
            width: 16,
            height: 16,
            minWidth: 16,
            lineHeight: '16px',
            borderRadius: '50%',
            fontSize: notificationCount > 9 ? 9 : 10,
            fontWeight: 'normal',
            padding: 0
          }
        } }
      >
        <Avatar
          data-testid="user-menu-avatar"
          size={ 26 }
          src={ user?.hasImage && user?.image != null ? user?.image : undefined }
        />
      </Badge>
    </Dropdown>
  )
}
