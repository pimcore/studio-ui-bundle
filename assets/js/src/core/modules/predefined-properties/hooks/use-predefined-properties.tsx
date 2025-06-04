/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { PredefinedProperty, usePropertyGetCollectionQuery } from "@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced"
import { useContext, useEffect } from "react"
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { PredefinedPropertyContext, PredefinedPropertyWithId } from "../predefined-properties-provider"

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
      throw new Error('usePredefinedProperty must be used within a PredefinedPropertyProvider')
    }
      
  const { data, isLoading, isError, error } = usePropertyGetCollectionQuery({})
  
  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))}
    },[isError])

    return { predefinedProperties: data?.items, isLoading, ...context}
}
