/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo } from 'react'

export interface IAreaContext {
  area: string[]
}

export const AreaContext = createContext<IAreaContext | undefined>(undefined)

export interface AreaProviderProps {
  area: string[]
  children: React.ReactNode
}

export const AreaProvider = (props: AreaProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <AreaContext.Provider value={ { area: props.area } }>
      {props.children}
    </AreaContext.Provider>
  ), [props.area, props.children])
}

export const useArea = (): IAreaContext => {
  const context = useContext(AreaContext)

  if (context === undefined) {
    throw new Error('useArea must be used within an AreaProvider')
  }

  return context
}
