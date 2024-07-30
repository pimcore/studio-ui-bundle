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

export interface useListHookReturn extends IListContext {
  dropDownMenu: Record<string, GridColumnConfiguration[]>
  setGridColumns: (columns: GridColumnConfiguration[]) => void
}

export const useList = (): useListHookReturn => {
  const { gridConfig, setColumns, ...contextProps } = useContext(ListContext)

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
    ...contextProps,
    gridConfig,
    dropDownMenu,
    setGridColumns,
    setColumns
  }
}
