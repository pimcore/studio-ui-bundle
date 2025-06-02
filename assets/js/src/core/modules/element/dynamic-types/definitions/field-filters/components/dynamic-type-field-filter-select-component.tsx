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
import { Select } from '@Pimcore/components/select/select'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { DefaultOptionType } from 'antd/es/select'

interface SelectConfig {
  options: string[];
}

export const DynamicTypeFieldFilterSelectComponent = (): React.JSX.Element => {
  const { setData, data, config: rawConfig } = useDynamicFilter()
  const [_value, setValue] = useState(data)
 
  const config = rawConfig as SelectConfig;

  const rawOptions = config.options ;
  const formattedOptions: DefaultOptionType[] = rawOptions.map((opt: string) => ({
    label: opt,
    value: opt
  }));
  
  useEffect(() => {
    setValue(data)
  }, [data])

  return (
    <Select
      onBlur={ onBlur }
      onChange={ (value: string) => { setValue(value) } }
      options={ formattedOptions }
      style={ { width: '100%' } }
      value={ _value }
    />
  )

  function onBlur (): void {
    setData(_value)
  }
}
