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
import { DynamicFilterContext, type DynamicFilterData } from './dynamic-filter-provider'

export interface UseDynamicFilterReturn extends DynamicFilterData {}

export const useDynamicFilter = (): UseDynamicFilterReturn => {
  const context = useContext(DynamicFilterContext)

  if (context === undefined) {
    throw new Error('useDynamicFilter must be used within a DynamicFilterProvider')
  }

  return context
}
