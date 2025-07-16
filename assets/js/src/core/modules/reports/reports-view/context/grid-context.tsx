/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useState, type ReactNode, useMemo } from 'react'
import { type AccessorKeyColumnDef } from '@tanstack/react-table'
import { isUndefined } from 'lodash'

interface IGridContext {
  columns: Array<AccessorKeyColumnDef<unknown, any>>
  setColumns: (columns: Array<AccessorKeyColumnDef<unknown, any>>) => void
  filters: Record<string, any>
  setFilters: (filters: Record<string, any>) => void
}

const GridContext = createContext<IGridContext | undefined>(undefined)

interface IGridProviderProps {
  children: ReactNode
}

export const GridProvider = ({ children }: IGridProviderProps): React.JSX.Element => {
  const [columns, setColumns] = useState<Array<AccessorKeyColumnDef<unknown, any>>>([])
  const [filters, setFilters] = useState<Record<string, any>>({})

  const contextValue = useMemo(() => ({
    columns,
    setColumns,
    filters,
    setFilters
  }), [columns, setColumns, filters, setFilters])

  return (
    <GridContext.Provider value={ contextValue }>
      {children}
    </GridContext.Provider>
  )
}

export const useGridContext = (): IGridContext => {
  const context = useContext(GridContext)

  if (isUndefined(context)) {
    throw new Error('useGridContext must be used within a GridProvider')
  }

  return context
}
