/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useState, type ReactNode, useMemo } from 'react'
import { type AccessorKeyColumnDef } from '@tanstack/react-table'
import { isUndefined } from 'lodash'

interface IColumnsContext {
  columns: Array<AccessorKeyColumnDef<unknown, any>>
  setColumns: (columns: Array<AccessorKeyColumnDef<unknown, any>>) => void
}

const ColumnsContext = createContext<IColumnsContext | undefined>(undefined)

interface IColumnsProviderProps {
  children: ReactNode
}

export const ColumnsProvider = ({ children }: IColumnsProviderProps): React.JSX.Element => {
  const [columns, setColumns] = useState<Array<AccessorKeyColumnDef<unknown, any>>>([])

  const contextValue = useMemo(() => ({
    columns,
    setColumns
  }), [columns, setColumns])

  return (
    <ColumnsContext.Provider value={ contextValue }>
      {children}
    </ColumnsContext.Provider>
  )
}

export const useColumnsContext = (): IColumnsContext => {
  const context = useContext(ColumnsContext)

  if (isUndefined(context)) {
    throw new Error('useColumnsContext must be used within a ColumnsProvider')
  }

  return context
}
