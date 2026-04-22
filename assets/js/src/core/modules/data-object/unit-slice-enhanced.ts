/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { providingTags, tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as baseApi } from './unit-slice.gen'

const api = baseApi.enhanceEndpoints({
  addTagTypes: [tagNames.QUANTITY_VALUE_UNITS],
  endpoints: {

    unitQuantityValueUnitsCollection: {
      providesTags: (result, error, args) => providingTags.QUANTITY_VALUE_UNITS()
    },

    unitQuantityValueUnitsUpdate: {
      invalidatesTags: () => [tagNames.QUANTITY_VALUE_UNITS]
    },

    unitQuantityValueUnitsDelete: {
      invalidatesTags: () => [tagNames.QUANTITY_VALUE_UNITS]
    },

    unitQuantityValueUnitsCreate: {
      invalidatesTags: () => [tagNames.QUANTITY_VALUE_UNITS]
    },

    unitQuantityValueList: {
      providesTags: () => providingTags.QUANTITY_VALUE_UNITS()
    },

    unitQuantityValueUnitsExport: {
      query: () => ({
        url: '/pimcore-studio/api/unit/quantity-value/units/export',
        responseHandler: async (response: Response): Promise<Blob> => await response.blob()
      })
    }
  }
})

export type * from './unit-slice.gen'

export const {
  useUnitQuantityValueUnitsCollectionQuery,
  useUnitQuantityValueConvertAllQuery,
  useUnitQuantityValueConvertQuery,
  useUnitQuantityValueUnitsCreateMutation,
  useUnitQuantityValueUnitsUpdateMutation,
  useUnitQuantityValueUnitsDeleteMutation,
  useUnitQuantityValueUnitsExportQuery,
  useLazyUnitQuantityValueUnitsExportQuery,
  useUnitQuantityValueUnitsImportMutation,
  useUnitQuantityValueListQuery
} = api

export { api }
