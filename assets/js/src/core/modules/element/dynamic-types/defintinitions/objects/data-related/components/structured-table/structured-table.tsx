/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect, useState } from 'react'
import {
  StructuredTableGrid
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/structured-table/components/grid/grid'

export interface StructuredTableProps {
  rows: StructuredTableRow[]
  cols: StructuredTableCol[]
  value?: StructuredTableValue | null
  onChange?: (value: StructuredTableValue | null) => void
}

export interface StructuredTableRow {
  position: number
  key: string
  label: string
}

export interface StructuredTableCol {
  position: number
  key: string
  label: string
  type: StructuredTableColType
  length: number | null
  width: number | null
}

export type StructuredTableColType = 'text' | 'bool' | 'number'
export type StructuredTableValue = Record<string, Record<string, string | null | number | boolean>>

export const StructuredTable = (props: StructuredTableProps): React.JSX.Element => {
  const [value, setValue] = useState<StructuredTableValue | null>(props.value ?? null)

  const onChange = (value: StructuredTableValue | null): void => {
    setValue(value)
  }

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  return (
    <StructuredTableGrid
      cols={ props.cols }
      onChange={ onChange }
      rows={ props.rows }
      value={ value }
    />
  )
}
