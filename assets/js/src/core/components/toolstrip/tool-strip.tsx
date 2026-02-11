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
import { Box, type SizeDefinition } from '../box/box'
import { ThemeProvider } from 'antd-style'
import { Icon, type ElementIcon } from '../icon/icon'
import { Split } from '../split/split'
import { Text } from '../text/text'
import { Flex } from '@sdk/components'
import { getToolStripIconColor } from './utils/get-icon-color'

export interface DragHandleProps {
  listeners?: Record<string, any>
}

export interface ToolStripProps {
  className?: string
  children?: React.ReactNode
  theme?: 'default' | 'inverse'
  dragger?: boolean | DragHandleProps
  title?: string
  activateOnHover?: boolean
  rounded?: boolean
  disabled?: boolean
  additionalIcon?: string | ElementIcon
  additionalIconPosition?: 'before' | 'after'
  /**
   * Enable automatic theme-based icon coloring (matches title text).
   * Defaults to `false` (uses button default color). Ignored when ElementIcon.colorToken is set.
   */
  additionalIconAutoColor?: boolean
}

export const ToolStrip = ({
  children,
  className,
  theme: toolStripTheme = 'default',
  dragger = false,
  title,
  activateOnHover = false,
  rounded = false,
  disabled = false,
  additionalIcon,
  additionalIconPosition = 'after',
  additionalIconAutoColor = false
}: ToolStripProps): React.JSX.Element => {
  const { styles, theme: token } = useStyles()
  const [isHovered, setIsHovered] = React.useState(false)

  const isActivated = (() => {
    if (disabled) return false
    if (activateOnHover) return isHovered
    return true
  })()

  const classNames = cn(
    'tool-strip',
    styles['tool-strip'],
    `tool-strip--theme-${toolStripTheme}`,
    {
      'tool-strip--activate-on-hover': activateOnHover && !disabled,
      'tool-strip--activated': isActivated,
      'tool-strip--rounded': rounded,
      'tool-strip--disabled': disabled
    },
    className
  )

  const themeConfig = React.useMemo(() => {
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
      if (disabled) {
        // When disabled, use normal text color instead of inverse colors
        const buttonColor = token.colorText
        const textColor = token.colorText

        return {
          components: {
            ...createColorMapping(buttonColor, textColor),
            Button: {
              ...createColorMapping(buttonColor, textColor).Button,
              colorTextDisabled: token.colorText
            },
            Split: {
              colorFillSecondary: token.colorBorder
            }
          }
        }
      } else {
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
      }
    } else {
      const disabledColor = isActivated ? undefined : token.colorTextDisabled

      return {
        components: createColorMapping(disabledColor, disabledColor)
      }
    }
  }, [toolStripTheme, isActivated, token, disabled])

  const dragHandleProps = React.useMemo(() => {
    if (typeof dragger === 'object') {
      return dragger
    }
    return {}
  }, [dragger])

  const renderDragger = (): React.ReactNode => {
    if (dragger === false) return null

    let draggerColor: string

    if (disabled) {
      draggerColor = token.colorIcon
    } else {
      const isInverseTheme = toolStripTheme === 'inverse'
      const activeColor = isInverseTheme ? token.colorButtonInverse : token.colorText
      const inactiveColor = isInverseTheme ? token.colorInactiveInverse : token.colorTextDisabled
      draggerColor = isActivated ? activeColor : inactiveColor
    }

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

  const renderAdditionalIcon = (): React.ReactNode => {
    if (additionalIcon === undefined) return null

    // Determine if icon is an ElementIcon object
    const isElementIcon = typeof additionalIcon === 'object'
    const iconValue = isElementIcon ? additionalIcon.value : additionalIcon

    // Get the appropriate icon color
    const iconColor = getToolStripIconColor({
      additionalIcon,
      additionalIconAutoColor,
      disabled,
      toolStripTheme,
      isActivated,
      token
    })

    // Add margin based on position
    const margin: SizeDefinition = additionalIconPosition === 'before'
      ? { left: 'mini', right: 'extra-small' }
      : { left: 'mini', right: 'mini' }

    // Extract ElementIcon props (exclude value as we handle it separately)
    const elementIconProps = isElementIcon ? { ...additionalIcon, value: undefined } : {}

    return (
      <Box margin={ margin }>
        <Icon
          { ...elementIconProps }
          options={ { width: 16, height: 16, ...(iconColor !== undefined && { color: iconColor }) } }
          value={ iconValue }
        />
      </Box>
    )
  }

  const renderContent = (): React.ReactNode => {
    if (activateOnHover) {
      return (
        <Flex
          align="center"
          className={ dragger !== false && !disabled ? styles['draggable-area'] : undefined }
          style={ { height: '100%' } }
          { ...(dragger !== false && !disabled ? dragHandleProps.listeners : {}) }
        >
          {renderDragger()}
          {additionalIconPosition === 'before' && renderAdditionalIcon()}
          {title !== undefined && (
            <Box margin={ { right: 'mini' } }>
              <Text className={ styles.title }>{title}</Text>
            </Box>
          )}
          {additionalIconPosition === 'after' && renderAdditionalIcon()}
          {children !== undefined && !disabled && (
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
          )}
        </Flex>
      )
    }

    if (dragger === false && title === undefined && children !== undefined) {
      return children
    }

    const leftContent = (
      <Flex
        align="center"
        className={ dragger !== false && !disabled ? styles['draggable-area'] : undefined }
        style={ { height: '100%' } }
        { ...(dragger !== false && !disabled ? dragHandleProps.listeners : {}) }
      >
        {renderDragger()}
        {additionalIconPosition === 'before' && renderAdditionalIcon()}
        {title !== undefined && (
          <Box margin={ { right: 'mini' } }>
            <Text className={ styles.title }>{title}</Text>
          </Box>
        )}
        {additionalIconPosition === 'after' && renderAdditionalIcon()}
      </Flex>
    )

    if (children === undefined || disabled) {
      return leftContent
    }

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
        onMouseEnter={ activateOnHover && !disabled ? () => { setIsHovered(true) } : undefined }
        onMouseLeave={ activateOnHover && !disabled ? () => { setIsHovered(false) } : undefined }
        padding={ title !== undefined && dragger === false ? { x: 'mini', y: 'mini', left: 'extra-small' } : 'mini' }
      >
        {renderContent()}
      </Box>
    </ThemeProvider>
  )
}
