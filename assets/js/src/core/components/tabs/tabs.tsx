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

  return (
    <AntdTabs
      activeKey={ activeKey }
      className={ classNames }
      hideAdd
      items={ items }
      onChange={ onChange }
      onEdit={ onEdit }
      type={ onClose !== undefined ? 'editable-card' : 'line' }
      { ...props }
    />
  )
}

export const Tabs = React.forwardRef(Component)
