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
import { Flex, Badge, Avatar, type MenuProps } from 'antd'
import React from 'react'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { useTranslation } from 'react-i18next'
import { useStyle } from './user-menu.styles'
import { Button } from '@Pimcore/components/button/button'

interface IUserMenuProps {
  className?: string
}
export const UserMenu = ({ className }: IUserMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()

  const items: MenuProps['items'] = [
    {
      key: 'title',
      label: (
        <div className={ 'user-menu__title' }>{t('user-menu.title')}</div>
      ),
      disabled: true
    },
    {
      key: 'notifications',
      label: (
        <Flex gap={ 'small' }>
          <Badge
            count={ 5 }
          />
          {t('user-menu.notifications')}

          <Button size={ 'small' }>Send</Button>
        </Flex>
      )
    },
    {
      key: 'myprofile',
      label: (
        <Flex
          gap={ 'small' }
        >
          <Icon value={ 'user' } />
          {t('user-menu.my-profile')}
        </Flex>
      ),
      onClick: () => {
        console.log('My Profile clicked')
      }
    },
    {
      key: 'logout',
      label: (
        <Flex
          gap={ 'small' }
        >
          <Icon value={ 'log-out' } />
          {t('user-menu.log-out')}
        </Flex>
      ),
      onClick: () => {
        console.log('logout clicked')
      }
    }
  ]

  return (
    <Dropdown
      className={ className }
      menu={ { items } }
      overlayClassName={ [styles.userMenu].join(' ') }
    >
      <Avatar
        icon={ <Icon value='user' /> }
        size={ 26 }
      />
    </Dropdown>
  )
}
