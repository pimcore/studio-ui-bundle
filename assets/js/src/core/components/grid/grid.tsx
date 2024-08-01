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
import {
  type CellContext,
  type ColumnDef,
  type ColumnResizeMode,
  flexRender,
  getCoreRowModel, getSortedRowModel,
  type RowData,
  type RowSelectionState,
  type TableOptions,
  useReactTable
} from '@tanstack/react-table'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useStyles } from './grid.styles'
import { Resizer } from './resizer/resizer'
import { DefaultCell } from './columns/default-cell'
import { GridContextProvider } from './grid-context'
import { useTranslation } from 'react-i18next'
import { Checkbox, Skeleton } from 'antd'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ColumnMeta<TData extends RowData, TValue> {
    editable?: boolean
    type?: string
    config?: any
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface TableMeta<TData extends RowData> {
    onUpdateCellData?: ({ rowIndex, columnId, value }: { rowIndex: number, columnId: string, value: any, rowData: TData }) => void
  }
}

export interface ExtendedCellContext extends CellContext<any, any> {
  modified?: boolean
}

export interface GridProps {
  data: any[]
  columns: Array<ColumnDef<any>>
  resizable?: boolean
  onUpdateCellData?: ({ rowIndex, columnId, value }: { rowIndex: number, columnId: string, value: any }) => void
  modifiedCells?: Array<{ rowIndex: number, columnId: string }>
  isLoading?: boolean
  initialState?: TableOptions<any>['initialState']
  enableRowSelection?: boolean
  enableMultipleRowSelection?: boolean
  selectedRows?: RowSelectionState
  onSelectedRowsChange?: (selectedRows: RowSelectionState) => void
}

export const Grid = ({ enableMultipleRowSelection = false, enableRowSelection = false, selectedRows = {}, ...props }: GridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const hashId = useCssComponentHash('table')
  const { styles } = useStyles()
  const [columnResizeMode] = useState<ColumnResizeMode>('onEnd')
  const tableElement = useRef<HTMLTableElement>(null)
  const isRowSelectionEnabled = useMemo(() => enableMultipleRowSelection || enableRowSelection, [enableMultipleRowSelection, enableRowSelection])

  const data = useMemo(
    () => (props.isLoading === true ? Array(5).fill({}) : props.data),
    [props.isLoading, props.data]
  )

  const rowSelection = useMemo(() => {
    return selectedRows
  }, [selectedRows])

  const columns = useMemo(
    () =>
      props.isLoading === true
        ? props.columns.map((column) => ({
          ...column,
          cell: <Skeleton.Input
            active
            size={ 'small' }
                />
        }))
        : props.columns,
    [props.isLoading, props.columns]
  ) as Array<ColumnDef<any>>

  useEffect(() => {
    updateRowSelectionColumn()
  }, [isRowSelectionEnabled])

  if (isRowSelectionEnabled) {
    updateRowSelectionColumn()
  }

  const tableProps: TableOptions<any> = {
    data,
    state: {
      rowSelection
    },
    columns,
    initialState: props.initialState,
    defaultColumn: {
      cell: DefaultCell
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: isRowSelectionEnabled,
    enableMultiRowSelection: enableMultipleRowSelection,
    onRowSelectionChange: updateRowSelection,
    meta: {
      onUpdateCellData: props.onUpdateCellData
    }
  }

  if (props.resizable === true) {
    tableProps.columnResizeMode = columnResizeMode
  }

  const table = useReactTable(tableProps)

  return (
    <GridContextProvider table={ tableElement }>
      <div className={ ['ant-table-wrapper', hashId, styles.grid].join(' ') }>
        <div className="ant-table ant-table-small">
          <div className='ant-table-container'>
            <div className='ant-table-content'>
              <table
                ref={ tableElement }
                style={ { width: table.getCenterTotalSize() } }
              >
                <thead className='ant-table-thead'>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={ headerGroup.id }>
                      {headerGroup.headers.map((header, index) => (
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
                  {table.getRowModel().rows.length === 0 && (
                    <tr className={ 'ant-table-row' }>
                      <td
                        className='ant-table-cell ant-table-cell__no-data'
                        colSpan={ table.getAllColumns().length }
                      >
                        {t('no-data-available-yet')}
                      </td>
                    </tr>
                  )}
                  {table.getRowModel().rows.map(row => (
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
                          <div className='grid__cell-content'>
                            {flexRender(cell.column.columnDef.cell, getExtendedCellContext(cell.getContext()))}
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
    </GridContextProvider>
  )

  function getExtendedCellContext (context: CellContext<any, any>): ExtendedCellContext {
    return {
      ...context,
      modified: props.modifiedCells?.some(({ rowIndex, columnId }) => {
        return rowIndex === context.row.index && columnId === context.column.id
      })
    }
  }

  function updateRowSelection (selectedRows: RowSelectionState): void {
    props.onSelectedRowsChange?.(selectedRows)
  }

  function hasRowSelectionColumn (): boolean {
    return columns.some(column => column.id === 'selection')
  }

  function addRowSelectionColumn (): void {
    if (hasRowSelectionColumn()) {
      return
    }

    const column: ColumnDef<any> = {
      id: 'selection',
      header: enableMultipleRowSelection
        ? ({ table }): React.JSX.Element => (
          <div style={ { display: 'Flex', alignItems: 'center', justifyContent: 'center' } }>
            <Checkbox
              checked={ table.getIsAllRowsSelected() }
              indeterminate={ table.getIsSomeRowsSelected() }
              onChange={ table.getToggleAllRowsSelectedHandler() }
            />
          </div>
          )
        : '',

      cell: ({ row }): React.JSX.Element => (
        <div style={ { display: 'Flex', alignItems: 'center', justifyContent: 'center' } }>
          <Checkbox
            checked={ row.getIsSelected() }
            onChange={ row.getToggleSelectedHandler() }
          />
        </div>
      ),

      enableResizing: false,

      size: 50
    }

    columns.unshift(
      column
    )
  }

  function removeRowSelectionColumn (): void {
    if (!hasRowSelectionColumn()) {
      return
    }

    const index = columns.findIndex(column => column.id === 'selection')

    if (index !== -1) {
      columns.splice(index, 1)
    }
  }

  function updateRowSelectionColumn (): void {
    if (isRowSelectionEnabled) {
      addRowSelectionColumn()
    } else {
      removeRowSelectionColumn()
    }
  }
}
