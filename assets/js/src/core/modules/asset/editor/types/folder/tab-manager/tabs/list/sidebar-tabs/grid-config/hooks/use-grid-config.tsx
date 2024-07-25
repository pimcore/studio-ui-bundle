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

import { useContext } from 'react'
import { GridConfigContext, type IGridConfigContext } from '../grid-config-provider'
import { type GridColumnConfiguration } from 'src/sdk/main'

interface useGridConfigHookReturn extends IGridConfigContext {
  removeColumn: (column: GridColumnConfiguration) => void
  addColumn: (column: GridColumnConfiguration) => void
}

export const useGridConfig = (): useGridConfigHookReturn => {
  const { columns, setColumns } = useContext(GridConfigContext)

  function removeColumn (column: GridColumnConfiguration): void {
    setColumns(columns.filter((c) => c.key !== column.key))
  }

  function addColumn (column: GridColumnConfiguration): void {
    setColumns([...columns, column])
  }

  return {
    columns,
    setColumns,
    removeColumn,
    addColumn
  }
}
