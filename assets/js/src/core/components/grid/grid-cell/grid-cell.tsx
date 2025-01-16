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

import { type Cell, type CellContext, flexRender } from '@tanstack/react-table'
import React from 'react'
import { type GridCellReference, type ExtendedCellContext } from '../grid'
import { type GridContextProviderProps, GridContextProvider } from '../grid-context'
import {
  DynamicTypeRegistryProvider
} from '@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider'

export interface GridCellProps {
  cell: Cell<any, unknown>
  isActive?: boolean
  isModified?: boolean
  onFocusCell?: (cell: GridCellReference) => void
  tableElement: GridContextProviderProps['table']
}

export const GridCell = ({ cell, isModified, isActive, onFocusCell, tableElement }: GridCellProps): React.JSX.Element => {
  return (
    <DynamicTypeRegistryProvider serviceIds={ ['DynamicTypes/GridCellRegistry'] }>
      <GridContextProvider table={ tableElement }>
        <div className='grid__cell-content'>
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
