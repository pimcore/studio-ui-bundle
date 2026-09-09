/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { defineFilter } from '@Pimcore/components/filters'
import { FULLTEXT_SEARCH_MODE_ID } from '../../search-modes/search-mode-abstract'
import { type ElementFilterQueryPart, type ElementFilterContext } from '../element-filter-types'

/** Value only, no control and no query part: holds the selected mode so Clear-all resets it. */
export const searchModeFilterDescriptor = defineFilter<string, ElementFilterQueryPart, ElementFilterContext>({
  key: 'searchMode',
  defaultValue: FULLTEXT_SEARCH_MODE_ID,
  isEnabled: () => true,
  isVisible: () => false
})
