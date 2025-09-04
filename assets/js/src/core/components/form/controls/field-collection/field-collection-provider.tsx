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
import { type FieldCollectionProps } from './field-collection'

export interface IFieldCollectionContext extends FieldCollectionProps {}

export const FieldCollectionContext = createContext<IFieldCollectionContext | undefined>(undefined)

export interface FieldCollectionProviderProps extends IFieldCollectionContext {
  children: React.JSX.Element
}

export const FieldCollectionProvider = (props: FieldCollectionProviderProps): React.JSX.Element => {
  const { children, ...contextValue } = props

  return useMemo(() => (
    <FieldCollectionContext.Provider value={ contextValue }>
      {children}
    </FieldCollectionContext.Provider>
  ), [contextValue, children])
}

export interface UseFieldCollectionReturn extends IFieldCollectionContext {}

export const useFieldCollection = (): UseFieldCollectionReturn => {
  const context = React.useContext(FieldCollectionContext)
  if (context === null || context === undefined) {
    throw new Error('useFieldCollection must be used within a FieldCollectionProvider')
  }
  return context
}
