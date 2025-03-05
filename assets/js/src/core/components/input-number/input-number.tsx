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
import { InputNumber as AntInputNumber, type InputNumberProps } from 'antd'
import cn from 'classnames'
import { useStyles } from './input-number.styles'

export interface IInputNumberProps extends InputNumberProps {
  inherited?: boolean
}

export const InputNumber = ({ inherited, className, ...restProps }: IInputNumberProps): JSX.Element => {
  const { styles } = useStyles()

  return (
    <AntInputNumber
      className={ cn(styles.inputNumber, className, { [styles.inherited]: inherited }) }
      { ...restProps }
    />
  )
}
