/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { Alert } from '@Pimcore/components/alert/alert'
import { Box } from '@Pimcore/components/box/box'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from '@Pimcore/components/button/button'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { isNil } from 'lodash'
import {
  IS_AUTO_SAVE_DRAFT_CREATED
} from '@Pimcore/modules/element/draft/hooks/use-draft-data'
import { useDeleteDraft } from '@Pimcore/modules/element/actions/delete-draft/use-delete-draft'

export const DraftAlert = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { deleteDraft, isLoading, buttonText } = useDeleteDraft('document')
  const { id } = useContext(DocumentContext)
  const { document } = useDocumentDraft(id)

  if (isNil(document)) {
    return <></>
  }

  const draftData = document?.draftData

  if (isNil(draftData) || document.changes[IS_AUTO_SAVE_DRAFT_CREATED]) {
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