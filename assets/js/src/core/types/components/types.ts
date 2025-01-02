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

import type { ColumnDef, RowSelectionState, SortingState, TableOptions } from '@tanstack/react-table'
import { type GridCellReference } from '@Pimcore/components/grid/grid'

type GapStringType = 'mini' | 'extra-small' | 'small' | 'normal' | 'medium' | 'large' | 'extra-large' | 'maxi'
export interface GapRowColGroupType { x: GapStringType | number, y: GapStringType | number }

export type GapType = number | GapStringType | GapRowColGroupType

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
  hideColumnHeaders?: boolean
  highlightActiveCell?: boolean
  onActiveCellChange?: (activeCell?: GridCellReference) => void
}
