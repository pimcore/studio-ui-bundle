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

/* eslint-disable max-lines */

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { type AssetGetGridApiResponse, type GridColumnConfiguration, type GridDetailedConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type FilterOptions, type TagFilterOptions } from './types/filterTypes'
import { defaultFilterOptions } from './constants/filters'
import { type RowSelectionState, type SortingState } from '@tanstack/react-table'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface ICommonListProviderProps {
  children: React.ReactNode
}

export interface IListGridConfigContext {
  gridConfig: GridDetailedConfiguration | undefined
  setGridConfig: React.Dispatch<React.SetStateAction<GridDetailedConfiguration | undefined>>
}

export const ListGridConfigContext = createContext<IListGridConfigContext>({
  gridConfig: undefined,
  setGridConfig: () => {}
})

export interface ListGridConfigProviderProps extends ICommonListProviderProps {}

export const ListGridConfigProvider = ({ children }: ListGridConfigProviderProps): React.JSX.Element => {
  const [gridConfig, setGridConfig] = useState<IListGridConfigContext['gridConfig'] | undefined>(undefined)

  return useMemo(() => (
    <ListGridConfigContext.Provider value={ { gridConfig, setGridConfig } }>
      {children}
    </ListGridConfigContext.Provider>
  ), [gridConfig, children])
}

export interface IListGridAvailableColumnsContext {
  availableColumns: GridColumnConfiguration[] | undefined
  setAvailableColumns: React.Dispatch<React.SetStateAction<GridColumnConfiguration[] | undefined>>
}

export const ListGridAvailableColumnsContext = createContext<IListGridAvailableColumnsContext>({
  availableColumns: undefined,
  setAvailableColumns: () => {}
})

export interface ListGridAvailableColumnsProviderProps extends ICommonListProviderProps {}

export const ListGridAvailableColumnsProvider = ({ children }: ListGridAvailableColumnsProviderProps): React.JSX.Element => {
  const [availableColumns, setAvailableColumns] = useState<GridColumnConfiguration[] | undefined>(undefined)

  return useMemo(() => (
    <ListGridAvailableColumnsContext.Provider value={ { availableColumns, setAvailableColumns } }>
      {children}
    </ListGridAvailableColumnsContext.Provider>
  ), [availableColumns, children])
}

export interface IListColumnsContext {
  columns: GridColumnConfiguration[]
  setColumns: React.Dispatch<React.SetStateAction<GridColumnConfiguration[]>>
}

export const ListColumnsContext = createContext<IListColumnsContext>({
  columns: [],
  setColumns: () => {}
})

export interface ListColumnsProviderProps extends ICommonListProviderProps {}

export const ListColumnsProvider = ({ children }: ListColumnsProviderProps): React.JSX.Element => {
  const [columns, setColumns] = useState<GridColumnConfiguration[]>([])

  return useMemo(() => (
    <ListColumnsContext.Provider value={ { columns, setColumns } }>
      {children}
    </ListColumnsContext.Provider>
  ), [columns, children])
}

type FilterOptionsMap = Record<string, FilterOptions>

export interface IListFilterOptionsContext {
  filterOptions: FilterOptions
  setFilterOptions: (key: string, filterOptions: FilterOptions | TagFilterOptions) => void
}

const defaultFilterOptionsMap: FilterOptionsMap = {}

export const ListFilterOptionsContext = createContext<IListFilterOptionsContext>({
  filterOptions: defaultFilterOptions,
  setFilterOptions: () => {}
})

export interface ListFilterOptionsProviderProps extends ICommonListProviderProps {}

// Provider for managing and combining filter options into one context
export const ListFilterOptionsProvider = ({ children }: ListFilterOptionsProviderProps): React.JSX.Element => {
  const [filterOptionsMap, setFilterOptionsMap] = useState<FilterOptionsMap>(defaultFilterOptionsMap)

  // Update filter options by key with saving previous values
  const setFilterOptions = (key: string, newFilterOptions: FilterOptions): void => {
    setFilterOptionsMap((prev) => ({
      ...prev,
      [key]: newFilterOptions
    }))
  }

  // Combine all filter options into a single object
  const filterOptions = useMemo(() => Object.values(filterOptionsMap).reduce((acc, curr) => {
    acc.columnFilters = [...acc.columnFilters as [], ...curr.columnFilters as []]

    if (!isEmptyValue(curr.includeDescendants)) {
      acc.includeDescendants = curr.includeDescendants
    }

    return acc
  }, { columnFilters: [], includeDescendants: false }), [filterOptionsMap])

  return useMemo(() => (
    <ListFilterOptionsContext.Provider value={ { filterOptions, setFilterOptions } }>
      {children}
    </ListFilterOptionsContext.Provider>
  ), [filterOptions, children])
}

export interface IListPageContext {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const ListPageContext = createContext<IListPageContext>({
  page: 1,
  setPage: () => {}
})

export interface ListPageProviderProps extends ICommonListProviderProps {}

export const ListPageProvider = ({ children }: ListPageProviderProps): React.JSX.Element => {
  const [page, setPage] = useState(1)

  return useMemo(() => (
    <ListPageContext.Provider value={ { page, setPage } }>
      {children}
    </ListPageContext.Provider>
  ), [page, children])
}

export interface IListPageSizeContext {
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export const ListPageSizeContext = createContext<IListPageSizeContext>({
  pageSize: 20,
  setPageSize: () => {}
})

export interface ListPageSizeProviderProps extends ICommonListProviderProps {}

export const ListPageSizeProvider = ({ children }: ListPageSizeProviderProps): React.JSX.Element => {
  const [pageSize, setPageSize] = useState(20)

  return useMemo(() => (
    <ListPageSizeContext.Provider value={ { pageSize, setPageSize } }>
      {children}
    </ListPageSizeContext.Provider>
  ), [pageSize, children])
}

export interface IListSelectedRowsContext {
  selectedRows: RowSelectionState
  setSelectedRows: React.Dispatch<React.SetStateAction<RowSelectionState>>
}

export const ListSelectedRowsContext = createContext<IListSelectedRowsContext>({
  selectedRows: {},
  setSelectedRows: () => {}
})

export interface ListSelectedRowsProviderProps extends ICommonListProviderProps {}

export const ListSelectedRowsProvider = ({ children }: ListSelectedRowsProviderProps): React.JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  return useMemo(() => (
    <ListSelectedRowsContext.Provider value={ { selectedRows, setSelectedRows } }>
      {children}
    </ListSelectedRowsContext.Provider>
  ), [selectedRows, children])
}

export interface IListSortingContext {
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
}

export const ListSortingContext = createContext<IListSortingContext>({
  sorting: [],
  setSorting: () => {}
})

export interface ListSortingProviderProps extends ICommonListProviderProps {}

export const ListSortingProvider = ({ children }: ListSortingProviderProps): React.JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>([])

  return useMemo(() => (
    <ListSortingContext.Provider value={ { sorting, setSorting } }>
      {children}
    </ListSortingContext.Provider>
  ), [sorting, children])
}

export interface IListDataContext {
  data?: AssetGetGridApiResponse
  errorData?: FetchBaseQueryError
}

export const ListDataContext = createContext<IListDataContext>({
  data: undefined,
  errorData: undefined
})

export interface ListDataProviderProps extends ICommonListProviderProps {
  data: IListDataContext['data']
  errorData: IListDataContext['errorData']
}

export const ListDataProvider = ({ children, data, errorData }: ListDataProviderProps): React.JSX.Element => {
  const [internalData, setData] = useState<IListDataContext['data']>(undefined)
  const [internalErrorData, setInternalErrorData] = useState<IListDataContext['errorData']>(undefined)

  useEffect(() => {
    setData(data)
  }, [data])

  useEffect(() => {
    setInternalErrorData(errorData)
  }, [errorData])

  return useMemo(() => (
    <ListDataContext.Provider value={ { data: internalData, errorData: internalErrorData } }>
      {children}
    </ListDataContext.Provider>
  ), [internalData, children])
}

export interface ListProviderProps extends ICommonListProviderProps {}

export const ListProvider = ({ children }: ListProviderProps): React.JSX.Element => {
  return (
    <ListGridConfigProvider>
      <ListColumnsProvider>
        <ListFilterOptionsProvider>
          <ListPageProvider>
            <ListPageSizeProvider>
              <ListSelectedRowsProvider>
                <ListSortingProvider>
                  <ListGridAvailableColumnsProvider>
                    {children}
                  </ListGridAvailableColumnsProvider>
                </ListSortingProvider>
              </ListSelectedRowsProvider>
            </ListPageSizeProvider>
          </ListPageProvider>
        </ListFilterOptionsProvider>
      </ListColumnsProvider>
    </ListGridConfigProvider>
  )
}
