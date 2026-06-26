/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createFiltersStore } from '@Pimcore/components/filters'

export const {
  FiltersStoreProvider: AppliedFiltersProvider,
  useFiltersStore: useAppliedFilters
} = createFiltersStore()

export const {
  FiltersStoreProvider: DraftFiltersProvider,
  useFiltersStore: useDraftFilters,
  useFiltersStoreOptional: useDraftFiltersOptional
} = createFiltersStore()
