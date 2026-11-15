/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FilterValues } from '../types'
import { type FiltersStore } from './create-filters-store'

/**
 * Publishes the sidebar draft into the applied store, i.e. what the "Apply" button does.
 *
 * Committing always publishes the whole draft, never only the committed key. A single-key
 * write would look equivalent - `setValues` merges into the previously applied values - but
 * hosts that mirror the applied store back into the draft (see `useDraftSync`) would then
 * overwrite the remaining, still unapplied draft edits with the previously applied ones.
 * Publishing the whole draft also keeps Enter and "Apply" doing the same thing.
 *
 * `committed` carries the value that triggered the commit: the draft write that precedes it
 * happens in the same render, so `draftValues` does not contain the new value yet.
 */
export const commitFilterValues = (
  appliedStore: Pick<FiltersStore, 'setValues'>,
  draftValues: FilterValues,
  committed: FilterValues = {}
): void => {
  appliedStore.setValues({ ...draftValues, ...committed })
}
