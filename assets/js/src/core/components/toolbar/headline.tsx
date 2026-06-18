/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useStyles } from '@Pimcore/components/toolbar/headline.styles'
import { Flex, type FlexProps } from 'antd'
import React from 'react'
import { HorizontalScroll } from '../horizontal-scroll/horizontal-scroll'
import { Box, type BoxProps } from '@Pimcore/components/box/box'

export interface HeadlineProps {
  children: React.ReactNode
  justify?: FlexProps['justify']
  align?: FlexProps['align']
  position?: 'top' | 'bottom' | 'content' | 'none'
  borderStyle?: 'default' | 'primary'
  padding?: BoxProps['padding']
  margin?: BoxProps['margin']
}

export const Headline = ({
  children,
  justify = 'space-between',
  align,
  position = 'none',
  borderStyle = 'default',
  padding,
  margin,
  ...props
}: HeadlineProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [
    styles.headline,
    'headline',
    `headline--position-${position}`,
    `headline--border-${borderStyle}`
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
