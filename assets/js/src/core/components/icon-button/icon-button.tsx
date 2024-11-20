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

import React, { forwardRef } from 'react'
import cn from 'classnames'
import { Button, type ButtonProps } from '../button/button'
import { Icon, type IconProps } from '../icon/icon'
import { useStyles } from './icon-button.styles'

export interface IconButtonProps extends Omit<ButtonProps, 'icon' | 'variant'> {
  icon: IconProps
  theme?: 'primary' | 'secondary'
  variant?: 'minimal' | 'static'
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
    className,
    ...buttonProps
  } = props

  const { styles } = useStyles()

  const iconButtonClassNames = cn(
    styles.button,
    `icon-button--theme-${theme}`,
    `icon-button--variant-${variant}`,
    {
      'icon-button--hide-shadow': hideShadow
    },
    className
  )

  return (
    <Button
      type={ type }
      { ...buttonProps }
      className={ iconButtonClassNames }
      ref={ ref }
    >
      <Icon { ...icon } />
    </Button>
  )
}

export const IconButton = forwardRef(Component)
