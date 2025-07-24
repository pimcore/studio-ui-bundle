import { isUndefined } from "lodash"
import React, { createContext, ReactNode, useContext, useMemo, useState } from "react"

export interface SelectedRowsContext<T> {
  selectedRows: T
  setSelectedRows: (rows: T) => void
  resetSelectedRows: () => void
}

export interface SelectedRowsProviderProps<T> {
  children: ReactNode
  initialValue: T
}

export function createSelectedRowsContext<T>(): {
  SelectedRowsProvider: React.FC<SelectedRowsProviderProps<T>>
  useSelectedRowsContext: () => SelectedRowsContext<T>
} {
  const SelectedRowsContext = createContext<{
    selectedRows: T
    setSelectedRows: (rows: T) => void
    resetSelectedRows: () => void
  } | undefined>(undefined)

  const SelectedRowsProvider = ({ children, initialValue }: SelectedRowsProviderProps<T>): JSX.Element => {
    const [selectedRows, setSelectedRows] = useState<T>(initialValue)

    const resetSelectedRows = (): void => {
      setSelectedRows(initialValue)
    }

    const contextValue = useMemo(() => ({
      selectedRows,
      setSelectedRows,
      resetSelectedRows
    }), [selectedRows, initialValue])

    return (
      <SelectedRowsContext.Provider value={contextValue}>
        {children}
      </SelectedRowsContext.Provider>
    )
  }

  function useSelectedRowsContext() {
    const context = useContext(SelectedRowsContext)

    if (isUndefined(context)) {
      throw new Error('useSelectedRowsContext must be used within a SelectedRowsProvider')
    }

    return context
  }

  return {
    SelectedRowsProvider,
    useSelectedRowsContext
  }
}