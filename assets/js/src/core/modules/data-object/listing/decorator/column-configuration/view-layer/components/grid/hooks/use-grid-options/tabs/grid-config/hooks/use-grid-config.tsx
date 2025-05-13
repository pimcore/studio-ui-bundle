/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { GridConfigContext, type IGridConfigContext } from '../grid-config-provider'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

export interface IUseGridConfigHookReturn extends IGridConfigContext {
  removeColumn: (column: AvailableColumn) => void
  addColumn: (column: AvailableColumn) => void
  resetColumns: () => void
}

export const useGridConfig = (): IUseGridConfigHookReturn => {
  const { columns, setColumns } = useContext(GridConfigContext)

  function removeColumn (column: AvailableColumn): void {
    setColumns(columns.filter((c) => c.key !== column.key))
  }

  function addColumn (column: AvailableColumn): void {
    setColumns([...columns, column])
  }

  function resetColumns (): void {
    setColumns([])
  }

  return {
    columns,
    setColumns,
    removeColumn,
    addColumn,
    resetColumns
  }
}
