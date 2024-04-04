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
