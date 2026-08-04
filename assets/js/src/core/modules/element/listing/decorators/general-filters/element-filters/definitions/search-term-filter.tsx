/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { defineFilter } from '@Pimcore/components/filters'
import { searchTermFilterType } from '../../context-layer/provider/search-term-filter/search-term-filter-provider'
import { SearchTermFilter } from '../../view-layer/components/search/search-term-filter'
import { type ElementFilterQueryPart, type ElementFilterContext } from '../element-filter-types'

export const searchTermFilterDescriptor = defineFilter<string, ElementFilterQueryPart, ElementFilterContext>({
  key: 'searchTerm',
  defaultValue: '',
  section: 'controls',
  order: 10,
  isEnabled: () => true,
  isVisible: (context) => context.config.handleSearchTermInSidebar,
  Control: () => <SearchTermFilter />,
  toQuery: (value) => {
    if (value === '') {
      return undefined
    }

    return { kind: 'columnFilters', filters: [{ type: searchTermFilterType, filterValue: value }] }
  }
})
