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
import { cloneDeep, isEqual, isNil } from 'lodash'
import { type ValueType } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'
import { useDocumentEditor } from '../../../hooks/use-document-editor'

interface EditableSnapshot {
  value: ValueType | undefined
  inherited: boolean
}

export interface UseEditableDialogSnapshotReturn {
  /** Names of the dialog editables whose value or inheritance state differs from the snapshot. */
  getChangedKeys: () => string[]
  /** Writes the snapshot back for every changed editable. Editables outside the dialog are never touched. */
  restore: () => void
}

/**
 * Editables write their changes straight into the document editable store, so the dialog cannot
 * simply drop its local state when it is cancelled. This hook captures the dialog editables once,
 * when the dialog mounts, and restores exactly those editables on request.
 */
export const useEditableDialogSnapshot = (editableNames: string[]): UseEditableDialogSnapshotReturn => {
  const { getValue, getInheritanceState, updateValue, removeValues, setInheritanceState } = useDocumentEditor()

  const [snapshot] = useState<Record<string, EditableSnapshot>>(() =>
    Object.fromEntries(editableNames.map(name => [name, {
      value: cloneDeep(getValue(name)),
      inherited: getInheritanceState(name)
    }]))
  )

  const hasChanged = (name: string, entry: EditableSnapshot): boolean =>
    !isEqual(entry.value, getValue(name)) || entry.inherited !== getInheritanceState(name)

  const getChangedKeys = (): string[] =>
    Object.entries(snapshot)
      .filter(([name, entry]) => hasChanged(name, entry))
      .map(([name]) => name)

  const restore = (): void => {
    const changedKeys = getChangedKeys()
    const addedKeys = changedKeys.filter(name => isNil(snapshot[name].value))

    if (addedKeys.length > 0) {
      removeValues(addedKeys)
    }

    changedKeys.forEach(name => {
      const entry = snapshot[name]

      if (!isNil(entry.value) && !isEqual(entry.value, getValue(name))) {
        updateValue(name, cloneDeep(entry.value))
      }

      if (entry.inherited !== getInheritanceState(name)) {
        setInheritanceState(name, entry.inherited)
      }
    })
  }

  return { getChangedKeys, restore }
}
