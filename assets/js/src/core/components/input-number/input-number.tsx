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
import { useFieldWidth } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export interface IInputNumberProps extends InputNumberProps {
  inherited?: boolean
}

export const InputNumber = ({ inherited, className, style, ...restProps }: IInputNumberProps): JSX.Element => {
  const { styles } = useStyles()
  const fieldWidths = useFieldWidth()

  // Apply small width as default for number inputs
  const computedStyle = {
    width: fieldWidths.small,
    ...style
  }

  return (
    <AntInputNumber
      className={ cn(styles.inputNumber, className, { [styles.inherited]: inherited }) }
      style={ computedStyle }
      { ...restProps }
    />
  )
}
