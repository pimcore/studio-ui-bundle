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

export const DynamicTypeFieldFilterBooleanSelectComponent = (): React.JSX.Element => {
  const { setData, data } = useDynamicFilter()
  const [_value, setValue] = useState(data)

  const options = [
    { label: 'True', value: true },
    { label: 'False', value: false },
    { label: 'Empty', value: null }
  ]

  return (
    <Select
      onBlur={ onBlur }
      onChange={ (value: boolean | null) => { setValue(value) } }
      options={ options as any }
      style={ { width: '100%' } }
      value={ _value }
    />
  )

  function onBlur (): void {
    setData(_value)
  }
}
