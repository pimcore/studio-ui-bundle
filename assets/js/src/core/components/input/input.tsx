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
import { Input as AntInput, type InputProps, type InputRef } from 'antd'
import cn from 'classnames'
import { useStyles } from './input.styles'
import { useFieldWidthOptional } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width'

export interface IInputProps extends InputProps {
  inherited?: boolean
}

export const Input = React.forwardRef<InputRef, IInputProps>(function Input (
  { inherited, className, style, ...restProps }: IInputProps,
  ref
): JSX.Element {
  const { styles } = useStyles()
  const fieldWidths = useFieldWidthOptional()

  // Apply medium width as default for input fields
  const computedStyle = {
    maxWidth: fieldWidths?.large,
    ...style
  }

  return (
    <AntInput
      className={ cn(styles.input, className, { [styles.inherited]: inherited }) }
      ref={ ref }
      style={ computedStyle }
      { ...restProps }
    />
  )
})
