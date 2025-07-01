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

export interface BooleanSelectProps extends SelectProps {
  value?: boolean | null
  className?: string
  maxWidth?: string
  onChange?: (value?: boolean | null) => void
}

export const BooleanSelect = (props: BooleanSelectProps): React.JSX.Element => {
  const booleanSelectValue = props.value ?? null

  const mapValue = (value?: boolean | null): number | undefined => {
    if (value === undefined) {
      return undefined
    }
    if (value === null) {
      return 0
    }

    return value ? 1 : -1
  }

  const reverseMapValue = (value?: number): boolean | null | undefined => {
    if (value === undefined) {
      return undefined
    }
    if (value === 0) {
      return null
    }

    return value === 1
  }

  const onChange = (value?: number): void => {
    const newValue = reverseMapValue(value)

    props.onChange?.(newValue ?? null)
  }

  return (
    <Select
      { ...props }
      onChange={ onChange }
      style={ { maxWidth: toCssDimension(props.maxWidth) } }
      value={ mapValue(booleanSelectValue) }
    />
  )
}
