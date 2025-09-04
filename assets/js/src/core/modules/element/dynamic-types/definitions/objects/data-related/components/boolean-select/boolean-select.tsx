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
import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { toCssDimension } from '@Pimcore/utils/css'

export interface BooleanSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value?: boolean | null
  className?: string
  maxWidth?: string
  onChange?: (value: boolean | null) => void
  options?: Array<{ label: string, value: boolean | null }>
}

export const BooleanSelect = (props: BooleanSelectProps): React.JSX.Element => {
  const { value, onChange, maxWidth, options, ...selectProps } = props

  const handleChange = (selectedValue: boolean | null): void => {
    onChange?.(selectedValue)
  }

  return (
    <Select
      { ...selectProps }
      onChange={ handleChange }
      options={ options as any }
      style={ { maxWidth: toCssDimension(maxWidth) } }
      value={ value }
    />
  )
}
