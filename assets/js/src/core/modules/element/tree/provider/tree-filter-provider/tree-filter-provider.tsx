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

export interface ITreeFilterContext {
  classIds?: string[]
  pqlQuery?: string
  pageSize: number
}

export const TreeFilterContext = createContext<ITreeFilterContext>({ pageSize: 30 })

export interface TreeFilterProviderProps {
  classIds?: string[]
  pqlQuery?: string
  pageSize: number
  children: React.ReactNode
}

export const TreeFilterProvider = ({ children, classIds, pqlQuery, pageSize }: TreeFilterProviderProps): React.JSX.Element => {
  const contextValue = useMemo(() => ({
    classIds,
    pqlQuery,
    pageSize
  }), [classIds, pqlQuery, pageSize])

  return (
    <TreeFilterContext.Provider value={ contextValue }>
      {children}
    </TreeFilterContext.Provider>
  )
}
