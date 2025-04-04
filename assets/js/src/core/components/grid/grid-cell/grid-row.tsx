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

import { type Row } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { GridCell } from './grid-cell'
import { type GridContextProviderProps } from '../grid-context'
import { type GridProps, type ListGridContextMenuComponents, type ListGridContextMenuProps } from '@Pimcore/types/components/types'
import { type GridCellReference } from '@Pimcore/components/grid/grid'

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
}

const GridRow = ({ row, isSelected, modifiedCells, ...props }: GridRowProps): React.JSX.Element => {
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
      key={ row.id }
      onDoubleClick={ onRowDoubleClick }
    >
      {row.getVisibleCells().map(cell => (
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
          <GridCell
            cell={ cell }
            isActive={ props.activeColumId === cell.column.id }
            isModified={ isModifiedCell(cell.column.id) }
            key={ cell.id }
            onFocusCell={ props.onFocusCell }
            tableElement={ props.tableElement }
          />
        </td>
      ))}
    </tr>
  ), [JSON.stringify(row), memoModifiedCells, isSelected, props.columns])

  function isModifiedCell (cellId: string): boolean {
    return memoModifiedCells.find((item) => item.columnId === cellId) !== undefined
  }
}

const CachedGridRow = React.memo(GridRow)

export { CachedGridRow as GridRow }
