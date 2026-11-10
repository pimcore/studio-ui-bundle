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
import { useStore } from 'react-redux'
import { useAlertModal } from '@sdk/components'
import { type RootState } from '@Pimcore/app/store'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DebouncedFormRegistry } from '@Pimcore/components/form/services/debounced-form-registry'
import { selectAssetById } from '@Pimcore/modules/asset/asset-draft-slice'
import { selectDataObjectById } from '@Pimcore/modules/data-object/data-object-draft-slice'
import { selectDocumentById } from '@Pimcore/modules/document/document-draft-slice'
import { createDocumentDebounceTag } from '@Pimcore/modules/document/utils/document-debounce-tag'
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
 *   (the data-object save buttons; see WorkflowEditorCoordinator) and only
 *   continues once that save succeeded — asking first if the element was edited
 *   while it was saving. Without a saver it falls back to `warn`;
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
  const store = useStore<RootState>()
  const editForm = useEditFormContextOptional()
  const alertModal = useAlertModal()

  // Read when the action is triggered, not from the render that created this guard: a caller may
  // hold on to an older guard (e.g. a menu built once), and the draft may have changed since.
  const isDraftModified = (): boolean => {
    const state = store.getState()

    switch (elementType) {
      case 'data-object':
        return selectDataObjectById(state, id)?.modified ?? false
      case 'asset':
        return selectAssetById(state, id)?.modified ?? false
      case 'document':
        // Document sidebar forms reach the draft only after a debounce; flush it first, as saving does.
        container.get<DebouncedFormRegistry>(serviceIds.debouncedFormRegistry).flushByTag(createDocumentDebounceTag(id))
        return selectDocumentById(store.getState(), id)?.modified ?? false
      default:
        return false
    }
  }

  // The edit form collects changes right away; the draft is only marked as
  // modified once the debounced autosave has run.
  const hasUnsavedChanges = (): boolean =>
    isDraftModified() || !isEmpty(editForm?.getModifiedDataObjectAttributes())

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

      return false
    }

    // Edits made while the save was running were not part of it, and applying the action reloads
    // the element: ask before they are lost.
    if (!isEmpty(editForm?.getModifiedDataObjectAttributes())) {
      return await confirmDiscard()
    }

    return true
  }

  return { guard }
}
