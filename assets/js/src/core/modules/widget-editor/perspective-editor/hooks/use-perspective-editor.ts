/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@Pimcore/app/store'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { api, type PerspectiveConfigDetail } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import { isUndefined } from 'lodash'

interface UsePerspectiveEditorReturn {
  getPerspectiveById: (id: string) => Promise<PerspectiveConfigDetail | undefined>
}

export const usePerspectiveEditor = (): UsePerspectiveEditorReturn => {
  const dispatch = useAppDispatch()

  const getPerspectiveById = async (id: string): Promise<PerspectiveConfigDetail | undefined> => {
    try {
      const { data, isError, error } = await dispatch(api.endpoints.perspectiveGetConfigById.initiate({ perspectiveId: id }))

      if (!isUndefined(data) && isError) {
        trackError(new ApiError(error))
        return
      }

      return data!
    } catch {
      trackError(new GeneralError('Failed to load perspective data of perspective "' + id + '".'))
    }
  }

  return {
    getPerspectiveById
  }
}
