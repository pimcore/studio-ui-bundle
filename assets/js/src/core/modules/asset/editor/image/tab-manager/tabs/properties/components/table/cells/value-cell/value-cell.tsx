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
import {
  BooleanCell
} from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/properties/components/table/cells/boolean-cell/boolean-cell'
import { TextCell } from '@Pimcore/components/grid/columns/types/text/text-cell'
import {
  SelectCell
} from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/properties/components/table/cells/select-cell/select-cell'
import {
  ElementCell
} from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/properties/components/table/cells/element-cell/element-cell'

export const ValueCell = (props: DefaultCellProps): React.JSX.Element => {
  const propertyType = props.row.original.type

  function renderCell (): React.JSX.Element {
    switch (propertyType) {
      case 'select':
        return <SelectCell { ...props } />
      case 'bool':
        return <BooleanCell { ...props } />
      case 'text':
        return <TextCell { ...props } />
      case 'document':
      case 'asset':
      case 'object':
        return <ElementCell { ...props } />
      default:
        return <div>{ 'cell type not supported' }</div>
    }
  }

  return (
    <>
      {renderCell()}
    </>
  )
}
