/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useEffect, useMemo } from 'react'
import { type PredefinedProperty, usePropertyGetCollectionQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import trackError, { ApiError } from '../app/error-handler'

export type PredefinedPropertyWithId = PredefinedProperty & { rowId: string }

interface IPredefinedPropertyContext {
  predefinedProperties: PredefinedProperty[]
  isLoading: boolean
}

export const PredefinedPropertyContext = createContext<IPredefinedPropertyContext | undefined>(undefined)

export const PredefinedPropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, isError, error } = usePropertyGetCollectionQuery({})
  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  const contextValue = useMemo(() => ({
    predefinedProperties: data?.items ?? [],
    isLoading
  }), [data?.items, isLoading])

  return (
    <PredefinedPropertyContext.Provider value={ contextValue }>
      {children}
    </PredefinedPropertyContext.Provider>
  )
}
