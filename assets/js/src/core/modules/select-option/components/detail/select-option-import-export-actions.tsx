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
import { api } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { ImportExportActionsView } from '@Pimcore/modules/field-definitions/components/editor/items/detail/import-export-actions'
import { type ImportExportConfig } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface SelectOptionImportExportActionsProps {
  id: string
  isWriteable: boolean
  disabled?: boolean
  onImported: () => void
}

const getSelectOptionUrl = (id: number | string, action: string): string =>
  `${getPrefix()}/class/select-option/${encodeURIComponent(String(id))}/${action}`

const selectOptionImportExportConfig: ImportExportConfig = {
  getExportUrl: (id) => getSelectOptionUrl(id, 'export'),
  getImportUrl: (id) => getSelectOptionUrl(id, 'import'),
  importModalTitleKey: 'select-option.import.title',
  successMessageKey: 'select-option.import.success',
  getImportInvalidation: () => api.util.invalidateTags(invalidatingTags.SELECT_OPTION_COLLECTION())
}

export const SelectOptionImportExportActions = (props: SelectOptionImportExportActionsProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <ImportExportActionsView
      config={ selectOptionImportExportConfig }
      importDisabled={ props.disabled === true || !props.isWriteable }
      importDisabledReason={ props.isWriteable ? undefined : t('config_not_writeable') }
      itemId={ props.id }
      onImported={ props.onImported }
    />
  )
}
