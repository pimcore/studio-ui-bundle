/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { useStyles } from './tabs-toolbar-view.styles'

export interface TabbarToolbarViewProps {
  renderTabbar: ReactNode
  renderToolbar: ReactNode
  dataTestId?: string
}

const TabsToolbarView = (props: TabbarToolbarViewProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div 
      className={ ['tabs-toolbar-layout', styles.tabbarToolbar].join(' ') }
      data-testid={props.dataTestId}
    >
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
