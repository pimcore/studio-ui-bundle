/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FilterValues } from '@Pimcore/components/filters'
import { type ElementFilterValues } from '../../../../../element-filters'

export interface BuildAppliedValuesProps {
  /** The sidebar's working copy of the filters. */
  draft: ElementFilterValues
  /**
   * Whether the search term belongs to this panel. On surfaces that keep it in a top bar
   * instead (the search modal, the element selectors) the panel must leave it alone, or
   * applying here would publish a stale copy over what the top bar holds.
   */
  ownsSearchTerm: boolean
  /** Whether the "only unreferenced" filter exists on this surface at all. */
  ownsUnreferenced: boolean
  /** A switched-off PQL filter must not reach the result, whatever the field still holds. */
  isPqlFilterEnabled: boolean
  /**
   * The mode the dropdown and the query actually honour, not the raw draft value: a stored id
   * that no visible mode matches - a saved search from a mode that has since been hidden or
   * removed - collapses to full text. Publishing that keeps the applied store from carrying an
   * id nothing can honour, for Apply and for Enter alike.
   */
  searchModeId: string
  /**
   * The value of a filter that applies itself immediately (Enter in the search field, the
   * direct-children checkbox, a text field filter). Its draft write happens in the same render,
   * so `draft` does not carry it yet and it has to override what is derived from the draft.
   */
  committed?: FilterValues
}

/**
 * The values the filter panel publishes into the applied store, i.e. what "Apply" produces.
 *
 * Kept free of React so the publish rules - which keys this surface owns, and how a disabled
 * PQL filter is neutralised - can be read and tested in one place.
 */
export const buildAppliedValues = ({
  draft,
  ownsSearchTerm,
  ownsUnreferenced,
  isPqlFilterEnabled,
  searchModeId,
  committed = {}
}: BuildAppliedValuesProps): FilterValues => {
  const values: FilterValues = {
    fieldFilters: draft.fieldFilters,
    directChildren: draft.directChildren,
    pql: isPqlFilterEnabled ? draft.pql : ''
  }

  if (ownsUnreferenced) {
    values.unreferenced = draft.unreferenced
  }

  if (ownsSearchTerm) {
    values.searchTerm = draft.searchTerm
    values.searchMode = searchModeId
  }

  return { ...values, ...committed }
}
