import { useCssComponentHash } from '@Pimcore/modules/ant-design/hooks/use-css-component-hash'
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useState } from 'react'
import { useStyles } from './grid.styles'

export interface GridProps {
  data: any[]
  columns: Array<ColumnDef<any>>
}

export const Grid = (props: GridProps): React.JSX.Element => {
  const { columns } = props
  const [data] = useState(props.data)
  const hashId = useCssComponentHash('table')
  const { styles } = useStyles()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className={['ant-table-wrapper', hashId, styles.grid].join(' ')}>
      <div className="ant-table ant-table-small">
        <div className='ant-table-container'>
          <div className='ant-table-content'>
            <table>
              <thead className='ant-table-thead'>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th className='ant-table-cell' key={header.id} style={{ width: header.column.getSize() }}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="ant-table-tbody">
                {table.getRowModel().rows.map(row => (
                  <tr className='ant-table-row' key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td className='ant-table-cell' key={cell.id} style={{ width: cell.column.getSize() }} >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
