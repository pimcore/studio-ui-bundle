/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import React from 'react'
import { LeftSidebarView } from './left-sidebar-view'
import { WidgetManagerContainer } from '@Pimcore/modules/widget-manager/widget-manager-container'
import { RightSidebarView } from './right-sidebar-view'
import { useStlyes } from './base-layout-view.styles'

export const BaseLayoutView = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={ ['base-layout', styles.baseLayout].join(' ') }>
      <LeftSidebarView />

      <WidgetManagerContainer />

      <RightSidebarView />
    </div>
  )
}
