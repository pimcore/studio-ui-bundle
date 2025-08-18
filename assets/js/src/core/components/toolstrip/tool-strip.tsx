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
  activateOnHover?: boolean
}

export const ToolStrip = ({
  children,
  className,
  theme: toolStripTheme = 'default',
  dragger = false,
  title,
  activateOnHover = false
}: ToolStripProps): React.JSX.Element => {
  const { styles, theme: token } = useStyles()
  const [isHovered, setIsHovered] = React.useState(false)

  const classNames = cn(
    'tool-strip',
    styles['tool-strip'],
    `tool-strip--theme-${toolStripTheme}`,
    {
      'tool-strip--activate-on-hover': activateOnHover,
      'tool-strip--activated': activateOnHover ? isHovered : true
    },
    className
  )

  const themeConfig = React.useMemo(() => {
    const isActivated = activateOnHover ? isHovered : true

    const createColorMapping = (buttonColor: string | undefined, textColor: string | undefined): {
      Button: {
        colorLink: string | undefined
        colorLinkHover: string | undefined
        colorLinkActive: string | undefined
      }
      Typography: {
        colorText: string | undefined
      }
    } => ({
      Button: {
        colorLink: buttonColor,
        colorLinkHover: buttonColor,
        colorLinkActive: buttonColor
      },
      Typography: {
        colorText: textColor
      }
    })

    if (toolStripTheme === 'inverse') {
      const buttonColor = isActivated ? token.colorButtonInverse : token.colorInactiveInverse
      const textColor = isActivated ? token.colorTextInverse : token.colorInactiveInverse

      return {
        components: {
          ...createColorMapping(buttonColor, textColor),
          Button: {
            ...createColorMapping(buttonColor, textColor).Button,
            colorTextDisabled: token.colorInactiveInverse
          },
          Split: {
            colorFillSecondary: token.colorDividerInverse
          }
        }
      }
    } else {
      const disabledColor = isActivated ? undefined : token.colorTextDisabled

      return {
        components: createColorMapping(disabledColor, disabledColor)
      }
    }
  }, [toolStripTheme, activateOnHover, isHovered, token])

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

    const isActivated = activateOnHover ? isHovered : true
    const isInverseTheme = toolStripTheme === 'inverse'

    const activeColor = isInverseTheme ? token.colorButtonInverse : token.colorText
    const inactiveColor = isInverseTheme ? token.colorInactiveInverse : token.colorTextDisabled
    const draggerColor = isActivated ? activeColor : inactiveColor

    return (
      <div
        className={ styles.dragger }
        style={ { color: draggerColor } }
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
    // For activateOnHover mode, show different content based on hover state
    if (activateOnHover) {
      // Always render Split layout, but wrap children in animated container
      return (
        <Flex
          align="center"
          className={ dragger !== false ? styles['draggable-area'] : undefined }
          style={ { height: '100%' } }
          { ...(dragger !== false ? dragHandleProps.listeners : {}) }
        >
          {renderDragger()}
          {title !== undefined && (
            <Box margin={ { right: 'mini' } }>
              <Text>{title}</Text>
            </Box>
          )}
          <div className="tool-strip__children-container">
            <Split
              dividerSize="small"
              size="mini"
              theme="secondary"
            >
              <div></div>
              {children}
            </Split>
          </div>
        </Flex>
      )
    }

    // Normal mode (not activateOnHover)
    if (dragger === false && title === undefined) {
      return children
    }

    // Create the left side content (dragger + title grouped together)
    const leftContent = (
      <Flex
        align="center"
        className={ dragger !== false ? styles['draggable-area'] : undefined }
        style={ { height: '100%' } }
        { ...(dragger !== false ? dragHandleProps.listeners : {}) }
      >
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
        onMouseEnter={ activateOnHover ? () => { setIsHovered(true) } : undefined }
        onMouseLeave={ activateOnHover ? () => { setIsHovered(false) } : undefined }
        padding={ title !== undefined && dragger === false ? { x: 'mini', y: 'mini', left: 'extra-small' } : 'mini' }
      >
        {renderContent()}
      </Box>
    </ThemeProvider>
  )
}
