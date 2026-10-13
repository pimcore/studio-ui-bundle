/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef } from 'react'
import cn from 'classnames'
import { Button, type ButtonProps } from '../button/button'
import { Icon, type IconProps } from '../icon/icon'
import { actionTooltipDelay, Tooltip } from '../tooltip/tooltip'
import { useStyles } from './icon-button.styles'
import { type SizeType } from 'antd/es/config-provider/SizeContext'
import { type TooltipProps } from 'antd'
import { isNil, isString, isUndefined } from 'lodash'

export interface IconButtonProps extends Omit<ButtonProps, 'icon' | 'variant'> {
  icon: IconProps
  /**
   * Tooltip of the button, shown after a short delay. Without it, a text passed as children
   * (which is never rendered next to the icon) is used as tooltip and accessible label.
   */
  tooltip?: TooltipProps
  theme?: 'primary' | 'secondary'
  variant?: 'minimal' | 'static'
  size?: SizeType
  hideShadow?: boolean
}

const Component = (props: IconButtonProps, ref): React.JSX.Element => {
  const {
    children,
    icon,
    type = 'link',
    theme = 'primary',
    hideShadow = false,
    variant,
    size,
    className,
    tooltip,
    ...buttonProps
  } = props

  const { styles } = useStyles()

  const label = isNil(children) || children === '' || children === false ? undefined : children
  const resolvedTooltip = tooltip ?? (isUndefined(label) ? undefined : { title: label })
  const ariaLabel = buttonProps['aria-label'] ?? (isString(label) ? label : undefined)

  const iconButtonClassNames = cn(
    styles.button,
    `icon-button--theme-${theme}`,
    `icon-button--variant-${variant}`,
    {
      'icon-button--hide-shadow': hideShadow,
      [`icon-button--size-${size}`]: size
    },
    className
  )

  const iconSize = size === 'small' ? 14 : undefined
  const iconWithSize = {
    ...icon,
    options: {
      width: iconSize,
      height: iconSize,
      ...icon.options
    }
  }

  const button = (
    <Button
      type={ type }
      { ...buttonProps }
      aria-label={ ariaLabel }
      className={ iconButtonClassNames }
      ref={ ref }
    >
      <Icon { ...iconWithSize } />
    </Button>
  )

  if (!isUndefined(resolvedTooltip)) {
    return (
      <Tooltip
        mouseEnterDelay={ actionTooltipDelay }
        { ...resolvedTooltip }
      >
        {button}
      </Tooltip>
    )
  }

  return button
}

export const IconButton = forwardRef(Component)
