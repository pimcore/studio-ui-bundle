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

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { SelectCell, type SelectCellConfig } from '@Pimcore/components/grid/columns/types/select/select-cell'
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'

export const ValueSelectCell = (props: DefaultCellProps): React.JSX.Element => {
  const selectOptions = props.row.original.config ?? ''
  const formattedSelectOptions = selectOptions.split(',').map((value: string) => {
    return { value, label: value }
  })

  const columnConfig: SelectCellConfig = {
    options: formattedSelectOptions
  }

  return (
    <SelectCell { ...addColumnConfig(props, columnConfig) } />
  )
}
