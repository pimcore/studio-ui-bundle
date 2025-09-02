/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { Select } from '@Pimcore/components/select/select'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { type DefaultOptionType } from 'antd/es/select'

interface IObjectSelectConfig {
  fieldDefinition: {
    options: Array<{ key: string, value: number }>
    fieldtype?: string
  }
}

interface IAssetSelectConfig {
  options: string[]
}

const transformBooleanSelectValueToBooleanNull = (value: number): boolean | null => {
  switch (value) {
    case -1:
      return false
    case 0:
      return null
    case 1:
      return true
  }
  return null
}

export const DynamicTypeFieldFilterBooleanSelectComponent = (): React.JSX.Element => {
  const { setData, data, config: rawConfig } = useDynamicFilter()
  const config: IAssetSelectConfig | IObjectSelectConfig = rawConfig

  const [_value, setValue] = useState<number>(data as number)

  let formattedOptions: DefaultOptionType[] = []
  if ('fieldDefinition' in config && Array.isArray(config?.fieldDefinition?.options)) {
    formattedOptions = config.fieldDefinition.options.map((opt) => ({
      label: opt.key,
      value: opt.value
    }))
  }

  return (
    <Select
      onBlur={ onBlur }
      onChange={ (value: number) => { setValue(value) } }
      options={ formattedOptions }
      style={ { width: '100%' } }
      value={ _value }
    />
  )

  function onBlur (): void {
    setData(transformBooleanSelectValueToBooleanNull(_value))
  }
}
