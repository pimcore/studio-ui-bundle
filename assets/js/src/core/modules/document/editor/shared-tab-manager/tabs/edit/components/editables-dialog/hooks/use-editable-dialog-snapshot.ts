/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState } from 'react'
import { cloneDeep, isEqual, isNil, union } from 'lodash'
import { type ValueType } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'
import { useDocumentEditor } from '../../../hooks/use-document-editor'

interface EditableSnapshot {
  value: ValueType | undefined
  inherited: boolean
}

const EMPTY_SNAPSHOT: EditableSnapshot = { value: undefined, inherited: false }

export interface UseEditableDialogSnapshotReturn {
  /** Names of the dialog editables (and their nested values) whose value or inheritance state differs from the snapshot. */
  getChangedKeys: () => string[]
  /** Writes the snapshot back for every changed editable. Editables outside the dialog are never touched. */
  restore: () => void
}

/**
 * Editables write their changes straight into the document editable store, so the dialog cannot
 * simply drop its local state when it is cancelled. This hook captures the dialog editables once,
 * when the dialog mounts, and restores exactly those editables on request.
 *
 * A dialog editable owns every value nested below it, e.g. the rows of a block (`<name>:<key>.<child>`),
 * so rows added or removed while the dialog was open are rolled back as well.
 */
export const useEditableDialogSnapshot = (editableNames: string[]): UseEditableDialogSnapshotReturn => {
  const { getValue, getValues, getInheritanceState, updateValue, removeValues, setInheritanceState } = useDocumentEditor()

  const isOwned = (key: string): boolean =>
    editableNames.some(name => key === name || key.startsWith(`${name}:`))

  const getOwnedKeys = (): string[] =>
    union(editableNames, Object.keys(getValues()).filter(isOwned))

  const [snapshot] = useState<Record<string, EditableSnapshot>>(() =>
    Object.fromEntries(getOwnedKeys().map(name => [name, {
      value: cloneDeep(getValue(name)),
      inherited: getInheritanceState(name)
    }]))
  )

  const getSnapshot = (key: string): EditableSnapshot => snapshot[key] ?? EMPTY_SNAPSHOT

  const hasChanged = (key: string): boolean => {
    const entry = getSnapshot(key)

    return !isEqual(entry.value, getValue(key)) || entry.inherited !== getInheritanceState(key)
  }

  const getChangedKeys = (): string[] =>
    union(Object.keys(snapshot), getOwnedKeys()).filter(hasChanged)

  const restore = (): void => {
    const changedKeys = getChangedKeys()
    const addedKeys = changedKeys.filter(key => isNil(getSnapshot(key).value))

    if (addedKeys.length > 0) {
      removeValues(addedKeys)
    }

    changedKeys.forEach(key => {
      const { value, inherited } = getSnapshot(key)

      if (isNil(value)) {
        return
      }

      if (inherited !== getInheritanceState(key)) {
        setInheritanceState(key, inherited)
      }

      // Always write the value, even when only the inheritance changed: the value update is what
      // notifies the parent window and schedules the autosave that persists the restored state.
      updateValue(key, cloneDeep(value))
    })
  }

  return { getChangedKeys, restore }
}
