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
import { useThumbnailImageDeleteMutation } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

interface UseThumbnailConfigReturn {
  handleDelete: (thumbnail: ThumbnailConfigurationData, onSuccess?: () => void) => Promise<void>
}

interface UseThumbnailConfigProps {
  refetch: () => void
}

export const useThumbnailConfig = ({ refetch }: UseThumbnailConfigProps): UseThumbnailConfigReturn => {
  const modal = useFormModal()
  const { t } = useTranslation()
  const [deleteThumbnailMutation, { error }] = useThumbnailImageDeleteMutation()

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const handleDelete = useCallback(async (
    thumbnail: ThumbnailConfigurationData,
    onSuccess?: () => void
  ): Promise<void> => {
    if (isNil(thumbnail)) return

    modal.confirm({
      title: t('delete'),
      content: t('image-thumbnails.delete.confirm') + ` "${thumbnail.name}"?`,
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

  return {
    handleDelete
  }
}
