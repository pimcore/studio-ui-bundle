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
      {...selectProps}
      onChange={handleChange}
      options={options as any}
      style={{ maxWidth: toCssDimension(maxWidth) }}
      value={value}
    />
  )
}
