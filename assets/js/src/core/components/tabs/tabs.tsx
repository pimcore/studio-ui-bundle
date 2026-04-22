/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type RefObject, useCallback, useMemo } from 'react'
import { Tabs as AntdTabs, type TabsProps } from 'antd'
import { useStyles } from '@Pimcore/components/tabs/tabs.styles'
import cn from 'classnames'
import { isUndefined } from 'lodash'
import { ContextMenuWrapper } from '@Pimcore/components/context-menu-wrapper/context-menu-wrapper'
import { TabContextMenu } from '@Pimcore/components/tabs/tab-context-menu'

export interface ITabsProps extends TabsProps {
  onClose?: (any) => void
  hasStickyHeader?: boolean
  noPadding?: boolean
  noTabBarMargin?: boolean
  fullHeight?: boolean
}

const Component = ({ items, className, activeKey, onClose, hasStickyHeader = false, fullHeight = false, ...props }: ITabsProps, ref: RefObject<HTMLElement | null>): React.JSX.Element => {
  const { styles } = useStyles()

  const classNames = cn(
    'ant-tabs-line',
    styles.tabs,
    {
      'tabs--has-sticky-header': hasStickyHeader
    },
    className,
    {
      'tabs--no-padding': props.noPadding,
      'tabs--no-tab-bar-margin': props.noTabBarMargin,
      'tabs--full-height': fullHeight
    }
  )

  const onEdit = useCallback((key: string | React.MouseEvent<HTMLElement>, action: 'add' | 'remove'): void => {
    if (action === 'remove' && onClose !== undefined) {
      onClose(key)
    }
  }, [onClose])

  // Check if any tabs are explicitly closable to determine the tab type
  const hasClosableTabs = items?.some(item => item.closable !== false) ?? false
  const tabType = onClose !== undefined && hasClosableTabs ? 'editable-card' : 'line'

  const handleMiddleClick = useCallback((event: React.MouseEvent<HTMLElement>): void => {
    if (event.button === 1 && onClose !== undefined) {
      const tabKey = event.currentTarget.dataset.tabKey
      if (!isUndefined(tabKey)) {
        const tabItem = items?.find(item => item.key === tabKey)
        const isTabClosable = tabItem?.closable !== false

        if (isTabClosable) {
          event.preventDefault()
          onClose(tabKey)
        }
      }
    }
  }, [onClose, items])

  // Add mouse down handler to each tab item
  const enhancedItems = useMemo(() => {
    const allKeys = items?.map(item => item.key) ?? []

    return items?.map(item => {
      const button = (
        <button
          className={ styles.middleClickButton }
          data-tab-key={ item.key }
          onMouseDown={ handleMiddleClick }
          type="button"
        >
          {item.label}
        </button>
      )

      const label = isUndefined(onClose)
        ? button
        : (
          <ContextMenuWrapper
            calculateAutoHeight={ false }
            renderMenu={ () => (
              <TabContextMenu
                allKeys={ allKeys }
                onClose={ onClose }
                tabKey={ item.key }
              />
            ) }
          >
            {button}
          </ContextMenuWrapper>
          )

      return {
        ...item,
        label
      }
    })
  }, [items, handleMiddleClick, onClose])

  return (
    <AntdTabs
      activeKey={ activeKey }
      className={ classNames }
      hideAdd
      items={ enhancedItems }
      onEdit={ onEdit }
      type={ tabType }
      { ...props }
    />
  )
}

export const Tabs = React.forwardRef(Component)
