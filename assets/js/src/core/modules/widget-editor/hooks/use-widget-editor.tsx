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
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { api, usePerspectiveWidgetCreateMutation, usePerspectiveWidgetDeleteMutation, usePerspectiveWidgetUpdateConfigByIdMutation, type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { isUndefined } from 'lodash'
import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface UseWidgetEditorReturn {
  createWidget: (name: string, widgetType: string, onFinish?: (id: string) => void) => Promise<void>
  getWidgetById: (widgetId: string, widgetType: string) => Promise<WidgetConfig | undefined>
  updateWidget: (widgetId: string, widgetType: string, config: any, onFinish?: (updated: any) => void) => Promise<void>
  removeWithConfirmation: (widgetId: string, widgetType: string, onFinish?: () => void) => void
  isLoading: boolean
}

export const useWidgetEditor = (): UseWidgetEditorReturn => {
  const dispatch = useAppDispatch()
  const modal = useFormModal()
  const { t } = useTranslation()
  const { success } = useMessage()
  const [widgetCreateMutation, { isLoading: isCreateLoading }] = usePerspectiveWidgetCreateMutation()
  const [widgetDeleteMutation, { isLoading: isDeleteLoading }] = usePerspectiveWidgetDeleteMutation()
  const [widgetUpdateMutation, { isLoading: isUpdateLoading }] = usePerspectiveWidgetUpdateConfigByIdMutation()

  // Use refs for values that change often but shouldn't invalidate callbacks
  const tRef = useRef(t)
  tRef.current = t
  const successRef = useRef(success)
  successRef.current = success
  const modalRef = useRef(modal)
  modalRef.current = modal

  const remove = useCallback(async (widgetId: string, widgetType: string, onFinish?: () => void): Promise<void> => {
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
      void successRef.current(tRef.current('widget-editor.delete.success'))
    } catch {
      trackError(new GeneralError('Failed to delete widget'))
    }
  }, [widgetDeleteMutation])

  const createWidget = useCallback(async (name: string, widgetType: string, onFinish?: (id: string) => void): Promise<void> => {
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
        return
      }

      const { id } = response.data as { id: string }
      onFinish?.(id)
      void successRef.current(tRef.current('widget-editor.create.success'))
    } catch {
      trackError(new GeneralError('Failed to create new widget.'))
    }
  }, [widgetCreateMutation])

  const getWidgetById = useCallback(async (widgetId: string, widgetType: string): Promise<WidgetConfig | undefined> => {
    try {
      const { data, isError, error } = await dispatch(api.endpoints.perspectiveWidgetGetConfigById.initiate({
        widgetId,
        widgetType
      }, { forceRefetch: true }))

      if (!isUndefined(data) && isError) {
        trackError(new ApiError(error))
        return
      }

      return data?.data as unknown as WidgetConfig
    } catch {
      trackError(new GeneralError('Failed to load widget data of widget "' + widgetId + '" with type "' + widgetType + '".'))
    }
  }, [dispatch])

  const updateWidget = useCallback(async (widgetId: string, widgetType: string, config: any, onFinish?: (updated: any) => void): Promise<void> => {
    const classes: object | undefined = config.classes ?? undefined
    const widgetUpdateTask = widgetUpdateMutation({
      widgetId,
      widgetType,
      body: {
        data: {
          ...config,
          rootFolder: config.rootFolder?.fullPath ?? '/',
          classes: !isUndefined(classes) ? Object.keys(classes).filter(key => classes[key] === true) : undefined
        }
      }
    })

    try {
      const response = await widgetUpdateTask

      if (response.error !== undefined) {
        onFinish?.(config)
        trackError(new ApiError(response.error))
        return
      }

      onFinish?.(config)
      void successRef.current(tRef.current('widget-editor.update.success'))
    } catch {
      trackError(new GeneralError('Failed to create new perspective.'))
      onFinish?.(config)
    }
  }, [widgetUpdateMutation])

  const removeWithConfirmation = useCallback((widgetId: string, widgetType: string, onFinish?: () => void): void => {
    modalRef.current.confirm({
      title: tRef.current('element.delete.confirmation.title'),
      content: <span>{tRef.current('element.delete.confirmation.text')} </span>,
      okText: tRef.current('element.delete.confirmation.ok'),
      onOk: async () => {
        await remove(widgetId, widgetType, () => {
          onFinish?.()
        })
      }
    })
  }, [remove])

  const isLoading = isCreateLoading || isDeleteLoading || isUpdateLoading

  return {
    createWidget,
    getWidgetById,
    updateWidget,
    removeWithConfirmation,
    isLoading
  }
}
