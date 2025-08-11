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
import { Box } from '@Pimcore/components/box/box'
import { type ITabsProps, Tabs } from '@Pimcore/components/tabs/tabs'
import { BaseView } from '@Pimcore/components/base-view/base-view'

export interface TabpanelProps {
  title?: string
  border?: boolean
  collapsible?: boolean
  collapsed?: boolean
  children: Array<{
    title?: string
    closable?: boolean
    [key: string]: any
  }>
  tabPosition?: ITabsProps['tabPosition']
  hasStickyHeader?: boolean
  noteditable?: boolean
  renderChild?: (child: any, noteditable?: boolean) => React.ReactNode
  extra?: React.ReactNode
  extraPosition?: 'start' | 'end'
  onClose?: (tabKey: string) => void
}

export const Tabpanel = ({ 
  children, 
  border, 
  collapsed, 
  collapsible, 
  title, 
  hasStickyHeader = false, 
  noteditable,
  renderChild,
  extra,
  extraPosition,
  onClose,
  ...props 
}: TabpanelProps): React.JSX.Element => {
  const renderTabChild = (child: any): React.ReactNode => {
    if (renderChild) {
      return renderChild(child, noteditable)
    }
    
    // Default rendering for simple cases
    if (React.isValidElement(child)) {
      return child
    }
    
    if (typeof child === 'string') {
      return <div>{child}</div>
    }
    
    return child
  }

  const items: ITabsProps['items'] = children.map((child, index) => {
    const tabPanelChild = {
      ...child,
      title: undefined,
      closable: undefined
    }

    return {
      key: index.toString(),
      label: typeof child.title === 'string' ? child.title : `Tab ${index + 1}`,
      forceRender: true,
      closable: child.closable,
      children: (
        <Box padding='small'>
          {renderTabChild(tabPanelChild)}
        </Box>
      )
    }
  })

  const handleClose = (tabKey: string): void => {
    if (onClose !== undefined) {
      onClose(tabKey)
    }
  }

  return (
    <BaseView
      border={border}
      collapsed={collapsed}
      collapsible={collapsible}
      contentPadding='none'
      extra={extra}
      extraPosition={extraPosition}
      title={title}
    >
      <Tabs
        hasStickyHeader={hasStickyHeader}
        items={items}
        onClose={onClose !== undefined ? handleClose : undefined}
        size='small'
        tabPosition={props.tabPosition}
        noTabBarMargin
      />
    </BaseView>
  )
}
