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
  type Column,
  type ColumnDef,
  type ColumnResizeMode, type ColumnSizingInfoState,
  flexRender, functionalUpdate,
  getCoreRowModel, getSortedRowModel,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  useReactTable
} from '@tanstack/react-table'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useStyles } from './grid.styles'
import { Resizer } from './resizer/resizer'
import { DefaultCell } from './columns/default-cell'
import { useTranslation } from 'react-i18next'
import { Checkbox, Skeleton } from 'antd'
import { GridRow } from './grid-cell/grid-row'
import { SortButton, type SortDirection, SortDirections } from '../sort-button/sort-button'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ColumnMeta<TData extends RowData, TValue> {
    editable?: boolean
    autoWidth?: boolean
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

export interface OnUpdateCellDataEvent {
  rowIndex: number
  columnId: string
  value: any
  rowData: any
}

export interface GridProps {
  data: any[]
  columns: Array<ColumnDef<any>>
  resizable?: boolean
  onUpdateCellData?: (event: OnUpdateCellDataEvent) => void
  modifiedCells?: Array<{ rowIndex: number | string, columnId: string }>
  isLoading?: boolean
  initialState?: TableOptions<any>['initialState']
  enableRowSelection?: boolean
  enableMultipleRowSelection?: boolean
  selectedRows?: RowSelectionState
  enableSorting?: boolean
  manualSorting?: boolean
  onSelectedRowsChange?: (selectedRows: RowSelectionState) => void
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  setRowId?: (originalRow: any, index: number, parent: any) => string
  autoWidth?: boolean
}

export const Grid = ({ enableMultipleRowSelection = false, modifiedCells = [], sorting, manualSorting = false, enableSorting = false, enableRowSelection = false, selectedRows = {}, ...props }: GridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const hashId = useCssComponentHash('table')
  const { styles } = useStyles()
  const [columnResizeMode] = useState<ColumnResizeMode>('onEnd')
  const [tableAutoWidth, setTableAutoWidth] = useState<boolean>(props.autoWidth ?? false)
  const tableElement = useRef<HTMLTableElement>(null)
  const isRowSelectionEnabled = useMemo(() => enableMultipleRowSelection || enableRowSelection, [enableMultipleRowSelection, enableRowSelection])
  const [internalSorting, setInternalSorting] = useState<SortingState>(sorting ?? [])
  const memoModifiedCells = useMemo(() => { return modifiedCells ?? [] }, [JSON.stringify(modifiedCells)])
  const autoColumnRef = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    if (sorting !== undefined) {
      setInternalSorting(sorting)
    }
  }, [sorting])

  const data = useMemo(
    () => {
      return props.isLoading === true ? Array(5).fill({}) : props.data
    },
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

  useMemo(() => {
    updateRowSelectionColumn()
  }, [columns, isRowSelectionEnabled, selectedRows])

  const tableProps: TableOptions<any> = useMemo(() => ({
    data,
    state: {
      rowSelection,
      sorting: internalSorting
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
    onSortingChange: updateSorting,
    enableSorting,
    manualSorting,
    getRowId: props.setRowId,
    enableMultiSorting: false,
    meta: {
      onUpdateCellData: props.onUpdateCellData
    }
  }), [data, columns, rowSelection, props.initialState])

  if (props.resizable === true) {
    tableProps.columnResizeMode = columnResizeMode
  }

  const [columnSizingInfo, setColumnSizingInfo] = useState<ColumnSizingInfoState>()

  tableProps.onColumnSizingInfoChange = (updater) => {
    // Update your own state with the new column sizing info
    const newValue = functionalUpdate(updater, columnSizingInfo)

    if (tableAutoWidth && typeof newValue !== 'undefined' && typeof newValue?.isResizingColumn === 'string') {
      const column = table.getColumn(newValue.isResizingColumn)
      const columnWidth = autoColumnRef.current?.clientWidth
      if (column?.columnDef.meta?.autoWidth === true && typeof columnWidth !== 'undefined') {
        column.columnDef.size = columnWidth
        column.columnDef.meta.autoWidth = false

        if (typeof autoColumnRef.current?.clientWidth !== 'undefined') {
          newValue.startSize = autoColumnRef.current?.clientWidth
          newValue.columnSizingStart.forEach(columnSizing => {
            columnSizing[1] = columnWidth
          })
        }

        setColumnSizingInfo(newValue)
        setTableAutoWidth(false)
        return
      }
    }

    setColumnSizingInfo(updater)
  }

  // validate if only one column has autoWidth set to true
  useMemo(() => {
    if (tableAutoWidth) {
      let autoWidthColumnFound: boolean = false
      for (const column of columns) {
        if (column.meta?.autoWidth === true) {
          if (autoWidthColumnFound) {
            throw new Error('Only one column can have autoWidth set to true')
          }
          autoWidthColumnFound = true
        }
      }
    }
  }, [columns, tableAutoWidth])

  const table = useReactTable(tableProps)

  return useMemo(() => (
    <div className={ ['ant-table-wrapper', hashId, styles.grid].join(' ') }>
      <div className="ant-table ant-table-small">
        <div className='ant-table-container'>
          <div className='ant-table-content'>
            <table
              ref={ tableElement }
              style={ { width: tableAutoWidth ? '100%' : table.getCenterTotalSize(), minWidth: table.getCenterTotalSize() } }
            >
              <thead className='ant-table-thead'>
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={ headerGroup.id }>
                    {headerGroup.headers.map((header, index) => (
                      <th
                        className='ant-table-cell'
                        key={ header.id }
                        ref={ header.column.columnDef.meta?.autoWidth === true ? autoColumnRef : null }
                        style={
                            header.column.columnDef.meta?.autoWidth === true && !header.column.getIsResizing()
                              ? {
                                  width: 'auto',
                                  minWidth: header.column.getSize()
                                }
                              : {
                                  width: header.column.getSize(),
                                  maxWidth: header.column.getSize()
                                }
                          }
                      >
                        <div className='grid__cell-content'>
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>

                          {header.column.getCanSort() && (
                            <div className='grid__sorter'>
                              <SortButton
                                allowUnsorted={ sorting === undefined }
                                onSortingChange={ (value) => { updateSortDirection(header.column, value) } }
                                value={ getSortDirection(header.column) }
                              />
                            </div>
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
                  <GridRow
                    columns={ columns }
                    isSelected={ row.getIsSelected() }
                    key={ row.id }
                    modifiedCells={ JSON.stringify(getModifiedRow(row.id)) }
                    row={ row }
                    tableElement={ tableElement }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ), [table, modifiedCells, data, columns, rowSelection, internalSorting])

  function getModifiedRow (rowIndex: string): GridProps['modifiedCells'] {
    return memoModifiedCells.filter(({ rowIndex: rIndex }) => String(rIndex) === String(rowIndex)) ?? []
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
          <div style={ { display: 'Flex', alignItems: 'center', justifyContent: 'center', width: '100%' } }>
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

  function updateSorting (sorting: SortingState): void {
    if (props.onSortingChange !== undefined) {
      props.onSortingChange(sorting)
      return
    }

    setInternalSorting(sorting)
  }

  function updateSortDirection (column, direction: SortDirection): void {
    if (direction === undefined) {
      table.setSorting([])
      return
    }

    table.setSorting([{ id: column.id, desc: direction === SortDirections.DESC }])
  }

  function getSortDirection (column: Column<any>): SortDirection | undefined {
    const sortDirection = internalSorting.find(({ id }) => id === column.id)?.desc

    if (sortDirection === undefined) {
      return undefined
    }

    return sortDirection ? SortDirections.DESC : SortDirections.ASC
  }
}
