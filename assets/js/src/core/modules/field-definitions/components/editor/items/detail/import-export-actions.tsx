/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { useRefresh } from '@Pimcore/modules/field-definitions/components/editor/items/detail/refresh-provider'
import { type ImportExportConfig, useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { ButtonGroup, Dropdown, type DropdownMenuProps, Icon, IconTextButton, useMessage } from '@sdk/components'
import { ImportModal } from '@Pimcore/components/import-modal/import-modal'
import { downloadFile } from '@Pimcore/modules/app/utils/download'
import trackError, { ApiError, GeneralError, isApiErrorData } from '@Pimcore/modules/app/error-handler'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { useAppDispatch } from '@Pimcore/app/store'
import { useTranslation } from 'react-i18next'

const defaultValidateFile = (file: File): boolean => {
  return file.type === 'application/json' || file.name.endsWith('.json')
}

const EXPORT_ACTION = 'export'
const IMPORT_ACTION = 'import'

const CONTENT_DISPOSITION_FILENAME = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i

/** the name the response asks for, or a deterministic one when it names none */
const getExportFilename = (response: Response, itemId: number | string): string => {
  const match = CONTENT_DISPOSITION_FILENAME.exec(response.headers.get('content-disposition') ?? '')

  return isNil(match) ? `export-${String(itemId)}.json` : match[1]
}

export interface ImportExportActionsViewProps {
  config: ImportExportConfig
  itemId: number | string | undefined
  /** called after a successful import, before the configured invalidation is dispatched */
  onImported?: () => void
  /** render both actions as buttons instead of putting them behind the 'More' dropdown */
  inline?: boolean
}

/**
 * The export and import actions themselves, free of the field-definitions Editor contexts so
 * that a configuration screen which is not an Editor can render them too.
 */
export const ImportExportActionsView = ({
  config,
  itemId,
  onImported,
  inline = false
}: ImportExportActionsViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const messageApi = useMessage()
  const dispatch = useAppDispatch()

  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const {
    getExportUrl,
    getImportUrl,
    validateFile = defaultValidateFile,
    acceptFileTypes = '.json,application/json',
    acceptMimeTypes = ['application/json'],
    successMessageKey = 'class-definition.import-success',
    importModalTitleKey = 'class-definition.import',
    getImportInvalidation
  } = config

  const handleExport = async (): Promise<void> => {
    if (isNil(itemId)) {
      return
    }

    try {
      const response = await fetch(getExportUrl(itemId))

      if (!response.ok) {
        trackError(new ApiError({ data: await response.json() }))

        return
      }

      downloadFile(getExportFilename(response, itemId), await response.blob())
    } catch (error: any) {
      trackError(isApiErrorData(error) ? new ApiError(error) : new GeneralError(error?.message as string))
    }
  }

  const handleImportSuccess = (): void => {
    void messageApi.success(t(successMessageKey))
    setIsImportModalOpen(false)
    onImported?.()

    // The upload posts straight to the import URL, so nothing invalidates the cache for it.
    if (!isNil(getImportInvalidation) && !isNil(itemId)) {
      dispatch(getImportInvalidation(itemId))
    }
  }

  const uploadUrl = !isNil(itemId)
    ? getImportUrl(itemId)
    : ''

  const actions = [
    { key: EXPORT_ACTION, icon: EXPORT_ACTION, onClick: () => { void handleExport() } },
    { key: IMPORT_ACTION, icon: 'upload-import', onClick: () => { setIsImportModalOpen(true) } }
  ]

  const menuItems: DropdownMenuProps['items'] = actions.map(({ key, icon, onClick }) => ({
    key,
    icon: <Icon value={ icon } />,
    label: t(key),
    onClick
  }))

  return (
    <>
      {inline
        ? (
          <ButtonGroup
            items={ actions.map(({ key, icon, onClick }) => (
              <IconTextButton
                icon={ { value: icon } }
                key={ key }
                onClick={ onClick }
                type="link"
              >
                {t(key)}
              </IconTextButton>
            )) }
          />
          )
        : (
          <Dropdown menu={ { items: menuItems } }>
            <IconTextButton
              icon={ { value: 'chevron-down' } }
              iconPlacement='right'
              type='link'
            >
              {t('toolbar.more')}
            </IconTextButton>
          </Dropdown>
          )}

      <ImportModal
        accept={ acceptFileTypes }
        acceptMimeTypes={ acceptMimeTypes }
        action={ uploadUrl }
        onOpenChange={ setIsImportModalOpen }
        onUploadSuccess={ handleImportSuccess }
        open={ isImportModalOpen }
        title={ t(importModalTitleKey) }
        uploadButtonLabel={ t(IMPORT_ACTION) }
        validateFile={ validateFile }
      />
    </>
  )
}

export const ImportExportActions = (): React.JSX.Element => {
  const { activeConfiguration } = useItems()
  const { importExportConfig } = useSettings()
  const { refreshLayout } = useRefresh()

  if (isNil(importExportConfig)) {
    return <></>
  }

  return (
    <ImportExportActionsView
      config={ importExportConfig }
      itemId={ activeConfiguration?.id }
      onImported={ () => { void refreshLayout() } }
    />
  )
}
