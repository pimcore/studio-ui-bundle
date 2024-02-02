import React from 'react'
import { LeftSidebar } from './left-sidebar'
import { WidgetManager } from '@Pimcore/modules/widget-manager/containers/widget-manager'
import { RightSidebar } from './right-sidebar'
import { useStlyes } from './base-layout.styles'

export const BaseLayout = (): React.JSX.Element => {
  const { styles } = useStlyes()

  return (
    <div className={['base-layout', styles.baseLayout].join(' ')}>
      <LeftSidebar />
      <WidgetManager />
      <RightSidebar />
    </div>
  )
}
