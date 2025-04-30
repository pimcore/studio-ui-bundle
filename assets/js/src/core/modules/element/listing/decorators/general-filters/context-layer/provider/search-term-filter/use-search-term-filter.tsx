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
import { type SearchTermFilterData, SearchTermFilterContext } from './search-term-filter-provider'

export type UseSearchTermFilterReturn = SearchTermFilterData

export const useSearchTermFilter = (): UseSearchTermFilterReturn => {
  const context = useContext(SearchTermFilterContext)

  if (context === undefined) {
    throw new Error('useSearchTermFilter must be used within a SearchTermFilterProvider')
  }

  return context
}
