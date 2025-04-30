/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { InputNumber } from 'antd'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'

export interface DynamicTypeFieldFilterNumberProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterNumberComponent = (props: DynamicTypeFieldFilterNumberProps): React.JSX.Element => {
  const { data, setData } = useDynamicFilter()
  const currentData: number | null = data ?? null
  const [_value, setValue] = useState<number | null>(currentData)

  useEffect(() => {
    setValue(currentData)
  }, [currentData])

  const handleBlur = (): void => { setData(_value) }

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
