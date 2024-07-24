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
import { type IListContext, ListContext } from '../list-provider'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice.gen'

export interface useListHookReturn {
  gridConfig: IListContext['gridConfig']
  setGridConfig: IListContext['setGridConfig']
  dropDownMenu: Record<string, GridColumnConfiguration[]>
  setGridColumns: (columns: GridColumnConfiguration[]) => void
  columns: IListContext['columns']
  page: IListContext['page']
  pageSize: IListContext['pageSize']
  setPage: IListContext['setPage']
  setPageSize: IListContext['setPageSize']
}

export const useList = (): useListHookReturn => {
  const { gridConfig, setGridConfig, setColumns, columns, page, pageSize, setPage, setPageSize } = useContext(ListContext)

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

  function setGridColumns (columns: GridColumnConfiguration[]): void {
    setColumns(columns)
  }

  return {
    gridConfig,
    setGridConfig,
    dropDownMenu,
    setGridColumns,
    columns,
    page,
    pageSize,
    setPage,
    setPageSize
  }
}
