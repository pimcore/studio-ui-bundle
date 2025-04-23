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
import { type DefaultOptionType } from 'antd/es/select'
import { Select } from '@Pimcore/components/select/select'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'

export interface DynamicTypeFieldFilterSelectProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterSelectComponent = (props: DynamicTypeFieldFilterSelectProps): React.JSX.Element => {
  const { setData, data, config } = useDynamicFilter()
  const [_value, setValue] = useState(data)
  const options: DefaultOptionType[] = []

  if (config.options !== undefined) {
    for (const option of config.options) {
      options.push({
        label: option,
        value: option
      })
    }
  }

  useEffect(() => {
    setValue(data)
  }, [data])

  return (
    <Select
      onBlur={ onBlur }
      onChange={ (value: string) => { setValue(value) } }
      options={ options }
      style={ { width: '100%' } }
      value={ _value }
    />
  )

  function onBlur (): void {
    setData(_value)
  }
}
