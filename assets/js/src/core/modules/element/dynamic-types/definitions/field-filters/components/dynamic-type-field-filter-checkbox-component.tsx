/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { Segmented } from '@sdk/components'

export interface DynamicTypeFieldFilterCheckboxProps extends AbstractFieldFilterDefinition {
  checked?: boolean
}

export const DynamicTypeFieldFilterCheckboxComponent = (props: DynamicTypeFieldFilterCheckboxProps): React.JSX.Element => {
  const { setData, data } = useDynamicFilter()

  useEffect(() => {
    setData(false)
  }, [])

  const handleChange = (val: 'true' | 'false'): void => {
    const boolValue = val === 'true'
    setData(boolValue)
  }

  return (
    <Segmented
      onChange={ handleChange }
      options={ [
        { label: 'True', value: 'true' },
        { label: 'False', value: 'false' }
      ] }
      value={ (data === true) ? 'true' : 'false' }
    />

  )
}
