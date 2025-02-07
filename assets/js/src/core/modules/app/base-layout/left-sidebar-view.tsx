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

export const LeftSidebarView = (): React.JSX.Element => {
  const { styles } = useStlyes()
  const { addNavItem } = useMainNav()

  addNavItem({
    path: 'Settings/Document Types',
    permission: 'documents'
  })

  addNavItem({
    path: 'Settings/Tag Configuration',
    className: 'item-style-modifier',
    widgetConfig: {
      name: 'Tag Configuration',
      id: 'tag-configuration',
      component: 'tag-configuration',
      config: {
        icon: {
          type: 'name',
          value: 'tag-configuration'
        }
      }
    }
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
    path: 'Settings/User & Roles/Roles',
    widgetConfig: {
      name: 'Roles',
      id: 'role-management',
      component: 'role-management',
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

  return (
    <div className={ styles.leftSidebar }>
      <Avatar
        className='left-sidebar__avatar'
        icon={ <Icon value='user' /> }
        size={ 26 }
      />

      <ul className='left-sidebar__nav'>
        <li>
          <MainNav />
        </li>
      </ul>
    </div>
  )
}
