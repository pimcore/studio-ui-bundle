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
import { Avatar, type MenuProps } from 'antd'
import React, { useState } from 'react'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { useTranslation } from 'react-i18next'
import { useStyle } from './user-menu.styles'
import { useLogoutMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { NOTIFICATIONS } from '@Pimcore/modules/notifications'
import { Button } from '@Pimcore/components/button/button'
import { useWidgetManager } from '@sdk/modules/widget-manager'
import { SendNotificationModal } from '@Pimcore/modules/notifications/send-notification/send-notification-modal'
import { Badge } from '@Pimcore/components/badge/badge'

interface IUserMenuProps {
  className?: string
}
export const UserMenu = ({ className }: IUserMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const [sendModal, setSendModal] = useState<boolean>(false)
  const [logout] = useLogoutMutation()
  const { openMainWidget } = useWidgetManager()

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
        <div className={'user-menu__title'}>{t('user-menu.title')}</div>
      ),
      type: 'group'
    },
    {
      key: 'notifications',
      label: t('user-menu.notifications'),
      icon: <Badge count={5} />,
      onClick: () => { openMainWidget(NOTIFICATIONS) },
      extra: <Button
        className={'user-menu__item-extra'}
        onClick={(e) => {
          e.stopPropagation()
          setSendModal(true)
        }}
        size={'small'}
      >{t('user-menu.notification.send')}</Button>
    },
    {
      key: 'myprofile',
      label: t('user-menu.my-profile'),
      icon: <Icon value={'user'} />,
      onClick: () => {
        console.log('My Profile clicked')
      }
    },
    {
      key: 'logout',
      label: t('user-menu.log-out'),
      icon: <Icon value={'log-out'} />,
      onClick: handleLogout
    }
  ]

  return (
    <>
      <Dropdown
        className={className}
        menu={{ items }}
        overlayClassName={[styles.userMenu].join(' ')}
        overlayStyle={{ minWidth: 275 }}
      >
        <Avatar
          icon={<Icon value='user' />}
          size={26}
        />
      </Dropdown>

      <SendNotificationModal
        onClose={() => { setSendModal(false) }}
        open={sendModal}
      />
    </>
  )
}
