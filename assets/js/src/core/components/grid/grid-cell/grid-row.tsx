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
import { type GridProps } from '../grid'
import React, { useMemo } from 'react'
import { GridCell } from './grid-cell'
import { type GridContextProviderProps } from '../grid-context'

export interface GridRowProps {
  row: Row<any>
  modifiedCells: GridProps['modifiedCells']
  isSelected?: boolean
  tableElement: GridContextProviderProps['table']
}

export const GridRow = ({ row, isSelected, ...props }: GridRowProps): React.JSX.Element => {
  const modifiedCells = useMemo(() => props.modifiedCells ?? [], [props.modifiedCells])

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
            style={
              {
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
  }, [row, props.modifiedCells, isSelected])

  function isModifiedCell (cellId: string): boolean {
    return modifiedCells.find((item) => item.columnId === cellId) !== undefined
  }
}
