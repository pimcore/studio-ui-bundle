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
import { useRowSelectionOptional } from '../../../../context-layer/provider/use-row-selection-optional'

export interface UseContextMenuRowSelectionReturn {
  selection: GridContextMenuProps[] | undefined
  selectRowIfUnselected: () => void
}

export const useContextMenuRowSelection = (row: ListGridContextMenuProps['row']): UseContextMenuRowSelectionReturn => {
  const rowSelection = useRowSelectionOptional()

  if (isUndefined(rowSelection)) {
    return { selection: undefined, selectRowIfUnselected: () => {} }
  }

  const { selectedRows, setSelectedRows, selectedRowsData } = rowSelection
  const rowId = String(row.id)
  const selectedIds = Object.keys(selectedRows ?? {})

  const selection = selectedIds.map((id): GridContextMenuProps => (
    id === rowId ? row.original : { ...selectedRowsData[Number(id)], id: Number(id) }
  ))

  // Like the element tree: right clicking outside the selection makes that row the selection
  const selectRowIfUnselected = (): void => {
    if (!selectedIds.includes(rowId)) {
      setSelectedRows({ [rowId]: true })
    }
  }

  return { selection, selectRowIfUnselected }
}
