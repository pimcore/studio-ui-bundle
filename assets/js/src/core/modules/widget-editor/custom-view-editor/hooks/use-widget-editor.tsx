/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { api, usePerspectiveWidgetCreateMutation, usePerspectiveWidgetDeleteMutation, usePerspectiveWidgetUpdateConfigByIdMutation, type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { isUndefined } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface UseWidgetEditorReturn {
  createWidget: (name: string, widgetType: string, onFinish?: (newName: string) => void) => Promise<void>
  getWidgetById: (widgetId: string, widgetType: string) => Promise<WidgetConfig | undefined>
  updateWidget: (widgetId: string, widgetType: string, config: any, onFinish?: (updated: any) => void) => Promise<void>
  removeWithConfirmation: (widgetId: string, widgetType: string, onFinish?: () => void) => void
}

export const useWidgetEditor = (): UseWidgetEditorReturn => {
  const dispatch = useAppDispatch()
  const modal = useFormModal()
  const { t } = useTranslation()
  const { success } = useMessage()
  const [widgetCreateMutation] = usePerspectiveWidgetCreateMutation()
  const [widgetDeleteMutation] = usePerspectiveWidgetDeleteMutation()
  const [widgetUpdateMutation] = usePerspectiveWidgetUpdateConfigByIdMutation()

  const createWidget = async (name: string, widgetType: string, onFinish?: (name: string) => void): Promise<void> => {
    const widgetCreateTask = widgetCreateMutation({
      widgetType,
      body: {
        data: {
          name
        }
      }
    })

    try {
      const response = await widgetCreateTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
      }

      onFinish?.(name)

      dispatch(
        api.util.invalidateTags(
          invalidatingTags.WIDGETS()
        )
      )

      void success(t('widget-editor.create.success'))
    } catch {
      trackError(new GeneralError('Failed to create new widget.'))
    }
  }

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

      return data?.data as unknown as WidgetConfig
    } catch {
      trackError(new GeneralError('Failed to load widget data of widget "' + widgetId + '" with type "' + widgetType + '".'))
    }
  }

  const updateWidget = async (widgetId: string, widgetType: string, config: any, onFinish?: (updated: any) => void): Promise<void> => {
    const widgetUpdateTask = widgetUpdateMutation({
      widgetId,
      widgetType,
      body: {
        data: {
          ...config
        }
      }
    })

    try {
      const response = await widgetUpdateTask

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      // TODO: clear perspective list cache tag
      onFinish?.(config)
    } catch {
      trackError(new GeneralError('Failed to create new perspective.'))
    }
  }

  const removeWithConfirmation = (widgetId: string, widgetType: string, onFinish?: () => void): void => {
    modal.confirm({
      title: t('element.delete.confirmation.title'),
      content: <span>{t('element.delete.confirmation.text')} </span>,
      okText: t('element.delete.confirmation.ok'),
      onOk: async () => {
        await remove(widgetId, widgetType, () => {
          onFinish?.()
        })
      }
    })
  }

  const remove = async (widgetId: string, widgetType: string, onFinish?: () => void): Promise<void> => {
    const deleteWidgetTask = widgetDeleteMutation({
      widgetId,
      widgetType
    })

    try {
      const response = await deleteWidgetTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
        return
      }

      onFinish?.()

      dispatch(
        api.util.invalidateTags(
          invalidatingTags.WIDGETS()
        )
      )

      void success(t('widget-editor.delete.success'))
    } catch {
      trackError(new GeneralError('Failed to delete widget'))
    }
  }

  return {
    createWidget,
    getWidgetById,
    updateWidget,
    removeWithConfirmation
  }
}
