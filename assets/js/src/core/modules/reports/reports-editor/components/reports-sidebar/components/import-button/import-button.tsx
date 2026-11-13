/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { ImportModal } from '@Pimcore/components/import-modal/import-modal'
import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { type BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { getReportImportUrl } from '@Pimcore/modules/reports/reports-editor/utils/config-transfer-urls'

interface IImportButtonProps {
  disabled?: boolean
  onImportSuccess: (report: BundleCustomReportsDetails) => Promise<void>
}

const JSON_FILE_EXTENSION = '.json'

const isJsonFile = (file: File): boolean => file.name.toLowerCase().endsWith(JSON_FILE_EXTENSION)

export const ImportButton = ({ disabled = false, onImportSuccess }: IImportButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const messageApi = useMessage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUploadSuccess = (response: BundleCustomReportsDetails): void => {
    setIsModalOpen(false)
    void messageApi.success(t('reports.editor.import.success'))
    onImportSuccess(response).catch((error: unknown) => {
      trackError(error instanceof ApiError ? error : new GeneralError('Failed to refresh custom reports after import'))
    })
  }

  const handleValidationError = (file: File): void => {
    if (isJsonFile(file)) {
      return
    }

    void messageApi.error(t('reports.editor.import.invalid-file'))
  }

  return (
    <>
      <IconButton
        aria-label={ t('import') }
        data-testid="reports-editor-import-button"
        disabled={ disabled }
        icon={ { value: 'upload-import' } }
        onClick={ () => { setIsModalOpen(true) } }
        tooltip={ { title: t('import') } }
        type="link"
      />

      <ImportModal
        accept={ JSON_FILE_EXTENSION }
        action={ getReportImportUrl() }
        onOpenChange={ setIsModalOpen }
        onUploadSuccess={ handleUploadSuccess }
        onValidationError={ handleValidationError }
        open={ isModalOpen }
        showSuccessMessage={ false }
        title={ t('reports.editor.import.title') }
        uploadButtonLabel={ t('import') }
      />
    </>
  )
}
