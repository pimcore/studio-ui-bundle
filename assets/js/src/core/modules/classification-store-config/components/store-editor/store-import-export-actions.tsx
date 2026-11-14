/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { ImportExportActionsView } from '@Pimcore/modules/field-definitions/components/editor/items/detail/import-export-actions'
import { type ImportExportConfig } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { useStoreImport } from '@Pimcore/modules/classification-store-config/components/store-editor/store-import-provider'
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

interface IStoreImportExportActionsProps {
  storeId: number
}

/** The apply endpoint names no store: the file carries the one it describes. */
export const getStoreApplyUrl = (): string => `${getPrefix()}/classification-store/configuration/stores/apply`

const storeImportExportConfig: ImportExportConfig = {
  getExportUrl: (id) => `${getPrefix()}/classification-store/configuration/stores/${id}/export`,
  getImportUrl: (id) => `${getPrefix()}/classification-store/configuration/stores/${id}/import`,
  importModalTitleKey: 'classification-store.import',
  successMessageKey: 'classification-store.import-success',
  // The keys, groups, collections and sub groups collections all provide this tag.
  getImportInvalidation: () => api.util.invalidateTags(['Classification Store'])
}

export const StoreImportExportActions = ({ storeId }: IStoreImportExportActionsProps): React.JSX.Element => {
  const { notifyImported } = useStoreImport()

  if (!isAllowed(UserPermission.ClassificationStore)) {
    return <></>
  }

  return (
    <ImportExportActionsView
      config={ storeImportExportConfig }
      inline
      itemId={ storeId }
      onImported={ notifyImported }
    />
  )
}
