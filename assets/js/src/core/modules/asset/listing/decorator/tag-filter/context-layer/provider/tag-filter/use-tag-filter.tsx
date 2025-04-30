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
import { TagFilterContext, type TagFilterData } from './tag-filter-provider'

export type UseTagFilterReturn = TagFilterData

export const useTagFilter = (): UseTagFilterReturn => {
  const context = useContext(TagFilterContext)

  if (context === undefined) {
    throw new Error('useTagFilter must be used within a TagFilterProvider')
  }

  return context
}
