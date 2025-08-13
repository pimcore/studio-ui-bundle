/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type RefObject } from 'react'
import { Tabs as AntdTabs, type TabsProps } from 'antd'
import { useStyles } from '@Pimcore/components/tabs/tabs.styles'
import cn from 'classnames'

export interface ITabsProps extends TabsProps {
  onClose?: (any) => void
  hasStickyHeader?: boolean
  noPadding?: boolean
  noTabBarMargin?: boolean
}

const Component = ({ items, className, activeKey, onClose, onChange, hasStickyHeader = false, ...props }: ITabsProps, ref: RefObject<HTMLElement | null>): React.JSX.Element => {
  const { styles } = useStyles()

  const classNames = cn(
    'ant-tabs-line',
    styles.tabs,
    {
      'tabs--has-sticky-header': hasStickyHeader
    },
    className,
    {
      'tabs--no-padding': props.noPadding
    },
    {
      'tabs--no-tab-bar-margin': props.noTabBarMargin
    }
  )

  const onEdit = (key: string | React.MouseEvent<HTMLElement>, action: 'add' | 'remove'): void => {
    if (action === 'remove' && onClose !== undefined) {
      onClose(key)
    }
  }

  // Check if any tabs are explicitly closable to determine the tab type
  const hasClosableTabs = items?.some(item => item.closable !== false) ?? false
  const tabType = onClose !== undefined && hasClosableTabs ? 'editable-card' : 'line'

  const handleMiddleClick = (tabKey: string) => (event: React.MouseEvent): void => {
    if (event.button === 1 && onClose !== undefined) {
      // Check if this specific tab item is closable
      const tabItem = items?.find(item => item.key === tabKey)
      const isTabClosable = tabItem?.closable !== false

      if (isTabClosable) {
        event.preventDefault()
        onClose(tabKey)
      }
    }
  }

  // Add mouse down handler to each tab item
  const enhancedItems = items?.map(item => ({
    ...item,
    label: (
      <div onMouseDown={ handleMiddleClick(item.key) }>
        {item.label}
      </div>
    )
  }))

  return (
    <AntdTabs
      activeKey={ activeKey }
      className={ classNames }
      hideAdd
      items={ enhancedItems }
      onChange={ onChange }
      onEdit={ onEdit }
      type={ tabType }
      { ...props }
    />
  )
}

export const Tabs = React.forwardRef(Component)
