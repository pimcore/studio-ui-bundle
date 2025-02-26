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

import { useLazyElementGetIdByPathQuery } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type ElementGetIdByPathApiResponse } from '@Pimcore/modules/element/element-api-slice.gen'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

interface OpenAssetHelperReturn {
  openElementByPathOrId: (value: string | number | undefined, elementType: ElementType) => Promise<void>
  isLoading: boolean
}

export const openElementHelper = (): OpenAssetHelperReturn => {
  const { openElement } = useElementHelper()

  const [fetchElementId, { isLoading }] = useLazyElementGetIdByPathQuery()

  const handleFetchAndOpen = async (path: string, elementType: ElementType): Promise<void> => {
    try {
      const result: ElementGetIdByPathApiResponse = await fetchElementId({ elementType, elementPath: path }).unwrap()
      await openElement({ id: result.id, type: elementType })
    } catch (error) {
      console.error('Failed to fetch element:', error)
    }
  }

  const openElementByPathOrId = async (value: string | number | undefined, elementType: ElementType): Promise<void> => {
    try {
      if (!isNaN(Number(value))) {
        await openElement({
          id: Number(value),
          type: elementType
        })
      } else if (typeof value === 'string') {
        await handleFetchAndOpen(value, elementType)
      }
    } catch (error) {
      console.error('Error opening element:', error)
    }
  }

  return { openElementByPathOrId, isLoading }
}
