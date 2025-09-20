/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GridProps } from '@Pimcore/types/components/types'
import React, { createContext, useState } from 'react'

export interface IDataContext {
  data: GridProps['data']
  setData: (data: GridProps['data']) => void
}

export const DataContext = createContext<IDataContext | undefined>(undefined)

export interface DataProviderProps {
  data: GridProps['data']
  children: React.ReactNode
}

export const DataProvider: React.FC<DataProviderProps> = ({ data, children }) => {
  const [state, setState] = useState(data)

  const value = React.useMemo(() => ({
    data: state,
    setData: setState
  }), [state])

  return <DataContext.Provider value={ value }>{children}</DataContext.Provider>
}

export const useData = (): IDataContext => {
  const context = React.useContext(DataContext)
  if (context === null || context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
