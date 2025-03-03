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
import { Select } from '@Pimcore/components/select/select'
import type { DefaultOptionType } from 'rc-select/lib/Select'

interface SizeChangerProps {
  sizeOptions: Array<number | string>
  defaultSize: number
  handleChange: (pageSize: number) => void
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
      value: pageSizeOption,
      label: pageSizeOption.toString() + ' / ' + label
    })
  }

  if (!isDefaultPageSizeOptionValid) {
    console.error('Default page size is not a valid option. Default page size: ' + defaultSize)
  }

  return (
    <Select
      defaultValue={ defaultSize }
      onChange={ handleChange }
      options={ options }
    />
  )
}
