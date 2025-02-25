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

import React, { useEffect, useState } from 'react'
import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { toCssDimension } from '@Pimcore/utils/css'

export interface BooleanSelectProps extends SelectProps {
  value?: boolean | null
  className?: string
  maxWidth?: string
  onChange?: (value?: boolean | null) => void
}

export const BooleanSelect = (props: BooleanSelectProps): React.JSX.Element => {
  const [value, setValue] = useState<boolean | null>(props.value ?? null)

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

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  const onChange = (value?: number): void => {
    const newValue = reverseMapValue(value)
    setValue(newValue ?? null)
    props.onChange?.(newValue)
  }

  return (
    <Select
      { ...props }
      onChange={ onChange }
      style={ { maxWidth: toCssDimension(props.maxWidth) } }
      value={ mapValue(value) }
    />
  )
}
