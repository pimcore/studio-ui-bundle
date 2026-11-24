/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { type ListGridContextMenuProps } from '@Pimcore/types/components/types'
import { isUndefined } from 'lodash'
import { type RowSelectionContextProps } from '../../../../context-layer/provider/row-selection-provider'
import { useRowSelectionOptional } from '../../../../context-layer/provider/use-row-selection-optional'

export interface UseContextMenuRowSelectionReturn {
  selectRowIfUnselected: () => void
}

/** The selected rows of a listing, empty when the grid has no row selection */
export const getSelectedGridRows = (
  rowSelection: RowSelectionContextProps,
  clickedRow: GridContextMenuProps
): GridContextMenuProps[] => {
  if (isUndefined(rowSelection)) {
    return []
  }

  const { selectedRows, selectedRowsData } = rowSelection
  const clickedId = String(clickedRow.id)

  return Object.keys(selectedRows ?? {}).map((id): GridContextMenuProps => (
    id === clickedId ? clickedRow : { ...selectedRowsData[Number(id)], id: Number(id) }
  ))
}

export const useContextMenuRowSelection = (row: ListGridContextMenuProps['row']): UseContextMenuRowSelectionReturn => {
  const rowSelection = useRowSelectionOptional()

  // Like the element tree: right clicking outside the selection makes that row the selection
  const selectRowIfUnselected = (): void => {
    if (isUndefined(rowSelection)) {
      return
    }

    const rowId = String(row.id)
    if (!Object.keys(rowSelection.selectedRows ?? {}).includes(rowId)) {
      rowSelection.setSelectedRows({ [rowId]: true })
    }
  }

  return { selectRowIfUnselected }
}
