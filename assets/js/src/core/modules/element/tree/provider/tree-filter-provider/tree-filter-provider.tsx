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
