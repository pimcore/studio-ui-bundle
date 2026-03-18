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
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { Dropdown, type DropdownMenuProps, Icon, IconTextButton, useMessage } from '@sdk/components'
import { ImportModal } from '@Pimcore/components/import-modal/import-modal'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const defaultValidateFile = (file: File): boolean => {
  return file.type === 'application/json' || file.name.endsWith('.json')
}

export const ImportExportActions = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { activeConfiguration } = useItems()
  const { useDetailLayoutQuery, useDetailGeneralSettingsQuery, importExportConfig } = useSettings()
  const messageApi = useMessage()

  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

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

  const uploadUrl = !isNil(itemId)
    ? getImportUrl(itemId)
    : ''

  const menuItems: DropdownMenuProps['items'] = [
    {
      key: 'export',
      icon: <Icon value="export" />,
      label: t('export'),
      onClick: handleExport
    },
    {
      key: 'import',
      icon: <Icon value="upload-import" />,
      label: t('import'),
      onClick: () => { setIsImportModalOpen(true) }
    }
  ]

  return (
    <>
      <Dropdown menu={ { items: menuItems } }>
        <IconTextButton
          icon={ { value: 'chevron-down' } }
          iconPlacement='right'
          type='link'
        >
          {t('toolbar.more')}
        </IconTextButton>
      </Dropdown>

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
