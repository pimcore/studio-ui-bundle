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
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/classes/api-error'
import { api, type CreatePerspectiveConfig, usePerspectiveCreateMutation, usePerspectiveDeleteMutation, usePerspectiveUpdateConfigByIdMutation, type PerspectiveConfigDetail } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { isUndefined } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface UsePerspectiveEditorReturn {
  createPerspective: (onFinish?: (newName: string) => void) => void
  getPerspectiveById: (id: string) => Promise<PerspectiveConfigDetail | undefined>
  updatePerspective: (id: string, config: CreatePerspectiveConfig, onFinish?: () => void) => Promise<void>
  removeWithConfirmation: (id: string, onFinish?: () => void) => void
  isLoading: boolean
}

export const usePerspectiveEditor = (): UsePerspectiveEditorReturn => {
  const dispatch = useAppDispatch()
  const modal = useFormModal()
  const { t } = useTranslation()
  const { success } = useMessage()
  const [perspectiveCreateMutation, { isLoading: isCreateLoading }] = usePerspectiveCreateMutation()
  const [perspectiveUpdateMutation, { isLoading: isUpdateLoading }] = usePerspectiveUpdateConfigByIdMutation()
  const [perspectiveDeleteMutation, { isLoading: isDeleteLoading }] = usePerspectiveDeleteMutation()

  const createPerspective = (
    onFinish?: (newName: string) => void
  ): void => {
    modal.input({
      title: t('perspective-editor.add-modal.title'),
      label: t('perspective-editor.add-modal.name.label'),
      rule: {
        required: true,
        message: t('perspective-editor.add-modal.name.validation')
      },
      onOk: async (value: string) => {
        await createMutation(value, () => {
          onFinish?.(value)
        })
      }
    })
  }

  const createMutation = async (value: string, onFinish?: (newName: string) => void): Promise<void> => {
    const perspectiveCreateTask = perspectiveCreateMutation({
      addPerspectiveConfig: {
        name: value
      }
    })

    try {
      const response = (await perspectiveCreateTask) as any

      if (response.error !== undefined) {
        trackError(new ApiError(response.error as ApiErrorData))
      }

      onFinish?.(value)

      dispatch(
        api.util.invalidateTags(
          invalidatingTags.PERSPECTIVES()
        )
      )

      void success(t('perspective-editor.create.success'))
    } catch {
      trackError(new GeneralError('Failed to create new perspective.'))
    }
  }

  const getPerspectiveById = async (id: string): Promise<PerspectiveConfigDetail | undefined> => {
    try {
      const { data, isError, error } = await dispatch(api.endpoints.perspectiveGetConfigById.initiate({ perspectiveId: id }, { forceRefetch: true }))

      if (!isUndefined(data) && isError) {
        trackError(new ApiError(error))
        return
      }

      return data!
    } catch {
      trackError(new GeneralError('Failed to load perspective data of perspective "' + id + '".'))
    }
  }

  const updatePerspective = async (id: string, config: CreatePerspectiveConfig, onFinish?: () => void): Promise<void> => {
    const perspectiveUpdateTask = perspectiveUpdateMutation({
      perspectiveId: id,
      savePerspectiveConfig: config
    })

    try {
      const response = (await perspectiveUpdateTask) as any

      if (response.error !== undefined) {
        onFinish?.()
        trackError(new ApiError(response.error as ApiErrorData))
        return
      }

      onFinish?.()
      void success(t('perspective-editor.update.success'))
    } catch {
      onFinish?.()
      trackError(new GeneralError('Failed to update perspective.'))
    }
  }

  const removeWithConfirmation = (id: string, onFinish?: () => void): void => {
    modal.confirm({
      title: t('element.delete.confirmation.title'),
      content: <span>{t('element.delete.confirmation.text')}</span>,
      okText: t('element.delete.confirmation.ok'),
      onOk: async () => {
        await remove(id, () => {
          onFinish?.()
        })
      }
    })
  }

  const remove = async (id: string, onFinish?: () => void): Promise<void> => {
    const deletePerspectiveTask = perspectiveDeleteMutation({
      perspectiveId: id
    })

    try {
      const response = await deletePerspectiveTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
        return
      }

      dispatch(
        api.util.invalidateTags(
          invalidatingTags.PERSPECTIVES()
        )
      )

      onFinish?.()
      void success(t('perspective-editor.delete.success'))
    } catch {
      trackError(new GeneralError('Failed to delete perspective'))
    }
  }

  const isLoading = isCreateLoading || isUpdateLoading || isDeleteLoading

  return {
    createPerspective,
    getPerspectiveById,
    updatePerspective,
    removeWithConfirmation,
    isLoading
  }
}
