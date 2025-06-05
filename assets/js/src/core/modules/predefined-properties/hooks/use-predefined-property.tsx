/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { usePropertyCreateMutation, usePropertyDeleteMutation } from "@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice-enhanced"
import { useEffect } from "react"
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { UpdatePredefinedProperty, usePropertyUpdateMutation } from "@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen"

interface UsePredefinedPropertiyReturn {
  createProperty: () => Promise<unknown>
  createLoading: boolean
  deletePropertyById: () => Promise<unknown>
  deleteLoading: boolean
  updatePropertyById: (updatePredefinedProperty: UpdatePredefinedProperty) => Promise<unknown>
  updateLoading: boolean
}

export const usePredefinedProperty = (): UsePredefinedPropertiyReturn => {
  
    const [createProperty, {
      isLoading: createLoading,
      isError: isCreateError,
      error: createError
    }] = usePropertyCreateMutation()
  
//     const createPropertyById = async (): Promise<void> => {

//       try {
// const response = await createProperty()

//       if (response.error !== undefined) {
//         trackError(new ApiError(response.error))
//         return
//       }
//         onSuccess()
//       }
    
//   }
    
      const [deleteProperty, {
        isLoading: deleteLoading,
        isSuccess: deleteSuccess,
        isError: isDeleteError,
        error: deleteError
      }] = usePropertyDeleteMutation()

    const deletePropertyById = async (): Promise<void> => {
    await deleteProperty({ id })
  }

        const [updateProperty, {
        isLoading: updateLoading,
        isSuccess: updateSuccess,
        isError: isUpdateError,
        error: updateError
      }] = usePropertyUpdateMutation()

    const updatePropertyById = async (updatePredefinedProperty: UpdatePredefinedProperty): Promise<void> => {
    await updateProperty({ id, updatePredefinedProperty})
  }

  useEffect(() => {
    if (isDeleteError) {
      trackError(new ApiError(deleteError))}
    },[isDeleteError])
    
    useEffect(() => {
    if (isUpdateError) {
      trackError(new ApiError(updateError))}
    },[isUpdateError])

    useEffect(() => {
    if (isCreateError) {
      trackError(new ApiError(createError))}
    },[isCreateError])

    return { createProperty, createLoading, deletePropertyById, deleteLoading, updatePropertyById, updateLoading }
}
