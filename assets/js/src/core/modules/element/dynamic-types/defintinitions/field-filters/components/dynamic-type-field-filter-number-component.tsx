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
import { InputNumber } from 'antd'
import { useFilters } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/sidebar/filters/hooks/use-filters'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'

export interface DynamicTypeFieldFilterNumberProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterNumberComponent = ({ column }: DynamicTypeFieldFilterNumberProps): React.JSX.Element => {
  const { addOrUpdateFieldFilter, getFieldFilter } = useFilters()

  const fieldFilter = getFieldFilter(column)
  const value = ((fieldFilter?.filterValue) != null) ? Number(fieldFilter.filterValue) : null

  const [_value, setValue] = useState<number | null>(value)

  useEffect(() => {
    setValue(value)
  }, [value])

  const handleBlur = (): void => { addOrUpdateFieldFilter(column, _value) }

  const handleChange = (inputValue: number): void => { setValue(inputValue) }

  return (
    <InputNumber
      min={ 1 }
      onBlur={ handleBlur }
      onChange={ handleChange }
      value={ _value }
    />
  )
}
