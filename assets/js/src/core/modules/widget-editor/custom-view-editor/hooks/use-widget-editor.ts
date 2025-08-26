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
import { api, type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import { isUndefined } from 'lodash'

interface UseWidgetEditorReturn {
  getWidgetById: (id: string, type: string) => Promise<WidgetConfig | undefined>
}

export const useWidgetEditor = (): UseWidgetEditorReturn => {
  const dispatch = useAppDispatch()

  const getWidgetById = async (widgetId: string, widgetType: string): Promise<WidgetConfig | undefined> => {
    try {
      const { data, isError, error } = await dispatch(api.endpoints.perspectiveWidgetGetConfigById.initiate({
        widgetId,
        widgetType
      }))

      if (!isUndefined(data) && isError) {
        trackError(new ApiError(error))
        return
      }

      return data.data as unknown as WidgetConfig
    } catch (error) {
      trackError(new GeneralError('Failed to load widget data of widget "' + widgetId + '" with type "' + widgetType + '".'))
    }
  }

  return {
    getWidgetById
  }
}
