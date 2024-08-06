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
import { type DefaultFilterProps } from './default-filter'
import { useFilters } from '../../hooks/use-filters'
import { Select } from 'antd'
import { type DefaultOptionType } from 'antd/es/select'

export const SelectFilter = ({ column }: DefaultFilterProps): React.JSX.Element => {
  const { addOrUpdateFieldFilter, getFieldFilter } = useFilters()
  const fieldFilter = getFieldFilter(column)
  const value = fieldFilter !== undefined ? fieldFilter.filterValue : ''
  const [_value, setValue] = useState(value)
  const options: DefaultOptionType[] = []
  // @todo check for more explicit typing here
  const config = column.config as any

  if (config.options !== undefined) {
    for (const option of config.options) {
      options.push({
        label: option,
        value: option
      })
    }
  }

  useEffect(() => {
    setValue(value)
  }, [value])

  return (
    <Select
      onBlur={ onBlur }
      onChange={ (value) => { setValue(value) } }
      options={ options }
      style={ { width: '100%' } }
      value={ _value }
    />
  )

  function onBlur (): void {
    addOrUpdateFieldFilter(column, _value)
  }
}
