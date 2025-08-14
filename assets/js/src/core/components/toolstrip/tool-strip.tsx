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
import { useStyles } from './tool-strip.styles'
import cn from 'classnames'
import { Box } from '../box/box'
import { ThemeProvider } from 'antd-style'
import { Icon } from '../icon/icon'
import { Split } from '../split/split'
import { Text } from '../text/text'
import { Flex } from '@sdk/components'

export interface DragHandleProps {
  listeners?: Record<string, any>
}

export interface ToolStripProps {
  className?: string
  children: React.ReactNode
  theme?: 'default' | 'inverse'
  dragger?: boolean | DragHandleProps
  title?: string
}

export const ToolStrip = ({
  children,
  className,
  theme: toolStripTheme = 'default',
  dragger = false,
  title
}: ToolStripProps): React.JSX.Element => {
  const { styles, theme: token } = useStyles()

  const classNames = cn(
    'tool-strip',
    styles['tool-strip'],
    `tool-strip--theme-${toolStripTheme}`,
    className
  )

  const themeConfig = toolStripTheme === 'inverse'
    ? {
        components: {
          Button: {
            colorLink: token.colorButtonInverse,
            colorLinkHover: token.colorButtonInverse,
            colorLinkActive: token.colorButtonInverse,
            colorTextDisabled: token.colorInactiveInverse
          },
          Typography: {
            colorText: token.colorTextInverse
          },
          Split: {
            colorFillSecondary: token.colorDividerInverse
          }
        }
      }
    : {}

  // Handle dragger props
  const dragHandleProps = React.useMemo(() => {
    if (typeof dragger === 'object') {
      return dragger
    }
    return {}
  }, [dragger])

  // Render dragger if needed
  const renderDragger = (): React.ReactNode => {
    if (dragger === false) return null

    return (
      <div
        className={ styles.dragger }
        { ...dragHandleProps.listeners }
      >
        <Icon
          options={ { width: 16, height: 17 } }
          value="drag-option"
        />
      </div>
    )
  }

  // Wrap children with Split if dragger is present
  const renderContent = (): React.ReactNode => {
    if (dragger === false && title === undefined) {
      return children
    }

    // Create the left side content (dragger + title grouped together)
    const leftContent = (
      <Flex align="center">
        {renderDragger()}
        {title !== undefined && (
          <Box margin={ { right: 'mini' } }>
            <Text>{title}</Text>
          </Box>
        )}
      </Flex>
    )

    // Use Split layout when there's a dragger (with or without title)
    return (
      <Split
        dividerSize="small"
        size="mini"
        theme="secondary"
      >
        {leftContent}
        {children}
      </Split>
    )
  }

  return (
    <ThemeProvider theme={ themeConfig }>
      <Box
        className={ classNames }
        padding={ title !== undefined && dragger === false ? { x: 'mini', y: 'mini', left: 'extra-small' } : 'mini' }
      >
        {renderContent()}
      </Box>
    </ThemeProvider>
  )
}
