/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Layout, type ILayoutProps } from 'flexlayout-react'
import cn from 'classnames'
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
    <div className={ cn('widget-manager', className, styles.widgetManager) }>
      <Layout
        { ...props }
        onContextMenu={ showContextMenu }
      />
      { dropdown }
    </div>
  )
}
