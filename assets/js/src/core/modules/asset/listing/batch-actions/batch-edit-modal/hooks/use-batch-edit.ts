/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { type BatchContext, type BatchEdit, BatchEditContext } from '../batch-edit-provider'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'

interface UseBatchEditHookReturn extends BatchContext {
  addOrUpdateBatchEdit: (column: AvailableColumn) => void
  updateLocale: (batchEdit: BatchEdit, locale: string | null) => void
  resetBatchEdits: () => void
  removeBatchEdit: (batchEdit: BatchEdit) => void
}

// A localizable metadata field can have one row per locale, so entries are identified by
// (key + locale). Asset metadata also allows a language-neutral value (locale === null), which
// is a valid, distinct row. Non-localizable fields are a single entry with locale null.
const isSameEntry = (a: BatchEdit, b: BatchEdit): boolean =>
  a.key === b.key && (a.locale ?? null) === (b.locale ?? null)

export const useBatchEdit = (): UseBatchEditHookReturn => {
  const { batchEdits, setBatchEdits } = useContext(BatchEditContext)
  const user = useUser()
  // Locale universe for localizable fields — the user's content languages, matching the grid
  // language switcher / column config. A language-neutral (null) row is offered in addition.
  const contentLanguages = (user.contentLanguages ?? []) as string[]

  const resetBatchEdits = (): void => {
    setBatchEdits([])
  }

  const updateLocale = (batchEdit: BatchEdit, locale: string | null): void => {
    // Move only the targeted row to the new locale; the picker excludes locales used by siblings.
    const updatedEdits = batchEdits.map(edit =>
      isSameEntry(edit, batchEdit) ? { ...edit, locale } : edit
    )
    setBatchEdits(updatedEdits)
  }

  const addOrUpdateBatchEdit = (column: AvailableColumn): void => {
    // Localizable fields add one row per locale: each click adds the next unused locale.
    // The default first row is the language-neutral one (null), matching current asset behavior,
    // followed by each content language.
    if (column.localizable) {
      const usedLocales = batchEdits
        .filter(edit => edit.key === column.key)
        .map(edit => edit.locale ?? null)
      const candidateLocales: Array<string | null> = [null, ...contentLanguages]
      const nextLocale = candidateLocales.find(locale => !usedLocales.includes(locale))

      if (nextLocale === undefined) {
        return
      }

      setBatchEdits([...batchEdits, { ...column, locale: nextLocale }])
      return
    }

    const newEdit: BatchEdit = { ...column, locale: null }
    const updatedEdits: BatchEdit[] = [...batchEdits]
    const existingIndex = batchEdits.findIndex(edit => edit.key === newEdit.key)

    if (existingIndex !== -1) {
      updatedEdits[existingIndex] = newEdit
    } else {
      updatedEdits.push(newEdit)
    }

    setBatchEdits(updatedEdits)
  }

  const removeBatchEdit = (batchEdit: BatchEdit): void => {
    const updatedEdits = batchEdits.filter(edit => !isSameEntry(edit, batchEdit))
    setBatchEdits(updatedEdits)
  }

  return {
    batchEdits,
    setBatchEdits,
    updateLocale,
    resetBatchEdits,
    removeBatchEdit,
    addOrUpdateBatchEdit
  }
}
