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
import { type GridProps } from '@Pimcore/types/components/types'

export interface IGridContext {
  table: RefObject<HTMLTableElement> | null
  size?: GridProps['size']
}

export const GridContext = createContext<IGridContext>({
  table: null,
  size: 'normal'
})

export interface GridContextProviderProps extends IGridContext {
  children: React.ReactNode
}

export const GridContextProvider = ({ table, size = 'normal', children }: GridContextProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <GridContext.Provider value={ { table, size } }>
      {children}
    </GridContext.Provider>
  ), [table, size, children])
}
