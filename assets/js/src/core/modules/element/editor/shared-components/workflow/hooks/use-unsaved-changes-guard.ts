/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmpty } from 'lodash'
import { t } from 'i18next'
import { useAlertModal } from '@sdk/components'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'
import { useDataObjectUpdateByIdMutation } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import {
  useOptionalEditFormContext
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { type WorkflowAction } from '../types/workflow-types'

interface UseUnsavedChangesGuardReturn {
  /**
   * Resolves to true when the action may be submitted, after saving the
   * element first if the transition asks for it; false when the user
   * cancelled or saving failed.
   */
  guard: (workflowAction: WorkflowAction) => Promise<boolean>
}

/**
 * Applies a transition's `unsavedChangesBehaviour` before it is submitted.
 * The backend applies a workflow action to the saved element and the editor
 * reloads it afterwards, so without this, unsaved changes are dropped
 * silently:
 *
 * - `save`: saves the element first (data objects; other element types fall
 *   back to `warn`);
 * - `warn`: asks whether to apply the action and lose the changes;
 * - `ignore`: submits right away.
 *
 * Global actions and elements without changes are never held up.
 */
export const useUnsavedChangesGuard = (id: number, elementType: ElementType): UseUnsavedChangesGuardReturn => {
  const { element, removeTrackedChanges } = useElementDraft(id, elementType)
  const editForm = useOptionalEditFormContext()
  const [updateDataObject] = useDataObjectUpdateByIdMutation()
  const alertModal = useAlertModal()

  // The edit form collects changes right away; the draft is only marked as
  // modified once the debounced autosave has run.
  const hasUnsavedChanges = (): boolean =>
    element?.modified === true || !isEmpty(editForm?.getModifiedDataObjectAttributes())

  const confirmDiscard = async (): Promise<boolean> => await new Promise<boolean>((resolve) => {
    alertModal.warn({
      title: t('workflow.unsaved-changes.title'),
      content: t('workflow.unsaved-changes.warn'),
      okCancel: true,
      okText: t('workflow.unsaved-changes.apply-anyway'),
      onOk: () => { resolve(true) },
      onCancel: () => { resolve(false) }
    })
  })

  const saveDataObject = async (): Promise<boolean> => {
    const published = (element as { published?: boolean } | undefined)?.published === true

    const response = await updateDataObject({
      id,
      body: {
        data: {
          editableData: editForm?.getModifiedDataObjectAttributes() ?? {},
          // Same task as the primary save button.
          task: published ? 'publish' : 'save',
          useDraftData: true
        }
      }
    })

    if (response.error !== undefined) {
      trackError(new ApiError(response.error))

      return false
    }

    editForm?.resetModifiedDataObjectAttributes()
    removeTrackedChanges()

    return true
  }

  const guard = async (workflowAction: WorkflowAction): Promise<boolean> => {
    const behaviour = workflowAction.unsavedChangesBehaviour

    if (workflowAction.actionType !== 'transition' || behaviour === undefined || behaviour === 'ignore' || !hasUnsavedChanges()) {
      return true
    }

    if (behaviour === 'save' && elementType === 'data-object') {
      return await saveDataObject()
    }

    return await confirmDiscard()
  }

  return { guard }
}
