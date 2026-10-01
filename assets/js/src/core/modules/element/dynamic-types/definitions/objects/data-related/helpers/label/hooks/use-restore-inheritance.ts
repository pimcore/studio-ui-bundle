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
import { RestoreInheritanceLocaleContext } from './restore-inheritance-locale-context'
import { isUndefined } from 'lodash'
import { useAppSelector } from '@sdk/app'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { selectDataObjectById } from '@Pimcore/modules/data-object/data-object-draft-slice'
import {
  useLocalizedFields
} from '@Pimcore/components/form/localisation/localized-fields/provider/localized-fields-provider/use-localized-fields'
import { getLanguagePermission, isLanguageEditable } from '@Pimcore/components/language-selection/helpers'

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
 * @param readOnly Whether the field itself is read-only (noteditable).
 */
export const useRestoreInheritance = (
  name: NamePath | undefined,
  emptyValue: unknown = null,
  readOnly: boolean = false
): UseRestoreInheritanceReturn => {
  const inheritanceStateContext = useInheritanceState()
  const editFormContext = useEditFormContextOptional()
  const nearestKeyedList = useKeyedListOptional()
  const keyedListOverride = useContext(RestoreInheritanceKeyedListContext)
  const keyedList = isUndefined(keyedListOverride) ? nearestKeyedList : keyedListOverride.keyedList
  const isLocaleEditable = useIsLocaleEditable()

  const isKeyedList = !isUndefined(keyedList)
  const isRestorable = !isUndefined(name) &&
    inheritanceStateContext?.canRestoreInheritance(name) === true

  // Restore writes past the control, so it has to respect whatever makes the control
  // read-only: the whole editor (whose change handler ignores writes, see
  // RootComponent), the field itself, or the locale of a localized field. The
  // overridden marker still shows.
  const isEditable = editFormContext?.disabled !== true && !readOnly && isLocaleEditable

  const canRestore = isRestorable && isEditable && (
    isKeyedList
      ? !isUndefined(keyedList.onFieldRestore)
      : !isUndefined(editFormContext)
  )

  const restore = useCallback((): void => {
    if (!canRestore || isUndefined(name)) {
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

      if (isUndefined(inheritedValue)) {
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

/**
 * Whether the locale of the field may be edited, by the same localizedEdit permission
 * the localized control disables itself by (see FormControlWithElementContext). The
 * locale comes from the surrounding localized fields, or from the locale context for
 * fields localized another way (classification store keys). True without either.
 */
const useIsLocaleEditable = (): boolean => {
  const localizedFields = useLocalizedFields()
  const contextLocale = useContext(RestoreInheritanceLocaleContext)
  const { id } = useContext(DataObjectContext)
  const permissions = useAppSelector(state => selectDataObjectById(state, id))?.permissions
  const locale = localizedFields?.locales[0] ?? contextLocale

  if (isUndefined(locale)) {
    return true
  }

  return isLanguageEditable(getLanguagePermission(permissions, 'localizedEdit'), locale)
}
