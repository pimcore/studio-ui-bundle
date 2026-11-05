/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRefresh } from '@Pimcore/modules/field-definitions/components/editor/items/detail/refresh-provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import {
  ImportExportActionsView,
  type ImportExportExtraAction
} from '@Pimcore/modules/field-definitions/components/editor/items/detail/import-export-actions'
import { useMessage, useFormModal } from '@sdk/components'
import { isNil } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const CustomLayoutActions = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { importExportConfig, useItemsDeleteMutation } = useSettings()
  const { activeConfiguration, closeConfiguration } = useItems()
  const { refreshLayout } = useRefresh()
  const messageApi = useMessage()
  const modal = useFormModal()

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

  if (isNil(importExportConfig)) {
    return <></>
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

  // Delete is this surface's own: the shared view owns export and import, so the fetched export,
  // its refusal toast and the single import toast are the same here as everywhere else.
  const extraActions: ImportExportExtraAction[] = canDelete
    ? [{ key: 'delete', icon: 'trash', label: t('delete'), inFlight: isDeleting, onClick: handleDelete }]
    : []

  return (
    <ImportExportActionsView
      config={ importExportConfig }
      extraActions={ extraActions }
      inline
      itemId={ itemId }
      onImported={ () => { void refreshLayout() } }
    />
  )
}
