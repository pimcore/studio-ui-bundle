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

export interface SelectedItemsContext {
  selectedRows: RowSelectionState
  setSelectedRows: (newState: RowSelectionState) => void
  resetSelectedRows: () => void
}

const SelectedItemsContext = createContext<SelectedItemsContext | undefined>(undefined)

interface SelectedRowsProviderProps {
  children: ReactNode
}

export const SelectedRowsProvider = ({ children }: SelectedRowsProviderProps): React.JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  const resetSelectedRows = (): void => {
    setSelectedRows({})
  }

  const contextValue = useMemo(() => ({
    selectedRows,
    setSelectedRows,
    resetSelectedRows
  }), [selectedRows])

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
