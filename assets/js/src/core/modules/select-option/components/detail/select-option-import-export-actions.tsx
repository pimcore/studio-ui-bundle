/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { ImportModal } from '@Pimcore/components/import-modal/import-modal'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { api } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface SelectOptionImportExportActionsProps {
  id: string
  isWriteable: boolean
  disabled?: boolean
  onImportSuccess: () => Promise<void>
}

const getExportUrl = (id: string): string => `${getPrefix()}/class/select-option/${encodeURIComponent(id)}/export`

const getImportUrl = (id: string): string => `${getPrefix()}/class/select-option/${encodeURIComponent(id)}/import`

const isJsonFile = (file: File): boolean => file.type === 'application/json' || file.name.endsWith('.json')

export const SelectOptionImportExportActions = ({
  id,
  isWriteable,
  disabled = false,
  onImportSuccess
}: SelectOptionImportExportActionsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const messageApi = useMessage()
  const dispatch = useAppDispatch()
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const handleExport = (): void => {
    const link = document.createElement('a')
    link.href = getExportUrl(id)
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImportSuccess = (): void => {
    void messageApi.success(t('select-option.import.success'))
    setIsImportModalOpen(false)
    // the upload bypasses RTK Query, so invalidate what a save invalidates
    dispatch(api.util.invalidateTags(invalidatingTags.SELECT_OPTION_COLLECTION()))
    void onImportSuccess()
  }

  return (
    <>
      <IconButton
        aria-label={ t('export') }
        icon={ { value: 'export' } }
        onClick={ handleExport }
        tooltip={ { title: t('export') } }
      />

      <IconButton
        aria-label={ t('import') }
        disabled={ disabled || !isWriteable }
        icon={ { value: 'upload-import' } }
        onClick={ () => { setIsImportModalOpen(true) } }
        tooltip={ { title: isWriteable ? t('import') : t('config_not_writeable') } }
      />

      <ImportModal
        accept=".json,application/json"
        acceptMimeTypes={ ['application/json'] }
        action={ getImportUrl(id) }
        onOpenChange={ setIsImportModalOpen }
        onUploadSuccess={ handleImportSuccess }
        open={ isImportModalOpen }
        showSuccessMessage={ false }
        title={ t('select-option.import.title') }
        uploadButtonLabel={ t('import') }
        validateFile={ isJsonFile }
      />
    </>
  )
}
