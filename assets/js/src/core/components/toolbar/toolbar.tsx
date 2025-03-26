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
  size?: 'small' | 'default'
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
