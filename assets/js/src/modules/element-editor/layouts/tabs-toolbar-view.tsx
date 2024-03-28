import React, { type ReactNode } from 'react'
import { useStyles } from './tabs-toolbar-view.styles'

export interface TabbarToolbarViewProps {
  renderTabbar: ReactNode
  renderToolbar: ReactNode
}

const TabsToolbarView = (props: TabbarToolbarViewProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={ ['tabs-toolbar-layout', styles.tabbarToolbar].join(' ') }>
      <div className='tabs-toolbar-layout__tabbar'>
        {props.renderTabbar}
      </div>

      <div className='tabs-toolbar-layout__toolbar'>
        {props.renderToolbar}
      </div>
    </div>
  )
}

export { TabsToolbarView }
