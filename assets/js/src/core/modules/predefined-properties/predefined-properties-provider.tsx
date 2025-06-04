import React, { createContext, useEffect } from 'react'
import { PredefinedProperty, usePropertyGetCollectionQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced'
import trackError, { ApiError } from '../app/error-handler'

export type PredefinedPropertyWithId = PredefinedProperty & { rowId: string }

interface IPredefinedPropertyContext {
  predefinedProperties: PredefinedProperty[] | undefined
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

  return (
    <PredefinedPropertyContext.Provider
      value={{
        predefinedProperties: data?.items,
        isLoading,
      }}
    >
      {children}
    </PredefinedPropertyContext.Provider>
  )
}

