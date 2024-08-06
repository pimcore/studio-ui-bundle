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

import { Button, type ButtonProps } from 'antd'
import React, { forwardRef } from 'react'
import { Icon, type IconProps } from '../icon/icon'
import { useStyles } from './icon-button.styles'

export interface IconButtonProps extends ButtonProps {
  icon: string
  iconOptions?: IconProps['options']
  theme?: 'primary' | 'secondary'
}

const Component = ({ icon, children, className, theme = 'primary', iconOptions, ...buttonProps }: IconButtonProps, ref): React.JSX.Element => {
  const { styles } = useStyles()
  const buttonClasses = [styles.button, className, `icon-button--theme-${theme}`].join(' ')

  return (
    <Button
      { ...buttonProps }
      className={ buttonClasses }
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
