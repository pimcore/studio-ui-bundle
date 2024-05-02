/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

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
