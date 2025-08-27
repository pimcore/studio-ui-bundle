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
import React, { createContext } from 'react'

export interface IGridPropsContext extends GridProps {}

export const GridPropsContext = createContext<IGridPropsContext | undefined>(undefined)

export interface GridContextProviderProps extends IGridPropsContext {
  children: React.ReactNode
}

export const GridPropsProvider: React.FC<GridContextProviderProps> = ({ children, ...props }) => {
  return (
    <GridPropsContext.Provider value={ props }>
      {children}
    </GridPropsContext.Provider>
  )
}

export const useGridPropsContext = (): IGridPropsContext => {
  const context = React.useContext(GridPropsContext)
  if (context === null || context === undefined) {
    throw new Error('useGridPropsContext must be used within a GridPropsProvider')
  }
  return context
}
