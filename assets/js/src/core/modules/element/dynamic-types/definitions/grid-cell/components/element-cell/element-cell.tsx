/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { type DragAndDropInfo } from '@sdk/components'
import { ElementCellContent } from './element-cell-content'
import { useStyle } from './element-cell.styles'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { isEmpty } from 'lodash'
import { convertDragAndDropInfoToElementReference } from '@Pimcore/modules/element/element-helper'

export interface ElementInfo {
  elementType?: ElementType
  id?: number
  fullPath: string | false
  published?: boolean
  disabled?: boolean
}

export interface ElementCellConfig {
  allowedTypes?: ElementType[] | ((props: DefaultCellProps) => ElementType[])
  getElementInfo?: (props: DefaultCellProps) => ElementInfo
}

export const ElementCell = (props: DefaultCellProps): React.JSX.Element => {
  const styles = useStyle().styles
  const { column } = props
  const editable = Boolean(props.column.columnDef.meta?.editable ?? true)
  const clearable = Boolean(props.column.columnDef.meta?.clearable ?? true)
  const showPublishedState = Boolean(props.column.columnDef.meta?.showPublishedState ?? true)
  const config = column.columnDef.meta?.config as ElementCellConfig | null ?? {
    allowedTypes: ['asset', 'data-object', 'document']
  }

  const allowedTypes = typeof config.allowedTypes === 'function' ? config.allowedTypes(props) : (config.allowedTypes ?? [])

  function isValidContext (info: DragAndDropInfo): boolean {
    return allowedTypes.includes(info.type as ElementType) && editable
  }

  function onDrop (info: DragAndDropInfo): void {
    if (props.column.columnDef.meta?.editable !== undefined && props.table.options.meta?.onUpdateCellData !== undefined) {
          const expectsStringValue = Boolean(props.column.columnDef.meta?.config?.expectsStringValue)

      const value = expectsStringValue 
        ? info.data.fullPath 
        : convertDragAndDropInfoToElementReference(info, showPublishedState)

      props.table.options.meta?.onUpdateCellData({
        rowIndex: props.row.index,
        columnId: props.column.id,
        value,
        rowData: props.row.original
      })
    }
  }

  const dropDisabled = !editable || isEmpty(allowedTypes)

  return (
    <Droppable
      className={ [styles['element-cell'], 'default-cell__content'].join(' ') }
      disabled={ dropDisabled }
      isValidContext={ isValidContext }
      onDrop={ onDrop }
    >
      <ElementCellContent
        { ...props }
        clearDisabled={ !clearable }
        dropDisabled={ dropDisabled }
        getElementInfo={ config.getElementInfo }
      />
    </Droppable>
  )
}
