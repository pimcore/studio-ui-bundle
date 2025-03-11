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
import { Input as AntInput, type InputProps } from 'antd'
import cn from 'classnames'
import { useStyles } from './input.styles'

export interface IInputProps extends InputProps {
  inherited?: boolean
}

export const Input = ({ inherited, className, ...restProps }: IInputProps): JSX.Element => {
  const { styles } = useStyles()

  return (
    <AntInput
      className={ cn(styles.input, className, { [styles.inherited]: inherited }) }
      { ...restProps }
    />
  )
}
