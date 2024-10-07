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
  type IListDataContext,
  type IListFilterOptionsContext,
  type IListGridConfigContext,
  type IListPageContext,
  type IListPageSizeContext,
  type IListSelectedRowsContext,
  type IListSortingContext,
  ListColumnsContext,
  ListDataContext,
  ListFilterOptionsContext,
  type IListGridAvailableColumnsContext,
  ListGridAvailableColumnsContext,
  ListGridConfigContext,
  ListPageContext,
  ListPageSizeContext,
  ListSelectedRowsContext,
  ListSortingContext
} from '../list-provider'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import type { DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { t } from 'i18next'
import {
  BatchEditContext
} from '@Pimcore/modules/asset/editor/types/folder/tab-manager/tabs/list/toolbar/tools/batch-edit-modal/batch-edit-provider'

export interface UseListColumnsHookReturn extends IListColumnsContext {
  setGridColumns: (columns: GridColumnConfiguration[]) => void
  batchEditDropDownMenu: Record<string, GridColumnConfiguration[]>
}

export const getFormattedDropDownMenu = (dropDownMenu: Record<string, GridColumnConfiguration[]>, onColumnClick: (column: GridColumnConfiguration) => void): DropdownMenuProps['items'] => {
  const formattedDropDownMenu: DropdownMenuProps['items'] = []
  let index = 0

  for (const [key, value] of Object.entries(dropDownMenu)) {
    formattedDropDownMenu.push({
      key: index++,
      label: t(`asset.listing.groups.${key}`),
      children: value.map((column) => ({
        key: column.key,
        label: t(`asset.listing.column.${column.key}`),
        onClick: () => { onColumnClick(column) }
      }))
    })
  }

  return formattedDropDownMenu
}

export const useListColumns = (): UseListColumnsHookReturn => {
  const { columns, setColumns } = useContext(ListColumnsContext)
  const { batchEdits } = useContext(BatchEditContext)

  const batchEditDropDownMenu = useMemo(() => {
    const columnsInBatchEdit = batchEdits.map((batchEdit) => batchEdit.key)
    const _dropDownMenu = {}

    if (columns.length === 0) {
      return _dropDownMenu
    }

    columns.forEach((column) => {
      if (!columnsInBatchEdit.includes(column.key)) {
        if (_dropDownMenu[column.group] === undefined) {
          _dropDownMenu[column.group] = []
        }

        _dropDownMenu[column.group].push(column)
      }
    })

    return _dropDownMenu
  }, [columns, batchEdits])

  function setGridColumns (columns: GridColumnConfiguration[]): void {
    setColumns(columns)
  }

  return {
    columns,
    setGridColumns,
    setColumns,
    batchEditDropDownMenu
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

export interface UseListGridAvailableColumnsHookReturn extends IListGridAvailableColumnsContext {
  dropDownMenu: Record<string, GridColumnConfiguration[]>
}

export const useListGridAvailableColumns = (): UseListGridAvailableColumnsHookReturn => {
  const { availableColumns, setAvailableColumns } = useContext(ListGridAvailableColumnsContext)

  const dropDownMenu = useMemo(() => {
    const _dropDownMenu = {}

    if (availableColumns === undefined) {
      return _dropDownMenu
    }

    availableColumns.forEach((column) => {
      if (_dropDownMenu[column.group] === undefined) {
        _dropDownMenu[column.group] = []
      }

      _dropDownMenu[column.group].push(column)
    })

    return _dropDownMenu
  }, [availableColumns])

  return {
    availableColumns,
    setAvailableColumns,
    dropDownMenu
  }
}

export interface UseListGridConfigHookReturn extends IListGridConfigContext {
}

export const useListGridConfig = (): UseListGridConfigHookReturn => {
  const { gridConfig, setGridConfig } = useContext(ListGridConfigContext)

  return {
    gridConfig,
    setGridConfig
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
