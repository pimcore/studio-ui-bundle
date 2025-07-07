/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useInjection } from '@Pimcore/app/depency-injection'
import { useCssComponentHash } from '@Pimcore/modules/ant-design/hooks/use-css-component-hash'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import type { AssetGetGridApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { type DynamicTypeGridCellRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/dynamic-type-grid-cell-registry'
import { type GridProps } from '@Pimcore/types/components/types'
import {
  type CellContext,
  type Column,
  type ColumnDef,
  type ColumnResizeMode,
  type ColumnSizingInfoState,
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  getSortedRowModel,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type TableOptions,
  useReactTable
} from '@tanstack/react-table'
import { Checkbox, Skeleton } from 'antd'
import cn from 'classnames'
import { isEmpty, isNumber } from 'lodash'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SortButton, type SortDirection, SortDirections } from '../sort-button/sort-button'
import { DefaultCell } from './columns/default-cell'
import { GridRow } from './grid-cell/grid-row'
import { useStyles } from './grid.styles'
import { Resizer } from './resizer/resizer'
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

export interface ColumnMetaType {
  editable?: boolean
  clearable?: boolean
  autoWidth?: boolean
  type?: string
  columnKey?: string
  config?: any
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface ColumnMeta<TData extends RowData, TValue> extends ColumnMetaType { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface TableMeta<TData extends RowData> {
    onUpdateCellData?: ({ rowIndex, columnId, value }: { rowIndex: number, columnId: string, value: any, rowData: TData, meta?: Record<string, any> }) => void
  }
}

export interface GridCellReference {
  rowIndex: number
  columnIndex: number
  columnId: string
}

export interface ExtendedCellContext extends CellContext<any, any> {
  modified?: boolean
  active?: boolean
  onFocus?: (cell: GridCellReference) => void
}

export interface GridContextMenuProps extends Pick<AssetGetGridApiResponse['items'][number], 'isLocked' | 'permissions'> {
  id: number
}

export const Grid = ({
  enableMultipleRowSelection = false,
  modifiedCells = [],
  sorting,
  manualSorting = false,
  enableSorting = false,
  hideColumnHeaders = false,
  highlightActiveCell = false,
  onActiveCellChange,
  enableRowSelection = false,
  selectedRows = {},
  disabled = false,
  enableRowDrag,
  handleDragEnd,
  ...props
}: GridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const hashId = useCssComponentHash()
  const { styles } = useStyles()
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange')
  const [activeCell, setActiveCell] = useState<GridCellReference | undefined>()
  const [tableAutoWidth, setTableAutoWidth] = useState<boolean>(props.autoWidth ?? false)
  const tableElement = useRef<HTMLTableElement>(null)
  const isRowSelectionEnabled = useMemo(() => enableMultipleRowSelection || enableRowSelection, [enableMultipleRowSelection, enableRowSelection])
  const [internalSorting, setInternalSorting] = useState<SortingState>(sorting ?? [])
  const memoModifiedCells = useMemo(() => { return modifiedCells ?? [] }, [JSON.stringify(modifiedCells)])
  const autoColumnRef = useRef<HTMLTableCellElement>(null)
  const gridCellRegistry = useInjection<DynamicTypeGridCellRegistry>(serviceIds['DynamicTypes/GridCellRegistry'])

  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    onActiveCellChange?.(activeCell)
  }, [activeCell])

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

  columns.forEach(column => {
    if (column.meta?.type !== undefined) {
      if (isNumber(column.size)) {
        return
      }
      const dynamicType = gridCellRegistry.getDynamicType(column.meta.type, false)
      if (dynamicType?.getDefaultGridColumnWidth !== undefined) {
        column.size = dynamicType.getDefaultGridColumnWidth(column.meta)
      }
    }
  })

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

          if (!isEmpty(newValue?.columnSizingStart)) {
            newValue.columnSizingStart.forEach(columnSizing => {
              columnSizing[1] = columnWidth
            })
          }
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
            trackError(new GeneralError('Only one column can have autoWidth set to true when table autoWidth is enabled.'))
          }
          autoWidthColumnFound = true
        }
      }
    }
  }, [columns, tableAutoWidth])

  const table = useReactTable(tableProps)

  const onFocusCell = useCallback((cell: GridCellReference) => {
    setActiveCell(cell)
  }, [])

  const calculateTableWidth = (): number | string => {
    const hasAutoWidthColumn = columns.some(column => column.meta?.autoWidth === true)
    return hasAutoWidthColumn ? 'auto' : table.getCenterTotalSize()
  }

  const renderSortButton = ({ headerColumn }: { headerColumn: Column<any> }): JSX.Element => (
    <div className='grid__sorter'>
      <SortButton
        allowUnsorted={ sorting === undefined }
        onSortingChange={ (value) => {
          updateSortDirection(headerColumn, value)
        } }
        value={ getSortDirection(headerColumn) }
      />
    </div>
  )

  const renderRows = (): React.JSX.Element[] => {
    return table.getRowModel().rows.map(row => (
      <GridRow
        activeColumId={ highlightActiveCell && row.index === activeCell?.rowIndex ? activeCell.columnId : undefined }
        columns={ columns }
        contextMenu={ props.contextMenu }
        enableRowDrag={ enableRowDrag }
        isSelected={ row.getIsSelected() }
        key={ row.id }
        modifiedCells={ JSON.stringify(getModifiedRow(row.id)) }
        onFocusCell={ onFocusCell }
        onRowDoubleClick={ props.onRowDoubleClick }
        row={ row }
        tableElement={ tableElement }
      />
    ))
  }

  return useMemo(() => (
    <div className={ cn('ant-table-wrapper', hashId, styles.grid, props.className, { [styles.disabledGrid]: disabled }) }>
      <div className="ant-table ant-table-small">
        <div className='ant-table-container'>
          <div className='ant-table-content'>
            <table
              className={ cn({ withoutHeader: hideColumnHeaders }) }
              ref={ tableElement }
              style={ { width: tableAutoWidth ? '100%' : calculateTableWidth(), minWidth: table.getCenterTotalSize() } }
            >
              {!hideColumnHeaders && (
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

                            {header.column.getCanSort() && renderSortButton({ headerColumn: header.column })}
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
              )}
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
                {enableRowDrag === true
                  ? (
                    <DndContext
                      autoScroll={ false }
                      collisionDetection={ closestCenter }
                      modifiers={ [restrictToVerticalAxis] }
                      onDragEnd={ handleDragEnd }
                      sensors={ sensors }
                    >
                      <SortableContext
                        items={ table.getRowModel().rows.map(item => item.id) }
                        strategy={ verticalListSortingStrategy }
                      >
                        {renderRows()}
                      </SortableContext>
                    </DndContext>
                    )
                  : renderRows()
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ), [table, modifiedCells, table.getTotalSize(), data, columns, rowSelection, internalSorting, highlightActiveCell ? activeCell : undefined])

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

export * from './edit-mode/use-edit-mode'
