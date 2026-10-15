/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import React, { createContext, type ReactNode, useContext, useMemo, useState } from 'react'
import { type RowSelectionState } from '@tanstack/react-table'
import { type RecycleBin } from '../recycle-bin-api-slice.gen'

export type RecycleBinAction = 'restore' | 'delete'

export interface SelectedItemsContext {
  selectedRows: RowSelectionState
  selectedRowsTypes: Record<string, string>
  setSelectedRows: (newState: RowSelectionState, pageItems: RecycleBin[]) => void
  resetSelectedRows: () => void
  loadingIds: Record<RecycleBinAction, number[]>
  setLoadingIds: (action: RecycleBinAction, ids: number[], isLoading: boolean) => void
}

const SelectedItemsContext = createContext<SelectedItemsContext | undefined>(undefined)

interface SelectedRowsProviderProps {
  children: ReactNode
}

export const SelectedRowsProvider = ({ children }: SelectedRowsProviderProps): React.JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
  const [selectedRowsTypes, setSelectedRowsTypes] = useState<Record<string, string>>({})
  const [loadingIds, setLoadingIds] = useState<Record<RecycleBinAction, number[]>>({ restore: [], delete: [] })

  const updateSelectedRows = (newState: RowSelectionState, pageItems: RecycleBin[]): void => {
    const addedIds = Object.keys(newState).filter((id) => isUndefined(selectedRows[id]))
    const removedIds = Object.keys(selectedRows).filter((id) => isUndefined(newState[id]))

    const removedIdsSet = new Set(removedIds)

    setSelectedRowsTypes((prev) => {
      const withAdded = { ...prev }

      for (const id of addedIds) {
        const item = pageItems.find((i) => String(i.id) === id)
        if (!isUndefined(item)) {
          withAdded[id] = item.type
        }
      }

      return Object.fromEntries(
        Object.entries(withAdded).filter(([id]) => !removedIdsSet.has(id))
      )
    })

    setSelectedRows(newState)
  }

  const resetSelectedRows = (): void => {
    setSelectedRows({})
    setSelectedRowsTypes({})
  }

  const updateLoadingIds = (action: RecycleBinAction, ids: number[], isLoading: boolean): void => {
    setLoadingIds((prev) => ({
      ...prev,
      [action]: isLoading
        ? [...prev[action], ...ids]
        : prev[action].filter((id) => !ids.includes(id))
    }))
  }

  const contextValue = useMemo(() => ({
    selectedRows,
    selectedRowsTypes,
    setSelectedRows: updateSelectedRows,
    resetSelectedRows,
    loadingIds,
    setLoadingIds: updateLoadingIds
  }), [selectedRows, selectedRowsTypes, loadingIds])

  return (
    <SelectedItemsContext.Provider value={ contextValue }>
      {children}
    </SelectedItemsContext.Provider>
  )
}

export const useSelectedRowsContext = (): SelectedItemsContext => {
  const context = useContext(SelectedItemsContext)

  if (isUndefined(context)) {
    throw new Error('useSelectedRowsContext must be used within a SelectedRowsProvider')
  }

  return context
}
