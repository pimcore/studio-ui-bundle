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

export interface IFilterValue {
  columnFilters?: Array<{ property: string, value: any, type: string, operator: string }>
  drillDownFilters?: Record<string, any>
}

interface IGridContext {
  columns: Array<AccessorKeyColumnDef<unknown, any>>
  setColumns: (columns: Array<AccessorKeyColumnDef<unknown, any>>) => void
  initialColumns: Array<AccessorKeyColumnDef<unknown, any>>
  setInitialColumns: (columns: Array<AccessorKeyColumnDef<unknown, any>>) => void
  resetColumnsToInitial: () => void
  addColumn: (column: AccessorKeyColumnDef<unknown, any>) => void
  filters: IFilterValue
  setFilters: (filters: IFilterValue) => void
  resetFilters: () => void
}

const GridContext = createContext<IGridContext | undefined>(undefined)

interface IGridProviderProps {
  children: ReactNode
}

const INITIAL_FILTER_VALUE: IFilterValue = {
  columnFilters: undefined,
  drillDownFilters: undefined
}

export const GridProvider = ({ children }: IGridProviderProps): React.JSX.Element => {
  const [columns, setColumns] = useState<Array<AccessorKeyColumnDef<unknown, any>>>([])
  const [initialColumns, setInitialColumns] = useState<Array<AccessorKeyColumnDef<unknown, any>>>([])

  const [filters, setFilters] = useState<IFilterValue>(INITIAL_FILTER_VALUE)

  const resetFilters = (): void => {
    setFilters(INITIAL_FILTER_VALUE)
  }

  const resetColumnsToInitial = (): void => {
    setColumns(initialColumns)
  }

  const addColumn = (column: AccessorKeyColumnDef<unknown, any>): void => {
    setColumns([...columns, column])
  }

  const contextValue = useMemo(() => ({
    columns,
    setColumns,
    initialColumns,
    setInitialColumns,
    resetColumnsToInitial,
    addColumn,
    filters,
    setFilters,
    resetFilters
  }), [columns, setColumns, initialColumns, setInitialColumns, filters, setFilters])

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
