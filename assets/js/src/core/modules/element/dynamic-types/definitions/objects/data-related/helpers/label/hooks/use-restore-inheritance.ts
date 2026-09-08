/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback } from 'react'
import { type NamePath } from 'antd/es/form/interface'
import {
  useKeyedListOptional
} from '@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-optional'
import {
  useEditFormContextOptional
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider'
import {
  useInheritanceState
} from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state'

export interface UseRestoreInheritanceReturn {
  /** Whether the field was inherited when the editor was opened and has been changed since. */
  canRestore: boolean
  restore: () => void
}

/**
 * Undoes the change that broke a field's inheritance, so the field takes its value
 * from the origin object again.
 *
 * Where the value lives decides how that is done. Plain fields are held by the Ant
 * form store, so the form resets them and the field is persisted as empty. Inside a
 * Form.KeyedList - object bricks and the classification store - the value is held by
 * the list, which encodes inherited fields in its own payload, so only its owner can
 * put one back.
 *
 * @param name Form path of the field, which is also the key of its inheritance state.
 * @param emptyValue Value that clears the field, see DynamicTypeObjectDataAbstract.
 */
export const useRestoreInheritance = (
  name: NamePath | undefined,
  emptyValue: unknown = null
): UseRestoreInheritanceReturn => {
  const inheritanceStateContext = useInheritanceState()
  const editFormContext = useEditFormContextOptional()
  const keyedList = useKeyedListOptional()

  const isKeyedList = keyedList !== undefined
  const isBroken = name !== undefined &&
    inheritanceStateContext?.getInheritanceState(name)?.inherited === 'broken'

  const canRestore = isBroken && (
    isKeyedList
      ? keyedList.onFieldRestore !== undefined
      : editFormContext !== undefined
  )

  const restore = useCallback((): void => {
    if (!canRestore || name === undefined) {
      return
    }

    if (isKeyedList) {
      keyedList.onFieldRestore?.(name)
    } else {
      // Resetting puts the value the field was loaded with, the inherited one, back
      // into the form. Ant does not report a reset through onValuesChange, so the
      // field is not counted as changed again.
      editFormContext?.form.resetFields([name])

      // An auto save may already have written the own value into the draft, so the
      // field has to be persisted as empty for the backend to resolve it from the
      // parent again.
      editFormContext?.clearDataObjectAttribute(name, emptyValue)
      editFormContext?.updateDraft().catch((error) => { console.error(error) })
    }

    inheritanceStateContext?.restoreInheritance(name)
  }, [canRestore, name, emptyValue, isKeyedList, keyedList, editFormContext, inheritanceStateContext])

  return { canRestore, restore }
}
