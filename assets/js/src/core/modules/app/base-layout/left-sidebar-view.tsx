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
import { Avatar } from 'antd'
import React from 'react'
import { useStyles } from './left-sidebar-view.styles'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
import { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'

// New functional component
const SidebarNavItem = ({ Component, context }: { Component: React.ReactNode, context: { name?: string } }): React.ReactElement => (
  <li key={ context.name }>
    { Component }
  </li>
)

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
        <SlotRenderer
          onRenderComponent={ (Component, context) => (
            <SidebarNavItem
              Component={ Component }
              context={ context }
            />
          ) }
          slot={ componentConfig.leftSidebar.slot }
        />
      </ul>
    </div>
  )
}
