/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useLazyElementGetIdByPathQuery } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { isNil } from 'lodash'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useEffect } from 'react'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

interface UsePathToIdOptions {
  trackErrors?: boolean
}

interface UsePathToIdReturn {
  convertPathToId: (elementType: ElementType, path: string) => Promise<number | null>
  isLoading: boolean
}

export const usePathToId = (options: UsePathToIdOptions = {}): UsePathToIdReturn => {
  const { trackErrors = true } = options
  const [trigger, { isLoading, error }] = useLazyElementGetIdByPathQuery()

  useEffect(() => {
    if (trackErrors && !isNil(error)) {
      trackError(new ApiError(error))
    }
  }, [error, trackErrors])

  const convertPathToId = async (
    elementType: ElementType,
    path: string
  ): Promise<number | null> => {
    if (!path.startsWith('/')) {
      return null
    }

    try {
      const { data: result } = await trigger({
        elementType,
        elementPath: path
      })

      if (!isNil(result?.id)) {
        return result.id
      } else {
        console.warn(`No ID found for path ${path}`)
        return null
      }
    } catch (error) {
      console.error(`Failed to get ID for path ${path}:`, error)
      return null
    }
  }

  return {
    convertPathToId,
    isLoading
  }
}
