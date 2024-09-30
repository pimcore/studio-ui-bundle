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

import { useContext, useMemo } from 'react'
import {
  type IListColumnsContext,
  type IListFilterOptionsContext,
  type IListGridConfigContext,
  type IListPageContext,
  type IListPageSizeContext,
  type IListSelectedRowsContext,
  type IListSortingContext,
  type IListDataContext,
  ListColumnsContext,
  ListPageContext,
  ListSelectedRowsContext,
  ListGridConfigContext,
  ListPageSizeContext,
  ListFilterOptionsContext,
  ListSortingContext,
  ListDataContext
} from '../list-provider'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'

export interface UseListColumnsHookReturn extends IListColumnsContext {
  setGridColumns: (columns: GridColumnConfiguration[]) => void
  dropDownMenu: Record<string, GridColumnConfiguration[]>
}

export const useListColumns = (): UseListColumnsHookReturn => {
  const { columns, setColumns } = useContext(ListColumnsContext)

  const dropDownMenu = useMemo(() => {
    const _dropDownMenu = {}

    if (columns.length === 0) {
      return _dropDownMenu
    }

    columns.forEach((column) => {
      if (_dropDownMenu[column.group] === undefined) {
        _dropDownMenu[column.group] = []
      }

      _dropDownMenu[column.group].push(column)
    })

    return _dropDownMenu
  }, [columns])

  function setGridColumns (columns: GridColumnConfiguration[]): void {
    setColumns(columns)
  }

  return {
    columns,
    setGridColumns,
    setColumns,
    dropDownMenu
  }
}

export interface UseListFilterOptionsHookReturn extends IListFilterOptionsContext {
}

export const useListFilterOptions = (): UseListFilterOptionsHookReturn => {
  const { filterOptions, setFilterOptions } = useContext(ListFilterOptionsContext)

  return {
    filterOptions,
    setFilterOptions
  }
}

export interface UseListGridConfigHookReturn extends IListGridConfigContext {
  dropDownMenu: Record<string, GridColumnConfiguration[]>
}

export const useListGridConfig = (): UseListGridConfigHookReturn => {
  const { gridConfig, setGridConfig } = useContext(ListGridConfigContext)

  const dropDownMenu = useMemo(() => {
    const _dropDownMenu = {}

    if (gridConfig === undefined) {
      return _dropDownMenu
    }

    gridConfig.forEach((column) => {
      if (_dropDownMenu[column.group] === undefined) {
        _dropDownMenu[column.group] = []
      }

      _dropDownMenu[column.group].push(column)
    })

    return _dropDownMenu
  }, [gridConfig])

  return {
    gridConfig,
    setGridConfig,
    dropDownMenu
  }
}

export interface UseListPageHookReturn extends IListPageContext {
}

export const useListPage = (): UseListPageHookReturn => {
  const { page, setPage } = useContext(ListPageContext)

  return {
    page,
    setPage
  }
}

export interface UseListPageSizeHookReturn extends IListPageSizeContext {
}

export const useListPageSize = (): UseListPageSizeHookReturn => {
  const { pageSize, setPageSize } = useContext(ListPageSizeContext)

  return {
    pageSize,
    setPageSize
  }
}

export interface UseListSelectedRowsHookReturn extends IListSelectedRowsContext {
}

export const useListSelectedRows = (): UseListSelectedRowsHookReturn => {
  const { selectedRows, setSelectedRows } = useContext(ListSelectedRowsContext)

  return {
    selectedRows,
    setSelectedRows
  }
}

export interface UseListSortingHookReturn extends IListSortingContext {
}

export const useListSorting = (): UseListSortingHookReturn => {
  const { sorting, setSorting } = useContext(ListSortingContext)

  return {
    sorting,
    setSorting
  }
}

export interface UseListDataHookReturn extends IListDataContext {
}

export const useListData = (): UseListDataHookReturn => {
  const { data } = useContext(ListDataContext)

  return {
    data
  }
}
