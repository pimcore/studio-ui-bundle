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
import { TextCell } from '@Pimcore/components/grid/columns/types/text/text-cell'
import { SelectCell } from '@Pimcore/components/grid/columns/types/value-select/select-cell'
import {
  ElementCell
} from '@Pimcore/components/grid/columns/types/element-cell/element-cell'
import { CheckboxCell } from '@Pimcore/components/grid/columns/types/checkbox/checkbox-cell'
import { Alert } from 'antd'

export const ValueCell = (props: DefaultCellProps): React.JSX.Element => {
  const propertyType = props.row.original.type

  function renderCell (): React.JSX.Element {
    switch (propertyType) {
      case 'select':
        return <SelectCell { ...props } />
      case 'bool':
        return <CheckboxCell { ...props } />
      case 'text':
        return <TextCell { ...props } />
      case 'document':
      case 'asset':
      case 'object':
        return <ElementCell { ...props } />
      default:
        return (
          <Alert
            message="cell type not supported"
            style={ { display: 'flex' } }
            type="warning"
          />
        )
    }
  }

  return (
    <>
      {renderCell()}
    </>
  )
}
