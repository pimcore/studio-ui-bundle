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
import { SelectCell } from '@Pimcore/components/grid/columns/types/select/select-cell'
import { BooleanCell } from '@Pimcore/components/grid/columns/types/boolean/boolean-cell'
import {
  ElementCell
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/properties/components/table/cells/element-cell/element-cell'
import { DateCell } from '@Pimcore/components/grid/columns/types/date/date-cell'
import { TextareaCell } from '@Pimcore/components/grid/columns/types/textarea/textarea-cell'

export const TypeDependentContent = (props: DefaultCellProps): React.JSX.Element => {
  const propertyType = props.row.original.type

  function renderCell (): React.JSX.Element {
    switch (propertyType) {
      case 'select':
        return <SelectCell { ...props } />
      case 'bool':
      case 'checkbox':
        return <BooleanCell { ...props } />
      case 'input':
      case 'text':
        return <TextCell { ...props } />
      case 'textarea':
        return <TextareaCell { ...props } />
      case 'document':
      case 'asset':
      case 'object':
        return <ElementCell { ...props } />
      case 'date':
        return <DateCell { ...props } />
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
