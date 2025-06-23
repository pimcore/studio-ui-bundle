/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useTranslation } from 'react-i18next'
import { useVersionDeleteByIdMutation } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { useElementRefresh } from '@Pimcore/modules/element/actions/refresh-element/use-element-refresh'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'
import { isNil } from 'lodash'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@sdk/modules/element'

export interface UseDeleteDraftHookReturn {
  deleteDraft: () => Promise<void>
  buttonText: string
  isLoading: boolean
  isError: boolean
}

export const useDeleteDraft = (elementType: ElementType): UseDeleteDraftHookReturn => {
  const { t } = useTranslation()
  const { id } = useElementContext()
  const { element } = useElementDraft(id, elementType)
  const [deleteVersion, { isLoading, isError, error }] = useVersionDeleteByIdMutation()
  const { refreshElement } = useElementRefresh(elementType)
  const { confirm } = useFormModal()

  if (isError) {
    throw new ApiError(error)
  }

  const buttonText = t(element?.draftData?.isAutoSave === true ? 'delete-draft-auto-save' : 'delete-draft')

  const deleteDraft = async (): Promise<void> => {
    if (isNil(element?.draftData)) {
      return
    }

    confirm({
      title: buttonText,
      content: t('delete-draft-confirmation'),
      onOk: async () => {
        if (isNil(element?.draftData)) {
          return
        }
        await deleteVersion({ id: element.draftData.id })
          .then(() => {
            refreshElement(element.id)
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
