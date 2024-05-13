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

import { useCssComponentHash } from '@Pimcore/modules/ant-design/hooks/use-css-component-hash'
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable, type ColumnResizeMode, type TableOptions } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { useStyles } from './grid.styles'
import { Resizer } from './resizer/resizer'

export interface GridProps {
  data: any[]
  columns: Array<ColumnDef<any>>
  resizable?: boolean
}

export const Grid = (props: GridProps): React.JSX.Element => {
  const [columns] = useState(props.columns)
  const [data, setData] = useState(props.data)
  const hashId = useCssComponentHash('table')
  const { styles } = useStyles()
  const [columnResizeMode] = useState<ColumnResizeMode>('onEnd')

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  const tableProps: TableOptions<any> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  }

  if (props.resizable === true) {
    tableProps.columnResizeMode = columnResizeMode
  }

  const table = useReactTable(tableProps)

  return (
    <div className={ ['ant-table-wrapper', hashId, styles.grid].join(' ') }>
      <div className="ant-table ant-table-small">
        <div className='ant-table-container'>
          <div className='ant-table-content'>
            <table style={ { width: table.getCenterTotalSize() } }>
              <thead className='ant-table-thead'>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={ headerGroup.id }>
                    {headerGroup.headers.map(header => (
                      <th
                        className='ant-table-cell'
                        key={ header.id }
                        style={
                          {
                            width: header.column.getSize(),
                            maxWidth: header.column.getSize()
                          }
                        }
                      >
                        <div className='grid__cell-content'>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>

                        {props.resizable === true && header.column.getCanResize() && (
                          <Resizer
                            header={ header }
                            isResizing={ header.column.getIsResizing() }
                            table={ table }
                          />
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="ant-table-tbody">
                {table.getRowModel().rows.map(row => (
                  <tr
                    className='ant-table-row'
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
                        <div className='grid__cell-content'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>

                        {props.resizable === true && (
                          <Resizer
                            isResizing={ cell.column.getIsResizing() }
                            table={ table }
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
