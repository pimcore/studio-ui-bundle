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
import { DirectChildrenFilterContext, type DirectChildrenFilterData } from './direct-children-filter-provider'

export type UseDirectChildrenFilterReturn = DirectChildrenFilterData

export const useDirectChildrenFilter = (): UseDirectChildrenFilterReturn => {
  const context = useContext(DirectChildrenFilterContext)

  if (context === undefined) {
    throw new Error('useTagFilter must be used within a TagFilterProvider')
  }

  return context
}
