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

import React from 'react'
import { Input as AntInput } from 'antd'
import cn from 'classnames'
import { useStyles } from './input-password.styles'
import { type PasswordProps } from 'antd/es/input'

export interface IInputPasswordProps extends PasswordProps {
  inherited?: boolean
}

export const InputPassword = ({ inherited, className, ...restProps }: IInputPasswordProps): JSX.Element => {
  const { styles } = useStyles()

  return (
    <AntInput.Password
      className={ cn(styles.input, className, { [styles.inherited]: inherited }) }
      { ...restProps }
    />
  )
}
