/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useStyles } from '@Pimcore/components/toolbar/toolbar.styles'
import { Flex, type FlexProps } from 'antd'
import React from 'react'
import { HorizontalScroll } from '../horizontal-scroll/horizontal-scroll'
import { Box, type BoxProps } from '@Pimcore/components/box/box'

export interface ToolbarProps {
  children: React.ReactNode
  justify?: FlexProps['justify']
  align?: FlexProps['align']
  theme?: 'primary' | 'secondary'
  borderStyle?: 'default' | 'primary'
  position?: 'top' | 'bottom'
  size?: 'small' | 'auto' | 'default'
  padding?: BoxProps['padding']
  margin?: BoxProps['margin']
}

export const Toolbar = ({
  children,
  size = 'default',
  justify = 'space-between',
  align,
  theme = 'primary',
  position = 'bottom',
  borderStyle = 'default',
  padding,
  margin,
  ...props
}: ToolbarProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [
    styles.toolbar,
    'toolbar',
        `toolbar--theme-${theme}`,
        `toolbar--position-${position}`,
        `toolbar--size-${size}`,
        `toolbar--border-${borderStyle}`
  ].join(' ')

  return (
    <Box
      className={ classes }
      margin={ margin }
      padding={ padding }
    >
      <HorizontalScroll>
        <Flex
          align={ align }
          className='w-full'
          gap={ 16 }
          justify={ justify }
          { ...props }
        >
          {children}
        </Flex>
      </HorizontalScroll>
    </Box>
  )
}
