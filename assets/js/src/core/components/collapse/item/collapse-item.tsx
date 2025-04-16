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

import React, { useEffect, useState } from 'react'
import { Collapse, type CollapseProps } from 'antd'
import { CollapseHeader } from './header/collapse-header'
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
  theme?: 'success' | 'primary' | 'simple' | 'default' | 'card-with-highlight' | 'fieldset' | 'border-highlight'
  contentPadding?: BoxProps['padding']
  hasContentSeparator?: boolean
}

export interface CollapseItemProps extends Omit<AntdCollapsePropsItem, 'key' | 'onChange' | 'showArrow'>, CollapseStyleProps {
  active?: boolean
  defaultActive?: boolean
  onChange?: CollapseProps['onChange']
  subLabel?: React.ReactNode
}

export const ExpandIcon = ({ isActive }: { isActive: boolean }): React.ReactElement => {
  return <Icon value={ isActive ? 'chevron-up' : 'chevron-down' } />
}

export const CollapseItem = ({
  size = 'middle',
  active = undefined,
  defaultActive = false,
  bordered = true,
  expandIconPosition = 'end',
  expandIcon = ExpandIcon,
  subLabel,
  onChange,
  extraPosition = 'end',
  theme = 'default',
  hasContentSeparator = true,
  ...props
}: CollapseItemProps): React.JSX.Element => {
  const [activeState, setActiveState] = useState<boolean>(active ?? defaultActive)
  const { styles } = useStyles()

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
    label: (
      <CollapseHeader
        expandIcon={ expandIcon({ isActive: activeState }) }
        expandIconPosition={ expandIconPosition }
        extra={ props.extra }
        extraPosition={ extraPosition }
        label={ props.label }
        subLabel={ subLabel }
      />
    ),
    children: (
      <Box padding={ contentPadding }>
        {children}
      </Box>
    )
  }

  return (
    <Collapse
      activeKey={ activeState ? 0 : -1 }
      className={ classNames }
      items={ [item] }
      onChange={ onChangeHandler }
      size={ size }
    />
  )
}
