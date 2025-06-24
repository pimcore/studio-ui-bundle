/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type CSSProperties, useMemo } from 'react'
import { type Row } from '@tanstack/react-table'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GridCell } from './grid-cell'
import { type GridContextProviderProps } from '../grid-context'
import { type GridProps, type ListGridContextMenuComponents, type ListGridContextMenuProps } from '@Pimcore/types/components/types'
import { type GridCellReference } from '@Pimcore/components/grid/grid'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from '@Pimcore/components/flex/flex'

export interface GridRowProps {
  row: Row<any>
  modifiedCells: string
  isSelected?: boolean
  tableElement: GridContextProviderProps['table']
  columns: GridProps['columns']
  activeColumId?: string
  onFocusCell?: (cell: GridCellReference) => void
  contextMenu?: ListGridContextMenuComponents
  onRowDoubleClick?: GridProps['onRowDoubleClick']
  enableRowDrag?: boolean
}

const GridRow = ({ row, isSelected, modifiedCells, enableRowDrag, ...props }: GridRowProps): React.JSX.Element => {
  const { setNodeRef, transform, transition, isDragging, attributes, listeners } = useSortable({
    id: row.id
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative'
  }

  const memoModifiedCells = useMemo(() => { return JSON.parse(modifiedCells) }, [modifiedCells])

  const renderWithContextMenu = (children: React.ReactNode): React.JSX.Element => {
    if (props.contextMenu !== undefined) {
      const { contextMenu: ContextMenu } = props

      return (
        <ContextMenu row={ row as any as ListGridContextMenuProps['row'] }>
          {children}
        </ContextMenu>
      )
    }

    return <>{children}</>
  }

  const renderRowReorderButton = (): React.JSX.Element => (
    <Flex justify="center">
      <IconButton
        icon={ { value: 'drag-option' } }
        { ...attributes }
        { ...listeners }
        style={ { cursor: 'grab' } }
        tabIndex={ -1 }
      />
    </Flex>
  )

  const onRowDoubleClick = (): void => {
    if (props.onRowDoubleClick !== undefined) {
      props.onRowDoubleClick(row)
    }
  }

  return useMemo(() => renderWithContextMenu(
    <tr
      className={ [
        'ant-table-row',
        row.getIsSelected() ? 'ant-table-row-selected' : '',
        props.onRowDoubleClick !== undefined ? 'hover' : ''
      ].join(' ') }
      onDoubleClick={ onRowDoubleClick }
      ref={ setNodeRef }
      style={ style }
    >
      {row.getVisibleCells().map((cell, index) => (
        <td
          className='ant-table-cell'
          key={ cell.id }
          style={ cell.column.columnDef.meta?.autoWidth === true
            ? {
                width: 'auto',
                minWidth: cell.column.getSize()
              }
            : {
                width: cell.column.getSize(),
                maxWidth: cell.column.getSize()
              }
                }
        >
          {enableRowDrag === true && index === 0
            ? renderRowReorderButton()
            : (
              <GridCell
                cell={ cell }
                isActive={ props.activeColumId === cell.column.id }
                isModified={ isModifiedCell(cell.column.id) }
                onFocusCell={ props.onFocusCell }
                tableElement={ props.tableElement }
              />
              )}
        </td>
      ))}
    </tr>
  ), [JSON.stringify(row), memoModifiedCells, isSelected, props.columns, style])

  function isModifiedCell (cellId: string): boolean {
    return memoModifiedCells.find((item) => item.columnId === cellId) !== undefined
  }
}

const CachedGridRow = React.memo(GridRow)

export { CachedGridRow as GridRow }
