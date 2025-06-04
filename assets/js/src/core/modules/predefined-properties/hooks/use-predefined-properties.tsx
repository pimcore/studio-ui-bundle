/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { PredefinedProperty } from "@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced"
import { useContext, useState, useEffect } from "react"
import { PredefinedPropertyContext, PredefinedPropertyWithId } from "../predefined-properties-provider"
import { uuid } from '@Pimcore/utils/uuid'

interface UsePredefinedPropertiesReturn {
  predefinedProperties: PredefinedProperty[] | undefined
  isLoading: boolean
  properties: PredefinedPropertyWithId[]
  setProperties: (properties: PredefinedPropertyWithId[]) => void
  addProperty: (property: PredefinedPropertyWithId) => void
  updateProperty: (key: string, updatedProperty: PredefinedPropertyWithId) => void
  removeProperty: (key: string) => void
}

export const usePredefinedProperties = (): UsePredefinedPropertiesReturn => {
  const context = useContext(PredefinedPropertyContext)
  if (context === undefined) {
    throw new Error('usePredefinedProperties must be used within a PredefinedPropertyProvider')
  }

  const { predefinedProperties, isLoading } = context
  const [properties, setPropertiesState] = useState<PredefinedPropertyWithId[]>([])

  useEffect(() => {
    if (predefinedProperties && Array.isArray(predefinedProperties)) {
      const enriched = predefinedProperties.map(item => ({
        ...item,
        rowId: uuid()
      }))
      setPropertiesState(enriched)
    }
  }, [predefinedProperties])

  const setProperties = (props: PredefinedPropertyWithId[]) => setPropertiesState(props)
  const addProperty = (property: PredefinedPropertyWithId) => setPropertiesState(prev => [...prev, property])
  const updateProperty = (key: string, updatedProperty: PredefinedPropertyWithId) =>
    setPropertiesState(prev => prev.map(prop => (prop.key === key ? updatedProperty : prop)))
  const removeProperty = (key: string) => setPropertiesState(prev => prev.filter(prop => prop.key !== key))

  return {
    predefinedProperties,
    isLoading,
    properties,
    setProperties,
    addProperty,
    updateProperty,
    removeProperty,
  }
}
