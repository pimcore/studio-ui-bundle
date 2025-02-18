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

import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useVersionDeleteByIdMutation } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import { isNil } from 'lodash'

export interface UseDeleteDraftHookReturn {
  deleteDraft: () => Promise<void>
  buttonText: string
  isLoading: boolean
  isError: boolean
}

export const useDeleteDraft = (): UseDeleteDraftHookReturn => {
  const { t } = useTranslation()
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const [deleteVersion, { isLoading, isError, error }] = useVersionDeleteByIdMutation()
  const { refreshElement } = useElementRefresh('data-object')
  const { confirm } = useFormModal()

  if (isError) {
    throw new ApiError(error)
  }

  const buttonText = t(dataObject?.draftData?.isAutoSave === true ? 'delete-draft-auto-save' : 'delete-draft')

  const deleteDraft = async (): Promise<void> => {
    if (isNil(dataObject?.draftData)) {
      return
    }

    confirm({
      title: buttonText,
      content: t('delete-draft-confirmation'),
      onOk: async () => {
        if (isNil(dataObject?.draftData)) {
          return
        }
        await deleteVersion({ id: dataObject.draftData.id })
          .then(() => {
            refreshElement(dataObject.id)
          })
      }
    })
  }

  return {
    deleteDraft,
    buttonText,
    isLoading,
    isError
  }
}
