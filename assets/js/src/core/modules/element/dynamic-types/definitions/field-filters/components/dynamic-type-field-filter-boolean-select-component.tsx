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
import { type DefaultOptionType } from 'antd/es/select'
import { useFocusRestore } from '@Pimcore/modules/element/listing/decorators/general-filters/view-layer/components/sidebar/tabs/filters/focus-context'

interface IObjectSelectConfig {
  fieldDefinition: {
    options: Array<{ key: string, value: number }>
    fieldtype?: string
  }
}

interface IAssetSelectConfig {
  options: string[]
}

const numToBool = (value: number): boolean | null => {
  switch (value) {
    case -1: return false
    case 0: return null
    case 1: return true
    default: return null
  }
}

const boolToNum = (value: boolean | null): number => {
  if (value === true) return 1
  if (value === false) return -1
  return 0
}

export const DynamicTypeFieldFilterBooleanSelectComponent = (): React.JSX.Element => {
  const { setData, data, config: rawConfig } = useDynamicFilter()
  const { restoreFocus } = useFocusRestore()
  const config: IAssetSelectConfig | IObjectSelectConfig = rawConfig

  const [_value, setValue] = useState<number[]>([])

  const defaultOptions = [
    { label: 'True', value: 1 },
    { label: 'False', value: -1 },
    { label: 'Empty', value: 0 }
  ]

  let formattedOptions: DefaultOptionType[] = []
  if ('fieldDefinition' in config && Array.isArray(config?.fieldDefinition?.options)) {
    formattedOptions = config.fieldDefinition.options.map((opt) => ({
      label: opt.key,
      value: opt.value
    }))
  } else {
    formattedOptions = defaultOptions
  }

  useEffect(() => {
    const incoming = (data as Array<boolean | null> | undefined) ?? []
    setValue(incoming.map(boolToNum))
  }, [data])

  const handleChange = (value: number[]): void => {
    setValue(value)
    setData(value.map(numToBool))
  }

  return (
    <Select
      mode="multiple"
      onChange={ handleChange }
      onDropdownVisibleChange={ (open: boolean) => { if (!open) restoreFocus() } }
      options={ formattedOptions }
      style={ { width: '100%' } }
      value={ _value }
    />
  )
}
