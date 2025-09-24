/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext } from 'react'
import { type GridProps } from '@Pimcore/types/components/types'
import { type ColumnDef } from '@tanstack/react-table'

export interface IOperationalGridContext {
  value: GridProps['data']
  onChange?: (value: GridProps['data']) => void
  columns: Array<ColumnDef<any>>
  onColumnsChange?: (columns: Array<ColumnDef<any>>) => void
  finalGridProps: GridProps
}

export const OperationalGridContext = createContext<IOperationalGridContext | undefined>(undefined)

export interface OperationalGridProviderProps extends IOperationalGridContext {
  children: React.ReactNode
}

export const OperationalGridProvider = (props: OperationalGridProviderProps): React.JSX.Element => {
  const { children, ...contextValue } = props

  return (
    <OperationalGridContext.Provider value={ contextValue }>
      {children}
    </OperationalGridContext.Provider>
  )
}

export const useOperationalGridContext = (): IOperationalGridContext => {
  const context = React.useContext(OperationalGridContext)
  if (context === null || context === undefined) {
    throw new Error('useOperationalGridContext must be used within an OperationalGridProvider')
  }
  return context
}
