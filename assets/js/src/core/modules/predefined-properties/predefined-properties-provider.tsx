import React, { createContext, useContext, useState } from 'react'
import { PredefinedProperty } from '@sdk/api/properties'

export type GlobalProperty = PredefinedProperty & { rowId: string }

interface PredefinedPropertyContext {
  properties: GlobalProperty[]
  setProperties: (properties: GlobalProperty[]) => void
  addProperty: (property: GlobalProperty) => void
  updateProperty: (key: string, updatedProperty: GlobalProperty) => void
  removeProperty: (key: string) => void
}

const PredefinedPropertyContext = createContext<PredefinedPropertyContext | undefined>(undefined)

export const PredefinedPropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setPropertiesState] = useState<GlobalProperty[]>([])

  const setProperties = (props: GlobalProperty[]) => {
    setPropertiesState(props)
  }

  const addProperty = (property: GlobalProperty) => {
    setPropertiesState(prev => [...prev, property])
  }

  const updateProperty = (key: string, updatedProperty: GlobalProperty) => {
    setPropertiesState(prev =>
      prev.map(prop => (prop.key === key ? updatedProperty : prop))
    )
  }

  const removeProperty = (key: string) => {
    setPropertiesState(prev => prev.filter(prop => prop.key !== key))
  }

  return (
    <PredefinedPropertyContext.Provider
      value={{ properties, setProperties, addProperty, updateProperty, removeProperty }}
    >
      {children}
    </PredefinedPropertyContext.Provider>
  )
}

export const useGlobalProperties = (): PredefinedPropertyContext => {
  const context = useContext(PredefinedPropertyContext)
  if (!context) {
    throw new Error('useGlobalProperties must be used within a GlobalPropertiesProvider')
  }
  return context
}
