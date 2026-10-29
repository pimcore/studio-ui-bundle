/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo } from 'react'
import cn from 'classnames'
import { isNull, isUndefined } from 'lodash'
import { type Action, Layout, type ILayoutProps, type TabNode } from 'flexlayout-react'
import { useStyles } from './widget-manager-view.styles'
import { type CreateContextMenuItemsProps, useContextMenu } from '@Pimcore/modules/widget-manager/hooks/use-context-menu'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { useHandleKeyBindings } from '@Pimcore/modules/app/hook/use-handle-keybindings'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { useSideWidgetMotion } from '@Pimcore/modules/widget-manager/hooks/use-side-widget-motion'

export interface WidgetManagerProps extends ILayoutProps {
  className?: string
  createContextMenuItems?: (args: CreateContextMenuItemsProps) => DropdownProps['menu']['items']
}

const WidgetManagerViewInner = ({ className, createContextMenuItems, ...props }: WidgetManagerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { showContextMenu, dropdown } = useContextMenu(props.model, createContextMenuItems)
  const { closeWidget } = useWidgetManager()
  const { motion, onAction: trackSideWidgetMotion } = useSideWidgetMotion(props.model)

  const onAction = (action: Action): Action | undefined => {
    const result = isUndefined(props.onAction) ? action : props.onAction(action)

    if (!isUndefined(result)) {
      trackSideWidgetMotion(result)
    }

    return result
  }

  useHandleKeyBindings(() => {
    props.model.getActiveTabset()?.getChildren().forEach((tabNode: TabNode) => {
      closeWidget(tabNode.getId())
    })
  }, 'closeAllTabs', true)

  return (
    <div className={ cn('widget-manager', className, styles.widgetManager, { [`widget-manager--side-widget-${motion}`]: !isNull(motion) }) }>
      <Layout
        { ...props }
        onAction={ onAction }
        onContextMenu={ showContextMenu }
      />
      { dropdown }
    </div>
  )
}

export const WidgetManagerView = memo(WidgetManagerViewInner)
