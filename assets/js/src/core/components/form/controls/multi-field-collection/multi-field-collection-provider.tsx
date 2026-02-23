/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext } from 'react'
import type { MultiFieldCollectionProps } from './multi-field-collection'

interface MultiFieldCollectionContextType {
  registry: MultiFieldCollectionProps['registry']
  title?: string
  collapsed: boolean
  maxItems?: number
  disallowReorder: boolean
  disallowAddRemove: boolean
}

const MultiFieldCollectionContext = createContext<MultiFieldCollectionContextType | undefined>(undefined)

export interface MultiFieldCollectionProviderProps extends MultiFieldCollectionContextType {
  children: React.ReactNode
}

export const MultiFieldCollectionProvider = ({ 
  children, 
  ...contextValue 
}: MultiFieldCollectionProviderProps): React.JSX.Element => {
  return (
    <MultiFieldCollectionContext.Provider value={contextValue}>
      {children}
    </MultiFieldCollectionContext.Provider>
  )
}

export const useMultiFieldCollection = (): MultiFieldCollectionContextType => {
  const context = useContext(MultiFieldCollectionContext)
  
  if (context === undefined) {
    throw new Error('useMultiFieldCollection must be used within a MultiFieldCollectionProvider')
  }
  
  return context
}