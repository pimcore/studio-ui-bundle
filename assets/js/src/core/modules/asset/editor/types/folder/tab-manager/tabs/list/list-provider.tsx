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

import React, { createContext, useMemo, useState } from 'react'

import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { defaultFilterOptions, type FilterOptions } from './sidebar/filters/filter-provider'
import { type SortingState, type RowSelectionState } from '@tanstack/react-table'

export interface IListGridConfigContext {
  gridConfig: GridColumnConfiguration[] | undefined
  setGridConfig: React.Dispatch<React.SetStateAction<GridColumnConfiguration[] | undefined>>
}

export const ListGridConfigContext = createContext<IListGridConfigContext>({
  gridConfig: undefined,
  setGridConfig: () => {}
})

export interface ListGridConfigProviderProps {
  children: React.ReactNode
}

export const ListGridConfigProvider = ({ children }: ListGridConfigProviderProps): React.JSX.Element => {
  const [gridConfig, setGridConfig] = useState<GridColumnConfiguration[] | undefined>(undefined)

  return useMemo(() => (
    <ListGridConfigContext.Provider value={ { gridConfig, setGridConfig } }>
      {children}
    </ListGridConfigContext.Provider>
  ), [gridConfig, children])
}

export interface IListColumnsContext {
  columns: GridColumnConfiguration[]
  setColumns: React.Dispatch<React.SetStateAction<GridColumnConfiguration[]>>
}

export const ListColumnsContext = createContext<IListColumnsContext>({
  columns: [],
  setColumns: () => {}
})

export interface ListColumnsProviderProps {
  children: React.ReactNode
}

export const ListColumnsProvider = ({ children }: ListColumnsProviderProps): React.JSX.Element => {
  const [columns, setColumns] = useState<GridColumnConfiguration[]>([])

  return useMemo(() => (
    <ListColumnsContext.Provider value={ { columns, setColumns } }>
      {children}
    </ListColumnsContext.Provider>
  ), [columns, children])
}

export interface IListFilterOptionsContext {
  filterOptions: FilterOptions
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>
}

export const ListFilterOptionsContext = createContext<IListFilterOptionsContext>({
  filterOptions: defaultFilterOptions,
  setFilterOptions: () => {}
})

export interface ListFilterOptionsProviderProps {
  children: React.ReactNode
}

export const ListFilterOptionsProvider = ({ children }: ListFilterOptionsProviderProps): React.JSX.Element => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions)

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

export interface ListPageProviderProps {
  children: React.ReactNode
}

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

export interface ListPageSizeProviderProps {
  children: React.ReactNode
}

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

export interface ListSelectedRowsProviderProps {
  children: React.ReactNode
}

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

export interface ListSortingProviderProps {
  children: React.ReactNode
}

export const ListSortingProvider = ({ children }: ListSortingProviderProps): React.JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>([])

  return useMemo(() => (
    <ListSortingContext.Provider value={ { sorting, setSorting } }>
      {children}
    </ListSortingContext.Provider>
  ), [sorting, children])
}

export interface ListProviderProps {
  children: React.ReactNode
}

export const ListProvider = ({ children }: ListProviderProps): React.JSX.Element => {
  return (
    <ListGridConfigProvider>
      <ListColumnsProvider>
        <ListFilterOptionsProvider>
          <ListPageProvider>
            <ListPageSizeProvider>
              <ListSelectedRowsProvider>
                <ListSortingProvider>
                  {children}
                </ListSortingProvider>
              </ListSelectedRowsProvider>
            </ListPageSizeProvider>
          </ListPageProvider>
        </ListFilterOptionsProvider>
      </ListColumnsProvider>
    </ListGridConfigProvider>
  )
}
