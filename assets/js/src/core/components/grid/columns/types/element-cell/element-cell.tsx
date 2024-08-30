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

import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import { ElementCellContent } from './element-cell-content'
import { type Asset } from '../../../../../../sdk/main'
import { useStyle } from './element-cell.styles'

export const ElementCell = (props: DefaultCellProps): React.JSX.Element => {
  const styles = useStyle().styles
  const editable = props.column.columnDef.meta?.editable ?? true

  function isValidContext (info: DragAndDropInfo): boolean {
    return info.type === 'asset' && editable
  }

  function onDrop (info: DragAndDropInfo): void {
    const asset = info.data as Asset
    const propertyUpdate = {
      path: asset.path,
      id: asset.id,
      type: asset.type,
      filename: asset.filename
    }

    if (props.column.columnDef.meta?.editable !== undefined && props.table.options.meta?.onUpdateCellData !== undefined) {
      props.table.options.meta?.onUpdateCellData({
        rowIndex: props.row.index,
        columnId: props.column.id,
        value: propertyUpdate,
        rowData: props.row.original
      })
    }
  }

  return (
    <Droppable
      className={ [styles['element-cell'], 'default-cell__content'].join(' ') }
      isValidContext={ isValidContext }
      onDrop={ onDrop }
    >
      <ElementCellContent { ...props } />
    </Droppable>
  )
}
