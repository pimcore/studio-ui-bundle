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
import React, { useCallback, useRef } from 'react'
import { HorizontalScroll } from '../horizontal-scroll/horizontal-scroll'
import { Box, type BoxProps } from '@Pimcore/components/box/box'

export interface ToolbarProps {
  children: React.ReactNode
  justify?: FlexProps['justify']
  align?: FlexProps['align']
  theme?: 'primary' | 'secondary'
  borderStyle?: 'default' | 'primary'
  position?: 'top' | 'bottom' | 'content' | 'none'
  size?: 'small' | 'auto' | 'default'
  padding?: BoxProps['padding']
  margin?: BoxProps['margin']
}

export const Toolbar = ({
  children,
  size = 'default',
  justify = 'space-between',
  align,
  theme,
  position,
  borderStyle = 'default',
  padding,
  margin,
  ...props
}: ToolbarProps): React.JSX.Element => {
  const resolvedTheme = theme ?? 'primary'
  const resolvedPosition = position ?? 'bottom'
  const { styles } = useStyles()
  const toolbarRef = useRef<HTMLDivElement>(null)
  const classes = [
    styles.toolbar,
    'toolbar',
    `toolbar--theme-${resolvedTheme}`,
    `toolbar--position-${resolvedPosition}`,
    `toolbar--size-${size}`,
    `toolbar--border-${borderStyle}`
  ].join(' ')

  const handleKeyDown = useCallback((event: React.KeyboardEvent): void => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    const container = toolbarRef.current
    if (container === null) return

    const focusable = Array.from(container.querySelectorAll<HTMLElement>(
      'button, [tabindex="0"], a[href], input, select, [role="button"]'
    )).filter(el => !el.hasAttribute('disabled'))

    const idx = focusable.indexOf(event.target as HTMLElement)
    if (idx === -1) return

    event.preventDefault()
    const next = event.key === 'ArrowRight'
      ? (idx + 1) % focusable.length
      : (idx - 1 + focusable.length) % focusable.length
    focusable[next].focus()
  }, [])

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
          ref={ toolbarRef }
          role="toolbar"
          { ...props }
          onKeyDown={ handleKeyDown }
        >
          {children}
        </Flex>
      </HorizontalScroll>
    </Box>
  )
}
