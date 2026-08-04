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
import { UnreferencedFilterContext, type UnreferencedFilterData } from './unreferenced-filter-provider'

export type UseUnreferencedFilterReturn = UnreferencedFilterData

export const useUnreferencedFilter = (): UseUnreferencedFilterReturn => {
  const context = useContext(UnreferencedFilterContext)

  if (context === undefined) {
    throw new Error('useUnreferencedFilter must be used within an UnreferencedFilterProvider')
  }

  return context
}
