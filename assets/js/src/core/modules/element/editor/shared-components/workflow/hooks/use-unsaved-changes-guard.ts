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
import {
  useEditFormContextOptional
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { type WorkflowAction } from '../types/workflow-types'
import { type UnsavedChangesSaver } from '../provider/unsaved-changes-saver-context'

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
 * - `save`: saves the element first through the saver its editor registered
 *   (the data-object save buttons; see UnsavedChangesSaverContext) and only
 *   continues once that save succeeded. Without a saver it falls back to `warn`;
 * - `warn`: asks whether to apply the action and lose the changes;
 * - `ignore`: submits right away.
 *
 * Global actions and elements without changes are never held up.
 */
export const useUnsavedChangesGuard = (
  id: number,
  elementType: ElementType,
  getSaver: () => UnsavedChangesSaver | undefined
): UseUnsavedChangesGuardReturn => {
  const { element } = useElementDraft(id, elementType)
  const editForm = useEditFormContextOptional()
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

  const guard = async (workflowAction: WorkflowAction): Promise<boolean> => {
    const behaviour = workflowAction.unsavedChangesBehaviour

    if (workflowAction.actionType !== 'transition' || behaviour === undefined || behaviour === 'ignore' || !hasUnsavedChanges()) {
      return true
    }

    const saver = behaviour === 'save' ? getSaver() : undefined
    if (saver === undefined) {
      return await confirmDiscard()
    }

    const saved = await saver()
    if (!saved) {
      alertModal.error({
        title: t('action-could-not-be-applied'),
        content: t('workflow.unsaved-changes.save-failed')
      })
    }

    return saved
  }

  return { guard }
}
