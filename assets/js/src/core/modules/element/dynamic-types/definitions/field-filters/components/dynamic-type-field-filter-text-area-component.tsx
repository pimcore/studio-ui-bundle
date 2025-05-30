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
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { TextArea } from '@sdk/components'

export interface DynamicTypeFieldFilterTextAreaProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterTextAreaComponent = (): React.JSX.Element => {
  const { data, setData } = useDynamicFilter()
  const [_value, setValue] = useState(data)

  useEffect(() => {
    setValue(data)
  }, [data])

  useEffect(() => {
    setData('')
  }, [])

  return (
    <TextArea
      onBlur={ onBlur }
      onChange={ (event) => { setValue(event.target.value) } }
      value={ _value }
    />
  )

  function onBlur (): void {
    setData(_value)
  }
}
