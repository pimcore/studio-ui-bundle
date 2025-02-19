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
import { useStyle } from './element-cell.styles'
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface ElementCellConfig {
  allowedTypes: ElementType[] | ((props: DefaultCellProps) => ElementType[])
}

export const ElementCell = (props: DefaultCellProps): React.JSX.Element => {
  const styles = useStyle().styles
  const { column } = props
  const editable = props.column.columnDef.meta?.editable ?? true
  const config = column.columnDef.meta?.config as ElementCellConfig | null ?? {
    allowedTypes: ['asset', 'data-object', 'document']
  }

  const allowedTypes = typeof config.allowedTypes === 'function' ? config.allowedTypes(props) : config.allowedTypes

  function isValidContext (info: DragAndDropInfo): boolean {
    return allowedTypes.includes(info.type as ElementType) && editable
  }

  function onDrop (info: DragAndDropInfo): void {
    const element = info.data as Asset // @todo add other element types as soon as APIs are available
    if (props.column.columnDef.meta?.editable !== undefined && props.table.options.meta?.onUpdateCellData !== undefined) {
      props.table.options.meta?.onUpdateCellData({
        rowIndex: props.row.index,
        columnId: props.column.id,
        value: element,
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
