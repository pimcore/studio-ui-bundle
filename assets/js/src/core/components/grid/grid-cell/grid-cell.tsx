/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Cell, type CellContext, flexRender } from '@tanstack/react-table'
import React from 'react'
import { type GridCellReference, type ExtendedCellContext } from '../grid'
import { type GridContextProviderProps, GridContextProvider } from '../grid-context'
import {
  DynamicTypeRegistryProvider
} from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'
import { createTableCellTestId } from '@Pimcore/utils/test-id-generator'

export interface GridCellProps {
  cell: Cell<any, unknown>
  isActive?: boolean
  isModified?: boolean
  onFocusCell?: (cell: GridCellReference) => void
  tableElement: GridContextProviderProps['table']
  rowIndex?: number
}

export const GridCell = ({ cell, isModified, isActive, onFocusCell, tableElement, rowIndex }: GridCellProps): React.JSX.Element => {
  return (
    <DynamicTypeRegistryProvider serviceIds={ ['DynamicTypes/GridCellRegistry'] }>
      <GridContextProvider table={ tableElement }>
        <div
          className='grid__cell-content'
          data-testid={ rowIndex !== undefined ? createTableCellTestId(rowIndex, cell.column.id) : undefined }
        >
          {flexRender(cell.column.columnDef.cell, getExtendedCellContext(cell.getContext()))}
        </div>
      </GridContextProvider>
    </DynamicTypeRegistryProvider>
  )

  function getExtendedCellContext (context: CellContext<any, any>): ExtendedCellContext {
    return {
      ...context,
      active: isActive,
      modified: isModified,
      onFocus: onFocusCell
    }
  }
}
