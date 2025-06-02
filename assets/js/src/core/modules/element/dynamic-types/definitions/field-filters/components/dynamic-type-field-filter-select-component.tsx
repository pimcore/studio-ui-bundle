/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useEffect, useState } from 'react'
import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { useMetadataSelectOptions } from '../../meta-data/hooks/use-metadata-select-options'
import { DynamicFilterContext } from '@Pimcore/components/dynamic-filter/provider/dynamic-filter-provider'

export interface DynamicTypeFieldFilterSelectProps extends AbstractFieldFilterDefinition {
  options: SelectProps['options']
}

export const DynamicTypeFieldFilterSelectComponent = (props: DynamicTypeFieldFilterSelectProps): React.JSX.Element => {
  const { setData, data } = useDynamicFilter()
  const [_value, setValue] = useState(data)
    const context = useContext(DynamicFilterContext);    
    const {options} = useMetadataSelectOptions(context?.id ?? "")

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
