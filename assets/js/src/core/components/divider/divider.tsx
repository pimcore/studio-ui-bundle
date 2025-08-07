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
import { Divider as AntDivider, type DividerProps, ConfigProvider } from 'antd'
import { useStyles } from './divider.styles'
import cn from 'classnames'
import type { Sizings } from '@Pimcore/utils/sizing'

export interface IDividerProps extends DividerProps {
  size?: Sizings
  theme?: 'default' | 'primary' | 'secondary'
}

export const Divider = ({ size = 'normal', className, theme = 'default', ...props }: IDividerProps): JSX.Element => {
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext)
  const prefixCls = getPrefixCls('divider')
  const { styles } = useStyles(prefixCls)

  const classes = cn(
    styles.divider,
    `${prefixCls}--size-${size}`,
    `divider--theme-${theme}`,
    className
  )

  return (
    <AntDivider
      className={ classes }
      { ...props }
    />
  )
}
