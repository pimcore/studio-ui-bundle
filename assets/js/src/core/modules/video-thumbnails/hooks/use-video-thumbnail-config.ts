/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { isNil, has, isUndefined } from 'lodash'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { useThumbnailVideoDeleteMutation, useThumbnailVideoCreateMutation } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useMessage } from '@Pimcore/components/message/useMessage'

interface UseVideoThumbnailConfigReturn {
  handleDelete: (thumbnail: ThumbnailConfigurationData, onSuccess?: () => void) => Promise<void>
  handleAdd: (onSuccess?: (thumbnailName: string) => void) => void
}

interface UseVideoThumbnailConfigProps {
  refetch: () => void
}

export const useVideoThumbnailConfig = ({ refetch }: UseVideoThumbnailConfigProps): UseVideoThumbnailConfigReturn => {
  const modal = useFormModal()
  const { t } = useTranslation()
  const messageApi = useMessage()
  const [deleteThumbnailMutation, { error: deleteError }] = useThumbnailVideoDeleteMutation()
  const [createThumbnail, { error: createError }] = useThumbnailVideoCreateMutation()

  useEffect(() => {
    if (!isUndefined(deleteError)) {
      trackError(new ApiError(deleteError))
    }
  }, [deleteError])

  useEffect(() => {
    if (!isUndefined(createError)) {
      trackError(new ApiError(createError))
    }
  }, [createError])

  const handleDelete = useCallback(async (
    thumbnail: ThumbnailConfigurationData,
    onSuccess?: () => void
  ): Promise<void> => {
    if (isNil(thumbnail)) return

    modal.confirm({
      title: t('delete'),
      content: t('video-thumbnails.delete.confirm') + ` "${thumbnail.name}"?`,
      onOk: async () => {
        const result = await deleteThumbnailMutation({ name: thumbnail.name })

        if (has(result, 'error')) {
          return
        }

        refetch()

        if (!isNil(onSuccess)) {
          onSuccess()
        }
      }
    })
  }, [refetch, t, deleteThumbnailMutation, modal])

  const handleAdd = useCallback((
    onSuccess?: (thumbnailName: string) => void
  ): void => {
    modal.input({
      label: t('video-thumbnails.add.content'),
      rule: {
        pattern: /^[a-zA-Z0-9_-]+$/,
        message: t('video-thumbnails.add.validation.message')
      },
      onOk: async (value: string) => {
        const sanitized = value.replaceAll(/[^a-zA-Z0-9_-]/g, '')

        if (sanitized.length <= 2) {
          void messageApi.error(t('video-thumbnails.add.validation.message'))
          return
        }

        const result = await createThumbnail({ createThumbnailConfig: { name: sanitized } })

        if (has(result, 'error')) {
          return
        }

        refetch()

        if (!isNil(onSuccess)) {
          onSuccess(sanitized)
        }
      }
    })
  }, [createThumbnail, refetch, t, modal, messageApi])

  return {
    handleDelete,
    handleAdd
  }
}
