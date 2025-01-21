/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { Avatar } from 'antd'
import React from 'react'
import { useStlyes } from './left-sidebar-view.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { MainNav } from '@Pimcore/modules/app/nav/main-nav'
import { useMainNav } from '@Pimcore/modules/app/nav/hooks/use-main-nav'
import { useDispatch } from 'react-redux'
import { setUser } from '@Pimcore/modules/auth/user/user-slice'
import { useLogoutMutation } from '@Pimcore/modules/auth/authorization-api-slice.gen'

export const LeftSidebarView = (): React.JSX.Element => {
  const { styles } = useStlyes()
  const { addNavItem } = useMainNav()

  const [logout] = useLogoutMutation()

  addNavItem({
    path: 'Settings/Document Types',
    permission: 'documents'
  })

  addNavItem({
    path: 'Tools/Glossary'
  })

  addNavItem({
    path: 'Settings/User & Roles/Users',
    className: 'item-style-modifier',
    widgetConfig: {
      name: 'Users',
      id: 'user-management',
      component: 'user-management',
      config: {
        icon: {
          type: 'name',
          value: 'user'
        }
      }
    }
  })

  addNavItem({
    path: 'Settings/User & Roles/Open ID Connect Config/Configuration'
  })

  addNavItem({
    path: 'Settings',
    icon: 'menu'
  })

  addNavItem({
    path: 'Tools',
    icon: 'accessory'
  })

  addNavItem({
    path: 'Marketing',
    icon: 'marketing'
  })

  addNavItem({
    path: 'Customers',
    icon: 'customers'
  })

  addNavItem({
    path: 'Cache',
    icon: 'cache'
  })

  addNavItem({
    path: 'System Related',
    icon: 'shield'
  })

  const dispatch = useDispatch()
  const handleLogout = async (): Promise<void> => {
    await logout()
    dispatch(setUser({ username: '', isAdmin: false, permissions: [] }))
  }

  return (
    <div className={ styles.leftSidebar }>
      <Avatar
        className='left-sidebar__avatar'
        icon={ <Icon value='user' /> }
        size={ 26 }
      />

      <ul className='left-sidebar__nav'>
        <li>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div onClick={ handleLogout }>Logout</div>
          <MainNav />
        </li>
      </ul>
    </div>
  )
}
