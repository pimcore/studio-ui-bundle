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
import { type GridProps } from '../grid'

export interface GridRowProps {
  row: Row<any>
  modifiedCells: string
  isSelected?: boolean
  tableElement: GridContextProviderProps['table']
  columns: GridProps['columns']
}

const GridRow = ({ row, isSelected, modifiedCells, ...props }: GridRowProps): React.JSX.Element => {
  const memoModifiedCells = useMemo(() => { return JSON.parse(modifiedCells) }, [modifiedCells])

  return useMemo(() => {
    return (
      <tr
        className={ ['ant-table-row', row.getIsSelected() ? 'ant-table-row-selected' : ''].join(' ') }
        key={ row.id }
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
              isModified={ isModifiedCell(cell.column.id) }
              key={ cell.id }
              tableElement={ props.tableElement }
            />
          </td>
        ))}
      </tr>
    )
  }, [JSON.stringify(row), memoModifiedCells, isSelected, props.columns])

  function isModifiedCell (cellId: string): boolean {
    return memoModifiedCells.find((item) => item.columnId === cellId) !== undefined
  }
}

const CachedGridRow = React.memo(GridRow)

export { CachedGridRow as GridRow }
