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
import { useEffect } from "react"
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

interface UsePredefinedPropertiesReturn {
  predefinedProperties: PredefinedProperty[] | undefined
  isLoading: boolean
}

export const usePredefinedProperties = (): UsePredefinedPropertiesReturn => {
  
  const { data, isLoading, isError, error } = usePropertyGetCollectionQuery({})
  
  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))}
    },[isError])

    return { predefinedProperties: data?.items, isLoading}
}
