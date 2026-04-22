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

export interface SelectedItemsContext {
  selectedRows: RowSelectionState
  selectedRowsTypes: Record<string, string>
  setSelectedRows: (newState: RowSelectionState, pageItems: RecycleBin[]) => void
  resetSelectedRows: () => void
}

const SelectedItemsContext = createContext<SelectedItemsContext | undefined>(undefined)

interface SelectedRowsProviderProps {
  children: ReactNode
}

export const SelectedRowsProvider = ({ children }: SelectedRowsProviderProps): React.JSX.Element => {
  const [selectedRows, setSelectedRowsState] = useState<RowSelectionState>({})
  const [selectedRowsTypes, setSelectedRowsTypes] = useState<Record<string, string>>({})

  const setSelectedRows = (newState: RowSelectionState, pageItems: RecycleBin[]): void => {
    const addedIds = Object.keys(newState).filter((id) => isUndefined(selectedRows[id]))
    const removedIds = Object.keys(selectedRows).filter((id) => isUndefined(newState[id]))

    setSelectedRowsTypes((prev) => {
      const updated = { ...prev }

      for (const id of addedIds) {
        const item = pageItems.find((i) => String(i.id) === id)
        if (!isUndefined(item)) {
          updated[id] = item.type
        }
      }

      for (const id of removedIds) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete updated[id]
      }

      return updated
    })

    setSelectedRowsState(newState)
  }

  const resetSelectedRows = (): void => {
    setSelectedRowsState({})
    setSelectedRowsTypes({})
  }

  const contextValue = useMemo(() => ({
    selectedRows,
    selectedRowsTypes,
    setSelectedRows,
    resetSelectedRows
  }), [selectedRows, selectedRowsTypes])

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
