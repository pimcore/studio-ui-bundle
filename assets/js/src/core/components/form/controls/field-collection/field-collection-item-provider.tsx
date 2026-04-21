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
import { isNil } from 'lodash'

export interface IFieldCollectionItemContext {
  field: number
  value: unknown
}

export const FieldCollectionItemContext = createContext<IFieldCollectionItemContext | undefined>(undefined)

export interface FieldCollectionItemProviderProps extends IFieldCollectionItemContext {
  children: React.ReactNode
}

export const FieldCollectionItemProvider = (props: FieldCollectionItemProviderProps): React.JSX.Element => {
  const { children, field, value } = props

  const contextValue = useMemo<IFieldCollectionItemContext>(() => ({
    field,
    value
  }), [field, value])

  return (
    <FieldCollectionItemContext.Provider value={ contextValue }>
      {children}
    </FieldCollectionItemContext.Provider>
  )
}

export interface IUseFieldCollectionItemReturn extends IFieldCollectionItemContext {}

export const useFieldCollectionItem = (): IUseFieldCollectionItemReturn => {
  const context = React.useContext(FieldCollectionItemContext)

  if (isNil(context)) {
    throw new Error('useFieldCollectionItem must be used within a FieldCollectionItemProvider')
  }

  return context
}
