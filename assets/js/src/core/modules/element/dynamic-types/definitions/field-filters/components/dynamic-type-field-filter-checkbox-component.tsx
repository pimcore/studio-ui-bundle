/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { FocusEventHandler, useEffect, useState } from 'react'
import { type DefaultOptionType } from 'antd/es/select'
import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { Checkbox } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

export interface DynamicTypeFieldFilterCheckboxProps extends AbstractFieldFilterDefinition {
  checked?: boolean
}

export const DynamicTypeFieldFilterCheckboxComponent = (props: DynamicTypeFieldFilterCheckboxProps): React.JSX.Element => {
  const { setData, data } = useDynamicFilter()
  const [_value, setValue] = useState(data)
  const options: DefaultOptionType[] = []

  useEffect(() => {
    setValue(data)
  }, [data])

  const handleBlur = (): void => { console.log('setValue', _value); setData(_value) }

  const handleChange = (e: CheckboxChangeEvent): void => { setValue(e.target.checked) }

  return (
    <Checkbox
      value={_value}
      checked={_value}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  )
}
