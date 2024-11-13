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
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { useStlyes } from './left-sidebar-view.styles'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'

export const LeftSidebarView = (): React.JSX.Element => {
  const { styles } = useStlyes()
  const { openMainWidget } = useWidgetManager()

  return (
    <div className={ styles.leftSidebar }>
      <Avatar
        className='left-sidebar__avatar'
        icon={ <UserOutlined /> }
        onClick={ () => {
          openMainWidget({
            name: 'Users',
            icon: 'user-01',
            id: 'user-management',
            component: 'user-management'
          })
        } }
        size={ 26 }
      />
    </div>
  )
}
