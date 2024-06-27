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

import React, { type ReactNode } from 'react'
import { useStyles } from './tabs-toolbar-view.styles'
import { ElementToolbar } from '@Pimcore/components/element-toolbar/element-toolbar'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { Result } from 'antd'

export interface TabbarToolbarViewProps {
  renderTabbar: ReactNode
  renderToolbar: ReactNode
}

const TabsToolbarView = (props: TabbarToolbarViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { context } = useGlobalAssetContext()

  if (context === undefined) {
    return <Result title="Missing context" />
  }

  return (
    <div className={ ['tabs-toolbar-layout', styles.tabbarToolbar].join(' ') }>
      <ElementToolbar context={ context } />

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
