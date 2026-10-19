/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'
import { type FilterValues } from '../types'
import { type FilterWriteCounts, type FiltersStore } from './create-filters-store'

const findChangedKeys = (
  appliedValues: FilterValues,
  previousValues: FilterValues,
  appliedWriteCounts?: FilterWriteCounts,
  previousWriteCounts?: FilterWriteCounts
): string[] => {
  if (appliedWriteCounts !== undefined && previousWriteCounts !== undefined) {
    // A write counts even when it kept the value: a reset or a restore has to reach the draft.
    return Object.keys(appliedWriteCounts).filter((key) => appliedWriteCounts[key] !== previousWriteCounts[key])
  }

  return Object.keys(appliedValues).filter((key) => !Object.is(previousValues[key], appliedValues[key]))
}

/**
 * Mirrors the applied store into the draft, limited to the values that were written since the last
 * run. Copying everything on every change would let an unrelated applied write - the search term
 * typed into a top bar, for instance - overwrite the draft edits that are still waiting for Apply.
 *
 * Pass the applied store's `writeCounts` to have every written key mirrored, including a write that
 * kept the value. Without them only values that differ from the previous run are mirrored.
 */
export const useDraftSync = (
  appliedValues: FilterValues,
  draftStore: Pick<FiltersStore, 'setValues'>,
  appliedWriteCounts?: FilterWriteCounts
): void => {
  const { setValues } = draftStore
  const previous = useRef<{ values: FilterValues, writeCounts?: FilterWriteCounts } | undefined>(undefined)

  useEffect(() => {
    const last = previous.current
    previous.current = { values: appliedValues, writeCounts: appliedWriteCounts }

    if (last === undefined) {
      setValues(appliedValues)
      return
    }

    const changedValues: FilterValues = {}

    for (const key of findChangedKeys(appliedValues, last.values, appliedWriteCounts, last.writeCounts)) {
      changedValues[key] = appliedValues[key]
    }

    if (Object.keys(changedValues).length > 0) {
      setValues(changedValues)
    }
  }, [appliedValues])
}
