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
  const [mainNavOpen, setMainNavOpen] = React.useState(false)

  const { addNavItem } = useMainNav()
  addNavItem({
    path: 'Settings/User & Roles/Users',
    icon: 'DataObjectOutlined'
  })

  addNavItem({
    path: 'Settings/User & Roles/Roles',
    icon: 'DataObjectOutlined'
  })

  return (
    <div className={ styles.leftSidebar }>
      <Avatar
        className='left-sidebar__avatar'
        icon={ <Icon value='user-01' /> }
        size={ 26 }
      />

      <ul className='left-sidebar__nav'>
        <li>
          <button
            className='left-sidebar__nav-item'
            onClick={ () => { setMainNavOpen(!mainNavOpen) } }
            type='button'
          >
            <Icon
              options={ { width: 21, height: 21 } }
              value={ 'AppstoreOutlined' }
            />
          </button>

          { mainNavOpen
            ? (
              <MainNav />
              )
            : null}
        </li>
      </ul>
    </div>
  )
}
