/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useContext } from 'react'
import { Alert } from '@Pimcore/components/alert/alert'
import { Box } from '@Pimcore/components/box/box'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from '@Pimcore/components/button/button'
import {
  useVersionDeleteByIdMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { isNil } from 'lodash'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import {
  IS_AUTO_SAVE_DRAFT_CREATED
} from '@Pimcore/modules/data-object/draft/hooks/use-draft-data'

export const DraftAlert = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [deleteVersion, { isLoading, isError, error }] = useVersionDeleteByIdMutation()
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const { refreshElement } = useElementRefresh('data-object')

  if (isError) {
    throw new ApiError(error)
  }

  if (isNil(dataObject)) {
    return <></>
  }

  const draftData = dataObject?.draftData

  if (isNil(draftData) || dataObject.changes[IS_AUTO_SAVE_DRAFT_CREATED]) {
    return <></>
  }

  const deleteDraft = async (): Promise<void> => {
    await deleteVersion({ id: draftData.id })
      .then(() => {
        refreshElement(dataObject.id)
      })
  }

  const deleteDraftButton = (
    <Button
      danger
      ghost
      loading={ isLoading }
      onClick={ deleteDraft }
      size="small"
    >
      { t(draftData.isAutoSave ? 'delete-draft-auto-save' : 'delete-draft') }
    </Button>
  )

  return (
    <Box padding="extra-small">
      <Alert
        action={ deleteDraftButton }
        icon={ <Icon value="draft" /> }
        message={ t(draftData.isAutoSave ? 'draft-alert-auto-save' : 'draft-alert') }
        showIcon
        type="info"
      />
    </Box>
  )
}
