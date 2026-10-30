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

export interface CommitOptions {
  /** Save and reload the document right away instead of scheduling the regular autosave. */
  reload: boolean
}

export interface UseEditableDialogSnapshotReturn {
  /** Names of the dialog editables (and their nested values) whose value or inheritance state differs from the snapshot. */
  getChangedKeys: () => string[]
  /** Writes the snapshot back for every changed editable, store-only. Editables outside the dialog are never touched. */
  restore: () => void
  /** Persists the changes made since the snapshot: marks the document modified and saves (or saves and reloads). */
  commit: (options: CommitOptions) => void
}

/**
 * Editables inside the dialog write their changes into the document editable store only. This hook
 * captures the dialog editables once, when the dialog mounts, and either restores exactly those
 * editables (Cancel) or hands the batch over to the parent window for persistence (Save).
 *
 * A dialog editable owns every value nested below it, e.g. the rows of a block (`<name>:<key>.<child>`),
 * so rows added or removed while the dialog was open are rolled back as well.
 */
export const useEditableDialogSnapshot = (editableNames: string[]): UseEditableDialogSnapshotReturn => {
  const {
    getValue,
    getValues,
    getInheritanceState,
    getPersistenceVersion,
    setValue,
    updateValue,
    updateValueWithReload,
    removeValues,
    setInheritanceState
  } = useDocumentEditor()

  // Dialog edits are not persisted until Save, but any other save made while the dialog is open
  // serializes the whole store, discarded values included. Remember where persistence stood at open.
  const [persistenceVersionAtOpen] = useState(() => getPersistenceVersion())

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

  // The parent window saves the live values of the whole document, so one notification carries the
  // entire batch. It is sent through a dialog value that still exists; the value itself is unchanged.
  const notifyParent = (changedKeys: string[], reload: boolean): void => {
    const key = union(changedKeys, editableNames).find(name => !isNil(getValue(name)))

    if (key === undefined) {
      return
    }

    const notify = reload ? updateValueWithReload : updateValue
    notify(key, getValue(key))
  }

  const restore = (): void => {
    const changedKeys = getChangedKeys()
    const addedKeys = changedKeys.filter(key => isNil(getSnapshot(key).value))

    if (addedKeys.length > 0) {
      removeValues(addedKeys)
    }

    changedKeys.forEach(key => {
      const { value, inherited } = getSnapshot(key)

      if (inherited !== getInheritanceState(key)) {
        setInheritanceState(key, inherited)
      }

      if (!isNil(value) && !isEqual(value, getValue(key))) {
        setValue(key, cloneDeep(value))
      }
    })

    // Something was saved while the dialog was open, so the draft may hold the discarded values:
    // persist the restored state. A clean discard stays silent.
    if (changedKeys.length > 0 && getPersistenceVersion() !== persistenceVersionAtOpen) {
      notifyParent(changedKeys, false)
    }
  }

  const commit = ({ reload }: CommitOptions): void => {
    const changedKeys = getChangedKeys()

    if (changedKeys.length > 0) {
      notifyParent(changedKeys, reload)
    }
  }

  return { getChangedKeys, restore, commit }
}
