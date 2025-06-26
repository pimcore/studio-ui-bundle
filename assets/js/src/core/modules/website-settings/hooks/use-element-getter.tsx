/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useElementGetIdByPathQuery } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { type ElementGetIdByPathApiArg } from '@Pimcore/modules/element/element-api-slice.gen'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { ApiError, trackError } from '@sdk/modules/app'
import { isUndefined } from 'lodash'
import { useEffect } from 'react'

interface UseElementGetterProps {
  elementType: ElementType
  elementPath: string
}

interface UseElementGetterReturn {
  elementId: number | undefined
}

export const useElementGetter = ({ elementType, elementPath }: UseElementGetterProps): UseElementGetterReturn => {
  const getIdByPathArg: ElementGetIdByPathApiArg = {
    elementType,
    elementPath
  }

  const { data, error } = useElementGetIdByPathQuery(getIdByPathArg)

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const elementId = data?.id

  return {
    elementId
  }
}
