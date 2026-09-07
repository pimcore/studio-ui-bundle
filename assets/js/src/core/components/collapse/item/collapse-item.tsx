/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { Collapse, type CollapseProps } from 'antd'
import { CollapseHeader, type CollapseHeaderProps } from './header/collapse-header'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyles } from './collapse-item.styles'
import cn from 'classnames'
import { Box, type BoxProps } from '@Pimcore/components/box/box'

type AntdCollapsePropsItem = Exclude<CollapseProps['items'], undefined>[number]

export interface CollapseStyleProps {
  size?: CollapseProps['size']
  bordered?: CollapseProps['bordered']
  expandIcon?: CollapseProps['expandIcon']
  expandIconPosition?: CollapseProps['expandIconPosition']
  extraPosition?: 'start' | 'end'
  theme?: 'success' | 'error' | 'primary' | 'simple' | 'default' | 'card-with-highlight' | 'fieldset' | 'border-highlight'
  contentPadding?: BoxProps['padding']
  hasContentSeparator?: boolean
}

export interface CollapseItemProps extends Omit<AntdCollapsePropsItem, 'key' | 'onChange' | 'showArrow'>, CollapseStyleProps {
  active?: boolean
  defaultActive?: boolean
  /**
   * Set to false for an item that has no content to reveal. The item then renders as a
   * plain header row: no expand icon, no content box, and the header cannot be toggled.
   */
  expandable?: boolean
  onChange?: CollapseProps['onChange']
  subLabel?: React.ReactNode
  subLabelPosition?: CollapseHeaderProps['subLabelPosition']
}

export const ExpandIcon = ({ isActive }: { isActive: boolean }): React.ReactElement => {
  return (
    <Icon
      className='expand-icon'
      value={ isActive ? 'chevron-up' : 'chevron-down' }
    />
  )
}

export const CollapseItem = ({
  size = 'middle',
  active = undefined,
  defaultActive = false,
  expandable = true,
  bordered = true,
  expandIconPosition = 'end',
  expandIcon = ExpandIcon,
  subLabel,
  subLabelPosition,
  onChange,
  extraPosition = 'end',
  theme = 'default',
  hasContentSeparator = true,
  ...props
}: CollapseItemProps): React.JSX.Element => {
  const [activeState, setActiveState] = useState<boolean>(active ?? defaultActive)
  const { styles } = useStyles()

  // A non-expandable item has nothing to reveal, so it can never be open — regardless of
  // the active key the surrounding Collapse tracks for it.
  const isActive = expandable && activeState

  const classNames = cn(
    styles['collapse-item'],
    `collapse-item--theme-${theme}`,
    {
      'collapse-item--bordered': bordered,
      'collapse-item--separator': hasContentSeparator
    }
  )

  let contentPadding = props.contentPadding

  if (contentPadding === undefined) {
    contentPadding = { x: 'small', y: 'small' }

    if (!hasContentSeparator) {
      contentPadding = { x: 'small', y: 'small', top: 'none' }
    }
  }

  useEffect(() => {
    if (active !== undefined) {
      setActiveState(active)
    }
  }, [active])

  const onChangeHandler: CollapseProps['onChange'] = (key: string[]): void => {
    if (active === undefined) {
      setActiveState(key.includes('0'))
    }

    if (onChange !== undefined) {
      onChange(key)
    }
  }

  const { label, extra, children, ...itemProps } = props
  const item = {
    ...itemProps,
    showArrow: false,
    // 'icon' rather than 'disabled': it attaches the toggle to the expand icon, which a
    // non-expandable item does not render, so the header carries no role="button",
    // aria-expanded, aria-disabled or tab stop — a plain content row, not a disabled
    // disclosure control. 'disabled' would leave all four on the header.
    collapsible: expandable ? itemProps.collapsible : 'icon' as const,
    label: (
      <CollapseHeader
        expandIcon={ expandable ? expandIcon({ isActive }) : undefined }
        expandIconPosition={ expandIconPosition }
        extra={ props.extra }
        extraPosition={ extraPosition }
        label={ props.label }
        subLabel={ subLabel }
        subLabelPosition={ subLabelPosition }
      />
    ),
    children: expandable
      ? (
        <Box padding={ contentPadding }>
          {children}
        </Box>
        )
      : null
  }

  return (
    <Collapse
      activeKey={ isActive ? 0 : -1 }
      className={ classNames }
      items={ [item] }
      onChange={ onChangeHandler }
      size={ size }
    />
  )
}
