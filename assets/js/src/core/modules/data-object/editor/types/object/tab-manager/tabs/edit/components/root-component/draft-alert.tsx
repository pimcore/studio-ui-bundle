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
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { isNil } from 'lodash'
import {
  IS_AUTO_SAVE_DRAFT_CREATED
} from '@Pimcore/modules/data-object/draft/hooks/use-draft-data'
import { useDeleteDraft } from '@Pimcore/modules/data-object/actions/delete-draft/use-delete-draft'

export const DraftAlert = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { deleteDraft, isLoading, buttonText } = useDeleteDraft()
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)

  if (isNil(dataObject)) {
    return <></>
  }

  const draftData = dataObject?.draftData

  if (isNil(draftData) || dataObject.changes[IS_AUTO_SAVE_DRAFT_CREATED]) {
    return <></>
  }

  const deleteDraftButton = (
    <Button
      danger
      ghost
      loading={ isLoading }
      onClick={ deleteDraft }
      size="small"
    >
      { buttonText }
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
