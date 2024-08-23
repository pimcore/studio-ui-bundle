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
import React from 'react'
import { Icon } from '../icon/icon'
import { useStyles } from './icon-text-button.styles'

export interface IconTextButtonProps extends ButtonProps {
  icon: string
  iconPlacement?: 'left' | 'right'
}

export const IconTextButton = ({ icon, children, iconPlacement = 'left', ...buttonProps }: IconTextButtonProps): React.JSX.Element => {
  const { styles } = useStyles()
  const buttonClasses = [styles.button, buttonProps.className].join(' ')

  return (
    <Button
      { ...buttonProps }
      className={ buttonClasses }
    >
      { iconPlacement === 'left' && <Icon name={ icon } /> }

      <span>
        { children }
      </span>

      { iconPlacement === 'right' && <Icon name={ icon } /> }
    </Button>
  )
}
