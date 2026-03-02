/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { IconButton, useMessage, useFormModal, ButtonGroup } from '@sdk/components'
import { ImportModal } from '@Pimcore/components/import-modal/import-modal'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'

const defaultValidateFile = (file: File): boolean => {
  return file.type === 'application/json' || file.name.endsWith('.json')
}

export const CustomLayoutActions = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { useDetailLayoutQuery, useDetailGeneralSettingsQuery, importExportConfig, useItemsDeleteMutation } = useSettings()
  const { activeConfiguration, closeConfiguration } = useItems()
  const messageApi = useMessage()
  const modal = useFormModal()

  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const canDelete = useItemsDeleteMutation !== undefined
  const [deleteItem, deleteResult] = (useItemsDeleteMutation ?? (() => [async () => {}, {}]))()
  const isDeleting = canDelete ? (deleteResult as { isLoading?: boolean }).isLoading === true : false

  // Use the pure ID from the inner ItemsContext (activeConfiguration.id) rather
  // than getIdFromGeneralSettings(generalSettings).  The backend may return a
  // composite id (e.g. "uuid.brick.obKey") in the GET response body, which
  // would make generalSettings.id differ from the original cache key, causing
  // RTK Query to fire a second GET request with the composite string as the
  // customLayoutId.  activeConfiguration.id is always the stable, clean UUID
  // that was used to open this detail view.
  const itemId = activeConfiguration?.id

  const layoutResult = useDetailLayoutQuery?.({
    id: itemId ?? ''
  })

  const generalSettingsResult = useDetailGeneralSettingsQuery({
    id: itemId ?? ''
  })

  if (isNil(importExportConfig)) {
    return <></>
  }

  const {
    getExportUrl,
    getImportUrl,
    validateFile = defaultValidateFile,
    acceptFileTypes = '.json,application/json',
    acceptMimeTypes = ['application/json'],
    successMessageKey = 'class-definition.import-success'
  } = importExportConfig

  const handleExport = (): void => {
    if (isNil(itemId)) {
      return
    }

    const link = document.createElement('a')
    link.href = getExportUrl(itemId)
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImportSuccess = (): void => {
    void messageApi.success(t(successMessageKey))
    setIsImportModalOpen(false)
    void layoutResult?.refetch()
    void generalSettingsResult?.refetch()
  }

  const handleDelete = (): void => {
    if (isNil(itemId) || isNil(activeConfiguration)) {
      return
    }

    modal.confirm({
      title: t('delete'),
      content: t('custom-layout.delete.confirmation'),
      okText: t('delete'),
      onOk: async () => {
        try {
          await deleteItem({ id: itemId })
          closeConfiguration(activeConfiguration)
          void messageApi.success(t('custom-layout.delete.success'))
        } catch (error: any) {
          trackError(new ApiError(error as FetchBaseQueryError))
        }
      }
    })
  }

  const uploadUrl = !isNil(itemId)
    ? getImportUrl(itemId)
    : ''

  return (
    <>
      <ButtonGroup
        items={ [
          <IconButton
            icon={ { value: 'export' } }
            key="export"
            onClick={ handleExport }
            title={ t('export') }
            type="link"
          />,
          <IconButton
            icon={ { value: 'upload-import' } }
            key="import"
            onClick={ () => { setIsImportModalOpen(true) } }
            title={ t('import') }
            type="link"
          />,
          ...(canDelete
            ? [
              <IconButton
                icon={ { value: 'trash' } }
                key="delete"
                loading={ isDeleting }
                onClick={ handleDelete }
                title={ t('delete') }
                type="link"
              />
              ]
            : [])
        ] }
      />

      <ImportModal
        accept={ acceptFileTypes }
        acceptMimeTypes={ acceptMimeTypes }
        action={ uploadUrl }
        onOpenChange={ setIsImportModalOpen }
        onUploadSuccess={ handleImportSuccess }
        open={ isImportModalOpen }
        title={ t('class-definition.import') }
        uploadButtonLabel={ t('import') }
        validateFile={ validateFile }
      />
    </>
  )
}
