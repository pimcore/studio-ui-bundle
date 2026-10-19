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
import { type FiltersStore } from './create-filters-store'

/**
 * Mirrors the applied store into the draft, limited to the values that changed since the last
 * run. Copying everything on every change would let an unrelated applied write - the search term
 * typed into a top bar, for instance - overwrite the draft edits that are still waiting for Apply.
 */
export const useDraftSync = (
  appliedValues: FilterValues,
  draftStore: Pick<FiltersStore, 'setValues'>
): void => {
  const { setValues } = draftStore
  const previousValues = useRef<FilterValues | undefined>(undefined)

  useEffect(() => {
    const previous = previousValues.current
    previousValues.current = appliedValues

    if (previous === undefined) {
      setValues(appliedValues)
      return
    }

    const changedValues: FilterValues = {}

    for (const key of Object.keys(appliedValues)) {
      if (!Object.is(previous[key], appliedValues[key])) {
        changedValues[key] = appliedValues[key]
      }
    }

    if (Object.keys(changedValues).length > 0) {
      setValues(changedValues)
    }
  }, [appliedValues])
}
