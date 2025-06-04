import { useContext } from 'react'
import { PredefinedPropertyContext, PredefinedPropertyWithId } from '../predefined-properties-provider'

interface UsePredefinedPropertyReturn {
  properties: PredefinedPropertyWithId[]
  setProperties: (properties: PredefinedPropertyWithId[]) => void
  addProperty: (property: PredefinedPropertyWithId) => void
  updateProperty: (key: string, updatedProperty: PredefinedPropertyWithId) => void
  removeProperty: (key: string) => void
}

export const usePredefinedProperty = (): UsePredefinedPropertyReturn => {
  const context = useContext(PredefinedPropertyContext)
  if (context === undefined) {
    throw new Error('usePredefinedProperty must be used within a PredefinedPropertyProvider')
  }

  return context
}
