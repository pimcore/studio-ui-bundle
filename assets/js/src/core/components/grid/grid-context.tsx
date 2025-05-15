/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type RefObject, createContext, useMemo } from 'react'

export interface IGridContext {
  table: RefObject<HTMLTableElement> | null
}

export const GridContext = createContext<IGridContext>({
  table: null
})

export interface GridContextProviderProps extends IGridContext {
  children: React.ReactNode
}

export const GridContextProvider = ({ table, children }: GridContextProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <GridContext.Provider value={ { table } }>
      {children}
    </GridContext.Provider>
  ), [table, children])
}
