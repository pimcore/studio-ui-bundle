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
import { useVirtualizer } from '@tanstack/react-virtual'
import { Checkbox, ConfigProvider, Skeleton } from 'antd'
import cn from 'classnames'
import { isEmpty, isNumber, isFunction, isNull } from 'lodash'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SortButton, type SortDirection, SortDirections } from '../sort-button/sort-button'
import { DefaultCell } from './columns/default-cell'
import { GridRow } from './grid-cell/grid-row'
import { useStyles } from './grid.styles'
import { Resizer } from './resizer/resizer'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

export interface ColumnMetaType {
  editable?: boolean | ((row: any) => boolean)
  clearable?: boolean
  showPublishedState?: boolean
  autoWidth?: boolean
  type?: string | ((rowData: any) => string)
  columnKey?: string
  tooltip?: string | ((rowData: any) => string | null)
  config?: any | ((rowData: any) => any)
  callback?: boolean
  editCallback?: (row: any, columnId: string, currentValue: string) => Promise<string>
}

declare module '@tanstack/react-table' {
   
  export interface ColumnMeta<TData extends RowData, TValue> extends ColumnMetaType { }

   
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

const DEFAULT_GRID_COLUMN_COUNT = 20
const DEFAULT_GRID_ROW_COUNT = 20

export const Grid = ({
  enableMultipleRowSelection = false,
  modifiedCells = [],
  sorting,
  manualSorting = false,
  enableSorting = false,
  hideColumnHeaders = false,
  highlightActiveCell = false,
  docked = false,
  onActiveCellChange,
  enableRowSelection = false,
  selectedRows = {},
  disabled = false,
  allowMultipleAutoWidthColumns = false,
  enableRowDrag,
  handleDragEnd,
  enableRowVirtualizer = false,
  enableColumnVirtualizer = false,
  size = 'normal',
  ...props
}: GridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const hashId = useCssComponentHash()

  const [columnResizeMode] = useState<ColumnResizeMode>('onChange')
  const [activeCell, setActiveCell] = useState<GridCellReference | undefined>()
  const [tableAutoWidth, setTableAutoWidth] = useState<boolean>(props.autoWidth ?? false)

  const tableElement = useRef<HTMLTableElement>(null)
  const scrollElementRef = useRef<HTMLDivElement>(null) // ref to the scrollable container used by row and column virtualizers
  const autoColumnRef = useRef<HTMLTableCellElement>(null)
  const warnedUndefinedRowIdRef = useRef(false)

  const isRowSelectionEnabled = useMemo(() => enableMultipleRowSelection || enableRowSelection, [enableMultipleRowSelection, enableRowSelection])
  const [internalSorting, setInternalSorting] = useState<SortingState>(sorting ?? [])
  const memoModifiedCells = useMemo(() => { return modifiedCells ?? [] }, [JSON.stringify(modifiedCells)])
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
      return props.isLoading === true ? Array(5).fill({}) : (props.data ?? [])
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
      const columnType = column.meta.type
      // If type is a function, we can't determine width at this point, skip
      if (isFunction(columnType)) {
        return
      }

      const dynamicType = gridCellRegistry.getDynamicType(columnType, false)
      if (dynamicType?.getDefaultGridColumnWidth !== undefined) {
        column.size = dynamicType.getDefaultGridColumnWidth(column.meta)
      }
    }
  })

  useMemo(() => {
    updateRowDragColumn()
    updateRowSelectionColumn()
  }, [columns, isRowSelectionEnabled, enableRowDrag, selectedRows])

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
    getRowId: props.setRowId !== undefined
      ? (originalRow, index, parent): string => {
          const rowId = props.setRowId?.(originalRow, index, parent)

          if (rowId !== undefined) {
            return rowId
          }

          if (props.isLoading !== true && !warnedUndefinedRowIdRef.current) {
            console.warn('Grid: setRowId returned undefined for at least one row. Falling back to index-based row id for that row. Ensure setRowId always returns a defined string for real data rows.')
            warnedUndefinedRowIdRef.current = true
          }

          return parent?.id !== undefined ? `${String(parent.id)}.${String(index)}` : String(index)
        }
      : undefined,
    enableMultiSorting: false,
    meta: {
      onUpdateCellData: props.onUpdateCellData
    }
  }), [data, columns, rowSelection, props.initialState, props.setRowId, props.isLoading])

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
    if (tableAutoWidth && !allowMultipleAutoWidthColumns) {
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

  const rowsList = table.getRowModel().rows
  const columnsList = table.getVisibleLeafColumns()

  const isEnableRowVirtualizer = useMemo(() => enableRowVirtualizer && rowsList?.length > DEFAULT_GRID_ROW_COUNT, [enableRowVirtualizer, rowsList])
  const rowVirtualizer = useVirtualizer({
    count: rowsList.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => 33, // estimate row height for accurate scrollbar dragging
    overscan: 5, // number of extra rows to render outside the viewport for smooth scrolling
    measureElement: (el) => el.getBoundingClientRect().height, // measure dynamic row height
    enabled: isEnableRowVirtualizer
  })
  const virtualRows = rowVirtualizer.getVirtualItems()
  const visibleRowIds = useMemo(() => {
    if (!isEnableRowVirtualizer) return rowsList.map(row => row.id)

    return virtualRows.map(v => rowsList[v.index].id)
  }, [virtualRows, rowsList, isEnableRowVirtualizer])

  const isEnableColumnVirtualizer = useMemo(() => {
    if (props.isLoading === true) return false

    return enableColumnVirtualizer && columnsList?.length > DEFAULT_GRID_COLUMN_COUNT
  }, [enableColumnVirtualizer, columnsList, props.isLoading])
  const columnVirtualizer = useVirtualizer({
    count: columnsList.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: index => columnsList[index].getSize(), // estimate the width of each column
    overscan: 5, // number of extra columns to render outside the viewport for smooth scrolling
    horizontal: true,
    enabled: isEnableColumnVirtualizer
  })
  const virtualColumns = columnVirtualizer.getVirtualItems()
  let virtualPaddingLeft: number | undefined
  let virtualPaddingRight: number | undefined

  if (virtualColumns.length > 0) {
    // Calculate left padding for the scrollable area based on the first visible column
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0

    // Calculate right padding based on the space after the last visible column
    virtualPaddingRight = columnVirtualizer.getTotalSize() - (virtualColumns[virtualColumns.length - 1]?.end ?? 0)
  }

  const { styles } = useStyles({ size, enableRowVirtualizer: isEnableRowVirtualizer, enableColumnVirtualizer: isEnableColumnVirtualizer })

  const onDragEndInternal = (event: DragEndEvent): void => {
    handleDragEnd?.(event)

    requestAnimationFrame(() => {
      if (isNull(tableElement.current)) return

      const tableRows = tableElement.current.querySelectorAll<HTMLElement>('tbody > tr')

      // Measure each row using the virtualizer so it can correctly calculate
      // positions and heights for virtualization
      tableRows.forEach(rowNode => {
        rowVirtualizer.measureElement(rowNode)
      })
    })
  }

  const renderRows = (): React.JSX.Element[] => {
    const rowsData = isEnableRowVirtualizer
      ? virtualRows.map(vRow => ({
          row: rowsList[vRow.index],
          virtualIndex: vRow.index,
          rowStyle: { position: 'absolute', top: `${vRow.start}px`, left: 0, right: 0, display: 'flex' },
          measureElement: rowVirtualizer.measureElement
        }))
      : rowsList.map(row => ({
          row,
          virtualIndex: undefined,
          rowStyle: isEnableColumnVirtualizer ? { display: 'flex', width: '100%' } : {},
          measureElement: undefined
        }))

    return rowsData.map(({ row, virtualIndex, rowStyle, measureElement }) => (
      <GridRow
        activeColumId={ highlightActiveCell && row.index === activeCell?.rowIndex ? activeCell?.columnId : undefined }
        columns={ columns }
        contextMenu={ props.contextMenu }
        enableColumnVirtualizer={ isEnableColumnVirtualizer }
        enableRowVirtualizer={ isEnableRowVirtualizer }
        isSelected={ row.getIsSelected() }
        key={ row.id }
        measureElement={ measureElement }
        modifiedCells={ JSON.stringify(getModifiedRow(`${row.id}`)) }
        onFocusCell={ onFocusCell }
        onRowDoubleClick={ props.onRowDoubleClick }
        row={ row }
        rowStyle={ rowStyle }
        size={ size }
        tableElement={ tableElement }
        virtualColumns={ virtualColumns }
        virtualIndex={ virtualIndex }
        virtualPaddingLeft={ virtualPaddingLeft }
        virtualPaddingRight={ virtualPaddingRight }
      />
    ))
  }

  return useMemo(() => (
    <ConfigProvider componentSize={ size === 'small' ? 'small' : 'middle' }>
      <div
        className={ cn(
          'ant-table-wrapper',
          hashId,
          styles.grid,
          props.className,
          { [styles.disabledGrid]: disabled },
          docked ? 'grid--docked' : ''
        ) }
        ref={ scrollElementRef }
      >
        <div className="ant-table ant-table-small">
          <div className='ant-table-container'>
            <div className='ant-table-content'>
              <table
                className={ cn({ withoutHeader: hideColumnHeaders }) }
                data-testid={ props.dataTestId }
                ref={ tableElement }
                style={ {
                  width: tableAutoWidth ? '100%' : calculateTableWidth(),
                  minWidth: table.getCenterTotalSize()
                } }
              >
                {!hideColumnHeaders && (
                <thead className='ant-table-thead'>
                  {table.getHeaderGroups().map(headerGroup => {
                    const visibleHeaders = isEnableColumnVirtualizer ? virtualColumns.map(virtualColumn => headerGroup.headers[virtualColumn.index]) : headerGroup.headers

                    return (
                      <tr
                        className={ styles.headerRow }
                        key={ headerGroup.id }
                        style={
                          isEnableColumnVirtualizer
                            ? {
                                paddingLeft: virtualPaddingLeft,
                                paddingRight: virtualPaddingRight
                              }
                            : undefined
                        }
                      >
                        {visibleHeaders.map(header => {
                          return (
                            <th
                              className='ant-table-cell'
                              key={ header.id }
                              ref={ header.column.columnDef.meta?.autoWidth === true ? autoColumnRef : null }
                              style={
                                header.column.columnDef.meta?.autoWidth === true && !header.column.getIsResizing()
                                  ? {
                                      width: 'auto',
                                      minWidth: header.column.getSize(),
                                      ...(isEnableRowVirtualizer ? { flexShrink: 1, flexGrow: 1 } : {})
                                    }
                                  : {
                                      width: header.column.getSize(),
                                      maxWidth: header.column.getSize(),
                                      ...(isEnableRowVirtualizer ? { flexShrink: 0 } : {})
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
                          )
                        })}
                      </tr>
                    )
                  })}
                </thead>
                )}
                <tbody
                  className="ant-table-tbody"
                  style={ { height: isEnableRowVirtualizer ? `${rowVirtualizer.getTotalSize()}px` : 'initial' } }
                >
                  {rowsList.length === 0 && (
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
                        onDragEnd={ onDragEndInternal }
                        sensors={ sensors }
                      >
                        <SortableContext
                          items={ visibleRowIds }
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
    </ConfigProvider>
  ), [table, modifiedCells, table.getTotalSize(), data, columns, rowSelection, internalSorting, highlightActiveCell ? activeCell : undefined, size, virtualRows, rowVirtualizer.getTotalSize(), visibleRowIds, virtualColumns])

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

  function hasRowDragColumn (): boolean {
    return columns.some(column => column.id === 'drag-handle')
  }

  function addRowDragColumn (): void {
    if (hasRowDragColumn()) {
      return
    }

    const column: ColumnDef<any> = {
      id: 'drag-handle',
      header: '',
      cell: '',
      enableResizing: false,
      size: 50
    }

    columns.unshift(column)
  }

  function removeRowDragColumn (): void {
    if (!hasRowDragColumn()) {
      return
    }

    const index = columns.findIndex(column => column.id === 'drag-handle')

    if (index !== -1) {
      columns.splice(index, 1)
    }
  }

  function updateRowDragColumn (): void {
    if (enableRowDrag === true) {
      addRowDragColumn()
    } else {
      removeRowDragColumn()
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
