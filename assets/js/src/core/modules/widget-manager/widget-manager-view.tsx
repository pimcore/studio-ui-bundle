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

import React from 'react'
import { Layout, type ILayoutProps } from 'flexlayout-react'
import { useStlyes } from './widget-manager-view.styles'
import { useContextMenu } from '@Pimcore/modules/widget-manager/hooks/use-context-menu'
import { createContextMenu } from '@Pimcore/modules/widget-manager/context-menu/context-menu'

export interface WidgetManagerProps extends ILayoutProps {
  className?: string
}

export const WidgetManagerView = ({ className, ...props }: WidgetManagerProps): React.JSX.Element => {
  const { styles } = useStlyes()
  const { showContextMenu, dropdown } = useContextMenu(createContextMenu, props.model)

  return (
    <div className={ ['widget-manager', className, styles.widgetManager].join(' ') }>
      <Layout
        { ...props }
        onContextMenu={ showContextMenu }
      />
      { dropdown }
    </div>
  )
}
