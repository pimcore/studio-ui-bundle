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
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/types'
import {
  api,
  useClassSelectOptionCreateMutation,
  useClassSelectOptionDeleteMutation,
  useClassSelectOptionUpdateMutation
} from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import type { SelectOptionDetail, SchemaUsedToUpdateSelectOptionConfigurations } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
import { isUndefined } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface UseSelectOptionEditorReturn {
  createSelectOption: (onFinish?: (newId: string) => void) => void
  getSelectOptionById: (id: string) => Promise<SelectOptionDetail | undefined>
  updateSelectOption: (id: string, config: SchemaUsedToUpdateSelectOptionConfigurations, onFinish?: () => void) => Promise<void>
  removeWithConfirmation: (id: string, onFinish?: () => void) => void
  isLoading: boolean
}

export const useSelectOptionEditor = (): UseSelectOptionEditorReturn => {
  const dispatch = useAppDispatch()
  const modal = useFormModal()
  const { t } = useTranslation()
  const { success } = useMessage()
  const [selectOptionCreateMutation, { isLoading: isCreateLoading }] = useClassSelectOptionCreateMutation()
  const [selectOptionUpdateMutation, { isLoading: isUpdateLoading }] = useClassSelectOptionUpdateMutation()
  const [selectOptionDeleteMutation, { isLoading: isDeleteLoading }] = useClassSelectOptionDeleteMutation()

  const createSelectOption = (
    onFinish?: (newId: string) => void
  ): void => {
    modal.input({
      title: t('select-option.create-new'),
      label: t('select-option.enter-name-new-item'),
      rule: {
        required: true,
        pattern: /^[A-Z][a-zA-Z0-9]*$/,
        message: t('select-option.validation.id-format')
      },
      onOk: async (value: string) => {
        await createMutation(value, () => {
          onFinish?.(value)
        })
      }
    })
  }

  const createMutation = async (value: string, onFinish?: (newId: string) => void): Promise<void> => {
    const createTask = selectOptionCreateMutation({
      createSelectOption: {
        id: value
      }
    })

    try {
      const response = (await createTask) as any

      if (response.error !== undefined) {
        trackError(new ApiError(response.error as ApiErrorData))
      }

      onFinish?.(value)

      void success(t('select-option.create.success'))
    } catch {
      trackError(new GeneralError('Failed to create new select option.'))
    }
  }

  const getSelectOptionById = async (id: string): Promise<SelectOptionDetail | undefined> => {
    try {
      const { data, isError, error } = await dispatch(api.endpoints.classSelectOptionGet.initiate({ id }, { forceRefetch: true }))

      if (!isUndefined(data) && isError) {
        trackError(new ApiError(error))
        return
      }

      return data!
    } catch {
      trackError(new GeneralError('Failed to load select option data of "' + id + '".'))
    }
  }

  const updateSelectOption = async (id: string, config: SchemaUsedToUpdateSelectOptionConfigurations, onFinish?: () => void): Promise<void> => {
    const updateTask = selectOptionUpdateMutation({
      id,
      updateSelectOption: config
    })

    try {
      const response = (await updateTask) as any

      if (response.error !== undefined) {
        trackError(new ApiError(response.error as ApiErrorData))
        return
      }

      onFinish?.()
      void success(t('select-option.update.success'))
    } catch {
      trackError(new GeneralError('Failed to update select option.'))
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
    const deleteTask = selectOptionDeleteMutation({
      id
    })

    try {
      const response = await deleteTask

      if (!isUndefined(response.error)) {
        trackError(new ApiError(response.error))
        return
      }

      dispatch(
        api.util.invalidateTags(
          invalidatingTags.SELECT_OPTION_COLLECTION()
        )
      )

      onFinish?.()
      void success(t('select-option.delete.success'))
    } catch {
      trackError(new GeneralError('Failed to delete select option'))
    }
  }

  const isLoading = isCreateLoading || isUpdateLoading || isDeleteLoading

  return {
    createSelectOption,
    getSelectOptionById,
    updateSelectOption,
    removeWithConfirmation,
    isLoading
  }
}
