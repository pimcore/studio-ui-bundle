/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo } from 'react'

export interface ITreeIdContext {
  treeId: string
}

export const TreeIdContext = createContext<ITreeIdContext | undefined>(undefined)

export interface TreeIdProviderProps {
  treeId: string
  children: React.ReactNode
}

export const TreeIdProvider = ({ children, treeId }: TreeIdProviderProps): React.JSX.Element => {
  const contextValue = useMemo(() => ({ treeId }), [treeId])

  return (
    <TreeIdContext.Provider value={ contextValue }>
      {children}
    </TreeIdContext.Provider>
  )
}
