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
import { useTranslation } from 'react-i18next'
import { useStyles } from './input-number.styles'
import { useFieldWidthOptional } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'
import { getDecimalSeparator } from '@Pimcore/utils/number'

export interface IInputNumberProps extends InputNumberProps {
  inherited?: boolean
}

export const InputNumber = ({ inherited, className, style, decimalSeparator, ...restProps }: IInputNumberProps): JSX.Element => {
  const { styles } = useStyles()
  const fieldWidths = useFieldWidthOptional()
  const { i18n } = useTranslation()

  // Apply small width as default for number inputs
  const computedStyle = {
    maxWidth: fieldWidths?.small,
    ...style
  }

  return (
    <AntInputNumber
      className={ cn(styles.inputNumber, className, { [styles.inherited]: inherited }) }
      decimalSeparator={ decimalSeparator ?? getDecimalSeparator(i18n?.language) }
      style={ computedStyle }
      { ...restProps }
    />
  )
}
