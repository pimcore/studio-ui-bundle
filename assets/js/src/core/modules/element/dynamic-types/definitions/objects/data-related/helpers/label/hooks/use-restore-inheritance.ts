/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useContext } from 'react'
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
import { RestoreInheritanceKeyedListContext } from './restore-inheritance-keyed-list-context'

export interface UseRestoreInheritanceReturn {
  /**
   * Whether the field carries an own value that hides an ancestor value, set during
   * this editing session or an earlier one.
   */
  canRestore: boolean
  restore: () => void
}

/**
 * Removes a field's own value, so the field takes its value from the origin object
 * again.
 *
 * Where the value lives decides how that is done. Plain fields are held by the Ant
 * form store, so the form shows the inherited value again and the field is persisted
 * as empty. Inside a Form.KeyedList - object bricks and the classification store - the
 * value is held by the list, which encodes inherited fields in its own payload, so
 * only its owner can put one back.
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
  const nearestKeyedList = useKeyedListOptional()
  const keyedListOverride = useContext(RestoreInheritanceKeyedListContext)
  const keyedList = keyedListOverride !== undefined ? keyedListOverride.keyedList : nearestKeyedList

  const isKeyedList = keyedList !== undefined
  const isRestorable = name !== undefined &&
    inheritanceStateContext?.canRestoreInheritance(name) === true

  // A read-only editor ignores writes (see RootComponent), and so does restore, which
  // bypasses its change handler. The overridden marker still shows.
  const isEditable = editFormContext?.disabled !== true

  const canRestore = isRestorable && isEditable && (
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
      // A field inherited when loaded gets the value it was loaded with back through a
      // reset, one overridden when loaded gets the ancestor value the backend reported.
      // Ant reports neither through onValuesChange, so the field is not counted as
      // changed again.
      const inheritedValue = inheritanceStateContext?.getInheritedValue(name)

      if (inheritedValue === undefined) {
        editFormContext?.form.resetFields([name])
      } else {
        editFormContext?.form.setFieldValue(name, inheritedValue)
      }

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
