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
import { TagFiltersContext, type ITagFiltersContext } from './tag-filters-provider'

interface UseFiltersHookReturn extends ITagFiltersContext {}

export const useTagFilters = (): UseFiltersHookReturn => {
  const context = useContext(TagFiltersContext)
  return context
}
