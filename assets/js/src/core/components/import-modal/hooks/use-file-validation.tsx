/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { formatDataUnit } from '@Pimcore/utils/data-unit'
import { isNil } from 'lodash'

interface UseFileValidationProps {
  accept?: string
  acceptMimeTypes?: string[]
  maxFileSize?: number
}

export const useFileValidation = ({
  accept,
  acceptMimeTypes,
  maxFileSize
}: UseFileValidationProps): ((file: File) => boolean) => {
  const { t } = useTranslation()
  const settings = useSettings()
  const alertModal = useAlertModal()

  return useCallback((file: File): boolean => {
    if (!isNil(accept)) {
      const hasValidExtension = accept.split(',').some(ext =>
        file.name.toLowerCase().endsWith(ext.trim().toLowerCase())
      )
      if (!hasValidExtension) return false
    }

    if (!isNil(acceptMimeTypes)) {
      const hasValidMimeType = acceptMimeTypes.some(mimeType =>
        file.type === mimeType
      )
      if (!hasValidMimeType) return false
    }

    if (!isNil(maxFileSize) && file.size > maxFileSize) {
      alertModal.error({
        title: 'error',
        content: t('upload.error.max-file-size-exceeded', { maxSize: formatDataUnit(maxFileSize) })
      })
      return false
    }

    const serverMaxFileSize = settings.upload_max_filesize
    if (!isNil(serverMaxFileSize) && file.size > serverMaxFileSize) {
      alertModal.error({
        title: 'error',
        content: t('upload.error.file-too-large')
      })
      return false
    }

    return true
  }, [accept, acceptMimeTypes, maxFileSize, settings.upload_max_filesize])
}
