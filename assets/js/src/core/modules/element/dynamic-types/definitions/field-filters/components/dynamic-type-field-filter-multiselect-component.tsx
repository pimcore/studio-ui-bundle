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
import { renderSelectOptionLabel } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/utils/select-options'

export type MultiselectValue = string[]

export const DynamicTypeFieldFilterMultiselectComponent = (): React.JSX.Element => {
  const { setData, data, config } = useDynamicFilter()
  const [value, setValue] = useState<string[]>(data as MultiselectValue)

  let formattedOptions: DefaultOptionType[] = []
  const options = config?.fieldDefinition?.options ?? config?.definition?.options

  if (Array.isArray(options)) {
    formattedOptions = options.map((opt) => ({
      ...renderSelectOptionLabel(String(opt?.key)),
      value: opt?.value
    }))
  }

  useEffect(() => {
    setValue(data as MultiselectValue)
  }, [data])

  const handleChange = (value: MultiselectValue): void => {
    setValue(value)
    setData(value)
  }

  const hasHtmlLabels = formattedOptions.some(o => o.title !== undefined)

  return (
    <Select
      mode="multiple"
      onChange={ handleChange }
      optionFilterProp={ hasHtmlLabels ? 'title' : 'label' }
      options={ formattedOptions }
      showSearch={ config?.showSearch ?? false }
      style={ { width: '100%' } }
      value={ value }
    />
  )
}
