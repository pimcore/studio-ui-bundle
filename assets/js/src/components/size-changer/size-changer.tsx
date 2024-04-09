import { Select } from 'antd'
import React from 'react'
import type { DefaultOptionType } from 'rc-select/lib/Select'

interface SizeChangerProps {
  sizeOptions: number[] | string []
  defaultSize: number
  handleChange: (pageSize) => void
  label: string
}

export const SizeChanger = ({
  sizeOptions,
  defaultSize,
  handleChange,
  label
}: SizeChangerProps): React.JSX.Element => {
  let isDefaultPageSizeOptionValid = false
  const options: DefaultOptionType[] = []

  for (const pageSizeOption of sizeOptions) {
    if (Number(pageSizeOption) === Number(defaultSize)) {
      isDefaultPageSizeOptionValid = true
    }

    options.push({
      value: pageSizeOption.toString(),
      label: pageSizeOption.toString() + ' / ' + label
    })
  }

  if (!isDefaultPageSizeOptionValid) {
    console.error('Default page size is not a valid option. Default page size: ' + defaultSize)
  }

  return (
    <Select
      defaultValue={ defaultSize.toString() }
      onChange={ handleChange }
      options={ options }
    />
  )
}
