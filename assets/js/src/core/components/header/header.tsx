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
import { Title } from '@Pimcore/components/title/title'
import { useStyles } from '@Pimcore/components/header/header.styles'
import cn from 'classnames'
import { Flex, type FlexProps } from 'antd'
import { HorizontalScroll } from '@Pimcore/components/horizontal-scroll/horizontal-scroll'
import { Box, type BoxProps } from '@Pimcore/components/box/box'

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.JSX.Element
  fullWidth?: boolean
  title?: string
  justify?: FlexProps['justify']
  align?: FlexProps['align']
  position?: 'top' | 'bottom' | 'content' | 'none'
  borderStyle?: 'default' | 'primary'
  padding?: BoxProps['padding']
  margin?: BoxProps['margin']
}

export const Header = (props: HeaderProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { icon, title, children, fullWidth, justify, align, position = 'none', borderStyle = 'default', padding, margin, ...rest } = props

  const classNames = cn(
    styles.header,
    `header--position-${position}`,
    `header--border-${borderStyle}`,
    title === undefined && styles.headlineMode,
    props.className
  )

  if (title !== undefined) {
    return (
      <div
        { ...rest }
        className={ classNames }
      >
        {title !== '' && (
          <span className={ 'header__text' }>
            <Title icon={ icon }>
              {title}
            </Title>
          </span>
        )}

        <div className={ cn('header__content', { 'w-full': fullWidth === true }) }>
          {children}
        </div>
      </div>
    )
  }

  return (
    <Box
      { ...rest }
      className={ classNames }
      margin={ margin }
      padding={ padding }
    >
      <HorizontalScroll>
        <Flex
          align={ align }
          className='w-full'
          gap={ 16 }
          justify={ justify ?? 'space-between' }
        >
          {children}
        </Flex>
      </HorizontalScroll>
    </Box>
  )
}
