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
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { BaseView } from '@Pimcore/components/base-view/base-view'
import { Box } from '../box/box'

export interface TabpanelItem {
  key?: string
  label?: string
  title?: string
  closable?: boolean
  children?: React.ReactNode
  [key: string]: any
}

export interface TabpanelProps {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  items: TabpanelItem[]
  tabPosition?: ITabsProps['tabPosition']
  hasStickyHeader?: boolean
  extra?: React.ReactNode
  extraPosition?: 'start' | 'end'
  onClose?: (tabKey: string) => void
  size?: ITabsProps['size']
}

export const Tabpanel = ({
  items,
  border,
  collapsed,
  collapsible,
  title,
  hasStickyHeader = false,
  extra,
  extraPosition,
  onClose,
  size = 'small',
  ...props
}: TabpanelProps): React.JSX.Element => {
  const tabItems: ITabsProps['items'] = items.map((item, index) => ({
    key: item.key ?? index.toString(),
    label: item.label ?? item.title ?? `Tab ${index + 1}`,
    forceRender: true,
    closable: item.closable,
    ...item,
    children: <Box padding={ border === true ? 'small' : { x: 'none', y: 'small' } }>
      {item.children}
    </Box>
  }))

  const handleClose = (tabKey: string): void => {
    if (onClose !== undefined) {
      onClose(tabKey)
    }
  }

  return (
    <BaseView
      border={ border }
      collapsed={ collapsed }
      collapsible={ collapsible }
      contentPadding='none'
      extra={ extra }
      extraPosition={ extraPosition }
      title={ title }
    >
      <Tabs
        hasStickyHeader={ hasStickyHeader }
        items={ tabItems }
        noTabBarMargin
        onClose={ onClose !== undefined ? handleClose : undefined }
        size={ size }
        tabPosition={ props.tabPosition }
      />
    </BaseView>
  )
}
