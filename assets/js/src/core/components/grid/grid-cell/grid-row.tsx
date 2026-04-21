/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type CSSProperties, useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import { type Row } from '@tanstack/react-table'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { isNull } from 'lodash'
import { GridCell } from './grid-cell'
import { type GridContextProviderProps } from '../grid-context'
import { type GridProps, type ListGridContextMenuComponents, type ListGridContextMenuProps } from '@Pimcore/types/components/types'
import { type GridCellReference } from '@Pimcore/components/grid/grid'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Flex } from '@Pimcore/components/flex/flex'
import { createTableRowTestId } from '@Pimcore/utils/test-id-generator'
import { type VirtualItem } from '@tanstack/react-virtual'

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
  enableRowVirtualizer: boolean
  enableColumnVirtualizer: boolean
  size?: GridProps['size']
  rowStyle?: CSSProperties
  measureElement?: (node: HTMLElement | null) => void
  virtualIndex?: number
  virtualColumns?: VirtualItem[]
  virtualPaddingLeft?: number
  virtualPaddingRight?: number
}

const GridRow = ({ row, isSelected, modifiedCells, rowStyle, virtualColumns, virtualPaddingLeft, virtualPaddingRight, enableColumnVirtualizer, enableRowVirtualizer, ...props }: GridRowProps): React.JSX.Element => {
  const { setNodeRef, transform, transition, isDragging, attributes, listeners } = useSortable({
    id: row.id
  })

  // Since dnd-kit does not allow assigning multiple refs directly,
  // we need a separate ref for the virtualizer.
  // The logic below combines both refs so that the node can be used
  // for drag-and-drop and also measured by the virtualizer.
  const internalNodeRef = useRef<HTMLElement | null>(null)

  const combinedRef = useCallback((node: HTMLElement | null): void => {
    internalNodeRef.current = node
    setNodeRef(node)
  }, [setNodeRef])

  useLayoutEffect(() => {
    if (isDragging || isNull(internalNodeRef.current)) return

    // measure dynamic row
    props?.measureElement?.(internalNodeRef.current)
  }, [isDragging, props.measureElement])

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
    ...rowStyle
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

  const visibleCells = useMemo(() => {
    return enableColumnVirtualizer ? virtualColumns?.map((virtualColumn) => row.getVisibleCells()[virtualColumn.index]) : row.getVisibleCells()
  }, [enableColumnVirtualizer, virtualColumns, JSON.stringify(row)])

  return useMemo(() => renderWithContextMenu(
    <tr
      className={ [
        'ant-table-row',
        row.getIsSelected() ? 'ant-table-row-selected' : '',
        props.onRowDoubleClick !== undefined ? 'hover' : ''
      ].join(' ') }
      data-index={ props?.virtualIndex } // needed for dynamic row height measurement
      data-testid={ createTableRowTestId(row.index) }
      onDoubleClick={ onRowDoubleClick }
      ref={ combinedRef }
      style={
        enableColumnVirtualizer
          ? {
              ...style,
              paddingLeft: virtualPaddingLeft,
              paddingRight: virtualPaddingRight
            }
          : { ...style }
      }
    >
      {visibleCells?.map((cell) => {
        const isAutoWidth = cell.column.columnDef.meta?.autoWidth === true
        const columnSize = cell.column.getSize()

        const tdStyle: CSSProperties = isAutoWidth
          ? {
              width: 'auto',
              minWidth: columnSize,
              ...(enableRowVirtualizer ? { flexShrink: 1, flexGrow: 1 } : {})
            }
          : {
              width: columnSize,
              maxWidth: columnSize,
              ...(enableRowVirtualizer ? { flexShrink: 0 } : {})
            }

        return (
          <td
            className='ant-table-cell'
            key={ cell.id }
            style={ tdStyle }
          >
            {cell.column.id === 'drag-handle'
              ? renderRowReorderButton()
              : (
                <GridCell
                  cell={ cell }
                  isActive={ props.activeColumId === cell.column.id }
                  isModified={ isModifiedCell(cell.column.id) }
                  onFocusCell={ props.onFocusCell }
                  rowIndex={ row.index }
                  size={ props.size }
                  tableElement={ props.tableElement }
                />
                )}
          </td>
        )
      })}
    </tr>
  ), [JSON.stringify(row), memoModifiedCells, isSelected, props.columns, style, visibleCells])

  function isModifiedCell (cellId: string): boolean {
    return memoModifiedCells.find((item) => item.columnId === cellId) !== undefined
  }
}

const CachedGridRow = React.memo(GridRow)

export { CachedGridRow as GridRow }
