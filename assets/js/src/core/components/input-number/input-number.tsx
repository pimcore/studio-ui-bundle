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
