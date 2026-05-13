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

export interface IRefreshContext {
  refreshLayout: () => Promise<void>
}

export const RefreshContext = createContext<IRefreshContext | undefined>(undefined)

export interface RefreshProviderProps {
  children: React.ReactNode
  refreshLayout: () => Promise<void>
}

export const RefreshProvider = (props: RefreshProviderProps): React.JSX.Element => {
  const value = useMemo<IRefreshContext>(() => ({
    refreshLayout: props.refreshLayout
  }), [props.refreshLayout])

  return (
    <RefreshContext.Provider value={ value }>
      {props.children}
    </RefreshContext.Provider>
  )
}

export const useRefresh = (): IRefreshContext => {
  const context = useContext(RefreshContext)

  if (context === undefined) {
    throw new Error('useRefresh must be used within a RefreshProvider')
  }

  return context
}
