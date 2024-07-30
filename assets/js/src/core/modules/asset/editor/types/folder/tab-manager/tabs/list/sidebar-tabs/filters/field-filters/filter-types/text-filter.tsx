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

import React, { useEffect, useState, type ChangeEvent } from 'react'
import { type DefaultFilterProps } from './default-filter'
import { useFilters } from '../../hooks/use-filters'
import { Input } from 'antd'

export const TextFilter = ({ column }: DefaultFilterProps): React.JSX.Element => {
  const { addOrUpdateFieldFilter, getFieldFilter } = useFilters()
  const fieldFilter = getFieldFilter(column)
  const value = fieldFilter?.filterValue ?? ''
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue(value)
  }, [value])

  return (
    <Input
      onBlur={ onBlur }
      onChange={ (event) => { setValue(event.target.value) } }
      type='text'
      value={ _value }
    />
  )

  function onBlur (event: ChangeEvent<HTMLInputElement>): void {
    addOrUpdateFieldFilter(column, _value)
  }
}
