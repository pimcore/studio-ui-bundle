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

import { Icon } from '@Pimcore/components/icon/icon'
import { MainNav } from '@Pimcore/modules/app/nav/main-nav'
import { Avatar } from 'antd'
import React from 'react'
import { useStyles } from './left-sidebar-view.styles'

export const LeftSidebarView = (): React.JSX.Element => {
  const { styles } = useStyles()

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
