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
import { useStyles } from './widget-manager-view.styles'
import { type CreateContextMenuItemsProps, useContextMenu } from '@Pimcore/modules/widget-manager/hooks/use-context-menu'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'

export interface WidgetManagerProps extends ILayoutProps {
  className?: string
  createContextMenuItems?: (args: CreateContextMenuItemsProps) => DropdownProps['menu']['items']
}

export const WidgetManagerView = ({ className, createContextMenuItems, ...props }: WidgetManagerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { showContextMenu, dropdown } = useContextMenu(props.model, createContextMenuItems)

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
