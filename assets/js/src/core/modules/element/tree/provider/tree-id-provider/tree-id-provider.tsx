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
