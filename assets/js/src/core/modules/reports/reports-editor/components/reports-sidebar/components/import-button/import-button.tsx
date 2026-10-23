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
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { ImportModal } from '@Pimcore/components/import-modal/import-modal'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { type BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { getReportImportUrl } from '@Pimcore/modules/reports/reports-editor/utils/config-transfer-urls'

interface IImportButtonProps {
  disabled?: boolean
  onImportSuccess: (report: BundleCustomReportsDetails) => Promise<void>
}

const isJsonFile = (file: File): boolean => file.type === 'application/json' || file.name.endsWith('.json')

export const ImportButton = ({ disabled = false, onImportSuccess }: IImportButtonProps): React.JSX.Element => {
  const { t } = useTranslation()
  const messageApi = useMessage()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUploadSuccess = (response: BundleCustomReportsDetails): void => {
    setIsModalOpen(false)
    void messageApi.success(t('reports.editor.import.success'))
    void onImportSuccess(response)
  }

  return (
    <>
      <Tooltip title={ t('import') }>
        <IconButton
          data-testid="reports-editor-import-button"
          disabled={ disabled }
          icon={ { value: 'upload-import' } }
          onClick={ () => { setIsModalOpen(true) } }
          title={ t('import') }
          type="link"
        />
      </Tooltip>

      <ImportModal
        accept=".json,application/json"
        acceptMimeTypes={ ['application/json'] }
        action={ getReportImportUrl() }
        onOpenChange={ setIsModalOpen }
        onUploadSuccess={ handleUploadSuccess }
        open={ isModalOpen }
        showSuccessMessage={ false }
        title={ t('reports.editor.import.title') }
        uploadButtonLabel={ t('import') }
        validateFile={ isJsonFile }
      />
    </>
  )
}
