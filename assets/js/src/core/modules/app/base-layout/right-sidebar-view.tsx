/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Logo } from '@Pimcore/components/logo/logo'
import React from 'react'
import { useStlyes } from './right-sidebar-view.styles'
import { SlotRenderer } from '../component-registry/slot-renderer'
import { componentConfig } from '../component-registry/component-registry'

const SidebarNavItem = ({ Component, context }: { Component: React.ReactNode, context: { name?: string } }): React.ReactElement => (
  <li key={ context.name }>
    { Component }
  </li>
)

export const RightSidebarView = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={ styles.rightSidebar }>
      {/*<Logo />*/}

      <ul className='right-sidebar__nav'>
        <SlotRenderer
          onRenderComponent={ (Component, context) => (
            <SidebarNavItem
              Component={ Component }
              context={ context }
            />
          ) }
          slot={ componentConfig.rightSidebar.slot.name }
        />
      </ul>
    </div>
  )
}
