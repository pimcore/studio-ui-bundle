/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
import { Select } from '@Pimcore/components/select/select'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { type DefaultOptionType } from 'antd/es/select'

interface IObjectSelectConfig {
  fieldDefinition: {
    options: Array<{ key: string, value: string }>
  }
}

interface IAssetSelectConfig {
  options: string[]
}

export const DynamicTypeFieldFilterMultiselectComponent = (): React.JSX.Element => {
  const { setData, data, config: rawConfig } = useDynamicFilter()
  const [_value, setValue] = useState<string[]>(data as string[])
  const selectRef = useRef<any>(null)

  const config: IAssetSelectConfig | IObjectSelectConfig = rawConfig
  let formattedOptions: DefaultOptionType[] = []

  if ('fieldDefinition' in config && Array.isArray(config?.fieldDefinition?.options)) {
    formattedOptions = config?.fieldDefinition?.options.map((opt) => ({
      label: opt?.key,
      value: opt?.value
    }))
  } else if ('options' in config && Array.isArray(config.options)) {
    formattedOptions = config.options.map((opt) => ({
      label: opt,
      value: opt
    }))
  }

  useEffect(() => {
    setValue(data as string[])
  }, [data])

  const handleChange = (value: string[]): void => {
    setValue(value)
    setData(value)
  }

  return (
    <Select
      mode="multiple"
      onChange={ handleChange }
      onDropdownVisibleChange={ (open: boolean) => { 
        if (!open && selectRef.current !== null) {
          selectRef.current.focus()
        }
      } }
      options={ formattedOptions }
      ref={ selectRef }
      showSearch={ rawConfig?.showSearch ?? false }
      style={ { width: '100%' } }
      value={ _value }
    />
  )
}
