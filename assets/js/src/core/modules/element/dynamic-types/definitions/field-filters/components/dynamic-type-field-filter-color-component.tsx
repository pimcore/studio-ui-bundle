/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/use-dynamic-filter'
import { type AbstractFieldFilterDefinition } from '../dynamic-type-field-filter-abstract'
import { ColorPicker } from '@sdk/components'

export interface DynamicTypeFieldFilterColorProps extends AbstractFieldFilterDefinition {}

export const DynamicTypeFieldFilterColorComponent = (props: DynamicTypeFieldFilterColorProps): React.JSX.Element => {
  const { data, setData } = useDynamicFilter()

  return (
    <ColorPicker 
      value={data}
      format='hex'
      disabledFormat
      onChange={(value) => {setData(value.toRgb())}}
    />
  )
}
