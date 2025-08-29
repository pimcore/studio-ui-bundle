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
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { api, CreatePerspectiveConfig, usePerspectiveCreateMutation, usePerspectiveUpdateConfigByIdMutation, type PerspectiveConfigDetail } from '@Pimcore/modules/perspectives/perspectives-slice.gen'
import { isUndefined } from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface UsePerspectiveEditorReturn {
  createPerspective: (onFinish?: (newName: string) => void) => void
  getPerspectiveById: (id: string) => Promise<PerspectiveConfigDetail | undefined>
  updatePerspective: (id: string, config: CreatePerspectiveConfig, onFinish?: (updated: PerspectiveConfigDetail) => void) => Promise<void>
  isLoading: boolean
}

export const usePerspectiveEditor = (): UsePerspectiveEditorReturn => {
  const dispatch = useAppDispatch()
  const modal = useFormModal()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [perspectiveCreateMutation] = usePerspectiveCreateMutation();
  const [perspectiveUpdateMutation] = usePerspectiveUpdateConfigByIdMutation();

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
        setIsLoading(true)
        await createMutation(value, () => {
          onFinish?.(value)
          setIsLoading(false)
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
        trackError(new ApiError(response.error))
        return
      }

      //TODO: clear perspective list cache tag

    } catch (error) {
      trackError(new GeneralError('Failed to create new perspective.'))
    }
  }

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

  const updatePerspective = async (id: string, config: CreatePerspectiveConfig, onFinish?: (updated: PerspectiveConfigDetail) => void): Promise<void> => {
    const perspectiveUpdateTask = perspectiveUpdateMutation({
      perspectiveId: id,
      savePerspectiveConfig: config
    })

    try {
      const response = (await perspectiveUpdateTask) as any

      if (response.error !== undefined) {
        trackError(new ApiError(response.error))
        return
      }

      //TODO: clear perspective list cache tag
      onFinish?.(config as PerspectiveConfigDetail)
    } catch (error) {
      trackError(new GeneralError('Failed to create new perspective.'))
    }
  }

  return {
    createPerspective,
    getPerspectiveById,
    updatePerspective,
    isLoading
  }
}
