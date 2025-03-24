/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import {
  useLazyElementResolveBySearchTermQuery
} from '@Pimcore/modules/element/element-api-slice-enhanced'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type ElementGetIdByPathApiResponse } from '@Pimcore/modules/element/element-api-slice.gen'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type IApiErrorDetails } from '@Pimcore/modules/app/error-handler/classes/api-error'

interface OpenAssetHelperReturn {
  openElementByPathOrId: (value: string | number | undefined, elementType: ElementType) => Promise<void>
  isLoading: boolean
}

export const openElementHelper = (): OpenAssetHelperReturn => {
  const { openElement } = useElementHelper()

  const [fetchElementId, { isLoading }] = useLazyElementResolveBySearchTermQuery()
  const handleFetchAndOpen = async (searchTerm: string, elementType: ElementType): Promise<void> => {
    try {
      const result: ElementGetIdByPathApiResponse = await fetchElementId({
        elementType,
        searchTerm
      }).unwrap()
      await openElement({ id: result.id, type: elementType })
    } catch (unknownError) {
      const error = unknownError as IApiErrorDetails
      trackError(new ApiError(error))
    }
  }

  const openElementByPathOrId = async (value: string | number, elementType: ElementType): Promise<void> => {
    if (!isNaN(Number(value))) {
      await handleFetchAndOpen(value.toString(), elementType)
    } else if (typeof value === 'string') {
      await handleFetchAndOpen(value, elementType)
    }
  }

  return { openElementByPathOrId, isLoading }
}
