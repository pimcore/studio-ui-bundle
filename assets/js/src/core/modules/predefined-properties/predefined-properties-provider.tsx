import React, { createContext, useContext, useState } from 'react'
import { PredefinedProperty } from '@sdk/api/properties'

export type PredefinedPropertyWithId = PredefinedProperty & { rowId: string }

interface IPredefinedPropertyContext {
  properties: PredefinedPropertyWithId[]
  setProperties: (properties: PredefinedPropertyWithId[]) => void
  addProperty: (property: PredefinedPropertyWithId) => void
  updateProperty: (key: string, updatedProperty: PredefinedPropertyWithId) => void
  removeProperty: (key: string) => void
}

export const PredefinedPropertyContext = createContext<IPredefinedPropertyContext | undefined>(undefined)

export const PredefinedPropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setPropertiesState] = useState<PredefinedPropertyWithId[]>([])

  const setProperties = (props: PredefinedPropertyWithId[]) => {
    setPropertiesState(props)
  }

  const addProperty = (property: PredefinedPropertyWithId) => {
    setPropertiesState(prev => [...prev, property])
  }

  const updateProperty = (key: string, updatedProperty: PredefinedPropertyWithId) => {
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

