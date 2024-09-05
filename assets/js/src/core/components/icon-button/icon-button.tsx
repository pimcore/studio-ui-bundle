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
import { Icon, type IconProps } from '../icon/icon'
import { useStyles } from './icon-button.styles'
import { Button, type ButtonProps } from '../button/button'

export interface IconButtonProps extends ButtonProps {
  icon: string
  iconOptions?: IconProps['options']
  theme?: 'primary' | 'secondary'
  minimal?: boolean
}

const Component = ({ icon, children, className, minimal = false, type = 'link', theme = 'primary', iconOptions, ...buttonProps }: IconButtonProps, ref): React.JSX.Element => {
  const { styles } = useStyles()
  const buttonClasses = [styles.button, className, `icon-button--theme-${theme}`]

  if (minimal) {
    buttonClasses.push('icon-button--minimal');
  }

  return (
    <Button
      type={ type }
      { ...buttonProps }
      className={ buttonClasses.join(' ') }
      ref={ ref }
    >
      <Icon
        name={ icon }
        { ...iconOptions }
      />
    </Button>
  )
}

export const IconButton = forwardRef(Component)
